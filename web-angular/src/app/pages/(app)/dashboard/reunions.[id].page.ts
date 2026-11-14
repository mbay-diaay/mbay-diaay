import { Component, computed, effect, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";

import { fmtDate, fmtDateTime, nf } from "@/lib/format";
import { attendanceStats, canEditMinutes, isMeetingEditable } from "@/lib/meetings";
import type { Meeting } from "@/lib/mock/cooperative";
import { scopedMeetings, scopedMembers } from "@/lib/scope";
import type { MessageKey } from "@/lib/i18n";
import { AccessDeniedError } from "@/lib/store";
import { MEETING_KIND_LABEL, MEETING_STATUS_LABEL } from "@shared/meeting-kinds";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import { MeetingDecisionsComponent } from "@shared/meeting-decisions.component";
import { MeetingFormDialogComponent } from "@shared/meeting-form-dialog.component";
import {
  DetailHeroComponent,
  IconComponent,
  initialsOf,
  ModalComponent,
  SnackbarService,
  StatCardsComponent,
  TONE,
  V2_PAGE_STYLES,
  type HeroBadge,
  type HeroMeta,
  type StatCard,
} from "@shared/ui";

const DAY = 86_400_000;

/**
 * Fiche réunion (charte V2) : en-tête, chiffres clés, ordre du jour, présences, procès-verbal
 * (brouillon puis validation verrouillée), historique ; pointage, annulation et modification en modale.
 */
@Component({
  selector: "app-reunion-detail-page",
  imports: [
    AppShellComponent,
    MeetingDecisionsComponent,
    DetailHeroComponent,
    IconComponent,
    MeetingFormDialogComponent,
    ModalComponent,
    RouterLink,
    StatCardsComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .grid-main {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 1100px) {
        .grid-main {
          grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
          align-items: start;
        }
      }
      .agenda li {
        display: flex;
        align-items: center;
        gap: 12px;
        border-top: 1px solid var(--v2-separateur);
        padding: 12px 20px;
        font-size: 15px;
        font-weight: 700;
      }
      .num {
        display: grid;
        height: 30px;
        width: 30px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 999px;
        background: var(--v2-foret);
        color: var(--v2-citron);
        font-size: 12px;
        font-weight: 800;
      }
      .minutes {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        border-radius: 18px;
        background: var(--v2-creme);
        padding: 16px 18px;
        font-size: 15px;
        line-height: 1.6;
      }
      .area.big {
        min-height: 260px;
        line-height: 1.6;
      }
      .meter {
        display: block;
        height: 8px;
        overflow: hidden;
        border-radius: 999px;
        background: var(--v2-lin);
      }
      .meter span {
        display: block;
        height: 100%;
        border-radius: 999px;
        background: var(--v2-vert-pousse);
      }
      .people {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .person-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border-radius: 999px;
        background: var(--v2-sauge);
        padding: 3px 10px 3px 3px;
        font-size: 13px;
        font-weight: 700;
      }
      .person-chip .i {
        display: grid;
        height: 24px;
        width: 24px;
        place-items: center;
        border-radius: 999px;
        background: var(--v2-foret);
        color: var(--v2-citron);
        font-size: 10px;
        font-weight: 800;
      }
      .timeline li {
        display: flex;
        gap: 14px;
        border-top: 1px solid var(--v2-separateur);
        padding: 12px 20px;
      }
      .dot {
        margin-top: 5px;
        height: 12px;
        width: 12px;
        flex-shrink: 0;
        border-radius: 999px;
        background: var(--v2-foret);
        box-shadow: 0 0 0 4px var(--v2-sauge);
      }
      .checklist {
        max-height: 46vh;
        overflow-y: auto;
        border-radius: 18px;
        border: 1px solid var(--v2-bord-carte);
      }
      .checklist label {
        display: flex;
        min-height: 52px;
        align-items: center;
        gap: 12px;
        border-top: 1px solid var(--v2-separateur);
        padding: 8px 14px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .checklist li:first-child label {
        border-top: none;
      }
      .checklist label:hover {
        background: var(--v2-creme);
      }
      .checklist input {
        height: 20px;
        width: 20px;
        accent-color: var(--v2-foret);
      }
    `,
  ],
  template: `
    <app-shell perm="meeting.read" [area]="t()('reunions.detail.area')">
      @if (meeting(); as current) {
        <ui-detail-hero
          [crumb]="{ label: t()('reunions.title'), link: '/dashboard/reunions' }"
          [title]="current.title"
          [eyebrow]="t()(MEETING_KIND_LABEL[current.kind])"
          icon="event"
          [badges]="heroBadges()"
          [meta]="heroMeta()"
          [backLabel]="t()('reunions.detail.back')"
        >
          @if (canManage() && current.status === "planifiée") {
            <div hero-actions class="flex flex-wrap gap-2">
              @if (canEditMeeting(current)) {
                <button
                  type="button"
                  class="btn btn-ghost"
                  style="height: 44px"
                  (click)="openEditDialog()"
                >
                  <ui-icon name="edit" [size]="18" />{{ t()("reunions.detail.edit") }}
                </button>
              }
              @if (isPast(current.date)) {
                <button
                  type="button"
                  class="btn btn-citron"
                  style="height: 44px"
                  (click)="openHoldDialog()"
                >
                  <ui-icon name="task_alt" [size]="18" />{{ t()("reunions.detail.hold") }}
                </button>
              }
              <button
                type="button"
                class="btn btn-ghost"
                style="height: 44px; color: var(--v2-erreur-fg)"
                (click)="openCancelDialog()"
              >
                <ui-icon name="close" [size]="18" />{{ t()("reunions.detail.cancel") }}
              </button>
            </div>
          }
        </ui-detail-hero>

        @if (current.status === "annulée") {
          <p
            class="notice mt-4"
            style="background: var(--v2-erreur-bg); color: var(--v2-erreur-fg)"
          >
            <ui-icon name="warning" [size]="18" />{{
              t()("reunions.detail.cancelledReason", { reason: current.cancelReason ?? "" })
            }}
          </p>
        }

        <ui-stat-cards class="rise mt-6" [stats]="kpis()" />

        <div class="grid-main mt-6">
          <div class="grid gap-4">
            <!-- Ordre du jour -->
            <section class="sec-card">
              <div class="sec-head">
                <h2>
                  <span class="sec-ico"><ui-icon name="fact_check" [size]="18" /></span
                  >{{ t()("reunions.detail.agenda")
                  }}<span class="n">{{ current.agenda.length }}</span>
                </h2>
              </div>
              <ol class="agenda">
                @for (line of current.agenda; track $index; let position = $index) {
                  <li>
                    <span class="num">{{ position + 1 }}</span
                    ><span class="min-w-0">{{ line }}</span>
                  </li>
                } @empty {
                  <li class="sub" style="font-weight: 500">
                    {{ t()("reunions.detail.agendaNone") }}
                  </li>
                }
              </ol>
            </section>

            <!-- Déroulé et convoqués -->
            <section class="sec-card">
              <div class="sec-head">
                <h2>
                  <span class="sec-ico"><ui-icon name="group" [size]="18" /></span
                  >{{ t()("reunions.detail.convoked") }}
                </h2>
              </div>
              <p class="sub" style="font-weight: 600">{{ t()(modeKey(current)) }}{{ current.place && current.mode !== "en ligne" ? " · " + current.place : "" }}</p>
              @if (current.onlineUrl) {
                <a class="btn btn-primary mt-3 inline-flex" [href]="current.onlineUrl" target="_blank" rel="noopener noreferrer">
                  {{ t()("reunions.detail.join") }}<span class="btn-chip"><ui-icon name="public" [size]="18" /></span>
                </a>
                <p class="sub mt-2 break-all">{{ current.onlineUrl }}</p>
              }
              @if (convokedNames().length) {
                <ul class="mt-4 flex flex-wrap gap-2">
                  @for (name of convokedNames(); track name) {
                    <li class="rounded-full px-3 py-1.5 text-[13px] font-bold" style="background: var(--v2-sauge); color: var(--v2-foret)">{{ name }}</li>
                  }
                </ul>
              } @else {
                <p class="sub mt-3" style="font-weight: 500">{{ t()("reunions.detail.convokedNone") }}</p>
              }
            </section>

            <!-- Procès-verbal -->
            @if (current.status === "tenue") {
              <section class="sec-card">
                <div class="sec-head">
                  <h2>
                    <span class="sec-ico"><ui-icon name="description" [size]="18" /></span
                    >{{ t()("reunions.minutes.title") }}
                  </h2>
                  <span
                    class="badge"
                    [style.background]="minutesTone(current).bg"
                    [style.color]="minutesTone(current).fg"
                    >{{ minutesStatusLabel(current) }}</span
                  >
                </div>
                <div class="border-t p-5" style="border-color: var(--v2-separateur)">
                  @if (minutesEditable()) {
                    <label class="lbl" for="minutes">{{ t()("reunions.minutes.text") }}</label>
                    <p class="sub mt-1">{{ t()("reunions.minutes.textHint") }}</p>
                    <textarea
                      id="minutes"
                      class="area big mt-2"
                      [value]="minutesDraft"
                      (input)="minutesDraft = $any($event.target).value"
                    ></textarea>
                    @if (minutesTried() && !minutesDraft.trim()) {
                      <p
                        class="mt-1.5 flex items-center gap-1.5 text-[13px] font-bold"
                        style="color: var(--v2-erreur-fg)"
                      >
                        <ui-icon name="warning" [size]="16" />{{
                          t()("reunions.minutes.emptyText")
                        }}
                      </p>
                    }
                    @if (current.minutes?.authorName) {
                      <p class="sub mt-2">{{ t()("reunions.minutes.author", { name: current.minutes?.authorName ?? "" }) }}</p>
                    }
                    @if (isMinutesAuthor()) {
                      <p class="notice mt-3"><ui-icon name="info" [size]="18" />{{ t()("reunions.minutes.authorCannotValidate") }}</p>
                    }
                    <div class="mt-4 flex flex-wrap justify-end gap-2">
                      <button type="button" class="btn btn-ghost" (click)="saveMinutesDraft()">
                        {{ t()("reunions.minutes.save") }}
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        [disabled]="!minutesDraft.trim() || isMinutesAuthor()"
                        (click)="openValidateConfirm()"
                      >
                        {{ t()("reunions.minutes.validate")
                        }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
                      </button>
                    </div>
                  } @else if (current.minutes) {
                    <p class="minutes">{{ current.minutes.text }}</p>
                    @if (current.minutes.authorName) {
                      <p class="sub mt-2">{{ t()("reunions.minutes.author", { name: current.minutes.authorName }) }}</p>
                    }
                    @if (current.minutes.status === "validé") {
                      <p
                        class="notice mt-3"
                        style="background: var(--v2-sauge); color: var(--v2-vert-pousse)"
                      >
                        <ui-icon name="task_alt" [size]="18" />
                        {{
                          t()("reunions.minutes.validatedBy", {
                            by: current.minutes.validatedBy ?? "",
                            date: current.minutes.validatedAt
                              ? fmtDate(current.minutes.validatedAt)
                              : "",
                          })
                        }}
                      </p>
                      <p class="sub mt-2">{{ t()("reunions.minutes.lockedNote") }}</p>
                    }
                  } @else {
                    <p class="sub">{{ t()("reunions.minutes.readonlyNone") }}</p>
                  }
                </div>
              </section>
            }

            <!-- Décisions -->
            @if (current.status !== "annulée") {
              <app-meeting-decisions [meeting]="current" />
            }
          </div>

          <div class="grid gap-4">
            <!-- Présences -->
            @if (current.status === "tenue") {
              <section class="sec-card">
                <div class="sec-head">
                  <h2>
                    <span class="sec-ico"><ui-icon name="group" [size]="18" /></span
                    >{{ t()("reunions.attendance.sectionTitle") }}
                  </h2>
                </div>
                <div class="border-t p-5" style="border-color: var(--v2-separateur)">
                  <p class="text-[15px] font-extrabold">
                    {{
                      t()("reunions.attendance.summary", {
                        present: stats().present,
                        absent: stats().absent,
                      })
                    }}
                  </p>
                  <span class="meter mt-2" aria-hidden="true"
                    ><span [style.width.%]="stats().rate"></span
                  ></span>
                  <p class="sub mt-1.5">
                    {{ t()("reunions.attendance.rate", { rate: stats().rate }) }}
                  </p>
                  @if (present().length) {
                    <p class="lbl mt-4">{{ t()("reunions.attendance.presentList") }}</p>
                    <div class="people mt-2">
                      @for (presentMember of present(); track presentMember.id) {
                        <span class="person-chip"
                          ><span class="i">{{
                            initials(presentMember.firstName + " " + presentMember.lastName)
                          }}</span
                          >{{ presentMember.firstName }} {{ presentMember.lastName }}</span
                        >
                      }
                    </div>
                  }
                </div>
              </section>
            }

            <!-- Historique -->
            <section class="sec-card">
              <div class="sec-head">
                <h2>
                  <span class="sec-ico"><ui-icon name="event_note" [size]="18" /></span
                  >{{ t()("reunions.detail.history")
                  }}<span class="n">{{ current.history.length }}</span>
                </h2>
              </div>
              <ol class="timeline">
                @for (event of historyReversed(current); track $index) {
                  <li>
                    <span class="dot" aria-hidden="true"></span>
                    <span class="min-w-0">
                      <span class="block font-bold">{{ historyLabel(event.action) }}</span>
                      <span class="sub block">{{
                        t()("reunions.detail.historyBy", {
                          by: event.by,
                          date: fmtDateTime(event.at),
                        })
                      }}</span>
                    </span>
                  </li>
                }
              </ol>
            </section>
          </div>
        </div>

        <app-meeting-form-dialog
          [(open)]="editOpen"
          [meeting]="current"
          (notify)="onMeetingFormNotify($event)"
        />

        <!-- Pointage → tenue -->
        <ui-modal
          [open]="holdOpen()"
          [title]="t()('reunions.attendance.title')"
          [description]="t()('reunions.attendance.description')"
          icon="task_alt"
          [width]="600"
          [closeLabel]="t()('common.close')"
          (closed)="closeHoldDialog()"
        >
          @if (scoopMembers().length) {
            <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p class="text-[14px] font-extrabold tabular-nums" aria-live="polite">
                {{
                  t()("reunions.attendance.counter", {
                    present: holdPresentIds().length,
                    total: scoopMembers().length,
                  })
                }}
              </p>
              <button
                type="button"
                class="btn btn-ghost"
                style="height: 40px"
                (click)="toggleHoldAll()"
              >
                {{
                  holdAllSelected()
                    ? t()("reunions.attendance.uncheckAll")
                    : t()("reunions.attendance.checkAll")
                }}
              </button>
            </div>
            <ul class="checklist mb-4" [attr.aria-label]="t()('reunions.attendance.listAria')">
              @for (member of scoopMembers(); track member.id) {
                <li>
                  <label>
                    <input
                      type="checkbox"
                      [checked]="holdPresentIds().includes(member.id)"
                      (change)="toggleHold(member.id, $event)"
                    />
                    <span class="avatar" style="height: 32px; width: 32px; font-size: 11px">{{
                      initials(member.firstName + " " + member.lastName)
                    }}</span>
                    {{ member.firstName }} {{ member.lastName }}
                  </label>
                </li>
              }
            </ul>
          } @else {
            <p class="sub mb-4">{{ t()("reunions.attendance.noMembers") }}</p>
          }
          <button modal-footer type="button" class="btn btn-ghost" (click)="closeHoldDialog()">
            {{ t()("producteurs.index.cancel") }}
          </button>
          <button
            modal-footer
            type="button"
            class="btn btn-primary"
            [disabled]="!holdPresentIds().length"
            (click)="submitHoldMeeting()"
          >
            {{ t()("reunions.attendance.submit")
            }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
          </button>
        </ui-modal>

        <!-- Annulation -->
        <ui-modal
          tone="danger"
          [open]="cancelOpen()"
          [title]="t()('reunions.cancel.title')"
          [description]="t()('reunions.cancel.description')"
          icon="close"
          [width]="540"
          [closeLabel]="t()('common.close')"
          (closed)="closeCancelDialog()"
        >
          <label class="lbl" for="cancel-reason">{{ t()("reunions.cancel.reason") }}</label>
          <textarea
            id="cancel-reason"
            class="area mb-5 mt-2"
            [placeholder]="t()('reunions.cancel.reasonHint')"
            [value]="cancelReasonText"
            (input)="cancelReasonText = $any($event.target).value"
          ></textarea>
          <button modal-footer type="button" class="btn btn-ghost" (click)="closeCancelDialog()">
            {{ t()("reunions.cancel.keep") }}
          </button>
          <button
            modal-footer
            type="button"
            class="btn btn-danger"
            [disabled]="cancelReasonText.trim().length < 3"
            (click)="submitCancelMeeting()"
          >
            {{ t()("reunions.cancel.submit") }}
          </button>
        </ui-modal>

        <!-- Valider le procès-verbal -->
        <ui-modal
          [open]="validateConfirmOpen()"
          [title]="t()('reunions.minutes.confirmTitle')"
          [description]="t()('reunions.minutes.confirmDescription')"
          icon="task_alt"
          [width]="520"
          [closeLabel]="t()('common.close')"
          (closed)="closeValidateConfirm()"
        >
          @if (minutesDirty()) {
            <p
              class="notice mb-5"
              style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
            >
              <ui-icon name="warning" [size]="18" />{{ t()("reunions.minutes.confirmUnsaved") }}
            </p>
          }
          <button modal-footer type="button" class="btn btn-ghost" (click)="closeValidateConfirm()">
            {{ t()("producteurs.index.cancel") }}
          </button>
          <button
            modal-footer
            type="button"
            class="btn btn-primary"
            (click)="confirmValidateMinutes()"
          >
            {{ t()("reunions.minutes.confirmSubmit")
            }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
          </button>
        </ui-modal>
      } @else {
        <div class="card mx-auto mt-16 flex max-w-lg flex-col items-center gap-3 p-10 text-center">
          <span
            class="grid size-14 place-items-center rounded-[16px]"
            style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
            ><ui-icon name="event" [size]="26"
          /></span>
          <h1 class="text-[22px] font-extrabold">{{ t()("reunions.detail.notFound.title") }}</h1>
          <p class="sub">{{ t()("reunions.detail.notFound.text") }}</p>
          <a class="btn btn-ghost mt-2" routerLink="/dashboard/reunions">{{
            t()("reunions.detail.back")
          }}</a>
        </div>
      }
    </app-shell>
  `,
})
export default class ReunionDetailPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly fmtDate = fmtDate;
  protected readonly MEETING_KIND_LABEL = MEETING_KIND_LABEL;
  protected readonly MEETING_STATUS_LABEL = MEETING_STATUS_LABEL;
  protected readonly initials = initialsOf;
  private readonly snackbar = inject(SnackbarService);

  private readonly HISTORY_LABEL: Record<string, MessageKey> = {
    créée: "reunions.detail.history.créée",
    modifiée: "reunions.detail.history.modifiée",
    tenue: "reunions.detail.history.tenue",
    annulée: "reunions.detail.history.annulée",
    "procès-verbal enregistré": "reunions.detail.history.procès-verbal enregistré",
    "procès-verbal validé": "reunions.detail.history.procès-verbal validé",
    "décision ajoutée": "reunions.detail.history.décision ajoutée",
    "décision en cours": "reunions.detail.history.décision en cours",
    "décision clôturée": "reunions.detail.history.décision clôturée",
  };

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "")), {
    initialValue: "",
  });

  protected readonly meeting = computed(() => {
    const id = this.id();
    const s = this.store.state();
    const row = s.meetings.find((x) => x.id === id);
    if (!row) return undefined;
    return scopedMeetings([row], s.session).length === 1 ? row : undefined;
  });

  protected readonly canManage = computed(() => this.store.can("meeting.manage"));

  protected readonly stats = computed(() => {
    const m = this.meeting();
    if (!m) return { present: 0, absent: 0, rate: 0 };
    const session = this.store.state().session;
    const scoopMembers = scopedMembers(this.store.state().members, session).filter(
      (mem) => mem.scoopId === m.scoopId && mem.status === "membre",
    );
    const n = Math.max(scoopMembers.length, m.presentIds.length);
    const st = attendanceStats(m, n);
    return { present: st.present, absent: Math.max(st.total - st.present, 0), rate: st.rate };
  });

  protected readonly scoopMembers = computed(() => {
    const m = this.meeting();
    if (!m) return [];
    const session = this.store.state().session;
    const list = scopedMembers(this.store.state().members, session).filter(
      (mem) => mem.scoopId === m.scoopId && mem.status === "membre",
    );
    return [...list].sort((a, b) =>
      `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`, "fr"),
    );
  });

  protected readonly minutesEditable = computed(() => {
    const m = this.meeting();
    return !!(m && this.store.can("minutes.manage") && canEditMinutes(m));
  });

  /** Le rédacteur du procès-verbal ne le valide pas lui-même (séparation des tâches). */
  protected readonly isMinutesAuthor = computed(() => {
    const authorEmail = this.meeting()?.minutes?.authorEmail?.toLowerCase();
    const sessionEmail = this.store.state().session?.email.toLowerCase();
    return !!authorEmail && authorEmail === sessionEmail;
  });

  /** Brouillon du procès-verbal (two-way avec ngModel). */
  protected minutesDraft = "";
  protected readonly minutesTried = signal(false);
  protected readonly validateConfirmOpen = signal(false);

  protected readonly holdOpen = signal(false);
  protected readonly holdPresentIds = signal<string[]>([]);

  protected readonly cancelOpen = signal(false);
  protected cancelReasonText = "";

  protected readonly editOpen = signal(false);

  constructor() {
    effect(() => {
      const m = this.meeting();
      if (m) this.minutesDraft = m.minutes?.text ?? "";
    });
  }

  protected readonly holdAllSelected = computed(() => {
    const members = this.scoopMembers();
    const ids = this.holdPresentIds();
    return members.length > 0 && ids.length === members.length;
  });

  protected historyReversed(m: Meeting) {
    return [...m.history].reverse();
  }

  protected historyLabel(action: string): string {
    const key = this.HISTORY_LABEL[action];
    return key ? this.t()(key) : action;
  }

  protected modeKey(m: Meeting): MessageKey {
    return m.mode === "en ligne" ? "reunions.form.mode.online" : m.mode === "mixte" ? "reunions.form.mode.mixed" : "reunions.form.mode.onsite";
  }

  /** Noms des convoqués : GIE, membres du personnel, puis invités libres. */
  protected readonly convokedNames = computed(() => {
    const m = this.meeting();
    const state = this.store.state();
    if (!m?.audience) return [];
    return [
      ...m.audience.orgIds.map((id) => state.orgs.find((org) => org.id === id)?.name).filter((name): name is string => !!name),
      ...m.audience.staffIds.map((id) => state.users.find((user) => user.id === id)?.name).filter((name): name is string => !!name),
      ...m.audience.others,
    ];
  });

  protected scoopName(scoopId: string): string {
    return this.store.state().scoops.find((c) => c.id === scoopId)?.name ?? "";
  }

  protected minutesStatusLabel(m: Meeting): string {
    const t = this.t();
    if (!m.minutes) return t("reunions.minutes.status.none");
    const key =
      m.minutes.status === "validé"
        ? ("reunions.minutes.status.validé" as MessageKey)
        : ("reunions.minutes.status.brouillon" as MessageKey);
    return t(key);
  }

  protected canEditMeeting(m: Meeting): boolean {
    return isMeetingEditable(m);
  }

  protected openEditDialog(): void {
    this.editOpen.set(true);
  }

  protected onMeetingFormNotify(ev: { kind: "success" | "error"; text: string }): void {
    this.flash(ev.kind, ev.text);
  }

  protected minutesDirty(): boolean {
    const m = this.meeting();
    return this.minutesDraft.trim() !== (m?.minutes?.text ?? "").trim();
  }

  protected openHoldDialog(): void {
    this.holdOpen.set(true);
    this.holdPresentIds.set([]);
  }

  protected closeHoldDialog(): void {
    this.holdOpen.set(false);
    this.holdPresentIds.set([]);
  }

  protected toggleHold(memberId: string, ev: Event): void {
    const on = (ev.target as HTMLInputElement).checked;
    this.holdPresentIds.update((prev) => {
      const set = new Set(prev);
      if (on) set.add(memberId);
      else set.delete(memberId);
      return [...set];
    });
  }

  protected toggleHoldAll(): void {
    const members = this.scoopMembers();
    if (this.holdAllSelected()) {
      this.holdPresentIds.set([]);
    } else {
      this.holdPresentIds.set(members.map((x) => x.id));
    }
  }

  protected submitHoldMeeting(): void {
    const m = this.meeting();
    if (!m) return;
    const ids = this.holdPresentIds();
    try {
      const res = this.store.actions.holdMeeting(m.id, ids);
      if (!res.ok) {
        this.flash("error", this.locale.tNow(res.error as MessageKey));
        return;
      }
      this.flash("success", this.t()("reunions.attendance.done"));
      this.closeHoldDialog();
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }

  protected openCancelDialog(): void {
    this.cancelOpen.set(true);
    this.cancelReasonText = "";
  }

  protected closeCancelDialog(): void {
    this.cancelOpen.set(false);
    this.cancelReasonText = "";
  }

  protected submitCancelMeeting(): void {
    const m = this.meeting();
    if (!m) return;
    const reason = this.cancelReasonText.trim();
    try {
      const res = this.store.actions.cancelMeeting(m.id, reason);
      if (!res.ok) {
        this.flash("error", this.locale.tNow(res.error as MessageKey));
        return;
      }
      this.flash("success", this.t()("reunions.cancel.done"));
      this.closeCancelDialog();
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }

  protected saveMinutesDraft(): void {
    const m = this.meeting();
    if (!m) return;
    this.minutesTried.set(true);
    if (!this.minutesDraft.trim()) return;
    try {
      const res = this.store.actions.saveMinutes(m.id, this.minutesDraft);
      if (!res.ok) {
        this.flash("error", this.locale.tNow(res.error as MessageKey));
        return;
      }
      this.flash("success", this.t()("reunions.minutes.saved"));
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }

  protected openValidateConfirm(): void {
    this.minutesTried.set(true);
    if (!this.minutesDraft.trim()) return;
    this.validateConfirmOpen.set(true);
  }

  protected closeValidateConfirm(): void {
    this.validateConfirmOpen.set(false);
  }

  protected confirmValidateMinutes(): void {
    const m = this.meeting();
    if (!m) return;
    try {
      if (this.minutesDirty()) {
        const saveRes = this.store.actions.saveMinutes(m.id, this.minutesDraft);
        if (!saveRes.ok) {
          this.flash("error", this.locale.tNow(saveRes.error as MessageKey));
          return;
        }
      }
      const res = this.store.actions.validateMinutes(m.id);
      if (!res.ok) {
        this.flash("error", this.locale.tNow(res.error as MessageKey));
        return;
      }
      this.closeValidateConfirm();
      this.flash("success", this.t()("reunions.minutes.validated"));
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }

  private flash(kind: "success" | "error", text: string): void {
    if (kind === "success") this.snackbar.success(text);
    else this.snackbar.error(text);
  }

  protected isPast(iso: string): boolean {
    return iso <= new Date().toISOString();
  }

  protected minutesTone(m: Meeting) {
    return m.minutes?.status === "validé" ? TONE.succes : m.minutes ? TONE.attente : TONE.neutre;
  }

  /** Membres pointés présents. */
  protected readonly present = computed(() => {
    const m = this.meeting();
    if (!m) return [];
    return this.store.state().members.filter((x) => m.presentIds.includes(x.id));
  });

  protected readonly heroBadges = computed<HeroBadge[]>(() => {
    const m = this.meeting();
    if (!m) return [];
    const t = this.t();
    const tone: Record<Meeting["status"], HeroBadge["tone"]> = {
      planifiée: "light",
      tenue: "citron",
      annulée: "danger",
    };
    return [
      { label: t(MEETING_STATUS_LABEL[m.status]), tone: tone[m.status] },
      ...(m.status === "tenue"
        ? [
            {
              label: `${t("reunions.minutes.title")} : ${this.minutesStatusLabel(m)}`,
              tone: (m.minutes?.status === "validé" ? "glass" : "warn") as HeroBadge["tone"],
            },
          ]
        : []),
    ];
  });

  protected readonly heroMeta = computed<HeroMeta[]>(() => {
    const m = this.meeting();
    if (!m) return [];
    return [
      {
        icon: "calendar_today",
        text: this.locale.formatDate(m.date, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      { icon: m.mode === "en ligne" ? "public" : "location_on", text: m.mode === "en ligne" ? this.t()("reunions.form.mode.online") : m.place },
      { icon: "apartment", text: this.scoopName(m.scoopId) },
    ];
  });

  protected readonly kpis = computed<StatCard[]>(() => {
    const m = this.meeting();
    if (!m) return [];
    const t = this.t();
    const st = this.stats();
    const days = Math.ceil((new Date(m.date).getTime() - Date.now()) / DAY);
    return [
      {
        label: t("reunions.quick.agenda"),
        value: nf.format(m.agenda.length),
        sub: t(MEETING_KIND_LABEL[m.kind]),
        icon: "fact_check",
        bg: "",
        fg: "",
      },
      m.status === "planifiée" && days >= 0
        ? {
            label: t("reunions.quick.daysLeft"),
            value: nf.format(days),
            sub: fmtDate(m.date),
            icon: "calendar_today",
            ...TONE.attente,
          }
        : {
            label: t("reunions.quick.present"),
            value: nf.format(st.present),
            sub: t("reunions.attendance.summary", { present: st.present, absent: st.absent }),
            icon: "group",
            ...TONE.succes,
          },
      {
        label: t("reunions.quick.rate"),
        value: m.status === "tenue" ? `${st.rate} %` : "—",
        sub: t("reunions.attendance.sectionTitle"),
        icon: "trending_up",
        ...TONE.info,
      },
      {
        label: t("reunions.minutes.title"),
        value: m.minutes ? this.minutesStatusLabel(m) : "—",
        sub: m.minutes?.validatedAt
          ? fmtDate(m.minutes.validatedAt)
          : m.minutes
            ? t(MEETING_STATUS_LABEL[m.status])
            : this.minutesStatusLabel(m),
        icon: "description",
        ...this.minutesTone(m),
      },
    ];
  });

  private errMsg(e: unknown): string {
    if (e instanceof AccessDeniedError) return this.locale.tNow(e.key);
    return e instanceof Error ? e.message : String(e);
  }
}

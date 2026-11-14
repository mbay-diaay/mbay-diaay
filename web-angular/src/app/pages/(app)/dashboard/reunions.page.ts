import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { map, startWith } from "rxjs";

import type { CalendarEvent } from "@/lib/calendar";
import { attendanceStats, sortMeetings } from "@/lib/meetings";
import type { Meeting, Member } from "@/lib/mock/cooperative";
import { MEETING_KINDS } from "@/lib/mock/cooperative";
import { scopedMeetings, scopedMembers } from "@/lib/scope";
import { fmtDate, fmtDateTime, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { AccessDeniedError } from "@/lib/store";
import { MEETING_KIND_LABEL, MEETING_STATUS_LABEL } from "@shared/meeting-kinds";
import { AppShellComponent } from "@shared/app-shell.component";
import { GlobalFiltersComponent } from "@shared/global-filters.component";
import { LocaleService } from "@shared/locale.service";
import { MeetingFormDialogComponent } from "@shared/meeting-form-dialog.component";
import { createPager } from "@shared/pager";
import { StoreService } from "@shared/store.service";
import {
  detailFact,
  detailKpi,
  DetailModalComponent,
  IconComponent,
  initialsOf,
  ModalComponent,
  PaginationComponent,
  SnackbarService,
  StatCardsComponent,
  TONE,
  UiEventCalendarComponent,
  V2_PAGE_STYLES,
  type DetailView,
  type StatCard,
} from "@shared/ui";

type Filter = "tous" | "upcoming" | "held" | "cancelled" | "minutesTodo";

const FILTERS: { id: Exclude<Filter, "tous">; label: MessageKey; test: (m: Meeting) => boolean }[] =
  [
    { id: "upcoming", label: "reunions.filter.upcoming", test: (m) => m.status === "planifiée" },
    { id: "held", label: "reunions.filter.held", test: (m) => m.status === "tenue" },
    { id: "cancelled", label: "reunions.filter.cancelled", test: (m) => m.status === "annulée" },
    {
      id: "minutesTodo",
      label: "reunions.filter.minutesTodo",
      test: (m) => m.status === "tenue" && m.minutes?.status !== "validé",
    },
  ];

/** Couleurs d'état (charte V2). */
const STATUS = { planifiée: TONE.info, tenue: TONE.succes, annulée: TONE.neutre } as const;
const MINUTES = {
  none: { label: "reunions.minutes.none" as MessageKey, ...TONE.neutre },
  brouillon: { label: "reunions.minutes.brouillon" as MessageKey, ...TONE.attente },
  validé: { label: "reunions.minutes.validé" as MessageKey, ...TONE.succes },
};
const DAY = 86_400_000;

/**
 * Réunions et procès-verbaux (charte V2) : statistiques, recherche + filtres à compteurs + coopérative,
 * vue liste (tableau paginé) ou calendrier, détail en modale, pointage des présences et annulation en modale.
 */
@Component({
  selector: "app-reunions-page",
  imports: [
    AppShellComponent,
    DetailModalComponent,
    GlobalFiltersComponent,
    IconComponent,
    MeetingFormDialogComponent,
    ModalComponent,
    PaginationComponent,
    StatCardsComponent,
    UiEventCalendarComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .date {
        display: grid;
        width: 52px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 14px;
        padding: 6px 0;
        text-align: center;
      }
      .meter {
        display: block;
        height: 6px;
        width: 100%;
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
      .act-ok:hover {
        border-color: var(--v2-vert-pousse);
        background: var(--v2-sauge);
        color: var(--v2-vert-pousse);
      }
      .act-danger:hover {
        border-color: var(--v2-erreur-fg);
        background: var(--v2-erreur-bg);
        color: var(--v2-erreur-fg);
      }
      .people {
        max-height: 46vh;
        overflow-y: auto;
        border-radius: 18px;
        border: 1px solid var(--v2-bord-carte);
      }
      .person {
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
      .person:first-child {
        border-top: none;
      }
      .person:hover {
        background: var(--v2-creme);
      }
      .person input {
        height: 20px;
        width: 20px;
        accent-color: var(--v2-foret);
        cursor: pointer;
      }
      .area {
        width: 100%;
        min-height: 110px;
        border-radius: 16px;
        border: 1.5px solid var(--v2-gris-trait);
        background: var(--v2-blanc);
        padding: 12px 16px;
        font-size: 15px;
        font-weight: 600;
        color: var(--v2-encre);
      }
      .area::placeholder {
        color: var(--v2-gris-texte);
        font-weight: 500;
      }
      .area:focus-visible {
        outline: none;
        border: 2px solid var(--v2-foret);
        box-shadow: var(--v2-halo);
      }
      .lbl {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--v2-ardoise);
      }
    `,
  ],
  template: `
    <app-shell perm="meeting.read" [area]="t()('reunions.area')">
      <!-- ───── En-tête ───── -->
      <header class="rise flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("reunions.eyebrow") }}</p>
          <h1
            class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
          >
            {{ t()("reunions.title") }}
          </h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
            {{ t()("reunions.description") }}
          </p>
        </div>
        @if (canManage()) {
          <button type="button" class="btn btn-primary" (click)="openNewMeeting()">
            {{ t()("reunions.new") }}
            <span class="btn-chip"><ui-icon name="calendar_month" [size]="20" /></span>
          </button>
        }
      </header>

      <!-- ───── Statistiques ───── -->
      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <!-- ───── Recherche · filtres · coopérative · affichage ───── -->
      <div class="toolbar card mt-6">
        <label class="search">
          <ui-icon name="search" [size]="20" />
          <input
            type="search"
            [placeholder]="t()('reunions.search.placeholder')"
            [attr.aria-label]="t()('reunions.search.aria')"
            [value]="q()"
            (input)="q.set($any($event.target).value)"
          />
        </label>
        <app-global-filters />
        <div class="seg" role="radiogroup" [attr.aria-label]="t()('reunions.filter.aria')">
          <button
            type="button"
            role="radio"
            [class.on]="filter() === 'tous'"
            [attr.aria-checked]="filter() === 'tous'"
            (click)="filter.set('tous')"
          >
            {{ t()("reunions.filter.all")
            }}<span class="n" [class.zero]="!mine().length">{{ nf.format(mine().length) }}</span>
          </button>
          @for (filterDef of filters; track filterDef.id) {
            <button
              type="button"
              role="radio"
              [class.on]="filter() === filterDef.id"
              [attr.aria-checked]="filter() === filterDef.id"
              (click)="filter.set(filterDef.id)"
            >
              {{ t()(filterDef.label)
              }}<span class="n" [class.zero]="!countFor(filterDef.id)">{{
                nf.format(countFor(filterDef.id))
              }}</span>
            </button>
          }
        </div>
        <div class="seg" role="radiogroup" [attr.aria-label]="t()('reunions.view.aria')">
          <button
            type="button"
            role="radio"
            [class.on]="vueMode() === 'liste'"
            [attr.aria-checked]="vueMode() === 'liste'"
            (click)="setVueMode('liste')"
          >
            <ui-icon name="view_list" [size]="18" />{{ t()("reunions.view.list") }}
          </button>
          <button
            type="button"
            role="radio"
            [class.on]="vueMode() === 'calendrier'"
            [attr.aria-checked]="vueMode() === 'calendrier'"
            (click)="setVueMode('calendrier')"
          >
            <ui-icon name="calendar_month" [size]="18" />{{ t()("reunions.view.calendar") }}
          </button>
        </div>
      </div>

      <p class="sub mt-4" aria-live="polite">
        {{
          t()("reunions.count", {
            shown: nf.format(shown().length),
            total: nf.format(mine().length),
          })
        }}
      </p>

      @if (vueMode() === "calendrier") {
        <section class="card mt-3 p-4 sm:p-5">
          <ui-event-calendar
            [events]="calendarEvents()"
            [categories]="meetingCategories()"
            [dayCreateEnabled]="canManage()"
            (eventClick)="detailId.set($event.id)"
            (dayCreate)="onCalendarDayCreate($event)"
          />
        </section>
      } @else {
        <section class="card mt-3 overflow-hidden">
          @if (shown().length) {
            <div class="overflow-x-auto">
              <table class="tbl min-w-[900px]">
                <thead>
                  <tr>
                    <th>{{ t()("reunions.col.title") }}</th>
                    <th>{{ t()("reunions.col.status") }}</th>
                    <th>{{ t()("reunions.col.place") }}</th>
                    <th class="w-[180px]">{{ t()("reunions.col.attendance") }}</th>
                    <th>{{ t()("reunions.col.minutes") }}</th>
                    <th class="text-right">{{ t()("reunions.col.actions") }}</th>
                  </tr>
                </thead>
                <tbody>
                  @for (meeting of pager.items(); track meeting.id) {
                    <tr class="row-link" (click)="detailId.set(meeting.id)">
                      <td>
                        <span class="flex items-center gap-3">
                          <span
                            class="date"
                            [style.background]="
                              meeting.status === 'planifiée' ? 'var(--v2-foret)' : 'var(--v2-creme)'
                            "
                            [style.color]="
                              meeting.status === 'planifiée'
                                ? 'var(--v2-blanc)'
                                : 'var(--v2-ardoise)'
                            "
                          >
                            <span class="text-[18px] font-extrabold leading-none">{{
                              day(meeting.date)
                            }}</span>
                            <span
                              class="mono mt-1"
                              style="font-size: 10px"
                              [style.color]="
                                meeting.status === 'planifiée'
                                  ? 'var(--v2-citron)'
                                  : 'var(--v2-gris-texte)'
                              "
                              >{{ month(meeting.date) }}</span
                            >
                          </span>
                          <span class="min-w-0">
                            <span
                              class="block max-w-[300px] truncate font-bold"
                              [title]="meeting.title"
                              >{{ meeting.title }}</span
                            >
                            <span class="sub block truncate"
                              >{{ t()(kindLabel[meeting.kind]) }} ·
                              {{ fmtDateTime(meeting.date) }}</span
                            >
                          </span>
                        </span>
                      </td>
                      <td>
                        <span
                          class="badge"
                          [style.background]="status[meeting.status].bg"
                          [style.color]="status[meeting.status].fg"
                          >{{ t()(statusLabel[meeting.status]) }}</span
                        >
                      </td>
                      <td class="max-w-48 truncate font-medium" [title]="meeting.place">
                        {{ meeting.place }}
                      </td>
                      <td>
                        @if (meeting.status === "tenue") {
                          @let attendanceStat = attendance(meeting);
                          <span class="block text-[13px] font-bold tabular-nums">{{
                            t()(
                              attendanceStat.present > 1
                                ? "reunions.attendance.autre"
                                : "reunions.attendance.un",
                              { count: attendanceStat.present, total: attendanceStat.total }
                            )
                          }}</span>
                          <span class="meter mt-1.5" aria-hidden="true"
                            ><span [style.width.%]="attendanceStat.rate"></span
                          ></span>
                        } @else {
                          <span class="zero">—</span>
                        }
                      </td>
                      <td>
                        @if (meeting.status === "tenue") {
                          @let minutesState = minutes[meeting.minutes?.status ?? "none"];
                          <span
                            class="badge"
                            [style.background]="minutesState.bg"
                            [style.color]="minutesState.fg"
                            >{{ t()(minutesState.label) }}</span
                          >
                        } @else {
                          <span class="zero">—</span>
                        }
                      </td>
                      <td>
                        <span class="flex justify-end gap-2">
                          @if (canManage() && meeting.status === "planifiée") {
                            <!-- Pointage seulement une fois la date passée (règle du store). -->
                            @if (isPast(meeting.date)) {
                              <button
                                type="button"
                                class="act act-ok"
                                [title]="t()('reunions.attendance.submit')"
                                [attr.aria-label]="
                                  t()('reunions.row.hold', { title: meeting.title })
                                "
                                (click)="$event.stopPropagation(); openHold(meeting.id)"
                              >
                                <ui-icon name="task_alt" [size]="18" />
                              </button>
                            }
                            <button
                              type="button"
                              class="act act-danger"
                              [title]="t()('reunions.cancel.submit')"
                              [attr.aria-label]="
                                t()('reunions.row.cancel', { title: meeting.title })
                              "
                              (click)="$event.stopPropagation(); openCancel(meeting.id)"
                            >
                              <ui-icon name="close" [size]="18" />
                            </button>
                          }
                          <button
                            type="button"
                            class="act"
                            [title]="t()('common.view')"
                            [attr.aria-label]="t()('reunions.row.view', { title: meeting.title })"
                            (click)="$event.stopPropagation(); detailId.set(meeting.id)"
                          >
                            <ui-icon name="visibility" [size]="18" />
                          </button>
                        </span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <ui-pagination class="px-5 pb-5" [pager]="pager" />
          } @else {
            <div class="flex flex-col items-center gap-3 p-10 text-center">
              <span
                class="grid size-14 place-items-center rounded-[16px]"
                style="background: var(--v2-sauge); color: var(--v2-foret)"
                ><ui-icon name="event" [size]="26"
              /></span>
              <p class="text-[16px] font-extrabold">{{ t()("reunions.empty.title") }}</p>
              <p class="sub max-w-md">
                {{
                  mine().length
                    ? t()("reunions.empty.filtered")
                    : canManage()
                      ? t()("reunions.empty.create")
                      : t()("reunions.empty.readonly")
                }}
              </p>
            </div>
          }
        </section>
      }

      <!-- ───── Détail ───── -->
      <ui-detail-modal [view]="detail()" (closed)="detailId.set(null)" />

      <!-- ───── Pointage des présences → réunion tenue ───── -->
      @if (holdMeeting(); as meetingToHold) {
        <ui-modal
          [open]="true"
          [title]="t()('reunions.attendance.title')"
          [description]="meetingToHold.title + ' · ' + fmtDateTime(meetingToHold.date)"
          icon="task_alt"
          [width]="600"
          [closeLabel]="t()('common.close')"
          (closed)="closeHold()"
        >
          @if (holdMembers().length) {
            <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p class="text-[14px] font-extrabold tabular-nums" aria-live="polite">
                {{
                  t()("reunions.attendance.counter", {
                    present: holdPresentIds().length,
                    total: holdMembers().length,
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
            <ul class="people mb-4" [attr.aria-label]="t()('reunions.attendance.listAria')">
              @for (member of holdMembers(); track member.id) {
                <li>
                  <label class="person">
                    <input
                      type="checkbox"
                      [checked]="holdPresentIds().includes(member.id)"
                      (change)="toggleHold(member.id, $event)"
                    />
                    <span class="avatar" style="height: 32px; width: 32px; font-size: 11px">{{
                      initials(member.firstName + " " + member.lastName)
                    }}</span>
                    <span class="min-w-0 flex-1 truncate"
                      >{{ member.firstName }} {{ member.lastName }}</span
                    >
                  </label>
                </li>
              }
            </ul>
            @if (!holdPresentIds().length) {
              <p class="sub mb-4">{{ t()("reunions.attendance.none") }}</p>
            }
          } @else {
            <p class="sub mb-4">{{ t()("reunions.attendance.noMembers") }}</p>
          }
          <button modal-footer type="button" class="btn btn-ghost" (click)="closeHold()">
            {{ t()("producteurs.index.cancel") }}
          </button>
          <button
            modal-footer
            type="button"
            class="btn btn-primary"
            [disabled]="!holdPresentIds().length"
            (click)="submitHold(meetingToHold.id)"
          >
            {{ t()("reunions.attendance.submit") }}
            <span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
          </button>
        </ui-modal>
      }

      <!-- ───── Annulation ───── -->
      @if (cancelMeeting(); as meetingToCancel) {
        <ui-modal
          tone="danger"
          [open]="true"
          [title]="t()('reunions.cancel.title')"
          [description]="t()('reunions.cancel.description')"
          icon="close"
          [width]="560"
          [closeLabel]="t()('common.close')"
          (closed)="closeCancel()"
        >
          <p
            class="mb-4 rounded-[16px] px-4 py-3 text-[14px] font-bold"
            style="background: var(--v2-creme)"
          >
            {{ meetingToCancel.title }} · {{ fmtDateTime(meetingToCancel.date) }}
          </p>
          <label class="lbl" for="cancel-reason">{{ t()("reunions.cancel.reason") }}</label>
          <textarea
            id="cancel-reason"
            class="area mt-2"
            rows="4"
            [placeholder]="t()('reunions.cancel.reasonHint')"
            [value]="cancelReason()"
            (input)="cancelReason.set($any($event.target).value)"
          ></textarea>
          <p class="sub mb-4 mt-1.5">{{ t()("reunions.cancel.reasonHint") }}</p>
          <button modal-footer type="button" class="btn btn-ghost" (click)="closeCancel()">
            {{ t()("reunions.cancel.keep") }}
          </button>
          <button
            modal-footer
            type="button"
            class="btn"
            style="background: var(--v2-erreur-fg); color: var(--v2-blanc)"
            [disabled]="cancelReason().trim().length < 3"
            (click)="submitCancel()"
          >
            {{ t()("reunions.cancel.submit") }}
          </button>
        </ui-modal>
      }

      <app-meeting-form-dialog
        [(open)]="meetingFormOpen"
        [defaultScoopId]="defaultScoopId()"
        [defaultDate]="meetingFormDefaultDate()"
        (notify)="onMeetingFormNotify($event)"
      />
    </app-shell>
  `,
})
export default class ReunionsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly initials = initialsOf;
  protected readonly filters = FILTERS;
  protected readonly kindLabel = MEETING_KIND_LABEL;
  protected readonly statusLabel = MEETING_STATUS_LABEL;
  protected readonly status = STATUS;
  protected readonly minutes = MINUTES;
  private readonly snackbar = inject(SnackbarService);
  protected readonly detailId = signal<string | null>(null);

  /** Aligné sur React : ?vue=calendrier pour la vue agenda. */
  private readonly vueFromUrl = toSignal(
    this.route.queryParamMap.pipe(
      map((p) => (p.get("vue") === "calendrier" ? "calendrier" : "liste")),
      startWith(
        this.route.snapshot.queryParamMap.get("vue") === "calendrier" ? "calendrier" : "liste",
      ),
    ),
    { requireSync: true },
  );

  protected readonly defaultScoopId = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get("scoop") ?? undefined)),
    { initialValue: this.route.snapshot.queryParamMap.get("scoop") ?? undefined },
  );

  protected readonly vueMode = computed(() => this.vueFromUrl() ?? "liste");

  protected readonly q = signal("");
  protected readonly filter = signal<Filter>("tous");

  protected readonly holdMeetingId = signal<string | null>(null);
  /** IDs présents cochés pour holdMeeting */
  protected readonly holdPresentIds = signal<string[]>([]);

  protected readonly cancelMeetingId = signal<string | null>(null);
  protected readonly cancelReason = signal("");

  protected readonly meetingFormOpen = signal(false);
  protected readonly meetingFormDefaultDate = signal<Date | undefined>(undefined);

  protected readonly mine = computed(() =>
    sortMeetings(
      scopedMeetings(this.store.state().meetings, this.store.state().session),
      new Date().toISOString(),
    ),
  );

  protected readonly canManage = computed(() => this.store.can("meeting.manage"));

  private readonly memberCount = computed(() => {
    const counts = new Map<string, number>();
    for (const m of scopedMembers(this.store.state().members, this.store.state().session)) {
      if (m.status === "membre") counts.set(m.scoopId, (counts.get(m.scoopId) ?? 0) + 1);
    }
    return counts;
  });

  protected readonly shown = computed(() => {
    const active = FILTERS.find((f) => f.id === this.filter());
    const needle = this.q().trim().toLowerCase();
    return this.mine().filter(
      (m) =>
        (!active || active.test(m)) &&
        (!needle || `${m.title} ${m.place}`.toLowerCase().includes(needle)),
    );
  });

  protected readonly calendarEvents = computed((): CalendarEvent[] =>
    this.shown().map((m) => {
      const start = new Date(m.date);
      return {
        id: m.id,
        title: m.title,
        start,
        end: new Date(start.getTime() + 2 * 3_600_000),
        tone: m.status === "planifiée" ? "info" : m.status === "tenue" ? "success" : "neutral",
        category: m.kind,
        subtitle: m.place,
        muted: m.status === "annulée",
      };
    }),
  );

  protected readonly meetingCategories = computed(() =>
    MEETING_KINDS.map((k) => [k, this.t()(MEETING_KIND_LABEL[k])] as const),
  );

  protected readonly holdMeeting = computed(() => {
    const id = this.holdMeetingId();
    if (!id) return undefined;
    return this.mine().find((x) => x.id === id);
  });

  protected readonly holdMembers = computed((): Member[] => {
    const hm = this.holdMeeting();
    if (!hm) return [];
    const session = this.store.state().session;
    const list = scopedMembers(this.store.state().members, session).filter(
      (m) => m.scoopId === hm.scoopId && m.status === "membre",
    );
    return [...list].sort((a, b) =>
      `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`, "fr"),
    );
  });

  protected readonly holdAllSelected = computed(() => {
    const members = this.holdMembers();
    const ids = this.holdPresentIds();
    return members.length > 0 && ids.length === members.length;
  });

  protected countFor(id: Exclude<Filter, "tous">): number {
    const f = FILTERS.find((x) => x.id === id)!;
    return this.mine().filter(f.test).length;
  }

  protected setVueMode(mode: "liste" | "calendrier"): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { vue: mode === "calendrier" ? "calendrier" : null },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }

  protected openNewMeeting(): void {
    this.meetingFormDefaultDate.set(undefined);
    this.meetingFormOpen.set(true);
  }

  protected onCalendarDayCreate(day: Date): void {
    this.meetingFormDefaultDate.set(day);
    this.meetingFormOpen.set(true);
  }

  protected onMeetingFormNotify(ev: { kind: "success" | "error"; text: string }): void {
    this.flash(ev.kind, ev.text);
  }

  protected attendance(m: Meeting) {
    return attendanceStats(m, this.memberCount().get(m.scoopId) ?? 0);
  }

  protected isPast(iso: string): boolean {
    return iso <= new Date().toISOString();
  }

  protected day(iso: string): string {
    return this.locale.formatDate(iso, { day: "2-digit" });
  }

  protected month(iso: string): string {
    return this.locale.formatDate(iso, { month: "short" }).replace(".", "");
  }

  protected readonly cancelMeeting = computed(() => {
    const id = this.cancelMeetingId();
    return id ? (this.mine().find((m) => m.id === id) ?? null) : null;
  });

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const all = this.mine();
    const now = new Date().toISOString();
    const upcoming = all
      .filter((m) => m.status === "planifiée" && m.date >= now)
      .sort((a, b) => a.date.localeCompare(b.date));
    const held = all.filter((m) => m.status === "tenue");
    const rates = held.map((m) => this.attendance(m).rate);
    const avg = rates.length ? Math.round(rates.reduce((a, b) => a + b, 0) / rates.length) : 0;
    const todo = all.filter((m) => m.status === "tenue" && m.minutes?.status !== "validé").length;
    return [
      {
        label: t("reunions.stat.total"),
        value: nf.format(all.length),
        sub: t("reunions.stat.totalSub", {
          count: all.filter((m) => m.kind === "assemblée générale").length,
        }),
        icon: "event",
        bg: "",
        fg: "",
      },
      {
        label: t("reunions.stat.upcoming"),
        value: nf.format(upcoming.length),
        sub: upcoming[0]
          ? t("reunions.stat.upcomingSub", { date: fmtDate(upcoming[0].date) })
          : t("reunions.stat.upcomingNone"),
        icon: "event_upcoming",
        ...TONE.info,
      },
      {
        label: t("reunions.stat.held"),
        value: nf.format(held.length),
        sub: t("reunions.stat.heldSub", { pct: avg }),
        icon: "task_alt",
        ...TONE.succes,
      },
      {
        label: t("reunions.stat.minutes"),
        value: nf.format(todo),
        sub: t("reunions.stat.minutesSub"),
        icon: "description",
        ...(todo ? TONE.attente : TONE.succes),
      },
    ];
  });

  // ── Détail en modale ──
  protected readonly detail = computed<DetailView | null>(() => {
    const id = this.detailId();
    const m = id ? this.mine().find((x) => x.id === id) : null;
    if (!m) return null;
    const t = this.t();
    const s = this.store.state();
    const a = this.attendance(m);
    const daysLeft = Math.ceil((new Date(m.date).getTime() - Date.now()) / DAY);
    const present = s.members.filter((x) => m.presentIds.includes(x.id));
    const mn = MINUTES[m.minutes?.status ?? "none"];
    return {
      title: m.title,
      subtitle: `${this.locale.formatDate(m.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · ${m.place}`,
      icon: "event",
      badges: [
        { label: t(MEETING_STATUS_LABEL[m.status]), ...STATUS[m.status] },
        { label: t(MEETING_KIND_LABEL[m.kind]), ...TONE.culture },
        ...(m.status === "tenue"
          ? [{ label: `${t("reunions.col.minutes")} : ${t(mn.label)}`, bg: mn.bg, fg: mn.fg }]
          : []),
      ],
      kpis: [
        detailKpi(t("reunions.quick.agenda"), m.agenda.length, "fact_check", TONE.info),
        ...(m.status === "tenue"
          ? [
              detailKpi(t("reunions.quick.present"), a.present, "group", TONE.succes),
              detailKpi(
                t("reunions.quick.rate"),
                a.rate,
                "trending_up",
                TONE.culture,
                `${a.rate} %`,
              ),
            ]
          : m.status === "planifiée" && daysLeft >= 0
            ? [detailKpi(t("reunions.quick.daysLeft"), daysLeft, "calendar_today", TONE.attente)]
            : []),
      ],
      facts: [
        detailFact(t("reunions.detail.when"), fmtDateTime(m.date), "calendar_today"),
        detailFact(t("reunions.detail.where"), m.place, "location_on"),
        detailFact(
          t("reunions.detail.mode"),
          t(m.mode === "en ligne" ? "reunions.form.mode.online" : m.mode === "mixte" ? "reunions.form.mode.mixed" : "reunions.form.mode.onsite"),
          m.mode === "sur place" || !m.mode ? "location_on" : "public",
        ),
        ...(m.onlineUrl ? [detailFact(t("reunions.detail.link"), m.onlineUrl, "link", { wide: true })] : []),
        detailFact(
          t("reunions.detail.convoked"),
          m.audience && (m.audience.orgIds.length || m.audience.staffIds.length || m.audience.others.length)
            ? t("reunions.detail.convokedSummary", { orgs: m.audience.orgIds.length, staff: m.audience.staffIds.length, others: m.audience.others.length })
            : t("reunions.detail.convokedNone"),
          "group",
          { wide: true },
        ),
        detailFact(
          t("reunions.detail.scoop"),
          s.scoops.find((c) => c.id === m.scoopId)?.name,
          "apartment",
        ),
        detailFact(t("reunions.quick.createdBy"), m.createdBy, "badge"),
        ...(m.cancelReason
          ? [detailFact(t("reunions.cancel.reason"), m.cancelReason, "warning", { wide: true })]
          : []),
      ],
      sections: [
        {
          title: t("reunions.detail.agenda"),
          icon: "fact_check",
          count: null,
          empty: t("reunions.detail.agendaNone"),
          items: m.agenda.map((x, i) => ({ label: x, index: i + 1 })),
          more: 0,
        },
        ...(m.status === "tenue"
          ? [
              {
                title: t("reunions.attendance.presentList"),
                icon: "group" as const,
                count: present.length,
                empty: t("reunions.attendance.nobody"),
                items: present
                  .slice(0, 8)
                  .map((x) => ({
                    label: `${x.firstName} ${x.lastName}`,
                    sub: x.village,
                    initials: initialsOf(`${x.firstName} ${x.lastName}`),
                  })),
                more: Math.max(0, present.length - 8),
              },
            ]
          : []),
      ],
      link: ["/dashboard/reunions", m.id],
    };
  });

  protected openHold(meetingId: string): void {
    this.holdMeetingId.set(meetingId);
    this.holdPresentIds.set([]);
  }

  protected closeHold(): void {
    this.holdMeetingId.set(null);
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
    const members = this.holdMembers();
    if (this.holdAllSelected()) {
      this.holdPresentIds.set([]);
    } else {
      this.holdPresentIds.set(members.map((m) => m.id));
    }
  }

  protected submitHold(meetingId: string): void {
    const ids = this.holdPresentIds();
    try {
      const res = this.store.actions.holdMeeting(meetingId, ids);
      if (!res.ok) {
        this.flash("error", this.locale.tNow(res.error as MessageKey));
        return;
      }
      this.flash("success", this.t()("reunions.attendance.done"));
      this.closeHold();
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }

  protected openCancel(meetingId: string): void {
    this.cancelMeetingId.set(meetingId);
    this.cancelReason.set("");
  }

  protected closeCancel(): void {
    this.cancelMeetingId.set(null);
    this.cancelReason.set("");
  }

  protected submitCancel(): void {
    const id = this.cancelMeetingId();
    if (!id) return;
    const reason = this.cancelReason().trim();
    try {
      const res = this.store.actions.cancelMeeting(id, reason);
      if (!res.ok) {
        this.flash("error", this.locale.tNow(res.error as MessageKey));
        return;
      }
      this.flash("success", this.t()("reunions.cancel.done"));
      this.closeCancel();
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }

  private flash(kind: "success" | "error", text: string): void {
    if (kind === "success") this.snackbar.success(text);
    else this.snackbar.error(text);
  }

  protected errMsg(e: unknown): string {
    if (e instanceof AccessDeniedError) return this.locale.tNow(e.key);
    return e instanceof Error ? e.message : String(e);
  }

  /** Pagination (shown) : mêmes règles que l'API (?page=&limit=). */
  protected readonly pager = createPager(() => this.shown());
}

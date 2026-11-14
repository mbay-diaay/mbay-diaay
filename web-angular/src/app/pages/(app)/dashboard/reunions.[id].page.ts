import { Component, computed, effect, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";
import {
  LucideAngularModule,
  ArrowLeft,
  CalendarDays,
  CircleCheck,
  FileText,
  Pencil,
  Users,
  XCircle,
} from "lucide-angular";

import { fmtDate, fmtDateTime } from "@/lib/format";
import { attendanceStats, canEditMinutes, isMeetingEditable } from "@/lib/meetings";
import type { Meeting } from "@/lib/mock/cooperative";
import { scopedMeetings, scopedMembers } from "@/lib/scope";
import type { MessageKey } from "@/lib/i18n";
import { AccessDeniedError } from "@/lib/store";
import { MEETING_KIND_LABEL, MEETING_STATUS_LABEL, MEETING_STATUS_TONE } from "../shared/meeting-kinds";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiModalA11yDirective } from "../shared/ui/modal-a11y.directive";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";
import { MeetingFormDialogComponent } from "../shared/meeting-form-dialog.component";

/** Fiche réunion : tenue / annulation, procès-verbal (aligné sur reunions.$id.tsx). */
@Component({
  selector: "app-reunion-detail-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    MeetingFormDialogComponent,
    UiPageHeaderComponent,
    UiEmptyComponent,
    UiModalA11yDirective,
    UiPillComponent,
    UiButtonComponent,
  ],
  template: `
    <app-shell perm="meeting.read" [area]="t()('reunions.detail.area')">
      @if (!meeting()) {
        <ui-empty>
          <div class="mx-auto mb-3 grid size-12 place-items-center text-muted-foreground">
            <lucide-angular [img]="icons.cal" class="size-8" />
          </div>
          <p class="font-semibold">{{ t()("reunions.detail.notFound.title") }}</p>
          <p class="mt-1 text-sm">{{ t()("reunions.detail.notFound.text") }}</p>
        </ui-empty>
      } @else {
        @if (meeting(); as m) {
          <a
            routerLink="/reunions"
            class="mb-4 inline-flex min-h-10 items-center gap-1 rounded-md text-sm text-muted-foreground hover:text-foreground"
          >
            <lucide-angular [img]="icons.arrowLeft" class="size-4" />
            {{ t()("reunions.detail.back") }}
          </a>

          @if (fb(); as msg) {
            <p
              class="mb-4 rounded-md border border-border bg-muted/50 px-3 py-2 text-sm"
              [class.text-destructive]="msg.kind === 'error'"
            >
              {{ msg.text }}
            </p>
          }

          <ui-page-header
            [eyebrow]="t()('reunions.detail.eyebrow', { kind: t()(MEETING_KIND_LABEL[m.kind]) })"
            [title]="m.title"
            [description]="
              fmtDateTime(m.date) +
              ' · ' +
              m.place +
              ' · ' +
              scoopName(m.scoopId)
            "
          >
            <ui-pill actions [tone]="MEETING_STATUS_TONE[m.status]">{{
              t()(MEETING_STATUS_LABEL[m.status])
            }}</ui-pill>
          </ui-page-header>

          @if (m.status === "annulée") {
            <p class="mb-4 rounded-md bg-muted p-4 text-sm">
              {{ t()("reunions.detail.cancelledReason", { reason: m.cancelReason ?? "" }) }}
            </p>
          }

          <div class="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div class="space-y-6">
              <section class="surface p-5" aria-labelledby="agenda-title">
                <h2 id="agenda-title" class="font-semibold">{{ t()("reunions.detail.agenda") }}</h2>
                @if (m.agenda.length) {
                  <ol class="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
                    @for (line of m.agenda; track $index) {
                      <li>{{ line }}</li>
                    }
                  </ol>
                } @else {
                  <p class="mt-2 text-sm text-muted-foreground">{{ t()("reunions.detail.agendaNone") }}</p>
                }
                <dl class="mt-4 grid grid-cols-1 gap-4 border-t pt-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("reunions.detail.when") }}</dt>
                    <dd class="mt-0.5 font-medium">{{ fmtDateTime(m.date) }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("reunions.detail.where") }}</dt>
                    <dd class="mt-0.5 font-medium">{{ m.place }}</dd>
                  </div>
                  <div class="sm:col-span-2">
                    <dt class="text-xs text-muted-foreground">{{ t()("reunions.detail.scoop") }}</dt>
                    <dd class="mt-0.5 font-medium">{{ scoopName(m.scoopId) }}</dd>
                  </div>
                </dl>
              </section>

              @if (m.status === "tenue") {
                <section class="surface p-5" aria-labelledby="att-title">
                  <h2 id="att-title" class="flex items-center gap-2 font-semibold">
                    <lucide-angular [img]="icons.users" class="size-4" aria-hidden="true" />
                    {{ t()("reunions.attendance.sectionTitle") }}
                  </h2>
                  <p class="mt-2 text-sm">
                    {{
                      t()("reunions.attendance.summary", {
                        present: stats().present,
                        absent: stats().absent,
                      })
                    }}.
                    {{ t()("reunions.attendance.rate", { rate: stats().rate }) }}
                  </p>
                </section>

                <section class="surface p-5" aria-labelledby="pv-title">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <h2 id="pv-title" class="flex items-center gap-2 font-semibold">
                      <lucide-angular [img]="icons.fileText" class="size-4" aria-hidden="true" />
                      {{ t()("reunions.minutes.title") }}
                    </h2>
                    <ui-pill
                      [tone]="
                        m.minutes?.status === 'validé' ? 'success' : m.minutes ? 'warning' : 'neutral'
                      "
                    >
                      {{ minutesStatusLabel(m) }}
                    </ui-pill>
                  </div>

                  @if (minutesEditable()) {
                    <div class="mt-3 space-y-3">
                      <label class="block text-sm font-medium">
                        {{ t()("reunions.minutes.text") }}
                        <span class="block text-xs font-normal text-muted-foreground">{{
                          t()("reunions.minutes.textHint")
                        }}</span>
                        <textarea
                          name="minutes"
                          rows="12"
                          class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          [(ngModel)]="minutesDraft"
                        ></textarea>
                      </label>
                      @if (minutesTried() && !minutesDraft.trim()) {
                        <p class="text-xs text-destructive">{{ t()("reunions.minutes.emptyText") }}</p>
                      }
                      <div class="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                        <ui-button type="button" variant="outline" (click)="saveMinutesDraft()">
                          {{ t()("reunions.minutes.save") }}
                        </ui-button>
                        <ui-button
                          type="button"
                          [disabled]="!minutesDraft.trim()"
                          (click)="openValidateConfirm()"
                        >
                          <lucide-angular [img]="icons.check" class="size-4" />
                          {{ t()("reunions.minutes.validate") }}
                        </ui-button>
                      </div>
                    </div>
                  } @else if (m.minutes) {
                    <div class="mt-3 space-y-3">
                      <p class="whitespace-pre-wrap break-words rounded-md bg-muted/60 p-4 text-sm">
                        {{ m.minutes.text }}
                      </p>
                      @if (m.minutes.status === "validé") {
                        <p class="text-sm font-medium">
                          {{
                            t()("reunions.minutes.validatedBy", {
                              by: m.minutes.validatedBy ?? "",
                              date: m.minutes.validatedAt ? fmtDate(m.minutes.validatedAt) : "",
                            })
                          }}
                        </p>
                        <p class="text-xs text-muted-foreground">{{ t()("reunions.minutes.lockedNote") }}</p>
                      }
                    </div>
                  } @else {
                    <p class="mt-3 text-sm text-muted-foreground">{{ t()("reunions.minutes.readonlyNone") }}</p>
                  }
                </section>
              }
            </div>

            <div class="space-y-6">
              @if (canManage() && m.status === 'planifiée') {
                <section class="surface p-5" aria-labelledby="actions-title">
                  <h2 id="actions-title" class="font-semibold">{{ t()("reunions.detail.actions") }}</h2>
                  <div class="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    @if (canEditMeeting(m)) {
                      <ui-button variant="outline" (click)="openEditDialog()">
                        <lucide-angular [img]="icons.pencil" class="size-4" />
                        {{ t()("reunions.detail.edit") }}
                      </ui-button>
                    }
                    <ui-button (click)="openHoldDialog()">
                      <lucide-angular [img]="icons.check" class="size-4" />
                      {{ t()("reunions.detail.hold") }}
                    </ui-button>
                    <ui-button variant="outline" (click)="openCancelDialog()">
                      <lucide-angular [img]="icons.xCircle" class="size-4" />
                      {{ t()("reunions.detail.cancel") }}
                    </ui-button>
                  </div>
                </section>
              }

              <section class="surface p-5" aria-labelledby="hist-title">
                <h2 id="hist-title" class="font-semibold">{{ t()("reunions.detail.history") }}</h2>
                <ol class="mt-3 space-y-3 text-sm">
                  @for (h of historyReversed(m); track $index) {
                    <li class="border-l-2 pl-3">
                      <div class="font-medium">
                        {{ historyLabel(h.action) }}
                      </div>
                      <div class="text-xs text-muted-foreground">
                        {{ t()("reunions.detail.historyBy", { by: h.by, date: fmtDateTime(h.at) }) }}
                      </div>
                    </li>
                  }
                </ol>
              </section>
            </div>
          </div>

          <!-- Dialog pointage → tenue -->
          @if (holdOpen()) {
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div
                class="surface flex max-h-[90vh] w-full max-w-lg flex-col p-6 shadow-lg"
                role="dialog"
                aria-modal="true"
                uiModalA11y
                (dismiss)="holdOpen.set(false)"
              >
                <h2 class="text-lg font-semibold">{{ t()("reunions.attendance.title") }}</h2>
                <p class="mt-1 text-sm text-muted-foreground">{{ t()("reunions.attendance.description") }}</p>
                @if (scoopMembers().length) {
                  <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p class="text-sm font-semibold" aria-live="polite">
                      {{
                        t()("reunions.attendance.counter", {
                          present: holdPresentIds().length,
                          total: scoopMembers().length,
                        })
                      }}
                    </p>
                    <ui-button type="button" variant="outline" size="sm" (click)="toggleHoldAll()">
                      {{
                        holdAllSelected()
                          ? t()("reunions.attendance.uncheckAll")
                          : t()("reunions.attendance.checkAll")
                      }}
                    </ui-button>
                  </div>
                  <ul
                    class="mt-2 max-h-[50vh] divide-y overflow-y-auto rounded-md border"
                    [attr.aria-label]="t()('reunions.attendance.listAria')"
                  >
                    @for (mem of scoopMembers(); track mem.id) {
                      <li>
                        <label
                          class="flex min-h-12 cursor-pointer items-center gap-3 px-3 py-2 text-sm hover:bg-muted/60"
                        >
                          <input
                            type="checkbox"
                            [checked]="holdPresentIds().includes(mem.id)"
                            (change)="toggleHold(mem.id, $event)"
                          />
                          <span>{{ mem.firstName }} {{ mem.lastName }}</span>
                        </label>
                      </li>
                    }
                  </ul>
                } @else {
                  <p class="mt-3 text-sm text-muted-foreground">{{ t()("reunions.attendance.noMembers") }}</p>
                }
                @if (!holdPresentIds().length && scoopMembers().length) {
                  <p class="mt-2 text-xs text-muted-foreground">{{ t()("reunions.attendance.none") }}</p>
                }
                <div class="mt-6 flex justify-end gap-2 border-t pt-4">
                  <ui-button type="button" variant="outline" (click)="closeHoldDialog()">{{
                    t()("producteurs.index.cancel")
                  }}</ui-button>
                  <ui-button
                    type="button"
                    [disabled]="!holdPresentIds().length"
                    (click)="submitHoldMeeting()"
                  >
                    {{ t()("reunions.attendance.submit") }}
                  </ui-button>
                </div>
              </div>
            </div>
          }

          <app-meeting-form-dialog
            [(open)]="editOpen"
            [meeting]="meeting()"
            (notify)="onMeetingFormNotify($event)"
          />

          <!-- Annulation -->
          @if (cancelOpen()) {
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div
                class="surface w-full max-w-md p-6 shadow-lg"
                role="dialog"
                aria-modal="true"
                uiModalA11y
                (dismiss)="cancelOpen.set(false)"
              >
                <h2 class="text-lg font-semibold">{{ t()("reunions.cancel.title") }}</h2>
                <p class="mt-1 text-sm text-muted-foreground">{{ t()("reunions.cancel.description") }}</p>
                <form class="mt-4 space-y-3" (ngSubmit)="submitCancelMeeting()">
                  <label class="block text-sm font-medium">
                    {{ t()("reunions.cancel.reason") }}
                    <span class="block text-xs font-normal text-muted-foreground">{{
                      t()("reunions.cancel.reasonHint")
                    }}</span>
                    <textarea
                      name="cancelReason"
                      rows="4"
                      class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      [(ngModel)]="cancelReasonText"
                    ></textarea>
                  </label>
                  @if (cancelReasonText.trim().length > 0 && cancelReasonText.trim().length < 3) {
                    <p class="text-xs text-destructive">{{ t()("reunions.cancel.errorReason") }}</p>
                  }
                  <div class="flex justify-end gap-2">
                    <ui-button type="button" variant="outline" (click)="closeCancelDialog()">
                      {{ t()("reunions.cancel.keep") }}
                    </ui-button>
                    <ui-button
                      type="submit"
                      variant="destructive"
                      [disabled]="cancelReasonText.trim().length < 3"
                    >
                      {{ t()("reunions.cancel.submit") }}
                    </ui-button>
                  </div>
                </form>
              </div>
            </div>
          }

          <!-- Confirmer validation PV -->
          @if (validateConfirmOpen()) {
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div
                class="surface w-full max-w-md p-6 shadow-lg"
                role="dialog"
                aria-modal="true"
                uiModalA11y
                (dismiss)="validateConfirmOpen.set(false)"
              >
                <h2 class="text-lg font-semibold">{{ t()("reunions.minutes.confirmTitle") }}</h2>
                <p class="mt-2 text-sm text-muted-foreground">{{ t()("reunions.minutes.confirmDescription") }}</p>
                @if (minutesDirty()) {
                  <p class="mt-2 text-xs text-muted-foreground">{{ t()("reunions.minutes.confirmUnsaved") }}</p>
                }
                <div class="mt-6 flex justify-end gap-2">
                  <ui-button type="button" variant="outline" (click)="closeValidateConfirm()">{{
                    t()("producteurs.index.cancel")
                  }}</ui-button>
                  <ui-button type="button" (click)="confirmValidateMinutes()">{{
                    t()("reunions.minutes.confirmSubmit")
                  }}</ui-button>
                </div>
              </div>
            </div>
          }
        }
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
  protected readonly MEETING_STATUS_TONE = MEETING_STATUS_TONE;
  protected readonly icons = {
    arrowLeft: ArrowLeft,
    cal: CalendarDays,
    users: Users,
    fileText: FileText,
    check: CircleCheck,
    xCircle: XCircle,
    pencil: Pencil,
  };

  private readonly HISTORY_LABEL: Record<string, MessageKey> = {
    créée: "reunions.detail.history.créée",
    modifiée: "reunions.detail.history.modifiée",
    tenue: "reunions.detail.history.tenue",
    annulée: "reunions.detail.history.annulée",
    "procès-verbal enregistré": "reunions.detail.history.procès-verbal enregistré",
    "procès-verbal validé": "reunions.detail.history.procès-verbal validé",
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
    return !!(m && this.canManage() && canEditMinutes(m));
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

  protected readonly fb = signal<{ kind: "success" | "error"; text: string } | null>(null);
  private fbTimer: ReturnType<typeof setTimeout> | null = null;

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
    if (this.fbTimer) clearTimeout(this.fbTimer);
    this.fb.set({ kind, text });
    this.fbTimer = setTimeout(() => {
      this.fb.set(null);
      this.fbTimer = null;
    }, 4000);
  }

  private errMsg(e: unknown): string {
    if (e instanceof AccessDeniedError) return this.locale.tNow(e.key);
    return e instanceof Error ? e.message : String(e);
  }
}

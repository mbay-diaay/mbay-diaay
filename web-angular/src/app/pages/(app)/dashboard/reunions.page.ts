import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map, startWith } from "rxjs";
import { CalendarDays, CalendarPlus, LucideAngularModule, Search } from "lucide-angular";

import type { CalendarEvent } from "@/lib/calendar";
import { attendanceStats, sortMeetings } from "@/lib/meetings";
import type { Meeting, Member } from "@/lib/mock/cooperative";
import { MEETING_KINDS } from "@/lib/mock/cooperative";
import { scopedMeetings, scopedMembers } from "@/lib/scope";
import { fmtDateTime, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { AccessDeniedError } from "@/lib/store";
import {
  MEETING_KIND_LABEL,
  MEETING_STATUS_LABEL,
  MEETING_STATUS_TONE,
} from "../shared/meeting-kinds";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiEventCalendarComponent } from "../shared/ui/event-calendar.component";
import { UiModalA11yDirective } from "../shared/ui/modal-a11y.directive";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent, type UiPillTone } from "../shared/ui/pill.component";
import { MeetingFormDialogComponent } from "../shared/meeting-form-dialog.component";

type Filter = "tous" | "upcoming" | "held" | "cancelled" | "minutesTodo";

const FILTERS: {
  id: Exclude<Filter, "tous">;
  label: MessageKey;
  test: (m: Meeting) => boolean;
}[] = [
  { id: "upcoming", label: "reunions.filter.upcoming", test: (m) => m.status === "planifiée" },
  { id: "held", label: "reunions.filter.held", test: (m) => m.status === "tenue" },
  { id: "cancelled", label: "reunions.filter.cancelled", test: (m) => m.status === "annulée" },
  {
    id: "minutesTodo",
    label: "reunions.filter.minutesTodo",
    test: (m) => m.status === "tenue" && m.minutes?.status !== "validé",
  },
];

const MINUTES_LABEL = {
  none: "reunions.minutes.none",
  brouillon: "reunions.minutes.brouillon",
  validé: "reunions.minutes.validé",
} as const satisfies Record<string, MessageKey>;

const MINUTES_TONE: Record<"none" | "brouillon" | "validé", UiPillTone> = {
  none: "neutral",
  brouillon: "warning",
  validé: "success",
};

/** Port de reunions.index.tsx — liste filtrable, marquer tenue / annuler pour les réunions planifiées. */
@Component({
  selector: "app-reunions-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    MeetingFormDialogComponent,
    UiChipRailComponent,
    UiEmptyComponent,
    UiEventCalendarComponent,
    UiModalA11yDirective,
    UiPageHeaderComponent,
    UiPillComponent,
    UiButtonComponent,
  ],
  template: `
    <app-shell perm="meeting.read" [area]="t()('reunions.area')">
      <ui-page-header
        [eyebrow]="t()('reunions.eyebrow')"
        [title]="t()('reunions.title')"
        [description]="t()('reunions.description')"
      >
        @if (canManage()) {
          <ui-button actions (click)="openNewMeeting()">
            <lucide-angular [img]="icons.calendarPlus" class="size-4" />
            {{ t()("reunions.new") }}
          </ui-button>
        }
      </ui-page-header>

      @if (feedback(); as fb) {
        <p
          class="mb-3 rounded-md border border-border bg-muted/50 px-3 py-2 text-sm"
          [class.text-destructive]="fb.kind === 'error'"
        >
          {{ fb.text }}
        </p>
      }

      <div class="surface mb-3 space-y-3 p-3">
        <div class="relative min-w-0">
          <lucide-angular
            [img]="icons.search"
            class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm shadow-sm pointer-coarse:h-touch focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:max-w-sm"
            [attr.aria-label]="t()('reunions.search.aria')"
            [placeholder]="t()('reunions.search.placeholder')"
            [ngModel]="q()"
            (ngModelChange)="q.set($event)"
          />
        </div>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ui-chip-rail [attr.aria-label]="t()('reunions.filter.aria')" class="min-w-0 flex-1">
            <button
              type="button"
              class="chip-filter chip-filter-sm"
              [class.chip-filter-active]="filter() === 'tous'"
              [attr.aria-pressed]="filter() === 'tous'"
              (click)="filter.set('tous')"
            >
              {{ t()("reunions.filter.all") }}
              <span class="chip-filter-count">{{ nf.format(mine().length) }}</span>
            </button>
            @for (f of filters; track f.id) {
              <button
                type="button"
                class="chip-filter chip-filter-sm"
                [class.chip-filter-active]="filter() === f.id"
                [attr.aria-pressed]="filter() === f.id"
                (click)="filter.set(filter() === f.id ? 'tous' : f.id)"
              >
                {{ t()(f.label) }}
                <span class="chip-filter-count">{{ nf.format(countFor(f.id)) }}</span>
              </button>
            }
          </ui-chip-rail>
          <div
            class="inline-flex w-full min-w-0 shrink-0 rounded-md border border-input bg-muted/30 p-0.5 sm:w-auto"
            role="group"
            [attr.aria-label]="t()('reunions.view.aria')"
          >
          <button
            type="button"
            class="min-w-0 flex-1 rounded px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pointer-coarse:min-h-touch pointer-coarse:px-3 sm:flex-none"
            [class.bg-card]="vueMode() === 'liste'"
            [class.shadow-sm]="vueMode() === 'liste'"
            [class.text-foreground]="vueMode() === 'liste'"
            [class.text-muted-foreground]="vueMode() !== 'liste'"
            (click)="setVueMode('liste')"
          >
            {{ t()("reunions.view.list") }}
          </button>
          <button
            type="button"
            class="min-w-0 flex-1 rounded px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pointer-coarse:min-h-touch pointer-coarse:px-3 sm:flex-none"
            [class.bg-card]="vueMode() === 'calendrier'"
            [class.shadow-sm]="vueMode() === 'calendrier'"
            [class.text-foreground]="vueMode() === 'calendrier'"
            [class.text-muted-foreground]="vueMode() !== 'calendrier'"
            (click)="setVueMode('calendrier')"
          >
            {{ t()("reunions.view.calendar") }}
          </button>
          </div>
        </div>
      </div>

      @if (vueMode() === "calendrier") {
        <div class="surface p-3 sm:p-4">
          <ui-event-calendar
            [events]="calendarEvents()"
            [categories]="meetingCategories()"
            [dayCreateEnabled]="canManage()"
            (eventClick)="openMeetingFromCalendar($event)"
            (dayCreate)="onCalendarDayCreate($event)"
          />
        </div>
      } @else {
      <div class="surface overflow-x-auto">
        @if (shown().length) {
          <table class="w-full text-sm">
            <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th class="px-4 py-3 font-semibold">{{ t()("reunions.col.title") }}</th>
                <th class="font-semibold">{{ t()("reunions.col.status") }}</th>
                <th class="hidden font-semibold sm:table-cell">{{ t()("reunions.col.date") }}</th>
                <th class="hidden font-semibold lg:table-cell">{{ t()("reunions.col.place") }}</th>
                <th class="hidden font-semibold md:table-cell">
                  {{ t()("reunions.col.attendance") }}
                </th>
                <th class="hidden font-semibold md:table-cell">
                  {{ t()("reunions.col.minutes") }}
                </th>
                @if (canManage()) {
                  <th class="w-44 pr-4 text-right font-semibold">{{ t()("reunions.detail.actions") }}</th>
                }
              </tr>
            </thead>
            <tbody class="divide-y">
              @for (m of shown(); track m.id) {
                <tr
                  class="cursor-pointer hover:bg-muted/60"
                  [routerLink]="['/reunions', m.id]"
                >
                  <td class="px-4 py-2.5">
                    <div class="font-semibold">{{ m.title }}</div>
                    <div class="text-xs text-muted-foreground">
                      {{ t()(kindLabel[m.kind]) }}
                      <span class="sm:hidden"> · {{ fmtDateTime(m.date) }}</span>
                    </div>
                  </td>
                  <td>
                    <ui-pill [tone]="statusTone[m.status]">{{ t()(statusLabel[m.status]) }}</ui-pill>
                  </td>
                  <td class="hidden whitespace-nowrap sm:table-cell">{{ fmtDateTime(m.date) }}</td>
                  <td class="hidden lg:table-cell">{{ m.place }}</td>
                  <td class="hidden md:table-cell">{{ attendanceLine(m) }}</td>
                  <td class="hidden md:table-cell">
                    @if (m.status === "tenue") {
                      <ui-pill [tone]="minutesTone[m.minutes?.status ?? 'none']">
                        {{ t()(minutesLabel[m.minutes?.status ?? "none"]) }}
                      </ui-pill>
                    }
                  </td>
                  @if (canManage()) {
                    <td class="pr-4 text-right" (click)="$event.preventDefault(); $event.stopPropagation()">
                      @if (m.status === "planifiée") {
                        <div class="flex flex-wrap justify-end gap-1">
                          <ui-button size="sm" variant="outline" (click)="openHold(m.id)">
                            {{ t()("reunions.attendance.submit") }}
                          </ui-button>
                          <ui-button size="sm" variant="outline" (click)="openCancel(m.id)">
                            {{ t()("reunions.cancel.submit") }}
                          </ui-button>
                        </div>
                      }
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        } @else {
          <ui-empty>
            <lucide-angular [img]="icons.calendar" class="mx-auto mb-2 size-8 text-muted-foreground" />
            <div class="font-semibold">{{ t()("reunions.empty.title") }}</div>
            <p class="mt-1 text-sm text-muted-foreground">
              {{
                mine().length
                  ? t()("reunions.empty.filtered")
                  : canManage()
                    ? t()("reunions.empty.create")
                    : t()("reunions.empty.readonly")
              }}
            </p>
          </ui-empty>
        }
      </div>
      }
      <p class="mt-2 text-xs text-muted-foreground">
        {{
          t()("reunions.count", {
            shown: nf.format(shown().length),
            total: nf.format(mine().length),
          })
        }}
      </p>

      <!-- Pointage présence → tenue -->
      @if (holdMeeting(); as hm) {
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            class="surface flex max-h-[90vh] w-full max-w-lg flex-col p-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            uiModalA11y
            (dismiss)="closeHold()"
            (click)="$event.stopPropagation()"
          >
            <h2 class="text-lg font-semibold">{{ t()("reunions.attendance.title") }}</h2>
            <p class="mt-1 text-sm text-muted-foreground">{{ t()("reunions.attendance.description") }}</p>
            @if (holdMembers().length) {
              <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p class="text-sm font-semibold" aria-live="polite">
                  {{
                    t()("reunions.attendance.counter", {
                      present: holdPresentIds().length,
                      total: holdMembers().length,
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
                @for (mem of holdMembers(); track mem.id) {
                  <li>
                    <label class="flex min-h-12 cursor-pointer items-center gap-3 px-3 py-2 text-sm hover:bg-muted/60">
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
            @if (!holdPresentIds().length && holdMembers().length) {
              <p class="mt-2 text-xs text-muted-foreground">{{ t()("reunions.attendance.none") }}</p>
            }
            <div class="mt-6 flex justify-end gap-2 border-t pt-4">
              <ui-button type="button" variant="outline" (click)="closeHold()">{{ t()("producteurs.index.cancel") }}</ui-button>
              <ui-button type="button" [disabled]="!holdPresentIds().length" (click)="submitHold(hm.id)">
                {{ t()("reunions.attendance.submit") }}
              </ui-button>
            </div>
          </div>
        </div>
      }

      <!-- Annulation -->
      <app-meeting-form-dialog
        [(open)]="meetingFormOpen"
        [defaultScoopId]="defaultScoopId()"
        [defaultDate]="meetingFormDefaultDate()"
        (notify)="onMeetingFormNotify($event)"
      />

      @if (cancelMeetingId()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            class="surface w-full max-w-md p-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            uiModalA11y
            (dismiss)="closeCancel()"
          >
            <h2 class="text-lg font-semibold">{{ t()("reunions.cancel.title") }}</h2>
            <p class="mt-1 text-sm text-muted-foreground">{{ t()("reunions.cancel.description") }}</p>
            <form class="mt-4 space-y-3" (ngSubmit)="submitCancel()">
              <label class="block text-sm font-medium">
                {{ t()("reunions.cancel.reason") }}
                <span class="block text-xs font-normal text-muted-foreground">{{
                  t()("reunions.cancel.reasonHint")
                }}</span>
                <textarea
                  name="cancelReason"
                  rows="4"
                  class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  [(ngModel)]="cancelReason"
                  [placeholder]="t()('reunions.cancel.reasonHint')"
                ></textarea>
              </label>
              @if (cancelReason().trim().length > 0 && cancelReason().trim().length < 3) {
                <p class="text-xs text-destructive">{{ t()("reunions.cancel.errorReason") }}</p>
              }
              <div class="flex justify-end gap-2">
                <ui-button type="button" variant="outline" (click)="closeCancel()">
                  {{ t()("reunions.cancel.keep") }}
                </ui-button>
                <ui-button type="submit" variant="destructive" [disabled]="cancelReason().trim().length < 3">
                  {{ t()("reunions.cancel.submit") }}
                </ui-button>
              </div>
            </form>
          </div>
        </div>
      }
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
  protected readonly icons = { search: Search, calendar: CalendarDays, calendarPlus: CalendarPlus };
  protected readonly filters = FILTERS;
  protected readonly kindLabel = MEETING_KIND_LABEL;
  protected readonly statusLabel = MEETING_STATUS_LABEL;
  protected readonly statusTone = MEETING_STATUS_TONE;
  protected readonly minutesLabel = MINUTES_LABEL;
  protected readonly minutesTone = MINUTES_TONE;

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
  protected readonly feedback = signal<{ kind: "success" | "error"; text: string } | null>(null);

  protected readonly meetingFormOpen = signal(false);
  protected readonly meetingFormDefaultDate = signal<Date | undefined>(undefined);

  private fbTimer: ReturnType<typeof setTimeout> | null = null;

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

  protected openMeetingFromCalendar(e: CalendarEvent): void {
    void this.router.navigate(["/reunions", e.id]);
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

  protected attendanceLine(m: Meeting): string {
    if (m.status !== "tenue") return "";
    const stats = attendanceStats(m, this.memberCount().get(m.scoopId) ?? 0);
    return this.t()("reunions.attendance.autre", { count: stats.present, total: stats.total });
  }

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
    if (this.fbTimer) clearTimeout(this.fbTimer);
    this.feedback.set({ kind, text });
    this.fbTimer = setTimeout(() => {
      this.feedback.set(null);
      this.fbTimer = null;
    }, 4000);
  }

  protected errMsg(e: unknown): string {
    if (e instanceof AccessDeniedError) return this.locale.tNow(e.key);
    return e instanceof Error ? e.message : String(e);
  }
}

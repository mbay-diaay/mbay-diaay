import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { format, isSameDay, isSameMonth, isToday } from "date-fns";
import { fr as frLocale } from "date-fns/locale";
import { ChevronLeft, ChevronRight, LucideAngularModule, Plus } from "lucide-angular";

import {
  eventsInRange,
  eventsOnDay,
  groupByDay,
  monthGrid,
  shiftDate,
  visibleRange,
  weekDays,
  type CalendarEvent,
  type CalendarTone,
  type CalendarView,
} from "@/lib/calendar";
import type { MessageKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LocaleService } from "../locale.service";
import { UiButtonComponent } from "./button.component";

const VIEWS: CalendarView[] = ["month", "week", "day", "list"];

const VIEW_LABEL: Record<CalendarView, MessageKey> = {
  month: "calendrier.view.month",
  week: "calendrier.view.week",
  day: "calendrier.view.day",
  list: "calendrier.view.list",
};

const TONE: Record<CalendarTone, { card: string; dot: string }> = {
  primary: { card: "border-l-primary bg-primary-soft text-foreground", dot: "bg-primary" },
  info: { card: "border-l-info bg-info-bg text-info-fg", dot: "bg-info" },
  success: { card: "border-l-success bg-success-bg text-success-fg", dot: "bg-success" },
  warning: { card: "border-l-warning bg-warning-bg text-warning-fg", dot: "bg-warning" },
  danger: { card: "border-l-danger bg-danger-bg text-danger-fg", dot: "bg-danger" },
  neutral: {
    card: "border-l-border-strong bg-muted text-muted-foreground",
    dot: "bg-border-strong",
  },
};

const ALL = "__all";

/** Port de src/components/ui/event-calendar.tsx — agenda à quatre vues + filtre par type. */
@Component({
  selector: "ui-event-calendar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, FormsModule, LucideAngularModule, UiButtonComponent],
  template: `
    <div [class]="cn('space-y-3', className())" role="region" [attr.aria-label]="t()('calendrier.region')">
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex items-center gap-1">
          <ui-button variant="outline" size="icon" [ariaLabel]="t()('calendrier.prev')" (click)="go(-1)">
            <lucide-angular [img]="icons.chevronLeft" class="size-4" />
          </ui-button>
          <ui-button variant="outline" (click)="today()">{{ t()("calendrier.today") }}</ui-button>
          <ui-button variant="outline" size="icon" [ariaLabel]="t()('calendrier.next')" (click)="go(1)">
            <lucide-angular [img]="icons.chevronRight" class="size-4" />
          </ui-button>
        </div>
        <h2 class="min-w-0 flex-1 text-lg font-semibold" aria-live="polite">
          {{ title() }}
          <span class="ml-2 text-sm font-normal text-muted-foreground">
            {{ t()("calendrier.count.autre", { count: inPeriod().length }) }}
          </span>
        </h2>
        <div
          class="inline-flex rounded-md border border-input bg-muted/30 p-0.5"
          role="group"
          [attr.aria-label]="t()('calendrier.views.aria')"
        >
          @for (viewOption of views; track viewOption) {
            <button
              type="button"
              class="rounded px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              [class.bg-card]="calendarView() === viewOption"
              [class.shadow-sm]="calendarView() === viewOption"
              [class.text-foreground]="calendarView() === viewOption"
              [class.text-muted-foreground]="calendarView() !== viewOption"
              (click)="calendarView.set(viewOption)"
            >
              {{ t()(labelForView(viewOption)) }}
            </button>
          }
        </div>
      </div>

      @if (categories().length > 0) {
        <label class="flex flex-col gap-1 text-sm sm:w-56">
          <span class="font-medium">{{ t()("calendrier.filter.label") }}</span>
          <select
            class="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            [ngModel]="category()"
            (ngModelChange)="category.set($event)"
          >
            <option [ngValue]="allToken">{{ t()("calendrier.filter.all") }}</option>
            @for (categoryOption of categories(); track categoryOption[0]) {
              <option [ngValue]="categoryOption[0]">{{ categoryOption[1] }}</option>
            }
          </select>
        </label>
      }

      @if (calendarView() === "month") {
        <ng-container *ngTemplateOutlet="monthTpl" />
      } @else if (calendarView() === "week") {
        <ng-container *ngTemplateOutlet="weekTpl" />
      } @else if (calendarView() === "day") {
        <ng-container *ngTemplateOutlet="dayTpl" />
      } @else {
        <ng-container *ngTemplateOutlet="listTpl" />
      }
    </div>

    <ng-template #monthTpl>
      <div class="surface overflow-hidden">
        <div class="grid grid-cols-7 border-b bg-muted text-center text-xs font-medium text-muted-foreground">
          @for (weekday of weekHead(); track weekday.getTime()) {
            <div class="py-2">{{ cap(format(weekday, "EEE", { locale: frLocale })) }}</div>
          }
        </div>
        <div class="grid grid-cols-7">
          @for (day of monthCells(); track day.toISOString()) {
            <button
              type="button"
              [attr.aria-pressed]="isSameDay(day, selected())"
              [attr.aria-label]="
                dayEvents(day).length === 0
                  ? t()('calendrier.dayCell', { date: fmtLong(day) })
                  : t()('calendrier.dayCell.events.autre', {
                      date: fmtLong(day),
                      count: dayEvents(day).length,
                    })
              "
              (click)="selected.set(day)"
              [class]="
                cn(
                  'flex min-h-14 flex-col items-stretch gap-1 border-b border-r p-1 text-left transition-colors last:border-r-0 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:min-h-24 md:p-1.5',
                  outOfMonth(day) ? 'bg-muted/40 text-muted-foreground' : '',
                  isSel(day) ? 'bg-primary-soft' : ''
                )
              "
            >
              <span
                class="grid size-6 place-items-center rounded-full text-xs tabular"
                [class]="cn(isTodayDay(day) ? 'bg-primary font-semibold text-primary-foreground' : '')"
              >
                {{ day.getDate() }}
              </span>
              <span class="flex flex-wrap gap-0.5 md:hidden" aria-hidden="true">
                @for (event of dayEvents(day).slice(0, 4); track event.id) {
                  <span [class]="cn('size-1.5 rounded-full', toneStyle(event.tone).dot)"></span>
                }
              </span>
              <span class="hidden space-y-0.5 md:block" aria-hidden="true">
                @for (event of dayEvents(day).slice(0, 2); track event.id) {
                  <span
                    class="block truncate rounded border-l-2 px-1 text-[11px]"
                    [class]="cn(toneStyle(event.tone).card, event.muted ? 'opacity-60 line-through' : '')"
                  >
                    {{ event.title }}
                  </span>
                }
                @if (dayEvents(day).length > 2) {
                  <span class="block text-[11px] text-muted-foreground">
                    {{ t()("calendrier.more", { count: dayEvents(day).length - 2 }) }}
                  </span>
                }
              </span>
            </button>
          }
        </div>
      </div>
      <section
        class="surface mt-3 p-4"
        [attr.aria-label]="t()('calendrier.selectedDay', { date: fmtWeekdayDay(selected()) })"
      >
        <div class="mb-3 flex items-center justify-between gap-2">
          <h3 class="text-sm font-semibold">
            {{ t()("calendrier.selectedDay", { date: fmtWeekdayDay(selected()) }) }}
          </h3>
          @if (dayCreateEnabled()) {
            <ui-button type="button" variant="outline" size="sm" (click)="emitDayCreate(selected())">
              <lucide-angular [img]="icons.plus" class="size-4" />
              {{ t()("calendrier.addOnDay") }}
            </ui-button>
          }
        </div>
        @if (dayEvents(selected()).length === 0) {
          <p class="text-sm text-muted-foreground">{{ t()("calendrier.empty.day") }}</p>
        } @else {
          <div class="space-y-2">
            @for (event of dayEvents(selected()); track event.id) {
              <ng-container
                *ngTemplateOutlet="eventCard; context: { $implicit: event, compact: false }"
              />
            }
          </div>
        }
      </section>
    </ng-template>

    <ng-template #weekTpl>
      <div class="grid gap-3 md:grid-cols-7">
        @for (day of weekCells(); track day.toISOString()) {
          <section
            class="surface min-w-0 p-3"
            [class.border-primary]="isTodayDay(day)"
            [attr.aria-label]="cap(fmtWeekdayDay(day))"
          >
            <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {{ cap(format(day, "EEE d", { locale: frLocale })) }}
            </h3>
            @if (dayEvents(day).length === 0) {
              <p class="text-xs text-muted-foreground">{{ t()("calendrier.empty.day") }}</p>
            } @else {
              <div class="space-y-2">
                @for (event of dayEvents(day); track event.id) {
                  <ng-container
                    *ngTemplateOutlet="eventCard; context: { $implicit: event, compact: true }"
                  />
                }
              </div>
            }
          </section>
        }
      </div>
    </ng-template>

    <ng-template #dayTpl>
      <section class="surface p-4">
        @if (dayEvents(cursorDate()).length === 0) {
          <p class="text-sm text-muted-foreground">{{ t()("calendrier.empty.day") }}</p>
        } @else {
          <div class="space-y-2">
            @for (event of dayEvents(cursorDate()); track event.id) {
              <ng-container *ngTemplateOutlet="eventCard; context: { $implicit: event, compact: false }" />
            }
          </div>
        }
      </section>
    </ng-template>

    <ng-template #listTpl>
      @if (listGroups().length === 0) {
        <p class="surface p-5 text-sm text-muted-foreground">{{ t()("calendrier.empty.period") }}</p>
      } @else {
        <div class="space-y-4">
          @for (group of listGroups(); track group.day.toISOString()) {
            <section>
              <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {{ cap(format(group.day, "EEEE d MMMM", { locale: frLocale })) }}
              </h3>
              <div class="space-y-2">
                @for (event of group.events; track event.id) {
                  <ng-container *ngTemplateOutlet="eventCard; context: { $implicit: event, compact: false }" />
                }
              </div>
            </section>
          }
        </div>
      }
    </ng-template>

    <ng-template #eventCard let-e let-compact="compact">
      <button
        type="button"
        (click)="eventClick.emit(e)"
        class="block w-full rounded-md border-l-4 px-2.5 text-left transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        [class]="
          cn(
            compact ? 'py-1 text-xs' : 'py-2 text-sm',
            toneStyle(e.tone).card,
            e.muted ? 'opacity-60 line-through' : ''
          )
        "
      >
        <span class="block truncate font-medium">{{ e.title }}</span>
        <span class="block truncate text-xs opacity-80">{{ eventSubtitle(e) }}</span>
      </button>
    </ng-template>
  `,
})
export class UiEventCalendarComponent implements OnInit {
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly cn = cn;
  protected readonly format = format;
  protected readonly frLocale = frLocale;
  protected readonly isSameDay = isSameDay;
  protected readonly icons = { chevronLeft: ChevronLeft, chevronRight: ChevronRight, plus: Plus };
  protected readonly views = VIEWS;
  protected readonly allToken = ALL;

  readonly events = input.required<readonly CalendarEvent[]>();
  readonly categories = input<readonly (readonly [string, string])[]>([]);
  readonly defaultView = input<CalendarView>("month");
  readonly defaultDate = input<Date | undefined>(undefined);
  readonly className = input("", { alias: "class" });

  readonly eventClick = output<CalendarEvent>();
  /** Affiche « Ajouter un événement ce jour » (ex. création de réunion). */
  readonly dayCreateEnabled = input(false);
  /** Réunion (etc.) : jour choisi pour préremplir la date (voir React `onDayCreate`). */
  readonly dayCreate = output<Date>();

  protected readonly calendarView = signal<CalendarView>("month");
  protected readonly cursorDate = signal<Date>(new Date());
  protected readonly selected = signal<Date>(new Date());
  protected readonly category = signal<string>(ALL);

  ngOnInit(): void {
    this.calendarView.set(this.defaultView());
    const initial = this.defaultDate();
    if (initial) {
      const d = new Date(initial);
      this.cursorDate.set(d);
      this.selected.set(d);
    }
  }

  protected readonly shown = computed(() => {
    const cat = this.category();
    const list = this.events();
    return cat === ALL ? list : list.filter((e) => e.category === cat);
  });

  protected readonly range = computed(() => visibleRange(this.cursorDate(), this.calendarView()));

  protected readonly inPeriod = computed(() =>
    eventsInRange(this.shown(), this.range().from, this.range().to),
  );

  protected readonly title = computed(() => {
    const d = this.cursorDate();
    const v = this.calendarView();
    if (v === "day") return this.cap(format(d, "EEEE d MMMM yyyy", { locale: frLocale }));
    if (v === "week") {
      const days = weekDays(d);
      return this.t()("calendrier.weekOf", {
        from: format(days[0]!, "d MMMM", { locale: frLocale }),
        to: format(days[6]!, "d MMMM yyyy", { locale: frLocale }),
      });
    }
    return this.cap(format(d, "MMMM yyyy", { locale: frLocale }));
  });

  protected readonly monthCells = computed(() => monthGrid(this.cursorDate()));
  protected readonly weekHead = computed(() => weekDays(this.cursorDate()));
  protected readonly weekCells = computed(() => weekDays(this.cursorDate()));

  protected readonly listGroups = computed(() => groupByDay(this.inPeriod()));

  protected labelForView(v: CalendarView): MessageKey {
    return VIEW_LABEL[v];
  }

  protected toneStyle(tone: CalendarTone) {
    return TONE[tone];
  }

  protected cap(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  protected fmtLong(d: Date): string {
    return format(d, "EEEE d MMMM yyyy", { locale: frLocale });
  }

  protected fmtWeekdayDay(d: Date): string {
    return format(d, "EEEE d MMMM", { locale: frLocale });
  }

  protected outOfMonth(day: Date): boolean {
    return !isSameMonth(day, this.cursorDate());
  }

  protected isSel(day: Date): boolean {
    return isSameDay(day, this.selected());
  }

  protected isTodayDay(day: Date): boolean {
    return isToday(day);
  }

  protected dayEvents(day: Date): CalendarEvent[] {
    return eventsOnDay(this.shown(), day);
  }

  protected eventSubtitle(e: CalendarEvent): string {
    if (isSameDay(e.start, e.end)) {
      const time = format(e.start, "HH:mm", { locale: frLocale });
      const sub = e.subtitle?.trim();
      return sub ? `${time} · ${sub}` : time;
    }
    return this.t()("calendrier.multiDay", {
      from: format(e.start, "d MMM", { locale: frLocale }),
      to: format(e.end, "d MMM", { locale: frLocale }),
    });
  }

  protected go(direction: 1 | -1): void {
    const next = shiftDate(this.cursorDate(), this.calendarView(), direction);
    this.cursorDate.set(next);
    this.selected.set(next);
  }

  protected today(): void {
    const now = new Date();
    this.cursorDate.set(now);
    this.selected.set(now);
  }

  protected emitDayCreate(day: Date): void {
    this.dayCreate.emit(day);
  }
}

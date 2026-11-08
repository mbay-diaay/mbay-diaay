import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { CheckCircle2, ClipboardCheck, LucideAngularModule, Search, Sprout } from "lucide-angular";

import { addDays, lineSchedule, type ScheduleRow } from "@/lib/agronomy";
import type { CalendarEvent } from "@/lib/calendar";
import { isOpenCampaign } from "@/lib/campaigns";
import { fmtDate, nf } from "@/lib/format";
import { scopedOperations, scopedPlans } from "@/lib/scope";
import { AppShellComponent } from "../shared/app-shell.component";
import { ExtraModuleGateComponent } from "../shared/extra-module-gate.component";
import {
  KIND_LABEL,
  STATE_LABEL,
  STATE_TONE,
  operationDue,
  operationLate,
  todayIso,
} from "../shared/follow-kinds";
import { LocaleService } from "../shared/locale.service";
import { OperationDoneDialogComponent, type OperationTarget } from "../shared/operation-done-dialog.component";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiEventCalendarComponent } from "../shared/ui/event-calendar.component";
import { UiKpiTileComponent } from "../shared/ui/kpi-tile.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

type Filter = "tous" | "late" | "week" | "month";
const PAGE = 30;

interface Item {
  key: string;
  planId: string;
  lineIndex: number;
  producer: string;
  crop: string;
  row: ScheduleRow;
  day: string;
}

const monthEnd = (iso: string) => {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).toISOString().slice(0, 10);
};

const weekEnd = (iso: string) => {
  const dow = new Date(`${iso}T00:00:00Z`).getUTCDay();
  return addDays(iso, (7 - dow) % 7);
};

const FILTERS: { id: Exclude<Filter, "tous">; label: "suivi.filter.late" | "suivi.filter.week" | "suivi.filter.month" }[] = [
  { id: "late", label: "suivi.filter.late" },
  { id: "week", label: "suivi.filter.week" },
  { id: "month", label: "suivi.filter.month" },
];

@Component({
  selector: "app-suivi-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    ExtraModuleGateComponent,
    AppShellComponent,
    OperationDoneDialogComponent,
    UiChipRailComponent,
    UiEmptyComponent,
    UiEventCalendarComponent,
    UiKpiTileComponent,
    UiPageHeaderComponent,
    UiPillComponent,
    UiButtonComponent,
  ],
  template: `
    <app-extra-module-gate>
      <app-shell perm="operation.read" [area]="t()('suivi.area')">
        <ui-page-header
          [eyebrow]="t()('suivi.eyebrow')"
          [title]="t()('suivi.title')"
          [description]="scoopName() ? t()('suivi.description.scoop', { scoop: scoopName()! }) : t()('suivi.description')"
        />

        <div class="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <ui-kpi-tile [label]="t()('suivi.kpi.upcoming')" [value]="nf.format(stats().upcoming)" />
          <ui-kpi-tile
            [label]="t()('suivi.kpi.late')"
            [value]="nf.format(stats().late)"
            [tone]="stats().late > 0 ? 'danger' : 'neutral'"
          />
          <ui-kpi-tile [label]="t()('suivi.kpi.week')" [value]="nf.format(stats().week)" />
          <ui-kpi-tile
            [label]="t()('suivi.kpi.rate')"
            [value]="t()('suivi.kpi.rateValue', { rate: rate() ?? 0 })"
            [sub]="
              rate() === null
                ? t()('suivi.kpi.rateNone')
                : t()('suivi.kpi.rateHint', { done: nf.format(stats().done), total: nf.format(stats().total) })
            "
          />
        </div>

        <section class="mb-6" aria-labelledby="suivi-liste">
          <h2 id="suivi-liste" class="mb-3 text-lg font-semibold">{{ t()("suivi.list.title") }}</h2>
          <div class="surface mb-3 p-3">
            <div class="flex flex-wrap items-center gap-2">
              @if (view() === 'liste') {
                <ui-chip-rail [attr.aria-label]="t()('suivi.filter.aria')">
                  <button type="button" class="chip-filter" [class.chip-filter-active]="filter() === 'tous'" (click)="filter.set('tous')">
                    {{ t()("suivi.filter.all") }}
                    <span class="chip-filter-count">{{ todo().length }}</span>
                  </button>
                  @for (f of filters; track f.id) {
                    <button
                      type="button"
                      class="chip-filter"
                      [class.chip-filter-active]="filter() === f.id"
                      (click)="toggleFilter(f.id)"
                    >
                      {{ t()(f.label) }}
                      <span class="chip-filter-count">{{ todo().filter(filterTest[f.id]).length }}</span>
                    </button>
                  }
                </ui-chip-rail>
              }
              <div class="flex rounded-md border p-0.5 text-xs" role="group" [attr.aria-label]="t()('suivi.view.aria')">
                <button type="button" class="rounded px-2 py-1" [class.bg-primary]="view() === 'liste'" [class.text-primary-foreground]="view() === 'liste'" (click)="setView('liste')">
                  {{ t()("suivi.view.list") }}
                </button>
                <button type="button" class="rounded px-2 py-1" [class.bg-primary]="view() === 'calendrier'" [class.text-primary-foreground]="view() === 'calendrier'" (click)="setView('calendrier')">
                  {{ t()("suivi.view.calendar") }}
                </button>
              </div>
              <div class="relative ml-auto w-full sm:w-64">
                <lucide-angular [img]="icons.search" class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  class="flex h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm"
                  [attr.aria-label]="t()('suivi.search.aria')"
                  [placeholder]="t()('suivi.search.placeholder')"
                  [ngModel]="q()"
                  (ngModelChange)="onSearch($event)"
                />
              </div>
            </div>
          </div>

          @if (view() === 'calendrier') {
            <div class="surface p-3 sm:p-4">
              <ui-event-calendar [events]="events()" (eventClick)="onEvent($event)" />
            </div>
          } @else if (shown().length) {
            <ul class="grid gap-2">
              @for (i of shown().slice(0, limit()); track i.key) {
                <li class="surface p-3">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="font-semibold">{{ t()(KIND_LABEL[i.row.kind]) }}</span>
                    <ui-pill [tone]="STATE_TONE[i.row.state]">{{ t()(STATE_LABEL[i.row.state]) }}</ui-pill>
                  </div>
                  <p class="mt-1 text-sm">{{ i.producer }} <span class="text-muted-foreground">· {{ i.crop }}</span></p>
                  @if (dueText(i.row); as due) {
                    <p class="text-sm text-muted-foreground">{{ due }}</p>
                  }
                  @if (lateText(i.row); as late) {
                    <p class="text-sm font-medium text-danger-fg">{{ late }}</p>
                  }
                  <div class="mt-2 flex flex-wrap gap-2">
                    @if (store.can('operation.write')) {
                      <ui-button type="button" (click)="openMark(i)">
                        <lucide-angular [img]="icons.check" class="size-4" />
                        {{ t()("suivi.markDone") }}
                      </ui-button>
                    }
                    <a
                      [routerLink]="['/plans', i.planId]"
                      [queryParams]="{ onglet: 'suivi' }"
                      class="inline-flex h-9 items-center rounded-md border px-4 text-sm hover:bg-accent"
                    >
                      {{ t()("suivi.item.plan") }}
                    </a>
                  </div>
                </li>
              }
            </ul>
            <div class="mt-2 flex flex-wrap items-center gap-3">
              <p class="text-xs text-muted-foreground">
                {{ t()("suivi.count.autre", { shown: nf.format(Math.min(limit(), shown().length)), total: nf.format(shown().length) }) }}
              </p>
              @if (shown().length > limit()) {
                <ui-button type="button" variant="outline" (click)="limit.set(limit() + pageSize)">{{ t()("suivi.more") }}</ui-button>
              }
            </div>
          } @else {
            <div class="surface">
              <ui-empty>
                <lucide-angular [img]="icons.clipboard" class="mx-auto mb-2 size-8 text-muted-foreground" />
                <p class="font-semibold">{{ t()("suivi.empty.title") }}</p>
                <p class="mt-1 text-sm">{{ todo().length ? t()("suivi.empty.filtered") : t()("suivi.empty.none") }}</p>
              </ui-empty>
            </div>
          }
        </section>

        <section class="surface p-4" aria-labelledby="suivi-assolement">
          <div class="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="suivi-assolement" class="text-lg font-semibold">{{ t()("suivi.assol.title") }}</h2>
              <p class="text-sm text-muted-foreground">{{ t()("suivi.assol.description") }}</p>
            </div>
            @if (campaigns().length) {
              <select
                class="h-9 w-full rounded-md border px-2 text-sm sm:w-64"
                [ngModel]="campaign()"
                (ngModelChange)="campaignChoice.set($event)"
              >
                @for (c of campaigns(); track c.id) {
                  <option [value]="c.name">{{ c.name }}</option>
                }
              </select>
            }
          </div>
          @if (crops().length) {
            <p class="mb-3 text-sm font-medium">{{ t()("suivi.assol.total", { area: nf.format(totalArea()) }) }}</p>
            <ul class="grid gap-3">
              @for (c of crops(); track c.crop) {
                <li>
                  <div class="flex items-baseline justify-between gap-2 text-sm">
                    <span class="font-medium">{{ c.crop }}</span>
                    <span class="tabular">
                      {{ t()("suivi.assol.row", { area: nf.format(c.area) }) }}
                      <span class="text-muted-foreground"> · {{ t()("suivi.assol.share", { pct: Math.round((c.area / totalArea()) * 100) }) }}</span>
                    </span>
                  </div>
                  <div class="mt-1 h-2.5 overflow-hidden rounded-full bg-muted">
                    <div class="h-full rounded-full bg-primary" [style.width.%]="(c.area / crops()[0]!.area) * 100"></div>
                  </div>
                </li>
              }
            </ul>
          } @else {
            <ui-empty>
              <lucide-angular [img]="icons.sprout" class="mx-auto mb-2 size-8 text-muted-foreground" />
              <p class="font-semibold">{{ t()("suivi.assol.empty.title") }}</p>
              <p class="mt-1 text-sm">{{ t()("suivi.assol.empty.text") }}</p>
            </ui-empty>
          }
        </section>

        <app-operation-done-dialog [(open)]="doneOpen" [target]="target()" />
      </app-shell>
    </app-extra-module-gate>
  `,
})
export default class SuiviPage {
  protected readonly Math = Math;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly icons = { search: Search, check: CheckCircle2, clipboard: ClipboardCheck, sprout: Sprout };
  protected readonly filters = FILTERS;
  protected readonly KIND_LABEL = KIND_LABEL;
  protected readonly STATE_LABEL = STATE_LABEL;
  protected readonly STATE_TONE = STATE_TONE;
  protected readonly pageSize = PAGE;

  private readonly searchParams = toSignal(
    this.route.queryParamMap.pipe(
      map((q) => ({
        scoop: q.get("scoop") ?? undefined,
        vue: q.get("vue") === "calendrier" ? ("calendrier" as const) : ("liste" as const),
      })),
    ),
    { initialValue: { vue: "liste" as const, scoop: undefined as string | undefined } },
  );

  protected readonly filter = signal<Filter>("tous");
  protected readonly q = signal("");
  protected readonly limit = signal(PAGE);
  protected readonly campaignChoice = signal<string | null>(null);
  protected readonly doneOpen = signal(false);
  protected readonly target = signal<OperationTarget | null>(null);

  protected readonly today = todayIso();

  protected readonly view = computed(() => this.searchParams().vue);

  protected readonly myPlans = computed(() => {
    const scoop = this.searchParams().scoop;
    return scopedPlans(this.store.state().plans, this.store.state().session).filter(
      (p) => !scoop || p.scoopId === scoop,
    );
  });

  protected readonly items = computed((): Item[] => {
    const campaigns = this.store.state().campaigns;
    const closed = new Set(campaigns.filter((c) => !isOpenCampaign(c)).map((c) => c.name));
    const producers = this.store.state().producers;
    const calendars = this.store.state().calendars;
    const ops = scopedOperations(this.store.state().operations, this.store.state().session);
    const out: Item[] = [];
    for (const plan of this.myPlans()) {
      if (closed.has(plan.campaign)) continue;
      const pr = producers.find((p) => p.id === plan.producerId);
      const producer = pr ? `${pr.firstName} ${pr.lastName}` : this.t()("suivi.unknownProducer");
      plan.lines.forEach((line, li) => {
        for (const row of lineSchedule(plan, li, line, calendars, ops, this.today)) {
          const day = row.done?.doneAt ?? row.dueFrom;
          if (!day) continue;
          out.push({
            key: `${plan.id}|${li}|${row.done?.id ?? row.stepId}`,
            planId: plan.id,
            lineIndex: li,
            producer,
            crop: line.crop,
            row,
            day,
          });
        }
      });
    }
    return out;
  });

  protected readonly week = computed(() => weekEnd(this.today));
  protected readonly month = computed(() => monthEnd(this.today));
  protected readonly horizon = computed(() => addDays(this.today, 30));
  protected readonly weekStart = computed(() => addDays(this.week(), -6));

  protected readonly overlaps = (r: ScheduleRow, to: string) =>
    r.state === "à faire" && !!r.dueFrom && !!r.dueTo && r.dueFrom <= to && r.dueTo >= this.today;

  protected readonly stats = computed(() => {
    const items = this.items();
    const horizon = this.horizon();
    const weekStart = this.weekStart();
    const planned = items.filter((i) => i.row.stepId !== null);
    const done = planned.filter((i) => i.row.state === "fait").length;
    return {
      upcoming: items.filter((i) => this.overlaps(i.row, horizon)).length,
      late: items.filter((i) => i.row.state === "en retard").length,
      week: items.filter(
        (i) => i.row.done && i.row.done.doneAt >= weekStart && i.row.done.doneAt <= this.today,
      ).length,
      done,
      total: planned.length,
    };
  });

  protected readonly rate = computed(() => {
    const s = this.stats();
    return s.total ? Math.round((s.done / s.total) * 100) : null;
  });

  protected readonly filterTest: Record<Exclude<Filter, "tous">, (i: Item) => boolean> = {
    late: (i) => i.row.state === "en retard",
    week: (i) => this.overlaps(i.row, this.week()),
    month: (i) => this.overlaps(i.row, this.month()),
  };

  protected readonly todo = computed(() =>
    this.items()
      .filter((i) => i.row.state !== "fait")
      .sort((a, b) => a.day.localeCompare(b.day) || a.producer.localeCompare(b.producer)),
  );

  protected readonly shown = computed(() => {
    const needle = this.q().trim().toLowerCase();
    const f = this.filter();
    const matches = (i: Item) =>
      !needle ||
      `${i.producer} ${i.crop} ${this.t()(KIND_LABEL[i.row.kind])}`.toLowerCase().includes(needle);
    return this.todo().filter((i) => (f === "tous" || this.filterTest[f](i)) && matches(i));
  });

  protected readonly events = computed((): CalendarEvent[] => {
    const needle = this.q().trim().toLowerCase();
    return this.items()
      .filter(
        (i) =>
          !needle ||
          `${i.producer} ${i.crop} ${this.t()(KIND_LABEL[i.row.kind])}`.toLowerCase().includes(needle),
      )
      .map((i) => {
        const start = new Date(`${i.day}T08:00:00`);
        return {
          id: i.key,
          title: `${this.t()(KIND_LABEL[i.row.kind])} · ${i.crop}`,
          start,
          end: new Date(start.getTime() + 3_600_000),
          tone: i.row.state === "fait" ? "success" : i.row.state === "en retard" ? "danger" : "info",
          category: i.row.kind,
          subtitle: i.producer,
        };
      });
  });

  protected readonly campaigns = computed(() => this.store.state().campaigns);

  protected readonly campaign = computed(() => {
    const campaigns = this.campaigns();
    const def = (campaigns.find((c) => c.status === "en cours") ?? campaigns[0])?.name ?? "";
    return this.campaignChoice() ?? def;
  });

  protected readonly crops = computed(() => {
    const campaign = this.campaign();
    const byCrop = new Map<string, number>();
    for (const p of this.myPlans())
      if (p.campaign === campaign)
        for (const l of p.lines)
          if (l.crop.trim()) byCrop.set(l.crop, (byCrop.get(l.crop) ?? 0) + l.areaHa);
    return [...byCrop.entries()]
      .map(([crop, area]) => ({ crop, area: Math.round(area * 100) / 100 }))
      .sort((a, b) => b.area - a.area || a.crop.localeCompare(b.crop));
  });

  protected readonly totalArea = computed(() =>
    Math.round(this.crops().reduce((s, c) => s + c.area, 0) * 100) / 100,
  );

  protected readonly scoopName = computed(() => {
    const scoop = this.searchParams().scoop;
    if (!scoop) return undefined;
    return this.store.state().scoops.find((s) => s.id === scoop)?.name;
  });

  dueText(row: ScheduleRow): string | null {
    return operationDue((k, p) => this.t()(k, p), row);
  }

  lateText(row: ScheduleRow): string | null {
    return operationLate((k, p) => this.t()(k, p), row, this.today);
  }

  toggleFilter(id: Exclude<Filter, "tous">): void {
    this.filter.set(this.filter() === id ? "tous" : id);
    this.limit.set(PAGE);
  }

  onSearch(v: string): void {
    this.q.set(v);
    this.limit.set(PAGE);
  }

  setView(v: "liste" | "calendrier"): void {
    const scoop = this.searchParams().scoop;
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { scoop, ...(v === "calendrier" ? { vue: "calendrier" } : { vue: null }) },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }

  onEvent(ev: CalendarEvent): void {
    const item = this.items().find((i) => i.key === ev.id);
    if (item) void this.router.navigate(["/plans", item.planId], { queryParams: { onglet: "suivi" } });
  }

  openMark(i: Item): void {
    this.target.set({
      planId: i.planId,
      lineIndex: i.lineIndex,
      crop: i.crop,
      stepId: i.row.stepId,
      kind: i.row.kind,
    });
    this.doneOpen.set(true);
  }
}

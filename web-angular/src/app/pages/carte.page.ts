import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map } from "rxjs";
import {
  Download,
  Layers,
  LucideAngularModule,
  SlidersHorizontal,
  X,
} from "lucide-angular";

import { CAMPAIGNS, CROPS, type Plot, type PlotStatus } from "@/lib/mock/data";
import { fmtDate, nf, nf1 } from "@/lib/format";
import { inScope } from "@/lib/store";
import { isConsolidated, scoopIdsOf } from "@/lib/scope";
import { AppShellComponent } from "../shared/app-shell.component";
import { ExtraModuleGateComponent } from "../shared/extra-module-gate.component";
import { LocaleService } from "../shared/locale.service";
import { PlotMapComponent } from "../shared/plot-map.component";
import { StoreService } from "../shared/store.service";
import { ToastService } from "../shared/toast.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiDialogComponent } from "../shared/ui/dialog.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent, type UiPillTone } from "../shared/ui/pill.component";
import { UiSheetComponent } from "../shared/ui/sheet.component";

const ALL = "__all";

const LEGEND: [PlotStatus, string][] = [
  ["validée", "bg-map-validated"],
  ["relevée", "bg-map-surveyed"],
  ["à reprendre", "bg-map-to-redo"],
  ["chevauchement", "bg-map-overlap"],
];

const PLOT_TONE: Record<PlotStatus, UiPillTone> = {
  validée: "success",
  relevée: "info",
  "à reprendre": "warning",
  chevauchement: "danger",
};

type CarteQuery = {
  plot?: string;
  scoop?: string;
  campagne?: string;
  org?: string;
};

function parseCarteQuery(m: { get: (k: string) => string | null }): CarteQuery {
  return {
    plot: m.get("plot") ?? undefined,
    scoop: m.get("scoop") ?? undefined,
    campagne: m.get("campagne") ?? undefined,
    org: m.get("org") ?? undefined,
  };
}

/** Port de src/routes/carte.tsx — carte Leaflet, filtres, panneau parcelle (allégé vs proto React). */
@Component({
  selector: "app-carte-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    ExtraModuleGateComponent,
    AppShellComponent,
    PlotMapComponent,
    UiButtonComponent,
    UiDialogComponent,
    UiPageHeaderComponent,
    UiPillComponent,
    UiSheetComponent,
  ],
  template: `
    <app-extra-module-gate>
      <app-shell perm="map.read" [area]="t()('carte.area')">
        <ui-page-header
          [eyebrow]="t()('carte.eyebrow')"
          [title]="t()('carte.title')"
          [description]="headerDesc()"
        >
          @if (pairs().length > 0) {
            <ui-button actions variant="outline" (click)="pairOpen.set(!pairOpen())">
              <lucide-angular [img]="icons.layers" class="size-4" />
              {{ t()("carte.overlaps", { n: pairs().length }) }}
            </ui-button>
          }
          @if (store.can('map.export')) {
            <ui-button
              actions
              variant="outline"
              [attr.aria-label]="t()('carte.exportGeo.aria')"
              (click)="exportGeo()"
            >
              <lucide-angular [img]="icons.download" class="size-4" />
              <span class="hidden sm:inline">{{ t()("carte.exportGeo") }}</span>
            </ui-button>
          }
        </ui-page-header>

        <div class="surface mb-3 p-3">
          <div class="flex flex-wrap items-center gap-2 lg:hidden">
            <ui-button variant="outline" class="shrink-0" (click)="filtersOpen.set(true)">
              <lucide-angular [img]="icons.sliders" class="size-4" />
              {{ t()("carte.filters") }}
              @if (activeFilterCount() > 0) {
                <span class="rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground tabular">
                  {{ activeFilterCount() }}
                </span>
              }
            </ui-button>
            <div
              class="inline-flex rounded-md border p-0.5 text-xs"
              role="group"
              [attr.aria-label]="t()('carte.basemap.aria')"
            >
              <button
                type="button"
                class="rounded px-2.5 py-1"
                [class.bg-muted]="basemap() === 'osm'"
                (click)="basemap.set('osm')"
              >
                {{ t()("carte.basemap.osm") }}
              </button>
              <button
                type="button"
                class="rounded px-2.5 py-1"
                [class.bg-muted]="basemap() === 'sat'"
                (click)="basemap.set('sat')"
              >
                {{ t()("carte.basemap.sat") }}
              </button>
            </div>
          </div>
          <div class="-mx-3 mt-2 flex gap-1.5 overflow-x-auto px-3 [scrollbar-width:none] lg:hidden">
            @for (row of LEGEND; track row[0]) {
              <button
                type="button"
                class="chip-filter chip-filter-sm flex shrink-0 items-center gap-1.5 whitespace-nowrap"
                [class.opacity-40]="hidden().includes(row[0])"
                [class.line-through]="hidden().includes(row[0])"
                [attr.aria-pressed]="!hidden().includes(row[0])"
                (click)="toggleHidden(row[0])"
              >
                <span class="size-2.5 rounded-sm" [class]="row[1]"></span>
                {{ locale.tEnum("carte.status", row[0]) }}
              </button>
            }
          </div>
          <div class="hidden flex-wrap items-center gap-3 lg:flex">
            @for (sel of filterSelects(); track sel.key) {
              <label class="text-sm">
                <span class="sr-only">{{ sel.label }}</span>
                <select
                  class="h-9 w-44 rounded-md border border-input bg-background px-2 text-sm shadow-sm"
                  [value]="sel.value"
                  (change)="onFilter(sel.key, $any($event.target).value)"
                >
                  <option [value]="ALL">{{ t()("carte.filter.all", { label: sel.label }) }}</option>
                  @for (o of sel.options; track o[0]) {
                    <option [value]="o[0]">{{ o[1] }}</option>
                  }
                </select>
              </label>
            }
            <div class="flex flex-wrap gap-1.5">
              @for (row of LEGEND; track row[0]) {
                <button
                  type="button"
                  class="chip-filter chip-filter-sm flex items-center gap-1.5"
                  [class.opacity-40]="hidden().includes(row[0])"
                  [class.line-through]="hidden().includes(row[0])"
                  [attr.aria-pressed]="!hidden().includes(row[0])"
                  (click)="toggleHidden(row[0])"
                >
                  <span class="size-2.5 rounded-sm" [class]="row[1]"></span>
                  {{ locale.tEnum("carte.status", row[0]) }}
                </button>
              }
            </div>
            <div class="flex flex-wrap gap-1.5">
              @let counts = anomalyCounts();
              @let a = anom();
              <button
                type="button"
                class="chip-filter chip-filter-sm"
                [class.chip-filter-active]="a.small"
                [attr.aria-pressed]="a.small"
                (click)="toggleAnom('small')"
              >
                {{ t()("carte.anomaly.small", { min: seuils().minAreaM2, n: counts.small }) }}
              </button>
              <button
                type="button"
                class="chip-filter chip-filter-sm"
                [class.chip-filter-active]="a.big"
                [attr.aria-pressed]="a.big"
                (click)="toggleAnom('big')"
              >
                {{ t()("carte.anomaly.big", { max: seuils().maxAreaHa, n: counts.big }) }}
              </button>
              <button
                type="button"
                class="chip-filter chip-filter-sm"
                [class.chip-filter-active]="a.noculture"
                [attr.aria-pressed]="a.noculture"
                (click)="toggleAnom('noculture')"
              >
                {{ t()("carte.anomaly.noculture", { n: counts.noculture }) }}
              </button>
            </div>
            <div
              class="ml-auto inline-flex rounded-md border p-0.5 text-xs"
              role="group"
              [attr.aria-label]="t()('carte.basemap.aria')"
            >
              <button
                type="button"
                class="rounded px-2.5 py-1"
                [class.bg-muted]="basemap() === 'osm'"
                (click)="basemap.set('osm')"
              >
                {{ t()("carte.basemap.osm") }}
              </button>
              <button
                type="button"
                class="rounded px-2.5 py-1"
                [class.bg-muted]="basemap() === 'sat'"
                (click)="basemap.set('sat')"
              >
                {{ t()("carte.basemap.sat") }}
              </button>
            </div>
          </div>
        </div>

        <ui-sheet [(open)]="filtersOpen" [title]="t()('carte.filters.title')" side="bottom">
          <div class="grid gap-3">
            @for (sel of filterSelects(); track sel.key) {
              <label class="block text-sm font-medium">
                {{ sel.label }}
                <select
                  class="mt-1 h-10 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [value]="sel.value"
                  (change)="onFilter(sel.key, $any($event.target).value)"
                >
                  <option [value]="ALL">{{ t()("carte.filter.all", { label: sel.label }) }}</option>
                  @for (o of sel.options; track o[0]) {
                    <option [value]="o[0]">{{ o[1] }}</option>
                  }
                </select>
              </label>
            }
          </div>
          <p class="mt-5 text-sm font-semibold">{{ t()("carte.filters.anomalies") }}</p>
          <div class="mt-2 flex flex-wrap gap-1.5">
            @let sheetCounts = anomalyCounts();
            @let sheetAnom = anom();
            <button
              type="button"
              class="chip-filter chip-filter-sm w-full sm:w-auto"
              [class.chip-filter-active]="sheetAnom.small"
              (click)="toggleAnom('small')"
            >
              {{ t()("carte.anomaly.small", { min: seuils().minAreaM2, n: sheetCounts.small }) }}
            </button>
            <button
              type="button"
              class="chip-filter chip-filter-sm w-full sm:w-auto"
              [class.chip-filter-active]="sheetAnom.big"
              (click)="toggleAnom('big')"
            >
              {{ t()("carte.anomaly.big", { max: seuils().maxAreaHa, n: sheetCounts.big }) }}
            </button>
            <button
              type="button"
              class="chip-filter chip-filter-sm w-full sm:w-auto"
              [class.chip-filter-active]="sheetAnom.noculture"
              (click)="toggleAnom('noculture')"
            >
              {{ t()("carte.anomaly.noculture", { n: sheetCounts.noculture }) }}
            </button>
          </div>
          <div sheetFooter class="flex flex-wrap gap-2">
            @if (activeFilterCount() > 0) {
              <ui-button variant="outline" (click)="resetFilters()">{{ t()("carte.filters.reset") }}</ui-button>
            }
            <ui-button (click)="filtersOpen.set(false)">
              {{ t()("carte.filters.see.autre", { count: plots().length, n: nf.format(plots().length) }) }}
            </ui-button>
          </div>
        </ui-sheet>

        @if (filterOrg(); as org) {
          <div class="mb-3 flex flex-wrap items-center gap-2 rounded-md bg-info-bg px-3 py-2 text-sm text-info-fg">
            {{ t()("carte.orgFilter") }}
            <a [routerLink]="['/organisations', org.id]" class="font-semibold underline">{{ org.name }}</a>
            <button
              type="button"
              class="ml-auto inline-flex items-center gap-1 text-xs font-semibold hover:underline"
              (click)="clearOrgFilter()"
            >
              <lucide-angular [img]="icons.x" class="size-3.5" />
              {{ t()("carte.orgFilter.remove") }}
            </button>
          </div>
        }

        <div
          class="relative isolate h-[70dvh] min-h-80 overflow-hidden rounded-[var(--card-radius)] border lg:h-[68vh]"
        >
          <app-plot-map
            [plots]="plots()"
            [selectedId]="selected()"
            [basemap]="basemap()"
            [onSelect]="onSelectPlot"
          />

          @if (pairOpen()) {
            <aside
              class="absolute inset-x-2 bottom-2 z-[600] max-h-[60%] overflow-y-auto overscroll-contain rounded-[var(--card-radius)] border bg-card p-4 shadow-lg md:inset-x-auto md:bottom-auto md:left-3 md:top-3 md:max-h-[calc(100%-1.5rem)] md:w-80"
            >
              <div class="flex items-center justify-between">
                <div class="font-semibold">{{ t()("carte.overlaps", { n: pairs().length }) }}</div>
                <button
                  type="button"
                  class="rounded p-1 hover:bg-muted pointer-coarse:p-2.5"
                  [attr.aria-label]="t()('carte.close')"
                  (click)="pairOpen.set(false)"
                >
                  <lucide-angular [img]="icons.x" class="size-4" />
                </button>
              </div>
              <p class="mt-1 text-xs text-muted-foreground">{{ t()("carte.overlaps.note") }}</p>
              <ul class="mt-2 divide-y text-sm">
                @for (pair of pairs(); track pairKey(pair)) {
                  <li class="py-2.5">
                    <div class="font-medium">{{ pair[0].code }} × {{ pair[1].code }}</div>
                    <div class="mt-1.5 flex flex-wrap items-center gap-2">
                      <ui-button size="sm" variant="outline" (click)="onSelectPlot(pair[0].id)">
                        {{ t()("carte.overlaps.seeOnMap") }}
                      </ui-button>
                      <a
                        [routerLink]="['/parcelles', pair[0].id]"
                        class="text-xs font-semibold text-primary hover:underline"
                        >{{ t()("carte.overlaps.sheetA") }}</a
                      >
                      <a
                        [routerLink]="['/parcelles', pair[1].id]"
                        class="text-xs font-semibold text-primary hover:underline"
                        >{{ t()("carte.overlaps.sheetB") }}</a
                      >
                    </div>
                  </li>
                }
              </ul>
            </aside>
          }

          @if (selectedPlot(); as plot) {
            @if (plotOwner(); as owner) {
              <aside
                class="absolute inset-x-2 bottom-2 z-[600] max-h-[60%] overflow-y-auto overscroll-contain rounded-[var(--card-radius)] border bg-card p-4 shadow-lg md:inset-x-auto md:bottom-auto md:right-3 md:top-3 md:max-h-[calc(100%-1.5rem)] md:w-80"
              >
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <div class="font-semibold">{{ plot.code }}</div>
                    <a [routerLink]="['/producteurs', owner.id]" class="text-sm text-primary hover:underline">
                      {{ owner.firstName }} {{ owner.lastName }}
                    </a>
                  </div>
                  <button
                    type="button"
                    class="rounded p-1 hover:bg-muted"
                    [attr.aria-label]="t()('carte.close')"
                    (click)="clearSelection()"
                  >
                    <lucide-angular [img]="icons.x" class="size-4" />
                  </button>
                </div>
                @if (plotOrg(); as o) {
                  <div class="text-xs text-muted-foreground">{{ o.name }}</div>
                }
                <div class="mt-2 flex items-center justify-between gap-2">
                  <ui-pill [tone]="PLOT_TONE[plot.status]">{{ locale.tEnum("carte.status", plot.status) }}</ui-pill>
                  <a
                    [routerLink]="['/parcelles', plot.id]"
                    class="text-xs font-semibold text-primary hover:underline"
                    >{{ t()("carte.plot.fullSheet") }}</a
                  >
                </div>
                <dl class="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("carte.plot.measured") }}</dt>
                    <dd class="tabular">{{ t()("carte.unit.ha", { value: nf1.format(plot.measured) }) }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("carte.plot.declared") }}</dt>
                    <dd class="tabular">{{ t()("carte.unit.ha", { value: nf1.format(plot.declared) }) }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("carte.plot.gap") }}</dt>
                    <dd class="tabular" [class.text-danger-fg]="gapAbs(plot) > seuils().areaGapPct">
                      {{ gapLabel(plot) }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("carte.plot.crop") }}</dt>
                    <dd>{{ plot.crop }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("carte.plot.campaign") }}</dt>
                    <dd>{{ plot.campaign }}</dd>
                  </div>
                </dl>
                @if (plot.repaired) {
                  <p class="mt-3 rounded-md bg-info-bg p-2 text-xs text-info-fg">{{ t()("carte.plot.repaired") }}</p>
                }
                <div class="mt-4">
                  <div class="eyebrow mb-1">{{ t()("carte.plot.alerts", { n: plotAlerts().length }) }}</div>
                  @if (plotAlerts().length) {
                    <ul class="divide-y text-xs">
                      @for (a of plotAlerts(); track a.id) {
                        <li class="py-2">
                          <span class="font-medium">{{ a.type }}</span> :
                          <span class="text-muted-foreground">{{ a.detail }}</span>
                        </li>
                      }
                    </ul>
                  } @else {
                    <p class="text-xs text-muted-foreground">{{ t()("carte.plot.noAlert") }}</p>
                  }
                </div>
                <div class="mt-4">
                  <div class="eyebrow mb-1">{{ t()("carte.plot.versions") }}</div>
                  <ul class="space-y-1 text-xs">
                    @for (v of plot.versions; track v.at + v.label) {
                      <li>
                        <span class="text-muted-foreground">{{ fmtDate(v.at) }}</span> : {{ v.label }}
                      </li>
                    }
                  </ul>
                </div>
                @if (store.can('plot.validate') && plot.status !== 'validée') {
                  <div class="mt-4 grid grid-cols-2 gap-2 border-t pt-4">
                    <ui-button (click)="validatePlot(plot.id)">{{ t()("carte.plot.validate") }}</ui-button>
                    <ui-button variant="outline" (click)="redoOpen.set(true)">{{ t()("carte.plot.redo") }}</ui-button>
                  </div>
                }
              </aside>
            }
          }
        </div>

        <ui-dialog [(open)]="redoOpen" [title]="redoTitle()">
          <p class="text-sm text-muted-foreground">{{ t()("carte.redo.description") }}</p>
          <label class="mt-3 block text-sm font-medium">
            {{ t()("carte.redo.reason") }}
            <textarea
              class="mt-1 min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              [(ngModel)]="reason"
              [placeholder]="t()('carte.redo.placeholder')"
            ></textarea>
          </label>
          <button
            actions
            type="button"
            class="inline-flex h-9 items-center rounded-md border px-4 text-sm"
            (click)="redoOpen.set(false); reason = ''"
          >
            {{ t()("common.cancel") }}
          </button>
          <button
            actions
            type="button"
            class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
            [disabled]="reason.trim().length < 3"
            (click)="submitRedo()"
          >
            {{ t()("carte.redo.submit") }}
          </button>
        </ui-dialog>
      </app-shell>
    </app-extra-module-gate>
  `,
})
export default class CartePage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly nf1 = nf1;
  protected readonly ALL = ALL;
  protected readonly fmtDate = fmtDate;
  protected readonly LEGEND = LEGEND;
  protected readonly PLOT_TONE = PLOT_TONE;
  protected readonly icons = { download: Download, layers: Layers, sliders: SlidersHorizontal, x: X };

  readonly fScoop = signal(ALL);
  readonly fCrop = signal(ALL);
  readonly fCampaign = signal(ALL);
  readonly hidden = signal<PlotStatus[]>([]);
  readonly anom = signal({ small: false, big: false, noculture: false });
  readonly basemap = signal<"osm" | "sat">("osm");
  readonly selected = signal<string | undefined>(undefined);
  readonly pairOpen = signal(false);
  readonly filtersOpen = signal(false);
  readonly redoOpen = signal(false);
  reason = "";

  private readonly query = toSignal(
    this.route.queryParamMap.pipe(map(parseCarteQuery)),
    { initialValue: parseCarteQuery(this.route.snapshot.queryParamMap) },
  );

  constructor() {
    const initial = this.query().plot;
    if (initial) this.selected.set(initial);
  }

  readonly scoopOptions = computed(() => {
    const session = this.store.state().session;
    const scoops = this.store.state().scoops;
    const allowed = scoopIdsOf(session);
    const list = isConsolidated(session) ? scoops : scoops.filter((c) => allowed.has(c.id));
    return list.map((s) => [s.id, s.commune] as const);
  });

  readonly prodById = computed(() => new Map(this.store.state().producers.map((p) => [p.id, p])));

  readonly scopedProducerIds = computed(() => {
    const scoped = new Set(inScope(this.store.state().producers, this.store.state().session).map((p) => p.id));
    return scoped;
  });

  readonly basePlots = computed(() => {
    const q = this.query();
    const f = { scoop: this.fScoop(), crop: this.fCrop(), campaign: this.fCampaign() };
    const prodById = this.prodById();
    const scoped = this.scopedProducerIds();
    return this.store.state().plots.filter((p) => {
      if (!scoped.has(p.producerId)) return false;
      const pr = prodById.get(p.producerId);
      if (q.scoop && pr?.scoopId !== q.scoop) return false;
      if (q.campagne && p.campaign !== q.campagne) return false;
      if (q.org && pr?.orgId !== q.org) return false;
      if (f.scoop !== ALL && pr?.scoopId !== f.scoop) return false;
      if (f.crop !== ALL && p.crop !== f.crop) return false;
      if (f.campaign !== ALL && p.campaign !== f.campaign) return false;
      return true;
    });
  });

  readonly anomalyCounts = computed(() => {
    const seuils = this.store.state().seuils;
    const prodById = this.prodById();
    let small = 0,
      big = 0,
      noculture = 0;
    for (const p of this.basePlots()) {
      const pr = prodById.get(p.producerId);
      if (p.measured * 10000 < seuils.minAreaM2) small++;
      if (p.measured > seuils.maxAreaHa) big++;
      if (pr && !pr.crops.some((c) => c.campaign === p.campaign)) noculture++;
    }
    return { small, big, noculture };
  });

  readonly plots = computed(() => {
    const anom = this.anom();
    const anyAnom = anom.small || anom.big || anom.noculture;
    const seuils = this.store.state().seuils;
    const prodById = this.prodById();
    const hidden = this.hidden();
    return this.basePlots().filter((p) => {
      if (hidden.includes(p.status)) return false;
      if (!anyAnom) return true;
      const pr = prodById.get(p.producerId);
      const fl = {
        small: p.measured * 10000 < seuils.minAreaM2,
        big: p.measured > seuils.maxAreaHa,
        noculture: !pr?.crops.some((c) => c.campaign === p.campaign),
      };
      return (anom.small && fl.small) || (anom.big && fl.big) || (anom.noculture && fl.noculture);
    });
  });

  readonly pairs = computed(() => {
    const base = this.basePlots();
    const ov = base.filter((p) => p.status === "chevauchement");
    const boxes = ov.map((p) => {
      const pts = p.repaired ?? p.raw;
      const la = pts.map((x) => x[0]!);
      const ln = pts.map((x) => x[1]!);
      return {
        p,
        minLa: Math.min(...la),
        maxLa: Math.max(...la),
        minLn: Math.min(...ln),
        maxLn: Math.max(...ln),
      };
    });
    const out: [Plot, Plot][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i]!;
        const b = boxes[j]!;
        if (a.p.producerId === b.p.producerId) continue;
        if (a.minLa <= b.maxLa && b.minLa <= a.maxLa && a.minLn <= b.maxLn && b.minLn <= a.maxLn) {
          const key = [a.p.id, b.p.id].sort().join("|");
          if (!seen.has(key)) {
            seen.add(key);
            out.push([a.p, b.p]);
          }
        }
      }
    }
    return out;
  });

  readonly selectedPlot = computed(() => {
    const id = this.selected();
    if (!id) return undefined;
    const plot = this.store.state().plots.find((p) => p.id === id);
    if (!plot || !this.scopedProducerIds().has(plot.producerId)) return undefined;
    return plot;
  });

  readonly plotOwner = computed(() => {
    const plot = this.selectedPlot();
    if (!plot) return undefined;
    return this.prodById().get(plot.producerId);
  });

  readonly plotOrg = computed(() => {
    const owner = this.plotOwner();
    if (!owner) return undefined;
    return this.store.state().orgs.find((o) => o.id === owner.orgId);
  });

  readonly filterOrg = computed(() => {
    const orgId = this.query().org;
    if (!orgId) return undefined;
    return this.store.state().orgs.find((o) => o.id === orgId);
  });

  readonly plotAlerts = computed(() => {
    const plot = this.selectedPlot();
    if (!plot) return [];
    return this.store.state().alerts.filter((a) => a.entity === "parcelle" && a.entityId === plot.id);
  });

  readonly seuils = computed(() => this.store.state().seuils);

  readonly headerDesc = computed(() => {
    const n = this.plots().length;
    const base = this.t()("carte.shown.autre", { count: n, n: nf.format(n) });
    const pairs = this.pairs().length;
    if (!pairs) return base;
    return `${base} ${this.t()("carte.overlapsDetected.autre", { count: pairs, n: pairs })}`;
  });

  readonly activeFilterCount = computed(() => {
    let n = 0;
    if (this.fScoop() !== ALL) n++;
    if (this.fCrop() !== ALL) n++;
    if (this.fCampaign() !== ALL) n++;
    const a = this.anom();
    if (a.small || a.big || a.noculture) n++;
    return n;
  });

  readonly filterSelects = computed(() => {
    const t = this.t();
    return [
      {
        key: "scoop" as const,
        label: t("carte.filter.scoop"),
        value: this.fScoop(),
        options: this.scoopOptions(),
      },
      {
        key: "crop" as const,
        label: t("carte.filter.crop"),
        value: this.fCrop(),
        options: CROPS.map((c) => [c, c] as const),
      },
      {
        key: "campaign" as const,
        label: t("carte.filter.campaign"),
        value: this.fCampaign(),
        options: CAMPAIGNS.map((c) => [c, c] as const),
      },
    ];
  });

  readonly redoTitle = computed(() => {
    const plot = this.selectedPlot();
    return plot ? this.t()("carte.redo.title", { code: plot.code }) : "";
  });

  onFilter(key: "scoop" | "crop" | "campaign", value: string): void {
    if (key === "scoop") this.fScoop.set(value);
    else if (key === "crop") this.fCrop.set(value);
    else this.fCampaign.set(value);
  }

  toggleHidden(s: PlotStatus): void {
    this.hidden.update((h) => (h.includes(s) ? h.filter((x) => x !== s) : [...h, s]));
  }

  toggleAnom(key: "small" | "big" | "noculture"): void {
    this.anom.update((a) => ({ ...a, [key]: !a[key] }));
  }

  resetFilters(): void {
    this.fScoop.set(ALL);
    this.fCrop.set(ALL);
    this.fCampaign.set(ALL);
    this.anom.set({ small: false, big: false, noculture: false });
  }

  readonly onSelectPlot = (id: string): void => {
    this.selected.set(id);
    this.pairOpen.set(false);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { plot: id },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  };

  clearSelection(): void {
    this.selected.set(undefined);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { plot: null },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }

  clearOrgFilter(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { org: null },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }

  gapAbs(plot: Plot): number {
    return Math.abs(((plot.measured - plot.declared) / plot.declared) * 100);
  }

  gapLabel(plot: Plot): string {
    const gap = ((plot.measured - plot.declared) / plot.declared) * 100;
    const sign = gap > 0 ? "+" : "";
    return `${sign}${this.t()("carte.unit.pct", { value: nf1.format(gap) })}`;
  }

  pairKey(pair: [Plot, Plot]): string {
    return `${pair[0].id}-${pair[1].id}`;
  }

  validatePlot(id: string): void {
    this.store.actions.reviewPlot(id, "validée");
    this.toast.success("carte.plot.geometryValidated");
  }

  submitRedo(): void {
    const plot = this.selectedPlot();
    if (!plot || this.reason.trim().length < 3) return;
    this.store.actions.reviewPlot(plot.id, "à reprendre", this.reason.trim());
    this.toast.show({ tone: "success", titleKey: "carte.redo.requested" });
    this.reason = "";
    this.redoOpen.set(false);
  }

  exportGeo(list: Plot[] = this.plots(), name = "parcelles.geojson"): void {
    const fc = {
      type: "FeatureCollection",
      features: list.map((p) => ({
        type: "Feature",
        properties: { code: p.code, statut: p.status, culture: p.crop, ha: p.measured },
        geometry: {
          type: "Polygon",
          coordinates: [
            [...(p.repaired ?? p.raw), (p.repaired ?? p.raw)[0]!].map(([la, ln]) => [ln, la]),
          ],
        },
      })),
    };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(fc)], { type: "application/geo+json" }));
    a.download = name;
    a.click();
    this.store.actions.audit(
      "Export cartographique",
      list.length === 1 ? `Parcelle ${list[0]!.code}` : "Parcelles",
      `${list.length} parcelle(s) (GeoJSON)`,
    );
    this.toast.success("carte.exportReady");
  }
}

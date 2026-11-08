import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { ArrowLeft, FileDown, LucideAngularModule, Map as MapIcon } from "lucide-angular";

import { cropFamilyOf } from "@/lib/store";
import { canSeePlot, scopedAlerts } from "@/lib/scope";
import { fmtDate, nf1 } from "@/lib/format";
import type { Plot, PlotStatus } from "@/lib/mock/data";
import { AppShellComponent } from "../shared/app-shell.component";
import { ExtraModuleGateComponent } from "../shared/extra-module-gate.component";
import { LocaleService } from "../shared/locale.service";
import { PlotMapComponent } from "../shared/plot-map.component";
import { StoreService } from "../shared/store.service";
import { ToastService } from "../shared/toast.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent, type UiPillTone } from "../shared/ui/pill.component";

const PLOT_TONE: Record<PlotStatus, UiPillTone> = {
  validée: "success",
  relevée: "info",
  "à reprendre": "warning",
  chevauchement: "danger",
};

const ALERT_TONE = {
  ouvert: "warning",
  "en vérification": "info",
  résolu: "success",
  rejeté: "neutral",
} as const;

/** Port de src/routes/parcelles.$id.tsx — fiche parcelle + carte + alertes / historique. */
@Component({
  selector: "app-parcelle-detail-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    ExtraModuleGateComponent,
    AppShellComponent,
    PlotMapComponent,
    UiButtonComponent,
    UiEmptyComponent,
    UiPageHeaderComponent,
    UiPillComponent,
  ],
  template: `
    <app-extra-module-gate>
      <app-shell perm="map.read" [area]="t()('parcelle.area')">
        @if (!plot()) {
          <ui-empty>{{ t()("parcelle.notFound") }}</ui-empty>
        } @else if (!inScopePlot()) {
          <ui-empty>{{ t()("parcelle.outOfScope") }}</ui-empty>
        } @else {
          @if (plot(); as pl) {
            <a
              routerLink="/carte"
              class="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <lucide-angular [img]="icons.arrowLeft" class="size-4" />
              {{ t()("parcelle.back") }}
            </a>

            <ui-page-header
              [eyebrow]="t()('parcelle.eyebrow')"
              [title]="pl.code"
              [description]="producerLine()"
            >
              <ui-pill actions [tone]="anomalies().length ? 'warning' : 'success'">
                {{
                  anomalies().length
                    ? t()("parcelle.anomalies.autre", { count: anomalies().length, n: anomalies().length })
                    : t()("parcelle.anomalies.none")
                }}
              </ui-pill>
              <a
                actions
                routerLink="/carte"
                [queryParams]="{ plot: pl.id }"
                class="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm hover:bg-accent"
              >
                <lucide-angular [img]="icons.map" class="size-4" />
                {{ t()("parcelle.openOnMap") }}
              </a>
              <ui-button actions variant="outline" (click)="exportGeo(pl)">
                <lucide-angular [img]="icons.fileDown" class="size-4" />
                {{ t()("parcelle.exportGeo") }}
              </ui-button>
              <ui-button
                actions
                variant="outline"
                (click)="printExport(pl)"
              >
                <lucide-angular [img]="icons.fileDown" class="size-4" />
                {{ t()("parcelle.exportPdf") }}
              </ui-button>
            </ui-page-header>

            @if (anomalies().length > 0) {
              <div class="mb-4 flex flex-wrap gap-2">
                @for (a of anomalies(); track a) {
                  <ui-pill tone="danger">{{ a }}</ui-pill>
                }
              </div>
            }

            <div class="grid gap-6 lg:grid-cols-3">
              <section class="surface min-w-0 p-4 sm:p-5 lg:col-span-2">
                <div class="relative h-[50dvh] min-h-64 overflow-hidden rounded-[var(--card-radius)] border lg:h-[46vh]">
                  <app-plot-map [plots]="[pl]" [selectedId]="pl.id" basemap="osm" [onSelect]="noopSelect" />
                </div>
                @if (pl.repaired) {
                  <p class="mt-3 rounded-md bg-info-bg p-2.5 text-xs text-info-fg">{{ t()("parcelle.repaired") }}</p>
                }
                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("parcelle.field.measured") }}</dt>
                    <dd class="mt-0.5 tabular font-medium">
                      {{ t()("parcelle.unit.ha", { value: nf1.format(pl.measured) }) }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("parcelle.field.declared") }}</dt>
                    <dd class="mt-0.5 tabular font-medium">
                      {{ t()("parcelle.unit.ha", { value: nf1.format(pl.declared) }) }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("parcelle.field.gap") }}</dt>
                    <dd
                      class="mt-0.5 tabular font-medium"
                      [class.text-danger-fg]="gapAbs(pl) > store.state().seuils.areaGapPct"
                    >
                      {{ gapLabel(pl) }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("parcelle.field.gps") }}</dt>
                    <dd class="mt-0.5 font-medium">{{ t()("parcelle.unit.m", { value: pl.gpsPrecision }) }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("parcelle.field.crop") }}</dt>
                    <dd class="mt-0.5 font-medium">{{ pl.crop }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("parcelle.field.family") }}</dt>
                    <dd class="mt-0.5 font-medium">
                      {{ cropFamilyOf(pl.crop, store.state().cropRefs) }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("parcelle.field.campaign") }}</dt>
                    <dd class="mt-0.5 font-medium">{{ pl.campaign }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("parcelle.field.village") }}</dt>
                    <dd class="mt-0.5 font-medium">{{ producer()?.village ?? t()("parcelle.field.villageNone") }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-muted-foreground">{{ t()("parcelle.field.status") }}</dt>
                    <dd class="mt-1">
                      <ui-pill [tone]="PLOT_TONE[pl.status]">{{ locale.tEnum("carte.status", pl.status) }}</ui-pill>
                    </dd>
                  </div>
                </div>
              </section>

              <div class="space-y-6">
                <section class="surface p-4 sm:p-5">
                  <h2 class="font-semibold">{{ t()("parcelle.alerts", { n: alerts().length }) }}</h2>
                  @if (alerts().length) {
                    <ul class="mt-3 divide-y text-sm">
                      @for (a of alerts(); track a.id) {
                        <li class="flex items-start justify-between gap-3 py-2.5">
                          <span>
                            <span class="font-medium">{{ a.type }}</span>
                            <div class="text-xs text-muted-foreground">{{ a.detail }}</div>
                          </span>
                          <ui-pill [tone]="ALERT_TONE[a.status]">{{ a.status }}</ui-pill>
                        </li>
                      }
                    </ul>
                  } @else {
                    <p class="mt-3 text-sm text-muted-foreground">{{ t()("parcelle.noAlert") }}</p>
                  }
                  <a
                    routerLink="/qualite/alertes"
                    class="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
                    >{{ t()("parcelle.alertQueue") }}</a
                  >
                </section>

                <section class="surface p-4 sm:p-5">
                  <h2 class="font-semibold">{{ t()("parcelle.history") }}</h2>
                  <ul class="mt-3 space-y-2 text-xs">
                    @for (v of pl.versions; track v.at + v.label) {
                      <li>
                        <span class="text-muted-foreground">{{ fmtDate(v.at) }}</span> : {{ v.label }}
                      </li>
                    }
                  </ul>
                  @if (store.can('plot.validate') && pl.status !== 'validée') {
                    <div class="mt-4 space-y-2 border-t pt-4">
                      <ui-button class="w-full" (click)="validateGeometry(pl.id)">
                        {{ t()("parcelle.validateGeometry") }}
                      </ui-button>
                      <label class="block text-sm font-medium">
                        {{ t()("parcelle.redo.reason") }}
                        <textarea
                          class="mt-1 min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal"
                          [(ngModel)]="reason"
                          [placeholder]="t()('parcelle.redo.placeholder')"
                        ></textarea>
                      </label>
                      <ui-button
                        variant="outline"
                        class="w-full"
                        [disabled]="reason.trim().length < 3"
                        (click)="submitRedo(pl.id)"
                      >
                        {{ t()("parcelle.redo.submit") }}
                      </ui-button>
                    </div>
                  }
                </section>
              </div>
            </div>
          }
        }
      </app-shell>
    </app-extra-module-gate>
  `,
})
export default class ParcelleDetailPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  protected readonly t = this.locale.t;
  protected readonly nf1 = nf1;
  protected readonly fmtDate = fmtDate;
  protected readonly PLOT_TONE = PLOT_TONE;
  protected readonly ALERT_TONE = ALERT_TONE;
  protected readonly icons = { arrowLeft: ArrowLeft, fileDown: FileDown, map: MapIcon };

  reason = "";
  readonly noopSelect = () => undefined;

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "")), {
    initialValue: "",
  });

  readonly plot = computed(() => {
    const id = this.id();
    return this.store.state().plots.find((p) => p.id === id);
  });

  readonly producer = computed(() => {
    const pl = this.plot();
    if (!pl) return undefined;
    return this.store.state().producers.find((p) => p.id === pl.producerId);
  });

  readonly inScopePlot = computed(() => {
    const pl = this.plot();
    if (!pl) return false;
    return canSeePlot(this.store.state().session, pl, this.store.state().producers);
  });

  readonly alerts = computed(() => {
    const id = this.id();
    const s = this.store.state();
    return scopedAlerts(s.alerts, s.producers, s.plots, s.session).filter(
      (a) => a.entity === "parcelle" && a.entityId === id,
    );
  });

  readonly anomalies = computed(() => {
    const pl = this.plot();
    const pr = this.producer();
    if (!pl) return [];
    const seuils = this.store.state().seuils;
    const out: string[] = [];
    if (pl.measured * 10000 < seuils.minAreaM2)
      out.push(this.t()("parcelle.anomaly.small", { min: seuils.minAreaM2 }));
    if (pl.measured > seuils.maxAreaHa)
      out.push(this.t()("parcelle.anomaly.big", { max: seuils.maxAreaHa }));
    if (pr && !pr.crops.some((c) => c.campaign === pl.campaign))
      out.push(this.t()("parcelle.anomaly.noculture"));
    if (pl.gpsPrecision > seuils.gpsPrecisionMax)
      out.push(this.t()("parcelle.anomaly.gps", { max: seuils.gpsPrecisionMax }));
    return out;
  });

  protected cropFamilyOf = cropFamilyOf;

  producerLine(): string {
    const pr = this.producer();
    if (!pr) return "";
    const scoop = this.store.state().scoops.find((s) => s.id === pr.scoopId);
    const org = this.store.state().orgs.find((o) => o.id === pr.orgId);
    return `${this.t()("parcelle.producer")}${pr.firstName} ${pr.lastName} (${pr.code}) · ${pr.village} · ${scoop?.name ?? ""} · ${org?.name ?? ""}`;
  }

  gapAbs(pl: { measured: number; declared: number }): number {
    return Math.abs(((pl.measured - pl.declared) / pl.declared) * 100);
  }

  gapLabel(pl: { measured: number; declared: number }): string {
    const gap = ((pl.measured - pl.declared) / pl.declared) * 100;
    const sign = gap > 0 ? "+" : "";
    return `${sign}${this.t()("parcelle.unit.pct", { value: nf1.format(gap) })}`;
  }

  validateGeometry(id: string): void {
    this.store.actions.reviewPlot(id, "validée");
    this.toast.success("parcelle.geometryValidated");
  }

  submitRedo(id: string): void {
    if (this.reason.trim().length < 3) return;
    this.store.actions.reviewPlot(id, "à reprendre", this.reason.trim());
    this.toast.show({ tone: "success", titleKey: "parcelle.redo.requested" });
    this.reason = "";
  }

  exportGeo(pl: Plot): void {
    const ring = pl.repaired ?? pl.raw;
    const fc = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            code: pl.code,
            statut: pl.status,
            culture: pl.crop,
            ha: pl.measured,
          },
          geometry: {
            type: "Polygon",
            coordinates: [[...ring, ring[0]!].map(([la, ln]) => [ln, la])],
          },
        },
      ],
    };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(fc)], { type: "application/geo+json" }));
    a.download = `${pl.code}.geojson`;
    a.click();
    this.store.actions.audit("Export cartographique", `Parcelle ${pl.code}`, "GeoJSON");
    this.toast.success("parcelle.exportReady");
  }

  printExport(pl: Plot): void {
    if (typeof window !== "undefined") window.print();
    this.store.actions.audit("Export cartographique", `Parcelle ${pl.code}`, "PDF (impression)");
  }
}

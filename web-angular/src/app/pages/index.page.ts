import { Component, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LucideAngularModule, FolderOpen, AlertTriangle, Wallet } from "lucide-angular";
import type { ChartConfiguration } from "chart.js";

import { inScope } from "@/lib/store";
import { membershipCounts, producerStatusCounts } from "@/lib/membership";
import { scopedDossiers, scopedMembers, scopedPayments, scopedRules } from "@/lib/scope";
import { memberDues } from "@/lib/contributions";
import { ageAtMost, fmtDateTime, nf1 } from "@/lib/format";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiChartComponent } from "../shared/ui/chart.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";

/** Port of src/routes/index.tsx — hiérarchie React + Chart.js tokenisé. */
@Component({
  selector: "app-index-page",
  imports: [
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiChartComponent,
    UiPageHeaderComponent,
  ],
  template: `
    <app-shell perm="dashboard.read" [area]="t()('dashboard.area')">
      <ui-page-header
        [eyebrow]="data().eyebrow"
        [title]="t()('dashboard.title')"
        [description]="t()('dashboard.description')"
      />

      <section class="mt-6" aria-labelledby="todo-title">
        <h2 id="todo-title" class="mb-3 font-semibold">{{ t()("dashboard.todo.title") }}</h2>
        <div class="grid gap-3 sm:grid-cols-3">
          <div class="surface p-4">
            <div class="flex items-start gap-3">
              <span class="grid size-9 place-items-center rounded-md bg-primary-soft text-primary">
                <lucide-angular [img]="icons.folderOpen" class="size-4" aria-hidden="true" />
              </span>
              <div class="min-w-0 flex-1">
                <div class="text-xs text-muted-foreground">{{ t()("dashboard.todo.dossiers") }}</div>
                <div class="mt-1 text-2xl font-semibold tabular">{{ data().pendingDossiers }}</div>
                <div class="mt-1 text-xs text-muted-foreground">
                  {{ t()("dashboard.todo.dossiersSub", { days: data().oldestDays }) }}
                </div>
                <a routerLink="/dossiers" class="mt-2 inline-block text-sm font-medium text-primary hover:underline">{{
                  t()("dashboard.todo.open")
                }}</a>
              </div>
            </div>
          </div>
          <div class="surface p-4">
            <div class="flex items-start gap-3">
              <span class="grid size-9 place-items-center rounded-md bg-primary-soft text-primary">
                <lucide-angular [img]="icons.alertTriangle" class="size-4" aria-hidden="true" />
              </span>
              <div class="min-w-0 flex-1">
                <div class="text-xs text-muted-foreground">{{ t()("dashboard.todo.alerts") }}</div>
                <div class="mt-1 text-2xl font-semibold tabular">{{ data().openAlerts }}</div>
                <div class="mt-1 text-xs text-muted-foreground">
                  {{ t()("dashboard.todo.alertsSub", { critical: data().criticalAlerts }) }}
                </div>
                <a
                  routerLink="/qualite/alertes"
                  class="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                  >{{ t()("dashboard.todo.open") }}</a
                >
              </div>
            </div>
          </div>
          <div class="surface p-4">
            <div class="flex items-start gap-3">
              <span class="grid size-9 place-items-center rounded-md bg-primary-soft text-primary">
                <lucide-angular [img]="icons.wallet" class="size-4" aria-hidden="true" />
              </span>
              <div class="min-w-0 flex-1">
                <div class="text-xs text-muted-foreground">{{ t()("dashboard.todo.dues") }}</div>
                <div class="mt-1 text-2xl font-semibold tabular">{{ data().lateDues }}</div>
                <div class="mt-1 text-xs text-muted-foreground">{{ t()("dashboard.todo.duesSub") }}</div>
                <a
                  routerLink="/cotisations"
                  class="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                  >{{ t()("dashboard.todo.open") }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div class="surface p-4">
          <div class="text-xs text-muted-foreground">{{ t()("dashboard.kpi.producers") }}</div>
          <div class="mt-1 whitespace-nowrap text-xl font-semibold tabular sm:text-2xl">
            {{ localeService.formatNumber(data().producers) }}
          </div>
          @if (data().toVerify > 0) {
            <div class="mt-2 flex items-center gap-1.5 text-xs text-warning-fg">
              <span class="size-1.5 rounded-full bg-warning" aria-hidden="true"></span>
              {{ t()("dashboard.kpi.toVerify", { count: localeService.formatNumber(data().toVerify) }) }}
            </div>
          }
        </div>
        <div class="surface p-4">
          <div class="text-xs text-muted-foreground">{{ t()("dashboard.kpi.activeMembers") }}</div>
          <div class="mt-1 whitespace-nowrap text-xl font-semibold tabular sm:text-2xl">
            {{ localeService.formatNumber(data().activeMembers) }}
          </div>
        </div>
        <div class="surface p-4">
          <div class="text-xs text-muted-foreground">{{ t()("dashboard.kpi.women") }}</div>
          <div class="mt-1 whitespace-nowrap text-xl font-semibold tabular sm:text-2xl">{{ data().womenPct }}%</div>
        </div>
        <div class="surface p-4">
          <div class="text-xs text-muted-foreground">{{ t()("dashboard.kpi.young", { age: data().youthMaxAge }) }}</div>
          <div class="mt-1 whitespace-nowrap text-xl font-semibold tabular sm:text-2xl">
            {{ localeService.formatNumber(data().youthCount) }}
          </div>
        </div>
      </div>

      <div class="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        <section class="surface flex flex-col p-4 sm:p-5 md:col-span-2">
          <h2 class="font-semibold">{{ t()("dashboard.chart.byScoop") }}</h2>
          <div class="relative mt-4 h-72 w-full min-h-0 overflow-hidden">
            <ui-chart type="bar" [data]="byScoopChart().data" [options]="byScoopChart().options" />
          </div>
        </section>
        <section class="surface flex flex-col p-5">
          <h2 class="font-semibold">{{ t()("dashboard.status.title") }}</h2>
          <p class="mt-1 text-xs text-muted-foreground">{{ t()("dashboard.status.hint") }}</p>
          <div class="relative mt-4 h-44 w-full shrink-0 overflow-hidden">
            <ui-chart type="doughnut" [data]="statusChart().data" [options]="statusChart().options" />
          </div>
          <ul class="relative z-10 mt-3 shrink-0 space-y-1.5 border-t border-border pt-3 text-sm">
            @for (row of statusLegend(); track row.name) {
              <li class="flex justify-between gap-2">
                <span class="flex min-w-0 items-center gap-2">
                  <span class="size-2.5 shrink-0 rounded-sm" [style.background]="row.color" aria-hidden="true"></span>
                  <span class="truncate">{{ row.name }}</span>
                </span>
                <span class="shrink-0 tabular font-medium">{{ localeService.formatNumber(row.n) }}</span>
              </li>
            }
          </ul>
        </section>
        <section class="surface p-5 md:col-span-2 xl:col-span-3">
          <div class="flex items-center justify-between gap-3">
            <h2 class="font-semibold">{{ t()("dashboard.activity.title") }}</h2>
            <a routerLink="/audit" class="text-sm font-medium text-primary hover:underline">{{
              t()("dashboard.activity.all")
            }}</a>
          </div>
          <ul class="mt-3 divide-y">
            @for (a of data().recentAudit; track a.id) {
              <li
                class="flex flex-col gap-0.5 py-2.5 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <span>
                  <span class="font-medium">{{ a.action }}</span> · {{ a.entity }}
                  <span class="text-muted-foreground">
                    {{ t()("dashboard.activity.by", { user: a.user }) }}
                  </span>
                </span>
                <span class="shrink-0 text-xs text-muted-foreground">{{ fmtDateTime(a.at) }}</span>
              </li>
            }
          </ul>
        </section>
      </div>
    </app-shell>
  `,
})
export default class IndexPage {
  protected readonly store = inject(StoreService);
  protected readonly localeService = inject(LocaleService);
  protected readonly t = this.localeService.t;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly icons = { folderOpen: FolderOpen, alertTriangle: AlertTriangle, wallet: Wallet };

  protected readonly data = computed(() => {
    const s = this.store.state();
    const session = s.session;
    const now = new Date().toISOString();
    const allScoops = s.scoops;

    const producersInScope = inScope(
      s.producers.filter((p) => !p.mergedInto),
      session,
    );
    const members = scopedMembers(s.members, session);
    const mc = membershipCounts(members);
    const ids = new Set(producersInScope.map((p) => p.id));
    const women = producersInScope.filter((p) => p.sex === "F");
    const youth = producersInScope.filter((p) => ageAtMost(p.age, s.youthMaxAge));
    const toVerify = producersInScope.filter((p) => p.quality !== "validé").length;

    const pendingDossiers = scopedDossiers(s.dossiers, session)
      .filter((d) => d.status === "soumis" || d.status === "en examen")
      .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
    const oldestDays = pendingDossiers[0]
      ? Math.max(0, Math.floor((Date.now() - new Date(pendingDossiers[0].updatedAt).getTime()) / 86_400_000))
      : 0;

    const prodById = new Map(producersInScope.map((p) => [p.id, p]));
    const plotById = new Map(s.plots.map((p) => [p.id, p]));
    const openAlerts = s.alerts.filter((a) => {
      if (a.status !== "ouvert") return false;
      const owner =
        a.entity === "producteur"
          ? prodById.get(a.entityId)
          : prodById.get(plotById.get(a.entityId)?.producerId ?? "");
      return !!owner && ids.has(owner.id);
    });
    const criticalAlerts = openAlerts.filter((a) => a.severity === "élevée").length;

    const scopeRules = scopedRules(s.contributionRules, session);
    const payments = scopedPayments(s.payments, session);
    const lateDues = members.filter((m) => {
      if (m.status !== "membre") return false;
      const rule = scopeRules.find((r) => r.scoopId === m.scoopId);
      const state = memberDues(m, rule, payments, now).state;
      return state === "en retard" || state === "jamais payé";
    }).length;

    const eyebrow =
      session?.scope.kind === "consolidé"
        ? this.t()("dashboard.eyebrow.consolidated", { count: allScoops.length })
        : this.t()("dashboard.eyebrow.scoop");

    return {
      eyebrow,
      producers: producersInScope.length,
      activeMembers: mc.active,
      womenPct: producersInScope.length ? nf1.format((women.length / producersInScope.length) * 100) : "0",
      youthCount: youth.length,
      youthMaxAge: s.youthMaxAge,
      toVerify,
      pendingDossiers: pendingDossiers.length,
      oldestDays,
      openAlerts: openAlerts.length,
      criticalAlerts,
      lateDues,
      producersInScope,
      mc,
      prodCounts: producerStatusCounts(producersInScope),
      recentAudit: s.audit.slice(0, 6),
    };
  });

  protected readonly statusLegend = computed(() => {
    const d = this.data();
    return [
      {
        name: this.t()("dashboard.status.activeMembers"),
        n: d.mc.active,
        color: "var(--chart-1)",
      },
      {
        name: this.t()("dashboard.status.listed"),
        n: d.prodCounts.producers,
        color: "var(--chart-2)",
      },
    ];
  });

  protected readonly byScoopChart = computed((): ChartConfiguration<"bar"> => {
    const s = this.store.state();
    const producers = this.data().producersInScope;
    const rows = s.scoops
      .map((scoop) => {
        const ps = producers.filter((p) => p.scoopId === scoop.id);
        return {
          name: scoop.commune,
          F: ps.filter((p) => p.sex === "F").length,
          H: ps.filter((p) => p.sex === "H").length,
        };
      })
      .filter((r) => r.F + r.H > 0);
    return {
      type: "bar",
      data: {
        labels: rows.map((r) => r.name),
        datasets: [
          {
            label: this.t()("dashboard.chart.women"),
            data: rows.map((r) => r.F),
            backgroundColor: "var(--chart-2)",
          },
          {
            label: this.t()("dashboard.chart.men"),
            data: rows.map((r) => r.H),
            backgroundColor: "var(--chart-1)",
          },
        ],
      },
      options: {
        indexAxis: "y",
        plugins: { legend: { position: "bottom" } },
        scales: { x: { stacked: true, beginAtZero: true }, y: { stacked: true } },
      },
    };
  });

  protected readonly statusChart = computed((): ChartConfiguration<"doughnut"> => {
    const d = this.data();
    return {
      type: "doughnut",
      data: {
        labels: [this.t()("dashboard.status.activeMembers"), this.t()("dashboard.status.listed")],
        datasets: [
          {
            data: [d.mc.active, d.prodCounts.producers],
            backgroundColor: ["var(--chart-1)", "var(--chart-2)"],
          },
        ],
      },
      options: {
        cutout: "58%",
        layout: { padding: 4 },
        plugins: { legend: { display: false } },
      },
    };
  });
}

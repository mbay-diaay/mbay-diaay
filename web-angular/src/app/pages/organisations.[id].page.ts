import { Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { LucideAngularModule, ArrowLeft, Network } from "lucide-angular";

import { nf, nf1 } from "@/lib/format";
import { inScope } from "@/lib/scope";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

/**
 * Fiche organisation allégée — stats membres / parcelles depuis le store.
 */
@Component({
  selector: "app-organisation-detail-page",
  imports: [
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiPageHeaderComponent,
    UiEmptyComponent,
    UiPillComponent,
  ],
  template: `
    <app-shell perm="producer.read" [area]="t()('organisations.detail.area')">
      @if (!org()) {
        <ui-empty>
          <div class="mx-auto mb-3 grid size-12 place-items-center text-muted-foreground">
            <lucide-angular [img]="icons.network" class="size-8" />
          </div>
          <p class="font-semibold">{{ t()("organisations.detail.notFound") }}</p>
          <p class="mt-1 text-sm">{{ t()("organisations.detail.notFoundHint") }}</p>
        </ui-empty>
      } @else if (!inScopeOrg()) {
        <ui-empty>
          <div class="mx-auto mb-3 grid size-12 place-items-center text-muted-foreground">
            <lucide-angular [img]="icons.network" class="size-8" />
          </div>
          <p class="font-semibold">{{ t()("organisations.detail.outOfScope") }}</p>
          <p class="mt-1 text-sm">{{ t()("organisations.detail.outOfScopeHint") }}</p>
        </ui-empty>
      } @else {
        @if (org(); as g) {
          <div class="mb-4 text-sm text-muted-foreground">
            <a
              routerLink="/organisations"
              class="inline-flex items-center gap-1 hover:text-foreground"
            >
              <lucide-angular [img]="icons.arrowLeft" class="size-4" />
              {{ t()("organisations.title") }}
            </a>
          </div>

          <ui-page-header
            [title]="g.name"
            [description]="g.village + ' · ' + scoopName(g.scoopId)"
          >
            <span actions class="inline-flex">
              @if (g.type) {
                <ui-pill tone="brand">{{ locale.tEnum("organisations.type", g.type) }}</ui-pill>
              } @else {
                <ui-pill tone="warning">{{ t()("organisations.toQualify") }}</ui-pill>
              }
            </span>
          </ui-page-header>

          <div class="surface grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("organisations.col.producers") }}</dt>
              <dd class="mt-0.5 text-xl font-semibold tabular">{{ nf.format(counts().members) }}</dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("organisations.col.plots") }}</dt>
              <dd class="mt-0.5 text-xl font-semibold tabular">{{ nf.format(counts().plots) }}</dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("organisations.detail.measuredArea") }}</dt>
              <dd class="mt-0.5 text-xl font-semibold tabular">{{ nf1.format(counts().measuredHa) }} ha</dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("organisations.col.toVerify") }}</dt>
              <dd class="mt-0.5 text-xl font-semibold tabular">{{ nf.format(counts().toVerify) }}</dd>
            </div>
          </div>

          <p class="mt-4 text-xs text-muted-foreground">
            {{ t()("organisations.detail.tab.members", { count: counts().members }) }} ·
            {{ t()("organisations.detail.tab.plots", { count: counts().plots }) }}.
            {{ t()("organisations.detail.tab.alerts", { count: counts().openAlerts }) }}
          </p>
        }
      }
    </app-shell>
  `,
})
export default class OrganisationDetailPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly nf1 = nf1;
  protected readonly icons = { arrowLeft: ArrowLeft, network: Network };

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "")), {
    initialValue: "",
  });

  protected readonly org = computed(() =>
    this.store.state().orgs.find((o) => o.id === this.id()),
  );

  protected readonly inScopeOrg = computed(() => {
    const o = this.org();
    if (!o) return false;
    return inScope([o], this.store.state().session).length === 1;
  });

  protected readonly counts = computed(() => {
    const id = this.id();
    const s = this.store.state();
    const members = s.producers.filter((p) => p.orgId === id && !p.mergedInto);
    const memberIds = new Set(members.map((p) => p.id));
    const plots = s.plots.filter((pl) => memberIds.has(pl.producerId));
    const measuredHa = plots.reduce((sum, pl) => sum + pl.measured, 0);
    const toVerify = members.filter((p) => p.quality !== "validé").length;
    const plotIds = new Set(plots.map((pl) => pl.id));
    const openAlerts = s.alerts.filter(
      (a) =>
        (memberIds.has(a.entityId) || plotIds.has(a.entityId)) &&
        (a.status === "ouvert" || a.status === "en vérification"),
    ).length;
    return { members: members.length, plots: plots.length, measuredHa, toVerify, openAlerts };
  });

  protected scoopName(scoopId: string): string {
    return this.store.state().scoops.find((c) => c.id === scoopId)?.name ?? "";
  }
}

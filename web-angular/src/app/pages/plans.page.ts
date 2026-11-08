import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ExternalLink, LucideAngularModule, Search, Sprout } from "lucide-angular";

import { fmtDate, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import type { Producer } from "@/lib/mock/data";
import { PLAN_STATUSES, type PlanStatus } from "@/lib/mock/cooperative";
import { PLAN_STATUS_LABEL, PLAN_TONE, planArea, planCrops } from "@/lib/plans";
import { scopedPlans } from "@/lib/scope";
import { AppShellComponent } from "../shared/app-shell.component";
import { ExtraModuleGateComponent } from "../shared/extra-module-gate.component";
import { LocaleService } from "../shared/locale.service";
import { NewPlanDialogComponent } from "../shared/new-plan-dialog.component";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

const FILTER_LABEL: Record<PlanStatus, MessageKey> = {
  brouillon: "plans.filter.brouillon",
  validé: "plans.filter.validé",
  "à jour": "plans.filter.à jour",
};

const fullName = (p: Producer | undefined, fallback: string) =>
  p ? `${p.firstName} ${p.lastName}` : fallback;

@Component({
  selector: "app-plans-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    ExtraModuleGateComponent,
    AppShellComponent,
    NewPlanDialogComponent,
    UiChipRailComponent,
    UiEmptyComponent,
    UiPageHeaderComponent,
    UiPillComponent,
    UiButtonComponent,
  ],
  template: `
    <app-extra-module-gate>
      <app-shell perm="plan.read" [area]="t()('plans.area')">
        <ui-page-header
          [eyebrow]="t()('plans.eyebrow')"
          [title]="t()('plans.title')"
          [description]="t()('plans.description')"
        >
          @if (store.can('plan.write')) {
            <ui-button actions type="button" (click)="newOpen.set(true)">
              <lucide-angular [img]="icons.sprout" class="size-4" />
              {{ t()("plans.new") }}
            </ui-button>
          }
        </ui-page-header>

        <div class="surface mb-3 p-3">
          <div class="flex flex-wrap items-center gap-2">
            <ui-chip-rail [attr.aria-label]="t()('plans.filter.all')">
              <button
                type="button"
                class="chip-filter"
                [class.chip-filter-active]="status() === 'tous'"
                (click)="status.set('tous')"
              >
                {{ t()("plans.filter.all") }}
                <span class="chip-filter-count">{{ nf.format(mine().length) }}</span>
              </button>
              @for (s of planStatuses; track s) {
                <button
                  type="button"
                  class="chip-filter"
                  [class.chip-filter-active]="status() === s"
                  (click)="status.set(status() === s ? 'tous' : s)"
                >
                  {{ t()(FILTER_LABEL[s]) }}
                  <span class="chip-filter-count">{{ nf.format(mine().filter((p) => p.status === s).length) }}</span>
                </button>
              }
            </ui-chip-rail>
            <div class="relative ml-auto w-full sm:w-64">
              <lucide-angular
                [img]="icons.search"
                class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                class="flex h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm"
                [attr.aria-label]="t()('plans.search.aria')"
                [placeholder]="t()('plans.search.placeholder')"
                [ngModel]="q()"
                (ngModelChange)="q.set($event)"
              />
            </div>
          </div>
        </div>

        <div class="surface overflow-x-auto">
          @if (shown().length) {
            <table class="w-full text-sm">
              <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th class="px-4 py-3 font-semibold">{{ t()("plans.col.producer") }}</th>
                  <th class="font-semibold">{{ t()("plans.col.campaign") }}</th>
                  <th class="font-semibold">{{ t()("plans.col.status") }}</th>
                  <th class="hidden font-semibold sm:table-cell">{{ t()("plans.col.crops") }}</th>
                  <th class="hidden text-right font-semibold md:table-cell">{{ t()("plans.col.area") }}</th>
                  @if (multiScoop()) {
                    <th class="hidden font-semibold lg:table-cell">{{ t()("plans.col.scoop") }}</th>
                  }
                  <th class="hidden font-semibold lg:table-cell">{{ t()("plans.col.updated") }}</th>
                  <th class="w-12 pr-4"></th>
                </tr>
              </thead>
              <tbody class="divide-y">
                @for (p of shown(); track p.id) {
                  <tr
                    class="cursor-pointer hover:bg-muted/60"
                    tabindex="0"
                    (click)="openPlan(p.id)"
                    (keydown.enter)="openPlan(p.id)"
                  >
                    <td class="px-4 py-2.5 font-semibold">
                      {{ producerName(p.producerId) }}
                    </td>
                    <td>{{ p.campaign }}</td>
                    <td>
                      <ui-pill [tone]="PLAN_TONE[p.status]">{{ t()(PLAN_STATUS_LABEL[p.status]) }}</ui-pill>
                    </td>
                    <td class="hidden sm:table-cell">
                      {{ planCrops(p.lines).join(", ") || t()("plans.cropsNone") }}
                    </td>
                    <td class="hidden text-right md:table-cell">{{ nf.format(planArea(p.lines)) }} ha</td>
                    @if (multiScoop()) {
                      <td class="hidden lg:table-cell">{{ scoopCommune(p.scoopId) }}</td>
                    }
                    <td class="hidden whitespace-nowrap text-muted-foreground lg:table-cell">{{ fmtDate(p.updatedAt) }}</td>
                    <td class="pr-4 text-right" (click)="$event.stopPropagation()">
                      <a
                        [routerLink]="['/plans', p.id]"
                        class="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted"
                        [attr.aria-label]="t()('plans.row.open')"
                      >
                        <lucide-angular [img]="icons.link" class="size-4" />
                      </a>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          } @else {
            <ui-empty>
              <lucide-angular [img]="icons.sprout" class="mx-auto mb-2 size-8 text-muted-foreground" />
              <p class="font-semibold">{{ t()("plans.empty.title") }}</p>
              <p class="mt-1 text-sm">
                {{
                  mine().length
                    ? t()("plans.empty.filtered")
                    : store.can("plan.write")
                      ? t()("plans.empty.create")
                      : t()("plans.empty.readonly")
                }}
              </p>
            </ui-empty>
          }
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          {{ t()("plans.count", { shown: nf.format(shown().length), total: nf.format(mine().length) }) }}
        </p>

        <app-new-plan-dialog [(open)]="newOpen" />
      </app-shell>
    </app-extra-module-gate>
  `,
})
export default class PlansPage {
  private readonly router = inject(Router);
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly fmtDate = fmtDate;
  protected readonly icons = { search: Search, sprout: Sprout, link: ExternalLink };
  protected readonly planStatuses = PLAN_STATUSES;
  protected readonly FILTER_LABEL = FILTER_LABEL;
  protected readonly PLAN_TONE = PLAN_TONE;
  protected readonly PLAN_STATUS_LABEL = PLAN_STATUS_LABEL;
  protected readonly planCrops = planCrops;
  protected readonly planArea = planArea;

  protected readonly status = signal<PlanStatus | "tous">("tous");
  protected readonly q = signal("");
  protected readonly newOpen = signal(false);

  protected readonly mine = computed(() => scopedPlans(this.store.state().plans, this.store.state().session));

  protected readonly multiScoop = computed(() => new Set(this.mine().map((p) => p.scoopId)).size > 1);

  protected readonly shown = computed(() => {
    const byId = new Map(this.store.state().producers.map((p) => [p.id, p]));
    const needle = this.q().trim().toLowerCase();
    const st = this.status();
    return this.mine()
      .filter(
        (p) =>
          (st === "tous" || p.status === st) &&
          (!needle ||
            `${fullName(byId.get(p.producerId ?? ""), this.t()("plans.producerFallback"))} ${planCrops(p.lines).join(" ")}`
              .toLowerCase()
              .includes(needle)),
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  });

  producerName(id: string | null): string {
    const p = this.store.state().producers.find((x) => x.id === id);
    return fullName(p, this.t()("plans.producerFallback"));
  }

  scoopCommune(id: string): string {
    return this.store.state().scoops.find((s) => s.id === id)?.commune ?? id;
  }

  openPlan(id: string): void {
    void this.router.navigate(["/plans", id]);
  }
}

import { Component, computed, effect, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { ArrowLeft, LucideAngularModule, Plus, Save, Sprout, Trash2 } from "lucide-angular";

import { fmtDateTime, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import type { ExploitationPlan, PlanLine } from "@/lib/mock/cooperative";
import {
  PLAN_NEXT,
  PLAN_STATUS_LABEL,
  PLAN_TONE,
  planArea,
  planCrops,
  validLines,
} from "@/lib/plans";
import { scopedPlans } from "@/lib/scope";
import { AppShellComponent } from "../shared/app-shell.component";
import { ExtraModuleGateComponent } from "../shared/extra-module-gate.component";
import { FollowPlanTabComponent } from "../shared/follow-plan-tab.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

const NO_PLOT = "none";

@Component({
  selector: "app-plan-detail-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    ExtraModuleGateComponent,
    AppShellComponent,
    FollowPlanTabComponent,
    UiButtonComponent,
    UiEmptyComponent,
    UiPageHeaderComponent,
    UiPillComponent,
  ],
  template: `
    <app-extra-module-gate>
      <app-shell perm="plan.read" [area]="t()('plans.detail.area')">
        @if (feedback()) {
          <p class="mb-3 text-sm text-muted-foreground">{{ feedback() }}</p>
        }
        @if (!plan()) {
          <ui-empty>
            <lucide-angular [img]="icons.sprout" class="mx-auto mb-2 size-8 text-muted-foreground" />
            <p class="font-semibold">{{ t()("plans.detail.notFound.title") }}</p>
            <p class="mt-1 text-sm">{{ t()("plans.detail.notFound.text") }}</p>
          </ui-empty>
        } @else if (plan(); as pl) {
          <a routerLink="/plans" class="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <lucide-angular [img]="icons.back" class="size-4" />
            {{ t()("plans.detail.back") }}
          </a>

          <ui-page-header
            [eyebrow]="t()('plans.detail.eyebrow', { campaign: pl.campaign })"
            [title]="headerTitle(pl)"
            [description]="
              t()('plans.detail.description', {
                scoop: scoopName(pl.scoopId),
                by: pl.createdBy,
              })
            "
          >
            <ui-pill actions [tone]="PLAN_TONE[pl.status]">{{ t()(PLAN_STATUS_LABEL[pl.status]) }}</ui-pill>
          </ui-page-header>

          @if (store.can('operation.read')) {
            <div class="mb-4 flex gap-2" role="tablist" [attr.aria-label]="t()('suivi.plan.tabsAria')">
              <button
                type="button"
                class="rounded-md border px-3 py-1.5 text-sm"
                [class.bg-primary]="tab() === 'plan'"
                [class.text-primary-foreground]="tab() === 'plan'"
                (click)="tab.set('plan')"
              >
                {{ t()("suivi.plan.tabPlan") }}
              </button>
              <button
                type="button"
                class="rounded-md border px-3 py-1.5 text-sm"
                [class.bg-primary]="tab() === 'suivi'"
                [class.text-primary-foreground]="tab() === 'suivi'"
                (click)="tab.set('suivi')"
              >
                {{ t()("suivi.plan.tabSuivi") }}
              </button>
            </div>
          }

          @if (tab() === 'suivi' && store.can('operation.read')) {
            <app-follow-plan-tab [plan]="pl" (openPlanTab)="tab.set('plan')" />
          } @else {
            <div class="mb-4 grid gap-3 sm:grid-cols-3">
              <div class="surface p-3">
                <div class="text-xs text-muted-foreground">{{ t()("plans.detail.kpi.crops") }}</div>
                <div class="text-xl font-semibold">{{ nf.format(planCrops(lines()).length) }}</div>
              </div>
              <div class="surface p-3">
                <div class="text-xs text-muted-foreground">{{ t()("plans.detail.kpi.area") }}</div>
                <div class="text-xl font-semibold">{{ nf.format(planArea(lines())) }} ha</div>
              </div>
              <div class="surface p-3">
                <div class="text-xs text-muted-foreground">{{ t()("plans.detail.kpi.plots") }}</div>
                <div class="text-xl font-semibold">{{ nf.format(lines().filter((l) => l.plotId).length) }}</div>
              </div>
            </div>

            @if (producer(); as pr) {
              <p class="mb-4 text-sm">
                <a [routerLink]="['/producteurs', pr.id]" class="font-medium text-primary hover:underline">
                  {{ t()("plans.detail.viewProducer", { name: pr.firstName + ' ' + pr.lastName }) }}
                </a>
              </p>
            }

            <section class="surface mb-4 p-4" aria-labelledby="lignes">
              <h2 id="lignes" class="mb-3 font-semibold">{{ t()("plans.detail.lines.title") }}</h2>
              @if (!lines().length) {
                <p class="mb-3 text-sm text-muted-foreground">
                  {{ store.can("plan.write") ? t()("plans.detail.lines.emptyWrite") : t()("plans.detail.lines.emptyRead") }}
                </p>
              }
              <div class="grid gap-3">
                @for (l of lines(); track $index; let i = $index) {
                  <div class="grid gap-3 rounded-md border p-3 sm:grid-cols-[2fr_1fr_1fr_2fr_auto]">
                    <div>
                      <label class="text-xs font-medium">{{ t()("plans.detail.field.crop") }}</label>
                      <select
                        class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                        [disabled]="!store.can('plan.write')"
                        [ngModel]="l.crop"
                        (ngModelChange)="setLine(i, { crop: $event })"
                      >
                        <option value="">{{ t()("plans.detail.field.choose") }}</option>
                        @for (r of cropRefs(); track r.name) {
                          <option [value]="r.name">{{ r.name }}</option>
                        }
                      </select>
                    </div>
                    <div>
                      <label class="text-xs font-medium">{{ t()("plans.detail.field.area") }}</label>
                      <input
                        type="number"
                        class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                        [disabled]="!store.can('plan.write')"
                        [ngModel]="l.areaHa || ''"
                        (ngModelChange)="setLine(i, { areaHa: +$event })"
                      />
                    </div>
                    <div>
                      <label class="text-xs font-medium">{{ t()("plans.detail.field.sowing") }}</label>
                      <input
                        type="month"
                        class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                        [disabled]="!store.can('plan.write')"
                        [ngModel]="l.sowingMonth ?? ''"
                        (ngModelChange)="setLine(i, { sowingMonth: $event || null })"
                      />
                    </div>
                    <div>
                      <label class="text-xs font-medium">{{ t()("plans.detail.field.plot") }}</label>
                      <select
                        class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                        [disabled]="!store.can('plan.write')"
                        [ngModel]="l.plotId ?? NO_PLOT"
                        (ngModelChange)="setLine(i, { plotId: $event === NO_PLOT ? null : $event })"
                      >
                        <option [value]="NO_PLOT">{{ t()("plans.detail.field.noPlot") }}</option>
                        @for (p of plots(); track p.id) {
                          <option [value]="p.id">{{ p.code }}</option>
                        }
                      </select>
                    </div>
                    @if (store.can("plan.write")) {
                      <button
                        type="button"
                        class="self-end rounded-md p-2 hover:bg-muted"
                        [attr.aria-label]="t()('plans.detail.removeLine', { n: i + 1 })"
                        (click)="removeLine(i)"
                      >
                        <lucide-angular [img]="icons.trash" class="size-4" />
                      </button>
                    }
                  </div>
                }
              </div>
              @if (store.can("plan.write")) {
                <ui-button type="button" variant="outline" class="mt-3" (click)="addLine()">
                  <lucide-angular [img]="icons.plus" class="size-4" />
                  {{ t()("plans.detail.addLine") }}
                </ui-button>
              }
            </section>

            <section class="surface mb-4 p-4">
              <label class="text-sm font-medium">{{ t()("plans.detail.notes") }}</label>
              <textarea
                class="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                rows="3"
                [disabled]="!store.can('plan.write')"
                [ngModel]="notes()"
                (ngModelChange)="notes.set($event)"
              ></textarea>
            </section>

            @if (store.can("plan.write")) {
              <div class="mb-6 flex flex-wrap gap-2">
                <ui-button type="button" [disabled]="!dirty()" (click)="save()">
                  <lucide-angular [img]="icons.save" class="size-4" />
                  {{ t()("plans.detail.save") }}
                </ui-button>
                @if (nextStatus(); as next) {
                  <ui-button type="button" variant="outline" [disabled]="dirty()" (click)="advance(next.to)">
                    {{ t()(next.label) }}
                  </ui-button>
                }
                @if (dirty()) {
                  <span class="self-center text-sm text-muted-foreground">{{ t()("plans.detail.dirtyHint") }}</span>
                }
              </div>
            }

            <section class="surface p-4" aria-labelledby="hist">
              <h2 id="hist" class="mb-3 font-semibold">{{ t()("plans.detail.history") }}</h2>
              <ol class="grid gap-1.5 text-sm">
                @for (h of pl.history.slice().reverse(); track h.at + h.action) {
                  <li class="flex flex-wrap gap-x-2">
                    <span class="text-muted-foreground">{{ fmtDateTime(h.at) }}</span>
                    <span class="font-medium">{{ h.by }}</span>
                    <span>{{ h.action }}</span>
                  </li>
                }
              </ol>
            </section>
          }
        }
      </app-shell>
    </app-extra-module-gate>
  `,
})
export default class PlanDetailPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly icons = { back: ArrowLeft, plus: Plus, save: Save, trash: Trash2, sprout: Sprout };
  protected readonly NO_PLOT = NO_PLOT;
  protected readonly PLAN_TONE = PLAN_TONE;
  protected readonly PLAN_STATUS_LABEL = PLAN_STATUS_LABEL;
  protected readonly planArea = planArea;
  protected readonly planCrops = planCrops;

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "")), {
    initialValue: "",
  });

  private readonly onglet = toSignal(
    this.route.queryParamMap.pipe(map((q) => (q.get("onglet") === "suivi" ? "suivi" : "plan"))),
    { initialValue: "plan" },
  );

  protected readonly tab = signal<"plan" | "suivi">("plan");
  protected readonly lines = signal<PlanLine[]>([]);
  protected readonly notes = signal("");
  protected readonly feedback = signal("");

  protected readonly plan = computed(() => {
    const id = this.id();
    const all = this.store.state().plans;
    const p = all.find((x) => x.id === id);
    if (!p) return null;
    return scopedPlans([p], this.store.state().session).length === 1 ? p : null;
  });

  protected readonly producer = computed(() => {
    const pl = this.plan();
    if (!pl?.producerId) return null;
    return this.store.state().producers.find((p) => p.id === pl.producerId) ?? null;
  });

  protected readonly plots = computed(() => {
    const pl = this.plan();
    if (!pl?.producerId) return [];
    return this.store.state().plots.filter((p) => p.producerId === pl.producerId);
  });

  protected readonly cropRefs = computed(() => this.store.state().cropRefs);

  protected readonly dirty = computed(() => {
    const pl = this.plan();
    if (!pl) return false;
    return JSON.stringify(this.lines()) !== JSON.stringify(pl.lines) || this.notes() !== pl.notes;
  });

  protected readonly nextStatus = computed(() => {
    const pl = this.plan();
    return pl ? PLAN_NEXT[pl.status] : null;
  });

  constructor() {
    effect(() => {
      const pl = this.plan();
      if (pl) {
        this.lines.set(structuredClone(pl.lines));
        this.notes.set(pl.notes);
      }
    });
    effect(() => {
      this.tab.set(this.onglet());
    });
  }

  headerTitle(pl: ExploitationPlan): string {
    const pr = this.producer();
    return pr
      ? this.t()("plans.detail.title", { name: `${pr.firstName} ${pr.lastName}` })
      : this.t()("plans.detail.titleNoProducer");
  }

  scoopName(id: string): string {
    return this.store.state().scoops.find((s) => s.id === id)?.name ?? "";
  }

  setLine(i: number, patch: Partial<PlanLine>): void {
    this.lines.update((ls) => ls.map((l, k) => (k === i ? { ...l, ...patch } : l)));
  }

  removeLine(i: number): void {
    this.lines.update((ls) => ls.filter((_, k) => k !== i));
  }

  addLine(): void {
    this.lines.update((ls) => [...ls, { plotId: null, crop: "", areaHa: 0, sowingMonth: null }]);
  }

  private err(error: MessageKey | string): string {
    return this.locale.tNow(error as MessageKey);
  }

  save(): void {
    const pl = this.plan();
    if (!pl) return;
    if (!validLines(this.lines())) {
      this.feedback.set(this.t()("plans.detail.invalidLines"));
      return;
    }
    const res = this.store.actions.updatePlan(pl.id, { lines: this.lines(), notes: this.notes() });
    this.feedback.set(res.ok ? this.t()("plans.detail.saved") : this.err(res.error));
  }

  advance(status: ExploitationPlan["status"]): void {
    const pl = this.plan();
    if (!pl) return;
    const res = this.store.actions.setPlanStatus(pl.id, status);
    this.feedback.set(
      res.ok
        ? this.t()("plans.detail.statusChanged", { status: this.t()(PLAN_STATUS_LABEL[status]) })
        : this.err(res.error),
    );
  }
}

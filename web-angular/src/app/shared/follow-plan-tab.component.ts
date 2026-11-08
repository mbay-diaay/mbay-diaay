import { Component, computed, inject, input, output, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LucideAngularModule, CheckCircle2, Plus, Sprout, Trash2 } from "lucide-angular";

import {
  lineSchedule,
  planProgress,
  sowingDay,
  validatedCalendar,
  daysBetween,
} from "@/lib/agronomy";
import { fmtDate, nf } from "@/lib/format";
import type { ExploitationPlan } from "@/lib/mock/cooperative";
import type { FieldOperation } from "@/lib/mock/agronomy";
import { scopedOperations } from "@/lib/scope";
import {
  KIND_LABEL,
  STATE_LABEL,
  STATE_TONE,
  operationDue,
  operationLate,
  todayIso,
} from "./follow-kinds";
import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { OperationDoneDialogComponent, type OperationTarget } from "./operation-done-dialog.component";
import { UiButtonComponent } from "./ui/button.component";
import { UiEmptyComponent } from "./ui/empty.component";
import { UiPillComponent } from "./ui/pill.component";

const monthLabel = (month: string) =>
  new Date(`${month}-01T00:00:00Z`).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

@Component({
  selector: "app-follow-plan-tab",
  imports: [
    RouterLink,
    LucideAngularModule,
    OperationDoneDialogComponent,
    UiButtonComponent,
    UiEmptyComponent,
    UiPillComponent,
  ],
  template: `
    @if (!plan().lines.length) {
      <ui-empty>
        <lucide-angular [img]="icons.sprout" class="mx-auto mb-2 size-8 text-muted-foreground" />
        <p class="font-semibold">{{ t()("suivi.plan.noLines.title") }}</p>
        <p class="mt-1 text-sm">{{ t()("suivi.plan.noLines.text") }}</p>
      </ui-empty>
    } @else {
      @if (progress().total > 0) {
        <section class="surface mb-4 p-4" aria-labelledby="suivi-avancement">
          <h2 id="suivi-avancement" class="mb-3 font-semibold">{{ t()("suivi.plan.title") }}</h2>
          <div class="h-2 overflow-hidden rounded-full bg-muted">
            <div class="h-full rounded-full bg-primary" [style.width.%]="pct()"></div>
          </div>
          <p class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <span class="font-medium">
              {{ t()("suivi.plan.progressDone", { done: nf.format(progress().done), total: nf.format(progress().total) }) }}
            </span>
            @if (progress().late > 0) {
              <span class="font-medium text-danger-fg">
                {{ t()("suivi.plan.progressLate", { late: nf.format(progress().late) }) }}
              </span>
            }
          </p>
        </section>
      }

      @for (block of lines(); track block.index) {
        <section class="surface mb-4 p-4" [attr.aria-labelledby]="'suivi-ligne-' + block.index">
          <h3 [id]="'suivi-ligne-' + block.index" class="font-semibold">{{ block.line.crop || "…" }}</h3>
          <p class="mb-3 text-sm text-muted-foreground">{{ lineMeta(block) }}</p>
          @if (!block.line.crop.trim()) {
            <p class="rounded-md bg-muted p-3 text-sm">{{ t()("suivi.plan.noCrop") }}</p>
          } @else if (!block.hasSowing) {
            <div class="rounded-md bg-muted p-3 text-sm">
              <p>{{ t()("suivi.plan.noSowing") }}</p>
              @if (store.can("plan.write")) {
                <ui-button type="button" variant="outline" class="mt-2" (click)="openPlanTab.emit()">
                  {{ t()("suivi.plan.goPlan") }}
                </ui-button>
              }
            </div>
          } @else if (!block.hasCalendar) {
            <div class="rounded-md bg-muted p-3 text-sm">
              <p>{{ t()("suivi.plan.noCalendar", { crop: block.line.crop }) }}</p>
              <a routerLink="/calendriers" class="mt-1 inline-block font-medium text-primary hover:underline">
                {{ t()("suivi.plan.calendarLink") }}
              </a>
            </div>
          }

          @if (block.rows.length) {
            <ol class="mt-3 grid gap-2" [attr.aria-label]="t()('suivi.plan.opsAria', { crop: block.line.crop })">
              @for (r of block.rows; track $index) {
                <li class="rounded-md border p-3">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="font-semibold">{{ t()(KIND_LABEL[r.kind]) }}</span>
                    <ui-pill [tone]="STATE_TONE[r.state]">{{ t()(STATE_LABEL[r.state]) }}</ui-pill>
                    @if (r.stepId === null) {
                      <span class="text-xs text-muted-foreground">{{ t()("suivi.offCalendar") }}</span>
                    }
                  </div>
                  <div class="mt-1.5 grid gap-0.5 text-sm">
                    @if (dueText(r); as due) {
                      <p class="text-muted-foreground">{{ due }}</p>
                    }
                    @if (lateText(r); as late) {
                      <p class="font-medium text-danger-fg">{{ late }}</p>
                    }
                    @if (r.done; as done) {
                      <p>
                        {{ t()("suivi.done.onBy", { date: fmtDate(done.doneAt), by: done.by }) }}
                        @if (gapText(r); as gap) {
                          <span class="text-muted-foreground"> · {{ gap }}</span>
                        }
                      </p>
                      @if (done.note) {
                        <p>{{ t()("suivi.note", { note: done.note }) }}</p>
                      }
                    }
                  </div>
                  @if (store.can("operation.write")) {
                    <div class="mt-2 flex flex-wrap gap-2">
                      @if (!r.done && r.stepId) {
                        <ui-button type="button" (click)="openMark(block.index, block.line.crop, r)">
                          <lucide-angular [img]="icons.check" class="size-4" />
                          {{ t()("suivi.markDone") }}
                        </ui-button>
                      }
                      @if (r.done) {
                        <ui-button type="button" variant="outline" (click)="removeOp(r.done)">
                          <lucide-angular [img]="icons.trash" class="size-4" />
                          {{ t()("suivi.remove") }}
                        </ui-button>
                      }
                    </div>
                  }
                </li>
              }
            </ol>
          }

          @if (store.can("operation.write") && block.line.crop.trim()) {
            <ui-button type="button" variant="outline" class="mt-3" (click)="openExtra(block.index, block.line.crop)">
              <lucide-angular [img]="icons.plus" class="size-4" />
              {{ t()("suivi.plan.add") }}
            </ui-button>
          }
        </section>
      }

      <app-operation-done-dialog [(open)]="doneOpen" [target]="target()" />
    }
  `,
})
export class FollowPlanTabComponent {
  readonly plan = input.required<ExploitationPlan>();
  readonly openPlanTab = output<void>();

  protected readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly fmtDate = fmtDate;
  protected readonly KIND_LABEL = KIND_LABEL;
  protected readonly STATE_LABEL = STATE_LABEL;
  protected readonly STATE_TONE = STATE_TONE;
  protected readonly icons = { sprout: Sprout, check: CheckCircle2, plus: Plus, trash: Trash2 };

  protected readonly today = todayIso();
  protected readonly doneOpen = signal(false);
  protected readonly target = signal<OperationTarget | null>(null);

  private readonly ops = computed(() =>
    scopedOperations(this.store.state().operations, this.store.state().session),
  );

  protected readonly progress = computed(() =>
    planProgress(this.plan(), this.store.state().calendars, this.ops(), this.today),
  );

  protected readonly pct = computed(() => {
    const p = this.progress();
    return p.total ? Math.round((p.done / p.total) * 100) : 0;
  });

  protected readonly lines = computed(() => {
    const plan = this.plan();
    const calendars = this.store.state().calendars;
    const ops = this.ops();
    return plan.lines.map((line, index) => ({
      line,
      index,
      rows: lineSchedule(plan, index, line, calendars, ops, this.today),
      hasCalendar: !!validatedCalendar(calendars, line.crop),
      hasSowing: !!sowingDay(line),
    }));
  });

  lineMeta(block: { line: ExploitationPlan["lines"][0]; index: number }): string {
    const line = block.line;
    const plot = this.store.state().plots.find((p) => p.id === line.plotId);
    return [
      this.t()("suivi.plan.lineMeta", { area: nf.format(line.areaHa) }),
      plot ? this.t()("suivi.plan.linePlot", { code: plot.code }) : this.t()("suivi.plan.lineNoPlot"),
      line.sowingMonth
        ? this.t()("suivi.plan.lineSowing", { month: monthLabel(line.sowingMonth) })
        : null,
    ]
      .filter(Boolean)
      .join(" · ");
  }

  dueText(r: Parameters<typeof operationDue>[1]): string | null {
    return operationDue((k, p) => this.t()(k, p), r);
  }

  lateText(r: Parameters<typeof operationLate>[1]): string | null {
    return operationLate((k, p) => this.t()(k, p), r, this.today);
  }

  gapText(r: { dueFrom: string | null; dueTo: string | null; done: FieldOperation | null }): string | null {
    if (!r.done || !r.dueFrom || !r.dueTo) return null;
    const day = r.done.doneAt;
    if (day < r.dueFrom)
      return this.t()("suivi.gap.before.autre", { count: daysBetween(day, r.dueFrom) });
    if (day > r.dueTo) return this.t()("suivi.gap.after.autre", { count: daysBetween(r.dueTo, day) });
    return this.t()("suivi.gap.onTime");
  }

  openMark(lineIndex: number, crop: string, r: { stepId: string | null; kind: OperationTarget["kind"] }): void {
    this.target.set({
      planId: this.plan().id,
      lineIndex,
      crop,
      stepId: r.stepId,
      kind: r.kind,
    });
    this.doneOpen.set(true);
  }

  openExtra(lineIndex: number, crop: string): void {
    this.target.set({
      planId: this.plan().id,
      lineIndex,
      crop,
      stepId: null,
      kind: null,
    });
    this.doneOpen.set(true);
  }

  removeOp(op: FieldOperation): void {
    this.store.actions.removeOperation(op.id);
  }
}

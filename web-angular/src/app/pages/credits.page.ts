import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  Download,
  HandCoins,
  Landmark,
  LucideAngularModule,
  Plus,
  Search,
} from "lucide-angular";

import {
  creditBalance,
  creditIssues,
  creditState,
  creditTotals,
  nextInstallment,
  overdueAmount,
  paidTotal,
  totalDue,
} from "@/lib/commerce";
import { downloadCsv, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import type { Credit, CreditState } from "@/lib/mock/commerce";
import { PAYMENT_METHODS, type PaymentMethod } from "@/lib/mock/cooperative";
import { inScope, scopedCredits, scopedRepayments } from "@/lib/scope";
import {
  CREDIT_STATE_LABEL,
  CREDIT_STATE_TONE,
  PAYMENT_METHOD_LABEL,
  toFormNumber,
} from "../shared/commerce-labels";
import { AppShellComponent } from "../shared/app-shell.component";
import { ExtraModuleGateComponent } from "../shared/extra-module-gate.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiDialogComponent } from "../shared/ui/dialog.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiKpiTileComponent } from "../shared/ui/kpi-tile.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";
import { UiSheetComponent } from "../shared/ui/sheet.component";

const ALL = "tous" as const;

const FILTERS: {
  state: CreditState;
  label: MessageKey;
  tone: "danger" | "info" | "success";
}[] = [
  { state: "en retard", label: "credits.filter.late", tone: "danger" },
  { state: "en cours", label: "credits.filter.ongoing", tone: "info" },
  { state: "soldé", label: "credits.filter.settled", tone: "success" },
];

interface CreditRow {
  credit: Credit;
  name: string;
  scoopName: string;
  paid: number;
  balance: number;
  overdue: number;
  state: CreditState;
  next: ReturnType<typeof nextInstallment>;
}

function inOneMonth(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(d, last))).toISOString().slice(0, 10);
}

@Component({
  selector: "app-credits-page",
  imports: [
    FormsModule,
    LucideAngularModule,
    ExtraModuleGateComponent,
    AppShellComponent,
    UiButtonComponent,
    UiChipRailComponent,
    UiDialogComponent,
    UiEmptyComponent,
    UiKpiTileComponent,
    UiPageHeaderComponent,
    UiPillComponent,
    UiSheetComponent,
  ],
  template: `
    <app-extra-module-gate>
      <app-shell perm="credit.read" [area]="t()('credits.area')">
        <ui-page-header
          [eyebrow]="t()('credits.eyebrow')"
          [title]="t()('credits.title')"
          [description]="t()('credits.description')"
        >
          <ui-button actions variant="outline" [disabled]="!shown().length" (click)="exportCsv()">
            <lucide-angular [img]="icons.download" class="size-4" />
            {{ t()("credits.export") }}
          </ui-button>
          @if (canManage()) {
            <ui-button actions (click)="openGrant()">
              <lucide-angular [img]="icons.plus" class="size-4" />
              {{ t()("credits.grant") }}
            </ui-button>
          }
        </ui-page-header>

        <div class="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <ui-kpi-tile
            [label]="t()('credits.kpi.granted')"
            [value]="money(totals().granted)"
            [sub]="t()('credits.kpi.grantedSub.autre', { count: credits().length })"
          />
          <ui-kpi-tile
            [label]="t()('credits.kpi.repaid')"
            [value]="money(totals().repaid)"
            [sub]="t()('credits.kpi.repaidSub')"
          />
          <ui-kpi-tile
            [label]="t()('credits.kpi.outstanding')"
            [value]="money(totals().outstanding)"
            [sub]="t()('credits.kpi.outstandingSub')"
          />
          <ui-kpi-tile
            [label]="t()('credits.kpi.overdue')"
            [value]="money(totals().overdue)"
            [tone]="totals().lateCount ? 'danger' : 'neutral'"
            [sub]="
              totals().lateCount === 0
                ? t()('credits.kpi.overdueSub.zero')
                : t()('credits.kpi.overdueSub.autre', { count: totals().lateCount })
            "
          />
        </div>

        @if (!rows().length) {
          <div class="surface">
            <ui-empty>
              @if (canManage()) {
                <ui-button (click)="openGrant()">
                  <lucide-angular [img]="icons.plus" class="size-4" />
                  {{ t()("credits.grant") }}
                </ui-button>
              }
              <p>
                {{
                  canManage() ? t()("credits.empty.none.text") : t()("credits.empty.none.readOnly")
                }}
              </p>
            </ui-empty>
          </div>
        } @else {
          <div class="surface mb-3 p-3">
            <div class="flex flex-wrap items-center gap-2">
              <ui-chip-rail class="min-w-0 flex-1">
                <button
                  type="button"
                  class="chip-filter chip-filter-sm"
                  [class.chip-filter-active]="stateFilter() === ALL"
                  (click)="stateFilter.set(ALL)"
                >
                  {{ t()("credits.filter.all") }}
                  <span class="chip-filter-count">{{ nf.format(searched().length) }}</span>
                </button>
                @for (f of filters; track f.state) {
                  <button
                    type="button"
                    class="chip-filter chip-filter-sm"
                    [class.chip-filter-active]="stateFilter() === f.state"
                    (click)="stateFilter.set(stateFilter() === f.state ? ALL : f.state)"
                  >
                    {{ t()(f.label) }}
                    <span class="chip-filter-count">{{ nf.format(countOf(f.state)) }}</span>
                  </button>
                }
              </ui-chip-rail>
              <div class="relative ml-auto w-full sm:w-64">
                <lucide-angular
                  [img]="icons.search"
                  class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  class="flex h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  [attr.aria-label]="t()('credits.search.aria')"
                  [placeholder]="t()('credits.search.placeholder')"
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
                    <th class="px-4 py-3 font-semibold">
                      {{ t()("credits.col.member") }} / {{ t()("credits.col.purpose") }}
                    </th>
                    <th class="hidden px-2 text-right font-semibold md:table-cell">
                      {{ t()("credits.col.amount") }}
                    </th>
                    <th class="hidden px-2 text-right font-semibold md:table-cell">
                      {{ t()("credits.col.balance") }}
                    </th>
                    <th class="px-2 font-semibold">{{ t()("credits.col.state") }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  @for (r of shown(); track r.credit.id) {
                    <tr
                      tabindex="0"
                      class="cursor-pointer hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
                      (click)="openDetail(r.credit.id)"
                      (keydown.enter)="openDetail(r.credit.id)"
                    >
                      <td class="px-4 py-3">
                        <div class="font-semibold">{{ r.name }}</div>
                        <div class="text-xs text-muted-foreground">{{ r.credit.purpose }}</div>
                        @if (manyScoops()) {
                          <div class="text-xs text-muted-foreground">{{ r.scoopName }}</div>
                        }
                      </td>
                      <td class="hidden whitespace-nowrap px-2 text-right tabular md:table-cell">
                        {{ money(r.credit.amount) }}
                      </td>
                      <td
                        class="hidden whitespace-nowrap px-2 text-right font-semibold tabular md:table-cell"
                        [class.text-danger-fg]="r.overdue > 0"
                      >
                        {{ money(r.balance) }}
                      </td>
                      <td class="px-2">
                        <ui-pill [tone]="creditStateTone[r.state]">
                          {{
                            r.state === "en retard"
                              ? t()("credits.state.lateAmount", { amount: nf.format(r.overdue) })
                              : t()(creditStateLabel[r.state])
                          }}
                        </ui-pill>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            } @else {
              <ui-empty>
                <ui-button variant="outline" (click)="resetFilters()">{{
                  t()("credits.empty.reset")
                }}</ui-button>
                <p>{{ t()("credits.empty.filtered.text") }}</p>
              </ui-empty>
            }
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            {{
              t()("credits.count.autre", {
                count: shown().length,
                shown: nf.format(shown().length),
                total: nf.format(rows().length),
              })
            }}
          </p>
        }

        <ui-sheet
          [(open)]="detailOpen"
          [title]="detailRow() ? detailRow()!.name : ''"
          (closed)="onDetailClosed()"
        >
          @if (detailRow(); as row) {
            <p class="text-sm text-muted-foreground">{{ row.credit.purpose }}</p>
            <div class="mt-3 grid gap-2 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">{{ t()("credits.col.amount") }}</span>
                <span class="font-medium tabular">{{ money(row.credit.amount) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">{{ t()("credits.col.repaid") }}</span>
                <span class="tabular">{{ money(row.paid) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">{{ t()("credits.col.balance") }}</span>
                <span class="font-semibold tabular">{{ money(row.balance) }}</span>
              </div>
            </div>
            @if (canManage() && row.balance > 0) {
              <ui-button class="mt-4" (click)="openRepay(row)">
                <lucide-angular [img]="icons.repay" class="size-4" />
                {{ t()("credits.row.repay") }}
              </ui-button>
            }
          }
        </ui-sheet>

        <ui-dialog [(open)]="grantOpen" [title]="t()('credits.grantDialog.title')">
          @if (grantOpen()) {
            <p class="text-sm text-muted-foreground">{{ t()("credits.grantDialog.description") }}</p>
            @if (formError()) {
              <p class="mt-2 text-sm text-destructive">{{ formError() }}</p>
            }
            <div class="mt-3 space-y-3">
              <label class="block text-sm">
                <span class="font-medium">{{ t()("credits.grantDialog.member") }}</span>
                <select
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="grMemberId()"
                  (ngModelChange)="grMemberId.set($event)"
                >
                  <option value="">{{ t()("credits.grantDialog.memberPlaceholder") }}</option>
                  @for (m of eligibleMembers(); track m.id) {
                    <option [value]="m.id">{{ m.label }}</option>
                  }
                </select>
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("credits.grantDialog.purpose") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="grPurpose()"
                  (ngModelChange)="grPurpose.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("credits.grantDialog.amount") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="grAmount()"
                  (ngModelChange)="grAmount.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("credits.grantDialog.rate") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="grRate()"
                  (ngModelChange)="grRate.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("credits.grantDialog.grantedAt") }}</span>
                <input
                  type="date"
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="grGrantedAt()"
                  (ngModelChange)="grGrantedAt.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("credits.grantDialog.count") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="grCount()"
                  (ngModelChange)="grCount.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("credits.grantDialog.firstDue") }}</span>
                <input
                  type="date"
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="grFirstDue()"
                  (ngModelChange)="grFirstDue.set($event)"
                />
              </label>
            </div>
            <ui-button actions (click)="submitGrant()">{{
              t()("credits.grantDialog.submit")
            }}</ui-button>
            <ui-button actions variant="outline" (click)="grantOpen.set(false)">{{
              t()("credits.cancel")
            }}</ui-button>
          }
        </ui-dialog>

        <ui-dialog [(open)]="repayOpen" [title]="t()('credits.repayDialog.title')">
          @if (repayRow(); as row) {
            <p class="text-sm text-muted-foreground">
              {{
                t()("credits.repayDialog.description", {
                  name: row.name,
                  balance: nf.format(row.balance),
                })
              }}
            </p>
            @if (formError()) {
              <p class="mt-2 text-sm text-destructive">{{ formError() }}</p>
            }
            <div class="mt-3 space-y-3">
              <label class="block text-sm">
                <span class="font-medium">{{ t()("credits.repayDialog.amount") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="rpAmount()"
                  (ngModelChange)="rpAmount.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("credits.repayDialog.method") }}</span>
                <select
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="rpMethod()"
                  (ngModelChange)="rpMethod.set($event)"
                >
                  @for (m of paymentMethods; track m) {
                    <option [value]="m">{{ t()(paymentMethodLabel[m]) }}</option>
                  }
                </select>
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("credits.repayDialog.date") }}</span>
                <input
                  type="date"
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="rpPaidAt()"
                  (ngModelChange)="rpPaidAt.set($event)"
                />
              </label>
            </div>
            <ui-button actions (click)="submitRepay()">{{
              t()("credits.repayDialog.submit")
            }}</ui-button>
            <ui-button actions variant="outline" (click)="repayOpen.set(false)">{{
              t()("credits.cancel")
            }}</ui-button>
          }
        </ui-dialog>
      </app-shell>
    </app-extra-module-gate>
  `,
})
export default class CreditsPage {
  protected readonly ALL = ALL;
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly icons = {
    download: Download,
    search: Search,
    plus: Plus,
    repay: HandCoins,
    landmark: Landmark,
  };
  protected readonly filters = FILTERS;
  protected readonly creditStateLabel = CREDIT_STATE_LABEL;
  protected readonly creditStateTone = CREDIT_STATE_TONE;
  protected readonly paymentMethodLabel = PAYMENT_METHOD_LABEL;
  protected readonly paymentMethods = PAYMENT_METHODS;

  protected readonly today = new Date().toISOString();
  protected readonly stateFilter = signal<CreditState | typeof ALL>(ALL);
  protected readonly q = signal("");
  protected readonly openId = signal<string | undefined>(undefined);
  protected readonly detailOpen = signal(false);

  protected readonly grantOpen = signal(false);
  protected readonly grMemberId = signal("");
  protected readonly grPurpose = signal("");
  protected readonly grAmount = signal("");
  protected readonly grRate = signal("0");
  protected readonly grGrantedAt = signal(this.today.slice(0, 10));
  protected readonly grCount = signal("3");
  protected readonly grFirstDue = signal(inOneMonth(this.today.slice(0, 10)));
  protected readonly formError = signal("");

  protected readonly repayOpen = signal(false);
  protected readonly repayRow = signal<CreditRow | null>(null);
  protected readonly rpAmount = signal("");
  protected readonly rpMethod = signal<PaymentMethod>("espèces");
  protected readonly rpPaidAt = signal(this.today.slice(0, 10));

  private readonly repayments = computed(() =>
    scopedRepayments(this.store.state().repayments, this.store.state().session),
  );

  protected readonly credits = computed(() =>
    scopedCredits(this.store.state().credits, this.store.state().session),
  );

  protected readonly scoops = computed(() => {
    const s = this.store.state();
    return inScope(
      s.scoops.map((sc) => ({ scoopId: sc.id, id: sc.id })),
      s.session,
    );
  });

  protected readonly manyScoops = computed(() => this.scoops().length > 1);

  protected readonly rows = computed((): CreditRow[] => {
    const members = this.store.state().members;
    const scoops = this.store.state().scoops;
    const reps = this.repayments();
    const now = this.today;
    return this.credits()
      .map((credit) => {
        const m = members.find((x) => x.id === credit.memberId);
        return {
          credit,
          name: m ? `${m.firstName} ${m.lastName}` : credit.memberId,
          scoopName: scoops.find((s) => s.id === credit.scoopId)?.name ?? "",
          paid: paidTotal(credit.id, reps),
          balance: creditBalance(credit, reps),
          overdue: overdueAmount(credit, reps, now),
          state: creditState(credit, reps, now),
          next: nextInstallment(credit, reps),
        };
      })
      .sort(
        (a, b) =>
          Number(b.state === "en retard") - Number(a.state === "en retard") ||
          b.credit.grantedAt.localeCompare(a.credit.grantedAt),
      );
  });

  protected readonly totals = computed(() =>
    creditTotals(this.credits(), this.repayments(), this.today),
  );

  protected readonly searched = computed(() => {
    const needle = this.q().trim().toLowerCase();
    return this.rows().filter(
      (r) =>
        !needle ||
        r.name.toLowerCase().includes(needle) ||
        r.credit.purpose.toLowerCase().includes(needle),
    );
  });

  protected readonly shown = computed(() => {
    const st = this.stateFilter();
    return this.searched().filter((r) => st === ALL || r.state === st);
  });

  protected readonly detailRow = computed(() => {
    const id = this.openId();
    return id ? this.rows().find((r) => r.credit.id === id) : undefined;
  });

  protected readonly eligibleMembers = computed(() => {
    const s = this.store.state();
    return s.members
      .filter((m) => m.status === "membre" && inScope([m], s.session).length)
      .map((m) => ({
        id: m.id,
        label: `${m.firstName} ${m.lastName} · ${this.scoopName(m.scoopId)}`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label, "fr"));
  });

  protected canManage(): boolean {
    return this.store.can("credit.manage");
  }

  protected money(amount: number): string {
    return `${this.locale.formatNumber(amount)} FCFA`;
  }

  protected scoopName(id: string): string {
    return this.store.state().scoops.find((s) => s.id === id)?.name ?? id;
  }

  protected countOf(state: CreditState): number {
    return this.searched().filter((r) => r.state === state).length;
  }

  protected openDetail(id: string): void {
    this.openId.set(id);
    this.detailOpen.set(true);
  }

  protected onDetailClosed(): void {
    this.openId.set(undefined);
    this.detailOpen.set(false);
  }

  protected resetFilters(): void {
    this.q.set("");
    this.stateFilter.set(ALL);
  }

  protected openGrant(): void {
    this.formError.set("");
    this.grMemberId.set("");
    this.grPurpose.set("");
    this.grAmount.set("");
    this.grRate.set("0");
    this.grGrantedAt.set(this.today.slice(0, 10));
    this.grCount.set("3");
    this.grFirstDue.set(inOneMonth(this.today.slice(0, 10)));
    this.grantOpen.set(true);
  }

  protected submitGrant(): void {
    if (!this.grMemberId()) {
      this.formError.set(this.t()("credits.grantDialog.memberRequired"));
      return;
    }
    const amount = toFormNumber(this.grAmount());
    const ratePct = this.grRate().trim() === "" ? 0 : toFormNumber(this.grRate());
    const count = Math.round(toFormNumber(this.grCount()));
    const issues = creditIssues(
      {
        amount,
        ratePct,
        count,
        firstDue: this.grFirstDue(),
        grantedAt: this.grGrantedAt(),
        everyMonths: 1,
        purpose: this.grPurpose(),
      },
      this.today,
    );
    if (issues.length) {
      this.formError.set(this.locale.tNow(issues[0] as MessageKey));
      return;
    }
    const res = this.store.actions.grantCredit({
      memberId: this.grMemberId(),
      amount,
      ratePct,
      purpose: this.grPurpose(),
      grantedAt: this.grGrantedAt(),
      count,
      firstDue: this.grFirstDue(),
      everyMonths: 1,
    });
    if (!res.ok) {
      this.formError.set(res.error ?? "");
      return;
    }
    this.grantOpen.set(false);
    this.formError.set("");
  }

  protected openRepay(row: CreditRow): void {
    this.formError.set("");
    this.repayRow.set(row);
    const suggested = row.next?.amount ?? row.balance;
    this.rpAmount.set(String(suggested));
    this.rpMethod.set("espèces");
    this.rpPaidAt.set(this.today.slice(0, 10));
    this.repayOpen.set(true);
  }

  protected submitRepay(): void {
    const row = this.repayRow();
    if (!row) return;
    const amount = Math.round(toFormNumber(this.rpAmount()));
    const res = this.store.actions.recordRepayment({
      creditId: row.credit.id,
      amount,
      paidAt: this.rpPaidAt(),
      method: this.rpMethod(),
    });
    if (!res.ok) {
      this.formError.set(res.error ?? "");
      return;
    }
    this.repayOpen.set(false);
    this.formError.set("");
  }

  protected exportCsv(): void {
    const head = [
      "Membre",
      "Objet",
      "Montant",
      "Total dû",
      "Remboursé",
      "Reste",
      "État",
      "Prochaine échéance",
    ];
    const body = this.shown().map((r) => [
      r.name,
      r.credit.purpose,
      String(r.credit.amount),
      String(totalDue(r.credit)),
      String(r.paid),
      String(r.balance),
      r.state,
      r.next ? `${r.next.dueDate} (${r.next.amount})` : "",
    ]);
    downloadCsv("credits.csv", [head, ...body]);
  }
}

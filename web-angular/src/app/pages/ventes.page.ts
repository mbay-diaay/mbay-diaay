import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  Ban,
  Download,
  HandCoins,
  LucideAngularModule,
  Plus,
  Search,
  ShoppingBasket,
} from "lucide-angular";

import { currentCampaign } from "@/lib/campaigns";
import { salePayment, salesByCrop, salesTotals, saleTotal } from "@/lib/commerce";
import { downloadCsv, nf } from "@/lib/format";
import type { Sale } from "@/lib/mock/commerce";
import { CROPS } from "@/lib/mock/data";
import { inScope, scopedSales } from "@/lib/scope";
import {
  SALE_PAYMENT_LABEL,
  SALE_PAYMENT_TONE,
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

type PayFilter = "all" | "due" | "paid" | `crop:${string}`;

interface SaleView {
  sale: Sale;
  producerName: string;
  producerCode: string;
  scoopName: string;
}

@Component({
  selector: "app-ventes-page",
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
      <app-shell perm="sales.read" [area]="t()('ventes.area')">
        <ui-page-header
          [eyebrow]="t()('ventes.eyebrow')"
          [title]="t()('ventes.title')"
          [description]="t()('ventes.description')"
        >
          <ui-button actions variant="outline" [disabled]="!shown().length" (click)="exportCsv()">
            <lucide-angular [img]="icons.download" class="size-4" />
            {{ t()("ventes.export") }}
          </ui-button>
          @if (canManage()) {
            <ui-button actions (click)="openRecord()">
              <lucide-angular [img]="icons.plus" class="size-4" />
              {{ t()("ventes.record") }}
            </ui-button>
          }
        </ui-page-header>

        <div class="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <label for="ventes-campaign" class="text-sm font-medium">{{ t()("ventes.campaign") }}</label>
          <select
            id="ventes-campaign"
            class="flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm sm:w-64"
            [ngModel]="campaign()"
            (ngModelChange)="campaignChoice.set($event)"
          >
            @for (c of store.state().campaigns; track c.id) {
              <option [value]="c.name">{{ c.name }}</option>
            }
          </select>
        </div>

        <div class="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          <ui-kpi-tile
            [label]="t()('ventes.kpi.revenue')"
            [value]="money(totals().revenue)"
            [sub]="t()('ventes.kpi.revenueSub')"
          />
          <ui-kpi-tile
            [label]="t()('ventes.kpi.collected')"
            [value]="money(totals().collected)"
            [sub]="t()('ventes.kpi.collectedSub')"
          />
          <ui-kpi-tile
            [label]="t()('ventes.kpi.receivable')"
            [value]="money(totals().receivable)"
            [tone]="totals().receivable > 0 ? 'warning' : 'neutral'"
            [sub]="
              totals().receivable > 0 ? t()('ventes.kpi.receivableSub') : t()('ventes.kpi.receivableNone')
            "
          />
          <ui-kpi-tile
            [label]="t()('ventes.kpi.quantity')"
            [value]="nf.format(totals().quantityKg) + ' ' + t()('ventes.unitKg')"
            [sub]="t()('ventes.kpi.quantitySub')"
          />
          <ui-kpi-tile
            class="col-span-2 lg:col-span-1"
            [label]="t()('ventes.kpi.count')"
            [value]="nf.format(totals().count)"
            [sub]="t()('ventes.kpi.countSub.autre', { count: totals().count })"
          />
        </div>

        <div class="surface mb-3 p-3">
          <div class="flex flex-wrap items-center gap-2">
            <ui-chip-rail class="min-w-0 flex-1">
              <button
                type="button"
                class="chip-filter chip-filter-sm"
                [class.chip-filter-active]="filter() === 'all'"
                (click)="filter.set('all')"
              >
                {{ t()("ventes.filter.all") }}
                <span class="chip-filter-count">{{ nf.format(searched().length) }}</span>
              </button>
              <button
                type="button"
                class="chip-filter chip-filter-sm"
                [class.chip-filter-active]="filter() === 'due'"
                (click)="filter.set(filter() === 'due' ? 'all' : 'due')"
              >
                {{ t()("ventes.filter.due") }}
                <span class="chip-filter-count">{{ nf.format(dueCount()) }}</span>
              </button>
              <button
                type="button"
                class="chip-filter chip-filter-sm"
                [class.chip-filter-active]="filter() === 'paid'"
                (click)="filter.set(filter() === 'paid' ? 'all' : 'paid')"
              >
                {{ t()("ventes.filter.paid") }}
                <span class="chip-filter-count">{{ nf.format(paidCount()) }}</span>
              </button>
              @for (c of cropNames(); track c) {
                <button
                  type="button"
                  class="chip-filter chip-filter-sm"
                  [class.chip-filter-active]="filter() === cropFilter(c)"
                  (click)="filter.set(filter() === cropFilter(c) ? 'all' : cropFilter(c))"
                >
                  {{ c }}
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
                [attr.aria-label]="t()('ventes.search.aria')"
                [placeholder]="t()('ventes.search.placeholder')"
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
                  <th class="hidden px-4 py-3 font-semibold md:table-cell">{{ t()("ventes.col.date") }}</th>
                  <th class="px-4 py-3 font-semibold md:px-2">{{ t()("ventes.col.producer") }}</th>
                  <th class="hidden font-semibold md:table-cell">{{ t()("ventes.col.crop") }}</th>
                  <th class="px-2 text-right font-semibold">{{ t()("ventes.col.total") }}</th>
                  <th class="hidden px-2 sm:table-cell">{{ t()("ventes.col.state") }}</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                @for (v of shown(); track v.sale.id) {
                  @let state = salePayment(v.sale);
                  @let voided = v.sale.voided !== null;
                  <tr
                    tabindex="0"
                    class="cursor-pointer hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
                    (click)="openDetail(v.sale.id)"
                    (keydown.enter)="openDetail(v.sale.id)"
                  >
                    <td
                      class="hidden whitespace-nowrap px-4 py-3 md:table-cell"
                      [class.text-muted-foreground]="voided"
                      [class.line-through]="voided"
                    >
                      {{ locale.formatDate(v.sale.soldAt) }}
                    </td>
                    <td class="px-4 py-3 md:px-2">
                      <div class="font-semibold" [class.line-through]="voided">{{ v.producerName }}</div>
                      <div class="text-xs text-muted-foreground">{{ v.producerCode }}</div>
                    </td>
                    <td class="hidden md:table-cell" [class.line-through]="voided">{{ v.sale.crop }}</td>
                    <td class="px-2 text-right font-semibold tabular" [class.line-through]="voided">
                      {{ money(saleTotal(v.sale)) }}
                    </td>
                    <td class="hidden px-2 sm:table-cell">
                      @if (voided) {
                        <ui-pill tone="neutral">{{ t()("ventes.state.voided") }}</ui-pill>
                      } @else {
                        <ui-pill [tone]="salePaymentTone[state]">{{ t()(salePaymentLabel[state]) }}</ui-pill>
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          } @else if (base().length) {
            <ui-empty>
              <ui-button variant="outline" (click)="resetFilters()">{{
                t()("ventes.empty.reset")
              }}</ui-button>
              <p>{{ t()("ventes.empty.filtered.text") }}</p>
            </ui-empty>
          } @else {
            <ui-empty>
              @if (canManage()) {
                <ui-button (click)="openRecord()">
                  <lucide-angular [img]="icons.plus" class="size-4" />
                  {{ t()("ventes.record") }}
                </ui-button>
              }
              <p>
                {{ canManage() ? t()("ventes.empty.none.text") : t()("ventes.empty.none.readOnly") }}
              </p>
            </ui-empty>
          }
        </div>

        <p class="mt-2 text-xs text-muted-foreground">
          {{
            t()("ventes.count.autre", {
              count: shown().length,
              shown: nf.format(shown().length),
              total: nf.format(base().length),
            })
          }}
        </p>

        <section class="surface mt-6 p-4" [attr.aria-labelledby]="'ventes-bycrop-title'">
          <h2 id="ventes-bycrop-title" class="font-semibold">{{ t()("ventes.byCrop.title") }}</h2>
          <p class="mt-0.5 text-sm text-muted-foreground">{{ t()("ventes.byCrop.description") }}</p>
          @if (byCrop().length) {
            <ul class="mt-4 space-y-4">
              @for (c of byCrop(); track c.crop) {
                <li>
                  <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <span class="font-medium">{{ c.crop }}</span>
                    <span class="text-sm tabular">
                      <span class="font-semibold">{{ money(c.revenue) }}</span>
                      <span class="text-muted-foreground">
                        · {{ t()("ventes.kg", { qty: nf.format(c.quantityKg) }) }}
                      </span>
                    </span>
                  </div>
                  <div class="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                    <div
                      class="h-full rounded-full bg-primary"
                      [style.width.%]="barWidth(c.revenue)"
                    ></div>
                  </div>
                </li>
              }
            </ul>
          } @else {
            <p class="mt-3 text-sm text-muted-foreground">{{ t()("ventes.byCrop.none") }}</p>
          }
        </section>

        <ui-sheet
          [(open)]="detailOpen"
          [title]="detailView() ? t()('ventes.sheet.title', { crop: detailView()!.sale.crop }) : ''"
          (closed)="onDetailClosed()"
        >
          @if (detailView(); as v) {
            <p class="text-sm font-medium">{{ v.producerName }} · {{ v.producerCode }}</p>
            <p class="mt-1 text-sm text-muted-foreground">{{ v.scoopName }}</p>
            <p class="mt-3 text-sm">
              {{ t()("ventes.sheet.total") }} :
              <span class="font-semibold tabular">{{ money(saleTotal(v.sale)) }}</span>
            </p>
            @if (canManage() && !v.sale.voided && salePayment(v.sale) !== "payé") {
              <ui-button class="mt-3" (click)="openPay(v)">
                <lucide-angular [img]="icons.pay" class="size-4" />
                {{ t()("ventes.row.pay") }}
              </ui-button>
            }
            @if (canManage() && !v.sale.voided) {
              <ui-button class="mt-2" variant="destructive" (click)="openVoid(v)">
                <lucide-angular [img]="icons.void" class="size-4" />
                {{ t()("ventes.row.void") }}
              </ui-button>
            }
          }
        </ui-sheet>

        <ui-dialog [(open)]="recordOpen" [title]="t()('ventes.form.title')">
          @if (recordOpen()) {
            <p class="text-sm text-muted-foreground">{{ t()("ventes.form.description") }}</p>
            @if (formError()) {
              <p class="mt-2 text-sm text-destructive">{{ formError() }}</p>
            }
            <div class="mt-3 space-y-3">
              <label class="block text-sm">
                <span class="font-medium">{{ t()("ventes.form.producer") }}</span>
                <select
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="recProducerId()"
                  (ngModelChange)="recProducerId.set($event)"
                >
                  <option value="">{{ t()("ventes.form.choose") }}</option>
                  @for (p of producers(); track p.id) {
                    <option [value]="p.id">{{ p.firstName }} {{ p.lastName }} ({{ p.code }})</option>
                  }
                </select>
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("ventes.form.crop") }}</span>
                <select
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="recCrop()"
                  (ngModelChange)="recCrop.set($event)"
                >
                  @for (c of crops; track c) {
                    <option [value]="c">{{ c }}</option>
                  }
                </select>
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("ventes.form.quantity") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="recQuantity()"
                  (ngModelChange)="recQuantity.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("ventes.form.price") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="recPrice()"
                  (ngModelChange)="recPrice.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("ventes.form.buyer") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="recBuyer()"
                  (ngModelChange)="recBuyer.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("ventes.form.date") }}</span>
                <input
                  type="date"
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="recSoldAt()"
                  (ngModelChange)="recSoldAt.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("ventes.form.paid") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="recPaid()"
                  (ngModelChange)="recPaid.set($event)"
                />
              </label>
            </div>
            <ui-button actions (click)="submitRecord()">{{ t()("ventes.form.submit") }}</ui-button>
            <ui-button actions variant="outline" (click)="recordOpen.set(false)">{{
              t()("common.cancel")
            }}</ui-button>
          }
        </ui-dialog>

        <ui-dialog [(open)]="payOpen" [title]="t()('ventes.pay.title')">
          @if (payView(); as v) {
            <p class="text-sm text-muted-foreground">
              {{
                t()("ventes.pay.description", {
                  name: v.producerName,
                  amount: nf.format(remaining(v.sale)),
                })
              }}
            </p>
            @if (formError()) {
              <p class="mt-2 text-sm text-destructive">{{ formError() }}</p>
            }
            <label class="mt-3 block text-sm">
              <span class="font-medium">{{ t()("ventes.pay.amount") }}</span>
              <input
                class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                [ngModel]="payAmount()"
                (ngModelChange)="payAmount.set($event)"
              />
            </label>
            <ui-button actions class="mt-4" (click)="submitPay()">{{ t()("ventes.pay.submit") }}</ui-button>
            <ui-button actions variant="outline" (click)="payOpen.set(false)">{{
              t()("common.cancel")
            }}</ui-button>
          }
        </ui-dialog>

        <ui-dialog [(open)]="voidOpen" [title]="t()('ventes.void.title')">
          @if (voidView(); as v) {
            <p class="text-sm text-muted-foreground">{{ t()("ventes.void.description") }}</p>
            @if (formError()) {
              <p class="mt-2 text-sm text-destructive">{{ formError() }}</p>
            }
            <label class="mt-3 block text-sm">
              <span class="font-medium">{{ t()("ventes.void.reason") }}</span>
              <input
                class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                [ngModel]="voidReason()"
                (ngModelChange)="voidReason.set($event)"
              />
            </label>
            <ui-button actions class="mt-4" variant="destructive" (click)="submitVoid()">{{
              t()("ventes.void.submit")
            }}</ui-button>
            <ui-button actions variant="outline" (click)="voidOpen.set(false)">{{
              t()("ventes.void.back")
            }}</ui-button>
          }
        </ui-dialog>
      </app-shell>
    </app-extra-module-gate>
  `,
})
export default class VentesPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly saleTotal = saleTotal;
  protected readonly salePayment = salePayment;
  protected readonly salePaymentLabel = SALE_PAYMENT_LABEL;
  protected readonly salePaymentTone = SALE_PAYMENT_TONE;
  protected readonly icons = {
    download: Download,
    search: Search,
    plus: Plus,
    pay: HandCoins,
    void: Ban,
    basket: ShoppingBasket,
  };
  protected readonly crops = CROPS;
  protected readonly today = new Date().toISOString().slice(0, 10);

  protected readonly campaignChoice = signal<string | undefined>(undefined);
  protected readonly filter = signal<PayFilter>("all");
  protected readonly q = signal("");
  protected readonly openId = signal<string | undefined>(undefined);
  protected readonly detailOpen = signal(false);

  protected readonly recordOpen = signal(false);
  protected readonly recProducerId = signal("");
  protected readonly recCrop = signal(CROPS[0] ?? "");
  protected readonly recQuantity = signal("");
  protected readonly recPrice = signal("");
  protected readonly recBuyer = signal("");
  protected readonly recSoldAt = signal(this.today);
  protected readonly recPaid = signal("");

  protected readonly payOpen = signal(false);
  protected readonly payView = signal<SaleView | null>(null);
  protected readonly payAmount = signal("");

  protected readonly voidOpen = signal(false);
  protected readonly voidView = signal<SaleView | null>(null);
  protected readonly voidReason = signal("");

  protected readonly formError = signal("");

  protected readonly campaign = computed(() => {
    const s = this.store.state();
    const choice = this.campaignChoice();
    if (choice) return choice;
    return currentCampaign(s.campaigns, this.today)?.name ?? s.campaigns.at(-1)?.name ?? "";
  });

  private readonly producerOf = computed(
    () => new Map(this.store.state().producers.map((p) => [p.id, p])),
  );

  protected readonly producers = computed(() => {
    const s = this.store.state();
    return inScope(s.producers.filter((p) => !p.mergedInto), s.session).sort((a, b) =>
      a.code.localeCompare(b.code, "fr"),
    );
  });

  protected readonly base = computed((): SaleView[] => {
    const s = this.store.state();
    const camp = this.campaign();
    return inScope(scopedSales(s.sales, s.session), s.session)
      .filter((sale) => sale.campaign === camp)
      .sort((a, b) => b.soldAt.localeCompare(a.soldAt) || b.id.localeCompare(a.id))
      .map((sale) => this.viewOf(sale));
  });

  protected readonly totals = computed(() => salesTotals(this.base().map((v) => v.sale)));
  protected readonly byCrop = computed(() => salesByCrop(this.base().map((v) => v.sale)));
  protected readonly maxRevenue = computed(() => this.byCrop()[0]?.revenue ?? 0);

  protected readonly searched = computed(() => {
    const needle = this.q().trim().toLowerCase();
    if (!needle) return this.base();
    return this.base().filter((v) => {
      const hay = `${v.producerName} ${v.producerCode} ${v.sale.buyer} ${v.sale.crop}`;
      return hay.toLowerCase().includes(needle);
    });
  });

  protected readonly cropNames = computed(() =>
    [...new Set(this.base().map((v) => v.sale.crop))].sort((a, b) => a.localeCompare(b, "fr")),
  );

  protected readonly dueCount = computed(
    () =>
      this.searched().filter((v) => v.sale.voided === null && salePayment(v.sale) !== "payé").length,
  );

  protected readonly paidCount = computed(
    () =>
      this.searched().filter((v) => v.sale.voided === null && salePayment(v.sale) === "payé").length,
  );

  protected readonly shown = computed(() => {
    const f = this.filter();
    return this.searched().filter((v) => {
      const live = v.sale.voided === null;
      if (f === "all") return true;
      if (f === "due") return live && salePayment(v.sale) !== "payé";
      if (f === "paid") return live && salePayment(v.sale) === "payé";
      return v.sale.crop === f.slice(5);
    });
  });

  protected readonly detailView = computed(() => {
    const id = this.openId();
    if (!id) return undefined;
    const sale = this.store.state().sales.find((s) => s.id === id);
    if (!sale || !inScope([sale], this.store.state().session).length) return undefined;
    return this.viewOf(sale);
  });

  protected canManage(): boolean {
    return this.store.can("sales.manage");
  }

  protected money(amount: number): string {
    return `${this.locale.formatNumber(amount)} FCFA`;
  }

  protected cropFilter(crop: string): PayFilter {
    return `crop:${crop}`;
  }

  protected barWidth(revenue: number): number {
    const max = this.maxRevenue();
    return max ? Math.max(2, (revenue / max) * 100) : 0;
  }

  protected remaining(sale: Sale): number {
    return Math.max(0, saleTotal(sale) - sale.paidAmount);
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
    this.filter.set("all");
  }

  protected openRecord(): void {
    this.formError.set("");
    const ps = this.producers();
    this.recProducerId.set(ps[0]?.id ?? "");
    this.recCrop.set(CROPS[0] ?? "");
    this.recQuantity.set("");
    this.recPrice.set("");
    this.recBuyer.set("");
    this.recSoldAt.set(this.today);
    this.recPaid.set("");
    this.recordOpen.set(true);
  }

  protected submitRecord(): void {
    if (!this.recProducerId()) {
      this.formError.set(this.t()("ventes.form.noProducer"));
      return;
    }
    const paid = this.recPaid().trim() === "" ? 0 : Math.round(toFormNumber(this.recPaid()));
    const res = this.store.actions.recordSale({
      producerId: this.recProducerId(),
      crop: this.recCrop(),
      quantityKg: toFormNumber(this.recQuantity()),
      pricePerKg: toFormNumber(this.recPrice()),
      buyer: this.recBuyer(),
      soldAt: this.recSoldAt(),
      paidAmount: paid,
    });
    if (!res.ok) {
      this.formError.set(res.error ?? "");
      return;
    }
    this.recordOpen.set(false);
    this.formError.set("");
  }

  protected openPay(view: SaleView): void {
    this.formError.set("");
    this.payView.set(view);
    this.payAmount.set(String(this.remaining(view.sale)));
    this.payOpen.set(true);
  }

  protected submitPay(): void {
    const v = this.payView();
    if (!v) return;
    const amount = Math.round(toFormNumber(this.payAmount()));
    const res = this.store.actions.addSalePayment(v.sale.id, amount);
    if (!res.ok) {
      this.formError.set(res.error ?? "");
      return;
    }
    this.payOpen.set(false);
    this.formError.set("");
  }

  protected openVoid(view: SaleView): void {
    this.formError.set("");
    this.voidView.set(view);
    this.voidReason.set("");
    this.voidOpen.set(true);
  }

  protected submitVoid(): void {
    const v = this.voidView();
    if (!v) return;
    const res = this.store.actions.voidSale(v.sale.id, this.voidReason());
    if (!res.ok) {
      this.formError.set(res.error ?? "");
      return;
    }
    this.voidOpen.set(false);
    this.formError.set("");
  }

  protected exportCsv(): void {
    const head = [
      "Date",
      "Producteur",
      "Culture",
      "Quantité (kg)",
      "Prix au kilo",
      "Total",
      "Encaissé",
      "Acheteur",
      "État",
    ];
    const body = this.shown().map((v) => {
      const s = v.sale;
      const total = saleTotal(s);
      return [
        s.soldAt,
        v.producerName,
        s.crop,
        String(s.quantityKg),
        String(s.pricePerKg),
        String(total),
        String(Math.min(s.paidAmount, total)),
        s.buyer,
        s.voided ? "annulée" : salePayment(s),
      ];
    });
    downloadCsv("ventes.csv", [head, ...body]);
  }

  private viewOf(sale: Sale): SaleView {
    const p = this.producerOf().get(sale.producerId);
    const scoopName =
      this.store.state().scoops.find((s) => s.id === sale.scoopId)?.name ?? sale.scoopId;
    return {
      sale,
      producerName: p ? `${p.firstName} ${p.lastName}` : "",
      producerCode: p?.code ?? "",
      scoopName,
    };
  }
}

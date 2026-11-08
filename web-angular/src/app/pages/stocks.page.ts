import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  Download,
  LucideAngularModule,
  Package,
  PackagePlus,
  Search,
} from "lucide-angular";

import {
  expiryState,
  isLowStock,
  itemBalance,
  lotBalance,
  lotIssues,
  lotValue,
  movementIssues,
} from "@/lib/commerce";
import { downloadCsv, fmtDate, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import {
  INPUT_CATEGORIES,
  MOVEMENT_KINDS,
  type InputCategory,
  type MovementKind,
  type StockLot,
} from "@/lib/mock/commerce";
import { inScope, scopedLots, scopedMembers, scopedMovements } from "@/lib/scope";
import {
  CATEGORY_LABEL,
  EXPIRY_LABEL,
  KIND_LABEL,
  type StockRow,
  UNIT_LABEL,
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

type StockView = "tous" | "bas" | "peremption";

@Component({
  selector: "app-stocks-page",
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
      <app-shell perm="stock.read" [area]="t()('stocks.area')">
        <ui-page-header
          [eyebrow]="t()('stocks.eyebrow')"
          [title]="t()('stocks.title')"
          [description]="t()('stocks.description')"
        >
          <ui-button actions variant="outline" [disabled]="!shown().length" (click)="exportCsv()">
            <lucide-angular [img]="icons.download" class="size-4" />
            {{ t()("stocks.export") }}
          </ui-button>
          @if (canManage()) {
            <ui-button actions [disabled]="!scoops().length" (click)="openReceive()">
              <lucide-angular [img]="icons.receive" class="size-4" />
              {{ t()("stocks.receive") }}
            </ui-button>
          }
        </ui-page-header>

        <div class="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <ui-kpi-tile
            [label]="t()('stocks.kpi.value')"
            [value]="formatMoney(totals().value)"
            [sub]="t()('stocks.kpi.valueSub')"
          />
          <ui-kpi-tile
            [label]="t()('stocks.kpi.lots')"
            [value]="nf.format(totals().inStock)"
            [sub]="t()('stocks.kpi.lotsSub')"
          />
          <ui-kpi-tile
            [label]="t()('stocks.kpi.low')"
            [value]="nf.format(totals().low)"
            [tone]="totals().low ? 'warning' : 'neutral'"
            [sub]="
              totals().low === 0 ? t()('stocks.kpi.lowSub.zero') : t()('stocks.kpi.lowSub')
            "
          />
          <ui-kpi-tile
            [label]="t()('stocks.kpi.expiry')"
            [value]="nf.format(totals().soon + totals().expired)"
            [tone]="totals().expired ? 'danger' : totals().soon ? 'warning' : 'neutral'"
            [sub]="
              totals().soon + totals().expired === 0
                ? t()('stocks.kpi.expirySub.zero')
                : t()('stocks.kpi.expirySub', { soon: totals().soon, expired: totals().expired })
            "
          />
        </div>

        @if (!rows().length) {
          <div class="surface">
            <ui-empty>
              @if (canManage() && scoops().length) {
                <ui-button (click)="openReceive()">
                  <lucide-angular [img]="icons.receive" class="size-4" />
                  {{ t()("stocks.receive") }}
                </ui-button>
              }
              <p>
                {{
                  canManage() ? t()("stocks.empty.none.text") : t()("stocks.empty.none.readOnly")
                }}
              </p>
            </ui-empty>
          </div>
        } @else {
          <div class="surface mb-3 space-y-3 p-3">
            <div class="flex flex-wrap items-center gap-2">
              <ui-chip-rail class="min-w-0 flex-1">
                <button
                  type="button"
                  class="chip-filter chip-filter-sm"
                  [class.chip-filter-active]="view() === 'tous'"
                  (click)="view.set('tous')"
                >
                  {{ t()("stocks.filter.all") }}
                  <span class="chip-filter-count">{{ nf.format(searched().length) }}</span>
                </button>
                <button
                  type="button"
                  class="chip-filter chip-filter-sm"
                  [class.chip-filter-active]="view() === 'bas'"
                  (click)="view.set(view() === 'bas' ? 'tous' : 'bas')"
                >
                  {{ t()("stocks.filter.low") }}
                  <span class="chip-filter-count">{{
                    nf.format(searched().filter((r) => r.low).length)
                  }}</span>
                </button>
                <button
                  type="button"
                  class="chip-filter chip-filter-sm"
                  [class.chip-filter-active]="view() === 'peremption'"
                  (click)="view.set(view() === 'peremption' ? 'tous' : 'peremption')"
                >
                  {{ t()("stocks.filter.expiry") }}
                  <span class="chip-filter-count">{{
                    nf.format(searched().filter(isSoonRow).length)
                  }}</span>
                </button>
              </ui-chip-rail>
              <div class="relative ml-auto w-full sm:w-64">
                <lucide-angular
                  [img]="icons.search"
                  class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  class="flex h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  [attr.aria-label]="t()('stocks.search.aria')"
                  [placeholder]="t()('stocks.search.placeholder')"
                  [ngModel]="q()"
                  (ngModelChange)="q.set($event)"
                />
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-medium text-muted-foreground">{{
                t()("stocks.filter.category")
              }}</span>
              @for (c of categories; track c) {
                <button
                  type="button"
                  class="chip-filter chip-filter-sm"
                  [class.chip-filter-active]="category() === c"
                  (click)="category.set(category() === c ? null : c)"
                >
                  {{ t()(categoryLabel[c]) }}
                </button>
              }
            </div>
          </div>

          <div class="surface overflow-x-auto">
            @if (shown().length) {
              <table class="w-full text-sm">
                <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-semibold">{{ t()("stocks.col.item") }}</th>
                    <th class="hidden font-semibold md:table-cell">{{ t()("stocks.col.category") }}</th>
                    @if (manyScoops()) {
                      <th class="hidden font-semibold lg:table-cell">{{ t()("stocks.col.scoop") }}</th>
                    }
                    <th class="text-right font-semibold">{{ t()("stocks.col.balance") }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  @for (r of shown(); track r.key) {
                    <tr
                      tabindex="0"
                      class="cursor-pointer hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
                      (click)="openDetail(r.key)"
                      (keydown.enter)="openDetail(r.key)"
                    >
                      <td class="px-4 py-3">
                        <div class="font-semibold">{{ r.item.name }}</div>
                        <div class="mt-0.5 text-xs text-muted-foreground md:hidden">
                          {{ t()(categoryLabel[r.item.category]) }}
                          @if (manyScoops()) {
                            · {{ scoopName(r.scoopId) }}
                          }
                        </div>
                        @if (r.low || isSoonRow(r)) {
                          <div class="mt-1.5 flex flex-wrap gap-1.5">
                            @if (r.low) {
                              <ui-pill tone="warning">{{ t()("stocks.low") }}</ui-pill>
                            }
                            @if (isSoonRow(r)) {
                              <ui-pill [tone]="r.expiry === 'expired' ? 'danger' : 'warning'">{{
                                t()(expiryLabel[r.expiry])
                              }}</ui-pill>
                            }
                          </div>
                        }
                      </td>
                      <td class="hidden md:table-cell">{{ t()(categoryLabel[r.item.category]) }}</td>
                      @if (manyScoops()) {
                        <td class="hidden lg:table-cell">{{ scoopName(r.scoopId) }}</td>
                      }
                      <td
                        class="whitespace-nowrap text-right font-semibold tabular"
                        [class.text-warning-fg]="r.low"
                      >
                        {{ qtyLabel(r.balance, r.item.unit) }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            } @else {
              <ui-empty>
                <ui-button variant="outline" (click)="resetFilters()">{{
                  t()("stocks.empty.reset")
                }}</ui-button>
                <p>{{ t()("stocks.empty.filtered.text") }}</p>
              </ui-empty>
            }
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            {{
              t()("stocks.count.autre", {
                count: shown().length,
                shown: nf.format(shown().length),
                total: nf.format(rows().length),
              })
            }}
          </p>
        }

        <ui-sheet
          [(open)]="detailOpen"
          [title]="openRow() ? openRow()!.item.name : ''"
          (closed)="onDetailClosed()"
        >
          @if (openRow(); as row) {
            <p class="text-sm text-muted-foreground">
              {{ scoopName(row.scoopId) }} · {{ t()(categoryLabel[row.item.category]) }}
            </p>
            <p class="mt-2 text-sm font-medium">
              {{ t()("stocks.sheet.total") }} : {{ qtyLabel(row.balance, row.item.unit) }}
            </p>
            @if (canManage()) {
              <ui-button class="mt-3" size="sm" (click)="openReceive(row.item.id, row.scoopId)">
                {{ t()("stocks.sheet.receive") }}
              </ui-button>
            }
            <h3 class="mt-4 text-sm font-semibold">{{ t()("stocks.sheet.lots") }}</h3>
            <ul class="mt-2 space-y-3">
              @for (lot of row.lots; track lot.id) {
                @let bal = lotBal(lot);
                @let state = expiryState(lot, today);
                <li class="rounded-md border border-border p-3">
                  <div class="flex flex-wrap items-baseline justify-between gap-2">
                    <span class="font-medium">{{
                      t()("stocks.sheet.lotTitle", { lot: lot.lotNumber })
                    }}</span>
                    <span class="text-sm tabular">{{ qtyLabel(bal, row.item.unit) }}</span>
                  </div>
                  <p class="mt-1 text-xs text-muted-foreground">
                    {{
                      t()("stocks.sheet.supplierOn", {
                        supplier: lot.supplier,
                        date: fmtDate(lot.receivedAt),
                      })
                    }}
                  </p>
                  @if (state !== "none") {
                    <ui-pill class="mt-1" [tone]="state === 'expired' ? 'danger' : 'warning'">{{
                      t()(expiryLabel[state])
                    }}</ui-pill>
                  }
                  @if (canManage() && bal > 0) {
                    <ui-button class="mt-2" size="sm" variant="outline" (click)="openMove(lot, row)">
                      {{ t()("stocks.sheet.move") }}
                    </ui-button>
                  }
                </li>
              }
            </ul>
          }
        </ui-sheet>

        <ui-dialog [(open)]="receiveOpen" [title]="t()('stocks.receive.title')">
          @if (receiveOpen()) {
            <p class="text-sm text-muted-foreground">{{ t()("stocks.receive.description") }}</p>
            @if (formError()) {
              <p class="mt-2 text-sm text-destructive">{{ formError() }}</p>
            }
            <div class="mt-3 space-y-3">
              <label class="block text-sm">
                <span class="font-medium">{{ t()("stocks.receive.scoop") }}</span>
                <select
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="rcvScoopId()"
                  (ngModelChange)="rcvScoopId.set($event)"
                >
                  @for (s of scoops(); track s.id) {
                    <option [value]="s.id">{{ s.name }}</option>
                  }
                </select>
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("stocks.receive.item") }}</span>
                <select
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="rcvItemId()"
                  (ngModelChange)="rcvItemId.set($event)"
                >
                  @for (it of store.state().inputItems; track it.id) {
                    <option [value]="it.id">{{ it.name }}</option>
                  }
                </select>
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("stocks.receive.lotNumber") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="rcvLotNumber()"
                  (ngModelChange)="rcvLotNumber.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("stocks.receive.quantity") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="rcvQuantity()"
                  (ngModelChange)="rcvQuantity.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("stocks.receive.unitPrice") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="rcvUnitPrice()"
                  (ngModelChange)="rcvUnitPrice.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("stocks.receive.supplier") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="rcvSupplier()"
                  (ngModelChange)="rcvSupplier.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("stocks.receive.receivedAt") }}</span>
                <input
                  type="date"
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="rcvReceivedAt()"
                  (ngModelChange)="rcvReceivedAt.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("stocks.receive.expiresAt") }}</span>
                <input
                  type="date"
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="rcvExpiresAt()"
                  (ngModelChange)="rcvExpiresAt.set($event)"
                />
              </label>
            </div>
            <ui-button actions (click)="submitReceive()">{{ t()("stocks.receive.submit") }}</ui-button>
            <ui-button actions variant="outline" (click)="receiveOpen.set(false)">{{
              t()("stocks.cancel")
            }}</ui-button>
          }
        </ui-dialog>

        <ui-dialog [(open)]="moveOpen" [title]="t()('stocks.move.title')">
          @if (moveCtx(); as ctx) {
            <p class="text-sm text-muted-foreground">
              {{
                t()("stocks.move.description", {
                  item: ctx.row.item.name,
                  lot: ctx.lot.lotNumber,
                  balance: qtyLabel(lotBal(ctx.lot), ctx.row.item.unit),
                })
              }}
            </p>
            @if (formError()) {
              <p class="mt-2 text-sm text-destructive">{{ formError() }}</p>
            }
            <div class="mt-3 space-y-3">
              <label class="block text-sm">
                <span class="font-medium">{{ t()("stocks.move.kind") }}</span>
                <select
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="mvKind()"
                  (ngModelChange)="mvKind.set($event)"
                >
                  @for (k of movementKinds; track k) {
                    <option [value]="k">{{ t()(kindLabel[k]) }}</option>
                  }
                </select>
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("stocks.move.quantity") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="mvQuantity()"
                  (ngModelChange)="mvQuantity.set($event)"
                />
              </label>
              @if (mvKind() === 'distribution') {
                <label class="block text-sm">
                  <span class="font-medium">{{ t()("stocks.move.member") }}</span>
                  <select
                    class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                    [ngModel]="mvMemberId()"
                    (ngModelChange)="mvMemberId.set($event)"
                  >
                    <option value="">{{ t()("stocks.move.memberPlaceholder") }}</option>
                    @for (m of membersForLot(ctx.lot); track m.id) {
                      <option [value]="m.id">{{ m.firstName }} {{ m.lastName }}</option>
                    }
                  </select>
                </label>
              }
              <label class="block text-sm">
                <span class="font-medium">{{ t()("stocks.move.date") }}</span>
                <input
                  type="date"
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="mvDate()"
                  (ngModelChange)="mvDate.set($event)"
                />
              </label>
              <label class="block text-sm">
                <span class="font-medium">{{ t()("stocks.move.note") }}</span>
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  [ngModel]="mvNote()"
                  (ngModelChange)="mvNote.set($event)"
                />
              </label>
            </div>
            <ui-button actions (click)="submitMove()">{{ t()("stocks.move.submit") }}</ui-button>
            <ui-button actions variant="outline" (click)="moveOpen.set(false)">{{
              t()("stocks.cancel")
            }}</ui-button>
          }
        </ui-dialog>
      </app-shell>
    </app-extra-module-gate>
  `,
})
export default class StocksPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly fmtDate = fmtDate;
  protected readonly icons = { download: Download, search: Search, receive: PackagePlus, package: Package };
  protected readonly categories = INPUT_CATEGORIES;
  protected readonly categoryLabel = CATEGORY_LABEL;
  protected readonly expiryLabel = EXPIRY_LABEL;
  protected readonly expiryState = expiryState;
  protected readonly kindLabel = KIND_LABEL;
  protected readonly movementKinds = MOVEMENT_KINDS;

  protected readonly today = new Date().toISOString().slice(0, 10);
  protected readonly view = signal<StockView>("tous");
  protected readonly category = signal<InputCategory | null>(null);
  protected readonly q = signal("");
  protected readonly openKey = signal<string | undefined>(undefined);
  protected readonly detailOpen = signal(false);

  protected readonly receiveOpen = signal(false);
  protected readonly rcvScoopId = signal("");
  protected readonly rcvItemId = signal("");
  protected readonly rcvLotNumber = signal("");
  protected readonly rcvQuantity = signal("");
  protected readonly rcvUnitPrice = signal("");
  protected readonly rcvSupplier = signal("");
  protected readonly rcvReceivedAt = signal(this.today);
  protected readonly rcvExpiresAt = signal("");
  protected readonly formError = signal("");

  protected readonly moveOpen = signal(false);
  protected readonly moveCtx = signal<{ lot: StockLot; row: StockRow } | null>(null);
  protected readonly mvKind = signal<MovementKind>("distribution");
  protected readonly mvQuantity = signal("");
  protected readonly mvMemberId = signal("");
  protected readonly mvDate = signal(this.today);
  protected readonly mvNote = signal("");

  protected readonly scoops = computed(() => {
    const s = this.store.state();
    return inScope(
      s.scoops.map((sc) => ({ scoopId: sc.id, id: sc.id, name: sc.name })),
      s.session,
    );
  });

  private readonly scoopIds = computed(() => new Set(this.scoops().map((s) => s.id)));

  private readonly lots = computed(() => {
    const s = this.store.state();
    return scopedLots(s.stockLots, s.session).filter((l) => this.scoopIds().has(l.scoopId));
  });

  private readonly movements = computed(() => {
    const s = this.store.state();
    return scopedMovements(s.stockMovements, s.session).filter((m) => this.scoopIds().has(m.scoopId));
  });

  private readonly members = computed(() => scopedMembers(this.store.state().members, this.store.state().session));

  protected readonly manyScoops = computed(() => this.scoops().length > 1);

  protected readonly rows = computed((): StockRow[] => {
    const s = this.store.state();
    const items = s.inputItems;
    const out: StockRow[] = [];
    for (const sc of this.scoops()) {
      for (const item of items) {
        const mine = this.lots().filter((l) => l.scoopId === sc.id && l.itemId === item.id);
        if (!mine.length) continue;
        const states = mine
          .filter((l) => lotBalance(l, this.movements()) > 0)
          .map((l) => expiryState(l, this.today));
        const balance = itemBalance(item.id, sc.id, this.lots(), this.movements());
        const expiry = states.includes("expired")
          ? "expired"
          : states.includes("soon")
            ? "soon"
            : states.includes("ok")
              ? "ok"
              : "none";
        out.push({
          key: `${item.id}:${sc.id}`,
          item,
          scoopId: sc.id,
          lots: mine,
          balance,
          low: isLowStock(item, balance),
          expiry,
        });
      }
    }
    return out.sort((a, b) => a.item.name.localeCompare(b.item.name, "fr"));
  });

  protected readonly totals = computed(() => {
    let value = 0;
    let inStock = 0;
    let soon = 0;
    let expired = 0;
    for (const l of this.lots()) {
      value += lotValue(l, this.movements());
      if (lotBalance(l, this.movements()) <= 0) continue;
      inStock += 1;
      const st = expiryState(l, this.today);
      if (st === "soon") soon += 1;
      if (st === "expired") expired += 1;
    }
    return { value, inStock, soon, expired, low: this.rows().filter((r) => r.low).length };
  });

  protected readonly searched = computed(() => {
    const needle = this.q().trim().toLowerCase();
    const cat = this.category();
    return this.rows().filter(
      (r) =>
        (!needle ||
          r.item.name.toLowerCase().includes(needle) ||
          r.lots.some((l) => l.lotNumber.toLowerCase().includes(needle))) &&
        (!cat || r.item.category === cat),
    );
  });

  protected readonly shown = computed(() => {
    const v = this.view();
    return this.searched().filter((r) =>
      v === "bas" ? r.low : v === "peremption" ? this.isSoonRow(r) : true,
    );
  });

  protected readonly openRow = computed(() => {
    const key = this.openKey();
    return key ? this.rows().find((r) => r.key === key) : undefined;
  });

  protected canManage(): boolean {
    return this.store.can("stock.manage");
  }

  protected scoopName(id: string): string {
    return this.store.state().scoops.find((s) => s.id === id)?.name ?? "";
  }

  protected isSoonRow = (r: StockRow) => r.expiry === "soon" || r.expiry === "expired";

  protected qtyLabel(amount: number, unit: StockRow["item"]["unit"]): string {
    return this.t()("stocks.qty", {
      amount: this.locale.formatNumber(amount),
      unit: this.t()(UNIT_LABEL[unit]),
    });
  }

  protected formatMoney(value: number): string {
    return `${this.locale.formatNumber(value)} FCFA`;
  }

  protected lotBal(lot: StockLot): number {
    return lotBalance(lot, this.movements());
  }

  protected membersForLot(lot: StockLot) {
    return this.members().filter((m) => m.scoopId === lot.scoopId && m.status === "membre");
  }

  protected openDetail(key: string): void {
    this.openKey.set(key);
    this.detailOpen.set(true);
  }

  protected onDetailClosed(): void {
    this.openKey.set(undefined);
    this.detailOpen.set(false);
  }

  protected resetFilters(): void {
    this.q.set("");
    this.view.set("tous");
    this.category.set(null);
  }

  protected openReceive(itemId?: string, scoopId?: string): void {
    this.formError.set("");
    const scoops = this.scoops();
    this.rcvScoopId.set(scoopId ?? scoops[0]?.id ?? "");
    const items = this.store.state().inputItems;
    this.rcvItemId.set(itemId ?? items[0]?.id ?? "");
    this.rcvLotNumber.set("");
    this.rcvQuantity.set("");
    this.rcvUnitPrice.set("");
    this.rcvSupplier.set("");
    this.rcvReceivedAt.set(this.today);
    this.rcvExpiresAt.set("");
    this.receiveOpen.set(true);
  }

  protected submitReceive(): void {
    const q = toFormNumber(this.rcvQuantity());
    const price = toFormNumber(this.rcvUnitPrice());
    const issues = lotIssues(
      {
        lotNumber: this.rcvLotNumber(),
        quantity: q,
        unitPrice: price,
        supplier: this.rcvSupplier(),
        receivedAt: this.rcvReceivedAt(),
        expiresAt: this.rcvExpiresAt() || null,
      },
      new Date().toISOString(),
    );
    if (issues.length) {
      this.formError.set(this.locale.tNow(issues[0] as MessageKey));
      return;
    }
    const res = this.store.actions.receiveLot({
      scoopId: this.rcvScoopId(),
      itemId: this.rcvItemId(),
      lotNumber: this.rcvLotNumber(),
      quantity: q,
      unitPrice: price,
      supplier: this.rcvSupplier(),
      receivedAt: this.rcvReceivedAt(),
      expiresAt: this.rcvExpiresAt() || null,
    });
    if (!res.ok) {
      this.formError.set(res.error ?? "");
      return;
    }
    this.receiveOpen.set(false);
    this.formError.set("");
  }

  protected openMove(lot: StockLot, row: StockRow): void {
    this.formError.set("");
    this.moveCtx.set({ lot, row });
    this.mvKind.set("distribution");
    this.mvQuantity.set("");
    this.mvMemberId.set("");
    this.mvDate.set(this.today);
    this.mvNote.set("");
    this.moveOpen.set(true);
  }

  protected submitMove(): void {
    const ctx = this.moveCtx();
    if (!ctx) return;
    const q = toFormNumber(this.mvQuantity());
    const memberId = this.mvKind() === "distribution" ? this.mvMemberId() || null : null;
    const issues = movementIssues(
      { quantity: q, kind: this.mvKind(), memberId, date: this.mvDate() },
      lotBalance(ctx.lot, this.movements()),
      new Date().toISOString(),
    );
    if (issues.length) {
      this.formError.set(this.locale.tNow(issues[0] as MessageKey));
      return;
    }
    const res = this.store.actions.recordMovement({
      lotId: ctx.lot.id,
      kind: this.mvKind(),
      quantity: q,
      memberId,
      date: this.mvDate(),
      note: this.mvNote(),
    });
    if (!res.ok) {
      this.formError.set(res.error ?? "");
      return;
    }
    this.moveOpen.set(false);
    this.formError.set("");
  }

  protected exportCsv(): void {
    const moves = this.movements();
    const head = [
      "Intrant",
      "Lot",
      "Fournisseur",
      "Reçu le",
      "Péremption",
      "Solde",
      "Unité",
      "Valeur FCFA",
    ];
    const body = this.shown().flatMap((r) =>
      [...r.lots]
        .sort((a, b) => a.receivedAt.localeCompare(b.receivedAt))
        .map((l) => [
          r.item.name,
          l.lotNumber,
          l.supplier,
          fmtDate(l.receivedAt),
          l.expiresAt ? fmtDate(l.expiresAt) : "",
          String(lotBalance(l, moves)),
          r.item.unit,
          String(lotValue(l, moves)),
        ]),
    );
    downloadCsv("stocks.csv", [head, ...body]);
  }
}

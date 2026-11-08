import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import {
  Ban,
  Download,
  LucideAngularModule,
  Plus,
  Receipt,
  Search,
} from "lucide-angular";

import { currentCampaign } from "@/lib/campaigns";
import { chargesByCategory, expenseIssues } from "@/lib/exploitation";
import { downloadCsv, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import type { Producer } from "@/lib/mock/data";
import {
  EXPENSE_CATEGORIES,
  type Expense,
  type ExpenseCategory,
} from "@/lib/mock/exploitation";
import { inScope, scopedExpenses } from "@/lib/scope";
import { ExtraModuleGateComponent } from "../shared/extra-module-gate.component";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { ToastService } from "../shared/toast.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiDialogComponent } from "../shared/ui/dialog.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiKpiTileComponent } from "../shared/ui/kpi-tile.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";
import { UiSheetComponent } from "../shared/ui/sheet.component";

const ALL_CROPS = "__all__";

const EXPENSE_CATEGORY_LABEL: Record<ExpenseCategory, MessageKey> = {
  intrants: "charges.cat.intrants",
  "main-d'œuvre": "charges.cat.main-d'œuvre",
  transport: "charges.cat.transport",
  irrigation: "charges.cat.irrigation",
  "location de matériel": "charges.cat.location de matériel",
  autre: "charges.cat.autre",
};

type CatFilter = "all" | ExpenseCategory;

const parseAmount = (raw: string): number => {
  const n = Number(raw.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? Math.round(n) : 0;
};

const fullName = (p: Producer) => `${p.firstName} ${p.lastName}`;

/** Port de charges.tsx — KPI, filtres, liste, saisie et annulation via store.actions. */
@Component({
  selector: "app-charges-page",
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
      <app-shell perm="expense.read" [area]="t()('charges.area')">
        <ui-page-header
          [eyebrow]="t()('charges.eyebrow')"
          [title]="t()('charges.title')"
          [description]="t()('charges.description')"
        >
          <ui-button actions variant="outline" [disabled]="!shown().length" (click)="exportCsv()">
            <lucide-angular [img]="icons.download" class="size-4" />
            {{ t()("charges.export") }}
          </ui-button>
          @if (canWrite()) {
            <ui-button actions (click)="recording.set(true)">
              <lucide-angular [img]="icons.plus" class="size-4" />
              {{ t()("charges.record") }}
            </ui-button>
          }
        </ui-page-header>

        <div class="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <label for="charges-campaign" class="text-sm font-medium">{{ t()("charges.campaign") }}</label>
          <select
            id="charges-campaign"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm sm:w-64"
            [ngModel]="campaign()"
            (ngModelChange)="campaignChoice.set($event)"
          >
            @for (c of campaigns(); track c.id) {
              <option [value]="c.name">{{ c.name }}</option>
            }
          </select>
          @if (scoopId()) {
            <span class="text-sm text-muted-foreground">
              {{ t()("charges.scoopOnly", { name: scoopName(scoopId()) }) }}
            </span>
          }
        </div>

        <div class="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <ui-kpi-tile
            [label]="t()('charges.kpi.total')"
            [value]="locale.formatNumber(total())"
            [sub]="t()('charges.kpi.totalSub')"
          />
          <ui-kpi-tile
            [label]="t()('charges.kpi.count')"
            [value]="nf.format(live().length)"
            [sub]="t()('charges.kpi.countSub.autre', { count: live().length })"
          />
          <ui-kpi-tile
            [label]="t()('charges.kpi.top')"
            [value]="top() ? t()(catLabel[top()!.category]) : '—'"
            [sub]="
              top() && total()
                ? t()('charges.kpi.topSub', { share: Math.round((top()!.amount / total()) * 100) })
                : t()('charges.kpi.topNone')
            "
          />
          <ui-kpi-tile
            [label]="t()('charges.kpi.producers')"
            [value]="nf.format(producerCount())"
            [sub]="t()('charges.kpi.producersSub.autre', { count: producerCount() })"
          />
        </div>

        <div class="surface mb-3 p-3">
          <ui-chip-rail>
            <button
              type="button"
              class="chip-filter chip-filter-sm"
              [class.chip-filter-active]="catFilter() === 'all'"
              [attr.aria-pressed]="catFilter() === 'all'"
              (click)="catFilter.set('all')"
            >
              {{ t()("charges.filter.all") }}
              <span class="chip-filter-count">{{ searched().length }}</span>
            </button>
            @for (c of categories; track c) {
              <button
                type="button"
                class="chip-filter chip-filter-sm"
                [class.chip-filter-active]="catFilter() === c"
                [attr.aria-pressed]="catFilter() === c"
                (click)="catFilter.set(catFilter() === c ? 'all' : c)"
              >
                {{ t()(catLabel[c]) }}
                <span class="chip-filter-count">{{ countCat(c) }}</span>
              </button>
            }
          </ui-chip-rail>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <select
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm sm:w-56"
              [attr.aria-label]="t()('charges.filter.crop')"
              [ngModel]="cropFilter()"
              (ngModelChange)="cropFilter.set($event)"
            >
              <option [value]="allCrops">{{ t()("charges.filter.cropAll") }}</option>
              @for (c of cropNames(); track c) {
                <option [value]="c">{{ c }}</option>
              }
            </select>
            <div class="relative w-full sm:ml-auto sm:w-72">
              <lucide-angular
                [img]="icons.search"
                class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                class="flex h-9 w-full rounded-md border border-input bg-background py-1 pl-8 pr-3 text-sm shadow-sm"
                [attr.aria-label]="t()('charges.search.aria')"
                [placeholder]="t()('charges.search.placeholder')"
                [ngModel]="q()"
                (ngModelChange)="q.set($event)"
              />
            </div>
          </div>
        </div>

        <div class="surface overflow-x-auto">
          @if (shown().length) {
            <table class="w-full text-sm">
              <caption class="sr-only">{{ t()("charges.table.caption") }}</caption>
              <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th class="hidden px-4 py-3 font-semibold md:table-cell">{{ t()("charges.col.date") }}</th>
                  <th class="px-4 py-3 font-semibold md:px-2">{{ t()("charges.col.producer") }}</th>
                  <th class="hidden font-semibold md:table-cell">{{ t()("charges.col.crop") }}</th>
                  <th class="hidden px-2 font-semibold md:table-cell">{{ t()("charges.col.category") }}</th>
                  <th class="hidden px-2 font-semibold lg:table-cell">{{ t()("charges.col.label") }}</th>
                  <th class="px-2 text-right font-semibold">{{ t()("charges.col.amount") }}</th>
                  <th class="hidden px-2 font-semibold xl:table-cell">{{ t()("charges.col.by") }}</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                @for (e of shown(); track e.id) {
                  <tr
                    tabindex="0"
                    class="cursor-pointer hover:bg-muted/60"
                    [attr.data-voided]="e.voided ? 'true' : null"
                    (click)="openId.set(e.id)"
                    (keydown.enter)="openId.set(e.id)"
                  >
                    <td
                      class="hidden whitespace-nowrap px-4 py-3 md:table-cell"
                      [class.text-muted-foreground]="e.voided"
                      [class.line-through]="e.voided"
                    >
                      {{ formatDay(e.date) }}
                    </td>
                    <td class="px-4 py-3 md:px-2">
                      <div class="font-semibold" [class.line-through]="e.voided">{{ producerName(e) }}</div>
                      <div class="text-xs text-muted-foreground">
                        {{ producerCode(e) }}
                        @if (manyScoops()) {
                          · {{ scoopName(e.scoopId) }}
                        }
                      </div>
                      @if (e.voided) {
                        <div class="mt-0.5 text-xs">
                          {{ t()("charges.row.voidReason", { reason: e.voided.reason }) }}
                        </div>
                      }
                    </td>
                    <td class="hidden md:table-cell" [class.line-through]="e.voided">{{ e.crop }}</td>
                    <td class="hidden px-2 md:table-cell" [class.line-through]="e.voided">
                      {{ t()(catLabel[e.category]) }}
                    </td>
                    <td class="hidden px-2 lg:table-cell" [class.line-through]="e.voided">
                      {{ e.label || t()("charges.noLabel") }}
                    </td>
                    <td class="px-2 text-right font-semibold tabular" [class.line-through]="e.voided">
                      {{ money(e.amount) }}
                    </td>
                    <td class="hidden px-2 xl:table-cell" [class.line-through]="e.voided">{{ e.by }}</td>
                  </tr>
                }
              </tbody>
            </table>
          } @else if (base().length) {
            <ui-empty>
              <div class="font-semibold">{{ t()("charges.empty.filtered.title") }}</div>
              <p class="mt-1 text-sm text-muted-foreground">{{ t()("charges.empty.filtered.text") }}</p>
              <ui-button class="mt-3" variant="outline" (click)="resetFilters()">
                {{ t()("charges.empty.reset") }}
              </ui-button>
            </ui-empty>
          } @else {
            <ui-empty>
              <lucide-angular [img]="icons.receipt" class="mx-auto mb-2 size-10 opacity-50" />
              <div class="font-semibold">{{ t()("charges.empty.none.title") }}</div>
              <p class="mt-1 text-sm text-muted-foreground">
                {{
                  canWrite() ? t()("charges.empty.none.text") : t()("charges.empty.none.readOnly")
                }}
              </p>
              @if (canWrite()) {
                <ui-button class="mt-3" (click)="recording.set(true)">
                  <lucide-angular [img]="icons.plus" class="size-4" />
                  {{ t()("charges.record") }}
                </ui-button>
              }
            </ui-empty>
          }
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          {{
            t()("charges.count.autre", {
              count: shown().length,
              shown: nf.format(shown().length),
              total: nf.format(base().length),
            })
          }}
        </p>

        <section class="surface mt-6 p-4" aria-labelledby="charges-split-title">
          <h2 id="charges-split-title" class="font-semibold">{{ t()("charges.split.title") }}</h2>
          <p class="mt-0.5 text-sm text-muted-foreground">{{ t()("charges.split.description") }}</p>
          @if (byCategory().length) {
            <ul class="mt-4 space-y-4">
              @for (c of byCategory(); track c.category) {
                <li>
                  <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <span class="font-medium">{{ t()(catLabel[c.category]) }}</span>
                    <span class="text-sm tabular">
                      <span class="font-semibold">{{ money(c.amount) }}</span>
                      <span class="text-muted-foreground">
                        ·
                        {{
                          t()("charges.split.share", {
                            share: total() ? Math.round((c.amount / total()) * 100) : 0,
                          })
                        }}
                      </span>
                    </span>
                  </div>
                  <div class="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                    <div
                      class="h-full rounded-full bg-primary"
                      [style.width.%]="splitPct(c.amount)"
                    ></div>
                  </div>
                </li>
              }
            </ul>
          } @else {
            <p class="mt-3 text-sm text-muted-foreground">{{ t()("charges.split.none") }}</p>
          }
        </section>

        @if (openExpense(); as e) {
          <ui-sheet
            [open]="!!openId()"
            (openChange)="onSheetOpen($event)"
            [title]="t()('charges.sheet.title', { category: t()(catLabel[e.category]) })"
          >
            <div class="flex flex-wrap items-center gap-2">
              <ui-pill [tone]="e.voided ? 'neutral' : 'success'">
                {{ e.voided ? t()("charges.state.voided") : t()("charges.state.valid") }}
              </ui-pill>
              <span class="text-sm text-muted-foreground">{{ formatDay(e.date) }}</span>
            </div>
            <div class="mt-4 rounded-md bg-muted p-3">
              <div class="text-xs text-muted-foreground">{{ t()("charges.sheet.amount") }}</div>
              <div
                class="text-xl font-semibold tabular"
                [class.text-muted-foreground]="e.voided"
                [class.line-through]="e.voided"
              >
                {{ money(e.amount) }}
              </div>
            </div>
            @if (canWrite() && !e.voided) {
              <ui-button variant="outline" class="mt-4 w-full" (click)="startVoid(e.id)">
                <lucide-angular [img]="icons.ban" class="size-4" />
                {{ t()("charges.sheet.void") }}
              </ui-button>
            }
            <section class="mt-6 border-t pt-4">
              <h3 class="font-semibold">{{ t()("charges.sheet.detail") }}</h3>
              <dl class="mt-2 divide-y text-sm">
                <div class="flex justify-between gap-4 py-2">
                  <dt class="text-muted-foreground">{{ t()("charges.sheet.producer") }}</dt>
                  <dd class="text-right font-medium">
                    {{ producerName(e) }} ({{ producerCode(e) }})
                  </dd>
                </div>
                <div class="flex justify-between gap-4 py-2">
                  <dt class="text-muted-foreground">{{ t()("charges.sheet.scoop") }}</dt>
                  <dd>{{ scoopName(e.scoopId) }}</dd>
                </div>
                <div class="flex justify-between gap-4 py-2">
                  <dt class="text-muted-foreground">{{ t()("charges.sheet.crop") }}</dt>
                  <dd>{{ e.crop }}</dd>
                </div>
                <div class="flex justify-between gap-4 py-2">
                  <dt class="text-muted-foreground">{{ t()("charges.sheet.category") }}</dt>
                  <dd>{{ t()(catLabel[e.category]) }}</dd>
                </div>
                <div class="flex justify-between gap-4 py-2">
                  <dt class="text-muted-foreground">{{ t()("charges.sheet.label") }}</dt>
                  <dd>{{ e.label || t()("charges.noLabel") }}</dd>
                </div>
                <div class="flex justify-between gap-4 py-2">
                  <dt class="text-muted-foreground">{{ t()("charges.sheet.campaign") }}</dt>
                  <dd>{{ e.campaign }}</dd>
                </div>
              </dl>
            </section>
            <section class="mt-6 border-t pt-4">
              <h3 class="font-semibold">{{ t()("charges.sheet.history") }}</h3>
              <ul class="mt-2 space-y-2 text-sm">
                <li>
                  {{
                    t()("charges.sheet.recorded", {
                      name: e.by,
                      date: formatDay(e.createdAt),
                    })
                  }}
                </li>
                @if (e.voided) {
                  <li class="rounded-md bg-muted p-2.5">
                    <div class="font-medium">
                      {{
                        t()("charges.sheet.voidedBy", {
                          name: e.voided.by,
                          date: formatDay(e.voided.at),
                        })
                      }}
                    </div>
                    <div>{{ t()("charges.sheet.reason", { reason: e.voided.reason }) }}</div>
                  </li>
                }
              </ul>
            </section>
          </ui-sheet>
        }

        <ui-dialog [(open)]="recording" [title]="t()('charges.form.title')">
          <p class="text-sm text-muted-foreground">{{ t()("charges.form.description") }}</p>
          <h3 class="mt-4 text-sm font-semibold">{{ t()("charges.form.step1") }}</h3>
          <label class="mt-2 block text-sm font-medium">{{ t()("charges.form.producer") }}</label>
          <div class="relative mt-1">
            <lucide-angular
              [img]="icons.search"
              class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              class="flex h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm"
              [placeholder]="t()('charges.form.findPlaceholder')"
              [ngModel]="findProducer()"
              (ngModelChange)="findProducer.set($event)"
            />
          </div>
          <ul class="mt-2 grid max-h-32 gap-1 overflow-y-auto text-sm" [attr.aria-label]="t()('charges.form.findAria')">
            @for (p of listedProducers(); track p.id) {
              <li>
                <button
                  type="button"
                  class="w-full rounded-md px-2 py-1.5 text-left hover:bg-muted"
                  [class.bg-muted]="formPid() === p.id"
                  (click)="pickProducer(p)"
                >
                  {{ fullName(p) }} ({{ p.code }}) — {{ p.village }}
                </button>
              </li>
            } @empty {
              <li class="text-muted-foreground">{{ t()("charges.form.noProducer") }}</li>
            }
          </ul>
          @if (formProducer(); as p) {
            <p class="mt-2 text-xs text-muted-foreground">
              {{ t()("charges.form.chosen", { name: fullName(p), code: p.code }) }}
            </p>
          }
          <h3 class="mt-4 text-sm font-semibold">{{ t()("charges.form.step2") }}</h3>
          <label class="mt-2 block text-sm font-medium" for="ex-crop">{{ t()("charges.form.crop") }}</label>
          <select
            id="ex-crop"
            class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            [disabled]="!formProducer()"
            [ngModel]="formCrop()"
            (ngModelChange)="formCrop.set($event)"
          >
            @if (!formProducer()) {
              <option value="">{{ t()("charges.form.cropFirst") }}</option>
            } @else {
              <option value="">{{ t()("charges.form.cropChoose") }}</option>
              @for (c of cropChoices(); track c) {
                <option [value]="c">{{ c }}</option>
              }
            }
          </select>
          <label class="mt-3 block text-sm font-medium" for="ex-cat">{{ t()("charges.form.category") }}</label>
          <select
            id="ex-cat"
            class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            [ngModel]="formCategory()"
            (ngModelChange)="formCategory.set($event)"
          >
            <option value=""></option>
            @for (c of categories; track c) {
              <option [value]="c">{{ t()(catLabel[c]) }}</option>
            }
          </select>
          <label class="mt-3 block text-sm font-medium" for="ex-amt">{{ t()("charges.form.amount") }}</label>
          <input
            id="ex-amt"
            type="text"
            inputmode="numeric"
            class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            [ngModel]="formAmount()"
            (ngModelChange)="formAmount.set($event)"
          />
          <p class="mt-1 text-xs text-muted-foreground">{{ t()("charges.form.amountHint") }}</p>
          <label class="mt-3 block text-sm font-medium" for="ex-day">{{ t()("charges.form.date") }}</label>
          <input
            id="ex-day"
            type="date"
            class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            [ngModel]="formDate()"
            (ngModelChange)="formDate.set($event)"
          />
          <label class="mt-3 block text-sm font-medium" for="ex-lbl">{{ t()("charges.form.label") }}</label>
          <input
            id="ex-lbl"
            class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            [placeholder]="t()('charges.form.labelPlaceholder')"
            [ngModel]="formLabel()"
            (ngModelChange)="formLabel.set($event)"
          />
          <ui-button actions class="mt-4 w-full sm:w-auto" [disabled]="formInvalid()" (click)="submitExpense()">
            {{ t()("charges.form.submit") }}
          </ui-button>
        </ui-dialog>

        <ui-dialog [(open)]="voidDialog" [title]="t()('charges.void.title')">
          <p class="text-sm text-muted-foreground">
            @if (voidTarget(); as e) {
              {{
                t()("charges.void.description", {
                  name: producerName(e),
                  amount: nf.format(e.amount),
                })
              }}
            }
          </p>
          <label class="mt-3 block text-sm font-medium" for="void-reason">{{
            t()("charges.void.reason")
          }}</label>
          <textarea
            id="void-reason"
            rows="3"
            class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            [placeholder]="t()('charges.void.hint')"
            [ngModel]="voidReason()"
            (ngModelChange)="voidReason.set($event)"
          ></textarea>
          <div actions class="flex w-full flex-wrap justify-end gap-2">
            <ui-button variant="outline" (click)="voidDialog.set(false)">{{ t()("charges.void.back") }}</ui-button>
            <ui-button variant="destructive" [disabled]="voidReason().trim().length < 3" (click)="submitVoid()">
              {{ t()("charges.void.submit") }}
            </ui-button>
          </div>
        </ui-dialog>
      </app-shell>
    </app-extra-module-gate>
  `,
})
export default class ChargesPage {
  protected readonly Math = Math;
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly toast = inject(ToastService);
  private readonly route = inject(ActivatedRoute);

  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly icons = { download: Download, plus: Plus, search: Search, receipt: Receipt, ban: Ban };
  protected readonly categories = EXPENSE_CATEGORIES;
  protected readonly catLabel = EXPENSE_CATEGORY_LABEL;
  protected readonly allCrops = ALL_CROPS;
  protected readonly fullName = fullName;

  protected readonly scoopId = toSignal(
    this.route.queryParamMap.pipe(map((m) => m.get("scoop") ?? "")),
    { initialValue: "" },
  );

  protected readonly campaignChoice = signal<string | undefined>(undefined);
  protected readonly catFilter = signal<CatFilter>("all");
  protected readonly cropFilter = signal(ALL_CROPS);
  protected readonly q = signal("");
  protected readonly openId = signal<string | undefined>(undefined);
  protected readonly recording = signal(false);
  protected readonly voidDialog = signal(false);
  protected readonly voidReason = signal("");
  protected readonly voidTargetId = signal<string | undefined>(undefined);

  protected readonly formPid = signal("");
  protected readonly findProducer = signal("");
  protected readonly formCrop = signal("");
  protected readonly formCategory = signal<ExpenseCategory | "">("");
  protected readonly formAmount = signal("");
  protected readonly formDate = signal(new Date().toISOString().slice(0, 10));
  protected readonly formLabel = signal("");

  protected readonly campaigns = computed(() => this.store.state().campaigns);
  protected readonly canWrite = computed(() => this.store.can("expense.write"));

  protected readonly campaign = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    const campaigns = this.campaigns();
    return (
      this.campaignChoice() ??
      currentCampaign(campaigns, today)?.name ??
      campaigns.at(-1)?.name ??
      ""
    );
  });

  protected readonly base = computed(() => {
    const s = this.store.state();
    const scoop = this.scoopId();
    const campaign = this.campaign();
    return scopedExpenses(s.expenses, s.session)
      .filter((e) => (!scoop || e.scoopId === scoop) && e.campaign === campaign)
      .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  });

  protected readonly live = computed(() => this.base().filter((e) => !e.voided));
  protected readonly total = computed(() => this.live().reduce((n, e) => n + e.amount, 0));
  protected readonly byCategory = computed(() => chargesByCategory(this.base()));
  protected readonly top = computed(() => this.byCategory()[0]);
  protected readonly producerCount = computed(
    () => new Set(this.live().map((e) => e.producerId)).size,
  );
  protected readonly manyScoops = computed(
    () => new Set(this.base().map((e) => e.scoopId)).size > 1,
  );
  protected readonly cropNames = computed(() =>
    [...new Set(this.base().map((e) => e.crop))].sort((a, b) => a.localeCompare(b, "fr")),
  );

  protected readonly searched = computed(() => {
    const needle = this.q().trim().toLowerCase();
    const crop = this.cropFilter();
    return this.base().filter((e) => {
      if (crop !== ALL_CROPS && e.crop !== crop) return false;
      if (!needle) return true;
      const hay = `${this.producerName(e)} ${this.producerCode(e)} ${e.label}`;
      return hay.toLowerCase().includes(needle);
    });
  });

  protected readonly shown = computed(() =>
    this.searched().filter((e) => this.catFilter() === "all" || e.category === this.catFilter()),
  );

  protected readonly openExpense = computed(() => {
    const id = this.openId();
    if (!id) return undefined;
    const e = this.store.state().expenses.find((x) => x.id === id);
    const session = this.store.state().session;
    return e && inScope([e], session).length ? e : undefined;
  });

  protected readonly voidTarget = computed(() => {
    const id = this.voidTargetId();
    return id ? this.store.state().expenses.find((x) => x.id === id) : undefined;
  });

  protected readonly producerChoices = computed(() => {
    const s = this.store.state();
    return s.producers
      .filter((p) => !p.mergedInto && inScope([p], s.session).length === 1)
      .sort((a, b) => fullName(a).localeCompare(fullName(b), "fr"));
  });

  protected readonly listedProducers = computed(() => {
    const needle = this.findProducer().trim().toLowerCase();
    const pid = this.formPid();
    const producer = this.producerChoices().find((p) => p.id === pid);
    const list = producer && !needle ? [producer] : this.producerChoices();
    return list
      .filter(
        (p) =>
          !needle || `${fullName(p)} ${p.code} ${p.village}`.toLowerCase().includes(needle),
      )
      .slice(0, 5);
  });

  protected readonly formProducer = computed(() =>
    this.producerChoices().find((p) => p.id === this.formPid()),
  );

  protected readonly cropChoices = computed(() => {
    const p = this.formProducer();
    if (!p) return [];
    const mine = [...new Set((p.crops ?? []).map((c) => c.crop))];
    const rest = this.store
      .state()
      .cropRefs.map((r) => r.name)
      .filter((n) => !mine.includes(n));
    return [...mine, ...rest.sort((a, b) => a.localeCompare(b, "fr"))];
  });

  protected readonly formInvalid = computed(() => {
    const p = this.formProducer();
    const cat = this.formCategory();
    if (!p || !cat) return true;
    const issues = expenseIssues(
      {
        amount: parseAmount(this.formAmount()),
        category: cat,
        date: this.formDate(),
        crop: this.formCrop(),
      },
      new Date().toISOString(),
    );
    return issues.length > 0;
  });

  protected producerName(e: Expense | Pick<Expense, "producerId">): string {
    const p = this.store.state().producers.find((x) => x.id === e.producerId);
    return p ? fullName(p) : "";
  }

  protected producerCode(e: Expense): string {
    return this.store.state().producers.find((x) => x.id === e.producerId)?.code ?? "";
  }

  protected scoopName(id: string): string {
    return this.store.state().scoops.find((s) => s.id === id)?.name ?? id;
  }

  protected money(amount: number): string {
    return `${this.locale.formatNumber(amount)} FCFA`;
  }

  protected formatDay(iso: string): string {
    return this.locale.formatDate(iso, { day: "2-digit", month: "short", year: "numeric" });
  }

  protected countCat(c: ExpenseCategory): number {
    return this.searched().filter((e) => e.category === c).length;
  }

  protected splitPct(amount: number): number {
    const max = this.byCategory()[0]?.amount ?? 0;
    return max ? Math.max(2, (amount / max) * 100) : 0;
  }

  protected resetFilters(): void {
    this.q.set("");
    this.catFilter.set("all");
    this.cropFilter.set(ALL_CROPS);
  }

  protected pickProducer(p: Producer): void {
    this.formPid.set(p.id);
    this.formCrop.set(p.crops[0]?.crop ?? "");
    this.findProducer.set("");
  }

  protected submitExpense(): void {
    const p = this.formProducer();
    const cat = this.formCategory();
    if (!p || !cat || this.formInvalid()) return;
    const res = this.store.actions.recordExpense({
      producerId: p.id,
      crop: this.formCrop(),
      category: cat,
      amount: parseAmount(this.formAmount()),
      date: this.formDate(),
      label: this.formLabel(),
    });
    if (!res.ok) {
      this.toast.error(res.error as MessageKey);
      return;
    }
    this.toast.success("charges.form.done", {
      key: "charges.form.doneDetail",
      params: { name: fullName(p), amount: nf.format(parseAmount(this.formAmount())) },
    });
    this.recording.set(false);
    if (res.id) this.openId.set(res.id);
  }

  protected startVoid(id: string): void {
    this.voidTargetId.set(id);
    this.voidReason.set("");
    this.voidDialog.set(true);
  }

  protected submitVoid(): void {
    const id = this.voidTargetId();
    if (!id) return;
    const res = this.store.actions.voidExpense(id, this.voidReason());
    if (!res.ok) {
      this.toast.error(res.error as MessageKey);
      return;
    }
    this.toast.success("charges.void.done");
    this.voidDialog.set(false);
    this.openId.set(undefined);
  }

  protected exportCsv(): void {
    const rows = this.shown().map((e) => [
      e.date,
      this.producerName(e),
      e.crop,
      e.category,
      e.label,
      e.amount,
      e.by,
      e.voided ? "annulée" : "valide",
    ]);
    downloadCsv("charges.csv", [
      ["Date", "Producteur", "Culture", "Catégorie", "Libellé", "Montant (FCFA)", "Saisi par", "État"],
      ...rows,
    ]);
    this.toast.success("charges.exported", {
      key: "charges.exportedCount.autre",
      params: { count: rows.length },
    });
  }

  protected onSheetOpen(open: boolean): void {
    if (!open) this.openId.set(undefined);
  }
}

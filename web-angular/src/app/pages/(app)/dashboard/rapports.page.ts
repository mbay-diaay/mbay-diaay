import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  LucideAngularModule,
  ArrowLeft,
  BarChart3,
  Check,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Loader2,
  MapPin,
} from "lucide-angular";

import { downloadCsv, fmtDateTime, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { downloadWorkbook } from "@/lib/io/workbook";
import {
  REPORT_CATEGORIES,
  catalogueFor,
  scopeLabel,
  type GeneratedReport,
  type ReportCategory,
  type ReportId,
} from "@/lib/reports";
import { isConsolidated, scoopIdsOf, scopedReports } from "@/lib/scope";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { ToastService } from "../shared/toast.service";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";

const CAT_LABEL: Record<ReportCategory, MessageKey> = {
  producteurs: "rapports.cat.producteurs",
  agriculture: "rapports.cat.agriculture",
  finances: "rapports.cat.finances",
  gouvernance: "rapports.cat.gouvernance",
  qualite: "rapports.cat.qualite",
};

const PREVIEW_ROWS = 40;

type PeriodPreset = "campaign" | "h1" | "h2";
type CatFilter = "all" | ReportCategory;
/** 1 = périmètre, 2 = catalogue, 3 = résultat / aperçu. */
type Step = 1 | 2 | 3;

const fileName = (r: GeneratedReport, ext: string) =>
  `${r.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_${r.generatedAt.slice(0, 10)}.${ext}`;

/** Parcours complet : périmètre → choix → aperçu + export. */
@Component({
  selector: "app-rapports-page",
  imports: [
    FormsModule,
    LucideAngularModule,
    AppShellComponent,
    UiPageHeaderComponent,
  ],
  template: `
    <app-shell
      [perm]="['report.generate', 'report.read', 'report.download']"
      [area]="t()('rapports.area')"
    >
      <ui-page-header
        [title]="t()('rapports.title')"
        [description]="t()('rapports.description')"
      >
        <div actions class="flex items-center gap-2 text-primary">
          <lucide-angular [img]="icons.chart" class="size-5" aria-hidden />
        </div>
      </ui-page-header>

      <nav class="mb-5 flex flex-wrap gap-2" [attr.aria-label]="t()('rapports.title')">
        @for (s of steps; track s.id) {
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors"
            [class.border-primary]="step() === s.id"
            [class.bg-primary]="step() === s.id"
            [class.text-primary-foreground]="step() === s.id"
            [class.bg-primary-soft]="step() > s.id"
            [class.text-primary]="step() > s.id"
            [disabled]="(s.id === 2 && !scopeReady()) || (s.id === 3 && !preview())"
            (click)="goStep(s.id)"
          >
            @if (step() > s.id) {
              <lucide-angular [img]="icons.check" class="size-3.5" aria-hidden />
            }
            {{ t()(s.label) }}
          </button>
        }
      </nav>

      @if (step() === 1) {
        <section class="surface mb-4 p-5" aria-labelledby="rapports-step1">
          <h2 id="rapports-step1" class="text-lg font-semibold">{{ t()("rapports.step.1") }}</h2>
          <p class="mt-1 text-sm text-muted-foreground">{{ t()("rapports.step.1.desc") }}</p>

          @if (canGenerate()) {
            <div class="mt-4 flex flex-wrap items-end gap-3">
              <label class="grid min-w-[12rem] flex-1 gap-1 text-sm">
                <span class="font-medium">{{ t()("rapports.field.scoop") }}</span>
                <select
                  class="h-11 w-full rounded-md border border-input bg-background px-3"
                  [ngModel]="draftScoop()"
                  (ngModelChange)="draftScoop.set($event); markDirty()"
                >
                  <option value="">
                    {{
                      visibleScoops().length > 1
                        ? t()("rapports.field.allMine")
                        : appliedScopeName()
                    }}
                  </option>
                  @for (s of visibleScoops(); track s.id) {
                    @if (visibleScoops().length > 1) {
                      <option [value]="s.id">{{ s.name }}</option>
                    }
                  }
                </select>
              </label>
              <label class="grid min-w-[10rem] flex-1 gap-1 text-sm">
                <span class="font-medium">{{ t()("rapports.field.campaign") }}</span>
                <select
                  class="h-11 w-full rounded-md border border-input bg-background px-3"
                  [ngModel]="draftCampaign()"
                  (ngModelChange)="draftCampaign.set($event); markDirty()"
                >
                  <option value="">{{ t()("rapports.field.allCampaigns") }}</option>
                  @for (c of campaigns(); track c) {
                    <option [value]="c">{{ c }}</option>
                  }
                </select>
              </label>
              <label class="grid min-w-[10rem] flex-1 gap-1 text-sm">
                <span class="font-medium">{{ t()("rapports.field.period") }}</span>
                <select
                  class="h-11 w-full rounded-md border border-input bg-background px-3"
                  [ngModel]="draftPeriod()"
                  (ngModelChange)="draftPeriod.set($event); markDirty()"
                >
                  <option value="campaign">{{ t()("rapports.field.period.campaign") }}</option>
                  <option value="h1">{{ t()("rapports.field.period.h1") }}</option>
                  <option value="h2">{{ t()("rapports.field.period.h2") }}</option>
                </select>
              </label>
            </div>
            @if (dirty()) {
              <p class="mt-3 text-sm text-warning-fg">{{ t()("rapports.dirty") }}</p>
            }
            <div
              class="mt-4 flex flex-wrap items-start gap-2 rounded-md bg-primary-soft/60 px-3 py-2 text-sm"
            >
              <lucide-angular [img]="icons.pin" class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <div class="min-w-0">
                <p class="font-medium">{{ t()("rapports.applied", { scope: draftSummary() }) }}</p>
                <p class="mt-0.5 text-xs text-muted-foreground">{{ t()("rapports.appliedHint") }}</p>
              </div>
            </div>
            <div class="mt-5 flex justify-end">
              <button
                type="button"
                class="inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                (click)="applyAndContinue()"
              >
                {{ t()("rapports.applyNext") }}
              </button>
            </div>
          } @else {
            <p class="mt-4 text-sm text-muted-foreground">{{ t()("rapports.noGenerate") }}</p>
            @if (history().length) {
              <button
                type="button"
                class="mt-3 text-sm font-semibold text-primary hover:underline"
                (click)="goStep(3)"
              >
                {{ t()("rapports.history.title") }}
              </button>
            }
          }
        </section>
      }

      @if (step() === 2 && canGenerate()) {
        <section class="mb-4" aria-labelledby="rapports-step2">
          <div class="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 id="rapports-step2" class="text-lg font-semibold">{{ t()("rapports.step.2") }}</h2>
              <p class="mt-1 text-sm text-muted-foreground">{{ t()("rapports.step.2.desc") }}</p>
            </div>
            <button
              type="button"
              class="inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm"
              (click)="goStep(1)"
            >
              <lucide-angular [img]="icons.back" class="size-4" aria-hidden />
              {{ t()("rapports.result.backScope") }}
            </button>
          </div>

          <div
            class="mb-3 flex flex-wrap items-center gap-2 rounded-md bg-primary-soft/50 px-3 py-2 text-sm"
          >
            <lucide-angular [img]="icons.pin" class="size-4 text-primary" aria-hidden />
            <span class="font-medium">{{ t()("rapports.applied", { scope: appliedSummary() }) }}</span>
          </div>

          <div
            class="mb-4 flex flex-wrap gap-1 rounded-md border bg-muted/40 p-1"
            role="tablist"
            [attr.aria-label]="t()('rapports.cat.all')"
          >
            <button
              type="button"
              role="tab"
              class="rounded px-2.5 py-1.5 text-xs font-medium"
              [class.bg-background]="category() === 'all'"
              [class.shadow-sm]="category() === 'all'"
              [attr.aria-selected]="category() === 'all'"
              (click)="setCategory('all')"
            >
              {{ t()("rapports.cat.all") }}
              <span class="tabular-nums text-muted-foreground">({{ catalogue().length }})</span>
            </button>
            @for (c of categories; track c) {
              <button
                type="button"
                role="tab"
                class="rounded px-2.5 py-1.5 text-xs font-medium"
                [class.bg-background]="category() === c"
                [class.shadow-sm]="category() === c"
                [attr.aria-selected]="category() === c"
                (click)="setCategory(c)"
              >
                {{ t()(catLabel(c)) }}
                <span class="tabular-nums text-muted-foreground">({{ countIn(c) }})</span>
              </button>
            }
          </div>

          @if (filtered().length === 0) {
            <p class="surface p-5 text-sm text-muted-foreground">{{ t()("rapports.emptyCat") }}</p>
          } @else {
            <div
              class="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
              role="listbox"
              [attr.aria-label]="t()('rapports.title')"
            >
              @for (r of filtered(); track r.id) {
                <button
                  type="button"
                  role="option"
                  class="surface flex flex-col p-4 text-left transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  [class.border-primary]="selectedId() === r.id"
                  [class.ring-1]="selectedId() === r.id"
                  [class.ring-primary]="selectedId() === r.id"
                  [attr.aria-selected]="selectedId() === r.id"
                  [attr.aria-label]="t()('rapports.select') + ' — ' + t()(r.nameKey)"
                  (click)="selectedId.set(r.id)"
                >
                  <div class="flex items-start gap-3">
                    <span
                      class="grid size-9 shrink-0 place-items-center rounded-md bg-primary-soft text-primary"
                    >
                      <lucide-angular [img]="icons.file" class="size-4" aria-hidden />
                    </span>
                    <div class="min-w-0">
                      <div class="font-semibold">{{ t()(r.nameKey) }}</div>
                      <p class="mt-1 text-sm text-muted-foreground">{{ t()(r.descriptionKey) }}</p>
                    </div>
                  </div>
                </button>
              }
            </div>
          }

          <div
            class="sticky bottom-3 z-30 flex flex-wrap items-center justify-between gap-3 rounded-md border bg-card p-3 shadow-md"
          >
            <div class="min-w-0 text-sm">
              @if (selected(); as sel) {
                <span class="text-muted-foreground">{{ t()("rapports.selected") }} · </span>
                <span class="font-semibold">{{ t()(sel.nameKey) }}</span>
              } @else {
                <span class="text-muted-foreground">{{ t()("rapports.generateNeedSelect") }}</span>
              }
            </div>
            <button
              type="button"
              class="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              [disabled]="!selectedId() || !!busy()"
              (click)="run()"
            >
              @if (busy()) {
                <lucide-angular [img]="icons.loader" class="size-4 animate-spin" aria-hidden />
                {{ t()("rapports.generating") }}
              } @else {
                {{ t()("rapports.generate") }}
              }
            </button>
          </div>
        </section>
      }

      @if (step() === 3) {
        <section class="mb-6" aria-labelledby="rapports-step3">
          <div class="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 id="rapports-step3" class="text-lg font-semibold">{{ t()("rapports.step.3") }}</h2>
              <p class="mt-1 text-sm text-muted-foreground">{{ t()("rapports.step.3.desc") }}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              @if (canGenerate()) {
                <button
                  type="button"
                  class="inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm"
                  (click)="goStep(2)"
                >
                  <lucide-angular [img]="icons.back" class="size-4" aria-hidden />
                  {{ t()("rapports.result.backCatalogue") }}
                </button>
              }
              <button
                type="button"
                class="inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm"
                (click)="goStep(1)"
              >
                {{ t()("rapports.result.backScope") }}
              </button>
            </div>
          </div>

          @if (preview(); as r) {
            <div class="surface mb-4 p-5">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div class="min-w-0">
                  <h3 class="text-base font-semibold">{{ r.name }}</h3>
                  <p class="mt-1 text-sm text-muted-foreground">
                    {{ r.scopeLabel }}
                  </p>
                  <p class="mt-1 text-xs text-muted-foreground">
                    {{
                      t()("rapports.result.meta", {
                        rows: nf.format(r.rows.length),
                        when: fmtDateTime(r.generatedAt),
                        who: r.generatedBy,
                      })
                    }}
                  </p>
                </div>
                @if (canDownload()) {
                  <div class="flex flex-wrap gap-2">
                    <button
                      type="button"
                      class="inline-flex h-10 items-center gap-1.5 rounded-md border px-3 text-sm font-medium"
                      (click)="download(r, 'CSV')"
                    >
                      <lucide-angular [img]="icons.download" class="size-4" aria-hidden />
                      {{ t()("rapports.csv") }}
                    </button>
                    <button
                      type="button"
                      class="inline-flex h-10 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                      (click)="download(r, 'Excel')"
                    >
                      <lucide-angular [img]="icons.sheet" class="size-4" aria-hidden />
                      {{ t()("rapports.excel") }}
                    </button>
                  </div>
                } @else {
                  <span class="text-xs text-muted-foreground">{{ t()("rapports.downloadDenied") }}</span>
                }
              </div>
            </div>

            <div class="surface overflow-hidden">
              <div class="border-b px-4 py-3">
                <h4 class="text-sm font-semibold">{{ t()("rapports.result.preview") }}</h4>
                @if (r.rows.length > previewLimit) {
                  <p class="mt-0.5 text-xs text-muted-foreground">
                    {{
                      t()("rapports.result.truncated", {
                        shown: nf.format(previewLimit),
                        total: nf.format(r.rows.length),
                      })
                    }}
                  </p>
                }
              </div>
              @if (r.rows.length === 0) {
                <p class="p-5 text-sm text-muted-foreground">{{ t()("rapports.result.empty") }}</p>
              } @else {
                <div class="overflow-x-auto">
                  <table class="w-full min-w-[40rem] text-left text-sm">
                    <thead class="border-b bg-muted text-xs text-muted-foreground">
                      <tr>
                        @for (h of r.header; track h) {
                          <th class="whitespace-nowrap px-3 py-2.5 font-semibold">{{ h }}</th>
                        }
                      </tr>
                    </thead>
                    <tbody class="divide-y">
                      @for (row of previewRows(r); track $index) {
                        <tr class="hover:bg-muted/40">
                          @for (cell of row; track $index) {
                            <td class="whitespace-nowrap px-3 py-2 tabular-nums">{{ cell }}</td>
                          }
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              }
            </div>
          } @else {
            <p class="surface p-5 text-sm text-muted-foreground">{{ t()("rapports.history.empty") }}</p>
          }
        </section>
      }

      @if (canRead() && step() !== 1) {
        <section class="mt-2" aria-labelledby="rapports-hist">
          <h2 id="rapports-hist" class="mb-3 text-lg font-semibold">
            {{ t()("rapports.history.title") }}
          </h2>
          @if (history().length === 0) {
            <p class="surface p-5 text-sm text-muted-foreground">{{ t()("rapports.history.empty") }}</p>
          } @else {
            <ul class="surface divide-y">
              @for (r of history(); track r.id) {
                <li class="flex flex-wrap items-center gap-3 p-4">
                  <div class="min-w-0 flex-1">
                    <div class="font-medium">{{ r.name }}</div>
                    <div class="text-sm text-muted-foreground">
                      {{ r.scopeLabel }} · {{ fmtDateTime(r.generatedAt) }} ·
                      {{ t()("rapports.history.rows", { rows: nf.format(r.rows.length) }) }}
                    </div>
                  </div>
                  <button
                    type="button"
                    class="inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm"
                    (click)="openResult(r)"
                  >
                    <lucide-angular [img]="icons.eye" class="size-4" aria-hidden />
                    {{ t()("rapports.result.open") }}
                  </button>
                  @if (canDownload()) {
                    <button
                      type="button"
                      class="inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm"
                      (click)="download(r, 'CSV')"
                    >
                      <lucide-angular [img]="icons.download" class="size-4" aria-hidden />
                      {{ t()("rapports.csv") }}
                    </button>
                    <button
                      type="button"
                      class="inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm"
                      (click)="download(r, 'Excel')"
                    >
                      <lucide-angular [img]="icons.sheet" class="size-4" aria-hidden />
                      {{ t()("rapports.excel") }}
                    </button>
                  }
                </li>
              }
            </ul>
          }
        </section>
      }

      <p class="mt-4 text-xs text-muted-foreground">{{ t()("rapports.foot") }}</p>
    </app-shell>
  `,
})
export default class RapportsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly toast = inject(ToastService);
  protected readonly t = this.locale.t;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly nf = nf;
  protected readonly categories = REPORT_CATEGORIES;
  protected readonly previewLimit = PREVIEW_ROWS;
  protected readonly steps = [
    { id: 1 as const, label: "rapports.step.1" as const },
    { id: 2 as const, label: "rapports.step.2" as const },
    { id: 3 as const, label: "rapports.step.3" as const },
  ];
  protected readonly icons = {
    chart: BarChart3,
    file: FileText,
    pin: MapPin,
    loader: Loader2,
    download: Download,
    sheet: FileSpreadsheet,
    back: ArrowLeft,
    eye: Eye,
    check: Check,
  };

  protected readonly step = signal<Step>(1);
  protected readonly draftScoop = signal("");
  protected readonly draftCampaign = signal("");
  protected readonly draftPeriod = signal<PeriodPreset>("campaign");
  protected readonly appliedScoop = signal("");
  protected readonly appliedCampaign = signal("");
  protected readonly appliedPeriod = signal<PeriodPreset>("campaign");
  protected readonly scopeReady = signal(false);
  protected readonly dirty = signal(false);
  protected readonly category = signal<CatFilter>("all");
  protected readonly selectedId = signal<ReportId | null>(null);
  protected readonly busy = signal(false);
  protected readonly preview = signal<GeneratedReport | null>(null);

  protected readonly session = computed(() => this.store.state().session);

  protected readonly canGenerate = computed(() => this.store.can("report.generate"));
  protected readonly canRead = computed(() => this.store.can("report.read"));
  protected readonly canDownload = computed(() => this.store.can("report.download"));

  protected readonly campaigns = computed(() =>
    [...new Set(this.store.state().plots.map((p) => p.campaign))].sort(),
  );

  protected readonly visibleScoops = computed(() => {
    const session = this.session();
    const all = this.store.state().scoops;
    if (isConsolidated(session)) return all;
    const ids = scoopIdsOf(session);
    return all.filter((s) => ids.has(s.id));
  });

  protected readonly catalogue = computed(() => catalogueFor(this.session()));

  protected readonly filtered = computed(() => {
    const cat = this.category();
    const all = this.catalogue();
    if (cat === "all") return all;
    return all.filter((r) => r.category === cat);
  });

  protected readonly selected = computed(() => {
    const id = this.selectedId();
    if (!id) return undefined;
    return this.catalogue().find((r) => r.id === id);
  });

  protected readonly history = computed(() => {
    if (!this.canRead()) return [];
    return scopedReports(this.store.state().reports, this.session());
  });

  protected readonly appliedScopeName = computed(() =>
    scopeLabel(this.session(), this.store.state().scoops),
  );

  protected readonly draftSummary = computed(() =>
    this.summarize(this.draftScoop(), this.draftCampaign(), this.draftPeriod()),
  );

  protected readonly appliedSummary = computed(() =>
    this.summarize(this.appliedScoop(), this.appliedCampaign(), this.appliedPeriod()),
  );

  protected catLabel(cat: ReportCategory): MessageKey {
    return CAT_LABEL[cat];
  }

  protected countIn(cat: ReportCategory): number {
    return this.catalogue().filter((r) => r.category === cat).length;
  }

  protected previewRows(r: GeneratedReport): (string | number)[][] {
    return r.rows.slice(0, PREVIEW_ROWS);
  }

  protected setCategory(cat: CatFilter): void {
    this.category.set(cat);
    const id = this.selectedId();
    if (!id) return;
    const stillVisible =
      cat === "all"
        ? this.catalogue().some((x) => x.id === id)
        : this.catalogue().some((x) => x.id === id && x.category === cat);
    if (!stillVisible) this.selectedId.set(null);
  }

  protected markDirty(): void {
    this.dirty.set(true);
    this.scopeReady.set(false);
  }

  protected applyFilters(): void {
    this.appliedScoop.set(this.draftScoop());
    this.appliedCampaign.set(this.draftCampaign());
    this.appliedPeriod.set(this.draftPeriod());
    this.dirty.set(false);
    this.scopeReady.set(true);
  }

  protected applyAndContinue(): void {
    this.applyFilters();
    this.step.set(2);
  }

  protected goStep(s: Step): void {
    if (s === 2 && !this.scopeReady() && this.canGenerate()) {
      this.applyFilters();
    }
    if (s === 3 && !this.preview()) {
      const first = this.history()[0];
      if (first) this.preview.set(first);
      else if (this.canGenerate()) {
        this.step.set(this.scopeReady() ? 2 : 1);
        return;
      }
    }
    this.step.set(s);
  }

  protected openResult(r: GeneratedReport): void {
    this.preview.set(r);
    this.step.set(3);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  protected run(): void {
    const id = this.selectedId();
    if (!id || this.busy()) return;
    if (this.dirty() || !this.scopeReady()) this.applyFilters();
    this.busy.set(true);
    window.setTimeout(() => {
      const res = this.store.actions.generateReport(id, {
        scoopId: this.appliedScoop() || undefined,
        campaign: this.appliedCampaign() || undefined,
      });
      this.busy.set(false);
      if (!res.ok) {
        this.toast.error(res.error as MessageKey);
        return;
      }
      this.preview.set(res.report);
      this.step.set(3);
      this.toast.success(
        "rapports.ready",
        { key: "rapports.readyScope", params: { scope: res.report.scopeLabel } },
        { name: res.report.name },
      );
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 500);
  }

  protected async download(r: GeneratedReport, format: "CSV" | "Excel"): Promise<void> {
    const res = this.store.actions.downloadReport(r.id, format);
    if (!res.ok) {
      this.toast.error(res.error as MessageKey);
      return;
    }
    const head = [r.name, `Périmètre : ${r.scopeLabel}`, `Édité le ${r.generatedAt.slice(0, 10)}`];
    if (format === "CSV") {
      downloadCsv(fileName(r, "csv"), [head, r.header, ...r.rows]);
      return;
    }
    await downloadWorkbook(fileName(r, "xlsx"), [
      { name: "Rapport", rows: [head, r.header, ...r.rows] },
    ]);
  }

  private summarize(scoopId: string, campaign: string, period: PeriodPreset): string {
    const scoops = this.store.state().scoops;
    const scoopPart = scoopId
      ? (scoops.find((s) => s.id === scoopId)?.name ?? scoopId)
      : this.visibleScoops().length > 1
        ? `${this.visibleScoops().length} coopératives`
        : this.appliedScopeName();
    const campaignPart = campaign || this.t()("rapports.field.allCampaigns");
    const periodKey =
      period === "h1"
        ? "rapports.field.period.h1"
        : period === "h2"
          ? "rapports.field.period.h2"
          : "rapports.field.period.campaign";
    return `${scoopPart} · ${campaignPart} · ${this.t()(periodKey)}`;
  }
}

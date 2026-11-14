import { Component, DOCUMENT, computed, inject, signal } from "@angular/core";

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
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import {
  IconComponent,
  PaginationComponent,
  SelectComponent,
  SnackbarService,
  type IconName,
  type SelectOption,
} from "@shared/ui";
import { createPager } from "@shared/pager";

/** Libellé, icône et couleurs (états de la charte V2) de chaque catégorie de rapport. */
const CATEGORY: Record<
  ReportCategory,
  { label: MessageKey; icon: IconName; bg: string; fg: string }
> = {
  producteurs: {
    label: "rapports.cat.producteurs",
    icon: "agriculture",
    bg: "var(--v2-sauge)",
    fg: "var(--v2-foret)",
  },
  agriculture: {
    label: "rapports.cat.agriculture",
    icon: "potted_plant",
    bg: "var(--v2-culture-bg)",
    fg: "var(--v2-culture-fg)",
  },
  finances: {
    label: "rapports.cat.finances",
    icon: "account_balance_wallet",
    bg: "var(--v2-attente-bg)",
    fg: "var(--v2-attente-fg)",
  },
  gouvernance: {
    label: "rapports.cat.gouvernance",
    icon: "gavel",
    bg: "var(--v2-info-bg)",
    fg: "var(--v2-info-fg)",
  },
  qualite: {
    label: "rapports.cat.qualite",
    icon: "verified",
    bg: "var(--v2-succes-bg)",
    fg: "var(--v2-succes-fg)",
  },
};

const PREVIEW_ROWS = 40;

type PeriodPreset = "campaign" | "h1" | "h2";
type CatFilter = "all" | ReportCategory;

const fileName = (r: GeneratedReport, ext: string) =>
  `${r.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_${r.generatedAt.slice(0, 10)}.${ext}`;

/**
 * Centre de rapports (charte V2) — un seul écran :
 * catalogue à gauche (filtres par catégorie, cartes), panneau « Configurer » collant à droite
 * (coopérative, campagne, période, génération), puis résultat (aperçu + export CSV/Excel)
 * et rapports récents. Droits : `report.generate` / `report.read` / `report.download`.
 */
@Component({
  selector: "app-rapports-page",
  imports: [PaginationComponent, AppShellComponent, IconComponent, SelectComponent],
  styles: `
    .mono {
      font-family: var(--v2-font-mono);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .card {
      border-radius: 24px;
      border: 1px solid var(--v2-bord-carte);
      background: var(--v2-blanc);
    }
    .sub {
      font-size: 13px;
      font-weight: 500;
      color: var(--v2-gris-texte);
    }
    /* Onglets de catégorie : une seule ligne pleine largeur ; défilement horizontal si l'écran est étroit. */
    /* Catégories sur UNE ligne ; sur petit écran, elles défilent horizontalement. */
    .tabs {
      display: flex;
      gap: 2px;
      overflow-x: auto;
      scrollbar-width: none;
      scroll-snap-type: x proximity;
      border-radius: 14px;
      background: var(--v2-creme);
      padding: 4px;
    }
    .tabs::-webkit-scrollbar {
      display: none;
    }
    .tab {
      display: inline-flex;
      flex: 1 0 auto;
      scroll-snap-align: start;
      justify-content: center;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
      border-radius: 10px;
      padding: 9px 7px;
      font-size: 13px;
      font-weight: 700;
      color: var(--v2-gris-texte);
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        color 0.15s ease;
    }
    .tab:hover {
      color: var(--v2-encre);
    }
    .tab.on {
      background: var(--v2-blanc);
      color: var(--v2-foret);
      box-shadow: 0 1px 3px color-mix(in oklab, var(--v2-foret) 15%, transparent);
    }
    .tab .n {
      border-radius: 999px;
      padding: 0 6px;
      font-size: 11px;
      font-variant-numeric: tabular-nums;
      background: color-mix(in oklab, var(--v2-gris-trait) 45%, transparent);
      color: var(--v2-ardoise);
    }
    .tab.on .n {
      background: var(--v2-foret);
      color: var(--v2-blanc);
    }
    .tab:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    .stat {
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }
    .stat:hover {
      transform: translateY(-2px);
      box-shadow: var(--v2-ombre-flottant);
    }
    .hero {
      border-color: var(--v2-foret);
      background: var(--v2-foret);
      color: var(--v2-blanc);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border-radius: 999px;
      padding: 3px 10px 3px 8px;
      font-size: 12px;
      font-weight: 800;
      white-space: nowrap;
    }
    .badge-hot {
      position: absolute;
      right: 14px;
      top: 14px;
      background: var(--v2-foret);
      color: var(--v2-citron);
    }
    .watermark {
      pointer-events: none;
      position: absolute;
      right: -18px;
      bottom: -26px;
      opacity: 0.12;
      transform: rotate(-12deg);
      transition:
        transform 0.35s ease,
        opacity 0.35s ease;
    }
    .hero .watermark {
      opacity: 0.16;
    }
    .stat:hover .watermark,
    .report:hover .watermark {
      transform: rotate(-4deg) scale(1.06);
      opacity: 0.18;
    }
    .wm-report {
      right: -14px;
      bottom: auto;
      top: -18px;
      opacity: 0.09;
    }
    /* Recherche + catégories sur UNE ligne ; les onglets défilent horizontalement si l'écran est étroit. */
    .toolbar {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      border-radius: 20px;
    }
    .search {
      display: flex;
      min-width: 0;
      height: 48px;
      align-items: center;
      gap: 10px;
      border-radius: 14px;
      background: var(--v2-creme);
      padding: 0 14px;
      color: var(--v2-gris-texte);
    }
    .search:focus-within {
      box-shadow: inset 0 0 0 2px var(--v2-foret);
    }
    .search input {
      min-width: 0;
      flex: 1;
      background: transparent;
      font-size: 15px;
      font-weight: 600;
      color: var(--v2-encre);
      outline: none;
    }
    .search input::placeholder {
      color: var(--v2-gris-texte);
      font-weight: 500;
    }
    .report {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 20px;
      text-align: left;
      cursor: pointer;
      transition:
        border-color 0.15s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;
    }
    .report:hover {
      border-color: var(--v2-gris-trait);
      transform: translateY(-2px);
      box-shadow: var(--v2-ombre-flottant);
    }
    .report.on {
      border: 2px solid var(--v2-foret);
      padding: 19px;
      box-shadow: var(--v2-halo);
    }
    .tick {
      position: absolute;
      right: 16px;
      top: 16px;
      display: grid;
      height: 28px;
      width: 28px;
      place-items: center;
      border-radius: 999px;
      background: var(--v2-foret);
      color: var(--v2-citron);
    }
    .label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--v2-ardoise);
    }
    .seg {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 4px;
      border-radius: 16px;
      padding: 4px;
      background: var(--v2-creme);
    }
    .seg button {
      border-radius: 12px;
      padding: 10px 6px;
      font-size: 13px;
      font-weight: 700;
      color: var(--v2-gris-texte);
      cursor: pointer;
    }
    .seg button.on {
      background: var(--v2-blanc);
      color: var(--v2-foret);
      box-shadow: 0 1px 3px color-mix(in oklab, var(--v2-foret) 15%, transparent);
    }
    .btn {
      display: inline-flex;
      height: 44px;
      align-items: center;
      gap: 8px;
      border-radius: 14px;
      padding: 0 14px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }
    .btn-ghost {
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
      color: var(--v2-encre);
    }
    .btn-ghost:hover {
      border-color: var(--v2-gris-texte);
    }
    .btn-forest {
      background: var(--v2-foret);
      color: var(--v2-blanc);
    }
    .btn-forest:hover {
      background: var(--v2-foret-clair);
    }
    .generate {
      display: flex;
      height: 60px;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-radius: 20px;
      background: var(--v2-foret);
      padding: 0 8px 0 22px;
      font-size: 16px;
      font-weight: 800;
      color: var(--v2-blanc);
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .generate:hover {
      background: var(--v2-foret-clair);
    }
    .generate:disabled {
      background: var(--v2-lin);
      color: var(--v2-gris-texte);
      cursor: not-allowed;
    }
    .chip {
      display: grid;
      height: 44px;
      width: 44px;
      place-items: center;
      border-radius: 14px;
      background: var(--v2-citron);
      color: var(--v2-foret);
    }
    .generate:disabled .chip {
      background: var(--v2-gris-trait);
      color: var(--v2-blanc);
    }
    .spin {
      animation: spin 0.9s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    .report:focus-visible,
    .seg button:focus-visible,
    .btn:focus-visible,
    .generate:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    @media (prefers-reduced-motion: reduce) {
      .watermark,
      .stat:hover .watermark,
      .report:hover .watermark {
        transition: none;
        transform: rotate(-12deg);
      }
      .report,
      .report:hover {
        transition: none;
        transform: none;
      }
      .spin {
        animation: none;
      }
    }
  `,
  template: `
    <app-shell
      [perm]="['report.generate', 'report.read', 'report.download']"
      [area]="t()('rapports.area')"
    >
      <!-- ───── En-tête ───── -->
      <header class="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("rapports.area") }}</p>
          <h1
            class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
          >
            {{ t()("rapports.studio.title") }}
          </h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
            {{ t()("rapports.studio.subtitle") }}
          </p>
        </div>
      </header>

      <!-- ───── Statistiques ───── -->
      <section
        class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        [attr.aria-label]="t()('rapports.studio.stats')"
      >
        @for (stat of stats(); track stat.label; let first = $first) {
          <div
            class="card stat relative flex flex-col overflow-hidden p-5"
            [class.hero]="first"
            [style.background]="first ? null : stat.bg"
            [style.border-color]="first ? null : 'transparent'"
          >
            <!-- Filigrane : grande icône dans le coin -->
            <span
              class="watermark"
              [style.color]="first ? 'var(--v2-citron)' : stat.fg"
              aria-hidden="true"
            >
              <ui-icon [name]="stat.icon" [size]="120" />
            </span>
            <div class="relative flex items-center justify-between gap-3">
              <span
                class="text-[14px] font-bold"
                [style.color]="
                  first ? 'color-mix(in oklab, var(--v2-blanc) 78%, transparent)' : stat.fg
                "
                >{{ stat.label }}</span
              >
              <span
                class="grid size-10 place-items-center rounded-[12px]"
                [style.background]="first ? 'var(--v2-citron)' : stat.fg"
                [style.color]="first ? 'var(--v2-foret)' : stat.bg"
              >
                <ui-icon [name]="stat.icon" [size]="20" />
              </span>
            </div>
            <span
              class="relative mt-3 truncate font-extrabold leading-none tracking-[-0.03em] tabular-nums"
              [style.font-size.px]="stat.small ? 22 : 34"
              [style.color]="first ? null : stat.fg"
              >{{ stat.value }}</span
            >
            <span
              class="relative mt-2 truncate text-[13px] font-medium"
              [style.color]="
                first ? 'color-mix(in oklab, var(--v2-blanc) 65%, transparent)' : stat.fg
              "
              [style.opacity]="first ? null : 0.75"
              >{{ stat.sub }}</span
            >
          </div>
        }
      </section>

      @if (canGenerate()) {
        <div class="mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <!-- ───── Catalogue ───── -->
          <section aria-labelledby="catalogue-title">
            <h2 id="catalogue-title" class="sr-only">{{ t()("rapports.studio.catalogue") }}</h2>
            <div class="toolbar card">
              <label class="search">
                <ui-icon name="search" [size]="20" />
                <input
                  type="search"
                  [placeholder]="t()('rapports.studio.search')"
                  [attr.aria-label]="t()('rapports.studio.search')"
                  [value]="query()"
                  (input)="query.set($any($event.target).value)"
                />
              </label>
              <div class="tabs" role="tablist" [attr.aria-label]="t()('rapports.studio.category')">
                @for (option of categoryOptions(); track option.value) {
                  <button
                    type="button"
                    role="tab"
                    class="tab"
                    [class.on]="category() === option.value"
                    [attr.aria-selected]="category() === option.value"
                    (click)="setCategory($any(option.value))"
                  >
                    <ui-icon [name]="option.icon!" [size]="16" />{{
                      option.value === "all" ? t()("rapports.studio.all") : option.label
                    }}<span class="n">{{ option.hint }}</span>
                  </button>
                }
              </div>
            </div>

            @if (filtered().length === 0) {
              <p class="card sub mt-5 p-6">{{ t()("rapports.emptyCat") }}</p>
            } @else {
              <div
                class="mt-5 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3"
                role="listbox"
                [attr.aria-label]="t()('rapports.studio.catalogue')"
              >
                @for (report of reportPager.items(); track report.id) {
                  <button
                    type="button"
                    role="option"
                    class="card report overflow-hidden"
                    [class.on]="selectedId() === report.id"
                    [attr.aria-selected]="selectedId() === report.id"
                    (click)="selectedId.set(report.id)"
                  >
                    <span
                      class="watermark wm-report"
                      [style.color]="cat(report.category).fg"
                      aria-hidden="true"
                    >
                      <ui-icon [name]="cat(report.category).icon" [size]="96" />
                    </span>
                    @if (selectedId() === report.id) {
                      <span class="tick" aria-hidden="true"
                        ><ui-icon name="check" [size]="18"
                      /></span>
                    } @else if (report.id === popularId()) {
                      <span
                        class="badge badge-hot"
                        [attr.title]="
                          t()('rapports.studio.popularHint', { count: usage().get(report.id) ?? 0 })
                        "
                      >
                        <ui-icon name="north_east" [size]="14" />{{
                          t()("rapports.studio.popular")
                        }}
                      </span>
                    }
                    <span
                      class="relative grid size-12 place-items-center rounded-[14px]"
                      [style.background]="cat(report.category).fg"
                      [style.color]="cat(report.category).bg"
                    >
                      <ui-icon [name]="cat(report.category).icon" [size]="24" />
                    </span>
                    <span class="relative min-w-0">
                      <span
                        class="block pr-8 text-[16px] font-extrabold leading-snug tracking-[-0.01em]"
                        >{{ t()(report.nameKey) }}</span
                      >
                      <span class="sub mt-1 block">{{ t()(report.descriptionKey) }}</span>
                    </span>
                    <span
                      class="relative mt-auto flex items-center justify-between gap-2 border-t pt-3"
                      style="border-color: var(--v2-separateur)"
                    >
                      <span
                        class="badge"
                        [style.background]="cat(report.category).bg"
                        [style.color]="cat(report.category).fg"
                      >
                        <ui-icon [name]="cat(report.category).icon" [size]="14" />{{
                          t()(cat(report.category).label)
                        }}
                      </span>
                      <span
                        class="inline-flex items-center gap-1 text-[12px] font-bold"
                        style="color: var(--v2-gris-texte)"
                      >
                        <ui-icon name="table_view" [size]="15" />CSV · Excel
                      </span>
                    </span>
                  </button>
                }
              </div>
              <ui-pagination [pager]="reportPager" />
            }
          </section>

          <!-- ───── Configurer ───── -->
          <aside class="card p-6 lg:sticky lg:top-24" aria-labelledby="config-title">
            <div class="flex items-center gap-3">
              <span
                class="grid size-11 place-items-center rounded-[14px]"
                style="background: var(--v2-foret); color: var(--v2-citron)"
              >
                <ui-icon name="tune" [size]="22" />
              </span>
              <h2 id="config-title" class="text-[18px] font-extrabold tracking-[-0.02em]">
                {{ t()("rapports.studio.configure") }}
              </h2>
            </div>

            <div class="mt-5 rounded-[16px] p-4" style="background: var(--v2-creme)">
              <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("rapports.selected") }}</p>
              @if (selected(); as selectedReport) {
                <p class="mt-1 flex items-center gap-2 text-[15px] font-extrabold">
                  <ui-icon
                    [name]="cat(selectedReport.category).icon"
                    [size]="18"
                    [style.color]="cat(selectedReport.category).fg"
                  />
                  {{ t()(selectedReport.nameKey) }}
                </p>
              } @else {
                <p class="sub mt-1">{{ t()("rapports.generateNeedSelect") }}</p>
              }
            </div>

            <div class="mt-5 space-y-4">
              <div class="space-y-2">
                <span class="label">{{ t()("rapports.field.scoop") }}</span>
                <ui-select
                  [options]="scoopOptions()"
                  [value]="scoop()"
                  (valueChange)="scoop.set($event)"
                  [label]="t()('rapports.field.scoop')"
                />
              </div>
              <div class="space-y-2">
                <span class="label">{{ t()("rapports.field.campaign") }}</span>
                <ui-select
                  [options]="campaignOptions()"
                  [value]="campaign()"
                  (valueChange)="campaign.set($event)"
                  [label]="t()('rapports.field.campaign')"
                />
              </div>
              <div class="space-y-2">
                <span class="label" id="period-label">{{ t()("rapports.field.period") }}</span>
                <div class="seg" role="radiogroup" aria-labelledby="period-label">
                  @for (periodOption of periods; track periodOption.id) {
                    <button
                      type="button"
                      role="radio"
                      [class.on]="period() === periodOption.id"
                      [attr.aria-checked]="period() === periodOption.id"
                      (click)="period.set(periodOption.id)"
                    >
                      {{ t()(periodOption.label) }}
                    </button>
                  }
                </div>
              </div>
            </div>

            <p class="sub mt-5 flex items-start gap-2">
              <ui-icon name="location_on" [size]="16" class="mt-0.5" />
              <span>{{ summary() }}</span>
            </p>

            <button
              type="button"
              class="generate mt-5"
              [disabled]="!selectedId() || busy()"
              (click)="run()"
            >
              <span>{{
                busy() ? t()("rapports.generating") : t()("rapports.studio.generate")
              }}</span>
              <span class="chip" aria-hidden="true">
                <ui-icon
                  [name]="busy() ? 'progress_activity' : 'arrow_forward'"
                  [size]="22"
                  [class.spin]="busy()"
                />
              </span>
            </button>
          </aside>
        </div>
      } @else {
        <p class="card sub mt-8 flex items-center gap-3 p-6">
          <ui-icon name="visibility" [size]="20" />{{ t()("rapports.noGenerate") }}
        </p>
      }

      <!-- ───── Résultat ───── -->
      @if (preview(); as previewReport) {
        <section
          id="rapport-resultat"
          class="card mt-8 overflow-hidden"
          aria-labelledby="result-title"
        >
          <div
            class="flex flex-wrap items-start justify-between gap-4 p-6"
            style="background: var(--v2-foret); color: var(--v2-blanc)"
          >
            <div class="min-w-0">
              <p class="mono" style="color: var(--v2-citron)">{{ t()("rapports.result.title") }}</p>
              <h2
                id="result-title"
                class="mt-1 text-[24px] font-extrabold leading-tight tracking-[-0.02em]"
              >
                {{ previewReport.name }}
              </h2>
              <p
                class="mt-1 text-[14px] font-medium"
                style="color: color-mix(in oklab, var(--v2-blanc) 75%, transparent)"
              >
                {{ previewReport.scopeLabel }}
              </p>
              <p
                class="mt-1 text-[13px] font-medium"
                style="color: color-mix(in oklab, var(--v2-blanc) 60%, transparent)"
              >
                {{
                  t()("rapports.result.meta", {
                    rows: nf.format(previewReport.rows.length),
                    when: fmtDateTime(previewReport.generatedAt),
                    who: previewReport.generatedBy,
                  })
                }}
              </p>
            </div>
            @if (canDownload()) {
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  class="btn btn-ghost"
                  (click)="download(previewReport, 'CSV')"
                >
                  <ui-icon name="download" [size]="18" />{{ t()("rapports.csv") }}
                </button>
                <button
                  type="button"
                  class="btn"
                  style="background: var(--v2-citron); color: var(--v2-foret)"
                  (click)="download(previewReport, 'Excel')"
                >
                  <ui-icon name="table_view" [size]="18" />{{ t()("rapports.excel") }}
                </button>
              </div>
            } @else {
              <span
                class="text-[13px] font-semibold"
                style="color: color-mix(in oklab, var(--v2-blanc) 70%, transparent)"
                >{{ t()("rapports.downloadDenied") }}</span
              >
            }
          </div>

          <div class="flex items-center justify-between gap-3 px-6 py-4">
            <h3 class="text-[16px] font-extrabold">{{ t()("rapports.result.preview") }}</h3>
            @if (previewReport.rows.length > previewLimit) {
              <span class="sub">{{
                t()("rapports.result.truncated", {
                  shown: nf.format(previewLimit),
                  total: nf.format(previewReport.rows.length),
                })
              }}</span>
            }
          </div>
          @if (previewReport.rows.length === 0) {
            <p class="sub px-6 pb-6">{{ t()("rapports.result.empty") }}</p>
          } @else {
            <div
              class="max-h-[480px] overflow-auto border-t"
              style="border-color: var(--v2-separateur)"
            >
              <table class="w-full min-w-[40rem] text-left text-[14px]">
                <thead class="sticky top-0 z-10" style="background: var(--v2-creme)">
                  <tr>
                    @for (header of previewReport.header; track header) {
                      <th
                        class="mono whitespace-nowrap px-4 py-3"
                        style="color: var(--v2-gris-texte)"
                      >
                        {{ header }}
                      </th>
                    }
                  </tr>
                </thead>
                <tbody>
                  @for (row of previewRows(previewReport); track $index) {
                    <tr style="border-top: 1px solid var(--v2-separateur)">
                      @for (cell of row; track $index) {
                        <td class="whitespace-nowrap px-4 py-2.5 font-medium tabular-nums">
                          {{ cell }}
                        </td>
                      }
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </section>
      }

      <!-- ───── Rapports récents ───── -->
      @if (canRead()) {
        <section class="mt-8" aria-labelledby="history-title">
          <h2 id="history-title" class="text-[20px] font-extrabold tracking-[-0.02em]">
            {{ t()("rapports.history.title") }}
          </h2>
          @if (history().length === 0) {
            <p class="card sub mt-4 flex items-center gap-3 p-6">
              <ui-icon name="folder_open" [size]="22" />{{ t()("rapports.history.empty") }}
            </p>
          } @else {
            <ul class="card mt-4 overflow-hidden">
              @for (report of historyPager.items(); track report.id; let first = $first) {
                <li
                  class="flex flex-wrap items-center gap-4 px-5 py-4"
                  [style.border-top]="first ? 'none' : '1px solid var(--v2-separateur)'"
                >
                  <span
                    class="grid size-11 shrink-0 place-items-center rounded-[14px]"
                    style="background: var(--v2-sauge); color: var(--v2-foret)"
                  >
                    <ui-icon name="lab_profile" [size]="22" />
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block truncate text-[15px] font-bold">{{ report.name }}</span>
                    <span class="sub block truncate">
                      {{ report.scopeLabel }} · {{ fmtDateTime(report.generatedAt) }} ·
                      {{ t()("rapports.history.rows", { rows: nf.format(report.rows.length) }) }}
                    </span>
                  </span>
                  <span class="flex flex-wrap gap-2">
                    <button type="button" class="btn btn-ghost" (click)="openResult(report)">
                      <ui-icon name="visibility" [size]="18" />{{ t()("rapports.result.open") }}
                    </button>
                    @if (canDownload()) {
                      <button
                        type="button"
                        class="btn btn-ghost"
                        [attr.aria-label]="t()('rapports.csv') + ' · ' + report.name"
                        (click)="download(report, 'CSV')"
                      >
                        <ui-icon name="download" [size]="18" />{{ t()("rapports.csv") }}
                      </button>
                      <button
                        type="button"
                        class="btn btn-forest"
                        [attr.aria-label]="t()('rapports.excel') + ' · ' + report.name"
                        (click)="download(report, 'Excel')"
                      >
                        <ui-icon name="table_view" [size]="18" />{{ t()("rapports.excel") }}
                      </button>
                    }
                  </span>
                </li>
              }
            </ul>
            <ui-pagination [pager]="historyPager" />
          }
        </section>
      }

      <p class="sub mt-6">{{ t()("rapports.foot") }}</p>
    </app-shell>
  `,
})
export default class RapportsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  private readonly snackbar = inject(SnackbarService);
  private readonly document = inject(DOCUMENT);
  protected readonly t = this.locale.t;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly nf = nf;
  protected readonly categories = REPORT_CATEGORIES;
  protected readonly previewLimit = PREVIEW_ROWS;
  protected readonly periods = [
    { id: "campaign" as const, label: "rapports.field.period.campaign" as const },
    { id: "h1" as const, label: "rapports.field.period.h1" as const },
    { id: "h2" as const, label: "rapports.field.period.h2" as const },
  ];

  protected readonly scoop = signal("");
  protected readonly campaign = signal("");
  protected readonly period = signal<PeriodPreset>("campaign");
  protected readonly category = signal<CatFilter>("all");
  protected readonly query = signal("");
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

  /** Catalogue filtré par catégorie et par recherche (nom ou description, sans accents ni casse). */
  protected readonly filtered = computed(() => {
    const c = this.category();
    const norm = (v: string) =>
      v
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const q = norm(this.query().trim());
    const t = this.t();
    return this.catalogue().filter(
      (r) =>
        (c === "all" || r.category === c) &&
        (!q || norm(`${t(r.nameKey)} ${t(r.descriptionKey)}`).includes(q)),
    );
  });

  /** Statistiques réelles : catalogue, rapports générés, téléchargements (journal d'audit), dernier rapport. */
  protected readonly stats = computed(() => {
    const t = this.t();
    const history = this.history();
    const month = Date.now() - 30 * 86_400_000;
    const recent = history.filter((r) => new Date(r.generatedAt).getTime() >= month).length;
    const downloads = this.store
      .state()
      .audit.filter((a) => a.action === "Téléchargement de rapport").length;
    const last = history[0];
    const cats = new Set(this.catalogue().map((r) => r.category)).size;
    return [
      {
        label: t("rapports.studio.available"),
        value: String(this.catalogue().length),
        sub: t("rapports.studio.availableSub", { count: cats }),
        icon: "summarize" as IconName,
        bg: "var(--v2-sauge)",
        fg: "var(--v2-foret)",
        small: false,
      },
      {
        label: t("rapports.studio.generatedLabel"),
        value: String(history.length),
        sub: t("rapports.studio.generatedSub", { count: recent }),
        icon: "lab_profile" as IconName,
        bg: "var(--v2-info-bg)",
        fg: "var(--v2-info-fg)",
        small: false,
      },
      {
        label: t("rapports.studio.downloads"),
        value: String(downloads),
        sub: t("rapports.studio.downloadsSub"),
        icon: "download" as IconName,
        bg: "var(--v2-attente-bg)",
        fg: "var(--v2-attente-fg)",
        small: false,
      },
      {
        label: t("rapports.studio.lastLabel"),
        value: last ? fmtDateTime(last.generatedAt) : "—",
        sub: last ? last.name : t("rapports.studio.lastNone"),
        icon: "history" as IconName,
        bg: "var(--v2-culture-bg)",
        fg: "var(--v2-culture-fg)",
        small: true,
      },
    ];
  });

  protected readonly selected = computed(() => {
    const id = this.selectedId();
    return id ? this.catalogue().find((r) => r.id === id) : undefined;
  });

  protected readonly history = computed(() =>
    this.canRead() ? scopedReports(this.store.state().reports, this.session()) : [],
  );

  protected readonly appliedScopeName = computed(() =>
    scopeLabel(this.session(), this.store.state().scoops),
  );

  /** Résumé lisible du périmètre : « 11 coopératives · Toutes · Toute la campagne ». */
  protected readonly summary = computed(() => {
    const scoops = this.store.state().scoops;
    const id = this.scoop();
    const scoopPart = id
      ? (scoops.find((s) => s.id === id)?.name ?? id)
      : this.visibleScoops().length > 1
        ? `${this.visibleScoops().length} coopératives`
        : this.appliedScopeName();
    const campaignPart = this.campaign() || this.t()("rapports.field.allCampaigns");
    const periodLabel = this.periods.find((p) => p.id === this.period())!.label;
    return `${scoopPart} · ${campaignPart} · ${this.t()(periodLabel)}`;
  });

  protected readonly scoopOptions = computed((): SelectOption[] => {
    const scoops = this.visibleScoops();
    const all: SelectOption = {
      value: "",
      label: scoops.length > 1 ? this.t()("rapports.field.allMine") : this.appliedScopeName(),
      icon: "diversity_3",
      hint: scoops.length > 1 ? String(scoops.length) : undefined,
    };
    return scoops.length > 1
      ? [all, ...scoops.map((sc) => ({ value: sc.id, label: sc.name }))]
      : [all];
  });

  protected readonly campaignOptions = computed((): SelectOption[] => [
    { value: "", label: this.t()("rapports.field.allCampaigns"), icon: "calendar_today" },
    ...this.campaigns().map((c) => ({ value: c, label: c })),
  ]);

  protected readonly categoryOptions = computed((): SelectOption[] => [
    {
      value: "all",
      label: this.t()("rapports.studio.allCategories"),
      icon: "summarize",
      hint: String(this.catalogue().length),
    },
    ...this.categories
      .filter((c) => this.countIn(c) > 0)
      .map((c) => ({
        value: c,
        label: this.t()(CATEGORY[c].label),
        icon: CATEGORY[c].icon,
        hint: String(this.countIn(c)),
      })),
  ]);

  /** Nombre de générations par rapport (historique réel du périmètre). */
  protected readonly usage = computed(() => {
    const m = new Map<string, number>();
    for (const r of this.history()) m.set(r.reportId, (m.get(r.reportId) ?? 0) + 1);
    return m;
  });

  /** Rapport le plus généré : badge « Populaire » (aucun tant que rien n'a été généré). */
  protected readonly popularId = computed(() => {
    let best: string | null = null;
    let max = 0;
    for (const [id, n] of this.usage()) if (n > max) [best, max] = [id, n];
    return best;
  });

  protected cat(c: ReportCategory) {
    return CATEGORY[c];
  }

  protected countIn(c: ReportCategory): number {
    return this.catalogue().filter((r) => r.category === c).length;
  }

  protected previewRows(r: GeneratedReport): (string | number)[][] {
    return r.rows.slice(0, PREVIEW_ROWS);
  }

  protected setCategory(c: CatFilter): void {
    this.category.set(c);
    const id = this.selectedId();
    if (id && c !== "all" && !this.catalogue().some((x) => x.id === id && x.category === c)) {
      this.selectedId.set(null);
    }
  }

  protected openResult(r: GeneratedReport): void {
    this.preview.set(r);
    this.scrollToResult();
  }

  protected run(): void {
    const id = this.selectedId();
    if (!id || this.busy()) return;
    this.busy.set(true);
    window.setTimeout(() => {
      const res = this.store.actions.generateReport(id, {
        scoopId: this.scoop() || undefined,
        campaign: this.campaign() || undefined,
      });
      this.busy.set(false);
      if (!res.ok) {
        this.snackbar.error(this.t()(res.error as MessageKey));
        return;
      }
      this.preview.set(res.report);
      this.snackbar.success(this.t()("rapports.ready", { name: res.report.name }));
      this.scrollToResult();
    }, 500);
  }

  protected async download(r: GeneratedReport, format: "CSV" | "Excel"): Promise<void> {
    const res = this.store.actions.downloadReport(r.id, format);
    if (!res.ok) {
      this.snackbar.error(this.t()(res.error as MessageKey));
      return;
    }
    const head = [r.name, `Périmètre : ${r.scopeLabel}`, `Édité le ${r.generatedAt.slice(0, 10)}`];
    if (format === "CSV") {
      downloadCsv(fileName(r, "csv"), [head, r.header, ...r.rows]);
    } else {
      await downloadWorkbook(fileName(r, "xlsx"), [
        { name: "Rapport", rows: [head, r.header, ...r.rows] },
      ]);
    }
    this.snackbar.success(this.t()("rapports.studio.downloaded", { format }));
  }

  private scrollToResult(): void {
    setTimeout(
      () =>
        this.document
          .getElementById("rapport-resultat")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50,
    );
  }

  /** Pagination (filtered) : mêmes règles que l'API (?page=&limit=). */
  protected readonly reportPager = createPager(() => this.filtered());

  /** Pagination (history) : mêmes règles que l'API (?page=&limit=). */
  protected readonly historyPager = createPager(() => this.history());
}

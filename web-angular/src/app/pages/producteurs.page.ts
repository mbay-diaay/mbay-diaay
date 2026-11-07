import { Component, computed, effect, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, type ParamMap, Router, RouterLink } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import {
  LucideAngularModule,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-angular";

import { actions, can, inScope } from "@/lib/store";
import { CROPS, VILLAGES, type Quality } from "@/lib/mock/data";
import { AGE_BANDS, ageBand, downloadCsv, fmtAge, maskPhone, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { ToastService } from "../shared/toast.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiModalA11yDirective } from "../shared/ui/modal-a11y.directive";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiQualityPillComponent } from "../shared/ui/pill.component";
import { UiSheetComponent } from "../shared/ui/sheet.component";

const ALL = "__all";
const PAGE = 25;

type FilterKey = "village" | "sexe" | "age" | "qualite" | "culture";

interface ProducteursUrlState {
  q: string;
  village: string;
  sexe: string;
  age: string;
  qualite: string;
  culture: string;
  scoop: string;
  campagne: string;
}

function parseProducteursQuery(m: ParamMap): ProducteursUrlState {
  const get = (k: string) => m.get(k);
  return {
    q: get("q") ?? "",
    village: get("village") ?? ALL,
    sexe: get("sexe") ?? ALL,
    age: get("age") ?? ALL,
    qualite: get("qualite") ?? ALL,
    culture: get("culture") ?? ALL,
    scoop: get("scoop") ?? "",
    campagne: get("campagne") ?? "",
  };
}

const QUALITY_KEY: Record<Quality, MessageKey> = {
  validé: "producteurs.quality.validé",
  "à vérifier": "producteurs.quality.à vérifier",
  doublon: "producteurs.quality.doublon",
  invalide: "producteurs.quality.invalide",
};

const STATUS_KEY = {
  recensé: "producteurs.status.recensé",
  membre: "producteurs.status.membre",
} as const satisfies Record<string, MessageKey>;

/**
 * Port de src/routes/producteurs.index.tsx.
 * Simplifications vs React : confirmation d’export via overlay HTML natif (pas d’AlertDialog).
 * Filtres : feuille animée (Sheet) sur mobile, panneau tablette / desktop.
 * Critères `q`, `village`, `sexe`, `age`, `qualite`, `culture` + `scoop` / `campagne`
 * (en-tête) sont lus/écrits dans l’URL (`replaceUrl`), comme React.
 */
@Component({
  selector: "app-producteurs-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiButtonComponent,
    UiEmptyComponent,
    UiModalA11yDirective,
    UiPageHeaderComponent,
    UiQualityPillComponent,
    UiSheetComponent,
  ],
  template: `
    <app-shell perm="producer.read" [area]="t()('producteurs.area')">
      <ui-page-header
        [eyebrow]="t()('producteurs.index.eyebrow')"
        [title]="t()('producteurs.index.title')"
        [description]="t()('producteurs.index.description', { total: nf.format(rows().length) })"
      >
        <ui-button actions variant="outline" (click)="exportOpen.set(true)">
          <lucide-angular [img]="icons.download" class="size-4" />
          {{ t()("producteurs.index.exportCsv") }}
        </ui-button>
      </ui-page-header>

      <div class="surface mb-4 flex flex-wrap items-center gap-2 p-3 sm:gap-3 sm:p-4">
        <div class="relative min-w-0 flex-1 basis-48">
          <lucide-angular
            [img]="icons.search"
            class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-9 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            [placeholder]="t()('producteurs.index.searchPlaceholder')"
            [attr.aria-label]="t()('producteurs.index.searchLabel')"
            [ngModel]="q()"
            (ngModelChange)="onSearch($event)"
          />
        </div>
        <ui-button
          variant="outline"
          class="shrink-0 md:hidden"
          type="button"
          (click)="filtersOpen.set(true)"
          [attr.aria-expanded]="filtersOpen()"
        >
          <lucide-angular [img]="icons.sliders" class="size-4" />
          {{ t()("producteurs.index.filters") }}
          @if (activeCount() > 0) {
            <span class="rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground tabular">
              {{ activeCount() }}
            </span>
          }
        </ui-button>
        <ui-button
          variant="outline"
          class="hidden shrink-0 md:inline-flex"
          type="button"
          (click)="filtersExpanded.set(!filtersExpanded())"
          [attr.aria-expanded]="filtersExpanded()"
        >
          <lucide-angular [img]="icons.sliders" class="size-4" />
          {{ t()("producteurs.index.filters") }}
          @if (activeCount() > 0) {
            <span class="rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground tabular">
              {{ activeCount() }}
            </span>
          }
        </ui-button>
      </div>

      <ui-sheet [(open)]="filtersOpen" [title]="t()('producteurs.index.filters')" side="right">
        <div class="grid gap-3">
          @for (f of filterDefs(); track f.key) {
            <label class="grid gap-1 text-sm">
              <span class="text-xs font-medium text-muted-foreground">{{ f.label }}</span>
              <select
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                [ngModel]="filters()[f.key]"
                (ngModelChange)="setFilter(f.key, $event)"
              >
                <option [ngValue]="ALL">
                  {{ f.label }} : {{ t()("producteurs.index.filtersAll") }}
                </option>
                @for (opt of f.options; track opt[0]) {
                  <option [ngValue]="opt[0]">{{ opt[1] }}</option>
                }
              </select>
            </label>
          }
        </div>
        <div
          sheetFooter
          class="mt-0 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end"
        >
          @if (activeCount() > 0) {
            <ui-button variant="outline" class="w-full sm:w-auto" (click)="resetFilters()">
              {{ t()("producteurs.index.reset") }}
            </ui-button>
          }
          <ui-button class="w-full sm:w-auto" (click)="filtersOpen.set(false)">
            {{ t()("producteurs.index.seeRows", { total: nf.format(rows().length) }) }}
          </ui-button>
        </div>
      </ui-sheet>

      @if (filtersExpanded()) {
        <div class="surface mb-4 hidden grid gap-3 p-4 sm:grid-cols-2 md:grid lg:grid-cols-3">
          @for (f of filterDefs(); track f.key) {
            <label class="grid gap-1 text-sm">
              <span class="text-xs font-medium text-muted-foreground">{{ f.label }}</span>
              <select
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                [ngModel]="filters()[f.key]"
                (ngModelChange)="setFilter(f.key, $event)"
              >
                <option [ngValue]="ALL">
                  {{ f.label }} : {{ t()("producteurs.index.filtersAll") }}
                </option>
                @for (opt of f.options; track opt[0]) {
                  <option [ngValue]="opt[0]">{{ opt[1] }}</option>
                }
              </select>
            </label>
          }
          @if (activeCount() > 0) {
            <div class="flex items-end">
              <ui-button variant="outline" (click)="resetFilters()">
                {{ t()("producteurs.index.reset") }}
              </ui-button>
            </div>
          }
        </div>
      }

      <div class="surface overflow-hidden">
        <ul class="divide-y md:hidden">
          @for (p of view(); track p.id) {
            <li>
              <a
                [routerLink]="['/producteurs', p.id]"
                class="flex items-start gap-3 px-4 py-3 active:bg-muted"
              >
                <div class="min-w-0 flex-1">
                  <div class="truncate font-semibold">{{ p.firstName }} {{ p.lastName }}</div>
                  <div class="mt-0.5 text-xs text-muted-foreground">
                    <span class="tabular">{{ p.code }}</span>
                    ·
                    {{
                      t()(p.sex === "F" ? "producteurs.sex.F" : "producteurs.sex.H")
                    }}, {{ fmtAge(p.age) }}
                  </div>
                  <div class="truncate text-xs text-muted-foreground">{{ p.village }}</div>
                </div>
                <div class="flex shrink-0 flex-col items-end gap-1">
                  <ui-quality-pill [q]="p.quality" />
                  <span class="text-xs capitalize text-muted-foreground">
                    {{ t()(statusKey[p.status]) }}
                  </span>
                </div>
              </a>
            </li>
          }
        </ul>

        <div class="hidden overflow-x-auto md:block">
          <table class="w-full text-sm">
            <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th class="px-4 py-3 font-semibold">{{ t()("producteurs.index.colProducer") }}</th>
                <th class="px-4 py-3 font-semibold">{{ t()("producteurs.index.colSexAge") }}</th>
                <th class="px-4 py-3 font-semibold">{{ t()("producteurs.col.village") }}</th>
                <th class="hidden px-4 py-3 font-semibold lg:table-cell">
                  {{ t()("producteurs.col.organisation") }}
                </th>
                <th class="hidden px-4 py-3 font-semibold lg:table-cell">
                  {{ t()("producteurs.col.phone") }}
                </th>
                <th class="px-4 py-3 font-semibold">{{ t()("producteurs.col.status") }}</th>
                <th class="px-4 py-3 font-semibold">{{ t()("producteurs.col.quality") }}</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              @for (p of view(); track p.id) {
                <tr class="hover:bg-muted/60">
                  <td class="px-4 py-3">
                    <a
                      [routerLink]="['/producteurs', p.id]"
                      class="font-semibold hover:text-primary hover:underline"
                    >
                      {{ p.firstName }} {{ p.lastName }}
                    </a>
                    <div class="text-xs text-muted-foreground">{{ p.code }}</div>
                  </td>
                  <td class="whitespace-nowrap px-4 py-3 tabular">
                    {{ p.sex }} · {{ fmtAge(p.age) }}
                  </td>
                  <td class="px-4 py-3">{{ p.village }}</td>
                  <td class="hidden max-w-56 truncate px-4 py-3 lg:table-cell">
                    {{ orgName(p.orgId) }}
                  </td>
                  <td
                    class="hidden whitespace-nowrap px-4 py-3 tabular text-muted-foreground lg:table-cell"
                  >
                    {{ maskPhone(p.phone) }}
                  </td>
                  <td class="px-4 py-3 capitalize">{{ t()(statusKey[p.status]) }}</td>
                  <td class="px-4 py-3"><ui-quality-pill [q]="p.quality" /></td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        @if (!view().length) {
          <ui-empty>{{ t()("producteurs.index.empty") }}</ui-empty>
        }

        <div
          class="flex items-center justify-between gap-2 border-t px-4 py-3 text-sm text-muted-foreground"
        >
          <span class="tabular">
            {{ t()("producteurs.index.page", { page: page() + 1, pages: pages() }) }}
          </span>
          <div class="flex gap-2">
            <ui-button
              variant="outline"
              size="sm"
              [disabled]="page() === 0"
              (click)="page.set(page() - 1)"
            >
              <lucide-angular [img]="icons.chevronLeft" class="size-4" />
              <span class="sr-only sm:not-sr-only">{{ t()("producteurs.index.prev") }}</span>
            </ui-button>
            <ui-button
              variant="outline"
              size="sm"
              [disabled]="page() >= pages() - 1"
              (click)="page.set(page() + 1)"
            >
              <span class="sr-only sm:not-sr-only">{{ t()("producteurs.index.next") }}</span>
              <lucide-angular [img]="icons.chevronRight" class="size-4" />
            </ui-button>
          </div>
        </div>
      </div>

      @if (exportOpen()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            class="surface w-full max-w-md p-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            uiModalA11y
            (dismiss)="exportOpen.set(false)"
          >
            <h2 class="text-lg font-semibold">
              {{
                nominatif()
                  ? t()("producteurs.index.exportNominatif")
                  : t()("producteurs.index.exportAnonymise")
              }}
            </h2>
            <p class="mt-2 text-sm text-muted-foreground">{{ exportDesc() }}</p>
            <div class="mt-6 flex justify-end gap-2">
              <ui-button variant="outline" (click)="exportOpen.set(false)">
                {{ t()("producteurs.index.cancel") }}
              </ui-button>
              <ui-button (click)="doExport()">{{ t()("producteurs.index.export") }}</ui-button>
            </div>
          </div>
        </div>
      }
    </app-shell>
  `,
})
export default class ProducteursPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly fmtAge = fmtAge;
  protected readonly maskPhone = maskPhone;
  protected readonly ALL = ALL;
  protected readonly statusKey = STATUS_KEY;
  protected readonly icons = {
    download: Download,
    search: Search,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    sliders: SlidersHorizontal,
  };

  /** Route query (leaf) — same keys as React `validateSearch` on `/producteurs/`. */
  private readonly queryState = toSignal(
    this.route.queryParamMap.pipe(map(parseProducteursQuery)),
    { initialValue: parseProducteursQuery(this.route.snapshot.queryParamMap) },
  );

  protected readonly q = signal(this.queryState().q);

  protected readonly page = signal(0);
  /** Filtres — feuille mobile uniquement. */
  protected readonly filtersOpen = signal(false);
  /** Filtres — panneau md+. */
  protected readonly filtersExpanded = signal(false);
  protected readonly exportOpen = signal(false);
  protected readonly filters = signal({
    village: this.queryState().village,
    sexe: this.queryState().sexe,
    age: this.queryState().age,
    qualite: this.queryState().qualite,
    culture: this.queryState().culture,
  });

  private readonly _syncFromUrl = effect(() => {
    const s = this.queryState();
    this.q.set(s.q);
    this.filters.set({
      village: s.village,
      sexe: s.sexe,
      age: s.age,
      qualite: s.qualite,
      culture: s.culture,
    });
  });

  protected readonly nominatif = computed(() => {
    const session = this.store.state().session;
    return session ? can(session, "producer.export_nominatif") : false;
  });

  protected readonly exportDesc = computed(() =>
    this.t()(
      this.nominatif()
        ? "producteurs.index.exportNominatifDesc"
        : "producteurs.index.exportAnonymiseDesc",
      { total: nf.format(this.rows().length) },
    ),
  );

  protected readonly filterDefs = computed(() => {
    const t = this.t();
    return [
      {
        key: "village" as const,
        label: t("producteurs.col.village"),
        options: VILLAGES.map((v) => [v, v] as [string, string]),
      },
      {
        key: "sexe" as const,
        label: t("producteurs.col.sex"),
        options: [
          ["F", t("producteurs.sex.F")],
          ["H", t("producteurs.sex.H")],
        ] as [string, string][],
      },
      {
        key: "age" as const,
        label: t("producteurs.col.age"),
        options: AGE_BANDS.map((a) => [a, t("producteurs.index.ageBand", { band: a })] as [string, string]),
      },
      {
        key: "qualite" as const,
        label: t("producteurs.col.quality"),
        options: (Object.keys(QUALITY_KEY) as Quality[]).map(
          (x) => [x, t(QUALITY_KEY[x])] as [string, string],
        ),
      },
      {
        key: "culture" as const,
        label: t("producteurs.col.crop"),
        options: CROPS.map((c) => [c, c] as [string, string]),
      },
    ];
  });

  protected readonly activeCount = computed(
    () => Object.values(this.filters()).filter((v) => v !== ALL).length,
  );

  protected readonly rows = computed(() => {
    const s = this.store.state();
    const session = s.session;
    const q = this.q().trim().toLowerCase();
    const f = this.filters();
    const url = this.queryState();
    return inScope(
      s.producers.filter((p) => !p.mergedInto),
      session,
    ).filter(
      (p) =>
        (!q || `${p.firstName} ${p.lastName} ${p.code}`.toLowerCase().includes(q)) &&
        (!url.scoop || p.scoopId === url.scoop) &&
        (!url.campagne || p.crops.some((c) => c.campaign === url.campagne)) &&
        (f.village === ALL || p.village === f.village) &&
        (f.sexe === ALL || p.sex === f.sexe) &&
        (f.age === ALL || ageBand(p.age) === f.age) &&
        (f.qualite === ALL || p.quality === f.qualite) &&
        (f.culture === ALL || p.crops.some((c) => c.crop === f.culture)),
    );
  });

  protected readonly pages = computed(() => Math.max(1, Math.ceil(this.rows().length / PAGE)));

  protected readonly view = computed(() => {
    const p = this.page();
    return this.rows().slice(p * PAGE, p * PAGE + PAGE);
  });

  protected orgName(orgId: string | null | undefined): string {
    if (!orgId) return "";
    return this.store.state().orgs.find((o) => o.id === orgId)?.name ?? "";
  }

  private patchQuery(patch: Partial<Record<string, string | null>>): void {
    this.page.set(0);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: patch,
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }

  protected onSearch(value: string) {
    this.patchQuery({ q: value.trim() ? value : null });
  }

  protected setFilter(key: FilterKey, value: string) {
    this.patchQuery({ [key]: value === ALL ? null : value });
  }

  protected resetFilters() {
    this.patchQuery({
      village: null,
      sexe: null,
      age: null,
      qualite: null,
      culture: null,
    });
  }

  protected doExport() {
    const rows = this.rows();
    const scoops = this.store.state().scoops;
    const nominatif = this.nominatif();
    const head = nominatif
      ? ["Code", "Prénom", "Nom", "Sexe", "Âge", "Village", "SCOOP", "Statut", "Qualité"]
      : ["Code", "Sexe", "Tranche d'âge", "Village", "SCOOP", "Statut", "Qualité"];
    const body = rows.map((p) => {
      const sc = scoops.find((s) => s.id === p.scoopId)?.name ?? "";
      return nominatif
        ? [p.code, p.firstName, p.lastName, p.sex, p.age ?? "", p.village, sc, p.status, p.quality]
        : [p.code, p.sex, ageBand(p.age), p.village, sc, p.status, p.quality];
    });
    try {
      downloadCsv(`producteurs${nominatif ? "_nominatif" : ""}.csv`, [head, ...body]);
    } catch {
      this.toast.error("common.exportError", {
        key: "common.exportErrorDesc",
      });
      return;
    }
    actions.audit(
      nominatif ? "Export nominatif" : "Export anonymisé",
      "Producteurs",
      `${rows.length} lignes (CSV)`,
    );
    this.toast.success("producteurs.index.exportReady", {
      key: "producteurs.index.exportReadyDesc",
      params: { total: this.nf.format(rows.length) },
    });
    this.exportOpen.set(false);
  }
}

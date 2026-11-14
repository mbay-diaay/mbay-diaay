import { Component, computed, effect, inject, signal } from "@angular/core";
import { ActivatedRoute, type ParamMap, Router } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";

import { actions, can, inScope } from "@/lib/store";
import { CROPS, VILLAGES, type Quality } from "@/lib/mock/data";
import { AGE_BANDS, ageAtMost, ageBand, downloadCsv, fmtDate, maskPhone, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import { createPager } from "@shared/pager";
import {
  detailFact,
  detailKpi,
  DetailModalComponent,
  IconComponent,
  initialsOf,
  ModalComponent,
  PaginationComponent,
  SelectComponent,
  SnackbarService,
  StatCardsComponent,
  TONE,
  V2_PAGE_STYLES,
  type DetailView,
  type IconName,
  type SelectOption,
  type StatCard,
} from "@shared/ui";
import { GlobalFiltersComponent } from "@shared/global-filters.component";

const ALL = "__all";

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

const QUALITIES: readonly Quality[] = ["validé", "à vérifier", "doublon", "invalide"];

const QUALITY: Record<Quality, { label: MessageKey; bg: string; fg: string }> = {
  validé: { label: "producteurs.quality.validé", ...TONE.succes },
  "à vérifier": { label: "producteurs.quality.à vérifier", ...TONE.attente },
  doublon: { label: "producteurs.quality.doublon", ...TONE.info },
  invalide: { label: "producteurs.quality.invalide", ...TONE.erreur },
};

const STATUS = {
  recensé: { label: "producteurs.status.recensé", ...TONE.neutre },
  membre: { label: "producteurs.status.membre", ...TONE.culture },
} as const satisfies Record<string, { label: MessageKey; bg: string; fg: string }>;

/**
 * Annuaire des producteurs (charte V2) : statistiques, recherche + filtre qualité à compteurs,
 * filtres village / sexe / âge / culture, tableau paginé, détail en modale (lien vers la fiche).
 * Critères `q`, `village`, `sexe`, `age`, `qualite`, `culture` + `scoop` / `campagne`
 * (en-tête) sont lus/écrits dans l'URL (`replaceUrl`).
 */
@Component({
  selector: "app-producteurs-page",
  imports: [
    GlobalFiltersComponent,
    AppShellComponent,
    IconComponent,
    ModalComponent,
    DetailModalComponent,
    PaginationComponent,
    SelectComponent,
    StatCardsComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .filters {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
        gap: 8px;
      }
      .reset {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        font-weight: 800;
        color: var(--v2-foret);
        cursor: pointer;
      }
      .reset:hover {
        text-decoration: underline;
      }
      .code {
        font-family: var(--v2-font-mono);
        font-size: 11.5px;
        font-weight: 600;
        color: var(--v2-gris-texte);
      }
    `,
  ],
  template: `
    <app-shell perm="producer.read" [area]="t()('producteurs.area')">
      <!-- ───── En-tête ───── -->
      <header class="rise flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono" style="color: var(--v2-gris-texte)">
            {{ t()("producteurs.index.eyebrow") }}
          </p>
          <h1
            class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
          >
            {{ t()("producteurs.index.title") }}
          </h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
            {{ t()("producteurs.index.lead") }}
          </p>
        </div>
        <button type="button" class="btn btn-primary" (click)="exportOpen.set(true)">
          {{ t()("producteurs.index.exportCsv") }}
          <span class="btn-chip"><ui-icon name="download" [size]="20" /></span>
        </button>
      </header>

      <!-- ───── Statistiques ───── -->
      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <!-- ───── Recherche · qualité · filtres ───── -->
      <div class="card mt-6 p-2">
        <div class="toolbar p-0">
          <label class="search">
            <ui-icon name="search" [size]="20" />
            <input
              type="search"
              [placeholder]="t()('producteurs.index.searchPlaceholder')"
              [attr.aria-label]="t()('producteurs.index.searchLabel')"
              [value]="q()"
              (input)="onSearch($any($event.target).value)"
            />
          </label>
          <div class="seg" role="radiogroup" [attr.aria-label]="t()('producteurs.col.quality')">
            @for (qualityButton of qualityButtons(); track qualityButton.id) {
              <button
                type="button"
                role="radio"
                [class.on]="filters().qualite === qualityButton.id"
                [attr.aria-checked]="filters().qualite === qualityButton.id"
                (click)="setFilter('qualite', qualityButton.id)"
              >
                {{ qualityButton.label
                }}<span class="n" [class.zero]="!qualityButton.count">{{
                  nf.format(qualityButton.count)
                }}</span>
              </button>
            }
          </div>
        </div>
        <div class="filters mt-2">
          <!-- Périmètre : coopérative et campagne (paramètres ?scoop= et ?campagne=) -->
          <app-global-filters [campaign]="true" />
          @for (filter of filterDefs(); track filter.key) {
            <ui-select
              variant="compact"
              [label]="filter.label"
              [leadingIcon]="filter.icon"
              [options]="filter.options"
              [value]="filters()[filter.key]"
              (valueChange)="setFilter(filter.key, $event)"
            />
          }
        </div>
      </div>

      <div class="mt-4 flex min-h-6 flex-wrap items-center justify-between gap-3">
        <p class="sub" aria-live="polite">
          {{
            t()(
              rows().length > 1 ? "producteurs.index.count.autre" : "producteurs.index.count.un",
              { count: nf.format(rows().length) }
            )
          }}
        </p>
        @if (activeCount() > 0) {
          <button type="button" class="reset" (click)="resetFilters()">
            <ui-icon name="close" [size]="16" />{{ t()("producteurs.index.reset") }} ({{
              activeCount()
            }})
          </button>
        }
      </div>

      <!-- ───── Liste ───── -->
      <section class="card mt-3 overflow-hidden">
        @if (rows().length) {
          <!-- Téléphone : cartes -->
          <ul class="md:hidden">
            @for (producer of pager.items(); track producer.id; let first = $first) {
              <li [style.border-top]="first ? 'none' : '1px solid var(--v2-separateur)'">
                <button
                  type="button"
                  class="row-link flex w-full items-center gap-3 px-4 py-3.5 text-left"
                  (click)="openDetail(producer.id)"
                >
                  <span class="avatar">{{
                    initials(producer.firstName + " " + producer.lastName)
                  }}</span>
                  <span class="min-w-0 flex-1">
                    <span class="block truncate font-bold"
                      >{{ producer.firstName }} {{ producer.lastName }}</span
                    >
                    <span class="sub block truncate"
                      >{{ producer.village }} · {{ ageLabel(producer.age) }}</span
                    >
                  </span>
                  <span
                    class="badge"
                    [style.background]="quality[producer.quality].bg"
                    [style.color]="quality[producer.quality].fg"
                    >{{ t()(quality[producer.quality].label) }}</span
                  >
                </button>
              </li>
            }
          </ul>

          <!-- Tablette et bureau : tableau -->
          <div class="hidden overflow-x-auto md:block">
            <table class="tbl min-w-[860px]">
              <thead>
                <tr>
                  <th>{{ t()("producteurs.index.colProducer") }}</th>
                  <th>{{ t()("producteurs.index.colSexAge") }}</th>
                  <th>{{ t()("producteurs.col.village") }}</th>
                  <th class="hidden xl:table-cell">{{ t()("producteurs.col.organisation") }}</th>
                  <th class="hidden lg:table-cell">{{ t()("producteurs.col.phone") }}</th>
                  <th>{{ t()("producteurs.col.status") }}</th>
                  <th>{{ t()("producteurs.col.quality") }}</th>
                  <th class="text-right">{{ t()("producteurs.index.colActions") }}</th>
                </tr>
              </thead>
              <tbody>
                @for (producer of pager.items(); track producer.id) {
                  <tr class="row-link" (click)="openDetail(producer.id)">
                    <td>
                      <span class="flex items-center gap-3">
                        <span
                          class="avatar"
                          [style.background]="
                            producer.sex === 'F' ? 'var(--v2-culture-bg)' : 'var(--v2-sauge)'
                          "
                          [style.color]="
                            producer.sex === 'F' ? 'var(--v2-culture-fg)' : 'var(--v2-foret)'
                          "
                          >{{ initials(producer.firstName + " " + producer.lastName) }}</span
                        >
                        <span class="min-w-0">
                          <span class="block truncate font-bold"
                            >{{ producer.firstName }} {{ producer.lastName }}</span
                          >
                          <span class="code block">{{ producer.code }}</span>
                        </span>
                      </span>
                    </td>
                    <td class="whitespace-nowrap font-medium tabular-nums">
                      {{ t()(producer.sex === "F" ? "producteurs.sex.F" : "producteurs.sex.H") }} ·
                      <span [class.zero]="producer.age === null">{{ ageLabel(producer.age) }}</span>
                    </td>
                    <td class="font-medium">{{ producer.village }}</td>
                    <td
                      class="hidden max-w-56 truncate font-medium xl:table-cell"
                      [class.zero]="!orgName(producer.orgId)"
                    >
                      {{ orgName(producer.orgId) || "—" }}
                    </td>
                    <td
                      class="hidden whitespace-nowrap tabular-nums lg:table-cell"
                      style="color: var(--v2-gris-texte)"
                    >
                      {{ store.phone(producer.phone) }}
                    </td>
                    <td>
                      <span
                        class="badge"
                        [style.background]="status[producer.status].bg"
                        [style.color]="status[producer.status].fg"
                        >{{ t()(status[producer.status].label) }}</span
                      >
                    </td>
                    <td>
                      <span
                        class="badge"
                        [style.background]="quality[producer.quality].bg"
                        [style.color]="quality[producer.quality].fg"
                        >{{ t()(quality[producer.quality].label) }}</span
                      >
                    </td>
                    <td>
                      <span class="flex justify-end">
                        <button
                          type="button"
                          class="act"
                          [title]="t()('common.view')"
                          [attr.aria-label]="
                            t()('producteurs.index.view', {
                              name: producer.firstName + ' ' + producer.lastName,
                            })
                          "
                          (click)="$event.stopPropagation(); openDetail(producer.id)"
                        >
                          <ui-icon name="visibility" [size]="18" />
                        </button>
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <ui-pagination class="px-5 pb-5" [pager]="pager" />
        } @else {
          <div class="flex flex-col items-center gap-3 p-10 text-center">
            <span
              class="grid size-14 place-items-center rounded-[16px]"
              style="background: var(--v2-sauge); color: var(--v2-foret)"
              ><ui-icon name="search" [size]="26"
            /></span>
            <p class="text-[15px] font-semibold" style="color: var(--v2-ardoise)">
              {{ t()("producteurs.index.empty") }}
            </p>
            @if (activeCount() > 0) {
              <button type="button" class="reset" (click)="resetFilters()">
                {{ t()("producteurs.index.reset") }}
              </button>
            }
          </div>
        }
      </section>

      <!-- ───── Détail ───── -->
      <ui-detail-modal [view]="detail()" (closed)="detailId.set(null)" />

      <!-- ───── Export ───── -->
      <ui-modal
        [open]="exportOpen()"
        [title]="
          nominatif()
            ? t()('producteurs.index.exportNominatif')
            : t()('producteurs.index.exportAnonymise')
        "
        [description]="exportDesc()"
        icon="download"
        [width]="520"
        [closeLabel]="t()('common.close')"
        (closed)="exportOpen.set(false)"
      >
        <button modal-footer type="button" class="btn btn-ghost" (click)="exportOpen.set(false)">
          {{ t()("producteurs.index.cancel") }}
        </button>
        <button modal-footer type="button" class="btn btn-primary" (click)="doExport()">
          {{ t()("producteurs.index.export") }}
          <span class="btn-chip"><ui-icon name="download" [size]="18" /></span>
        </button>
      </ui-modal>
    </app-shell>
  `,
})
export default class ProducteursPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  private readonly snackbar = inject(SnackbarService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly maskPhone = maskPhone;
  protected readonly initials = initialsOf;
  protected readonly quality = QUALITY;
  protected readonly status = STATUS;

  /** Route query (leaf) — same keys as React `validateSearch` on `/dashboard/producteurs/`. */
  private readonly queryState = toSignal(
    this.route.queryParamMap.pipe(map(parseProducteursQuery)),
    { initialValue: parseProducteursQuery(this.route.snapshot.queryParamMap) },
  );

  protected readonly q = signal(this.queryState().q);

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

  /** Filtres secondaires (la qualité est dans la barre à compteurs). */
  protected readonly filterDefs = computed(() => {
    const t = this.t();
    const def = (
      key: Exclude<FilterKey, "qualite">,
      label: string,
      icon: IconName,
      opts: [string, string][],
    ) => ({
      key,
      label,
      icon,
      options: [
        { value: ALL, label: t("producteurs.index.filterAll", { label }) },
        ...opts.map(([value, l]) => ({ value, label: l })),
      ] as SelectOption[],
    });
    return [
      def(
        "village",
        t("producteurs.col.village"),
        "location_on",
        VILLAGES.map((v) => [v, v]),
      ),
      def("sexe", t("producteurs.col.sex"), "person", [
        ["F", t("producteurs.sex.F")],
        ["H", t("producteurs.sex.H")],
      ]),
      def(
        "age",
        t("producteurs.col.age"),
        "calendar_today",
        AGE_BANDS.map((a) => [a, t("producteurs.index.ageBand", { band: a })]),
      ),
      def(
        "culture",
        t("producteurs.col.crop"),
        "grass",
        CROPS.map((c) => [c, c]),
      ),
    ];
  });

  /** Base avant le filtre qualité : les compteurs de la barre restent justes quand on change de qualité. */
  private readonly beforeQuality = computed(() => this.filterRows(true));

  protected readonly qualityButtons = computed(() => {
    const t = this.t();
    const base = this.beforeQuality();
    return [
      { id: ALL, label: t("producteurs.index.qualityAll"), count: base.length },
      ...QUALITIES.map((q) => ({
        id: q,
        label: t(QUALITY[q].label),
        count: base.filter((p) => p.quality === q).length,
      })),
    ];
  });

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const rows = this.rows();
    const n = rows.length || 1;
    const pct = (k: number) => Math.round((k / n) * 100);
    const youthAge = this.store.state().youthMaxAge;
    const members = rows.filter((p) => p.status === "membre").length;
    const women = rows.filter((p) => p.sex === "F").length;
    const men = rows.filter((p) => p.sex === "H").length;
    const youth = rows.filter((p) => ageAtMost(p.age, youthAge)).length;
    const validated = rows.filter((p) => p.quality === "validé").length;
    const toCheck = rows.filter((p) => p.quality === "à vérifier").length;
    return [
      {
        label: t("producteurs.index.stat.total"),
        value: nf.format(rows.length),
        sub: t("producteurs.index.stat.totalSub", {
          members: nf.format(members),
          census: nf.format(rows.length - members),
        }),
        icon: "agriculture",
        bg: "",
        fg: "",
      },
      // Hommes et femmes : deux statistiques distinctes (indicateurs de genre demandés par les partenaires).
      {
        label: t("producteurs.index.stat.men"),
        value: nf.format(men),
        sub: t("producteurs.index.stat.shareSub", { pct: pct(men) }),
        icon: "person",
        ...TONE.info,
      },
      {
        label: t("producteurs.index.stat.women"),
        value: nf.format(women),
        sub: t("producteurs.index.stat.shareSub", { pct: pct(women) }),
        icon: "female",
        ...TONE.culture,
      },
      {
        label: t("producteurs.index.stat.youth"),
        value: nf.format(youth),
        sub: t("producteurs.index.stat.youthSub", { age: youthAge, pct: pct(youth) }),
        icon: "grass",
        ...TONE.attente,
      },
      {
        label: t("producteurs.index.stat.validated"),
        value: `${pct(validated)} %`,
        sub: t("producteurs.index.stat.validatedSub", { count: nf.format(toCheck) }),
        icon: "task_alt",
        ...TONE.succes,
      },
    ];
  });

  protected readonly activeCount = computed(
    () => Object.values(this.filters()).filter((v) => v !== ALL).length,
  );

  protected readonly rows = computed(() => this.filterRows(false));

  /** Applique recherche, périmètre, en-tête (SCOOP / campagne) et filtres ; `skipQuality` pour les compteurs. */
  private filterRows(skipQuality: boolean) {
    const s = this.store.state();
    const q = this.q().trim().toLowerCase();
    const f = this.filters();
    const url = this.queryState();
    return inScope(
      s.producers.filter((p) => !p.mergedInto),
      s.session,
    ).filter(
      (p) =>
        (!q || `${p.firstName} ${p.lastName} ${p.code}`.toLowerCase().includes(q)) &&
        (!url.scoop || p.scoopId === url.scoop) &&
        (!url.campagne || p.crops.some((c) => c.campaign === url.campagne)) &&
        (f.village === ALL || p.village === f.village) &&
        (f.sexe === ALL || p.sex === f.sexe) &&
        (f.age === ALL || ageBand(p.age) === f.age) &&
        (skipQuality || f.qualite === ALL || p.quality === f.qualite) &&
        (f.culture === ALL || p.crops.some((c) => c.crop === f.culture)),
    );
  }

  /** Pagination : mêmes règles que l'API (`GET /v1/producers?page=&limit=`). */
  protected readonly pager = createPager(() => this.rows());

  protected ageLabel(age: number | null): string {
    return age === null ? "—" : this.t()("cooperatives.fiche.detail.ageValue", { count: age });
  }

  // ── Détail en modale : la liste reste en place ──
  protected readonly detailId = signal<string | null>(null);

  protected openDetail(id: string): void {
    this.detailId.set(id);
  }

  protected readonly detail = computed<DetailView | null>(() => {
    const id = this.detailId();
    if (!id) return null;
    const s = this.store.state();
    const p = s.producers.find((x) => x.id === id);
    if (!p) return null;
    const t = this.t();
    const plots = s.plots.filter((pl) => pl.producerId === p.id);
    const area = plots.reduce((sum, pl) => sum + (pl.measured || pl.declared || 0), 0);
    const scoop = s.scoops.find((c) => c.id === p.scoopId);
    const org = this.orgName(p.orgId);
    const crops = [...p.crops].sort((a, b) => b.campaign.localeCompare(a.campaign));
    const q = QUALITY[p.quality];
    const st = STATUS[p.status];
    return {
      title: `${p.firstName} ${p.lastName}`,
      subtitle: [p.code, p.village].filter(Boolean).join(" · "),
      icon: "agriculture",
      badges: [
        { label: t(st.label), bg: st.bg, fg: st.fg },
        { label: t(q.label), bg: q.bg, fg: q.fg },
      ],
      kpis: [
        detailKpi(t("producteurs.quick.plots"), plots.length, "landscape", TONE.info),
        detailKpi(
          t("producteurs.quick.area"),
          area,
          "square_foot",
          TONE.succes,
          t("producteurs.quick.areaValue", {
            area: area.toLocaleString(this.locale.locale() === "wo" ? "fr-SN" : "fr-FR", {
              maximumFractionDigits: 2,
            }),
          }),
        ),
        detailKpi(t("producteurs.quick.crops"), p.crops.length, "grass", TONE.culture),
      ],
      facts: [
        detailFact(
          t("producteurs.col.sex"),
          t(p.sex === "F" ? "producteurs.sex.F" : "producteurs.sex.H"),
          "person",
        ),
        detailFact(
          t("producteurs.col.age"),
          p.age === null ? null : this.ageLabel(p.age),
          "calendar_today",
        ),
        detailFact(t("producteurs.col.phone"), this.store.phone(p.phone) || null, "call"),
        detailFact(t("producteurs.col.village"), p.village, "location_on"),
        detailFact(t("producteurs.col.organisation"), org || null, "hub"),
        detailFact(t("producteurs.quick.cooperative"), scoop?.name, "apartment"),
        detailFact(t("producteurs.quick.enumerator"), p.enumerator, "badge"),
        detailFact(
          t("producteurs.quick.createdAt"),
          p.createdAt ? fmtDate(p.createdAt) : null,
          "event_note",
        ),
      ],
      sections: [
        {
          title: t("producteurs.quick.crops"),
          icon: "grass",
          count: crops.length,
          empty: t("producteurs.quick.cropsEmpty"),
          items: crops.slice(0, 8).map((c) => ({
            label: c.crop,
            sub: t("producteurs.quick.cropSub", {
              campaign: c.campaign,
              area: c.area.toLocaleString("fr-FR", { maximumFractionDigits: 2 }),
            }),
            initials: c.crop.slice(0, 2).toUpperCase(),
          })),
          more: Math.max(0, crops.length - 8),
        },
      ],
      link: ["/dashboard/producteurs", p.id],
    };
  });

  protected orgName(orgId: string | null | undefined): string {
    if (!orgId) return "";
    return this.store.state().orgs.find((o) => o.id === orgId)?.name ?? "";
  }

  private patchQuery(patch: Partial<Record<string, string | null>>): void {
    this.pager.setPage(1);
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
      this.snackbar.error(
        `${this.t()("common.exportError")} · ${this.t()("common.exportErrorDesc")}`,
      );
      return;
    }
    actions.audit(
      nominatif ? "Export nominatif" : "Export anonymisé",
      "Producteurs",
      `${rows.length} lignes (CSV)`,
    );
    this.snackbar.success(
      `${this.t()("producteurs.index.exportReady")} · ${this.t()("producteurs.index.exportReadyDesc", { total: this.nf.format(rows.length) })}`,
    );
    this.exportOpen.set(false);
  }
}

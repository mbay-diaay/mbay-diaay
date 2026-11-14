import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { inScope } from "@/lib/scope";
import { nf } from "@/lib/format";
import type { Org } from "@/lib/mock/data";
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
  PaginationComponent,
  StatCardsComponent,
  TONE,
  V2_PAGE_STYLES,
  type DetailView,
  type StatCard,
} from "@shared/ui";
import { GlobalFiltersComponent } from "@shared/global-filters.component";

const UNQUALIFIED = "__aucun";
const ALL = "__tous";
const norm = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** GIE en bleu (le cas le plus fréquent), les autres types en violet, « à qualifier » en ambre. */
const typeTone = (type: string | null) =>
  !type ? TONE.attente : type === "GIE" ? TONE.info : TONE.culture;

/**
 * Organisations (charte V2) : statistiques, recherche + filtre par type à compteurs, tableau paginé
 * (producteurs, parcelles, fiches à vérifier), détail en modale avec lien vers la fiche.
 * Le filtre SCOOP de l'en-tête (`?scoop=`) s'applique.
 */
@Component({
  selector: "app-organisations-page",
  imports: [
    GlobalFiltersComponent,
    AppShellComponent,
    IconComponent,
    DetailModalComponent,
    PaginationComponent,
    StatCardsComponent,
  ],
  styles: [V2_PAGE_STYLES],
  template: `
    <app-shell perm="org.read" [area]="t()('organisations.area')">
      <!-- ───── En-tête ───── -->
      <header class="rise">
        <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("organisations.eyebrow") }}</p>
        <h1
          class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
        >
          {{ t()("organisations.title") }}
        </h1>
        <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
          {{ t()("organisations.lead") }}
        </p>
      </header>

      <!-- ───── Statistiques ───── -->
      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <!-- ───── Recherche · type ───── -->
      <div class="toolbar card mt-6">
        <label class="search">
          <ui-icon name="search" [size]="20" />
          <input
            type="search"
            [placeholder]="t()('organisations.search')"
            [attr.aria-label]="t()('organisations.search')"
            [value]="q()"
            (input)="q.set($any($event.target).value)"
          />
        </label>
        <div class="seg" role="radiogroup" [attr.aria-label]="t()('organisations.col.type')">
          @for (typeButton of typeButtons(); track typeButton.id) {
            <button
              type="button"
              role="radio"
              [class.on]="type() === typeButton.id"
              [attr.aria-checked]="type() === typeButton.id"
              (click)="type.set(typeButton.id)"
            >
              {{ typeButton.label
              }}<span class="n" [class.zero]="!typeButton.count">{{
                nf.format(typeButton.count)
              }}</span>
            </button>
          }
        </div>
        <app-global-filters />
      </div>

      <p class="sub mt-4" aria-live="polite">
        {{
          t()(shown().length > 1 ? "organisations.count.autre" : "organisations.count.un", {
            count: nf.format(shown().length),
          })
        }}
      </p>

      <!-- ───── Liste ───── -->
      <section class="card mt-3 overflow-hidden">
        @if (shown().length) {
          <div class="overflow-x-auto">
            <table class="tbl min-w-[820px]">
              <thead>
                <tr>
                  <th>{{ t()("organisations.col.org") }}</th>
                  <th>{{ t()("organisations.col.type") }}</th>
                  <th>{{ t()("organisations.col.scoop") }}</th>
                  <th class="text-right">{{ t()("organisations.col.producers") }}</th>
                  <th class="text-right">{{ t()("organisations.col.plots") }}</th>
                  <th class="text-right">{{ t()("producteurs.quality.à vérifier") }}</th>
                  <th class="text-right">{{ t()("organisations.col.actions") }}</th>
                </tr>
              </thead>
              <tbody>
                @for (org of pager.items(); track org.id) {
                  <tr class="row-link" (click)="detailId.set(org.id)">
                    <td class="max-w-[280px]">
                      <span class="flex items-center gap-3">
                        <span
                          class="grid size-9 shrink-0 place-items-center rounded-[10px]"
                          [style.background]="org.tone.bg"
                          [style.color]="org.tone.fg"
                          ><ui-icon name="hub" [size]="18"
                        /></span>
                        <span class="min-w-0">
                          <span class="block truncate font-bold">{{ org.name }}</span>
                          <span class="sub block truncate" [class.zero]="!org.village">{{
                            org.village || "—"
                          }}</span>
                        </span>
                      </span>
                    </td>
                    <td>
                      <span
                        class="badge"
                        [style.background]="org.tone.bg"
                        [style.color]="org.tone.fg"
                        >{{ org.type ?? t()("organisations.filter.toQualify") }}</span
                      >
                    </td>
                    <td class="max-w-44 truncate font-medium" [title]="org.scoop">
                      {{ org.scoop }}
                    </td>
                    <td
                      class="text-right font-extrabold tabular-nums"
                      [class.zero]="!org.producers"
                    >
                      {{ nf.format(org.producers) }}
                    </td>
                    <td class="text-right font-semibold tabular-nums" [class.zero]="!org.plots">
                      {{ nf.format(org.plots) }}
                    </td>
                    <td class="text-right">
                      @if (org.toVerify) {
                        <span
                          class="badge tabular-nums"
                          style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
                          >{{ nf.format(org.toVerify) }}</span
                        >
                      } @else {
                        <span class="zero font-semibold tabular-nums">0</span>
                      }
                    </td>
                    <td>
                      <span class="flex justify-end">
                        <button
                          type="button"
                          class="act"
                          [title]="t()('common.view')"
                          [attr.aria-label]="t()('organisations.view.aria', { name: org.name })"
                          (click)="$event.stopPropagation(); detailId.set(org.id)"
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
            <p class="text-[16px] font-extrabold">{{ t()("organisations.empty.none") }}</p>
            <p class="sub">{{ t()("organisations.empty.noneHint") }}</p>
          </div>
        }
      </section>

      <ui-detail-modal [view]="detail()" (closed)="detailId.set(null)" />
    </app-shell>
  `,
})
export default class OrganisationsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  private readonly route = inject(ActivatedRoute);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly q = signal("");
  protected readonly type = signal<string>(ALL);
  protected readonly detailId = signal<string | null>(null);

  /** Filtre SCOOP de l'en-tête (`?scoop=`). */
  private readonly scoopFilter = toSignal(
    this.route.queryParamMap.pipe(map((m) => m.get("scoop") ?? "")),
    { initialValue: "" },
  );

  /** Organisations du périmètre (et de la SCOOP choisie en en-tête), avec leurs compteurs. */
  private readonly all = computed(() => {
    const s = this.store.state();
    const scoop = this.scoopFilter();
    const producers = new Map<string, number>();
    const toVerify = new Map<string, number>();
    const ownerOrg = new Map<string, string>();
    for (const p of s.producers) {
      if (p.mergedInto) continue;
      producers.set(p.orgId, (producers.get(p.orgId) ?? 0) + 1);
      if (p.quality === "à vérifier") toVerify.set(p.orgId, (toVerify.get(p.orgId) ?? 0) + 1);
      ownerOrg.set(p.id, p.orgId);
    }
    const plots = new Map<string, number>();
    for (const pl of s.plots) {
      const org = ownerOrg.get(pl.producerId);
      if (org) plots.set(org, (plots.get(org) ?? 0) + 1);
    }
    const scoopName = new Map(s.scoops.map((c) => [c.id, c.name]));
    return inScope(s.orgs, s.session)
      .filter((o: Org) => !scoop || o.scoopId === scoop)
      .map((o) => ({
        id: o.id,
        name: o.name,
        type: o.type,
        village: o.village,
        scoop: scoopName.get(o.scoopId) ?? o.scoopId,
        tone: typeTone(o.type),
        producers: producers.get(o.id) ?? 0,
        plots: plots.get(o.id) ?? 0,
        toVerify: toVerify.get(o.id) ?? 0,
      }))
      .sort((a, b) => b.producers - a.producers);
  });

  protected readonly typeButtons = computed(() => {
    const t = this.t();
    const all = this.all();
    const counts = new Map<string, number>();
    let unqualified = 0;
    for (const o of all) {
      if (o.type) counts.set(o.type, (counts.get(o.type) ?? 0) + 1);
      else unqualified++;
    }
    return [
      { id: ALL, label: t("producteurs.index.qualityAll"), count: all.length },
      ...[...counts].sort((a, b) => b[1] - a[1]).map(([id, count]) => ({ id, label: id, count })),
      ...(unqualified
        ? [{ id: UNQUALIFIED, label: t("organisations.filter.toQualify"), count: unqualified }]
        : []),
    ];
  });

  protected readonly shown = computed(() => {
    const needle = norm(this.q().trim());
    const type = this.type();
    return this.all().filter(
      (o) =>
        (type === ALL || (type === UNQUALIFIED ? !o.type : o.type === type)) &&
        (!needle || norm(`${o.name} ${o.village} ${o.type ?? ""}`).includes(needle)),
    );
  });

  /** Pagination : mêmes règles que l'API (`GET /v1/organisations?page=&limit=`). */
  protected readonly pager = createPager(() => this.shown());

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const all = this.all();
    const producers = all.reduce((n, o) => n + o.producers, 0);
    const plots = all.reduce((n, o) => n + o.plots, 0);
    const toVerify = all.reduce((n, o) => n + o.toVerify, 0);
    const types = new Set(all.map((o) => o.type).filter(Boolean)).size;
    const unqualified = all.filter((o) => !o.type).length;
    return [
      {
        label: t("organisations.stat.total"),
        value: nf.format(all.length),
        sub: t("organisations.stat.totalSub", { count: types }),
        icon: "hub",
        bg: "",
        fg: "",
      },
      {
        label: t("organisations.stat.producers"),
        value: nf.format(producers),
        sub: t("organisations.stat.producersSub", {
          avg: nf.format(Math.round(producers / (all.length || 1))),
        }),
        icon: "agriculture",
        ...TONE.succes,
      },
      {
        label: t("organisations.stat.plots"),
        value: nf.format(plots),
        sub: t("organisations.stat.plotsSub", { count: nf.format(toVerify) }),
        icon: "landscape",
        ...TONE.info,
      },
      {
        label: t("organisations.stat.toQualify"),
        value: nf.format(unqualified),
        sub: t("organisations.stat.toQualifySub"),
        icon: "warning",
        ...TONE.attente,
      },
    ];
  });

  protected readonly detail = computed<DetailView | null>(() => {
    const id = this.detailId();
    const o = id ? this.all().find((x) => x.id === id) : null;
    if (!o) return null;
    const t = this.t();
    const s = this.store.state();
    const people = s.members
      .filter((m) => m.orgId === o.id)
      .sort((a, b) => `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`));
    const memberTone = (st: string) =>
      st === "membre"
        ? TONE.succes
        : st === "candidat"
          ? TONE.info
          : st === "suspendu"
            ? TONE.attente
            : TONE.neutre;
    return {
      title: o.name,
      subtitle: [o.village, o.scoop].filter(Boolean).join(" · "),
      icon: "hub",
      badges: [{ label: o.type ?? t("organisations.filter.toQualify"), ...o.tone }],
      kpis: [
        detailKpi(t("organisations.col.producers"), o.producers, "agriculture", TONE.succes),
        detailKpi(t("organisations.col.plots"), o.plots, "landscape", TONE.info),
        detailKpi(t("organisations.col.toVerify"), o.toVerify, "warning", TONE.attente),
      ],
      facts: [
        detailFact(
          t("organisations.col.type"),
          o.type ?? t("organisations.filter.toQualify"),
          "hub",
          { tone: o.type ? undefined : TONE.attente },
        ),
        detailFact(t("producteurs.col.village"), o.village, "location_on"),
        detailFact(t("organisations.col.scoop"), o.scoop, "apartment", { wide: true }),
      ],
      sections: [
        {
          title: t("cooperatives.fiche.detail.orgMembers"),
          icon: "group",
          count: people.length,
          empty: t("cooperatives.fiche.detail.orgMembersEmpty"),
          items: people.slice(0, 8).map((m) => ({
            label: `${m.firstName} ${m.lastName}`,
            sub: m.village,
            initials: initialsOf(`${m.firstName} ${m.lastName}`),
            badge: {
              label: t(`cooperatives.fiche.status.${m.status}` as Parameters<typeof t>[0]),
              ...memberTone(m.status),
            },
          })),
          more: Math.max(0, people.length - 8),
        },
      ],
      link: ["/dashboard/organisations", o.id],
    };
  });
}

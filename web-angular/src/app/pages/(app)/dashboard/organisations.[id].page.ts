import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map } from "rxjs";

import { ageAtMost, downloadCsv, fmtAge, fmtDate, nf, nf1 } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { ORG_TYPES, type OrgType, type Producer } from "@/lib/mock/data";
import { inScope } from "@/lib/scope";
import { AccessDeniedError, actions } from "@/lib/store";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { createPager } from "@shared/pager";
import { PlotMapComponent } from "@shared/plot-map.component";
import { StoreService } from "@shared/store.service";
import {
  DetailHeroComponent,
  IconComponent,
  initialsOf,
  ModalComponent,
  PaginationComponent,
  SnackbarService,
  StatCardsComponent,
  TONE,
  V2_PAGE_STYLES,
  type HeroBadge,
  type HeroMeta,
  type StatCard,
} from "@shared/ui";

type Tab = "producers" | "members" | "plots";

const QUALITY: Record<Producer["quality"], { label: MessageKey; bg: string; fg: string }> = {
  validé: { label: "producteurs.quality.validé", ...TONE.succes },
  "à vérifier": { label: "producteurs.quality.à vérifier", ...TONE.attente },
  doublon: { label: "producteurs.quality.doublon", ...TONE.info },
  invalide: { label: "producteurs.quality.invalide", ...TONE.erreur },
};
const PLOT_TONE: Record<string, { bg: string; fg: string }> = {
  relevée: TONE.info,
  validée: TONE.succes,
  "à reprendre": TONE.attente,
  chevauchement: TONE.erreur,
};
const MEMBER_TONE: Record<string, { bg: string; fg: string }> = {
  membre: TONE.succes,
  candidat: TONE.info,
  suspendu: TONE.attente,
  sorti: TONE.neutre,
};
const norm = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Fiche organisation (charte V2) : en-tête, chiffres clés, onglets Producteurs / Adhérents / Parcelles
 * (tableaux paginés, carte), qualification du type et export des producteurs (journal d'audit).
 */
@Component({
  selector: "app-organisation-detail-page",
  imports: [
    AppShellComponent,
    DetailHeroComponent,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    PlotMapComponent,
    RouterLink,
    StatCardsComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .tabs {
        width: fit-content;
        max-width: 100%;
      }
      .tabs button {
        padding: 11px 16px;
        font-size: 15px;
      }
      .map {
        height: 360px;
      }
      .types {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 8px;
      }
      .type {
        border-radius: 14px;
        border: 1.5px solid var(--v2-bord-carte);
        padding: 12px;
        text-align: left;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
      }
      .type:hover {
        border-color: var(--v2-gris-texte);
      }
      .type.on {
        border: 2px solid var(--v2-foret);
        background: var(--v2-sauge);
        padding: 11.5px;
      }
    `,
  ],
  template: `
    <app-shell perm="producer.read" [area]="t()('organisations.detail.area')">
      @if (!org() || !inScopeOrg()) {
        <div class="card mx-auto mt-16 flex max-w-lg flex-col items-center gap-3 p-10 text-center">
          <span
            class="grid size-14 place-items-center rounded-[16px]"
            style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
            ><ui-icon name="hub" [size]="26"
          /></span>
          <h1 class="text-[22px] font-extrabold">
            {{
              org() ? t()("organisations.detail.outOfScope") : t()("organisations.detail.notFound")
            }}
          </h1>
          <p class="sub">
            {{
              org()
                ? t()("organisations.detail.outOfScopeHint")
                : t()("organisations.detail.notFoundHint")
            }}
          </p>
          <a class="btn btn-ghost mt-2" routerLink="/dashboard/organisations">{{
            t()("organisations.title")
          }}</a>
        </div>
      } @else {
        @if (org(); as organisation) {
          <ui-detail-hero
            [crumb]="{ label: t()('organisations.title'), link: '/dashboard/organisations' }"
            [title]="organisation.name"
            [mono]="initials(organisation.name)"
            [badges]="heroBadges()"
            [meta]="heroMeta()"
            [backLabel]="t()('organisations.title')"
          >
            @if (store.can("org.manage")) {
              <button hero-actions type="button" class="btn btn-citron" (click)="openType()">
                <ui-icon name="edit" [size]="18" />{{
                  organisation.type
                    ? t()("organisations.detail.changeType")
                    : t()("organisations.detail.qualifyOrg")
                }}
              </button>
            }
          </ui-detail-hero>

          <ui-stat-cards class="rise mt-6" [stats]="stats()" />

          <!-- Onglets -->
          <div class="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div
              class="seg tabs"
              role="tablist"
              [attr.aria-label]="t()('organisations.v2.tabs.aria')"
            >
              <button
                type="button"
                role="tab"
                [class.on]="tab() === 'producers'"
                [attr.aria-selected]="tab() === 'producers'"
                (click)="tab.set('producers')"
              >
                <ui-icon name="agriculture" [size]="18" />{{ t()("organisations.v2.tab.producers")
                }}<span class="n" [class.zero]="!producers().length">{{ producers().length }}</span>
              </button>
              <button
                type="button"
                role="tab"
                [class.on]="tab() === 'members'"
                [attr.aria-selected]="tab() === 'members'"
                (click)="tab.set('members')"
              >
                <ui-icon name="group" [size]="18" />{{ t()("organisations.v2.tab.members")
                }}<span class="n" [class.zero]="!members().length">{{ members().length }}</span>
              </button>
              <button
                type="button"
                role="tab"
                [class.on]="tab() === 'plots'"
                [attr.aria-selected]="tab() === 'plots'"
                (click)="tab.set('plots')"
              >
                <ui-icon name="landscape" [size]="18" />{{ t()("organisations.v2.tab.plots")
                }}<span class="n" [class.zero]="!plots().length">{{ plots().length }}</span>
              </button>
            </div>
            @if (tab() === "producers" && producers().length) {
              <button type="button" class="btn btn-ghost" (click)="exportProducers()">
                <ui-icon name="download" [size]="18" />{{
                  t()("organisations.detail.exportMembers")
                }}
              </button>
            }
          </div>

          @if (tab() === "producers") {
            <section class="sec-card mt-4">
              <div class="sec-head">
                <label class="search">
                  <ui-icon name="search" [size]="20" />
                  <input
                    type="search"
                    [placeholder]="t()('organisations.detail.search')"
                    [attr.aria-label]="t()('organisations.detail.search')"
                    [value]="q()"
                    (input)="q.set($any($event.target).value)"
                  />
                </label>
              </div>
              @if (shownProducers().length) {
                <div class="overflow-x-auto">
                  <table class="tbl min-w-[720px]">
                    <thead>
                      <tr>
                        <th>{{ t()("organisations.v2.col.producer") }}</th>
                        <th>{{ t()("organisations.v2.col.sexAge") }}</th>
                        <th>{{ t()("organisations.detail.col.village") }}</th>
                        <th>{{ t()("organisations.v2.col.status") }}</th>
                        <th>{{ t()("organisations.v2.col.quality") }}</th>
                        <th class="text-right">{{ t()("organisations.col.actions") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (producer of producerPager.items(); track producer.id) {
                        <tr class="row-link" (click)="openProducer(producer.id)">
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
                                <span class="mono block" style="color: var(--v2-gris-texte)">{{
                                  producer.code
                                }}</span>
                              </span>
                            </span>
                          </td>
                          <td class="whitespace-nowrap font-medium">
                            {{
                              t()(producer.sex === "F" ? "producteurs.sex.F" : "producteurs.sex.H")
                            }}
                            · {{ fmtAge(producer.age) }}
                          </td>
                          <td class="font-medium">{{ producer.village }}</td>
                          <td>
                            <span
                              class="badge"
                              [style.background]="
                                producer.status === 'membre'
                                  ? 'var(--v2-culture-bg)'
                                  : 'var(--v2-lin)'
                              "
                              [style.color]="
                                producer.status === 'membre'
                                  ? 'var(--v2-culture-fg)'
                                  : 'var(--v2-gris-texte)'
                              "
                              >{{
                                t()(
                                  producer.status === "membre"
                                    ? "producteurs.status.membre"
                                    : "producteurs.status.recensé"
                                )
                              }}</span
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
                              <a
                                class="act"
                                [routerLink]="['/dashboard/producteurs', producer.id]"
                                [title]="t()('common.view')"
                                [attr.aria-label]="
                                  t()('organisations.v2.open', {
                                    name: producer.firstName + ' ' + producer.lastName,
                                  })
                                "
                                (click)="$event.stopPropagation()"
                              >
                                <ui-icon name="visibility" [size]="18" />
                              </a>
                            </span>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
                <ui-pagination class="px-5 pb-5" [pager]="producerPager" />
              } @else {
                <p class="sub border-t px-5 py-6" style="border-color: var(--v2-separateur)">
                  {{
                    producers().length
                      ? t()("organisations.detail.noMatch")
                      : t()("organisations.v2.empty.producers")
                  }}
                </p>
              }
            </section>
          }

          @if (tab() === "members") {
            <section class="sec-card mt-4">
              @if (members().length) {
                <div class="overflow-x-auto">
                  <table class="tbl min-w-[600px]">
                    <thead>
                      <tr>
                        <th>{{ t()("cooperatives.fiche.membres.col.name") }}</th>
                        <th>{{ t()("organisations.detail.col.village") }}</th>
                        <th>{{ t()("organisations.v2.col.status") }}</th>
                        <th>{{ t()("organisations.v2.col.joined") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (member of memberPager.items(); track member.id) {
                        <tr>
                          <td>
                            <span class="flex items-center gap-3">
                              <span class="avatar">{{
                                initials(member.firstName + " " + member.lastName)
                              }}</span>
                              <span class="min-w-0">
                                <span class="block truncate font-bold"
                                  >{{ member.firstName }} {{ member.lastName }}</span
                                >
                                <span class="sub block tabular-nums" [class.zero]="!member.phone">{{
                                  store.phone(member.phone) || "—"
                                }}</span>
                              </span>
                            </span>
                          </td>
                          <td class="font-medium">{{ member.village || "—" }}</td>
                          <td>
                            <span
                              class="badge"
                              [style.background]="memberTone(member.status).bg"
                              [style.color]="memberTone(member.status).fg"
                              >{{ t()(memberKey(member.status)) }}</span
                            >
                          </td>
                          <td class="font-medium tabular-nums" [class.zero]="!member.joinedAt">
                            {{ member.joinedAt ? fmtDate(member.joinedAt) : "—" }}
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
                <ui-pagination class="px-5 pb-5" [pager]="memberPager" />
              } @else {
                <p class="sub px-5 py-6">{{ t()("organisations.v2.empty.members") }}</p>
              }
            </section>
          }

          @if (tab() === "plots") {
            @if (plots().length) {
              <div class="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                @if (store.can("map.read")) {
                  <section class="sec-card">
                    <div class="map">
                      <app-plot-map
                        [plots]="plots()"
                        [selectedId]="selectedPlot() ?? plots()[0]!.id"
                        basemap="sat"
                        [onSelect]="selectPlot"
                      />
                    </div>
                  </section>
                }
                <section class="sec-card">
                  <div class="overflow-x-auto">
                    <table class="tbl min-w-[520px]">
                      <thead>
                        <tr>
                          <th>{{ t()("organisations.v2.col.plot") }}</th>
                          <th>{{ t()("organisations.v2.col.crop") }}</th>
                          <th class="text-right">{{ t()("organisations.v2.col.measured") }}</th>
                          <th>{{ t()("organisations.v2.col.state") }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        @for (plot of plotPager.items(); track plot.id) {
                          <tr
                            class="row-link"
                            tabindex="0"
                            [class.font-bold]="selectedPlot() === plot.id"
                            (click)="selectPlot(plot.id)"
                            (keydown.enter)="selectPlot(plot.id)"
                          >
                            <td>
                              <span class="mono" style="color: var(--v2-foret)">{{
                                plot.code
                              }}</span>
                            </td>
                            <td class="font-semibold">{{ plot.crop }}</td>
                            <td class="text-right font-extrabold tabular-nums">
                              {{ nf1.format(plot.measured) }} ha
                            </td>
                            <td>
                              <span
                                class="badge"
                                [style.background]="plotTone(plot.status).bg"
                                [style.color]="plotTone(plot.status).fg"
                                >{{ plot.status }}</span
                              >
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                  <ui-pagination class="px-5 pb-5" [pager]="plotPager" />
                </section>
              </div>
            } @else {
              <p class="card sub mt-4 p-6">{{ t()("organisations.v2.empty.plots") }}</p>
            }
          }

          <!-- Qualifier / modifier le type -->
          <ui-modal
            [open]="typeOpen()"
            [title]="
              organisation.type
                ? t()('organisations.detail.changeType')
                : t()('organisations.detail.qualifyOrg')
            "
            [description]="t()('organisations.detail.dialogHint')"
            icon="hub"
            [width]="560"
            [closeLabel]="t()('common.close')"
            (closed)="typeOpen.set(false)"
          >
            <div
              class="types pb-5"
              role="radiogroup"
              [attr.aria-label]="t()('organisations.detail.chooseType')"
            >
              @for (orgType of orgTypes; track orgType) {
                <button
                  type="button"
                  role="radio"
                  class="type"
                  [class.on]="pickType() === orgType"
                  [attr.aria-checked]="pickType() === orgType"
                  (click)="pickType.set(orgType)"
                >
                  {{ locale.tEnum("organisations.type", orgType) }}
                </button>
              }
            </div>
            <button modal-footer type="button" class="btn btn-ghost" (click)="typeOpen.set(false)">
              {{ t()("common.cancel") }}
            </button>
            <button
              modal-footer
              type="button"
              class="btn btn-primary"
              [disabled]="!pickType()"
              (click)="saveType(organisation.id)"
            >
              {{ t()("organisations.detail.save")
              }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
            </button>
          </ui-modal>
        }
      }
    </app-shell>
  `,
})
export default class OrganisationDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackbar = inject(SnackbarService);
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf1 = nf1;
  protected readonly fmtAge = fmtAge;
  protected readonly fmtDate = fmtDate;
  protected readonly initials = initialsOf;
  protected readonly quality = QUALITY;
  protected readonly orgTypes = ORG_TYPES;

  protected readonly tab = signal<Tab>("producers");
  protected readonly q = signal("");
  protected readonly selectedPlot = signal<string | undefined>(undefined);
  protected readonly selectPlot = (id: string) => this.selectedPlot.set(id);
  protected readonly typeOpen = signal(false);
  protected readonly pickType = signal<OrgType | null>(null);

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "")), {
    initialValue: "",
  });

  protected readonly org = computed(() => this.store.state().orgs.find((o) => o.id === this.id()));

  protected readonly inScopeOrg = computed(() => {
    const o = this.org();
    return !!o && inScope([o], this.store.state().session).length === 1;
  });

  protected readonly producers = computed(() =>
    this.store
      .state()
      .producers.filter((p) => p.orgId === this.id() && !p.mergedInto)
      .sort((a, b) => `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`)),
  );

  protected readonly shownProducers = computed(() => {
    const needle = norm(this.q().trim());
    return this.producers().filter(
      (p) =>
        !needle || norm(`${p.firstName} ${p.lastName} ${p.code} ${p.village}`).includes(needle),
    );
  });

  protected readonly members = computed(() =>
    this.store
      .state()
      .members.filter((m) => m.orgId === this.id())
      .sort((a, b) => `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`)),
  );

  protected readonly plots = computed(() => {
    const ids = new Set(this.producers().map((p) => p.id));
    return this.store.state().plots.filter((pl) => ids.has(pl.producerId));
  });

  /** Pagination : mêmes règles que l'API (?page=&limit=). */
  protected readonly producerPager = createPager(() => this.shownProducers());
  protected readonly memberPager = createPager(() => this.members());
  protected readonly plotPager = createPager(() => this.plots());

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const ps = this.producers();
    const plots = this.plots();
    const plotIds = new Set(plots.map((pl) => pl.id));
    const ids = new Set(ps.map((p) => p.id));
    const alerts = this.store
      .state()
      .alerts.filter(
        (a) =>
          (ids.has(a.entityId) || plotIds.has(a.entityId)) &&
          (a.status === "ouvert" || a.status === "en vérification"),
      ).length;
    const women = ps.filter((p) => p.sex === "F").length;
    const youthAge = this.store.state().youthMaxAge;
    const youth = ps.filter((p) => ageAtMost(p.age, youthAge)).length;
    const measured = plots.reduce((n, pl) => n + (pl.measured || 0), 0);
    const declared = plots.reduce((n, pl) => n + (pl.declared || 0), 0);
    const toVerify = ps.filter((p) => p.quality !== "validé").length;
    return [
      {
        label: t("organisations.col.producers"),
        value: nf.format(ps.length),
        sub: t("organisations.v2.stat.producersSub", {
          women: nf.format(women),
          men: nf.format(ps.length - women),
        }),
        icon: "agriculture",
        bg: "",
        fg: "",
      },
      {
        label: t("organisations.detail.youth", { age: youthAge }),
        value: nf.format(youth),
        sub: t("producteurs.index.stat.shareSub", {
          pct: ps.length ? Math.round((youth / ps.length) * 100) : 0,
        }),
        icon: "grass",
        ...TONE.attente,
      },
      {
        label: t("organisations.detail.measuredArea"),
        value: `${nf1.format(measured)} ha`,
        sub: t("organisations.v2.stat.areaSub", { declared: nf1.format(declared) }),
        icon: "square_foot",
        ...TONE.succes,
      },
      {
        label: t("organisations.col.toVerify"),
        value: nf.format(toVerify),
        sub: t("organisations.v2.stat.toVerifySub", { alerts }),
        icon: "warning",
        ...(toVerify ? TONE.erreur : TONE.succes),
      },
    ];
  });

  protected readonly heroBadges = computed<HeroBadge[]>(() => {
    const o = this.org();
    if (!o) return [];
    return [
      o.type
        ? { label: this.locale.tEnum("organisations.type", o.type), tone: "citron", icon: "hub" }
        : { label: this.t()("organisations.toQualify"), tone: "warn", icon: "warning" },
    ];
  });

  protected readonly heroMeta = computed<HeroMeta[]>(() => {
    const o = this.org();
    if (!o) return [];
    return [
      ...(o.village ? [{ icon: "location_on" as const, text: o.village }] : []),
      { icon: "apartment", text: this.scoopName(o.scoopId) },
      {
        icon: "landscape",
        text: `${nf.format(this.plots().length)} ${this.t()("organisations.v2.tab.plots").toLowerCase()}`,
      },
    ];
  });

  protected scoopName(scoopId: string): string {
    return this.store.state().scoops.find((c) => c.id === scoopId)?.name ?? "";
  }

  protected plotTone(status: string) {
    return PLOT_TONE[status] ?? TONE.neutre;
  }

  protected memberTone(status: string) {
    return MEMBER_TONE[status] ?? TONE.neutre;
  }

  protected memberKey(status: string): MessageKey {
    return `cooperatives.fiche.status.${status}` as MessageKey;
  }

  protected openProducer(id: string): void {
    void this.router.navigate(["/dashboard/producteurs", id]);
  }

  protected openType(): void {
    this.pickType.set(this.org()?.type ?? null);
    this.typeOpen.set(true);
  }

  protected saveType(id: string): void {
    const type = this.pickType();
    if (!type) return;
    try {
      actions.qualifyOrgs([id], type);
    } catch (e) {
      this.snackbar.error(e instanceof AccessDeniedError ? this.locale.tNow(e.key) : String(e));
      return;
    }
    this.typeOpen.set(false);
    this.snackbar.success(
      this.t()("organisations.detail.typeAssigned", {
        type: this.locale.tEnum("organisations.type", type),
      }),
    );
  }

  /** Export CSV des producteurs de l'organisation (anonymisé sans le droit d'export nominatif), tracé. */
  protected exportProducers(): void {
    const o = this.org();
    if (!o) return;
    const nominatif = this.store.can("producer.export_nominatif");
    const head = nominatif
      ? ["Code", "Prénom", "Nom", "Sexe", "Âge", "Village", "Statut", "Qualité"]
      : ["Code", "Sexe", "Âge", "Village", "Statut", "Qualité"];
    const rows = this.producers().map((p) =>
      nominatif
        ? [p.code, p.firstName, p.lastName, p.sex, p.age ?? "", p.village, p.status, p.quality]
        : [p.code, p.sex, p.age ?? "", p.village, p.status, p.quality],
    );
    try {
      downloadCsv(`organisation_${o.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.csv`, [
        head,
        ...rows,
      ]);
    } catch {
      this.snackbar.error(this.t()("common.exportError"));
      return;
    }
    actions.audit(
      nominatif ? "Export nominatif" : "Export anonymisé",
      `Organisation ${o.name}`,
      `${rows.length} lignes (CSV)`,
    );
    this.snackbar.success(
      `${this.t()("organisations.exported")} · ${this.t()("organisations.detail.exportedHint")}`,
    );
  }
}

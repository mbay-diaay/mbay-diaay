import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";

import { fmtAge, fmtDate, fmtDateTime, maskCni, maskPhone, nf, nf1 } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import type { CorrectionChange, Producer } from "@/lib/mock/data";
import { inScope } from "@/lib/store";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { PlotMapComponent } from "@shared/plot-map.component";
import { StoreService } from "@shared/store.service";
import {
  DetailHeroComponent,
  IconComponent,
  initialsOf,
  ModalComponent,
  SnackbarService,
  StatCardsComponent,
  TextFieldComponent,
  TONE,
  V2_PAGE_STYLES,
  type HeroBadge,
  type HeroMeta,
  type StatCard,
} from "@shared/ui";

/** Couleur d'état d'une parcelle (charte V2). */
const PLOT_TONE: Record<string, { bg: string; fg: string }> = {
  relevée: TONE.info,
  validée: TONE.succes,
  "à reprendre": TONE.attente,
  chevauchement: TONE.erreur,
};

const QUALITY_TONE: Record<Producer["quality"], { label: MessageKey; bg: string; fg: string }> = {
  validé: { label: "producteurs.quality.validé", ...TONE.succes },
  "à vérifier": { label: "producteurs.quality.à vérifier", ...TONE.attente },
  doublon: { label: "producteurs.quality.doublon", ...TONE.info },
  invalide: { label: "producteurs.quality.invalide", ...TONE.erreur },
};

const STATUS_KEY = {
  recensé: "producteurs.status.recensé",
  membre: "producteurs.status.membre",
} as const satisfies Record<Producer["status"], MessageKey>;

const PHONE_RE = /^7[0678]\s?\d{3}\s?\d{2}\s?\d{2}$/;

/**
 * Fiche producteur (charte V2) : en-tête, chiffres clés, identité (CNI et téléphone révélés avec trace),
 * carte et tableau des parcelles, cultures, historique ; demande de correction et révélation CNI en modale.
 */
@Component({
  selector: "app-producteur-detail-page",
  imports: [
    AppShellComponent,
    DetailHeroComponent,
    IconComponent,
    ModalComponent,
    PlotMapComponent,
    RouterLink,
    StatCardsComponent,
    TextFieldComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .grid-main {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 1100px) {
        .grid-main {
          grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
        }
      }
      .map {
        height: 100%;
        min-height: 300px;
      }
      .timeline li {
        position: relative;
        display: flex;
        gap: 14px;
        padding: 12px 20px;
        border-top: 1px solid var(--v2-separateur);
      }
      .dot {
        margin-top: 4px;
        height: 12px;
        width: 12px;
        flex-shrink: 0;
        border-radius: 999px;
        background: var(--v2-foret);
        box-shadow: 0 0 0 4px var(--v2-sauge);
      }
      .chg {
        display: grid;
        gap: 6px;
        border-radius: 16px;
        background: var(--v2-creme);
        padding: 12px 14px;
        font-size: 14px;
      }
      .seg-form button {
        flex: 1;
        justify-content: center;
      }
    `,
  ],
  template: `
    <app-shell perm="producer.read" [area]="t()('producteurs.detail.area')">
      @if (producer(); as current) {
        @if (!inScopeProducer()) {
          <div
            class="card mx-auto mt-16 flex max-w-lg flex-col items-center gap-3 p-10 text-center"
          >
            <span
              class="grid size-14 place-items-center rounded-[16px]"
              style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
              ><ui-icon name="warning" [size]="26"
            /></span>
            <h1 class="text-[22px] font-extrabold">{{ t()("producteurs.detail.outOfScope") }}</h1>
            <p class="sub">{{ t()("producteurs.detail.outOfScopeDesc") }}</p>
            <a class="btn btn-ghost mt-2" routerLink="/dashboard/producteurs">{{
              t()("producteurs.index.title")
            }}</a>
          </div>
        } @else {
          <ui-detail-hero
            [crumb]="{ label: t()('producteurs.index.title'), link: '/dashboard/producteurs' }"
            [title]="current.firstName + ' ' + current.lastName"
            [eyebrow]="current.code"
            [mono]="initials(current.firstName + ' ' + current.lastName)"
            [badges]="heroBadges()"
            [meta]="heroMeta()"
            [backLabel]="t()('producteurs.fiche.back')"
          >
            @if (store.can("producer.edit")) {
              <button hero-actions type="button" class="btn btn-citron" (click)="openCorrection()">
                <ui-icon name="edit" [size]="18" />{{ t()("producteurs.detail.requestEdit") }}
              </button>
            }
          </ui-detail-hero>

          @if (current.mergedInto) {
            <p class="notice mt-4" style="background: var(--v2-info-bg); color: var(--v2-info-fg)">
              <ui-icon name="info" [size]="18" />{{ t()("producteurs.detail.merged") }}
              <a class="underline" [routerLink]="['/dashboard/producteurs', current.mergedInto]">{{
                t()("producteurs.detail.seeMain")
              }}</a>
            </p>
          }

          <ui-stat-cards class="rise mt-6" [stats]="stats()" />

          <div class="grid-main mt-6">
            <!-- Identité -->
            <section class="sec-card">
              <div class="sec-head">
                <h2>
                  <span class="sec-ico"><ui-icon name="person" [size]="18" /></span
                  >{{ t()("producteurs.detail.identity") }}
                </h2>
              </div>
              <dl class="facts">
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="person" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("producteurs.detail.sex") }}</dt>
                    <dd>
                      {{ t()(current.sex === "F" ? "producteurs.sex.F" : "producteurs.sex.H") }}
                    </dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="calendar_today" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("producteurs.detail.age") }}</dt>
                    <dd [class.zero]="current.age === null">
                      {{ current.age === null ? "—" : fmtAge(current.age) }}
                    </dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="badge" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("producteurs.detail.cni") }}</dt>
                    <dd class="tabular-nums">
                      {{
                        showCni() ? current.cni || t()("producteurs.notSet") : maskCni(current.cni)
                      }}
                      @if (canCni() && current.cni && !showCni()) {
                        <button type="button" class="reveal" (click)="openCniDialog()">
                          <ui-icon name="visibility" [size]="14" />{{
                            t()("producteurs.detail.reveal")
                          }}
                        </button>
                      }
                    </dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="call" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("producteurs.detail.phone") }}</dt>
                    <dd class="tabular-nums" [class.zero]="!current.phone">
                      {{
                        showPhone() || store.can("contact.read")
                          ? current.phone || "—"
                          : maskPhone(current.phone)
                      }}
                      @if (
                        current.phone &&
                        !showPhone() &&
                        !store.can("contact.read") &&
                        store.can("producer.edit")
                      ) {
                        <button type="button" class="reveal" (click)="revealPhone(current)">
                          <ui-icon name="visibility" [size]="14" />{{
                            t()("producteurs.detail.reveal")
                          }}
                        </button>
                      }
                    </dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="location_on" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("producteurs.col.village") }}</dt>
                    <dd>{{ current.village }}</dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="hub" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("producteurs.detail.organisation") }}</dt>
                    <dd>
                      @if (org(current.orgId); as organisation) {
                        <a
                          class="underline decoration-[var(--v2-gris-trait)] underline-offset-4 hover:text-[var(--v2-vert-pousse)]"
                          [routerLink]="['/dashboard/organisations', organisation.id]"
                          >{{ organisation.name }}</a
                        >
                      } @else {
                        <span class="zero">—</span>
                      }
                    </dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="apartment" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("producteurs.v2.coop") }}</dt>
                    <dd>{{ scoopName(current.scoopId) }}</dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="accessibility" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("producteurs.detail.handicap") }}</dt>
                    <dd>
                      {{
                        t()(current.handicap ? "producteurs.detail.yes" : "producteurs.detail.no")
                      }}
                    </dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="badge" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("producteurs.detail.enumerator") }}</dt>
                    <dd>{{ current.enumerator }}</dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="event_note" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("producteurs.detail.createdAt") }}</dt>
                    <dd>{{ fmtDate(current.createdAt) }}</dd>
                  </div>
                </div>
              </dl>
            </section>

            <!-- Carte des parcelles -->
            @if (plots().length && store.can("map.read")) {
              <section class="sec-card flex flex-col">
                <div class="sec-head">
                  <h2>
                    <span class="sec-ico"><ui-icon name="map" [size]="18" /></span
                    >{{ t()("producteurs.detail.plotsMap") }}
                  </h2>
                </div>
                <div class="map flex-1 border-t" style="border-color: var(--v2-separateur)">
                  <app-plot-map
                    [plots]="plots()"
                    [selectedId]="selectedPlotId() ?? plots()[0]!.id"
                    basemap="sat"
                    [onSelect]="selectPlot"
                  />
                </div>
                <p class="sub px-5 py-3">{{ t()("producteurs.detail.plotsMapHint") }}</p>
              </section>
            }
          </div>

          <!-- Parcelles -->
          <section class="sec-card mt-4">
            <div class="sec-head">
              <h2>
                <span class="sec-ico"><ui-icon name="landscape" [size]="18" /></span
                >{{ t()("producteurs.detail.section.plots")
                }}<span class="n">{{ nf.format(plots().length) }}</span>
              </h2>
            </div>
            @if (plots().length) {
              <div class="overflow-x-auto">
                <table class="tbl min-w-[640px]">
                  <thead>
                    <tr>
                      <th>{{ t()("producteurs.v2.col.plot") }}</th>
                      <th>{{ t()("producteurs.v2.col.crop") }}</th>
                      <th class="text-right">{{ t()("producteurs.v2.col.declared") }}</th>
                      <th class="text-right">{{ t()("producteurs.v2.col.measured") }}</th>
                      <th>{{ t()("producteurs.v2.col.campaign") }}</th>
                      <th>{{ t()("producteurs.v2.col.status") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (plot of plots(); track plot.id) {
                      <tr
                        class="row-link"
                        [class.font-bold]="selectedPlotId() === plot.id"
                        [attr.aria-label]="t()('producteurs.v2.viewPlot', { code: plot.code })"
                        tabindex="0"
                        (click)="selectPlot(plot.id)"
                        (keydown.enter)="selectPlot(plot.id)"
                      >
                        <td>
                          <span class="mono" style="color: var(--v2-foret)">{{ plot.code }}</span>
                        </td>
                        <td class="font-semibold">{{ plot.crop }}</td>
                        <td class="text-right tabular-nums">{{ nf1.format(plot.declared) }} ha</td>
                        <td class="text-right font-extrabold tabular-nums">
                          {{ nf1.format(plot.measured) }} ha
                        </td>
                        <td class="font-medium">{{ plot.campaign }}</td>
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
            } @else {
              <p class="sub border-t px-5 py-5" style="border-color: var(--v2-separateur)">
                {{ t()("producteurs.detail.plots.empty") }}
              </p>
            }
          </section>

          <div class="mt-4 grid gap-4 lg:grid-cols-2">
            <!-- Cultures -->
            <section class="sec-card">
              <div class="sec-head">
                <h2>
                  <span class="sec-ico"><ui-icon name="grass" [size]="18" /></span
                  >{{ t()("producteurs.detail.section.crops")
                  }}<span class="n">{{ current.crops.length }}</span>
                </h2>
              </div>
              <ul>
                @for (crop of current.crops; track crop.campaign + crop.crop) {
                  <li
                    class="flex items-center gap-3 border-t px-5 py-3"
                    style="border-color: var(--v2-separateur)"
                  >
                    <span class="avatar" style="height: 32px; width: 32px; font-size: 11px">{{
                      crop.crop.slice(0, 2).toUpperCase()
                    }}</span>
                    <span class="min-w-0 flex-1 font-bold">{{ crop.crop }}</span>
                    <span class="sub tabular-nums"
                      >{{ crop.campaign }} · {{ nf1.format(crop.area) }} ha</span
                    >
                  </li>
                } @empty {
                  <li class="sub border-t px-5 py-5" style="border-color: var(--v2-separateur)">
                    {{ t()("producteurs.detail.crops.empty") }}
                  </li>
                }
              </ul>
            </section>

            <!-- Historique -->
            <section class="sec-card">
              <div class="sec-head">
                <h2>
                  <span class="sec-ico"><ui-icon name="event_note" [size]="18" /></span
                  >{{ t()("producteurs.detail.section.history")
                  }}<span class="n">{{ current.history.length }}</span>
                </h2>
              </div>
              <ol class="timeline">
                @for (historyEntry of current.history; track historyEntry.at + historyEntry.field) {
                  <li>
                    <span class="dot" aria-hidden="true"></span>
                    <span class="min-w-0">
                      <span class="block font-bold">{{ historyEntry.field }}</span>
                      <span class="block text-[14px]"
                        ><span class="line-through" style="color: var(--v2-gris-texte)">{{
                          historyEntry.from || t()("producteurs.notSet")
                        }}</span>
                        → <b>{{ historyEntry.to }}</b></span
                      >
                      <span class="sub block"
                        >{{ fmtDateTime(historyEntry.at) }} · {{ historyEntry.by }}</span
                      >
                    </span>
                  </li>
                } @empty {
                  <li class="sub">{{ t()("producteurs.detail.history.empty") }}</li>
                }
              </ol>
            </section>
          </div>

          <!-- Révéler la CNI -->
          <ui-modal
            [open]="cniOpen()"
            [title]="t()('producteurs.detail.cniDialog.title')"
            [description]="t()('producteurs.detail.cniDialog.description')"
            icon="badge"
            [width]="540"
            [closeLabel]="t()('common.close')"
            (closed)="closeCniDialog()"
          >
            <label class="lbl" for="cni-reason">{{
              t()("producteurs.detail.cniDialog.reason")
            }}</label>
            <textarea
              id="cni-reason"
              class="area mb-5 mt-2"
              [placeholder]="t()('producteurs.detail.cniDialog.reasonPlaceholder')"
              [value]="cniReason()"
              (input)="cniReason.set($any($event.target).value)"
            ></textarea>
            <button modal-footer type="button" class="btn btn-ghost" (click)="closeCniDialog()">
              {{ t()("common.cancel") }}
            </button>
            <button
              modal-footer
              type="button"
              class="btn btn-primary"
              [disabled]="cniReason().trim().length < 3"
              (click)="confirmRevealCni()"
            >
              {{ t()("producteurs.detail.cniDialog.submit")
              }}<span class="btn-chip"><ui-icon name="visibility" [size]="18" /></span>
            </button>
          </ui-modal>

          <!-- Demander une correction -->
          <ui-modal
            [open]="correctionOpen()"
            [title]="correctionDialogTitle()"
            [description]="t()('producteurs.detail.correction.description')"
            icon="edit"
            [width]="640"
            [closeLabel]="t()('common.close')"
            (closed)="correctionOpen.set(false)"
          >
            <div class="grid gap-5 pb-5 sm:grid-cols-2">
              <ui-text-field
                preset="firstName"
                [label]="t()('producteurs.detail.correction.firstName')"
                [value]="corrFirstName()"
                (valueChange)="corrFirstName.set($event)"
              />
              <ui-text-field
                preset="lastName"
                [label]="t()('producteurs.detail.correction.lastName')"
                [value]="corrLastName()"
                (valueChange)="corrLastName.set($event)"
              />
              <ui-text-field
                preset="phone"
                [label]="t()('producteurs.detail.correction.phone')"
                [value]="corrPhone()"
                [error]="corrPhoneErr()"
                (valueChange)="corrPhone.set($event)"
              />
              <ui-text-field
                preset="age"
                [label]="t()('producteurs.detail.correction.age')"
                [value]="corrAge()"
                [error]="corrAgeErr()"
                (valueChange)="corrAge.set($event)"
              />
              <div class="sm:col-span-2">
                <p class="lbl">{{ t()("producteurs.detail.correction.status") }}</p>
                <div
                  class="seg seg-form mt-2"
                  role="radiogroup"
                  [attr.aria-label]="t()('producteurs.detail.correction.status')"
                >
                  <button
                    type="button"
                    role="radio"
                    [class.on]="corrStatus() === 'recensé'"
                    [attr.aria-checked]="corrStatus() === 'recensé'"
                    (click)="corrStatus.set('recensé')"
                  >
                    {{ t()("producteurs.status.recensé") }}
                  </button>
                  <button
                    type="button"
                    role="radio"
                    [class.on]="corrStatus() === 'membre'"
                    [attr.aria-checked]="corrStatus() === 'membre'"
                    (click)="corrStatus.set('membre')"
                  >
                    {{ t()("producteurs.status.membre") }}
                  </button>
                </div>
              </div>
              @if (correctionChanges().length > 0) {
                <div class="chg sm:col-span-2">
                  <p class="lbl">
                    {{
                      t()("producteurs.detail.correction.beforeAfter", {
                        n: correctionChanges().length,
                      })
                    }}
                  </p>
                  @for (
                    change of correctionChanges();
                    track change.field + change.from + change.to
                  ) {
                    <p>
                      <b>{{ change.field }}</b> :
                      <span class="line-through" style="color: var(--v2-gris-texte)">{{
                        showVal(change.field, change.from)
                      }}</span>
                      →
                      <b style="color: var(--v2-vert-pousse)">{{
                        showVal(change.field, change.to)
                      }}</b>
                    </p>
                  }
                </div>
              }
              <div class="sm:col-span-2">
                <label class="lbl" for="corr-motif">{{
                  t()("producteurs.detail.correction.motif")
                }}</label>
                <textarea
                  id="corr-motif"
                  class="area mt-2"
                  [placeholder]="t()('producteurs.detail.correction.motifPlaceholder')"
                  [value]="corrMotif()"
                  (input)="corrMotif.set($any($event.target).value)"
                ></textarea>
              </div>
            </div>
            <button
              modal-footer
              type="button"
              class="btn btn-ghost"
              (click)="correctionOpen.set(false)"
            >
              {{ t()("common.cancel") }}
            </button>
            <button
              modal-footer
              type="button"
              class="btn btn-primary"
              [disabled]="!canSubmitCorrection()"
              (click)="submitCorrectionForm()"
            >
              {{ t()("producteurs.detail.correction.submit")
              }}<span class="btn-chip"><ui-icon name="arrow_forward" [size]="18" /></span>
            </button>
          </ui-modal>
        }
      } @else {
        <div class="card mx-auto mt-16 flex max-w-lg flex-col items-center gap-3 p-10 text-center">
          <span
            class="grid size-14 place-items-center rounded-[16px]"
            style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
            ><ui-icon name="warning" [size]="26"
          /></span>
          <h1 class="text-[22px] font-extrabold">{{ t()("producteurs.detail.notFound") }}</h1>
          <p class="sub">{{ t()("producteurs.detail.notFoundDesc") }}</p>
          <a class="btn btn-ghost mt-2" routerLink="/dashboard/producteurs">{{
            t()("producteurs.index.title")
          }}</a>
        </div>
      }
    </app-shell>
  `,
})
export default class ProducteurDetailPage {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(StoreService);
  readonly locale = inject(LocaleService);
  readonly t = this.locale.t;
  readonly fmtAge = fmtAge;
  readonly fmtDateTime = fmtDateTime;
  readonly fmtDate = fmtDate;
  readonly maskPhone = maskPhone;
  readonly maskCni = maskCni;
  readonly nf = nf;
  readonly nf1 = nf1;
  readonly initials = initialsOf;
  readonly STATUS_KEY = STATUS_KEY;
  private readonly snackbar = inject(SnackbarService);

  readonly selectedPlotId = signal<string | undefined>(undefined);
  readonly selectPlot = (id: string) => this.selectedPlotId.set(id);

  readonly showCni = signal(false);
  readonly showPhone = signal(false);
  readonly cniOpen = signal(false);
  readonly cniReason = signal("");

  readonly correctionOpen = signal(false);
  readonly corrFirstName = signal("");
  readonly corrLastName = signal("");
  readonly corrPhone = signal("");
  readonly corrAge = signal("");
  readonly corrStatus = signal<Producer["status"]>("recensé");
  readonly corrMotif = signal("");

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "")), {
    initialValue: "",
  });

  readonly producer = computed(() => {
    const id = this.id();
    return this.store.state().producers.find((p) => p.id === id);
  });

  readonly inScopeProducer = computed(() => {
    const p = this.producer();
    if (!p) return false;
    return inScope([p], this.store.state().session).length === 1;
  });

  readonly plots = computed(() => {
    const id = this.id();
    return this.store.state().plots.filter((pl) => pl.producerId === id);
  });

  readonly canCni = () => this.store.can("identity.read_full");

  plotTone(status: string) {
    return PLOT_TONE[status] ?? TONE.neutre;
  }

  scoopName(id: string): string {
    return this.store.state().scoops.find((c) => c.id === id)?.name ?? id;
  }

  readonly heroBadges = computed<HeroBadge[]>(() => {
    const p = this.producer();
    if (!p) return [];
    const t = this.t();
    const q = QUALITY_TONE[p.quality];
    return [
      {
        label: t(STATUS_KEY[p.status]),
        tone: p.status === "membre" ? "citron" : "light",
        icon: p.status === "membre" ? "check_circle" : "person",
      },
      {
        label: t(q.label),
        tone: p.quality === "validé" ? "glass" : p.quality === "invalide" ? "danger" : "warn",
        icon: p.quality === "validé" ? "task_alt" : "warning",
      },
      ...(p.mergedInto
        ? [{ label: t("producteurs.detail.merged"), tone: "warn" as const, icon: "info" as const }]
        : []),
    ];
  });

  readonly heroMeta = computed<HeroMeta[]>(() => {
    const p = this.producer();
    if (!p) return [];
    const o = this.org(p.orgId);
    return [
      { icon: "location_on", text: p.village },
      ...(o ? [{ icon: "hub" as const, text: o.name }] : []),
      { icon: "apartment", text: this.scoopName(p.scoopId) },
    ];
  });

  readonly stats = computed<StatCard[]>(() => {
    const p = this.producer();
    if (!p) return [];
    const t = this.t();
    const plots = this.plots();
    const measured = plots.reduce((n, x) => n + (x.measured || 0), 0);
    const declared = plots.reduce((n, x) => n + (x.declared || 0), 0);
    return [
      {
        label: t("producteurs.v2.kpi.plots"),
        value: nf.format(plots.length),
        sub: t("producteurs.v2.kpi.plotsSub", {
          count: plots.filter((x) => x.status === "validée").length,
        }),
        icon: "landscape",
        bg: "",
        fg: "",
      },
      {
        label: t("producteurs.v2.kpi.area"),
        value: `${nf1.format(measured)} ha`,
        sub: t("producteurs.v2.kpi.areaSub", { declared: nf1.format(declared) }),
        icon: "square_foot",
        ...TONE.succes,
      },
      {
        label: t("producteurs.v2.kpi.crops"),
        value: nf.format(p.crops.length),
        sub: t("producteurs.v2.kpi.cropsSub", {
          count: new Set(p.crops.map((c) => c.campaign)).size,
        }),
        icon: "grass",
        ...TONE.culture,
      },
      {
        label: t("producteurs.v2.kpi.changes"),
        value: nf.format(p.history.length),
        sub: t("producteurs.v2.kpi.changesSub"),
        icon: "event_note",
        ...TONE.info,
      },
    ];
  });

  org(orgId: string): { id: string; name: string } | undefined {
    const o = this.store.state().orgs.find((x) => x.id === orgId);
    return o ? { id: o.id, name: o.name } : undefined;
  }

  showVal(field: string, v: string): string {
    const tr = this.t();
    if (field === "Téléphone") return v ? maskPhone(v) : tr("producteurs.notSet");
    if (field === "CNI") return v ? maskCni(v) : tr("producteurs.notSet");
    return v || tr("producteurs.notSet");
  }

  readonly correctionDialogTitle = computed(() => {
    const p = this.producer();
    if (!p) return "";
    return this.t()("producteurs.detail.correction.title", {
      name: `${p.firstName} ${p.lastName}`,
    });
  });

  corrPhoneErr(): string {
    if (!this.correctionOpen()) return "";
    const phone = this.corrPhone().trim();
    if (!phone) return "";
    return PHONE_RE.test(phone) ? "" : this.t()("producteurs.detail.correction.phoneError");
  }

  corrAgeErr(): string {
    if (!this.correctionOpen()) return "";
    const raw = this.corrAge().trim();
    if (raw === "") return "";
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 15 || n > 100)
      return this.t()("producteurs.detail.correction.ageError");
    return "";
  }

  correctionChanges(): CorrectionChange[] {
    const p = this.producer();
    if (!p || !this.correctionOpen()) return [];
    const out: CorrectionChange[] = [];
    if (this.corrFirstName() !== p.firstName)
      out.push({ field: "Prénom", from: p.firstName, to: this.corrFirstName() });
    if (this.corrLastName() !== p.lastName)
      out.push({ field: "Nom", from: p.lastName, to: this.corrLastName() });
    if (this.corrPhone().trim() !== p.phone)
      out.push({ field: "Téléphone", from: p.phone, to: this.corrPhone().trim() });
    const ageRaw = this.corrAge().trim();
    const ageN = ageRaw === "" ? null : Number(ageRaw);
    if (ageN !== null && ageN !== p.age)
      out.push({ field: "Âge", from: p.age === null ? "" : String(p.age), to: String(ageN) });
    if (this.corrStatus() !== p.status)
      out.push({ field: "Statut d'adhésion", from: p.status, to: this.corrStatus() });
    return out;
  }

  canSubmitCorrection(): boolean {
    const p = this.producer();
    if (!p) return false;
    return (
      this.correctionChanges().length > 0 &&
      this.corrMotif().trim().length >= 10 &&
      !this.corrPhoneErr() &&
      !this.corrAgeErr()
    );
  }

  openCniDialog(): void {
    this.cniReason.set("");
    this.cniOpen.set(true);
  }

  closeCniDialog(): void {
    this.cniOpen.set(false);
    this.cniReason.set("");
  }

  confirmRevealCni(): void {
    const p = this.producer();
    if (!p) return;
    try {
      this.store.actions.revealCni(p, this.cniReason().trim());
      this.showCni.set(true);
      this.snackbar.info(this.t()("producteurs.detail.revealed"));
      this.closeCniDialog();
    } catch {
      this.snackbar.error(this.t()("producteurs.detail.cniDialog.tooShort"));
    }
  }

  revealPhone(p: Producer): void {
    this.store.actions.revealPhone(p);
    this.showPhone.set(true);
    this.snackbar.info(this.t()("producteurs.detail.revealed"));
  }

  openCorrection(): void {
    const p = this.producer();
    if (!p) return;
    this.corrFirstName.set(p.firstName);
    this.corrLastName.set(p.lastName);
    this.corrPhone.set(p.phone);
    this.corrAge.set(p.age === null ? "" : String(p.age));
    this.corrStatus.set(p.status);
    this.corrMotif.set("");
    this.correctionOpen.set(true);
  }

  submitCorrectionForm(): void {
    const p = this.producer();
    if (!p || !this.canSubmitCorrection()) return;
    this.store.actions.submitCorrection(p.id, this.correctionChanges(), this.corrMotif().trim());
    this.correctionOpen.set(false);
    this.snackbar.success(
      `${this.t()("producteurs.detail.correction.sent")} · ${this.t()("producteurs.detail.correction.sentDesc")}`,
    );
  }
}

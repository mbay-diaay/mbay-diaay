import { Component, computed, effect, inject, signal, untracked } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";

import { fmtAge, maskCni, nf } from "@/lib/format";
import type { CaseStatus, DuplicateCase, Producer } from "@/lib/mock/data";
import type { MessageKey } from "@/lib/i18n";
import { inScope, scopedCases } from "@/lib/scope";
import { sharedPhoneGroups, type PhoneGroup } from "@/lib/store";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { PlotMapComponent } from "@shared/plot-map.component";
import { StoreService } from "@shared/store.service";
import {
  IconComponent,
  initialsOf,
  ModalComponent,
  SnackbarService,
  StatCardsComponent,
  TONE,
  V2_PAGE_STYLES,
  type StatCard,
} from "@shared/ui";

type Group = "a-traiter" | "probables" | "non-resolus" | "classes" | "tous";

const GROUPS: {
  key: Group;
  label: MessageKey;
  hint: MessageKey;
  statuses: CaseStatus[] | null;
}[] = [
  {
    key: "a-traiter",
    label: "qualite.doublons.group.a-traiter",
    hint: "qualite.doublons.group.a-traiter.hint",
    statuses: ["à examiner"],
  },
  {
    key: "probables",
    label: "qualite.doublons.group.probables",
    hint: "qualite.doublons.group.probables.hint",
    statuses: ["probable"],
  },
  {
    key: "non-resolus",
    label: "qualite.doublons.group.non-resolus",
    hint: "qualite.doublons.group.non-resolus.hint",
    statuses: ["non résolu"],
  },
  {
    key: "classes",
    label: "qualite.doublons.group.classes",
    hint: "qualite.doublons.group.classes.hint",
    statuses: ["confirmé", "non-doublon", "erreur de saisie d'identité", "fusionné"],
  },
  {
    key: "tous",
    label: "qualite.doublons.group.tous",
    hint: "qualite.doublons.group.tous.hint",
    statuses: null,
  },
];

function inGroup(c: { status: CaseStatus }, g: Group): boolean {
  const def = GROUPS.find((x) => x.key === g)!;
  return !def.statuses || def.statuses.includes(c.status);
}

const STATUSES: CaseStatus[] = [
  "à examiner",
  "probable",
  "confirmé",
  "non-doublon",
  "erreur de saisie d'identité",
  "non résolu",
  "fusionné",
];

const STATUS_LABEL: Record<CaseStatus, MessageKey> = {
  "à examiner": "qualite.doublons.status.à examiner",
  probable: "qualite.doublons.status.probable",
  confirmé: "qualite.doublons.status.confirmé",
  "non-doublon": "qualite.doublons.status.non-doublon",
  "erreur de saisie d'identité": "qualite.doublons.status.erreur de saisie d'identité",
  "non résolu": "qualite.doublons.status.non résolu",
  fusionné: "qualite.doublons.status.fusionné",
};

/** Couleur de chaque statut de cas (charte V2). */
const CASE_TONE: Record<CaseStatus, { bg: string; fg: string }> = {
  "à examiner": TONE.attente,
  confirmé: TONE.erreur,
  probable: TONE.culture,
  "non-doublon": TONE.succes,
  "erreur de saisie d'identité": TONE.info,
  "non résolu": TONE.neutre,
  fusionné: { bg: "var(--v2-foret)", fg: "var(--v2-citron)" },
};

/**
 * Doublons (charte V2) : statistiques, groupes de cas à compteurs, liste des cas et comparaison A / B
 * (écarts surlignés, carte des parcelles), classement motivé, fusion réversible en modale,
 * vue des téléphones partagés.
 */
@Component({
  selector: "app-qualite-doublons-page",
  imports: [
    AppShellComponent,
    IconComponent,
    ModalComponent,
    PlotMapComponent,
    RouterLink,
    StatCardsComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .layout {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 1100px) {
        .layout {
          grid-template-columns: 340px minmax(0, 1fr);
          align-items: start;
        }
      }
      .cases {
        max-height: 72vh;
        overflow-y: auto;
      }
      .case {
        display: flex;
        width: 100%;
        align-items: center;
        gap: 12px;
        border-top: 1px solid var(--v2-separateur);
        padding: 12px 16px;
        text-align: left;
        cursor: pointer;
        transition: background-color 0.15s ease;
      }
      .case:first-child {
        border-top: none;
      }
      .case:hover {
        background: var(--v2-creme);
      }
      .case.on {
        background: var(--v2-sauge);
        box-shadow: inset 4px 0 0 var(--v2-foret);
      }
      .pair {
        position: relative;
        height: 40px;
        width: 58px;
        flex-shrink: 0;
      }
      .pair .avatar {
        position: absolute;
        height: 32px;
        width: 32px;
        font-size: 11px;
        border: 2px solid var(--v2-blanc);
      }
      .pair .b {
        left: 24px;
        top: 8px;
        background: var(--v2-culture-bg);
        color: var(--v2-culture-fg);
      }
      .score {
        display: grid;
        height: 64px;
        width: 64px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 999px;
        font-size: 17px;
        font-weight: 800;
      }
      .cmp th {
        font-family: var(--v2-font-mono);
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--v2-gris-texte);
        padding: 10px 14px;
        text-align: left;
      }
      .cmp td {
        border-top: 1px solid var(--v2-separateur);
        padding: 10px 14px;
        font-size: 14px;
      }
      .cmp tr.diff td.v {
        background: color-mix(in oklab, var(--v2-attente-bg) 55%, transparent);
        font-weight: 800;
      }
      .choices {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 8px;
      }
      .choice {
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 14px;
        border: 1.5px solid var(--v2-bord-carte);
        padding: 10px 12px;
        text-align: left;
        font-size: 13px;
        font-weight: 800;
        cursor: pointer;
      }
      .choice:hover {
        border-color: var(--v2-gris-texte);
      }
      .choice.on {
        border: 2px solid var(--v2-foret);
        background: var(--v2-sauge);
        padding: 9.5px 11.5px;
      }
      .choice .d {
        height: 10px;
        width: 10px;
        flex-shrink: 0;
        border-radius: 999px;
      }
      .map {
        height: 240px;
      }
    `,
  ],
  template: `
    <app-shell perm="quality.review" [area]="t()('qualite.doublons.area')">
      <header class="rise">
        <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("qualite.header.title") }}</p>
        <h1
          class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
        >
          {{ t()("qualite.nav.doublons") }}
        </h1>
        <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
          {{ t()("qualite.doublons.description") }}
        </p>
      </header>

      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <div class="toolbar card mt-6">
        <div class="seg" role="radiogroup" [attr.aria-label]="t()('qualite.v2.dbl.view.aria')">
          <button
            type="button"
            role="radio"
            [class.on]="view() === 'cas'"
            [attr.aria-checked]="view() === 'cas'"
            (click)="view.set('cas')"
          >
            <ui-icon name="group" [size]="18" />{{ t()("qualite.v2.dbl.view.cases") }}
          </button>
          <button
            type="button"
            role="radio"
            [class.on]="view() === 'telephones'"
            [attr.aria-checked]="view() === 'telephones'"
            (click)="view.set('telephones')"
          >
            <ui-icon name="call" [size]="18" />{{ t()("qualite.doublons.sharedPhones")
            }}<span class="n" [class.zero]="!phoneGroups().length">{{ phoneGroups().length }}</span>
          </button>
        </div>
        @if (view() === "cas") {
          <div class="seg" role="radiogroup" [attr.aria-label]="t()('qualite.v2.dbl.view.cases')">
            @for (group of groups; track group.key) {
              <button
                type="button"
                role="radio"
                [class.on]="filter() === group.key"
                [attr.aria-checked]="filter() === group.key"
                (click)="filter.set(group.key)"
              >
                {{ t()(group.label)
                }}<span class="n" [class.zero]="!countInGroup(group.key)">{{
                  countInGroup(group.key)
                }}</span>
              </button>
            }
          </div>
        }
      </div>

      @if (view() === "cas") {
        <p class="sub mt-4">{{ currentGroupHint() }}</p>
        <div class="layout mt-3">
          <!-- Liste des cas -->
          <section class="sec-card cases" [attr.aria-label]="t()('qualite.v2.dbl.view.cases')">
            @for (duplicateCase of list(); track duplicateCase.id) {
              @let producerA = producerById(duplicateCase.aId);
              @let producerB = producerById(duplicateCase.bId);
              <button
                type="button"
                class="case"
                [class.on]="selId() === duplicateCase.id"
                [attr.aria-pressed]="selId() === duplicateCase.id"
                (click)="chooseCase(duplicateCase.id)"
              >
                <span class="pair" aria-hidden="true">
                  <span class="avatar">{{ initials(name(producerA)) }}</span>
                  <span class="avatar b">{{ initials(name(producerB)) }}</span>
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block truncate font-bold">{{ name(producerA) }}</span>
                  <span class="sub block truncate"
                    >{{ producerA?.village }} · {{ duplicateCase.id.toUpperCase() }}</span
                  >
                </span>
                <span class="flex flex-col items-end gap-1">
                  <span
                    class="text-[15px] font-extrabold tabular-nums"
                    [style.color]="scoreColor(duplicateCase.score)"
                    >{{ duplicateCase.score }} %</span
                  >
                  <span
                    class="badge"
                    [style.background]="caseTone[duplicateCase.status].bg"
                    [style.color]="caseTone[duplicateCase.status].fg"
                    >{{ t()(statusLabel[duplicateCase.status]) }}</span
                  >
                </span>
              </button>
            } @empty {
              <p class="sub p-6 text-center">{{ t()("qualite.doublons.noCase") }}</p>
            }
          </section>

          <!-- Comparaison -->
          @if (sel(); as selected) {
            @if (producerById(selected.aId); as sheetA) {
              @if (producerById(selected.bId); as sheetB) {
                <div class="grid gap-4">
                  <section class="sec-card">
                    <div class="flex flex-wrap items-center gap-4 p-5">
                      <span
                        class="score"
                        [style.background]="scoreBg(selected.score)"
                        [style.color]="scoreColor(selected.score)"
                        >{{ selected.score }}%</span
                      >
                      <div class="min-w-0 flex-1">
                        <p class="mono" style="color: var(--v2-gris-texte)">
                          {{ t()("qualite.v2.dbl.score") }} · {{ selected.id.toUpperCase() }}
                        </p>
                        <h2 class="mt-1 text-[20px] font-extrabold tracking-[-0.01em]">
                          {{ name(sheetA) }} / {{ name(sheetB) }}
                        </h2>
                        <div class="mt-2 flex flex-wrap gap-1.5">
                          @for (matchSignal of selected.signals; track matchSignal.label) {
                            <span
                              class="badge"
                              [style.background]="
                                matchSignal.primary ? 'var(--v2-info-bg)' : 'var(--v2-creme)'
                              "
                              [style.color]="
                                matchSignal.primary ? 'var(--v2-info-fg)' : 'var(--v2-ardoise)'
                              "
                            >
                              {{ matchSignal.label }}
                              @if (!matchSignal.primary) {
                                <span class="opacity-70">{{
                                  t()("qualite.doublons.secondarySignal")
                                }}</span>
                              }
                            </span>
                          }
                        </div>
                      </div>
                      <span
                        class="badge"
                        [style.background]="caseTone[selected.status].bg"
                        [style.color]="caseTone[selected.status].fg"
                        >{{ t()(statusLabel[selected.status]) }}</span
                      >
                    </div>
                    <div
                      class="overflow-x-auto border-t"
                      style="border-color: var(--v2-separateur)"
                    >
                      <table class="cmp w-full min-w-[560px]">
                        <thead>
                          <tr>
                            <th class="w-36">{{ t()("qualite.v2.dbl.compare") }}</th>
                            <th>
                              {{ t()("qualite.doublons.sheetA") }}
                              <a
                                class="underline underline-offset-4"
                                style="color: var(--v2-foret)"
                                [routerLink]="['/dashboard/producteurs', sheetA.id]"
                                >{{ t()("qualite.doublons.openSheet") }}</a
                              >
                            </th>
                            <th>
                              {{ t()("qualite.doublons.sheetB") }}
                              <a
                                class="underline underline-offset-4"
                                style="color: var(--v2-foret)"
                                [routerLink]="['/dashboard/producteurs', sheetB.id]"
                                >{{ t()("qualite.doublons.openSheet") }}</a
                              >
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (row of comparisonRows(sheetA, sheetB); track row.label) {
                            <tr [class.diff]="row.diff">
                              <td class="sub">{{ row.label }}</td>
                              <td class="v font-semibold">{{ row.a }}</td>
                              <td class="v font-semibold">
                                {{ row.b }}
                                @if (row.diff) {
                                  <ui-icon
                                    name="warning"
                                    [size]="14"
                                    style="color: var(--v2-attente-fg)"
                                  />
                                }
                              </td>
                            </tr>
                          }
                          <tr>
                            <td class="sub">{{ t()("qualite.doublons.row.plots") }}</td>
                            <td class="font-semibold tabular-nums">{{ nPlots(sheetA.id) }}</td>
                            <td class="font-semibold tabular-nums">{{ nPlots(sheetB.id) }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      class="flex flex-wrap items-center justify-between gap-2 border-t px-5 py-3"
                      style="border-color: var(--v2-separateur)"
                    >
                      <span class="sub">{{
                        t()("qualite.v2.dbl.diff", { n: diffCount(sheetA, sheetB) })
                      }}</span>
                      @if (store.can("identity.read_full") && !showCni()) {
                        <button type="button" class="reveal" (click)="revealCni(selected.id)">
                          <ui-icon name="visibility" [size]="14" />{{
                            t()("qualite.doublons.showCni")
                          }}
                        </button>
                      }
                    </div>
                    @if (casePlots().length && store.can("map.read")) {
                      <div class="map border-t" style="border-color: var(--v2-separateur)">
                        <app-plot-map [plots]="casePlots()" basemap="sat" />
                      </div>
                      <p class="sub px-5 py-2">{{ t()("qualite.doublons.bothPlots") }}</p>
                    }
                  </section>

                  @if (selected.status === "fusionné") {
                    <section class="sec-card p-5">
                      <div class="flex flex-wrap items-center gap-4">
                        <span
                          class="sec-ico"
                          style="background: var(--v2-foret); color: var(--v2-citron)"
                          ><ui-icon name="task_alt" [size]="18"
                        /></span>
                        <div class="min-w-0 flex-1">
                          <p class="font-extrabold">{{ t()("qualite.doublons.merged.title") }}</p>
                          <p class="sub">
                            {{ t()("qualite.doublons.merged.body") }} {{ selected.comment ?? "" }}
                          </p>
                        </div>
                        @if (merges()[selected.id] && store.can("quality.merge")) {
                          <button
                            type="button"
                            class="btn btn-ghost"
                            (click)="undoMerge(selected.id)"
                          >
                            <ui-icon
                              name="arrow_forward"
                              [size]="18"
                              style="transform: rotate(180deg)"
                            />{{ t()("qualite.doublons.undoMerge") }}
                          </button>
                        }
                      </div>
                    </section>
                  } @else {
                    <section class="sec-card">
                      <div class="sec-head">
                        <h2>
                          <span class="sec-ico"><ui-icon name="gavel" [size]="18" /></span
                          >{{ t()("qualite.doublons.classify.title") }}
                        </h2>
                      </div>
                      <div
                        class="grid gap-4 border-t p-5"
                        style="border-color: var(--v2-separateur)"
                      >
                        <div
                          class="choices"
                          role="radiogroup"
                          [attr.aria-label]="t()('qualite.doublons.classify.aria')"
                        >
                          @for (status of classifyStatuses; track status) {
                            <button
                              type="button"
                              role="radio"
                              class="choice"
                              [class.on]="classifyStatus() === status"
                              [attr.aria-checked]="classifyStatus() === status"
                              (click)="classifyStatus.set(status)"
                            >
                              <span class="d" [style.background]="caseTone[status].fg"></span
                              >{{ t()(statusLabel[status]) }}
                            </button>
                          }
                        </div>
                        <div>
                          <label class="lbl" for="dbl-comment"
                            >{{ t()("qualite.common.comment") }} *</label
                          >
                          <textarea
                            id="dbl-comment"
                            class="area mt-2"
                            [placeholder]="t()('qualite.doublons.classify.commentPlaceholder')"
                            [value]="comment()"
                            (input)="comment.set($any($event.target).value)"
                          ></textarea>
                        </div>
                        <div class="flex flex-wrap justify-end gap-2">
                          @if (store.can("quality.merge")) {
                            <button
                              type="button"
                              class="btn btn-ghost"
                              [disabled]="comment().trim().length < 3"
                              (click)="mergeOpen.set(true)"
                            >
                              <ui-icon name="hub" [size]="18" />{{
                                t()("qualite.doublons.mergeBIntoA")
                              }}
                            </button>
                          }
                          <button
                            type="button"
                            class="btn btn-primary"
                            [disabled]="!canSaveClassify()"
                            (click)="saveClassify()"
                          >
                            {{ t()("qualite.doublons.classify.save")
                            }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
                          </button>
                        </div>
                        @if (!store.can("quality.merge")) {
                          <p class="sub">{{ t()("qualite.doublons.mergeNeedsPerm") }}</p>
                        }
                      </div>
                    </section>
                  }
                </div>
              }
            }
          } @else {
            <div class="card sub p-10 text-center">{{ t()("qualite.doublons.selectCase") }}</div>
          }
        </div>
      } @else {
        <!-- Téléphones partagés -->
        <p class="sub mt-4 max-w-3xl">{{ t()("qualite.doublons.phones.intro") }}</p>
        <div class="mt-3 grid gap-3 md:grid-cols-2">
          @for (phoneGroup of phoneGroups(); track phoneGroup.phone) {
            <section class="sec-card">
              <div class="sec-head">
                <h2>
                  <span class="sec-ico"><ui-icon name="call" [size]="18" /></span
                  ><span class="tabular-nums">{{ store.phone(phoneGroup.phone) }}</span>
                </h2>
                <span
                  class="badge"
                  style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
                  >{{
                    t()("qualite.doublons.phones.people", { n: phoneGroup.members.length })
                  }}</span
                >
              </div>
              <ul>
                @for (member of phoneGroup.members; track member.id) {
                  <li
                    class="flex items-center gap-3 border-t px-5 py-2.5"
                    style="border-color: var(--v2-separateur)"
                  >
                    <span class="avatar" style="height: 30px; width: 30px; font-size: 11px">{{
                      initials(member.firstName + " " + member.lastName)
                    }}</span>
                    <a
                      class="min-w-0 flex-1 truncate font-bold hover:underline"
                      [routerLink]="['/dashboard/producteurs', member.id]"
                      >{{ member.firstName }} {{ member.lastName }}</a
                    >
                    <span class="sub">{{ member.code }} · {{ member.village }}</span>
                  </li>
                }
              </ul>
            </section>
          } @empty {
            <p class="card sub p-10 text-center md:col-span-2">
              {{ t()("qualite.doublons.phones.none") }}
            </p>
          }
        </div>
      }

      <!-- Fusion -->
      <ui-modal
        [open]="mergeOpen()"
        [title]="t()('qualite.doublons.confirm.title')"
        [description]="mergeConfirmBody()"
        icon="hub"
        [width]="560"
        [closeLabel]="t()('common.close')"
        (closed)="mergeOpen.set(false)"
      >
        <div class="h-2" aria-hidden="true"></div>
        <button modal-footer type="button" class="btn btn-ghost" (click)="mergeOpen.set(false)">
          {{ t()("qualite.doublons.confirm.cancel") }}
        </button>
        <button modal-footer type="button" class="btn btn-primary" (click)="confirmMerge()">
          {{ t()("qualite.doublons.confirm.action")
          }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
        </button>
      </ui-modal>
    </app-shell>
  `,
})
export default class QualiteDoublonsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly route = inject(ActivatedRoute);

  protected readonly groups = GROUPS;
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly caseTone = CASE_TONE;
  protected readonly classifyStatuses = STATUSES.filter((s) => s !== "fusionné");
  protected readonly initials = initialsOf;
  private readonly snackbar = inject(SnackbarService);

  protected readonly filter = signal<Group>("a-traiter");
  protected readonly selId = signal<string | null>(null);
  protected readonly view = signal<"cas" | "telephones">("cas");
  protected readonly showCni = signal(false);
  protected readonly classifyStatus = signal<CaseStatus | "">("");
  protected readonly comment = signal("");
  protected readonly mergeOpen = signal(false);

  constructor() {
    effect(() => {
      this.list();
      const id = this.selId();
      untracked(() => {
        const L = this.list();
        if (!id || !L.some((c) => c.id === id)) {
          this.selId.set(L[0]?.id ?? null);
        }
      });
    });
  }

  protected name(p: Producer | undefined): string {
    return p ? `${p.firstName} ${p.lastName}` : "—";
  }

  protected scoreColor(score: number): string {
    return score >= 85
      ? "var(--v2-erreur-fg)"
      : score >= 70
        ? "var(--v2-attente-fg)"
        : "var(--v2-info-fg)";
  }

  protected scoreBg(score: number): string {
    return score >= 85
      ? "var(--v2-erreur-bg)"
      : score >= 70
        ? "var(--v2-attente-bg)"
        : "var(--v2-info-bg)";
  }

  protected diffCount(a: Producer, b: Producer): number {
    return this.comparisonRows(a, b).filter((r) => r.diff).length;
  }

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const v = this.visible();
    const todo = v.filter((c) => c.status === "à examiner");
    const avg = todo.length ? Math.round(todo.reduce((n, c) => n + c.score, 0) / todo.length) : 0;
    const done = v.filter((c) => inGroup(c, "classes"));
    const phones = this.phoneGroups();
    return [
      {
        label: t("qualite.v2.dbl.stat.todo"),
        value: nf.format(todo.length),
        sub: t("qualite.v2.dbl.stat.todoSub", { score: avg }),
        icon: "group",
        bg: "",
        fg: "",
      },
      {
        label: t("qualite.v2.dbl.stat.probable"),
        value: nf.format(v.filter((c) => c.status === "probable").length),
        sub: t("qualite.v2.dbl.stat.probableSub"),
        icon: "warning",
        ...TONE.culture,
      },
      {
        label: t("qualite.v2.dbl.stat.done"),
        value: nf.format(done.length),
        sub: t("qualite.v2.dbl.stat.doneSub", {
          merged: v.filter((c) => c.status === "fusionné").length,
        }),
        icon: "task_alt",
        ...TONE.succes,
      },
      {
        label: t("qualite.v2.dbl.stat.phones"),
        value: nf.format(phones.length),
        sub: t("qualite.v2.dbl.stat.phonesSub", {
          n: phones.reduce((n, g) => n + g.members.length, 0),
        }),
        icon: "call",
        ...TONE.attente,
      },
    ];
  });

  protected visible = computed(() => {
    const s = this.store.state();
    const session = s.session;
    const scoopParam = this.route.snapshot.queryParamMap.get("scoop") ?? undefined;
    const byProducer = new Map(s.producers.map((p: Producer) => [p.id, p]));
    return scopedCases(s.cases, s.producers, session).filter((c) => {
      const pa = byProducer.get(c.aId);
      if (!pa || !inScope([pa], session).length) return false;
      if (scoopParam && pa.scoopId !== scoopParam) return false;
      return true;
    });
  });

  protected list = computed(() => this.visible().filter((c) => inGroup(c, this.filter())));

  protected sel = computed((): DuplicateCase | undefined => {
    const id = this.selId();
    if (!id) return undefined;
    return this.visible().find((c) => c.id === id) ?? this.list()[0];
  });

  protected phoneGroups = computed((): PhoneGroup[] => {
    const s = this.store.state();
    return sharedPhoneGroups(inScope(s.producers, s.session));
  });

  protected merges = computed(() => this.store.state().merges);

  protected currentGroupHint = computed(() => {
    const key = this.filter();
    const g = GROUPS.find((x) => x.key === key)!;
    return this.t()(g.hint);
  });

  protected mergeConfirmBody = computed(() => {
    const sel = this.sel();
    const s = this.store.state();
    if (!sel) return "";
    const a = s.producers.find((p) => p.id === sel.aId);
    const b = s.producers.find((p) => p.id === sel.bId);
    return this.t()("qualite.doublons.confirm.body", {
      bCode: b?.code ?? "",
      aCode: a?.code ?? "",
      plots: b ? s.plots.filter((p) => p.producerId === b.id).length : 0,
    });
  });

  protected producerById(id: string): Producer | undefined {
    return this.store.state().producers.find((p) => p.id === id);
  }

  protected nPlots(id: string): number {
    return this.store.state().plots.filter((p) => p.producerId === id).length;
  }

  protected readonly casePlots = computed(() => {
    const sel = this.sel();
    if (!sel) return [];
    const ids = new Set([sel.aId, sel.bId]);
    return this.store.state().plots.filter((p) => ids.has(p.producerId));
  });

  protected countInGroup(key: Group): number {
    return this.visible().filter((c) => inGroup(c, key)).length;
  }

  protected chooseCase(id: string) {
    this.selId.set(id);
    this.classifyStatus.set("");
    this.comment.set("");
    this.showCni.set(false);
  }

  protected comparisonRows(
    a: Producer,
    b: Producer,
  ): { label: string; a: string; b: string; diff: boolean }[] {
    const s = this.store.state();
    const t = this.t();
    const cniShown = this.showCni();
    const rows: [string, (p: Producer) => string][] = [
      [t("qualite.doublons.row.name"), (p) => `${p.firstName} ${p.lastName}`],
      [t("qualite.doublons.row.code"), (p) => p.code],
      [t("qualite.doublons.row.sex"), (p) => p.sex],
      [t("qualite.doublons.row.age"), (p) => fmtAge(p.age)],
      [t("qualite.doublons.row.phone"), (p) => this.store.phone(p.phone)],
      [
        t("qualite.doublons.row.cni"),
        (p) => (cniShown ? p.cni || t("qualite.common.notProvided") : maskCni(p.cni)),
      ],
      [t("qualite.doublons.row.village"), (p) => p.village],
      [
        t("qualite.doublons.row.scoop"),
        (p) => s.scoops.find((sc) => sc.id === p.scoopId)?.name ?? "",
      ],
      [t("qualite.doublons.row.crops"), (p) => p.crops.map((c) => c.crop).join(", ")],
      [t("qualite.doublons.row.enumerator"), (p) => p.enumerator],
    ];
    return rows.map(([label, fn]) => {
      const va = fn(a);
      const vb = fn(b);
      return { label, a: va, b: vb, diff: va !== vb };
    });
  }

  protected canSaveClassify(): boolean {
    const st = this.classifyStatus();
    return !!st && this.comment().trim().length >= 3;
  }

  protected saveClassify() {
    const sel = this.sel();
    const st = this.classifyStatus();
    if (!sel || !st) return;
    this.store.actions.classifyCase(sel.id, st as CaseStatus, this.comment().trim());
    this.comment.set("");
    this.classifyStatus.set("");
    this.snackbar.success(
      this.t()("qualite.v2.dbl.classified", { status: this.t()(STATUS_LABEL[st as CaseStatus]) }),
    );
  }

  protected confirmMerge() {
    const sel = this.sel();
    if (!sel || this.comment().trim().length < 3) return;
    this.store.actions.mergeCase(sel.id, this.comment().trim());
    this.comment.set("");
    this.mergeOpen.set(false);
    this.snackbar.success(this.t()("qualite.v2.dbl.merged"));
  }

  protected undoMerge(id: string) {
    this.store.actions.undoMerge(id);
    this.snackbar.info(this.t()("qualite.v2.dbl.undone"));
  }

  protected revealCni(caseId: string) {
    this.store.actions.audit(
      "Révélation CNI",
      `Cas ${caseId.toUpperCase()}`,
      "Comparaison doublon",
    );
    this.showCni.set(true);
    this.snackbar.info(this.t()("qualite.v2.dbl.cniShown"));
  }
}

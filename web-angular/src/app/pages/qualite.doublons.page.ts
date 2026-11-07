import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {
  ArrowLeft,
  Eye,
  GitMerge,
  LucideAngularModule,
  Phone,
  Undo2,
} from "lucide-angular";

import { fmtAge, maskCni, maskPhone } from "@/lib/format";
import type { CaseStatus, DuplicateCase, Producer } from "@/lib/mock/data";
import type { MessageKey } from "@/lib/i18n";
import { qualityCounts } from "@/lib/quality-nav";
import { inScope, scopedCases } from "@/lib/scope";
import { sharedPhoneGroups, type PhoneGroup } from "@/lib/store";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { PlotMapComponent } from "../shared/plot-map.component";
import { StoreService } from "../shared/store.service";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPillComponent, type UiPillTone } from "../shared/ui/pill.component";

type Group = "a-traiter" | "probables" | "non-resolus" | "classes" | "tous";

const GROUPS: {
  key: Group;
  label: MessageKey;
  hint: MessageKey;
  statuses: CaseStatus[] | null;
  tone: UiPillTone;
}[] = [
  {
    key: "a-traiter",
    label: "qualite.doublons.group.a-traiter",
    hint: "qualite.doublons.group.a-traiter.hint",
    statuses: ["à examiner"],
    tone: "warning",
  },
  {
    key: "probables",
    label: "qualite.doublons.group.probables",
    hint: "qualite.doublons.group.probables.hint",
    statuses: ["probable"],
    tone: "neutral",
  },
  {
    key: "non-resolus",
    label: "qualite.doublons.group.non-resolus",
    hint: "qualite.doublons.group.non-resolus.hint",
    statuses: ["non résolu"],
    tone: "neutral",
  },
  {
    key: "classes",
    label: "qualite.doublons.group.classes",
    hint: "qualite.doublons.group.classes.hint",
    statuses: ["confirmé", "non-doublon", "erreur de saisie d'identité", "fusionné"],
    tone: "success",
  },
  {
    key: "tous",
    label: "qualite.doublons.group.tous",
    hint: "qualite.doublons.group.tous.hint",
    statuses: null,
    tone: "neutral",
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

const CASE_PILL_TONE: Record<CaseStatus, UiPillTone> = {
  "à examiner": "warning",
  confirmé: "danger",
  probable: "ochre",
  "non-doublon": "success",
  "erreur de saisie d'identité": "info",
  "non résolu": "neutral",
  fusionné: "brand",
};

/**
 * Port de src/routes/qualite.doublons.tsx — listes filtrables, comparatif A/B,
 * téléphones partagés, carte Leaflet des parcelles A∪B.
 */
@Component({
  selector: "app-qualite-doublons-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    PlotMapComponent,
    UiChipRailComponent,
    UiPageHeaderComponent,
    UiEmptyComponent,
    UiPillComponent,
  ],
  template: `
    <app-shell perm="quality.review" [area]="t()('qualite.doublons.area')">
      <ui-page-header
        [eyebrow]="t()('qualite.header.eyebrow')"
        [title]="t()('qualite.header.title')"
        [description]="t()('qualite.doublons.description')"
      />

      <nav class="mb-4 border-b border-border pb-4 text-sm">
        <ui-chip-rail>
          <a
            routerLink="/qualite/doublons"
            class="chip-filter chip-filter-sm chip-filter-active"
            >{{ t()('qualite.nav.doublons') }}
            <span class="chip-filter-count">{{ qCounts().doublons }}</span></a
          >
          @if (store.can('alert.manage')) {
            <a
              routerLink="/qualite/alertes"
              class="chip-filter chip-filter-sm"
              >{{ t()('qualite.nav.alertes') }}
              <span class="chip-filter-count">{{ qCounts().alertes }}</span></a
            >
          }
          @if (store.can('correction.manage')) {
            <a
              routerLink="/qualite/corrections"
              class="chip-filter chip-filter-sm"
              >{{ t()('qualite.nav.corrections') }}
              <span class="chip-filter-count">{{ qCounts().corrections }}</span></a
            >
          }
        </ui-chip-rail>
      </nav>

      @if (view() === 'cas') {
        <ui-chip-rail class="mb-4">
          @for (g of groups; track g.key) {
            <button
              type="button"
              [attr.aria-pressed]="filter() === g.key"
              class="chip-filter chip-filter-sm"
              [class.chip-filter-active]="filter() === g.key"
              (click)="filter.set(g.key)"
            >
              @if (!filterPillActive(g.key) && g.tone !== 'neutral') {
                <span
                  class="size-1.5 shrink-0 rounded-full"
                  [class.bg-warning]="g.tone === 'warning'"
                  [class.bg-success]="g.tone === 'success'"
                  aria-hidden="true"
                ></span>
              }
              <span>{{ t()(g.label) }}</span>
              <span class="chip-filter-count">{{ countInGroup(g.key) }}</span>
            </button>
          }
          <button
            type="button"
            class="chip-filter chip-filter-sm border-dashed text-muted-foreground"
            (click)="view.set('telephones')"
          >
            <lucide-angular [img]="icons.phone" class="size-3.5" />
            {{ t()('qualite.doublons.sharedPhones') }}
            <span class="chip-filter-count">{{ phoneGroups().length }}</span>
          </button>
        </ui-chip-rail>
        <p class="-mt-2 mb-4 text-sm text-muted-foreground">{{ currentGroupHint() }}</p>

        <div class="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <ul class="surface max-h-[70vh] divide-y overflow-y-auto">
            @for (c of list(); track c.id) {
              <li>
                <button
                  type="button"
                  class="w-full px-4 py-3 text-left hover:bg-muted"
                  [class.bg-primary-soft]="selId() === c.id"
                  (click)="chooseCase(c.id)"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-semibold">{{ producerById(c.aId)!.firstName }} {{ producerById(c.aId)!.lastName }}</span>
                    <span class="text-xs tabular text-muted-foreground">{{ c.score }} %</span>
                  </div>
                  <div class="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{{ producerById(c.aId)!.village }}</span>
                    <ui-pill [tone]="casePillTone[c.status]">{{ t()(statusLabel[c.status]) }}</ui-pill>
                  </div>
                </button>
              </li>
            } @empty {
              <li class="p-6 text-center text-muted-foreground">{{ t()('qualite.doublons.noCase') }}</li>
            }
          </ul>

          @if (sel(); as selected) {
            @if (producerById(selected.aId); as a) {
              @if (producerById(selected.bId); as b) {
                <div class="space-y-4">
                  <section class="surface p-5">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <h2 class="font-semibold">
                        {{ t()('qualite.doublons.caseTitle', { id: selected.id.toUpperCase(), score: selected.score }) }}
                      </h2>
                      <ui-pill [tone]="casePillTone[selected.status]">{{ t()(statusLabel[selected.status]) }}</ui-pill>
                    </div>
                    <div class="mt-3 flex flex-wrap gap-2">
                      @for (s of selected.signals; track s.label) {
                        <ui-pill [tone]="s.primary ? 'info' : 'neutral'">
                          {{ s.label }}
                          @if (!s.primary) {
                            <span> {{ t()('qualite.doublons.secondarySignal') }}</span>
                          }
                        </ui-pill>
                      }
                    </div>
                    <div class="mt-4 overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead class="text-left text-xs text-muted-foreground">
                          <tr>
                            <th class="w-32 py-2"></th>
                            <th>
                              {{ t()('qualite.doublons.sheetA') }}
                              <a [routerLink]="['/producteurs', a.id]" class="font-semibold text-primary hover:underline">{{
                                t()('qualite.doublons.openSheet')
                              }}</a>
                            </th>
                            <th>
                              {{ t()('qualite.doublons.sheetB') }}
                              <a [routerLink]="['/producteurs', b.id]" class="font-semibold text-primary hover:underline">{{
                                t()('qualite.doublons.openSheet')
                              }}</a>
                            </th>
                          </tr>
                        </thead>
                        <tbody class="divide-y">
                          @for (row of comparisonRows(a, b); track row.label) {
                            <tr>
                              <td class="py-2 text-xs text-muted-foreground">{{ row.label }}</td>
                              <td class="py-2 pr-4" [class.font-semibold]="row.diff">{{ row.a }}</td>
                              <td
                                class="py-2"
                                [class.font-semibold]="row.diff"
                                [class.text-warning-fg]="row.diff"
                              >
                                {{ row.b }}
                                @if (row.diff) {
                                  <span class="ml-1 text-xs">≠</span>
                                }
                              </td>
                            </tr>
                          }
                          <tr>
                            <td class="py-2 text-xs text-muted-foreground">{{ t()('qualite.doublons.row.plots') }}</td>
                            <td>{{ nPlots(a.id) }}</td>
                            <td>{{ nPlots(b.id) }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    @if (store.can('cni.read') && !showCni()) {
                      <button
                        type="button"
                        class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary"
                        (click)="revealCni(selected.id)"
                      >
                        <lucide-angular [img]="icons.eye" class="size-3" />
                        {{ t()('qualite.doublons.showCni') }}
                      </button>
                    }
                    @if (casePlots().length) {
                      <div class="mt-4">
                        <div class="eyebrow mb-1.5">{{ t()("qualite.doublons.bothPlots") }}</div>
                        <div class="h-56 overflow-hidden rounded-md border">
                          <app-plot-map [plots]="casePlots()" basemap="osm" />
                        </div>
                      </div>
                    }
                  </section>

                  @if (selected.status === 'fusionné') {
                    <section
                      class="surface flex min-w-0 flex-col gap-3 p-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
                    >
                      <div class="min-w-0">
                        <div class="font-semibold">{{ t()('qualite.doublons.merged.title') }}</div>
                        <p class="text-sm text-muted-foreground">
                          {{ t()('qualite.doublons.merged.body') }} {{ selected.comment ?? '' }}
                        </p>
                      </div>
                      @if (merges()[selected.id] && store.can('quality.merge')) {
                        <button
                          type="button"
                          class="inline-flex h-auto min-h-9 w-full shrink-0 items-center justify-center gap-2 whitespace-normal rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted sm:w-auto"
                          (click)="undoMerge(selected.id)"
                        >
                          <lucide-angular [img]="icons.undo" class="size-4" />
                          {{ t()('qualite.doublons.undoMerge') }}
                        </button>
                      }
                    </section>
                  } @else {
                    <section class="surface space-y-3 p-5">
                      <h3 class="font-semibold">{{ t()('qualite.doublons.classify.title') }}</h3>
                      <select
                        class="flex h-9 max-w-sm rounded-md border border-input bg-background px-3 text-sm"
                        [attr.aria-label]="t()('qualite.doublons.classify.aria')"
                        [ngModel]="classifyStatus()"
                        (ngModelChange)="classifyStatus.set($event)"
                      >
                        <option value="">{{ t()('qualite.doublons.classify.placeholder') }}</option>
                        @for (st of classifyStatuses; track st) {
                          <option [value]="st">{{ t()(statusLabel[st]) }}</option>
                        }
                      </select>
                      <label class="block text-sm font-medium">
                        {{ t()('qualite.common.comment') }} <span class="text-danger-fg">*</span>
                        <textarea
                          class="mt-1 flex min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          [placeholder]="t()('qualite.doublons.classify.commentPlaceholder')"
                          [ngModel]="comment()"
                          (ngModelChange)="comment.set($event)"
                        ></textarea>
                      </label>
                      <div class="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap">
                        <button
                          type="button"
                          class="inline-flex h-auto min-h-9 w-full items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-95 disabled:opacity-50 sm:w-auto"
                          [disabled]="!canSaveClassify()"
                          (click)="saveClassify()"
                        >
                          {{ t()('qualite.doublons.classify.save') }}
                        </button>
                        @if (store.can('quality.merge')) {
                          <button
                            type="button"
                            class="inline-flex h-auto min-h-9 w-full items-center justify-center gap-2 whitespace-normal rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted disabled:opacity-50 sm:w-auto"
                            [disabled]="comment().trim().length < 3"
                            (click)="mergeOpen.set(true)"
                          >
                            <lucide-angular [img]="icons.merge" class="size-4" />
                            {{ t()('qualite.doublons.mergeBIntoA') }}
                          </button>
                        }
                      </div>
                      @if (!store.can('quality.merge')) {
                        <p class="text-xs text-muted-foreground">{{ t()('qualite.doublons.mergeNeedsPerm') }}</p>
                      }
                    </section>
                  }
                </div>
              }
            }
          } @else {
            <div class="surface p-10 text-center text-muted-foreground">{{ t()('qualite.doublons.selectCase') }}</div>
          }
        </div>
      } @else {
        <button
          type="button"
          class="mb-3 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          (click)="view.set('cas')"
        >
          <lucide-angular [img]="icons.arrowLeft" class="size-4" />
          {{ t()('qualite.doublons.backToCases') }}
        </button>
        <h2 class="font-semibold">{{ t()('qualite.doublons.phones.title', { n: phoneGroups().length }) }}</h2>
        <p class="mb-3 mt-1 max-w-2xl text-sm text-muted-foreground">{{ t()('qualite.doublons.phones.intro') }}</p>
        <div class="surface divide-y">
          @for (gr of phoneGroups(); track gr.phone) {
            <div class="px-4 py-3">
              <div class="flex items-center gap-2 font-medium">
                <lucide-angular [img]="icons.phone" class="size-4 text-muted-foreground" />
                <span class="tabular">{{ maskPhoneFn(gr.phone) }}</span>
                <ui-pill tone="ochre">{{ t()('qualite.doublons.phones.people', { n: gr.members.length }) }}</ui-pill>
              </div>
              <ul class="mt-2 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                @for (m of gr.members; track m.id) {
                  <li>
                    <a [routerLink]="['/producteurs', m.id]" class="text-sm font-medium text-primary hover:underline">
                      {{ m.firstName }} {{ m.lastName }}
                    </a>
                    <span class="ml-2 text-xs text-muted-foreground">{{ m.code }} · {{ m.village }}</span>
                  </li>
                }
              </ul>
            </div>
          } @empty {
            <div class="p-10 text-center text-muted-foreground">{{ t()('qualite.doublons.phones.none') }}</div>
          }
        </div>
      }

      @if (mergeOpen()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40" (click)="mergeOpen.set(false)"></div>
          <div class="relative z-10 w-full max-w-lg rounded-lg border bg-card p-6 shadow-lg">
            <h2 class="text-lg font-semibold">{{ t()('qualite.doublons.confirm.title') }}</h2>
            <p class="mt-2 text-sm text-muted-foreground">
              {{
                mergeConfirmBody()
              }}
            </p>
            <div class="mt-6 flex justify-end gap-2">
              <button
                type="button"
                class="rounded-md border border-input px-3 py-1.5 text-sm hover:bg-muted"
                (click)="mergeOpen.set(false)"
              >
                {{ t()('qualite.doublons.confirm.cancel') }}
              </button>
              <button
                type="button"
                class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-95"
                (click)="confirmMerge()"
              >
                {{ t()('qualite.doublons.confirm.action') }}
              </button>
            </div>
          </div>
        </div>
      }
    </app-shell>
  `,
})
export default class QualiteDoublonsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly route = inject(ActivatedRoute);

  protected readonly icons = { phone: Phone, eye: Eye, merge: GitMerge, undo: Undo2, arrowLeft: ArrowLeft };
  protected readonly groups = GROUPS;
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly casePillTone = CASE_PILL_TONE;
  protected readonly classifyStatuses = STATUSES.filter((s) => s !== "fusionné");
  protected readonly maskPhoneFn = maskPhone;

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

  protected filterPillActive(key: Group): boolean {
    return this.filter() === key;
  }

  protected qCounts = computed(() => qualityCounts(this.store.state()));

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

  protected comparisonRows(a: Producer, b: Producer): { label: string; a: string; b: string; diff: boolean }[] {
    const s = this.store.state();
    const t = this.t();
    const cniShown = this.showCni();
    const rows: [string, (p: Producer) => string][] = [
      [t("qualite.doublons.row.name"), (p) => `${p.firstName} ${p.lastName}`],
      [t("qualite.doublons.row.code"), (p) => p.code],
      [t("qualite.doublons.row.sex"), (p) => p.sex],
      [t("qualite.doublons.row.age"), (p) => fmtAge(p.age)],
      [t("qualite.doublons.row.phone"), (p) => maskPhone(p.phone)],
      [
        t("qualite.doublons.row.cni"),
        (p) => (cniShown ? p.cni || t("qualite.common.notProvided") : maskCni(p.cni)),
      ],
      [t("qualite.doublons.row.village"), (p) => p.village],
      [
        t("qualite.doublons.row.scoop"),
        (p) => s.scoops.find((sc) => sc.id === p.scoopId)!.commune,
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
  }

  protected confirmMerge() {
    const sel = this.sel();
    if (!sel || this.comment().trim().length < 3) return;
    this.store.actions.mergeCase(sel.id, this.comment().trim());
    this.comment.set("");
    this.mergeOpen.set(false);
  }

  protected undoMerge(id: string) {
    this.store.actions.undoMerge(id);
  }

  protected revealCni(caseId: string) {
    this.store.actions.audit("Révélation CNI", `Cas ${caseId.toUpperCase()}`, "Comparaison doublon");
    this.showCni.set(true);
  }
}

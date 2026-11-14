import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map } from "rxjs";
import {
  LucideAngularModule,
  ArrowRight,
  CalendarRange,
  Gauge,
  HelpCircle,
  MapPin,
  Network,
  Sprout,
  UserRound,
} from "lucide-angular";

import { actions } from "@/lib/store";
import { ageAtMost, nf } from "@/lib/format";
import {
  CROP_FAMILIES,
  ORG_TYPES,
  VILLAGES,
  type CropFamily,
  type OrgType,
  type Plot,
  type Seuils,
} from "@/lib/mock/data";
import type { MessageKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

const SECTIONS = [
  "cultures",
  "noms",
  "regles",
  "jeune",
  "localites",
  "campagnes",
  "types",
] as const;
type Section = (typeof SECTIONS)[number];

type View = "cultures" | "regles";
const VIEW_OF: Record<Section, View> = {
  cultures: "cultures",
  noms: "cultures",
  regles: "regles",
  jeune: "regles",
  localites: "regles",
  campagnes: "regles",
  types: "regles",
};

const FAMILY_LABEL: Record<CropFamily, MessageKey> = {
  Bulbes: "referentiels.family.bulbes",
  Feuilles: "referentiels.family.feuilles",
  "Fruits-légumes": "referentiels.family.fruitsLegumes",
  Racines: "referentiels.family.racines",
  "Arbres fruitiers": "referentiels.family.arbresFruitiers",
  "Céréales et légumineuses": "referentiels.family.cerealesLegumineuses",
  Autres: "referentiels.family.autres",
};

const ORG_TYPE_LABEL: Record<OrgType, MessageKey> = {
  GIE: "referentiels.orgType.gie",
  Section: "referentiels.orgType.section",
  Association: "referentiels.orgType.association",
  Groupement: "referentiels.orgType.groupement",
  Individuel: "referentiels.orgType.individuel",
  "Membre direct": "referentiels.orgType.membreDirect",
};

type SeuilKey = keyof Seuils;
const RULE_DEFS: {
  key: SeuilKey;
  before: MessageKey;
  after?: MessageKey;
  unit: string;
  hits: (p: Plot, v: number) => boolean;
}[] = [
  {
    key: "gpsPrecisionMax",
    before: "referentiels.rule.gps",
    unit: "m",
    hits: (p, v) => p.gpsPrecision > v,
  },
  {
    key: "areaGapPct",
    before: "referentiels.rule.gap",
    after: "referentiels.rule.gap.after",
    unit: "%",
    hits: (p, v) => Math.abs((p.measured - p.declared) / p.declared) * 100 > v,
  },
  {
    key: "minAreaM2",
    before: "referentiels.rule.min",
    unit: "m²",
    hits: (p, v) => p.measured * 10000 < v,
  },
  {
    key: "maxAreaHa",
    before: "referentiels.rule.max",
    unit: "ha",
    hits: (p, v) => p.measured > v,
  },
];

/** Port de src/routes/referentiels.tsx — accordéons simplifiés en `<details>`. */
@Component({
  selector: "app-referentiels-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiButtonComponent,
    UiPageHeaderComponent,
    UiPillComponent,
  ],
  template: `
    <app-shell perm="config.manage" [area]="t()('referentiels.area')">
      <ui-page-header
        [eyebrow]="t()('referentiels.eyebrow')"
        [title]="t()('referentiels.title')"
        [description]="t()('referentiels.description')"
      />

      <div class="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-md border px-3 py-2 text-sm font-medium"
          [class.border-primary]="mainView() === 'cultures'"
          [class.bg-primary-soft]="mainView() === 'cultures'"
          (click)="goMain('cultures')"
        >
          <span class="inline-flex items-center gap-2">
            <lucide-angular [img]="icons.sprout" class="size-4" />
            {{ t()("referentiels.view.cultures") }}
            @if (aliases().length) {
              <span class="rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground">{{
                aliases().length
              }}</span>
            }
          </span>
        </button>
        <button
          type="button"
          class="rounded-md border px-3 py-2 text-sm font-medium"
          [class.border-primary]="mainView() === 'regles'"
          [class.bg-primary-soft]="mainView() === 'regles'"
          (click)="goMain('regles')"
        >
          <span class="inline-flex items-center gap-2">
            <lucide-angular [img]="icons.gauge" class="size-4" />
            {{ t()("referentiels.view.regles") }}
          </span>
        </button>
      </div>

      @if (mainView() === 'cultures') {
        <div class="grid items-start gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <section>
            <p class="mb-3 max-w-3xl text-sm text-muted-foreground">{{ t()("referentiels.cultures.intro") }}</p>
            <div class="overflow-x-auto rounded-md border">
              <table class="w-full text-sm">
                <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-semibold">{{ t()("referentiels.cultures.col.crop") }}</th>
                    <th class="font-semibold">{{ t()("referentiels.cultures.col.family") }}</th>
                    <th class="hidden text-right font-semibold sm:table-cell">
                      {{ t()("referentiels.cultures.col.producers") }}
                    </th>
                    <th class="hidden pr-4 text-right font-semibold sm:table-cell">
                      {{ t()("referentiels.cultures.col.plots") }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  @for (r of cropRefs(); track r.name) {
                    <tr>
                      <td class="px-4 py-2 font-medium">{{ r.name }}</td>
                      <td class="pr-4 sm:pr-0">
                        <select
                          class="flex h-9 w-full min-w-40 rounded-md border border-input bg-background px-2 text-sm sm:w-56"
                          [ngModel]="r.family"
                          (ngModelChange)="onFamilyChange(r.name, $event)"
                          [attr.aria-label]="t()('referentiels.cultures.familyOf', { name: r.name })"
                        >
                          @for (fam of cropFamilies; track fam) {
                            <option [ngValue]="fam">{{ t()(FAMILY_LABEL[fam]) }}</option>
                          }
                        </select>
                      </td>
                      <td class="hidden text-right tabular text-muted-foreground sm:table-cell">
                        {{ nf.format(producerCountForCrop(r.name)) }}
                      </td>
                      <td class="hidden pr-4 text-right tabular text-muted-foreground sm:table-cell">
                        {{ nf.format(plotCountForCrop(r.name)) }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <p class="mb-3 max-w-3xl text-sm text-muted-foreground">{{ t()("referentiels.noms.intro") }}</p>
            <div class="rounded-md border p-2">
              @if (aliases().length) {
                <ul class="divide-y">
                  @for (a of aliases(); track a) {
                    <li class="flex flex-wrap items-center gap-3 px-3 py-3">
                      <span class="w-40 font-medium">« {{ a }} »</span>
                      <lucide-angular [img]="icons.arrowRight" class="size-4 text-muted-foreground" />
                      <select
                        class="h-9 w-56 rounded-md border border-input bg-background px-2 text-sm"
                        [ngModel]="aliasChoice()[a] ?? ''"
                        (ngModelChange)="setAliasChoice(a, $event)"
                        [attr.aria-label]="t()('referentiels.noms.cropFor', { name: a })"
                      >
                        <option value="">{{ t()("referentiels.noms.choose") }}</option>
                        @for (r of cropRefs(); track r.name) {
                          <option [value]="r.name">{{ r.name }}</option>
                        }
                      </select>
                      <ui-button
                        size="sm"
                        class="h-9"
                        [disabled]="!aliasChoice()[a]"
                        (click)="validateAlias(a)"
                      >
                        {{ t()("referentiels.noms.validate") }}
                      </ui-button>
                    </li>
                  }
                </ul>
              } @else {
                <div class="px-4 py-10 text-center text-muted-foreground">
                  <lucide-angular [img]="icons.help" class="mx-auto mb-2 size-10 opacity-50" />
                  <div class="font-semibold text-foreground">{{ t()("referentiels.noms.empty") }}</div>
                  <p class="mt-1 text-sm">{{ t()("referentiels.noms.emptyDesc") }}</p>
                </div>
              }
            </div>
          </section>
        </div>
      } @else {
        <div class="mx-auto max-w-4xl space-y-6">
          @for (block of regleBlocks(); track block.key) {
            <section class="surface overflow-hidden">
              <div class="flex items-start gap-3 border-b bg-muted/30 px-4 py-3">
                <span
                  class="grid size-9 shrink-0 place-items-center rounded-md bg-primary-soft text-primary"
                >
                  <lucide-angular [img]="block.icon" class="size-4" />
                </span>
                <div class="min-w-0">
                  <h2 class="font-semibold">{{ block.title }}</h2>
                  <p class="truncate text-xs text-muted-foreground">{{ block.summary }}</p>
                </div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <p class="mb-3 text-sm text-muted-foreground">{{ t()(block.purpose) }}</p>
                @switch (block.key) {
                  @case ("regles") {
                    <p class="mb-3 text-sm text-muted-foreground">{{ t()("referentiels.regles.intro") }}</p>
                    <div class="max-w-3xl space-y-3">
                      @for (rule of ruleDefs; track rule.key) {
                        <div class="rounded-md border p-3 sm:p-4">
                          <p class="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm leading-snug">
                            <span>{{ t()(rule.before) }}</span>
                            <input
                              class="h-9 w-24 rounded-md border border-input bg-background px-2 tabular text-sm"
                              inputmode="decimal"
                              [ngModel]="ruleDraft()[rule.key]"
                              (ngModelChange)="setRuleDraft(rule.key, $event)"
                              [attr.aria-label]="t()(rule.before) + ' (' + rule.unit + ')'"
                            />
                            <span class="font-medium">{{ rule.unit }}</span>
                            @if (rule.after) {
                              <span>{{ t()(rule.after) }}.</span>
                            } @else {
                              <span>.</span>
                            }
                          </p>
                          <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
                            <span [class]="ruleResultClass(rule)">
                              {{
                                t()("referentiels.rule.result", {
                                  n: nf.format(ruleDraftCount(rule)),
                                })
                              }}
                              @if (ruleNumberOk(rule) && ruleDraftNum(rule) !== seuils()[rule.key]) {
                                <span>
                                  {{
                                    t()("referentiels.currently", {
                                      n: nf.format(ruleSavedCount(rule)),
                                    })
                                  }}
                                </span>
                              }
                            </span>
                            <ui-button
                              size="sm"
                              class="h-9"
                              [disabled]="!canSaveRule(rule)"
                              (click)="saveRule(rule.key)"
                            >
                              {{ t()("referentiels.save") }}
                            </ui-button>
                          </div>
                        </div>
                      }
                    </div>
                  }
                  @case ("jeune") {
                    <p class="mb-3 text-sm text-muted-foreground">{{ t()("referentiels.jeune.intro") }}</p>
                    <div class="rounded-md border p-5">
                      <div class="flex flex-wrap items-center gap-2 text-sm">
                        <span>{{ t()("referentiels.jeune.before") }}</span>
                        <input
                          class="h-9 w-20 rounded-md border border-input bg-background px-2 tabular text-sm"
                          inputmode="numeric"
                          [ngModel]="youthDraft()"
                          (ngModelChange)="youthDraft.set($event)"
                          [attr.aria-label]="t()('referentiels.jeune.aria')"
                        />
                        <span>{{ t()("referentiels.jeune.after") }}</span>
                      </div>
                      <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <span [class]="youthResultClass()">
                          {{
                            t()("referentiels.jeune.result", {
                              n: nf.format(youthLiveCount()),
                              total: nf.format(youthTotal()),
                            })
                          }}
                          @if (youthOk() && youthNum() !== youthMax()) {
                            <span>
                              {{
                                t()("referentiels.currently", { n: nf.format(youthSavedCount()) })
                              }}
                            </span>
                          }
                        </span>
                        <ui-button size="sm" class="h-9" [disabled]="!canSaveYouth()" (click)="saveYouth()">
                          {{ t()("referentiels.save") }}
                        </ui-button>
                      </div>
                      @if (!youthOk() && youthDraft()) {
                        <p class="mt-2 text-xs text-danger-fg">{{ t()("referentiels.jeune.error") }}</p>
                      }
                    </div>
                  }
                  @case ("types") {
                    <p class="mb-3 text-sm text-muted-foreground">{{ t()("referentiels.types.intro") }}</p>
                    <section class="rounded-md border p-5">
                      <ul class="divide-y">
                        @for (type of orgTypes; track type) {
                          <li class="flex items-center justify-between py-2.5 text-sm">
                            <ui-pill tone="brand">{{ t()(ORG_TYPE_LABEL[type]) }}</ui-pill>
                            <span class="tabular text-muted-foreground">
                              {{
                                t()("referentiels.types.orgCount", {
                                  n: nf.format(orgsByType(type)),
                                })
                              }}
                            </span>
                          </li>
                        }
                        <li class="flex items-center justify-between py-2.5 text-sm">
                          <ui-pill tone="warning">{{ t()("referentiels.types.toQualify") }}</ui-pill>
                          <span class="flex items-center gap-3">
                            <span class="tabular text-muted-foreground">
                              {{
                                t()("referentiels.types.orgCount", { n: nf.format(orgsMissingType()) })
                              }}
                            </span>
                            @if (orgsMissingType() > 0) {
                              <a
                                routerLink="/organisations"
                                [queryParams]="{ vue: 'a-qualifier' }"
                                class="text-xs font-semibold text-primary hover:underline"
                              >
                                {{ t()("referentiels.types.qualify") }}
                              </a>
                            }
                          </span>
                        </li>
                      </ul>
                      <p class="mt-4 text-xs text-muted-foreground">
                        {{ t()("referentiels.types.scoops", { n: scoopsCount() }) }}
                      </p>
                    </section>
                  }
                  @case ("campagnes") {
                    <p class="mb-3 text-sm text-muted-foreground">{{ t()("referentiels.campagnes.intro") }}</p>
                    <section class="surface max-w-3xl overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
                          <tr>
                            <th class="px-4 py-3 font-semibold">
                              {{ t()("referentiels.campagnes.col.campaign") }}
                            </th>
                            <th class="text-right font-semibold">
                              {{ t()("referentiels.campagnes.col.producers") }}
                            </th>
                            <th class="pr-4 text-right font-semibold">
                              {{ t()("referentiels.campagnes.col.plots") }}
                            </th>
                          </tr>
                        </thead>
                        <tbody class="divide-y">
                          @for (c of campaignNames(); track c) {
                            <tr>
                              <td class="px-4 py-2.5 font-medium">{{ c }}</td>
                              <td class="text-right tabular">{{ nf.format(producersInCampaign(c)) }}</td>
                              <td class="pr-4 text-right tabular">{{ nf.format(plotsInCampaign(c)) }}</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </section>
                  }
                  @case ("localites") {
                    <p class="mb-3 text-sm text-muted-foreground">{{ t()("referentiels.localites.intro") }}</p>
                    <section class="rounded-md border p-5">
                      <div class="flex flex-wrap items-center justify-between gap-3">
                        <h3 class="font-semibold">
                          {{ t()("referentiels.localites.count", { n: localiteRows().length }) }}
                        </h3>
                        <input
                          class="w-56 rounded-md border border-input bg-background px-3 py-1.5 text-sm"
                          [attr.aria-label]="t()('referentiels.localites.search')"
                          [placeholder]="t()('referentiels.localites.search')"
                          [ngModel]="locQ()"
                          (ngModelChange)="locQ.set($event)"
                        />
                      </div>
                      <table class="mt-4 w-full text-sm">
                        <thead class="text-left text-xs text-muted-foreground">
                          <tr>
                            <th class="py-2 font-semibold">{{ t()("referentiels.localites.col.village") }}</th>
                            <th class="font-semibold">{{ t()("referentiels.localites.col.commune") }}</th>
                            <th class="text-right font-semibold">{{ t()("referentiels.localites.col.orgs") }}</th>
                            <th class="text-right font-semibold">
                              {{ t()("referentiels.localites.col.producers") }}
                            </th>
                          </tr>
                        </thead>
                        <tbody class="divide-y">
                          @for (row of localiteRows(); track row.village) {
                            <tr>
                              <td class="py-2 font-medium">{{ row.village }}</td>
                              <td class="text-muted-foreground">{{ row.commune }}</td>
                              <td class="text-right tabular">{{ nf.format(row.o) }}</td>
                              <td class="text-right tabular">{{ nf.format(row.n) }}</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </section>
                  }
                }
              </div>
            </section>
          }
        </div>
      }
    </app-shell>
  `,
})
export default class ReferentielsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly FAMILY_LABEL = FAMILY_LABEL;
  protected readonly ORG_TYPE_LABEL = ORG_TYPE_LABEL;
  protected readonly cropFamilies = CROP_FAMILIES;
  protected readonly orgTypes = ORG_TYPES;
  protected readonly ruleDefs = RULE_DEFS;
  protected readonly icons = {
    sprout: Sprout,
    gauge: Gauge,
    arrowRight: ArrowRight,
    help: HelpCircle,
    user: UserRound,
    network: Network,
    calendar: CalendarRange,
    map: MapPin,
  };

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly sectionParam = toSignal(
    this.route.queryParamMap.pipe(
      map((m) => {
        const s = m.get("section");
        return SECTIONS.includes(s as Section) ? (s as Section) : null;
      }),
    ),
    { initialValue: null as Section | null },
  );

  protected readonly aliasChoice = signal<Record<string, string>>({});
  protected readonly ruleDraft = signal<Record<string, string>>({});
  protected readonly youthDraft = signal("");
  protected readonly locQ = signal("");

  constructor() {
    const s = this.store.state();
    const draft: Record<string, string> = {};
    for (const r of RULE_DEFS) draft[r.key] = String(s.seuils[r.key]);
    this.ruleDraft.set(draft);
    this.youthDraft.set(String(s.youthMaxAge));
  }

  protected readonly mainView = computed(() => {
    const sec = this.sectionParam();
    if (sec) return VIEW_OF[sec];
    return "cultures" as View;
  });

  protected readonly cropRefs = computed(() => this.store.state().cropRefs);
  protected readonly aliases = computed(() => this.store.state().cropAliases);
  protected readonly seuils = computed(() => this.store.state().seuils);
  protected readonly plots = computed(() => this.store.state().plots);
  protected readonly producers = computed(() => this.store.state().producers);

  protected readonly youthMax = computed(() => this.store.state().youthMaxAge);

  protected readonly scoopsCount = computed(() => this.store.state().scoops.length);

  protected readonly campaignNames = computed(() =>
    [...new Set(this.store.state().campaigns.map((c) => c.name))],
  );

  protected readonly localiteRows = computed(() => {
    const scoops = this.store.state().scoops;
    const producers = this.producers();
    const orgs = this.store.state().orgs;
    const q = this.locQ().trim().toLowerCase();
    return VILLAGES.filter((v) => v.toLowerCase().includes(q)).map((v) => ({
      village: v,
      commune: scoops.find((s) => s.commune === v)?.commune ?? v,
      n: producers.filter((p) => p.village === v && !p.mergedInto).length,
      o: orgs.filter((o) => o.village === v).length,
    }));
  });

  protected readonly regleBlocks = computed(() => {
    const t = this.t();
    const s = this.store.state();
    const youth = s.youthMaxAge;
    const orgs = s.orgs;
    const missing = orgs.filter((o) => !o.type).length;
    return [
      {
        key: "regles" as const,
        title: t("referentiels.regles.title"),
        summary: t("referentiels.regles.summary"),
        purpose: "referentiels.purpose.regles" as MessageKey,
        icon: Gauge,
      },
      {
        key: "jeune" as const,
        title: t("referentiels.jeune.title"),
        summary: t("referentiels.jeune.summary", { n: youth }),
        purpose: "referentiels.purpose.jeune" as MessageKey,
        icon: UserRound,
      },
      {
        key: "types" as const,
        title: t("referentiels.types.title"),
        summary:
          orgs.some((o) => !o.type)
            ? t("referentiels.types.summaryMissing", {
                n: ORG_TYPES.length,
                m: missing,
              })
            : t("referentiels.types.summary", { n: ORG_TYPES.length }),
        purpose: "referentiels.purpose.types" as MessageKey,
        icon: Network,
      },
      {
        key: "campagnes" as const,
        title: t("referentiels.campagnes.title"),
        summary: t("referentiels.campagnes.summary", { n: s.campaigns.length }),
        purpose: "referentiels.purpose.campagnes" as MessageKey,
        icon: CalendarRange,
      },
      {
        key: "localites" as const,
        title: t("referentiels.localites.title"),
        summary: t("referentiels.localites.summary", { n: VILLAGES.length }),
        purpose: "referentiels.purpose.localites" as MessageKey,
        icon: MapPin,
      },
    ];
  });

  goMain(v: View): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { section: v === "regles" ? "regles" : null },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }

  producerCountForCrop(name: string): number {
    return this.producers().filter((p) => p.crops.some((c) => c.crop === name)).length;
  }

  plotCountForCrop(name: string): number {
    return this.plots().filter((p) => p.crop === name).length;
  }

  onFamilyChange(crop: string, family: CropFamily): void {
    actions.setCropFamily(crop, family);
  }

  setAliasChoice(alias: string, crop: string): void {
    this.aliasChoice.update((m) => ({ ...m, [alias]: crop }));
  }

  validateAlias(alias: string): void {
    const crop = this.aliasChoice()[alias];
    if (!crop) return;
    actions.attachAlias(alias, crop);
    this.aliasChoice.update((m) => {
      const n = { ...m };
      delete n[alias];
      return n;
    });
  }

  setRuleDraft(key: SeuilKey, val: string): void {
    this.ruleDraft.update((d) => ({ ...d, [key]: val }));
  }

  ruleDraftNum(rule: (typeof RULE_DEFS)[number]): number {
    return Number(this.ruleDraft()[rule.key].replace(",", "."));
  }

  ruleNumberOk(rule: (typeof RULE_DEFS)[number]): boolean {
    const n = this.ruleDraftNum(rule);
    return Number.isFinite(n) && n > 0;
  }

  ruleHits(rule: (typeof RULE_DEFS)[number], value: number): number {
    return this.plots().filter((p) => rule.hits(p, value)).length;
  }

  ruleDraftCount(rule: (typeof RULE_DEFS)[number]): number {
    return this.ruleNumberOk(rule) ? this.ruleHits(rule, this.ruleDraftNum(rule)) : this.ruleSavedCount(rule);
  }

  ruleSavedCount(rule: (typeof RULE_DEFS)[number]): number {
    return this.ruleHits(rule, this.seuils()[rule.key]);
  }

  ruleResultClass(rule: (typeof RULE_DEFS)[number]): string {
    const n = this.ruleDraftNum(rule);
    const saved = this.seuils()[rule.key];
    return cn(
      "text-sm",
      this.ruleNumberOk(rule) && n !== saved ? "font-medium text-warning-fg" : "text-muted-foreground",
    );
  }

  canSaveRule(rule: (typeof RULE_DEFS)[number]): boolean {
    const n = this.ruleDraftNum(rule);
    return this.ruleNumberOk(rule) && n !== this.seuils()[rule.key];
  }

  saveRule(key: SeuilKey): void {
    const n = Number(this.ruleDraft()[key].replace(",", "."));
    if (!Number.isFinite(n) || n <= 0) return;
    actions.setSeuil(key, n);
  }

  youthNum(): number {
    return Number(this.youthDraft());
  }

  youthOk(): boolean {
    const v = this.youthDraft();
    return /^\d{2}$/.test(v) && this.youthNum() >= 18 && this.youthNum() <= 60;
  }

  youthTotal(): number {
    return this.producers().filter((p) => !p.mergedInto).length;
  }

  youthCount(max: number): number {
    return this.producers().filter((p) => !p.mergedInto && ageAtMost(p.age, max)).length;
  }

  youthLiveCount(): number {
    return this.youthOk() ? this.youthCount(this.youthNum()) : this.youthCount(this.youthMax());
  }

  youthSavedCount(): number {
    return this.youthCount(this.youthMax());
  }

  youthResultClass(): string {
    return cn(
      "text-sm",
      this.youthOk() && this.youthNum() !== this.youthMax()
        ? "font-medium text-warning-fg"
        : "text-muted-foreground",
    );
  }

  canSaveYouth(): boolean {
    return this.youthOk() && this.youthNum() !== this.youthMax();
  }

  saveYouth(): void {
    if (!this.canSaveYouth()) return;
    actions.setYouthMaxAge(this.youthNum());
  }

  orgsByType(type: OrgType): number {
    return this.store.state().orgs.filter((o) => o.type === type).length;
  }

  orgsMissingType(): number {
    return this.store.state().orgs.filter((o) => !o.type).length;
  }

  producersInCampaign(name: string): number {
    return this.producers().filter((p) => p.crops.some((x) => x.campaign === name)).length;
  }

  plotsInCampaign(name: string): number {
    return this.plots().filter((p) => p.campaign === name).length;
  }
}

import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookMarked,
  CalendarRange,
  Gauge,
  HelpCircle,
  LayoutGrid,
  MapPin,
  Network,
  Sprout,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState, PageHeader, Pill } from "@/components/app/ui-bits";
import { SectionNav } from "@/components/app/SectionNav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actions, useStore, type AuditEntry, useScoops, useCampaigns } from "@/lib/store";
import {
  CROP_FAMILIES,
  ORG_TYPES,
  VILLAGES,
  type CropFamily,
  type OrgType,
  type Plot,
  type Seuils,
} from "@/lib/mock/data";
import { ageAtMost, fmtDateTime, nf } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n, type MessageKey } from "@/lib/i18n";

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

export const Route = createFileRoute("/referentiels")({
  validateSearch: (s: Record<string, unknown>) => ({
    section: SECTIONS.includes(s["section"] as Section) ? (s["section"] as Section) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Référentiels · Mbay Diaay" },
      {
        name: "description",
        content:
          "Listes et règles partagées : cultures, noms non reconnus, règles de contrôle, définition « jeune », localités, campagnes et types d'organisation.",
      },
      { property: "og:title", content: "Référentiels · Mbay Diaay" },
      {
        property: "og:description",
        content: "Gestion des référentiels partagés de l'application.",
      },
    ],
  }),
  component: ReferentielsRoute,
});

function ReferentielsRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="config.manage" area={t("referentiels.area")}>
      <ReferentielsPage />
    </AppShell>
  );
}

/** Familles de cultures : l'identifiant français reste la valeur, on traduit à l'affichage. */
const FAMILY_LABEL: Record<CropFamily, MessageKey> = {
  Bulbes: "referentiels.family.bulbes",
  Feuilles: "referentiels.family.feuilles",
  "Fruits-légumes": "referentiels.family.fruitsLegumes",
  Racines: "referentiels.family.racines",
  "Arbres fruitiers": "referentiels.family.arbresFruitiers",
  "Céréales et légumineuses": "referentiels.family.cerealesLegumineuses",
  Autres: "referentiels.family.autres",
};

/** Types d'organisation : même principe. */
const ORG_TYPE_LABEL: Record<OrgType, MessageKey> = {
  GIE: "referentiels.orgType.gie",
  Section: "referentiels.orgType.section",
  Association: "referentiels.orgType.association",
  Groupement: "referentiels.orgType.groupement",
  Individuel: "referentiels.orgType.individuel",
  "Membre direct": "referentiels.orgType.membreDirect",
};

/** Deux vues : les cultures (usage courant) et les règles et listes (réglages occasionnels). */
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

function ReferentielsPage() {
  const { t } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const section = search.section;
  const view: View = section ? VIEW_OF[section] : "cultures";
  const aliases = useStore((s) => s.cropAliases);
  const go = (v: string) =>
    void navigate({
      to: "/referentiels",
      search: { section: v === "regles" ? "regles" : undefined },
      replace: true,
    });

  return (
    <>
      <PageHeader
        eyebrow={t("referentiels.eyebrow")}
        title={t("referentiels.title")}
        description={t("referentiels.description")}
      />
      <SectionNav
        active={view}
        onSelect={go}
        items={[
          {
            key: "cultures",
            label: t("referentiels.view.cultures"),
            icon: Sprout,
            ...(aliases.length ? { count: aliases.length } : {}),
          },
          { key: "regles", label: t("referentiels.view.regles"), icon: Gauge },
        ]}
      />
      {view === "cultures" ? <CulturesView /> : <ReglesView open={section} />}
    </>
  );
}

/** Vue d'ensemble : la liste des cultures et, à côté, les noms à reconnaître. */
function CulturesView() {
  return (
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <CulturesSection />
      <NomsSection />
    </div>
  );
}

/** Réglages occasionnels : sections repliées, une ligne de résumé chacune. */
function ReglesView({ open }: { open: Section | undefined }) {
  const { t } = useI18n();
  const campaigns = useCampaigns();
  const youth = useStore((s) => s.youthMaxAge);
  const orgs = useStore((s) => s.orgs);
  const first = open && open !== "regles" ? open : "regles";
  const items: {
    key: Section;
    title: string;
    icon: typeof Gauge;
    summary: string;
    purpose: MessageKey;
    node: ReactNode;
  }[] = [
    {
      key: "regles",
      title: t("referentiels.regles.title"),
      icon: Gauge,
      summary: t("referentiels.regles.summary"),
      purpose: "referentiels.purpose.regles",
      node: <ReglesSection />,
    },
    {
      key: "jeune",
      title: t("referentiels.jeune.title"),
      icon: UserRound,
      summary: t("referentiels.jeune.summary", { n: youth }),
      purpose: "referentiels.purpose.jeune",
      node: <JeuneSection />,
    },
    {
      key: "types",
      title: t("referentiels.types.title"),
      icon: Network,
      summary: orgs.some((o) => !o.type)
        ? t("referentiels.types.summaryMissing", {
            n: ORG_TYPES.length,
            m: orgs.filter((o) => !o.type).length,
          })
        : t("referentiels.types.summary", { n: ORG_TYPES.length }),
      purpose: "referentiels.purpose.types",
      node: <TypesSection />,
    },
    {
      key: "campagnes",
      title: t("referentiels.campagnes.title"),
      icon: CalendarRange,
      summary: t("referentiels.campagnes.summary", { n: campaigns.length }),
      purpose: "referentiels.purpose.campagnes",
      node: <CampagnesSection />,
    },
    {
      key: "localites",
      title: t("referentiels.localites.title"),
      icon: MapPin,
      summary: t("referentiels.localites.summary", { n: VILLAGES.length }),
      purpose: "referentiels.purpose.localites",
      node: <LocalitesSection />,
    },
  ];
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={first}
      className="mx-auto max-w-4xl space-y-2"
    >
      {items.map((i) => (
        <AccordionItem
          key={i.key}
          value={i.key}
          className="surface overflow-hidden border-0 px-0 data-[state=open]:shadow-sm"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <span className="flex min-w-0 items-center gap-3 text-left">
              <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
                <i.icon className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">{i.title}</span>
                <span className="block truncate text-xs font-normal text-muted-foreground">
                  {i.summary}
                </span>
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-t px-4 pb-4 pt-3">
            <p className="mb-3 text-sm text-muted-foreground">{t(i.purpose)}</p>
            {i.node}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function Intro({ children }: { children: ReactNode }) {
  return <p className="mb-3 max-w-3xl text-sm text-muted-foreground">{children}</p>;
}

function CulturesSection() {
  const { t } = useI18n();
  const cropRefs = useStore((s) => s.cropRefs);
  const producers = useStore((s) => s.producers);
  const plots = useStore((s) => s.plots);
  return (
    <>
      <Intro>{t("referentiels.cultures.intro")}</Intro>
      <section className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">{t("referentiels.cultures.col.crop")}</th>
              <th className="font-semibold">{t("referentiels.cultures.col.family")}</th>
              <th className="hidden text-right font-semibold sm:table-cell">
                {t("referentiels.cultures.col.producers")}
              </th>
              <th className="hidden pr-4 text-right font-semibold sm:table-cell">
                {t("referentiels.cultures.col.plots")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {cropRefs.map((r) => (
              <tr key={r.name}>
                <td className="px-4 py-2 font-medium">{r.name}</td>
                <td className="pr-4 sm:pr-0">
                  <Select
                    value={r.family}
                    onValueChange={(v) => {
                      actions.setCropFamily(r.name, v as CropFamily);
                      toast.success(`${r.name} → ${t(FAMILY_LABEL[v as CropFamily])}`);
                    }}
                  >
                    <SelectTrigger
                      className="h-9 w-full min-w-40 sm:w-56"
                      aria-label={t("referentiels.cultures.familyOf", { name: r.name })}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CROP_FAMILIES.map((fam) => (
                        <SelectItem key={fam} value={fam}>
                          {t(FAMILY_LABEL[fam])}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="hidden text-right tabular text-muted-foreground sm:table-cell">
                  {nf.format(
                    producers.filter((p) => p.crops.some((c) => c.crop === r.name)).length,
                  )}
                </td>
                <td className="hidden pr-4 text-right tabular text-muted-foreground sm:table-cell">
                  {nf.format(plots.filter((p) => p.crop === r.name).length)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

function NomsSection() {
  const { t } = useI18n();
  const cropRefs = useStore((s) => s.cropRefs);
  const aliases = useStore((s) => s.cropAliases);
  const [choice, setChoice] = useState<Record<string, string>>({});
  return (
    <>
      <Intro>{t("referentiels.noms.intro")}</Intro>
      <section className="rounded-md border p-2">
        {aliases.length ? (
          <ul className="divide-y">
            {aliases.map((a) => (
              <li key={a} className="flex flex-wrap items-center gap-3 px-3 py-3">
                <span className="w-40 font-medium">« {a} »</span>
                <ArrowRight className="size-4 text-muted-foreground" />
                <Select
                  value={choice[a] ?? ""}
                  onValueChange={(v) => setChoice({ ...choice, [a]: v })}
                >
                  <SelectTrigger
                    className="h-9 w-56"
                    aria-label={t("referentiels.noms.cropFor", { name: a })}
                  >
                    <SelectValue placeholder={t("referentiels.noms.choose")} />
                  </SelectTrigger>
                  <SelectContent>
                    {cropRefs.map((r) => (
                      <SelectItem key={r.name} value={r.name}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  className="h-9"
                  disabled={!choice[a]}
                  onClick={() => {
                    actions.attachAlias(a, choice[a]!);
                    toast.success(t("referentiels.noms.recognized", { name: a, crop: choice[a]! }));
                  }}
                >
                  {t("referentiels.noms.validate")}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState icon={HelpCircle} title={t("referentiels.noms.empty")}>
            {t("referentiels.noms.emptyDesc")}
          </EmptyState>
        )}
      </section>
    </>
  );
}

type SeuilKey = keyof Seuils;
const RULES: {
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

function ReglesSection() {
  const { t } = useI18n();
  return (
    <>
      <Intro>{t("referentiels.regles.intro")}</Intro>
      <div className="max-w-3xl space-y-3">
        {RULES.map((r) => (
          <RuleRow key={r.key} rule={r} />
        ))}
      </div>
    </>
  );
}

function RuleRow({ rule }: { rule: (typeof RULES)[number] }) {
  const { t } = useI18n();
  const seuils = useStore((s) => s.seuils);
  const plots = useStore((s) => s.plots);
  const saved = seuils[rule.key];
  const [val, setVal] = useState(String(saved));
  const n = Number(val.replace(",", "."));
  const ok = Number.isFinite(n) && n > 0;
  const now = useMemo(() => plots.filter((p) => rule.hits(p, saved)).length, [plots, rule, saved]);
  const draft = useMemo(
    () => (ok ? plots.filter((p) => rule.hits(p, n)).length : now),
    [plots, rule, n, ok, now],
  );
  return (
    <div className="rounded-md border p-3 sm:p-4">
      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm leading-snug">
        <span>{t(rule.before)}</span>
        <Input
          className="h-9 w-24 tabular"
          inputMode="decimal"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          aria-label={`${t(rule.before)} (${rule.unit})`}
        />
        <span className="font-medium">{rule.unit}</span>
        {rule.after ? <span>{t(rule.after)}.</span> : <span>.</span>}
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <span
          className={cn(
            "text-sm",
            n !== saved && ok ? "font-medium text-warning-fg" : "text-muted-foreground",
          )}
        >
          {t("referentiels.rule.result", { n: nf.format(draft) })}
          {n !== saved && ok && ` ${t("referentiels.currently", { n: nf.format(now) })}`}
        </span>
        <Button
          size="sm"
          className="h-9"
          disabled={!ok || n === saved}
          onClick={() => {
            actions.setSeuil(rule.key, n);
            toast.success(t("referentiels.rule.updated"), {
              description: t("referentiels.rule.updatedDesc", { n: nf.format(draft) }),
            });
          }}
        >
          {t("referentiels.save")}
        </Button>
      </div>
    </div>
  );
}

function JeuneSection() {
  const { t } = useI18n();
  const youth = useStore((s) => s.youthMaxAge);
  const producers = useStore((s) => s.producers);
  const [val, setVal] = useState(String(youth));
  const n = Number(val);
  const ok = /^\d{2}$/.test(val) && n >= 18 && n <= 60;
  const live = producers.filter((p) => !p.mergedInto);
  const count = (max: number) => live.filter((p) => ageAtMost(p.age, max)).length;
  return (
    <>
      <Intro>{t("referentiels.jeune.intro")}</Intro>
      <div className="rounded-md border p-5">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span>{t("referentiels.jeune.before")}</span>
          <Input
            className="h-9 w-20 tabular"
            inputMode="numeric"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            aria-label={t("referentiels.jeune.aria")}
          />
          <span>{t("referentiels.jeune.after")}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span
            className={cn(
              "text-sm",
              ok && n !== youth ? "font-medium text-warning-fg" : "text-muted-foreground",
            )}
          >
            {t("referentiels.jeune.result", {
              n: nf.format(ok ? count(n) : count(youth)),
              total: nf.format(live.length),
            })}
            {ok && n !== youth && ` ${t("referentiels.currently", { n: nf.format(count(youth)) })}`}
          </span>
          <Button
            size="sm"
            className="h-9"
            disabled={!ok || n === youth}
            onClick={() => {
              actions.setYouthMaxAge(n);
              toast.success(t("referentiels.jeune.updated"), {
                description: t("referentiels.jeune.updatedDesc"),
              });
            }}
          >
            {t("referentiels.save")}
          </Button>
        </div>
        {!ok && val && (
          <p className="mt-2 text-xs text-danger-fg">{t("referentiels.jeune.error")}</p>
        )}
      </div>
    </>
  );
}

function LocalitesSection() {
  const allScoops = useScoops();
  const { t } = useI18n();
  const producers = useStore((s) => s.producers);
  const orgs = useStore((s) => s.orgs);
  const [q, setQ] = useState("");
  const rows = VILLAGES.filter((v) => v.toLowerCase().includes(q.toLowerCase())).map((v) => ({
    village: v,
    commune: allScoops.find((s) => s.commune === v)?.commune ?? v,
    n: producers.filter((p) => p.village === v && !p.mergedInto).length,
    o: orgs.filter((o) => o.village === v).length,
  }));
  return (
    <>
      <Intro>{t("referentiels.localites.intro")}</Intro>
      <section className="rounded-md border p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold">{t("referentiels.localites.count", { n: rows.length })}</h2>
          <Input
            className="w-56"
            aria-label={t("referentiels.localites.search")}
            placeholder={t("referentiels.localites.search")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <table className="mt-4 w-full text-sm">
          <thead className="text-left text-xs text-muted-foreground">
            <tr>
              <th className="py-2 font-semibold">{t("referentiels.localites.col.village")}</th>
              <th className="font-semibold">{t("referentiels.localites.col.commune")}</th>
              <th className="text-right font-semibold">{t("referentiels.localites.col.orgs")}</th>
              <th className="text-right font-semibold">
                {t("referentiels.localites.col.producers")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.village}>
                <td className="py-2 font-medium">{r.village}</td>
                <td className="text-muted-foreground">{r.commune}</td>
                <td className="text-right tabular">{nf.format(r.o)}</td>
                <td className="text-right tabular">{nf.format(r.n)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

function CampagnesSection() {
  const campaigns = useCampaigns();
  const { t } = useI18n();
  const plots = useStore((s) => s.plots);
  const producers = useStore((s) => s.producers);
  return (
    <>
      <Intro>{t("referentiels.campagnes.intro")}</Intro>
      <section className="surface max-w-3xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">
                {t("referentiels.campagnes.col.campaign")}
              </th>
              <th className="text-right font-semibold">
                {t("referentiels.campagnes.col.producers")}
              </th>
              <th className="pr-4 text-right font-semibold">
                {t("referentiels.campagnes.col.plots")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {campaigns
              .map((camp) => camp.name)
              .map((c) => (
                <tr key={c}>
                  <td className="px-4 py-2.5 font-medium">{c}</td>
                  <td className="text-right tabular">
                    {nf.format(
                      producers.filter((p) => p.crops.some((x) => x.campaign === c)).length,
                    )}
                  </td>
                  <td className="pr-4 text-right tabular">
                    {nf.format(plots.filter((p) => p.campaign === c).length)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

function TypesSection() {
  const allScoops = useScoops();
  const { t } = useI18n();
  const orgs = useStore((s) => s.orgs);
  const missing = orgs.filter((o) => !o.type).length;
  return (
    <>
      <Intro>{t("referentiels.types.intro")}</Intro>
      <section className="rounded-md border p-5">
        <ul className="divide-y">
          {ORG_TYPES.map((type) => (
            <li key={type} className="flex items-center justify-between py-2.5 text-sm">
              <Pill tone="brand">{t(ORG_TYPE_LABEL[type])}</Pill>
              <span className="tabular text-muted-foreground">
                {t("referentiels.types.orgCount", {
                  n: nf.format(orgs.filter((o) => o.type === type).length),
                })}
              </span>
            </li>
          ))}
          <li className="flex items-center justify-between py-2.5 text-sm">
            <Pill tone="warning">{t("referentiels.types.toQualify")}</Pill>
            <span className="flex items-center gap-3">
              <span className="tabular text-muted-foreground">
                {t("referentiels.types.orgCount", { n: nf.format(missing) })}
              </span>
              {missing > 0 && (
                <Link
                  to="/organisations"
                  search={{ scoop: undefined, vue: "a-qualifier" }}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  {t("referentiels.types.qualify")}
                </Link>
              )}
            </span>
          </li>
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          {t("referentiels.types.scoops", { n: allScoops.length })}{" "}
          <BookMarked className="inline size-3" />
        </p>
      </section>
    </>
  );
}

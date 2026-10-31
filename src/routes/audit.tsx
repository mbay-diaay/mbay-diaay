import { useMemo, useState, type ComponentType } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Clock,
  Copy,
  Download,
  ExternalLink,
  RotateCcw,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState, Field, KpiTile, PageHeader, Pill } from "@/components/app/ui-bits";
import { FilterPill } from "@/components/app/FilterPill";
import { ALL, FilterSelect } from "@/components/app/FilterSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { actions, can, useStore, type AuditEntry } from "@/lib/store";
import { scopedAudit } from "@/lib/scope";
import { downloadCsv, fmtDateTime, nf } from "@/lib/format";
import { useI18n, type MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/audit")({
  validateSearch: (s: Record<string, unknown>) => ({
    q: typeof s["q"] === "string" ? (s["q"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Journal d'audit · Mbay Diaay" },
      {
        name: "description",
        content:
          "Journal en lecture seule de toutes les actions sensibles, filtrable, détaillé et exportable.",
      },
      { property: "og:title", content: "Journal d'audit · Mbay Diaay" },
      { property: "og:description", content: "Traçabilité des actions." },
    ],
  }),
  component: AuditRoute,
});

function AuditRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm={["audit.read", "audit.read.scoop"]} area={t("audit.area")}>
      <Audit />
    </AppShell>
  );
}

/** Actions à surveiller : données personnelles, exports, sauvegardes, fusions et accès coupés. */
const SENSITIVE =
  /Révélation|Export|Sauvegarde|Restauration|Téléchargement|Fusion|Révocation|Déconnexion forcée/i;

/** Familles d'actions, pour filtrer d'un clic sans connaître les intitulés exacts. */
type Family = "connexions" | "sensibles" | "qualite" | "donnees" | "admin";
const FAMILIES: { key: Family; label: MessageKey; hint: MessageKey; test: RegExp }[] = [
  {
    key: "sensibles",
    label: "audit.family.sensibles",
    hint: "audit.family.sensibles.hint",
    test: SENSITIVE,
  },
  {
    key: "qualite",
    label: "audit.family.qualite",
    hint: "audit.family.qualite.hint",
    test: /doublon|fusion|alerte|correction|parcelle|reprise|classement|approbation|refus/i,
  },
  {
    key: "donnees",
    label: "audit.family.donnees",
    hint: "audit.family.donnees.hint",
    test: /Import|Modification|Qualification|Référentiel/i,
  },
  {
    key: "admin",
    label: "audit.family.admin",
    hint: "audit.family.admin.hint",
    test: /utilisateur|appareil|liaison|compte|Réactivation|Désactivation|Déconnexion forcée|Révocation|Renommage|Resynchronisation|correspondance/i,
  },
  {
    key: "connexions",
    label: "audit.family.connexions",
    hint: "audit.family.connexions.hint",
    test: /Connexion/i,
  },
];
const familyOf = (a: AuditEntry): Family =>
  FAMILIES.find((f) => f.test.test(a.action))?.key ?? "donnees";
/** Lien dont la destination est choisie à l'exécution (fiche retrouvée depuis le texte de l'entrée). */
const AnyLink = Link as unknown as ComponentType<Record<string, unknown>>;

function Audit() {
  const { t } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const session = useStore((s) => s.session);
  const rawAudit = useStore((s) => s.audit);
  // Un rôle de coopérative ne lit que le journal de sa SCOOP.
  const audit = useMemo(() => scopedAudit(rawAudit, session), [rawAudit, session]);
  const wholePlatform = can(session, "audit.read");
  const producers = useStore((s) => s.producers);
  const plots = useStore((s) => s.plots);
  const orgs = useStore((s) => s.orgs);
  const [family, setFamily] = useState<Family | typeof ALL>(ALL);
  const [user, setUser] = useState(ALL);
  const [action, setAction] = useState(ALL);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [more, setMore] = useState(false);
  const [openId, setOpenId] = useState<string | undefined>();
  const q = search.q ?? "";
  const setQ = (v: string) =>
    void navigate({ to: "/audit", search: { q: v || undefined }, replace: true });
  const users = useMemo(() => [...new Set(audit.map((a) => a.user))].sort(), [audit]);
  const kinds = useMemo(() => [...new Set(audit.map((a) => a.action))].sort(), [audit]);

  const base = audit.filter((a) => {
    const day = a.at.slice(0, 10);
    return (
      (user === ALL || a.user === user) &&
      (action === ALL || a.action === action) &&
      (!from || day >= from) &&
      (!to || day <= to) &&
      (!q ||
        `${a.action} ${a.entity} ${a.detail} ${a.user}`.toLowerCase().includes(q.toLowerCase()))
    );
  });
  const rows = base.filter((a) => family === ALL || familyOf(a) === family);
  const moreCount =
    (user !== ALL ? 1 : 0) + (action !== ALL ? 1 : 0) + (from ? 1 : 0) + (to ? 1 : 0);
  const filtered = moreCount > 0 || !!q || family !== ALL;
  const sensitive = base.filter((a) => SENSITIVE.test(a.action)).length;
  const last = base[0];
  const open = openId ? audit.find((a) => a.id === openId) : undefined;

  /** Objet concerné par une entrée, quand on sait le retrouver : lien direct vers sa fiche. */
  const target = (a: AuditEntry): { label: string; link: Record<string, unknown> } | null => {
    const code = a.entity.match(/(MD-\d+)/)?.[1] ?? a.detail.match(/(MD-\d+)/)?.[1];
    const pCode = a.entity.match(/(PA-\d+)/)?.[1];
    if (pCode) {
      const pl = plots.find((x) => x.code === pCode);
      if (pl)
        return { label: t("audit.target.plot", { code: pCode }), link: { to: "/producteurs" } };
    }
    if (code) {
      const p = producers.find((x) => x.code === code);
      if (p)
        return {
          label: `${p.firstName} ${p.lastName} (${code})`,
          link: { to: "/producteurs/$id", params: { id: p.id } },
        };
    }
    if (/^Lot /.test(a.entity)) return { label: a.entity, link: { to: "/imports" } };
    if (/^Cas /.test(a.entity))
      return { label: a.entity, link: { to: "/qualite/doublons", search: { scoop: undefined } } };
    const orgName = a.entity.replace(/^Organisation /, "");
    const org = /^Organisation /.test(a.entity) ? orgs.find((o) => o.name === orgName) : undefined;
    if (org) return { label: org.name, link: { to: "/organisations/$id", params: { id: org.id } } };
    if (/Appareil/.test(a.entity))
      return {
        label: t("audit.target.devices"),
        link: { to: "/appareils", search: { user: undefined } },
      };
    if (/Utilisateur|Compte/.test(a.entity))
      return {
        label: t("audit.target.users"),
        link: { to: "/utilisateurs", search: { q: a.detail.split(" ")[0] } },
      };
    return null;
  };

  /** Phrase lisible par quelqu'un qui n'est pas à l'aise avec le vocabulaire technique. */
  const sentence = (a: AuditEntry) =>
    t("audit.sheet.sentence", {
      user: a.user,
      action: a.action,
      entity: a.entity,
      date: new Date(a.at).toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" }),
    });

  const exportCsv = () => {
    downloadCsv(`journal_audit${filtered ? "_filtre" : ""}.csv`, [
      ["Date", "Utilisateur", "Action", "Entité", "Détail"],
      ...rows.map((a) => [a.at, a.user, a.action, a.entity, a.detail]),
    ]);
    actions.audit("Export", "Journal d'audit", `${rows.length} entrée(s) (CSV)`);
    toast.success(t("audit.exported"), {
      description: t("audit.exportedCount.autre", { count: rows.length }),
    });
  };
  const reset = () => {
    setFamily(ALL);
    setUser(ALL);
    setAction(ALL);
    setFrom("");
    setTo("");
    setQ("");
  };
  const related = open
    ? audit.filter((a) => a.id !== open.id && a.entity === open.entity).slice(0, 5)
    : [];
  const tgt = open ? target(open) : null;

  return (
    <>
      <PageHeader
        eyebrow={t("audit.eyebrow")}
        title={t("audit.title")}
        description={wholePlatform ? t("audit.description.platform") : t("audit.description.scoop")}
        actions={
          <Button variant="outline" onClick={exportCsv} disabled={!rows.length}>
            <Download className="size-4" />
            {t("audit.export")}
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiTile
          label={t("audit.kpi.entries")}
          value={nf.format(base.length)}
          sub={t("audit.kpi.entriesOf", { total: nf.format(audit.length) })}
        />
        <KpiTile
          label={t("audit.kpi.users")}
          value={nf.format(new Set(base.map((a) => a.user)).size)}
          sub={t("audit.kpi.usersSub")}
        />
        <KpiTile
          label={t("audit.kpi.sensitive")}
          value={nf.format(sensitive)}
          sub={t("audit.kpi.sensitiveSub")}
          tone={sensitive ? "warning" : "neutral"}
        />
        <KpiTile
          label={t("audit.kpi.last")}
          value={last ? fmtDateTime(last.at) : t("audit.kpi.none")}
          sub={last?.user}
        />
      </div>

      <div className="surface mb-3 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <FilterPill active={family === ALL} onClick={() => setFamily(ALL)} count={base.length}>
            {t("audit.family.all")}
          </FilterPill>
          {FAMILIES.map((f) => (
            <FilterPill
              key={f.key}
              active={family === f.key}
              onClick={() => setFamily(family === f.key ? ALL : f.key)}
              count={base.filter((a) => familyOf(a) === f.key).length}
              tone={f.key === "sensibles" ? "warning" : undefined}
            >
              {t(f.label)}
            </FilterPill>
          ))}
          <div className="relative ml-auto w-full sm:w-56">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label={t("audit.search.aria")}
              placeholder={t("audit.search.placeholder")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => setMore(!more)}
            aria-expanded={more}
          >
            <SlidersHorizontal className="size-4" />
            {moreCount > 0
              ? t("audit.moreFiltersCount", { count: moreCount })
              : t("audit.moreFilters")}
          </Button>
        </div>
        {family !== ALL && (
          <p className="mt-2 text-xs text-muted-foreground">
            {t(FAMILIES.find((f) => f.key === family)!.hint)}
          </p>
        )}
        {more && (
          <div className="mt-3 flex flex-wrap items-end gap-3 border-t pt-3">
            <FilterSelect
              label={t("audit.filter.user")}
              className="w-52"
              value={user}
              onChange={setUser}
              options={users.map((u) => [u, u] as const)}
            />
            <FilterSelect
              label={t("audit.filter.action")}
              allLabel={t("audit.filter.actionAll")}
              className="w-60"
              value={action}
              onChange={setAction}
              options={kinds.map((k) => [k, k] as const)}
            />
            <label className="text-xs text-muted-foreground">
              {t("audit.filter.from")}
              <Input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="mt-1 w-40"
              />
            </label>
            <label className="text-xs text-muted-foreground">
              {t("audit.filter.to")}
              <Input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1 w-40"
              />
            </label>
          </div>
        )}
      </div>

      <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
        <span>
          <span className="font-medium text-foreground tabular">{nf.format(rows.length)}</span>{" "}
          {t("audit.count.autre", { count: rows.length })}
        </span>
        {filtered && (
          <button
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            onClick={reset}
          >
            <RotateCcw className="size-3.5" />
            {t("audit.reset")}
          </button>
        )}
      </div>

      <div className="surface overflow-x-auto">
        {rows.length ? (
          <table className="w-full text-sm">
            <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">{t("audit.col.date")}</th>
                <th className="font-semibold">{t("audit.col.user")}</th>
                <th className="font-semibold">{t("audit.col.action")}</th>
                <th className="hidden font-semibold md:table-cell">{t("audit.col.entity")}</th>
                <th className="hidden pr-4 font-semibold lg:table-cell">{t("audit.col.detail")}</th>
                <th className="w-10 pr-4" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((a) => (
                <tr
                  key={a.id}
                  tabIndex={0}
                  onClick={() => setOpenId(a.id)}
                  onKeyDown={(e) => e.key === "Enter" && setOpenId(a.id)}
                  className="cursor-pointer hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
                >
                  <td className="whitespace-nowrap px-4 py-2.5 text-muted-foreground">
                    {fmtDateTime(a.at)}
                  </td>
                  <td>{a.user}</td>
                  <td className="font-medium">
                    {a.action}
                    {SENSITIVE.test(a.action) && (
                      <ShieldAlert
                        className="ml-1.5 inline size-3.5 text-warning-fg"
                        aria-label={t("audit.sensitiveAria")}
                      />
                    )}
                  </td>
                  <td className="hidden md:table-cell">{a.entity}</td>
                  <td className="hidden max-w-80 truncate pr-4 text-muted-foreground lg:table-cell">
                    {a.detail}
                  </td>
                  <td className="pr-4 text-right text-xs font-semibold text-primary">
                    {t("audit.col.detail")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState icon={Search} title={t("audit.empty.title")}>
            {t("audit.empty.text")}
          </EmptyState>
        )}
      </div>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpenId(undefined)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {open && (
            <>
              <SheetHeader>
                <SheetTitle>{open.action}</SheetTitle>
              </SheetHeader>
              <div className="mt-2 flex flex-wrap gap-2">
                <Pill tone="brand">{t(FAMILIES.find((f) => f.key === familyOf(open))!.label)}</Pill>
                {SENSITIVE.test(open.action) && (
                  <Pill tone="warning">{t("audit.sheet.sensitive")}</Pill>
                )}
              </div>
              <p className="mt-4 rounded-md bg-muted p-3 text-sm">{sentence(open)}</p>
              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <Field label={t("audit.sheet.when")}>{fmtDateTime(open.at)}</Field>
                <Field label={t("audit.sheet.who")}>
                  <AnyLink
                    to="/utilisateurs"
                    search={{ q: open.user }}
                    className="text-primary hover:underline"
                  >
                    {open.user}
                  </AnyLink>
                </Field>
                <Field label={t("audit.sheet.object")}>{open.entity}</Field>
                <Field label={t("audit.sheet.ref")}>{open.id}</Field>
              </dl>
              <div className="mt-4">
                <div className="eyebrow mb-1">{t("audit.sheet.what")}</div>
                <p className="text-sm">{open.detail || t("audit.sheet.noDetail")}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {tgt && (
                  <Button asChild size="sm">
                    <AnyLink {...tgt.link}>
                      <ExternalLink className="size-4" />
                      {t("audit.sheet.open", { label: tgt.label })}
                    </AnyLink>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    void navigator.clipboard?.writeText(
                      `${open.id} · ${sentence(open)} ${open.detail}`,
                    );
                    toast.success(t("audit.sheet.copied"));
                  }}
                >
                  <Copy className="size-4" />
                  {t("audit.sheet.copy")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setUser(open.user);
                    setMore(true);
                    setOpenId(undefined);
                  }}
                >
                  <Users className="size-4" />
                  {t("audit.sheet.allBy", { name: open.user.split(" ")[0] ?? open.user })}
                </Button>
              </div>
              <div className="mt-6">
                <div className="eyebrow mb-2 flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {t("audit.sheet.related")}
                </div>
                {related.length ? (
                  <ul className="divide-y text-sm">
                    {related.map((r) => (
                      <li key={r.id}>
                        <button
                          className="w-full py-2 text-left hover:text-primary"
                          onClick={() => setOpenId(r.id)}
                        >
                          <span className="font-medium">{r.action}</span>
                          <span className="block text-xs text-muted-foreground">
                            {r.user} · {fmtDateTime(r.at)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">{t("audit.sheet.noRelated")}</p>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

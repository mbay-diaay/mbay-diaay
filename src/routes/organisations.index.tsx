import { Fragment, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  CircleCheck,
  CircleDashed,
  Download,
  ListTree,
  Map as MapIcon,
  Network,
  Search,
  Table2,
  Tag,
  ExternalLink,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState, PageHeader, Pill } from "@/components/app/ui-bits";
import { RowActions } from "@/components/app/RowActions";
import { StatToggle } from "@/components/app/StatToggle";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actions, can, inScope, useStore, useScoops } from "@/lib/store";
import { ORG_TYPES, type Org, type OrgType } from "@/lib/mock/data";
import { downloadCsv, nf } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type Vue = "toutes" | "qualifiees" | "a-qualifier";

export const Route = createFileRoute("/organisations/")({
  validateSearch: (s: Record<string, unknown>) => ({
    scoop: typeof s["scoop"] === "string" ? (s["scoop"] as string) : undefined,
    vue: s["vue"] === "qualifiees" || s["vue"] === "a-qualifier" ? (s["vue"] as Vue) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Organisations · Mbay Diaay" },
      {
        name: "description",
        content:
          "Organisations de base par SCOOP : qualification des types, effectifs et accès à chaque fiche.",
      },
      { property: "og:title", content: "Organisations · Mbay Diaay" },
      {
        property: "og:description",
        content: "Liste, arborescence et qualification des organisations.",
      },
    ],
  }),
  component: OrgsRoute,
});

function OrgsRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="org.read" area={t("organisations.area")}>
      <Orgs />
    </AppShell>
  );
}

interface OrgRow {
  org: Org;
  producers: number;
  plots: number;
  toVerify: number;
}

function Orgs() {
  const allScoops = useScoops();
  const { t, tEnum } = useI18n();
  const g = Route.useSearch();
  const navigate = useNavigate();
  const session = useStore((s) => s.session);
  const orgs = useStore((s) => s.orgs);
  const producers = useStore((s) => s.producers);
  const plots = useStore((s) => s.plots);
  const vue: Vue = g.vue ?? "toutes";
  const [q, setQ] = useState("");
  const [layout, setLayout] = useState<"table" | "arbre">("table");
  const [sel, setSel] = useState<string[]>([]);
  const [type, setType] = useState<OrgType | "">("");
  const [openS, setOpenS] = useState<string[]>([]);

  const rows = useMemo<OrgRow[]>(() => {
    const live = producers.filter((p) => !p.mergedInto);
    const orgOf = new Map(live.map((p) => [p.id, p.orgId]));
    const nProd = new Map<string, number>();
    const nVerify = new Map<string, number>();
    live.forEach((p) => {
      nProd.set(p.orgId, (nProd.get(p.orgId) ?? 0) + 1);
      if (p.quality !== "validé") nVerify.set(p.orgId, (nVerify.get(p.orgId) ?? 0) + 1);
    });
    const nPlots = new Map<string, number>();
    plots.forEach((pl) => {
      const o = orgOf.get(pl.producerId);
      if (o) nPlots.set(o, (nPlots.get(o) ?? 0) + 1);
    });
    return inScope(orgs, session)
      .filter((o) => !g.scoop || o.scoopId === g.scoop)
      .map((org) => ({
        org,
        producers: nProd.get(org.id) ?? 0,
        plots: nPlots.get(org.id) ?? 0,
        toVerify: nVerify.get(org.id) ?? 0,
      }));
  }, [orgs, producers, plots, session, g.scoop]);

  const qualified = rows.filter((r) => r.org.type).length;
  const needle = q.trim().toLowerCase();
  const shown = rows.filter(
    (r) =>
      (vue === "toutes" || (vue === "qualifiees" ? !!r.org.type : !r.org.type)) &&
      (!needle || `${r.org.name} ${r.org.village}`.toLowerCase().includes(needle)),
  );
  const scoops = allScoops.filter((s) => shown.some((r) => r.org.scoopId === s.id));
  const selectable = vue === "a-qualifier" && can(session, "org.manage");
  const shownIds = shown.map((r) => r.org.id);
  const allSel = selectable && shownIds.length > 0 && shownIds.every((id) => sel.includes(id));

  const setVue = (v: Vue) => {
    setSel([]);
    void navigate({
      to: "/organisations",
      search: { scoop: g.scoop, vue: v === "toutes" ? undefined : v },
      replace: true,
    });
  };
  const open = (id: string) => void navigate({ to: "/organisations/$id", params: { id } });
  const assign = () => {
    if (!sel.length || !type) return;
    actions.qualifyOrgs(sel, type);
    toast.success(
      t("organisations.qualified.autre", {
        count: sel.length,
        type: tEnum("organisations.type", type),
      }),
    );
    setSel([]);
    setType("");
  };
  const exportCsv = () => {
    downloadCsv("organisations.csv", [
      ["Organisation", "Type", "Village", "SCOOP", "Producteurs", "Parcelles", "Fiches à vérifier"],
      ...shown.map((r) => [
        r.org.name,
        r.org.type ?? "à qualifier",
        r.org.village,
        allScoops.find((s) => s.id === r.org.scoopId)?.name ?? "",
        r.producers,
        r.plots,
        r.toVerify,
      ]),
    ]);
    actions.audit("Export", "Organisations", `${shown.length} lignes (CSV)`);
    toast.success(t("organisations.exported"));
  };

  return (
    <>
      <PageHeader
        eyebrow={t("organisations.eyebrow")}
        title={t("organisations.title")}
        description={t("organisations.description")}
        actions={
          <Button variant="outline" onClick={exportCsv}>
            <Download className="size-4" />
            {t("organisations.exportCsv")}
          </Button>
        }
      />

      <StatToggle<Vue>
        label={t("organisations.filter.label")}
        value={vue}
        onChange={setVue}
        options={[
          {
            key: "toutes",
            label: t("organisations.filter.all"),
            value: rows.length,
            hint: t("organisations.filter.allHint", {
              n: nf.format(rows.reduce((s, r) => s + r.producers, 0)),
            }),
            icon: Network,
          },
          {
            key: "qualifiees",
            label: t("organisations.filter.qualified"),
            value: qualified,
            hint: t("organisations.filter.qualifiedHint"),
            icon: CircleCheck,
            tone: "success",
          },
          {
            key: "a-qualifier",
            label: t("organisations.filter.toQualify"),
            value: rows.length - qualified,
            hint: t("organisations.filter.toQualifyHint"),
            icon: CircleDashed,
            tone: "warning",
          },
        ]}
      />

      <div className="surface mb-3 flex flex-wrap items-center gap-3 p-3">
        <div className="relative min-w-56 flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            aria-label={t("organisations.search")}
            placeholder={t("organisations.search")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Segmented
          className="ml-auto"
          ariaLabel={t("organisations.layout.label")}
          size="sm"
          value={layout}
          onChange={setLayout}
          options={[
            {
              value: "table",
              label: (
                <>
                  <Table2 className="size-3.5" />
                  {t("organisations.layout.table")}
                </>
              ),
            },
            {
              value: "arbre",
              label: (
                <>
                  <ListTree className="size-3.5" />
                  {t("organisations.layout.tree")}
                </>
              ),
            },
          ]}
        />
      </div>

      {selectable && sel.length > 0 && (
        <div className="sticky top-20 z-30 mb-3 flex flex-wrap items-center gap-3 rounded-[var(--card-radius)] border border-primary bg-primary-soft p-3 shadow-sm">
          <span className="text-sm font-semibold text-primary">
            {t("organisations.selected.autre", { count: sel.length })}
          </span>
          <Select value={type} onValueChange={(v) => setType(v as OrgType)}>
            <SelectTrigger className="h-9 w-52 bg-card">
              <SelectValue placeholder={t("organisations.bulk.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              {ORG_TYPES.map((ty) => (
                <SelectItem key={ty} value={ty}>
                  {tEnum("organisations.type", ty)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" className="h-9" disabled={!type} onClick={assign}>
            <Tag className="size-4" />
            {t("organisations.bulk.assign")}
          </Button>
          <Button size="sm" variant="ghost" className="h-9" onClick={() => setSel([])}>
            <X className="size-4" />
            {t("organisations.cancel")}
          </Button>
        </div>
      )}

      {!shown.length ? (
        <div className="surface">
          {vue === "a-qualifier" && !needle ? (
            <EmptyState icon={CircleCheck} title={t("organisations.empty.allQualified")}>
              {t("organisations.empty.allQualifiedHint")}
            </EmptyState>
          ) : (
            <EmptyState icon={Search} title={t("organisations.empty.none")}>
              {t("organisations.empty.noneHint")}
            </EmptyState>
          )}
        </div>
      ) : layout === "table" ? (
        <div className="surface overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                {selectable && (
                  <th className="w-10 px-4 py-3">
                    <Checkbox
                      checked={allSel}
                      onCheckedChange={(c) => setSel(c ? shownIds : [])}
                      aria-label={t("organisations.selectAll")}
                    />
                  </th>
                )}
                <th className={cn("py-3 font-semibold", !selectable && "pl-4")}>
                  {t("organisations.col.org")}
                </th>
                <th className="font-semibold">{t("organisations.col.type")}</th>
                <th className="text-right font-semibold">{t("organisations.col.producers")}</th>
                <th className="text-right font-semibold">{t("organisations.col.plots")}</th>
                <th className="pl-6 font-semibold">{t("organisations.col.toVerify")}</th>
                <th className="w-12 pr-4" />
              </tr>
            </thead>
            <tbody>
              {scoops.map((s) => {
                const group = shown.filter((r) => r.org.scoopId === s.id);
                return (
                  <Fragment key={s.id}>
                    <tr className="border-b bg-muted/40">
                      <td
                        colSpan={selectable ? 7 : 6}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        {s.name}{" "}
                        <span className="font-normal normal-case tracking-normal">
                          · {t("organisations.groupCount.autre", { count: group.length })}
                        </span>
                      </td>
                    </tr>
                    {group.map((r) => (
                      <tr
                        key={r.org.id}
                        onClick={() => open(r.org.id)}
                        className="cursor-pointer border-b last:border-0 hover:bg-muted/60"
                      >
                        {selectable && (
                          <td className="px-4 py-2.5" onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={sel.includes(r.org.id)}
                              onCheckedChange={(c) =>
                                setSel(c ? [...sel, r.org.id] : sel.filter((x) => x !== r.org.id))
                              }
                              aria-label={t("organisations.select", { name: r.org.name })}
                            />
                          </td>
                        )}
                        <td className={cn("py-2.5", !selectable && "pl-4")}>
                          <Link
                            to="/organisations/$id"
                            params={{ id: r.org.id }}
                            onClick={(e) => e.stopPropagation()}
                            className="font-semibold hover:text-primary hover:underline"
                          >
                            {r.org.name}
                          </Link>
                          <div className="text-xs text-muted-foreground">{r.org.village}</div>
                        </td>
                        <td>
                          {r.org.type ? (
                            <Pill tone="brand">{tEnum("organisations.type", r.org.type)}</Pill>
                          ) : (
                            <Pill tone="warning">{t("organisations.toQualify")}</Pill>
                          )}
                        </td>
                        <td className="text-right tabular">{nf.format(r.producers)}</td>
                        <td className="text-right tabular">{nf.format(r.plots)}</td>
                        <td className="pl-6">
                          <VerifyBar n={r.toVerify} total={r.producers} />
                        </td>
                        <td className="pr-4 text-right">
                          <RowActions
                            title={r.org.name}
                            items={[
                              {
                                label: t("organisations.action.open"),
                                icon: ExternalLink,
                                to: "/organisations/$id",
                                params: { id: r.org.id },
                              },
                              {
                                label: t("organisations.action.qualify"),
                                icon: Tag,
                                onSelect: () => {
                                  setVue("a-qualifier");
                                  setSel([r.org.id]);
                                },
                                hidden: !!r.org.type,
                              },
                            ]}
                          />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="surface p-2">
          <div className="flex items-center justify-between rounded-md bg-primary-soft px-4 py-3 font-semibold text-primary">
            <span>{t("organisations.uscn")}</span>
            <span className="tabular">
              {t("organisations.treeProducers", {
                n: nf.format(shown.reduce((s, r) => s + r.producers, 0)),
              })}
            </span>
          </div>
          <ul className="mt-1">
            {scoops.map((s) => {
              const group = shown.filter((r) => r.org.scoopId === s.id);
              const isOpen = openS.includes(s.id) || !!needle;
              return (
                <li key={s.id}>
                  <button
                    onClick={() =>
                      setOpenS(isOpen ? openS.filter((x) => x !== s.id) : [...openS, s.id])
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-2 rounded-md px-4 py-2.5 pl-8 text-left hover:bg-muted"
                  >
                    <ChevronRight
                      className={cn("size-4 transition-transform", isOpen && "rotate-90")}
                    />
                    <span className="flex-1 font-medium">{s.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {t("organisations.groupShort", { count: group.length })}
                    </span>
                    <span className="w-20 text-right text-sm tabular text-muted-foreground">
                      {nf.format(group.reduce((n, r) => n + r.producers, 0))}
                    </span>
                  </button>
                  {isOpen && (
                    <ul className="mb-2 ml-14 border-l pl-2">
                      {group.map((r) => (
                        <li key={r.org.id}>
                          <Link
                            to="/organisations/$id"
                            params={{ id: r.org.id }}
                            className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                          >
                            <span className="flex-1">
                              {r.org.name}{" "}
                              <span className="text-muted-foreground">· {r.org.village}</span>
                            </span>
                            {r.org.type ? (
                              <Pill tone="brand">{tEnum("organisations.type", r.org.type)}</Pill>
                            ) : (
                              <Pill tone="warning">{t("organisations.toQualify")}</Pill>
                            )}
                            <span className="w-12 text-right tabular text-muted-foreground">
                              {r.producers}
                            </span>
                            <ChevronRight className="size-4 text-muted-foreground" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

/** Part des fiches à vérifier : barre + chiffre, jamais la couleur seule. */
function VerifyBar({ n, total }: { n: number; total: number }) {
  const pct = total ? Math.round((n / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-muted">
        <div
          className={cn("h-1.5 rounded-full", pct > 40 ? "bg-warning" : "bg-primary")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs tabular text-muted-foreground">
        {nf.format(n)} · {pct} %
      </span>
    </div>
  );
}

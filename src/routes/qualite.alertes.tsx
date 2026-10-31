import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { AlertPill, Empty, Pill } from "@/components/app/ui-bits";
import { QualityHeader } from "@/components/app/QualityHeader";
import { FilterPill } from "@/components/app/FilterPill";
import { FilterSelect } from "@/components/app/FilterSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actions, inScope, useStore } from "@/lib/store";
import { nf } from "@/lib/format";
import type { AlertStatus, DataAlert } from "@/lib/mock/data";
import { cn } from "@/lib/utils";
import { useI18n, type MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/qualite/alertes")({
  validateSearch: (s: Record<string, unknown>) => ({
    scoop: typeof s["scoop"] === "string" ? (s["scoop"] as string) : undefined,
    campagne: typeof s["campagne"] === "string" ? (s["campagne"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Alertes qualité · Mbay Diaay" },
      {
        name: "description",
        content: "File des alertes qualité avec traitement en lot et aperçu avant validation.",
      },
      { property: "og:title", content: "Alertes qualité · Mbay Diaay" },
      { property: "og:description", content: "Traitement des alertes de qualité des données." },
    ],
  }),
  component: AlertsRoute,
});

function AlertsRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="alert.manage" area={t("qualite.alertes.area")}>
      <Alerts />
    </AppShell>
  );
}

const ALL = "__all";
const PAGE = 500;
const SEV = { faible: "neutral", moyenne: "ochre", élevée: "danger" } as const;
const SEV_RANK = { élevée: 0, moyenne: 1, faible: 2 } as const;
const SEV_LABEL: Record<keyof typeof SEV, MessageKey> = {
  faible: "qualite.alertes.severity.faible",
  moyenne: "qualite.alertes.severity.moyenne",
  élevée: "qualite.alertes.severity.élevée",
};
const ENTITY_LABEL: Record<"producteur" | "parcelle", MessageKey> = {
  producteur: "qualite.alertes.entity.producteur",
  parcelle: "qualite.alertes.entity.parcelle",
};
const STATUS_VALUE_LABEL: Record<AlertStatus, MessageKey> = {
  ouvert: "qualite.alertes.statusValue.ouvert",
  "en vérification": "qualite.alertes.statusValue.en vérification",
  résolu: "qualite.alertes.statusValue.résolu",
  rejeté: "qualite.alertes.statusValue.rejeté",
};

type SortMode = "severity" | "oldest" | "newest";

function alertAge(a: DataAlert) {
  return a.id;
}

function Alerts() {
  const { t } = useI18n();
  const g = Route.useSearch();
  const alerts = useStore((s) => s.alerts);
  const producers = useStore((s) => s.producers);
  const plots = useStore((s) => s.plots);
  const [f, setF] = useState({ type: ALL, severity: ALL, status: "ouvert", enumerator: ALL });
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortMode>("severity");
  const [limit, setLimit] = useState(PAGE);
  const [sel, setSel] = useState<string[]>([]);
  const [more, setMore] = useState(false);
  const session = useStore((s) => s.session);
  const [target, setTarget] = useState<AlertStatus | null>(null);
  const [comment, setComment] = useState("");
  const uniq = (k: "type" | "enumerator") => [...new Set(alerts.map((a) => a[k]))].sort();
  const prodById = useMemo(() => new Map(producers.map((p) => [p.id, p])), [producers]);
  const plotById = useMemo(() => new Map(plots.map((p) => [p.id, p])), [plots]);
  const scoped = useMemo(
    () => new Set(inScope(producers, session).map((p) => p.id)),
    [producers, session],
  );
  const ownerOf = (a: (typeof alerts)[number]) =>
    a.entity === "producteur"
      ? prodById.get(a.entityId)
      : prodById.get(plotById.get(a.entityId)?.producerId ?? "");
  const mine = useMemo(
    () =>
      alerts.filter((a) => {
        const o = ownerOf(a);
        return !!o && scoped.has(o.id);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [alerts, scoped, prodById, plotById],
  );

  const matchesBase = (a: (typeof alerts)[number]) => {
    const producer = ownerOf(a);
    const plot = a.entity === "parcelle" ? plotById.get(a.entityId) : undefined;
    const needle = q.trim().toLowerCase();
    return (
      (!g.scoop || producer?.scoopId === g.scoop) &&
      (!g.campagne ||
        plot?.campaign === g.campagne ||
        (!plot && producer?.crops.some((c) => c.campaign === g.campagne))) &&
      (f.type === ALL || a.type === f.type) &&
      (f.severity === ALL || a.severity === f.severity) &&
      (f.enumerator === ALL || a.enumerator === f.enumerator) &&
      (!needle || `${a.type} ${a.detail} ${a.enumerator}`.toLowerCase().includes(needle))
    );
  };

  /** Compteurs de statut = même base filtrée (hors statut) → un seul total cohérent. */
  const byStatus = (st: string) =>
    mine.filter((a) => matchesBase(a) && (st === ALL || a.status === st)).length;

  const rows = useMemo(() => {
    const list = mine.filter((a) => matchesBase(a) && (f.status === ALL || a.status === f.status));
    const ranked = [...list].sort((a, b) => {
      if (sort === "severity") {
        const d = SEV_RANK[a.severity] - SEV_RANK[b.severity];
        return d || alertAge(a).localeCompare(alertAge(b));
      }
      if (sort === "oldest") return alertAge(a).localeCompare(alertAge(b));
      return alertAge(b).localeCompare(alertAge(a));
    });
    return ranked;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mine, f, g.scoop, g.campagne, q, sort, prodById, plotById]);

  const visible = rows.slice(0, limit);
  const picked = alerts.filter((a) => sel.includes(a.id));

  const filters: [keyof typeof f, string, (readonly [string, string])[]][] = [
    ["type", t("qualite.alertes.filter.type"), uniq("type").map((o) => [o, o] as const)],
    [
      "severity",
      t("qualite.alertes.filter.severity"),
      (Object.keys(SEV) as (keyof typeof SEV)[]).map((o) => [o, t(SEV_LABEL[o])] as const),
    ],
    [
      "enumerator",
      t("qualite.alertes.filter.enumerator"),
      uniq("enumerator").map((o) => [o, o] as const),
    ],
  ];
  const moreCount = filters.filter(([k]) => f[k] !== ALL).length;
  const entityLink = (a: (typeof alerts)[number]) => {
    if (a.entity === "parcelle") {
      const pl = plotById.get(a.entityId);
      return pl ? (
        <span className="font-semibold">{pl.code}</span>
      ) : (
        t("qualite.common.notProvided")
      );
    }
    const p = prodById.get(a.entityId);
    return p ? (
      <Link
        to="/producteurs/$id"
        params={{ id: p.id }}
        onClick={(e) => e.stopPropagation()}
        className="font-semibold text-primary hover:underline"
      >
        {p.firstName} {p.lastName}
      </Link>
    ) : (
      t("qualite.common.notProvided")
    );
  };

  const resetPage = () => {
    setLimit(PAGE);
    setSel([]);
  };

  return (
    <>
      <QualityHeader description={t("qualite.alertes.description")} />
      <div className="surface mb-3 p-3">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              ["ouvert", "qualite.alertes.status.ouvert"],
              ["en vérification", "qualite.alertes.status.en vérification"],
              ["résolu", "qualite.alertes.status.résolu"],
              ["rejeté", "qualite.alertes.status.rejeté"],
              [ALL, "qualite.common.all"],
            ] as const satisfies readonly (readonly [string, MessageKey])[]
          ).map(([v, l]) => (
            <FilterPill
              key={v}
              active={f.status === v}
              count={byStatus(v)}
              tone={v === "ouvert" ? "warning" : v === "résolu" ? "success" : "neutral"}
              onClick={() => {
                setF({ ...f, status: v });
                resetPage();
              }}
            >
              {t(l)}
            </FilterPill>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-9"
            onClick={() => setMore(!more)}
            aria-expanded={more}
          >
            <SlidersHorizontal className="size-4" />
            {t("qualite.common.filters")}
            {moreCount > 0 && ` (${moreCount})`}
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div className="relative min-w-0 flex-1 basis-48">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label={t("qualite.alertes.searchAria")}
              placeholder={t("qualite.alertes.searchPlaceholder")}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                resetPage();
              }}
              className="pl-8"
            />
          </div>
          <Select
            value={sort}
            onValueChange={(v) => {
              setSort(v as SortMode);
              resetPage();
            }}
          >
            <SelectTrigger className="w-full sm:w-56" aria-label={t("qualite.alertes.sortAria")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="severity">{t("qualite.alertes.sort.severity")}</SelectItem>
              <SelectItem value="oldest">{t("qualite.alertes.sort.oldest")}</SelectItem>
              <SelectItem value="newest">{t("qualite.alertes.sort.newest")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {more && (
          <div className="mt-3 grid grid-cols-2 gap-2 border-t pt-3 sm:gap-3 md:grid-cols-3">
            {filters.map(([k, label, opts]) => (
              <FilterSelect
                key={k}
                label={label}
                value={f[k]}
                onChange={(v) => {
                  setF({ ...f, [k]: v });
                  resetPage();
                }}
                options={opts}
              />
            ))}
          </div>
        )}
      </div>
      {sel.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary bg-primary-soft p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg md:static md:mb-3 md:flex md:flex-wrap md:items-center md:gap-2 md:rounded-[var(--card-radius)] md:border md:shadow-none">
          <div className="mb-2 flex items-center justify-between text-sm font-medium md:mb-0 md:mr-2">
            <span>{t("qualite.alertes.selected", { n: sel.length })}</span>
            <button
              className="text-xs font-semibold text-primary md:hidden"
              onClick={() => setSel([])}
            >
              {t("qualite.alertes.deselect")}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 md:flex">
            <Button size="sm" variant="outline" onClick={() => setTarget("en vérification")}>
              <span className="md:hidden">{t("qualite.alertes.verifyShort")}</span>
              <span className="hidden md:inline">{t("qualite.alertes.verifyLong")}</span>
            </Button>
            <Button size="sm" onClick={() => setTarget("résolu")}>
              {t("qualite.alertes.resolve")}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setTarget("rejeté")}>
              {t("qualite.alertes.reject")}
            </Button>
          </div>
        </div>
      )}
      <div className={cn("surface overflow-hidden", sel.length > 0 && "mb-32 md:mb-0")}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted px-4 py-2 text-xs text-muted-foreground">
          <span>
            {rows.length
              ? t("qualite.alertes.range", {
                  from: nf.format(1),
                  to: nf.format(Math.min(limit, rows.length)),
                  total: nf.format(rows.length),
                })
              : t("qualite.alertes.empty")}
          </span>
        </div>
        <div className="md:hidden">
          {visible.length > 0 && (
            <label className="flex items-center gap-3 border-b bg-muted/50 px-4 py-3 text-xs font-semibold text-muted-foreground">
              <Checkbox
                checked={sel.length === visible.length && visible.length > 0}
                onCheckedChange={(c) => setSel(c ? visible.map((r) => r.id) : [])}
              />
              {t("qualite.alertes.selectAllCount", { n: visible.length })}
            </label>
          )}
          <ul className="divide-y">
            {visible.map((a) => (
              <li key={a.id}>
                <label
                  className={cn("flex gap-3 px-4 py-3", sel.includes(a.id) && "bg-primary-soft/60")}
                >
                  <Checkbox
                    className="mt-0.5"
                    checked={sel.includes(a.id)}
                    onCheckedChange={(c) =>
                      setSel(c ? [...sel, a.id] : sel.filter((x) => x !== a.id))
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium">{a.type}</span>
                      <AlertPill s={a.status} />
                    </div>
                    <div className="mt-0.5 text-sm text-muted-foreground">{a.detail}</div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      <Pill tone={SEV[a.severity]}>{t(SEV_LABEL[a.severity])}</Pill>
                      <span className="capitalize">{t(ENTITY_LABEL[a.entity])}</span>{" "}
                      {entityLink(a)}·<span>{a.enumerator}</span>
                    </div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    checked={!!visible.length && sel.length === visible.length}
                    onCheckedChange={(c) => setSel(c ? visible.map((r) => r.id) : [])}
                    aria-label={t("qualite.alertes.selectAll")}
                  />
                </th>
                <th>{t("qualite.alertes.col.type")}</th>
                <th>{t("qualite.alertes.col.detail")}</th>
                <th>{t("qualite.alertes.col.entity")}</th>
                <th className="hidden pr-3 lg:table-cell">{t("qualite.alertes.col.enumerator")}</th>
                <th>{t("qualite.alertes.col.severity")}</th>
                <th className="pr-4">{t("qualite.alertes.col.status")}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {visible.map((a) => (
                <tr key={a.id} className="hover:bg-muted/60">
                  <td className="px-4 py-2.5">
                    <Checkbox
                      checked={sel.includes(a.id)}
                      onCheckedChange={(c) =>
                        setSel(c ? [...sel, a.id] : sel.filter((x) => x !== a.id))
                      }
                      aria-label={t("qualite.alertes.selectOne", { type: a.type })}
                    />
                  </td>
                  <td className="pr-3 font-medium">{a.type}</td>
                  <td className="pr-3 text-muted-foreground">{a.detail}</td>
                  <td className="pr-3">
                    <div className="text-xs capitalize text-muted-foreground">
                      {t(ENTITY_LABEL[a.entity])}
                    </div>
                    {entityLink(a)}
                  </td>
                  <td className="hidden lg:table-cell">{a.enumerator}</td>
                  <td className="pr-3">
                    <Pill tone={SEV[a.severity]}>{t(SEV_LABEL[a.severity])}</Pill>
                  </td>
                  <td className="pr-4">
                    <AlertPill s={a.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!rows.length && <Empty>{t("qualite.alertes.empty")}</Empty>}
        {rows.length > limit && (
          <div className="border-t p-3 text-center">
            <Button variant="outline" onClick={() => setLimit((n) => n + PAGE)}>
              {t("qualite.alertes.loadMore")}
            </Button>
          </div>
        )}
      </div>

      <FormDialog
        open={!!target}
        onOpenChange={(o) => !o && setTarget(null)}
        title={t("qualite.alertes.dialog.title", {
          n: picked.length,
          status: target ? t(STATUS_VALUE_LABEL[target]) : "",
        })}
        description={t("qualite.alertes.dialog.description")}
        submitLabel={t("qualite.alertes.dialog.submit")}
        submitDisabled={comment.trim().length < 3}
        onSubmit={() => {
          actions.updateAlerts(sel, target!, comment.trim());
          toast.success(t("qualite.alertes.dialog.updated", { n: sel.length }));
          setSel([]);
          setTarget(null);
          setComment("");
        }}
      >
        <ul className="max-h-48 divide-y overflow-y-auto rounded-md border text-sm">
          {Object.entries(
            picked.reduce<Record<string, number>>(
              (m, a) => ({ ...m, [a.type]: (m[a.type] ?? 0) + 1 }),
              {},
            ),
          ).map(([type, n]) => (
            <li key={type} className="flex justify-between px-3 py-2">
              <span>{type}</span>
              <span className="tabular">{n}</span>
            </li>
          ))}
        </ul>
        <FormField label={t("qualite.common.comment")} required>
          {(c) => (
            <Textarea
              {...c}
              placeholder={t("qualite.alertes.dialog.commentPlaceholder")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          )}
        </FormField>
      </FormDialog>
    </>
  );
}

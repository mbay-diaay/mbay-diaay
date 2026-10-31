import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { CorrectionPill, Empty } from "@/components/app/ui-bits";
import { QualityHeader } from "@/components/app/QualityHeader";
import { FilterPill } from "@/components/app/FilterPill";
import { FilterSelect } from "@/components/app/FilterSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actions, inScope, useStore, useScoops } from "@/lib/store";
import { type CorrectionStatus } from "@/lib/mock/data";
import { fmtDateTime, maskCni, maskPhone, nf } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n, type MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/qualite/corrections")({
  head: () => ({
    meta: [
      { title: "Demandes de correction · Mbay Diaay" },
      {
        name: "description",
        content:
          "File des demandes de modification des fiches producteurs : revue avant/après et décision motivée.",
      },
      { property: "og:title", content: "Demandes de correction · Mbay Diaay" },
      {
        property: "og:description",
        content: "Revue avant/après et décision des demandes de correction.",
      },
    ],
  }),
  component: CorrectionsRoute,
});

function CorrectionsRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="correction.manage" area={t("qualite.corrections.area")}>
      <CorrectionsPage />
    </AppShell>
  );
}

const ALL = "__all";
const SENSITIVE: Record<string, (v: string) => string> = { Téléphone: maskPhone, CNI: maskCni };
const STATUS_VALUE_LABEL: Record<CorrectionStatus, MessageKey> = {
  "en attente": "qualite.corrections.statusValue.en attente",
  approuvée: "qualite.corrections.statusValue.approuvée",
  refusée: "qualite.corrections.statusValue.refusée",
};

function CorrectionsPage() {
  const allScoops = useScoops();
  const { t } = useI18n();
  const showVal = (field: string, v: string) =>
    SENSITIVE[field]
      ? v
        ? SENSITIVE[field]!(v)
        : t("qualite.common.notProvided")
      : v || t("qualite.common.notProvided");
  const session = useStore((s) => s.session);
  const corrections = useStore((s) => s.corrections);
  const producers = useStore((s) => s.producers);
  const [f, setF] = useState({ status: "en attente", scoop: ALL, field: ALL, q: "" });
  const [more, setMore] = useState(false);
  const [sort, setSort] = useState<"recent" | "old">("recent");
  const [dense, setDense] = useState(false);
  const [openId, setOpenId] = useState<string | undefined>();
  const [comment, setComment] = useState("");

  const scoped = useMemo(
    () => new Set(inScope(producers, session).map((p) => p.id)),
    [producers, session],
  );
  const prodOf = useMemo(() => {
    const m = new Map(producers.map((p) => [p.id, p]));
    return (id: string) => m.get(id);
  }, [producers]);
  const fields = useMemo(
    () => [...new Set(corrections.flatMap((r) => r.changes.map((c) => c.field)))].sort(),
    [corrections],
  );

  const counts = useMemo(() => {
    const inScopeRows = corrections.filter((r) => scoped.has(r.producerId));
    return {
      pending: inScopeRows.filter((r) => r.status === "en attente").length,
      approved: inScopeRows.filter((r) => r.status === "approuvée").length,
      refused: inScopeRows.filter((r) => r.status === "refusée").length,
      total: inScopeRows.length,
    };
  }, [corrections, scoped]);

  const rows = useMemo(
    () =>
      corrections
        .filter((r) => scoped.has(r.producerId))
        .filter((r) => f.status === ALL || r.status === f.status)
        .filter((r) => f.field === ALL || r.changes.some((c) => c.field === f.field))
        .filter((r) => f.scoop === ALL || prodOf(r.producerId)?.scoopId === f.scoop)
        .filter((r) => {
          if (!f.q.trim()) return true;
          const p = prodOf(r.producerId);
          return `${p?.code ?? ""} ${p?.firstName ?? ""} ${p?.lastName ?? ""}`
            .toLowerCase()
            .includes(f.q.trim().toLowerCase());
        })
        .sort((a, b) =>
          sort === "recent"
            ? b.requestedAt.localeCompare(a.requestedAt)
            : a.requestedAt.localeCompare(b.requestedAt),
        ),
    [corrections, scoped, f, sort, prodOf],
  );

  const activeFilters =
    (f.scoop !== ALL ? 1 : 0) + (f.field !== ALL ? 1 : 0) + (f.q.trim() ? 1 : 0);
  const open = openId ? corrections.find((r) => r.id === openId) : undefined;
  const openProd = open ? prodOf(open.producerId) : undefined;

  const decide = (approved: boolean) => {
    if (!open) return;
    if (!approved && comment.trim().length < 3) return;
    actions.decideCorrection(
      open.id,
      approved,
      comment.trim() || "Approuvée après vérification du justificatif.",
    );
    toast.success(
      approved ? t("qualite.corrections.approvedDefault") : t("qualite.corrections.refusedDefault"),
    );
    setOpenId(undefined);
    setComment("");
  };

  return (
    <>
      <QualityHeader description={t("qualite.corrections.description")} />
      <div className="surface mb-3 p-3">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              [ALL, "qualite.common.all", counts.total],
              ["en attente", "qualite.corrections.status.en attente", counts.pending],
              ["approuvée", "qualite.corrections.status.approuvée", counts.approved],
              ["refusée", "qualite.corrections.status.refusée", counts.refused],
            ] as const satisfies readonly (readonly [string, MessageKey, number])[]
          ).map(([v, l, n]) => (
            <FilterPill
              key={v}
              active={f.status === v}
              count={n}
              tone={
                v === "en attente"
                  ? "warning"
                  : v === "approuvée"
                    ? "success"
                    : v === "refusée"
                      ? "danger"
                      : "neutral"
              }
              onClick={() => setF({ ...f, status: v })}
            >
              {t(l)}
            </FilterPill>
          ))}
          <div className="relative ml-auto w-full sm:w-56">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              aria-label={t("qualite.corrections.searchAria")}
              placeholder={t("qualite.corrections.searchPlaceholder")}
              value={f.q}
              onChange={(e) => setF({ ...f, q: e.target.value })}
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
            {t("qualite.common.filters")}
            {(f.scoop !== ALL ? 1 : 0) + (f.field !== ALL ? 1 : 0) > 0 &&
              ` (${(f.scoop !== ALL ? 1 : 0) + (f.field !== ALL ? 1 : 0)})`}
          </Button>
        </div>
        {more && (
          <div className="mt-3 grid grid-cols-2 gap-2 border-t pt-3 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
            <FilterSelect
              label={t("qualite.corrections.scoopLabel")}
              allLabel={t("qualite.corrections.scoopAll")}
              className="sm:w-48"
              value={f.scoop}
              onChange={(v) => setF({ ...f, scoop: v })}
              options={allScoops.map((x) => [x.id, x.name] as const)}
            />
            <FilterSelect
              label={t("qualite.corrections.fieldLabel")}
              className="sm:w-44"
              value={f.field}
              onChange={(v) => setF({ ...f, field: v })}
              options={fields.map((c) => [c, c] as const)}
            />
            <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
              <SelectTrigger className="sm:w-48" aria-label={t("qualite.corrections.sortAria")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">{t("qualite.corrections.sort.recent")}</SelectItem>
                <SelectItem value="old">{t("qualite.corrections.sort.old")}</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="hidden h-9 md:inline-flex"
              onClick={() => setDense(!dense)}
            >
              {t("qualite.corrections.density", {
                mode: t(
                  dense
                    ? "qualite.corrections.density.compact"
                    : "qualite.corrections.density.comfortable",
                ),
              })}
            </Button>
          </div>
        )}
      </div>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span className="tabular font-medium text-foreground">{nf.format(rows.length)}</span>{" "}
        {t("qualite.corrections.ofTotal", { total: nf.format(counts.total) })}
        {activeFilters > 0 && <> {t("qualite.corrections.activeFilters", { n: activeFilters })}</>}
        {activeFilters > 0 && (
          <button
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            onClick={() => setF({ ...f, scoop: ALL, field: ALL, q: "" })}
          >
            <RotateCcw className="size-3.5" /> {t("qualite.corrections.reset")}
          </button>
        )}
      </div>

      <div className="surface overflow-hidden">
        {rows.length > 0 && (
          // Téléphone : une carte par demande, toute la carte ouvre l'examen.
          <ul className="divide-y md:hidden">
            {rows.map((r) => {
              const p = prodOf(r.producerId);
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-left active:bg-muted"
                    onClick={() => {
                      setOpenId(r.id);
                      setComment("");
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="min-w-0 font-medium">
                        {p ? `${p.firstName} ${p.lastName}` : t("qualite.common.notProvided")}
                      </span>
                      <CorrectionPill s={r.status} />
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground tabular">{p?.code}</div>
                    <div className="mt-1 text-sm">
                      <span className="tabular font-medium">{r.changes.length}</span>{" "}
                      {t("qualite.corrections.fieldsList")}{" "}
                      {r.changes.map((c) => c.field).join(", ")}
                    </div>
                    <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {r.motif}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {r.requester} · {fmtDateTime(r.requestedAt)}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {rows.length ? (
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground">
                <tr>
                  <th className="py-3 pl-4">{t("qualite.corrections.col.producer")}</th>
                  <th>{t("qualite.corrections.col.changes")}</th>
                  <th>{t("qualite.corrections.col.motif")}</th>
                  <th className="hidden lg:table-cell">{t("qualite.corrections.col.requester")}</th>
                  <th>{t("qualite.corrections.col.date")}</th>
                  <th>{t("qualite.corrections.col.status")}</th>
                  <th className="pr-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((r) => {
                  const p = prodOf(r.producerId);
                  return (
                    <tr key={r.id} className={cn("hover:bg-muted/40", dense ? "py-0" : "")}>
                      <td className={cn("pl-4", dense ? "py-1.5" : "py-2.5")}>
                        {p ? (
                          <Link
                            to="/producteurs/$id"
                            params={{ id: p.id }}
                            className="font-medium hover:text-primary hover:underline"
                          >
                            {p.code} · {p.firstName} {p.lastName}
                          </Link>
                        ) : (
                          t("qualite.common.notProvided")
                        )}
                      </td>
                      <td>
                        <span className="tabular font-medium">{r.changes.length}</span>{" "}
                        {t("qualite.corrections.fieldsList")}{" "}
                        {r.changes.map((c) => c.field).join(", ")}
                      </td>
                      <td
                        className="max-w-48 truncate pr-3 text-muted-foreground lg:max-w-64"
                        title={r.motif}
                      >
                        {r.motif}
                      </td>
                      <td className="hidden lg:table-cell">{r.requester}</td>
                      <td className="whitespace-nowrap text-muted-foreground">
                        {fmtDateTime(r.requestedAt)}
                      </td>
                      <td>
                        <CorrectionPill s={r.status} />
                      </td>
                      <td className="pr-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={() => {
                            setOpenId(r.id);
                            setComment("");
                          }}
                        >
                          {t("qualite.corrections.examine")}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty>{t("qualite.corrections.empty")}</Empty>
        )}
      </div>

      {open && (
        <FormDialog
          open
          onOpenChange={(o) => !o && setOpenId(undefined)}
          size="lg"
          title={t("qualite.corrections.dialog.title")}
          description={t("qualite.corrections.dialog.description")}
          {...(open.status === "en attente"
            ? {
                submitLabel: t("qualite.corrections.dialog.approve"),
                onSubmit: () => decide(true),
                secondary: (
                  <Button
                    type="button"
                    variant="outline"
                    className="text-danger-fg"
                    disabled={comment.trim().length < 3}
                    onClick={() => decide(false)}
                  >
                    {t("qualite.corrections.dialog.refuse")}
                  </Button>
                ),
              }
            : {})}
          footerNote={
            <>
              {t("qualite.corrections.dialog.trace")}{" "}
              <Link
                to="/audit"
                search={{ q: undefined }}
                className="font-semibold text-primary hover:underline"
              >
                {t("qualite.corrections.dialog.auditLink")}
              </Link>
              .
            </>
          }
        >
          {openProd && (
            <p className="text-sm">
              {t("qualite.corrections.dialog.producer")}{" "}
              <Link
                to="/producteurs/$id"
                params={{ id: openProd.id }}
                className="font-semibold text-primary hover:underline"
              >
                {openProd.code} · {openProd.firstName} {openProd.lastName}
              </Link>
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            {t("qualite.corrections.dialog.requestedBy", {
              name: open.requester,
              date: fmtDateTime(open.requestedAt),
            })}
          </p>
          <div className="space-y-2">
            {open.changes.map((c, i) => (
              <div
                key={i}
                className="grid gap-1 rounded-md border p-2.5 text-sm sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-2"
              >
                <span className="font-medium">{c.field}</span>
                <span>
                  <span className="rounded bg-muted px-1.5 py-0.5 tabular line-through">
                    {showVal(c.field, c.from)}
                  </span>
                  <span className="mx-2">→</span>
                  <span className="rounded bg-primary-soft px-1.5 py-0.5 font-semibold tabular">
                    {showVal(c.field, c.to)}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm">
            <span className="font-medium">{t("qualite.corrections.dialog.motif")}</span>{" "}
            {open.motif}
          </p>
          {open.status === "en attente" ? (
            <FormField
              label={t("qualite.corrections.dialog.decisionLabel")}
              hint={t("qualite.corrections.dialog.decisionHint")}
            >
              {(c) => (
                <Textarea
                  {...c}
                  placeholder={t("qualite.corrections.dialog.decisionPlaceholder")}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              )}
            </FormField>
          ) : (
            <div className="rounded-md bg-muted p-3 text-sm">
              <span className="font-medium capitalize">{t(STATUS_VALUE_LABEL[open.status])}</span>{" "}
              {t("qualite.corrections.dialog.decidedBy", { name: open.decidedBy ?? "" })}{" "}
              {fmtDateTime(open.decidedAt ?? "")}
              {open.decisionComment && (
                <div className="mt-1 text-muted-foreground">« {open.decisionComment} »</div>
              )}
            </div>
          )}
        </FormDialog>
      )}
    </>
  );
}

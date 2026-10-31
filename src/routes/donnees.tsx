import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Archive,
  Database,
  Download,
  FileJson,
  FileSpreadsheet,
  History,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { PageHeader } from "@/components/app/ui-bits";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { actions, can, getState, isSnapshot, useStore, type Snapshot } from "@/lib/store";
import { downloadCsv, fmtDateTime, nf } from "@/lib/format";
import { ENTITY_ORDER, SCHEMA, type EntityKey } from "@/lib/io/schema";
import { downloadWorkbook, exchangeRows, type Cell, type SheetOut } from "@/lib/io/workbook";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/donnees")({
  head: () => ({
    meta: [
      { title: "Sauvegarde & export · Mbay Diaay" },
      {
        name: "description",
        content:
          "Exporter toutes les données en Excel, CSV ou sauvegarde JSON, et restaurer une sauvegarde.",
      },
      { property: "og:title", content: "Sauvegarde & export · Mbay Diaay" },
      { property: "og:description", content: "Export et restauration des données." },
    ],
  }),
  component: DataRoute,
});

function DataRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="data.backup" area={t("sauvegarde.area")}>
      <DataPage />
    </AppShell>
  );
}

type ExtraKey = "alertes" | "doublons" | "corrections" | "journal";
const EXTRA: { key: ExtraKey; label: string }[] = [
  { key: "alertes", label: "Alertes" },
  { key: "doublons", label: "Doublons" },
  { key: "corrections", label: "Demandes de correction" },
  { key: "journal", label: "Journal d'audit" },
];

/** Feuilles complémentaires (lecture seule : non réimportables par l'assistant d'import). */
function extraRows(k: ExtraKey): Cell[][] {
  const s = getState();
  const code = new Map(s.producers.map((p) => [p.id, p.code]));
  const plotCode = new Map(s.plots.map((p) => [p.id, p.code]));
  if (k === "alertes")
    return [
      ["Type", "Sévérité", "Concerne", "Code", "Statut", "Enquêteur", "Détail", "Commentaire"],
      ...s.alerts.map((a) => [
        a.type,
        a.severity,
        a.entity,
        (a.entity === "parcelle" ? plotCode.get(a.entityId) : code.get(a.entityId)) ?? "",
        a.status,
        a.enumerator,
        a.detail,
        a.comment ?? "",
      ]),
    ];
  if (k === "doublons")
    return [
      ["Cas", "Fiche A", "Fiche B", "Score", "Statut", "Signaux", "Commentaire"],
      ...s.cases.map((c) => [
        c.id.toUpperCase(),
        code.get(c.aId) ?? "",
        code.get(c.bId) ?? "",
        c.score,
        c.status,
        c.signals.map((x) => x.label).join(" | "),
        c.comment ?? "",
      ]),
    ];
  if (k === "corrections")
    return [
      ["Producteur", "Demandeur", "Date", "Champs", "Motif", "Statut", "Décision"],
      ...s.corrections.map((c) => [
        code.get(c.producerId) ?? "",
        c.requester,
        c.requestedAt,
        c.changes.map((x) => x.field).join(", "),
        c.motif,
        c.status,
        c.decisionComment ?? "",
      ]),
    ];
  return [
    ["Date", "Utilisateur", "Action", "Entité", "Détail"],
    ...s.audit.map((a) => [a.at, a.user, a.action, a.entity, a.detail]),
  ];
}

function DataPage() {
  const { t, tEnum } = useI18n();
  const session = useStore((s) => s.session);
  const orgs = useStore((s) => s.orgs.length);
  const producers = useStore((s) => s.producers.filter((p) => !p.mergedInto).length);
  const plots = useStore((s) => s.plots.length);
  const alerts = useStore((s) => s.alerts.length);
  const cases = useStore((s) => s.cases.length);
  const corrections = useStore((s) => s.corrections.length);
  const journal = useStore((s) => s.audit.length);
  const counts = { orgs, producers, plots, alerts, cases, corrections, audit: journal };
  const lastBackup = useStore((s) => s.audit.find((a) => a.action === "Sauvegarde complète"));
  const [pending, setPending] = useState<{ file: string; snap: Snapshot } | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const nominatif = can(session, "producer.export_nominatif");
  const cni = can(session, "cni.read");
  const opt = { nominatif, cni };
  const stamp = () => new Date().toISOString().slice(0, 10);
  const entityCount: Record<EntityKey, number> = {
    organisations: counts.orgs,
    producteurs: counts.producers,
    parcelles: counts.plots,
  };
  const extraCount: Record<ExtraKey, number> = {
    alertes: counts.alerts,
    doublons: counts.cases,
    corrections: counts.corrections,
    journal: counts.audit,
  };

  const exportAll = async () => {
    const s = getState();
    const sheets: SheetOut[] = [
      ...ENTITY_ORDER.map((e) => ({ name: SCHEMA[e].sheet, rows: exchangeRows(e, s, opt) })),
      ...EXTRA.map((x) => ({ name: x.label, rows: extraRows(x.key) })),
    ];
    await downloadWorkbook(`mbay_diaay_export_${stamp()}.xlsx`, sheets);
    actions.audit(
      nominatif ? "Export nominatif" : "Export anonymisé",
      "Toutes les données",
      "Classeur Excel complet",
    );
    toast.success(t("sauvegarde.exportAll.done"), {
      description: t("sauvegarde.exportAll.doneHint"),
    });
  };
  const exportCsv = (e: EntityKey | ExtraKey) => {
    const s = getState();
    const isEntity = (ENTITY_ORDER as string[]).includes(e);
    downloadCsv(
      `${e}_${stamp()}.csv`,
      isEntity ? exchangeRows(e as EntityKey, s, opt) : extraRows(e as ExtraKey),
    );
    actions.audit(
      isEntity && nominatif ? "Export nominatif" : "Export",
      isEntity ? SCHEMA[e as EntityKey].label : EXTRA.find((x) => x.key === e)!.label,
      "CSV",
    );
  };
  const backup = () => {
    const snap = actions.exportSnapshot();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(snap)], { type: "application/json" }));
    a.download = `mbay_diaay_sauvegarde_${stamp()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success(t("sauvegarde.backup.done"), {
      description: t("sauvegarde.backup.doneHint"),
    });
  };
  const onRestoreFile = async (f: File | undefined) => {
    if (!f) return;
    try {
      const parsed: unknown = JSON.parse(await f.text());
      if (!isSnapshot(parsed)) throw new Error(t("sauvegarde.restore.notBackup"));
      setPending({ file: f.name, snap: parsed });
    } catch (e) {
      toast.error(t("sauvegarde.restore.failed"), {
        description: e instanceof Error ? e.message : t("sauvegarde.restore.unreadable"),
      });
    } finally {
      if (input.current) input.current.value = "";
    }
  };
  const after = pending?.snap.data;

  return (
    <>
      <PageHeader
        eyebrow={t("sauvegarde.eyebrow")}
        title={t("sauvegarde.title")}
        description={t("sauvegarde.description")}
      />
      {!nominatif && (
        <p className="mb-4 rounded-md bg-info-bg p-3 text-sm text-info-fg">
          {t("sauvegarde.notice.noNominatif")}
        </p>
      )}
      {nominatif && !cni && (
        <p className="mb-4 rounded-md bg-info-bg p-3 text-sm text-info-fg">
          {t("sauvegarde.notice.noCni")}
        </p>
      )}

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-2">
        <section className="surface p-5">
          <div className="flex items-start gap-3">
            <span className="grid size-10 place-items-center rounded-md bg-primary-soft text-primary">
              <FileSpreadsheet className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold">{t("sauvegarde.export.title")}</h2>
              <p className="text-sm text-muted-foreground">{t("sauvegarde.export.description")}</p>
            </div>
          </div>
          <Button
            className="mt-4 h-auto min-h-10 max-w-full whitespace-normal py-2 text-center"
            onClick={() => void exportAll()}
          >
            <Download className="size-4" />
            {t("sauvegarde.export.all")}
          </Button>
          <div className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("sauvegarde.export.single")}
          </div>
          <ul className="mt-2 divide-y text-sm">
            {[
              ...ENTITY_ORDER.map((e) => ({
                key: e as EntityKey | ExtraKey,
                label: SCHEMA[e].label,
                n: entityCount[e],
              })),
              ...EXTRA.map((x) => ({
                key: x.key as EntityKey | ExtraKey,
                label: tEnum("sauvegarde.extra", x.key),
                n: extraCount[x.key],
              })),
            ].map((r) => (
              <li key={r.key} className="flex items-center justify-between py-2">
                <span>
                  {r.label}{" "}
                  <span className="tabular text-muted-foreground">· {nf.format(r.n)}</span>
                </span>
                <Button variant="ghost" size="sm" className="h-8" onClick={() => exportCsv(r.key)}>
                  <Download className="size-4" />
                  {t("sauvegarde.export.csvButton")}
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <div className="surface p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-md bg-primary-soft text-primary">
                <Archive className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold">{t("sauvegarde.backup.title")}</h2>
                <p className="text-sm text-muted-foreground">
                  {t("sauvegarde.backup.description")}
                </p>
              </div>
            </div>
            <Button
              className="mt-4 h-auto min-h-10 max-w-full whitespace-normal py-2 text-center"
              onClick={backup}
            >
              <FileJson className="size-4" />
              {t("sauvegarde.backup.download")}
            </Button>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <History className="size-3.5" />
              {lastBackup
                ? t("sauvegarde.backup.last", {
                    date: fmtDateTime(lastBackup.at),
                    user: lastBackup.user,
                  })
                : t("sauvegarde.backup.none")}
            </p>
          </div>
          <div className="surface p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-md bg-warning-bg text-warning-fg">
                <Database className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold">{t("sauvegarde.restore.title")}</h2>
                <p className="text-sm text-muted-foreground">
                  {t("sauvegarde.restore.description")}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-4 h-auto min-h-10 max-w-full whitespace-normal py-2 text-center"
              onClick={() => input.current?.click()}
            >
              <Upload className="size-4" />
              {t("sauvegarde.restore.choose")}
            </Button>
            <input
              ref={input}
              type="file"
              accept=".json,application/json"
              className="sr-only"
              onChange={(e) => void onRestoreFile(e.target.files?.[0])}
            />
            <p className="mt-3 text-xs text-muted-foreground">
              {t("sauvegarde.restore.importHintBefore")}{" "}
              <Link to="/imports" className="font-semibold text-primary hover:underline">
                {t("sauvegarde.restore.importLink")}
              </Link>
              {t("sauvegarde.restore.importHintAfter")}
            </p>
          </div>
        </section>
      </div>

      <AlertDialog open={!!pending} onOpenChange={(o) => !o && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("sauvegarde.confirm.title", { file: pending?.file ?? "" })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("sauvegarde.confirm.description", {
                date: pending ? fmtDateTime(pending.snap.exportedAt) : "",
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {after && (
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground">
                <tr>
                  <th className="py-1.5 font-semibold" />
                  <th className="text-right font-semibold">{t("sauvegarde.confirm.current")}</th>
                  <th className="text-right font-semibold">{t("sauvegarde.confirm.after")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {(
                  [
                    ["organisations", counts.orgs, after.orgs.length],
                    [
                      "producteurs",
                      counts.producers,
                      after.producers.filter((p) => !p.mergedInto).length,
                    ],
                    ["parcelles", counts.plots, after.plots.length],
                    ["alertes", counts.alerts, after.alerts.length],
                    ["doublons", counts.cases, after.cases.length],
                    ["journal", counts.audit, after.audit.length],
                  ] as const
                ).map(([l, a, b]) => (
                  <tr key={l}>
                    <td className="py-1.5">{tEnum("sauvegarde.volume", l)}</td>
                    <td className="text-right tabular">{nf.format(a)}</td>
                    <td className="text-right font-medium tabular">{nf.format(b)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>{t("sauvegarde.confirm.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!pending) return;
                try {
                  actions.restoreSnapshot(pending.snap);
                  toast.success(t("sauvegarde.restore.done"));
                } catch (e) {
                  toast.error(t("sauvegarde.restore.failed"), {
                    description: e instanceof Error ? e.message : "",
                  });
                }
                setPending(null);
              }}
            >
              {t("sauvegarde.confirm.action")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

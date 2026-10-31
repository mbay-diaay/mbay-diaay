import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, FileSpreadsheet, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { PageHeader } from "@/components/app/ui-bits";
import { Button } from "@/components/ui/button";
import { actions, useCan, useStore, useScoops } from "@/lib/store";
import { isConsolidated, scoopIdsOf, scopedReports } from "@/lib/scope";
import { catalogueFor, scopeLabel, type GeneratedReport, type ReportId } from "@/lib/reports";
import { downloadCsv, nf } from "@/lib/format";
import { downloadWorkbook } from "@/lib/io/workbook";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/rapports")({
  head: () => ({
    meta: [
      { title: "Rapports · Mbay Diaay" },
      {
        name: "description",
        content: "Rapports par coopérative et campagne, historique et téléchargement Excel ou CSV.",
      },
      { property: "og:title", content: "Rapports · Mbay Diaay" },
      { property: "og:description", content: "Génération de rapports consolidés." },
    ],
  }),
  component: ReportsRoute,
});

function ReportsRoute() {
  const { t } = useI18n();
  return (
    <AppShell
      perm={["report.generate", "report.read", "report.download"]}
      area={t("rapports.area")}
    >
      <Reports />
    </AppShell>
  );
}

const fileName = (r: GeneratedReport, ext: string) =>
  `${r.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_${r.generatedAt.slice(0, 10)}.${ext}`;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });

function Reports() {
  const allScoops = useScoops();
  const { t } = useI18n();
  const session = useStore((s) => s.session);
  const all = useStore((s) => s.reports);
  const plots = useStore((s) => s.plots);
  // Calculé hors du sélecteur : un sélecteur qui renvoie un nouveau tableau à chaque lecture boucle à l'infini.
  const campaigns = useMemo(() => [...new Set(plots.map((p) => p.campaign))].sort(), [plots]);
  const canGenerate = useCan("report.generate");
  const canRead = useCan("report.read");
  const canDownload = useCan("report.download");
  const [jobs, setJobs] = useState<Partial<Record<ReportId, true>>>({});
  const [scoopId, setScoopId] = useState("");
  const [campaign, setCampaign] = useState("");

  const catalogue = catalogueFor(session);
  const history = canRead ? scopedReports(all, session) : [];
  const visibleScoops = isConsolidated(session)
    ? allScoops
    : allScoops.filter((s) => scoopIdsOf(session).has(s.id));
  const scope = scopeLabel(session, allScoops);

  const run = (id: ReportId) => {
    setJobs((j) => ({ ...j, [id]: true }));
    // Simule la tâche de fond du serveur ; le contenu, lui, est calculé sur le périmètre de la session.
    setTimeout(() => {
      const res = actions.generateReport(id, {
        scoopId: scoopId || undefined,
        campaign: campaign || undefined,
      });
      setJobs((j) => {
        const { [id]: _done, ...rest } = j;
        return rest;
      });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success(t("rapports.ready", { name: res.report.name }), {
        description: t("rapports.readyScope", { scope: res.report.scopeLabel }),
      });
    }, 600);
  };

  const download = async (r: GeneratedReport, format: "CSV" | "Excel") => {
    const res = actions.downloadReport(r.id, format);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    const head = [r.name, `Périmètre : ${r.scopeLabel}`, `Édité le ${r.generatedAt.slice(0, 10)}`];
    if (format === "CSV") downloadCsv(fileName(r, "csv"), [head, r.header, ...r.rows]);
    else
      await downloadWorkbook(fileName(r, "xlsx"), [
        { name: "Rapport", rows: [head, r.header, ...r.rows] },
      ]);
  };

  return (
    <>
      <PageHeader
        title={t("rapports.title")}
        description={
          <>
            {t("rapports.description")} <span className="font-medium text-foreground">{scope}</span>
            .
          </>
        }
      />
      {canGenerate && (
        <>
          <div className="surface mb-4 flex flex-wrap items-end gap-4 p-4">
            <label className="grid min-w-0 max-w-full gap-1 text-sm">
              <span className="font-medium">{t("rapports.field.scoop")}</span>
              <select
                className="h-11 w-full min-w-0 rounded-md border bg-background px-3"
                value={scoopId}
                onChange={(e) => setScoopId(e.target.value)}
              >
                <option value="">
                  {visibleScoops.length > 1 ? t("rapports.field.allMine") : scope}
                </option>
                {visibleScoops.length > 1 &&
                  visibleScoops.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </label>
            <label className="grid min-w-0 max-w-full gap-1 text-sm">
              <span className="font-medium">{t("rapports.field.campaign")}</span>
              <select
                className="h-11 w-full min-w-0 rounded-md border bg-background px-3"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
              >
                <option value="">{t("rapports.field.allCampaigns")}</option>
                {campaigns.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {catalogue.map((r) => (
              <div key={r.id} className="surface flex items-start gap-4 p-5">
                <div className="grid size-10 shrink-0 place-items-center rounded-md bg-ochre-soft text-ochre">
                  <FileText className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{t(r.nameKey)}</div>
                  <p className="text-sm text-muted-foreground">{t(r.descriptionKey)}</p>
                  <Button
                    className="mt-3"
                    size="sm"
                    disabled={!!jobs[r.id]}
                    onClick={() => run(r.id)}
                  >
                    {jobs[r.id] ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        {t("rapports.generating")}
                      </>
                    ) : (
                      t("rapports.generate")
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {canRead && (
        <section className="mt-8" aria-labelledby="hist">
          <h2 id="hist" className="mb-3 text-lg font-semibold">
            {t("rapports.history.title")}
          </h2>
          {history.length === 0 ? (
            <p className="surface p-5 text-sm text-muted-foreground">
              {t("rapports.history.empty")}
            </p>
          ) : (
            <ul className="surface divide-y">
              {history.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {r.scopeLabel} ·{" "}
                      {t("rapports.history.rows", { rows: nf.format(r.rows.length) })} ·{" "}
                      {fmtDate(r.generatedAt)} · {r.generatedBy}
                    </div>
                  </div>
                  {canDownload ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => download(r, "Excel")}>
                        <FileSpreadsheet className="size-4" />
                        {t("rapports.excel")}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => download(r, "CSV")}>
                        <Download className="size-4" />
                        {t("rapports.csv")}
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {t("rapports.downloadDenied")}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
}

import { useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FlaskConical,
  Info,
  Loader2,
  RotateCcw,
  Upload,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState, KpiTile, PageHeader, Pill } from "@/components/app/ui-bits";
import { RowActions } from "@/components/app/RowActions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actions, can, getState, useStore, type ImportBatch } from "@/lib/store";
import { downloadCsv, fmtDateTime, nf } from "@/lib/format";
import { autoMap, detectEntity, ENTITY_ORDER, SCHEMA, type EntityKey } from "@/lib/io/schema";
import {
  buildPlan,
  planCounts,
  type ImportPlan,
  type Issue,
  type MappedSheet,
  type RawSheet,
} from "@/lib/io/validate";
import { readFile, sha } from "@/lib/io/parse";
import { downloadWorkbook, headers, templateSheets } from "@/lib/io/workbook";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/imports")({
  head: () => ({
    meta: [
      { title: "Imports · Mbay Diaay" },
      {
        name: "description",
        content:
          "Import de fichiers Excel ou CSV : modèle à remplir, correspondance des colonnes, import à blanc avec rapport détaillé, puis écriture.",
      },
      { property: "og:title", content: "Imports · Mbay Diaay" },
      {
        property: "og:description",
        content: "Import des données organisations, producteurs et parcelles.",
      },
    ],
  }),
  component: ImportsRoute,
});

function ImportsRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="import.manage" area={t("imports.area")}>
      <Imports />
    </AppShell>
  );
}

const SCRIPT = "import-web-1.0";
const IGNORE = "__ignore";
const NONE = "__none";
type Step = "depot" | "colonnes" | "rapport" | "termine";

interface Loaded {
  file: string;
  hash: string;
  sheets: (MappedSheet & { entityChoice: EntityKey | typeof IGNORE })[];
}

const STEPS: Step[] = ["depot", "colonnes", "rapport", "termine"];

function Imports() {
  const { t, tEnum } = useI18n();
  const batches = useStore((s) => s.imports);
  const session = useStore((s) => s.session);
  const [step, setStep] = useState<Step>("depot");
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [plan, setPlan] = useState<ImportPlan | null>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [done, setDone] = useState<ImportBatch | null>(null);
  // Rapports de la session, pour les re-télécharger depuis l'historique.
  const reports = useRef(new Map<string, Issue[]>());
  const input = useRef<HTMLInputElement>(null);
  const nextId = () => `L-${String(getState().imports.length + 1).padStart(3, "0")}`;

  const reset = () => {
    setStep("depot");
    setLoaded(null);
    setPlan(null);
    setDone(null);
    if (input.current) input.current.value = "";
  };

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    if (!/\.(xlsx|xls|csv|txt)$/i.test(f.name)) {
      toast.error(t("imports.error.format"), {
        description: t("imports.error.formatHint"),
      });
      return;
    }
    setBusy(true);
    try {
      const [raw, hash] = await Promise.all([readFile(f), sha(f)]);
      const sheets = raw.map((r: RawSheet) => {
        const [head = [], ...rows] = r.rows;
        const headersRow = head.map((h) => h.trim());
        const entity =
          detectEntity(r.name, headersRow) ?? (raw.length === 1 ? "producteurs" : null);
        return {
          name: r.name,
          headers: headersRow,
          rows,
          entity: entity ?? "producteurs",
          entityChoice: entity && r.name !== "Lisez-moi" ? entity : IGNORE,
          mapping: autoMap(entity ?? "producteurs", headersRow),
        } as Loaded["sheets"][number];
      });
      if (!sheets.length) throw new Error(t("imports.error.noSheet"));
      setLoaded({ file: f.name, hash, sheets });
      setStep("colonnes");
    } catch (e) {
      toast.error(t("imports.error.read"), {
        description: e instanceof Error ? e.message : t("imports.error.unreadable"),
      });
    } finally {
      setBusy(false);
    }
  };

  const setSheet = (i: number, patch: Partial<Loaded["sheets"][number]>) =>
    setLoaded((l) =>
      l ? { ...l, sheets: l.sheets.map((s, k) => (k === i ? { ...s, ...patch } : s)) } : l,
    );

  const active = loaded?.sheets.filter((s) => s.entityChoice !== IGNORE) ?? [];
  const missing = active.flatMap((s) =>
    SCHEMA[s.entityChoice as EntityKey].columns
      .filter((c) => c.required && s.mapping[c.key] === null)
      .map((c) => `${s.name} › ${c.label}`),
  );
  const sameAsImported = loaded
    ? batches.find((b) => b.hash === loaded.hash && b.mode === "réel")
    : undefined;

  const runDry = () => {
    if (!loaded) return;
    const st = getState();
    const p = buildPlan(
      active.map((s) => ({ ...s, entity: s.entityChoice as EntityKey })),
      {
        producers: st.producers,
        orgs: st.orgs,
        plots: st.plots,
        cropRefs: st.cropRefs,
        seuils: st.seuils,
      },
      { batchId: nextId(), now: new Date().toISOString() },
    );
    const id = nextId();
    actions.addImport({
      id,
      file: loaded.file,
      hash: loaded.hash,
      at: new Date().toISOString(),
      script: SCRIPT,
      mode: "à blanc",
      counts: planCounts(p),
      sheets: p.sheets.map(({ name, rows, rejects }) => ({ name, rows, rejects })),
    });
    reports.current.set(id, p.issues);
    setPlan(p);
    setStep("rapport");
  };

  const confirm = () => {
    if (!loaded || !plan) return;
    // Le plan est recalculé au moment d'écrire : la base a pu changer depuis l'import à blanc.
    const st = getState();
    const id = nextId();
    const p = buildPlan(
      active.map((s) => ({ ...s, entity: s.entityChoice as EntityKey })),
      {
        producers: st.producers,
        orgs: st.orgs,
        plots: st.plots,
        cropRefs: st.cropRefs,
        seuils: st.seuils,
      },
      { batchId: id, now: new Date().toISOString() },
    );
    const batch: ImportBatch = {
      id,
      file: loaded.file,
      hash: loaded.hash,
      at: new Date().toISOString(),
      script: SCRIPT,
      mode: "réel",
      counts: planCounts(p),
      sheets: p.sheets.map(({ name, rows, rejects }) => ({ name, rows, rejects })),
    };
    actions.ingestImport(p, batch);
    reports.current.set(id, p.issues);
    setPlan(p);
    setDone(batch);
    setStep("termine");
    toast.success(t("imports.toast.done"), {
      description: t("imports.toast.added", {
        producers: nf.format(p.producers.length),
        plots: nf.format(p.plots.length),
      }),
    });
  };

  const downloadIssues = (issues: Issue[], name: string) => {
    downloadCsv(name, [
      ["Feuille", "Ligne", "Colonne", "Niveau", "Motif"],
      ...issues.map((i) => [i.sheet, i.row, i.field, i.level, i.message]),
    ]);
  };

  return (
    <>
      <PageHeader
        eyebrow={t("imports.eyebrow")}
        title={t("imports.title")}
        description={t("imports.description")}
        actions={
          <>
            <Button
              variant="outline"
              onClick={() => {
                void downloadWorkbook("modele_import_mbay_diaay.xlsx", templateSheets());
                actions.audit("Téléchargement", "Modèle d'import", "Excel");
              }}
            >
              <FileSpreadsheet className="size-4" />
              {t("imports.template.excel")}
            </Button>
            <RowActions
              label={t("imports.template.csv")}
              title={t("imports.template.csvTitle")}
              items={ENTITY_ORDER.map((e) => ({
                label: t("imports.template.entity", { label: SCHEMA[e].label }),
                icon: Download,
                onSelect: () =>
                  downloadCsv(`modele_${e}.csv`, [
                    headers(e),
                    SCHEMA[e].columns.map((c) => c.example),
                  ]),
              }))}
              className="size-10 border"
            />
          </>
        }
      />

      <ol
        className="mb-5 flex flex-wrap items-center gap-2 text-sm"
        aria-label={t("imports.steps.label")}
      >
        {STEPS.map((k, i) => {
          const idx = STEPS.indexOf(step);
          return (
            <li key={k} className="flex items-center gap-2">
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full text-xs font-semibold",
                  i < idx
                    ? "bg-primary text-primary-foreground"
                    : i === idx
                      ? "bg-primary-soft text-primary ring-2 ring-primary"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {i + 1}
              </span>
              <span className={cn(i === idx ? "font-semibold" : "text-muted-foreground")}>
                {tEnum("imports.step", k)}
              </span>
              {i < STEPS.length - 1 && <span className="mx-1 h-px w-6 bg-border" />}
            </li>
          );
        })}
      </ol>

      {step === "depot" && (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            void onFile(e.dataTransfer.files[0]);
          }}
          className={cn(
            "surface bg-dots flex cursor-pointer flex-col items-center gap-2 border-dashed p-10 text-center hover:border-primary",
            drag && "border-primary bg-primary-soft",
          )}
        >
          {busy ? (
            <Loader2 className="size-6 animate-spin text-primary" />
          ) : (
            <Upload className="size-6 text-primary" />
          )}
          <span className="font-semibold">
            {busy ? t("imports.drop.reading") : t("imports.drop.prompt")}
          </span>
          <span className="max-w-lg text-sm text-muted-foreground">{t("imports.drop.hint")}</span>
          <input
            ref={input}
            type="file"
            className="sr-only"
            accept=".xlsx,.xls,.csv,.txt"
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
        </label>
      )}

      {step === "colonnes" && loaded && (
        <section className="space-y-4">
          <div className="surface flex flex-wrap items-center gap-3 p-4 text-sm">
            <FileSpreadsheet className="size-5 text-primary" />
            <span className="font-semibold">{loaded.file}</span>
            <span className="font-mono text-xs text-muted-foreground">
              {t("imports.hash", { hash: loaded.hash })}
            </span>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={reset}>
              <RotateCcw className="size-4" />
              {t("imports.changeFile")}
            </Button>
          </div>
          {sameAsImported && (
            <p className="flex items-start gap-2 rounded-md bg-info-bg p-3 text-sm text-info-fg">
              <Info className="mt-0.5 size-4 shrink-0" />
              {t("imports.sameFile", {
                id: sameAsImported.id,
                date: fmtDateTime(sameAsImported.at),
              })}
            </p>
          )}
          {loaded.sheets.map((s, i) => (
            <div key={s.name} className="surface p-4">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-semibold">{t("imports.sheet.title", { name: s.name })}</h2>
                <span className="text-sm text-muted-foreground">
                  {t("imports.rows.autre", { count: s.rows.length, n: nf.format(s.rows.length) })}
                </span>
                <Select
                  value={s.entityChoice}
                  onValueChange={(v) =>
                    setSheet(
                      i,
                      v === IGNORE
                        ? { entityChoice: IGNORE }
                        : {
                            entityChoice: v as EntityKey,
                            entity: v as EntityKey,
                            mapping: autoMap(v as EntityKey, s.headers),
                          },
                    )
                  }
                >
                  <SelectTrigger
                    className="ml-auto h-9 w-56"
                    aria-label={t("imports.sheet.contentAria", { name: s.name })}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={IGNORE}>{t("imports.sheet.ignore")}</SelectItem>
                    {ENTITY_ORDER.map((e) => (
                      <SelectItem key={e} value={e}>
                        {t("imports.sheet.contains", { label: SCHEMA[e].label })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {s.entityChoice !== IGNORE && (
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b text-left text-xs text-muted-foreground">
                      <tr>
                        <th className="py-2 font-semibold">{t("imports.map.expected")}</th>
                        <th className="font-semibold">{t("imports.map.column")}</th>
                        <th className="font-semibold">{t("imports.map.preview")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {SCHEMA[s.entityChoice].columns.map((c) => {
                        const idx = s.mapping[c.key];
                        const miss = c.required && idx === null;
                        return (
                          <tr key={c.key} className={cn(miss && "bg-danger-bg/40")}>
                            <td className="py-2 pr-3">
                              <span className="font-medium">{c.label}</span>
                              {c.required && <span className="text-danger-fg"> *</span>}
                              {c.hint && (
                                <div className="text-xs text-muted-foreground">{c.hint}</div>
                              )}
                            </td>
                            <td className="pr-3">
                              <Select
                                value={idx === null || idx === undefined ? NONE : String(idx)}
                                onValueChange={(v) =>
                                  setSheet(i, {
                                    mapping: {
                                      ...s.mapping,
                                      [c.key]: v === NONE ? null : Number(v),
                                    },
                                  })
                                }
                              >
                                <SelectTrigger
                                  className={cn("h-9 w-56", miss && "border-danger")}
                                  aria-label={t("imports.map.columnFor", { label: c.label })}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value={NONE}>
                                    {t("imports.map.notProvided")}
                                  </SelectItem>
                                  {s.headers.map((h, k) => (
                                    <SelectItem key={k} value={String(k)}>
                                      {h || t("imports.map.columnN", { n: k + 1 })}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="max-w-80 truncate text-xs text-muted-foreground">
                              {idx === null || idx === undefined
                                ? t("imports.map.empty")
                                : s.rows
                                    .slice(0, 3)
                                    .map((r) => r[idx] || "∅")
                                    .join(" · ")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
          {missing.length > 0 && (
            <p className="flex items-start gap-2 rounded-md bg-danger-bg p-3 text-sm text-danger-fg">
              <XCircle className="mt-0.5 size-4 shrink-0" />
              {t("imports.map.missing", { list: missing.join(", ") })}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <Button disabled={!active.length || missing.length > 0} onClick={runDry}>
              <FlaskConical className="size-4" />
              {t("imports.map.runDry")}
            </Button>
            <Button variant="outline" onClick={reset}>
              {t("imports.abandon")}
            </Button>
          </div>
        </section>
      )}

      {step === "rapport" && plan && loaded && (
        <Report
          plan={plan}
          file={loaded.file}
          blocked={sameAsImported?.id}
          onBack={() => setStep("colonnes")}
          onConfirm={confirm}
          onCancel={reset}
          onDownload={() =>
            downloadIssues(
              plan.issues,
              `rapport_import_a_blanc_${loaded.file.replace(/\.[^.]+$/, "")}.csv`,
            )
          }
        />
      )}

      {step === "termine" && done && plan && (
        <section className="surface p-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-6 text-success" />
            <h2 className="text-lg font-semibold">{t("imports.done.title", { id: done.id })}</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("imports.done.summary", {
              producers: nf.format(plan.producers.length),
              plots: nf.format(plan.plots.length),
              orgs: nf.format(plan.orgs.length),
              alerts: nf.format(plan.alerts.length),
              cases: nf.format(plan.cases.length),
            })}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link to="/producteurs" search={{ scoop: undefined, campagne: undefined }}>
                {t("imports.done.directory")}
              </Link>
            </Button>
            {plan.cases.length > 0 && can(session, "quality.review") && (
              <Button asChild variant="outline">
                <Link to="/qualite/doublons" search={{ scoop: undefined }}>
                  {t("imports.done.duplicates")}
                </Link>
              </Button>
            )}
            {plan.orgs.some((o) => !o.type) && can(session, "org.manage") && (
              <Button asChild variant="outline">
                <Link to="/organisations" search={{ scoop: undefined, vue: "a-qualifier" }}>
                  {t("imports.done.qualify")}
                </Link>
              </Button>
            )}
            {plan.unknownCrops.length > 0 && can(session, "config.manage") && (
              <Button asChild variant="outline">
                <Link to="/referentiels" search={{ section: "noms" }}>
                  {t("imports.done.crops.autre", {
                    count: plan.unknownCrops.length,
                    n: nf.format(plan.unknownCrops.length),
                  })}
                </Link>
              </Button>
            )}
            <Button onClick={reset}>
              <Upload className="size-4" />
              {t("imports.done.again")}
            </Button>
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-md bg-warning-bg p-3 text-sm text-warning-fg">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>
              {t("imports.done.demo")}{" "}
              {can(session, "data.backup") ? (
                <>
                  {t("imports.done.backupBefore")}{" "}
                  <Link to="/donnees" className="font-semibold underline">
                    {t("imports.done.backupLink")}
                  </Link>
                  {t("imports.done.backupAfter")}
                </>
              ) : null}
            </span>
          </p>
        </section>
      )}

      <h2 className="mb-3 mt-8 font-semibold">{t("imports.history.title")}</h2>
      <div className="surface overflow-x-auto">
        {batches.length ? (
          <table className="w-full text-sm">
            <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">{t("imports.history.batch")}</th>
                <th className="font-semibold">{t("imports.history.file")}</th>
                <th className="hidden font-semibold lg:table-cell">{t("imports.history.hash")}</th>
                <th className="font-semibold">{t("imports.history.date")}</th>
                <th className="hidden font-semibold lg:table-cell">
                  {t("imports.history.script")}
                </th>
                <th className="font-semibold">{t("imports.history.mode")}</th>
                <th className="text-right font-semibold">{t("imports.history.counts")}</th>
                <th className="w-12 pr-4" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {batches.map((b) => (
                <tr key={b.id + b.at}>
                  <td className="px-4 py-2.5 font-medium">{b.id}</td>
                  <td>{b.file}</td>
                  <td className="hidden font-mono text-xs lg:table-cell">{b.hash}</td>
                  <td className="whitespace-nowrap">{fmtDateTime(b.at)}</td>
                  <td className="hidden text-xs lg:table-cell">{b.script}</td>
                  <td>
                    {b.mode === "réel" ? (
                      <Pill tone="brand">{tEnum("imports.mode", b.mode)}</Pill>
                    ) : (
                      <Pill tone="ochre">{tEnum("imports.mode", b.mode)}</Pill>
                    )}
                  </td>
                  <td className="text-right tabular">
                    {nf.format(b.counts.producers)} · {nf.format(b.counts.plots)} ·{" "}
                    <span className={cn(b.counts.rejects > 0 && "text-danger-fg")}>
                      {nf.format(b.counts.rejects)}
                    </span>
                  </td>
                  <td className="pr-4 text-right">
                    <RowActions
                      title={t("imports.history.rowTitle", { id: b.id })}
                      items={[
                        {
                          label: t("imports.report.download"),
                          icon: Download,
                          hidden: !reports.current.has(b.id),
                          onSelect: () =>
                            downloadIssues(reports.current.get(b.id) ?? [], `rapport_${b.id}.csv`),
                        },
                        {
                          label: t("imports.history.sheetsCsv"),
                          icon: FileSpreadsheet,
                          onSelect: () =>
                            downloadCsv(`feuilles_${b.id}.csv`, [
                              ["Feuille", "Lignes lues", "Lignes rejetées"],
                              ...b.sheets.map((s) => [s.name, s.rows, s.rejects]),
                            ]),
                        },
                        {
                          label: t("imports.history.viewJournal"),
                          icon: Info,
                          to: "/audit",
                          search: { q: b.id },
                          perm: "audit.read",
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState icon={Upload} title={t("imports.history.empty")}>
            {t("imports.history.emptyHint")}
          </EmptyState>
        )}
      </div>
    </>
  );
}

function Report({
  plan,
  file,
  blocked,
  onBack,
  onConfirm,
  onCancel,
  onDownload,
}: {
  plan: ImportPlan;
  file: string;
  blocked: string | undefined;
  onBack: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onDownload: () => void;
}) {
  const { t } = useI18n();
  const [level, setLevel] = useState<"rejet" | "avertissement" | "tous">("rejet");
  const rejects = plan.issues.filter((i) => i.level === "rejet");
  const warnings = plan.issues.filter((i) => i.level === "avertissement");
  const shown = useMemo(
    () => plan.issues.filter((i) => level === "tous" || i.level === level),
    [plan, level],
  );
  const writes = plan.producers.length + plan.plots.length + plan.orgs.length;
  const rejectedRows = plan.sheets.reduce((n, s) => n + s.rejects, 0);
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <FlaskConical className="size-5 text-ochre" />
        <h2 className="font-semibold">{t("imports.report.title", { file })}</h2>
      </div>
      <p className="text-sm text-muted-foreground">{t("imports.report.intro")}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
        <KpiTile label={t("imports.kpi.newOrgs")} value={nf.format(plan.orgs.length)} />
        <KpiTile label={t("imports.kpi.producers")} value={nf.format(plan.producers.length)} />
        <KpiTile label={t("imports.kpi.plots")} value={nf.format(plan.plots.length)} />
        <KpiTile
          label={t("imports.kpi.skipped")}
          value={nf.format(plan.skipped.length)}
          sub={t("imports.kpi.skippedSub")}
        />
        <KpiTile
          label={t("imports.kpi.rejectedRows")}
          value={nf.format(rejectedRows)}
          tone={rejectedRows ? "danger" : "neutral"}
          sub={t("imports.kpi.reasons.autre", {
            count: rejects.length,
            n: nf.format(rejects.length),
          })}
        />
        <KpiTile
          label={t("imports.kpi.warnings")}
          value={nf.format(warnings.length)}
          tone={warnings.length ? "warning" : "neutral"}
          sub={t("imports.kpi.warningsSub")}
        />
        <KpiTile label={t("imports.kpi.alerts")} value={nf.format(plan.alerts.length)} />
        <KpiTile
          label={t("imports.kpi.duplicates")}
          value={nf.format(plan.cases.length)}
          tone={plan.cases.length ? "warning" : "neutral"}
        />
      </div>

      <div className="surface overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-semibold">{t("imports.report.sheet")}</th>
              <th className="font-semibold">{t("imports.report.content")}</th>
              <th className="text-right font-semibold">{t("imports.report.rowsRead")}</th>
              <th className="pr-4 text-right font-semibold">{t("imports.kpi.rejectedRows")}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {plan.sheets.map((s) => (
              <tr key={s.name}>
                <td className="px-4 py-2 font-medium">{s.name}</td>
                <td>{SCHEMA[s.entity].label}</td>
                <td className="text-right tabular">{nf.format(s.rows)}</td>
                <td className="pr-4 text-right tabular">
                  {s.rejects > 0 ? (
                    <span className="text-danger-fg">{nf.format(s.rejects)}</span>
                  ) : (
                    "0"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {plan.issues.length > 0 && (
        <div className="surface">
          <div className="flex flex-wrap items-center gap-2 border-b p-3">
            {(
              [
                ["rejet", t("imports.level.rejects", { count: rejects.length })],
                ["avertissement", t("imports.level.warnings", { count: warnings.length })],
                ["tous", t("imports.level.all")],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setLevel(k)}
                aria-pressed={level === k}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  level === k
                    ? "border-primary bg-primary-soft text-primary"
                    : "bg-card hover:bg-muted",
                )}
              >
                {l}
              </button>
            ))}
            <Button variant="outline" size="sm" className="ml-auto h-8" onClick={onDownload}>
              <Download className="size-4" />
              {t("imports.report.download")}
            </Button>
          </div>
          <div className="max-h-96 overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-semibold">{t("imports.report.sheet")}</th>
                  <th className="font-semibold">{t("imports.report.row")}</th>
                  <th className="font-semibold">{t("imports.report.column")}</th>
                  <th className="pr-4 font-semibold">{t("imports.report.reason")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {shown.slice(0, 500).map((i, k) => (
                  <tr key={k}>
                    <td className="px-4 py-1.5">{i.sheet}</td>
                    <td className="tabular">{i.row}</td>
                    <td>{i.field}</td>
                    <td
                      className={cn(
                        "pr-4",
                        i.level === "rejet" ? "text-danger-fg" : "text-warning-fg",
                      )}
                    >
                      {i.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {shown.length > 500 && (
              <p className="p-3 text-xs text-muted-foreground">{t("imports.report.truncated")}</p>
            )}
            {!shown.length && (
              <p className="p-6 text-center text-sm text-muted-foreground">
                {t("imports.report.nothing")}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button disabled={!writes || !!blocked} onClick={onConfirm}>
          <CheckCircle2 className="size-4" />
          {t("imports.report.confirm.autre", { count: writes, n: nf.format(writes) })}
        </Button>
        <Button variant="outline" onClick={onBack}>
          {t("imports.report.back")}
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          {t("imports.abandon")}
        </Button>
      </div>
      {blocked && (
        <p className="text-sm text-muted-foreground">
          {t("imports.report.blocked", { id: blocked })}
        </p>
      )}
      {!writes && !blocked && (
        <p className="text-sm text-muted-foreground">{t("imports.report.nothingToWrite")}</p>
      )}
    </section>
  );
}

import { MapSkeleton } from "@/components/app/skeletons";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Copy,
  Download,
  Eye,
  Link2,
  Network,
  Pencil,
  ScrollText,
  TriangleAlert,
  ClipboardCheck,
  UserX,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import {
  AlertPill,
  CasePill,
  CorrectionPill,
  Empty,
  EmptyState,
  Field,
  KpiTile,
  PlotPill,
  QualityPill,
} from "@/components/app/ui-bits";
import { RowActions } from "@/components/app/RowActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SectionNav } from "@/components/app/SectionNav";
import { DocumentList } from "@/components/app/DocumentList";
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
import { actions, can, inScope, useStore, useScoops, useCampaigns } from "@/lib/store";
import { useI18n, type MessageKey } from "@/lib/i18n";
import { type CorrectionChange } from "@/lib/mock/data";
import {
  downloadCsv,
  fmtAge,
  fmtDate,
  fmtDateTime,
  maskCni,
  maskPhone,
  nf,
  nf1,
} from "@/lib/format";

const PlotMap = lazy(() => import("@/components/map/PlotMap"));

export const Route = createFileRoute("/producteurs/$id")({
  head: () => ({
    meta: [
      { title: "Fiche producteur · Mbay Diaay" },
      {
        name: "description",
        content:
          "Identité, parcelles, cultures, alertes, demandes de correction et historique d'un producteur.",
      },
      { property: "og:title", content: "Fiche producteur · Mbay Diaay" },
      { property: "og:description", content: "Fiche détaillée d'un producteur." },
    ],
  }),
  component: ProducerRoute,
});

function ProducerRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="producer.read" area={t("producteurs.fiche.area")}>
      <Sheet />
    </AppShell>
  );
}

const showVal = (t: (key: MessageKey) => string, field: string, v: string) =>
  field === "Téléphone"
    ? v
      ? maskPhone(v)
      : t("producteurs.notSet")
    : field === "CNI"
      ? v
        ? maskCni(v)
        : t("producteurs.notSet")
      : v || t("producteurs.notSet");

const STATUS_KEY = {
  recensé: "producteurs.status.recensé",
  membre: "producteurs.status.membre",
} as const satisfies Record<string, MessageKey>;

function Sheet() {
  const allScoops = useScoops();
  const campaigns = useCampaigns();
  const { t } = useI18n();
  const { id } = Route.useParams();
  const session = useStore((s) => s.session);
  const p = useStore((s) => s.producers.find((x) => x.id === id));
  const org = useStore((s) => s.orgs.find((o) => o.id === p?.orgId));
  const plotsAll = useStore((s) => s.plots);
  const plots = useMemo(() => plotsAll.filter((pl) => pl.producerId === id), [plotsAll, id]);
  const correctionsAll = useStore((s) => s.corrections);
  const corrections = useMemo(
    () => correctionsAll.filter((c) => c.producerId === id),
    [correctionsAll, id],
  );
  const alertsAll = useStore((s) => s.alerts);
  const alerts = useMemo(
    () => alertsAll.filter((a) => a.entityId === id || plots.some((pl) => pl.id === a.entityId)),
    [alertsAll, id, plots],
  );
  const casesAll = useStore((s) => s.cases);
  const cases = useMemo(() => casesAll.filter((c) => c.aId === id || c.bId === id), [casesAll, id]);
  const link = useStore((s) => s.links.find((l) => l.producerId === id));
  const linkedUser = useStore((s) => s.users.find((u) => u.id === link?.userId));
  const producers = useStore((s) => s.producers);
  const [showCni, setShowCni] = useState(false);
  const [cniReasonOpen, setCniReasonOpen] = useState(false);
  const [cniReason, setCniReason] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [edit, setEdit] = useState(false);
  const documentsAll = useStore((s) => s.documents);
  // Pièces du producteur (celles du dossier approuvé y sont rattachées) : visibles avec le droit de lecture des pièces.
  const pieces = useMemo(
    () => documentsAll.filter((d) => d.ownerType === "producteur" && d.ownerId === id),
    [documentsAll, id],
  );
  const showPieces = can(session, "document.read");
  const [tab, setTab] = useState("plots");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const ficheTabs = useMemo(
    () =>
      [
        {
          key: "plots",
          label: t("producteurs.fiche.tab.plots"),
          count: plots.length,
          countTone: "neutral" as const,
        },
        { key: "crops", label: t("producteurs.fiche.tab.crops") },
        {
          key: "alerts",
          label: t("producteurs.fiche.tab.alerts"),
          count: alerts.length,
          countTone: "warning" as const,
        },
        {
          key: "corrections",
          label: t("producteurs.fiche.tab.corrections"),
          count: corrections.length,
          countTone: "warning" as const,
        },
        {
          key: "cases",
          label: t("producteurs.fiche.tab.cases"),
          count: cases.length,
          countTone: "warning" as const,
        },
        ...(showPieces
          ? [
              {
                key: "pieces",
                label: t("producteurs.fiche.tab.pieces"),
                count: pieces.length,
                countTone: "neutral" as const,
              },
            ]
          : []),
        { key: "history", label: t("producteurs.fiche.tab.history") },
      ] as const,
    [t, plots.length, alerts.length, corrections.length, cases.length, pieces.length, showPieces],
  );

  if (!p)
    return (
      <EmptyState icon={UserX} title={t("producteurs.fiche.notFound")}>
        {t("producteurs.fiche.notFoundDesc")}
      </EmptyState>
    );
  if (!inScope([p], session).length)
    return (
      <EmptyState icon={UserX} title={t("producteurs.fiche.outOfScope")}>
        {t("producteurs.fiche.outOfScopeDesc")}
      </EmptyState>
    );
  const canCni = can(session, "cni.read");
  const openAlerts = alerts.filter(
    (a) => a.status === "ouvert" || a.status === "en vérification",
  ).length;
  const pending = corrections.filter((c) => c.status === "en attente").length;
  const area = plots.reduce((s, pl) => s + pl.measured, 0);
  const crops = [...new Set(p.crops.map((c) => c.crop))];
  const other = (c: (typeof cases)[number]) =>
    producers.find((x) => x.id === (c.aId === id ? c.bId : c.aId));

  const exportSheet = () => {
    const nominatif = can(session, "producer.export_nominatif");
    downloadCsv(`fiche_${p.code}.csv`, [
      ["Champ", "Valeur"],
      ["Code", p.code],
      ...(nominatif
        ? [
            ["Prénom", p.firstName],
            ["Nom", p.lastName],
          ]
        : []),
      ["Sexe", p.sex],
      ["Âge", p.age ?? ""],
      ["Village", p.village],
      ["SCOOP", allScoops.find((s) => s.id === p.scoopId)?.name ?? ""],
      ["Organisation", org?.name ?? ""],
      ["Statut", p.status],
      ["Qualité", p.quality],
      [
        "Parcelles",
        plots.map((pl) => `${pl.code} (${nf1.format(pl.measured)} ha, ${pl.status})`).join(" | "),
      ],
      [
        "Cultures",
        p.crops.map((c) => `${c.campaign} : ${c.crop} ${nf1.format(c.area)} ha`).join(" | "),
      ],
    ]);
    actions.audit(
      nominatif ? "Export nominatif" : "Export anonymisé",
      `Producteur ${p.code}`,
      "Fiche (CSV)",
    );
    toast.success(t("producteurs.fiche.exported"), {
      description: t("producteurs.fiche.exportedDesc"),
    });
  };

  return (
    <>
      <Link
        to="/producteurs"
        search={{ scoop: undefined, campagne: undefined }}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> {t("producteurs.fiche.back")}
      </Link>
      {p.mergedInto && (
        <div className="mb-4 rounded-md bg-info-bg p-3 text-sm text-info-fg">
          {t("producteurs.fiche.merged")}{" "}
          <Link
            to="/producteurs/$id"
            params={{ id: p.mergedInto }}
            className="font-semibold underline"
          >
            {t("producteurs.fiche.seeMain")}
          </Link>
        </div>
      )}
      <div className="surface flex flex-col gap-4 p-4 sm:p-6 md:flex-row md:items-center">
        <div className="grid size-16 shrink-0 place-items-center rounded-full bg-primary-soft text-xl font-semibold text-primary">
          {p.firstName[0]}
          {p.lastName[0]}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold sm:text-2xl">
              {p.firstName} {p.lastName}
            </h1>
            <QualityPill q={p.quality} />
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold capitalize text-muted-foreground">
              {p.status}
            </span>
          </div>
          <div className="text-muted-foreground">
            {p.code} · {p.village} · {allScoops.find((s) => s.id === p.scoopId)?.name} · {org?.name}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex-1 md:flex-none" onClick={() => setEdit(true)}>
            <Pencil className="size-4" /> {t("producteurs.fiche.requestEdit")}
          </Button>
          <RowActions
            title={`${p.firstName} ${p.lastName}`}
            items={[
              {
                label: t("producteurs.fiche.action.org"),
                icon: Network,
                to: "/organisations/$id",
                params: { id: p.orgId },
              },
              {
                label: t("producteurs.fiche.action.copy"),
                icon: Copy,
                onSelect: () => {
                  void navigator.clipboard?.writeText(p.code);
                  toast.success(t("producteurs.fiche.codeCopied", { code: p.code }));
                },
              },
              {
                label: t("producteurs.fiche.action.export"),
                icon: Download,
                onSelect: exportSheet,
              },
              {
                label: t("producteurs.fiche.action.journal"),
                icon: ScrollText,
                to: "/audit",
                search: { q: p.code },
                perm: "audit.read",
              },
            ]}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        <KpiTile
          label={t("producteurs.fiche.kpi.plots")}
          value={nf.format(plots.length)}
          sub={t("producteurs.fiche.kpi.plotsSub", {
            n: nf.format(plots.filter((pl) => pl.status !== "validée").length),
          })}
          tone={plots.some((pl) => pl.status !== "validée") ? "warning" : "neutral"}
        />
        <KpiTile
          label={t("producteurs.fiche.kpi.area")}
          value={t("producteurs.ha", { value: nf1.format(area) })}
          sub={t("producteurs.fiche.kpi.areaSub", {
            value: nf1.format(plots.reduce((s, pl) => s + pl.declared, 0)),
          })}
        />
        <KpiTile
          label={t("producteurs.fiche.kpi.crops")}
          value={nf.format(crops.length)}
          sub={crops.join(", ") || t("producteurs.notSet")}
        />
        <KpiTile
          label={t("producteurs.fiche.kpi.alerts")}
          value={nf.format(openAlerts)}
          sub={t("producteurs.fiche.kpi.total", { n: nf.format(alerts.length) })}
          tone={openAlerts ? "danger" : "neutral"}
        />
        <KpiTile
          label={t("producteurs.fiche.kpi.corrections")}
          value={nf.format(pending)}
          sub={t("producteurs.fiche.kpi.total", { n: nf.format(corrections.length) })}
          tone={pending ? "warning" : "neutral"}
        />
      </div>

      <nav
        className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
        aria-label={t("producteurs.fiche.gateways")}
      >
        <Link
          to="/organisations/$id"
          params={{ id: p.orgId }}
          className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline pointer-coarse:py-1"
        >
          <Network className="size-3.5 shrink-0" /> {t("producteurs.fiche.gateway.org")}
        </Link>
        <Link
          to="/qualite/alertes"
          search={{ scoop: undefined, campagne: undefined }}
          className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline pointer-coarse:py-1"
        >
          <TriangleAlert className="size-3.5 shrink-0" />{" "}
          {t("producteurs.fiche.gateway.alerts", { n: alerts.length })}
        </Link>
        {can(session, "correction.manage") && (
          <Link
            to="/qualite/corrections"
            className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline pointer-coarse:py-1"
          >
            <ClipboardCheck className="size-3.5 shrink-0" /> {t("producteurs.fiche.gateway.queue")}
          </Link>
        )}
      </nav>

      <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <section className="min-w-0 surface p-4 sm:p-5">
          <h2 className="mb-4 font-semibold">{t("producteurs.fiche.identity")}</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Field label={t("producteurs.fiche.sex")}>
              {t(p.sex === "F" ? "producteurs.sex.F" : "producteurs.sex.H")}
            </Field>
            <Field label={t("producteurs.fiche.age")}>{fmtAge(p.age)}</Field>
            <Field label={t("producteurs.fiche.handicap")}>
              {t(p.handicap ? "producteurs.fiche.yes" : "producteurs.fiche.no")}
            </Field>
            <Field label={t("producteurs.fiche.createdAt")}>{fmtDate(p.createdAt)}</Field>
            <Field label={t("producteurs.fiche.cni")}>
              <span className="tabular">
                {showCni ? p.cni || t("producteurs.notSet") : maskCni(p.cni)}
              </span>
              {canCni && p.cni && !showCni && (
                <button
                  className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-primary"
                  onClick={() => {
                    setCniReason("");
                    setCniReasonOpen(true);
                  }}
                >
                  <Eye className="size-3" />
                  {t("producteurs.fiche.reveal")}
                </button>
              )}
            </Field>
            <Field label={t("producteurs.fiche.phone")}>
              <span className="tabular">
                {showPhone ? p.phone || t("producteurs.notSet") : maskPhone(p.phone)}
              </span>
              {p.phone && !showPhone && can(session, "producer.edit") && (
                <button
                  className="ml-2 text-xs font-semibold text-primary"
                  onClick={() => {
                    setShowPhone(true);
                    actions.audit("Révélation téléphone", `Producteur ${p.code}`, "");
                  }}
                >
                  {t("producteurs.fiche.reveal")}
                </button>
              )}
            </Field>
            <Field label={t("producteurs.fiche.organisation")}>
              {org ? (
                <Link
                  to="/organisations/$id"
                  params={{ id: org.id }}
                  className="text-primary hover:underline"
                >
                  {org.name}
                </Link>
              ) : (
                t("producteurs.notSet")
              )}
            </Field>
            <Field label={t("producteurs.fiche.status")}>
              <span className="capitalize">{t(STATUS_KEY[p.status])}</span>
            </Field>
            <Field label={t("producteurs.fiche.enumerator")}>{p.enumerator}</Field>
          </dl>
          <div className="mt-5 border-t pt-4">
            <div className="eyebrow mb-2">{t("producteurs.fiche.linkedAccount")}</div>
            {linkedUser ? (
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-2">
                  <Link2 className="size-4 text-primary" />
                  <span className="font-medium">{linkedUser.name}</span>
                </span>
                {can(session, "account.manage") && (
                  <Link
                    to="/comptes"
                    search={{ vue: "liees" }}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    {t("producteurs.fiche.manage")}
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
                <span>{t("producteurs.fiche.noAccount")}</span>
                {can(session, "account.manage") && (
                  <Link
                    to="/comptes"
                    search={{ vue: "a-rapprocher" }}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    {t("producteurs.fiche.reconcile")}
                  </Link>
                )}
              </div>
            )}
          </div>
          {plots.length > 0 && can(session, "map.read") && (
            <div className="mt-5 border-t pt-4">
              <div className="eyebrow mb-2">{t("producteurs.fiche.plotsMap")}</div>
              <div className="h-56 overflow-hidden rounded-md border">
                {mounted && (
                  <Suspense fallback={<MapSkeleton />}>
                    <PlotMap
                      plots={plots}
                      selectedId={plots[0]!.id}
                      onSelect={() => undefined}
                      basemap="sat"
                    />
                  </Suspense>
                )}
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {t("producteurs.fiche.plotsMapHint")}
              </p>
            </div>
          )}
        </section>

        <section className="min-w-0 surface p-4 sm:p-5">
          <Tabs value={tab} onValueChange={setTab} className="flex min-w-0 flex-col">
            <SectionNav
              items={[...ficheTabs]}
              active={tab}
              onSelect={setTab}
              className="mb-0 max-w-full"
            />
            <TabsContent value="plots" className="mt-4 min-w-0">
              {plots.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-xs text-muted-foreground">
                      <tr>
                        <th className="py-2">{t("producteurs.fiche.plots.plot")}</th>
                        <th>{t("producteurs.fiche.plots.crop")}</th>
                        <th className="text-right">{t("producteurs.fiche.plots.measured")}</th>
                        <th className="hidden text-right sm:table-cell">
                          {t("producteurs.fiche.plots.kobo")}
                        </th>
                        <th className="pl-4">{t("producteurs.fiche.plots.status")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {plots.map((pl) => (
                        <tr key={pl.id}>
                          <td className="py-2.5">
                            <span className="font-medium whitespace-nowrap">{pl.code}</span>
                          </td>
                          <td>{pl.crop}</td>
                          <td className="text-right tabular">
                            {t("producteurs.ha", { value: nf1.format(pl.measured) })}
                          </td>
                          <td className="hidden text-right tabular sm:table-cell">
                            {t("producteurs.ha", { value: nf1.format(pl.declared) })}
                          </td>
                          <td className="pl-4">
                            <PlotPill s={pl.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Empty>{t("producteurs.fiche.plots.empty")}</Empty>
              )}
            </TabsContent>
            <TabsContent value="crops" className="mt-4 space-y-4">
              {campaigns
                .map((camp) => camp.name)
                .map((c) => (
                  <div key={c}>
                    <div className="eyebrow mb-2">{c}</div>
                    <div className="flex flex-wrap gap-2">
                      {p.crops
                        .filter((x) => x.campaign === c)
                        .map((x, i) => (
                          <span key={i} className="rounded-md border px-3 py-1.5 text-sm">
                            {x.crop} ·{" "}
                            <span className="tabular">
                              {t("producteurs.ha", { value: nf1.format(x.area) })}
                            </span>
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
            </TabsContent>
            <TabsContent value="alerts" className="mt-4">
              {alerts.length ? (
                <ul className="divide-y text-sm">
                  {alerts.map((a) => (
                    <li key={a.id} className="flex items-start justify-between gap-3 py-2.5">
                      <span>
                        <span className="font-medium">{a.type}</span> :{" "}
                        <span className="text-muted-foreground">{a.detail}</span>
                      </span>
                      <AlertPill s={a.status} />
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty>{t("producteurs.fiche.alerts.empty")}</Empty>
              )}
            </TabsContent>
            <TabsContent value="corrections" className="mt-4">
              {corrections.length ? (
                <ul className="divide-y text-sm">
                  {corrections.map((c) => (
                    <li key={c.id} className="py-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-muted-foreground">
                          {t("producteurs.fiche.corrections.requestBy", {
                            name: c.requester,
                            date: fmtDateTime(c.requestedAt),
                          })}
                        </span>
                        <CorrectionPill s={c.status} />
                      </div>
                      <div className="mt-1.5 space-y-1">
                        {c.changes.map((ch, i) => (
                          <div key={i}>
                            <span className="font-medium">{ch.field}</span> :{" "}
                            <span className="text-muted-foreground line-through">
                              {showVal(t, ch.field, ch.from)}
                            </span>{" "}
                            → {showVal(t, ch.field, ch.to)}
                          </div>
                        ))}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {t("producteurs.fiche.corrections.motif", { motif: c.motif })}
                      </div>
                      {c.decisionComment && c.status !== "en attente" && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          {t("producteurs.fiche.corrections.decision", {
                            by: c.decidedBy ?? "",
                            comment: c.decisionComment,
                          })}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty>{t("producteurs.fiche.corrections.empty")}</Empty>
              )}
            </TabsContent>
            <TabsContent value="cases" className="mt-4">
              {cases.length ? (
                <ul className="divide-y text-sm">
                  {cases.map((c) => {
                    const o = other(c);
                    return (
                      <li
                        key={c.id}
                        className="flex flex-wrap items-center justify-between gap-2 py-2.5"
                      >
                        <span>
                          {t("producteurs.fiche.cases.with", { id: c.id.toUpperCase() })}{" "}
                          {o ? (
                            <Link
                              to="/producteurs/$id"
                              params={{ id: o.id }}
                              className="font-medium text-primary hover:underline"
                            >
                              {o.firstName} {o.lastName} ({o.code})
                            </Link>
                          ) : (
                            t("producteurs.notSet")
                          )}
                          <span className="ml-2 text-xs text-muted-foreground">
                            {t("producteurs.fiche.cases.score", { score: c.score })}
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <CasePill s={c.status} />
                          {can(session, "quality.review") && (
                            <Link
                              to="/qualite/doublons"
                              search={{ scoop: undefined }}
                              className="text-xs font-semibold text-primary hover:underline"
                            >
                              {t("producteurs.fiche.cases.review")}
                            </Link>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <Empty>{t("producteurs.fiche.cases.empty")}</Empty>
              )}
            </TabsContent>
            {showPieces && (
              <TabsContent value="pieces" className="mt-4">
                {pieces.length ? (
                  <DocumentList docs={pieces} />
                ) : (
                  <Empty>{t("producteurs.fiche.pieces.empty")}</Empty>
                )}
              </TabsContent>
            )}
            <TabsContent value="history" className="mt-4">
              {p.history.length ? (
                <ul className="divide-y text-sm">
                  {p.history.map((h, i) => (
                    <li key={i} className="py-2.5">
                      <span className="font-medium">{h.field}</span> :{" "}
                      <span className="text-muted-foreground line-through">
                        {h.from || t("producteurs.notSet")}
                      </span>{" "}
                      → {h.to}
                      <div className="text-xs text-muted-foreground">
                        {h.by} · {fmtDateTime(h.at)}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty>{t("producteurs.fiche.history.empty")}</Empty>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </div>
      <FormDialog
        open={cniReasonOpen}
        onOpenChange={(o) => {
          if (!o) {
            setCniReasonOpen(false);
            setCniReason("");
          }
        }}
        title={t("producteurs.fiche.cni.dialog.title")}
        description={t("producteurs.fiche.cni.dialog.description")}
        submitLabel={t("producteurs.fiche.cni.dialog.submit")}
        submitDisabled={cniReason.trim().length < 3}
        onSubmit={() => {
          actions.revealCni(p, cniReason.trim());
          setShowCni(true);
          setCniReasonOpen(false);
          setCniReason("");
          toast(t("producteurs.fiche.revealed"));
        }}
      >
        <FormField label={t("producteurs.fiche.cni.dialog.reason")} required>
          {(c) => (
            <Textarea
              {...c}
              value={cniReason}
              onChange={(e) => setCniReason(e.target.value)}
              placeholder={t("producteurs.fiche.cni.dialog.reasonPlaceholder")}
            />
          )}
        </FormField>
      </FormDialog>
      {edit && <CorrectionDialog id={p.id} onClose={() => setEdit(false)} />}
    </>
  );
}

function CorrectionDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const { t } = useI18n();
  const p = useStore((s) => s.producers.find((x) => x.id === id))!;
  const [firstName, setFirstName] = useState(p.firstName);
  const [lastName, setLastName] = useState(p.lastName);
  const [phone, setPhone] = useState(p.phone);
  const [age, setAge] = useState(p.age === null ? "" : String(p.age));
  const [status, setStatus] = useState(p.status);
  const [motif, setMotif] = useState("");
  const phoneErr =
    phone && !/^7[0678]\s?\d{3}\s?\d{2}\s?\d{2}$/.test(phone.trim())
      ? t("producteurs.correction.phoneError")
      : "";
  const ageN = age.trim() === "" ? null : Number(age);
  const ageErr =
    ageN !== null && (!Number.isInteger(ageN) || ageN < 15 || ageN > 100)
      ? t("producteurs.correction.ageError")
      : "";

  const changes = useMemo(() => {
    const out: CorrectionChange[] = [];
    if (firstName !== p.firstName) out.push({ field: "Prénom", from: p.firstName, to: firstName });
    if (lastName !== p.lastName) out.push({ field: "Nom", from: p.lastName, to: lastName });
    if (phone.trim() !== p.phone) out.push({ field: "Téléphone", from: p.phone, to: phone.trim() });
    if (ageN !== null && ageN !== p.age)
      out.push({ field: "Âge", from: p.age === null ? "" : String(p.age), to: String(ageN) });
    if (status !== p.status) out.push({ field: "Statut d'adhésion", from: p.status, to: status });
    return out;
  }, [p, firstName, lastName, phone, ageN, status]);

  const submit = () => {
    if (!changes.length || motif.trim().length < 10) return;
    actions.submitCorrection(p.id, changes, motif.trim());
    toast.success(t("producteurs.correction.sent"), {
      description: t("producteurs.correction.sentDesc"),
    });
    onClose();
  };

  return (
    <FormDialog
      open
      onOpenChange={(o) => !o && onClose()}
      size="md"
      title={t("producteurs.correction.title", { name: `${p.firstName} ${p.lastName}` })}
      description={t("producteurs.correction.description")}
      submitLabel={t("producteurs.correction.submit")}
      onSubmit={submit}
      submitDisabled={!changes.length || motif.trim().length < 10 || !!phoneErr || !!ageErr}
    >
      <div className="grid grid-cols-2 gap-3">
        <FormField label={t("producteurs.correction.firstName")}>
          {(c) => <Input {...c} value={firstName} onChange={(e) => setFirstName(e.target.value)} />}
        </FormField>
        <FormField label={t("producteurs.correction.lastName")}>
          {(c) => <Input {...c} value={lastName} onChange={(e) => setLastName(e.target.value)} />}
        </FormField>
      </div>
      <FormField label={t("producteurs.correction.phone")} error={phoneErr || undefined}>
        {(c) => (
          <Input
            {...c}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            placeholder="77 123 45 67"
          />
        )}
      </FormField>
      <FormField label={t("producteurs.correction.age")} error={ageErr || undefined}>
        {(c) => (
          <Input {...c} value={age} onChange={(e) => setAge(e.target.value)} inputMode="numeric" />
        )}
      </FormField>
      <FormField label={t("producteurs.correction.status")}>
        {(c) => (
          <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
            <SelectTrigger id={c.id}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recensé">{t("producteurs.status.recensé")}</SelectItem>
              <SelectItem value="membre">{t("producteurs.status.membre")}</SelectItem>
            </SelectContent>
          </Select>
        )}
      </FormField>
      {changes.length > 0 && (
        <div className="rounded-md border p-3 text-sm">
          <div className="mb-2 font-semibold">
            {t("producteurs.correction.beforeAfter", { n: changes.length })}
          </div>
          {changes.map((c, i) => (
            <div key={i}>
              <span className="font-medium">{c.field}</span> :{" "}
              <span className="text-muted-foreground line-through">
                {showVal(t, c.field, c.from)}
              </span>{" "}
              → {showVal(t, c.field, c.to)}
            </div>
          ))}
        </div>
      )}
      <FormField label={t("producteurs.correction.motif")} required>
        {(c) => (
          <Textarea
            {...c}
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            placeholder={t("producteurs.correction.motifPlaceholder")}
          />
        )}
      </FormField>
    </FormDialog>
  );
}

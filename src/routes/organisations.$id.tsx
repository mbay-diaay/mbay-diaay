import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Map as MapIcon,
  Network,
  ScrollText,
  Search,
  Tag,
  TriangleAlert,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import {
  AlertPill,
  EmptyState,
  KpiTile,
  Pill,
  PlotPill,
  QualityPill,
} from "@/components/app/ui-bits";
import { RowActions } from "@/components/app/RowActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { actions, can, inScope, useStore, useScoops } from "@/lib/store";
import { ORG_TYPES, type OrgType } from "@/lib/mock/data";
import { ageAtMost, ageBand, downloadCsv, fmtAge, nf, nf1 } from "@/lib/format";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/organisations/$id")({
  head: () => ({
    meta: [
      { title: "Fiche organisation · Mbay Diaay" },
      {
        name: "description",
        content: "Membres, parcelles, alertes et qualification d'une organisation de base.",
      },
      { property: "og:title", content: "Fiche organisation · Mbay Diaay" },
      { property: "og:description", content: "Fiche détaillée d'une organisation." },
    ],
  }),
  component: OrgSheetRoute,
});

function OrgSheetRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="producer.read" area={t("organisations.detail.area")}>
      <OrgSheet />
    </AppShell>
  );
}

function OrgSheet() {
  const allScoops = useScoops();
  const { t, tEnum } = useI18n();
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const session = useStore((s) => s.session);
  const org = useStore((s) => s.orgs.find((o) => o.id === id));
  const all = useStore((s) => s.producers);
  const plotsAll = useStore((s) => s.plots);
  const alertsAll = useStore((s) => s.alerts);
  const youth = useStore((s) => s.youthMaxAge);
  const [q, setQ] = useState("");
  const [qualify, setQualify] = useState(false);

  const members = useMemo(() => all.filter((p) => p.orgId === id && !p.mergedInto), [all, id]);
  const plots = useMemo(() => {
    const ids = new Set(members.map((p) => p.id));
    return plotsAll.filter((pl) => ids.has(pl.producerId));
  }, [plotsAll, members]);
  const alerts = useMemo(() => {
    const ids = new Set([...members.map((p) => p.id), ...plots.map((p) => p.id)]);
    return alertsAll.filter(
      (a) => ids.has(a.entityId) && (a.status === "ouvert" || a.status === "en vérification"),
    );
  }, [alertsAll, members, plots]);

  if (!org)
    return (
      <EmptyState icon={Network} title={t("organisations.detail.notFound")}>
        {t("organisations.detail.notFoundHint")}
      </EmptyState>
    );
  if (!inScope([org], session).length)
    return (
      <EmptyState icon={Network} title={t("organisations.detail.outOfScope")}>
        {t("organisations.detail.outOfScopeHint")}
      </EmptyState>
    );

  const scoop = allScoops.find((s) => s.id === org.scoopId);
  const byId = new Map(members.map((p) => [p.id, p]));
  const women = members.filter((p) => p.sex === "F").length;
  const area = plots.reduce((s, p) => s + p.measured, 0);
  const toVerify = members.filter((p) => p.quality !== "validé").length;
  const needle = q.trim().toLowerCase();
  const shown = members.filter(
    (p) =>
      !needle ||
      `${p.firstName} ${p.lastName} ${p.code} ${p.village}`.toLowerCase().includes(needle),
  );
  const plotCount = (pid: string) => plots.filter((pl) => pl.producerId === pid).length;
  const nominatif = can(session, "producer.export_nominatif");

  const exportMembers = () => {
    const head = nominatif
      ? ["Code", "Prénom", "Nom", "Sexe", "Âge", "Village", "Statut", "Qualité", "Parcelles"]
      : ["Code", "Sexe", "Tranche d'âge", "Village", "Statut", "Qualité", "Parcelles"];
    downloadCsv(`membres_${org.name.replace(/\W+/g, "_")}.csv`, [
      head,
      ...members.map((p) =>
        nominatif
          ? [
              p.code,
              p.firstName,
              p.lastName,
              p.sex,
              p.age ?? "",
              p.village,
              p.status,
              p.quality,
              plotCount(p.id),
            ]
          : [p.code, p.sex, ageBand(p.age), p.village, p.status, p.quality, plotCount(p.id)],
      ),
    ]);
    actions.audit(
      nominatif ? "Export nominatif" : "Export anonymisé",
      `Organisation ${org.name}`,
      `${members.length} membres (CSV)`,
    );
    toast.success(t("organisations.exported"), {
      description: t("organisations.detail.exportedHint"),
    });
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {can(session, "org.manage") ? (
          <Link
            to="/organisations"
            search={{ scoop: undefined, vue: undefined }}
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {t("organisations.title")}
          </Link>
        ) : (
          <span>{t("organisations.title")}</span>
        )}
        <ChevronRight className="size-3.5" />
        <span>{t("organisations.uscn")}</span>
        <ChevronRight className="size-3.5" />
        <span>{scoop?.name}</span>
      </div>

      <div className="surface flex flex-col gap-4 p-6 md:flex-row md:items-center">
        <div className="grid size-14 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
          <Network className="size-7" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold">{org.name}</h1>
            {org.type ? (
              <Pill tone="brand">{tEnum("organisations.type", org.type)}</Pill>
            ) : (
              <Pill tone="warning">{t("organisations.toQualify")}</Pill>
            )}
          </div>
          <div className="text-muted-foreground">
            {org.village} · {scoop?.name}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {can(session, "org.manage") && (
            <Button variant={org.type ? "outline" : "default"} onClick={() => setQualify(true)}>
              <Tag className="size-4" />
              {org.type ? t("organisations.detail.changeType") : t("organisations.detail.qualify")}
            </Button>
          )}
          <RowActions
            title={org.name}
            items={[
              {
                label: t("organisations.detail.exportMembers"),
                icon: Download,
                onSelect: exportMembers,
              },
              {
                label: t("organisations.detail.viewJournal"),
                icon: ScrollText,
                to: "/audit",
                search: { q: org.name },
                perm: "audit.read",
              },
            ]}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <KpiTile label={t("organisations.col.producers")} value={nf.format(members.length)} />
        <KpiTile
          label={t("organisations.detail.women")}
          value={`${members.length ? nf1.format((women / members.length) * 100) : 0} %`}
          sub={t("organisations.detail.womenSub", { n: nf.format(women) })}
        />
        <KpiTile
          label={t("organisations.detail.youth", { age: youth })}
          value={nf.format(members.filter((p) => ageAtMost(p.age, youth)).length)}
        />
        <KpiTile
          label={t("organisations.col.plots")}
          value={nf.format(plots.length)}
          sub={t("organisations.detail.plotsUnvalidated", {
            n: nf.format(plots.filter((p) => p.status !== "validée").length),
          })}
          tone={plots.some((p) => p.status !== "validée") ? "warning" : "neutral"}
        />
        <KpiTile label={t("organisations.detail.measuredArea")} value={`${nf1.format(area)} ha`} />
        <KpiTile
          label={t("organisations.col.toVerify")}
          value={nf.format(toVerify)}
          sub={t("organisations.detail.openAlerts.autre", {
            count: alerts.length,
            n: nf.format(alerts.length),
          })}
          tone={toVerify ? "warning" : "neutral"}
        />
      </div>

      <section className="surface mt-6 p-5">
        <Tabs defaultValue="members">
          <TabsList className="max-w-full overflow-x-auto">
            <TabsTrigger value="members">
              <Users className="size-4" />
              {t("organisations.detail.tab.members", { count: members.length })}
            </TabsTrigger>
            <TabsTrigger value="plots">
              <MapIcon className="size-4" />
              {t("organisations.detail.tab.plots", { count: plots.length })}
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <TriangleAlert className="size-4" />
              {t("organisations.detail.tab.alerts", { count: alerts.length })}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="mt-4">
            <div className="relative mb-3 max-w-xs">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-8"
                aria-label={t("organisations.detail.search")}
                placeholder={t("organisations.detail.search")}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            {shown.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b text-left text-xs text-muted-foreground">
                    <tr>
                      <th className="py-2 font-semibold">
                        {t("organisations.detail.col.producer")}
                      </th>
                      <th className="font-semibold">{t("organisations.detail.col.sexAge")}</th>
                      <th className="hidden font-semibold sm:table-cell">
                        {t("organisations.detail.col.village")}
                      </th>
                      <th className="font-semibold">{t("organisations.detail.col.status")}</th>
                      <th className="text-right font-semibold">{t("organisations.col.plots")}</th>
                      <th className="pl-4 font-semibold">
                        {t("organisations.detail.col.quality")}
                      </th>
                      <th className="w-10" />
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {shown.map((p) => (
                      <tr
                        key={p.id}
                        onClick={() => navigate({ to: "/producteurs/$id", params: { id: p.id } })}
                        className="cursor-pointer hover:bg-muted/60"
                      >
                        <td className="py-2.5">
                          <Link
                            to="/producteurs/$id"
                            params={{ id: p.id }}
                            onClick={(e) => e.stopPropagation()}
                            className="font-semibold hover:text-primary hover:underline"
                          >
                            {p.firstName} {p.lastName}
                          </Link>
                          <div className="text-xs text-muted-foreground">{p.code}</div>
                        </td>
                        <td className="tabular">
                          {p.sex} · {fmtAge(p.age)}
                        </td>
                        <td className="hidden sm:table-cell">{p.village}</td>
                        <td className="capitalize">{p.status}</td>
                        <td className="text-right tabular">{plotCount(p.id)}</td>
                        <td className="pl-4">
                          <QualityPill q={p.quality} />
                        </td>
                        <td className="text-right">
                          <RowActions
                            title={`${p.firstName} ${p.lastName}`}
                            items={[
                              {
                                label: t("organisations.action.open"),
                                icon: ExternalLink,
                                to: "/producteurs/$id",
                                params: { id: p.id },
                              },
                              {
                                label: t("organisations.action.map"),
                                icon: MapIcon,
                                to: "/carte",
                                search: { plot: plots.find((pl) => pl.producerId === p.id)?.id },
                                perm: "map.read",
                                hidden: !plotCount(p.id),
                              },
                            ]}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title={
                  members.length
                    ? t("organisations.detail.noMatch")
                    : t("organisations.detail.noMembers")
                }
              >
                {members.length
                  ? t("organisations.detail.noMatchHint")
                  : t("organisations.detail.noMembersHint")}
              </EmptyState>
            )}
          </TabsContent>

          <TabsContent value="plots" className="mt-4">
            {plots.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b text-left text-xs text-muted-foreground">
                    <tr>
                      <th className="py-2 font-semibold">{t("organisations.detail.col.plot")}</th>
                      <th className="font-semibold">{t("organisations.detail.col.producer")}</th>
                      <th className="font-semibold">{t("organisations.detail.col.crop")}</th>
                      <th className="hidden font-semibold sm:table-cell">
                        {t("organisations.detail.col.campaign")}
                      </th>
                      <th className="text-right font-semibold">
                        {t("organisations.detail.col.measured")}
                      </th>
                      <th className="pl-4 font-semibold">{t("organisations.detail.col.status")}</th>
                      <th className="w-10" />
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {plots.map((pl) => {
                      const owner = byId.get(pl.producerId);
                      return (
                        <tr key={pl.id} className="hover:bg-muted/60">
                          <td className="py-2.5">
                            <span className="font-semibold">{pl.code}</span>
                          </td>
                          <td>
                            {owner && (
                              <Link
                                to="/producteurs/$id"
                                params={{ id: owner.id }}
                                className="hover:text-primary hover:underline"
                              >
                                {owner.firstName} {owner.lastName}
                              </Link>
                            )}
                          </td>
                          <td>{pl.crop}</td>
                          <td className="hidden sm:table-cell">{pl.campaign}</td>
                          <td className="text-right tabular">{nf1.format(pl.measured)} ha</td>
                          <td className="pl-4">
                            <PlotPill s={pl.status} />
                          </td>
                          <td className="text-right" />
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState icon={MapIcon} title={t("organisations.detail.noPlots")}>
                {t("organisations.detail.noPlotsHint")}
              </EmptyState>
            )}
          </TabsContent>

          <TabsContent value="alerts" className="mt-4">
            {alerts.length ? (
              <ul className="divide-y text-sm">
                {alerts.map((a) => {
                  const p = a.entity === "producteur" ? byId.get(a.entityId) : undefined;
                  const pl =
                    a.entity === "parcelle" ? plots.find((x) => x.id === a.entityId) : undefined;
                  return (
                    <li
                      key={a.id}
                      className="flex flex-wrap items-center justify-between gap-2 py-2.5"
                    >
                      <span>
                        <span className="font-medium">{a.type}</span> :{" "}
                        <span className="text-muted-foreground">{a.detail}</span>
                        <span className="ml-2 text-xs">
                          {p && (
                            <Link
                              to="/producteurs/$id"
                              params={{ id: p.id }}
                              className="font-semibold text-primary hover:underline"
                            >
                              {p.code}
                            </Link>
                          )}
                          {pl && <span className="font-semibold">{pl.code}</span>}
                        </span>
                      </span>
                      <AlertPill s={a.status} />
                    </li>
                  );
                })}
              </ul>
            ) : (
              <EmptyState icon={TriangleAlert} title={t("organisations.detail.noAlerts")}>
                {t("organisations.detail.noAlertsHint")}
              </EmptyState>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {qualify && (
        <QualifyDialog orgId={org.id} current={org.type} onClose={() => setQualify(false)} />
      )}
    </>
  );
}

function QualifyDialog({
  orgId,
  current,
  onClose,
}: {
  orgId: string;
  current: OrgType | null;
  onClose: () => void;
}) {
  const { t, tEnum } = useI18n();
  const [type, setType] = useState<OrgType | "">(current ?? "");
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {current ? t("organisations.detail.changeType") : t("organisations.detail.qualifyOrg")}
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{t("organisations.detail.dialogHint")}</p>
        <Select value={type} onValueChange={(v) => setType(v as OrgType)}>
          <SelectTrigger>
            <SelectValue placeholder={t("organisations.detail.chooseType")} />
          </SelectTrigger>
          <SelectContent>
            {ORG_TYPES.map((ty) => (
              <SelectItem key={ty} value={ty}>
                {tEnum("organisations.type", ty)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            {t("organisations.cancel")}
          </Button>
          <Button
            disabled={!type || type === current}
            onClick={() => {
              actions.qualifyOrgs([orgId], type as OrgType);
              toast.success(
                t("organisations.detail.typeAssigned", { type: tEnum("organisations.type", type) }),
              );
              onClose();
            }}
          >
            {t("organisations.detail.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

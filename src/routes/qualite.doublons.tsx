import { MapSkeleton } from "@/components/app/skeletons";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GitMerge, Undo2, Eye, Phone, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { FormField } from "@/components/app/FormField";
import { CasePill, Pill } from "@/components/app/ui-bits";
import { QualityHeader } from "@/components/app/QualityHeader";
import { FilterPill } from "@/components/app/FilterPill";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { actions, can, inScope, sharedPhoneGroups, useStore, useScoops } from "@/lib/store";
import { type CaseStatus, type Producer } from "@/lib/mock/data";
import { fmtAge, maskCni, maskPhone } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n, type MessageKey } from "@/lib/i18n";

const PlotMap = lazy(() => import("@/components/map/PlotMap"));

export const Route = createFileRoute("/qualite/doublons")({
  validateSearch: (s: Record<string, unknown>) => ({
    scoop: typeof s["scoop"] === "string" ? (s["scoop"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Revue des doublons · Mbay Diaay" },
      {
        name: "description",
        content:
          "Comparer, classer et fusionner de façon réversible les fiches en doublon ; téléphones partagés traités à part.",
      },
      { property: "og:title", content: "Revue des doublons · Mbay Diaay" },
      { property: "og:description", content: "File de revue des doublons candidats." },
    ],
  }),
  component: DuplicatesRoute,
});

function DuplicatesRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="quality.review" area={t("qualite.doublons.area")}>
      <Duplicates />
    </AppShell>
  );
}

/** Vue simplifiée : quatre groupes lisibles plutôt que sept statuts. */
type Group = "a-traiter" | "probables" | "non-resolus" | "classes" | "tous";
const GROUPS: {
  key: Group;
  label: MessageKey;
  hint: MessageKey;
  statuses: CaseStatus[] | null;
}[] = [
  {
    key: "a-traiter",
    label: "qualite.doublons.group.a-traiter",
    hint: "qualite.doublons.group.a-traiter.hint",
    statuses: ["à examiner"],
  },
  {
    key: "probables",
    label: "qualite.doublons.group.probables",
    hint: "qualite.doublons.group.probables.hint",
    statuses: ["probable"],
  },
  {
    key: "non-resolus",
    label: "qualite.doublons.group.non-resolus",
    hint: "qualite.doublons.group.non-resolus.hint",
    statuses: ["non résolu"],
  },
  {
    key: "classes",
    label: "qualite.doublons.group.classes",
    hint: "qualite.doublons.group.classes.hint",
    statuses: ["confirmé", "non-doublon", "erreur de saisie d'identité", "fusionné"],
  },
  {
    key: "tous",
    label: "qualite.doublons.group.tous",
    hint: "qualite.doublons.group.tous.hint",
    statuses: null,
  },
];
const inGroup = (c: { status: CaseStatus }, g: Group) => {
  const def = GROUPS.find((x) => x.key === g)!;
  return !def.statuses || def.statuses.includes(c.status);
};

const STATUSES: CaseStatus[] = [
  "à examiner",
  "probable",
  "confirmé",
  "non-doublon",
  "erreur de saisie d'identité",
  "non résolu",
  "fusionné",
];
const STATUS_LABEL: Record<CaseStatus, MessageKey> = {
  "à examiner": "qualite.doublons.status.à examiner",
  probable: "qualite.doublons.status.probable",
  confirmé: "qualite.doublons.status.confirmé",
  "non-doublon": "qualite.doublons.status.non-doublon",
  "erreur de saisie d'identité": "qualite.doublons.status.erreur de saisie d'identité",
  "non résolu": "qualite.doublons.status.non résolu",
  fusionné: "qualite.doublons.status.fusionné",
};

function Duplicates() {
  const allScoops = useScoops();
  const { t } = useI18n();
  const g = Route.useSearch();
  const session = useStore((s) => s.session);
  const cases = useStore((s) => s.cases);
  const producers = useStore((s) => s.producers);
  const merges = useStore((s) => s.merges);
  const byId = (id: string) => producers.find((p) => p.id === id)!;
  const visible = cases.filter(
    (c) => inScope([byId(c.aId)], session).length && (!g.scoop || byId(c.aId).scoopId === g.scoop),
  );
  const [filter, setFilter] = useState<Group>("a-traiter");
  const list = visible.filter((c) => inGroup(c, filter));
  const [selId, setSelId] = useState<string | null>(list[0]?.id ?? null);
  const sel = visible.find((c) => c.id === selId) ?? list[0];
  const [status, setStatus] = useState<CaseStatus | "">("");
  const [comment, setComment] = useState("");
  const [cni, setCni] = useState(false);
  const [mergeOpen, setMergeOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const canMerge = can(session, "quality.merge");
  useEffect(() => setMounted(true), []);

  const choose = (id: string) => {
    setSelId(id);
    setStatus("");
    setComment("");
    setCni(false);
  };
  const a = sel && byId(sel.aId);
  const b = sel && byId(sel.bId);
  const allPlots = useStore((s) => s.plots);
  const nPlots = (id: string) => allPlots.filter((p) => p.producerId === id).length;
  const casePlots = useMemo(
    () => (sel ? allPlots.filter((p) => p.producerId === sel.aId || p.producerId === sel.bId) : []),
    [allPlots, sel],
  );
  const phoneGroups = useMemo(
    () => sharedPhoneGroups(inScope(producers, session)),
    [producers, session],
  );
  const [view, setView] = useState<"cas" | "telephones">("cas");

  const rows: [string, (p: Producer) => string][] = [
    [t("qualite.doublons.row.name"), (p) => `${p.firstName} ${p.lastName}`],
    [t("qualite.doublons.row.code"), (p) => p.code],
    [t("qualite.doublons.row.sex"), (p) => p.sex],
    [t("qualite.doublons.row.age"), (p) => fmtAge(p.age)],
    [t("qualite.doublons.row.phone"), (p) => maskPhone(p.phone)],
    [
      t("qualite.doublons.row.cni"),
      (p) => (cni ? p.cni || t("qualite.common.notProvided") : maskCni(p.cni)),
    ],
    [t("qualite.doublons.row.village"), (p) => p.village],
    [t("qualite.doublons.row.scoop"), (p) => allScoops.find((s) => s.id === p.scoopId)!.commune],
    [t("qualite.doublons.row.crops"), (p) => p.crops.map((c) => c.crop).join(", ")],
    [t("qualite.doublons.row.enumerator"), (p) => p.enumerator],
  ];

  return (
    <>
      <QualityHeader description={t("qualite.doublons.description")} />
      <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
        <TabsContent value="cas" className="mt-0">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {GROUPS.map((g) => (
              <FilterPill
                key={g.key}
                active={filter === g.key}
                onClick={() => setFilter(g.key)}
                count={visible.filter((c) => inGroup(c, g.key)).length}
                tone={
                  g.key === "a-traiter" ? "warning" : g.key === "classes" ? "success" : "neutral"
                }
              >
                {t(g.label)}
              </FilterPill>
            ))}
            <button
              onClick={() => setView("telephones")}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Phone className="size-3.5" />
              {t("qualite.doublons.sharedPhones")}{" "}
              <span className="tabular">{phoneGroups.length}</span>
            </button>
          </div>
          <p className="-mt-2 mb-4 text-sm text-muted-foreground">
            {t(GROUPS.find((g) => g.key === filter)!.hint)}
          </p>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <ul className="surface max-h-[70vh] divide-y overflow-y-auto">
              {list.map((c) => {
                const pa = byId(c.aId);
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => choose(c.id)}
                      className={cn(
                        "w-full px-4 py-3 text-left hover:bg-muted",
                        sel?.id === c.id && "bg-primary-soft",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">
                          {pa.firstName} {pa.lastName}
                        </span>
                        <span className="text-xs tabular text-muted-foreground">{c.score} %</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{pa.village}</span>
                        <CasePill s={c.status} />
                      </div>
                    </button>
                  </li>
                );
              })}
              {!list.length && (
                <li className="p-6 text-center text-muted-foreground">
                  {t("qualite.doublons.noCase")}
                </li>
              )}
            </ul>

            {sel && a && b ? (
              <div className="space-y-4">
                <section className="surface p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-semibold">
                      {t("qualite.doublons.caseTitle", {
                        id: sel.id.toUpperCase(),
                        score: sel.score,
                      })}
                    </h2>
                    <CasePill s={sel.status} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {sel.signals.map((s) => (
                      <Pill key={s.label} tone={s.primary ? "info" : "neutral"}>
                        {s.label}
                        {!s.primary && ` ${t("qualite.doublons.secondarySignal")}`}
                      </Pill>
                    ))}
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-left text-xs text-muted-foreground">
                        <tr>
                          <th className="w-32 py-2" />
                          <th>
                            {t("qualite.doublons.sheetA")}{" "}
                            <Link
                              to="/producteurs/$id"
                              params={{ id: a.id }}
                              className="font-semibold text-primary hover:underline"
                            >
                              {t("qualite.doublons.openSheet")}
                            </Link>
                          </th>
                          <th>
                            {t("qualite.doublons.sheetB")}{" "}
                            <Link
                              to="/producteurs/$id"
                              params={{ id: b.id }}
                              className="font-semibold text-primary hover:underline"
                            >
                              {t("qualite.doublons.openSheet")}
                            </Link>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {rows.map(([label, fn]) => {
                          const diff = fn(a) !== fn(b);
                          return (
                            <tr key={label}>
                              <td className="py-2 text-xs text-muted-foreground">{label}</td>
                              <td className={cn("py-2 pr-4", diff && "font-semibold")}>{fn(a)}</td>
                              <td className={cn("py-2", diff && "font-semibold text-warning-fg")}>
                                {fn(b)}
                                {diff && <span className="ml-1 text-xs">≠</span>}
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td className="py-2 text-xs text-muted-foreground">
                            {t("qualite.doublons.row.plots")}
                          </td>
                          <td>{nPlots(a.id)}</td>
                          <td>{nPlots(b.id)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {can(session, "cni.read") && !cni && (
                    <button
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary"
                      onClick={() => {
                        setCni(true);
                        actions.audit(
                          "Révélation CNI",
                          `Cas ${sel.id.toUpperCase()}`,
                          "Comparaison doublon",
                        );
                      }}
                    >
                      <Eye className="size-3" />
                      {t("qualite.doublons.showCni")}
                    </button>
                  )}
                  {casePlots.length > 0 && mounted && (
                    <div className="mt-4">
                      <div className="eyebrow mb-1.5">{t("qualite.doublons.bothPlots")}</div>
                      <div className="h-56 overflow-hidden rounded-md border">
                        <Suspense fallback={<MapSkeleton />}>
                          <PlotMap
                            plots={casePlots}
                            selectedId={undefined}
                            onSelect={() => {}}
                            basemap="osm"
                          />
                        </Suspense>
                      </div>
                    </div>
                  )}
                </section>

                {sel.status === "fusionné" ? (
                  <section className="surface flex min-w-0 flex-col gap-3 p-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="font-semibold">{t("qualite.doublons.merged.title")}</div>
                      <p className="text-sm text-muted-foreground">
                        {t("qualite.doublons.merged.body")} {sel.comment}
                      </p>
                    </div>
                    {merges[sel.id] && canMerge && (
                      <Button
                        variant="outline"
                        className="h-auto min-h-9 w-full shrink-0 whitespace-normal sm:w-auto"
                        onClick={() => {
                          actions.undoMerge(sel.id);
                          toast.success(t("qualite.doublons.undone"), {
                            description: t("qualite.doublons.undoneBody"),
                          });
                        }}
                      >
                        <Undo2 className="size-4" />
                        {t("qualite.doublons.undoMerge")}
                      </Button>
                    )}
                  </section>
                ) : (
                  <section className="surface space-y-3 p-5">
                    <h3 className="font-semibold">{t("qualite.doublons.classify.title")}</h3>
                    <Select value={status} onValueChange={(v) => setStatus(v as CaseStatus)}>
                      <SelectTrigger
                        className="max-w-sm"
                        aria-label={t("qualite.doublons.classify.aria")}
                      >
                        <SelectValue placeholder={t("qualite.doublons.classify.placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.filter((s) => s !== "fusionné").map((s) => (
                          <SelectItem key={s} value={s}>
                            {t(STATUS_LABEL[s])}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormField label={t("qualite.common.comment")} required>
                      {(c) => (
                        <Textarea
                          {...c}
                          placeholder={t("qualite.doublons.classify.commentPlaceholder")}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      )}
                    </FormField>
                    <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap">
                      <Button
                        className="h-auto min-h-9 w-full whitespace-normal sm:w-auto"
                        disabled={!status || comment.trim().length < 3}
                        onClick={() => {
                          actions.classifyCase(sel.id, status as CaseStatus, comment.trim());
                          toast.success(t("qualite.doublons.classify.done"));
                          setComment("");
                          setStatus("");
                        }}
                      >
                        {t("qualite.doublons.classify.save")}
                      </Button>
                      {canMerge && (
                        <Button
                          variant="outline"
                          className="h-auto min-h-9 w-full whitespace-normal sm:w-auto"
                          disabled={comment.trim().length < 3}
                          onClick={() => setMergeOpen(true)}
                        >
                          <GitMerge className="size-4" />
                          {t("qualite.doublons.mergeBIntoA")}
                        </Button>
                      )}
                    </div>
                    {!canMerge && (
                      <p className="text-xs text-muted-foreground">
                        {t("qualite.doublons.mergeNeedsPerm")}
                      </p>
                    )}
                  </section>
                )}
              </div>
            ) : (
              <div className="surface p-10 text-center text-muted-foreground">
                {t("qualite.doublons.selectCase")}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="telephones" className="mt-0">
          <button
            onClick={() => setView("cas")}
            className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {t("qualite.doublons.backToCases")}
          </button>
          <h2 className="font-semibold">
            {t("qualite.doublons.phones.title", { n: phoneGroups.length })}
          </h2>
          <p className="mb-3 mt-1 max-w-2xl text-sm text-muted-foreground">
            {t("qualite.doublons.phones.intro")}
          </p>
          <div className="surface divide-y">
            {phoneGroups.map((gr) => (
              <div key={gr.phone} className="px-4 py-3">
                <div className="flex items-center gap-2 font-medium">
                  <Phone className="size-4 text-muted-foreground" />
                  <span className="tabular">{maskPhone(gr.phone)}</span>
                  <Pill tone="ochre">
                    {t("qualite.doublons.phones.people", { n: gr.members.length })}
                  </Pill>
                </div>
                <ul className="mt-2 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                  {gr.members.map((m) => (
                    <li key={m.id}>
                      <Link
                        to="/producteurs/$id"
                        params={{ id: m.id }}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {m.firstName} {m.lastName}
                      </Link>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {m.code} · {m.village}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {!phoneGroups.length && (
              <div className="p-10 text-center text-muted-foreground">
                {t("qualite.doublons.phones.none")}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog open={mergeOpen} onOpenChange={setMergeOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("qualite.doublons.confirm.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("qualite.doublons.confirm.body", {
                bCode: b?.code ?? "",
                aCode: a?.code ?? "",
                plots: b ? nPlots(b.id) : 0,
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("qualite.doublons.confirm.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (sel) {
                  actions.mergeCase(sel.id, comment.trim());
                  toast.success(t("qualite.doublons.merged.toast"));
                  setComment("");
                }
              }}
            >
              {t("qualite.doublons.confirm.action")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

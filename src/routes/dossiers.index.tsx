import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, ExternalLink, FilePlus, FolderOpen, Search, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { DossierHelp, DossierPill } from "@/components/app/DossierBits";
import { EmptyState, PageHeader } from "@/components/app/ui-bits";
import { FilterPill } from "@/components/app/FilterPill";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { RowActions } from "@/components/app/RowActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actions, can, useStore, useScoops } from "@/lib/store";
import { inScope, scopedDossiers } from "@/lib/scope";
import { ORGS } from "@/lib/mock/data";
import type { DossierStatus, ProducerDossier } from "@/lib/mock/cooperative";
import { fmtDate, nf } from "@/lib/format";
import { useI18n, type MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/dossiers/")({
  validateSearch: (s: Record<string, unknown>) => ({
    scoop: typeof s["scoop"] === "string" ? (s["scoop"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Dossiers producteurs · Mbay Diaay" },
      {
        name: "description",
        content:
          "Les dossiers de nouveaux producteurs : préparation par le technicien, traitement par la coopérative.",
      },
      { property: "og:title", content: "Dossiers producteurs · Mbay Diaay" },
      { property: "og:description", content: "Circuit de validation des nouveaux producteurs." },
    ],
  }),
  component: DossiersRoute,
});

function DossiersRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm={["dossier.create", "dossier.review"]} area={t("dossiers.area")}>
      <Dossiers />
    </AppShell>
  );
}

type View = "tous" | "a-traiter" | DossierStatus;
const TO_PROCESS: DossierStatus[] = ["soumis", "en examen"];
const PILL = "h-10 px-4 text-sm";
const FILTERS = ["brouillon", "complément demandé", "approuvé", "refusé"] as const;
const FILTER_LABEL: Record<(typeof FILTERS)[number], MessageKey> = {
  brouillon: "dossiers.filter.brouillon",
  "complément demandé": "dossiers.filter.complément demandé",
  approuvé: "dossiers.filter.approuvé",
  refusé: "dossiers.filter.refusé",
};

function Dossiers() {
  const { t } = useI18n();
  const g = Route.useSearch();
  const session = useStore((s) => s.session);
  const dossiers = useStore((s) => s.dossiers);
  const [view, setView] = useState<View>("tous");
  const [q, setQ] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const reviewer = can(session, "dossier.review");
  const creator = can(session, "dossier.create");

  const mine = useMemo(
    () => scopedDossiers(dossiers, session).filter((d) => !g.scoop || d.scoopId === g.scoop),
    [dossiers, session, g.scoop],
  );
  const needle = q.trim().toLowerCase();
  const inView = (d: ProducerDossier) =>
    view === "tous" || (view === "a-traiter" ? TO_PROCESS.includes(d.status) : d.status === view);
  const shown = mine
    .filter(
      (d) =>
        inView(d) &&
        (!needle ||
          `${d.draft.firstName} ${d.draft.lastName} ${d.createdBy}`.toLowerCase().includes(needle)),
    )
    // Plus anciens d'abord pour relancer les dossiers qui vieillissent (A-08).
    .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
  const n = (f: (d: ProducerDossier) => boolean) => mine.filter(f).length;
  const filtered = view !== "tous" || needle !== "";
  const viewName =
    view === "tous"
      ? ""
      : view === "a-traiter"
        ? t("dossiers.filter.toProcess")
        : t(FILTER_LABEL[view as (typeof FILTERS)[number]]);
  const multiScoop = new Set(mine.map((d) => d.scoopId)).size > 1;

  return (
    <>
      <PageHeader
        eyebrow={t("dossiers.eyebrow")}
        title={t("dossiers.title")}
        description={
          reviewer ? t("dossiers.description.reviewer") : t("dossiers.description.creator")
        }
        actions={
          creator ? (
            <Button onClick={() => setNewOpen(true)}>
              <FilePlus className="size-4" />
              {t("dossiers.new")}
            </Button>
          ) : undefined
        }
      />

      <section className="surface mb-3 space-y-3 p-3 sm:p-4" aria-labelledby="dossier-filters">
        <h2 id="dossier-filters" className="text-sm font-semibold">
          {t("dossiers.filter.group")}
        </h2>
        {/* Toujours affiché, jamais replié : les pastilles passent à la ligne, elles ne défilent pas. */}
        <div className="flex flex-wrap items-center gap-2">
          {reviewer && (
            <FilterPill
              active={view === "a-traiter"}
              onClick={() => setView(view === "a-traiter" ? "tous" : "a-traiter")}
              count={n((d) => TO_PROCESS.includes(d.status))}
              tone="warning"
              className={PILL}
            >
              {t("dossiers.filter.toProcess")}
            </FilterPill>
          )}
          <FilterPill
            active={view === "tous"}
            onClick={() => setView("tous")}
            count={mine.length}
            className={PILL}
          >
            {t("dossiers.filter.all")}
          </FilterPill>
          {FILTERS.map((s) => (
            <FilterPill
              key={s}
              active={view === s}
              onClick={() => setView(view === s ? "tous" : s)}
              count={n((d) => d.status === s)}
              tone={s === "approuvé" ? "success" : s === "refusé" ? "danger" : undefined}
              className={PILL}
            >
              {t(FILTER_LABEL[s])}
            </FilterPill>
          ))}
        </div>
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label={t("dossiers.search.aria")}
            placeholder={t("dossiers.search.placeholder")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm" aria-live="polite">
          {filtered ? (
            <>
              <span className="font-semibold">
                {[
                  view !== "tous" ? t("dossiers.filter.active", { name: viewName }) : null,
                  needle ? t("dossiers.filter.search", { q: q.trim() }) : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setView("tous");
                  setQ("");
                }}
              >
                <X className="size-4" aria-hidden />
                {t("dossiers.filter.clear")}
              </Button>
            </>
          ) : (
            <span className="text-muted-foreground">{t("dossiers.filter.none")}</span>
          )}
        </div>
      </section>

      <div className="surface overflow-x-auto">
        {shown.length ? (
          <table className="w-full text-sm">
            <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">{t("dossiers.col.future")}</th>
                <th className="font-semibold">{t("dossiers.col.status")}</th>
                {multiScoop && (
                  <th className="hidden font-semibold md:table-cell">{t("dossiers.col.scoop")}</th>
                )}
                <th className="hidden font-semibold sm:table-cell">{t("dossiers.col.tech")}</th>
                <th className="hidden font-semibold lg:table-cell">{t("dossiers.col.age")}</th>
                <th className="hidden font-semibold xl:table-cell">{t("dossiers.col.updated")}</th>
                <th className="w-12 pr-4" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {shown.map((d) => (
                <Row key={d.id} dossier={d} multiScoop={multiScoop} canRemind={reviewer} />
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState icon={FolderOpen} title={t("dossiers.empty.title")}>
            {mine.length
              ? t("dossiers.empty.filtered")
              : creator
                ? t("dossiers.empty.create")
                : t("dossiers.empty.readonly")}
          </EmptyState>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {t("dossiers.count", { shown: nf.format(shown.length), total: nf.format(mine.length) })}
      </p>

      <NewDossierDialog open={newOpen} onOpenChange={setNewOpen} />
    </>
  );
}

function ageDays(iso: string) {
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / (24 * 3600 * 1000)));
}

function Row({
  dossier: d,
  multiScoop,
  canRemind,
}: {
  dossier: ProducerDossier;
  multiScoop: boolean;
  canRemind: boolean;
}) {
  const allScoops = useScoops();
  const { t } = useI18n();
  const navigate = useNavigate();
  const open = () => void navigate({ to: "/dossiers/$id", params: { id: d.id } });
  const days = ageDays(d.updatedAt);
  const pending = d.status === "soumis" || d.status === "en examen";
  return (
    <tr
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => e.key === "Enter" && open()}
      className="cursor-pointer hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
    >
      <td className="px-4 py-2.5">
        <div className="font-semibold">
          {d.draft.firstName || t("dossiers.row.noFirstName")}{" "}
          {d.draft.lastName || t("dossiers.row.noLastName")}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {d.draft.village || t("dossiers.row.noVillage")}
          {d.possibleDuplicateOf && d.status !== "approuvé" && d.status !== "refusé" && (
            <span className="inline-flex items-center gap-1 text-warning-fg">
              <AlertTriangle className="size-3" aria-hidden />
              {t("dossiers.row.duplicate")}
            </span>
          )}
        </div>
      </td>
      <td>
        <div className="flex max-w-[15rem] flex-col items-start gap-1 py-2 pr-2">
          <DossierPill status={d.status} />
          <DossierHelp status={d.status} />
        </div>
      </td>
      {multiScoop && (
        <td className="hidden md:table-cell">
          {allScoops.find((s) => s.id === d.scoopId)?.commune}
        </td>
      )}
      <td className="hidden sm:table-cell">{d.createdBy}</td>
      <td
        className={`hidden tabular lg:table-cell ${pending && days >= 14 ? "font-semibold text-warning-fg" : "text-muted-foreground"}`}
      >
        {t(days === 1 ? "dossiers.age.days.un" : "dossiers.age.days.autre", { count: days })}
      </td>
      <td className="hidden whitespace-nowrap text-muted-foreground xl:table-cell">
        {fmtDate(d.updatedAt)}
      </td>
      <td className="pr-4 text-right">
        <RowActions
          title={`${d.draft.firstName} ${d.draft.lastName}`}
          items={[
            { label: t("dossiers.row.open"), icon: ExternalLink, onSelect: open },
            ...(canRemind && pending
              ? [
                  {
                    label: t("dossiers.remind"),
                    icon: AlertTriangle,
                    onSelect: () => {
                      actions.audit(
                        "Rappel dossier",
                        `Dossier ${d.id}`,
                        `${d.draft.firstName} ${d.draft.lastName} · ${days} j.`,
                      );
                      toast.success(t("dossiers.reminded"));
                    },
                  },
                ]
              : []),
            ...(d.producerId
              ? [
                  {
                    label: t("dossiers.row.viewProducer"),
                    icon: ExternalLink,
                    to: "/producteurs/$id",
                    params: { id: d.producerId },
                  },
                ]
              : []),
          ]}
        />
      </td>
    </tr>
  );
}

function NewDossierDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const allScoops = useScoops();
  const { t } = useI18n();
  const navigate = useNavigate();
  const session = useStore((s) => s.session);
  // SCOOP où la personne peut créer : celles de son compte, dans son périmètre.
  const scoops = allScoops.filter((s) => inScope([{ scoopId: s.id }], session).length === 1);
  const empty = {
    firstName: "",
    lastName: "",
    sex: "F" as "F" | "H",
    scoopId: scoops[0]?.id ?? "",
  };
  const [f, setF] = useState(empty);
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((x) => ({ ...x, [k]: v }));
  const ok = f.firstName.trim() && f.lastName.trim() && f.scoopId;

  return (
    <FormDialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setF(empty);
      }}
      title={t("dossiers.new.title")}
      description={t("dossiers.new.description")}
      submitLabel={t("dossiers.new.submit")}
      submitDisabled={!ok}
      onSubmit={() => {
        const org = ORGS.find((o) => o.scoopId === f.scoopId);
        const res = actions.createDossier(f.scoopId, {
          firstName: f.firstName.trim(),
          lastName: f.lastName.trim(),
          sex: f.sex,
          age: null,
          phone: "",
          cni: "",
          village: org?.village ?? "",
          orgId: org?.id ?? "",
          createMember: true,
        });
        if (!res.ok) return void toast.error(res.error);
        toast.success(t("dossiers.new.done"));
        setF(empty);
        onOpenChange(false);
        void navigate({ to: "/dossiers/$id", params: { id: res.id } });
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <FormField label={t("dossiers.new.firstName")} required>
          {(c) => (
            <Input {...c} value={f.firstName} onChange={(e) => set("firstName", e.target.value)} />
          )}
        </FormField>
        <FormField label={t("dossiers.new.lastName")} required>
          {(c) => (
            <Input {...c} value={f.lastName} onChange={(e) => set("lastName", e.target.value)} />
          )}
        </FormField>
      </div>
      <FormField label={t("dossiers.new.sex")}>
        {(c) => (
          <Select value={f.sex} onValueChange={(v) => set("sex", v as "F" | "H")}>
            <SelectTrigger id={c.id}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="F">{t("dossiers.new.female")}</SelectItem>
              <SelectItem value="H">{t("dossiers.new.male")}</SelectItem>
            </SelectContent>
          </Select>
        )}
      </FormField>
      {scoops.length > 1 && (
        <FormField label={t("dossiers.new.scoop")} required>
          {(c) => (
            <Select value={f.scoopId} onValueChange={(v) => set("scoopId", v)}>
              <SelectTrigger id={c.id}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {scoops.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormField>
      )}
    </FormDialog>
  );
}

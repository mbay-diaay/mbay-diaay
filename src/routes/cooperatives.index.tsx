import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Building2,
  ExternalLink,
  MailPlus,
  Pencil,
  Plus,
  RotateCcw,
  Archive,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState, KpiTile, PageHeader, Pill } from "@/components/app/ui-bits";
import { FilterPill } from "@/components/app/FilterPill";
import { RowActions } from "@/components/app/RowActions";
import { ScoopFormDialog } from "@/components/app/ScoopFormDialog";
import { ScoopArchiveDialog } from "@/components/app/ScoopArchiveDialog";
import { AccountPill } from "@/components/app/ScoopAccount";
import { accountOf, managerOf, type AccountState } from "@/lib/scoop-account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { actions, useCan, useStore, type AppUser } from "@/lib/store";
import { inScope } from "@/lib/scope";
import type { Scoop } from "@/lib/mock/data";
import { nf } from "@/lib/format";
import { useI18n, type MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/cooperatives/")({
  head: () => ({
    meta: [
      { title: "Coopératives · Mbay Diaay" },
      {
        name: "description",
        content: "Créer, modifier et archiver une coopérative, et inviter son gestionnaire.",
      },
      { property: "og:title", content: "Coopératives · Mbay Diaay" },
      { property: "og:description", content: "Gestion des coopératives." },
    ],
  }),
  component: CooperativesRoute,
});

function CooperativesRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm={["scoop.manage", "org.read"]} area={t("cooperatives.area")}>
      <Cooperatives />
    </AppShell>
  );
}

interface Row {
  scoop: Scoop;
  producers: number;
  members: number;
  manager: AppUser | undefined;
  account: AccountState;
  /** Date d'envoi ou d'échéance de l'invitation, à afficher selon l'état. */
  date: string | undefined;
  pending: boolean;
}

type Filter = "tous" | "active" | "archived" | "pending";
const FILTERS: { id: Exclude<Filter, "tous">; label: MessageKey; test: (r: Row) => boolean }[] = [
  { id: "active", label: "cooperatives.filter.active", test: (r) => !r.scoop.archived },
  { id: "archived", label: "cooperatives.filter.archived", test: (r) => !!r.scoop.archived },
  { id: "pending", label: "cooperatives.filter.pending", test: (r) => r.pending },
];

function Cooperatives() {
  const { t } = useI18n();
  const allScoops = useStore((s) => s.scoops);
  const session = useStore((s) => s.session);
  const canManage = useCan("scoop.manage");
  const users = useStore((s) => s.users);
  const members = useStore((s) => s.members);
  const producers = useStore((s) => s.producers);
  const [filter, setFilter] = useState<Filter>("tous");
  const [q, setQ] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Scoop | null>(null);
  const [archiving, setArchiving] = useState<Scoop | null>(null);

  // Le périmètre de la session décide des coopératives visibles.
  const scoops = useMemo(
    () => allScoops.filter((c) => inScope([{ scoopId: c.id }], session).length === 1),
    [allScoops, session],
  );

  const rows = useMemo<Row[]>(() => {
    const now = Date.now();
    const producerCount = new Map<string, number>();
    for (const p of producers)
      producerCount.set(p.scoopId, (producerCount.get(p.scoopId) ?? 0) + 1);
    const memberCount = new Map<string, number>();
    for (const m of members)
      if (m.status === "membre") memberCount.set(m.scoopId, (memberCount.get(m.scoopId) ?? 0) + 1);
    return scoops.map((scoop) => {
      const manager = managerOf(users, scoop.id);
      const account: AccountState = accountOf(manager, now);
      return {
        scoop,
        producers: producerCount.get(scoop.id) ?? 0,
        members: memberCount.get(scoop.id) ?? 0,
        manager,
        account,
        date: manager?.invited?.expiresAt,
        pending: !scoop.archived && (account === "invited" || account === "expired"),
      };
    });
  }, [scoops, users, members, producers]);

  const kpi = useMemo(
    () => ({
      active: rows.filter((r) => !r.scoop.archived).length,
      archived: rows.filter((r) => r.scoop.archived).length,
      pending: rows.filter((r) => r.pending).length,
      producers: rows.reduce((n, r) => n + r.producers, 0),
    }),
    [rows],
  );

  const needle = q.trim().toLowerCase();
  const active = FILTERS.find((f) => f.id === filter);
  const shown = rows.filter(
    (r) =>
      (!active || active.test(r)) &&
      (!needle ||
        `${r.scoop.name} ${r.scoop.code ?? ""} ${r.scoop.commune}`.toLowerCase().includes(needle)),
  );

  return (
    <>
      <PageHeader
        eyebrow={t("cooperatives.eyebrow")}
        title={t("cooperatives.title")}
        description={t("cooperatives.description")}
        actions={
          canManage ? (
            <Button size="lg" onClick={() => setCreateOpen(true)}>
              <Plus className="size-4" />
              {t("cooperatives.new")}
            </Button>
          ) : undefined
        }
      />
      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiTile label={t("cooperatives.kpi.active")} value={nf.format(kpi.active)} />
        <KpiTile label={t("cooperatives.kpi.archived")} value={nf.format(kpi.archived)} />
        <KpiTile
          label={t("cooperatives.kpi.pending")}
          value={nf.format(kpi.pending)}
          sub={t("cooperatives.kpi.pendingSub")}
          tone={kpi.pending ? "warning" : "neutral"}
        />
        <KpiTile
          label={t("cooperatives.kpi.producers")}
          value={nf.format(kpi.producers)}
          sub={t("cooperatives.kpi.producersSub")}
        />
      </div>
      <div className="surface mb-3 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <FilterPill
            active={filter === "tous"}
            onClick={() => setFilter("tous")}
            count={rows.length}
          >
            {t("cooperatives.filter.all")}
          </FilterPill>
          {FILTERS.map((f) => (
            <FilterPill
              key={f.id}
              active={filter === f.id}
              onClick={() => setFilter(filter === f.id ? "tous" : f.id)}
              count={rows.filter(f.test).length}
            >
              {t(f.label)}
            </FilterPill>
          ))}
          <div className="relative ml-auto w-full sm:w-64">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label={t("cooperatives.search.aria")}
              placeholder={t("cooperatives.search.placeholder")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>
      <div className="surface overflow-x-auto">
        {shown.length ? (
          <table className="w-full text-sm">
            <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">{t("cooperatives.col.name")}</th>
                <th className="font-semibold">{t("cooperatives.col.status")}</th>
                <th className="hidden font-semibold sm:table-cell">
                  {t("cooperatives.col.manager")}
                </th>
                <th className="hidden text-right font-semibold md:table-cell">
                  {t("cooperatives.col.producers")}
                </th>
                <th className="hidden px-4 text-right font-semibold md:table-cell">
                  {t("cooperatives.col.members")}
                </th>
                <th className="w-12 pr-4" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {shown.map((r) => (
                <ScoopRow
                  key={r.scoop.id}
                  row={r}
                  onEdit={() => setEditing(r.scoop)}
                  onArchive={() => setArchiving(r.scoop)}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState
            icon={Building2}
            title={t("cooperatives.empty.title")}
            action={
              rows.length || !canManage ? undefined : (
                <Button onClick={() => setCreateOpen(true)}>
                  <Plus className="size-4" />
                  {t("cooperatives.new")}
                </Button>
              )
            }
          >
            {rows.length
              ? t("cooperatives.empty.filtered")
              : canManage
                ? t("cooperatives.empty.create")
                : t("cooperatives.empty.none")}
          </EmptyState>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {t("cooperatives.count.autre", { count: shown.length, total: rows.length })}
      </p>
      {createOpen && <ScoopFormDialog open onOpenChange={setCreateOpen} />}
      {editing && (
        <ScoopFormDialog open onOpenChange={(o) => !o && setEditing(null)} scoop={editing} />
      )}
      {archiving && (
        <ScoopArchiveDialog scoop={archiving} onOpenChange={(o) => !o && setArchiving(null)} />
      )}
    </>
  );
}

function ScoopRow({
  row: r,
  onEdit,
  onArchive,
}: {
  row: Row;
  onEdit: () => void;
  onArchive: () => void;
}) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const canManage = useCan("scoop.manage");
  const archived = !!r.scoop.archived;
  const open = () =>
    void navigate({ to: "/cooperatives/$id", params: { id: r.scoop.id }, search: {} });
  const place = [r.scoop.commune, r.scoop.region].filter(Boolean).join(", ");
  return (
    <tr
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => e.target === e.currentTarget && e.key === "Enter" && open()}
      className={`cursor-pointer hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none ${archived ? "opacity-70" : ""}`}
    >
      <td className="px-4 py-3">
        <Link
          to="/cooperatives/$id"
          params={{ id: r.scoop.id }}
          search={{}}
          onClick={(e) => e.stopPropagation()}
          className="font-semibold text-primary hover:underline"
        >
          {r.scoop.name}
        </Link>
        <div className="text-xs text-muted-foreground">
          <span>
            {r.scoop.code
              ? t("cooperatives.codeLabel", { code: r.scoop.code })
              : t("cooperatives.noCode")}
          </span>
          {" · "}
          {place}
        </div>
        <div className="mt-1.5 sm:hidden">
          <AccountPill account={r.account} date={r.date} />
        </div>
      </td>
      <td>
        <Pill tone={archived ? "neutral" : "success"}>
          {t(archived ? "cooperatives.status.archived" : "cooperatives.status.active")}
        </Pill>
      </td>
      <td className="hidden py-3 sm:table-cell">
        {r.manager && <div className="font-medium">{r.manager.name}</div>}
        <div className="mt-0.5">
          <AccountPill account={r.account} date={r.date} />
        </div>
      </td>
      <td className="hidden text-right tabular md:table-cell">{nf.format(r.producers)}</td>
      <td className="hidden px-4 text-right tabular md:table-cell">{nf.format(r.members)}</td>
      <td className="pr-4 text-right">
        <RowActions
          title={r.scoop.name}
          label={t("cooperatives.row.actions", { name: r.scoop.name })}
          items={[
            { label: t("cooperatives.row.open"), icon: ExternalLink, onSelect: open },
            {
              label: t("cooperatives.row.edit"),
              icon: Pencil,
              onSelect: onEdit,
              hidden: !canManage,
            },
            {
              label: t("cooperatives.row.resend"),
              icon: MailPlus,
              hidden: !canManage || !r.manager || r.manager.active || !r.manager.invited,
              onSelect: () => {
                if (!r.manager) return;
                const res = actions.resendInvitation(r.manager.id);
                if (res.ok)
                  toast.success(t("cooperatives.resend.done", { email: r.manager.email }));
                else toast.error(res.error);
              },
            },
            {
              label: t("cooperatives.row.restore"),
              icon: RotateCcw,
              hidden: !canManage || !archived,
              onSelect: () => {
                const res = actions.restoreScoop(r.scoop.id);
                if (res.ok)
                  toast.success(t("cooperatives.restore.done"), {
                    description: t("cooperatives.restore.hint"),
                  });
                else toast.error(res.error);
              },
            },
            {
              label: t("cooperatives.row.archive"),
              icon: Archive,
              danger: true,
              hidden: !canManage || archived,
              onSelect: onArchive,
            },
          ]}
        />
      </td>
    </tr>
  );
}

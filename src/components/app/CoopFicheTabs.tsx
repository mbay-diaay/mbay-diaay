import { useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Building2,
  CalendarCheck,
  FileText,
  Network,
  Search,
  UserCheck,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";
import { EmptyState, KpiTile, Pill } from "@/components/app/ui-bits";
import { FilterPill } from "@/components/app/FilterPill";
import { Input } from "@/components/ui/input";
import { memberDues, scoopTotals } from "@/lib/contributions";
import { sortMeetings, upcomingMeetings } from "@/lib/meetings";
import { overviewByScoop } from "@/lib/overview";
import { scopedLibrary } from "@/lib/scope";
import { ORG_TYPES, type Org, type Scoop } from "@/lib/mock/data";
import type { MembershipStatus } from "@/lib/mock/cooperative";
import { can, useCan, useStore, type AppUser } from "@/lib/store";
import { nf } from "@/lib/format";
import { techniciansOf } from "@/lib/scoop-account";
import { useI18n, type MessageKey } from "@/lib/i18n";

/** Barre de recherche commune aux listes de la fiche. */
function SearchBox({
  value,
  onChange,
  label,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder: string;
}) {
  return (
    <div className="relative w-full sm:w-64">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}

/** Lien d'action d'un bloc ou d'un onglet : gros, facile à toucher. */
function BigLink({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 text-sm font-semibold text-primary [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center hover:[&_a]:underline">
      {children}
    </div>
  );
}

function Block({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: typeof Building2;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="surface p-5" aria-labelledby={`${id}-title`} data-testid={`bloc-${id}`}>
      <h2 id={`${id}-title`} className="mb-3 flex items-center gap-2 font-semibold">
        <Icon className="size-4 text-muted-foreground" aria-hidden />
        {title}
      </h2>
      {children}
    </section>
  );
}

const plural = (n: number) => (n === 1 ? "un" : "autre");
const nowIso = () => new Date().toISOString();

// ============ Aperçu ============

export function ApercuTab({ scoop }: { scoop: Scoop }) {
  const { t, tEnum, formatDate } = useI18n();
  const session = useStore((s) => s.session);
  const orgs = useStore((s) => s.orgs);
  const members = useStore((s) => s.members);
  const producers = useStore((s) => s.producers);
  const plots = useStore((s) => s.plots);
  const users = useStore((s) => s.users);
  const dossiers = useStore((s) => s.dossiers);
  const corrections = useStore((s) => s.corrections);
  const alerts = useStore((s) => s.alerts);
  const rules = useStore((s) => s.contributionRules);
  const payments = useStore((s) => s.payments);
  const meetings = useStore((s) => s.meetings);
  const documents = useStore((s) => s.documents);

  const data = useMemo(() => {
    const now = nowIso();
    const [ov] = overviewByScoop(
      { orgs, members, producers, plots, users, dossiers, corrections, alerts },
      [scoop.id],
    );
    const mine = members.filter((m) => m.scoopId === scoop.id);
    const totals = scoopTotals(
      mine,
      rules.find((r) => r.scoopId === scoop.id),
      payments,
      now,
    );
    return {
      ov,
      candidates: mine.filter((m) => m.status === "candidat"),
      totals,
      meetings: upcomingMeetings(
        meetings.filter((m) => m.scoopId === scoop.id),
        now,
      ).slice(0, 3),
      documents: scopedLibrary(documents, session)
        .filter((d) => d.scoopId === scoop.id)
        .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
        .slice(0, 3),
    };
  }, [
    scoop.id,
    orgs,
    members,
    producers,
    plots,
    users,
    dossiers,
    corrections,
    alerts,
    rules,
    payments,
    meetings,
    documents,
    session,
  ]);
  const { ov, candidates, totals } = data;

  const pending: { label: MessageKey; value: number; to?: string | undefined }[] = [
    {
      label: "cooperatives.fiche.pending.dossiers",
      value: ov?.dossiers ?? 0,
      to: can(session, "dossier.review") ? "/dossiers" : undefined,
    },
    {
      label: "cooperatives.fiche.pending.corrections",
      value: ov?.corrections ?? 0,
      to: can(session, "correction.manage") ? "/qualite/corrections" : undefined,
    },
    {
      label: "cooperatives.fiche.pending.alerts",
      value: ov?.alerts ?? 0,
      to: can(session, "alert.manage") ? "/qualite/alertes" : undefined,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiTile
          label={t("cooperatives.fiche.kpi.gie")}
          value={nf.format(ov?.gie ?? 0)}
          sub={t(`cooperatives.fiche.kpi.gieSub.${plural(ov?.orgs ?? 0)}`, {
            count: nf.format(ov?.orgs ?? 0),
          })}
        />
        <KpiTile
          label={t("cooperative.kpi.members")}
          value={nf.format(ov?.members ?? 0)}
          sub={t(`cooperatives.fiche.kpi.membersSub.${plural(ov?.candidates ?? 0)}`, {
            count: nf.format(ov?.candidates ?? 0),
          })}
        />
        <KpiTile label={t("cooperative.kpi.producers")} value={nf.format(ov?.producers ?? 0)} />
        <KpiTile
          label={t("cooperatives.fiche.kpi.technicians")}
          value={nf.format(ov?.technicians ?? 0)}
        />
      </div>

      <section className="surface p-5" aria-labelledby="pending-title">
        <h2 id="pending-title" className="font-semibold">
          {t("cooperatives.fiche.pending.title")}
        </h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {pending.map((p) => (
            <li key={p.label} className="rounded-md border p-4">
              <div className="text-2xl font-semibold tabular">{nf.format(p.value)}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t(p.label)}</div>
              {p.to && p.value > 0 && (
                <BigLink>
                  {p.to === "/dossiers" ? (
                    <Link to="/dossiers" search={{ scoop: scoop.id }}>
                      {t("cooperatives.fiche.pending.open")}
                    </Link>
                  ) : (
                    <Link to={p.to}>{t("cooperatives.fiche.pending.open")}</Link>
                  )}
                </BigLink>
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {can(session, "member.read") && (
          <Block id="adhesions" icon={UserCheck} title={t("cooperative.adhesions.title")}>
            {candidates.length ? (
              <>
                <p className="text-2xl font-semibold tabular">{nf.format(candidates.length)}</p>
                <p className="text-sm text-muted-foreground">
                  {t(`cooperative.adhesions.count.${plural(candidates.length)}`, {
                    count: candidates.length,
                  })}
                </p>
                <ul className="mt-2 text-sm">
                  {candidates.slice(0, 3).map((m) => (
                    <li key={m.id} className="py-0.5">
                      {m.firstName} {m.lastName}
                    </li>
                  ))}
                </ul>
                <BigLink>
                  <Link to="/equipe" search={{ scoop: scoop.id }}>
                    {t("cooperative.adhesions.open")}
                  </Link>
                </BigLink>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">{t("cooperative.adhesions.empty")}</p>
            )}
          </Block>
        )}

        {can(session, "contribution.read") && (
          <Block id="cotisations" icon={Wallet} title={t("cooperative.dues.title")}>
            {totals.expected > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <KpiTile
                    label={t("cooperative.dues.rate")}
                    value={`${nf.format(totals.rate)} %`}
                    sub={t("cooperative.dues.rateSub", {
                      collected: nf.format(totals.collected),
                      expected: nf.format(totals.expected),
                    })}
                  />
                  <KpiTile
                    label={t("cooperative.dues.late")}
                    value={nf.format(totals.late)}
                    sub={
                      totals.late
                        ? t("cooperative.dues.lateSub.some")
                        : t("cooperative.dues.lateSub.zero")
                    }
                    tone={totals.late ? "warning" : "neutral"}
                  />
                </div>
                <BigLink>
                  <Link to="/cotisations" search={{ scoop: scoop.id }}>
                    {t("cooperative.dues.open")}
                  </Link>
                </BigLink>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">{t("cooperative.dues.empty")}</p>
            )}
          </Block>
        )}

        {can(session, "meeting.read") && (
          <Block id="reunions" icon={CalendarCheck} title={t("cooperative.meetings.title")}>
            {data.meetings.length ? (
              <>
                <ul className="divide-y text-sm">
                  {data.meetings.map((m) => (
                    <li key={m.id} className="py-2">
                      <Link
                        to="/reunions/$id"
                        params={{ id: m.id }}
                        className="font-semibold text-primary hover:underline"
                      >
                        {m.title}
                      </Link>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(m.date, { dateStyle: "medium", timeStyle: "short" })} ·{" "}
                        {m.place}
                      </div>
                    </li>
                  ))}
                </ul>
                <BigLink>
                  <Link to="/reunions" search={{ scoop: scoop.id }}>
                    {t("cooperative.meetings.all")}
                  </Link>
                </BigLink>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">{t("cooperative.meetings.empty")}</p>
            )}
          </Block>
        )}

        {can(session, "library.read") && (
          <Block id="documents" icon={FileText} title={t("cooperative.docs.title")}>
            {data.documents.length ? (
              <>
                <ul className="divide-y text-sm">
                  {data.documents.map((d) => (
                    <li key={d.id} className="py-2">
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {tEnum("equipe.docs.kind", d.kind)} ·{" "}
                        {formatDate(d.uploadedAt, { dateStyle: "medium" })}
                      </div>
                    </li>
                  ))}
                </ul>
                <BigLink>
                  <Link to="/documents" search={{ scoop: scoop.id }}>
                    {t("cooperative.docs.all")}
                  </Link>
                </BigLink>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">{t("cooperative.docs.empty")}</p>
            )}
          </Block>
        )}
      </div>
    </div>
  );
}

// ============ GIE ============

type GieFilter = "tous" | "qualified" | "toQualify" | (typeof ORG_TYPES)[number];

export function GieTab({ scoop }: { scoop: Scoop }) {
  const { t, tEnum } = useI18n();
  const navigate = useNavigate();
  const orgs = useStore((s) => s.orgs);
  const producers = useStore((s) => s.producers);
  const members = useStore((s) => s.members);
  const canOpen = useCan("producer.read");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<GieFilter>("tous");
  const [bySize, setBySize] = useState(true);

  const rows = useMemo(() => {
    const producerCount = new Map<string, number>();
    for (const p of producers)
      if (p.scoopId === scoop.id && !p.mergedInto)
        producerCount.set(p.orgId, (producerCount.get(p.orgId) ?? 0) + 1);
    const memberCount = new Map<string, number>();
    for (const m of members)
      if (m.scoopId === scoop.id && m.orgId)
        memberCount.set(m.orgId, (memberCount.get(m.orgId) ?? 0) + 1);
    return orgs
      .filter((o) => o.scoopId === scoop.id)
      .map((org) => ({
        org,
        producers: producerCount.get(org.id) ?? 0,
        members: memberCount.get(org.id) ?? 0,
      }));
  }, [orgs, producers, members, scoop.id]);

  const usedTypes = ORG_TYPES.filter((ty) => rows.some((r) => r.org.type === ty));
  const test = (r: { org: Org }, f: GieFilter) =>
    f === "tous"
      ? true
      : f === "qualified"
        ? r.org.type !== null
        : f === "toQualify"
          ? r.org.type === null
          : r.org.type === f;
  const needle = q.trim().toLowerCase();
  const shown = rows
    .filter(
      (r) =>
        test(r, filter) &&
        (!needle || `${r.org.name} ${r.org.village}`.toLowerCase().includes(needle)),
    )
    .sort((a, b) =>
      bySize
        ? b.producers - a.producers || a.org.name.localeCompare(b.org.name, "fr")
        : a.org.name.localeCompare(b.org.name, "fr"),
    );

  if (!rows.length)
    return (
      <EmptyState icon={Network} title={t("cooperatives.fiche.gie.empty.title")}>
        {t("cooperatives.fiche.gie.empty.text")}
      </EmptyState>
    );

  const open = (id: string) =>
    canOpen && void navigate({ to: "/organisations/$id", params: { id } });

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <FilterPill
          active={filter === "tous"}
          onClick={() => setFilter("tous")}
          count={rows.length}
        >
          {t("cooperatives.fiche.gie.filter.all")}
        </FilterPill>
        <FilterPill
          active={filter === "qualified"}
          onClick={() => setFilter(filter === "qualified" ? "tous" : "qualified")}
          count={rows.filter((r) => test(r, "qualified")).length}
        >
          {t("cooperatives.fiche.gie.filter.qualified")}
        </FilterPill>
        <FilterPill
          active={filter === "toQualify"}
          tone="warning"
          onClick={() => setFilter(filter === "toQualify" ? "tous" : "toQualify")}
          count={rows.filter((r) => test(r, "toQualify")).length}
        >
          {t("cooperatives.fiche.gie.filter.toQualify")}
        </FilterPill>
        {usedTypes.map((ty) => (
          <FilterPill
            key={ty}
            active={filter === ty}
            onClick={() => setFilter(filter === ty ? "tous" : ty)}
            count={rows.filter((r) => test(r, ty)).length}
          >
            {tEnum("organisations.type", ty)}
          </FilterPill>
        ))}
        <FilterPill active={bySize} onClick={() => setBySize(!bySize)}>
          {t("cooperatives.fiche.gie.sort")}
        </FilterPill>
        <div className="ml-auto w-full sm:w-auto">
          <SearchBox
            value={q}
            onChange={setQ}
            label={t("cooperatives.fiche.gie.search.aria")}
            placeholder={t("cooperatives.fiche.gie.search.placeholder")}
          />
        </div>
      </div>
      {shown.length ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-left text-xs text-muted-foreground">
              <tr>
                <th className="py-2 font-semibold">{t("cooperatives.fiche.gie.col.name")}</th>
                <th className="hidden font-semibold sm:table-cell">
                  {t("cooperatives.fiche.gie.col.type")}
                </th>
                <th className="hidden font-semibold md:table-cell">
                  {t("cooperatives.fiche.gie.col.village")}
                </th>
                <th className="text-right font-semibold">
                  {t("cooperatives.fiche.gie.col.producers")}
                </th>
                <th className="hidden text-right font-semibold sm:table-cell">
                  {t("cooperatives.fiche.gie.col.members")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {shown.map((r) => {
                const type = r.org.type ? (
                  <Pill tone="brand">{tEnum("organisations.type", r.org.type)}</Pill>
                ) : (
                  <Pill tone="warning">{t("cooperatives.fiche.gie.toQualify")}</Pill>
                );
                return (
                  <tr
                    key={r.org.id}
                    onClick={() => open(r.org.id)}
                    className={canOpen ? "cursor-pointer hover:bg-muted/60" : ""}
                  >
                    <td className="py-3 pr-2">
                      {canOpen ? (
                        <Link
                          to="/organisations/$id"
                          params={{ id: r.org.id }}
                          onClick={(e) => e.stopPropagation()}
                          className="font-semibold text-primary hover:underline"
                        >
                          {r.org.name}
                        </Link>
                      ) : (
                        <span className="font-semibold">{r.org.name}</span>
                      )}
                      <div className="text-xs text-muted-foreground md:hidden">{r.org.village}</div>
                      <div className="mt-1 sm:hidden">{type}</div>
                    </td>
                    <td className="hidden sm:table-cell">{type}</td>
                    <td className="hidden md:table-cell">{r.org.village}</td>
                    <td className="text-right tabular">{nf.format(r.producers)}</td>
                    <td className="hidden text-right tabular sm:table-cell">
                      {nf.format(r.members)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon={Network} title={t("cooperatives.fiche.gie.empty.title")}>
          {t("cooperatives.fiche.gie.empty.filtered")}
        </EmptyState>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        {t(`cooperatives.fiche.gie.count.${plural(shown.length)}`, {
          count: shown.length,
          total: rows.length,
        })}
      </p>
    </>
  );
}

// ============ Membres ============

const STATUS_TONE = {
  membre: "success",
  candidat: "info",
  suspendu: "warning",
  sorti: "neutral",
} as const satisfies Record<MembershipStatus, "success" | "info" | "warning" | "neutral">;
const DUE_TONE = {
  "à jour": "success",
  "en retard": "warning",
  "jamais payé": "danger",
  "non exigible": "neutral",
} as const;
const STATUSES: MembershipStatus[] = ["membre", "candidat", "suspendu", "sorti"];

export function MembresTab({ scoop }: { scoop: Scoop }) {
  const { t, tEnum } = useI18n();
  const members = useStore((s) => s.members);
  const users = useStore((s) => s.users);
  const rules = useStore((s) => s.contributionRules);
  const payments = useStore((s) => s.payments);
  const showDues = useCan("contribution.read");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<MembershipStatus | "tous">("tous");

  const rows = useMemo(() => {
    const now = nowIso();
    const rule = rules.find((r) => r.scoopId === scoop.id);
    return members
      .filter((m) => m.scoopId === scoop.id)
      .map((m) => ({
        m,
        user: users.find((u) => u.memberId === m.id),
        dues: memberDues(m, rule, payments, now),
      }))
      .sort((a, b) => a.m.lastName.localeCompare(b.m.lastName, "fr"));
  }, [members, users, rules, payments, scoop.id]);

  const needle = q.trim().toLowerCase();
  const shown = rows.filter(
    (r) =>
      (status === "tous" || r.m.status === status) &&
      (!needle || `${r.m.firstName} ${r.m.lastName} ${r.m.village}`.toLowerCase().includes(needle)),
  );

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <FilterPill
          active={status === "tous"}
          onClick={() => setStatus("tous")}
          count={rows.length}
        >
          {t("cooperatives.fiche.membres.filter.all")}
        </FilterPill>
        {STATUSES.map((s) => (
          <FilterPill
            key={s}
            active={status === s}
            onClick={() => setStatus(status === s ? "tous" : s)}
            count={rows.filter((r) => r.m.status === s).length}
          >
            {tEnum("equipe.status", s)}
          </FilterPill>
        ))}
        <div className="ml-auto w-full sm:w-auto">
          <SearchBox
            value={q}
            onChange={setQ}
            label={t("cooperatives.fiche.membres.search.aria")}
            placeholder={t("cooperatives.fiche.membres.search.placeholder")}
          />
        </div>
      </div>
      {shown.length ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-left text-xs text-muted-foreground">
              <tr>
                <th className="py-2 font-semibold">{t("cooperatives.fiche.membres.col.name")}</th>
                <th className="font-semibold">{t("cooperatives.fiche.membres.col.status")}</th>
                <th className="hidden font-semibold sm:table-cell">
                  {t("cooperatives.fiche.membres.col.account")}
                </th>
                {showDues && (
                  <th className="hidden font-semibold md:table-cell">
                    {t("cooperatives.fiche.membres.col.dues")}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y">
              {shown.map(({ m, user, dues }) => (
                <tr key={m.id}>
                  <td className="py-3 pr-2">
                    <div className="font-semibold">
                      {m.firstName} {m.lastName}
                    </div>
                    <div className="text-xs text-muted-foreground">{m.village}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground sm:hidden">
                      {user ? tEnum("role", user.role) : t("equipe.noAccess")}
                    </div>
                  </td>
                  <td className="pr-2">
                    <Pill tone={STATUS_TONE[m.status]}>{tEnum("equipe.status", m.status)}</Pill>
                  </td>
                  <td className="hidden sm:table-cell">
                    {user ? (
                      <span className={user.active ? "" : "text-muted-foreground"}>
                        {tEnum("role", user.role)}
                        {!user.active && <> {t("equipe.closed")}</>}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">{t("equipe.noAccess")}</span>
                    )}
                  </td>
                  {showDues && (
                    <td className="hidden md:table-cell">
                      {m.status === "membre" ? (
                        <Pill tone={DUE_TONE[dues.state]}>
                          {tEnum("cotisations.state", dues.state)}
                        </Pill>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon={Users} title={t("cooperatives.fiche.membres.empty.title")}>
          {rows.length
            ? t("cooperatives.fiche.membres.empty.filtered")
            : t("cooperatives.fiche.membres.empty.text")}
        </EmptyState>
      )}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          {t(`cooperatives.fiche.membres.count.${plural(shown.length)}`, {
            count: shown.length,
            total: rows.length,
          })}
        </p>
        <BigLink>
          <Link to="/equipe" search={{ scoop: scoop.id }}>
            {t("cooperatives.fiche.membres.openTeam")}
          </Link>
        </BigLink>
      </div>
    </>
  );
}

// ============ Techniciens ============

export function TechniciensTab({ scoop }: { scoop: Scoop }) {
  const { t } = useI18n();
  const users = useStore((s) => s.users);
  const canManageUsers = useCan("user.manage");
  const rows = useMemo(
    () =>
      techniciansOf(users, scoop.id).sort(
        (a, b) => Number(b.active) - Number(a.active) || a.name.localeCompare(b.name, "fr"),
      ),
    [users, scoop.id],
  );

  return (
    <>
      <p className="mb-3 text-sm text-muted-foreground">
        {t("cooperatives.fiche.techniciens.intro")}
      </p>
      {rows.length ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-left text-xs text-muted-foreground">
              <tr>
                <th className="py-2 font-semibold">
                  {t("cooperatives.fiche.techniciens.col.name")}
                </th>
                <th className="hidden font-semibold sm:table-cell">
                  {t("cooperatives.fiche.techniciens.col.email")}
                </th>
                <th className="font-semibold">{t("cooperatives.fiche.techniciens.col.state")}</th>
                <th className="hidden font-semibold md:table-cell">
                  {t("cooperatives.fiche.techniciens.col.scoops")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((u) => (
                <tr key={u.id}>
                  <td className="py-3 pr-2">
                    <div className="font-semibold">{u.name}</div>
                    <div className="break-all text-xs text-muted-foreground sm:hidden">
                      {u.email}
                    </div>
                  </td>
                  <td className="hidden break-all sm:table-cell">{u.email}</td>
                  <td>
                    <Pill tone={u.active ? "success" : "neutral"}>
                      {t(
                        u.active
                          ? "cooperatives.fiche.techniciens.active"
                          : "cooperatives.fiche.techniciens.closed",
                      )}
                    </Pill>
                  </td>
                  <td className="hidden md:table-cell">
                    {t(
                      `cooperatives.fiche.techniciens.scoops.${plural((u.scoopIds ?? []).length)}`,
                      {
                        count: (u.scoopIds ?? []).length,
                      },
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon={UserCog} title={t("cooperatives.fiche.techniciens.empty.title")}>
          {t("cooperatives.fiche.techniciens.empty.text")}
        </EmptyState>
      )}
      {canManageUsers && (
        <BigLink>
          <Link to="/utilisateurs" search={{ q: undefined }}>
            {t("cooperatives.fiche.techniciens.manage")}
          </Link>
        </BigLink>
      )}
    </>
  );
}

// ============ Réunions ============

export function ReunionsTab({ scoop }: { scoop: Scoop }) {
  const { t, tEnum, formatDate } = useI18n();
  const meetings = useStore((s) => s.meetings);
  const rows = useMemo(
    () =>
      sortMeetings(
        meetings.filter((m) => m.scoopId === scoop.id),
        nowIso(),
      ),
    [meetings, scoop.id],
  );
  return (
    <>
      {rows.length ? (
        <ul className="divide-y text-sm">
          {rows.map((m) => (
            <li key={m.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
              <div className="min-w-0">
                <Link
                  to="/reunions/$id"
                  params={{ id: m.id }}
                  className="font-semibold text-primary hover:underline"
                >
                  {m.title}
                </Link>
                <div className="text-xs text-muted-foreground">
                  {tEnum("reunions.kind", m.kind)} ·{" "}
                  {formatDate(m.date, { dateStyle: "medium", timeStyle: "short" })} · {m.place}
                </div>
              </div>
              <Pill
                tone={
                  m.status === "planifiée" ? "info" : m.status === "tenue" ? "success" : "neutral"
                }
              >
                {tEnum("reunions.status", m.status)}
              </Pill>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState icon={CalendarCheck} title={t("cooperatives.fiche.reunions.empty.title")}>
          {t("cooperatives.fiche.reunions.empty.text")}
        </EmptyState>
      )}
      <BigLink>
        <Link to="/reunions" search={{ scoop: scoop.id }}>
          {t("cooperatives.fiche.reunions.all")}
        </Link>
      </BigLink>
    </>
  );
}

// ============ Cotisations ============

export function CotisationsTab({ scoop }: { scoop: Scoop }) {
  const { t, formatDate } = useI18n();
  const members = useStore((s) => s.members);
  const rules = useStore((s) => s.contributionRules);
  const payments = useStore((s) => s.payments);
  const rule = rules.find((r) => r.scoopId === scoop.id);

  const data = useMemo(() => {
    const now = nowIso();
    const mine = members.filter((m) => m.scoopId === scoop.id);
    const late = mine
      .map((m) => ({ m, dues: memberDues(m, rule, payments, now) }))
      .filter((r) => r.dues.state === "en retard" || r.dues.state === "jamais payé")
      .sort((a, b) => b.dues.balance - a.dues.balance);
    return { totals: scoopTotals(mine, rule, payments, now), late };
  }, [members, rule, payments, scoop.id]);
  const { totals, late } = data;

  return (
    <div className="space-y-5">
      <section aria-labelledby="rule-title">
        <h2 id="rule-title" className="font-semibold">
          {t("cooperatives.fiche.cot.rule")}
        </h2>
        {rule ? (
          <>
            <p className="mt-1 text-sm">
              {rule.periodicity === "annuelle"
                ? t("cotisations.rule.summary.annuelle", {
                    amount: nf.format(rule.amount),
                    date: formatDate(
                      new Date(
                        Date.UTC(
                          2000,
                          Number(rule.dueDate.slice(0, 2)) - 1,
                          Number(rule.dueDate.slice(3)),
                        ),
                      ),
                      { day: "numeric", month: "long", timeZone: "UTC" },
                    ),
                  })
                : t("cotisations.rule.summary.mensuelle", { amount: nf.format(rule.amount) })}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <Pill tone={rule.confirmed ? "success" : "warning"}>
                {t(rule.confirmed ? "cotisations.rule.confirmed" : "cotisations.rule.toConfirm")}
              </Pill>
              <span className="text-xs text-muted-foreground">
                {t("cotisations.rule.since", { year: rule.startYear })}
              </span>
            </div>
          </>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">{t("cooperatives.fiche.cot.noRule")}</p>
        )}
      </section>

      {totals.expected > 0 && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <KpiTile label={t("cooperative.dues.rate")} value={`${nf.format(totals.rate)} %`} />
          <KpiTile
            label={t("cooperatives.fiche.cot.expected")}
            value={`${nf.format(totals.expected)} FCFA`}
          />
          <KpiTile
            label={t("cooperatives.fiche.cot.collected")}
            value={`${nf.format(totals.collected)} FCFA`}
          />
          <KpiTile
            label={t("cooperative.dues.late")}
            value={nf.format(totals.late)}
            tone={totals.late ? "warning" : "neutral"}
          />
        </div>
      )}

      <section aria-labelledby="late-title">
        <h2 id="late-title" className="font-semibold">
          {t("cooperatives.fiche.cot.late.title")}
        </h2>
        {late.length ? (
          <>
            <ul className="mt-2 divide-y text-sm">
              {late.slice(0, 10).map(({ m, dues }) => (
                <li key={m.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                  <span className="font-semibold">
                    {m.firstName} {m.lastName}
                  </span>
                  <span className="text-muted-foreground">
                    {t("cooperatives.fiche.cot.late.owes", { amount: nf.format(dues.balance) })}
                  </span>
                </li>
              ))}
            </ul>
            {late.length > 10 && (
              <p className="mt-1 text-sm text-muted-foreground">
                {t(`cooperatives.fiche.cot.late.more.${plural(late.length - 10)}`, {
                  count: late.length - 10,
                })}
              </p>
            )}
          </>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">
            {t("cooperatives.fiche.cot.late.none")}
          </p>
        )}
      </section>

      <BigLink>
        <Link to="/cotisations" search={{ scoop: scoop.id }}>
          {t("cooperatives.fiche.cot.open")}
        </Link>
      </BigLink>
    </div>
  );
}

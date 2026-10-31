import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  CircleAlert,
  Download,
  ExternalLink,
  HandCoins,
  Info,
  MinusCircle,
  Pencil,
  Search,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState, KpiTile, PageHeader, Pill, StatusMark } from "@/components/app/ui-bits";
import { FilterPill } from "@/components/app/FilterPill";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { RowActions } from "@/components/app/RowActions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { actions, useCan, useStore, useScoops } from "@/lib/store";
import { inScope, scopedMembers, scopedPayments, scopedRules } from "@/lib/scope";
import {
  PAYMENT_METHODS,
  PERIODICITIES,
  type ContributionPayment,
  type ContributionRule,
  type Member,
  type PaymentMethod,
  type Periodicity,
} from "@/lib/mock/cooperative";
import {
  memberDues,
  paymentIssues,
  scoopTotals,
  type DueState,
  type MemberDues,
} from "@/lib/contributions";
import { nf } from "@/lib/format";
import { useFormat } from "@/hooks/use-format";
import { useTouched } from "@/hooks/use-touched";
import { useAuditedCsvExport } from "@/hooks/use-audited-csv-export";
import { ReasonDialog } from "@/components/app/ReasonDialog";
import { KpiGrid, Money } from "@/components/app/Kpi";
import { useI18n, type MessageKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cotisations")({
  validateSearch: (s: Record<string, unknown>) => ({
    scoop: typeof s["scoop"] === "string" ? (s["scoop"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Cotisations · Mbay Diaay" },
      {
        name: "description",
        content:
          "Cotisations des membres : règle, paiements, reçus, retards et taux de recouvrement par coopérative.",
      },
      { property: "og:title", content: "Cotisations · Mbay Diaay" },
      { property: "og:description", content: "Suivi des cotisations des membres." },
    ],
  }),
  component: ContributionsRoute,
});

function ContributionsRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="contribution.read" area={t("cotisations.area")}>
      <Contributions />
    </AppShell>
  );
}

const STATE_ICON: Record<DueState, LucideIcon> = {
  "à jour": CheckCircle2,
  "en retard": AlertTriangle,
  "jamais payé": CircleAlert,
  "non exigible": MinusCircle,
};

const STATE_TONE: Record<DueState, "success" | "warning" | "danger" | "neutral"> = {
  "à jour": "success",
  "en retard": "warning",
  "jamais payé": "danger",
  "non exigible": "neutral",
};
const STATE_LABEL: Record<DueState, MessageKey> = {
  "à jour": "cotisations.state.à jour",
  "en retard": "cotisations.state.en retard",
  "jamais payé": "cotisations.state.jamais payé",
  "non exigible": "cotisations.state.non exigible",
};
const STATES: readonly DueState[] = ["à jour", "en retard", "jamais payé", "non exigible"];
const METHOD_LABEL: Record<PaymentMethod, MessageKey> = {
  espèces: "cotisations.method.espèces",
  "mobile money": "cotisations.method.mobile money",
  virement: "cotisations.method.virement",
};
const PERIODICITY_LABEL: Record<Periodicity, MessageKey> = {
  annuelle: "cotisations.periodicity.annuelle",
  mensuelle: "cotisations.periodicity.mensuelle",
};
const ALL = "tous";
const OTHER = "__autre";

interface Row {
  member: Member;
  rule: ContributionRule | undefined;
  dues: MemberDues;
  name: string;
}

function Contributions() {
  const allScoops = useScoops();
  const { t, formatDate } = useI18n();
  const g = Route.useSearch();
  const session = useStore((s) => s.session);
  const members = useStore((s) => s.members);
  const rules = useStore((s) => s.contributionRules);
  const allPayments = useStore((s) => s.payments);
  const canManage = useCan("contribution.manage");
  const [state, setState] = useState<DueState | typeof ALL>(ALL);
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | undefined>();
  const [payFor, setPayFor] = useState<Row | null>(null);
  const [voidFor, setVoidFor] = useState<{ row: Row; paymentId?: string } | null>(null);
  const [ruleFor, setRuleFor] = useState<{ id: string; name: string } | null>(null);
  const now = useMemo(() => new Date().toISOString(), []);

  const payments = useMemo(() => scopedPayments(allPayments, session), [allPayments, session]);
  const scopeRules = useMemo(() => scopedRules(rules, session), [rules, session]);
  /** SCOOP en vue : celle du filtre global, sinon toutes celles du périmètre de la session. */
  const scoops = useMemo(
    () =>
      inScope(
        allScoops.map((s) => ({ scoopId: s.id, id: s.id, name: s.name })),
        session,
      ).filter((s) => !g.scoop || s.id === g.scoop),
    [allScoops, session, g.scoop],
  );

  const rows = useMemo<Row[]>(
    () =>
      scopedMembers(members, session)
        .filter((m) => m.status === "membre" && (!g.scoop || m.scoopId === g.scoop))
        .map((member) => {
          const rule = scopeRules.find((r) => r.scoopId === member.scoopId);
          return {
            member,
            rule,
            dues: memberDues(member, rule, payments, now),
            name: `${member.firstName} ${member.lastName}`,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name, "fr")),
    [members, session, g.scoop, scopeRules, payments, now],
  );

  const totals = useMemo(() => {
    let expected = 0;
    let collected = 0;
    let late = 0;
    for (const s of scoops) {
      const mine = rows.filter((r) => r.member.scoopId === s.id).map((r) => r.member);
      const tt = scoopTotals(
        mine,
        scopeRules.find((r) => r.scoopId === s.id),
        payments,
        now,
      );
      expected += tt.expected;
      collected += tt.collected;
      late += tt.late;
    }
    return {
      expected,
      collected,
      late,
      rate: expected ? Math.round((collected / expected) * 100) : 0,
    };
  }, [scoops, rows, scopeRules, payments, now]);

  const needle = q.trim().toLowerCase();
  const searched = rows.filter((r) => !needle || r.name.toLowerCase().includes(needle));
  const shown = searched.filter((r) => state === ALL || r.dues.state === state);
  const countOf = (s: DueState) => searched.filter((r) => r.dues.state === s).length;
  const noRuleAtAll =
    scoops.length > 0 && scoops.every((s) => !scopeRules.some((r) => r.scoopId === s.id));
  const manyScoops = scoops.length > 1;
  const scoopName = (id: string) => allScoops.find((s) => s.id === id)?.name ?? "";
  const { money } = useFormat();
  const open = openId ? rows.find((r) => r.member.id === openId) : undefined;
  const liveCount = (id: string) =>
    payments.filter((p) => p.memberId === id && p.voided === null).length;

  const exportCsv = useAuditedCsvExport({
    file: "cotisations",
    entity: "Cotisations",
    filtered: state !== ALL || !!needle,
    build: () => ({
      head: ["Membre", "SCOOP", "État", "Attendu", "Payé", "Solde"],
      rows: shown.map((r) => [
        r.name,
        scoopName(r.member.scoopId),
        r.dues.state,
        r.dues.expected,
        r.dues.paid,
        r.dues.balance,
      ]),
      scoopIds: scoops.map((s) => s.id),
    }),
    detail: (n) => `${n} membre(s) (CSV)`,
    toastTitle: t("cotisations.exported"),
    toastDescription: (n) => t("cotisations.exportedCount.autre", { count: n }),
  });

  return (
    <>
      <PageHeader
        eyebrow={t("cotisations.eyebrow")}
        title={t("cotisations.title")}
        description={t("cotisations.description")}
        actions={
          <Button variant="outline" onClick={exportCsv} disabled={!shown.length}>
            <Download className="size-4" />
            {t("cotisations.export")}
          </Button>
        }
      />

      <section className="surface mb-4 p-4" aria-labelledby="cotisations-guide-title">
        <div className="flex flex-wrap items-start gap-3">
          <span
            className="grid size-9 shrink-0 place-items-center rounded-md bg-info-bg text-info-fg"
            aria-hidden
          >
            <Info className="size-4" strokeWidth={2.25} />
          </span>
          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <h2 id="cotisations-guide-title" className="text-sm font-semibold">
                {t("cotisations.guide.title")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("cotisations.guide.lead")}</p>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {STATES.map((s) => (
                <li key={s}>
                  <StatusMark
                    tone={STATE_TONE[s]}
                    icon={STATE_ICON[s]}
                    label={
                      <span className="block">
                        <span className="block">{t(STATE_LABEL[s])}</span>
                        <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                          {t(`cotisations.guide.state.${s}`)}
                        </span>
                      </span>
                    }
                  />
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">{t("cotisations.guide.action")}</p>
          </div>
        </div>
      </section>

      <KpiGrid cols={4} from="xl">
        <KpiTile
          label={t("cotisations.kpi.expected")}
          value={<Money size="kpi" amount={totals.expected} />}
          sub={t("cotisations.kpi.expectedSub.autre", { count: rows.length })}
        />
        <KpiTile
          label={t("cotisations.kpi.collected")}
          value={<Money size="kpi" amount={totals.collected} />}
          sub={t("cotisations.kpi.collectedSub")}
        />
        <KpiTile
          label={t("cotisations.kpi.rate")}
          value={`${nf.format(totals.rate)} %`}
          sub={t("cotisations.kpi.rateSub")}
          tone={
            totals.expected && totals.rate < 50
              ? "danger"
              : totals.expected && totals.rate < 80
                ? "warning"
                : "neutral"
          }
        />
        <KpiTile
          label={t("cotisations.kpi.late")}
          value={nf.format(totals.late)}
          sub={
            totals.late === 0
              ? t("cotisations.kpi.lateSub.zero")
              : t("cotisations.kpi.lateSub.autre", { count: totals.late })
          }
          tone={totals.late ? "warning" : "neutral"}
        />
      </KpiGrid>

      <div className="mb-4 space-y-2">
        {scoops.map((s) => {
          const rule = scopeRules.find((r) => r.scoopId === s.id);
          return (
            <section key={s.id} className="surface flex flex-wrap items-center gap-x-4 gap-y-3 p-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-primary">
                <Wallet className="size-5" />
              </div>
              <div className="min-w-0 flex-1 basis-60">
                <h2 className="text-sm font-semibold">
                  {manyScoops
                    ? t("cotisations.rule.titleScoop", { scoop: s.name })
                    : t("cotisations.rule.title")}
                </h2>
                {rule ? (
                  <>
                    <p className="mt-0.5 text-sm">
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
                        : t("cotisations.rule.summary.mensuelle", {
                            amount: nf.format(rule.amount),
                          })}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <Pill
                        tone={rule.confirmed ? "success" : "warning"}
                        className="whitespace-normal"
                      >
                        {rule.confirmed
                          ? t("cotisations.rule.confirmed")
                          : t("cotisations.rule.toConfirm")}
                      </Pill>
                      <span className="text-xs text-muted-foreground">
                        {t("cotisations.rule.since", { year: rule.startYear })}
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {t("cotisations.rule.none")}
                  </p>
                )}
              </div>
              {canManage && (
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => setRuleFor({ id: s.id, name: s.name })}
                >
                  <Pencil className="size-4" />
                  {rule ? t("cotisations.rule.edit") : t("cotisations.rule.define")}
                </Button>
              )}
            </section>
          );
        })}
      </div>

      {noRuleAtAll ? (
        <div className="surface">
          <EmptyState
            icon={Wallet}
            title={t("cotisations.empty.noRule.title")}
            action={
              canManage && scoops[0] ? (
                <Button onClick={() => setRuleFor({ id: scoops[0]!.id, name: scoops[0]!.name })}>
                  {t("cotisations.rule.define")}
                </Button>
              ) : undefined
            }
          >
            {canManage
              ? t("cotisations.empty.noRule.text")
              : t("cotisations.empty.noRule.readOnly")}
          </EmptyState>
        </div>
      ) : (
        <>
          <div className="surface mb-3 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <div
                className="flex min-w-0 flex-wrap items-center gap-2"
                role="group"
                aria-label={t("cotisations.filter.aria")}
              >
                <FilterPill
                  active={state === ALL}
                  onClick={() => setState(ALL)}
                  count={searched.length}
                >
                  {t("cotisations.filter.all")}
                </FilterPill>
                {STATES.map((s) => {
                  if (s === "non exigible" && countOf(s) === 0 && state !== s) return null;
                  const Icon = STATE_ICON[s];
                  return (
                    <FilterPill
                      key={s}
                      active={state === s}
                      onClick={() => setState(state === s ? ALL : s)}
                      count={countOf(s)}
                      icon={<Icon className="size-3.5" strokeWidth={2.25} aria-hidden />}
                    >
                      {t(STATE_LABEL[s])}
                    </FilterPill>
                  );
                })}
              </div>
              <div className="relative ml-auto w-full sm:w-64">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  aria-label={t("cotisations.search.aria")}
                  placeholder={t("cotisations.search.placeholder")}
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
                    <th className="px-4 py-3 font-semibold">{t("cotisations.col.member")}</th>
                    {manyScoops && (
                      <th className="hidden font-semibold lg:table-cell">
                        {t("cotisations.col.scoop")}
                      </th>
                    )}
                    <th className="font-semibold">{t("cotisations.col.state")}</th>
                    <th className="hidden text-right font-semibold sm:table-cell">
                      {t("cotisations.col.paid")}
                    </th>
                    <th className="hidden pr-4 text-right font-semibold sm:table-cell">
                      {t("cotisations.col.balance")}
                    </th>
                    <th className="w-12 pr-3" />
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {shown.map((r) => (
                    <tr
                      key={r.member.id}
                      tabIndex={0}
                      onClick={() => setOpenId(r.member.id)}
                      onKeyDown={(e) => e.key === "Enter" && setOpenId(r.member.id)}
                      className="cursor-pointer hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
                    >
                      <td className="px-4 py-3">
                        <div className="font-semibold">{r.name}</div>
                        <div className="text-xs text-muted-foreground sm:hidden">
                          {r.dues.balance > 0
                            ? t("cotisations.row.balance", { amount: nf.format(r.dues.balance) })
                            : r.dues.expected > 0
                              ? t("cotisations.row.paidOf", {
                                  paid: nf.format(r.dues.paid),
                                  expected: nf.format(r.dues.expected),
                                })
                              : t("cotisations.row.nothingDue")}
                        </div>
                      </td>
                      {manyScoops && (
                        <td className="hidden lg:table-cell">{scoopName(r.member.scoopId)}</td>
                      )}
                      <td>
                        <Pill tone={STATE_TONE[r.dues.state]} icon={STATE_ICON[r.dues.state]}>
                          {t(STATE_LABEL[r.dues.state])}
                        </Pill>
                      </td>
                      <td className="hidden whitespace-nowrap text-right tabular sm:table-cell">
                        {t("cotisations.row.paidOf", {
                          paid: nf.format(r.dues.paid),
                          expected: nf.format(r.dues.expected),
                        })}
                      </td>
                      <td
                        className={cn(
                          "hidden whitespace-nowrap pr-4 text-right font-semibold tabular sm:table-cell",
                          r.dues.balance > 0 && "text-warning-fg",
                        )}
                      >
                        {money(r.dues.balance)}
                      </td>
                      <td className="pr-3 text-right">
                        <RowActions
                          label={t("cotisations.row.actions")}
                          className="pointer-coarse:size-touch"
                          title={r.name}
                          items={[
                            {
                              label: t("cotisations.row.open"),
                              icon: ExternalLink,
                              onSelect: () => setOpenId(r.member.id),
                            },
                            {
                              label: t("cotisations.row.pay"),
                              icon: HandCoins,
                              perm: "contribution.manage",
                              hidden: !r.rule,
                              onSelect: () => setPayFor(r),
                            },
                            {
                              label: t("cotisations.row.void"),
                              icon: Ban,
                              perm: "contribution.manage",
                              danger: true,
                              hidden: liveCount(r.member.id) === 0,
                              onSelect: () => setVoidFor({ row: r }),
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : rows.length ? (
              <EmptyState
                icon={Search}
                title={t("cotisations.empty.filtered.title")}
                action={
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQ("");
                      setState(ALL);
                    }}
                  >
                    {t("cotisations.empty.reset")}
                  </Button>
                }
              >
                {t("cotisations.empty.filtered.text")}
              </EmptyState>
            ) : (
              <EmptyState icon={Wallet} title={t("cotisations.empty.noMembers.title")}>
                {t("cotisations.empty.noMembers.text")}
              </EmptyState>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {t("cotisations.count.autre", {
              count: shown.length,
              shown: nf.format(shown.length),
              total: nf.format(rows.length),
            })}
          </p>
        </>
      )}

      <MemberSheet
        row={open}
        payments={payments}
        canManage={canManage}
        onClose={() => setOpenId(undefined)}
        onPay={setPayFor}
        onVoid={(row, paymentId) => setVoidFor({ row, paymentId })}
      />
      {payFor && payFor.rule && (
        <PayDialog key={payFor.member.id} row={payFor} onClose={() => setPayFor(null)} />
      )}
      {voidFor && (
        <VoidDialog
          key={`${voidFor.row.member.id}-${voidFor.paymentId ?? ""}`}
          row={voidFor.row}
          paymentId={voidFor.paymentId}
          payments={payments}
          onClose={() => setVoidFor(null)}
        />
      )}
      {ruleFor && (
        <RuleDialog
          key={ruleFor.id}
          scoop={ruleFor}
          rule={scopeRules.find((r) => r.scoopId === ruleFor.id)}
          onClose={() => setRuleFor(null)}
        />
      )}
    </>
  );
}

/** « 2026 » (annuelle) ou « octobre 2026 » (mensuelle). */
function usePeriodLabel() {
  const { formatDate } = useI18n();
  return (period: string) =>
    period.length === 4
      ? period
      : formatDate(new Date(`${period}-01T00:00:00Z`), {
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        });
}

const toAmount = (v: string) => Number(v.replace(/\s/g, ""));

/** Panneau d'un membre : ce qu'il doit, période par période, et tous ses paiements. */
function MemberSheet({
  row,
  payments,
  canManage,
  onClose,
  onPay,
  onVoid,
}: {
  row: Row | undefined;
  payments: ContributionPayment[];
  canManage: boolean;
  onClose: () => void;
  onPay: (r: Row) => void;
  onVoid: (r: Row, paymentId: string) => void;
}) {
  const { t, formatDate } = useI18n();
  const periodLabel = usePeriodLabel();
  const { money, day } = useFormat();
  const mine = useMemo(
    () =>
      row
        ? payments
            .filter((p) => p.memberId === row.member.id)
            .sort((a, b) => b.paidAt.localeCompare(a.paidAt))
        : [],
    [payments, row],
  );

  return (
    <Sheet open={!!row} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        {row && (
          <>
            <SheetHeader>
              <SheetTitle>{row.name}</SheetTitle>
            </SheetHeader>
            <div className="mt-2">
              <Pill tone={STATE_TONE[row.dues.state]} icon={STATE_ICON[row.dues.state]}>
                {t(STATE_LABEL[row.dues.state])}
              </Pill>
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <SumCell label={t("cotisations.sheet.expected")} value={money(row.dues.expected)} />
              <SumCell label={t("cotisations.sheet.paid")} value={money(row.dues.paid)} />
              <SumCell
                label={t("cotisations.sheet.balance")}
                value={money(row.dues.balance)}
                warn={row.dues.balance > 0}
              />
            </dl>
            {canManage &&
              (row.rule ? (
                <Button className="mt-4 w-full" onClick={() => onPay(row)}>
                  <HandCoins className="size-4" />
                  {t("cotisations.sheet.pay")}
                </Button>
              ) : (
                <p className="mt-4 rounded-md bg-muted p-3 text-sm">
                  {t("cotisations.sheet.noRule")}
                </p>
              ))}

            <section className="mt-6 border-t pt-4" aria-labelledby="cot-due-title">
              <h3 id="cot-due-title" className="font-semibold">
                {t("cotisations.sheet.due.title")}
              </h3>
              {row.dues.lines.length ? (
                <ul className="mt-2 divide-y text-sm">
                  {[...row.dues.lines].reverse().map((l) => {
                    const left = Math.max(0, l.expected - l.paid);
                    return (
                      <li key={l.period} className="flex items-center justify-between gap-3 py-2.5">
                        <div>
                          <div className="font-medium capitalize">{periodLabel(l.period)}</div>
                          <div className="text-xs text-muted-foreground">
                            {t("cotisations.sheet.due.line", {
                              paid: nf.format(Math.min(l.paid, l.expected)),
                              expected: nf.format(l.expected),
                            })}
                          </div>
                        </div>
                        {left === 0 ? (
                          <Pill tone="success">{t("cotisations.sheet.due.done")}</Pill>
                        ) : (
                          <span className="whitespace-nowrap text-right font-semibold text-warning-fg tabular">
                            {t("cotisations.sheet.due.left", { amount: nf.format(left) })}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("cotisations.sheet.due.none")}
                </p>
              )}
            </section>

            <section className="mt-6 border-t pt-4" aria-labelledby="cot-hist-title">
              <h3 id="cot-hist-title" className="font-semibold">
                {t("cotisations.sheet.history.title")}
              </h3>
              {mine.length ? (
                <ul className="mt-2 divide-y text-sm">
                  {mine.map((p) => (
                    <li key={p.id} className="py-3" data-voided={p.voided ? "true" : undefined}>
                      <div className="flex items-start justify-between gap-3">
                        <div className={cn(p.voided && "text-muted-foreground line-through")}>
                          <div className="font-semibold tabular">{money(p.amount)}</div>
                          <div className="text-xs capitalize">
                            {t("cotisations.sheet.history.period", {
                              period: periodLabel(p.period),
                            })}
                          </div>
                        </div>
                        {p.voided ? (
                          <Pill tone="neutral">{t("cotisations.sheet.history.voidTag")}</Pill>
                        ) : (
                          canManage && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="pointer-coarse:h-touch"
                              onClick={() => onVoid(row, p.id)}
                            >
                              {t("cotisations.sheet.void")}
                            </Button>
                          )
                        )}
                      </div>
                      <div
                        className={cn(
                          "mt-1 space-y-0.5 text-xs text-muted-foreground",
                          p.voided && "line-through",
                        )}
                      >
                        <div>{t("cotisations.sheet.history.receipt", { receipt: p.receipt })}</div>
                        <div>
                          {t("cotisations.sheet.history.method", {
                            method: t(METHOD_LABEL[p.method]),
                          })}
                        </div>
                        <div>
                          {t("cotisations.sheet.history.by", {
                            name: p.recordedBy,
                            date: day(p.paidAt, "long"),
                          })}
                        </div>
                        {p.note && (
                          <div>{t("cotisations.sheet.history.note", { note: p.note })}</div>
                        )}
                      </div>
                      {p.voided && (
                        <div className="mt-1.5 rounded-md bg-muted p-2 text-xs">
                          <div className="font-medium">
                            {t("cotisations.sheet.history.voided", {
                              date: formatDate(p.voided.at, {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }),
                              name: p.voided.by,
                            })}
                          </div>
                          <div>
                            {t("cotisations.sheet.history.reason", { reason: p.voided.reason })}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("cotisations.sheet.history.none")}
                </p>
              )}
            </section>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function SumCell({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="rounded-md bg-muted p-2.5">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn("mt-0.5 font-semibold tabular", warn && "text-warning-fg")}>{value}</dd>
    </div>
  );
}

/** Enregistrement d'un paiement : période proposée parmi celles qui restent dues, montant déjà rempli. */
function PayDialog({ row, onClose }: { row: Row; onClose: () => void }) {
  const { t } = useI18n();
  const periodLabel = usePeriodLabel();
  const rule = row.rule!;
  const unpaid = row.dues.lines.filter((l) => l.paid < l.expected);
  const leftOf = (period: string) => {
    const l = row.dues.lines.find((x) => x.period === period);
    return l ? Math.max(0, l.expected - l.paid) : rule.amount;
  };
  const first = unpaid[0]?.period ?? OTHER;
  const [choice, setChoice] = useState(first);
  const [other, setOther] = useState("");
  const [amount, setAmount] = useState(String(leftOf(first)));
  const [method, setMethod] = useState<PaymentMethod>("espèces");
  const [note, setNote] = useState("");
  const { touched: tried, touch: tryIt } = useTouched();

  const period = choice === OTHER ? other.trim() : choice;
  const issues = paymentIssues(
    { amount: toAmount(amount), period, memberId: row.member.id },
    rule,
    [row.member.id],
  );
  const errorOf = (f: "amount" | "period") => {
    const i = tried ? issues.find((x) => x.field === f) : undefined;
    return i ? t(i.key) : undefined;
  };

  const submit = () => {
    tryIt();
    if (issues.length) return;
    const value = toAmount(amount);
    const res = actions.recordPayment({
      memberId: row.member.id,
      amount: value,
      period,
      method,
      note,
    });
    if (res.ok) {
      toast.success(t("cotisations.payDialog.toast", { receipt: res.receipt }), {
        description: t("cotisations.payDialog.toastDetail", {
          name: row.name,
          amount: nf.format(value),
          period: periodLabel(period),
        }),
      });
      onClose();
    } else toast.error(res.error);
  };

  return (
    <FormDialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={t("cotisations.payDialog.title")}
      description={t("cotisations.payDialog.description", { name: row.name })}
      cancelLabel={t("cotisations.cancel")}
      submitLabel={t("cotisations.payDialog.submit")}
      onSubmit={submit}
      footerNote={t("cotisations.payDialog.footer")}
    >
      <FormField label={t("cotisations.payDialog.period")}>
        {(c) => (
          <Select
            value={choice}
            onValueChange={(v) => {
              setChoice(v);
              setAmount(String(leftOf(v)));
            }}
          >
            <SelectTrigger id={c.id}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {unpaid.map((l) => (
                <SelectItem key={l.period} value={l.period}>
                  {t("cotisations.payDialog.periodLeft", {
                    period: periodLabel(l.period),
                    amount: nf.format(l.expected - l.paid),
                  })}
                </SelectItem>
              ))}
              <SelectItem value={OTHER}>{t("cotisations.payDialog.periodOther")}</SelectItem>
            </SelectContent>
          </Select>
        )}
      </FormField>
      {choice === OTHER && (
        <FormField
          label={t("cotisations.payDialog.otherLabel")}
          hint={t(`cotisations.payDialog.otherHint.${rule.periodicity}`)}
          error={errorOf("period")}
        >
          {(c) => (
            <Input
              {...c}
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder={rule.periodicity === "annuelle" ? "2026" : "2026-10"}
              inputMode="numeric"
            />
          )}
        </FormField>
      )}
      <FormField
        label={t("cotisations.payDialog.amount")}
        hint={t("cotisations.payDialog.amountHint")}
        error={errorOf("amount")}
      >
        {(c) => (
          <Input
            {...c}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputMode="numeric"
          />
        )}
      </FormField>
      <FormField label={t("cotisations.payDialog.method")}>
        {(c) => (
          <Select value={method} onValueChange={(v) => setMethod(v as PaymentMethod)}>
            <SelectTrigger id={c.id}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_METHODS.map((m) => (
                <SelectItem key={m} value={m}>
                  {t(METHOD_LABEL[m])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>
      <FormField label={t("cotisations.payDialog.note")}>
        {(c) => (
          <Input
            {...c}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("cotisations.payDialog.notePlaceholder")}
          />
        )}
      </FormField>
    </FormDialog>
  );
}

/** Annulation : le paiement reste dans la liste, barré, avec le motif. */
function VoidDialog({
  row,
  paymentId,
  payments,
  onClose,
}: {
  row: Row;
  paymentId: string | undefined;
  payments: ContributionPayment[];
  onClose: () => void;
}) {
  const { t } = useI18n();
  const periodLabel = usePeriodLabel();
  const live = useMemo(
    () =>
      payments
        .filter((p) => p.memberId === row.member.id && p.voided === null)
        .sort((a, b) => b.paidAt.localeCompare(a.paidAt)),
    [payments, row.member.id],
  );
  const [choice, setChoice] = useState(paymentId ?? live[0]?.id ?? "");
  const receipt = live.find((p) => p.id === choice)?.receipt ?? "";

  return (
    <ReasonDialog
      title={t("cotisations.voidDialog.title")}
      description={t("cotisations.voidDialog.description")}
      label={t("cotisations.voidDialog.reason")}
      hint={t("cotisations.voidDialog.reasonHint")}
      tooShortError={t("errors.contribution.reason")}
      cancelLabel={t("cotisations.voidDialog.back")}
      submitLabel={t("cotisations.voidDialog.submit")}
      doneMessage={t("cotisations.voidDialog.done")}
      doneDescription={t("cotisations.voidDialog.doneDetail", { receipt })}
      extraDisabled={!choice}
      onSubmit={(reason) => actions.voidPayment(choice, reason)}
      onClose={onClose}
    >
      <FormField label={t("cotisations.voidDialog.payment")}>
        {(c) => (
          <Select value={choice} onValueChange={setChoice}>
            <SelectTrigger id={c.id}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {live.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {t("cotisations.voidDialog.option", {
                    receipt: p.receipt,
                    amount: nf.format(p.amount),
                    period: periodLabel(p.period),
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>
    </ReasonDialog>
  );
}

const maxDay = (month: number) => new Date(Date.UTC(2000, month, 0)).getUTCDate();

/** Règle de cotisation d'une coopérative : montant, rythme, échéance, confirmation. */
function RuleDialog({
  scoop,
  rule,
  onClose,
}: {
  scoop: { id: string; name: string };
  rule: ContributionRule | undefined;
  onClose: () => void;
}) {
  const { t, formatDate } = useI18n();
  const [amount, setAmount] = useState(rule ? String(rule.amount) : "");
  const [periodicity, setPeriodicity] = useState<Periodicity>(rule?.periodicity ?? "annuelle");
  const [month, setMonth] = useState(rule ? rule.dueDate.slice(0, 2) : "12");
  const [dayText, setDayText] = useState(rule ? String(Number(rule.dueDate.slice(3))) : "31");
  const [startYear, setStartYear] = useState(String(rule?.startYear ?? new Date().getFullYear()));
  const [confirmed, setConfirmed] = useState(rule?.confirmed ?? false);
  const { touched: tried, touch: tryIt } = useTouched();

  const amountOk = toAmount(amount) > 0;
  const day = Number(dayText);
  const dayOk =
    periodicity === "mensuelle" ||
    (Number.isInteger(day) && day >= 1 && day <= maxDay(Number(month)));
  const year = Number(startYear);
  const yearOk = Number.isInteger(year) && year >= 2000 && year <= 2100;

  const submit = () => {
    tryIt();
    if (!amountOk || !dayOk || !yearOk) return;
    const dueDate =
      periodicity === "annuelle"
        ? `${month}-${String(day).padStart(2, "0")}`
        : (rule?.dueDate ?? "12-31");
    const res = actions.setContributionRule(scoop.id, {
      amount: toAmount(amount),
      periodicity,
      dueDate,
      startYear: year,
      confirmed,
    });
    if (res.ok) {
      toast.success(t("cotisations.ruleDialog.saved"));
      onClose();
    } else toast.error(res.error);
  };

  return (
    <FormDialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={t("cotisations.ruleDialog.titleScoop", { scoop: scoop.name })}
      description={t("cotisations.ruleDialog.description")}
      cancelLabel={t("cotisations.cancel")}
      submitLabel={t("cotisations.ruleDialog.submit")}
      onSubmit={submit}
    >
      <FormField
        label={t("cotisations.ruleDialog.amount")}
        hint={t("cotisations.ruleDialog.amountHint")}
        error={tried && !amountOk ? t("cotisations.ruleDialog.invalidAmount") : undefined}
      >
        {(c) => (
          <Input
            {...c}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputMode="numeric"
          />
        )}
      </FormField>
      <FormField label={t("cotisations.ruleDialog.periodicity")}>
        {(c) => (
          <Select value={periodicity} onValueChange={(v) => setPeriodicity(v as Periodicity)}>
            <SelectTrigger id={c.id}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIODICITIES.map((p) => (
                <SelectItem key={p} value={p}>
                  {t(PERIODICITY_LABEL[p])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>
      {periodicity === "annuelle" ? (
        <div className="grid grid-cols-[1fr_6rem] gap-3">
          <FormField label={t("cotisations.ruleDialog.dueMonth")}>
            {(c) => (
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger id={c.id}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={String(i + 1).padStart(2, "0")}>
                      <span className="capitalize">
                        {formatDate(new Date(Date.UTC(2000, i, 1)), {
                          month: "long",
                          timeZone: "UTC",
                        })}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormField>
          <FormField
            label={t("cotisations.ruleDialog.dueDay")}
            error={tried && !dayOk ? t("cotisations.ruleDialog.invalidDay") : undefined}
          >
            {(c) => (
              <Input
                {...c}
                value={dayText}
                onChange={(e) => setDayText(e.target.value)}
                inputMode="numeric"
              />
            )}
          </FormField>
          <p className="col-span-2 -mt-2 text-xs text-muted-foreground">
            {t("cotisations.ruleDialog.dueHint")}
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{t("cotisations.ruleDialog.monthlyHint")}</p>
      )}
      <FormField
        label={t("cotisations.ruleDialog.startYear")}
        error={tried && !yearOk ? t("cotisations.ruleDialog.invalidYear") : undefined}
      >
        {(c) => (
          <Input
            {...c}
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            inputMode="numeric"
          />
        )}
      </FormField>
      <label className="flex cursor-pointer items-start gap-3 rounded-md border p-3">
        <Checkbox
          checked={confirmed}
          onCheckedChange={(v) => setConfirmed(v === true)}
          className="mt-0.5"
        />
        <span className="text-sm">
          <span className="font-medium">{t("cotisations.ruleDialog.confirmed")}</span>
          <span className="mt-0.5 block text-xs text-muted-foreground">
            {t("cotisations.ruleDialog.confirmedHint")}
          </span>
        </span>
      </label>
    </FormDialog>
  );
}

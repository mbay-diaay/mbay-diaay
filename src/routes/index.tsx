import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, FolderOpen, Wallet } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { PageHeader } from "@/components/app/ui-bits";
import { inScope, useStore, useScoops } from "@/lib/store";
import { membershipCounts, producerStatusCounts } from "@/lib/membership";
import { scopedDossiers, scopedMembers, scopedPayments, scopedRules } from "@/lib/scope";
import { memberDues } from "@/lib/contributions";
import { AGE_BANDS, AGE_UNKNOWN, ageAtMost, ageBand, fmtDateTime, nf, nf1 } from "@/lib/format";
import { useIsMobile } from "@/hooks/use-mobile";
import { useI18n } from "@/lib/i18n";
import { useMemo } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord · Mbay Diaay" },
      {
        name: "description",
        content: "Effectifs, répartition et qualité des données des SCOOP Mbay Diaay.",
      },
      { property: "og:title", content: "Tableau de bord · Mbay Diaay" },
      {
        property: "og:description",
        content: "Pilotage des SCOOP : membres, parcelles, qualité des données.",
      },
    ],
  }),
  component: DashboardRoute,
});

function DashboardRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="dashboard.read" area={t("dashboard.area")}>
      <Dashboard />
    </AppShell>
  );
}

function Dashboard() {
  const allScoops = useScoops();
  const { t } = useI18n();
  const session = useStore((s) => s.session);
  const all = useStore((s) => s.producers);
  const allMembers = useStore((s) => s.members);
  const plots = useStore((s) => s.plots);
  const youth = useStore((s) => s.youthMaxAge);
  const audit = useStore((s) => s.audit);
  const dossiers = useStore((s) => s.dossiers);
  const alerts = useStore((s) => s.alerts);
  const rules = useStore((s) => s.contributionRules);
  const payments = useStore((s) => s.payments);
  const narrow = useIsMobile();
  const now = useMemo(() => new Date().toISOString(), []);

  const producers = inScope(
    all.filter((p) => !p.mergedInto),
    session,
  );
  const members = scopedMembers(allMembers, session);
  const counts = membershipCounts(members);
  const prodCounts = producerStatusCounts(producers);
  const ids = useMemo(() => new Set(producers.map((p) => p.id)), [producers]);
  const myPlots = plots.filter((p) => ids.has(p.producerId));
  const toVerify = (arr: typeof producers) => arr.filter((p) => p.quality !== "validé").length;

  const women = producers.filter((p) => p.sex === "F");
  const young = producers.filter((p) => ageAtMost(p.age, youth));
  const hand = producers.filter((p) => p.handicap);
  const pct = (n: number) => (producers.length ? (n / producers.length) * 100 : 0);

  const scopeLabel =
    session?.scope.kind === "consolidé"
      ? t("dashboard.scope.consolidated")
      : t("dashboard.scope.scoop");

  const pendingDossiers = useMemo(() => {
    const mine = scopedDossiers(dossiers, session).filter(
      (d) => d.status === "soumis" || d.status === "en examen",
    );
    return [...mine].sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
  }, [dossiers, session]);

  const openAlerts = useMemo(() => {
    const prodById = new Map(producers.map((p) => [p.id, p]));
    const plotById = new Map(plots.map((p) => [p.id, p]));
    return alerts.filter((a) => {
      if (a.status !== "ouvert") return false;
      const owner =
        a.entity === "producteur"
          ? prodById.get(a.entityId)
          : prodById.get(plotById.get(a.entityId)?.producerId ?? "");
      return !!owner && ids.has(owner.id);
    });
  }, [alerts, producers, plots, ids]);

  const criticalAlerts = openAlerts.filter((a) => a.severity === "élevée").length;

  const lateDues = useMemo(() => {
    const scopeRules = scopedRules(rules, session);
    const pay = scopedPayments(payments, session);
    return members.filter((m) => {
      if (m.status !== "membre") return false;
      const rule = scopeRules.find((r) => r.scoopId === m.scoopId);
      const state = memberDues(m, rule, pay, now).state;
      return state === "en retard" || state === "jamais payé";
    }).length;
  }, [members, rules, payments, session, now]);

  const oldestDays = pendingDossiers[0]
    ? Math.max(
        0,
        Math.floor(
          (Date.now() - new Date(pendingDossiers[0].updatedAt).getTime()) / (24 * 3600 * 1000),
        ),
      )
    : 0;

  const todoCards = [
    {
      key: "dossiers",
      icon: FolderOpen,
      label: t("dashboard.todo.dossiers"),
      value: pendingDossiers.length,
      sub: t("dashboard.todo.dossiersSub", { days: oldestDays }),
      link: (
        <Link
          to="/dossiers"
          search={{ scoop: undefined }}
          className="mt-2 inline-block text-sm font-medium text-primary"
        >
          {t("dashboard.todo.open")}
        </Link>
      ),
    },
    {
      key: "alerts",
      icon: AlertTriangle,
      label: t("dashboard.todo.alerts"),
      value: openAlerts.length,
      sub: t("dashboard.todo.alertsSub", { critical: criticalAlerts }),
      link: (
        <Link
          to="/qualite/alertes"
          search={{ scoop: undefined, campagne: undefined }}
          className="mt-2 inline-block text-sm font-medium text-primary"
        >
          {t("dashboard.todo.open")}
        </Link>
      ),
    },
    {
      key: "dues",
      icon: Wallet,
      label: t("dashboard.todo.dues"),
      value: lateDues,
      sub: t("dashboard.todo.duesSub"),
      link: (
        <Link
          to="/cotisations"
          search={{ scoop: undefined }}
          className="mt-2 inline-block text-sm font-medium text-primary"
        >
          {t("dashboard.todo.open")}
        </Link>
      ),
    },
  ];

  const kpis = [
    {
      label: t("dashboard.kpi.producers"),
      value: nf.format(prodCounts.producers),
      sub: toVerify(producers),
      hint: t("dashboard.kpi.producersHint"),
    },
    {
      label: t("dashboard.kpi.activeMembers"),
      value: nf.format(counts.active),
      sub: 0,
      hint: t("dashboard.kpi.activeMembersHint", { scope: scopeLabel }),
    },
    {
      label: t("dashboard.kpi.women"),
      value: `${nf1.format(pct(women.length))} %`,
      sub: toVerify(women),
    },
    {
      label: t("dashboard.kpi.young", { age: youth }),
      value: nf.format(young.length),
      sub: toVerify(young),
    },
  ];

  const byScoop = allScoops
    .map((s) => {
      const ps = producers.filter((p) => p.scoopId === s.id);
      return {
        name: s.commune,
        F: ps.filter((p) => p.sex === "F").length,
        H: ps.filter((p) => p.sex === "H").length,
      };
    })
    .filter((r) => r.F + r.H > 0);

  const status = [
    {
      name: t("dashboard.status.activeMembers"),
      n: counts.active,
      c: "var(--chart-1)",
    },
    {
      name: t("dashboard.status.listed"),
      n: prodCounts.producers,
      c: "var(--chart-2)",
    },
  ];

  // Conservé pour inclusion secondaire (âge) hors bandeau principal.
  const bands = [...AGE_BANDS, AGE_UNKNOWN].map((b) => ({
    name: b,
    n: producers.filter((p) => ageBand(p.age) === b).length,
  }));
  void hand;
  void myPlots;
  void bands;

  return (
    <>
      <PageHeader
        eyebrow={
          session?.scope.kind === "consolidé"
            ? t("dashboard.eyebrow.consolidated", { count: allScoops.length })
            : t("dashboard.eyebrow.scoop")
        }
        title={t("dashboard.title")}
        description={t("dashboard.description")}
      />

      <section className="mt-6" aria-labelledby="todo-title">
        <h2 id="todo-title" className="mb-3 font-semibold">
          {t("dashboard.todo.title")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {todoCards.map((card) => (
            <div key={card.key} className="surface p-4">
              <div className="flex items-start gap-3">
                <span className="grid size-9 place-items-center rounded-md bg-primary-soft text-primary">
                  <card.icon className="size-4" strokeWidth={2.25} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-muted-foreground">{card.label}</div>
                  <div className="mt-1 text-2xl font-semibold tabular">{nf.format(card.value)}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{card.sub}</div>
                  {card.link}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="surface p-4">
            <div className="text-xs text-muted-foreground">{k.label}</div>
            <div className="mt-1 whitespace-nowrap text-xl font-semibold tabular sm:text-2xl">
              {k.value}
            </div>
            {"hint" in k && k.hint ? (
              <div className="mt-2 text-xs text-muted-foreground">{k.hint}</div>
            ) : null}
            {k.sub > 0 ? (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-warning-fg">
                <span className="size-1.5 rounded-full bg-warning" />
                {t("dashboard.kpi.toVerify", { count: nf.format(k.sub) })}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        <section className="surface p-4 sm:p-5 md:col-span-2">
          <h2 className="font-semibold">{t("dashboard.chart.byScoop")}</h2>
          <div
            className="mt-4"
            style={{ height: narrow ? Math.max(240, byScoop.length * 30 + 24) : 288 }}
          >
            <ResponsiveContainer>
              {narrow ? (
                <BarChart data={byScoop} layout="vertical" margin={{ left: 0, right: 8 }}>
                  <CartesianGrid horizontal={false} stroke="var(--border)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    width={96}
                    interval={0}
                  />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)" }} />
                  <Bar
                    dataKey="F"
                    name={t("dashboard.chart.women")}
                    stackId="a"
                    fill="var(--chart-2)"
                  />
                  <Bar
                    dataKey="H"
                    name={t("dashboard.chart.men")}
                    stackId="a"
                    fill="var(--chart-1)"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              ) : (
                <BarChart data={byScoop} margin={{ left: -20, bottom: 8 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                    height={64}
                    padding={{ left: 28 }}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)" }} />
                  <Bar
                    dataKey="F"
                    name={t("dashboard.chart.women")}
                    stackId="a"
                    fill="var(--chart-2)"
                  />
                  <Bar
                    dataKey="H"
                    name={t("dashboard.chart.men")}
                    stackId="a"
                    fill="var(--chart-1)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </section>
        <section className="surface p-5">
          <h2 className="font-semibold">{t("dashboard.status.title")}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{t("dashboard.status.hint")}</p>
          <div className="h-48">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={status} dataKey="n" innerRadius={50} outerRadius={75} paddingAngle={2}>
                  {status.map((s) => (
                    <Cell key={s.name} fill={s.c} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5 text-sm">
            {status.map((s) => (
              <li key={s.name} className="flex justify-between">
                <span className="flex items-center gap-2">
                  <span className="size-2.5 rounded-sm" style={{ background: s.c }} />
                  {s.name}
                </span>
                <span className="tabular font-medium">{nf.format(s.n)}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="surface p-5 md:col-span-2 xl:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{t("dashboard.activity.title")}</h2>
            <Link
              to="/audit"
              search={{ q: undefined }}
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("dashboard.activity.all")}
            </Link>
          </div>
          <ul className="mt-3 divide-y">
            {audit.slice(0, 6).map((a) => (
              <li
                key={a.id}
                className="flex flex-col gap-0.5 py-2.5 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <span>
                  <span className="font-medium">{a.action}</span> · {a.entity}{" "}
                  <span className="text-muted-foreground">
                    {t("dashboard.activity.by", { user: a.user })}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">{fmtDateTime(a.at)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

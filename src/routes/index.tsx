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
import { AppShell } from "@/components/app/AppShell";
import { PageHeader } from "@/components/app/ui-bits";
import { ModuleCards } from "@/components/app/ModuleCards";
import { inScope, useStore, useScoops } from "@/lib/store";
import { AGE_BANDS, AGE_UNKNOWN, ageAtMost, ageBand, fmtDateTime, nf, nf1 } from "@/lib/format";
import { useIsMobile } from "@/hooks/use-mobile";
import { useI18n } from "@/lib/i18n";

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
  const plots = useStore((s) => s.plots);
  const youth = useStore((s) => s.youthMaxAge);
  const audit = useStore((s) => s.audit);
  const narrow = useIsMobile();
  const producers = inScope(
    all.filter((p) => !p.mergedInto),
    session,
  );
  const ids = new Set(producers.map((p) => p.id));
  const myPlots = plots.filter((p) => ids.has(p.producerId));
  const toVerify = (arr: typeof producers) => arr.filter((p) => p.quality !== "validé").length;

  const women = producers.filter((p) => p.sex === "F");
  const young = producers.filter((p) => ageAtMost(p.age, youth));
  const hand = producers.filter((p) => p.handicap);
  const area = myPlots.reduce((s, p) => s + p.measured, 0);
  const pct = (n: number) => (producers.length ? (n / producers.length) * 100 : 0);

  const kpis = [
    {
      label: t("dashboard.kpi.producers"),
      value: nf.format(producers.length),
      sub: toVerify(producers),
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
    { label: t("dashboard.kpi.handicap"), value: nf.format(hand.length), sub: toVerify(hand) },
    {
      label: t("dashboard.kpi.plots"),
      value: nf.format(myPlots.length),
      sub: myPlots.filter((p) => p.status !== "validée").length,
    },
    {
      label: t("dashboard.kpi.area"),
      value: `${nf.format(Math.round(area))} ha`,
      sub: myPlots.filter((p) => p.status === "à reprendre").length,
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
  const bands = [...AGE_BANDS, AGE_UNKNOWN].map((b) => ({
    name: b,
    n: producers.filter((p) => ageBand(p.age) === b).length,
  }));
  const status = [
    {
      name: t("dashboard.status.members"),
      n: producers.filter((p) => p.status === "membre").length,
      c: "var(--chart-1)",
    },
    {
      name: t("dashboard.status.listed"),
      n: producers.filter((p) => p.status === "recensé").length,
      c: "var(--chart-2)",
    },
  ];

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
      <ModuleCards />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.label} className="surface p-4">
            <div className="text-xs text-muted-foreground">{k.label}</div>
            <div className="mt-1 whitespace-nowrap text-xl font-semibold tabular sm:text-2xl">
              {k.value}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-warning-fg">
              <span className="size-1.5 rounded-full bg-warning" />
              {t("dashboard.kpi.toVerify", { count: nf.format(k.sub) })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        <section className="surface p-4 sm:p-5 md:col-span-2">
          <h2 className="font-semibold">{t("dashboard.chart.byScoop")}</h2>
          {/* Sur téléphone, barres horizontales : les 11 noms de communes restent lisibles sans rotation. */}
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
          <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-chart-2" />
              {t("dashboard.chart.women")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-chart-1" />
              {t("dashboard.chart.men")}
            </span>
          </div>
        </section>
        <section className="surface p-5">
          <h2 className="font-semibold">{t("dashboard.status.title")}</h2>
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
        <section className="surface p-5">
          <h2 className="font-semibold">{t("dashboard.age.title")}</h2>
          <div className="mt-4 space-y-2.5">
            {bands.map((b) => (
              <div key={b.name}>
                <div className="flex justify-between text-xs">
                  <span>
                    {b.name === AGE_UNKNOWN
                      ? t("dashboard.age.unknown")
                      : t("dashboard.age.years", { band: b.name })}
                  </span>
                  <span className="tabular">{nf.format(b.n)}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${pct(b.n)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {t("dashboard.age.note", { age: youth })}
          </p>
        </section>
        <section className="surface p-5 md:col-span-2">
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

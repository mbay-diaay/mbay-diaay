import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Archive,
  Building2,
  CalendarCheck,
  ChevronRight,
  LayoutDashboard,
  MailPlus,
  Network,
  Pencil,
  RotateCcw,
  UserCog,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState, Pill } from "@/components/app/ui-bits";
import { AccountPill } from "@/components/app/ScoopAccount";
import { accountOf, managerOf } from "@/lib/scoop-account";
import { useFicheCounts } from "@/hooks/use-fiche-counts";
import { ScoopFormDialog } from "@/components/app/ScoopFormDialog";
import { ScoopArchiveDialog } from "@/components/app/ScoopArchiveDialog";
import {
  ApercuTab,
  CotisationsTab,
  GieTab,
  MembresTab,
  ReunionsTab,
  TechniciensTab,
} from "@/components/app/CoopFicheTabs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { actions, useCan, useStore } from "@/lib/store";
import { inScope } from "@/lib/scope";
import type { Scoop } from "@/lib/mock/data";
import type { Permission } from "@/lib/permissions";
import { useI18n, type MessageKey } from "@/lib/i18n";

const ONGLETS = ["apercu", "gie", "membres", "techniciens", "reunions", "cotisations"] as const;
type Onglet = (typeof ONGLETS)[number];

export const Route = createFileRoute("/cooperatives/$id")({
  validateSearch: (s: Record<string, unknown>): { onglet?: Onglet | undefined } => ({
    onglet: ONGLETS.find((o) => o === s["onglet"]),
  }),
  head: () => ({
    meta: [
      { title: "Fiche coopérative · Mbay Diaay" },
      {
        name: "description",
        content:
          "Informations, GIE, membres, techniciens, réunions et cotisations d'une coopérative.",
      },
      { property: "og:title", content: "Fiche coopérative · Mbay Diaay" },
      { property: "og:description", content: "Fiche détaillée d'une coopérative." },
    ],
  }),
  component: FicheRoute,
});

function FicheRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm={["scoop.manage", "org.read"]} area={t("cooperatives.fiche.area")}>
      <Fiche />
    </AppShell>
  );
}

function Fiche() {
  const { t } = useI18n();
  const { id } = Route.useParams();
  const session = useStore((s) => s.session);
  const scoop = useStore((s) => s.scoops.find((c) => c.id === id));
  if (!scoop || inScope([{ scoopId: scoop.id }], session).length !== 1)
    return (
      <EmptyState icon={Building2} title={t("cooperatives.fiche.notFound.title")}>
        {t("cooperatives.fiche.notFound.text")}
        <div className="mt-3">
          <Button asChild variant="outline">
            <Link to="/cooperatives" search={{}}>
              {t("cooperatives.fiche.back")}
            </Link>
          </Button>
        </div>
      </EmptyState>
    );
  return <FicheBody scoop={scoop} />;
}

const TAB_ICON: Record<Onglet, LucideIcon> = {
  apercu: LayoutDashboard,
  gie: Network,
  membres: Users,
  techniciens: UserCog,
  reunions: CalendarCheck,
  cotisations: Wallet,
};
const TAB_PERM: Record<Onglet, Permission | undefined> = {
  apercu: undefined,
  gie: "org.read",
  membres: "member.read",
  techniciens: "member.read",
  reunions: "meeting.read",
  cotisations: "contribution.read",
};

function FicheBody({ scoop }: { scoop: Scoop }) {
  const { t, formatDate } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const session = useStore((s) => s.session);
  const users = useStore((s) => s.users);
  const canManage = useCan("scoop.manage");
  const counts = useFicheCounts(scoop.id);
  const [editing, setEditing] = useState(false);
  const [archiving, setArchiving] = useState(false);

  const allowed = ONGLETS.filter((o) => {
    const p = TAB_PERM[o];
    return !p || !!session?.permissions.includes(p);
  });
  const current: Onglet =
    search.onglet && allowed.includes(search.onglet) ? search.onglet : "apercu";

  const manager = managerOf(users, scoop.id);
  const account = accountOf(manager, Date.now());
  const archived = !!scoop.archived;
  const place = [scoop.commune, scoop.region].filter(Boolean).join(", ");
  const count = (o: Onglet) => (o === "apercu" ? undefined : counts[o]);

  const resend = () => {
    if (!manager) return;
    const res = actions.resendInvitation(manager.id);
    if (res.ok) toast.success(t("cooperatives.resend.done", { email: manager.email }));
    else toast.error(res.error);
  };
  const restore = () => {
    const res = actions.restoreScoop(scoop.id);
    if (res.ok)
      toast.success(t("cooperatives.restore.done"), {
        description: t("cooperatives.restore.hint"),
      });
    else toast.error(res.error);
  };

  return (
    <>
      <nav
        aria-label={t("cooperatives.fiche.crumb")}
        className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link
          to="/cooperatives"
          search={{}}
          className="inline-flex min-h-8 items-center hover:text-foreground"
        >
          {t("cooperatives.fiche.crumb")}
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span aria-current="page">{scoop.name}</span>
      </nav>

      <div className="surface flex flex-col gap-4 p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="grid size-14 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
            <Building2 className="size-7" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold">{scoop.name}</h1>
              <Pill tone={archived ? "neutral" : "success"}>
                {t(archived ? "cooperatives.status.archived" : "cooperatives.status.active")}
              </Pill>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {scoop.code
                ? t("cooperatives.codeLabel", { code: scoop.code })
                : t("cooperatives.noCode")}
              {place && <> · {place}</>}
              {scoop.createdAt && (
                <>
                  {" · "}
                  {t("cooperatives.fiche.created", {
                    date: formatDate(scoop.createdAt, { dateStyle: "long" }),
                  })}
                </>
              )}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold">{t("cooperatives.fiche.manager")}</span>
              {manager ? <span>{manager.name}</span> : null}
              <AccountPill account={account} date={manager?.invited?.expiresAt} />
            </div>
          </div>
        </div>
        {canManage && (
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="lg" onClick={() => setEditing(true)}>
              <Pencil className="size-4" />
              {t("cooperatives.row.edit")}
            </Button>
            {manager && !manager.active && manager.invited && (
              <Button variant="outline" size="lg" onClick={resend}>
                <MailPlus className="size-4" />
                {t("cooperatives.row.resend")}
              </Button>
            )}
            {archived ? (
              <Button variant="outline" size="lg" onClick={restore}>
                <RotateCcw className="size-4" />
                {t("cooperatives.row.restore")}
              </Button>
            ) : (
              <Button variant="outline" size="lg" onClick={() => setArchiving(true)}>
                <Archive className="size-4" />
                {t("cooperatives.row.archive")}
              </Button>
            )}
          </div>
        )}
      </div>

      <section className="surface mt-6 p-4 md:p-5">
        <Tabs
          value={current}
          onValueChange={(v) =>
            void navigate({
              search: { onglet: v === "apercu" ? undefined : (v as Onglet) },
              replace: true,
            })
          }
        >
          <TabsList
            aria-label={t("cooperatives.fiche.tabs.aria")}
            className="flex h-auto w-full max-w-full justify-start overflow-x-auto"
          >
            {allowed.map((o) => {
              const Icon = TAB_ICON[o];
              const n = count(o);
              return (
                <TabsTrigger key={o} value={o} className="shrink-0 gap-1.5">
                  <Icon className="size-4" aria-hidden />
                  {t(`cooperatives.fiche.tab.${o}` satisfies MessageKey, { count: n ?? 0 })}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <TabsContent value="apercu" className="mt-4">
            <ApercuTab scoop={scoop} />
          </TabsContent>
          {allowed.includes("gie") && (
            <TabsContent value="gie" className="mt-4">
              <GieTab scoop={scoop} />
            </TabsContent>
          )}
          {allowed.includes("membres") && (
            <TabsContent value="membres" className="mt-4">
              <MembresTab scoop={scoop} />
            </TabsContent>
          )}
          {allowed.includes("techniciens") && (
            <TabsContent value="techniciens" className="mt-4">
              <TechniciensTab scoop={scoop} />
            </TabsContent>
          )}
          {allowed.includes("reunions") && (
            <TabsContent value="reunions" className="mt-4">
              <ReunionsTab scoop={scoop} />
            </TabsContent>
          )}
          {allowed.includes("cotisations") && (
            <TabsContent value="cotisations" className="mt-4">
              <CotisationsTab scoop={scoop} />
            </TabsContent>
          )}
        </Tabs>
      </section>

      {editing && <ScoopFormDialog open onOpenChange={setEditing} scoop={scoop} />}
      {archiving && <ScoopArchiveDialog scoop={scoop} onOpenChange={setArchiving} />}
    </>
  );
}

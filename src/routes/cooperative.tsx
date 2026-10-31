import { useEffect } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { getState, useStore, type Session } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { isConsolidated, scoopIdsOf } from "@/lib/scope";

/**
 * Ancienne page « Ma coopérative » : elle mène à la fiche de la coopérative de la session
 * (une seule dans son périmètre), sinon à la liste des coopératives.
 */
function destination(session: Session | null) {
  const ids = [...scoopIdsOf(session)];
  const only = !isConsolidated(session) && ids.length === 1 ? ids[0] : undefined;
  return only
    ? ({ to: "/cooperatives/$id", params: { id: only }, search: {} } as const)
    : ({ to: "/cooperatives", search: {} } as const);
}

export const Route = createFileRoute("/cooperative")({
  validateSearch: (s: Record<string, unknown>) => ({
    scoop: typeof s["scoop"] === "string" ? (s["scoop"] as string) : undefined,
  }),
  // La session n'est restaurée qu'une fois la page affichée : tant qu'elle manque, le composant prend le relais.
  beforeLoad: ({ search }) => {
    const session = getState().session;
    if (!session) return;
    if (search.scoop)
      throw redirect({ to: "/cooperatives/$id", params: { id: search.scoop }, search: {} });
    throw redirect(destination(session));
  },
  head: () => ({
    meta: [
      { title: "Ma coopérative · Mbay Diaay" },
      { name: "description", content: "Ouvre la fiche de votre coopérative." },
    ],
  }),
  component: CooperativeRedirect,
});

function CooperativeRedirect() {
  const session = useStore((s) => s.session);
  const { scoop } = Route.useSearch();
  const navigate = useNavigate();
  const { t } = useI18n();
  useEffect(() => {
    if (!session) return;
    if (scoop)
      void navigate({ to: "/cooperatives/$id", params: { id: scoop }, search: {}, replace: true });
    else void navigate({ ...destination(session), replace: true });
  }, [session, scoop, navigate]);
  return (
    <AppShell
      perm={["member.read", "scoop.manage", "org.read"]}
      area={t("cooperatives.fiche.area")}
    >
      {null}
    </AppShell>
  );
}

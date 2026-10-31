import { createFileRoute, redirect } from "@tanstack/react-router";
import { QUALITY_SECTIONS } from "@/lib/quality-nav";
import { getState } from "@/lib/store";

/** Entrée unique « Qualité des données » : ouvre la première section autorisée pour la session. */
export const Route = createFileRoute("/qualite/")({
  beforeLoad: () => {
    const perms = getState().session?.permissions ?? [];
    const first = QUALITY_SECTIONS.find((s) => perms.includes(s.perm)) ?? QUALITY_SECTIONS[0]!;
    throw redirect({ to: first.to, replace: true });
  },
});

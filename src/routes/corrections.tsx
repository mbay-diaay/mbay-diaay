import { createFileRoute, redirect } from "@tanstack/react-router";

/** Ancienne adresse : la file des demandes vit désormais dans l'espace Qualité des données. */
export const Route = createFileRoute("/corrections")({
  beforeLoad: () => {
    throw redirect({ to: "/qualite/corrections", replace: true });
  },
});

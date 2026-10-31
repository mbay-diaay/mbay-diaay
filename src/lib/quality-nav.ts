import { inScope, useStore } from "@/lib/store";
import type { Permission } from "@/lib/permissions";

/** Sections de l'espace « Qualité des données », dans l'ordre du menu à plat. */
export const QUALITY_SECTIONS: { to: string; perm: Permission }[] = [
  { to: "/qualite/doublons", perm: "quality.review" },
  { to: "/qualite/alertes", perm: "alert.manage" },
  { to: "/qualite/corrections", perm: "correction.manage" },
];

/** Volumes « à traiter » de chaque section, dans le périmètre de la session. */
export function useQualityCounts() {
  const session = useStore((s) => s.session);
  const producers = useStore((s) => s.producers);
  const plots = useStore((s) => s.plots);
  const cases = useStore((s) => s.cases);
  const alerts = useStore((s) => s.alerts);
  const corrections = useStore((s) => s.corrections);
  const mine = new Set(inScope(producers, session).map((p) => p.id));
  const minePlots = new Set(plots.filter((p) => mine.has(p.producerId)).map((p) => p.id));
  return {
    doublons: cases.filter((c) => c.status === "à examiner" && mine.has(c.aId)).length,
    alertes: alerts.filter(
      (a) => a.status === "ouvert" && (mine.has(a.entityId) || minePlots.has(a.entityId)),
    ).length,
    corrections: corrections.filter((c) => c.status === "en attente" && mine.has(c.producerId))
      .length,
  };
}

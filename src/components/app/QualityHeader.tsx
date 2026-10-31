import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ClipboardCheck, Copy, TriangleAlert } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useQualityCounts } from "@/lib/quality-nav";
import { PageHeader } from "./ui-bits";
import { SectionNav } from "./SectionNav";

/** En-tête commun : titre de l'espace + menu à plat Doublons · Alertes · Demandes de correction. */
export function QualityHeader({
  description,
  actions,
}: {
  description?: ReactNode;
  actions?: ReactNode;
}) {
  const { t } = useI18n();
  const n = useQualityCounts();
  // Les filtres globaux (SCOOP, campagne) suivent l'utilisateur d'une section à l'autre.
  const g = useRouterState({ select: (s) => s.location.search as Record<string, unknown> });
  const scoop = typeof g["scoop"] === "string" ? g["scoop"] : undefined;
  const campagne = typeof g["campagne"] === "string" ? g["campagne"] : undefined;
  return (
    <>
      <PageHeader
        eyebrow={t("qualite.header.eyebrow")}
        title={t("qualite.header.title")}
        description={description}
        actions={actions}
      />
      <SectionNav
        items={[
          {
            key: "doublons",
            label: t("qualite.nav.doublons"),
            icon: Copy,
            to: "/qualite/doublons",
            search: { scoop },
            perm: "quality.review",
            count: n.doublons,
          },
          {
            key: "alertes",
            label: t("qualite.nav.alertes"),
            icon: TriangleAlert,
            to: "/qualite/alertes",
            search: { scoop, campagne },
            perm: "alert.manage",
            count: n.alertes,
          },
          {
            key: "corrections",
            label: t("qualite.nav.corrections"),
            icon: ClipboardCheck,
            to: "/qualite/corrections",
            perm: "correction.manage",
            count: n.corrections,
          },
        ]}
      />
    </>
  );
}

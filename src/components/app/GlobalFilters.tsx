import { useNavigate, useRouterState } from "@tanstack/react-router";
import { ALL, FilterSelect } from "./FilterSelect";
import { useT } from "@/lib/i18n";
import { useCampaigns, useScoops } from "@/lib/store";

/**
 * Périmètres globaux SCOOP + campagne (sélecteurs de portée, pas des filtres de liste).
 * Persistés dans l'URL (?scoop=…&campagne=…) pour partage et navigation entre modules.
 */
export function GlobalFilters() {
  const allScoops = useScoops();
  const campaigns = useCampaigns();
  const t = useT();
  const navigate = useNavigate();
  const search = useRouterState({ select: (s) => s.location.search as Record<string, unknown> });
  const scoop = typeof search["scoop"] === "string" ? (search["scoop"] as string) : ALL;
  const campagne = typeof search["campagne"] === "string" ? (search["campagne"] as string) : ALL;

  const set = (k: "scoop" | "campagne") => (v: string) =>
    void navigate({
      replace: true,
      // @ts-expect-error — recherche générique : chaque écran cible valide ses propres paramètres
      search: (prev: Record<string, unknown>) => ({ ...prev, [k]: v === ALL ? undefined : v }),
    });

  return (
    <div
      className="grid grid-cols-2 gap-2 xl:flex xl:items-center"
      aria-label={t("shell.filters.aria")}
    >
      <FilterSelect
        label={t("shell.filters.scoopLabel")}
        allLabel={t("shell.filters.scoopAll")}
        placeholder={t("shell.filters.scoopAll")}
        value={scoop}
        onChange={set("scoop")}
        options={allScoops.map((s) => [s.id, s.commune] as const)}
        className="h-9 xl:w-48"
      />
      <FilterSelect
        label={t("shell.filters.campaignLabel")}
        allLabel={t("shell.filters.campaignAll")}
        placeholder={t("shell.filters.campaignAll")}
        value={campagne}
        onChange={set("campagne")}
        options={campaigns.map((c) => [c.name, c.name] as const)}
        className="h-9 xl:w-44"
      />
    </div>
  );
}

/** Règles des campagnes (plan 4.8, M4-1). Fonctions pures. */
import type { Campaign, CampaignStatus } from "./mock/agronomy";

const TRANSITIONS: Record<CampaignStatus, readonly CampaignStatus[]> = {
  planifiée: ["en cours", "clôturée"],
  "en cours": ["clôturée"],
  clôturée: [],
};
export const canCampaignTransition = (from: CampaignStatus, to: CampaignStatus) =>
  TRANSITIONS[from].includes(to);

/** Une campagne clôturée ne reçoit plus de nouveau plan ni de nouvelle opération. */
export const isOpenCampaign = (c: Pick<Campaign, "status">) => c.status !== "clôturée";

export interface CampaignInput {
  name: string;
  start: string;
  end: string;
}

export interface CampaignIssue {
  field: "name" | "start" | "end";
  /** Clé de message `errors.campaign.*`. */
  key:
    | "errors.campaign.nameRequired"
    | "errors.campaign.nameTaken"
    | "errors.campaign.dates"
    | "errors.campaign.order";
}

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export function campaignIssues(
  input: CampaignInput,
  campaigns: Campaign[],
  ignoreId?: string,
): CampaignIssue[] {
  const issues: CampaignIssue[] = [];
  if (!input.name.trim()) issues.push({ field: "name", key: "errors.campaign.nameRequired" });
  else if (campaigns.some((c) => c.id !== ignoreId && norm(c.name) === norm(input.name)))
    issues.push({ field: "name", key: "errors.campaign.nameTaken" });
  const okStart = DAY.test(input.start) && !Number.isNaN(Date.parse(input.start));
  const okEnd = DAY.test(input.end) && !Number.isNaN(Date.parse(input.end));
  if (!okStart) issues.push({ field: "start", key: "errors.campaign.dates" });
  if (!okEnd) issues.push({ field: "end", key: "errors.campaign.dates" });
  if (okStart && okEnd && input.end <= input.start)
    issues.push({ field: "end", key: "errors.campaign.order" });
  return issues;
}

export const nextCampaignId = (campaigns: Campaign[]) =>
  `c${Math.max(0, ...campaigns.map((c) => Number(/(\d+)$/.exec(c.id)?.[1] ?? 0))) + 1}`;

/** Jours de saisie tardive acceptés après la fin d'une campagne en cours. */
export const LATE_ENTRY_DAYS = 90;

/**
 * Campagne en cours à une date : celle dont la période contient le jour ; à défaut, une campagne en cours dont la
 * fin date de moins de `LATE_ENTRY_DAYS` jours (saisie tardive). Une date plus ancienne ou antérieure à toute campagne
 * n'est rattachée à aucune : on ne l'attribue pas à la campagne actuelle par défaut.
 */
export function currentCampaign(campaigns: Campaign[], dayIso: string): Campaign | undefined {
  const running = campaigns.filter((c) => c.status === "en cours");
  const inside = running.find((c) => c.start <= dayIso && dayIso <= c.end);
  if (inside) return inside;
  const limit = (end: string) =>
    new Date(Date.parse(`${end}T00:00:00.000Z`) + LATE_ENTRY_DAYS * 86_400_000)
      .toISOString()
      .slice(0, 10);
  return running.find((c) => c.end < dayIso && dayIso <= limit(c.end));
}

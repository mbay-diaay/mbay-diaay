import type { CampaignStatus } from "@/lib/mock/agronomy";
import type { MessageKey } from "@/lib/i18n";

export const CAMPAIGN_STATUS_LABEL: Record<CampaignStatus, MessageKey> = {
  planifiée: "campagnes.status.planifiée",
  "en cours": "campagnes.status.en cours",
  clôturée: "campagnes.status.clôturée",
};

export const CAMPAIGN_TONE: Record<CampaignStatus, "info" | "success" | "neutral"> = {
  planifiée: "info",
  "en cours": "success",
  clôturée: "neutral",
};

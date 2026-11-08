import type { CampaignStatus } from "@/lib/mock/agronomy";
import type { MessageKey } from "@/lib/i18n";
import type { UiPillTone } from "./ui/pill.component";

export const CAMPAIGN_STATUS_LABEL: Record<CampaignStatus, MessageKey> = {
  planifiée: "campagnes.status.planifiée",
  "en cours": "campagnes.status.en cours",
  clôturée: "campagnes.status.clôturée",
};

export const CAMPAIGN_TONE: Record<CampaignStatus, UiPillTone> = {
  planifiée: "info",
  "en cours": "success",
  clôturée: "neutral",
};

export const CAMPAIGN_HISTORY_LABEL: Record<string, MessageKey> = {
  créée: "campagnes.history.créée",
  modifiée: "campagnes.history.modifiée",
  "état : planifiée": "campagnes.history.état : planifiée",
  "état : en cours": "campagnes.history.état : en cours",
  "état : clôturée": "campagnes.history.état : clôturée",
};

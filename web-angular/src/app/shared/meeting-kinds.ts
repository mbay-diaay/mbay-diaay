import type { MessageKey } from "@/lib/i18n";
import type { MeetingKind, MeetingStatus } from "@/lib/mock/cooperative";
import type { UiPillTone } from "./ui/pill.component";

export const MEETING_KIND_LABEL: Record<MeetingKind, MessageKey> = {
  "assemblée générale": "reunions.kind.assemblée générale",
  "assemblée extraordinaire": "reunions.kind.assemblée extraordinaire",
  bureau: "reunions.kind.bureau",
  autre: "reunions.kind.autre",
};

export const MEETING_STATUS_LABEL: Record<MeetingStatus, MessageKey> = {
  planifiée: "reunions.status.planifiée",
  tenue: "reunions.status.tenue",
  annulée: "reunions.status.annulée",
};

export const MEETING_STATUS_TONE: Record<MeetingStatus, UiPillTone> = {
  planifiée: "info",
  tenue: "success",
  annulée: "neutral",
};

import type { MessageKey, TranslateParams } from "@/lib/i18n";
import type { CalendarStatus, CalendarStep, OperationKind } from "@/lib/mock/agronomy";
import type { UiPillTone } from "./ui/pill.component";

export const OPERATION_KIND_LABEL: Record<OperationKind, MessageKey> = {
  "préparation du sol": "calendriers.kind.préparation du sol",
  semis: "calendriers.kind.semis",
  repiquage: "calendriers.kind.repiquage",
  fertilisation: "calendriers.kind.fertilisation",
  irrigation: "calendriers.kind.irrigation",
  désherbage: "calendriers.kind.désherbage",
  traitement: "calendriers.kind.traitement",
  récolte: "calendriers.kind.récolte",
};

export const CALENDAR_STATUS_LABEL: Record<CalendarStatus, MessageKey> = {
  brouillon: "calendriers.status.brouillon",
  validé: "calendriers.status.validé",
  remplacé: "calendriers.status.remplacé",
};

export const CALENDAR_STATUS_TONE: Record<CalendarStatus, UiPillTone> = {
  brouillon: "warning",
  validé: "success",
  remplacé: "neutral",
};

export const CALENDAR_HISTORY_LABEL: Record<string, MessageKey> = {
  créé: "calendriers.history.créé",
  modifié: "calendriers.history.modifié",
  validé: "calendriers.history.validé",
  remplacé: "calendriers.history.remplacé",
};

type Translate = (key: MessageKey, params?: TranslateParams) => string;

export function describeOffset(t: Translate, offsetDays: number): string {
  if (!Number.isFinite(offsetDays)) return "";
  if (offsetDays === 0) return t("calendriers.offset.same");
  return offsetDays < 0
    ? t("calendriers.offset.before.autre", { count: -offsetDays })
    : t("calendriers.offset.after.autre", { count: offsetDays });
}

export const placeableSteps = (steps: CalendarStep[]) =>
  steps.filter((s) => Number.isFinite(s.offsetDays) && Number.isFinite(s.durationDays));

export function cycleDays(steps: CalendarStep[]): number {
  const ok = placeableSteps(steps);
  if (!ok.length) return 0;
  return Math.max(...ok.map((s) => s.offsetDays)) - Math.min(...ok.map((s) => s.offsetDays));
}

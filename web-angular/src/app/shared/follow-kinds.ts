import { daysBetween, type OperationState, type ScheduleRow } from "@/lib/agronomy";
import { fmtDate } from "@/lib/format";
import type { MessageKey, TranslateParams } from "@/lib/i18n";
import type { OperationKind } from "@/lib/mock/agronomy";
import type { UiPillTone } from "./ui/pill.component";

export const KIND_LABEL: Record<OperationKind, MessageKey> = {
  "préparation du sol": "suivi.kind.préparation du sol",
  semis: "suivi.kind.semis",
  repiquage: "suivi.kind.repiquage",
  fertilisation: "suivi.kind.fertilisation",
  irrigation: "suivi.kind.irrigation",
  désherbage: "suivi.kind.désherbage",
  traitement: "suivi.kind.traitement",
  récolte: "suivi.kind.récolte",
};

export const STATE_LABEL: Record<OperationState, MessageKey> = {
  fait: "suivi.state.fait",
  "à faire": "suivi.state.à faire",
  "en retard": "suivi.state.en retard",
};

export const STATE_TONE: Record<OperationState, UiPillTone> = {
  fait: "success",
  "à faire": "info",
  "en retard": "danger",
};

export const todayIso = () => new Date().toISOString().slice(0, 10);

type Translate = (key: MessageKey, params?: TranslateParams) => string;

export function operationDue(t: Translate, row: Pick<ScheduleRow, "dueFrom" | "dueTo">): string | null {
  if (!row.dueFrom || !row.dueTo) return null;
  return row.dueFrom === row.dueTo
    ? t("suivi.due.day", { date: fmtDate(row.dueFrom) })
    : t("suivi.due.range", { from: fmtDate(row.dueFrom), to: fmtDate(row.dueTo) });
}

export function operationLate(
  t: Translate,
  row: Pick<ScheduleRow, "dueTo" | "state">,
  today: string,
): string | null {
  if (row.state !== "en retard" || !row.dueTo) return null;
  return t("suivi.late.autre", { count: Math.max(1, daysBetween(row.dueTo, today)) });
}

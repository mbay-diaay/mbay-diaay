import { AlertTriangle, CheckCircle2, CircleDot, type LucideIcon } from "lucide-react";
import { daysBetween, type OperationState, type ScheduleRow } from "@/lib/agronomy";
import { fmtDate } from "@/lib/format";
import { useI18n, type MessageKey } from "@/lib/i18n";
import type { OperationKind } from "@/lib/mock/agronomy";

/** Libellé de chaque type d'opération (valeur → clé). */
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

/** À faire = info, fait = succès, en retard = danger : le libellé accompagne toujours la couleur. */
export const STATE_TONE: Record<OperationState, "info" | "success" | "danger"> = {
  fait: "success",
  "à faire": "info",
  "en retard": "danger",
};

export const STATE_ICON: Record<OperationState, LucideIcon> = {
  fait: CheckCircle2,
  "à faire": CircleDot,
  "en retard": AlertTriangle,
};

/** Jour d'aujourd'hui (AAAA-MM-JJ), comme le calcule le store pour refuser les dates futures. */
export const todayIso = () => new Date().toISOString().slice(0, 10);

/** Phrases datées d'une opération : fenêtre prévue, écart avec le réel, retard. */
export function useOperationText() {
  const { t } = useI18n();
  return {
    due(row: Pick<ScheduleRow, "dueFrom" | "dueTo">): string | null {
      if (!row.dueFrom || !row.dueTo) return null;
      return row.dueFrom === row.dueTo
        ? t("suivi.due.day", { date: fmtDate(row.dueFrom) })
        : t("suivi.due.range", { from: fmtDate(row.dueFrom), to: fmtDate(row.dueTo) });
    },
    /** Écart d'une étape faite : dans la fenêtre prévue, avant son début ou après sa fin. */
    gap(row: Pick<ScheduleRow, "dueFrom" | "dueTo" | "done">): string | null {
      if (!row.done || !row.dueFrom || !row.dueTo) return null;
      const day = row.done.doneAt;
      if (day < row.dueFrom)
        return t("suivi.gap.before.autre", { count: daysBetween(day, row.dueFrom) });
      if (day > row.dueTo)
        return t("suivi.gap.after.autre", { count: daysBetween(row.dueTo, day) });
      return t("suivi.gap.onTime");
    },
    /** Jours de retard d'une étape non faite dont la fenêtre est passée. */
    late(row: Pick<ScheduleRow, "dueTo" | "state">, today: string): string | null {
      if (row.state !== "en retard" || !row.dueTo) return null;
      return t("suivi.late.autre", { count: Math.max(1, daysBetween(row.dueTo, today)) });
    },
  };
}

/** Libellés et calculs des plans d'exploitation (plan 4.5, P7) : fonctions pures, partagées par les écrans et les tests. */
import type { MessageKey } from "./i18n";
import type { ExploitationPlan, PlanLine, PlanStatus } from "./mock/cooperative";

export const PLAN_TONE: Record<PlanStatus, "neutral" | "info" | "success"> = {
  brouillon: "neutral",
  validé: "info",
  "à jour": "success",
};

/** Étape suivante du plan et verbe d'action ; « à jour » est la dernière. */
/** Libellé de l'état d'un plan (valeur de l'état → clé). */
export const PLAN_STATUS_LABEL: Record<PlanStatus, MessageKey> = {
  brouillon: "plans.status.brouillon",
  validé: "plans.status.validé",
  "à jour": "plans.status.à jour",
};

export const PLAN_NEXT: Record<PlanStatus, { to: PlanStatus; label: MessageKey } | null> = {
  brouillon: { to: "validé", label: "plans.next.valider" },
  validé: { to: "à jour", label: "plans.next.aJour" },
  "à jour": null,
};

export const planArea = (lines: PlanLine[]) =>
  Math.round(lines.reduce((sum, l) => sum + l.areaHa, 0) * 100) / 100;

export const planCrops = (lines: PlanLine[]) => [...new Set(lines.map((l) => l.crop))];

/** Une ligne est exploitable si elle a une culture et une surface positive. */
export const lineIssues = (l: PlanLine): string | null =>
  !l.crop.trim()
    ? "Choisissez une culture."
    : !(l.areaHa > 0)
      ? "La surface doit être supérieure à 0."
      : null;

export const validLines = (lines: PlanLine[]) => lines.every((l) => lineIssues(l) === null);

export const planLabel = (p: Pick<ExploitationPlan, "campaign" | "id">) =>
  `Plan ${p.campaign} (${p.id})`;

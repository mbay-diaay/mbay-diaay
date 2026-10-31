import { fr } from "@/lib/i18n/fr";
import type { MessageKey } from "@/lib/i18n";
import type { DocumentKind, DossierAction, DossierStatus } from "@/lib/mock/cooperative";

export const DOSSIER_TONE: Record<
  DossierStatus,
  "neutral" | "warning" | "info" | "ochre" | "success" | "danger"
> = {
  brouillon: "neutral",
  soumis: "warning",
  "en examen": "info",
  "complément demandé": "ochre",
  approuvé: "success",
  refusé: "danger",
};

/** Libellé de l'état tel que le lit la personne : « soumis » est, pour la coopérative, « à traiter ». */
export const DOSSIER_LABEL: Record<DossierStatus, MessageKey> = {
  brouillon: "dossiers.status.brouillon",
  soumis: "dossiers.status.soumis",
  "en examen": "dossiers.status.en examen",
  "complément demandé": "dossiers.status.complément demandé",
  approuvé: "dossiers.status.approuvé",
  refusé: "dossiers.status.refusé",
};

/** Ce que veut dire l'état, en une phrase simple (liste et fiche). */
export const DOSSIER_HELP: Record<DossierStatus, MessageKey> = {
  brouillon: "dossiers.help.brouillon",
  soumis: "dossiers.help.soumis",
  "en examen": "dossiers.help.en examen",
  "complément demandé": "dossiers.help.complément demandé",
  approuvé: "dossiers.help.approuvé",
  refusé: "dossiers.help.refusé",
};

/** « Où en est ce dossier ? » : l'état en une phrase. */
export const DOSSIER_STATE: Record<DossierStatus, MessageKey> = {
  brouillon: "dossiers.steps.state.brouillon",
  soumis: "dossiers.steps.state.soumis",
  "en examen": "dossiers.steps.state.en examen",
  "complément demandé": "dossiers.steps.state.complément demandé",
  approuvé: "dossiers.steps.state.approuvé",
  refusé: "dossiers.steps.state.refusé",
};

/** « Où en est ce dossier ? » : ce qui vient ensuite. */
export const DOSSIER_NEXT: Record<DossierStatus, MessageKey> = {
  brouillon: "dossiers.steps.next.brouillon",
  soumis: "dossiers.steps.next.soumis",
  "en examen": "dossiers.steps.next.en examen",
  "complément demandé": "dossiers.steps.next.complément demandé",
  approuvé: "dossiers.steps.next.approuvé",
  refusé: "dossiers.steps.next.refusé",
};

export const EVENT_LABEL: Record<DossierAction, MessageKey> = {
  créé: "dossiers.event.créé",
  modifié: "dossiers.event.modifié",
  soumis: "dossiers.event.soumis",
  "pris en examen": "dossiers.event.pris en examen",
  "complément demandé": "dossiers.event.complément demandé",
  "complément fourni": "dossiers.event.complément fourni",
  approuvé: "dossiers.event.approuvé",
  "auto-approuvé": "dossiers.event.auto-approuvé",
  refusé: "dossiers.event.refusé",
  rappel: "dossiers.event.rappel",
};

/** Clés des types de pièce : afficher avec `t(KIND_KEY[kind])`. */
export const KIND_KEY: Record<DocumentKind, MessageKey> = {
  cni: "dossiers.kind.cni",
  photo: "dossiers.kind.photo",
  justificatif: "dossiers.kind.justificatif",
  autre: "dossiers.kind.autre",
  statuts: "dossiers.kind.statuts",
  règlement: "dossiers.kind.reglement",
  "procès-verbal": "dossiers.kind.pv",
  convention: "dossiers.kind.convention",
};

/**
 * Transitoire : libellés français des types de pièce, pour les écrans pas encore migrés
 * (`DocumentList`). À supprimer une fois cet écran passé à `t(KIND_KEY[kind])`.
 */
export const KIND_LABEL: Record<DocumentKind, string> = {
  cni: fr[KIND_KEY.cni],
  photo: fr[KIND_KEY.photo],
  justificatif: fr[KIND_KEY.justificatif],
  autre: fr[KIND_KEY.autre],
  statuts: fr[KIND_KEY.statuts],
  règlement: fr[KIND_KEY.règlement],
  "procès-verbal": fr[KIND_KEY["procès-verbal"]],
  convention: fr[KIND_KEY.convention],
};

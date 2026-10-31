/**
 * Règles du circuit de validation d'un dossier producteur (plan 4.5.8). Fonctions pures : le store les applique,
 * l'interface les lit pour griser un bouton, les tests les rejouent sans écran.
 *
 * Circuit : brouillon, soumis, en examen (ou complément demandé, qui revient au technicien), approuvé ou refusé.
 * Un dossier refusé ne se rouvre pas : le technicien en crée un nouveau.
 */
import type { Producer } from "./mock/data";
import type {
  DossierDraft,
  DossierStatus,
  ProducerDossier,
  RefusalReason,
} from "./mock/cooperative";
import type { RoleId } from "./permissions";
import { tNow } from "./i18n";

export type ActionResult<T = object> =
  ({ ok: true } & T) | { ok: false; error: string; issues?: DraftIssue[] };

/**
 * Rôles qui peuvent approuver un dossier qu'ils ont eux-mêmes créé ou soumis (décision D12) :
 * le rang le plus élevé, qui gère producteurs, techniciens et GIE. L'approbation est alors tracée « auto-approuvé ».
 * Pour tous les autres rôles, la séparation des tâches est absolue.
 */
export const SELF_APPROVE_ROLES: readonly RoleId[] = ["admin", "gestionnaire"];

/**
 * Rôles qui décident (approuver ou refuser) : la secrétaire instruit (examen, demande de complément) mais ne décide
 * pas ; la décision revient au gestionnaire ou au représentant (l'administrateur garde tous les droits).
 */
export const DECIDE_ROLES: readonly RoleId[] = ["admin", "gestionnaire", "representant"];
export const canDecide = (role: RoleId) => DECIDE_ROLES.includes(role);

/** Délai sans réponse après lequel un rappel est envoyé (jamais une approbation automatique). */
export const REMINDER_DAYS = 14;

const TRANSITIONS: Record<DossierStatus, readonly DossierStatus[]> = {
  brouillon: ["soumis"],
  soumis: ["en examen", "complément demandé", "approuvé", "refusé"],
  "en examen": ["complément demandé", "approuvé", "refusé"],
  "complément demandé": ["soumis"],
  approuvé: [],
  refusé: [],
};

export const canTransition = (from: DossierStatus, to: DossierStatus) =>
  TRANSITIONS[from].includes(to);

/** Le technicien ne modifie un dossier que tant qu'il n'est pas entre les mains de la coopérative. */
export const isEditable = (d: Pick<ProducerDossier, "status">) =>
  d.status === "brouillon" || d.status === "complément demandé";

export const isClosed = (d: Pick<ProducerDossier, "status">) =>
  d.status === "approuvé" || d.status === "refusé";

export interface DraftIssue {
  field: keyof DossierDraft | "pièces";
  message: string;
}

const PHONE = /^7[0678]\s?\d{3}\s?\d{2}\s?\d{2}$/;
const CNI = /^[12]\d{12}$/;
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const digits = (s: string) => s.replace(/\D/g, "");

export interface DuplicateHint {
  producerId: string;
  reason: "CNI identique" | "téléphone identique" | "même nom et même village";
}

/** Premier producteur existant qui ressemble au brouillon. Un doublon signale, il ne bloque pas. */
export function findDuplicate(d: DossierDraft, producers: Producer[]): DuplicateHint | null {
  const live = producers.filter((p) => !p.mergedInto);
  const cni = digits(d.cni);
  if (cni) {
    const hit = live.find((p) => digits(p.cni) === cni);
    if (hit) return { producerId: hit.id, reason: "CNI identique" };
  }
  const phone = digits(d.phone);
  if (phone) {
    const hit = live.find((p) => digits(p.phone) === phone);
    if (hit) return { producerId: hit.id, reason: "téléphone identique" };
  }
  const name = norm(`${d.firstName} ${d.lastName}`);
  const hit = live.find(
    (p) => norm(`${p.firstName} ${p.lastName}`) === name && norm(p.village) === norm(d.village),
  );
  return hit ? { producerId: hit.id, reason: "même nom et même village" } : null;
}

/** Contrôles bloquants à la soumission : champs obligatoires, CNI et téléphone valides, âge plausible. */
export function validateDraft(d: DossierDraft, documentCount: number): DraftIssue[] {
  const issues: DraftIssue[] = [];
  if (!d.firstName.trim())
    issues.push({ field: "firstName", message: tNow("errors.dossier.lePrenomEstObligatoire") });
  if (!d.lastName.trim())
    issues.push({ field: "lastName", message: tNow("errors.dossier.leNomEstObligatoire") });
  if (!d.village.trim())
    issues.push({ field: "village", message: tNow("errors.dossier.leVillageEstObligatoire") });
  if (!d.orgId)
    issues.push({ field: "orgId", message: tNow("errors.dossier.lOrganisationEstObligatoire") });
  if (d.age === null || !Number.isInteger(d.age) || d.age < 15 || d.age > 100)
    issues.push({ field: "age", message: tNow("errors.dossier.lAgeDoitEtreCompris") });
  if (!d.phone.trim() || !PHONE.test(d.phone.trim()))
    issues.push({ field: "phone", message: tNow("errors.dossier.leTelephoneDoitRessemblerA") });
  if (!CNI.test(digits(d.cni)))
    issues.push({
      field: "cni",
      message: tNow("errors.dossier.laCniDoitComporter13"),
    });
  if (documentCount === 0)
    issues.push({
      field: "pièces",
      message: tNow("errors.dossier.joignezAuMoinsUnePiece"),
    });
  return issues;
}

export interface Actor {
  email: string;
  role: RoleId;
}

/**
 * Séparation des tâches : qui crée ou soumet un dossier ne peut pas l'approuver, sauf le rang le plus élevé
 * (administrateur, gestionnaire de sa SCOOP), avec la trace « auto-approuvé ». Un refus suit la même règle.
 */
export function decisionCheck(
  d: Pick<ProducerDossier, "createdByEmail" | "submittedByEmail">,
  actor: Actor,
): ActionResult<{ selfDecided: boolean }> {
  const involved = [d.createdByEmail, d.submittedByEmail].includes(actor.email);
  if (!involved) return { ok: true, selfDecided: false };
  if (SELF_APPROVE_ROLES.includes(actor.role)) return { ok: true, selfDecided: true };
  return {
    ok: false,
    error: tNow("errors.dossier.vousAvezCreeOuSoumis"),
  };
}

export const requiresComment = (reason: RefusalReason) => reason === "autre";

/** Dossiers soumis ou en examen sans réponse depuis plus de `REMINDER_DAYS`, pas encore rappelés. */
export function dueReminders(
  dossiers: ProducerDossier[],
  nowIso: string,
  days = REMINDER_DAYS,
): ProducerDossier[] {
  const limit = new Date(nowIso).getTime() - days * 86_400_000;
  return dossiers.filter((d) => {
    if (d.status !== "soumis" && d.status !== "en examen") return false;
    if (d.remindedAt) return false;
    const since = d.history.filter((h) => h.action === "soumis" || h.action === "pris en examen");
    const last = since[since.length - 1]?.at ?? d.submittedAt;
    return !!last && new Date(last).getTime() <= limit;
  });
}

/**
 * Créer, modifier et archiver une coopérative (plan 4.6, M1-1). Fonctions pures.
 * Hypothèses D14 à D16, à valider : nom, commune, code court et gestionnaire obligatoires ; région et date
 * de création facultatives ; archivage seulement (jamais de suppression) ; accès du gestionnaire par invitation.
 */
import type { Scoop } from "./mock/data";
import type { ProducerDossier } from "./mock/cooperative";

const norm = (s: string) =>
  s.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ");

export const normalizeCode = (code: string) => code.trim().toUpperCase();
export const CODE_PATTERN = /^[A-Z]{3,5}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ScoopField =
  "name" | "commune" | "code" | "managerFirstName" | "managerLastName" | "managerEmail";

export interface ScoopIssue {
  field: ScoopField;
  /** Clé de message `errors.scoop.*`. */
  key:
    | "errors.scoop.nameRequired"
    | "errors.scoop.nameTaken"
    | "errors.scoop.communeRequired"
    | "errors.scoop.codeFormat"
    | "errors.scoop.codeTaken"
    | "errors.scoop.managerRequired"
    | "errors.scoop.emailFormat"
    | "errors.scoop.emailTaken";
}

export interface ScoopInput {
  name: string;
  commune: string;
  code: string;
  manager: { firstName: string; lastName: string; email: string };
}

/**
 * Contrôles à la création. `usedEmails` : adresses déjà prises par un compte ou un membre.
 * `ignore` : la coopérative en cours de modification, pour ne pas la comparer à elle-même.
 */
export function scoopIssues(
  input: ScoopInput,
  scoops: Scoop[],
  usedEmails: string[],
  options: { checkManager?: boolean; ignore?: string } = {},
): ScoopIssue[] {
  const issues: ScoopIssue[] = [];
  const others = scoops.filter((s) => s.id !== options.ignore);
  if (!input.name.trim()) issues.push({ field: "name", key: "errors.scoop.nameRequired" });
  else if (others.some((s) => norm(s.name) === norm(input.name)))
    issues.push({ field: "name", key: "errors.scoop.nameTaken" });
  if (!input.commune.trim()) issues.push({ field: "commune", key: "errors.scoop.communeRequired" });
  const code = normalizeCode(input.code);
  if (!CODE_PATTERN.test(code)) issues.push({ field: "code", key: "errors.scoop.codeFormat" });
  else if (others.some((s) => s.code && normalizeCode(s.code) === code))
    issues.push({ field: "code", key: "errors.scoop.codeTaken" });
  if (options.checkManager ?? true) {
    const m = input.manager;
    if (!m.firstName.trim())
      issues.push({ field: "managerFirstName", key: "errors.scoop.managerRequired" });
    if (!m.lastName.trim())
      issues.push({ field: "managerLastName", key: "errors.scoop.managerRequired" });
    if (!EMAIL.test(m.email.trim()))
      issues.push({ field: "managerEmail", key: "errors.scoop.emailFormat" });
    else if (usedEmails.some((e) => e.trim().toLowerCase() === m.email.trim().toLowerCase()))
      issues.push({ field: "managerEmail", key: "errors.scoop.emailTaken" });
  }
  return issues;
}

/** Dossiers qui empêchent d'archiver : un dossier en cours est entre les mains de la coopérative. */
export const IN_PROGRESS = ["soumis", "en examen", "complément demandé"] as const;
export const blockingDossiers = (scoopId: string, dossiers: ProducerDossier[]) =>
  dossiers.filter(
    (d) => d.scoopId === scoopId && (IN_PROGRESS as readonly string[]).includes(d.status),
  );

export const nextScoopId = (scoops: Scoop[]) =>
  `s${Math.max(0, ...scoops.map((s) => Number(/(\d+)$/.exec(s.id)?.[1] ?? 0))) + 1}`;

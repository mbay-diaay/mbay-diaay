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

/** Mots ignorés pour former le code : forme juridique et petits mots. */
const CODE_STOP_WORDS = new Set([
  "SCOOP", "COOP", "COOPERATIVE", "SOCIETE", "GIE", "UNION",
  "DE", "DES", "DU", "LA", "LE", "LES", "ET", "D", "L", "AU", "AUX", "EN", "POUR", "A", "SUR",
]);
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Code court généré à partir du nom (3 à 5 lettres, unique) : le sigle entre parenthèses s'il y en a un
 * (« And Sam Luniou Bokk (ASLB) » → ASLB), sinon les initiales des mots significatifs, complétées par les lettres
 * du premier mot (« SCOOP des maraîchers de Mboro » → MAM). Déjà pris : une lettre est ajoutée ou remplacée.
 * Renvoie "" si le nom ne contient aucun mot utilisable.
 */
export function generateScoopCode(name: string, takenCodes: readonly (string | undefined)[]): string {
  const taken = new Set(takenCodes.filter((code): code is string => !!code).map(normalizeCode));
  const plain = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  const acronym = /\(([A-Z]{3,5})\)/.exec(plain)?.[1];
  const words = plain
    .replace(/\([^)]*\)/g, " ")
    .split(/[^A-Z]+/)
    .filter((word) => word && !CODE_STOP_WORDS.has(word));
  if (!acronym && !words.length) return "";
  let base = acronym ?? words.map((word) => word[0]).join("").slice(0, 5);
  if (base.length < 3) {
    // Trop peu d'initiales : on complète avec les lettres suivantes du premier mot, puis de tous les mots.
    const letters = words.join("");
    const first = words[0] ?? "";
    base = (first.slice(0, 1 + 3 - base.length) + base.slice(1)).slice(0, 5);
    if (base.length < 3) base = (base + letters.slice(base.length)).slice(0, 3);
    if (base.length < 3) base = base.padEnd(3, "X");
  }
  if (!taken.has(base)) return base;
  for (const letter of ALPHABET) {
    const candidate = base.length < 5 ? base + letter : base.slice(0, 4) + letter;
    if (!taken.has(candidate)) return candidate;
  }
  for (const first of ALPHABET)
    for (const second of ALPHABET) {
      const candidate = base.slice(0, 3) + first + second;
      if (!taken.has(candidate)) return candidate;
    }
  return "";
}

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

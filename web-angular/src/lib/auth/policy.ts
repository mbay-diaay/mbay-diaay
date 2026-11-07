import type { MessageKey } from "@/lib/i18n/fr";
import { z } from "zod";

/** Paramètres de sécurité d'authentification. Le serveur applique les mêmes valeurs (voir docs/DEVELOPPEMENT.md, chapitre 5). */
export const OTP_LENGTH = 6;
export const OTP_TTL_MS = 10 * 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;
export const OTP_RESEND_COOLDOWN_MS = 60 * 1000;
export const OTP_MAX_SENDS = 4;
export const LOGIN_MAX_FAILURES = 5;
export const LOGIN_LOCK_MS = 15 * 60 * 1000;
export const RESET_TOKEN_TTL_MS = 10 * 60 * 1000;
export const PASSWORD_MIN_LENGTH = 12;

const emailSchema = z.string().trim().toLowerCase().pipe(z.email());

/** Normalise une adresse (espaces, casse) ; renvoie `null` si elle est invalide. */
export function normalizeEmail(value: string): string | null {
  const parsed = emailSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

/** Mots de passe trop répandus ou propres au projet, refusés quelle que soit leur longueur. */
const COMMON = [
  "motdepasse",
  "password",
  "azerty",
  "qwerty",
  "123456",
  "abcdef",
  "mbaydiaay",
  "cradesc",
  "senegal",
  "dakar",
  "bienvenue",
];

export interface PasswordRule {
  id: "length" | "case" | "digit" | "common" | "personal";
  /** Phrase de la règle : clé du dictionnaire, traduite à l'affichage. */
  key: MessageKey;
  /** Paramètres de la phrase (par exemple la longueur minimale). */
  params?: { count: number };
  ok: boolean;
}

/** Évalue chaque règle séparément, pour pouvoir les afficher une par une pendant la saisie. */
export function evaluatePassword(password: string, email = ""): PasswordRule[] {
  const lower = password.toLowerCase();
  // Chaque morceau de l'identifiant (prénom, nom) d'au moins 3 lettres est interdit dans le mot de passe.
  const parts = (email.split("@")[0]?.toLowerCase() ?? "")
    .split(/[^a-z0-9]+/)
    .filter((p) => p.length >= 3);
  return [
    {
      id: "length",
      key: "auth.password.rule.length",
      params: { count: PASSWORD_MIN_LENGTH },
      ok: password.length >= PASSWORD_MIN_LENGTH,
    },
    {
      id: "case",
      key: "auth.password.rule.case",
      ok: /[a-zà-ÿ]/.test(password) && /[A-ZÀ-Þ]/.test(password),
    },
    { id: "digit", key: "auth.password.rule.digit", ok: /\d/.test(password) },
    {
      id: "common",
      key: "auth.password.rule.common",
      ok: !COMMON.some((c) => lower.includes(c)),
    },
    {
      id: "personal",
      key: "auth.password.rule.personal",
      ok: parts.every((p) => !lower.includes(p)),
    },
  ];
}

export const isPasswordValid = (password: string, email = "") =>
  evaluatePassword(password, email).every((r) => r.ok);

export const isOtpFormat = (code: string) => new RegExp(`^\\d{${OTP_LENGTH}}$`).test(code);

/** `ai*****@cradesc.example` : l'adresse complète n'est jamais réaffichée, et la longueur réelle non plus. */
export function maskEmail(email: string): string {
  const [local = "", domain = ""] = email.split("@");
  return `${local.slice(0, 2)}*****@${domain}`;
}

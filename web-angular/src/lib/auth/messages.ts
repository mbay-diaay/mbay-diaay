import { translate, type TranslateParams } from "@/lib/i18n/translate";
import type { MessageKey } from "@/lib/i18n/fr";
import { AuthError, type AuthErrorCode } from "./types";

/** Traducteur d'une phrase : celui du contexte React, ou le français par défaut (tests, code hors interface). */
export type Translator = (key: MessageKey, params?: TranslateParams) => string;
const french: Translator = (key, params) => translate("fr", key, params);

/** Messages affichés à l'utilisateur. Volontairement génériques : ils ne révèlent jamais si un compte existe. */
const MESSAGE_KEYS: Record<AuthErrorCode, MessageKey> = {
  invalid_credentials: "auth.error.invalid_credentials",
  locked: "auth.error.locked",
  otp_invalid: "auth.error.otp_invalid",
  otp_expired: "auth.error.otp_expired",
  otp_attempts: "auth.error.otp_attempts",
  rate_limited: "auth.error.rate_limited",
  weak_password: "auth.error.weak_password",
  reset_expired: "auth.error.reset_expired",
  invitation_invalid: "auth.error.invitation_invalid",
  unavailable: "auth.error.unavailable",
};

export function formatWait(ms: number, t: Translator = french): string {
  const s = Math.ceil(ms / 1000);
  return s < 90
    ? t("auth.wait.seconds", { n: s })
    : t("auth.wait.minutes", { n: Math.ceil(s / 60) });
}

export function authErrorMessage(error: unknown, t: Translator = french): string {
  if (!(error instanceof AuthError)) return t("auth.error.fallback");
  const base = t(MESSAGE_KEYS[error.code]);
  const { retryAfterMs, attemptsLeft } = error.detail;
  if (retryAfterMs && (error.code === "locked" || error.code === "rate_limited")) {
    return `${base} ${t("auth.error.retryIn", { wait: formatWait(retryAfterMs, t) })}`;
  }
  if (error.code === "otp_invalid" && attemptsLeft !== undefined) {
    return `${base} ${t("auth.error.attemptsLeft.autre", { count: attemptsLeft })}`;
  }
  return base;
}

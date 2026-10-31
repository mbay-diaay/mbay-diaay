import type { RoleId } from "../permissions";

export interface AuthUser {
  email: string;
  name: string;
  role: RoleId;
}

/** Résultat d'une étape qui envoie un code par e-mail. Les dates sont des horodatages en millisecondes. */
export interface CodeSent {
  maskedEmail: string;
  expiresAt: number;
  resendAvailableAt: number;
}

export type AuthErrorCode =
  | "invalid_credentials"
  | "locked"
  | "otp_invalid"
  | "otp_expired"
  | "otp_attempts"
  | "rate_limited"
  | "weak_password"
  | "reset_expired"
  | "invitation_invalid"
  | "unavailable";

export class AuthError extends Error {
  constructor(
    readonly code: AuthErrorCode,
    readonly detail: { retryAfterMs?: number; attemptsLeft?: number } = {},
  ) {
    super(code);
    this.name = "AuthError";
  }
}

/**
 * Contrat d'authentification entre l'interface et le serveur.
 * Le service de démonstration l'implémente en mémoire ; l'API réelle le remplacera sans changer les écrans.
 */
export interface AuthService {
  /** Étape 1 : e-mail et mot de passe. Envoie le code à usage unique par e-mail. */
  signIn(email: string, password: string): Promise<CodeSent & { challengeId: string }>;
  /** Étape 2 : valide le code et ouvre la session. */
  verifyOtp(challengeId: string, code: string): Promise<AuthUser>;
  resendOtp(challengeId: string): Promise<CodeSent>;
  /** Répond toujours de la même façon, que le compte existe ou non (pas d'énumération de comptes). */
  requestPasswordReset(email: string): Promise<CodeSent>;
  verifyResetCode(email: string, code: string): Promise<{ resetToken: string }>;
  resetPassword(resetToken: string, newPassword: string): Promise<void>;
  /** Invitation à usage unique : nom et adresse masquée de la personne invitée, ou erreur si le lien n'est plus valable. */
  invitationInfo(token: string): Promise<{ name: string; email: string; maskedEmail: string }>;
  /** Choix du premier mot de passe : active le compte et détruit le lien (usage unique). */
  acceptInvitation(token: string, newPassword: string): Promise<AuthUser>;
}

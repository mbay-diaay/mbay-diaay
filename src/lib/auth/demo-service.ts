import type { RoleId } from "../permissions";
import {
  LOGIN_LOCK_MS,
  LOGIN_MAX_FAILURES,
  OTP_LENGTH,
  OTP_MAX_ATTEMPTS,
  OTP_MAX_SENDS,
  OTP_RESEND_COOLDOWN_MS,
  OTP_TTL_MS,
  RESET_TOKEN_TTL_MS,
  isOtpFormat,
  isPasswordValid,
  maskEmail,
  normalizeEmail,
} from "./policy";
import { AuthError, type AuthService, type AuthUser, type CodeSent } from "./types";

/** Mot de passe commun à tous les comptes fictifs. N'existe qu'en mode démonstration. */
export const DEMO_PASSWORD = "Demonstration2026";

export const DEMO_ACCOUNTS: (AuthUser & { label: string })[] = [
  {
    email: "aissatou.ndiaye@cradesc.example",
    name: "Aïssatou Ndiaye",
    role: "admin",
    label: "Administrateur CRADESC",
  },
  {
    email: "babacar.fall@scoop-kms.example",
    name: "Babacar Fall",
    role: "gestionnaire",
    label: "Gestionnaire de SCOOP",
  },
  {
    email: "ousmane.gueye@uscn.example",
    name: "Ousmane Guèye",
    role: "faitiere",
    label: "Faîtière (USCN)",
  },
  {
    email: "fatou.sarr@cradesc.example",
    name: "Fatou Sarr",
    role: "technicien",
    label: "Technicien",
  },
  {
    email: "moussa.diouf@scoop-kms.example",
    name: "Moussa Diouf",
    role: "representant",
    label: "Représentant de SCOOP",
  },
  {
    email: "aminata.ba@scoop-kms.example",
    name: "Aminata Bâ",
    role: "secretaire",
    label: "Secrétaire de SCOOP",
  },
  {
    email: "ibrahima.seck@scoop-kms.example",
    name: "Ibrahima Seck",
    role: "ventes",
    label: "Responsable des ventes",
  },
  {
    email: "rokhaya.diallo@scoop-kms.example",
    name: "Rokhaya Diallo",
    role: "rapports",
    label: "Responsable des rapports",
  },
];

export interface DemoMail {
  id: number;
  to: string;
  purpose: "connexion" | "reinitialisation";
  code: string;
  at: number;
}

/** Courriels simulés : remplace l'envoi réel pour que la démonstration reste autonome. */
export interface DemoMailbox {
  latest(): DemoMail | undefined;
  subscribe(listener: () => void): () => void;
}

interface Account {
  name: string;
  role: RoleId;
  password: string;
}
interface CodeState {
  email: string;
  code: string;
  expiresAt: number;
  attempts: number;
  sends: number;
  lastSentAt: number;
}

export interface DemoOptions {
  now?: () => number;
  /** Latence simulée, pour que les états de chargement soient visibles. */
  latencyMs?: number;
  enabled?: boolean;
  /** Compte désactivé par un administrateur : refusé comme un mauvais mot de passe, sans le révéler. */
  isActive?: (email: string) => boolean;
}

function randomDigits(length: number): string {
  // Tirage par rejet : chaque chiffre est équiprobable.
  let out = "";
  const buf = new Uint8Array(1);
  while (out.length < length) {
    globalThis.crypto.getRandomValues(buf);
    if (buf[0]! < 250) out += String(buf[0]! % 10);
  }
  return out;
}
function randomToken(): string {
  const buf = new Uint8Array(24);
  globalThis.crypto.getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Fenêtre de comptage des envois de code de réinitialisation, par adresse. */
const RESET_WINDOW_MS = 60 * 60 * 1000;

export function createDemoAuthService(options: DemoOptions = {}): AuthService & {
  mailbox: DemoMailbox;
  outbox: readonly DemoMail[];
  registerInvitation(user: AuthUser, expiresAt: number): string;
} {
  const now = options.now ?? Date.now;
  const latency = options.latencyMs ?? 0;
  const enabled = options.enabled ?? true;
  const isActive = options.isActive ?? (() => true);
  const wait = () =>
    latency ? new Promise<void>((r) => setTimeout(r, latency)) : Promise.resolve();

  const accounts = new Map<string, Account>(
    DEMO_ACCOUNTS.map((a) => [a.email, { name: a.name, role: a.role, password: DEMO_PASSWORD }]),
  );
  // Compteur d'échecs par identifiant saisi, qu'il existe ou non : le verrouillage ne révèle rien.
  const failures = new Map<string, { count: number; lockedUntil: number }>();
  const challenges = new Map<string, CodeState>();
  const resets = new Map<string, CodeState>();
  const resetSends = new Map<string, number[]>();
  const resetTokens = new Map<string, { email: string; expiresAt: number }>();
  const invitations = new Map<
    string,
    { email: string; name: string; role: RoleId; expiresAt: number }
  >();
  const outbox: DemoMail[] = [];
  const listeners = new Set<() => void>();

  const send = (to: string, purpose: DemoMail["purpose"], code: string) => {
    outbox.push({ id: outbox.length + 1, to, purpose, code, at: now() });
    listeners.forEach((l) => l());
  };
  const issue = (email: string, previous?: CodeState): CodeState => {
    const code = randomDigits(OTP_LENGTH);
    const t = now();
    return {
      email,
      code,
      expiresAt: t + OTP_TTL_MS,
      attempts: 0,
      sends: (previous?.sends ?? 0) + 1,
      lastSentAt: t,
    };
  };
  const sentInfo = (email: string, s: CodeState): CodeSent => ({
    maskedEmail: maskEmail(email),
    expiresAt: s.expiresAt,
    resendAvailableAt: s.lastSentAt + OTP_RESEND_COOLDOWN_MS,
  });
  const guard = () => {
    if (!enabled) throw new AuthError("unavailable");
  };
  /** Contrôle commun de saisie d'un code : péremption, nombre d'essais, comparaison. */
  const checkCode = (store: Map<string, CodeState>, key: string, code: string): CodeState => {
    const s = store.get(key);
    if (!s || now() > s.expiresAt) {
      store.delete(key);
      throw new AuthError("otp_expired");
    }
    if (!isOtpFormat(code) || code !== s.code) {
      s.attempts += 1;
      if (s.attempts >= OTP_MAX_ATTEMPTS) {
        store.delete(key);
        throw new AuthError("otp_attempts");
      }
      throw new AuthError("otp_invalid", { attemptsLeft: OTP_MAX_ATTEMPTS - s.attempts });
    }
    store.delete(key);
    return s;
  };
  const resend = (
    store: Map<string, CodeState>,
    key: string,
    purpose: DemoMail["purpose"],
  ): CodeSent => {
    const s = store.get(key);
    if (!s || now() > s.expiresAt) throw new AuthError("otp_expired");
    const remaining = s.lastSentAt + OTP_RESEND_COOLDOWN_MS - now();
    if (remaining > 0) throw new AuthError("rate_limited", { retryAfterMs: remaining });
    if (s.sends >= OTP_MAX_SENDS) throw new AuthError("rate_limited", { retryAfterMs: OTP_TTL_MS });
    const next = issue(s.email, s);
    store.set(key, next);
    send(s.email, purpose, next.code);
    return sentInfo(s.email, next);
  };

  return {
    outbox,
    mailbox: {
      latest: () => outbox[outbox.length - 1],
      subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
    },

    async signIn(rawEmail, password) {
      guard();
      await wait();
      const email = normalizeEmail(rawEmail) ?? rawEmail.trim().toLowerCase();
      const f = failures.get(email) ?? { count: 0, lockedUntil: 0 };
      if (f.lockedUntil > now())
        throw new AuthError("locked", { retryAfterMs: f.lockedUntil - now() });
      const account = accounts.get(email);
      if (!account || account.password !== password || !isActive(email)) {
        f.count += 1;
        if (f.count >= LOGIN_MAX_FAILURES) {
          f.count = 0;
          f.lockedUntil = now() + LOGIN_LOCK_MS;
        }
        failures.set(email, f);
        throw new AuthError("invalid_credentials");
      }
      failures.delete(email);
      const challengeId = randomToken();
      const state = issue(email);
      challenges.set(challengeId, state);
      send(email, "connexion", state.code);
      return { challengeId, ...sentInfo(email, state) };
    },

    async verifyOtp(challengeId, code) {
      guard();
      await wait();
      const s = checkCode(challenges, challengeId, code);
      const account = accounts.get(s.email);
      if (!account || !isActive(s.email)) throw new AuthError("otp_expired");
      return { email: s.email, name: account.name, role: account.role };
    },

    async resendOtp(challengeId) {
      guard();
      await wait();
      return resend(challenges, challengeId, "connexion");
    },

    async requestPasswordReset(rawEmail) {
      guard();
      await wait();
      const email = normalizeEmail(rawEmail) ?? rawEmail.trim().toLowerCase();
      const known = accounts.has(email);
      const previous = resets.get(email);
      // Envois de l'heure écoulée : tenus à part du code en cours, pour qu'épuiser les essais d'un code
      // ne remette jamais le compteur à zéro (sinon : cycles de 5 essais à l'infini).
      const recent = (resetSends.get(email) ?? []).filter((t) => now() - t < RESET_WINDOW_MS);
      const throttled =
        recent.length >= OTP_MAX_SENDS ||
        (previous && previous.lastSentAt + OTP_RESEND_COOLDOWN_MS > now());
      if (throttled) {
        // Demande trop rapprochée ou trop fréquente : même réponse, aucun nouveau code.
        return {
          maskedEmail: maskEmail(email),
          expiresAt: now() + OTP_TTL_MS,
          resendAvailableAt: now() + OTP_RESEND_COOLDOWN_MS,
        };
      }
      // Un compte inconnu reçoit un état de code « fantôme » (aucun courriel) : la saisie d'un code se comporte
      // exactement comme pour un vrai compte, et ne permet pas de savoir si l'adresse existe.
      const state = issue(email, previous);
      resets.set(email, state);
      resetSends.set(email, [...recent, now()]);
      if (known) send(email, "reinitialisation", state.code);
      return sentInfo(email, state);
    },

    async verifyResetCode(rawEmail, code) {
      guard();
      await wait();
      const email = normalizeEmail(rawEmail) ?? rawEmail.trim().toLowerCase();
      checkCode(resets, email, code);
      const resetToken = randomToken();
      resetTokens.set(resetToken, { email, expiresAt: now() + RESET_TOKEN_TTL_MS });
      return { resetToken };
    },

    /**
     * Démonstration seulement : enregistre l'invitation émise par l'administrateur et renvoie son jeton.
     * Idempotent pour une même invitation (même adresse, même échéance). L'API réelle envoie le courriel côté serveur.
     */
    registerInvitation(user: AuthUser, expiresAt: number): string {
      for (const [token, i] of invitations)
        if (i.email === user.email && i.expiresAt === expiresAt) return token;
      for (const [token, i] of invitations) if (i.email === user.email) invitations.delete(token);
      const token = randomToken();
      invitations.set(token, { ...user, expiresAt });
      return token;
    },

    async invitationInfo(token) {
      guard();
      await wait();
      const i = invitations.get(token);
      if (!i || now() > i.expiresAt) {
        invitations.delete(token);
        throw new AuthError("invitation_invalid");
      }
      return { name: i.name, email: i.email, maskedEmail: maskEmail(i.email) };
    },

    async acceptInvitation(token, newPassword) {
      guard();
      await wait();
      const i = invitations.get(token);
      if (!i || now() > i.expiresAt) {
        invitations.delete(token);
        throw new AuthError("invitation_invalid");
      }
      if (!isPasswordValid(newPassword, i.email)) throw new AuthError("weak_password");
      accounts.set(i.email, { name: i.name, role: i.role, password: newPassword });
      invitations.delete(token); // usage unique
      return { email: i.email, name: i.name, role: i.role };
    },

    async resetPassword(resetToken, newPassword) {
      guard();
      await wait();
      const t = resetTokens.get(resetToken);
      if (!t || now() > t.expiresAt) {
        resetTokens.delete(resetToken);
        throw new AuthError("reset_expired");
      }
      if (!isPasswordValid(newPassword, t.email)) throw new AuthError("weak_password");
      const account = accounts.get(t.email);
      if (!account) throw new AuthError("reset_expired");
      account.password = newPassword;
      failures.delete(t.email);
      resetTokens.delete(resetToken); // usage unique
    },
  };
}

import { apiFetch, ApiError } from "../api/client";
import { clearTokens, setTokens } from "../api/tokens";
import type { RoleId } from "../permissions";
import { AuthError, type AuthService, type AuthUser, type CodeSent } from "./types";

type SignInResponse = CodeSent & { challengeId: string; demoHint?: string };
type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; name: string; role: RoleId; scoopId: string | null };
};

function mapAuthError(e: unknown): never {
  if (e instanceof ApiError) {
    const map: Record<string, ConstructorParameters<typeof AuthError>[0]> = {
      INVALID_CREDENTIALS: "invalid_credentials",
      OTP_INVALID: "otp_invalid",
      OTP_EXPIRED: "otp_expired",
      OTP_ATTEMPTS: "otp_attempts",
      RATE_LIMITED: "rate_limited",
      REFRESH_INVALID: "reset_expired",
    };
    const code = map[e.code] ?? "unavailable";
    const detail: { retryAfterMs?: number; attemptsLeft?: number } = {};
    if (e.details && typeof e.details === "object" && "retryAfterMs" in e.details) {
      detail.retryAfterMs = Number((e.details as { retryAfterMs: number }).retryAfterMs);
    }
    throw new AuthError(code, detail);
  }
  throw new AuthError("unavailable");
}

/**
 * Implémentation AuthService → API NestJS (`mbay-diaay-api`).
 * Les écrans login / OTP restent inchangés.
 */
export function createApiAuthService(): AuthService {
  return {
    async signIn(email, password) {
      try {
        return await apiFetch<SignInResponse>("/auth/sign-in", {
          method: "POST",
          body: { email, password },
          auth: false,
        });
      } catch (e) {
        mapAuthError(e);
      }
    },

    async verifyOtp(challengeId, code) {
      try {
        const data = await apiFetch<TokenResponse>("/auth/otp/verify", {
          method: "POST",
          body: { challengeId, code },
          auth: false,
        });
        setTokens(data.accessToken, data.refreshToken);
        const user: AuthUser = {
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
        };
        return user;
      } catch (e) {
        mapAuthError(e);
      }
    },

    async resendOtp(challengeId) {
      try {
        return await apiFetch<CodeSent>("/auth/otp/resend", {
          method: "POST",
          body: { challengeId },
          auth: false,
        });
      } catch (e) {
        mapAuthError(e);
      }
    },

    async requestPasswordReset(_email) {
      // Pas encore exposé côté API lot 1 — réponse neutre.
      const now = Date.now();
      return {
        maskedEmail: "***",
        expiresAt: now + 600_000,
        resendAvailableAt: now + 30_000,
      };
    },

    async verifyResetCode() {
      throw new AuthError("unavailable");
    },

    async resetPassword() {
      throw new AuthError("unavailable");
    },

    async invitationInfo() {
      throw new AuthError("invitation_invalid");
    },

    async acceptInvitation() {
      throw new AuthError("invitation_invalid");
    },
  };
}

export function apiLogout() {
  clearTokens();
  void apiFetch("/auth/logout", { method: "POST", body: {}, auth: false }).catch(() => undefined);
}

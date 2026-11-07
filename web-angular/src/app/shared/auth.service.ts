import { Injectable } from "@angular/core";
import {
  DEMO_ACCOUNTS,
  DEMO_PASSWORD,
  authService as sharedAuth,
  demoMailbox,
  pendingInvitationLinks as sharedPendingLinks,
  type InvitationLink,
} from "@/lib/auth";

/**
 * Injection Angular autour de `src/lib/auth` (même bascule démo / API que React) :
 * - `VITE_API_URL` → NestJS (`createApiAuthService`)
 * - sinon → démonstration en mémoire si `VITE_DEMO_MODE`
 */
@Injectable({ providedIn: "root" })
export class AuthService {
  readonly mailbox = demoMailbox;

  signIn(email: string, password: string) {
    return sharedAuth.signIn(email, password);
  }

  verifyOtp(challengeId: string, code: string) {
    return sharedAuth.verifyOtp(challengeId, code);
  }

  resendOtp(challengeId: string) {
    return sharedAuth.resendOtp(challengeId);
  }

  requestPasswordReset(email: string) {
    return sharedAuth.requestPasswordReset(email);
  }

  verifyResetCode(email: string, code: string) {
    return sharedAuth.verifyResetCode(email, code);
  }

  resetPassword(resetToken: string, newPassword: string) {
    return sharedAuth.resetPassword(resetToken, newPassword);
  }

  invitationInfo(token: string) {
    return sharedAuth.invitationInfo(token);
  }

  acceptInvitation(token: string, newPassword: string) {
    return sharedAuth.acceptInvitation(token, newPassword);
  }

  pendingInvitationLinks(): InvitationLink[] {
    return sharedPendingLinks();
  }
}

export { DEMO_ACCOUNTS, DEMO_PASSWORD };
export type { InvitationLink };

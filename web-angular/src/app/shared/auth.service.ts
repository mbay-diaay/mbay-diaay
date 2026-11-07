import { Injectable } from "@angular/core";
import { isApiMode } from "@/lib/api/config";
import { DEMO_MODE } from "@/lib/auth/config";
import { createDemoAuthService, DEMO_ACCOUNTS, DEMO_PASSWORD } from "@/lib/auth/demo-service";
import { AuthError, type AuthService as AuthServiceContract } from "@/lib/auth/types";
import { actions, getState } from "@/lib/store";

export interface InvitationLink {
  email: string;
  name: string;
  token: string;
  expiresAt: number;
}

/**
 * Angular port of src/lib/auth/index.ts. Now that the real store is ported
 * (src/lib/store.ts, via StoreService), this matches the React wrapper
 * exactly: `isActive` reads real user records, and `acceptInvitation` really
 * activates the invited account. (No API-mode branch is wired up yet — this
 * app has no backend configured, so `isApiMode()` is always false here,
 * same as the React app without `VITE_API_URL` set.)
 */
@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly demo = createDemoAuthService({
    latencyMs: 450,
    enabled: DEMO_MODE && !isApiMode(),
    isActive: (email) => getState().users.find((u) => u.email === email)?.active ?? true,
  });

  readonly mailbox = this.demo.mailbox;

  signIn(email: string, password: string) {
    return this.demo.signIn(email, password);
  }

  verifyOtp(challengeId: string, code: string) {
    return this.demo.verifyOtp(challengeId, code);
  }

  resendOtp(challengeId: string) {
    return this.demo.resendOtp(challengeId);
  }

  requestPasswordReset(email: string) {
    return this.demo.requestPasswordReset(email);
  }

  verifyResetCode(email: string, code: string) {
    return this.demo.verifyResetCode(email, code);
  }

  resetPassword(resetToken: string, newPassword: string) {
    return this.demo.resetPassword(resetToken, newPassword);
  }

  invitationInfo(token: string) {
    return this.demo.invitationInfo(token);
  }

  async acceptInvitation(token: string, newPassword: string) {
    const user = await this.demo.acceptInvitation(token, newPassword);
    if (!actions.activateInvitedAccount(user.email)) throw new AuthError("invitation_invalid");
    return user;
  }

  /** Port of src/lib/auth/index.ts `pendingInvitationLinks()`. */
  pendingInvitationLinks(): InvitationLink[] {
    if (!DEMO_MODE || isApiMode()) return [];
    return getState()
      .users.filter((u) => !u.active && u.invited && Date.parse(u.invited.expiresAt) > Date.now())
      .map((u) => {
        const expiresAt = Date.parse(u.invited!.expiresAt);
        const token = this.demo.registerInvitation({ email: u.email, name: u.name, role: u.role }, expiresAt);
        return { email: u.email, name: u.name, token, expiresAt };
      });
  }
}

export { DEMO_ACCOUNTS, DEMO_PASSWORD };

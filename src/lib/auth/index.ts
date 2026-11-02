import { isApiMode } from "../api/config";
import { DEMO_MODE } from "./config";
import { actions, getState } from "../store";
import { createApiAuthService, apiLogout } from "./api-service";
import { createDemoAuthService } from "./demo-service";
import { AuthError, type AuthService } from "./types";

const demo = createDemoAuthService({
  latencyMs: 450,
  enabled: DEMO_MODE && !isApiMode(),
  // La désactivation d'un utilisateur (écran Utilisateurs et rôles) bloque aussi la connexion.
  isActive: (email) => getState().users.find((u) => u.email === email)?.active ?? true,
});

/**
 * Service utilisé par les écrans.
 * - `VITE_API_URL` défini → API NestJS réelle
 * - sinon → démonstration en mémoire (si DEMO_MODE)
 */
export const authService: AuthService = isApiMode()
  ? createApiAuthService()
  : {
      ...demo,
      async acceptInvitation(token, newPassword) {
        const user = await demo.acceptInvitation(token, newPassword);
        if (!actions.activateInvitedAccount(user.email)) throw new AuthError("invitation_invalid");
        return user;
      },
    };

export const demoMailbox = demo.mailbox;

export function logoutAuthSideEffects() {
  if (isApiMode()) apiLogout();
}

export interface InvitationLink {
  email: string;
  name: string;
  /** Jeton du lien reçu par courriel (jamais envoyé en démonstration : affiché à l'écran). */
  token: string;
  expiresAt: number;
}

/**
 * Démonstration : les invitations en attente du store (coopérative créée, invitation renvoyée) avec leur lien.
 * Le serveur réel envoie ce courriel lui-même ; ici le lien est affiché dans l'encadré « courriel simulé ».
 */
export function pendingInvitationLinks(): InvitationLink[] {
  if (!DEMO_MODE || isApiMode()) return [];
  return getState()
    .users.filter((u) => !u.active && u.invited && Date.parse(u.invited.expiresAt) > Date.now())
    .map((u) => {
      const expiresAt = Date.parse(u.invited!.expiresAt);
      const token = demo.registerInvitation(
        { email: u.email, name: u.name, role: u.role },
        expiresAt,
      );
      return { email: u.email, name: u.name, token, expiresAt };
    });
}
export { DEMO_MODE } from "./config";
export { DEMO_ACCOUNTS, DEMO_PASSWORD } from "./demo-service";
export { authErrorMessage } from "./messages";
export { AuthError } from "./types";
export type { AuthService, AuthUser, CodeSent } from "./types";

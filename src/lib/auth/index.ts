import { DEMO_MODE } from "./config";
import { actions, getState } from "../store";
import { createDemoAuthService } from "./demo-service";
import { AuthError, type AuthService } from "./types";

const demo = createDemoAuthService({
  latencyMs: 450,
  enabled: DEMO_MODE,
  // La désactivation d'un utilisateur (écran Utilisateurs et rôles) bloque aussi la connexion.
  isActive: (email) => getState().users.find((u) => u.email === email)?.active ?? true,
});

/** Service utilisé par les écrans. Remplacer par le client HTTP de l'API réelle au branchement du backend. */
export const authService: AuthService = {
  ...demo,
  async acceptInvitation(token, newPassword) {
    const user = await demo.acceptInvitation(token, newPassword);
    // Le compte du store s'active seulement quand le mot de passe est choisi ; invitation expirée côté store : refus.
    if (!actions.activateInvitedAccount(user.email)) throw new AuthError("invitation_invalid");
    return user;
  },
};
export const demoMailbox = demo.mailbox;

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
  if (!DEMO_MODE) return [];
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

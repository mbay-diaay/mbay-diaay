import type { RoleId } from "../permissions";
import { actions, getState } from "../store";
import { apiFetch } from "./client";
import { isApiMode } from "./config";
import { clearTokens, getAccessToken } from "./tokens";

type MeResponse = {
  id: string;
  email: string;
  name: string;
  role: RoleId;
  scoopId: string | null;
};

/**
 * Restaure la session depuis l'API (jeton + GET /me).
 * Sans jeton valide → déconnexion propre.
 * En mode démo (pas d'API) → restoreSession locale.
 */
export async function hydrateSessionFromApi(): Promise<boolean> {
  if (!isApiMode()) {
    actions.restoreSession();
    return getState().session !== null;
  }
  if (!getAccessToken()) {
    actions.logout();
    return false;
  }
  try {
    const me = await apiFetch<MeResponse>("/me");
    actions.login(me.name, me.email, me.role);
    return true;
  } catch {
    clearTokens();
    actions.logout();
    return false;
  }
}

import type { RoleId } from "../permissions";
import { apiFetch } from "./client";
import { type Page, type PageQuery, withPage } from "./pagination";

export type ApiUser = {
  id: string;
  email: string;
  name: string;
  role: RoleId;
  scoopId: string | null;
  /** Coopératives liées (technicien et faîtière : plusieurs). */
  scoopIds?: string[];
  phone: string | null;
  active: boolean;
};

/** Une page d'utilisateurs (tri par nom). */
export function listUsers(query: PageQuery = {}) {
  return apiFetch<Page<ApiUser>>(withPage("/users", query));
}

export function createUser(body: {
  name: string;
  email: string;
  role: RoleId;
  scoopId?: string;
  scoopIds?: string[];
  phone?: string;
  password?: string;
}) {
  return apiFetch<ApiUser>("/users", { method: "POST", body });
}

export function toggleUserActive(id: string) {
  return apiFetch<ApiUser>(`/users/${id}/toggle-active`, { method: "POST", body: {} });
}

/** Modifie un compte (rôle, SCOOP…). Attribuer ou retirer le rôle super administrateur exige `role.configure`. */
export function updateUser(
  id: string,
  body: { role?: RoleId; scoopId?: string | null; name?: string; phone?: string | null },
) {
  return apiFetch<ApiUser>(`/users/${id}`, { method: "PATCH", body });
}

/** Supprime définitivement un compte (droit `user.manage`, adresse e-mail retapée pour confirmer). */
export function deleteUser(id: string, confirmEmail: string) {
  return apiFetch<{ deleted: true }>(`/users/${id}/delete`, { method: "POST", body: { confirmEmail } });
}

/** Un gestionnaire crée un compte dans SA coopérative (rôle de coopérative ou sous-rôle de cette coopérative). */
export function createScoopAccount(
  scoopId: string,
  body: { name: string; email: string; role: RoleId; phone?: string },
) {
  return apiFetch<ApiUser>(`/scoops/${encodeURIComponent(scoopId)}/accounts`, { method: "POST", body });
}

/** Lie à la coopérative un technicien déjà inscrit ailleurs, par son adresse e-mail. */
export function linkTechnicianToScoop(scoopId: string, email: string) {
  return apiFetch<ApiUser>(`/scoops/${encodeURIComponent(scoopId)}/technicians/link`, {
    method: "POST",
    body: { email },
  });
}

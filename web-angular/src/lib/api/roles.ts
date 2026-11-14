import type { CustomRole, Permission, RoleId } from "../permissions";
import { apiFetch } from "./client";

/** Droits d'un rôle tels que le serveur les applique (`custom` : modifiés par le super administrateur). */
export type ApiRolePermissions = { role: RoleId; permissions: Permission[]; custom: boolean };

/** Matrice en vigueur côté serveur et rôles créés (droit `role.configure` ou `user.manage`). */
export function listRolePermissions() {
  return apiFetch<{ items: ApiRolePermissions[]; customRoles: CustomRole[] }>("/admin/roles");
}

/** Remplace les droits d'un rôle (droit `role.configure`, super administrateur). */
export function updateRolePermissions(role: RoleId, permissions: readonly Permission[]) {
  return apiFetch<ApiRolePermissions>(`/admin/roles/${role}`, {
    method: "PUT",
    body: { permissions },
  });
}

/** Rétablit la matrice par défaut d'un rôle intégré. */
export function resetRolePermissions(role: RoleId) {
  return apiFetch<ApiRolePermissions>(`/admin/roles/${role}/reset`, { method: "POST", body: {} });
}

/** Crée un rôle (nom, description, portée, droits copiés d'un rôle existant). */
export function createCustomRole(body: {
  name: string;
  description?: string;
  scoped: boolean;
  copyFrom?: RoleId | null;
}) {
  return apiFetch<CustomRole & { permissions: Permission[] }>("/admin/roles", { method: "POST", body });
}

/** Renomme un rôle créé, change sa description ou sa portée (sans compte). */
export function updateCustomRole(
  role: RoleId,
  body: { name?: string; description?: string; scoped?: boolean },
) {
  return apiFetch<CustomRole>(`/admin/roles/${role}`, { method: "PATCH", body });
}

/** Supprime un rôle créé ; ses comptes passent sur `reassignTo`. */
export function deleteCustomRole(role: RoleId, reassignTo?: RoleId | null) {
  return apiFetch<{ moved: number }>(`/admin/roles/${role}/delete`, {
    method: "POST",
    body: reassignTo ? { reassignTo } : {},
  });
}

/**
 * Sous-rôles d'une coopérative (droit `subrole.manage`, périmètre de la coopérative) : créés par son gestionnaire,
 * invisibles pour les autres coopératives, plafonnés aux droits de leur créateur.
 */
const scoopRoles = (scoopId: string) => `/scoops/${encodeURIComponent(scoopId)}/roles`;

export function listScoopRoles(scoopId: string) {
  return apiFetch<{ items: ApiRolePermissions[]; customRoles: CustomRole[] }>(scoopRoles(scoopId));
}

export function createScoopRole(
  scoopId: string,
  body: { name: string; description?: string; copyFrom?: RoleId | null },
) {
  return apiFetch<CustomRole & { permissions: Permission[] }>(scoopRoles(scoopId), { method: "POST", body });
}

export function updateScoopRole(scoopId: string, role: RoleId, body: { name?: string; description?: string }) {
  return apiFetch<CustomRole>(`${scoopRoles(scoopId)}/${role}`, { method: "PATCH", body });
}

export function setScoopRolePermissions(scoopId: string, role: RoleId, permissions: readonly Permission[]) {
  return apiFetch<ApiRolePermissions>(`${scoopRoles(scoopId)}/${role}`, { method: "PUT", body: { permissions } });
}

export function deleteScoopRole(scoopId: string, role: RoleId, reassignTo?: RoleId | null) {
  return apiFetch<{ moved: number }>(`${scoopRoles(scoopId)}/${role}/delete`, {
    method: "POST",
    body: reassignTo ? { reassignTo } : {},
  });
}

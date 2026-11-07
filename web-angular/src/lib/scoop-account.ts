import type { AppUser } from "./store";

/** État du compte du gestionnaire d'une coopérative, partagé par la liste et la fiche. */
export type AccountState = "active" | "invited" | "expired" | "closed" | "none";

/** Le gestionnaire actif d'abord, sinon le premier compte `gestionnaire` de la coopérative. */
export function managerOf(users: AppUser[], scoopId: string): AppUser | undefined {
  const managers = users.filter((u) => u.role === "gestionnaire" && u.scoopId === scoopId);
  return managers.find((u) => u.active) ?? managers[0];
}

export function accountOf(manager: AppUser | undefined, now: number): AccountState {
  if (!manager) return "none";
  if (manager.active) return "active";
  if (!manager.invited) return "closed";
  return new Date(manager.invited.expiresAt).getTime() < now ? "expired" : "invited";
}

/** Comptes technicien qui couvrent la coopérative, actifs ou non. */
export function techniciansOf(users: AppUser[], scoopId: string) {
  return users.filter((u) => u.role === "technicien" && (u.scoopIds ?? []).includes(scoopId));
}

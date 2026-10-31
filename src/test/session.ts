import { vi } from "vitest";
import { DEMO_ACCOUNTS } from "@/lib/auth/demo-service";
import type { RoleId } from "@/lib/permissions";
import { actions } from "@/lib/store";

/** La connexion mémorise la session dans le navigateur : un stockage en mémoire suffit pour tester les règles. */
export function installMemoryStorage() {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
}

/** Ouvre la session du compte de démonstration d'un rôle (chaque action du store exige désormais une session et un droit). */
export function loginAs(role: RoleId) {
  const account = DEMO_ACCOUNTS.find((a) => a.role === role);
  if (!account) throw new Error(`Aucun compte de démonstration pour le rôle ${role}`);
  actions.login(account.name, account.email, account.role);
}

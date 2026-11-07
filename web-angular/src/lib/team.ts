/**
 * Équipe de la coopérative : qui peut attribuer quel rôle, et à qui un compte peut être donné.
 * Le statut dans la coopérative (membre) et le rôle dans l'application sont deux champs distincts :
 * attribuer un rôle ne change pas le statut, suspendre un membre ferme son accès.
 */
import { tNow } from "./i18n";
import type { Member } from "./mock/cooperative";
import type { RoleId } from "./permissions";

/**
 * Rôles que chaque rôle peut attribuer (proposition à valider : décision D13). Le représentant gère les accès de
 * sa SCOOP sans pouvoir créer un autre représentant ni un gestionnaire ; l'administrateur attribue tous les rôles
 * de coopérative. Les rôles de la faîtière et de l'administrateur CRADESC ne s'attribuent pas ici.
 */
const ASSIGNABLE: Partial<Record<RoleId, readonly RoleId[]>> = {
  admin: ["gestionnaire", "representant", "secretaire", "ventes", "rapports", "technicien"],
  representant: ["secretaire", "ventes", "rapports", "technicien"],
};

export const assignableRoles = (actor: RoleId): readonly RoleId[] => ASSIGNABLE[actor] ?? [];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Raison pour laquelle un membre ne peut pas recevoir de compte, ou `null` s'il le peut. */
export function accountBlocker(m: Pick<Member, "status" | "email">): string | null {
  if (m.status !== "membre") return tNow("errors.team.seulUnMembreEnRegle");
  if (!EMAIL.test(m.email.trim())) return tNow("errors.team.renseignezDAbordLAdresse");
  return null;
}

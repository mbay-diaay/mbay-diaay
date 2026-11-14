/**
 * Équipe de la coopérative : qui peut attribuer quel rôle, et à qui un compte peut être donné.
 * Le statut dans la coopérative (membre) et le rôle dans l'application sont deux champs distincts :
 * attribuer un rôle ne change pas le statut, suspendre un membre ferme son accès.
 */
import { tNow } from "./i18n";
import type { Member } from "./mock/cooperative";
import type { CustomRole, RoleId } from "./permissions";

/**
 * Rôles que chaque rôle peut attribuer (proposition à valider : décision D13). Le représentant gère les accès de
 * sa SCOOP sans pouvoir créer un autre représentant ni un gestionnaire ; l'administrateur attribue tous les rôles
 * de coopérative. Les rôles de la faîtière, de l'administrateur et du super administrateur s'attribuent dans
 * « Utilisateurs & rôles ».
 */
export const COOPERATIVE_ROLES: readonly RoleId[] = [
  "gestionnaire",
  "bureau",
  "surveillance",
  "representant",
  "secretaire",
  "ventes",
  "rapports",
  "technicien",
];
/**
 * Rôles dont un sous-rôle de coopérative peut copier les droits au départ : les rôles de la coopérative (jamais
 * l'administrateur CRADESC, le super administrateur ni la faîtière, qui sont des rôles du réseau). Ses propres
 * sous-rôles s'y ajoutent.
 */
export const SUBROLE_COPY_SOURCES: readonly RoleId[] = COOPERATIVE_ROLES;

const ASSIGNABLE: Partial<Record<RoleId, readonly RoleId[]>> = {
  superadmin: COOPERATIVE_ROLES,
  admin: COOPERATIVE_ROLES,
  // Le gestionnaire choisit librement parmi les rôles de coopérative, et ses propres sous-rôles.
  gestionnaire: COOPERATIVE_ROLES.filter((role) => role !== "gestionnaire"),
  representant: ["secretaire", "ventes", "rapports", "technicien"],
};

/**
 * Rôles attribuables par `actor` à un membre de la coopérative `scoopId`. L'administration ajoute les rôles créés
 * par le super administrateur et les sous-rôles de cette coopérative ; le gestionnaire, seulement les sous-rôles de
 * sa coopérative (jamais ceux d'une autre, jamais un rôle global qui pourrait dépasser ses droits).
 */
export const assignableRoles = (
  actor: RoleId,
  customRoles: readonly CustomRole[] = [],
  scoopId?: string,
): readonly RoleId[] => {
  const builtIn = (ASSIGNABLE as Partial<Record<string, readonly RoleId[]>>)[actor] ?? [];
  const administration = actor === "superadmin" || actor === "admin";
  const custom = customRoles.filter((role) => {
    if (!role.scoped) return false;
    if (administration) return !role.scoopId || !scoopId || role.scoopId === scoopId;
    return actor === "gestionnaire" && !!scoopId && role.scoopId === scoopId;
  });
  return [...builtIn, ...custom.map((role) => role.id)];
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Raison pour laquelle un membre ne peut pas recevoir de compte, ou `null` s'il le peut. */
export function accountBlocker(m: Pick<Member, "status" | "email">): string | null {
  if (m.status !== "membre") return tNow("errors.team.seulUnMembreEnRegle");
  if (!EMAIL.test(m.email.trim())) return tNow("errors.team.renseignezDAbordLAdresse");
  return null;
}

import type { MessageKey } from "@/lib/i18n/fr";
import type { Permission } from "@/lib/permissions";
import type { Session } from "@/lib/store";
import { scoopIdsOf, isConsolidated } from "@/lib/scope";

export type AccessResult = { ok: true } | { ok: false; key: MessageKey };

export interface AccessOptions {
  /** Coopérative visée : la session doit la voir (périmètre). */
  scoopId?: string;
  /** Coopérative archivée ? Fourni par les actions qui écrivent : une coopérative archivée ne reçoit plus rien. */
  isArchived?: (scoopId: string) => boolean;
}

/**
 * Garde commune des actions : session ouverte, droit du rôle, périmètre, coopérative non archivée, dans cet ordre.
 * Le droit se vérifie TOUJOURS en premier : un refus de droit ne révèle rien sur le périmètre ni sur l'archivage.
 * Une liste de droits veut dire « l'un d'eux suffit ».
 * Le serveur réel refait ce contrôle à chaque appel ; ici il protège aussi la démonstration d'un appel direct.
 */
export function checkAccess(
  session: Session | null,
  permission: Permission | readonly Permission[],
  options: AccessOptions = {},
): AccessResult {
  if (!session) return { ok: false, key: "errors.guard.noSession" };
  const needed = Array.isArray(permission) ? permission : [permission as Permission];
  if (!needed.some((p) => session.permissions.includes(p)))
    return { ok: false, key: "errors.guard.notAllowed" };
  const { scoopId, isArchived } = options;
  if (scoopId !== undefined) {
    if (!isConsolidated(session) && !scoopIdsOf(session).has(scoopId))
      return { ok: false, key: "errors.guard.outOfScope" };
    if (isArchived?.(scoopId)) return { ok: false, key: "errors.scoop.archived" };
  }
  return { ok: true };
}

import { computed, DestroyRef, Injectable, inject, signal } from "@angular/core";
import { actions, can, getState, subscribeToStore, type State } from "@/lib/store";
import { maskPhone } from "@/lib/format";
import { isConsolidated, scoopIdsOf } from "@/lib/scope";
import {
  BUILT_IN_ROLES,
  isBuiltInRole,
  roleIsScoped,
  roleName,
  SUPER_ADMIN_ONLY_ROLES,
  type Permission,
  type RoleId,
} from "@/lib/permissions";
import { LocaleService } from "./locale.service";

/**
 * Angular port of the React app's src/lib/store.ts subscription layer.
 * The store itself (state, `actions`, business logic — ~3000 lines) is
 * copied verbatim into src/lib/store.ts; only its React-specific `useStore()`
 * hook (useSyncExternalStore) doesn't carry over. This service is the
 * replacement: same `subscribeToStore`/`getState` primitives, exposed as an
 * Angular signal instead of a hook.
 */
@Injectable({ providedIn: "root" })
export class StoreService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly stateSignal = signal<State>(getState());
  readonly state = this.stateSignal.asReadonly();

  /** Same `actions` object the React app calls (store.ts `actions.*`) — mutates the shared store directly. */
  readonly actions = actions;

  constructor() {
    const unsubscribe = subscribeToStore(() => this.stateSignal.set(getState()));
    this.destroyRef.onDestroy(unsubscribe);
  }

  private readonly locale = inject(LocaleService);

  /**
   * Rôles que la session peut voir : intégrés, rôles globaux, et sous-rôles des seules coopératives de son
   * périmètre (les sous-rôles de la coopérative B restent invisibles pour la coopérative A).
   */
  readonly allRoles = computed<RoleId[]>(() => {
    const session = this.state().session;
    const visible = scoopIdsOf(session);
    return [
      ...BUILT_IN_ROLES,
      ...this.state()
        .customRoles.filter((role) => !role.scoopId || isConsolidated(session) || visible.has(role.scoopId))
        .map((role) => role.id),
    ];
  });

  /** Nom affiché d'un rôle : traduit pour un rôle intégré, nom choisi pour un rôle créé. */
  roleLabel(role: RoleId): string {
    return isBuiltInRole(role)
      ? this.locale.tEnum("role", role)
      : roleName(role, this.state().customRoles);
  }

  /**
   * Rôles qu'on peut donner à un compte rattaché aux coopératives `scoopIds` : sans le droit `role.configure`, ni
   * administrateur ni super administrateur ; un sous-rôle de coopérative seulement avec sa propre coopérative.
   */
  assignableRoleIds(scoopIds: readonly string[]): RoleId[] {
    const superAdmin = this.can("role.configure");
    const customRoles = this.state().customRoles;
    return this.allRoles().filter((role) => {
      if (!superAdmin && SUPER_ADMIN_ONLY_ROLES.includes(role as never)) return false;
      const owner = customRoles.find((item) => item.id === role)?.scoopId;
      return !owner || (scoopIds.length === 1 && scoopIds[0] === owner);
    });
  }

  /** Rôle limité à une coopérative (sinon vue consolidée). */
  roleScoped(role: RoleId): boolean {
    return roleIsScoped(role, this.state().customRoles);
  }

  can(permission: Permission): boolean {
    return can(this.state().session, permission);
  }

  /**
   * Numéro de téléphone tel que la session a le droit de le voir :
   * en clair avec `contact.read` (admin), masqué sinon (« 77 ••• •• 85 »). Vide → "".
   */
  phone(raw: string | null | undefined): string {
    if (!raw) return "";
    return this.can("contact.read") ? raw : maskPhone(raw);
  }
}

import { i as inject, ag as DestroyRef, F as signal, c as computed, ai as __defineInjectable } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { C as getState, o as actions, L as LocaleService, q as scoopIdsOf, aa as BUILT_IN_ROLES, r as isConsolidated, ab as subscribeToStore, ac as isBuiltInRole, ad as roleName, ae as SUPER_ADMIN_ONLY_ROLES, af as roleIsScoped, A as can, p as maskPhone } from './locale.service-c0QhtcVY.mjs';

var _a;
var StoreService = (_a = class {
  constructor() {
    this.destroyRef = inject(DestroyRef);
    this.stateSignal = signal(getState(), ...[]);
    this.state = this.stateSignal.asReadonly();
    this.actions = actions;
    this.locale = inject(LocaleService);
    this.allRoles = computed(() => {
      const session = this.state().session;
      const visible = scoopIdsOf(session);
      return [...BUILT_IN_ROLES, ...this.state().customRoles.filter((role) => !role.scoopId || isConsolidated(session) || visible.has(role.scoopId)).map((role) => role.id)];
    }, ...[]);
    const unsubscribe = subscribeToStore(() => this.stateSignal.set(getState()));
    this.destroyRef.onDestroy(unsubscribe);
  }
  /** Nom affiché d'un rôle : traduit pour un rôle intégré, nom choisi pour un rôle créé. */
  roleLabel(role) {
    return isBuiltInRole(role) ? this.locale.tEnum("role", role) : roleName(role, this.state().customRoles);
  }
  /**
  * Rôles qu'on peut donner à un compte rattaché aux coopératives `scoopIds` : sans le droit `role.configure`, ni
  * administrateur ni super administrateur ; un sous-rôle de coopérative seulement avec sa propre coopérative.
  */
  assignableRoleIds(scoopIds) {
    const superAdmin = this.can("role.configure");
    const customRoles = this.state().customRoles;
    return this.allRoles().filter((role) => {
      var _a2;
      if (!superAdmin && SUPER_ADMIN_ONLY_ROLES.includes(role)) return false;
      const owner = (_a2 = customRoles.find((item) => item.id === role)) == null ? void 0 : _a2.scoopId;
      return !owner || scoopIds.length === 1 && scoopIds[0] === owner;
    });
  }
  /** Rôle limité à une coopérative (sinon vue consolidée). */
  roleScoped(role) {
    return roleIsScoped(role, this.state().customRoles);
  }
  can(permission) {
    return can(this.state().session, permission);
  }
  /**
  * Numéro de téléphone tel que la session a le droit de le voir :
  * en clair avec `contact.read` (admin), masqué sinon (« 77 ••• •• 85 »). Vide → "".
  */
  phone(raw) {
    if (!raw) return "";
    return this.can("contact.read") ? raw : maskPhone(raw);
  }
}, _a.\u0275fac = function StoreService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275prov = /* @__PURE__ */ __defineInjectable({
  token: _a,
  factory: _a.\u0275fac,
  providedIn: "root"
}), _a);

export { StoreService as S };
//# sourceMappingURL=store.service-C18USU1m.mjs.map

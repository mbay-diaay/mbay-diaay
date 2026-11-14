import { aa as input, i as inject, F as signal, c as computed, ɵ as __defineComponent, j as __conditionalCreate, s as __conditional, ae as model, e as effect, a8 as untracked, L as __getCurrentView, f as __elementStart, H as __listener, b as __element, h as __elementEnd, w as __nextContext, t as __styleProp, n as __property, u as __attribute, o as __advance, g as __text, r as __pureFunction1, p as __textInterpolate, q as __textInterpolate1, z as __classProp, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, ae as SUPER_ADMIN_ONLY_ROLES, aj as isApiMode, ak as LOCKED_ROLE, at as roleAllowsManyScoops } from './locale.service-c0QhtcVY.mjs';
import { a as apiFetch } from './client-D1lxPQMx.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { w as withPage, M as ModalComponent, T as TextFieldComponent, q as CheckListComponent, S as SelectComponent } from './ui-DDO8FoUF.mjs';

var _a, _b;
function listUsers(query = {}) {
  return apiFetch(withPage("/users", query));
}
function createUser(body) {
  return apiFetch("/users", {
    method: "POST",
    body
  });
}
function toggleUserActive(id) {
  return apiFetch(`/users/${id}/toggle-active`, {
    method: "POST",
    body: {}
  });
}
function updateUser(id, body) {
  return apiFetch(`/users/${id}`, {
    method: "PATCH",
    body
  });
}
function deleteUser(id, confirmEmail) {
  return apiFetch(`/users/${id}/delete`, {
    method: "POST",
    body: { confirmEmail }
  });
}
var _c0$1 = (a0) => ({ name: a0 });
var _c1 = (a0) => ({ count: a0 });
var _c2 = (a0) => ({ email: a0 });
function AccountActionsComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "ui-modal", 6);
    __listener("closed", function AccountActionsComponent_Conditional_0_Conditional_4_Template_ui_modal_closed_0_listener() {
      __restoreView(_r3);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.toggleOpen.set(false));
    });
    __elementStart(1, "button", 7);
    __listener("click", function AccountActionsComponent_Conditional_0_Conditional_4_Template_button_click_1_listener() {
      __restoreView(_r3);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.toggleOpen.set(false));
    });
    __text(2);
    __elementEnd();
    __elementStart(3, "button", 8);
    __listener("click", function AccountActionsComponent_Conditional_0_Conditional_4_Template_button_click_3_listener() {
      __restoreView(_r3);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.confirmToggle());
    });
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __property("open", true)("tone", ctx_r1.user().active ? "danger" : "default")("title", ctx_r1.user().active ? ctx_r1.t()("utilisateurs.v2.deactivateTitle", __pureFunction1(14, _c0$1, ctx_r1.user().name)) : ctx_r1.t()("utilisateurs.v2.reactivateTitle", __pureFunction1(16, _c0$1, ctx_r1.user().name)))("description", ctx_r1.user().active ? ctx_r1.t()("utilisateurs.v2.deactivateText") : ctx_r1.t()("utilisateurs.v2.reactivateText"))("icon", ctx_r1.user().active ? "block" : "how_to_reg")("width", 540)("closeLabel", ctx_r1.t()("common.close"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("common.cancel"));
    __advance();
    __classProp("btn-danger", ctx_r1.user().active)("btn-primary", !ctx_r1.user().active);
    __property("disabled", ctx_r1.busy());
    __advance();
    __textInterpolate1(" ", ctx_r1.user().active ? ctx_r1.t()("utilisateurs.action.deactivate") : ctx_r1.t()("utilisateurs.action.reactivate"), " ");
  }
}
function AccountActionsComponent_Conditional_0_Conditional_5_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 15);
    __element(1, "ui-icon", 17);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("utilisateurs.delete.preferDeactivate"));
  }
}
function AccountActionsComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "ui-modal", 9);
    __listener("closed", function AccountActionsComponent_Conditional_0_Conditional_5_Template_ui_modal_closed_0_listener() {
      __restoreView(_r4);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.deleteOpen.set(false));
    });
    __elementStart(1, "ul", 10)(2, "li", 11);
    __element(3, "ui-icon", 12);
    __text(4);
    __elementEnd();
    __elementStart(5, "li", 11);
    __element(6, "ui-icon", 12);
    __text(7);
    __elementEnd();
    __elementStart(8, "li", 11);
    __element(9, "ui-icon", 13);
    __text(10);
    __elementEnd()();
    __elementStart(11, "ui-text-field", 14);
    __listener("valueChange", function AccountActionsComponent_Conditional_0_Conditional_5_Template_ui_text_field_valueChange_11_listener($event) {
      __restoreView(_r4);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.confirmEmail.set($event));
    });
    __elementEnd();
    __conditionalCreate(12, AccountActionsComponent_Conditional_0_Conditional_5_Conditional_12_Template, 3, 2, "p", 15);
    __elementStart(13, "button", 7);
    __listener("click", function AccountActionsComponent_Conditional_0_Conditional_5_Template_button_click_13_listener() {
      __restoreView(_r4);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.deleteOpen.set(false));
    });
    __text(14);
    __elementEnd();
    __elementStart(15, "button", 16);
    __listener("click", function AccountActionsComponent_Conditional_0_Conditional_5_Template_button_click_15_listener() {
      __restoreView(_r4);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.confirmDelete());
    });
    __element(16, "ui-icon", 3);
    __text(17);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __property("open", true)("title", ctx_r1.t()("utilisateurs.delete.title", __pureFunction1(21, _c0$1, ctx_r1.user().name)))("description", ctx_r1.t()("utilisateurs.delete.text"))("width", 560)("closeLabel", ctx_r1.t()("common.close"));
    __advance(3);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("utilisateurs.delete.point.login"));
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("utilisateurs.delete.point.devices", __pureFunction1(23, _c1, ctx_r1.deviceCount())));
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("utilisateurs.delete.point.audit"));
    __advance();
    __property("label", ctx_r1.t()("utilisateurs.delete.confirmLabel"))("hint", ctx_r1.t()("utilisateurs.delete.confirmHint", __pureFunction1(25, _c2, ctx_r1.user().email)))("placeholder", ctx_r1.user().email)("value", ctx_r1.confirmEmail())("error", ctx_r1.deleteTried() && !ctx_r1.emailMatches() ? ctx_r1.t()("errors.users.confirmEmail") : "");
    __advance();
    __conditional(ctx_r1.user().active ? 12 : -1);
    __advance(2);
    __textInterpolate(ctx_r1.t()("common.cancel"));
    __advance();
    __property("disabled", ctx_r1.busy());
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("utilisateurs.delete.confirm"));
  }
}
function AccountActionsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 0);
    __listener("click", function AccountActionsComponent_Conditional_0_Template_button_click_0_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      $event.stopPropagation();
      return __resetView(ctx_r1.toggleOpen.set(true));
    });
    __element(1, "ui-icon", 1);
    __elementEnd();
    __elementStart(2, "button", 2);
    __listener("click", function AccountActionsComponent_Conditional_0_Template_button_click_2_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      $event.stopPropagation();
      return __resetView(ctx_r1.openDelete());
    });
    __element(3, "ui-icon", 3);
    __elementEnd();
    __conditionalCreate(4, AccountActionsComponent_Conditional_0_Conditional_4_Template, 5, 18, "ui-modal", 4);
    __conditionalCreate(5, AccountActionsComponent_Conditional_0_Conditional_5_Template, 18, 27, "ui-modal", 5);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __styleProp("color", ctx_r1.user().active ? "var(--v2-erreur-fg)" : "var(--v2-foret)");
    __property("title", ctx_r1.user().active ? ctx_r1.t()("utilisateurs.action.deactivate") : ctx_r1.t()("utilisateurs.action.reactivate"));
    __attribute("aria-label", (ctx_r1.user().active ? ctx_r1.t()("utilisateurs.action.deactivate") : ctx_r1.t()("utilisateurs.action.reactivate")) + " \xB7 " + ctx_r1.user().name);
    __advance();
    __property("name", ctx_r1.user().active ? "block" : "how_to_reg")("size", 18);
    __advance();
    __property("title", ctx_r1.t()("utilisateurs.action.delete"));
    __attribute("aria-label", ctx_r1.t()("utilisateurs.action.delete") + " \xB7 " + ctx_r1.user().name);
    __advance();
    __property("size", 18);
    __advance();
    __conditional(ctx_r1.toggleOpen() ? 4 : -1);
    __advance();
    __conditional(ctx_r1.deleteOpen() ? 5 : -1);
  }
}
var AccountActionsComponent = (_a = class {
  constructor() {
    this.user = input.required(...[]);
    this.store = inject(StoreService);
    this.snackbar = inject(SnackbarService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.toggleOpen = signal(false, ...[]);
    this.deleteOpen = signal(false, ...[]);
    this.confirmEmail = signal("", ...[]);
    this.deleteTried = signal(false, ...[]);
    this.busy = signal(false, ...[]);
    this.allowed = computed(() => {
      var _a2;
      const target = this.user();
      const sessionEmail = (_a2 = this.store.state().session) == null ? void 0 : _a2.email.toLowerCase();
      return this.store.can("user.manage") && target.email.toLowerCase() !== sessionEmail && (!SUPER_ADMIN_ONLY_ROLES.includes(target.role) || this.store.can("role.configure"));
    }, ...[]);
    this.deviceCount = computed(() => this.store.state().devices.filter((device) => device.userId === this.user().id).length, ...[]);
    this.emailMatches = computed(() => this.confirmEmail().trim().toLowerCase() === this.user().email.toLowerCase(), ...[]);
  }
  openDelete() {
    this.confirmEmail.set("");
    this.deleteTried.set(false);
    this.deleteOpen.set(true);
  }
  async confirmToggle() {
    const target = this.user();
    this.busy.set(true);
    try {
      if (isApiMode()) await toggleUserActive(target.id);
      const result = this.store.actions.toggleUser(target.id);
      if (!result.ok) {
        this.snackbar.error(result.error);
        return;
      }
      this.toggleOpen.set(false);
      this.snackbar.success(this.locale.tNow(result.active ? "utilisateurs.toast.reactivated" : "utilisateurs.toast.deactivated"));
    } catch {
      this.snackbar.error(this.locale.tNow("errors.users.api"));
    } finally {
      this.busy.set(false);
    }
  }
  async confirmDelete() {
    this.deleteTried.set(true);
    if (!this.emailMatches()) return;
    const target = this.user();
    const typed = this.confirmEmail().trim();
    this.busy.set(true);
    try {
      if (isApiMode()) await deleteUser(target.id, typed);
      const result = this.store.actions.deleteUser(target.id, typed);
      if (!result.ok) {
        this.snackbar.error(result.error);
        return;
      }
      this.deleteOpen.set(false);
      this.snackbar.success(this.locale.tNow("utilisateurs.toast.deleted", { name: target.name }));
    } catch {
      this.snackbar.error(this.locale.tNow("errors.users.api"));
    } finally {
      this.busy.set(false);
    }
  }
}, _a.\u0275fac = function AccountActionsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-account-actions"]],
  hostAttrs: [1, "contents"],
  inputs: { user: [1, "user"] },
  decls: 1,
  vars: 1,
  consts: [
    [
      "type",
      "button",
      1,
      "act",
      3,
      "click",
      "title"
    ],
    [
      3,
      "name",
      "size"
    ],
    [
      "type",
      "button",
      1,
      "act",
      "act-danger",
      3,
      "click",
      "title"
    ],
    [
      "name",
      "delete_forever",
      3,
      "size"
    ],
    [
      3,
      "open",
      "tone",
      "title",
      "description",
      "icon",
      "width",
      "closeLabel"
    ],
    [
      "tone",
      "danger",
      "icon",
      "delete_forever",
      3,
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      3,
      "closed",
      "open",
      "tone",
      "title",
      "description",
      "icon",
      "width",
      "closeLabel"
    ],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      3,
      "click"
    ],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      3,
      "click",
      "disabled"
    ],
    [
      "tone",
      "danger",
      "icon",
      "delete_forever",
      3,
      "closed",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      1,
      "mb-4",
      "space-y-1.5",
      "text-[14px]",
      "font-medium"
    ],
    [
      1,
      "flex",
      "items-start",
      "gap-2"
    ],
    [
      "name",
      "close",
      2,
      "color",
      "var(--v2-erreur-fg)",
      3,
      "size"
    ],
    [
      "name",
      "history",
      2,
      "color",
      "var(--v2-foret)",
      3,
      "size"
    ],
    [
      "preset",
      "email",
      3,
      "valueChange",
      "label",
      "hint",
      "placeholder",
      "value",
      "error"
    ],
    [
      1,
      "notice",
      "mt-4"
    ],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-danger",
      3,
      "click",
      "disabled"
    ],
    [
      "name",
      "info",
      3,
      "size"
    ]
  ],
  template: function AccountActionsComponent_Template(rf, ctx) {
    if (rf & 1) __conditionalCreate(0, AccountActionsComponent_Conditional_0_Template, 6, 11);
    if (rf & 2) __conditional(ctx.allowed() ? 0 : -1);
  },
  dependencies: [
    IconComponent,
    ModalComponent,
    TextFieldComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }"]
}), _a);
var _c0 = (a0) => ({ name: a0 });
function UserRoleDialogComponent_Conditional_0_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "ui-check-list", 11);
    __listener("valueChange", function UserRoleDialogComponent_Conditional_0_Conditional_3_Conditional_0_Template_ui_check_list_valueChange_0_listener($event) {
      __restoreView(_r3);
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.scoopIds.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __property("label", ctx_r1.t()("roles.dialog.scoops"))("options", ctx_r1.scoopOptions())("value", ctx_r1.scoopIds())("error", ctx_r1.showErrors() && !ctx_r1.scoopIds().length ? ctx_r1.t()("errors.roles.scoopRequired") : "");
  }
}
function UserRoleDialogComponent_Conditional_0_Conditional_3_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 13);
    __element(1, "ui-icon", 14);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(4);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate1("", ctx_r1.t()("errors.roles.scoopRequired"), " ");
  }
}
function UserRoleDialogComponent_Conditional_0_Conditional_3_Conditional_1_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "ui-select", 12);
    __listener("valueChange", function UserRoleDialogComponent_Conditional_0_Conditional_3_Conditional_1_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r4);
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.scoopIds.set([$event]));
    });
    __elementEnd();
    __conditionalCreate(1, UserRoleDialogComponent_Conditional_0_Conditional_3_Conditional_1_Conditional_1_Template, 3, 2, "p", 13);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __property("label", ctx_r1.t()("roles.dialog.scoop"))("options", ctx_r1.scoopOptions())("value", (_a2 = ctx_r1.scoopIds()[0]) != null ? _a2 : "")("placeholder", ctx_r1.t()("roles.dialog.scoopPh"));
    __advance();
    __conditional(ctx_r1.showErrors() && !ctx_r1.scoopIds().length ? 1 : -1);
  }
}
function UserRoleDialogComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, UserRoleDialogComponent_Conditional_0_Conditional_3_Conditional_0_Template, 1, 4, "ui-check-list", 10)(1, UserRoleDialogComponent_Conditional_0_Conditional_3_Conditional_1_Template, 2, 5);
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __conditional(ctx_r1.manyScoops() ? 0 : 1);
  }
}
function UserRoleDialogComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 4);
    __element(1, "ui-icon", 15);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.t()("roles.dialog.consolidated"), " ");
  }
}
function UserRoleDialogComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 5);
    __element(1, "ui-icon", 14);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.t()("roles.dialog.superWarning"), " ");
  }
}
function UserRoleDialogComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "ui-modal", 1);
    __listener("closed", function UserRoleDialogComponent_Conditional_0_Template_ui_modal_closed_0_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.open.set(false));
    });
    __elementStart(1, "div", 2)(2, "ui-select", 3);
    __listener("valueChange", function UserRoleDialogComponent_Conditional_0_Template_ui_select_valueChange_2_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.pickRole($event));
    });
    __elementEnd();
    __conditionalCreate(3, UserRoleDialogComponent_Conditional_0_Conditional_3_Template, 2, 1)(4, UserRoleDialogComponent_Conditional_0_Conditional_4_Template, 3, 2, "p", 4);
    __conditionalCreate(5, UserRoleDialogComponent_Conditional_0_Conditional_5_Template, 3, 2, "p", 5);
    __elementEnd();
    __elementStart(6, "button", 6);
    __listener("click", function UserRoleDialogComponent_Conditional_0_Template_button_click_6_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.open.set(false));
    });
    __text(7);
    __elementEnd();
    __elementStart(8, "button", 7);
    __listener("click", function UserRoleDialogComponent_Conditional_0_Template_button_click_8_listener() {
      const editedUser_r5 = __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.submit(editedUser_r5));
    });
    __text(9);
    __elementStart(10, "span", 8);
    __element(11, "ui-icon", 9);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __property("open", ctx_r1.open())("title", ctx_r1.t()("roles.dialog.title", __pureFunction1(15, _c0, ctx.name)))("description", ctx_r1.t()("roles.dialog.description"))("width", 620)("closeLabel", ctx_r1.t()("common.close"));
    __advance(2);
    __property("label", ctx_r1.t()("roles.dialog.role"))("options", ctx_r1.roleOptions())("value", ctx_r1.role())("placeholder", ctx_r1.t()("roles.dialog.rolePh"));
    __advance();
    __conditional(ctx_r1.scoped() ? 3 : 4);
    __advance(2);
    __conditional(ctx_r1.role() === ctx_r1.lockedRole ? 5 : -1);
    __advance(2);
    __textInterpolate(ctx_r1.t()("common.cancel"));
    __advance();
    __property("disabled", ctx_r1.busy());
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("roles.dialog.submit"));
    __advance(2);
    __property("size", 18);
  }
}
var UserRoleDialogComponent = (_b = class {
  constructor() {
    this.open = model(false, ...[]);
    this.user = input(null, ...[]);
    this.store = inject(StoreService);
    this.snackbar = inject(SnackbarService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.lockedRole = LOCKED_ROLE;
    this.role = signal("", ...[]);
    this.scoopIds = signal([], ...[]);
    this.showErrors = signal(false, ...[]);
    this.busy = signal(false, ...[]);
    this.roleOptions = computed(() => {
      return this.store.assignableRoleIds(this.scoopIds()).map((role) => ({
        value: role,
        label: this.store.roleLabel(role),
        icon: role === "superadmin" ? "lock" : this.store.roleScoped(role) ? "apartment" : "public"
      }));
    }, ...[]);
    this.scoopOptions = computed(() => this.store.state().scoops.filter((scoop) => !scoop.archived).map((scoop) => ({
      value: scoop.id,
      label: scoop.name
    })), ...[]);
    this.manyScoops = computed(() => {
      const role = this.role();
      return role !== "" && roleAllowsManyScoops(role);
    }, ...[]);
    this.scoped = computed(() => {
      const role = this.role();
      return role !== "" && this.store.roleScoped(role);
    }, ...[]);
    effect(() => {
      const isOpen = this.open();
      const edited = this.user();
      untracked(() => {
        var _a2;
        if (!isOpen || !edited) return;
        this.role.set(edited.role);
        this.scoopIds.set((_a2 = edited.scoopIds) != null ? _a2 : edited.scoopId ? [edited.scoopId] : []);
        this.showErrors.set(false);
      });
    });
  }
  pickRole(value) {
    const role = value;
    this.role.set(role);
    if (!roleAllowsManyScoops(role)) this.scoopIds.update((ids) => ids.slice(0, 1));
    if (!this.store.roleScoped(role)) this.scoopIds.set([]);
  }
  async submit(edited) {
    var _a2;
    const role = this.role();
    if (!role) return;
    if (this.scoped() && !this.scoopIds().length) {
      this.showErrors.set(true);
      return;
    }
    const scoopIds = this.scoped() ? this.scoopIds() : [];
    if (isApiMode()) {
      this.busy.set(true);
      try {
        await updateUser(edited.id, {
          role,
          scoopId: (_a2 = scoopIds[0]) != null ? _a2 : null
        });
      } catch {
        this.snackbar.error(this.locale.tNow("errors.roles.api"));
        return;
      } finally {
        this.busy.set(false);
      }
    }
    const result = this.store.actions.setUserRole(edited.id, role, scoopIds);
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.locale.tNow("roles.dialog.saved", {
      name: edited.name,
      role: this.store.roleLabel(role)
    }));
    this.open.set(false);
  }
}, _b.\u0275fac = function UserRoleDialogComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _b)();
}, _b.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _b,
  selectors: [["app-user-role-dialog"]],
  inputs: {
    open: [1, "open"],
    user: [1, "user"]
  },
  outputs: { open: "openChange" },
  decls: 1,
  vars: 1,
  consts: [
    [
      "icon",
      "admin_panel_settings",
      3,
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      "icon",
      "admin_panel_settings",
      3,
      "closed",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [1, "space-y-5"],
    [
      "leadingIcon",
      "admin_panel_settings",
      3,
      "valueChange",
      "label",
      "options",
      "value",
      "placeholder"
    ],
    [
      1,
      "flex",
      "items-start",
      "gap-2",
      "rounded-[14px]",
      "p-3",
      "text-[14px]",
      "font-medium",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-foret)"
    ],
    [
      1,
      "flex",
      "items-start",
      "gap-2",
      "rounded-[14px]",
      "p-3",
      "text-[14px]",
      "font-medium",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
    ],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      3,
      "click"
    ],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-primary",
      3,
      "click",
      "disabled"
    ],
    [1, "btn-chip"],
    [
      "name",
      "check",
      3,
      "size"
    ],
    [
      3,
      "label",
      "options",
      "value",
      "error"
    ],
    [
      3,
      "valueChange",
      "label",
      "options",
      "value",
      "error"
    ],
    [
      "leadingIcon",
      "apartment",
      3,
      "valueChange",
      "label",
      "options",
      "value",
      "placeholder"
    ],
    [
      "role",
      "alert",
      1,
      "flex",
      "items-center",
      "gap-1.5",
      "text-[13px]",
      "font-bold",
      2,
      "color",
      "var(--v2-erreur-fg)"
    ],
    [
      "name",
      "warning",
      3,
      "size"
    ],
    [
      "name",
      "public",
      3,
      "size"
    ]
  ],
  template: function UserRoleDialogComponent_Template(rf, ctx) {
    if (rf & 1) __conditionalCreate(0, UserRoleDialogComponent_Conditional_0_Template, 12, 17, "ui-modal", 0);
    if (rf & 2) {
      let tmp_0_0;
      __conditional((tmp_0_0 = ctx.user()) ? 0 : -1, tmp_0_0);
    }
  },
  dependencies: [
    CheckListComponent,
    IconComponent,
    ModalComponent,
    SelectComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }"]
}), _b);

export { AccountActionsComponent as A, UserRoleDialogComponent as U, createUser as c, listUsers as l };
//# sourceMappingURL=user-role-dialog.component-CU8swM4X.mjs.map

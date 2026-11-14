import { i as inject, F as signal, c as computed, ɵ as __defineComponent, f as __elementStart, b as __element, g as __text, h as __elementEnd, H as __listener, m as __repeaterCreate, j as __conditionalCreate, I as __twoWayListener, n as __property, o as __advance, p as __textInterpolate, u as __attribute, z as __classProp, q as __textInterpolate1, v as __repeater, s as __conditional, K as __twoWayProperty, V as __repeaterTrackByIdentity, L as __getCurrentView, w as __nextContext, t as __styleProp, r as __pureFunction1, O as __restoreView, P as __resetView, Q as __twoWayBindingSet } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, j as nf, ak as LOCKED_ROLE, aj as isApiMode } from './locale.service-c0QhtcVY.mjs';
import { s as fetchAllPages, P as PaginationComponent } from './ui-DDO8FoUF.mjs';
import { a as listRolePermissions } from './roles-_rD1LcFH.mjs';
import { l as listUsers, A as AccountActionsComponent, U as UserRoleDialogComponent } from './user-role-dialog.component-CU8swM4X.mjs';
import { i as initialsOf, T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'rxjs';
import 'rxjs/operators';
import 'node:module';
import 'node:async_hooks';
import './lucide-angular-RJABeBQ2.mjs';
import 'clsx';
import 'tailwind-merge';
import 'date-fns';
import 'date-fns/locale';
import './client-D1lxPQMx.mjs';

var _a;
var _c0 = (a0) => ({ name: a0 });
var _forTrack0 = ($index, $item) => $item.id;
function SuperAdminComptesPage_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 9);
    __listener("click", function SuperAdminComptesPage_For_18_Template_button_click_0_listener() {
      const role_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.roleFilter.set(role_r2));
    });
    __text(1);
    __elementStart(2, "span", 10);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const role_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __classProp("on", ctx_r2.roleFilter() === role_r2);
    __attribute("aria-checked", ctx_r2.roleFilter() === role_r2);
    __advance();
    __textInterpolate1(" ", ctx_r2.store.roleLabel(role_r2));
    __advance();
    __classProp("zero", !ctx_r2.countOf(role_r2));
    __advance();
    __textInterpolate(ctx_r2.nf.format(ctx_r2.countOf(role_r2)));
  }
}
function SuperAdminComptesPage_Conditional_24_For_16_Conditional_12_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 3);
  if (rf & 2) __property("size", 14);
}
function SuperAdminComptesPage_Conditional_24_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "tr", 24);
    __listener("click", function SuperAdminComptesPage_Conditional_24_For_16_Template_tr_click_0_listener() {
      const user_r5 = __restoreView(_r4).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.openRole(user_r5));
    });
    __elementStart(1, "td")(2, "span", 25)(3, "span", 26);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 27)(6, "span", 28);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 29);
    __text(9);
    __elementEnd()()()();
    __elementStart(10, "td")(11, "span", 30);
    __conditionalCreate(12, SuperAdminComptesPage_Conditional_24_For_16_Conditional_12_Template, 1, 1, "ui-icon", 3);
    __text(13);
    __elementEnd()();
    __elementStart(14, "td", 31);
    __text(15);
    __elementEnd();
    __elementStart(16, "td")(17, "span", 30);
    __text(18);
    __elementEnd()();
    __elementStart(19, "td", 32);
    __listener("click", function SuperAdminComptesPage_Conditional_24_For_16_Template_td_click_19_listener($event) {
      return $event.stopPropagation();
    });
    __elementStart(20, "span", 33)(21, "button", 34);
    __listener("click", function SuperAdminComptesPage_Conditional_24_For_16_Template_button_click_21_listener() {
      const user_r5 = __restoreView(_r4).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.openRole(user_r5));
    });
    __element(22, "ui-icon", 35);
    __elementEnd();
    __element(23, "app-account-actions", 36);
    __elementEnd()()();
  }
  if (rf & 2) {
    const user_r5 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(3);
    __styleProp("background", ctx_r2.tone(user_r5.role).bg)("color", ctx_r2.tone(user_r5.role).fg);
    __advance();
    __textInterpolate(ctx_r2.initials(user_r5.name));
    __advance(3);
    __textInterpolate(user_r5.name);
    __advance(2);
    __textInterpolate(user_r5.email);
    __advance(2);
    __styleProp("background", ctx_r2.tone(user_r5.role).bg)("color", ctx_r2.tone(user_r5.role).fg);
    __advance();
    __conditional(user_r5.role === ctx_r2.lockedRole ? 12 : -1);
    __advance();
    __textInterpolate1(" ", ctx_r2.store.roleLabel(user_r5.role), " ");
    __advance(2);
    __textInterpolate(ctx_r2.scopeLabel(user_r5));
    __advance(2);
    __styleProp("background", user_r5.active ? ctx_r2.toneSuccess.bg : ctx_r2.toneNeutral.bg)("color", user_r5.active ? ctx_r2.toneSuccess.fg : ctx_r2.toneNeutral.fg);
    __advance();
    __textInterpolate(user_r5.active ? ctx_r2.t()("utilisateurs.state.active") : ctx_r2.t()("utilisateurs.state.inactive"));
    __advance(3);
    __property("title", ctx_r2.t()("utilisateurs.v2.changeRole"));
    __attribute("aria-label", ctx_r2.t()("utilisateurs.v2.changeRoleFor", __pureFunction1(23, _c0, user_r5.name)));
    __advance();
    __property("size", 18);
    __advance();
    __property("user", user_r5);
  }
}
function SuperAdminComptesPage_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 19)(1, "table", 20)(2, "thead")(3, "tr")(4, "th");
    __text(5);
    __elementEnd();
    __elementStart(6, "th");
    __text(7);
    __elementEnd();
    __elementStart(8, "th");
    __text(9);
    __elementEnd();
    __elementStart(10, "th");
    __text(11);
    __elementEnd();
    __elementStart(12, "th", 21);
    __text(13);
    __elementEnd()()();
    __elementStart(14, "tbody");
    __repeaterCreate(15, SuperAdminComptesPage_Conditional_24_For_16_Template, 24, 25, "tr", 22, _forTrack0);
    __elementEnd()()();
    __element(17, "ui-pagination", 23);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(5);
    __textInterpolate(ctx_r2.t()("utilisateurs.col.name"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("utilisateurs.col.role"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("utilisateurs.col.scope"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("utilisateurs.col.state"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("utilisateurs.v2.col.actions"));
    __advance(2);
    __repeater(ctx_r2.pager.items());
    __advance(2);
    __property("pager", ctx_r2.pager);
  }
}
function SuperAdminComptesPage_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 17);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __textInterpolate(ctx_r2.t()("utilisateurs.v2.empty"));
  }
}
var ALL = "tous";
var SuperAdminComptesPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.snackbar = inject(SnackbarService);
    this.nf = nf;
    this.all = ALL;
    this.lockedRole = LOCKED_ROLE;
    this.initials = initialsOf;
    this.toneSuccess = TONE.succes;
    this.toneNeutral = TONE.neutre;
    this.roleFilter = signal(ALL, ...[]);
    this.query = signal("", ...[]);
    this.roleOpen = signal(false, ...[]);
    this.roleUserId = signal(null, ...[]);
    this.users = computed(() => this.store.state().users, ...[]);
    this.shown = computed(() => {
      const needle = this.query().trim().toLowerCase();
      const role = this.roleFilter();
      return this.users().filter((user) => (role === ALL || user.role === role) && (!needle || `${user.name} ${user.email}`.toLowerCase().includes(needle)));
    }, ...[]);
    this.pager = createPager(() => this.shown());
    this.roleUser = computed(() => {
      var _a2;
      return (_a2 = this.users().find((user) => user.id === this.roleUserId())) != null ? _a2 : null;
    }, ...[]);
    if (isApiMode()) this.loadFromApi();
  }
  async loadFromApi() {
    try {
      const [users, roles] = await Promise.all([fetchAllPages(listUsers), listRolePermissions()]);
      this.store.actions.replaceUsersFromApi(users);
      this.store.actions.replaceRolePermissionsFromApi(Object.fromEntries(roles.items.map((entry) => [entry.role, entry.permissions])), roles.customRoles);
    } catch {
      this.snackbar.error(this.locale.tNow("utilisateurs.v2.loadError"));
    }
  }
  countOf(role) {
    return this.users().filter((user) => user.role === role).length;
  }
  tone(role) {
    if (role === "superadmin") return {
      bg: "var(--v2-citron)",
      fg: "var(--v2-foret)"
    };
    return this.store.roleScoped(role) ? TONE.culture : TONE.info;
  }
  scopeLabel(user) {
    var _a2;
    const ids = (_a2 = user.scoopIds) != null ? _a2 : user.scoopId ? [user.scoopId] : [];
    if (!ids.length) return this.t()("utilisateurs.scopeAll");
    return ids.map((id) => {
      var _a3, _b;
      return (_b = (_a3 = this.store.state().scoops.find((scoop) => scoop.id === id)) == null ? void 0 : _a3.name) != null ? _b : id;
    }).join(", ");
  }
  openRole(user) {
    this.roleUserId.set(user.id);
    this.roleOpen.set(true);
  }
}, _a.\u0275fac = function SuperAdminComptesPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-super-admin-comptes-page"]],
  decls: 27,
  vars: 19,
  consts: [
    [
      "perm",
      "role.configure",
      3,
      "area"
    ],
    [1, "rise"],
    [
      1,
      "mono",
      "inline-flex",
      "items-center",
      "gap-1.5",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "name",
      "lock",
      3,
      "size"
    ],
    [
      1,
      "mt-2",
      "text-[30px]",
      "font-extrabold",
      "leading-[1.05]",
      "tracking-[-0.03em]",
      "sm:text-[38px]"
    ],
    [
      1,
      "mt-2",
      "max-w-2xl",
      "text-[16px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "card",
      "mt-6",
      "p-4"
    ],
    [
      1,
      "mono",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "role",
      "radiogroup",
      1,
      "chips",
      "mt-3"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "chip",
      3,
      "click"
    ],
    [1, "n"],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "chip",
      3,
      "on"
    ],
    [
      1,
      "toolbar",
      "card",
      "mt-4"
    ],
    [1, "search"],
    [
      "name",
      "search",
      3,
      "size"
    ],
    [
      "type",
      "search",
      3,
      "input",
      "placeholder",
      "value"
    ],
    [
      1,
      "card",
      "mt-4",
      "overflow-hidden"
    ],
    [
      1,
      "sub",
      "p-8",
      "text-center"
    ],
    [
      3,
      "openChange",
      "open",
      "user"
    ],
    [1, "overflow-x-auto"],
    [
      1,
      "tbl",
      "min-w-[760px]"
    ],
    [1, "text-right"],
    [1, "row-link"],
    [
      1,
      "px-5",
      "pb-5",
      3,
      "pager"
    ],
    [
      1,
      "row-link",
      3,
      "click"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-3"
    ],
    [1, "avatar"],
    [1, "min-w-0"],
    [
      1,
      "block",
      "truncate",
      "font-bold"
    ],
    [
      1,
      "sub",
      "block",
      "truncate"
    ],
    [1, "badge"],
    [
      1,
      "max-w-56",
      "truncate",
      "font-medium"
    ],
    [3, "click"],
    [
      1,
      "flex",
      "justify-end",
      "gap-2"
    ],
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
      "name",
      "admin_panel_settings",
      3,
      "size"
    ],
    [3, "user"]
  ],
  template: function SuperAdminComptesPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0)(1, "header", 1)(2, "p", 2);
      __element(3, "ui-icon", 3);
      __text(4);
      __elementEnd();
      __elementStart(5, "h1", 4);
      __text(6);
      __elementEnd();
      __elementStart(7, "p", 5);
      __text(8);
      __elementEnd()();
      __elementStart(9, "section", 6)(10, "p", 7);
      __text(11);
      __elementEnd();
      __elementStart(12, "div", 8)(13, "button", 9);
      __listener("click", function SuperAdminComptesPage_Template_button_click_13_listener() {
        return ctx.roleFilter.set(ctx.all);
      });
      __text(14);
      __elementStart(15, "span", 10);
      __text(16);
      __elementEnd()();
      __repeaterCreate(17, SuperAdminComptesPage_For_18_Template, 4, 7, "button", 11, __repeaterTrackByIdentity);
      __elementEnd()();
      __elementStart(19, "div", 12)(20, "label", 13);
      __element(21, "ui-icon", 14);
      __elementStart(22, "input", 15);
      __listener("input", function SuperAdminComptesPage_Template_input_input_22_listener($event) {
        return ctx.query.set($event.target.value);
      });
      __elementEnd()()();
      __elementStart(23, "section", 16);
      __conditionalCreate(24, SuperAdminComptesPage_Conditional_24_Template, 18, 6)(25, SuperAdminComptesPage_Conditional_25_Template, 2, 1, "p", 17);
      __elementEnd();
      __elementStart(26, "app-user-role-dialog", 18);
      __twoWayListener("openChange", function SuperAdminComptesPage_Template_app_user_role_dialog_openChange_26_listener($event) {
        __twoWayBindingSet(ctx.roleOpen, $event) || (ctx.roleOpen = $event);
        return $event;
      });
      __elementEnd()();
    }
    if (rf & 2) {
      __property("area", ctx.t()("superadmin.accounts.title"));
      __advance(3);
      __property("size", 14);
      __advance();
      __textInterpolate(ctx.t()("superadmin.eyebrow"));
      __advance(2);
      __textInterpolate(ctx.t()("superadmin.accounts.title"));
      __advance(2);
      __textInterpolate(ctx.t()("superadmin.accounts.description"));
      __advance(3);
      __textInterpolate(ctx.t()("superadmin.accounts.byRole"));
      __advance();
      __attribute("aria-label", ctx.t()("superadmin.accounts.byRole"));
      __advance();
      __classProp("on", ctx.roleFilter() === ctx.all);
      __attribute("aria-checked", ctx.roleFilter() === ctx.all);
      __advance();
      __textInterpolate1(" ", ctx.t()("utilisateurs.v2.allRoles"));
      __advance(2);
      __textInterpolate(ctx.nf.format(ctx.users().length));
      __advance();
      __repeater(ctx.store.allRoles());
      __advance(4);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("utilisateurs.v2.search"))("value", ctx.query());
      __attribute("aria-label", ctx.t()("utilisateurs.v2.search"));
      __advance(2);
      __conditional(ctx.shown().length ? 24 : 25);
      __advance(2);
      __twoWayProperty("open", ctx.roleOpen);
      __property("user", ctx.roleUser());
    }
  },
  dependencies: [
    AccountActionsComponent,
    AppShellComponent,
    IconComponent,
    PaginationComponent,
    UserRoleDialogComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".chips[_ngcontent-%COMP%] {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 8px;\n      }\n      .chip[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        gap: 8px;\n        border-radius: 999px;\n        border: 1.5px solid var(--%NS%v2-gris-trait);\n        background: var(--%NS%v2-blanc);\n        padding: 7px 12px;\n        font-size: 13px;\n        font-weight: 700;\n        cursor: pointer;\n      }\n      .chip[_ngcontent-%COMP%]:hover {\n        border-color: var(--%NS%v2-foret);\n      }\n      .chip.on[_ngcontent-%COMP%] {\n        border-color: var(--%NS%v2-foret);\n        background: var(--%NS%v2-foret);\n        color: var(--%NS%v2-blanc);\n      }\n      .chip[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n        border-radius: 999px;\n        background: var(--%NS%v2-creme);\n        padding: 1px 8px;\n        color: var(--%NS%v2-foret);\n      }\n      .chip[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n        color: var(--%NS%v2-gris-texte);\n      }\n      .chip[_ngcontent-%COMP%]:focus-visible {\n        outline: 2px solid var(--%NS%v2-foret);\n        outline-offset: 2px;\n      }"]
}), _a);

export { SuperAdminComptesPage as default };
//# sourceMappingURL=super-admin.comptes.page-DPo9CFEm.mjs.map

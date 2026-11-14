import { i as inject, R as Router, A as ActivatedRoute, F as signal, c as computed, e as effect, ɵ as __defineComponent, d as RouterLink, f as __elementStart, g as __text, h as __elementEnd, H as __listener, b as __element, j as __conditionalCreate, I as __twoWayListener, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, u as __attribute, x as __pureFunction2, s as __conditional, K as __twoWayProperty, w as __nextContext, L as __getCurrentView, O as __restoreView, P as __resetView, Q as __twoWayBindingSet, m as __repeaterCreate, v as __repeater, t as __styleProp, z as __classProp, M as __pureFunction0, r as __pureFunction1 } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { L as LocaleService, j as nf, ak as LOCKED_ROLE, aj as isApiMode, at as roleAllowsManyScoops, ae as SUPER_ADMIN_ONLY_ROLES } from './locale.service-c0QhtcVY.mjs';
import { s as fetchAllPages, q as CheckListComponent, M as ModalComponent, P as PaginationComponent, S as SelectComponent, g as StatCardsComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';
import { a as listRolePermissions } from './roles-_rD1LcFH.mjs';
import { l as listUsers, c as createUser, A as AccountActionsComponent, U as UserRoleDialogComponent } from './user-role-dialog.component-CU8swM4X.mjs';
import { n as normalizeEmail } from './policy-CKiWt4l5.mjs';
import { T as TONE, i as initialsOf } from './v2-page.styles-DN_FuKKd.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { T as TechnicianDialogComponent } from './technician-dialog.component-BZhETki0.mjs';
import { map } from 'rxjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'rxjs/operators';
import 'node:module';
import 'node:async_hooks';
import './lucide-angular-RJABeBQ2.mjs';
import 'clsx';
import 'tailwind-merge';
import 'date-fns';
import 'date-fns/locale';
import './client-D1lxPQMx.mjs';
import 'zod';

var _a;
var _c0 = (a0, a1) => ({
  shown: a0,
  total: a1
});
var _c1 = () => ["/dashboard/appareils"];
var _c2 = (a0) => ({ user: a0 });
var _c3 = (a0, a1) => ({
  active: a0,
  total: a1
});
var _c4 = (a0) => ({ name: a0 });
var _c5 = () => ["/dashboard/comptes"];
var _c6 = (a0) => ({ vue: a0 });
var _c7 = () => ["/dashboard/audit"];
var _c8 = (a0) => ({ q: a0 });
var _forTrack0 = ($index, $item) => $item.id;
function UtilisateursPage_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 20);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate(ctx_r0.t()("utilisateurs.v2.loading"));
  }
}
function UtilisateursPage_Conditional_27_For_18_Conditional_14_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 43);
  if (rf & 2) __property("size", 14);
}
function UtilisateursPage_Conditional_27_For_18_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 45);
    __element(1, "ui-icon", 53);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const user_r2 = __nextContext().$implicit;
    const ctx_r0 = __nextContext(2);
    __property("routerLink", __pureFunction0(4, _c1))("queryParams", __pureFunction1(5, _c2, user_r2.id));
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate1("", ctx_r0.t()("utilisateurs.devicesActive", __pureFunction2(7, _c3, ctx_r0.activeDevices(user_r2.id), ctx_r0.devicesOf(user_r2.id).length)), " ");
  }
}
function UtilisateursPage_Conditional_27_For_18_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 46);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r0.t()("utilisateurs.devicesNone"));
  }
}
function UtilisateursPage_Conditional_27_For_18_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 42);
    __element(1, "ui-icon", 54);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __styleProp("background", ctx_r0.toneInfo.bg)("color", ctx_r0.toneInfo.fg);
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate(ctx_r0.t()("utilisateurs.v2.invited"));
  }
}
function UtilisateursPage_Conditional_27_For_18_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 42);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __styleProp("background", ctx_r0.toneSuccess.bg)("color", ctx_r0.toneSuccess.fg);
    __advance();
    __textInterpolate(ctx_r0.t()("utilisateurs.state.active"));
  }
}
function UtilisateursPage_Conditional_27_For_18_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 42);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __styleProp("background", ctx_r0.toneNeutral.bg)("color", ctx_r0.toneNeutral.fg);
    __advance();
    __textInterpolate(ctx_r0.t()("utilisateurs.state.inactive"));
  }
}
function UtilisateursPage_Conditional_27_For_18_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "button", 55);
    __listener("click", function UtilisateursPage_Conditional_27_For_18_Conditional_27_Template_button_click_0_listener() {
      __restoreView(_r3);
      const user_r2 = __nextContext().$implicit;
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.openRole(user_r2));
    });
    __element(1, "ui-icon", 56);
    __elementEnd();
  }
  if (rf & 2) {
    const user_r2 = __nextContext().$implicit;
    const ctx_r0 = __nextContext(2);
    __property("title", ctx_r0.t()("utilisateurs.v2.changeRole"));
    __attribute("aria-label", ctx_r0.t()("utilisateurs.v2.changeRoleFor", __pureFunction1(3, _c4, user_r2.name)));
    __advance();
    __property("size", 18);
  }
}
function UtilisateursPage_Conditional_27_For_18_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 51);
    __element(1, "ui-icon", 57);
    __elementEnd();
  }
  if (rf & 2) {
    const user_r2 = __nextContext().$implicit;
    const ctx_r0 = __nextContext(2);
    __property("title", ctx_r0.hasLink(user_r2.id) ? ctx_r0.t()("utilisateurs.action.linked") : ctx_r0.t()("utilisateurs.action.link"))("routerLink", __pureFunction0(5, _c5))("queryParams", __pureFunction1(6, _c6, ctx_r0.hasLink(user_r2.id) ? "liees" : "a-rapprocher"));
    __attribute("aria-label", ctx_r0.hasLink(user_r2.id) ? ctx_r0.t()("utilisateurs.action.linked") : ctx_r0.t()("utilisateurs.action.link"));
    __advance();
    __property("size", 18);
  }
}
function UtilisateursPage_Conditional_27_For_18_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 51);
    __element(1, "ui-icon", 58);
    __elementEnd();
  }
  if (rf & 2) {
    const user_r2 = __nextContext().$implicit;
    const ctx_r0 = __nextContext(2);
    __property("title", ctx_r0.t()("utilisateurs.action.audit"))("routerLink", __pureFunction0(5, _c7))("queryParams", __pureFunction1(6, _c8, user_r2.name));
    __attribute("aria-label", ctx_r0.t()("utilisateurs.action.audit"));
    __advance();
    __property("size", 18);
  }
}
function UtilisateursPage_Conditional_27_For_18_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "tr")(1, "td")(2, "span", 37)(3, "span", 38);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 2)(6, "span", 39);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 40);
    __text(9);
    __elementEnd();
    __elementStart(10, "span", 41);
    __text(11);
    __elementEnd()()()();
    __elementStart(12, "td")(13, "span", 42);
    __conditionalCreate(14, UtilisateursPage_Conditional_27_For_18_Conditional_14_Template, 1, 1, "ui-icon", 43);
    __text(15);
    __elementEnd()();
    __elementStart(16, "td", 44);
    __text(17);
    __elementEnd();
    __elementStart(18, "td");
    __conditionalCreate(19, UtilisateursPage_Conditional_27_For_18_Conditional_19_Template, 3, 10, "a", 45)(20, UtilisateursPage_Conditional_27_For_18_Conditional_20_Template, 2, 1, "span", 46);
    __elementEnd();
    __elementStart(21, "td");
    __conditionalCreate(22, UtilisateursPage_Conditional_27_For_18_Conditional_22_Template, 3, 6, "span", 47)(23, UtilisateursPage_Conditional_27_For_18_Conditional_23_Template, 2, 5, "span", 47)(24, UtilisateursPage_Conditional_27_For_18_Conditional_24_Template, 2, 5, "span", 47);
    __elementEnd();
    __elementStart(25, "td", 48)(26, "span", 49);
    __conditionalCreate(27, UtilisateursPage_Conditional_27_For_18_Conditional_27_Template, 2, 5, "button", 50);
    __conditionalCreate(28, UtilisateursPage_Conditional_27_For_18_Conditional_28_Template, 2, 8, "a", 51);
    __conditionalCreate(29, UtilisateursPage_Conditional_27_For_18_Conditional_29_Template, 2, 8, "a", 51);
    __element(30, "app-account-actions", 52);
    __elementEnd()()();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    const ctx_r0 = __nextContext(2);
    __advance(3);
    __styleProp("background", ctx_r0.tone(user_r2.role).bg)("color", ctx_r0.tone(user_r2.role).fg);
    __advance();
    __textInterpolate(ctx_r0.initials(user_r2.name));
    __advance(3);
    __textInterpolate(user_r2.name);
    __advance(2);
    __textInterpolate(user_r2.email);
    __advance();
    __classProp("zero", !user_r2.phone);
    __advance();
    __textInterpolate(user_r2.phone ? ctx_r0.store.phone(user_r2.phone) : ctx_r0.t()("utilisateurs.phoneNone"));
    __advance(2);
    __styleProp("background", ctx_r0.tone(user_r2.role).bg)("color", ctx_r0.tone(user_r2.role).fg);
    __advance();
    __conditional(user_r2.role === ctx_r0.lockedRole ? 14 : -1);
    __advance();
    __textInterpolate1(" ", ctx_r0.store.roleLabel(user_r2.role), " ");
    __advance(2);
    __textInterpolate(ctx_r0.scopeLabel(user_r2));
    __advance(2);
    __conditional(ctx_r0.devicesOf(user_r2.id).length ? 19 : 20);
    __advance(3);
    __conditional(user_r2.invited && !user_r2.active ? 22 : user_r2.active ? 23 : 24);
    __advance(5);
    __conditional(ctx_r0.canEditRole(user_r2) ? 27 : -1);
    __advance();
    __conditional(ctx_r0.store.can("account.manage") ? 28 : -1);
    __advance();
    __conditional(ctx_r0.store.can("audit.read") ? 29 : -1);
    __advance();
    __property("user", user_r2);
  }
}
function UtilisateursPage_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 33)(1, "table", 34)(2, "thead")(3, "tr")(4, "th");
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
    __elementStart(12, "th");
    __text(13);
    __elementEnd();
    __elementStart(14, "th", 35);
    __text(15);
    __elementEnd()()();
    __elementStart(16, "tbody");
    __repeaterCreate(17, UtilisateursPage_Conditional_27_For_18_Template, 31, 23, "tr", null, _forTrack0);
    __elementEnd()()();
    __element(19, "ui-pagination", 36);
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance(5);
    __textInterpolate(ctx_r0.t()("utilisateurs.col.name"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("utilisateurs.col.role"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("utilisateurs.col.scope"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("utilisateurs.col.devices"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("utilisateurs.col.state"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("utilisateurs.v2.col.actions"));
    __advance(2);
    __repeater(ctx_r0.usersPager.items());
    __advance(2);
    __property("pager", ctx_r0.usersPager);
  }
}
function UtilisateursPage_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 21)(1, "span", 59);
    __element(2, "ui-icon", 60);
    __elementEnd();
    __elementStart(3, "p", 61);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r0.t()("utilisateurs.v2.empty"));
  }
}
function UtilisateursPage_Conditional_35_Conditional_0_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "ui-check-list", 64);
    __listener("valueChange", function UtilisateursPage_Conditional_35_Conditional_0_Template_ui_check_list_valueChange_0_listener($event) {
      __restoreView(_r4);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.newScoopIds.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __property("label", ctx_r0.t()("roles.dialog.scoops"))("options", ctx_r0.scoopOptions())("value", ctx_r0.newScoopIds())("error", (_a2 = ctx_r0.newErrors().scoop) != null ? _a2 : "");
  }
}
function UtilisateursPage_Conditional_35_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 66);
    __element(1, "ui-icon", 67);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx);
  }
}
function UtilisateursPage_Conditional_35_Conditional_1_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "div", 63)(1, "ui-select", 65);
    __listener("valueChange", function UtilisateursPage_Conditional_35_Conditional_1_Template_ui_select_valueChange_1_listener($event) {
      __restoreView(_r5);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.newScoopIds.set([$event]));
    });
    __elementEnd();
    __conditionalCreate(2, UtilisateursPage_Conditional_35_Conditional_1_Conditional_2_Template, 3, 2, "p", 66);
    __elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r0 = __nextContext(2);
    __advance();
    __property("label", ctx_r0.t()("roles.dialog.scoop"))("options", ctx_r0.scoopOptions())("value", (_a2 = ctx_r0.newScoopIds()[0]) != null ? _a2 : "")("placeholder", ctx_r0.t()("roles.dialog.scoopPh"));
    __advance();
    __conditional((tmp_6_0 = ctx_r0.newErrors().scoop) ? 2 : -1, tmp_6_0);
  }
}
function UtilisateursPage_Conditional_35_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, UtilisateursPage_Conditional_35_Conditional_0_Template, 1, 4, "ui-check-list", 62)(1, UtilisateursPage_Conditional_35_Conditional_1_Template, 3, 5, "div", 63);
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __conditional(ctx_r0.newManyScoops() ? 0 : 1);
  }
}
var ALL = "tous";
var UtilisateursPage = (_a = class {
  /** Couleur d'un rôle : super administrateur en citron, rôles de coopérative en culture, consolidés en info. */
  tone(role) {
    if (role === "superadmin") return {
      bg: "var(--v2-citron)",
      fg: "var(--v2-foret)"
    };
    return this.store.roleScoped(role) ? TONE.culture : TONE.info;
  }
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.snackbar = inject(SnackbarService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.nf = nf;
    this.lockedRole = LOCKED_ROLE;
    this.toneInfo = TONE.info;
    this.toneSuccess = TONE.succes;
    this.toneNeutral = TONE.neutre;
    this.initials = initialsOf;
    this.queryFromRoute = toSignal(this.route.queryParamMap.pipe(map((params) => {
      var _a2;
      return (_a2 = params.get("q")) != null ? _a2 : "";
    })), { initialValue: "" });
    this.query = signal("", ...[]);
    this.roleFilter = signal(ALL, ...[]);
    this.loading = signal(isApiMode(), ...[]);
    this.techOpen = signal(false, ...[]);
    this.roleOpen = signal(false, ...[]);
    this.roleUserId = signal(null, ...[]);
    this.newOpen = signal(false, ...[]);
    this.creating = signal(false, ...[]);
    this.newName = signal("", ...[]);
    this.newEmail = signal("", ...[]);
    this.newPhone = signal("", ...[]);
    this.newRole = signal("gestionnaire", ...[]);
    this.newScoopIds = signal([], ...[]);
    this.newSubmitted = signal(false, ...[]);
    this.users = computed(() => this.store.state().users, ...[]);
    this.shownUsers = computed(() => {
      const needle = this.query().trim().toLowerCase();
      const role = this.roleFilter();
      return this.users().filter((user) => (role === ALL || user.role === role) && (!needle || `${user.name} ${user.email}`.toLowerCase().includes(needle)));
    }, ...[]);
    this.usersPager = createPager(() => this.shownUsers());
    this.stats = computed(() => {
      const t = this.t();
      const users = this.users();
      const active = users.filter((user) => user.active).length;
      const invited = users.filter((user) => user.invited && !user.active).length;
      return [
        {
          label: t("utilisateurs.v2.stat.accounts"),
          value: nf.format(users.length),
          sub: t("utilisateurs.v2.stat.accountsSub", { count: nf.format(active) }),
          icon: "group",
          bg: "",
          fg: ""
        },
        {
          label: t("utilisateurs.v2.stat.inactive"),
          value: nf.format(users.length - active - invited),
          sub: t("utilisateurs.v2.stat.inactiveSub"),
          icon: "block",
          ...TONE.neutre
        },
        {
          label: t("utilisateurs.v2.stat.invited"),
          value: nf.format(invited),
          sub: t("utilisateurs.v2.stat.invitedSub"),
          icon: "mark_email_unread",
          ...TONE.info
        },
        {
          label: t("utilisateurs.v2.stat.roles"),
          value: nf.format(new Set(users.map((user) => user.role)).size),
          sub: t("utilisateurs.v2.stat.rolesSub", { count: nf.format(this.store.allRoles().length) }),
          icon: "admin_panel_settings",
          ...TONE.attente
        }
      ];
    }, ...[]);
    this.roleFilterOptions = computed(() => [{
      value: ALL,
      label: this.t()("utilisateurs.v2.allRoles"),
      hint: nf.format(this.users().length)
    }, ...this.store.allRoles().map((role) => ({
      value: role,
      label: this.store.roleLabel(role),
      hint: nf.format(this.users().filter((user) => user.role === role).length)
    }))], ...[]);
    this.assignableRoleOptions = computed(() => {
      return this.store.assignableRoleIds(this.newScoopIds()).map((role) => ({
        value: role,
        label: this.store.roleLabel(role),
        icon: role === "superadmin" ? "lock" : this.store.roleScoped(role) ? "apartment" : "public"
      }));
    }, ...[]);
    this.scoopOptions = computed(() => this.store.state().scoops.filter((scoop) => !scoop.archived).map((scoop) => ({
      value: scoop.id,
      label: scoop.name
    })), ...[]);
    this.newRoleScoped = computed(() => this.store.roleScoped(this.newRole()), ...[]);
    this.newManyScoops = computed(() => roleAllowsManyScoops(this.newRole()), ...[]);
    this.roleUser = computed(() => {
      var _a2;
      return (_a2 = this.users().find((user) => user.id === this.roleUserId())) != null ? _a2 : null;
    }, ...[]);
    this.newErrors = computed(() => {
      if (!this.newSubmitted()) return {};
      const t = this.t();
      const errors = {};
      const typedEmail = this.newEmail().trim();
      const email = normalizeEmail(typedEmail);
      if (this.newName().trim().replace(/\s+/g, " ").split(" ").length < 2) errors.name = t("utilisateurs.v2.err.name");
      if (!typedEmail || !email) errors.email = t("utilisateurs.err.emailInvalid");
      else if (this.users().some((user) => user.email.toLowerCase() === email)) errors.email = t("utilisateurs.err.emailTaken");
      const phone = this.newPhone().trim();
      if (phone && !/^7[0678]\s?\d{3}\s?\d{2}\s?\d{2}$/.test(phone)) errors.phone = t("utilisateurs.err.phone");
      if (this.newRoleScoped() && !this.newScoopIds().length) errors.scoop = t("errors.roles.scoopRequired");
      return errors;
    }, ...[]);
    effect(() => this.query.set(this.queryFromRoute()));
    if (isApiMode()) this.loadFromApi();
  }
  async loadFromApi() {
    try {
      const [users, roles] = await Promise.all([fetchAllPages(listUsers), listRolePermissions()]);
      this.store.actions.replaceUsersFromApi(users);
      this.store.actions.replaceRolePermissionsFromApi(Object.fromEntries(roles.items.map((entry) => [entry.role, entry.permissions])), roles.customRoles);
    } catch {
      this.snackbar.error(this.locale.tNow("utilisateurs.v2.loadError"));
    } finally {
      this.loading.set(false);
    }
  }
  onQueryChange(value) {
    this.query.set(value);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: value.trim() || null },
      queryParamsHandling: "merge",
      replaceUrl: true
    });
  }
  scopeLabel(user) {
    var _a2;
    const ids = (_a2 = user.scoopIds) != null ? _a2 : user.scoopId ? [user.scoopId] : [];
    if (!ids.length) return this.t()("utilisateurs.scopeAll");
    const names = ids.map((id) => {
      var _a3, _b;
      return (_b = (_a3 = this.store.state().scoops.find((scoop) => scoop.id === id)) == null ? void 0 : _a3.name) != null ? _b : id;
    });
    return names.length > 2 ? `${names.slice(0, 2).join(", ")} +${names.length - 2}` : names.join(", ");
  }
  devicesOf(userId) {
    return this.store.state().devices.filter((device) => device.userId === userId);
  }
  activeDevices(userId) {
    return this.devicesOf(userId).filter((device) => device.active).length;
  }
  hasLink(userId) {
    return this.store.state().links.some((link) => link.userId === userId);
  }
  /** Les comptes administrateur et super administrateur ne se modifient que par un super administrateur. */
  canEditRole(user) {
    return !SUPER_ADMIN_ONLY_ROLES.includes(user.role) || this.store.can("role.configure");
  }
  openRole(user) {
    this.roleUserId.set(user.id);
    this.roleOpen.set(true);
  }
  openNewUser() {
    this.newName.set("");
    this.newEmail.set("");
    this.newPhone.set("");
    this.newRole.set("gestionnaire");
    this.newScoopIds.set([]);
    this.newSubmitted.set(false);
    this.newOpen.set(true);
  }
  pickNewRole(value) {
    const role = value;
    this.newRole.set(role);
    if (!roleAllowsManyScoops(role)) this.newScoopIds.update((ids) => ids.slice(0, 1));
    if (!this.store.roleScoped(role)) this.newScoopIds.set([]);
  }
  async submitNewUser() {
    var _a2, _b;
    this.newSubmitted.set(true);
    if (Object.keys(this.newErrors()).length) return;
    const role = this.newRole();
    const scoopIds = this.newRoleScoped() ? this.newScoopIds() : [];
    const payload = {
      name: this.newName().trim().replace(/\s+/g, " "),
      email: normalizeEmail(this.newEmail()),
      phone: this.newPhone().trim(),
      role
    };
    this.creating.set(true);
    try {
      if (isApiMode()) {
        const created = await createUser({
          name: payload.name,
          email: payload.email,
          role: payload.role,
          ...scoopIds[0] ? { scoopId: scoopIds[0] } : {},
          ...payload.phone ? { phone: payload.phone } : {}
        });
        this.store.actions.addUser({
          id: created.id,
          name: created.name,
          email: created.email,
          phone: (_a2 = created.phone) != null ? _a2 : "",
          role: created.role,
          scoopId: (_b = created.scoopId) != null ? _b : void 0,
          ...roleAllowsManyScoops(role) && { scoopIds }
        });
      } else this.store.actions.addUser({
        ...payload,
        scoopId: roleAllowsManyScoops(role) ? void 0 : scoopIds[0],
        ...roleAllowsManyScoops(role) && { scoopIds }
      });
    } catch {
      this.snackbar.error(this.locale.tNow("utilisateurs.v2.apiError"));
      return;
    } finally {
      this.creating.set(false);
    }
    this.snackbar.success(this.locale.tNow("utilisateurs.toast.created"));
    this.newOpen.set(false);
  }
}, _a.\u0275fac = function UtilisateursPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-utilisateurs-page"]],
  decls: 44,
  vars: 48,
  consts: [
    [
      "perm",
      "user.manage",
      3,
      "area"
    ],
    [
      1,
      "rise",
      "flex",
      "flex-wrap",
      "items-end",
      "justify-between",
      "gap-x-6",
      "gap-y-4"
    ],
    [1, "min-w-0"],
    [
      1,
      "mono",
      2,
      "color",
      "var(--v2-gris-texte)"
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
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      3,
      "click"
    ],
    [
      "name",
      "person_add",
      3,
      "size"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-primary",
      3,
      "click"
    ],
    [1, "btn-chip"],
    [
      "name",
      "add",
      3,
      "size"
    ],
    [
      1,
      "rise",
      "mt-8",
      3,
      "stats"
    ],
    [
      1,
      "toolbar",
      "card",
      "mt-6"
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
      "variant",
      "compact",
      "leadingIcon",
      "admin_panel_settings",
      1,
      "role-filter",
      3,
      "valueChange",
      "options",
      "value"
    ],
    [
      "aria-live",
      "polite",
      1,
      "sub",
      "mt-4"
    ],
    [
      1,
      "card",
      "mt-3",
      "overflow-hidden"
    ],
    [
      1,
      "sub",
      "p-6"
    ],
    [
      1,
      "flex",
      "flex-col",
      "items-center",
      "gap-3",
      "p-10",
      "text-center"
    ],
    [
      "icon",
      "person_add",
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
      "grid",
      "gap-4",
      "sm:grid-cols-2"
    ],
    [
      "preset",
      "firstName",
      1,
      "sm:col-span-2",
      3,
      "valueChange",
      "label",
      "placeholder",
      "value",
      "error"
    ],
    [
      "preset",
      "email",
      3,
      "valueChange",
      "label",
      "hint",
      "value",
      "error"
    ],
    [
      "preset",
      "phone",
      3,
      "valueChange",
      "label",
      "optional",
      "value",
      "error"
    ],
    [
      "leadingIcon",
      "admin_panel_settings",
      1,
      "sm:col-span-2",
      3,
      "valueChange",
      "label",
      "options",
      "value"
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
    [
      "name",
      "check",
      3,
      "size"
    ],
    [
      3,
      "openChange",
      "open",
      "user"
    ],
    [
      3,
      "openChange",
      "open"
    ],
    [1, "overflow-x-auto"],
    [
      1,
      "tbl",
      "min-w-[860px]"
    ],
    [
      1,
      "pin-right",
      "text-right"
    ],
    [
      1,
      "px-5",
      "pb-5",
      3,
      "pager"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-3"
    ],
    [1, "avatar"],
    [
      1,
      "block",
      "max-w-64",
      "truncate",
      "font-bold"
    ],
    [
      1,
      "sub",
      "block",
      "max-w-64",
      "truncate"
    ],
    [
      1,
      "sub",
      "block",
      "tabular"
    ],
    [1, "badge"],
    [
      "name",
      "lock",
      3,
      "size"
    ],
    [
      1,
      "max-w-56",
      "truncate",
      "font-medium"
    ],
    [
      1,
      "inline-flex",
      "items-center",
      "gap-1.5",
      "font-bold",
      "underline-offset-4",
      "hover:underline",
      2,
      "color",
      "var(--v2-foret)",
      3,
      "routerLink",
      "queryParams"
    ],
    [1, "zero"],
    [
      1,
      "badge",
      3,
      "background",
      "color"
    ],
    [1, "pin-right"],
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
      "title"
    ],
    [
      1,
      "act",
      3,
      "title",
      "routerLink",
      "queryParams"
    ],
    [3, "user"],
    [
      "name",
      "devices",
      3,
      "size"
    ],
    [
      "name",
      "mark_email_unread",
      3,
      "size"
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
    [
      "name",
      "link",
      3,
      "size"
    ],
    [
      "name",
      "history",
      3,
      "size"
    ],
    [
      1,
      "grid",
      "size-14",
      "place-items-center",
      "rounded-[16px]",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-foret)"
    ],
    [
      "name",
      "group",
      3,
      "size"
    ],
    [
      1,
      "text-[16px]",
      "font-extrabold"
    ],
    [
      1,
      "sm:col-span-2",
      3,
      "label",
      "options",
      "value",
      "error"
    ],
    [1, "sm:col-span-2"],
    [
      1,
      "sm:col-span-2",
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
      "mt-1.5",
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
    ]
  ],
  template: function UtilisateursPage_Template(rf, ctx) {
    var _a2, _b, _c;
    if (rf & 1) {
      __elementStart(0, "app-shell", 0)(1, "header", 1)(2, "div", 2)(3, "p", 3);
      __text(4);
      __elementEnd();
      __elementStart(5, "h1", 4);
      __text(6);
      __elementEnd();
      __elementStart(7, "p", 5);
      __text(8);
      __elementEnd()();
      __elementStart(9, "span", 6)(10, "button", 7);
      __listener("click", function UtilisateursPage_Template_button_click_10_listener() {
        return ctx.techOpen.set(true);
      });
      __element(11, "ui-icon", 8);
      __text(12);
      __elementEnd();
      __elementStart(13, "button", 9);
      __listener("click", function UtilisateursPage_Template_button_click_13_listener() {
        return ctx.openNewUser();
      });
      __text(14);
      __elementStart(15, "span", 10);
      __element(16, "ui-icon", 11);
      __elementEnd()()()();
      __element(17, "ui-stat-cards", 12);
      __elementStart(18, "div", 13)(19, "label", 14);
      __element(20, "ui-icon", 15);
      __elementStart(21, "input", 16);
      __listener("input", function UtilisateursPage_Template_input_input_21_listener($event) {
        return ctx.onQueryChange($event.target.value);
      });
      __elementEnd()();
      __elementStart(22, "ui-select", 17);
      __listener("valueChange", function UtilisateursPage_Template_ui_select_valueChange_22_listener($event) {
        return ctx.roleFilter.set($event);
      });
      __elementEnd()();
      __elementStart(23, "p", 18);
      __text(24);
      __elementEnd();
      __elementStart(25, "section", 19);
      __conditionalCreate(26, UtilisateursPage_Conditional_26_Template, 2, 1, "p", 20)(27, UtilisateursPage_Conditional_27_Template, 20, 7)(28, UtilisateursPage_Conditional_28_Template, 5, 2, "div", 21);
      __elementEnd();
      __elementStart(29, "ui-modal", 22);
      __listener("closed", function UtilisateursPage_Template_ui_modal_closed_29_listener() {
        return ctx.newOpen.set(false);
      });
      __elementStart(30, "div", 23)(31, "ui-text-field", 24);
      __listener("valueChange", function UtilisateursPage_Template_ui_text_field_valueChange_31_listener($event) {
        return ctx.newName.set($event);
      });
      __elementEnd();
      __elementStart(32, "ui-text-field", 25);
      __listener("valueChange", function UtilisateursPage_Template_ui_text_field_valueChange_32_listener($event) {
        return ctx.newEmail.set($event);
      });
      __elementEnd();
      __elementStart(33, "ui-text-field", 26);
      __listener("valueChange", function UtilisateursPage_Template_ui_text_field_valueChange_33_listener($event) {
        return ctx.newPhone.set($event);
      });
      __elementEnd();
      __elementStart(34, "ui-select", 27);
      __listener("valueChange", function UtilisateursPage_Template_ui_select_valueChange_34_listener($event) {
        return ctx.pickNewRole($event);
      });
      __elementEnd();
      __conditionalCreate(35, UtilisateursPage_Conditional_35_Template, 2, 1);
      __elementEnd();
      __elementStart(36, "button", 28);
      __listener("click", function UtilisateursPage_Template_button_click_36_listener() {
        return ctx.newOpen.set(false);
      });
      __text(37);
      __elementEnd();
      __elementStart(38, "button", 29);
      __listener("click", function UtilisateursPage_Template_button_click_38_listener() {
        return ctx.submitNewUser();
      });
      __text(39);
      __elementStart(40, "span", 10);
      __element(41, "ui-icon", 30);
      __elementEnd()()();
      __elementStart(42, "app-user-role-dialog", 31);
      __twoWayListener("openChange", function UtilisateursPage_Template_app_user_role_dialog_openChange_42_listener($event) {
        __twoWayBindingSet(ctx.roleOpen, $event) || (ctx.roleOpen = $event);
        return $event;
      });
      __elementEnd();
      __elementStart(43, "app-technician-dialog", 32);
      __twoWayListener("openChange", function UtilisateursPage_Template_app_technician_dialog_openChange_43_listener($event) {
        __twoWayBindingSet(ctx.techOpen, $event) || (ctx.techOpen = $event);
        return $event;
      });
      __elementEnd()();
    }
    if (rf & 2) {
      __property("area", ctx.t()("utilisateurs.area"));
      __advance(4);
      __textInterpolate(ctx.t()("utilisateurs.eyebrow"));
      __advance(2);
      __textInterpolate(ctx.t()("utilisateurs.title"));
      __advance(2);
      __textInterpolate(ctx.t()("utilisateurs.v2.description"));
      __advance(3);
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("tech.add"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("utilisateurs.new"));
      __advance(2);
      __property("size", 20);
      __advance();
      __property("stats", ctx.stats());
      __advance(3);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("utilisateurs.v2.search"))("value", ctx.query());
      __attribute("aria-label", ctx.t()("utilisateurs.v2.search"));
      __advance();
      __property("options", ctx.roleFilterOptions())("value", ctx.roleFilter());
      __advance(2);
      __textInterpolate(ctx.t()("utilisateurs.v2.count", __pureFunction2(45, _c0, ctx.nf.format(ctx.shownUsers().length), ctx.nf.format(ctx.users().length))));
      __advance(2);
      __conditional(ctx.loading() ? 26 : ctx.shownUsers().length ? 27 : 28);
      __advance(3);
      __property("open", ctx.newOpen())("title", ctx.t()("utilisateurs.new"))("description", ctx.t()("utilisateurs.v2.newDescription"))("width", 680)("closeLabel", ctx.t()("common.close"));
      __advance(2);
      __property("label", ctx.t()("utilisateurs.form.name"))("placeholder", ctx.t()("utilisateurs.form.namePh"))("value", ctx.newName())("error", (_a2 = ctx.newErrors().name) != null ? _a2 : "");
      __advance();
      __property("label", ctx.t()("utilisateurs.form.email"))("hint", ctx.t()("utilisateurs.form.emailHint"))("value", ctx.newEmail())("error", (_b = ctx.newErrors().email) != null ? _b : "");
      __advance();
      __property("label", ctx.t()("utilisateurs.form.phone"))("optional", ctx.t()("utilisateurs.v2.optional"))("value", ctx.newPhone())("error", (_c = ctx.newErrors().phone) != null ? _c : "");
      __advance();
      __property("label", ctx.t()("utilisateurs.form.role"))("options", ctx.assignableRoleOptions())("value", ctx.newRole());
      __advance();
      __conditional(ctx.newRoleScoped() ? 35 : -1);
      __advance(2);
      __textInterpolate(ctx.t()("common.cancel"));
      __advance();
      __property("disabled", ctx.creating());
      __advance();
      __textInterpolate1(" ", ctx.t()("utilisateurs.create"));
      __advance(2);
      __property("size", 18);
      __advance();
      __twoWayProperty("open", ctx.roleOpen);
      __property("user", ctx.roleUser());
      __advance();
      __twoWayProperty("open", ctx.techOpen);
    }
  },
  dependencies: [
    AccountActionsComponent,
    AppShellComponent,
    CheckListComponent,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    RouterLink,
    SelectComponent,
    StatCardsComponent,
    TechnicianDialogComponent,
    TextFieldComponent,
    UserRoleDialogComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".role-filter[_ngcontent-%COMP%] {\n        min-width: 240px;\n      }\n      \n      .pin-right[_ngcontent-%COMP%] {\n        position: sticky;\n        right: 0;\n        z-index: 1;\n        background: var(--%NS%v2-blanc);\n        box-shadow: -1px 0 0 var(--%NS%v2-separateur);\n      }"]
}), _a);

export { UtilisateursPage as default };
//# sourceMappingURL=utilisateurs.page-Ck3iQkUN.mjs.map

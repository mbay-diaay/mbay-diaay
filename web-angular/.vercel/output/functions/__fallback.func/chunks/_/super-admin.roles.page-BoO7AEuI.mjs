import { i as inject, F as signal, c as computed, ɵ as __defineComponent, d as RouterLink, f as __elementStart, b as __element, g as __text, h as __elementEnd, H as __listener, I as __twoWayListener, m as __repeaterCreate, j as __conditionalCreate, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, K as __twoWayProperty, v as __repeater, s as __conditional, w as __nextContext, N as __textInterpolate2, L as __getCurrentView, r as __pureFunction1, O as __restoreView, P as __resetView, Q as __twoWayBindingSet } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, f as fmtDateTime, aa as BUILT_IN_ROLES, am as DEFAULT_ROLE_PERMISSIONS, j as nf, aj as isApiMode } from './locale.service-c0QhtcVY.mjs';
import { a as listRolePermissions, b as updateCustomRole, e as createCustomRole, f as deleteCustomRole, g as updateRolePermissions, r as resetRolePermissions } from './roles-_rD1LcFH.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { R as RoleFormDialogComponent, a as RolePermissionsEditorComponent } from './role-permissions-editor.component-DxE2JuZw.mjs';
import { T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { M as ModalComponent, S as SelectComponent, g as StatCardsComponent } from './ui-DDO8FoUF.mjs';
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
import './client-D1lxPQMx.mjs';
import './role-access-preview.component-CIV_Ci6R.mjs';
import './nav-CV7kBTDN.mjs';
import 'clsx';
import 'tailwind-merge';
import 'date-fns';
import 'date-fns/locale';

var _a;
var _c0 = (a0) => ({ name: a0 });
var _c1 = (a0) => ({ count: a0 });
var _forTrack0 = ($index, $item) => $item.id;
function SuperAdminRolesPage_For_27_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 25);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const entry_r2 = __nextContext().$implicit;
    __advance();
    __textInterpolate(entry_r2.detail);
  }
}
function SuperAdminRolesPage_For_27_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li")(1, "span", 22);
    __element(2, "ui-icon", 23);
    __elementEnd();
    __elementStart(3, "span", 2)(4, "span", 24);
    __text(5);
    __elementEnd();
    __conditionalCreate(6, SuperAdminRolesPage_For_27_Conditional_6_Template, 2, 1, "span", 25);
    __elementStart(7, "span", 26);
    __text(8);
    __elementEnd()()();
  }
  if (rf & 2) {
    const entry_r2 = ctx.$implicit;
    const ctx_r0 = __nextContext();
    __advance(2);
    __property("size", 18);
    __advance(3);
    __textInterpolate2("", entry_r2.action, " \xB7 ", entry_r2.entity);
    __advance();
    __conditional(entry_r2.detail ? 6 : -1);
    __advance(2);
    __textInterpolate2("", entry_r2.user, " \xB7 ", ctx_r0.fmtDateTime(entry_r2.at));
  }
}
function SuperAdminRolesPage_ForEmpty_28_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 19);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate(ctx_r0.t()("superadmin.roles.recentNone"));
  }
}
function SuperAdminRolesPage_Conditional_30_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 31);
    __element(1, "ui-icon", 32);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r0.t()("errors.roles.reassignRequired"));
  }
}
function SuperAdminRolesPage_Conditional_30_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "ui-select", 30);
    __listener("valueChange", function SuperAdminRolesPage_Conditional_30_Conditional_1_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r4);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.reassignTo.set($event));
    });
    __elementEnd();
    __conditionalCreate(1, SuperAdminRolesPage_Conditional_30_Conditional_1_Conditional_1_Template, 3, 2, "p", 31);
  }
  if (rf & 2) {
    const deletedRole_r5 = __nextContext();
    const ctx_r0 = __nextContext();
    __property("label", ctx_r0.t()("superadmin.roles.delete.reassign"))("options", ctx_r0.reassignOptions(deletedRole_r5))("value", ctx_r0.reassignTo())("placeholder", ctx_r0.t()("superadmin.roles.delete.reassignPh"));
    __advance();
    __conditional(ctx_r0.deleteTried() && !ctx_r0.reassignTo() ? 1 : -1);
  }
}
function SuperAdminRolesPage_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "ui-modal", 27);
    __listener("closed", function SuperAdminRolesPage_Conditional_30_Template_ui_modal_closed_0_listener() {
      __restoreView(_r3);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.deleting.set(null));
    });
    __conditionalCreate(1, SuperAdminRolesPage_Conditional_30_Conditional_1_Template, 2, 5);
    __elementStart(2, "button", 28);
    __listener("click", function SuperAdminRolesPage_Conditional_30_Template_button_click_2_listener() {
      __restoreView(_r3);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.deleting.set(null));
    });
    __text(3);
    __elementEnd();
    __elementStart(4, "button", 29);
    __listener("click", function SuperAdminRolesPage_Conditional_30_Template_button_click_4_listener() {
      const deletedRole_r5 = __restoreView(_r3);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.confirmDelete(deletedRole_r5));
    });
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const deletedRole_r5 = ctx;
    const ctx_r0 = __nextContext();
    __property("open", true)("title", ctx_r0.t()("superadmin.roles.delete.title", __pureFunction1(9, _c0, deletedRole_r5.name)))("description", ctx_r0.holders(deletedRole_r5.id) ? ctx_r0.t()("superadmin.roles.delete.descriptionUsed", __pureFunction1(11, _c1, ctx_r0.holders(deletedRole_r5.id))) : ctx_r0.t()("superadmin.roles.delete.descriptionEmpty"))("width", 560)("closeLabel", ctx_r0.t()("common.close"));
    __advance();
    __conditional(ctx_r0.holders(deletedRole_r5.id) ? 1 : -1);
    __advance(2);
    __textInterpolate(ctx_r0.t()("common.cancel"));
    __advance();
    __property("disabled", ctx_r0.saving());
    __advance();
    __textInterpolate(ctx_r0.t()("superadmin.roles.delete.confirm"));
  }
}
var ROLE_AUDIT_ACTIONS = /* @__PURE__ */ new Set([
  "Droits du r\xF4le modifi\xE9s",
  "Droits par d\xE9faut r\xE9tablis",
  "R\xF4le cr\xE9\xE9",
  "R\xF4le modifi\xE9",
  "R\xF4le supprim\xE9"
]);
var SuperAdminRolesPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.snackbar = inject(SnackbarService);
    this.fmtDateTime = fmtDateTime;
    this.selectedRole = signal("admin", ...[]);
    this.saving = signal(false, ...[]);
    this.formOpen = signal(false, ...[]);
    this.editedRoleId = signal(null, ...[]);
    this.deleting = signal(null, ...[]);
    this.reassignTo = signal("", ...[]);
    this.deleteTried = signal(false, ...[]);
    this.editedRole = computed(() => {
      var _a2;
      return (_a2 = this.store.state().customRoles.find((role) => role.id === this.editedRoleId())) != null ? _a2 : null;
    }, ...[]);
    this.recentChanges = computed(() => this.store.state().audit.filter((entry) => ROLE_AUDIT_ACTIONS.has(entry.action) || entry.action === "R\xF4le modifi\xE9").slice(0, 6), ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const state = this.store.state();
      const customIds = new Set(state.customRoles.map((role) => role.id));
      const modified = BUILT_IN_ROLES.filter((role) => {
        var _a2;
        const current = (_a2 = state.rolePermissions[role]) != null ? _a2 : [];
        const defaults = DEFAULT_ROLE_PERMISSIONS[role];
        return current.length !== defaults.length || current.some((permission) => !defaults.includes(permission));
      }).length;
      const changes = state.audit.filter((entry) => ROLE_AUDIT_ACTIONS.has(entry.action)).length;
      return [
        {
          label: t("superadmin.roles.stat.roles"),
          value: nf.format(this.store.allRoles().length),
          sub: t("superadmin.roles.stat.rolesSub", { custom: nf.format(customIds.size) }),
          icon: "admin_panel_settings",
          bg: "",
          fg: ""
        },
        {
          label: t("superadmin.roles.stat.modified"),
          value: nf.format(modified),
          sub: t("superadmin.roles.stat.modifiedSub"),
          icon: "tune",
          ...TONE.attente
        },
        {
          label: t("superadmin.roles.stat.accounts"),
          value: nf.format(state.users.length),
          sub: t("superadmin.roles.stat.accountsSub", { count: nf.format(state.users.filter((user) => customIds.has(user.role)).length) }),
          icon: "group",
          ...TONE.info
        },
        {
          label: t("superadmin.roles.stat.journal"),
          value: nf.format(changes),
          sub: t("superadmin.roles.stat.journalSub"),
          icon: "history",
          ...TONE.culture
        }
      ];
    }, ...[]);
    if (isApiMode()) this.reload();
  }
  /** Mode API : la matrice et les rôles créés viennent du serveur. */
  async reload() {
    try {
      const roles = await listRolePermissions();
      this.store.actions.replaceRolePermissionsFromApi(Object.fromEntries(roles.items.map((entry) => [entry.role, entry.permissions])), roles.customRoles);
    } catch {
      this.snackbar.error(this.locale.tNow("errors.roles.api"));
    }
  }
  holders(role) {
    return this.store.state().users.filter((user) => user.role === role).length;
  }
  /** Remplaçants possibles : même portée, jamais le super administrateur ni le rôle supprimé. */
  reassignOptions(deletedRole) {
    return this.store.allRoles().filter((role) => role !== deletedRole.id && role !== "superadmin" && this.store.roleScoped(role) === deletedRole.scoped).map((role) => ({
      value: role,
      label: this.store.roleLabel(role)
    }));
  }
  openCreate() {
    this.editedRoleId.set(null);
    this.formOpen.set(true);
  }
  openEdit(role) {
    this.editedRoleId.set(role);
    this.formOpen.set(true);
  }
  askDelete(role) {
    const target = this.store.state().customRoles.find((item) => item.id === role);
    if (!target) return;
    this.reassignTo.set("");
    this.deleteTried.set(false);
    this.deleting.set(target);
  }
  async submitForm(value) {
    const edited = this.editedRole();
    this.saving.set(true);
    try {
      if (isApiMode()) {
        if (edited) await updateCustomRole(edited.id, value);
        else {
          const created = await createCustomRole(value);
          await this.reload();
          this.selectedRole.set(created.id);
          this.done("superadmin.roles.created", value.name);
          return;
        }
        await this.reload();
      } else if (edited) {
        const updated = this.store.actions.updateRole(edited.id, value);
        if (!updated.ok) {
          this.snackbar.error(updated.error);
          return;
        }
      } else {
        const created = this.store.actions.createRole(value);
        if (!created.ok) {
          this.snackbar.error(created.error);
          return;
        }
        this.selectedRole.set(created.id);
        this.done("superadmin.roles.created", value.name);
        return;
      }
      this.done("superadmin.roles.updated", value.name);
    } catch {
      this.snackbar.error(this.locale.tNow("errors.roles.api"));
    } finally {
      this.saving.set(false);
    }
  }
  done(key, name) {
    this.formOpen.set(false);
    this.snackbar.success(this.locale.tNow(key, { name }));
  }
  async confirmDelete(deletedRole) {
    this.deleteTried.set(true);
    const count = this.holders(deletedRole.id);
    if (count && !this.reassignTo()) return;
    const reassignTo = this.reassignTo() || null;
    this.saving.set(true);
    try {
      if (isApiMode()) {
        await deleteCustomRole(deletedRole.id, reassignTo);
        await this.reload();
      } else {
        const result = this.store.actions.deleteRole(deletedRole.id, reassignTo);
        if (!result.ok) {
          this.snackbar.error(result.error);
          return;
        }
      }
      this.deleting.set(null);
      this.selectedRole.set("admin");
      this.snackbar.success(count ? this.locale.tNow("superadmin.roles.deletedMoved", {
        name: deletedRole.name,
        count
      }) : this.locale.tNow("superadmin.roles.deleted", { name: deletedRole.name }));
    } catch {
      this.snackbar.error(this.locale.tNow("errors.roles.api"));
    } finally {
      this.saving.set(false);
    }
  }
  async savePermissions(change) {
    if (isApiMode()) {
      this.saving.set(true);
      try {
        await updateRolePermissions(change.role, change.permissions);
        await this.reload();
      } catch {
        this.snackbar.error(this.locale.tNow("errors.roles.api"));
        return;
      } finally {
        this.saving.set(false);
      }
    } else {
      const result = this.store.actions.setRolePermissions(change.role, change.permissions);
      if (!result.ok) {
        this.snackbar.error(result.error);
        return;
      }
    }
    this.snackbar.success(this.locale.tNow("roles.saved", { role: this.store.roleLabel(change.role) }));
  }
  async resetRole(role) {
    if (isApiMode()) try {
      await resetRolePermissions(role);
      await this.reload();
    } catch {
      this.snackbar.error(this.locale.tNow("errors.roles.api"));
      return;
    }
    else {
      const result = this.store.actions.resetRolePermissions(role);
      if (!result.ok) {
        this.snackbar.error(result.error);
        return;
      }
    }
    this.snackbar.success(this.locale.tNow("roles.resetDone", { role: this.store.roleLabel(role) }));
  }
}, _a.\u0275fac = function SuperAdminRolesPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-super-admin-roles-page"]],
  decls: 31,
  vars: 21,
  consts: [
    [
      "perm",
      "role.configure",
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
      "mt-6",
      3,
      "selectedRoleChange",
      "save",
      "reset",
      "edit",
      "remove",
      "matrix",
      "editable",
      "busy",
      "selectedRole"
    ],
    [
      1,
      "sec-card",
      "mt-6"
    ],
    [1, "sec-head"],
    [1, "sec-ico"],
    [
      "name",
      "history",
      3,
      "size"
    ],
    [
      "routerLink",
      "/dashboard/audit",
      1,
      "btn",
      "btn-ghost",
      2,
      "height",
      "40px"
    ],
    [
      "name",
      "arrow_forward",
      3,
      "size"
    ],
    [
      1,
      "recent",
      "border-t",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [1, "sub"],
    [
      3,
      "openChange",
      "submitted",
      "open",
      "role",
      "busy"
    ],
    [
      "tone",
      "danger",
      "icon",
      "close",
      3,
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      1,
      "grid",
      "size-9",
      "shrink-0",
      "place-items-center",
      "rounded-[12px]",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-foret)"
    ],
    [
      "name",
      "admin_panel_settings",
      3,
      "size"
    ],
    [
      1,
      "block",
      "font-bold"
    ],
    [
      1,
      "block",
      "truncate",
      "text-[13px]",
      "font-medium"
    ],
    [
      1,
      "sub",
      "block"
    ],
    [
      "tone",
      "danger",
      "icon",
      "close",
      3,
      "closed",
      "open",
      "title",
      "description",
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
      "btn-danger",
      3,
      "click",
      "disabled"
    ],
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
  template: function SuperAdminRolesPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0)(1, "header", 1)(2, "div", 2)(3, "p", 3);
      __element(4, "ui-icon", 4);
      __text(5);
      __elementEnd();
      __elementStart(6, "h1", 5);
      __text(7);
      __elementEnd();
      __elementStart(8, "p", 6);
      __text(9);
      __elementEnd()();
      __elementStart(10, "button", 7);
      __listener("click", function SuperAdminRolesPage_Template_button_click_10_listener() {
        return ctx.openCreate();
      });
      __text(11);
      __elementStart(12, "span", 8);
      __element(13, "ui-icon", 9);
      __elementEnd()()();
      __element(14, "ui-stat-cards", 10);
      __elementStart(15, "app-role-permissions-editor", 11);
      __twoWayListener("selectedRoleChange", function SuperAdminRolesPage_Template_app_role_permissions_editor_selectedRoleChange_15_listener($event) {
        __twoWayBindingSet(ctx.selectedRole, $event) || (ctx.selectedRole = $event);
        return $event;
      });
      __listener("save", function SuperAdminRolesPage_Template_app_role_permissions_editor_save_15_listener($event) {
        return ctx.savePermissions($event);
      })("reset", function SuperAdminRolesPage_Template_app_role_permissions_editor_reset_15_listener($event) {
        return ctx.resetRole($event);
      })("edit", function SuperAdminRolesPage_Template_app_role_permissions_editor_edit_15_listener($event) {
        return ctx.openEdit($event);
      })("remove", function SuperAdminRolesPage_Template_app_role_permissions_editor_remove_15_listener($event) {
        return ctx.askDelete($event);
      });
      __elementEnd();
      __elementStart(16, "section", 12)(17, "div", 13)(18, "h2")(19, "span", 14);
      __element(20, "ui-icon", 15);
      __elementEnd();
      __text(21);
      __elementEnd();
      __elementStart(22, "a", 16);
      __text(23);
      __element(24, "ui-icon", 17);
      __elementEnd()();
      __elementStart(25, "ol", 18);
      __repeaterCreate(26, SuperAdminRolesPage_For_27_Template, 9, 6, "li", null, _forTrack0, false, SuperAdminRolesPage_ForEmpty_28_Template, 2, 1, "li", 19);
      __elementEnd()();
      __elementStart(29, "app-role-form-dialog", 20);
      __twoWayListener("openChange", function SuperAdminRolesPage_Template_app_role_form_dialog_openChange_29_listener($event) {
        __twoWayBindingSet(ctx.formOpen, $event) || (ctx.formOpen = $event);
        return $event;
      });
      __listener("submitted", function SuperAdminRolesPage_Template_app_role_form_dialog_submitted_29_listener($event) {
        return ctx.submitForm($event);
      });
      __elementEnd();
      __conditionalCreate(30, SuperAdminRolesPage_Conditional_30_Template, 6, 13, "ui-modal", 21);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_20_0;
      __property("area", ctx.t()("superadmin.roles.title"));
      __advance(4);
      __property("size", 14);
      __advance();
      __textInterpolate(ctx.t()("superadmin.eyebrow"));
      __advance(2);
      __textInterpolate(ctx.t()("superadmin.roles.title"));
      __advance(2);
      __textInterpolate(ctx.t()("superadmin.roles.description"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("superadmin.roles.new"));
      __advance(2);
      __property("size", 20);
      __advance();
      __property("stats", ctx.stats());
      __advance();
      __property("matrix", ctx.store.state().rolePermissions)("editable", true)("busy", ctx.saving());
      __twoWayProperty("selectedRole", ctx.selectedRole);
      __advance(5);
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("superadmin.roles.recent"));
      __advance(2);
      __textInterpolate(ctx.t()("nav.item.audit"));
      __advance();
      __property("size", 18);
      __advance(2);
      __repeater(ctx.recentChanges());
      __advance(3);
      __twoWayProperty("open", ctx.formOpen);
      __property("role", ctx.editedRole())("busy", ctx.saving());
      __advance();
      __conditional((tmp_20_0 = ctx.deleting()) ? 30 : -1, tmp_20_0);
    }
  },
  dependencies: [
    AppShellComponent,
    IconComponent,
    ModalComponent,
    RoleFormDialogComponent,
    RolePermissionsEditorComponent,
    RouterLink,
    SelectComponent,
    StatCardsComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".recent[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n        display: flex;\n        gap: 12px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 12px 20px;\n      }\n      .recent[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child {\n        border-top: none;\n      }"]
}), _a);

export { SuperAdminRolesPage as default };
//# sourceMappingURL=super-admin.roles.page-BoO7AEuI.mjs.map

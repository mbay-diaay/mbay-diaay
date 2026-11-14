import { i as inject, F as signal, c as computed, e as effect, ɵ as __defineComponent, f as __elementStart, g as __text, h as __elementEnd, H as __listener, b as __element, j as __conditionalCreate, I as __twoWayListener, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, s as __conditional, K as __twoWayProperty, a8 as untracked, L as __getCurrentView, w as __nextContext, r as __pureFunction1, O as __restoreView, P as __resetView, Q as __twoWayBindingSet } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, i as inScope, ag as delegablePermissions, ah as SUBROLE_COPY_SOURCES, ai as COOPERATIVE_ROLES, aj as isApiMode } from './locale.service-c0QhtcVY.mjs';
import { l as listScoopRoles, u as updateScoopRole, c as createScoopRole, d as deleteScoopRole, s as setScoopRolePermissions } from './roles-_rD1LcFH.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { R as RoleFormDialogComponent, a as RolePermissionsEditorComponent } from './role-permissions-editor.component-DxE2JuZw.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { M as ModalComponent, S as SelectComponent } from './ui-DDO8FoUF.mjs';
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
function RolesCooperativePage_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "div", 9)(1, "ui-select", 16);
    __listener("valueChange", function RolesCooperativePage_Conditional_13_Template_ui_select_valueChange_1_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.scoopId.set($event));
    });
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __property("label", ctx_r1.t()("coop.roles.scoop"))("options", ctx_r1.scoopOptions())("value", ctx_r1.scoopId());
  }
}
function RolesCooperativePage_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "app-role-permissions-editor", 17);
    __twoWayListener("selectedRoleChange", function RolesCooperativePage_Conditional_17_Template_app_role_permissions_editor_selectedRoleChange_0_listener($event) {
      __restoreView(_r3);
      const ctx_r1 = __nextContext();
      __twoWayBindingSet(ctx_r1.selectedRole, $event) || (ctx_r1.selectedRole = $event);
      return __resetView($event);
    });
    __listener("save", function RolesCooperativePage_Conditional_17_Template_app_role_permissions_editor_save_0_listener($event) {
      __restoreView(_r3);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.savePermissions($event));
    })("edit", function RolesCooperativePage_Conditional_17_Template_app_role_permissions_editor_edit_0_listener($event) {
      __restoreView(_r3);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.openEdit($event));
    })("remove", function RolesCooperativePage_Conditional_17_Template_app_role_permissions_editor_remove_0_listener($event) {
      __restoreView(_r3);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.askDelete($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __property("matrix", ctx_r1.store.state().rolePermissions)("editable", true)("busy", ctx_r1.saving())("onlyRoles", ctx_r1.coopRoles())("ceiling", ctx_r1.ceiling());
    __twoWayProperty("selectedRole", ctx_r1.selectedRole);
  }
}
function RolesCooperativePage_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 13)(1, "span", 18);
    __element(2, "ui-icon", 19);
    __elementEnd();
    __elementStart(3, "p", 20);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r1.t()("coop.roles.empty"));
  }
}
function RolesCooperativePage_Conditional_20_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 25);
    __element(1, "ui-icon", 26);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r1.t()("errors.roles.reassignRequired"));
  }
}
function RolesCooperativePage_Conditional_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "ui-select", 24);
    __listener("valueChange", function RolesCooperativePage_Conditional_20_Conditional_1_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r5);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.reassignTo.set($event));
    });
    __elementEnd();
    __conditionalCreate(1, RolesCooperativePage_Conditional_20_Conditional_1_Conditional_1_Template, 3, 2, "p", 25);
  }
  if (rf & 2) {
    const deletedRole_r6 = __nextContext();
    const ctx_r1 = __nextContext();
    __property("label", ctx_r1.t()("superadmin.roles.delete.reassign"))("options", ctx_r1.reassignOptions(deletedRole_r6))("value", ctx_r1.reassignTo())("placeholder", ctx_r1.t()("superadmin.roles.delete.reassignPh"));
    __advance();
    __conditional(ctx_r1.deleteTried() && !ctx_r1.reassignTo() ? 1 : -1);
  }
}
function RolesCooperativePage_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "ui-modal", 21);
    __listener("closed", function RolesCooperativePage_Conditional_20_Template_ui_modal_closed_0_listener() {
      __restoreView(_r4);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.deleting.set(null));
    });
    __conditionalCreate(1, RolesCooperativePage_Conditional_20_Conditional_1_Template, 2, 5);
    __elementStart(2, "button", 22);
    __listener("click", function RolesCooperativePage_Conditional_20_Template_button_click_2_listener() {
      __restoreView(_r4);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.deleting.set(null));
    });
    __text(3);
    __elementEnd();
    __elementStart(4, "button", 23);
    __listener("click", function RolesCooperativePage_Conditional_20_Template_button_click_4_listener() {
      const deletedRole_r6 = __restoreView(_r4);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.confirmDelete(deletedRole_r6));
    });
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const deletedRole_r6 = ctx;
    const ctx_r1 = __nextContext();
    __property("open", true)("title", ctx_r1.t()("superadmin.roles.delete.title", __pureFunction1(9, _c0, deletedRole_r6.name)))("description", ctx_r1.holders(deletedRole_r6.id) ? ctx_r1.t()("superadmin.roles.delete.descriptionUsed", __pureFunction1(11, _c1, ctx_r1.holders(deletedRole_r6.id))) : ctx_r1.t()("superadmin.roles.delete.descriptionEmpty"))("width", 560)("closeLabel", ctx_r1.t()("common.close"));
    __advance();
    __conditional(ctx_r1.holders(deletedRole_r6.id) ? 1 : -1);
    __advance(2);
    __textInterpolate(ctx_r1.t()("common.cancel"));
    __advance();
    __property("disabled", ctx_r1.saving());
    __advance();
    __textInterpolate(ctx_r1.t()("superadmin.roles.delete.confirm"));
  }
}
var RolesCooperativePage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.snackbar = inject(SnackbarService);
    this.scoopId = signal("", ...[]);
    this.selectedRole = signal("admin", ...[]);
    this.saving = signal(false, ...[]);
    this.formOpen = signal(false, ...[]);
    this.editedRoleId = signal(null, ...[]);
    this.deleting = signal(null, ...[]);
    this.reassignTo = signal("", ...[]);
    this.deleteTried = signal(false, ...[]);
    this.scoopOptions = computed(() => {
      const state = this.store.state();
      return inScope(state.scoops.filter((scoop) => !scoop.archived).map((scoop) => ({
        ...scoop,
        scoopId: scoop.id
      })), state.session).sort((first, second) => first.name.localeCompare(second.name)).map((scoop) => ({
        value: scoop.id,
        label: scoop.name,
        ...scoop.code ? { hint: scoop.code } : {}
      }));
    }, ...[]);
    this.ceiling = computed(() => {
      var _a2, _b;
      return delegablePermissions((_b = (_a2 = this.store.state().session) == null ? void 0 : _a2.permissions) != null ? _b : []);
    }, ...[]);
    this.copySources = computed(() => [...SUBROLE_COPY_SOURCES, ...this.coopRoles()], ...[]);
    this.coopRoles = computed(() => this.store.state().customRoles.filter((role) => role.scoopId === this.scoopId()).map((role) => role.id), ...[]);
    this.editedRole = computed(() => {
      var _a2;
      return (_a2 = this.store.state().customRoles.find((role) => role.id === this.editedRoleId())) != null ? _a2 : null;
    }, ...[]);
    effect(() => {
      const options = this.scoopOptions();
      untracked(() => {
        var _a2, _b;
        if (!options.some((option) => option.value === this.scoopId())) this.scoopId.set((_b = (_a2 = options[0]) == null ? void 0 : _a2.value) != null ? _b : "");
      });
    });
    effect(() => {
      const id = this.scoopId();
      if (id && isApiMode()) this.reload(id);
    });
  }
  /** Mode API : sous-rôles et droits de cette coopérative, depuis le serveur. */
  async reload(scoopId) {
    try {
      const data = await listScoopRoles(scoopId);
      const others = this.store.state().customRoles.filter((role) => role.scoopId !== scoopId);
      this.store.actions.replaceRolePermissionsFromApi({
        ...this.store.state().rolePermissions,
        ...Object.fromEntries(data.items.map((entry) => [entry.role, entry.permissions]))
      }, [...others, ...data.customRoles]);
    } catch {
      this.snackbar.error(this.locale.tNow("errors.roles.api"));
    }
  }
  holders(role) {
    return this.store.state().users.filter((user) => user.role === role).length;
  }
  /** Remplaçants possibles : un rôle de coopérative, ou un autre sous-rôle de la même coopérative. */
  reassignOptions(deletedRole) {
    return [...COOPERATIVE_ROLES, ...this.coopRoles()].filter((role) => role !== deletedRole.id && role !== "gestionnaire").map((role) => ({
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
    const scoopId = this.scoopId();
    this.saving.set(true);
    try {
      if (isApiMode()) {
        if (edited) await updateScoopRole(scoopId, edited.id, value);
        else {
          const created = await createScoopRole(scoopId, value);
          await this.reload(scoopId);
          this.selectedRole.set(created.id);
        }
      } else if (edited) {
        const result = this.store.actions.updateRole(edited.id, value);
        if (!result.ok) {
          this.snackbar.error(result.error);
          return;
        }
      } else {
        const result = this.store.actions.createRole({
          ...value,
          scoopId
        });
        if (!result.ok) {
          this.snackbar.error(result.error);
          return;
        }
        this.selectedRole.set(result.id);
      }
      this.formOpen.set(false);
      this.snackbar.success(edited ? this.locale.tNow("superadmin.roles.updated", { name: value.name }) : this.locale.tNow("coop.roles.created", { name: value.name }));
    } catch {
      this.snackbar.error(this.locale.tNow("errors.roles.api"));
    } finally {
      this.saving.set(false);
    }
  }
  async confirmDelete(deletedRole) {
    this.deleteTried.set(true);
    if (this.holders(deletedRole.id) && !this.reassignTo()) return;
    const reassignTo = this.reassignTo() || null;
    this.saving.set(true);
    try {
      if (isApiMode()) {
        await deleteScoopRole(this.scoopId(), deletedRole.id, reassignTo);
        await this.reload(this.scoopId());
      } else {
        const result = this.store.actions.deleteRole(deletedRole.id, reassignTo);
        if (!result.ok) {
          this.snackbar.error(result.error);
          return;
        }
      }
      this.deleting.set(null);
      this.snackbar.success(this.locale.tNow("superadmin.roles.deleted", { name: deletedRole.name }));
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
        await setScoopRolePermissions(this.scoopId(), change.role, change.permissions);
        await this.reload(this.scoopId());
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
}, _a.\u0275fac = function RolesCooperativePage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-roles-cooperative-page"]],
  decls: 21,
  vars: 18,
  consts: [
    [
      "perm",
      "subrole.manage",
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
      "add",
      3,
      "size"
    ],
    [
      1,
      "toolbar",
      "card",
      "mt-6"
    ],
    [
      1,
      "notice",
      "mt-6"
    ],
    [
      "name",
      "info",
      3,
      "size"
    ],
    [
      1,
      "mt-4",
      3,
      "matrix",
      "editable",
      "busy",
      "onlyRoles",
      "ceiling",
      "selectedRole"
    ],
    [
      1,
      "card",
      "mt-4",
      "flex",
      "flex-col",
      "items-center",
      "gap-3",
      "p-10",
      "text-center"
    ],
    [
      3,
      "openChange",
      "submitted",
      "open",
      "role",
      "busy",
      "lockScope",
      "ceiling",
      "copySources"
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
      "leadingIcon",
      "apartment",
      1,
      "min-w-[280px]",
      "flex-1",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      1,
      "mt-4",
      3,
      "selectedRoleChange",
      "save",
      "edit",
      "remove",
      "matrix",
      "editable",
      "busy",
      "onlyRoles",
      "ceiling",
      "selectedRole"
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
      "admin_panel_settings",
      3,
      "size"
    ],
    [
      1,
      "sub",
      "max-w-md"
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
  template: function RolesCooperativePage_Template(rf, ctx) {
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
      __elementStart(9, "button", 6);
      __listener("click", function RolesCooperativePage_Template_button_click_9_listener() {
        return ctx.openCreate();
      });
      __text(10);
      __elementStart(11, "span", 7);
      __element(12, "ui-icon", 8);
      __elementEnd()()();
      __conditionalCreate(13, RolesCooperativePage_Conditional_13_Template, 2, 3, "div", 9);
      __elementStart(14, "p", 10);
      __element(15, "ui-icon", 11);
      __text(16);
      __elementEnd();
      __conditionalCreate(17, RolesCooperativePage_Conditional_17_Template, 1, 6, "app-role-permissions-editor", 12)(18, RolesCooperativePage_Conditional_18_Template, 5, 2, "section", 13);
      __elementStart(19, "app-role-form-dialog", 14);
      __twoWayListener("openChange", function RolesCooperativePage_Template_app_role_form_dialog_openChange_19_listener($event) {
        __twoWayBindingSet(ctx.formOpen, $event) || (ctx.formOpen = $event);
        return $event;
      });
      __listener("submitted", function RolesCooperativePage_Template_app_role_form_dialog_submitted_19_listener($event) {
        return ctx.submitForm($event);
      });
      __elementEnd();
      __conditionalCreate(20, RolesCooperativePage_Conditional_20_Template, 6, 13, "ui-modal", 15);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_17_0;
      __property("area", ctx.t()("coop.roles.title"));
      __advance(4);
      __textInterpolate(ctx.t()("coop.roles.eyebrow"));
      __advance(2);
      __textInterpolate(ctx.t()("coop.roles.title"));
      __advance(2);
      __textInterpolate(ctx.t()("coop.roles.description"));
      __advance();
      __property("disabled", !ctx.scoopId());
      __advance();
      __textInterpolate1(" ", ctx.t()("coop.roles.new"));
      __advance(2);
      __property("size", 20);
      __advance();
      __conditional(ctx.scoopOptions().length > 1 ? 13 : -1);
      __advance(2);
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("coop.roles.ceiling"));
      __advance();
      __conditional(ctx.coopRoles().length ? 17 : 18);
      __advance(2);
      __twoWayProperty("open", ctx.formOpen);
      __property("role", ctx.editedRole())("busy", ctx.saving())("lockScope", true)("ceiling", ctx.ceiling())("copySources", ctx.copySources());
      __advance();
      __conditional((tmp_17_0 = ctx.deleting()) ? 20 : -1, tmp_17_0);
    }
  },
  dependencies: [
    AppShellComponent,
    IconComponent,
    ModalComponent,
    RoleFormDialogComponent,
    RolePermissionsEditorComponent,
    SelectComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }"]
}), _a);

export { RolesCooperativePage as default };
//# sourceMappingURL=roles-cooperative.page-DVkdGyec.mjs.map

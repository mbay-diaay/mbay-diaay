import { ae as model, aa as input, af as output, i as inject, F as signal, c as computed, e as effect, a8 as untracked, ɵ as __defineComponent, f as __elementStart, H as __listener, h as __elementEnd, g as __text, j as __conditionalCreate, b as __element, n as __property, r as __pureFunction1, o as __advance, q as __textInterpolate1, s as __conditional, p as __textInterpolate, m as __repeaterCreate, u as __attribute, v as __repeater, N as __textInterpolate2, x as __pureFunction2, L as __getCurrentView, w as __nextContext, z as __classProp, V as __repeaterTrackByIdentity, t as __styleProp, M as __pureFunction0, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, ak as LOCKED_ROLE, ac as isBuiltInRole, aa as BUILT_IN_ROLES, al as PERMISSION_GROUPS, am as DEFAULT_ROLE_PERMISSIONS, an as RESERVED_PERMISSIONS } from './locale.service-c0QhtcVY.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { M as ModalComponent, S as SelectComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';
import { R as RoleAccessPreviewComponent } from './role-access-preview.component-CIV_Ci6R.mjs';

var _a, _b;
var _c0$1 = (a0) => ({ name: a0 });
function RoleFormDialogComponent_Conditional_9_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 20);
    __element(1, "ui-icon", 21);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r1.t()("superadmin.roles.form.scopeLocked"));
  }
}
function RoleFormDialogComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "fieldset")(1, "legend", 12);
    __text(2);
    __elementEnd();
    __elementStart(3, "div", 13)(4, "button", 14);
    __listener("click", function RoleFormDialogComponent_Conditional_9_Template_button_click_4_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.scoped.set(true));
    });
    __elementStart(5, "span", 15);
    __element(6, "ui-icon", 16);
    __elementEnd();
    __elementStart(7, "span")(8, "span", 17);
    __text(9);
    __elementEnd();
    __elementStart(10, "span", 18);
    __text(11);
    __elementEnd()()();
    __elementStart(12, "button", 14);
    __listener("click", function RoleFormDialogComponent_Conditional_9_Template_button_click_12_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.scoped.set(false));
    });
    __elementStart(13, "span", 15);
    __element(14, "ui-icon", 19);
    __elementEnd();
    __elementStart(15, "span")(16, "span", 17);
    __text(17);
    __elementEnd();
    __elementStart(18, "span", 18);
    __text(19);
    __elementEnd()()()();
    __conditionalCreate(20, RoleFormDialogComponent_Conditional_9_Conditional_20_Template, 3, 2, "p", 20);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __textInterpolate(ctx_r1.t()("superadmin.roles.form.scope"));
    __advance(2);
    __classProp("on", ctx_r1.scoped());
    __property("disabled", ctx_r1.scopeLocked());
    __attribute("aria-checked", ctx_r1.scoped());
    __advance(2);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r1.t()("superadmin.roles.form.scopeScoop"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("superadmin.roles.form.scopeScoopHint"));
    __advance();
    __classProp("on", !ctx_r1.scoped());
    __property("disabled", ctx_r1.scopeLocked());
    __attribute("aria-checked", !ctx_r1.scoped());
    __advance(2);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r1.t()("superadmin.roles.form.scopeAll"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("superadmin.roles.form.scopeAllHint"));
    __advance();
    __conditional(ctx_r1.scopeLocked() ? 20 : -1);
  }
}
function RoleFormDialogComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "ui-select", 22);
    __listener("valueChange", function RoleFormDialogComponent_Conditional_10_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r3);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.copyFrom.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __property("label", ctx_r1.t()("superadmin.roles.form.copyFrom"))("options", ctx_r1.copyOptions())("value", ctx_r1.copyFrom());
  }
}
var NO_COPY = "";
var RoleFormDialogComponent = (_a = class {
  constructor() {
    this.open = model(false, ...[]);
    this.role = input(null, ...[]);
    this.busy = input(false, ...[]);
    this.lockScope = input(false, ...[]);
    this.ceiling = input(null, ...[]);
    this.copySources = input(null, ...[]);
    this.submitted = output();
    this.store = inject(StoreService);
    this.t = inject(LocaleService).t;
    this.name = signal("", ...[]);
    this.description = signal("", ...[]);
    this.scoped = signal(true, ...[]);
    this.copyFrom = signal(NO_COPY, ...[]);
    this.tried = signal(false, ...[]);
    this.scopeLocked = computed(() => {
      const edited = this.role();
      return !!edited && this.store.state().users.some((user) => user.role === edited.id);
    }, ...[]);
    this.copyOptions = computed(() => [{
      value: NO_COPY,
      label: this.t()("superadmin.roles.form.copyNone")
    }, ...this.store.allRoles().filter((role) => role !== LOCKED_ROLE).filter((role) => !this.copySources() || this.copySources().includes(role)).map((role) => {
      var _a2;
      return {
        value: role,
        label: this.store.roleLabel(role),
        hint: String(((_a2 = this.store.state().rolePermissions[role]) != null ? _a2 : []).length)
      };
    })], ...[]);
    this.previewPermissions = computed(() => {
      var _a2, _b2, _c;
      const source = (_b2 = (_a2 = this.role()) == null ? void 0 : _a2.id) != null ? _b2 : this.copyFrom() || null;
      const granted = source ? (_c = this.store.state().rolePermissions[source]) != null ? _c : [] : [];
      const ceiling = this.ceiling();
      return ceiling ? granted.filter((permission) => ceiling.includes(permission)) : [...granted];
    }, ...[]);
    this.errors = computed(() => {
      if (!this.tried()) return {};
      const name = this.name().trim();
      return name.length < 3 || name.length > 60 ? { name: this.t()("errors.roles.name") } : {};
    }, ...[]);
    effect(() => {
      const isOpen = this.open();
      const edited = this.role();
      untracked(() => {
        var _a2, _b2, _c;
        if (!isOpen) return;
        this.name.set((_a2 = edited == null ? void 0 : edited.name) != null ? _a2 : "");
        this.description.set((_b2 = edited == null ? void 0 : edited.description) != null ? _b2 : "");
        this.scoped.set((_c = edited == null ? void 0 : edited.scoped) != null ? _c : true);
        this.copyFrom.set(NO_COPY);
        this.tried.set(false);
      });
    });
  }
  submit() {
    this.tried.set(true);
    if (Object.keys(this.errors()).length) return;
    this.submitted.emit({
      name: this.name().trim().replace(/\s+/g, " "),
      description: this.description().trim(),
      scoped: this.lockScope() ? true : this.scoped(),
      copyFrom: this.copyFrom() || null
    });
  }
}, _a.\u0275fac = function RoleFormDialogComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-role-form-dialog"]],
  inputs: {
    open: [1, "open"],
    role: [1, "role"],
    busy: [1, "busy"],
    lockScope: [1, "lockScope"],
    ceiling: [1, "ceiling"],
    copySources: [1, "copySources"]
  },
  outputs: {
    open: "openChange",
    submitted: "submitted"
  },
  decls: 18,
  vars: 27,
  consts: [
    [
      "icon",
      "admin_panel_settings",
      "tone",
      "brand",
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
      "icon",
      "admin_panel_settings",
      3,
      "valueChange",
      "label",
      "placeholder",
      "maxlength",
      "value",
      "error"
    ],
    [
      "for",
      "role-description",
      1,
      "lbl"
    ],
    [
      2,
      "text-transform",
      "none",
      "font-weight",
      "600"
    ],
    [
      "id",
      "role-description",
      "maxlength",
      "240",
      1,
      "area",
      "mt-2",
      3,
      "input",
      "placeholder",
      "value"
    ],
    [
      "leadingIcon",
      "file_export",
      3,
      "label",
      "options",
      "value"
    ],
    [
      3,
      "bare",
      "permissions",
      "scoped",
      "hint",
      "emptyText"
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
    [1, "lbl"],
    [
      "role",
      "radiogroup",
      1,
      "scopes",
      "mt-2"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "scope",
      3,
      "click",
      "disabled"
    ],
    [1, "scope-ico"],
    [
      "name",
      "apartment",
      3,
      "size"
    ],
    [
      1,
      "block",
      "text-[15px]",
      "font-extrabold"
    ],
    [
      1,
      "block",
      "text-[13px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "name",
      "public",
      3,
      "size"
    ],
    [
      1,
      "mt-2",
      "flex",
      "items-center",
      "gap-1.5",
      "text-[13px]",
      "font-semibold",
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
      "leadingIcon",
      "file_export",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ]
  ],
  template: function RoleFormDialogComponent_Template(rf, ctx) {
    var _a2;
    if (rf & 1) {
      __elementStart(0, "ui-modal", 0);
      __listener("closed", function RoleFormDialogComponent_Template_ui_modal_closed_0_listener() {
        return ctx.open.set(false);
      });
      __elementStart(1, "div", 1)(2, "ui-text-field", 2);
      __listener("valueChange", function RoleFormDialogComponent_Template_ui_text_field_valueChange_2_listener($event) {
        return ctx.name.set($event);
      });
      __elementEnd();
      __elementStart(3, "div")(4, "label", 3);
      __text(5);
      __elementStart(6, "span", 4);
      __text(7);
      __elementEnd()();
      __elementStart(8, "textarea", 5);
      __listener("input", function RoleFormDialogComponent_Template_textarea_input_8_listener($event) {
        return ctx.description.set($event.target.value);
      });
      __elementEnd()();
      __conditionalCreate(9, RoleFormDialogComponent_Conditional_9_Template, 21, 16, "fieldset");
      __conditionalCreate(10, RoleFormDialogComponent_Conditional_10_Template, 1, 3, "ui-select", 6);
      __element(11, "app-role-access-preview", 7);
      __elementEnd();
      __elementStart(12, "button", 8);
      __listener("click", function RoleFormDialogComponent_Template_button_click_12_listener() {
        return ctx.open.set(false);
      });
      __text(13);
      __elementEnd();
      __elementStart(14, "button", 9);
      __listener("click", function RoleFormDialogComponent_Template_button_click_14_listener() {
        return ctx.submit();
      });
      __text(15);
      __elementStart(16, "span", 10);
      __element(17, "ui-icon", 11);
      __elementEnd()()();
    }
    if (rf & 2) {
      __property("open", ctx.open())("title", ctx.role() ? ctx.t()("superadmin.roles.form.editTitle", __pureFunction1(25, _c0$1, ctx.role().name)) : ctx.t()("superadmin.roles.form.createTitle"))("description", ctx.role() ? ctx.t()("superadmin.roles.form.editDescription") : ctx.t()("superadmin.roles.form.createDescription"))("width", 660)("closeLabel", ctx.t()("common.close"));
      __advance(2);
      __property("label", ctx.t()("superadmin.roles.form.name"))("placeholder", ctx.t()("superadmin.roles.form.namePh"))("maxlength", 60)("value", ctx.name())("error", (_a2 = ctx.errors().name) != null ? _a2 : "");
      __advance(3);
      __textInterpolate1("", ctx.t()("superadmin.roles.form.description"), " ");
      __advance(2);
      __textInterpolate1("(", ctx.t()("superadmin.roles.form.optional"), ")");
      __advance();
      __property("placeholder", ctx.t()("superadmin.roles.form.descriptionPh"))("value", ctx.description());
      __advance();
      __conditional(!ctx.lockScope() ? 9 : -1);
      __advance();
      __conditional(!ctx.role() ? 10 : -1);
      __advance();
      __property("bare", true)("permissions", ctx.previewPermissions())("scoped", ctx.lockScope() ? true : ctx.scoped())("hint", ctx.role() ? ctx.t()("roles.access.hintEdit") : ctx.t()("roles.access.hintCreate"))("emptyText", ctx.role() ? ctx.t()("roles.access.none") : ctx.t()("roles.access.noneCreate"));
      __advance(2);
      __textInterpolate(ctx.t()("common.cancel"));
      __advance();
      __property("disabled", ctx.busy());
      __advance();
      __textInterpolate1(" ", ctx.role() ? ctx.t()("superadmin.roles.form.save") : ctx.t()("superadmin.roles.form.create"));
      __advance(2);
      __property("size", 18);
    }
  },
  dependencies: [
    IconComponent,
    ModalComponent,
    RoleAccessPreviewComponent,
    SelectComponent,
    TextFieldComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".scopes[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 10px;\n      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n    }\n    .scope[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: 12px;\n      border-radius: 18px;\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      padding: 14px 16px;\n      text-align: left;\n      cursor: pointer;\n      transition:\n        border-color 0.15s ease,\n        background-color 0.15s ease;\n    }\n    .scope[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-foret);\n    }\n    .scope.on[_ngcontent-%COMP%] {\n      border: 2px solid var(--%NS%v2-foret);\n      background: var(--%NS%v2-sauge);\n    }\n    .scope[_ngcontent-%COMP%]:disabled {\n      cursor: not-allowed;\n      opacity: 0.55;\n    }\n    .scope[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    .scope-ico[_ngcontent-%COMP%] {\n      display: grid;\n      height: 36px;\n      width: 36px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 12px;\n      background: var(--%NS%v2-creme);\n      color: var(--%NS%v2-foret);\n    }\n    .scope.on[_ngcontent-%COMP%]   .scope-ico[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n    }\n    .lbl[_ngcontent-%COMP%] {\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0.06em;\n      text-transform: uppercase;\n      color: var(--%NS%v2-ardoise);\n    }\n    .area[_ngcontent-%COMP%] {\n      width: 100%;\n      min-height: 88px;\n      border-radius: 16px;\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      padding: 12px 16px;\n      font-size: 15px;\n      font-weight: 600;\n      color: var(--%NS%v2-encre);\n    }\n    .area[_ngcontent-%COMP%]::placeholder {\n      color: var(--%NS%v2-gris-texte);\n      font-weight: 500;\n    }\n    .area[_ngcontent-%COMP%]:focus-visible {\n      outline: none;\n      border-color: var(--%NS%v2-foret);\n      box-shadow: 0 0 0 3px color-mix(in oklab, var(--%NS%v2-foret) 18%, transparent);\n    }"]
}), _a);
var _c0 = (a0, a1) => ({
  count: a0,
  total: a1
});
var _c1 = (a0) => ({ count: a0 });
var _c2 = () => [];
var _forTrack0 = ($index, $item) => $item.key;
function RolePermissionsEditorComponent_For_3_For_3_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 25);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r0.t()("roles.custom"));
  }
}
function RolePermissionsEditorComponent_For_3_For_3_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    const _r2 = __getCurrentView();
    __elementStart(0, "button", 19);
    __listener("click", function RolePermissionsEditorComponent_For_3_For_3_Template_button_click_0_listener() {
      const role_r3 = __restoreView(_r2).$implicit;
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.selectedRole.set(role_r3));
    });
    __elementStart(1, "span", 20);
    __element(2, "ui-icon", 21);
    __elementEnd();
    __elementStart(3, "span", 22)(4, "span", 23);
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 24);
    __text(7);
    __elementEnd()();
    __conditionalCreate(8, RolePermissionsEditorComponent_For_3_For_3_Conditional_8_Template, 2, 1, "span", 25);
    __elementEnd();
  }
  if (rf & 2) {
    const role_r3 = ctx.$implicit;
    const ctx_r0 = __nextContext(2);
    __classProp("on", role_r3 === ctx_r0.selectedRole());
    __attribute("aria-current", role_r3 === ctx_r0.selectedRole() ? "true" : null);
    __advance(2);
    __property("name", role_r3 === ctx_r0.lockedRole ? "lock" : ctx_r0.store.roleScoped(role_r3) ? "apartment" : "public")("size", 20);
    __advance(3);
    __textInterpolate(ctx_r0.store.roleLabel(role_r3));
    __advance(2);
    __textInterpolate2("", ctx_r0.t()("roles.count", __pureFunction1(10, _c1, ((_a2 = ctx_r0.matrix()[role_r3]) != null ? _a2 : __pureFunction0(9, _c2)).length)), " \xB7 ", ctx_r0.t()("roles.accounts", __pureFunction1(12, _c1, ctx_r0.accountsOf(role_r3))));
    __advance();
    __conditional(ctx_r0.isModified(role_r3) ? 8 : -1);
  }
}
function RolePermissionsEditorComponent_For_3_ForEmpty_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 18);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r0.t()("roles.noCustom"));
  }
}
function RolePermissionsEditorComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 16);
    __text(1);
    __elementEnd();
    __repeaterCreate(2, RolePermissionsEditorComponent_For_3_For_3_Template, 9, 14, "button", 17, __repeaterTrackByIdentity, false, RolePermissionsEditorComponent_For_3_ForEmpty_4_Template, 2, 1, "p", 18);
  }
  if (rf & 2) {
    const block_r4 = ctx.$implicit;
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate(ctx_r0.t()(block_r4.title));
    __advance();
    __repeater(block_r4.roles);
  }
}
function RolePermissionsEditorComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 8);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    __advance();
    __textInterpolate(ctx);
  }
}
function RolePermissionsEditorComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "button", 26);
    __listener("click", function RolePermissionsEditorComponent_Conditional_16_Template_button_click_0_listener() {
      __restoreView(_r5);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.reset.emit(ctx_r0.selectedRole()));
    });
    __element(1, "ui-icon", 27);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r0.t()("roles.resetDefault"), " ");
  }
}
function RolePermissionsEditorComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "button", 26);
    __listener("click", function RolePermissionsEditorComponent_Conditional_17_Template_button_click_0_listener() {
      __restoreView(_r6);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.edit.emit(ctx_r0.selectedRole()));
    });
    __element(1, "ui-icon", 28);
    __text(2);
    __elementEnd();
    __elementStart(3, "button", 29);
    __listener("click", function RolePermissionsEditorComponent_Conditional_17_Template_button_click_3_listener() {
      __restoreView(_r6);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.remove.emit(ctx_r0.selectedRole()));
    });
    __element(4, "ui-icon", 30);
    __text(5);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r0.t()("roles.edit"));
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r0.t()("roles.delete"));
  }
}
function RolePermissionsEditorComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 12);
    __element(1, "ui-icon", 31);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r0.t()("roles.lockedNotice"));
  }
}
function RolePermissionsEditorComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 12);
    __element(1, "ui-icon", 32);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r0.t()("roles.readOnlyNotice"));
  }
}
function RolePermissionsEditorComponent_For_22_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "button", 40);
    __listener("click", function RolePermissionsEditorComponent_For_22_Conditional_7_Template_button_click_0_listener() {
      __restoreView(_r7);
      const group_r8 = __nextContext().$implicit;
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.toggleGroup(group_r8.permissions));
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const group_r8 = __nextContext().$implicit;
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r0.groupFull(group_r8.permissions) ? ctx_r0.t()("roles.group.none") : ctx_r0.t()("roles.group.all"), " ");
  }
}
function RolePermissionsEditorComponent_For_22_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = __getCurrentView();
    __elementStart(0, "label", 41)(1, "input", 42);
    __listener("change", function RolePermissionsEditorComponent_For_22_For_10_Template_input_change_1_listener($event) {
      const permission_r10 = __restoreView(_r9).$implicit;
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.toggle(permission_r10, $event.target.checked));
    });
    __elementEnd();
    __elementStart(2, "span", 5)(3, "span", 43);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 44);
    __text(6);
    __elementEnd()()();
  }
  if (rf & 2) {
    const permission_r10 = ctx.$implicit;
    const ctx_r0 = __nextContext(2);
    __classProp("on", ctx_r0.has(permission_r10))("locked", !ctx_r0.canToggle(permission_r10));
    __advance();
    __property("checked", ctx_r0.has(permission_r10))("disabled", !ctx_r0.canToggle(permission_r10));
    __advance(3);
    __textInterpolate(ctx_r0.t()(ctx_r0.permissionLabel(permission_r10)));
    __advance(2);
    __textInterpolate(permission_r10);
  }
}
function RolePermissionsEditorComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 14)(1, "div", 33)(2, "h3", 34);
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 35)(5, "span", 36);
    __text(6);
    __elementEnd();
    __conditionalCreate(7, RolePermissionsEditorComponent_For_22_Conditional_7_Template, 2, 1, "button", 37);
    __elementEnd()();
    __elementStart(8, "div", 38);
    __repeaterCreate(9, RolePermissionsEditorComponent_For_22_For_10_Template, 7, 8, "label", 39, __repeaterTrackByIdentity);
    __elementEnd()();
  }
  if (rf & 2) {
    const group_r8 = ctx.$implicit;
    const ctx_r0 = __nextContext();
    __advance(3);
    __textInterpolate(ctx_r0.t()(ctx_r0.groupLabel(group_r8.key)));
    __advance(2);
    __styleProp("background", ctx_r0.groupCount(group_r8.permissions) ? "var(--v2-sauge)" : "var(--v2-lin)")("color", ctx_r0.groupCount(group_r8.permissions) ? "var(--v2-vert-pousse)" : "var(--v2-gris-texte)");
    __advance();
    __textInterpolate2(" ", ctx_r0.groupCount(group_r8.permissions), " / ", group_r8.permissions.length, " ");
    __advance();
    __conditional(ctx_r0.canEdit() ? 7 : -1);
    __advance(2);
    __repeater(group_r8.permissions);
  }
}
function RolePermissionsEditorComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = __getCurrentView();
    __elementStart(0, "div", 15)(1, "span", 45);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 10)(4, "button", 46);
    __listener("click", function RolePermissionsEditorComponent_Conditional_23_Template_button_click_4_listener() {
      __restoreView(_r11);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.discard());
    });
    __text(5);
    __elementEnd();
    __elementStart(6, "button", 47);
    __listener("click", function RolePermissionsEditorComponent_Conditional_23_Template_button_click_6_listener() {
      __restoreView(_r11);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.save.emit({
        role: ctx_r0.selectedRole(),
        permissions: ctx_r0.draft()
      }));
    });
    __text(7);
    __elementStart(8, "span", 48);
    __element(9, "ui-icon", 49);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __attribute("aria-label", ctx_r0.t()("roles.bar.aria"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("roles.bar.changes", __pureFunction1(6, _c1, ctx_r0.changes())));
    __advance(3);
    __textInterpolate(ctx_r0.t()("roles.bar.discard"));
    __advance();
    __property("disabled", ctx_r0.busy());
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("roles.bar.save"));
    __advance(2);
    __property("size", 18);
  }
}
var RolePermissionsEditorComponent = (_b = class {
  constructor() {
    this.matrix = input.required(...[]);
    this.editable = input(false, ...[]);
    this.busy = input(false, ...[]);
    this.onlyRoles = input(null, ...[]);
    this.ceiling = input(null, ...[]);
    this.selectedRole = model("admin", ...[]);
    this.save = output();
    this.reset = output();
    this.edit = output();
    this.remove = output();
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.lockedRole = LOCKED_ROLE;
    this.isBuiltIn = isBuiltInRole;
    this.draft = signal([], ...[]);
    this.listedRoles = computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = this.onlyRoles()) == null ? void 0 : _a2.slice()) != null ? _b2 : this.store.allRoles();
    }, ...[]);
    this.roleBlocks = computed(() => {
      if (this.onlyRoles()) return [{
        key: "coop",
        title: "roles.block.coop",
        roles: this.listedRoles()
      }];
      return [{
        key: "builtIn",
        title: "roles.block.builtIn",
        roles: BUILT_IN_ROLES
      }, {
        key: "custom",
        title: "roles.block.custom",
        roles: this.listedRoles().filter((role) => !isBuiltInRole(role))
      }];
    }, ...[]);
    this.visibleGroups = computed(() => {
      const ceiling = this.ceiling();
      return PERMISSION_GROUPS.map((group) => ({
        key: group.key,
        permissions: ceiling ? group.permissions.filter((permission) => ceiling.includes(permission)) : group.permissions
      })).filter((group) => group.permissions.length);
    }, ...[]);
    this.totalPermissions = computed(() => this.visibleGroups().reduce((sum, group) => sum + group.permissions.length, 0), ...[]);
    this.selectedDescription = computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = this.store.state().customRoles.find((role) => role.id === this.selectedRole())) == null ? void 0 : _a2.description) != null ? _b2 : "";
    }, ...[]);
    this.isLocked = computed(() => this.selectedRole() === LOCKED_ROLE, ...[]);
    this.canEdit = computed(() => this.editable() && !this.isLocked(), ...[]);
    this.changes = computed(() => {
      var _a2;
      const current = (_a2 = this.matrix()[this.selectedRole()]) != null ? _a2 : [];
      const draft = this.draft();
      return draft.filter((permission) => !current.includes(permission)).length + current.filter((permission) => !draft.includes(permission)).length;
    }, ...[]);
    effect(() => {
      var _a2;
      const permissions = (_a2 = this.matrix()[this.selectedRole()]) != null ? _a2 : [];
      untracked(() => this.draft.set([...permissions]));
    });
    effect(() => {
      const roles = this.listedRoles();
      untracked(() => {
        var _a2;
        if (!roles.includes(this.selectedRole())) this.selectedRole.set((_a2 = roles[0]) != null ? _a2 : "admin");
      });
    });
  }
  accountsOf(role) {
    return this.store.state().users.filter((user) => user.role === role).length;
  }
  /** Rôle intégré dont les droits s'écartent de la matrice par défaut. */
  isModified(role) {
    var _a2;
    if (!isBuiltInRole(role)) return false;
    const current = (_a2 = this.matrix()[role]) != null ? _a2 : [];
    const defaults = DEFAULT_ROLE_PERMISSIONS[role];
    return current.length !== defaults.length || current.some((permission) => !defaults.includes(permission));
  }
  has(permission) {
    return this.draft().includes(permission);
  }
  canToggle(permission) {
    const ceiling = this.ceiling();
    return this.canEdit() && !RESERVED_PERMISSIONS.includes(permission) && (!ceiling || ceiling.includes(permission));
  }
  toggle(permission, checked) {
    if (!this.canToggle(permission)) return;
    this.draft.update((list) => checked ? [.../* @__PURE__ */ new Set([...list, permission])] : list.filter((item) => item !== permission));
  }
  groupCount(permissions) {
    return permissions.filter((permission) => this.has(permission)).length;
  }
  groupFull(permissions) {
    return permissions.filter((permission) => !RESERVED_PERMISSIONS.includes(permission)).every((permission) => this.has(permission));
  }
  toggleGroup(permissions) {
    const turnOn = !this.groupFull(permissions);
    for (const permission of permissions) this.toggle(permission, turnOn);
  }
  discard() {
    var _a2;
    this.draft.set([...(_a2 = this.matrix()[this.selectedRole()]) != null ? _a2 : []]);
  }
  groupLabel(key) {
    return `permgroup.${key}`;
  }
  permissionLabel(permission) {
    return `perm.${permission}`;
  }
}, _b.\u0275fac = function RolePermissionsEditorComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _b)();
}, _b.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _b,
  selectors: [["app-role-permissions-editor"]],
  hostAttrs: [1, "block"],
  inputs: {
    matrix: [1, "matrix"],
    editable: [1, "editable"],
    busy: [1, "busy"],
    onlyRoles: [1, "onlyRoles"],
    ceiling: [1, "ceiling"],
    selectedRole: [1, "selectedRole"]
  },
  outputs: {
    selectedRole: "selectedRoleChange",
    save: "save",
    reset: "reset",
    edit: "edit",
    remove: "remove"
  },
  decls: 24,
  vars: 17,
  consts: [
    [1, "layout"],
    [
      1,
      "roles",
      "card",
      "p-2"
    ],
    [
      1,
      "min-w-0",
      "space-y-4"
    ],
    [
      1,
      "card",
      "p-5"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-start",
      "justify-between",
      "gap-4"
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
      "mt-1",
      "text-[22px]",
      "font-extrabold",
      "tracking-[-0.02em]"
    ],
    [
      1,
      "mt-1",
      "max-w-xl",
      "text-[14px]",
      "font-medium"
    ],
    [
      1,
      "sub",
      "mt-1"
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
      "btn-ghost"
    ],
    [
      1,
      "notice",
      "mt-4"
    ],
    [
      3,
      "permissions",
      "scoped"
    ],
    [
      1,
      "card",
      "overflow-hidden"
    ],
    [
      "role",
      "region",
      1,
      "bar"
    ],
    [
      1,
      "mono",
      "px-3",
      "pb-1",
      "pt-3",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "type",
      "button",
      1,
      "role-btn",
      3,
      "on"
    ],
    [
      1,
      "sub",
      "px-3",
      "pb-3"
    ],
    [
      "type",
      "button",
      1,
      "role-btn",
      3,
      "click"
    ],
    [1, "role-ico"],
    [
      3,
      "name",
      "size"
    ],
    [
      1,
      "min-w-0",
      "flex-1"
    ],
    [
      1,
      "block",
      "truncate",
      "text-[14px]",
      "font-extrabold"
    ],
    [
      1,
      "sub",
      "block"
    ],
    [
      1,
      "badge",
      2,
      "background",
      "var(--v2-citron)",
      "color",
      "var(--v2-foret)"
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
      "history",
      3,
      "size"
    ],
    [
      "name",
      "edit",
      3,
      "size"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      2,
      "color",
      "var(--v2-erreur-fg)",
      3,
      "click"
    ],
    [
      "name",
      "close",
      3,
      "size"
    ],
    [
      "name",
      "lock",
      3,
      "size"
    ],
    [
      "name",
      "info",
      3,
      "size"
    ],
    [1, "group-head"],
    [
      1,
      "text-[16px]",
      "font-extrabold"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2"
    ],
    [1, "badge"],
    [
      "type",
      "button",
      1,
      "bulk"
    ],
    [1, "perm-grid"],
    [
      1,
      "perm",
      3,
      "on",
      "locked"
    ],
    [
      "type",
      "button",
      1,
      "bulk",
      3,
      "click"
    ],
    [1, "perm"],
    [
      "type",
      "checkbox",
      3,
      "change",
      "checked",
      "disabled"
    ],
    [1, "block"],
    [1, "code"],
    [
      1,
      "text-[14px]",
      "font-bold"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "discard",
      3,
      "click"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-citron",
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
    ]
  ],
  template: function RolePermissionsEditorComponent_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "div", 0)(1, "nav", 1);
      __repeaterCreate(2, RolePermissionsEditorComponent_For_3_Template, 5, 2, null, null, _forTrack0);
      __elementEnd();
      __elementStart(4, "div", 2)(5, "section", 3)(6, "div", 4)(7, "div", 5)(8, "p", 6);
      __text(9);
      __elementEnd();
      __elementStart(10, "h2", 7);
      __text(11);
      __elementEnd();
      __conditionalCreate(12, RolePermissionsEditorComponent_Conditional_12_Template, 2, 1, "p", 8);
      __elementStart(13, "p", 9);
      __text(14);
      __elementEnd()();
      __elementStart(15, "span", 10);
      __conditionalCreate(16, RolePermissionsEditorComponent_Conditional_16_Template, 3, 2, "button", 11);
      __conditionalCreate(17, RolePermissionsEditorComponent_Conditional_17_Template, 6, 4);
      __elementEnd()();
      __conditionalCreate(18, RolePermissionsEditorComponent_Conditional_18_Template, 3, 2, "p", 12)(19, RolePermissionsEditorComponent_Conditional_19_Template, 3, 2, "p", 12);
      __elementEnd();
      __element(20, "app-role-access-preview", 13);
      __repeaterCreate(21, RolePermissionsEditorComponent_For_22_Template, 11, 8, "section", 14, _forTrack0);
      __conditionalCreate(23, RolePermissionsEditorComponent_Conditional_23_Template, 10, 8, "div", 15);
      __elementEnd()();
    }
    if (rf & 2) {
      let tmp_4_0;
      __advance();
      __attribute("aria-label", ctx.t()("roles.list.aria"));
      __advance();
      __repeater(ctx.roleBlocks());
      __advance(7);
      __textInterpolate(ctx.store.roleScoped(ctx.selectedRole()) ? ctx.t()("roles.scope.scoop") : ctx.t()("roles.scope.all"));
      __advance(2);
      __textInterpolate(ctx.store.roleLabel(ctx.selectedRole()));
      __advance();
      __conditional((tmp_4_0 = ctx.selectedDescription()) ? 12 : -1, tmp_4_0);
      __advance(2);
      __textInterpolate2("", ctx.t()("roles.selected", __pureFunction2(12, _c0, ctx.draft().length, ctx.totalPermissions())), " \xB7 ", ctx.t()("roles.accounts", __pureFunction1(15, _c1, ctx.accountsOf(ctx.selectedRole()))));
      __advance(2);
      __conditional(ctx.editable() && !ctx.isLocked() && ctx.isModified(ctx.selectedRole()) ? 16 : -1);
      __advance();
      __conditional(ctx.editable() && !ctx.isBuiltIn(ctx.selectedRole()) ? 17 : -1);
      __advance();
      __conditional(ctx.isLocked() ? 18 : !ctx.editable() ? 19 : -1);
      __advance(2);
      __property("permissions", ctx.draft())("scoped", ctx.store.roleScoped(ctx.selectedRole()));
      __advance();
      __repeater(ctx.visibleGroups());
      __advance(2);
      __conditional(ctx.canEdit() && ctx.changes() > 0 ? 23 : -1);
    }
  },
  dependencies: [IconComponent, RoleAccessPreviewComponent],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".layout[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 16px;\n      }\n      @media (min-width: 1024px) {\n        .layout[_ngcontent-%COMP%] {\n          grid-template-columns: 300px minmax(0, 1fr);\n          align-items: start;\n        }\n        .roles[_ngcontent-%COMP%] {\n          position: sticky;\n          top: 88px;\n        }\n      }\n      .role-btn[_ngcontent-%COMP%] {\n        display: flex;\n        width: 100%;\n        align-items: center;\n        gap: 12px;\n        border-radius: 16px;\n        padding: 12px 14px;\n        text-align: left;\n        cursor: pointer;\n        transition: background-color 0.15s ease;\n      }\n      .role-btn[_ngcontent-%COMP%]:hover {\n        background: var(--%NS%v2-creme);\n      }\n      .role-btn.on[_ngcontent-%COMP%] {\n        background: var(--%NS%v2-foret);\n        color: var(--%NS%v2-blanc);\n      }\n      .role-btn.on[_ngcontent-%COMP%]   .sub[_ngcontent-%COMP%] {\n        color: color-mix(in oklab, var(--%NS%v2-blanc) 72%, transparent);\n      }\n      .role-btn[_ngcontent-%COMP%]:focus-visible {\n        outline: 2px solid var(--%NS%v2-foret);\n        outline-offset: 2px;\n      }\n      .role-ico[_ngcontent-%COMP%] {\n        display: grid;\n        height: 38px;\n        width: 38px;\n        flex-shrink: 0;\n        place-items: center;\n        border-radius: 12px;\n        background: var(--%NS%v2-sauge);\n        color: var(--%NS%v2-foret);\n      }\n      .role-btn.on[_ngcontent-%COMP%]   .role-ico[_ngcontent-%COMP%] {\n        background: var(--%NS%v2-citron);\n      }\n      .group-head[_ngcontent-%COMP%] {\n        display: flex;\n        flex-wrap: wrap;\n        align-items: center;\n        justify-content: space-between;\n        gap: 8px;\n        border-bottom: 1px solid var(--%NS%v2-separateur);\n        padding: 14px 18px;\n      }\n      .perm-grid[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n      }\n      .perm[_ngcontent-%COMP%] {\n        display: flex;\n        min-height: 52px;\n        align-items: center;\n        gap: 12px;\n        border-bottom: 1px solid var(--%NS%v2-separateur);\n        padding: 10px 18px;\n        font-size: 14px;\n        font-weight: 600;\n        cursor: pointer;\n      }\n      .perm[_ngcontent-%COMP%]:hover {\n        background: var(--%NS%v2-creme);\n      }\n      .perm.on[_ngcontent-%COMP%] {\n        background: color-mix(in oklab, var(--%NS%v2-sauge) 60%, transparent);\n      }\n      .perm.locked[_ngcontent-%COMP%] {\n        cursor: not-allowed;\n        opacity: 0.6;\n      }\n      .perm[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n        height: 20px;\n        width: 20px;\n        flex-shrink: 0;\n        accent-color: var(--%NS%v2-foret);\n        cursor: inherit;\n      }\n      .perm[_ngcontent-%COMP%]   .code[_ngcontent-%COMP%] {\n        display: block;\n        font-family: var(--%NS%v2-font-mono);\n        font-size: 11px;\n        font-weight: 600;\n        color: var(--%NS%v2-gris-texte);\n      }\n      .bulk[_ngcontent-%COMP%] {\n        border-radius: 10px;\n        padding: 6px 10px;\n        font-size: 13px;\n        font-weight: 800;\n        color: var(--%NS%v2-foret);\n        cursor: pointer;\n      }\n      .bulk[_ngcontent-%COMP%]:hover {\n        background: var(--%NS%v2-sauge);\n      }\n      .discard[_ngcontent-%COMP%] {\n        border: 1.5px solid color-mix(in oklab, var(--%NS%v2-blanc) 40%, transparent);\n        background: transparent;\n        color: var(--%NS%v2-blanc);\n      }\n      .discard[_ngcontent-%COMP%]:hover {\n        background: color-mix(in oklab, var(--%NS%v2-blanc) 12%, transparent);\n      }\n      .bar[_ngcontent-%COMP%] {\n        position: sticky;\n        bottom: 12px;\n        z-index: 5;\n        display: flex;\n        flex-wrap: wrap;\n        align-items: center;\n        justify-content: space-between;\n        gap: 12px;\n        border-radius: 20px;\n        background: var(--%NS%v2-foret);\n        color: var(--%NS%v2-blanc);\n        padding: 12px 14px 12px 20px;\n        box-shadow: var(--%NS%v2-ombre-flottant);\n      }"]
}), _b);

export { RoleFormDialogComponent as R, RolePermissionsEditorComponent as a };
//# sourceMappingURL=role-permissions-editor.component-DxE2JuZw.mjs.map

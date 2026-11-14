import { i as inject, F as signal, c as computed, e as effect, ɵ as __defineComponent, f as __elementStart, g as __text, h as __elementEnd, H as __listener, b as __element, j as __conditionalCreate, m as __repeaterCreate, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, s as __conditional, u as __attribute, v as __repeater, x as __pureFunction2, z as __classProp, a8 as untracked, w as __nextContext, L as __getCurrentView, r as __pureFunction1, a5 as __classMap, N as __textInterpolate2, t as __styleProp, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, i as inScope, j as nf, K as assignableRoles } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { R as RoleAccessPreviewComponent } from './role-access-preview.component-CIV_Ci6R.mjs';
import { T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { M as ModalComponent, P as PaginationComponent, S as SelectComponent, g as StatCardsComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';
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
import './nav-CV7kBTDN.mjs';
import 'clsx';
import 'tailwind-merge';
import 'date-fns';
import 'date-fns/locale';

var _a;
var _c0 = (a0, a1) => ({
  shown: a0,
  total: a1
});
var _c1 = (a0) => ({ name: a0 });
var _c2 = (a0) => ({ count: a0 });
var _c3 = (a0) => ({ email: a0 });
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.role;
var _forTrack2 = ($index, $item) => $item.user.id;
function PersonnelPage_Conditional_14_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "li")(1, "button", 44);
    __listener("click", function PersonnelPage_Conditional_14_For_5_Template_button_click_1_listener() {
      const item_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.roleFilter.set(ctx_r2.roleFilter() === item_r2.role ? "all" : item_r2.role));
    });
    __text(2);
    __elementStart(3, "span", 45);
    __text(4);
    __elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __classProp("on", ctx_r2.roleFilter() === item_r2.role);
    __attribute("aria-pressed", ctx_r2.roleFilter() === item_r2.role);
    __advance();
    __textInterpolate1(" ", item_r2.label);
    __advance(2);
    __textInterpolate(item_r2.count);
  }
}
function PersonnelPage_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 10)(1, "p", 30);
    __text(2);
    __elementEnd();
    __elementStart(3, "ul", 43);
    __repeaterCreate(4, PersonnelPage_Conditional_14_For_5_Template, 5, 5, "li", null, _forTrack1);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __attribute("aria-label", ctx_r2.t()("personnel.breakdown.title"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("personnel.breakdown.title"));
    __advance(2);
    __repeater(ctx_r2.roleBreakdown());
  }
}
function PersonnelPage_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "button", 32);
    __listener("click", function PersonnelPage_For_21_Template_button_click_0_listener() {
      const option_r5 = __restoreView(_r4).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.stateFilter.set(option_r5.id));
    });
    __text(1);
    __elementStart(2, "span", 45);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const option_r5 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __classProp("on", ctx_r2.stateFilter() === option_r5.id);
    __attribute("aria-checked", ctx_r2.stateFilter() === option_r5.id);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()(option_r5.label));
    __advance();
    __classProp("zero", !option_r5.count);
    __advance();
    __textInterpolate(option_r5.count);
  }
}
function PersonnelPage_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "ui-select", 46);
    __listener("valueChange", function PersonnelPage_Conditional_22_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r6);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.roleFilter.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __property("label", ctx_r2.t()("personnel.filter.role"))("options", ctx_r2.roleFilterOptions())("value", ctx_r2.roleFilter());
  }
}
function PersonnelPage_Conditional_26_For_14_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = __getCurrentView();
    __elementStart(0, "button", 61);
    __listener("click", function PersonnelPage_Conditional_26_For_14_Conditional_19_Template_button_click_0_listener() {
      __restoreView(_r9);
      const row_r8 = __nextContext().$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.openEdit(row_r8.user));
    });
    __element(1, "ui-icon", 63);
    __elementEnd();
    __elementStart(2, "button", 61);
    __listener("click", function PersonnelPage_Conditional_26_For_14_Conditional_19_Template_button_click_2_listener() {
      __restoreView(_r9);
      const row_r8 = __nextContext().$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.toggling.set(row_r8.user));
    });
    __element(3, "ui-icon", 64);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r8 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __property("title", ctx_r2.t()("personnel.edit"));
    __attribute("aria-label", ctx_r2.t()("personnel.edit.aria", __pureFunction1(9, _c1, row_r8.user.name)));
    __advance();
    __property("size", 18);
    __advance();
    __classProp("act-danger", row_r8.user.active);
    __property("title", row_r8.user.active ? ctx_r2.t()("personnel.suspend") : ctx_r2.t()("personnel.restore"));
    __attribute("aria-label", (row_r8.user.active ? ctx_r2.t()("personnel.suspend") : ctx_r2.t()("personnel.restore")) + " \xB7 " + row_r8.user.name);
    __advance();
    __property("name", row_r8.user.active ? "block" : "how_to_reg")("size", 18);
  }
}
function PersonnelPage_Conditional_26_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "tr", 52);
    __listener("click", function PersonnelPage_Conditional_26_For_14_Template_tr_click_0_listener() {
      const row_r8 = __restoreView(_r7).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.viewing.set(row_r8.user));
    });
    __elementStart(1, "td")(2, "span", 53)(3, "span", 54);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 2)(6, "span", 55);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 56);
    __text(9);
    __elementEnd()()()();
    __elementStart(10, "td", 57);
    __text(11);
    __elementEnd();
    __elementStart(12, "td")(13, "span", 58);
    __text(14);
    __elementEnd()();
    __elementStart(15, "td", 59);
    __listener("click", function PersonnelPage_Conditional_26_For_14_Template_td_click_15_listener($event) {
      return $event.stopPropagation();
    });
    __elementStart(16, "span", 60)(17, "button", 61);
    __listener("click", function PersonnelPage_Conditional_26_For_14_Template_button_click_17_listener() {
      const row_r8 = __restoreView(_r7).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.viewing.set(row_r8.user));
    });
    __element(18, "ui-icon", 62);
    __elementEnd();
    __conditionalCreate(19, PersonnelPage_Conditional_26_For_14_Conditional_19_Template, 4, 11);
    __elementEnd()()();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(4);
    __textInterpolate(row_r8.initials);
    __advance(3);
    __textInterpolate(row_r8.user.name);
    __advance(2);
    __textInterpolate2("", row_r8.user.email, "", row_r8.user.phone ? " \xB7 " + ctx_r2.store.phone(row_r8.user.phone) : "");
    __advance(2);
    __textInterpolate(ctx_r2.store.roleLabel(row_r8.user.role));
    __advance(2);
    __styleProp("background", row_r8.state === "active" ? "var(--v2-culture-bg)" : row_r8.state === "invited" ? "var(--v2-attente-bg)" : "var(--v2-lin)")("color", row_r8.state === "active" ? "var(--v2-culture-fg)" : row_r8.state === "invited" ? "var(--v2-attente-fg)" : "var(--v2-gris-texte)");
    __advance();
    __textInterpolate1(" ", ctx_r2.t()(ctx_r2.stateLabel[row_r8.state]), " ");
    __advance(3);
    __property("title", ctx_r2.t()("common.view"));
    __attribute("aria-label", ctx_r2.t()("personnel.view.aria", __pureFunction1(14, _c1, row_r8.user.name)));
    __advance();
    __property("size", 18);
    __advance();
    __conditional(row_r8.manageable ? 19 : -1);
  }
}
function PersonnelPage_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 47)(1, "table", 48)(2, "thead")(3, "tr")(4, "th");
    __text(5);
    __elementEnd();
    __elementStart(6, "th");
    __text(7);
    __elementEnd();
    __elementStart(8, "th");
    __text(9);
    __elementEnd();
    __elementStart(10, "th", 49);
    __text(11);
    __elementEnd()()();
    __elementStart(12, "tbody");
    __repeaterCreate(13, PersonnelPage_Conditional_26_For_14_Template, 20, 16, "tr", 50, _forTrack2);
    __elementEnd()()();
    __element(15, "ui-pagination", 51);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(5);
    __textInterpolate(ctx_r2.t()("personnel.col.name"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("personnel.col.role"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("personnel.col.state"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("personnel.col.actions"));
    __advance(2);
    __repeater(ctx_r2.pager.items());
    __advance(2);
    __property("pager", ctx_r2.pager);
  }
}
function PersonnelPage_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 20)(1, "span", 65);
    __element(2, "ui-icon", 66);
    __elementEnd();
    __elementStart(3, "p", 67);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 68);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r2.t()("personnel.empty.title"));
    __advance(2);
    __textInterpolate(ctx_r2.rows().length ? ctx_r2.t()("personnel.empty.filtered") : ctx_r2.t()("personnel.empty.none"));
  }
}
function PersonnelPage_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 33);
    __element(1, "ui-icon", 69);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r2.errors().sex);
  }
}
function PersonnelPage_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "ui-select", 70);
    __listener("valueChange", function PersonnelPage_Conditional_45_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r10);
      const ctx_r2 = __nextContext();
      ctx_r2.scoopId.set($event);
      return __resetView(ctx_r2.role.set(""));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __property("label", ctx_r2.t()("adherents.add.scoop"))("options", ctx_r2.scoopOptions())("value", ctx_r2.scoopId());
  }
}
function PersonnelPage_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 33);
    __element(1, "ui-icon", 69);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r2.errors().role);
  }
}
function PersonnelPage_Conditional_55_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "button", 38);
    __listener("click", function PersonnelPage_Conditional_55_Conditional_36_Template_button_click_0_listener() {
      __restoreView(_r12);
      const view_r13 = __nextContext();
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.openEdit(view_r13.user));
    });
    __text(1);
    __elementStart(2, "span", 7);
    __element(3, "ui-icon", 63);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("personnel.edit"));
    __advance(2);
    __property("size", 18);
  }
}
function PersonnelPage_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = __getCurrentView();
    __elementStart(0, "ui-modal", 71);
    __listener("closed", function PersonnelPage_Conditional_55_Template_ui_modal_closed_0_listener() {
      __restoreView(_r11);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.viewing.set(null));
    });
    __elementStart(1, "div", 22)(2, "dl", 72)(3, "div")(4, "dt");
    __text(5);
    __elementEnd();
    __elementStart(6, "dd");
    __text(7);
    __elementEnd()();
    __elementStart(8, "div")(9, "dt");
    __text(10);
    __elementEnd();
    __elementStart(11, "dd");
    __text(12);
    __elementEnd()();
    __elementStart(13, "div")(14, "dt");
    __text(15);
    __elementEnd();
    __elementStart(16, "dd");
    __text(17);
    __elementEnd()();
    __elementStart(18, "div")(19, "dt");
    __text(20);
    __elementEnd();
    __elementStart(21, "dd");
    __text(22);
    __elementEnd()();
    __elementStart(23, "div")(24, "dt");
    __text(25);
    __elementEnd();
    __elementStart(26, "dd");
    __text(27);
    __elementEnd()();
    __elementStart(28, "div")(29, "dt");
    __text(30);
    __elementEnd();
    __elementStart(31, "dd");
    __text(32);
    __elementEnd()()();
    __element(33, "app-role-access-preview", 36);
    __elementEnd();
    __elementStart(34, "button", 37);
    __listener("click", function PersonnelPage_Conditional_55_Template_button_click_34_listener() {
      __restoreView(_r11);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.viewing.set(null));
    });
    __text(35);
    __elementEnd();
    __conditionalCreate(36, PersonnelPage_Conditional_55_Conditional_36_Template, 4, 2, "button", 73);
    __elementEnd();
  }
  if (rf & 2) {
    const view_r13 = ctx;
    const ctx_r2 = __nextContext();
    __property("open", true)("title", view_r13.user.name)("description", ctx_r2.store.roleLabel(view_r13.user.role))("width", 640)("closeLabel", ctx_r2.t()("common.close"));
    __advance(5);
    __textInterpolate(ctx_r2.t()("tech.dialog.email"));
    __advance(2);
    __textInterpolate(view_r13.user.email);
    __advance(3);
    __textInterpolate(ctx_r2.t()("tech.dialog.phone"));
    __advance(2);
    __textInterpolate(view_r13.user.phone ? ctx_r2.store.phone(view_r13.user.phone) : "\u2014");
    __advance(3);
    __textInterpolate(ctx_r2.t()("adherents.add.sex"));
    __advance(2);
    __textInterpolate(view_r13.user.sex === "F" ? ctx_r2.t()("adherents.add.female") : view_r13.user.sex === "H" ? ctx_r2.t()("adherents.add.male") : "\u2014");
    __advance(3);
    __textInterpolate(ctx_r2.t()("adherents.add.age"));
    __advance(2);
    __textInterpolate(view_r13.user.age ? ctx_r2.t()("tech.ageYears", __pureFunction1(24, _c2, view_r13.user.age)) : "\u2014");
    __advance(3);
    __textInterpolate(ctx_r2.t()("personnel.col.role"));
    __advance(2);
    __textInterpolate(ctx_r2.store.roleLabel(view_r13.user.role));
    __advance(3);
    __textInterpolate(ctx_r2.t()("personnel.col.state"));
    __advance(2);
    __textInterpolate(ctx_r2.t()(ctx_r2.stateLabel[view_r13.state]));
    __advance();
    __property("bare", true)("permissions", ctx_r2.permissionsOf(view_r13.user.role))("scoped", true)("hint", ctx_r2.t()("roles.access.hintEdit"))("emptyText", ctx_r2.t()("roles.access.none"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("common.close"));
    __advance();
    __conditional(view_r13.manageable ? 36 : -1);
  }
}
function PersonnelPage_Conditional_56_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 33);
    __element(1, "ui-icon", 69);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r2.editErrors().sex);
  }
}
function PersonnelPage_Conditional_56_Template(rf, ctx) {
  var _a2, _b, _c;
  if (rf & 1) {
    const _r14 = __getCurrentView();
    __elementStart(0, "ui-modal", 74);
    __listener("closed", function PersonnelPage_Conditional_56_Template_ui_modal_closed_0_listener() {
      __restoreView(_r14);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editing.set(null));
    });
    __elementStart(1, "div", 22)(2, "div", 23)(3, "ui-text-field", 75);
    __listener("valueChange", function PersonnelPage_Conditional_56_Template_ui_text_field_valueChange_3_listener($event) {
      __restoreView(_r14);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editName.set($event));
    });
    __elementEnd();
    __elementStart(4, "ui-text-field", 27);
    __listener("valueChange", function PersonnelPage_Conditional_56_Template_ui_text_field_valueChange_4_listener($event) {
      __restoreView(_r14);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editPhone.set($event));
    });
    __elementEnd();
    __elementStart(5, "ui-text-field", 28);
    __listener("valueChange", function PersonnelPage_Conditional_56_Template_ui_text_field_valueChange_5_listener($event) {
      __restoreView(_r14);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editAge.set($event));
    });
    __elementEnd();
    __elementStart(6, "div", 29)(7, "p", 30);
    __text(8);
    __elementEnd();
    __elementStart(9, "div", 31)(10, "button", 32);
    __listener("click", function PersonnelPage_Conditional_56_Template_button_click_10_listener() {
      __restoreView(_r14);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editSex.set("F"));
    });
    __text(11);
    __elementEnd();
    __elementStart(12, "button", 32);
    __listener("click", function PersonnelPage_Conditional_56_Template_button_click_12_listener() {
      __restoreView(_r14);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editSex.set("H"));
    });
    __text(13);
    __elementEnd()();
    __conditionalCreate(14, PersonnelPage_Conditional_56_Conditional_14_Template, 3, 2, "p", 33);
    __elementEnd()();
    __elementStart(15, "p", 76);
    __text(16);
    __elementEnd();
    __elementStart(17, "ui-select", 77);
    __listener("valueChange", function PersonnelPage_Conditional_56_Template_ui_select_valueChange_17_listener($event) {
      __restoreView(_r14);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.pickedRole.set($event));
    });
    __elementEnd();
    __element(18, "app-role-access-preview", 36);
    __elementEnd();
    __elementStart(19, "button", 37);
    __listener("click", function PersonnelPage_Conditional_56_Template_button_click_19_listener() {
      __restoreView(_r14);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editing.set(null));
    });
    __text(20);
    __elementEnd();
    __elementStart(21, "button", 38);
    __listener("click", function PersonnelPage_Conditional_56_Template_button_click_21_listener() {
      const person_r15 = __restoreView(_r14);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.saveEdit(person_r15));
    });
    __text(22);
    __elementStart(23, "span", 7);
    __element(24, "ui-icon", 78);
    __elementEnd()()();
  }
  if (rf & 2) {
    const person_r15 = ctx;
    const ctx_r2 = __nextContext();
    __property("open", true)("title", ctx_r2.t()("personnel.edit.title", __pureFunction1(38, _c1, person_r15.name)))("description", ctx_r2.t()("personnel.edit.description"))("width", 680)("closeLabel", ctx_r2.t()("common.close"));
    __advance(3);
    __property("label", ctx_r2.t()("techniciens.edit.name"))("value", ctx_r2.editName())("error", (_a2 = ctx_r2.editErrors().name) != null ? _a2 : "");
    __advance();
    __property("label", ctx_r2.t()("tech.dialog.phone"))("value", ctx_r2.editPhone())("error", (_b = ctx_r2.editErrors().phone) != null ? _b : "");
    __advance();
    __property("label", ctx_r2.t()("adherents.add.age"))("hint", ctx_r2.t()("tech.dialog.ageHint"))("value", ctx_r2.editAge())("error", (_c = ctx_r2.editErrors().age) != null ? _c : "");
    __advance(3);
    __textInterpolate(ctx_r2.t()("adherents.add.sex"));
    __advance();
    __attribute("aria-label", ctx_r2.t()("adherents.add.sex"));
    __advance();
    __classProp("on", ctx_r2.editSex() === "F");
    __attribute("aria-checked", ctx_r2.editSex() === "F");
    __advance();
    __textInterpolate(ctx_r2.t()("adherents.add.female"));
    __advance();
    __classProp("on", ctx_r2.editSex() === "H");
    __attribute("aria-checked", ctx_r2.editSex() === "H");
    __advance();
    __textInterpolate(ctx_r2.t()("adherents.add.male"));
    __advance();
    __conditional(ctx_r2.editErrors().sex ? 14 : -1);
    __advance(2);
    __textInterpolate(ctx_r2.t()("personnel.edit.emailLocked", __pureFunction1(40, _c3, person_r15.email)));
    __advance();
    __property("label", ctx_r2.t()("personnel.add.role"))("options", ctx_r2.roleOptionsFor(person_r15))("value", ctx_r2.pickedRole());
    __advance();
    __property("bare", true)("permissions", ctx_r2.permissionsOf(ctx_r2.pickedRole()))("scoped", true)("hint", ctx_r2.t()("roles.access.hintEdit"))("emptyText", ctx_r2.t()("roles.access.none"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("common.cancel"));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("personnel.role.save"));
    __advance(2);
    __property("size", 18);
  }
}
function PersonnelPage_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = __getCurrentView();
    __elementStart(0, "ui-modal", 79);
    __listener("closed", function PersonnelPage_Conditional_57_Template_ui_modal_closed_0_listener() {
      __restoreView(_r16);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.toggling.set(null));
    });
    __elementStart(1, "button", 37);
    __listener("click", function PersonnelPage_Conditional_57_Template_button_click_1_listener() {
      __restoreView(_r16);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.toggling.set(null));
    });
    __text(2);
    __elementEnd();
    __elementStart(3, "button", 80);
    __listener("click", function PersonnelPage_Conditional_57_Template_button_click_3_listener() {
      const person_r17 = __restoreView(_r16);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.confirmToggle(person_r17));
    });
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const person_r17 = ctx;
    const ctx_r2 = __nextContext();
    __property("open", true)("tone", person_r17.active ? "danger" : "default")("title", person_r17.active ? ctx_r2.t()("personnel.suspend.title", __pureFunction1(11, _c1, person_r17.name)) : ctx_r2.t()("personnel.restore.title", __pureFunction1(13, _c1, person_r17.name)))("description", person_r17.active ? ctx_r2.t()("personnel.suspend.text") : ctx_r2.t()("personnel.restore.text"))("icon", person_r17.active ? "block" : "how_to_reg")("width", 540)("closeLabel", ctx_r2.t()("common.close"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("common.cancel"));
    __advance();
    __classMap(person_r17.active ? "btn btn-danger" : "btn btn-primary");
    __advance();
    __textInterpolate1(" ", person_r17.active ? ctx_r2.t()("personnel.suspend") : ctx_r2.t()("personnel.restore"), " ");
  }
}
var PersonnelPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.snackbar = inject(SnackbarService);
    this.stateLabel = {
      active: "personnel.state.active",
      invited: "personnel.state.invited",
      closed: "personnel.state.closed"
    };
    this.query = signal("", ...[]);
    this.stateFilter = signal("all", ...[]);
    this.roleFilter = signal("all", ...[]);
    this.addOpen = signal(false, ...[]);
    this.viewing = signal(null, ...[]);
    this.editing = signal(null, ...[]);
    this.editName = signal("", ...[]);
    this.editPhone = signal("", ...[]);
    this.editAge = signal("", ...[]);
    this.editSex = signal("", ...[]);
    this.editErrors = signal({}, ...[]);
    this.toggling = signal(null, ...[]);
    this.pickedRole = signal("", ...[]);
    this.firstName = signal("", ...[]);
    this.lastName = signal("", ...[]);
    this.email = signal("", ...[]);
    this.phone = signal("", ...[]);
    this.age = signal("", ...[]);
    this.sex = signal("", ...[]);
    this.role = signal("", ...[]);
    this.scoopId = signal("", ...[]);
    this.errors = signal({}, ...[]);
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
    this.roleOptions = computed(() => this.assignable(this.scoopId()).map((candidate) => ({
      value: candidate,
      label: this.store.roleLabel(candidate)
    })), ...[]);
    this.previewPermissions = computed(() => this.permissionsOf(this.role()), ...[]);
    this.rows = computed(() => {
      var _a2;
      const state = this.store.state();
      const visible = new Set(this.scoopOptions().map((option) => option.value));
      const myEmail = (_a2 = state.session) == null ? void 0 : _a2.email.toLowerCase();
      return state.users.filter((user) => !!user.scoopId && visible.has(user.scoopId) && user.role !== "technicien").filter((user) => user.role !== "faitiere" && user.role !== "admin" && user.role !== "superadmin").sort((first, second) => first.name.localeCompare(second.name)).map((user) => {
        var _a3;
        return {
          user,
          initials: user.name.split(" ").map((word) => {
            var _a4;
            return (_a4 = word[0]) != null ? _a4 : "";
          }).join("").slice(0, 2).toUpperCase(),
          state: user.invited && !user.active ? "invited" : user.active ? "active" : "closed",
          manageable: user.email.toLowerCase() !== myEmail && this.assignable((_a3 = user.scoopId) != null ? _a3 : "").includes(user.role)
        };
      });
    }, ...[]);
    this.shown = computed(() => {
      const needle = this.query().trim().toLowerCase();
      return this.rows().filter((row) => (this.stateFilter() === "all" || row.state === this.stateFilter()) && (this.roleFilter() === "all" || row.user.role === this.roleFilter()) && (!needle || [
        row.user.name,
        row.user.email,
        this.store.roleLabel(row.user.role)
      ].some((text) => text.toLowerCase().includes(needle))));
    }, ...[]);
    this.stateFilters = computed(() => {
      const rows = this.rows();
      const count = (state) => rows.filter((row) => row.state === state).length;
      return [
        {
          id: "all",
          label: "personnel.filter.all",
          count: rows.length
        },
        {
          id: "active",
          label: "personnel.state.active",
          count: count("active")
        },
        {
          id: "invited",
          label: "personnel.state.invited",
          count: count("invited")
        },
        {
          id: "closed",
          label: "personnel.state.closed",
          count: count("closed")
        }
      ];
    }, ...[]);
    this.roleBreakdown = computed(() => {
      const rows = this.rows();
      return [...new Set(rows.map((row) => row.user.role))].map((role) => ({
        role,
        label: this.store.roleLabel(role),
        count: rows.filter((row) => row.user.role === role).length
      })).sort((first, second) => second.count - first.count || first.label.localeCompare(second.label));
    }, ...[]);
    this.roleFilterOptions = computed(() => {
      const rows = this.rows();
      const roles = [...new Set(rows.map((row) => row.user.role))];
      return [{
        value: "all",
        label: this.t()("personnel.filter.allRoles"),
        hint: nf.format(rows.length)
      }, ...roles.map((role) => ({
        value: role,
        label: this.store.roleLabel(role),
        hint: nf.format(rows.filter((row) => row.user.role === role).length)
      })).sort((first, second) => first.label.localeCompare(second.label))];
    }, ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const rows = this.rows();
      const count = (state) => rows.filter((row) => row.state === state).length;
      const women = rows.filter((row) => row.user.sex === "F").length;
      return [
        {
          label: t("personnel.stat.total"),
          value: nf.format(rows.length),
          sub: t("personnel.stat.totalSub", { roles: nf.format(new Set(rows.map((row) => row.user.role)).size) }),
          icon: "group",
          bg: "",
          fg: ""
        },
        {
          label: t("personnel.stat.active"),
          value: nf.format(count("active")),
          sub: t("personnel.stat.activeSub"),
          icon: "how_to_reg",
          ...TONE.succes
        },
        {
          label: t("personnel.stat.invited"),
          value: nf.format(count("invited")),
          sub: t("personnel.stat.invitedSub"),
          icon: "mark_email_unread",
          ...TONE.info
        },
        {
          label: t("personnel.stat.closed"),
          value: nf.format(count("closed")),
          sub: t("personnel.stat.closedSub", { women: nf.format(women) }),
          icon: "block",
          ...TONE.attente
        }
      ];
    }, ...[]);
    this.pager = createPager(() => this.shown());
    this.viewedRow = computed(() => {
      var _a2;
      const person = this.viewing();
      return person ? (_a2 = this.rows().find((row) => row.user.id === person.id)) != null ? _a2 : null : null;
    }, ...[]);
    effect(() => {
      const options = this.scoopOptions();
      untracked(() => {
        var _a2, _b;
        if (!options.some((option) => option.value === this.scoopId())) this.scoopId.set((_b = (_a2 = options[0]) == null ? void 0 : _a2.value) != null ? _b : "");
      });
    });
  }
  /** Rôles que la personne connectée peut donner dans cette coopérative (jamais technicien : écran à part). */
  assignable(scoopId) {
    var _a2;
    const state = this.store.state();
    const actorRole = (_a2 = state.session) == null ? void 0 : _a2.role;
    if (!actorRole) return [];
    return assignableRoles(actorRole, state.customRoles, scoopId).filter((candidate) => candidate !== "technicien");
  }
  roleOptionsFor(person) {
    var _a2;
    return this.assignable((_a2 = person.scoopId) != null ? _a2 : "").map((candidate) => ({
      value: candidate,
      label: this.store.roleLabel(candidate)
    }));
  }
  permissionsOf(role) {
    var _a2;
    return role ? (_a2 = this.store.state().rolePermissions[role]) != null ? _a2 : [] : [];
  }
  openAdd() {
    this.firstName.set("");
    this.lastName.set("");
    this.email.set("");
    this.phone.set("");
    this.age.set("");
    this.sex.set("");
    this.role.set("");
    this.errors.set({});
    this.addOpen.set(true);
  }
  submitAdd() {
    const t = this.t();
    const errors = {};
    if (!this.firstName().trim()) errors.firstName = t("errors.technician.name");
    if (!this.lastName().trim()) errors.lastName = t("errors.technician.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim())) errors.email = t("errors.technician.email");
    if (this.phone().replace(/\D/g, "").length < 9) errors.phone = t("errors.technician.phone");
    const ageValue = Number(this.age().trim());
    if (!this.age().trim() || !Number.isInteger(ageValue) || ageValue < 15 || ageValue > 100) errors.age = t("errors.technician.age");
    if (!this.sex()) errors.sex = t("errors.technician.sex");
    if (!this.role()) errors.role = t("personnel.add.roleRequired");
    this.errors.set(errors);
    if (Object.keys(errors).length) return;
    const fullName = `${this.firstName().trim()} ${this.lastName().trim()}`;
    const result = this.store.actions.createStaff({
      name: fullName,
      email: this.email(),
      phone: this.phone(),
      sex: this.sex(),
      age: ageValue,
      role: this.role(),
      scoopId: this.scoopId()
    });
    if (!result.ok) {
      if (result.error === t("errors.technician.emailTaken")) this.errors.set({ email: result.error });
      else this.snackbar.error(result.error);
      return;
    }
    this.addOpen.set(false);
    this.snackbar.success(t("personnel.add.done", { name: fullName }));
  }
  openEdit(person) {
    var _a2;
    this.viewing.set(null);
    this.editName.set(person.name);
    this.editPhone.set(person.phone);
    this.editAge.set(person.age ? String(person.age) : "");
    this.editSex.set((_a2 = person.sex) != null ? _a2 : "");
    this.pickedRole.set(person.role);
    this.editErrors.set({});
    this.editing.set(person);
  }
  saveEdit(person) {
    const t = this.t();
    const errors = {};
    if (this.editName().trim().split(/\s+/).length < 2) errors.name = t("errors.technician.name");
    if (this.editPhone().replace(/\D/g, "").length < 9) errors.phone = t("errors.technician.phone");
    const ageValue = Number(this.editAge().trim());
    if (!this.editAge().trim() || !Number.isInteger(ageValue) || ageValue < 15 || ageValue > 100) errors.age = t("errors.technician.age");
    if (!this.editSex()) errors.sex = t("errors.technician.sex");
    this.editErrors.set(errors);
    if (Object.keys(errors).length) return;
    const result = this.store.actions.updateStaff(person.id, {
      name: this.editName(),
      phone: this.editPhone(),
      sex: this.editSex(),
      age: ageValue,
      ...this.pickedRole() && this.pickedRole() !== person.role ? { role: this.pickedRole() } : {}
    });
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.editing.set(null);
    this.snackbar.success(t("personnel.edit.done", { name: this.editName().trim() }));
  }
  confirmToggle(person) {
    const result = this.store.actions.updateStaff(person.id, { active: !person.active });
    this.toggling.set(null);
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.t()(person.active ? "personnel.suspend.done" : "personnel.restore.done", { name: person.name }));
  }
}, _a.\u0275fac = function PersonnelPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-personnel-page"]],
  decls: 58,
  vars: 69,
  consts: [
    [
      "perm",
      "role.assign",
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
      "click"
    ],
    [1, "btn-chip"],
    [
      "name",
      "person_add",
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
      "card",
      "mt-6",
      "p-5"
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
      "role",
      "radiogroup",
      1,
      "seg"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      3,
      "on"
    ],
    [
      "leadingIcon",
      "admin_panel_settings",
      1,
      "min-w-[220px]",
      3,
      "label",
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
      "space-y-5",
      "pb-6"
    ],
    [
      1,
      "grid",
      "gap-5",
      "sm:grid-cols-2"
    ],
    [
      "preset",
      "firstName",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      "preset",
      "lastName",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      "preset",
      "email",
      1,
      "sm:col-span-2",
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
      "value",
      "error"
    ],
    [
      "preset",
      "age",
      3,
      "valueChange",
      "label",
      "hint",
      "value",
      "error"
    ],
    [1, "sm:col-span-2"],
    [1, "lbl"],
    [
      "role",
      "radiogroup",
      1,
      "seg",
      "mt-2"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      3,
      "click"
    ],
    [1, "field-err"],
    [
      "leadingIcon",
      "apartment",
      3,
      "label",
      "options",
      "value"
    ],
    [
      "leadingIcon",
      "admin_panel_settings",
      3,
      "valueChange",
      "label",
      "placeholder",
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
      "click"
    ],
    [
      "name",
      "mail",
      3,
      "size"
    ],
    [
      "icon",
      "person",
      3,
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      "icon",
      "edit",
      3,
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
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
      1,
      "mt-3",
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      "type",
      "button",
      1,
      "chip-role",
      3,
      "click"
    ],
    [1, "n"],
    [
      "leadingIcon",
      "admin_panel_settings",
      1,
      "min-w-[220px]",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [1, "overflow-x-auto"],
    [
      1,
      "tbl",
      "min-w-[820px]"
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
    [
      1,
      "avatar",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-foret)"
    ],
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
    [1, "font-medium"],
    [1, "badge"],
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
      "visibility",
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
      3,
      "name",
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
      "sub",
      "max-w-md"
    ],
    [
      "name",
      "warning",
      3,
      "size"
    ],
    [
      "leadingIcon",
      "apartment",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      "icon",
      "person",
      3,
      "closed",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [1, "facts"],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-primary"
    ],
    [
      "icon",
      "edit",
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
      "sm:col-span-2",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [1, "sub"],
    [
      "leadingIcon",
      "admin_panel_settings",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      "name",
      "check",
      3,
      "size"
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
      3,
      "click"
    ]
  ],
  template: function PersonnelPage_Template(rf, ctx) {
    var _a2, _b, _c, _d, _e;
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
      __listener("click", function PersonnelPage_Template_button_click_9_listener() {
        return ctx.openAdd();
      });
      __text(10);
      __elementStart(11, "span", 7);
      __element(12, "ui-icon", 8);
      __elementEnd()()();
      __element(13, "ui-stat-cards", 9);
      __conditionalCreate(14, PersonnelPage_Conditional_14_Template, 6, 2, "section", 10);
      __elementStart(15, "div", 11)(16, "label", 12);
      __element(17, "ui-icon", 13);
      __elementStart(18, "input", 14);
      __listener("input", function PersonnelPage_Template_input_input_18_listener($event) {
        return ctx.query.set($event.target.value);
      });
      __elementEnd()();
      __elementStart(19, "div", 15);
      __repeaterCreate(20, PersonnelPage_For_21_Template, 4, 7, "button", 16, _forTrack0);
      __elementEnd();
      __conditionalCreate(22, PersonnelPage_Conditional_22_Template, 1, 3, "ui-select", 17);
      __elementEnd();
      __elementStart(23, "p", 18);
      __text(24);
      __elementEnd();
      __elementStart(25, "section", 19);
      __conditionalCreate(26, PersonnelPage_Conditional_26_Template, 16, 5)(27, PersonnelPage_Conditional_27_Template, 7, 3, "div", 20);
      __elementEnd();
      __elementStart(28, "ui-modal", 21);
      __listener("closed", function PersonnelPage_Template_ui_modal_closed_28_listener() {
        return ctx.addOpen.set(false);
      });
      __elementStart(29, "div", 22)(30, "div", 23)(31, "ui-text-field", 24);
      __listener("valueChange", function PersonnelPage_Template_ui_text_field_valueChange_31_listener($event) {
        return ctx.firstName.set($event);
      });
      __elementEnd();
      __elementStart(32, "ui-text-field", 25);
      __listener("valueChange", function PersonnelPage_Template_ui_text_field_valueChange_32_listener($event) {
        return ctx.lastName.set($event);
      });
      __elementEnd();
      __elementStart(33, "ui-text-field", 26);
      __listener("valueChange", function PersonnelPage_Template_ui_text_field_valueChange_33_listener($event) {
        return ctx.email.set($event);
      });
      __elementEnd();
      __elementStart(34, "ui-text-field", 27);
      __listener("valueChange", function PersonnelPage_Template_ui_text_field_valueChange_34_listener($event) {
        return ctx.phone.set($event);
      });
      __elementEnd();
      __elementStart(35, "ui-text-field", 28);
      __listener("valueChange", function PersonnelPage_Template_ui_text_field_valueChange_35_listener($event) {
        return ctx.age.set($event);
      });
      __elementEnd();
      __elementStart(36, "div", 29)(37, "p", 30);
      __text(38);
      __elementEnd();
      __elementStart(39, "div", 31)(40, "button", 32);
      __listener("click", function PersonnelPage_Template_button_click_40_listener() {
        return ctx.sex.set("F");
      });
      __text(41);
      __elementEnd();
      __elementStart(42, "button", 32);
      __listener("click", function PersonnelPage_Template_button_click_42_listener() {
        return ctx.sex.set("H");
      });
      __text(43);
      __elementEnd()();
      __conditionalCreate(44, PersonnelPage_Conditional_44_Template, 3, 2, "p", 33);
      __elementEnd()();
      __conditionalCreate(45, PersonnelPage_Conditional_45_Template, 1, 3, "ui-select", 34);
      __elementStart(46, "ui-select", 35);
      __listener("valueChange", function PersonnelPage_Template_ui_select_valueChange_46_listener($event) {
        return ctx.role.set($event);
      });
      __elementEnd();
      __conditionalCreate(47, PersonnelPage_Conditional_47_Template, 3, 2, "p", 33);
      __element(48, "app-role-access-preview", 36);
      __elementEnd();
      __elementStart(49, "button", 37);
      __listener("click", function PersonnelPage_Template_button_click_49_listener() {
        return ctx.addOpen.set(false);
      });
      __text(50);
      __elementEnd();
      __elementStart(51, "button", 38);
      __listener("click", function PersonnelPage_Template_button_click_51_listener() {
        return ctx.submitAdd();
      });
      __text(52);
      __elementStart(53, "span", 7);
      __element(54, "ui-icon", 39);
      __elementEnd()()();
      __conditionalCreate(55, PersonnelPage_Conditional_55_Template, 37, 26, "ui-modal", 40);
      __conditionalCreate(56, PersonnelPage_Conditional_56_Template, 25, 42, "ui-modal", 41);
      __conditionalCreate(57, PersonnelPage_Conditional_57_Template, 5, 15, "ui-modal", 42);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_62_0;
      let tmp_63_0;
      let tmp_64_0;
      __property("area", ctx.t()("personnel.area"));
      __advance(4);
      __textInterpolate(ctx.t()("personnel.eyebrow"));
      __advance(2);
      __textInterpolate(ctx.t()("personnel.title"));
      __advance(2);
      __textInterpolate(ctx.t()("personnel.description"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("personnel.add"));
      __advance(2);
      __property("size", 20);
      __advance();
      __property("stats", ctx.stats());
      __advance();
      __conditional(ctx.roleBreakdown().length ? 14 : -1);
      __advance(3);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("personnel.search.placeholder"))("value", ctx.query());
      __attribute("aria-label", ctx.t()("personnel.search.aria"));
      __advance();
      __attribute("aria-label", ctx.t()("personnel.col.state"));
      __advance();
      __repeater(ctx.stateFilters());
      __advance(2);
      __conditional(ctx.roleFilterOptions().length > 2 ? 22 : -1);
      __advance(2);
      __textInterpolate(ctx.t()("personnel.count", __pureFunction2(66, _c0, ctx.shown().length, ctx.rows().length)));
      __advance(2);
      __conditional(ctx.shown().length ? 26 : 27);
      __advance(2);
      __property("open", ctx.addOpen())("title", ctx.t()("personnel.add.title"))("description", ctx.t()("personnel.add.description"))("width", 700)("closeLabel", ctx.t()("common.close"));
      __advance(3);
      __property("label", ctx.t()("tech.dialog.firstName"))("value", ctx.firstName())("error", (_a2 = ctx.errors().firstName) != null ? _a2 : "");
      __advance();
      __property("label", ctx.t()("tech.dialog.lastName"))("value", ctx.lastName())("error", (_b = ctx.errors().lastName) != null ? _b : "");
      __advance();
      __property("label", ctx.t()("tech.dialog.email"))("hint", ctx.t()("personnel.add.emailHint"))("value", ctx.email())("error", (_c = ctx.errors().email) != null ? _c : "");
      __advance();
      __property("label", ctx.t()("tech.dialog.phone"))("value", ctx.phone())("error", (_d = ctx.errors().phone) != null ? _d : "");
      __advance();
      __property("label", ctx.t()("adherents.add.age"))("hint", ctx.t()("tech.dialog.ageHint"))("value", ctx.age())("error", (_e = ctx.errors().age) != null ? _e : "");
      __advance(3);
      __textInterpolate(ctx.t()("adherents.add.sex"));
      __advance();
      __attribute("aria-label", ctx.t()("adherents.add.sex"));
      __advance();
      __classProp("on", ctx.sex() === "F");
      __attribute("aria-checked", ctx.sex() === "F");
      __advance();
      __textInterpolate(ctx.t()("adherents.add.female"));
      __advance();
      __classProp("on", ctx.sex() === "H");
      __attribute("aria-checked", ctx.sex() === "H");
      __advance();
      __textInterpolate(ctx.t()("adherents.add.male"));
      __advance();
      __conditional(ctx.errors().sex ? 44 : -1);
      __advance();
      __conditional(ctx.scoopOptions().length > 1 ? 45 : -1);
      __advance();
      __property("label", ctx.t()("personnel.add.role"))("placeholder", ctx.t()("personnel.add.rolePlaceholder"))("options", ctx.roleOptions())("value", ctx.role());
      __advance();
      __conditional(ctx.errors().role ? 47 : -1);
      __advance();
      __property("bare", true)("permissions", ctx.previewPermissions())("scoped", true)("hint", ctx.t()("roles.access.hintCreate"))("emptyText", ctx.t()("roles.access.noneCreate"));
      __advance(2);
      __textInterpolate(ctx.t()("common.cancel"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("personnel.add.submit"));
      __advance(2);
      __property("size", 18);
      __advance();
      __conditional((tmp_62_0 = ctx.viewedRow()) ? 55 : -1, tmp_62_0);
      __advance();
      __conditional((tmp_63_0 = ctx.editing()) ? 56 : -1, tmp_63_0);
      __advance();
      __conditional((tmp_64_0 = ctx.toggling()) ? 57 : -1, tmp_64_0);
    }
  },
  dependencies: [
    AppShellComponent,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    RoleAccessPreviewComponent,
    SelectComponent,
    StatCardsComponent,
    TextFieldComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".lbl[_ngcontent-%COMP%] {\n        font-size: 12px;\n        font-weight: 700;\n        letter-spacing: 0.06em;\n        text-transform: uppercase;\n        color: var(--%NS%v2-ardoise);\n      }\n      .chip-role[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        gap: 8px;\n        border-radius: 999px;\n        border: 1.5px solid var(--%NS%v2-gris-trait);\n        background: var(--%NS%v2-blanc);\n        padding: 7px 8px 7px 14px;\n        font-size: 14px;\n        font-weight: 700;\n        color: var(--%NS%v2-encre);\n        cursor: pointer;\n      }\n      .chip-role[_ngcontent-%COMP%]:hover {\n        border-color: var(--%NS%v2-foret);\n      }\n      .chip-role.on[_ngcontent-%COMP%] {\n        border-color: var(--%NS%v2-foret);\n        background: var(--%NS%v2-foret);\n        color: var(--%NS%v2-blanc);\n      }\n      .chip-role[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n        display: grid;\n        min-width: 26px;\n        height: 26px;\n        place-items: center;\n        border-radius: 999px;\n        background: var(--%NS%v2-citron);\n        color: var(--%NS%v2-foret);\n        font-size: 13px;\n        font-weight: 800;\n      }\n      .chip-role[_ngcontent-%COMP%]:focus-visible {\n        outline: 2px solid var(--%NS%v2-foret);\n        outline-offset: 2px;\n      }\n      .facts[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 14px 20px;\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n      .facts[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n        font-size: 12px;\n        font-weight: 700;\n        letter-spacing: 0.06em;\n        text-transform: uppercase;\n        color: var(--%NS%v2-gris-texte);\n      }\n      .facts[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n        margin-top: 2px;\n        font-size: 15px;\n        font-weight: 700;\n        word-break: break-word;\n      }\n      .field-err[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 6px;\n        margin-top: 6px;\n        font-size: 13px;\n        font-weight: 700;\n        color: var(--%NS%v2-erreur-fg);\n      }"]
}), _a);

export { PersonnelPage as default };
//# sourceMappingURL=personnel.page-DQV-E1CZ.mjs.map

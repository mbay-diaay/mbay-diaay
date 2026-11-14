import { i as inject, F as signal, c as computed, ɵ as __defineComponent, f as __elementStart, g as __text, h as __elementEnd, H as __listener, b as __element, m as __repeaterCreate, j as __conditionalCreate, I as __twoWayListener, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, u as __attribute, v as __repeater, s as __conditional, x as __pureFunction2, K as __twoWayProperty, L as __getCurrentView, w as __nextContext, z as __classProp, r as __pureFunction1, N as __textInterpolate2, t as __styleProp, T as __textInterpolate3, O as __restoreView, P as __resetView, Q as __twoWayBindingSet } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, i as inScope, j as nf } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { a as TechnicianCodeDialogComponent, T as TechnicianDialogComponent } from './technician-dialog.component-BZhETki0.mjs';
import { q as CheckListComponent, M as ModalComponent, P as PaginationComponent, S as SelectComponent, g as StatCardsComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';
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

var _a;
var _c0 = (a0, a1) => ({
  shown: a0,
  total: a1
});
var _c1 = (a0) => ({ name: a0 });
var _c2 = (a0) => ({ count: a0 });
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.user.id;
function TechniciensPage_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 27);
    __listener("click", function TechniciensPage_For_20_Template_button_click_0_listener() {
      const option_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.stateFilter.set(option_r2.id));
    });
    __text(1);
    __elementStart(2, "span", 28);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const option_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __classProp("on", ctx_r2.stateFilter() === option_r2.id);
    __attribute("aria-checked", ctx_r2.stateFilter() === option_r2.id);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()(option_r2.label));
    __advance();
    __classProp("zero", !option_r2.count);
    __advance();
    __textInterpolate(option_r2.count);
  }
}
function TechniciensPage_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "ui-select", 29);
    __listener("valueChange", function TechniciensPage_Conditional_21_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r4);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.scoopFilter.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __property("label", ctx_r2.t()("techniciens.filter.scoop"))("options", ctx_r2.scoopFilterOptions())("value", ctx_r2.scoopFilter());
  }
}
function TechniciensPage_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "ui-select", 30);
    __listener("valueChange", function TechniciensPage_Conditional_22_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r5);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.orgFilter.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __property("label", ctx_r2.t()("techniciens.filter.org"))("options", ctx_r2.orgFilterOptions())("value", ctx_r2.orgFilter());
  }
}
function TechniciensPage_Conditional_26_For_16_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 40);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r7 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate3("", row_r7.user.sex === "F" ? ctx_r2.t()("adherents.add.female") : row_r7.user.sex === "H" ? ctx_r2.t()("adherents.add.male") : "", "", row_r7.user.sex && row_r7.user.age ? " \xB7 " : "", "", row_r7.user.age ? ctx_r2.t()("tech.ageYears", __pureFunction1(3, _c2, row_r7.user.age)) : "");
  }
}
function TechniciensPage_Conditional_26_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "tr", 36);
    __listener("click", function TechniciensPage_Conditional_26_For_16_Template_tr_click_0_listener() {
      const row_r7 = __restoreView(_r6).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.viewing.set(row_r7.user));
    });
    __elementStart(1, "td")(2, "span", 37)(3, "span", 38);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 2)(6, "span", 39);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 40);
    __text(9);
    __elementEnd();
    __conditionalCreate(10, TechniciensPage_Conditional_26_For_16_Conditional_10_Template, 2, 5, "span", 40);
    __elementEnd()()();
    __elementStart(11, "td", 41);
    __text(12);
    __elementEnd();
    __elementStart(13, "td", 42);
    __text(14);
    __elementEnd();
    __elementStart(15, "td")(16, "span", 43);
    __text(17);
    __elementEnd()();
    __elementStart(18, "td", 44);
    __listener("click", function TechniciensPage_Conditional_26_For_16_Template_td_click_18_listener($event) {
      return $event.stopPropagation();
    });
    __elementStart(19, "span", 45)(20, "button", 46);
    __listener("click", function TechniciensPage_Conditional_26_For_16_Template_button_click_20_listener() {
      const row_r7 = __restoreView(_r6).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.viewing.set(row_r7.user));
    });
    __element(21, "ui-icon", 47);
    __elementEnd();
    __elementStart(22, "button", 46);
    __listener("click", function TechniciensPage_Conditional_26_For_16_Template_button_click_22_listener() {
      const row_r7 = __restoreView(_r6).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.askNewCode(row_r7.user));
    });
    __element(23, "ui-icon", 48);
    __elementEnd();
    __elementStart(24, "button", 46);
    __listener("click", function TechniciensPage_Conditional_26_For_16_Template_button_click_24_listener() {
      const row_r7 = __restoreView(_r6).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.openEdit(row_r7.user));
    });
    __element(25, "ui-icon", 49);
    __elementEnd();
    __elementStart(26, "button", 50);
    __listener("click", function TechniciensPage_Conditional_26_For_16_Template_button_click_26_listener() {
      const row_r7 = __restoreView(_r6).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.removing.set(row_r7.user));
    });
    __element(27, "ui-icon", 51);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(4);
    __textInterpolate(row_r7.initials);
    __advance(3);
    __textInterpolate(row_r7.user.name);
    __advance(2);
    __textInterpolate2("", ctx_r2.store.phone(row_r7.user.phone), "", row_r7.user.email ? " \xB7 " + row_r7.user.email : "");
    __advance();
    __conditional(row_r7.user.sex || row_r7.user.age ? 10 : -1);
    __advance(2);
    __textInterpolate(row_r7.scoopNames.join(", "));
    __advance();
    __classProp("zero", !row_r7.orgNames.length);
    __advance();
    __textInterpolate(row_r7.orgNames.length ? row_r7.orgNames.join(", ") : ctx_r2.t()("techniciens.orgs.all"));
    __advance(2);
    __styleProp("background", row_r7.state === "active" ? "var(--v2-culture-bg)" : row_r7.state === "invited" ? "var(--v2-attente-bg)" : "var(--v2-lin)")("color", row_r7.state === "active" ? "var(--v2-culture-fg)" : row_r7.state === "invited" ? "var(--v2-attente-fg)" : "var(--v2-gris-texte)");
    __advance();
    __textInterpolate1(" ", ctx_r2.t()(ctx_r2.stateLabel[row_r7.state]), " ");
    __advance(3);
    __property("title", ctx_r2.t()("common.view"));
    __attribute("aria-label", ctx_r2.t()("techniciens.view.aria", __pureFunction1(26, _c1, row_r7.user.name)));
    __advance();
    __property("size", 18);
    __advance();
    __property("title", ctx_r2.t()("techniciens.newCode"));
    __attribute("aria-label", ctx_r2.t()("techniciens.newCode.aria", __pureFunction1(28, _c1, row_r7.user.name)));
    __advance();
    __property("size", 18);
    __advance();
    __property("title", ctx_r2.t()("techniciens.edit"));
    __attribute("aria-label", ctx_r2.t()("techniciens.edit.aria", __pureFunction1(30, _c1, row_r7.user.name)));
    __advance();
    __property("size", 18);
    __advance();
    __property("title", ctx_r2.t()("techniciens.remove.confirm"));
    __attribute("aria-label", ctx_r2.t()("techniciens.remove.aria", __pureFunction1(32, _c1, row_r7.user.name)));
    __advance();
    __property("size", 18);
  }
}
function TechniciensPage_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 31)(1, "table", 32)(2, "thead")(3, "tr")(4, "th");
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
    __elementStart(12, "th", 33);
    __text(13);
    __elementEnd()()();
    __elementStart(14, "tbody");
    __repeaterCreate(15, TechniciensPage_Conditional_26_For_16_Template, 28, 34, "tr", 34, _forTrack1);
    __elementEnd()()();
    __element(17, "ui-pagination", 35);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(5);
    __textInterpolate(ctx_r2.t()("techniciens.col.name"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("techniciens.col.scoops"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("techniciens.col.orgs"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("techniciens.col.state"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("techniciens.col.actions"));
    __advance(2);
    __repeater(ctx_r2.pager.items());
    __advance(2);
    __property("pager", ctx_r2.pager);
  }
}
function TechniciensPage_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 20)(1, "span", 52);
    __element(2, "ui-icon", 53);
    __elementEnd();
    __elementStart(3, "p", 54);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 55);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r2.t()("techniciens.empty.title"));
    __advance(2);
    __textInterpolate(ctx_r2.rows().length ? ctx_r2.t()("techniciens.empty.filtered") : ctx_r2.t()("techniciens.empty.none"));
  }
}
function TechniciensPage_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = __getCurrentView();
    __elementStart(0, "ui-modal", 56);
    __listener("closed", function TechniciensPage_Conditional_30_Template_ui_modal_closed_0_listener() {
      __restoreView(_r8);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.viewing.set(null));
    });
    __elementStart(1, "dl", 57)(2, "div")(3, "dt");
    __text(4);
    __elementEnd();
    __elementStart(5, "dd");
    __text(6);
    __elementEnd()();
    __elementStart(7, "div")(8, "dt");
    __text(9);
    __elementEnd();
    __elementStart(10, "dd");
    __text(11);
    __elementEnd()();
    __elementStart(12, "div")(13, "dt");
    __text(14);
    __elementEnd();
    __elementStart(15, "dd");
    __text(16);
    __elementEnd()();
    __elementStart(17, "div")(18, "dt");
    __text(19);
    __elementEnd();
    __elementStart(20, "dd");
    __text(21);
    __elementEnd()();
    __elementStart(22, "div", 58)(23, "dt");
    __text(24);
    __elementEnd();
    __elementStart(25, "dd");
    __text(26);
    __elementEnd()();
    __elementStart(27, "div", 58)(28, "dt");
    __text(29);
    __elementEnd();
    __elementStart(30, "dd");
    __text(31);
    __elementEnd()()();
    __elementStart(32, "button", 59);
    __listener("click", function TechniciensPage_Conditional_30_Template_button_click_32_listener() {
      __restoreView(_r8);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.viewing.set(null));
    });
    __text(33);
    __elementEnd();
    __elementStart(34, "button", 59);
    __listener("click", function TechniciensPage_Conditional_30_Template_button_click_34_listener() {
      const view_r9 = __restoreView(_r8);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.askNewCode(view_r9.user));
    });
    __element(35, "ui-icon", 48);
    __text(36);
    __elementEnd();
    __elementStart(37, "button", 60);
    __listener("click", function TechniciensPage_Conditional_30_Template_button_click_37_listener() {
      const view_r9 = __restoreView(_r8);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.openEdit(view_r9.user));
    });
    __text(38);
    __elementStart(39, "span", 7);
    __element(40, "ui-icon", 49);
    __elementEnd()()();
  }
  if (rf & 2) {
    const view_r9 = ctx;
    const ctx_r2 = __nextContext();
    __property("open", true)("title", view_r9.user.name)("description", ctx_r2.t()(ctx_r2.stateLabel[view_r9.state]))("width", 640)("closeLabel", ctx_r2.t()("common.close"));
    __advance(4);
    __textInterpolate(ctx_r2.t()("tech.dialog.phone"));
    __advance(2);
    __textInterpolate(view_r9.user.phone ? ctx_r2.store.phone(view_r9.user.phone) : "\u2014");
    __advance(3);
    __textInterpolate(ctx_r2.t()("tech.dialog.email"));
    __advance(2);
    __textInterpolate(view_r9.user.email || ctx_r2.t()("techniciens.noEmail"));
    __advance(3);
    __textInterpolate(ctx_r2.t()("adherents.add.sex"));
    __advance(2);
    __textInterpolate(view_r9.user.sex === "F" ? ctx_r2.t()("adherents.add.female") : view_r9.user.sex === "H" ? ctx_r2.t()("adherents.add.male") : "\u2014");
    __advance(3);
    __textInterpolate(ctx_r2.t()("adherents.add.age"));
    __advance(2);
    __textInterpolate(view_r9.user.age ? ctx_r2.t()("tech.ageYears", __pureFunction1(22, _c2, view_r9.user.age)) : "\u2014");
    __advance(3);
    __textInterpolate(ctx_r2.t()("techniciens.col.scoops"));
    __advance(2);
    __textInterpolate(view_r9.scoopNames.join(", "));
    __advance(3);
    __textInterpolate(ctx_r2.t()("techniciens.col.orgs"));
    __advance(2);
    __textInterpolate(view_r9.orgNames.length ? view_r9.orgNames.join(", ") : ctx_r2.t()("techniciens.orgs.all"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("common.close"));
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r2.t()("techniciens.newCode"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("techniciens.edit"));
    __advance(2);
    __property("size", 18);
  }
}
function TechniciensPage_Conditional_31_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = __getCurrentView();
    __elementStart(0, "ui-check-list", 69);
    __listener("valueChange", function TechniciensPage_Conditional_31_Conditional_13_Template_ui_check_list_valueChange_0_listener($event) {
      __restoreView(_r11);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.editOrgIds.set($event));
    });
    __elementEnd();
    __elementStart(1, "p", 70);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __property("label", ctx_r2.t()("tech.dialog.section.orgs"))("options", ctx_r2.editOrgOptions())("value", ctx_r2.editOrgIds());
    __advance(2);
    __textInterpolate(ctx_r2.t()("tech.dialog.orgsHint"));
  }
}
function TechniciensPage_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "ui-modal", 61);
    __listener("closed", function TechniciensPage_Conditional_31_Template_ui_modal_closed_0_listener() {
      __restoreView(_r10);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editing.set(null));
    });
    __elementStart(1, "div", 62)(2, "ui-text-field", 63);
    __listener("valueChange", function TechniciensPage_Conditional_31_Template_ui_text_field_valueChange_2_listener($event) {
      __restoreView(_r10);
      const ctx_r2 = __nextContext();
      ctx_r2.editName.set($event);
      return __resetView(ctx_r2.editError.set(""));
    });
    __elementEnd();
    __elementStart(3, "ui-text-field", 64);
    __listener("valueChange", function TechniciensPage_Conditional_31_Template_ui_text_field_valueChange_3_listener($event) {
      __restoreView(_r10);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editPhone.set($event));
    });
    __elementEnd();
    __elementStart(4, "ui-text-field", 65);
    __listener("valueChange", function TechniciensPage_Conditional_31_Template_ui_text_field_valueChange_4_listener($event) {
      __restoreView(_r10);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editAge.set($event));
    });
    __elementEnd();
    __elementStart(5, "div")(6, "p", 66);
    __text(7);
    __elementEnd();
    __elementStart(8, "div", 67)(9, "button", 27);
    __listener("click", function TechniciensPage_Conditional_31_Template_button_click_9_listener() {
      __restoreView(_r10);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editSex.set("F"));
    });
    __text(10);
    __elementEnd();
    __elementStart(11, "button", 27);
    __listener("click", function TechniciensPage_Conditional_31_Template_button_click_11_listener() {
      __restoreView(_r10);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editSex.set("H"));
    });
    __text(12);
    __elementEnd()()();
    __conditionalCreate(13, TechniciensPage_Conditional_31_Conditional_13_Template, 3, 4);
    __elementEnd();
    __elementStart(14, "button", 59);
    __listener("click", function TechniciensPage_Conditional_31_Template_button_click_14_listener() {
      __restoreView(_r10);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.editing.set(null));
    });
    __text(15);
    __elementEnd();
    __elementStart(16, "button", 60);
    __listener("click", function TechniciensPage_Conditional_31_Template_button_click_16_listener() {
      const edited_r12 = __restoreView(_r10);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.saveEdit(edited_r12));
    });
    __text(17);
    __elementStart(18, "span", 7);
    __element(19, "ui-icon", 68);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __property("open", true)("title", ctx_r2.t()("techniciens.edit.title", __pureFunction1(27, _c1, ctx.name)))("description", ctx_r2.t()("techniciens.edit.description"))("width", 640)("closeLabel", ctx_r2.t()("common.close"));
    __advance(2);
    __property("label", ctx_r2.t()("techniciens.edit.name"))("value", ctx_r2.editName())("error", ctx_r2.editError());
    __advance();
    __property("label", ctx_r2.t()("tech.dialog.phone"))("value", ctx_r2.editPhone());
    __advance();
    __property("label", ctx_r2.t()("adherents.add.age"))("hint", ctx_r2.t()("tech.dialog.ageHint"))("value", ctx_r2.editAge());
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
    __conditional(ctx_r2.editOrgOptions().length ? 13 : -1);
    __advance(2);
    __textInterpolate(ctx_r2.t()("common.cancel"));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("techniciens.edit.save"));
    __advance(2);
    __property("size", 18);
  }
}
function TechniciensPage_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "ui-modal", 71);
    __listener("closed", function TechniciensPage_Conditional_32_Template_ui_modal_closed_0_listener() {
      __restoreView(_r13);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.renewing.set(null));
    });
    __elementStart(1, "button", 59);
    __listener("click", function TechniciensPage_Conditional_32_Template_button_click_1_listener() {
      __restoreView(_r13);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.renewing.set(null));
    });
    __text(2);
    __elementEnd();
    __elementStart(3, "button", 72);
    __listener("click", function TechniciensPage_Conditional_32_Template_button_click_3_listener() {
      const renewed_r14 = __restoreView(_r13);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.newCode(renewed_r14));
    });
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const renewed_r14 = ctx;
    const ctx_r2 = __nextContext();
    __property("open", true)("title", ctx_r2.t()("techniciens.renew.title", __pureFunction1(7, _c1, renewed_r14.name)))("description", ctx_r2.t()("techniciens.renew.text", __pureFunction1(9, _c1, renewed_r14.name)))("width", 560)("closeLabel", ctx_r2.t()("common.close"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("common.cancel"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("techniciens.renew.confirm"));
  }
}
function TechniciensPage_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = __getCurrentView();
    __elementStart(0, "ui-modal", 73);
    __listener("closed", function TechniciensPage_Conditional_33_Template_ui_modal_closed_0_listener() {
      __restoreView(_r15);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.removing.set(null));
    });
    __elementStart(1, "button", 59);
    __listener("click", function TechniciensPage_Conditional_33_Template_button_click_1_listener() {
      __restoreView(_r15);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.removing.set(null));
    });
    __text(2);
    __elementEnd();
    __elementStart(3, "button", 72);
    __listener("click", function TechniciensPage_Conditional_33_Template_button_click_3_listener() {
      const removed_r16 = __restoreView(_r15);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.confirmRemove(removed_r16));
    });
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const removed_r16 = ctx;
    const ctx_r2 = __nextContext();
    __property("open", true)("title", ctx_r2.t()("techniciens.remove.title", __pureFunction1(7, _c1, removed_r16.name)))("description", ctx_r2.t()(ctx_r2.isOnlyHere(removed_r16) ? "techniciens.remove.textAlone" : "techniciens.remove.textShared", __pureFunction1(9, _c1, removed_r16.name)))("width", 540)("closeLabel", ctx_r2.t()("common.close"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("common.cancel"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("techniciens.remove.confirm"));
  }
}
var WHOLE_COOP = "__coop__";
var TechniciensPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.snackbar = inject(SnackbarService);
    this.stateLabel = {
      active: "techniciens.state.active",
      invited: "techniciens.state.invited",
      closed: "techniciens.state.closed"
    };
    this.query = signal("", ...[]);
    this.stateFilter = signal("all", ...[]);
    this.scoopFilter = signal("all", ...[]);
    this.orgFilter = signal("all", ...[]);
    this.addOpen = signal(false, ...[]);
    this.viewing = signal(null, ...[]);
    this.renewing = signal(null, ...[]);
    this.codeView = signal(null, ...[]);
    this.editing = signal(null, ...[]);
    this.removing = signal(null, ...[]);
    this.editName = signal("", ...[]);
    this.editPhone = signal("", ...[]);
    this.editAge = signal("", ...[]);
    this.editSex = signal("", ...[]);
    this.editOrgIds = signal([], ...[]);
    this.editError = signal("", ...[]);
    this.visibleScoopIds = computed(() => {
      const state = this.store.state();
      return inScope(state.scoops.filter((scoop) => !scoop.archived).map((scoop) => ({
        ...scoop,
        scoopId: scoop.id
      })), state.session).map((scoop) => scoop.id);
    }, ...[]);
    this.defaultScoopId = computed(() => this.visibleScoopIds().length === 1 ? this.visibleScoopIds()[0] : null, ...[]);
    this.rows = computed(() => {
      const state = this.store.state();
      const visible = new Set(this.visibleScoopIds());
      return state.users.filter((user) => user.role === "technicien" && this.scoopIdsOf(user).some((id) => visible.has(id))).sort((first, second) => first.name.localeCompare(second.name)).map((user) => {
        var _a2, _b;
        return {
          user,
          initials: user.name.split(" ").map((word) => {
            var _a3;
            return (_a3 = word[0]) != null ? _a3 : "";
          }).join("").slice(0, 2).toUpperCase(),
          scoopIds: this.scoopIdsOf(user).filter((id) => visible.has(id)),
          orgIds: ((_a2 = user.orgIds) != null ? _a2 : []).filter((id) => {
            const org = state.orgs.find((candidate) => candidate.id === id);
            return !!org && visible.has(org.scoopId);
          }),
          scoopNames: this.scoopIdsOf(user).filter((id) => visible.has(id)).map((id) => {
            var _a3, _b2;
            return (_b2 = (_a3 = state.scoops.find((scoop) => scoop.id === id)) == null ? void 0 : _a3.name) != null ? _b2 : id;
          }),
          orgNames: ((_b = user.orgIds) != null ? _b : []).map((id) => state.orgs.find((org) => org.id === id)).filter((org) => !!org && visible.has(org.scoopId)).map((org) => org.name),
          state: user.activation ? "invited" : user.active ? "active" : "closed"
        };
      });
    }, ...[]);
    this.shown = computed(() => {
      const needle = this.query().trim().toLowerCase();
      return this.rows().filter((row) => (this.stateFilter() === "all" || row.state === this.stateFilter()) && (this.scoopFilter() === "all" || row.scoopIds.includes(this.scoopFilter())) && (this.orgFilter() === "all" || (this.orgFilter() === WHOLE_COOP ? !row.orgIds.length : row.orgIds.includes(this.orgFilter()))) && (!needle || [
        row.user.name,
        row.user.email,
        row.user.phone,
        ...row.scoopNames,
        ...row.orgNames
      ].some((text) => text.toLowerCase().includes(needle))));
    }, ...[]);
    this.stateFilters = computed(() => {
      const rows = this.rows();
      const count = (state) => rows.filter((row) => row.state === state).length;
      return [
        {
          id: "all",
          label: "techniciens.filter.all",
          count: rows.length
        },
        {
          id: "active",
          label: "techniciens.state.active",
          count: count("active")
        },
        {
          id: "invited",
          label: "techniciens.state.invited",
          count: count("invited")
        },
        {
          id: "closed",
          label: "techniciens.state.closed",
          count: count("closed")
        }
      ];
    }, ...[]);
    this.scoopFilterOptions = computed(() => {
      const rows = this.rows();
      const state = this.store.state();
      const ids = [...new Set(rows.flatMap((row) => row.scoopIds))];
      return [{
        value: "all",
        label: this.t()("techniciens.filter.allScoops"),
        hint: nf.format(rows.length)
      }, ...ids.map((id) => {
        var _a2, _b;
        return {
          value: id,
          label: (_b = (_a2 = state.scoops.find((scoop) => scoop.id === id)) == null ? void 0 : _a2.name) != null ? _b : id,
          hint: nf.format(rows.filter((row) => row.scoopIds.includes(id)).length)
        };
      }).sort((first, second) => first.label.localeCompare(second.label))];
    }, ...[]);
    this.orgFilterOptions = computed(() => {
      const rows = this.rows();
      const state = this.store.state();
      const ids = [...new Set(rows.flatMap((row) => row.orgIds))];
      return [
        {
          value: "all",
          label: this.t()("techniciens.filter.allOrgs"),
          hint: nf.format(rows.length)
        },
        {
          value: WHOLE_COOP,
          label: this.t()("techniciens.orgs.all"),
          hint: nf.format(rows.filter((row) => !row.orgIds.length).length)
        },
        ...ids.map((id) => {
          var _a2, _b;
          return {
            value: id,
            label: (_b = (_a2 = state.orgs.find((org) => org.id === id)) == null ? void 0 : _a2.name) != null ? _b : id,
            hint: nf.format(rows.filter((row) => row.orgIds.includes(id)).length)
          };
        }).sort((first, second) => first.label.localeCompare(second.label))
      ];
    }, ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const rows = this.rows();
      const count = (state) => rows.filter((row) => row.state === state).length;
      const scoops = new Set(rows.flatMap((row) => row.scoopIds)).size;
      const women = rows.filter((row) => row.user.sex === "F").length;
      return [
        {
          label: t("techniciens.stat.total"),
          value: nf.format(rows.length),
          sub: t("techniciens.stat.totalSub", { scoops: nf.format(scoops) }),
          icon: "badge",
          bg: "",
          fg: ""
        },
        {
          label: t("techniciens.stat.active"),
          value: nf.format(count("active")),
          sub: t("techniciens.stat.activeSub"),
          icon: "how_to_reg",
          ...TONE.succes
        },
        {
          label: t("techniciens.stat.invited"),
          value: nf.format(count("invited")),
          sub: t("techniciens.stat.invitedSub"),
          icon: "lock",
          ...TONE.info
        },
        {
          label: t("techniciens.stat.closed"),
          value: nf.format(count("closed")),
          sub: t("techniciens.stat.closedSub", { women: nf.format(women) }),
          icon: "block",
          ...TONE.attente
        }
      ];
    }, ...[]);
    this.pager = createPager(() => this.shown());
    this.editOrgOptions = computed(() => {
      const user = this.editing();
      if (!user) return [];
      const state = this.store.state();
      const visible = new Set(this.visibleScoopIds());
      const scoops = this.scoopIdsOf(user).filter((id) => visible.has(id));
      return state.orgs.filter((org) => scoops.includes(org.scoopId)).sort((first, second) => first.name.localeCompare(second.name)).map((org) => {
        var _a2, _b;
        return {
          value: org.id,
          label: org.name,
          ...scoops.length > 1 ? { hint: (_b = (_a2 = state.scoops.find((scoop) => scoop.id === org.scoopId)) == null ? void 0 : _a2.name) != null ? _b : "" } : {}
        };
      });
    }, ...[]);
    this.viewedRow = computed(() => {
      var _a2;
      const person = this.viewing();
      return person ? (_a2 = this.rows().find((row) => row.user.id === person.id)) != null ? _a2 : null : null;
    }, ...[]);
  }
  scoopIdsOf(user) {
    var _a2;
    return (_a2 = user.scoopIds) != null ? _a2 : user.scoopId ? [user.scoopId] : [];
  }
  /** Perdu ou expiré : on génère un nouveau code (l'ancien cesse de marcher) et on l'affiche une fois. */
  /** Un technicien actif perd son mot de passe : on demande confirmation avant de générer. */
  askNewCode(user) {
    this.viewing.set(null);
    if (user.active) this.renewing.set(user);
    else this.newCode(user);
  }
  newCode(user) {
    this.viewing.set(null);
    this.renewing.set(null);
    const result = this.store.actions.regenerateTechnicianCode(user.id);
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.codeView.set({
      userId: user.id,
      name: user.name,
      code: result.code,
      expiresAt: result.expiresAt,
      email: user.email
    });
  }
  openEdit(user) {
    var _a2, _b;
    this.viewing.set(null);
    this.editName.set(user.name);
    this.editPhone.set(user.phone);
    this.editAge.set(user.age ? String(user.age) : "");
    this.editSex.set((_a2 = user.sex) != null ? _a2 : "");
    this.editOrgIds.set([...(_b = user.orgIds) != null ? _b : []]);
    this.editError.set("");
    this.editing.set(user);
  }
  saveEdit(user) {
    if (!this.editSex()) {
      this.snackbar.error(this.locale.tNow("errors.technician.sex"));
      return;
    }
    const result = this.store.actions.updateTechnician(user.id, {
      name: this.editName(),
      phone: this.editPhone(),
      sex: this.editSex() || "F",
      age: Number(this.editAge().trim()),
      orgIds: this.editOrgIds()
    });
    if (!result.ok) {
      if (result.error === this.locale.tNow("errors.technician.name")) this.editError.set(result.error);
      else this.snackbar.error(result.error);
      return;
    }
    this.editing.set(null);
    this.snackbar.success(this.t()("techniciens.edit.saved", { name: this.editName().trim() }));
  }
  /** Coopérative dont on retire le technicien : celle de la session (la seule d'un gestionnaire). */
  scoopToLeave(user) {
    var _a2;
    const visible = new Set(this.visibleScoopIds());
    return (_a2 = this.scoopIdsOf(user).find((id) => visible.has(id))) != null ? _a2 : null;
  }
  isOnlyHere(user) {
    return this.scoopIdsOf(user).length <= 1;
  }
  confirmRemove(user) {
    const scoopId = this.scoopToLeave(user);
    if (!scoopId) return;
    const result = this.store.actions.removeTechnicianFromScoop(user.id, scoopId);
    this.removing.set(null);
    if (!result.ok) {
      this.snackbar.error(this.locale.tNow(result.error));
      return;
    }
    this.snackbar.success(this.t()("techniciens.removed", { name: user.name }));
  }
}, _a.\u0275fac = function TechniciensPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-techniciens-page"]],
  decls: 34,
  vars: 26,
  consts: [
    [
      "perm",
      "technician.invite",
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
      "apartment",
      1,
      "min-w-[220px]",
      3,
      "label",
      "options",
      "value"
    ],
    [
      "leadingIcon",
      "hub",
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
      3,
      "openChange",
      "open",
      "scoopId"
    ],
    [
      3,
      "viewChange",
      "view"
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
      "tone",
      "danger",
      "icon",
      "lock",
      3,
      "open",
      "title",
      "description",
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
      "type",
      "button",
      "role",
      "radio",
      3,
      "click"
    ],
    [1, "n"],
    [
      "leadingIcon",
      "apartment",
      1,
      "min-w-[220px]",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      "leadingIcon",
      "hub",
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
      "min-w-[900px]"
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
    [
      1,
      "max-w-56",
      "font-medium"
    ],
    [
      1,
      "max-w-64",
      "font-medium"
    ],
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
      "lock",
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
      "agriculture",
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
    [
      1,
      "facts",
      "pb-6"
    ],
    [1, "wide"],
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
      "space-y-5",
      "pb-6"
    ],
    [
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      "preset",
      "phone",
      3,
      "valueChange",
      "label",
      "value"
    ],
    [
      "preset",
      "age",
      3,
      "valueChange",
      "label",
      "hint",
      "value"
    ],
    [1, "lbl"],
    [
      "role",
      "radiogroup",
      1,
      "seg",
      "mt-2"
    ],
    [
      "name",
      "check",
      3,
      "size"
    ],
    [
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      1,
      "text-[13px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "tone",
      "danger",
      "icon",
      "lock",
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
      "btn-danger",
      3,
      "click"
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
    ]
  ],
  template: function TechniciensPage_Template(rf, ctx) {
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
      __listener("click", function TechniciensPage_Template_button_click_9_listener() {
        return ctx.addOpen.set(true);
      });
      __text(10);
      __elementStart(11, "span", 7);
      __element(12, "ui-icon", 8);
      __elementEnd()()();
      __element(13, "ui-stat-cards", 9);
      __elementStart(14, "div", 10)(15, "label", 11);
      __element(16, "ui-icon", 12);
      __elementStart(17, "input", 13);
      __listener("input", function TechniciensPage_Template_input_input_17_listener($event) {
        return ctx.query.set($event.target.value);
      });
      __elementEnd()();
      __elementStart(18, "div", 14);
      __repeaterCreate(19, TechniciensPage_For_20_Template, 4, 7, "button", 15, _forTrack0);
      __elementEnd();
      __conditionalCreate(21, TechniciensPage_Conditional_21_Template, 1, 3, "ui-select", 16);
      __conditionalCreate(22, TechniciensPage_Conditional_22_Template, 1, 3, "ui-select", 17);
      __elementEnd();
      __elementStart(23, "p", 18);
      __text(24);
      __elementEnd();
      __elementStart(25, "section", 19);
      __conditionalCreate(26, TechniciensPage_Conditional_26_Template, 18, 6)(27, TechniciensPage_Conditional_27_Template, 7, 3, "div", 20);
      __elementEnd();
      __elementStart(28, "app-technician-dialog", 21);
      __twoWayListener("openChange", function TechniciensPage_Template_app_technician_dialog_openChange_28_listener($event) {
        __twoWayBindingSet(ctx.addOpen, $event) || (ctx.addOpen = $event);
        return $event;
      });
      __elementEnd();
      __elementStart(29, "app-technician-code-dialog", 22);
      __twoWayListener("viewChange", function TechniciensPage_Template_app_technician_code_dialog_viewChange_29_listener($event) {
        __twoWayBindingSet(ctx.codeView, $event) || (ctx.codeView = $event);
        return $event;
      });
      __elementEnd();
      __conditionalCreate(30, TechniciensPage_Conditional_30_Template, 41, 24, "ui-modal", 23);
      __conditionalCreate(31, TechniciensPage_Conditional_31_Template, 20, 29, "ui-modal", 24);
      __conditionalCreate(32, TechniciensPage_Conditional_32_Template, 5, 11, "ui-modal", 25);
      __conditionalCreate(33, TechniciensPage_Conditional_33_Template, 5, 11, "ui-modal", 26);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_20_0;
      let tmp_21_0;
      let tmp_22_0;
      let tmp_23_0;
      __property("area", ctx.t()("techniciens.area"));
      __advance(4);
      __textInterpolate(ctx.t()("techniciens.eyebrow"));
      __advance(2);
      __textInterpolate(ctx.t()("techniciens.title"));
      __advance(2);
      __textInterpolate(ctx.t()("techniciens.description"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("techniciens.add"));
      __advance(2);
      __property("size", 20);
      __advance();
      __property("stats", ctx.stats());
      __advance(3);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("techniciens.search.placeholder"))("value", ctx.query());
      __attribute("aria-label", ctx.t()("techniciens.search.aria"));
      __advance();
      __attribute("aria-label", ctx.t()("techniciens.col.state"));
      __advance();
      __repeater(ctx.stateFilters());
      __advance(2);
      __conditional(ctx.scoopFilterOptions().length > 2 ? 21 : -1);
      __advance();
      __conditional(ctx.orgFilterOptions().length > 2 ? 22 : -1);
      __advance(2);
      __textInterpolate(ctx.t()("techniciens.count", __pureFunction2(23, _c0, ctx.shown().length, ctx.rows().length)));
      __advance(2);
      __conditional(ctx.shown().length ? 26 : 27);
      __advance(2);
      __twoWayProperty("open", ctx.addOpen);
      __property("scoopId", ctx.defaultScoopId());
      __advance();
      __twoWayProperty("view", ctx.codeView);
      __advance();
      __conditional((tmp_20_0 = ctx.viewedRow()) ? 30 : -1, tmp_20_0);
      __advance();
      __conditional((tmp_21_0 = ctx.editing()) ? 31 : -1, tmp_21_0);
      __advance();
      __conditional((tmp_22_0 = ctx.renewing()) ? 32 : -1, tmp_22_0);
      __advance();
      __conditional((tmp_23_0 = ctx.removing()) ? 33 : -1, tmp_23_0);
    }
  },
  dependencies: [
    AppShellComponent,
    CheckListComponent,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    SelectComponent,
    StatCardsComponent,
    TechnicianCodeDialogComponent,
    TechnicianDialogComponent,
    TextFieldComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".facts[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 14px 20px;\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n      .facts[_ngcontent-%COMP%]   .wide[_ngcontent-%COMP%] {\n        grid-column: 1 / -1;\n      }\n      .facts[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n        font-size: 12px;\n        font-weight: 700;\n        letter-spacing: 0.06em;\n        text-transform: uppercase;\n        color: var(--%NS%v2-gris-texte);\n      }\n      .facts[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n        margin-top: 2px;\n        font-size: 15px;\n        font-weight: 700;\n        word-break: break-word;\n      }"]
}), _a);

export { TechniciensPage as default };
//# sourceMappingURL=techniciens.page-D-qrYlHV.mjs.map

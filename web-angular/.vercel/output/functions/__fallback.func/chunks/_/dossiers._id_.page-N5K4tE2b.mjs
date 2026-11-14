import { i as inject, A as ActivatedRoute, F as signal, c as computed, e as effect, ɵ as __defineComponent, d as RouterLink, f as __elementStart, j as __conditionalCreate, h as __elementEnd, n as __property, o as __advance, s as __conditional, L as __getCurrentView, m as __repeaterCreate, b as __element, g as __text, H as __listener, w as __nextContext, r as __pureFunction1, u as __attribute, v as __repeater, q as __textInterpolate1, p as __textInterpolate, z as __classProp, x as __pureFunction2, M as __pureFunction0, N as __textInterpolate2, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { K as KIND_KEY } from './dossier-labels-BFr3d5AP.mjs';
import { L as LocaleService, p as maskPhone, D as maskCni, f as fmtDateTime, R as REFUSAL_REASONS, b as scopedDossiers, E as decisionCheck, h as fmtDate, F as DOCUMENT_KINDS } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { i as initialsOf } from './v2-page.styles-DN_FuKKd.mjs';
import { m as DetailHeroComponent, l as FileSlotsComponent, M as ModalComponent, S as SelectComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';
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

var _a;
var _c0 = (a0) => ({
  label: a0,
  link: "/dashboard/dossiers"
});
var _c1 = (a0) => ({ id: a0 });
var _c2 = (a0) => ({ name: a0 });
var _c3 = (a0, a1) => ({
  name: a0,
  code: a1
});
var _c4 = (a0) => ({ age: a0 });
var _c5 = () => ({ mb: 5 });
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.at + $item.action;
var _forTrack2 = ($index, $item) => $item.id;
function DossierDetailPage_Conditional_1_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 27);
  if (rf & 2) __property("size", 14);
}
function DossierDetailPage_Conditional_1_For_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const \u0275$index_8_r2 = __nextContext().$index;
    __textInterpolate1(" ", \u0275$index_8_r2 + 1, " ");
  }
}
function DossierDetailPage_Conditional_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 38)(1, "span", 39);
    __conditionalCreate(2, DossierDetailPage_Conditional_1_For_3_Conditional_2_Template, 1, 1, "ui-icon", 27)(3, DossierDetailPage_Conditional_1_For_3_Conditional_3_Template, 1, 1);
    __elementEnd();
    __elementStart(4, "span", 40);
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const stepItem_r3 = ctx.$implicit;
    const \u0275$index_8_r2 = ctx.$index;
    const ctx_r3 = __nextContext(2);
    __classProp("done", \u0275$index_8_r2 < ctx_r3.step())("now", \u0275$index_8_r2 === ctx_r3.step());
    __attribute("aria-current", \u0275$index_8_r2 === ctx_r3.step() ? "step" : null);
    __advance(2);
    __conditional(\u0275$index_8_r2 < ctx_r3.step() ? 2 : 3);
    __advance(3);
    __textInterpolate(stepItem_r3.label);
  }
}
function DossierDetailPage_Conditional_1_Conditional_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "button", 44);
    __listener("click", function DossierDetailPage_Conditional_1_Conditional_4_Conditional_7_Template_button_click_0_listener() {
      __restoreView(_r6);
      const ctx_r3 = __nextContext(3);
      return __resetView(ctx_r3.startReview());
    });
    __element(1, "ui-icon", 52);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(3);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("dossiers.detail.decision.startReview"), " ");
  }
}
function DossierDetailPage_Conditional_1_Conditional_4_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 51);
    __element(1, "ui-icon", 53);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(3);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.decisionError(), " ");
  }
}
function DossierDetailPage_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "section", 5)(1, "div", 9)(2, "h2")(3, "span", 10);
    __element(4, "ui-icon", 41);
    __elementEnd();
    __text(5);
    __elementEnd();
    __elementStart(6, "div", 42);
    __conditionalCreate(7, DossierDetailPage_Conditional_1_Conditional_4_Conditional_7_Template, 3, 2, "button", 43);
    __elementStart(8, "button", 44);
    __listener("click", function DossierDetailPage_Conditional_1_Conditional_4_Template_button_click_8_listener() {
      __restoreView(_r5);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.openComplement());
    });
    __element(9, "ui-icon", 45);
    __text(10);
    __elementEnd();
    __elementStart(11, "button", 46);
    __listener("click", function DossierDetailPage_Conditional_1_Conditional_4_Template_button_click_11_listener() {
      __restoreView(_r5);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.openRefuse());
    });
    __element(12, "ui-icon", 47);
    __text(13);
    __elementEnd();
    __elementStart(14, "button", 48);
    __listener("click", function DossierDetailPage_Conditional_1_Conditional_4_Template_button_click_14_listener() {
      __restoreView(_r5);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.dialog.set("approve"));
    });
    __text(15);
    __elementStart(16, "span", 49);
    __element(17, "ui-icon", 27);
    __elementEnd()()()();
    __elementStart(18, "p", 50);
    __text(19);
    __elementEnd();
    __conditionalCreate(20, DossierDetailPage_Conditional_1_Conditional_4_Conditional_20_Template, 3, 2, "p", 51);
    __elementEnd();
  }
  if (rf & 2) {
    const current_r7 = __nextContext();
    const ctx_r3 = __nextContext();
    __advance(4);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("dossiers.v2.decision.title"), " ");
    __advance(2);
    __conditional(current_r7.status === "soumis" ? 7 : -1);
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("dossiers.detail.decision.askComplement"), " ");
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("dossiers.detail.decision.refuse"), " ");
    __advance();
    __property("disabled", !ctx_r3.decisionOk());
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("dossiers.detail.decision.approve"));
    __advance(2);
    __property("size", 18);
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("dossiers.v2.decision.hint"), " ");
    __advance();
    __conditional(!ctx_r3.decisionOk() && ctx_r3.decisionError() ? 20 : -1);
  }
}
function DossierDetailPage_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 6);
    __element(1, "ui-icon", 53);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const dupId_r8 = ctx;
    const ctx_r3 = __nextContext(2);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("dossiers.detail.approve.existing", __pureFunction2(2, _c3, ctx_r3.producerLabel(dupId_r8), dupId_r8)), " ");
  }
}
function DossierDetailPage_Conditional_1_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = __getCurrentView();
    __elementStart(0, "div", 12)(1, "ui-text-field", 54);
    __listener("valueChange", function DossierDetailPage_Conditional_1_Conditional_13_Template_ui_text_field_valueChange_1_listener($event) {
      __restoreView(_r9);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.editFirst = $event);
    });
    __elementEnd();
    __elementStart(2, "ui-text-field", 55);
    __listener("valueChange", function DossierDetailPage_Conditional_1_Conditional_13_Template_ui_text_field_valueChange_2_listener($event) {
      __restoreView(_r9);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.editLast = $event);
    });
    __elementEnd();
    __elementStart(3, "div")(4, "p", 33);
    __text(5);
    __elementEnd();
    __elementStart(6, "div", 56)(7, "button", 57);
    __listener("click", function DossierDetailPage_Conditional_1_Conditional_13_Template_button_click_7_listener() {
      __restoreView(_r9);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.editSex = "F");
    });
    __text(8);
    __elementEnd();
    __elementStart(9, "button", 57);
    __listener("click", function DossierDetailPage_Conditional_1_Conditional_13_Template_button_click_9_listener() {
      __restoreView(_r9);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.editSex = "H");
    });
    __text(10);
    __elementEnd()()();
    __elementStart(11, "ui-text-field", 58);
    __listener("valueChange", function DossierDetailPage_Conditional_1_Conditional_13_Template_ui_text_field_valueChange_11_listener($event) {
      __restoreView(_r9);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.editAge = $event);
    });
    __elementEnd();
    __elementStart(12, "ui-text-field", 59);
    __listener("valueChange", function DossierDetailPage_Conditional_1_Conditional_13_Template_ui_text_field_valueChange_12_listener($event) {
      __restoreView(_r9);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.editPhone = $event);
    });
    __elementEnd();
    __elementStart(13, "ui-text-field", 60);
    __listener("valueChange", function DossierDetailPage_Conditional_1_Conditional_13_Template_ui_text_field_valueChange_13_listener($event) {
      __restoreView(_r9);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.editCni = $event);
    });
    __elementEnd();
    __elementStart(14, "ui-text-field", 61);
    __listener("valueChange", function DossierDetailPage_Conditional_1_Conditional_13_Template_ui_text_field_valueChange_14_listener($event) {
      __restoreView(_r9);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.editVillage = $event);
    });
    __elementEnd();
    __elementStart(15, "div")(16, "p", 33);
    __text(17);
    __elementEnd();
    __elementStart(18, "ui-select", 62);
    __listener("valueChange", function DossierDetailPage_Conditional_1_Conditional_13_Template_ui_select_valueChange_18_listener($event) {
      __restoreView(_r9);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.editOrgId = $event);
    });
    __elementEnd()();
    __elementStart(19, "label", 63)(20, "input", 23);
    __listener("change", function DossierDetailPage_Conditional_1_Conditional_13_Template_input_change_20_listener($event) {
      __restoreView(_r9);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.editCreateMember = $event.target.checked);
    });
    __elementEnd();
    __elementStart(21, "span");
    __text(22);
    __elementEnd()();
    __elementStart(23, "div", 64)(24, "button", 65);
    __listener("click", function DossierDetailPage_Conditional_1_Conditional_13_Template_button_click_24_listener() {
      __restoreView(_r9);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.saveDraft());
    });
    __text(25);
    __elementEnd();
    __elementStart(26, "button", 66);
    __listener("click", function DossierDetailPage_Conditional_1_Conditional_13_Template_button_click_26_listener() {
      __restoreView(_r9);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.saveAndSubmit());
    });
    __text(27);
    __elementStart(28, "span", 26);
    __element(29, "ui-icon", 31);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __property("label", ctx_r3.t()("dossiers.detail.edit.firstName"))("value", ctx_r3.editFirst);
    __advance();
    __property("label", ctx_r3.t()("dossiers.detail.edit.lastName"))("value", ctx_r3.editLast);
    __advance(3);
    __textInterpolate(ctx_r3.t()("dossiers.detail.info.sex"));
    __advance();
    __attribute("aria-label", ctx_r3.t()("dossiers.detail.info.sex"));
    __advance();
    __classProp("on", ctx_r3.editSex === "F");
    __attribute("aria-checked", ctx_r3.editSex === "F");
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("dossiers.detail.info.female"), " ");
    __advance();
    __classProp("on", ctx_r3.editSex === "H");
    __attribute("aria-checked", ctx_r3.editSex === "H");
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("dossiers.detail.info.male"), " ");
    __advance();
    __property("label", ctx_r3.t()("dossiers.detail.info.age"))("value", ctx_r3.editAge);
    __advance();
    __property("label", ctx_r3.t()("dossiers.detail.info.phone"))("value", ctx_r3.editPhone);
    __advance();
    __property("label", ctx_r3.t()("dossiers.detail.info.cni"))("hint", ctx_r3.t()("dossiers.detail.edit.cniHint"))("value", ctx_r3.editCni);
    __advance();
    __property("label", ctx_r3.t()("dossiers.detail.info.village"))("value", ctx_r3.editVillage);
    __advance(3);
    __textInterpolate(ctx_r3.t()("dossiers.detail.info.org"));
    __advance();
    __property("label", ctx_r3.t()("dossiers.detail.info.org"))("options", ctx_r3.orgOptions())("value", ctx_r3.editOrgId);
    __advance(2);
    __property("checked", ctx_r3.editCreateMember);
    __advance(2);
    __textInterpolate(ctx_r3.t()("dossiers.detail.edit.createMember"));
    __advance(2);
    __property("disabled", !ctx_r3.dirty());
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("dossiers.detail.edit.saveDraft"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("dossiers.detail.edit.submit"));
    __advance(2);
    __property("size", 18);
  }
}
function DossierDetailPage_Conditional_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "dl", 13)(1, "div", 67)(2, "span", 68);
    __element(3, "ui-icon", 11);
    __elementEnd();
    __elementStart(4, "div")(5, "dt");
    __text(6);
    __elementEnd();
    __elementStart(7, "dd");
    __text(8);
    __elementEnd()()();
    __elementStart(9, "div", 67)(10, "span", 68);
    __element(11, "ui-icon", 69);
    __elementEnd();
    __elementStart(12, "div")(13, "dt");
    __text(14);
    __elementEnd();
    __elementStart(15, "dd");
    __text(16);
    __elementEnd()()();
    __elementStart(17, "div", 67)(18, "span", 68);
    __element(19, "ui-icon", 70);
    __elementEnd();
    __elementStart(20, "div")(21, "dt");
    __text(22);
    __elementEnd();
    __elementStart(23, "dd", 71);
    __text(24);
    __elementEnd()()();
    __elementStart(25, "div", 67)(26, "span", 68);
    __element(27, "ui-icon", 72);
    __elementEnd();
    __elementStart(28, "div")(29, "dt");
    __text(30);
    __elementEnd();
    __elementStart(31, "dd", 71);
    __text(32);
    __elementEnd()()();
    __elementStart(33, "div", 67)(34, "span", 68);
    __element(35, "ui-icon", 73);
    __elementEnd();
    __elementStart(36, "div")(37, "dt");
    __text(38);
    __elementEnd();
    __elementStart(39, "dd");
    __text(40);
    __elementEnd()()();
    __elementStart(41, "div", 67)(42, "span", 68);
    __element(43, "ui-icon", 74);
    __elementEnd();
    __elementStart(44, "div")(45, "dt");
    __text(46);
    __elementEnd();
    __elementStart(47, "dd");
    __text(48);
    __elementEnd()()();
    __elementStart(49, "div", 67)(50, "span", 68);
    __element(51, "ui-icon", 75);
    __elementEnd();
    __elementStart(52, "div")(53, "dt");
    __text(54);
    __elementEnd();
    __elementStart(55, "dd");
    __text(56);
    __elementEnd()()();
    __elementStart(57, "div", 67)(58, "span", 68);
    __element(59, "ui-icon", 76);
    __elementEnd();
    __elementStart(60, "div")(61, "dt");
    __text(62);
    __elementEnd();
    __elementStart(63, "dd");
    __text(64);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const current_r7 = __nextContext();
    const ctx_r3 = __nextContext();
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r3.t()("dossiers.detail.info.sex"));
    __advance(2);
    __textInterpolate1(" ", current_r7.draft.sex === "F" ? ctx_r3.t()("dossiers.detail.info.female") : ctx_r3.t()("dossiers.detail.info.male"), " ");
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r3.t()("dossiers.detail.info.age"));
    __advance();
    __classProp("zero", current_r7.draft.age === null);
    __advance();
    __textInterpolate1(" ", current_r7.draft.age === null ? "\u2014" : ctx_r3.t()("dossiers.detail.info.ageYears", __pureFunction1(32, _c4, current_r7.draft.age)), " ");
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r3.t()("dossiers.detail.info.phone"));
    __advance();
    __classProp("zero", !current_r7.draft.phone);
    __advance();
    __textInterpolate1(" ", ctx_r3.store.phone(current_r7.draft.phone) || "\u2014", " ");
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r3.t()("dossiers.detail.info.cni"));
    __advance();
    __classProp("zero", !current_r7.draft.cni);
    __advance();
    __textInterpolate1(" ", current_r7.draft.cni ? ctx_r3.maskCni(current_r7.draft.cni) : "\u2014", " ");
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r3.t()("dossiers.detail.info.village"));
    __advance();
    __classProp("zero", !current_r7.draft.village);
    __advance();
    __textInterpolate1(" ", current_r7.draft.village || "\u2014", " ");
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r3.t()("dossiers.detail.info.org"));
    __advance(2);
    __textInterpolate(ctx_r3.orgName(current_r7.draft.orgId));
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r3.t()("dossiers.detail.info.member"));
    __advance(2);
    __textInterpolate1(" ", current_r7.draft.createMember ? ctx_r3.t()("dossiers.detail.info.willBeMember") : ctx_r3.t()("dossiers.detail.info.producerOnly"), " ");
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r3.t()("reunions.detail.scoop"));
    __advance(2);
    __textInterpolate(ctx_r3.scoopName(current_r7.scoopId));
  }
}
function DossierDetailPage_Conditional_1_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "div", 17)(1, "ui-file-slots", 77);
    __listener("added", function DossierDetailPage_Conditional_1_Conditional_24_Template_ui_file_slots_added_1_listener($event) {
      __restoreView(_r10);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.addFiles($event.slot, $event.files));
    })("removed", function DossierDetailPage_Conditional_1_Conditional_24_Template_ui_file_slots_removed_1_listener($event) {
      __restoreView(_r10);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.removeDoc($event));
    });
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __property("slots", ctx_r3.slots())("files", ctx_r3.slotFiles())("hint", ctx_r3.t()("dossiers.v2.piecesHint", __pureFunction0(3, _c5)));
  }
}
function DossierDetailPage_Conditional_1_Conditional_25_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 84);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(4);
    __advance();
    __textInterpolate(ctx_r3.t()("documents.sensitive.pill"));
  }
}
function DossierDetailPage_Conditional_1_Conditional_25_For_2_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    __elementStart(0, "li", 78)(1, "span", 10);
    __element(2, "ui-icon", 80);
    __elementEnd();
    __elementStart(3, "span", 81)(4, "span", 82);
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 83);
    __text(7);
    __elementEnd()();
    __conditionalCreate(8, DossierDetailPage_Conditional_1_Conditional_25_For_2_Conditional_8_Template, 2, 1, "span", 84);
    __elementEnd();
  }
  if (rf & 2) {
    const doc_r11 = ctx.$implicit;
    const ctx_r3 = __nextContext(3);
    __advance(2);
    __property("name", ctx_r3.kindIcon(doc_r11.kind))("size", 18);
    __advance(3);
    __textInterpolate(doc_r11.name);
    __advance(2);
    __textInterpolate2("", ctx_r3.t()((_a2 = ctx_r3.kindKey[doc_r11.kind]) != null ? _a2 : "dossiers.kind.autre"), " \xB7 ", doc_r11.sizeKb, " Ko");
    __advance();
    __conditional(doc_r11.sensitive ? 8 : -1);
  }
}
function DossierDetailPage_Conditional_1_Conditional_25_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 79);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("dossiers.detail.pieces.none"), " ");
  }
}
function DossierDetailPage_Conditional_1_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ul");
    __repeaterCreate(1, DossierDetailPage_Conditional_1_Conditional_25_For_2_Template, 9, 6, "li", 78, _forTrack2, false, DossierDetailPage_Conditional_1_Conditional_25_ForEmpty_3_Template, 2, 1, "li", 79);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __repeater(ctx_r3.docs());
  }
}
function DossierDetailPage_Conditional_1_For_36_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 88);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const event_r12 = __nextContext().$implicit;
    __advance();
    __textInterpolate1("\xAB ", event_r12.comment, " \xBB");
  }
}
function DossierDetailPage_Conditional_1_For_36_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li");
    __element(1, "span", 85);
    __elementStart(2, "span", 86)(3, "span", 87);
    __text(4);
    __elementEnd();
    __conditionalCreate(5, DossierDetailPage_Conditional_1_For_36_Conditional_5_Template, 2, 1, "span", 88);
    __elementStart(6, "span", 89);
    __text(7);
    __elementEnd()()();
  }
  if (rf & 2) {
    const event_r12 = ctx.$implicit;
    const ctx_r3 = __nextContext(2);
    __advance(4);
    __textInterpolate(ctx_r3.t()(ctx_r3.eventKey(event_r12.action)));
    __advance();
    __conditional(event_r12.comment ? 5 : -1);
    __advance(2);
    __textInterpolate2("", ctx_r3.fmtDateTime(event_r12.at), " \xB7 ", event_r12.by);
  }
}
function DossierDetailPage_Conditional_1_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "p", 90);
    __element(1, "ui-icon", 53);
    __text(2);
    __elementEnd();
    __elementStart(3, "div", 91)(4, "button", 57);
    __listener("click", function DossierDetailPage_Conditional_1_Conditional_39_Template_button_click_4_listener() {
      __restoreView(_r13);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.duplicateChoice = "li\xE9");
    });
    __text(5);
    __elementEnd();
    __elementStart(6, "button", 57);
    __listener("click", function DossierDetailPage_Conditional_1_Conditional_39_Template_button_click_6_listener() {
      __restoreView(_r13);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.duplicateChoice = "distinct");
    });
    __text(7);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("dossiers.detail.approve.descriptionDuplicate"), " ");
    __advance(2);
    __classProp("on", ctx_r3.duplicateChoice === "li\xE9");
    __attribute("aria-checked", ctx_r3.duplicateChoice === "li\xE9");
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("dossiers.detail.approve.same"), " ");
    __advance();
    __classProp("on", ctx_r3.duplicateChoice === "distinct");
    __attribute("aria-checked", ctx_r3.duplicateChoice === "distinct");
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("dossiers.detail.approve.other"), " ");
  }
}
function DossierDetailPage_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "ui-detail-hero", 2)(1, "div", 3);
    __repeaterCreate(2, DossierDetailPage_Conditional_1_For_3_Template, 6, 7, "div", 4, _forTrack0);
    __elementEnd()();
    __conditionalCreate(4, DossierDetailPage_Conditional_1_Conditional_4_Template, 21, 12, "section", 5);
    __conditionalCreate(5, DossierDetailPage_Conditional_1_Conditional_5_Template, 3, 5, "p", 6);
    __elementStart(6, "div", 7)(7, "section", 8)(8, "div", 9)(9, "h2")(10, "span", 10);
    __element(11, "ui-icon", 11);
    __elementEnd();
    __text(12);
    __elementEnd()();
    __conditionalCreate(13, DossierDetailPage_Conditional_1_Conditional_13_Template, 30, 33, "div", 12)(14, DossierDetailPage_Conditional_1_Conditional_14_Template, 65, 34, "dl", 13);
    __elementEnd();
    __elementStart(15, "div", 14)(16, "section", 8)(17, "div", 9)(18, "h2")(19, "span", 10);
    __element(20, "ui-icon", 15);
    __elementEnd();
    __text(21);
    __elementStart(22, "span", 16);
    __text(23);
    __elementEnd()()();
    __conditionalCreate(24, DossierDetailPage_Conditional_1_Conditional_24_Template, 2, 4, "div", 17)(25, DossierDetailPage_Conditional_1_Conditional_25_Template, 4, 1, "ul");
    __elementEnd();
    __elementStart(26, "section", 8)(27, "div", 9)(28, "h2")(29, "span", 10);
    __element(30, "ui-icon", 18);
    __elementEnd();
    __text(31);
    __elementStart(32, "span", 16);
    __text(33);
    __elementEnd()()();
    __elementStart(34, "ol", 19);
    __repeaterCreate(35, DossierDetailPage_Conditional_1_For_36_Template, 8, 4, "li", null, _forTrack1);
    __elementEnd()()()();
    __elementStart(37, "ui-modal", 20);
    __listener("closed", function DossierDetailPage_Conditional_1_Template_ui_modal_closed_37_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.dialog.set(null));
    });
    __elementStart(38, "div", 21);
    __conditionalCreate(39, DossierDetailPage_Conditional_1_Conditional_39_Template, 8, 10);
    __elementStart(40, "label", 22)(41, "input", 23);
    __listener("change", function DossierDetailPage_Conditional_1_Template_input_change_41_listener($event) {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.createMember = $event.target.checked);
    });
    __elementEnd();
    __elementStart(42, "span");
    __text(43);
    __elementEnd()()();
    __elementStart(44, "button", 24);
    __listener("click", function DossierDetailPage_Conditional_1_Template_button_click_44_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.dialog.set(null));
    });
    __text(45);
    __elementEnd();
    __elementStart(46, "button", 25);
    __listener("click", function DossierDetailPage_Conditional_1_Template_button_click_46_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.approve());
    });
    __text(47);
    __elementStart(48, "span", 26);
    __element(49, "ui-icon", 27);
    __elementEnd()()();
    __elementStart(50, "ui-modal", 28);
    __listener("closed", function DossierDetailPage_Conditional_1_Template_ui_modal_closed_50_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.dialog.set(null));
    });
    __elementStart(51, "label", 29);
    __text(52);
    __elementEnd();
    __elementStart(53, "textarea", 30);
    __listener("input", function DossierDetailPage_Conditional_1_Template_textarea_input_53_listener($event) {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.comment = $event.target.value);
    });
    __elementEnd();
    __elementStart(54, "button", 24);
    __listener("click", function DossierDetailPage_Conditional_1_Template_button_click_54_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.dialog.set(null));
    });
    __text(55);
    __elementEnd();
    __elementStart(56, "button", 25);
    __listener("click", function DossierDetailPage_Conditional_1_Template_button_click_56_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.complement());
    });
    __text(57);
    __elementStart(58, "span", 26);
    __element(59, "ui-icon", 31);
    __elementEnd()()();
    __elementStart(60, "ui-modal", 32);
    __listener("closed", function DossierDetailPage_Conditional_1_Template_ui_modal_closed_60_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.dialog.set(null));
    });
    __elementStart(61, "div", 21)(62, "div")(63, "p", 33);
    __text(64);
    __elementEnd();
    __elementStart(65, "ui-select", 34);
    __listener("valueChange", function DossierDetailPage_Conditional_1_Template_ui_select_valueChange_65_listener($event) {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.refuseReason = $event);
    });
    __elementEnd()();
    __elementStart(66, "div")(67, "label", 35);
    __text(68);
    __elementEnd();
    __elementStart(69, "textarea", 36);
    __listener("input", function DossierDetailPage_Conditional_1_Template_textarea_input_69_listener($event) {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.comment = $event.target.value);
    });
    __elementEnd()()();
    __elementStart(70, "button", 24);
    __listener("click", function DossierDetailPage_Conditional_1_Template_button_click_70_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.dialog.set(null));
    });
    __text(71);
    __elementEnd();
    __elementStart(72, "button", 37);
    __listener("click", function DossierDetailPage_Conditional_1_Template_button_click_72_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.refuse());
    });
    __text(73);
    __elementEnd()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const current_r7 = ctx;
    const ctx_r3 = __nextContext();
    __property("crumb", __pureFunction1(56, _c0, ctx_r3.t()("dossiers.title")))("title", ctx_r3.name(current_r7))("eyebrow", ctx_r3.t()("dossiers.detail.eyebrow", __pureFunction1(58, _c1, current_r7.id)))("mono", ctx_r3.initials(ctx_r3.name(current_r7)))("badges", ctx_r3.heroBadges())("meta", ctx_r3.heroMeta())("backLabel", ctx_r3.t()("dossiers.detail.back"));
    __advance();
    __attribute("aria-label", ctx_r3.t()("dossiers.v2.steps.aria"));
    __advance();
    __repeater(ctx_r3.steps());
    __advance(2);
    __conditional(ctx_r3.canReview() && (current_r7.status === "soumis" || current_r7.status === "en examen") ? 4 : -1);
    __advance();
    __conditional((tmp_12_0 = current_r7.possibleDuplicateOf) ? 5 : -1, tmp_12_0);
    __advance(6);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("dossiers.detail.info.title"), " ");
    __advance();
    __conditional(ctx_r3.editable() ? 13 : 14);
    __advance(7);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r3.t()("dossiers.detail.pieces.title"));
    __advance(2);
    __textInterpolate(ctx_r3.docs().length);
    __advance();
    __conditional(ctx_r3.editable() ? 24 : 25);
    __advance(6);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r3.t()("dossiers.v2.history"));
    __advance(2);
    __textInterpolate(current_r7.history.length);
    __advance(2);
    __repeater(ctx_r3.history());
    __advance(2);
    __property("open", ctx_r3.dialog() === "approve")("title", ctx_r3.t()("dossiers.detail.approve.title"))("description", ctx_r3.t()("dossiers.detail.approve.description", __pureFunction1(60, _c2, current_r7.draft.firstName)))("width", 560)("closeLabel", ctx_r3.t()("common.close"));
    __advance(2);
    __conditional(current_r7.possibleDuplicateOf ? 39 : -1);
    __advance(2);
    __property("checked", ctx_r3.createMember);
    __advance(2);
    __textInterpolate(ctx_r3.t()("dossiers.detail.approve.member"));
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("common.cancel"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("dossiers.detail.approve.submit"));
    __advance(2);
    __property("size", 18);
    __advance();
    __property("open", ctx_r3.dialog() === "complement")("title", ctx_r3.t()("dossiers.detail.complementDialog.title"))("description", ctx_r3.t()("dossiers.detail.complementDialog.description"))("width", 560)("closeLabel", ctx_r3.t()("common.close"));
    __advance(2);
    __textInterpolate(ctx_r3.t()("dossiers.detail.complementDialog.label"));
    __advance();
    __property("placeholder", ctx_r3.t()("dossiers.detail.complementDialog.placeholder"))("value", ctx_r3.comment);
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("common.cancel"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("dossiers.detail.complementDialog.submit"));
    __advance(2);
    __property("size", 18);
    __advance();
    __property("open", ctx_r3.dialog() === "refuse")("title", ctx_r3.t()("dossiers.detail.refuseDialog.title"))("description", ctx_r3.t()("dossiers.detail.refuseDialog.description"))("width", 560)("closeLabel", ctx_r3.t()("common.close"));
    __advance(4);
    __textInterpolate(ctx_r3.t()("dossiers.detail.refuseDialog.reason"));
    __advance();
    __property("label", ctx_r3.t()("dossiers.detail.refuseDialog.reason"))("options", ctx_r3.refusalOptions)("value", ctx_r3.refuseReason);
    __advance(3);
    __textInterpolate(ctx_r3.t()("dossiers.detail.refuseDialog.detail"));
    __advance();
    __property("placeholder", ctx_r3.t()("dossiers.detail.refuseDialog.detailHint"))("value", ctx_r3.comment);
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("common.cancel"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("dossiers.detail.refuseDialog.submit"), " ");
  }
}
function DossierDetailPage_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 1)(1, "span", 92);
    __element(2, "ui-icon", 93);
    __elementEnd();
    __elementStart(3, "h1", 94);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 83);
    __text(6);
    __elementEnd();
    __elementStart(7, "a", 95);
    __text(8);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r3.t()("dossiers.detail.notFound.title"));
    __advance(2);
    __textInterpolate(ctx_r3.t()("dossiers.detail.notFound.text"));
    __advance(2);
    __textInterpolate(ctx_r3.t()("dossiers.detail.back"));
  }
}
var STEP = {
  brouillon: 0,
  "compl\xE9ment demand\xE9": 0,
  soumis: 1,
  "en examen": 2,
  approuv\u00E9: 3,
  refus\u00E9: 3
};
var KIND_ICON = {
  cni: "badge",
  photo: "account_circle",
  justificatif: "description",
  autre: "folder_open"
};
var MAX_KB = 5120;
var DossierDetailPage = (_a = class {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.maskPhone = maskPhone;
    this.maskCni = maskCni;
    this.perms = ["dossier.create", "dossier.review"];
    this.fmtDateTime = fmtDateTime;
    this.initials = initialsOf;
    this.snackbar = inject(SnackbarService);
    this.refusalReasons = REFUSAL_REASONS;
    this.refusalOptions = REFUSAL_REASONS.map((r) => ({
      value: r,
      label: r
    }));
    this.kindKey = KIND_KEY;
    this.dialog = signal(null, ...[]);
    this.comment = "";
    this.createMember = true;
    this.duplicateChoice = "distinct";
    this.refuseReason = "informations incoh\xE9rentes";
    this.editFirst = "";
    this.editLast = "";
    this.editSex = "F";
    this.editAge = "";
    this.editPhone = "";
    this.editCni = "";
    this.editVillage = "";
    this.editOrgId = "";
    this.editCreateMember = true;
    this.id = toSignal(this.route.paramMap.pipe(map((p) => {
      var _a2;
      return (_a2 = p.get("id")) != null ? _a2 : "";
    })), { initialValue: "" });
    this.dossier = computed(() => {
      const id = this.id();
      const s = this.store.state();
      const row = s.dossiers.find((x) => x.id === id);
      if (!row) return void 0;
      return scopedDossiers([row], s.session).length === 1 ? row : void 0;
    }, ...[]);
    this.editable = computed(() => {
      const d = this.dossier();
      return !!d && this.store.can("dossier.create") && (d.status === "brouillon" || d.status === "compl\xE9ment demand\xE9");
    }, ...[]);
    this.docs = computed(() => {
      const d = this.dossier();
      if (!d) return [];
      const ids = new Set(d.documentIds);
      return this.store.state().documents.filter((doc) => ids.has(doc.id));
    }, ...[]);
    this.orgsForScoop = computed(() => {
      const d = this.dossier();
      if (!d) return [];
      return this.store.state().orgs.filter((o) => o.scoopId === d.scoopId);
    }, ...[]);
    this.canReview = computed(() => this.store.can("dossier.review"), ...[]);
    this.who = computed(() => {
      const s = this.store.state().session;
      if (!s) return null;
      return {
        email: s.email,
        role: s.role
      };
    }, ...[]);
    this.decisionOk = computed(() => {
      const d = this.dossier();
      const who = this.who();
      if (!d || !who) return false;
      return decisionCheck(d, who).ok;
    }, ...[]);
    this.decisionError = computed(() => {
      const d = this.dossier();
      const who = this.who();
      if (!d || !who) return "";
      const check = decisionCheck(d, who);
      return check.ok ? "" : check.error;
    }, ...[]);
    this.step = computed(() => {
      const d = this.dossier();
      return d ? STEP[d.status] : 0;
    }, ...[]);
    this.steps = computed(() => {
      const t = this.t();
      const d = this.dossier();
      const last = (d == null ? void 0 : d.status) === "approuv\xE9" || (d == null ? void 0 : d.status) === "refus\xE9" ? t(this.statusKey(d.status)) : t("dossiers.v2.step.decision");
      return [
        {
          key: "b",
          label: (d == null ? void 0 : d.status) === "compl\xE9ment demand\xE9" ? t(this.statusKey(d.status)) : t("dossiers.v2.step.brouillon")
        },
        {
          key: "s",
          label: t("dossiers.v2.step.soumis")
        },
        {
          key: "e",
          label: t("dossiers.v2.step.examen")
        },
        {
          key: "d",
          label: last
        }
      ];
    }, ...[]);
    this.history = computed(() => {
      var _a2, _b;
      return [...(_b = (_a2 = this.dossier()) == null ? void 0 : _a2.history) != null ? _b : []].sort((a, b) => b.at.localeCompare(a.at));
    }, ...[]);
    this.heroBadges = computed(() => {
      const d = this.dossier();
      if (!d) return [];
      const t = this.t();
      return [{
        label: t(this.statusKey(d.status)),
        tone: {
          brouillon: "light",
          soumis: "warn",
          "en examen": "light",
          "compl\xE9ment demand\xE9": "warn",
          approuv\u00E9: "citron",
          refus\u00E9: "danger"
        }[d.status]
      }, ...d.possibleDuplicateOf ? [{
        label: t("dossiers.row.duplicate"),
        tone: "danger",
        icon: "warning"
      }] : []];
    }, ...[]);
    this.heroMeta = computed(() => {
      const d = this.dossier();
      if (!d) return [];
      return [
        {
          icon: "apartment",
          text: this.scoopName(d.scoopId)
        },
        {
          icon: "badge",
          text: d.createdBy
        },
        {
          icon: "calendar_today",
          text: this.t()("dossiers.v2.created", { date: fmtDate(d.createdAt) })
        }
      ];
    }, ...[]);
    this.orgOptions = computed(() => this.orgsForScoop().map((o) => ({
      value: o.id,
      label: o.name,
      ...o.village ? { hint: o.village } : {}
    })).sort((a, b) => a.label.localeCompare(b.label)), ...[]);
    this.slots = computed(() => DOCUMENT_KINDS.map((k) => {
      var _a2;
      return {
        id: k,
        label: this.t()(KIND_KEY[k]),
        hint: this.t()(`dossiers.new.kindHint.${k}`),
        icon: (_a2 = KIND_ICON[k]) != null ? _a2 : "description",
        sensitive: k === "cni"
      };
    }), ...[]);
    this.slotFiles = computed(() => this.docs().map((doc) => ({
      key: doc.id,
      name: doc.name,
      sizeKb: doc.sizeKb,
      slot: doc.kind
    })), ...[]);
    effect(() => {
      const d = this.dossier();
      if (!d) return;
      this.editFirst = d.draft.firstName;
      this.editLast = d.draft.lastName;
      this.editSex = d.draft.sex;
      this.editAge = d.draft.age === null ? "" : String(d.draft.age);
      this.editPhone = d.draft.phone;
      this.editCni = d.draft.cni;
      this.editVillage = d.draft.village;
      this.editOrgId = d.draft.orgId;
      this.editCreateMember = d.draft.createMember;
      this.createMember = d.draft.createMember;
    });
  }
  scoopName(scoopId) {
    var _a2, _b;
    return (_b = (_a2 = this.store.state().scoops.find((c) => c.id === scoopId)) == null ? void 0 : _a2.name) != null ? _b : "";
  }
  orgName(orgId) {
    var _a2, _b;
    return (_b = (_a2 = this.store.state().orgs.find((o) => o.id === orgId)) == null ? void 0 : _a2.name) != null ? _b : this.t()("dossiers.detail.info.notSet");
  }
  producerLabel(id) {
    const p = this.store.state().producers.find((x) => x.id === id);
    return p ? `${p.firstName} ${p.lastName}` : id;
  }
  errMsg(error) {
    return this.locale.tNow(error);
  }
  statusKey(s) {
    return `dossiers.status.${s}`;
  }
  draftFromForm() {
    const age = this.editAge.trim() === "" ? null : Number(this.editAge);
    return {
      firstName: this.editFirst.trim(),
      lastName: this.editLast.trim(),
      sex: this.editSex,
      age: Number.isFinite(age) ? age : null,
      phone: this.editPhone.trim(),
      cni: this.editCni.trim(),
      village: this.editVillage.trim(),
      orgId: this.editOrgId,
      createMember: this.editCreateMember
    };
  }
  dirty() {
    const d = this.dossier();
    if (!d) return false;
    const next = this.draftFromForm();
    return Object.keys(next).some((k) => next[k] !== d.draft[k]);
  }
  patch() {
    const d = this.dossier();
    if (!d) return {};
    const next = this.draftFromForm();
    const out = {};
    for (const k of Object.keys(next)) if (next[k] !== d.draft[k]) out[k] = next[k];
    return out;
  }
  saveDraft() {
    const d = this.dossier();
    if (!d) return;
    const p = this.patch();
    if (!Object.keys(p).length) return;
    const res = this.store.actions.updateDossier(d.id, p);
    this.say(res.ok, res.ok ? this.t()("dossiers.detail.edit.saved") : this.errMsg(res.error));
  }
  saveAndSubmit() {
    const d = this.dossier();
    if (!d) return;
    const p = this.patch();
    if (Object.keys(p).length) {
      const save = this.store.actions.updateDossier(d.id, p);
      if (!save.ok) {
        this.say(false, this.errMsg(save.error));
        return;
      }
    }
    const res = this.store.actions.submitDossier(d.id);
    this.say(res.ok, res.ok ? res.possibleDuplicateOf ? `${this.t()("dossiers.detail.edit.submitted")} \xB7 ${this.t()("dossiers.detail.edit.duplicateFlagged")}` : this.t()("dossiers.detail.edit.submitted") : this.errMsg(res.error));
  }
  /** Pièces déposées dans une case (type = case), 5 Mo au plus chacune. */
  addFiles(kind, files) {
    const d = this.dossier();
    if (!d) return;
    for (const file of files) {
      const sizeKb = Math.ceil(file.size / 1024);
      if (sizeKb > MAX_KB) {
        this.snackbar.error(this.t()("dossiers.new.tooBig", {
          name: file.name,
          mb: MAX_KB / 1024
        }));
        continue;
      }
      const res = this.store.actions.addDocument(d.id, {
        kind,
        name: file.name,
        sizeKb,
        mime: file.type || "application/octet-stream"
      });
      this.say(res.ok, res.ok ? this.t()("dossiers.detail.pieces.added") : this.errMsg(res.error));
    }
  }
  removeDoc(docId) {
    const res = this.store.actions.removeDocument(docId);
    this.say(res.ok, res.ok ? this.t()("dossiers.detail.pieces.removed") : this.errMsg(res.error));
  }
  openComplement() {
    this.comment = "";
    this.dialog.set("complement");
  }
  openRefuse() {
    this.comment = "";
    this.refuseReason = "informations incoh\xE9rentes";
    this.dialog.set("refuse");
  }
  startReview() {
    const d = this.dossier();
    if (!d) return;
    const res = this.store.actions.startReview(d.id);
    this.say(res.ok, res.ok ? this.t()("dossiers.detail.decision.startedToast") : this.errMsg(res.error));
  }
  approve() {
    const d = this.dossier();
    if (!d) return;
    const res = this.store.actions.approveDossier(d.id, {
      ...d.possibleDuplicateOf ? { duplicate: this.duplicateChoice } : {},
      createMember: this.createMember
    });
    this.dialog.set(null);
    this.say(res.ok, res.ok ? res.selfApproved ? this.t()("dossiers.detail.approve.doneSelf") : this.t()("dossiers.detail.approve.done") : this.errMsg(res.error));
  }
  complement() {
    const d = this.dossier();
    if (!d) return;
    const res = this.store.actions.requestComplement(d.id, this.comment);
    this.dialog.set(null);
    this.say(res.ok, res.ok ? this.t()("dossiers.detail.complementDialog.done") : this.errMsg(res.error));
  }
  refuse() {
    const d = this.dossier();
    if (!d) return;
    const res = this.store.actions.refuseDossier(d.id, this.refuseReason, this.comment);
    this.dialog.set(null);
    this.say(res.ok, res.ok ? this.t()("dossiers.detail.refuseDialog.done") : this.errMsg(res.error));
  }
  say(ok, text) {
    if (ok) this.snackbar.success(text);
    else this.snackbar.error(text);
  }
  name(d) {
    return `${d.draft.firstName || this.t()("dossiers.row.noFirstName")} ${d.draft.lastName || this.t()("dossiers.row.noLastName")}`;
  }
  kindIcon(kind) {
    var _a2;
    return (_a2 = KIND_ICON[kind]) != null ? _a2 : "description";
  }
  eventKey(action) {
    return `dossiers.event.${action}`;
  }
}, _a.\u0275fac = function DossierDetailPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-dossier-detail-page"]],
  decls: 3,
  vars: 3,
  consts: [
    [
      3,
      "perm",
      "area"
    ],
    [
      1,
      "card",
      "mx-auto",
      "mt-16",
      "flex",
      "max-w-lg",
      "flex-col",
      "items-center",
      "gap-3",
      "p-10",
      "text-center"
    ],
    [
      3,
      "crumb",
      "title",
      "eyebrow",
      "mono",
      "badges",
      "meta",
      "backLabel"
    ],
    [
      "hero-extra",
      "",
      "role",
      "list",
      1,
      "steps",
      "relative",
      "mt-6"
    ],
    [
      "role",
      "listitem",
      1,
      "step",
      3,
      "done",
      "now"
    ],
    [
      1,
      "sec-card",
      "mt-4"
    ],
    [
      1,
      "notice",
      "mt-4",
      2,
      "background",
      "var(--v2-bloquant-bg)",
      "color",
      "var(--v2-bloquant-fg)"
    ],
    [
      1,
      "grid-main",
      "mt-4"
    ],
    [1, "sec-card"],
    [1, "sec-head"],
    [1, "sec-ico"],
    [
      "name",
      "person",
      3,
      "size"
    ],
    [
      1,
      "grid",
      "gap-5",
      "border-t",
      "p-5",
      "sm:grid-cols-2",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [1, "facts"],
    [
      1,
      "grid",
      "gap-4"
    ],
    [
      "name",
      "upload_file",
      3,
      "size"
    ],
    [1, "n"],
    [
      1,
      "border-t",
      "p-5",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      "name",
      "event_note",
      3,
      "size"
    ],
    [1, "timeline"],
    [
      "icon",
      "task_alt",
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
      "pb-5"
    ],
    [1, "check"],
    [
      "type",
      "checkbox",
      3,
      "change",
      "checked"
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
    [1, "btn-chip"],
    [
      "name",
      "check",
      3,
      "size"
    ],
    [
      "icon",
      "mark_email_unread",
      3,
      "closed",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      "for",
      "complement",
      1,
      "lbl"
    ],
    [
      "id",
      "complement",
      1,
      "area",
      "mb-5",
      "mt-2",
      3,
      "input",
      "placeholder",
      "value"
    ],
    [
      "name",
      "arrow_forward",
      3,
      "size"
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
    [1, "lbl"],
    [
      "leadingIcon",
      "warning",
      1,
      "mt-2",
      "block",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      "for",
      "refuse-detail",
      1,
      "lbl"
    ],
    [
      "id",
      "refuse-detail",
      1,
      "area",
      "mt-2",
      3,
      "input",
      "placeholder",
      "value"
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
      "role",
      "listitem",
      1,
      "step"
    ],
    [1, "b"],
    [1, "truncate"],
    [
      "name",
      "gavel",
      3,
      "size"
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
      2,
      "height",
      "44px"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      2,
      "height",
      "44px",
      3,
      "click"
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
      "btn",
      "btn-ghost",
      "act-danger",
      2,
      "height",
      "44px",
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
      "type",
      "button",
      1,
      "btn",
      "btn-primary",
      2,
      "height",
      "44px",
      3,
      "click",
      "disabled"
    ],
    [
      1,
      "btn-chip",
      2,
      "height",
      "32px",
      "width",
      "32px"
    ],
    [
      1,
      "sub",
      "border-t",
      "px-5",
      "py-3",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      1,
      "notice",
      "mx-5",
      "mb-4",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
    ],
    [
      "name",
      "visibility",
      3,
      "size"
    ],
    [
      "name",
      "warning",
      3,
      "size"
    ],
    [
      "preset",
      "firstName",
      3,
      "valueChange",
      "label",
      "value"
    ],
    [
      "preset",
      "lastName",
      3,
      "valueChange",
      "label",
      "value"
    ],
    [
      "role",
      "radiogroup",
      1,
      "seg",
      "seg-form",
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
    [
      "preset",
      "age",
      3,
      "valueChange",
      "label",
      "value"
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
      "cni",
      3,
      "valueChange",
      "label",
      "hint",
      "value"
    ],
    [
      "preset",
      "village",
      3,
      "valueChange",
      "label",
      "value"
    ],
    [
      "leadingIcon",
      "hub",
      1,
      "mt-2",
      "block",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      1,
      "check",
      "sm:col-span-2"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "justify-end",
      "gap-2",
      "sm:col-span-2"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      3,
      "click",
      "disabled"
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
    [1, "fact"],
    [1, "fact-ico"],
    [
      "name",
      "calendar_today",
      3,
      "size"
    ],
    [
      "name",
      "call",
      3,
      "size"
    ],
    [1, "tabular-nums"],
    [
      "name",
      "badge",
      3,
      "size"
    ],
    [
      "name",
      "location_on",
      3,
      "size"
    ],
    [
      "name",
      "hub",
      3,
      "size"
    ],
    [
      "name",
      "group",
      3,
      "size"
    ],
    [
      "name",
      "apartment",
      3,
      "size"
    ],
    [
      "accept",
      "image/*,application/pdf",
      3,
      "added",
      "removed",
      "slots",
      "files",
      "hint"
    ],
    [1, "doc-row"],
    [
      1,
      "sub",
      "border-t",
      "px-5",
      "py-5",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
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
      "font-bold"
    ],
    [1, "sub"],
    [
      1,
      "badge",
      2,
      "background",
      "var(--v2-erreur-bg)",
      "color",
      "var(--v2-erreur-fg)"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "dot"
    ],
    [1, "min-w-0"],
    [
      1,
      "block",
      "font-bold"
    ],
    [
      1,
      "block",
      "text-[14px]"
    ],
    [
      1,
      "sub",
      "block"
    ],
    [
      1,
      "notice",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
    ],
    [
      "role",
      "radiogroup",
      1,
      "seg",
      "seg-form"
    ],
    [
      1,
      "grid",
      "size-14",
      "place-items-center",
      "rounded-[16px]",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
    ],
    [
      "name",
      "folder_open",
      3,
      "size"
    ],
    [
      1,
      "text-[22px]",
      "font-extrabold"
    ],
    [
      "routerLink",
      "/dashboard/dossiers",
      1,
      "btn",
      "btn-ghost",
      "mt-2"
    ]
  ],
  template: function DossierDetailPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0);
      __conditionalCreate(1, DossierDetailPage_Conditional_1_Template, 74, 62)(2, DossierDetailPage_Conditional_2_Template, 9, 4, "div", 1);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      __property("perm", ctx.perms)("area", ctx.t()("dossiers.detail.area"));
      __advance();
      __conditional((tmp_2_0 = ctx.dossier()) ? 1 : 2, tmp_2_0);
    }
  },
  dependencies: [
    AppShellComponent,
    DetailHeroComponent,
    FileSlotsComponent,
    IconComponent,
    ModalComponent,
    RouterLink,
    SelectComponent,
    TextFieldComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".steps[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(4, minmax(0, 1fr));\n        gap: 6px;\n      }\n      .step[_ngcontent-%COMP%] {\n        display: flex;\n        min-width: 0;\n        align-items: center;\n        gap: 8px;\n        border-radius: 14px;\n        background: color-mix(in oklab, var(--%NS%v2-blanc) 8%, transparent);\n        padding: 10px 12px;\n        font-size: 13px;\n        font-weight: 800;\n        color: color-mix(in oklab, var(--%NS%v2-blanc) 60%, transparent);\n      }\n      .step[_ngcontent-%COMP%]   .b[_ngcontent-%COMP%] {\n        display: grid;\n        height: 24px;\n        width: 24px;\n        flex-shrink: 0;\n        place-items: center;\n        border-radius: 999px;\n        border: 1.5px solid currentColor;\n        font-size: 12px;\n      }\n      .step.done[_ngcontent-%COMP%] {\n        color: var(--%NS%v2-blanc);\n      }\n      .step.done[_ngcontent-%COMP%]   .b[_ngcontent-%COMP%] {\n        border-color: var(--%NS%v2-citron);\n        background: var(--%NS%v2-citron);\n        color: var(--%NS%v2-foret);\n      }\n      .step.now[_ngcontent-%COMP%] {\n        background: var(--%NS%v2-citron);\n        color: var(--%NS%v2-foret);\n      }\n      .step.now[_ngcontent-%COMP%]   .b[_ngcontent-%COMP%] {\n        border-color: var(--%NS%v2-foret);\n        background: var(--%NS%v2-foret);\n        color: var(--%NS%v2-citron);\n      }\n      @media (max-width: 640px) {\n        .steps[_ngcontent-%COMP%] {\n          grid-template-columns: repeat(2, minmax(0, 1fr));\n        }\n      }\n      .grid-main[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 16px;\n      }\n      @media (min-width: 1100px) {\n        .grid-main[_ngcontent-%COMP%] {\n          grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);\n          align-items: start;\n        }\n      }\n      .timeline[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n        display: flex;\n        gap: 14px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 12px 20px;\n      }\n      .dot[_ngcontent-%COMP%] {\n        margin-top: 5px;\n        height: 12px;\n        width: 12px;\n        flex-shrink: 0;\n        border-radius: 999px;\n        background: var(--%NS%v2-foret);\n        box-shadow: 0 0 0 4px var(--%NS%v2-sauge);\n      }\n      .seg-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n        flex: 1;\n        justify-content: center;\n      }\n      .doc-row[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 12px 20px;\n        font-size: 14px;\n      }"]
}), _a);

export { DossierDetailPage as default };
//# sourceMappingURL=dossiers._id_.page-N5K4tE2b.mjs.map

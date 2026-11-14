import { i as inject, A as ActivatedRoute, F as signal, c as computed, e as effect, ɵ as __defineComponent, d as RouterLink, f as __elementStart, g as __text, h as __elementEnd, b as __element, H as __listener, j as __conditionalCreate, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, u as __attribute, z as __classProp, s as __conditional, a8 as untracked, m as __repeaterCreate, w as __nextContext, v as __repeater, L as __getCurrentView, N as __textInterpolate2, t as __styleProp, r as __pureFunction1, O as __restoreView, P as __resetView, V as __repeaterTrackByIdentity } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, j as nf, S as scopedCases, i as inScope, T as sharedPhoneGroups, I as fmtAge, D as maskCni } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { P as PlotMapComponent } from './plot-map.component-DDK5c2GY.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { T as TONE, i as initialsOf } from './v2-page.styles-DN_FuKKd.mjs';
import { M as ModalComponent, g as StatCardsComponent } from './ui-DDO8FoUF.mjs';
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
var _c0 = (a0) => ["/dashboard/producteurs", a0];
var _c1 = (a0) => ({ n: a0 });
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.label;
var _forTrack3 = ($index, $item) => $item.phone;
function QualiteDoublonsPage_Conditional_19_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 8);
    __listener("click", function QualiteDoublonsPage_Conditional_19_For_2_Template_button_click_0_listener() {
      const group_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.filter.set(group_r2.key));
    });
    __text(1);
    __elementStart(2, "span", 11);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const group_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __classProp("on", ctx_r2.filter() === group_r2.key);
    __attribute("aria-checked", ctx_r2.filter() === group_r2.key);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()(group_r2.label));
    __advance();
    __classProp("zero", !ctx_r2.countInGroup(group_r2.key));
    __advance();
    __textInterpolate(ctx_r2.countInGroup(group_r2.key));
  }
}
function QualiteDoublonsPage_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 7);
    __repeaterCreate(1, QualiteDoublonsPage_Conditional_19_For_2_Template, 4, 7, "button", 18, _forTrack0);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __attribute("aria-label", ctx_r2.t()("qualite.v2.dbl.view.cases"));
    __advance();
    __repeater(ctx_r2.groups);
  }
}
function QualiteDoublonsPage_Conditional_20_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "button", 25);
    __listener("click", function QualiteDoublonsPage_Conditional_20_For_5_Template_button_click_0_listener() {
      const duplicateCase_r5 = __restoreView(_r4).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.chooseCase(duplicateCase_r5.id));
    });
    __elementStart(1, "span", 26)(2, "span", 27);
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 28);
    __text(5);
    __elementEnd()();
    __elementStart(6, "span", 29)(7, "span", 30);
    __text(8);
    __elementEnd();
    __elementStart(9, "span", 31);
    __text(10);
    __elementEnd()();
    __elementStart(11, "span", 32)(12, "span", 33);
    __text(13);
    __elementEnd();
    __elementStart(14, "span", 34);
    __text(15);
    __elementEnd()()();
  }
  if (rf & 2) {
    const duplicateCase_r5 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    const producerA_r6 = ctx_r2.producerById(duplicateCase_r5.aId);
    const producerB_r7 = ctx_r2.producerById(duplicateCase_r5.bId);
    __classProp("on", ctx_r2.selId() === duplicateCase_r5.id);
    __attribute("aria-pressed", ctx_r2.selId() === duplicateCase_r5.id);
    __advance(3);
    __textInterpolate(ctx_r2.initials(ctx_r2.name(producerA_r6)));
    __advance(2);
    __textInterpolate(ctx_r2.initials(ctx_r2.name(producerB_r7)));
    __advance(3);
    __textInterpolate(ctx_r2.name(producerA_r6));
    __advance(2);
    __textInterpolate2("", producerA_r6 == null ? void 0 : producerA_r6.village, " \xB7 ", duplicateCase_r5.id.toUpperCase());
    __advance(2);
    __styleProp("color", ctx_r2.scoreColor(duplicateCase_r5.score));
    __advance();
    __textInterpolate1("", duplicateCase_r5.score, " %");
    __advance();
    __styleProp("background", ctx_r2.caseTone[duplicateCase_r5.status].bg)("color", ctx_r2.caseTone[duplicateCase_r5.status].fg);
    __advance();
    __textInterpolate(ctx_r2.t()(ctx_r2.statusLabel[duplicateCase_r5.status]));
  }
}
function QualiteDoublonsPage_Conditional_20_ForEmpty_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 23);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.t()("qualite.doublons.noCase"));
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_For_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 52);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(6);
    __advance();
    __textInterpolate(ctx_r2.t()("qualite.doublons.secondarySignal"));
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_For_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 34);
    __text(1);
    __conditionalCreate(2, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_For_12_Conditional_2_Template, 2, 1, "span", 52);
    __elementEnd();
  }
  if (rf & 2) {
    const matchSignal_r8 = ctx.$implicit;
    __styleProp("background", matchSignal_r8.primary ? "var(--v2-info-bg)" : "var(--v2-creme)")("color", matchSignal_r8.primary ? "var(--v2-info-fg)" : "var(--v2-ardoise)");
    __advance();
    __textInterpolate1(" ", matchSignal_r8.label, " ");
    __advance();
    __conditional(!matchSignal_r8.primary ? 2 : -1);
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_For_31_Conditional_7_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 54);
  if (rf & 2) __property("size", 14);
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_For_31_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "tr")(1, "td", 47);
    __text(2);
    __elementEnd();
    __elementStart(3, "td", 53);
    __text(4);
    __elementEnd();
    __elementStart(5, "td", 53);
    __text(6);
    __conditionalCreate(7, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_For_31_Conditional_7_Template, 1, 1, "ui-icon", 54);
    __elementEnd()();
  }
  if (rf & 2) {
    const row_r9 = ctx.$implicit;
    __classProp("diff", row_r9.diff);
    __advance(2);
    __textInterpolate(row_r9.label);
    __advance(2);
    __textInterpolate(row_r9.a);
    __advance(2);
    __textInterpolate1(" ", row_r9.b, " ");
    __advance();
    __conditional(row_r9.diff ? 7 : -1);
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "button", 55);
    __listener("click", function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_42_Template_button_click_0_listener() {
      __restoreView(_r10);
      const selected_r11 = __nextContext(3);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.revealCni(selected_r11.id));
    });
    __element(1, "ui-icon", 56);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(5);
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate1("", ctx_r2.t()("qualite.doublons.showCni"), " ");
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 57);
    __element(1, "app-plot-map", 58);
    __elementEnd();
    __elementStart(2, "p", 59);
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(5);
    __advance();
    __property("plots", ctx_r2.casePlots());
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.doublons.bothPlots"));
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_44_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "button", 65);
    __listener("click", function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_44_Conditional_9_Template_button_click_0_listener() {
      __restoreView(_r12);
      const selected_r11 = __nextContext(4);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.undoMerge(selected_r11.id));
    });
    __element(1, "ui-icon", 66);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(6);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r2.t()("qualite.doublons.undoMerge"), " ");
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_44_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    __elementStart(0, "section", 51)(1, "div", 60)(2, "span", 61);
    __element(3, "ui-icon", 62);
    __elementEnd();
    __elementStart(4, "div", 29)(5, "p", 63);
    __text(6);
    __elementEnd();
    __elementStart(7, "p", 47);
    __text(8);
    __elementEnd()();
    __conditionalCreate(9, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_44_Conditional_9_Template, 3, 2, "button", 64);
    __elementEnd()();
  }
  if (rf & 2) {
    const selected_r11 = __nextContext(3);
    const ctx_r2 = __nextContext(2);
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r2.t()("qualite.doublons.merged.title"));
    __advance(2);
    __textInterpolate2(" ", ctx_r2.t()("qualite.doublons.merged.body"), " ", (_a2 = selected_r11.comment) != null ? _a2 : "", " ");
    __advance();
    __conditional(ctx_r2.merges()[selected_r11.id] && ctx_r2.store.can("quality.merge") ? 9 : -1);
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_45_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = __getCurrentView();
    __elementStart(0, "button", 78);
    __listener("click", function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_45_For_9_Template_button_click_0_listener() {
      const status_r15 = __restoreView(_r14).$implicit;
      const ctx_r2 = __nextContext(6);
      return __resetView(ctx_r2.classifyStatus.set(status_r15));
    });
    __element(1, "span", 79);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const status_r15 = ctx.$implicit;
    const ctx_r2 = __nextContext(6);
    __classProp("on", ctx_r2.classifyStatus() === status_r15);
    __attribute("aria-checked", ctx_r2.classifyStatus() === status_r15);
    __advance();
    __styleProp("background", ctx_r2.caseTone[status_r15].fg);
    __advance();
    __textInterpolate1("", ctx_r2.t()(ctx_r2.statusLabel[status_r15]), " ");
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_45_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = __getCurrentView();
    __elementStart(0, "button", 80);
    __listener("click", function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_45_Conditional_15_Template_button_click_0_listener() {
      __restoreView(_r16);
      const ctx_r2 = __nextContext(6);
      return __resetView(ctx_r2.mergeOpen.set(true));
    });
    __element(1, "ui-icon", 81);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(6);
    __property("disabled", ctx_r2.comment().trim().length < 3);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r2.t()("qualite.doublons.mergeBIntoA"), " ");
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_45_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 47);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(6);
    __advance();
    __textInterpolate(ctx_r2.t()("qualite.doublons.mergeNeedsPerm"));
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "section", 36)(1, "div", 67)(2, "h2")(3, "span", 68);
    __element(4, "ui-icon", 69);
    __elementEnd();
    __text(5);
    __elementEnd()();
    __elementStart(6, "div", 70)(7, "div", 71);
    __repeaterCreate(8, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_45_For_9_Template, 3, 6, "button", 72, __repeaterTrackByIdentity);
    __elementEnd();
    __elementStart(10, "div")(11, "label", 73);
    __text(12);
    __elementEnd();
    __elementStart(13, "textarea", 74);
    __listener("input", function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_45_Template_textarea_input_13_listener($event) {
      __restoreView(_r13);
      const ctx_r2 = __nextContext(5);
      return __resetView(ctx_r2.comment.set($event.target.value));
    });
    __elementEnd()();
    __elementStart(14, "div", 75);
    __conditionalCreate(15, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_45_Conditional_15_Template, 3, 3, "button", 76);
    __elementStart(16, "button", 77);
    __listener("click", function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_45_Template_button_click_16_listener() {
      __restoreView(_r13);
      const ctx_r2 = __nextContext(5);
      return __resetView(ctx_r2.saveClassify());
    });
    __text(17);
    __elementStart(18, "span", 16);
    __element(19, "ui-icon", 17);
    __elementEnd()()();
    __conditionalCreate(20, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_45_Conditional_20_Template, 2, 1, "p", 47);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(5);
    __advance(4);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r2.t()("qualite.doublons.classify.title"), " ");
    __advance(2);
    __attribute("aria-label", ctx_r2.t()("qualite.doublons.classify.aria"));
    __advance();
    __repeater(ctx_r2.classifyStatuses);
    __advance(4);
    __textInterpolate1("", ctx_r2.t()("qualite.common.comment"), " *");
    __advance();
    __property("placeholder", ctx_r2.t()("qualite.doublons.classify.commentPlaceholder"))("value", ctx_r2.comment());
    __advance(2);
    __conditional(ctx_r2.store.can("quality.merge") ? 15 : -1);
    __advance();
    __property("disabled", !ctx_r2.canSaveClassify());
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("qualite.doublons.classify.save"));
    __advance(2);
    __property("size", 18);
    __advance();
    __conditional(!ctx_r2.store.can("quality.merge") ? 20 : -1);
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 35)(1, "section", 36)(2, "div", 37)(3, "span", 38);
    __text(4);
    __elementEnd();
    __elementStart(5, "div", 29)(6, "p", 2);
    __text(7);
    __elementEnd();
    __elementStart(8, "h2", 39);
    __text(9);
    __elementEnd();
    __elementStart(10, "div", 40);
    __repeaterCreate(11, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_For_12_Template, 3, 6, "span", 41, _forTrack2);
    __elementEnd()();
    __elementStart(13, "span", 34);
    __text(14);
    __elementEnd()();
    __elementStart(15, "div", 42)(16, "table", 43)(17, "thead")(18, "tr")(19, "th", 44);
    __text(20);
    __elementEnd();
    __elementStart(21, "th");
    __text(22);
    __elementStart(23, "a", 45);
    __text(24);
    __elementEnd()();
    __elementStart(25, "th");
    __text(26);
    __elementStart(27, "a", 45);
    __text(28);
    __elementEnd()()()();
    __elementStart(29, "tbody");
    __repeaterCreate(30, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_For_31_Template, 8, 6, "tr", 46, _forTrack2);
    __elementStart(32, "tr")(33, "td", 47);
    __text(34);
    __elementEnd();
    __elementStart(35, "td", 48);
    __text(36);
    __elementEnd();
    __elementStart(37, "td", 48);
    __text(38);
    __elementEnd()()()()();
    __elementStart(39, "div", 49)(40, "span", 47);
    __text(41);
    __elementEnd();
    __conditionalCreate(42, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_42_Template, 3, 2, "button", 50);
    __elementEnd();
    __conditionalCreate(43, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_43_Template, 4, 2);
    __elementEnd();
    __conditionalCreate(44, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_44_Template, 10, 5, "section", 51)(45, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Conditional_45_Template, 21, 11, "section", 36);
    __elementEnd();
  }
  if (rf & 2) {
    const sheetB_r17 = ctx;
    const sheetA_r18 = __nextContext();
    const selected_r11 = __nextContext();
    const ctx_r2 = __nextContext(2);
    __advance(3);
    __styleProp("background", ctx_r2.scoreBg(selected_r11.score))("color", ctx_r2.scoreColor(selected_r11.score));
    __advance();
    __textInterpolate1("", selected_r11.score, "%");
    __advance(3);
    __textInterpolate2(" ", ctx_r2.t()("qualite.v2.dbl.score"), " \xB7 ", selected_r11.id.toUpperCase(), " ");
    __advance(2);
    __textInterpolate2(" ", ctx_r2.name(sheetA_r18), " / ", ctx_r2.name(sheetB_r17), " ");
    __advance(2);
    __repeater(selected_r11.signals);
    __advance(2);
    __styleProp("background", ctx_r2.caseTone[selected_r11.status].bg)("color", ctx_r2.caseTone[selected_r11.status].fg);
    __advance();
    __textInterpolate(ctx_r2.t()(ctx_r2.statusLabel[selected_r11.status]));
    __advance(6);
    __textInterpolate(ctx_r2.t()("qualite.v2.dbl.compare"));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("qualite.doublons.sheetA"), " ");
    __advance();
    __property("routerLink", __pureFunction1(28, _c0, sheetA_r18.id));
    __advance();
    __textInterpolate(ctx_r2.t()("qualite.doublons.openSheet"));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("qualite.doublons.sheetB"), " ");
    __advance();
    __property("routerLink", __pureFunction1(30, _c0, sheetB_r17.id));
    __advance();
    __textInterpolate(ctx_r2.t()("qualite.doublons.openSheet"));
    __advance(2);
    __repeater(ctx_r2.comparisonRows(sheetA_r18, sheetB_r17));
    __advance(4);
    __textInterpolate(ctx_r2.t()("qualite.doublons.row.plots"));
    __advance(2);
    __textInterpolate(ctx_r2.nPlots(sheetA_r18.id));
    __advance(2);
    __textInterpolate(ctx_r2.nPlots(sheetB_r17.id));
    __advance(3);
    __textInterpolate(ctx_r2.t()("qualite.v2.dbl.diff", __pureFunction1(32, _c1, ctx_r2.diffCount(sheetA_r18, sheetB_r17))));
    __advance();
    __conditional(ctx_r2.store.can("identity.read_full") && !ctx_r2.showCni() ? 42 : -1);
    __advance();
    __conditional(ctx_r2.casePlots().length && ctx_r2.store.can("map.read") ? 43 : -1);
    __advance();
    __conditional(selected_r11.status === "fusionn\xE9" ? 44 : 45);
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Conditional_0_Template, 46, 34, "div", 35);
  if (rf & 2) {
    let tmp_5_0;
    const selected_r11 = __nextContext();
    const ctx_r2 = __nextContext(2);
    __conditional((tmp_5_0 = ctx_r2.producerById(selected_r11.bId)) ? 0 : -1, tmp_5_0);
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_7_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, QualiteDoublonsPage_Conditional_20_Conditional_7_Conditional_0_Template, 1, 1);
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = __nextContext(2);
    __conditional((tmp_3_0 = ctx_r2.producerById(ctx.aId)) ? 0 : -1, tmp_3_0);
  }
}
function QualiteDoublonsPage_Conditional_20_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 24);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.t()("qualite.doublons.selectCase"));
  }
}
function QualiteDoublonsPage_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 19);
    __text(1);
    __elementEnd();
    __elementStart(2, "div", 20)(3, "section", 21);
    __repeaterCreate(4, QualiteDoublonsPage_Conditional_20_For_5_Template, 16, 16, "button", 22, _forTrack1, false, QualiteDoublonsPage_Conditional_20_ForEmpty_6_Template, 2, 1, "p", 23);
    __elementEnd();
    __conditionalCreate(7, QualiteDoublonsPage_Conditional_20_Conditional_7_Template, 1, 1)(8, QualiteDoublonsPage_Conditional_20_Conditional_8_Template, 2, 1, "div", 24);
    __elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = __nextContext();
    __advance();
    __textInterpolate(ctx_r2.currentGroupHint());
    __advance(2);
    __attribute("aria-label", ctx_r2.t()("qualite.v2.dbl.view.cases"));
    __advance();
    __repeater(ctx_r2.list());
    __advance(3);
    __conditional((tmp_4_0 = ctx_r2.sel()) ? 7 : 8, tmp_4_0);
  }
}
function QualiteDoublonsPage_Conditional_21_For_4_For_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 87)(1, "span", 88);
    __text(2);
    __elementEnd();
    __elementStart(3, "a", 89);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 47);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const member_r19 = ctx.$implicit;
    const ctx_r2 = __nextContext(3);
    __advance(2);
    __textInterpolate(ctx_r2.initials(member_r19.firstName + " " + member_r19.lastName));
    __advance();
    __property("routerLink", __pureFunction1(6, _c0, member_r19.id));
    __advance();
    __textInterpolate2("", member_r19.firstName, " ", member_r19.lastName);
    __advance(2);
    __textInterpolate2("", member_r19.code, " \xB7 ", member_r19.village);
  }
}
function QualiteDoublonsPage_Conditional_21_For_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 36)(1, "div", 67)(2, "h2")(3, "span", 68);
    __element(4, "ui-icon", 10);
    __elementEnd();
    __elementStart(5, "span", 85);
    __text(6);
    __elementEnd()();
    __elementStart(7, "span", 86);
    __text(8);
    __elementEnd()();
    __elementStart(9, "ul");
    __repeaterCreate(10, QualiteDoublonsPage_Conditional_21_For_4_For_11_Template, 7, 8, "li", 87, _forTrack1);
    __elementEnd()();
  }
  if (rf & 2) {
    const phoneGroup_r20 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(4);
    __property("size", 18);
    __advance(2);
    __textInterpolate(ctx_r2.store.phone(phoneGroup_r20.phone));
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.doublons.phones.people", __pureFunction1(3, _c1, phoneGroup_r20.members.length)));
    __advance(2);
    __repeater(phoneGroup_r20.members);
  }
}
function QualiteDoublonsPage_Conditional_21_ForEmpty_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 84);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("qualite.doublons.phones.none"), " ");
  }
}
function QualiteDoublonsPage_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 82);
    __text(1);
    __elementEnd();
    __elementStart(2, "div", 83);
    __repeaterCreate(3, QualiteDoublonsPage_Conditional_21_For_4_Template, 12, 5, "section", 36, _forTrack3, false, QualiteDoublonsPage_Conditional_21_ForEmpty_5_Template, 2, 1, "p", 84);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __textInterpolate(ctx_r2.t()("qualite.doublons.phones.intro"));
    __advance(2);
    __repeater(ctx_r2.phoneGroups());
  }
}
var GROUPS = [
  {
    key: "a-traiter",
    label: "qualite.doublons.group.a-traiter",
    hint: "qualite.doublons.group.a-traiter.hint",
    statuses: ["\xE0 examiner"]
  },
  {
    key: "probables",
    label: "qualite.doublons.group.probables",
    hint: "qualite.doublons.group.probables.hint",
    statuses: ["probable"]
  },
  {
    key: "non-resolus",
    label: "qualite.doublons.group.non-resolus",
    hint: "qualite.doublons.group.non-resolus.hint",
    statuses: ["non r\xE9solu"]
  },
  {
    key: "classes",
    label: "qualite.doublons.group.classes",
    hint: "qualite.doublons.group.classes.hint",
    statuses: [
      "confirm\xE9",
      "non-doublon",
      "erreur de saisie d'identit\xE9",
      "fusionn\xE9"
    ]
  },
  {
    key: "tous",
    label: "qualite.doublons.group.tous",
    hint: "qualite.doublons.group.tous.hint",
    statuses: null
  }
];
function inGroup(c, g) {
  const def = GROUPS.find((x) => x.key === g);
  return !def.statuses || def.statuses.includes(c.status);
}
var STATUSES = [
  "\xE0 examiner",
  "probable",
  "confirm\xE9",
  "non-doublon",
  "erreur de saisie d'identit\xE9",
  "non r\xE9solu",
  "fusionn\xE9"
];
var STATUS_LABEL = {
  "\xE0 examiner": "qualite.doublons.status.\xE0 examiner",
  probable: "qualite.doublons.status.probable",
  confirm\u00E9: "qualite.doublons.status.confirm\xE9",
  "non-doublon": "qualite.doublons.status.non-doublon",
  "erreur de saisie d'identit\xE9": "qualite.doublons.status.erreur de saisie d'identit\xE9",
  "non r\xE9solu": "qualite.doublons.status.non r\xE9solu",
  fusionn\u00E9: "qualite.doublons.status.fusionn\xE9"
};
var CASE_TONE = {
  "\xE0 examiner": TONE.attente,
  confirm\u00E9: TONE.erreur,
  probable: TONE.culture,
  "non-doublon": TONE.succes,
  "erreur de saisie d'identit\xE9": TONE.info,
  "non r\xE9solu": TONE.neutre,
  fusionn\u00E9: {
    bg: "var(--v2-foret)",
    fg: "var(--v2-citron)"
  }
};
var QualiteDoublonsPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.route = inject(ActivatedRoute);
    this.groups = GROUPS;
    this.statusLabel = STATUS_LABEL;
    this.caseTone = CASE_TONE;
    this.classifyStatuses = STATUSES.filter((s) => s !== "fusionn\xE9");
    this.initials = initialsOf;
    this.snackbar = inject(SnackbarService);
    this.filter = signal("a-traiter", ...[]);
    this.selId = signal(null, ...[]);
    this.view = signal("cas", ...[]);
    this.showCni = signal(false, ...[]);
    this.classifyStatus = signal("", ...[]);
    this.comment = signal("", ...[]);
    this.mergeOpen = signal(false, ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const v = this.visible();
      const todo = v.filter((c) => c.status === "\xE0 examiner");
      const avg = todo.length ? Math.round(todo.reduce((n, c) => n + c.score, 0) / todo.length) : 0;
      const done = v.filter((c) => inGroup(c, "classes"));
      const phones = this.phoneGroups();
      return [
        {
          label: t("qualite.v2.dbl.stat.todo"),
          value: nf.format(todo.length),
          sub: t("qualite.v2.dbl.stat.todoSub", { score: avg }),
          icon: "group",
          bg: "",
          fg: ""
        },
        {
          label: t("qualite.v2.dbl.stat.probable"),
          value: nf.format(v.filter((c) => c.status === "probable").length),
          sub: t("qualite.v2.dbl.stat.probableSub"),
          icon: "warning",
          ...TONE.culture
        },
        {
          label: t("qualite.v2.dbl.stat.done"),
          value: nf.format(done.length),
          sub: t("qualite.v2.dbl.stat.doneSub", { merged: v.filter((c) => c.status === "fusionn\xE9").length }),
          icon: "task_alt",
          ...TONE.succes
        },
        {
          label: t("qualite.v2.dbl.stat.phones"),
          value: nf.format(phones.length),
          sub: t("qualite.v2.dbl.stat.phonesSub", { n: phones.reduce((n, g) => n + g.members.length, 0) }),
          icon: "call",
          ...TONE.attente
        }
      ];
    }, ...[]);
    this.visible = computed(() => {
      var _a2;
      const s = this.store.state();
      const session = s.session;
      const scoopParam = (_a2 = this.route.snapshot.queryParamMap.get("scoop")) != null ? _a2 : void 0;
      const byProducer = new Map(s.producers.map((p) => [p.id, p]));
      return scopedCases(s.cases, s.producers, session).filter((c) => {
        const pa = byProducer.get(c.aId);
        if (!pa || !inScope([pa], session).length) return false;
        if (scoopParam && pa.scoopId !== scoopParam) return false;
        return true;
      });
    }, ...[]);
    this.list = computed(() => this.visible().filter((c) => inGroup(c, this.filter())), ...[]);
    this.sel = computed(() => {
      var _a2;
      const id = this.selId();
      if (!id) return void 0;
      return (_a2 = this.visible().find((c) => c.id === id)) != null ? _a2 : this.list()[0];
    }, ...[]);
    this.phoneGroups = computed(() => {
      const s = this.store.state();
      return sharedPhoneGroups(inScope(s.producers, s.session));
    }, ...[]);
    this.merges = computed(() => this.store.state().merges, ...[]);
    this.currentGroupHint = computed(() => {
      const key = this.filter();
      const g = GROUPS.find((x) => x.key === key);
      return this.t()(g.hint);
    }, ...[]);
    this.mergeConfirmBody = computed(() => {
      var _a2, _b;
      const sel = this.sel();
      const s = this.store.state();
      if (!sel) return "";
      const a = s.producers.find((p) => p.id === sel.aId);
      const b = s.producers.find((p) => p.id === sel.bId);
      return this.t()("qualite.doublons.confirm.body", {
        bCode: (_a2 = b == null ? void 0 : b.code) != null ? _a2 : "",
        aCode: (_b = a == null ? void 0 : a.code) != null ? _b : "",
        plots: b ? s.plots.filter((p) => p.producerId === b.id).length : 0
      });
    }, ...[]);
    this.casePlots = computed(() => {
      const sel = this.sel();
      if (!sel) return [];
      const ids = /* @__PURE__ */ new Set([sel.aId, sel.bId]);
      return this.store.state().plots.filter((p) => ids.has(p.producerId));
    }, ...[]);
    effect(() => {
      this.list();
      const id = this.selId();
      untracked(() => {
        var _a2, _b;
        const L = this.list();
        if (!id || !L.some((c) => c.id === id)) this.selId.set((_b = (_a2 = L[0]) == null ? void 0 : _a2.id) != null ? _b : null);
      });
    });
  }
  name(p) {
    return p ? `${p.firstName} ${p.lastName}` : "\u2014";
  }
  scoreColor(score) {
    return score >= 85 ? "var(--v2-erreur-fg)" : score >= 70 ? "var(--v2-attente-fg)" : "var(--v2-info-fg)";
  }
  scoreBg(score) {
    return score >= 85 ? "var(--v2-erreur-bg)" : score >= 70 ? "var(--v2-attente-bg)" : "var(--v2-info-bg)";
  }
  diffCount(a, b) {
    return this.comparisonRows(a, b).filter((r) => r.diff).length;
  }
  producerById(id) {
    return this.store.state().producers.find((p) => p.id === id);
  }
  nPlots(id) {
    return this.store.state().plots.filter((p) => p.producerId === id).length;
  }
  countInGroup(key) {
    return this.visible().filter((c) => inGroup(c, key)).length;
  }
  chooseCase(id) {
    this.selId.set(id);
    this.classifyStatus.set("");
    this.comment.set("");
    this.showCni.set(false);
  }
  comparisonRows(a, b) {
    const s = this.store.state();
    const t = this.t();
    const cniShown = this.showCni();
    return [
      [t("qualite.doublons.row.name"), (p) => `${p.firstName} ${p.lastName}`],
      [t("qualite.doublons.row.code"), (p) => p.code],
      [t("qualite.doublons.row.sex"), (p) => p.sex],
      [t("qualite.doublons.row.age"), (p) => fmtAge(p.age)],
      [t("qualite.doublons.row.phone"), (p) => this.store.phone(p.phone)],
      [t("qualite.doublons.row.cni"), (p) => cniShown ? p.cni || t("qualite.common.notProvided") : maskCni(p.cni)],
      [t("qualite.doublons.row.village"), (p) => p.village],
      [t("qualite.doublons.row.scoop"), (p) => {
        var _a2, _b;
        return (_b = (_a2 = s.scoops.find((sc) => sc.id === p.scoopId)) == null ? void 0 : _a2.name) != null ? _b : "";
      }],
      [t("qualite.doublons.row.crops"), (p) => p.crops.map((c) => c.crop).join(", ")],
      [t("qualite.doublons.row.enumerator"), (p) => p.enumerator]
    ].map(([label, fn]) => {
      const va = fn(a);
      const vb = fn(b);
      return {
        label,
        a: va,
        b: vb,
        diff: va !== vb
      };
    });
  }
  canSaveClassify() {
    return !!this.classifyStatus() && this.comment().trim().length >= 3;
  }
  saveClassify() {
    const sel = this.sel();
    const st = this.classifyStatus();
    if (!sel || !st) return;
    this.store.actions.classifyCase(sel.id, st, this.comment().trim());
    this.comment.set("");
    this.classifyStatus.set("");
    this.snackbar.success(this.t()("qualite.v2.dbl.classified", { status: this.t()(STATUS_LABEL[st]) }));
  }
  confirmMerge() {
    const sel = this.sel();
    if (!sel || this.comment().trim().length < 3) return;
    this.store.actions.mergeCase(sel.id, this.comment().trim());
    this.comment.set("");
    this.mergeOpen.set(false);
    this.snackbar.success(this.t()("qualite.v2.dbl.merged"));
  }
  undoMerge(id) {
    this.store.actions.undoMerge(id);
    this.snackbar.info(this.t()("qualite.v2.dbl.undone"));
  }
  revealCni(caseId) {
    this.store.actions.audit("R\xE9v\xE9lation CNI", `Cas ${caseId.toUpperCase()}`, "Comparaison doublon");
    this.showCni.set(true);
    this.snackbar.info(this.t()("qualite.v2.dbl.cniShown"));
  }
}, _a.\u0275fac = function QualiteDoublonsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-qualite-doublons-page"]],
  decls: 30,
  vars: 29,
  consts: [
    [
      "perm",
      "quality.review",
      3,
      "area"
    ],
    [1, "rise"],
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
      "click"
    ],
    [
      "name",
      "group",
      3,
      "size"
    ],
    [
      "name",
      "call",
      3,
      "size"
    ],
    [1, "n"],
    [
      "icon",
      "hub",
      3,
      "closed",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "h-2"
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
      "type",
      "button",
      "role",
      "radio",
      3,
      "on"
    ],
    [
      1,
      "sub",
      "mt-4"
    ],
    [
      1,
      "layout",
      "mt-3"
    ],
    [
      1,
      "sec-card",
      "cases"
    ],
    [
      "type",
      "button",
      1,
      "case",
      3,
      "on"
    ],
    [
      1,
      "sub",
      "p-6",
      "text-center"
    ],
    [
      1,
      "card",
      "sub",
      "p-10",
      "text-center"
    ],
    [
      "type",
      "button",
      1,
      "case",
      3,
      "click"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "pair"
    ],
    [1, "avatar"],
    [
      1,
      "avatar",
      "b"
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
    [
      1,
      "sub",
      "block",
      "truncate"
    ],
    [
      1,
      "flex",
      "flex-col",
      "items-end",
      "gap-1"
    ],
    [
      1,
      "text-[15px]",
      "font-extrabold",
      "tabular-nums"
    ],
    [1, "badge"],
    [
      1,
      "grid",
      "gap-4"
    ],
    [1, "sec-card"],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-4",
      "p-5"
    ],
    [1, "score"],
    [
      1,
      "mt-1",
      "text-[20px]",
      "font-extrabold",
      "tracking-[-0.01em]"
    ],
    [
      1,
      "mt-2",
      "flex",
      "flex-wrap",
      "gap-1.5"
    ],
    [
      1,
      "badge",
      3,
      "background",
      "color"
    ],
    [
      1,
      "overflow-x-auto",
      "border-t",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      1,
      "cmp",
      "w-full",
      "min-w-[560px]"
    ],
    [1, "w-36"],
    [
      1,
      "underline",
      "underline-offset-4",
      2,
      "color",
      "var(--v2-foret)",
      3,
      "routerLink"
    ],
    [3, "diff"],
    [1, "sub"],
    [
      1,
      "font-semibold",
      "tabular-nums"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "justify-between",
      "gap-2",
      "border-t",
      "px-5",
      "py-3",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      "type",
      "button",
      1,
      "reveal"
    ],
    [
      1,
      "sec-card",
      "p-5"
    ],
    [1, "opacity-70"],
    [
      1,
      "v",
      "font-semibold"
    ],
    [
      "name",
      "warning",
      2,
      "color",
      "var(--v2-attente-fg)",
      3,
      "size"
    ],
    [
      "type",
      "button",
      1,
      "reveal",
      3,
      "click"
    ],
    [
      "name",
      "visibility",
      3,
      "size"
    ],
    [
      1,
      "map",
      "border-t",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      "basemap",
      "sat",
      3,
      "plots"
    ],
    [
      1,
      "sub",
      "px-5",
      "py-2"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-4"
    ],
    [
      1,
      "sec-ico",
      2,
      "background",
      "var(--v2-foret)",
      "color",
      "var(--v2-citron)"
    ],
    [
      "name",
      "task_alt",
      3,
      "size"
    ],
    [1, "font-extrabold"],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost"
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
      "arrow_forward",
      2,
      "transform",
      "rotate(180deg)",
      3,
      "size"
    ],
    [1, "sec-head"],
    [1, "sec-ico"],
    [
      "name",
      "gavel",
      3,
      "size"
    ],
    [
      1,
      "grid",
      "gap-4",
      "border-t",
      "p-5",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      "role",
      "radiogroup",
      1,
      "choices"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "choice",
      3,
      "on"
    ],
    [
      "for",
      "dbl-comment",
      1,
      "lbl"
    ],
    [
      "id",
      "dbl-comment",
      1,
      "area",
      "mt-2",
      3,
      "input",
      "placeholder",
      "value"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "justify-end",
      "gap-2"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      3,
      "disabled"
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
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "choice",
      3,
      "click"
    ],
    [1, "d"],
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
      "name",
      "hub",
      3,
      "size"
    ],
    [
      1,
      "sub",
      "mt-4",
      "max-w-3xl"
    ],
    [
      1,
      "mt-3",
      "grid",
      "gap-3",
      "md:grid-cols-2"
    ],
    [
      1,
      "card",
      "sub",
      "p-10",
      "text-center",
      "md:col-span-2"
    ],
    [1, "tabular-nums"],
    [
      1,
      "badge",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-3",
      "border-t",
      "px-5",
      "py-2.5",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      1,
      "avatar",
      2,
      "height",
      "30px",
      "width",
      "30px",
      "font-size",
      "11px"
    ],
    [
      1,
      "min-w-0",
      "flex-1",
      "truncate",
      "font-bold",
      "hover:underline",
      3,
      "routerLink"
    ]
  ],
  template: function QualiteDoublonsPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0)(1, "header", 1)(2, "p", 2);
      __text(3);
      __elementEnd();
      __elementStart(4, "h1", 3);
      __text(5);
      __elementEnd();
      __elementStart(6, "p", 4);
      __text(7);
      __elementEnd()();
      __element(8, "ui-stat-cards", 5);
      __elementStart(9, "div", 6)(10, "div", 7)(11, "button", 8);
      __listener("click", function QualiteDoublonsPage_Template_button_click_11_listener() {
        return ctx.view.set("cas");
      });
      __element(12, "ui-icon", 9);
      __text(13);
      __elementEnd();
      __elementStart(14, "button", 8);
      __listener("click", function QualiteDoublonsPage_Template_button_click_14_listener() {
        return ctx.view.set("telephones");
      });
      __element(15, "ui-icon", 10);
      __text(16);
      __elementStart(17, "span", 11);
      __text(18);
      __elementEnd()()();
      __conditionalCreate(19, QualiteDoublonsPage_Conditional_19_Template, 3, 1, "div", 7);
      __elementEnd();
      __conditionalCreate(20, QualiteDoublonsPage_Conditional_20_Template, 9, 4)(21, QualiteDoublonsPage_Conditional_21_Template, 6, 2);
      __elementStart(22, "ui-modal", 12);
      __listener("closed", function QualiteDoublonsPage_Template_ui_modal_closed_22_listener() {
        return ctx.mergeOpen.set(false);
      });
      __element(23, "div", 13);
      __elementStart(24, "button", 14);
      __listener("click", function QualiteDoublonsPage_Template_button_click_24_listener() {
        return ctx.mergeOpen.set(false);
      });
      __text(25);
      __elementEnd();
      __elementStart(26, "button", 15);
      __listener("click", function QualiteDoublonsPage_Template_button_click_26_listener() {
        return ctx.confirmMerge();
      });
      __text(27);
      __elementStart(28, "span", 16);
      __element(29, "ui-icon", 17);
      __elementEnd()()()();
    }
    if (rf & 2) {
      __property("area", ctx.t()("qualite.doublons.area"));
      __advance(3);
      __textInterpolate(ctx.t()("qualite.header.title"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("qualite.nav.doublons"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("qualite.doublons.description"), " ");
      __advance();
      __property("stats", ctx.stats());
      __advance(2);
      __attribute("aria-label", ctx.t()("qualite.v2.dbl.view.aria"));
      __advance();
      __classProp("on", ctx.view() === "cas");
      __attribute("aria-checked", ctx.view() === "cas");
      __advance();
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("qualite.v2.dbl.view.cases"), " ");
      __advance();
      __classProp("on", ctx.view() === "telephones");
      __attribute("aria-checked", ctx.view() === "telephones");
      __advance();
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("qualite.doublons.sharedPhones"));
      __advance();
      __classProp("zero", !ctx.phoneGroups().length);
      __advance();
      __textInterpolate(ctx.phoneGroups().length);
      __advance();
      __conditional(ctx.view() === "cas" ? 19 : -1);
      __advance();
      __conditional(ctx.view() === "cas" ? 20 : 21);
      __advance(2);
      __property("open", ctx.mergeOpen())("title", ctx.t()("qualite.doublons.confirm.title"))("description", ctx.mergeConfirmBody())("width", 560)("closeLabel", ctx.t()("common.close"));
      __advance(3);
      __textInterpolate1(" ", ctx.t()("qualite.doublons.confirm.cancel"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("qualite.doublons.confirm.action"));
      __advance(2);
      __property("size", 18);
    }
  },
  dependencies: [
    AppShellComponent,
    IconComponent,
    ModalComponent,
    PlotMapComponent,
    RouterLink,
    StatCardsComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".layout[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 16px;\n      }\n      @media (min-width: 1100px) {\n        .layout[_ngcontent-%COMP%] {\n          grid-template-columns: 340px minmax(0, 1fr);\n          align-items: start;\n        }\n      }\n      .cases[_ngcontent-%COMP%] {\n        max-height: 72vh;\n        overflow-y: auto;\n      }\n      .case[_ngcontent-%COMP%] {\n        display: flex;\n        width: 100%;\n        align-items: center;\n        gap: 12px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 12px 16px;\n        text-align: left;\n        cursor: pointer;\n        transition: background-color 0.15s ease;\n      }\n      .case[_ngcontent-%COMP%]:first-child {\n        border-top: none;\n      }\n      .case[_ngcontent-%COMP%]:hover {\n        background: var(--%NS%v2-creme);\n      }\n      .case.on[_ngcontent-%COMP%] {\n        background: var(--%NS%v2-sauge);\n        box-shadow: inset 4px 0 0 var(--%NS%v2-foret);\n      }\n      .pair[_ngcontent-%COMP%] {\n        position: relative;\n        height: 40px;\n        width: 58px;\n        flex-shrink: 0;\n      }\n      .pair[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%] {\n        position: absolute;\n        height: 32px;\n        width: 32px;\n        font-size: 11px;\n        border: 2px solid var(--%NS%v2-blanc);\n      }\n      .pair[_ngcontent-%COMP%]   .b[_ngcontent-%COMP%] {\n        left: 24px;\n        top: 8px;\n        background: var(--%NS%v2-culture-bg);\n        color: var(--%NS%v2-culture-fg);\n      }\n      .score[_ngcontent-%COMP%] {\n        display: grid;\n        height: 64px;\n        width: 64px;\n        flex-shrink: 0;\n        place-items: center;\n        border-radius: 999px;\n        font-size: 17px;\n        font-weight: 800;\n      }\n      .cmp[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n        font-family: var(--%NS%v2-font-mono);\n        font-size: 11px;\n        letter-spacing: 0.08em;\n        text-transform: uppercase;\n        color: var(--%NS%v2-gris-texte);\n        padding: 10px 14px;\n        text-align: left;\n      }\n      .cmp[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 10px 14px;\n        font-size: 14px;\n      }\n      .cmp[_ngcontent-%COMP%]   tr.diff[_ngcontent-%COMP%]   td.v[_ngcontent-%COMP%] {\n        background: color-mix(in oklab, var(--%NS%v2-attente-bg) 55%, transparent);\n        font-weight: 800;\n      }\n      .choices[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n        gap: 8px;\n      }\n      .choice[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        border-radius: 14px;\n        border: 1.5px solid var(--%NS%v2-bord-carte);\n        padding: 10px 12px;\n        text-align: left;\n        font-size: 13px;\n        font-weight: 800;\n        cursor: pointer;\n      }\n      .choice[_ngcontent-%COMP%]:hover {\n        border-color: var(--%NS%v2-gris-texte);\n      }\n      .choice.on[_ngcontent-%COMP%] {\n        border: 2px solid var(--%NS%v2-foret);\n        background: var(--%NS%v2-sauge);\n        padding: 9.5px 11.5px;\n      }\n      .choice[_ngcontent-%COMP%]   .d[_ngcontent-%COMP%] {\n        height: 10px;\n        width: 10px;\n        flex-shrink: 0;\n        border-radius: 999px;\n      }\n      .map[_ngcontent-%COMP%] {\n        height: 240px;\n      }"]
}), _a);

export { QualiteDoublonsPage as default };
//# sourceMappingURL=qualite.doublons.page-CS67bCPi.mjs.map

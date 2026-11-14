import { i as inject, A as ActivatedRoute, F as signal, c as computed, ɵ as __defineComponent, d as RouterLink, f as __elementStart, j as __conditionalCreate, h as __elementEnd, n as __property, o as __advance, s as __conditional, w as __nextContext, b as __element, g as __text, p as __textInterpolate, L as __getCurrentView, m as __repeaterCreate, H as __listener, O as __restoreView, P as __resetView, r as __pureFunction1, q as __textInterpolate1, z as __classProp, v as __repeater, u as __attribute, N as __textInterpolate2, t as __styleProp } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { L as LocaleService, I as fmtAge, f as fmtDateTime, h as fmtDate, p as maskPhone, D as maskCni, j as nf, n as nf1, i as inScope } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { P as PlotMapComponent } from './plot-map.component-DDK5c2GY.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { i as initialsOf, T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { m as DetailHeroComponent, M as ModalComponent, g as StatCardsComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';
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
  link: "/dashboard/producteurs"
});
var _c1 = (a0) => ["/dashboard/producteurs", a0];
var _c2 = (a0) => ["/dashboard/organisations", a0];
var _c3 = (a0) => ({ code: a0 });
var _c4 = (a0) => ({ n: a0 });
var _forTrack0 = ($index, $item) => $item.campaign + $item.crop;
var _forTrack1 = ($index, $item) => $item.at + $item.field;
var _forTrack2 = ($index, $item) => $item.id;
var _forTrack3 = ($index, $item) => $item.field + $item.from + $item.to;
function ProducteurDetailPage_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 1)(1, "span", 2);
    __element(2, "ui-icon", 3);
    __elementEnd();
    __elementStart(3, "h1", 4);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 5);
    __text(6);
    __elementEnd();
    __elementStart(7, "a", 6);
    __text(8);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.detail.outOfScope"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.detail.outOfScopeDesc"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.index.title"));
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "button", 62);
    __listener("click", function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_1_Template_button_click_0_listener() {
      __restoreView(_r3);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.openCorrection());
    });
    __element(1, "ui-icon", 63);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r0.t()("producteurs.detail.requestEdit"), " ");
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 9);
    __element(1, "ui-icon", 64);
    __text(2);
    __elementStart(3, "a", 65);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const current_r4 = __nextContext(2);
    const ctx_r0 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r0.t()("producteurs.detail.merged"), " ");
    __advance();
    __property("routerLink", __pureFunction1(4, _c1, current_r4.mergedInto));
    __advance();
    __textInterpolate(ctx_r0.t()("producteurs.detail.seeMain"));
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "button", 66);
    __listener("click", function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_36_Template_button_click_0_listener() {
      __restoreView(_r5);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.openCniDialog());
    });
    __element(1, "ui-icon", 47);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate1("", ctx_r0.t()("producteurs.detail.reveal"), " ");
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "button", 66);
    __listener("click", function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_45_Template_button_click_0_listener() {
      __restoreView(_r6);
      const current_r4 = __nextContext(2);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.revealPhone(current_r4));
    });
    __element(1, "ui-icon", 47);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate1("", ctx_r0.t()("producteurs.detail.reveal"), " ");
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 26);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const organisation_r7 = ctx;
    __property("routerLink", __pureFunction1(2, _c2, organisation_r7.id));
    __advance();
    __textInterpolate(organisation_r7.name);
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 27);
    __text(1, "\u2014");
    __elementEnd();
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_95_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    __elementStart(0, "section", 31)(1, "div", 13)(2, "h2")(3, "span", 14);
    __element(4, "ui-icon", 67);
    __elementEnd();
    __text(5);
    __elementEnd()();
    __elementStart(6, "div", 68);
    __element(7, "app-plot-map", 69);
    __elementEnd();
    __elementStart(8, "p", 70);
    __text(9);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance(4);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r0.t()("producteurs.detail.plotsMap"), " ");
    __advance(2);
    __property("plots", ctx_r0.plots())("selectedId", (_a2 = ctx_r0.selectedPlotId()) != null ? _a2 : ctx_r0.plots()[0].id)("onSelect", ctx_r0.selectPlot);
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.detail.plotsMapHint"));
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_104_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = __getCurrentView();
    __elementStart(0, "tr", 74);
    __listener("click", function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_104_For_18_Template_tr_click_0_listener() {
      const plot_r9 = __restoreView(_r8).$implicit;
      const ctx_r0 = __nextContext(4);
      return __resetView(ctx_r0.selectPlot(plot_r9.id));
    })("keydown.enter", function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_104_For_18_Template_tr_keydown_enter_0_listener() {
      const plot_r9 = __restoreView(_r8).$implicit;
      const ctx_r0 = __nextContext(4);
      return __resetView(ctx_r0.selectPlot(plot_r9.id));
    });
    __elementStart(1, "td")(2, "span", 75);
    __text(3);
    __elementEnd()();
    __elementStart(4, "td", 76);
    __text(5);
    __elementEnd();
    __elementStart(6, "td", 77);
    __text(7);
    __elementEnd();
    __elementStart(8, "td", 78);
    __text(9);
    __elementEnd();
    __elementStart(10, "td", 79);
    __text(11);
    __elementEnd();
    __elementStart(12, "td")(13, "span", 80);
    __text(14);
    __elementEnd()()();
  }
  if (rf & 2) {
    const plot_r9 = ctx.$implicit;
    const ctx_r0 = __nextContext(4);
    __classProp("font-bold", ctx_r0.selectedPlotId() === plot_r9.id);
    __attribute("aria-label", ctx_r0.t()("producteurs.v2.viewPlot", __pureFunction1(13, _c3, plot_r9.code)));
    __advance(3);
    __textInterpolate(plot_r9.code);
    __advance(2);
    __textInterpolate(plot_r9.crop);
    __advance(2);
    __textInterpolate1("", ctx_r0.nf1.format(plot_r9.declared), " ha");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.nf1.format(plot_r9.measured), " ha ");
    __advance(2);
    __textInterpolate(plot_r9.campaign);
    __advance(2);
    __styleProp("background", ctx_r0.plotTone(plot_r9.status).bg)("color", ctx_r0.plotTone(plot_r9.status).fg);
    __advance();
    __textInterpolate(plot_r9.status);
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_104_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 35)(1, "table", 71)(2, "thead")(3, "tr")(4, "th");
    __text(5);
    __elementEnd();
    __elementStart(6, "th");
    __text(7);
    __elementEnd();
    __elementStart(8, "th", 72);
    __text(9);
    __elementEnd();
    __elementStart(10, "th", 72);
    __text(11);
    __elementEnd();
    __elementStart(12, "th");
    __text(13);
    __elementEnd();
    __elementStart(14, "th");
    __text(15);
    __elementEnd()()();
    __elementStart(16, "tbody");
    __repeaterCreate(17, ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_104_For_18_Template, 15, 15, "tr", 73, _forTrack2);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance(5);
    __textInterpolate(ctx_r0.t()("producteurs.v2.col.plot"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.v2.col.crop"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.v2.col.declared"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.v2.col.measured"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.v2.col.campaign"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.v2.col.status"));
    __advance(2);
    __repeater(ctx_r0.plots());
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_105_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 36);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("producteurs.detail.plots.empty"), " ");
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_For_117_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 39)(1, "span", 81);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 82);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 83);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const crop_r10 = ctx.$implicit;
    const ctx_r0 = __nextContext(3);
    __advance(2);
    __textInterpolate(crop_r10.crop.slice(0, 2).toUpperCase());
    __advance(2);
    __textInterpolate(crop_r10.crop);
    __advance(2);
    __textInterpolate2("", crop_r10.campaign, " \xB7 ", ctx_r0.nf1.format(crop_r10.area), " ha");
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_ForEmpty_118_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 36);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("producteurs.detail.crops.empty"), " ");
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_For_129_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li");
    __element(1, "span", 84);
    __elementStart(2, "span", 85)(3, "span", 86);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 87)(6, "span", 88);
    __text(7);
    __elementEnd();
    __text(8, " \u2192 ");
    __elementStart(9, "b");
    __text(10);
    __elementEnd()();
    __elementStart(11, "span", 89);
    __text(12);
    __elementEnd()()();
  }
  if (rf & 2) {
    const historyEntry_r11 = ctx.$implicit;
    const ctx_r0 = __nextContext(3);
    __advance(4);
    __textInterpolate(historyEntry_r11.field);
    __advance(3);
    __textInterpolate(historyEntry_r11.from || ctx_r0.t()("producteurs.notSet"));
    __advance(3);
    __textInterpolate(historyEntry_r11.to);
    __advance(2);
    __textInterpolate2("", ctx_r0.fmtDateTime(historyEntry_r11.at), " \xB7 ", historyEntry_r11.by);
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_ForEmpty_130_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 5);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r0.t()("producteurs.detail.history.empty"));
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_155_For_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p")(1, "b");
    __text(2);
    __elementEnd();
    __text(3, " : ");
    __elementStart(4, "span", 88);
    __text(5);
    __elementEnd();
    __text(6, " \u2192 ");
    __elementStart(7, "b", 90);
    __text(8);
    __elementEnd()();
  }
  if (rf & 2) {
    const change_r12 = ctx.$implicit;
    const ctx_r0 = __nextContext(4);
    __advance(2);
    __textInterpolate(change_r12.field);
    __advance(3);
    __textInterpolate(ctx_r0.showVal(change_r12.field, change_r12.from));
    __advance(3);
    __textInterpolate(ctx_r0.showVal(change_r12.field, change_r12.to));
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_155_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 58)(1, "p", 55);
    __text(2);
    __elementEnd();
    __repeaterCreate(3, ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_155_For_4_Template, 9, 3, "p", null, _forTrack3);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("producteurs.detail.correction.beforeAfter", __pureFunction1(1, _c4, ctx_r0.correctionChanges().length)), " ");
    __advance();
    __repeater(ctx_r0.correctionChanges());
  }
}
function ProducteurDetailPage_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = __getCurrentView();
    __elementStart(0, "ui-detail-hero", 7);
    __conditionalCreate(1, ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_1_Template, 3, 2, "button", 8);
    __elementEnd();
    __conditionalCreate(2, ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_2_Template, 5, 6, "p", 9);
    __element(3, "ui-stat-cards", 10);
    __elementStart(4, "div", 11)(5, "section", 12)(6, "div", 13)(7, "h2")(8, "span", 14);
    __element(9, "ui-icon", 15);
    __elementEnd();
    __text(10);
    __elementEnd()();
    __elementStart(11, "dl", 16)(12, "div", 17)(13, "span", 18);
    __element(14, "ui-icon", 15);
    __elementEnd();
    __elementStart(15, "div")(16, "dt");
    __text(17);
    __elementEnd();
    __elementStart(18, "dd");
    __text(19);
    __elementEnd()()();
    __elementStart(20, "div", 17)(21, "span", 18);
    __element(22, "ui-icon", 19);
    __elementEnd();
    __elementStart(23, "div")(24, "dt");
    __text(25);
    __elementEnd();
    __elementStart(26, "dd");
    __text(27);
    __elementEnd()()();
    __elementStart(28, "div", 17)(29, "span", 18);
    __element(30, "ui-icon", 20);
    __elementEnd();
    __elementStart(31, "div")(32, "dt");
    __text(33);
    __elementEnd();
    __elementStart(34, "dd", 21);
    __text(35);
    __conditionalCreate(36, ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_36_Template, 3, 2, "button", 22);
    __elementEnd()()();
    __elementStart(37, "div", 17)(38, "span", 18);
    __element(39, "ui-icon", 23);
    __elementEnd();
    __elementStart(40, "div")(41, "dt");
    __text(42);
    __elementEnd();
    __elementStart(43, "dd", 21);
    __text(44);
    __conditionalCreate(45, ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_45_Template, 3, 2, "button", 22);
    __elementEnd()()();
    __elementStart(46, "div", 17)(47, "span", 18);
    __element(48, "ui-icon", 24);
    __elementEnd();
    __elementStart(49, "div")(50, "dt");
    __text(51);
    __elementEnd();
    __elementStart(52, "dd");
    __text(53);
    __elementEnd()()();
    __elementStart(54, "div", 17)(55, "span", 18);
    __element(56, "ui-icon", 25);
    __elementEnd();
    __elementStart(57, "div")(58, "dt");
    __text(59);
    __elementEnd();
    __elementStart(60, "dd");
    __conditionalCreate(61, ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_61_Template, 2, 4, "a", 26)(62, ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_62_Template, 2, 0, "span", 27);
    __elementEnd()()();
    __elementStart(63, "div", 17)(64, "span", 18);
    __element(65, "ui-icon", 28);
    __elementEnd();
    __elementStart(66, "div")(67, "dt");
    __text(68);
    __elementEnd();
    __elementStart(69, "dd");
    __text(70);
    __elementEnd()()();
    __elementStart(71, "div", 17)(72, "span", 18);
    __element(73, "ui-icon", 29);
    __elementEnd();
    __elementStart(74, "div")(75, "dt");
    __text(76);
    __elementEnd();
    __elementStart(77, "dd");
    __text(78);
    __elementEnd()()();
    __elementStart(79, "div", 17)(80, "span", 18);
    __element(81, "ui-icon", 20);
    __elementEnd();
    __elementStart(82, "div")(83, "dt");
    __text(84);
    __elementEnd();
    __elementStart(85, "dd");
    __text(86);
    __elementEnd()()();
    __elementStart(87, "div", 17)(88, "span", 18);
    __element(89, "ui-icon", 30);
    __elementEnd();
    __elementStart(90, "div")(91, "dt");
    __text(92);
    __elementEnd();
    __elementStart(93, "dd");
    __text(94);
    __elementEnd()()()()();
    __conditionalCreate(95, ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_95_Template, 10, 6, "section", 31);
    __elementEnd();
    __elementStart(96, "section", 32)(97, "div", 13)(98, "h2")(99, "span", 14);
    __element(100, "ui-icon", 33);
    __elementEnd();
    __text(101);
    __elementStart(102, "span", 34);
    __text(103);
    __elementEnd()()();
    __conditionalCreate(104, ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_104_Template, 19, 6, "div", 35)(105, ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_105_Template, 2, 1, "p", 36);
    __elementEnd();
    __elementStart(106, "div", 37)(107, "section", 12)(108, "div", 13)(109, "h2")(110, "span", 14);
    __element(111, "ui-icon", 38);
    __elementEnd();
    __text(112);
    __elementStart(113, "span", 34);
    __text(114);
    __elementEnd()()();
    __elementStart(115, "ul");
    __repeaterCreate(116, ProducteurDetailPage_Conditional_1_Conditional_1_For_117_Template, 7, 4, "li", 39, _forTrack0, false, ProducteurDetailPage_Conditional_1_Conditional_1_ForEmpty_118_Template, 2, 1, "li", 36);
    __elementEnd()();
    __elementStart(119, "section", 12)(120, "div", 13)(121, "h2")(122, "span", 14);
    __element(123, "ui-icon", 30);
    __elementEnd();
    __text(124);
    __elementStart(125, "span", 34);
    __text(126);
    __elementEnd()()();
    __elementStart(127, "ol", 40);
    __repeaterCreate(128, ProducteurDetailPage_Conditional_1_Conditional_1_For_129_Template, 13, 5, "li", null, _forTrack1, false, ProducteurDetailPage_Conditional_1_Conditional_1_ForEmpty_130_Template, 2, 1, "li", 5);
    __elementEnd()()();
    __elementStart(131, "ui-modal", 41);
    __listener("closed", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_ui_modal_closed_131_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.closeCniDialog());
    });
    __elementStart(132, "label", 42);
    __text(133);
    __elementEnd();
    __elementStart(134, "textarea", 43);
    __listener("input", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_textarea_input_134_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.cniReason.set($event.target.value));
    });
    __elementEnd();
    __elementStart(135, "button", 44);
    __listener("click", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_button_click_135_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.closeCniDialog());
    });
    __text(136);
    __elementEnd();
    __elementStart(137, "button", 45);
    __listener("click", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_button_click_137_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.confirmRevealCni());
    });
    __text(138);
    __elementStart(139, "span", 46);
    __element(140, "ui-icon", 47);
    __elementEnd()()();
    __elementStart(141, "ui-modal", 48);
    __listener("closed", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_ui_modal_closed_141_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.correctionOpen.set(false));
    });
    __elementStart(142, "div", 49)(143, "ui-text-field", 50);
    __listener("valueChange", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_ui_text_field_valueChange_143_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.corrFirstName.set($event));
    });
    __elementEnd();
    __elementStart(144, "ui-text-field", 51);
    __listener("valueChange", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_ui_text_field_valueChange_144_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.corrLastName.set($event));
    });
    __elementEnd();
    __elementStart(145, "ui-text-field", 52);
    __listener("valueChange", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_ui_text_field_valueChange_145_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.corrPhone.set($event));
    });
    __elementEnd();
    __elementStart(146, "ui-text-field", 53);
    __listener("valueChange", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_ui_text_field_valueChange_146_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.corrAge.set($event));
    });
    __elementEnd();
    __elementStart(147, "div", 54)(148, "p", 55);
    __text(149);
    __elementEnd();
    __elementStart(150, "div", 56)(151, "button", 57);
    __listener("click", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_button_click_151_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.corrStatus.set("recens\xE9"));
    });
    __text(152);
    __elementEnd();
    __elementStart(153, "button", 57);
    __listener("click", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_button_click_153_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.corrStatus.set("membre"));
    });
    __text(154);
    __elementEnd()()();
    __conditionalCreate(155, ProducteurDetailPage_Conditional_1_Conditional_1_Conditional_155_Template, 5, 3, "div", 58);
    __elementStart(156, "div", 54)(157, "label", 59);
    __text(158);
    __elementEnd();
    __elementStart(159, "textarea", 60);
    __listener("input", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_textarea_input_159_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.corrMotif.set($event.target.value));
    });
    __elementEnd()()();
    __elementStart(160, "button", 44);
    __listener("click", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_button_click_160_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.correctionOpen.set(false));
    });
    __text(161);
    __elementEnd();
    __elementStart(162, "button", 45);
    __listener("click", function ProducteurDetailPage_Conditional_1_Conditional_1_Template_button_click_162_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.submitCorrectionForm());
    });
    __text(163);
    __elementStart(164, "span", 46);
    __element(165, "ui-icon", 61);
    __elementEnd()()();
  }
  if (rf & 2) {
    let tmp_36_0;
    const current_r4 = __nextContext();
    const ctx_r0 = __nextContext();
    __property("crumb", __pureFunction1(106, _c0, ctx_r0.t()("producteurs.index.title")))("title", current_r4.firstName + " " + current_r4.lastName)("eyebrow", current_r4.code)("mono", ctx_r0.initials(current_r4.firstName + " " + current_r4.lastName))("badges", ctx_r0.heroBadges())("meta", ctx_r0.heroMeta())("backLabel", ctx_r0.t()("producteurs.fiche.back"));
    __advance();
    __conditional(ctx_r0.store.can("producer.edit") ? 1 : -1);
    __advance();
    __conditional(current_r4.mergedInto ? 2 : -1);
    __advance();
    __property("stats", ctx_r0.stats());
    __advance(6);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r0.t()("producteurs.detail.identity"), " ");
    __advance(4);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r0.t()("producteurs.detail.sex"));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()(current_r4.sex === "F" ? "producteurs.sex.F" : "producteurs.sex.H"), " ");
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r0.t()("producteurs.detail.age"));
    __advance();
    __classProp("zero", current_r4.age === null);
    __advance();
    __textInterpolate1(" ", current_r4.age === null ? "\u2014" : ctx_r0.fmtAge(current_r4.age), " ");
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r0.t()("producteurs.detail.cni"));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.showCni() ? current_r4.cni || ctx_r0.t()("producteurs.notSet") : ctx_r0.maskCni(current_r4.cni), " ");
    __advance();
    __conditional(ctx_r0.canCni() && current_r4.cni && !ctx_r0.showCni() ? 36 : -1);
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r0.t()("producteurs.detail.phone"));
    __advance();
    __classProp("zero", !current_r4.phone);
    __advance();
    __textInterpolate1(" ", ctx_r0.showPhone() || ctx_r0.store.can("contact.read") ? current_r4.phone || "\u2014" : ctx_r0.maskPhone(current_r4.phone), " ");
    __advance();
    __conditional(current_r4.phone && !ctx_r0.showPhone() && !ctx_r0.store.can("contact.read") && ctx_r0.store.can("producer.edit") ? 45 : -1);
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r0.t()("producteurs.col.village"));
    __advance(2);
    __textInterpolate(current_r4.village);
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r0.t()("producteurs.detail.organisation"));
    __advance(2);
    __conditional((tmp_36_0 = ctx_r0.org(current_r4.orgId)) ? 61 : 62, tmp_36_0);
    __advance(4);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r0.t()("producteurs.v2.coop"));
    __advance(2);
    __textInterpolate(ctx_r0.scoopName(current_r4.scoopId));
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r0.t()("producteurs.detail.handicap"));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()(current_r4.handicap ? "producteurs.detail.yes" : "producteurs.detail.no"), " ");
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r0.t()("producteurs.detail.enumerator"));
    __advance(2);
    __textInterpolate(current_r4.enumerator);
    __advance(3);
    __property("size", 18);
    __advance(3);
    __textInterpolate(ctx_r0.t()("producteurs.detail.createdAt"));
    __advance(2);
    __textInterpolate(ctx_r0.fmtDate(current_r4.createdAt));
    __advance();
    __conditional(ctx_r0.plots().length && ctx_r0.store.can("map.read") ? 95 : -1);
    __advance(5);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r0.t()("producteurs.detail.section.plots"));
    __advance(2);
    __textInterpolate(ctx_r0.nf.format(ctx_r0.plots().length));
    __advance();
    __conditional(ctx_r0.plots().length ? 104 : 105);
    __advance(7);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r0.t()("producteurs.detail.section.crops"));
    __advance(2);
    __textInterpolate(current_r4.crops.length);
    __advance(2);
    __repeater(current_r4.crops);
    __advance(7);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r0.t()("producteurs.detail.section.history"));
    __advance(2);
    __textInterpolate(current_r4.history.length);
    __advance(2);
    __repeater(current_r4.history);
    __advance(3);
    __property("open", ctx_r0.cniOpen())("title", ctx_r0.t()("producteurs.detail.cniDialog.title"))("description", ctx_r0.t()("producteurs.detail.cniDialog.description"))("width", 540)("closeLabel", ctx_r0.t()("common.close"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.detail.cniDialog.reason"));
    __advance();
    __property("placeholder", ctx_r0.t()("producteurs.detail.cniDialog.reasonPlaceholder"))("value", ctx_r0.cniReason());
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("common.cancel"), " ");
    __advance();
    __property("disabled", ctx_r0.cniReason().trim().length < 3);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("producteurs.detail.cniDialog.submit"));
    __advance(2);
    __property("size", 18);
    __advance();
    __property("open", ctx_r0.correctionOpen())("title", ctx_r0.correctionDialogTitle())("description", ctx_r0.t()("producteurs.detail.correction.description"))("width", 640)("closeLabel", ctx_r0.t()("common.close"));
    __advance(2);
    __property("label", ctx_r0.t()("producteurs.detail.correction.firstName"))("value", ctx_r0.corrFirstName());
    __advance();
    __property("label", ctx_r0.t()("producteurs.detail.correction.lastName"))("value", ctx_r0.corrLastName());
    __advance();
    __property("label", ctx_r0.t()("producteurs.detail.correction.phone"))("value", ctx_r0.corrPhone())("error", ctx_r0.corrPhoneErr());
    __advance();
    __property("label", ctx_r0.t()("producteurs.detail.correction.age"))("value", ctx_r0.corrAge())("error", ctx_r0.corrAgeErr());
    __advance(3);
    __textInterpolate(ctx_r0.t()("producteurs.detail.correction.status"));
    __advance();
    __attribute("aria-label", ctx_r0.t()("producteurs.detail.correction.status"));
    __advance();
    __classProp("on", ctx_r0.corrStatus() === "recens\xE9");
    __attribute("aria-checked", ctx_r0.corrStatus() === "recens\xE9");
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("producteurs.status.recens\xE9"), " ");
    __advance();
    __classProp("on", ctx_r0.corrStatus() === "membre");
    __attribute("aria-checked", ctx_r0.corrStatus() === "membre");
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("producteurs.status.membre"), " ");
    __advance();
    __conditional(ctx_r0.correctionChanges().length > 0 ? 155 : -1);
    __advance(3);
    __textInterpolate(ctx_r0.t()("producteurs.detail.correction.motif"));
    __advance();
    __property("placeholder", ctx_r0.t()("producteurs.detail.correction.motifPlaceholder"))("value", ctx_r0.corrMotif());
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("common.cancel"), " ");
    __advance();
    __property("disabled", !ctx_r0.canSubmitCorrection());
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("producteurs.detail.correction.submit"));
    __advance(2);
    __property("size", 18);
  }
}
function ProducteurDetailPage_Conditional_1_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, ProducteurDetailPage_Conditional_1_Conditional_0_Template, 9, 4, "div", 1)(1, ProducteurDetailPage_Conditional_1_Conditional_1_Template, 166, 108);
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __conditional(!ctx_r0.inScopeProducer() ? 0 : 1);
  }
}
function ProducteurDetailPage_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 1)(1, "span", 2);
    __element(2, "ui-icon", 3);
    __elementEnd();
    __elementStart(3, "h1", 4);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 5);
    __text(6);
    __elementEnd();
    __elementStart(7, "a", 6);
    __text(8);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.detail.notFound"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.detail.notFoundDesc"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("producteurs.index.title"));
  }
}
var PLOT_TONE = {
  relev\u00E9e: TONE.info,
  valid\u00E9e: TONE.succes,
  "\xE0 reprendre": TONE.attente,
  chevauchement: TONE.erreur
};
var QUALITY_TONE = {
  valid\u00E9: {
    label: "producteurs.quality.valid\xE9",
    ...TONE.succes
  },
  "\xE0 v\xE9rifier": {
    label: "producteurs.quality.\xE0 v\xE9rifier",
    ...TONE.attente
  },
  doublon: {
    label: "producteurs.quality.doublon",
    ...TONE.info
  },
  invalide: {
    label: "producteurs.quality.invalide",
    ...TONE.erreur
  }
};
var STATUS_KEY = {
  recens\u00E9: "producteurs.status.recens\xE9",
  membre: "producteurs.status.membre"
};
var PHONE_RE = /^7[0678]\s?\d{3}\s?\d{2}\s?\d{2}$/;
var ProducteurDetailPage = (_a = class {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.fmtAge = fmtAge;
    this.fmtDateTime = fmtDateTime;
    this.fmtDate = fmtDate;
    this.maskPhone = maskPhone;
    this.maskCni = maskCni;
    this.nf = nf;
    this.nf1 = nf1;
    this.initials = initialsOf;
    this.STATUS_KEY = STATUS_KEY;
    this.snackbar = inject(SnackbarService);
    this.selectedPlotId = signal(void 0, ...[]);
    this.selectPlot = (id) => this.selectedPlotId.set(id);
    this.showCni = signal(false, ...[]);
    this.showPhone = signal(false, ...[]);
    this.cniOpen = signal(false, ...[]);
    this.cniReason = signal("", ...[]);
    this.correctionOpen = signal(false, ...[]);
    this.corrFirstName = signal("", ...[]);
    this.corrLastName = signal("", ...[]);
    this.corrPhone = signal("", ...[]);
    this.corrAge = signal("", ...[]);
    this.corrStatus = signal("recens\xE9", ...[]);
    this.corrMotif = signal("", ...[]);
    this.id = toSignal(this.route.paramMap.pipe(map((p) => {
      var _a2;
      return (_a2 = p.get("id")) != null ? _a2 : "";
    })), { initialValue: "" });
    this.producer = computed(() => {
      const id = this.id();
      return this.store.state().producers.find((p) => p.id === id);
    }, ...[]);
    this.inScopeProducer = computed(() => {
      const p = this.producer();
      if (!p) return false;
      return inScope([p], this.store.state().session).length === 1;
    }, ...[]);
    this.plots = computed(() => {
      const id = this.id();
      return this.store.state().plots.filter((pl) => pl.producerId === id);
    }, ...[]);
    this.canCni = () => this.store.can("identity.read_full");
    this.heroBadges = computed(() => {
      const p = this.producer();
      if (!p) return [];
      const t = this.t();
      const q = QUALITY_TONE[p.quality];
      return [
        {
          label: t(STATUS_KEY[p.status]),
          tone: p.status === "membre" ? "citron" : "light",
          icon: p.status === "membre" ? "check_circle" : "person"
        },
        {
          label: t(q.label),
          tone: p.quality === "valid\xE9" ? "glass" : p.quality === "invalide" ? "danger" : "warn",
          icon: p.quality === "valid\xE9" ? "task_alt" : "warning"
        },
        ...p.mergedInto ? [{
          label: t("producteurs.detail.merged"),
          tone: "warn",
          icon: "info"
        }] : []
      ];
    }, ...[]);
    this.heroMeta = computed(() => {
      const p = this.producer();
      if (!p) return [];
      const o = this.org(p.orgId);
      return [
        {
          icon: "location_on",
          text: p.village
        },
        ...o ? [{
          icon: "hub",
          text: o.name
        }] : [],
        {
          icon: "apartment",
          text: this.scoopName(p.scoopId)
        }
      ];
    }, ...[]);
    this.stats = computed(() => {
      const p = this.producer();
      if (!p) return [];
      const t = this.t();
      const plots = this.plots();
      const measured = plots.reduce((n, x) => n + (x.measured || 0), 0);
      const declared = plots.reduce((n, x) => n + (x.declared || 0), 0);
      return [
        {
          label: t("producteurs.v2.kpi.plots"),
          value: nf.format(plots.length),
          sub: t("producteurs.v2.kpi.plotsSub", { count: plots.filter((x) => x.status === "valid\xE9e").length }),
          icon: "landscape",
          bg: "",
          fg: ""
        },
        {
          label: t("producteurs.v2.kpi.area"),
          value: `${nf1.format(measured)} ha`,
          sub: t("producteurs.v2.kpi.areaSub", { declared: nf1.format(declared) }),
          icon: "square_foot",
          ...TONE.succes
        },
        {
          label: t("producteurs.v2.kpi.crops"),
          value: nf.format(p.crops.length),
          sub: t("producteurs.v2.kpi.cropsSub", { count: new Set(p.crops.map((c) => c.campaign)).size }),
          icon: "grass",
          ...TONE.culture
        },
        {
          label: t("producteurs.v2.kpi.changes"),
          value: nf.format(p.history.length),
          sub: t("producteurs.v2.kpi.changesSub"),
          icon: "event_note",
          ...TONE.info
        }
      ];
    }, ...[]);
    this.correctionDialogTitle = computed(() => {
      const p = this.producer();
      if (!p) return "";
      return this.t()("producteurs.detail.correction.title", { name: `${p.firstName} ${p.lastName}` });
    }, ...[]);
  }
  plotTone(status) {
    var _a2;
    return (_a2 = PLOT_TONE[status]) != null ? _a2 : TONE.neutre;
  }
  scoopName(id) {
    var _a2, _b;
    return (_b = (_a2 = this.store.state().scoops.find((c) => c.id === id)) == null ? void 0 : _a2.name) != null ? _b : id;
  }
  org(orgId) {
    const o = this.store.state().orgs.find((x) => x.id === orgId);
    return o ? {
      id: o.id,
      name: o.name
    } : void 0;
  }
  showVal(field, v) {
    const tr = this.t();
    if (field === "T\xE9l\xE9phone") return v ? maskPhone(v) : tr("producteurs.notSet");
    if (field === "CNI") return v ? maskCni(v) : tr("producteurs.notSet");
    return v || tr("producteurs.notSet");
  }
  corrPhoneErr() {
    if (!this.correctionOpen()) return "";
    const phone = this.corrPhone().trim();
    if (!phone) return "";
    return PHONE_RE.test(phone) ? "" : this.t()("producteurs.detail.correction.phoneError");
  }
  corrAgeErr() {
    if (!this.correctionOpen()) return "";
    const raw = this.corrAge().trim();
    if (raw === "") return "";
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 15 || n > 100) return this.t()("producteurs.detail.correction.ageError");
    return "";
  }
  correctionChanges() {
    const p = this.producer();
    if (!p || !this.correctionOpen()) return [];
    const out = [];
    if (this.corrFirstName() !== p.firstName) out.push({
      field: "Pr\xE9nom",
      from: p.firstName,
      to: this.corrFirstName()
    });
    if (this.corrLastName() !== p.lastName) out.push({
      field: "Nom",
      from: p.lastName,
      to: this.corrLastName()
    });
    if (this.corrPhone().trim() !== p.phone) out.push({
      field: "T\xE9l\xE9phone",
      from: p.phone,
      to: this.corrPhone().trim()
    });
    const ageRaw = this.corrAge().trim();
    const ageN = ageRaw === "" ? null : Number(ageRaw);
    if (ageN !== null && ageN !== p.age) out.push({
      field: "\xC2ge",
      from: p.age === null ? "" : String(p.age),
      to: String(ageN)
    });
    if (this.corrStatus() !== p.status) out.push({
      field: "Statut d'adh\xE9sion",
      from: p.status,
      to: this.corrStatus()
    });
    return out;
  }
  canSubmitCorrection() {
    if (!this.producer()) return false;
    return this.correctionChanges().length > 0 && this.corrMotif().trim().length >= 10 && !this.corrPhoneErr() && !this.corrAgeErr();
  }
  openCniDialog() {
    this.cniReason.set("");
    this.cniOpen.set(true);
  }
  closeCniDialog() {
    this.cniOpen.set(false);
    this.cniReason.set("");
  }
  confirmRevealCni() {
    const p = this.producer();
    if (!p) return;
    try {
      this.store.actions.revealCni(p, this.cniReason().trim());
      this.showCni.set(true);
      this.snackbar.info(this.t()("producteurs.detail.revealed"));
      this.closeCniDialog();
    } catch {
      this.snackbar.error(this.t()("producteurs.detail.cniDialog.tooShort"));
    }
  }
  revealPhone(p) {
    this.store.actions.revealPhone(p);
    this.showPhone.set(true);
    this.snackbar.info(this.t()("producteurs.detail.revealed"));
  }
  openCorrection() {
    const p = this.producer();
    if (!p) return;
    this.corrFirstName.set(p.firstName);
    this.corrLastName.set(p.lastName);
    this.corrPhone.set(p.phone);
    this.corrAge.set(p.age === null ? "" : String(p.age));
    this.corrStatus.set(p.status);
    this.corrMotif.set("");
    this.correctionOpen.set(true);
  }
  submitCorrectionForm() {
    const p = this.producer();
    if (!p || !this.canSubmitCorrection()) return;
    this.store.actions.submitCorrection(p.id, this.correctionChanges(), this.corrMotif().trim());
    this.correctionOpen.set(false);
    this.snackbar.success(`${this.t()("producteurs.detail.correction.sent")} \xB7 ${this.t()("producteurs.detail.correction.sentDesc")}`);
  }
}, _a.\u0275fac = function ProducteurDetailPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-producteur-detail-page"]],
  decls: 3,
  vars: 2,
  consts: [
    [
      "perm",
      "producer.read",
      3,
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
      "warning",
      3,
      "size"
    ],
    [
      1,
      "text-[22px]",
      "font-extrabold"
    ],
    [1, "sub"],
    [
      "routerLink",
      "/dashboard/producteurs",
      1,
      "btn",
      "btn-ghost",
      "mt-2"
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
      "hero-actions",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-citron"
    ],
    [
      1,
      "notice",
      "mt-4",
      2,
      "background",
      "var(--v2-info-bg)",
      "color",
      "var(--v2-info-fg)"
    ],
    [
      1,
      "rise",
      "mt-6",
      3,
      "stats"
    ],
    [
      1,
      "grid-main",
      "mt-6"
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
    [1, "facts"],
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
      "badge",
      3,
      "size"
    ],
    [1, "tabular-nums"],
    [
      "type",
      "button",
      1,
      "reveal"
    ],
    [
      "name",
      "call",
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
      1,
      "underline",
      "decoration-[var(--v2-gris-trait)]",
      "underline-offset-4",
      "hover:text-[var(--v2-vert-pousse)]",
      3,
      "routerLink"
    ],
    [1, "zero"],
    [
      "name",
      "apartment",
      3,
      "size"
    ],
    [
      "name",
      "accessibility",
      3,
      "size"
    ],
    [
      "name",
      "event_note",
      3,
      "size"
    ],
    [
      1,
      "sec-card",
      "flex",
      "flex-col"
    ],
    [
      1,
      "sec-card",
      "mt-4"
    ],
    [
      "name",
      "landscape",
      3,
      "size"
    ],
    [1, "n"],
    [1, "overflow-x-auto"],
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
      1,
      "mt-4",
      "grid",
      "gap-4",
      "lg:grid-cols-2"
    ],
    [
      "name",
      "grass",
      3,
      "size"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-3",
      "border-t",
      "px-5",
      "py-3",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [1, "timeline"],
    [
      "icon",
      "badge",
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
      "cni-reason",
      1,
      "lbl"
    ],
    [
      "id",
      "cni-reason",
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
      "visibility",
      3,
      "size"
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
      "grid",
      "gap-5",
      "pb-5",
      "sm:grid-cols-2"
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
      1,
      "chg",
      "sm:col-span-2"
    ],
    [
      "for",
      "corr-motif",
      1,
      "lbl"
    ],
    [
      "id",
      "corr-motif",
      1,
      "area",
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
      "hero-actions",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-citron",
      3,
      "click"
    ],
    [
      "name",
      "edit",
      3,
      "size"
    ],
    [
      "name",
      "info",
      3,
      "size"
    ],
    [
      1,
      "underline",
      3,
      "routerLink"
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
      "map",
      3,
      "size"
    ],
    [
      1,
      "map",
      "flex-1",
      "border-t",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      "basemap",
      "sat",
      3,
      "plots",
      "selectedId",
      "onSelect"
    ],
    [
      1,
      "sub",
      "px-5",
      "py-3"
    ],
    [
      1,
      "tbl",
      "min-w-[640px]"
    ],
    [1, "text-right"],
    [
      "tabindex",
      "0",
      1,
      "row-link",
      3,
      "font-bold"
    ],
    [
      "tabindex",
      "0",
      1,
      "row-link",
      3,
      "click",
      "keydown.enter"
    ],
    [
      1,
      "mono",
      2,
      "color",
      "var(--v2-foret)"
    ],
    [1, "font-semibold"],
    [
      1,
      "text-right",
      "tabular-nums"
    ],
    [
      1,
      "text-right",
      "font-extrabold",
      "tabular-nums"
    ],
    [1, "font-medium"],
    [1, "badge"],
    [
      1,
      "avatar",
      2,
      "height",
      "32px",
      "width",
      "32px",
      "font-size",
      "11px"
    ],
    [
      1,
      "min-w-0",
      "flex-1",
      "font-bold"
    ],
    [
      1,
      "sub",
      "tabular-nums"
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
      "line-through",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "sub",
      "block"
    ],
    [
      2,
      "color",
      "var(--v2-vert-pousse)"
    ]
  ],
  template: function ProducteurDetailPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0);
      __conditionalCreate(1, ProducteurDetailPage_Conditional_1_Template, 2, 1)(2, ProducteurDetailPage_Conditional_2_Template, 9, 4, "div", 1);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      __property("area", ctx.t()("producteurs.detail.area"));
      __advance();
      __conditional((tmp_1_0 = ctx.producer()) ? 1 : 2, tmp_1_0);
    }
  },
  dependencies: [
    AppShellComponent,
    DetailHeroComponent,
    IconComponent,
    ModalComponent,
    PlotMapComponent,
    RouterLink,
    StatCardsComponent,
    TextFieldComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".grid-main[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 16px;\n      }\n      @media (min-width: 1100px) {\n        .grid-main[_ngcontent-%COMP%] {\n          grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);\n        }\n      }\n      .map[_ngcontent-%COMP%] {\n        height: 100%;\n        min-height: 300px;\n      }\n      .timeline[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n        position: relative;\n        display: flex;\n        gap: 14px;\n        padding: 12px 20px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n      }\n      .dot[_ngcontent-%COMP%] {\n        margin-top: 4px;\n        height: 12px;\n        width: 12px;\n        flex-shrink: 0;\n        border-radius: 999px;\n        background: var(--%NS%v2-foret);\n        box-shadow: 0 0 0 4px var(--%NS%v2-sauge);\n      }\n      .chg[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 6px;\n        border-radius: 16px;\n        background: var(--%NS%v2-creme);\n        padding: 12px 14px;\n        font-size: 14px;\n      }\n      .seg-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n        flex: 1;\n        justify-content: center;\n      }"]
}), _a);

export { ProducteurDetailPage as default };
//# sourceMappingURL=producteurs._id_.page-kwPwGPe1.mjs.map

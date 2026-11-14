import { i as inject, D as DOCUMENT$1, F as signal, c as computed, ɵ as __defineComponent, f as __elementStart, g as __text, h as __elementEnd, m as __repeaterCreate, j as __conditionalCreate, n as __property, M as __pureFunction0, o as __advance, p as __textInterpolate, q as __textInterpolate1, u as __attribute, v as __repeater, s as __conditional, b as __element, t as __styleProp, z as __classProp, L as __getCurrentView, H as __listener, w as __nextContext, a0 as __pureFunction3, x as __pureFunction2, O as __restoreView, P as __resetView, V as __repeaterTrackByIdentity, a6 as __repeaterTrackByIndex, T as __textInterpolate3, r as __pureFunction1 } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, f as fmtDateTime, j as nf, _ as REPORT_CATEGORIES, r as isConsolidated, q as scoopIdsOf, $ as catalogueFor, a0 as scopedReports, a1 as scopeLabel, l as downloadCsv } from './locale.service-c0QhtcVY.mjs';
import { d as downloadWorkbook } from './workbook-Ci1z78q0.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { P as PaginationComponent, S as SelectComponent } from './ui-DDO8FoUF.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
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
var _c0 = () => [
  "report.generate",
  "report.read",
  "report.download"
];
var _c1 = (a0) => ({ count: a0 });
var _c2 = (a0, a1, a2) => ({
  rows: a0,
  when: a1,
  who: a2
});
var _c3 = (a0, a1) => ({
  shown: a0,
  total: a1
});
var _c4 = (a0) => ({ rows: a0 });
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.value;
var _forTrack2 = ($index, $item) => $item.id;
function RapportsPage_For_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 13)(1, "span", 14);
    __element(2, "ui-icon", 15);
    __elementEnd();
    __elementStart(3, "div", 16)(4, "span", 17);
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 18);
    __element(7, "ui-icon", 15);
    __elementEnd()();
    __elementStart(8, "span", 19);
    __text(9);
    __elementEnd();
    __elementStart(10, "span", 20);
    __text(11);
    __elementEnd()();
  }
  if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    const \u0275$index_18_r2 = ctx.$index;
    __styleProp("background", \u0275$index_18_r2 === 0 ? null : stat_r1.bg)("border-color", \u0275$index_18_r2 === 0 ? null : "transparent");
    __classProp("hero", \u0275$index_18_r2 === 0);
    __advance();
    __styleProp("color", \u0275$index_18_r2 === 0 ? "var(--v2-citron)" : stat_r1.fg);
    __advance();
    __property("name", stat_r1.icon)("size", 120);
    __advance(2);
    __styleProp("color", \u0275$index_18_r2 === 0 ? "color-mix(in oklab, var(--v2-blanc) 78%, transparent)" : stat_r1.fg);
    __advance();
    __textInterpolate(stat_r1.label);
    __advance();
    __styleProp("background", \u0275$index_18_r2 === 0 ? "var(--v2-citron)" : stat_r1.fg)("color", \u0275$index_18_r2 === 0 ? "var(--v2-foret)" : stat_r1.bg);
    __advance();
    __property("name", stat_r1.icon)("size", 20);
    __advance();
    __styleProp("font-size", stat_r1.small ? 22 : 34, "px")("color", \u0275$index_18_r2 === 0 ? null : stat_r1.fg);
    __advance();
    __textInterpolate(stat_r1.value);
    __advance();
    __styleProp("color", \u0275$index_18_r2 === 0 ? "color-mix(in oklab, var(--v2-blanc) 65%, transparent)" : stat_r1.fg)("opacity", \u0275$index_18_r2 === 0 ? null : 0.75);
    __advance();
    __textInterpolate(stat_r1.sub);
  }
}
function RapportsPage_Conditional_12_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "button", 49);
    __listener("click", function RapportsPage_Conditional_12_For_10_Template_button_click_0_listener() {
      const option_r6 = __restoreView(_r5).$implicit;
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.setCategory(option_r6.value));
    });
    __element(1, "ui-icon", 15);
    __text(2);
    __elementStart(3, "span", 50);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const option_r6 = ctx.$implicit;
    const ctx_r3 = __nextContext(2);
    __classProp("on", ctx_r3.category() === option_r6.value);
    __attribute("aria-selected", ctx_r3.category() === option_r6.value);
    __advance();
    __property("name", option_r6.icon)("size", 16);
    __advance();
    __textInterpolate(option_r6.value === "all" ? ctx_r3.t()("rapports.studio.all") : option_r6.label);
    __advance(2);
    __textInterpolate(option_r6.hint);
  }
}
function RapportsPage_Conditional_12_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 29);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r3.t()("rapports.emptyCat"));
  }
}
function RapportsPage_Conditional_12_Conditional_12_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 56);
    __element(1, "ui-icon", 66);
    __elementEnd();
  }
  if (rf & 2) {
    __advance();
    __property("size", 18);
  }
}
function RapportsPage_Conditional_12_Conditional_12_For_2_Conditional_4_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    __elementStart(0, "span", 57);
    __element(1, "ui-icon", 67);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const report_r8 = __nextContext().$implicit;
    const ctx_r3 = __nextContext(3);
    __attribute("title", ctx_r3.t()("rapports.studio.popularHint", __pureFunction1(3, _c1, (_a2 = ctx_r3.usage().get(report_r8.id)) != null ? _a2 : 0)));
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate1("", ctx_r3.t()("rapports.studio.popular"), " ");
  }
}
function RapportsPage_Conditional_12_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "button", 54);
    __listener("click", function RapportsPage_Conditional_12_Conditional_12_For_2_Template_button_click_0_listener() {
      const report_r8 = __restoreView(_r7).$implicit;
      const ctx_r3 = __nextContext(3);
      return __resetView(ctx_r3.selectedId.set(report_r8.id));
    });
    __elementStart(1, "span", 55);
    __element(2, "ui-icon", 15);
    __elementEnd();
    __conditionalCreate(3, RapportsPage_Conditional_12_Conditional_12_For_2_Conditional_3_Template, 2, 1, "span", 56)(4, RapportsPage_Conditional_12_Conditional_12_For_2_Conditional_4_Template, 3, 5, "span", 57);
    __elementStart(5, "span", 58);
    __element(6, "ui-icon", 15);
    __elementEnd();
    __elementStart(7, "span", 59)(8, "span", 60);
    __text(9);
    __elementEnd();
    __elementStart(10, "span", 61);
    __text(11);
    __elementEnd()();
    __elementStart(12, "span", 62)(13, "span", 63);
    __element(14, "ui-icon", 15);
    __text(15);
    __elementEnd();
    __elementStart(16, "span", 64);
    __element(17, "ui-icon", 65);
    __text(18, "CSV \xB7 Excel ");
    __elementEnd()()();
  }
  if (rf & 2) {
    const report_r8 = ctx.$implicit;
    const ctx_r3 = __nextContext(3);
    __classProp("on", ctx_r3.selectedId() === report_r8.id);
    __attribute("aria-selected", ctx_r3.selectedId() === report_r8.id);
    __advance();
    __styleProp("color", ctx_r3.cat(report_r8.category).fg);
    __advance();
    __property("name", ctx_r3.cat(report_r8.category).icon)("size", 96);
    __advance();
    __conditional(ctx_r3.selectedId() === report_r8.id ? 3 : report_r8.id === ctx_r3.popularId() ? 4 : -1);
    __advance(2);
    __styleProp("background", ctx_r3.cat(report_r8.category).fg)("color", ctx_r3.cat(report_r8.category).bg);
    __advance();
    __property("name", ctx_r3.cat(report_r8.category).icon)("size", 24);
    __advance(3);
    __textInterpolate(ctx_r3.t()(report_r8.nameKey));
    __advance(2);
    __textInterpolate(ctx_r3.t()(report_r8.descriptionKey));
    __advance(2);
    __styleProp("background", ctx_r3.cat(report_r8.category).bg)("color", ctx_r3.cat(report_r8.category).fg);
    __advance();
    __property("name", ctx_r3.cat(report_r8.category).icon)("size", 14);
    __advance();
    __textInterpolate1("", ctx_r3.t()(ctx_r3.cat(report_r8.category).label), " ");
    __advance(2);
    __property("size", 15);
  }
}
function RapportsPage_Conditional_12_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 51);
    __repeaterCreate(1, RapportsPage_Conditional_12_Conditional_12_For_2_Template, 19, 24, "button", 52, _forTrack2);
    __elementEnd();
    __element(3, "ui-pagination", 53);
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __attribute("aria-label", ctx_r3.t()("rapports.studio.catalogue"));
    __advance();
    __repeater(ctx_r3.reportPager.items());
    __advance(2);
    __property("pager", ctx_r3.reportPager);
  }
}
function RapportsPage_Conditional_12_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 36);
    __element(1, "ui-icon", 15);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const selectedReport_r9 = ctx;
    const ctx_r3 = __nextContext(2);
    __advance();
    __styleProp("color", ctx_r3.cat(selectedReport_r9.category).fg);
    __property("name", ctx_r3.cat(selectedReport_r9.category).icon)("size", 18);
    __advance();
    __textInterpolate1(" ", ctx_r3.t()(selectedReport_r9.nameKey), " ");
  }
}
function RapportsPage_Conditional_12_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 37);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r3.t()("rapports.generateNeedSelect"));
  }
}
function RapportsPage_Conditional_12_For_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "button", 68);
    __listener("click", function RapportsPage_Conditional_12_For_38_Template_button_click_0_listener() {
      const periodOption_r11 = __restoreView(_r10).$implicit;
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.period.set(periodOption_r11.id));
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const periodOption_r11 = ctx.$implicit;
    const ctx_r3 = __nextContext(2);
    __classProp("on", ctx_r3.period() === periodOption_r11.id);
    __attribute("aria-checked", ctx_r3.period() === periodOption_r11.id);
    __advance();
    __textInterpolate1(" ", ctx_r3.t()(periodOption_r11.label), " ");
  }
}
function RapportsPage_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "div", 8)(1, "section", 21)(2, "h2", 22);
    __text(3);
    __elementEnd();
    __elementStart(4, "div", 23)(5, "label", 24);
    __element(6, "ui-icon", 25);
    __elementStart(7, "input", 26);
    __listener("input", function RapportsPage_Conditional_12_Template_input_input_7_listener($event) {
      __restoreView(_r3);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.query.set($event.target.value));
    });
    __elementEnd()();
    __elementStart(8, "div", 27);
    __repeaterCreate(9, RapportsPage_Conditional_12_For_10_Template, 5, 7, "button", 28, _forTrack1);
    __elementEnd()();
    __conditionalCreate(11, RapportsPage_Conditional_12_Conditional_11_Template, 2, 1, "p", 29)(12, RapportsPage_Conditional_12_Conditional_12_Template, 4, 2);
    __elementEnd();
    __elementStart(13, "aside", 30)(14, "div", 31)(15, "span", 32);
    __element(16, "ui-icon", 33);
    __elementEnd();
    __elementStart(17, "h2", 34);
    __text(18);
    __elementEnd()();
    __elementStart(19, "div", 35)(20, "p", 3);
    __text(21);
    __elementEnd();
    __conditionalCreate(22, RapportsPage_Conditional_12_Conditional_22_Template, 3, 5, "p", 36)(23, RapportsPage_Conditional_12_Conditional_23_Template, 2, 1, "p", 37);
    __elementEnd();
    __elementStart(24, "div", 38)(25, "div", 39)(26, "span", 40);
    __text(27);
    __elementEnd();
    __elementStart(28, "ui-select", 41);
    __listener("valueChange", function RapportsPage_Conditional_12_Template_ui_select_valueChange_28_listener($event) {
      __restoreView(_r3);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.scoop.set($event));
    });
    __elementEnd()();
    __elementStart(29, "div", 39)(30, "span", 40);
    __text(31);
    __elementEnd();
    __elementStart(32, "ui-select", 41);
    __listener("valueChange", function RapportsPage_Conditional_12_Template_ui_select_valueChange_32_listener($event) {
      __restoreView(_r3);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.campaign.set($event));
    });
    __elementEnd()();
    __elementStart(33, "div", 39)(34, "span", 42);
    __text(35);
    __elementEnd();
    __elementStart(36, "div", 43);
    __repeaterCreate(37, RapportsPage_Conditional_12_For_38_Template, 2, 4, "button", 44, _forTrack2);
    __elementEnd()()();
    __elementStart(39, "p", 45);
    __element(40, "ui-icon", 46);
    __elementStart(41, "span");
    __text(42);
    __elementEnd()();
    __elementStart(43, "button", 47);
    __listener("click", function RapportsPage_Conditional_12_Template_button_click_43_listener() {
      __restoreView(_r3);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.run());
    });
    __elementStart(44, "span");
    __text(45);
    __elementEnd();
    __elementStart(46, "span", 48);
    __element(47, "ui-icon", 15);
    __elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const ctx_r3 = __nextContext();
    __advance(3);
    __textInterpolate(ctx_r3.t()("rapports.studio.catalogue"));
    __advance(3);
    __property("size", 20);
    __advance();
    __property("placeholder", ctx_r3.t()("rapports.studio.search"))("value", ctx_r3.query());
    __attribute("aria-label", ctx_r3.t()("rapports.studio.search"));
    __advance();
    __attribute("aria-label", ctx_r3.t()("rapports.studio.category"));
    __advance();
    __repeater(ctx_r3.categoryOptions());
    __advance(2);
    __conditional(ctx_r3.filtered().length === 0 ? 11 : 12);
    __advance(5);
    __property("size", 22);
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("rapports.studio.configure"), " ");
    __advance(3);
    __textInterpolate(ctx_r3.t()("rapports.selected"));
    __advance();
    __conditional((tmp_12_0 = ctx_r3.selected()) ? 22 : 23, tmp_12_0);
    __advance(5);
    __textInterpolate(ctx_r3.t()("rapports.field.scoop"));
    __advance();
    __property("options", ctx_r3.scoopOptions())("value", ctx_r3.scoop())("label", ctx_r3.t()("rapports.field.scoop"));
    __advance(3);
    __textInterpolate(ctx_r3.t()("rapports.field.campaign"));
    __advance();
    __property("options", ctx_r3.campaignOptions())("value", ctx_r3.campaign())("label", ctx_r3.t()("rapports.field.campaign"));
    __advance(3);
    __textInterpolate(ctx_r3.t()("rapports.field.period"));
    __advance(2);
    __repeater(ctx_r3.periods);
    __advance(3);
    __property("size", 16);
    __advance(2);
    __textInterpolate(ctx_r3.summary());
    __advance();
    __property("disabled", !ctx_r3.selectedId() || ctx_r3.busy());
    __advance(2);
    __textInterpolate(ctx_r3.busy() ? ctx_r3.t()("rapports.generating") : ctx_r3.t()("rapports.studio.generate"));
    __advance(2);
    __classProp("spin", ctx_r3.busy());
    __property("name", ctx_r3.busy() ? "progress_activity" : "arrow_forward")("size", 22);
  }
}
function RapportsPage_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 9);
    __element(1, "ui-icon", 69);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext();
    __advance();
    __property("size", 20);
    __advance();
    __textInterpolate1("", ctx_r3.t()("rapports.noGenerate"), " ");
  }
}
function RapportsPage_Conditional_14_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "div", 75)(1, "button", 82);
    __listener("click", function RapportsPage_Conditional_14_Conditional_11_Template_button_click_1_listener() {
      __restoreView(_r12);
      const previewReport_r13 = __nextContext();
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.download(previewReport_r13, "CSV"));
    });
    __element(2, "ui-icon", 83);
    __text(3);
    __elementEnd();
    __elementStart(4, "button", 84);
    __listener("click", function RapportsPage_Conditional_14_Conditional_11_Template_button_click_4_listener() {
      __restoreView(_r12);
      const previewReport_r13 = __nextContext();
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.download(previewReport_r13, "Excel"));
    });
    __element(5, "ui-icon", 65);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("rapports.csv"), " ");
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("rapports.excel"), " ");
  }
}
function RapportsPage_Conditional_14_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 76);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r3.t()("rapports.downloadDenied"));
  }
}
function RapportsPage_Conditional_14_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 79);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const previewReport_r13 = __nextContext();
    const ctx_r3 = __nextContext();
    __advance();
    __textInterpolate(ctx_r3.t()("rapports.result.truncated", __pureFunction2(1, _c3, ctx_r3.nf.format(ctx_r3.previewLimit), ctx_r3.nf.format(previewReport_r13.rows.length))));
  }
}
function RapportsPage_Conditional_14_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 80);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r3.t()("rapports.result.empty"));
  }
}
function RapportsPage_Conditional_14_Conditional_18_For_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "th", 87);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const header_r14 = ctx.$implicit;
    __advance();
    __textInterpolate1(" ", header_r14, " ");
  }
}
function RapportsPage_Conditional_14_Conditional_18_For_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "td", 89);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const cell_r15 = ctx.$implicit;
    __advance();
    __textInterpolate1(" ", cell_r15, " ");
  }
}
function RapportsPage_Conditional_14_Conditional_18_For_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "tr", 88);
    __repeaterCreate(1, RapportsPage_Conditional_14_Conditional_18_For_8_For_2_Template, 2, 1, "td", 89, __repeaterTrackByIndex);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r16 = ctx.$implicit;
    __advance();
    __repeater(row_r16);
  }
}
function RapportsPage_Conditional_14_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 81)(1, "table", 85)(2, "thead", 86)(3, "tr");
    __repeaterCreate(4, RapportsPage_Conditional_14_Conditional_18_For_5_Template, 2, 1, "th", 87, __repeaterTrackByIdentity);
    __elementEnd()();
    __elementStart(6, "tbody");
    __repeaterCreate(7, RapportsPage_Conditional_14_Conditional_18_For_8_Template, 3, 0, "tr", 88, __repeaterTrackByIndex);
    __elementEnd()()();
  }
  if (rf & 2) {
    const previewReport_r13 = __nextContext();
    const ctx_r3 = __nextContext();
    __advance(4);
    __repeater(previewReport_r13.header);
    __advance(3);
    __repeater(ctx_r3.previewRows(previewReport_r13));
  }
}
function RapportsPage_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 10)(1, "div", 70)(2, "div", 2)(3, "p", 71);
    __text(4);
    __elementEnd();
    __elementStart(5, "h2", 72);
    __text(6);
    __elementEnd();
    __elementStart(7, "p", 73);
    __text(8);
    __elementEnd();
    __elementStart(9, "p", 74);
    __text(10);
    __elementEnd()();
    __conditionalCreate(11, RapportsPage_Conditional_14_Conditional_11_Template, 7, 4, "div", 75)(12, RapportsPage_Conditional_14_Conditional_12_Template, 2, 1, "span", 76);
    __elementEnd();
    __elementStart(13, "div", 77)(14, "h3", 78);
    __text(15);
    __elementEnd();
    __conditionalCreate(16, RapportsPage_Conditional_14_Conditional_16_Template, 2, 4, "span", 79);
    __elementEnd();
    __conditionalCreate(17, RapportsPage_Conditional_14_Conditional_17_Template, 2, 1, "p", 80)(18, RapportsPage_Conditional_14_Conditional_18_Template, 9, 0, "div", 81);
    __elementEnd();
  }
  if (rf & 2) {
    const previewReport_r13 = ctx;
    const ctx_r3 = __nextContext();
    __advance(4);
    __textInterpolate(ctx_r3.t()("rapports.result.title"));
    __advance(2);
    __textInterpolate1(" ", previewReport_r13.name, " ");
    __advance(2);
    __textInterpolate1(" ", previewReport_r13.scopeLabel, " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("rapports.result.meta", __pureFunction3(8, _c2, ctx_r3.nf.format(previewReport_r13.rows.length), ctx_r3.fmtDateTime(previewReport_r13.generatedAt), previewReport_r13.generatedBy)), " ");
    __advance();
    __conditional(ctx_r3.canDownload() ? 11 : 12);
    __advance(4);
    __textInterpolate(ctx_r3.t()("rapports.result.preview"));
    __advance();
    __conditional(previewReport_r13.rows.length > ctx_r3.previewLimit ? 16 : -1);
    __advance();
    __conditional(previewReport_r13.rows.length === 0 ? 17 : 18);
  }
}
function RapportsPage_Conditional_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 91);
    __element(1, "ui-icon", 92);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __property("size", 22);
    __advance();
    __textInterpolate1("", ctx_r3.t()("rapports.history.empty"), " ");
  }
}
function RapportsPage_Conditional_15_Conditional_4_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = __getCurrentView();
    __elementStart(0, "button", 82);
    __listener("click", function RapportsPage_Conditional_15_Conditional_4_For_2_Conditional_12_Template_button_click_0_listener() {
      __restoreView(_r19);
      const report_r18 = __nextContext().$implicit;
      const ctx_r3 = __nextContext(3);
      return __resetView(ctx_r3.download(report_r18, "CSV"));
    });
    __element(1, "ui-icon", 83);
    __text(2);
    __elementEnd();
    __elementStart(3, "button", 101);
    __listener("click", function RapportsPage_Conditional_15_Conditional_4_For_2_Conditional_12_Template_button_click_3_listener() {
      __restoreView(_r19);
      const report_r18 = __nextContext().$implicit;
      const ctx_r3 = __nextContext(3);
      return __resetView(ctx_r3.download(report_r18, "Excel"));
    });
    __element(4, "ui-icon", 65);
    __text(5);
    __elementEnd();
  }
  if (rf & 2) {
    const report_r18 = __nextContext().$implicit;
    const ctx_r3 = __nextContext(3);
    __attribute("aria-label", ctx_r3.t()("rapports.csv") + " \xB7 " + report_r18.name);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("rapports.csv"), " ");
    __advance();
    __attribute("aria-label", ctx_r3.t()("rapports.excel") + " \xB7 " + report_r18.name);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("rapports.excel"), " ");
  }
}
function RapportsPage_Conditional_15_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = __getCurrentView();
    __elementStart(0, "li", 95)(1, "span", 96);
    __element(2, "ui-icon", 97);
    __elementEnd();
    __elementStart(3, "span", 98)(4, "span", 99);
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 100);
    __text(7);
    __elementEnd()();
    __elementStart(8, "span", 75)(9, "button", 82);
    __listener("click", function RapportsPage_Conditional_15_Conditional_4_For_2_Template_button_click_9_listener() {
      const report_r18 = __restoreView(_r17).$implicit;
      const ctx_r3 = __nextContext(3);
      return __resetView(ctx_r3.openResult(report_r18));
    });
    __element(10, "ui-icon", 69);
    __text(11);
    __elementEnd();
    __conditionalCreate(12, RapportsPage_Conditional_15_Conditional_4_For_2_Conditional_12_Template, 6, 6);
    __elementEnd()();
  }
  if (rf & 2) {
    const report_r18 = ctx.$implicit;
    const \u0275$index_279_r20 = ctx.$index;
    const ctx_r3 = __nextContext(3);
    __styleProp("border-top", \u0275$index_279_r20 === 0 ? "none" : "1px solid var(--v2-separateur)");
    __advance(2);
    __property("size", 22);
    __advance(3);
    __textInterpolate(report_r18.name);
    __advance(2);
    __textInterpolate3(" ", report_r18.scopeLabel, " \xB7 ", ctx_r3.fmtDateTime(report_r18.generatedAt), " \xB7 ", ctx_r3.t()("rapports.history.rows", __pureFunction1(10, _c4, ctx_r3.nf.format(report_r18.rows.length))), " ");
    __advance(3);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("rapports.result.open"), " ");
    __advance();
    __conditional(ctx_r3.canDownload() ? 12 : -1);
  }
}
function RapportsPage_Conditional_15_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ul", 93);
    __repeaterCreate(1, RapportsPage_Conditional_15_Conditional_4_For_2_Template, 13, 12, "li", 94, _forTrack2);
    __elementEnd();
    __element(3, "ui-pagination", 53);
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __repeater(ctx_r3.historyPager.items());
    __advance(2);
    __property("pager", ctx_r3.historyPager);
  }
}
function RapportsPage_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 11)(1, "h2", 90);
    __text(2);
    __elementEnd();
    __conditionalCreate(3, RapportsPage_Conditional_15_Conditional_3_Template, 3, 2, "p", 91)(4, RapportsPage_Conditional_15_Conditional_4_Template, 4, 1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext();
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("rapports.history.title"), " ");
    __advance();
    __conditional(ctx_r3.history().length === 0 ? 3 : 4);
  }
}
var CATEGORY = {
  producteurs: {
    label: "rapports.cat.producteurs",
    icon: "agriculture",
    bg: "var(--v2-sauge)",
    fg: "var(--v2-foret)"
  },
  agriculture: {
    label: "rapports.cat.agriculture",
    icon: "potted_plant",
    bg: "var(--v2-culture-bg)",
    fg: "var(--v2-culture-fg)"
  },
  finances: {
    label: "rapports.cat.finances",
    icon: "account_balance_wallet",
    bg: "var(--v2-attente-bg)",
    fg: "var(--v2-attente-fg)"
  },
  gouvernance: {
    label: "rapports.cat.gouvernance",
    icon: "gavel",
    bg: "var(--v2-info-bg)",
    fg: "var(--v2-info-fg)"
  },
  qualite: {
    label: "rapports.cat.qualite",
    icon: "verified",
    bg: "var(--v2-succes-bg)",
    fg: "var(--v2-succes-fg)"
  }
};
var PREVIEW_ROWS = 40;
var fileName = (r, ext) => `${r.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_${r.generatedAt.slice(0, 10)}.${ext}`;
var RapportsPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.snackbar = inject(SnackbarService);
    this.document = inject(DOCUMENT$1);
    this.t = this.locale.t;
    this.fmtDateTime = fmtDateTime;
    this.nf = nf;
    this.categories = REPORT_CATEGORIES;
    this.previewLimit = PREVIEW_ROWS;
    this.periods = [
      {
        id: "campaign",
        label: "rapports.field.period.campaign"
      },
      {
        id: "h1",
        label: "rapports.field.period.h1"
      },
      {
        id: "h2",
        label: "rapports.field.period.h2"
      }
    ];
    this.scoop = signal("", ...[]);
    this.campaign = signal("", ...[]);
    this.period = signal("campaign", ...[]);
    this.category = signal("all", ...[]);
    this.query = signal("", ...[]);
    this.selectedId = signal(null, ...[]);
    this.busy = signal(false, ...[]);
    this.preview = signal(null, ...[]);
    this.session = computed(() => this.store.state().session, ...[]);
    this.canGenerate = computed(() => this.store.can("report.generate"), ...[]);
    this.canRead = computed(() => this.store.can("report.read"), ...[]);
    this.canDownload = computed(() => this.store.can("report.download"), ...[]);
    this.campaigns = computed(() => [...new Set(this.store.state().plots.map((p) => p.campaign))].sort(), ...[]);
    this.visibleScoops = computed(() => {
      const session = this.session();
      const all = this.store.state().scoops;
      if (isConsolidated(session)) return all;
      const ids = scoopIdsOf(session);
      return all.filter((s) => ids.has(s.id));
    }, ...[]);
    this.catalogue = computed(() => catalogueFor(this.session()), ...[]);
    this.filtered = computed(() => {
      const c = this.category();
      const norm = (v) => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const q = norm(this.query().trim());
      const t = this.t();
      return this.catalogue().filter((r) => (c === "all" || r.category === c) && (!q || norm(`${t(r.nameKey)} ${t(r.descriptionKey)}`).includes(q)));
    }, ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const history = this.history();
      const month = Date.now() - 2592e6;
      const recent = history.filter((r) => new Date(r.generatedAt).getTime() >= month).length;
      const downloads = this.store.state().audit.filter((a) => a.action === "T\xE9l\xE9chargement de rapport").length;
      const last = history[0];
      const cats = new Set(this.catalogue().map((r) => r.category)).size;
      return [
        {
          label: t("rapports.studio.available"),
          value: String(this.catalogue().length),
          sub: t("rapports.studio.availableSub", { count: cats }),
          icon: "summarize",
          bg: "var(--v2-sauge)",
          fg: "var(--v2-foret)",
          small: false
        },
        {
          label: t("rapports.studio.generatedLabel"),
          value: String(history.length),
          sub: t("rapports.studio.generatedSub", { count: recent }),
          icon: "lab_profile",
          bg: "var(--v2-info-bg)",
          fg: "var(--v2-info-fg)",
          small: false
        },
        {
          label: t("rapports.studio.downloads"),
          value: String(downloads),
          sub: t("rapports.studio.downloadsSub"),
          icon: "download",
          bg: "var(--v2-attente-bg)",
          fg: "var(--v2-attente-fg)",
          small: false
        },
        {
          label: t("rapports.studio.lastLabel"),
          value: last ? fmtDateTime(last.generatedAt) : "\u2014",
          sub: last ? last.name : t("rapports.studio.lastNone"),
          icon: "history",
          bg: "var(--v2-culture-bg)",
          fg: "var(--v2-culture-fg)",
          small: true
        }
      ];
    }, ...[]);
    this.selected = computed(() => {
      const id = this.selectedId();
      return id ? this.catalogue().find((r) => r.id === id) : void 0;
    }, ...[]);
    this.history = computed(() => this.canRead() ? scopedReports(this.store.state().reports, this.session()) : [], ...[]);
    this.appliedScopeName = computed(() => scopeLabel(this.session(), this.store.state().scoops), ...[]);
    this.summary = computed(() => {
      var _a2, _b;
      const scoops = this.store.state().scoops;
      const id = this.scoop();
      const scoopPart = id ? (_b = (_a2 = scoops.find((s) => s.id === id)) == null ? void 0 : _a2.name) != null ? _b : id : this.visibleScoops().length > 1 ? `${this.visibleScoops().length} coop\xE9ratives` : this.appliedScopeName();
      const campaignPart = this.campaign() || this.t()("rapports.field.allCampaigns");
      const periodLabel = this.periods.find((p) => p.id === this.period()).label;
      return `${scoopPart} \xB7 ${campaignPart} \xB7 ${this.t()(periodLabel)}`;
    }, ...[]);
    this.scoopOptions = computed(() => {
      const scoops = this.visibleScoops();
      const all = {
        value: "",
        label: scoops.length > 1 ? this.t()("rapports.field.allMine") : this.appliedScopeName(),
        icon: "diversity_3",
        hint: scoops.length > 1 ? String(scoops.length) : void 0
      };
      return scoops.length > 1 ? [all, ...scoops.map((sc) => ({
        value: sc.id,
        label: sc.name
      }))] : [all];
    }, ...[]);
    this.campaignOptions = computed(() => [{
      value: "",
      label: this.t()("rapports.field.allCampaigns"),
      icon: "calendar_today"
    }, ...this.campaigns().map((c) => ({
      value: c,
      label: c
    }))], ...[]);
    this.categoryOptions = computed(() => [{
      value: "all",
      label: this.t()("rapports.studio.allCategories"),
      icon: "summarize",
      hint: String(this.catalogue().length)
    }, ...this.categories.filter((c) => this.countIn(c) > 0).map((c) => ({
      value: c,
      label: this.t()(CATEGORY[c].label),
      icon: CATEGORY[c].icon,
      hint: String(this.countIn(c))
    }))], ...[]);
    this.usage = computed(() => {
      var _a2;
      const m = /* @__PURE__ */ new Map();
      for (const r of this.history()) m.set(r.reportId, ((_a2 = m.get(r.reportId)) != null ? _a2 : 0) + 1);
      return m;
    }, ...[]);
    this.popularId = computed(() => {
      let best = null;
      let max = 0;
      for (const [id, n] of this.usage()) if (n > max) [best, max] = [id, n];
      return best;
    }, ...[]);
    this.reportPager = createPager(() => this.filtered());
    this.historyPager = createPager(() => this.history());
  }
  cat(c) {
    return CATEGORY[c];
  }
  countIn(c) {
    return this.catalogue().filter((r) => r.category === c).length;
  }
  previewRows(r) {
    return r.rows.slice(0, PREVIEW_ROWS);
  }
  setCategory(c) {
    this.category.set(c);
    const id = this.selectedId();
    if (id && c !== "all" && !this.catalogue().some((x) => x.id === id && x.category === c)) this.selectedId.set(null);
  }
  openResult(r) {
    this.preview.set(r);
    this.scrollToResult();
  }
  run() {
    const id = this.selectedId();
    if (!id || this.busy()) return;
    this.busy.set(true);
    window.setTimeout(() => {
      const res = this.store.actions.generateReport(id, {
        scoopId: this.scoop() || void 0,
        campaign: this.campaign() || void 0
      });
      this.busy.set(false);
      if (!res.ok) {
        this.snackbar.error(this.t()(res.error));
        return;
      }
      this.preview.set(res.report);
      this.snackbar.success(this.t()("rapports.ready", { name: res.report.name }));
      this.scrollToResult();
    }, 500);
  }
  async download(r, format) {
    const res = this.store.actions.downloadReport(r.id, format);
    if (!res.ok) {
      this.snackbar.error(this.t()(res.error));
      return;
    }
    const head = [
      r.name,
      `P\xE9rim\xE8tre : ${r.scopeLabel}`,
      `\xC9dit\xE9 le ${r.generatedAt.slice(0, 10)}`
    ];
    if (format === "CSV") downloadCsv(fileName(r, "csv"), [
      head,
      r.header,
      ...r.rows
    ]);
    else await downloadWorkbook(fileName(r, "xlsx"), [{
      name: "Rapport",
      rows: [
        head,
        r.header,
        ...r.rows
      ]
    }]);
    this.snackbar.success(this.t()("rapports.studio.downloaded", { format }));
  }
  scrollToResult() {
    setTimeout(() => {
      var _a2;
      return (_a2 = this.document.getElementById("rapport-resultat")) == null ? void 0 : _a2.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 50);
  }
}, _a.\u0275fac = function RapportsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-rapports-page"]],
  decls: 18,
  vars: 11,
  consts: [
    [
      3,
      "perm",
      "area"
    ],
    [
      1,
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
      "mt-8",
      "grid",
      "grid-cols-1",
      "gap-4",
      "sm:grid-cols-2",
      "xl:grid-cols-4"
    ],
    [
      1,
      "card",
      "stat",
      "relative",
      "flex",
      "flex-col",
      "overflow-hidden",
      "p-5",
      3,
      "hero",
      "background",
      "border-color"
    ],
    [
      1,
      "mt-8",
      "grid",
      "items-start",
      "gap-5",
      "lg:grid-cols-[minmax(0,1fr)_300px]"
    ],
    [
      1,
      "card",
      "sub",
      "mt-8",
      "flex",
      "items-center",
      "gap-3",
      "p-6"
    ],
    [
      "id",
      "rapport-resultat",
      "aria-labelledby",
      "result-title",
      1,
      "card",
      "mt-8",
      "overflow-hidden"
    ],
    [
      "aria-labelledby",
      "history-title",
      1,
      "mt-8"
    ],
    [
      1,
      "sub",
      "mt-6"
    ],
    [
      1,
      "card",
      "stat",
      "relative",
      "flex",
      "flex-col",
      "overflow-hidden",
      "p-5"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "watermark"
    ],
    [
      3,
      "name",
      "size"
    ],
    [
      1,
      "relative",
      "flex",
      "items-center",
      "justify-between",
      "gap-3"
    ],
    [
      1,
      "text-[14px]",
      "font-bold"
    ],
    [
      1,
      "grid",
      "size-10",
      "place-items-center",
      "rounded-[12px]"
    ],
    [
      1,
      "relative",
      "mt-3",
      "truncate",
      "font-extrabold",
      "leading-none",
      "tracking-[-0.03em]",
      "tabular-nums"
    ],
    [
      1,
      "relative",
      "mt-2",
      "truncate",
      "text-[13px]",
      "font-medium"
    ],
    ["aria-labelledby", "catalogue-title"],
    [
      "id",
      "catalogue-title",
      1,
      "sr-only"
    ],
    [
      1,
      "toolbar",
      "card"
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
      "tablist",
      1,
      "tabs"
    ],
    [
      "type",
      "button",
      "role",
      "tab",
      1,
      "tab",
      3,
      "on"
    ],
    [
      1,
      "card",
      "sub",
      "mt-5",
      "p-6"
    ],
    [
      "aria-labelledby",
      "config-title",
      1,
      "card",
      "p-6",
      "lg:sticky",
      "lg:top-24"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-3"
    ],
    [
      1,
      "grid",
      "size-11",
      "place-items-center",
      "rounded-[14px]",
      2,
      "background",
      "var(--v2-foret)",
      "color",
      "var(--v2-citron)"
    ],
    [
      "name",
      "tune",
      3,
      "size"
    ],
    [
      "id",
      "config-title",
      1,
      "text-[18px]",
      "font-extrabold",
      "tracking-[-0.02em]"
    ],
    [
      1,
      "mt-5",
      "rounded-[16px]",
      "p-4",
      2,
      "background",
      "var(--v2-creme)"
    ],
    [
      1,
      "mt-1",
      "flex",
      "items-center",
      "gap-2",
      "text-[15px]",
      "font-extrabold"
    ],
    [
      1,
      "sub",
      "mt-1"
    ],
    [
      1,
      "mt-5",
      "space-y-4"
    ],
    [1, "space-y-2"],
    [1, "label"],
    [
      3,
      "valueChange",
      "options",
      "value",
      "label"
    ],
    [
      "id",
      "period-label",
      1,
      "label"
    ],
    [
      "role",
      "radiogroup",
      "aria-labelledby",
      "period-label",
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
      1,
      "sub",
      "mt-5",
      "flex",
      "items-start",
      "gap-2"
    ],
    [
      "name",
      "location_on",
      1,
      "mt-0.5",
      3,
      "size"
    ],
    [
      "type",
      "button",
      1,
      "generate",
      "mt-5",
      3,
      "click",
      "disabled"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "chip"
    ],
    [
      "type",
      "button",
      "role",
      "tab",
      1,
      "tab",
      3,
      "click"
    ],
    [1, "n"],
    [
      "role",
      "listbox",
      1,
      "mt-5",
      "grid",
      "gap-4",
      "sm:grid-cols-2",
      "2xl:grid-cols-3"
    ],
    [
      "type",
      "button",
      "role",
      "option",
      1,
      "card",
      "report",
      "overflow-hidden",
      3,
      "on"
    ],
    [3, "pager"],
    [
      "type",
      "button",
      "role",
      "option",
      1,
      "card",
      "report",
      "overflow-hidden",
      3,
      "click"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "watermark",
      "wm-report"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "tick"
    ],
    [
      1,
      "badge",
      "badge-hot"
    ],
    [
      1,
      "relative",
      "grid",
      "size-12",
      "place-items-center",
      "rounded-[14px]"
    ],
    [
      1,
      "relative",
      "min-w-0"
    ],
    [
      1,
      "block",
      "pr-8",
      "text-[16px]",
      "font-extrabold",
      "leading-snug",
      "tracking-[-0.01em]"
    ],
    [
      1,
      "sub",
      "mt-1",
      "block"
    ],
    [
      1,
      "relative",
      "mt-auto",
      "flex",
      "items-center",
      "justify-between",
      "gap-2",
      "border-t",
      "pt-3",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [1, "badge"],
    [
      1,
      "inline-flex",
      "items-center",
      "gap-1",
      "text-[12px]",
      "font-bold",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "name",
      "table_view",
      3,
      "size"
    ],
    [
      "name",
      "check",
      3,
      "size"
    ],
    [
      "name",
      "north_east",
      3,
      "size"
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
      "visibility",
      3,
      "size"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-start",
      "justify-between",
      "gap-4",
      "p-6",
      2,
      "background",
      "var(--v2-foret)",
      "color",
      "var(--v2-blanc)"
    ],
    [
      1,
      "mono",
      2,
      "color",
      "var(--v2-citron)"
    ],
    [
      "id",
      "result-title",
      1,
      "mt-1",
      "text-[24px]",
      "font-extrabold",
      "leading-tight",
      "tracking-[-0.02em]"
    ],
    [
      1,
      "mt-1",
      "text-[14px]",
      "font-medium",
      2,
      "color",
      "color-mix(in oklab, var(--v2-blanc) 75%, transparent)"
    ],
    [
      1,
      "mt-1",
      "text-[13px]",
      "font-medium",
      2,
      "color",
      "color-mix(in oklab, var(--v2-blanc) 60%, transparent)"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      1,
      "text-[13px]",
      "font-semibold",
      2,
      "color",
      "color-mix(in oklab, var(--v2-blanc) 70%, transparent)"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "gap-3",
      "px-6",
      "py-4"
    ],
    [
      1,
      "text-[16px]",
      "font-extrabold"
    ],
    [1, "sub"],
    [
      1,
      "sub",
      "px-6",
      "pb-6"
    ],
    [
      1,
      "max-h-[480px]",
      "overflow-auto",
      "border-t",
      2,
      "border-color",
      "var(--v2-separateur)"
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
      "download",
      3,
      "size"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      2,
      "background",
      "var(--v2-citron)",
      "color",
      "var(--v2-foret)",
      3,
      "click"
    ],
    [
      1,
      "w-full",
      "min-w-[40rem]",
      "text-left",
      "text-[14px]"
    ],
    [
      1,
      "sticky",
      "top-0",
      "z-10",
      2,
      "background",
      "var(--v2-creme)"
    ],
    [
      1,
      "mono",
      "whitespace-nowrap",
      "px-4",
      "py-3",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      2,
      "border-top",
      "1px solid var(--v2-separateur)"
    ],
    [
      1,
      "whitespace-nowrap",
      "px-4",
      "py-2.5",
      "font-medium",
      "tabular-nums"
    ],
    [
      "id",
      "history-title",
      1,
      "text-[20px]",
      "font-extrabold",
      "tracking-[-0.02em]"
    ],
    [
      1,
      "card",
      "sub",
      "mt-4",
      "flex",
      "items-center",
      "gap-3",
      "p-6"
    ],
    [
      "name",
      "folder_open",
      3,
      "size"
    ],
    [
      1,
      "card",
      "mt-4",
      "overflow-hidden"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-4",
      "px-5",
      "py-4",
      3,
      "border-top"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-4",
      "px-5",
      "py-4"
    ],
    [
      1,
      "grid",
      "size-11",
      "shrink-0",
      "place-items-center",
      "rounded-[14px]",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-foret)"
    ],
    [
      "name",
      "lab_profile",
      3,
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
      "text-[15px]",
      "font-bold"
    ],
    [
      1,
      "sub",
      "block",
      "truncate"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-forest",
      3,
      "click"
    ]
  ],
  template: function RapportsPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0)(1, "header", 1)(2, "div", 2)(3, "p", 3);
      __text(4);
      __elementEnd();
      __elementStart(5, "h1", 4);
      __text(6);
      __elementEnd();
      __elementStart(7, "p", 5);
      __text(8);
      __elementEnd()()();
      __elementStart(9, "section", 6);
      __repeaterCreate(10, RapportsPage_For_11_Template, 12, 29, "div", 7, _forTrack0);
      __elementEnd();
      __conditionalCreate(12, RapportsPage_Conditional_12_Template, 48, 28, "div", 8)(13, RapportsPage_Conditional_13_Template, 3, 2, "p", 9);
      __conditionalCreate(14, RapportsPage_Conditional_14_Template, 19, 12, "section", 10);
      __conditionalCreate(15, RapportsPage_Conditional_15_Template, 5, 2, "section", 11);
      __elementStart(16, "p", 12);
      __text(17);
      __elementEnd()();
    }
    if (rf & 2) {
      let tmp_8_0;
      __property("perm", __pureFunction0(10, _c0))("area", ctx.t()("rapports.area"));
      __advance(4);
      __textInterpolate(ctx.t()("rapports.area"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("rapports.studio.title"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("rapports.studio.subtitle"), " ");
      __advance();
      __attribute("aria-label", ctx.t()("rapports.studio.stats"));
      __advance();
      __repeater(ctx.stats());
      __advance(2);
      __conditional(ctx.canGenerate() ? 12 : 13);
      __advance(2);
      __conditional((tmp_8_0 = ctx.preview()) ? 14 : -1, tmp_8_0);
      __advance();
      __conditional(ctx.canRead() ? 15 : -1);
      __advance(2);
      __textInterpolate(ctx.t()("rapports.foot"));
    }
  },
  dependencies: [
    PaginationComponent,
    AppShellComponent,
    IconComponent,
    SelectComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .card[_ngcontent-%COMP%] {\n      border-radius: 24px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n    }\n    .sub[_ngcontent-%COMP%] {\n      font-size: 13px;\n      font-weight: 500;\n      color: var(--%NS%v2-gris-texte);\n    }\n    \n    \n    .tabs[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 2px;\n      overflow-x: auto;\n      scrollbar-width: none;\n      scroll-snap-type: x proximity;\n      border-radius: 14px;\n      background: var(--%NS%v2-creme);\n      padding: 4px;\n    }\n    .tabs[_ngcontent-%COMP%]::-webkit-scrollbar {\n      display: none;\n    }\n    .tab[_ngcontent-%COMP%] {\n      display: inline-flex;\n      flex: 1 0 auto;\n      scroll-snap-align: start;\n      justify-content: center;\n      align-items: center;\n      gap: 5px;\n      white-space: nowrap;\n      border-radius: 10px;\n      padding: 9px 7px;\n      font-size: 13px;\n      font-weight: 700;\n      color: var(--%NS%v2-gris-texte);\n      cursor: pointer;\n      transition:\n        background-color 0.15s ease,\n        color 0.15s ease;\n    }\n    .tab[_ngcontent-%COMP%]:hover {\n      color: var(--%NS%v2-encre);\n    }\n    .tab.on[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-foret);\n      box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n    }\n    .tab[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      padding: 0 6px;\n      font-size: 11px;\n      font-variant-numeric: tabular-nums;\n      background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n      color: var(--%NS%v2-ardoise);\n    }\n    .tab.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    .tab[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    .stat[_ngcontent-%COMP%] {\n      transition:\n        transform 0.2s ease,\n        box-shadow 0.2s ease;\n    }\n    .stat[_ngcontent-%COMP%]:hover {\n      transform: translateY(-2px);\n      box-shadow: var(--%NS%v2-ombre-flottant);\n    }\n    .hero[_ngcontent-%COMP%] {\n      border-color: var(--%NS%v2-foret);\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    .badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n      border-radius: 999px;\n      padding: 3px 10px 3px 8px;\n      font-size: 12px;\n      font-weight: 800;\n      white-space: nowrap;\n    }\n    .badge-hot[_ngcontent-%COMP%] {\n      position: absolute;\n      right: 14px;\n      top: 14px;\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n    }\n    .watermark[_ngcontent-%COMP%] {\n      pointer-events: none;\n      position: absolute;\n      right: -18px;\n      bottom: -26px;\n      opacity: 0.12;\n      transform: rotate(-12deg);\n      transition:\n        transform 0.35s ease,\n        opacity 0.35s ease;\n    }\n    .hero[_ngcontent-%COMP%]   .watermark[_ngcontent-%COMP%] {\n      opacity: 0.16;\n    }\n    .stat[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%], \n   .report[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%] {\n      transform: rotate(-4deg) scale(1.06);\n      opacity: 0.18;\n    }\n    .wm-report[_ngcontent-%COMP%] {\n      right: -14px;\n      bottom: auto;\n      top: -18px;\n      opacity: 0.09;\n    }\n    \n    .toolbar[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 8px;\n      padding: 8px;\n      border-radius: 20px;\n    }\n    .search[_ngcontent-%COMP%] {\n      display: flex;\n      min-width: 0;\n      height: 48px;\n      align-items: center;\n      gap: 10px;\n      border-radius: 14px;\n      background: var(--%NS%v2-creme);\n      padding: 0 14px;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .search[_ngcontent-%COMP%]:focus-within {\n      box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n    }\n    .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n      min-width: 0;\n      flex: 1;\n      background: transparent;\n      font-size: 15px;\n      font-weight: 600;\n      color: var(--%NS%v2-encre);\n      outline: none;\n    }\n    .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n      color: var(--%NS%v2-gris-texte);\n      font-weight: 500;\n    }\n    .report[_ngcontent-%COMP%] {\n      position: relative;\n      display: flex;\n      flex-direction: column;\n      gap: 14px;\n      padding: 20px;\n      text-align: left;\n      cursor: pointer;\n      transition:\n        border-color 0.15s ease,\n        box-shadow 0.2s ease,\n        transform 0.2s ease;\n    }\n    .report[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-trait);\n      transform: translateY(-2px);\n      box-shadow: var(--%NS%v2-ombre-flottant);\n    }\n    .report.on[_ngcontent-%COMP%] {\n      border: 2px solid var(--%NS%v2-foret);\n      padding: 19px;\n      box-shadow: var(--%NS%v2-halo);\n    }\n    .tick[_ngcontent-%COMP%] {\n      position: absolute;\n      right: 16px;\n      top: 16px;\n      display: grid;\n      height: 28px;\n      width: 28px;\n      place-items: center;\n      border-radius: 999px;\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n    }\n    .label[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0.06em;\n      text-transform: uppercase;\n      color: var(--%NS%v2-ardoise);\n    }\n    .seg[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n      gap: 4px;\n      border-radius: 16px;\n      padding: 4px;\n      background: var(--%NS%v2-creme);\n    }\n    .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n      border-radius: 12px;\n      padding: 10px 6px;\n      font-size: 13px;\n      font-weight: 700;\n      color: var(--%NS%v2-gris-texte);\n      cursor: pointer;\n    }\n    .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-foret);\n      box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n    }\n    .btn[_ngcontent-%COMP%] {\n      display: inline-flex;\n      height: 44px;\n      align-items: center;\n      gap: 8px;\n      border-radius: 14px;\n      padding: 0 14px;\n      font-size: 14px;\n      font-weight: 800;\n      cursor: pointer;\n      transition:\n        background-color 0.15s ease,\n        border-color 0.15s ease;\n    }\n    .btn-ghost[_ngcontent-%COMP%] {\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-encre);\n    }\n    .btn-ghost[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-texte);\n    }\n    .btn-forest[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    .btn-forest[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-foret-clair);\n    }\n    .generate[_ngcontent-%COMP%] {\n      display: flex;\n      height: 60px;\n      width: 100%;\n      align-items: center;\n      justify-content: space-between;\n      gap: 12px;\n      border-radius: 20px;\n      background: var(--%NS%v2-foret);\n      padding: 0 8px 0 22px;\n      font-size: 16px;\n      font-weight: 800;\n      color: var(--%NS%v2-blanc);\n      cursor: pointer;\n      transition: background-color 0.15s ease;\n    }\n    .generate[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-foret-clair);\n    }\n    .generate[_ngcontent-%COMP%]:disabled {\n      background: var(--%NS%v2-lin);\n      color: var(--%NS%v2-gris-texte);\n      cursor: not-allowed;\n    }\n    .chip[_ngcontent-%COMP%] {\n      display: grid;\n      height: 44px;\n      width: 44px;\n      place-items: center;\n      border-radius: 14px;\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n    }\n    .generate[_ngcontent-%COMP%]:disabled   .chip[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-gris-trait);\n      color: var(--%NS%v2-blanc);\n    }\n    .spin[_ngcontent-%COMP%] {\n      animation: _ngcontent-%COMP%_spin 0.9s linear infinite;\n    }\n    @keyframes _ngcontent-%COMP%_spin {\n      to {\n        transform: rotate(360deg);\n      }\n    }\n    .report[_ngcontent-%COMP%]:focus-visible, \n   .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n   .btn[_ngcontent-%COMP%]:focus-visible, \n   .generate[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .watermark[_ngcontent-%COMP%], \n   .stat[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%], \n   .report[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%] {\n        transition: none;\n        transform: rotate(-12deg);\n      }\n      .report[_ngcontent-%COMP%], \n   .report[_ngcontent-%COMP%]:hover {\n        transition: none;\n        transform: none;\n      }\n      .spin[_ngcontent-%COMP%] {\n        animation: none;\n      }\n    }"]
}), _a);

export { RapportsPage as default };
//# sourceMappingURL=rapports.page-DYko6Zpp.mjs.map

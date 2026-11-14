import { i as inject, F as signal, c as computed, W as viewChildren, ɵ as __defineComponent, d as RouterLink, L as __getCurrentView, f as __elementStart, g as __text, h as __elementEnd, j as __conditionalCreate, m as __repeaterCreate, b as __element, H as __listener, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, s as __conditional, v as __repeater, u as __attribute, z as __classProp, X as __viewQuerySignal, Y as __queryAdvance, w as __nextContext, t as __styleProp, O as __restoreView, P as __resetView, S as __resolveDocument, r as __pureFunction1 } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, j as nf, i as inScope, t as generateScoopCode, h as fmtDate, u as scoopIssues, v as blockingDossiers } from './locale.service-c0QhtcVY.mjs';
import { m as managerOf, a as accountOf } from './scoop-account-Bqdc3Ifh.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { T as TextFieldComponent, P as PaginationComponent, M as ModalComponent, C as CollapsibleComponent } from './ui-DDO8FoUF.mjs';
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
var _c0 = (a0) => ["/dashboard/cooperatives", a0];
var _c1 = (a0) => ({ name: a0 });
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.label;
var _forTrack2 = ($index, $item) => $item.id;
var _forTrack3 = ($index, $item) => $item.scoop.id;
function CooperativesPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = __getCurrentView();
    __elementStart(0, "button", 49);
    __listener("click", function CooperativesPage_Conditional_9_Template_button_click_0_listener() {
      __restoreView(_r2);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.openCreate());
    });
    __text(1);
    __elementStart(2, "span", 46);
    __element(3, "ui-icon", 50);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("cooperatives.new"), " ");
    __advance(2);
    __property("size", 20);
  }
}
function CooperativesPage_For_14_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 53);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const level_r4 = __nextContext().$implicit;
    __advance();
    __textInterpolate(level_r4.title);
  }
}
function CooperativesPage_For_14_Conditional_5_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 54);
  if (rf & 2) __property("size", 16);
}
function CooperativesPage_For_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 51);
    __element(1, "ui-icon", 47);
    __elementStart(2, "span", 52);
    __text(3);
    __elementEnd();
    __conditionalCreate(4, CooperativesPage_For_14_Conditional_4_Template, 2, 1, "span", 53);
    __elementEnd();
    __conditionalCreate(5, CooperativesPage_For_14_Conditional_5_Template, 1, 1, "ui-icon", 54);
  }
  if (rf & 2) {
    const level_r4 = ctx.$implicit;
    const \u0275$index_30_r5 = ctx.$index;
    const \u0275$count_30_r6 = ctx.$count;
    __styleProp("background", level_r4.key === "faitiere" ? "var(--v2-foret)" : level_r4.bg)("color", level_r4.key === "faitiere" ? "var(--v2-citron)" : level_r4.fg);
    __advance();
    __property("name", level_r4.icon)("size", 14);
    __advance(2);
    __textInterpolate(level_r4.value);
    __advance();
    __conditional(level_r4.key !== "faitiere" ? 4 : -1);
    __advance();
    __conditional(!(\u0275$index_30_r5 === \u0275$count_30_r6 - 1) ? 5 : -1);
  }
}
function CooperativesPage_For_17_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 62);
    __element(1, "ui-icon", 63);
    __elementEnd();
  }
  if (rf & 2) {
    __advance();
    __property("size", 18);
  }
}
function CooperativesPage_For_17_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 55)(1, "span", 56)(2, "span", 57);
    __element(3, "ui-icon", 47);
    __elementEnd();
    __elementStart(4, "span", 58);
    __text(5);
    __elementEnd()();
    __elementStart(6, "span", 59);
    __text(7);
    __elementStart(8, "span", 60);
    __text(9);
    __elementEnd()();
    __elementStart(10, "span", 61);
    __text(11);
    __elementEnd();
    __conditionalCreate(12, CooperativesPage_For_17_Conditional_12_Template, 2, 1, "span", 62);
    __elementEnd();
  }
  if (rf & 2) {
    const level_r7 = ctx.$implicit;
    const \u0275$index_47_r8 = ctx.$index;
    const \u0275$count_47_r9 = ctx.$count;
    __classProp("level-hero", level_r7.key === "faitiere");
    __advance(2);
    __styleProp("background", level_r7.bg)("color", level_r7.fg);
    __advance();
    __property("name", level_r7.icon)("size", 20);
    __advance();
    __styleProp("color", level_r7.key === "faitiere" ? "var(--v2-citron)" : "var(--v2-ardoise)");
    __advance();
    __textInterpolate(level_r7.title);
    __advance();
    __classProp("zero", level_r7.zero);
    __advance();
    __textInterpolate1(" ", level_r7.value);
    __advance(2);
    __textInterpolate(level_r7.unit);
    __advance();
    __styleProp("opacity", 0.75);
    __advance();
    __textInterpolate(level_r7.sub);
    __advance();
    __conditional(!(\u0275$index_47_r8 === \u0275$count_47_r9 - 1) ? 12 : -1);
  }
}
function CooperativesPage_For_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 64)(1, "span", 65);
    __element(2, "ui-icon", 47);
    __elementEnd();
    __elementStart(3, "div", 66)(4, "span", 67);
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 68);
    __element(7, "ui-icon", 47);
    __elementEnd()();
    __elementStart(8, "span", 69);
    __text(9);
    __elementEnd();
    __elementStart(10, "span", 70);
    __text(11);
    __elementEnd()();
  }
  if (rf & 2) {
    const stat_r10 = ctx.$implicit;
    const \u0275$index_75_r11 = ctx.$index;
    __styleProp("background", \u0275$index_75_r11 === 0 ? "var(--v2-foret)" : stat_r10.bg)("border-color", \u0275$index_75_r11 === 0 ? "var(--v2-foret)" : "transparent")("color", \u0275$index_75_r11 === 0 ? "var(--v2-blanc)" : stat_r10.fg);
    __advance();
    __styleProp("color", \u0275$index_75_r11 === 0 ? "var(--v2-citron)" : stat_r10.fg);
    __advance();
    __property("name", stat_r10.icon)("size", 120);
    __advance(2);
    __styleProp("opacity", \u0275$index_75_r11 === 0 ? 0.8 : 1);
    __advance();
    __textInterpolate(stat_r10.label);
    __advance();
    __styleProp("background", \u0275$index_75_r11 === 0 ? "var(--v2-citron)" : stat_r10.fg)("color", \u0275$index_75_r11 === 0 ? "var(--v2-foret)" : stat_r10.bg);
    __advance();
    __property("name", stat_r10.icon)("size", 20);
    __advance(2);
    __textInterpolate(stat_r10.value);
    __advance();
    __styleProp("opacity", 0.75);
    __advance();
    __textInterpolate(stat_r10.sub);
  }
}
function CooperativesPage_For_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "button", 71);
    __listener("click", function CooperativesPage_For_27_Template_button_click_0_listener() {
      const filterButton_r13 = __restoreView(_r12).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.filter.set(filterButton_r13.id));
    });
    __text(1);
    __elementStart(2, "span", 72);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const filterButton_r13 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __classProp("on", ctx_r2.filter() === filterButton_r13.id);
    __attribute("aria-selected", ctx_r2.filter() === filterButton_r13.id);
    __advance();
    __textInterpolate1(" ", filterButton_r13.label);
    __advance(2);
    __textInterpolate(filterButton_r13.count);
  }
}
function CooperativesPage_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 30)(1, "span", 73);
    __element(2, "ui-icon", 21);
    __elementEnd();
    __elementStart(3, "p", 74);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.rows().length ? ctx_r2.t()("cooperatives.empty.filtered") : ctx_r2.t()("cooperatives.empty.none"), " ");
  }
}
function CooperativesPage_Conditional_36_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 83);
    __element(1, "ui-icon", 106);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r15 = __nextContext().$implicit;
    __advance();
    __property("size", 15);
    __advance();
    __textInterpolate1("", row_r15.place, " ");
  }
}
function CooperativesPage_Conditional_36_For_2_Conditional_12_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = __getCurrentView();
    __elementStart(0, "button", 109);
    __listener("click", function CooperativesPage_Conditional_36_For_2_Conditional_12_Conditional_4_Conditional_3_Template_button_click_0_listener() {
      __restoreView(_r17);
      const row_r15 = __nextContext(3).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.restore(row_r15.scoop.id));
    });
    __element(1, "ui-icon", 113);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(5);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r2.t()("cooperatives.row.restore"), " ");
  }
}
function CooperativesPage_Conditional_36_For_2_Conditional_12_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = __getCurrentView();
    __elementStart(0, "button", 114);
    __listener("click", function CooperativesPage_Conditional_36_For_2_Conditional_12_Conditional_4_Conditional_4_Template_button_click_0_listener() {
      __restoreView(_r18);
      const row_r15 = __nextContext(3).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.askArchive(row_r15.scoop.id));
    });
    __element(1, "ui-icon", 115);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(5);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r2.t()("cooperatives.row.archive"), " ");
  }
}
function CooperativesPage_Conditional_36_For_2_Conditional_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = __getCurrentView();
    __elementStart(0, "button", 109);
    __listener("click", function CooperativesPage_Conditional_36_For_2_Conditional_12_Conditional_4_Template_button_click_0_listener() {
      __restoreView(_r16);
      const row_r15 = __nextContext(2).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.openEdit(row_r15.scoop.id));
    });
    __element(1, "ui-icon", 110);
    __text(2);
    __elementEnd();
    __conditionalCreate(3, CooperativesPage_Conditional_36_For_2_Conditional_12_Conditional_4_Conditional_3_Template, 3, 2, "button", 111)(4, CooperativesPage_Conditional_36_For_2_Conditional_12_Conditional_4_Conditional_4_Template, 3, 2, "button", 112);
  }
  if (rf & 2) {
    const row_r15 = __nextContext(2).$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r2.t()("cooperatives.row.edit"), " ");
    __advance();
    __conditional(row_r15.scoop.archived ? 3 : 4);
  }
}
function CooperativesPage_Conditional_36_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 87)(1, "a", 107);
    __element(2, "ui-icon", 108);
    __text(3);
    __elementEnd();
    __conditionalCreate(4, CooperativesPage_Conditional_36_For_2_Conditional_12_Conditional_4_Template, 5, 3);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r15 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("routerLink", __pureFunction1(4, _c0, row_r15.scoop.id));
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r2.t()("cooperatives.row.open"));
    __advance();
    __conditional(ctx_r2.canManage() ? 4 : -1);
  }
}
function CooperativesPage_Conditional_36_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 89);
    __element(1, "ui-icon", 115);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate(ctx_r2.t()("cooperatives.status.archived"));
  }
}
function CooperativesPage_Conditional_36_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 90);
    __element(1, "ui-icon", 116);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate(ctx_r2.t()("cooperatives.status.active"));
  }
}
function CooperativesPage_Conditional_36_For_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 91);
    __element(1, "ui-icon", 117);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate(ctx_r2.t()("cooperatives.badge.new"));
  }
}
function CooperativesPage_Conditional_36_For_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 92);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r15 = __nextContext().$implicit;
    __advance();
    __textInterpolate(row_r15.scoop.code);
  }
}
function CooperativesPage_Conditional_36_For_2_For_20_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 62);
    __element(1, "ui-icon", 63);
    __elementEnd();
  }
  if (rf & 2) {
    __advance();
    __property("size", 18);
  }
}
function CooperativesPage_Conditional_36_For_2_For_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 94)(1, "span", 118)(2, "span", 119);
    __element(3, "ui-icon", 47);
    __elementEnd();
    __elementStart(4, "span", 120);
    __text(5);
    __elementEnd()();
    __elementStart(6, "span", 121);
    __text(7);
    __elementStart(8, "span", 122);
    __text(9);
    __elementEnd()();
    __elementStart(10, "span", 123);
    __text(11);
    __elementEnd();
    __conditionalCreate(12, CooperativesPage_Conditional_36_For_2_For_20_Conditional_12_Template, 2, 1, "span", 62);
    __elementEnd();
  }
  if (rf & 2) {
    const level_r19 = ctx.$implicit;
    const \u0275$index_219_r20 = ctx.$index;
    const \u0275$count_219_r21 = ctx.$count;
    __advance(2);
    __styleProp("background", level_r19.bg)("color", level_r19.fg);
    __advance();
    __property("name", level_r19.icon)("size", 17);
    __advance(2);
    __textInterpolate(level_r19.title);
    __advance();
    __classProp("zero", level_r19.zero);
    __advance();
    __textInterpolate1(" ", level_r19.value);
    __advance(2);
    __textInterpolate(level_r19.unit);
    __advance(2);
    __textInterpolate(level_r19.sub);
    __advance();
    __conditional(!(\u0275$index_219_r20 === \u0275$count_219_r21 - 1) ? 12 : -1);
  }
}
function CooperativesPage_Conditional_36_For_2_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 51);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r15 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __styleProp("background", ctx_r2.account(row_r15.account).bg)("color", ctx_r2.account(row_r15.account).fg);
    __advance();
    __textInterpolate(ctx_r2.t()(ctx_r2.account(row_r15.account).label));
  }
}
function CooperativesPage_Conditional_36_For_2_Template(rf, ctx) {
  var _a2, _b, _c, _d;
  if (rf & 1) {
    const _r14 = __getCurrentView();
    __elementStart(0, "article", 78)(1, "div", 79)(2, "a", 80)(3, "span", 81);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 7)(6, "span", 82);
    __text(7);
    __elementEnd();
    __conditionalCreate(8, CooperativesPage_Conditional_36_For_2_Conditional_8_Template, 3, 2, "span", 83);
    __elementEnd()();
    __elementStart(9, "div", 84)(10, "button", 85);
    __listener("click", function CooperativesPage_Conditional_36_For_2_Template_button_click_10_listener($event) {
      const row_r15 = __restoreView(_r14).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.toggleMenu(row_r15.scoop.id, $event));
    });
    __element(11, "ui-icon", 86);
    __elementEnd();
    __conditionalCreate(12, CooperativesPage_Conditional_36_For_2_Conditional_12_Template, 5, 6, "div", 87);
    __elementEnd()();
    __elementStart(13, "div", 88);
    __conditionalCreate(14, CooperativesPage_Conditional_36_For_2_Conditional_14_Template, 3, 2, "span", 89)(15, CooperativesPage_Conditional_36_For_2_Conditional_15_Template, 3, 2, "span", 90);
    __conditionalCreate(16, CooperativesPage_Conditional_36_For_2_Conditional_16_Template, 3, 2, "span", 91);
    __conditionalCreate(17, CooperativesPage_Conditional_36_For_2_Conditional_17_Template, 2, 1, "span", 92);
    __elementEnd();
    __elementStart(18, "ol", 93);
    __repeaterCreate(19, CooperativesPage_Conditional_36_For_2_For_20_Template, 13, 13, "li", 94, _forTrack0);
    __elementEnd();
    __elementStart(21, "div", 95)(22, "div", 96)(23, "span", 97);
    __text(24);
    __elementEnd();
    __elementStart(25, "span", 98);
    __text(26);
    __elementEnd()();
    __elementStart(27, "div", 99);
    __element(28, "span");
    __elementEnd()();
    __elementStart(29, "div", 100)(30, "span", 101);
    __text(31);
    __elementEnd();
    __elementStart(32, "span", 102)(33, "span", 103);
    __text(34);
    __elementEnd();
    __elementStart(35, "span", 104);
    __text(36);
    __elementEnd()();
    __conditionalCreate(37, CooperativesPage_Conditional_36_For_2_Conditional_37_Template, 2, 5, "span", 105);
    __elementEnd()();
  }
  if (rf & 2) {
    const row_r15 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __classProp("archived", row_r15.scoop.archived);
    __advance(2);
    __property("routerLink", __pureFunction1(26, _c0, row_r15.scoop.id));
    __advance(2);
    __textInterpolate(row_r15.mono);
    __advance(3);
    __textInterpolate(row_r15.scoop.name);
    __advance();
    __conditional(row_r15.place ? 8 : -1);
    __advance(2);
    __classProp("on", ctx_r2.menuFor() === row_r15.scoop.id);
    __attribute("aria-label", ctx_r2.t()("cooperatives.row.actions", __pureFunction1(28, _c1, row_r15.scoop.name)))("aria-expanded", ctx_r2.menuFor() === row_r15.scoop.id);
    __advance();
    __property("size", 22);
    __advance();
    __conditional(ctx_r2.menuFor() === row_r15.scoop.id ? 12 : -1);
    __advance(2);
    __conditional(row_r15.scoop.archived ? 14 : 15);
    __advance(2);
    __conditional(row_r15.isNew ? 16 : -1);
    __advance();
    __conditional(row_r15.scoop.code ? 17 : -1);
    __advance();
    __attribute("aria-label", ctx_r2.t()("cooperatives.structure.aria"));
    __advance();
    __repeater(row_r15.structure);
    __advance(5);
    __textInterpolate(ctx_r2.t()("cooperatives.card.quality"));
    __advance(2);
    __textInterpolate1("", row_r15.quality, " %");
    __advance(2);
    __styleProp("width", row_r15.quality, "%")("background", row_r15.quality >= 70 ? "var(--v2-vert-pousse)" : "var(--v2-soleil)");
    __advance(3);
    __textInterpolate(row_r15.managerInitials || "\u2014");
    __advance(3);
    __textInterpolate((_b = (_a2 = row_r15.manager) == null ? void 0 : _a2.name) != null ? _b : ctx_r2.t()("cooperatives.account.none"));
    __advance(2);
    __textInterpolate((_d = (_c = row_r15.manager) == null ? void 0 : _c.email) != null ? _d : ctx_r2.t()("cooperatives.fiche.managerNone"));
    __advance();
    __conditional(row_r15.manager ? 37 : -1);
  }
}
function CooperativesPage_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 75);
    __repeaterCreate(1, CooperativesPage_Conditional_36_For_2_Template, 38, 30, "article", 76, _forTrack3);
    __elementEnd();
    __element(3, "ui-pagination", 77);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __repeater(ctx_r2.pager.items());
    __advance(2);
    __property("pager", ctx_r2.pager);
  }
}
function CooperativesPage_Conditional_37_For_22_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 104);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r22 = __nextContext().$implicit;
    __advance();
    __textInterpolate(row_r22.place);
  }
}
function CooperativesPage_Conditional_37_For_22_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 89);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r2.t()("cooperatives.status.archived"));
  }
}
function CooperativesPage_Conditional_37_For_22_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 90);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r2.t()("cooperatives.status.active"));
  }
}
function CooperativesPage_Conditional_37_For_22_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 147);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r22 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __styleProp("background", ctx_r2.account(row_r22.account).bg)("color", ctx_r2.account(row_r22.account).fg);
    __advance();
    __textInterpolate(ctx_r2.t()(ctx_r2.account(row_r22.account).label));
  }
}
function CooperativesPage_Conditional_37_For_22_Conditional_32_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = __getCurrentView();
    __elementStart(0, "button", 151);
    __listener("click", function CooperativesPage_Conditional_37_For_22_Conditional_32_Conditional_2_Template_button_click_0_listener() {
      __restoreView(_r24);
      const row_r22 = __nextContext(2).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.restore(row_r22.scoop.id));
    });
    __element(1, "ui-icon", 113);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r22 = __nextContext(2).$implicit;
    const ctx_r2 = __nextContext(2);
    __attribute("aria-label", ctx_r2.t()("cooperatives.row.restore") + " \xB7 " + row_r22.scoop.name)("title", ctx_r2.t()("cooperatives.row.restore"));
    __advance();
    __property("size", 18);
  }
}
function CooperativesPage_Conditional_37_For_22_Conditional_32_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = __getCurrentView();
    __elementStart(0, "button", 152);
    __listener("click", function CooperativesPage_Conditional_37_For_22_Conditional_32_Conditional_3_Template_button_click_0_listener() {
      __restoreView(_r25);
      const row_r22 = __nextContext(2).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.askArchive(row_r22.scoop.id));
    });
    __element(1, "ui-icon", 115);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r22 = __nextContext(2).$implicit;
    const ctx_r2 = __nextContext(2);
    __attribute("aria-label", ctx_r2.t()("cooperatives.row.archive") + " \xB7 " + row_r22.scoop.name)("title", ctx_r2.t()("cooperatives.row.archive"));
    __advance();
    __property("size", 18);
  }
}
function CooperativesPage_Conditional_37_For_22_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = __getCurrentView();
    __elementStart(0, "button", 148);
    __listener("click", function CooperativesPage_Conditional_37_For_22_Conditional_32_Template_button_click_0_listener() {
      __restoreView(_r23);
      const row_r22 = __nextContext().$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.openEdit(row_r22.scoop.id));
    });
    __element(1, "ui-icon", 110);
    __elementEnd();
    __conditionalCreate(2, CooperativesPage_Conditional_37_For_22_Conditional_32_Conditional_2_Template, 2, 3, "button", 149)(3, CooperativesPage_Conditional_37_For_22_Conditional_32_Conditional_3_Template, 2, 3, "button", 150);
  }
  if (rf & 2) {
    const row_r22 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __attribute("aria-label", ctx_r2.t()("cooperatives.row.edit") + " \xB7 " + row_r22.scoop.name)("title", ctx_r2.t()("cooperatives.row.edit"));
    __advance();
    __property("size", 18);
    __advance();
    __conditional(row_r22.scoop.archived ? 2 : 3);
  }
}
function CooperativesPage_Conditional_37_For_22_Template(rf, ctx) {
  var _a2, _b;
  if (rf & 1) {
    __elementStart(0, "tr", 130)(1, "td", 132)(2, "span", 133)(3, "span", 134);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 7)(6, "span", 135);
    __text(7);
    __elementEnd();
    __conditionalCreate(8, CooperativesPage_Conditional_37_For_22_Conditional_8_Template, 2, 1, "span", 104);
    __elementEnd()()();
    __elementStart(9, "td", 136);
    __conditionalCreate(10, CooperativesPage_Conditional_37_For_22_Conditional_10_Template, 2, 1, "span", 89)(11, CooperativesPage_Conditional_37_For_22_Conditional_11_Template, 2, 1, "span", 90);
    __elementEnd();
    __elementStart(12, "td", 137);
    __text(13);
    __elementEnd();
    __elementStart(14, "td", 138);
    __text(15);
    __elementEnd();
    __elementStart(16, "td", 137);
    __text(17);
    __elementEnd();
    __elementStart(18, "td", 136)(19, "span", 118)(20, "span", 139);
    __element(21, "span");
    __elementEnd();
    __elementStart(22, "span", 140);
    __text(23);
    __elementEnd()()();
    __elementStart(24, "td", 132)(25, "span", 141);
    __text(26);
    __elementEnd();
    __conditionalCreate(27, CooperativesPage_Conditional_37_For_22_Conditional_27_Template, 2, 5, "span", 142);
    __elementEnd();
    __elementStart(28, "td", 143);
    __listener("click", function CooperativesPage_Conditional_37_For_22_Template_td_click_28_listener($event) {
      return $event.stopPropagation();
    });
    __elementStart(29, "span", 144)(30, "a", 145);
    __element(31, "ui-icon", 146);
    __elementEnd();
    __conditionalCreate(32, CooperativesPage_Conditional_37_For_22_Conditional_32_Template, 4, 4);
    __elementEnd()()();
  }
  if (rf & 2) {
    const row_r22 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __property("routerLink", __pureFunction1(26, _c0, row_r22.scoop.id));
    __advance(4);
    __textInterpolate(row_r22.mono);
    __advance(3);
    __textInterpolate(row_r22.scoop.name);
    __advance();
    __conditional(row_r22.place ? 8 : -1);
    __advance(2);
    __conditional(row_r22.scoop.archived ? 10 : 11);
    __advance(2);
    __classProp("zero", !row_r22.gie);
    __advance();
    __textInterpolate1(" ", ctx_r2.nf.format(row_r22.gie), " ");
    __advance();
    __classProp("zero", !row_r22.producers);
    __advance();
    __textInterpolate1(" ", ctx_r2.nf.format(row_r22.producers), " ");
    __advance();
    __classProp("zero", !row_r22.members);
    __advance();
    __textInterpolate1(" ", ctx_r2.nf.format(row_r22.members), " ");
    __advance(4);
    __styleProp("width", row_r22.quality, "%")("background", row_r22.quality >= 70 ? "var(--v2-vert-pousse)" : "var(--v2-soleil)");
    __advance(2);
    __textInterpolate1("", row_r22.quality, " %");
    __advance(3);
    __textInterpolate((_b = (_a2 = row_r22.manager) == null ? void 0 : _a2.name) != null ? _b : "\u2014");
    __advance();
    __conditional(row_r22.manager ? 27 : -1);
    __advance(3);
    __property("routerLink", __pureFunction1(28, _c0, row_r22.scoop.id));
    __attribute("aria-label", ctx_r2.t()("cooperatives.row.open") + " \xB7 " + row_r22.scoop.name)("title", ctx_r2.t()("cooperatives.row.open"));
    __advance();
    __property("size", 18);
    __advance();
    __conditional(ctx_r2.canManage() ? 32 : -1);
  }
}
function CooperativesPage_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 124)(1, "table", 125)(2, "thead")(3, "tr", 8)(4, "th", 126);
    __text(5);
    __elementEnd();
    __elementStart(6, "th", 127);
    __text(7);
    __elementEnd();
    __elementStart(8, "th", 128);
    __text(9);
    __elementEnd();
    __elementStart(10, "th", 128);
    __text(11);
    __elementEnd();
    __elementStart(12, "th", 128);
    __text(13);
    __elementEnd();
    __elementStart(14, "th", 127);
    __text(15);
    __elementEnd();
    __elementStart(16, "th", 126);
    __text(17);
    __elementEnd();
    __elementStart(18, "th", 129);
    __text(19);
    __elementEnd()()();
    __elementStart(20, "tbody");
    __repeaterCreate(21, CooperativesPage_Conditional_37_For_22_Template, 33, 30, "tr", 130, _forTrack3);
    __elementEnd()()();
    __element(23, "ui-pagination", 131);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(5);
    __textInterpolate(ctx_r2.t()("cooperatives.col.name"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("cooperatives.col.status"));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("cooperatives.structure.gie"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("cooperatives.col.producers"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("cooperatives.col.members"), " ");
    __advance(2);
    __textInterpolate(ctx_r2.t()("cooperatives.card.quality"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("cooperatives.col.manager"));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("cooperatives.col.actions"), " ");
    __advance(2);
    __repeater(ctx_r2.pager.items());
    __advance(2);
    __property("pager", ctx_r2.pager);
  }
}
function CooperativesPage_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 38);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    __advance();
    __textInterpolate(ctx);
  }
}
function CooperativesPage_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 39);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __textInterpolate(ctx_r2.t()("cooperatives.form.codeWaiting"));
  }
}
function CooperativesPage_Conditional_54_Template(rf, ctx) {
  var _a2, _b, _c;
  if (rf & 1) {
    const _r26 = __getCurrentView();
    __elementStart(0, "div", 42)(1, "p", 153);
    __element(2, "ui-icon", 154);
    __text(3);
    __elementEnd();
    __elementStart(4, "p", 155);
    __text(5);
    __elementEnd();
    __elementStart(6, "div", 156)(7, "ui-text-field", 157, 2);
    __listener("valueChange", function CooperativesPage_Conditional_54_Template_ui_text_field_valueChange_7_listener($event) {
      __restoreView(_r26);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.patch("managerFirstName", $event));
    });
    __elementEnd();
    __elementStart(9, "ui-text-field", 158, 3);
    __listener("valueChange", function CooperativesPage_Conditional_54_Template_ui_text_field_valueChange_9_listener($event) {
      __restoreView(_r26);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.patch("managerLastName", $event));
    });
    __elementEnd()();
    __elementStart(11, "ui-text-field", 159, 4);
    __listener("valueChange", function CooperativesPage_Conditional_54_Template_ui_text_field_valueChange_11_listener($event) {
      __restoreView(_r26);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.patch("managerEmail", $event));
    });
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(2);
    __property("size", 20);
    __advance();
    __textInterpolate1("", ctx_r2.t()("cooperatives.form.manager"), " ");
    __advance(2);
    __textInterpolate(ctx_r2.t()("cooperatives.form.managerHint"));
    __advance(2);
    __property("label", ctx_r2.t()("cooperatives.form.managerFirstName"))("value", ctx_r2.form().managerFirstName)("error", (_a2 = ctx_r2.errors().managerFirstName) != null ? _a2 : "");
    __advance(2);
    __property("label", ctx_r2.t()("cooperatives.form.managerLastName"))("value", ctx_r2.form().managerLastName)("error", (_b = ctx_r2.errors().managerLastName) != null ? _b : "");
    __advance(2);
    __property("label", ctx_r2.t()("cooperatives.form.managerEmail"))("value", ctx_r2.form().managerEmail)("error", (_c = ctx_r2.errors().managerEmail) != null ? _c : "");
  }
}
function CooperativesPage_Conditional_62_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 161);
    __element(1, "ui-icon", 164);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const archiveInfo_r28 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", archiveInfo_r28.accounts, " ");
  }
}
function CooperativesPage_Conditional_62_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = __getCurrentView();
    __elementStart(0, "a", 165);
    __listener("click", function CooperativesPage_Conditional_62_Conditional_5_Template_a_click_0_listener() {
      __restoreView(_r29);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.archiveTarget.set(null));
    });
    __text(1);
    __elementStart(2, "span", 46);
    __element(3, "ui-icon", 166);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("cooperatives.blocked.submit"));
    __advance(2);
    __property("size", 20);
  }
}
function CooperativesPage_Conditional_62_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = __getCurrentView();
    __elementStart(0, "button", 167);
    __listener("click", function CooperativesPage_Conditional_62_Conditional_6_Template_button_click_0_listener() {
      __restoreView(_r30);
      const archiveInfo_r28 = __nextContext();
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.confirmArchive(archiveInfo_r28.id));
    });
    __element(1, "ui-icon", 115);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("size", 20);
    __advance();
    __textInterpolate1("", ctx_r2.t()("cooperatives.archive.submit"), " ");
  }
}
function CooperativesPage_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = __getCurrentView();
    __elementStart(0, "ui-modal", 160);
    __listener("closed", function CooperativesPage_Conditional_62_Template_ui_modal_closed_0_listener() {
      __restoreView(_r27);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.archiveTarget.set(null));
    });
    __conditionalCreate(1, CooperativesPage_Conditional_62_Conditional_1_Template, 3, 2, "p", 161);
    __elementStart(2, "div", 43)(3, "button", 44);
    __listener("click", function CooperativesPage_Conditional_62_Template_button_click_3_listener() {
      __restoreView(_r27);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.archiveTarget.set(null));
    });
    __text(4);
    __elementEnd();
    __conditionalCreate(5, CooperativesPage_Conditional_62_Conditional_5_Template, 4, 2, "a", 162)(6, CooperativesPage_Conditional_62_Conditional_6_Template, 3, 2, "button", 163);
    __elementEnd()();
  }
  if (rf & 2) {
    const archiveInfo_r28 = ctx;
    const ctx_r2 = __nextContext();
    __property("open", true)("title", archiveInfo_r28.blocked ? ctx_r2.t()("cooperatives.blocked.title") : ctx_r2.t()("cooperatives.archive.title"))("description", archiveInfo_r28.description)("icon", archiveInfo_r28.blocked ? "warning" : "archive")("width", 520)("closeLabel", ctx_r2.t()("cooperatives.blocked.close"));
    __advance();
    __conditional(!archiveInfo_r28.blocked ? 1 : -1);
    __advance(3);
    __textInterpolate1(" ", ctx_r2.t()("cooperatives.form.cancel"), " ");
    __advance();
    __conditional(archiveInfo_r28.blocked ? 5 : 6);
  }
}
var VIEW_KEY = "mbd.cooperatives.view";
var FIELD_ORDER = [
  "name",
  "commune",
  "managerFirstName",
  "managerLastName",
  "managerEmail"
];
var ACCOUNT = {
  active: {
    label: "cooperatives.badge.active",
    bg: "var(--v2-sauge)",
    fg: "var(--v2-vert-pousse)"
  },
  invited: {
    label: "cooperatives.badge.invited",
    bg: "var(--v2-info-bg)",
    fg: "var(--v2-info-fg)"
  },
  expired: {
    label: "cooperatives.badge.expired",
    bg: "var(--v2-attente-bg)",
    fg: "var(--v2-attente-fg)"
  },
  closed: {
    label: "cooperatives.badge.closed",
    bg: "var(--v2-lin)",
    fg: "var(--v2-gris-texte)"
  },
  none: {
    label: "cooperatives.account.none",
    bg: "var(--v2-lin)",
    fg: "var(--v2-gris-texte)"
  }
};
var CooperativesPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.snackbar = inject(SnackbarService);
    this.t = this.locale.t;
    this.nf = nf;
    this.perms = ["scoop.manage", "org.read"];
    this.q = signal("", ...[]);
    this.filter = signal("tous", ...[]);
    this.view = signal(readView(), ...[]);
    this.menuFor = signal(null, ...[]);
    this.createOpen = signal(false, ...[]);
    this.archiveTarget = signal(null, ...[]);
    this.canManage = computed(() => this.store.can("scoop.manage"), ...[]);
    this.rows = computed(() => {
      const s = this.store.state();
      const session = s.session;
      const now = Date.now();
      const since = now - 7776e6;
      const scoops = s.scoops.filter((c) => inScope([{ scoopId: c.id }], session).length === 1);
      const t = this.t();
      return scoops.map((scoop) => {
        var _a2;
        const producers = s.producers.filter((p) => p.scoopId === scoop.id && !p.mergedInto);
        const members = s.members.filter((m) => m.scoopId === scoop.id && m.status === "membre").length;
        const scoopOrgs = s.orgs.filter((o) => o.scoopId === scoop.id);
        const orgs = scoopOrgs.length;
        const gie = scoopOrgs.filter((o) => o.type === "GIE").length;
        const manager = managerOf(s.users, scoop.id);
        const account = accountOf(manager, now);
        const quality = producers.length ? Math.round(producers.filter((p) => p.quality === "valid\xE9").length / producers.length * 100) : 0;
        return {
          scoop,
          producers: producers.length,
          members,
          manager,
          account,
          quality,
          pending: !scoop.archived && (account === "invited" || account === "expired"),
          isNew: !!scoop.createdAt && new Date(scoop.createdAt).getTime() >= since,
          mono: ((_a2 = scoop.code) != null ? _a2 : scoop.name.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 3)).toUpperCase().slice(0, 4),
          place: [scoop.commune !== scoop.name ? scoop.commune : "", scoop.region].filter(Boolean).join(", "),
          managerInitials: manager ? manager.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() : "",
          gie,
          structure: [
            {
              key: "scoop",
              icon: "diversity_3",
              title: t("cooperatives.structure.scoop"),
              value: nf.format(members),
              zero: members === 0,
              unit: t("cooperatives.structure.membersUnit"),
              sub: t("cooperatives.structure.scoopSub"),
              bg: "var(--v2-foret)",
              fg: "var(--v2-citron)"
            },
            {
              key: "gie",
              icon: "hub",
              title: t("cooperatives.structure.gie"),
              value: nf.format(gie),
              zero: gie === 0,
              unit: orgs > gie ? t("cooperatives.structure.orgsUnit", { count: orgs }) : "",
              sub: t("cooperatives.structure.gieSub"),
              bg: "var(--v2-info-bg)",
              fg: "var(--v2-info-fg)"
            },
            {
              key: "producers",
              icon: "agriculture",
              title: t("cooperatives.structure.producers"),
              value: nf.format(producers.length),
              zero: producers.length === 0,
              unit: "",
              sub: t("cooperatives.structure.producersSub"),
              bg: "var(--v2-sauge)",
              fg: "var(--v2-vert-pousse)"
            }
          ]
        };
      });
    }, ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const rows = this.rows();
      const active = rows.filter((r) => !r.scoop.archived);
      const fresh = rows.filter((r) => r.isNew).length;
      return [
        {
          label: t("cooperatives.kpi.active"),
          value: nf.format(active.length),
          sub: fresh ? t("cooperatives.kpi.activeNew", { count: fresh }) : t("cooperatives.kpi.activeSub", { total: rows.length }),
          icon: "diversity_3",
          bg: "",
          fg: ""
        },
        {
          label: t("cooperatives.kpi.pending"),
          value: nf.format(rows.filter((r) => r.pending).length),
          sub: t("cooperatives.kpi.pendingSub"),
          icon: "mark_email_unread",
          bg: "var(--v2-attente-bg)",
          fg: "var(--v2-attente-fg)"
        },
        {
          label: t("cooperatives.kpi.members"),
          value: nf.format(rows.reduce((n, r) => n + r.members, 0)),
          sub: t("cooperatives.kpi.membersSub"),
          icon: "group",
          bg: "var(--v2-info-bg)",
          fg: "var(--v2-info-fg)"
        },
        {
          label: t("cooperatives.kpi.archived"),
          value: nf.format(rows.length - active.length),
          sub: t("cooperatives.kpi.archivedSub"),
          icon: "archive",
          bg: "var(--v2-culture-bg)",
          fg: "var(--v2-culture-fg)"
        }
      ];
    }, ...[]);
    this.network = computed(() => {
      const t = this.t();
      const rows = this.rows().filter((r) => !r.scoop.archived);
      const gie = rows.reduce((n, r) => n + r.gie, 0);
      const producers = rows.reduce((n, r) => n + r.producers, 0);
      return [
        {
          key: "faitiere",
          icon: "account_balance",
          title: t("cooperatives.network.faitiere"),
          value: t("cooperatives.network.faitiereName"),
          zero: false,
          unit: "",
          sub: t("cooperatives.network.faitiereSub"),
          bg: "var(--v2-citron)",
          fg: "var(--v2-foret)"
        },
        {
          key: "scoops",
          icon: "diversity_3",
          title: t("cooperatives.structure.scoop"),
          value: nf.format(rows.length),
          zero: rows.length === 0,
          unit: "",
          sub: t("cooperatives.structure.scoopSub"),
          bg: "var(--v2-foret)",
          fg: "var(--v2-citron)"
        },
        {
          key: "gie",
          icon: "hub",
          title: t("cooperatives.structure.gie"),
          value: nf.format(gie),
          zero: gie === 0,
          unit: "",
          sub: t("cooperatives.structure.gieSub"),
          bg: "var(--v2-info-bg)",
          fg: "var(--v2-info-fg)"
        },
        {
          key: "producers",
          icon: "agriculture",
          title: t("cooperatives.structure.producers"),
          value: nf.format(producers),
          zero: producers === 0,
          unit: "",
          sub: t("cooperatives.structure.producersSub"),
          bg: "var(--v2-sauge)",
          fg: "var(--v2-vert-pousse)"
        }
      ];
    }, ...[]);
    this.filterButtons = computed(() => {
      const t = this.t();
      const rows = this.rows();
      return [
        {
          id: "tous",
          label: t("cooperatives.filter.all"),
          count: rows.length
        },
        {
          id: "active",
          label: t("cooperatives.filter.active"),
          count: rows.filter((r) => !r.scoop.archived).length
        },
        {
          id: "archived",
          label: t("cooperatives.filter.archived"),
          count: rows.filter((r) => !!r.scoop.archived).length
        },
        {
          id: "pending",
          label: t("cooperatives.filter.pending"),
          count: rows.filter((r) => r.pending).length
        }
      ];
    }, ...[]);
    this.shown = computed(() => {
      const norm = (v) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
      const needle = norm(this.q().trim());
      const f = this.filter();
      return this.rows().filter((r) => {
        var _a2, _b, _c;
        const okFilter = f === "tous" || f === "active" && !r.scoop.archived || f === "archived" && !!r.scoop.archived || f === "pending" && r.pending;
        const okQ = !needle || norm(`${r.scoop.name} ${(_a2 = r.scoop.code) != null ? _a2 : ""} ${r.scoop.commune} ${(_c = (_b = r.manager) == null ? void 0 : _b.name) != null ? _c : ""}`).includes(needle);
        return okFilter && okQ;
      });
    }, ...[]);
    this.countLabel = computed(() => {
      const n = this.shown().length;
      return this.t()(n > 1 ? "cooperatives.count.autre" : "cooperatives.count.un", {
        count: n,
        total: this.rows().length
      });
    }, ...[]);
    this.emptyForm = {
      name: "",
      commune: "",
      code: "",
      region: "",
      managerFirstName: "",
      managerLastName: "",
      managerEmail: ""
    };
    this.form = signal({ ...this.emptyForm }, ...[]);
    this.errors = signal({}, ...[]);
    this.fields = viewChildren(TextFieldComponent, ...[]);
    this.formMode = signal("create", ...[]);
    this.editId = signal(null, ...[]);
    this.shownCode = computed(() => {
      const f = this.form();
      if (this.formMode() === "edit") return f.code;
      return generateScoopCode(f.name, this.store.state().scoops.map((scoop) => scoop.code));
    }, ...[]);
    this.fmtDate = fmtDate;
    this.pager = createPager(() => this.shown());
  }
  account(a) {
    return ACCOUNT[a];
  }
  setView(v) {
    this.view.set(v);
    try {
      window.localStorage.setItem(VIEW_KEY, v);
    } catch {
    }
  }
  toggleMenu(id, e) {
    e.stopPropagation();
    this.menuFor.update((cur) => cur === id ? null : id);
  }
  onDocumentClick(e) {
    var _a2, _b;
    if (this.menuFor() && !((_b = (_a2 = e.target).closest) == null ? void 0 : _b.call(_a2, "[data-card-menu]"))) this.menuFor.set(null);
  }
  openCreate() {
    this.formMode.set("create");
    this.editId.set(null);
    this.form.set({ ...this.emptyForm });
    this.errors.set({});
    this.createOpen.set(true);
  }
  openEdit(id) {
    var _a2, _b;
    this.menuFor.set(null);
    const scoop = this.store.state().scoops.find((x) => x.id === id);
    if (!scoop) return;
    this.formMode.set("edit");
    this.editId.set(id);
    this.form.set({
      ...this.emptyForm,
      name: scoop.name,
      commune: scoop.commune,
      code: (_a2 = scoop.code) != null ? _a2 : "",
      region: (_b = scoop.region) != null ? _b : ""
    });
    this.errors.set({});
    this.createOpen.set(true);
  }
  submitForm() {
    if (this.formMode() === "edit") this.submitEdit();
    else this.submitCreate();
  }
  /** Erreurs champ par champ : bordure rouge + message sous le champ, focus sur le premier, résumé en snackbar. */
  showIssues(issues) {
    var _a2, _b, _c, _d;
    const errs = {};
    for (const i of issues) (_b = errs[_a2 = i.field === "code" ? "name" : i.field]) != null ? _b : errs[_a2] = this.t()(i.key);
    this.errors.set(errs);
    const first = FIELD_ORDER.findIndex((k) => errs[k]);
    (_d = this.fields()[(_c = [
      0,
      1,
      3,
      4,
      5
    ][first]) != null ? _c : 0]) == null ? void 0 : _d.focus();
    this.snackbar.error(errs[FIELD_ORDER[first]]);
  }
  submitEdit() {
    var _a2;
    const id = this.editId();
    if (!id) return;
    const s = this.store.state();
    const input = this.input();
    const issues = scoopIssues(input, s.scoops, [], {
      checkManager: false,
      ignore: id
    });
    if (issues.length) return this.showIssues(issues);
    const res = this.store.actions.updateScoop(id, {
      name: input.name,
      commune: input.commune,
      code: input.code,
      region: (_a2 = input.region) != null ? _a2 : ""
    });
    if (!res.ok) {
      this.snackbar.error(this.t()(res.error));
      return;
    }
    this.createOpen.set(false);
    this.snackbar.success(this.t()("cooperatives.edit.done"));
  }
  patch(key, value) {
    this.form.update((f) => ({
      ...f,
      [key]: value
    }));
    if (key in this.errors()) this.errors.update((e) => ({
      ...e,
      [key]: void 0
    }));
  }
  input() {
    const f = this.form();
    return {
      name: f.name,
      commune: f.commune,
      code: this.shownCode(),
      region: f.region,
      manager: {
        firstName: f.managerFirstName,
        lastName: f.managerLastName,
        email: f.managerEmail
      }
    };
  }
  submitCreate() {
    const s = this.store.state();
    const input = this.input();
    const used = [...s.users.map((u) => u.email), ...s.members.map((m) => m.email)].filter(Boolean);
    const issues = scoopIssues(input, s.scoops, used);
    if (issues.length) return this.showIssues(issues);
    const res = this.store.actions.createScoop(input);
    if (!res.ok) {
      this.snackbar.error(this.t()(res.error));
      return;
    }
    this.createOpen.set(false);
    this.snackbar.success(this.t()("cooperatives.create.done", { email: input.manager.email.trim() }));
  }
  askArchive(id) {
    this.menuFor.set(null);
    const s = this.store.state();
    const scoop = s.scoops.find((x) => x.id === id);
    if (!scoop) return;
    const t = this.t();
    const blocking = blockingDossiers(id, s.dossiers).length;
    if (blocking) {
      this.archiveTarget.set({
        id,
        blocked: true,
        description: t(blocking > 1 ? "cooperatives.blocked.description.autre" : "cooperatives.blocked.description.un", {
          name: scoop.name,
          count: blocking
        }),
        accounts: ""
      });
      return;
    }
    const closing = s.users.filter((u) => {
      var _a2;
      return u.active && u.role !== "admin" && (u.scoopId === id || ((_a2 = u.scoopIds) == null ? void 0 : _a2.length) === 1 && u.scoopIds[0] === id);
    }).length;
    this.archiveTarget.set({
      id,
      blocked: false,
      description: t("cooperatives.archive.description", { name: scoop.name }),
      accounts: closing ? t(closing > 1 ? "cooperatives.archive.accounts.autre" : "cooperatives.archive.accounts.un", { count: closing }) : t("cooperatives.archive.noAccounts")
    });
  }
  confirmArchive(id) {
    const res = this.store.actions.archiveScoop(id);
    this.archiveTarget.set(null);
    if (!res.ok) {
      this.snackbar.error(this.t()(res.error));
      return;
    }
    const n = res.closedAccounts;
    this.snackbar.success(`${this.t()("cooperatives.archive.done")} \xB7 ${this.t()(n > 1 ? "cooperatives.archive.doneAccounts.autre" : "cooperatives.archive.doneAccounts.un", { count: n })}`);
  }
  restore(id) {
    this.menuFor.set(null);
    const res = this.store.actions.restoreScoop(id);
    if (!res.ok) {
      this.snackbar.error(this.t()(res.error));
      return;
    }
    this.snackbar.success(this.t()("cooperatives.restore.done"));
  }
}, _a.\u0275fac = function CooperativesPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-cooperatives-page"]],
  viewQuery: function CooperativesPage_Query(rf, ctx) {
    if (rf & 1) __viewQuerySignal(ctx.fields, TextFieldComponent, 5);
    if (rf & 2) __queryAdvance();
  },
  hostBindings: function CooperativesPage_HostBindings(rf, ctx) {
    if (rf & 1) __listener("click", function CooperativesPage_click_HostBindingHandler($event) {
      return ctx.onDocumentClick($event);
    }, __resolveDocument);
  },
  decls: 63,
  vars: 52,
  consts: [
    ["f_name", ""],
    ["f_commune", ""],
    ["f_managerFirstName", ""],
    ["f_managerLastName", ""],
    ["f_managerEmail", ""],
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
      "type",
      "button",
      1,
      "btn",
      "btn-primary"
    ],
    [1, "mt-8"],
    [
      "icon",
      "account_balance",
      "storageKey",
      "mbd.cooperatives.network",
      3,
      "title",
      "subtitle"
    ],
    [
      "collapsible-summary",
      "",
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-2"
    ],
    [1, "network"],
    [
      1,
      "level",
      "level-lg",
      3,
      "level-hero"
    ],
    [
      1,
      "mt-4",
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
      "flex",
      "flex-col",
      "p-5",
      3,
      "background",
      "border-color",
      "color"
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
      "tablist",
      1,
      "seg"
    ],
    [
      "type",
      "button",
      "role",
      "tab",
      3,
      "on"
    ],
    [
      "role",
      "radiogroup",
      1,
      "seg",
      "seg-icons"
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
      "grid_view",
      3,
      "size"
    ],
    [
      "name",
      "view_list",
      3,
      "size"
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
      "flex",
      "flex-col",
      "items-center",
      "gap-3",
      "p-10",
      "text-center"
    ],
    [
      3,
      "closed",
      "open",
      "title",
      "description",
      "icon",
      "closeLabel"
    ],
    [
      "id",
      "create-scoop",
      "novalidate",
      "",
      1,
      "space-y-5",
      "pb-4",
      3,
      "submit"
    ],
    [
      "preset",
      "scoopName",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      1,
      "grid",
      "gap-5",
      "sm:grid-cols-2"
    ],
    [
      "preset",
      "commune",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [1, "code-label"],
    [
      "aria-live",
      "polite",
      1,
      "code-box"
    ],
    [1, "code-chip"],
    [1, "code-empty"],
    [1, "code-hint"],
    [
      "preset",
      "region",
      3,
      "valueChange",
      "label",
      "optional",
      "value"
    ],
    [
      1,
      "rounded-[20px]",
      "p-5",
      2,
      "background",
      "var(--v2-creme)"
    ],
    [
      "modal-footer",
      "",
      1,
      "contents"
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
      "type",
      "submit",
      "form",
      "create-scoop",
      1,
      "btn",
      "btn-primary"
    ],
    [1, "chip"],
    [
      3,
      "name",
      "size"
    ],
    [
      "tone",
      "danger",
      3,
      "open",
      "title",
      "description",
      "icon",
      "width",
      "closeLabel"
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
    [
      "name",
      "add_business",
      3,
      "size"
    ],
    [1, "badge"],
    [1, "font-extrabold"],
    [
      1,
      "font-semibold",
      "opacity-80"
    ],
    [
      "name",
      "chevron_right",
      2,
      "color",
      "var(--v2-gris-trait)",
      3,
      "size"
    ],
    [
      1,
      "level",
      "level-lg"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2.5"
    ],
    [
      1,
      "grid",
      "size-10",
      "shrink-0",
      "place-items-center",
      "rounded-[12px]"
    ],
    [1, "mono"],
    [
      1,
      "mt-3",
      "block",
      "text-[28px]",
      "font-extrabold",
      "leading-none",
      "tracking-[-0.03em]",
      "tabular-nums"
    ],
    [
      1,
      "ml-1.5",
      "text-[13px]",
      "font-semibold",
      "opacity-70"
    ],
    [
      1,
      "mt-1.5",
      "block",
      "text-[12.5px]",
      "font-medium",
      "leading-snug"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "link-arrow"
    ],
    [
      "name",
      "chevron_right",
      3,
      "size"
    ],
    [
      1,
      "card",
      "stat",
      "flex",
      "flex-col",
      "p-5"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "watermark"
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
      "text-[34px]",
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
    [
      "type",
      "button",
      "role",
      "tab",
      3,
      "click"
    ],
    [1, "n"],
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
      1,
      "text-[15px]",
      "font-semibold",
      2,
      "color",
      "var(--v2-ardoise)"
    ],
    [
      1,
      "mt-3",
      "grid",
      "gap-4",
      "md:grid-cols-2",
      "2xl:grid-cols-3"
    ],
    [
      1,
      "card",
      "coop",
      3,
      "archived"
    ],
    [3, "pager"],
    [
      1,
      "card",
      "coop"
    ],
    [
      1,
      "flex",
      "items-start",
      "gap-4",
      "p-5",
      "pb-4"
    ],
    [
      1,
      "coop-link",
      "flex",
      "min-w-0",
      "flex-1",
      "items-start",
      "gap-4",
      "rounded-[14px]",
      3,
      "routerLink"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "monogram"
    ],
    [
      1,
      "block",
      "text-[17px]",
      "font-extrabold",
      "leading-snug",
      "tracking-[-0.01em]"
    ],
    [
      1,
      "sub",
      "mt-0.5",
      "flex",
      "items-center",
      "gap-1",
      "truncate"
    ],
    [
      "data-card-menu",
      "",
      1,
      "relative"
    ],
    [
      "type",
      "button",
      "aria-haspopup",
      "menu",
      1,
      "menu-btn",
      3,
      "click"
    ],
    [
      "name",
      "more_horiz",
      3,
      "size"
    ],
    [
      "role",
      "menu",
      1,
      "menu"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "gap-2",
      "px-5"
    ],
    [
      1,
      "badge",
      2,
      "background",
      "var(--v2-lin)",
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "badge",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-vert-pousse)"
    ],
    [
      1,
      "badge",
      2,
      "background",
      "var(--v2-foret)",
      "color",
      "var(--v2-citron)"
    ],
    [
      1,
      "badge",
      2,
      "background",
      "var(--v2-creme)",
      "color",
      "var(--v2-ardoise)",
      "font-family",
      "var(--v2-font-mono)"
    ],
    [
      1,
      "structure",
      "mt-4",
      "px-5"
    ],
    [1, "level"],
    [
      1,
      "mt-4",
      "px-5"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "text-[13px]",
      "font-semibold"
    ],
    [
      2,
      "color",
      "var(--v2-ardoise)"
    ],
    [
      1,
      "font-extrabold",
      "tabular-nums"
    ],
    [
      1,
      "bar",
      "mt-1.5"
    ],
    [
      1,
      "mt-auto",
      "flex",
      "items-center",
      "gap-3",
      "border-t",
      "px-5",
      "py-4",
      2,
      "border-color",
      "var(--v2-separateur)",
      "margin-top",
      "18px"
    ],
    [
      1,
      "grid",
      "size-10",
      "shrink-0",
      "place-items-center",
      "rounded-full",
      "text-[12px]",
      "font-extrabold",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-foret)"
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
      "badge",
      3,
      "background",
      "color"
    ],
    [
      "name",
      "location_on",
      3,
      "size"
    ],
    [
      "role",
      "menuitem",
      3,
      "routerLink"
    ],
    [
      "name",
      "open_in_new",
      3,
      "size"
    ],
    [
      "type",
      "button",
      "role",
      "menuitem",
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
      "type",
      "button",
      "role",
      "menuitem"
    ],
    [
      "type",
      "button",
      "role",
      "menuitem",
      2,
      "color",
      "var(--v2-erreur-fg)"
    ],
    [
      "name",
      "unarchive",
      3,
      "size"
    ],
    [
      "type",
      "button",
      "role",
      "menuitem",
      2,
      "color",
      "var(--v2-erreur-fg)",
      3,
      "click"
    ],
    [
      "name",
      "archive",
      3,
      "size"
    ],
    [
      "name",
      "check_circle",
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
      1,
      "flex",
      "items-center",
      "gap-2"
    ],
    [
      1,
      "grid",
      "size-8",
      "shrink-0",
      "place-items-center",
      "rounded-[10px]"
    ],
    [
      1,
      "mono",
      2,
      "color",
      "var(--v2-ardoise)"
    ],
    [
      1,
      "mt-2",
      "block",
      "text-[22px]",
      "font-extrabold",
      "leading-none",
      "tracking-[-0.02em]",
      "tabular-nums"
    ],
    [
      1,
      "ml-1",
      "text-[12px]",
      "font-semibold",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "mt-1",
      "block",
      "text-[11.5px]",
      "font-medium",
      "leading-snug",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "card",
      "mt-3",
      "overflow-x-auto"
    ],
    [
      1,
      "w-full",
      "min-w-[820px]",
      "text-left",
      "text-[14px]"
    ],
    [
      1,
      "px-5",
      "py-3",
      "font-bold"
    ],
    [
      1,
      "px-3",
      "py-3",
      "font-bold"
    ],
    [
      1,
      "px-2.5",
      "py-3",
      "text-right",
      "font-bold"
    ],
    [
      1,
      "py-3",
      "pl-2",
      "pr-4",
      "text-right",
      "font-bold"
    ],
    [
      "tabindex",
      "0",
      1,
      "row",
      2,
      "border-top",
      "1px solid var(--v2-separateur)",
      3,
      "routerLink"
    ],
    [
      1,
      "px-4",
      "pb-4",
      3,
      "pager"
    ],
    [
      1,
      "px-5",
      "py-3.5"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-3"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "monogram",
      2,
      "height",
      "40px",
      "width",
      "40px",
      "border-radius",
      "12px",
      "font-size",
      "12px"
    ],
    [
      1,
      "block",
      "truncate",
      "font-bold"
    ],
    [
      1,
      "px-3",
      "py-3.5"
    ],
    [
      1,
      "px-3",
      "py-3.5",
      "text-right",
      "font-semibold",
      "tabular-nums"
    ],
    [
      1,
      "px-3",
      "py-3.5",
      "text-right",
      "font-extrabold",
      "tabular-nums"
    ],
    [
      1,
      "bar",
      "w-14"
    ],
    [
      1,
      "whitespace-nowrap",
      "text-[13px]",
      "font-bold",
      "tabular-nums"
    ],
    [
      1,
      "block",
      "max-w-[160px]",
      "truncate",
      "font-semibold"
    ],
    [
      1,
      "badge",
      "mt-1",
      3,
      "background",
      "color"
    ],
    [
      1,
      "py-3.5",
      "pl-2",
      "pr-4",
      3,
      "click"
    ],
    [1, "actions"],
    [
      1,
      "act",
      3,
      "routerLink"
    ],
    [
      "name",
      "visibility",
      3,
      "size"
    ],
    [
      1,
      "badge",
      "mt-1"
    ],
    [
      "type",
      "button",
      1,
      "act",
      3,
      "click"
    ],
    [
      "type",
      "button",
      1,
      "act",
      "act-ok"
    ],
    [
      "type",
      "button",
      1,
      "act",
      "act-danger"
    ],
    [
      "type",
      "button",
      1,
      "act",
      "act-ok",
      3,
      "click"
    ],
    [
      "type",
      "button",
      1,
      "act",
      "act-danger",
      3,
      "click"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2",
      "text-[15px]",
      "font-extrabold"
    ],
    [
      "name",
      "person_add",
      3,
      "size"
    ],
    [
      1,
      "sub",
      "mt-1"
    ],
    [
      1,
      "mt-4",
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
      "mt-5",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      "tone",
      "danger",
      3,
      "closed",
      "open",
      "title",
      "description",
      "icon",
      "width",
      "closeLabel"
    ],
    [
      1,
      "mb-4",
      "flex",
      "items-center",
      "gap-2",
      "rounded-[14px]",
      "p-3",
      "text-[14px]",
      "font-semibold",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
    ],
    [
      "routerLink",
      "/dashboard/dossiers",
      1,
      "btn",
      "btn-primary"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-danger"
    ],
    [
      "name",
      "person",
      3,
      "size"
    ],
    [
      "routerLink",
      "/dashboard/dossiers",
      1,
      "btn",
      "btn-primary",
      3,
      "click"
    ],
    [
      "name",
      "arrow_forward",
      3,
      "size"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-danger",
      3,
      "click"
    ]
  ],
  template: function CooperativesPage_Template(rf, ctx) {
    var _a2, _b;
    if (rf & 1) {
      const _r1 = __getCurrentView();
      __elementStart(0, "app-shell", 5)(1, "header", 6)(2, "div", 7)(3, "p", 8);
      __text(4);
      __elementEnd();
      __elementStart(5, "h1", 9);
      __text(6);
      __elementEnd();
      __elementStart(7, "p", 10);
      __text(8);
      __elementEnd()();
      __conditionalCreate(9, CooperativesPage_Conditional_9_Template, 4, 2, "button", 11);
      __elementEnd();
      __elementStart(10, "section", 12)(11, "ui-collapsible", 13)(12, "div", 14);
      __repeaterCreate(13, CooperativesPage_For_14_Template, 6, 9, null, null, _forTrack0);
      __elementEnd();
      __elementStart(15, "ol", 15);
      __repeaterCreate(16, CooperativesPage_For_17_Template, 13, 19, "li", 16, _forTrack0);
      __elementEnd()()();
      __elementStart(18, "section", 17);
      __repeaterCreate(19, CooperativesPage_For_20_Template, 12, 23, "div", 18, _forTrack1);
      __elementEnd();
      __elementStart(21, "div", 19)(22, "label", 20);
      __element(23, "ui-icon", 21);
      __elementStart(24, "input", 22);
      __listener("input", function CooperativesPage_Template_input_input_24_listener($event) {
        return ctx.q.set($event.target.value);
      });
      __elementEnd()();
      __elementStart(25, "div", 23);
      __repeaterCreate(26, CooperativesPage_For_27_Template, 4, 5, "button", 24, _forTrack2);
      __elementEnd();
      __elementStart(28, "div", 25)(29, "button", 26);
      __listener("click", function CooperativesPage_Template_button_click_29_listener() {
        return ctx.setView("grid");
      });
      __element(30, "ui-icon", 27);
      __elementEnd();
      __elementStart(31, "button", 26);
      __listener("click", function CooperativesPage_Template_button_click_31_listener() {
        return ctx.setView("list");
      });
      __element(32, "ui-icon", 28);
      __elementEnd()()();
      __elementStart(33, "p", 29);
      __text(34);
      __elementEnd();
      __conditionalCreate(35, CooperativesPage_Conditional_35_Template, 5, 2, "div", 30)(36, CooperativesPage_Conditional_36_Template, 4, 1)(37, CooperativesPage_Conditional_37_Template, 24, 9);
      __elementStart(38, "ui-modal", 31);
      __listener("closed", function CooperativesPage_Template_ui_modal_closed_38_listener() {
        return ctx.createOpen.set(false);
      });
      __elementStart(39, "form", 32);
      __listener("submit", function CooperativesPage_Template_form_submit_39_listener($event) {
        __restoreView(_r1);
        $event.preventDefault();
        return __resetView(ctx.submitForm());
      });
      __elementStart(40, "ui-text-field", 33, 0);
      __listener("valueChange", function CooperativesPage_Template_ui_text_field_valueChange_40_listener($event) {
        return ctx.patch("name", $event);
      });
      __elementEnd();
      __elementStart(42, "div", 34)(43, "ui-text-field", 35, 1);
      __listener("valueChange", function CooperativesPage_Template_ui_text_field_valueChange_43_listener($event) {
        return ctx.patch("commune", $event);
      });
      __elementEnd();
      __elementStart(45, "div")(46, "p", 36);
      __text(47);
      __elementEnd();
      __elementStart(48, "div", 37);
      __conditionalCreate(49, CooperativesPage_Conditional_49_Template, 2, 1, "span", 38)(50, CooperativesPage_Conditional_50_Template, 2, 1, "span", 39);
      __elementEnd();
      __elementStart(51, "p", 40);
      __text(52);
      __elementEnd()()();
      __elementStart(53, "ui-text-field", 41);
      __listener("valueChange", function CooperativesPage_Template_ui_text_field_valueChange_53_listener($event) {
        return ctx.patch("region", $event);
      });
      __elementEnd();
      __conditionalCreate(54, CooperativesPage_Conditional_54_Template, 13, 12, "div", 42);
      __elementEnd();
      __elementStart(55, "div", 43)(56, "button", 44);
      __listener("click", function CooperativesPage_Template_button_click_56_listener() {
        return ctx.createOpen.set(false);
      });
      __text(57);
      __elementEnd();
      __elementStart(58, "button", 45);
      __text(59);
      __elementStart(60, "span", 46);
      __element(61, "ui-icon", 47);
      __elementEnd()()()();
      __conditionalCreate(62, CooperativesPage_Conditional_62_Template, 7, 9, "ui-modal", 48);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_45_0;
      let tmp_55_0;
      __property("perm", ctx.perms)("area", ctx.t()("cooperatives.area"));
      __advance(4);
      __textInterpolate(ctx.t()("cooperatives.eyebrow"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("cooperatives.title"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("cooperatives.description"), " ");
      __advance();
      __conditional(ctx.canManage() ? 9 : -1);
      __advance(2);
      __property("title", ctx.t()("cooperatives.network.title"))("subtitle", ctx.t()("cooperatives.network.subtitle"));
      __advance(2);
      __repeater(ctx.network());
      __advance(3);
      __repeater(ctx.network());
      __advance(2);
      __attribute("aria-label", ctx.t()("cooperatives.title"));
      __advance();
      __repeater(ctx.stats());
      __advance(4);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("cooperatives.search.placeholder"))("value", ctx.q());
      __attribute("aria-label", ctx.t()("cooperatives.search.aria"));
      __advance();
      __attribute("aria-label", ctx.t()("cooperatives.title"));
      __advance();
      __repeater(ctx.filterButtons());
      __advance(2);
      __attribute("aria-label", ctx.t()("cooperatives.view.aria"));
      __advance();
      __classProp("on", ctx.view() === "grid");
      __attribute("aria-checked", ctx.view() === "grid")("title", ctx.t()("cooperatives.view.grid"))("aria-label", ctx.t()("cooperatives.view.grid"));
      __advance();
      __property("size", 20);
      __advance();
      __classProp("on", ctx.view() === "list");
      __attribute("aria-checked", ctx.view() === "list")("title", ctx.t()("cooperatives.view.list"))("aria-label", ctx.t()("cooperatives.view.list"));
      __advance();
      __property("size", 20);
      __advance(2);
      __textInterpolate(ctx.countLabel());
      __advance();
      __conditional(ctx.shown().length === 0 ? 35 : ctx.view() === "grid" ? 36 : 37);
      __advance(3);
      __property("open", ctx.createOpen())("title", ctx.formMode() === "edit" ? ctx.t()("cooperatives.edit.title") : ctx.t()("cooperatives.create.title"))("description", ctx.formMode() === "edit" ? ctx.t()("cooperatives.edit.description") : ctx.t()("cooperatives.create.description"))("icon", ctx.formMode() === "edit" ? "edit" : "add_business")("closeLabel", ctx.t()("cooperatives.form.cancel"));
      __advance(2);
      __property("label", ctx.t()("cooperatives.form.name"))("value", ctx.form().name)("error", (_a2 = ctx.errors().name) != null ? _a2 : "");
      __advance(3);
      __property("label", ctx.t()("cooperatives.form.commune"))("value", ctx.form().commune)("error", (_b = ctx.errors().commune) != null ? _b : "");
      __advance(4);
      __textInterpolate(ctx.t()("cooperatives.form.code"));
      __advance(2);
      __conditional((tmp_45_0 = ctx.shownCode()) ? 49 : 50, tmp_45_0);
      __advance(3);
      __textInterpolate(ctx.formMode() === "edit" ? ctx.t()("cooperatives.form.codeKept") : ctx.t()("cooperatives.form.codeAuto"));
      __advance();
      __property("label", ctx.t()("cooperatives.form.region"))("optional", ctx.t()("cooperatives.form.regionOptional"))("value", ctx.form().region);
      __advance();
      __conditional(ctx.formMode() === "create" ? 54 : -1);
      __advance(3);
      __textInterpolate1(" ", ctx.t()("cooperatives.form.cancel"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.formMode() === "edit" ? ctx.t()("cooperatives.edit.submit") : ctx.t()("cooperatives.create.submit"), " ");
      __advance(2);
      __property("name", ctx.formMode() === "edit" ? "check" : "mark_email_unread")("size", 20);
      __advance();
      __conditional((tmp_55_0 = ctx.archiveTarget()) ? 62 : -1, tmp_55_0);
    }
  },
  dependencies: [
    PaginationComponent,
    RouterLink,
    AppShellComponent,
    IconComponent,
    ModalComponent,
    TextFieldComponent,
    CollapsibleComponent
  ],
  styles: ["\n    .code-label[_ngcontent-%COMP%] {\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0.06em;\n      text-transform: uppercase;\n      color: var(--%NS%v2-ardoise);\n    }\n    .code-box[_ngcontent-%COMP%] {\n      display: flex;\n      height: 52px;\n      align-items: center;\n      margin-top: 8px;\n      border-radius: 16px;\n      border: 1.5px dashed var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-creme);\n      padding: 0 14px;\n    }\n    .code-chip[_ngcontent-%COMP%] {\n      border-radius: 10px;\n      background: var(--%NS%v2-foret);\n      padding: 5px 12px;\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 15px;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      color: var(--%NS%v2-citron);\n    }\n    .code-empty[_ngcontent-%COMP%] {\n      font-size: 14px;\n      font-weight: 500;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .code-hint[_ngcontent-%COMP%] {\n      margin-top: 6px;\n      font-size: 13px;\n      font-weight: 500;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .mono[_ngcontent-%COMP%] {\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .card[_ngcontent-%COMP%] {\n      border-radius: 24px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n    }\n    .sub[_ngcontent-%COMP%] {\n      font-size: 13px;\n      font-weight: 500;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .stat[_ngcontent-%COMP%] {\n      position: relative;\n      overflow: hidden;\n      transition:\n        transform 0.2s ease,\n        box-shadow 0.2s ease;\n    }\n    .stat[_ngcontent-%COMP%]:hover {\n      transform: translateY(-2px);\n      box-shadow: var(--%NS%v2-ombre-flottant);\n    }\n    .watermark[_ngcontent-%COMP%] {\n      pointer-events: none;\n      position: absolute;\n      right: -18px;\n      bottom: -26px;\n      opacity: 0.12;\n      transform: rotate(-12deg);\n      transition: transform 0.35s ease;\n    }\n    .stat[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%] {\n      transform: rotate(-4deg) scale(1.06);\n    }\n    .btn[_ngcontent-%COMP%] {\n      display: inline-flex;\n      height: 48px;\n      align-items: center;\n      gap: 10px;\n      border-radius: 16px;\n      padding: 0 18px;\n      font-size: 15px;\n      font-weight: 800;\n      cursor: pointer;\n      transition:\n        background-color 0.15s ease,\n        border-color 0.15s ease;\n    }\n    .btn-primary[_ngcontent-%COMP%] {\n      padding: 0 6px 0 18px;\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    .btn-primary[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-foret-clair);\n    }\n    .btn-ghost[_ngcontent-%COMP%] {\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-encre);\n    }\n    .btn-ghost[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-texte);\n    }\n    .btn-danger[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-erreur-fg);\n      color: var(--%NS%v2-blanc);\n    }\n    .btn-danger[_ngcontent-%COMP%]:hover {\n      background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, var(--%NS%v2-encre));\n    }\n    .chip[_ngcontent-%COMP%] {\n      display: grid;\n      height: 36px;\n      width: 36px;\n      place-items: center;\n      border-radius: 12px;\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n    }\n    .toolbar[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      align-items: center;\n      gap: 8px;\n      padding: 8px;\n      border-radius: 20px;\n    }\n    .search[_ngcontent-%COMP%] {\n      display: flex;\n      flex: 1 1 260px;\n      min-width: 0;\n      height: 48px;\n      align-items: center;\n      gap: 10px;\n      border-radius: 14px;\n      background: var(--%NS%v2-creme);\n      padding: 0 14px;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .search[_ngcontent-%COMP%]:focus-within {\n      box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n    }\n    .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n      min-width: 0;\n      flex: 1;\n      background: transparent;\n      font-size: 15px;\n      font-weight: 600;\n      color: var(--%NS%v2-encre);\n      outline: none;\n    }\n    .seg[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 4px;\n      overflow-x: auto;\n      scrollbar-width: none;\n      border-radius: 14px;\n      background: var(--%NS%v2-creme);\n      padding: 4px;\n    }\n    .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n      display: none;\n    }\n    .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n      display: inline-flex;\n      flex-shrink: 0;\n      align-items: center;\n      gap: 7px;\n      white-space: nowrap;\n      border-radius: 10px;\n      padding: 9px 14px;\n      font-size: 14px;\n      font-weight: 700;\n      color: var(--%NS%v2-gris-texte);\n      cursor: pointer;\n    }\n    .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n      color: var(--%NS%v2-encre);\n    }\n    .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-foret);\n      box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n    }\n    .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      padding: 1px 7px;\n      font-size: 12px;\n      font-variant-numeric: tabular-nums;\n      background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n      color: var(--%NS%v2-ardoise);\n    }\n    .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    .seg-icons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n      padding: 9px 11px;\n    }\n    .badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n      border-radius: 999px;\n      padding: 3px 10px 3px 8px;\n      font-size: 12px;\n      font-weight: 800;\n      white-space: nowrap;\n    }\n    .coop[_ngcontent-%COMP%] {\n      position: relative;\n      display: flex;\n      flex-direction: column;\n      transition:\n        transform 0.2s ease,\n        box-shadow 0.2s ease,\n        border-color 0.2s ease;\n    }\n    .coop[_ngcontent-%COMP%]:hover {\n      transform: translateY(-2px);\n      border-color: var(--%NS%v2-gris-trait);\n      box-shadow: var(--%NS%v2-ombre-flottant);\n    }\n    .coop.archived[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-creme);\n    }\n    .monogram[_ngcontent-%COMP%] {\n      display: grid;\n      height: 52px;\n      width: 52px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 16px;\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 15px;\n      font-weight: 700;\n      letter-spacing: 0.04em;\n    }\n    .archived[_ngcontent-%COMP%]   .monogram[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-gris-trait);\n      color: var(--%NS%v2-blanc);\n    }\n    \n    .structure[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n      gap: 8px;\n    }\n    .level[_ngcontent-%COMP%] {\n      position: relative;\n      border-radius: 16px;\n      background: var(--%NS%v2-creme);\n      padding: 12px;\n    }\n    \n    .zero[_ngcontent-%COMP%] {\n      color: var(--%NS%v2-gris-trait) !important;\n    }\n    \n    .network[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: minmax(0, 1fr);\n      gap: 16px;\n    }\n    @media (min-width: 640px) {\n      .network[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n    }\n    @media (min-width: 1280px) {\n      .network[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(4, minmax(0, 1fr));\n      }\n    }\n    .level-lg[_ngcontent-%COMP%] {\n      padding: 20px;\n      border-radius: 24px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n    }\n    .level-hero[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    @media (max-width: 1279px) {\n      .network[_ngcontent-%COMP%]   .link-arrow[_ngcontent-%COMP%] {\n        display: none;\n      }\n    }\n    .network[_ngcontent-%COMP%]   .link-arrow[_ngcontent-%COMP%] {\n      right: -19px;\n    }\n    .link-arrow[_ngcontent-%COMP%] {\n      position: absolute;\n      right: -14px;\n      top: 50%;\n      z-index: 1;\n      display: grid;\n      height: 22px;\n      width: 22px;\n      place-items: center;\n      transform: translateY(-50%);\n      border-radius: 999px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-gris-texte);\n    }\n    .bar[_ngcontent-%COMP%] {\n      height: 8px;\n      overflow: hidden;\n      border-radius: 999px;\n      background: var(--%NS%v2-lin);\n    }\n    .bar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n      display: block;\n      height: 100%;\n      border-radius: 999px;\n    }\n    .menu-btn[_ngcontent-%COMP%] {\n      display: grid;\n      height: 40px;\n      width: 40px;\n      place-items: center;\n      border-radius: 12px;\n      color: var(--%NS%v2-gris-texte);\n      cursor: pointer;\n    }\n    .menu-btn[_ngcontent-%COMP%]:hover, \n   .menu-btn.on[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-creme);\n      color: var(--%NS%v2-encre);\n    }\n    .menu[_ngcontent-%COMP%] {\n      position: absolute;\n      right: 0;\n      top: calc(100% + 6px);\n      z-index: 30;\n      width: 220px;\n      border-radius: 16px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n      padding: 6px;\n      box-shadow: var(--%NS%v2-ombre-modale);\n    }\n    .menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n   .menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n      display: flex;\n      width: 100%;\n      align-items: center;\n      gap: 10px;\n      border-radius: 10px;\n      padding: 10px 12px;\n      text-align: left;\n      font-size: 14px;\n      font-weight: 600;\n      cursor: pointer;\n    }\n    .menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, \n   .menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-sauge);\n    }\n    \n    .actions[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: flex-end;\n      gap: 4px;\n    }\n    .act[_ngcontent-%COMP%] {\n      display: grid;\n      height: 34px;\n      width: 34px;\n      place-items: center;\n      border-radius: 12px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-ardoise);\n      cursor: pointer;\n      transition:\n        background-color 0.15s ease,\n        color 0.15s ease,\n        border-color 0.15s ease;\n    }\n    .act[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-foret);\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n    }\n    .act-danger[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-erreur-fg);\n      background: var(--%NS%v2-erreur-bg);\n      color: var(--%NS%v2-erreur-fg);\n    }\n    .act-ok[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-vert-pousse);\n      background: var(--%NS%v2-sauge);\n      color: var(--%NS%v2-vert-pousse);\n    }\n    .act[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    .row[_ngcontent-%COMP%] {\n      cursor: pointer;\n      transition: background-color 0.15s ease;\n    }\n    .row[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-creme);\n    }\n    .btn[_ngcontent-%COMP%]:focus-visible, \n   .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n   .coop-link[_ngcontent-%COMP%]:focus-visible, \n   .menu-btn[_ngcontent-%COMP%]:focus-visible, \n   .menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus-visible, \n   .menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n   .row[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .stat[_ngcontent-%COMP%], \n   .stat[_ngcontent-%COMP%]:hover, \n   .coop[_ngcontent-%COMP%], \n   .coop[_ngcontent-%COMP%]:hover, \n   .watermark[_ngcontent-%COMP%] {\n        transition: none;\n        transform: none;\n      }\n    }"]
}), _a);
function readView() {
  try {
    return false ? "list" : "grid";
  } catch {
    return "grid";
  }
}

export { CooperativesPage as default };
//# sourceMappingURL=cooperatives.page-DxHco9xW.mjs.map

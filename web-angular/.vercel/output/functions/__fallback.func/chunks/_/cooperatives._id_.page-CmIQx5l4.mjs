import { i as inject, A as ActivatedRoute, F as signal, c as computed, ɵ as __defineComponent, d as RouterLink, f as __elementStart, j as __conditionalCreate, H as __listener, h as __elementEnd, I as __twoWayListener, n as __property, o as __advance, s as __conditional, K as __twoWayProperty, k as __namespaceSVG, b as __element, l as __namespaceHTML, g as __text, m as __repeaterCreate, V as __repeaterTrackByIdentity, w as __nextContext, u as __attribute, p as __textInterpolate, q as __textInterpolate1, N as __textInterpolate2, v as __repeater, r as __pureFunction1, t as __styleProp, L as __getCurrentView, z as __classProp, O as __restoreView, P as __resetView, Q as __twoWayBindingSet } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { L as LocaleService, j as nf, h as fmtDate, a as ageAtMost, g as memberDues, f as fmtDateTime } from './locale.service-c0QhtcVY.mjs';
import { m as managerOf, a as accountOf } from './scoop-account-Bqdc3Ifh.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { f as DetailModalComponent, P as PaginationComponent } from './ui-DDO8FoUF.mjs';
import { T as TechnicianDialogComponent } from './technician-dialog.component-BZhETki0.mjs';
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
var _c0 = (a0) => [a0];
var _c1 = (a0) => ({ date: a0 });
var _c2 = (a0) => ["/dashboard/reunions", a0];
var _c3 = (a0) => ({ name: a0 });
var _c4 = (a0) => ({ count: a0 });
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
function CooperativeDetailPage_Conditional_1_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 19);
    __element(1, "ui-icon", 39);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate(ctx_r0.t()("cooperatives.status.archived"));
  }
}
function CooperativeDetailPage_Conditional_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 20);
    __element(1, "ui-icon", 40);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate(ctx_r0.t()("cooperatives.status.active"));
  }
}
function CooperativeDetailPage_Conditional_1_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 21);
    __element(1, "ui-icon", 41);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate(ctx_r0.t()("cooperatives.badge.new"));
  }
}
function CooperativeDetailPage_Conditional_1_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 22);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const coop_r2 = __nextContext();
    __advance();
    __textInterpolate(coop_r2.code);
  }
}
function CooperativeDetailPage_Conditional_1_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 24);
    __element(1, "ui-icon", 42);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const coop_r2 = __nextContext();
    const ctx_r0 = __nextContext();
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.created", __pureFunction1(2, _c1, ctx_r0.fmtDate(coop_r2.createdAt))));
  }
}
function CooperativeDetailPage_Conditional_1_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 34);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const managerUser_r3 = ctx;
    __advance();
    __textInterpolate2("", managerUser_r3.email, "", managerUser_r3.phone ? " \xB7 " + managerUser_r3.phone : "");
  }
}
function CooperativeDetailPage_Conditional_1_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 43);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __styleProp("background", ctx_r0.account(ctx_r0.manager().state).bg)("color", ctx_r0.account(ctx_r0.manager().state).fg);
    __advance();
    __textInterpolate(ctx_r0.t()(ctx_r0.account(ctx_r0.manager().state).label));
  }
}
function CooperativeDetailPage_Conditional_1_For_46_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 46);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const tabItem_r5 = __nextContext().$implicit;
    __advance();
    __textInterpolate(tabItem_r5.count);
  }
}
function CooperativeDetailPage_Conditional_1_For_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "button", 44);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_46_Template_button_click_0_listener() {
      const tabItem_r5 = __restoreView(_r4).$implicit;
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.tab.set(tabItem_r5.id));
    });
    __element(1, "ui-icon", 45);
    __text(2);
    __conditionalCreate(3, CooperativeDetailPage_Conditional_1_For_46_Conditional_3_Template, 2, 1, "span", 46);
    __elementEnd();
  }
  if (rf & 2) {
    const tabItem_r5 = ctx.$implicit;
    const ctx_r0 = __nextContext(2);
    __classProp("on", ctx_r0.tab() === tabItem_r5.id);
    __attribute("aria-selected", ctx_r0.tab() === tabItem_r5.id);
    __advance();
    __property("name", tabItem_r5.icon)("size", 18);
    __advance();
    __textInterpolate1("", tabItem_r5.label, " ");
    __advance();
    __conditional(tabItem_r5.count !== null ? 3 : -1);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 81)(1, "span", 82);
    __element(2, "ui-icon", 45);
    __elementEnd();
    __elementStart(3, "div", 83)(4, "span", 84);
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 85);
    __element(7, "ui-icon", 45);
    __elementEnd()();
    __elementStart(8, "span", 86);
    __text(9);
    __elementEnd();
    __elementStart(10, "span", 87);
    __text(11);
    __elementEnd()();
  }
  if (rf & 2) {
    const stat_r7 = ctx.$implicit;
    const \u0275$index_122_r8 = ctx.$index;
    __styleProp("background", \u0275$index_122_r8 === 0 ? "var(--v2-foret)" : stat_r7.bg)("border-color", \u0275$index_122_r8 === 0 ? "var(--v2-foret)" : "transparent")("color", \u0275$index_122_r8 === 0 ? "var(--v2-blanc)" : stat_r7.fg);
    __advance();
    __styleProp("color", \u0275$index_122_r8 === 0 ? "var(--v2-citron)" : stat_r7.fg);
    __advance();
    __property("name", stat_r7.icon)("size", 120);
    __advance(2);
    __styleProp("opacity", \u0275$index_122_r8 === 0 ? 0.8 : 1);
    __advance();
    __textInterpolate(stat_r7.label);
    __advance();
    __styleProp("background", \u0275$index_122_r8 === 0 ? "var(--v2-citron)" : stat_r7.fg)("color", \u0275$index_122_r8 === 0 ? "var(--v2-foret)" : stat_r7.bg);
    __advance();
    __property("name", stat_r7.icon)("size", 20);
    __advance(2);
    __textInterpolate(stat_r7.value);
    __advance(2);
    __textInterpolate(stat_r7.sub);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_1_For_18_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 62)(1, "span", 88);
    __element(2, "span", 89);
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 90);
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const share_r9 = ctx.$implicit;
    const ctx_r0 = __nextContext(4);
    __advance(2);
    __styleProp("background", share_r9.color);
    __advance();
    __textInterpolate(share_r9.label);
    __advance();
    __classProp("zero", !share_r9.n);
    __advance();
    __textInterpolate(ctx_r0.nf.format(share_r9.n));
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_1_For_26_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li")(1, "div", 91)(2, "span");
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 90);
    __text(5);
    __elementStart(6, "span", 92);
    __text(7);
    __elementEnd()()();
    __elementStart(8, "div", 93);
    __element(9, "span");
    __elementEnd()();
  }
  if (rf & 2) {
    const share_r10 = ctx.$implicit;
    const ctx_r0 = __nextContext(4);
    __advance(3);
    __textInterpolate(share_r10.label);
    __advance();
    __classProp("zero", !share_r10.n);
    __advance();
    __textInterpolate1("", ctx_r0.nf.format(share_r10.n), " ");
    __advance(2);
    __textInterpolate1("\xB7 ", share_r10.pct, " %");
    __advance(2);
    __styleProp("width", share_r10.pct, "%")("background", share_r10.color);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_1_For_34_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 94)(1, "dt");
    __text(2);
    __elementEnd();
    __elementStart(3, "dd");
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const infoRow_r11 = ctx.$implicit;
    const \u0275$index_220_r12 = ctx.$index;
    __styleProp("border-top", \u0275$index_220_r12 === 0 ? "none" : "1px solid var(--v2-separateur)");
    __advance(2);
    __textInterpolate(infoRow_r11.label);
    __advance();
    __classProp("zero", !infoRow_r11.known);
    __advance();
    __textInterpolate(infoRow_r11.value);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_1_For_41_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li")(1, "a", 95)(2, "span", 96);
    __element(3, "ui-icon", 45);
    __elementEnd();
    __elementStart(4, "span", 97);
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 98);
    __text(7);
    __elementEnd();
    __element(8, "ui-icon", 99);
    __elementEnd()();
  }
  if (rf & 2) {
    const pendingItem_r13 = ctx.$implicit;
    const ctx_r0 = __nextContext(4);
    __advance();
    __property("routerLink", pendingItem_r13.to);
    __advance();
    __styleProp("background", pendingItem_r13.fg)("color", pendingItem_r13.bg);
    __advance();
    __property("name", pendingItem_r13.icon)("size", 20);
    __advance(2);
    __textInterpolate(pendingItem_r13.label);
    __advance();
    __classProp("zero", !pendingItem_r13.n);
    __advance();
    __textInterpolate(ctx_r0.nf.format(pendingItem_r13.n));
    __advance();
    __property("size", 18);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_1_For_51_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li")(1, "a", 95)(2, "span", 100)(3, "span", 101);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 102);
    __text(6);
    __elementEnd()();
    __elementStart(7, "span", 31)(8, "span", 103);
    __text(9);
    __elementEnd();
    __elementStart(10, "span", 104);
    __element(11, "ui-icon", 25);
    __text(12);
    __elementEnd()();
    __element(13, "ui-icon", 99);
    __elementEnd()();
  }
  if (rf & 2) {
    const meeting_r14 = ctx.$implicit;
    __advance();
    __property("routerLink", __pureFunction1(7, _c2, meeting_r14.id));
    __advance(3);
    __textInterpolate(meeting_r14.day);
    __advance(2);
    __textInterpolate(meeting_r14.month);
    __advance(3);
    __textInterpolate(meeting_r14.title);
    __advance(2);
    __property("size", 14);
    __advance();
    __textInterpolate(meeting_r14.place);
    __advance();
    __property("size", 18);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_1_ForEmpty_52_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 80);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("dashboard.meetings.empty"), " ");
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "section", 49);
    __repeaterCreate(1, CooperativeDetailPage_Conditional_1_For_48_Conditional_1_For_2_Template, 12, 21, "div", 50, _forTrack1);
    __elementEnd();
    __elementStart(3, "div", 51)(4, "section", 52)(5, "div", 53)(6, "h2", 54);
    __text(7);
    __elementEnd();
    __element(8, "ui-icon", 55);
    __elementEnd();
    __elementStart(9, "div", 56)(10, "div", 57)(11, "div", 58)(12, "span", 59);
    __text(13);
    __elementStart(14, "span", 60);
    __text(15, " %");
    __elementEnd()()()();
    __elementStart(16, "ul", 61);
    __repeaterCreate(17, CooperativeDetailPage_Conditional_1_For_48_Conditional_1_For_18_Template, 6, 6, "li", 62, _forTrack1);
    __elementEnd()()();
    __elementStart(19, "section", 63)(20, "div", 53)(21, "h2", 64);
    __text(22);
    __elementEnd();
    __element(23, "ui-icon", 65);
    __elementEnd();
    __elementStart(24, "ul", 66);
    __repeaterCreate(25, CooperativeDetailPage_Conditional_1_For_48_Conditional_1_For_26_Template, 10, 9, "li", null, _forTrack1);
    __elementEnd()();
    __elementStart(27, "section", 67)(28, "div", 53)(29, "h2", 68);
    __text(30);
    __elementEnd();
    __element(31, "ui-icon", 69);
    __elementEnd();
    __elementStart(32, "dl", 70);
    __repeaterCreate(33, CooperativeDetailPage_Conditional_1_For_48_Conditional_1_For_34_Template, 5, 6, "div", 71, _forTrack1);
    __elementEnd()()();
    __elementStart(35, "div", 72)(36, "section", 73)(37, "h2", 74);
    __text(38);
    __elementEnd();
    __elementStart(39, "ul", 75);
    __repeaterCreate(40, CooperativeDetailPage_Conditional_1_For_48_Conditional_1_For_41_Template, 9, 12, "li", null, _forTrack1);
    __elementEnd()();
    __elementStart(42, "section", 76)(43, "div", 53)(44, "h2", 77);
    __text(45);
    __elementEnd();
    __elementStart(46, "button", 78);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_1_Template_button_click_46_listener() {
      __restoreView(_r6);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.tab.set("reunions"));
    });
    __text(47);
    __element(48, "ui-icon", 79);
    __elementEnd()();
    __elementStart(49, "ul", 75);
    __repeaterCreate(50, CooperativeDetailPage_Conditional_1_For_48_Conditional_1_For_51_Template, 14, 9, "li", null, _forTrack0, false, CooperativeDetailPage_Conditional_1_For_48_Conditional_1_ForEmpty_52_Template, 2, 1, "li", 80);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __repeater(ctx_r0.stats());
    __advance(6);
    __textInterpolate(ctx_r0.t()("dashboard.quality.title"));
    __advance();
    __property("size", 22);
    __advance(2);
    __styleProp("background", ctx_r0.quality().ring);
    __attribute("aria-label", ctx_r0.quality().pct + " % " + ctx_r0.t()("dashboard.quality.ring"));
    __advance(3);
    __textInterpolate(ctx_r0.quality().pct);
    __advance(4);
    __repeater(ctx_r0.quality().rows);
    __advance(5);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.compo.title"));
    __advance();
    __property("size", 22);
    __advance(2);
    __repeater(ctx_r0.composition());
    __advance(5);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.info.title"));
    __advance();
    __property("size", 22);
    __advance(2);
    __repeater(ctx_r0.info());
    __advance(5);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.pending.title"));
    __advance(2);
    __repeater(ctx_r0.pending());
    __advance(5);
    __textInterpolate(ctx_r0.t()("dashboard.meetings.title"));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.reunions.all"), " ");
    __advance();
    __property("size", 16);
    __advance(2);
    __repeater(ctx_r0.upcoming());
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = __getCurrentView();
    __elementStart(0, "button", 112);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_2_For_7_Template_button_click_0_listener() {
      const filterButton_r17 = __restoreView(_r16).$implicit;
      const ctx_r0 = __nextContext(4);
      return __resetView(ctx_r0.orgFilter.set(filterButton_r17.id));
    });
    __text(1);
    __elementStart(2, "span", 46);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const filterButton_r17 = ctx.$implicit;
    const ctx_r0 = __nextContext(4);
    __classProp("on", ctx_r0.orgFilter() === filterButton_r17.id);
    __attribute("aria-checked", ctx_r0.orgFilter() === filterButton_r17.id);
    __advance();
    __textInterpolate1(" ", filterButton_r17.label);
    __advance();
    __classProp("zero", !filterButton_r17.count);
    __advance();
    __textInterpolate(filterButton_r17.count);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Conditional_8_For_18_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 43);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const org_r19 = __nextContext().$implicit;
    __styleProp("background", org_r19.type === "GIE" ? "var(--v2-info-bg)" : "var(--v2-creme)")("color", org_r19.type === "GIE" ? "var(--v2-info-fg)" : "var(--v2-ardoise)");
    __advance();
    __textInterpolate(org_r19.type);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Conditional_8_For_18_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 129);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(6);
    __advance();
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.gie.toQualify"));
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Conditional_8_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = __getCurrentView();
    __elementStart(0, "tr", 122);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Conditional_8_For_18_Template_tr_click_0_listener() {
      const org_r19 = __restoreView(_r18).$implicit;
      const ctx_r0 = __nextContext(5);
      return __resetView(ctx_r0.openDetail("org", org_r19.id));
    });
    __elementStart(1, "td", 123)(2, "span", 124)(3, "span", 125);
    __element(4, "ui-icon", 126);
    __elementEnd();
    __elementStart(5, "span", 127);
    __text(6);
    __elementEnd()()();
    __elementStart(7, "td", 128);
    __conditionalCreate(8, CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Conditional_8_For_18_Conditional_8_Template, 2, 5, "span", 35)(9, CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Conditional_8_For_18_Conditional_9_Template, 2, 1, "span", 129);
    __elementEnd();
    __elementStart(10, "td", 130);
    __text(11);
    __elementEnd();
    __elementStart(12, "td", 131);
    __text(13);
    __elementEnd();
    __elementStart(14, "td", 132);
    __text(15);
    __elementEnd();
    __elementStart(16, "td", 133)(17, "span", 134)(18, "button", 135);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Conditional_8_For_18_Template_button_click_18_listener($event) {
      const org_r19 = __restoreView(_r18).$implicit;
      const ctx_r0 = __nextContext(5);
      $event.stopPropagation();
      return __resetView(ctx_r0.openDetail("org", org_r19.id));
    });
    __element(19, "ui-icon", 136);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const org_r19 = ctx.$implicit;
    const ctx_r0 = __nextContext(5);
    __advance(4);
    __property("size", 18);
    __advance(2);
    __textInterpolate(org_r19.name);
    __advance(2);
    __conditional(org_r19.type ? 8 : 9);
    __advance(3);
    __textInterpolate(org_r19.village || "\u2014");
    __advance();
    __classProp("zero", !org_r19.producers);
    __advance();
    __textInterpolate1(" ", ctx_r0.nf.format(org_r19.producers), " ");
    __advance();
    __classProp("zero", !org_r19.members);
    __advance();
    __textInterpolate1(" ", ctx_r0.nf.format(org_r19.members), " ");
    __advance(3);
    __property("title", ctx_r0.t()("common.view"));
    __attribute("aria-label", ctx_r0.t()("cooperatives.fiche.view.aria", __pureFunction1(13, _c3, org_r19.name)));
    __advance();
    __property("size", 18);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 113)(1, "table", 114)(2, "thead")(3, "tr", 115)(4, "th", 116);
    __text(5);
    __elementEnd();
    __elementStart(6, "th", 117);
    __text(7);
    __elementEnd();
    __elementStart(8, "th", 117);
    __text(9);
    __elementEnd();
    __elementStart(10, "th", 118);
    __text(11);
    __elementEnd();
    __elementStart(12, "th", 118);
    __text(13);
    __elementEnd();
    __elementStart(14, "th", 119);
    __text(15);
    __elementEnd()()();
    __elementStart(16, "tbody");
    __repeaterCreate(17, CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Conditional_8_For_18_Template, 20, 15, "tr", 120, _forTrack0);
    __elementEnd()()();
    __element(19, "ui-pagination", 121);
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance(5);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.gie.col.name"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.gie.col.type"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.gie.col.village"));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.gie.col.producers"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.gie.col.members"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.col.actions"), " ");
    __advance(2);
    __repeater(ctx_r0.orgPager.items());
    __advance(2);
    __property("pager", ctx_r0.orgPager);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 111);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __textInterpolate1(" ", ctx_r0.orgCount() ? ctx_r0.t()("cooperatives.fiche.gie.empty.filtered") : ctx_r0.t()("cooperatives.fiche.gie.empty.text"), " ");
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = __getCurrentView();
    __elementStart(0, "section", 47)(1, "div", 105)(2, "label", 106);
    __element(3, "ui-icon", 107);
    __elementStart(4, "input", 108);
    __listener("input", function CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Template_input_input_4_listener($event) {
      __restoreView(_r15);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.gieQ.set($event.target.value));
    });
    __elementEnd()();
    __elementStart(5, "div", 109);
    __repeaterCreate(6, CooperativeDetailPage_Conditional_1_For_48_Conditional_2_For_7_Template, 4, 7, "button", 110, _forTrack0);
    __elementEnd()();
    __conditionalCreate(8, CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Conditional_8_Template, 20, 7)(9, CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Conditional_9_Template, 2, 1, "p", 111);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance(3);
    __property("size", 20);
    __advance();
    __property("placeholder", ctx_r0.t()("cooperatives.fiche.gie.search.placeholder"))("value", ctx_r0.gieQ());
    __attribute("aria-label", ctx_r0.t()("cooperatives.fiche.gie.search.aria"));
    __advance();
    __attribute("aria-label", ctx_r0.t()("cooperatives.fiche.tab.orgs"));
    __advance();
    __repeater(ctx_r0.orgFilters());
    __advance(2);
    __conditional(ctx_r0.orgs().length ? 8 : 9);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_3_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = __getCurrentView();
    __elementStart(0, "button", 112);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_3_For_7_Template_button_click_0_listener() {
      const filterButton_r22 = __restoreView(_r21).$implicit;
      const ctx_r0 = __nextContext(4);
      return __resetView(ctx_r0.memberFilter.set(filterButton_r22.id));
    });
    __text(1);
    __elementStart(2, "span", 46);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const filterButton_r22 = ctx.$implicit;
    const ctx_r0 = __nextContext(4);
    __classProp("on", ctx_r0.memberFilter() === filterButton_r22.id);
    __attribute("aria-checked", ctx_r0.memberFilter() === filterButton_r22.id);
    __advance();
    __textInterpolate1(" ", filterButton_r22.label);
    __advance();
    __classProp("zero", !filterButton_r22.count);
    __advance();
    __textInterpolate(filterButton_r22.count);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_8_For_18_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 140);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const member_r24 = __nextContext().$implicit;
    __advance();
    __textInterpolate(member_r24.phone);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_8_For_18_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 43);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const member_r24 = __nextContext().$implicit;
    __styleProp("background", member_r24.due.bg)("color", member_r24.due.fg);
    __advance();
    __textInterpolate(member_r24.dueLabel);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_8_For_18_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 92);
    __text(1, "\u2014");
    __elementEnd();
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_8_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = __getCurrentView();
    __elementStart(0, "tr", 122);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_8_For_18_Template_tr_click_0_listener() {
      const member_r24 = __restoreView(_r23).$implicit;
      const ctx_r0 = __nextContext(5);
      return __resetView(ctx_r0.openDetail("member", member_r24.id));
    });
    __elementStart(1, "td", 116)(2, "span", 124)(3, "span", 138);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 16)(6, "span", 139);
    __text(7);
    __elementEnd();
    __conditionalCreate(8, CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_8_For_18_Conditional_8_Template, 2, 1, "span", 140);
    __elementEnd()()();
    __elementStart(9, "td", 141);
    __text(10);
    __elementEnd();
    __elementStart(11, "td", 117)(12, "span", 43);
    __text(13);
    __elementEnd()();
    __elementStart(14, "td", 142);
    __text(15);
    __elementEnd();
    __elementStart(16, "td", 117);
    __conditionalCreate(17, CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_8_For_18_Conditional_17_Template, 2, 5, "span", 35)(18, CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_8_For_18_Conditional_18_Template, 2, 0, "span", 92);
    __elementEnd();
    __elementStart(19, "td", 133)(20, "span", 134)(21, "button", 135);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_8_For_18_Template_button_click_21_listener($event) {
      const member_r24 = __restoreView(_r23).$implicit;
      const ctx_r0 = __nextContext(5);
      $event.stopPropagation();
      return __resetView(ctx_r0.openDetail("member", member_r24.id));
    });
    __element(22, "ui-icon", 136);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const member_r24 = ctx.$implicit;
    const ctx_r0 = __nextContext(5);
    __advance(4);
    __textInterpolate(member_r24.initials);
    __advance(3);
    __textInterpolate(member_r24.name);
    __advance();
    __conditional(member_r24.phone ? 8 : -1);
    __advance(2);
    __textInterpolate(member_r24.village || "\u2014");
    __advance(2);
    __styleProp("background", member_r24.status.bg)("color", member_r24.status.fg);
    __advance();
    __textInterpolate(ctx_r0.t()(member_r24.status.label));
    __advance(2);
    __textInterpolate(member_r24.joined);
    __advance(2);
    __conditional(member_r24.due ? 17 : 18);
    __advance(4);
    __property("title", ctx_r0.t()("common.view"));
    __attribute("aria-label", ctx_r0.t()("cooperatives.fiche.view.aria", __pureFunction1(14, _c3, member_r24.name)));
    __advance();
    __property("size", 18);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 113)(1, "table", 137)(2, "thead")(3, "tr", 115)(4, "th", 116);
    __text(5);
    __elementEnd();
    __elementStart(6, "th", 117);
    __text(7);
    __elementEnd();
    __elementStart(8, "th", 117);
    __text(9);
    __elementEnd();
    __elementStart(10, "th", 117);
    __text(11);
    __elementEnd();
    __elementStart(12, "th", 117);
    __text(13);
    __elementEnd();
    __elementStart(14, "th", 119);
    __text(15);
    __elementEnd()()();
    __elementStart(16, "tbody");
    __repeaterCreate(17, CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_8_For_18_Template, 23, 16, "tr", 120, _forTrack0);
    __elementEnd()()();
    __element(19, "ui-pagination", 121);
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance(5);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.membres.col.name"), " ");
    __advance(2);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.gie.col.village"));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.membres.col.status"), " ");
    __advance(2);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.membres.joined"));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.membres.col.dues"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.col.actions"), " ");
    __advance(2);
    __repeater(ctx_r0.memberPager.items());
    __advance(2);
    __property("pager", ctx_r0.memberPager);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 111);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.membres.empty.filtered"), " ");
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = __getCurrentView();
    __elementStart(0, "section", 47)(1, "div", 105)(2, "label", 106);
    __element(3, "ui-icon", 107);
    __elementStart(4, "input", 108);
    __listener("input", function CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Template_input_input_4_listener($event) {
      __restoreView(_r20);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.memberQ.set($event.target.value));
    });
    __elementEnd()();
    __elementStart(5, "div", 109);
    __repeaterCreate(6, CooperativeDetailPage_Conditional_1_For_48_Conditional_3_For_7_Template, 4, 7, "button", 110, _forTrack0);
    __elementEnd()();
    __conditionalCreate(8, CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_8_Template, 20, 7)(9, CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Conditional_9_Template, 2, 1, "p", 111);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance(3);
    __property("size", 20);
    __advance();
    __property("placeholder", ctx_r0.t()("cooperatives.fiche.membres.search.placeholder"))("value", ctx_r0.memberQ());
    __attribute("aria-label", ctx_r0.t()("cooperatives.fiche.membres.search.aria"));
    __advance();
    __attribute("aria-label", ctx_r0.t()("cooperatives.fiche.membres.col.status"));
    __advance();
    __repeater(ctx_r0.memberFilters());
    __advance(2);
    __conditional(ctx_r0.members().length ? 8 : 9);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = __getCurrentView();
    __elementStart(0, "div", 143)(1, "button", 146);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_1_Template_button_click_1_listener() {
      __restoreView(_r25);
      const ctx_r0 = __nextContext(4);
      return __resetView(ctx_r0.techOpen.set(true));
    });
    __text(2);
    __elementStart(3, "span", 147);
    __element(4, "ui-icon", 148);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("tech.add"), " ");
    __advance(2);
    __property("size", 18);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_For_17_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 151);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(6);
    __advance();
    __textInterpolate(ctx_r0.t()("tech.status.invited"));
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_For_17_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 43);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const technician_r27 = __nextContext().$implicit;
    const ctx_r0 = __nextContext(5);
    __styleProp("background", technician_r27.active ? "var(--v2-sauge)" : "var(--v2-lin)")("color", technician_r27.active ? "var(--v2-vert-pousse)" : "var(--v2-gris-texte)");
    __advance();
    __textInterpolate1(" ", technician_r27.active ? ctx_r0.t()("cooperatives.fiche.techniciens.active") : ctx_r0.t()("cooperatives.fiche.techniciens.closed"), " ");
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_For_17_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = __getCurrentView();
    __elementStart(0, "button", 153);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_For_17_Conditional_20_Template_button_click_0_listener($event) {
      __restoreView(_r28);
      const technician_r27 = __nextContext().$implicit;
      const ctx_r0 = __nextContext(5);
      $event.stopPropagation();
      return __resetView(ctx_r0.removeTech(technician_r27.id, technician_r27.name));
    });
    __element(1, "ui-icon", 154);
    __elementEnd();
  }
  if (rf & 2) {
    const technician_r27 = __nextContext().$implicit;
    const ctx_r0 = __nextContext(5);
    __property("title", ctx_r0.t()("tech.remove"));
    __attribute("aria-label", ctx_r0.t()("tech.removeAria", __pureFunction1(3, _c3, technician_r27.name)));
    __advance();
    __property("size", 18);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = __getCurrentView();
    __elementStart(0, "tr", 122);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_For_17_Template_tr_click_0_listener() {
      const technician_r27 = __restoreView(_r26).$implicit;
      const ctx_r0 = __nextContext(5);
      return __resetView(ctx_r0.openDetail("tech", technician_r27.id));
    });
    __elementStart(1, "td", 116)(2, "span", 124)(3, "span", 149);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 16)(6, "span", 139);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 150);
    __text(9);
    __elementEnd()()()();
    __elementStart(10, "td", 142);
    __text(11);
    __elementEnd();
    __elementStart(12, "td", 117)(13, "span", 151);
    __text(14);
    __elementEnd()();
    __elementStart(15, "td", 117);
    __conditionalCreate(16, CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_For_17_Conditional_16_Template, 2, 1, "span", 151)(17, CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_For_17_Conditional_17_Template, 2, 5, "span", 35);
    __elementEnd();
    __elementStart(18, "td", 133)(19, "span", 134);
    __conditionalCreate(20, CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_For_17_Conditional_20_Template, 2, 5, "button", 152);
    __elementStart(21, "button", 135);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_For_17_Template_button_click_21_listener($event) {
      const technician_r27 = __restoreView(_r26).$implicit;
      const ctx_r0 = __nextContext(5);
      $event.stopPropagation();
      return __resetView(ctx_r0.openDetail("tech", technician_r27.id));
    });
    __element(22, "ui-icon", 136);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const technician_r27 = ctx.$implicit;
    const ctx_r0 = __nextContext(5);
    __advance(4);
    __textInterpolate(technician_r27.initials);
    __advance(3);
    __textInterpolate(technician_r27.name);
    __advance(2);
    __textInterpolate(technician_r27.email);
    __advance();
    __classProp("zero", !technician_r27.phone);
    __advance();
    __textInterpolate1(" ", technician_r27.phone || "\u2014", " ");
    __advance(3);
    __textInterpolate1(" ", ctx_r0.t()(technician_r27.scoops > 1 ? "cooperatives.fiche.techniciens.scoops.autre" : "cooperatives.fiche.techniciens.scoops.un", __pureFunction1(12, _c4, technician_r27.scoops)), " ");
    __advance(2);
    __conditional(technician_r27.invited ? 16 : 17);
    __advance(4);
    __conditional(ctx_r0.canManageTech() ? 20 : -1);
    __advance();
    __property("title", ctx_r0.t()("common.view"));
    __attribute("aria-label", ctx_r0.t()("cooperatives.fiche.view.aria", __pureFunction1(14, _c3, technician_r27.name)));
    __advance();
    __property("size", 18);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 144)(1, "div", 113)(2, "table", 137)(3, "thead")(4, "tr", 115)(5, "th", 116);
    __text(6);
    __elementEnd();
    __elementStart(7, "th", 117);
    __text(8);
    __elementEnd();
    __elementStart(9, "th", 117);
    __text(10);
    __elementEnd();
    __elementStart(11, "th", 117);
    __text(12);
    __elementEnd();
    __elementStart(13, "th", 119);
    __text(14);
    __elementEnd()()();
    __elementStart(15, "tbody");
    __repeaterCreate(16, CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_For_17_Template, 23, 16, "tr", 120, _forTrack0);
    __elementEnd()()();
    __element(18, "ui-pagination", 121);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance(6);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.membres.col.name"), " ");
    __advance(2);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.detail.phone"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.detail.scoops"));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.membres.col.status"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.col.actions"), " ");
    __advance(2);
    __repeater(ctx_r0.techPager.items());
    __advance(2);
    __property("pager", ctx_r0.techPager);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 145)(1, "span", 155);
    __element(2, "ui-icon", 156);
    __elementEnd();
    __elementStart(3, "p", 157);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 158);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.techniciens.empty.title"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.techniciens.empty.text"), " ");
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 48);
    __conditionalCreate(1, CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_1_Template, 5, 2, "div", 143);
    __conditionalCreate(2, CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_2_Template, 19, 6, "div", 144)(3, CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Conditional_3_Template, 7, 3, "div", 145);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __conditional(ctx_r0.canManageTech() ? 1 : -1);
    __advance();
    __conditional(ctx_r0.technicians().length ? 2 : 3);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = __getCurrentView();
    __elementStart(0, "button", 161);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_5_For_2_Template_button_click_0_listener() {
      const meeting_r30 = __restoreView(_r29).$implicit;
      const ctx_r0 = __nextContext(4);
      return __resetView(ctx_r0.openDetail("meeting", meeting_r30.id));
    });
    __elementStart(1, "span", 162)(2, "span", 101);
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 163);
    __text(5);
    __elementEnd()();
    __elementStart(6, "span", 31)(7, "span", 103);
    __text(8);
    __elementEnd();
    __elementStart(9, "span", 150);
    __text(10);
    __elementEnd()();
    __elementStart(11, "span", 43);
    __text(12);
    __elementEnd();
    __elementStart(13, "span", 164);
    __element(14, "ui-icon", 136);
    __elementEnd()();
  }
  if (rf & 2) {
    const meeting_r30 = ctx.$implicit;
    const \u0275$index_605_r31 = ctx.$index;
    const ctx_r0 = __nextContext(4);
    __styleProp("border-top", \u0275$index_605_r31 === 0 ? "none" : "1px solid var(--v2-separateur)");
    __attribute("aria-label", ctx_r0.t()("cooperatives.fiche.view.aria", __pureFunction1(20, _c3, meeting_r30.title)));
    __advance();
    __styleProp("background", meeting_r30.past ? "var(--v2-creme)" : "var(--v2-foret)")("color", meeting_r30.past ? "var(--v2-ardoise)" : "var(--v2-blanc)");
    __advance(2);
    __textInterpolate(meeting_r30.day);
    __advance();
    __styleProp("color", meeting_r30.past ? "var(--v2-gris-texte)" : "var(--v2-citron)");
    __advance();
    __textInterpolate(meeting_r30.month);
    __advance(3);
    __textInterpolate(meeting_r30.title);
    __advance(2);
    __textInterpolate2("", meeting_r30.when, " \xB7 ", meeting_r30.place);
    __advance();
    __styleProp("background", meeting_r30.status.bg)("color", meeting_r30.status.fg);
    __advance();
    __textInterpolate(ctx_r0.t()(meeting_r30.status.label));
    __advance(2);
    __property("size", 18);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_5_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 160);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.reunions.empty.text"));
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 47);
    __repeaterCreate(1, CooperativeDetailPage_Conditional_1_For_48_Conditional_5_For_2_Template, 15, 22, "button", 159, _forTrack0, false, CooperativeDetailPage_Conditional_1_For_48_Conditional_5_ForEmpty_3_Template, 2, 1, "p", 160);
    __element(4, "ui-pagination", 121);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __repeater(ctx_r0.meetingPager.items());
    __advance(3);
    __property("pager", ctx_r0.meetingPager);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_6_Conditional_1_For_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = __getCurrentView();
    __elementStart(0, "button", 182);
    __listener("click", function CooperativeDetailPage_Conditional_1_For_48_Conditional_6_Conditional_1_For_30_Template_button_click_0_listener() {
      const lateMember_r33 = __restoreView(_r32).$implicit;
      const ctx_r0 = __nextContext(5);
      return __resetView(ctx_r0.openDetail("member", lateMember_r33.id));
    });
    __elementStart(1, "span", 183);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 184);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 185);
    __text(6);
    __elementEnd();
    __elementStart(7, "span", 164);
    __element(8, "ui-icon", 136);
    __elementEnd()();
  }
  if (rf & 2) {
    const lateMember_r33 = ctx.$implicit;
    const ctx_r0 = __nextContext(5);
    __attribute("aria-label", ctx_r0.t()("cooperatives.fiche.view.aria", __pureFunction1(5, _c3, lateMember_r33.name)));
    __advance(2);
    __textInterpolate(lateMember_r33.initials);
    __advance(2);
    __textInterpolate(lateMember_r33.name);
    __advance(2);
    __textInterpolate(lateMember_r33.owes);
    __advance(2);
    __property("size", 18);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_6_Conditional_1_ForEmpty_31_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 111);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(5);
    __advance();
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.cot.late.none"));
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 166)(1, "div", 167)(2, "span", 168);
    __element(3, "ui-icon", 169);
    __elementEnd();
    __elementStart(4, "p", 170);
    __text(5);
    __elementEnd();
    __elementStart(6, "p", 171);
    __text(7);
    __elementEnd()();
    __elementStart(8, "div", 172)(9, "span", 82);
    __element(10, "ui-icon", 40);
    __elementEnd();
    __elementStart(11, "p", 173);
    __text(12);
    __elementEnd();
    __elementStart(13, "p", 174);
    __text(14);
    __elementEnd()();
    __elementStart(15, "div", 175)(16, "span", 82);
    __element(17, "ui-icon", 176);
    __elementEnd();
    __elementStart(18, "p", 173);
    __text(19);
    __elementEnd();
    __elementStart(20, "p", 174);
    __text(21);
    __elementEnd()()();
    __elementStart(22, "section", 177)(23, "div", 178)(24, "h2", 179);
    __text(25);
    __elementEnd();
    __elementStart(26, "a", 180);
    __text(27);
    __element(28, "ui-icon", 79);
    __elementEnd()();
    __repeaterCreate(29, CooperativeDetailPage_Conditional_1_For_48_Conditional_6_Conditional_1_For_30_Template, 9, 7, "button", 181, _forTrack0, false, CooperativeDetailPage_Conditional_1_For_48_Conditional_6_Conditional_1_ForEmpty_31_Template, 2, 1, "p", 111);
    __element(32, "ui-pagination", 121);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance(3);
    __property("size", 110);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.cot.rule"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.dues().ruleLabel, " ");
    __advance(3);
    __property("size", 110);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.cot.collected"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.dues().collected, " ");
    __advance(3);
    __property("size", 110);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("cooperatives.fiche.cot.expected"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.dues().remaining, " ");
    __advance(4);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.cot.late.title"));
    __advance(2);
    __textInterpolate1("", ctx_r0.t()("cooperatives.fiche.cot.open"), " ");
    __advance();
    __property("size", 16);
    __advance();
    __repeater(ctx_r0.latePager.items());
    __advance(3);
    __property("pager", ctx_r0.latePager);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 165);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.cot.noRule"));
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 48);
    __conditionalCreate(1, CooperativeDetailPage_Conditional_1_For_48_Conditional_6_Conditional_1_Template, 33, 14)(2, CooperativeDetailPage_Conditional_1_For_48_Conditional_6_Conditional_2_Template, 2, 1, "p", 165);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __conditional(ctx_r0.dues().rule ? 1 : 2);
  }
}
function CooperativeDetailPage_Conditional_1_For_48_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 38);
    __conditionalCreate(1, CooperativeDetailPage_Conditional_1_For_48_Conditional_1_Template, 53, 15);
    __conditionalCreate(2, CooperativeDetailPage_Conditional_1_For_48_Conditional_2_Template, 10, 6, "section", 47);
    __conditionalCreate(3, CooperativeDetailPage_Conditional_1_For_48_Conditional_3_Template, 10, 6, "section", 47);
    __conditionalCreate(4, CooperativeDetailPage_Conditional_1_For_48_Conditional_4_Template, 4, 2, "section", 48);
    __conditionalCreate(5, CooperativeDetailPage_Conditional_1_For_48_Conditional_5_Template, 5, 2, "section", 47);
    __conditionalCreate(6, CooperativeDetailPage_Conditional_1_For_48_Conditional_6_Template, 3, 1, "section", 48);
    __elementEnd();
  }
  if (rf & 2) {
    const current_r34 = ctx.$implicit;
    __advance();
    __conditional(current_r34 === "apercu" ? 1 : -1);
    __advance();
    __conditional(current_r34 === "gie" ? 2 : -1);
    __advance();
    __conditional(current_r34 === "membres" ? 3 : -1);
    __advance();
    __conditional(current_r34 === "techniciens" ? 4 : -1);
    __advance();
    __conditional(current_r34 === "reunions" ? 5 : -1);
    __advance();
    __conditional(current_r34 === "cotisations" ? 6 : -1);
  }
}
function CooperativeDetailPage_Conditional_1_Template(rf, ctx) {
  var _a2, _b;
  if (rf & 1) {
    __elementStart(0, "section", 4);
    __namespaceSVG();
    __elementStart(1, "svg", 5);
    __element(2, "path", 6)(3, "path", 7)(4, "path", 8);
    __elementEnd();
    __namespaceHTML();
    __elementStart(5, "nav", 9)(6, "a", 10);
    __text(7);
    __elementEnd();
    __element(8, "ui-icon", 11);
    __elementStart(9, "span", 12);
    __text(10);
    __elementEnd()();
    __elementStart(11, "div", 13)(12, "div", 14)(13, "span", 15);
    __text(14);
    __elementEnd();
    __elementStart(15, "div", 16)(16, "h1", 17);
    __text(17);
    __elementEnd();
    __elementStart(18, "div", 18);
    __conditionalCreate(19, CooperativeDetailPage_Conditional_1_Conditional_19_Template, 3, 2, "span", 19)(20, CooperativeDetailPage_Conditional_1_Conditional_20_Template, 3, 2, "span", 20);
    __conditionalCreate(21, CooperativeDetailPage_Conditional_1_Conditional_21_Template, 3, 2, "span", 21);
    __conditionalCreate(22, CooperativeDetailPage_Conditional_1_Conditional_22_Template, 2, 1, "span", 22);
    __elementEnd();
    __elementStart(23, "p", 23)(24, "span", 24);
    __element(25, "ui-icon", 25);
    __text(26);
    __elementEnd();
    __conditionalCreate(27, CooperativeDetailPage_Conditional_1_Conditional_27_Template, 3, 4, "span", 24);
    __elementStart(28, "span", 24);
    __element(29, "ui-icon", 26);
    __text(30);
    __elementEnd()()()();
    __elementStart(31, "a", 27);
    __element(32, "ui-icon", 28);
    __text(33);
    __elementEnd()();
    __elementStart(34, "div", 29)(35, "span", 30);
    __text(36);
    __elementEnd();
    __elementStart(37, "span", 31)(38, "span", 32);
    __text(39);
    __elementEnd();
    __elementStart(40, "span", 33);
    __text(41);
    __elementEnd();
    __conditionalCreate(42, CooperativeDetailPage_Conditional_1_Conditional_42_Template, 2, 2, "span", 34);
    __elementEnd();
    __conditionalCreate(43, CooperativeDetailPage_Conditional_1_Conditional_43_Template, 2, 5, "span", 35);
    __elementEnd()();
    __elementStart(44, "div", 36);
    __repeaterCreate(45, CooperativeDetailPage_Conditional_1_For_46_Template, 4, 7, "button", 37, _forTrack0);
    __elementEnd();
    __repeaterCreate(47, CooperativeDetailPage_Conditional_1_For_48_Template, 7, 6, "div", 38, __repeaterTrackByIdentity);
  }
  if (rf & 2) {
    let tmp_21_0;
    const coop_r2 = ctx;
    const ctx_r0 = __nextContext();
    __advance(5);
    __attribute("aria-label", ctx_r0.t()("cooperatives.fiche.crumb"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.crumb"));
    __advance();
    __property("size", 16);
    __advance(2);
    __textInterpolate(coop_r2.name);
    __advance(4);
    __textInterpolate(ctx_r0.mono());
    __advance(3);
    __textInterpolate1(" ", coop_r2.name, " ");
    __advance(2);
    __conditional(coop_r2.archived ? 19 : 20);
    __advance(2);
    __conditional(ctx_r0.isNew() ? 21 : -1);
    __advance();
    __conditional(coop_r2.code ? 22 : -1);
    __advance(3);
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r0.place());
    __advance();
    __conditional(coop_r2.createdAt ? 27 : -1);
    __advance(2);
    __property("size", 16);
    __advance();
    __textInterpolate2("", ctx_r0.t()("cooperatives.network.faitiere"), " ", ctx_r0.t()("cooperatives.network.faitiereName"));
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r0.t()("cooperatives.fiche.back"), " ");
    __advance(3);
    __textInterpolate(ctx_r0.manager().initials || "\u2014");
    __advance(3);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.manager"));
    __advance(2);
    __textInterpolate((_b = (_a2 = ctx_r0.manager().user) == null ? void 0 : _a2.name) != null ? _b : ctx_r0.t()("cooperatives.fiche.managerNone"));
    __advance();
    __conditional((tmp_21_0 = ctx_r0.manager().user) ? 42 : -1, tmp_21_0);
    __advance();
    __conditional(ctx_r0.manager().user ? 43 : -1);
    __advance();
    __attribute("aria-label", ctx_r0.t()("cooperatives.fiche.tabs.aria"));
    __advance();
    __repeater(ctx_r0.tabs());
    __advance(2);
    __repeater(__pureFunction1(23, _c0, ctx_r0.tab()));
  }
}
function CooperativeDetailPage_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 1)(1, "span", 186);
    __element(2, "ui-icon", 187);
    __elementEnd();
    __elementStart(3, "h1", 188);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 92);
    __text(6);
    __elementEnd();
    __elementStart(7, "a", 189);
    __text(8);
    __element(9, "ui-icon", 79);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.notFound.title"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.notFound.text"));
    __advance(2);
    __textInterpolate1("", ctx_r0.t()("cooperatives.fiche.back"), " ");
    __advance();
    __property("size", 16);
  }
}
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
var MEMBER_STATUS = {
  membre: {
    label: "cooperatives.fiche.status.membre",
    bg: "var(--v2-sauge)",
    fg: "var(--v2-vert-pousse)"
  },
  candidat: {
    label: "cooperatives.fiche.status.candidat",
    bg: "var(--v2-info-bg)",
    fg: "var(--v2-info-fg)"
  },
  suspendu: {
    label: "cooperatives.fiche.status.suspendu",
    bg: "var(--v2-attente-bg)",
    fg: "var(--v2-attente-fg)"
  },
  sorti: {
    label: "cooperatives.fiche.status.sorti",
    bg: "var(--v2-lin)",
    fg: "var(--v2-gris-texte)"
  }
};
var MEETING_STATUS = {
  planifi\u00E9e: {
    label: "cooperatives.fiche.meeting.planned",
    bg: "var(--v2-info-bg)",
    fg: "var(--v2-info-fg)"
  },
  tenue: {
    label: "cooperatives.fiche.meeting.held",
    bg: "var(--v2-sauge)",
    fg: "var(--v2-vert-pousse)"
  },
  annul\u00E9e: {
    label: "cooperatives.fiche.meeting.cancelled",
    bg: "var(--v2-lin)",
    fg: "var(--v2-gris-texte)"
  }
};
var DUE = {
  "\xE0 jour": {
    bg: "var(--v2-sauge)",
    fg: "var(--v2-vert-pousse)"
  },
  "en retard": {
    bg: "var(--v2-erreur-bg)",
    fg: "var(--v2-erreur-fg)"
  },
  "jamais pay\xE9": {
    bg: "var(--v2-attente-bg)",
    fg: "var(--v2-attente-fg)"
  }
};
var DETAIL_ROWS = 8;
var norm = (v) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
var initials = (name) => name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
var CooperativeDetailPage = (_a = class {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.snackbar = inject(SnackbarService);
    this.nf = nf;
    this.fmtDate = fmtDate;
    this.perms = ["scoop.manage", "org.read"];
    this.tab = signal("apercu", ...[]);
    this.gieQ = signal("", ...[]);
    this.memberQ = signal("", ...[]);
    this.memberFilter = signal("tous", ...[]);
    this.orgFilter = signal("tous", ...[]);
    this.orgTypes = computed(() => {
      var _a2;
      const counts = /* @__PURE__ */ new Map();
      let unqualified = 0;
      for (const o of this.base().orgs) if (o.type) counts.set(o.type, ((_a2 = counts.get(o.type)) != null ? _a2 : 0) + 1);
      else unqualified++;
      const types = [...counts].sort((a, b) => b[1] - a[1]).map(([id, count]) => ({
        id,
        label: id,
        count
      }));
      if (unqualified) types.push({
        id: "aucun",
        label: this.t()("cooperatives.fiche.gie.toQualify"),
        count: unqualified
      });
      return types;
    }, ...[]);
    this.memberFilters = computed(() => {
      const t = this.t();
      const all = this.base().members;
      const n = (st) => all.filter((m) => st.includes(m.status)).length;
      return [
        {
          id: "tous",
          label: t("cooperatives.fiche.filter.allAdherents"),
          count: all.length
        },
        {
          id: "membre",
          label: t("cooperatives.fiche.filter.active"),
          count: n(["membre"])
        },
        {
          id: "candidat",
          label: t("cooperatives.fiche.filter.candidates"),
          count: n(["candidat"])
        },
        {
          id: "autres",
          label: t("cooperatives.fiche.filter.others"),
          count: n(["suspendu", "sorti"])
        }
      ];
    }, ...[]);
    this.orgFilters = computed(() => {
      return [{
        id: "tous",
        label: this.t()("cooperatives.fiche.filter.allOrgs"),
        count: this.base().orgs.length
      }, ...this.orgTypes()];
    }, ...[]);
    this.id = toSignal(this.route.paramMap.pipe(map((p) => {
      var _a2;
      return (_a2 = p.get("id")) != null ? _a2 : "";
    })), { initialValue: "" });
    this.scoop = computed(() => this.store.state().scoops.find((s) => s.id === this.id()), ...[]);
    this.mono = computed(() => {
      var _a2;
      const c = this.scoop();
      return c ? ((_a2 = c.code) != null ? _a2 : c.name.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 3)).toUpperCase().slice(0, 4) : "";
    }, ...[]);
    this.place = computed(() => {
      const c = this.scoop();
      return c ? [c.commune, c.region].filter(Boolean).join(", ") : "";
    }, ...[]);
    this.isNew = computed(() => {
      const c = this.scoop();
      return !!(c == null ? void 0 : c.createdAt) && Date.now() - new Date(c.createdAt).getTime() < 7776e6;
    }, ...[]);
    this.manager = computed(() => {
      const user = managerOf(this.store.state().users, this.id());
      return {
        user,
        state: accountOf(user, Date.now()),
        initials: user ? initials(user.name) : ""
      };
    }, ...[]);
    this.base = computed(() => {
      const s = this.store.state();
      const id = this.id();
      return {
        producers: s.producers.filter((p) => p.scoopId === id && !p.mergedInto),
        members: s.members.filter((m) => m.scoopId === id),
        orgs: s.orgs.filter((o) => o.scoopId === id),
        technicians: s.users.filter((u) => {
          var _a2;
          return u.role === "technicien" && (((_a2 = u.scoopIds) == null ? void 0 : _a2.includes(id)) || u.scoopId === id);
        }),
        meetings: s.meetings.filter((m) => m.scoopId === id).sort((a, b) => b.date.localeCompare(a.date))
      };
    }, ...[]);
    this.orgCount = computed(() => this.base().orgs.length, ...[]);
    this.tabs = computed(() => {
      const t = this.t();
      const b = this.base();
      const strip = (label) => label.replace(/\s*\(\d+\)/, "");
      return [
        {
          id: "apercu",
          icon: "space_dashboard",
          label: t("cooperatives.fiche.tab.apercu"),
          count: null
        },
        {
          id: "gie",
          icon: "hub",
          label: this.orgTypes().length ? `${t("cooperatives.fiche.tab.orgs")} (${this.orgTypes().map((ty) => ty.label).join(", ")})` : t("cooperatives.fiche.tab.orgs"),
          count: b.orgs.length
        },
        {
          id: "membres",
          icon: "group",
          label: t("cooperatives.fiche.tab.adherents"),
          count: b.members.length
        },
        {
          id: "techniciens",
          icon: "person",
          label: strip(t("cooperatives.fiche.tab.techniciens", { count: 0 })),
          count: b.technicians.length
        },
        {
          id: "reunions",
          icon: "event",
          label: strip(t("cooperatives.fiche.tab.reunions", { count: 0 })),
          count: b.meetings.length
        },
        {
          id: "cotisations",
          icon: "payments",
          label: strip(t("cooperatives.fiche.tab.cotisations", { count: 0 })),
          count: null
        }
      ];
    }, ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const b = this.base();
      const active = b.members.filter((m) => m.status === "membre").length;
      const techActive = b.technicians.filter((u) => u.active).length;
      const orgBreakdown = this.orgTypes().map((ty) => `${ty.count} ${ty.label === ty.label.toUpperCase() ? ty.label : ty.label.toLowerCase()}`).join(" \xB7 ");
      return [
        {
          label: t("cooperatives.card.producers"),
          value: nf.format(b.producers.length),
          sub: t("cooperatives.structure.producersSub"),
          icon: "agriculture",
          bg: "",
          fg: ""
        },
        {
          label: t("cooperatives.fiche.kpi.adherents"),
          value: nf.format(b.members.length),
          sub: t("cooperatives.fiche.kpi.adherentsSub", { count: active }),
          icon: "group",
          bg: "var(--v2-sauge)",
          fg: "var(--v2-vert-pousse)"
        },
        {
          label: t("cooperatives.fiche.kpi.orgs"),
          value: nf.format(b.orgs.length),
          sub: orgBreakdown || t("cooperatives.fiche.gie.empty.title"),
          icon: "hub",
          bg: "var(--v2-info-bg)",
          fg: "var(--v2-info-fg)"
        },
        {
          label: t("cooperatives.fiche.kpi.techniciansTotal"),
          value: nf.format(b.technicians.length),
          sub: t("cooperatives.fiche.kpi.techniciansSub", { count: techActive }),
          icon: "person",
          bg: "var(--v2-culture-bg)",
          fg: "var(--v2-culture-fg)"
        }
      ];
    }, ...[]);
    this.quality = computed(() => {
      const ps = this.base().producers;
      const t = this.t();
      const rows = [
        {
          label: t("dashboard.quality.validated"),
          n: ps.filter((p) => p.quality === "valid\xE9").length,
          color: "var(--v2-vert-pousse)"
        },
        {
          label: t("dashboard.quality.toVerify"),
          n: ps.filter((p) => p.quality === "\xE0 v\xE9rifier").length,
          color: "var(--v2-soleil)"
        },
        {
          label: t("dashboard.quality.duplicate"),
          n: ps.filter((p) => p.quality === "doublon").length,
          color: "var(--v2-info-fg)"
        },
        {
          label: t("dashboard.quality.invalid"),
          n: ps.filter((p) => p.quality === "invalide").length,
          color: "var(--v2-erreur-fg)"
        }
      ];
      const total = ps.length || 1;
      let acc = 0;
      const stops = rows.map((r) => {
        const from = acc / total * 100;
        acc += r.n;
        return `${r.color} ${from}% ${acc / total * 100}%`;
      });
      return {
        rows,
        pct: Math.round(rows[0].n / total * 100),
        ring: ps.length ? `conic-gradient(${stops.join(", ")})` : "var(--v2-lin)"
      };
    }, ...[]);
    this.composition = computed(() => {
      const t = this.t();
      const ps = this.base().producers;
      const n = ps.length || 1;
      const youthAge = this.store.state().youthMaxAge;
      const women = ps.filter((p) => p.sex === "F").length;
      const youth = ps.filter((p) => ageAtMost(p.age, youthAge)).length;
      const handicap = ps.filter((p) => p.handicap).length;
      return [
        {
          label: t("cooperatives.fiche.compo.women"),
          n: women,
          pct: Math.round(women / n * 100),
          color: "var(--v2-chart-2)"
        },
        {
          label: t("cooperatives.fiche.compo.youth", { age: youthAge }),
          n: youth,
          pct: Math.round(youth / n * 100),
          color: "var(--v2-foret)"
        },
        {
          label: t("cooperatives.fiche.compo.handicap"),
          n: handicap,
          pct: Math.round(handicap / n * 100),
          color: "var(--v2-soleil)"
        }
      ];
    }, ...[]);
    this.info = computed(() => {
      var _a2;
      const t = this.t();
      const c = this.scoop();
      const none = t("cooperatives.fiche.info.none");
      return [
        {
          label: t("cooperatives.fiche.info.code"),
          value: (_a2 = c == null ? void 0 : c.code) != null ? _a2 : none,
          known: !!(c == null ? void 0 : c.code)
        },
        {
          label: t("cooperatives.fiche.info.commune"),
          value: (c == null ? void 0 : c.commune) || none,
          known: !!(c == null ? void 0 : c.commune)
        },
        {
          label: t("cooperatives.fiche.info.region"),
          value: (c == null ? void 0 : c.region) || none,
          known: !!(c == null ? void 0 : c.region)
        },
        {
          label: t("cooperatives.fiche.info.created"),
          value: (c == null ? void 0 : c.createdAt) ? fmtDate(c.createdAt) : none,
          known: !!(c == null ? void 0 : c.createdAt)
        },
        {
          label: t("cooperatives.network.faitiere"),
          value: t("cooperatives.network.faitiereName"),
          known: true
        },
        {
          label: t("cooperatives.fiche.info.villages"),
          value: nf.format(new Set(this.base().producers.map((p) => p.village).filter(Boolean)).size),
          known: true
        }
      ];
    }, ...[]);
    this.pending = computed(() => {
      const s = this.store.state();
      const t = this.t();
      const id = this.id();
      const ids = new Set(this.base().producers.map((p) => p.id));
      const plotOwner = new Map(s.plots.map((p) => [p.id, p.producerId]));
      const dossiers = s.dossiers.filter((d) => d.scoopId === id && (d.status === "soumis" || d.status === "en examen")).length;
      const corrections = s.corrections.filter((c) => c.status === "en attente" && ids.has(c.producerId)).length;
      const alerts = s.alerts.filter((a) => {
        var _a2;
        return a.status === "ouvert" && ids.has(a.entity === "producteur" ? a.entityId : (_a2 = plotOwner.get(a.entityId)) != null ? _a2 : "");
      }).length;
      return [
        {
          label: t("cooperatives.fiche.pending.dossiers"),
          n: dossiers,
          icon: "folder_shared",
          to: "/dashboard/dossiers",
          bg: "var(--v2-info-bg)",
          fg: "var(--v2-info-fg)"
        },
        {
          label: t("cooperatives.fiche.pending.corrections"),
          n: corrections,
          icon: "edit",
          to: "/dashboard/qualite/corrections",
          bg: "var(--v2-culture-bg)",
          fg: "var(--v2-culture-fg)"
        },
        {
          label: t("cooperatives.fiche.pending.alerts"),
          n: alerts,
          icon: "warning",
          to: "/dashboard/qualite/alertes",
          bg: "var(--v2-attente-bg)",
          fg: "var(--v2-attente-fg)"
        }
      ];
    }, ...[]);
    this.upcoming = computed(() => {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      return this.base().meetings.filter((m) => m.status === "planifi\xE9e" && m.date >= now).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3).map((m) => this.meetingView(m));
    }, ...[]);
    this.meetings = computed(() => this.base().meetings.map((m) => this.meetingView(m)), ...[]);
    this.orgs = computed(() => {
      const b = this.base();
      const q = norm(this.gieQ().trim());
      const members = this.store.state().members;
      return b.orgs.map((o) => ({
        id: o.id,
        name: o.name,
        type: o.type,
        village: o.village,
        producers: b.producers.filter((p) => p.orgId === o.id).length,
        members: members.filter((m) => m.orgId === o.id && m.status === "membre").length
      })).filter((o) => !q || norm(`${o.name} ${o.village}`).includes(q)).filter((o) => {
        const f = this.orgFilter();
        return f === "tous" || (f === "aucun" ? !o.type : o.type === f);
      }).sort((a, b2) => b2.producers - a.producers);
    }, ...[]);
    this.duesOf = computed(() => {
      const s = this.store.state();
      const rule = s.contributionRules.find((r) => r.scoopId === this.id());
      const now = (/* @__PURE__ */ new Date()).toISOString();
      return {
        rule,
        map: new Map(this.base().members.map((m) => [m.id, memberDues(m, rule, s.payments, now)]))
      };
    }, ...[]);
    this.members = computed(() => {
      const q = norm(this.memberQ().trim());
      const { map: dues } = this.duesOf();
      return this.base().members.filter((m) => !q || norm(`${m.firstName} ${m.lastName} ${m.village}`).includes(q)).filter((m) => {
        const f = this.memberFilter();
        return f === "tous" || (f === "autres" ? m.status === "suspendu" || m.status === "sorti" : m.status === f);
      }).sort((a, b) => `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`)).map((m) => {
        var _a2, _b;
        const d = dues.get(m.id);
        const due = d && d.state !== "non exigible" ? (_a2 = DUE[d.state]) != null ? _a2 : null : null;
        return {
          id: m.id,
          name: `${m.firstName} ${m.lastName}`,
          initials: initials(`${m.firstName} ${m.lastName}`),
          phone: this.store.phone(m.phone),
          village: m.village,
          status: (_b = MEMBER_STATUS[m.status]) != null ? _b : MEMBER_STATUS["membre"],
          joined: m.joinedAt ? fmtDate(m.joinedAt) : "\u2014",
          due,
          dueLabel: d ? d.state === "en retard" || d.state === "jamais pay\xE9" ? `${d.state} \xB7 ${nf.format(d.balance)} FCFA` : d.state : ""
        };
      });
    }, ...[]);
    this.technicians = computed(() => this.base().technicians.map((u) => {
      var _a2, _b;
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: this.store.phone(u.phone),
        initials: initials(u.name),
        active: u.active,
        invited: !!u.invited || !!u.activation,
        scoops: (_b = (_a2 = u.scoopIds) == null ? void 0 : _a2.length) != null ? _b : 1
      };
    }), ...[]);
    this.techOpen = signal(false, ...[]);
    this.canManageTech = computed(() => this.store.can("user.manage") || this.store.can("technician.invite"), ...[]);
    this.coopId = computed(() => this.id(), ...[]);
    this.dues = computed(() => {
      const { rule, map: dues } = this.duesOf();
      const members = this.base().members;
      if (!rule) return {
        rule: null,
        ruleLabel: "",
        collected: "",
        remaining: "",
        late: []
      };
      let collected = 0;
      let remaining = 0;
      const late = [];
      for (const m of members) {
        const d = dues.get(m.id);
        if (!d) continue;
        collected += d.paid;
        remaining += d.balance;
        if (d.state === "en retard" || d.state === "jamais pay\xE9") {
          const name = `${m.firstName} ${m.lastName}`;
          late.push({
            id: m.id,
            name,
            initials: initials(name),
            owes: `${nf.format(d.balance)} FCFA`,
            balance: d.balance
          });
        }
      }
      late.sort((a, b) => b.balance - a.balance);
      return {
        rule,
        ruleLabel: `${nf.format(rule.amount)} FCFA \xB7 ${rule.periodicity}`,
        collected: `${nf.format(collected)} FCFA`,
        remaining: `${nf.format(remaining)} FCFA`,
        late
      };
    }, ...[]);
    this.orgPager = createPager(() => this.orgs());
    this.memberPager = createPager(() => this.members());
    this.techPager = createPager(() => this.technicians());
    this.meetingPager = createPager(() => this.meetings());
    this.latePager = createPager(() => this.dues().late);
    this.detailTarget = signal(null, ...[]);
    this.detail = computed(() => {
      var _a2, _b, _c, _d;
      const target = this.detailTarget();
      if (!target) return null;
      const s = this.store.state();
      const t = this.t();
      const none = "\u2014";
      const empty = (v) => v === null || v === void 0 || v === "";
      const fact = (label, value, icon, opts = {}) => {
        var _a3;
        return {
          label,
          value: empty(value) ? none : value,
          icon,
          muted: empty(value),
          wide: (_a3 = opts.wide) != null ? _a3 : false,
          tone: opts.tone
        };
      };
      const kpi = (label, n, icon, tone, display) => ({
        label,
        value: display != null ? display : nf.format(n),
        icon,
        tone,
        muted: n === 0
      });
      const badge = (k) => ({
        label: t(k.label),
        bg: k.bg,
        fg: k.fg
      });
      const memberStatus = (st) => {
        var _a3;
        return (_a3 = MEMBER_STATUS[st]) != null ? _a3 : MEMBER_STATUS["membre"];
      };
      const SAUGE = {
        bg: "var(--v2-sauge)",
        fg: "var(--v2-vert-pousse)"
      };
      const INFO = {
        bg: "var(--v2-info-bg)",
        fg: "var(--v2-info-fg)"
      };
      const ATTENTE = {
        bg: "var(--v2-attente-bg)",
        fg: "var(--v2-attente-fg)"
      };
      const CULTURE = {
        bg: "var(--v2-culture-bg)",
        fg: "var(--v2-culture-fg)"
      };
      const ERREUR = {
        bg: "var(--v2-erreur-bg)",
        fg: "var(--v2-erreur-fg)"
      };
      if (target.kind === "org") {
        const o = s.orgs.find((x) => x.id === target.id);
        if (!o) return null;
        const people = s.members.filter((m) => m.orgId === o.id).sort((a, b) => `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`));
        const producers = this.base().producers.filter((p) => p.orgId === o.id).length;
        const active = people.filter((m) => m.status === "membre").length;
        return {
          title: o.name,
          subtitle: (_b = (_a2 = this.scoop()) == null ? void 0 : _a2.name) != null ? _b : "",
          icon: "hub",
          badges: [o.type ? {
            label: o.type,
            ...o.type === "GIE" ? INFO : CULTURE
          } : {
            label: t("cooperatives.fiche.gie.toQualify"),
            ...ATTENTE
          }],
          kpis: [
            kpi(t("cooperatives.fiche.detail.producers"), producers, "agriculture", SAUGE),
            kpi(t("cooperatives.fiche.detail.registered"), people.length, "group", INFO),
            kpi(t("cooperatives.fiche.detail.activeMembers"), active, "task_alt", CULTURE)
          ],
          facts: [fact(t("cooperatives.fiche.detail.type"), (_c = o.type) != null ? _c : t("cooperatives.fiche.gie.toQualify"), "hub"), fact(t("cooperatives.fiche.detail.village"), o.village, "location_on")],
          sections: [{
            title: t("cooperatives.fiche.detail.orgMembers"),
            icon: "group",
            count: people.length,
            empty: t("cooperatives.fiche.detail.orgMembersEmpty"),
            items: people.slice(0, DETAIL_ROWS).map((m) => ({
              label: `${m.firstName} ${m.lastName}`,
              sub: m.village,
              initials: initials(`${m.firstName} ${m.lastName}`),
              badge: badge(memberStatus(m.status))
            })),
            more: Math.max(0, people.length - DETAIL_ROWS)
          }],
          link: ["/dashboard/organisations", o.id]
        };
      }
      if (target.kind === "member") {
        const m = s.members.find((x) => x.id === target.id);
        if (!m) return null;
        const d = this.duesOf().map.get(m.id);
        const org = m.orgId ? s.orgs.find((o) => o.id === m.orgId) : null;
        const history = [...m.history].sort((a, b) => b.at.localeCompare(a.at));
        const dueTone = d && d.state !== "non exigible" ? DUE[d.state] : void 0;
        return {
          title: `${m.firstName} ${m.lastName}`,
          subtitle: [m.village, org == null ? void 0 : org.name].filter(Boolean).join(" \xB7 "),
          icon: "person",
          badges: [badge(memberStatus(m.status)), ...dueTone && d ? [{
            label: d.state,
            ...dueTone
          }] : []],
          kpis: d ? [kpi(t("cooperatives.fiche.detail.paid"), d.paid, "check_circle", SAUGE, `${nf.format(d.paid)} F`), kpi(t("cooperatives.fiche.detail.balance"), d.balance, "payments", d.balance > 0 ? ERREUR : SAUGE, `${nf.format(d.balance)} F`)] : [],
          facts: [
            fact(t("cooperatives.fiche.detail.phone"), this.store.phone(m.phone), "call"),
            fact(t("cooperatives.fiche.detail.email"), m.email, "mail"),
            fact(t("cooperatives.fiche.detail.org"), (_d = org == null ? void 0 : org.name) != null ? _d : t("cooperatives.fiche.detail.direct"), "hub"),
            fact(t("cooperatives.fiche.detail.joined"), m.joinedAt ? fmtDate(m.joinedAt) : null, "calendar_today"),
            fact(t("cooperatives.fiche.detail.age"), m.age === null ? null : t("cooperatives.fiche.detail.ageValue", { count: m.age }), "person"),
            fact(t("cooperatives.fiche.detail.dues"), d && d.state !== "non exigible" ? d.state : null, "account_balance_wallet", { tone: dueTone })
          ],
          sections: [{
            title: t("cooperatives.fiche.detail.history"),
            icon: "event_note",
            count: history.length || null,
            empty: t("cooperatives.fiche.detail.historyEmpty"),
            items: history.slice(0, DETAIL_ROWS).map((h) => ({
              label: h.action,
              sub: `${fmtDate(h.at)} \xB7 ${h.by}`
            })),
            more: Math.max(0, history.length - DETAIL_ROWS)
          }],
          link: m.producerId ? ["/dashboard/producteurs", m.producerId] : null
        };
      }
      if (target.kind === "tech") {
        const u = s.users.find((x) => x.id === target.id);
        if (!u) return null;
        const scoops = s.scoops.filter((c) => {
          var _a3;
          return ((_a3 = u.scoopIds) == null ? void 0 : _a3.includes(c.id)) || u.scoopId === c.id;
        });
        const state = u.active ? {
          label: t("cooperatives.fiche.techniciens.active"),
          ...SAUGE
        } : {
          label: t("cooperatives.fiche.techniciens.closed"),
          bg: "var(--v2-lin)",
          fg: "var(--v2-gris-texte)"
        };
        return {
          title: u.name,
          subtitle: u.email,
          icon: "person",
          badges: [state],
          kpis: [kpi(t("cooperatives.fiche.detail.scoops"), scoops.length, "apartment", INFO)],
          facts: [
            fact(t("cooperatives.fiche.detail.email"), u.email, "mail", { wide: true }),
            fact(t("cooperatives.fiche.detail.phone"), this.store.phone(u.phone), "call"),
            fact(t("cooperatives.fiche.detail.account"), state.label, "account_circle", { tone: state })
          ],
          sections: [{
            title: t("cooperatives.fiche.detail.scoops"),
            icon: "apartment",
            count: scoops.length,
            empty: none,
            items: scoops.map((c) => {
              var _a3;
              return {
                label: c.name,
                sub: [c.commune, c.region].filter(Boolean).join(", "),
                initials: ((_a3 = c.code) != null ? _a3 : c.name).slice(0, 3).toUpperCase()
              };
            }),
            more: 0
          }],
          link: null
        };
      }
      const mt = s.meetings.find((x) => x.id === target.id);
      if (!mt) return null;
      const view = this.meetingView(mt);
      return {
        title: mt.title,
        subtitle: `${this.locale.formatDate(mt.date, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        })} \xB7 ${mt.place}`,
        icon: "event",
        badges: [badge(view.status), {
          label: mt.kind,
          ...CULTURE
        }],
        kpis: [
          kpi(t("cooperatives.fiche.detail.agendaPoints"), mt.agenda.length, "fact_check", INFO),
          ...mt.status === "tenue" ? [kpi(t("cooperatives.fiche.detail.present"), mt.presentIds.length, "group", SAUGE)] : [],
          ...mt.status === "planifi\xE9e" && !view.past ? [kpi(t("cooperatives.fiche.detail.daysLeft"), Math.ceil((new Date(mt.date).getTime() - Date.now()) / 864e5), "calendar_today", ATTENTE)] : []
        ],
        facts: [
          fact(t("cooperatives.fiche.detail.date"), view.when, "calendar_today"),
          fact(t("cooperatives.fiche.detail.place"), mt.place, "location_on"),
          ...mt.cancelReason ? [fact(t("cooperatives.fiche.detail.cancelReason"), mt.cancelReason, "warning", { wide: true })] : []
        ],
        sections: [{
          title: t("cooperatives.fiche.detail.agenda"),
          icon: "fact_check",
          count: null,
          empty: t("cooperatives.fiche.detail.agendaEmpty"),
          items: mt.agenda.map((a, i) => ({
            label: a,
            index: i + 1
          })),
          more: 0
        }],
        link: ["/dashboard/reunions", mt.id]
      };
    }, ...[]);
  }
  account(a) {
    return ACCOUNT[a];
  }
  meetingView(m) {
    var _a2;
    return {
      id: m.id,
      title: m.title,
      place: m.place,
      past: m.date < (/* @__PURE__ */ new Date()).toISOString(),
      when: fmtDateTime(m.date),
      day: this.locale.formatDate(m.date, { day: "2-digit" }),
      month: this.locale.formatDate(m.date, { month: "short" }).replace(".", ""),
      status: (_a2 = MEETING_STATUS[m.status]) != null ? _a2 : MEETING_STATUS["planifi\xE9e"]
    };
  }
  removeTech(userId, name) {
    var _a2;
    const u = this.store.state().users.find((x) => x.id === userId);
    const next = ((_a2 = u == null ? void 0 : u.scoopIds) != null ? _a2 : (u == null ? void 0 : u.scoopId) ? [u.scoopId] : []).filter((id) => id !== this.id());
    const res = this.store.actions.setTechnicianScoops(userId, next);
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error));
      return;
    }
    this.snackbar.success(this.t()("tech.removed", { name }));
  }
  openDetail(kind, id) {
    this.detailTarget.set({
      kind,
      id
    });
  }
  closeDetail() {
    this.detailTarget.set(null);
  }
}, _a.\u0275fac = function CooperativeDetailPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-cooperative-detail-page"]],
  decls: 5,
  vars: 6,
  consts: [
    [
      3,
      "perm",
      "area"
    ],
    [
      1,
      "card",
      "rise",
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
      "closed",
      "view"
    ],
    [
      3,
      "openChange",
      "open",
      "scoopId"
    ],
    [
      1,
      "hero",
      "rise",
      "p-6",
      "sm:p-8"
    ],
    [
      "viewBox",
      "0 0 320 220",
      "aria-hidden",
      "true",
      1,
      "pointer-events-none",
      "absolute",
      "-right-16",
      "-top-10",
      "h-72",
      "w-[30rem]",
      "opacity-[0.06]"
    ],
    [
      "d",
      "M10 120 Q160 60 310 110",
      "fill",
      "none",
      "stroke",
      "currentColor",
      "stroke-width",
      "22",
      "stroke-linecap",
      "round"
    ],
    [
      "d",
      "M30 168 Q170 108 310 156",
      "fill",
      "none",
      "stroke",
      "currentColor",
      "stroke-width",
      "22",
      "stroke-linecap",
      "round"
    ],
    [
      "d",
      "M60 212 Q180 160 310 200",
      "fill",
      "none",
      "stroke",
      "currentColor",
      "stroke-width",
      "22",
      "stroke-linecap",
      "round"
    ],
    [
      1,
      "crumb",
      "relative",
      "flex",
      "items-center",
      "gap-1.5",
      "text-[13px]",
      "font-semibold"
    ],
    ["routerLink", "/dashboard/cooperatives"],
    [
      "name",
      "chevron_right",
      2,
      "opacity",
      "0.5",
      3,
      "size"
    ],
    [
      "aria-current",
      "page",
      2,
      "color",
      "var(--v2-citron)"
    ],
    [
      1,
      "relative",
      "mt-6",
      "flex",
      "flex-wrap",
      "items-start",
      "justify-between",
      "gap-6"
    ],
    [
      1,
      "flex",
      "min-w-0",
      "items-start",
      "gap-5"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "hero-mono"
    ],
    [1, "min-w-0"],
    [
      1,
      "text-[28px]",
      "font-extrabold",
      "leading-[1.05]",
      "tracking-[-0.03em]",
      "sm:text-[34px]"
    ],
    [
      1,
      "mt-3",
      "flex",
      "flex-wrap",
      "gap-2"
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
      "var(--v2-citron)",
      "color",
      "var(--v2-foret)"
    ],
    [
      1,
      "badge",
      2,
      "background",
      "var(--v2-blanc)",
      "color",
      "var(--v2-foret)"
    ],
    [
      1,
      "badge",
      2,
      "background",
      "color-mix(in oklab, var(--v2-blanc) 12%, transparent)",
      "color",
      "var(--v2-blanc)",
      "font-family",
      "var(--v2-font-mono)"
    ],
    [
      1,
      "mt-3",
      "flex",
      "flex-wrap",
      "items-center",
      "gap-x-4",
      "gap-y-1",
      "text-[14px]",
      "font-medium",
      2,
      "color",
      "color-mix(in oklab, var(--v2-blanc) 75%, transparent)"
    ],
    [
      1,
      "inline-flex",
      "items-center",
      "gap-1.5"
    ],
    [
      "name",
      "location_on",
      3,
      "size"
    ],
    [
      "name",
      "account_balance",
      3,
      "size"
    ],
    [
      "routerLink",
      "/dashboard/cooperatives",
      1,
      "ghost-dark"
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
    [
      1,
      "relative",
      "mt-6",
      "flex",
      "flex-wrap",
      "items-center",
      "gap-4",
      "rounded-[20px]",
      "p-4",
      2,
      "background",
      "color-mix(in oklab, var(--v2-blanc) 8%, transparent)"
    ],
    [
      1,
      "grid",
      "size-12",
      "shrink-0",
      "place-items-center",
      "rounded-full",
      "text-[14px]",
      "font-extrabold",
      2,
      "background",
      "var(--v2-citron)",
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
      "mono",
      "block",
      2,
      "color",
      "var(--v2-citron)"
    ],
    [
      1,
      "mt-0.5",
      "block",
      "truncate",
      "text-[16px]",
      "font-extrabold"
    ],
    [
      1,
      "block",
      "truncate",
      "text-[13px]",
      "font-medium",
      2,
      "color",
      "color-mix(in oklab, var(--v2-blanc) 70%, transparent)"
    ],
    [
      1,
      "badge",
      3,
      "background",
      "color"
    ],
    [
      "role",
      "tablist",
      1,
      "tabs",
      "rise",
      "mt-6",
      2,
      "animation-delay",
      "0.08s"
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
      "role",
      "tabpanel",
      1,
      "panel"
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
      "name",
      "calendar_today",
      3,
      "size"
    ],
    [1, "badge"],
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
    [
      3,
      "name",
      "size"
    ],
    [1, "n"],
    [
      1,
      "card",
      "mt-6",
      "overflow-hidden"
    ],
    [1, "mt-6"],
    [
      1,
      "mt-6",
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
      "mt-4",
      "grid",
      "gap-4",
      "lg:grid-cols-3"
    ],
    [
      "aria-labelledby",
      "q-title",
      1,
      "card",
      "lift",
      "p-6"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between"
    ],
    [
      "id",
      "q-title",
      1,
      "h2"
    ],
    [
      "name",
      "verified",
      2,
      "color",
      "var(--v2-vert-pousse)",
      3,
      "size"
    ],
    [
      1,
      "mt-5",
      "flex",
      "items-center",
      "gap-5"
    ],
    [
      "role",
      "img",
      1,
      "ring",
      "grid",
      "size-[116px]",
      "shrink-0",
      "place-items-center",
      "rounded-full"
    ],
    [
      1,
      "grid",
      "size-[88px]",
      "place-items-center",
      "rounded-full",
      "text-center",
      2,
      "background",
      "var(--v2-blanc)"
    ],
    [
      1,
      "text-[24px]",
      "font-extrabold",
      "leading-none",
      "tracking-[-0.03em]"
    ],
    [1, "text-[14px]"],
    [
      1,
      "min-w-0",
      "flex-1",
      "space-y-2"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "gap-2",
      "text-[13px]"
    ],
    [
      "aria-labelledby",
      "compo-title",
      1,
      "card",
      "lift",
      "p-6"
    ],
    [
      "id",
      "compo-title",
      1,
      "h2"
    ],
    [
      "name",
      "group",
      2,
      "color",
      "var(--v2-foret-clair)",
      3,
      "size"
    ],
    [
      1,
      "mt-5",
      "space-y-4"
    ],
    [
      "aria-labelledby",
      "info-title",
      1,
      "card",
      "lift",
      "p-6"
    ],
    [
      "id",
      "info-title",
      1,
      "h2"
    ],
    [
      "name",
      "description",
      2,
      "color",
      "var(--v2-foret-clair)",
      3,
      "size"
    ],
    [
      1,
      "info",
      "mt-4"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "gap-4",
      "py-2.5",
      3,
      "border-top"
    ],
    [
      1,
      "mt-4",
      "grid",
      "gap-4",
      "lg:grid-cols-2"
    ],
    [
      "aria-labelledby",
      "todo-title",
      1,
      "card",
      "p-6"
    ],
    [
      "id",
      "todo-title",
      1,
      "h2"
    ],
    [
      1,
      "mt-4",
      "space-y-2"
    ],
    [
      "aria-labelledby",
      "next-title",
      1,
      "card",
      "p-6"
    ],
    [
      "id",
      "next-title",
      1,
      "h2"
    ],
    [
      "type",
      "button",
      1,
      "link",
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
      1,
      "sub",
      "rounded-[16px]",
      "p-4",
      2,
      "background",
      "var(--v2-creme)"
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
      "font-medium",
      2,
      "opacity",
      "0.75"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2",
      "font-semibold"
    ],
    [
      1,
      "size-2.5",
      "rounded-full"
    ],
    [
      1,
      "font-extrabold",
      "tabular-nums"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "text-[14px]",
      "font-semibold"
    ],
    [1, "sub"],
    [
      1,
      "bar",
      "mt-1.5"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "gap-4",
      "py-2.5"
    ],
    [
      1,
      "row-link",
      "flex",
      "items-center",
      "gap-4",
      "rounded-[16px]",
      "p-3",
      3,
      "routerLink"
    ],
    [
      1,
      "grid",
      "size-11",
      "shrink-0",
      "place-items-center",
      "rounded-[14px]"
    ],
    [
      1,
      "min-w-0",
      "flex-1",
      "text-[14px]",
      "font-bold"
    ],
    [
      1,
      "text-[24px]",
      "font-extrabold",
      "tracking-[-0.03em]",
      "tabular-nums"
    ],
    [
      "name",
      "arrow_forward",
      1,
      "go",
      3,
      "size"
    ],
    [
      1,
      "grid",
      "w-14",
      "shrink-0",
      "place-items-center",
      "rounded-[14px]",
      "py-2",
      "text-center",
      2,
      "background",
      "var(--v2-foret)",
      "color",
      "var(--v2-blanc)"
    ],
    [
      1,
      "text-[20px]",
      "font-extrabold",
      "leading-none"
    ],
    [
      1,
      "mono",
      "mt-1",
      2,
      "color",
      "var(--v2-citron)",
      "font-size",
      "10px"
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
      "flex",
      "items-center",
      "gap-1",
      "truncate"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "justify-between",
      "gap-3",
      "p-5"
    ],
    [
      1,
      "search",
      "min-w-[240px]",
      "flex-1"
    ],
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
      "chips"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "chip",
      3,
      "on"
    ],
    [
      1,
      "sub",
      "px-5",
      "pb-6"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "chip",
      3,
      "click"
    ],
    [1, "overflow-x-auto"],
    [
      1,
      "w-full",
      "min-w-[640px]",
      "text-left",
      "text-[14px]"
    ],
    [
      1,
      "mono",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "px-5",
      "py-3"
    ],
    [
      1,
      "px-3",
      "py-3"
    ],
    [
      1,
      "px-3",
      "py-3",
      "text-right"
    ],
    [
      1,
      "px-5",
      "py-3",
      "text-right"
    ],
    [
      1,
      "row",
      "row-link"
    ],
    [
      1,
      "px-5",
      "pb-5",
      3,
      "pager"
    ],
    [
      1,
      "row",
      "row-link",
      3,
      "click"
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
      1,
      "grid",
      "size-9",
      "shrink-0",
      "place-items-center",
      "rounded-[10px]",
      2,
      "background",
      "var(--v2-info-bg)",
      "color",
      "var(--v2-info-fg)"
    ],
    [
      "name",
      "hub",
      3,
      "size"
    ],
    [1, "font-bold"],
    [
      1,
      "px-3",
      "py-3.5"
    ],
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
      "px-3",
      "py-3.5",
      "font-medium"
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
      "px-3",
      "py-3.5",
      "text-right",
      "font-semibold",
      "tabular-nums"
    ],
    [
      1,
      "px-5",
      "py-2.5"
    ],
    [
      1,
      "flex",
      "justify-end"
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
      1,
      "w-full",
      "min-w-[720px]",
      "text-left",
      "text-[14px]"
    ],
    [
      1,
      "grid",
      "size-9",
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
      "block",
      "truncate",
      "font-bold"
    ],
    [
      1,
      "sub",
      "block",
      "truncate",
      "tabular-nums"
    ],
    [
      1,
      "px-3",
      "py-3",
      "font-medium"
    ],
    [
      1,
      "px-3",
      "py-3",
      "font-medium",
      "tabular-nums"
    ],
    [
      1,
      "mb-4",
      "flex",
      "justify-end"
    ],
    [
      1,
      "card",
      "overflow-hidden"
    ],
    [
      1,
      "card",
      "flex",
      "flex-col",
      "items-center",
      "gap-3",
      "p-10",
      "text-center"
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
      1,
      "grid",
      "size-9",
      "place-items-center",
      "rounded-[12px]",
      2,
      "background",
      "var(--v2-citron)",
      "color",
      "var(--v2-foret)"
    ],
    [
      "name",
      "person_add",
      3,
      "size"
    ],
    [
      1,
      "grid",
      "size-9",
      "shrink-0",
      "place-items-center",
      "rounded-full",
      "text-[12px]",
      "font-extrabold",
      2,
      "background",
      "var(--v2-foret)",
      "color",
      "var(--v2-citron)"
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
      2,
      "background",
      "var(--v2-info-bg)",
      "color",
      "var(--v2-info-fg)"
    ],
    [
      "type",
      "button",
      1,
      "act",
      "act-danger",
      "mr-2",
      3,
      "title"
    ],
    [
      "type",
      "button",
      1,
      "act",
      "act-danger",
      "mr-2",
      3,
      "click",
      "title"
    ],
    [
      "name",
      "close",
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
      "person",
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
      "type",
      "button",
      1,
      "row-link",
      "flex",
      "w-full",
      "items-center",
      "gap-4",
      "px-5",
      "py-4",
      "text-left",
      3,
      "border-top"
    ],
    [
      1,
      "sub",
      "p-6"
    ],
    [
      "type",
      "button",
      1,
      "row-link",
      "flex",
      "w-full",
      "items-center",
      "gap-4",
      "px-5",
      "py-4",
      "text-left",
      3,
      "click"
    ],
    [
      1,
      "grid",
      "w-14",
      "shrink-0",
      "place-items-center",
      "rounded-[14px]",
      "py-2",
      "text-center"
    ],
    [
      1,
      "mono",
      "mt-1",
      2,
      "font-size",
      "10px"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "act"
    ],
    [
      1,
      "card",
      "sub",
      "p-6"
    ],
    [
      1,
      "grid",
      "grid-cols-1",
      "gap-4",
      "md:grid-cols-3"
    ],
    [
      1,
      "card",
      "stat",
      "p-5"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "watermark",
      2,
      "color",
      "var(--v2-foret)"
    ],
    [
      "name",
      "description",
      3,
      "size"
    ],
    [
      1,
      "relative",
      "text-[14px]",
      "font-bold",
      2,
      "color",
      "var(--v2-ardoise)"
    ],
    [
      1,
      "relative",
      "mt-2",
      "text-[26px]",
      "font-extrabold",
      "leading-none",
      "tracking-[-0.03em]"
    ],
    [
      1,
      "card",
      "stat",
      "p-5",
      2,
      "background",
      "var(--v2-sauge)",
      "border-color",
      "transparent",
      "color",
      "var(--v2-vert-pousse)"
    ],
    [
      1,
      "relative",
      "text-[14px]",
      "font-bold"
    ],
    [
      1,
      "relative",
      "mt-2",
      "text-[26px]",
      "font-extrabold",
      "leading-none",
      "tracking-[-0.03em]",
      "tabular-nums"
    ],
    [
      1,
      "card",
      "stat",
      "p-5",
      2,
      "background",
      "var(--v2-attente-bg)",
      "border-color",
      "transparent",
      "color",
      "var(--v2-attente-fg)"
    ],
    [
      "name",
      "payments",
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
      "items-center",
      "justify-between",
      "gap-3",
      "p-5"
    ],
    [1, "h2"],
    [
      "routerLink",
      "/dashboard/cotisations",
      1,
      "link"
    ],
    [
      "type",
      "button",
      1,
      "row",
      "row-link",
      "flex",
      "w-full",
      "items-center",
      "gap-4",
      "px-5",
      "py-3",
      "text-left"
    ],
    [
      "type",
      "button",
      1,
      "row",
      "row-link",
      "flex",
      "w-full",
      "items-center",
      "gap-4",
      "px-5",
      "py-3",
      "text-left",
      3,
      "click"
    ],
    [
      1,
      "grid",
      "size-9",
      "shrink-0",
      "place-items-center",
      "rounded-full",
      "text-[12px]",
      "font-extrabold",
      2,
      "background",
      "var(--v2-erreur-bg)",
      "color",
      "var(--v2-erreur-fg)"
    ],
    [
      1,
      "min-w-0",
      "flex-1",
      "truncate",
      "font-bold"
    ],
    [
      1,
      "text-[14px]",
      "font-extrabold",
      "tabular-nums",
      2,
      "color",
      "var(--v2-erreur-fg)"
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
    [
      "routerLink",
      "/dashboard/cooperatives",
      1,
      "link",
      "mt-2"
    ]
  ],
  template: function CooperativeDetailPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0);
      __conditionalCreate(1, CooperativeDetailPage_Conditional_1_Template, 49, 25)(2, CooperativeDetailPage_Conditional_2_Template, 10, 5, "div", 1);
      __elementStart(3, "ui-detail-modal", 2);
      __listener("closed", function CooperativeDetailPage_Template_ui_detail_modal_closed_3_listener() {
        return ctx.closeDetail();
      });
      __elementEnd();
      __elementStart(4, "app-technician-dialog", 3);
      __twoWayListener("openChange", function CooperativeDetailPage_Template_app_technician_dialog_openChange_4_listener($event) {
        __twoWayBindingSet(ctx.techOpen, $event) || (ctx.techOpen = $event);
        return $event;
      });
      __elementEnd()();
    }
    if (rf & 2) {
      let tmp_2_0;
      __property("perm", ctx.perms)("area", ctx.t()("cooperatives.fiche.area"));
      __advance();
      __conditional((tmp_2_0 = ctx.scoop()) ? 1 : 2, tmp_2_0);
      __advance(2);
      __property("view", ctx.detail());
      __advance();
      __twoWayProperty("open", ctx.techOpen);
      __property("scoopId", ctx.coopId());
    }
  },
  dependencies: [
    RouterLink,
    AppShellComponent,
    IconComponent,
    DetailModalComponent,
    PaginationComponent,
    TechnicianDialogComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .card[_ngcontent-%COMP%] {\n      border-radius: 24px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n    }\n    .sub[_ngcontent-%COMP%] {\n      font-size: 13px;\n      font-weight: 500;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .h2[_ngcontent-%COMP%] {\n      font-size: 18px;\n      font-weight: 800;\n      letter-spacing: -0.02em;\n    }\n    .badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n      border-radius: 999px;\n      padding: 3px 10px 3px 8px;\n      font-size: 12px;\n      font-weight: 800;\n      white-space: nowrap;\n    }\n\n    \n    @keyframes _ngcontent-%COMP%_rise {\n      from {\n        opacity: 0;\n        transform: translateY(10px);\n      }\n      to {\n        opacity: 1;\n        transform: translateY(0);\n      }\n    }\n    @keyframes _ngcontent-%COMP%_grow {\n      from {\n        transform: scaleX(0);\n      }\n      to {\n        transform: scaleX(1);\n      }\n    }\n    @keyframes _ngcontent-%COMP%_ring-in {\n      from {\n        opacity: 0;\n        transform: rotate(-90deg) scale(0.9);\n      }\n      to {\n        opacity: 1;\n        transform: rotate(0) scale(1);\n      }\n    }\n    .rise[_ngcontent-%COMP%] {\n      animation: _ngcontent-%COMP%_rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n    }\n    .panel[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n      animation: _ngcontent-%COMP%_rise 0.4s cubic-bezier(0.32, 0.72, 0, 1) both;\n    }\n    .panel[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:nth-child(2) {\n      animation-delay: 0.05s;\n    }\n    .panel[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:nth-child(3) {\n      animation-delay: 0.1s;\n    }\n    .panel[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:nth-child(4) {\n      animation-delay: 0.15s;\n    }\n    .ring[_ngcontent-%COMP%] {\n      animation: _ngcontent-%COMP%_ring-in 0.7s cubic-bezier(0.32, 0.72, 0, 1) both;\n    }\n\n    .hero[_ngcontent-%COMP%] {\n      position: relative;\n      overflow: hidden;\n      border-radius: 28px;\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    .hero-mono[_ngcontent-%COMP%] {\n      display: grid;\n      height: 76px;\n      width: 76px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 22px;\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 20px;\n      font-weight: 700;\n      transition: transform 0.3s ease;\n    }\n    .hero[_ngcontent-%COMP%]:hover   .hero-mono[_ngcontent-%COMP%] {\n      transform: rotate(-4deg) scale(1.04);\n    }\n    .crumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n      color: color-mix(in oklab, var(--%NS%v2-blanc) 70%, transparent);\n      cursor: pointer;\n      transition: color 0.15s ease;\n    }\n    .crumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n      color: var(--%NS%v2-citron);\n    }\n    .ghost-dark[_ngcontent-%COMP%] {\n      display: inline-flex;\n      height: 44px;\n      align-items: center;\n      gap: 8px;\n      border-radius: 14px;\n      border: 1.5px solid color-mix(in oklab, var(--%NS%v2-blanc) 25%, transparent);\n      padding: 0 14px;\n      font-size: 14px;\n      font-weight: 800;\n      color: var(--%NS%v2-blanc);\n      cursor: pointer;\n      transition:\n        background-color 0.15s ease,\n        border-color 0.15s ease;\n    }\n    .ghost-dark[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-citron);\n      background: color-mix(in oklab, var(--%NS%v2-blanc) 10%, transparent);\n    }\n\n    .tabs[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 4px;\n      overflow-x: auto;\n      scrollbar-width: none;\n      border-radius: 18px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n      padding: 6px;\n    }\n    .tabs[_ngcontent-%COMP%]::-webkit-scrollbar {\n      display: none;\n    }\n    .tab[_ngcontent-%COMP%] {\n      display: inline-flex;\n      flex: 1 0 auto;\n      justify-content: center;\n      align-items: center;\n      gap: 7px;\n      white-space: nowrap;\n      border-radius: 12px;\n      padding: 10px 11px;\n      font-size: 14px;\n      font-weight: 700;\n      color: var(--%NS%v2-gris-texte);\n      cursor: pointer;\n      transition:\n        background-color 0.2s ease,\n        color 0.2s ease;\n    }\n    .tab[_ngcontent-%COMP%]:hover {\n      color: var(--%NS%v2-encre);\n      background: var(--%NS%v2-creme);\n    }\n    .tab.on[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    .tab[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      padding: 0 7px;\n      font-size: 12px;\n      font-variant-numeric: tabular-nums;\n      background: var(--%NS%v2-creme);\n      color: var(--%NS%v2-ardoise);\n      transition:\n        background-color 0.2s ease,\n        color 0.2s ease;\n    }\n    .tab.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n    }\n\n    .stat[_ngcontent-%COMP%] {\n      position: relative;\n      overflow: hidden;\n      transition:\n        transform 0.2s ease,\n        box-shadow 0.2s ease;\n    }\n    .stat[_ngcontent-%COMP%]:hover {\n      transform: translateY(-3px);\n      box-shadow: var(--%NS%v2-ombre-flottant);\n    }\n    .watermark[_ngcontent-%COMP%] {\n      pointer-events: none;\n      position: absolute;\n      right: -18px;\n      bottom: -26px;\n      opacity: 0.12;\n      transform: rotate(-12deg);\n      transition:\n        transform 0.35s ease,\n        opacity 0.35s ease;\n    }\n    .stat[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%] {\n      transform: rotate(-4deg) scale(1.08);\n      opacity: 0.18;\n    }\n    .lift[_ngcontent-%COMP%] {\n      transition:\n        transform 0.2s ease,\n        box-shadow 0.2s ease,\n        border-color 0.2s ease;\n    }\n    .lift[_ngcontent-%COMP%]:hover {\n      transform: translateY(-2px);\n      border-color: var(--%NS%v2-gris-trait);\n      box-shadow: var(--%NS%v2-ombre-flottant);\n    }\n\n    .search[_ngcontent-%COMP%] {\n      display: flex;\n      height: 48px;\n      align-items: center;\n      gap: 10px;\n      border-radius: 14px;\n      background: var(--%NS%v2-creme);\n      padding: 0 14px;\n      color: var(--%NS%v2-gris-texte);\n      transition: box-shadow 0.15s ease;\n    }\n    .search[_ngcontent-%COMP%]:focus-within {\n      box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n    }\n    .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n      min-width: 0;\n      flex: 1;\n      background: transparent;\n      font-size: 15px;\n      font-weight: 600;\n      color: var(--%NS%v2-encre);\n      outline: none;\n    }\n    .row[_ngcontent-%COMP%] {\n      border-top: 1px solid var(--%NS%v2-separateur);\n    }\n    .row-link[_ngcontent-%COMP%] {\n      cursor: pointer;\n      transition: background-color 0.15s ease;\n    }\n    .row-link[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-creme);\n    }\n    .row-link[_ngcontent-%COMP%]   .go[_ngcontent-%COMP%] {\n      color: var(--%NS%v2-gris-trait);\n      transition:\n        transform 0.2s ease,\n        color 0.2s ease;\n    }\n    .row-link[_ngcontent-%COMP%]:hover   .go[_ngcontent-%COMP%] {\n      transform: translateX(3px);\n      color: var(--%NS%v2-foret);\n    }\n    .link[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n      font-size: 14px;\n      font-weight: 700;\n      color: var(--%NS%v2-foret-clair);\n      cursor: pointer;\n    }\n    .link[_ngcontent-%COMP%]:hover {\n      text-decoration: underline;\n    }\n    .bar[_ngcontent-%COMP%] {\n      height: 8px;\n      overflow: hidden;\n      border-radius: 999px;\n      background: var(--%NS%v2-lin);\n    }\n    .bar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n      display: block;\n      height: 100%;\n      border-radius: 999px;\n      transform-origin: left;\n      animation: _ngcontent-%COMP%_grow 0.8s cubic-bezier(0.32, 0.72, 0, 1) both;\n    }\n    .zero[_ngcontent-%COMP%] {\n      color: var(--%NS%v2-gris-trait) !important;\n    }\n    \n    .act[_ngcontent-%COMP%] {\n      display: grid;\n      height: 34px;\n      width: 34px;\n      place-items: center;\n      border-radius: 12px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-ardoise);\n      cursor: pointer;\n      transition:\n        background-color 0.15s ease,\n        color 0.15s ease,\n        border-color 0.15s ease;\n    }\n    .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n      border-color: var(--%NS%v2-foret);\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n    }\n    .act[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    .act-danger[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act-danger[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-erreur-fg);\n      background: var(--%NS%v2-erreur-bg);\n      color: var(--%NS%v2-erreur-fg);\n    }\n    .btn[_ngcontent-%COMP%] {\n      display: inline-flex;\n      height: 48px;\n      align-items: center;\n      gap: 10px;\n      border-radius: 16px;\n      font-size: 15px;\n      font-weight: 800;\n      cursor: pointer;\n    }\n    .btn-primary[_ngcontent-%COMP%] {\n      padding: 0 6px 0 18px;\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    .btn-primary[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-foret-clair);\n    }\n    \n    .chips[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 4px;\n      overflow-x: auto;\n      scrollbar-width: none;\n      border-radius: 14px;\n      background: var(--%NS%v2-creme);\n      padding: 4px;\n    }\n    .chips[_ngcontent-%COMP%]::-webkit-scrollbar {\n      display: none;\n    }\n    .chip[_ngcontent-%COMP%] {\n      display: inline-flex;\n      flex-shrink: 0;\n      align-items: center;\n      gap: 6px;\n      white-space: nowrap;\n      border-radius: 10px;\n      padding: 8px 12px;\n      font-size: 13px;\n      font-weight: 700;\n      color: var(--%NS%v2-gris-texte);\n      cursor: pointer;\n      transition:\n        background-color 0.15s ease,\n        color 0.15s ease;\n    }\n    .chip[_ngcontent-%COMP%]:hover {\n      color: var(--%NS%v2-encre);\n    }\n    .chip.on[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-foret);\n      box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n    }\n    .chip[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      padding: 0 7px;\n      font-size: 12px;\n      font-variant-numeric: tabular-nums;\n      background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n      color: var(--%NS%v2-ardoise);\n    }\n    .chip.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    .chip[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    .info[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n      font-size: 13px;\n      font-weight: 600;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .info[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n      font-size: 14px;\n      font-weight: 700;\n      text-align: right;\n    }\n    .tab[_ngcontent-%COMP%]:focus-visible, \n   .link[_ngcontent-%COMP%]:focus-visible, \n   .ghost-dark[_ngcontent-%COMP%]:focus-visible, \n   .row-link[_ngcontent-%COMP%]:focus-visible, \n   .crumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .rise[_ngcontent-%COMP%], \n   .panel[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%], \n   .ring[_ngcontent-%COMP%], \n   .bar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n        animation: none;\n      }\n      .stat[_ngcontent-%COMP%], \n   .stat[_ngcontent-%COMP%]:hover, \n   .lift[_ngcontent-%COMP%], \n   .lift[_ngcontent-%COMP%]:hover, \n   .watermark[_ngcontent-%COMP%], \n   .hero-mono[_ngcontent-%COMP%], \n   .row-link[_ngcontent-%COMP%]   .go[_ngcontent-%COMP%] {\n        transition: none;\n        transform: none;\n      }\n      .watermark[_ngcontent-%COMP%] {\n        transform: rotate(-12deg);\n      }\n    }"]
}), _a);

export { CooperativeDetailPage as default };
//# sourceMappingURL=cooperatives._id_.page-CmIQx5l4.mjs.map

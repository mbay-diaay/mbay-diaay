import { i as inject, R as Router, A as ActivatedRoute, c as computed, e as effect, ɵ as __defineComponent, b as __element, D as DOCUMENT$1, d as RouterLink, f as __elementStart, g as __text, h as __elementEnd, j as __conditionalCreate, k as __namespaceSVG, l as __namespaceHTML, m as __repeaterCreate, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, r as __pureFunction1, s as __conditional, t as __styleProp, u as __attribute, v as __repeater, w as __nextContext, x as __pureFunction2, y as __template, z as __classProp, B as __elementContainer, C as __reference, E as __templateRefExtractor } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { c as cooperativeHomeId, L as LocaleService, f as fmtDateTime, i as inScope, s as scopedMembers, m as membershipCounts, a as ageAtMost, b as scopedDossiers, d as scopedRules, e as scopedPayments, g as memberDues, n as nf1, h as fmtDate } from './locale.service-c0QhtcVY.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { N as NgTemplateOutlet, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { U as UiChartComponent } from './ui-DDO8FoUF.mjs';
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

var _a, _b;
var _c0 = (a0) => ({ name: a0 });
var _c1 = (a0, a1) => ({
  start: a0,
  end: a1
});
var _c2 = (a0) => ({ pct: a0 });
var _c3 = (a0) => ({ days: a0 });
var _c4 = (a0) => ({ $implicit: a0 });
var _c5 = (a0) => ["/dashboard/cooperatives", a0];
var _c6 = (a0) => ["/dashboard/reunions", a0];
var _c7 = (a0) => ({ user: a0 });
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.key;
var _forTrack2 = ($index, $item) => $item.id;
function IndexPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 7)(1, "a", 55);
    __element(2, "ui-icon", 56);
    __text(3);
    __elementEnd();
    __elementStart(4, "a", 57);
    __text(5);
    __elementStart(6, "span", 58);
    __element(7, "ui-icon", 59);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance(2);
    __property("size", 20);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("dashboard.actions.export"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("dashboard.actions.report"), " ");
    __advance(2);
    __property("size", 20);
  }
}
function IndexPage_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 17);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("dashboard.campaign.period", __pureFunction2(1, _c1, ctx_r0.campaign().start, ctx_r0.campaign().end)), " ");
  }
}
function IndexPage_Conditional_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span");
    __text(1);
    __elementEnd();
    __elementStart(2, "span", 66);
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r0.t()("dashboard.campaign.elapsed", __pureFunction1(2, _c2, ctx_r0.campaign().pct)));
    __advance(2);
    __textInterpolate(ctx_r0.t()("dashboard.campaign.remaining", __pureFunction1(4, _c3, ctx_r0.campaign().remaining)));
  }
}
function IndexPage_Conditional_25_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 62);
    __element(1, "ui-icon", 67);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __property("size", 15);
    __advance();
    __textInterpolate1("", ctx_r0.t()("dashboard.campaign.ended"), " ");
  }
}
function IndexPage_Conditional_25_For_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div")(1, "dt", 68);
    __text(2);
    __elementEnd();
    __elementStart(3, "dd", 69);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const stat_r2 = ctx.$implicit;
    __advance(2);
    __textInterpolate1(" ", stat_r2.label, " ");
    __advance(2);
    __textInterpolate1(" ", stat_r2.value, " ");
  }
}
function IndexPage_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 60)(1, "div", 61);
    __conditionalCreate(2, IndexPage_Conditional_25_Conditional_2_Template, 4, 6)(3, IndexPage_Conditional_25_Conditional_3_Template, 3, 2, "span", 62);
    __elementEnd();
    __elementStart(4, "div", 63);
    __element(5, "span", 64);
    __elementEnd()();
    __elementStart(6, "dl", 65);
    __repeaterCreate(7, IndexPage_Conditional_25_For_8_Template, 5, 2, "div", null, _forTrack0);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance(2);
    __conditional(ctx_r0.campaign().remaining > 0 ? 2 : 3);
    __advance(3);
    __styleProp("width", ctx_r0.campaign().pct, "%");
    __advance(2);
    __repeater(ctx_r0.campaign().stats);
  }
}
function IndexPage_For_43_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 31)(1, "span", 70);
    __element(2, "span", 71);
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 72);
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const share_r3 = ctx.$implicit;
    const ctx_r0 = __nextContext();
    __advance(2);
    __styleProp("background", share_r3.color);
    __advance();
    __textInterpolate1("", share_r3.label, " ");
    __advance(2);
    __textInterpolate(ctx_r0.localeService.formatNumber(share_r3.n));
  }
}
function IndexPage_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 32);
    __text(1);
    __element(2, "ui-icon", 73);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("dashboard.quality.open"), " ");
    __advance();
    __property("size", 18);
  }
}
function IndexPage_Conditional_45_For_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 78);
    __elementContainer(1, 80);
    __elementEnd();
  }
  if (rf & 2) {
    const level_r4 = __nextContext().$implicit;
    __nextContext();
    const netItem_r5 = __reference(7);
    __property("routerLink", level_r4.to);
    __advance();
    __property("ngTemplateOutlet", netItem_r5)("ngTemplateOutletContext", __pureFunction1(3, _c4, level_r4));
  }
}
function IndexPage_Conditional_45_For_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 79);
    __elementContainer(1, 80);
    __elementEnd();
  }
  if (rf & 2) {
    const level_r4 = __nextContext().$implicit;
    __nextContext();
    const netItem_r5 = __reference(7);
    __advance();
    __property("ngTemplateOutlet", netItem_r5)("ngTemplateOutletContext", __pureFunction1(2, _c4, level_r4));
  }
}
function IndexPage_Conditional_45_For_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 3);
    __conditionalCreate(1, IndexPage_Conditional_45_For_5_Conditional_1_Template, 2, 5, "a", 78)(2, IndexPage_Conditional_45_For_5_Conditional_2_Template, 2, 4, "div", 79);
    __elementEnd();
  }
  if (rf & 2) {
    const level_r4 = ctx.$implicit;
    const \u0275$index_147_r6 = ctx.$index;
    __classProp("net-sep", \u0275$index_147_r6 > 0);
    __advance();
    __conditional(level_r4.to ? 1 : 2);
  }
}
function IndexPage_Conditional_45_ng_template_6_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 85);
    __element(1, "ui-icon", 88);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const n_r7 = __nextContext().$implicit;
    __advance();
    __property("size", 13);
    __advance();
    __textInterpolate1("", n_r7.growth, " ");
  }
}
function IndexPage_Conditional_45_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 81);
    __element(1, "ui-icon", 82);
    __elementEnd();
    __elementStart(2, "span", 3)(3, "span", 83)(4, "span", 84);
    __text(5);
    __elementEnd();
    __conditionalCreate(6, IndexPage_Conditional_45_ng_template_6_Conditional_6_Template, 3, 2, "span", 85);
    __elementEnd();
    __elementStart(7, "span", 86);
    __text(8);
    __elementEnd();
    __elementStart(9, "span", 87);
    __text(10);
    __elementEnd()();
  }
  if (rf & 2) {
    const n_r7 = ctx.$implicit;
    __advance();
    __property("name", n_r7.icon)("size", 22);
    __advance(4);
    __textInterpolate(n_r7.value);
    __advance();
    __conditional(n_r7.growth ? 6 : -1);
    __advance(2);
    __textInterpolate(n_r7.label);
    __advance(2);
    __textInterpolate(n_r7.sub);
  }
}
function IndexPage_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 74)(1, "h2", 75);
    __text(2);
    __elementEnd();
    __elementStart(3, "ul", 76);
    __repeaterCreate(4, IndexPage_Conditional_45_For_5_Template, 3, 3, "li", 77, _forTrack0);
    __elementEnd()();
    __template(6, IndexPage_Conditional_45_ng_template_6_Template, 11, 6, "ng-template", null, 0, __templateRefExtractor);
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("dashboard.network.title"), " ");
    __advance(2);
    __repeater(ctx_r0.network());
  }
}
function IndexPage_For_48_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 93);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const kpi_r8 = __nextContext().$implicit;
    __advance();
    __textInterpolate(kpi_r8.unit);
  }
}
function IndexPage_For_48_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 34)(1, "div", 44)(2, "span", 89);
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 90);
    __element(5, "ui-icon", 82);
    __elementEnd()();
    __elementStart(6, "div", 91)(7, "span", 92);
    __text(8);
    __conditionalCreate(9, IndexPage_For_48_Conditional_9_Template, 2, 1, "span", 93);
    __elementEnd();
    __namespaceSVG();
    __elementStart(10, "svg", 94);
    __element(11, "path", 95)(12, "path", 96);
    __elementEnd()();
    __namespaceHTML();
    __elementStart(13, "p", 97)(14, "span", 98);
    __element(15, "ui-icon", 88);
    __text(16);
    __elementEnd();
    __elementStart(17, "span", 99);
    __text(18);
    __elementEnd()()();
  }
  if (rf & 2) {
    const kpi_r8 = ctx.$implicit;
    const ctx_r0 = __nextContext();
    __advance(3);
    __textInterpolate(kpi_r8.label);
    __advance(2);
    __property("name", kpi_r8.icon)("size", 20);
    __advance(3);
    __textInterpolate1("", kpi_r8.value, " ");
    __advance();
    __conditional(kpi_r8.unit ? 9 : -1);
    __advance(2);
    __attribute("d", kpi_r8.spark.area);
    __advance();
    __attribute("d", kpi_r8.spark.line);
    __advance(3);
    __property("size", 14);
    __advance();
    __textInterpolate1("", kpi_r8.delta, " ");
    __advance(2);
    __textInterpolate(ctx_r0.t()("dashboard.kpi.trend"));
  }
}
function IndexPage_For_54_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li")(1, "a", 100)(2, "span", 101);
    __element(3, "ui-icon", 82);
    __elementEnd();
    __elementStart(4, "span", 102)(5, "span", 103);
    __text(6);
    __elementEnd();
    __elementStart(7, "span", 104);
    __text(8);
    __elementEnd()();
    __elementStart(9, "span", 105);
    __text(10);
    __elementEnd();
    __element(11, "ui-icon", 106);
    __elementEnd()();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const ctx_r0 = __nextContext();
    __advance();
    __property("routerLink", item_r9.to);
    __advance();
    __styleProp("background", item_r9.bg)("color", item_r9.fg);
    __advance();
    __property("name", item_r9.icon)("size", 22);
    __advance(3);
    __textInterpolate(ctx_r0.t()(item_r9.key));
    __advance(2);
    __textInterpolate(item_r9.sub);
    __advance(2);
    __textInterpolate(ctx_r0.localeService.formatNumber(item_r9.value));
    __advance();
    __property("size", 20);
  }
}
function IndexPage_Conditional_60_For_24_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 121);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const rankedScoop_r10 = __nextContext().$implicit;
    __advance();
    __textInterpolate(rankedScoop_r10.commune);
  }
}
function IndexPage_Conditional_60_For_24_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "tr", 116)(1, "td", 117)(2, "span", 118)(3, "span", 119);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 3)(6, "span", 120);
    __text(7);
    __elementEnd();
    __conditionalCreate(8, IndexPage_Conditional_60_For_24_Conditional_8_Template, 2, 1, "span", 121);
    __elementEnd()()();
    __elementStart(9, "td", 122);
    __text(10);
    __elementEnd();
    __elementStart(11, "td", 123);
    __text(12);
    __elementEnd();
    __elementStart(13, "td", 117)(14, "span", 118)(15, "span", 124);
    __element(16, "span");
    __elementEnd();
    __elementStart(17, "span", 125);
    __text(18);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const rankedScoop_r10 = ctx.$implicit;
    const \u0275$index_302_r11 = ctx.$index;
    const ctx_r0 = __nextContext(2);
    __property("routerLink", __pureFunction1(11, _c5, rankedScoop_r10.id));
    __advance(4);
    __textInterpolate(\u0275$index_302_r11 + 1);
    __advance(3);
    __textInterpolate(rankedScoop_r10.name);
    __advance();
    __conditional(rankedScoop_r10.commune && rankedScoop_r10.commune !== rankedScoop_r10.name ? 8 : -1);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.localeService.formatNumber(rankedScoop_r10.producers), " ");
    __advance(2);
    __textInterpolate1(" ", rankedScoop_r10.women, " % ");
    __advance(4);
    __styleProp("width", rankedScoop_r10.quality, "%")("background", rankedScoop_r10.quality >= 70 ? "var(--v2-vert-pousse)" : "var(--v2-soleil)");
    __advance(2);
    __textInterpolate1("", rankedScoop_r10.quality, " %");
  }
}
function IndexPage_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 42)(1, "div", 107)(2, "div")(3, "h2", 108);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 109);
    __text(6);
    __elementEnd()();
    __elementStart(7, "a", 110);
    __text(8);
    __element(9, "ui-icon", 73);
    __elementEnd()();
    __elementStart(10, "div", 111)(11, "table", 112)(12, "thead")(13, "tr", 4)(14, "th", 113);
    __text(15);
    __elementEnd();
    __elementStart(16, "th", 114);
    __text(17);
    __elementEnd();
    __elementStart(18, "th", 114);
    __text(19);
    __elementEnd();
    __elementStart(20, "th", 115);
    __text(21);
    __elementEnd()()();
    __elementStart(22, "tbody");
    __repeaterCreate(23, IndexPage_Conditional_60_For_24_Template, 19, 13, "tr", 116, _forTrack2);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance(4);
    __textInterpolate(ctx_r0.t()("dashboard.ranking.title"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("dashboard.ranking.sub"));
    __advance(2);
    __textInterpolate1("", ctx_r0.t()("dashboard.ranking.all"), " ");
    __advance();
    __property("size", 18);
    __advance(6);
    __textInterpolate(ctx_r0.t()("dashboard.ranking.scoop"));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("dashboard.ranking.producers"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("dashboard.ranking.women"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("dashboard.ranking.quality"), " ");
    __advance(2);
    __repeater(ctx_r0.ranking());
  }
}
function IndexPage_For_68_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li")(1, "a", 100)(2, "span", 126)(3, "span", 127);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 128);
    __text(6);
    __elementEnd()();
    __elementStart(7, "span", 102)(8, "span", 129);
    __text(9);
    __elementEnd();
    __elementStart(10, "span", 130);
    __element(11, "ui-icon", 131);
    __text(12);
    __elementEnd();
    __elementStart(13, "span", 104);
    __text(14);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const meeting_r12 = ctx.$implicit;
    __advance();
    __property("routerLink", __pureFunction1(7, _c6, meeting_r12.id));
    __advance(3);
    __textInterpolate(meeting_r12.day);
    __advance(2);
    __textInterpolate(meeting_r12.month);
    __advance(3);
    __textInterpolate(meeting_r12.title);
    __advance(2);
    __property("size", 14);
    __advance();
    __textInterpolate(meeting_r12.place);
    __advance(2);
    __textInterpolate(meeting_r12.scoop);
  }
}
function IndexPage_ForEmpty_69_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 48);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("dashboard.meetings.empty"), " ");
  }
}
function IndexPage_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 49);
    __text(1);
    __element(2, "ui-icon", 73);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate1("", ctx_r0.t()("dashboard.meetings.all"), " ");
    __advance();
    __property("size", 18);
  }
}
function IndexPage_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 52);
    __text(1);
    __element(2, "ui-icon", 73);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate1("", ctx_r0.t()("dashboard.activity.all"), " ");
    __advance();
    __property("size", 18);
  }
}
function IndexPage_For_78_Conditional_1_Template(rf, ctx) {
  if (rf & 1) __element(0, "span", 132);
}
function IndexPage_For_78_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 54);
    __conditionalCreate(1, IndexPage_For_78_Conditional_1_Template, 1, 0, "span", 132);
    __elementStart(2, "span", 133);
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 134)(5, "span", 135)(6, "span", 136);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 137);
    __text(9);
    __elementEnd()();
    __elementStart(10, "span", 138);
    __text(11);
    __elementEnd()();
    __elementStart(12, "span", 139);
    __text(13);
    __elementEnd()();
  }
  if (rf & 2) {
    const entry_r13 = ctx.$implicit;
    const \u0275$index_400_r14 = ctx.$index;
    const \u0275$count_400_r15 = ctx.$count;
    const ctx_r0 = __nextContext();
    __advance();
    __conditional(!(\u0275$index_400_r14 === \u0275$count_400_r15 - 1) ? 1 : -1);
    __advance(2);
    __textInterpolate(ctx_r0.initialsOf(entry_r13.user));
    __advance(4);
    __textInterpolate(entry_r13.action);
    __advance(2);
    __textInterpolate1(" \xB7 ", entry_r13.entity);
    __advance(2);
    __textInterpolate(ctx_r0.t()("dashboard.activity.by", __pureFunction1(6, _c7, entry_r13.user)));
    __advance(2);
    __textInterpolate(ctx_r0.fmtDateTime(entry_r13.at));
  }
}
function mockTrend(value, seed) {
  return Array.from({ length: 8 }, (_, i) => {
    const wave = Math.sin((i + seed) * 1.7) * 0.035;
    return Math.max(0, value * (0.74 + i * 0.037 + wave));
  }).map((v, i, all) => i === all.length - 1 ? value : v);
}
function sparkPaths(series) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const span = max - min || 1;
  const line = series.map((v, i) => [i / (series.length - 1) * 120, 36 - (v - min) / span * 30]).map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return {
    line,
    area: `${line} L120 40 L0 40 Z`
  };
}
var IndexPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.localeService = inject(LocaleService);
    this.t = this.localeService.t;
    this.fmtDateTime = fmtDateTime;
    this.document = inject(DOCUMENT$1);
    this.firstName = computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = this.store.state().session) == null ? void 0 : _a2.name.split(" ")[0]) != null ? _b2 : "";
    }, ...[]);
    this.today = computed(() => this.localeService.formatDate(/* @__PURE__ */ new Date(), {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }), ...[]);
    this.data = computed(() => {
      const s = this.store.state();
      const session = s.session;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const producersInScope = inScope(s.producers.filter((p) => !p.mergedInto), session);
      const members = scopedMembers(s.members, session);
      const mc = membershipCounts(members);
      const ids = new Set(producersInScope.map((p) => p.id));
      const women = producersInScope.filter((p) => p.sex === "F");
      const youth = producersInScope.filter((p) => ageAtMost(p.age, s.youthMaxAge));
      const plotsInScope = s.plots.filter((p) => ids.has(p.producerId));
      const pendingDossiers = scopedDossiers(s.dossiers, session).filter((d) => d.status === "soumis" || d.status === "en examen").sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
      const oldestDays = pendingDossiers[0] ? Math.max(0, Math.floor((Date.now() - new Date(pendingDossiers[0].updatedAt).getTime()) / 864e5)) : 0;
      const prodById = new Map(producersInScope.map((p) => [p.id, p]));
      const plotById = new Map(s.plots.map((p) => [p.id, p]));
      const openAlerts = s.alerts.filter((a) => {
        var _a2, _b2;
        if (a.status !== "ouvert") return false;
        const owner = a.entity === "producteur" ? prodById.get(a.entityId) : prodById.get((_b2 = (_a2 = plotById.get(a.entityId)) == null ? void 0 : _a2.producerId) != null ? _b2 : "");
        return !!owner && ids.has(owner.id);
      });
      const criticalAlerts = openAlerts.filter((a) => a.severity === "\xE9lev\xE9e").length;
      const scopeRules = scopedRules(s.contributionRules, session);
      const payments = scopedPayments(s.payments, session);
      const lateDues = members.filter((m) => {
        if (m.status !== "membre") return false;
        const rule = scopeRules.find((r) => r.scoopId === m.scoopId);
        const state = memberDues(m, rule, payments, now).state;
        return state === "en retard" || state === "jamais pay\xE9";
      }).length;
      return {
        producers: producersInScope.length,
        activeMembers: mc.active,
        womenPct: producersInScope.length ? women.length / producersInScope.length * 100 : 0,
        youthCount: youth.length,
        pendingDossiers: pendingDossiers.length,
        oldestDays,
        openAlerts: openAlerts.length,
        criticalAlerts,
        lateDues,
        producersInScope,
        plotsInScope,
        measuredHa: plotsInScope.reduce((sum, p) => sum + (p.measured || 0), 0),
        recentAudit: s.audit.slice(0, 6)
      };
    }, ...[]);
    this.layout = computed(() => {
      var _a2;
      const consolidated = ((_a2 = this.store.state().session) == null ? void 0 : _a2.scope.kind) === "consolid\xE9";
      const ranking = this.ranking().length > 1;
      const full = (area) => Array(6).fill(area).join(" ");
      const rows = consolidated ? [
        "campaign campaign campaign campaign meetings meetings",
        ...this.network().length ? [full("network")] : [],
        full("kpis"),
        "quality quality todo todo todo todo",
        ...ranking ? [full("ranking")] : [],
        "chart chart chart activity activity activity"
      ] : [
        "todo todo todo todo quality quality",
        full("kpis"),
        "campaign campaign campaign campaign meetings meetings",
        ...ranking ? [full("ranking")] : [],
        full("chart"),
        full("activity")
      ];
      const order = rows.flatMap((r) => [...new Set(r.split(" "))]);
      return {
        ranking,
        lg: rows.map((r) => `"${r}"`).join(" "),
        sm: [...new Set(order)].map((a) => `"${a}"`).join(" ")
      };
    }, ...[]);
    this.network = computed(() => {
      var _a2;
      const s = this.store.state();
      if (((_a2 = s.session) == null ? void 0 : _a2.scope.kind) !== "consolid\xE9") return [];
      const t = this.t();
      const n = (v) => this.localeService.formatNumber(v);
      const scoops = s.scoops.filter((x) => !x.archived);
      const since = Date.now() - 7776e6;
      const joined = scoops.filter((x) => x.createdAt && new Date(x.createdAt).getTime() >= since).sort((a, b) => {
        var _a3, _b2;
        return ((_a3 = b.createdAt) != null ? _a3 : "").localeCompare((_b2 = a.createdAt) != null ? _b2 : "");
      });
      const gie = s.orgs.filter((o) => o.type === "GIE").length;
      const technicians = s.users.filter((u) => u.role === "technicien" && u.active);
      const active = s.users.filter((u) => u.active).length;
      const invited = s.users.filter((u) => !u.active && u.invited).length;
      const validated = s.plots.filter((p) => p.status === "valid\xE9e").length;
      const canOrgs = this.store.can("org.read");
      const canUsers = this.store.can("user.manage");
      return [
        {
          icon: "diversity_3",
          value: n(scoops.length),
          label: t("dashboard.network.scoops"),
          sub: joined.length ? t("dashboard.network.latest", { name: joined[0].name }) : t("dashboard.network.scoopsSub", { count: new Set(scoops.map((x) => x.commune)).size }),
          growth: joined.length ? t("dashboard.network.joined", { count: joined.length }) : void 0,
          to: canOrgs ? "/dashboard/cooperatives" : null
        },
        {
          icon: "hub",
          value: n(s.orgs.length),
          label: t("dashboard.network.orgs"),
          sub: t("dashboard.network.orgsSub", { count: n(gie) }),
          to: canOrgs ? "/dashboard/organisations" : null
        },
        {
          icon: "person",
          value: n(technicians.length),
          label: t("dashboard.network.technicians"),
          sub: t("dashboard.network.techniciansSub"),
          to: canUsers ? "/dashboard/utilisateurs" : null
        },
        {
          icon: "account_circle",
          value: n(active),
          label: t("dashboard.network.accounts"),
          sub: t("dashboard.network.accountsSub", { count: invited }),
          to: canUsers ? "/dashboard/utilisateurs" : null
        },
        {
          icon: "pin_drop",
          value: n(s.plots.length),
          label: t("dashboard.network.plots"),
          sub: t("dashboard.network.plotsSub", { count: n(validated) }),
          to: null
        }
      ];
    }, ...[]);
    this.campaign = computed(() => {
      var _a2;
      const list = [...this.store.state().campaigns].sort((a, b) => b.start.localeCompare(a.start));
      const c = (_a2 = list.find((x) => x.status === "en cours")) != null ? _a2 : list[0];
      const empty = {
        name: null,
        start: "",
        end: "",
        pct: 0,
        remaining: 0,
        stats: []
      };
      if (!c) return empty;
      const start = new Date(c.start).getTime();
      const end = new Date(c.end).getTime();
      const pct = Math.round(Math.min(1, Math.max(0, (Date.now() - start) / Math.max(1, end - start))) * 100);
      const remaining = Math.max(0, Math.ceil((end - Date.now()) / 864e5));
      const plots = this.data().plotsInScope.filter((p) => p.campaign === c.name);
      const t = this.t();
      const n = (v) => this.localeService.formatNumber(v);
      return {
        name: c.name,
        start: fmtDate(c.start),
        end: fmtDate(c.end),
        pct,
        remaining,
        stats: [
          {
            label: t("dashboard.campaign.plots"),
            value: n(plots.length)
          },
          {
            label: t("dashboard.campaign.validated"),
            value: n(plots.filter((p) => p.status === "valid\xE9e").length)
          },
          {
            label: t("dashboard.campaign.area"),
            value: t("dashboard.kpi.unitHa", { value: nf1.format(plots.reduce((sum, p) => sum + (p.measured || 0), 0)) })
          }
        ]
      };
    }, ...[]);
    this.quality = computed(() => {
      const ps = this.data().producersInScope;
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
    this.kpis = computed(() => {
      const d = this.data();
      const t = this.t();
      const n = (v) => this.localeService.formatNumber(v);
      return [
        {
          label: t("dashboard.kpi.producers"),
          icon: "agriculture",
          raw: d.producers,
          value: n(d.producers),
          unit: "",
          delta: "+6,4 %"
        },
        {
          label: t("dashboard.kpi.activeMembers"),
          icon: "group",
          raw: d.activeMembers,
          value: n(d.activeMembers),
          unit: "",
          delta: "+3,1 %"
        },
        {
          label: t("dashboard.kpi.area"),
          icon: "square_foot",
          raw: d.measuredHa,
          value: nf1.format(d.measuredHa),
          unit: "ha",
          delta: "+8,9 %"
        },
        {
          label: t("dashboard.kpi.women"),
          icon: "female",
          raw: d.womenPct,
          value: nf1.format(d.womenPct),
          unit: "%",
          delta: "+1,2 pt"
        }
      ].map((k, i) => ({
        ...k,
        spark: sparkPaths(mockTrend(k.raw, i + 1))
      }));
    }, ...[]);
    this.todos = computed(() => {
      const d = this.data();
      const t = this.t();
      return [
        {
          key: "dashboard.todo.dossiers",
          to: "/dashboard/dossiers",
          icon: "folder_shared",
          value: d.pendingDossiers,
          sub: d.pendingDossiers ? t("dashboard.todo.dossiersSub", { days: d.oldestDays }) : t("dashboard.todo.empty"),
          bg: "var(--v2-info-bg)",
          fg: "var(--v2-info-fg)"
        },
        {
          key: "dashboard.todo.alerts",
          to: "/dashboard/qualite/alertes",
          icon: "warning",
          value: d.openAlerts,
          sub: t("dashboard.todo.alertsSub", { critical: d.criticalAlerts }),
          bg: d.criticalAlerts ? "var(--v2-erreur-bg)" : "var(--v2-attente-bg)",
          fg: d.criticalAlerts ? "var(--v2-erreur-fg)" : "var(--v2-attente-fg)"
        },
        {
          key: "dashboard.todo.dues",
          to: "/dashboard/cotisations",
          icon: "payments",
          value: d.lateDues,
          sub: t("dashboard.todo.duesSub"),
          bg: "var(--v2-attente-bg)",
          fg: "var(--v2-attente-fg)"
        }
      ];
    }, ...[]);
    this.ranking = computed(() => {
      const s = this.store.state();
      const ps = this.data().producersInScope;
      return s.scoops.filter((sc) => !sc.archived).map((sc) => {
        const mine = ps.filter((p) => p.scoopId === sc.id);
        const n = mine.length || 1;
        return {
          id: sc.id,
          name: sc.name,
          commune: sc.commune,
          producers: mine.length,
          women: Math.round(mine.filter((p) => p.sex === "F").length / n * 100),
          quality: Math.round(mine.filter((p) => p.quality === "valid\xE9").length / n * 100)
        };
      }).filter((r) => r.producers > 0).sort((a, b) => b.producers - a.producers).slice(0, 6);
    }, ...[]);
    this.meetings = computed(() => {
      const s = this.store.state();
      if (!this.store.can("meeting.read")) return [];
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const scoopName = new Map(s.scoops.map((sc) => [sc.id, sc.name]));
      return inScope(s.meetings, s.session).filter((m) => m.status === "planifi\xE9e" && m.date >= now).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3).map((m) => {
        var _a2;
        return {
          id: m.id,
          title: m.title,
          place: m.place,
          scoop: (_a2 = scoopName.get(m.scoopId)) != null ? _a2 : "",
          day: this.localeService.formatDate(m.date, { day: "2-digit" }),
          month: this.localeService.formatDate(m.date, { month: "short" }).replace(".", "")
        };
      });
    }, ...[]);
    this.byScoopChart = computed(() => {
      const s = this.store.state();
      const producers = this.data().producersInScope;
      const font = {
        family: "Plus Jakarta Sans, system-ui, sans-serif",
        size: 12
      };
      const ink = this.token("--v2-encre");
      const muted = this.token("--v2-gris-texte");
      const line = this.token("--v2-separateur");
      const rows = s.scoops.map((scoop) => {
        const ps = producers.filter((p) => p.scoopId === scoop.id);
        return {
          name: scoop.commune,
          F: ps.filter((p) => p.sex === "F").length,
          H: ps.filter((p) => p.sex === "H").length
        };
      }).filter((r) => r.F + r.H > 0);
      return {
        type: "bar",
        data: {
          labels: rows.map((r) => r.name),
          datasets: [{
            label: this.t()("dashboard.chart.women"),
            data: rows.map((r) => r.F),
            backgroundColor: "var(--v2-chart-2)",
            borderRadius: 6,
            borderSkipped: false,
            barThickness: 12
          }, {
            label: this.t()("dashboard.chart.men"),
            data: rows.map((r) => r.H),
            backgroundColor: "var(--v2-chart-1)",
            borderRadius: 6,
            borderSkipped: false,
            barThickness: 12
          }]
        },
        options: {
          indexAxis: "y",
          plugins: { legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "rectRounded",
              padding: 18,
              color: ink,
              font: {
                ...font,
                weight: 600
              }
            }
          } },
          scales: {
            x: {
              stacked: true,
              beginAtZero: true,
              grid: { color: line },
              border: { display: false },
              ticks: {
                color: muted,
                font
              }
            },
            y: {
              stacked: true,
              grid: { display: false },
              border: { display: false },
              ticks: {
                color: ink,
                font: {
                  ...font,
                  weight: 600
                }
              }
            }
          }
        }
      };
    }, ...[]);
  }
  /** Valeur calculée d'un token CSS (axes et légendes Chart.js) ; `undefined` au rendu serveur. */
  token(name) {
    try {
      return getComputedStyle(this.document.documentElement).getPropertyValue(name).trim() || void 0;
    } catch {
      return;
    }
  }
  initialsOf(name) {
    return name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  }
}, _a.\u0275fac = function IndexPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-index-page"]],
  decls: 79,
  vars: 37,
  consts: [
    ["netItem", ""],
    [
      "perm",
      "dashboard.read",
      3,
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
      "text-[16px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "gap-3"
    ],
    [
      1,
      "board",
      "mt-8"
    ],
    [
      "aria-labelledby",
      "campaign-title",
      1,
      "relative",
      "overflow-hidden",
      "rounded-[28px]",
      "p-6",
      "sm:p-8",
      2,
      "grid-area",
      "campaign",
      "background",
      "var(--v2-foret)",
      "color",
      "var(--v2-blanc)"
    ],
    [
      "viewBox",
      "0 0 320 220",
      "aria-hidden",
      "true",
      1,
      "pointer-events-none",
      "absolute",
      "-right-10",
      "-top-6",
      "h-56",
      "w-80",
      "opacity-[0.07]"
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
      "relative",
      "flex",
      "flex-wrap",
      "items-start",
      "justify-between",
      "gap-4"
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
      "campaign-title",
      1,
      "mt-2",
      "text-[28px]",
      "font-extrabold",
      "leading-tight",
      "tracking-[-0.03em]"
    ],
    [
      1,
      "mt-1",
      "text-[14px]",
      "font-medium",
      2,
      "color",
      "color-mix(in oklab, var(--v2-blanc) 70%, transparent)"
    ],
    [
      1,
      "grid",
      "size-14",
      "place-items-center",
      "rounded-[18px]",
      2,
      "background",
      "color-mix(in oklab, var(--v2-blanc) 10%, transparent)"
    ],
    [
      "name",
      "grass",
      2,
      "color",
      "var(--v2-citron)",
      3,
      "size"
    ],
    [
      "aria-labelledby",
      "quality-title",
      1,
      "card",
      "flex",
      "flex-col",
      "p-6",
      2,
      "grid-area",
      "quality"
    ],
    [
      1,
      "flex",
      "items-start",
      "justify-between",
      "gap-3"
    ],
    [
      "id",
      "quality-title",
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
      "gap-6"
    ],
    [
      "role",
      "img",
      1,
      "relative",
      "grid",
      "size-[132px]",
      "shrink-0",
      "place-items-center",
      "rounded-full"
    ],
    [
      1,
      "grid",
      "size-[100px]",
      "place-items-center",
      "rounded-full",
      "text-center",
      2,
      "background",
      "var(--v2-blanc)"
    ],
    [
      1,
      "block",
      "text-[28px]",
      "font-extrabold",
      "leading-none",
      "tracking-[-0.03em]"
    ],
    [1, "text-[16px]"],
    [
      1,
      "mt-1",
      "block",
      "text-[11px]",
      "font-semibold",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "min-w-0",
      "flex-1",
      "space-y-2.5"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "gap-2",
      "text-[14px]"
    ],
    [
      "routerLink",
      "/dashboard/qualite",
      1,
      "link",
      "mt-auto",
      "pt-5"
    ],
    [
      1,
      "grid",
      "grid-cols-1",
      "gap-4",
      "sm:grid-cols-2",
      "xl:grid-cols-4",
      2,
      "grid-area",
      "kpis"
    ],
    [
      1,
      "card",
      "kpi",
      "flex",
      "flex-col",
      "p-5"
    ],
    [
      "aria-labelledby",
      "todo-title",
      1,
      "card",
      "p-4",
      "sm:p-5",
      2,
      "grid-area",
      "todo"
    ],
    [
      "id",
      "todo-title",
      1,
      "h2",
      "px-2",
      "pt-1"
    ],
    [
      1,
      "mt-3",
      "space-y-1"
    ],
    [
      1,
      "card",
      "flex",
      "flex-col",
      "p-5",
      "sm:p-6",
      2,
      "grid-area",
      "chart"
    ],
    [1, "h2"],
    [
      1,
      "relative",
      "mt-4",
      "h-72",
      "w-full",
      "min-h-0",
      "overflow-hidden"
    ],
    [
      "type",
      "bar",
      3,
      "data",
      "options"
    ],
    [
      "aria-labelledby",
      "ranking-title",
      1,
      "card",
      "overflow-hidden",
      2,
      "grid-area",
      "ranking"
    ],
    [
      "aria-labelledby",
      "meetings-title",
      1,
      "card",
      "flex",
      "flex-col",
      "p-6",
      2,
      "grid-area",
      "meetings"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "gap-3"
    ],
    [
      "id",
      "meetings-title",
      1,
      "h2"
    ],
    [
      "name",
      "event_upcoming",
      2,
      "color",
      "var(--v2-foret-clair)",
      3,
      "size"
    ],
    [
      1,
      "mt-4",
      "space-y-2"
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
      "routerLink",
      "/dashboard/reunions",
      1,
      "link",
      "mt-auto",
      "pt-4"
    ],
    [
      "aria-labelledby",
      "activity-title",
      1,
      "card",
      "p-6",
      2,
      "grid-area",
      "activity"
    ],
    [
      "id",
      "activity-title",
      1,
      "h2"
    ],
    [
      "routerLink",
      "/dashboard/audit",
      1,
      "link"
    ],
    [
      1,
      "relative",
      "mt-5",
      "space-y-5",
      "pl-1"
    ],
    [
      1,
      "relative",
      "flex",
      "gap-4"
    ],
    [
      "routerLink",
      "/dashboard/rapports",
      1,
      "btn",
      "btn-ghost"
    ],
    [
      "name",
      "file_export",
      3,
      "size"
    ],
    [
      "routerLink",
      "/dashboard/rapports",
      1,
      "btn",
      "btn-primary"
    ],
    [1, "chip"],
    [
      "name",
      "add",
      3,
      "size"
    ],
    [
      1,
      "relative",
      "mt-6"
    ],
    [
      1,
      "flex",
      "items-baseline",
      "justify-between",
      "gap-3",
      "text-[13px]",
      "font-semibold"
    ],
    [
      1,
      "inline-flex",
      "items-center",
      "gap-1.5",
      "rounded-full",
      "px-2.5",
      "py-1",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
    ],
    [
      1,
      "mt-2",
      "h-2.5",
      "overflow-hidden",
      "rounded-full",
      2,
      "background",
      "color-mix(in oklab, var(--v2-blanc) 14%, transparent)"
    ],
    [
      1,
      "block",
      "h-full",
      "rounded-full",
      2,
      "background",
      "var(--v2-citron)"
    ],
    [
      1,
      "relative",
      "mt-7",
      "grid",
      "grid-cols-3",
      "gap-4"
    ],
    [
      2,
      "color",
      "color-mix(in oklab, var(--v2-blanc) 70%, transparent)"
    ],
    [
      "name",
      "schedule",
      3,
      "size"
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
      "mt-1",
      "text-[26px]",
      "font-extrabold",
      "leading-none",
      "tracking-[-0.03em]",
      "tabular-nums"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2",
      "font-semibold"
    ],
    [
      "aria-hidden",
      "true",
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
      "name",
      "arrow_forward",
      3,
      "size"
    ],
    [
      "aria-labelledby",
      "network-title",
      1,
      "card",
      "p-5",
      "sm:p-6",
      2,
      "grid-area",
      "network"
    ],
    [
      "id",
      "network-title",
      1,
      "mono",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "mt-4",
      "grid",
      "grid-cols-2",
      "gap-x-4",
      "gap-y-5",
      "md:grid-cols-3",
      "xl:grid-cols-5"
    ],
    [
      1,
      "min-w-0",
      3,
      "net-sep"
    ],
    [
      1,
      "net",
      3,
      "routerLink"
    ],
    [
      1,
      "net",
      "net-static"
    ],
    [
      3,
      "ngTemplateOutlet",
      "ngTemplateOutletContext"
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
      "var(--v2-foret)",
      "color",
      "var(--v2-citron)"
    ],
    [
      3,
      "name",
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
      "text-[26px]",
      "font-extrabold",
      "leading-none",
      "tracking-[-0.03em]",
      "tabular-nums"
    ],
    [
      1,
      "inline-flex",
      "items-center",
      "gap-0.5",
      "rounded-full",
      "px-2",
      "py-0.5",
      "text-[12px]",
      "font-extrabold",
      2,
      "background",
      "var(--v2-succes-bg)",
      "color",
      "var(--v2-succes-fg)"
    ],
    [
      1,
      "mt-1",
      "block",
      "text-[14px]",
      "font-bold",
      "leading-snug"
    ],
    [
      1,
      "sub",
      "block",
      "leading-snug"
    ],
    [
      "name",
      "north_east",
      3,
      "size"
    ],
    [
      1,
      "text-[14px]",
      "font-semibold",
      2,
      "color",
      "var(--v2-ardoise)"
    ],
    [
      1,
      "grid",
      "size-10",
      "place-items-center",
      "rounded-[12px]",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-foret)"
    ],
    [
      1,
      "mt-3",
      "flex",
      "items-end",
      "justify-between",
      "gap-3"
    ],
    [
      1,
      "whitespace-nowrap",
      "text-[32px]",
      "font-extrabold",
      "leading-none",
      "tracking-[-0.03em]",
      "tabular-nums"
    ],
    [
      1,
      "ml-1",
      "text-[16px]",
      "font-bold",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "viewBox",
      "0 0 120 40",
      "preserveAspectRatio",
      "none",
      "aria-hidden",
      "true",
      1,
      "h-10",
      "w-28",
      "shrink-0"
    ],
    [
      "fill",
      "var(--v2-chart-2)",
      "fill-opacity",
      "0.18"
    ],
    [
      "fill",
      "none",
      "stroke",
      "var(--v2-vert-pousse)",
      "stroke-width",
      "2.2",
      "stroke-linejoin",
      "round",
      "stroke-linecap",
      "round",
      "vector-effect",
      "non-scaling-stroke"
    ],
    [
      1,
      "mt-3",
      "flex",
      "items-center",
      "gap-1.5",
      "text-[13px]",
      "font-semibold"
    ],
    [
      1,
      "inline-flex",
      "items-center",
      "gap-0.5",
      "rounded-full",
      "px-2",
      "py-0.5",
      "text-[12px]",
      "font-extrabold",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-vert-pousse)"
    ],
    [
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "task",
      3,
      "routerLink"
    ],
    [
      1,
      "grid",
      "size-12",
      "shrink-0",
      "place-items-center",
      "rounded-[14px]"
    ],
    [
      1,
      "min-w-0",
      "flex-1"
    ],
    [
      1,
      "block",
      "text-[15px]",
      "font-bold",
      "leading-snug"
    ],
    [
      1,
      "sub",
      "block",
      "truncate"
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
      "arrow",
      3,
      "size"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-end",
      "justify-between",
      "gap-3",
      "px-6",
      "pt-6"
    ],
    [
      "id",
      "ranking-title",
      1,
      "h2"
    ],
    [
      1,
      "sub",
      "mt-0.5"
    ],
    [
      "routerLink",
      "/dashboard/cooperatives",
      1,
      "link"
    ],
    [
      1,
      "mt-4",
      "overflow-x-auto"
    ],
    [
      1,
      "w-full",
      "min-w-[560px]",
      "text-left",
      "text-[14px]"
    ],
    [
      1,
      "px-6",
      "py-2.5",
      "font-bold"
    ],
    [
      1,
      "px-3",
      "py-2.5",
      "text-right",
      "font-bold"
    ],
    [
      1,
      "w-[32%]",
      "px-6",
      "py-2.5",
      "font-bold"
    ],
    [
      "tabindex",
      "0",
      1,
      "row-link",
      2,
      "border-top",
      "1px solid var(--v2-separateur)",
      3,
      "routerLink"
    ],
    [
      1,
      "px-6",
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
      "text-[13px]",
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
      "block",
      "truncate",
      "text-[12px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
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
      "bar",
      "flex-1"
    ],
    [
      1,
      "w-10",
      "text-right",
      "text-[13px]",
      "font-bold",
      "tabular-nums"
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
      "name",
      "location_on",
      3,
      "size"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "absolute",
      "left-[19px]",
      "top-11",
      "h-[calc(100%-12px)]",
      "w-px",
      2,
      "background",
      "var(--v2-lin)"
    ],
    [
      "aria-hidden",
      "true",
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
      "flex-1",
      "pt-0.5"
    ],
    [
      1,
      "block",
      "text-[14px]"
    ],
    [1, "font-bold"],
    [
      2,
      "color",
      "var(--v2-ardoise)"
    ],
    [
      1,
      "sub",
      "block"
    ],
    [
      1,
      "mono",
      "shrink-0",
      "pt-1",
      "normal-case",
      "tracking-normal",
      2,
      "color",
      "var(--v2-gris-texte)"
    ]
  ],
  template: function IndexPage_Template(rf, ctx) {
    var _a2;
    if (rf & 1) {
      __elementStart(0, "app-shell", 1)(1, "header", 2)(2, "div", 3)(3, "p", 4);
      __text(4);
      __elementEnd();
      __elementStart(5, "h1", 5);
      __text(6);
      __elementEnd();
      __elementStart(7, "p", 6);
      __text(8);
      __elementEnd()();
      __conditionalCreate(9, IndexPage_Conditional_9_Template, 8, 4, "div", 7);
      __elementEnd();
      __elementStart(10, "div", 8)(11, "section", 9);
      __namespaceSVG();
      __elementStart(12, "svg", 10);
      __element(13, "path", 11)(14, "path", 12)(15, "path", 13);
      __elementEnd();
      __namespaceHTML();
      __elementStart(16, "div", 14)(17, "div")(18, "p", 15);
      __text(19);
      __elementEnd();
      __elementStart(20, "h2", 16);
      __text(21);
      __elementEnd();
      __conditionalCreate(22, IndexPage_Conditional_22_Template, 2, 4, "p", 17);
      __elementEnd();
      __elementStart(23, "span", 18);
      __element(24, "ui-icon", 19);
      __elementEnd()();
      __conditionalCreate(25, IndexPage_Conditional_25_Template, 9, 3);
      __elementEnd();
      __elementStart(26, "section", 20)(27, "div", 21)(28, "h2", 22);
      __text(29);
      __elementEnd();
      __element(30, "ui-icon", 23);
      __elementEnd();
      __elementStart(31, "div", 24)(32, "div", 25)(33, "div", 26)(34, "span")(35, "span", 27);
      __text(36);
      __elementStart(37, "span", 28);
      __text(38, " %");
      __elementEnd()();
      __elementStart(39, "span", 29);
      __text(40);
      __elementEnd()()()();
      __elementStart(41, "ul", 30);
      __repeaterCreate(42, IndexPage_For_43_Template, 6, 4, "li", 31, _forTrack0);
      __elementEnd()();
      __conditionalCreate(44, IndexPage_Conditional_44_Template, 3, 2, "a", 32);
      __elementEnd();
      __conditionalCreate(45, IndexPage_Conditional_45_Template, 8, 1);
      __elementStart(46, "section", 33);
      __repeaterCreate(47, IndexPage_For_48_Template, 19, 10, "div", 34, _forTrack0);
      __elementEnd();
      __elementStart(49, "section", 35)(50, "h2", 36);
      __text(51);
      __elementEnd();
      __elementStart(52, "ul", 37);
      __repeaterCreate(53, IndexPage_For_54_Template, 12, 11, "li", null, _forTrack1);
      __elementEnd()();
      __elementStart(55, "section", 38)(56, "h2", 39);
      __text(57);
      __elementEnd();
      __elementStart(58, "div", 40);
      __element(59, "ui-chart", 41);
      __elementEnd()();
      __conditionalCreate(60, IndexPage_Conditional_60_Template, 25, 8, "section", 42);
      __elementStart(61, "section", 43)(62, "div", 44)(63, "h2", 45);
      __text(64);
      __elementEnd();
      __element(65, "ui-icon", 46);
      __elementEnd();
      __elementStart(66, "ul", 47);
      __repeaterCreate(67, IndexPage_For_68_Template, 15, 9, "li", null, _forTrack2, false, IndexPage_ForEmpty_69_Template, 2, 1, "li", 48);
      __elementEnd();
      __conditionalCreate(70, IndexPage_Conditional_70_Template, 3, 2, "a", 49);
      __elementEnd();
      __elementStart(71, "section", 50)(72, "div", 44)(73, "h2", 51);
      __text(74);
      __elementEnd();
      __conditionalCreate(75, IndexPage_Conditional_75_Template, 3, 2, "a", 52);
      __elementEnd();
      __elementStart(76, "ol", 53);
      __repeaterCreate(77, IndexPage_For_78_Template, 14, 8, "li", 54, _forTrack2);
      __elementEnd()()()();
    }
    if (rf & 2) {
      __property("area", ctx.t()("dashboard.area"));
      __advance(4);
      __textInterpolate(ctx.today());
      __advance(2);
      __textInterpolate1(" ", ctx.t()("dashboard.greeting", __pureFunction1(35, _c0, ctx.firstName())), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("dashboard.subtitle"), " ");
      __advance();
      __conditional(ctx.store.can("report.generate") || ctx.store.can("report.read") ? 9 : -1);
      __advance();
      __styleProp("--%NS%areas", ctx.layout().lg)("--%NS%areas-sm", ctx.layout().sm);
      __advance(9);
      __textInterpolate1(" ", ctx.t()("dashboard.campaign.eyebrow"), " ");
      __advance(2);
      __textInterpolate1(" ", (_a2 = ctx.campaign().name) != null ? _a2 : ctx.t()("dashboard.campaign.none"), " ");
      __advance();
      __conditional(ctx.campaign().name ? 22 : -1);
      __advance(2);
      __property("size", 30);
      __advance();
      __conditional(ctx.campaign().name ? 25 : -1);
      __advance(4);
      __textInterpolate(ctx.t()("dashboard.quality.title"));
      __advance();
      __property("size", 24);
      __advance(2);
      __styleProp("background", ctx.quality().ring);
      __attribute("aria-label", ctx.quality().pct + " % " + ctx.t()("dashboard.quality.ring"));
      __advance(4);
      __textInterpolate(ctx.quality().pct);
      __advance(4);
      __textInterpolate(ctx.t()("dashboard.quality.ring"));
      __advance(2);
      __repeater(ctx.quality().rows);
      __advance(2);
      __conditional(ctx.store.can("quality.review") || ctx.store.can("alert.manage") ? 44 : -1);
      __advance();
      __conditional(ctx.network().length ? 45 : -1);
      __advance();
      __attribute("aria-label", ctx.t()("dashboard.overview"));
      __advance();
      __repeater(ctx.kpis());
      __advance(4);
      __textInterpolate(ctx.t()("dashboard.todo.title"));
      __advance(2);
      __repeater(ctx.todos());
      __advance(4);
      __textInterpolate(ctx.t()("dashboard.chart.byScoop"));
      __advance(2);
      __property("data", ctx.byScoopChart().data)("options", ctx.byScoopChart().options);
      __advance();
      __conditional(ctx.layout().ranking ? 60 : -1);
      __advance(4);
      __textInterpolate(ctx.t()("dashboard.meetings.title"));
      __advance();
      __property("size", 24);
      __advance(2);
      __repeater(ctx.meetings());
      __advance(3);
      __conditional(ctx.store.can("meeting.read") ? 70 : -1);
      __advance(4);
      __textInterpolate(ctx.t()("dashboard.activity.title"));
      __advance();
      __conditional(ctx.store.can("audit.read") || ctx.store.can("audit.read.scoop") ? 75 : -1);
      __advance(2);
      __repeater(ctx.data().recentAudit);
    }
  },
  dependencies: [
    RouterLink,
    NgTemplateOutlet,
    AppShellComponent,
    UiChartComponent,
    IconComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    \n    .board[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 16px;\n      grid-template-columns: minmax(0, 1fr);\n      grid-template-areas: var(--%NS%areas-sm);\n    }\n    @media (min-width: 1024px) {\n      .board[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(6, minmax(0, 1fr));\n        grid-template-areas: var(--%NS%areas);\n      }\n    }\n    .net[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: 14px;\n      border-radius: 16px;\n      padding: 6px;\n      cursor: pointer;\n      transition: background-color 0.15s ease;\n    }\n    .net[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-creme);\n    }\n    .net-static[_ngcontent-%COMP%], \n   .net-static[_ngcontent-%COMP%]:hover {\n      cursor: default;\n      background: none;\n    }\n    .net[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    @media (min-width: 1280px) {\n      .net-sep[_ngcontent-%COMP%] {\n        border-left: 1px solid var(--%NS%v2-separateur);\n        padding-left: 16px;\n      }\n    }\n    .card[_ngcontent-%COMP%] {\n      border-radius: 24px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n    }\n    .h2[_ngcontent-%COMP%] {\n      font-size: 18px;\n      font-weight: 800;\n      letter-spacing: -0.02em;\n    }\n    .sub[_ngcontent-%COMP%] {\n      font-size: 13px;\n      font-weight: 500;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .link[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n      font-size: 14px;\n      font-weight: 700;\n      color: var(--%NS%v2-foret-clair);\n      cursor: pointer;\n      text-underline-offset: 3px;\n    }\n    .link[_ngcontent-%COMP%]:hover {\n      text-decoration: underline;\n    }\n    .btn[_ngcontent-%COMP%] {\n      display: inline-flex;\n      height: 48px;\n      align-items: center;\n      gap: 10px;\n      border-radius: 16px;\n      padding: 0 18px;\n      font-size: 15px;\n      font-weight: 800;\n      cursor: pointer;\n      transition:\n        background-color 0.15s ease,\n        border-color 0.15s ease;\n    }\n    .btn-ghost[_ngcontent-%COMP%] {\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-encre);\n    }\n    .btn-ghost[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-texte);\n    }\n    .btn-primary[_ngcontent-%COMP%] {\n      padding: 0 6px 0 18px;\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    .btn-primary[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-foret-clair);\n    }\n    .chip[_ngcontent-%COMP%] {\n      display: grid;\n      height: 36px;\n      width: 36px;\n      place-items: center;\n      border-radius: 12px;\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n    }\n    .task[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 14px;\n      border-radius: 18px;\n      padding: 12px;\n      cursor: pointer;\n      transition: background-color 0.15s ease;\n    }\n    .task[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-creme);\n    }\n    .task[_ngcontent-%COMP%]:hover   .arrow[_ngcontent-%COMP%] {\n      transform: translateX(3px);\n      color: var(--%NS%v2-foret);\n    }\n    .arrow[_ngcontent-%COMP%] {\n      color: var(--%NS%v2-gris-trait);\n      transition:\n        transform 0.2s ease,\n        color 0.2s ease;\n    }\n    .kpi[_ngcontent-%COMP%] {\n      transition:\n        transform 0.2s ease,\n        box-shadow 0.2s ease;\n    }\n    .kpi[_ngcontent-%COMP%]:hover {\n      transform: translateY(-2px);\n      box-shadow: var(--%NS%v2-ombre-flottant);\n    }\n    .bar[_ngcontent-%COMP%] {\n      height: 8px;\n      overflow: hidden;\n      border-radius: 999px;\n      background: var(--%NS%v2-lin);\n    }\n    .bar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n      display: block;\n      height: 100%;\n      border-radius: 999px;\n    }\n    .row-link[_ngcontent-%COMP%] {\n      cursor: pointer;\n      transition: background-color 0.15s ease;\n    }\n    .row-link[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-creme);\n    }\n    .btn[_ngcontent-%COMP%]:focus-visible, \n   .task[_ngcontent-%COMP%]:focus-visible, \n   .link[_ngcontent-%COMP%]:focus-visible, \n   .row-link[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .kpi[_ngcontent-%COMP%], \n   .kpi[_ngcontent-%COMP%]:hover, \n   .arrow[_ngcontent-%COMP%] {\n        transition: none;\n        transform: none;\n      }\n    }"]
}), _a);
var DashboardRolePage = (_b = class {
  constructor() {
    this.store = inject(StoreService);
    this.router = inject(Router);
    this.role = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get("role"))));
    this.sessionRole = computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = this.store.state().session) == null ? void 0 : _a2.role) != null ? _b2 : null;
    }, ...[]);
    effect(() => {
      const coopId = cooperativeHomeId(this.store.state().session);
      if (coopId) this.router.navigate(["/dashboard/cooperatives", coopId], { replaceUrl: true });
    });
    effect(() => {
      const actual = this.sessionRole();
      if (actual && this.role() !== actual) this.router.navigate(["/dashboard", actual], { replaceUrl: true });
    });
  }
}, _b.\u0275fac = function DashboardRolePage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _b)();
}, _b.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _b,
  selectors: [["app-dashboard-role-page"]],
  decls: 1,
  vars: 0,
  template: function DashboardRolePage_Template(rf, ctx) {
    if (rf & 1) __element(0, "app-index-page");
  },
  dependencies: [IndexPage],
  encapsulation: 2
}), _b);

export { DashboardRolePage as default };
//# sourceMappingURL=_role_.page-CwGs-eNr.mjs.map

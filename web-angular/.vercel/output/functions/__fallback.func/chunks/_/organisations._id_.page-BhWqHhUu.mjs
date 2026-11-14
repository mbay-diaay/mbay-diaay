import { i as inject, A as ActivatedRoute, R as Router, F as signal, c as computed, ɵ as __defineComponent, d as RouterLink, f as __elementStart, j as __conditionalCreate, h as __elementEnd, n as __property, o as __advance, s as __conditional, b as __element, g as __text, w as __nextContext, q as __textInterpolate1, p as __textInterpolate, L as __getCurrentView, H as __listener, O as __restoreView, P as __resetView, m as __repeaterCreate, V as __repeaterTrackByIdentity, r as __pureFunction1, u as __attribute, z as __classProp, v as __repeater, t as __styleProp, N as __textInterpolate2 } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { L as LocaleService, n as nf1, I as fmtAge, h as fmtDate, O as ORG_TYPES, i as inScope, a as ageAtMost, j as nf, o as actions, J as AccessDeniedError, l as downloadCsv } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { P as PlotMapComponent } from './plot-map.component-DDK5c2GY.mjs';
import { i as initialsOf, T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { m as DetailHeroComponent, M as ModalComponent, P as PaginationComponent, g as StatCardsComponent } from './ui-DDO8FoUF.mjs';
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
  link: "/dashboard/organisations"
});
var _c1 = (a0) => ["/dashboard/producteurs", a0];
var _c2 = (a0) => ({ name: a0 });
var _forTrack0 = ($index, $item) => $item.id;
function OrganisationDetailPage_Conditional_1_Template(rf, ctx) {
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
    __textInterpolate1(" ", ctx_r0.org() ? ctx_r0.t()("organisations.detail.outOfScope") : ctx_r0.t()("organisations.detail.notFound"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.org() ? ctx_r0.t()("organisations.detail.outOfScopeHint") : ctx_r0.t()("organisations.detail.notFoundHint"), " ");
    __advance(2);
    __textInterpolate(ctx_r0.t()("organisations.title"));
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "button", 26);
    __listener("click", function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_1_Template_button_click_0_listener() {
      __restoreView(_r3);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.openType());
    });
    __element(1, "ui-icon", 27);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const organisation_r4 = __nextContext();
    const ctx_r0 = __nextContext(2);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", organisation_r4.type ? ctx_r0.t()("organisations.detail.changeType") : ctx_r0.t()("organisations.detail.qualifyOrg"), " ");
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "button", 28);
    __listener("click", function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_20_Template_button_click_0_listener() {
      __restoreView(_r5);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.exportProducers());
    });
    __element(1, "ui-icon", 29);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r0.t()("organisations.detail.exportMembers"), " ");
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_21_Conditional_5_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "tr", 40);
    __listener("click", function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_21_Conditional_5_For_18_Template_tr_click_0_listener() {
      const producer_r8 = __restoreView(_r7).$implicit;
      const ctx_r0 = __nextContext(5);
      return __resetView(ctx_r0.openProducer(producer_r8.id));
    });
    __elementStart(1, "td")(2, "span", 41)(3, "span", 42);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 43)(6, "span", 44);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 45);
    __text(9);
    __elementEnd()()()();
    __elementStart(10, "td", 46);
    __text(11);
    __elementEnd();
    __elementStart(12, "td", 47);
    __text(13);
    __elementEnd();
    __elementStart(14, "td")(15, "span", 48);
    __text(16);
    __elementEnd()();
    __elementStart(17, "td")(18, "span", 48);
    __text(19);
    __elementEnd()();
    __elementStart(20, "td")(21, "span", 49)(22, "a", 50);
    __listener("click", function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_21_Conditional_5_For_18_Template_a_click_22_listener($event) {
      return $event.stopPropagation();
    });
    __element(23, "ui-icon", 51);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const producer_r8 = ctx.$implicit;
    const ctx_r0 = __nextContext(5);
    __advance(3);
    __styleProp("background", producer_r8.sex === "F" ? "var(--v2-culture-bg)" : "var(--v2-sauge)")("color", producer_r8.sex === "F" ? "var(--v2-culture-fg)" : "var(--v2-foret)");
    __advance();
    __textInterpolate(ctx_r0.initials(producer_r8.firstName + " " + producer_r8.lastName));
    __advance(3);
    __textInterpolate2("", producer_r8.firstName, " ", producer_r8.lastName);
    __advance(2);
    __textInterpolate(producer_r8.code);
    __advance(2);
    __textInterpolate2(" ", ctx_r0.t()(producer_r8.sex === "F" ? "producteurs.sex.F" : "producteurs.sex.H"), " \xB7 ", ctx_r0.fmtAge(producer_r8.age), " ");
    __advance(2);
    __textInterpolate(producer_r8.village);
    __advance(2);
    __styleProp("background", producer_r8.status === "membre" ? "var(--v2-culture-bg)" : "var(--v2-lin)")("color", producer_r8.status === "membre" ? "var(--v2-culture-fg)" : "var(--v2-gris-texte)");
    __advance();
    __textInterpolate(ctx_r0.t()(producer_r8.status === "membre" ? "producteurs.status.membre" : "producteurs.status.recens\xE9"));
    __advance(2);
    __styleProp("background", ctx_r0.quality[producer_r8.quality].bg)("color", ctx_r0.quality[producer_r8.quality].fg);
    __advance();
    __textInterpolate(ctx_r0.t()(ctx_r0.quality[producer_r8.quality].label));
    __advance(3);
    __property("routerLink", __pureFunction1(25, _c1, producer_r8.id))("title", ctx_r0.t()("common.view"));
    __attribute("aria-label", ctx_r0.t()("organisations.v2.open", __pureFunction1(27, _c2, producer_r8.firstName + " " + producer_r8.lastName)));
    __advance();
    __property("size", 18);
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_21_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 35)(1, "table", 36)(2, "thead")(3, "tr")(4, "th");
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
    __elementStart(12, "th");
    __text(13);
    __elementEnd();
    __elementStart(14, "th", 37);
    __text(15);
    __elementEnd()()();
    __elementStart(16, "tbody");
    __repeaterCreate(17, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_21_Conditional_5_For_18_Template, 24, 29, "tr", 38, _forTrack0);
    __elementEnd()()();
    __element(19, "ui-pagination", 39);
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance(5);
    __textInterpolate(ctx_r0.t()("organisations.v2.col.producer"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("organisations.v2.col.sexAge"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("organisations.detail.col.village"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("organisations.v2.col.status"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("organisations.v2.col.quality"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("organisations.col.actions"));
    __advance(2);
    __repeater(ctx_r0.producerPager.items());
    __advance(2);
    __property("pager", ctx_r0.producerPager);
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_21_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 34);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __textInterpolate1(" ", ctx_r0.producers().length ? ctx_r0.t()("organisations.detail.noMatch") : ctx_r0.t()("organisations.v2.empty.producers"), " ");
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "section", 18)(1, "div", 30)(2, "label", 31);
    __element(3, "ui-icon", 32);
    __elementStart(4, "input", 33);
    __listener("input", function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_21_Template_input_input_4_listener($event) {
      __restoreView(_r6);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.q.set($event.target.value));
    });
    __elementEnd()()();
    __conditionalCreate(5, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_21_Conditional_5_Template, 20, 7)(6, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_21_Conditional_6_Template, 2, 1, "p", 34);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance(3);
    __property("size", 20);
    __advance();
    __property("placeholder", ctx_r0.t()("organisations.detail.search"))("value", ctx_r0.q());
    __attribute("aria-label", ctx_r0.t()("organisations.detail.search"));
    __advance();
    __conditional(ctx_r0.shownProducers().length ? 5 : 6);
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_22_Conditional_1_For_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "tr")(1, "td")(2, "span", 41)(3, "span", 42);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 43)(6, "span", 44);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 54);
    __text(9);
    __elementEnd()()()();
    __elementStart(10, "td", 47);
    __text(11);
    __elementEnd();
    __elementStart(12, "td")(13, "span", 48);
    __text(14);
    __elementEnd()();
    __elementStart(15, "td", 55);
    __text(16);
    __elementEnd()();
  }
  if (rf & 2) {
    const member_r9 = ctx.$implicit;
    const ctx_r0 = __nextContext(5);
    __advance(4);
    __textInterpolate(ctx_r0.initials(member_r9.firstName + " " + member_r9.lastName));
    __advance(3);
    __textInterpolate2("", member_r9.firstName, " ", member_r9.lastName);
    __advance();
    __classProp("zero", !member_r9.phone);
    __advance();
    __textInterpolate(ctx_r0.store.phone(member_r9.phone) || "\u2014");
    __advance(2);
    __textInterpolate(member_r9.village || "\u2014");
    __advance(2);
    __styleProp("background", ctx_r0.memberTone(member_r9.status).bg)("color", ctx_r0.memberTone(member_r9.status).fg);
    __advance();
    __textInterpolate(ctx_r0.t()(ctx_r0.memberKey(member_r9.status)));
    __advance();
    __classProp("zero", !member_r9.joinedAt);
    __advance();
    __textInterpolate1(" ", member_r9.joinedAt ? ctx_r0.fmtDate(member_r9.joinedAt) : "\u2014", " ");
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_22_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 35)(1, "table", 53)(2, "thead")(3, "tr")(4, "th");
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
    __elementEnd()()();
    __elementStart(12, "tbody");
    __repeaterCreate(13, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_22_Conditional_1_For_14_Template, 17, 15, "tr", null, _forTrack0);
    __elementEnd()()();
    __element(15, "ui-pagination", 39);
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance(5);
    __textInterpolate(ctx_r0.t()("cooperatives.fiche.membres.col.name"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("organisations.detail.col.village"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("organisations.v2.col.status"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("organisations.v2.col.joined"));
    __advance(2);
    __repeater(ctx_r0.memberPager.items());
    __advance(2);
    __property("pager", ctx_r0.memberPager);
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_22_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 52);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __textInterpolate(ctx_r0.t()("organisations.v2.empty.members"));
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 18);
    __conditionalCreate(1, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_22_Conditional_1_Template, 16, 5)(2, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_22_Conditional_2_Template, 2, 1, "p", 52);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __conditional(ctx_r0.members().length ? 1 : 2);
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_23_Conditional_0_Conditional_1_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    __elementStart(0, "section", 58)(1, "div", 61);
    __element(2, "app-plot-map", 62);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(5);
    __advance(2);
    __property("plots", ctx_r0.plots())("selectedId", (_a2 = ctx_r0.selectedPlot()) != null ? _a2 : ctx_r0.plots()[0].id)("onSelect", ctx_r0.selectPlot);
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_23_Conditional_0_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "tr", 63);
    __listener("click", function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_23_Conditional_0_For_17_Template_tr_click_0_listener() {
      const plot_r11 = __restoreView(_r10).$implicit;
      const ctx_r0 = __nextContext(5);
      return __resetView(ctx_r0.selectPlot(plot_r11.id));
    })("keydown.enter", function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_23_Conditional_0_For_17_Template_tr_keydown_enter_0_listener() {
      const plot_r11 = __restoreView(_r10).$implicit;
      const ctx_r0 = __nextContext(5);
      return __resetView(ctx_r0.selectPlot(plot_r11.id));
    });
    __elementStart(1, "td")(2, "span", 64);
    __text(3);
    __elementEnd()();
    __elementStart(4, "td", 65);
    __text(5);
    __elementEnd();
    __elementStart(6, "td", 66);
    __text(7);
    __elementEnd();
    __elementStart(8, "td")(9, "span", 48);
    __text(10);
    __elementEnd()()();
  }
  if (rf & 2) {
    const plot_r11 = ctx.$implicit;
    const ctx_r0 = __nextContext(5);
    __classProp("font-bold", ctx_r0.selectedPlot() === plot_r11.id);
    __advance(3);
    __textInterpolate(plot_r11.code);
    __advance(2);
    __textInterpolate(plot_r11.crop);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.nf1.format(plot_r11.measured), " ha ");
    __advance(2);
    __styleProp("background", ctx_r0.plotTone(plot_r11.status).bg)("color", ctx_r0.plotTone(plot_r11.status).fg);
    __advance();
    __textInterpolate(plot_r11.status);
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_23_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 56);
    __conditionalCreate(1, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_23_Conditional_0_Conditional_1_Template, 3, 3, "section", 58);
    __elementStart(2, "section", 58)(3, "div", 35)(4, "table", 59)(5, "thead")(6, "tr")(7, "th");
    __text(8);
    __elementEnd();
    __elementStart(9, "th");
    __text(10);
    __elementEnd();
    __elementStart(11, "th", 37);
    __text(12);
    __elementEnd();
    __elementStart(13, "th");
    __text(14);
    __elementEnd()()();
    __elementStart(15, "tbody");
    __repeaterCreate(16, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_23_Conditional_0_For_17_Template, 11, 10, "tr", 60, _forTrack0);
    __elementEnd()()();
    __element(18, "ui-pagination", 39);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __conditional(ctx_r0.store.can("map.read") ? 1 : -1);
    __advance(7);
    __textInterpolate(ctx_r0.t()("organisations.v2.col.plot"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("organisations.v2.col.crop"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("organisations.v2.col.measured"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("organisations.v2.col.state"));
    __advance(2);
    __repeater(ctx_r0.plotPager.items());
    __advance(2);
    __property("pager", ctx_r0.plotPager);
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 57);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __textInterpolate(ctx_r0.t()("organisations.v2.empty.plots"));
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_23_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_23_Conditional_0_Template, 19, 6, "div", 56)(1, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_23_Conditional_1_Template, 2, 1, "p", 57);
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __conditional(ctx_r0.plots().length ? 0 : 1);
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_For_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "button", 67);
    __listener("click", function OrganisationDetailPage_Conditional_2_Conditional_0_For_27_Template_button_click_0_listener() {
      const orgType_r13 = __restoreView(_r12).$implicit;
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.pickType.set(orgType_r13));
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const orgType_r13 = ctx.$implicit;
    const ctx_r0 = __nextContext(3);
    __classProp("on", ctx_r0.pickType() === orgType_r13);
    __attribute("aria-checked", ctx_r0.pickType() === orgType_r13);
    __advance();
    __textInterpolate1(" ", ctx_r0.locale.tEnum("organisations.type", orgType_r13), " ");
  }
}
function OrganisationDetailPage_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = __getCurrentView();
    __elementStart(0, "ui-detail-hero", 7);
    __conditionalCreate(1, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_1_Template, 3, 2, "button", 8);
    __elementEnd();
    __element(2, "ui-stat-cards", 9);
    __elementStart(3, "div", 10)(4, "div", 11)(5, "button", 12);
    __listener("click", function OrganisationDetailPage_Conditional_2_Conditional_0_Template_button_click_5_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.tab.set("producers"));
    });
    __element(6, "ui-icon", 13);
    __text(7);
    __elementStart(8, "span", 14);
    __text(9);
    __elementEnd()();
    __elementStart(10, "button", 12);
    __listener("click", function OrganisationDetailPage_Conditional_2_Conditional_0_Template_button_click_10_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.tab.set("members"));
    });
    __element(11, "ui-icon", 15);
    __text(12);
    __elementStart(13, "span", 14);
    __text(14);
    __elementEnd()();
    __elementStart(15, "button", 12);
    __listener("click", function OrganisationDetailPage_Conditional_2_Conditional_0_Template_button_click_15_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.tab.set("plots"));
    });
    __element(16, "ui-icon", 16);
    __text(17);
    __elementStart(18, "span", 14);
    __text(19);
    __elementEnd()()();
    __conditionalCreate(20, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_20_Template, 3, 2, "button", 17);
    __elementEnd();
    __conditionalCreate(21, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_21_Template, 7, 5, "section", 18);
    __conditionalCreate(22, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_22_Template, 3, 1, "section", 18);
    __conditionalCreate(23, OrganisationDetailPage_Conditional_2_Conditional_0_Conditional_23_Template, 2, 1);
    __elementStart(24, "ui-modal", 19);
    __listener("closed", function OrganisationDetailPage_Conditional_2_Conditional_0_Template_ui_modal_closed_24_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.typeOpen.set(false));
    });
    __elementStart(25, "div", 20);
    __repeaterCreate(26, OrganisationDetailPage_Conditional_2_Conditional_0_For_27_Template, 2, 4, "button", 21, __repeaterTrackByIdentity);
    __elementEnd();
    __elementStart(28, "button", 22);
    __listener("click", function OrganisationDetailPage_Conditional_2_Conditional_0_Template_button_click_28_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.typeOpen.set(false));
    });
    __text(29);
    __elementEnd();
    __elementStart(30, "button", 23);
    __listener("click", function OrganisationDetailPage_Conditional_2_Conditional_0_Template_button_click_30_listener() {
      const organisation_r4 = __restoreView(_r2);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.saveType(organisation_r4.id));
    });
    __text(31);
    __elementStart(32, "span", 24);
    __element(33, "ui-icon", 25);
    __elementEnd()()();
  }
  if (rf & 2) {
    const organisation_r4 = ctx;
    const ctx_r0 = __nextContext(2);
    __property("crumb", __pureFunction1(47, _c0, ctx_r0.t()("organisations.title")))("title", organisation_r4.name)("mono", ctx_r0.initials(organisation_r4.name))("badges", ctx_r0.heroBadges())("meta", ctx_r0.heroMeta())("backLabel", ctx_r0.t()("organisations.title"));
    __advance();
    __conditional(ctx_r0.store.can("org.manage") ? 1 : -1);
    __advance();
    __property("stats", ctx_r0.stats());
    __advance(2);
    __attribute("aria-label", ctx_r0.t()("organisations.v2.tabs.aria"));
    __advance();
    __classProp("on", ctx_r0.tab() === "producers");
    __attribute("aria-selected", ctx_r0.tab() === "producers");
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r0.t()("organisations.v2.tab.producers"));
    __advance();
    __classProp("zero", !ctx_r0.producers().length);
    __advance();
    __textInterpolate(ctx_r0.producers().length);
    __advance();
    __classProp("on", ctx_r0.tab() === "members");
    __attribute("aria-selected", ctx_r0.tab() === "members");
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r0.t()("organisations.v2.tab.members"));
    __advance();
    __classProp("zero", !ctx_r0.members().length);
    __advance();
    __textInterpolate(ctx_r0.members().length);
    __advance();
    __classProp("on", ctx_r0.tab() === "plots");
    __attribute("aria-selected", ctx_r0.tab() === "plots");
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r0.t()("organisations.v2.tab.plots"));
    __advance();
    __classProp("zero", !ctx_r0.plots().length);
    __advance();
    __textInterpolate(ctx_r0.plots().length);
    __advance();
    __conditional(ctx_r0.tab() === "producers" && ctx_r0.producers().length ? 20 : -1);
    __advance();
    __conditional(ctx_r0.tab() === "producers" ? 21 : -1);
    __advance();
    __conditional(ctx_r0.tab() === "members" ? 22 : -1);
    __advance();
    __conditional(ctx_r0.tab() === "plots" ? 23 : -1);
    __advance();
    __property("open", ctx_r0.typeOpen())("title", organisation_r4.type ? ctx_r0.t()("organisations.detail.changeType") : ctx_r0.t()("organisations.detail.qualifyOrg"))("description", ctx_r0.t()("organisations.detail.dialogHint"))("width", 560)("closeLabel", ctx_r0.t()("common.close"));
    __advance();
    __attribute("aria-label", ctx_r0.t()("organisations.detail.chooseType"));
    __advance();
    __repeater(ctx_r0.orgTypes);
    __advance(3);
    __textInterpolate1(" ", ctx_r0.t()("common.cancel"), " ");
    __advance();
    __property("disabled", !ctx_r0.pickType());
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("organisations.detail.save"));
    __advance(2);
    __property("size", 18);
  }
}
function OrganisationDetailPage_Conditional_2_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, OrganisationDetailPage_Conditional_2_Conditional_0_Template, 34, 49);
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = __nextContext();
    __conditional((tmp_1_0 = ctx_r0.org()) ? 0 : -1, tmp_1_0);
  }
}
var QUALITY = {
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
var PLOT_TONE = {
  relev\u00E9e: TONE.info,
  valid\u00E9e: TONE.succes,
  "\xE0 reprendre": TONE.attente,
  chevauchement: TONE.erreur
};
var MEMBER_TONE = {
  membre: TONE.succes,
  candidat: TONE.info,
  suspendu: TONE.attente,
  sorti: TONE.neutre
};
var norm = (v) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
var OrganisationDetailPage = (_a = class {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.snackbar = inject(SnackbarService);
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.nf1 = nf1;
    this.fmtAge = fmtAge;
    this.fmtDate = fmtDate;
    this.initials = initialsOf;
    this.quality = QUALITY;
    this.orgTypes = ORG_TYPES;
    this.tab = signal("producers", ...[]);
    this.q = signal("", ...[]);
    this.selectedPlot = signal(void 0, ...[]);
    this.selectPlot = (id) => this.selectedPlot.set(id);
    this.typeOpen = signal(false, ...[]);
    this.pickType = signal(null, ...[]);
    this.id = toSignal(this.route.paramMap.pipe(map((p) => {
      var _a2;
      return (_a2 = p.get("id")) != null ? _a2 : "";
    })), { initialValue: "" });
    this.org = computed(() => this.store.state().orgs.find((o) => o.id === this.id()), ...[]);
    this.inScopeOrg = computed(() => {
      const o = this.org();
      return !!o && inScope([o], this.store.state().session).length === 1;
    }, ...[]);
    this.producers = computed(() => this.store.state().producers.filter((p) => p.orgId === this.id() && !p.mergedInto).sort((a, b) => `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`)), ...[]);
    this.shownProducers = computed(() => {
      const needle = norm(this.q().trim());
      return this.producers().filter((p) => !needle || norm(`${p.firstName} ${p.lastName} ${p.code} ${p.village}`).includes(needle));
    }, ...[]);
    this.members = computed(() => this.store.state().members.filter((m) => m.orgId === this.id()).sort((a, b) => `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`)), ...[]);
    this.plots = computed(() => {
      const ids = new Set(this.producers().map((p) => p.id));
      return this.store.state().plots.filter((pl) => ids.has(pl.producerId));
    }, ...[]);
    this.producerPager = createPager(() => this.shownProducers());
    this.memberPager = createPager(() => this.members());
    this.plotPager = createPager(() => this.plots());
    this.stats = computed(() => {
      const t = this.t();
      const ps = this.producers();
      const plots = this.plots();
      const plotIds = new Set(plots.map((pl) => pl.id));
      const ids = new Set(ps.map((p) => p.id));
      const alerts = this.store.state().alerts.filter((a) => (ids.has(a.entityId) || plotIds.has(a.entityId)) && (a.status === "ouvert" || a.status === "en v\xE9rification")).length;
      const women = ps.filter((p) => p.sex === "F").length;
      const youthAge = this.store.state().youthMaxAge;
      const youth = ps.filter((p) => ageAtMost(p.age, youthAge)).length;
      const measured = plots.reduce((n, pl) => n + (pl.measured || 0), 0);
      const declared = plots.reduce((n, pl) => n + (pl.declared || 0), 0);
      const toVerify = ps.filter((p) => p.quality !== "valid\xE9").length;
      return [
        {
          label: t("organisations.col.producers"),
          value: nf.format(ps.length),
          sub: t("organisations.v2.stat.producersSub", {
            women: nf.format(women),
            men: nf.format(ps.length - women)
          }),
          icon: "agriculture",
          bg: "",
          fg: ""
        },
        {
          label: t("organisations.detail.youth", { age: youthAge }),
          value: nf.format(youth),
          sub: t("producteurs.index.stat.shareSub", { pct: ps.length ? Math.round(youth / ps.length * 100) : 0 }),
          icon: "grass",
          ...TONE.attente
        },
        {
          label: t("organisations.detail.measuredArea"),
          value: `${nf1.format(measured)} ha`,
          sub: t("organisations.v2.stat.areaSub", { declared: nf1.format(declared) }),
          icon: "square_foot",
          ...TONE.succes
        },
        {
          label: t("organisations.col.toVerify"),
          value: nf.format(toVerify),
          sub: t("organisations.v2.stat.toVerifySub", { alerts }),
          icon: "warning",
          ...toVerify ? TONE.erreur : TONE.succes
        }
      ];
    }, ...[]);
    this.heroBadges = computed(() => {
      const o = this.org();
      if (!o) return [];
      return [o.type ? {
        label: this.locale.tEnum("organisations.type", o.type),
        tone: "citron",
        icon: "hub"
      } : {
        label: this.t()("organisations.toQualify"),
        tone: "warn",
        icon: "warning"
      }];
    }, ...[]);
    this.heroMeta = computed(() => {
      const o = this.org();
      if (!o) return [];
      return [
        ...o.village ? [{
          icon: "location_on",
          text: o.village
        }] : [],
        {
          icon: "apartment",
          text: this.scoopName(o.scoopId)
        },
        {
          icon: "landscape",
          text: `${nf.format(this.plots().length)} ${this.t()("organisations.v2.tab.plots").toLowerCase()}`
        }
      ];
    }, ...[]);
  }
  scoopName(scoopId) {
    var _a2, _b;
    return (_b = (_a2 = this.store.state().scoops.find((c) => c.id === scoopId)) == null ? void 0 : _a2.name) != null ? _b : "";
  }
  plotTone(status) {
    var _a2;
    return (_a2 = PLOT_TONE[status]) != null ? _a2 : TONE.neutre;
  }
  memberTone(status) {
    var _a2;
    return (_a2 = MEMBER_TONE[status]) != null ? _a2 : TONE.neutre;
  }
  memberKey(status) {
    return `cooperatives.fiche.status.${status}`;
  }
  openProducer(id) {
    this.router.navigate(["/dashboard/producteurs", id]);
  }
  openType() {
    var _a2, _b;
    this.pickType.set((_b = (_a2 = this.org()) == null ? void 0 : _a2.type) != null ? _b : null);
    this.typeOpen.set(true);
  }
  saveType(id) {
    const type = this.pickType();
    if (!type) return;
    try {
      actions.qualifyOrgs([id], type);
    } catch (e) {
      this.snackbar.error(e instanceof AccessDeniedError ? this.locale.tNow(e.key) : String(e));
      return;
    }
    this.typeOpen.set(false);
    this.snackbar.success(this.t()("organisations.detail.typeAssigned", { type: this.locale.tEnum("organisations.type", type) }));
  }
  /** Export CSV des producteurs de l'organisation (anonymisé sans le droit d'export nominatif), tracé. */
  exportProducers() {
    const o = this.org();
    if (!o) return;
    const nominatif = this.store.can("producer.export_nominatif");
    const head = nominatif ? [
      "Code",
      "Pr\xE9nom",
      "Nom",
      "Sexe",
      "\xC2ge",
      "Village",
      "Statut",
      "Qualit\xE9"
    ] : [
      "Code",
      "Sexe",
      "\xC2ge",
      "Village",
      "Statut",
      "Qualit\xE9"
    ];
    const rows = this.producers().map((p) => {
      var _a2, _b;
      return nominatif ? [
        p.code,
        p.firstName,
        p.lastName,
        p.sex,
        (_a2 = p.age) != null ? _a2 : "",
        p.village,
        p.status,
        p.quality
      ] : [
        p.code,
        p.sex,
        (_b = p.age) != null ? _b : "",
        p.village,
        p.status,
        p.quality
      ];
    });
    try {
      downloadCsv(`organisation_${o.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.csv`, [head, ...rows]);
    } catch {
      this.snackbar.error(this.t()("common.exportError"));
      return;
    }
    actions.audit(nominatif ? "Export nominatif" : "Export anonymis\xE9", `Organisation ${o.name}`, `${rows.length} lignes (CSV)`);
    this.snackbar.success(`${this.t()("organisations.exported")} \xB7 ${this.t()("organisations.detail.exportedHint")}`);
  }
}, _a.\u0275fac = function OrganisationDetailPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-organisation-detail-page"]],
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
      "hub",
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
      "/dashboard/organisations",
      1,
      "btn",
      "btn-ghost",
      "mt-2"
    ],
    [
      3,
      "crumb",
      "title",
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
      "rise",
      "mt-6",
      3,
      "stats"
    ],
    [
      1,
      "mt-6",
      "flex",
      "flex-wrap",
      "items-center",
      "justify-between",
      "gap-3"
    ],
    [
      "role",
      "tablist",
      1,
      "seg",
      "tabs"
    ],
    [
      "type",
      "button",
      "role",
      "tab",
      3,
      "click"
    ],
    [
      "name",
      "agriculture",
      3,
      "size"
    ],
    [1, "n"],
    [
      "name",
      "group",
      3,
      "size"
    ],
    [
      "name",
      "landscape",
      3,
      "size"
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
      "sec-card",
      "mt-4"
    ],
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
      "role",
      "radiogroup",
      1,
      "types",
      "pb-5"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "type",
      3,
      "on"
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
    [1, "sec-head"],
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
      1,
      "sub",
      "border-t",
      "px-5",
      "py-6",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [1, "overflow-x-auto"],
    [
      1,
      "tbl",
      "min-w-[720px]"
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
    [1, "avatar"],
    [1, "min-w-0"],
    [
      1,
      "block",
      "truncate",
      "font-bold"
    ],
    [
      1,
      "mono",
      "block",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "whitespace-nowrap",
      "font-medium"
    ],
    [1, "font-medium"],
    [1, "badge"],
    [
      1,
      "flex",
      "justify-end"
    ],
    [
      1,
      "act",
      3,
      "click",
      "routerLink",
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
      "sub",
      "px-5",
      "py-6"
    ],
    [
      1,
      "tbl",
      "min-w-[600px]"
    ],
    [
      1,
      "sub",
      "block",
      "tabular-nums"
    ],
    [
      1,
      "font-medium",
      "tabular-nums"
    ],
    [
      1,
      "mt-4",
      "grid",
      "gap-4",
      "xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
    ],
    [
      1,
      "card",
      "sub",
      "mt-4",
      "p-6"
    ],
    [1, "sec-card"],
    [
      1,
      "tbl",
      "min-w-[520px]"
    ],
    [
      "tabindex",
      "0",
      1,
      "row-link",
      3,
      "font-bold"
    ],
    [1, "map"],
    [
      "basemap",
      "sat",
      3,
      "plots",
      "selectedId",
      "onSelect"
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
      "font-extrabold",
      "tabular-nums"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "type",
      3,
      "click"
    ]
  ],
  template: function OrganisationDetailPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0);
      __conditionalCreate(1, OrganisationDetailPage_Conditional_1_Template, 9, 4, "div", 1)(2, OrganisationDetailPage_Conditional_2_Template, 1, 1);
      __elementEnd();
    }
    if (rf & 2) {
      __property("area", ctx.t()("organisations.detail.area"));
      __advance();
      __conditional(!ctx.org() || !ctx.inScopeOrg() ? 1 : 2);
    }
  },
  dependencies: [
    AppShellComponent,
    DetailHeroComponent,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    PlotMapComponent,
    RouterLink,
    StatCardsComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".tabs[_ngcontent-%COMP%] {\n        width: fit-content;\n        max-width: 100%;\n      }\n      .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n        padding: 11px 16px;\n        font-size: 15px;\n      }\n      .map[_ngcontent-%COMP%] {\n        height: 360px;\n      }\n      .types[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n        gap: 8px;\n      }\n      .type[_ngcontent-%COMP%] {\n        border-radius: 14px;\n        border: 1.5px solid var(--%NS%v2-bord-carte);\n        padding: 12px;\n        text-align: left;\n        font-size: 14px;\n        font-weight: 800;\n        cursor: pointer;\n      }\n      .type[_ngcontent-%COMP%]:hover {\n        border-color: var(--%NS%v2-gris-texte);\n      }\n      .type.on[_ngcontent-%COMP%] {\n        border: 2px solid var(--%NS%v2-foret);\n        background: var(--%NS%v2-sauge);\n        padding: 11.5px;\n      }"]
}), _a);

export { OrganisationDetailPage as default };
//# sourceMappingURL=organisations._id_.page-BhWqHhUu.mjs.map

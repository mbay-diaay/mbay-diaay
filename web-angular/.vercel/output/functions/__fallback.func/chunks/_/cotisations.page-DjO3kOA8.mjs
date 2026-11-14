import { i as inject, F as signal, c as computed, ɵ as __defineComponent, f as __elementStart, g as __text, h as __elementEnd, j as __conditionalCreate, H as __listener, b as __element, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, s as __conditional, u as __attribute, z as __classProp, L as __getCurrentView, w as __nextContext, m as __repeaterCreate, v as __repeater, x as __pureFunction2, V as __repeaterTrackByIdentity, r as __pureFunction1, t as __styleProp, N as __textInterpolate2, a0 as __pureFunction3, O as __restoreView, P as __resetView, a1 as __sanitizeUrl } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, j as nf, h as fmtDate, P as PAYMENT_METHODS, e as scopedPayments, d as scopedRules, w as activeMembers, s as scopedMembers, g as memberDues, x as scoopTotals, i as inScope, o as actions, l as downloadCsv } from './locale.service-c0QhtcVY.mjs';
import { a as aggregatorConnected, p as paymentLinkUrl, b as paymentLinkMessage } from './payment-provider-9TEL3wMl.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { i as initialsOf, T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { e as detailFact, k as detailKpi, f as DetailModalComponent, M as ModalComponent, P as PaginationComponent, S as SelectComponent, g as StatCardsComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';
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
var _c2 = (a0, a1) => ({
  paid: a0,
  expected: a1
});
var _c3 = (a0, a1) => ({
  count: a0,
  amount: a1
});
var _c4 = (a0) => ({ receipt: a0 });
var _c5 = (a0) => ({ year: a0 });
var _c6 = (a0, a1) => ({
  date: a0,
  name: a1
});
var _c7 = (a0) => ({ reason: a0 });
var _c8 = (a0, a1, a2) => ({
  receipt: a0,
  amount: a1,
  period: a2
});
var _c9 = (a0) => ({ scoop: a0 });
var _forTrack0 = ($index, $item) => $item.link.id;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.member.id;
var _forTrack3 = ($index, $item) => $item.scoopId;
function CotisationsPage_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 35);
    __listener("click", function CotisationsPage_Conditional_10_Template_button_click_0_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.openEnroll());
    });
    __text(1);
    __elementStart(2, "span", 30);
    __element(3, "ui-icon", 36);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("cotisations.enroll.open"));
    __advance(2);
    __property("size", 20);
  }
}
function CotisationsPage_Conditional_36_Conditional_4_For_18_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "button", 52);
    __listener("click", function CotisationsPage_Conditional_36_Conditional_4_For_18_Conditional_14_Conditional_2_Template_button_click_0_listener() {
      __restoreView(_r5);
      const row_r4 = __nextContext(2).$implicit;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.cancelLink(row_r4.link));
    });
    __element(1, "ui-icon", 53);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r4 = __nextContext(2).$implicit;
    const ctx_r1 = __nextContext(3);
    __property("title", ctx_r1.t()("cotisations.link.cancel"));
    __attribute("aria-label", ctx_r1.t()("cotisations.link.cancel") + " \xB7 " + row_r4.name);
    __advance();
    __property("size", 18);
  }
}
function CotisationsPage_Conditional_36_Conditional_4_For_18_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "button", 49);
    __listener("click", function CotisationsPage_Conditional_36_Conditional_4_For_18_Conditional_14_Template_button_click_0_listener() {
      __restoreView(_r3);
      const row_r4 = __nextContext().$implicit;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.openLink(row_r4.link));
    });
    __element(1, "ui-icon", 50);
    __elementEnd();
    __conditionalCreate(2, CotisationsPage_Conditional_36_Conditional_4_For_18_Conditional_14_Conditional_2_Template, 2, 3, "button", 51);
  }
  if (rf & 2) {
    const row_r4 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __property("title", ctx_r1.t()("cotisations.link.copy"));
    __attribute("aria-label", ctx_r1.t()("cotisations.link.copy") + " \xB7 " + row_r4.name);
    __advance();
    __property("size", 18);
    __advance();
    __conditional(ctx_r1.canManage() ? 2 : -1);
  }
}
function CotisationsPage_Conditional_36_Conditional_4_For_18_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "tr")(1, "td", 44);
    __text(2);
    __elementEnd();
    __elementStart(3, "td", 45);
    __text(4);
    __elementEnd();
    __elementStart(5, "td", 46);
    __text(6);
    __elementEnd();
    __elementStart(7, "td")(8, "span", 47);
    __text(9);
    __elementEnd()();
    __elementStart(10, "td", 45);
    __text(11);
    __elementEnd();
    __elementStart(12, "td")(13, "span", 48);
    __conditionalCreate(14, CotisationsPage_Conditional_36_Conditional_4_For_18_Conditional_14_Template, 3, 4);
    __elementEnd()()();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    const ctx_r1 = __nextContext(3);
    __advance(2);
    __textInterpolate(row_r4.name);
    __advance(2);
    __textInterpolate(row_r4.link.period);
    __advance(2);
    __textInterpolate1("", ctx_r1.nf.format(row_r4.link.amount), " FCFA");
    __advance(2);
    __styleProp("background", row_r4.tone.bg)("color", row_r4.tone.fg);
    __advance();
    __textInterpolate(ctx_r1.t()(row_r4.statusKey));
    __advance(2);
    __textInterpolate(ctx_r1.fmtDate(row_r4.link.expiresAt));
    __advance(3);
    __conditional(row_r4.live ? 14 : -1);
  }
}
function CotisationsPage_Conditional_36_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 40)(1, "table", 42)(2, "thead")(3, "tr")(4, "th");
    __text(5);
    __elementEnd();
    __elementStart(6, "th");
    __text(7);
    __elementEnd();
    __elementStart(8, "th", 43);
    __text(9);
    __elementEnd();
    __elementStart(10, "th");
    __text(11);
    __elementEnd();
    __elementStart(12, "th");
    __text(13);
    __elementEnd();
    __elementStart(14, "th", 43);
    __text(15);
    __elementEnd()()();
    __elementStart(16, "tbody");
    __repeaterCreate(17, CotisationsPage_Conditional_36_Conditional_4_For_18_Template, 15, 10, "tr", null, _forTrack0);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance(5);
    __textInterpolate(ctx_r1.t()("cotisations.col.member"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.links.col.period"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.links.col.amount"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.links.col.status"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.links.col.expires"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.row.actions"));
    __advance(2);
    __repeater(ctx_r1.linkRows());
  }
}
function CotisationsPage_Conditional_36_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 41)(1, "span", 54);
    __element(2, "ui-icon", 17);
    __elementEnd();
    __elementStart(3, "p", 55);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 56);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.links.empty.title"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.links.empty.text"));
  }
}
function CotisationsPage_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 37);
    __element(1, "ui-icon", 38);
    __text(2);
    __elementEnd();
    __elementStart(3, "section", 39);
    __conditionalCreate(4, CotisationsPage_Conditional_36_Conditional_4_Template, 19, 6, "div", 40)(5, CotisationsPage_Conditional_36_Conditional_5_Template, 7, 3, "div", 41);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.t()(ctx_r1.aggregator ? "cotisations.links.aggregatorOn" : "cotisations.links.aggregatorOff"), " ");
    __advance(2);
    __conditional(ctx_r1.linkRows().length ? 4 : 5);
  }
}
function CotisationsPage_Conditional_37_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "button", 66);
    __listener("click", function CotisationsPage_Conditional_37_For_6_Template_button_click_0_listener() {
      const stateButton_r8 = __restoreView(_r7).$implicit;
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.state.set(stateButton_r8.id));
    });
    __text(1);
    __elementStart(2, "span", 14);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const stateButton_r8 = ctx.$implicit;
    const ctx_r1 = __nextContext(2);
    __classProp("on", ctx_r1.state() === stateButton_r8.id);
    __attribute("aria-checked", ctx_r1.state() === stateButton_r8.id);
    __advance();
    __textInterpolate1(" ", stateButton_r8.label);
    __advance();
    __classProp("zero", !stateButton_r8.count);
    __advance();
    __textInterpolate(ctx_r1.nf.format(stateButton_r8.count));
  }
}
function CotisationsPage_Conditional_37_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = __getCurrentView();
    __elementStart(0, "ui-select", 67);
    __listener("valueChange", function CotisationsPage_Conditional_37_Conditional_7_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r9);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.orgFilter.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __property("label", ctx_r1.t()("cotisations.filter.org"))("options", ctx_r1.orgFilterOptions())("value", ctx_r1.orgFilter());
  }
}
function CotisationsPage_Conditional_37_Conditional_11_For_20_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 81);
    __text(1);
    __elementEnd();
    __elementStart(2, "span", 82);
    __element(3, "span");
    __elementEnd();
  }
  if (rf & 2) {
    const row_r11 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r1.t()("cotisations.row.paidOf", __pureFunction2(5, _c2, ctx_r1.nf.format(row_r11.dues.paid), ctx_r1.nf.format(row_r11.dues.expected))));
    __advance(2);
    __styleProp("width", ctx_r1.pct(row_r11.dues), "%")("background", row_r11.dues.balance ? "var(--v2-soleil)" : "var(--v2-vert-pousse)");
  }
}
function CotisationsPage_Conditional_37_Conditional_11_For_20_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 27);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(4);
    __advance();
    __textInterpolate(ctx_r1.t()("cotisations.row.nothingDue"));
  }
}
function CotisationsPage_Conditional_37_Conditional_11_For_20_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "button", 49);
    __listener("click", function CotisationsPage_Conditional_37_Conditional_11_For_20_Conditional_24_Template_button_click_0_listener($event) {
      __restoreView(_r12);
      const row_r11 = __nextContext().$implicit;
      const ctx_r1 = __nextContext(3);
      $event.stopPropagation();
      return __resetView(ctx_r1.openPay(row_r11.member.id));
    });
    __element(1, "ui-icon", 83);
    __elementEnd();
  }
  if (rf & 2) {
    const row_r11 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __property("title", ctx_r1.t()("cotisations.row.pay"));
    __attribute("aria-label", ctx_r1.t()("cotisations.row.payFor", __pureFunction1(3, _c1, row_r11.name)));
    __advance();
    __property("size", 18);
  }
}
function CotisationsPage_Conditional_37_Conditional_11_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "tr", 72);
    __listener("click", function CotisationsPage_Conditional_37_Conditional_11_For_20_Template_tr_click_0_listener() {
      const row_r11 = __restoreView(_r10).$implicit;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.detailId.set(row_r11.member.id));
    });
    __elementStart(1, "td")(2, "span", 73)(3, "span", 74);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 2)(6, "span", 75);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 76);
    __text(9);
    __elementEnd()()()();
    __elementStart(10, "td", 77);
    __text(11);
    __elementEnd();
    __elementStart(12, "td", 77);
    __text(13);
    __elementEnd();
    __elementStart(14, "td")(15, "span", 47);
    __text(16);
    __elementEnd()();
    __elementStart(17, "td");
    __conditionalCreate(18, CotisationsPage_Conditional_37_Conditional_11_For_20_Conditional_18_Template, 4, 8)(19, CotisationsPage_Conditional_37_Conditional_11_For_20_Conditional_19_Template, 2, 1, "span", 27);
    __elementEnd();
    __elementStart(20, "td", 78);
    __text(21);
    __elementEnd();
    __elementStart(22, "td")(23, "span", 48);
    __conditionalCreate(24, CotisationsPage_Conditional_37_Conditional_11_For_20_Conditional_24_Template, 2, 5, "button", 79);
    __elementStart(25, "button", 49);
    __listener("click", function CotisationsPage_Conditional_37_Conditional_11_For_20_Template_button_click_25_listener($event) {
      const row_r11 = __restoreView(_r10).$implicit;
      const ctx_r1 = __nextContext(3);
      $event.stopPropagation();
      return __resetView(ctx_r1.detailId.set(row_r11.member.id));
    });
    __element(26, "ui-icon", 80);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    const ctx_r1 = __nextContext(3);
    __advance(3);
    __styleProp("background", ctx_r1.state_[row_r11.dues.state].bg)("color", ctx_r1.state_[row_r11.dues.state].fg);
    __advance();
    __textInterpolate(ctx_r1.initials(row_r11.name));
    __advance(3);
    __textInterpolate(row_r11.name);
    __advance();
    __classProp("zero", !row_r11.member.phone);
    __advance();
    __textInterpolate(ctx_r1.store.phone(row_r11.member.phone) || "\u2014");
    __advance();
    __property("title", row_r11.scoop);
    __advance();
    __textInterpolate1(" ", row_r11.scoop, " ");
    __advance();
    __classProp("zero", !row_r11.orgName);
    __property("title", row_r11.orgName);
    __advance();
    __textInterpolate1(" ", row_r11.orgName || ctx_r1.t()("cotisations.filter.individual"), " ");
    __advance(2);
    __styleProp("background", ctx_r1.state_[row_r11.dues.state].bg)("color", ctx_r1.state_[row_r11.dues.state].fg);
    __advance();
    __textInterpolate(ctx_r1.t()(ctx_r1.state_[row_r11.dues.state].label));
    __advance(2);
    __conditional(row_r11.dues.expected ? 18 : 19);
    __advance(2);
    __styleProp("color", row_r11.dues.balance ? "var(--v2-erreur-fg)" : null);
    __classProp("zero", !row_r11.dues.balance);
    __advance();
    __textInterpolate1(" ", ctx_r1.nf.format(row_r11.dues.balance), " FCFA ");
    __advance(3);
    __conditional(ctx_r1.canManage() && row_r11.rule ? 24 : -1);
    __advance();
    __property("title", ctx_r1.t()("common.view"));
    __attribute("aria-label", ctx_r1.t()("cotisations.row.view", __pureFunction1(30, _c1, row_r11.name)));
    __advance();
    __property("size", 18);
  }
}
function CotisationsPage_Conditional_37_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 40)(1, "table", 68)(2, "thead")(3, "tr")(4, "th");
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
    __elementStart(12, "th", 69);
    __text(13);
    __elementEnd();
    __elementStart(14, "th", 43);
    __text(15);
    __elementEnd();
    __elementStart(16, "th", 43);
    __text(17);
    __elementEnd()()();
    __elementStart(18, "tbody");
    __repeaterCreate(19, CotisationsPage_Conditional_37_Conditional_11_For_20_Template, 27, 32, "tr", 70, _forTrack2);
    __elementEnd()()();
    __element(21, "ui-pagination", 71);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance(5);
    __textInterpolate(ctx_r1.t()("cotisations.col.member"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.col.scoop"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.col.org"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.col.state"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.col.paid"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.col.balance"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.row.actions"));
    __advance(2);
    __repeater(ctx_r1.pager.items());
    __advance(2);
    __property("pager", ctx_r1.pager);
  }
}
function CotisationsPage_Conditional_37_Conditional_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 55);
    __text(1);
    __elementEnd();
    __elementStart(2, "p", 56);
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("cotisations.empty.filtered.title"), " ");
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.empty.filtered.text"));
  }
}
function CotisationsPage_Conditional_37_Conditional_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 55);
    __text(1);
    __elementEnd();
    __elementStart(2, "p", 56);
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("cotisations.empty.noMembers.title"), " ");
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.empty.noMembers.text"));
  }
}
function CotisationsPage_Conditional_37_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 41)(1, "span", 54);
    __element(2, "ui-icon", 84);
    __elementEnd();
    __conditionalCreate(3, CotisationsPage_Conditional_37_Conditional_12_Conditional_3_Template, 4, 2)(4, CotisationsPage_Conditional_37_Conditional_12_Conditional_4_Template, 4, 2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance(2);
    __property("size", 26);
    __advance();
    __conditional(ctx_r1.rows().length ? 3 : 4);
  }
}
function CotisationsPage_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "div", 57)(1, "label", 58);
    __element(2, "ui-icon", 59);
    __elementStart(3, "input", 60);
    __listener("input", function CotisationsPage_Conditional_37_Template_input_input_3_listener($event) {
      __restoreView(_r6);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.q.set($event.target.value));
    });
    __elementEnd()();
    __elementStart(4, "div", 61);
    __repeaterCreate(5, CotisationsPage_Conditional_37_For_6_Template, 4, 7, "button", 62, _forTrack1);
    __elementEnd();
    __conditionalCreate(7, CotisationsPage_Conditional_37_Conditional_7_Template, 1, 3, "ui-select", 63);
    __elementEnd();
    __elementStart(8, "p", 64);
    __text(9);
    __elementEnd();
    __elementStart(10, "section", 65);
    __conditionalCreate(11, CotisationsPage_Conditional_37_Conditional_11_Template, 22, 8)(12, CotisationsPage_Conditional_37_Conditional_12_Template, 5, 2, "div", 41);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __property("size", 20);
    __advance();
    __property("placeholder", ctx_r1.t()("cotisations.search.placeholder"))("value", ctx_r1.q());
    __attribute("aria-label", ctx_r1.t()("cotisations.search.aria"));
    __advance();
    __attribute("aria-label", ctx_r1.t()("cotisations.filter.aria"));
    __advance();
    __repeater(ctx_r1.stateButtons());
    __advance(2);
    __conditional(ctx_r1.orgFilterOptions().length > 2 ? 7 : -1);
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()(ctx_r1.shown().length > 1 ? "cotisations.count.autre" : "cotisations.count.un", __pureFunction2(8, _c0, ctx_r1.nf.format(ctx_r1.shown().length), ctx_r1.nf.format(ctx_r1.rows().length))), " ");
    __advance(2);
    __conditional(ctx_r1.shown().length ? 11 : 12);
  }
}
function CotisationsPage_Conditional_38_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = __getCurrentView();
    __elementStart(0, "button", 66);
    __listener("click", function CotisationsPage_Conditional_38_For_7_Template_button_click_0_listener() {
      const statusButton_r15 = __restoreView(_r14).$implicit;
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.pStatus.set(statusButton_r15.id));
    });
    __text(1);
    __elementStart(2, "span", 14);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const statusButton_r15 = ctx.$implicit;
    const ctx_r1 = __nextContext(2);
    __classProp("on", ctx_r1.pStatus() === statusButton_r15.id);
    __attribute("aria-checked", ctx_r1.pStatus() === statusButton_r15.id);
    __advance();
    __textInterpolate1(" ", statusButton_r15.label);
    __advance();
    __classProp("zero", !statusButton_r15.count);
    __advance();
    __textInterpolate(ctx_r1.nf.format(statusButton_r15.count));
  }
}
function CotisationsPage_Conditional_38_Conditional_11_For_22_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 97);
    __text(1);
    __elementEnd();
    __elementStart(2, "span", 98);
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const payment_r17 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate1("", ctx_r1.nf.format(payment_r17.amount), " FCFA");
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.journal.reversalTag"));
  }
}
function CotisationsPage_Conditional_38_Conditional_11_For_22_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 94);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(4);
    __advance();
    __textInterpolate(ctx_r1.t()("cotisations.sheet.history.voidTag"));
  }
}
function CotisationsPage_Conditional_38_Conditional_11_For_22_Conditional_16_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const payment_r17 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __textInterpolate1(" ", ctx_r1.nf.format(payment_r17.amount), " FCFA ");
  }
}
function CotisationsPage_Conditional_38_Conditional_11_For_22_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = __getCurrentView();
    __elementStart(0, "button", 52);
    __listener("click", function CotisationsPage_Conditional_38_Conditional_11_For_22_Conditional_24_Template_button_click_0_listener($event) {
      __restoreView(_r18);
      const payment_r17 = __nextContext().$implicit;
      const ctx_r1 = __nextContext(3);
      $event.stopPropagation();
      return __resetView(ctx_r1.openVoid(payment_r17.id));
    });
    __element(1, "ui-icon", 53);
    __elementEnd();
  }
  if (rf & 2) {
    const payment_r17 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __property("title", ctx_r1.t()("cotisations.row.void"));
    __attribute("aria-label", ctx_r1.t()("cotisations.journal.void", __pureFunction1(3, _c4, payment_r17.receipt)));
    __advance();
    __property("size", 18);
  }
}
function CotisationsPage_Conditional_38_Conditional_11_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = __getCurrentView();
    __elementStart(0, "tr", 72);
    __listener("click", function CotisationsPage_Conditional_38_Conditional_11_For_22_Template_tr_click_0_listener() {
      const payment_r17 = __restoreView(_r16).$implicit;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.receiptId.set(payment_r17.id));
    });
    __elementStart(1, "td", 89);
    __text(2);
    __elementEnd();
    __elementStart(3, "td")(4, "span", 90);
    __text(5);
    __elementEnd()();
    __elementStart(6, "td")(7, "span", 91);
    __text(8);
    __elementEnd();
    __elementStart(9, "span", 92);
    __text(10);
    __elementEnd()();
    __elementStart(11, "td", 93);
    __text(12);
    __elementEnd();
    __elementStart(13, "td", 78);
    __conditionalCreate(14, CotisationsPage_Conditional_38_Conditional_11_For_22_Conditional_14_Template, 4, 2)(15, CotisationsPage_Conditional_38_Conditional_11_For_22_Conditional_15_Template, 2, 1, "span", 94)(16, CotisationsPage_Conditional_38_Conditional_11_For_22_Conditional_16_Template, 1, 1);
    __elementEnd();
    __elementStart(17, "td")(18, "span", 95);
    __text(19);
    __elementEnd()();
    __elementStart(20, "td", 96);
    __text(21);
    __elementEnd();
    __elementStart(22, "td")(23, "span", 48);
    __conditionalCreate(24, CotisationsPage_Conditional_38_Conditional_11_For_22_Conditional_24_Template, 2, 5, "button", 51);
    __elementStart(25, "button", 49);
    __listener("click", function CotisationsPage_Conditional_38_Conditional_11_For_22_Template_button_click_25_listener($event) {
      const payment_r17 = __restoreView(_r16).$implicit;
      const ctx_r1 = __nextContext(3);
      $event.stopPropagation();
      return __resetView(ctx_r1.receiptId.set(payment_r17.id));
    });
    __element(26, "ui-icon", 15);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const payment_r17 = ctx.$implicit;
    const ctx_r1 = __nextContext(3);
    __classProp("voided", !!payment_r17.voided || !!payment_r17.reversalOf);
    __advance(2);
    __textInterpolate1(" ", ctx_r1.fmtDate(payment_r17.paidAt), " ");
    __advance(3);
    __textInterpolate(payment_r17.receipt);
    __advance(3);
    __textInterpolate(ctx_r1.memberName(payment_r17.memberId));
    __advance(2);
    __textInterpolate(ctx_r1.scoopName(payment_r17.scoopId));
    __advance(2);
    __textInterpolate(payment_r17.period);
    __advance(2);
    __conditional(payment_r17.reversalOf ? 14 : payment_r17.voided ? 15 : 16);
    __advance(5);
    __textInterpolate(ctx_r1.t()(ctx_r1.methodKey(payment_r17.method)));
    __advance(2);
    __textInterpolate(payment_r17.recordedBy);
    __advance(3);
    __conditional(ctx_r1.canManage() && !payment_r17.voided && !payment_r17.reversalOf ? 24 : -1);
    __advance();
    __property("title", ctx_r1.t()("cotisations.receipt.title"));
    __attribute("aria-label", ctx_r1.t()("cotisations.receipt.view", __pureFunction1(14, _c4, payment_r17.receipt)));
    __advance();
    __property("size", 18);
  }
}
function CotisationsPage_Conditional_38_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 40)(1, "table", 87)(2, "thead")(3, "tr")(4, "th");
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
    __elementStart(12, "th", 43);
    __text(13);
    __elementEnd();
    __elementStart(14, "th");
    __text(15);
    __elementEnd();
    __elementStart(16, "th");
    __text(17);
    __elementEnd();
    __elementStart(18, "th", 43);
    __text(19);
    __elementEnd()()();
    __elementStart(20, "tbody");
    __repeaterCreate(21, CotisationsPage_Conditional_38_Conditional_11_For_22_Template, 27, 16, "tr", 88, _forTrack1);
    __elementEnd()()();
    __element(23, "ui-pagination", 71);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance(5);
    __textInterpolate(ctx_r1.t()("cotisations.journal.col.date"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.journal.col.receipt"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.journal.col.member"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.journal.col.period"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.journal.col.amount"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.journal.col.method"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.journal.col.by"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.row.actions"));
    __advance(2);
    __repeater(ctx_r1.journalPager.items());
    __advance(2);
    __property("pager", ctx_r1.journalPager);
  }
}
function CotisationsPage_Conditional_38_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 41)(1, "span", 54);
    __element(2, "ui-icon", 15);
    __elementEnd();
    __elementStart(3, "p", 55);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.journal.empty"));
  }
}
function CotisationsPage_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "div", 85)(1, "label", 58);
    __element(2, "ui-icon", 59);
    __elementStart(3, "input", 60);
    __listener("input", function CotisationsPage_Conditional_38_Template_input_input_3_listener($event) {
      __restoreView(_r13);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.pq.set($event.target.value));
    });
    __elementEnd()();
    __elementStart(4, "ui-select", 86);
    __listener("valueChange", function CotisationsPage_Conditional_38_Template_ui_select_valueChange_4_listener($event) {
      __restoreView(_r13);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.pMethod.set($event));
    });
    __elementEnd();
    __elementStart(5, "div", 61);
    __repeaterCreate(6, CotisationsPage_Conditional_38_For_7_Template, 4, 7, "button", 62, _forTrack1);
    __elementEnd()();
    __elementStart(8, "p", 64);
    __text(9);
    __elementEnd();
    __elementStart(10, "section", 65);
    __conditionalCreate(11, CotisationsPage_Conditional_38_Conditional_11_Template, 24, 9)(12, CotisationsPage_Conditional_38_Conditional_12_Template, 5, 2, "div", 41);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __property("size", 20);
    __advance();
    __property("placeholder", ctx_r1.t()("cotisations.journal.search"))("value", ctx_r1.pq());
    __attribute("aria-label", ctx_r1.t()("cotisations.journal.search"));
    __advance();
    __property("label", ctx_r1.t()("cotisations.journal.col.method"))("options", ctx_r1.methodOptions())("value", ctx_r1.pMethod());
    __advance();
    __attribute("aria-label", ctx_r1.t()("cotisations.journal.col.receipt"));
    __advance();
    __repeater(ctx_r1.payStatusButtons());
    __advance(3);
    __textInterpolate1(" ", ctx_r1.t()("cotisations.journal.total", __pureFunction2(10, _c3, ctx_r1.nf.format(ctx_r1.journalTotals().count), ctx_r1.nf.format(ctx_r1.journalTotals().amount))), " ");
    __advance(2);
    __conditional(ctx_r1.journal().length ? 11 : 12);
  }
}
function CotisationsPage_Conditional_39_Conditional_0_For_2_Conditional_7_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    __elementStart(0, "p", 110);
    __text(1);
    __elementEnd();
    __elementStart(2, "p", 111);
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const ruleRow_r19 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ruleRow_r19.summary, " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("cotisations.rule.since", __pureFunction1(2, _c5, (_a2 = ruleRow_r19.startYear) != null ? _a2 : "")), " ");
  }
}
function CotisationsPage_Conditional_39_Conditional_0_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 47);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ruleRow_r19 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __styleProp("background", ruleRow_r19.confirmed ? "var(--v2-sauge)" : "var(--v2-attente-bg)")("color", ruleRow_r19.confirmed ? "var(--v2-vert-pousse)" : "var(--v2-attente-fg)");
    __advance();
    __textInterpolate1(" ", ruleRow_r19.confirmed ? ctx_r1.t()("cotisations.rule.confirmed") : ctx_r1.t()("cotisations.rule.toConfirm"), " ");
  }
}
function CotisationsPage_Conditional_39_Conditional_0_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 108);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(4);
    __advance();
    __textInterpolate(ctx_r1.t()("cotisations.rules.missing"));
  }
}
function CotisationsPage_Conditional_39_Conditional_0_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = __getCurrentView();
    __elementStart(0, "button", 112);
    __listener("click", function CotisationsPage_Conditional_39_Conditional_0_For_2_Conditional_11_Template_button_click_0_listener() {
      __restoreView(_r20);
      const ruleRow_r19 = __nextContext().$implicit;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.openRule(ruleRow_r19.scoopId));
    });
    __element(1, "ui-icon", 113);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ruleRow_r19 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ruleRow_r19.summary ? ctx_r1.t()("cotisations.rule.edit") : ctx_r1.t()("cotisations.rule.define"), " ");
  }
}
function CotisationsPage_Conditional_39_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 101)(1, "div", 102)(2, "span", 103);
    __element(3, "ui-icon", 16);
    __elementEnd();
    __elementStart(4, "div", 104)(5, "p", 105);
    __text(6);
    __elementEnd();
    __conditionalCreate(7, CotisationsPage_Conditional_39_Conditional_0_For_2_Conditional_7_Template, 4, 4);
    __elementEnd()();
    __elementStart(8, "div", 106);
    __conditionalCreate(9, CotisationsPage_Conditional_39_Conditional_0_For_2_Conditional_9_Template, 2, 5, "span", 107)(10, CotisationsPage_Conditional_39_Conditional_0_For_2_Conditional_10_Template, 2, 1, "span", 108);
    __conditionalCreate(11, CotisationsPage_Conditional_39_Conditional_0_For_2_Conditional_11_Template, 3, 2, "button", 109);
    __elementEnd()();
  }
  if (rf & 2) {
    const ruleRow_r19 = ctx.$implicit;
    const ctx_r1 = __nextContext(3);
    __advance(2);
    __styleProp("background", ruleRow_r19.summary ? "var(--v2-foret)" : "var(--v2-erreur-bg)")("color", ruleRow_r19.summary ? "var(--v2-citron)" : "var(--v2-erreur-fg)");
    __advance();
    __property("size", 20);
    __advance(2);
    __property("title", ruleRow_r19.scoop);
    __advance();
    __textInterpolate1(" ", ruleRow_r19.scoop, " ");
    __advance();
    __conditional(ruleRow_r19.summary ? 7 : -1);
    __advance(2);
    __conditional(ruleRow_r19.summary ? 9 : 10);
    __advance(2);
    __conditional(ctx_r1.canManage() ? 11 : -1);
  }
}
function CotisationsPage_Conditional_39_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 99);
    __repeaterCreate(1, CotisationsPage_Conditional_39_Conditional_0_For_2_Template, 12, 10, "div", 101, _forTrack3);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __repeater(ctx_r1.rules());
  }
}
function CotisationsPage_Conditional_39_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 100);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("cotisations.rules.none"));
  }
}
function CotisationsPage_Conditional_39_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, CotisationsPage_Conditional_39_Conditional_0_Template, 3, 0, "div", 99)(1, CotisationsPage_Conditional_39_Conditional_1_Template, 2, 1, "p", 100);
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __conditional(ctx_r1.rules().length ? 0 : 1);
  }
}
function CotisationsPage_Conditional_41_Conditional_6_Template(rf, ctx) {
  var _a2, _b;
  if (rf & 1) {
    const _r22 = __getCurrentView();
    __elementStart(0, "ui-text-field", 127);
    __listener("valueChange", function CotisationsPage_Conditional_41_Conditional_6_Template_ui_text_field_valueChange_0_listener($event) {
      __restoreView(_r22);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.payOther.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const payTarget_r23 = __nextContext();
    const ctx_r1 = __nextContext();
    __property("placeholder", ((_a2 = payTarget_r23.rule) == null ? void 0 : _a2.periodicity) === "mensuelle" ? ctx_r1.t()("ui.field.ph.month") : "")("label", ctx_r1.t()("cotisations.payDialog.otherLabel"))("hint", ctx_r1.t()(((_b = payTarget_r23.rule) == null ? void 0 : _b.periodicity) === "mensuelle" ? "cotisations.payDialog.otherHint.mensuelle" : "cotisations.payDialog.otherHint.annuelle"))("value", ctx_r1.payOther());
  }
}
function CotisationsPage_Conditional_41_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = __getCurrentView();
    __elementStart(0, "button", 66);
    __listener("click", function CotisationsPage_Conditional_41_For_13_Template_button_click_0_listener() {
      const method_r25 = __restoreView(_r24).$implicit;
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.payMethod.set(method_r25));
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const method_r25 = ctx.$implicit;
    const ctx_r1 = __nextContext(2);
    __classProp("on", ctx_r1.payMethod() === method_r25);
    __attribute("aria-checked", ctx_r1.payMethod() === method_r25);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()(ctx_r1.methodKey(method_r25)), " ");
  }
}
function CotisationsPage_Conditional_41_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = __getCurrentView();
    __elementStart(0, "ui-text-field", 128);
    __listener("valueChange", function CotisationsPage_Conditional_41_Conditional_14_Template_ui_text_field_valueChange_0_listener($event) {
      __restoreView(_r26);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.payReference.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __property("label", ctx_r1.t()("cotisations.payDialog.reference"))("optional", ctx_r1.t()("cotisations.optional"))("hint", ctx_r1.t()("cotisations.payDialog.referenceHint"))("value", ctx_r1.payReference());
  }
}
function CotisationsPage_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = __getCurrentView();
    __elementStart(0, "ui-modal", 114);
    __listener("closed", function CotisationsPage_Conditional_41_Template_ui_modal_closed_0_listener() {
      __restoreView(_r21);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.payId.set(null));
    });
    __elementStart(1, "div", 115)(2, "div")(3, "p", 116);
    __text(4);
    __elementEnd();
    __elementStart(5, "ui-select", 117);
    __listener("valueChange", function CotisationsPage_Conditional_41_Template_ui_select_valueChange_5_listener($event) {
      __restoreView(_r21);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.choosePeriod($event));
    });
    __elementEnd()();
    __conditionalCreate(6, CotisationsPage_Conditional_41_Conditional_6_Template, 1, 4, "ui-text-field", 118);
    __elementStart(7, "ui-text-field", 119);
    __listener("valueChange", function CotisationsPage_Conditional_41_Template_ui_text_field_valueChange_7_listener($event) {
      __restoreView(_r21);
      const ctx_r1 = __nextContext();
      ctx_r1.payAmount.set($event);
      return __resetView(ctx_r1.payError.set(""));
    });
    __elementEnd();
    __elementStart(8, "div")(9, "p", 116);
    __text(10);
    __elementEnd();
    __elementStart(11, "div", 120);
    __repeaterCreate(12, CotisationsPage_Conditional_41_For_13_Template, 2, 4, "button", 62, __repeaterTrackByIdentity);
    __elementEnd()();
    __conditionalCreate(14, CotisationsPage_Conditional_41_Conditional_14_Template, 1, 4, "ui-text-field", 121);
    __elementStart(15, "ui-text-field", 122);
    __listener("valueChange", function CotisationsPage_Conditional_41_Template_ui_text_field_valueChange_15_listener($event) {
      __restoreView(_r21);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.payDate.set($event));
    });
    __elementEnd();
    __elementStart(16, "ui-text-field", 123);
    __listener("valueChange", function CotisationsPage_Conditional_41_Template_ui_text_field_valueChange_16_listener($event) {
      __restoreView(_r21);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.payNote.set($event));
    });
    __elementEnd();
    __elementStart(17, "p", 124);
    __element(18, "ui-icon", 125);
    __text(19);
    __elementEnd()();
    __elementStart(20, "button", 28);
    __listener("click", function CotisationsPage_Conditional_41_Template_button_click_20_listener() {
      __restoreView(_r21);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.payId.set(null));
    });
    __text(21);
    __elementEnd();
    __elementStart(22, "button", 28);
    __listener("click", function CotisationsPage_Conditional_41_Template_button_click_22_listener() {
      __restoreView(_r21);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.submitLink());
    });
    __element(23, "ui-icon", 17);
    __text(24);
    __elementEnd();
    __elementStart(25, "button", 126);
    __listener("click", function CotisationsPage_Conditional_41_Template_button_click_25_listener() {
      __restoreView(_r21);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.submitPay());
    });
    __text(26);
    __elementStart(27, "span", 30);
    __element(28, "ui-icon", 31);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __property("open", true)("title", ctx_r1.t()("cotisations.payDialog.title"))("description", ctx_r1.t()("cotisations.payDialog.description", __pureFunction1(29, _c1, ctx.name)))("width", 560)("closeLabel", ctx_r1.t()("common.close"));
    __advance(4);
    __textInterpolate(ctx_r1.t()("cotisations.payDialog.period"));
    __advance();
    __property("label", ctx_r1.t()("cotisations.payDialog.period"))("options", ctx_r1.periodOptions())("value", ctx_r1.payPeriod());
    __advance();
    __conditional(ctx_r1.payPeriod() === ctx_r1.other ? 6 : -1);
    __advance();
    __property("label", ctx_r1.t()("cotisations.payDialog.amount"))("hint", ctx_r1.t()("cotisations.payDialog.amountHint"))("value", ctx_r1.payAmount())("error", ctx_r1.payError());
    __advance(3);
    __textInterpolate(ctx_r1.t()("cotisations.payDialog.method"));
    __advance();
    __attribute("aria-label", ctx_r1.t()("cotisations.payDialog.method"));
    __advance();
    __repeater(ctx_r1.methods);
    __advance(2);
    __conditional(ctx_r1.payMethod() !== "esp\xE8ces" ? 14 : -1);
    __advance();
    __property("label", ctx_r1.t()("cotisations.payDialog.date"))("hint", ctx_r1.t()("cotisations.payDialog.dateHint"))("value", ctx_r1.payDate());
    __advance();
    __property("label", ctx_r1.t()("cotisations.payDialog.note"))("value", ctx_r1.payNote());
    __advance(2);
    __property("size", 16);
    __advance();
    __textInterpolate1("", ctx_r1.t()("cotisations.payDialog.footer"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("cotisations.cancel"), " ");
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.t()("cotisations.payDialog.createLink"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("cotisations.payDialog.submit"), " ");
    __advance(2);
    __property("size", 18);
  }
}
function CotisationsPage_Conditional_42_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 140);
    __element(1, "ui-icon", 142);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const shared_r28 = __nextContext();
    const ctx_r1 = __nextContext();
    __property("href", shared_r28.mail, __sanitizeUrl);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("cotisations.link.email"));
  }
}
function CotisationsPage_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = __getCurrentView();
    __elementStart(0, "ui-modal", 129);
    __listener("closed", function CotisationsPage_Conditional_42_Template_ui_modal_closed_0_listener() {
      __restoreView(_r27);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.linkShown.set(null));
    });
    __elementStart(1, "div", 22)(2, "dl", 130)(3, "div")(4, "dt");
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
    __elementEnd()()();
    __elementStart(18, "p", 131);
    __text(19);
    __elementEnd();
    __elementStart(20, "div", 132)(21, "button", 133);
    __listener("click", function CotisationsPage_Conditional_42_Template_button_click_21_listener() {
      const shared_r28 = __restoreView(_r27);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.copyLink(shared_r28.url));
    });
    __element(22, "ui-icon", 50);
    __text(23);
    __elementEnd();
    __elementStart(24, "button", 134);
    __listener("click", function CotisationsPage_Conditional_42_Template_button_click_24_listener() {
      const shared_r28 = __restoreView(_r27);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.copyLink(shared_r28.message));
    });
    __element(25, "ui-icon", 135);
    __text(26);
    __elementEnd();
    __elementStart(27, "a", 136);
    __element(28, "ui-icon", 137);
    __text(29);
    __elementEnd();
    __elementStart(30, "a", 138);
    __element(31, "ui-icon", 139);
    __text(32);
    __elementEnd();
    __conditionalCreate(33, CotisationsPage_Conditional_42_Conditional_33_Template, 3, 3, "a", 140);
    __elementEnd();
    __elementStart(34, "p", 141);
    __element(35, "ui-icon", 38);
    __text(36);
    __elementEnd()();
    __elementStart(37, "button", 126);
    __listener("click", function CotisationsPage_Conditional_42_Template_button_click_37_listener() {
      __restoreView(_r27);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.linkShown.set(null));
    });
    __text(38);
    __elementStart(39, "span", 30);
    __element(40, "ui-icon", 31);
    __elementEnd()()();
  }
  if (rf & 2) {
    const shared_r28 = ctx;
    const ctx_r1 = __nextContext();
    __property("open", true)("title", ctx_r1.t()("cotisations.link.title", __pureFunction1(27, _c1, shared_r28.name)))("description", ctx_r1.t()("cotisations.link.description"))("width", 600)("closeLabel", ctx_r1.t()("common.close"));
    __advance(5);
    __textInterpolate(ctx_r1.t()("cotisations.links.col.period"));
    __advance(2);
    __textInterpolate(shared_r28.link.period);
    __advance(3);
    __textInterpolate(ctx_r1.t()("cotisations.links.col.amount"));
    __advance(2);
    __textInterpolate1("", ctx_r1.nf.format(shared_r28.link.amount), " FCFA");
    __advance(3);
    __textInterpolate(ctx_r1.t()("cotisations.links.col.expires"));
    __advance(2);
    __textInterpolate(ctx_r1.fmtDate(shared_r28.link.expiresAt));
    __advance(2);
    __textInterpolate(shared_r28.url);
    __advance(3);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.linkCopied() ? ctx_r1.t()("cotisations.link.copied") : ctx_r1.t()("cotisations.link.copy"), " ");
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.t()("cotisations.link.copyMessage"), " ");
    __advance();
    __property("href", shared_r28.whatsapp, __sanitizeUrl);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("cotisations.link.whatsapp"));
    __advance();
    __property("href", shared_r28.sms, __sanitizeUrl);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("cotisations.link.sms"));
    __advance();
    __conditional(shared_r28.mail ? 33 : -1);
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()(ctx_r1.aggregator ? "cotisations.links.aggregatorOn" : "cotisations.links.aggregatorOff"));
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("cotisations.link.done"));
    __advance(2);
    __property("size", 18);
  }
}
function CotisationsPage_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = __getCurrentView();
    __elementStart(0, "ui-select", 143);
    __listener("valueChange", function CotisationsPage_Conditional_45_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r29);
      const ctx_r1 = __nextContext();
      ctx_r1.enrollScoop.set($event);
      return __resetView(ctx_r1.enrollPick.set(""));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __property("label", ctx_r1.t()("documents.add.scoop"))("options", ctx_r1.enrollScoops())("value", ctx_r1.enrollScoop());
  }
}
function CotisationsPage_Conditional_47_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = __getCurrentView();
    __elementStart(0, "li")(1, "label", 144)(2, "input", 145);
    __listener("change", function CotisationsPage_Conditional_47_For_2_Template_input_change_2_listener() {
      const candidate_r31 = __restoreView(_r30).$implicit;
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.enrollPick.set(candidate_r31.id));
    });
    __elementEnd();
    __elementStart(3, "span", 146);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 147);
    __text(6);
    __elementEnd()()();
  }
  if (rf & 2) {
    const candidate_r31 = ctx.$implicit;
    const ctx_r1 = __nextContext(2);
    __advance(2);
    __property("checked", ctx_r1.enrollPick() === candidate_r31.id);
    __advance(2);
    __textInterpolate2("", candidate_r31.firstName, " ", candidate_r31.lastName);
    __advance(2);
    __textInterpolate(candidate_r31.orgName || ctx_r1.t()("cotisations.filter.individual"));
  }
}
function CotisationsPage_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ul", 25);
    __repeaterCreate(1, CotisationsPage_Conditional_47_For_2_Template, 7, 4, "li", null, _forTrack1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __attribute("aria-label", ctx_r1.t()("cotisations.enroll.listAria"));
    __advance();
    __repeater(ctx_r1.enrollCandidates());
  }
}
function CotisationsPage_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 26);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate(ctx_r1.t()("cotisations.enroll.none"));
  }
}
function CotisationsPage_Conditional_57_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div")(1, "dt");
    __text(2);
    __elementEnd();
    __elementStart(3, "dd");
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const receiptView_r33 = __nextContext();
    const ctx_r1 = __nextContext();
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.receipt.reference"));
    __advance(2);
    __textInterpolate(receiptView_r33.p.reference);
  }
}
function CotisationsPage_Conditional_57_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div")(1, "dt");
    __text(2);
    __elementEnd();
    __elementStart(3, "dd");
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const receiptView_r33 = __nextContext();
    const ctx_r1 = __nextContext();
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.receipt.note"));
    __advance(2);
    __textInterpolate(receiptView_r33.p.note);
  }
}
function CotisationsPage_Conditional_57_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 154);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const voidInfo_r34 = ctx;
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate2(" ", ctx_r1.t()("cotisations.receipt.voided", __pureFunction2(2, _c6, ctx_r1.fmtDate(voidInfo_r34.at), voidInfo_r34.by)), " \xB7 ", ctx_r1.t()("cotisations.sheet.history.reason", __pureFunction1(5, _c7, voidInfo_r34.reason)), " ");
  }
}
function CotisationsPage_Conditional_57_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = __getCurrentView();
    __elementStart(0, "button", 159);
    __listener("click", function CotisationsPage_Conditional_57_Conditional_47_Template_button_click_0_listener() {
      __restoreView(_r35);
      const receiptView_r33 = __nextContext();
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.openVoid(receiptView_r33.p.id));
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("cotisations.sheet.void"), " ");
  }
}
function CotisationsPage_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = __getCurrentView();
    __elementStart(0, "ui-modal", 148);
    __listener("closed", function CotisationsPage_Conditional_57_Template_ui_modal_closed_0_listener() {
      __restoreView(_r32);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.receiptId.set(null));
    });
    __elementStart(1, "div", 149)(2, "div", 150)(3, "div")(4, "p", 3);
    __text(5);
    __elementEnd();
    __elementStart(6, "p", 55);
    __text(7);
    __elementEnd()();
    __elementStart(8, "span", 90);
    __text(9);
    __elementEnd()();
    __elementStart(10, "div", 151)(11, "p", 3);
    __text(12);
    __elementEnd();
    __elementStart(13, "p", 152);
    __text(14);
    __elementEnd()();
    __elementStart(15, "dl", 153)(16, "div")(17, "dt");
    __text(18);
    __elementEnd();
    __elementStart(19, "dd");
    __text(20);
    __elementEnd()();
    __elementStart(21, "div")(22, "dt");
    __text(23);
    __elementEnd();
    __elementStart(24, "dd");
    __text(25);
    __elementEnd()();
    __elementStart(26, "div")(27, "dt");
    __text(28);
    __elementEnd();
    __elementStart(29, "dd");
    __text(30);
    __elementEnd()();
    __elementStart(31, "div")(32, "dt");
    __text(33);
    __elementEnd();
    __elementStart(34, "dd");
    __text(35);
    __elementEnd()();
    __elementStart(36, "div")(37, "dt");
    __text(38);
    __elementEnd();
    __elementStart(39, "dd");
    __text(40);
    __elementEnd()();
    __conditionalCreate(41, CotisationsPage_Conditional_57_Conditional_41_Template, 5, 2, "div");
    __conditionalCreate(42, CotisationsPage_Conditional_57_Conditional_42_Template, 5, 2, "div");
    __elementEnd();
    __conditionalCreate(43, CotisationsPage_Conditional_57_Conditional_43_Template, 2, 7, "p", 154);
    __elementStart(44, "p", 155);
    __text(45);
    __elementEnd()();
    __element(46, "div", 156);
    __conditionalCreate(47, CotisationsPage_Conditional_57_Conditional_47_Template, 2, 1, "button", 157);
    __elementStart(48, "button", 126);
    __listener("click", function CotisationsPage_Conditional_57_Template_button_click_48_listener() {
      const receiptView_r33 = __restoreView(_r32);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.printReceipt(receiptView_r33));
    });
    __text(49);
    __elementStart(50, "span", 30);
    __element(51, "ui-icon", 158);
    __elementEnd()()();
  }
  if (rf & 2) {
    let tmp_28_0;
    const receiptView_r33 = ctx;
    const ctx_r1 = __nextContext();
    __property("open", true)("title", ctx_r1.t()("cotisations.receipt.title"))("description", ctx_r1.t()("cotisations.receipt.number", __pureFunction1(35, _c4, receiptView_r33.p.receipt)))("width", 560)("closeLabel", ctx_r1.t()("common.close"));
    __advance();
    __classProp("is-void", !!receiptView_r33.p.voided);
    __advance(4);
    __textInterpolate1(" ", ctx_r1.t()("cotisations.receipt.coop"), " ");
    __advance(2);
    __textInterpolate(receiptView_r33.scoop);
    __advance(2);
    __textInterpolate(receiptView_r33.p.receipt);
    __advance();
    __styleProp("background", receiptView_r33.p.voided ? "var(--v2-lin)" : "var(--v2-sauge)");
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("cotisations.receipt.amount"), " ");
    __advance();
    __styleProp("color", receiptView_r33.p.voided ? "var(--v2-gris-texte)" : "var(--v2-vert-pousse)")("text-decoration", receiptView_r33.p.voided ? "line-through" : null);
    __advance();
    __textInterpolate1(" ", ctx_r1.nf.format(receiptView_r33.p.amount), " FCFA ");
    __advance(4);
    __textInterpolate(ctx_r1.t()("cotisations.receipt.from"));
    __advance(2);
    __textInterpolate(receiptView_r33.member);
    __advance(3);
    __textInterpolate(ctx_r1.t()("cotisations.receipt.period"));
    __advance(2);
    __textInterpolate(receiptView_r33.p.period);
    __advance(3);
    __textInterpolate(ctx_r1.t()("cotisations.receipt.date"));
    __advance(2);
    __textInterpolate(ctx_r1.fmtDate(receiptView_r33.p.paidAt));
    __advance(3);
    __textInterpolate(ctx_r1.t()("cotisations.receipt.method"));
    __advance(2);
    __textInterpolate(ctx_r1.t()(ctx_r1.methodKey(receiptView_r33.p.method)));
    __advance(3);
    __textInterpolate(ctx_r1.t()("cotisations.receipt.by"));
    __advance(2);
    __textInterpolate(receiptView_r33.p.recordedBy);
    __advance();
    __conditional(receiptView_r33.p.reference ? 41 : -1);
    __advance();
    __conditional(receiptView_r33.p.note ? 42 : -1);
    __advance();
    __conditional((tmp_28_0 = receiptView_r33.p.voided) ? 43 : -1, tmp_28_0);
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("cotisations.receipt.footer"), " ");
    __advance(2);
    __conditional(ctx_r1.canManage() && !receiptView_r33.p.voided ? 47 : -1);
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("cotisations.receipt.print"), " ");
    __advance(2);
    __property("size", 18);
  }
}
function CotisationsPage_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = __getCurrentView();
    __elementStart(0, "ui-modal", 160);
    __listener("closed", function CotisationsPage_Conditional_58_Template_ui_modal_closed_0_listener() {
      __restoreView(_r36);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.voidId.set(null));
    });
    __elementStart(1, "p", 161);
    __text(2);
    __elementEnd();
    __elementStart(3, "label", 162);
    __text(4);
    __elementEnd();
    __elementStart(5, "textarea", 163);
    __listener("input", function CotisationsPage_Conditional_58_Template_textarea_input_5_listener($event) {
      __restoreView(_r36);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.voidReason.set($event.target.value));
    });
    __elementEnd();
    __elementStart(6, "p", 164);
    __text(7);
    __elementEnd();
    __elementStart(8, "button", 28);
    __listener("click", function CotisationsPage_Conditional_58_Template_button_click_8_listener() {
      __restoreView(_r36);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.voidId.set(null));
    });
    __text(9);
    __elementEnd();
    __elementStart(10, "button", 165);
    __listener("click", function CotisationsPage_Conditional_58_Template_button_click_10_listener() {
      const paymentToVoid_r37 = __restoreView(_r36);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.submitVoid(paymentToVoid_r37.id));
    });
    __text(11);
    __elementEnd()();
  }
  if (rf & 2) {
    const paymentToVoid_r37 = ctx;
    const ctx_r1 = __nextContext();
    __property("open", true)("title", ctx_r1.t()("cotisations.voidDialog.title"))("description", ctx_r1.t()("cotisations.voidDialog.description"))("width", 540)("closeLabel", ctx_r1.t()("common.close"));
    __advance(2);
    __textInterpolate2(" ", ctx_r1.t()("cotisations.voidDialog.option", __pureFunction3(14, _c8, paymentToVoid_r37.receipt, ctx_r1.nf.format(paymentToVoid_r37.amount), paymentToVoid_r37.period)), " \xB7 ", ctx_r1.memberName(paymentToVoid_r37.memberId), " ");
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.voidDialog.reason"));
    __advance();
    __property("placeholder", ctx_r1.t()("cotisations.voidDialog.reasonHint"))("value", ctx_r1.voidReason());
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.voidDialog.reasonHint"));
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("cotisations.voidDialog.back"), " ");
    __advance();
    __property("disabled", ctx_r1.voidReason().trim().length < 3);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("cotisations.voidDialog.submit"), " ");
  }
}
function CotisationsPage_Conditional_59_Conditional_11_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    const _r39 = __getCurrentView();
    __elementStart(0, "div")(1, "p", 116);
    __text(2);
    __elementEnd();
    __elementStart(3, "div", 173)(4, "ui-select", 174);
    __listener("valueChange", function CotisationsPage_Conditional_59_Conditional_11_Template_ui_select_valueChange_4_listener($event) {
      __restoreView(_r39);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.rMonth.set($event));
    });
    __elementEnd();
    __elementStart(5, "ui-text-field", 175);
    __listener("valueChange", function CotisationsPage_Conditional_59_Conditional_11_Template_ui_text_field_valueChange_5_listener($event) {
      __restoreView(_r39);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.rDay.set($event));
    });
    __elementEnd()();
    __elementStart(6, "p", 176);
    __text(7);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.ruleDialog.dueDate"));
    __advance(2);
    __property("label", ctx_r1.t()("cotisations.ruleDialog.dueMonth"))("options", ctx_r1.monthOptions())("value", ctx_r1.rMonth());
    __advance();
    __property("label", ctx_r1.t()("cotisations.ruleDialog.dueDay"))("maxlength", 2)("value", ctx_r1.rDay())("error", (_a2 = ctx_r1.rErr().day) != null ? _a2 : "");
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.ruleDialog.dueHint"));
  }
}
function CotisationsPage_Conditional_59_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 168);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("cotisations.ruleDialog.monthlyHint"), " ");
  }
}
function CotisationsPage_Conditional_59_Template(rf, ctx) {
  var _a2, _b;
  if (rf & 1) {
    const _r38 = __getCurrentView();
    __elementStart(0, "ui-modal", 166);
    __listener("closed", function CotisationsPage_Conditional_59_Template_ui_modal_closed_0_listener() {
      __restoreView(_r38);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.ruleFor.set(null));
    });
    __elementStart(1, "div", 167)(2, "ui-text-field", 119);
    __listener("valueChange", function CotisationsPage_Conditional_59_Template_ui_text_field_valueChange_2_listener($event) {
      __restoreView(_r38);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.rAmount.set($event));
    });
    __elementEnd();
    __elementStart(3, "div")(4, "p", 116);
    __text(5);
    __elementEnd();
    __elementStart(6, "div", 120)(7, "button", 66);
    __listener("click", function CotisationsPage_Conditional_59_Template_button_click_7_listener() {
      __restoreView(_r38);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.rPeriodicity.set("annuelle"));
    });
    __text(8);
    __elementEnd();
    __elementStart(9, "button", 66);
    __listener("click", function CotisationsPage_Conditional_59_Template_button_click_9_listener() {
      __restoreView(_r38);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.rPeriodicity.set("mensuelle"));
    });
    __text(10);
    __elementEnd()()();
    __conditionalCreate(11, CotisationsPage_Conditional_59_Conditional_11_Template, 8, 9, "div")(12, CotisationsPage_Conditional_59_Conditional_12_Template, 2, 1, "p", 168);
    __elementStart(13, "ui-text-field", 169);
    __listener("valueChange", function CotisationsPage_Conditional_59_Template_ui_text_field_valueChange_13_listener($event) {
      __restoreView(_r38);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.rYear.set($event));
    });
    __elementEnd();
    __elementStart(14, "label", 170)(15, "input", 171);
    __listener("change", function CotisationsPage_Conditional_59_Template_input_change_15_listener($event) {
      __restoreView(_r38);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.rConfirmed.set($event.target.checked));
    });
    __elementEnd();
    __elementStart(16, "span");
    __text(17);
    __elementStart(18, "span", 172);
    __text(19);
    __elementEnd()()()();
    __elementStart(20, "button", 28);
    __listener("click", function CotisationsPage_Conditional_59_Template_button_click_20_listener() {
      __restoreView(_r38);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.ruleFor.set(null));
    });
    __text(21);
    __elementEnd();
    __elementStart(22, "button", 126);
    __listener("click", function CotisationsPage_Conditional_59_Template_button_click_22_listener() {
      const ruleTarget_r40 = __restoreView(_r38);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.submitRule(ruleTarget_r40.id));
    });
    __text(23);
    __elementStart(24, "span", 30);
    __element(25, "ui-icon", 31);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __property("open", true)("title", ctx_r1.t()("cotisations.ruleDialog.titleScoop", __pureFunction1(30, _c9, ctx.name)))("description", ctx_r1.t()("cotisations.ruleDialog.description"))("width", 600)("closeLabel", ctx_r1.t()("common.close"));
    __advance(2);
    __property("label", ctx_r1.t()("cotisations.ruleDialog.amount"))("hint", ctx_r1.t()("cotisations.ruleDialog.amountHint"))("value", ctx_r1.rAmount())("error", (_a2 = ctx_r1.rErr().amount) != null ? _a2 : "");
    __advance(3);
    __textInterpolate(ctx_r1.t()("cotisations.ruleDialog.periodicity"));
    __advance();
    __attribute("aria-label", ctx_r1.t()("cotisations.ruleDialog.periodicity"));
    __advance();
    __classProp("on", ctx_r1.rPeriodicity() === "annuelle");
    __attribute("aria-checked", ctx_r1.rPeriodicity() === "annuelle");
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("cotisations.periodicity.annuelle"), " ");
    __advance();
    __classProp("on", ctx_r1.rPeriodicity() === "mensuelle");
    __attribute("aria-checked", ctx_r1.rPeriodicity() === "mensuelle");
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("cotisations.periodicity.mensuelle"), " ");
    __advance();
    __conditional(ctx_r1.rPeriodicity() === "annuelle" ? 11 : 12);
    __advance(2);
    __property("label", ctx_r1.t()("cotisations.ruleDialog.startYear"))("maxlength", 4)("value", ctx_r1.rYear())("error", (_b = ctx_r1.rErr().year) != null ? _b : "");
    __advance(2);
    __property("checked", ctx_r1.rConfirmed());
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.ruleDialog.confirmed"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("cotisations.ruleDialog.confirmedHint"));
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("cotisations.cancel"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("cotisations.ruleDialog.submit"), " ");
    __advance(2);
    __property("size", 18);
  }
}
var STATES = [
  "\xE0 jour",
  "en retard",
  "jamais pay\xE9",
  "non exigible"
];
var STATE = {
  "\xE0 jour": {
    label: "cotisations.state.\xE0 jour",
    ...TONE.succes
  },
  "en retard": {
    label: "cotisations.state.en retard",
    ...TONE.erreur
  },
  "jamais pay\xE9": {
    label: "cotisations.state.jamais pay\xE9",
    ...TONE.attente
  },
  "non exigible": {
    label: "cotisations.state.non exigible",
    ...TONE.neutre
  }
};
var ALL = "__tous";
var OTHER = "__autre";
var today = () => {
  const d = /* @__PURE__ */ new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
var norm = (v) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
var INDIVIDUAL = "__individuel";
var isCancelled = (payment) => !!payment.voided || !!payment.reversalOf;
var CotisationsPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.snackbar = inject(SnackbarService);
    this.t = this.locale.t;
    this.nf = nf;
    this.initials = initialsOf;
    this.fmtDate = fmtDate;
    this.state_ = STATE;
    this.methods = PAYMENT_METHODS;
    this.other = OTHER;
    this.q = signal("", ...[]);
    this.state = signal(ALL, ...[]);
    this.orgFilter = signal(ALL, ...[]);
    this.detailId = signal(null, ...[]);
    this.canManage = computed(() => this.store.can("contribution.manage"), ...[]);
    this.rows = computed(() => {
      const s = this.store.state();
      const session = s.session;
      const payments = scopedPayments(s.payments, session);
      const rules = scopedRules(s.contributionRules, session);
      const scoopName = new Map(s.scoops.map((c) => [c.id, c.name]));
      const now = (/* @__PURE__ */ new Date()).toISOString();
      return activeMembers(scopedMembers(s.members, session)).map((member) => {
        var _a2, _b, _c, _d;
        const rule = rules.find((r) => r.scoopId === member.scoopId);
        return {
          member,
          name: `${member.firstName} ${member.lastName}`,
          scoop: (_a2 = scoopName.get(member.scoopId)) != null ? _a2 : member.scoopId,
          orgId: (_b = member.orgId) != null ? _b : "",
          orgName: member.orgId ? (_d = (_c = s.orgs.find((org) => org.id === member.orgId)) == null ? void 0 : _c.name) != null ? _d : "" : "",
          dues: memberDues(member, rule, payments, now),
          rule
        };
      }).sort((a, b) => b.dues.balance - a.dues.balance || a.name.localeCompare(b.name));
    }, ...[]);
    this.totals = computed(() => {
      var _a2;
      const s = this.store.state();
      const session = s.session;
      const members = activeMembers(scopedMembers(s.members, session));
      const payments = scopedPayments(s.payments, session);
      const rules = scopedRules(s.contributionRules, session);
      const now = (/* @__PURE__ */ new Date()).toISOString();
      let expected = 0;
      let collected = 0;
      let late = 0;
      const byScoop = /* @__PURE__ */ new Map();
      for (const m of members) byScoop.set(m.scoopId, [...(_a2 = byScoop.get(m.scoopId)) != null ? _a2 : [], m]);
      for (const [scoopId, mine] of byScoop) {
        const tt = scoopTotals(mine, rules.find((r) => r.scoopId === scoopId), payments, now);
        expected += tt.expected;
        collected += tt.collected;
        late += tt.late;
      }
      return {
        expected,
        collected,
        late,
        members: members.length,
        rate: expected ? Math.round(collected / expected * 100) : 0
      };
    }, ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const x = this.totals();
      return [
        {
          label: t("cotisations.kpi.expected"),
          value: `${nf.format(x.expected)} F`,
          sub: t(x.members > 1 ? "cotisations.kpi.expectedSub.autre" : "cotisations.kpi.expectedSub.un", { count: nf.format(x.members) }),
          icon: "account_balance_wallet",
          bg: "",
          fg: ""
        },
        {
          label: t("cotisations.kpi.collected"),
          value: `${nf.format(x.collected)} F`,
          sub: t("cotisations.kpi.collectedSub"),
          icon: "check_circle",
          ...TONE.succes
        },
        {
          label: t("cotisations.kpi.rate"),
          value: `${x.rate} %`,
          sub: t("cotisations.kpi.rateSub"),
          icon: "trending_up",
          ...TONE.info
        },
        {
          label: t("cotisations.kpi.late"),
          value: nf.format(x.late),
          sub: t(x.late === 0 ? "cotisations.kpi.lateSub.zero" : x.late > 1 ? "cotisations.kpi.lateSub.autre" : "cotisations.kpi.lateSub.un"),
          icon: "warning",
          ...x.late ? TONE.erreur : TONE.succes
        }
      ];
    }, ...[]);
    this.rules = computed(() => {
      const s = this.store.state();
      const rules = scopedRules(s.contributionRules, s.session);
      return inScope(s.scoops.filter((c) => !c.archived).map((c) => ({
        ...c,
        scoopId: c.id
      })), s.session).map((c) => c.id).map((scoopId) => {
        var _a2, _b, _c;
        const rule = rules.find((r) => r.scoopId === scoopId);
        return {
          scoopId,
          scoop: (_b = (_a2 = s.scoops.find((c) => c.id === scoopId)) == null ? void 0 : _a2.name) != null ? _b : scoopId,
          summary: rule ? this.ruleSummary(rule) : "",
          confirmed: !!(rule == null ? void 0 : rule.confirmed),
          startYear: (_c = rule == null ? void 0 : rule.startYear) != null ? _c : null
        };
      }).sort((a, b) => Number(!!a.summary) - Number(!!b.summary) || a.scoop.localeCompare(b.scoop));
    }, ...[]);
    this.confirmedRules = computed(() => this.rules().filter((r) => r.confirmed).length, ...[]);
    this.stateButtons = computed(() => {
      const t = this.t();
      const base = this.searched();
      return [{
        id: ALL,
        label: t("cotisations.filter.all"),
        count: base.length
      }, ...STATES.map((st) => ({
        id: st,
        label: t(STATE[st].label),
        count: base.filter((r) => r.dues.state === st).length
      }))];
    }, ...[]);
    this.searched = computed(() => {
      const needle = norm(this.q().trim());
      const org = this.orgFilter();
      return this.rows().filter((r) => (!needle || norm(`${r.name} ${r.scoop} ${r.orgName}`).includes(needle)) && (org === ALL || (org === INDIVIDUAL ? !r.orgId : r.orgId === org)));
    }, ...[]);
    this.orgFilterOptions = computed(() => {
      const rows = this.rows();
      const ids = [...new Set(rows.map((row) => row.orgId).filter(Boolean))];
      const names = new Map(rows.map((row) => [row.orgId, row.orgName]));
      return [
        {
          value: ALL,
          label: this.t()("cotisations.filter.allOrgs"),
          hint: nf.format(rows.length)
        },
        {
          value: INDIVIDUAL,
          label: this.t()("cotisations.filter.individual"),
          hint: nf.format(rows.filter((row) => !row.orgId).length)
        },
        ...ids.map((id) => ({
          value: id,
          label: names.get(id) || id,
          hint: nf.format(rows.filter((row) => row.orgId === id).length)
        })).sort((first, second) => first.label.localeCompare(second.label))
      ];
    }, ...[]);
    this.shown = computed(() => {
      const st = this.state();
      return this.searched().filter((r) => st === ALL || r.dues.state === st);
    }, ...[]);
    this.pager = createPager(() => this.shown());
    this.detail = computed(() => {
      const id = this.detailId();
      const r = id ? this.rows().find((x) => x.member.id === id) : null;
      if (!r) return null;
      const t = this.t();
      const payments = this.store.state().payments.filter((p) => p.memberId === r.member.id).sort((a, b) => b.paidAt.localeCompare(a.paidAt));
      const st = STATE[r.dues.state];
      const lines = [...r.dues.lines].sort((a, b) => b.period.localeCompare(a.period));
      return {
        title: r.name,
        subtitle: [r.member.village, r.scoop].filter(Boolean).join(" \xB7 "),
        icon: "account_balance_wallet",
        badges: [{
          label: t(st.label),
          bg: st.bg,
          fg: st.fg
        }],
        kpis: [
          detailKpi(t("cotisations.sheet.expected"), r.dues.expected, "account_balance_wallet", TONE.info, `${nf.format(r.dues.expected)} F`),
          detailKpi(t("cotisations.sheet.paid"), r.dues.paid, "check_circle", TONE.succes, `${nf.format(r.dues.paid)} F`),
          detailKpi(t("cotisations.sheet.balance"), r.dues.balance, "payments", r.dues.balance ? TONE.erreur : TONE.succes, `${nf.format(r.dues.balance)} F`)
        ],
        facts: [
          detailFact(t("cotisations.col.scoop"), r.scoop, "apartment"),
          detailFact(t("producteurs.col.phone"), this.store.phone(r.member.phone) || null, "call"),
          detailFact(t("cooperatives.fiche.detail.joined"), r.member.joinedAt ? fmtDate(r.member.joinedAt) : null, "calendar_today"),
          detailFact(t("cotisations.detail.rule"), r.rule ? this.ruleSummary(r.rule) : t("cotisations.sheet.noRule"), "gavel", { wide: true })
        ],
        sections: [{
          title: t("cotisations.detail.lines"),
          icon: "event_note",
          count: lines.length || null,
          empty: t("cotisations.sheet.due.none"),
          items: lines.slice(0, 8).map((l) => {
            const left = Math.max(0, l.expected - l.paid);
            return {
              label: l.period,
              sub: t("cotisations.sheet.due.line", {
                paid: nf.format(l.paid),
                expected: nf.format(l.expected)
              }),
              badge: left ? {
                label: t("cotisations.sheet.due.left", { amount: nf.format(left) }),
                ...TONE.erreur
              } : {
                label: t("cotisations.sheet.due.done"),
                ...TONE.succes
              }
            };
          }),
          more: Math.max(0, lines.length - 8)
        }, {
          title: t("cotisations.sheet.history.title"),
          icon: "receipt_long",
          count: payments.length || null,
          empty: t("cotisations.sheet.history.none"),
          items: payments.slice(0, 8).map((p) => ({
            label: `${nf.format(p.amount)} FCFA \xB7 ${t("cotisations.sheet.history.receipt", { receipt: p.receipt })}`,
            sub: `${t("cotisations.sheet.history.period", { period: p.period })} \xB7 ${t(this.methodKey(p.method))} \xB7 ${fmtDate(p.paidAt)}`,
            ...p.voided ? { badge: {
              label: t("cotisations.sheet.history.voidTag"),
              ...TONE.neutre
            } } : p.reversalOf ? { badge: {
              label: t("cotisations.journal.reversalTag"),
              ...TONE.attente
            } } : {}
          })),
          more: Math.max(0, payments.length - 8)
        }],
        link: null
      };
    }, ...[]);
    this.payId = signal(null, ...[]);
    this.payPeriod = signal("", ...[]);
    this.payOther = signal("", ...[]);
    this.payAmount = signal("", ...[]);
    this.payMethod = signal("esp\xE8ces", ...[]);
    this.payNote = signal("", ...[]);
    this.payError = signal("", ...[]);
    this.payDate = signal(today(), ...[]);
    this.payFor = computed(() => {
      var _a2;
      const id = this.payId();
      return id ? (_a2 = this.rows().find((r) => r.member.id === id)) != null ? _a2 : null : null;
    }, ...[]);
    this.periodOptions = computed(() => {
      const r = this.payFor();
      const t = this.t();
      if (!r) return [];
      return [...r.dues.lines.filter((l) => l.expected > l.paid).map((l) => ({
        value: l.period,
        label: t("cotisations.payDialog.periodLeft", {
          period: l.period,
          amount: nf.format(l.expected - l.paid)
        })
      })), {
        value: OTHER,
        label: t("cotisations.payDialog.periodOther")
      }];
    }, ...[]);
    this.aggregator = aggregatorConnected();
    this.payReference = signal("", ...[]);
    this.linkShown = signal(null, ...[]);
    this.linkCopied = signal(false, ...[]);
    this.sharedLink = computed(() => {
      var _a2;
      const shown = this.linkShown();
      if (!shown) return null;
      const origin = "" ;
      const member = this.store.state().members.find((candidate) => candidate.id === shown.link.memberId);
      const url = paymentLinkUrl(shown.link.token, origin);
      const message = paymentLinkMessage({
        name: shown.name,
        scoop: shown.scoop,
        amount: nf.format(shown.link.amount),
        period: shown.link.period,
        url
      });
      const phone = ((_a2 = member == null ? void 0 : member.phone) != null ? _a2 : "").replace(/\D/g, "");
      return {
        ...shown,
        url,
        message,
        whatsapp: `https://wa.me/${phone ? phone.length === 9 ? `221${phone}` : phone : ""}?text=${encodeURIComponent(message)}`,
        sms: `sms:${phone ? `+${phone.length === 9 ? `221${phone}` : phone}` : ""}?body=${encodeURIComponent(message)}`,
        mail: (member == null ? void 0 : member.email) ? `mailto:${member.email}?subject=${encodeURIComponent(this.t()("cotisations.link.mailSubject"))}&body=${encodeURIComponent(message)}` : ""
      };
    }, ...[]);
    this.linkRows = computed(() => {
      const state = this.store.state();
      const session = state.session;
      const names = new Map(state.members.map((member) => [member.id, `${member.firstName} ${member.lastName}`]));
      const now = Date.now();
      return state.paymentLinks.filter((link) => inScope([link], session).length > 0).map((link) => {
        var _a2;
        const status = link.status === "en attente" && Date.parse(link.expiresAt) < now ? "expir\xE9" : link.status;
        const tone = status === "pay\xE9" ? TONE.succes : status === "en attente" ? TONE.info : status === "expir\xE9" ? TONE.attente : TONE.neutre;
        return {
          link,
          name: (_a2 = names.get(link.memberId)) != null ? _a2 : link.memberId,
          live: status === "en attente",
          tone,
          statusKey: `cotisations.link.status.${status}`
        };
      }).sort((first, second) => second.link.createdAt.localeCompare(first.link.createdAt));
    }, ...[]);
    this.enrollOpen = signal(false, ...[]);
    this.enrollScoop = signal("", ...[]);
    this.enrollQuery = signal("", ...[]);
    this.enrollPick = signal("", ...[]);
    this.canEnroll = computed(() => this.store.can("member.manage"), ...[]);
    this.enrollScoops = computed(() => {
      const state = this.store.state();
      return state.scoops.filter((scoop) => !scoop.archived && inScope([{ scoopId: scoop.id }], state.session).length).sort((first, second) => first.name.localeCompare(second.name)).map((scoop) => ({
        value: scoop.id,
        label: scoop.name
      }));
    }, ...[]);
    this.enrollCandidates = computed(() => {
      const state = this.store.state();
      const members = new Set(state.members.filter((member) => member.status !== "sorti").map((member) => member.producerId));
      const needle = norm(this.enrollQuery().trim());
      return state.producers.filter((producer) => producer.scoopId === this.enrollScoop() && !producer.mergedInto && !members.has(producer.id)).filter((producer) => !needle || norm(`${producer.firstName} ${producer.lastName} ${producer.code}`).includes(needle)).map((producer) => {
        var _a2, _b;
        return {
          id: producer.id,
          firstName: producer.firstName,
          lastName: producer.lastName,
          orgName: producer.orgId ? (_b = (_a2 = state.orgs.find((org) => org.id === producer.orgId)) == null ? void 0 : _a2.name) != null ? _b : "" : ""
        };
      }).sort((first, second) => first.lastName.localeCompare(second.lastName)).slice(0, 50);
    }, ...[]);
    this.tab = signal("members", ...[]);
    this.pq = signal("", ...[]);
    this.pMethod = signal("", ...[]);
    this.pStatus = signal("all", ...[]);
    this.payments = computed(() => {
      const s = this.store.state();
      return [...scopedPayments(s.payments, s.session)].sort((a, b) => b.paidAt.localeCompare(a.paidAt));
    }, ...[]);
    this.memberNames = computed(() => new Map(this.store.state().members.map((m) => [m.id, `${m.firstName} ${m.lastName}`])), ...[]);
    this.journalBase = computed(() => {
      const needle = norm(this.pq().trim());
      const method = this.pMethod();
      return this.payments().filter((p) => (!method || p.method === method) && (!needle || norm(`${this.memberName(p.memberId)} ${p.receipt}`).includes(needle)));
    }, ...[]);
    this.payStatusButtons = computed(() => {
      const t = this.t();
      const base = this.journalBase();
      return [
        {
          id: "all",
          label: t("cotisations.journal.status.all"),
          count: base.length
        },
        {
          id: "valid",
          label: t("cotisations.journal.status.valid"),
          count: base.filter((p) => !isCancelled(p)).length
        },
        {
          id: "voided",
          label: t("cotisations.journal.status.voided"),
          count: base.filter(isCancelled).length
        }
      ];
    }, ...[]);
    this.methodOptions = computed(() => [{
      value: "",
      label: this.t()("cotisations.journal.methodAll")
    }, ...PAYMENT_METHODS.map((m) => ({
      value: m,
      label: this.t()(this.methodKey(m))
    }))], ...[]);
    this.journal = computed(() => {
      const st = this.pStatus();
      return this.journalBase().filter((p) => st === "all" || (st === "voided" ? isCancelled(p) : !isCancelled(p)));
    }, ...[]);
    this.journalTotals = computed(() => {
      const valid = this.journal().filter((p) => !isCancelled(p));
      return {
        count: valid.length,
        amount: valid.reduce((n, p) => n + p.amount, 0)
      };
    }, ...[]);
    this.journalPager = createPager(() => this.journal());
    this.receiptId = signal(null, ...[]);
    this.receipt = computed(() => {
      const id = this.receiptId();
      const p = id ? this.store.state().payments.find((x) => x.id === id) : null;
      return p ? {
        p,
        member: this.memberName(p.memberId),
        scoop: this.scoopName(p.scoopId)
      } : null;
    }, ...[]);
    this.voidId = signal(null, ...[]);
    this.voidReason = signal("", ...[]);
    this.voidPay = computed(() => {
      var _a2;
      const id = this.voidId();
      return id ? (_a2 = this.store.state().payments.find((p) => p.id === id)) != null ? _a2 : null : null;
    }, ...[]);
    this.ruleFor = signal(null, ...[]);
    this.rAmount = signal("", ...[]);
    this.rPeriodicity = signal("annuelle", ...[]);
    this.rMonth = signal("03", ...[]);
    this.rDay = signal("31", ...[]);
    this.rYear = signal(String((/* @__PURE__ */ new Date()).getFullYear()), ...[]);
    this.rConfirmed = signal(false, ...[]);
    this.rErr = signal({}, ...[]);
    this.ruleScoop = computed(() => {
      const id = this.ruleFor();
      return id ? {
        id,
        name: this.scoopName(id)
      } : null;
    }, ...[]);
    this.monthOptions = computed(() => Array.from({ length: 12 }, (_, i) => {
      const mm = String(i + 1).padStart(2, "0");
      return {
        value: mm,
        label: this.locale.formatDate(`2000-${mm}-15T12:00:00Z`, { month: "long" })
      };
    }), ...[]);
  }
  pct(d) {
    return d.expected ? Math.min(100, Math.round(d.paid / d.expected * 100)) : 0;
  }
  methodKey(m) {
    return `cotisations.method.${m}`;
  }
  ruleSummary(rule) {
    const amount = nf.format(rule.amount);
    if (rule.periodicity === "mensuelle") return this.t()("cotisations.rule.summary.mensuelle", { amount });
    const date = this.locale.formatDate(`2000-${rule.dueDate}T12:00:00Z`, {
      day: "numeric",
      month: "long"
    });
    return this.t()("cotisations.rule.summary.annuelle", {
      amount,
      date
    });
  }
  /** Crée le lien depuis le formulaire de paiement (période et montant choisis) et l'affiche. */
  submitLink() {
    const target = this.payFor();
    if (!target) return;
    const amount = Number(this.payAmount());
    if (!amount || amount <= 0) {
      this.payError.set(this.t()("cotisations.ruleDialog.invalidAmount"));
      return;
    }
    const period = this.payPeriod() === OTHER ? this.payOther().trim() : this.payPeriod();
    const result = actions.createPaymentLink({
      memberId: target.member.id,
      amount,
      period
    });
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.payId.set(null);
    this.openLink(this.store.state().paymentLinks.find((link) => link.id === result.id));
  }
  openLink(link) {
    var _a2, _b;
    const member = this.store.state().members.find((candidate) => candidate.id === link.memberId);
    const scoop = (_b = (_a2 = this.store.state().scoops.find((candidate) => candidate.id === link.scoopId)) == null ? void 0 : _a2.name) != null ? _b : "";
    this.linkCopied.set(false);
    this.linkShown.set({
      link,
      name: member ? `${member.firstName} ${member.lastName}` : "",
      scoop
    });
  }
  async copyLink(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      this.snackbar.error(this.t()("cotisations.link.copyFailed"));
      return;
    }
    this.linkCopied.set(true);
    this.snackbar.success(this.t()("cotisations.link.copiedToast"));
    setTimeout(() => this.linkCopied.set(false), 2500);
  }
  cancelLink(link) {
    const result = actions.cancelPaymentLink(link.id);
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.t()("cotisations.link.cancelled"));
  }
  openEnroll() {
    var _a2, _b;
    this.enrollScoop.set((_b = (_a2 = this.enrollScoops()[0]) == null ? void 0 : _a2.value) != null ? _b : "");
    this.enrollQuery.set("");
    this.enrollPick.set("");
    this.enrollOpen.set(true);
  }
  submitEnroll() {
    const result = actions.enrollProducerAsMember(this.enrollPick());
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.enrollOpen.set(false);
    this.snackbar.success(this.t()("cotisations.enroll.done"));
  }
  openPay(memberId) {
    var _a2, _b;
    this.payReference.set("");
    this.payId.set(memberId);
    this.payOther.set("");
    this.payNote.set("");
    this.payMethod.set("esp\xE8ces");
    this.payError.set("");
    this.payDate.set(today());
    this.choosePeriod((_b = (_a2 = this.periodOptions()[0]) == null ? void 0 : _a2.value) != null ? _b : OTHER);
  }
  choosePeriod(period) {
    this.payPeriod.set(period);
    const r = this.payFor();
    const line = r == null ? void 0 : r.dues.lines.find((l) => l.period === period);
    this.payAmount.set(line ? String(line.expected - line.paid) : (r == null ? void 0 : r.rule) ? String(r.rule.amount) : "");
  }
  submitPay() {
    const r = this.payFor();
    if (!r) return;
    const amount = Number(this.payAmount());
    if (!amount || amount <= 0) {
      this.payError.set(this.t()("cotisations.ruleDialog.invalidAmount"));
      return;
    }
    const period = this.payPeriod() === OTHER ? this.payOther().trim() : this.payPeriod();
    const day = this.payDate();
    const res = actions.recordPayment({
      memberId: r.member.id,
      amount,
      period,
      method: this.payMethod(),
      note: this.payNote(),
      ...this.payMethod() !== "esp\xE8ces" && this.payReference().trim() ? { reference: this.payReference().trim() } : {},
      ...day && day !== today() ? { paidAt: `${day}T12:00:00.000Z` } : {}
    });
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error));
      return;
    }
    this.payId.set(null);
    this.receiptId.set(res.id);
    this.snackbar.success(`${this.t()("cotisations.payDialog.toast", { receipt: res.receipt })} \xB7 ${this.t()("cotisations.payDialog.toastDetail", {
      name: r.name,
      amount: nf.format(amount),
      period
    })}`);
  }
  memberName(id) {
    var _a2;
    return (_a2 = this.memberNames().get(id)) != null ? _a2 : id;
  }
  scoopName(id) {
    var _a2, _b;
    return (_b = (_a2 = this.store.state().scoops.find((c) => c.id === id)) == null ? void 0 : _a2.name) != null ? _b : id;
  }
  /** Ouvre une page d'impression du reçu (le navigateur propose aussi « Enregistrer en PDF »). */
  printReceipt(rc) {
    const t = this.t();
    const esc = (v) => v.replace(/[&<>"]/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    })[c]);
    const row = (label, value) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
    const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc(t("cotisations.receipt.number", { receipt: rc.p.receipt }))}</title>
<style>
  body{font-family:"Plus Jakarta Sans",system-ui,sans-serif;color:#0E1A14;margin:40px;}
  .card{max-width:560px;margin:auto;border:2px solid #0F3D2A;border-radius:20px;padding:28px;}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .brand{font-weight:800;color:#0F3D2A;font-size:20px}.sub{color:#5B6660;font-size:13px}
  .no{background:#0F3D2A;color:#C6F05A;border-radius:10px;padding:6px 12px;font-family:monospace;font-weight:700}
  h1{font-size:22px;margin:22px 0 4px}.amount{margin:18px 0;padding:18px;border-radius:16px;background:#EEF3E4;text-align:center;font-size:34px;font-weight:800;color:#2E7D32}
  dl{display:grid;grid-template-columns:1fr 1fr;gap:12px 20px;margin:0}dt{font-size:12px;color:#5B6660}dd{margin:2px 0 0;font-weight:800}
  .void{margin-top:16px;padding:12px;border-radius:12px;background:#FFE0E0;color:#B3261E;font-weight:700}
  .sign{margin-top:36px;display:flex;justify-content:flex-end}.sign div{width:220px;border-top:1px solid #B9C0BB;padding-top:6px;text-align:center;font-size:12px;color:#5B6660}
  .foot{margin-top:24px;font-size:11px;color:#5B6660;text-align:center}
  ${rc.p.voided ? ".amount{background:#E6E2D6;color:#5B6660;text-decoration:line-through}" : ""}
</style></head><body><div class="card">
<div class="top"><div><div class="brand">Mbay Diaay</div><div class="sub">${esc(rc.scoop)}</div></div><span class="no">${esc(rc.p.receipt)}</span></div>
<h1>${esc(t("cotisations.receipt.title"))}</h1>
<div class="amount">${esc(nf.format(rc.p.amount))} FCFA</div>
<dl>${row(t("cotisations.receipt.from"), rc.member)}${row(t("cotisations.receipt.period"), rc.p.period)}${row(t("cotisations.receipt.date"), fmtDate(rc.p.paidAt))}${row(t("cotisations.receipt.method"), t(this.methodKey(rc.p.method)))}${row(t("cotisations.receipt.by"), rc.p.recordedBy)}${rc.p.note ? row(t("cotisations.receipt.note"), rc.p.note) : ""}</dl>
${rc.p.voided ? `<div class="void">${esc(t("cotisations.receipt.voided", {
      date: fmtDate(rc.p.voided.at),
      name: rc.p.voided.by
    }))} \xB7 ${esc(rc.p.voided.reason)}</div>` : ""}
<div class="sign"><div>${esc(t("cotisations.receipt.signature"))}</div></div>
<p class="foot">${esc(t("cotisations.receipt.footer"))}</p>
</div><script>window.onload=()=>{window.print();}<\/script></body></html>`;
    const w = window.open("", "_blank", "width=720,height=900");
    if (!w) {
      this.snackbar.error(this.t()("common.exportError"));
      return;
    }
    w.document.write(html);
    w.document.close();
  }
  openVoid(id) {
    this.receiptId.set(null);
    this.voidReason.set("");
    this.voidId.set(id);
  }
  submitVoid(id) {
    var _a2;
    const pay = this.voidPay();
    const res = actions.voidPayment(id, this.voidReason());
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error));
      return;
    }
    this.voidId.set(null);
    this.snackbar.success(`${this.t()("cotisations.voidDialog.done")} \xB7 ${this.t()("cotisations.voidDialog.doneDetail", { receipt: (_a2 = pay == null ? void 0 : pay.receipt) != null ? _a2 : "" })}`);
  }
  openRule(scoopId) {
    var _a2, _b, _c, _d;
    const s = this.store.state();
    const rule = scopedRules(s.contributionRules, s.session).find((r) => r.scoopId === scoopId);
    this.rAmount.set(rule ? String(rule.amount) : "");
    this.rPeriodicity.set((_a2 = rule == null ? void 0 : rule.periodicity) != null ? _a2 : "annuelle");
    const [mm, dd] = ((_b = rule == null ? void 0 : rule.dueDate) != null ? _b : "03-31").split("-");
    this.rMonth.set(mm != null ? mm : "03");
    this.rDay.set(String(Number(dd != null ? dd : "31")));
    this.rYear.set(String((_c = rule == null ? void 0 : rule.startYear) != null ? _c : (/* @__PURE__ */ new Date()).getFullYear()));
    this.rConfirmed.set((_d = rule == null ? void 0 : rule.confirmed) != null ? _d : false);
    this.rErr.set({});
    this.ruleFor.set(scoopId);
  }
  submitRule(scoopId) {
    const t = this.t();
    const amount = Number(this.rAmount());
    const day = Number(this.rDay());
    const year = Number(this.rYear());
    const err = {};
    if (!(amount > 0)) err.amount = t("cotisations.ruleDialog.invalidAmount");
    if (this.rPeriodicity() === "annuelle" && !(Number.isInteger(day) && day >= 1 && day <= 31)) err.day = t("cotisations.ruleDialog.invalidDay");
    if (!/^\d{4}$/.test(this.rYear().trim())) err.year = t("cotisations.ruleDialog.invalidYear");
    this.rErr.set(err);
    if (Object.keys(err).length) return;
    const res = actions.setContributionRule(scoopId, {
      amount,
      periodicity: this.rPeriodicity(),
      dueDate: this.rPeriodicity() === "annuelle" ? `${this.rMonth()}-${String(day).padStart(2, "0")}` : "12-31",
      startYear: year,
      confirmed: this.rConfirmed()
    });
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error));
      return;
    }
    this.ruleFor.set(null);
    this.snackbar.success(t("cotisations.ruleDialog.saved"));
  }
  exportCsv() {
    const rows = this.shown();
    try {
      downloadCsv("cotisations.csv", [[
        "Membre",
        "Coop\xE9rative",
        "\xC9tat",
        "Attendu (FCFA)",
        "Pay\xE9 (FCFA)",
        "Reste (FCFA)"
      ], ...rows.map((r) => [
        r.name,
        r.scoop,
        r.dues.state,
        r.dues.expected,
        r.dues.paid,
        r.dues.balance
      ])]);
    } catch {
      this.snackbar.error(this.t()("common.exportError"));
      return;
    }
    actions.audit("Export cotisations", "Cotisations", `${rows.length} lignes (CSV)`);
    this.snackbar.success(`${this.t()("cotisations.exported")} \xB7 ${this.t()(rows.length > 1 ? "cotisations.exportedCount.autre" : "cotisations.exportedCount.un", { count: nf.format(rows.length) })}`);
  }
}, _a.\u0275fac = function CotisationsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-cotisations-page"]],
  decls: 60,
  vars: 62,
  consts: [
    [
      "perm",
      "contribution.read",
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
      1,
      "flex",
      "flex-wrap",
      "gap-3"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-primary"
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
      "name",
      "csv",
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
      "role",
      "tablist",
      1,
      "seg",
      "tabs",
      "mt-6"
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
      "group",
      3,
      "size"
    ],
    [1, "n"],
    [
      "name",
      "receipt_long",
      3,
      "size"
    ],
    [
      "name",
      "gavel",
      3,
      "size"
    ],
    [
      "name",
      "link",
      3,
      "size"
    ],
    [
      3,
      "closed",
      "view"
    ],
    [
      "icon",
      "payments",
      3,
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      "icon",
      "link",
      "tone",
      "brand",
      3,
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
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
      "space-y-4",
      "pb-6"
    ],
    [
      "leadingIcon",
      "apartment",
      3,
      "label",
      "options",
      "value"
    ],
    [
      "icon",
      "search",
      3,
      "valueChange",
      "label",
      "value"
    ],
    [1, "people"],
    [
      1,
      "rounded-[16px]",
      "px-4",
      "py-3",
      "text-[13px]",
      "font-medium",
      2,
      "background",
      "var(--v2-creme)",
      "color",
      "var(--v2-gris-texte)"
    ],
    [1, "sub"],
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
      "icon",
      "receipt_long",
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
      "close",
      3,
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      "icon",
      "gavel",
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
      1,
      "btn",
      "btn-primary",
      3,
      "click"
    ],
    [
      "name",
      "person_add",
      3,
      "size"
    ],
    [
      1,
      "notice",
      "mt-6"
    ],
    [
      "name",
      "info",
      3,
      "size"
    ],
    [
      1,
      "card",
      "mt-4",
      "overflow-hidden"
    ],
    [1, "overflow-x-auto"],
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
      1,
      "tbl",
      "min-w-[860px]"
    ],
    [1, "text-right"],
    [1, "font-bold"],
    [1, "tabular-nums"],
    [
      1,
      "text-right",
      "font-extrabold",
      "tabular-nums"
    ],
    [1, "badge"],
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
      "content_copy",
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
      "title"
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
      "type",
      "button",
      "role",
      "radio",
      3,
      "click"
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
    [
      1,
      "tbl",
      "min-w-[980px]"
    ],
    [1, "w-[220px]"],
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
      "max-w-48",
      "truncate",
      "font-medium",
      3,
      "title"
    ],
    [
      1,
      "whitespace-nowrap",
      "text-right",
      "font-extrabold",
      "tabular-nums"
    ],
    [
      "type",
      "button",
      1,
      "act",
      3,
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
      "block",
      "text-[13px]",
      "font-bold",
      "tabular-nums"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "meter",
      "mt-1.5"
    ],
    [
      "name",
      "payments",
      3,
      "size"
    ],
    [
      "name",
      "account_balance_wallet",
      3,
      "size"
    ],
    [
      1,
      "toolbar",
      "card",
      "mt-4"
    ],
    [
      "variant",
      "compact",
      "leadingIcon",
      "payments",
      1,
      "min-w-[200px]",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      1,
      "tbl",
      "min-w-[920px]"
    ],
    [
      1,
      "row-link",
      3,
      "voided"
    ],
    [
      1,
      "whitespace-nowrap",
      "font-medium",
      "tabular-nums"
    ],
    [1, "receipt-no"],
    [
      1,
      "block",
      "max-w-52",
      "truncate",
      "font-bold"
    ],
    [
      1,
      "sub",
      "block",
      "max-w-52",
      "truncate"
    ],
    [
      1,
      "font-semibold",
      "tabular-nums"
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
      "var(--v2-creme)",
      "color",
      "var(--v2-ardoise)"
    ],
    [1, "font-medium"],
    [1, "block"],
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
      "rules",
      "mt-4"
    ],
    [
      1,
      "card",
      "sub",
      "mt-4",
      "p-6"
    ],
    [
      1,
      "rule",
      "card"
    ],
    [
      1,
      "flex",
      "items-start",
      "gap-3"
    ],
    [
      1,
      "grid",
      "size-10",
      "shrink-0",
      "place-items-center",
      "rounded-[12px]"
    ],
    [
      1,
      "min-w-0",
      "flex-1"
    ],
    [
      1,
      "truncate",
      "text-[15px]",
      "font-extrabold",
      3,
      "title"
    ],
    [
      1,
      "mt-4",
      "flex",
      "flex-wrap",
      "items-center",
      "justify-between",
      "gap-2"
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
      "badge",
      2,
      "background",
      "var(--v2-erreur-bg)",
      "color",
      "var(--v2-erreur-fg)"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      2,
      "height",
      "40px"
    ],
    [
      1,
      "mt-1",
      "text-[13px]",
      "font-semibold",
      2,
      "color",
      "var(--v2-ardoise)"
    ],
    [
      1,
      "sub",
      "mt-0.5"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      2,
      "height",
      "40px",
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
      "icon",
      "payments",
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
      "pb-4"
    ],
    [1, "lbl"],
    [
      "leadingIcon",
      "calendar_today",
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
      "preset",
      "period",
      3,
      "placeholder",
      "label",
      "hint",
      "value"
    ],
    [
      "preset",
      "amount",
      3,
      "valueChange",
      "label",
      "hint",
      "value",
      "error"
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
      "icon",
      "receipt_long",
      3,
      "label",
      "optional",
      "hint",
      "value"
    ],
    [
      "type",
      "date",
      "icon",
      "calendar_today",
      3,
      "valueChange",
      "label",
      "hint",
      "value"
    ],
    [
      "preset",
      "note",
      3,
      "valueChange",
      "label",
      "value"
    ],
    [
      1,
      "sub",
      "flex",
      "items-center",
      "gap-2"
    ],
    [
      "name",
      "fact_check",
      3,
      "size"
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
      "preset",
      "period",
      3,
      "valueChange",
      "placeholder",
      "label",
      "hint",
      "value"
    ],
    [
      "icon",
      "receipt_long",
      3,
      "valueChange",
      "label",
      "optional",
      "hint",
      "value"
    ],
    [
      "icon",
      "link",
      "tone",
      "brand",
      3,
      "closed",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [1, "rc-grid"],
    [
      1,
      "break-all",
      "rounded-[14px]",
      "px-4",
      "py-3",
      "text-[14px]",
      "font-bold",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-foret)",
      "user-select",
      "all"
    ],
    [
      1,
      "grid",
      "gap-3",
      "sm:grid-cols-2"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-primary",
      "justify-center",
      3,
      "click"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      "justify-center",
      3,
      "click"
    ],
    [
      "name",
      "description",
      3,
      "size"
    ],
    [
      "target",
      "_blank",
      "rel",
      "noopener noreferrer",
      1,
      "btn",
      "btn-ghost",
      "justify-center",
      3,
      "href"
    ],
    [
      "name",
      "public",
      3,
      "size"
    ],
    [
      1,
      "btn",
      "btn-ghost",
      "justify-center",
      3,
      "href"
    ],
    [
      "name",
      "call",
      3,
      "size"
    ],
    [
      1,
      "btn",
      "btn-ghost",
      "justify-center",
      "sm:col-span-2",
      3,
      "href"
    ],
    [1, "notice"],
    [
      "name",
      "mail",
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
    [1, "person"],
    [
      "type",
      "radio",
      "name",
      "enroll",
      3,
      "change",
      "checked"
    ],
    [
      1,
      "min-w-0",
      "flex-1",
      "truncate"
    ],
    [
      1,
      "sub",
      "shrink-0"
    ],
    [
      "icon",
      "receipt_long",
      3,
      "closed",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [1, "receipt"],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "gap-3"
    ],
    [
      1,
      "mt-5",
      "rounded-[18px]",
      "p-5",
      "text-center"
    ],
    [
      1,
      "mt-1",
      "text-[36px]",
      "font-extrabold",
      "leading-none",
      "tracking-[-0.03em]",
      "tabular-nums"
    ],
    [
      1,
      "rc-grid",
      "mt-5"
    ],
    [
      1,
      "mt-4",
      "rounded-[14px]",
      "px-4",
      "py-3",
      "text-[13px]",
      "font-bold",
      2,
      "background",
      "var(--v2-erreur-bg)",
      "color",
      "var(--v2-erreur-fg)"
    ],
    [
      1,
      "sub",
      "mt-5",
      "border-t",
      "pt-4",
      "text-center",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "h-4"
    ],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      2,
      "color",
      "var(--v2-erreur-fg)"
    ],
    [
      "name",
      "download",
      3,
      "size"
    ],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      2,
      "color",
      "var(--v2-erreur-fg)",
      3,
      "click"
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
    [
      1,
      "mb-4",
      "rounded-[16px]",
      "px-4",
      "py-3",
      "text-[14px]",
      "font-bold",
      2,
      "background",
      "var(--v2-creme)"
    ],
    [
      "for",
      "void-reason",
      1,
      "lbl"
    ],
    [
      "id",
      "void-reason",
      "rows",
      "3",
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
      "sub",
      "mb-4",
      "mt-1.5"
    ],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      2,
      "background",
      "var(--v2-erreur-fg)",
      "color",
      "var(--v2-blanc)",
      3,
      "click",
      "disabled"
    ],
    [
      "icon",
      "gavel",
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
      "pb-5"
    ],
    [
      1,
      "sub",
      "rounded-[14px]",
      "px-4",
      "py-3",
      2,
      "background",
      "var(--v2-creme)"
    ],
    [
      "preset",
      "period",
      3,
      "valueChange",
      "label",
      "maxlength",
      "value",
      "error"
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
      1,
      "sub",
      "block"
    ],
    [
      1,
      "mt-2",
      "grid",
      "gap-3",
      "sm:grid-cols-[1fr_140px]"
    ],
    [
      "leadingIcon",
      "calendar_month",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      "type",
      "number",
      "inputmode",
      "numeric",
      "placeholder",
      "31",
      3,
      "valueChange",
      "label",
      "maxlength",
      "value",
      "error"
    ],
    [
      1,
      "sub",
      "mt-1.5"
    ]
  ],
  template: function CotisationsPage_Template(rf, ctx) {
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
      __elementStart(9, "div", 6);
      __conditionalCreate(10, CotisationsPage_Conditional_10_Template, 4, 2, "button", 7);
      __elementStart(11, "button", 8);
      __listener("click", function CotisationsPage_Template_button_click_11_listener() {
        return ctx.exportCsv();
      });
      __element(12, "ui-icon", 9);
      __text(13);
      __elementEnd()()();
      __element(14, "ui-stat-cards", 10);
      __elementStart(15, "div", 11)(16, "button", 12);
      __listener("click", function CotisationsPage_Template_button_click_16_listener() {
        return ctx.tab.set("members");
      });
      __element(17, "ui-icon", 13);
      __text(18);
      __elementStart(19, "span", 14);
      __text(20);
      __elementEnd()();
      __elementStart(21, "button", 12);
      __listener("click", function CotisationsPage_Template_button_click_21_listener() {
        return ctx.tab.set("payments");
      });
      __element(22, "ui-icon", 15);
      __text(23);
      __elementStart(24, "span", 14);
      __text(25);
      __elementEnd()();
      __elementStart(26, "button", 12);
      __listener("click", function CotisationsPage_Template_button_click_26_listener() {
        return ctx.tab.set("rules");
      });
      __element(27, "ui-icon", 16);
      __text(28);
      __elementStart(29, "span", 14);
      __text(30);
      __elementEnd()();
      __elementStart(31, "button", 12);
      __listener("click", function CotisationsPage_Template_button_click_31_listener() {
        return ctx.tab.set("links");
      });
      __element(32, "ui-icon", 17);
      __text(33);
      __elementStart(34, "span", 14);
      __text(35);
      __elementEnd()()();
      __conditionalCreate(36, CotisationsPage_Conditional_36_Template, 6, 3);
      __conditionalCreate(37, CotisationsPage_Conditional_37_Template, 13, 11);
      __conditionalCreate(38, CotisationsPage_Conditional_38_Template, 13, 13);
      __conditionalCreate(39, CotisationsPage_Conditional_39_Template, 2, 1);
      __elementStart(40, "ui-detail-modal", 18);
      __listener("closed", function CotisationsPage_Template_ui_detail_modal_closed_40_listener() {
        return ctx.detailId.set(null);
      });
      __elementEnd();
      __conditionalCreate(41, CotisationsPage_Conditional_41_Template, 29, 31, "ui-modal", 19);
      __conditionalCreate(42, CotisationsPage_Conditional_42_Template, 41, 29, "ui-modal", 20);
      __elementStart(43, "ui-modal", 21);
      __listener("closed", function CotisationsPage_Template_ui_modal_closed_43_listener() {
        return ctx.enrollOpen.set(false);
      });
      __elementStart(44, "div", 22);
      __conditionalCreate(45, CotisationsPage_Conditional_45_Template, 1, 3, "ui-select", 23);
      __elementStart(46, "ui-text-field", 24);
      __listener("valueChange", function CotisationsPage_Template_ui_text_field_valueChange_46_listener($event) {
        return ctx.enrollQuery.set($event);
      });
      __elementEnd();
      __conditionalCreate(47, CotisationsPage_Conditional_47_Template, 3, 1, "ul", 25)(48, CotisationsPage_Conditional_48_Template, 2, 1, "p", 26);
      __elementStart(49, "p", 27);
      __text(50);
      __elementEnd()();
      __elementStart(51, "button", 28);
      __listener("click", function CotisationsPage_Template_button_click_51_listener() {
        return ctx.enrollOpen.set(false);
      });
      __text(52);
      __elementEnd();
      __elementStart(53, "button", 29);
      __listener("click", function CotisationsPage_Template_button_click_53_listener() {
        return ctx.submitEnroll();
      });
      __text(54);
      __elementStart(55, "span", 30);
      __element(56, "ui-icon", 31);
      __elementEnd()()();
      __conditionalCreate(57, CotisationsPage_Conditional_57_Template, 52, 37, "ui-modal", 32);
      __conditionalCreate(58, CotisationsPage_Conditional_58_Template, 12, 18, "ui-modal", 33);
      __conditionalCreate(59, CotisationsPage_Conditional_59_Template, 26, 32, "ui-modal", 34);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_37_0;
      let tmp_38_0;
      let tmp_53_0;
      let tmp_54_0;
      let tmp_55_0;
      __property("area", ctx.t()("cotisations.area"));
      __advance(4);
      __textInterpolate(ctx.t()("cotisations.eyebrow"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("cotisations.title"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("cotisations.description"), " ");
      __advance(2);
      __conditional(ctx.canEnroll() ? 10 : -1);
      __advance();
      __property("disabled", !ctx.shown().length);
      __advance();
      __property("size", 22);
      __advance();
      __textInterpolate1("", ctx.t()("cotisations.export"), " ");
      __advance();
      __property("stats", ctx.stats());
      __advance();
      __attribute("aria-label", ctx.t()("cotisations.tab.aria"));
      __advance();
      __classProp("on", ctx.tab() === "members");
      __attribute("aria-selected", ctx.tab() === "members");
      __advance();
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("cotisations.tab.members"));
      __advance(2);
      __textInterpolate(ctx.nf.format(ctx.rows().length));
      __advance();
      __classProp("on", ctx.tab() === "payments");
      __attribute("aria-selected", ctx.tab() === "payments");
      __advance();
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("cotisations.tab.payments"));
      __advance(2);
      __textInterpolate(ctx.nf.format(ctx.payments().length));
      __advance();
      __classProp("on", ctx.tab() === "rules");
      __attribute("aria-selected", ctx.tab() === "rules");
      __advance();
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("cotisations.tab.rules"));
      __advance();
      __classProp("zero", !ctx.rules().length);
      __advance();
      __textInterpolate(ctx.rules().length);
      __advance();
      __classProp("on", ctx.tab() === "links");
      __attribute("aria-selected", ctx.tab() === "links");
      __advance();
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("cotisations.tab.links"));
      __advance();
      __classProp("zero", !ctx.linkRows().length);
      __advance();
      __textInterpolate(ctx.linkRows().length);
      __advance();
      __conditional(ctx.tab() === "links" ? 36 : -1);
      __advance();
      __conditional(ctx.tab() === "members" ? 37 : -1);
      __advance();
      __conditional(ctx.tab() === "payments" ? 38 : -1);
      __advance();
      __conditional(ctx.tab() === "rules" ? 39 : -1);
      __advance();
      __property("view", ctx.detail());
      __advance();
      __conditional((tmp_37_0 = ctx.payFor()) ? 41 : -1, tmp_37_0);
      __advance();
      __conditional((tmp_38_0 = ctx.sharedLink()) ? 42 : -1, tmp_38_0);
      __advance();
      __property("open", ctx.enrollOpen())("title", ctx.t()("cotisations.enroll.title"))("description", ctx.t()("cotisations.enroll.description"))("width", 640)("closeLabel", ctx.t()("common.close"));
      __advance(2);
      __conditional(ctx.enrollScoops().length > 1 ? 45 : -1);
      __advance();
      __property("label", ctx.t()("cotisations.enroll.search"))("value", ctx.enrollQuery());
      __advance();
      __conditional(ctx.enrollCandidates().length ? 47 : 48);
      __advance(3);
      __textInterpolate(ctx.t()("cotisations.enroll.rule"));
      __advance(2);
      __textInterpolate(ctx.t()("cotisations.cancel"));
      __advance();
      __property("disabled", !ctx.enrollPick());
      __advance();
      __textInterpolate1(" ", ctx.t()("cotisations.enroll.submit"));
      __advance(2);
      __property("size", 18);
      __advance();
      __conditional((tmp_53_0 = ctx.receipt()) ? 57 : -1, tmp_53_0);
      __advance();
      __conditional((tmp_54_0 = ctx.voidPay()) ? 58 : -1, tmp_54_0);
      __advance();
      __conditional((tmp_55_0 = ctx.ruleScoop()) ? 59 : -1, tmp_55_0);
    }
  },
  dependencies: [
    AppShellComponent,
    DetailModalComponent,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    SelectComponent,
    StatCardsComponent,
    TextFieldComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".meter[_ngcontent-%COMP%] {\n        display: block;\n        height: 6px;\n        width: 100%;\n        overflow: hidden;\n        border-radius: 999px;\n        background: var(--%NS%v2-lin);\n      }\n      .meter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n        display: block;\n        height: 100%;\n        border-radius: 999px;\n        transition: width 0.4s cubic-bezier(0.32, 0.72, 0, 1);\n      }\n      .rules[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n        gap: 10px;\n      }\n      .rule[_ngcontent-%COMP%] {\n        border-radius: 18px;\n        border: 1px solid var(--%NS%v2-bord-carte);\n        padding: 14px 16px;\n      }\n      .tabs[_ngcontent-%COMP%] {\n        width: fit-content;\n        max-width: 100%;\n      }\n      .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n        padding: 11px 16px;\n        font-size: 15px;\n      }\n      .receipt-no[_ngcontent-%COMP%] {\n        border-radius: 10px;\n        background: var(--%NS%v2-foret);\n        padding: 4px 10px;\n        font-family: var(--%NS%v2-font-mono);\n        font-size: 12px;\n        font-weight: 700;\n        color: var(--%NS%v2-citron);\n        white-space: nowrap;\n      }\n      tr.voided[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n        color: var(--%NS%v2-gris-texte);\n      }\n      tr.voided[_ngcontent-%COMP%]   .receipt-no[_ngcontent-%COMP%] {\n        background: var(--%NS%v2-lin);\n        color: var(--%NS%v2-gris-texte);\n        text-decoration: line-through;\n      }\n      .act-danger[_ngcontent-%COMP%]:hover {\n        border-color: var(--%NS%v2-erreur-fg);\n        background: var(--%NS%v2-erreur-bg);\n        color: var(--%NS%v2-erreur-fg);\n      }\n      .rc-grid[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n        gap: 14px 20px;\n      }\n      .rc-grid[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n        font-size: 12px;\n        font-weight: 600;\n        color: var(--%NS%v2-gris-texte);\n      }\n      .rc-grid[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n        margin-top: 2px;\n        font-size: 15px;\n        font-weight: 800;\n      }\n      .area[_ngcontent-%COMP%] {\n        width: 100%;\n        border-radius: 16px;\n        border: 1.5px solid var(--%NS%v2-gris-trait);\n        background: var(--%NS%v2-blanc);\n        padding: 12px 16px;\n        font-size: 15px;\n        font-weight: 600;\n        color: var(--%NS%v2-encre);\n      }\n      .area[_ngcontent-%COMP%]:focus-visible {\n        outline: none;\n        border: 2px solid var(--%NS%v2-foret);\n        box-shadow: var(--%NS%v2-halo);\n      }\n      .check[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        gap: 10px;\n        font-size: 14px;\n        font-weight: 600;\n        cursor: pointer;\n      }\n      .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n        margin-top: 2px;\n        height: 20px;\n        width: 20px;\n        accent-color: var(--%NS%v2-foret);\n        cursor: pointer;\n      }\n      .lbl[_ngcontent-%COMP%] {\n        font-size: 12px;\n        font-weight: 700;\n        letter-spacing: 0.06em;\n        text-transform: uppercase;\n        color: var(--%NS%v2-ardoise);\n      }\n      .seg-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n        flex: 1;\n        justify-content: center;\n      }"]
}), _a);

export { CotisationsPage as default };
//# sourceMappingURL=cotisations.page-DjO3kOA8.mjs.map

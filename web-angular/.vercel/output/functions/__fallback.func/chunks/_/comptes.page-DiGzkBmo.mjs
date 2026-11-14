import { i as inject, R as Router, A as ActivatedRoute, F as signal, c as computed, ɵ as __defineComponent, d as RouterLink, f as __elementStart, b as __element, m as __repeaterCreate, h as __elementEnd, G as __controlCreate, H as __listener, j as __conditionalCreate, g as __text, n as __property, o as __advance, v as __repeater, u as __attribute, J as __control, s as __conditional, L as __getCurrentView, w as __nextContext, z as __classProp, p as __textInterpolate, q as __textInterpolate1, N as __textInterpolate2, r as __pureFunction1, T as __textInterpolate3, U as __textInterpolate4, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { P as PaginationComponent, F as FormsModule, h as NgSelectOption, ɵ as _NgSelectMultipleOption, D as DefaultValueAccessor, i as SelectControlValueAccessor, N as NgControlStatus, a as NgModel, j as UiButtonComponent, c as UiPageHeaderComponent, d as UiPillComponent } from './ui-DDO8FoUF.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { g as Users, h as Sparkles, i as UserRoundSearch, d as Search, j as Link2, e as LucideAngularModule, f as LucideAngularComponent } from './lucide-angular-RJABeBQ2.mjs';
import { L as LocaleService, f as fmtDateTime, p as maskPhone, i as inScope, o as actions } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
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
import './snackbar.component-sjBBVJT0.mjs';
import 'clsx';
import 'tailwind-merge';
import 'date-fns';
import 'date-fns/locale';

var _a;
var _c0 = (a0) => ["/dashboard/producteurs", a0];
var _c1 = (a0) => ({ n: a0 });
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function ComptesPage_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 9);
    __listener("click", function ComptesPage_For_4_Template_button_click_0_listener() {
      const viewOption_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.setVue(viewOption_r2.key));
    });
    __element(1, "lucide-angular", 10);
    __elementStart(2, "span", 11);
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 12);
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const viewOption_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __classProp("bg-card", ctx_r2.vue() === viewOption_r2.key)("shadow-sm", ctx_r2.vue() === viewOption_r2.key);
    __advance();
    __property("img", viewOption_r2.icon);
    __advance(2);
    __textInterpolate(viewOption_r2.label);
    __advance(2);
    __textInterpolate(viewOption_r2.count);
  }
}
function ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ui-pill", 30);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(4);
    __advance();
    __textInterpolate(ctx_r2.t()("comptes.state.active"));
  }
}
function ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ui-pill", 31);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(4);
    __advance();
    __textInterpolate(ctx_r2.t()("comptes.state.inactive"));
  }
}
function ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_16_For_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "option", 38);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const hit_r5 = ctx.$implicit;
    __property("ngValue", hit_r5.id);
    __advance();
    __textInterpolate4(" ", hit_r5.code, " \xB7 ", hit_r5.firstName, " ", hit_r5.lastName, " \u2014 ", hit_r5.village, " ");
  }
}
function ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "div", 33)(1, "input", 35);
    __controlCreate();
    __listener("ngModelChange", function ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_16_Template_input_ngModelChange_1_listener($event) {
      __restoreView(_r4);
      const ctx_r2 = __nextContext(4);
      return __resetView(ctx_r2.pickerQ.set($event));
    });
    __elementEnd();
    __elementStart(2, "select", 36);
    __controlCreate();
    __listener("ngModelChange", function ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_16_Template_select_ngModelChange_2_listener($event) {
      __restoreView(_r4);
      const ctx_r2 = __nextContext(4);
      return __resetView(ctx_r2.pickerProducerId.set($event));
    });
    __elementStart(3, "option", 37);
    __text(4, "\u2014");
    __elementEnd();
    __repeaterCreate(5, ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_16_For_6_Template, 2, 5, "option", 38, _forTrack1);
    __elementEnd();
    __elementStart(7, "ui-button", 39);
    __listener("click", function ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_16_Template_ui_button_click_7_listener() {
      __restoreView(_r4);
      const account_r6 = __nextContext().$implicit;
      const ctx_r2 = __nextContext(3);
      return __resetView(ctx_r2.applyManualLink(account_r6));
    });
    __text(8);
    __elementEnd();
    __elementStart(9, "ui-button", 40);
    __listener("click", function ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_16_Template_ui_button_click_9_listener() {
      __restoreView(_r4);
      const ctx_r2 = __nextContext(4);
      return __resetView(ctx_r2.closePicker());
    });
    __text(10, "\xD7");
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(4);
    __advance();
    __property("placeholder", ctx_r2.t()("comptes.picker.placeholder"))("ngModel", ctx_r2.pickerQ());
    __control();
    __advance();
    __property("ngModel", ctx_r2.pickerProducerId());
    __control();
    __advance(3);
    __repeater(ctx_r2.pickerHits());
    __advance(2);
    __property("disabled", !ctx_r2.pickerProducerId());
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("comptes.dlg.link.action"), " ");
  }
}
function ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "ui-button", 41);
    __listener("click", function ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_17_Template_ui_button_click_0_listener() {
      __restoreView(_r7);
      const account_r6 = __nextContext().$implicit;
      const ctx_r2 = __nextContext(3);
      return __resetView(ctx_r2.openPicker(account_r6));
    });
    __element(1, "lucide-angular", 42);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(4);
    __advance();
    __property("img", ctx_r2.icons.userSearch);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("comptes.picker.button"), " ");
  }
}
function ComptesPage_Conditional_8_Conditional_6_For_15_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    __elementStart(0, "tr", 23)(1, "td", 25)(2, "div", 26);
    __text(3);
    __elementEnd();
    __elementStart(4, "div", 27);
    __text(5);
    __elementEnd();
    __elementStart(6, "div", 28);
    __text(7);
    __elementEnd()();
    __elementStart(8, "td");
    __text(9);
    __elementEnd();
    __elementStart(10, "td", 29);
    __text(11);
    __elementEnd();
    __elementStart(12, "td");
    __conditionalCreate(13, ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_13_Template, 2, 1, "ui-pill", 30)(14, ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_14_Template, 2, 1, "ui-pill", 31);
    __elementEnd();
    __elementStart(15, "td", 32);
    __conditionalCreate(16, ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_16_Template, 11, 5, "div", 33)(17, ComptesPage_Conditional_8_Conditional_6_For_15_Conditional_17_Template, 3, 2, "ui-button", 34);
    __elementEnd()();
  }
  if (rf & 2) {
    const account_r6 = ctx.$implicit;
    const ctx_r2 = __nextContext(3);
    __advance(3);
    __textInterpolate(account_r6.name);
    __advance(2);
    __textInterpolate(account_r6.email);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.store.phone(account_r6.phone), " ");
    __advance(2);
    __textInterpolate(ctx_r2.store.roleLabel(account_r6.role));
    __advance(2);
    __textInterpolate1(" ", account_r6.scoopId ? ctx_r2.scoopName(account_r6.scoopId) : ctx_r2.t()("comptes.scopeAll"), " ");
    __advance(2);
    __conditional(account_r6.active ? 13 : 14);
    __advance(3);
    __conditional(((_a2 = ctx_r2.pickerUser()) == null ? void 0 : _a2.id) === account_r6.id ? 16 : 17);
  }
}
function ComptesPage_Conditional_8_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "table", 17)(1, "thead", 18)(2, "tr")(3, "th", 19);
    __text(4);
    __elementEnd();
    __elementStart(5, "th", 20);
    __text(6);
    __elementEnd();
    __elementStart(7, "th", 20);
    __text(8);
    __elementEnd();
    __elementStart(9, "th", 20);
    __text(10);
    __elementEnd();
    __elementStart(11, "th", 21);
    __text(12);
    __elementEnd()()();
    __elementStart(13, "tbody", 22);
    __repeaterCreate(14, ComptesPage_Conditional_8_Conditional_6_For_15_Template, 18, 7, "tr", 23, _forTrack1);
    __elementEnd()();
    __element(16, "ui-pagination", 24);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance(4);
    __textInterpolate(ctx_r2.t()("comptes.col.account"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("comptes.col.role"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("comptes.col.scope"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("comptes.col.state"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("comptes.col.matching"));
    __advance(2);
    __repeater(ctx_r2.matchPager.items());
    __advance(2);
    __property("pager", ctx_r2.matchPager);
  }
}
function ComptesPage_Conditional_8_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 16);
    __element(1, "lucide-angular", 43);
    __elementStart(2, "div", 44);
    __text(3);
    __elementEnd();
    __elementStart(4, "p", 45);
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("img", ctx_r2.icons.userSearch);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.needle() ? ctx_r2.t()("comptes.empty.noAccount") : ctx_r2.t()("comptes.empty.allMatched"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.needle() ? ctx_r2.t()("comptes.empty.editSearch") : ctx_r2.t()("comptes.empty.allMatchedDesc"), " ");
  }
}
function ComptesPage_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 7)(1, "div", 13)(2, "h2", 14);
    __text(3);
    __elementEnd();
    __elementStart(4, "p", 15);
    __text(5);
    __elementEnd()();
    __conditionalCreate(6, ComptesPage_Conditional_8_Conditional_6_Template, 17, 6)(7, ComptesPage_Conditional_8_Conditional_7_Template, 6, 3, "div", 16);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(3);
    __textInterpolate(ctx_r2.t()("comptes.identity.title"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("comptes.identity.hint"));
    __advance();
    __conditional(ctx_r2.toMatch().length ? 6 : 7);
  }
}
function ComptesPage_Conditional_9_Conditional_1_For_17_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 48);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const producer_r9 = ctx;
    __property("routerLink", __pureFunction1(4, _c0, producer_r9.id));
    __advance();
    __textInterpolate3(" ", producer_r9.code, " \xB7 ", producer_r9.firstName, " ", producer_r9.lastName, " ");
  }
}
function ComptesPage_Conditional_9_Conditional_1_For_17_Conditional_8_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r2 = __nextContext(4);
    __textInterpolate1(" ", ctx_r2.t()("comptes.unknown"), " ");
  }
}
function ComptesPage_Conditional_9_Conditional_1_For_17_Conditional_10_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const producer_r10 = ctx;
    const ctx_r2 = __nextContext(4);
    __textInterpolate2(" ", ctx_r2.scoopName(producer_r10.scoopId), " \xB7 ", ctx_r2.orgName(producer_r10.orgId), " ");
  }
}
function ComptesPage_Conditional_9_Conditional_1_For_17_Conditional_11_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r2 = __nextContext(4);
    __textInterpolate1(" ", ctx_r2.t()("comptes.unknown"), " ");
  }
}
function ComptesPage_Conditional_9_Conditional_1_For_17_Template(rf, ctx) {
  var _a2, _b, _c, _d, _e;
  if (rf & 1) {
    const _r8 = __getCurrentView();
    __elementStart(0, "tr", 23)(1, "td", 25)(2, "div", 26);
    __text(3);
    __elementEnd();
    __elementStart(4, "div", 27);
    __text(5);
    __elementEnd()();
    __elementStart(6, "td");
    __conditionalCreate(7, ComptesPage_Conditional_9_Conditional_1_For_17_Conditional_7_Template, 2, 6, "a", 48)(8, ComptesPage_Conditional_9_Conditional_1_For_17_Conditional_8_Template, 1, 1);
    __elementEnd();
    __elementStart(9, "td", 49);
    __conditionalCreate(10, ComptesPage_Conditional_9_Conditional_1_For_17_Conditional_10_Template, 1, 2)(11, ComptesPage_Conditional_9_Conditional_1_For_17_Conditional_11_Template, 1, 1);
    __elementEnd();
    __elementStart(12, "td")(13, "ui-pill", 50);
    __text(14);
    __elementEnd()();
    __elementStart(15, "td", 51);
    __text(16);
    __elementEnd();
    __elementStart(17, "td", 32)(18, "div", 52)(19, "ui-button", 53);
    __listener("click", function ComptesPage_Conditional_9_Conditional_1_For_17_Template_ui_button_click_19_listener() {
      const candidate_r11 = __restoreView(_r8).$implicit;
      const ctx_r2 = __nextContext(3);
      return __resetView(ctx_r2.confirmCandidate(candidate_r11.userId, candidate_r11.producerId));
    });
    __text(20);
    __elementEnd();
    __elementStart(21, "ui-button", 41);
    __listener("click", function ComptesPage_Conditional_9_Conditional_1_For_17_Template_ui_button_click_21_listener() {
      const candidate_r11 = __restoreView(_r8).$implicit;
      const ctx_r2 = __nextContext(3);
      return __resetView(ctx_r2.rejectCandidate(candidate_r11.id));
    });
    __text(22);
    __elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_14_0;
    let tmp_15_0;
    const candidate_r11 = ctx.$implicit;
    const ctx_r2 = __nextContext(3);
    __advance(3);
    __textInterpolate1(" ", (_b = (_a2 = ctx_r2.user(candidate_r11.userId)) == null ? void 0 : _a2.name) != null ? _b : ctx_r2.t()("comptes.unknown"), " ");
    __advance(2);
    __textInterpolate2(" ", ctx_r2.store.roleLabel((_d = (_c = ctx_r2.user(candidate_r11.userId)) == null ? void 0 : _c.role) != null ? _d : "technicien"), " \xB7 ", ctx_r2.store.phone((_e = ctx_r2.user(candidate_r11.userId)) == null ? void 0 : _e.phone), " ");
    __advance(2);
    __conditional((tmp_14_0 = ctx_r2.prod(candidate_r11.producerId)) ? 7 : 8, tmp_14_0);
    __advance(3);
    __conditional((tmp_15_0 = ctx_r2.prod(candidate_r11.producerId)) ? 10 : 11, tmp_15_0);
    __advance(3);
    __property("tone", ctx_r2.scoreTone(candidate_r11.score));
    __advance();
    __textInterpolate1("", candidate_r11.score, " %");
    __advance(2);
    __textInterpolate1(" ", candidate_r11.signals.join(" \xB7 "), " ");
    __advance(3);
    __property("disabled", !ctx_r2.user(candidate_r11.userId) || !ctx_r2.prod(candidate_r11.producerId));
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("comptes.confirm"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("comptes.action.reject"), " ");
  }
}
function ComptesPage_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "table", 17)(1, "thead", 18)(2, "tr")(3, "th", 19);
    __text(4);
    __elementEnd();
    __elementStart(5, "th", 20);
    __text(6);
    __elementEnd();
    __elementStart(7, "th", 46);
    __text(8);
    __elementEnd();
    __elementStart(9, "th", 20);
    __text(10);
    __elementEnd();
    __elementStart(11, "th", 47);
    __text(12);
    __elementEnd();
    __elementStart(13, "th", 21);
    __text(14);
    __elementEnd()()();
    __elementStart(15, "tbody", 22);
    __repeaterCreate(16, ComptesPage_Conditional_9_Conditional_1_For_17_Template, 23, 11, "tr", 23, _forTrack1);
    __elementEnd()();
    __element(18, "ui-pagination", 24);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance(4);
    __textInterpolate(ctx_r2.t()("comptes.col.account"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("comptes.col.candidate"));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("comptes.col.scoopOrg"), " ");
    __advance(2);
    __textInterpolate(ctx_r2.t()("comptes.col.score"));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("comptes.col.signals"), " ");
    __advance(2);
    __textInterpolate(ctx_r2.t()("comptes.col.decision"));
    __advance(2);
    __repeater(ctx_r2.candPager.items());
    __advance(2);
    __property("pager", ctx_r2.candPager);
  }
}
function ComptesPage_Conditional_9_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "ui-button", 56);
    __listener("click", function ComptesPage_Conditional_9_Conditional_2_Conditional_6_Template_ui_button_click_0_listener() {
      __restoreView(_r12);
      const ctx_r2 = __nextContext(3);
      return __resetView(ctx_r2.setVue("a-rapprocher"));
    });
    __element(1, "lucide-angular", 42);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __advance();
    __property("img", ctx_r2.icons.userSearch);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("comptes.matchManually", __pureFunction1(2, _c1, ctx_r2.unmatched().length)), " ");
  }
}
function ComptesPage_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 16);
    __element(1, "lucide-angular", 43);
    __elementStart(2, "div", 44);
    __text(3);
    __elementEnd();
    __elementStart(4, "p", 54);
    __text(5);
    __elementEnd();
    __conditionalCreate(6, ComptesPage_Conditional_9_Conditional_2_Conditional_6_Template, 3, 4, "ui-button", 55);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("img", ctx_r2.icons.sparkles);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.needle() ? ctx_r2.t()("comptes.empty.noProposal") : ctx_r2.t()("comptes.empty.noCandidate"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.needle() ? ctx_r2.t()("comptes.empty.editSearch") : ctx_r2.t()("comptes.empty.noCandidateDesc"), " ");
    __advance();
    __conditional(!ctx_r2.needle() && ctx_r2.unmatched().length > 0 ? 6 : -1);
  }
}
function ComptesPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 7);
    __conditionalCreate(1, ComptesPage_Conditional_9_Conditional_1_Template, 19, 7)(2, ComptesPage_Conditional_9_Conditional_2_Template, 7, 4, "div", 16);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __conditional(ctx_r2.cands().length ? 1 : 2);
  }
}
function ComptesPage_Conditional_10_Conditional_1_For_15_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 48);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const producer_r14 = ctx;
    __property("routerLink", __pureFunction1(4, _c0, producer_r14.id));
    __advance();
    __textInterpolate3(" ", producer_r14.code, " \xB7 ", producer_r14.firstName, " ", producer_r14.lastName, " ");
  }
}
function ComptesPage_Conditional_10_Conditional_1_For_15_Conditional_8_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r2 = __nextContext(4);
    __textInterpolate1(" ", ctx_r2.t()("comptes.unknown"), " ");
  }
}
function ComptesPage_Conditional_10_Conditional_1_For_15_Template(rf, ctx) {
  var _a2, _b, _c;
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "tr", 23)(1, "td", 25)(2, "div", 26);
    __text(3);
    __elementEnd();
    __elementStart(4, "div", 28);
    __text(5);
    __elementEnd()();
    __elementStart(6, "td");
    __conditionalCreate(7, ComptesPage_Conditional_10_Conditional_1_For_15_Conditional_7_Template, 2, 6, "a", 48)(8, ComptesPage_Conditional_10_Conditional_1_For_15_Conditional_8_Template, 1, 1);
    __elementEnd();
    __elementStart(9, "td", 58);
    __text(10);
    __elementEnd();
    __elementStart(11, "td", 59);
    __text(12);
    __elementEnd();
    __elementStart(13, "td", 32)(14, "ui-button", 60);
    __listener("click", function ComptesPage_Conditional_10_Conditional_1_For_15_Template_ui_button_click_14_listener() {
      const link_r15 = __restoreView(_r13).$implicit;
      const ctx_r2 = __nextContext(3);
      return __resetView(ctx_r2.unlink(link_r15));
    });
    __text(15);
    __elementEnd()()();
  }
  if (rf & 2) {
    let tmp_14_0;
    const link_r15 = ctx.$implicit;
    const ctx_r2 = __nextContext(3);
    __advance(3);
    __textInterpolate1(" ", (_b = (_a2 = ctx_r2.user(link_r15.userId)) == null ? void 0 : _a2.name) != null ? _b : ctx_r2.t()("comptes.unknown"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.store.phone((_c = ctx_r2.user(link_r15.userId)) == null ? void 0 : _c.phone), " ");
    __advance(2);
    __conditional((tmp_14_0 = ctx_r2.prod(link_r15.producerId)) ? 7 : 8, tmp_14_0);
    __advance(3);
    __textInterpolate1(" ", ctx_r2.fmtDateTime(link_r15.linkedAt), " ");
    __advance(2);
    __textInterpolate(link_r15.by);
    __advance(3);
    __textInterpolate1(" ", ctx_r2.t()("comptes.action.unlink"), " ");
  }
}
function ComptesPage_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "table", 17)(1, "thead", 18)(2, "tr")(3, "th", 19);
    __text(4);
    __elementEnd();
    __elementStart(5, "th", 20);
    __text(6);
    __elementEnd();
    __elementStart(7, "th", 20);
    __text(8);
    __elementEnd();
    __elementStart(9, "th", 57);
    __text(10);
    __elementEnd();
    __elementStart(11, "th", 21);
    __text(12, "\xA0");
    __elementEnd()()();
    __elementStart(13, "tbody", 22);
    __repeaterCreate(14, ComptesPage_Conditional_10_Conditional_1_For_15_Template, 16, 6, "tr", 23, _forTrack1);
    __elementEnd()();
    __element(16, "ui-pagination", 24);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance(4);
    __textInterpolate(ctx_r2.t()("comptes.col.account"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("comptes.col.linkedProducer"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("comptes.col.linkedOn"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("comptes.col.by"));
    __advance(4);
    __repeater(ctx_r2.linkedPager.items());
    __advance(2);
    __property("pager", ctx_r2.linkedPager);
  }
}
function ComptesPage_Conditional_10_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = __getCurrentView();
    __elementStart(0, "ui-button", 56);
    __listener("click", function ComptesPage_Conditional_10_Conditional_2_Conditional_6_Template_ui_button_click_0_listener() {
      __restoreView(_r16);
      const ctx_r2 = __nextContext(3);
      return __resetView(ctx_r2.setVue("candidats"));
    });
    __element(1, "lucide-angular", 42);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __advance();
    __property("img", ctx_r2.icons.sparkles);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("comptes.examine", __pureFunction1(2, _c1, ctx_r2.candidateRows().length)), " ");
  }
}
function ComptesPage_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 16);
    __element(1, "lucide-angular", 43);
    __elementStart(2, "div", 44);
    __text(3);
    __elementEnd();
    __elementStart(4, "p", 54);
    __text(5);
    __elementEnd();
    __conditionalCreate(6, ComptesPage_Conditional_10_Conditional_2_Conditional_6_Template, 3, 4, "ui-button", 55);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("img", ctx_r2.icons.users);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.needle() ? ctx_r2.t()("comptes.empty.noLink") : ctx_r2.t()("comptes.empty.noConfirmed"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.needle() ? ctx_r2.t()("comptes.empty.editSearch") : ctx_r2.t()("comptes.empty.noConfirmedDesc"), " ");
    __advance();
    __conditional(!ctx_r2.needle() && ctx_r2.candidateRows().length > 0 ? 6 : -1);
  }
}
function ComptesPage_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 7);
    __conditionalCreate(1, ComptesPage_Conditional_10_Conditional_1_Template, 17, 5)(2, ComptesPage_Conditional_10_Conditional_2_Template, 7, 4, "div", 16);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __conditional(ctx_r2.linkedFiltered().length ? 1 : 2);
  }
}
var ComptesPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.fmtDateTime = fmtDateTime;
    this.maskPhone = maskPhone;
    this.icons = {
      search: Search,
      userSearch: UserRoundSearch,
      sparkles: Sparkles,
      users: Users
    };
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.vueFromRoute = toSignal(this.route.queryParamMap.pipe(map((m) => {
      const v = m.get("vue");
      return v === "a-rapprocher" || v === "liees" || v === "candidats" ? v : null;
    })), { initialValue: null });
    this.q = signal("", ...[]);
    this.pickerUser = signal(null, ...[]);
    this.pickerQ = signal("", ...[]);
    this.pickerProducerId = signal("", ...[]);
    this.candidateRows = computed(() => this.store.state().linkCandidates, ...[]);
    this.linkedRows = computed(() => this.store.state().links, ...[]);
    this.vue = computed(() => {
      const fromUrl = this.vueFromRoute();
      if (fromUrl) return fromUrl;
      const c = this.candidateRows().length;
      const u = this.unmatched().length;
      this.linkedRows().length;
      return c ? "candidats" : u ? "a-rapprocher" : "liees";
    }, ...[]);
    this.needle = computed(() => this.q().trim().toLowerCase(), ...[]);
    this.unmatched = computed(() => {
      const s = this.store.state();
      return s.users.filter((u) => !s.links.some((l) => l.userId === u.id) && !s.linkCandidates.some((c) => c.userId === u.id));
    }, ...[]);
    this.vueOptions = computed(() => {
      const t = this.t();
      return [
        {
          key: "a-rapprocher",
          label: t("comptes.view.toMatch"),
          count: this.unmatched().length,
          icon: UserRoundSearch
        },
        {
          key: "candidats",
          label: t("comptes.view.candidates"),
          count: this.candidateRows().length,
          icon: Sparkles
        },
        {
          key: "liees",
          label: t("comptes.view.linked"),
          count: this.linkedRows().length,
          icon: Link2
        }
      ];
    }, ...[]);
    this.toMatch = computed(() => {
      const n = this.needle();
      return this.unmatched().filter((u) => this.hit(n, u.name, this.store.roleLabel(u.role), this.scoopName(u.scoopId)));
    }, ...[]);
    this.cands = computed(() => {
      const n = this.needle();
      return this.candidateRows().filter((c) => {
        const u = this.user(c.userId);
        const p = this.prod(c.producerId);
        return this.hit(n, u == null ? void 0 : u.name, p == null ? void 0 : p.code, p ? `${p.firstName} ${p.lastName}` : void 0);
      });
    }, ...[]);
    this.linkedFiltered = computed(() => {
      const n = this.needle();
      return this.linkedRows().filter((l) => {
        const u = this.user(l.userId);
        const p = this.prod(l.producerId);
        return this.hit(n, u == null ? void 0 : u.name, p == null ? void 0 : p.code, p ? `${p.firstName} ${p.lastName}` : void 0);
      });
    }, ...[]);
    this.pickerHits = computed(() => {
      const session = this.store.state().session;
      const raw = this.pickerQ().trim();
      const n = raw.toLowerCase();
      if (raw.length > 0 && raw.length < 2) return [];
      const taken = new Set(this.store.state().links.map((l) => l.producerId));
      return inScope(this.store.state().producers, session).filter((p) => !p.mergedInto && !taken.has(p.id) && (!n || `${p.firstName} ${p.lastName} ${p.code} ${p.village}`.toLowerCase().includes(n))).slice(0, 40);
    }, ...[]);
    this.matchPager = createPager(() => this.toMatch());
    this.candPager = createPager(() => this.cands());
    this.linkedPager = createPager(() => this.linkedFiltered());
  }
  user(id) {
    return this.store.state().users.find((u) => u.id === id);
  }
  prod(id) {
    return this.store.state().producers.find((p) => p.id === id);
  }
  scoopName(id) {
    var _a2, _b;
    const t = this.t();
    return (_b = (_a2 = this.store.state().scoops.find((s) => s.id === id)) == null ? void 0 : _a2.name) != null ? _b : t("comptes.unknown");
  }
  orgName(id) {
    var _a2, _b;
    return (_b = (_a2 = this.store.state().orgs.find((o) => o.id === id)) == null ? void 0 : _a2.name) != null ? _b : this.t()("comptes.unknown");
  }
  hit(needle, ...hay) {
    return !needle || hay.some((h) => (h != null ? h : "").toLowerCase().includes(needle));
  }
  scoreTone(score) {
    return score >= 80 ? "success" : score >= 60 ? "warning" : "neutral";
  }
  setVue(v) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { vue: v },
      queryParamsHandling: "merge",
      replaceUrl: true
    });
  }
  openPicker(u) {
    this.pickerUser.set(u);
    this.pickerQ.set("");
    this.pickerProducerId.set("");
  }
  closePicker() {
    this.pickerUser.set(null);
  }
  applyManualLink(u) {
    const pid = this.pickerProducerId();
    if (!pid) return;
    if (actions.linkManually(u.id, pid)) this.closePicker();
  }
  confirmCandidate(userId, producerId) {
    if (confirm(this.t()("comptes.dlg.link.title"))) actions.confirmLink(userId, producerId);
  }
  rejectCandidate(id) {
    if (confirm(this.t()("comptes.action.reject"))) actions.rejectLink(id);
  }
  unlink(l) {
    if (confirm(this.t()("comptes.dlg.unlink.title"))) actions.unlinkLink(l.id);
  }
}, _a.\u0275fac = function ComptesPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-comptes-page"]],
  decls: 13,
  vars: 11,
  consts: [
    [
      "perm",
      "account.manage",
      3,
      "area"
    ],
    [
      3,
      "eyebrow",
      "title",
      "description"
    ],
    [
      1,
      "mb-4",
      "flex",
      "flex-wrap",
      "gap-2",
      "rounded-md",
      "border",
      "bg-muted/30",
      "p-2"
    ],
    [
      "type",
      "button",
      1,
      "flex",
      "min-w-[8rem]",
      "flex-1",
      "items-center",
      "gap-2",
      "rounded-md",
      "px-3",
      "py-2",
      "text-left",
      "text-sm",
      3,
      "bg-card",
      "shadow-sm"
    ],
    [
      1,
      "relative",
      "mb-3",
      "max-w-sm"
    ],
    [
      1,
      "pointer-events-none",
      "absolute",
      "left-2.5",
      "top-1/2",
      "size-4",
      "-translate-y-1/2",
      "text-muted-foreground",
      3,
      "img"
    ],
    [
      1,
      "flex",
      "h-9",
      "w-full",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "pl-8",
      "pr-3",
      "text-sm",
      "shadow-sm",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      3,
      "ngModelChange",
      "placeholder",
      "ngModel"
    ],
    [
      1,
      "surface",
      "overflow-x-auto"
    ],
    [
      1,
      "mt-4",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      "type",
      "button",
      1,
      "flex",
      "min-w-[8rem]",
      "flex-1",
      "items-center",
      "gap-2",
      "rounded-md",
      "px-3",
      "py-2",
      "text-left",
      "text-sm",
      3,
      "click"
    ],
    [
      1,
      "size-4",
      "shrink-0",
      "text-muted-foreground",
      3,
      "img"
    ],
    [
      1,
      "min-w-0",
      "font-medium"
    ],
    [
      1,
      "ml-auto",
      "tabular",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "border-b",
      "bg-muted/40",
      "px-4",
      "py-3"
    ],
    [
      1,
      "text-sm",
      "font-semibold"
    ],
    [
      1,
      "mt-0.5",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "px-4",
      "py-10",
      "text-center",
      "text-muted-foreground"
    ],
    [
      1,
      "w-full",
      "text-sm"
    ],
    [
      1,
      "border-b",
      "bg-muted",
      "text-left",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "py-3",
      "pl-4",
      "font-semibold"
    ],
    [1, "font-semibold"],
    [
      1,
      "pr-4",
      "text-right",
      "font-semibold"
    ],
    [1, "divide-y"],
    [1, "hover:bg-muted/40"],
    [
      1,
      "px-4",
      "pb-4",
      3,
      "pager"
    ],
    [
      1,
      "py-3",
      "pl-4"
    ],
    [1, "font-medium"],
    [
      1,
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "text-xs",
      "text-muted-foreground",
      "tabular"
    ],
    [1, "text-muted-foreground"],
    ["tone", "success"],
    ["tone", "neutral"],
    [
      1,
      "pr-4",
      "text-right"
    ],
    [
      1,
      "inline-flex",
      "flex-col",
      "items-end",
      "gap-2",
      "sm:flex-row",
      "sm:items-center"
    ],
    [
      "size",
      "sm",
      "variant",
      "outline"
    ],
    [
      1,
      "h-8",
      "w-56",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-2",
      "text-sm",
      3,
      "ngModelChange",
      "placeholder",
      "ngModel"
    ],
    [
      1,
      "h-8",
      "max-w-xs",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-2",
      "text-sm",
      3,
      "ngModelChange",
      "ngModel"
    ],
    ["value", ""],
    [3, "ngValue"],
    [
      "size",
      "sm",
      3,
      "click",
      "disabled"
    ],
    [
      "variant",
      "ghost",
      "size",
      "sm",
      3,
      "click"
    ],
    [
      "size",
      "sm",
      "variant",
      "outline",
      3,
      "click"
    ],
    [
      1,
      "size-4",
      3,
      "img"
    ],
    [
      1,
      "mx-auto",
      "mb-2",
      "size-10",
      "opacity-50",
      3,
      "img"
    ],
    [
      1,
      "font-semibold",
      "text-foreground"
    ],
    [
      1,
      "mt-1",
      "text-sm"
    ],
    [
      1,
      "hidden",
      "font-semibold",
      "lg:table-cell"
    ],
    [
      1,
      "hidden",
      "font-semibold",
      "xl:table-cell"
    ],
    [
      1,
      "font-medium",
      "hover:text-primary",
      "hover:underline",
      3,
      "routerLink"
    ],
    [
      1,
      "hidden",
      "text-muted-foreground",
      "lg:table-cell"
    ],
    [3, "tone"],
    [
      1,
      "hidden",
      "max-w-72",
      "text-xs",
      "text-muted-foreground",
      "xl:table-cell"
    ],
    [
      1,
      "inline-flex",
      "flex-wrap",
      "items-center",
      "justify-end",
      "gap-1"
    ],
    [
      "size",
      "sm",
      1,
      "h-8",
      3,
      "click",
      "disabled"
    ],
    [
      1,
      "mt-2",
      "text-sm"
    ],
    [
      "variant",
      "outline",
      1,
      "mt-3"
    ],
    [
      "variant",
      "outline",
      1,
      "mt-3",
      3,
      "click"
    ],
    [
      1,
      "hidden",
      "font-semibold",
      "md:table-cell"
    ],
    [
      1,
      "whitespace-nowrap",
      "text-muted-foreground"
    ],
    [
      1,
      "hidden",
      "md:table-cell"
    ],
    [
      "size",
      "sm",
      "variant",
      "destructive",
      3,
      "click"
    ]
  ],
  template: function ComptesPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0);
      __element(1, "ui-page-header", 1);
      __elementStart(2, "div", 2);
      __repeaterCreate(3, ComptesPage_For_4_Template, 6, 7, "button", 3, _forTrack0);
      __elementEnd();
      __elementStart(5, "div", 4);
      __element(6, "lucide-angular", 5);
      __elementStart(7, "input", 6);
      __controlCreate();
      __listener("ngModelChange", function ComptesPage_Template_input_ngModelChange_7_listener($event) {
        return ctx.q.set($event);
      });
      __elementEnd()();
      __conditionalCreate(8, ComptesPage_Conditional_8_Template, 8, 3, "div", 7);
      __conditionalCreate(9, ComptesPage_Conditional_9_Template, 3, 1, "div", 7);
      __conditionalCreate(10, ComptesPage_Conditional_10_Template, 3, 1, "div", 7);
      __elementStart(11, "p", 8);
      __text(12, " Parit\xE9 compl\xE8te avec les dialogues React (picker command, alert) : \xE0 brancher ult\xE9rieurement. ");
      __elementEnd()();
    }
    if (rf & 2) {
      __property("area", ctx.t()("comptes.area"));
      __advance();
      __property("eyebrow", ctx.t()("comptes.eyebrow"))("title", ctx.t()("comptes.title"))("description", ctx.t()("comptes.description"));
      __advance(2);
      __repeater(ctx.vueOptions());
      __advance(3);
      __property("img", ctx.icons.search);
      __advance();
      __property("placeholder", ctx.t()("comptes.search"))("ngModel", ctx.q());
      __attribute("aria-label", ctx.t()("comptes.search"));
      __control();
      __advance();
      __conditional(ctx.vue() === "a-rapprocher" ? 8 : -1);
      __advance();
      __conditional(ctx.vue() === "candidats" ? 9 : -1);
      __advance();
      __conditional(ctx.vue() === "liees" ? 10 : -1);
    }
  },
  dependencies: [
    PaginationComponent,
    FormsModule,
    NgSelectOption,
    _NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    RouterLink,
    LucideAngularModule,
    LucideAngularComponent,
    AppShellComponent,
    UiButtonComponent,
    UiPageHeaderComponent,
    UiPillComponent
  ],
  encapsulation: 2
}), _a);

export { ComptesPage as default };
//# sourceMappingURL=comptes.page-DiGzkBmo.mjs.map

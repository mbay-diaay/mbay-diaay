import { i as inject, F as signal, c as computed, ɵ as __defineComponent, d as RouterLink, f as __elementStart, g as __text, h as __elementEnd, b as __element, H as __listener, m as __repeaterCreate, j as __conditionalCreate, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, u as __attribute, v as __repeater, r as __pureFunction1, s as __conditional, L as __getCurrentView, w as __nextContext, z as __classProp, N as __textInterpolate2, a6 as __repeaterTrackByIndex, t as __styleProp, x as __pureFunction2, a9 as __arrowFunction, O as __restoreView, P as __resetView, T as __textInterpolate3 } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, j as nf, f as fmtDateTime, i as inScope, D as maskCni, p as maskPhone } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { T as TONE, i as initialsOf } from './v2-page.styles-DN_FuKKd.mjs';
import { M as ModalComponent, P as PaginationComponent, S as SelectComponent, g as StatCardsComponent } from './ui-DDO8FoUF.mjs';
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
var _c0 = (a0) => ({ total: a0 });
var _c1 = (a0) => ({ count: a0 });
var _c2 = (a0) => ({ name: a0 });
var _c3 = (a0) => ["/dashboard/producteurs", a0];
var _c4 = (a0, a1) => ({
  name: a0,
  date: a1
});
var _c5 = (a0) => ({ fields: a0 });
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
var arrowFn0 = (ctx, view) => (c) => c.field;
function QualiteCorrectionsPage_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 24);
    __listener("click", function QualiteCorrectionsPage_For_16_Template_button_click_0_listener() {
      const pill_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.patchF({ status: pill_r2.value }));
    });
    __text(1);
    __elementStart(2, "span", 25);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const pill_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __classProp("on", ctx_r2.f().status === pill_r2.value);
    __attribute("aria-checked", ctx_r2.f().status === pill_r2.value);
    __advance();
    __textInterpolate1(" ", ctx_r2.pillLabel(pill_r2));
    __advance();
    __classProp("zero", !pill_r2.count);
    __advance();
    __textInterpolate(pill_r2.count);
  }
}
function QualiteCorrectionsPage_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "button", 26);
    __listener("click", function QualiteCorrectionsPage_Conditional_26_Template_button_click_0_listener() {
      __restoreView(_r4);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.resetFilters());
    });
    __element(1, "ui-icon", 27);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate2("", ctx_r2.t()("qualite.corrections.reset"), " (", ctx_r2.activeFilters(), ") ");
  }
}
function QualiteCorrectionsPage_Conditional_28_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "tr", 33);
    __listener("click", function QualiteCorrectionsPage_Conditional_28_For_20_Template_tr_click_0_listener() {
      const request_r6 = __restoreView(_r5).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.openDialog(request_r6.id));
    });
    __elementStart(1, "td")(2, "span", 34)(3, "span", 35);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 36)(6, "span", 37);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 38);
    __text(9);
    __elementEnd()()()();
    __elementStart(10, "td")(11, "span", 39);
    __text(12);
    __elementEnd();
    __elementStart(13, "span", 40);
    __text(14);
    __elementEnd()();
    __elementStart(15, "td", 41);
    __text(16);
    __elementEnd();
    __elementStart(17, "td", 42);
    __text(18);
    __elementEnd();
    __elementStart(19, "td", 43);
    __text(20);
    __elementEnd();
    __elementStart(21, "td")(22, "span", 44);
    __text(23);
    __elementEnd()();
    __elementStart(24, "td")(25, "span", 45)(26, "button", 46);
    __listener("click", function QualiteCorrectionsPage_Conditional_28_For_20_Template_button_click_26_listener($event) {
      const request_r6 = __restoreView(_r5).$implicit;
      const ctx_r2 = __nextContext(2);
      $event.stopPropagation();
      return __resetView(ctx_r2.openDialog(request_r6.id));
    });
    __element(27, "ui-icon", 47);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const request_r6 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(4);
    __textInterpolate(ctx_r2.initials(ctx_r2.producerName(request_r6.producerId)));
    __advance(3);
    __textInterpolate(ctx_r2.producerName(request_r6.producerId));
    __advance(2);
    __textInterpolate(ctx_r2.producerCode(request_r6.producerId));
    __advance(3);
    __textInterpolate(ctx_r2.t()("qualite.v2.corr.changes", __pureFunction1(17, _c1, request_r6.changes.length)));
    __advance(2);
    __textInterpolate(ctx_r2.changeFields(request_r6));
    __advance();
    __property("title", request_r6.motif);
    __advance();
    __textInterpolate1(" ", request_r6.motif, " ");
    __advance(2);
    __textInterpolate(request_r6.requester);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.fmtDateTime(request_r6.requestedAt), " ");
    __advance(2);
    __styleProp("background", ctx_r2.tone[request_r6.status].bg)("color", ctx_r2.tone[request_r6.status].fg);
    __advance();
    __textInterpolate(ctx_r2.statusText(request_r6.status));
    __advance(3);
    __property("title", ctx_r2.t()("qualite.corrections.examine"));
    __attribute("aria-label", ctx_r2.t()("qualite.v2.corr.examine", __pureFunction1(19, _c2, ctx_r2.producerName(request_r6.producerId))));
    __advance();
    __property("size", 18);
  }
}
function QualiteCorrectionsPage_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 28)(1, "table", 29)(2, "thead")(3, "tr")(4, "th");
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
    __elementStart(14, "th");
    __text(15);
    __elementEnd();
    __elementStart(16, "th", 30);
    __text(17);
    __elementEnd()()();
    __elementStart(18, "tbody");
    __repeaterCreate(19, QualiteCorrectionsPage_Conditional_28_For_20_Template, 28, 21, "tr", 31, _forTrack1);
    __elementEnd()()();
    __element(21, "ui-pagination", 32);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(5);
    __textInterpolate(ctx_r2.t()("qualite.corrections.col.producer"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.corrections.col.changes"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.corrections.col.motif"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.corrections.col.requester"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.corrections.col.date"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.corrections.col.status"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("organisations.col.actions"));
    __advance(2);
    __repeater(ctx_r2.pager.items());
    __advance(2);
    __property("pager", ctx_r2.pager);
  }
}
function QualiteCorrectionsPage_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 22)(1, "span", 48);
    __element(2, "ui-icon", 49);
    __elementEnd();
    __elementStart(3, "p", 50);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.corrections.empty"));
  }
}
function QualiteCorrectionsPage_Conditional_30_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = __getCurrentView();
    __elementStart(0, "div", 53)(1, "span", 35);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 64)(4, "a", 65);
    __listener("click", function QualiteCorrectionsPage_Conditional_30_Conditional_2_Template_a_click_4_listener() {
      __restoreView(_r8);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.closeDialog());
    });
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 66);
    __text(7);
    __elementEnd()();
    __elementStart(8, "span", 44);
    __text(9);
    __elementEnd()();
  }
  if (rf & 2) {
    const requestProducer_r9 = ctx;
    const openRequest_r10 = __nextContext();
    const ctx_r2 = __nextContext();
    __advance(2);
    __textInterpolate(ctx_r2.initials(requestProducer_r9.firstName + " " + requestProducer_r9.lastName));
    __advance(2);
    __property("routerLink", __pureFunction1(11, _c3, requestProducer_r9.id));
    __advance();
    __textInterpolate2("", requestProducer_r9.firstName, " ", requestProducer_r9.lastName);
    __advance(2);
    __textInterpolate2("", requestProducer_r9.code, " \xB7 ", ctx_r2.t()("qualite.corrections.dialog.requestedBy", __pureFunction2(13, _c4, openRequest_r10.requester, ctx_r2.fmtDateTime(openRequest_r10.requestedAt))));
    __advance();
    __styleProp("background", ctx_r2.tone[openRequest_r10.status].bg)("color", ctx_r2.tone[openRequest_r10.status].fg);
    __advance();
    __textInterpolate(ctx_r2.statusText(openRequest_r10.status));
  }
}
function QualiteCorrectionsPage_Conditional_30_For_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 55)(1, "span", 67);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 68)(4, "span", 69);
    __text(5);
    __elementEnd();
    __element(6, "ui-icon", 70);
    __elementStart(7, "span", 71);
    __text(8);
    __elementEnd()()();
  }
  if (rf & 2) {
    const change_r11 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(2);
    __textInterpolate(change_r11.field);
    __advance(3);
    __textInterpolate(ctx_r2.showVal(change_r11.field, change_r11.from));
    __advance();
    __property("size", 16);
    __advance(2);
    __textInterpolate(ctx_r2.showVal(change_r11.field, change_r11.to));
  }
}
function QualiteCorrectionsPage_Conditional_30_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 58);
    __element(1, "ui-icon", 72);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const openRequest_r10 = __nextContext();
    const ctx_r2 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r2.t()("qualite.corrections.dialog.motifWarn", __pureFunction1(3, _c5, openRequest_r10.changes.map(__arrowFunction(2, arrowFn0, ctx)).join(", "))), " ");
  }
}
function QualiteCorrectionsPage_Conditional_30_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "div")(1, "label", 73);
    __text(2);
    __elementEnd();
    __elementStart(3, "p", 74);
    __text(4);
    __elementEnd();
    __elementStart(5, "textarea", 75);
    __listener("input", function QualiteCorrectionsPage_Conditional_30_Conditional_12_Template_textarea_input_5_listener($event) {
      __restoreView(_r12);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.decisionComment.set($event.target.value));
    });
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.corrections.dialog.decisionLabel"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.corrections.dialog.decisionHint"));
    __advance();
    __property("placeholder", ctx_r2.t()("qualite.corrections.dialog.decisionPlaceholder"))("value", ctx_r2.decisionComment());
  }
}
function QualiteCorrectionsPage_Conditional_30_Conditional_13_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 78);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const openRequest_r10 = __nextContext(2);
    __advance();
    __textInterpolate1("\xAB ", openRequest_r10.decisionComment, " \xBB");
  }
}
function QualiteCorrectionsPage_Conditional_30_Conditional_13_Template(rf, ctx) {
  var _a2, _b;
  if (rf & 1) {
    __elementStart(0, "p", 76);
    __element(1, "ui-icon", 77);
    __elementStart(2, "span");
    __text(3);
    __conditionalCreate(4, QualiteCorrectionsPage_Conditional_30_Conditional_13_Conditional_4_Template, 2, 1, "span", 78);
    __elementEnd()();
  }
  if (rf & 2) {
    const openRequest_r10 = __nextContext();
    const ctx_r2 = __nextContext();
    __styleProp("background", ctx_r2.tone[openRequest_r10.status].bg)("color", ctx_r2.tone[openRequest_r10.status].fg);
    __advance();
    __property("name", openRequest_r10.status === "approuv\xE9e" ? "task_alt" : "close")("size", 18);
    __advance(2);
    __textInterpolate3(" ", ctx_r2.statusText(openRequest_r10.status), " ", ctx_r2.t()("qualite.corrections.dialog.decidedBy", __pureFunction1(10, _c2, (_a2 = openRequest_r10.decidedBy) != null ? _a2 : "")), " ", ctx_r2.fmtDateTime((_b = openRequest_r10.decidedAt) != null ? _b : ""), " ");
    __advance();
    __conditional(openRequest_r10.decisionComment ? 4 : -1);
  }
}
function QualiteCorrectionsPage_Conditional_30_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "div", 62)(1, "button", 79);
    __listener("click", function QualiteCorrectionsPage_Conditional_30_Conditional_19_Template_button_click_1_listener() {
      __restoreView(_r13);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.decide(false));
    });
    __text(2);
    __elementEnd();
    __elementStart(3, "button", 80);
    __listener("click", function QualiteCorrectionsPage_Conditional_30_Conditional_19_Template_button_click_3_listener() {
      __restoreView(_r13);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.decide(true));
    });
    __text(4);
    __elementStart(5, "span", 81);
    __element(6, "ui-icon", 82);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("disabled", ctx_r2.decisionComment().trim().length < 3);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("qualite.corrections.dialog.refuse"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("qualite.corrections.dialog.approve"));
    __advance(2);
    __property("size", 18);
  }
}
function QualiteCorrectionsPage_Conditional_30_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = __getCurrentView();
    __elementStart(0, "button", 83);
    __listener("click", function QualiteCorrectionsPage_Conditional_30_Conditional_20_Template_button_click_0_listener() {
      __restoreView(_r14);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.closeDialog());
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("common.close"), " ");
  }
}
function QualiteCorrectionsPage_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "ui-modal", 51);
    __listener("closed", function QualiteCorrectionsPage_Conditional_30_Template_ui_modal_closed_0_listener() {
      __restoreView(_r7);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.closeDialog());
    });
    __elementStart(1, "div", 52);
    __conditionalCreate(2, QualiteCorrectionsPage_Conditional_30_Conditional_2_Template, 10, 16, "div", 53);
    __elementStart(3, "div", 54);
    __repeaterCreate(4, QualiteCorrectionsPage_Conditional_30_For_5_Template, 9, 4, "div", 55, __repeaterTrackByIndex);
    __elementEnd();
    __elementStart(6, "div")(7, "p", 56);
    __text(8);
    __elementEnd();
    __elementStart(9, "p", 57);
    __text(10);
    __elementEnd()();
    __conditionalCreate(11, QualiteCorrectionsPage_Conditional_30_Conditional_11_Template, 3, 5, "p", 58);
    __conditionalCreate(12, QualiteCorrectionsPage_Conditional_30_Conditional_12_Template, 6, 4, "div")(13, QualiteCorrectionsPage_Conditional_30_Conditional_13_Template, 5, 12, "p", 59);
    __elementStart(14, "p", 60);
    __text(15);
    __elementStart(16, "a", 61);
    __listener("click", function QualiteCorrectionsPage_Conditional_30_Template_a_click_16_listener() {
      __restoreView(_r7);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.closeDialog());
    });
    __text(17);
    __elementEnd();
    __text(18, ". ");
    __elementEnd()();
    __conditionalCreate(19, QualiteCorrectionsPage_Conditional_30_Conditional_19_Template, 7, 4, "div", 62)(20, QualiteCorrectionsPage_Conditional_30_Conditional_20_Template, 2, 1, "button", 63);
    __elementEnd();
  }
  if (rf & 2) {
    let tmp_7_0;
    const openRequest_r10 = ctx;
    const ctx_r2 = __nextContext();
    __property("open", true)("title", ctx_r2.t()("qualite.corrections.dialog.title"))("description", ctx_r2.t()("qualite.corrections.dialog.description"))("width", 680)("closeLabel", ctx_r2.t()("common.close"));
    __advance(2);
    __conditional((tmp_7_0 = ctx_r2.openProd()) ? 2 : -1, tmp_7_0);
    __advance(2);
    __repeater(openRequest_r10.changes);
    __advance(4);
    __textInterpolate(ctx_r2.t()("qualite.corrections.dialog.motif"));
    __advance(2);
    __textInterpolate1("\xAB ", openRequest_r10.motif, " \xBB");
    __advance();
    __conditional(ctx_r2.motifWarn(openRequest_r10) ? 11 : -1);
    __advance();
    __conditional(openRequest_r10.status === "en attente" ? 12 : 13);
    __advance(3);
    __textInterpolate1(" ", ctx_r2.t()("qualite.corrections.dialog.trace"), " ");
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.corrections.dialog.auditLink"));
    __advance(2);
    __conditional(openRequest_r10.status === "en attente" ? 19 : 20);
  }
}
var ALL = "__all";
var DAY = 864e5;
var SENSITIVE = {
  T\u00E9l\u00E9phone: maskPhone,
  CNI: maskCni
};
var STATUS_VALUE_LABEL = {
  "en attente": "qualite.corrections.statusValue.en attente",
  approuv\u00E9e: "qualite.corrections.statusValue.approuv\xE9e",
  refus\u00E9e: "qualite.corrections.statusValue.refus\xE9e"
};
var STATUS_TONE = {
  "en attente": TONE.attente,
  approuv\u00E9e: TONE.succes,
  refus\u00E9e: TONE.erreur
};
var QualiteCorrectionsPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.ALL = ALL;
    this.nf = nf;
    this.fmtDateTime = fmtDateTime;
    this.tone = STATUS_TONE;
    this.initials = initialsOf;
    this.snackbar = inject(SnackbarService);
    this.f = signal({
      status: "en attente",
      scoop: ALL,
      field: ALL,
      q: ""
    }, ...[]);
    this.sort = signal("recent", ...[]);
    this.openId = signal(void 0, ...[]);
    this.decisionComment = signal("", ...[]);
    this.scoped = computed(() => {
      const s = this.store.state();
      return new Set(inScope(s.producers, s.session).map((p) => p.id));
    }, ...[]);
    this.prodMap = computed(() => {
      const s = this.store.state();
      return new Map(s.producers.map((p) => [p.id, p]));
    }, ...[]);
    this.fields = computed(() => {
      const s = this.store.state();
      return [...new Set(s.corrections.flatMap((r) => r.changes.map((c) => c.field)))].sort();
    }, ...[]);
    this.scoops = computed(() => this.store.state().scoops, ...[]);
    this.counts = computed(() => {
      const s = this.store.state();
      const scoped = this.scoped();
      const inScopeRows = s.corrections.filter((r) => scoped.has(r.producerId));
      return {
        pending: inScopeRows.filter((r) => r.status === "en attente").length,
        approved: inScopeRows.filter((r) => r.status === "approuv\xE9e").length,
        refused: inScopeRows.filter((r) => r.status === "refus\xE9e").length,
        total: inScopeRows.length
      };
    }, ...[]);
    this.statusPills = computed(() => {
      const c = this.counts();
      return [
        {
          value: ALL,
          labelKey: "qualite.common.all",
          count: c.total,
          tone: "neutral"
        },
        {
          value: "en attente",
          labelKey: "qualite.corrections.status.en attente",
          count: c.pending,
          tone: "warning"
        },
        {
          value: "approuv\xE9e",
          labelKey: "qualite.corrections.status.approuv\xE9e",
          count: c.approved,
          tone: "success"
        },
        {
          value: "refus\xE9e",
          labelKey: "qualite.corrections.status.refus\xE9e",
          count: c.refused,
          tone: "danger"
        }
      ];
    }, ...[]);
    this.rows = computed(() => {
      const s = this.store.state();
      const scoped = this.scoped();
      const pm = this.prodMap();
      const { status: st, scoop, field, q } = this.f();
      const sort = this.sort();
      const needle = q.trim().toLowerCase();
      return s.corrections.filter((r) => scoped.has(r.producerId)).filter((r) => st === ALL || r.status === st).filter((r) => field === ALL || r.changes.some((c) => c.field === field)).filter((r) => {
        var _a2;
        return scoop === ALL || ((_a2 = pm.get(r.producerId)) == null ? void 0 : _a2.scoopId) === scoop;
      }).filter((r) => {
        var _a2, _b, _c;
        if (!needle) return true;
        const p = pm.get(r.producerId);
        return `${(_a2 = p == null ? void 0 : p.code) != null ? _a2 : ""} ${(_b = p == null ? void 0 : p.firstName) != null ? _b : ""} ${(_c = p == null ? void 0 : p.lastName) != null ? _c : ""}`.toLowerCase().includes(needle);
      }).sort((a, b) => sort === "recent" ? b.requestedAt.localeCompare(a.requestedAt) : a.requestedAt.localeCompare(b.requestedAt));
    }, ...[]);
    this.activeFilters = computed(() => {
      const { scoop, field, q } = this.f();
      return (scoop !== ALL ? 1 : 0) + (field !== ALL ? 1 : 0) + (q.trim() ? 1 : 0);
    }, ...[]);
    this.scoopOptions = computed(() => {
      const s = this.store.state();
      const visible = inScope(s.scoops.filter((c) => !c.archived).map((c) => ({
        ...c,
        scoopId: c.id
      })), s.session);
      return [{
        value: ALL,
        label: this.t()("qualite.corrections.scoopAll")
      }, ...visible.map((c) => ({
        value: c.id,
        label: c.name
      }))];
    }, ...[]);
    this.fieldOptions = computed(() => [{
      value: ALL,
      label: this.t()("qualite.v2.corr.fieldAll")
    }, ...this.fields().map((f) => ({
      value: f,
      label: f
    }))], ...[]);
    this.sortOptions = computed(() => [{
      value: "recent",
      label: this.t()("qualite.corrections.sort.recent")
    }, {
      value: "old",
      label: this.t()("qualite.corrections.sort.old")
    }], ...[]);
    this.stats = computed(() => {
      var _a2, _b;
      const t = this.t();
      const c = this.counts();
      const s = this.store.state();
      const scoped = this.scoped();
      const mine = s.corrections.filter((r) => scoped.has(r.producerId));
      const pending = mine.filter((r) => r.status === "en attente").sort((a, b) => a.requestedAt.localeCompare(b.requestedAt));
      const oldest = pending[0] ? Math.max(0, Math.floor((Date.now() - new Date(pending[0].requestedAt).getTime()) / DAY)) : null;
      const fieldCount = /* @__PURE__ */ new Map();
      for (const r of mine) for (const ch of r.changes) fieldCount.set(ch.field, ((_a2 = fieldCount.get(ch.field)) != null ? _a2 : 0) + 1);
      const top = [...fieldCount].sort((a, b) => b[1] - a[1])[0];
      return [
        {
          label: t("qualite.v2.corr.stat.pending"),
          value: nf.format(c.pending),
          sub: oldest === null ? t("qualite.v2.corr.stat.pendingNone") : t("qualite.v2.corr.stat.pendingSub", { days: oldest }),
          icon: "edit",
          bg: "",
          fg: ""
        },
        {
          label: t("qualite.v2.corr.stat.approved"),
          value: nf.format(c.approved),
          sub: t("qualite.v2.corr.stat.approvedSub"),
          icon: "task_alt",
          ...TONE.succes
        },
        {
          label: t("qualite.v2.corr.stat.refused"),
          value: nf.format(c.refused),
          sub: t("qualite.v2.corr.stat.refusedSub"),
          icon: "close",
          ...TONE.erreur
        },
        {
          label: t("qualite.v2.corr.stat.field"),
          value: top ? nf.format(top[1]) : "\u2014",
          sub: (_b = top == null ? void 0 : top[0]) != null ? _b : "\u2014",
          icon: "analytics",
          ...TONE.culture
        }
      ];
    }, ...[]);
    this.open = computed(() => {
      const id = this.openId();
      if (!id) return void 0;
      return this.store.state().corrections.find((r) => r.id === id);
    }, ...[]);
    this.openProd = computed(() => {
      const o = this.open();
      if (!o) return void 0;
      return this.prodMap().get(o.producerId);
    }, ...[]);
    this.pager = createPager(() => this.rows());
  }
  patchF(patch) {
    this.f.set({
      ...this.f(),
      ...patch
    });
  }
  setStatusFilter(v) {
    this.patchF({ status: v });
  }
  resetFilters() {
    this.patchF({
      scoop: ALL,
      field: ALL,
      q: ""
    });
  }
  prodOf(id) {
    return this.prodMap().get(id);
  }
  producerName(id) {
    const p = this.prodOf(id);
    return p ? `${p.firstName} ${p.lastName}` : this.t()("qualite.common.notProvided");
  }
  producerCode(id) {
    var _a2, _b;
    return (_b = (_a2 = this.prodOf(id)) == null ? void 0 : _a2.code) != null ? _b : "";
  }
  changeFields(r) {
    return r.changes.map((c) => c.field).join(", ");
  }
  showVal(field, v) {
    if (field === "T\xE9l\xE9phone" && v && this.store.can("contact.read")) return v;
    const mask = SENSITIVE[field];
    if (mask) return v ? mask(v) : this.t()("qualite.common.notProvided");
    return v || this.t()("qualite.common.notProvided");
  }
  motifWarn(r) {
    const hints = {
      t\u00E9l\u00E9phone: [
        "t\xE9l\xE9phone",
        "numero",
        "num\xE9ro",
        "phone"
      ],
      \u00E2ge: [
        "\xE2ge",
        "age",
        "ans",
        "identit\xE9",
        "cni"
      ],
      nom: [
        "nom",
        "patronyme",
        "orthograph"
      ],
      "statut d'adh\xE9sion": [
        "adh\xE9sion",
        "membre",
        "statut"
      ]
    };
    const fieldList = r.changes.map((c) => c.field.toLowerCase());
    const motif = r.motif.toLowerCase();
    return !fieldList.every((field) => {
      var _a2, _b;
      return ((_b = (_a2 = Object.entries(hints).find(([k]) => field.includes(k))) == null ? void 0 : _a2[1]) != null ? _b : [field]).some((k) => motif.includes(k));
    });
  }
  openDialog(id) {
    this.openId.set(id);
    this.decisionComment.set("");
  }
  closeDialog() {
    this.openId.set(void 0);
    this.decisionComment.set("");
  }
  pillLabel(pill) {
    return this.t()(pill.labelKey);
  }
  statusText(s) {
    return this.t()(STATUS_VALUE_LABEL[s]);
  }
  decide(approved) {
    const o = this.open();
    if (!o) return;
    const cmt = this.decisionComment().trim();
    if (!approved && cmt.length < 3) return;
    this.store.actions.decideCorrection(o.id, approved, cmt || "Approuv\xE9e apr\xE8s v\xE9rification du justificatif.");
    this.closeDialog();
    if (approved) this.snackbar.success(this.t()("qualite.v2.corr.approved"));
    else this.snackbar.info(this.t()("qualite.v2.corr.refused"));
  }
}, _a.\u0275fac = function QualiteCorrectionsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-qualite-corrections-page"]],
  decls: 31,
  vars: 26,
  consts: [
    [
      "perm",
      "correction.manage",
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
      "card",
      "mt-6",
      "p-2"
    ],
    [
      1,
      "toolbar",
      "p-0"
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
      1,
      "mt-2",
      "grid",
      "gap-2",
      "sm:grid-cols-3"
    ],
    [
      "variant",
      "compact",
      "leadingIcon",
      "apartment",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      "variant",
      "compact",
      "leadingIcon",
      "edit",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      "variant",
      "compact",
      "leadingIcon",
      "event_note",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      1,
      "mt-4",
      "flex",
      "flex-wrap",
      "items-center",
      "gap-2"
    ],
    [
      "aria-live",
      "polite",
      1,
      "sub"
    ],
    [
      1,
      "tabular-nums",
      2,
      "color",
      "var(--v2-encre)"
    ],
    [
      "type",
      "button",
      1,
      "reveal"
    ],
    [
      1,
      "card",
      "mt-3",
      "overflow-hidden"
    ],
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
      "icon",
      "edit",
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
      "role",
      "radio",
      3,
      "click"
    ],
    [1, "n"],
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
      "close",
      3,
      "size"
    ],
    [1, "overflow-x-auto"],
    [
      1,
      "tbl",
      "min-w-[920px]"
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
      "block",
      "font-bold"
    ],
    [
      1,
      "sub",
      "block",
      "max-w-48",
      "truncate"
    ],
    [
      1,
      "max-w-64",
      "truncate",
      2,
      "color",
      "var(--v2-ardoise)",
      3,
      "title"
    ],
    [1, "font-medium"],
    [
      1,
      "whitespace-nowrap",
      "tabular-nums",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [1, "badge"],
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
      "task_alt",
      3,
      "size"
    ],
    [
      1,
      "text-[16px]",
      "font-extrabold"
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
      "gap-4",
      "pb-5"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-3",
      "rounded-[18px]",
      "p-3",
      2,
      "background",
      "var(--v2-creme)"
    ],
    [
      1,
      "grid",
      "gap-2"
    ],
    [1, "chg"],
    [1, "lbl"],
    [
      1,
      "mt-1",
      "text-[15px]",
      "font-semibold"
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
      1,
      "notice",
      3,
      "background",
      "color"
    ],
    [1, "sub"],
    [
      "routerLink",
      "/dashboard/audit",
      1,
      "font-bold",
      "underline",
      "underline-offset-4",
      3,
      "click"
    ],
    [
      "modal-footer",
      "",
      1,
      "contents"
    ],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-ghost"
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
      "font-extrabold",
      "underline-offset-4",
      "hover:underline",
      3,
      "click",
      "routerLink"
    ],
    [
      1,
      "sub",
      "block"
    ],
    [1, "font-extrabold"],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-2",
      "tabular-nums"
    ],
    [1, "from"],
    [
      "name",
      "arrow_forward",
      2,
      "color",
      "var(--v2-gris-texte)",
      3,
      "size"
    ],
    [1, "to"],
    [
      "name",
      "warning",
      3,
      "size"
    ],
    [
      "for",
      "decision",
      1,
      "lbl"
    ],
    [
      1,
      "sub",
      "mt-1"
    ],
    [
      "id",
      "decision",
      1,
      "area",
      "mt-2",
      3,
      "input",
      "placeholder",
      "value"
    ],
    [1, "notice"],
    [
      3,
      "name",
      "size"
    ],
    [
      1,
      "block",
      "font-semibold"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-danger",
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
    [1, "btn-chip"],
    [
      "name",
      "check",
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
      3,
      "click"
    ]
  ],
  template: function QualiteCorrectionsPage_Template(rf, ctx) {
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
      __elementStart(9, "div", 6)(10, "div", 7)(11, "label", 8);
      __element(12, "ui-icon", 9);
      __elementStart(13, "input", 10);
      __listener("input", function QualiteCorrectionsPage_Template_input_input_13_listener($event) {
        return ctx.patchF({ q: $event.target.value });
      });
      __elementEnd()();
      __elementStart(14, "div", 11);
      __repeaterCreate(15, QualiteCorrectionsPage_For_16_Template, 4, 7, "button", 12, _forTrack0);
      __elementEnd()();
      __elementStart(17, "div", 13)(18, "ui-select", 14);
      __listener("valueChange", function QualiteCorrectionsPage_Template_ui_select_valueChange_18_listener($event) {
        return ctx.patchF({ scoop: $event });
      });
      __elementEnd();
      __elementStart(19, "ui-select", 15);
      __listener("valueChange", function QualiteCorrectionsPage_Template_ui_select_valueChange_19_listener($event) {
        return ctx.patchF({ field: $event });
      });
      __elementEnd();
      __elementStart(20, "ui-select", 16);
      __listener("valueChange", function QualiteCorrectionsPage_Template_ui_select_valueChange_20_listener($event) {
        return ctx.sort.set($event);
      });
      __elementEnd()()();
      __elementStart(21, "div", 17)(22, "p", 18)(23, "b", 19);
      __text(24);
      __elementEnd();
      __text(25);
      __elementEnd();
      __conditionalCreate(26, QualiteCorrectionsPage_Conditional_26_Template, 3, 3, "button", 20);
      __elementEnd();
      __elementStart(27, "section", 21);
      __conditionalCreate(28, QualiteCorrectionsPage_Conditional_28_Template, 22, 8)(29, QualiteCorrectionsPage_Conditional_29_Template, 5, 2, "div", 22);
      __elementEnd();
      __conditionalCreate(30, QualiteCorrectionsPage_Conditional_30_Template, 21, 13, "ui-modal", 23);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_24_0;
      __property("area", ctx.t()("qualite.corrections.area"));
      __advance(3);
      __textInterpolate(ctx.t()("qualite.header.title"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("qualite.nav.corrections"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("qualite.corrections.description"), " ");
      __advance();
      __property("stats", ctx.stats());
      __advance(4);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("qualite.corrections.searchPlaceholder"))("value", ctx.f().q);
      __attribute("aria-label", ctx.t()("qualite.corrections.searchAria"));
      __advance();
      __attribute("aria-label", ctx.t()("qualite.corrections.col.status"));
      __advance();
      __repeater(ctx.statusPills());
      __advance(3);
      __property("label", ctx.t()("qualite.corrections.scoopLabel"))("options", ctx.scoopOptions())("value", ctx.f().scoop);
      __advance();
      __property("label", ctx.t()("qualite.corrections.fieldLabel"))("options", ctx.fieldOptions())("value", ctx.f().field);
      __advance();
      __property("label", ctx.t()("qualite.corrections.sortAria"))("options", ctx.sortOptions())("value", ctx.sort());
      __advance(4);
      __textInterpolate(ctx.nf.format(ctx.rows().length));
      __advance();
      __textInterpolate1(" ", ctx.t()("qualite.corrections.ofTotal", __pureFunction1(24, _c0, ctx.nf.format(ctx.counts().total))), " ");
      __advance();
      __conditional(ctx.activeFilters() > 0 ? 26 : -1);
      __advance(2);
      __conditional(ctx.rows().length ? 28 : 29);
      __advance(2);
      __conditional((tmp_24_0 = ctx.open()) ? 30 : -1, tmp_24_0);
    }
  },
  dependencies: [
    AppShellComponent,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    RouterLink,
    SelectComponent,
    StatCardsComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".chg[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 6px;\n        border-radius: 16px;\n        border: 1px solid var(--%NS%v2-bord-carte);\n        padding: 12px 14px;\n      }\n      @media (min-width: 640px) {\n        .chg[_ngcontent-%COMP%] {\n          grid-template-columns: 9rem 1fr;\n          align-items: center;\n        }\n      }\n      .from[_ngcontent-%COMP%] {\n        border-radius: 8px;\n        background: var(--%NS%v2-lin);\n        padding: 2px 8px;\n        color: var(--%NS%v2-gris-texte);\n        text-decoration: line-through;\n      }\n      .to[_ngcontent-%COMP%] {\n        border-radius: 8px;\n        background: var(--%NS%v2-sauge);\n        padding: 2px 8px;\n        font-weight: 800;\n        color: var(--%NS%v2-vert-pousse);\n      }"]
}), _a);

export { QualiteCorrectionsPage as default };
//# sourceMappingURL=qualite.corrections.page-CuxIGfi-.mjs.map

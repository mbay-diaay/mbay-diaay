import { i as inject, F as signal, c as computed, ɵ as __defineComponent, d as RouterLink, f as __elementStart, g as __text, h as __elementEnd, b as __element, H as __listener, m as __repeaterCreate, j as __conditionalCreate, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, u as __attribute, v as __repeater, r as __pureFunction1, s as __conditional, L as __getCurrentView, w as __nextContext, z as __classProp, x as __pureFunction2, t as __styleProp, N as __textInterpolate2, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, j as nf, i as inScope, J as AccessDeniedError } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
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
var _c0 = (a0) => ({ count: a0 });
var _c1 = (a0) => ({ type: a0 });
var _c2 = (a0) => ["/dashboard/producteurs", a0];
var _c3 = (a0) => ({ n: a0 });
var _c4 = (a0, a1) => ({
  n: a0,
  status: a1
});
var _forTrack0 = ($index, $item) => $item.id;
function QualiteAlertesPage_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 18);
    __listener("click", function QualiteAlertesPage_For_16_Template_button_click_0_listener() {
      const statusButton_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      ctx_r2.status.set(statusButton_r2.id);
      return __resetView(ctx_r2.selected.set([]));
    });
    __text(1);
    __elementStart(2, "span", 19);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const statusButton_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __classProp("on", ctx_r2.status() === statusButton_r2.id);
    __attribute("aria-checked", ctx_r2.status() === statusButton_r2.id);
    __advance();
    __textInterpolate1(" ", statusButton_r2.label);
    __advance();
    __classProp("zero", !statusButton_r2.count);
    __advance();
    __textInterpolate(ctx_r2.nf.format(statusButton_r2.count));
  }
}
function QualiteAlertesPage_Conditional_20_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "input", 27);
    __listener("change", function QualiteAlertesPage_Conditional_20_Conditional_5_Template_input_change_0_listener($event) {
      __restoreView(_r4);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.togglePage($event.target.checked));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __property("checked", ctx_r2.allPageSelected());
    __attribute("aria-label", ctx_r2.t()("qualite.alertes.selectAll"));
  }
}
function QualiteAlertesPage_Conditional_20_For_20_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "input", 27);
    __listener("change", function QualiteAlertesPage_Conditional_20_For_20_Conditional_2_Template_input_change_0_listener() {
      __restoreView(_r7);
      const alert_r6 = __nextContext().$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.toggle(alert_r6.id));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const alert_r6 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __property("checked", ctx_r2.selected().includes(alert_r6.id));
    __attribute("aria-label", ctx_r2.t()("qualite.alertes.selectOne", __pureFunction1(2, _c1, alert_r6.type)));
  }
}
function QualiteAlertesPage_Conditional_20_For_20_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = __getCurrentView();
    __elementStart(0, "button", 37);
    __listener("click", function QualiteAlertesPage_Conditional_20_For_20_Conditional_23_Template_button_click_0_listener() {
      __restoreView(_r8);
      const alert_r6 = __nextContext().$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.openDecision([alert_r6.id], "r\xE9solu"));
    });
    __element(1, "ui-icon", 38);
    __elementEnd();
    __elementStart(2, "button", 39);
    __listener("click", function QualiteAlertesPage_Conditional_20_For_20_Conditional_23_Template_button_click_2_listener() {
      __restoreView(_r8);
      const alert_r6 = __nextContext().$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.openDecision([alert_r6.id], "rejet\xE9"));
    });
    __element(3, "ui-icon", 40);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __property("title", ctx_r2.t()("qualite.alertes.resolve"));
    __attribute("aria-label", ctx_r2.t()("qualite.alertes.resolve"));
    __advance();
    __property("size", 18);
    __advance();
    __property("title", ctx_r2.t()("qualite.alertes.reject"));
    __attribute("aria-label", ctx_r2.t()("qualite.alertes.reject"));
    __advance();
    __property("size", 18);
  }
}
function QualiteAlertesPage_Conditional_20_For_20_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 36);
    __element(1, "ui-icon", 41);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __property("routerLink", __pureFunction1(4, _c2, ctx))("title", ctx_r2.t()("qualite.v2.alertes.open"));
    __attribute("aria-label", ctx_r2.t()("qualite.v2.alertes.open"));
    __advance();
    __property("size", 18);
  }
}
function QualiteAlertesPage_Conditional_20_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "tr", 28);
    __listener("click", function QualiteAlertesPage_Conditional_20_For_20_Template_tr_click_0_listener() {
      const alert_r6 = __restoreView(_r5).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.canDecide() && ctx_r2.toggle(alert_r6.id));
    });
    __elementStart(1, "td", 28);
    __listener("click", function QualiteAlertesPage_Conditional_20_For_20_Template_td_click_1_listener($event) {
      return $event.stopPropagation();
    });
    __conditionalCreate(2, QualiteAlertesPage_Conditional_20_For_20_Conditional_2_Template, 1, 4, "input", 23);
    __elementEnd();
    __elementStart(3, "td")(4, "span", 29);
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 30);
    __text(7);
    __elementEnd()();
    __elementStart(8, "td")(9, "span", 31);
    __text(10);
    __elementEnd();
    __elementStart(11, "span", 32);
    __text(12);
    __elementEnd()();
    __elementStart(13, "td", 33);
    __text(14);
    __elementEnd();
    __elementStart(15, "td")(16, "span", 34);
    __text(17);
    __elementEnd()();
    __elementStart(18, "td")(19, "span", 34);
    __text(20);
    __elementEnd()();
    __elementStart(21, "td", 28);
    __listener("click", function QualiteAlertesPage_Conditional_20_For_20_Template_td_click_21_listener($event) {
      return $event.stopPropagation();
    });
    __elementStart(22, "span", 35);
    __conditionalCreate(23, QualiteAlertesPage_Conditional_20_For_20_Conditional_23_Template, 4, 6);
    __conditionalCreate(24, QualiteAlertesPage_Conditional_20_For_20_Conditional_24_Template, 2, 6, "a", 36);
    __elementEnd()()();
  }
  if (rf & 2) {
    let tmp_26_0;
    const alert_r6 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __classProp("row-link", ctx_r2.canDecide());
    __advance(2);
    __conditional(ctx_r2.canDecide() ? 2 : -1);
    __advance(3);
    __textInterpolate(alert_r6.type);
    __advance();
    __property("title", alert_r6.detail);
    __advance();
    __textInterpolate(alert_r6.detail);
    __advance(3);
    __textInterpolate(ctx_r2.entityName(alert_r6));
    __advance(2);
    __textInterpolate(ctx_r2.t()(alert_r6.entity === "producteur" ? "qualite.alertes.entity.producteur" : "qualite.alertes.entity.parcelle"));
    __advance(2);
    __textInterpolate(alert_r6.enumerator);
    __advance(2);
    __styleProp("background", ctx_r2.sev[alert_r6.severity].bg)("color", ctx_r2.sev[alert_r6.severity].fg);
    __advance();
    __textInterpolate(ctx_r2.t()(ctx_r2.sev[alert_r6.severity].label));
    __advance(2);
    __styleProp("background", ctx_r2.stat[alert_r6.status].bg)("color", ctx_r2.stat[alert_r6.status].fg);
    __advance();
    __textInterpolate(ctx_r2.t()(ctx_r2.stat[alert_r6.status].label));
    __advance(3);
    __conditional(ctx_r2.canDecide() && (alert_r6.status === "ouvert" || alert_r6.status === "en v\xE9rification") ? 23 : -1);
    __advance();
    __conditional((tmp_26_0 = ctx_r2.ownerOf(alert_r6)) ? 24 : -1, tmp_26_0);
  }
}
function QualiteAlertesPage_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 20)(1, "table", 21)(2, "thead")(3, "tr")(4, "th", 22);
    __conditionalCreate(5, QualiteAlertesPage_Conditional_20_Conditional_5_Template, 1, 2, "input", 23);
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
    __elementStart(16, "th", 24);
    __text(17);
    __elementEnd()()();
    __elementStart(18, "tbody");
    __repeaterCreate(19, QualiteAlertesPage_Conditional_20_For_20_Template, 25, 21, "tr", 25, _forTrack0);
    __elementEnd()()();
    __element(21, "ui-pagination", 26);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(5);
    __conditional(ctx_r2.canDecide() ? 5 : -1);
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.alertes.col.type"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.alertes.col.entity"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.alertes.col.enumerator"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.alertes.col.severity"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.alertes.col.status"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("organisations.col.actions"));
    __advance(2);
    __repeater(ctx_r2.pager.items());
    __advance(2);
    __property("pager", ctx_r2.pager);
  }
}
function QualiteAlertesPage_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 15)(1, "span", 42);
    __element(2, "ui-icon", 43);
    __elementEnd();
    __elementStart(3, "p", 44);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.alertes.empty"));
  }
}
function QualiteAlertesPage_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = __getCurrentView();
    __elementStart(0, "div", 16)(1, "span", 45);
    __text(2);
    __elementEnd();
    __elementStart(3, "button", 46);
    __listener("click", function QualiteAlertesPage_Conditional_22_Template_button_click_3_listener() {
      __restoreView(_r9);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.selected.set([]));
    });
    __text(4);
    __elementEnd();
    __elementStart(5, "button", 47);
    __listener("click", function QualiteAlertesPage_Conditional_22_Template_button_click_5_listener() {
      __restoreView(_r9);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.openDecision(ctx_r2.selected(), "en v\xE9rification"));
    });
    __element(6, "ui-icon", 41);
    __text(7);
    __elementEnd();
    __elementStart(8, "button", 48);
    __listener("click", function QualiteAlertesPage_Conditional_22_Template_button_click_8_listener() {
      __restoreView(_r9);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.openDecision(ctx_r2.selected(), "rejet\xE9"));
    });
    __element(9, "ui-icon", 40);
    __text(10);
    __elementEnd();
    __elementStart(11, "button", 49);
    __listener("click", function QualiteAlertesPage_Conditional_22_Template_button_click_11_listener() {
      __restoreView(_r9);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.openDecision(ctx_r2.selected(), "r\xE9solu"));
    });
    __element(12, "ui-icon", 38);
    __text(13);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __attribute("aria-label", ctx_r2.t()("qualite.alertes.selected", __pureFunction1(9, _c3, ctx_r2.selected().length)));
    __advance(2);
    __textInterpolate(ctx_r2.t()("qualite.alertes.selected", __pureFunction1(11, _c3, ctx_r2.selected().length)));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("qualite.alertes.deselect"), " ");
    __advance(2);
    __property("size", 16);
    __advance();
    __textInterpolate1("", ctx_r2.t()("qualite.alertes.verifyShort"), " ");
    __advance(2);
    __property("size", 16);
    __advance();
    __textInterpolate1("", ctx_r2.t()("qualite.alertes.reject"), " ");
    __advance(2);
    __property("size", 16);
    __advance();
    __textInterpolate1("", ctx_r2.t()("qualite.alertes.resolve"), " ");
  }
}
function QualiteAlertesPage_Conditional_23_For_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 52)(1, "span", 58);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 34);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const alert_r11 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(2);
    __textInterpolate2("", alert_r11.type, " \xB7 ", ctx_r2.entityName(alert_r11));
    __advance();
    __styleProp("background", ctx_r2.sev[alert_r11.severity].bg)("color", ctx_r2.sev[alert_r11.severity].fg);
    __advance();
    __textInterpolate(ctx_r2.t()(ctx_r2.sev[alert_r11.severity].label));
  }
}
function QualiteAlertesPage_Conditional_23_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 57);
    __element(1, "ui-icon", 38);
    __elementEnd();
  }
  if (rf & 2) {
    __advance();
    __property("size", 18);
  }
}
function QualiteAlertesPage_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "ui-modal", 50);
    __listener("closed", function QualiteAlertesPage_Conditional_23_Template_ui_modal_closed_0_listener() {
      __restoreView(_r10);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.pending.set(null));
    });
    __elementStart(1, "ul", 51);
    __repeaterCreate(2, QualiteAlertesPage_Conditional_23_For_3_Template, 5, 7, "li", 52, _forTrack0);
    __elementEnd();
    __elementStart(4, "label", 53);
    __text(5);
    __elementEnd();
    __elementStart(6, "textarea", 54);
    __listener("input", function QualiteAlertesPage_Conditional_23_Template_textarea_input_6_listener($event) {
      __restoreView(_r10);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.comment.set($event.target.value));
    });
    __elementEnd();
    __elementStart(7, "button", 55);
    __listener("click", function QualiteAlertesPage_Conditional_23_Template_button_click_7_listener() {
      __restoreView(_r10);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.pending.set(null));
    });
    __text(8);
    __elementEnd();
    __elementStart(9, "button", 56);
    __listener("click", function QualiteAlertesPage_Conditional_23_Template_button_click_9_listener() {
      __restoreView(_r10);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.confirmDecision());
    });
    __text(10);
    __conditionalCreate(11, QualiteAlertesPage_Conditional_23_Conditional_11_Template, 2, 1, "span", 57);
    __elementEnd()();
  }
  if (rf & 2) {
    const decision_r12 = ctx;
    const ctx_r2 = __nextContext();
    __property("tone", decision_r12.status === "rejet\xE9" ? "danger" : "default")("open", true)("title", ctx_r2.t()("qualite.alertes.dialog.title", __pureFunction2(16, _c4, decision_r12.ids.length, ctx_r2.t()(ctx_r2.stat[decision_r12.status].label))))("description", ctx_r2.t()("qualite.alertes.dialog.description"))("width", 580)("closeLabel", ctx_r2.t()("common.close"));
    __advance(2);
    __repeater(ctx_r2.pendingAlerts());
    __advance(3);
    __textInterpolate(ctx_r2.t()("qualite.common.comment"));
    __advance();
    __property("placeholder", ctx_r2.t()("qualite.alertes.dialog.commentPlaceholder"))("value", ctx_r2.comment());
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("common.cancel"), " ");
    __advance();
    __classProp("btn-danger", decision_r12.status === "rejet\xE9")("btn-primary", decision_r12.status !== "rejet\xE9");
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("qualite.alertes.dialog.submit"), " ");
    __advance();
    __conditional(decision_r12.status !== "rejet\xE9" ? 11 : -1);
  }
}
var STATUSES = [
  "ouvert",
  "en v\xE9rification",
  "r\xE9solu",
  "rejet\xE9"
];
var STATUS = {
  ouvert: {
    label: "qualite.alertes.statusValue.ouvert",
    tab: "qualite.alertes.status.ouvert",
    ...TONE.attente
  },
  "en v\xE9rification": {
    label: "qualite.alertes.statusValue.en v\xE9rification",
    tab: "qualite.alertes.status.en v\xE9rification",
    ...TONE.info
  },
  r\u00E9solu: {
    label: "qualite.alertes.statusValue.r\xE9solu",
    tab: "qualite.alertes.status.r\xE9solu",
    ...TONE.succes
  },
  rejet\u00E9: {
    label: "qualite.alertes.statusValue.rejet\xE9",
    tab: "qualite.alertes.status.rejet\xE9",
    ...TONE.neutre
  }
};
var SEVERITY = {
  \u00E9lev\u00E9e: {
    label: "qualite.alertes.severity.\xE9lev\xE9e",
    ...TONE.erreur
  },
  moyenne: {
    label: "qualite.alertes.severity.moyenne",
    ...TONE.attente
  },
  faible: {
    label: "qualite.alertes.severity.faible",
    ...TONE.neutre
  }
};
var RANK = {
  \u00E9lev\u00E9e: 0,
  moyenne: 1,
  faible: 2
};
var norm = (v) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
var QualiteAlertesPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.snackbar = inject(SnackbarService);
    this.t = this.locale.t;
    this.nf = nf;
    this.stat = STATUS;
    this.sev = SEVERITY;
    this.q = signal("", ...[]);
    this.status = signal("ouvert", ...[]);
    this.severity = signal("", ...[]);
    this.selected = signal([], ...[]);
    this.comment = signal("", ...[]);
    this.pending = signal(null, ...[]);
    this.canDecide = computed(() => this.store.can("alert.manage"), ...[]);
    this.mine = computed(() => {
      const s = this.store.state();
      const prod = new Set(inScope(s.producers, s.session).map((p) => p.id));
      const plots = new Set(s.plots.filter((p) => prod.has(p.producerId)).map((p) => p.id));
      return s.alerts.filter((a) => prod.has(a.entityId) || plots.has(a.entityId));
    }, ...[]);
    this.names = computed(() => {
      const s = this.store.state();
      return {
        producer: new Map(s.producers.map((p) => [p.id, `${p.firstName} ${p.lastName}`])),
        plot: new Map(s.plots.map((p) => [p.id, {
          code: p.code,
          owner: p.producerId
        }]))
      };
    }, ...[]);
    this.base = computed(() => {
      const needle = norm(this.q().trim());
      const sev = this.severity();
      return this.mine().filter((a) => (!sev || a.severity === sev) && (!needle || norm(`${a.type} ${a.detail} ${a.enumerator} ${this.entityName(a)}`).includes(needle)));
    }, ...[]);
    this.statusButtons = computed(() => {
      const t = this.t();
      const base = this.base();
      return [...STATUSES.map((st) => ({
        id: st,
        label: t(STATUS[st].tab),
        count: base.filter((a) => a.status === st).length
      })), {
        id: "__all",
        label: t("qualite.common.all"),
        count: base.length
      }];
    }, ...[]);
    this.severityOptions = computed(() => [{
      value: "",
      label: this.t()("qualite.v2.alertes.severityAll")
    }, ...[
      "\xE9lev\xE9e",
      "moyenne",
      "faible"
    ].map((s) => ({
      value: s,
      label: this.t()(SEVERITY[s].label)
    }))], ...[]);
    this.rows = computed(() => {
      const st = this.status();
      return this.base().filter((a) => st === "__all" || a.status === st).sort((a, b) => RANK[a.severity] - RANK[b.severity] || a.id.localeCompare(b.id));
    }, ...[]);
    this.pager = createPager(() => this.rows());
    this.stats = computed(() => {
      var _a2, _b;
      const t = this.t();
      const all = this.mine();
      const n = (st) => all.filter((a) => a.status === st).length;
      const open = all.filter((a) => a.status === "ouvert");
      const types = /* @__PURE__ */ new Map();
      for (const a of open) types.set(a.type, ((_a2 = types.get(a.type)) != null ? _a2 : 0) + 1);
      const top = [...types].sort((a, b) => b[1] - a[1])[0];
      return [
        {
          label: t("qualite.v2.alertes.stat.open"),
          value: nf.format(open.length),
          sub: t("qualite.v2.alertes.stat.openSub", { count: open.filter((a) => a.severity === "\xE9lev\xE9e").length }),
          icon: "warning",
          bg: "",
          fg: ""
        },
        {
          label: t("qualite.v2.alertes.stat.verify"),
          value: nf.format(n("en v\xE9rification")),
          sub: t("qualite.v2.alertes.stat.verifySub"),
          icon: "visibility",
          ...TONE.info
        },
        {
          label: t("qualite.v2.alertes.stat.resolved"),
          value: nf.format(n("r\xE9solu")),
          sub: t("qualite.v2.alertes.stat.resolvedSub", { count: n("rejet\xE9") }),
          icon: "task_alt",
          ...TONE.succes
        },
        {
          label: t("qualite.v2.alertes.stat.top"),
          value: top ? nf.format(top[1]) : "\u2014",
          sub: (_b = top == null ? void 0 : top[0]) != null ? _b : "\u2014",
          icon: "analytics",
          ...TONE.attente
        }
      ];
    }, ...[]);
    this.allPageSelected = computed(() => {
      const ids = this.pager.items().map((a) => a.id);
      return ids.length > 0 && ids.every((id) => this.selected().includes(id));
    }, ...[]);
    this.pendingAlerts = computed(() => {
      const p = this.pending();
      return p ? this.mine().filter((a) => p.ids.includes(a.id)) : [];
    }, ...[]);
  }
  entityName(a) {
    var _a2, _b;
    const n = this.names();
    if (a.entity === "producteur") return (_a2 = n.producer.get(a.entityId)) != null ? _a2 : a.entityId;
    const pl = n.plot.get(a.entityId);
    return pl ? `${pl.code} \xB7 ${(_b = n.producer.get(pl.owner)) != null ? _b : ""}` : a.entityId;
  }
  /** Producteur à ouvrir : la personne, ou le propriétaire de la parcelle. */
  ownerOf(a) {
    var _a2, _b;
    if (a.entity === "producteur") return a.entityId;
    return (_b = (_a2 = this.names().plot.get(a.entityId)) == null ? void 0 : _a2.owner) != null ? _b : null;
  }
  toggle(id) {
    this.selected.update((list) => list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  }
  togglePage(on) {
    const ids = this.pager.items().map((a) => a.id);
    this.selected.update((list) => on ? [.../* @__PURE__ */ new Set([...list, ...ids])] : list.filter((x) => !ids.includes(x)));
  }
  openDecision(ids, status) {
    this.comment.set("");
    this.pending.set({
      ids: [...ids],
      status
    });
  }
  confirmDecision() {
    const p = this.pending();
    if (!p) return;
    try {
      this.store.actions.updateAlerts(p.ids, p.status, this.comment().trim());
    } catch (e) {
      this.snackbar.error(e instanceof AccessDeniedError ? this.locale.tNow(e.key) : String(e));
      return;
    }
    this.pending.set(null);
    this.selected.update((list) => list.filter((id) => !p.ids.includes(id)));
    this.snackbar.success(this.t()("qualite.alertes.dialog.updated", { n: p.ids.length }));
  }
}, _a.\u0275fac = function QualiteAlertesPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-qualite-alertes-page"]],
  decls: 24,
  vars: 19,
  consts: [
    [
      "perm",
      "alert.manage",
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
      "variant",
      "compact",
      "leadingIcon",
      "warning",
      1,
      "min-w-[200px]",
      3,
      "valueChange",
      "label",
      "options",
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
      1,
      "flex",
      "flex-col",
      "items-center",
      "gap-3",
      "p-10",
      "text-center"
    ],
    [
      "role",
      "region",
      1,
      "bulk",
      "mt-4"
    ],
    [
      "icon",
      "fact_check",
      3,
      "tone",
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
    [1, "overflow-x-auto"],
    [
      1,
      "tbl",
      "min-w-[960px]"
    ],
    [1, "w-10"],
    [
      "type",
      "checkbox",
      3,
      "checked"
    ],
    [1, "text-right"],
    [3, "row-link"],
    [
      1,
      "px-5",
      "pb-5",
      3,
      "pager"
    ],
    [
      "type",
      "checkbox",
      3,
      "change",
      "checked"
    ],
    [3, "click"],
    [
      1,
      "block",
      "font-bold"
    ],
    [
      1,
      "sub",
      "block",
      "max-w-[320px]",
      "truncate",
      3,
      "title"
    ],
    [
      1,
      "block",
      "font-semibold"
    ],
    [
      1,
      "sub",
      "block"
    ],
    [1, "font-medium"],
    [1, "badge"],
    [
      1,
      "flex",
      "justify-end",
      "gap-2"
    ],
    [
      1,
      "act",
      3,
      "routerLink",
      "title"
    ],
    [
      "type",
      "button",
      1,
      "act",
      "act-ok",
      3,
      "click",
      "title"
    ],
    [
      "name",
      "check",
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
      1,
      "flex-1",
      "text-[14px]",
      "font-extrabold"
    ],
    [
      "type",
      "button",
      1,
      "b",
      2,
      "color",
      "var(--v2-blanc)",
      3,
      "click"
    ],
    [
      "type",
      "button",
      1,
      "b",
      2,
      "background",
      "var(--v2-info-bg)",
      "color",
      "var(--v2-info-fg)",
      3,
      "click"
    ],
    [
      "type",
      "button",
      1,
      "b",
      2,
      "background",
      "var(--v2-erreur-bg)",
      "color",
      "var(--v2-erreur-fg)",
      3,
      "click"
    ],
    [
      "type",
      "button",
      1,
      "b",
      2,
      "background",
      "var(--v2-citron)",
      "color",
      "var(--v2-foret)",
      3,
      "click"
    ],
    [
      "icon",
      "fact_check",
      3,
      "closed",
      "tone",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      1,
      "mb-4",
      "max-h-48",
      "overflow-y-auto",
      "rounded-[16px]",
      "border",
      2,
      "border-color",
      "var(--v2-bord-carte)"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "gap-3",
      "border-t",
      "px-4",
      "py-2.5",
      "text-[14px]",
      "first:border-t-0",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      "for",
      "alert-comment",
      1,
      "lbl"
    ],
    [
      "id",
      "alert-comment",
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
      3,
      "click"
    ],
    [1, "btn-chip"],
    [
      1,
      "min-w-0",
      "truncate",
      "font-bold"
    ]
  ],
  template: function QualiteAlertesPage_Template(rf, ctx) {
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
      __elementStart(9, "div", 6)(10, "label", 7);
      __element(11, "ui-icon", 8);
      __elementStart(12, "input", 9);
      __listener("input", function QualiteAlertesPage_Template_input_input_12_listener($event) {
        return ctx.q.set($event.target.value);
      });
      __elementEnd()();
      __elementStart(13, "ui-select", 10);
      __listener("valueChange", function QualiteAlertesPage_Template_ui_select_valueChange_13_listener($event) {
        return ctx.severity.set($event);
      });
      __elementEnd();
      __elementStart(14, "div", 11);
      __repeaterCreate(15, QualiteAlertesPage_For_16_Template, 4, 7, "button", 12, _forTrack0);
      __elementEnd()();
      __elementStart(17, "p", 13);
      __text(18);
      __elementEnd();
      __elementStart(19, "section", 14);
      __conditionalCreate(20, QualiteAlertesPage_Conditional_20_Template, 22, 8)(21, QualiteAlertesPage_Conditional_21_Template, 5, 2, "div", 15);
      __elementEnd();
      __conditionalCreate(22, QualiteAlertesPage_Conditional_22_Template, 14, 13, "div", 16);
      __conditionalCreate(23, QualiteAlertesPage_Conditional_23_Template, 12, 19, "ui-modal", 17);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_17_0;
      __property("area", ctx.t()("qualite.alertes.area"));
      __advance(3);
      __textInterpolate(ctx.t()("qualite.header.title"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("qualite.alertes.area"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("qualite.alertes.description"), " ");
      __advance();
      __property("stats", ctx.stats());
      __advance(3);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("qualite.alertes.searchPlaceholder"))("value", ctx.q());
      __attribute("aria-label", ctx.t()("qualite.alertes.searchAria"));
      __advance();
      __property("label", ctx.t()("qualite.alertes.filter.severity"))("options", ctx.severityOptions())("value", ctx.severity());
      __advance();
      __attribute("aria-label", ctx.t()("qualite.alertes.status.aria"));
      __advance();
      __repeater(ctx.statusButtons());
      __advance(3);
      __textInterpolate1(" ", ctx.t()("qualite.v2.alertes.count", __pureFunction1(17, _c0, ctx.nf.format(ctx.rows().length))), " ");
      __advance(2);
      __conditional(ctx.rows().length ? 20 : 21);
      __advance(2);
      __conditional(ctx.selected().length ? 22 : -1);
      __advance();
      __conditional((tmp_17_0 = ctx.pending()) ? 23 : -1, tmp_17_0);
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
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", '.bulk[_ngcontent-%COMP%] {\n        position: sticky;\n        bottom: 16px;\n        z-index: 20;\n        display: flex;\n        flex-wrap: wrap;\n        align-items: center;\n        gap: 8px;\n        border-radius: 20px;\n        background: var(--%NS%v2-foret);\n        padding: 10px 10px 10px 18px;\n        color: var(--%NS%v2-blanc);\n        box-shadow: var(--%NS%v2-ombre-flottant);\n      }\n      .bulk[_ngcontent-%COMP%]   .b[_ngcontent-%COMP%] {\n        display: inline-flex;\n        height: 40px;\n        align-items: center;\n        gap: 6px;\n        border-radius: 12px;\n        padding: 0 14px;\n        font-size: 14px;\n        font-weight: 800;\n        cursor: pointer;\n      }\n      .tbl[_ngcontent-%COMP%]   input[type="checkbox"][_ngcontent-%COMP%] {\n        height: 18px;\n        width: 18px;\n        accent-color: var(--%NS%v2-foret);\n        cursor: pointer;\n      }\n      .act-ok[_ngcontent-%COMP%]:hover {\n        border-color: var(--%NS%v2-vert-pousse);\n        background: var(--%NS%v2-sauge);\n        color: var(--%NS%v2-vert-pousse);\n      }']
}), _a);

export { QualiteAlertesPage as default };
//# sourceMappingURL=qualite.alertes.page-CwN1CTTQ.mjs.map

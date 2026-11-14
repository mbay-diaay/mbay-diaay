import { i as inject, A as ActivatedRoute, c as computed, F as signal, e as effect, ɵ as __defineComponent, d as RouterLink, f as __elementStart, j as __conditionalCreate, h as __elementEnd, n as __property, o as __advance, s as __conditional, aa as input, b as __element, g as __text, m as __repeaterCreate, H as __listener, p as __textInterpolate, v as __repeater, L as __getCurrentView, w as __nextContext, t as __styleProp, a6 as __repeaterTrackByIndex, I as __twoWayListener, r as __pureFunction1, q as __textInterpolate1, N as __textInterpolate2, K as __twoWayProperty, z as __classProp, x as __pureFunction2, V as __repeaterTrackByIdentity, u as __attribute, O as __restoreView, P as __resetView, a1 as __sanitizeUrl, Q as __twoWayBindingSet } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { L as LocaleService, f as fmtDateTime, h as fmtDate, a3 as scopedMeetings, s as scopedMembers, a4 as attendanceStats, a5 as canEditMinutes, j as nf, a6 as isMeetingEditable, J as AccessDeniedError } from './locale.service-c0QhtcVY.mjs';
import { M as MEETING_KIND_LABEL, a as MEETING_STATUS_LABEL, b as MeetingFormDialogComponent } from './meeting-form-dialog.component-BwzxH9Pe.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { m as DetailHeroComponent, M as ModalComponent, g as StatCardsComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';
import { i as initialsOf, T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
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
var _c0$1 = (a0) => ({ date: a0 });
var _c1$1 = (a0, a1) => ({
  by: a0,
  date: a1
});
var _forTrack0$1 = ($index, $item) => $item.id;
function MeetingDecisionsComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 22);
    __listener("click", function MeetingDecisionsComponent_Conditional_8_Template_button_click_0_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.openAdd());
    });
    __element(1, "ui-icon", 23);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("decisions.add"));
  }
}
function MeetingDecisionsComponent_For_11_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 28);
    __element(1, "ui-icon", 34);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const decision_r3 = __nextContext().$implicit;
    const ctx_r1 = __nextContext();
    __classProp("late", ctx_r1.isLate(decision_r3));
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate2("", ctx_r1.t()("decisions.due", __pureFunction1(5, _c0$1, ctx_r1.fmtDate(decision_r3.dueDate))), "", ctx_r1.isLate(decision_r3) ? " \xB7 " + ctx_r1.t()("decisions.late") : "", " ");
  }
}
function MeetingDecisionsComponent_For_11_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 31);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("decisions.noDue"));
  }
}
function MeetingDecisionsComponent_For_11_Conditional_12_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    __elementStart(0, "p", 32);
    __text(1);
    __elementStart(2, "span", 35);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const decision_r3 = __nextContext().$implicit;
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate1(" ", decision_r3.closingNote, " ");
    __advance(2);
    __textInterpolate(ctx_r1.t()("decisions.closedBy", __pureFunction2(2, _c1$1, (_a2 = decision_r3.closedBy) != null ? _a2 : "", decision_r3.closedAt ? ctx_r1.fmtDate(decision_r3.closedAt) : "")));
  }
}
function MeetingDecisionsComponent_For_11_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "button", 22);
    __listener("click", function MeetingDecisionsComponent_For_11_Conditional_13_Conditional_1_Template_button_click_0_listener() {
      __restoreView(_r5);
      const decision_r3 = __nextContext(2).$implicit;
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.start(decision_r3));
    });
    __element(1, "ui-icon", 37);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("decisions.start"));
  }
}
function MeetingDecisionsComponent_For_11_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "span", 33);
    __conditionalCreate(1, MeetingDecisionsComponent_For_11_Conditional_13_Conditional_1_Template, 3, 2, "button", 5);
    __elementStart(2, "button", 22);
    __listener("click", function MeetingDecisionsComponent_For_11_Conditional_13_Template_button_click_2_listener() {
      __restoreView(_r4);
      const decision_r3 = __nextContext().$implicit;
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.openClose(decision_r3));
    });
    __element(3, "ui-icon", 36);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const decision_r3 = __nextContext().$implicit;
    const ctx_r1 = __nextContext();
    __advance();
    __conditional(decision_r3.status === "ouverte" ? 1 : -1);
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("decisions.close"));
  }
}
function MeetingDecisionsComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "article", 7)(1, "div", 24)(2, "p", 25);
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 26);
    __text(5);
    __elementEnd()();
    __elementStart(6, "p", 27)(7, "span", 28);
    __element(8, "ui-icon", 29);
    __text(9);
    __elementEnd();
    __conditionalCreate(10, MeetingDecisionsComponent_For_11_Conditional_10_Template, 3, 7, "span", 30)(11, MeetingDecisionsComponent_For_11_Conditional_11_Template, 2, 1, "span", 31);
    __elementEnd();
    __conditionalCreate(12, MeetingDecisionsComponent_For_11_Conditional_12_Template, 4, 5, "p", 32)(13, MeetingDecisionsComponent_For_11_Conditional_13_Template, 5, 3, "span", 33);
    __elementEnd();
  }
  if (rf & 2) {
    const decision_r3 = ctx.$implicit;
    const ctx_r1 = __nextContext();
    __advance(3);
    __textInterpolate(decision_r3.text);
    __advance();
    __styleProp("background", ctx_r1.statusStyle[decision_r3.status].bg)("color", ctx_r1.statusStyle[decision_r3.status].fg);
    __advance();
    __textInterpolate(ctx_r1.t()(ctx_r1.statusStyle[decision_r3.status].label));
    __advance(3);
    __property("size", 16);
    __advance();
    __textInterpolate(decision_r3.ownerName);
    __advance();
    __conditional(decision_r3.dueDate ? 10 : 11);
    __advance(2);
    __conditional(decision_r3.status === "cl\xF4tur\xE9e" ? 12 : ctx_r1.canManage() ? 13 : -1);
  }
}
function MeetingDecisionsComponent_ForEmpty_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 8);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate(ctx_r1.meeting().status === "tenue" ? ctx_r1.t()("decisions.empty") : ctx_r1.t()("decisions.notHeld"));
  }
}
function MeetingDecisionsComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 14);
    __element(1, "ui-icon", 38);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx);
  }
}
function MeetingDecisionsComponent_Conditional_28_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 14);
    __element(1, "ui-icon", 38);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r1.t()("errors.decision.closingNote"));
  }
}
function MeetingDecisionsComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "ui-modal", 39);
    __listener("closed", function MeetingDecisionsComponent_Conditional_28_Template_ui_modal_closed_0_listener() {
      __restoreView(_r6);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.closing.set(null));
    });
    __elementStart(1, "label", 40);
    __text(2);
    __elementEnd();
    __elementStart(3, "textarea", 41);
    __listener("input", function MeetingDecisionsComponent_Conditional_28_Template_textarea_input_3_listener($event) {
      __restoreView(_r6);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.note.set($event.target.value));
    });
    __elementEnd();
    __conditionalCreate(4, MeetingDecisionsComponent_Conditional_28_Conditional_4_Template, 3, 2, "p", 14);
    __elementStart(5, "p", 42);
    __text(6);
    __elementEnd();
    __elementStart(7, "button", 17);
    __listener("click", function MeetingDecisionsComponent_Conditional_28_Template_button_click_7_listener() {
      __restoreView(_r6);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.closing.set(null));
    });
    __text(8);
    __elementEnd();
    __elementStart(9, "button", 18);
    __listener("click", function MeetingDecisionsComponent_Conditional_28_Template_button_click_9_listener() {
      const closingDecision_r7 = __restoreView(_r6);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.submitClose(closingDecision_r7));
    });
    __text(10);
    __elementStart(11, "span", 19);
    __element(12, "ui-icon", 20);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __property("open", true)("title", ctx_r1.t()("decisions.closeTitle"))("description", ctx.text)("width", 580)("closeLabel", ctx_r1.t()("common.close"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("decisions.field.note"));
    __advance();
    __property("placeholder", ctx_r1.t()("decisions.field.notePh"))("value", ctx_r1.note());
    __advance();
    __conditional(ctx_r1.noteTried() && ctx_r1.note().trim().length < 5 ? 4 : -1);
    __advance(2);
    __textInterpolate(ctx_r1.t()("decisions.closeLocked"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("common.cancel"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("decisions.closeSubmit"));
    __advance(2);
    __property("size", 18);
  }
}
var STATUS_STYLE = {
  ouverte: {
    label: "decisions.status.ouverte",
    ...TONE.attente
  },
  "en cours": {
    label: "decisions.status.enCours",
    ...TONE.info
  },
  cl\u00F4tur\u00E9e: {
    label: "decisions.status.cloturee",
    ...TONE.succes
  }
};
var MeetingDecisionsComponent = (_a = class {
  constructor() {
    this.meeting = input.required(...[]);
    this.store = inject(StoreService);
    this.snackbar = inject(SnackbarService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.fmtDate = fmtDate;
    this.statusStyle = STATUS_STYLE;
    this.canManage = computed(() => this.store.can("decision.manage"), ...[]);
    this.canAdd = computed(() => this.canManage() && this.meeting().status === "tenue", ...[]);
    this.decisions = computed(() => {
      const rank = (decision) => decision.status === "cl\xF4tur\xE9e" ? 1 : 0;
      return [...this.meeting().decisions].sort((first, second) => {
        var _a2, _b2;
        return rank(first) - rank(second) || ((_a2 = first.dueDate) != null ? _a2 : "9999").localeCompare((_b2 = second.dueDate) != null ? _b2 : "9999");
      });
    }, ...[]);
    this.addOpen = signal(false, ...[]);
    this.text = signal("", ...[]);
    this.owner = signal("", ...[]);
    this.dueDate = signal("", ...[]);
    this.addTried = signal(false, ...[]);
    this.closing = signal(null, ...[]);
    this.note = signal("", ...[]);
    this.noteTried = signal(false, ...[]);
    this.addErrors = computed(() => {
      if (!this.addTried()) return {};
      const t = this.t();
      const errors = {};
      if (this.text().trim().length < 5) errors.text = t("errors.decision.text");
      if (this.owner().trim().length < 3) errors.owner = t("errors.decision.owner");
      return errors;
    }, ...[]);
  }
  isLate(decision) {
    return decision.status !== "cl\xF4tur\xE9e" && !!decision.dueDate && decision.dueDate < (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  }
  openAdd() {
    this.text.set("");
    this.owner.set("");
    this.dueDate.set("");
    this.addTried.set(false);
    this.addOpen.set(true);
  }
  submitAdd() {
    this.addTried.set(true);
    if (Object.keys(this.addErrors()).length) return;
    const result = this.store.actions.addMeetingDecision(this.meeting().id, {
      text: this.text(),
      ownerName: this.owner(),
      dueDate: this.dueDate() || null
    });
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.locale.tNow("decisions.added"));
    this.addOpen.set(false);
  }
  start(decision) {
    const result = this.store.actions.setDecisionStatus(this.meeting().id, decision.id, "en cours");
    if (!result.ok) this.snackbar.error(result.error);
    else this.snackbar.success(this.locale.tNow("decisions.started"));
  }
  openClose(decision) {
    this.note.set("");
    this.noteTried.set(false);
    this.closing.set(decision);
  }
  submitClose(decision) {
    this.noteTried.set(true);
    if (this.note().trim().length < 5) return;
    const result = this.store.actions.setDecisionStatus(this.meeting().id, decision.id, "cl\xF4tur\xE9e", this.note());
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.locale.tNow("decisions.closed"));
    this.closing.set(null);
  }
}, _a.\u0275fac = function MeetingDecisionsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-meeting-decisions"]],
  hostAttrs: [1, "block"],
  inputs: { meeting: [1, "meeting"] },
  decls: 29,
  vars: 26,
  consts: [
    [1, "sec-card"],
    [1, "sec-head"],
    [1, "sec-ico"],
    [
      "name",
      "gavel",
      3,
      "size"
    ],
    [1, "n"],
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
      "border-t",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [1, "decision"],
    [
      1,
      "sub",
      "p-5"
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
      "gap-4",
      "sm:grid-cols-2"
    ],
    [1, "sm:col-span-2"],
    [
      "for",
      "decision-text",
      1,
      "lbl"
    ],
    [
      "id",
      "decision-text",
      1,
      "area",
      "mt-2",
      3,
      "input",
      "placeholder",
      "value"
    ],
    [
      "role",
      "alert",
      1,
      "mt-1.5",
      "flex",
      "items-center",
      "gap-1.5",
      "text-[13px]",
      "font-bold",
      2,
      "color",
      "var(--v2-erreur-fg)"
    ],
    [
      "preset",
      "firstName",
      3,
      "valueChange",
      "label",
      "placeholder",
      "value",
      "error"
    ],
    [
      "type",
      "date",
      "icon",
      "calendar_today",
      3,
      "valueChange",
      "label",
      "optional",
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
      "icon",
      "task_alt",
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
      "btn-ghost",
      2,
      "height",
      "40px",
      3,
      "click"
    ],
    [
      "name",
      "add",
      3,
      "size"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-start",
      "justify-between",
      "gap-2"
    ],
    [
      1,
      "min-w-0",
      "flex-1",
      "text-[15px]",
      "font-bold"
    ],
    [1, "badge"],
    [
      1,
      "sub",
      "flex",
      "flex-wrap",
      "items-center",
      "gap-x-4",
      "gap-y-1"
    ],
    [
      1,
      "inline-flex",
      "items-center",
      "gap-1.5"
    ],
    [
      "name",
      "person",
      3,
      "size"
    ],
    [
      1,
      "inline-flex",
      "items-center",
      "gap-1.5",
      3,
      "late"
    ],
    [1, "zero"],
    [1, "closing"],
    [
      1,
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      "name",
      "schedule",
      3,
      "size"
    ],
    [
      1,
      "sub",
      "block"
    ],
    [
      "name",
      "task_alt",
      3,
      "size"
    ],
    [
      "name",
      "progress_activity",
      3,
      "size"
    ],
    [
      "name",
      "warning",
      3,
      "size"
    ],
    [
      "icon",
      "task_alt",
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
      "decision-note",
      1,
      "lbl"
    ],
    [
      "id",
      "decision-note",
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
      "mt-3"
    ]
  ],
  template: function MeetingDecisionsComponent_Template(rf, ctx) {
    var _a2;
    if (rf & 1) {
      __elementStart(0, "section", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      __element(4, "ui-icon", 3);
      __elementEnd();
      __text(5);
      __elementStart(6, "span", 4);
      __text(7);
      __elementEnd()();
      __conditionalCreate(8, MeetingDecisionsComponent_Conditional_8_Template, 3, 2, "button", 5);
      __elementEnd();
      __elementStart(9, "div", 6);
      __repeaterCreate(10, MeetingDecisionsComponent_For_11_Template, 14, 10, "article", 7, _forTrack0$1, false, MeetingDecisionsComponent_ForEmpty_12_Template, 2, 1, "p", 8);
      __elementEnd()();
      __elementStart(13, "ui-modal", 9);
      __listener("closed", function MeetingDecisionsComponent_Template_ui_modal_closed_13_listener() {
        return ctx.addOpen.set(false);
      });
      __elementStart(14, "div", 10)(15, "div", 11)(16, "label", 12);
      __text(17);
      __elementEnd();
      __elementStart(18, "textarea", 13);
      __listener("input", function MeetingDecisionsComponent_Template_textarea_input_18_listener($event) {
        return ctx.text.set($event.target.value);
      });
      __elementEnd();
      __conditionalCreate(19, MeetingDecisionsComponent_Conditional_19_Template, 3, 2, "p", 14);
      __elementEnd();
      __elementStart(20, "ui-text-field", 15);
      __listener("valueChange", function MeetingDecisionsComponent_Template_ui_text_field_valueChange_20_listener($event) {
        return ctx.owner.set($event);
      });
      __elementEnd();
      __elementStart(21, "ui-text-field", 16);
      __listener("valueChange", function MeetingDecisionsComponent_Template_ui_text_field_valueChange_21_listener($event) {
        return ctx.dueDate.set($event);
      });
      __elementEnd()();
      __elementStart(22, "button", 17);
      __listener("click", function MeetingDecisionsComponent_Template_button_click_22_listener() {
        return ctx.addOpen.set(false);
      });
      __text(23);
      __elementEnd();
      __elementStart(24, "button", 18);
      __listener("click", function MeetingDecisionsComponent_Template_button_click_24_listener() {
        return ctx.submitAdd();
      });
      __text(25);
      __elementStart(26, "span", 19);
      __element(27, "ui-icon", 20);
      __elementEnd()()();
      __conditionalCreate(28, MeetingDecisionsComponent_Conditional_28_Template, 13, 13, "ui-modal", 21);
    }
    if (rf & 2) {
      let tmp_13_0;
      let tmp_25_0;
      __advance(4);
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("decisions.title"));
      __advance(2);
      __textInterpolate(ctx.meeting().decisions.length);
      __advance();
      __conditional(ctx.canAdd() ? 8 : -1);
      __advance(2);
      __repeater(ctx.decisions());
      __advance(3);
      __property("open", ctx.addOpen())("title", ctx.t()("decisions.addTitle"))("description", ctx.t()("decisions.addDescription"))("width", 620)("closeLabel", ctx.t()("common.close"));
      __advance(4);
      __textInterpolate(ctx.t()("decisions.field.text"));
      __advance();
      __property("placeholder", ctx.t()("decisions.field.textPh"))("value", ctx.text());
      __advance();
      __conditional((tmp_13_0 = ctx.addErrors().text) ? 19 : -1, tmp_13_0);
      __advance();
      __property("label", ctx.t()("decisions.field.owner"))("placeholder", ctx.t()("decisions.field.ownerPh"))("value", ctx.owner())("error", (_a2 = ctx.addErrors().owner) != null ? _a2 : "");
      __advance();
      __property("label", ctx.t()("decisions.field.due"))("optional", ctx.t()("decisions.optional"))("placeholder", ctx.t()("decisions.field.duePh"))("value", ctx.dueDate());
      __advance(2);
      __textInterpolate(ctx.t()("common.cancel"));
      __advance(2);
      __textInterpolate(ctx.t()("decisions.addSubmit"));
      __advance(2);
      __property("size", 18);
      __advance();
      __conditional((tmp_25_0 = ctx.closing()) ? 28 : -1, tmp_25_0);
    }
  },
  dependencies: [
    IconComponent,
    ModalComponent,
    TextFieldComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".decision[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 8px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 16px 20px;\n      }\n      .decision[_ngcontent-%COMP%]:first-child {\n        border-top: none;\n      }\n      .late[_ngcontent-%COMP%] {\n        color: var(--%NS%v2-erreur-fg);\n        font-weight: 800;\n      }\n      .closing[_ngcontent-%COMP%] {\n        border-radius: 14px;\n        background: var(--%NS%v2-creme);\n        padding: 10px 12px;\n        font-size: 14px;\n        font-weight: 600;\n      }"]
}), _a);
var _c0 = (a0) => ({
  label: a0,
  link: "/dashboard/reunions"
});
var _c1 = (a0) => ({ reason: a0 });
var _c2 = (a0) => ({ name: a0 });
var _c3 = (a0, a1) => ({
  by: a0,
  date: a1
});
var _c4 = (a0, a1) => ({
  present: a0,
  absent: a1
});
var _c5 = (a0) => ({ rate: a0 });
var _c6 = (a0, a1) => ({
  present: a0,
  total: a1
});
var _forTrack0 = ($index, $item) => $item.id;
function ReunionDetailPage_Conditional_1_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "button", 39);
    __listener("click", function ReunionDetailPage_Conditional_1_Conditional_1_Conditional_1_Template_button_click_0_listener() {
      __restoreView(_r3);
      const ctx_r3 = __nextContext(3);
      return __resetView(ctx_r3.openEditDialog());
    });
    __element(1, "ui-icon", 40);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(3);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("reunions.detail.edit"), " ");
  }
}
function ReunionDetailPage_Conditional_1_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "button", 41);
    __listener("click", function ReunionDetailPage_Conditional_1_Conditional_1_Conditional_2_Template_button_click_0_listener() {
      __restoreView(_r5);
      const ctx_r3 = __nextContext(3);
      return __resetView(ctx_r3.openHoldDialog());
    });
    __element(1, "ui-icon", 42);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(3);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("reunions.detail.hold"), " ");
  }
}
function ReunionDetailPage_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = __getCurrentView();
    __elementStart(0, "div", 3);
    __conditionalCreate(1, ReunionDetailPage_Conditional_1_Conditional_1_Conditional_1_Template, 3, 2, "button", 35);
    __conditionalCreate(2, ReunionDetailPage_Conditional_1_Conditional_1_Conditional_2_Template, 3, 2, "button", 36);
    __elementStart(3, "button", 37);
    __listener("click", function ReunionDetailPage_Conditional_1_Conditional_1_Template_button_click_3_listener() {
      __restoreView(_r2);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.openCancelDialog());
    });
    __element(4, "ui-icon", 38);
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const current_r6 = __nextContext();
    const ctx_r3 = __nextContext();
    __advance();
    __conditional(ctx_r3.canEditMeeting(current_r6) ? 1 : -1);
    __advance();
    __conditional(ctx_r3.isPast(current_r6.date) ? 2 : -1);
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("reunions.detail.cancel"), " ");
  }
}
function ReunionDetailPage_Conditional_1_Conditional_2_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    __elementStart(0, "p", 4);
    __element(1, "ui-icon", 43);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const current_r6 = __nextContext();
    const ctx_r3 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("reunions.detail.cancelledReason", __pureFunction1(2, _c1, (_a2 = current_r6.cancelReason) != null ? _a2 : "")), " ");
  }
}
function ReunionDetailPage_Conditional_1_For_16_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li")(1, "span", 44);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 45);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const line_r7 = ctx.$implicit;
    const \u0275$index_54_r8 = ctx.$index;
    __advance(2);
    __textInterpolate(\u0275$index_54_r8 + 1);
    __advance(2);
    __textInterpolate(line_r7);
  }
}
function ReunionDetailPage_Conditional_1_ForEmpty_17_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 14);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("reunions.detail.agendaNone"), " ");
  }
}
function ReunionDetailPage_Conditional_1_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 46);
    __text(1);
    __elementStart(2, "span", 27);
    __element(3, "ui-icon", 47);
    __elementEnd()();
    __elementStart(4, "p", 48);
    __text(5);
    __elementEnd();
  }
  if (rf & 2) {
    const current_r6 = __nextContext();
    const ctx_r3 = __nextContext();
    __property("href", current_r6.onlineUrl, __sanitizeUrl);
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("reunions.detail.join"));
    __advance(2);
    __property("size", 18);
    __advance(2);
    __textInterpolate(current_r6.onlineUrl);
  }
}
function ReunionDetailPage_Conditional_1_Conditional_27_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 49);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const name_r9 = ctx.$implicit;
    __advance();
    __textInterpolate(name_r9);
  }
}
function ReunionDetailPage_Conditional_1_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ul", 17);
    __repeaterCreate(1, ReunionDetailPage_Conditional_1_Conditional_27_For_2_Template, 2, 1, "li", 49, __repeaterTrackByIdentity);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __repeater(ctx_r3.convokedNames());
  }
}
function ReunionDetailPage_Conditional_1_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 18);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r3.t()("reunions.detail.convokedNone"));
  }
}
function ReunionDetailPage_Conditional_1_Conditional_29_Conditional_9_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 57);
    __element(1, "ui-icon", 43);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(4);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate1("", ctx_r3.t()("reunions.minutes.emptyText"), " ");
  }
}
function ReunionDetailPage_Conditional_1_Conditional_29_Conditional_9_Conditional_6_Template(rf, ctx) {
  var _a2, _b2;
  if (rf & 1) {
    __elementStart(0, "p", 58);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const current_r6 = __nextContext(3);
    const ctx_r3 = __nextContext();
    __advance();
    __textInterpolate(ctx_r3.t()("reunions.minutes.author", __pureFunction1(1, _c2, (_b2 = (_a2 = current_r6.minutes) == null ? void 0 : _a2.authorName) != null ? _b2 : "")));
  }
}
function ReunionDetailPage_Conditional_1_Conditional_29_Conditional_9_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 59);
    __element(1, "ui-icon", 63);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(4);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r3.t()("reunions.minutes.authorCannotValidate"));
  }
}
function ReunionDetailPage_Conditional_1_Conditional_29_Conditional_9_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "label", 54);
    __text(1);
    __elementEnd();
    __elementStart(2, "p", 55);
    __text(3);
    __elementEnd();
    __elementStart(4, "textarea", 56);
    __listener("input", function ReunionDetailPage_Conditional_1_Conditional_29_Conditional_9_Template_textarea_input_4_listener($event) {
      __restoreView(_r10);
      const ctx_r3 = __nextContext(3);
      return __resetView(ctx_r3.minutesDraft = $event.target.value);
    });
    __elementEnd();
    __conditionalCreate(5, ReunionDetailPage_Conditional_1_Conditional_29_Conditional_9_Conditional_5_Template, 3, 2, "p", 57);
    __conditionalCreate(6, ReunionDetailPage_Conditional_1_Conditional_29_Conditional_9_Conditional_6_Template, 2, 3, "p", 58);
    __conditionalCreate(7, ReunionDetailPage_Conditional_1_Conditional_29_Conditional_9_Conditional_7_Template, 3, 2, "p", 59);
    __elementStart(8, "div", 60)(9, "button", 61);
    __listener("click", function ReunionDetailPage_Conditional_1_Conditional_29_Conditional_9_Template_button_click_9_listener() {
      __restoreView(_r10);
      const ctx_r3 = __nextContext(3);
      return __resetView(ctx_r3.saveMinutesDraft());
    });
    __text(10);
    __elementEnd();
    __elementStart(11, "button", 62);
    __listener("click", function ReunionDetailPage_Conditional_1_Conditional_29_Conditional_9_Template_button_click_11_listener() {
      __restoreView(_r10);
      const ctx_r3 = __nextContext(3);
      return __resetView(ctx_r3.openValidateConfirm());
    });
    __text(12);
    __elementStart(13, "span", 27);
    __element(14, "ui-icon", 28);
    __elementEnd()()();
  }
  if (rf & 2) {
    const current_r6 = __nextContext(2);
    const ctx_r3 = __nextContext();
    __advance();
    __textInterpolate(ctx_r3.t()("reunions.minutes.text"));
    __advance(2);
    __textInterpolate(ctx_r3.t()("reunions.minutes.textHint"));
    __advance();
    __property("value", ctx_r3.minutesDraft);
    __advance();
    __conditional(ctx_r3.minutesTried() && !ctx_r3.minutesDraft.trim() ? 5 : -1);
    __advance();
    __conditional(((_a2 = current_r6.minutes) == null ? void 0 : _a2.authorName) ? 6 : -1);
    __advance();
    __conditional(ctx_r3.isMinutesAuthor() ? 7 : -1);
    __advance(3);
    __textInterpolate1(" ", ctx_r3.t()("reunions.minutes.save"), " ");
    __advance();
    __property("disabled", !ctx_r3.minutesDraft.trim() || ctx_r3.isMinutesAuthor());
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("reunions.minutes.validate"));
    __advance(2);
    __property("size", 18);
  }
}
function ReunionDetailPage_Conditional_1_Conditional_29_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 58);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const current_r6 = __nextContext(3);
    const ctx_r3 = __nextContext();
    __advance();
    __textInterpolate(ctx_r3.t()("reunions.minutes.author", __pureFunction1(1, _c2, current_r6.minutes.authorName)));
  }
}
function ReunionDetailPage_Conditional_1_Conditional_29_Conditional_10_Conditional_3_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    __elementStart(0, "p", 65);
    __element(1, "ui-icon", 42);
    __text(2);
    __elementEnd();
    __elementStart(3, "p", 58);
    __text(4);
    __elementEnd();
  }
  if (rf & 2) {
    const current_r6 = __nextContext(3);
    const ctx_r3 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("reunions.minutes.validatedBy", __pureFunction2(3, _c3, (_a2 = current_r6.minutes.validatedBy) != null ? _a2 : "", current_r6.minutes.validatedAt ? ctx_r3.fmtDate(current_r6.minutes.validatedAt) : "")), " ");
    __advance(2);
    __textInterpolate(ctx_r3.t()("reunions.minutes.lockedNote"));
  }
}
function ReunionDetailPage_Conditional_1_Conditional_29_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 64);
    __text(1);
    __elementEnd();
    __conditionalCreate(2, ReunionDetailPage_Conditional_1_Conditional_29_Conditional_10_Conditional_2_Template, 2, 3, "p", 58);
    __conditionalCreate(3, ReunionDetailPage_Conditional_1_Conditional_29_Conditional_10_Conditional_3_Template, 5, 6);
  }
  if (rf & 2) {
    const current_r6 = __nextContext(2);
    __advance();
    __textInterpolate(current_r6.minutes.text);
    __advance();
    __conditional(current_r6.minutes.authorName ? 2 : -1);
    __advance();
    __conditional(current_r6.minutes.status === "valid\xE9" ? 3 : -1);
  }
}
function ReunionDetailPage_Conditional_1_Conditional_29_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 53);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r3.t()("reunions.minutes.readonlyNone"));
  }
}
function ReunionDetailPage_Conditional_1_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 8)(1, "div", 9)(2, "h2")(3, "span", 10);
    __element(4, "ui-icon", 50);
    __elementEnd();
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 51);
    __text(7);
    __elementEnd()();
    __elementStart(8, "div", 52);
    __conditionalCreate(9, ReunionDetailPage_Conditional_1_Conditional_29_Conditional_9_Template, 15, 10)(10, ReunionDetailPage_Conditional_1_Conditional_29_Conditional_10_Template, 4, 3)(11, ReunionDetailPage_Conditional_1_Conditional_29_Conditional_11_Template, 2, 1, "p", 53);
    __elementEnd()();
  }
  if (rf & 2) {
    const current_r6 = __nextContext();
    const ctx_r3 = __nextContext();
    __advance(4);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("reunions.minutes.title"), " ");
    __advance();
    __styleProp("background", ctx_r3.minutesTone(current_r6).bg)("color", ctx_r3.minutesTone(current_r6).fg);
    __advance();
    __textInterpolate(ctx_r3.minutesStatusLabel(current_r6));
    __advance(2);
    __conditional(ctx_r3.minutesEditable() ? 9 : current_r6.minutes ? 10 : 11);
  }
}
function ReunionDetailPage_Conditional_1_Conditional_30_Template(rf, ctx) {
  if (rf & 1) __element(0, "app-meeting-decisions", 19);
  if (rf & 2) {
    const current_r6 = __nextContext();
    __property("meeting", current_r6);
  }
}
function ReunionDetailPage_Conditional_1_Conditional_32_Conditional_13_For_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 71)(1, "span", 72);
    __text(2);
    __elementEnd();
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const presentMember_r11 = ctx.$implicit;
    const ctx_r3 = __nextContext(4);
    __advance(2);
    __textInterpolate(ctx_r3.initials(presentMember_r11.firstName + " " + presentMember_r11.lastName));
    __advance();
    __textInterpolate2("", presentMember_r11.firstName, " ", presentMember_r11.lastName);
  }
}
function ReunionDetailPage_Conditional_1_Conditional_32_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 69);
    __text(1);
    __elementEnd();
    __elementStart(2, "div", 70);
    __repeaterCreate(3, ReunionDetailPage_Conditional_1_Conditional_32_Conditional_13_For_4_Template, 4, 3, "span", 71, _forTrack0);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r3.t()("reunions.attendance.presentList"));
    __advance(2);
    __repeater(ctx_r3.present());
  }
}
function ReunionDetailPage_Conditional_1_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 8)(1, "div", 9)(2, "h2")(3, "span", 10);
    __element(4, "ui-icon", 15);
    __elementEnd();
    __text(5);
    __elementEnd()();
    __elementStart(6, "div", 52)(7, "p", 66);
    __text(8);
    __elementEnd();
    __elementStart(9, "span", 67);
    __element(10, "span");
    __elementEnd();
    __elementStart(11, "p", 68);
    __text(12);
    __elementEnd();
    __conditionalCreate(13, ReunionDetailPage_Conditional_1_Conditional_32_Conditional_13_Template, 5, 1);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance(4);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("reunions.attendance.sectionTitle"), " ");
    __advance(3);
    __textInterpolate1(" ", ctx_r3.t()("reunions.attendance.summary", __pureFunction2(7, _c4, ctx_r3.stats().present, ctx_r3.stats().absent)), " ");
    __advance(2);
    __styleProp("width", ctx_r3.stats().rate, "%");
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("reunions.attendance.rate", __pureFunction1(10, _c5, ctx_r3.stats().rate)), " ");
    __advance();
    __conditional(ctx_r3.present().length ? 13 : -1);
  }
}
function ReunionDetailPage_Conditional_1_For_43_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li");
    __element(1, "span", 73);
    __elementStart(2, "span", 45)(3, "span", 74);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 75);
    __text(6);
    __elementEnd()()();
  }
  if (rf & 2) {
    const event_r12 = ctx.$implicit;
    const ctx_r3 = __nextContext(2);
    __advance(4);
    __textInterpolate(ctx_r3.historyLabel(event_r12.action));
    __advance(2);
    __textInterpolate(ctx_r3.t()("reunions.detail.historyBy", __pureFunction2(2, _c3, event_r12.by, ctx_r3.fmtDateTime(event_r12.at))));
  }
}
function ReunionDetailPage_Conditional_1_Conditional_46_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = __getCurrentView();
    __elementStart(0, "li")(1, "label")(2, "input", 80);
    __listener("change", function ReunionDetailPage_Conditional_1_Conditional_46_For_7_Template_input_change_2_listener($event) {
      const member_r15 = __restoreView(_r14).$implicit;
      const ctx_r3 = __nextContext(3);
      return __resetView(ctx_r3.toggleHold(member_r15.id, $event));
    });
    __elementEnd();
    __elementStart(3, "span", 81);
    __text(4);
    __elementEnd();
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const member_r15 = ctx.$implicit;
    const ctx_r3 = __nextContext(3);
    __advance(2);
    __property("checked", ctx_r3.holdPresentIds().includes(member_r15.id));
    __advance(2);
    __textInterpolate(ctx_r3.initials(member_r15.firstName + " " + member_r15.lastName));
    __advance();
    __textInterpolate2(" ", member_r15.firstName, " ", member_r15.lastName, " ");
  }
}
function ReunionDetailPage_Conditional_1_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "div", 76)(1, "p", 77);
    __text(2);
    __elementEnd();
    __elementStart(3, "button", 78);
    __listener("click", function ReunionDetailPage_Conditional_1_Conditional_46_Template_button_click_3_listener() {
      __restoreView(_r13);
      const ctx_r3 = __nextContext(2);
      return __resetView(ctx_r3.toggleHoldAll());
    });
    __text(4);
    __elementEnd()();
    __elementStart(5, "ul", 79);
    __repeaterCreate(6, ReunionDetailPage_Conditional_1_Conditional_46_For_7_Template, 6, 4, "li", null, _forTrack0);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("reunions.attendance.counter", __pureFunction2(3, _c6, ctx_r3.holdPresentIds().length, ctx_r3.scoopMembers().length)), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r3.holdAllSelected() ? ctx_r3.t()("reunions.attendance.uncheckAll") : ctx_r3.t()("reunions.attendance.checkAll"), " ");
    __advance();
    __attribute("aria-label", ctx_r3.t()("reunions.attendance.listAria"));
    __advance();
    __repeater(ctx_r3.scoopMembers());
  }
}
function ReunionDetailPage_Conditional_1_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 24);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r3.t()("reunions.attendance.noMembers"));
  }
}
function ReunionDetailPage_Conditional_1_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 33);
    __element(1, "ui-icon", 43);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext(2);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("reunions.minutes.confirmUnsaved"), " ");
  }
}
function ReunionDetailPage_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "ui-detail-hero", 2);
    __conditionalCreate(1, ReunionDetailPage_Conditional_1_Conditional_1_Template, 6, 4, "div", 3);
    __elementEnd();
    __conditionalCreate(2, ReunionDetailPage_Conditional_1_Conditional_2_Template, 3, 4, "p", 4);
    __element(3, "ui-stat-cards", 5);
    __elementStart(4, "div", 6)(5, "div", 7)(6, "section", 8)(7, "div", 9)(8, "h2")(9, "span", 10);
    __element(10, "ui-icon", 11);
    __elementEnd();
    __text(11);
    __elementStart(12, "span", 12);
    __text(13);
    __elementEnd()()();
    __elementStart(14, "ol", 13);
    __repeaterCreate(15, ReunionDetailPage_Conditional_1_For_16_Template, 5, 2, "li", null, __repeaterTrackByIndex, false, ReunionDetailPage_Conditional_1_ForEmpty_17_Template, 2, 1, "li", 14);
    __elementEnd()();
    __elementStart(18, "section", 8)(19, "div", 9)(20, "h2")(21, "span", 10);
    __element(22, "ui-icon", 15);
    __elementEnd();
    __text(23);
    __elementEnd()();
    __elementStart(24, "p", 16);
    __text(25);
    __elementEnd();
    __conditionalCreate(26, ReunionDetailPage_Conditional_1_Conditional_26_Template, 6, 4);
    __conditionalCreate(27, ReunionDetailPage_Conditional_1_Conditional_27_Template, 3, 0, "ul", 17)(28, ReunionDetailPage_Conditional_1_Conditional_28_Template, 2, 1, "p", 18);
    __elementEnd();
    __conditionalCreate(29, ReunionDetailPage_Conditional_1_Conditional_29_Template, 12, 8, "section", 8);
    __conditionalCreate(30, ReunionDetailPage_Conditional_1_Conditional_30_Template, 1, 1, "app-meeting-decisions", 19);
    __elementEnd();
    __elementStart(31, "div", 7);
    __conditionalCreate(32, ReunionDetailPage_Conditional_1_Conditional_32_Template, 14, 12, "section", 8);
    __elementStart(33, "section", 8)(34, "div", 9)(35, "h2")(36, "span", 10);
    __element(37, "ui-icon", 20);
    __elementEnd();
    __text(38);
    __elementStart(39, "span", 12);
    __text(40);
    __elementEnd()()();
    __elementStart(41, "ol", 21);
    __repeaterCreate(42, ReunionDetailPage_Conditional_1_For_43_Template, 7, 5, "li", null, __repeaterTrackByIndex);
    __elementEnd()()()();
    __elementStart(44, "app-meeting-form-dialog", 22);
    __twoWayListener("openChange", function ReunionDetailPage_Conditional_1_Template_app_meeting_form_dialog_openChange_44_listener($event) {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      __twoWayBindingSet(ctx_r3.editOpen, $event) || (ctx_r3.editOpen = $event);
      return __resetView($event);
    });
    __listener("notify", function ReunionDetailPage_Conditional_1_Template_app_meeting_form_dialog_notify_44_listener($event) {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.onMeetingFormNotify($event));
    });
    __elementEnd();
    __elementStart(45, "ui-modal", 23);
    __listener("closed", function ReunionDetailPage_Conditional_1_Template_ui_modal_closed_45_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.closeHoldDialog());
    });
    __conditionalCreate(46, ReunionDetailPage_Conditional_1_Conditional_46_Template, 8, 6)(47, ReunionDetailPage_Conditional_1_Conditional_47_Template, 2, 1, "p", 24);
    __elementStart(48, "button", 25);
    __listener("click", function ReunionDetailPage_Conditional_1_Template_button_click_48_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.closeHoldDialog());
    });
    __text(49);
    __elementEnd();
    __elementStart(50, "button", 26);
    __listener("click", function ReunionDetailPage_Conditional_1_Template_button_click_50_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.submitHoldMeeting());
    });
    __text(51);
    __elementStart(52, "span", 27);
    __element(53, "ui-icon", 28);
    __elementEnd()()();
    __elementStart(54, "ui-modal", 29);
    __listener("closed", function ReunionDetailPage_Conditional_1_Template_ui_modal_closed_54_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.closeCancelDialog());
    });
    __elementStart(55, "label", 30);
    __text(56);
    __elementEnd();
    __elementStart(57, "textarea", 31);
    __listener("input", function ReunionDetailPage_Conditional_1_Template_textarea_input_57_listener($event) {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.cancelReasonText = $event.target.value);
    });
    __elementEnd();
    __elementStart(58, "button", 25);
    __listener("click", function ReunionDetailPage_Conditional_1_Template_button_click_58_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.closeCancelDialog());
    });
    __text(59);
    __elementEnd();
    __elementStart(60, "button", 32);
    __listener("click", function ReunionDetailPage_Conditional_1_Template_button_click_60_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.submitCancelMeeting());
    });
    __text(61);
    __elementEnd()();
    __elementStart(62, "ui-modal", 23);
    __listener("closed", function ReunionDetailPage_Conditional_1_Template_ui_modal_closed_62_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.closeValidateConfirm());
    });
    __conditionalCreate(63, ReunionDetailPage_Conditional_1_Conditional_63_Template, 3, 2, "p", 33);
    __elementStart(64, "button", 25);
    __listener("click", function ReunionDetailPage_Conditional_1_Template_button_click_64_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.closeValidateConfirm());
    });
    __text(65);
    __elementEnd();
    __elementStart(66, "button", 34);
    __listener("click", function ReunionDetailPage_Conditional_1_Template_button_click_66_listener() {
      __restoreView(_r1);
      const ctx_r3 = __nextContext();
      return __resetView(ctx_r3.confirmValidateMinutes());
    });
    __text(67);
    __elementStart(68, "span", 27);
    __element(69, "ui-icon", 28);
    __elementEnd()()();
  }
  if (rf & 2) {
    const current_r6 = ctx;
    const ctx_r3 = __nextContext();
    __property("crumb", __pureFunction1(57, _c0, ctx_r3.t()("reunions.title")))("title", current_r6.title)("eyebrow", ctx_r3.t()(ctx_r3.MEETING_KIND_LABEL[current_r6.kind]))("badges", ctx_r3.heroBadges())("meta", ctx_r3.heroMeta())("backLabel", ctx_r3.t()("reunions.detail.back"));
    __advance();
    __conditional(ctx_r3.canManage() && current_r6.status === "planifi\xE9e" ? 1 : -1);
    __advance();
    __conditional(current_r6.status === "annul\xE9e" ? 2 : -1);
    __advance();
    __property("stats", ctx_r3.kpis());
    __advance(7);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r3.t()("reunions.detail.agenda"));
    __advance(2);
    __textInterpolate(current_r6.agenda.length);
    __advance(2);
    __repeater(current_r6.agenda);
    __advance(7);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r3.t()("reunions.detail.convoked"), " ");
    __advance(2);
    __textInterpolate2("", ctx_r3.t()(ctx_r3.modeKey(current_r6)), "", current_r6.place && current_r6.mode !== "en ligne" ? " \xB7 " + current_r6.place : "");
    __advance();
    __conditional(current_r6.onlineUrl ? 26 : -1);
    __advance();
    __conditional(ctx_r3.convokedNames().length ? 27 : 28);
    __advance(2);
    __conditional(current_r6.status === "tenue" ? 29 : -1);
    __advance();
    __conditional(current_r6.status !== "annul\xE9e" ? 30 : -1);
    __advance(2);
    __conditional(current_r6.status === "tenue" ? 32 : -1);
    __advance(5);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r3.t()("reunions.detail.history"));
    __advance(2);
    __textInterpolate(current_r6.history.length);
    __advance(2);
    __repeater(ctx_r3.historyReversed(current_r6));
    __advance(2);
    __twoWayProperty("open", ctx_r3.editOpen);
    __property("meeting", current_r6);
    __advance();
    __property("open", ctx_r3.holdOpen())("title", ctx_r3.t()("reunions.attendance.title"))("description", ctx_r3.t()("reunions.attendance.description"))("width", 600)("closeLabel", ctx_r3.t()("common.close"));
    __advance();
    __conditional(ctx_r3.scoopMembers().length ? 46 : 47);
    __advance(3);
    __textInterpolate1(" ", ctx_r3.t()("producteurs.index.cancel"), " ");
    __advance();
    __property("disabled", !ctx_r3.holdPresentIds().length);
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("reunions.attendance.submit"));
    __advance(2);
    __property("size", 18);
    __advance();
    __property("open", ctx_r3.cancelOpen())("title", ctx_r3.t()("reunions.cancel.title"))("description", ctx_r3.t()("reunions.cancel.description"))("width", 540)("closeLabel", ctx_r3.t()("common.close"));
    __advance(2);
    __textInterpolate(ctx_r3.t()("reunions.cancel.reason"));
    __advance();
    __property("placeholder", ctx_r3.t()("reunions.cancel.reasonHint"))("value", ctx_r3.cancelReasonText);
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("reunions.cancel.keep"), " ");
    __advance();
    __property("disabled", ctx_r3.cancelReasonText.trim().length < 3);
    __advance();
    __textInterpolate1(" ", ctx_r3.t()("reunions.cancel.submit"), " ");
    __advance();
    __property("open", ctx_r3.validateConfirmOpen())("title", ctx_r3.t()("reunions.minutes.confirmTitle"))("description", ctx_r3.t()("reunions.minutes.confirmDescription"))("width", 520)("closeLabel", ctx_r3.t()("common.close"));
    __advance();
    __conditional(ctx_r3.minutesDirty() ? 63 : -1);
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("producteurs.index.cancel"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r3.t()("reunions.minutes.confirmSubmit"));
    __advance(2);
    __property("size", 18);
  }
}
function ReunionDetailPage_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 1)(1, "span", 82);
    __element(2, "ui-icon", 83);
    __elementEnd();
    __elementStart(3, "h1", 84);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 53);
    __text(6);
    __elementEnd();
    __elementStart(7, "a", 85);
    __text(8);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r3.t()("reunions.detail.notFound.title"));
    __advance(2);
    __textInterpolate(ctx_r3.t()("reunions.detail.notFound.text"));
    __advance(2);
    __textInterpolate(ctx_r3.t()("reunions.detail.back"));
  }
}
var DAY = 864e5;
var ReunionDetailPage = (_b = class {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.fmtDateTime = fmtDateTime;
    this.fmtDate = fmtDate;
    this.MEETING_KIND_LABEL = MEETING_KIND_LABEL;
    this.MEETING_STATUS_LABEL = MEETING_STATUS_LABEL;
    this.initials = initialsOf;
    this.snackbar = inject(SnackbarService);
    this.HISTORY_LABEL = {
      cr\u00E9\u00E9e: "reunions.detail.history.cr\xE9\xE9e",
      modifi\u00E9e: "reunions.detail.history.modifi\xE9e",
      tenue: "reunions.detail.history.tenue",
      annul\u00E9e: "reunions.detail.history.annul\xE9e",
      "proc\xE8s-verbal enregistr\xE9": "reunions.detail.history.proc\xE8s-verbal enregistr\xE9",
      "proc\xE8s-verbal valid\xE9": "reunions.detail.history.proc\xE8s-verbal valid\xE9",
      "d\xE9cision ajout\xE9e": "reunions.detail.history.d\xE9cision ajout\xE9e",
      "d\xE9cision en cours": "reunions.detail.history.d\xE9cision en cours",
      "d\xE9cision cl\xF4tur\xE9e": "reunions.detail.history.d\xE9cision cl\xF4tur\xE9e"
    };
    this.id = toSignal(this.route.paramMap.pipe(map((p) => {
      var _a2;
      return (_a2 = p.get("id")) != null ? _a2 : "";
    })), { initialValue: "" });
    this.meeting = computed(() => {
      const id = this.id();
      const s = this.store.state();
      const row = s.meetings.find((x) => x.id === id);
      if (!row) return void 0;
      return scopedMeetings([row], s.session).length === 1 ? row : void 0;
    }, ...[]);
    this.canManage = computed(() => this.store.can("meeting.manage"), ...[]);
    this.stats = computed(() => {
      const m = this.meeting();
      if (!m) return {
        present: 0,
        absent: 0,
        rate: 0
      };
      const session = this.store.state().session;
      const scoopMembers = scopedMembers(this.store.state().members, session).filter((mem) => mem.scoopId === m.scoopId && mem.status === "membre");
      const n = Math.max(scoopMembers.length, m.presentIds.length);
      const st = attendanceStats(m, n);
      return {
        present: st.present,
        absent: Math.max(st.total - st.present, 0),
        rate: st.rate
      };
    }, ...[]);
    this.scoopMembers = computed(() => {
      const m = this.meeting();
      if (!m) return [];
      const session = this.store.state().session;
      return [...scopedMembers(this.store.state().members, session).filter((mem) => mem.scoopId === m.scoopId && mem.status === "membre")].sort((a, b) => `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`, "fr"));
    }, ...[]);
    this.minutesEditable = computed(() => {
      const m = this.meeting();
      return !!(m && this.store.can("minutes.manage") && canEditMinutes(m));
    }, ...[]);
    this.isMinutesAuthor = computed(() => {
      var _a2, _b2, _c, _d;
      const authorEmail = (_c = (_b2 = (_a2 = this.meeting()) == null ? void 0 : _a2.minutes) == null ? void 0 : _b2.authorEmail) == null ? void 0 : _c.toLowerCase();
      const sessionEmail = (_d = this.store.state().session) == null ? void 0 : _d.email.toLowerCase();
      return !!authorEmail && authorEmail === sessionEmail;
    }, ...[]);
    this.minutesDraft = "";
    this.minutesTried = signal(false, ...[]);
    this.validateConfirmOpen = signal(false, ...[]);
    this.holdOpen = signal(false, ...[]);
    this.holdPresentIds = signal([], ...[]);
    this.cancelOpen = signal(false, ...[]);
    this.cancelReasonText = "";
    this.editOpen = signal(false, ...[]);
    this.holdAllSelected = computed(() => {
      const members = this.scoopMembers();
      const ids = this.holdPresentIds();
      return members.length > 0 && ids.length === members.length;
    }, ...[]);
    this.convokedNames = computed(() => {
      const m = this.meeting();
      const state = this.store.state();
      if (!(m == null ? void 0 : m.audience)) return [];
      return [
        ...m.audience.orgIds.map((id) => {
          var _a2;
          return (_a2 = state.orgs.find((org) => org.id === id)) == null ? void 0 : _a2.name;
        }).filter((name) => !!name),
        ...m.audience.staffIds.map((id) => {
          var _a2;
          return (_a2 = state.users.find((user) => user.id === id)) == null ? void 0 : _a2.name;
        }).filter((name) => !!name),
        ...m.audience.others
      ];
    }, ...[]);
    this.present = computed(() => {
      const m = this.meeting();
      if (!m) return [];
      return this.store.state().members.filter((x) => m.presentIds.includes(x.id));
    }, ...[]);
    this.heroBadges = computed(() => {
      var _a2;
      const m = this.meeting();
      if (!m) return [];
      const t = this.t();
      return [{
        label: t(MEETING_STATUS_LABEL[m.status]),
        tone: {
          planifi\u00E9e: "light",
          tenue: "citron",
          annul\u00E9e: "danger"
        }[m.status]
      }, ...m.status === "tenue" ? [{
        label: `${t("reunions.minutes.title")} : ${this.minutesStatusLabel(m)}`,
        tone: ((_a2 = m.minutes) == null ? void 0 : _a2.status) === "valid\xE9" ? "glass" : "warn"
      }] : []];
    }, ...[]);
    this.heroMeta = computed(() => {
      const m = this.meeting();
      if (!m) return [];
      return [
        {
          icon: "calendar_today",
          text: this.locale.formatDate(m.date, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })
        },
        {
          icon: m.mode === "en ligne" ? "public" : "location_on",
          text: m.mode === "en ligne" ? this.t()("reunions.form.mode.online") : m.place
        },
        {
          icon: "apartment",
          text: this.scoopName(m.scoopId)
        }
      ];
    }, ...[]);
    this.kpis = computed(() => {
      var _a2;
      const m = this.meeting();
      if (!m) return [];
      const t = this.t();
      const st = this.stats();
      const days = Math.ceil((new Date(m.date).getTime() - Date.now()) / DAY);
      return [
        {
          label: t("reunions.quick.agenda"),
          value: nf.format(m.agenda.length),
          sub: t(MEETING_KIND_LABEL[m.kind]),
          icon: "fact_check",
          bg: "",
          fg: ""
        },
        m.status === "planifi\xE9e" && days >= 0 ? {
          label: t("reunions.quick.daysLeft"),
          value: nf.format(days),
          sub: fmtDate(m.date),
          icon: "calendar_today",
          ...TONE.attente
        } : {
          label: t("reunions.quick.present"),
          value: nf.format(st.present),
          sub: t("reunions.attendance.summary", {
            present: st.present,
            absent: st.absent
          }),
          icon: "group",
          ...TONE.succes
        },
        {
          label: t("reunions.quick.rate"),
          value: m.status === "tenue" ? `${st.rate} %` : "\u2014",
          sub: t("reunions.attendance.sectionTitle"),
          icon: "trending_up",
          ...TONE.info
        },
        {
          label: t("reunions.minutes.title"),
          value: m.minutes ? this.minutesStatusLabel(m) : "\u2014",
          sub: ((_a2 = m.minutes) == null ? void 0 : _a2.validatedAt) ? fmtDate(m.minutes.validatedAt) : m.minutes ? t(MEETING_STATUS_LABEL[m.status]) : this.minutesStatusLabel(m),
          icon: "description",
          ...this.minutesTone(m)
        }
      ];
    }, ...[]);
    effect(() => {
      var _a2, _b2;
      const m = this.meeting();
      if (m) this.minutesDraft = (_b2 = (_a2 = m.minutes) == null ? void 0 : _a2.text) != null ? _b2 : "";
    });
  }
  historyReversed(m) {
    return [...m.history].reverse();
  }
  historyLabel(action) {
    const key = this.HISTORY_LABEL[action];
    return key ? this.t()(key) : action;
  }
  modeKey(m) {
    return m.mode === "en ligne" ? "reunions.form.mode.online" : m.mode === "mixte" ? "reunions.form.mode.mixed" : "reunions.form.mode.onsite";
  }
  scoopName(scoopId) {
    var _a2, _b2;
    return (_b2 = (_a2 = this.store.state().scoops.find((c) => c.id === scoopId)) == null ? void 0 : _a2.name) != null ? _b2 : "";
  }
  minutesStatusLabel(m) {
    const t = this.t();
    if (!m.minutes) return t("reunions.minutes.status.none");
    return t(m.minutes.status === "valid\xE9" ? "reunions.minutes.status.valid\xE9" : "reunions.minutes.status.brouillon");
  }
  canEditMeeting(m) {
    return isMeetingEditable(m);
  }
  openEditDialog() {
    this.editOpen.set(true);
  }
  onMeetingFormNotify(ev) {
    this.flash(ev.kind, ev.text);
  }
  minutesDirty() {
    var _a2, _b2;
    const m = this.meeting();
    return this.minutesDraft.trim() !== ((_b2 = (_a2 = m == null ? void 0 : m.minutes) == null ? void 0 : _a2.text) != null ? _b2 : "").trim();
  }
  openHoldDialog() {
    this.holdOpen.set(true);
    this.holdPresentIds.set([]);
  }
  closeHoldDialog() {
    this.holdOpen.set(false);
    this.holdPresentIds.set([]);
  }
  toggleHold(memberId, ev) {
    const on = ev.target.checked;
    this.holdPresentIds.update((prev) => {
      const set = new Set(prev);
      if (on) set.add(memberId);
      else set.delete(memberId);
      return [...set];
    });
  }
  toggleHoldAll() {
    const members = this.scoopMembers();
    if (this.holdAllSelected()) this.holdPresentIds.set([]);
    else this.holdPresentIds.set(members.map((x) => x.id));
  }
  submitHoldMeeting() {
    const m = this.meeting();
    if (!m) return;
    const ids = this.holdPresentIds();
    try {
      const res = this.store.actions.holdMeeting(m.id, ids);
      if (!res.ok) {
        this.flash("error", this.locale.tNow(res.error));
        return;
      }
      this.flash("success", this.t()("reunions.attendance.done"));
      this.closeHoldDialog();
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }
  openCancelDialog() {
    this.cancelOpen.set(true);
    this.cancelReasonText = "";
  }
  closeCancelDialog() {
    this.cancelOpen.set(false);
    this.cancelReasonText = "";
  }
  submitCancelMeeting() {
    const m = this.meeting();
    if (!m) return;
    const reason = this.cancelReasonText.trim();
    try {
      const res = this.store.actions.cancelMeeting(m.id, reason);
      if (!res.ok) {
        this.flash("error", this.locale.tNow(res.error));
        return;
      }
      this.flash("success", this.t()("reunions.cancel.done"));
      this.closeCancelDialog();
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }
  saveMinutesDraft() {
    const m = this.meeting();
    if (!m) return;
    this.minutesTried.set(true);
    if (!this.minutesDraft.trim()) return;
    try {
      const res = this.store.actions.saveMinutes(m.id, this.minutesDraft);
      if (!res.ok) {
        this.flash("error", this.locale.tNow(res.error));
        return;
      }
      this.flash("success", this.t()("reunions.minutes.saved"));
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }
  openValidateConfirm() {
    this.minutesTried.set(true);
    if (!this.minutesDraft.trim()) return;
    this.validateConfirmOpen.set(true);
  }
  closeValidateConfirm() {
    this.validateConfirmOpen.set(false);
  }
  confirmValidateMinutes() {
    const m = this.meeting();
    if (!m) return;
    try {
      if (this.minutesDirty()) {
        const saveRes = this.store.actions.saveMinutes(m.id, this.minutesDraft);
        if (!saveRes.ok) {
          this.flash("error", this.locale.tNow(saveRes.error));
          return;
        }
      }
      const res = this.store.actions.validateMinutes(m.id);
      if (!res.ok) {
        this.flash("error", this.locale.tNow(res.error));
        return;
      }
      this.closeValidateConfirm();
      this.flash("success", this.t()("reunions.minutes.validated"));
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }
  flash(kind, text) {
    if (kind === "success") this.snackbar.success(text);
    else this.snackbar.error(text);
  }
  isPast(iso) {
    return iso <= (/* @__PURE__ */ new Date()).toISOString();
  }
  minutesTone(m) {
    var _a2;
    return ((_a2 = m.minutes) == null ? void 0 : _a2.status) === "valid\xE9" ? TONE.succes : m.minutes ? TONE.attente : TONE.neutre;
  }
  errMsg(e) {
    if (e instanceof AccessDeniedError) return this.locale.tNow(e.key);
    return e instanceof Error ? e.message : String(e);
  }
}, _b.\u0275fac = function ReunionDetailPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _b)();
}, _b.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _b,
  selectors: [["app-reunion-detail-page"]],
  decls: 3,
  vars: 2,
  consts: [
    [
      "perm",
      "meeting.read",
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
      "icon",
      "event",
      3,
      "crumb",
      "title",
      "eyebrow",
      "badges",
      "meta",
      "backLabel"
    ],
    [
      "hero-actions",
      "",
      1,
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      1,
      "notice",
      "mt-4",
      2,
      "background",
      "var(--v2-erreur-bg)",
      "color",
      "var(--v2-erreur-fg)"
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
    [
      1,
      "grid",
      "gap-4"
    ],
    [1, "sec-card"],
    [1, "sec-head"],
    [1, "sec-ico"],
    [
      "name",
      "fact_check",
      3,
      "size"
    ],
    [1, "n"],
    [1, "agenda"],
    [
      1,
      "sub",
      2,
      "font-weight",
      "500"
    ],
    [
      "name",
      "group",
      3,
      "size"
    ],
    [
      1,
      "sub",
      2,
      "font-weight",
      "600"
    ],
    [
      1,
      "mt-4",
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      1,
      "sub",
      "mt-3",
      2,
      "font-weight",
      "500"
    ],
    [3, "meeting"],
    [
      "name",
      "event_note",
      3,
      "size"
    ],
    [1, "timeline"],
    [
      3,
      "openChange",
      "notify",
      "open",
      "meeting"
    ],
    [
      "icon",
      "task_alt",
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
      "sub",
      "mb-4"
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
      "for",
      "cancel-reason",
      1,
      "lbl"
    ],
    [
      "id",
      "cancel-reason",
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
      "btn-danger",
      3,
      "click",
      "disabled"
    ],
    [
      1,
      "notice",
      "mb-5",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
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
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      2,
      "height",
      "44px"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-citron",
      2,
      "height",
      "44px"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      2,
      "height",
      "44px",
      "color",
      "var(--v2-erreur-fg)",
      3,
      "click"
    ],
    [
      "name",
      "close",
      3,
      "size"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      2,
      "height",
      "44px",
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
      "btn-citron",
      2,
      "height",
      "44px",
      3,
      "click"
    ],
    [
      "name",
      "task_alt",
      3,
      "size"
    ],
    [
      "name",
      "warning",
      3,
      "size"
    ],
    [1, "num"],
    [1, "min-w-0"],
    [
      "target",
      "_blank",
      "rel",
      "noopener noreferrer",
      1,
      "btn",
      "btn-primary",
      "mt-3",
      "inline-flex",
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
      "sub",
      "mt-2",
      "break-all"
    ],
    [
      1,
      "rounded-full",
      "px-3",
      "py-1.5",
      "text-[13px]",
      "font-bold",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-foret)"
    ],
    [
      "name",
      "description",
      3,
      "size"
    ],
    [1, "badge"],
    [
      1,
      "border-t",
      "p-5",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [1, "sub"],
    [
      "for",
      "minutes",
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
      "minutes",
      1,
      "area",
      "big",
      "mt-2",
      3,
      "input",
      "value"
    ],
    [
      1,
      "mt-1.5",
      "flex",
      "items-center",
      "gap-1.5",
      "text-[13px]",
      "font-bold",
      2,
      "color",
      "var(--v2-erreur-fg)"
    ],
    [
      1,
      "sub",
      "mt-2"
    ],
    [
      1,
      "notice",
      "mt-3"
    ],
    [
      1,
      "mt-4",
      "flex",
      "flex-wrap",
      "justify-end",
      "gap-2"
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
      "button",
      1,
      "btn",
      "btn-primary",
      3,
      "click",
      "disabled"
    ],
    [
      "name",
      "info",
      3,
      "size"
    ],
    [1, "minutes"],
    [
      1,
      "notice",
      "mt-3",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-vert-pousse)"
    ],
    [
      1,
      "text-[15px]",
      "font-extrabold"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "meter",
      "mt-2"
    ],
    [
      1,
      "sub",
      "mt-1.5"
    ],
    [
      1,
      "lbl",
      "mt-4"
    ],
    [
      1,
      "people",
      "mt-2"
    ],
    [1, "person-chip"],
    [1, "i"],
    [
      "aria-hidden",
      "true",
      1,
      "dot"
    ],
    [
      1,
      "block",
      "font-bold"
    ],
    [
      1,
      "sub",
      "block"
    ],
    [
      1,
      "mb-3",
      "flex",
      "flex-wrap",
      "items-center",
      "justify-between",
      "gap-2"
    ],
    [
      "aria-live",
      "polite",
      1,
      "text-[14px]",
      "font-extrabold",
      "tabular-nums"
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
      1,
      "checklist",
      "mb-4"
    ],
    [
      "type",
      "checkbox",
      3,
      "change",
      "checked"
    ],
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
      "event",
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
      "/dashboard/reunions",
      1,
      "btn",
      "btn-ghost",
      "mt-2"
    ]
  ],
  template: function ReunionDetailPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0);
      __conditionalCreate(1, ReunionDetailPage_Conditional_1_Template, 70, 59)(2, ReunionDetailPage_Conditional_2_Template, 9, 4, "div", 1);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      __property("area", ctx.t()("reunions.detail.area"));
      __advance();
      __conditional((tmp_1_0 = ctx.meeting()) ? 1 : 2, tmp_1_0);
    }
  },
  dependencies: [
    AppShellComponent,
    MeetingDecisionsComponent,
    DetailHeroComponent,
    IconComponent,
    MeetingFormDialogComponent,
    ModalComponent,
    RouterLink,
    StatCardsComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".grid-main[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 16px;\n      }\n      @media (min-width: 1100px) {\n        .grid-main[_ngcontent-%COMP%] {\n          grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);\n          align-items: start;\n        }\n      }\n      .agenda[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 12px 20px;\n        font-size: 15px;\n        font-weight: 700;\n      }\n      .num[_ngcontent-%COMP%] {\n        display: grid;\n        height: 30px;\n        width: 30px;\n        flex-shrink: 0;\n        place-items: center;\n        border-radius: 999px;\n        background: var(--%NS%v2-foret);\n        color: var(--%NS%v2-citron);\n        font-size: 12px;\n        font-weight: 800;\n      }\n      .minutes[_ngcontent-%COMP%] {\n        white-space: pre-wrap;\n        overflow-wrap: anywhere;\n        border-radius: 18px;\n        background: var(--%NS%v2-creme);\n        padding: 16px 18px;\n        font-size: 15px;\n        line-height: 1.6;\n      }\n      .area.big[_ngcontent-%COMP%] {\n        min-height: 260px;\n        line-height: 1.6;\n      }\n      .meter[_ngcontent-%COMP%] {\n        display: block;\n        height: 8px;\n        overflow: hidden;\n        border-radius: 999px;\n        background: var(--%NS%v2-lin);\n      }\n      .meter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n        display: block;\n        height: 100%;\n        border-radius: 999px;\n        background: var(--%NS%v2-vert-pousse);\n      }\n      .people[_ngcontent-%COMP%] {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 6px;\n      }\n      .person-chip[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        border-radius: 999px;\n        background: var(--%NS%v2-sauge);\n        padding: 3px 10px 3px 3px;\n        font-size: 13px;\n        font-weight: 700;\n      }\n      .person-chip[_ngcontent-%COMP%]   .i[_ngcontent-%COMP%] {\n        display: grid;\n        height: 24px;\n        width: 24px;\n        place-items: center;\n        border-radius: 999px;\n        background: var(--%NS%v2-foret);\n        color: var(--%NS%v2-citron);\n        font-size: 10px;\n        font-weight: 800;\n      }\n      .timeline[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n        display: flex;\n        gap: 14px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 12px 20px;\n      }\n      .dot[_ngcontent-%COMP%] {\n        margin-top: 5px;\n        height: 12px;\n        width: 12px;\n        flex-shrink: 0;\n        border-radius: 999px;\n        background: var(--%NS%v2-foret);\n        box-shadow: 0 0 0 4px var(--%NS%v2-sauge);\n      }\n      .checklist[_ngcontent-%COMP%] {\n        max-height: 46vh;\n        overflow-y: auto;\n        border-radius: 18px;\n        border: 1px solid var(--%NS%v2-bord-carte);\n      }\n      .checklist[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n        display: flex;\n        min-height: 52px;\n        align-items: center;\n        gap: 12px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 8px 14px;\n        font-size: 14px;\n        font-weight: 600;\n        cursor: pointer;\n      }\n      .checklist[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child   label[_ngcontent-%COMP%] {\n        border-top: none;\n      }\n      .checklist[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:hover {\n        background: var(--%NS%v2-creme);\n      }\n      .checklist[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n        height: 20px;\n        width: 20px;\n        accent-color: var(--%NS%v2-foret);\n      }"]
}), _b);

export { ReunionDetailPage as default };
//# sourceMappingURL=reunions._id_.page-Hr-JM9AP.mjs.map

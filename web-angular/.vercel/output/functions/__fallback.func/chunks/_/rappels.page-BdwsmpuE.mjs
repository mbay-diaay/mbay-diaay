import { i as inject, c as computed, F as signal, e as effect, ɵ as __defineComponent, d as RouterLink, f as __elementStart, g as __text, h as __elementEnd, H as __listener, b as __element, m as __repeaterCreate, j as __conditionalCreate, n as __property, o as __advance, p as __textInterpolate, t as __styleProp, q as __textInterpolate1, v as __repeater, s as __conditional, a8 as untracked, V as __repeaterTrackByIdentity, L as __getCurrentView, w as __nextContext, O as __restoreView, P as __resetView, r as __pureFunction1 } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, j as nf, h as fmtDate, U as REMINDER_DELAY_FIELDS, W as REMINDER_CHANNELS, i as inScope, X as reminderIssues, Y as previewReminders, Z as reminderSettingsOf } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { S as SelectComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';
import { T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
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
var _c0 = (a0) => ["/dashboard/reunions", a0];
var _c1 = (a0) => ["/dashboard/dossiers", a0];
var _c2 = (a0) => ({ amount: a0 });
var _forTrack0 = ($index, $item) => $item.kind + $item.refId + $item.date;
function RappelsPage_For_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "ui-text-field", 35);
    __listener("valueChange", function RappelsPage_For_29_Template_ui_text_field_valueChange_0_listener($event) {
      const field_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.patchDelay(field_r2, $event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const field_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __property("label", ctx_r2.t()(ctx_r2.delayField[field_r2].label))("icon", ctx_r2.delayField[field_r2].icon)("placeholder", ctx_r2.t()("rappels.daysPh"))("hint", ctx_r2.t()(ctx_r2.delayField[field_r2].hint))("value", ctx_r2.draft()[field_r2])("error", ctx_r2.fieldError(field_r2));
  }
}
function RappelsPage_For_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "label", 22)(1, "input", 15);
    __listener("change", function RappelsPage_For_35_Template_input_change_1_listener($event) {
      const channel_r5 = __restoreView(_r4).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.toggleChannel(channel_r5, $event.target.checked));
    });
    __elementEnd();
    __element(2, "ui-icon", 36);
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const channel_r5 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __advance();
    __property("checked", ctx_r2.draft().channels.includes(channel_r5));
    __advance();
    __property("name", ctx_r2.channelStyle[channel_r5].icon)("size", 18);
    __advance();
    __textInterpolate1("", ctx_r2.t()(ctx_r2.channelStyle[channel_r5].label), " ");
  }
}
function RappelsPage_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 23);
    __element(1, "ui-icon", 37);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r2.t()("rappels.err.channels"));
  }
}
function RappelsPage_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "button", 38);
    __listener("click", function RappelsPage_Conditional_41_Template_button_click_0_listener() {
      __restoreView(_r6);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.useDefaults());
    });
    __element(1, "ui-icon", 39);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r2.t()("rappels.useDefaults"));
  }
}
function RappelsPage_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 34);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __textInterpolate(ctx_r2.t()("rappels.preview.pickScoop"));
  }
}
function RappelsPage_Conditional_56_For_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 44);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r7 = __nextContext().$implicit;
    __property("routerLink", __pureFunction1(2, _c0, item_r7.refId));
    __advance();
    __textInterpolate(item_r7.title);
  }
}
function RappelsPage_Conditional_56_For_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 44);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r7 = __nextContext().$implicit;
    __property("routerLink", __pureFunction1(2, _c1, item_r7.refId));
    __advance();
    __textInterpolate(item_r7.title);
  }
}
function RappelsPage_Conditional_56_For_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 45);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r7 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.t()("rappels.preview.contributionText", __pureFunction1(1, _c2, ctx_r2.nf.format(+item_r7.title))));
  }
}
function RappelsPage_Conditional_56_For_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 40)(1, "span", 41);
    __element(2, "ui-icon", 36);
    __elementEnd();
    __elementStart(3, "span", 42)(4, "span", 43);
    __text(5);
    __elementEnd();
    __conditionalCreate(6, RappelsPage_Conditional_56_For_1_Conditional_6_Template, 2, 4, "a", 44)(7, RappelsPage_Conditional_56_For_1_Conditional_7_Template, 2, 4, "a", 44)(8, RappelsPage_Conditional_56_For_1_Conditional_8_Template, 2, 3, "span", 45);
    __elementStart(9, "span", 17);
    __text(10);
    __elementEnd()()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __styleProp("background", ctx_r2.previewStyle[item_r7.kind].bg)("color", ctx_r2.previewStyle[item_r7.kind].fg);
    __advance();
    __property("name", ctx_r2.previewStyle[item_r7.kind].icon)("size", 18);
    __advance(3);
    __textInterpolate(ctx_r2.t()(ctx_r2.previewStyle[item_r7.kind].label));
    __advance();
    __conditional(item_r7.kind === "meeting" || item_r7.kind === "decision" ? 6 : item_r7.kind === "dossier" ? 7 : 8);
    __advance(4);
    __textInterpolate(ctx_r2.fmtDate(item_r7.date));
  }
}
function RappelsPage_Conditional_56_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 34);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.draft().enabled ? ctx_r2.t()("rappels.preview.none") : ctx_r2.t()("rappels.preview.disabled"));
  }
}
function RappelsPage_Conditional_56_Template(rf, ctx) {
  if (rf & 1) __repeaterCreate(0, RappelsPage_Conditional_56_For_1_Template, 11, 9, "div", 40, _forTrack0, false, RappelsPage_Conditional_56_ForEmpty_2_Template, 2, 1, "p", 34);
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __repeater(ctx_r2.preview());
  }
}
var DELAY_FIELD = {
  dossierPendingDays: {
    label: "rappels.field.dossier",
    hint: "rappels.field.dossierHint",
    icon: "folder_shared"
  },
  meetingNoticeDays: {
    label: "rappels.field.meeting",
    hint: "rappels.field.meetingHint",
    icon: "event"
  },
  contributionDueDays: {
    label: "rappels.field.contribution",
    hint: "rappels.field.contributionHint",
    icon: "payments"
  },
  decisionDueDays: {
    label: "rappels.field.decision",
    hint: "rappels.field.decisionHint",
    icon: "gavel"
  }
};
var CHANNEL = {
  app: {
    label: "rappels.channel.app",
    icon: "notifications"
  },
  sms: {
    label: "rappels.channel.sms",
    icon: "call"
  },
  email: {
    label: "rappels.channel.email",
    icon: "mail"
  }
};
var PREVIEW = {
  meeting: {
    label: "rappels.preview.meeting",
    icon: "event",
    ...TONE.info
  },
  decision: {
    label: "rappels.preview.decision",
    icon: "gavel",
    ...TONE.attente
  },
  dossier: {
    label: "rappels.preview.dossier",
    icon: "folder_shared",
    ...TONE.culture
  },
  contribution: {
    label: "rappels.preview.contribution",
    icon: "payments",
    ...TONE.succes
  }
};
var toDraft = (settings) => ({
  ...settings,
  dossierPendingDays: String(settings.dossierPendingDays),
  meetingNoticeDays: String(settings.meetingNoticeDays),
  contributionDueDays: String(settings.contributionDueDays),
  decisionDueDays: String(settings.decisionDueDays)
});
var RappelsPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.snackbar = inject(SnackbarService);
    this.nf = nf;
    this.fmtDate = fmtDate;
    this.defaultKey = "*";
    this.delayFields = REMINDER_DELAY_FIELDS;
    this.delayField = DELAY_FIELD;
    this.channels = REMINDER_CHANNELS;
    this.channelStyle = CHANNEL;
    this.previewStyle = PREVIEW;
    this.consolidated = computed(() => {
      var _a2;
      return ((_a2 = this.store.state().session) == null ? void 0 : _a2.scope.kind) === "consolid\xE9";
    }, ...[]);
    this.targetOptions = computed(() => {
      const state = this.store.state();
      const scoops = inScope(state.scoops.filter((scoop) => !scoop.archived).map((scoop) => ({
        ...scoop,
        scoopId: scoop.id
      })), state.session);
      const own = (id) => state.reminderSettings[id] ? this.t()("rappels.badge.own") : "";
      return [...this.consolidated() ? [{
        value: "*",
        label: this.t()("rappels.defaults"),
        icon: "public"
      }] : [], ...scoops.map((scoop) => ({
        value: scoop.id,
        label: scoop.name,
        hint: own(scoop.id)
      }))];
    }, ...[]);
    this.target = signal("", ...[]);
    this.draft = signal(toDraft(reminderSettingsOf({}, null)), ...[]);
    this.tried = signal(false, ...[]);
    this.ownSettings = computed(() => !!this.store.state().reminderSettings[this.target()], ...[]);
    this.parsed = computed(() => {
      const draft = this.draft();
      const days = (value) => value.trim() === "" ? NaN : Number(value);
      return {
        ...draft,
        dossierPendingDays: days(draft.dossierPendingDays),
        meetingNoticeDays: days(draft.meetingNoticeDays),
        contributionDueDays: days(draft.contributionDueDays),
        decisionDueDays: days(draft.decisionDueDays)
      };
    }, ...[]);
    this.issues = computed(() => reminderIssues(this.parsed()), ...[]);
    this.channelsMissing = computed(() => this.issues().includes("channels"), ...[]);
    this.preview = computed(() => {
      const target = this.target();
      if (!target || target === "*" || this.issues().some((issue) => issue !== "channels")) return [];
      const state = this.store.state();
      return previewReminders({
        scoopId: target,
        settings: this.parsed(),
        nowIso: (/* @__PURE__ */ new Date()).toISOString(),
        meetings: state.meetings,
        dossiers: state.dossiers,
        rules: state.contributionRules
      });
    }, ...[]);
    effect(() => {
      const options = this.targetOptions();
      untracked(() => {
        var _a2, _b;
        if (!options.some((option) => option.value === this.target())) this.target.set((_b = (_a2 = options[0]) == null ? void 0 : _a2.value) != null ? _b : "");
      });
    });
    effect(() => {
      const target = this.target();
      untracked(() => {
        this.draft.set(toDraft(this.current(target)));
        this.tried.set(false);
      });
    });
  }
  current(target) {
    const settings = this.store.state().reminderSettings;
    return reminderSettingsOf(settings, target === "*" ? null : target);
  }
  fieldError(field) {
    if (!this.tried() || !this.issues().includes(field)) return "";
    return this.t()("rappels.err.days", {
      min: 1,
      max: 90
    });
  }
  patch(change) {
    this.draft.update((draft) => ({
      ...draft,
      ...change
    }));
  }
  patchDelay(field, value) {
    this.draft.update((draft) => ({
      ...draft,
      [field]: value
    }));
  }
  toggleChannel(channel, checked) {
    this.draft.update((draft) => ({
      ...draft,
      channels: checked ? REMINDER_CHANNELS.filter((item) => item === channel || draft.channels.includes(item)) : draft.channels.filter((item) => item !== channel)
    }));
  }
  save() {
    this.tried.set(true);
    if (this.issues().length) return;
    const target = this.target();
    const result = this.store.actions.setReminderSettings(target === "*" ? null : target, this.parsed());
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.locale.tNow("rappels.saved"));
  }
  useDefaults() {
    const result = this.store.actions.clearReminderSettings(this.target());
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.draft.set(toDraft(this.current(this.target())));
    this.snackbar.success(this.locale.tNow("rappels.defaultsRestored"));
  }
}, _a.\u0275fac = function RappelsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-rappels-page"]],
  decls: 57,
  vars: 28,
  consts: [
    [
      "perm",
      "notification.configure",
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
      "toolbar",
      "card",
      "mt-6"
    ],
    [
      "leadingIcon",
      "apartment",
      1,
      "min-w-[280px]",
      "flex-1",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [1, "badge"],
    [
      1,
      "layout",
      "mt-4"
    ],
    [1, "sec-card"],
    [1, "sec-head"],
    [1, "sec-ico"],
    [
      "name",
      "tune",
      3,
      "size"
    ],
    [
      1,
      "space-y-6",
      "border-t",
      "p-5",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [1, "switch"],
    [
      "type",
      "checkbox",
      3,
      "change",
      "checked"
    ],
    [
      1,
      "block",
      "text-[15px]",
      "font-extrabold"
    ],
    [
      1,
      "sub",
      "block"
    ],
    [1, "delays"],
    [
      "type",
      "number",
      "inputmode",
      "numeric",
      3,
      "label",
      "icon",
      "placeholder",
      "hint",
      "value",
      "error"
    ],
    [1, "lbl"],
    [
      1,
      "channels",
      "mt-2"
    ],
    [1, "check"],
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
    [1, "notice"],
    [
      "name",
      "info",
      3,
      "size"
    ],
    [
      1,
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
      "btn-ghost"
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
      "name",
      "notifications_active",
      3,
      "size"
    ],
    [1, "n"],
    [
      1,
      "border-t",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      1,
      "sub",
      "p-5"
    ],
    [
      "type",
      "number",
      "inputmode",
      "numeric",
      3,
      "valueChange",
      "label",
      "icon",
      "placeholder",
      "hint",
      "value",
      "error"
    ],
    [
      3,
      "name",
      "size"
    ],
    [
      "name",
      "warning",
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
      "undo",
      3,
      "size"
    ],
    [1, "preview-item"],
    [1, "preview-ico"],
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
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "block",
      "truncate",
      "font-bold",
      "underline-offset-4",
      "hover:underline",
      3,
      "routerLink"
    ],
    [
      1,
      "block",
      "font-bold"
    ]
  ],
  template: function RappelsPage_Template(rf, ctx) {
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
      __elementStart(8, "div", 5)(9, "ui-select", 6);
      __listener("valueChange", function RappelsPage_Template_ui_select_valueChange_9_listener($event) {
        return ctx.target.set($event);
      });
      __elementEnd();
      __elementStart(10, "span", 7);
      __text(11);
      __elementEnd()();
      __elementStart(12, "div", 8)(13, "section", 9)(14, "div", 10)(15, "h2")(16, "span", 11);
      __element(17, "ui-icon", 12);
      __elementEnd();
      __text(18);
      __elementEnd()();
      __elementStart(19, "div", 13)(20, "label", 14)(21, "input", 15);
      __listener("change", function RappelsPage_Template_input_change_21_listener($event) {
        return ctx.patch({ enabled: $event.target.checked });
      });
      __elementEnd();
      __elementStart(22, "span")(23, "span", 16);
      __text(24);
      __elementEnd();
      __elementStart(25, "span", 17);
      __text(26);
      __elementEnd()()();
      __elementStart(27, "div", 18);
      __repeaterCreate(28, RappelsPage_For_29_Template, 1, 6, "ui-text-field", 19, __repeaterTrackByIdentity);
      __elementEnd();
      __elementStart(30, "fieldset")(31, "legend", 20);
      __text(32);
      __elementEnd();
      __elementStart(33, "div", 21);
      __repeaterCreate(34, RappelsPage_For_35_Template, 4, 4, "label", 22, __repeaterTrackByIdentity);
      __elementEnd();
      __conditionalCreate(36, RappelsPage_Conditional_36_Template, 3, 2, "p", 23);
      __elementEnd();
      __elementStart(37, "p", 24);
      __element(38, "ui-icon", 25);
      __text(39);
      __elementEnd();
      __elementStart(40, "div", 26);
      __conditionalCreate(41, RappelsPage_Conditional_41_Template, 3, 2, "button", 27);
      __elementStart(42, "button", 28);
      __listener("click", function RappelsPage_Template_button_click_42_listener() {
        return ctx.save();
      });
      __text(43);
      __elementStart(44, "span", 29);
      __element(45, "ui-icon", 30);
      __elementEnd()()()()();
      __elementStart(46, "section", 9)(47, "div", 10)(48, "h2")(49, "span", 11);
      __element(50, "ui-icon", 31);
      __elementEnd();
      __text(51);
      __elementStart(52, "span", 32);
      __text(53);
      __elementEnd()()();
      __elementStart(54, "div", 33);
      __conditionalCreate(55, RappelsPage_Conditional_55_Template, 2, 1, "p", 34)(56, RappelsPage_Conditional_56_Template, 3, 1);
      __elementEnd()()()();
    }
    if (rf & 2) {
      __property("area", ctx.t()("rappels.title"));
      __advance(3);
      __textInterpolate(ctx.t()("rappels.eyebrow"));
      __advance(2);
      __textInterpolate(ctx.t()("rappels.title"));
      __advance(2);
      __textInterpolate(ctx.t()("rappels.description"));
      __advance(2);
      __property("label", ctx.t()("rappels.target"))("options", ctx.targetOptions())("value", ctx.target());
      __advance();
      __styleProp("background", ctx.ownSettings() ? "var(--v2-citron)" : "var(--v2-lin)")("color", ctx.ownSettings() ? "var(--v2-foret)" : "var(--v2-gris-texte)");
      __advance();
      __textInterpolate1(" ", ctx.target() === ctx.defaultKey ? ctx.t()("rappels.badge.default") : ctx.ownSettings() ? ctx.t()("rappels.badge.own") : ctx.t()("rappels.badge.inherited"), " ");
      __advance(6);
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("rappels.settings"));
      __advance(3);
      __property("checked", ctx.draft().enabled);
      __advance(3);
      __textInterpolate(ctx.t()("rappels.enabled"));
      __advance(2);
      __textInterpolate(ctx.draft().enabled ? ctx.t()("rappels.enabledOn") : ctx.t()("rappels.enabledOff"));
      __advance(2);
      __repeater(ctx.delayFields);
      __advance(4);
      __textInterpolate(ctx.t()("rappels.channels"));
      __advance(2);
      __repeater(ctx.channels);
      __advance(2);
      __conditional(ctx.tried() && ctx.channelsMissing() ? 36 : -1);
      __advance(2);
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("rappels.noAutoApproval"));
      __advance(2);
      __conditional(ctx.ownSettings() && ctx.target() !== ctx.defaultKey ? 41 : -1);
      __advance(2);
      __textInterpolate1(" ", ctx.t()("rappels.save"));
      __advance(2);
      __property("size", 18);
      __advance(5);
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("rappels.preview.title"));
      __advance(2);
      __textInterpolate(ctx.nf.format(ctx.preview().length));
      __advance(2);
      __conditional(ctx.target() === ctx.defaultKey ? 55 : 56);
    }
  },
  dependencies: [
    AppShellComponent,
    IconComponent,
    RouterLink,
    SelectComponent,
    TextFieldComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".layout[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 16px;\n      }\n      @media (min-width: 1100px) {\n        .layout[_ngcontent-%COMP%] {\n          grid-template-columns: minmax(0, 1fr) 380px;\n          align-items: start;\n        }\n      }\n      .delays[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 16px;\n        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n      }\n      .channels[_ngcontent-%COMP%] {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 10px;\n      }\n      .channels[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%] {\n        flex: 1 1 160px;\n      }\n      .switch[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 14px;\n        border-radius: 18px;\n        background: var(--%NS%v2-creme);\n        padding: 14px 16px;\n        cursor: pointer;\n      }\n      .switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n        height: 22px;\n        width: 22px;\n        accent-color: var(--%NS%v2-foret);\n        cursor: pointer;\n      }\n      .preview-item[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        gap: 12px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 12px 18px;\n      }\n      .preview-item[_ngcontent-%COMP%]:first-child {\n        border-top: none;\n      }\n      .preview-ico[_ngcontent-%COMP%] {\n        display: grid;\n        height: 36px;\n        width: 36px;\n        flex-shrink: 0;\n        place-items: center;\n        border-radius: 12px;\n      }"]
}), _a);

export { RappelsPage as default };
//# sourceMappingURL=rappels.page-BdwsmpuE.mjs.map

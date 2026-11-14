import { i as inject, R as Router, a3 as ElementRef, ae as model, aa as input, af as output, c as computed, F as signal, e as effect, a8 as untracked, ɵ as __defineComponent, f as __elementStart, H as __listener, b as __element, g as __text, h as __elementEnd, j as __conditionalCreate, m as __repeaterCreate, V as __repeaterTrackByIdentity, n as __property, o as __advance, p as __textInterpolate, s as __conditional, u as __attribute, v as __repeater, q as __textInterpolate1, L as __getCurrentView, w as __nextContext, z as __classProp, a6 as __repeaterTrackByIndex, r as __pureFunction1, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { L as LocaleService, a8 as MEETING_KINDS, a9 as MEETING_MODES, i as inScope, J as AccessDeniedError } from './locale.service-c0QhtcVY.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { q as CheckListComponent, M as ModalComponent, S as SelectComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';
import { I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';

var _a;
var MEETING_KIND_LABEL = {
  "assembl\xE9e g\xE9n\xE9rale": "reunions.kind.assembl\xE9e g\xE9n\xE9rale",
  "assembl\xE9e extraordinaire": "reunions.kind.assembl\xE9e extraordinaire",
  bureau: "reunions.kind.bureau",
  autre: "reunions.kind.autre"
};
var MEETING_STATUS_LABEL = {
  planifi\u00E9e: "reunions.status.planifi\xE9e",
  tenue: "reunions.status.tenue",
  annul\u00E9e: "reunions.status.annul\xE9e"
};
var _c0 = (a0) => ({ name: a0 });
var _c1 = (a0) => ({ n: a0 });
function MeetingFormDialogComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "p", 4);
    __text(1);
    __elementEnd();
    __elementStart(2, "ui-select", 22);
    __listener("valueChange", function MeetingFormDialogComponent_Conditional_5_Template_ui_select_valueChange_2_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.scoopId.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate(ctx_r1.t()("reunions.form.scoop"));
    __advance();
    __property("label", ctx_r1.t()("reunions.form.scoop"))("options", ctx_r1.scoopOptions())("value", ctx_r1.scoopId());
  }
}
function MeetingFormDialogComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "button", 23);
    __listener("click", function MeetingFormDialogComponent_For_10_Template_button_click_0_listener() {
      const meetingKind_r4 = __restoreView(_r3).$implicit;
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.kind.set(meetingKind_r4));
    });
    __elementStart(1, "span", 24);
    __element(2, "ui-icon", 25);
    __elementEnd();
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const meetingKind_r4 = ctx.$implicit;
    const ctx_r1 = __nextContext();
    __classProp("on", ctx_r1.kind() === meetingKind_r4);
    __attribute("aria-checked", ctx_r1.kind() === meetingKind_r4);
    __advance(2);
    __property("name", ctx_r1.kindIcon[meetingKind_r4])("size", 18);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()(ctx_r1.kindLabel[meetingKind_r4]), " ");
  }
}
function MeetingFormDialogComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "button", 23);
    __listener("click", function MeetingFormDialogComponent_For_20_Template_button_click_0_listener() {
      const option_r6 = __restoreView(_r5).$implicit;
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.mode.set(option_r6));
    });
    __elementStart(1, "span", 24);
    __element(2, "ui-icon", 25);
    __elementEnd();
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const option_r6 = ctx.$implicit;
    const ctx_r1 = __nextContext();
    __classProp("on", ctx_r1.mode() === option_r6);
    __attribute("aria-checked", ctx_r1.mode() === option_r6);
    __advance(2);
    __property("name", ctx_r1.modeIcon[option_r6])("size", 18);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()(ctx_r1.modeLabel[option_r6]), " ");
  }
}
function MeetingFormDialogComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "ui-text-field", 26);
    __listener("valueChange", function MeetingFormDialogComponent_Conditional_21_Template_ui_text_field_valueChange_0_listener($event) {
      __restoreView(_r7);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.place.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __property("label", ctx_r1.t()("reunions.form.place"))("value", ctx_r1.place())("error", ctx_r1.tried() ? ctx_r1.errPlace() : "");
  }
}
function MeetingFormDialogComponent_Conditional_22_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = __getCurrentView();
    __elementStart(0, "p", 30);
    __text(1);
    __elementEnd();
    __elementStart(2, "p", 31);
    __text(3);
    __elementEnd();
    __elementStart(4, "button", 16);
    __listener("click", function MeetingFormDialogComponent_Conditional_22_Conditional_11_Template_button_click_4_listener() {
      __restoreView(_r9);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.jitsiUrl.set(ctx_r1.newJitsiUrl()));
    });
    __element(5, "ui-icon", 32);
    __text(6);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("reunions.form.link.jitsiHelp"));
    __advance(2);
    __textInterpolate(ctx_r1.jitsiUrl());
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("reunions.form.link.jitsiNew"));
  }
}
function MeetingFormDialogComponent_Conditional_22_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "ui-text-field", 33);
    __listener("valueChange", function MeetingFormDialogComponent_Conditional_22_Conditional_12_Template_ui_text_field_valueChange_0_listener($event) {
      __restoreView(_r10);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.onlineUrl.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __property("label", ctx_r1.t()("reunions.form.link.url"))("value", ctx_r1.onlineUrl())("error", ctx_r1.tried() ? ctx_r1.errLink() : "");
  }
}
function MeetingFormDialogComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = __getCurrentView();
    __elementStart(0, "p", 10);
    __text(1);
    __elementEnd();
    __elementStart(2, "div", 11)(3, "button", 23);
    __listener("click", function MeetingFormDialogComponent_Conditional_22_Template_button_click_3_listener() {
      __restoreView(_r8);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.linkKind.set("jitsi"));
    });
    __elementStart(4, "span", 24);
    __element(5, "ui-icon", 27);
    __elementEnd();
    __text(6);
    __elementEnd();
    __elementStart(7, "button", 23);
    __listener("click", function MeetingFormDialogComponent_Conditional_22_Template_button_click_7_listener() {
      __restoreView(_r8);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.linkKind.set("other"));
    });
    __elementStart(8, "span", 24);
    __element(9, "ui-icon", 28);
    __elementEnd();
    __text(10);
    __elementEnd()();
    __conditionalCreate(11, MeetingFormDialogComponent_Conditional_22_Conditional_11_Template, 7, 4)(12, MeetingFormDialogComponent_Conditional_22_Conditional_12_Template, 1, 3, "ui-text-field", 29);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate(ctx_r1.t()("reunions.form.link.kind"));
    __advance();
    __attribute("aria-label", ctx_r1.t()("reunions.form.link.kind"));
    __advance();
    __classProp("on", ctx_r1.linkKind() === "jitsi");
    __attribute("aria-checked", ctx_r1.linkKind() === "jitsi");
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.t()("reunions.form.link.jitsi"), " ");
    __advance();
    __classProp("on", ctx_r1.linkKind() === "other");
    __attribute("aria-checked", ctx_r1.linkKind() === "other");
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.t()("reunions.form.link.other"), " ");
    __advance();
    __conditional(ctx_r1.linkKind() === "jitsi" ? 11 : 12);
  }
}
function MeetingFormDialogComponent_Conditional_23_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "ui-check-list", 42);
    __listener("valueChange", function MeetingFormDialogComponent_Conditional_23_Conditional_5_Template_ui_check_list_valueChange_0_listener($event) {
      __restoreView(_r12);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.orgIds.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __property("label", ctx_r1.t()("reunions.form.who.orgs"))("options", ctx_r1.orgOptions())("value", ctx_r1.orgIds());
  }
}
function MeetingFormDialogComponent_Conditional_23_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "ui-check-list", 43);
    __listener("valueChange", function MeetingFormDialogComponent_Conditional_23_Conditional_6_Template_ui_check_list_valueChange_0_listener($event) {
      __restoreView(_r13);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.staffIds.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __property("label", ctx_r1.t()("reunions.form.who.staff"))("options", ctx_r1.staffOptions())("value", ctx_r1.staffIds());
  }
}
function MeetingFormDialogComponent_Conditional_23_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = __getCurrentView();
    __elementStart(0, "li", 44);
    __text(1);
    __elementStart(2, "button", 45);
    __listener("click", function MeetingFormDialogComponent_Conditional_23_Conditional_9_For_2_Template_button_click_2_listener() {
      const \u0275$index_110_r15 = __restoreView(_r14).$index;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.removeOther(\u0275$index_110_r15));
    });
    __element(3, "ui-icon", 46);
    __elementEnd()();
  }
  if (rf & 2) {
    const guest_r16 = ctx.$implicit;
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", guest_r16, " ");
    __advance();
    __attribute("aria-label", ctx_r1.t()("reunions.form.who.remove", __pureFunction1(3, _c0, guest_r16)));
    __advance();
    __property("size", 14);
  }
}
function MeetingFormDialogComponent_Conditional_23_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ul", 38);
    __repeaterCreate(1, MeetingFormDialogComponent_Conditional_23_Conditional_9_For_2_Template, 4, 5, "li", 44, __repeaterTrackByIndex);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __repeater(ctx_r1.others());
  }
}
function MeetingFormDialogComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = __getCurrentView();
    __elementStart(0, "h3", 2);
    __element(1, "ui-icon", 34);
    __text(2);
    __elementEnd();
    __elementStart(3, "p", 35);
    __text(4);
    __elementEnd();
    __conditionalCreate(5, MeetingFormDialogComponent_Conditional_23_Conditional_5_Template, 1, 3, "ui-check-list", 36);
    __conditionalCreate(6, MeetingFormDialogComponent_Conditional_23_Conditional_6_Template, 1, 3, "ui-check-list", 37);
    __elementStart(7, "p", 10);
    __text(8);
    __elementEnd();
    __conditionalCreate(9, MeetingFormDialogComponent_Conditional_23_Conditional_9_Template, 3, 0, "ul", 38);
    __elementStart(10, "div", 39)(11, "input", 40);
    __listener("input", function MeetingFormDialogComponent_Conditional_23_Template_input_input_11_listener($event) {
      __restoreView(_r11);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.otherDraft.set($event.target.value));
    })("keydown.enter", function MeetingFormDialogComponent_Conditional_23_Template_input_keydown_enter_11_listener($event) {
      __restoreView(_r11);
      const ctx_r1 = __nextContext();
      $event.preventDefault();
      return __resetView(ctx_r1.addOther());
    });
    __elementEnd();
    __elementStart(12, "button", 41);
    __listener("click", function MeetingFormDialogComponent_Conditional_23_Template_button_click_12_listener() {
      __restoreView(_r11);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.addOther());
    });
    __element(13, "ui-icon", 17);
    __text(14);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("reunions.form.section.who"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("reunions.form.who.hint"));
    __advance();
    __conditional(ctx_r1.orgOptions().length ? 5 : -1);
    __advance();
    __conditional(ctx_r1.staffOptions().length ? 6 : -1);
    __advance(2);
    __textInterpolate(ctx_r1.t()("reunions.form.who.others"));
    __advance();
    __conditional(ctx_r1.others().length ? 9 : -1);
    __advance(2);
    __property("placeholder", ctx_r1.t()("reunions.form.who.othersPh"))("value", ctx_r1.otherDraft());
    __attribute("aria-label", ctx_r1.t()("reunions.form.who.others"));
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("reunions.form.who.add"));
  }
}
function MeetingFormDialogComponent_Conditional_27_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = __getCurrentView();
    __elementStart(0, "li", 47)(1, "span", 48);
    __text(2);
    __elementEnd();
    __elementStart(3, "input", 49);
    __listener("input", function MeetingFormDialogComponent_Conditional_27_For_2_Template_input_input_3_listener($event) {
      const \u0275$index_135_r18 = __restoreView(_r17).$index;
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.setPoint(\u0275$index_135_r18, $event.target.value));
    })("keydown.enter", function MeetingFormDialogComponent_Conditional_27_For_2_Template_input_keydown_enter_3_listener($event) {
      const \u0275$index_135_r18 = __restoreView(_r17).$index;
      const ctx_r1 = __nextContext(2);
      $event.preventDefault();
      return __resetView(ctx_r1.addPoint(\u0275$index_135_r18 + 1));
    });
    __elementEnd();
    __elementStart(4, "button", 50);
    __listener("click", function MeetingFormDialogComponent_Conditional_27_For_2_Template_button_click_4_listener() {
      const \u0275$index_135_r18 = __restoreView(_r17).$index;
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.removePoint(\u0275$index_135_r18));
    });
    __element(5, "ui-icon", 46);
    __elementEnd()();
  }
  if (rf & 2) {
    const item_r19 = ctx.$implicit;
    const \u0275$index_135_r18 = ctx.$index;
    const ctx_r1 = __nextContext(2);
    __advance(2);
    __textInterpolate(\u0275$index_135_r18 + 1);
    __advance();
    __property("placeholder", ctx_r1.t()("ui.field.ph.agendaItem"))("value", item_r19);
    __attribute("aria-label", ctx_r1.t()("reunions.form.agendaPoint", __pureFunction1(6, _c1, \u0275$index_135_r18 + 1)));
    __advance();
    __attribute("aria-label", ctx_r1.t()("reunions.form.agendaRemove", __pureFunction1(8, _c1, \u0275$index_135_r18 + 1)));
    __advance();
    __property("size", 18);
  }
}
function MeetingFormDialogComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ol", 14);
    __repeaterCreate(1, MeetingFormDialogComponent_Conditional_27_For_2_Template, 6, 10, "li", 47, __repeaterTrackByIndex);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __repeater(ctx_r1.agenda());
  }
}
function MeetingFormDialogComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 15);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate(ctx_r1.t()("reunions.form.agendaEmpty"));
  }
}
var pad = (n) => String(n).padStart(2, "0");
function toLocalInput(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
var KIND_ICON = {
  "assembl\xE9e g\xE9n\xE9rale": "group",
  "assembl\xE9e extraordinaire": "gavel",
  bureau: "badge",
  autre: "event"
};
var MODE_ICON = {
  "sur place": "location_on",
  "en ligne": "public",
  mixte: "hub"
};
var MODE_LABEL = {
  "sur place": "reunions.form.mode.onsite",
  "en ligne": "reunions.form.mode.online",
  mixte: "reunions.form.mode.mixed"
};
var MeetingFormDialogComponent = (_a = class {
  constructor() {
    this.locale = inject(LocaleService);
    this.store = inject(StoreService);
    this.router = inject(Router);
    this.t = this.locale.t;
    this.kindLabel = MEETING_KIND_LABEL;
    this.kindIcon = KIND_ICON;
    this.meetingKinds = [...MEETING_KINDS];
    this.meetingModes = [...MEETING_MODES];
    this.modeIcon = MODE_ICON;
    this.modeLabel = MODE_LABEL;
    this.host = inject(ElementRef);
    this.open = model(false, ...[]);
    this.meeting = input(void 0, ...[]);
    this.defaultScoopId = input(void 0, ...[]);
    this.defaultDate = input(void 0, ...[]);
    this.notify = output();
    this.closed = output();
    this.scoops = computed(() => {
      const all = this.store.state().scoops;
      const session = this.store.state().session;
      return all.filter((s) => inScope([{ scoopId: s.id }], session).length === 1);
    }, ...[]);
    this.titleText = computed(() => this.meeting() ? this.t()("reunions.form.editTitle") : this.t()("reunions.form.createTitle"), ...[]);
    this.descriptionText = computed(() => this.meeting() ? this.t()("reunions.form.editDescription") : this.t()("reunions.form.createDescription"), ...[]);
    this.submitLabel = computed(() => this.meeting() ? this.t()("reunions.form.save") : this.t()("reunions.form.create"), ...[]);
    this.scoopOptions = computed(() => this.scoops().map((s) => ({
      value: s.id,
      label: s.name
    })), ...[]);
    this.scoopId = signal("", ...[]);
    this.orgOptions = computed(() => this.store.state().orgs.filter((org) => org.scoopId === this.scoopId()).sort((first, second) => first.name.localeCompare(second.name)).map((org) => ({
      value: org.id,
      label: org.name
    })), ...[]);
    this.staffOptions = computed(() => this.store.state().users.filter((user) => {
      var _a2;
      return (user.scoopId === this.scoopId() || ((_a2 = user.scoopIds) == null ? void 0 : _a2.includes(this.scoopId()))) && user.role !== "faitiere" && user.role !== "admin" && user.role !== "superadmin";
    }).sort((first, second) => first.name.localeCompare(second.name)).map((user) => ({
      value: user.id,
      label: user.name,
      hint: this.store.roleLabel(user.role)
    })), ...[]);
    this.kind = signal("assembl\xE9e g\xE9n\xE9rale", ...[]);
    this.title = signal("", ...[]);
    this.dateLocal = signal("", ...[]);
    this.place = signal("", ...[]);
    this.mode = signal("sur place", ...[]);
    this.linkKind = signal("jitsi", ...[]);
    this.jitsiUrl = signal("", ...[]);
    this.onlineUrl = signal("", ...[]);
    this.orgIds = signal([], ...[]);
    this.staffIds = signal([], ...[]);
    this.others = signal([], ...[]);
    this.otherDraft = signal("", ...[]);
    this.agenda = signal([], ...[]);
    this.tried = signal(false, ...[]);
    effect(() => {
      if (!this.open()) return;
      untracked(() => this.resetForm());
    });
  }
  resetForm() {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const m = this.meeting();
    const defScoop = this.defaultScoopId();
    const list = this.scoops();
    const allowed = new Set(list.map((s) => s.id));
    this.tried.set(false);
    if (m) {
      this.scoopId.set(m.scoopId);
      this.kind.set(m.kind);
      this.title.set(m.title);
      this.dateLocal.set(toLocalInput(m.date));
      this.place.set(m.place);
      this.mode.set((_a2 = m.mode) != null ? _a2 : "sur place");
      const isJitsi = !m.onlineUrl || m.onlineUrl.startsWith("https://meet.jit.si/");
      this.linkKind.set(isJitsi ? "jitsi" : "other");
      this.jitsiUrl.set(isJitsi && m.onlineUrl ? m.onlineUrl : this.newJitsiUrl());
      this.onlineUrl.set(isJitsi ? "" : (_b = m.onlineUrl) != null ? _b : "");
      this.orgIds.set([...(_d = (_c = m.audience) == null ? void 0 : _c.orgIds) != null ? _d : []]);
      this.staffIds.set([...(_f = (_e = m.audience) == null ? void 0 : _e.staffIds) != null ? _f : []]);
      this.others.set([...(_h = (_g = m.audience) == null ? void 0 : _g.others) != null ? _h : []]);
      this.otherDraft.set("");
      this.agenda.set([...m.agenda]);
      return;
    }
    this.scoopId.set((_j = defScoop && allowed.has(defScoop) ? defScoop : (_i = list[0]) == null ? void 0 : _i.id) != null ? _j : "");
    this.kind.set("assembl\xE9e g\xE9n\xE9rale");
    this.title.set("");
    const dd = this.defaultDate();
    this.dateLocal.set(dd ? toLocalInput(new Date(dd.getFullYear(), dd.getMonth(), dd.getDate(), 9, 0).toISOString()) : "");
    this.place.set("");
    this.mode.set("sur place");
    this.linkKind.set("jitsi");
    this.jitsiUrl.set(this.newJitsiUrl());
    this.onlineUrl.set("");
    this.orgIds.set([]);
    this.staffIds.set([]);
    this.others.set([]);
    this.otherDraft.set("");
    this.agenda.set([""]);
  }
  errTitle() {
    return this.title().trim() ? "" : this.t()("reunions.form.errorTitle");
  }
  errDate() {
    return this.dateLocal() ? "" : this.t()("reunions.form.errorDate");
  }
  errPlace() {
    return this.mode() === "en ligne" || this.place().trim() ? "" : this.t()("reunions.form.errorPlace");
  }
  /** Salle Jitsi au nom aléatoire (12 caractères) : le lien ne se devine pas et marche tout de suite, sans compte. */
  newJitsiUrl() {
    const letters = "abcdefghjkmnpqrstuvwxyz23456789";
    const picks = /* @__PURE__ */ new Uint32Array(12);
    globalThis.crypto.getRandomValues(picks);
    return `https://meet.jit.si/mbay-diaay-${Array.from(picks, (value) => letters[value % 31]).join("")}`;
  }
  /** Lien choisi : celui de Jitsi, ou l'adresse saisie (https obligatoire) pour une réunion en ligne ou mixte. */
  chosenUrl() {
    return this.linkKind() === "jitsi" ? this.jitsiUrl() : this.onlineUrl().trim();
  }
  errLink() {
    if (this.mode() === "sur place" || this.linkKind() === "jitsi") return "";
    try {
      return new URL(this.onlineUrl().trim()).protocol === "https:" ? "" : this.t()("errors.meeting.link");
    } catch {
      return this.t()("errors.meeting.link");
    }
  }
  addOther() {
    const name = this.otherDraft().trim();
    if (!name) return;
    this.others.update((list) => list.includes(name) ? list : [...list, name]);
    this.otherDraft.set("");
  }
  removeOther(position) {
    this.others.update((list) => list.filter((_, index) => index !== position));
  }
  setPoint(i, value) {
    this.agenda.update((list) => list.map((x, j) => j === i ? value : x));
  }
  /** Ajoute un point à la position donnée et y place le curseur. */
  addPoint(at) {
    this.agenda.update((list) => [
      ...list.slice(0, at),
      "",
      ...list.slice(at)
    ]);
    setTimeout(() => {
      var _a2;
      (_a2 = this.host.nativeElement.ownerDocument.querySelectorAll("ui-modal .agenda-input")[at]) == null ? void 0 : _a2.focus();
    });
  }
  removePoint(i) {
    this.agenda.update((list) => list.filter((_, j) => j !== i));
  }
  close() {
    this.open.set(false);
    this.closed.emit();
  }
  submit() {
    this.tried.set(true);
    if (this.errTitle() || this.errDate() || this.errPlace() || this.errLink()) return;
    this.addOther();
    const agenda = this.agenda().map((l) => l.trim()).filter(Boolean);
    const m = this.meeting();
    try {
      if (m) {
        const res2 = this.store.actions.updateMeeting(m.id, {
          kind: this.kind(),
          title: this.title(),
          date: this.dateLocal(),
          place: this.place(),
          agenda,
          mode: this.mode(),
          onlineUrl: this.chosenUrl(),
          audience: {
            orgIds: this.orgIds(),
            staffIds: this.staffIds(),
            others: this.others()
          }
        });
        if (!res2.ok) {
          this.pushError(res2.error);
          return;
        }
        this.notify.emit({
          kind: "success",
          text: this.t()("reunions.form.saved")
        });
        this.open.set(false);
        this.closed.emit();
        return;
      }
      const res = this.store.actions.createMeeting({
        scoopId: this.scoopId(),
        kind: this.kind(),
        title: this.title(),
        date: this.dateLocal(),
        place: this.place(),
        agenda,
        mode: this.mode(),
        onlineUrl: this.chosenUrl(),
        audience: {
          orgIds: this.orgIds(),
          staffIds: this.staffIds(),
          others: this.others()
        }
      });
      if (!res.ok) {
        this.pushError(res.error);
        return;
      }
      this.notify.emit({
        kind: "success",
        text: this.t()("reunions.form.created")
      });
      this.open.set(false);
      this.closed.emit();
      this.router.navigate(["/dashboard/reunions", res.id]);
    } catch (e) {
      this.notify.emit({
        kind: "error",
        text: this.exceptionText(e)
      });
    }
  }
  pushError(key) {
    this.notify.emit({
      kind: "error",
      text: this.locale.tNow(key)
    });
  }
  exceptionText(e) {
    if (e instanceof AccessDeniedError) return this.locale.tNow(e.key);
    return e instanceof Error ? e.message : String(e);
  }
}, _a.\u0275fac = function MeetingFormDialogComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-meeting-form-dialog"]],
  inputs: {
    open: [1, "open"],
    meeting: [1, "meeting"],
    defaultScoopId: [1, "defaultScoopId"],
    defaultDate: [1, "defaultDate"]
  },
  outputs: {
    open: "openChange",
    notify: "notify",
    closed: "closed"
  },
  decls: 38,
  vars: 31,
  consts: [
    [
      "icon",
      "calendar_month",
      3,
      "closed",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [1, "pb-6"],
    [1, "sec"],
    [
      "name",
      "event",
      3,
      "size"
    ],
    [1, "lbl"],
    [
      "role",
      "radiogroup",
      1,
      "kinds",
      "mt-2"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "kind",
      3,
      "on"
    ],
    [
      "preset",
      "meetingTitle",
      1,
      "mt-5",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      "name",
      "location_on",
      3,
      "size"
    ],
    [
      "type",
      "datetime-local",
      "icon",
      "calendar_today",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      1,
      "lbl",
      "mt-5"
    ],
    [
      "role",
      "radiogroup",
      1,
      "kinds",
      "modes",
      "mt-2"
    ],
    [
      "preset",
      "place",
      1,
      "mt-5",
      3,
      "label",
      "value",
      "error"
    ],
    [
      "name",
      "fact_check",
      3,
      "size"
    ],
    [1, "points"],
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
    [
      "type",
      "button",
      1,
      "add",
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
    [1, "chip"],
    [
      "name",
      "check",
      3,
      "size"
    ],
    [
      "leadingIcon",
      "apartment",
      1,
      "mb-5",
      "mt-2",
      "block",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "kind",
      3,
      "click"
    ],
    [1, "ico"],
    [
      3,
      "name",
      "size"
    ],
    [
      "preset",
      "place",
      1,
      "mt-5",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      "name",
      "public",
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
      "type",
      "text",
      "icon",
      "link",
      "placeholder",
      "https://\u2026",
      1,
      "mt-4",
      3,
      "label",
      "value",
      "error"
    ],
    [
      1,
      "mt-3",
      "text-[13px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "mt-2",
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
      "var(--v2-foret)"
    ],
    [
      "name",
      "refresh",
      3,
      "size"
    ],
    [
      "type",
      "text",
      "icon",
      "link",
      "placeholder",
      "https://\u2026",
      1,
      "mt-4",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      "name",
      "group",
      3,
      "size"
    ],
    [
      1,
      "mb-3",
      "text-[13px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      3,
      "label",
      "options",
      "value"
    ],
    [
      1,
      "mt-5",
      "block",
      3,
      "label",
      "options",
      "value"
    ],
    [
      1,
      "mt-2",
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      1,
      "mt-2",
      "flex",
      "gap-2"
    ],
    [
      "maxlength",
      "80",
      1,
      "agenda-input",
      3,
      "input",
      "keydown.enter",
      "placeholder",
      "value"
    ],
    [
      "type",
      "button",
      1,
      "add",
      2,
      "margin-top",
      "0",
      3,
      "click"
    ],
    [
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      1,
      "mt-5",
      "block",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      1,
      "inline-flex",
      "items-center",
      "gap-1.5",
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
      "type",
      "button",
      3,
      "click"
    ],
    [
      "name",
      "close",
      3,
      "size"
    ],
    [1, "point"],
    [
      "aria-hidden",
      "true",
      1,
      "num"
    ],
    [
      "maxlength",
      "160",
      1,
      "agenda-input",
      3,
      "input",
      "keydown.enter",
      "placeholder",
      "value"
    ],
    [
      "type",
      "button",
      1,
      "rm",
      3,
      "click"
    ]
  ],
  template: function MeetingFormDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "ui-modal", 0);
      __listener("closed", function MeetingFormDialogComponent_Template_ui_modal_closed_0_listener() {
        return ctx.close();
      });
      __elementStart(1, "div", 1)(2, "h3", 2);
      __element(3, "ui-icon", 3);
      __text(4);
      __elementEnd();
      __conditionalCreate(5, MeetingFormDialogComponent_Conditional_5_Template, 3, 4);
      __elementStart(6, "p", 4);
      __text(7);
      __elementEnd();
      __elementStart(8, "div", 5);
      __repeaterCreate(9, MeetingFormDialogComponent_For_10_Template, 4, 6, "button", 6, __repeaterTrackByIdentity);
      __elementEnd();
      __elementStart(11, "ui-text-field", 7);
      __listener("valueChange", function MeetingFormDialogComponent_Template_ui_text_field_valueChange_11_listener($event) {
        return ctx.title.set($event);
      });
      __elementEnd();
      __elementStart(12, "h3", 2);
      __element(13, "ui-icon", 8);
      __text(14);
      __elementEnd();
      __elementStart(15, "ui-text-field", 9);
      __listener("valueChange", function MeetingFormDialogComponent_Template_ui_text_field_valueChange_15_listener($event) {
        return ctx.dateLocal.set($event);
      });
      __elementEnd();
      __elementStart(16, "p", 10);
      __text(17);
      __elementEnd();
      __elementStart(18, "div", 11);
      __repeaterCreate(19, MeetingFormDialogComponent_For_20_Template, 4, 6, "button", 6, __repeaterTrackByIdentity);
      __elementEnd();
      __conditionalCreate(21, MeetingFormDialogComponent_Conditional_21_Template, 1, 3, "ui-text-field", 12);
      __conditionalCreate(22, MeetingFormDialogComponent_Conditional_22_Template, 13, 13);
      __conditionalCreate(23, MeetingFormDialogComponent_Conditional_23_Template, 15, 12);
      __elementStart(24, "h3", 2);
      __element(25, "ui-icon", 13);
      __text(26);
      __elementEnd();
      __conditionalCreate(27, MeetingFormDialogComponent_Conditional_27_Template, 3, 0, "ol", 14)(28, MeetingFormDialogComponent_Conditional_28_Template, 2, 1, "p", 15);
      __elementStart(29, "button", 16);
      __listener("click", function MeetingFormDialogComponent_Template_button_click_29_listener() {
        return ctx.addPoint(ctx.agenda().length);
      });
      __element(30, "ui-icon", 17);
      __text(31);
      __elementEnd()();
      __elementStart(32, "button", 18);
      __listener("click", function MeetingFormDialogComponent_Template_button_click_32_listener() {
        return ctx.close();
      });
      __text(33);
      __elementEnd();
      __elementStart(34, "button", 19);
      __listener("click", function MeetingFormDialogComponent_Template_button_click_34_listener() {
        return ctx.submit();
      });
      __text(35);
      __elementStart(36, "span", 20);
      __element(37, "ui-icon", 21);
      __elementEnd()()();
    }
    if (rf & 2) {
      __property("open", ctx.open())("title", ctx.titleText())("description", ctx.descriptionText())("width", 720)("closeLabel", ctx.t()("common.close"));
      __advance(3);
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("reunions.form.section.what"));
      __advance();
      __conditional(!ctx.meeting() && ctx.scoops().length > 1 ? 5 : -1);
      __advance(2);
      __textInterpolate(ctx.t()("reunions.form.kind"));
      __advance();
      __attribute("aria-label", ctx.t()("reunions.form.kind"));
      __advance();
      __repeater(ctx.meetingKinds);
      __advance(2);
      __property("label", ctx.t()("reunions.form.title"))("value", ctx.title())("error", ctx.tried() ? ctx.errTitle() : "");
      __advance(2);
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("reunions.form.section.when"));
      __advance();
      __property("label", ctx.t()("reunions.form.date"))("value", ctx.dateLocal())("error", ctx.tried() ? ctx.errDate() : "");
      __advance(2);
      __textInterpolate(ctx.t()("reunions.form.mode"));
      __advance();
      __attribute("aria-label", ctx.t()("reunions.form.mode"));
      __advance();
      __repeater(ctx.meetingModes);
      __advance(2);
      __conditional(ctx.mode() !== "en ligne" ? 21 : -1);
      __advance();
      __conditional(ctx.mode() !== "sur place" ? 22 : -1);
      __advance();
      __conditional(23);
      __advance(2);
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("reunions.form.section.agenda"));
      __advance();
      __conditional(ctx.agenda().length ? 27 : 28);
      __advance(3);
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("reunions.form.agendaAdd"), " ");
      __advance(2);
      __textInterpolate(ctx.t()("producteurs.index.cancel"));
      __advance(2);
      __textInterpolate1(" ", ctx.submitLabel(), " ");
      __advance(2);
      __property("size", 18);
    }
  },
  dependencies: [
    CheckListComponent,
    IconComponent,
    ModalComponent,
    SelectComponent,
    TextFieldComponent
  ],
  styles: [".modes[_ngcontent-%COMP%] {\n      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;\n    }\n    .sec[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n      margin: 24px 0 12px;\n      font-size: 14px;\n      font-weight: 800;\n      color: var(--%NS%v2-foret);\n    }\n    .sec[_ngcontent-%COMP%]:first-child {\n      margin-top: 4px;\n    }\n    .lbl[_ngcontent-%COMP%] {\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0.06em;\n      text-transform: uppercase;\n      color: var(--%NS%v2-ardoise);\n    }\n    .kinds[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 8px;\n    }\n    @media (min-width: 640px) {\n      .kinds[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(4, minmax(0, 1fr));\n      }\n    }\n    .kind[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      gap: 8px;\n      border-radius: 16px;\n      border: 1.5px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n      padding: 12px;\n      text-align: left;\n      font-size: 13px;\n      font-weight: 700;\n      line-height: 1.25;\n      color: var(--%NS%v2-encre);\n      cursor: pointer;\n      transition:\n        border-color 0.15s ease,\n        background-color 0.15s ease;\n    }\n    .kind[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-texte);\n    }\n    .kind.on[_ngcontent-%COMP%] {\n      border: 2px solid var(--%NS%v2-foret);\n      background: var(--%NS%v2-sauge);\n      padding: 11.5px;\n    }\n    .kind[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    .kind[_ngcontent-%COMP%]   .ico[_ngcontent-%COMP%] {\n      display: grid;\n      height: 32px;\n      width: 32px;\n      place-items: center;\n      border-radius: 10px;\n      background: var(--%NS%v2-creme);\n      color: var(--%NS%v2-foret);\n    }\n    .kind.on[_ngcontent-%COMP%]   .ico[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n    }\n    .points[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 8px;\n    }\n    .point[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n    }\n    .num[_ngcontent-%COMP%] {\n      display: grid;\n      height: 32px;\n      width: 32px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 999px;\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n      font-size: 12px;\n      font-weight: 800;\n    }\n    .point[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n      height: 48px;\n      min-width: 0;\n      flex: 1;\n      border-radius: 14px;\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      padding: 0 14px;\n      font-size: 15px;\n      font-weight: 600;\n      color: var(--%NS%v2-encre);\n    }\n    .point[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n      color: var(--%NS%v2-gris-texte);\n      font-weight: 500;\n    }\n    .point[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-texte);\n    }\n    .point[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible {\n      outline: none;\n      border: 2px solid var(--%NS%v2-foret);\n      box-shadow: var(--%NS%v2-halo);\n    }\n    .rm[_ngcontent-%COMP%] {\n      display: grid;\n      height: 40px;\n      width: 40px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 12px;\n      color: var(--%NS%v2-ardoise);\n      cursor: pointer;\n    }\n    .rm[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-erreur-bg);\n      color: var(--%NS%v2-erreur-fg);\n    }\n    .rm[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n    }\n    .add[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 6px;\n      margin-top: 10px;\n      border-radius: 12px;\n      padding: 8px 12px;\n      font-size: 14px;\n      font-weight: 800;\n      color: var(--%NS%v2-foret);\n      cursor: pointer;\n    }\n    .add[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-sauge);\n    }\n    .add[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n    }\n    .btn[_ngcontent-%COMP%] {\n      display: inline-flex;\n      height: 48px;\n      align-items: center;\n      gap: 10px;\n      border-radius: 16px;\n      padding: 0 18px;\n      font-size: 15px;\n      font-weight: 800;\n      cursor: pointer;\n    }\n    .btn-primary[_ngcontent-%COMP%] {\n      padding: 0 6px 0 18px;\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    .btn-primary[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-foret-clair);\n    }\n    .btn-ghost[_ngcontent-%COMP%] {\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-encre);\n    }\n    .btn-ghost[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-texte);\n    }\n    .chip[_ngcontent-%COMP%] {\n      display: grid;\n      height: 36px;\n      width: 36px;\n      place-items: center;\n      border-radius: 12px;\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n    }"]
}), _a);

export { MEETING_KIND_LABEL as M, MEETING_STATUS_LABEL as a, MeetingFormDialogComponent as b };
//# sourceMappingURL=meeting-form-dialog.component-BwzxH9Pe.mjs.map

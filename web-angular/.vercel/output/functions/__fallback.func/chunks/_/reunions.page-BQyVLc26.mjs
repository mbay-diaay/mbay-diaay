import { i as inject, A as ActivatedRoute, R as Router, F as signal, c as computed, ɵ as __defineComponent, f as __elementStart, g as __text, h as __elementEnd, j as __conditionalCreate, b as __element, H as __listener, m as __repeaterCreate, I as __twoWayListener, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, s as __conditional, u as __attribute, z as __classProp, v as __repeater, x as __pureFunction2, K as __twoWayProperty, L as __getCurrentView, w as __nextContext, N as __textInterpolate2, O as __restoreView, P as __resetView, Q as __twoWayBindingSet, t as __styleProp, r as __pureFunction1 } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { L as LocaleService, j as nf, f as fmtDateTime, a7 as sortMeetings, a3 as scopedMeetings, s as scopedMembers, a8 as MEETING_KINDS, h as fmtDate, a4 as attendanceStats, J as AccessDeniedError } from './locale.service-c0QhtcVY.mjs';
import { M as MEETING_KIND_LABEL, a as MEETING_STATUS_LABEL, b as MeetingFormDialogComponent } from './meeting-form-dialog.component-BwzxH9Pe.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { G as GlobalFiltersComponent } from './global-filters.component-ncvklAvP.mjs';
import { i as initialsOf, T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { e as detailFact, k as detailKpi, f as DetailModalComponent, M as ModalComponent, P as PaginationComponent, g as StatCardsComponent, p as UiEventCalendarComponent } from './ui-DDO8FoUF.mjs';
import { map, startWith } from 'rxjs';
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
var _c0 = (a0, a1) => ({
  shown: a0,
  total: a1
});
var _c1 = (a0) => ({ title: a0 });
var _c2 = (a0, a1) => ({
  count: a0,
  total: a1
});
var _c3 = (a0, a1) => ({
  present: a0,
  total: a1
});
var _forTrack0 = ($index, $item) => $item.id;
function ReunionsPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 25);
    __listener("click", function ReunionsPage_Conditional_9_Template_button_click_0_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.openNewMeeting());
    });
    __text(1);
    __elementStart(2, "span", 26);
    __element(3, "ui-icon", 17);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("reunions.new"), " ");
    __advance(2);
    __property("size", 20);
  }
}
function ReunionsPage_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "button", 13);
    __listener("click", function ReunionsPage_For_22_Template_button_click_0_listener() {
      const filterDef_r4 = __restoreView(_r3).$implicit;
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.filter.set(filterDef_r4.id));
    });
    __text(1);
    __elementStart(2, "span", 14);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const filterDef_r4 = ctx.$implicit;
    const ctx_r1 = __nextContext();
    __classProp("on", ctx_r1.filter() === filterDef_r4.id);
    __attribute("aria-checked", ctx_r1.filter() === filterDef_r4.id);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()(filterDef_r4.label));
    __advance();
    __classProp("zero", !ctx_r1.countFor(filterDef_r4.id));
    __advance();
    __textInterpolate(ctx_r1.nf.format(ctx_r1.countFor(filterDef_r4.id)));
  }
}
function ReunionsPage_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "section", 19)(1, "ui-event-calendar", 27);
    __listener("eventClick", function ReunionsPage_Conditional_32_Template_ui_event_calendar_eventClick_1_listener($event) {
      __restoreView(_r5);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.detailId.set($event.id));
    })("dayCreate", function ReunionsPage_Conditional_32_Template_ui_event_calendar_dayCreate_1_listener($event) {
      __restoreView(_r5);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.onCalendarDayCreate($event));
    });
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __property("events", ctx_r1.calendarEvents())("categories", ctx_r1.meetingCategories())("dayCreateEnabled", ctx_r1.canManage());
  }
}
function ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 49);
    __text(1);
    __elementEnd();
    __elementStart(2, "span", 50);
    __element(3, "span");
    __elementEnd();
  }
  if (rf & 2) {
    const meeting_r7 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    const attendanceStat_r8 = ctx_r1.attendance(meeting_r7);
    __advance();
    __textInterpolate(ctx_r1.t()(attendanceStat_r8.present > 1 ? "reunions.attendance.autre" : "reunions.attendance.un", __pureFunction2(3, _c2, attendanceStat_r8.present, attendanceStat_r8.total)));
    __advance(2);
    __styleProp("width", attendanceStat_r8.rate, "%");
  }
}
function ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 44);
    __text(1, "\u2014");
    __elementEnd();
  }
}
function ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_22_Template(rf, ctx) {
  var _a2, _b;
  if (rf & 1) {
    __elementStart(0, "span", 42);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const meeting_r7 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    const minutesState_r9 = ctx_r1.minutes[(_b = (_a2 = meeting_r7.minutes) == null ? void 0 : _a2.status) != null ? _b : "none"];
    __styleProp("background", minutesState_r9.bg)("color", minutesState_r9.fg);
    __advance();
    __textInterpolate(ctx_r1.t()(minutesState_r9.label));
  }
}
function ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 44);
    __text(1, "\u2014");
    __elementEnd();
  }
}
function ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_26_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = __getCurrentView();
    __elementStart(0, "button", 54);
    __listener("click", function ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_26_Conditional_0_Template_button_click_0_listener($event) {
      __restoreView(_r11);
      const meeting_r7 = __nextContext(2).$implicit;
      const ctx_r1 = __nextContext(3);
      $event.stopPropagation();
      return __resetView(ctx_r1.openHold(meeting_r7.id));
    });
    __element(1, "ui-icon", 55);
    __elementEnd();
  }
  if (rf & 2) {
    const meeting_r7 = __nextContext(2).$implicit;
    const ctx_r1 = __nextContext(3);
    __property("title", ctx_r1.t()("reunions.attendance.submit"));
    __attribute("aria-label", ctx_r1.t()("reunions.row.hold", __pureFunction1(3, _c1, meeting_r7.title)));
    __advance();
    __property("size", 18);
  }
}
function ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __conditionalCreate(0, ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_26_Conditional_0_Template, 2, 5, "button", 51);
    __elementStart(1, "button", 52);
    __listener("click", function ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_26_Template_button_click_1_listener($event) {
      __restoreView(_r10);
      const meeting_r7 = __nextContext().$implicit;
      const ctx_r1 = __nextContext(3);
      $event.stopPropagation();
      return __resetView(ctx_r1.openCancel(meeting_r7.id));
    });
    __element(2, "ui-icon", 53);
    __elementEnd();
  }
  if (rf & 2) {
    const meeting_r7 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __conditional(ctx_r1.isPast(meeting_r7.date) ? 0 : -1);
    __advance();
    __property("title", ctx_r1.t()("reunions.cancel.submit"));
    __attribute("aria-label", ctx_r1.t()("reunions.row.cancel", __pureFunction1(4, _c1, meeting_r7.title)));
    __advance();
    __property("size", 18);
  }
}
function ReunionsPage_Conditional_33_Conditional_1_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "tr", 35);
    __listener("click", function ReunionsPage_Conditional_33_Conditional_1_For_18_Template_tr_click_0_listener() {
      const meeting_r7 = __restoreView(_r6).$implicit;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.detailId.set(meeting_r7.id));
    });
    __elementStart(1, "td")(2, "span", 36)(3, "span", 37)(4, "span", 38);
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 39);
    __text(7);
    __elementEnd()();
    __elementStart(8, "span", 2)(9, "span", 40);
    __text(10);
    __elementEnd();
    __elementStart(11, "span", 41);
    __text(12);
    __elementEnd()()()();
    __elementStart(13, "td")(14, "span", 42);
    __text(15);
    __elementEnd()();
    __elementStart(16, "td", 43);
    __text(17);
    __elementEnd();
    __elementStart(18, "td");
    __conditionalCreate(19, ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_19_Template, 4, 6)(20, ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_20_Template, 2, 0, "span", 44);
    __elementEnd();
    __elementStart(21, "td");
    __conditionalCreate(22, ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_22_Template, 2, 5, "span", 45)(23, ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_23_Template, 2, 0, "span", 44);
    __elementEnd();
    __elementStart(24, "td")(25, "span", 46);
    __conditionalCreate(26, ReunionsPage_Conditional_33_Conditional_1_For_18_Conditional_26_Template, 3, 6);
    __elementStart(27, "button", 47);
    __listener("click", function ReunionsPage_Conditional_33_Conditional_1_For_18_Template_button_click_27_listener($event) {
      const meeting_r7 = __restoreView(_r6).$implicit;
      const ctx_r1 = __nextContext(3);
      $event.stopPropagation();
      return __resetView(ctx_r1.detailId.set(meeting_r7.id));
    });
    __element(28, "ui-icon", 48);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const meeting_r7 = ctx.$implicit;
    const ctx_r1 = __nextContext(3);
    __advance(3);
    __styleProp("background", meeting_r7.status === "planifi\xE9e" ? "var(--v2-foret)" : "var(--v2-creme)")("color", meeting_r7.status === "planifi\xE9e" ? "var(--v2-blanc)" : "var(--v2-ardoise)");
    __advance(2);
    __textInterpolate(ctx_r1.day(meeting_r7.date));
    __advance();
    __styleProp("color", meeting_r7.status === "planifi\xE9e" ? "var(--v2-citron)" : "var(--v2-gris-texte)");
    __advance();
    __textInterpolate(ctx_r1.month(meeting_r7.date));
    __advance(2);
    __property("title", meeting_r7.title);
    __advance();
    __textInterpolate(meeting_r7.title);
    __advance(2);
    __textInterpolate2("", ctx_r1.t()(ctx_r1.kindLabel[meeting_r7.kind]), " \xB7 ", ctx_r1.fmtDateTime(meeting_r7.date));
    __advance(2);
    __styleProp("background", ctx_r1.status[meeting_r7.status].bg)("color", ctx_r1.status[meeting_r7.status].fg);
    __advance();
    __textInterpolate(ctx_r1.t()(ctx_r1.statusLabel[meeting_r7.status]));
    __advance();
    __property("title", meeting_r7.place);
    __advance();
    __textInterpolate1(" ", meeting_r7.place, " ");
    __advance(2);
    __conditional(meeting_r7.status === "tenue" ? 19 : 20);
    __advance(3);
    __conditional(meeting_r7.status === "tenue" ? 22 : 23);
    __advance(4);
    __conditional(ctx_r1.canManage() && meeting_r7.status === "planifi\xE9e" ? 26 : -1);
    __advance();
    __property("title", ctx_r1.t()("common.view"));
    __attribute("aria-label", ctx_r1.t()("reunions.row.view", __pureFunction1(25, _c1, meeting_r7.title)));
    __advance();
    __property("size", 18);
  }
}
function ReunionsPage_Conditional_33_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 29)(1, "table", 30)(2, "thead")(3, "tr")(4, "th");
    __text(5);
    __elementEnd();
    __elementStart(6, "th");
    __text(7);
    __elementEnd();
    __elementStart(8, "th");
    __text(9);
    __elementEnd();
    __elementStart(10, "th", 31);
    __text(11);
    __elementEnd();
    __elementStart(12, "th");
    __text(13);
    __elementEnd();
    __elementStart(14, "th", 32);
    __text(15);
    __elementEnd()()();
    __elementStart(16, "tbody");
    __repeaterCreate(17, ReunionsPage_Conditional_33_Conditional_1_For_18_Template, 29, 27, "tr", 33, _forTrack0);
    __elementEnd()()();
    __element(19, "ui-pagination", 34);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance(5);
    __textInterpolate(ctx_r1.t()("reunions.col.title"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("reunions.col.status"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("reunions.col.place"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("reunions.col.attendance"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("reunions.col.minutes"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("reunions.col.actions"));
    __advance(2);
    __repeater(ctx_r1.pager.items());
    __advance(2);
    __property("pager", ctx_r1.pager);
  }
}
function ReunionsPage_Conditional_33_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 28)(1, "span", 56);
    __element(2, "ui-icon", 57);
    __elementEnd();
    __elementStart(3, "p", 58);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 59);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r1.t()("reunions.empty.title"));
    __advance(2);
    __textInterpolate1(" ", ctx_r1.mine().length ? ctx_r1.t()("reunions.empty.filtered") : ctx_r1.canManage() ? ctx_r1.t()("reunions.empty.create") : ctx_r1.t()("reunions.empty.readonly"), " ");
  }
}
function ReunionsPage_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 20);
    __conditionalCreate(1, ReunionsPage_Conditional_33_Conditional_1_Template, 20, 7)(2, ReunionsPage_Conditional_33_Conditional_2_Template, 7, 3, "div", 28);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __conditional(ctx_r1.shown().length ? 1 : 2);
  }
}
function ReunionsPage_Conditional_35_Conditional_1_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = __getCurrentView();
    __elementStart(0, "li")(1, "label", 69)(2, "input", 70);
    __listener("change", function ReunionsPage_Conditional_35_Conditional_1_For_7_Template_input_change_2_listener($event) {
      const member_r15 = __restoreView(_r14).$implicit;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.toggleHold(member_r15.id, $event));
    });
    __elementEnd();
    __elementStart(3, "span", 71);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 72);
    __text(6);
    __elementEnd()()();
  }
  if (rf & 2) {
    const member_r15 = ctx.$implicit;
    const ctx_r1 = __nextContext(3);
    __advance(2);
    __property("checked", ctx_r1.holdPresentIds().includes(member_r15.id));
    __advance(2);
    __textInterpolate(ctx_r1.initials(member_r15.firstName + " " + member_r15.lastName));
    __advance(2);
    __textInterpolate2("", member_r15.firstName, " ", member_r15.lastName);
  }
}
function ReunionsPage_Conditional_35_Conditional_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 61);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r1.t()("reunions.attendance.none"));
  }
}
function ReunionsPage_Conditional_35_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "div", 65)(1, "p", 66);
    __text(2);
    __elementEnd();
    __elementStart(3, "button", 67);
    __listener("click", function ReunionsPage_Conditional_35_Conditional_1_Template_button_click_3_listener() {
      __restoreView(_r13);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.toggleHoldAll());
    });
    __text(4);
    __elementEnd()();
    __elementStart(5, "ul", 68);
    __repeaterCreate(6, ReunionsPage_Conditional_35_Conditional_1_For_7_Template, 7, 4, "li", null, _forTrack0);
    __elementEnd();
    __conditionalCreate(8, ReunionsPage_Conditional_35_Conditional_1_Conditional_8_Template, 2, 1, "p", 61);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("reunions.attendance.counter", __pureFunction2(4, _c3, ctx_r1.holdPresentIds().length, ctx_r1.holdMembers().length)), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r1.holdAllSelected() ? ctx_r1.t()("reunions.attendance.uncheckAll") : ctx_r1.t()("reunions.attendance.checkAll"), " ");
    __advance();
    __attribute("aria-label", ctx_r1.t()("reunions.attendance.listAria"));
    __advance();
    __repeater(ctx_r1.holdMembers());
    __advance(2);
    __conditional(!ctx_r1.holdPresentIds().length ? 8 : -1);
  }
}
function ReunionsPage_Conditional_35_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 61);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("reunions.attendance.noMembers"));
  }
}
function ReunionsPage_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "ui-modal", 60);
    __listener("closed", function ReunionsPage_Conditional_35_Template_ui_modal_closed_0_listener() {
      __restoreView(_r12);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.closeHold());
    });
    __conditionalCreate(1, ReunionsPage_Conditional_35_Conditional_1_Template, 9, 7)(2, ReunionsPage_Conditional_35_Conditional_2_Template, 2, 1, "p", 61);
    __elementStart(3, "button", 62);
    __listener("click", function ReunionsPage_Conditional_35_Template_button_click_3_listener() {
      __restoreView(_r12);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.closeHold());
    });
    __text(4);
    __elementEnd();
    __elementStart(5, "button", 63);
    __listener("click", function ReunionsPage_Conditional_35_Template_button_click_5_listener() {
      const meetingToHold_r16 = __restoreView(_r12);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.submitHold(meetingToHold_r16.id));
    });
    __text(6);
    __elementStart(7, "span", 26);
    __element(8, "ui-icon", 64);
    __elementEnd()()();
  }
  if (rf & 2) {
    const meetingToHold_r16 = ctx;
    const ctx_r1 = __nextContext();
    __property("open", true)("title", ctx_r1.t()("reunions.attendance.title"))("description", meetingToHold_r16.title + " \xB7 " + ctx_r1.fmtDateTime(meetingToHold_r16.date))("width", 600)("closeLabel", ctx_r1.t()("common.close"));
    __advance();
    __conditional(ctx_r1.holdMembers().length ? 1 : 2);
    __advance(3);
    __textInterpolate1(" ", ctx_r1.t()("producteurs.index.cancel"), " ");
    __advance();
    __property("disabled", !ctx_r1.holdPresentIds().length);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("reunions.attendance.submit"), " ");
    __advance(2);
    __property("size", 18);
  }
}
function ReunionsPage_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = __getCurrentView();
    __elementStart(0, "ui-modal", 73);
    __listener("closed", function ReunionsPage_Conditional_36_Template_ui_modal_closed_0_listener() {
      __restoreView(_r17);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.closeCancel());
    });
    __elementStart(1, "p", 74);
    __text(2);
    __elementEnd();
    __elementStart(3, "label", 75);
    __text(4);
    __elementEnd();
    __elementStart(5, "textarea", 76);
    __listener("input", function ReunionsPage_Conditional_36_Template_textarea_input_5_listener($event) {
      __restoreView(_r17);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.cancelReason.set($event.target.value));
    });
    __elementEnd();
    __elementStart(6, "p", 77);
    __text(7);
    __elementEnd();
    __elementStart(8, "button", 62);
    __listener("click", function ReunionsPage_Conditional_36_Template_button_click_8_listener() {
      __restoreView(_r17);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.closeCancel());
    });
    __text(9);
    __elementEnd();
    __elementStart(10, "button", 78);
    __listener("click", function ReunionsPage_Conditional_36_Template_button_click_10_listener() {
      __restoreView(_r17);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.submitCancel());
    });
    __text(11);
    __elementEnd()();
  }
  if (rf & 2) {
    const meetingToCancel_r18 = ctx;
    const ctx_r1 = __nextContext();
    __property("open", true)("title", ctx_r1.t()("reunions.cancel.title"))("description", ctx_r1.t()("reunions.cancel.description"))("width", 560)("closeLabel", ctx_r1.t()("common.close"));
    __advance(2);
    __textInterpolate2(" ", meetingToCancel_r18.title, " \xB7 ", ctx_r1.fmtDateTime(meetingToCancel_r18.date), " ");
    __advance(2);
    __textInterpolate(ctx_r1.t()("reunions.cancel.reason"));
    __advance();
    __property("placeholder", ctx_r1.t()("reunions.cancel.reasonHint"))("value", ctx_r1.cancelReason());
    __advance(2);
    __textInterpolate(ctx_r1.t()("reunions.cancel.reasonHint"));
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("reunions.cancel.keep"), " ");
    __advance();
    __property("disabled", ctx_r1.cancelReason().trim().length < 3);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("reunions.cancel.submit"), " ");
  }
}
var FILTERS = [
  {
    id: "upcoming",
    label: "reunions.filter.upcoming",
    test: (m) => m.status === "planifi\xE9e"
  },
  {
    id: "held",
    label: "reunions.filter.held",
    test: (m) => m.status === "tenue"
  },
  {
    id: "cancelled",
    label: "reunions.filter.cancelled",
    test: (m) => m.status === "annul\xE9e"
  },
  {
    id: "minutesTodo",
    label: "reunions.filter.minutesTodo",
    test: (m) => {
      var _a2;
      return m.status === "tenue" && ((_a2 = m.minutes) == null ? void 0 : _a2.status) !== "valid\xE9";
    }
  }
];
var STATUS = {
  planifi\u00E9e: TONE.info,
  tenue: TONE.succes,
  annul\u00E9e: TONE.neutre
};
var MINUTES = {
  none: {
    label: "reunions.minutes.none",
    ...TONE.neutre
  },
  brouillon: {
    label: "reunions.minutes.brouillon",
    ...TONE.attente
  },
  valid\u00E9: {
    label: "reunions.minutes.valid\xE9",
    ...TONE.succes
  }
};
var DAY = 864e5;
var ReunionsPage = (_a = class {
  constructor() {
    var _a2;
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.t = this.locale.t;
    this.nf = nf;
    this.fmtDateTime = fmtDateTime;
    this.initials = initialsOf;
    this.filters = FILTERS;
    this.kindLabel = MEETING_KIND_LABEL;
    this.statusLabel = MEETING_STATUS_LABEL;
    this.status = STATUS;
    this.minutes = MINUTES;
    this.snackbar = inject(SnackbarService);
    this.detailId = signal(null, ...[]);
    this.vueFromUrl = toSignal(this.route.queryParamMap.pipe(map((p) => p.get("vue") === "calendrier" ? "calendrier" : "liste"), startWith(this.route.snapshot.queryParamMap.get("vue") === "calendrier" ? "calendrier" : "liste")), { requireSync: true });
    this.defaultScoopId = toSignal(this.route.queryParamMap.pipe(map((p) => {
      var _a3;
      return (_a3 = p.get("scoop")) != null ? _a3 : void 0;
    })), { initialValue: (_a2 = this.route.snapshot.queryParamMap.get("scoop")) != null ? _a2 : void 0 });
    this.vueMode = computed(() => {
      var _a3;
      return (_a3 = this.vueFromUrl()) != null ? _a3 : "liste";
    }, ...[]);
    this.q = signal("", ...[]);
    this.filter = signal("tous", ...[]);
    this.holdMeetingId = signal(null, ...[]);
    this.holdPresentIds = signal([], ...[]);
    this.cancelMeetingId = signal(null, ...[]);
    this.cancelReason = signal("", ...[]);
    this.meetingFormOpen = signal(false, ...[]);
    this.meetingFormDefaultDate = signal(void 0, ...[]);
    this.mine = computed(() => sortMeetings(scopedMeetings(this.store.state().meetings, this.store.state().session), (/* @__PURE__ */ new Date()).toISOString()), ...[]);
    this.canManage = computed(() => this.store.can("meeting.manage"), ...[]);
    this.memberCount = computed(() => {
      var _a3;
      const counts = /* @__PURE__ */ new Map();
      for (const m of scopedMembers(this.store.state().members, this.store.state().session)) if (m.status === "membre") counts.set(m.scoopId, ((_a3 = counts.get(m.scoopId)) != null ? _a3 : 0) + 1);
      return counts;
    }, ...[]);
    this.shown = computed(() => {
      const active = FILTERS.find((f) => f.id === this.filter());
      const needle = this.q().trim().toLowerCase();
      return this.mine().filter((m) => (!active || active.test(m)) && (!needle || `${m.title} ${m.place}`.toLowerCase().includes(needle)));
    }, ...[]);
    this.calendarEvents = computed(() => this.shown().map((m) => {
      const start = new Date(m.date);
      return {
        id: m.id,
        title: m.title,
        start,
        end: new Date(start.getTime() + 72e5),
        tone: m.status === "planifi\xE9e" ? "info" : m.status === "tenue" ? "success" : "neutral",
        category: m.kind,
        subtitle: m.place,
        muted: m.status === "annul\xE9e"
      };
    }), ...[]);
    this.meetingCategories = computed(() => MEETING_KINDS.map((k) => [k, this.t()(MEETING_KIND_LABEL[k])]), ...[]);
    this.holdMeeting = computed(() => {
      const id = this.holdMeetingId();
      if (!id) return void 0;
      return this.mine().find((x) => x.id === id);
    }, ...[]);
    this.holdMembers = computed(() => {
      const hm = this.holdMeeting();
      if (!hm) return [];
      const session = this.store.state().session;
      return [...scopedMembers(this.store.state().members, session).filter((m) => m.scoopId === hm.scoopId && m.status === "membre")].sort((a, b) => `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`, "fr"));
    }, ...[]);
    this.holdAllSelected = computed(() => {
      const members = this.holdMembers();
      const ids = this.holdPresentIds();
      return members.length > 0 && ids.length === members.length;
    }, ...[]);
    this.cancelMeeting = computed(() => {
      var _a3;
      const id = this.cancelMeetingId();
      return id ? (_a3 = this.mine().find((m) => m.id === id)) != null ? _a3 : null : null;
    }, ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const all = this.mine();
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const upcoming = all.filter((m) => m.status === "planifi\xE9e" && m.date >= now).sort((a, b) => a.date.localeCompare(b.date));
      const held = all.filter((m) => m.status === "tenue");
      const rates = held.map((m) => this.attendance(m).rate);
      const avg = rates.length ? Math.round(rates.reduce((a, b) => a + b, 0) / rates.length) : 0;
      const todo = all.filter((m) => {
        var _a3;
        return m.status === "tenue" && ((_a3 = m.minutes) == null ? void 0 : _a3.status) !== "valid\xE9";
      }).length;
      return [
        {
          label: t("reunions.stat.total"),
          value: nf.format(all.length),
          sub: t("reunions.stat.totalSub", { count: all.filter((m) => m.kind === "assembl\xE9e g\xE9n\xE9rale").length }),
          icon: "event",
          bg: "",
          fg: ""
        },
        {
          label: t("reunions.stat.upcoming"),
          value: nf.format(upcoming.length),
          sub: upcoming[0] ? t("reunions.stat.upcomingSub", { date: fmtDate(upcoming[0].date) }) : t("reunions.stat.upcomingNone"),
          icon: "event_upcoming",
          ...TONE.info
        },
        {
          label: t("reunions.stat.held"),
          value: nf.format(held.length),
          sub: t("reunions.stat.heldSub", { pct: avg }),
          icon: "task_alt",
          ...TONE.succes
        },
        {
          label: t("reunions.stat.minutes"),
          value: nf.format(todo),
          sub: t("reunions.stat.minutesSub"),
          icon: "description",
          ...todo ? TONE.attente : TONE.succes
        }
      ];
    }, ...[]);
    this.detail = computed(() => {
      var _a3, _b, _c;
      const id = this.detailId();
      const m = id ? this.mine().find((x) => x.id === id) : null;
      if (!m) return null;
      const t = this.t();
      const s = this.store.state();
      const a = this.attendance(m);
      const daysLeft = Math.ceil((new Date(m.date).getTime() - Date.now()) / DAY);
      const present = s.members.filter((x) => m.presentIds.includes(x.id));
      const mn = MINUTES[(_b = (_a3 = m.minutes) == null ? void 0 : _a3.status) != null ? _b : "none"];
      return {
        title: m.title,
        subtitle: `${this.locale.formatDate(m.date, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        })} \xB7 ${m.place}`,
        icon: "event",
        badges: [
          {
            label: t(MEETING_STATUS_LABEL[m.status]),
            ...STATUS[m.status]
          },
          {
            label: t(MEETING_KIND_LABEL[m.kind]),
            ...TONE.culture
          },
          ...m.status === "tenue" ? [{
            label: `${t("reunions.col.minutes")} : ${t(mn.label)}`,
            bg: mn.bg,
            fg: mn.fg
          }] : []
        ],
        kpis: [detailKpi(t("reunions.quick.agenda"), m.agenda.length, "fact_check", TONE.info), ...m.status === "tenue" ? [detailKpi(t("reunions.quick.present"), a.present, "group", TONE.succes), detailKpi(t("reunions.quick.rate"), a.rate, "trending_up", TONE.culture, `${a.rate} %`)] : m.status === "planifi\xE9e" && daysLeft >= 0 ? [detailKpi(t("reunions.quick.daysLeft"), daysLeft, "calendar_today", TONE.attente)] : []],
        facts: [
          detailFact(t("reunions.detail.when"), fmtDateTime(m.date), "calendar_today"),
          detailFact(t("reunions.detail.where"), m.place, "location_on"),
          detailFact(t("reunions.detail.mode"), t(m.mode === "en ligne" ? "reunions.form.mode.online" : m.mode === "mixte" ? "reunions.form.mode.mixed" : "reunions.form.mode.onsite"), m.mode === "sur place" || !m.mode ? "location_on" : "public"),
          ...m.onlineUrl ? [detailFact(t("reunions.detail.link"), m.onlineUrl, "link", { wide: true })] : [],
          detailFact(t("reunions.detail.convoked"), m.audience && (m.audience.orgIds.length || m.audience.staffIds.length || m.audience.others.length) ? t("reunions.detail.convokedSummary", {
            orgs: m.audience.orgIds.length,
            staff: m.audience.staffIds.length,
            others: m.audience.others.length
          }) : t("reunions.detail.convokedNone"), "group", { wide: true }),
          detailFact(t("reunions.detail.scoop"), (_c = s.scoops.find((c) => c.id === m.scoopId)) == null ? void 0 : _c.name, "apartment"),
          detailFact(t("reunions.quick.createdBy"), m.createdBy, "badge"),
          ...m.cancelReason ? [detailFact(t("reunions.cancel.reason"), m.cancelReason, "warning", { wide: true })] : []
        ],
        sections: [{
          title: t("reunions.detail.agenda"),
          icon: "fact_check",
          count: null,
          empty: t("reunions.detail.agendaNone"),
          items: m.agenda.map((x, i) => ({
            label: x,
            index: i + 1
          })),
          more: 0
        }, ...m.status === "tenue" ? [{
          title: t("reunions.attendance.presentList"),
          icon: "group",
          count: present.length,
          empty: t("reunions.attendance.nobody"),
          items: present.slice(0, 8).map((x) => ({
            label: `${x.firstName} ${x.lastName}`,
            sub: x.village,
            initials: initialsOf(`${x.firstName} ${x.lastName}`)
          })),
          more: Math.max(0, present.length - 8)
        }] : []],
        link: ["/dashboard/reunions", m.id]
      };
    }, ...[]);
    this.pager = createPager(() => this.shown());
  }
  countFor(id) {
    const f = FILTERS.find((x) => x.id === id);
    return this.mine().filter(f.test).length;
  }
  setVueMode(mode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { vue: mode === "calendrier" ? "calendrier" : null },
      queryParamsHandling: "merge",
      replaceUrl: true
    });
  }
  openNewMeeting() {
    this.meetingFormDefaultDate.set(void 0);
    this.meetingFormOpen.set(true);
  }
  onCalendarDayCreate(day) {
    this.meetingFormDefaultDate.set(day);
    this.meetingFormOpen.set(true);
  }
  onMeetingFormNotify(ev) {
    this.flash(ev.kind, ev.text);
  }
  attendance(m) {
    var _a2;
    return attendanceStats(m, (_a2 = this.memberCount().get(m.scoopId)) != null ? _a2 : 0);
  }
  isPast(iso) {
    return iso <= (/* @__PURE__ */ new Date()).toISOString();
  }
  day(iso) {
    return this.locale.formatDate(iso, { day: "2-digit" });
  }
  month(iso) {
    return this.locale.formatDate(iso, { month: "short" }).replace(".", "");
  }
  openHold(meetingId) {
    this.holdMeetingId.set(meetingId);
    this.holdPresentIds.set([]);
  }
  closeHold() {
    this.holdMeetingId.set(null);
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
    const members = this.holdMembers();
    if (this.holdAllSelected()) this.holdPresentIds.set([]);
    else this.holdPresentIds.set(members.map((m) => m.id));
  }
  submitHold(meetingId) {
    const ids = this.holdPresentIds();
    try {
      const res = this.store.actions.holdMeeting(meetingId, ids);
      if (!res.ok) {
        this.flash("error", this.locale.tNow(res.error));
        return;
      }
      this.flash("success", this.t()("reunions.attendance.done"));
      this.closeHold();
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }
  openCancel(meetingId) {
    this.cancelMeetingId.set(meetingId);
    this.cancelReason.set("");
  }
  closeCancel() {
    this.cancelMeetingId.set(null);
    this.cancelReason.set("");
  }
  submitCancel() {
    const id = this.cancelMeetingId();
    if (!id) return;
    const reason = this.cancelReason().trim();
    try {
      const res = this.store.actions.cancelMeeting(id, reason);
      if (!res.ok) {
        this.flash("error", this.locale.tNow(res.error));
        return;
      }
      this.flash("success", this.t()("reunions.cancel.done"));
      this.closeCancel();
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }
  flash(kind, text) {
    if (kind === "success") this.snackbar.success(text);
    else this.snackbar.error(text);
  }
  errMsg(e) {
    if (e instanceof AccessDeniedError) return this.locale.tNow(e.key);
    return e instanceof Error ? e.message : String(e);
  }
}, _a.\u0275fac = function ReunionsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-reunions-page"]],
  decls: 38,
  vars: 40,
  consts: [
    [
      "perm",
      "meeting.read",
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
      "type",
      "button",
      1,
      "btn",
      "btn-primary"
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
      "click"
    ],
    [1, "n"],
    [
      "type",
      "button",
      "role",
      "radio",
      3,
      "on"
    ],
    [
      "name",
      "view_list",
      3,
      "size"
    ],
    [
      "name",
      "calendar_month",
      3,
      "size"
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
      "p-4",
      "sm:p-5"
    ],
    [
      1,
      "card",
      "mt-3",
      "overflow-hidden"
    ],
    [
      3,
      "closed",
      "view"
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
      3,
      "openChange",
      "notify",
      "open",
      "defaultScoopId",
      "defaultDate"
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
      3,
      "eventClick",
      "dayCreate",
      "events",
      "categories",
      "dayCreateEnabled"
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
    [1, "overflow-x-auto"],
    [
      1,
      "tbl",
      "min-w-[900px]"
    ],
    [1, "w-[180px]"],
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
    [1, "date"],
    [
      1,
      "text-[18px]",
      "font-extrabold",
      "leading-none"
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
      1,
      "block",
      "max-w-[300px]",
      "truncate",
      "font-bold",
      3,
      "title"
    ],
    [
      1,
      "sub",
      "block",
      "truncate"
    ],
    [1, "badge"],
    [
      1,
      "max-w-48",
      "truncate",
      "font-medium",
      3,
      "title"
    ],
    [1, "zero"],
    [
      1,
      "badge",
      3,
      "background",
      "color"
    ],
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
      "type",
      "button",
      1,
      "act",
      "act-ok",
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
      "task_alt",
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
      "event",
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
    [
      "name",
      "check",
      3,
      "size"
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
      "people",
      "mb-4"
    ],
    [1, "person"],
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
      "min-w-0",
      "flex-1",
      "truncate"
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
      "cancel-reason",
      1,
      "lbl"
    ],
    [
      "id",
      "cancel-reason",
      "rows",
      "4",
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
    ]
  ],
  template: function ReunionsPage_Template(rf, ctx) {
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
      __conditionalCreate(9, ReunionsPage_Conditional_9_Template, 4, 2, "button", 6);
      __elementEnd();
      __element(10, "ui-stat-cards", 7);
      __elementStart(11, "div", 8)(12, "label", 9);
      __element(13, "ui-icon", 10);
      __elementStart(14, "input", 11);
      __listener("input", function ReunionsPage_Template_input_input_14_listener($event) {
        return ctx.q.set($event.target.value);
      });
      __elementEnd()();
      __element(15, "app-global-filters");
      __elementStart(16, "div", 12)(17, "button", 13);
      __listener("click", function ReunionsPage_Template_button_click_17_listener() {
        return ctx.filter.set("tous");
      });
      __text(18);
      __elementStart(19, "span", 14);
      __text(20);
      __elementEnd()();
      __repeaterCreate(21, ReunionsPage_For_22_Template, 4, 7, "button", 15, _forTrack0);
      __elementEnd();
      __elementStart(23, "div", 12)(24, "button", 13);
      __listener("click", function ReunionsPage_Template_button_click_24_listener() {
        return ctx.setVueMode("liste");
      });
      __element(25, "ui-icon", 16);
      __text(26);
      __elementEnd();
      __elementStart(27, "button", 13);
      __listener("click", function ReunionsPage_Template_button_click_27_listener() {
        return ctx.setVueMode("calendrier");
      });
      __element(28, "ui-icon", 17);
      __text(29);
      __elementEnd()()();
      __elementStart(30, "p", 18);
      __text(31);
      __elementEnd();
      __conditionalCreate(32, ReunionsPage_Conditional_32_Template, 2, 3, "section", 19)(33, ReunionsPage_Conditional_33_Template, 3, 1, "section", 20);
      __elementStart(34, "ui-detail-modal", 21);
      __listener("closed", function ReunionsPage_Template_ui_detail_modal_closed_34_listener() {
        return ctx.detailId.set(null);
      });
      __elementEnd();
      __conditionalCreate(35, ReunionsPage_Conditional_35_Template, 9, 10, "ui-modal", 22);
      __conditionalCreate(36, ReunionsPage_Conditional_36_Template, 12, 14, "ui-modal", 23);
      __elementStart(37, "app-meeting-form-dialog", 24);
      __twoWayListener("openChange", function ReunionsPage_Template_app_meeting_form_dialog_openChange_37_listener($event) {
        __twoWayBindingSet(ctx.meetingFormOpen, $event) || (ctx.meetingFormOpen = $event);
        return $event;
      });
      __listener("notify", function ReunionsPage_Template_app_meeting_form_dialog_notify_37_listener($event) {
        return ctx.onMeetingFormNotify($event);
      });
      __elementEnd()();
    }
    if (rf & 2) {
      let tmp_29_0;
      let tmp_30_0;
      __property("area", ctx.t()("reunions.area"));
      __advance(4);
      __textInterpolate(ctx.t()("reunions.eyebrow"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("reunions.title"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("reunions.description"), " ");
      __advance();
      __conditional(ctx.canManage() ? 9 : -1);
      __advance();
      __property("stats", ctx.stats());
      __advance(3);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("reunions.search.placeholder"))("value", ctx.q());
      __attribute("aria-label", ctx.t()("reunions.search.aria"));
      __advance(2);
      __attribute("aria-label", ctx.t()("reunions.filter.aria"));
      __advance();
      __classProp("on", ctx.filter() === "tous");
      __attribute("aria-checked", ctx.filter() === "tous");
      __advance();
      __textInterpolate1(" ", ctx.t()("reunions.filter.all"));
      __advance();
      __classProp("zero", !ctx.mine().length);
      __advance();
      __textInterpolate(ctx.nf.format(ctx.mine().length));
      __advance();
      __repeater(ctx.filters);
      __advance(2);
      __attribute("aria-label", ctx.t()("reunions.view.aria"));
      __advance();
      __classProp("on", ctx.vueMode() === "liste");
      __attribute("aria-checked", ctx.vueMode() === "liste");
      __advance();
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("reunions.view.list"), " ");
      __advance();
      __classProp("on", ctx.vueMode() === "calendrier");
      __attribute("aria-checked", ctx.vueMode() === "calendrier");
      __advance();
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("reunions.view.calendar"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("reunions.count", __pureFunction2(37, _c0, ctx.nf.format(ctx.shown().length), ctx.nf.format(ctx.mine().length))), " ");
      __advance();
      __conditional(ctx.vueMode() === "calendrier" ? 32 : 33);
      __advance(2);
      __property("view", ctx.detail());
      __advance();
      __conditional((tmp_29_0 = ctx.holdMeeting()) ? 35 : -1, tmp_29_0);
      __advance();
      __conditional((tmp_30_0 = ctx.cancelMeeting()) ? 36 : -1, tmp_30_0);
      __advance();
      __twoWayProperty("open", ctx.meetingFormOpen);
      __property("defaultScoopId", ctx.defaultScoopId())("defaultDate", ctx.meetingFormDefaultDate());
    }
  },
  dependencies: [
    AppShellComponent,
    DetailModalComponent,
    GlobalFiltersComponent,
    IconComponent,
    MeetingFormDialogComponent,
    ModalComponent,
    PaginationComponent,
    StatCardsComponent,
    UiEventCalendarComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".date[_ngcontent-%COMP%] {\n        display: grid;\n        width: 52px;\n        flex-shrink: 0;\n        place-items: center;\n        border-radius: 14px;\n        padding: 6px 0;\n        text-align: center;\n      }\n      .meter[_ngcontent-%COMP%] {\n        display: block;\n        height: 6px;\n        width: 100%;\n        overflow: hidden;\n        border-radius: 999px;\n        background: var(--%NS%v2-lin);\n      }\n      .meter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n        display: block;\n        height: 100%;\n        border-radius: 999px;\n        background: var(--%NS%v2-vert-pousse);\n      }\n      .act-ok[_ngcontent-%COMP%]:hover {\n        border-color: var(--%NS%v2-vert-pousse);\n        background: var(--%NS%v2-sauge);\n        color: var(--%NS%v2-vert-pousse);\n      }\n      .act-danger[_ngcontent-%COMP%]:hover {\n        border-color: var(--%NS%v2-erreur-fg);\n        background: var(--%NS%v2-erreur-bg);\n        color: var(--%NS%v2-erreur-fg);\n      }\n      .people[_ngcontent-%COMP%] {\n        max-height: 46vh;\n        overflow-y: auto;\n        border-radius: 18px;\n        border: 1px solid var(--%NS%v2-bord-carte);\n      }\n      .person[_ngcontent-%COMP%] {\n        display: flex;\n        min-height: 52px;\n        align-items: center;\n        gap: 12px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 8px 14px;\n        font-size: 14px;\n        font-weight: 600;\n        cursor: pointer;\n      }\n      .person[_ngcontent-%COMP%]:first-child {\n        border-top: none;\n      }\n      .person[_ngcontent-%COMP%]:hover {\n        background: var(--%NS%v2-creme);\n      }\n      .person[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n        height: 20px;\n        width: 20px;\n        accent-color: var(--%NS%v2-foret);\n        cursor: pointer;\n      }\n      .area[_ngcontent-%COMP%] {\n        width: 100%;\n        min-height: 110px;\n        border-radius: 16px;\n        border: 1.5px solid var(--%NS%v2-gris-trait);\n        background: var(--%NS%v2-blanc);\n        padding: 12px 16px;\n        font-size: 15px;\n        font-weight: 600;\n        color: var(--%NS%v2-encre);\n      }\n      .area[_ngcontent-%COMP%]::placeholder {\n        color: var(--%NS%v2-gris-texte);\n        font-weight: 500;\n      }\n      .area[_ngcontent-%COMP%]:focus-visible {\n        outline: none;\n        border: 2px solid var(--%NS%v2-foret);\n        box-shadow: var(--%NS%v2-halo);\n      }\n      .lbl[_ngcontent-%COMP%] {\n        font-size: 12px;\n        font-weight: 700;\n        letter-spacing: 0.06em;\n        text-transform: uppercase;\n        color: var(--%NS%v2-ardoise);\n      }"]
}), _a);

export { ReunionsPage as default };
//# sourceMappingURL=reunions.page-BQyVLc26.mjs.map

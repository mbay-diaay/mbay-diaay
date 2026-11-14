import { i as inject, A as ActivatedRoute, R as Router, F as signal, c as computed, ɵ as __defineComponent, d as RouterLink, f as __elementStart, g as __text, h as __elementEnd, j as __conditionalCreate, m as __repeaterCreate, b as __element, G as __controlCreate, H as __listener, I as __twoWayListener, n as __property, o as __advance, p as __textInterpolate, r as __pureFunction1, s as __conditional, v as __repeater, u as __attribute, J as __control, z as __classProp, K as __twoWayProperty, q as __textInterpolate1, w as __nextContext, L as __getCurrentView, M as __pureFunction0, N as __textInterpolate2, O as __restoreView, P as __resetView, Q as __twoWayBindingSet, S as __resolveDocument } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { P as PaginationComponent, F as FormsModule, D as DefaultValueAccessor, N as NgControlStatus, a as NgModel, b as UiDialogComponent, c as UiPageHeaderComponent, d as UiPillComponent } from './ui-DDO8FoUF.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { B as Ban, L as LogOut, S as ScrollText, U as UserCog, R as RotateCcw, a as RefreshCw, P as Pencil, E as Eye, b as EllipsisVertical, X, c as Smartphone, d as Search, e as LucideAngularModule, f as LucideAngularComponent } from './lucide-angular-RJABeBQ2.mjs';
import { L as LocaleService, j as nf, h as fmtDate, f as fmtDateTime } from './locale.service-c0QhtcVY.mjs';
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
var _c0 = (a0) => ({ n: a0 });
var _c1 = () => ["/dashboard/utilisateurs"];
var _c2 = (a0) => ({ q: a0 });
var _c3 = () => ["/dashboard/audit"];
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
function AppareilsPage_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 5);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r0.flash(), " ");
  }
}
function AppareilsPage_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = __getCurrentView();
    __elementStart(0, "div", 6);
    __text(1);
    __elementStart(2, "strong");
    __text(3);
    __elementEnd();
    __elementStart(4, "button", 23);
    __listener("click", function AppareilsPage_Conditional_8_Template_button_click_4_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.clearUserFilter());
    });
    __element(5, "lucide-angular", 24);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.filter.of"), " ");
    __advance(2);
    __textInterpolate(ctx.name);
    __advance(2);
    __property("img", ctx_r0.icons.x);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.filter.all"), " ");
  }
}
function AppareilsPage_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "button", 25);
    __listener("click", function AppareilsPage_For_12_Template_button_click_0_listener() {
      const option_r4 = __restoreView(_r3).$implicit;
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.filter.set(option_r4.value));
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const option_r4 = ctx.$implicit;
    const ctx_r0 = __nextContext();
    __classProp("bg-background", ctx_r0.filter() === option_r4.value)("shadow-sm", ctx_r0.filter() === option_r4.value);
    __advance();
    __textInterpolate1(" ", option_r4.label, " ");
  }
}
function AppareilsPage_Conditional_17_For_16_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 45);
    __listener("click", function AppareilsPage_Conditional_17_For_16_Conditional_6_Template_a_click_0_listener($event) {
      return $event.stopPropagation();
    });
    __text(1);
    __elementEnd();
    __elementStart(2, "div", 46);
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const owner_r7 = ctx;
    const ctx_r0 = __nextContext(3);
    __property("routerLink", __pureFunction0(4, _c1))("queryParams", __pureFunction1(5, _c2, owner_r7.name));
    __advance();
    __textInterpolate1(" ", owner_r7.name, " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.store.roleLabel(owner_r7.role), " ");
  }
}
function AppareilsPage_Conditional_17_For_16_Conditional_7_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __textInterpolate1(" ", ctx_r0.t()("appareils.unknown"), " ");
  }
}
function AppareilsPage_Conditional_17_For_16_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ui-pill", 3);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r0.t()("appareils.state.active"));
  }
}
function AppareilsPage_Conditional_17_For_16_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ui-pill", 4);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r0.t()("appareils.state.revoked"));
  }
}
function AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = __getCurrentView();
    __elementStart(0, "button", 47);
    __listener("click", function AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_7_Template_button_click_0_listener() {
      __restoreView(_r9);
      const device_r6 = __nextContext(2).$implicit;
      const ctx_r0 = __nextContext(2);
      ctx_r0.resync(device_r6);
      return __resetView(ctx_r0.deviceMenuOpenId.set(null));
    });
    __element(1, "lucide-angular", 48);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __property("img", ctx_r0.icons.refresh);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.action.resync"), " ");
  }
}
function AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_8_Template(rf, ctx) {
  var _a2, _b;
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "a", 52);
    __listener("click", function AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_8_Template_a_click_0_listener() {
      __restoreView(_r10);
      const ctx_r0 = __nextContext(4);
      return __resetView(ctx_r0.deviceMenuOpenId.set(null));
    });
    __element(1, "lucide-angular", 48);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const device_r6 = __nextContext(2).$implicit;
    const ctx_r0 = __nextContext(2);
    __property("routerLink", __pureFunction0(4, _c1))("queryParams", __pureFunction1(5, _c2, (_b = (_a2 = ctx_r0.user(device_r6.userId)) == null ? void 0 : _a2.name) != null ? _b : ""));
    __advance();
    __property("img", ctx_r0.icons.userCog);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.action.user"), " ");
  }
}
function AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = __getCurrentView();
    __elementStart(0, "a", 52);
    __listener("click", function AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_9_Template_a_click_0_listener() {
      __restoreView(_r11);
      const ctx_r0 = __nextContext(4);
      return __resetView(ctx_r0.deviceMenuOpenId.set(null));
    });
    __element(1, "lucide-angular", 48);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const device_r6 = __nextContext(2).$implicit;
    const ctx_r0 = __nextContext(2);
    __property("routerLink", __pureFunction0(4, _c3))("queryParams", __pureFunction1(5, _c2, device_r6.label));
    __advance();
    __property("img", ctx_r0.icons.scroll);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.action.audit"), " ");
  }
}
function AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "button", 53);
    __listener("click", function AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_10_Template_button_click_0_listener() {
      __restoreView(_r12);
      const device_r6 = __nextContext(2).$implicit;
      const ctx_r0 = __nextContext(2);
      ctx_r0.askConfirm("signout", device_r6);
      return __resetView(ctx_r0.deviceMenuOpenId.set(null));
    });
    __element(1, "lucide-angular", 48);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __property("img", ctx_r0.icons.logOut);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.action.signout"), " ");
  }
}
function AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "button", 53);
    __listener("click", function AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_11_Template_button_click_0_listener() {
      __restoreView(_r13);
      const device_r6 = __nextContext(2).$implicit;
      const ctx_r0 = __nextContext(2);
      ctx_r0.askConfirm("revoke", device_r6);
      return __resetView(ctx_r0.deviceMenuOpenId.set(null));
    });
    __element(1, "lucide-angular", 48);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __property("img", ctx_r0.icons.ban);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.action.revoke"), " ");
  }
}
function AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = __getCurrentView();
    __elementStart(0, "button", 47);
    __listener("click", function AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_12_Template_button_click_0_listener() {
      __restoreView(_r14);
      const device_r6 = __nextContext(2).$implicit;
      const ctx_r0 = __nextContext(2);
      ctx_r0.askConfirm("reactivate", device_r6);
      return __resetView(ctx_r0.deviceMenuOpenId.set(null));
    });
    __element(1, "lucide-angular", 48);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __property("img", ctx_r0.icons.rotate);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.action.reactivate"), " ");
  }
}
function AppareilsPage_Conditional_17_For_16_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = __getCurrentView();
    __elementStart(0, "div", 44)(1, "button", 47);
    __listener("click", function AppareilsPage_Conditional_17_For_16_Conditional_18_Template_button_click_1_listener() {
      __restoreView(_r8);
      const device_r6 = __nextContext().$implicit;
      const ctx_r0 = __nextContext(2);
      ctx_r0.openDetail(device_r6.id);
      return __resetView(ctx_r0.deviceMenuOpenId.set(null));
    });
    __element(2, "lucide-angular", 48);
    __text(3);
    __elementEnd();
    __elementStart(4, "button", 47);
    __listener("click", function AppareilsPage_Conditional_17_For_16_Conditional_18_Template_button_click_4_listener() {
      __restoreView(_r8);
      const device_r6 = __nextContext().$implicit;
      const ctx_r0 = __nextContext(2);
      ctx_r0.openRename(device_r6);
      return __resetView(ctx_r0.deviceMenuOpenId.set(null));
    });
    __element(5, "lucide-angular", 48);
    __text(6);
    __elementEnd();
    __conditionalCreate(7, AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_7_Template, 3, 2, "button", 49);
    __conditionalCreate(8, AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_8_Template, 3, 7, "a", 50);
    __conditionalCreate(9, AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_9_Template, 3, 7, "a", 50);
    __conditionalCreate(10, AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_10_Template, 3, 2, "button", 51);
    __conditionalCreate(11, AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_11_Template, 3, 2, "button", 51)(12, AppareilsPage_Conditional_17_For_16_Conditional_18_Conditional_12_Template, 3, 2, "button", 49);
    __elementEnd();
  }
  if (rf & 2) {
    const device_r6 = __nextContext().$implicit;
    const ctx_r0 = __nextContext(2);
    __advance(2);
    __property("img", ctx_r0.icons.eye);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.action.detail"), " ");
    __advance(2);
    __property("img", ctx_r0.icons.pencil);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.action.rename"), " ");
    __advance();
    __conditional(device_r6.active ? 7 : -1);
    __advance();
    __conditional(ctx_r0.store.can("user.manage") ? 8 : -1);
    __advance();
    __conditional(ctx_r0.store.can("audit.read") ? 9 : -1);
    __advance();
    __conditional(device_r6.active ? 10 : -1);
    __advance();
    __conditional(device_r6.active ? 11 : 12);
  }
}
function AppareilsPage_Conditional_17_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "tr", 35);
    __listener("click", function AppareilsPage_Conditional_17_For_16_Template_tr_click_0_listener() {
      const device_r6 = __restoreView(_r5).$implicit;
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.openDetail(device_r6.id));
    });
    __elementStart(1, "td", 36)(2, "span", 37);
    __element(3, "lucide-angular", 38);
    __text(4);
    __elementEnd()();
    __elementStart(5, "td");
    __conditionalCreate(6, AppareilsPage_Conditional_17_For_16_Conditional_6_Template, 4, 7)(7, AppareilsPage_Conditional_17_For_16_Conditional_7_Template, 1, 1);
    __elementEnd();
    __elementStart(8, "td", 39);
    __text(9);
    __elementEnd();
    __elementStart(10, "td", 40);
    __text(11);
    __elementEnd();
    __elementStart(12, "td");
    __conditionalCreate(13, AppareilsPage_Conditional_17_For_16_Conditional_13_Template, 2, 1, "ui-pill", 3)(14, AppareilsPage_Conditional_17_For_16_Conditional_14_Template, 2, 1, "ui-pill", 4);
    __elementEnd();
    __elementStart(15, "td", 41);
    __listener("click", function AppareilsPage_Conditional_17_For_16_Template_td_click_15_listener($event) {
      return $event.stopPropagation();
    });
    __elementStart(16, "button", 42);
    __listener("click", function AppareilsPage_Conditional_17_For_16_Template_button_click_16_listener($event) {
      const device_r6 = __restoreView(_r5).$implicit;
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.toggleDeviceMenu(device_r6.id, $event));
    });
    __element(17, "lucide-angular", 43);
    __elementEnd();
    __conditionalCreate(18, AppareilsPage_Conditional_17_For_16_Conditional_18_Template, 13, 9, "div", 44);
    __elementEnd()();
  }
  if (rf & 2) {
    let tmp_13_0;
    const device_r6 = ctx.$implicit;
    const ctx_r0 = __nextContext(2);
    __advance(3);
    __property("img", ctx_r0.icons.phone);
    __advance();
    __textInterpolate1(" ", device_r6.label, " ");
    __advance(2);
    __conditional((tmp_13_0 = ctx_r0.user(device_r6.userId)) ? 6 : 7, tmp_13_0);
    __advance(3);
    __textInterpolate1(" ", ctx_r0.fmtDate(device_r6.registeredAt), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.fmtDate(device_r6.lastActiveAt), " ");
    __advance(2);
    __conditional(device_r6.active ? 13 : 14);
    __advance(3);
    __attribute("aria-expanded", ctx_r0.deviceMenuOpenId() === device_r6.id)("aria-label", ctx_r0.t()("appareils.action.menu"));
    __advance();
    __property("img", ctx_r0.icons.more);
    __advance();
    __conditional(ctx_r0.deviceMenuOpenId() === device_r6.id ? 18 : -1);
  }
}
function AppareilsPage_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "table", 26)(1, "thead", 27)(2, "tr")(3, "th", 28);
    __text(4);
    __elementEnd();
    __elementStart(5, "th", 29);
    __text(6);
    __elementEnd();
    __elementStart(7, "th", 30);
    __text(8);
    __elementEnd();
    __elementStart(9, "th", 29);
    __text(10);
    __elementEnd();
    __elementStart(11, "th", 29);
    __text(12);
    __elementEnd();
    __element(13, "th", 31);
    __elementEnd()();
    __elementStart(14, "tbody", 32);
    __repeaterCreate(15, AppareilsPage_Conditional_17_For_16_Template, 19, 10, "tr", 33, _forTrack1);
    __elementEnd()();
    __element(17, "ui-pagination", 34);
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance(4);
    __textInterpolate(ctx_r0.t()("appareils.col.device"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("appareils.col.user"));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("appareils.col.registered"), " ");
    __advance(2);
    __textInterpolate(ctx_r0.t()("appareils.col.lastActive"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("appareils.col.status"));
    __advance(3);
    __repeater(ctx_r0.pager.items());
    __advance(2);
    __property("pager", ctx_r0.pager);
  }
}
function AppareilsPage_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 14);
    __element(1, "lucide-angular", 54);
    __elementStart(2, "div", 55);
    __text(3);
    __elementEnd();
    __elementStart(4, "p", 56);
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __property("img", ctx_r0.icons.phone);
    __advance(2);
    __textInterpolate(ctx_r0.t()("appareils.empty.title"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("appareils.empty.desc"));
  }
}
function AppareilsPage_Conditional_19_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ui-pill", 3);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r0.t()("appareils.state.active"));
  }
}
function AppareilsPage_Conditional_19_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ui-pill", 4);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r0.t()("appareils.state.revoked"));
  }
}
function AppareilsPage_Conditional_19_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 67);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const detailOwner_r16 = ctx;
    __property("routerLink", __pureFunction0(3, _c1))("queryParams", __pureFunction1(4, _c2, detailOwner_r16.name));
    __advance();
    __textInterpolate1(" ", detailOwner_r16.name, " ");
  }
}
function AppareilsPage_Conditional_19_Conditional_18_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __textInterpolate1(" ", ctx_r0.t()("appareils.unknown"), " ");
  }
}
function AppareilsPage_Conditional_19_Conditional_23_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __textInterpolate1(" ", ctx_r0.store.roleLabel(ctx.role), " ");
  }
}
function AppareilsPage_Conditional_19_Conditional_24_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __textInterpolate1(" ", ctx_r0.t()("appareils.unknown"), " ");
  }
}
function AppareilsPage_Conditional_19_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = __getCurrentView();
    __elementStart(0, "button", 71);
    __listener("click", function AppareilsPage_Conditional_19_Conditional_44_Template_button_click_0_listener() {
      __restoreView(_r18);
      const detail_r17 = __nextContext();
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.resync(detail_r17));
    });
    __element(1, "lucide-angular", 43);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __property("img", ctx_r0.icons.refresh);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.detail.resync"), " ");
  }
}
function AppareilsPage_Conditional_19_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = __getCurrentView();
    __elementStart(0, "button", 79);
    __listener("click", function AppareilsPage_Conditional_19_Conditional_45_Template_button_click_0_listener() {
      __restoreView(_r19);
      const detail_r17 = __nextContext();
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.askConfirm("revoke", detail_r17));
    });
    __element(1, "lucide-angular", 43);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __property("img", ctx_r0.icons.ban);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.detail.revoke"), " ");
  }
}
function AppareilsPage_Conditional_19_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = __getCurrentView();
    __elementStart(0, "button", 71);
    __listener("click", function AppareilsPage_Conditional_19_Conditional_46_Template_button_click_0_listener() {
      __restoreView(_r20);
      const detail_r17 = __nextContext();
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.askConfirm("reactivate", detail_r17));
    });
    __element(1, "lucide-angular", 43);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __property("img", ctx_r0.icons.rotate);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.detail.reactivate"), " ");
  }
}
function AppareilsPage_Conditional_19_Conditional_50_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 80)(1, "div", 81);
    __text(2);
    __elementEnd();
    __elementStart(3, "div", 46);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const event_r21 = ctx.$implicit;
    const ctx_r0 = __nextContext(3);
    __advance(2);
    __textInterpolate(event_r21.action);
    __advance(2);
    __textInterpolate2(" ", event_r21.user, " \xB7 ", ctx_r0.fmtDateTime(event_r21.at), " ");
  }
}
function AppareilsPage_Conditional_19_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ul", 76);
    __repeaterCreate(1, AppareilsPage_Conditional_19_Conditional_50_For_2_Template, 5, 3, "li", 80, _forTrack1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __repeater(ctx_r0.detailHistory());
  }
}
function AppareilsPage_Conditional_19_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 77);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r0.t()("appareils.history.empty"));
  }
}
function AppareilsPage_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = __getCurrentView();
    __elementStart(0, "div", 15)(1, "div", 57);
    __listener("click", function AppareilsPage_Conditional_19_Template_div_click_1_listener() {
      __restoreView(_r15);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.closeDetail());
    });
    __elementEnd();
    __elementStart(2, "aside", 58)(3, "div", 59)(4, "h2", 60);
    __element(5, "lucide-angular", 61);
    __text(6);
    __elementEnd();
    __elementStart(7, "button", 62);
    __listener("click", function AppareilsPage_Conditional_19_Template_button_click_7_listener() {
      __restoreView(_r15);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.closeDetail());
    });
    __element(8, "lucide-angular", 63);
    __elementEnd()();
    __elementStart(9, "div", 64);
    __conditionalCreate(10, AppareilsPage_Conditional_19_Conditional_10_Template, 2, 1, "ui-pill", 3)(11, AppareilsPage_Conditional_19_Conditional_11_Template, 2, 1, "ui-pill", 4);
    __elementEnd();
    __elementStart(12, "dl", 65)(13, "div")(14, "dt", 46);
    __text(15);
    __elementEnd();
    __elementStart(16, "dd", 66);
    __conditionalCreate(17, AppareilsPage_Conditional_19_Conditional_17_Template, 2, 6, "a", 67)(18, AppareilsPage_Conditional_19_Conditional_18_Template, 1, 1);
    __elementEnd()();
    __elementStart(19, "div")(20, "dt", 46);
    __text(21);
    __elementEnd();
    __elementStart(22, "dd", 66);
    __conditionalCreate(23, AppareilsPage_Conditional_19_Conditional_23_Template, 1, 1)(24, AppareilsPage_Conditional_19_Conditional_24_Template, 1, 1);
    __elementEnd()();
    __elementStart(25, "div")(26, "dt", 46);
    __text(27);
    __elementEnd();
    __elementStart(28, "dd", 66);
    __text(29);
    __elementEnd()();
    __elementStart(30, "div")(31, "dt", 46);
    __text(32);
    __elementEnd();
    __elementStart(33, "dd", 66);
    __text(34);
    __elementEnd()();
    __elementStart(35, "div", 68)(36, "dt", 46);
    __text(37);
    __elementEnd();
    __elementStart(38, "dd", 69);
    __text(39);
    __elementEnd()()();
    __elementStart(40, "div", 70)(41, "button", 71);
    __listener("click", function AppareilsPage_Conditional_19_Template_button_click_41_listener() {
      const detail_r17 = __restoreView(_r15);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.openRename(detail_r17));
    });
    __element(42, "lucide-angular", 43);
    __text(43);
    __elementEnd();
    __conditionalCreate(44, AppareilsPage_Conditional_19_Conditional_44_Template, 3, 2, "button", 72);
    __conditionalCreate(45, AppareilsPage_Conditional_19_Conditional_45_Template, 3, 2, "button", 73)(46, AppareilsPage_Conditional_19_Conditional_46_Template, 3, 2, "button", 72);
    __elementEnd();
    __elementStart(47, "div", 74)(48, "div", 75);
    __text(49);
    __elementEnd();
    __conditionalCreate(50, AppareilsPage_Conditional_19_Conditional_50_Template, 3, 0, "ul", 76)(51, AppareilsPage_Conditional_19_Conditional_51_Template, 2, 1, "p", 77);
    __elementStart(52, "a", 78);
    __text(53);
    __elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_8_0;
    let tmp_10_0;
    const detail_r17 = ctx;
    const ctx_r0 = __nextContext();
    __advance(5);
    __property("img", ctx_r0.icons.phone);
    __advance();
    __textInterpolate1(" ", detail_r17.label, " ");
    __advance();
    __attribute("aria-label", ctx_r0.t()("common.close"));
    __advance();
    __property("img", ctx_r0.icons.x);
    __advance(2);
    __conditional(detail_r17.active ? 10 : 11);
    __advance(5);
    __textInterpolate(ctx_r0.t()("appareils.col.user"));
    __advance(2);
    __conditional((tmp_8_0 = ctx_r0.user(detail_r17.userId)) ? 17 : 18, tmp_8_0);
    __advance(4);
    __textInterpolate(ctx_r0.t()("appareils.detail.role"));
    __advance(2);
    __conditional((tmp_10_0 = ctx_r0.user(detail_r17.userId)) ? 23 : 24, tmp_10_0);
    __advance(4);
    __textInterpolate(ctx_r0.t()("appareils.col.registered"));
    __advance(2);
    __textInterpolate(ctx_r0.fmtDate(detail_r17.registeredAt));
    __advance(3);
    __textInterpolate(ctx_r0.t()("appareils.col.lastActive"));
    __advance(2);
    __textInterpolate(ctx_r0.fmtDate(detail_r17.lastActiveAt));
    __advance(3);
    __textInterpolate(ctx_r0.t()("appareils.detail.id"));
    __advance(2);
    __textInterpolate(detail_r17.id);
    __advance(3);
    __property("img", ctx_r0.icons.pencil);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.detail.rename"), " ");
    __advance();
    __conditional(detail_r17.active ? 44 : -1);
    __advance();
    __conditional(detail_r17.active ? 45 : 46);
    __advance(4);
    __textInterpolate(ctx_r0.t()("appareils.history"));
    __advance();
    __conditional(ctx_r0.detailHistory().length ? 50 : 51);
    __advance(2);
    __property("routerLink", __pureFunction0(24, _c3))("queryParams", __pureFunction1(25, _c2, detail_r17.label));
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("appareils.history.open"), " ");
  }
}
function AppareilsPage_Conditional_30_Conditional_6_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __textInterpolate1(" ", ctx_r0.t()("appareils.confirm.revoke.note"), " ");
  }
}
function AppareilsPage_Conditional_30_Conditional_7_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __textInterpolate1(" ", ctx_r0.t()("appareils.confirm.reactivate.note"), " ");
  }
}
function AppareilsPage_Conditional_30_Conditional_8_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __textInterpolate1(" ", ctx_r0.t()("appareils.confirm.signout.note"), " ");
  }
}
function AppareilsPage_Conditional_30_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = __getCurrentView();
    __elementStart(0, "button", 87);
    __listener("click", function AppareilsPage_Conditional_30_Conditional_15_Template_button_click_0_listener() {
      __restoreView(_r23);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.runConfirm());
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r0.confirmSubmitLabel(), " ");
  }
}
function AppareilsPage_Conditional_30_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = __getCurrentView();
    __elementStart(0, "button", 88);
    __listener("click", function AppareilsPage_Conditional_30_Conditional_16_Template_button_click_0_listener() {
      __restoreView(_r24);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.runConfirm());
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r0.confirmSubmitLabel(), " ");
  }
}
function AppareilsPage_Conditional_30_Template(rf, ctx) {
  var _a2, _b;
  if (rf & 1) {
    const _r22 = __getCurrentView();
    __elementStart(0, "ui-dialog", 16);
    __listener("openChange", function AppareilsPage_Conditional_30_Template_ui_dialog_openChange_0_listener($event) {
      __restoreView(_r22);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.onConfirmOpen($event));
    });
    __elementStart(1, "p", 82);
    __text(2);
    __elementStart(3, "span", 29);
    __text(4);
    __elementEnd();
    __text(5);
    __conditionalCreate(6, AppareilsPage_Conditional_30_Conditional_6_Template, 1, 1);
    __conditionalCreate(7, AppareilsPage_Conditional_30_Conditional_7_Template, 1, 1);
    __conditionalCreate(8, AppareilsPage_Conditional_30_Conditional_8_Template, 1, 1);
    __elementEnd();
    __elementStart(9, "p", 83);
    __text(10);
    __elementEnd();
    __elementStart(11, "p", 84);
    __text(12);
    __elementEnd();
    __elementStart(13, "button", 20);
    __listener("click", function AppareilsPage_Conditional_30_Template_button_click_13_listener() {
      __restoreView(_r22);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.confirm.set(null));
    });
    __text(14);
    __elementEnd();
    __conditionalCreate(15, AppareilsPage_Conditional_30_Conditional_15_Template, 2, 1, "button", 85)(16, AppareilsPage_Conditional_30_Conditional_16_Template, 2, 1, "button", 86);
    __elementEnd();
  }
  if (rf & 2) {
    const confirmation_r25 = ctx;
    const ctx_r0 = __nextContext();
    __property("open", true)("title", ctx_r0.confirmTitle());
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("appareils.confirm.device"), " ");
    __advance(2);
    __textInterpolate(confirmation_r25.device.label);
    __advance();
    __textInterpolate2(" ", ctx_r0.t()("appareils.confirm.of"), " ", (_b = (_a2 = ctx_r0.user(confirmation_r25.device.userId)) == null ? void 0 : _a2.name) != null ? _b : ctx_r0.t()("appareils.unknown"), ". ");
    __advance();
    __conditional(confirmation_r25.kind === "revoke" ? 6 : -1);
    __advance();
    __conditional(confirmation_r25.kind === "reactivate" ? 7 : -1);
    __advance();
    __conditional(confirmation_r25.kind === "signout" ? 8 : -1);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("appareils.confirm.demo"), " ");
    __advance(2);
    __textInterpolate(ctx_r0.t()("appareils.confirm.desc"));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("common.cancel"), " ");
    __advance();
    __conditional(confirmation_r25.kind === "reactivate" ? 15 : 16);
  }
}
var AppareilsPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.nf = nf;
    this.fmtDate = fmtDate;
    this.fmtDateTime = fmtDateTime;
    this.icons = {
      search: Search,
      phone: Smartphone,
      x: X,
      more: EllipsisVertical,
      eye: Eye,
      pencil: Pencil,
      refresh: RefreshCw,
      rotate: RotateCcw,
      userCog: UserCog,
      scroll: ScrollText,
      logOut: LogOut,
      ban: Ban
    };
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.userParam = toSignal(this.route.queryParamMap.pipe(map((m) => m.get("user"))), { initialValue: null });
    this.q = signal("", ...[]);
    this.filter = signal("tous", ...[]);
    this.detailId = signal(void 0, ...[]);
    this.renameOpen = signal(false, ...[]);
    this.renameId = signal(null, ...[]);
    this.renameLabel = "";
    this.confirm = signal(null, ...[]);
    this.deviceMenuOpenId = signal(null, ...[]);
    this.flash = signal(null, ...[]);
    this.filterOptions = [
      {
        value: "tous",
        label: ""
      },
      {
        value: "actif",
        label: ""
      },
      {
        value: "r\xE9voqu\xE9",
        label: ""
      }
    ];
    this.devices = computed(() => this.store.state().devices, ...[]);
    this.activeCount = computed(() => this.devices().filter((d) => d.active).length, ...[]);
    this.filterUser = computed(() => {
      const id = this.userParam();
      if (!id) return void 0;
      return this.store.state().users.find((u) => u.id === id);
    }, ...[]);
    this.rows = computed(() => {
      const uid = this.userParam();
      const f = this.filter();
      const needle = this.q().trim().toLowerCase();
      const users = this.store.state().users;
      return this.devices().filter((d) => !uid || d.userId === uid).filter((d) => f === "tous" ? true : f === "actif" ? d.active : !d.active).filter((d) => {
        var _a2;
        if (!needle) return true;
        const u = users.find((x) => x.id === d.userId);
        return `${d.label} ${(_a2 = u == null ? void 0 : u.name) != null ? _a2 : ""}`.toLowerCase().includes(needle);
      });
    }, ...[]);
    this.detailDevice = computed(() => {
      const id = this.detailId();
      if (!id) return void 0;
      return this.store.state().devices.find((d) => d.id === id);
    }, ...[]);
    this.detailHistory = computed(() => {
      const detail = this.detailDevice();
      if (!detail) return [];
      return this.store.state().audit.filter((a) => a.detail.includes(detail.label));
    }, ...[]);
    this.pager = createPager(() => this.rows());
    const t = this.t();
    this.filterOptions[0].label = t("appareils.seg.all");
    this.filterOptions[1].label = t("appareils.seg.active");
    this.filterOptions[2].label = t("appareils.seg.revoked");
  }
  onDocumentClick(ev) {
    if (!ev.target.closest("[data-device-menu]")) this.deviceMenuOpenId.set(null);
  }
  user(userId) {
    return this.store.state().users.find((u) => u.id === userId);
  }
  clearUserFilter() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { user: null },
      queryParamsHandling: "merge",
      replaceUrl: true
    });
  }
  openDetail(id) {
    this.detailId.set(id);
  }
  closeDetail() {
    this.detailId.set(void 0);
  }
  toggleDeviceMenu(id, ev) {
    ev.stopPropagation();
    this.deviceMenuOpenId.update((cur) => cur === id ? null : id);
  }
  openRename(d) {
    this.renameId.set(d.id);
    this.renameLabel = d.label;
    this.renameOpen.set(true);
  }
  onRenameOpen(open) {
    this.renameOpen.set(open);
    if (!open) {
      this.renameId.set(null);
      this.renameLabel = "";
    }
  }
  canSubmitRename() {
    var _a2;
    const id = this.renameId();
    if (!id) return false;
    const trimmed = this.renameLabel.trim();
    if (trimmed.length < 3) return false;
    return trimmed !== ((_a2 = this.store.state().devices.find((d) => d.id === id)) == null ? void 0 : _a2.label);
  }
  submitRename() {
    const id = this.renameId();
    if (!id || !this.canSubmitRename()) return;
    this.store.actions.renameDevice(id, this.renameLabel.trim());
    this.flash.set(this.t()("appareils.toast.renamed"));
    this.renameOpen.set(false);
    this.renameId.set(null);
    this.renameLabel = "";
  }
  askConfirm(kind, device) {
    this.confirm.set({
      kind,
      device
    });
  }
  onConfirmOpen(open) {
    if (!open) this.confirm.set(null);
  }
  confirmTitle() {
    const c = this.confirm();
    if (!c) return "";
    if (c.kind === "revoke") return this.t()("appareils.confirm.revoke.title");
    if (c.kind === "reactivate") return this.t()("appareils.confirm.reactivate.title");
    return this.t()("appareils.confirm.signout.title");
  }
  confirmSubmitLabel() {
    const c = this.confirm();
    if (!c) return "";
    if (c.kind === "revoke") return this.t()("appareils.confirm.revoke.submit");
    if (c.kind === "reactivate") return this.t()("appareils.confirm.reactivate.submit");
    return this.t()("appareils.confirm.signout.submit");
  }
  runConfirm() {
    const c = this.confirm();
    if (!c) return;
    const { kind, device } = c;
    if (kind === "revoke") this.store.actions.revokeDevice(device.id);
    if (kind === "reactivate") this.store.actions.reactivateDevice(device.id);
    if (kind === "signout") this.store.actions.signOutDevice(device.id);
    const msg = kind === "revoke" ? this.t()("appareils.toast.revoked") : kind === "reactivate" ? this.t()("appareils.toast.reactivated") : this.t()("appareils.toast.signedOut");
    this.flash.set(`${msg} \u2014 ${this.t()("appareils.toast.audited")}`);
    this.confirm.set(null);
  }
  resync(d) {
    this.store.actions.resyncDevice(d.id);
    this.flash.set(`${this.t()("appareils.toast.resync")} \u2014 ${this.t()("appareils.toast.resyncDesc")}`);
  }
}, _a.\u0275fac = function AppareilsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-appareils-page"]],
  hostBindings: function AppareilsPage_HostBindings(rf, ctx) {
    if (rf & 1) __listener("click", function AppareilsPage_click_HostBindingHandler($event) {
      return ctx.onDocumentClick($event);
    }, __resolveDocument);
  },
  decls: 31,
  vars: 30,
  consts: [
    [
      "perm",
      "device.manage",
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
      "actions",
      "",
      1,
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    ["tone", "success"],
    ["tone", "neutral"],
    [
      1,
      "mb-3",
      "rounded-md",
      "border",
      "border-border",
      "bg-muted/50",
      "px-3",
      "py-2",
      "text-sm"
    ],
    [
      1,
      "mb-3",
      "flex",
      "flex-wrap",
      "items-center",
      "gap-2",
      "rounded-md",
      "bg-info-bg",
      "px-3",
      "py-2",
      "text-sm",
      "text-info-fg"
    ],
    [
      1,
      "surface",
      "mb-3",
      "flex",
      "flex-wrap",
      "items-center",
      "gap-3",
      "p-3"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "gap-1",
      "rounded-md",
      "border",
      "bg-muted/40",
      "p-1"
    ],
    [
      "type",
      "button",
      1,
      "rounded",
      "px-2.5",
      "py-1",
      "text-xs",
      "font-medium",
      3,
      "bg-background",
      "shadow-sm"
    ],
    [1, "relative"],
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
      "w-64",
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
    [1, "surface"],
    [
      1,
      "px-4",
      "py-10",
      "text-center",
      "text-muted-foreground"
    ],
    [
      1,
      "fixed",
      "inset-0",
      "z-40",
      "flex",
      "justify-end"
    ],
    [
      3,
      "openChange",
      "open",
      "title"
    ],
    [
      1,
      "mb-3",
      "text-sm",
      "text-muted-foreground"
    ],
    [
      1,
      "block",
      "text-sm",
      "font-medium"
    ],
    [
      1,
      "mt-1",
      "h-9",
      "w-full",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-3",
      "text-sm",
      3,
      "ngModelChange",
      "ngModel",
      "placeholder"
    ],
    [
      "actions",
      "",
      "type",
      "button",
      1,
      "inline-flex",
      "h-9",
      "items-center",
      "rounded-md",
      "border",
      "px-4",
      "text-sm",
      3,
      "click"
    ],
    [
      "actions",
      "",
      "type",
      "button",
      1,
      "inline-flex",
      "h-9",
      "items-center",
      "rounded-md",
      "bg-primary",
      "px-4",
      "text-sm",
      "font-medium",
      "text-primary-foreground",
      "disabled:opacity-50",
      3,
      "click",
      "disabled"
    ],
    [
      3,
      "open",
      "title"
    ],
    [
      "type",
      "button",
      1,
      "ml-auto",
      "inline-flex",
      "items-center",
      "gap-1",
      "text-xs",
      "font-semibold",
      "hover:underline",
      3,
      "click"
    ],
    [
      1,
      "size-3.5",
      3,
      "img"
    ],
    [
      "type",
      "button",
      1,
      "rounded",
      "px-2.5",
      "py-1",
      "text-xs",
      "font-medium",
      3,
      "click"
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
      "hidden",
      "font-semibold",
      "md:table-cell"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "w-12",
      "pr-4"
    ],
    [1, "divide-y"],
    [
      1,
      "cursor-pointer",
      "hover:bg-muted/40"
    ],
    [
      1,
      "px-4",
      "pb-4",
      3,
      "pager"
    ],
    [
      1,
      "cursor-pointer",
      "hover:bg-muted/40",
      3,
      "click"
    ],
    [
      1,
      "py-2.5",
      "pl-4"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2",
      "font-medium"
    ],
    [
      1,
      "size-4",
      "text-muted-foreground",
      3,
      "img"
    ],
    [
      1,
      "hidden",
      "whitespace-nowrap",
      "text-muted-foreground",
      "md:table-cell"
    ],
    [
      1,
      "whitespace-nowrap",
      "text-muted-foreground"
    ],
    [
      "data-device-menu",
      "",
      1,
      "relative",
      "pr-4",
      "text-right",
      3,
      "click"
    ],
    [
      "type",
      "button",
      1,
      "inline-flex",
      "h-8",
      "w-8",
      "items-center",
      "justify-center",
      "rounded-md",
      "border",
      "border-input",
      "text-muted-foreground",
      "hover:bg-muted",
      "pointer-coarse:size-touch",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
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
      "data-device-menu",
      "",
      1,
      "absolute",
      "right-4",
      "z-20",
      "mt-1",
      "min-w-56",
      "rounded-md",
      "border",
      "bg-popover",
      "p-1",
      "text-left",
      "text-sm",
      "shadow-md"
    ],
    [
      1,
      "font-medium",
      "hover:text-primary",
      "hover:underline",
      3,
      "click",
      "routerLink",
      "queryParams"
    ],
    [
      1,
      "text-xs",
      "text-muted-foreground"
    ],
    [
      "type",
      "button",
      1,
      "flex",
      "w-full",
      "items-center",
      "gap-2",
      "rounded",
      "px-2",
      "py-1.5",
      "text-left",
      "hover:bg-muted",
      3,
      "click"
    ],
    [
      1,
      "size-4",
      "shrink-0",
      3,
      "img"
    ],
    [
      "type",
      "button",
      1,
      "flex",
      "w-full",
      "items-center",
      "gap-2",
      "rounded",
      "px-2",
      "py-1.5",
      "text-left",
      "hover:bg-muted"
    ],
    [
      1,
      "flex",
      "w-full",
      "items-center",
      "gap-2",
      "rounded",
      "px-2",
      "py-1.5",
      "hover:bg-muted",
      3,
      "routerLink",
      "queryParams"
    ],
    [
      "type",
      "button",
      1,
      "flex",
      "w-full",
      "items-center",
      "gap-2",
      "rounded",
      "px-2",
      "py-1.5",
      "text-left",
      "text-danger-fg",
      "hover:bg-muted"
    ],
    [
      1,
      "flex",
      "w-full",
      "items-center",
      "gap-2",
      "rounded",
      "px-2",
      "py-1.5",
      "hover:bg-muted",
      3,
      "click",
      "routerLink",
      "queryParams"
    ],
    [
      "type",
      "button",
      1,
      "flex",
      "w-full",
      "items-center",
      "gap-2",
      "rounded",
      "px-2",
      "py-1.5",
      "text-left",
      "text-danger-fg",
      "hover:bg-muted",
      3,
      "click"
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
      "absolute",
      "inset-0",
      "bg-black/40",
      3,
      "click"
    ],
    [
      1,
      "relative",
      "z-50",
      "flex",
      "h-full",
      "w-full",
      "max-w-md",
      "flex-col",
      "overflow-y-auto",
      "border-l",
      "bg-card",
      "p-5",
      "shadow-lg"
    ],
    [
      1,
      "flex",
      "items-start",
      "justify-between",
      "gap-2"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2",
      "text-lg",
      "font-semibold"
    ],
    [
      1,
      "size-5",
      "text-primary",
      3,
      "img"
    ],
    [
      "type",
      "button",
      1,
      "rounded-md",
      "p-1",
      "text-muted-foreground",
      "hover:bg-muted",
      3,
      "click"
    ],
    [
      1,
      "size-5",
      3,
      "img"
    ],
    [1, "mt-2"],
    [
      1,
      "mt-5",
      "grid",
      "grid-cols-2",
      "gap-4",
      "text-sm"
    ],
    [1, "mt-0.5"],
    [
      1,
      "text-primary",
      "hover:underline",
      3,
      "routerLink",
      "queryParams"
    ],
    [1, "col-span-2"],
    [
      1,
      "mt-0.5",
      "font-mono",
      "text-xs"
    ],
    [
      1,
      "mt-5",
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      "type",
      "button",
      1,
      "inline-flex",
      "h-8",
      "items-center",
      "gap-1.5",
      "rounded-md",
      "border",
      "border-input",
      "px-2",
      "text-xs",
      "font-medium",
      3,
      "click"
    ],
    [
      "type",
      "button",
      1,
      "inline-flex",
      "h-8",
      "items-center",
      "gap-1.5",
      "rounded-md",
      "border",
      "border-input",
      "px-2",
      "text-xs",
      "font-medium"
    ],
    [
      "type",
      "button",
      1,
      "inline-flex",
      "h-8",
      "items-center",
      "gap-1.5",
      "rounded-md",
      "border",
      "border-input",
      "px-2",
      "text-xs",
      "font-medium",
      "text-danger-fg"
    ],
    [1, "mt-6"],
    [
      1,
      "eyebrow",
      "mb-2"
    ],
    [
      1,
      "divide-y",
      "text-sm"
    ],
    [
      1,
      "text-sm",
      "text-muted-foreground"
    ],
    [
      1,
      "mt-2",
      "inline-block",
      "text-xs",
      "font-semibold",
      "text-primary",
      "hover:underline",
      3,
      "routerLink",
      "queryParams"
    ],
    [
      "type",
      "button",
      1,
      "inline-flex",
      "h-8",
      "items-center",
      "gap-1.5",
      "rounded-md",
      "border",
      "border-input",
      "px-2",
      "text-xs",
      "font-medium",
      "text-danger-fg",
      3,
      "click"
    ],
    [1, "py-2"],
    [1, "font-medium"],
    [1, "text-sm"],
    [
      1,
      "mt-3",
      "rounded-md",
      "bg-warning-bg",
      "p-3",
      "text-sm",
      "text-warning-fg"
    ],
    [
      1,
      "mt-2",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      "actions",
      "",
      "type",
      "button",
      1,
      "inline-flex",
      "h-9",
      "items-center",
      "rounded-md",
      "bg-primary",
      "px-4",
      "text-sm",
      "font-medium",
      "text-primary-foreground",
      "hover:bg-primary/90",
      "disabled:opacity-50"
    ],
    [
      "actions",
      "",
      "type",
      "button",
      1,
      "inline-flex",
      "h-9",
      "items-center",
      "rounded-md",
      "bg-destructive",
      "px-4",
      "text-sm",
      "font-medium",
      "text-destructive-foreground",
      "hover:bg-destructive/90",
      "disabled:opacity-50"
    ],
    [
      "actions",
      "",
      "type",
      "button",
      1,
      "inline-flex",
      "h-9",
      "items-center",
      "rounded-md",
      "bg-primary",
      "px-4",
      "text-sm",
      "font-medium",
      "text-primary-foreground",
      "hover:bg-primary/90",
      "disabled:opacity-50",
      3,
      "click"
    ],
    [
      "actions",
      "",
      "type",
      "button",
      1,
      "inline-flex",
      "h-9",
      "items-center",
      "rounded-md",
      "bg-destructive",
      "px-4",
      "text-sm",
      "font-medium",
      "text-destructive-foreground",
      "hover:bg-destructive/90",
      "disabled:opacity-50",
      3,
      "click"
    ]
  ],
  template: function AppareilsPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0)(1, "ui-page-header", 1)(2, "div", 2)(3, "ui-pill", 3);
      __text(4);
      __elementEnd();
      __elementStart(5, "ui-pill", 4);
      __text(6);
      __elementEnd()()();
      __conditionalCreate(7, AppareilsPage_Conditional_7_Template, 2, 1, "p", 5);
      __conditionalCreate(8, AppareilsPage_Conditional_8_Template, 7, 4, "div", 6);
      __elementStart(9, "div", 7)(10, "div", 8);
      __repeaterCreate(11, AppareilsPage_For_12_Template, 2, 5, "button", 9, _forTrack0);
      __elementEnd();
      __elementStart(13, "div", 10);
      __element(14, "lucide-angular", 11);
      __elementStart(15, "input", 12);
      __controlCreate();
      __listener("ngModelChange", function AppareilsPage_Template_input_ngModelChange_15_listener($event) {
        return ctx.q.set($event);
      });
      __elementEnd()()();
      __elementStart(16, "div", 13);
      __conditionalCreate(17, AppareilsPage_Conditional_17_Template, 18, 6)(18, AppareilsPage_Conditional_18_Template, 6, 3, "div", 14);
      __elementEnd();
      __conditionalCreate(19, AppareilsPage_Conditional_19_Template, 54, 27, "div", 15);
      __elementStart(20, "ui-dialog", 16);
      __listener("openChange", function AppareilsPage_Template_ui_dialog_openChange_20_listener($event) {
        return ctx.onRenameOpen($event);
      });
      __elementStart(21, "p", 17);
      __text(22);
      __elementEnd();
      __elementStart(23, "label", 18);
      __text(24);
      __elementEnd();
      __elementStart(25, "input", 19);
      __controlCreate();
      __twoWayListener("ngModelChange", function AppareilsPage_Template_input_ngModelChange_25_listener($event) {
        __twoWayBindingSet(ctx.renameLabel, $event) || (ctx.renameLabel = $event);
        return $event;
      });
      __elementEnd();
      __elementStart(26, "button", 20);
      __listener("click", function AppareilsPage_Template_button_click_26_listener() {
        return ctx.renameOpen.set(false);
      });
      __text(27);
      __elementEnd();
      __elementStart(28, "button", 21);
      __listener("click", function AppareilsPage_Template_button_click_28_listener() {
        return ctx.submitRename();
      });
      __text(29);
      __elementEnd()();
      __conditionalCreate(30, AppareilsPage_Conditional_30_Template, 17, 13, "ui-dialog", 22);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_7_0;
      let tmp_16_0;
      let tmp_27_0;
      __property("area", ctx.t()("appareils.area"));
      __advance();
      __property("eyebrow", ctx.t()("appareils.eyebrow"))("title", ctx.t()("appareils.title"))("description", ctx.t()("appareils.description"));
      __advance(3);
      __textInterpolate(ctx.t()("appareils.count.active", __pureFunction1(26, _c0, ctx.nf.format(ctx.activeCount()))));
      __advance(2);
      __textInterpolate(ctx.t()("appareils.count.revoked", __pureFunction1(28, _c0, ctx.nf.format(ctx.devices().length - ctx.activeCount()))));
      __advance();
      __conditional(ctx.flash() ? 7 : -1);
      __advance();
      __conditional((tmp_7_0 = ctx.filterUser()) ? 8 : -1, tmp_7_0);
      __advance(3);
      __repeater(ctx.filterOptions);
      __advance(3);
      __property("img", ctx.icons.search);
      __advance();
      __property("placeholder", ctx.t()("appareils.search"))("ngModel", ctx.q());
      __attribute("aria-label", ctx.t()("appareils.search"));
      __control();
      __advance();
      __classProp("overflow-x-auto", !ctx.deviceMenuOpenId());
      __advance();
      __conditional(ctx.rows().length ? 17 : 18);
      __advance(2);
      __conditional((tmp_16_0 = ctx.detailDevice()) ? 19 : -1, tmp_16_0);
      __advance();
      __property("open", ctx.renameOpen())("title", ctx.t()("appareils.rename.title"));
      __advance(2);
      __textInterpolate(ctx.t()("appareils.rename.desc"));
      __advance(2);
      __textInterpolate(ctx.t()("appareils.rename.field"));
      __advance();
      __twoWayProperty("ngModel", ctx.renameLabel);
      __property("placeholder", ctx.t()("appareils.rename.placeholder"));
      __control();
      __advance(2);
      __textInterpolate1(" ", ctx.t()("common.cancel"), " ");
      __advance();
      __property("disabled", !ctx.canSubmitRename());
      __advance();
      __textInterpolate1(" ", ctx.t()("appareils.rename.submit"), " ");
      __advance();
      __conditional((tmp_27_0 = ctx.confirm()) ? 30 : -1, tmp_27_0);
    }
  },
  dependencies: [
    PaginationComponent,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    RouterLink,
    LucideAngularModule,
    LucideAngularComponent,
    AppShellComponent,
    UiDialogComponent,
    UiPageHeaderComponent,
    UiPillComponent
  ],
  encapsulation: 2
}), _a);

export { AppareilsPage as default };
//# sourceMappingURL=appareils.page-DISRIS50.mjs.map

import { i as inject, R as Router, A as ActivatedRoute, ag as DestroyRef, F as signal, ɵ as __defineComponent, d as RouterLink, f as __elementStart, g as __text, h as __elementEnd, j as __conditionalCreate, o as __advance, p as __textInterpolate, s as __conditional, q as __textInterpolate1, w as __nextContext, L as __getCurrentView, H as __listener, O as __restoreView, P as __resetView, b as __element, r as __pureFunction1, n as __property } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { a as takeUntilDestroyed } from './rxjs-interop-wN9yU0Tj.mjs';
import { a as authErrorMessage } from './auth-B3-o0LRT.mjs';
import { i as isPasswordValid } from './policy-CKiWt4l5.mjs';
import { A as AuthService } from './auth.service-B7cg2Yei.mjs';
import { L as LocaleService } from './locale.service-c0QhtcVY.mjs';
import { take } from 'rxjs';
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
import './client-D1lxPQMx.mjs';
import 'zod';

var _a;
var _c0 = (a0) => ({ email: a0 });
function InvitationPage_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 3);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("auth.invitation.checking"), " ");
  }
}
function InvitationPage_Conditional_5_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 16);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("auth.invitation.mismatch"), " ");
  }
}
function InvitationPage_Conditional_5_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 16);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
function InvitationPage_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = __getCurrentView();
    __elementStart(0, "p", 7);
    __text(1);
    __elementEnd();
    __elementStart(2, "form", 8);
    __listener("submit", function InvitationPage_Conditional_5_Template_form_submit_2_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext();
      $event.preventDefault();
      return __resetView(ctx_r0.submitForm());
    });
    __elementStart(3, "p", 9)(4, "span", 10);
    __text(5);
    __elementEnd();
    __element(6, "br");
    __text(7);
    __elementEnd();
    __elementStart(8, "div", 11)(9, "label", 12);
    __text(10);
    __elementEnd();
    __elementStart(11, "input", 13);
    __listener("input", function InvitationPage_Conditional_5_Template_input_input_11_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.password.set(ctx_r0.inputValue($event)));
    });
    __elementEnd()();
    __elementStart(12, "div", 11)(13, "label", 14);
    __text(14);
    __elementEnd();
    __elementStart(15, "input", 15);
    __listener("input", function InvitationPage_Conditional_5_Template_input_input_15_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.confirm.set(ctx_r0.inputValue($event)));
    });
    __elementEnd()();
    __conditionalCreate(16, InvitationPage_Conditional_5_Conditional_16_Template, 2, 1, "div", 16)(17, InvitationPage_Conditional_5_Conditional_17_Template, 2, 1, "div", 16);
    __elementStart(18, "button", 17);
    __text(19);
    __elementEnd()();
  }
  if (rf & 2) {
    const k_r3 = ctx;
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate(ctx_r0.t()("auth.invitation.description"));
    __advance(4);
    __textInterpolate(k_r3.name);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("auth.invitation.account", __pureFunction1(10, _c0, k_r3.maskedEmail)), " ");
    __advance(3);
    __textInterpolate(ctx_r0.t()("auth.invitation.password"));
    __advance();
    __property("value", ctx_r0.password());
    __advance(3);
    __textInterpolate(ctx_r0.t()("auth.invitation.confirm"));
    __advance();
    __property("value", ctx_r0.confirm());
    __advance();
    __conditional(ctx_r0.mismatch() ? 16 : ctx_r0.error() ? 17 : -1);
    __advance(2);
    __property("disabled", ctx_r0.busy() || !ctx_r0.canSubmit());
    __advance();
    __textInterpolate1(" ", ctx_r0.busy() ? ctx_r0.t()("auth.invitation.submitting") : ctx_r0.t()("auth.invitation.submit"), " ");
  }
}
function InvitationPage_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 4);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r0.error() || ctx_r0.t()("auth.error.invitation_invalid"), " ");
  }
}
var InvitationPage = (_a = class {
  constructor() {
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.destroyRef = inject(DestroyRef);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.token = null;
    this.checking = signal(false, ...[]);
    this.known = signal(null, ...[]);
    this.password = signal("", ...[]);
    this.confirm = signal("", ...[]);
    this.error = signal("", ...[]);
    this.busy = signal(false, ...[]);
    this.route.queryParamMap.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const urlToken = params.get("jeton");
      if (urlToken) {
        this.token = urlToken;
        this.router.navigate([], {
          relativeTo: this.route,
          replaceUrl: true,
          queryParams: { jeton: null }
        });
        this.loadInfo();
      } else this.error.set(this.t()("auth.invitation.missing"));
    });
  }
  loadInfo() {
    if (!this.token) return;
    this.checking.set(true);
    this.error.set("");
    this.auth.invitationInfo(this.token).then((info) => {
      this.known.set(info);
    }).catch((e) => {
      this.error.set(authErrorMessage(e, this.t()));
      this.known.set(null);
    }).finally(() => this.checking.set(false));
  }
  inputValue(event) {
    return event.target.value;
  }
  mismatch() {
    return this.confirm().length > 0 && this.confirm() !== this.password();
  }
  canSubmit() {
    const k = this.known();
    if (!k || !this.token) return false;
    return isPasswordValid(this.password(), k.email) && this.confirm() === this.password();
  }
  async submitForm() {
    if (!this.canSubmit() || !this.token || this.busy()) return;
    this.busy.set(true);
    this.error.set("");
    try {
      await this.auth.acceptInvitation(this.token, this.password());
      await this.router.navigate(["/login"], { queryParams: { motdepasse: "modifie" } });
    } catch (e) {
      this.error.set(authErrorMessage(e, this.t()));
    } finally {
      this.busy.set(false);
    }
  }
}, _a.\u0275fac = function InvitationPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-invitation-page"]],
  decls: 10,
  vars: 3,
  consts: [
    [
      1,
      "flex",
      "min-h-screen",
      "items-start",
      "justify-center",
      "px-5",
      "pb-[max(1.5rem,env(safe-area-inset-bottom))]",
      "pt-8",
      "sm:items-center",
      "sm:p-6"
    ],
    [
      1,
      "w-full",
      "max-w-sm"
    ],
    [
      1,
      "text-xl",
      "font-semibold"
    ],
    [
      "role",
      "status",
      1,
      "mt-6",
      "text-sm",
      "text-muted-foreground"
    ],
    [
      "role",
      "alert",
      1,
      "mt-6",
      "rounded-md",
      "bg-danger-bg",
      "px-3",
      "py-2.5",
      "text-sm",
      "text-danger-fg"
    ],
    [
      1,
      "mt-8",
      "text-center",
      "text-sm"
    ],
    [
      "routerLink",
      "/login",
      1,
      "font-semibold",
      "text-primary",
      "hover:underline",
      "pointer-coarse:inline-block",
      "pointer-coarse:py-2"
    ],
    [
      1,
      "mt-1",
      "text-muted-foreground"
    ],
    [
      "novalidate",
      "",
      1,
      "mt-6",
      "space-y-5",
      3,
      "submit"
    ],
    [
      1,
      "text-sm",
      "text-muted-foreground"
    ],
    [
      1,
      "font-medium",
      "text-foreground"
    ],
    [1, "space-y-2"],
    [
      "for",
      "pw1",
      1,
      "text-sm",
      "font-medium"
    ],
    [
      "id",
      "pw1",
      "type",
      "password",
      "autocomplete",
      "new-password",
      "autofocus",
      "",
      1,
      "flex",
      "h-touch",
      "w-full",
      "rounded-md",
      "border",
      "border-input",
      "bg-transparent",
      "px-3",
      "py-1",
      "text-base",
      "shadow-sm",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      "md:text-sm",
      3,
      "input",
      "value"
    ],
    [
      "for",
      "pw2",
      1,
      "text-sm",
      "font-medium"
    ],
    [
      "id",
      "pw2",
      "type",
      "password",
      "autocomplete",
      "new-password",
      1,
      "flex",
      "h-touch",
      "w-full",
      "rounded-md",
      "border",
      "border-input",
      "bg-transparent",
      "px-3",
      "py-1",
      "text-base",
      "shadow-sm",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      "md:text-sm",
      3,
      "input",
      "value"
    ],
    [
      "role",
      "alert",
      1,
      "rounded-md",
      "bg-danger-bg",
      "px-3",
      "py-2.5",
      "text-sm",
      "text-danger-fg"
    ],
    [
      "type",
      "submit",
      1,
      "inline-flex",
      "h-touch",
      "w-full",
      "items-center",
      "justify-center",
      "rounded-md",
      "bg-primary",
      "text-sm",
      "font-medium",
      "text-primary-foreground",
      "hover:bg-primary/90",
      "disabled:opacity-50",
      3,
      "disabled"
    ]
  ],
  template: function InvitationPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      __text(3);
      __elementEnd();
      __conditionalCreate(4, InvitationPage_Conditional_4_Template, 2, 1, "p", 3)(5, InvitationPage_Conditional_5_Template, 20, 12)(6, InvitationPage_Conditional_6_Template, 2, 1, "div", 4);
      __elementStart(7, "p", 5)(8, "a", 6);
      __text(9);
      __elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      __advance(3);
      __textInterpolate(ctx.t()("auth.invitation.title"));
      __advance();
      __conditional(ctx.checking() ? 4 : (tmp_1_0 = ctx.known()) ? 5 : 6, tmp_1_0);
      __advance(5);
      __textInterpolate1(" ", ctx.t()("auth.invitation.toLogin"), " ");
    }
  },
  dependencies: [RouterLink],
  encapsulation: 2
}), _a);

export { InvitationPage as default };
//# sourceMappingURL=invitation.page-PVfDjnNQ.mjs.map

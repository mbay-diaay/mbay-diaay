import { i as inject, R as Router, ag as DestroyRef, F as signal, c as computed, ɵ as __defineComponent, d as RouterLink, f as __elementStart, g as __text, h as __elementEnd, j as __conditionalCreate, o as __advance, p as __textInterpolate, s as __conditional, q as __textInterpolate1, L as __getCurrentView, H as __listener, w as __nextContext, n as __property, O as __restoreView, P as __resetView, a0 as __pureFunction3, r as __pureFunction1, N as __textInterpolate2 } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { a as authErrorMessage } from './auth-B3-o0LRT.mjs';
import { a as OTP_TTL_MS, i as isPasswordValid, n as normalizeEmail } from './policy-CKiWt4l5.mjs';
import { A as AuthService } from './auth.service-B7cg2Yei.mjs';
import { L as LocaleService } from './locale.service-c0QhtcVY.mjs';
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
import './client-D1lxPQMx.mjs';
import 'zod';

var _a;
var _c0 = (a0, a1, a2) => ({
  length: a0,
  email: a1,
  minutes: a2
});
var _c1 = (a0) => ({ seconds: a0 });
var _c2 = (a0) => ({ to: a0 });
function MotDePasseOubliePage_Case_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 12);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r1.error(), " ");
  }
}
function MotDePasseOubliePage_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "form", 8);
    __listener("submit", function MotDePasseOubliePage_Case_6_Template_form_submit_0_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      $event.preventDefault();
      return __resetView(ctx_r1.submitEmail());
    });
    __elementStart(1, "div", 9)(2, "label", 10);
    __text(3);
    __elementEnd();
    __elementStart(4, "input", 11);
    __listener("input", function MotDePasseOubliePage_Case_6_Template_input_input_4_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.email.set(ctx_r1.inputValue($event)));
    });
    __elementEnd()();
    __conditionalCreate(5, MotDePasseOubliePage_Case_6_Conditional_5_Template, 2, 1, "div", 12);
    __elementStart(6, "button", 13);
    __text(7);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(3);
    __textInterpolate(ctx_r1.t()("auth.login.email"));
    __advance();
    __property("placeholder", ctx_r1.t()("auth.login.emailPlaceholder"))("value", ctx_r1.email());
    __advance();
    __conditional(ctx_r1.error() ? 5 : -1);
    __advance();
    __property("disabled", ctx_r1.busy());
    __advance();
    __textInterpolate1(" ", ctx_r1.busy() ? ctx_r1.t()("auth.forgot.sending") : ctx_r1.t()("auth.forgot.send"), " ");
  }
}
function MotDePasseOubliePage_Case_7_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 12);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r1.error(), " ");
  }
}
function MotDePasseOubliePage_Case_7_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 19)(1, "div", 24);
    __text(2);
    __elementEnd();
    __elementStart(3, "p", 25);
    __text(4);
    __elementStart(5, "span", 26);
    __text(6);
    __elementEnd()()();
  }
  if (rf & 2) {
    const mail_r4 = ctx;
    const ctx_r1 = __nextContext(2);
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("auth.mail.title"), " ");
    __advance(2);
    __textInterpolate2(" ", ctx_r1.t()("auth.mail.line", __pureFunction1(4, _c2, mail_r4.to)), " ", ctx_r1.t()("auth.mail.code"), " ");
    __advance(2);
    __textInterpolate(mail_r4.code);
  }
}
function MotDePasseOubliePage_Case_7_Template(rf, ctx) {
  var _a2, _b;
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "div", 5)(1, "h2", 14);
    __text(2);
    __elementEnd();
    __elementStart(3, "p", 15);
    __text(4);
    __elementEnd();
    __elementStart(5, "form", 16);
    __listener("submit", function MotDePasseOubliePage_Case_7_Template_form_submit_5_listener($event) {
      __restoreView(_r3);
      const ctx_r1 = __nextContext();
      $event.preventDefault();
      return __resetView(ctx_r1.submitCode());
    });
    __elementStart(6, "p", 15);
    __text(7);
    __elementEnd();
    __elementStart(8, "div", 9)(9, "label", 17);
    __text(10);
    __elementEnd();
    __elementStart(11, "input", 18);
    __listener("input", function MotDePasseOubliePage_Case_7_Template_input_input_11_listener($event) {
      __restoreView(_r3);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.onCodeInput($event));
    });
    __elementEnd()();
    __conditionalCreate(12, MotDePasseOubliePage_Case_7_Conditional_12_Template, 2, 1, "div", 12);
    __conditionalCreate(13, MotDePasseOubliePage_Case_7_Conditional_13_Template, 7, 6, "div", 19);
    __elementStart(14, "button", 20);
    __text(15);
    __elementEnd()();
    __elementStart(16, "div", 21)(17, "button", 22);
    __listener("click", function MotDePasseOubliePage_Case_7_Template_button_click_17_listener() {
      __restoreView(_r3);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.resend());
    });
    __text(18);
    __elementEnd();
    __elementStart(19, "button", 23);
    __listener("click", function MotDePasseOubliePage_Case_7_Template_button_click_19_listener() {
      __restoreView(_r3);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.backToEmail());
    });
    __text(20);
    __elementEnd()()();
  }
  if (rf & 2) {
    let tmp_8_0;
    const ctx_r1 = __nextContext();
    __advance(2);
    __textInterpolate(ctx_r1.t()("auth.forgot.codeTitle"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("auth.forgot.step2"));
    __advance(3);
    __textInterpolate1(" ", ctx_r1.t()("auth.otp.sent", __pureFunction3(13, _c0, ctx_r1.OTP_LENGTH, (_b = (_a2 = ctx_r1.sentInfo()) == null ? void 0 : _a2.maskedEmail) != null ? _b : "", ctx_r1.otpMinutes)), " ");
    __advance(3);
    __textInterpolate(ctx_r1.t()("auth.otp.code"));
    __advance();
    __property("value", ctx_r1.code())("disabled", ctx_r1.busy());
    __advance();
    __conditional(ctx_r1.error() ? 12 : -1);
    __advance();
    __conditional((tmp_8_0 = ctx_r1.demoMail()) ? 13 : -1, tmp_8_0);
    __advance();
    __property("disabled", ctx_r1.busy() || ctx_r1.code().length < ctx_r1.OTP_LENGTH);
    __advance();
    __textInterpolate1(" ", ctx_r1.busy() ? ctx_r1.t()("auth.otp.verifying") : ctx_r1.t()("auth.forgot.validate"), " ");
    __advance(2);
    __property("disabled", ctx_r1.busy() || ctx_r1.resendWait() > 0);
    __advance();
    __textInterpolate1(" ", ctx_r1.resendWait() > 0 ? ctx_r1.t()("auth.otp.resendIn", __pureFunction1(17, _c1, ctx_r1.resendWait())) : ctx_r1.t()("auth.otp.resend"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("auth.otp.back"), " ");
  }
}
function MotDePasseOubliePage_Case_8_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 12);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("auth.forgot.mismatch"), " ");
  }
}
function MotDePasseOubliePage_Case_8_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 12);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r1.error(), " ");
  }
}
function MotDePasseOubliePage_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "form", 8);
    __listener("submit", function MotDePasseOubliePage_Case_8_Template_form_submit_0_listener($event) {
      __restoreView(_r5);
      const ctx_r1 = __nextContext();
      $event.preventDefault();
      return __resetView(ctx_r1.submitPassword());
    });
    __elementStart(1, "h2", 14);
    __text(2);
    __elementEnd();
    __elementStart(3, "p", 15);
    __text(4);
    __elementEnd();
    __elementStart(5, "div", 9)(6, "label", 27);
    __text(7);
    __elementEnd();
    __elementStart(8, "input", 28);
    __listener("input", function MotDePasseOubliePage_Case_8_Template_input_input_8_listener($event) {
      __restoreView(_r5);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.password.set(ctx_r1.inputValue($event)));
    });
    __elementEnd()();
    __elementStart(9, "div", 9)(10, "label", 29);
    __text(11);
    __elementEnd();
    __elementStart(12, "input", 30);
    __listener("input", function MotDePasseOubliePage_Case_8_Template_input_input_12_listener($event) {
      __restoreView(_r5);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.confirm.set(ctx_r1.inputValue($event)));
    });
    __elementEnd()();
    __conditionalCreate(13, MotDePasseOubliePage_Case_8_Conditional_13_Template, 2, 1, "div", 12)(14, MotDePasseOubliePage_Case_8_Conditional_14_Template, 2, 1, "div", 12);
    __elementStart(15, "button", 20);
    __text(16);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __textInterpolate(ctx_r1.t()("auth.forgot.newTitle"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("auth.forgot.newDescription"));
    __advance(3);
    __textInterpolate(ctx_r1.t()("auth.forgot.newPassword"));
    __advance();
    __property("value", ctx_r1.password());
    __advance(3);
    __textInterpolate(ctx_r1.t()("auth.forgot.confirm"));
    __advance();
    __property("value", ctx_r1.confirm());
    __advance();
    __conditional(ctx_r1.mismatch() ? 13 : ctx_r1.error() ? 14 : -1);
    __advance(2);
    __property("disabled", ctx_r1.busy() || !ctx_r1.canSubmitPassword());
    __advance();
    __textInterpolate1(" ", ctx_r1.busy() ? ctx_r1.t()("auth.forgot.saving") : ctx_r1.t()("auth.forgot.save"), " ");
  }
}
var MotDePasseOubliePage = (_a = class {
  constructor() {
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.destroyRef = inject(DestroyRef);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.OTP_LENGTH = 6;
    this.otpMinutes = Math.round(OTP_TTL_MS / 6e4);
    this.step = signal({ name: "email" }, ...[]);
    this.email = signal("", ...[]);
    this.code = signal("", ...[]);
    this.password = signal("", ...[]);
    this.confirm = signal("", ...[]);
    this.error = signal("", ...[]);
    this.busy = signal(false, ...[]);
    this.now = signal(Date.now(), ...[]);
    this.sentInfo = computed(() => {
      const s = this.step();
      return s.name === "code" ? s.sent : null;
    }, ...[]);
    this.resendWait = computed(() => {
      const sent = this.sentInfo();
      if (!sent) return 0;
      this.now();
      return Math.max(0, Math.ceil((sent.resendAvailableAt - Date.now()) / 1e3));
    }, ...[]);
    this.demoMail = signal(this.auth.mailbox.latest(), ...[]);
    const tick = setInterval(() => this.now.set(Date.now()), 500);
    this.destroyRef.onDestroy(() => clearInterval(tick));
    const unsub = this.auth.mailbox.subscribe(() => {
      this.demoMail.set(this.auth.mailbox.latest());
    });
    this.destroyRef.onDestroy(unsub);
  }
  inputValue(event) {
    return event.target.value;
  }
  onCodeInput(event) {
    const v = this.inputValue(event).replace(/\D/g, "").slice(0, 6);
    this.code.set(v);
  }
  mismatch() {
    return this.confirm().length > 0 && this.confirm() !== this.password();
  }
  canSubmitPassword() {
    const s = this.step();
    if (s.name !== "password") return false;
    return isPasswordValid(this.password(), s.email) && this.confirm() === this.password();
  }
  async submitEmail() {
    const normalized = normalizeEmail(this.email());
    if (!normalized) {
      this.error.set(this.t()("auth.login.errorEmail"));
      return;
    }
    this.busy.set(true);
    this.error.set("");
    try {
      const sent = await this.auth.requestPasswordReset(normalized);
      this.step.set({
        name: "code",
        email: normalized,
        sent
      });
      this.code.set("");
    } catch (e) {
      this.error.set(authErrorMessage(e, this.t()));
    } finally {
      this.busy.set(false);
    }
  }
  async submitCode() {
    const s = this.step();
    if (s.name !== "code") return;
    const raw = this.code();
    if (raw.length < 6) return;
    this.busy.set(true);
    this.error.set("");
    try {
      const { resetToken } = await this.auth.verifyResetCode(s.email, raw);
      this.step.set({
        name: "password",
        email: s.email,
        resetToken
      });
      this.password.set("");
      this.confirm.set("");
    } catch (e) {
      this.error.set(authErrorMessage(e, this.t()));
      this.code.set("");
    } finally {
      this.busy.set(false);
    }
  }
  async resend() {
    const s = this.step();
    if (s.name !== "code") return;
    this.busy.set(true);
    this.error.set("");
    try {
      const next = await this.auth.requestPasswordReset(s.email);
      this.step.set({
        name: "code",
        email: s.email,
        sent: next
      });
      this.code.set("");
    } catch (e) {
      this.error.set(authErrorMessage(e, this.t()));
    } finally {
      this.busy.set(false);
    }
  }
  backToEmail() {
    this.step.set({ name: "email" });
    this.code.set("");
    this.error.set("");
  }
  async submitPassword() {
    const s = this.step();
    if (s.name !== "password" || !this.canSubmitPassword()) return;
    this.busy.set(true);
    this.error.set("");
    try {
      await this.auth.resetPassword(s.resetToken, this.password());
      await this.router.navigate(["/login"], { queryParams: { motdepasse: "modifie" } });
    } catch (e) {
      this.error.set(authErrorMessage(e, this.t()));
    } finally {
      this.busy.set(false);
    }
  }
}, _a.\u0275fac = function MotDePasseOubliePage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-mot-de-passe-oublie-page"]],
  decls: 12,
  vars: 4,
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
      1,
      "mt-1",
      "text-muted-foreground"
    ],
    [
      "novalidate",
      "",
      1,
      "mt-6",
      "space-y-5"
    ],
    [
      1,
      "mt-6",
      "space-y-5"
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
      "novalidate",
      "",
      1,
      "mt-6",
      "space-y-5",
      3,
      "submit"
    ],
    [1, "space-y-2"],
    [
      "for",
      "email",
      1,
      "text-sm",
      "font-medium",
      "leading-none"
    ],
    [
      "id",
      "email",
      "type",
      "email",
      "autocomplete",
      "username",
      "inputmode",
      "email",
      "autocapitalize",
      "none",
      "spellcheck",
      "false",
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
      "placeholder:text-placeholder",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      "md:text-sm",
      3,
      "input",
      "placeholder",
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
      "disabled:pointer-events-none",
      "disabled:opacity-50",
      3,
      "disabled"
    ],
    [
      1,
      "text-lg",
      "font-semibold"
    ],
    [
      1,
      "text-sm",
      "text-muted-foreground"
    ],
    [
      1,
      "space-y-4",
      3,
      "submit"
    ],
    [
      "for",
      "code",
      1,
      "text-sm",
      "font-medium"
    ],
    [
      "id",
      "code",
      "inputmode",
      "numeric",
      "autocomplete",
      "one-time-code",
      "maxlength",
      "6",
      1,
      "flex",
      "h-9",
      "w-full",
      "pointer-coarse:h-touch",
      "rounded-md",
      "border",
      "border-input",
      "bg-transparent",
      "px-3",
      "py-1",
      "text-base",
      "shadow-sm",
      "tabular",
      "tracking-[0.5em]",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      "disabled:opacity-50",
      "md:text-sm",
      3,
      "input",
      "value",
      "disabled"
    ],
    [
      "role",
      "status",
      1,
      "rounded-md",
      "border",
      "border-dashed",
      "border-border-strong",
      "bg-muted",
      "p-3",
      "text-sm"
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
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "justify-between",
      "gap-2",
      "text-sm"
    ],
    [
      "type",
      "button",
      1,
      "font-semibold",
      "text-primary",
      "hover:underline",
      "disabled:cursor-not-allowed",
      "disabled:text-muted-foreground",
      "disabled:no-underline",
      3,
      "click",
      "disabled"
    ],
    [
      "type",
      "button",
      1,
      "text-muted-foreground",
      "hover:text-foreground",
      3,
      "click"
    ],
    [
      1,
      "text-xs",
      "font-semibold",
      "uppercase",
      "tracking-wider",
      "text-muted-foreground"
    ],
    [1, "mt-1"],
    [
      1,
      "font-semibold",
      "tabular",
      "tracking-widest"
    ],
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
    ]
  ],
  template: function MotDePasseOubliePage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      __text(3);
      __elementEnd();
      __elementStart(4, "p", 3);
      __text(5);
      __elementEnd();
      __conditionalCreate(6, MotDePasseOubliePage_Case_6_Template, 8, 6, "form", 4)(7, MotDePasseOubliePage_Case_7_Template, 21, 19, "div", 5)(8, MotDePasseOubliePage_Case_8_Template, 17, 9, "form", 4);
      __elementStart(9, "p", 6)(10, "a", 7);
      __text(11);
      __elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      __advance(3);
      __textInterpolate(ctx.t()("auth.forgot.title"));
      __advance(2);
      __textInterpolate(ctx.t()("auth.forgot.description"));
      __advance();
      __conditional((tmp_2_0 = ctx.step().name) === "email" ? 6 : tmp_2_0 === "code" ? 7 : tmp_2_0 === "password" ? 8 : -1);
      __advance(5);
      __textInterpolate1(" ", ctx.t()("auth.forgot.back"), " ");
    }
  },
  dependencies: [RouterLink],
  encapsulation: 2
}), _a);

export { MotDePasseOubliePage as default };
//# sourceMappingURL=mot-de-passe-oublie.page-DUJCY2CP.mjs.map

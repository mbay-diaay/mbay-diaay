import { i as inject, R as Router, ag as DestroyRef, D as DOCUMENT$1, c as computed, F as signal, ɵ as __defineComponent, d as RouterLink, f as __elementStart, b as __element, g as __text, h as __elementEnd, m as __repeaterCreate, j as __conditionalCreate, o as __advance, n as __property, q as __textInterpolate1, u as __attribute, p as __textInterpolate, v as __repeater, N as __textInterpolate2, r as __pureFunction1, t as __styleProp, s as __conditional, a2 as PLATFORM_ID, aa as input, af as output, W as viewChildren, e as effect, ac as afterNextRender, a4 as isPlatformBrowser, Z as __domElementStart, $ as __domElementEnd, z as __classProp, X as __viewQuerySignal, Y as __queryAdvance, V as __repeaterTrackByIdentity, L as __getCurrentView, H as __listener, w as __nextContext, a0 as __pureFunction3, aS as __domListener, aj as __domProperty, O as __restoreView, P as __resetView, a1 as __sanitizeUrl } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { _ as ShieldCheck, ae as RotateCw, af as Phone, ag as MailCheck, ah as Mail, ai as Lock, l as LoaderCircle, aj as Inbox, ak as EyeOff, E as Eye, al as ExternalLink, u as Clock, am as Check, A as ArrowRight, an as ArrowLeft, t as CircleAlert, e as LucideAngularModule, f as LucideAngularComponent } from './lucide-angular-RJABeBQ2.mjs';
import { S as SnackbarService, a as CRADESC, L as LOGIN_PHOTOS, b as BrandLogoComponent, c as SnackbarComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, aw as DEMO_MODE, aj as isApiMode } from './locale.service-c0QhtcVY.mjs';
import { D as DEMO_ACCOUNTS, c as DEMO_PASSWORD, a as authErrorMessage } from './auth-B3-o0LRT.mjs';
import { a as OTP_TTL_MS, n as normalizeEmail } from './policy-CKiWt4l5.mjs';
import { A as AuthService } from './auth.service-B7cg2Yei.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { t as PhotoSlideshowComponent } from './ui-DDO8FoUF.mjs';
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
import 'clsx';
import 'tailwind-merge';
import 'date-fns';
import 'date-fns/locale';

var _a, _b;
var _c0$1 = ["cell"];
function OtpInputComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __domElementStart(0, "input", 3, 0);
    __domListener("input", function OtpInputComponent_For_2_Template_input_input_0_listener($event) {
      const digitIndex_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.onCellInput(digitIndex_r2, $event));
    })("keydown", function OtpInputComponent_For_2_Template_input_keydown_0_listener($event) {
      const digitIndex_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.onCellKeydown(digitIndex_r2, $event));
    })("paste", function OtpInputComponent_For_2_Template_input_paste_0_listener($event) {
      __restoreView(_r1);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.onCellPaste($event));
    });
    __domElementEnd();
  }
  if (rf & 2) {
    const digitIndex_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __domProperty("disabled", ctx_r2.disabled())("value", ctx_r2.digits()[digitIndex_r2]);
    __attribute("id", digitIndex_r2 === 0 ? ctx_r2.fieldId() : null);
  }
}
var OtpInputComponent = (_a = class {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.fieldId = input("otp", ...[]);
    this.labelledBy = input(null, ...[]);
    this.value = input("", ...[]);
    this.length = input(6, ...[]);
    this.disabled = input(false, ...[]);
    this.valueChange = output();
    this.complete = output();
    this.cells = viewChildren("cell", ...[]);
    this.indices = computed(() => Array.from({ length: this.length() }, (_, i) => i), ...[]);
    this.digits = signal(emptySlots(6), ...[]);
    this._syncValueFromParent = effect(() => {
      const len = this.length();
      const normalized = this.value().replace(/\D/g, "").slice(0, len);
      if (normalized === this.digits().join("")) return;
      const next = emptySlots(len);
      for (let i = 0; i < normalized.length; i++) next[i] = normalized[i];
      this.digits.set(next);
    }, ...[]);
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      queueMicrotask(() => this.focusIndex(0));
    });
  }
  onCellInput(index, event) {
    const digit = event.target.value.replace(/\D/g, "").slice(-1);
    if (!digit) {
      this.updateSlot(index, "");
      this.emit();
      return;
    }
    this.updateSlot(index, digit);
    this.emit();
    if (index < this.length() - 1) this.focusIndex(index + 1);
    else {
      const code = this.digits().join("");
      if (code.length === this.length()) this.complete.emit(code);
    }
  }
  onCellKeydown(index, event) {
    if (event.key === "Backspace") {
      if (this.digits()[index]) {
        this.updateSlot(index, "");
        this.emit();
      } else if (index > 0) {
        this.focusIndex(index - 1);
        this.updateSlot(index - 1, "");
        this.emit();
      }
      event.preventDefault();
      return;
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      this.focusIndex(index - 1);
      return;
    }
    if (event.key === "ArrowRight" && index < this.length() - 1) {
      event.preventDefault();
      this.focusIndex(index + 1);
    }
  }
  onCellPaste(event) {
    var _a2, _b2;
    event.preventDefault();
    event.stopPropagation();
    const text = (_b2 = (_a2 = event.clipboardData) == null ? void 0 : _a2.getData("text")) != null ? _b2 : "";
    this.applyPastedDigits(text);
  }
  applyPastedDigits(raw) {
    const normalized = raw.replace(/\D/g, "").slice(0, this.length());
    if (!normalized) return;
    const next = emptySlots(this.length());
    for (let i = 0; i < normalized.length; i++) next[i] = normalized[i];
    this.digits.set(next);
    this.emit();
    const last = Math.min(normalized.length, this.length()) - 1;
    this.focusIndex(last >= 0 ? last : 0);
    if (normalized.length === this.length()) this.complete.emit(normalized);
  }
  updateSlot(index, char) {
    this.digits.update((d) => {
      const copy = [...d];
      copy[index] = char;
      return copy;
    });
  }
  emit() {
    this.valueChange.emit(this.digits().join(""));
  }
  focusIndex(i) {
    if (!isPlatformBrowser(this.platformId)) return;
    const ref = this.cells()[i];
    if (!ref) return;
    const el = ref.nativeElement;
    el.focus();
    el.select();
  }
}, _a.\u0275fac = function OtpInputComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-otp-input"]],
  viewQuery: function OtpInputComponent_Query(rf, ctx) {
    if (rf & 1) __viewQuerySignal(ctx.cells, _c0$1, 5);
    if (rf & 2) __queryAdvance();
  },
  hostAttrs: ["role", "group"],
  hostVars: 1,
  hostBindings: function OtpInputComponent_HostBindings(rf, ctx) {
    if (rf & 2) __attribute("aria-labelledby", ctx.labelledBy());
  },
  inputs: {
    fieldId: [1, "fieldId"],
    labelledBy: [1, "labelledBy"],
    value: [1, "value"],
    length: [1, "length"],
    disabled: [1, "disabled"]
  },
  outputs: {
    valueChange: "valueChange",
    complete: "complete"
  },
  decls: 3,
  vars: 2,
  consts: [
    ["cell", ""],
    [
      1,
      "flex",
      "justify-center",
      "gap-2",
      "max-[359px]:gap-1.5"
    ],
    [
      "type",
      "text",
      "inputmode",
      "numeric",
      "autocomplete",
      "one-time-code",
      "maxlength",
      "1",
      1,
      "size-12",
      "max-[359px]:size-10",
      "rounded-md",
      "border",
      "border-input",
      "bg-transparent",
      "text-center",
      "text-lg",
      "tabular",
      "shadow-sm",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      3,
      "disabled",
      "value"
    ],
    [
      "type",
      "text",
      "inputmode",
      "numeric",
      "autocomplete",
      "one-time-code",
      "maxlength",
      "1",
      1,
      "size-12",
      "max-[359px]:size-10",
      "rounded-md",
      "border",
      "border-input",
      "bg-transparent",
      "text-center",
      "text-lg",
      "tabular",
      "shadow-sm",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      3,
      "input",
      "keydown",
      "paste",
      "disabled",
      "value"
    ]
  ],
  template: function OtpInputComponent_Template(rf, ctx) {
    if (rf & 1) {
      __domElementStart(0, "div", 1);
      __repeaterCreate(1, OtpInputComponent_For_2_Template, 2, 3, "input", 2, __repeaterTrackByIdentity);
      __domElementEnd();
    }
    if (rf & 2) {
      __classProp("pointer-events-none", ctx.disabled());
      __advance();
      __repeater(ctx.indices());
    }
  },
  encapsulation: 2
}), _a);
function emptySlots(n) {
  return Array.from({ length: n }, () => "");
}
var _c0 = (a0) => ({
  current: a0,
  total: "02"
});
var _c1 = (a0, a1, a2) => ({
  length: a0,
  email: a1,
  minutes: a2
});
var _c2 = (a0) => ({ seconds: a0 });
var _c3 = (a0) => ({ to: a0 });
var _c4 = (a0) => ({ name: a0 });
var _forTrack0 = ($index, $item) => $item.email;
function LoginPage_For_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 46);
    __listener("click", function LoginPage_For_31_Template_button_click_0_listener() {
      const localeOption_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.localeService.setLocale(localeOption_r2));
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const localeOption_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __styleProp("background", ctx_r2.locale() === localeOption_r2 ? "var(--v2-foret)" : "transparent")("color", ctx_r2.locale() === localeOption_r2 ? "var(--v2-blanc)" : "var(--v2-ardoise)");
    __attribute("aria-checked", ctx_r2.locale() === localeOption_r2);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()(localeOption_r2 === "fr" ? "locale.fr" : "locale.wo"), " ");
  }
}
function LoginPage_Conditional_52_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 53);
    __element(1, "lucide-angular", 59);
    __elementStart(2, "div")(3, "div", 60);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 61);
    __text(6);
    __elementStart(7, "span", 62);
    __text(8);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const mail_r5 = ctx;
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("img", ctx_r2.icons.inbox)("size", 18);
    __advance(3);
    __textInterpolate1(" ", ctx_r2.t()("auth.mail.title"), " ");
    __advance(2);
    __textInterpolate2(" ", ctx_r2.t()("auth.mail.line", __pureFunction1(6, _c3, mail_r5.to)), " ", ctx_r2.t()("auth.mail.code"), " ");
    __advance(2);
    __textInterpolate(mail_r5.code);
  }
}
function LoginPage_Conditional_52_Template(rf, ctx) {
  var _a2, _b2;
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "h1", 47);
    __text(1);
    __elementEnd();
    __elementStart(2, "p", 48);
    __text(3);
    __elementEnd();
    __elementStart(4, "form", 49);
    __listener("submit", function LoginPage_Conditional_52_Template_form_submit_4_listener($event) {
      __restoreView(_r4);
      const ctx_r2 = __nextContext();
      $event.preventDefault();
      return __resetView(ctx_r2.submitOtp(ctx_r2.otpCode()));
    });
    __elementStart(5, "div", 50)(6, "label", 51);
    __text(7);
    __elementEnd();
    __elementStart(8, "app-otp-input", 52);
    __listener("valueChange", function LoginPage_Conditional_52_Template_app_otp_input_valueChange_8_listener($event) {
      __restoreView(_r4);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.onOtpValueChange($event));
    })("complete", function LoginPage_Conditional_52_Template_app_otp_input_complete_8_listener($event) {
      __restoreView(_r4);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.submitOtp($event));
    });
    __elementEnd()();
    __conditionalCreate(9, LoginPage_Conditional_52_Conditional_9_Template, 9, 8, "div", 53);
    __elementStart(10, "button", 54)(11, "span");
    __text(12);
    __elementEnd();
    __elementStart(13, "span", 55);
    __element(14, "lucide-angular", 19);
    __elementEnd()();
    __elementStart(15, "div", 56)(16, "button", 57);
    __listener("click", function LoginPage_Conditional_52_Template_button_click_16_listener() {
      __restoreView(_r4);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.resend());
    });
    __element(17, "lucide-angular", 19);
    __text(18);
    __elementEnd();
    __elementStart(19, "button", 58);
    __listener("click", function LoginPage_Conditional_52_Template_button_click_19_listener() {
      __restoreView(_r4);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.backToCredentials());
    });
    __element(20, "lucide-angular", 19);
    __text(21);
    __elementEnd()()();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r2 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("auth.otp.title"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("auth.otp.sent", __pureFunction3(19, _c1, ctx_r2.OTP_LENGTH, (_b2 = (_a2 = ctx_r2.sentInfo()) == null ? void 0 : _a2.maskedEmail) != null ? _b2 : "", ctx_r2.otpMinutes)), " ");
    __advance(4);
    __textInterpolate(ctx_r2.t()("auth.otp.code"));
    __advance();
    __property("value", ctx_r2.otpCode())("disabled", ctx_r2.otpBusy());
    __advance();
    __conditional((tmp_6_0 = ctx_r2.showDemoUi() && ctx_r2.demoMail()) ? 9 : -1, tmp_6_0);
    __advance();
    __property("disabled", ctx_r2.otpBusy() || ctx_r2.otpCode().length < ctx_r2.OTP_LENGTH);
    __advance(2);
    __textInterpolate(ctx_r2.otpBusy() ? ctx_r2.t()("auth.otp.verifying") : ctx_r2.t()("auth.otp.submit"));
    __advance(2);
    __classProp("animate-spin", ctx_r2.otpBusy());
    __property("img", ctx_r2.otpBusy() ? ctx_r2.icons.loader : ctx_r2.icons.arrowRight)("size", 22);
    __advance(2);
    __property("disabled", ctx_r2.otpBusy() || ctx_r2.resendWait() > 0);
    __advance();
    __property("img", ctx_r2.icons.resend)("size", 16);
    __advance();
    __textInterpolate1(" ", ctx_r2.resendWait() > 0 ? ctx_r2.t()("auth.otp.resendIn", __pureFunction1(23, _c2, ctx_r2.resendWait())) : ctx_r2.t()("auth.otp.resend"), " ");
    __advance(2);
    __property("img", ctx_r2.icons.arrowLeft)("size", 16);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("auth.otp.back"), " ");
  }
}
function LoginPage_Conditional_53_Conditional_29_For_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li")(1, "p");
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 76);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const link_r7 = ctx.$implicit;
    const ctx_r2 = __nextContext(3);
    __advance(2);
    __textInterpolate(ctx_r2.t()("auth.mail.invitationLine", __pureFunction1(2, _c3, link_r7.email)));
    __advance(2);
    __textInterpolate(ctx_r2.t()("auth.mail.invitationOpen", __pureFunction1(4, _c4, link_r7.name)));
  }
}
function LoginPage_Conditional_53_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 74)(1, "div", 60);
    __text(2);
    __elementEnd();
    __elementStart(3, "ul", 75);
    __repeaterCreate(4, LoginPage_Conditional_53_Conditional_29_For_5_Template, 5, 6, "li", null, _forTrack0);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("auth.mail.invitationTitle"), " ");
    __advance(2);
    __repeater(ctx_r2.invitationLinks());
  }
}
function LoginPage_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "h1", 47);
    __text(1);
    __elementEnd();
    __elementStart(2, "p", 48);
    __text(3);
    __elementEnd();
    __elementStart(4, "form", 63);
    __listener("submit", function LoginPage_Conditional_53_Template_form_submit_4_listener($event) {
      __restoreView(_r6);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.onCredentialsSubmit($event));
    });
    __elementStart(5, "div", 50)(6, "label", 64);
    __text(7);
    __elementEnd();
    __elementStart(8, "div", 65)(9, "span", 66);
    __element(10, "lucide-angular", 19);
    __elementEnd();
    __elementStart(11, "input", 67);
    __listener("input", function LoginPage_Conditional_53_Template_input_input_11_listener($event) {
      __restoreView(_r6);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.onEmailInput($event));
    });
    __elementEnd()()();
    __elementStart(12, "div", 50)(13, "div", 68)(14, "label", 69);
    __text(15);
    __elementEnd();
    __elementStart(16, "a", 70);
    __text(17);
    __elementEnd()();
    __elementStart(18, "div", 65)(19, "span", 66);
    __element(20, "lucide-angular", 19);
    __elementEnd();
    __elementStart(21, "input", 71);
    __listener("input", function LoginPage_Conditional_53_Template_input_input_21_listener($event) {
      __restoreView(_r6);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.onPasswordInput($event));
    });
    __elementEnd();
    __elementStart(22, "button", 72);
    __listener("click", function LoginPage_Conditional_53_Template_button_click_22_listener() {
      __restoreView(_r6);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.passwordVisible.set(!ctx_r2.passwordVisible()));
    });
    __element(23, "lucide-angular", 19);
    __elementEnd()()();
    __elementStart(24, "button", 73)(25, "span");
    __text(26);
    __elementEnd();
    __elementStart(27, "span", 55);
    __element(28, "lucide-angular", 19);
    __elementEnd()()();
    __conditionalCreate(29, LoginPage_Conditional_53_Conditional_29_Template, 6, 1, "div", 74);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("auth.login.title"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("auth.login.description"), " ");
    __advance(4);
    __textInterpolate(ctx_r2.t()("auth.login.email"));
    __advance(3);
    __property("img", ctx_r2.icons.mail)("size", 20);
    __advance();
    __property("placeholder", ctx_r2.t()("auth.login.emailPlaceholder"))("value", ctx_r2.email());
    __attribute("aria-invalid", ctx_r2.emailInvalid() || null);
    __advance(4);
    __textInterpolate(ctx_r2.t()("auth.login.password"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("auth.login.forgot"));
    __advance(3);
    __property("img", ctx_r2.icons.lock)("size", 20);
    __advance();
    __property("type", ctx_r2.passwordVisible() ? "text" : "password")("placeholder", ctx_r2.t()("auth.login.passwordPlaceholder"))("value", ctx_r2.password());
    __attribute("aria-invalid", ctx_r2.passwordInvalid() || null);
    __advance();
    __attribute("aria-label", ctx_r2.passwordVisible() ? ctx_r2.t()("auth.password.hide") : ctx_r2.t()("auth.password.show"))("aria-pressed", ctx_r2.passwordVisible());
    __advance();
    __property("img", ctx_r2.passwordVisible() ? ctx_r2.icons.eyeOff : ctx_r2.icons.eye)("size", 20);
    __advance();
    __property("disabled", ctx_r2.busy());
    __advance(2);
    __textInterpolate(ctx_r2.busy() ? ctx_r2.t()("auth.login.submitting") : ctx_r2.t()("auth.login.submit"));
    __advance(2);
    __classProp("animate-spin", ctx_r2.busy());
    __property("img", ctx_r2.busy() ? ctx_r2.icons.loader : ctx_r2.icons.arrowRight)("size", 22);
    __advance();
    __conditional(ctx_r2.invitationLinks().length > 0 ? 29 : -1);
  }
}
var LoginPage = (_b = class {
  constructor() {
    var _a2, _b2;
    this.auth = inject(AuthService);
    this.store = inject(StoreService);
    this.router = inject(Router);
    this.destroyRef = inject(DestroyRef);
    this.snackbar = inject(SnackbarService);
    this.document = inject(DOCUMENT$1);
    this.localeService = inject(LocaleService);
    this.cradesc = CRADESC;
    this.photos = LOGIN_PHOTOS;
    this.locales = ["fr", "wo"];
    this.icons = {
      alert: CircleAlert,
      arrowLeft: ArrowLeft,
      arrowRight: ArrowRight,
      check: Check,
      clock: Clock,
      external: ExternalLink,
      eye: Eye,
      eyeOff: EyeOff,
      inbox: Inbox,
      loader: LoaderCircle,
      lock: Lock,
      mail: Mail,
      mailCheck: MailCheck,
      phone: Phone,
      resend: RotateCw,
      shield: ShieldCheck
    };
    this.showDemoUi = () => DEMO_MODE && !isApiMode();
    this.OTP_LENGTH = 6;
    this.otpMinutes = Math.round(OTP_TTL_MS / 6e4);
    this.locale = this.localeService.locale;
    this.t = this.localeService.t;
    this.invitationLinks = computed(() => {
      this.store.state();
      return this.auth.pendingInvitationLinks();
    }, ...[]);
    this.step = signal({ name: "credentials" }, ...[]);
    this.demoAdmin = this.showDemoUi() ? DEMO_ACCOUNTS.find((a) => a.role === "admin") : void 0;
    this.email = signal((_b2 = (_a2 = this.demoAdmin) == null ? void 0 : _a2.email) != null ? _b2 : "", ...[]);
    this.password = signal(this.demoAdmin ? DEMO_PASSWORD : "", ...[]);
    this.passwordVisible = signal(false, ...[]);
    this.emailInvalid = signal(false, ...[]);
    this.passwordInvalid = signal(false, ...[]);
    this.busy = signal(false, ...[]);
    this.otpCode = signal("", ...[]);
    this.otpBusy = signal(false, ...[]);
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
    const interval = setInterval(() => this.now.set(Date.now()), 500);
    this.destroyRef.onDestroy(() => clearInterval(interval));
    const unsubscribe = this.auth.mailbox.subscribe(() => {
      this.demoMail.set(this.auth.mailbox.latest());
    });
    this.destroyRef.onDestroy(unsubscribe);
  }
  onEmailInput(event) {
    this.email.set(this.inputValue(event));
    if (this.emailInvalid() && normalizeEmail(this.email())) {
      this.emailInvalid.set(false);
      this.snackbar.dismiss();
    }
  }
  onPasswordInput(event) {
    this.password.set(this.inputValue(event));
    if (this.passwordInvalid() && this.password()) {
      this.passwordInvalid.set(false);
      this.snackbar.dismiss();
    }
  }
  /** Marque les champs fautifs, place le focus sur le premier et l'annonce. */
  validateCredentials() {
    const normalized = normalizeEmail(this.email());
    this.emailInvalid.set(!normalized);
    this.passwordInvalid.set(!this.password());
    if (!normalized) {
      this.focus("email");
      this.snackbar.error(this.t()("auth.login.errorEmail"));
      return null;
    }
    if (!this.password()) {
      this.focus("password");
      this.snackbar.error(this.t()("auth.login.errorPassword"));
      return null;
    }
    return normalized;
  }
  focus(id) {
    var _a2;
    (_a2 = this.document.getElementById(id)) == null ? void 0 : _a2.focus();
  }
  inputValue(event) {
    return event.target.value;
  }
  onOtpValueChange(value) {
    this.otpCode.set(value);
  }
  onCredentialsSubmit(event) {
    event.preventDefault();
    this.submitCredentials();
  }
  async submitCredentials() {
    if (this.busy()) return;
    const normalized = this.validateCredentials();
    if (!normalized) return;
    this.busy.set(true);
    this.snackbar.dismiss();
    try {
      const { challengeId, ...sent } = await this.auth.signIn(normalized, this.password());
      this.step.set({
        name: "code",
        challengeId,
        sent
      });
    } catch (e) {
      this.snackbar.error(authErrorMessage(e, this.t()));
    } finally {
      this.busy.set(false);
    }
  }
  async submitOtp(code) {
    const current = this.step();
    if (current.name !== "code" || this.otpBusy()) return;
    if (code.length < 6) {
      this.snackbar.error(this.t()("auth.otp.errorLength", { length: 6 }));
      return;
    }
    this.otpBusy.set(true);
    try {
      const user = await this.auth.verifyOtp(current.challengeId, code);
      this.store.actions.login(user.name, user.email, user.role);
      await this.router.navigate(["/dashboard", user.role]);
    } catch (e) {
      this.snackbar.error(authErrorMessage(e, this.t()));
      this.otpCode.set("");
    } finally {
      this.otpBusy.set(false);
    }
  }
  async resend() {
    const current = this.step();
    if (current.name !== "code") return;
    this.otpBusy.set(true);
    try {
      const next = await this.auth.resendOtp(current.challengeId);
      this.step.set({
        name: "code",
        challengeId: current.challengeId,
        sent: next
      });
      this.otpCode.set("");
      this.snackbar.success(this.t()("auth.otp.resent"));
    } catch (e) {
      this.snackbar.error(authErrorMessage(e, this.t()));
    } finally {
      this.otpBusy.set(false);
    }
  }
  backToCredentials() {
    this.snackbar.dismiss();
    this.step.set({ name: "credentials" });
    this.password.set(this.demoAdmin ? DEMO_PASSWORD : "");
    this.emailInvalid.set(false);
    this.passwordInvalid.set(false);
    this.otpCode.set("");
  }
}, _b.\u0275fac = function LoginPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _b)();
}, _b.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _b,
  selectors: [["app-login-page"]],
  decls: 70,
  vars: 47,
  consts: [
    [
      1,
      "charte-v2",
      "grid",
      "min-h-screen",
      "grid-cols-[minmax(0,1fr)]",
      "lg:h-screen",
      "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
      "lg:overflow-hidden"
    ],
    [
      1,
      "lg:left-[48.8%]",
      "lg:justify-start",
      "lg:pl-16",
      "lg:pr-[260px]",
      "lg:pt-[18px]"
    ],
    [
      1,
      "relative",
      "hidden",
      "overflow-hidden",
      "lg:sticky",
      "lg:top-0",
      "lg:flex",
      "lg:h-screen",
      "lg:flex-col",
      2,
      "background",
      "var(--v2-foret)",
      "color",
      "var(--v2-blanc)"
    ],
    [
      1,
      "absolute",
      "inset-0",
      3,
      "photos"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "pointer-events-none",
      "absolute",
      "inset-0",
      2,
      "background",
      "linear-gradient(180deg, color-mix(in oklab, var(--v2-foret) 88%, transparent) 0%, color-mix(in oklab, var(--v2-foret) 35%, transparent) 42%, color-mix(in oklab, var(--v2-foret) 70%, transparent) 68%, color-mix(in oklab, var(--v2-foret) 96%, transparent) 100%)"
    ],
    [
      1,
      "relative",
      "flex",
      "flex-1",
      "flex-col",
      "px-12",
      "py-10",
      "xl:px-16"
    ],
    [
      "variant",
      "inverse",
      3,
      "size"
    ],
    [1, "mt-auto"],
    [
      1,
      "max-w-[17em]",
      "text-[32px]",
      "font-extrabold",
      "leading-[1.08]",
      "tracking-[-0.03em]",
      "text-balance"
    ],
    [
      1,
      "mt-5",
      "flex",
      "max-w-xl",
      "gap-4"
    ],
    [
      1,
      "mt-[0.7em]",
      "h-[3px]",
      "w-10",
      "shrink-0",
      "rounded-full",
      2,
      "background",
      "var(--v2-citron)"
    ],
    [
      1,
      "text-[18px]",
      "font-bold",
      "leading-snug",
      "tracking-[-0.01em]",
      "text-balance",
      2,
      "color",
      "var(--v2-citron)"
    ],
    [
      "target",
      "_blank",
      "rel",
      "noopener noreferrer",
      1,
      "ghost",
      "mt-10",
      "flex",
      "max-w-md",
      "items-center",
      "gap-4",
      "rounded-[20px]",
      "p-3",
      "pr-5",
      2,
      "background",
      "var(--v2-blanc)",
      "color",
      "var(--v2-encre)",
      3,
      "href"
    ],
    [
      "width",
      "80",
      "height",
      "70",
      1,
      "h-16",
      "w-auto",
      "shrink-0",
      3,
      "src",
      "alt"
    ],
    [1, "min-w-0"],
    [
      1,
      "mono",
      "block",
      2,
      "color",
      "var(--v2-foret-clair)"
    ],
    [
      1,
      "block",
      "text-[20px]",
      "font-extrabold",
      "leading-tight",
      "tracking-[-0.02em]",
      2,
      "color",
      "var(--v2-terre)"
    ],
    [
      1,
      "block",
      "text-xs",
      "font-semibold",
      "leading-snug",
      2,
      "color",
      "var(--v2-ardoise)"
    ],
    [
      1,
      "link",
      "mt-1.5",
      "inline-flex",
      "items-center",
      "gap-1",
      "text-[13px]"
    ],
    [
      3,
      "img",
      "size"
    ],
    [
      1,
      "relative",
      "flex",
      "min-w-0",
      "flex-col",
      "px-6",
      "pb-[max(1.25rem,env(safe-area-inset-bottom))]",
      "pt-5",
      "sm:px-10",
      "lg:h-screen",
      "lg:overflow-y-auto",
      "lg:px-16",
      "lg:py-6"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "gap-3"
    ],
    [
      "variant",
      "color",
      1,
      "lg:invisible",
      3,
      "size"
    ],
    [
      "role",
      "radiogroup",
      1,
      "inline-flex",
      "gap-1",
      "rounded-[14px]",
      "border",
      "p-1",
      "text-[13px]",
      "font-bold",
      2,
      "border-color",
      "var(--v2-bord-carte)",
      "background",
      "var(--v2-blanc)"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "ghost",
      "rounded-[10px]",
      "px-3.5",
      "py-1.5",
      "transition-colors",
      3,
      "background",
      "color"
    ],
    [
      "target",
      "_blank",
      "rel",
      "noopener noreferrer",
      1,
      "ghost",
      "mt-5",
      "flex",
      "items-center",
      "gap-3",
      "rounded-[20px]",
      "border",
      "p-3",
      "lg:hidden",
      2,
      "border-color",
      "var(--v2-bord-carte)",
      "background",
      "var(--v2-blanc)",
      3,
      "href"
    ],
    [
      "alt",
      "",
      "width",
      "60",
      "height",
      "52",
      1,
      "h-11",
      "w-auto",
      "shrink-0",
      3,
      "src"
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
      "text-[15px]",
      "font-extrabold",
      2,
      "color",
      "var(--v2-terre)"
    ],
    [
      1,
      "block",
      "truncate",
      "text-xs",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "link",
      "mt-0.5",
      "inline-flex",
      "items-center",
      "gap-1",
      "text-xs"
    ],
    [
      1,
      "flex",
      "flex-1",
      "items-start",
      "justify-center",
      "py-8",
      "lg:items-center",
      "lg:py-4"
    ],
    [
      1,
      "form-col",
      "w-full",
      "max-w-[480px]"
    ],
    [
      1,
      "mono",
      "inline-flex",
      "items-center",
      "gap-1.5",
      "whitespace-nowrap",
      "rounded-full",
      "px-3",
      "py-1.5",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-foret)"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "mt-3",
      "flex",
      "max-w-[200px]",
      "gap-1.5"
    ],
    [
      1,
      "h-1",
      "flex-1",
      "rounded-full",
      2,
      "background",
      "var(--v2-foret)"
    ],
    [
      1,
      "h-1",
      "flex-1",
      "rounded-full",
      "transition-colors"
    ],
    [
      1,
      "help",
      "mt-8",
      "flex",
      "items-center",
      "gap-4",
      "border-t",
      "pt-6",
      2,
      "border-color",
      "var(--v2-bord-carte)"
    ],
    [
      1,
      "grid",
      "size-12",
      "shrink-0",
      "place-items-center",
      "rounded-[14px]",
      "border",
      2,
      "border-color",
      "var(--v2-bord-carte)",
      "background",
      "var(--v2-blanc)"
    ],
    [
      "alt",
      "",
      "width",
      "40",
      "height",
      "34",
      1,
      "h-8",
      "w-auto",
      3,
      "src"
    ],
    [
      1,
      "min-w-0",
      "text-[15px]"
    ],
    [1, "font-bold"],
    [
      1,
      "mt-0.5",
      "flex",
      "flex-wrap",
      "gap-x-4",
      "gap-y-1"
    ],
    [
      1,
      "link",
      "inline-flex",
      "items-center",
      "gap-1.5",
      3,
      "href"
    ],
    [
      1,
      "link",
      "inline-flex",
      "items-center",
      "gap-1.5",
      "tabular-nums",
      3,
      "href"
    ],
    [
      1,
      "session-note",
      "flex",
      "items-center",
      "justify-center",
      "gap-1.5",
      "text-xs",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "ghost",
      "rounded-[10px]",
      "px-3.5",
      "py-1.5",
      "transition-colors",
      3,
      "click"
    ],
    [
      "id",
      "auth-title",
      1,
      "mt-7",
      "text-[32px]",
      "font-extrabold",
      "leading-[1.05]",
      "tracking-[-0.03em]",
      "lg:text-[40px]"
    ],
    [
      1,
      "mt-3",
      "text-base",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "mt-8",
      "space-y-5",
      3,
      "submit"
    ],
    [1, "space-y-2.5"],
    [
      "id",
      "otp-label",
      "for",
      "otp",
      1,
      "label"
    ],
    [
      "fieldId",
      "otp",
      "labelledBy",
      "otp-label",
      3,
      "valueChange",
      "complete",
      "value",
      "disabled"
    ],
    [
      "role",
      "status",
      1,
      "flex",
      "gap-3",
      "rounded-[16px]",
      "border-2",
      "border-dashed",
      "p-3.5",
      "text-sm",
      2,
      "border-color",
      "var(--v2-gris-trait)",
      "background",
      "var(--v2-blanc)"
    ],
    [
      "type",
      "submit",
      1,
      "btn-primary",
      3,
      "disabled"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "btn-chip"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "justify-between",
      "gap-3",
      "text-[15px]"
    ],
    [
      "type",
      "button",
      1,
      "link",
      "inline-flex",
      "items-center",
      "gap-1.5",
      "disabled:cursor-not-allowed",
      "disabled:no-underline",
      "disabled:opacity-60",
      3,
      "click",
      "disabled"
    ],
    [
      "type",
      "button",
      1,
      "ghost",
      "inline-flex",
      "items-center",
      "gap-1.5",
      "font-semibold",
      2,
      "color",
      "var(--v2-gris-texte)",
      3,
      "click"
    ],
    [
      1,
      "mt-0.5",
      "shrink-0",
      2,
      "color",
      "var(--v2-gris-texte)",
      3,
      "img",
      "size"
    ],
    [
      1,
      "mono",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "mt-1",
      "font-medium"
    ],
    [
      1,
      "font-bold",
      "tracking-[0.2em]",
      2,
      "font-family",
      "var(--v2-font-mono)"
    ],
    [
      "novalidate",
      "",
      1,
      "mt-8",
      "space-y-5",
      3,
      "submit"
    ],
    [
      "for",
      "email",
      1,
      "label"
    ],
    [1, "relative"],
    [
      "aria-hidden",
      "true",
      1,
      "pointer-events-none",
      "absolute",
      "inset-y-0",
      "left-0",
      "grid",
      "w-14",
      "place-items-center",
      2,
      "color",
      "var(--v2-gris-texte)"
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
      "field",
      3,
      "input",
      "placeholder",
      "value"
    ],
    [
      1,
      "flex",
      "items-baseline",
      "justify-between",
      "gap-2"
    ],
    [
      "for",
      "password",
      1,
      "label"
    ],
    [
      "routerLink",
      "/mot-de-passe-oublie",
      1,
      "link",
      "text-sm"
    ],
    [
      "id",
      "password",
      "autocomplete",
      "current-password",
      "spellcheck",
      "false",
      "autocapitalize",
      "none",
      1,
      "field",
      "pr-16",
      3,
      "input",
      "type",
      "placeholder",
      "value"
    ],
    [
      "type",
      "button",
      1,
      "ghost",
      "absolute",
      "right-2",
      "top-1/2",
      "grid",
      "size-12",
      "-translate-y-1/2",
      "place-items-center",
      "rounded-[14px]",
      "transition-colors",
      "hover:bg-[var(--v2-sauge)]",
      2,
      "color",
      "var(--v2-ardoise)",
      3,
      "click"
    ],
    [
      "type",
      "submit",
      1,
      "btn-primary",
      "!mt-7",
      3,
      "disabled"
    ],
    [
      "role",
      "status",
      1,
      "mt-5",
      "rounded-[16px]",
      "border-2",
      "border-dashed",
      "p-3.5",
      "text-sm",
      2,
      "border-color",
      "var(--v2-gris-trait)",
      "background",
      "var(--v2-blanc)"
    ],
    [
      1,
      "mt-1",
      "space-y-2"
    ],
    [
      1,
      "font-bold",
      2,
      "color",
      "var(--v2-foret-clair)"
    ]
  ],
  template: function LoginPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "div", 0);
      __element(1, "ui-snackbar", 1);
      __elementStart(2, "aside", 2);
      __element(3, "ui-photo-slideshow", 3)(4, "div", 4);
      __elementStart(5, "div", 5);
      __element(6, "ui-brand-logo", 6);
      __elementStart(7, "div", 7)(8, "p", 8);
      __text(9);
      __elementEnd();
      __elementStart(10, "div", 9);
      __element(11, "span", 10);
      __elementStart(12, "p", 11);
      __text(13);
      __elementEnd()();
      __elementStart(14, "a", 12);
      __element(15, "img", 13);
      __elementStart(16, "span", 14)(17, "span", 15);
      __text(18);
      __elementEnd();
      __elementStart(19, "span", 16);
      __text(20);
      __elementEnd();
      __elementStart(21, "span", 17);
      __text(22);
      __elementEnd();
      __elementStart(23, "span", 18);
      __text(24);
      __element(25, "lucide-angular", 19);
      __elementEnd()()()()()();
      __elementStart(26, "main", 20)(27, "header", 21);
      __element(28, "ui-brand-logo", 22);
      __elementStart(29, "div", 23);
      __repeaterCreate(30, LoginPage_For_31_Template, 2, 6, "button", 24, __repeaterTrackByIdentity);
      __elementEnd()();
      __elementStart(32, "a", 25);
      __element(33, "img", 26);
      __elementStart(34, "span", 14)(35, "span", 27);
      __text(36);
      __elementEnd();
      __elementStart(37, "span", 28);
      __text(38);
      __elementEnd();
      __elementStart(39, "span", 29);
      __text(40);
      __elementEnd();
      __elementStart(41, "span", 30);
      __text(42);
      __element(43, "lucide-angular", 19);
      __elementEnd()()();
      __elementStart(44, "div", 31)(45, "div", 32)(46, "span", 33);
      __element(47, "lucide-angular", 19);
      __text(48);
      __elementEnd();
      __elementStart(49, "div", 34);
      __element(50, "span", 35)(51, "span", 36);
      __elementEnd();
      __conditionalCreate(52, LoginPage_Conditional_52_Template, 22, 25)(53, LoginPage_Conditional_53_Template, 30, 27);
      __elementStart(54, "div", 37)(55, "span", 38);
      __element(56, "img", 39);
      __elementEnd();
      __elementStart(57, "div", 40)(58, "p", 41);
      __text(59);
      __elementEnd();
      __elementStart(60, "div", 42)(61, "a", 43);
      __element(62, "lucide-angular", 19);
      __text(63);
      __elementEnd();
      __elementStart(64, "a", 44);
      __element(65, "lucide-angular", 19);
      __text(66);
      __elementEnd()()()()()();
      __elementStart(67, "p", 45);
      __element(68, "lucide-angular", 19);
      __text(69);
      __elementEnd()()();
    }
    if (rf & 2) {
      __advance(3);
      __property("photos", ctx.photos);
      __advance(3);
      __property("size", 56);
      __advance(3);
      __textInterpolate1(" ", ctx.t()("auth.layout.headline"), " ");
      __advance(4);
      __textInterpolate1(" ", ctx.t()("auth.layout.lead"), " ");
      __advance();
      __property("href", ctx.cradesc.url, __sanitizeUrl);
      __attribute("aria-label", ctx.t()("auth.cradesc.visit"));
      __advance();
      __property("src", ctx.cradesc.emblem)("alt", ctx.t()("auth.cradesc.logoAlt"));
      __advance(3);
      __textInterpolate(ctx.t()("auth.cradesc.carriedBy"));
      __advance(2);
      __textInterpolate(ctx.cradesc.acronym);
      __advance(2);
      __textInterpolate(ctx.t()("auth.cradesc.fullName"));
      __advance(2);
      __textInterpolate1(" ", ctx.cradesc.urlLabel, " ");
      __advance();
      __property("img", ctx.icons.external)("size", 13);
      __advance(3);
      __property("size", 40);
      __advance();
      __attribute("aria-label", ctx.t()("locale.fr") + " / " + ctx.t()("locale.wo"));
      __advance();
      __repeater(ctx.locales);
      __advance(2);
      __property("href", ctx.cradesc.url, __sanitizeUrl);
      __attribute("aria-label", ctx.t()("auth.cradesc.visit"));
      __advance();
      __property("src", ctx.cradesc.emblem);
      __advance(3);
      __textInterpolate(ctx.t()("auth.cradesc.carriedBy"));
      __advance(2);
      __textInterpolate(ctx.cradesc.acronym);
      __advance(2);
      __textInterpolate(ctx.t()("auth.cradesc.fullName"));
      __advance(2);
      __textInterpolate(ctx.cradesc.urlLabel);
      __advance();
      __property("img", ctx.icons.external)("size", 12);
      __advance(4);
      __property("img", ctx.icons.shield)("size", 14);
      __advance();
      __textInterpolate2(" ", ctx.t()("auth.step.progress", __pureFunction1(45, _c0, ctx.step().name === "code" ? "02" : "01")), " \xB7 ", ctx.step().name === "code" ? ctx.t()("auth.step.code") : ctx.t()("auth.step.credentials"), " ");
      __advance(3);
      __styleProp("background", ctx.step().name === "code" ? "var(--v2-foret)" : "var(--v2-lin)");
      __advance();
      __conditional(ctx.step().name === "code" ? 52 : 53);
      __advance(4);
      __property("src", ctx.cradesc.emblem);
      __advance(3);
      __textInterpolate(ctx.t()("auth.help.title"));
      __advance(2);
      __property("href", "mailto:" + ctx.cradesc.email, __sanitizeUrl);
      __advance();
      __property("img", ctx.icons.mail)("size", 15);
      __advance();
      __textInterpolate1("", ctx.cradesc.email, " ");
      __advance();
      __property("href", "tel:" + ctx.cradesc.phoneHref, __sanitizeUrl);
      __advance();
      __property("img", ctx.icons.phone)("size", 15);
      __advance();
      __textInterpolate1("", ctx.cradesc.phone, " ");
      __advance(2);
      __property("img", ctx.icons.clock)("size", 14);
      __advance();
      __textInterpolate1(" ", ctx.t()("auth.login.footer"), " ");
    }
  },
  dependencies: [
    OtpInputComponent,
    RouterLink,
    LucideAngularModule,
    LucideAngularComponent,
    BrandLogoComponent,
    SnackbarComponent,
    PhotoSlideshowComponent
  ],
  styles: ['\n    button[_ngcontent-%COMP%]:not(:disabled), \n   a[href][_ngcontent-%COMP%], \n   [role="radio"][_ngcontent-%COMP%] {\n      cursor: pointer;\n    }\n    button[_ngcontent-%COMP%]:disabled {\n      cursor: not-allowed;\n    }\n    .mono[_ngcontent-%COMP%] {\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .label[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0.06em;\n      text-transform: uppercase;\n      color: var(--%NS%v2-ardoise);\n    }\n    .field[_ngcontent-%COMP%] {\n      height: 60px;\n      width: 100%;\n      border-radius: var(--%NS%v2-radius-champ);\n      \n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      padding-left: 56px;\n      padding-right: 16px;\n      font-size: 16px;\n      font-weight: 500;\n      color: var(--%NS%v2-encre);\n      transition:\n        border-color 0.15s ease,\n        box-shadow 0.15s ease;\n    }\n    @media (max-width: 420px) {\n      [_nghost-%COMP%]     app-otp-input input {\n        width: 46px;\n        height: 58px;\n      }\n    }\n    \n    @media (min-width: 1024px) and (max-height: 820px) {\n      .form-col[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n        margin-top: 1rem;\n        font-size: 34px;\n      }\n      .form-col[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n        margin-top: 1.25rem;\n      }\n      .form-col[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {\n        margin-top: 0.875rem;\n      }\n      .form-col[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] {\n        height: 54px;\n      }\n      .form-col[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n        height: 58px;\n        margin-top: 1.125rem !important;\n      }\n      .form-col[_ngcontent-%COMP%]   .help[_ngcontent-%COMP%] {\n        margin-top: 1.25rem;\n        padding-top: 1rem;\n      }\n      .session-note[_ngcontent-%COMP%] {\n        display: none;\n      }\n    }\n    .field[_ngcontent-%COMP%]::placeholder {\n      color: var(--%NS%v2-gris-texte);\n      opacity: 0.75;\n      font-weight: 500;\n    }\n    .field[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-texte);\n    }\n    .field[_ngcontent-%COMP%]:focus-visible {\n      outline: none;\n      border: 2px solid var(--%NS%v2-foret);\n      padding-left: 55.5px;\n      box-shadow: var(--%NS%v2-halo);\n    }\n    .field[aria-invalid="true"][_ngcontent-%COMP%] {\n      border: 2px solid var(--%NS%v2-erreur-fg);\n      padding-left: 55.5px;\n    }\n    .btn-primary[_ngcontent-%COMP%] {\n      display: flex;\n      height: 64px;\n      width: 100%;\n      align-items: center;\n      justify-content: space-between;\n      gap: 12px;\n      border-radius: var(--%NS%v2-radius-champ);\n      background: var(--%NS%v2-foret);\n      padding: 0 8px 0 24px;\n      font-size: 17px;\n      font-weight: 800;\n      color: var(--%NS%v2-blanc);\n      transition: background-color 0.15s ease;\n    }\n    .btn-primary[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-foret-clair);\n    }\n    .btn-primary[_ngcontent-%COMP%]:focus-visible {\n      outline: none;\n      box-shadow: var(--%NS%v2-halo);\n    }\n    .btn-primary[_ngcontent-%COMP%]:disabled {\n      background: var(--%NS%v2-lin);\n      color: var(--%NS%v2-gris-texte);\n      pointer-events: none;\n    }\n    .btn-chip[_ngcontent-%COMP%] {\n      display: grid;\n      height: 48px;\n      width: 48px;\n      place-items: center;\n      border-radius: 14px;\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n    }\n    .btn-primary[_ngcontent-%COMP%]:disabled   .btn-chip[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-gris-trait);\n      color: var(--%NS%v2-blanc);\n    }\n    .link[_ngcontent-%COMP%] {\n      font-weight: 700;\n      color: var(--%NS%v2-foret-clair);\n      text-underline-offset: 3px;\n    }\n    .link[_ngcontent-%COMP%]:hover {\n      text-decoration: underline;\n    }\n    .link[_ngcontent-%COMP%]:focus-visible, \n   .ghost[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n      border-radius: 6px;\n    }\n    [_nghost-%COMP%]     app-otp-input input {\n      height: 64px;\n      width: 56px;\n      border-radius: 16px;\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 20px;\n      font-weight: 700;\n      color: var(--%NS%v2-encre);\n      box-shadow: none;\n    }\n    [_nghost-%COMP%]     app-otp-input input:focus-visible {\n      outline: none;\n      border: 2px solid var(--%NS%v2-foret);\n      box-shadow: var(--%NS%v2-halo);\n    }\n    @media (max-width: 359px) {\n      [_nghost-%COMP%]     app-otp-input input {\n        width: 42px;\n        height: 56px;\n      }\n    }']
}), _b);

export { LoginPage as default };
//# sourceMappingURL=login.page-BW-3JvvY.mjs.map

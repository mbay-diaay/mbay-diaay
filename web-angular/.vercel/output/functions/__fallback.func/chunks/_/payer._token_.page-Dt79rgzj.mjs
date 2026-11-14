import { a as CRADESC, P as PAYMENT_PHOTO, b as BrandLogoComponent, I as IconComponent, N as NgTemplateOutlet } from './snackbar.component-sjBBVJT0.mjs';
import { i as inject, F as signal, A as ActivatedRoute, c as computed, ɵ as __defineComponent, f as __elementStart, b as __element, g as __text, h as __elementEnd, B as __elementContainer, j as __conditionalCreate, y as __template, C as __reference, o as __advance, t as __styleProp, n as __property, p as __textInterpolate, x as __pureFunction2, u as __attribute, s as __conditional, w as __nextContext, N as __textInterpolate2, r as __pureFunction1, q as __textInterpolate1, m as __repeaterCreate, V as __repeaterTrackByIdentity, v as __repeater, L as __getCurrentView, H as __listener, z as __classProp, O as __restoreView, P as __resetView, E as __templateRefExtractor, a1 as __sanitizeUrl } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { L as LocaleService, j as nf } from './locale.service-c0QhtcVY.mjs';
import { P as PAYMENT_CHANNELS } from './payment-provider-9TEL3wMl.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import './lucide-angular-RJABeBQ2.mjs';
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

var _a;
var _c0 = (a0, a1) => ({
  author: a0,
  license: a1
});
var _c1 = (a0) => ({ period: a0 });
var _c2 = (a0) => ({ scoop: a0 });
var _c3 = (a0, a1) => ({
  amount: a0,
  channel: a1
});
var _c4 = (a0) => ({ receipt: a0 });
var _c5 = (a0) => ({ date: a0 });
var _forTrack0 = ($index, $item) => $item.id;
function PayerPage_Conditional_51_Conditional_3_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 58);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const shown_r2 = __nextContext(2);
    __advance();
    __textInterpolate(shown_r2.phone);
  }
}
function PayerPage_Conditional_51_Conditional_3_For_26_For_3_Template(rf, ctx) {
  if (rf & 1) __element(0, "img", 22);
  if (rf & 2) {
    const logo_r6 = ctx.$implicit;
    const channel_r4 = __nextContext().$implicit;
    __classProp("wordmark", channel_r4.wordmark)("card", channel_r4.id === "carte");
    __property("src", logo_r6);
  }
}
function PayerPage_Conditional_51_Conditional_3_For_26_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 73);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const channel_r4 = __nextContext().$implicit;
    const ctx_r4 = __nextContext(3);
    __advance();
    __textInterpolate(channel_r4.id === "carte" ? ctx_r4.t()("pay.card") : channel_r4.label);
  }
}
function PayerPage_Conditional_51_Conditional_3_For_26_Conditional_6_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 75);
  if (rf & 2) __property("size", 13);
}
function PayerPage_Conditional_51_Conditional_3_For_26_Template(rf, ctx) {
  var _a2, _b, _c;
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "button", 70);
    __listener("click", function PayerPage_Conditional_51_Conditional_3_For_26_Template_button_click_0_listener() {
      const channel_r4 = __restoreView(_r3).$implicit;
      const ctx_r4 = __nextContext(3);
      return __resetView(ctx_r4.pick(channel_r4));
    });
    __elementStart(1, "span", 71);
    __repeaterCreate(2, PayerPage_Conditional_51_Conditional_3_For_26_For_3_Template, 1, 5, "img", 72, __repeaterTrackByIdentity);
    __elementEnd();
    __conditionalCreate(4, PayerPage_Conditional_51_Conditional_3_For_26_Conditional_4_Template, 2, 1, "span", 73);
    __elementStart(5, "span", 74);
    __conditionalCreate(6, PayerPage_Conditional_51_Conditional_3_For_26_Conditional_6_Template, 1, 1, "ui-icon", 75);
    __elementEnd()();
  }
  if (rf & 2) {
    const channel_r4 = ctx.$implicit;
    const ctx_r4 = __nextContext(3);
    __classProp("on", ((_a2 = ctx_r4.picked()) == null ? void 0 : _a2.id) === channel_r4.id);
    __attribute("aria-checked", ((_b = ctx_r4.picked()) == null ? void 0 : _b.id) === channel_r4.id)("aria-label", channel_r4.label);
    __advance(2);
    __repeater(channel_r4.logos);
    __advance(2);
    __conditional(!channel_r4.wordmark ? 4 : -1);
    __advance(2);
    __conditional(((_c = ctx_r4.picked()) == null ? void 0 : _c.id) === channel_r4.id ? 6 : -1);
  }
}
function PayerPage_Conditional_51_Conditional_3_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 69);
    __element(1, "ui-icon", 76);
    __elementStart(2, "span")(3, "strong");
    __text(4);
    __elementEnd();
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = __nextContext(3);
    __advance();
    __property("size", 18);
    __advance(3);
    __textInterpolate1("", ctx_r4.t()("pay.notConfigured.title"), ".");
    __advance();
    __textInterpolate1(" ", ctx_r4.t()("pay.notConfigured"));
  }
}
function PayerPage_Conditional_51_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "h1", 50);
    __text(1);
    __elementEnd();
    __elementStart(2, "p", 51);
    __text(3);
    __elementEnd();
    __elementStart(4, "div", 52)(5, "div", 53)(6, "span", 54);
    __element(7, "ui-icon", 55);
    __elementEnd();
    __elementStart(8, "span", 15)(9, "span", 56);
    __text(10);
    __elementEnd();
    __elementStart(11, "span", 57);
    __text(12);
    __elementEnd();
    __conditionalCreate(13, PayerPage_Conditional_51_Conditional_3_Conditional_13_Template, 2, 1, "span", 58);
    __elementEnd()();
    __elementStart(14, "div", 53)(15, "span", 54);
    __element(16, "ui-icon", 59);
    __elementEnd();
    __elementStart(17, "span", 60)(18, "span", 56);
    __text(19);
    __elementEnd();
    __elementStart(20, "span", 61);
    __text(21);
    __elementEnd()()()();
    __elementStart(22, "p", 62);
    __text(23);
    __elementEnd();
    __elementStart(24, "div", 63);
    __repeaterCreate(25, PayerPage_Conditional_51_Conditional_3_For_26_Template, 7, 6, "button", 64, _forTrack0);
    __elementEnd();
    __elementStart(27, "button", 65);
    __listener("click", function PayerPage_Conditional_51_Conditional_3_Template_button_click_27_listener() {
      __restoreView(_r1);
      const ctx_r4 = __nextContext(2);
      return __resetView(ctx_r4.pay());
    });
    __elementStart(28, "span", 66);
    __text(29);
    __elementEnd();
    __elementStart(30, "span", 67);
    __element(31, "ui-icon", 68);
    __elementEnd()();
    __conditionalCreate(32, PayerPage_Conditional_51_Conditional_3_Conditional_32_Template, 6, 3, "p", 69);
  }
  if (rf & 2) {
    const shown_r2 = __nextContext();
    const ctx_r4 = __nextContext();
    __advance();
    __textInterpolate(ctx_r4.t()("pay.title"));
    __advance(2);
    __textInterpolate(ctx_r4.t()("pay.lead", __pureFunction1(14, _c2, shown_r2.scoop)));
    __advance(4);
    __property("size", 20);
    __advance(3);
    __textInterpolate(ctx_r4.t()("pay.member"));
    __advance(2);
    __textInterpolate(shown_r2.fullName);
    __advance();
    __conditional(shown_r2.phone ? 13 : -1);
    __advance(3);
    __property("size", 20);
    __advance(3);
    __textInterpolate(ctx_r4.t()("pay.amount"));
    __advance(2);
    __textInterpolate1("", ctx_r4.nf.format(shown_r2.amount), " FCFA");
    __advance(2);
    __textInterpolate(ctx_r4.t()("pay.method"));
    __advance(2);
    __repeater(ctx_r4.channels);
    __advance(2);
    __property("disabled", !ctx_r4.picked());
    __advance(2);
    __textInterpolate(ctx_r4.picked() ? ctx_r4.t()("pay.payWith", __pureFunction2(16, _c3, ctx_r4.nf.format(shown_r2.amount), ctx_r4.picked().label)) : ctx_r4.t()("pay.choose"));
    __advance(2);
    __property("size", 20);
    __advance();
    __conditional(ctx_r4.notConfigured() ? 32 : -1);
  }
}
function PayerPage_Conditional_51_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "h1", 50);
    __text(1);
    __elementEnd();
    __elementStart(2, "p", 77);
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const shown_r2 = __nextContext();
    const ctx_r4 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r4.t()(shown_r2.status === "pay\xE9" ? "pay.paid.title" : shown_r2.expired ? "pay.expired.title" : "pay.cancelled.title"), " ");
    __advance(2);
    __textInterpolate1(" ", shown_r2.status === "pay\xE9" ? ctx_r4.t()("pay.done", __pureFunction1(2, _c4, ctx_r4.receipt())) : ctx_r4.t()(shown_r2.expired ? "pay.expired" : "pay.cancelled"), " ");
  }
}
function PayerPage_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 48);
    __element(1, "ui-icon", 49);
    __text(2);
    __elementEnd();
    __conditionalCreate(3, PayerPage_Conditional_51_Conditional_3_Template, 33, 19)(4, PayerPage_Conditional_51_Conditional_4_Template, 4, 4);
  }
  if (rf & 2) {
    const shown_r2 = ctx;
    const ctx_r4 = __nextContext();
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate2("", ctx_r4.t()("pay.eyebrowPeriod", __pureFunction1(4, _c1, shown_r2.period)), " \xB7 ", ctx_r4.t()("pay.secureShort"), " ");
    __advance();
    __conditional(shown_r2.payable ? 3 : 4);
  }
}
function PayerPage_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "h1", 78);
    __text(1);
    __elementEnd();
    __elementStart(2, "p", 77);
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = __nextContext();
    __advance();
    __textInterpolate(ctx_r4.t()("pay.notFound.title"));
    __advance(2);
    __textInterpolate(ctx_r4.t()("pay.notFound.text"));
  }
}
function PayerPage_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 47);
    __element(1, "ui-icon", 79);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = __nextContext();
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate1("", ctx_r4.t()("pay.validUntil", __pureFunction1(2, _c5, ctx_r4.view().expires)), " ");
  }
}
function PayerPage_ng_template_67_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "button", 82);
    __listener("click", function PayerPage_ng_template_67_For_2_Template_button_click_0_listener() {
      const localeOption_r8 = __restoreView(_r7).$implicit;
      const ctx_r4 = __nextContext(2);
      return __resetView(ctx_r4.localeService.setLocale(localeOption_r8));
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const localeOption_r8 = ctx.$implicit;
    const ctx_r4 = __nextContext(2);
    __styleProp("background", ctx_r4.localeService.locale() === localeOption_r8 ? "var(--v2-foret)" : "transparent")("color", ctx_r4.localeService.locale() === localeOption_r8 ? "var(--v2-blanc)" : "var(--v2-ardoise)");
    __attribute("aria-checked", ctx_r4.localeService.locale() === localeOption_r8);
    __advance();
    __textInterpolate1(" ", ctx_r4.t()(localeOption_r8 === "fr" ? "locale.fr" : "locale.wo"), " ");
  }
}
function PayerPage_ng_template_67_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 80);
    __repeaterCreate(1, PayerPage_ng_template_67_For_2_Template, 2, 6, "button", 81, __repeaterTrackByIdentity);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = __nextContext();
    __attribute("aria-label", ctx_r4.t()("locale.fr") + " / " + ctx_r4.t()("locale.wo"));
    __advance();
    __repeater(ctx_r4.locales);
  }
}
var PayerPage = (_a = class {
  constructor() {
    var _a2;
    this.store = inject(StoreService);
    this.localeService = inject(LocaleService);
    this.t = this.localeService.t;
    this.nf = nf;
    this.cradesc = CRADESC;
    this.photo = PAYMENT_PHOTO;
    this.locales = ["fr", "wo"];
    this.channels = PAYMENT_CHANNELS;
    this.picked = signal(null, ...[]);
    this.notConfigured = signal(false, ...[]);
    this.token = (_a2 = inject(ActivatedRoute).snapshot.paramMap.get("token")) != null ? _a2 : "";
    this.link = computed(() => {
      var _a3;
      return (_a3 = this.store.state().paymentLinks.find((candidate) => candidate.token === this.token)) != null ? _a3 : null;
    }, ...[]);
    this.view = computed(() => {
      var _a3, _b, _c;
      const link = this.link();
      if (!link) return null;
      const state = this.store.state();
      const member = state.members.find((candidate) => candidate.id === link.memberId);
      const expired = link.status === "en attente" && Date.parse(link.expiresAt) < Date.now();
      return {
        amount: link.amount,
        period: link.period,
        status: link.status,
        expired,
        payable: link.status === "en attente" && !expired,
        scoop: (_b = (_a3 = state.scoops.find((scoop) => scoop.id === link.scoopId)) == null ? void 0 : _a3.name) != null ? _b : "",
        fullName: member ? `${member.firstName} ${member.lastName}` : "",
        phone: (_c = member == null ? void 0 : member.phone) != null ? _c : "",
        expires: this.localeService.formatDate(link.expiresAt, {
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      };
    }, ...[]);
    this.receipt = computed(() => {
      var _a3, _b;
      const link = this.link();
      return (_b = (_a3 = this.store.state().payments.find((payment) => payment.id === (link == null ? void 0 : link.paymentId))) == null ? void 0 : _a3.receipt) != null ? _b : "";
    }, ...[]);
  }
  pick(channel) {
    this.picked.set(channel);
    this.notConfigured.set(false);
  }
  /** Le moyen choisi n'est pas configuré tant que l'agrégateur n'est pas relié côté serveur : on ne fait jamais semblant de payer. */
  pay() {
    this.notConfigured.set(true);
  }
}, _a.\u0275fac = function PayerPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-payer-page"]],
  decls: 69,
  vars: 47,
  consts: [
    ["localeSwitch", ""],
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
      "alt",
      "",
      1,
      "absolute",
      "inset-0",
      "h-full",
      "w-full",
      "object-cover",
      3,
      "src"
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
    [
      "target",
      "_blank",
      "rel",
      "noopener noreferrer",
      1,
      "credit",
      3,
      "href"
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
      "band",
      "-mx-6",
      "-mt-5",
      "mb-5",
      "sm:-mx-10",
      "lg:hidden"
    ],
    [
      "alt",
      "",
      3,
      "src"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "band-veil"
    ],
    [
      1,
      "relative",
      "flex",
      "h-full",
      "flex-col",
      "justify-between",
      "px-6",
      "pb-4",
      "pt-5",
      "sm:px-10"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "gap-3"
    ],
    [3, "ngTemplateOutlet"],
    [
      1,
      "max-w-[18em]",
      "text-[19px]",
      "font-extrabold",
      "leading-tight",
      "tracking-[-0.02em]",
      "text-balance",
      2,
      "color",
      "var(--v2-blanc)"
    ],
    [
      "target",
      "_blank",
      "rel",
      "noopener noreferrer",
      1,
      "credit",
      "credit-band",
      3,
      "href"
    ],
    [
      1,
      "hidden",
      "items-center",
      "justify-end",
      "gap-3",
      "lg:flex"
    ],
    [
      "target",
      "_blank",
      "rel",
      "noopener noreferrer",
      1,
      "ghost",
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
      "flex",
      "flex-1",
      "items-start",
      "justify-center",
      "py-7",
      "lg:items-center",
      "lg:py-4"
    ],
    [
      1,
      "w-full",
      "max-w-[480px]"
    ],
    [
      1,
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
      "name",
      "mail",
      3,
      "size"
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
      "name",
      "call",
      3,
      "size"
    ],
    [
      1,
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
      "name",
      "lock",
      3,
      "size"
    ],
    [
      1,
      "mt-5",
      "text-[32px]",
      "font-extrabold",
      "leading-[1.05]",
      "tracking-[-0.03em]",
      "lg:text-[40px]"
    ],
    [
      1,
      "mt-2",
      "text-[16px]",
      "font-medium",
      "leading-relaxed",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "recap",
      "mt-6"
    ],
    [1, "recap-row"],
    [
      "aria-hidden",
      "true",
      1,
      "recap-ico"
    ],
    [
      "name",
      "person",
      3,
      "size"
    ],
    [1, "label"],
    [
      1,
      "block",
      "truncate",
      "text-[16px]",
      "font-extrabold"
    ],
    [
      1,
      "block",
      "text-[13px]",
      "font-semibold",
      "tabular-nums",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "name",
      "payments",
      3,
      "size"
    ],
    [
      1,
      "min-w-0",
      "flex-1"
    ],
    [
      1,
      "block",
      "text-[24px]",
      "font-extrabold",
      "leading-tight",
      "tracking-[-0.02em]",
      "tabular-nums",
      2,
      "color",
      "var(--v2-foret)"
    ],
    [
      "id",
      "pay-with",
      1,
      "label",
      "mt-6"
    ],
    [
      "role",
      "radiogroup",
      "aria-labelledby",
      "pay-with",
      1,
      "mt-2",
      "grid",
      "grid-cols-2",
      "gap-2.5"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "channel",
      3,
      "on"
    ],
    [
      "type",
      "button",
      1,
      "btn-primary",
      "mt-6",
      3,
      "click",
      "disabled"
    ],
    [
      1,
      "min-w-0",
      "truncate",
      "text-left"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "btn-chip"
    ],
    [
      "name",
      "arrow_forward",
      3,
      "size"
    ],
    [
      "role",
      "alert",
      1,
      "mt-3",
      "flex",
      "items-start",
      "gap-2.5",
      "rounded-[16px]",
      "px-4",
      "py-3",
      "text-[14px]",
      "leading-snug",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "channel",
      3,
      "click"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "logos"
    ],
    [
      "alt",
      "",
      3,
      "src",
      "wordmark",
      "card"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "min-w-0",
      "truncate"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "radio"
    ],
    [
      "name",
      "check",
      3,
      "size"
    ],
    [
      "name",
      "warning",
      1,
      "mt-0.5",
      "shrink-0",
      3,
      "size"
    ],
    [
      1,
      "mt-3",
      "text-[16px]",
      "font-medium",
      "leading-relaxed",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "text-[32px]",
      "font-extrabold",
      "leading-[1.05]",
      "tracking-[-0.03em]",
      "lg:text-[40px]"
    ],
    [
      "name",
      "calendar_today",
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
    ]
  ],
  template: function PayerPage_Template(rf, ctx) {
    var _a2;
    if (rf & 1) {
      __elementStart(0, "div", 1)(1, "aside", 2);
      __element(2, "img", 3)(3, "div", 4);
      __elementStart(4, "div", 5);
      __element(5, "ui-brand-logo", 6);
      __elementStart(6, "a", 7);
      __text(7);
      __elementEnd();
      __elementStart(8, "div", 8)(9, "p", 9);
      __text(10);
      __elementEnd();
      __elementStart(11, "div", 10);
      __element(12, "span", 11);
      __elementStart(13, "p", 12);
      __text(14);
      __elementEnd()();
      __elementStart(15, "a", 13);
      __element(16, "img", 14);
      __elementStart(17, "span", 15)(18, "span", 16);
      __text(19);
      __elementEnd();
      __elementStart(20, "span", 17);
      __text(21);
      __elementEnd();
      __elementStart(22, "span", 18);
      __text(23);
      __elementEnd();
      __elementStart(24, "span", 19);
      __text(25);
      __elementEnd()()()()()();
      __elementStart(26, "main", 20)(27, "div", 21);
      __element(28, "img", 22)(29, "div", 23);
      __elementStart(30, "div", 24)(31, "div", 25);
      __element(32, "ui-brand-logo", 6);
      __elementContainer(33, 26);
      __elementEnd();
      __elementStart(34, "p", 27);
      __text(35);
      __elementEnd()();
      __elementStart(36, "a", 28);
      __text(37);
      __elementEnd()();
      __elementStart(38, "header", 29);
      __elementContainer(39, 26);
      __elementEnd();
      __elementStart(40, "a", 30);
      __element(41, "img", 31);
      __elementStart(42, "span", 15)(43, "span", 32);
      __text(44);
      __elementEnd();
      __elementStart(45, "span", 33);
      __text(46);
      __elementEnd();
      __elementStart(47, "span", 34);
      __text(48);
      __elementEnd()()();
      __elementStart(49, "div", 35)(50, "div", 36);
      __conditionalCreate(51, PayerPage_Conditional_51_Template, 5, 6)(52, PayerPage_Conditional_52_Template, 4, 2);
      __elementStart(53, "div", 37)(54, "span", 38);
      __element(55, "img", 39);
      __elementEnd();
      __elementStart(56, "div", 40)(57, "p", 41);
      __text(58);
      __elementEnd();
      __elementStart(59, "div", 42)(60, "a", 43);
      __element(61, "ui-icon", 44);
      __text(62);
      __elementEnd();
      __elementStart(63, "a", 45);
      __element(64, "ui-icon", 46);
      __text(65);
      __elementEnd()()()()()();
      __conditionalCreate(66, PayerPage_Conditional_66_Template, 3, 4, "p", 47);
      __elementEnd()();
      __template(67, PayerPage_ng_template_67_Template, 3, 1, "ng-template", null, 0, __templateRefExtractor);
    }
    if (rf & 2) {
      let tmp_30_0;
      const localeSwitch_r9 = __reference(68);
      __advance(2);
      __styleProp("object-position", ctx.photo.position);
      __property("src", ctx.photo.src);
      __advance(3);
      __property("size", 56);
      __advance();
      __property("href", ctx.photo.source, __sanitizeUrl);
      __advance();
      __textInterpolate(ctx.t()("pay.photoCredit", __pureFunction2(41, _c0, ctx.photo.author, ctx.photo.license)));
      __advance(3);
      __textInterpolate(ctx.t()("pay.layout.headline"));
      __advance(4);
      __textInterpolate(ctx.t()("pay.layout.lead"));
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
      __textInterpolate(ctx.cradesc.urlLabel);
      __advance(3);
      __styleProp("object-position", ctx.photo.position);
      __property("src", ctx.photo.src);
      __advance(4);
      __property("size", 38);
      __advance();
      __property("ngTemplateOutlet", localeSwitch_r9);
      __advance(2);
      __textInterpolate(ctx.t()("pay.layout.headline"));
      __advance();
      __property("href", ctx.photo.source, __sanitizeUrl);
      __advance();
      __textInterpolate(ctx.t()("pay.photoCredit", __pureFunction2(44, _c0, ctx.photo.author, ctx.photo.license)));
      __advance(2);
      __property("ngTemplateOutlet", localeSwitch_r9);
      __advance();
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
      __advance(3);
      __conditional((tmp_30_0 = ctx.view()) ? 51 : 52, tmp_30_0);
      __advance(4);
      __property("src", ctx.cradesc.emblem);
      __advance(3);
      __textInterpolate(ctx.t()("pay.help"));
      __advance(2);
      __property("href", "mailto:" + ctx.cradesc.email, __sanitizeUrl);
      __advance();
      __property("size", 15);
      __advance();
      __textInterpolate(ctx.cradesc.email);
      __advance();
      __property("href", "tel:" + ctx.cradesc.phoneHref, __sanitizeUrl);
      __advance();
      __property("size", 15);
      __advance();
      __textInterpolate(ctx.cradesc.phone);
      __advance();
      __conditional(((_a2 = ctx.view()) == null ? void 0 : _a2.payable) ? 66 : -1);
    }
  },
  dependencies: [
    BrandLogoComponent,
    IconComponent,
    NgTemplateOutlet
  ],
  styles: ['button[_ngcontent-%COMP%]:not(:disabled), \n   a[href][_ngcontent-%COMP%], \n   [role="radio"][_ngcontent-%COMP%] {\n      cursor: pointer;\n    }\n    .mono[_ngcontent-%COMP%] {\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n    .label[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0.06em;\n      text-transform: uppercase;\n      color: var(--%NS%v2-ardoise);\n    }\n    \n    .recap[_ngcontent-%COMP%] {\n      border-radius: var(--%NS%v2-radius-champ);\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n    }\n    .recap-row[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 14px;\n      padding: 14px 18px;\n    }\n    .recap-row[_ngcontent-%COMP%]    + .recap-row[_ngcontent-%COMP%] {\n      border-top: 1px solid var(--%NS%v2-separateur);\n    }\n    .recap-ico[_ngcontent-%COMP%] {\n      display: grid;\n      height: 40px;\n      width: 40px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 12px;\n      background: var(--%NS%v2-sauge);\n      color: var(--%NS%v2-foret);\n    }\n    \n    .channel[_ngcontent-%COMP%] {\n      position: relative;\n      display: flex;\n      height: 64px;\n      width: 100%;\n      align-items: center;\n      gap: 12px;\n      border-radius: var(--%NS%v2-radius-champ);\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      padding: 0 14px;\n      font-size: 15px;\n      font-weight: 700;\n      color: var(--%NS%v2-encre);\n      text-align: left;\n      transition:\n        border-color 0.15s ease,\n        box-shadow 0.15s ease;\n    }\n    .channel[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-texte);\n    }\n    .channel.on[_ngcontent-%COMP%] {\n      border: 2px solid var(--%NS%v2-foret);\n      padding: 0 13.5px;\n      box-shadow: var(--%NS%v2-halo);\n    }\n    .channel[_ngcontent-%COMP%]:focus-visible {\n      outline: none;\n      border: 2px solid var(--%NS%v2-foret);\n      padding: 0 13.5px;\n      box-shadow: var(--%NS%v2-halo);\n    }\n    .channel[_ngcontent-%COMP%]   .logos[_ngcontent-%COMP%] {\n      display: flex;\n      height: 36px;\n      min-width: 36px;\n      flex-shrink: 0;\n      align-items: center;\n      justify-content: center;\n      gap: 4px;\n    }\n    .channel[_ngcontent-%COMP%]   .logos[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n      height: 34px;\n      width: auto;\n      border-radius: 9px;\n    }\n    .channel[_ngcontent-%COMP%]   .logos[_ngcontent-%COMP%]   img.wordmark[_ngcontent-%COMP%] {\n      height: 26px;\n      border-radius: 0;\n    }\n    .channel[_ngcontent-%COMP%]   .logos[_ngcontent-%COMP%]   img.card[_ngcontent-%COMP%] {\n      height: 16px;\n      border-radius: 0;\n    }\n    .radio[_ngcontent-%COMP%] {\n      margin-left: auto;\n      display: grid;\n      height: 22px;\n      width: 22px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 999px;\n      border: 2px solid var(--%NS%v2-gris-trait);\n      color: var(--%NS%v2-citron);\n    }\n    .channel.on[_ngcontent-%COMP%]   .radio[_ngcontent-%COMP%] {\n      border-color: var(--%NS%v2-foret);\n      background: var(--%NS%v2-foret);\n    }\n    .btn-primary[_ngcontent-%COMP%] {\n      display: flex;\n      height: 64px;\n      width: 100%;\n      align-items: center;\n      justify-content: space-between;\n      gap: 12px;\n      border-radius: var(--%NS%v2-radius-champ);\n      background: var(--%NS%v2-foret);\n      padding: 0 8px 0 24px;\n      font-size: 17px;\n      font-weight: 800;\n      color: var(--%NS%v2-blanc);\n      transition: background-color 0.15s ease;\n    }\n    .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n      background: var(--%NS%v2-foret-clair);\n    }\n    .btn-primary[_ngcontent-%COMP%]:focus-visible {\n      outline: none;\n      box-shadow: var(--%NS%v2-halo);\n    }\n    .btn-primary[_ngcontent-%COMP%]:disabled {\n      background: var(--%NS%v2-lin);\n      color: var(--%NS%v2-gris-texte);\n      cursor: not-allowed;\n    }\n    .btn-chip[_ngcontent-%COMP%] {\n      display: grid;\n      height: 48px;\n      width: 48px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 14px;\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n    }\n    .btn-primary[_ngcontent-%COMP%]:disabled   .btn-chip[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-gris-trait);\n      color: var(--%NS%v2-blanc);\n    }\n    .band[_ngcontent-%COMP%] {\n      position: relative;\n      height: 190px;\n      overflow: hidden;\n      background: var(--%NS%v2-foret);\n    }\n    .band[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n      position: absolute;\n      inset: 0;\n      height: 100%;\n      width: 100%;\n      object-fit: cover;\n    }\n    .band-veil[_ngcontent-%COMP%] {\n      position: absolute;\n      inset: 0;\n      background: linear-gradient(180deg, color-mix(in oklab, var(--%NS%v2-foret) 70%, transparent) 0%, color-mix(in oklab, var(--%NS%v2-foret) 25%, transparent) 45%, color-mix(in oklab, var(--%NS%v2-foret) 88%, transparent) 100%);\n    }\n    .credit[_ngcontent-%COMP%] {\n      position: absolute;\n      right: 16px;\n      bottom: 10px;\n      z-index: 1;\n      font-size: 10.5px;\n      font-weight: 600;\n      color: color-mix(in oklab, var(--%NS%v2-blanc) 70%, transparent);\n    }\n    .credit[_ngcontent-%COMP%]:hover {\n      color: var(--%NS%v2-blanc);\n      text-decoration: underline;\n    }\n    .credit-band[_ngcontent-%COMP%] {\n      bottom: 8px;\n    }\n    .link[_ngcontent-%COMP%] {\n      font-weight: 700;\n      color: var(--%NS%v2-foret-clair);\n      text-underline-offset: 3px;\n    }\n    .link[_ngcontent-%COMP%]:hover {\n      text-decoration: underline;\n    }\n    .link[_ngcontent-%COMP%]:focus-visible, \n   .ghost[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n      border-radius: 6px;\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .channel[_ngcontent-%COMP%], \n   .btn-primary[_ngcontent-%COMP%] {\n        transition: none;\n      }\n    }']
}), _a);

export { PayerPage as default };
//# sourceMappingURL=payer._token_.page-Dt79rgzj.mjs.map

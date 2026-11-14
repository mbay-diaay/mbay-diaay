import { ae as model, aa as input, i as inject, F as signal, c as computed, e as effect, a8 as untracked, ɵ as __defineComponent, f as __elementStart, H as __listener, b as __element, h as __elementEnd, g as __text, j as __conditionalCreate, I as __twoWayListener, n as __property, o as __advance, u as __attribute, z as __classProp, q as __textInterpolate1, s as __conditional, p as __textInterpolate, K as __twoWayProperty, L as __getCurrentView, w as __nextContext, r as __pureFunction1, O as __restoreView, P as __resetView, Q as __twoWayBindingSet } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { L as LocaleService, i as inScope } from './locale.service-c0QhtcVY.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { q as CheckListComponent, M as ModalComponent, S as SelectComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';

var _a, _b;
var _c0 = (a0) => ({ name: a0 });
var _c1 = (a0) => ({ date: a0 });
var _c2 = (a0) => ({ email: a0 });
function TechnicianCodeDialogComponent_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 8);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const shown_r3 = __nextContext();
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate(ctx_r1.t()("tech.code.emailText", __pureFunction1(1, _c2, shown_r3.email)));
  }
}
function TechnicianCodeDialogComponent_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "button", 13);
    __listener("click", function TechnicianCodeDialogComponent_Conditional_0_Conditional_11_Template_button_click_0_listener() {
      __restoreView(_r4);
      const shown_r3 = __nextContext();
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.sendByEmail(shown_r3));
    });
    __element(1, "ui-icon", 14);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.t()("tech.code.sendEmail"), " ");
  }
}
function TechnicianCodeDialogComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "ui-modal", 1);
    __listener("closed", function TechnicianCodeDialogComponent_Conditional_0_Template_ui_modal_closed_0_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.view.set(null));
    });
    __elementStart(1, "div", 2)(2, "span", 3);
    __text(3);
    __elementEnd();
    __elementStart(4, "button", 4);
    __listener("click", function TechnicianCodeDialogComponent_Conditional_0_Template_button_click_4_listener() {
      const shown_r3 = __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.copy(shown_r3.code));
    });
    __element(5, "ui-icon", 5);
    __text(6);
    __elementEnd();
    __elementStart(7, "p", 6);
    __element(8, "ui-icon", 7);
    __text(9);
    __elementEnd();
    __conditionalCreate(10, TechnicianCodeDialogComponent_Conditional_0_Conditional_10_Template, 2, 3, "p", 8);
    __elementEnd();
    __conditionalCreate(11, TechnicianCodeDialogComponent_Conditional_0_Conditional_11_Template, 3, 2, "button", 9);
    __elementStart(12, "button", 10);
    __listener("click", function TechnicianCodeDialogComponent_Conditional_0_Template_button_click_12_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.view.set(null));
    });
    __text(13);
    __elementStart(14, "span", 11);
    __element(15, "ui-icon", 12);
    __elementEnd()()();
  }
  if (rf & 2) {
    const shown_r3 = ctx;
    const ctx_r1 = __nextContext();
    __property("open", true)("title", ctx_r1.t()("tech.code.title", __pureFunction1(16, _c0, shown_r3.name)))("description", ctx_r1.t()("tech.code.description"))("width", 560)("closeLabel", ctx_r1.t()("common.close"));
    __advance(2);
    __attribute("aria-label", ctx_r1.t()("tech.code.aria"));
    __advance();
    __textInterpolate(ctx_r1.grouped());
    __advance(2);
    __property("name", ctx_r1.copied() ? "check" : "content_copy")("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.copied() ? ctx_r1.t()("tech.code.copied") : ctx_r1.t()("tech.code.copy"), " ");
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("tech.code.rules", __pureFunction1(18, _c1, ctx_r1.expiry())));
    __advance();
    __conditional(shown_r3.email ? 10 : -1);
    __advance();
    __conditional(shown_r3.email ? 11 : -1);
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("tech.code.done"));
    __advance(2);
    __property("size", 18);
  }
}
var TechnicianCodeDialogComponent = (_a = class {
  constructor() {
    this.view = model(null, ...[]);
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.snackbar = inject(SnackbarService);
    this.t = this.locale.t;
    this.copied = signal(false, ...[]);
    this.grouped = computed(() => {
      var _a2, _b2;
      const code = (_b2 = (_a2 = this.view()) == null ? void 0 : _a2.code) != null ? _b2 : "";
      return `${code.slice(0, 4)} ${code.slice(4)}`;
    }, ...[]);
    this.expiry = computed(() => {
      var _a2;
      const at = (_a2 = this.view()) == null ? void 0 : _a2.expiresAt;
      return at ? new Intl.DateTimeFormat(this.locale.locale() === "wo" ? "fr-SN" : "fr-FR", {
        dateStyle: "long",
        timeStyle: "short"
      }).format(new Date(at)) : "";
    }, ...[]);
  }
  /** Copie le code sans espace (8 chiffres), prêt à être collé dans un message. */
  async copy(code) {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      this.snackbar.error(this.t()("tech.code.copyFailed"));
      return;
    }
    this.copied.set(true);
    this.snackbar.success(this.t()("tech.code.copiedToast"));
    setTimeout(() => this.copied.set(false), 2500);
  }
  sendByEmail(shown) {
    const result = this.store.actions.sendTechnicianCodeByEmail(shown.userId, shown.code);
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.t()("tech.code.sent", { email: result.email }));
  }
}, _a.\u0275fac = function TechnicianCodeDialogComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-technician-code-dialog"]],
  inputs: { view: [1, "view"] },
  outputs: { view: "viewChange" },
  decls: 1,
  vars: 1,
  consts: [
    [
      "icon",
      "lock",
      "tone",
      "brand",
      3,
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      "icon",
      "lock",
      "tone",
      "brand",
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
      "space-y-4",
      "pb-6"
    ],
    [1, "code"],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      "w-full",
      "justify-center",
      3,
      "click"
    ],
    [
      3,
      "name",
      "size"
    ],
    [1, "notice"],
    [
      "name",
      "info",
      3,
      "size"
    ],
    [1, "sub"],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-ghost"
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
      "name",
      "mail",
      3,
      "size"
    ]
  ],
  template: function TechnicianCodeDialogComponent_Template(rf, ctx) {
    if (rf & 1) __conditionalCreate(0, TechnicianCodeDialogComponent_Conditional_0_Template, 16, 20, "ui-modal", 0);
    if (rf & 2) {
      let tmp_0_0;
      __conditional((tmp_0_0 = ctx.view()) ? 0 : -1, tmp_0_0);
    }
  },
  dependencies: [IconComponent, ModalComponent],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".code[_ngcontent-%COMP%] {\n        display: block;\n        border-radius: 20px;\n        background: var(--%NS%v2-sauge);\n        padding: 22px 16px;\n        text-align: center;\n        font-family: var(--%NS%v2-font-mono);\n        font-size: 40px;\n        font-weight: 800;\n        letter-spacing: 0.18em;\n        color: var(--%NS%v2-foret);\n        user-select: all;\n      }"]
}), _a);
function TechnicianDialogComponent_Conditional_11_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 24);
    __element(1, "ui-icon", 25);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r1.err().sex);
  }
}
function TechnicianDialogComponent_Conditional_11_Template(rf, ctx) {
  var _a2, _b2, _c, _d, _e;
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "h3", 13);
    __element(1, "ui-icon", 14);
    __text(2);
    __elementEnd();
    __elementStart(3, "div", 15)(4, "ui-text-field", 16);
    __listener("valueChange", function TechnicianDialogComponent_Conditional_11_Template_ui_text_field_valueChange_4_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      ctx_r1.firstName.set($event);
      return __resetView(ctx_r1.clear("firstName"));
    });
    __elementEnd();
    __elementStart(5, "ui-text-field", 17);
    __listener("valueChange", function TechnicianDialogComponent_Conditional_11_Template_ui_text_field_valueChange_5_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      ctx_r1.lastName.set($event);
      return __resetView(ctx_r1.clear("lastName"));
    });
    __elementEnd();
    __elementStart(6, "ui-text-field", 18);
    __listener("valueChange", function TechnicianDialogComponent_Conditional_11_Template_ui_text_field_valueChange_6_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      ctx_r1.email.set($event);
      return __resetView(ctx_r1.clear("email"));
    });
    __elementEnd();
    __elementStart(7, "ui-text-field", 19);
    __listener("valueChange", function TechnicianDialogComponent_Conditional_11_Template_ui_text_field_valueChange_7_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      ctx_r1.phone.set($event);
      return __resetView(ctx_r1.clear("phone"));
    });
    __elementEnd();
    __elementStart(8, "ui-text-field", 20);
    __listener("valueChange", function TechnicianDialogComponent_Conditional_11_Template_ui_text_field_valueChange_8_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      ctx_r1.age.set($event);
      return __resetView(ctx_r1.clear("age"));
    });
    __elementEnd();
    __elementStart(9, "div", 21)(10, "p", 22);
    __text(11);
    __elementEnd();
    __elementStart(12, "div", 23)(13, "button", 3);
    __listener("click", function TechnicianDialogComponent_Conditional_11_Template_button_click_13_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      ctx_r1.sex.set("F");
      return __resetView(ctx_r1.clear("sex"));
    });
    __text(14);
    __elementEnd();
    __elementStart(15, "button", 3);
    __listener("click", function TechnicianDialogComponent_Conditional_11_Template_button_click_15_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      ctx_r1.sex.set("H");
      return __resetView(ctx_r1.clear("sex"));
    });
    __text(16);
    __elementEnd()();
    __conditionalCreate(17, TechnicianDialogComponent_Conditional_11_Conditional_17_Template, 3, 2, "p", 24);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("tech.dialog.section.identity"));
    __advance(2);
    __property("label", ctx_r1.t()("tech.dialog.firstName"))("value", ctx_r1.firstName())("error", (_a2 = ctx_r1.err().firstName) != null ? _a2 : "");
    __advance();
    __property("label", ctx_r1.t()("tech.dialog.lastName"))("value", ctx_r1.lastName())("error", (_b2 = ctx_r1.err().lastName) != null ? _b2 : "");
    __advance();
    __property("label", ctx_r1.t()("tech.dialog.email"))("optional", ctx_r1.t()("cooperatives.form.regionOptional"))("hint", ctx_r1.t()("tech.dialog.emailHint"))("value", ctx_r1.email())("error", (_c = ctx_r1.err().email) != null ? _c : "");
    __advance();
    __property("label", ctx_r1.t()("tech.dialog.phone"))("value", ctx_r1.phone())("error", (_d = ctx_r1.err().phone) != null ? _d : "");
    __advance();
    __property("label", ctx_r1.t()("adherents.add.age"))("hint", ctx_r1.t()("tech.dialog.ageHint"))("value", ctx_r1.age())("error", (_e = ctx_r1.err().age) != null ? _e : "");
    __advance(3);
    __textInterpolate(ctx_r1.t()("adherents.add.sex"));
    __advance();
    __attribute("aria-label", ctx_r1.t()("adherents.add.sex"));
    __advance();
    __classProp("on", ctx_r1.sex() === "F");
    __attribute("aria-checked", ctx_r1.sex() === "F");
    __advance();
    __textInterpolate(ctx_r1.t()("adherents.add.female"));
    __advance();
    __classProp("on", ctx_r1.sex() === "H");
    __attribute("aria-checked", ctx_r1.sex() === "H");
    __advance();
    __textInterpolate(ctx_r1.t()("adherents.add.male"));
    __advance();
    __conditional(ctx_r1.err().sex ? 17 : -1);
  }
}
function TechnicianDialogComponent_Conditional_12_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 24);
    __element(1, "ui-icon", 25);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r1.err().pick);
  }
}
function TechnicianDialogComponent_Conditional_12_Conditional_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 28);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r1.t()("tech.dialog.pickHint"));
  }
}
function TechnicianDialogComponent_Conditional_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "p", 22);
    __text(1);
    __elementEnd();
    __elementStart(2, "ui-select", 27);
    __listener("valueChange", function TechnicianDialogComponent_Conditional_12_Conditional_3_Template_ui_select_valueChange_2_listener($event) {
      __restoreView(_r3);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.pick($event));
    });
    __elementEnd();
    __conditionalCreate(3, TechnicianDialogComponent_Conditional_12_Conditional_3_Conditional_3_Template, 3, 2, "p", 24)(4, TechnicianDialogComponent_Conditional_12_Conditional_3_Conditional_4_Template, 2, 1, "p", 28);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("tech.dialog.pick"));
    __advance();
    __property("label", ctx_r1.t()("tech.dialog.pick"))("options", ctx_r1.techOptions())("value", ctx_r1.pickId());
    __advance();
    __conditional(ctx_r1.err().pick ? 3 : 4);
  }
}
function TechnicianDialogComponent_Conditional_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 26);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("tech.dialog.noneExisting"));
  }
}
function TechnicianDialogComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "h3", 13);
    __element(1, "ui-icon", 6);
    __text(2);
    __elementEnd();
    __conditionalCreate(3, TechnicianDialogComponent_Conditional_12_Conditional_3_Template, 5, 5)(4, TechnicianDialogComponent_Conditional_12_Conditional_4_Template, 2, 1, "p", 26);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate(ctx_r1.t()("tech.dialog.section.pick"));
    __advance();
    __conditional(ctx_r1.techOptions().length ? 3 : 4);
  }
}
function TechnicianDialogComponent_Conditional_14_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "ui-check-list", 30);
    __listener("valueChange", function TechnicianDialogComponent_Conditional_14_Conditional_0_Template_ui_check_list_valueChange_0_listener($event) {
      __restoreView(_r4);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.orgIds.set($event));
    });
    __elementEnd();
    __elementStart(1, "p", 28);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __property("label", ctx_r1.t()("tech.dialog.section.orgs"))("options", ctx_r1.orgOptions())("value", ctx_r1.orgIds());
    __advance(2);
    __textInterpolate(ctx_r1.t()("tech.dialog.orgsHint"));
  }
}
function TechnicianDialogComponent_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 29);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("tech.dialog.orgsNone"));
  }
}
function TechnicianDialogComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, TechnicianDialogComponent_Conditional_14_Conditional_0_Template, 3, 4)(1, TechnicianDialogComponent_Conditional_14_Conditional_1_Template, 2, 1, "p", 29);
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __conditional(ctx_r1.orgOptions().length ? 0 : 1);
  }
}
var TechnicianDialogComponent = (_b = class {
  constructor() {
    this.open = model(false, ...[]);
    this.scoopId = input(null, ...[]);
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.snackbar = inject(SnackbarService);
    this.t = this.locale.t;
    this.mode = signal("new", ...[]);
    this.firstName = signal("", ...[]);
    this.lastName = signal("", ...[]);
    this.email = signal("", ...[]);
    this.phone = signal("", ...[]);
    this.age = signal("", ...[]);
    this.sex = signal("", ...[]);
    this.pickId = signal("", ...[]);
    this.scoopIds = signal([], ...[]);
    this.orgIds = signal([], ...[]);
    this.err = signal({}, ...[]);
    this.codeView = signal(null, ...[]);
    this.scoopOptions = computed(() => {
      const s = this.store.state();
      return inScope(s.scoops.filter((c) => !c.archived).map((c) => ({
        ...c,
        scoopId: c.id
      })), s.session).sort((a, b) => a.name.localeCompare(b.name)).map((c) => ({
        value: c.id,
        label: c.name,
        ...c.code ? { hint: c.code } : {}
      }));
    }, ...[]);
    this.orgOptions = computed(() => {
      const chosen = this.scoopIds();
      const state = this.store.state();
      return state.orgs.filter((org) => chosen.includes(org.scoopId)).sort((a, b) => a.name.localeCompare(b.name)).map((org) => {
        var _a2, _b2;
        return {
          value: org.id,
          label: org.name,
          ...chosen.length > 1 ? { hint: (_b2 = (_a2 = state.scoops.find((scoop) => scoop.id === org.scoopId)) == null ? void 0 : _a2.name) != null ? _b2 : "" } : {}
        };
      });
    }, ...[]);
    this.technicians = computed(() => {
      const s = this.store.state();
      const visible = new Set(this.scoopOptions().map((o) => o.value));
      return s.users.filter((u) => u.role === "technicien").filter((u) => {
        var _a2;
        return ((_a2 = u.scoopIds) != null ? _a2 : u.scoopId ? [u.scoopId] : []).some((id) => visible.has(id));
      }).sort((a, b) => a.name.localeCompare(b.name));
    }, ...[]);
    this.techOptions = computed(() => this.technicians().map((u) => {
      var _a2;
      return {
        value: u.id,
        label: u.name,
        icon: "person",
        hint: this.t()("tech.dialog.scoopsCount", { count: ((_a2 = u.scoopIds) != null ? _a2 : []).length || 1 })
      };
    }), ...[]);
    effect(() => {
      if (!this.open()) return;
      untracked(() => this.reset());
    });
  }
  reset() {
    const pre = this.scoopId();
    this.mode.set("new");
    this.firstName.set("");
    this.lastName.set("");
    this.email.set("");
    this.phone.set("");
    this.age.set("");
    this.sex.set("");
    this.pickId.set("");
    this.scoopIds.set(pre ? [pre] : []);
    this.orgIds.set([]);
    this.err.set({});
  }
  setMode(m) {
    this.mode.set(m);
    this.err.set({});
    if (m === "new") this.scoopIds.set(this.scoopId() ? [this.scoopId()] : []);
    else if (this.pickId()) this.pick(this.pickId());
  }
  /** Choisir un technicien coche ses coopératives actuelles (+ celle de la fiche). */
  pick(id) {
    var _a2;
    this.pickId.set(id);
    const u = this.technicians().find((x) => x.id === id);
    const current = (_a2 = u == null ? void 0 : u.scoopIds) != null ? _a2 : (u == null ? void 0 : u.scoopId) ? [u.scoopId] : [];
    const pre = this.scoopId();
    this.scoopIds.set([.../* @__PURE__ */ new Set([...current, ...pre ? [pre] : []])]);
    this.clear("pick");
  }
  clear(k) {
    this.err.update((e) => {
      const { [k]: _gone, ...rest } = e;
      return rest;
    });
  }
  submit() {
    var _a2;
    const t = this.t();
    const err = {};
    if (!this.scoopIds().length) err.scoops = t("errors.technician.scoops");
    if (this.mode() === "new") {
      if (!this.firstName().trim()) err.firstName = t("errors.technician.name");
      if (!this.lastName().trim()) err.lastName = t("errors.technician.name");
      if (this.email().trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim())) err.email = t("errors.technician.email");
      if (this.phone().replace(/\D/g, "").length < 9) err.phone = t("errors.technician.phone");
      if (!this.sex()) err.sex = t("errors.technician.sex");
      const ageValue = Number(this.age().trim());
      if (!this.age().trim() || !Number.isInteger(ageValue) || ageValue < 15 || ageValue > 100) err.age = t("errors.technician.age");
    } else if (!this.pickId()) err.pick = t("errors.technician.notFound");
    this.err.set(err);
    if (Object.keys(err).length) return;
    if (this.mode() === "new") {
      const name = `${this.firstName().trim()} ${this.lastName().trim()}`;
      const res2 = this.store.actions.createTechnician({
        name,
        email: this.email(),
        phone: this.phone(),
        sex: this.sex(),
        age: Number(this.age().trim()),
        scoopIds: this.scoopIds(),
        orgIds: this.orgIds().filter((id) => this.orgOptions().some((option) => option.value === id))
      });
      if (!res2.ok) {
        const msg = this.locale.tNow(res2.error);
        if (msg === t("errors.technician.emailTaken")) this.err.set({ email: msg });
        else if (msg === t("errors.technician.phoneTaken")) this.err.set({ phone: msg });
        else this.snackbar.error(msg);
        return;
      }
      this.open.set(false);
      this.codeView.set({
        userId: res2.userId,
        name,
        code: res2.code,
        expiresAt: res2.expiresAt,
        email: this.email().trim()
      });
      return;
    }
    const u = this.technicians().find((x) => x.id === this.pickId());
    const res = this.store.actions.setTechnicianScoops(this.pickId(), this.scoopIds());
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error));
      return;
    }
    this.open.set(false);
    this.snackbar.success(t("tech.dialog.saved", { name: (_a2 = u == null ? void 0 : u.name) != null ? _a2 : "" }));
  }
}, _b.\u0275fac = function TechnicianDialogComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _b)();
}, _b.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _b,
  selectors: [["app-technician-dialog"]],
  inputs: {
    open: [1, "open"],
    scoopId: [1, "scoopId"]
  },
  outputs: { open: "openChange" },
  decls: 22,
  vars: 27,
  consts: [
    [
      "icon",
      "person_add",
      3,
      "closed",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [1, "pb-6"],
    [
      "role",
      "radiogroup",
      1,
      "modes"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      1,
      "mode",
      3,
      "click"
    ],
    [1, "ico"],
    [
      "name",
      "person_add",
      3,
      "size"
    ],
    [
      "name",
      "group",
      3,
      "size"
    ],
    [
      1,
      "mt-6",
      3,
      "valueChange",
      "label",
      "options",
      "value",
      "error"
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
      3,
      "name",
      "size"
    ],
    [
      3,
      "viewChange",
      "view"
    ],
    [1, "sec"],
    [
      "name",
      "person",
      3,
      "size"
    ],
    [
      1,
      "grid",
      "gap-5",
      "sm:grid-cols-2"
    ],
    [
      "preset",
      "firstName",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      "preset",
      "lastName",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      "preset",
      "email",
      1,
      "sm:col-span-2",
      3,
      "valueChange",
      "label",
      "optional",
      "hint",
      "value",
      "error"
    ],
    [
      "preset",
      "phone",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      "preset",
      "age",
      3,
      "valueChange",
      "label",
      "hint",
      "value",
      "error"
    ],
    [1, "sm:col-span-2"],
    [1, "lbl"],
    [
      "role",
      "radiogroup",
      1,
      "modes",
      "mt-2"
    ],
    [1, "field-err"],
    [
      "name",
      "warning",
      3,
      "size"
    ],
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
      "leadingIcon",
      "person",
      1,
      "mt-2",
      "block",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      1,
      "mt-1.5",
      "text-[13px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "mt-6",
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
      1,
      "mt-6",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ]
  ],
  template: function TechnicianDialogComponent_Template(rf, ctx) {
    var _a2;
    if (rf & 1) {
      __elementStart(0, "ui-modal", 0);
      __listener("closed", function TechnicianDialogComponent_Template_ui_modal_closed_0_listener() {
        return ctx.open.set(false);
      });
      __elementStart(1, "div", 1)(2, "div", 2)(3, "button", 3);
      __listener("click", function TechnicianDialogComponent_Template_button_click_3_listener() {
        return ctx.setMode("new");
      });
      __elementStart(4, "span", 4);
      __element(5, "ui-icon", 5);
      __elementEnd();
      __text(6);
      __elementEnd();
      __elementStart(7, "button", 3);
      __listener("click", function TechnicianDialogComponent_Template_button_click_7_listener() {
        return ctx.setMode("existing");
      });
      __elementStart(8, "span", 4);
      __element(9, "ui-icon", 6);
      __elementEnd();
      __text(10);
      __elementEnd()();
      __conditionalCreate(11, TechnicianDialogComponent_Conditional_11_Template, 18, 31)(12, TechnicianDialogComponent_Conditional_12_Template, 5, 3);
      __elementStart(13, "ui-check-list", 7);
      __listener("valueChange", function TechnicianDialogComponent_Template_ui_check_list_valueChange_13_listener($event) {
        ctx.scoopIds.set($event);
        return ctx.clear("scoops");
      });
      __elementEnd();
      __conditionalCreate(14, TechnicianDialogComponent_Conditional_14_Template, 2, 1);
      __elementEnd();
      __elementStart(15, "button", 8);
      __listener("click", function TechnicianDialogComponent_Template_button_click_15_listener() {
        return ctx.open.set(false);
      });
      __text(16);
      __elementEnd();
      __elementStart(17, "button", 9);
      __listener("click", function TechnicianDialogComponent_Template_button_click_17_listener() {
        return ctx.submit();
      });
      __text(18);
      __elementStart(19, "span", 10);
      __element(20, "ui-icon", 11);
      __elementEnd()()();
      __elementStart(21, "app-technician-code-dialog", 12);
      __twoWayListener("viewChange", function TechnicianDialogComponent_Template_app_technician_code_dialog_viewChange_21_listener($event) {
        __twoWayBindingSet(ctx.codeView, $event) || (ctx.codeView = $event);
        return $event;
      });
      __elementEnd();
    }
    if (rf & 2) {
      __property("open", ctx.open())("title", ctx.t()("tech.dialog.title"))("description", ctx.t()("tech.dialog.description"))("width", 680)("closeLabel", ctx.t()("common.close"));
      __advance(2);
      __attribute("aria-label", ctx.t()("tech.dialog.mode.aria"));
      __advance();
      __classProp("on", ctx.mode() === "new");
      __attribute("aria-checked", ctx.mode() === "new");
      __advance(2);
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("tech.dialog.mode.new"), " ");
      __advance();
      __classProp("on", ctx.mode() === "existing");
      __attribute("aria-checked", ctx.mode() === "existing");
      __advance(2);
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("tech.dialog.mode.existing"), " ");
      __advance();
      __conditional(ctx.mode() === "new" ? 11 : 12);
      __advance(2);
      __property("label", ctx.t()("tech.dialog.section.scoops"))("options", ctx.scoopOptions())("value", ctx.scoopIds())("error", (_a2 = ctx.err().scoops) != null ? _a2 : "");
      __advance();
      __conditional(ctx.mode() === "new" ? 14 : -1);
      __advance(2);
      __textInterpolate(ctx.t()("producteurs.index.cancel"));
      __advance(2);
      __textInterpolate1(" ", ctx.mode() === "new" ? ctx.t()("tech.dialog.submitNew") : ctx.t()("tech.dialog.submitExisting"), " ");
      __advance(2);
      __property("name", ctx.mode() === "new" ? "mail" : "check")("size", 18);
      __advance();
      __twoWayProperty("view", ctx.codeView);
    }
  },
  dependencies: [
    CheckListComponent,
    IconComponent,
    ModalComponent,
    SelectComponent,
    TechnicianCodeDialogComponent,
    TextFieldComponent
  ],
  styles: [".sec[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n      margin: 24px 0 12px;\n      font-size: 14px;\n      font-weight: 800;\n      color: var(--%NS%v2-foret);\n    }\n    .modes[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));\n      gap: 8px;\n    }\n    .mode[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      border-radius: 16px;\n      border: 1.5px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n      padding: 12px 14px;\n      text-align: left;\n      font-size: 14px;\n      font-weight: 800;\n      cursor: pointer;\n    }\n    .mode[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-texte);\n    }\n    .mode.on[_ngcontent-%COMP%] {\n      border: 2px solid var(--%NS%v2-foret);\n      background: var(--%NS%v2-sauge);\n      padding: 11.5px 13.5px;\n    }\n    .mode[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    .mode[_ngcontent-%COMP%]   .ico[_ngcontent-%COMP%] {\n      display: grid;\n      height: 34px;\n      width: 34px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 10px;\n      background: var(--%NS%v2-creme);\n      color: var(--%NS%v2-foret);\n    }\n    .mode.on[_ngcontent-%COMP%]   .ico[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n    }\n    .lbl[_ngcontent-%COMP%] {\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0.06em;\n      text-transform: uppercase;\n      color: var(--%NS%v2-ardoise);\n    }\n    .field-err[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      margin-top: 6px;\n      font-size: 13px;\n      font-weight: 700;\n      color: var(--%NS%v2-erreur-fg);\n    }\n    .btn[_ngcontent-%COMP%] {\n      display: inline-flex;\n      height: 48px;\n      align-items: center;\n      gap: 10px;\n      border-radius: 16px;\n      padding: 0 18px;\n      font-size: 15px;\n      font-weight: 800;\n      cursor: pointer;\n    }\n    .btn-primary[_ngcontent-%COMP%] {\n      padding: 0 6px 0 18px;\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    .btn-primary[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-foret-clair);\n    }\n    .btn-ghost[_ngcontent-%COMP%] {\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-encre);\n    }\n    .btn-ghost[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-texte);\n    }\n    .chip[_ngcontent-%COMP%] {\n      display: grid;\n      height: 36px;\n      width: 36px;\n      place-items: center;\n      border-radius: 12px;\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n    }"]
}), _b);

export { TechnicianDialogComponent as T, TechnicianCodeDialogComponent as a };
//# sourceMappingURL=technician-dialog.component-BZhETki0.mjs.map

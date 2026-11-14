import { aa as input, i as inject, c as computed, ɵ as __defineComponent, f as __elementStart, b as __element, g as __text, h as __elementEnd, j as __conditionalCreate, a5 as __classMap, o as __advance, n as __property, p as __textInterpolate, r as __pureFunction1, s as __conditional, m as __repeaterCreate, w as __nextContext, v as __repeater } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { N as NAV, n as navAllowed } from './nav-CV7kBTDN.mjs';
import { L as LocaleService } from './locale.service-c0QhtcVY.mjs';
import { I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';

var _a;
var _c0 = (a0) => ({ count: a0 });
var _forTrack0 = ($index, $item) => $item.key;
function RoleAccessPreviewComponent_Conditional_9_For_2_For_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 10);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const screen_r1 = ctx.$implicit;
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r1.t()(screen_r1.label));
  }
}
function RoleAccessPreviewComponent_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div")(1, "p", 8);
    __text(2);
    __elementEnd();
    __elementStart(3, "div", 9);
    __repeaterCreate(4, RoleAccessPreviewComponent_Conditional_9_For_2_For_5_Template, 2, 1, "span", 10, _forTrack0);
    __elementEnd()();
  }
  if (rf & 2) {
    const accessGroup_r3 = ctx.$implicit;
    const ctx_r1 = __nextContext(2);
    __advance(2);
    __textInterpolate(ctx_r1.t()(accessGroup_r3.title));
    __advance(2);
    __repeater(accessGroup_r3.screens);
  }
}
function RoleAccessPreviewComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 6);
    __repeaterCreate(1, RoleAccessPreviewComponent_Conditional_9_For_2_Template, 6, 1, "div", null, _forTrack0);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __repeater(ctx_r1.accessGroups());
  }
}
function RoleAccessPreviewComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 7);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate(ctx_r1.emptyText() || ctx_r1.t()("roles.access.none"));
  }
}
var RoleAccessPreviewComponent = (_a = class {
  constructor() {
    this.permissions = input.required(...[]);
    this.scoped = input(true, ...[]);
    this.hint = input("", ...[]);
    this.emptyText = input("", ...[]);
    this.bare = input(false, ...[]);
    this.t = inject(LocaleService).t;
    this.accessGroups = computed(() => {
      const previewSession = {
        permissions: [...this.permissions()],
        scope: { kind: this.scoped() ? "scoop" : "consolid\xE9" }};
      return NAV.map((navGroup) => ({
        key: navGroup.group,
        title: navGroup.groupKey,
        screens: navGroup.items.filter((item) => !item.soon && navAllowed(previewSession, item)).map((item) => ({
          key: item.to,
          label: item.labelKey
        }))
      })).filter((accessGroup) => accessGroup.screens.length);
    }, ...[]);
    this.screenCount = computed(() => this.accessGroups().reduce((total, accessGroup) => total + accessGroup.screens.length, 0), ...[]);
  }
}, _a.\u0275fac = function RoleAccessPreviewComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-role-access-preview"]],
  hostAttrs: [1, "block"],
  inputs: {
    permissions: [1, "permissions"],
    scoped: [1, "scoped"],
    hint: [1, "hint"],
    emptyText: [1, "emptyText"],
    bare: [1, "bare"]
  },
  decls: 11,
  vars: 9,
  consts: [
    ["aria-live", "polite"],
    [
      1,
      "flex",
      "flex-wrap",
      "items-baseline",
      "justify-between",
      "gap-2"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2",
      "text-[16px]",
      "font-extrabold"
    ],
    [
      "name",
      "visibility",
      3,
      "size"
    ],
    [1, "sub"],
    [
      1,
      "sub",
      "mt-1"
    ],
    [
      1,
      "access-groups",
      "mt-4"
    ],
    [
      1,
      "mt-4",
      "text-[14px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
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
      "mt-2",
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [1, "access-chip"]
  ],
  template: function RoleAccessPreviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "section", 0)(1, "div", 1)(2, "h3", 2);
      __element(3, "ui-icon", 3);
      __text(4);
      __elementEnd();
      __elementStart(5, "span", 4);
      __text(6);
      __elementEnd()();
      __elementStart(7, "p", 5);
      __text(8);
      __elementEnd();
      __conditionalCreate(9, RoleAccessPreviewComponent_Conditional_9_Template, 3, 0, "div", 6)(10, RoleAccessPreviewComponent_Conditional_10_Template, 2, 1, "p", 7);
      __elementEnd();
    }
    if (rf & 2) {
      __classMap(ctx.bare() ? "plain" : "framed");
      __advance(3);
      __property("size", 18);
      __advance();
      __textInterpolate(ctx.t()("roles.access.title"));
      __advance(2);
      __textInterpolate(ctx.t()("roles.access.count", __pureFunction1(7, _c0, ctx.screenCount())));
      __advance(2);
      __textInterpolate(ctx.hint() || ctx.t()("roles.access.hint"));
      __advance();
      __conditional(ctx.accessGroups().length ? 9 : 10);
    }
  },
  dependencies: [IconComponent],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".access-groups[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 14px 24px;\n        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n      }\n      .access-chip[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        border-radius: 999px;\n        background: var(--%NS%v2-sauge);\n        padding: 5px 12px;\n        font-size: 13px;\n        font-weight: 700;\n        color: var(--%NS%v2-vert-pousse);\n      }\n      .framed[_ngcontent-%COMP%] {\n        border-radius: 24px;\n        border: 1px solid var(--%NS%v2-bord-carte);\n        background: var(--%NS%v2-blanc);\n        padding: 20px;\n      }\n      .plain[_ngcontent-%COMP%] {\n        border-radius: 18px;\n        background: var(--%NS%v2-creme);\n        padding: 16px;\n      }"]
}), _a);

export { RoleAccessPreviewComponent as R };
//# sourceMappingURL=role-access-preview.component-CIV_Ci6R.mjs.map

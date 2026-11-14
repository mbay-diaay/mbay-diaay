import { i as inject, c as computed, ɵ as __defineComponent, d as RouterLink, f as __elementStart, g as __text, h as __elementEnd, b as __element, m as __repeaterCreate, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, v as __repeater, w as __nextContext, t as __styleProp, z as __classProp } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, j as nf, i as inScope } from './locale.service-c0QhtcVY.mjs';
import { Q as QUALITY_SECTIONS, q as qualityCounts } from './quality-nav-DwckdAsn.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { g as StatCardsComponent } from './ui-DDO8FoUF.mjs';
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
var _forTrack0 = ($index, $item) => $item.to;
function QualitePage_For_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 8)(1, "div", 9)(2, "span", 10);
    __element(3, "ui-icon", 11);
    __elementEnd();
    __elementStart(4, "span", 12)(5, "span", 13);
    __text(6);
    __elementEnd();
    __elementStart(7, "span", 14);
    __text(8);
    __elementEnd()()();
    __elementStart(9, "div")(10, "p", 15);
    __text(11);
    __elementEnd();
    __elementStart(12, "p", 16);
    __text(13);
    __elementEnd()();
    __elementStart(14, "span", 17);
    __text(15);
    __element(16, "ui-icon", 18);
    __elementEnd()();
  }
  if (rf & 2) {
    const section_r1 = ctx.$implicit;
    const ctx_r1 = __nextContext();
    __property("routerLink", section_r1.to);
    __advance(2);
    __styleProp("background", section_r1.bg)("color", section_r1.fg);
    __advance();
    __property("name", section_r1.icon)("size", 24);
    __advance(2);
    __classProp("zero", !section_r1.count);
    __advance();
    __textInterpolate(ctx_r1.nf.format(section_r1.count));
    __advance(2);
    __textInterpolate(ctx_r1.t()("qualite.v2.hub.toTreat"));
    __advance(3);
    __textInterpolate(ctx_r1.t()(section_r1.label));
    __advance(2);
    __textInterpolate(ctx_r1.t()(section_r1.desc));
    __advance(2);
    __textInterpolate(ctx_r1.t()("qualite.v2.hub.open"));
    __advance();
    __property("size", 18);
  }
}
var SECTION = {
  "/dashboard/qualite/doublons": {
    label: "qualite.nav.doublons",
    desc: "qualite.v2.hub.doublons",
    icon: "group",
    ...TONE.info
  },
  "/dashboard/qualite/alertes": {
    label: "qualite.nav.alertes",
    desc: "qualite.v2.hub.alertes",
    icon: "warning",
    ...TONE.attente
  },
  "/dashboard/qualite/corrections": {
    label: "qualite.nav.corrections",
    desc: "qualite.v2.hub.corrections",
    icon: "edit",
    ...TONE.culture
  }
};
var QualitePage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.nf = nf;
    this.hubPerm = computed(() => [...new Set(QUALITY_SECTIONS.map((s) => s.perm))], ...[]);
    this.sections = computed(() => {
      var _a2, _b;
      const perms = (_b = (_a2 = this.store.state().session) == null ? void 0 : _a2.permissions) != null ? _b : [];
      const q = qualityCounts(this.store.state());
      const count = {
        "/dashboard/qualite/doublons": q.doublons,
        "/dashboard/qualite/alertes": q.alertes,
        "/dashboard/qualite/corrections": q.corrections
      };
      return QUALITY_SECTIONS.filter((s) => perms.includes(s.perm)).map((s) => {
        var _a3;
        return {
          to: s.to,
          count: (_a3 = count[s.to]) != null ? _a3 : 0,
          ...SECTION[s.to]
        };
      });
    }, ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const s = this.store.state();
      const ps = inScope(s.producers.filter((p) => !p.mergedInto), s.session);
      const n = ps.length || 1;
      const k = (q) => ps.filter((p) => p.quality === q).length;
      const pct = (v) => `${Math.round(v / n * 100)} %`;
      const sub = t("qualite.v2.hub.sharesSub", { count: nf.format(ps.length) });
      return [
        {
          label: t("dashboard.quality.validated"),
          value: pct(k("valid\xE9")),
          sub: `${nf.format(k("valid\xE9"))} \xB7 ${sub}`,
          icon: "task_alt",
          bg: "",
          fg: ""
        },
        {
          label: t("dashboard.quality.toVerify"),
          value: nf.format(k("\xE0 v\xE9rifier")),
          sub: pct(k("\xE0 v\xE9rifier")),
          icon: "warning",
          ...TONE.attente
        },
        {
          label: t("dashboard.quality.duplicate"),
          value: nf.format(k("doublon")),
          sub: pct(k("doublon")),
          icon: "group",
          ...TONE.info
        },
        {
          label: t("dashboard.quality.invalid"),
          value: nf.format(k("invalide")),
          sub: pct(k("invalide")),
          icon: "close",
          ...TONE.erreur
        }
      ];
    }, ...[]);
  }
}, _a.\u0275fac = function QualitePage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-qualite-page"]],
  decls: 14,
  vars: 7,
  consts: [
    [
      3,
      "perm",
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
      "mono",
      "mt-8",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "rise",
      "mt-3",
      3,
      "stats"
    ],
    [
      1,
      "queues",
      "mt-8"
    ],
    [
      1,
      "queue",
      3,
      "routerLink"
    ],
    [
      1,
      "flex",
      "items-start",
      "justify-between",
      "gap-3"
    ],
    [1, "q-ico"],
    [
      3,
      "name",
      "size"
    ],
    [1, "text-right"],
    [
      1,
      "q-count",
      "block"
    ],
    [1, "sub"],
    [
      1,
      "text-[19px]",
      "font-extrabold",
      "tracking-[-0.01em]"
    ],
    [
      1,
      "sub",
      "mt-1",
      "text-[14px]"
    ],
    [
      1,
      "q-go",
      "mt-auto"
    ],
    [
      "name",
      "arrow_forward",
      3,
      "size"
    ]
  ],
  template: function QualitePage_Template(rf, ctx) {
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
      __elementStart(8, "h2", 5);
      __text(9);
      __elementEnd();
      __element(10, "ui-stat-cards", 6);
      __elementStart(11, "div", 7);
      __repeaterCreate(12, QualitePage_For_13_Template, 17, 15, "a", 8, _forTrack0);
      __elementEnd()();
    }
    if (rf & 2) {
      __property("perm", ctx.hubPerm())("area", ctx.t()("qualite.header.title"));
      __advance(3);
      __textInterpolate(ctx.t()("qualite.header.eyebrow"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("qualite.header.title"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("qualite.hub.intro"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("qualite.v2.hub.sharesTitle"), " ");
      __advance();
      __property("stats", ctx.stats());
      __advance(2);
      __repeater(ctx.sections());
    }
  },
  dependencies: [
    AppShellComponent,
    IconComponent,
    RouterLink,
    StatCardsComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".queues[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n        gap: 16px;\n      }\n      .queue[_ngcontent-%COMP%] {\n        display: flex;\n        flex-direction: column;\n        gap: 14px;\n        border-radius: 24px;\n        border: 1px solid var(--%NS%v2-bord-carte);\n        background: var(--%NS%v2-blanc);\n        padding: 22px;\n        transition:\n          transform 0.2s ease,\n          box-shadow 0.2s ease,\n          border-color 0.2s ease;\n      }\n      .queue[_ngcontent-%COMP%]:hover {\n        transform: translateY(-2px);\n        border-color: var(--%NS%v2-gris-trait);\n        box-shadow: var(--%NS%v2-ombre-flottant);\n      }\n      .queue[_ngcontent-%COMP%]:focus-visible {\n        outline: 2px solid var(--%NS%v2-foret);\n        outline-offset: 3px;\n      }\n      .q-ico[_ngcontent-%COMP%] {\n        display: grid;\n        height: 48px;\n        width: 48px;\n        place-items: center;\n        border-radius: 14px;\n      }\n      .q-count[_ngcontent-%COMP%] {\n        font-size: 40px;\n        font-weight: 800;\n        line-height: 1;\n        letter-spacing: -0.03em;\n        font-variant-numeric: tabular-nums;\n      }\n      .q-go[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        font-size: 14px;\n        font-weight: 800;\n        color: var(--%NS%v2-foret);\n      }\n      .queue[_ngcontent-%COMP%]:hover   .q-go[_ngcontent-%COMP%] {\n        gap: 10px;\n      }"]
}), _a);

export { QualitePage as default };
//# sourceMappingURL=qualite.page-Ce-P9W4Q.mjs.map

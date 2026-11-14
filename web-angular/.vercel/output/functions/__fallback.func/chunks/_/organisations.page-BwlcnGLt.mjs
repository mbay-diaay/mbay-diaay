import { i as inject, A as ActivatedRoute, F as signal, c as computed, ɵ as __defineComponent, f as __elementStart, g as __text, h as __elementEnd, b as __element, H as __listener, m as __repeaterCreate, j as __conditionalCreate, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, u as __attribute, v as __repeater, r as __pureFunction1, s as __conditional, L as __getCurrentView, w as __nextContext, z as __classProp, t as __styleProp, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { L as LocaleService, j as nf, i as inScope } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { T as TONE, i as initialsOf } from './v2-page.styles-DN_FuKKd.mjs';
import { e as detailFact, k as detailKpi, f as DetailModalComponent, P as PaginationComponent, g as StatCardsComponent } from './ui-DDO8FoUF.mjs';
import { G as GlobalFiltersComponent } from './global-filters.component-ncvklAvP.mjs';
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
import './lucide-angular-RJABeBQ2.mjs';
import 'clsx';
import 'tailwind-merge';
import 'date-fns';
import 'date-fns/locale';

var _a;
var _c0 = (a0) => ({ count: a0 });
var _c1 = (a0) => ({ name: a0 });
var _forTrack0 = ($index, $item) => $item.id;
function OrganisationsPage_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 16);
    __listener("click", function OrganisationsPage_For_15_Template_button_click_0_listener() {
      const typeButton_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.type.set(typeButton_r2.id));
    });
    __text(1);
    __elementStart(2, "span", 17);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const typeButton_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __classProp("on", ctx_r2.type() === typeButton_r2.id);
    __attribute("aria-checked", ctx_r2.type() === typeButton_r2.id);
    __advance();
    __textInterpolate1(" ", typeButton_r2.label);
    __advance();
    __classProp("zero", !typeButton_r2.count);
    __advance();
    __textInterpolate(ctx_r2.nf.format(typeButton_r2.count));
  }
}
function OrganisationsPage_Conditional_20_For_20_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 35);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const org_r5 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.nf.format(org_r5.toVerify));
  }
}
function OrganisationsPage_Conditional_20_For_20_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 36);
    __text(1, "0");
    __elementEnd();
  }
}
function OrganisationsPage_Conditional_20_For_20_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "tr", 23);
    __listener("click", function OrganisationsPage_Conditional_20_For_20_Template_tr_click_0_listener() {
      const org_r5 = __restoreView(_r4).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.detailId.set(org_r5.id));
    });
    __elementStart(1, "td", 24)(2, "span", 25)(3, "span", 26);
    __element(4, "ui-icon", 27);
    __elementEnd();
    __elementStart(5, "span", 28)(6, "span", 29);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 30);
    __text(9);
    __elementEnd()()()();
    __elementStart(10, "td")(11, "span", 31);
    __text(12);
    __elementEnd()();
    __elementStart(13, "td", 32);
    __text(14);
    __elementEnd();
    __elementStart(15, "td", 33);
    __text(16);
    __elementEnd();
    __elementStart(17, "td", 34);
    __text(18);
    __elementEnd();
    __elementStart(19, "td", 20);
    __conditionalCreate(20, OrganisationsPage_Conditional_20_For_20_Conditional_20_Template, 2, 1, "span", 35)(21, OrganisationsPage_Conditional_20_For_20_Conditional_21_Template, 2, 0, "span", 36);
    __elementEnd();
    __elementStart(22, "td")(23, "span", 37)(24, "button", 38);
    __listener("click", function OrganisationsPage_Conditional_20_For_20_Template_button_click_24_listener($event) {
      const org_r5 = __restoreView(_r4).$implicit;
      const ctx_r2 = __nextContext(2);
      $event.stopPropagation();
      return __resetView(ctx_r2.detailId.set(org_r5.id));
    });
    __element(25, "ui-icon", 39);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const org_r5 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(3);
    __styleProp("background", org_r5.tone.bg)("color", org_r5.tone.fg);
    __advance();
    __property("size", 18);
    __advance(3);
    __textInterpolate(org_r5.name);
    __advance();
    __classProp("zero", !org_r5.village);
    __advance();
    __textInterpolate(org_r5.village || "\u2014");
    __advance(2);
    __styleProp("background", org_r5.tone.bg)("color", org_r5.tone.fg);
    __advance();
    __textInterpolate((_a2 = org_r5.type) != null ? _a2 : ctx_r2.t()("organisations.filter.toQualify"));
    __advance();
    __property("title", org_r5.scoop);
    __advance();
    __textInterpolate1(" ", org_r5.scoop, " ");
    __advance();
    __classProp("zero", !org_r5.producers);
    __advance();
    __textInterpolate1(" ", ctx_r2.nf.format(org_r5.producers), " ");
    __advance();
    __classProp("zero", !org_r5.plots);
    __advance();
    __textInterpolate1(" ", ctx_r2.nf.format(org_r5.plots), " ");
    __advance(2);
    __conditional(org_r5.toVerify ? 20 : 21);
    __advance(4);
    __property("title", ctx_r2.t()("common.view"));
    __attribute("aria-label", ctx_r2.t()("organisations.view.aria", __pureFunction1(26, _c1, org_r5.name)));
    __advance();
    __property("size", 18);
  }
}
function OrganisationsPage_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 18)(1, "table", 19)(2, "thead")(3, "tr")(4, "th");
    __text(5);
    __elementEnd();
    __elementStart(6, "th");
    __text(7);
    __elementEnd();
    __elementStart(8, "th");
    __text(9);
    __elementEnd();
    __elementStart(10, "th", 20);
    __text(11);
    __elementEnd();
    __elementStart(12, "th", 20);
    __text(13);
    __elementEnd();
    __elementStart(14, "th", 20);
    __text(15);
    __elementEnd();
    __elementStart(16, "th", 20);
    __text(17);
    __elementEnd()()();
    __elementStart(18, "tbody");
    __repeaterCreate(19, OrganisationsPage_Conditional_20_For_20_Template, 26, 28, "tr", 21, _forTrack0);
    __elementEnd()()();
    __element(21, "ui-pagination", 22);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(5);
    __textInterpolate(ctx_r2.t()("organisations.col.org"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("organisations.col.type"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("organisations.col.scoop"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("organisations.col.producers"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("organisations.col.plots"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("producteurs.quality.\xE0 v\xE9rifier"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("organisations.col.actions"));
    __advance(2);
    __repeater(ctx_r2.pager.items());
    __advance(2);
    __property("pager", ctx_r2.pager);
  }
}
function OrganisationsPage_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 14)(1, "span", 40);
    __element(2, "ui-icon", 8);
    __elementEnd();
    __elementStart(3, "p", 41);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 42);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r2.t()("organisations.empty.none"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("organisations.empty.noneHint"));
  }
}
var UNQUALIFIED = "__aucun";
var ALL = "__tous";
var norm = (v) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
var typeTone = (type) => !type ? TONE.attente : type === "GIE" ? TONE.info : TONE.culture;
var OrganisationsPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.route = inject(ActivatedRoute);
    this.t = this.locale.t;
    this.nf = nf;
    this.q = signal("", ...[]);
    this.type = signal(ALL, ...[]);
    this.detailId = signal(null, ...[]);
    this.scoopFilter = toSignal(this.route.queryParamMap.pipe(map((m) => {
      var _a2;
      return (_a2 = m.get("scoop")) != null ? _a2 : "";
    })), { initialValue: "" });
    this.all = computed(() => {
      var _a2, _b, _c;
      const s = this.store.state();
      const scoop = this.scoopFilter();
      const producers = /* @__PURE__ */ new Map();
      const toVerify = /* @__PURE__ */ new Map();
      const ownerOrg = /* @__PURE__ */ new Map();
      for (const p of s.producers) {
        if (p.mergedInto) continue;
        producers.set(p.orgId, ((_a2 = producers.get(p.orgId)) != null ? _a2 : 0) + 1);
        if (p.quality === "\xE0 v\xE9rifier") toVerify.set(p.orgId, ((_b = toVerify.get(p.orgId)) != null ? _b : 0) + 1);
        ownerOrg.set(p.id, p.orgId);
      }
      const plots = /* @__PURE__ */ new Map();
      for (const pl of s.plots) {
        const org = ownerOrg.get(pl.producerId);
        if (org) plots.set(org, ((_c = plots.get(org)) != null ? _c : 0) + 1);
      }
      const scoopName = new Map(s.scoops.map((c) => [c.id, c.name]));
      return inScope(s.orgs, s.session).filter((o) => !scoop || o.scoopId === scoop).map((o) => {
        var _a3, _b2, _c2, _d;
        return {
          id: o.id,
          name: o.name,
          type: o.type,
          village: o.village,
          scoop: (_a3 = scoopName.get(o.scoopId)) != null ? _a3 : o.scoopId,
          tone: typeTone(o.type),
          producers: (_b2 = producers.get(o.id)) != null ? _b2 : 0,
          plots: (_c2 = plots.get(o.id)) != null ? _c2 : 0,
          toVerify: (_d = toVerify.get(o.id)) != null ? _d : 0
        };
      }).sort((a, b) => b.producers - a.producers);
    }, ...[]);
    this.typeButtons = computed(() => {
      var _a2;
      const t = this.t();
      const all = this.all();
      const counts = /* @__PURE__ */ new Map();
      let unqualified = 0;
      for (const o of all) if (o.type) counts.set(o.type, ((_a2 = counts.get(o.type)) != null ? _a2 : 0) + 1);
      else unqualified++;
      return [
        {
          id: ALL,
          label: t("producteurs.index.qualityAll"),
          count: all.length
        },
        ...[...counts].sort((a, b) => b[1] - a[1]).map(([id, count]) => ({
          id,
          label: id,
          count
        })),
        ...unqualified ? [{
          id: UNQUALIFIED,
          label: t("organisations.filter.toQualify"),
          count: unqualified
        }] : []
      ];
    }, ...[]);
    this.shown = computed(() => {
      const needle = norm(this.q().trim());
      const type = this.type();
      return this.all().filter((o) => {
        var _a2;
        return (type === ALL || (type === UNQUALIFIED ? !o.type : o.type === type)) && (!needle || norm(`${o.name} ${o.village} ${(_a2 = o.type) != null ? _a2 : ""}`).includes(needle));
      });
    }, ...[]);
    this.pager = createPager(() => this.shown());
    this.stats = computed(() => {
      const t = this.t();
      const all = this.all();
      const producers = all.reduce((n, o) => n + o.producers, 0);
      const plots = all.reduce((n, o) => n + o.plots, 0);
      const toVerify = all.reduce((n, o) => n + o.toVerify, 0);
      const types = new Set(all.map((o) => o.type).filter(Boolean)).size;
      const unqualified = all.filter((o) => !o.type).length;
      return [
        {
          label: t("organisations.stat.total"),
          value: nf.format(all.length),
          sub: t("organisations.stat.totalSub", { count: types }),
          icon: "hub",
          bg: "",
          fg: ""
        },
        {
          label: t("organisations.stat.producers"),
          value: nf.format(producers),
          sub: t("organisations.stat.producersSub", { avg: nf.format(Math.round(producers / (all.length || 1))) }),
          icon: "agriculture",
          ...TONE.succes
        },
        {
          label: t("organisations.stat.plots"),
          value: nf.format(plots),
          sub: t("organisations.stat.plotsSub", { count: nf.format(toVerify) }),
          icon: "landscape",
          ...TONE.info
        },
        {
          label: t("organisations.stat.toQualify"),
          value: nf.format(unqualified),
          sub: t("organisations.stat.toQualifySub"),
          icon: "warning",
          ...TONE.attente
        }
      ];
    }, ...[]);
    this.detail = computed(() => {
      var _a2, _b;
      const id = this.detailId();
      const o = id ? this.all().find((x) => x.id === id) : null;
      if (!o) return null;
      const t = this.t();
      const people = this.store.state().members.filter((m) => m.orgId === o.id).sort((a, b) => `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`));
      const memberTone = (st) => st === "membre" ? TONE.succes : st === "candidat" ? TONE.info : st === "suspendu" ? TONE.attente : TONE.neutre;
      return {
        title: o.name,
        subtitle: [o.village, o.scoop].filter(Boolean).join(" \xB7 "),
        icon: "hub",
        badges: [{
          label: (_a2 = o.type) != null ? _a2 : t("organisations.filter.toQualify"),
          ...o.tone
        }],
        kpis: [
          detailKpi(t("organisations.col.producers"), o.producers, "agriculture", TONE.succes),
          detailKpi(t("organisations.col.plots"), o.plots, "landscape", TONE.info),
          detailKpi(t("organisations.col.toVerify"), o.toVerify, "warning", TONE.attente)
        ],
        facts: [
          detailFact(t("organisations.col.type"), (_b = o.type) != null ? _b : t("organisations.filter.toQualify"), "hub", { tone: o.type ? void 0 : TONE.attente }),
          detailFact(t("producteurs.col.village"), o.village, "location_on"),
          detailFact(t("organisations.col.scoop"), o.scoop, "apartment", { wide: true })
        ],
        sections: [{
          title: t("cooperatives.fiche.detail.orgMembers"),
          icon: "group",
          count: people.length,
          empty: t("cooperatives.fiche.detail.orgMembersEmpty"),
          items: people.slice(0, 8).map((m) => ({
            label: `${m.firstName} ${m.lastName}`,
            sub: m.village,
            initials: initialsOf(`${m.firstName} ${m.lastName}`),
            badge: {
              label: t(`cooperatives.fiche.status.${m.status}`),
              ...memberTone(m.status)
            }
          })),
          more: Math.max(0, people.length - 8)
        }],
        link: ["/dashboard/organisations", o.id]
      };
    }, ...[]);
  }
}, _a.\u0275fac = function OrganisationsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-organisations-page"]],
  decls: 23,
  vars: 15,
  consts: [
    [
      "perm",
      "org.read",
      3,
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
      "on"
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
      "overflow-hidden"
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
    [
      3,
      "closed",
      "view"
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
    [1, "overflow-x-auto"],
    [
      1,
      "tbl",
      "min-w-[820px]"
    ],
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
    [1, "max-w-[280px]"],
    [
      1,
      "flex",
      "items-center",
      "gap-3"
    ],
    [
      1,
      "grid",
      "size-9",
      "shrink-0",
      "place-items-center",
      "rounded-[10px]"
    ],
    [
      "name",
      "hub",
      3,
      "size"
    ],
    [1, "min-w-0"],
    [
      1,
      "block",
      "truncate",
      "font-bold"
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
      "max-w-44",
      "truncate",
      "font-medium",
      3,
      "title"
    ],
    [
      1,
      "text-right",
      "font-extrabold",
      "tabular-nums"
    ],
    [
      1,
      "text-right",
      "font-semibold",
      "tabular-nums"
    ],
    [
      1,
      "badge",
      "tabular-nums",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
    ],
    [
      1,
      "zero",
      "font-semibold",
      "tabular-nums"
    ],
    [
      1,
      "flex",
      "justify-end"
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
      1,
      "text-[16px]",
      "font-extrabold"
    ],
    [1, "sub"]
  ],
  template: function OrganisationsPage_Template(rf, ctx) {
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
      __element(8, "ui-stat-cards", 5);
      __elementStart(9, "div", 6)(10, "label", 7);
      __element(11, "ui-icon", 8);
      __elementStart(12, "input", 9);
      __listener("input", function OrganisationsPage_Template_input_input_12_listener($event) {
        return ctx.q.set($event.target.value);
      });
      __elementEnd()();
      __elementStart(13, "div", 10);
      __repeaterCreate(14, OrganisationsPage_For_15_Template, 4, 7, "button", 11, _forTrack0);
      __elementEnd();
      __element(16, "app-global-filters");
      __elementEnd();
      __elementStart(17, "p", 12);
      __text(18);
      __elementEnd();
      __elementStart(19, "section", 13);
      __conditionalCreate(20, OrganisationsPage_Conditional_20_Template, 22, 8)(21, OrganisationsPage_Conditional_21_Template, 7, 3, "div", 14);
      __elementEnd();
      __elementStart(22, "ui-detail-modal", 15);
      __listener("closed", function OrganisationsPage_Template_ui_detail_modal_closed_22_listener() {
        return ctx.detailId.set(null);
      });
      __elementEnd()();
    }
    if (rf & 2) {
      __property("area", ctx.t()("organisations.area"));
      __advance(3);
      __textInterpolate(ctx.t()("organisations.eyebrow"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("organisations.title"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("organisations.lead"), " ");
      __advance();
      __property("stats", ctx.stats());
      __advance(3);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("organisations.search"))("value", ctx.q());
      __attribute("aria-label", ctx.t()("organisations.search"));
      __advance();
      __attribute("aria-label", ctx.t()("organisations.col.type"));
      __advance();
      __repeater(ctx.typeButtons());
      __advance(4);
      __textInterpolate1(" ", ctx.t()(ctx.shown().length > 1 ? "organisations.count.autre" : "organisations.count.un", __pureFunction1(13, _c0, ctx.nf.format(ctx.shown().length))), " ");
      __advance(2);
      __conditional(ctx.shown().length ? 20 : 21);
      __advance(2);
      __property("view", ctx.detail());
    }
  },
  dependencies: [
    GlobalFiltersComponent,
    AppShellComponent,
    IconComponent,
    DetailModalComponent,
    PaginationComponent,
    StatCardsComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }"]
}), _a);

export { OrganisationsPage as default };
//# sourceMappingURL=organisations.page-BwlcnGLt.mjs.map

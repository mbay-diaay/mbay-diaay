import { i as inject, R as Router, A as ActivatedRoute, F as signal, e as effect, c as computed, ɵ as __defineComponent, f as __elementStart, g as __text, h as __elementEnd, H as __listener, b as __element, m as __repeaterCreate, j as __conditionalCreate, n as __property, o as __advance, q as __textInterpolate1, u as __attribute, v as __repeater, r as __pureFunction1, s as __conditional, L as __getCurrentView, w as __nextContext, z as __classProp, p as __textInterpolate, N as __textInterpolate2, t as __styleProp, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { L as LocaleService, j as nf, p as maskPhone, A as can, M as AGE_BANDS, N as CROPS, a as ageAtMost, h as fmtDate, i as inScope, Q as ageBand, l as downloadCsv, o as actions, V as VILLAGES } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { i as initialsOf, T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { e as detailFact, k as detailKpi, M as ModalComponent, f as DetailModalComponent, P as PaginationComponent, S as SelectComponent, g as StatCardsComponent } from './ui-DDO8FoUF.mjs';
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
var _forTrack1 = ($index, $item) => $item.key;
function ProducteursPage_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 29);
    __listener("click", function ProducteursPage_For_21_Template_button_click_0_listener() {
      const qualityButton_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.setFilter("qualite", qualityButton_r2.id));
    });
    __text(1);
    __elementStart(2, "span", 30);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const qualityButton_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __classProp("on", ctx_r2.filters().qualite === qualityButton_r2.id);
    __attribute("aria-checked", ctx_r2.filters().qualite === qualityButton_r2.id);
    __advance();
    __textInterpolate1(" ", qualityButton_r2.label);
    __advance();
    __classProp("zero", !qualityButton_r2.count);
    __advance();
    __textInterpolate(ctx_r2.nf.format(qualityButton_r2.count));
  }
}
function ProducteursPage_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "ui-select", 31);
    __listener("valueChange", function ProducteursPage_For_25_Template_ui_select_valueChange_0_listener($event) {
      const filter_r5 = __restoreView(_r4).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.setFilter(filter_r5.key, $event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const filter_r5 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __property("label", filter_r5.label)("leadingIcon", filter_r5.icon)("options", filter_r5.options)("value", ctx_r2.filters()[filter_r5.key]);
  }
}
function ProducteursPage_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "button", 32);
    __listener("click", function ProducteursPage_Conditional_29_Template_button_click_0_listener() {
      __restoreView(_r6);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.resetFilters());
    });
    __element(1, "ui-icon", 33);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate2("", ctx_r2.t()("producteurs.index.reset"), " (", ctx_r2.activeCount(), ") ");
  }
}
function ProducteursPage_Conditional_31_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "li")(1, "button", 43);
    __listener("click", function ProducteursPage_Conditional_31_For_2_Template_button_click_1_listener() {
      const producer_r8 = __restoreView(_r7).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.openDetail(producer_r8.id));
    });
    __elementStart(2, "span", 44);
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 45)(5, "span", 46);
    __text(6);
    __elementEnd();
    __elementStart(7, "span", 47);
    __text(8);
    __elementEnd()();
    __elementStart(9, "span", 48);
    __text(10);
    __elementEnd()()();
  }
  if (rf & 2) {
    const producer_r8 = ctx.$implicit;
    const \u0275$index_67_r9 = ctx.$index;
    const ctx_r2 = __nextContext(2);
    __styleProp("border-top", \u0275$index_67_r9 === 0 ? "none" : "1px solid var(--v2-separateur)");
    __advance(3);
    __textInterpolate(ctx_r2.initials(producer_r8.firstName + " " + producer_r8.lastName));
    __advance(3);
    __textInterpolate2("", producer_r8.firstName, " ", producer_r8.lastName);
    __advance(2);
    __textInterpolate2("", producer_r8.village, " \xB7 ", ctx_r2.ageLabel(producer_r8.age));
    __advance();
    __styleProp("background", ctx_r2.quality[producer_r8.quality].bg)("color", ctx_r2.quality[producer_r8.quality].fg);
    __advance();
    __textInterpolate(ctx_r2.t()(ctx_r2.quality[producer_r8.quality].label));
  }
}
function ProducteursPage_Conditional_31_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "tr", 49);
    __listener("click", function ProducteursPage_Conditional_31_For_25_Template_tr_click_0_listener() {
      const producer_r11 = __restoreView(_r10).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.openDetail(producer_r11.id));
    });
    __elementStart(1, "td")(2, "span", 50)(3, "span", 44);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 2)(6, "span", 46);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 51);
    __text(9);
    __elementEnd()()()();
    __elementStart(10, "td", 52);
    __text(11);
    __elementStart(12, "span");
    __text(13);
    __elementEnd()();
    __elementStart(14, "td", 53);
    __text(15);
    __elementEnd();
    __elementStart(16, "td", 54);
    __text(17);
    __elementEnd();
    __elementStart(18, "td", 55);
    __text(19);
    __elementEnd();
    __elementStart(20, "td")(21, "span", 48);
    __text(22);
    __elementEnd()();
    __elementStart(23, "td")(24, "span", 48);
    __text(25);
    __elementEnd()();
    __elementStart(26, "td")(27, "span", 56)(28, "button", 57);
    __listener("click", function ProducteursPage_Conditional_31_For_25_Template_button_click_28_listener($event) {
      const producer_r11 = __restoreView(_r10).$implicit;
      const ctx_r2 = __nextContext(2);
      $event.stopPropagation();
      return __resetView(ctx_r2.openDetail(producer_r11.id));
    });
    __element(29, "ui-icon", 58);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const producer_r11 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(3);
    __styleProp("background", producer_r11.sex === "F" ? "var(--v2-culture-bg)" : "var(--v2-sauge)")("color", producer_r11.sex === "F" ? "var(--v2-culture-fg)" : "var(--v2-foret)");
    __advance();
    __textInterpolate(ctx_r2.initials(producer_r11.firstName + " " + producer_r11.lastName));
    __advance(3);
    __textInterpolate2("", producer_r11.firstName, " ", producer_r11.lastName);
    __advance(2);
    __textInterpolate(producer_r11.code);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()(producer_r11.sex === "F" ? "producteurs.sex.F" : "producteurs.sex.H"), " \xB7 ");
    __advance();
    __classProp("zero", producer_r11.age === null);
    __advance();
    __textInterpolate(ctx_r2.ageLabel(producer_r11.age));
    __advance(2);
    __textInterpolate(producer_r11.village);
    __advance();
    __classProp("zero", !ctx_r2.orgName(producer_r11.orgId));
    __advance();
    __textInterpolate1(" ", ctx_r2.orgName(producer_r11.orgId) || "\u2014", " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.store.phone(producer_r11.phone), " ");
    __advance(2);
    __styleProp("background", ctx_r2.status[producer_r11.status].bg)("color", ctx_r2.status[producer_r11.status].fg);
    __advance();
    __textInterpolate(ctx_r2.t()(ctx_r2.status[producer_r11.status].label));
    __advance(2);
    __styleProp("background", ctx_r2.quality[producer_r11.quality].bg)("color", ctx_r2.quality[producer_r11.quality].fg);
    __advance();
    __textInterpolate(ctx_r2.t()(ctx_r2.quality[producer_r11.quality].label));
    __advance(3);
    __property("title", ctx_r2.t()("common.view"));
    __attribute("aria-label", ctx_r2.t()("producteurs.index.view", __pureFunction1(30, _c1, producer_r11.firstName + " " + producer_r11.lastName)));
    __advance();
    __property("size", 18);
  }
}
function ProducteursPage_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ul", 34);
    __repeaterCreate(1, ProducteursPage_Conditional_31_For_2_Template, 11, 12, "li", 35, _forTrack0);
    __elementEnd();
    __elementStart(3, "div", 36)(4, "table", 37)(5, "thead")(6, "tr")(7, "th");
    __text(8);
    __elementEnd();
    __elementStart(9, "th");
    __text(10);
    __elementEnd();
    __elementStart(11, "th");
    __text(12);
    __elementEnd();
    __elementStart(13, "th", 38);
    __text(14);
    __elementEnd();
    __elementStart(15, "th", 39);
    __text(16);
    __elementEnd();
    __elementStart(17, "th");
    __text(18);
    __elementEnd();
    __elementStart(19, "th");
    __text(20);
    __elementEnd();
    __elementStart(21, "th", 40);
    __text(22);
    __elementEnd()()();
    __elementStart(23, "tbody");
    __repeaterCreate(24, ProducteursPage_Conditional_31_For_25_Template, 30, 32, "tr", 41, _forTrack0);
    __elementEnd()()();
    __element(26, "ui-pagination", 42);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __repeater(ctx_r2.pager.items());
    __advance(7);
    __textInterpolate(ctx_r2.t()("producteurs.index.colProducer"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("producteurs.index.colSexAge"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("producteurs.col.village"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("producteurs.col.organisation"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("producteurs.col.phone"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("producteurs.col.status"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("producteurs.col.quality"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("producteurs.index.colActions"));
    __advance(2);
    __repeater(ctx_r2.pager.items());
    __advance(2);
    __property("pager", ctx_r2.pager);
  }
}
function ProducteursPage_Conditional_32_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "button", 32);
    __listener("click", function ProducteursPage_Conditional_32_Conditional_5_Template_button_click_0_listener() {
      __restoreView(_r12);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.resetFilters());
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("producteurs.index.reset"), " ");
  }
}
function ProducteursPage_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 24)(1, "span", 59);
    __element(2, "ui-icon", 13);
    __elementEnd();
    __elementStart(3, "p", 60);
    __text(4);
    __elementEnd();
    __conditionalCreate(5, ProducteursPage_Conditional_32_Conditional_5_Template, 2, 1, "button", 22);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("producteurs.index.empty"), " ");
    __advance();
    __conditional(ctx_r2.activeCount() > 0 ? 5 : -1);
  }
}
var ALL = "__all";
function parseProducteursQuery(m) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const get = (k) => m.get(k);
  return {
    q: (_a2 = get("q")) != null ? _a2 : "",
    village: (_b = get("village")) != null ? _b : ALL,
    sexe: (_c = get("sexe")) != null ? _c : ALL,
    age: (_d = get("age")) != null ? _d : ALL,
    qualite: (_e = get("qualite")) != null ? _e : ALL,
    culture: (_f = get("culture")) != null ? _f : ALL,
    scoop: (_g = get("scoop")) != null ? _g : "",
    campagne: (_h = get("campagne")) != null ? _h : ""
  };
}
var QUALITIES = [
  "valid\xE9",
  "\xE0 v\xE9rifier",
  "doublon",
  "invalide"
];
var QUALITY = {
  valid\u00E9: {
    label: "producteurs.quality.valid\xE9",
    ...TONE.succes
  },
  "\xE0 v\xE9rifier": {
    label: "producteurs.quality.\xE0 v\xE9rifier",
    ...TONE.attente
  },
  doublon: {
    label: "producteurs.quality.doublon",
    ...TONE.info
  },
  invalide: {
    label: "producteurs.quality.invalide",
    ...TONE.erreur
  }
};
var STATUS = {
  recens\u00E9: {
    label: "producteurs.status.recens\xE9",
    ...TONE.neutre
  },
  membre: {
    label: "producteurs.status.membre",
    ...TONE.culture
  }
};
var ProducteursPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.snackbar = inject(SnackbarService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.t = this.locale.t;
    this.nf = nf;
    this.maskPhone = maskPhone;
    this.initials = initialsOf;
    this.quality = QUALITY;
    this.status = STATUS;
    this.queryState = toSignal(this.route.queryParamMap.pipe(map(parseProducteursQuery)), { initialValue: parseProducteursQuery(this.route.snapshot.queryParamMap) });
    this.q = signal(this.queryState().q, ...[]);
    this.exportOpen = signal(false, ...[]);
    this.filters = signal({
      village: this.queryState().village,
      sexe: this.queryState().sexe,
      age: this.queryState().age,
      qualite: this.queryState().qualite,
      culture: this.queryState().culture
    }, ...[]);
    this._syncFromUrl = effect(() => {
      const s = this.queryState();
      this.q.set(s.q);
      this.filters.set({
        village: s.village,
        sexe: s.sexe,
        age: s.age,
        qualite: s.qualite,
        culture: s.culture
      });
    }, ...[]);
    this.nominatif = computed(() => {
      const session = this.store.state().session;
      return session ? can(session, "producer.export_nominatif") : false;
    }, ...[]);
    this.exportDesc = computed(() => this.t()(this.nominatif() ? "producteurs.index.exportNominatifDesc" : "producteurs.index.exportAnonymiseDesc", { total: nf.format(this.rows().length) }), ...[]);
    this.filterDefs = computed(() => {
      const t = this.t();
      const def = (key, label, icon, opts) => ({
        key,
        label,
        icon,
        options: [{
          value: ALL,
          label: t("producteurs.index.filterAll", { label })
        }, ...opts.map(([value, l]) => ({
          value,
          label: l
        }))]
      });
      return [
        def("village", t("producteurs.col.village"), "location_on", VILLAGES.map((v) => [v, v])),
        def("sexe", t("producteurs.col.sex"), "person", [["F", t("producteurs.sex.F")], ["H", t("producteurs.sex.H")]]),
        def("age", t("producteurs.col.age"), "calendar_today", AGE_BANDS.map((a) => [a, t("producteurs.index.ageBand", { band: a })])),
        def("culture", t("producteurs.col.crop"), "grass", CROPS.map((c) => [c, c]))
      ];
    }, ...[]);
    this.beforeQuality = computed(() => this.filterRows(true), ...[]);
    this.qualityButtons = computed(() => {
      const t = this.t();
      const base = this.beforeQuality();
      return [{
        id: ALL,
        label: t("producteurs.index.qualityAll"),
        count: base.length
      }, ...QUALITIES.map((q) => ({
        id: q,
        label: t(QUALITY[q].label),
        count: base.filter((p) => p.quality === q).length
      }))];
    }, ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const rows = this.rows();
      const n = rows.length || 1;
      const pct = (k) => Math.round(k / n * 100);
      const youthAge = this.store.state().youthMaxAge;
      const members = rows.filter((p) => p.status === "membre").length;
      const women = rows.filter((p) => p.sex === "F").length;
      const men = rows.filter((p) => p.sex === "H").length;
      const youth = rows.filter((p) => ageAtMost(p.age, youthAge)).length;
      const validated = rows.filter((p) => p.quality === "valid\xE9").length;
      const toCheck = rows.filter((p) => p.quality === "\xE0 v\xE9rifier").length;
      return [
        {
          label: t("producteurs.index.stat.total"),
          value: nf.format(rows.length),
          sub: t("producteurs.index.stat.totalSub", {
            members: nf.format(members),
            census: nf.format(rows.length - members)
          }),
          icon: "agriculture",
          bg: "",
          fg: ""
        },
        {
          label: t("producteurs.index.stat.men"),
          value: nf.format(men),
          sub: t("producteurs.index.stat.shareSub", { pct: pct(men) }),
          icon: "person",
          ...TONE.info
        },
        {
          label: t("producteurs.index.stat.women"),
          value: nf.format(women),
          sub: t("producteurs.index.stat.shareSub", { pct: pct(women) }),
          icon: "female",
          ...TONE.culture
        },
        {
          label: t("producteurs.index.stat.youth"),
          value: nf.format(youth),
          sub: t("producteurs.index.stat.youthSub", {
            age: youthAge,
            pct: pct(youth)
          }),
          icon: "grass",
          ...TONE.attente
        },
        {
          label: t("producteurs.index.stat.validated"),
          value: `${pct(validated)} %`,
          sub: t("producteurs.index.stat.validatedSub", { count: nf.format(toCheck) }),
          icon: "task_alt",
          ...TONE.succes
        }
      ];
    }, ...[]);
    this.activeCount = computed(() => Object.values(this.filters()).filter((v) => v !== ALL).length, ...[]);
    this.rows = computed(() => this.filterRows(false), ...[]);
    this.pager = createPager(() => this.rows());
    this.detailId = signal(null, ...[]);
    this.detail = computed(() => {
      const id = this.detailId();
      if (!id) return null;
      const s = this.store.state();
      const p = s.producers.find((x) => x.id === id);
      if (!p) return null;
      const t = this.t();
      const plots = s.plots.filter((pl) => pl.producerId === p.id);
      const area = plots.reduce((sum, pl) => sum + (pl.measured || pl.declared || 0), 0);
      const scoop = s.scoops.find((c) => c.id === p.scoopId);
      const org = this.orgName(p.orgId);
      const crops = [...p.crops].sort((a, b) => b.campaign.localeCompare(a.campaign));
      const q = QUALITY[p.quality];
      const st = STATUS[p.status];
      return {
        title: `${p.firstName} ${p.lastName}`,
        subtitle: [p.code, p.village].filter(Boolean).join(" \xB7 "),
        icon: "agriculture",
        badges: [{
          label: t(st.label),
          bg: st.bg,
          fg: st.fg
        }, {
          label: t(q.label),
          bg: q.bg,
          fg: q.fg
        }],
        kpis: [
          detailKpi(t("producteurs.quick.plots"), plots.length, "landscape", TONE.info),
          detailKpi(t("producteurs.quick.area"), area, "square_foot", TONE.succes, t("producteurs.quick.areaValue", { area: area.toLocaleString(this.locale.locale() === "wo" ? "fr-SN" : "fr-FR", { maximumFractionDigits: 2 }) })),
          detailKpi(t("producteurs.quick.crops"), p.crops.length, "grass", TONE.culture)
        ],
        facts: [
          detailFact(t("producteurs.col.sex"), t(p.sex === "F" ? "producteurs.sex.F" : "producteurs.sex.H"), "person"),
          detailFact(t("producteurs.col.age"), p.age === null ? null : this.ageLabel(p.age), "calendar_today"),
          detailFact(t("producteurs.col.phone"), this.store.phone(p.phone) || null, "call"),
          detailFact(t("producteurs.col.village"), p.village, "location_on"),
          detailFact(t("producteurs.col.organisation"), org || null, "hub"),
          detailFact(t("producteurs.quick.cooperative"), scoop == null ? void 0 : scoop.name, "apartment"),
          detailFact(t("producteurs.quick.enumerator"), p.enumerator, "badge"),
          detailFact(t("producteurs.quick.createdAt"), p.createdAt ? fmtDate(p.createdAt) : null, "event_note")
        ],
        sections: [{
          title: t("producteurs.quick.crops"),
          icon: "grass",
          count: crops.length,
          empty: t("producteurs.quick.cropsEmpty"),
          items: crops.slice(0, 8).map((c) => ({
            label: c.crop,
            sub: t("producteurs.quick.cropSub", {
              campaign: c.campaign,
              area: c.area.toLocaleString("fr-FR", { maximumFractionDigits: 2 })
            }),
            initials: c.crop.slice(0, 2).toUpperCase()
          })),
          more: Math.max(0, crops.length - 8)
        }],
        link: ["/dashboard/producteurs", p.id]
      };
    }, ...[]);
  }
  /** Applique recherche, périmètre, en-tête (SCOOP / campagne) et filtres ; `skipQuality` pour les compteurs. */
  filterRows(skipQuality) {
    const s = this.store.state();
    const q = this.q().trim().toLowerCase();
    const f = this.filters();
    const url = this.queryState();
    return inScope(s.producers.filter((p) => !p.mergedInto), s.session).filter((p) => (!q || `${p.firstName} ${p.lastName} ${p.code}`.toLowerCase().includes(q)) && (!url.scoop || p.scoopId === url.scoop) && (!url.campagne || p.crops.some((c) => c.campaign === url.campagne)) && (f.village === ALL || p.village === f.village) && (f.sexe === ALL || p.sex === f.sexe) && (f.age === ALL || ageBand(p.age) === f.age) && (skipQuality || f.qualite === ALL || p.quality === f.qualite) && (f.culture === ALL || p.crops.some((c) => c.crop === f.culture)));
  }
  ageLabel(age) {
    return age === null ? "\u2014" : this.t()("cooperatives.fiche.detail.ageValue", { count: age });
  }
  openDetail(id) {
    this.detailId.set(id);
  }
  orgName(orgId) {
    var _a2, _b;
    if (!orgId) return "";
    return (_b = (_a2 = this.store.state().orgs.find((o) => o.id === orgId)) == null ? void 0 : _a2.name) != null ? _b : "";
  }
  patchQuery(patch) {
    this.pager.setPage(1);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: patch,
      queryParamsHandling: "merge",
      replaceUrl: true
    });
  }
  onSearch(value) {
    this.patchQuery({ q: value.trim() ? value : null });
  }
  setFilter(key, value) {
    this.patchQuery({ [key]: value === ALL ? null : value });
  }
  resetFilters() {
    this.patchQuery({
      village: null,
      sexe: null,
      age: null,
      qualite: null,
      culture: null
    });
  }
  doExport() {
    const rows = this.rows();
    const scoops = this.store.state().scoops;
    const nominatif = this.nominatif();
    const head = nominatif ? [
      "Code",
      "Pr\xE9nom",
      "Nom",
      "Sexe",
      "\xC2ge",
      "Village",
      "SCOOP",
      "Statut",
      "Qualit\xE9"
    ] : [
      "Code",
      "Sexe",
      "Tranche d'\xE2ge",
      "Village",
      "SCOOP",
      "Statut",
      "Qualit\xE9"
    ];
    const body = rows.map((p) => {
      var _a2, _b, _c;
      const sc = (_b = (_a2 = scoops.find((s) => s.id === p.scoopId)) == null ? void 0 : _a2.name) != null ? _b : "";
      return nominatif ? [
        p.code,
        p.firstName,
        p.lastName,
        p.sex,
        (_c = p.age) != null ? _c : "",
        p.village,
        sc,
        p.status,
        p.quality
      ] : [
        p.code,
        p.sex,
        ageBand(p.age),
        p.village,
        sc,
        p.status,
        p.quality
      ];
    });
    try {
      downloadCsv(`producteurs${nominatif ? "_nominatif" : ""}.csv`, [head, ...body]);
    } catch {
      this.snackbar.error(`${this.t()("common.exportError")} \xB7 ${this.t()("common.exportErrorDesc")}`);
      return;
    }
    actions.audit(nominatif ? "Export nominatif" : "Export anonymis\xE9", "Producteurs", `${rows.length} lignes (CSV)`);
    this.snackbar.success(`${this.t()("producteurs.index.exportReady")} \xB7 ${this.t()("producteurs.index.exportReadyDesc", { total: this.nf.format(rows.length) })}`);
    this.exportOpen.set(false);
  }
}, _a.\u0275fac = function ProducteursPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-producteurs-page"]],
  decls: 41,
  vars: 27,
  consts: [
    [
      "perm",
      "producer.read",
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
      "btn-primary",
      3,
      "click"
    ],
    [1, "btn-chip"],
    [
      "name",
      "download",
      3,
      "size"
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
      "card",
      "mt-6",
      "p-2"
    ],
    [
      1,
      "toolbar",
      "p-0"
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
      1,
      "filters",
      "mt-2"
    ],
    [3, "campaign"],
    [
      "variant",
      "compact",
      3,
      "label",
      "leadingIcon",
      "options",
      "value"
    ],
    [
      1,
      "mt-4",
      "flex",
      "min-h-6",
      "flex-wrap",
      "items-center",
      "justify-between",
      "gap-3"
    ],
    [
      "aria-live",
      "polite",
      1,
      "sub"
    ],
    [
      "type",
      "button",
      1,
      "reset"
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
      "icon",
      "download",
      3,
      "closed",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
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
      "variant",
      "compact",
      3,
      "valueChange",
      "label",
      "leadingIcon",
      "options",
      "value"
    ],
    [
      "type",
      "button",
      1,
      "reset",
      3,
      "click"
    ],
    [
      "name",
      "close",
      3,
      "size"
    ],
    [1, "md:hidden"],
    [3, "border-top"],
    [
      1,
      "hidden",
      "overflow-x-auto",
      "md:block"
    ],
    [
      1,
      "tbl",
      "min-w-[860px]"
    ],
    [
      1,
      "hidden",
      "xl:table-cell"
    ],
    [
      1,
      "hidden",
      "lg:table-cell"
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
      "type",
      "button",
      1,
      "row-link",
      "flex",
      "w-full",
      "items-center",
      "gap-3",
      "px-4",
      "py-3.5",
      "text-left",
      3,
      "click"
    ],
    [1, "avatar"],
    [
      1,
      "min-w-0",
      "flex-1"
    ],
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
    [
      1,
      "code",
      "block"
    ],
    [
      1,
      "whitespace-nowrap",
      "font-medium",
      "tabular-nums"
    ],
    [1, "font-medium"],
    [
      1,
      "hidden",
      "max-w-56",
      "truncate",
      "font-medium",
      "xl:table-cell"
    ],
    [
      1,
      "hidden",
      "whitespace-nowrap",
      "tabular-nums",
      "lg:table-cell",
      2,
      "color",
      "var(--v2-gris-texte)"
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
      "text-[15px]",
      "font-semibold",
      2,
      "color",
      "var(--v2-ardoise)"
    ]
  ],
  template: function ProducteursPage_Template(rf, ctx) {
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
      __elementStart(9, "button", 6);
      __listener("click", function ProducteursPage_Template_button_click_9_listener() {
        return ctx.exportOpen.set(true);
      });
      __text(10);
      __elementStart(11, "span", 7);
      __element(12, "ui-icon", 8);
      __elementEnd()()();
      __element(13, "ui-stat-cards", 9);
      __elementStart(14, "div", 10)(15, "div", 11)(16, "label", 12);
      __element(17, "ui-icon", 13);
      __elementStart(18, "input", 14);
      __listener("input", function ProducteursPage_Template_input_input_18_listener($event) {
        return ctx.onSearch($event.target.value);
      });
      __elementEnd()();
      __elementStart(19, "div", 15);
      __repeaterCreate(20, ProducteursPage_For_21_Template, 4, 7, "button", 16, _forTrack0);
      __elementEnd()();
      __elementStart(22, "div", 17);
      __element(23, "app-global-filters", 18);
      __repeaterCreate(24, ProducteursPage_For_25_Template, 1, 4, "ui-select", 19, _forTrack1);
      __elementEnd()();
      __elementStart(26, "div", 20)(27, "p", 21);
      __text(28);
      __elementEnd();
      __conditionalCreate(29, ProducteursPage_Conditional_29_Template, 3, 3, "button", 22);
      __elementEnd();
      __elementStart(30, "section", 23);
      __conditionalCreate(31, ProducteursPage_Conditional_31_Template, 27, 9)(32, ProducteursPage_Conditional_32_Template, 6, 3, "div", 24);
      __elementEnd();
      __elementStart(33, "ui-detail-modal", 25);
      __listener("closed", function ProducteursPage_Template_ui_detail_modal_closed_33_listener() {
        return ctx.detailId.set(null);
      });
      __elementEnd();
      __elementStart(34, "ui-modal", 26);
      __listener("closed", function ProducteursPage_Template_ui_modal_closed_34_listener() {
        return ctx.exportOpen.set(false);
      });
      __elementStart(35, "button", 27);
      __listener("click", function ProducteursPage_Template_button_click_35_listener() {
        return ctx.exportOpen.set(false);
      });
      __text(36);
      __elementEnd();
      __elementStart(37, "button", 28);
      __listener("click", function ProducteursPage_Template_button_click_37_listener() {
        return ctx.doExport();
      });
      __text(38);
      __elementStart(39, "span", 7);
      __element(40, "ui-icon", 8);
      __elementEnd()()()();
    }
    if (rf & 2) {
      __property("area", ctx.t()("producteurs.area"));
      __advance(4);
      __textInterpolate1(" ", ctx.t()("producteurs.index.eyebrow"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("producteurs.index.title"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("producteurs.index.lead"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("producteurs.index.exportCsv"), " ");
      __advance(2);
      __property("size", 20);
      __advance();
      __property("stats", ctx.stats());
      __advance(4);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("producteurs.index.searchPlaceholder"))("value", ctx.q());
      __attribute("aria-label", ctx.t()("producteurs.index.searchLabel"));
      __advance();
      __attribute("aria-label", ctx.t()("producteurs.col.quality"));
      __advance();
      __repeater(ctx.qualityButtons());
      __advance(3);
      __property("campaign", true);
      __advance();
      __repeater(ctx.filterDefs());
      __advance(4);
      __textInterpolate1(" ", ctx.t()(ctx.rows().length > 1 ? "producteurs.index.count.autre" : "producteurs.index.count.un", __pureFunction1(25, _c0, ctx.nf.format(ctx.rows().length))), " ");
      __advance();
      __conditional(ctx.activeCount() > 0 ? 29 : -1);
      __advance(2);
      __conditional(ctx.rows().length ? 31 : 32);
      __advance(2);
      __property("view", ctx.detail());
      __advance();
      __property("open", ctx.exportOpen())("title", ctx.nominatif() ? ctx.t()("producteurs.index.exportNominatif") : ctx.t()("producteurs.index.exportAnonymise"))("description", ctx.exportDesc())("width", 520)("closeLabel", ctx.t()("common.close"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("producteurs.index.cancel"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("producteurs.index.export"), " ");
      __advance(2);
      __property("size", 18);
    }
  },
  dependencies: [
    GlobalFiltersComponent,
    AppShellComponent,
    IconComponent,
    ModalComponent,
    DetailModalComponent,
    PaginationComponent,
    SelectComponent,
    StatCardsComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".filters[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));\n        gap: 8px;\n      }\n      .reset[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        font-size: 14px;\n        font-weight: 800;\n        color: var(--%NS%v2-foret);\n        cursor: pointer;\n      }\n      .reset[_ngcontent-%COMP%]:hover {\n        text-decoration: underline;\n      }\n      .code[_ngcontent-%COMP%] {\n        font-family: var(--%NS%v2-font-mono);\n        font-size: 11.5px;\n        font-weight: 600;\n        color: var(--%NS%v2-gris-texte);\n      }"]
}), _a);

export { ProducteursPage as default };
//# sourceMappingURL=producteurs.page-C81NxAE4.mjs.map

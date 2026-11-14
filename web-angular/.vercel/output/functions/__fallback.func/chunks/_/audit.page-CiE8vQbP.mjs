import { i as inject, F as signal, c as computed, ɵ as __defineComponent, f as __elementStart, g as __text, h as __elementEnd, H as __listener, b as __element, m as __repeaterCreate, j as __conditionalCreate, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, u as __attribute, z as __classProp, v as __repeater, s as __conditional, L as __getCurrentView, w as __nextContext, t as __styleProp, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, j as nf, f as fmtDateTime, k as scopedAudit, l as downloadCsv, o as actions } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { i as initialsOf, T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { e as detailFact, f as DetailModalComponent, P as PaginationComponent, S as SelectComponent, g as StatCardsComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';
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
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function AuditPage_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 30);
    __listener("click", function AuditPage_For_24_Template_button_click_0_listener() {
      const familyDef_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.family.set(familyDef_r2.key));
    });
    __text(1);
    __elementStart(2, "span", 16);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const familyDef_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __classProp("on", ctx_r2.family() === familyDef_r2.key);
    __property("title", ctx_r2.t()(familyDef_r2.hint));
    __attribute("aria-checked", ctx_r2.family() === familyDef_r2.key);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()(familyDef_r2.label));
    __advance();
    __classProp("zero", !ctx_r2.familyCount(familyDef_r2.key));
    __advance();
    __textInterpolate(ctx_r2.nf.format(ctx_r2.familyCount(familyDef_r2.key)));
  }
}
function AuditPage_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "button", 31);
    __listener("click", function AuditPage_Conditional_37_Template_button_click_0_listener() {
      __restoreView(_r4);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.reset());
    });
    __element(1, "ui-icon", 32);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __property("size", 14);
    __advance();
    __textInterpolate1("", ctx_r2.t()("audit.reset"), " ");
  }
}
function AuditPage_Conditional_39_For_18_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 44);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __attribute("aria-label", ctx_r2.t()("audit.sensitiveAria"));
    __advance();
    __textInterpolate(ctx_r2.t()("audit.sheet.sensitive"));
  }
}
function AuditPage_Conditional_39_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "tr", 38);
    __listener("click", function AuditPage_Conditional_39_For_18_Template_tr_click_0_listener() {
      const entry_r6 = __restoreView(_r5).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.detailId.set(entry_r6.id));
    });
    __elementStart(1, "td", 39);
    __text(2);
    __elementEnd();
    __elementStart(3, "td")(4, "span", 40)(5, "span", 41);
    __element(6, "ui-icon", 42);
    __elementEnd();
    __elementStart(7, "span", 43);
    __text(8);
    __elementEnd();
    __conditionalCreate(9, AuditPage_Conditional_39_For_18_Conditional_9_Template, 2, 2, "span", 44);
    __elementEnd()();
    __elementStart(10, "td")(11, "span", 45)(12, "span", 46);
    __text(13);
    __elementEnd();
    __elementStart(14, "span", 47);
    __text(15);
    __elementEnd()()();
    __elementStart(16, "td", 48);
    __text(17);
    __elementEnd();
    __elementStart(18, "td", 49);
    __text(19);
    __elementEnd();
    __elementStart(20, "td")(21, "span", 50)(22, "button", 51);
    __listener("click", function AuditPage_Conditional_39_For_18_Template_button_click_22_listener($event) {
      const entry_r6 = __restoreView(_r5).$implicit;
      const ctx_r2 = __nextContext(2);
      $event.stopPropagation();
      return __resetView(ctx_r2.detailId.set(entry_r6.id));
    });
    __element(23, "ui-icon", 52);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const entry_r6 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    const entryFamily_r7 = ctx_r2.fam(entry_r6);
    __classProp("sensitive", ctx_r2.isSensitive(entry_r6));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.fmtDateTime(entry_r6.at), " ");
    __advance(3);
    __styleProp("background", entryFamily_r7.bg)("color", entryFamily_r7.fg);
    __advance();
    __property("name", entryFamily_r7.icon)("size", 16);
    __advance(2);
    __textInterpolate(entry_r6.action);
    __advance();
    __conditional(ctx_r2.isSensitive(entry_r6) ? 9 : -1);
    __advance(4);
    __textInterpolate(ctx_r2.initials(entry_r6.user));
    __advance(2);
    __textInterpolate(entry_r6.user);
    __advance();
    __property("title", entry_r6.entity);
    __advance();
    __textInterpolate1(" ", entry_r6.entity, " ");
    __advance();
    __property("title", entry_r6.detail);
    __advance();
    __textInterpolate1(" ", entry_r6.detail || "\u2014", " ");
    __advance(3);
    __property("title", ctx_r2.t()("common.view"));
    __attribute("aria-label", ctx_r2.t()("common.viewDetail"));
    __advance();
    __property("size", 18);
  }
}
function AuditPage_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 33)(1, "table", 34)(2, "thead")(3, "tr")(4, "th");
    __text(5);
    __elementEnd();
    __elementStart(6, "th");
    __text(7);
    __elementEnd();
    __elementStart(8, "th");
    __text(9);
    __elementEnd();
    __elementStart(10, "th");
    __text(11);
    __elementEnd();
    __elementStart(12, "th");
    __text(13);
    __elementEnd();
    __elementStart(14, "th", 35);
    __text(15);
    __elementEnd()()();
    __elementStart(16, "tbody");
    __repeaterCreate(17, AuditPage_Conditional_39_For_18_Template, 24, 20, "tr", 36, _forTrack1);
    __elementEnd()()();
    __element(19, "ui-pagination", 37);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(5);
    __textInterpolate(ctx_r2.t()("audit.col.date"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("audit.col.action"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("audit.col.user"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("audit.col.entity"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("audit.col.detail"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("organisations.col.actions"));
    __advance(2);
    __repeater(ctx_r2.pager.items());
    __advance(2);
    __property("pager", ctx_r2.pager);
  }
}
function AuditPage_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 28)(1, "span", 53);
    __element(2, "ui-icon", 12);
    __elementEnd();
    __elementStart(3, "p", 54);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 55);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate(ctx_r2.t()("audit.empty.title"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("audit.empty.text"));
  }
}
var SENSITIVE = /Révélation|Export|Sauvegarde|Restauration|Téléchargement|Fusion|Révocation|Déconnexion forcée/i;
var FAMILIES = [
  {
    key: "sensibles",
    label: "audit.family.sensibles",
    hint: "audit.family.sensibles.hint",
    test: SENSITIVE,
    icon: "warning",
    ...TONE.erreur
  },
  {
    key: "qualite",
    label: "audit.family.qualite",
    hint: "audit.family.qualite.hint",
    test: /doublon|fusion|alerte|correction|parcelle|reprise|classement|approbation|refus/i,
    icon: "fact_check",
    ...TONE.attente
  },
  {
    key: "donnees",
    label: "audit.family.donnees",
    hint: "audit.family.donnees.hint",
    test: /Import|Modification|Qualification|Référentiel/i,
    icon: "dataset",
    ...TONE.info
  },
  {
    key: "admin",
    label: "audit.family.admin",
    hint: "audit.family.admin.hint",
    test: /utilisateur|appareil|liaison|compte|Réactivation|Désactivation|Déconnexion forcée|Révocation|Renommage|Resynchronisation|correspondance/i,
    icon: "manage_accounts",
    ...TONE.culture
  },
  {
    key: "connexions",
    label: "audit.family.connexions",
    hint: "audit.family.connexions.hint",
    test: /Connexion/i,
    icon: "logout",
    ...TONE.neutre
  }
];
var familyOf = (a) => {
  var _a2;
  return (_a2 = FAMILIES.find((f) => f.test.test(a.action))) != null ? _a2 : FAMILIES[2];
};
var ALL = "__all";
var norm = (v) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
var AuditPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.snackbar = inject(SnackbarService);
    this.t = this.locale.t;
    this.nf = nf;
    this.fmtDateTime = fmtDateTime;
    this.initials = initialsOf;
    this.families = FAMILIES;
    this.all = ALL;
    this.perms = ["audit.read", "audit.read.scoop"];
    this.q = signal("", ...[]);
    this.family = signal(ALL, ...[]);
    this.user = signal(ALL, ...[]);
    this.from = signal("", ...[]);
    this.to = signal("", ...[]);
    this.desc = signal(true, ...[]);
    this.detailId = signal(null, ...[]);
    this.description = computed(() => {
      var _a2;
      return this.t()(((_a2 = this.store.state().session) == null ? void 0 : _a2.permissions.includes("audit.read")) ? "audit.description.platform" : "audit.description.scoop");
    }, ...[]);
    this.rows = computed(() => scopedAudit(this.store.state().audit, this.store.state().session), ...[]);
    this.base = computed(() => {
      const needle = norm(this.q().trim());
      const user = this.user();
      const from = this.from();
      const to = this.to();
      return this.rows().filter((a) => (user === ALL || a.user === user) && (!from || a.at.slice(0, 10) >= from) && (!to || a.at.slice(0, 10) <= to) && (!needle || norm(`${a.action} ${a.user} ${a.entity} ${a.detail}`).includes(needle)));
    }, ...[]);
    this.shown = computed(() => {
      const fam = this.family();
      const dir = this.desc() ? -1 : 1;
      return this.base().filter((a) => fam === ALL || familyOf(a).key === fam).sort((a, b) => dir * a.at.localeCompare(b.at));
    }, ...[]);
    this.pager = createPager(() => this.shown());
    this.filtered = computed(() => !!this.q().trim() || this.family() !== ALL || this.user() !== ALL || !!this.from() || !!this.to(), ...[]);
    this.userOptions = computed(() => [{
      value: ALL,
      label: this.t()("audit.family.all")
    }, ...[...new Set(this.rows().map((a) => a.user))].sort((a, b) => a.localeCompare(b)).map((u) => ({
      value: u,
      label: u
    }))], ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const all = this.rows();
      const shown = this.shown();
      const last = [...all].sort((a, b) => b.at.localeCompare(a.at))[0];
      return [
        {
          label: t("audit.kpi.entries"),
          value: nf.format(shown.length),
          sub: t("audit.kpi.entriesOf", { total: nf.format(all.length) }),
          icon: "receipt_long",
          bg: "",
          fg: ""
        },
        {
          label: t("audit.kpi.users"),
          value: nf.format(new Set(shown.map((a) => a.user)).size),
          sub: t("audit.kpi.usersSub"),
          icon: "group",
          ...TONE.info
        },
        {
          label: t("audit.kpi.sensitive"),
          value: nf.format(shown.filter((a) => SENSITIVE.test(a.action)).length),
          sub: t("audit.kpi.sensitiveSub"),
          icon: "warning",
          ...TONE.erreur
        },
        {
          label: t("audit.kpi.last"),
          value: last ? fmtDateTime(last.at).split(",")[0] : "\u2014",
          sub: last ? `${last.action} \xB7 ${last.user}` : t("audit.kpi.none"),
          icon: "event_note",
          ...TONE.succes
        }
      ];
    }, ...[]);
    this.detail = computed(() => {
      const id = this.detailId();
      const a = id ? this.rows().find((x) => x.id === id) : null;
      if (!a) return null;
      const t = this.t();
      const f = familyOf(a);
      const related = this.rows().filter((x) => x.id !== a.id && x.entity === a.entity).sort((x, y) => y.at.localeCompare(x.at));
      return {
        title: a.action,
        subtitle: t("audit.sheet.sentence", {
          user: a.user,
          action: a.action,
          entity: a.entity,
          date: fmtDateTime(a.at)
        }),
        icon: f.icon,
        badges: [{
          label: t(f.label),
          bg: f.bg,
          fg: f.fg
        }, ...this.isSensitive(a) ? [{
          label: t("audit.sheet.sensitive"),
          ...TONE.erreur
        }] : []],
        kpis: [],
        facts: [
          detailFact(t("audit.sheet.when"), fmtDateTime(a.at), "calendar_today"),
          detailFact(t("audit.sheet.who"), a.user, "person"),
          detailFact(t("audit.sheet.object"), a.entity, "description", { wide: true }),
          detailFact(t("audit.sheet.what"), a.detail || null, "fact_check", { wide: true })
        ],
        sections: [{
          title: t("audit.sheet.related"),
          icon: "event_note",
          count: related.length,
          empty: t("audit.sheet.noRelated"),
          items: related.slice(0, 8).map((x) => ({
            label: x.action,
            sub: `${fmtDateTime(x.at)} \xB7 ${x.user}`,
            initials: initialsOf(x.user)
          })),
          more: Math.max(0, related.length - 8)
        }],
        link: null
      };
    }, ...[]);
  }
  familyCount(key) {
    return this.base().filter((a) => familyOf(a).key === key).length;
  }
  fam(a) {
    return familyOf(a);
  }
  isSensitive(a) {
    return SENSITIVE.test(a.action);
  }
  reset() {
    this.q.set("");
    this.family.set(ALL);
    this.user.set(ALL);
    this.from.set("");
    this.to.set("");
  }
  exportCsv() {
    const rows = this.shown();
    try {
      downloadCsv(`journal_audit_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`, [[
        "Date",
        "Utilisateur",
        "Action",
        "Entit\xE9",
        "D\xE9tail"
      ], ...rows.map((a) => [
        a.at,
        a.user,
        a.action,
        a.entity,
        a.detail
      ])]);
    } catch {
      this.snackbar.error(this.t()("common.exportError"));
      return;
    }
    actions.audit("Export", "Journal d'audit", `${rows.length} entr\xE9es (CSV)`);
    this.snackbar.success(`${this.t()("audit.exported")} \xB7 ${this.t()(rows.length > 1 ? "audit.exportedCount.autre" : "audit.exportedCount.un", { count: nf.format(rows.length) })}`);
  }
}, _a.\u0275fac = function AuditPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-audit-page"]],
  decls: 42,
  vars: 34,
  consts: [
    [
      3,
      "perm",
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
      "btn-ghost",
      3,
      "click",
      "disabled"
    ],
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
      "click"
    ],
    [1, "n"],
    [
      "type",
      "button",
      "role",
      "radio",
      3,
      "on",
      "title"
    ],
    [
      1,
      "filters",
      "mt-2"
    ],
    [
      "variant",
      "compact",
      "leadingIcon",
      "person",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      "type",
      "date",
      "icon",
      "calendar_today",
      3,
      "valueChange",
      "label",
      "value"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      2,
      "height",
      "52px",
      3,
      "click"
    ],
    [
      "name",
      "event_note",
      3,
      "size"
    ],
    [
      1,
      "mt-4",
      "flex",
      "flex-wrap",
      "items-center",
      "gap-2"
    ],
    [
      "aria-live",
      "polite",
      1,
      "sub"
    ],
    [
      1,
      "tabular-nums",
      2,
      "color",
      "var(--v2-encre)"
    ],
    [
      "type",
      "button",
      1,
      "reveal"
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
      "click",
      "title"
    ],
    [
      "type",
      "button",
      1,
      "reveal",
      3,
      "click"
    ],
    [
      "name",
      "close",
      3,
      "size"
    ],
    [1, "overflow-x-auto"],
    [
      1,
      "tbl",
      "min-w-[900px]"
    ],
    [1, "text-right"],
    [
      1,
      "row-link",
      3,
      "sensitive"
    ],
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
    [
      1,
      "whitespace-nowrap",
      "font-medium",
      "tabular-nums"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2.5"
    ],
    [1, "fam"],
    [
      3,
      "name",
      "size"
    ],
    [1, "font-bold"],
    [
      1,
      "badge",
      2,
      "background",
      "var(--v2-erreur-bg)",
      "color",
      "var(--v2-erreur-fg)"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2"
    ],
    [
      1,
      "avatar",
      2,
      "height",
      "28px",
      "width",
      "28px",
      "font-size",
      "10px"
    ],
    [1, "font-medium"],
    [
      1,
      "max-w-56",
      "truncate",
      "font-medium",
      3,
      "title"
    ],
    [
      1,
      "max-w-64",
      "truncate",
      2,
      "color",
      "var(--v2-gris-texte)",
      3,
      "title"
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
    [
      1,
      "sub",
      "max-w-md"
    ]
  ],
  template: function AuditPage_Template(rf, ctx) {
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
      __listener("click", function AuditPage_Template_button_click_9_listener() {
        return ctx.exportCsv();
      });
      __element(10, "ui-icon", 7);
      __text(11);
      __elementEnd()();
      __element(12, "ui-stat-cards", 8);
      __elementStart(13, "div", 9)(14, "div", 10)(15, "label", 11);
      __element(16, "ui-icon", 12);
      __elementStart(17, "input", 13);
      __listener("input", function AuditPage_Template_input_input_17_listener($event) {
        return ctx.q.set($event.target.value);
      });
      __elementEnd()();
      __elementStart(18, "div", 14)(19, "button", 15);
      __listener("click", function AuditPage_Template_button_click_19_listener() {
        return ctx.family.set(ctx.all);
      });
      __text(20);
      __elementStart(21, "span", 16);
      __text(22);
      __elementEnd()();
      __repeaterCreate(23, AuditPage_For_24_Template, 4, 8, "button", 17, _forTrack0);
      __elementEnd()();
      __elementStart(25, "div", 18)(26, "ui-select", 19);
      __listener("valueChange", function AuditPage_Template_ui_select_valueChange_26_listener($event) {
        return ctx.user.set($event);
      });
      __elementEnd();
      __elementStart(27, "ui-text-field", 20);
      __listener("valueChange", function AuditPage_Template_ui_text_field_valueChange_27_listener($event) {
        return ctx.from.set($event);
      });
      __elementEnd();
      __elementStart(28, "ui-text-field", 20);
      __listener("valueChange", function AuditPage_Template_ui_text_field_valueChange_28_listener($event) {
        return ctx.to.set($event);
      });
      __elementEnd();
      __elementStart(29, "button", 21);
      __listener("click", function AuditPage_Template_button_click_29_listener() {
        return ctx.desc.set(!ctx.desc());
      });
      __element(30, "ui-icon", 22);
      __text(31);
      __elementEnd()()();
      __elementStart(32, "div", 23)(33, "p", 24)(34, "b", 25);
      __text(35);
      __elementEnd();
      __text(36);
      __elementEnd();
      __conditionalCreate(37, AuditPage_Conditional_37_Template, 3, 2, "button", 26);
      __elementEnd();
      __elementStart(38, "section", 27);
      __conditionalCreate(39, AuditPage_Conditional_39_Template, 20, 7)(40, AuditPage_Conditional_40_Template, 7, 3, "div", 28);
      __elementEnd();
      __elementStart(41, "ui-detail-modal", 29);
      __listener("closed", function AuditPage_Template_ui_detail_modal_closed_41_listener() {
        return ctx.detailId.set(null);
      });
      __elementEnd()();
    }
    if (rf & 2) {
      __property("perm", ctx.perms)("area", ctx.t()("audit.area"));
      __advance(4);
      __textInterpolate(ctx.t()("audit.eyebrow"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("audit.title"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.description(), " ");
      __advance();
      __property("disabled", !ctx.shown().length);
      __advance();
      __property("size", 20);
      __advance();
      __textInterpolate1("", ctx.t()("audit.export"), " ");
      __advance();
      __property("stats", ctx.stats());
      __advance(4);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("audit.search.placeholder"))("value", ctx.q());
      __attribute("aria-label", ctx.t()("audit.search.aria"));
      __advance();
      __attribute("aria-label", ctx.t()("audit.col.action"));
      __advance();
      __classProp("on", ctx.family() === ctx.all);
      __attribute("aria-checked", ctx.family() === ctx.all);
      __advance();
      __textInterpolate1(" ", ctx.t()("audit.family.all"));
      __advance(2);
      __textInterpolate(ctx.nf.format(ctx.base().length));
      __advance();
      __repeater(ctx.families);
      __advance(3);
      __property("label", ctx.t()("audit.filter.user"))("options", ctx.userOptions())("value", ctx.user());
      __advance();
      __property("label", ctx.t()("audit.filter.from"))("value", ctx.from());
      __advance();
      __property("label", ctx.t()("audit.filter.to"))("value", ctx.to());
      __advance();
      __attribute("aria-label", ctx.t()("audit.sort.toggle"));
      __advance();
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.desc() ? ctx.t()("audit.sort.desc") : ctx.t()("audit.sort.asc"), " ");
      __advance(4);
      __textInterpolate(ctx.nf.format(ctx.shown().length));
      __advance();
      __textInterpolate1(" ", ctx.t()(ctx.shown().length > 1 ? "audit.count.autre" : "audit.count.un"), " ");
      __advance();
      __conditional(ctx.filtered() ? 37 : -1);
      __advance(2);
      __conditional(ctx.shown().length ? 39 : 40);
      __advance(2);
      __property("view", ctx.detail());
    }
  },
  dependencies: [
    AppShellComponent,
    DetailModalComponent,
    IconComponent,
    PaginationComponent,
    SelectComponent,
    StatCardsComponent,
    TextFieldComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".filters[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n        gap: 8px;\n        align-items: end;\n      }\n      .fam[_ngcontent-%COMP%] {\n        display: grid;\n        height: 32px;\n        width: 32px;\n        flex-shrink: 0;\n        place-items: center;\n        border-radius: 10px;\n      }\n      tr.sensitive[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n        box-shadow: inset 3px 0 0 var(--%NS%v2-erreur-fg);\n      }"]
}), _a);

export { AuditPage as default };
//# sourceMappingURL=audit.page-CiE8vQbP.mjs.map

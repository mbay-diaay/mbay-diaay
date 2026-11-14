import { i as inject, F as signal, c as computed, ɵ as __defineComponent, d as RouterLink, L as __getCurrentView, f as __elementStart, g as __text, h as __elementEnd, j as __conditionalCreate, b as __element, H as __listener, m as __repeaterCreate, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, s as __conditional, v as __repeater, w as __nextContext, x as __pureFunction2, r as __pureFunction1, t as __styleProp, O as __restoreView, P as __resetView, C as __reference } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, f as fmtDateTime, j as nf, A as can, o as actions, l as downloadCsv, B as isSnapshot, C as getState } from './locale.service-c0QhtcVY.mjs';
import { E as ENTITY_ORDER, S as SCHEMA, e as exchangeRows, d as downloadWorkbook } from './workbook-Ci1z78q0.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { M as ModalComponent, g as StatCardsComponent } from './ui-DDO8FoUF.mjs';
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
var _c0 = (a0, a1) => ({
  date: a0,
  user: a1
});
var _c1 = (a0) => ({ file: a0 });
var _c2 = (a0) => ({ date: a0 });
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.label;
function DonneesPage_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 6);
    __element(1, "ui-icon", 33);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.t()("sauvegarde.notice.noNominatif"), " ");
  }
}
function DonneesPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 6);
    __element(1, "ui-icon", 33);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.t()("sauvegarde.notice.noCni"), " ");
  }
}
function DonneesPage_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "li", 18)(1, "span", 11);
    __element(2, "ui-icon", 34);
    __elementEnd();
    __elementStart(3, "span", 35);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 36);
    __text(6);
    __elementEnd();
    __elementStart(7, "button", 37);
    __listener("click", function DonneesPage_For_28_Template_button_click_7_listener() {
      const row_r4 = __restoreView(_r3).$implicit;
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.exportCsv(row_r4.key));
    });
    __element(8, "ui-icon", 15);
    __text(9);
    __elementEnd()();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    const ctx_r1 = __nextContext();
    __advance(2);
    __property("size", 18);
    __advance(2);
    __textInterpolate(row_r4.label);
    __advance(2);
    __textInterpolate(ctx_r1.nf.format(row_r4.n));
    __advance(2);
    __property("size", 16);
    __advance();
    __textInterpolate1("", ctx_r1.t()("sauvegarde.export.csvButton"), " ");
  }
}
function DonneesPage_Conditional_45_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const backupEntry_r5 = ctx;
    const ctx_r1 = __nextContext();
    __textInterpolate1(" ", ctx_r1.t()("sauvegarde.backup.last", __pureFunction2(1, _c0, ctx_r1.fmtDateTime(backupEntry_r5.at), backupEntry_r5.user)), " ");
  }
}
function DonneesPage_Conditional_46_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __textInterpolate1(" ", ctx_r1.t()("sauvegarde.backup.none"), " ");
  }
}
function DonneesPage_Conditional_66_For_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "tr")(1, "td", 44);
    __text(2);
    __elementEnd();
    __elementStart(3, "td", 45);
    __text(4);
    __elementEnd();
    __elementStart(5, "td", 46);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const volume_r8 = ctx.$implicit;
    const ctx_r1 = __nextContext(2);
    __advance(2);
    __textInterpolate(volume_r8.label);
    __advance(2);
    __textInterpolate(ctx_r1.nf.format(volume_r8.now));
    __advance();
    __styleProp("color", volume_r8.after !== volume_r8.now ? "var(--v2-attente-fg)" : null);
    __advance();
    __textInterpolate1(" ", ctx_r1.nf.format(volume_r8.after), " ");
  }
}
function DonneesPage_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "ui-modal", 38);
    __listener("closed", function DonneesPage_Conditional_66_Template_ui_modal_closed_0_listener() {
      __restoreView(_r7);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.pending.set(null));
    });
    __elementStart(1, "div", 39)(2, "table", 40)(3, "thead")(4, "tr");
    __element(5, "th");
    __elementStart(6, "th", 41);
    __text(7);
    __elementEnd();
    __elementStart(8, "th", 41);
    __text(9);
    __elementEnd()()();
    __elementStart(10, "tbody");
    __repeaterCreate(11, DonneesPage_Conditional_66_For_12_Template, 7, 5, "tr", null, _forTrack1);
    __elementEnd()()();
    __elementStart(13, "button", 42);
    __listener("click", function DonneesPage_Conditional_66_Template_button_click_13_listener() {
      __restoreView(_r7);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.pending.set(null));
    });
    __text(14);
    __elementEnd();
    __elementStart(15, "button", 43);
    __listener("click", function DonneesPage_Conditional_66_Template_button_click_15_listener() {
      __restoreView(_r7);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.confirmRestore());
    });
    __text(16);
    __elementEnd()();
  }
  if (rf & 2) {
    const restore_r9 = ctx;
    const ctx_r1 = __nextContext();
    __property("open", true)("title", ctx_r1.t()("sauvegarde.confirm.title", __pureFunction1(9, _c1, restore_r9.file)))("description", ctx_r1.t()("sauvegarde.confirm.description", __pureFunction1(11, _c2, ctx_r1.fmtDateTime(restore_r9.snap.exportedAt))))("width", 560)("closeLabel", ctx_r1.t()("common.close"));
    __advance(7);
    __textInterpolate(ctx_r1.t()("sauvegarde.confirm.current"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("sauvegarde.confirm.after"));
    __advance(2);
    __repeater(restore_r9.rows);
    __advance(3);
    __textInterpolate1(" ", ctx_r1.t()("sauvegarde.confirm.cancel"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("sauvegarde.confirm.action"), " ");
  }
}
var ENTITY_ORDER_ARR = [...ENTITY_ORDER];
var DonneesPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.fmtDateTime = fmtDateTime;
    this.nf = nf;
    this.snackbar = inject(SnackbarService);
    this.pending = signal(null, ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const c = this.currentCounts();
      return [
        {
          label: t("sauvegarde.volume.producteurs"),
          value: nf.format(c.producers),
          sub: `${nf.format(c.orgs)} ${t("sauvegarde.volume.organisations").toLowerCase()}`,
          icon: "agriculture",
          bg: "",
          fg: ""
        },
        {
          label: t("sauvegarde.volume.parcelles"),
          value: nf.format(c.plots),
          sub: t("sauvegarde.export.single"),
          icon: "landscape",
          ...TONE.succes
        },
        {
          label: t("sauvegarde.volume.alertes"),
          value: nf.format(c.alerts),
          sub: `${nf.format(c.cases)} ${t("sauvegarde.volume.doublons").toLowerCase()}`,
          icon: "warning",
          ...TONE.attente
        },
        {
          label: t("sauvegarde.volume.journal"),
          value: nf.format(c.audit),
          sub: this.lastBackup() ? t("sauvegarde.backup.last", {
            date: fmtDateTime(this.lastBackup().at),
            user: this.lastBackup().user
          }) : t("sauvegarde.backup.none"),
          icon: "receipt_long",
          ...TONE.info
        }
      ];
    }, ...[]);
    this.EXTRA = [
      {
        key: "alertes",
        labelKey: "sauvegarde.extra.alertes"
      },
      {
        key: "doublons",
        labelKey: "sauvegarde.extra.doublons"
      },
      {
        key: "corrections",
        labelKey: "sauvegarde.extra.corrections"
      },
      {
        key: "journal",
        labelKey: "sauvegarde.extra.journal"
      }
    ];
    this.nominatif = computed(() => can(this.store.state().session, "producer.export_nominatif"), ...[]);
    this.cni = computed(() => can(this.store.state().session, "identity.read_full"), ...[]);
    this.lastBackup = computed(() => this.store.state().audit.find((a) => a.action === "Sauvegarde compl\xE8te"), ...[]);
    this.exportRows = computed(() => {
      const s = this.store.state();
      const counts = {
        orgs: s.orgs.length,
        producers: s.producers.filter((p) => !p.mergedInto).length,
        plots: s.plots.length,
        alertes: s.alerts.length,
        doublons: s.cases.length,
        corrections: s.corrections.length,
        journal: s.audit.length
      };
      const entityCount = {
        organisations: counts.orgs,
        producteurs: counts.producers,
        parcelles: counts.plots
      };
      const rows = [];
      for (const e of ENTITY_ORDER_ARR) rows.push({
        key: e,
        label: SCHEMA[e].label,
        n: entityCount[e]
      });
      for (const x of this.EXTRA) rows.push({
        key: x.key,
        label: this.t()(x.labelKey),
        n: counts[x.key]
      });
      return rows;
    }, ...[]);
  }
  extraRows(k) {
    const s = getState();
    const code = new Map(s.producers.map((p) => [p.id, p.code]));
    const plotCode = new Map(s.plots.map((p) => [p.id, p.code]));
    if (k === "alertes") return [[
      "Type",
      "S\xE9v\xE9rit\xE9",
      "Concerne",
      "Code",
      "Statut",
      "Enqu\xEAteur",
      "D\xE9tail",
      "Commentaire"
    ], ...s.alerts.map((a) => {
      var _a2, _b;
      return [
        a.type,
        a.severity,
        a.entity,
        (_a2 = a.entity === "parcelle" ? plotCode.get(a.entityId) : code.get(a.entityId)) != null ? _a2 : "",
        a.status,
        a.enumerator,
        a.detail,
        (_b = a.comment) != null ? _b : ""
      ];
    })];
    if (k === "doublons") return [[
      "Cas",
      "Fiche A",
      "Fiche B",
      "Score",
      "Statut",
      "Signaux",
      "Commentaire"
    ], ...s.cases.map((c) => {
      var _a2, _b, _c;
      return [
        c.id.toUpperCase(),
        (_a2 = code.get(c.aId)) != null ? _a2 : "",
        (_b = code.get(c.bId)) != null ? _b : "",
        c.score,
        c.status,
        c.signals.map((x) => x.label).join(" | "),
        (_c = c.comment) != null ? _c : ""
      ];
    })];
    if (k === "corrections") return [[
      "Producteur",
      "Demandeur",
      "Date",
      "Champs",
      "Motif",
      "Statut",
      "D\xE9cision"
    ], ...s.corrections.map((c) => {
      var _a2, _b;
      return [
        (_a2 = code.get(c.producerId)) != null ? _a2 : "",
        c.requester,
        c.requestedAt,
        c.changes.map((x) => x.field).join(", "),
        c.motif,
        c.status,
        (_b = c.decisionComment) != null ? _b : ""
      ];
    })];
    return [[
      "Date",
      "Utilisateur",
      "Action",
      "Entit\xE9",
      "D\xE9tail"
    ], ...s.audit.map((a) => [
      a.at,
      a.user,
      a.action,
      a.entity,
      a.detail
    ])];
  }
  async exportAll() {
    const s = getState();
    const opt = {
      nominatif: this.nominatif(),
      cni: this.cni()
    };
    const sheets = [...ENTITY_ORDER_ARR.map((e) => ({
      name: SCHEMA[e].sheet,
      rows: exchangeRows(e, s, opt)
    })), ...this.EXTRA.map((x) => ({
      name: this.frExtraLabel(x.key),
      rows: this.extraRows(x.key)
    }))];
    const stamp = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    try {
      await downloadWorkbook(`mbay_diaay_export_${stamp()}.xlsx`, sheets);
    } catch {
      this.snackbar.error(this.t()("common.exportError"));
      return;
    }
    actions.audit(opt.nominatif ? "Export nominatif" : "Export anonymis\xE9", "Toutes les donn\xE9es", "Classeur Excel complet");
    this.snackbar.success(`${this.t()("sauvegarde.exportAll.done")} \xB7 ${this.t()("sauvegarde.exportAll.doneHint")}`);
  }
  frExtraLabel(k) {
    return {
      alertes: "Alertes",
      doublons: "Doublons",
      corrections: "Demandes de correction",
      journal: "Journal d'audit"
    }[k];
  }
  exportCsv(e) {
    const s = getState();
    const opt = {
      nominatif: this.nominatif(),
      cni: this.cni()
    };
    const stamp = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const isEntity = ENTITY_ORDER_ARR.includes(e);
    downloadCsv(`${e}_${stamp()}.csv`, isEntity ? exchangeRows(e, s, opt) : this.extraRows(e));
    actions.audit(isEntity && opt.nominatif ? "Export nominatif" : "Export", isEntity ? SCHEMA[e].label : this.frExtraLabel(e), "CSV");
  }
  backup() {
    const snap = actions.exportSnapshot();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(snap)], { type: "application/json" }));
    a.download = `mbay_diaay_sauvegarde_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    this.snackbar.success(`${this.t()("sauvegarde.backup.done")} \xB7 ${this.t()("sauvegarde.backup.doneHint")}`);
  }
  async onRestoreFile(ev) {
    var _a2;
    const input = ev.target;
    const f = (_a2 = input.files) == null ? void 0 : _a2[0];
    if (!f) return;
    try {
      const parsed = JSON.parse(await f.text());
      if (!isSnapshot(parsed)) throw new Error(this.t()("sauvegarde.restore.notBackup"));
      const after = parsed.data;
      const c = this.currentCounts();
      const t = this.t();
      this.pending.set({
        file: f.name,
        snap: parsed,
        rows: [
          {
            label: t("sauvegarde.volume.organisations"),
            now: c.orgs,
            after: after.orgs.length
          },
          {
            label: t("sauvegarde.volume.producteurs"),
            now: c.producers,
            after: after.producers.filter((p) => !p.mergedInto).length
          },
          {
            label: t("sauvegarde.volume.parcelles"),
            now: c.plots,
            after: after.plots.length
          },
          {
            label: t("sauvegarde.volume.alertes"),
            now: c.alerts,
            after: after.alerts.length
          },
          {
            label: t("sauvegarde.volume.doublons"),
            now: c.cases,
            after: after.cases.length
          },
          {
            label: t("sauvegarde.volume.journal"),
            now: c.audit,
            after: after.audit.length
          }
        ]
      });
    } catch (e) {
      this.snackbar.error(`${this.t()("sauvegarde.restore.failed")} : ${e instanceof Error ? e.message : this.t()("sauvegarde.restore.unreadable")}`);
    } finally {
      input.value = "";
    }
  }
  confirmRestore() {
    const p = this.pending();
    if (!p) return;
    actions.restoreSnapshot(p.snap);
    this.pending.set(null);
    this.snackbar.success(this.t()("sauvegarde.restore.done"));
  }
  currentCounts() {
    const s = this.store.state();
    return {
      orgs: s.orgs.length,
      producers: s.producers.filter((p) => !p.mergedInto).length,
      plots: s.plots.length,
      alerts: s.alerts.length,
      cases: s.cases.length,
      audit: s.audit.length
    };
  }
}, _a.\u0275fac = function DonneesPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-donnees-page"]],
  decls: 67,
  vars: 29,
  consts: [
    ["fileInput", ""],
    [
      "perm",
      "data.backup",
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
      "notice",
      "mt-4",
      2,
      "background",
      "var(--v2-info-bg)",
      "color",
      "var(--v2-info-fg)"
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
      "grid-main",
      "mt-6"
    ],
    [1, "sec-card"],
    [1, "sec-head"],
    [1, "sec-ico"],
    [
      "name",
      "table_view",
      3,
      "size"
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
      "sub",
      "border-t",
      "px-5",
      "py-3",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      1,
      "lbl",
      "px-5",
      "pb-2",
      "pt-3"
    ],
    [1, "ent"],
    [
      1,
      "grid",
      "gap-4"
    ],
    [
      "name",
      "archive",
      3,
      "size"
    ],
    [
      1,
      "border-t",
      "p-5",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [1, "sub"],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-primary",
      "mt-4",
      3,
      "click"
    ],
    [
      1,
      "sub",
      "mt-3",
      "flex",
      "items-center",
      "gap-1.5"
    ],
    [
      "name",
      "event_note",
      3,
      "size"
    ],
    [
      1,
      "sec-ico",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
    ],
    [
      "name",
      "upload_file",
      3,
      "size"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      "mt-4",
      3,
      "click"
    ],
    [
      "type",
      "file",
      "accept",
      ".json,application/json",
      1,
      "sr-only",
      3,
      "change"
    ],
    [
      1,
      "sub",
      "mt-3"
    ],
    [
      "routerLink",
      "/dashboard/imports",
      1,
      "font-bold",
      "underline",
      "underline-offset-4"
    ],
    [
      "tone",
      "danger",
      "icon",
      "upload_file",
      3,
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      "name",
      "info",
      3,
      "size"
    ],
    [
      "name",
      "description",
      3,
      "size"
    ],
    [
      1,
      "min-w-0",
      "flex-1",
      "font-bold"
    ],
    [
      1,
      "sub",
      "tabular-nums"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      2,
      "height",
      "38px",
      "padding",
      "0 12px",
      3,
      "click"
    ],
    [
      "tone",
      "danger",
      "icon",
      "upload_file",
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
      "mb-5",
      "overflow-hidden",
      "rounded-[16px]",
      "border",
      2,
      "border-color",
      "var(--v2-bord-carte)"
    ],
    [
      1,
      "cmp",
      "w-full"
    ],
    [1, "text-right"],
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
      "btn-danger",
      3,
      "click"
    ],
    [1, "font-semibold"],
    [
      1,
      "text-right",
      "tabular-nums"
    ],
    [
      1,
      "text-right",
      "font-extrabold",
      "tabular-nums"
    ]
  ],
  template: function DonneesPage_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = __getCurrentView();
      __elementStart(0, "app-shell", 1)(1, "header", 2)(2, "p", 3);
      __text(3);
      __elementEnd();
      __elementStart(4, "h1", 4);
      __text(5);
      __elementEnd();
      __elementStart(6, "p", 5);
      __text(7);
      __elementEnd()();
      __conditionalCreate(8, DonneesPage_Conditional_8_Template, 3, 2, "p", 6);
      __conditionalCreate(9, DonneesPage_Conditional_9_Template, 3, 2, "p", 6);
      __element(10, "ui-stat-cards", 7);
      __elementStart(11, "div", 8)(12, "section", 9)(13, "div", 10)(14, "h2")(15, "span", 11);
      __element(16, "ui-icon", 12);
      __elementEnd();
      __text(17);
      __elementEnd();
      __elementStart(18, "button", 13);
      __listener("click", function DonneesPage_Template_button_click_18_listener() {
        return ctx.exportAll();
      });
      __text(19);
      __elementStart(20, "span", 14);
      __element(21, "ui-icon", 15);
      __elementEnd()()();
      __elementStart(22, "p", 16);
      __text(23);
      __elementEnd();
      __elementStart(24, "p", 17);
      __text(25);
      __elementEnd();
      __elementStart(26, "ul");
      __repeaterCreate(27, DonneesPage_For_28_Template, 10, 5, "li", 18, _forTrack0);
      __elementEnd()();
      __elementStart(29, "div", 19)(30, "section", 9)(31, "div", 10)(32, "h2")(33, "span", 11);
      __element(34, "ui-icon", 20);
      __elementEnd();
      __text(35);
      __elementEnd()();
      __elementStart(36, "div", 21)(37, "p", 22);
      __text(38);
      __elementEnd();
      __elementStart(39, "button", 23);
      __listener("click", function DonneesPage_Template_button_click_39_listener() {
        return ctx.backup();
      });
      __text(40);
      __elementStart(41, "span", 14);
      __element(42, "ui-icon", 15);
      __elementEnd()();
      __elementStart(43, "p", 24);
      __element(44, "ui-icon", 25);
      __conditionalCreate(45, DonneesPage_Conditional_45_Template, 1, 4)(46, DonneesPage_Conditional_46_Template, 1, 1);
      __elementEnd()()();
      __elementStart(47, "section", 9)(48, "div", 10)(49, "h2")(50, "span", 26);
      __element(51, "ui-icon", 27);
      __elementEnd();
      __text(52);
      __elementEnd()();
      __elementStart(53, "div", 21)(54, "p", 22);
      __text(55);
      __elementEnd();
      __elementStart(56, "button", 28);
      __listener("click", function DonneesPage_Template_button_click_56_listener() {
        __restoreView(_r1);
        const fileInput_r6 = __reference(60);
        return __resetView(fileInput_r6.click());
      });
      __element(57, "ui-icon", 27);
      __text(58);
      __elementEnd();
      __elementStart(59, "input", 29, 0);
      __listener("change", function DonneesPage_Template_input_change_59_listener($event) {
        return ctx.onRestoreFile($event);
      });
      __elementEnd();
      __elementStart(61, "p", 30);
      __text(62);
      __elementStart(63, "a", 31);
      __text(64);
      __elementEnd();
      __text(65);
      __elementEnd()()()()();
      __conditionalCreate(66, DonneesPage_Conditional_66_Template, 17, 13, "ui-modal", 32);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_21_0;
      let tmp_30_0;
      __property("area", ctx.t()("sauvegarde.area"));
      __advance(3);
      __textInterpolate(ctx.t()("sauvegarde.eyebrow"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("sauvegarde.title"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("sauvegarde.description"), " ");
      __advance();
      __conditional(!ctx.nominatif() ? 8 : -1);
      __advance();
      __conditional(ctx.nominatif() && !ctx.cni() ? 9 : -1);
      __advance();
      __property("stats", ctx.stats());
      __advance(6);
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("sauvegarde.export.title"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("sauvegarde.export.all"));
      __advance(2);
      __property("size", 18);
      __advance(2);
      __textInterpolate1(" ", ctx.t()("sauvegarde.export.description"), " ");
      __advance(2);
      __textInterpolate(ctx.t()("sauvegarde.export.single"));
      __advance(2);
      __repeater(ctx.exportRows());
      __advance(7);
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("sauvegarde.backup.title"), " ");
      __advance(3);
      __textInterpolate(ctx.t()("sauvegarde.backup.description"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("sauvegarde.backup.download"));
      __advance(2);
      __property("size", 18);
      __advance(2);
      __property("size", 16);
      __advance();
      __conditional((tmp_21_0 = ctx.lastBackup()) ? 45 : 46, tmp_21_0);
      __advance(6);
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("sauvegarde.restore.title"), " ");
      __advance(3);
      __textInterpolate(ctx.t()("sauvegarde.restore.description"));
      __advance(2);
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("sauvegarde.restore.choose"), " ");
      __advance(4);
      __textInterpolate1(" ", ctx.t()("sauvegarde.restore.importHintBefore"), " ");
      __advance(2);
      __textInterpolate(ctx.t()("sauvegarde.restore.importLink"));
      __advance();
      __textInterpolate1("", ctx.t()("sauvegarde.restore.importHintAfter"), " ");
      __advance();
      __conditional((tmp_30_0 = ctx.pending()) ? 66 : -1, tmp_30_0);
    }
  },
  dependencies: [
    AppShellComponent,
    IconComponent,
    ModalComponent,
    RouterLink,
    StatCardsComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".grid-main[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 16px;\n      }\n      @media (min-width: 1100px) {\n        .grid-main[_ngcontent-%COMP%] {\n          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);\n          align-items: start;\n        }\n      }\n      .ent[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 10px 20px;\n      }\n      .cmp[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n   .cmp[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 8px 12px;\n        text-align: left;\n        font-size: 14px;\n      }\n      .cmp[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n        font-family: var(--%NS%v2-font-mono);\n        font-size: 11px;\n        letter-spacing: 0.08em;\n        text-transform: uppercase;\n        color: var(--%NS%v2-gris-texte);\n        border-top: none;\n      }"]
}), _a);

export { DonneesPage as default };
//# sourceMappingURL=donnees.page-BqIif2m2.mjs.map

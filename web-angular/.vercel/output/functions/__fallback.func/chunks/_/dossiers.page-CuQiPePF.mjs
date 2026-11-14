import { i as inject, R as Router, F as signal, c as computed, ɵ as __defineComponent, f as __elementStart, g as __text, h as __elementEnd, j as __conditionalCreate, b as __element, H as __listener, m as __repeaterCreate, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, s as __conditional, u as __attribute, v as __repeater, x as __pureFunction2, z as __classProp, r as __pureFunction1, L as __getCurrentView, w as __nextContext, t as __styleProp, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { L as LocaleService, j as nf, h as fmtDate, b as scopedDossiers, i as inScope, F as DOCUMENT_KINDS, H as validateDraft } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import { i as initialsOf, T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { e as detailFact, k as detailKpi, l as FileSlotsComponent, M as ModalComponent, f as DetailModalComponent, P as PaginationComponent, S as SelectComponent, g as StatCardsComponent, T as TextFieldComponent } from './ui-DDO8FoUF.mjs';
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
  shown: a0,
  total: a1
});
var _c1 = (a0) => ({ mb: a0 });
var _c2 = (a0) => ({ count: a0 });
var _c3 = (a0) => ({ name: a0 });
var _forTrack0 = ($index, $item) => $item.id;
function DossiersPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 44);
    __listener("click", function DossiersPage_Conditional_9_Template_button_click_0_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.openNew());
    });
    __text(1);
    __elementStart(2, "span", 45);
    __element(3, "ui-icon", 46);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("dossiers.new"), " ");
    __advance(2);
    __property("size", 20);
  }
}
function DossiersPage_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "button", 27);
    __listener("click", function DossiersPage_For_17_Template_button_click_0_listener() {
      const filterButton_r4 = __restoreView(_r3).$implicit;
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.view.set(filterButton_r4.id));
    });
    __text(1);
    __elementStart(2, "span", 39);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const filterButton_r4 = ctx.$implicit;
    const ctx_r1 = __nextContext();
    __classProp("on", ctx_r1.view() === filterButton_r4.id);
    __attribute("aria-checked", ctx_r1.view() === filterButton_r4.id);
    __advance();
    __textInterpolate1(" ", filterButton_r4.label);
    __advance();
    __classProp("zero", !filterButton_r4.count);
    __advance();
    __textInterpolate(filterButton_r4.count);
  }
}
function DossiersPage_Conditional_21_For_20_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 57);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r1.t()("dossiers.row.duplicate"));
  }
}
function DossiersPage_Conditional_21_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "tr", 52);
    __listener("click", function DossiersPage_Conditional_21_For_20_Template_tr_click_0_listener() {
      const dossier_r6 = __restoreView(_r5).$implicit;
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.detailId.set(dossier_r6.id));
    });
    __elementStart(1, "td")(2, "span", 53)(3, "span", 54);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 2)(6, "span", 55);
    __text(7);
    __elementEnd();
    __elementStart(8, "span", 56);
    __text(9);
    __conditionalCreate(10, DossiersPage_Conditional_21_For_20_Conditional_10_Template, 2, 1, "span", 57);
    __elementEnd()()()();
    __elementStart(11, "td", 58);
    __text(12);
    __elementEnd();
    __elementStart(13, "td", 59);
    __text(14);
    __elementEnd();
    __elementStart(15, "td", 60);
    __text(16);
    __elementEnd();
    __elementStart(17, "td", 61);
    __text(18);
    __elementEnd();
    __elementStart(19, "td")(20, "span", 62);
    __text(21);
    __elementEnd()();
    __elementStart(22, "td")(23, "span", 63)(24, "button", 64);
    __listener("click", function DossiersPage_Conditional_21_For_20_Template_button_click_24_listener($event) {
      const dossier_r6 = __restoreView(_r5).$implicit;
      const ctx_r1 = __nextContext(2);
      $event.stopPropagation();
      return __resetView(ctx_r1.detailId.set(dossier_r6.id));
    });
    __element(25, "ui-icon", 65);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const dossier_r6 = ctx.$implicit;
    const ctx_r1 = __nextContext(2);
    __advance(3);
    __styleProp("background", ctx_r1.status[dossier_r6.status].bg)("color", ctx_r1.status[dossier_r6.status].fg);
    __advance();
    __textInterpolate(ctx_r1.initials(ctx_r1.name(dossier_r6)));
    __advance(3);
    __textInterpolate(ctx_r1.name(dossier_r6));
    __advance(2);
    __textInterpolate1(" ", dossier_r6.draft.village || ctx_r1.t()("dossiers.row.noVillage"), " ");
    __advance();
    __conditional(dossier_r6.possibleDuplicateOf ? 10 : -1);
    __advance();
    __property("title", ctx_r1.scoopName(dossier_r6.scoopId));
    __advance();
    __textInterpolate1(" ", ctx_r1.scoopName(dossier_r6.scoopId), " ");
    __advance(2);
    __textInterpolate(dossier_r6.createdBy);
    __advance(2);
    __textInterpolate1(" ", ctx_r1.fmtDate(dossier_r6.updatedAt), " ");
    __advance();
    __styleProp("color", ctx_r1.ageDays(dossier_r6) > 14 && ctx_r1.isOpen(dossier_r6) ? "var(--v2-erreur-fg)" : null);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()(ctx_r1.ageDays(dossier_r6) > 1 ? "dossiers.age.days.autre" : "dossiers.age.days.un", __pureFunction1(23, _c2, ctx_r1.ageDays(dossier_r6))), " ");
    __advance(2);
    __styleProp("background", ctx_r1.status[dossier_r6.status].bg)("color", ctx_r1.status[dossier_r6.status].fg);
    __advance();
    __textInterpolate(ctx_r1.t()(ctx_r1.statusKey(dossier_r6.status)));
    __advance(3);
    __property("title", ctx_r1.t()("common.view"));
    __attribute("aria-label", ctx_r1.t()("dossiers.view.aria", __pureFunction1(25, _c3, ctx_r1.name(dossier_r6))));
    __advance();
    __property("size", 18);
  }
}
function DossiersPage_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 47)(1, "table", 48)(2, "thead")(3, "tr")(4, "th");
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
    __elementStart(12, "th", 49);
    __text(13);
    __elementEnd();
    __elementStart(14, "th");
    __text(15);
    __elementEnd();
    __elementStart(16, "th", 49);
    __text(17);
    __elementEnd()()();
    __elementStart(18, "tbody");
    __repeaterCreate(19, DossiersPage_Conditional_21_For_20_Template, 26, 27, "tr", 50, _forTrack0);
    __elementEnd()()();
    __element(21, "ui-pagination", 51);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(5);
    __textInterpolate(ctx_r1.t()("dossiers.col.future"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("dossiers.col.scoop"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("dossiers.col.tech"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("dossiers.col.updated"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("dossiers.col.age"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("dossiers.col.status"));
    __advance(2);
    __textInterpolate(ctx_r1.t()("dossiers.col.actions"));
    __advance(2);
    __repeater(ctx_r1.pager.items());
    __advance(2);
    __property("pager", ctx_r1.pager);
  }
}
function DossiersPage_Conditional_22_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 69);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r1.canCreate() ? ctx_r1.t()("dossiers.empty.create") : ctx_r1.t()("dossiers.empty.readonly"), " ");
  }
}
function DossiersPage_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 16)(1, "span", 66);
    __element(2, "ui-icon", 67);
    __elementEnd();
    __elementStart(3, "p", 68);
    __text(4);
    __elementEnd();
    __conditionalCreate(5, DossiersPage_Conditional_22_Conditional_5_Template, 2, 1, "p", 69);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __property("size", 26);
    __advance(2);
    __textInterpolate1(" ", ctx_r1.mine().length ? ctx_r1.t()("dossiers.empty.filtered") : ctx_r1.t()("dossiers.empty.title"), " ");
    __advance();
    __conditional(!ctx_r1.mine().length ? 5 : -1);
  }
}
function DossiersPage_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "div")(1, "p", 25);
    __text(2);
    __elementEnd();
    __elementStart(3, "ui-select", 70);
    __listener("valueChange", function DossiersPage_Conditional_51_Template_ui_select_valueChange_3_listener($event) {
      __restoreView(_r7);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.setScoop($event));
    });
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __textInterpolate(ctx_r1.t()("dossiers.new.scoop"));
    __advance();
    __property("label", ctx_r1.t()("dossiers.new.scoop"))("options", ctx_r1.scoopOptions())("value", ctx_r1.form().scoopId);
  }
}
function DossiersPage_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 34);
    __element(1, "ui-icon", 71);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r1.err("orgId"));
  }
}
function DossiersPage_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 39);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate(ctx_r1.files().length);
  }
}
function DossiersPage_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 34);
    __element(1, "ui-icon", 71);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r1.err("pi\xE8ces"));
  }
}
function DossiersPage_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = __getCurrentView();
    __elementStart(0, "button", 72);
    __listener("click", function DossiersPage_Conditional_72_Template_button_click_0_listener() {
      __restoreView(_r8);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.submitNew(true));
    });
    __text(1);
    __elementStart(2, "span", 45);
    __element(3, "ui-icon", 73);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("dossiers.new.submitNow"), " ");
    __advance(2);
    __property("size", 18);
  }
}
var TO_PROCESS = ["soumis", "en examen"];
var FILTERS = [
  "brouillon",
  "compl\xE9ment demand\xE9",
  "approuv\xE9",
  "refus\xE9"
];
var FILTER_LABEL = {
  brouillon: "dossiers.filter.brouillon",
  "compl\xE9ment demand\xE9": "dossiers.filter.compl\xE9ment demand\xE9",
  approuv\u00E9: "dossiers.filter.approuv\xE9",
  refus\u00E9: "dossiers.filter.refus\xE9"
};
var STATUS = {
  brouillon: TONE.neutre,
  soumis: TONE.attente,
  "en examen": TONE.info,
  "compl\xE9ment demand\xE9": TONE.culture,
  approuv\u00E9: TONE.succes,
  refus\u00E9: TONE.erreur
};
var DAY = 864e5;
var MAX_FILE_KB = 5120;
var emptyForm = (scoopId) => ({
  scoopId,
  firstName: "",
  lastName: "",
  sex: "F",
  age: "",
  phone: "",
  cni: "",
  village: "",
  orgId: "",
  createMember: true
});
var DossiersPage = (_a = class {
  constructor() {
    this.router = inject(Router);
    this.snackbar = inject(SnackbarService);
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.nf = nf;
    this.fmtDate = fmtDate;
    this.initials = initialsOf;
    this.status = STATUS;
    this.perms = ["dossier.create", "dossier.review"];
    this.q = signal("", ...[]);
    this.view = signal("tous", ...[]);
    this.newOpen = signal(false, ...[]);
    this.detailId = signal(null, ...[]);
    this.form = signal(emptyForm(""), ...[]);
    this.issues = signal([], ...[]);
    this.files = signal([], ...[]);
    this.maxMb = MAX_FILE_KB / 1024;
    this.mine = computed(() => scopedDossiers(this.store.state().dossiers, this.store.state().session), ...[]);
    this.canCreate = computed(() => this.store.can("dossier.create"), ...[]);
    this.createScoops = computed(() => {
      const session = this.store.state().session;
      return this.store.state().scoops.filter((s) => inScope([{ scoopId: s.id }], session).length === 1);
    }, ...[]);
    this.scoopOptions = computed(() => this.createScoops().map((s) => ({
      value: s.id,
      label: s.name
    })), ...[]);
    this.filterButtons = computed(() => {
      const t = this.t();
      const mine = this.mine();
      const n = (f) => mine.filter(f).length;
      const buttons = [{
        id: "tous",
        label: t("dossiers.filter.all"),
        count: mine.length
      }, {
        id: "a-traiter",
        label: t("dossiers.filter.toProcess"),
        count: n((d) => TO_PROCESS.includes(d.status))
      }];
      for (const s of FILTERS) buttons.push({
        id: s,
        label: t(FILTER_LABEL[s]),
        count: n((d) => d.status === s)
      });
      return buttons;
    }, ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const mine = this.mine();
      const n = (st) => mine.filter((d) => st.includes(d.status)).length;
      return [
        {
          label: t("dossiers.stat.total"),
          value: nf.format(mine.length),
          sub: t("dossiers.stat.totalSub", { count: n(["brouillon"]) }),
          icon: "folder_shared",
          bg: "",
          fg: ""
        },
        {
          label: t("dossiers.stat.toProcess"),
          value: nf.format(n(TO_PROCESS)),
          sub: t("dossiers.stat.toProcessSub"),
          icon: "fact_check",
          ...TONE.attente
        },
        {
          label: t("dossiers.stat.complement"),
          value: nf.format(n(["compl\xE9ment demand\xE9"])),
          sub: t("dossiers.stat.complementSub"),
          icon: "mark_email_unread",
          ...TONE.culture
        },
        {
          label: t("dossiers.stat.approved"),
          value: nf.format(n(["approuv\xE9"])),
          sub: t("dossiers.stat.approvedSub", { count: n(["refus\xE9"]) }),
          icon: "task_alt",
          ...TONE.succes
        }
      ];
    }, ...[]);
    this.shown = computed(() => {
      const needle = this.q().trim().toLowerCase();
      const view = this.view();
      return this.mine().filter((d) => {
        const inView = view === "tous" || (view === "a-traiter" ? TO_PROCESS.includes(d.status) : d.status === view);
        const okQ = !needle || `${d.draft.firstName} ${d.draft.lastName} ${d.createdBy}`.toLowerCase().includes(needle);
        return inView && okQ;
      }).sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
    }, ...[]);
    this.pager = createPager(() => this.shown());
    this.detail = computed(() => {
      const id = this.detailId();
      const d = id ? this.mine().find((x) => x.id === id) : null;
      if (!d) return null;
      const t = this.t();
      const org = this.store.state().orgs.find((o) => o.id === d.draft.orgId);
      const history = [...d.history].sort((a, b) => b.at.localeCompare(a.at));
      const decision = d.decision ? `${t(d.decision.approved ? "dossiers.status.approuv\xE9" : "dossiers.status.refus\xE9")} \xB7 ${fmtDate(d.decision.at)} \xB7 ${d.decision.by}` : null;
      return {
        title: this.name(d),
        subtitle: [d.draft.village, this.scoopName(d.scoopId)].filter(Boolean).join(" \xB7 "),
        icon: "folder_shared",
        badges: [{
          label: t(this.statusKey(d.status)),
          ...STATUS[d.status]
        }, ...d.possibleDuplicateOf ? [{
          label: t("dossiers.row.duplicate"),
          bg: "var(--v2-bloquant-bg)",
          fg: "var(--v2-bloquant-fg)"
        }] : []],
        kpis: [
          detailKpi(t("dossiers.quick.documents"), d.documentIds.length, "description", TONE.info),
          detailKpi(t("dossiers.quick.waiting"), this.ageDays(d), "calendar_today", this.ageDays(d) > 14 && this.isOpen(d) ? TONE.erreur : TONE.attente),
          detailKpi(t("dossiers.quick.events"), d.history.length, "event_note", TONE.culture)
        ],
        facts: [
          detailFact(t("dossiers.new.sex"), t(d.draft.sex === "F" ? "dossiers.new.female" : "dossiers.new.male"), "person"),
          detailFact(t("producteurs.col.age"), d.draft.age === null ? null : t("cooperatives.fiche.detail.ageValue", { count: d.draft.age }), "calendar_today"),
          detailFact(t("producteurs.col.phone"), this.store.phone(d.draft.phone) || null, "call"),
          detailFact(t("producteurs.col.village"), d.draft.village, "location_on"),
          detailFact(t("producteurs.col.organisation"), org == null ? void 0 : org.name, "hub"),
          detailFact(t("dossiers.quick.member"), t(d.draft.createMember ? "dossiers.quick.yes" : "dossiers.quick.no"), "group"),
          detailFact(t("dossiers.quick.createdBy"), d.createdBy, "badge"),
          detailFact(t("dossiers.quick.createdAt"), fmtDate(d.createdAt), "event_note"),
          detailFact(t("dossiers.quick.submittedAt"), d.submittedAt ? fmtDate(d.submittedAt) : null, "upload_file"),
          detailFact(t("dossiers.quick.decision"), decision, "gavel", { wide: true })
        ],
        sections: [{
          title: t("dossiers.quick.history"),
          icon: "event_note",
          count: history.length || null,
          empty: t("dossiers.quick.historyEmpty"),
          items: history.slice(0, 8).map((h) => ({
            label: t(`dossiers.event.${h.action}`),
            sub: `${fmtDate(h.at)} \xB7 ${h.by}${h.comment ? ` \xB7 ${h.comment}` : ""}`
          })),
          more: Math.max(0, history.length - 8)
        }],
        link: ["/dashboard/dossiers", d.id]
      };
    }, ...[]);
    this.orgOptions = computed(() => this.store.state().orgs.filter((o) => o.scoopId === this.form().scoopId).sort((a, b) => a.name.localeCompare(b.name)).map((o) => ({
      value: o.id,
      label: o.name,
      ...o.village ? { hint: o.village } : {}
    })), ...[]);
    this.fileSlots = computed(() => {
      const t = this.t();
      const icon = {
        cni: "badge",
        photo: "account_circle",
        justificatif: "description",
        autre: "folder_open"
      };
      return DOCUMENT_KINDS.map((k) => ({
        id: k,
        label: t(this.kindKey(k)),
        hint: t(`dossiers.new.kindHint.${k}`),
        icon: icon[k],
        sensitive: k === "cni"
      }));
    }, ...[]);
    this.slotFiles = computed(() => this.files().map((f) => ({
      key: f.key,
      name: f.name,
      sizeKb: f.sizeKb,
      slot: f.kind
    })), ...[]);
  }
  name(d) {
    return `${d.draft.firstName} ${d.draft.lastName}`.trim() || `${this.t()("dossiers.row.noFirstName")} ${this.t()("dossiers.row.noLastName")}`;
  }
  /** Ancienneté : depuis la soumission, sinon depuis la création. */
  ageDays(d) {
    var _a2;
    return Math.max(0, Math.floor((Date.now() - new Date((_a2 = d.submittedAt) != null ? _a2 : d.createdAt).getTime()) / DAY));
  }
  isOpen(d) {
    return d.status !== "approuv\xE9" && d.status !== "refus\xE9";
  }
  scoopName(id) {
    var _a2, _b;
    return (_b = (_a2 = this.store.state().scoops.find((s) => s.id === id)) == null ? void 0 : _a2.name) != null ? _b : id;
  }
  statusKey(s) {
    return `dossiers.status.${s}`;
  }
  kindKey(k) {
    return `dossiers.kind.${k}`;
  }
  err(field) {
    var _a2, _b;
    return (_b = (_a2 = this.issues().find((i) => i.field === field)) == null ? void 0 : _a2.message) != null ? _b : "";
  }
  setField(key, value) {
    this.form.update((f) => ({
      ...f,
      [key]: value
    }));
    this.issues.update((list) => list.filter((i) => i.field !== key));
  }
  setScoop(scoopId) {
    this.form.update((f) => ({
      ...f,
      scoopId,
      orgId: ""
    }));
  }
  /** Choisir l'organisation propose son village quand il n'est pas encore saisi. */
  setOrg(orgId) {
    const org = this.store.state().orgs.find((o) => o.id === orgId);
    this.form.update((f) => {
      var _a2;
      return {
        ...f,
        orgId,
        village: f.village.trim() ? f.village : (_a2 = org == null ? void 0 : org.village) != null ? _a2 : ""
      };
    });
    this.issues.update((list) => list.filter((i) => i.field !== "orgId" && (i.field !== "village" || !(org == null ? void 0 : org.village))));
  }
  openNew() {
    var _a2, _b;
    this.form.set(emptyForm((_b = (_a2 = this.createScoops()[0]) == null ? void 0 : _a2.id) != null ? _b : ""));
    this.issues.set([]);
    this.files.set([]);
    this.newOpen.set(true);
  }
  addFiles(kind, list) {
    for (const file of list) {
      const sizeKb = Math.ceil(file.size / 1024);
      if (sizeKb > MAX_FILE_KB) {
        this.snackbar.error(this.t()("dossiers.new.tooBig", {
          name: file.name,
          mb: this.maxMb
        }));
        continue;
      }
      this.files.update((f) => [...f, {
        key: `${Date.now()}-${f.length}-${file.name}`,
        name: file.name,
        sizeKb,
        mime: file.type || "application/octet-stream",
        kind
      }]);
    }
    this.issues.update((issues) => issues.filter((i) => i.field !== "pi\xE8ces"));
  }
  removeFile(key) {
    this.files.update((f) => f.filter((x) => x.key !== key));
  }
  /** Un brouillon demande au moins le prénom, le nom et la SCOOP. */
  canDraft() {
    const f = this.form();
    return !!(f.firstName.trim() && f.lastName.trim() && f.scoopId);
  }
  draft() {
    const f = this.form();
    const age = f.age.trim() === "" ? null : Number(f.age);
    return {
      firstName: f.firstName.trim(),
      lastName: f.lastName.trim(),
      sex: f.sex,
      age: Number.isFinite(age) ? age : null,
      phone: f.phone.trim(),
      cni: f.cni.replace(/\s/g, ""),
      village: f.village.trim(),
      orgId: f.orgId,
      createMember: f.createMember
    };
  }
  /**
  * Crée le dossier, joint les pièces, puis le soumet si demandé.
  * Soumettre applique d'abord les contrôles du store (`validateDraft`) : erreurs affichées champ par champ.
  */
  submitNew(submit) {
    const draft = this.draft();
    if (submit) {
      const found = validateDraft(draft, this.files().length);
      if (found.length) {
        this.issues.set(found);
        this.snackbar.error(this.t()("dossiers.detail.edit.fixFields"));
        return;
      }
    } else if (!this.canDraft()) {
      this.issues.set(validateDraft(draft, 1).filter((i) => i.field === "firstName" || i.field === "lastName"));
      return;
    }
    const res = this.store.actions.createDossier(this.form().scoopId, draft);
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error));
      return;
    }
    for (const f of this.files()) {
      const added = this.store.actions.addDocument(res.id, {
        kind: f.kind,
        name: f.name,
        sizeKb: f.sizeKb,
        mime: f.mime
      });
      if (!added.ok) this.snackbar.error(this.locale.tNow(added.error));
    }
    let message = this.t()("dossiers.new.done");
    if (submit) {
      const sent = this.store.actions.submitDossier(res.id);
      message = sent.ok ? sent.possibleDuplicateOf ? `${this.t()("dossiers.detail.edit.submitted")} \xB7 ${this.t()("dossiers.detail.edit.duplicateFlagged")}` : this.t()("dossiers.detail.edit.submitted") : this.locale.tNow(sent.error);
    }
    this.newOpen.set(false);
    this.snackbar.success(message);
    this.router.navigate(["/dashboard/dossiers", res.id]);
  }
}, _a.\u0275fac = function DossiersPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-dossiers-page"]],
  decls: 73,
  vars: 79,
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
      "btn-primary"
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
      "icon",
      "folder_shared",
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
      "pb-6",
      "pt-2"
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
    [1, "lbl"],
    [
      "role",
      "radiogroup",
      1,
      "seg",
      "seg-form",
      "mt-2"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      3,
      "click"
    ],
    [
      "preset",
      "age",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      "name",
      "call",
      3,
      "size"
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
      "cni",
      3,
      "valueChange",
      "label",
      "hint",
      "value",
      "error"
    ],
    [
      "name",
      "hub",
      3,
      "size"
    ],
    [
      "leadingIcon",
      "hub",
      1,
      "mt-2",
      "block",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [1, "field-err"],
    [
      "preset",
      "village",
      3,
      "valueChange",
      "label",
      "value",
      "error"
    ],
    [
      1,
      "check",
      "mt-5"
    ],
    [
      "type",
      "checkbox",
      3,
      "change",
      "checked"
    ],
    [
      "name",
      "upload_file",
      3,
      "size"
    ],
    [1, "n"],
    [
      "accept",
      "image/*,application/pdf",
      3,
      "added",
      "removed",
      "slots",
      "files",
      "hint"
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
      "btn-ghost",
      3,
      "click",
      "disabled"
    ],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-primary"
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
      "add",
      3,
      "size"
    ],
    [1, "overflow-x-auto"],
    [
      1,
      "tbl",
      "min-w-[880px]"
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
    [
      1,
      "flex",
      "items-center",
      "gap-3"
    ],
    [1, "avatar"],
    [
      1,
      "block",
      "truncate",
      "font-bold"
    ],
    [
      1,
      "sub",
      "flex",
      "items-center",
      "gap-1.5",
      "truncate"
    ],
    [
      1,
      "badge",
      "dup"
    ],
    [
      1,
      "max-w-52",
      "truncate",
      "font-medium",
      3,
      "title"
    ],
    [1, "font-medium"],
    [
      1,
      "whitespace-nowrap",
      "font-medium",
      "tabular-nums"
    ],
    [
      1,
      "whitespace-nowrap",
      "text-right",
      "font-extrabold",
      "tabular-nums"
    ],
    [1, "badge"],
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
      "name",
      "folder_open",
      3,
      "size"
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
    ],
    [
      "leadingIcon",
      "apartment",
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
      "name",
      "warning",
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
      "btn-primary",
      3,
      "click"
    ],
    [
      "name",
      "arrow_forward",
      3,
      "size"
    ]
  ],
  template: function DossiersPage_Template(rf, ctx) {
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
      __conditionalCreate(9, DossiersPage_Conditional_9_Template, 4, 2, "button", 6);
      __elementEnd();
      __element(10, "ui-stat-cards", 7);
      __elementStart(11, "div", 8)(12, "label", 9);
      __element(13, "ui-icon", 10);
      __elementStart(14, "input", 11);
      __listener("input", function DossiersPage_Template_input_input_14_listener($event) {
        return ctx.q.set($event.target.value);
      });
      __elementEnd()();
      __elementStart(15, "div", 12);
      __repeaterCreate(16, DossiersPage_For_17_Template, 4, 7, "button", 13, _forTrack0);
      __elementEnd()();
      __elementStart(18, "p", 14);
      __text(19);
      __elementEnd();
      __elementStart(20, "section", 15);
      __conditionalCreate(21, DossiersPage_Conditional_21_Template, 22, 8)(22, DossiersPage_Conditional_22_Template, 6, 3, "div", 16);
      __elementEnd();
      __elementStart(23, "ui-detail-modal", 17);
      __listener("closed", function DossiersPage_Template_ui_detail_modal_closed_23_listener() {
        return ctx.detailId.set(null);
      });
      __elementEnd();
      __elementStart(24, "ui-modal", 18);
      __listener("closed", function DossiersPage_Template_ui_modal_closed_24_listener() {
        return ctx.newOpen.set(false);
      });
      __elementStart(25, "div", 19)(26, "h3", 20);
      __element(27, "ui-icon", 21);
      __text(28);
      __elementEnd();
      __elementStart(29, "div", 22)(30, "ui-text-field", 23);
      __listener("valueChange", function DossiersPage_Template_ui_text_field_valueChange_30_listener($event) {
        return ctx.setField("firstName", $event);
      });
      __elementEnd();
      __elementStart(31, "ui-text-field", 24);
      __listener("valueChange", function DossiersPage_Template_ui_text_field_valueChange_31_listener($event) {
        return ctx.setField("lastName", $event);
      });
      __elementEnd();
      __elementStart(32, "div")(33, "p", 25);
      __text(34);
      __elementEnd();
      __elementStart(35, "div", 26)(36, "button", 27);
      __listener("click", function DossiersPage_Template_button_click_36_listener() {
        return ctx.setField("sex", "F");
      });
      __text(37);
      __elementEnd();
      __elementStart(38, "button", 27);
      __listener("click", function DossiersPage_Template_button_click_38_listener() {
        return ctx.setField("sex", "H");
      });
      __text(39);
      __elementEnd()()();
      __elementStart(40, "ui-text-field", 28);
      __listener("valueChange", function DossiersPage_Template_ui_text_field_valueChange_40_listener($event) {
        return ctx.setField("age", $event);
      });
      __elementEnd()();
      __elementStart(41, "h3", 20);
      __element(42, "ui-icon", 29);
      __text(43);
      __elementEnd();
      __elementStart(44, "div", 22)(45, "ui-text-field", 30);
      __listener("valueChange", function DossiersPage_Template_ui_text_field_valueChange_45_listener($event) {
        return ctx.setField("phone", $event);
      });
      __elementEnd();
      __elementStart(46, "ui-text-field", 31);
      __listener("valueChange", function DossiersPage_Template_ui_text_field_valueChange_46_listener($event) {
        return ctx.setField("cni", $event);
      });
      __elementEnd()();
      __elementStart(47, "h3", 20);
      __element(48, "ui-icon", 32);
      __text(49);
      __elementEnd();
      __elementStart(50, "div", 22);
      __conditionalCreate(51, DossiersPage_Conditional_51_Template, 4, 4, "div");
      __elementStart(52, "div")(53, "p", 25);
      __text(54);
      __elementEnd();
      __elementStart(55, "ui-select", 33);
      __listener("valueChange", function DossiersPage_Template_ui_select_valueChange_55_listener($event) {
        return ctx.setOrg($event);
      });
      __elementEnd();
      __conditionalCreate(56, DossiersPage_Conditional_56_Template, 3, 2, "p", 34);
      __elementEnd();
      __elementStart(57, "ui-text-field", 35);
      __listener("valueChange", function DossiersPage_Template_ui_text_field_valueChange_57_listener($event) {
        return ctx.setField("village", $event);
      });
      __elementEnd()();
      __elementStart(58, "label", 36)(59, "input", 37);
      __listener("change", function DossiersPage_Template_input_change_59_listener($event) {
        return ctx.setField("createMember", $event.target.checked);
      });
      __elementEnd();
      __elementStart(60, "span");
      __text(61);
      __elementEnd()();
      __elementStart(62, "h3", 20);
      __element(63, "ui-icon", 38);
      __text(64);
      __conditionalCreate(65, DossiersPage_Conditional_65_Template, 2, 1, "span", 39);
      __elementEnd();
      __elementStart(66, "ui-file-slots", 40);
      __listener("added", function DossiersPage_Template_ui_file_slots_added_66_listener($event) {
        return ctx.addFiles($event.slot, $event.files);
      })("removed", function DossiersPage_Template_ui_file_slots_removed_66_listener($event) {
        return ctx.removeFile($event);
      });
      __elementEnd();
      __conditionalCreate(67, DossiersPage_Conditional_67_Template, 3, 2, "p", 34);
      __elementEnd();
      __elementStart(68, "button", 41);
      __listener("click", function DossiersPage_Template_button_click_68_listener() {
        return ctx.newOpen.set(false);
      });
      __text(69);
      __elementEnd();
      __elementStart(70, "button", 42);
      __listener("click", function DossiersPage_Template_button_click_70_listener() {
        return ctx.submitNew(false);
      });
      __text(71);
      __elementEnd();
      __conditionalCreate(72, DossiersPage_Conditional_72_Template, 4, 2, "button", 43);
      __elementEnd()();
    }
    if (rf & 2) {
      __property("perm", ctx.perms)("area", ctx.t()("dossiers.area"));
      __advance(4);
      __textInterpolate(ctx.t()("dossiers.eyebrow"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("dossiers.title"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.store.can("dossier.review") ? ctx.t()("dossiers.description.reviewer") : ctx.t()("dossiers.description.creator"), " ");
      __advance();
      __conditional(ctx.canCreate() ? 9 : -1);
      __advance();
      __property("stats", ctx.stats());
      __advance(3);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("dossiers.search.placeholder"))("value", ctx.q());
      __attribute("aria-label", ctx.t()("dossiers.search.aria"));
      __advance();
      __attribute("aria-label", ctx.t()("dossiers.filter.group"));
      __advance();
      __repeater(ctx.filterButtons());
      __advance(3);
      __textInterpolate1(" ", ctx.t()("dossiers.count", __pureFunction2(74, _c0, ctx.nf.format(ctx.shown().length), ctx.nf.format(ctx.mine().length))), " ");
      __advance(2);
      __conditional(ctx.shown().length ? 21 : 22);
      __advance(2);
      __property("view", ctx.detail());
      __advance();
      __property("open", ctx.newOpen())("title", ctx.t()("dossiers.new.title"))("description", ctx.t()("dossiers.new.draftHint"))("width", 780)("closeLabel", ctx.t()("common.close"));
      __advance(3);
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("dossiers.new.section.identity"), " ");
      __advance(2);
      __property("label", ctx.t()("dossiers.new.firstName"))("value", ctx.form().firstName)("error", ctx.err("firstName"));
      __advance();
      __property("label", ctx.t()("dossiers.new.lastName"))("value", ctx.form().lastName)("error", ctx.err("lastName"));
      __advance(3);
      __textInterpolate(ctx.t()("dossiers.new.sex"));
      __advance();
      __attribute("aria-label", ctx.t()("dossiers.new.sex"));
      __advance();
      __classProp("on", ctx.form().sex === "F");
      __attribute("aria-checked", ctx.form().sex === "F");
      __advance();
      __textInterpolate1(" ", ctx.t()("dossiers.new.female"), " ");
      __advance();
      __classProp("on", ctx.form().sex === "H");
      __attribute("aria-checked", ctx.form().sex === "H");
      __advance();
      __textInterpolate1(" ", ctx.t()("dossiers.new.male"), " ");
      __advance();
      __property("label", ctx.t()("dossiers.detail.info.age"))("value", ctx.form().age)("error", ctx.err("age"));
      __advance(2);
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("dossiers.new.section.contact"), " ");
      __advance(2);
      __property("label", ctx.t()("dossiers.detail.info.phone"))("value", ctx.form().phone)("error", ctx.err("phone"));
      __advance();
      __property("label", ctx.t()("dossiers.detail.info.cni"))("hint", ctx.t()("dossiers.detail.edit.cniHint"))("value", ctx.form().cni)("error", ctx.err("cni"));
      __advance(2);
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("dossiers.new.section.attach"), " ");
      __advance(2);
      __conditional(ctx.createScoops().length > 1 ? 51 : -1);
      __advance(3);
      __textInterpolate(ctx.t()("dossiers.detail.info.org"));
      __advance();
      __property("label", ctx.t()("dossiers.detail.info.org"))("options", ctx.orgOptions())("value", ctx.form().orgId);
      __advance();
      __conditional(ctx.err("orgId") ? 56 : -1);
      __advance();
      __property("label", ctx.t()("dossiers.detail.info.village"))("value", ctx.form().village)("error", ctx.err("village"));
      __advance(2);
      __property("checked", ctx.form().createMember);
      __advance(2);
      __textInterpolate(ctx.t()("dossiers.detail.edit.createMember"));
      __advance(2);
      __property("size", 18);
      __advance();
      __textInterpolate1("", ctx.t()("dossiers.new.section.pieces"), " ");
      __advance();
      __conditional(ctx.files().length ? 65 : -1);
      __advance();
      __property("slots", ctx.fileSlots())("files", ctx.slotFiles())("hint", ctx.t()("dossiers.new.filesHint", __pureFunction1(77, _c1, ctx.maxMb)));
      __advance();
      __conditional(ctx.err("pi\xE8ces") ? 67 : -1);
      __advance(2);
      __textInterpolate1(" ", ctx.t()("common.cancel"), " ");
      __advance();
      __property("disabled", !ctx.canDraft());
      __advance();
      __textInterpolate1(" ", ctx.t()("dossiers.new.submit"), " ");
      __advance();
      __conditional(ctx.store.can("dossier.submit") ? 72 : -1);
    }
  },
  dependencies: [
    AppShellComponent,
    FileSlotsComponent,
    IconComponent,
    ModalComponent,
    DetailModalComponent,
    PaginationComponent,
    SelectComponent,
    StatCardsComponent,
    TextFieldComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".lbl[_ngcontent-%COMP%] {\n        font-size: 12px;\n        font-weight: 700;\n        letter-spacing: 0.06em;\n        text-transform: uppercase;\n        color: var(--%NS%v2-ardoise);\n      }\n      .seg-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n        flex: 1;\n        justify-content: center;\n      }\n      .dup[_ngcontent-%COMP%] {\n        background: var(--%NS%v2-bloquant-bg);\n        color: var(--%NS%v2-bloquant-fg);\n      }\n      .sec[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        margin: 26px 0 14px;\n        font-size: 14px;\n        font-weight: 800;\n        color: var(--%NS%v2-foret);\n      }\n      .sec[_ngcontent-%COMP%]:first-child {\n        margin-top: 4px;\n      }\n      .sec[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n        border-radius: 999px;\n        background: var(--%NS%v2-foret);\n        padding: 1px 8px;\n        font-size: 12px;\n        color: var(--%NS%v2-citron);\n      }\n      .field-err[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 6px;\n        margin-top: 6px;\n        font-size: 13px;\n        font-weight: 700;\n        color: var(--%NS%v2-erreur-fg);\n      }\n      .check[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 10px;\n        font-size: 14px;\n        font-weight: 600;\n        cursor: pointer;\n      }\n      .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n        height: 20px;\n        width: 20px;\n        accent-color: var(--%NS%v2-foret);\n        cursor: pointer;\n      }"]
}), _a);

export { DossiersPage as default };
//# sourceMappingURL=dossiers.page-CuQiPePF.mjs.map

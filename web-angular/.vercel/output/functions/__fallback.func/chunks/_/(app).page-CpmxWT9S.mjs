import { ɵ as __defineComponent, b as __element, ab as viewChild, i as inject, R as Router, ag as DestroyRef, F as signal, c as computed, b4 as NavigationEnd, ac as afterNextRender, e as effect, d as RouterLink, b5 as RouterOutlet, j as __conditionalCreate, y as __template, s as __conditional, X as __viewQuerySignal, Y as __queryAdvance, al as Injector, H as __listener, aa as input, a8 as untracked, m as __repeaterCreate, V as __repeaterTrackByIdentity, v as __repeater, r as __pureFunction1, f as __elementStart, h as __elementEnd, o as __advance, a6 as __repeaterTrackByIndex, g as __text, w as __nextContext, u as __attribute, n as __property, q as __textInterpolate1, L as __getCurrentView, z as __classProp, p as __textInterpolate, ai as __defineInjectable, a5 as __classMap, M as __pureFunction0, N as __textInterpolate2, O as __restoreView, P as __resetView, S as __resolveDocument, a1 as __sanitizeUrl, E as __templateRefExtractor, B as __elementContainer, C as __reference, t as __styleProp } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { B as BRAND, a as CRADESC, C as CommonModule, N as NgTemplateOutlet, U as UiModalA11yDirective, b as BrandLogoComponent, I as IconComponent, c as SnackbarComponent } from './snackbar.component-sjBBVJT0.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { ab as MapPinned, l as LoaderCircle, L as LogOut, ac as ChevronDown, d as Search, ad as Menu, e as LucideAngularModule, f as LucideAngularComponent, X } from './lucide-angular-RJABeBQ2.mjs';
import { A as can, L as LocaleService, b as scopedDossiers, f as fmtDateTime, au as scoopNamesOf, p as maskPhone, i as inScope, q as scoopIdsOf, aj as isApiMode, o as actions, C as getState, ao as getAccessToken, ap as clearTokens } from './locale.service-c0QhtcVY.mjs';
import { a as apiFetch } from './client-D1lxPQMx.mjs';
import { l as logoutAuthSideEffects } from './auth-B3-o0LRT.mjs';
import { q as qualityCounts } from './quality-nav-DwckdAsn.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { N as NAV, n as navAllowed } from './nav-CV7kBTDN.mjs';
import { filter, map } from 'rxjs';
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
import './policy-CKiWt4l5.mjs';
import 'zod';

var _a, _b, _c, _d, _e, _f;
async function hydrateSessionFromApi() {
  if (!isApiMode()) {
    actions.restoreSession();
    return getState().session !== null;
  }
  if (!getAccessToken()) {
    actions.logout();
    return false;
  }
  try {
    const me = await apiFetch("/me");
    actions.login(me.name, me.email, me.role, me.permissions);
    return true;
  } catch {
    clearTokens();
    actions.logout();
    return false;
  }
}
var _c0$2 = (a0) => [a0];
var _c1$2 = () => [];
var _forTrack0$3 = ($index, $item) => $item.id;
var _forTrack1$1 = ($index, $item) => $item.to;
var _forTrack2 = ($index, $item) => $item.labelKey;
function SidebarNavComponent_For_1_Conditional_1_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) __element(0, "div", 2);
}
function SidebarNavComponent_For_1_Conditional_1_For_1_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) __element(0, "span", 7);
}
function SidebarNavComponent_For_1_Conditional_1_For_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 5);
    __element(1, "ui-icon", 6);
    __conditionalCreate(2, SidebarNavComponent_For_1_Conditional_1_For_1_For_3_Conditional_2_Template, 1, 0, "span", 7);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = __nextContext(4);
    __classProp("active", ctx_r1.isActive(item_r1));
    __property("routerLink", ctx_r1.linkFor(item_r1));
    __attribute("aria-current", ctx_r1.isActive(item_r1) ? "page" : null)("aria-label", ctx_r1.t()(item_r1.labelKey))("title", ctx_r1.t()(item_r1.labelKey));
    __advance();
    __property("name", ctx_r1.iconOf(item_r1))("size", 22);
    __advance();
    __conditional(ctx_r1.badge()(item_r1.to) > 0 ? 2 : -1);
  }
}
function SidebarNavComponent_For_1_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    __conditionalCreate(0, SidebarNavComponent_For_1_Conditional_1_For_1_Conditional_0_Template, 1, 0, "div", 2);
    __elementStart(1, "div", 3);
    __repeaterCreate(2, SidebarNavComponent_For_1_Conditional_1_For_1_For_3_Template, 3, 9, "a", 4, _forTrack1$1);
    __elementEnd();
  }
  if (rf & 2) {
    const group_r3 = ctx.$implicit;
    const \u0275$index_5_r4 = ctx.$index;
    const ctx_r1 = __nextContext(3);
    __conditional(!(\u0275$index_5_r4 === 0) && !group_r3.soon ? 0 : -1);
    __advance(2);
    __repeater(group_r3.soon ? __pureFunction0(1, _c1$2) : ctx_r1.allowedItems(group_r3));
  }
}
function SidebarNavComponent_For_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) __repeaterCreate(0, SidebarNavComponent_For_1_Conditional_1_For_1_Template, 4, 2, null, null, _forTrack0$3);
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __repeater(ctx_r1.visibleGroups());
  }
}
function SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 11);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const group_r5 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __classProp("section-super", group_r5.section === "superadmin");
    __advance();
    __textInterpolate(ctx_r1.t()(group_r5.section === "modules" ? "shell.nav.modules" : group_r5.section === "superadmin" ? "nav.group.superadmin" : "shell.nav.tools"));
  }
}
function SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_1_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 15);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r6 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(5);
    __advance();
    __textInterpolate(ctx_r1.badge()(item_r6.to));
  }
}
function SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 13);
    __element(1, "ui-icon", 6);
    __elementStart(2, "span", 14);
    __text(3);
    __elementEnd();
    __conditionalCreate(4, SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_1_For_2_Conditional_4_Template, 2, 1, "span", 15);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r1 = __nextContext(5);
    __classProp("active", ctx_r1.isActive(item_r6));
    __property("routerLink", ctx_r1.linkFor(item_r6));
    __attribute("aria-current", ctx_r1.isActive(item_r6) ? "page" : null);
    __advance();
    __property("name", ctx_r1.iconOf(item_r6))("size", 22);
    __advance(2);
    __textInterpolate(ctx_r1.t()(item_r6.labelKey));
    __advance();
    __conditional(ctx_r1.badge()(item_r6.to) > 0 ? 4 : -1);
  }
}
function SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 3);
    __repeaterCreate(1, SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_1_For_2_Template, 5, 8, "a", 12, _forTrack1$1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r6 = __nextContext();
    const group_r5 = ctx_r6.$implicit;
    const \u0275$index_20_r8 = ctx_r6.$index;
    const ctx_r1 = __nextContext(3);
    __classProp("mt-1", !(\u0275$index_20_r8 === 0) && !group_r5.section);
    __advance();
    __repeater(ctx_r1.allowedItems(group_r5));
  }
}
function SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 20);
    __element(1, "ui-icon", 25);
    __elementStart(2, "span", 26);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(5);
    __attribute("title", ctx_r1.t()("modules.state.soon"));
    __advance();
    __property("size", 15);
    __advance(2);
    __textInterpolate(ctx_r1.t()("modules.state.soon"));
  }
}
function SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 15);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const group_r5 = __nextContext(2).$implicit;
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r1.pending(group_r5));
  }
}
function SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_For_13_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 27)(1, "span", 14);
    __text(2);
    __elementEnd()();
  }
  if (rf & 2) {
    const item_r10 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(5);
    __advance(2);
    __textInterpolate(ctx_r1.t()(item_r10.labelKey));
  }
}
function SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_For_13_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 15);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r10 = __nextContext(2).$implicit;
    const ctx_r1 = __nextContext(5);
    __advance();
    __textInterpolate(ctx_r1.badge()(item_r10.to));
  }
}
function SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_For_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 29)(1, "span", 14);
    __text(2);
    __elementEnd();
    __conditionalCreate(3, SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_For_13_Conditional_1_Conditional_3_Template, 2, 1, "span", 15);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r10 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(5);
    __classProp("active", ctx_r1.isActive(item_r10));
    __property("routerLink", ctx_r1.linkFor(item_r10));
    __attribute("aria-current", ctx_r1.isActive(item_r10) ? "page" : null);
    __advance(2);
    __textInterpolate(ctx_r1.t()(item_r10.labelKey));
    __advance();
    __conditional(ctx_r1.badge()(item_r10.to) > 0 ? 3 : -1);
  }
}
function SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_For_13_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_For_13_Conditional_0_Template, 3, 1, "span", 27)(1, SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_For_13_Conditional_1_Template, 4, 6, "a", 28);
  if (rf & 2) {
    const group_r5 = __nextContext(2).$implicit;
    __conditional(group_r5.soon ? 0 : 1);
  }
}
function SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = __getCurrentView();
    __elementStart(0, "div", 16)(1, "button", 17);
    __listener("click", function SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_Template_button_click_1_listener() {
      __restoreView(_r9);
      const group_r5 = __nextContext().$implicit;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.toggle(group_r5));
    });
    __element(2, "ui-icon", 6);
    __elementStart(3, "span", 18)(4, "span", 19);
    __text(5);
    __elementEnd()();
    __conditionalCreate(6, SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_Conditional_6_Template, 4, 3, "span", 20);
    __conditionalCreate(7, SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_Conditional_7_Template, 2, 1, "span", 15);
    __element(8, "ui-icon", 21);
    __elementEnd();
    __elementStart(9, "div", 22)(10, "div", 23)(11, "div", 24);
    __repeaterCreate(12, SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_For_13_Template, 2, 1, null, null, _forTrack2);
    __elementEnd()()()();
  }
  if (rf & 2) {
    const group_r5 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __classProp("open", ctx_r1.isOpen(group_r5))("super", group_r5.id === "superadmin");
    __advance();
    __classProp("current", ctx_r1.hasActive(group_r5));
    __attribute("aria-expanded", ctx_r1.isOpen(group_r5))("aria-controls", ctx_r1.panelId(group_r5));
    __advance();
    __property("name", group_r5.icon)("size", 22);
    __advance(2);
    __classProp("opacity-60", group_r5.soon);
    __advance();
    __textInterpolate(ctx_r1.t()(group_r5.labelKey));
    __advance();
    __conditional(group_r5.soon ? 6 : -1);
    __advance();
    __conditional(!ctx_r1.isOpen(group_r5) && ctx_r1.pending(group_r5) > 0 ? 7 : -1);
    __advance();
    __property("size", 20);
    __advance();
    __property("id", ctx_r1.panelId(group_r5));
    __attribute("inert", ctx_r1.isOpen(group_r5) ? null : "");
    __advance(3);
    __repeater(ctx_r1.allowedItems(group_r5));
  }
}
function SidebarNavComponent_For_1_Conditional_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    __conditionalCreate(0, SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_0_Template, 2, 3, "p", 8);
    __conditionalCreate(1, SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_1_Template, 3, 2, "div", 9)(2, SidebarNavComponent_For_1_Conditional_2_For_1_Conditional_2_Template, 14, 18, "div", 10);
  }
  if (rf & 2) {
    const group_r5 = ctx.$implicit;
    const ctx_r1 = __nextContext(3);
    __conditional(group_r5.section && group_r5.section !== ctx_r1.previousSection(group_r5) ? 0 : -1);
    __advance();
    __conditional(group_r5.flat ? 1 : 2);
  }
}
function SidebarNavComponent_For_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) __repeaterCreate(0, SidebarNavComponent_For_1_Conditional_2_For_1_Template, 3, 2, null, null, _forTrack0$3);
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __repeater(ctx_r1.visibleGroups());
  }
}
function SidebarNavComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 1);
    __conditionalCreate(1, SidebarNavComponent_For_1_Conditional_1_Template, 2, 0)(2, SidebarNavComponent_For_1_Conditional_2_Template, 2, 0);
    __elementEnd();
  }
  if (rf & 2) {
    const mode_r11 = ctx.$implicit;
    __classProp("px-3", !mode_r11)("px-2.5", mode_r11);
    __advance();
    __conditional(mode_r11 ? 1 : 2);
  }
}
var M1_PATHS = [
  "/dashboard/cooperative",
  "/dashboard/cooperatives",
  "/dashboard/organisations",
  "/dashboard/producteurs",
  "/dashboard/dossiers",
  "/dashboard/personnel",
  "/dashboard/techniciens",
  "/dashboard/cotisations",
  "/dashboard/reunions",
  "/dashboard/documents",
  "/dashboard/rappels"
];
var ALL_ITEMS = NAV.flatMap((g) => g.items);
var byPath = (paths) => paths.map((path) => ALL_ITEMS.find((item) => item.to === path)).filter((item) => !!item);
var soonOf = (module) => ALL_ITEMS.filter((i) => i.soon && i.module === module);
var itemsOfSection = (name) => {
  var _a2, _b2;
  return (_b2 = (_a2 = NAV.find((g) => g.group === name)) == null ? void 0 : _a2.items.filter((i) => !i.soon)) != null ? _b2 : [];
};
var SCREEN_ICONS = {
  "/": "space_dashboard",
  "/dashboard/rapports": "analytics",
  "/dashboard/cooperative": "home_work",
  "/dashboard/cooperatives": "diversity_3",
  "/dashboard/personnel": "manage_accounts",
  "/dashboard/producteurs": "agriculture",
  "/dashboard/dossiers": "folder_shared",
  "/dashboard/organisations": "hub",
  "/dashboard/cotisations": "payments",
  "/dashboard/reunions": "event",
  "/dashboard/documents": "description",
  "/dashboard/rappels": "notifications_active",
  "/dashboard/techniciens": "badge",
  "/dashboard/roles-cooperative": "admin_panel_settings",
  "/dashboard/qualite": "verified",
  "/dashboard/utilisateurs": "manage_accounts",
  "/dashboard/comptes": "link",
  "/dashboard/appareils": "devices",
  "/dashboard/referentiels": "dataset",
  "/dashboard/imports": "upload_file",
  "/dashboard/donnees": "database",
  "/dashboard/audit": "history",
  "/dashboard/super-admin/roles": "admin_panel_settings",
  "/dashboard/super-admin/comptes": "manage_accounts"
};
var MODULE_GROUPS = [
  {
    id: "pilotage",
    labelKey: "nav.group.pilotage",
    icon: "space_dashboard",
    items: itemsOfSection("Pilotage"),
    soon: false,
    flat: true,
    defaultOpen: true
  },
  {
    id: "superadmin",
    section: "superadmin",
    labelKey: "nav.group.superadmin",
    icon: "lock",
    items: itemsOfSection("Super administration"),
    soon: false,
    defaultOpen: true
  },
  {
    id: "m1",
    section: "modules",
    labelKey: "modules.administratif.name",
    icon: "badge",
    items: byPath(M1_PATHS),
    soon: false,
    defaultOpen: true
  },
  {
    id: "m2",
    section: "modules",
    labelKey: "modules.commercial.name",
    icon: "storefront",
    items: soonOf("commercial"),
    soon: true,
    defaultOpen: false
  },
  {
    id: "m3",
    section: "modules",
    labelKey: "modules.exploitation.name",
    icon: "query_stats",
    items: soonOf("exploitation"),
    soon: true,
    defaultOpen: false
  },
  {
    id: "m4",
    section: "modules",
    labelKey: "modules.agronomique.name",
    icon: "potted_plant",
    items: soonOf("agronomique"),
    soon: true,
    defaultOpen: false
  },
  {
    id: "m5",
    section: "modules",
    labelKey: "modules.sig.name",
    icon: "pin_drop",
    items: soonOf("sig"),
    soon: true,
    defaultOpen: false
  },
  {
    id: "qualite",
    section: "tools",
    labelKey: "nav.item.qualite",
    icon: "verified",
    items: byPath(["/dashboard/qualite"]),
    soon: false,
    flat: true,
    defaultOpen: true
  },
  {
    id: "admin",
    section: "tools",
    labelKey: "nav.group.administration",
    icon: "tune",
    items: itemsOfSection("Administration"),
    soon: false,
    defaultOpen: false
  }
];
function readOpen() {
  return {};
}
var SidebarNavComponent = (_a = class {
  constructor() {
    this.session = input.required(...[]);
    this.path = input.required(...[]);
    this.badge = input.required(...[]);
    this.collapsed = input(false, ...[]);
    this.t = inject(LocaleService).t;
    this.stored = signal(readOpen(), ...[]);
    this.visibleGroups = computed(() => MODULE_GROUPS.filter((g) => this.allowedItems(g).length > 0), ...[]);
    effect(() => {
      this.path();
      const stored = untracked(this.stored);
      const reopen = MODULE_GROUPS.filter((g) => !g.flat && stored[g.id] === false && untracked(() => this.hasActive(g)));
      if (reopen.length === 0) return;
      const next = {
        ...stored,
        ...Object.fromEntries(reopen.map((g) => [g.id, true]))
      };
      this.stored.set(next);
    });
  }
  /** Entrées visibles : droits de la session ; un module « à venir » montre ses écrans prévus, grisés. */
  allowedItems(g) {
    if (g.soon) return g.items;
    const session = this.session();
    return g.items.filter((i) => !i.soon && navAllowed(session, i));
  }
  /** Section du bloc visible précédent (pour n'afficher chaque intitulé qu'une fois). */
  previousSection(g) {
    const groups = this.visibleGroups();
    const i = groups.indexOf(g);
    return i > 0 ? groups[i - 1].section : void 0;
  }
  iconOf(item) {
    var _a2;
    return (_a2 = SCREEN_ICONS[item.to]) != null ? _a2 : "dataset";
  }
  panelId(g) {
    return `nav-${g.id}`;
  }
  /** Le tableau de bord vit sous `/dashboard/<rôle>` ; les autres entrées gardent leur chemin. */
  linkFor(item) {
    return item.to === "/" ? ["/dashboard", this.session().role] : item.to;
  }
  isActive(item) {
    var _a2;
    if (!item.to) return false;
    const path = (_a2 = this.path().split(/[?#]/)[0]) != null ? _a2 : "";
    if (item.to === "/") return path === "/" || path === `/dashboard/${this.session().role}`;
    if (item.to === "/dashboard/cooperative") {
      const ownScoopIds = scoopIdsOf(this.session());
      return path === item.to || [...ownScoopIds].some((scoopId) => path === `/dashboard/cooperatives/${scoopId}` || path.startsWith(`/dashboard/cooperatives/${scoopId}/`));
    }
    return path === item.to || path.startsWith(`${item.to}/`);
  }
  hasActive(g) {
    return this.allowedItems(g).some((i) => this.isActive(i));
  }
  /** Choix mémorisé d'abord ; à défaut, le groupe de la page courante (ou ouvert par défaut) s'ouvre. */
  isOpen(g) {
    var _a2;
    if (g.flat) return true;
    return (_a2 = this.stored()[g.id]) != null ? _a2 : this.hasActive(g) || g.defaultOpen;
  }
  pending(g) {
    const badge = this.badge();
    return this.allowedItems(g).reduce((sum, i) => sum + badge(i.to), 0);
  }
  toggle(g) {
    const next = {
      ...this.stored(),
      [g.id]: !this.isOpen(g)
    };
    this.stored.set(next);
  }
}, _a.\u0275fac = function SidebarNavComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-sidebar-nav"]],
  hostAttrs: [
    1,
    "flex",
    "min-h-0",
    "flex-1",
    "flex-col"
  ],
  inputs: {
    session: [1, "session"],
    path: [1, "path"],
    badge: [1, "badge"],
    collapsed: [1, "collapsed"]
  },
  decls: 2,
  vars: 2,
  consts: [
    [
      1,
      "fade",
      "min-h-0",
      "flex-1",
      "overflow-y-auto",
      "overflow-x-hidden",
      "overscroll-contain",
      "pb-4",
      3,
      "px-3",
      "px-2.5"
    ],
    [
      1,
      "fade",
      "min-h-0",
      "flex-1",
      "overflow-y-auto",
      "overflow-x-hidden",
      "overscroll-contain",
      "pb-4"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "mx-3",
      "my-2",
      "h-px",
      2,
      "background",
      "var(--v2-foret-trait)"
    ],
    [1, "space-y-0.5"],
    [
      1,
      "rail-item",
      3,
      "active",
      "routerLink"
    ],
    [
      1,
      "rail-item",
      3,
      "routerLink"
    ],
    [
      3,
      "name",
      "size"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "dot"
    ],
    [
      1,
      "section",
      3,
      "section-super"
    ],
    [
      1,
      "space-y-0.5",
      3,
      "mt-1"
    ],
    [
      1,
      "module",
      3,
      "open",
      "super"
    ],
    [1, "section"],
    [
      1,
      "row",
      3,
      "active",
      "routerLink"
    ],
    [
      1,
      "row",
      3,
      "routerLink"
    ],
    [
      1,
      "flex-1",
      "truncate"
    ],
    [1, "badge"],
    [1, "module"],
    [
      "type",
      "button",
      1,
      "row",
      3,
      "click"
    ],
    [
      1,
      "flex",
      "min-w-0",
      "flex-1",
      "items-center",
      "gap-2"
    ],
    [1, "truncate"],
    [1, "soon"],
    [
      "name",
      "chevron_right",
      1,
      "chevron",
      3,
      "size"
    ],
    [
      1,
      "panel",
      3,
      "id"
    ],
    [1, "panel-inner"],
    [1, "tree"],
    [
      "name",
      "schedule",
      3,
      "size"
    ],
    [1, "sr-only"],
    [
      "aria-disabled",
      "true",
      1,
      "leaf",
      "leaf-soon"
    ],
    [
      1,
      "leaf",
      3,
      "active",
      "routerLink"
    ],
    [
      1,
      "leaf",
      3,
      "routerLink"
    ]
  ],
  template: function SidebarNavComponent_Template(rf, ctx) {
    if (rf & 1) __repeaterCreate(0, SidebarNavComponent_For_1_Template, 3, 5, "div", 0, __repeaterTrackByIdentity);
    if (rf & 2) __repeater(__pureFunction1(0, _c0$2, ctx.collapsed()));
  },
  dependencies: [RouterLink, IconComponent],
  styles: ["[_nghost-%COMP%] {\n      --%NS%muted-ink: color-mix(in oklab, var(--%NS%v2-blanc) 72%, transparent);\n      --%NS%guide: color-mix(in oklab, var(--%NS%v2-blanc) 16%, transparent);\n    }\n    .fade[_ngcontent-%COMP%] {\n      animation: _ngcontent-%COMP%_nav-fade 0.22s ease both;\n    }\n    @keyframes _ngcontent-%COMP%_nav-fade {\n      from {\n        opacity: 0;\n      }\n      to {\n        opacity: 1;\n      }\n    }\n\n    \n    .row[_ngcontent-%COMP%] {\n      position: relative;\n      display: flex;\n      width: 100%;\n      align-items: center;\n      gap: 12px;\n      border-radius: 14px;\n      padding: 10px 12px;\n      font-size: 14px;\n      font-weight: 600;\n      text-align: left;\n      color: var(--%NS%muted-ink);\n      cursor: pointer;\n      transition:\n        background-color 0.18s ease,\n        color 0.18s ease;\n    }\n    .row[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-foret-carte);\n      color: var(--%NS%v2-blanc);\n    }\n    .row.active[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n      font-weight: 800;\n    }\n    .row.current[_ngcontent-%COMP%] {\n      color: var(--%NS%v2-blanc);\n    }\n    \n    .module[_ngcontent-%COMP%] {\n      margin-top: 4px;\n      border-radius: 18px;\n      transition:\n        background-color 0.3s ease,\n        padding 0.3s ease;\n    }\n    .module.open[_ngcontent-%COMP%] {\n      background: color-mix(in oklab, var(--%NS%v2-blanc) 5%, transparent);\n      padding-bottom: 6px;\n    }\n    .module.open[_ngcontent-%COMP%]    > .row[_ngcontent-%COMP%]:hover {\n      background: color-mix(in oklab, var(--%NS%v2-blanc) 6%, transparent);\n    }\n    .section[_ngcontent-%COMP%] {\n      margin: 20px 12px 6px;\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 10.5px;\n      font-weight: 700;\n      letter-spacing: 0.1em;\n      text-transform: uppercase;\n      color: color-mix(in oklab, var(--%NS%v2-blanc) 42%, transparent);\n    }\n    \n    .section-super[_ngcontent-%COMP%] {\n      color: var(--%NS%v2-citron);\n    }\n    .module.super[_ngcontent-%COMP%] {\n      border: 1.5px solid color-mix(in oklab, var(--%NS%v2-citron) 55%, transparent);\n    }\n    .chevron[_ngcontent-%COMP%] {\n      transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1);\n      opacity: 0.7;\n    }\n    .open[_ngcontent-%COMP%]    > .row[_ngcontent-%COMP%]   .chevron[_ngcontent-%COMP%] {\n      transform: rotate(90deg);\n    }\n\n    \n    .panel[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-rows: 0fr;\n      opacity: 0;\n      transition:\n        grid-template-rows 0.3s cubic-bezier(0.32, 0.72, 0, 1),\n        opacity 0.22s ease;\n    }\n    .open[_ngcontent-%COMP%]    > .panel[_ngcontent-%COMP%] {\n      grid-template-rows: 1fr;\n      opacity: 1;\n    }\n    .panel-inner[_ngcontent-%COMP%] {\n      min-height: 0;\n      overflow: hidden;\n    }\n    .tree[_ngcontent-%COMP%] {\n      margin: 2px 0 4px 31px;\n    }\n\n    \n    .leaf[_ngcontent-%COMP%] {\n      position: relative;\n      display: flex;\n      align-items: center;\n      gap: 8px;\n      border-radius: 10px;\n      padding: 8px 12px;\n      font-size: 13.5px;\n      font-weight: 600;\n      color: var(--%NS%muted-ink);\n      cursor: pointer;\n      transition:\n        background-color 0.18s ease,\n        color 0.18s ease;\n    }\n    .leaf[_ngcontent-%COMP%]:hover {\n      color: var(--%NS%v2-blanc);\n      background: color-mix(in oklab, var(--%NS%v2-foret-carte) 70%, transparent);\n    }\n    .leaf.active[_ngcontent-%COMP%] {\n      color: var(--%NS%v2-citron);\n      font-weight: 800;\n      background: color-mix(in oklab, var(--%NS%v2-blanc) 8%, transparent);\n    }\n\n    .row[_ngcontent-%COMP%]:focus-visible, \n   .leaf[_ngcontent-%COMP%]:focus-visible, \n   .rail-item[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-citron);\n      outline-offset: 2px;\n    }\n\n    \n    .rail-item[_ngcontent-%COMP%] {\n      position: relative;\n      display: flex;\n      justify-content: center;\n      border-radius: 14px;\n      padding: 11px 0;\n      color: var(--%NS%muted-ink);\n      cursor: pointer;\n      transition:\n        background-color 0.18s ease,\n        color 0.18s ease;\n    }\n    .rail-item[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-foret-carte);\n      color: var(--%NS%v2-blanc);\n    }\n    .rail-item.active[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n    }\n\n    .soon[_ngcontent-%COMP%] {\n      display: grid;\n      flex-shrink: 0;\n      place-items: center;\n      color: color-mix(in oklab, var(--%NS%v2-blanc) 50%, transparent);\n    }\n    .leaf-soon[_ngcontent-%COMP%], \n   .leaf-soon[_ngcontent-%COMP%]:hover {\n      cursor: not-allowed;\n      background: none;\n      color: color-mix(in oklab, var(--%NS%v2-blanc) 38%, transparent);\n    }\n    .badge[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      background: var(--%NS%v2-citron);\n      padding: 1px 7px;\n      font-size: 11px;\n      font-weight: 800;\n      color: var(--%NS%v2-foret);\n      font-variant-numeric: tabular-nums;\n    }\n    .row.active[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n    }\n    .dot[_ngcontent-%COMP%] {\n      position: absolute;\n      top: 7px;\n      right: 14px;\n      height: 8px;\n      width: 8px;\n      border-radius: 999px;\n      background: var(--%NS%v2-citron);\n      box-shadow: 0 0 0 2px var(--%NS%v2-foret);\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      .fade[_ngcontent-%COMP%] {\n        animation: none;\n      }\n      .panel[_ngcontent-%COMP%], \n   .chevron[_ngcontent-%COMP%] {\n        transition: none;\n      }\n    }"]
}), _a);
var _c0$1 = ["qInput"];
var _c1$1 = (a0) => ({ q: a0 });
var _forTrack0$2 = ($index, $item) => $item.to;
var _forTrack1 = ($index, $item) => $item.id;
function CommandPaletteComponent_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 8);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("shell.palette.hint"));
  }
}
function CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_0_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "button", 12);
    __listener("click", function CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_0_For_3_Template_button_click_0_listener() {
      const item_r4 = __restoreView(_r3).$implicit;
      const ctx_r1 = __nextContext(4);
      return __resetView(ctx_r1.goPage(item_r4));
    });
    __element(1, "lucide-angular", 13);
    __elementStart(2, "span");
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = __nextContext(4);
    __advance();
    __property("img", item_r4.icon);
    __advance(2);
    __textInterpolate(ctx_r1.t()(item_r4.labelKey));
  }
}
function CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 10);
    __text(1);
    __elementEnd();
    __repeaterCreate(2, CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_0_For_3_Template, 4, 2, "button", 11, _forTrack0$2);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("shell.palette.pages"), " ");
    __advance();
    __repeater(ctx_r1.pageItems());
  }
}
function CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_1_For_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span");
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const producer_r6 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(4);
    __advance();
    __textInterpolate1(" \xB7 ", ctx_r1.store.phone(producer_r6.phone));
  }
}
function CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "button", 16);
    __listener("click", function CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_1_For_3_Template_button_click_0_listener() {
      const producer_r6 = __restoreView(_r5).$implicit;
      const ctx_r1 = __nextContext(4);
      return __resetView(ctx_r1.goProducer(producer_r6.id));
    });
    __elementStart(1, "span", 17);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 18);
    __text(4);
    __conditionalCreate(5, CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_1_For_3_Conditional_5_Template, 2, 1, "span");
    __elementEnd()();
  }
  if (rf & 2) {
    const producer_r6 = ctx.$implicit;
    const ctx_r1 = __nextContext(4);
    __advance(2);
    __textInterpolate2("", producer_r6.firstName, " ", producer_r6.lastName);
    __advance(2);
    __textInterpolate2(" ", producer_r6.code, " \xB7 ", producer_r6.village, " ");
    __advance();
    __conditional(ctx_r1.showPhoneHit()(producer_r6) ? 5 : -1);
  }
}
function CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 14);
    __text(1);
    __elementEnd();
    __repeaterCreate(2, CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_1_For_3_Template, 6, 5, "button", 15, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("shell.palette.producers"), " ");
    __advance();
    __repeater(ctx_r1.producerHits());
  }
}
function CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_2_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "button", 12);
    __listener("click", function CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_2_For_3_Template_button_click_0_listener() {
      const org_r8 = __restoreView(_r7).$implicit;
      const ctx_r1 = __nextContext(4);
      return __resetView(ctx_r1.goOrg(org_r8.id));
    });
    __elementStart(1, "span", 19);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 20);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const org_r8 = ctx.$implicit;
    __advance(2);
    __textInterpolate(org_r8.name);
    __advance(2);
    __textInterpolate(org_r8.village);
  }
}
function CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 14);
    __text(1);
    __elementEnd();
    __repeaterCreate(2, CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_2_For_3_Template, 5, 2, "button", 11, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("shell.palette.orgs"), " ");
    __advance();
    __repeater(ctx_r1.orgHits());
  }
}
function CommandPaletteComponent_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __conditionalCreate(0, CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_0_Template, 4, 1);
    __conditionalCreate(1, CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_1_Template, 4, 1);
    __conditionalCreate(2, CommandPaletteComponent_Conditional_0_Conditional_9_Conditional_2_Template, 4, 1);
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __conditional(ctx_r1.pageItems().length > 0 ? 0 : -1);
    __advance();
    __conditional(ctx_r1.producerHits().length > 0 ? 1 : -1);
    __advance();
    __conditional(ctx_r1.orgHits().length > 0 ? 2 : -1);
  }
}
function CommandPaletteComponent_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 9);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("shell.palette.empty", __pureFunction1(1, _c1$1, ctx_r1.q())), " ");
  }
}
function CommandPaletteComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "div", 2);
    __listener("click", function CommandPaletteComponent_Conditional_0_Template_div_click_0_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.closeFromBackdrop($event));
    });
    __elementStart(1, "div", 3);
    __listener("click", function CommandPaletteComponent_Conditional_0_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    __elementStart(2, "h2", 4);
    __text(3);
    __elementEnd();
    __elementStart(4, "div", 5)(5, "input", 6, 0);
    __listener("input", function CommandPaletteComponent_Conditional_0_Template_input_input_5_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.onQuery($event.target.value));
    });
    __elementEnd()();
    __elementStart(7, "div", 7);
    __conditionalCreate(8, CommandPaletteComponent_Conditional_0_Conditional_8_Template, 2, 1, "p", 8);
    __conditionalCreate(9, CommandPaletteComponent_Conditional_0_Conditional_9_Template, 3, 3)(10, CommandPaletteComponent_Conditional_0_Conditional_10_Template, 2, 3, "p", 9);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(3);
    __textInterpolate(ctx_r1.t()("shell.palette.title"));
    __advance(2);
    __property("placeholder", ctx_r1.t()("shell.palette.placeholder"))("value", ctx_r1.q());
    __attribute("aria-label", ctx_r1.t()("shell.palette.placeholder"));
    __advance(3);
    __conditional(!ctx_r1.q().trim() && ctx_r1.pageItems().length > 0 ? 8 : -1);
    __advance();
    __conditional(ctx_r1.hasAnyResults() ? 9 : ctx_r1.q().trim() ? 10 : -1);
  }
}
var norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
var digits = (s) => s.replace(/\D/g, "");
var CommandPaletteComponent = (_b = class {
  constructor() {
    this.router = inject(Router);
    this.store = inject(StoreService);
    this.destroyRef = inject(DestroyRef);
    this.injector = inject(Injector);
    this.localeService = inject(LocaleService);
    this.qInput = viewChild("qInput", ...[]);
    this.t = this.localeService.t;
    this.maskPhone = maskPhone;
    this.open = signal(false, ...[]);
    this.q = signal("", ...[]);
    this.session = computed(() => this.store.state().session, ...[]);
    this.needle = computed(() => norm(this.q().trim()), ...[]);
    this.byPhone = computed(() => {
      const session = this.session();
      const q = this.q();
      if (!session || !can(session, "producer.edit")) return "";
      const d = digits(q);
      return d.length >= 4 ? d : "";
    }, ...[]);
    this.pageItems = computed(() => {
      const session = this.session();
      const n = this.needle();
      if (!session) return [];
      const match = (s) => !n || norm(s).includes(n);
      const t = this.t();
      return NAV.flatMap((g) => g.items).filter((i) => !i.soon && navAllowed(session, i) && match(t(i.labelKey)));
    }, ...[]);
    this.producerHits = computed(() => {
      const session = this.session();
      const n = this.needle();
      const phoneQ = this.byPhone();
      if (!session || !n) return [];
      const match = (s) => !n || norm(s).includes(n);
      const producers = this.store.state().producers.filter((p) => !p.mergedInto);
      return inScope(producers, session).filter((p) => match(`${p.firstName} ${p.lastName} ${p.code} ${p.village}`) || !!phoneQ && digits(p.phone).includes(phoneQ)).slice(0, 8);
    }, ...[]);
    this.showPhoneHit = computed(() => {
      const phoneQ = this.byPhone();
      return (p) => !!phoneQ && digits(p.phone).includes(phoneQ);
    }, ...[]);
    this.orgHits = computed(() => {
      const session = this.session();
      const n = this.needle();
      if (!session || !n) return [];
      const match = (s) => !n || norm(s).includes(n);
      return inScope(this.store.state().orgs, session).filter((o) => match(`${o.name} ${o.village}`)).slice(0, 6);
    }, ...[]);
    this.hasAnyResults = computed(() => this.pageItems().length > 0 || this.producerHits().length > 0 || this.orgHits().length > 0, ...[]);
    afterNextRender(() => {
      const onKey = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          this.toggle();
        }
      };
      document.addEventListener("keydown", onKey);
      this.destroyRef.onDestroy(() => document.removeEventListener("keydown", onKey));
    });
  }
  /** Ouvre la palette (bouton en-tête). */
  show() {
    this.open.set(true);
    this.focusInputSoon();
  }
  toggle() {
    const next = !this.open();
    this.open.set(next);
    if (next) this.focusInputSoon();
    else this.q.set("");
  }
  onQuery(v) {
    this.q.set(v);
  }
  closeFromBackdrop(e) {
    if (e.target === e.currentTarget) this.close();
  }
  close() {
    this.open.set(false);
    this.q.set("");
  }
  /** Appelé depuis un clic ou un raccourci : hors contexte d'injection, on passe l'injecteur (NG0203). */
  focusInputSoon() {
    afterNextRender(() => {
      var _a2;
      const el = (_a2 = this.qInput()) == null ? void 0 : _a2.nativeElement;
      el == null ? void 0 : el.focus();
      el == null ? void 0 : el.select();
    }, { injector: this.injector });
  }
  onEscape() {
    if (this.open()) this.close();
  }
  goPage(i) {
    this.close();
    this.router.navigateByUrl(i.to);
  }
  goProducer(id) {
    this.close();
    this.router.navigate(["/dashboard/producteurs", id]);
  }
  goOrg(id) {
    this.close();
    this.router.navigate(["/dashboard/organisations", id]);
  }
}, _b.\u0275fac = function CommandPaletteComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _b)();
}, _b.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _b,
  selectors: [["app-command-palette"]],
  viewQuery: function CommandPaletteComponent_Query(rf, ctx) {
    if (rf & 1) __viewQuerySignal(ctx.qInput, _c0$1, 5);
    if (rf & 2) __queryAdvance();
  },
  hostBindings: function CommandPaletteComponent_HostBindings(rf, ctx) {
    if (rf & 1) __listener("keydown.escape", function CommandPaletteComponent_keydown_escape_HostBindingHandler() {
      return ctx.onEscape();
    }, __resolveDocument);
  },
  decls: 1,
  vars: 1,
  consts: [
    ["qInput", ""],
    [
      "role",
      "presentation",
      1,
      "fixed",
      "inset-0",
      "z-[100]",
      "flex",
      "items-start",
      "justify-center",
      "bg-black/40",
      "p-3",
      "pt-6",
      "sm:items-center",
      "sm:pt-0"
    ],
    [
      "role",
      "presentation",
      1,
      "fixed",
      "inset-0",
      "z-[100]",
      "flex",
      "items-start",
      "justify-center",
      "bg-black/40",
      "p-3",
      "pt-6",
      "sm:items-center",
      "sm:pt-0",
      3,
      "click"
    ],
    [
      "role",
      "dialog",
      "aria-modal",
      "true",
      "aria-labelledby",
      "cmd-palette-title",
      1,
      "flex",
      "max-h-[min(70vh,32rem)]",
      "w-full",
      "max-w-lg",
      "flex-col",
      "overflow-hidden",
      "rounded-lg",
      "border",
      "bg-popover",
      "text-popover-foreground",
      "shadow-lg",
      3,
      "click"
    ],
    [
      "id",
      "cmd-palette-title",
      1,
      "sr-only"
    ],
    [
      1,
      "border-b",
      "px-3",
      "py-2"
    ],
    [
      "type",
      "search",
      1,
      "w-full",
      "rounded-md",
      "border-0",
      "bg-transparent",
      "px-2",
      "py-2",
      "text-sm",
      "outline-none",
      "ring-0",
      "placeholder:text-muted-foreground",
      "focus:ring-0",
      3,
      "input",
      "placeholder",
      "value"
    ],
    [
      1,
      "flex-1",
      "overflow-y-auto",
      "p-2",
      "text-sm"
    ],
    [
      1,
      "px-2",
      "py-2",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "px-2",
      "py-6",
      "text-center",
      "text-muted-foreground"
    ],
    [
      1,
      "px-2",
      "py-1.5",
      "text-[11px]",
      "font-semibold",
      "uppercase",
      "tracking-wide",
      "text-muted-foreground"
    ],
    [
      "type",
      "button",
      1,
      "flex",
      "w-full",
      "items-center",
      "gap-2",
      "rounded-sm",
      "px-2",
      "py-2",
      "text-left",
      "hover:bg-muted"
    ],
    [
      "type",
      "button",
      1,
      "flex",
      "w-full",
      "items-center",
      "gap-2",
      "rounded-sm",
      "px-2",
      "py-2",
      "text-left",
      "hover:bg-muted",
      3,
      "click"
    ],
    [
      1,
      "size-4",
      "shrink-0",
      "text-muted-foreground",
      3,
      "img"
    ],
    [
      1,
      "mt-2",
      "px-2",
      "py-1.5",
      "text-[11px]",
      "font-semibold",
      "uppercase",
      "tracking-wide",
      "text-muted-foreground"
    ],
    [
      "type",
      "button",
      1,
      "flex",
      "w-full",
      "flex-col",
      "gap-0.5",
      "rounded-sm",
      "px-2",
      "py-2",
      "text-left",
      "hover:bg-muted",
      "sm:flex-row",
      "sm:items-center"
    ],
    [
      "type",
      "button",
      1,
      "flex",
      "w-full",
      "flex-col",
      "gap-0.5",
      "rounded-sm",
      "px-2",
      "py-2",
      "text-left",
      "hover:bg-muted",
      "sm:flex-row",
      "sm:items-center",
      3,
      "click"
    ],
    [1, "font-medium"],
    [
      1,
      "text-xs",
      "text-muted-foreground",
      "sm:ml-auto"
    ],
    [1, "flex-1"],
    [
      1,
      "text-xs",
      "text-muted-foreground"
    ]
  ],
  template: function CommandPaletteComponent_Template(rf, ctx) {
    if (rf & 1) __conditionalCreate(0, CommandPaletteComponent_Conditional_0_Template, 11, 6, "div", 1);
    if (rf & 2) __conditional(ctx.open() ? 0 : -1);
  },
  dependencies: [
    CommonModule,
    LucideAngularModule,
    LucideAngularComponent
  ],
  encapsulation: 2
}), _b);
var ToastService = (_c = class {
  constructor() {
    this._items = signal([], ...[]);
    this.items = this._items.asReadonly();
    this.count = computed(() => this._items().length, ...[]);
    this.dismissTimers = /* @__PURE__ */ new Map();
    this.defaultDuration = 4500;
  }
  show(opts) {
    const { durationMs = this.defaultDuration, ...rest } = opts;
    const id = _c.nextId++;
    this._items.update((list) => [...list, {
      ...rest,
      id
    }]);
    if (durationMs > 0 && typeof document !== "undefined") {
      const handle = setTimeout(() => this.dismiss(id), durationMs);
      this.dismissTimers.set(id, handle);
    }
  }
  success(titleKey, desc, titleParams) {
    this.show({
      tone: "success",
      titleKey,
      titleParams,
      descriptionKey: desc == null ? void 0 : desc.key,
      descriptionParams: desc == null ? void 0 : desc.params
    });
  }
  error(titleKey, desc, titleParams) {
    this.show({
      tone: "error",
      titleKey,
      titleParams,
      descriptionKey: desc == null ? void 0 : desc.key,
      descriptionParams: desc == null ? void 0 : desc.params
    });
  }
  dismiss(id) {
    const t = this.dismissTimers.get(id);
    if (t !== void 0) {
      clearTimeout(t);
      this.dismissTimers.delete(id);
    }
    this._items.update((list) => list.filter((x) => x.id !== id));
  }
}, _c.nextId = 1, _c.\u0275fac = function ToastService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _c)();
}, _c.\u0275prov = /* @__PURE__ */ __defineInjectable({
  token: _c,
  factory: _c.\u0275fac,
  providedIn: "root"
}), _c);
var _forTrack0$1 = ($index, $item) => $item.id;
function ToastHostComponent_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 6);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r2 = __nextContext().$implicit;
    const ctx_r2 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r2.t()(item_r2.descriptionKey, item_r2.descriptionParams), " ");
  }
}
function ToastHostComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "p", 5);
    __text(4);
    __elementEnd();
    __conditionalCreate(5, ToastHostComponent_For_2_Conditional_5_Template, 2, 1, "p", 6);
    __elementEnd();
    __elementStart(6, "button", 7);
    __listener("click", function ToastHostComponent_For_2_Template_button_click_6_listener() {
      const item_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.toast.dismiss(item_r2.id));
    });
    __element(7, "lucide-angular", 8);
    __elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __classMap(ctx_r2.panelClass(item_r2));
    __advance(4);
    __textInterpolate1(" ", ctx_r2.t()(item_r2.titleKey, item_r2.titleParams), " ");
    __advance();
    __conditional(item_r2.descriptionKey ? 5 : -1);
    __advance();
    __attribute("aria-label", ctx_r2.t()("common.close"));
    __advance();
    __property("img", ctx_r2.iconClose);
  }
}
var ToastHostComponent = (_d = class {
  constructor() {
    this.toast = inject(ToastService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.iconClose = X;
  }
  panelClass(item) {
    const base = "rounded-lg border p-3 shadow-lg backdrop-blur-sm transition-[transform,opacity]";
    if (item.tone === "success") return `${base} border-success/30 bg-success-bg text-success-fg`;
    return `${base} border-danger/30 bg-danger-bg text-danger-fg`;
  }
}, _d.\u0275fac = function ToastHostComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _d)();
}, _d.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _d,
  selectors: [["app-toast-host"]],
  decls: 3,
  vars: 0,
  consts: [
    [
      "aria-live",
      "polite",
      "aria-relevant",
      "additions",
      1,
      "pointer-events-none",
      "fixed",
      "bottom-0",
      "right-0",
      "z-[100]",
      "flex",
      "max-w-[100vw]",
      "flex-col",
      "gap-2",
      "p-4",
      "sm:max-w-sm",
      "sm:p-6"
    ],
    [
      "role",
      "status",
      1,
      "pointer-events-auto",
      "mbay-animate-toast-in",
      3,
      "class"
    ],
    [
      "role",
      "status",
      1,
      "pointer-events-auto",
      "mbay-animate-toast-in"
    ],
    [
      1,
      "flex",
      "gap-3"
    ],
    [
      1,
      "min-w-0",
      "flex-1"
    ],
    [
      1,
      "text-sm",
      "font-semibold",
      "leading-snug"
    ],
    [
      1,
      "mt-1",
      "text-xs",
      "leading-relaxed",
      "opacity-90"
    ],
    [
      "type",
      "button",
      1,
      "grid",
      "size-8",
      "shrink-0",
      "place-items-center",
      "rounded-md",
      "text-muted-foreground",
      "hover:bg-background/80",
      "hover:text-foreground",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      3,
      "click"
    ],
    [
      1,
      "size-4",
      3,
      "img"
    ]
  ],
  template: function ToastHostComponent_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "div", 0);
      __repeaterCreate(1, ToastHostComponent_For_2_Template, 8, 6, "div", 1, _forTrack0$1);
      __elementEnd();
    }
    if (rf & 2) {
      __advance();
      __repeater(ctx.toast.items());
    }
  },
  dependencies: [LucideAngularModule, LucideAngularComponent],
  encapsulation: 2
}), _d);
var _c0 = (a0) => ({ rail: a0 });
var _c1 = () => ({ rail: false });
var _c2 = (a0) => ["/dashboard", a0];
var _forTrack0 = ($index, $item) => $item.id;
function AppLayoutComponent_Conditional_0_For_6_Template(rf, ctx) {
  if (rf & 1) __element(0, "div", 7);
}
function AppLayoutComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 1)(1, "div", 3);
    __element(2, "div", 4)(3, "div", 5);
    __elementStart(4, "div", 6);
    __repeaterCreate(5, AppLayoutComponent_Conditional_0_For_6_Template, 1, 0, "div", 7, __repeaterTrackByIndex);
    __elementEnd();
    __elementStart(7, "p", 8);
    __element(8, "lucide-angular", 9);
    __text(9);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __attribute("aria-label", ctx_r0.t()("shell.logout.loading"));
    __advance(5);
    __repeater(ctx_r0.skeletonCards);
    __advance(3);
    __property("img", ctx_r0.icons.loader)("size", 16);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("shell.logout.loading"), " ");
  }
}
function AppLayoutComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 2);
    __element(1, "lucide-angular", 9);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __property("img", ctx_r0.icons.loader)("size", 16);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("shell.loading"), " ");
  }
}
function AppLayoutComponent_Conditional_2_Template(rf, ctx) {
}
function AppLayoutComponent_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "div", 13)(1, "div", 48);
    __listener("click", function AppLayoutComponent_Conditional_3_Conditional_3_Template_div_click_1_listener() {
      __restoreView(_r3);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.mobileOpen.set(false));
    });
    __elementEnd();
    __elementStart(2, "div", 49);
    __listener("dismiss", function AppLayoutComponent_Conditional_3_Conditional_3_Template_div_dismiss_2_listener() {
      __restoreView(_r3);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.mobileOpen.set(false));
    });
    __elementContainer(3, 12);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    const sidebarContent_r4 = __reference(5);
    __advance(2);
    __attribute("aria-label", ctx_r0.t()("shell.openMenu"));
    __advance();
    __property("ngTemplateOutlet", sidebarContent_r4)("ngTemplateOutletContext", __pureFunction0(3, _c1));
  }
}
function AppLayoutComponent_Conditional_3_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 31);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r0.unreadCount());
  }
}
function AppLayoutComponent_Conditional_3_Conditional_29_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "button", 54);
    __listener("click", function AppLayoutComponent_Conditional_3_Conditional_29_Conditional_4_Template_button_click_0_listener() {
      __restoreView(_r5);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.markAllRead());
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r0.t()("shell.notif.markAll"));
  }
}
function AppLayoutComponent_Conditional_3_Conditional_29_For_7_Conditional_9_Template(rf, ctx) {
  if (rf & 1) __element(0, "span", 60);
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __attribute("aria-label", ctx_r0.t()("shell.notif.unread"));
  }
}
function AppLayoutComponent_Conditional_3_Conditional_29_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "li")(1, "a", 55);
    __listener("click", function AppLayoutComponent_Conditional_3_Conditional_29_For_7_Template_a_click_1_listener() {
      __restoreView(_r6);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.topMenu.set(null));
    });
    __elementStart(2, "span", 56);
    __element(3, "ui-icon", 57);
    __elementEnd();
    __elementStart(4, "span", 19)(5, "span", 58);
    __text(6);
    __elementEnd();
    __elementStart(7, "span", 59);
    __text(8);
    __elementEnd()();
    __conditionalCreate(9, AppLayoutComponent_Conditional_3_Conditional_29_For_7_Conditional_9_Template, 1, 1, "span", 60);
    __elementEnd()();
  }
  if (rf & 2) {
    const notification_r7 = ctx.$implicit;
    const ctx_r0 = __nextContext(3);
    __advance();
    __property("routerLink", notification_r7.to);
    __advance();
    __styleProp("background", notification_r7.bg)("color", notification_r7.fg);
    __advance();
    __property("name", notification_r7.icon)("size", 20);
    __advance(3);
    __textInterpolate(notification_r7.title);
    __advance(2);
    __textInterpolate(notification_r7.body);
    __advance();
    __conditional(!ctx_r0.isRead(notification_r7.id) ? 9 : -1);
  }
}
function AppLayoutComponent_Conditional_3_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 35)(1, "div", 50)(2, "p", 51);
    __text(3);
    __elementEnd();
    __conditionalCreate(4, AppLayoutComponent_Conditional_3_Conditional_29_Conditional_4_Template, 2, 1, "button", 52);
    __elementEnd();
    __elementStart(5, "ul", 53);
    __repeaterCreate(6, AppLayoutComponent_Conditional_3_Conditional_29_For_7_Template, 10, 10, "li", null, _forTrack0);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __attribute("aria-label", ctx_r0.t()("shell.notif.title"));
    __advance(3);
    __textInterpolate(ctx_r0.t()("shell.notif.title"));
    __advance();
    __conditional(ctx_r0.unreadCount() > 0 ? 4 : -1);
    __advance(2);
    __repeater(ctx_r0.notifications());
  }
}
function AppLayoutComponent_Conditional_3_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = __getCurrentView();
    __elementStart(0, "div", 36)(1, "div", 61)(2, "p", 51);
    __text(3);
    __elementEnd();
    __elementStart(4, "p", 62);
    __text(5);
    __elementEnd()();
    __elementStart(6, "button", 63);
    __listener("click", function AppLayoutComponent_Conditional_3_Conditional_30_Template_button_click_6_listener() {
      __restoreView(_r8);
      const ctx_r0 = __nextContext(2);
      ctx_r0.topMenu.set(null);
      return __resetView(ctx_r0.openPalette());
    });
    __element(7, "ui-icon", 64);
    __elementStart(8, "span", 65);
    __text(9);
    __elementEnd();
    __elementStart(10, "kbd", 66);
    __text(11);
    __elementEnd()();
    __elementStart(12, "div", 67);
    __element(13, "ui-icon", 68);
    __elementStart(14, "span", 65);
    __text(15);
    __elementEnd();
    __elementStart(16, "span", 69);
    __text(17);
    __elementEnd()();
    __elementStart(18, "div", 67);
    __element(19, "ui-icon", 70);
    __elementStart(20, "span", 65);
    __text(21);
    __elementEnd();
    __elementStart(22, "span", 69);
    __text(23);
    __elementEnd()();
    __elementStart(24, "div", 71)(25, "p", 72);
    __element(26, "ui-icon", 73);
    __text(27);
    __elementEnd();
    __elementStart(28, "a", 74);
    __element(29, "ui-icon", 75);
    __text(30);
    __elementEnd();
    __elementStart(31, "a", 76);
    __element(32, "ui-icon", 77);
    __text(33);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __attribute("aria-label", ctx_r0.t()("shell.help.title"));
    __advance(3);
    __textInterpolate(ctx_r0.t()("shell.help.title"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("shell.help.intro"));
    __advance(2);
    __property("size", 20);
    __advance(2);
    __textInterpolate(ctx_r0.t()("shell.help.search"));
    __advance(2);
    __textInterpolate1("", ctx_r0.modKey(), " K");
    __advance(2);
    __property("size", 20);
    __advance(2);
    __textInterpolate(ctx_r0.t()("shell.help.guide"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("modules.state.soon"));
    __advance(2);
    __property("size", 20);
    __advance(2);
    __textInterpolate(ctx_r0.t()("shell.help.faq"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("modules.state.soon"));
    __advance(3);
    __property("size", 20);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("shell.help.contact"), " ");
    __advance();
    __property("href", "mailto:" + ctx_r0.cradesc.email, __sanitizeUrl);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate1(" ", ctx_r0.cradesc.email, " ");
    __advance();
    __property("href", "tel:" + ctx_r0.cradesc.phoneHref, __sanitizeUrl);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate1(" ", ctx_r0.cradesc.phone, " ");
  }
}
function AppLayoutComponent_Conditional_3_Conditional_31_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "button", 86);
    __listener("click", function AppLayoutComponent_Conditional_3_Conditional_31_For_9_Template_button_click_0_listener() {
      const localeOption_r11 = __restoreView(_r10).$implicit;
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.localeService.setLocale(localeOption_r11));
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const localeOption_r11 = ctx.$implicit;
    const ctx_r0 = __nextContext(3);
    __classProp("on", ctx_r0.localeService.locale() === localeOption_r11);
    __attribute("aria-checked", ctx_r0.localeService.locale() === localeOption_r11);
    __advance();
    __textInterpolate1(" ", localeOption_r11.toUpperCase(), " ");
  }
}
function AppLayoutComponent_Conditional_3_Conditional_31_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "a", 87);
    __listener("click", function AppLayoutComponent_Conditional_3_Conditional_31_Conditional_14_Template_a_click_0_listener() {
      __restoreView(_r12);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.topMenu.set(null));
    });
    __element(1, "ui-icon", 88);
    __elementStart(2, "span", 65);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __property("size", 20);
    __advance(2);
    __textInterpolate(ctx_r0.t()("nav.item.utilisateurs"));
  }
}
function AppLayoutComponent_Conditional_3_Conditional_31_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "a", 89);
    __listener("click", function AppLayoutComponent_Conditional_3_Conditional_31_Conditional_15_Template_a_click_0_listener() {
      __restoreView(_r13);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.topMenu.set(null));
    });
    __element(1, "ui-icon", 90);
    __elementStart(2, "span", 65);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __property("size", 20);
    __advance(2);
    __textInterpolate(ctx_r0.t()("nav.item.referentiels"));
  }
}
function AppLayoutComponent_Conditional_3_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = __getCurrentView();
    __elementStart(0, "div", 37)(1, "p", 78);
    __text(2);
    __elementEnd();
    __elementStart(3, "div", 79);
    __element(4, "ui-icon", 80);
    __elementStart(5, "span", 65);
    __text(6);
    __elementEnd();
    __elementStart(7, "span", 81);
    __repeaterCreate(8, AppLayoutComponent_Conditional_3_Conditional_31_For_9_Template, 2, 4, "button", 82, __repeaterTrackByIdentity);
    __elementEnd()();
    __elementStart(10, "button", 83);
    __listener("click", function AppLayoutComponent_Conditional_3_Conditional_31_Template_button_click_10_listener() {
      __restoreView(_r9);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.toggleCollapsed());
    });
    __element(11, "ui-icon", 57);
    __elementStart(12, "span", 65);
    __text(13);
    __elementEnd()();
    __conditionalCreate(14, AppLayoutComponent_Conditional_3_Conditional_31_Conditional_14_Template, 4, 2, "a", 84);
    __conditionalCreate(15, AppLayoutComponent_Conditional_3_Conditional_31_Conditional_15_Template, 4, 2, "a", 85);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __attribute("aria-label", ctx_r0.t()("shell.settings.title"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("shell.settings.title"));
    __advance(2);
    __property("size", 20);
    __advance(2);
    __textInterpolate(ctx_r0.t()("shell.settings.language"));
    __advance();
    __attribute("aria-label", ctx_r0.t()("shell.settings.language"));
    __advance();
    __repeater(ctx_r0.locales);
    __advance(3);
    __property("name", ctx_r0.collapsed() ? "left_panel_open" : "left_panel_close")("size", 20);
    __advance(2);
    __textInterpolate(ctx_r0.collapsed() ? ctx_r0.t()("shell.sidebar.expand") : ctx_r0.t()("shell.sidebar.collapse"));
    __advance();
    __conditional(ctx_r0.canSee("user.manage") ? 14 : -1);
    __advance();
    __conditional(ctx_r0.canSee("config.manage") ? 15 : -1);
  }
}
function AppLayoutComponent_Conditional_3_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = __getCurrentView();
    __elementStart(0, "div", 45)(1, "div", 91)(2, "span", 92);
    __text(3);
    __elementEnd();
    __elementStart(4, "div", 93)(5, "div", 94);
    __text(6);
    __elementEnd();
    __elementStart(7, "div", 95);
    __text(8);
    __elementEnd()()();
    __element(9, "div", 96);
    __elementStart(10, "button", 97);
    __listener("click", function AppLayoutComponent_Conditional_3_Conditional_42_Template_button_click_10_listener() {
      __restoreView(_r14);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.logout());
    });
    __element(11, "lucide-angular", 18);
    __text(12);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance(3);
    __textInterpolate(ctx_r0.initials());
    __advance(3);
    __textInterpolate(ctx_r0.session().name);
    __advance(2);
    __textInterpolate2(" ", ctx_r0.store.roleLabel(ctx_r0.session().role), " \xB7 ", ctx_r0.scopeLabel(), " ");
    __advance(3);
    __property("img", ctx_r0.icons.logOut)("size", 18);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("shell.logout"), " ");
  }
}
function AppLayoutComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = __getCurrentView();
    __elementStart(0, "div", 10)(1, "aside", 11);
    __elementContainer(2, 12);
    __elementEnd();
    __conditionalCreate(3, AppLayoutComponent_Conditional_3_Conditional_3_Template, 4, 4, "div", 13);
    __elementStart(4, "div", 14)(5, "header", 15)(6, "div", 16)(7, "button", 17);
    __listener("click", function AppLayoutComponent_Conditional_3_Template_button_click_7_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.mobileOpen.set(true));
    });
    __element(8, "lucide-angular", 18);
    __elementEnd();
    __elementStart(9, "div", 19)(10, "span", 20);
    __element(11, "lucide-angular", 21);
    __elementStart(12, "span", 22);
    __text(13);
    __elementEnd()()();
    __elementStart(14, "div", 23)(15, "button", 24);
    __listener("click", function AppLayoutComponent_Conditional_3_Template_button_click_15_listener() {
      __restoreView(_r2);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.openPalette());
    });
    __element(16, "lucide-angular", 25);
    __elementStart(17, "span", 26);
    __text(18);
    __elementEnd();
    __elementStart(19, "kbd", 27);
    __text(20);
    __elementEnd()();
    __elementStart(21, "div", 28)(22, "button", 29);
    __listener("click", function AppLayoutComponent_Conditional_3_Template_button_click_22_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.toggleTop("notif", $event));
    });
    __element(23, "ui-icon", 30);
    __conditionalCreate(24, AppLayoutComponent_Conditional_3_Conditional_24_Template, 2, 1, "span", 31);
    __elementEnd();
    __elementStart(25, "button", 32);
    __listener("click", function AppLayoutComponent_Conditional_3_Template_button_click_25_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.toggleTop("help", $event));
    });
    __element(26, "ui-icon", 33);
    __elementEnd();
    __elementStart(27, "button", 32);
    __listener("click", function AppLayoutComponent_Conditional_3_Template_button_click_27_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.toggleTop("settings", $event));
    });
    __element(28, "ui-icon", 34);
    __elementEnd();
    __conditionalCreate(29, AppLayoutComponent_Conditional_3_Conditional_29_Template, 8, 3, "div", 35);
    __conditionalCreate(30, AppLayoutComponent_Conditional_3_Conditional_30_Template, 34, 20, "div", 36);
    __conditionalCreate(31, AppLayoutComponent_Conditional_3_Conditional_31_Template, 16, 10, "div", 37);
    __elementEnd();
    __elementStart(32, "div", 38)(33, "button", 39);
    __listener("click", function AppLayoutComponent_Conditional_3_Template_button_click_33_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.toggleAccountMenu($event));
    });
    __elementStart(34, "span", 40);
    __text(35);
    __elementEnd();
    __elementStart(36, "span", 41)(37, "span", 42);
    __text(38);
    __elementEnd();
    __elementStart(39, "span", 43);
    __text(40);
    __elementEnd()();
    __element(41, "lucide-angular", 44);
    __elementEnd();
    __conditionalCreate(42, AppLayoutComponent_Conditional_3_Conditional_42_Template, 13, 7, "div", 45);
    __elementEnd()()()();
    __elementStart(43, "main", 46);
    __element(44, "router-outlet");
    __elementEnd()()();
    __element(45, "app-command-palette")(46, "app-toast-host")(47, "ui-snackbar", 47);
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    const sidebarContent_r4 = __reference(5);
    __advance();
    __styleProp("width", ctx_r0.collapsed() ? 84 : 272, "px");
    __advance();
    __property("ngTemplateOutlet", sidebarContent_r4)("ngTemplateOutletContext", __pureFunction1(43, _c0, ctx_r0.collapsed()));
    __advance();
    __conditional(ctx_r0.mobileOpen() ? 3 : -1);
    __advance(4);
    __attribute("aria-label", ctx_r0.t()("shell.openMenu"));
    __advance();
    __property("img", ctx_r0.icons.menu)("size", 22);
    __advance(3);
    __property("img", ctx_r0.icons.scope)("size", 14);
    __advance(2);
    __textInterpolate(ctx_r0.scopeLabel());
    __advance(2);
    __attribute("aria-label", ctx_r0.t()("shell.searchAria"));
    __advance();
    __property("img", ctx_r0.icons.search)("size", 18);
    __advance(2);
    __textInterpolate(ctx_r0.t()("shell.searchAria"));
    __advance(2);
    __textInterpolate1("", ctx_r0.modKey(), " K");
    __advance(2);
    __classProp("on", ctx_r0.topMenu() === "notif");
    __attribute("aria-label", ctx_r0.t()("shell.notif.title"))("aria-expanded", ctx_r0.topMenu() === "notif");
    __advance();
    __property("size", 22);
    __advance();
    __conditional(ctx_r0.unreadCount() > 0 ? 24 : -1);
    __advance();
    __classProp("on", ctx_r0.topMenu() === "help");
    __attribute("aria-label", ctx_r0.t()("shell.help.title"))("aria-expanded", ctx_r0.topMenu() === "help");
    __advance();
    __property("size", 22);
    __advance();
    __classProp("on", ctx_r0.topMenu() === "settings");
    __attribute("aria-label", ctx_r0.t()("shell.settings.title"))("aria-expanded", ctx_r0.topMenu() === "settings");
    __advance();
    __property("size", 22);
    __advance();
    __conditional(ctx_r0.topMenu() === "notif" ? 29 : -1);
    __advance();
    __conditional(ctx_r0.topMenu() === "help" ? 30 : -1);
    __advance();
    __conditional(ctx_r0.topMenu() === "settings" ? 31 : -1);
    __advance(2);
    __attribute("aria-label", ctx_r0.t()("shell.accountAria"))("aria-expanded", ctx_r0.accountMenuOpen());
    __advance(2);
    __textInterpolate1(" ", ctx_r0.initials(), " ");
    __advance(3);
    __textInterpolate(ctx_r0.session().name);
    __advance(2);
    __textInterpolate(ctx_r0.store.roleLabel(ctx_r0.session().role));
    __advance();
    __property("img", ctx_r0.icons.chevronDown)("size", 16);
    __advance();
    __conditional(ctx_r0.accountMenuOpen() ? 42 : -1);
  }
}
function AppLayoutComponent_ng_template_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) __element(0, "app-sidebar-nav", 103);
  if (rf & 2) {
    const rail_r16 = __nextContext().rail;
    const ctx_r0 = __nextContext();
    __property("session", ctx)("path", ctx_r0.path())("badge", ctx_r0.badgeFn)("collapsed", rail_r16);
  }
}
function AppLayoutComponent_ng_template_4_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 107)(1, "span", 108);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 109);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 110);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance(2);
    __textInterpolate(ctx_r0.t()("auth.cradesc.carriedBy"));
    __advance(2);
    __textInterpolate(ctx_r0.cradesc.acronym);
    __advance(2);
    __textInterpolate(ctx_r0.cradesc.urlLabel);
  }
}
function AppLayoutComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = __getCurrentView();
    __elementStart(0, "nav", 98)(1, "div", 99)(2, "a", 100);
    __element(3, "ui-brand-logo", 101);
    __elementEnd();
    __elementStart(4, "button", 102);
    __listener("click", function AppLayoutComponent_ng_template_4_Template_button_click_4_listener() {
      __restoreView(_r15);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.toggleCollapsed());
    });
    __element(5, "ui-icon", 57);
    __elementEnd()();
    __conditionalCreate(6, AppLayoutComponent_ng_template_4_Conditional_6_Template, 1, 4, "app-sidebar-nav", 103);
    __elementStart(7, "div", 104)(8, "a", 105);
    __element(9, "img", 106);
    __conditionalCreate(10, AppLayoutComponent_ng_template_4_Conditional_10_Template, 7, 3, "span", 107);
    __elementEnd()()();
  }
  if (rf & 2) {
    let tmp_17_0;
    const rail_r16 = ctx.rail;
    const ctx_r0 = __nextContext();
    __advance();
    __classProp("justify-between", !rail_r16)("flex-col", rail_r16)("gap-3", rail_r16)("px-5", !rail_r16)("px-2", rail_r16);
    __advance();
    __property("routerLink", __pureFunction1(27, _c2, ctx_r0.session().role));
    __attribute("aria-label", ctx_r0.brand.name);
    __advance();
    __property("size", rail_r16 ? 34 : 40)("wordmark", !rail_r16);
    __advance();
    __attribute("aria-label", rail_r16 ? ctx_r0.t()("shell.sidebar.expand") : ctx_r0.t()("shell.sidebar.collapse"))("title", rail_r16 ? ctx_r0.t()("shell.sidebar.expand") : ctx_r0.t()("shell.sidebar.collapse"))("aria-expanded", !rail_r16);
    __advance();
    __property("name", rail_r16 ? "left_panel_open" : "left_panel_close")("size", 22);
    __advance();
    __conditional((tmp_17_0 = ctx_r0.session()) ? 6 : -1, tmp_17_0);
    __advance(2);
    __classProp("justify-center", rail_r16);
    __property("href", ctx_r0.cradesc.url, __sanitizeUrl);
    __attribute("aria-label", ctx_r0.t()("auth.cradesc.visit"))("title", rail_r16 ? ctx_r0.cradesc.acronym : null);
    __advance();
    __property("src", ctx_r0.cradesc.emblem);
    __advance();
    __conditional(!rail_r16 ? 10 : -1);
  }
}
var SIDEBAR_KEY = "mbd.sidebar.collapsed";
var sessionHydration = null;
function ensureSessionHydrated() {
  if (!sessionHydration) sessionHydration = hydrateSessionFromApi().then(() => void 0);
  return sessionHydration;
}
var AppLayoutComponent = (_e = class {
  isRead(id) {
    return this.readIds().has(id);
  }
  markAllRead() {
    this.readIds.set(new Set(this.notifications().map((n) => n.id)));
  }
  canSee(permission) {
    return can(this.session(), permission);
  }
  toggleTop(menu, event) {
    event.stopPropagation();
    this.accountMenuOpen.set(false);
    this.topMenu.update((current) => current === menu ? null : menu);
  }
  constructor() {
    this.palette = viewChild(CommandPaletteComponent, ...[]);
    this.store = inject(StoreService);
    this.localeService = inject(LocaleService);
    this.router = inject(Router);
    this.destroyRef = inject(DestroyRef);
    this.t = this.localeService.t;
    this.brand = BRAND;
    this.cradesc = CRADESC;
    this.skeletonCards = [
      0,
      1,
      2,
      3,
      4,
      5
    ];
    this.icons = {
      menu: Menu,
      search: Search,
      chevronDown: ChevronDown,
      logOut: LogOut,
      loader: LoaderCircle,
      scope: MapPinned
    };
    this.ready = signal(false, ...[]);
    this.loggingOut = signal(false, ...[]);
    this.session = computed(() => this.store.state().session, ...[]);
    this.path = toSignal(this.router.events.pipe(filter((e) => e instanceof NavigationEnd), map((e) => e.urlAfterRedirects)), { initialValue: this.router.url });
    this.modKey = signal("Ctrl", ...[]);
    this.mobileOpen = signal(false, ...[]);
    this.collapsed = signal(false, ...[]);
    this.accountMenuOpen = signal(false, ...[]);
    this.topMenu = signal(null, ...[]);
    this.locales = ["fr", "wo"];
    this.readIds = signal(/* @__PURE__ */ new Set(), ...[]);
    this.notifications = computed(() => {
      const s = this.store.state();
      const session = s.session;
      if (!session) return [];
      const t = this.t();
      const list = [];
      if (can(session, "dossier.review") || can(session, "dossier.create")) {
        const pending = scopedDossiers(s.dossiers, session).filter((d) => d.status === "soumis" || d.status === "en examen").sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
        if (pending.length) {
          const days = Math.max(0, Math.floor((Date.now() - new Date(pending[0].updatedAt).getTime()) / 864e5));
          list.push({
            id: `dossiers-${pending.length}`,
            icon: "folder_shared",
            bg: "var(--v2-info-bg)",
            fg: "var(--v2-info-fg)",
            title: t("shell.notif.dossiers", { count: pending.length }),
            body: t("shell.notif.dossiersBody", { days }),
            to: "/dashboard/dossiers"
          });
        }
      }
      if (can(session, "alert.manage") || can(session, "quality.review")) {
        const open = s.alerts.filter((a) => a.status === "ouvert");
        if (open.length) {
          const critical = open.filter((a) => a.severity === "\xE9lev\xE9e").length;
          list.push({
            id: `alertes-${open.length}`,
            icon: "warning",
            bg: critical ? "var(--v2-erreur-bg)" : "var(--v2-attente-bg)",
            fg: critical ? "var(--v2-erreur-fg)" : "var(--v2-attente-fg)",
            title: t("shell.notif.alerts", { count: this.localeService.formatNumber(open.length) }),
            body: t("shell.notif.alertsBody", { critical }),
            to: "/dashboard/qualite/alertes"
          });
        }
      }
      if (can(session, "meeting.read")) {
        const now = (/* @__PURE__ */ new Date()).toISOString();
        const next = s.meetings.filter((m) => m.status === "planifi\xE9e" && m.date >= now).sort((a, b) => a.date.localeCompare(b.date))[0];
        if (next) list.push({
          id: `reunion-${next.id}`,
          icon: "event_upcoming",
          bg: "var(--v2-sauge)",
          fg: "var(--v2-foret)",
          title: t("shell.notif.meeting", { title: next.title }),
          body: t("shell.notif.meetingBody", {
            date: fmtDateTime(next.date),
            place: next.place
          }),
          to: `/dashboard/reunions/${next.id}`
        });
      }
      if (can(session, "data.backup")) list.push({
        id: "sauvegarde-nuit",
        icon: "task_alt",
        bg: "var(--v2-succes-bg)",
        fg: "var(--v2-succes-fg)",
        title: t("shell.notif.backup"),
        body: t("shell.notif.backupBody"),
        to: "/dashboard/donnees"
      });
      return list;
    }, ...[]);
    this.unreadCount = computed(() => this.notifications().filter((n) => !this.readIds().has(n.id)).length, ...[]);
    this.scopeLabel = computed(() => {
      const session = this.session();
      if (!session) return "";
      if (session.scope.kind === "consolid\xE9") return this.t()("shell.scope.consolidated");
      return scoopNamesOf(session, this.store.state().scoops);
    }, ...[]);
    this.initials = computed(() => {
      const session = this.session();
      if (!session) return "";
      return session.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
    }, ...[]);
    this.badgeFn = (to) => {
      const session = this.session();
      if (!session) return 0;
      if (to !== "/dashboard/qualite") return 0;
      const q = qualityCounts(this.store.state());
      return (can(session, "quality.review") ? q.doublons : 0) + (can(session, "alert.manage") ? q.alertes : 0) + (can(session, "correction.manage") ? q.corrections : 0);
    };
    afterNextRender(() => {
      if (typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent)) this.modKey.set("\u2318");
      try {
        this.collapsed.set(window.localStorage.getItem(SIDEBAR_KEY) === "1");
      } catch {
      }
      ensureSessionHydrated().finally(() => this.ready.set(true));
      const onDocClick = (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (!target.closest("[data-account-menu]")) this.accountMenuOpen.set(false);
        if (!target.closest("[data-top-menu]")) this.topMenu.set(null);
      };
      document.addEventListener("click", onDocClick);
      this.destroyRef.onDestroy(() => document.removeEventListener("click", onDocClick));
    });
    effect(() => {
      if (this.ready() && !this.session()) this.router.navigateByUrl("/login");
    });
    effect(() => {
      this.path();
      this.mobileOpen.set(false);
      this.accountMenuOpen.set(false);
      this.topMenu.set(null);
    });
    const interval = setInterval(() => {
      const session = this.session();
      if (session && Date.now() > session.expiresAt) this.logout();
    }, 15e3);
    this.destroyRef.onDestroy(() => clearInterval(interval));
  }
  toggleCollapsed() {
    const next = !this.collapsed();
    this.collapsed.set(next);
    try {
      window.localStorage.setItem(SIDEBAR_KEY, next ? "1" : "0");
    } catch {
    }
  }
  toggleAccountMenu(event) {
    event.stopPropagation();
    this.topMenu.set(null);
    this.accountMenuOpen.update((open) => !open);
  }
  logout() {
    if (this.loggingOut()) return;
    this.accountMenuOpen.set(false);
    this.loggingOut.set(true);
    window.setTimeout(() => {
      logoutAuthSideEffects();
      this.store.actions.logout();
      this.router.navigateByUrl("/login").finally(() => this.loggingOut.set(false));
    }, 450);
  }
  openPalette() {
    var _a2;
    (_a2 = this.palette()) == null ? void 0 : _a2.show();
  }
}, _e.\u0275fac = function AppLayoutComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _e)();
}, _e.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _e,
  selectors: [["app-layout"]],
  viewQuery: function AppLayoutComponent_Query(rf, ctx) {
    if (rf & 1) __viewQuerySignal(ctx.palette, CommandPaletteComponent, 5);
    if (rf & 2) __queryAdvance();
  },
  decls: 6,
  vars: 1,
  consts: [
    ["sidebarContent", ""],
    [
      "role",
      "status",
      1,
      "charte-v2",
      "fixed",
      "inset-0",
      "z-[200]",
      "flex",
      "flex-col"
    ],
    [
      1,
      "charte-v2",
      "flex",
      "min-h-screen",
      "items-center",
      "justify-center",
      "gap-2",
      "text-sm",
      "font-semibold",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "mx-auto",
      "flex",
      "w-full",
      "max-w-[1400px]",
      "flex-1",
      "flex-col",
      "gap-4",
      "px-4",
      "py-10",
      "md:px-10"
    ],
    [
      1,
      "h-8",
      "w-64",
      "animate-pulse",
      "rounded-[12px]",
      2,
      "background",
      "var(--v2-lin)"
    ],
    [
      1,
      "h-4",
      "w-full",
      "max-w-md",
      "animate-pulse",
      "rounded",
      2,
      "background",
      "var(--v2-lin)"
    ],
    [
      1,
      "mt-4",
      "grid",
      "gap-4",
      "sm:grid-cols-2",
      "xl:grid-cols-3"
    ],
    [
      1,
      "h-32",
      "animate-pulse",
      "rounded-[24px]",
      2,
      "background",
      "var(--v2-lin)"
    ],
    [
      1,
      "mt-auto",
      "flex",
      "items-center",
      "justify-center",
      "gap-2",
      "pb-8",
      "text-sm",
      "font-semibold",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "animate-spin",
      3,
      "img",
      "size"
    ],
    [
      1,
      "charte-v2",
      "flex",
      "min-h-screen"
    ],
    [
      1,
      "sidebar",
      "sticky",
      "top-0",
      "z-30",
      "hidden",
      "h-svh",
      "shrink-0",
      "self-start",
      "lg:block"
    ],
    [
      3,
      "ngTemplateOutlet",
      "ngTemplateOutletContext"
    ],
    [
      1,
      "fixed",
      "inset-0",
      "z-50",
      "flex",
      "lg:hidden"
    ],
    [
      1,
      "flex",
      "min-w-0",
      "flex-1",
      "flex-col"
    ],
    [
      1,
      "sticky",
      "top-0",
      "z-40",
      "border-b",
      "backdrop-blur",
      2,
      "border-color",
      "var(--v2-lin)",
      "background",
      "color-mix(in oklab, var(--v2-creme) 88%, transparent)"
    ],
    [
      1,
      "flex",
      "h-16",
      "items-center",
      "gap-2",
      "px-3",
      "sm:gap-3",
      "sm:px-5",
      "md:h-[72px]",
      "md:px-10"
    ],
    [
      "type",
      "button",
      1,
      "icon-btn",
      "grid",
      "shrink-0",
      "lg:hidden",
      2,
      "color",
      "var(--v2-ardoise)",
      3,
      "click"
    ],
    [
      3,
      "img",
      "size"
    ],
    [
      1,
      "min-w-0",
      "flex-1"
    ],
    [
      1,
      "inline-flex",
      "max-w-full",
      "items-center",
      "gap-2",
      "truncate",
      "rounded-full",
      "px-3",
      "py-1.5",
      "text-[11px]",
      "font-bold",
      "uppercase",
      "tracking-[0.08em]",
      2,
      "font-family",
      "var(--v2-font-mono)",
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-foret)"
    ],
    [
      1,
      "shrink-0",
      3,
      "img",
      "size"
    ],
    [1, "truncate"],
    [
      1,
      "flex",
      "shrink-0",
      "items-center",
      "gap-2"
    ],
    [
      "type",
      "button",
      1,
      "top-btn",
      "inline-flex",
      "h-11",
      "items-center",
      "gap-2",
      "rounded-[14px]",
      "border",
      "px-3",
      "text-sm",
      "font-semibold",
      "xl:w-72",
      2,
      "border-color",
      "var(--v2-bord-carte)",
      "background",
      "var(--v2-blanc)",
      "color",
      "var(--v2-gris-texte)",
      3,
      "click"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "shrink-0",
      3,
      "img",
      "size"
    ],
    [
      1,
      "hidden",
      "flex-1",
      "truncate",
      "text-left",
      "xl:inline"
    ],
    [
      1,
      "hidden",
      "shrink-0",
      "rounded-[8px]",
      "border",
      "px-1.5",
      "py-0.5",
      "text-[11px]",
      "font-bold",
      "xl:inline",
      2,
      "font-family",
      "var(--v2-font-mono)",
      "border-color",
      "var(--v2-bord-carte)",
      "background",
      "var(--v2-creme)"
    ],
    [
      "data-top-menu",
      "",
      1,
      "relative",
      "flex",
      "items-center",
      "gap-1"
    ],
    [
      "type",
      "button",
      "aria-haspopup",
      "dialog",
      1,
      "round-btn",
      3,
      "click"
    ],
    [
      "name",
      "notifications",
      3,
      "size"
    ],
    [1, "count"],
    [
      "type",
      "button",
      "aria-haspopup",
      "dialog",
      1,
      "round-btn",
      "hidden",
      "sm:grid",
      3,
      "click"
    ],
    [
      "name",
      "help",
      3,
      "size"
    ],
    [
      "name",
      "settings",
      3,
      "size"
    ],
    [
      "role",
      "dialog",
      1,
      "pop",
      "w-[360px]"
    ],
    [
      "role",
      "dialog",
      1,
      "pop",
      "w-[340px]",
      "p-2"
    ],
    [
      "role",
      "dialog",
      1,
      "pop",
      "w-[320px]",
      "p-2"
    ],
    [
      "data-account-menu",
      "",
      1,
      "relative"
    ],
    [
      "type",
      "button",
      "aria-haspopup",
      "menu",
      1,
      "top-btn",
      "flex",
      "max-w-[12rem]",
      "shrink-0",
      "items-center",
      "gap-2.5",
      "rounded-[14px]",
      "border",
      "border-transparent",
      "p-1",
      "pr-2",
      "text-left",
      "sm:max-w-[14rem]",
      "xl:max-w-[17rem]",
      3,
      "click"
    ],
    [
      1,
      "grid",
      "size-10",
      "shrink-0",
      "place-items-center",
      "rounded-full",
      "text-[13px]",
      "font-extrabold",
      2,
      "background",
      "var(--v2-foret)",
      "color",
      "var(--v2-citron)"
    ],
    [
      1,
      "hidden",
      "min-w-0",
      "leading-tight",
      "xl:block"
    ],
    [
      1,
      "block",
      "truncate",
      "text-sm",
      "font-bold",
      2,
      "color",
      "var(--v2-encre)"
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
      "hidden",
      "shrink-0",
      "xl:block",
      2,
      "color",
      "var(--v2-gris-texte)",
      3,
      "img",
      "size"
    ],
    [
      "role",
      "menu",
      1,
      "absolute",
      "right-0",
      "top-full",
      "z-[60]",
      "mt-2",
      "w-72",
      "rounded-[16px]",
      "border",
      "p-1.5",
      2,
      "border-color",
      "var(--v2-bord-carte)",
      "background",
      "var(--v2-blanc)",
      "box-shadow",
      "var(--v2-ombre-modale)"
    ],
    [
      1,
      "mx-auto",
      "w-full",
      "max-w-[1400px]",
      "flex-1",
      "px-4",
      "py-7",
      "md:px-10",
      "md:py-10"
    ],
    [1, "charte-v2-snack"],
    [
      1,
      "absolute",
      "inset-0",
      2,
      "background",
      "color-mix(in oklab, var(--v2-encre) 50%, transparent)",
      3,
      "click"
    ],
    [
      "role",
      "dialog",
      "aria-modal",
      "true",
      "uiModalA11y",
      "",
      1,
      "relative",
      "flex",
      "h-full",
      "w-[288px]",
      "max-w-[85vw]",
      "flex-col",
      2,
      "box-shadow",
      "var(--v2-ombre-modale)",
      3,
      "dismiss"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "gap-3",
      "px-4",
      "pb-2",
      "pt-4"
    ],
    [
      1,
      "text-[16px]",
      "font-extrabold",
      "tracking-[-0.01em]"
    ],
    [
      "type",
      "button",
      1,
      "pop-link",
      "text-[13px]"
    ],
    [
      1,
      "max-h-[60vh]",
      "overflow-y-auto",
      "px-2",
      "pb-2"
    ],
    [
      "type",
      "button",
      1,
      "pop-link",
      "text-[13px]",
      3,
      "click"
    ],
    [
      1,
      "notif",
      3,
      "click",
      "routerLink"
    ],
    [
      1,
      "grid",
      "size-10",
      "shrink-0",
      "place-items-center",
      "rounded-[12px]"
    ],
    [
      3,
      "name",
      "size"
    ],
    [
      1,
      "block",
      "text-[14px]",
      "font-bold",
      "leading-snug"
    ],
    [
      1,
      "block",
      "text-[13px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "mt-1.5",
      "size-2",
      "shrink-0",
      "rounded-full",
      2,
      "background",
      "var(--v2-vert-pousse)"
    ],
    [
      1,
      "px-3",
      "pb-2",
      "pt-3"
    ],
    [
      1,
      "text-[13px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "type",
      "button",
      1,
      "pop-item",
      3,
      "click"
    ],
    [
      "name",
      "search",
      3,
      "size"
    ],
    [1, "flex-1"],
    [1, "kbd"],
    [
      "aria-disabled",
      "true",
      1,
      "pop-item",
      "is-soon"
    ],
    [
      "name",
      "menu_book",
      3,
      "size"
    ],
    [1, "soon-pill"],
    [
      "name",
      "quiz",
      3,
      "size"
    ],
    [
      1,
      "mx-2",
      "mt-2",
      "rounded-[16px]",
      "p-3",
      2,
      "background",
      "var(--v2-sauge)"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2",
      "text-[14px]",
      "font-bold"
    ],
    [
      "name",
      "support_agent",
      3,
      "size"
    ],
    [
      1,
      "pop-link",
      "mt-2",
      "flex",
      "items-center",
      "gap-2",
      "text-[13px]",
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
      "pop-link",
      "mt-1",
      "flex",
      "items-center",
      "gap-2",
      "text-[13px]",
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
      "px-3",
      "pb-2",
      "pt-3",
      "text-[16px]",
      "font-extrabold",
      "tracking-[-0.01em]"
    ],
    [
      1,
      "pop-item",
      "cursor-default",
      "hover:bg-transparent"
    ],
    [
      "name",
      "language",
      3,
      "size"
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
      "type",
      "button",
      1,
      "pop-item",
      "hidden",
      "lg:flex",
      3,
      "click"
    ],
    [
      "routerLink",
      "/dashboard/utilisateurs",
      1,
      "pop-item"
    ],
    [
      "routerLink",
      "/dashboard/referentiels",
      1,
      "pop-item"
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
      "routerLink",
      "/dashboard/utilisateurs",
      1,
      "pop-item",
      3,
      "click"
    ],
    [
      "name",
      "manage_accounts",
      3,
      "size"
    ],
    [
      "routerLink",
      "/dashboard/referentiels",
      1,
      "pop-item",
      3,
      "click"
    ],
    [
      "name",
      "dataset",
      3,
      "size"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-3",
      "px-3",
      "py-3"
    ],
    [
      1,
      "grid",
      "size-11",
      "shrink-0",
      "place-items-center",
      "rounded-full",
      "text-sm",
      "font-extrabold",
      2,
      "background",
      "var(--v2-foret)",
      "color",
      "var(--v2-citron)"
    ],
    [1, "min-w-0"],
    [
      1,
      "truncate",
      "font-bold"
    ],
    [
      1,
      "truncate",
      "text-xs",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "my-1",
      "h-px",
      2,
      "background",
      "var(--v2-separateur)"
    ],
    [
      "type",
      "button",
      "role",
      "menuitem",
      1,
      "menu-item",
      2,
      "color",
      "var(--v2-erreur-fg)",
      3,
      "click"
    ],
    [
      1,
      "flex",
      "h-full",
      "flex-col",
      2,
      "background",
      "var(--v2-foret)",
      "color",
      "var(--v2-blanc)"
    ],
    [
      1,
      "flex",
      "shrink-0",
      "items-center",
      "pb-5",
      "pt-5"
    ],
    [
      1,
      "rounded-[10px]",
      3,
      "routerLink"
    ],
    [
      "variant",
      "inverse",
      3,
      "size",
      "wordmark"
    ],
    [
      "type",
      "button",
      1,
      "icon-btn",
      "rail-toggle",
      "hidden",
      "lg:grid",
      3,
      "click"
    ],
    [
      3,
      "session",
      "path",
      "badge",
      "collapsed"
    ],
    [
      1,
      "mt-auto",
      "shrink-0",
      "border-t",
      "p-3",
      "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
      2,
      "border-color",
      "var(--v2-foret-trait)"
    ],
    [
      "target",
      "_blank",
      "rel",
      "noopener noreferrer",
      1,
      "cradesc-card",
      "flex",
      "items-center",
      "gap-3",
      "rounded-[16px]",
      "p-2",
      2,
      "background",
      "var(--v2-blanc)",
      "color",
      "var(--v2-encre)",
      3,
      "href"
    ],
    [
      "alt",
      "",
      "width",
      "48",
      "height",
      "42",
      1,
      "h-9",
      "w-auto",
      "shrink-0",
      3,
      "src"
    ],
    [
      1,
      "min-w-0",
      "leading-tight"
    ],
    [
      1,
      "block",
      "text-[10px]",
      "font-bold",
      "uppercase",
      "tracking-[0.08em]",
      2,
      "font-family",
      "var(--v2-font-mono)",
      "color",
      "var(--v2-foret-clair)"
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
      "text-[11px]",
      "font-semibold",
      2,
      "color",
      "var(--v2-foret-clair)"
    ]
  ],
  template: function AppLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      __conditionalCreate(0, AppLayoutComponent_Conditional_0_Template, 10, 4, "div", 1)(1, AppLayoutComponent_Conditional_1_Template, 3, 3, "div", 2)(2, AppLayoutComponent_Conditional_2_Template, 0, 0)(3, AppLayoutComponent_Conditional_3_Template, 48, 45);
      __template(4, AppLayoutComponent_ng_template_4_Template, 11, 29, "ng-template", null, 0, __templateRefExtractor);
    }
    if (rf & 2) __conditional(ctx.loggingOut() ? 0 : !ctx.ready() ? 1 : !ctx.session() ? 2 : 3);
  },
  dependencies: [
    CommonModule,
    NgTemplateOutlet,
    RouterLink,
    RouterOutlet,
    LucideAngularModule,
    LucideAngularComponent,
    SidebarNavComponent,
    CommandPaletteComponent,
    ToastHostComponent,
    UiModalA11yDirective,
    BrandLogoComponent,
    IconComponent,
    SnackbarComponent
  ],
  styles: ["\n    .icon-btn[_ngcontent-%COMP%] {\n      height: 40px;\n      width: 40px;\n      place-items: center;\n      border-radius: 12px;\n      cursor: pointer;\n      transition: background-color 0.15s ease;\n    }\n    .rail-toggle[_ngcontent-%COMP%] {\n      color: color-mix(in oklab, var(--%NS%v2-blanc) 70%, transparent);\n    }\n    .rail-toggle[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-foret-carte);\n      color: var(--%NS%v2-blanc);\n    }\n    .top-btn[_ngcontent-%COMP%] {\n      cursor: pointer;\n      transition:\n        background-color 0.15s ease,\n        border-color 0.15s ease;\n    }\n    .top-btn[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-trait);\n    }\n    .icon-btn[_ngcontent-%COMP%]:focus-visible, \n   .top-btn[_ngcontent-%COMP%]:focus-visible, \n   .menu-item[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    .rail-toggle[_ngcontent-%COMP%]:focus-visible, \n   .cradesc-card[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-citron);\n      outline-offset: 2px;\n    }\n    .menu-item[_ngcontent-%COMP%] {\n      display: flex;\n      width: 100%;\n      align-items: center;\n      gap: 10px;\n      border-radius: 12px;\n      padding: 10px 12px;\n      text-align: left;\n      font-size: 14px;\n      font-weight: 600;\n      cursor: pointer;\n    }\n    .menu-item[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-sauge);\n    }\n    .round-btn[_ngcontent-%COMP%] {\n      position: relative;\n      display: grid;\n      height: 44px;\n      width: 44px;\n      place-items: center;\n      border-radius: 14px;\n      color: var(--%NS%v2-ardoise);\n      cursor: pointer;\n      transition: background-color 0.15s ease, color 0.15s ease;\n    }\n    .round-btn[_ngcontent-%COMP%]:hover, \n   .round-btn.on[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-foret);\n      box-shadow: inset 0 0 0 1px var(--%NS%v2-bord-carte);\n    }\n    .round-btn[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    .count[_ngcontent-%COMP%] {\n      position: absolute;\n      top: 5px;\n      right: 4px;\n      min-width: 18px;\n      height: 18px;\n      border-radius: 999px;\n      padding: 0 5px;\n      font-size: 11px;\n      font-weight: 800;\n      line-height: 18px;\n      text-align: center;\n      background: var(--%NS%v2-erreur-fg);\n      color: var(--%NS%v2-blanc);\n      box-shadow: 0 0 0 2px var(--%NS%v2-creme);\n    }\n    .pop[_ngcontent-%COMP%] {\n      position: absolute;\n      right: 0;\n      top: calc(100% + 10px);\n      z-index: 60;\n      max-width: calc(100vw - 24px);\n      border-radius: 20px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-encre);\n      box-shadow: var(--%NS%v2-ombre-modale);\n      animation: _ngcontent-%COMP%_pop-in 0.18s ease both;\n    }\n    @keyframes _ngcontent-%COMP%_pop-in {\n      from { opacity: 0; transform: translateY(-6px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n    .notif[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: 12px;\n      border-radius: 14px;\n      padding: 10px;\n      cursor: pointer;\n    }\n    .notif[_ngcontent-%COMP%]:hover, \n   .pop-item[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-sauge);\n    }\n    .pop-item[_ngcontent-%COMP%] {\n      display: flex;\n      width: 100%;\n      align-items: center;\n      gap: 12px;\n      border-radius: 12px;\n      padding: 10px 12px;\n      text-align: left;\n      font-size: 14px;\n      font-weight: 600;\n      cursor: pointer;\n    }\n    .pop-item.is-soon[_ngcontent-%COMP%] {\n      cursor: not-allowed;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .pop-item.is-soon[_ngcontent-%COMP%]:hover {\n      background: none;\n    }\n    .pop-link[_ngcontent-%COMP%] {\n      font-weight: 700;\n      color: var(--%NS%v2-foret-clair);\n      cursor: pointer;\n    }\n    .pop-link[_ngcontent-%COMP%]:hover {\n      text-decoration: underline;\n    }\n    .soon-pill[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      padding: 2px 8px;\n      font-size: 11px;\n      font-weight: 700;\n      background: var(--%NS%v2-lin);\n      color: var(--%NS%v2-gris-texte);\n    }\n    .kbd[_ngcontent-%COMP%] {\n      border-radius: 8px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      padding: 1px 6px;\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 11px;\n      font-weight: 700;\n      background: var(--%NS%v2-creme);\n    }\n    .seg[_ngcontent-%COMP%] {\n      display: inline-flex;\n      gap: 2px;\n      border-radius: 10px;\n      padding: 2px;\n      background: var(--%NS%v2-creme);\n    }\n    .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n      border-radius: 8px;\n      padding: 3px 9px;\n      font-size: 12px;\n      font-weight: 800;\n      color: var(--%NS%v2-gris-texte);\n      cursor: pointer;\n    }\n    .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .pop[_ngcontent-%COMP%] { animation: none; }\n    }\n    .sidebar[_ngcontent-%COMP%] {\n      transition: width 0.25s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .sidebar[_ngcontent-%COMP%] {\n        transition: none;\n      }\n    }"]
}), _e);
var AppLayoutPage = (_f = class {
}, _f.\u0275fac = function AppLayoutPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _f)();
}, _f.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _f,
  selectors: [["app-layout-page"]],
  decls: 1,
  vars: 0,
  template: function AppLayoutPage_Template(rf, ctx) {
    if (rf & 1) __element(0, "app-layout");
  },
  dependencies: [AppLayoutComponent],
  encapsulation: 2
}), _f);

export { AppLayoutPage as default };
//# sourceMappingURL=(app).page-CpmxWT9S.mjs.map

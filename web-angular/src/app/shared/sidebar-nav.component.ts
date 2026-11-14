import { Component, computed, effect, inject, input, signal, untracked } from "@angular/core";
import { RouterLink } from "@angular/router";

import type { MessageKey } from "@/lib/i18n/fr";
import { NAV, navAllowed, type ModuleId, type NavItem } from "@/lib/nav";
import { scoopIdsOf } from "@/lib/scope";
import type { Session } from "@/lib/store";
import { IconComponent, type IconName } from "./ui/icon.component";
import { LocaleService } from "./locale.service";

const STORAGE_KEY = "mbd.nav";

type ModuleGroup = {
  /** Identifiant stable (mémoire d'ouverture, id HTML). */
  id: string;
  labelKey: MessageKey;
  icon: IconName;
  items: NavItem[];
  /** Module pas encore construit : entrées grisées, non cliquables (décision D10, aucun lien mort). */
  soon: boolean;
  flat?: boolean;
  /** Intitulé de section affiché au-dessus du premier bloc de la section. */
  section?: "modules" | "tools" | "superadmin";
  defaultOpen: boolean;
};

/**
 * Écrans du module M1 (le modèle `NAV`, partagé avec l'archive React, ne porte le module que pour M2–M5), dans
 * l'ordre d'affichage : la coopérative, les personnes, puis la vie de la coopérative (les rôles sont dans Administration). La phrase « à quoi ça
 * sert » vit sous le titre de chaque page, pas dans le menu.
 */
const M1_PATHS = [
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
  "/dashboard/rappels",
];

const ALL_ITEMS = NAV.flatMap((g) => g.items);
const byPath = (paths: string[]) =>
  paths.map((path) => ALL_ITEMS.find((item) => item.to === path)).filter((item): item is NavItem => !!item);
const soonOf = (module: ModuleId) => ALL_ITEMS.filter((i) => i.soon && i.module === module);
const itemsOfSection = (name: string) => NAV.find((g) => g.group === name)?.items.filter((i) => !i.soon) ?? [];

/** Icône de chaque écran (Material Symbols Rounded, charte V2) ; repli sur l'icône du module. */
const SCREEN_ICONS: Record<string, IconName> = {
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
  "/dashboard/super-admin/comptes": "manage_accounts",
};

/** Menu organisé module par module (note de cadrage), puis les blocs transversaux. */
const MODULE_GROUPS: ModuleGroup[] = [
  { id: "pilotage", labelKey: "nav.group.pilotage", icon: "space_dashboard", items: itemsOfSection("Pilotage"), soon: false, flat: true, defaultOpen: true },
  // Bloc à part, en tête et visible seulement avec `role.configure` (super administrateur).
  { id: "superadmin", section: "superadmin", labelKey: "nav.group.superadmin", icon: "lock", items: itemsOfSection("Super administration"), soon: false, defaultOpen: true },
  { id: "m1", section: "modules", labelKey: "modules.administratif.name", icon: "badge", items: byPath(M1_PATHS), soon: false, defaultOpen: true },
  { id: "m2", section: "modules", labelKey: "modules.commercial.name", icon: "storefront", items: soonOf("commercial"), soon: true, defaultOpen: false },
  { id: "m3", section: "modules", labelKey: "modules.exploitation.name", icon: "query_stats", items: soonOf("exploitation"), soon: true, defaultOpen: false },
  { id: "m4", section: "modules", labelKey: "modules.agronomique.name", icon: "potted_plant", items: soonOf("agronomique"), soon: true, defaultOpen: false },
  { id: "m5", section: "modules", labelKey: "modules.sig.name", icon: "pin_drop", items: soonOf("sig"), soon: true, defaultOpen: false },
  { id: "qualite", section: "tools", labelKey: "nav.item.qualite", icon: "verified", items: byPath(["/dashboard/qualite"]), soon: false, flat: true, defaultOpen: true },
  { id: "admin", section: "tools", labelKey: "nav.group.administration", icon: "tune", items: itemsOfSection("Administration"), soon: false, defaultOpen: false },
];

function readOpen(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).filter(([, v]) => typeof v === "boolean"),
    ) as Record<string, boolean>;
  } catch {
    return {};
  }
}
function writeOpen(value: Record<string, boolean>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* stockage indisponible : le menu fonctionne, sans mémoire */
  }
}

/**
 * Menu latéral (charte V2, fond forêt). `NAV`/`navAllowed` viennent de `src/lib/nav.ts`.
 *
 * - Entrées de premier niveau (Tableau de bord, Rapports) : icône + pastille citron si active.
 * - Groupes : en-tête avec icône et chevron ; ouverture/fermeture animée (hauteur + opacité).
 *   Sous-entrées en arborescence : trait vertical + tiret ; tiret citron sur l'entrée active.
 *   Le groupe de la page courante s'ouvre d'office ; l'état est mémorisé dans le navigateur.
 * - `collapsed` : rail d'icônes (libellés en infobulle), avec un court fondu au changement de mode.
 * - Toutes les pages connectées vivent sous `/dashboard/…` ; « Tableau de bord » mène à `/dashboard/<rôle>`.
 */
@Component({
  selector: "app-sidebar-nav",
  imports: [RouterLink, IconComponent],
  host: { class: "flex min-h-0 flex-1 flex-col" },
  styles: `
    :host {
      --muted-ink: color-mix(in oklab, var(--v2-blanc) 72%, transparent);
      --guide: color-mix(in oklab, var(--v2-blanc) 16%, transparent);
    }
    .fade {
      animation: nav-fade 0.22s ease both;
    }
    @keyframes nav-fade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    /* ── Lignes de premier niveau (entrées et en-têtes de groupe) ── */
    .row {
      position: relative;
      display: flex;
      width: 100%;
      align-items: center;
      gap: 12px;
      border-radius: 14px;
      padding: 10px 12px;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
      color: var(--muted-ink);
      cursor: pointer;
      transition:
        background-color 0.18s ease,
        color 0.18s ease;
    }
    .row:hover {
      background: var(--v2-foret-carte);
      color: var(--v2-blanc);
    }
    .row.active {
      background: var(--v2-citron);
      color: var(--v2-foret);
      font-weight: 800;
    }
    .row.current {
      color: var(--v2-blanc);
    }
    /* Module ouvert = panneau doux (fond éclairci, coins arrondis) : séparé sans aucun trait. */
    .module {
      margin-top: 4px;
      border-radius: 18px;
      transition:
        background-color 0.3s ease,
        padding 0.3s ease;
    }
    .module.open {
      background: color-mix(in oklab, var(--v2-blanc) 5%, transparent);
      padding-bottom: 6px;
    }
    .module.open > .row:hover {
      background: color-mix(in oklab, var(--v2-blanc) 6%, transparent);
    }
    .section {
      margin: 20px 12px 6px;
      font-family: var(--v2-font-mono);
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: color-mix(in oklab, var(--v2-blanc) 42%, transparent);
    }
    /* Bloc super administrateur : cadre citron, pour qu'il ne se confonde pas avec les autres menus. */
    .section-super {
      color: var(--v2-citron);
    }
    .module.super {
      border: 1.5px solid color-mix(in oklab, var(--v2-citron) 55%, transparent);
    }
    .chevron {
      transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1);
      opacity: 0.7;
    }
    .open > .row .chevron {
      transform: rotate(90deg);
    }

    /* ── Sous-menu animé : grille 0fr ↔ 1fr (hauteur auto animable) ── */
    .panel {
      display: grid;
      grid-template-rows: 0fr;
      opacity: 0;
      transition:
        grid-template-rows 0.3s cubic-bezier(0.32, 0.72, 0, 1),
        opacity 0.22s ease;
    }
    .open > .panel {
      grid-template-rows: 1fr;
      opacity: 1;
    }
    .panel-inner {
      min-height: 0;
      overflow: hidden;
    }
    .tree {
      margin: 2px 0 4px 31px;
    }

    /* ── Sous-entrées : tiret + libellé ── */
    .leaf {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 10px;
      padding: 8px 12px;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--muted-ink);
      cursor: pointer;
      transition:
        background-color 0.18s ease,
        color 0.18s ease;
    }
    .leaf:hover {
      color: var(--v2-blanc);
      background: color-mix(in oklab, var(--v2-foret-carte) 70%, transparent);
    }
    .leaf.active {
      color: var(--v2-citron);
      font-weight: 800;
      background: color-mix(in oklab, var(--v2-blanc) 8%, transparent);
    }

    .row:focus-visible,
    .leaf:focus-visible,
    .rail-item:focus-visible {
      outline: 2px solid var(--v2-citron);
      outline-offset: 2px;
    }

    /* ── Rail (menu replié) ── */
    .rail-item {
      position: relative;
      display: flex;
      justify-content: center;
      border-radius: 14px;
      padding: 11px 0;
      color: var(--muted-ink);
      cursor: pointer;
      transition:
        background-color 0.18s ease,
        color 0.18s ease;
    }
    .rail-item:hover {
      background: var(--v2-foret-carte);
      color: var(--v2-blanc);
    }
    .rail-item.active {
      background: var(--v2-citron);
      color: var(--v2-foret);
    }

    .soon {
      display: grid;
      flex-shrink: 0;
      place-items: center;
      color: color-mix(in oklab, var(--v2-blanc) 50%, transparent);
    }
    .leaf-soon,
    .leaf-soon:hover {
      cursor: not-allowed;
      background: none;
      color: color-mix(in oklab, var(--v2-blanc) 38%, transparent);
    }
    .badge {
      border-radius: 999px;
      background: var(--v2-citron);
      padding: 1px 7px;
      font-size: 11px;
      font-weight: 800;
      color: var(--v2-foret);
      font-variant-numeric: tabular-nums;
    }
    .row.active .badge {
      background: var(--v2-foret);
      color: var(--v2-citron);
    }
    .dot {
      position: absolute;
      top: 7px;
      right: 14px;
      height: 8px;
      width: 8px;
      border-radius: 999px;
      background: var(--v2-citron);
      box-shadow: 0 0 0 2px var(--v2-foret);
    }

    @media (prefers-reduced-motion: reduce) {
      .fade {
        animation: none;
      }
      .panel,
      .chevron {
        transition: none;
      }
    }
  `,
  template: `
    @for (mode of [collapsed()]; track mode) {
      <div class="fade min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain pb-4" [class.px-3]="!mode" [class.px-2.5]="mode">
        @if (mode) {
          <!-- Rail : toutes les entrées en icônes, groupes séparés par un trait -->
          @for (group of visibleGroups(); track group.id; let first = $first) {
            @if (!first && !group.soon) {
              <div class="mx-3 my-2 h-px" style="background: var(--v2-foret-trait)" aria-hidden="true"></div>
            }
            <div class="space-y-0.5">
              @for (item of group.soon ? [] : allowedItems(group); track item.to) {
                <a
                  class="rail-item"
                  [class.active]="isActive(item)"
                  [routerLink]="linkFor(item)"
                  [attr.aria-current]="isActive(item) ? 'page' : null"
                  [attr.aria-label]="t()(item.labelKey)"
                  [attr.title]="t()(item.labelKey)"
                >
                  <ui-icon [name]="iconOf(item)" [size]="22" />
                  @if (badge()(item.to) > 0) {
                    <span class="dot" aria-hidden="true"></span>
                  }
                </a>
              }
            </div>
          }
        } @else {
          @for (group of visibleGroups(); track group.id; let first = $first) {
            @if (group.section && group.section !== previousSection(group)) {
              <p class="section" [class.section-super]="group.section === 'superadmin'">{{ t()(group.section === "modules" ? "shell.nav.modules" : group.section === "superadmin" ? "nav.group.superadmin" : "shell.nav.tools") }}</p>
            }
            @if (group.flat) {
              <div class="space-y-0.5" [class.mt-1]="!first && !group.section">
                @for (item of allowedItems(group); track item.to) {
                  <a
                    class="row"
                    [class.active]="isActive(item)"
                    [routerLink]="linkFor(item)"
                    [attr.aria-current]="isActive(item) ? 'page' : null"
                  >
                    <ui-icon [name]="iconOf(item)" [size]="22" />
                    <span class="flex-1 truncate">{{ t()(item.labelKey) }}</span>
                    @if (badge()(item.to) > 0) {
                      <span class="badge">{{ badge()(item.to) }}</span>
                    }
                  </a>
                }
              </div>
            } @else {
              <div class="module" [class.open]="isOpen(group)" [class.super]="group.id === 'superadmin'">
                <button
                  type="button"
                  class="row"
                  [class.current]="hasActive(group)"
                  [attr.aria-expanded]="isOpen(group)"
                  [attr.aria-controls]="panelId(group)"
                  (click)="toggle(group)"
                >
                  <ui-icon [name]="group.icon" [size]="22" />
                  <span class="flex min-w-0 flex-1 items-center gap-2">
                    <span class="truncate" [class.opacity-60]="group.soon">{{ t()(group.labelKey) }}</span>
                  </span>
                  @if (group.soon) {
                    <span class="soon" [attr.title]="t()('modules.state.soon')">
                      <ui-icon name="schedule" [size]="15" />
                      <span class="sr-only">{{ t()("modules.state.soon") }}</span>
                    </span>
                  }
                  @if (!isOpen(group) && pending(group) > 0) {
                    <span class="badge">{{ pending(group) }}</span>
                  }
                  <ui-icon name="chevron_right" [size]="20" class="chevron" />
                </button>
                <div class="panel" [id]="panelId(group)" [attr.inert]="isOpen(group) ? null : ''">
                  <div class="panel-inner">
                    <div class="tree">
                      @for (item of allowedItems(group); track item.labelKey) {
                          @if (group.soon) {
                            <span class="leaf leaf-soon" aria-disabled="true">
                              <span class="flex-1 truncate">{{ t()(item.labelKey) }}</span>
                            </span>
                          } @else {
                            <a
                              class="leaf"
                              [class.active]="isActive(item)"
                              [routerLink]="linkFor(item)"
                              [attr.aria-current]="isActive(item) ? 'page' : null"
                            >
                              <span class="flex-1 truncate">{{ t()(item.labelKey) }}</span>
                              @if (badge()(item.to) > 0) {
                                <span class="badge">{{ badge()(item.to) }}</span>
                              }
                            </a>
                          }
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
          }
        }
      </div>
    }
  `,
})
export class SidebarNavComponent {
  readonly session = input.required<Session>();
  readonly path = input.required<string>();
  /** Nombre d'éléments à traiter d'une entrée (0 : rien à afficher). */
  readonly badge = input.required<(to: string) => number>();
  /** Rail d'icônes seules. */
  readonly collapsed = input(false);

  protected readonly t = inject(LocaleService).t;

  private readonly stored = signal<Record<string, boolean>>(readOpen());

  /** Groupes ayant au moins une entrée visible pour cette session. */
  protected readonly visibleGroups = computed(() => MODULE_GROUPS.filter((g) => this.allowedItems(g).length > 0));

  constructor() {
    // En arrivant sur une page d'un groupe fermé, on rouvre ce groupe (la page active reste visible).
    effect(() => {
      this.path();
      const stored = untracked(this.stored);
      const reopen = MODULE_GROUPS.filter((g) => !g.flat && stored[g.id] === false && untracked(() => this.hasActive(g)));
      if (reopen.length === 0) return;
      const next = { ...stored, ...Object.fromEntries(reopen.map((g) => [g.id, true])) };
      this.stored.set(next);
      writeOpen(next);
    });
  }

  /** Entrées visibles : droits de la session ; un module « à venir » montre ses écrans prévus, grisés. */
  protected allowedItems(g: ModuleGroup): NavItem[] {
    if (g.soon) return g.items;
    const session = this.session();
    return g.items.filter((i) => !i.soon && navAllowed(session, i));
  }

  /** Section du bloc visible précédent (pour n'afficher chaque intitulé qu'une fois). */
  protected previousSection(g: ModuleGroup): ModuleGroup["section"] {
    const groups = this.visibleGroups();
    const i = groups.indexOf(g);
    return i > 0 ? groups[i - 1]!.section : undefined;
  }

  protected iconOf(item: NavItem): IconName {
    return SCREEN_ICONS[item.to] ?? "dataset";
  }

  protected panelId(g: ModuleGroup): string {
    return `nav-${g.id}`;
  }

  /** Le tableau de bord vit sous `/dashboard/<rôle>` ; les autres entrées gardent leur chemin. */
  protected linkFor(item: NavItem): string | string[] {
    return item.to === "/" ? ["/dashboard", this.session().role] : item.to;
  }

  protected isActive(item: NavItem): boolean {
    if (!item.to) return false; // écran « à venir » : jamais actif
    const path = this.path().split(/[?#]/)[0] ?? "";
    // Tableau de bord : uniquement /dashboard/<rôle> (toutes les autres pages vivent aussi sous /dashboard/…).
    if (item.to === "/") return path === "/" || path === `/dashboard/${this.session().role}`;
    // « Ma coopérative » mène à la fiche de la coopérative de la personne : elle reste active sur cette fiche.
    if (item.to === "/dashboard/cooperative") {
      const ownScoopIds = scoopIdsOf(this.session());
      return (
        path === item.to ||
        [...ownScoopIds].some((scoopId) => path === `/dashboard/cooperatives/${scoopId}` || path.startsWith(`/dashboard/cooperatives/${scoopId}/`))
      );
    }
    return path === item.to || path.startsWith(`${item.to}/`);
  }

  protected hasActive(g: ModuleGroup): boolean {
    return this.allowedItems(g).some((i) => this.isActive(i));
  }

  /** Choix mémorisé d'abord ; à défaut, le groupe de la page courante (ou ouvert par défaut) s'ouvre. */
  protected isOpen(g: ModuleGroup): boolean {
    if (g.flat) return true;
    return this.stored()[g.id] ?? (this.hasActive(g) || g.defaultOpen);
  }

  protected pending(g: ModuleGroup): number {
    const badge = this.badge();
    return this.allowedItems(g).reduce((sum, i) => sum + badge(i.to), 0);
  }

  protected toggle(g: ModuleGroup): void {
    const next = { ...this.stored(), [g.id]: !this.isOpen(g) };
    this.stored.set(next);
    writeOpen(next);
  }
}

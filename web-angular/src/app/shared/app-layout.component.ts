import {
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationEnd, Router, RouterLink, RouterOutlet } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { filter, map } from "rxjs";
import {
  LucideAngularModule,
  LogOut,
  Menu,
  Search,
  ChevronDown,
  Loader2,
  MapPinned,
} from "lucide-angular";

import "./ui/charte-v2-fonts";

import { hydrateSessionFromApi } from "@/lib/api/session";
import { logoutAuthSideEffects } from "@/lib/auth";
import { qualityCounts } from "@/lib/quality-nav";
import { scoopNamesOf, scopedDossiers } from "@/lib/scope";
import { fmtDateTime } from "@/lib/format";
import type { Permission } from "@/lib/permissions";
import { BRAND, CRADESC } from "@/config/brand";
import { can } from "@/lib/store";
import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { SidebarNavComponent } from "./sidebar-nav.component";
import { CommandPaletteComponent } from "./command-palette.component";
import { ToastHostComponent } from "./toast-host.component";
import { UiModalA11yDirective } from "./ui/modal-a11y.directive";
import { BrandLogoComponent } from "./ui/brand-logo.component";
import { SnackbarComponent } from "./ui/snackbar.component";
import { IconComponent, type IconName } from "./ui/icon.component";

const SIDEBAR_KEY = "mbd.sidebar.collapsed";

/** Une seule hydratation par chargement de page (plusieurs `<app-shell>` possibles). */
let sessionHydration: Promise<void> | null = null;
function ensureSessionHydrated(): Promise<void> {
  if (!sessionHydration) {
    sessionHydration = hydrateSessionFromApi().then(() => undefined);
  }
  return sessionHydration;
}

/**
 * Layout persistant de l'application connectée (« app shell ») : menu latéral, barre du haut,
 * recherche universelle, toasts, session. Monté UNE fois par la route sans segment `pages/(app).page.ts` ;
 * à chaque navigation, seul le contenu du `<router-outlet>` change (SPA, pas de reconstruction du cadre).
 * Le contrôle des droits de chaque page reste dans `<app-shell perm area>` (voir `app-shell.component.ts`).
 */
@Component({
  selector: "app-layout",
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    LucideAngularModule,
    SidebarNavComponent,
    CommandPaletteComponent,
    ToastHostComponent,
    UiModalA11yDirective,
    BrandLogoComponent,
    IconComponent,
    SnackbarComponent,
  ],
  styles: `
    /* Pas de « display » ici : il écraserait les utilitaires responsive (hidden / lg:grid). */
    .icon-btn {
      height: 40px;
      width: 40px;
      place-items: center;
      border-radius: 12px;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .rail-toggle {
      color: color-mix(in oklab, var(--v2-blanc) 70%, transparent);
    }
    .rail-toggle:hover {
      background: var(--v2-foret-carte);
      color: var(--v2-blanc);
    }
    .top-btn {
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }
    .top-btn:hover {
      border-color: var(--v2-gris-trait);
    }
    .icon-btn:focus-visible,
    .top-btn:focus-visible,
    .menu-item:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    .rail-toggle:focus-visible,
    .cradesc-card:focus-visible {
      outline: 2px solid var(--v2-citron);
      outline-offset: 2px;
    }
    .menu-item {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 10px;
      border-radius: 12px;
      padding: 10px 12px;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .menu-item:hover {
      background: var(--v2-sauge);
    }
    .round-btn {
      position: relative;
      display: grid;
      height: 44px;
      width: 44px;
      place-items: center;
      border-radius: 14px;
      color: var(--v2-ardoise);
      cursor: pointer;
      transition: background-color 0.15s ease, color 0.15s ease;
    }
    .round-btn:hover,
    .round-btn.on {
      background: var(--v2-blanc);
      color: var(--v2-foret);
      box-shadow: inset 0 0 0 1px var(--v2-bord-carte);
    }
    .round-btn:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    .count {
      position: absolute;
      top: 5px;
      right: 4px;
      min-width: 18px;
      height: 18px;
      border-radius: 999px;
      padding: 0 5px;
      font-size: 11px;
      font-weight: 800;
      line-height: 18px;
      text-align: center;
      background: var(--v2-erreur-fg);
      color: var(--v2-blanc);
      box-shadow: 0 0 0 2px var(--v2-creme);
    }
    .pop {
      position: absolute;
      right: 0;
      top: calc(100% + 10px);
      z-index: 60;
      max-width: calc(100vw - 24px);
      border-radius: 20px;
      border: 1px solid var(--v2-bord-carte);
      background: var(--v2-blanc);
      color: var(--v2-encre);
      box-shadow: var(--v2-ombre-modale);
      animation: pop-in 0.18s ease both;
    }
    @keyframes pop-in {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .notif {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      border-radius: 14px;
      padding: 10px;
      cursor: pointer;
    }
    .notif:hover,
    .pop-item:hover {
      background: var(--v2-sauge);
    }
    .pop-item {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 12px;
      border-radius: 12px;
      padding: 10px 12px;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .pop-item.is-soon {
      cursor: not-allowed;
      color: var(--v2-gris-texte);
    }
    .pop-item.is-soon:hover {
      background: none;
    }
    .pop-link {
      font-weight: 700;
      color: var(--v2-foret-clair);
      cursor: pointer;
    }
    .pop-link:hover {
      text-decoration: underline;
    }
    .soon-pill {
      border-radius: 999px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 700;
      background: var(--v2-lin);
      color: var(--v2-gris-texte);
    }
    .kbd {
      border-radius: 8px;
      border: 1px solid var(--v2-bord-carte);
      padding: 1px 6px;
      font-family: var(--v2-font-mono);
      font-size: 11px;
      font-weight: 700;
      background: var(--v2-creme);
    }
    .seg {
      display: inline-flex;
      gap: 2px;
      border-radius: 10px;
      padding: 2px;
      background: var(--v2-creme);
    }
    .seg button {
      border-radius: 8px;
      padding: 3px 9px;
      font-size: 12px;
      font-weight: 800;
      color: var(--v2-gris-texte);
      cursor: pointer;
    }
    .seg button.on {
      background: var(--v2-foret);
      color: var(--v2-blanc);
    }
    @media (prefers-reduced-motion: reduce) {
      .pop { animation: none; }
    }
    .sidebar {
      transition: width 0.25s cubic-bezier(0.32, 0.72, 0, 1);
    }
    @media (prefers-reduced-motion: reduce) {
      .sidebar {
        transition: none;
      }
    }
  `,
  template: `
    @if (loggingOut()) {
      <div
        class="charte-v2 fixed inset-0 z-[200] flex flex-col"
        role="status"
        [attr.aria-label]="t()('shell.logout.loading')"
      >
        <div class="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-4 px-4 py-10 md:px-10">
          <div class="h-8 w-64 animate-pulse rounded-[12px]" style="background: var(--v2-lin)"></div>
          <div class="h-4 w-full max-w-md animate-pulse rounded" style="background: var(--v2-lin)"></div>
          <div class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            @for (_ of skeletonCards; track $index) {
              <div class="h-32 animate-pulse rounded-[24px]" style="background: var(--v2-lin)"></div>
            }
          </div>
          <p class="mt-auto flex items-center justify-center gap-2 pb-8 text-sm font-semibold" style="color: var(--v2-gris-texte)">
            <lucide-angular [img]="icons.loader" [size]="16" class="animate-spin" aria-hidden="true" />
            {{ t()("shell.logout.loading") }}
          </p>
        </div>
      </div>
    } @else if (!ready()) {
      <div class="charte-v2 flex min-h-screen items-center justify-center gap-2 text-sm font-semibold" style="color: var(--v2-gris-texte)">
        <lucide-angular [img]="icons.loader" [size]="16" class="animate-spin" aria-hidden="true" />
        {{ t()("shell.loading") }}
      </div>
    } @else if (!session()) {
      <!-- redirect effect below handles navigation; render nothing meanwhile -->
    } @else {
      <div class="charte-v2 flex min-h-screen">
        <aside
          class="sidebar sticky top-0 z-30 hidden h-svh shrink-0 self-start lg:block"
          [style.width.px]="collapsed() ? 84 : 272"
        >
          <ng-container [ngTemplateOutlet]="sidebarContent" [ngTemplateOutletContext]="{ rail: collapsed() }" />
        </aside>
        @if (mobileOpen()) {
          <div class="fixed inset-0 z-50 flex lg:hidden">
            <div
              class="absolute inset-0"
              style="background: color-mix(in oklab, var(--v2-encre) 50%, transparent)"
              (click)="mobileOpen.set(false)"
            ></div>
            <div
              class="relative flex h-full w-[288px] max-w-[85vw] flex-col"
              style="box-shadow: var(--v2-ombre-modale)"
              role="dialog"
              aria-modal="true"
              [attr.aria-label]="t()('shell.openMenu')"
              uiModalA11y
              (dismiss)="mobileOpen.set(false)"
            >
              <ng-container [ngTemplateOutlet]="sidebarContent" [ngTemplateOutletContext]="{ rail: false }" />
            </div>
          </div>
        }

        <div class="flex min-w-0 flex-1 flex-col">
          <header
            class="sticky top-0 z-40 border-b backdrop-blur"
            style="border-color: var(--v2-lin); background: color-mix(in oklab, var(--v2-creme) 88%, transparent)"
          >
            <div class="flex h-16 items-center gap-2 px-3 sm:gap-3 sm:px-5 md:h-[72px] md:px-10">
              <button
                type="button"
                class="icon-btn grid shrink-0 lg:hidden"
                style="color: var(--v2-ardoise)"
                (click)="mobileOpen.set(true)"
                [attr.aria-label]="t()('shell.openMenu')"
              >
                <lucide-angular [img]="icons.menu" [size]="22" />
              </button>
              <div class="min-w-0 flex-1">
                <span
                  class="inline-flex max-w-full items-center gap-2 truncate rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em]"
                  style="font-family: var(--v2-font-mono); background: var(--v2-sauge); color: var(--v2-foret)"
                >
                  <lucide-angular [img]="icons.scope" [size]="14" class="shrink-0" />
                  <span class="truncate">{{ scopeLabel() }}</span>
                </span>
              </div>
              <div class="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  (click)="openPalette()"
                  [attr.aria-label]="t()('shell.searchAria')"
                  class="top-btn inline-flex h-11 items-center gap-2 rounded-[14px] border px-3 text-sm font-semibold xl:w-72"
                  style="border-color: var(--v2-bord-carte); background: var(--v2-blanc); color: var(--v2-gris-texte)"
                >
                  <lucide-angular [img]="icons.search" [size]="18" class="shrink-0" aria-hidden="true" />
                  <span class="hidden flex-1 truncate text-left xl:inline">{{ t()("shell.searchAria") }}</span>
                  <kbd
                    class="hidden shrink-0 rounded-[8px] border px-1.5 py-0.5 text-[11px] font-bold xl:inline"
                    style="font-family: var(--v2-font-mono); border-color: var(--v2-bord-carte); background: var(--v2-creme)"
                    >{{ modKey() }} K</kbd
                  >
                </button>
                <!-- Notifications · Centre d'aide · Paramètres -->
                <div class="relative flex items-center gap-1" data-top-menu>
                  <button
                    type="button"
                    class="round-btn"
                    [class.on]="topMenu() === 'notif'"
                    [attr.aria-label]="t()('shell.notif.title')"
                    [attr.aria-expanded]="topMenu() === 'notif'"
                    aria-haspopup="dialog"
                    (click)="toggleTop('notif', $event)"
                  >
                    <ui-icon name="notifications" [size]="22" />
                    @if (unreadCount() > 0) {
                      <span class="count">{{ unreadCount() }}</span>
                    }
                  </button>
                  <button
                    type="button"
                    class="round-btn hidden sm:grid"
                    [class.on]="topMenu() === 'help'"
                    [attr.aria-label]="t()('shell.help.title')"
                    [attr.aria-expanded]="topMenu() === 'help'"
                    aria-haspopup="dialog"
                    (click)="toggleTop('help', $event)"
                  >
                    <ui-icon name="help" [size]="22" />
                  </button>
                  <button
                    type="button"
                    class="round-btn hidden sm:grid"
                    [class.on]="topMenu() === 'settings'"
                    [attr.aria-label]="t()('shell.settings.title')"
                    [attr.aria-expanded]="topMenu() === 'settings'"
                    aria-haspopup="dialog"
                    (click)="toggleTop('settings', $event)"
                  >
                    <ui-icon name="settings" [size]="22" />
                  </button>

                  @if (topMenu() === "notif") {
                    <div class="pop w-[360px]" role="dialog" [attr.aria-label]="t()('shell.notif.title')">
                      <div class="flex items-center justify-between gap-3 px-4 pb-2 pt-4">
                        <p class="text-[16px] font-extrabold tracking-[-0.01em]">{{ t()("shell.notif.title") }}</p>
                        @if (unreadCount() > 0) {
                          <button type="button" class="pop-link text-[13px]" (click)="markAllRead()">{{ t()("shell.notif.markAll") }}</button>
                        }
                      </div>
                      <ul class="max-h-[60vh] overflow-y-auto px-2 pb-2">
                        @for (notification of notifications(); track notification.id) {
                          <li>
                            <a class="notif" [routerLink]="notification.to" (click)="topMenu.set(null)">
                              <span class="grid size-10 shrink-0 place-items-center rounded-[12px]" [style.background]="notification.bg" [style.color]="notification.fg">
                                <ui-icon [name]="notification.icon" [size]="20" />
                              </span>
                              <span class="min-w-0 flex-1">
                                <span class="block text-[14px] font-bold leading-snug">{{ notification.title }}</span>
                                <span class="block text-[13px] font-medium" style="color: var(--v2-gris-texte)">{{ notification.body }}</span>
                              </span>
                              @if (!isRead(notification.id)) {
                                <span class="mt-1.5 size-2 shrink-0 rounded-full" style="background: var(--v2-vert-pousse)" [attr.aria-label]="t()('shell.notif.unread')"></span>
                              }
                            </a>
                          </li>
                        }
                      </ul>
                    </div>
                  }

                  @if (topMenu() === "help") {
                    <div class="pop w-[340px] p-2" role="dialog" [attr.aria-label]="t()('shell.help.title')">
                      <div class="px-3 pb-2 pt-3">
                        <p class="text-[16px] font-extrabold tracking-[-0.01em]">{{ t()("shell.help.title") }}</p>
                        <p class="text-[13px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("shell.help.intro") }}</p>
                      </div>
                      <button type="button" class="pop-item" (click)="topMenu.set(null); openPalette()">
                        <ui-icon name="search" [size]="20" />
                        <span class="flex-1">{{ t()("shell.help.search") }}</span>
                        <kbd class="kbd">{{ modKey() }} K</kbd>
                      </button>
                      <div class="pop-item is-soon" aria-disabled="true">
                        <ui-icon name="menu_book" [size]="20" />
                        <span class="flex-1">{{ t()("shell.help.guide") }}</span>
                        <span class="soon-pill">{{ t()("modules.state.soon") }}</span>
                      </div>
                      <div class="pop-item is-soon" aria-disabled="true">
                        <ui-icon name="quiz" [size]="20" />
                        <span class="flex-1">{{ t()("shell.help.faq") }}</span>
                        <span class="soon-pill">{{ t()("modules.state.soon") }}</span>
                      </div>
                      <div class="mx-2 mt-2 rounded-[16px] p-3" style="background: var(--v2-sauge)">
                        <p class="flex items-center gap-2 text-[14px] font-bold">
                          <ui-icon name="support_agent" [size]="20" /> {{ t()("shell.help.contact") }}
                        </p>
                        <a [href]="'mailto:' + cradesc.email" class="pop-link mt-2 flex items-center gap-2 text-[13px]">
                          <ui-icon name="mail" [size]="16" /> {{ cradesc.email }}
                        </a>
                        <a [href]="'tel:' + cradesc.phoneHref" class="pop-link mt-1 flex items-center gap-2 text-[13px]">
                          <ui-icon name="call" [size]="16" /> {{ cradesc.phone }}
                        </a>
                      </div>
                    </div>
                  }

                  @if (topMenu() === "settings") {
                    <div class="pop w-[320px] p-2" role="dialog" [attr.aria-label]="t()('shell.settings.title')">
                      <p class="px-3 pb-2 pt-3 text-[16px] font-extrabold tracking-[-0.01em]">{{ t()("shell.settings.title") }}</p>
                      <div class="pop-item cursor-default hover:bg-transparent">
                        <ui-icon name="language" [size]="20" />
                        <span class="flex-1">{{ t()("shell.settings.language") }}</span>
                        <span class="seg" role="radiogroup" [attr.aria-label]="t()('shell.settings.language')">
                          @for (localeOption of locales; track localeOption) {
                            <button
                              type="button"
                              role="radio"
                              [attr.aria-checked]="localeService.locale() === localeOption"
                              [class.on]="localeService.locale() === localeOption"
                              (click)="localeService.setLocale(localeOption)"
                            >
                              {{ localeOption.toUpperCase() }}
                            </button>
                          }
                        </span>
                      </div>
                      <button type="button" class="pop-item hidden lg:flex" (click)="toggleCollapsed()">
                        <ui-icon [name]="collapsed() ? 'left_panel_open' : 'left_panel_close'" [size]="20" />
                        <span class="flex-1">{{ collapsed() ? t()("shell.sidebar.expand") : t()("shell.sidebar.collapse") }}</span>
                      </button>
                      @if (canSee("user.manage")) {
                        <a class="pop-item" routerLink="/dashboard/utilisateurs" (click)="topMenu.set(null)">
                          <ui-icon name="manage_accounts" [size]="20" />
                          <span class="flex-1">{{ t()("nav.item.utilisateurs") }}</span>
                        </a>
                      }
                      @if (canSee("config.manage")) {
                        <a class="pop-item" routerLink="/dashboard/referentiels" (click)="topMenu.set(null)">
                          <ui-icon name="dataset" [size]="20" />
                          <span class="flex-1">{{ t()("nav.item.referentiels") }}</span>
                        </a>
                      }
                    </div>
                  }
                </div>
                <div class="relative" data-account-menu>
                  <button
                    type="button"
                    class="top-btn flex max-w-[12rem] shrink-0 items-center gap-2.5 rounded-[14px] border border-transparent p-1 pr-2 text-left sm:max-w-[14rem] xl:max-w-[17rem]"
                    [attr.aria-label]="t()('shell.accountAria')"
                    [attr.aria-expanded]="accountMenuOpen()"
                    aria-haspopup="menu"
                    (click)="toggleAccountMenu($event)"
                  >
                    <span
                      class="grid size-10 shrink-0 place-items-center rounded-full text-[13px] font-extrabold"
                      style="background: var(--v2-foret); color: var(--v2-citron)"
                    >
                      {{ initials() }}
                    </span>
                    <span class="hidden min-w-0 leading-tight xl:block">
                      <span class="block truncate text-sm font-bold" style="color: var(--v2-encre)">{{ session()!.name }}</span>
                      <span class="block truncate text-xs font-medium" style="color: var(--v2-gris-texte)">{{
                        store.roleLabel(session()!.role)
                      }}</span>
                    </span>
                    <lucide-angular [img]="icons.chevronDown" [size]="16" class="hidden shrink-0 xl:block" style="color: var(--v2-gris-texte)" />
                  </button>
                  @if (accountMenuOpen()) {
                    <div
                      role="menu"
                      class="absolute right-0 top-full z-[60] mt-2 w-72 rounded-[16px] border p-1.5"
                      style="border-color: var(--v2-bord-carte); background: var(--v2-blanc); box-shadow: var(--v2-ombre-modale)"
                    >
                      <div class="flex items-center gap-3 px-3 py-3">
                        <span
                          class="grid size-11 shrink-0 place-items-center rounded-full text-sm font-extrabold"
                          style="background: var(--v2-foret); color: var(--v2-citron)"
                          >{{ initials() }}</span
                        >
                        <div class="min-w-0">
                          <div class="truncate font-bold">{{ session()!.name }}</div>
                          <div class="truncate text-xs font-medium" style="color: var(--v2-gris-texte)">
                            {{ store.roleLabel(session()!.role) }} · {{ scopeLabel() }}
                          </div>
                        </div>
                      </div>
                      <div class="my-1 h-px" style="background: var(--v2-separateur)"></div>
                      <button type="button" role="menuitem" class="menu-item" style="color: var(--v2-erreur-fg)" (click)="logout()">
                        <lucide-angular [img]="icons.logOut" [size]="18" /> {{ t()("shell.logout") }}
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </header>
          <main class="mx-auto w-full max-w-[1400px] flex-1 px-4 py-7 md:px-10 md:py-10">
            <router-outlet />
          </main>
        </div>
      </div>
      <app-command-palette />
      <app-toast-host />
      <!-- Snackbar de la charte V2, partagée par toutes les pages connectées (SnackbarService). -->
      <ui-snackbar class="charte-v2-snack" />
    }

    <ng-template #sidebarContent let-rail="rail">
      <nav class="flex h-full flex-col" style="background: var(--v2-foret); color: var(--v2-blanc)">
        <!-- Marque + bouton replier/déplier -->
        <div
          class="flex shrink-0 items-center pb-5 pt-5"
          [class.justify-between]="!rail"
          [class.flex-col]="rail"
          [class.gap-3]="rail"
          [class.px-5]="!rail"
          [class.px-2]="rail"
        >
          <a [routerLink]="['/dashboard', session()!.role]" class="rounded-[10px]" [attr.aria-label]="brand.name">
            <ui-brand-logo variant="inverse" [size]="rail ? 34 : 40" [wordmark]="!rail" />
          </a>
          <button
            type="button"
            class="icon-btn rail-toggle hidden lg:grid"
            [attr.aria-label]="rail ? t()('shell.sidebar.expand') : t()('shell.sidebar.collapse')"
            [attr.title]="rail ? t()('shell.sidebar.expand') : t()('shell.sidebar.collapse')"
            [attr.aria-expanded]="!rail"
            (click)="toggleCollapsed()"
          >
            <ui-icon [name]="rail ? 'left_panel_open' : 'left_panel_close'" [size]="22" />
          </button>
        </div>

        @if (session(); as currentSession) {
          <app-sidebar-nav [session]="currentSession" [path]="path()" [badge]="badgeFn" [collapsed]="rail" />
        }

        <!-- Porteur : CRADESC -->
        <div class="mt-auto shrink-0 border-t p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]" style="border-color: var(--v2-foret-trait)">
          <a
            [href]="cradesc.url"
            target="_blank"
            rel="noopener noreferrer"
            class="cradesc-card flex items-center gap-3 rounded-[16px] p-2"
            [class.justify-center]="rail"
            style="background: var(--v2-blanc); color: var(--v2-encre)"
            [attr.aria-label]="t()('auth.cradesc.visit')"
            [attr.title]="rail ? cradesc.acronym : null"
          >
            <img [src]="cradesc.emblem" alt="" width="48" height="42" class="h-9 w-auto shrink-0" />
            @if (!rail) {
              <span class="min-w-0 leading-tight">
                <span
                  class="block text-[10px] font-bold uppercase tracking-[0.08em]"
                  style="font-family: var(--v2-font-mono); color: var(--v2-foret-clair)"
                  >{{ t()("auth.cradesc.carriedBy") }}</span
                >
                <span class="block text-[15px] font-extrabold" style="color: var(--v2-terre)">{{ cradesc.acronym }}</span>
                <span class="block truncate text-[11px] font-semibold" style="color: var(--v2-foret-clair)">{{ cradesc.urlLabel }}</span>
              </span>
            }
          </a>
        </div>
      </nav>
    </ng-template>
  `,
})
export class AppLayoutComponent {

  private readonly palette = viewChild(CommandPaletteComponent);

  protected readonly store = inject(StoreService);
  protected readonly localeService = inject(LocaleService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly t = this.localeService.t;
  protected readonly brand = BRAND;
  protected readonly cradesc = CRADESC;
  protected readonly skeletonCards = [0, 1, 2, 3, 4, 5];
  protected readonly icons = {
    menu: Menu,
    search: Search,
    chevronDown: ChevronDown,
    logOut: LogOut,
    loader: Loader2,
    scope: MapPinned,
  };

  protected readonly ready = signal(false);
  protected readonly loggingOut = signal(false);
  protected readonly session = computed(() => this.store.state().session);
  protected readonly path = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly modKey = signal<"⌘" | "Ctrl">("Ctrl");

  protected readonly mobileOpen = signal(false);
  /** Menu latéral replié en rail d'icônes (grand écran), mémorisé dans le navigateur. */
  protected readonly collapsed = signal(false);
  protected readonly accountMenuOpen = signal(false);
  /** Panneau ouvert dans la barre du haut (notifications, aide, paramètres). */
  protected readonly topMenu = signal<"notif" | "help" | "settings" | null>(null);
  protected readonly locales = ["fr", "wo"] as const;
  private readonly readIds = signal<ReadonlySet<string>>(new Set());

  /**
   * Notifications calculées sur les données réelles du store (filtrées par droits et périmètre).
   * Seule la sauvegarde nocturne est simulée, en attendant le branchement de l'API.
   */
  protected readonly notifications = computed(() => {
    const s = this.store.state();
    const session = s.session;
    if (!session) return [];
    const t = this.t();
    const list: { id: string; icon: IconName; bg: string; fg: string; title: string; body: string; to: string }[] = [];

    if (can(session, "dossier.review") || can(session, "dossier.create")) {
      const pending = scopedDossiers(s.dossiers, session)
        .filter((d) => d.status === "soumis" || d.status === "en examen")
        .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
      if (pending.length) {
        const days = Math.max(0, Math.floor((Date.now() - new Date(pending[0]!.updatedAt).getTime()) / 86_400_000));
        list.push({
          id: `dossiers-${pending.length}`,
          icon: "folder_shared",
          bg: "var(--v2-info-bg)",
          fg: "var(--v2-info-fg)",
          title: t("shell.notif.dossiers", { count: pending.length }),
          body: t("shell.notif.dossiersBody", { days }),
          to: "/dashboard/dossiers",
        });
      }
    }
    if (can(session, "alert.manage") || can(session, "quality.review")) {
      const open = s.alerts.filter((a) => a.status === "ouvert");
      if (open.length) {
        const critical = open.filter((a) => a.severity === "élevée").length;
        list.push({
          id: `alertes-${open.length}`,
          icon: "warning",
          bg: critical ? "var(--v2-erreur-bg)" : "var(--v2-attente-bg)",
          fg: critical ? "var(--v2-erreur-fg)" : "var(--v2-attente-fg)",
          title: t("shell.notif.alerts", { count: this.localeService.formatNumber(open.length) }),
          body: t("shell.notif.alertsBody", { critical }),
          to: "/dashboard/qualite/alertes",
        });
      }
    }
    if (can(session, "meeting.read")) {
      const now = new Date().toISOString();
      const next = s.meetings
        .filter((m) => m.status === "planifiée" && m.date >= now)
        .sort((a, b) => a.date.localeCompare(b.date))[0];
      if (next) {
        list.push({
          id: `reunion-${next.id}`,
          icon: "event_upcoming",
          bg: "var(--v2-sauge)",
          fg: "var(--v2-foret)",
          title: t("shell.notif.meeting", { title: next.title }),
          body: t("shell.notif.meetingBody", { date: fmtDateTime(next.date), place: next.place }),
          to: `/dashboard/reunions/${next.id}`,
        });
      }
    }
    if (can(session, "data.backup")) {
      list.push({
        id: "sauvegarde-nuit",
        icon: "task_alt",
        bg: "var(--v2-succes-bg)",
        fg: "var(--v2-succes-fg)",
        title: t("shell.notif.backup"),
        body: t("shell.notif.backupBody"),
        to: "/dashboard/donnees",
      });
    }
    return list;
  });

  protected readonly unreadCount = computed(
    () => this.notifications().filter((n) => !this.readIds().has(n.id)).length,
  );

  protected isRead(id: string): boolean {
    return this.readIds().has(id);
  }

  protected markAllRead(): void {
    this.readIds.set(new Set(this.notifications().map((n) => n.id)));
  }

  protected canSee(permission: Permission): boolean {
    return can(this.session(), permission);
  }

  protected toggleTop(menu: "notif" | "help" | "settings", event: Event): void {
    event.stopPropagation();
    this.accountMenuOpen.set(false);
    this.topMenu.update((current) => (current === menu ? null : menu));
  }

  protected readonly scopeLabel = computed(() => {
    const session = this.session();
    if (!session) return "";
    if (session.scope.kind === "consolidé") return this.t()("shell.scope.consolidated");
    return scoopNamesOf(session, this.store.state().scoops);
  });

  protected readonly initials = computed(() => {
    const session = this.session();
    if (!session) return "";
    return session.name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("");
  });

  protected readonly badgeFn = (to: string): number => {
    const session = this.session();
    if (!session) return 0;
    if (to !== "/dashboard/qualite") return 0;
    const q = qualityCounts(this.store.state());
    return (
      (can(session, "quality.review") ? q.doublons : 0) +
      (can(session, "alert.manage") ? q.alertes : 0) +
      (can(session, "correction.manage") ? q.corrections : 0)
    );
  };

  constructor() {
    afterNextRender(() => {
      if (typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent)) {
        this.modKey.set("⌘");
      }
      try {
        this.collapsed.set(window.localStorage.getItem(SIDEBAR_KEY) === "1");
      } catch {
        /* stockage indisponible : menu déplié par défaut */
      }
      void ensureSessionHydrated().finally(() => this.ready.set(true));

      const onDocClick = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (!target.closest("[data-account-menu]")) this.accountMenuOpen.set(false);
        if (!target.closest("[data-top-menu]")) this.topMenu.set(null);
      };
      document.addEventListener("click", onDocClick);
      this.destroyRef.onDestroy(() => document.removeEventListener("click", onDocClick));
    });

    // Redirect to /login if there's no session (mirrors the React useEffect).
    effect(() => {
      if (this.ready() && !this.session()) void this.router.navigateByUrl("/login");
    });

    // Ferme le menu mobile au changement de route (équivalent React `useEffect` sur `path`).
    effect(() => {
      this.path();
      this.mobileOpen.set(false);
      this.accountMenuOpen.set(false);
      this.topMenu.set(null);
    });

    // Session expiry watcher (every 15s), logs out silently — no toast lib ported yet.
    const interval = setInterval(() => {
      const session = this.session();
      if (session && Date.now() > session.expiresAt) {
        this.logout();
      }
    }, 15000);
    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  protected toggleCollapsed(): void {
    const next = !this.collapsed();
    this.collapsed.set(next);
    try {
      window.localStorage.setItem(SIDEBAR_KEY, next ? "1" : "0");
    } catch {
      /* stockage indisponible : l'état n'est pas mémorisé */
    }
  }

  protected toggleAccountMenu(event: Event): void {
    event.stopPropagation();
    this.topMenu.set(null);
    this.accountMenuOpen.update((open) => !open);
  }

  protected logout(): void {
    if (this.loggingOut()) return;
    this.accountMenuOpen.set(false);
    this.loggingOut.set(true);
    window.setTimeout(() => {
      logoutAuthSideEffects();
      this.store.actions.logout();
      void this.router.navigateByUrl("/login").finally(() => this.loggingOut.set(false));
    }, 450);
  }

  protected openPalette(): void {
    this.palette()?.show();
  }
}

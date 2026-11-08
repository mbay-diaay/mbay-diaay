import {
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { filter, map } from "rxjs";
import { LucideAngularModule, LogOut, Menu, Search, ChevronDown, ShieldAlert } from "lucide-angular";

import { hydrateSessionFromApi } from "@/lib/api/session";
import { DEMO_MODE } from "@/lib/auth/config";
import { logoutAuthSideEffects } from "@/lib/auth";
import type { Permission, RoleId } from "@/lib/permissions";
import { ROLE_LABEL } from "@/lib/permissions";
import { qualityCounts } from "@/lib/quality-nav";
import { scoopNamesOf } from "@/lib/scope";
import { BRAND } from "@/config/brand";
import { can } from "@/lib/store";
import { FILTERED_PATHS } from "@/lib/nav";
import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { SidebarNavComponent } from "./sidebar-nav.component";
import { GlobalFiltersComponent } from "./global-filters.component";
import { CommandPaletteComponent } from "./command-palette.component";
import { ToastHostComponent } from "./toast-host.component";
import { UiModalA11yDirective } from "./ui/modal-a11y.directive";

/** Une seule hydratation par chargement de page (plusieurs `<app-shell>` possibles). */
let sessionHydration: Promise<void> | null = null;
function ensureSessionHydrated(): Promise<void> {
  if (!sessionHydration) {
    sessionHydration = hydrateSessionFromApi().then(() => undefined);
  }
  return sessionHydration;
}

/**
 * Angular port of src/components/app/AppShell.tsx. Each ported page wraps
 * its content in `<app-shell [perm]="..." [area]="...">...</app-shell>` —
 * same composition shape as the React `<AppShell perm={} area={}>{children}</AppShell>`,
 * just via Angular content projection instead of a `children` prop.
 *
 * Non parité : toast d’expiration de session (voir React AppShell + sonner).
 */
@Component({
  selector: "app-shell",
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    SidebarNavComponent,
    GlobalFiltersComponent,
    CommandPaletteComponent,
    ToastHostComponent,
    UiModalA11yDirective,
  ],
  template: `
    @if (!ready()) {
      <div class="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        {{ t()("shell.loading") }}
      </div>
    } @else if (!session()) {
      <!-- redirect effect below handles navigation; render nothing meanwhile -->
    } @else {
      <div class="flex min-h-screen">
        <aside class="sticky top-0 z-30 hidden h-svh w-64 shrink-0 self-start lg:block">
          <ng-container [ngTemplateOutlet]="sidebarContent" />
        </aside>
        @if (mobileOpen()) {
          <div class="fixed inset-0 z-50 flex lg:hidden">
            <div class="absolute inset-0 bg-black/40" (click)="mobileOpen.set(false)"></div>
            <div
              class="relative flex h-full w-72 max-w-[85vw] flex-col bg-sidebar text-sidebar-foreground shadow-lg"
              role="dialog"
              aria-modal="true"
              [attr.aria-label]="t()('shell.openMenu')"
              uiModalA11y
              (dismiss)="mobileOpen.set(false)"
            >
              <ng-container [ngTemplateOutlet]="sidebarContent" />
            </div>
          </div>
        }

        <div class="flex min-w-0 flex-1 flex-col">
          @if (demoMode) {
            <div class="bg-warning-bg px-4 py-1.5 text-center text-xs font-medium text-warning-fg md:px-8">
              <span class="sm:hidden">{{ t()("shell.demoBanner.short") }}</span>
              <span class="hidden sm:inline">{{ t()("shell.demoBanner.long") }}</span>
            </div>
          }
          <header class="sticky top-0 z-50 border-b bg-card/90 backdrop-blur">
            <div class="flex h-14 items-center gap-2 px-2 sm:gap-3 sm:px-4 md:h-16 md:px-8">
              <button
                type="button"
                class="grid size-10 shrink-0 place-items-center rounded-md hover:bg-muted pointer-coarse:size-touch lg:hidden"
                (click)="mobileOpen.set(true)"
                [attr.aria-label]="t()('shell.openMenu')"
              >
                <lucide-angular [img]="icons.menu" class="size-5" />
              </button>
              <div class="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                <span class="font-medium text-foreground">{{ scopeLabel() }}</span>
                @if (demoMode) {
                  <span class="hidden sm:inline"> · {{ t()("shell.demoData") }}</span>
                }
              </div>
              @if (filtered()) {
                <div class="hidden shrink-0 xl:block">
                  <app-global-filters />
                </div>
              }
              <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  (click)="openPalette()"
                  [attr.aria-label]="t()('shell.searchAria')"
                  class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground pointer-coarse:h-touch pointer-coarse:w-touch sm:inline-flex xl:h-9 xl:w-auto xl:gap-2 xl:border xl:bg-background xl:pl-3 xl:pr-1.5 xl:text-sm"
                >
                  <lucide-angular [img]="icons.search" class="size-4 shrink-0" aria-hidden />
                  <span class="hidden truncate xl:inline">{{ t()("shell.searchAria") }}</span>
                  <kbd class="hidden shrink-0 rounded border bg-muted px-1.5 py-0.5 text-[11px] xl:inline"
                    >{{ modKey() }} K</kbd
                  >
                </button>
                <div class="relative" data-account-menu>
                  <button
                    type="button"
                    class="flex max-w-[11rem] shrink-0 items-center gap-2 rounded-md p-1 text-left hover:bg-muted sm:max-w-[13rem] xl:max-w-[16rem] xl:px-2"
                    [attr.aria-label]="t()('shell.accountAria')"
                    [attr.aria-expanded]="accountMenuOpen()"
                    aria-haspopup="menu"
                    (click)="toggleAccountMenu($event)"
                  >
                    <span
                      class="grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary pointer-coarse:size-10"
                    >
                      {{ initials() }}
                    </span>
                    <span class="hidden min-w-0 leading-tight xl:block">
                      <span class="block truncate text-sm font-semibold">{{ session()!.name }}</span>
                      <span class="block truncate text-xs text-muted-foreground">{{
                        localeService.tEnum("role", session()!.role)
                      }}</span>
                    </span>
                    <lucide-angular [img]="icons.chevronDown" class="hidden size-4 shrink-0 text-muted-foreground xl:block" />
                  </button>
                  @if (accountMenuOpen()) {
                    <div
                      role="menu"
                      class="absolute right-0 top-full z-[60] mt-1 w-72 rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
                    >
                      <div class="px-2 py-1.5">
                        <div class="font-semibold">{{ session()!.name }}</div>
                        <div class="text-xs text-muted-foreground">
                          {{ localeService.tEnum("role", session()!.role) }} · {{ scopeLabel() }}
                        </div>
                      </div>
                      <div class="my-1 border-t"></div>
                      @if (demoMode) {
                        <div class="px-2 py-1 text-xs font-medium text-muted-foreground">
                          {{ t()("shell.demoProfile") }}
                        </div>
                        <select
                          class="mx-2 mb-1 h-9 w-[calc(100%-1rem)] rounded-md border bg-transparent px-2 text-sm"
                          [value]="session()!.role"
                          (change)="switchRole($any($event.target).value)"
                        >
                          @for (role of roles; track role) {
                            <option [value]="role">{{ localeService.tEnum("role", role) }}</option>
                          }
                        </select>
                        <div class="my-1 border-t"></div>
                      }
                      <button
                        type="button"
                        role="menuitem"
                        class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-muted"
                        (click)="logout()"
                      >
                        <lucide-angular [img]="icons.logOut" class="size-4" /> {{ t()("shell.logout") }}
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
            @if (filtered()) {
              <div class="border-t px-3 py-2 sm:px-4 md:px-8 xl:hidden">
                <app-global-filters />
              </div>
            }
          </header>
          <main class="mx-auto w-full max-w-[1400px] flex-1 px-4 py-7 md:px-8 md:py-10">
            @if (allowed()) {
              <ng-content />
            } @else {
              <div class="surface mx-auto mt-16 max-w-lg p-8 text-center">
                <div class="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-warning-bg text-warning-fg">
                  <lucide-angular [img]="icons.shieldAlert" class="size-6" />
                </div>
                <h2 class="text-lg font-semibold">{{ t()("shell.forbidden.title") }}</h2>
                <p class="mt-2 text-muted-foreground">{{ t()("shell.forbidden.body", { what: area() }) }}</p>
                <a routerLink="/" class="mt-6 inline-block font-semibold text-primary underline-offset-4 hover:underline">
                  {{ t()("shell.forbidden.back") }}
                </a>
              </div>
            }
          </main>
        </div>
      </div>
      <app-command-palette />
      <app-toast-host />
    }

    <ng-template #sidebarContent>
      <nav class="flex h-full flex-col bg-sidebar text-sidebar-foreground">
        <div class="flex items-center gap-3 px-5 py-5">
          <div class="grid size-9 place-items-center rounded-md bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
            {{ brand.monogram }}
          </div>
          <div class="leading-tight">
            <div class="font-semibold text-sidebar-accent-foreground">{{ brand.name }}</div>
            <div class="text-xs opacity-70">{{ brand.tagline }}</div>
          </div>
        </div>
        @if (session(); as s) {
          <app-sidebar-nav [session]="s" [path]="path()" [badge]="badgeFn" />
        }
        <div class="border-t border-sidebar-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-xs opacity-70">
          {{ brand.partners }}
        </div>
      </nav>
    </ng-template>
  `,
})
export class AppShellComponent {
  readonly perm = input.required<Permission | readonly Permission[]>();
  readonly area = input.required<string>();

  private readonly palette = viewChild(CommandPaletteComponent);

  protected readonly store = inject(StoreService);
  protected readonly localeService = inject(LocaleService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly t = this.localeService.t;
  protected readonly brand = BRAND;
  protected readonly demoMode = DEMO_MODE;
  protected readonly roles = Object.keys(ROLE_LABEL) as RoleId[];
  protected readonly icons = {
    menu: Menu,
    search: Search,
    chevronDown: ChevronDown,
    logOut: LogOut,
    shieldAlert: ShieldAlert,
  };

  protected readonly ready = signal(false);
  protected readonly session = computed(() => this.store.state().session);
  protected readonly path = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** Chemin sans query ni hash — pour `FILTERED_PATHS`. */
  protected readonly pathOnly = computed(() => {
    const u = this.path();
    const q = u.indexOf("?");
    const h = u.indexOf("#");
    const end = q >= 0 && h >= 0 ? Math.min(q, h) : q >= 0 ? q : h >= 0 ? h : u.length;
    return u.slice(0, end);
  });

  protected readonly filtered = computed(() => FILTERED_PATHS.includes(this.pathOnly()));

  protected readonly modKey = signal<"⌘" | "Ctrl">("Ctrl");

  protected readonly mobileOpen = signal(false);
  protected readonly accountMenuOpen = signal(false);

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

  protected readonly allowed = computed(() => {
    const session = this.session();
    if (!session) return false;
    const perms = Array.isArray(this.perm()) ? (this.perm() as Permission[]) : [this.perm() as Permission];
    return perms.some((p) => session.permissions.includes(p));
  });

  protected readonly badgeFn = (to: string): number => {
    const session = this.session();
    if (!session) return 0;
    if (to !== "/qualite") return 0;
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
      void ensureSessionHydrated().finally(() => this.ready.set(true));

      const onDocClick = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (!target.closest("[data-account-menu]")) this.accountMenuOpen.set(false);
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

  protected toggleAccountMenu(event: Event): void {
    event.stopPropagation();
    this.accountMenuOpen.update((open) => !open);
  }

  protected switchRole(role: RoleId): void {
    this.store.actions.switchRole(role);
    this.accountMenuOpen.set(false);
  }

  protected logout(): void {
    logoutAuthSideEffects();
    this.store.actions.logout();
    this.accountMenuOpen.set(false);
    void this.router.navigateByUrl("/login");
  }

  protected openPalette(): void {
    this.palette()?.show();
  }
}

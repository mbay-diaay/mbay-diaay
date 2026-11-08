import { Component, computed, inject, input, signal } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ChevronDown as chevronDownIcon, LucideAngularModule } from "lucide-angular";

import { NAV, navAllowed, type NavGroup } from "@/lib/nav";
import type { Session } from "@/lib/store";
import { LocaleService } from "./locale.service";

const STORAGE_KEY = "mbd.nav";

function readOpen(): Record<string, boolean> {
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
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* stockage indisponible : le menu fonctionne, sans mémoire */
  }
}

/**
 * Angular port of src/components/app/SidebarNav.tsx. `NAV`/`navAllowed` are
 * the same ported data/logic from src/lib/nav.ts — only the collapsible-group
 * state (useState/useEffect → signal) and routing (TanStack Link → RouterLink)
 * are Angular-specific.
 */
@Component({
  selector: "app-sidebar-nav",
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  host: {
    class: "flex min-h-0 flex-1 flex-col",
  },
  template: `
    <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-4">
      @for (g of groups(); track g.group) {
        <div class="mt-3">
          @if (!g.flat) {
            <button
              type="button"
              [attr.aria-expanded]="isOpen(g)"
              [disabled]="hasActive(g)"
              (click)="toggle(g)"
              class="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[11px] font-semibold uppercase tracking-wider hover:bg-sidebar-accent disabled:cursor-default disabled:hover:bg-transparent pointer-coarse:py-2.5"
            >
              <span class="flex-1 opacity-80 group-hover:opacity-100">{{ t()(g.groupKey) }}</span>
              @if (!isOpen(g) && pending(g) > 0) {
                <span
                  class="rounded-full bg-sidebar-primary px-1.5 text-[11px] font-semibold normal-case text-sidebar-primary-foreground tabular"
                >
                  {{ pending(g) }}
                </span>
              }
              <lucide-angular
                [img]="chevronDown"
                class="size-3.5 opacity-80 transition-transform"
                [class.-rotate-90]="!isOpen(g)"
              />
            </button>
          }
          <div [hidden]="!isOpen(g)">
            @for (item of allowedItems(g); track item.to) {
              <a
                [routerLink]="item.to"
                routerLinkActive="bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                [routerLinkActiveOptions]="{ exact: item.to === '/' }"
                class="flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground pointer-coarse:py-3"
              >
                <lucide-angular [img]="item.icon" class="size-4" />
                <span class="flex-1">{{ t()(item.labelKey) }}</span>
                @if (badge()(item.to) > 0) {
                  <span
                    class="rounded-full bg-sidebar-primary px-1.5 text-[11px] font-semibold text-sidebar-primary-foreground tabular"
                  >
                    {{ badge()(item.to) }}
                  </span>
                }
              </a>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class SidebarNavComponent {
  readonly session = input.required<Session>();
  readonly path = input.required<string>();
  /** Nombre d'éléments à traiter d'une entrée (0 : rien à afficher). */
  readonly badge = input.required<(to: string) => number>();

  protected readonly t = inject(LocaleService).t;
  protected readonly chevronDown = chevronDownIcon;

  private readonly stored = signal<Record<string, boolean>>(readOpen());
  protected readonly groups = computed(() => NAV);

  protected allowedItems(g: NavGroup) {
    const session = this.session();
    // Dépôt M1 : les entrées « à venir » (M2–M5) restent sur la page modules, pas dans le menu.
    return g.items.filter((i) => !i.soon && navAllowed(session, i));
  }

  protected isActive(to: string): boolean {
    const path = this.path();
    return to === "/" ? path === "/" : path === to || path.startsWith(`${to}/`);
  }

  protected hasActive(g: NavGroup): boolean {
    return this.allowedItems(g).some((i) => this.isActive(i.to));
  }

  protected isOpen(g: NavGroup): boolean {
    return g.flat || this.hasActive(g) || (this.stored()[g.group] ?? g.defaultOpen ?? false);
  }

  protected pending(g: NavGroup): number {
    const badge = this.badge();
    return this.allowedItems(g).reduce((sum, i) => sum + badge(i.to), 0);
  }

  protected toggle(g: NavGroup): void {
    const current = this.isOpen(g);
    const next = { ...this.stored(), [g.group]: !current };
    this.stored.set(next);
    writeOpen(next);
  }
}

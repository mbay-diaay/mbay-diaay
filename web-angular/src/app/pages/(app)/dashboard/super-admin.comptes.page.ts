import { Component, computed, inject, signal } from "@angular/core";

import { isApiMode } from "@/lib/api/config";
import { fetchAllPages } from "@/lib/api/pagination";
import { listRolePermissions } from "@/lib/api/roles";
import { listUsers } from "@/lib/api/users";
import { nf } from "@/lib/format";
import { LOCKED_ROLE, type RoleId } from "@/lib/permissions";
import type { AppUser } from "@/lib/store";
import { AccountActionsComponent } from "@shared/account-actions.component";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { createPager } from "@shared/pager";
import { StoreService } from "@shared/store.service";
import { UserRoleDialogComponent } from "@shared/user-role-dialog.component";
import {
  IconComponent,
  initialsOf,
  PaginationComponent,
  SnackbarService,
  TONE,
  V2_PAGE_STYLES,
} from "@shared/ui";

const ALL = "tous";

/**
 * Super administration › Attribution des rôles (charte V2) : le rôle de chaque compte, administrateurs et super
 * administrateurs compris, avec un filtre par rôle. Réservé au droit `role.configure`.
 */
@Component({
  selector: "app-super-admin-comptes-page",
  imports: [AccountActionsComponent, AppShellComponent, IconComponent, PaginationComponent, UserRoleDialogComponent],
  styles: [
    V2_PAGE_STYLES,
    `
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border-radius: 999px;
        border: 1.5px solid var(--v2-gris-trait);
        background: var(--v2-blanc);
        padding: 7px 12px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
      }
      .chip:hover {
        border-color: var(--v2-foret);
      }
      .chip.on {
        border-color: var(--v2-foret);
        background: var(--v2-foret);
        color: var(--v2-blanc);
      }
      .chip .n {
        border-radius: 999px;
        background: var(--v2-creme);
        padding: 1px 8px;
        color: var(--v2-foret);
      }
      .chip .n.zero {
        color: var(--v2-gris-texte);
      }
      .chip:focus-visible {
        outline: 2px solid var(--v2-foret);
        outline-offset: 2px;
      }
    `,
  ],
  template: `
    <app-shell perm="role.configure" [area]="t()('superadmin.accounts.title')">
      <header class="rise">
        <p class="mono inline-flex items-center gap-1.5" style="color: var(--v2-gris-texte)"><ui-icon name="lock" [size]="14" />{{ t()("superadmin.eyebrow") }}</p>
        <h1 class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">{{ t()("superadmin.accounts.title") }}</h1>
        <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("superadmin.accounts.description") }}</p>
      </header>

      <section class="card mt-6 p-4">
        <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("superadmin.accounts.byRole") }}</p>
        <div class="chips mt-3" role="radiogroup" [attr.aria-label]="t()('superadmin.accounts.byRole')">
          <button type="button" role="radio" class="chip" [class.on]="roleFilter() === all" [attr.aria-checked]="roleFilter() === all" (click)="roleFilter.set(all)">
            {{ t()("utilisateurs.v2.allRoles") }}<span class="n">{{ nf.format(users().length) }}</span>
          </button>
          @for (role of store.allRoles(); track role) {
            <button type="button" role="radio" class="chip" [class.on]="roleFilter() === role" [attr.aria-checked]="roleFilter() === role" (click)="roleFilter.set(role)">
              {{ store.roleLabel(role) }}<span class="n" [class.zero]="!countOf(role)">{{ nf.format(countOf(role)) }}</span>
            </button>
          }
        </div>
      </section>

      <div class="toolbar card mt-4">
        <label class="search">
          <ui-icon name="search" [size]="20" />
          <input type="search" [placeholder]="t()('utilisateurs.v2.search')" [attr.aria-label]="t()('utilisateurs.v2.search')" [value]="query()" (input)="query.set($any($event.target).value)" />
        </label>
      </div>

      <section class="card mt-4 overflow-hidden">
        @if (shown().length) {
          <div class="overflow-x-auto">
            <table class="tbl min-w-[760px]">
              <thead>
                <tr>
                  <th>{{ t()("utilisateurs.col.name") }}</th>
                  <th>{{ t()("utilisateurs.col.role") }}</th>
                  <th>{{ t()("utilisateurs.col.scope") }}</th>
                  <th>{{ t()("utilisateurs.col.state") }}</th>
                  <th class="text-right">{{ t()("utilisateurs.v2.col.actions") }}</th>
                </tr>
              </thead>
              <tbody>
                @for (user of pager.items(); track user.id) {
                  <tr class="row-link" (click)="openRole(user)">
                    <td>
                      <span class="flex items-center gap-3">
                        <span class="avatar" [style.background]="tone(user.role).bg" [style.color]="tone(user.role).fg">{{ initials(user.name) }}</span>
                        <span class="min-w-0">
                          <span class="block truncate font-bold">{{ user.name }}</span>
                          <span class="sub block truncate">{{ user.email }}</span>
                        </span>
                      </span>
                    </td>
                    <td>
                      <span class="badge" [style.background]="tone(user.role).bg" [style.color]="tone(user.role).fg">
                        @if (user.role === lockedRole) {
                          <ui-icon name="lock" [size]="14" />
                        }
                        {{ store.roleLabel(user.role) }}
                      </span>
                    </td>
                    <td class="max-w-56 truncate font-medium">{{ scopeLabel(user) }}</td>
                    <td>
                      <span class="badge" [style.background]="user.active ? toneSuccess.bg : toneNeutral.bg" [style.color]="user.active ? toneSuccess.fg : toneNeutral.fg">{{ user.active ? t()("utilisateurs.state.active") : t()("utilisateurs.state.inactive") }}</span>
                    </td>
                    <td (click)="$event.stopPropagation()">
                      <span class="flex justify-end gap-2">
                        <button type="button" class="act" [title]="t()('utilisateurs.v2.changeRole')" [attr.aria-label]="t()('utilisateurs.v2.changeRoleFor', { name: user.name })" (click)="openRole(user)"><ui-icon name="admin_panel_settings" [size]="18" /></button>
                        <app-account-actions [user]="user" />
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <ui-pagination class="px-5 pb-5" [pager]="pager" />
        } @else {
          <p class="sub p-8 text-center">{{ t()("utilisateurs.v2.empty") }}</p>
        }
      </section>

      <app-user-role-dialog [(open)]="roleOpen" [user]="roleUser()" />
    </app-shell>
  `,
})
export default class SuperAdminComptesPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  private readonly snackbar = inject(SnackbarService);

  protected readonly nf = nf;
  protected readonly all = ALL;
  protected readonly lockedRole = LOCKED_ROLE;
  protected readonly initials = initialsOf;
  protected readonly toneSuccess = TONE.succes;
  protected readonly toneNeutral = TONE.neutre;

  protected readonly roleFilter = signal<string>(ALL);
  protected readonly query = signal("");
  protected readonly roleOpen = signal(false);
  private readonly roleUserId = signal<string | null>(null);

  constructor() {
    if (isApiMode()) void this.loadFromApi();
  }

  private async loadFromApi(): Promise<void> {
    try {
      const [users, roles] = await Promise.all([fetchAllPages(listUsers), listRolePermissions()]);
      this.store.actions.replaceUsersFromApi(users);
      this.store.actions.replaceRolePermissionsFromApi(
        Object.fromEntries(roles.items.map((entry) => [entry.role, entry.permissions])),
        roles.customRoles,
      );
    } catch {
      this.snackbar.error(this.locale.tNow("utilisateurs.v2.loadError"));
    }
  }

  protected readonly users = computed(() => this.store.state().users);

  protected readonly shown = computed(() => {
    const needle = this.query().trim().toLowerCase();
    const role = this.roleFilter();
    return this.users().filter(
      (user) =>
        (role === ALL || user.role === role) &&
        (!needle || `${user.name} ${user.email}`.toLowerCase().includes(needle)),
    );
  });
  protected readonly pager = createPager(() => this.shown());

  protected readonly roleUser = computed(
    () => this.users().find((user) => user.id === this.roleUserId()) ?? null,
  );

  protected countOf(role: RoleId): number {
    return this.users().filter((user) => user.role === role).length;
  }

  protected tone(role: RoleId) {
    if (role === LOCKED_ROLE) return { bg: "var(--v2-citron)", fg: "var(--v2-foret)" };
    return this.store.roleScoped(role) ? TONE.culture : TONE.info;
  }

  protected scopeLabel(user: AppUser): string {
    const ids = user.scoopIds ?? (user.scoopId ? [user.scoopId] : []);
    if (!ids.length) return this.t()("utilisateurs.scopeAll");
    return ids
      .map((id) => this.store.state().scoops.find((scoop) => scoop.id === id)?.name ?? id)
      .join(", ");
  }

  protected openRole(user: AppUser): void {
    this.roleUserId.set(user.id);
    this.roleOpen.set(true);
  }
}

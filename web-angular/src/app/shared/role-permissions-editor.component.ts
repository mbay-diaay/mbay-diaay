import { Component, computed, effect, inject, input, model, output, signal, untracked } from "@angular/core";

import type { MessageKey } from "@/lib/i18n";
import {
  BUILT_IN_ROLES,
  DEFAULT_ROLE_PERMISSIONS,
  isBuiltInRole,
  LOCKED_ROLE,
  PERMISSION_GROUPS,
  RESERVED_PERMISSIONS,
  type Permission,
  type RoleId,
  type RolePermissionsMatrix,
} from "@/lib/permissions";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import { RoleAccessPreviewComponent } from "./role-access-preview.component";
import { IconComponent, V2_PAGE_STYLES } from "@shared/ui";

/**
 * Éditeur de la matrice des rôles (charte V2) : liste des rôles à gauche, droits par famille à droite.
 * Présentation seule : la page enregistre (store en démonstration, API sinon) via `save` et `reset`.
 *
 * `<app-role-permissions-editor [matrix]="matrix()" [editable]="store.can('role.configure')"
 *    (save)="onSave($event)" (reset)="onReset($event)" />`
 */
@Component({
  selector: "app-role-permissions-editor",
  imports: [IconComponent, RoleAccessPreviewComponent],
  host: { class: "block" },
  styles: [
    V2_PAGE_STYLES,
    `
      .layout {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 1024px) {
        .layout {
          grid-template-columns: 300px minmax(0, 1fr);
          align-items: start;
        }
        .roles {
          position: sticky;
          top: 88px;
        }
      }
      .role-btn {
        display: flex;
        width: 100%;
        align-items: center;
        gap: 12px;
        border-radius: 16px;
        padding: 12px 14px;
        text-align: left;
        cursor: pointer;
        transition: background-color 0.15s ease;
      }
      .role-btn:hover {
        background: var(--v2-creme);
      }
      .role-btn.on {
        background: var(--v2-foret);
        color: var(--v2-blanc);
      }
      .role-btn.on .sub {
        color: color-mix(in oklab, var(--v2-blanc) 72%, transparent);
      }
      .role-btn:focus-visible {
        outline: 2px solid var(--v2-foret);
        outline-offset: 2px;
      }
      .role-ico {
        display: grid;
        height: 38px;
        width: 38px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 12px;
        background: var(--v2-sauge);
        color: var(--v2-foret);
      }
      .role-btn.on .role-ico {
        background: var(--v2-citron);
      }
      .group-head {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        border-bottom: 1px solid var(--v2-separateur);
        padding: 14px 18px;
      }
      .perm-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      }
      .perm {
        display: flex;
        min-height: 52px;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid var(--v2-separateur);
        padding: 10px 18px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .perm:hover {
        background: var(--v2-creme);
      }
      .perm.on {
        background: color-mix(in oklab, var(--v2-sauge) 60%, transparent);
      }
      .perm.locked {
        cursor: not-allowed;
        opacity: 0.6;
      }
      .perm input {
        height: 20px;
        width: 20px;
        flex-shrink: 0;
        accent-color: var(--v2-foret);
        cursor: inherit;
      }
      .perm .code {
        display: block;
        font-family: var(--v2-font-mono);
        font-size: 11px;
        font-weight: 600;
        color: var(--v2-gris-texte);
      }
      .bulk {
        border-radius: 10px;
        padding: 6px 10px;
        font-size: 13px;
        font-weight: 800;
        color: var(--v2-foret);
        cursor: pointer;
      }
      .bulk:hover {
        background: var(--v2-sauge);
      }
      .discard {
        border: 1.5px solid color-mix(in oklab, var(--v2-blanc) 40%, transparent);
        background: transparent;
        color: var(--v2-blanc);
      }
      .discard:hover {
        background: color-mix(in oklab, var(--v2-blanc) 12%, transparent);
      }
      .bar {
        position: sticky;
        bottom: 12px;
        z-index: 5;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-radius: 20px;
        background: var(--v2-foret);
        color: var(--v2-blanc);
        padding: 12px 14px 12px 20px;
        box-shadow: var(--v2-ombre-flottant);
      }
    `,
  ],
  template: `
    <div class="layout">
      <!-- Rôles -->
      <nav class="roles card p-2" [attr.aria-label]="t()('roles.list.aria')">
        @for (block of roleBlocks(); track block.key) {
          <p class="mono px-3 pb-1 pt-3" style="color: var(--v2-gris-texte)">{{ t()(block.title) }}</p>
          @for (role of block.roles; track role) {
            <button type="button" class="role-btn" [class.on]="role === selectedRole()" [attr.aria-current]="role === selectedRole() ? 'true' : null" (click)="selectedRole.set(role)">
              <span class="role-ico"><ui-icon [name]="role === lockedRole ? 'lock' : store.roleScoped(role) ? 'apartment' : 'public'" [size]="20" /></span>
              <span class="min-w-0 flex-1">
                <span class="block truncate text-[14px] font-extrabold">{{ store.roleLabel(role) }}</span>
                <span class="sub block">{{ t()("roles.count", { count: (matrix()[role] ?? []).length }) }} · {{ t()("roles.accounts", { count: accountsOf(role) }) }}</span>
              </span>
              @if (isModified(role)) {
                <span class="badge" style="background: var(--v2-citron); color: var(--v2-foret)">{{ t()("roles.custom") }}</span>
              }
            </button>
          } @empty {
            <p class="sub px-3 pb-3">{{ t()("roles.noCustom") }}</p>
          }
        }
      </nav>

      <!-- Droits du rôle choisi -->
      <div class="min-w-0 space-y-4">
        <section class="card p-5">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="min-w-0">
              <p class="mono" style="color: var(--v2-gris-texte)">{{ store.roleScoped(selectedRole()) ? t()("roles.scope.scoop") : t()("roles.scope.all") }}</p>
              <h2 class="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">{{ store.roleLabel(selectedRole()) }}</h2>
              @if (selectedDescription(); as description) {
                <p class="mt-1 max-w-xl text-[14px] font-medium">{{ description }}</p>
              }
              <p class="sub mt-1">{{ t()("roles.selected", { count: draft().length, total: totalPermissions() }) }} · {{ t()("roles.accounts", { count: accountsOf(selectedRole()) }) }}</p>
            </div>
            <span class="flex flex-wrap gap-2">
              @if (editable() && !isLocked() && isModified(selectedRole())) {
                <button type="button" class="btn btn-ghost" (click)="reset.emit(selectedRole())">
                  <ui-icon name="history" [size]="18" />{{ t()("roles.resetDefault") }}
                </button>
              }
              @if (editable() && !isBuiltIn(selectedRole())) {
                <button type="button" class="btn btn-ghost" (click)="edit.emit(selectedRole())"><ui-icon name="edit" [size]="18" />{{ t()("roles.edit") }}</button>
                <button type="button" class="btn btn-ghost" style="color: var(--v2-erreur-fg)" (click)="remove.emit(selectedRole())"><ui-icon name="close" [size]="18" />{{ t()("roles.delete") }}</button>
              }
            </span>
          </div>
          @if (isLocked()) {
            <p class="notice mt-4"><ui-icon name="lock" [size]="18" />{{ t()("roles.lockedNotice") }}</p>
          } @else if (!editable()) {
            <p class="notice mt-4"><ui-icon name="info" [size]="18" />{{ t()("roles.readOnlyNotice") }}</p>
          }
        </section>

        <!-- Ce que verront les utilisateurs de ce rôle : les écrans du menu, calculés avec les droits cochés. -->
        <app-role-access-preview [permissions]="draft()" [scoped]="store.roleScoped(selectedRole())" />

        @for (group of visibleGroups(); track group.key) {
          <section class="card overflow-hidden">
            <div class="group-head">
              <h3 class="text-[16px] font-extrabold">{{ t()(groupLabel(group.key)) }}</h3>
              <span class="flex items-center gap-2">
                <span class="badge" [style.background]="groupCount(group.permissions) ? 'var(--v2-sauge)' : 'var(--v2-lin)'" [style.color]="groupCount(group.permissions) ? 'var(--v2-vert-pousse)' : 'var(--v2-gris-texte)'">
                  {{ groupCount(group.permissions) }} / {{ group.permissions.length }}
                </span>
                @if (canEdit()) {
                  <button type="button" class="bulk" (click)="toggleGroup(group.permissions)">
                    {{ groupFull(group.permissions) ? t()("roles.group.none") : t()("roles.group.all") }}
                  </button>
                }
              </span>
            </div>
            <div class="perm-grid">
              @for (permission of group.permissions; track permission) {
                <label class="perm" [class.on]="has(permission)" [class.locked]="!canToggle(permission)">
                  <input type="checkbox" [checked]="has(permission)" [disabled]="!canToggle(permission)" (change)="toggle(permission, $any($event.target).checked)" />
                  <span class="min-w-0">
                    <span class="block">{{ t()(permissionLabel(permission)) }}</span>
                    <span class="code">{{ permission }}</span>
                  </span>
                </label>
              }
            </div>
          </section>
        }

        @if (canEdit() && changes() > 0) {
          <div class="bar" role="region" [attr.aria-label]="t()('roles.bar.aria')">
            <span class="text-[14px] font-bold">{{ t()("roles.bar.changes", { count: changes() }) }}</span>
            <span class="flex flex-wrap gap-2">
              <button type="button" class="btn discard" (click)="discard()">{{ t()("roles.bar.discard") }}</button>
              <button type="button" class="btn btn-citron" [disabled]="busy()" (click)="save.emit({ role: selectedRole(), permissions: draft() })">
                {{ t()("roles.bar.save") }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
              </button>
            </span>
          </div>
        }
      </div>
    </div>
  `,
})
export class RolePermissionsEditorComponent {
  /** Matrice en vigueur (store ou serveur). */
  readonly matrix = input.required<RolePermissionsMatrix>();
  /** Droit `role.configure` : sinon l'éditeur est en lecture seule. */
  readonly editable = input(false);
  /** Enregistrement en cours (mode API). */
  readonly busy = input(false);
  /** Limite la liste à ces rôles (sous-rôles d'une coopérative) ; absent : tous les rôles visibles. */
  readonly onlyRoles = input<readonly RoleId[] | null>(null);
  /** Droits que l'éditeur peut accorder (plafond du gestionnaire) ; absent : tous. */
  readonly ceiling = input<readonly Permission[] | null>(null);
  /** Rôle affiché (la page le change après une création ou une suppression). */
  readonly selectedRole = model<RoleId>("admin");
  readonly save = output<{ role: RoleId; permissions: Permission[] }>();
  readonly reset = output<RoleId>();
  /** Rôle créé : renommer / changer sa description ou sa portée. */
  readonly edit = output<RoleId>();
  /** Rôle créé : supprimer (la page demande le rôle de remplacement de ses comptes). */
  readonly remove = output<RoleId>();

  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly lockedRole = LOCKED_ROLE;
  protected readonly isBuiltIn = isBuiltInRole;

  /** Brouillon du rôle choisi : repart de la matrice à chaque changement de rôle ou de matrice. */
  protected readonly draft = signal<Permission[]>([]);

  constructor() {
    effect(() => {
      const permissions = this.matrix()[this.selectedRole()] ?? [];
      untracked(() => this.draft.set([...permissions]));
    });
    // Rôle supprimé alors qu'il était affiché : retour à l'administrateur.
    effect(() => {
      const roles = this.listedRoles();
      untracked(() => {
        if (!roles.includes(this.selectedRole())) this.selectedRole.set(roles[0] ?? "admin");
      });
    });
  }

  /** Rôles affichés : ceux demandés par la page, sinon tous ceux que la session voit. */
  protected readonly listedRoles = computed<RoleId[]>(() => this.onlyRoles()?.slice() ?? this.store.allRoles());

  /** Rôles de l'application, puis rôles créés ; pour une coopérative, ses sous-rôles seuls. */
  protected readonly roleBlocks = computed(() => {
    if (this.onlyRoles()) {
      return [{ key: "coop", title: "roles.block.coop" as MessageKey, roles: this.listedRoles() }];
    }
    return [
      { key: "builtIn", title: "roles.block.builtIn" as MessageKey, roles: BUILT_IN_ROLES as RoleId[] },
      {
        key: "custom",
        title: "roles.block.custom" as MessageKey,
        roles: this.listedRoles().filter((role) => !isBuiltInRole(role)),
      },
    ];
  });

  /** Familles de droits, limitées au plafond quand il y en a un. */
  protected readonly visibleGroups = computed(() => {
    const ceiling = this.ceiling();
    return PERMISSION_GROUPS.map((group) => ({
      key: group.key,
      permissions: ceiling ? group.permissions.filter((permission) => ceiling.includes(permission)) : group.permissions,
    })).filter((group) => group.permissions.length);
  });

  protected readonly totalPermissions = computed(() =>
    this.visibleGroups().reduce((sum, group) => sum + group.permissions.length, 0),
  );

  protected readonly selectedDescription = computed(
    () => this.store.state().customRoles.find((role) => role.id === this.selectedRole())?.description ?? "",
  );

  protected accountsOf(role: RoleId): number {
    return this.store.state().users.filter((user) => user.role === role).length;
  }

  protected readonly isLocked = computed(() => this.selectedRole() === LOCKED_ROLE);
  protected readonly canEdit = computed(() => this.editable() && !this.isLocked());

  /** Nombre de droits ajoutés ou retirés par rapport à la matrice en vigueur. */
  protected readonly changes = computed(() => {
    const current = this.matrix()[this.selectedRole()] ?? [];
    const draft = this.draft();
    return (
      draft.filter((permission) => !current.includes(permission)).length +
      current.filter((permission) => !draft.includes(permission)).length
    );
  });

  /** Rôle intégré dont les droits s'écartent de la matrice par défaut. */
  protected isModified(role: RoleId): boolean {
    if (!isBuiltInRole(role)) return false;
    const current = this.matrix()[role] ?? [];
    const defaults = DEFAULT_ROLE_PERMISSIONS[role];
    return (
      current.length !== defaults.length ||
      current.some((permission) => !defaults.includes(permission))
    );
  }

  protected has(permission: Permission): boolean {
    return this.draft().includes(permission);
  }

  protected canToggle(permission: Permission): boolean {
    const ceiling = this.ceiling();
    return this.canEdit() && !RESERVED_PERMISSIONS.includes(permission) && (!ceiling || ceiling.includes(permission));
  }

  protected toggle(permission: Permission, checked: boolean): void {
    if (!this.canToggle(permission)) return;
    this.draft.update((list) =>
      checked ? [...new Set([...list, permission])] : list.filter((item) => item !== permission),
    );
  }

  protected groupCount(permissions: readonly Permission[]): number {
    return permissions.filter((permission) => this.has(permission)).length;
  }

  protected groupFull(permissions: readonly Permission[]): boolean {
    const toggleable = permissions.filter((permission) => !RESERVED_PERMISSIONS.includes(permission));
    return toggleable.every((permission) => this.has(permission));
  }

  protected toggleGroup(permissions: readonly Permission[]): void {
    const turnOn = !this.groupFull(permissions);
    for (const permission of permissions) this.toggle(permission, turnOn);
  }

  protected discard(): void {
    this.draft.set([...(this.matrix()[this.selectedRole()] ?? [])]);
  }

  protected groupLabel(key: string): MessageKey {
    return `permgroup.${key}` as MessageKey;
  }

  protected permissionLabel(permission: Permission): MessageKey {
    return `perm.${permission}` as MessageKey;
  }
}

import { Component, computed, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

import { isApiMode } from "@/lib/api/config";
import {
  createCustomRole,
  deleteCustomRole,
  listRolePermissions,
  resetRolePermissions,
  updateCustomRole,
  updateRolePermissions,
} from "@/lib/api/roles";
import { fmtDateTime, nf } from "@/lib/format";
import {
  BUILT_IN_ROLES,
  DEFAULT_ROLE_PERMISSIONS,
  LOCKED_ROLE,
  type CustomRole,
  type Permission,
  type RoleId,
} from "@/lib/permissions";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { RoleFormDialogComponent, type RoleFormValue } from "@shared/role-form-dialog.component";
import { RolePermissionsEditorComponent } from "@shared/role-permissions-editor.component";
import { StoreService } from "@shared/store.service";
import {
  IconComponent,
  ModalComponent,
  SelectComponent,
  SnackbarService,
  StatCardsComponent,
  TONE,
  V2_PAGE_STYLES,
  type SelectOption,
  type StatCard,
} from "@shared/ui";

/** Actions du journal qui concernent les rôles et les droits. */
const ROLE_AUDIT_ACTIONS = new Set([
  "Droits du rôle modifiés",
  "Droits par défaut rétablis",
  "Rôle créé",
  "Rôle modifié",
  "Rôle supprimé",
]);

/**
 * Super administration › Rôles et droits (charte V2) : créer, renommer, supprimer des rôles et régler leurs
 * droits. Réservé au droit `role.configure` ; séparé de l'administration courante (« Utilisateurs & rôles »).
 */
@Component({
  selector: "app-super-admin-roles-page",
  imports: [
    AppShellComponent,
    IconComponent,
    ModalComponent,
    RoleFormDialogComponent,
    RolePermissionsEditorComponent,
    RouterLink,
    SelectComponent,
    StatCardsComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .recent li {
        display: flex;
        gap: 12px;
        border-top: 1px solid var(--v2-separateur);
        padding: 12px 20px;
      }
      .recent li:first-child {
        border-top: none;
      }
    `,
  ],
  template: `
    <app-shell perm="role.configure" [area]="t()('superadmin.roles.title')">
      <header class="rise flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono inline-flex items-center gap-1.5" style="color: var(--v2-gris-texte)"><ui-icon name="lock" [size]="14" />{{ t()("superadmin.eyebrow") }}</p>
          <h1 class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">{{ t()("superadmin.roles.title") }}</h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("superadmin.roles.description") }}</p>
        </div>
        <button type="button" class="btn btn-primary" (click)="openCreate()">
          {{ t()("superadmin.roles.new") }}<span class="btn-chip"><ui-icon name="add" [size]="20" /></span>
        </button>
      </header>

      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <app-role-permissions-editor
        class="mt-6"
        [matrix]="store.state().rolePermissions"
        [editable]="true"
        [busy]="saving()"
        [(selectedRole)]="selectedRole"
        (save)="savePermissions($event)"
        (reset)="resetRole($event)"
        (edit)="openEdit($event)"
        (remove)="askDelete($event)"
      />

      <section class="sec-card mt-6">
        <div class="sec-head">
          <h2><span class="sec-ico"><ui-icon name="history" [size]="18" /></span>{{ t()("superadmin.roles.recent") }}</h2>
          <a class="btn btn-ghost" style="height: 40px" routerLink="/dashboard/audit">{{ t()("nav.item.audit") }}<ui-icon name="arrow_forward" [size]="18" /></a>
        </div>
        <ol class="recent border-t" style="border-color: var(--v2-separateur)">
          @for (entry of recentChanges(); track entry.id) {
            <li>
              <span class="grid size-9 shrink-0 place-items-center rounded-[12px]" style="background: var(--v2-sauge); color: var(--v2-foret)"><ui-icon name="admin_panel_settings" [size]="18" /></span>
              <span class="min-w-0">
                <span class="block font-bold">{{ entry.action }} · {{ entry.entity }}</span>
                @if (entry.detail) {
                  <span class="block truncate text-[13px] font-medium">{{ entry.detail }}</span>
                }
                <span class="sub block">{{ entry.user }} · {{ fmtDateTime(entry.at) }}</span>
              </span>
            </li>
          } @empty {
            <li class="sub">{{ t()("superadmin.roles.recentNone") }}</li>
          }
        </ol>
      </section>

      <app-role-form-dialog [(open)]="formOpen" [role]="editedRole()" [busy]="saving()" (submitted)="submitForm($event)" />

      @if (deleting(); as deletedRole) {
        <ui-modal
          [open]="true"
          tone="danger"
          [title]="t()('superadmin.roles.delete.title', { name: deletedRole.name })"
          [description]="holders(deletedRole.id) ? t()('superadmin.roles.delete.descriptionUsed', { count: holders(deletedRole.id) }) : t()('superadmin.roles.delete.descriptionEmpty')"
          icon="close"
          [width]="560"
          [closeLabel]="t()('common.close')"
          (closed)="deleting.set(null)"
        >
          @if (holders(deletedRole.id)) {
            <ui-select
              [label]="t()('superadmin.roles.delete.reassign')"
              [options]="reassignOptions(deletedRole)"
              [value]="reassignTo()"
              [placeholder]="t()('superadmin.roles.delete.reassignPh')"
              leadingIcon="admin_panel_settings"
              (valueChange)="reassignTo.set($event)"
            />
            @if (deleteTried() && !reassignTo()) {
              <p class="mt-1.5 flex items-center gap-1.5 text-[13px] font-bold" style="color: var(--v2-erreur-fg)" role="alert"><ui-icon name="warning" [size]="16" />{{ t()("errors.roles.reassignRequired") }}</p>
            }
          }
          <button modal-footer type="button" class="btn btn-ghost" (click)="deleting.set(null)">{{ t()("common.cancel") }}</button>
          <button modal-footer type="button" class="btn btn-danger" [disabled]="saving()" (click)="confirmDelete(deletedRole)">{{ t()("superadmin.roles.delete.confirm") }}</button>
        </ui-modal>
      }
    </app-shell>
  `,
})
export default class SuperAdminRolesPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  private readonly snackbar = inject(SnackbarService);
  protected readonly fmtDateTime = fmtDateTime;

  protected readonly selectedRole = signal<RoleId>("admin");
  protected readonly saving = signal(false);
  protected readonly formOpen = signal(false);
  private readonly editedRoleId = signal<RoleId | null>(null);
  protected readonly deleting = signal<CustomRole | null>(null);
  protected readonly reassignTo = signal("");
  protected readonly deleteTried = signal(false);

  constructor() {
    if (isApiMode()) void this.reload();
  }

  /** Mode API : la matrice et les rôles créés viennent du serveur. */
  private async reload(): Promise<void> {
    try {
      const roles = await listRolePermissions();
      this.store.actions.replaceRolePermissionsFromApi(
        Object.fromEntries(roles.items.map((entry) => [entry.role, entry.permissions])),
        roles.customRoles,
      );
    } catch {
      this.snackbar.error(this.locale.tNow("errors.roles.api"));
    }
  }

  protected readonly editedRole = computed(
    () => this.store.state().customRoles.find((role) => role.id === this.editedRoleId()) ?? null,
  );

  protected readonly recentChanges = computed(() =>
    this.store
      .state()
      .audit.filter((entry) => ROLE_AUDIT_ACTIONS.has(entry.action) || entry.action === "Rôle modifié")
      .slice(0, 6),
  );

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const state = this.store.state();
    const customIds = new Set(state.customRoles.map((role) => role.id as string));
    const modified = BUILT_IN_ROLES.filter((role) => {
      const current = state.rolePermissions[role] ?? [];
      const defaults = DEFAULT_ROLE_PERMISSIONS[role];
      return current.length !== defaults.length || current.some((permission) => !defaults.includes(permission));
    }).length;
    const changes = state.audit.filter((entry) => ROLE_AUDIT_ACTIONS.has(entry.action)).length;
    return [
      { label: t("superadmin.roles.stat.roles"), value: nf.format(this.store.allRoles().length), sub: t("superadmin.roles.stat.rolesSub", { custom: nf.format(customIds.size) }), icon: "admin_panel_settings", bg: "", fg: "" },
      { label: t("superadmin.roles.stat.modified"), value: nf.format(modified), sub: t("superadmin.roles.stat.modifiedSub"), icon: "tune", ...TONE.attente },
      { label: t("superadmin.roles.stat.accounts"), value: nf.format(state.users.length), sub: t("superadmin.roles.stat.accountsSub", { count: nf.format(state.users.filter((user) => customIds.has(user.role)).length) }), icon: "group", ...TONE.info },
      { label: t("superadmin.roles.stat.journal"), value: nf.format(changes), sub: t("superadmin.roles.stat.journalSub"), icon: "history", ...TONE.culture },
    ];
  });

  protected holders(role: RoleId): number {
    return this.store.state().users.filter((user) => user.role === role).length;
  }

  /** Remplaçants possibles : même portée, jamais le super administrateur ni le rôle supprimé. */
  protected reassignOptions(deletedRole: CustomRole): SelectOption[] {
    return this.store
      .allRoles()
      .filter((role) => role !== deletedRole.id && role !== LOCKED_ROLE && this.store.roleScoped(role) === deletedRole.scoped)
      .map((role) => ({ value: role, label: this.store.roleLabel(role) }));
  }

  protected openCreate(): void {
    this.editedRoleId.set(null);
    this.formOpen.set(true);
  }

  protected openEdit(role: RoleId): void {
    this.editedRoleId.set(role);
    this.formOpen.set(true);
  }

  protected askDelete(role: RoleId): void {
    const target = this.store.state().customRoles.find((item) => item.id === role);
    if (!target) return;
    this.reassignTo.set("");
    this.deleteTried.set(false);
    this.deleting.set(target);
  }

  protected async submitForm(value: RoleFormValue): Promise<void> {
    const edited = this.editedRole();
    this.saving.set(true);
    try {
      if (isApiMode()) {
        if (edited) await updateCustomRole(edited.id, value);
        else {
          const created = await createCustomRole(value);
          await this.reload();
          this.selectedRole.set(created.id);
          this.done("superadmin.roles.created", value.name);
          return;
        }
        await this.reload();
      } else {
        if (edited) {
          const updated = this.store.actions.updateRole(edited.id, value);
          if (!updated.ok) {
            this.snackbar.error(updated.error);
            return;
          }
        } else {
          const created = this.store.actions.createRole(value);
          if (!created.ok) {
            this.snackbar.error(created.error);
            return;
          }
          this.selectedRole.set(created.id);
          this.done("superadmin.roles.created", value.name);
          return;
        }
      }
      this.done("superadmin.roles.updated", value.name);
    } catch {
      this.snackbar.error(this.locale.tNow("errors.roles.api"));
    } finally {
      this.saving.set(false);
    }
  }

  private done(key: "superadmin.roles.created" | "superadmin.roles.updated", name: string): void {
    this.formOpen.set(false);
    this.snackbar.success(this.locale.tNow(key, { name }));
  }

  protected async confirmDelete(deletedRole: CustomRole): Promise<void> {
    this.deleteTried.set(true);
    const count = this.holders(deletedRole.id);
    if (count && !this.reassignTo()) return;
    const reassignTo = (this.reassignTo() || null) as RoleId | null;
    this.saving.set(true);
    try {
      if (isApiMode()) {
        await deleteCustomRole(deletedRole.id, reassignTo);
        await this.reload();
      } else {
        const result = this.store.actions.deleteRole(deletedRole.id, reassignTo);
        if (!result.ok) {
          this.snackbar.error(result.error);
          return;
        }
      }
      this.deleting.set(null);
      this.selectedRole.set("admin");
      this.snackbar.success(
        count
          ? this.locale.tNow("superadmin.roles.deletedMoved", { name: deletedRole.name, count })
          : this.locale.tNow("superadmin.roles.deleted", { name: deletedRole.name }),
      );
    } catch {
      this.snackbar.error(this.locale.tNow("errors.roles.api"));
    } finally {
      this.saving.set(false);
    }
  }

  protected async savePermissions(change: { role: RoleId; permissions: Permission[] }): Promise<void> {
    if (isApiMode()) {
      this.saving.set(true);
      try {
        await updateRolePermissions(change.role, change.permissions);
        await this.reload();
      } catch {
        this.snackbar.error(this.locale.tNow("errors.roles.api"));
        return;
      } finally {
        this.saving.set(false);
      }
    } else {
      const result = this.store.actions.setRolePermissions(change.role, change.permissions);
      if (!result.ok) {
        this.snackbar.error(result.error);
        return;
      }
    }
    this.snackbar.success(this.locale.tNow("roles.saved", { role: this.store.roleLabel(change.role) }));
  }

  protected async resetRole(role: RoleId): Promise<void> {
    if (isApiMode()) {
      try {
        await resetRolePermissions(role);
        await this.reload();
      } catch {
        this.snackbar.error(this.locale.tNow("errors.roles.api"));
        return;
      }
    } else {
      const result = this.store.actions.resetRolePermissions(role);
      if (!result.ok) {
        this.snackbar.error(result.error);
        return;
      }
    }
    this.snackbar.success(this.locale.tNow("roles.resetDone", { role: this.store.roleLabel(role) }));
  }
}

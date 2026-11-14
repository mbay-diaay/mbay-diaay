import { Component, computed, effect, inject, signal, untracked } from "@angular/core";

import { isApiMode } from "@/lib/api/config";
import {
  createScoopRole,
  deleteScoopRole,
  listScoopRoles,
  setScoopRolePermissions,
  updateScoopRole,
} from "@/lib/api/roles";
import { COOPERATIVE_ROLES, SUBROLE_COPY_SOURCES } from "@/lib/team";
import { delegablePermissions, type CustomRole, type Permission, type RoleId } from "@/lib/permissions";
import { inScope } from "@/lib/scope";
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
  V2_PAGE_STYLES,
  type SelectOption,
} from "@shared/ui";

/**
 * Rôles de la coopérative (charte V2) : le gestionnaire crée, renomme et supprime les sous-rôles dont sa coopérative
 * a besoin, et règle leurs droits. Un sous-rôle n'existe que dans sa coopérative et reçoit au plus les droits de son
 * créateur (plafond). Droit `subrole.manage`, dans le périmètre de la coopérative.
 */
@Component({
  selector: "app-roles-cooperative-page",
  imports: [
    AppShellComponent,
    IconComponent,
    ModalComponent,
    RoleFormDialogComponent,
    RolePermissionsEditorComponent,
    SelectComponent,
  ],
  styles: [V2_PAGE_STYLES],
  template: `
    <app-shell perm="subrole.manage" [area]="t()('coop.roles.title')">
      <header class="rise flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("coop.roles.eyebrow") }}</p>
          <h1 class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">{{ t()("coop.roles.title") }}</h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("coop.roles.description") }}</p>
        </div>
        <button type="button" class="btn btn-primary" [disabled]="!scoopId()" (click)="openCreate()">
          {{ t()("coop.roles.new") }}<span class="btn-chip"><ui-icon name="add" [size]="20" /></span>
        </button>
      </header>

      @if (scoopOptions().length > 1) {
        <div class="toolbar card mt-6">
          <ui-select class="min-w-[280px] flex-1" [label]="t()('coop.roles.scoop')" [options]="scoopOptions()" [value]="scoopId()" leadingIcon="apartment" (valueChange)="scoopId.set($event)" />
        </div>
      }

      <p class="notice mt-6"><ui-icon name="info" [size]="18" />{{ t()("coop.roles.ceiling") }}</p>

      @if (coopRoles().length) {
        <app-role-permissions-editor
          class="mt-4"
          [matrix]="store.state().rolePermissions"
          [editable]="true"
          [busy]="saving()"
          [onlyRoles]="coopRoles()"
          [ceiling]="ceiling()"
          [(selectedRole)]="selectedRole"
          (save)="savePermissions($event)"
          (edit)="openEdit($event)"
          (remove)="askDelete($event)"
        />
      } @else {
        <section class="card mt-4 flex flex-col items-center gap-3 p-10 text-center">
          <span class="grid size-14 place-items-center rounded-[16px]" style="background: var(--v2-sauge); color: var(--v2-foret)"><ui-icon name="admin_panel_settings" [size]="26" /></span>
          <p class="sub max-w-md">{{ t()("coop.roles.empty") }}</p>
        </section>
      }

      <app-role-form-dialog [(open)]="formOpen" [role]="editedRole()" [busy]="saving()" [lockScope]="true" [ceiling]="ceiling()" [copySources]="copySources()" (submitted)="submitForm($event)" />

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
            <ui-select [label]="t()('superadmin.roles.delete.reassign')" [options]="reassignOptions(deletedRole)" [value]="reassignTo()" [placeholder]="t()('superadmin.roles.delete.reassignPh')" leadingIcon="admin_panel_settings" (valueChange)="reassignTo.set($event)" />
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
export default class RolesCooperativePage {
  protected readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  private readonly snackbar = inject(SnackbarService);

  protected readonly scoopId = signal("");
  protected readonly selectedRole = signal<RoleId>("admin");
  protected readonly saving = signal(false);
  protected readonly formOpen = signal(false);
  private readonly editedRoleId = signal<RoleId | null>(null);
  protected readonly deleting = signal<CustomRole | null>(null);
  protected readonly reassignTo = signal("");
  protected readonly deleteTried = signal(false);

  /** Coopératives dont la session gère les sous-rôles (une seule pour un gestionnaire). */
  protected readonly scoopOptions = computed<SelectOption[]>(() => {
    const state = this.store.state();
    return inScope(
      state.scoops.filter((scoop) => !scoop.archived).map((scoop) => ({ ...scoop, scoopId: scoop.id })),
      state.session,
    )
      .sort((first, second) => first.name.localeCompare(second.name))
      .map((scoop) => ({ value: scoop.id, label: scoop.name, ...(scoop.code ? { hint: scoop.code } : {}) }));
  });

  constructor() {
    effect(() => {
      const options = this.scoopOptions();
      untracked(() => {
        if (!options.some((option) => option.value === this.scoopId())) this.scoopId.set(options[0]?.value ?? "");
      });
    });
    effect(() => {
      const id = this.scoopId();
      if (id && isApiMode()) void this.reload(id);
    });
  }

  /** Mode API : sous-rôles et droits de cette coopérative, depuis le serveur. */
  private async reload(scoopId: string): Promise<void> {
    try {
      const data = await listScoopRoles(scoopId);
      const others = this.store.state().customRoles.filter((role) => role.scoopId !== scoopId);
      this.store.actions.replaceRolePermissionsFromApi(
        { ...this.store.state().rolePermissions, ...Object.fromEntries(data.items.map((entry) => [entry.role, entry.permissions])) },
        [...others, ...data.customRoles],
      );
    } catch {
      this.snackbar.error(this.locale.tNow("errors.roles.api"));
    }
  }

  /** Droits qu'un sous-rôle peut recevoir : ceux du gestionnaire, sans l'administration du réseau. */
  protected readonly ceiling = computed<Permission[]>(() =>
    delegablePermissions(this.store.state().session?.permissions ?? []),
  );

  /** Départ des droits : les rôles de la coopérative et ses propres sous-rôles, jamais un rôle du réseau. */
  protected readonly copySources = computed<RoleId[]>(() => [...SUBROLE_COPY_SOURCES, ...this.coopRoles()]);

  protected readonly coopRoles = computed<RoleId[]>(() =>
    this.store
      .state()
      .customRoles.filter((role) => role.scoopId === this.scoopId())
      .map((role) => role.id),
  );

  protected readonly editedRole = computed(
    () => this.store.state().customRoles.find((role) => role.id === this.editedRoleId()) ?? null,
  );

  protected holders(role: RoleId): number {
    return this.store.state().users.filter((user) => user.role === role).length;
  }

  /** Remplaçants possibles : un rôle de coopérative, ou un autre sous-rôle de la même coopérative. */
  protected reassignOptions(deletedRole: CustomRole): SelectOption[] {
    return [...COOPERATIVE_ROLES, ...this.coopRoles()]
      .filter((role) => role !== deletedRole.id && role !== "gestionnaire")
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
    const scoopId = this.scoopId();
    this.saving.set(true);
    try {
      if (isApiMode()) {
        if (edited) await updateScoopRole(scoopId, edited.id, value);
        else {
          const created = await createScoopRole(scoopId, value);
          await this.reload(scoopId);
          this.selectedRole.set(created.id);
        }
      } else if (edited) {
        const result = this.store.actions.updateRole(edited.id, value);
        if (!result.ok) {
          this.snackbar.error(result.error);
          return;
        }
      } else {
        const result = this.store.actions.createRole({ ...value, scoopId });
        if (!result.ok) {
          this.snackbar.error(result.error);
          return;
        }
        this.selectedRole.set(result.id);
      }
      this.formOpen.set(false);
      this.snackbar.success(
        edited
          ? this.locale.tNow("superadmin.roles.updated", { name: value.name })
          : this.locale.tNow("coop.roles.created", { name: value.name }),
      );
    } catch {
      this.snackbar.error(this.locale.tNow("errors.roles.api"));
    } finally {
      this.saving.set(false);
    }
  }

  protected async confirmDelete(deletedRole: CustomRole): Promise<void> {
    this.deleteTried.set(true);
    const count = this.holders(deletedRole.id);
    if (count && !this.reassignTo()) return;
    const reassignTo = (this.reassignTo() || null) as RoleId | null;
    this.saving.set(true);
    try {
      if (isApiMode()) {
        await deleteScoopRole(this.scoopId(), deletedRole.id, reassignTo);
        await this.reload(this.scoopId());
      } else {
        const result = this.store.actions.deleteRole(deletedRole.id, reassignTo);
        if (!result.ok) {
          this.snackbar.error(result.error);
          return;
        }
      }
      this.deleting.set(null);
      this.snackbar.success(this.locale.tNow("superadmin.roles.deleted", { name: deletedRole.name }));
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
        await setScoopRolePermissions(this.scoopId(), change.role, change.permissions);
        await this.reload(this.scoopId());
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
}

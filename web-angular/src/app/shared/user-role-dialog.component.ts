import { Component, computed, effect, inject, input, model, signal, untracked } from "@angular/core";

import { isApiMode } from "@/lib/api/config";
import { updateUser } from "@/lib/api/users";
import { LOCKED_ROLE, roleAllowsManyScoops, type RoleId } from "@/lib/permissions";
import type { AppUser } from "@/lib/store";

import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { CheckListComponent } from "./ui/check-list.component";
import { IconComponent } from "./ui/icon.component";
import { ModalComponent } from "./ui/modal.component";
import { SelectComponent, type SelectOption } from "./ui/select.component";
import { SnackbarService } from "./ui/snackbar.service";
import { V2_PAGE_STYLES } from "./ui/v2-page.styles";

/**
 * Changer le rôle d'un compte (charte V2). Le super administrateur attribue tous les rôles, y compris
 * administrateur et super administrateur ; un administrateur attribue les autres. Un rôle de coopérative
 * demande sa SCOOP (plusieurs pour un technicien ou une faîtière).
 *
 * `<app-user-role-dialog [(open)]="roleOpen" [user]="editedUser()" />`
 */
@Component({
  selector: "app-user-role-dialog",
  imports: [CheckListComponent, IconComponent, ModalComponent, SelectComponent],
  styles: [V2_PAGE_STYLES],
  template: `
    @if (user(); as editedUser) {
      <ui-modal
        [open]="open()"
        [title]="t()('roles.dialog.title', { name: editedUser.name })"
        [description]="t()('roles.dialog.description')"
        icon="admin_panel_settings"
        [width]="620"
        [closeLabel]="t()('common.close')"
        (closed)="open.set(false)"
      >
        <div class="space-y-5">
          <ui-select
            [label]="t()('roles.dialog.role')"
            [options]="roleOptions()"
            [value]="role()"
            [placeholder]="t()('roles.dialog.rolePh')"
            leadingIcon="admin_panel_settings"
            (valueChange)="pickRole($event)"
          />
          @if (scoped()) {
            @if (manyScoops()) {
              <ui-check-list
                [label]="t()('roles.dialog.scoops')"
                [options]="scoopOptions()"
                [value]="scoopIds()"
                [error]="showErrors() && !scoopIds().length ? t()('errors.roles.scoopRequired') : ''"
                (valueChange)="scoopIds.set($event)"
              />
            } @else {
              <ui-select
                [label]="t()('roles.dialog.scoop')"
                [options]="scoopOptions()"
                [value]="scoopIds()[0] ?? ''"
                [placeholder]="t()('roles.dialog.scoopPh')"
                leadingIcon="apartment"
                (valueChange)="scoopIds.set([$event])"
              />
              @if (showErrors() && !scoopIds().length) {
                <p class="flex items-center gap-1.5 text-[13px] font-bold" style="color: var(--v2-erreur-fg)" role="alert">
                  <ui-icon name="warning" [size]="16" />{{ t()("errors.roles.scoopRequired") }}
                </p>
              }
            }
          } @else {
            <p class="flex items-start gap-2 rounded-[14px] p-3 text-[14px] font-medium" style="background: var(--v2-sauge); color: var(--v2-foret)">
              <ui-icon name="public" [size]="18" />{{ t()("roles.dialog.consolidated") }}
            </p>
          }
          @if (role() === lockedRole) {
            <p class="flex items-start gap-2 rounded-[14px] p-3 text-[14px] font-medium" style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)">
              <ui-icon name="warning" [size]="18" />{{ t()("roles.dialog.superWarning") }}
            </p>
          }
        </div>
        <button modal-footer type="button" class="btn btn-ghost" (click)="open.set(false)">{{ t()("common.cancel") }}</button>
        <button modal-footer type="button" class="btn btn-primary" [disabled]="busy()" (click)="submit(editedUser)">
          {{ t()("roles.dialog.submit") }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
        </button>
      </ui-modal>
    }
  `,
})
export class UserRoleDialogComponent {
  readonly open = model(false);
  readonly user = input<AppUser | null>(null);

  private readonly store = inject(StoreService);
  private readonly snackbar = inject(SnackbarService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly lockedRole = LOCKED_ROLE;

  protected readonly role = signal<RoleId | "">("");
  protected readonly scoopIds = signal<string[]>([]);
  protected readonly showErrors = signal(false);
  protected readonly busy = signal(false);

  constructor() {
    // À chaque ouverture : on repart du rôle et des SCOOP actuels du compte.
    effect(() => {
      const isOpen = this.open();
      const edited = this.user();
      untracked(() => {
        if (!isOpen || !edited) return;
        this.role.set(edited.role);
        this.scoopIds.set(edited.scoopIds ?? (edited.scoopId ? [edited.scoopId] : []));
        this.showErrors.set(false);
      });
    });
  }

  /** Rôles proposés : tous pour le super administrateur, tous sauf super administrateur pour les autres. */
  protected readonly roleOptions = computed<SelectOption[]>(() => {
    return this.store
      .assignableRoleIds(this.scoopIds())
      .map((role) => ({
        value: role,
        label: this.store.roleLabel(role),
        icon: role === LOCKED_ROLE ? "lock" : this.store.roleScoped(role) ? "apartment" : "public",
      }));
  });

  protected readonly scoopOptions = computed<SelectOption[]>(() =>
    this.store
      .state()
      .scoops.filter((scoop) => !scoop.archived)
      .map((scoop) => ({ value: scoop.id, label: scoop.name })),
  );

  protected readonly manyScoops = computed(() => {
    const role = this.role();
    return role !== "" && roleAllowsManyScoops(role);
  });

  protected readonly scoped = computed(() => {
    const role = this.role();
    return role !== "" && this.store.roleScoped(role);
  });

  protected pickRole(value: string): void {
    const role = value as RoleId;
    this.role.set(role);
    // Un seul choix de SCOOP pour les rôles autres que technicien.
    if (!roleAllowsManyScoops(role)) this.scoopIds.update((ids) => ids.slice(0, 1));
    if (!this.store.roleScoped(role)) this.scoopIds.set([]);
  }

  protected async submit(edited: AppUser): Promise<void> {
    const role = this.role();
    if (!role) return;
    if (this.scoped() && !this.scoopIds().length) {
      this.showErrors.set(true);
      return;
    }
    const scoopIds = this.scoped() ? this.scoopIds() : [];
    if (isApiMode()) {
      this.busy.set(true);
      try {
        // L'API ne connaît qu'une SCOOP par compte : la première pour un technicien.
        await updateUser(edited.id, { role, scoopId: scoopIds[0] ?? null });
      } catch {
        this.snackbar.error(this.locale.tNow("errors.roles.api"));
        return;
      } finally {
        this.busy.set(false);
      }
    }
    const result = this.store.actions.setUserRole(edited.id, role, scoopIds);
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(
      this.locale.tNow("roles.dialog.saved", {
        name: edited.name,
        role: this.store.roleLabel(role),
      }),
    );
    this.open.set(false);
  }
}

import { Component, computed, inject, input, signal } from "@angular/core";

import { isApiMode } from "@/lib/api/config";
import { deleteUser, toggleUserActive } from "@/lib/api/users";
import { SUPER_ADMIN_ONLY_ROLES } from "@/lib/permissions";
import type { AppUser } from "@/lib/store";

import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { IconComponent } from "./ui/icon.component";
import { ModalComponent } from "./ui/modal.component";
import { SnackbarService } from "./ui/snackbar.service";
import { TextFieldComponent } from "./ui/text-field.component";
import { V2_PAGE_STYLES } from "./ui/v2-page.styles";

/**
 * Désactiver / réactiver / supprimer définitivement un compte (charte V2), avec leurs confirmations.
 * À poser dans la cellule d'actions de n'importe quel tableau de comptes :
 *
 * `<app-account-actions [user]="user" />`
 *
 * Rien ne s'affiche sans `user.manage`, sur son propre compte, ni sur un administrateur ou un super administrateur
 * pour qui n'a pas `role.configure`. Mode API : le serveur applique les mêmes garde-fous.
 */
@Component({
  selector: "app-account-actions",
  imports: [IconComponent, ModalComponent, TextFieldComponent],
  host: { class: "contents" },
  styles: [V2_PAGE_STYLES],
  template: `
    @if (allowed()) {
      <button
        type="button"
        class="act"
        [title]="user().active ? t()('utilisateurs.action.deactivate') : t()('utilisateurs.action.reactivate')"
        [attr.aria-label]="(user().active ? t()('utilisateurs.action.deactivate') : t()('utilisateurs.action.reactivate')) + ' · ' + user().name"
        [style.color]="user().active ? 'var(--v2-erreur-fg)' : 'var(--v2-foret)'"
        (click)="$event.stopPropagation(); toggleOpen.set(true)"
      >
        <ui-icon [name]="user().active ? 'block' : 'how_to_reg'" [size]="18" />
      </button>
      <button
        type="button"
        class="act act-danger"
        [title]="t()('utilisateurs.action.delete')"
        [attr.aria-label]="t()('utilisateurs.action.delete') + ' · ' + user().name"
        (click)="$event.stopPropagation(); openDelete()"
      >
        <ui-icon name="delete_forever" [size]="18" />
      </button>

      @if (toggleOpen()) {
        <ui-modal
          [open]="true"
          [tone]="user().active ? 'danger' : 'default'"
          [title]="user().active ? t()('utilisateurs.v2.deactivateTitle', { name: user().name }) : t()('utilisateurs.v2.reactivateTitle', { name: user().name })"
          [description]="user().active ? t()('utilisateurs.v2.deactivateText') : t()('utilisateurs.v2.reactivateText')"
          [icon]="user().active ? 'block' : 'how_to_reg'"
          [width]="540"
          [closeLabel]="t()('common.close')"
          (closed)="toggleOpen.set(false)"
        >
          <button modal-footer type="button" class="btn btn-ghost" (click)="toggleOpen.set(false)">{{ t()("common.cancel") }}</button>
          <button modal-footer type="button" class="btn" [class.btn-danger]="user().active" [class.btn-primary]="!user().active" [disabled]="busy()" (click)="confirmToggle()">
            {{ user().active ? t()("utilisateurs.action.deactivate") : t()("utilisateurs.action.reactivate") }}
          </button>
        </ui-modal>
      }

      @if (deleteOpen()) {
        <ui-modal
          [open]="true"
          tone="danger"
          [title]="t()('utilisateurs.delete.title', { name: user().name })"
          [description]="t()('utilisateurs.delete.text')"
          icon="delete_forever"
          [width]="560"
          [closeLabel]="t()('common.close')"
          (closed)="deleteOpen.set(false)"
        >
          <ul class="mb-4 space-y-1.5 text-[14px] font-medium">
            <li class="flex items-start gap-2"><ui-icon name="close" [size]="18" style="color: var(--v2-erreur-fg)" />{{ t()("utilisateurs.delete.point.login") }}</li>
            <li class="flex items-start gap-2"><ui-icon name="close" [size]="18" style="color: var(--v2-erreur-fg)" />{{ t()("utilisateurs.delete.point.devices", { count: deviceCount() }) }}</li>
            <li class="flex items-start gap-2"><ui-icon name="history" [size]="18" style="color: var(--v2-foret)" />{{ t()("utilisateurs.delete.point.audit") }}</li>
          </ul>
          <ui-text-field
            [label]="t()('utilisateurs.delete.confirmLabel')"
            [hint]="t()('utilisateurs.delete.confirmHint', { email: user().email })"
            preset="email"
            [placeholder]="user().email"
            [value]="confirmEmail()"
            [error]="deleteTried() && !emailMatches() ? t()('errors.users.confirmEmail') : ''"
            (valueChange)="confirmEmail.set($event)"
          />
          @if (user().active) {
            <p class="notice mt-4"><ui-icon name="info" [size]="18" />{{ t()("utilisateurs.delete.preferDeactivate") }}</p>
          }
          <button modal-footer type="button" class="btn btn-ghost" (click)="deleteOpen.set(false)">{{ t()("common.cancel") }}</button>
          <button modal-footer type="button" class="btn btn-danger" [disabled]="busy()" (click)="confirmDelete()"><ui-icon name="delete_forever" [size]="18" />{{ t()("utilisateurs.delete.confirm") }}</button>
        </ui-modal>
      }
    }
  `,
})
export class AccountActionsComponent {
  readonly user = input.required<AppUser>();

  private readonly store = inject(StoreService);
  private readonly snackbar = inject(SnackbarService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;

  protected readonly toggleOpen = signal(false);
  protected readonly deleteOpen = signal(false);
  protected readonly confirmEmail = signal("");
  protected readonly deleteTried = signal(false);
  protected readonly busy = signal(false);

  /** Actions possibles : droit `user.manage`, jamais sur soi, super administrateur réservé au super administrateur. */
  protected readonly allowed = computed(() => {
    const target = this.user();
    const sessionEmail = this.store.state().session?.email.toLowerCase();
    return (
      this.store.can("user.manage") &&
      target.email.toLowerCase() !== sessionEmail &&
      (!SUPER_ADMIN_ONLY_ROLES.includes(target.role as never) || this.store.can("role.configure"))
    );
  });

  protected readonly deviceCount = computed(
    () => this.store.state().devices.filter((device) => device.userId === this.user().id).length,
  );

  protected readonly emailMatches = computed(
    () => this.confirmEmail().trim().toLowerCase() === this.user().email.toLowerCase(),
  );

  protected openDelete(): void {
    this.confirmEmail.set("");
    this.deleteTried.set(false);
    this.deleteOpen.set(true);
  }

  protected async confirmToggle(): Promise<void> {
    const target = this.user();
    this.busy.set(true);
    try {
      if (isApiMode()) await toggleUserActive(target.id);
      const result = this.store.actions.toggleUser(target.id);
      if (!result.ok) {
        this.snackbar.error(result.error);
        return;
      }
      this.toggleOpen.set(false);
      this.snackbar.success(
        this.locale.tNow(result.active ? "utilisateurs.toast.reactivated" : "utilisateurs.toast.deactivated"),
      );
    } catch {
      this.snackbar.error(this.locale.tNow("errors.users.api"));
    } finally {
      this.busy.set(false);
    }
  }

  protected async confirmDelete(): Promise<void> {
    this.deleteTried.set(true);
    if (!this.emailMatches()) return;
    const target = this.user();
    const typed = this.confirmEmail().trim();
    this.busy.set(true);
    try {
      if (isApiMode()) await deleteUser(target.id, typed);
      const result = this.store.actions.deleteUser(target.id, typed);
      if (!result.ok) {
        this.snackbar.error(result.error);
        return;
      }
      this.deleteOpen.set(false);
      this.snackbar.success(this.locale.tNow("utilisateurs.toast.deleted", { name: target.name }));
    } catch {
      this.snackbar.error(this.locale.tNow("errors.users.api"));
    } finally {
      this.busy.set(false);
    }
  }
}

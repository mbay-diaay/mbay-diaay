import { Component, computed, effect, inject, input, model, output, signal, untracked } from "@angular/core";

import { LOCKED_ROLE, type CustomRole, type Permission, type RoleId } from "@/lib/permissions";

import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { RoleAccessPreviewComponent } from "./role-access-preview.component";
import { IconComponent } from "./ui/icon.component";
import { ModalComponent } from "./ui/modal.component";
import { SelectComponent, type SelectOption } from "./ui/select.component";
import { TextFieldComponent } from "./ui/text-field.component";
import { V2_PAGE_STYLES } from "./ui/v2-page.styles";

/** Valeurs saisies, transmises à la page qui enregistre (store en démonstration, API sinon). */
export interface RoleFormValue {
  name: string;
  description: string;
  scoped: boolean;
  copyFrom: RoleId | null;
}

type FormErrors = Partial<Record<"name", string>>;
const NO_COPY = "";

/**
 * Créer ou modifier un rôle (charte V2, super administrateur) : nom, description, portée, et à la création les
 * droits de départ copiés d'un rôle existant. Validation au premier envoi, puis champ par champ.
 *
 * `<app-role-form-dialog [(open)]="formOpen" [role]="editedRole()" [busy]="saving()" (submitted)="save($event)" />`
 * Sans `role` : création. Avec `role` : modification (la portée se fige si des comptes ont ce rôle).
 */
@Component({
  selector: "app-role-form-dialog",
  imports: [IconComponent, ModalComponent, RoleAccessPreviewComponent, SelectComponent, TextFieldComponent],
  styles: [
    V2_PAGE_STYLES,
    `
    .scopes {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
    .scope {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      border-radius: 18px;
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
      padding: 14px 16px;
      text-align: left;
      cursor: pointer;
      transition:
        border-color 0.15s ease,
        background-color 0.15s ease;
    }
    .scope:hover {
      border-color: var(--v2-foret);
    }
    .scope.on {
      border: 2px solid var(--v2-foret);
      background: var(--v2-sauge);
    }
    .scope:disabled {
      cursor: not-allowed;
      opacity: 0.55;
    }
    .scope:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    .scope-ico {
      display: grid;
      height: 36px;
      width: 36px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 12px;
      background: var(--v2-creme);
      color: var(--v2-foret);
    }
    .scope.on .scope-ico {
      background: var(--v2-foret);
      color: var(--v2-citron);
    }
    .lbl {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--v2-ardoise);
    }
    .area {
      width: 100%;
      min-height: 88px;
      border-radius: 16px;
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
      padding: 12px 16px;
      font-size: 15px;
      font-weight: 600;
      color: var(--v2-encre);
    }
    .area::placeholder {
      color: var(--v2-gris-texte);
      font-weight: 500;
    }
    .area:focus-visible {
      outline: none;
      border-color: var(--v2-foret);
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--v2-foret) 18%, transparent);
    }
  `,
  ],
  template: `
    <ui-modal
      [open]="open()"
      [title]="role() ? t()('superadmin.roles.form.editTitle', { name: role()!.name }) : t()('superadmin.roles.form.createTitle')"
      [description]="role() ? t()('superadmin.roles.form.editDescription') : t()('superadmin.roles.form.createDescription')"
      icon="admin_panel_settings"
      tone="brand"
      [width]="660"
      [closeLabel]="t()('common.close')"
      (closed)="open.set(false)"
    >
      <div class="space-y-5">
        <ui-text-field
          [label]="t()('superadmin.roles.form.name')"
          icon="admin_panel_settings"
          [placeholder]="t()('superadmin.roles.form.namePh')"
          [maxlength]="60"
          [value]="name()"
          [error]="errors().name ?? ''"
          (valueChange)="name.set($event)"
        />
        <div>
          <label class="lbl" for="role-description">{{ t()("superadmin.roles.form.description") }} <span style="text-transform: none; font-weight: 600">({{ t()("superadmin.roles.form.optional") }})</span></label>
          <textarea id="role-description" class="area mt-2" maxlength="240" [placeholder]="t()('superadmin.roles.form.descriptionPh')" [value]="description()" (input)="description.set($any($event.target).value)"></textarea>
        </div>
        @if (!lockScope()) {
        <fieldset>
          <legend class="lbl">{{ t()("superadmin.roles.form.scope") }}</legend>
          <div class="scopes mt-2" role="radiogroup">
            <button type="button" role="radio" class="scope" [class.on]="scoped()" [attr.aria-checked]="scoped()" [disabled]="scopeLocked()" (click)="scoped.set(true)">
              <span class="scope-ico"><ui-icon name="apartment" [size]="18" /></span>
              <span>
                <span class="block text-[15px] font-extrabold">{{ t()("superadmin.roles.form.scopeScoop") }}</span>
                <span class="block text-[13px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("superadmin.roles.form.scopeScoopHint") }}</span>
              </span>
            </button>
            <button type="button" role="radio" class="scope" [class.on]="!scoped()" [attr.aria-checked]="!scoped()" [disabled]="scopeLocked()" (click)="scoped.set(false)">
              <span class="scope-ico"><ui-icon name="public" [size]="18" /></span>
              <span>
                <span class="block text-[15px] font-extrabold">{{ t()("superadmin.roles.form.scopeAll") }}</span>
                <span class="block text-[13px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("superadmin.roles.form.scopeAllHint") }}</span>
              </span>
            </button>
          </div>
          @if (scopeLocked()) {
            <p class="mt-2 flex items-center gap-1.5 text-[13px] font-semibold" style="color: var(--v2-gris-texte)"><ui-icon name="lock" [size]="16" />{{ t()("superadmin.roles.form.scopeLocked") }}</p>
          }
        </fieldset>
        }
        @if (!role()) {
          <ui-select
            [label]="t()('superadmin.roles.form.copyFrom')"
            [options]="copyOptions()"
            [value]="copyFrom()"
            leadingIcon="file_export"
            (valueChange)="copyFrom.set($event)"
          />
        }
        <!-- Aperçu : ce que verront les utilisateurs de ce rôle, selon le rôle de départ choisi. -->
        <app-role-access-preview
          [bare]="true"
          [permissions]="previewPermissions()"
          [scoped]="lockScope() ? true : scoped()"
          [hint]="role() ? t()('roles.access.hintEdit') : t()('roles.access.hintCreate')"
          [emptyText]="role() ? t()('roles.access.none') : t()('roles.access.noneCreate')"
        />
      </div>
      <button modal-footer type="button" class="btn btn-ghost" (click)="open.set(false)">{{ t()("common.cancel") }}</button>
      <button modal-footer type="button" class="btn btn-primary" [disabled]="busy()" (click)="submit()">
        {{ role() ? t()("superadmin.roles.form.save") : t()("superadmin.roles.form.create") }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
      </button>
    </ui-modal>
  `,
})
export class RoleFormDialogComponent {
  readonly open = model(false);
  /** Rôle créé à modifier ; absent pour une création. */
  readonly role = input<CustomRole | null>(null);
  readonly busy = input(false);
  /** Sous-rôle d'une coopérative : la portée est fixée (toujours cette coopérative), le choix disparaît. */
  readonly lockScope = input(false);
  /** Droits maximum du créateur (gestionnaire) : l'aperçu ne montre pas ce que le sous-rôle ne pourra pas recevoir. */
  readonly ceiling = input<readonly Permission[] | null>(null);
  /** Rôles proposés comme point de départ des droits (sous-rôle de coopérative : ceux de la coopérative seulement). */
  readonly copySources = input<readonly RoleId[] | null>(null);
  readonly submitted = output<RoleFormValue>();

  private readonly store = inject(StoreService);
  protected readonly t = inject(LocaleService).t;

  protected readonly name = signal("");
  protected readonly description = signal("");
  protected readonly scoped = signal(true);
  protected readonly copyFrom = signal<string>(NO_COPY);
  private readonly tried = signal(false);

  constructor() {
    // À chaque ouverture : formulaire vide (création) ou valeurs du rôle (modification).
    effect(() => {
      const isOpen = this.open();
      const edited = this.role();
      untracked(() => {
        if (!isOpen) return;
        this.name.set(edited?.name ?? "");
        this.description.set(edited?.description ?? "");
        this.scoped.set(edited?.scoped ?? true);
        this.copyFrom.set(NO_COPY);
        this.tried.set(false);
      });
    });
  }

  /** La portée d'un rôle déjà attribué ne change plus (les comptes perdraient ou gagneraient un périmètre). */
  protected readonly scopeLocked = computed(() => {
    const edited = this.role();
    return !!edited && this.store.state().users.some((user) => user.role === edited.id);
  });

  protected readonly copyOptions = computed<SelectOption[]>(() => [
    { value: NO_COPY, label: this.t()("superadmin.roles.form.copyNone") },
    ...this.store
      .allRoles()
      .filter((role) => role !== LOCKED_ROLE)
      .filter((role) => !this.copySources() || this.copySources()!.includes(role))
      .map((role) => ({
        value: role,
        label: this.store.roleLabel(role),
        hint: String((this.store.state().rolePermissions[role] ?? []).length),
      })),
  ]);

  /**
   * Droits montrés dans l'aperçu : ceux du rôle modifié, sinon ceux du rôle de départ choisi (aucun si on part de
   * zéro), limités au plafond du créateur.
   */
  protected readonly previewPermissions = computed<Permission[]>(() => {
    const source = this.role()?.id ?? (this.copyFrom() || null);
    const granted = source ? (this.store.state().rolePermissions[source] ?? []) : [];
    const ceiling = this.ceiling();
    return ceiling ? granted.filter((permission) => ceiling.includes(permission)) : [...granted];
  });

  protected readonly errors = computed<FormErrors>(() => {
    if (!this.tried()) return {};
    const name = this.name().trim();
    return name.length < 3 || name.length > 60 ? { name: this.t()("errors.roles.name") } : {};
  });

  protected submit(): void {
    this.tried.set(true);
    if (Object.keys(this.errors()).length) return;
    this.submitted.emit({
      name: this.name().trim().replace(/\s+/g, " "),
      description: this.description().trim(),
      scoped: this.lockScope() ? true : this.scoped(),
      copyFrom: (this.copyFrom() || null) as RoleId | null,
    });
  }
}

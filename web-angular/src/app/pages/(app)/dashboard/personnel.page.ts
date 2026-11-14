import { Component, computed, effect, inject, signal, untracked } from "@angular/core";

import { nf } from "@/lib/format";
import { assignableRoles } from "@/lib/team";
import { inScope } from "@/lib/scope";
import type { RoleId } from "@/lib/permissions";
import type { AppUser } from "@/lib/store";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { createPager } from "@shared/pager";
import { RoleAccessPreviewComponent } from "@shared/role-access-preview.component";
import { StoreService } from "@shared/store.service";
import {
  IconComponent,
  ModalComponent,
  PaginationComponent,
  SelectComponent,
  SnackbarService,
  StatCardsComponent,
  type StatCard,
  TextFieldComponent,
  TONE,
  V2_PAGE_STYLES,
  type SelectOption,
} from "@shared/ui";

type StaffState = "active" | "invited" | "closed";
type StaffErrors = Partial<Record<"firstName" | "lastName" | "email" | "phone" | "age" | "sex" | "role" | "scoop", string>>;

/**
 * Personnel de la coopérative (charte V2) : le gestionnaire crée les personnes qui travaillent pour sa coopérative
 * (secrétaire, bureau, ventes…), leur attribue un rôle (donc des droits), le change ou suspend l'accès. Droit
 * `role.assign`. Les techniciens se gèrent dans leur écran ; les rôles eux-mêmes, dans « Rôles de la coopérative ».
 */
@Component({
  selector: "app-personnel-page",
  imports: [
    AppShellComponent,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    RoleAccessPreviewComponent,
    SelectComponent,
    StatCardsComponent,
    TextFieldComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .lbl {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--v2-ardoise);
      }
      .chip-role {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border-radius: 999px;
        border: 1.5px solid var(--v2-gris-trait);
        background: var(--v2-blanc);
        padding: 7px 8px 7px 14px;
        font-size: 14px;
        font-weight: 700;
        color: var(--v2-encre);
        cursor: pointer;
      }
      .chip-role:hover {
        border-color: var(--v2-foret);
      }
      .chip-role.on {
        border-color: var(--v2-foret);
        background: var(--v2-foret);
        color: var(--v2-blanc);
      }
      .chip-role .n {
        display: grid;
        min-width: 26px;
        height: 26px;
        place-items: center;
        border-radius: 999px;
        background: var(--v2-citron);
        color: var(--v2-foret);
        font-size: 13px;
        font-weight: 800;
      }
      .chip-role:focus-visible {
        outline: 2px solid var(--v2-foret);
        outline-offset: 2px;
      }
      .facts {
        display: grid;
        gap: 14px 20px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      .facts dt {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--v2-gris-texte);
      }
      .facts dd {
        margin-top: 2px;
        font-size: 15px;
        font-weight: 700;
        word-break: break-word;
      }
      .field-err {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 6px;
        font-size: 13px;
        font-weight: 700;
        color: var(--v2-erreur-fg);
      }
    `,
  ],
  template: `
    <app-shell perm="role.assign" [area]="t()('personnel.area')">
      <header class="rise flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("personnel.eyebrow") }}</p>
          <h1 class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">{{ t()("personnel.title") }}</h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("personnel.description") }}</p>
        </div>
        <button type="button" class="btn btn-primary" (click)="openAdd()">
          {{ t()("personnel.add") }}<span class="btn-chip"><ui-icon name="person_add" [size]="20" /></span>
        </button>
      </header>

      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <!-- Combien de personnes par rôle : « Secrétaire ×2 »… ; un clic filtre la liste sur ce rôle. -->
      @if (roleBreakdown().length) {
        <section class="card mt-6 p-5" [attr.aria-label]="t()('personnel.breakdown.title')">
          <p class="lbl">{{ t()("personnel.breakdown.title") }}</p>
          <ul class="mt-3 flex flex-wrap gap-2">
            @for (item of roleBreakdown(); track item.role) {
              <li>
                <button type="button" class="chip-role" [class.on]="roleFilter() === item.role" [attr.aria-pressed]="roleFilter() === item.role" (click)="roleFilter.set(roleFilter() === item.role ? 'all' : item.role)">
                  {{ item.label }}<span class="n">{{ item.count }}</span>
                </button>
              </li>
            }
          </ul>
        </section>
      }

      <div class="toolbar card mt-6">
        <label class="search">
          <ui-icon name="search" [size]="20" />
          <input type="search" [placeholder]="t()('personnel.search.placeholder')" [attr.aria-label]="t()('personnel.search.aria')" [value]="query()" (input)="query.set($any($event.target).value)" />
        </label>
        <div class="seg" role="radiogroup" [attr.aria-label]="t()('personnel.col.state')">
          @for (option of stateFilters(); track option.id) {
            <button type="button" role="radio" [class.on]="stateFilter() === option.id" [attr.aria-checked]="stateFilter() === option.id" (click)="stateFilter.set(option.id)">
              {{ t()(option.label) }}<span class="n" [class.zero]="!option.count">{{ option.count }}</span>
            </button>
          }
        </div>
        @if (roleFilterOptions().length > 2) {
          <ui-select class="min-w-[220px]" [label]="t()('personnel.filter.role')" leadingIcon="admin_panel_settings" [options]="roleFilterOptions()" [value]="roleFilter()" (valueChange)="roleFilter.set($event)" />
        }
      </div>

      <p class="sub mt-4" aria-live="polite">{{ t()("personnel.count", { shown: shown().length, total: rows().length }) }}</p>

      <section class="card mt-3 overflow-hidden">
        @if (shown().length) {
          <div class="overflow-x-auto">
            <table class="tbl min-w-[820px]">
              <thead>
                <tr>
                  <th>{{ t()("personnel.col.name") }}</th>
                  <th>{{ t()("personnel.col.role") }}</th>
                  <th>{{ t()("personnel.col.state") }}</th>
                  <th class="text-right">{{ t()("personnel.col.actions") }}</th>
                </tr>
              </thead>
              <tbody>
                @for (row of pager.items(); track row.user.id) {
                  <tr class="row-link" (click)="viewing.set(row.user)">
                    <td>
                      <span class="flex items-center gap-3">
                        <span class="avatar" style="background: var(--v2-sauge); color: var(--v2-foret)">{{ row.initials }}</span>
                        <span class="min-w-0">
                          <span class="block truncate font-bold">{{ row.user.name }}</span>
                          <span class="sub block truncate">{{ row.user.email }}{{ row.user.phone ? " · " + store.phone(row.user.phone) : "" }}</span>
                        </span>
                      </span>
                    </td>
                    <td class="font-medium">{{ store.roleLabel(row.user.role) }}</td>
                    <td>
                      <span class="badge" [style.background]="row.state === 'active' ? 'var(--v2-culture-bg)' : row.state === 'invited' ? 'var(--v2-attente-bg)' : 'var(--v2-lin)'" [style.color]="row.state === 'active' ? 'var(--v2-culture-fg)' : row.state === 'invited' ? 'var(--v2-attente-fg)' : 'var(--v2-gris-texte)'">
                        {{ t()(stateLabel[row.state]) }}
                      </span>
                    </td>
                    <td (click)="$event.stopPropagation()">
                      <span class="flex justify-end gap-2">
                        <button type="button" class="act" [title]="t()('common.view')" [attr.aria-label]="t()('personnel.view.aria', { name: row.user.name })" (click)="viewing.set(row.user)"><ui-icon name="visibility" [size]="18" /></button>
                        @if (row.manageable) {
                          <button type="button" class="act" [title]="t()('personnel.edit')" [attr.aria-label]="t()('personnel.edit.aria', { name: row.user.name })" (click)="openEdit(row.user)"><ui-icon name="edit" [size]="18" /></button>
                          <button type="button" class="act" [class.act-danger]="row.user.active" [title]="row.user.active ? t()('personnel.suspend') : t()('personnel.restore')" [attr.aria-label]="(row.user.active ? t()('personnel.suspend') : t()('personnel.restore')) + ' · ' + row.user.name" (click)="toggling.set(row.user)">
                            <ui-icon [name]="row.user.active ? 'block' : 'how_to_reg'" [size]="18" />
                          </button>
                        }
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <ui-pagination class="px-5 pb-5" [pager]="pager" />
        } @else {
          <div class="flex flex-col items-center gap-3 p-10 text-center">
            <span class="grid size-14 place-items-center rounded-[16px]" style="background: var(--v2-sauge); color: var(--v2-foret)"><ui-icon name="group" [size]="26" /></span>
            <p class="text-[16px] font-extrabold">{{ t()("personnel.empty.title") }}</p>
            <p class="sub max-w-md">{{ rows().length ? t()("personnel.empty.filtered") : t()("personnel.empty.none") }}</p>
          </div>
        }
      </section>

      <!-- Ajouter une personne -->
      <ui-modal [open]="addOpen()" [title]="t()('personnel.add.title')" [description]="t()('personnel.add.description')" icon="person_add" [width]="700" [closeLabel]="t()('common.close')" (closed)="addOpen.set(false)">
        <div class="space-y-5 pb-6">
          <div class="grid gap-5 sm:grid-cols-2">
            <ui-text-field preset="firstName" [label]="t()('tech.dialog.firstName')" [value]="firstName()" [error]="errors().firstName ?? ''" (valueChange)="firstName.set($event)" />
            <ui-text-field preset="lastName" [label]="t()('tech.dialog.lastName')" [value]="lastName()" [error]="errors().lastName ?? ''" (valueChange)="lastName.set($event)" />
            <ui-text-field class="sm:col-span-2" preset="email" [label]="t()('tech.dialog.email')" [hint]="t()('personnel.add.emailHint')" [value]="email()" [error]="errors().email ?? ''" (valueChange)="email.set($event)" />
            <ui-text-field preset="phone" [label]="t()('tech.dialog.phone')" [value]="phone()" [error]="errors().phone ?? ''" (valueChange)="phone.set($event)" />
            <ui-text-field preset="age" [label]="t()('adherents.add.age')" [hint]="t()('tech.dialog.ageHint')" [value]="age()" [error]="errors().age ?? ''" (valueChange)="age.set($event)" />
            <div class="sm:col-span-2">
              <p class="lbl">{{ t()("adherents.add.sex") }}</p>
              <div class="seg mt-2" role="radiogroup" [attr.aria-label]="t()('adherents.add.sex')">
                <button type="button" role="radio" [class.on]="sex() === 'F'" [attr.aria-checked]="sex() === 'F'" (click)="sex.set('F')">{{ t()("adherents.add.female") }}</button>
                <button type="button" role="radio" [class.on]="sex() === 'H'" [attr.aria-checked]="sex() === 'H'" (click)="sex.set('H')">{{ t()("adherents.add.male") }}</button>
              </div>
              @if (errors().sex) {
                <p class="field-err"><ui-icon name="warning" [size]="16" />{{ errors().sex }}</p>
              }
            </div>
          </div>
          @if (scoopOptions().length > 1) {
            <ui-select [label]="t()('adherents.add.scoop')" leadingIcon="apartment" [options]="scoopOptions()" [value]="scoopId()" (valueChange)="scoopId.set($event); role.set('')" />
          }
          <ui-select [label]="t()('personnel.add.role')" leadingIcon="admin_panel_settings" [placeholder]="t()('personnel.add.rolePlaceholder')" [options]="roleOptions()" [value]="role()" (valueChange)="role.set($event)" />
          @if (errors().role) {
            <p class="field-err"><ui-icon name="warning" [size]="16" />{{ errors().role }}</p>
          }
          <app-role-access-preview [bare]="true" [permissions]="previewPermissions()" [scoped]="true" [hint]="t()('roles.access.hintCreate')" [emptyText]="t()('roles.access.noneCreate')" />
        </div>
        <button modal-footer type="button" class="btn btn-ghost" (click)="addOpen.set(false)">{{ t()("common.cancel") }}</button>
        <button modal-footer type="button" class="btn btn-primary" (click)="submitAdd()">
          {{ t()("personnel.add.submit") }}<span class="btn-chip"><ui-icon name="mail" [size]="18" /></span>
        </button>
      </ui-modal>

      <!-- Fiche d'une personne -->
      @if (viewedRow(); as view) {
        <ui-modal [open]="true" [title]="view.user.name" [description]="store.roleLabel(view.user.role)" icon="person" [width]="640" [closeLabel]="t()('common.close')" (closed)="viewing.set(null)">
          <div class="space-y-5 pb-6">
            <dl class="facts">
              <div><dt>{{ t()("tech.dialog.email") }}</dt><dd>{{ view.user.email }}</dd></div>
              <div><dt>{{ t()("tech.dialog.phone") }}</dt><dd>{{ view.user.phone ? store.phone(view.user.phone) : "—" }}</dd></div>
              <div><dt>{{ t()("adherents.add.sex") }}</dt><dd>{{ view.user.sex === "F" ? t()("adherents.add.female") : view.user.sex === "H" ? t()("adherents.add.male") : "—" }}</dd></div>
              <div><dt>{{ t()("adherents.add.age") }}</dt><dd>{{ view.user.age ? t()("tech.ageYears", { count: view.user.age }) : "—" }}</dd></div>
              <div><dt>{{ t()("personnel.col.role") }}</dt><dd>{{ store.roleLabel(view.user.role) }}</dd></div>
              <div><dt>{{ t()("personnel.col.state") }}</dt><dd>{{ t()(stateLabel[view.state]) }}</dd></div>
            </dl>
            <app-role-access-preview [bare]="true" [permissions]="permissionsOf(view.user.role)" [scoped]="true" [hint]="t()('roles.access.hintEdit')" [emptyText]="t()('roles.access.none')" />
          </div>
          <button modal-footer type="button" class="btn btn-ghost" (click)="viewing.set(null)">{{ t()("common.close") }}</button>
          @if (view.manageable) {
            <button modal-footer type="button" class="btn btn-primary" (click)="openEdit(view.user)">
              {{ t()("personnel.edit") }}<span class="btn-chip"><ui-icon name="edit" [size]="18" /></span>
            </button>
          }
        </ui-modal>
      }

      <!-- Modifier une personne -->
      @if (editing(); as person) {
        <ui-modal [open]="true" [title]="t()('personnel.edit.title', { name: person.name })" [description]="t()('personnel.edit.description')" icon="edit" [width]="680" [closeLabel]="t()('common.close')" (closed)="editing.set(null)">
          <div class="space-y-5 pb-6">
            <div class="grid gap-5 sm:grid-cols-2">
              <ui-text-field class="sm:col-span-2" [label]="t()('techniciens.edit.name')" [value]="editName()" [error]="editErrors().name ?? ''" (valueChange)="editName.set($event)" />
              <ui-text-field preset="phone" [label]="t()('tech.dialog.phone')" [value]="editPhone()" [error]="editErrors().phone ?? ''" (valueChange)="editPhone.set($event)" />
              <ui-text-field preset="age" [label]="t()('adherents.add.age')" [hint]="t()('tech.dialog.ageHint')" [value]="editAge()" [error]="editErrors().age ?? ''" (valueChange)="editAge.set($event)" />
              <div class="sm:col-span-2">
                <p class="lbl">{{ t()("adherents.add.sex") }}</p>
                <div class="seg mt-2" role="radiogroup" [attr.aria-label]="t()('adherents.add.sex')">
                  <button type="button" role="radio" [class.on]="editSex() === 'F'" [attr.aria-checked]="editSex() === 'F'" (click)="editSex.set('F')">{{ t()("adherents.add.female") }}</button>
                  <button type="button" role="radio" [class.on]="editSex() === 'H'" [attr.aria-checked]="editSex() === 'H'" (click)="editSex.set('H')">{{ t()("adherents.add.male") }}</button>
                </div>
                @if (editErrors().sex) {
                  <p class="field-err"><ui-icon name="warning" [size]="16" />{{ editErrors().sex }}</p>
                }
              </div>
            </div>
            <p class="sub">{{ t()("personnel.edit.emailLocked", { email: person.email }) }}</p>
            <ui-select [label]="t()('personnel.add.role')" leadingIcon="admin_panel_settings" [options]="roleOptionsFor(person)" [value]="pickedRole()" (valueChange)="pickedRole.set($event)" />
            <app-role-access-preview [bare]="true" [permissions]="permissionsOf(pickedRole())" [scoped]="true" [hint]="t()('roles.access.hintEdit')" [emptyText]="t()('roles.access.none')" />
          </div>
          <button modal-footer type="button" class="btn btn-ghost" (click)="editing.set(null)">{{ t()("common.cancel") }}</button>
          <button modal-footer type="button" class="btn btn-primary" (click)="saveEdit(person)">
            {{ t()("personnel.role.save") }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
          </button>
        </ui-modal>
      }

      <!-- Suspendre / rétablir l'accès -->
      @if (toggling(); as person) {
        <ui-modal [open]="true" [tone]="person.active ? 'danger' : 'default'" [title]="person.active ? t()('personnel.suspend.title', { name: person.name }) : t()('personnel.restore.title', { name: person.name })" [description]="person.active ? t()('personnel.suspend.text') : t()('personnel.restore.text')" [icon]="person.active ? 'block' : 'how_to_reg'" [width]="540" [closeLabel]="t()('common.close')" (closed)="toggling.set(null)">
          <button modal-footer type="button" class="btn btn-ghost" (click)="toggling.set(null)">{{ t()("common.cancel") }}</button>
          <button modal-footer type="button" [class]="person.active ? 'btn btn-danger' : 'btn btn-primary'" (click)="confirmToggle(person)">
            {{ person.active ? t()("personnel.suspend") : t()("personnel.restore") }}
          </button>
        </ui-modal>
      }
    </app-shell>
  `,
})
export default class PersonnelPage {
  protected readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  private readonly snackbar = inject(SnackbarService);

  protected readonly stateLabel = {
    active: "personnel.state.active",
    invited: "personnel.state.invited",
    closed: "personnel.state.closed",
  } as const;

  protected readonly query = signal("");
  protected readonly stateFilter = signal<"all" | StaffState>("all");
  protected readonly roleFilter = signal("all");
  protected readonly addOpen = signal(false);
  protected readonly viewing = signal<AppUser | null>(null);
  protected readonly editing = signal<AppUser | null>(null);
  protected readonly editName = signal("");
  protected readonly editPhone = signal("");
  protected readonly editAge = signal("");
  protected readonly editSex = signal<"F" | "H" | "">("");
  protected readonly editErrors = signal<Partial<Record<"name" | "phone" | "age" | "sex", string>>>({});
  protected readonly toggling = signal<AppUser | null>(null);
  protected readonly pickedRole = signal("");

  protected readonly firstName = signal("");
  protected readonly lastName = signal("");
  protected readonly email = signal("");
  protected readonly phone = signal("");
  protected readonly age = signal("");
  protected readonly sex = signal<"F" | "H" | "">("");
  protected readonly role = signal("");
  protected readonly scoopId = signal("");
  protected readonly errors = signal<StaffErrors>({});

  /** Coopératives de la session : une seule pour un gestionnaire. */
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
  }

  /** Rôles que la personne connectée peut donner dans cette coopérative (jamais technicien : écran à part). */
  private assignable(scoopId: string): RoleId[] {
    const state = this.store.state();
    const actorRole = state.session?.role;
    if (!actorRole) return [];
    return assignableRoles(actorRole, state.customRoles, scoopId).filter((candidate) => candidate !== "technicien");
  }

  protected readonly roleOptions = computed<SelectOption[]>(() =>
    this.assignable(this.scoopId()).map((candidate) => ({ value: candidate, label: this.store.roleLabel(candidate) })),
  );

  protected roleOptionsFor(person: AppUser): SelectOption[] {
    return this.assignable(person.scoopId ?? "").map((candidate) => ({ value: candidate, label: this.store.roleLabel(candidate) }));
  }

  protected permissionsOf(role: string) {
    return role ? (this.store.state().rolePermissions[role as RoleId] ?? []) : [];
  }

  protected readonly previewPermissions = computed(() => this.permissionsOf(this.role()));

  /** Personnel : comptes de coopérative du périmètre, hors techniciens, hors rôles du réseau. */
  protected readonly rows = computed(() => {
    const state = this.store.state();
    const visible = new Set(this.scoopOptions().map((option) => option.value));
    const myEmail = state.session?.email.toLowerCase();
    return state.users
      .filter((user) => !!user.scoopId && visible.has(user.scoopId) && user.role !== "technicien")
      .filter((user) => user.role !== "faitiere" && user.role !== "admin" && user.role !== "superadmin")
      .sort((first, second) => first.name.localeCompare(second.name))
      .map((user) => ({
        user,
        initials: user.name
          .split(" ")
          .map((word) => word[0] ?? "")
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        state: (user.invited && !user.active ? "invited" : user.active ? "active" : "closed") as StaffState,
        manageable:
          user.email.toLowerCase() !== myEmail && this.assignable(user.scoopId ?? "").includes(user.role),
      }));
  });

  protected readonly shown = computed(() => {
    const needle = this.query().trim().toLowerCase();
    return this.rows().filter(
      (row) =>
        (this.stateFilter() === "all" || row.state === this.stateFilter()) &&
        (this.roleFilter() === "all" || row.user.role === this.roleFilter()) &&
        (!needle ||
          [row.user.name, row.user.email, this.store.roleLabel(row.user.role)].some((text) => text.toLowerCase().includes(needle))),
    );
  });

  /** Filtres d'accès, avec le nombre de personnes de chacun. */
  protected readonly stateFilters = computed(() => {
    const rows = this.rows();
    const count = (state: StaffState) => rows.filter((row) => row.state === state).length;
    return [
      { id: "all" as const, label: "personnel.filter.all" as const, count: rows.length },
      { id: "active" as const, label: "personnel.state.active" as const, count: count("active") },
      { id: "invited" as const, label: "personnel.state.invited" as const, count: count("invited") },
      { id: "closed" as const, label: "personnel.state.closed" as const, count: count("closed") },
    ];
  });

  /** Effectif par rôle : « combien de secrétaires, de membres du bureau… » (rôles portés seulement). */
  protected readonly roleBreakdown = computed(() => {
    const rows = this.rows();
    return [...new Set(rows.map((row) => row.user.role))]
      .map((role) => ({ role, label: this.store.roleLabel(role), count: rows.filter((row) => row.user.role === role).length }))
      .sort((first, second) => second.count - first.count || first.label.localeCompare(second.label));
  });

  /** Filtre par rôle : seulement les rôles réellement portés par du personnel, avec leur effectif. */
  protected readonly roleFilterOptions = computed<SelectOption[]>(() => {
    const rows = this.rows();
    const roles = [...new Set(rows.map((row) => row.user.role))];
    return [
      { value: "all", label: this.t()("personnel.filter.allRoles"), hint: nf.format(rows.length) },
      ...roles
        .map((role) => ({ value: role, label: this.store.roleLabel(role), hint: nf.format(rows.filter((row) => row.user.role === role).length) }))
        .sort((first, second) => first.label.localeCompare(second.label)),
    ];
  });

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const rows = this.rows();
    const count = (state: StaffState) => rows.filter((row) => row.state === state).length;
    const women = rows.filter((row) => row.user.sex === "F").length;
    return [
      { label: t("personnel.stat.total"), value: nf.format(rows.length), sub: t("personnel.stat.totalSub", { roles: nf.format(new Set(rows.map((row) => row.user.role)).size) }), icon: "group", bg: "", fg: "" },
      { label: t("personnel.stat.active"), value: nf.format(count("active")), sub: t("personnel.stat.activeSub"), icon: "how_to_reg", ...TONE.succes },
      { label: t("personnel.stat.invited"), value: nf.format(count("invited")), sub: t("personnel.stat.invitedSub"), icon: "mark_email_unread", ...TONE.info },
      { label: t("personnel.stat.closed"), value: nf.format(count("closed")), sub: t("personnel.stat.closedSub", { women: nf.format(women) }), icon: "block", ...TONE.attente },
    ];
  });

  protected readonly pager = createPager(() => this.shown());

  protected openAdd(): void {
    this.firstName.set("");
    this.lastName.set("");
    this.email.set("");
    this.phone.set("");
    this.age.set("");
    this.sex.set("");
    this.role.set("");
    this.errors.set({});
    this.addOpen.set(true);
  }

  protected submitAdd(): void {
    const t = this.t();
    const errors: StaffErrors = {};
    if (!this.firstName().trim()) errors.firstName = t("errors.technician.name");
    if (!this.lastName().trim()) errors.lastName = t("errors.technician.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim())) errors.email = t("errors.technician.email");
    if (this.phone().replace(/\D/g, "").length < 9) errors.phone = t("errors.technician.phone");
    const ageValue = Number(this.age().trim());
    if (!this.age().trim() || !Number.isInteger(ageValue) || ageValue < 15 || ageValue > 100) errors.age = t("errors.technician.age");
    if (!this.sex()) errors.sex = t("errors.technician.sex");
    if (!this.role()) errors.role = t("personnel.add.roleRequired");
    this.errors.set(errors);
    if (Object.keys(errors).length) return;

    const fullName = `${this.firstName().trim()} ${this.lastName().trim()}`;
    const result = this.store.actions.createStaff({
      name: fullName,
      email: this.email(),
      phone: this.phone(),
      sex: this.sex() as "F" | "H",
      age: ageValue,
      role: this.role() as RoleId,
      scoopId: this.scoopId(),
    });
    if (!result.ok) {
      if (result.error === t("errors.technician.emailTaken")) this.errors.set({ email: result.error });
      else this.snackbar.error(result.error);
      return;
    }
    this.addOpen.set(false);
    this.snackbar.success(t("personnel.add.done", { name: fullName }));
  }

  /** Ligne de la personne affichée (toujours à jour après une modification). */
  protected readonly viewedRow = computed(() => {
    const person = this.viewing();
    return person ? (this.rows().find((row) => row.user.id === person.id) ?? null) : null;
  });

  protected openEdit(person: AppUser): void {
    this.viewing.set(null);
    this.editName.set(person.name);
    this.editPhone.set(person.phone);
    this.editAge.set(person.age ? String(person.age) : "");
    this.editSex.set(person.sex ?? "");
    this.pickedRole.set(person.role);
    this.editErrors.set({});
    this.editing.set(person);
  }

  protected saveEdit(person: AppUser): void {
    const t = this.t();
    const errors: Partial<Record<"name" | "phone" | "age" | "sex", string>> = {};
    if (this.editName().trim().split(/\s+/).length < 2) errors.name = t("errors.technician.name");
    if (this.editPhone().replace(/\D/g, "").length < 9) errors.phone = t("errors.technician.phone");
    const ageValue = Number(this.editAge().trim());
    if (!this.editAge().trim() || !Number.isInteger(ageValue) || ageValue < 15 || ageValue > 100) errors.age = t("errors.technician.age");
    if (!this.editSex()) errors.sex = t("errors.technician.sex");
    this.editErrors.set(errors);
    if (Object.keys(errors).length) return;
    const result = this.store.actions.updateStaff(person.id, {
      name: this.editName(),
      phone: this.editPhone(),
      sex: this.editSex() as "F" | "H",
      age: ageValue,
      ...(this.pickedRole() && this.pickedRole() !== person.role ? { role: this.pickedRole() as RoleId } : {}),
    });
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.editing.set(null);
    this.snackbar.success(t("personnel.edit.done", { name: this.editName().trim() }));
  }

  protected confirmToggle(person: AppUser): void {
    const result = this.store.actions.updateStaff(person.id, { active: !person.active });
    this.toggling.set(null);
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.t()(person.active ? "personnel.suspend.done" : "personnel.restore.done", { name: person.name }));
  }
}

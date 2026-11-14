import { Component, computed, effect, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map } from "rxjs";

import { isApiMode } from "@/lib/api/config";
import { fetchAllPages } from "@/lib/api/pagination";
import { listRolePermissions } from "@/lib/api/roles";
import { createUser, listUsers } from "@/lib/api/users";
import { normalizeEmail } from "@/lib/auth/policy";
import { nf } from "@/lib/format";
import { LOCKED_ROLE, roleAllowsManyScoops, SUPER_ADMIN_ONLY_ROLES, type RoleId } from "@/lib/permissions";
import type { AppUser } from "@/lib/store";
import { AccountActionsComponent } from "@shared/account-actions.component";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { createPager } from "@shared/pager";
import { StoreService } from "@shared/store.service";
import { TechnicianDialogComponent } from "@shared/technician-dialog.component";
import { UserRoleDialogComponent } from "@shared/user-role-dialog.component";
import {
  CheckListComponent,
  IconComponent,
  initialsOf,
  ModalComponent,
  PaginationComponent,
  SelectComponent,
  SnackbarService,
  StatCardsComponent,
  TextFieldComponent,
  TONE,
  V2_PAGE_STYLES,
  type SelectOption,
  type StatCard,
} from "@shared/ui";

const ALL = "tous";
type NewUserErrors = Partial<Record<"name" | "email" | "phone" | "scoop", string>>;

/**
 * Utilisateurs & rôles (charte V2) : comptes de la plateforme (création, rôle, activation, invitation de
 * technicien). La configuration des rôles eux-mêmes vit à part, dans le bloc « Super administration ».
 */
@Component({
  selector: "app-utilisateurs-page",
  imports: [
    AccountActionsComponent,
    AppShellComponent,
    CheckListComponent,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    RouterLink,
    SelectComponent,
    StatCardsComponent,
    TechnicianDialogComponent,
    TextFieldComponent,
    UserRoleDialogComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .role-filter {
        min-width: 240px;
      }
      /* Colonne Actions toujours visible : collée au bord droit quand le tableau défile. */
      .pin-right {
        position: sticky;
        right: 0;
        z-index: 1;
        background: var(--v2-blanc);
        box-shadow: -1px 0 0 var(--v2-separateur);
      }
    `,
  ],
  template: `
    <app-shell perm="user.manage" [area]="t()('utilisateurs.area')">
      <header class="rise flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("utilisateurs.eyebrow") }}</p>
          <h1 class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">{{ t()("utilisateurs.title") }}</h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("utilisateurs.v2.description") }}</p>
        </div>
        <span class="flex flex-wrap gap-2">
            <button type="button" class="btn btn-ghost" (click)="techOpen.set(true)"><ui-icon name="person_add" [size]="18" />{{ t()("tech.add") }}</button>
            <button type="button" class="btn btn-primary" (click)="openNewUser()">
              {{ t()("utilisateurs.new") }}<span class="btn-chip"><ui-icon name="add" [size]="20" /></span>
            </button>
          </span>
      </header>

      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

        <div class="toolbar card mt-6">
          <label class="search">
            <ui-icon name="search" [size]="20" />
            <input type="search" [placeholder]="t()('utilisateurs.v2.search')" [attr.aria-label]="t()('utilisateurs.v2.search')" [value]="query()" (input)="onQueryChange($any($event.target).value)" />
          </label>
          <ui-select class="role-filter" variant="compact" [options]="roleFilterOptions()" [value]="roleFilter()" leadingIcon="admin_panel_settings" (valueChange)="roleFilter.set($event)" />
        </div>

        <p class="sub mt-4" aria-live="polite">{{ t()("utilisateurs.v2.count", { shown: nf.format(shownUsers().length), total: nf.format(users().length) }) }}</p>

        <section class="card mt-3 overflow-hidden">
          @if (loading()) {
            <p class="sub p-6">{{ t()("utilisateurs.v2.loading") }}</p>
          } @else if (shownUsers().length) {
            <div class="overflow-x-auto">
              <table class="tbl min-w-[860px]">
                <thead>
                  <tr>
                    <th>{{ t()("utilisateurs.col.name") }}</th>
                    <th>{{ t()("utilisateurs.col.role") }}</th>
                    <th>{{ t()("utilisateurs.col.scope") }}</th>
                    <th>{{ t()("utilisateurs.col.devices") }}</th>
                    <th>{{ t()("utilisateurs.col.state") }}</th>
                    <th class="pin-right text-right">{{ t()("utilisateurs.v2.col.actions") }}</th>
                  </tr>
                </thead>
                <tbody>
                  @for (user of usersPager.items(); track user.id) {
                    <tr>
                      <td>
                        <span class="flex items-center gap-3">
                          <span class="avatar" [style.background]="tone(user.role).bg" [style.color]="tone(user.role).fg">{{ initials(user.name) }}</span>
                          <span class="min-w-0">
                            <span class="block max-w-64 truncate font-bold">{{ user.name }}</span>
                            <span class="sub block max-w-64 truncate">{{ user.email }}</span>
                            <span class="sub block tabular" [class.zero]="!user.phone">{{ user.phone ? store.phone(user.phone) : t()("utilisateurs.phoneNone") }}</span>
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
                        @if (devicesOf(user.id).length) {
                          <a class="inline-flex items-center gap-1.5 font-bold underline-offset-4 hover:underline" style="color: var(--v2-foret)" [routerLink]="['/dashboard/appareils']" [queryParams]="{ user: user.id }">
                            <ui-icon name="devices" [size]="16" />{{ t()("utilisateurs.devicesActive", { active: activeDevices(user.id), total: devicesOf(user.id).length }) }}
                          </a>
                        } @else {
                          <span class="zero">{{ t()("utilisateurs.devicesNone") }}</span>
                        }
                      </td>
                      <td>
                        @if (user.invited && !user.active) {
                          <span class="badge" [style.background]="toneInfo.bg" [style.color]="toneInfo.fg"><ui-icon name="mark_email_unread" [size]="14" />{{ t()("utilisateurs.v2.invited") }}</span>
                        } @else if (user.active) {
                          <span class="badge" [style.background]="toneSuccess.bg" [style.color]="toneSuccess.fg">{{ t()("utilisateurs.state.active") }}</span>
                        } @else {
                          <span class="badge" [style.background]="toneNeutral.bg" [style.color]="toneNeutral.fg">{{ t()("utilisateurs.state.inactive") }}</span>
                        }
                      </td>
                      <td class="pin-right">
                        <span class="flex justify-end gap-2">
                          @if (canEditRole(user)) {
                            <button type="button" class="act" [title]="t()('utilisateurs.v2.changeRole')" [attr.aria-label]="t()('utilisateurs.v2.changeRoleFor', { name: user.name })" (click)="openRole(user)"><ui-icon name="admin_panel_settings" [size]="18" /></button>
                          }
                          @if (store.can("account.manage")) {
                            <a class="act" [title]="hasLink(user.id) ? t()('utilisateurs.action.linked') : t()('utilisateurs.action.link')" [attr.aria-label]="hasLink(user.id) ? t()('utilisateurs.action.linked') : t()('utilisateurs.action.link')" [routerLink]="['/dashboard/comptes']" [queryParams]="{ vue: hasLink(user.id) ? 'liees' : 'a-rapprocher' }"><ui-icon name="link" [size]="18" /></a>
                          }
                          @if (store.can("audit.read")) {
                            <a class="act" [title]="t()('utilisateurs.action.audit')" [attr.aria-label]="t()('utilisateurs.action.audit')" [routerLink]="['/dashboard/audit']" [queryParams]="{ q: user.name }"><ui-icon name="history" [size]="18" /></a>
                          }
                          <app-account-actions [user]="user" />
                        </span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <ui-pagination class="px-5 pb-5" [pager]="usersPager" />
          } @else {
            <div class="flex flex-col items-center gap-3 p-10 text-center">
              <span class="grid size-14 place-items-center rounded-[16px]" style="background: var(--v2-sauge); color: var(--v2-foret)"><ui-icon name="group" [size]="26" /></span>
              <p class="text-[16px] font-extrabold">{{ t()("utilisateurs.v2.empty") }}</p>
            </div>
          }
        </section>

      <!-- Nouvel utilisateur -->
      <ui-modal [open]="newOpen()" [title]="t()('utilisateurs.new')" [description]="t()('utilisateurs.v2.newDescription')" icon="person_add" [width]="680" [closeLabel]="t()('common.close')" (closed)="newOpen.set(false)">
        <div class="grid gap-4 sm:grid-cols-2">
          <ui-text-field class="sm:col-span-2" [label]="t()('utilisateurs.form.name')" preset="firstName" [placeholder]="t()('utilisateurs.form.namePh')" [value]="newName()" [error]="newErrors().name ?? ''" (valueChange)="newName.set($event)" />
          <ui-text-field [label]="t()('utilisateurs.form.email')" preset="email" [hint]="t()('utilisateurs.form.emailHint')" [value]="newEmail()" [error]="newErrors().email ?? ''" (valueChange)="newEmail.set($event)" />
          <ui-text-field [label]="t()('utilisateurs.form.phone')" preset="phone" [optional]="t()('utilisateurs.v2.optional')" [value]="newPhone()" [error]="newErrors().phone ?? ''" (valueChange)="newPhone.set($event)" />
          <ui-select class="sm:col-span-2" [label]="t()('utilisateurs.form.role')" [options]="assignableRoleOptions()" [value]="newRole()" leadingIcon="admin_panel_settings" (valueChange)="pickNewRole($event)" />
          @if (newRoleScoped()) {
            @if (newManyScoops()) {
              <ui-check-list class="sm:col-span-2" [label]="t()('roles.dialog.scoops')" [options]="scoopOptions()" [value]="newScoopIds()" [error]="newErrors().scoop ?? ''" (valueChange)="newScoopIds.set($event)" />
            } @else {
              <div class="sm:col-span-2">
                <ui-select [label]="t()('roles.dialog.scoop')" [options]="scoopOptions()" [value]="newScoopIds()[0] ?? ''" [placeholder]="t()('roles.dialog.scoopPh')" leadingIcon="apartment" (valueChange)="newScoopIds.set([$event])" />
                @if (newErrors().scoop; as scoopError) {
                  <p class="mt-1.5 flex items-center gap-1.5 text-[13px] font-bold" style="color: var(--v2-erreur-fg)" role="alert"><ui-icon name="warning" [size]="16" />{{ scoopError }}</p>
                }
              </div>
            }
          }
        </div>
        <button modal-footer type="button" class="btn btn-ghost" (click)="newOpen.set(false)">{{ t()("common.cancel") }}</button>
        <button modal-footer type="button" class="btn btn-primary" [disabled]="creating()" (click)="submitNewUser()">
          {{ t()("utilisateurs.create") }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
        </button>
      </ui-modal>

      <app-user-role-dialog [(open)]="roleOpen" [user]="roleUser()" />
      <app-technician-dialog [(open)]="techOpen" />
    </app-shell>
  `,
})
export default class UtilisateursPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  private readonly snackbar = inject(SnackbarService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly nf = nf;
  protected readonly lockedRole = LOCKED_ROLE;
  protected readonly toneInfo = TONE.info;
  protected readonly toneSuccess = TONE.succes;
  protected readonly toneNeutral = TONE.neutre;
  /** Couleur d'un rôle : super administrateur en citron, rôles de coopérative en culture, consolidés en info. */
  protected tone(role: RoleId) {
    if (role === LOCKED_ROLE) return { bg: "var(--v2-citron)", fg: "var(--v2-foret)" };
    return this.store.roleScoped(role) ? TONE.culture : TONE.info;
  }
  protected readonly initials = initialsOf;

  private readonly queryFromRoute = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get("q") ?? "")),
    { initialValue: "" },
  );

  protected readonly query = signal("");
  protected readonly roleFilter = signal<string>(ALL);
  protected readonly loading = signal(isApiMode());

  protected readonly techOpen = signal(false);
  protected readonly roleOpen = signal(false);
  private readonly roleUserId = signal<string | null>(null);

  // Formulaire « Nouvel utilisateur » : erreurs affichées seulement après la première tentative.
  protected readonly newOpen = signal(false);
  protected readonly creating = signal(false);
  protected readonly newName = signal("");
  protected readonly newEmail = signal("");
  protected readonly newPhone = signal("");
  protected readonly newRole = signal<RoleId>("gestionnaire");
  protected readonly newScoopIds = signal<string[]>([]);
  private readonly newSubmitted = signal(false);

  constructor() {
    effect(() => this.query.set(this.queryFromRoute()));
    if (isApiMode()) void this.loadFromApi();
  }

  private async loadFromApi(): Promise<void> {
    try {
      const [users, roles] = await Promise.all([fetchAllPages(listUsers), listRolePermissions()]);
      this.store.actions.replaceUsersFromApi(users);
      // Les rôles créés par le super administrateur doivent être connus pour afficher et attribuer les rôles.
      this.store.actions.replaceRolePermissionsFromApi(
        Object.fromEntries(roles.items.map((entry) => [entry.role, entry.permissions])),
        roles.customRoles,
      );
    } catch {
      this.snackbar.error(this.locale.tNow("utilisateurs.v2.loadError"));
    } finally {
      this.loading.set(false);
    }
  }

  protected readonly users = computed(() => this.store.state().users);

  protected readonly shownUsers = computed(() => {
    const needle = this.query().trim().toLowerCase();
    const role = this.roleFilter();
    return this.users().filter(
      (user) =>
        (role === ALL || user.role === role) &&
        (!needle || `${user.name} ${user.email}`.toLowerCase().includes(needle)),
    );
  });
  protected readonly usersPager = createPager(() => this.shownUsers());

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const users = this.users();
    const active = users.filter((user) => user.active).length;
    const invited = users.filter((user) => user.invited && !user.active).length;
    return [
      { label: t("utilisateurs.v2.stat.accounts"), value: nf.format(users.length), sub: t("utilisateurs.v2.stat.accountsSub", { count: nf.format(active) }), icon: "group", bg: "", fg: "" },
      { label: t("utilisateurs.v2.stat.inactive"), value: nf.format(users.length - active - invited), sub: t("utilisateurs.v2.stat.inactiveSub"), icon: "block", ...TONE.neutre },
      { label: t("utilisateurs.v2.stat.invited"), value: nf.format(invited), sub: t("utilisateurs.v2.stat.invitedSub"), icon: "mark_email_unread", ...TONE.info },
      { label: t("utilisateurs.v2.stat.roles"), value: nf.format(new Set(users.map((user) => user.role)).size), sub: t("utilisateurs.v2.stat.rolesSub", { count: nf.format(this.store.allRoles().length) }), icon: "admin_panel_settings", ...TONE.attente },
    ];
  });

  protected readonly roleFilterOptions = computed<SelectOption[]>(() => [
    { value: ALL, label: this.t()("utilisateurs.v2.allRoles"), hint: nf.format(this.users().length) },
    ...this.store.allRoles().map((role) => ({
      value: role,
      label: this.store.roleLabel(role),
      hint: nf.format(this.users().filter((user) => user.role === role).length),
    })),
  ]);

  /** Rôles qu'on peut donner à la création : tous pour le super administrateur, sauf le sien pour les autres. */
  protected readonly assignableRoleOptions = computed<SelectOption[]>(() => {
    return this.store
      .assignableRoleIds(this.newScoopIds())
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

  protected readonly newRoleScoped = computed(() => this.store.roleScoped(this.newRole()));
  protected readonly newManyScoops = computed(() => roleAllowsManyScoops(this.newRole()));

  protected readonly roleUser = computed(
    () => this.users().find((user) => user.id === this.roleUserId()) ?? null,
  );

  protected readonly newErrors = computed<NewUserErrors>(() => {
    if (!this.newSubmitted()) return {};
    const t = this.t();
    const errors: NewUserErrors = {};
    const typedEmail = this.newEmail().trim();
    const email = normalizeEmail(typedEmail);
    if (this.newName().trim().replace(/\s+/g, " ").split(" ").length < 2)
      errors.name = t("utilisateurs.v2.err.name");
    if (!typedEmail || !email) errors.email = t("utilisateurs.err.emailInvalid");
    else if (this.users().some((user) => user.email.toLowerCase() === email))
      errors.email = t("utilisateurs.err.emailTaken");
    const phone = this.newPhone().trim();
    if (phone && !/^7[0678]\s?\d{3}\s?\d{2}\s?\d{2}$/.test(phone))
      errors.phone = t("utilisateurs.err.phone");
    if (this.newRoleScoped() && !this.newScoopIds().length)
      errors.scoop = t("errors.roles.scoopRequired");
    return errors;
  });

  protected onQueryChange(value: string): void {
    this.query.set(value);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: value.trim() || null },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }

  protected scopeLabel(user: AppUser): string {
    const ids = user.scoopIds ?? (user.scoopId ? [user.scoopId] : []);
    if (!ids.length) return this.t()("utilisateurs.scopeAll");
    const names = ids.map((id) => this.store.state().scoops.find((scoop) => scoop.id === id)?.name ?? id);
    return names.length > 2 ? `${names.slice(0, 2).join(", ")} +${names.length - 2}` : names.join(", ");
  }

  protected devicesOf(userId: string) {
    return this.store.state().devices.filter((device) => device.userId === userId);
  }

  protected activeDevices(userId: string): number {
    return this.devicesOf(userId).filter((device) => device.active).length;
  }

  protected hasLink(userId: string): boolean {
    return this.store.state().links.some((link) => link.userId === userId);
  }

  /** Les comptes administrateur et super administrateur ne se modifient que par un super administrateur. */
  protected canEditRole(user: AppUser): boolean {
    return !SUPER_ADMIN_ONLY_ROLES.includes(user.role as never) || this.store.can("role.configure");
  }

  protected openRole(user: AppUser): void {
    this.roleUserId.set(user.id);
    this.roleOpen.set(true);
  }

  protected openNewUser(): void {
    this.newName.set("");
    this.newEmail.set("");
    this.newPhone.set("");
    this.newRole.set("gestionnaire");
    this.newScoopIds.set([]);
    this.newSubmitted.set(false);
    this.newOpen.set(true);
  }

  protected pickNewRole(value: string): void {
    const role = value as RoleId;
    this.newRole.set(role);
    if (!roleAllowsManyScoops(role)) this.newScoopIds.update((ids) => ids.slice(0, 1));
    if (!this.store.roleScoped(role)) this.newScoopIds.set([]);
  }

  protected async submitNewUser(): Promise<void> {
    this.newSubmitted.set(true);
    if (Object.keys(this.newErrors()).length) return;
    const role = this.newRole();
    const scoopIds = this.newRoleScoped() ? this.newScoopIds() : [];
    const payload = {
      name: this.newName().trim().replace(/\s+/g, " "),
      email: normalizeEmail(this.newEmail())!,
      phone: this.newPhone().trim(),
      role,
    };
    this.creating.set(true);
    try {
      if (isApiMode()) {
        const created = await createUser({
          name: payload.name,
          email: payload.email,
          role: payload.role,
          ...(scoopIds[0] ? { scoopId: scoopIds[0] } : {}),
          ...(payload.phone ? { phone: payload.phone } : {}),
        });
        this.store.actions.addUser({
          id: created.id,
          name: created.name,
          email: created.email,
          phone: created.phone ?? "",
          role: created.role,
          scoopId: created.scoopId ?? undefined,
          ...(roleAllowsManyScoops(role) && { scoopIds }),
        });
      } else {
        this.store.actions.addUser({
          ...payload,
          scoopId: roleAllowsManyScoops(role) ? undefined : scoopIds[0],
          ...(roleAllowsManyScoops(role) && { scoopIds }),
        });
      }
    } catch {
      this.snackbar.error(this.locale.tNow("utilisateurs.v2.apiError"));
      return;
    } finally {
      this.creating.set(false);
    }
    this.snackbar.success(this.locale.tNow("utilisateurs.toast.created"));
    this.newOpen.set(false);
  }
}

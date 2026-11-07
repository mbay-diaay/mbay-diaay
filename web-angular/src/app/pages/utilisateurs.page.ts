import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map } from "rxjs";
import {
  LucideAngularModule,
  Link2,
  MoreVertical,
  Plus,
  ScrollText,
  Search,
  Smartphone,
  UserCheck,
  UserX,
} from "lucide-angular";

import { createUser, listUsers, toggleUserActive } from "@/lib/api/users";
import { isApiMode } from "@/lib/api/config";
import { normalizeEmail } from "@/lib/auth/policy";
import {
  PERMISSION_LABEL,
  ROLE_IS_SCOPED,
  ROLE_LABEL,
  ROLE_PERMISSIONS,
  type Permission,
  type RoleId,
} from "@/lib/permissions";
import type { MessageKey } from "@/lib/i18n";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiDialogComponent } from "../shared/ui/dialog.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

const ROLES = Object.keys(ROLE_LABEL) as RoleId[];

/** Port de src/routes/utilisateurs.tsx — liste, matrice, création, activation. */
@Component({
  selector: "app-utilisateurs-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiDialogComponent,
    UiPageHeaderComponent,
    UiPillComponent,
  ],
  template: `
    <app-shell perm="user.manage" [area]="t()('utilisateurs.area')">
      <ui-page-header
        [eyebrow]="t()('utilisateurs.eyebrow')"
        [title]="t()('utilisateurs.title')"
      >
        @if (tab() === 'users') {
          <button
            actions
            type="button"
            class="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
            (click)="newOpen.set(true)"
          >
            <lucide-angular [img]="icons.plus" class="size-4" />
            {{ t()("utilisateurs.new") }}
          </button>
        }
      </ui-page-header>

      @if (flash()) {
        <p class="mb-3 rounded-md border border-border bg-muted/50 px-3 py-2 text-sm">{{ flash() }}</p>
      }

      <div class="mb-4 flex gap-2 border-b pb-1">
        <button
          type="button"
          class="rounded-md px-3 py-2 text-sm font-medium"
          [class.bg-muted]="tab() === 'users'"
          [class.text-foreground]="tab() === 'users'"
          [class.text-muted-foreground]="tab() !== 'users'"
          (click)="setTab('users')"
        >
          {{ t()("utilisateurs.tab.users") }}
        </button>
        <button
          type="button"
          class="rounded-md px-3 py-2 text-sm font-medium"
          [class.bg-muted]="tab() === 'roles'"
          [class.text-foreground]="tab() === 'roles'"
          [class.text-muted-foreground]="tab() !== 'roles'"
          (click)="setTab('roles')"
        >
          {{ t()("utilisateurs.tab.roles") }}
        </button>
      </div>

      @if (tab() === 'users') {
        @if (apiLoading()) {
          <p class="mb-3 text-sm text-muted-foreground">{{ t()("utilisateurs.tab.users") }}…</p>
        }
        <div class="surface mb-3 p-3">
          <div class="relative">
            <lucide-angular
              [img]="icons.search"
              class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              class="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              [attr.aria-label]="t()('utilisateurs.col.name')"
              [ngModel]="q()"
              (ngModelChange)="onQChange($event)"
            />
          </div>
        </div>
        <div class="surface overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th class="px-4 py-3">{{ t()("utilisateurs.col.name") }}</th>
                <th>{{ t()("utilisateurs.col.email") }}</th>
                <th>{{ t()("utilisateurs.col.phone") }}</th>
                <th>{{ t()("utilisateurs.col.role") }}</th>
                <th>{{ t()("utilisateurs.col.devices") }}</th>
                <th>{{ t()("utilisateurs.col.scope") }}</th>
                <th>{{ t()("utilisateurs.col.state") }}</th>
                <th class="w-12 pr-4" aria-hidden="true"></th>
              </tr>
            </thead>
            <tbody class="divide-y">
              @for (u of shownUsers(); track u.id) {
                <tr>
                  <td class="px-4 py-3 font-medium">{{ u.name }}</td>
                  <td class="break-all">{{ u.email }}</td>
                  <td class="tabular">{{ u.phone || t()("utilisateurs.phoneNone") }}</td>
                  <td>{{ locale.tEnum("role", u.role) }}</td>
                  <td>
                    @if (devicesOf(u.id).length) {
                      <a
                        [routerLink]="['/appareils']"
                        [queryParams]="{ user: u.id }"
                        class="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                      >
                        <lucide-angular [img]="icons.phone" class="size-3.5" />
                        {{
                          t()("utilisateurs.devicesActive", {
                            active: devicesOf(u.id).filter((d) => d.active).length,
                            total: devicesOf(u.id).length,
                          })
                        }}
                      </a>
                    } @else {
                      <span class="text-muted-foreground">{{ t()("utilisateurs.devicesNone") }}</span>
                    }
                  </td>
                  <td>
                    {{ u.scoopId ? scoopName(u.scoopId) : t()("utilisateurs.scopeAll") }}
                  </td>
                  <td>
                    @if (u.active) {
                      <ui-pill tone="success">{{ t()("utilisateurs.state.active") }}</ui-pill>
                    } @else {
                      <ui-pill tone="neutral">{{ t()("utilisateurs.state.inactive") }}</ui-pill>
                    }
                  </td>
                  <td class="relative pr-4 text-right" data-user-menu (click)="$event.stopPropagation()">
                    <button
                      type="button"
                      class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input text-muted-foreground hover:bg-muted pointer-coarse:size-touch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      [attr.aria-expanded]="userMenuOpenId() === u.id"
                      [attr.aria-label]="t()('utilisateurs.action.menu')"
                      (click)="toggleUserMenu(u.id, $event)"
                    >
                      <lucide-angular [img]="icons.more" class="size-4" />
                    </button>
                    @if (userMenuOpenId() === u.id) {
                      <div
                        class="absolute right-4 z-20 mt-1 min-w-56 rounded-md border bg-popover p-1 text-left text-sm shadow-md"
                        data-user-menu
                      >
                        @if (store.can('device.manage')) {
                          <a
                            [routerLink]="['/appareils']"
                            [queryParams]="{ user: u.id }"
                            class="flex w-full items-center gap-2 rounded px-2 py-1.5 hover:bg-muted"
                            (click)="userMenuOpenId.set(null)"
                          >
                            <lucide-angular [img]="icons.phone" class="size-4 shrink-0" />
                            {{ t()("utilisateurs.action.devices") }}
                          </a>
                        }
                        @if (store.can('account.manage')) {
                          <a
                            [routerLink]="['/comptes']"
                            [queryParams]="{
                              vue: hasLink(u.id) ? 'liees' : 'a-rapprocher',
                            }"
                            class="flex w-full items-center gap-2 rounded px-2 py-1.5 hover:bg-muted"
                            (click)="userMenuOpenId.set(null)"
                          >
                            <lucide-angular [img]="icons.link" class="size-4 shrink-0" />
                            {{
                              hasLink(u.id)
                                ? t()("utilisateurs.action.linked")
                                : t()("utilisateurs.action.link")
                            }}
                          </a>
                        }
                        @if (store.can('audit.read')) {
                          <a
                            [routerLink]="['/audit']"
                            [queryParams]="{ q: u.name }"
                            class="flex w-full items-center gap-2 rounded px-2 py-1.5 hover:bg-muted"
                            (click)="userMenuOpenId.set(null)"
                          >
                            <lucide-angular [img]="icons.scroll" class="size-4 shrink-0" />
                            {{ t()("utilisateurs.action.audit") }}
                          </a>
                        }
                        @if (u.active) {
                          <button
                            type="button"
                            class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-danger-fg hover:bg-muted"
                            (click)="deactivateUser(u); userMenuOpenId.set(null)"
                          >
                            <lucide-angular [img]="icons.userX" class="size-4 shrink-0" />
                            {{ t()("utilisateurs.action.deactivate") }}
                          </button>
                        } @else {
                          <button
                            type="button"
                            class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-muted"
                            (click)="reactivateUser(u); userMenuOpenId.set(null)"
                          >
                            <lucide-angular [img]="icons.userCheck" class="size-4 shrink-0" />
                            {{ t()("utilisateurs.action.reactivate") }}
                          </button>
                        }
                      </div>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <div class="surface overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="border-b bg-muted text-xs text-muted-foreground">
              <tr>
                <th class="px-4 py-3 text-left">{{ t()("utilisateurs.col.permission") }}</th>
                @for (r of roles; track r) {
                  <th class="px-3">{{ locale.tEnum("role", r) }}</th>
                }
              </tr>
            </thead>
            <tbody class="divide-y">
              @for (p of permissionsList(); track p) {
                <tr>
                  <td class="px-4 py-2.5">{{ permLabel(p) }}</td>
                  @for (r of roles; track r) {
                    <td class="px-1 py-1.5 text-center">
                      @if (ROLE_PERMISSIONS[r].includes(p)) {
                        <span
                          class="mx-auto inline-flex size-7 items-center justify-center rounded-md bg-success-bg text-success-fg"
                          [attr.aria-label]="t()('utilisateurs.yes')"
                        >
                          ✓
                        </span>
                      } @else {
                        <span
                          class="mx-auto inline-flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground"
                          [attr.aria-label]="t()('utilisateurs.no')"
                        >
                          −
                        </span>
                      }
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p class="mt-3 text-xs text-muted-foreground">{{ t()("utilisateurs.rolesNote") }}</p>
      }

      <ui-dialog
        [open]="newOpen()"
        (openChange)="onNewOpen($event)"
        [title]="t()('utilisateurs.new')"
      >
        <div class="space-y-3">
          <label class="block text-sm font-medium">
            {{ t()("utilisateurs.form.name") }}
            <span class="text-destructive">*</span>
            <input
              class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
              [(ngModel)]="formName"
              [placeholder]="t()('utilisateurs.form.namePh')"
              autocomplete="off"
            />
          </label>
          <div>
            <label class="block text-sm font-medium">
              {{ t()("utilisateurs.form.email") }}
              <span class="text-destructive">*</span>
            </label>
            <p class="text-xs text-muted-foreground">{{ t()("utilisateurs.form.emailHint") }}</p>
            <input
              class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
              type="email"
              [(ngModel)]="formEmail"
              [placeholder]="t()('utilisateurs.form.emailPh')"
              autocomplete="off"
              autocapitalize="none"
              spellcheck="false"
            />
            @if (emailError()) {
              <p class="mt-1 text-xs text-destructive">{{ emailError() }}</p>
            }
          </div>
          <div>
            <label class="block text-sm font-medium">{{ t()("utilisateurs.form.phone") }}</label>
            <input
              class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
              [(ngModel)]="formPhone"
              [placeholder]="t()('utilisateurs.form.phonePh')"
              inputmode="tel"
              autocomplete="off"
            />
            @if (phoneError()) {
              <p class="mt-1 text-xs text-destructive">{{ phoneError() }}</p>
            }
          </div>
          <label class="block text-sm font-medium">{{ t()("utilisateurs.form.role") }}</label>
          <select
            class="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            [ngModel]="formRole()"
            (ngModelChange)="formRole.set($event)"
          >
            @for (r of roles; track r) {
              <option [value]="r">{{ locale.tEnum("role", r) }}</option>
            }
          </select>
          @if (ROLE_IS_SCOPED[formRole()]) {
            <label class="mt-1 block text-sm font-medium">{{ t()("utilisateurs.form.scoop") }}</label>
            <select
              class="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              [ngModel]="formScoopId()"
              (ngModelChange)="formScoopId.set($event)"
            >
              @for (s of store.state().scoops; track s.id) {
                <option [value]="s.id">{{ s.name }}</option>
              }
            </select>
          }
        </div>
        <button
          actions
          type="button"
          class="inline-flex h-9 items-center rounded-md border px-4 text-sm"
          (click)="newOpen.set(false)"
        >
          {{ t()("utilisateurs.cancel") }}
        </button>
        <button
          actions
          type="button"
          class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
          [disabled]="!canSubmitNew()"
          (click)="submitNew()"
        >
          {{ t()("utilisateurs.create") }}
        </button>
      </ui-dialog>
    </app-shell>
  `,
})
export default class UtilisateursPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly ROLE_PERMISSIONS = ROLE_PERMISSIONS;
  protected readonly ROLE_IS_SCOPED = ROLE_IS_SCOPED;
  protected readonly roles = ROLES;
  protected readonly icons = {
    search: Search,
    phone: Smartphone,
    plus: Plus,
    more: MoreVertical,
    link: Link2,
    scroll: ScrollText,
    userX: UserX,
    userCheck: UserCheck,
  };

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly qFromRoute = toSignal(
    this.route.queryParamMap.pipe(map((m) => m.get("q") ?? "")),
    { initialValue: "" },
  );

  protected readonly tab = signal<"users" | "roles">("users");
  protected readonly q = signal("");
  protected readonly newOpen = signal(false);
  protected readonly apiLoading = signal(isApiMode());
  protected readonly userMenuOpenId = signal<string | null>(null);
  protected readonly flash = signal<string | null>(null);

  protected formName = "";
  protected formEmail = "";
  protected formPhone = "";
  protected readonly formRole = signal<RoleId>("gestionnaire");
  protected readonly formScoopId = signal("s1");

  constructor() {
    effect(() => this.q.set(this.qFromRoute()));
    if (isApiMode()) void this.loadUsersFromApi();
    else this.apiLoading.set(false);
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(ev: MouseEvent): void {
    const t = ev.target as HTMLElement;
    if (!t.closest("[data-user-menu]")) this.userMenuOpenId.set(null);
  }

  private async loadUsersFromApi(): Promise<void> {
    try {
      const { items } = await listUsers();
      this.store.actions.replaceUsersFromApi(items);
    } catch {
      this.flash.set(this.t()("utilisateurs.title"));
    } finally {
      this.apiLoading.set(false);
    }
  }

  protected readonly shownUsers = computed(() => {
    const needle = this.q().trim().toLowerCase();
    const users = this.store.state().users;
    return users.filter(
      (u) => !needle || `${u.name} ${u.email}`.toLowerCase().includes(needle),
    );
  });

  protected readonly permissionsList = computed(
    () => Object.keys(PERMISSION_LABEL) as Permission[],
  );

  protected readonly emailError = computed(() => {
    const trimmed = this.formEmail.trim();
    const typed = normalizeEmail(this.formEmail);
    const users = this.store.state().users;
    if (trimmed && !typed) return this.t()("utilisateurs.err.emailInvalid");
    if (typed && users.some((u) => u.email === typed)) return this.t()("utilisateurs.err.emailTaken");
    return undefined;
  });

  protected readonly phoneError = computed(() => {
    const p = this.formPhone.trim();
    if (!p) return undefined;
    return /^7[0678]\s?\d{3}\s?\d{2}\s?\d{2}$/.test(p) ? undefined : this.t()("utilisateurs.err.phone");
  });

  onQChange(value: string): void {
    this.q.set(value);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: value.trim() || null },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }

  setTab(v: "users" | "roles"): void {
    this.tab.set(v);
  }

  toggleUserMenu(id: string, ev: Event): void {
    ev.stopPropagation();
    this.userMenuOpenId.update((cur) => (cur === id ? null : id));
  }

  hasLink(userId: string): boolean {
    return this.store.state().links.some((l) => l.userId === userId);
  }

  devicesOf(userId: string) {
    return this.store.state().devices.filter((d) => d.userId === userId);
  }

  scoopName(id: string): string {
    return this.store.state().scoops.find((s) => s.id === id)?.name ?? id;
  }

  permLabel(p: Permission): string {
    return this.t()(`perm.${p}` as MessageKey);
  }

  onNewOpen(open: boolean): void {
    this.newOpen.set(open);
    if (!open) this.resetForm();
  }

  private resetForm(): void {
    this.formName = "";
    this.formEmail = "";
    this.formPhone = "";
    this.formRole.set("gestionnaire");
    this.formScoopId.set("s1");
  }

  canSubmitNew(): boolean {
    const nameOk = this.formName.trim().length >= 3;
    const email = normalizeEmail(this.formEmail);
    return !!(nameOk && email && !this.emailError() && !this.phoneError());
  }

  async submitNew(): Promise<void> {
    if (!this.canSubmitNew()) return;
    const email = normalizeEmail(this.formEmail)!;
    const role = this.formRole();
    const payload = {
      name: this.formName.trim(),
      email,
      phone: this.formPhone.trim(),
      role,
      scoopId: ROLE_IS_SCOPED[role] ? this.formScoopId() : undefined,
    };

    if (isApiMode()) {
      try {
        const created = await createUser({
          name: payload.name,
          email: payload.email,
          role: payload.role,
          ...(payload.scoopId ? { scoopId: payload.scoopId } : {}),
          ...(payload.phone ? { phone: payload.phone } : {}),
        });
        this.store.actions.addUser({
          id: created.id,
          name: created.name,
          email: created.email,
          phone: created.phone ?? "",
          role: created.role,
          scoopId: created.scoopId ?? undefined,
        });
      } catch {
        this.flash.set(this.t()("utilisateurs.toast.created"));
        return;
      }
    } else {
      this.store.actions.addUser(payload);
    }

    this.flash.set(this.t()("utilisateurs.toast.created"));
    this.newOpen.set(false);
    this.resetForm();
  }

  async deactivateUser(u: { id: string; name: string }): Promise<void> {
    if (isApiMode()) {
      try {
        await toggleUserActive(u.id);
      } catch {
        this.flash.set(this.t()("utilisateurs.toast.deactivated"));
        return;
      }
    }
    this.store.actions.toggleUser(u.id);
    this.flash.set(this.t()("utilisateurs.toast.deactivated"));
  }

  async reactivateUser(u: { id: string; name: string }): Promise<void> {
    if (isApiMode()) {
      try {
        await toggleUserActive(u.id);
      } catch {
        this.flash.set(this.t()("utilisateurs.toast.reactivated"));
        return;
      }
    }
    this.store.actions.toggleUser(u.id);
    this.flash.set(this.t()("utilisateurs.toast.reactivated"));
  }
}

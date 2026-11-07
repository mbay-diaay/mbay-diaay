import {
  Component,
  computed,
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
  Ban,
  Eye,
  LogOut,
  MoreVertical,
  Pencil,
  RefreshCw,
  RotateCcw,
  ScrollText,
  Search,
  Smartphone,
  UserCog,
  X,
} from "lucide-angular";

import { fmtDate, fmtDateTime, nf } from "@/lib/format";
import type { Device } from "@/lib/mock/data";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiDialogComponent } from "../shared/ui/dialog.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

type Filter = "tous" | "actif" | "révoqué";
type ConfirmKind = "revoke" | "reactivate" | "signout";

/** Port de src/routes/appareils.tsx — liste, détail, renommage, confirmations. */
@Component({
  selector: "app-appareils-page",
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
    <app-shell perm="device.manage" [area]="t()('appareils.area')">
      <ui-page-header
        [eyebrow]="t()('appareils.eyebrow')"
        [title]="t()('appareils.title')"
        [description]="t()('appareils.description')"
      >
        <div actions class="flex flex-wrap gap-2">
          <ui-pill tone="success">{{ t()("appareils.count.active", { n: nf.format(activeCount()) }) }}</ui-pill>
          <ui-pill tone="neutral">{{
            t()("appareils.count.revoked", { n: nf.format(devices().length - activeCount()) })
          }}</ui-pill>
        </div>
      </ui-page-header>

      @if (flash()) {
        <p class="mb-3 rounded-md border border-border bg-muted/50 px-3 py-2 text-sm">{{ flash() }}</p>
      }

      @if (filterUser(); as fu) {
        <div class="mb-3 flex flex-wrap items-center gap-2 rounded-md bg-info-bg px-3 py-2 text-sm text-info-fg">
          {{ t()("appareils.filter.of") }} <strong>{{ fu.name }}</strong>
          <button
            type="button"
            class="ml-auto inline-flex items-center gap-1 text-xs font-semibold hover:underline"
            (click)="clearUserFilter()"
          >
            <lucide-angular [img]="icons.x" class="size-3.5" />
            {{ t()("appareils.filter.all") }}
          </button>
        </div>
      }

      <div class="surface mb-3 flex flex-wrap items-center gap-3 p-3">
        <div class="flex flex-wrap gap-1 rounded-md border bg-muted/40 p-1">
          @for (opt of filterOptions; track opt.value) {
            <button
              type="button"
              class="rounded px-2.5 py-1 text-xs font-medium"
              [class.bg-background]="filter() === opt.value"
              [class.shadow-sm]="filter() === opt.value"
              (click)="filter.set(opt.value)"
            >
              {{ opt.label }}
            </button>
          }
        </div>
        <div class="relative">
          <lucide-angular
            [img]="icons.search"
            class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            class="flex h-9 w-64 rounded-md border border-input bg-background pl-8 pr-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            [attr.aria-label]="t()('appareils.search')"
            [placeholder]="t()('appareils.search')"
            [ngModel]="q()"
            (ngModelChange)="q.set($event)"
          />
        </div>
      </div>

      <div class="surface overflow-x-auto">
        @if (rows().length) {
          <table class="w-full text-sm">
            <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th class="py-3 pl-4 font-semibold">{{ t()("appareils.col.device") }}</th>
                <th class="font-semibold">{{ t()("appareils.col.user") }}</th>
                <th class="hidden font-semibold md:table-cell">{{ t()("appareils.col.registered") }}</th>
                <th class="font-semibold">{{ t()("appareils.col.lastActive") }}</th>
                <th class="font-semibold">{{ t()("appareils.col.status") }}</th>
                <th class="w-12 pr-4" aria-hidden="true"></th>
              </tr>
            </thead>
            <tbody class="divide-y">
              @for (d of rows(); track d.id) {
                <tr class="cursor-pointer hover:bg-muted/40" (click)="openDetail(d.id)">
                  <td class="py-2.5 pl-4">
                    <span class="flex items-center gap-2 font-medium">
                      <lucide-angular [img]="icons.phone" class="size-4 text-muted-foreground" />
                      {{ d.label }}
                    </span>
                  </td>
                  <td>
                    @if (user(d.userId); as u) {
                      <a
                        [routerLink]="['/utilisateurs']"
                        [queryParams]="{ q: u.name }"
                        (click)="$event.stopPropagation()"
                        class="font-medium hover:text-primary hover:underline"
                      >
                        {{ u.name }}
                      </a>
                      <div class="text-xs text-muted-foreground">{{ locale.tEnum("role", u.role) }}</div>
                    } @else {
                      {{ t()("appareils.unknown") }}
                    }
                  </td>
                  <td class="hidden whitespace-nowrap text-muted-foreground md:table-cell">
                    {{ fmtDate(d.registeredAt) }}
                  </td>
                  <td class="whitespace-nowrap text-muted-foreground">{{ fmtDate(d.lastActiveAt) }}</td>
                  <td>
                    @if (d.active) {
                      <ui-pill tone="success">{{ t()("appareils.state.active") }}</ui-pill>
                    } @else {
                      <ui-pill tone="neutral">{{ t()("appareils.state.revoked") }}</ui-pill>
                    }
                  </td>
                  <td class="relative pr-4 text-right" data-device-menu (click)="$event.stopPropagation()">
                    <button
                      type="button"
                      class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input text-muted-foreground hover:bg-muted pointer-coarse:size-touch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      [attr.aria-expanded]="deviceMenuOpenId() === d.id"
                      [attr.aria-label]="t()('appareils.action.menu')"
                      (click)="toggleDeviceMenu(d.id, $event)"
                    >
                      <lucide-angular [img]="icons.more" class="size-4" />
                    </button>
                    @if (deviceMenuOpenId() === d.id) {
                      <div
                        class="absolute right-4 z-20 mt-1 min-w-56 rounded-md border bg-popover p-1 text-left text-sm shadow-md"
                        data-device-menu
                      >
                        <button
                          type="button"
                          class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-muted"
                          (click)="openDetail(d.id); deviceMenuOpenId.set(null)"
                        >
                          <lucide-angular [img]="icons.eye" class="size-4 shrink-0" />
                          {{ t()("appareils.action.detail") }}
                        </button>
                        <button
                          type="button"
                          class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-muted"
                          (click)="openRename(d); deviceMenuOpenId.set(null)"
                        >
                          <lucide-angular [img]="icons.pencil" class="size-4 shrink-0" />
                          {{ t()("appareils.action.rename") }}
                        </button>
                        @if (d.active) {
                          <button
                            type="button"
                            class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-muted"
                            (click)="resync(d); deviceMenuOpenId.set(null)"
                          >
                            <lucide-angular [img]="icons.refresh" class="size-4 shrink-0" />
                            {{ t()("appareils.action.resync") }}
                          </button>
                        }
                        @if (store.can('user.manage')) {
                          <a
                            [routerLink]="['/utilisateurs']"
                            [queryParams]="{ q: user(d.userId)?.name ?? '' }"
                            class="flex w-full items-center gap-2 rounded px-2 py-1.5 hover:bg-muted"
                            (click)="deviceMenuOpenId.set(null)"
                          >
                            <lucide-angular [img]="icons.userCog" class="size-4 shrink-0" />
                            {{ t()("appareils.action.user") }}
                          </a>
                        }
                        @if (store.can('audit.read')) {
                          <a
                            [routerLink]="['/audit']"
                            [queryParams]="{ q: d.label }"
                            class="flex w-full items-center gap-2 rounded px-2 py-1.5 hover:bg-muted"
                            (click)="deviceMenuOpenId.set(null)"
                          >
                            <lucide-angular [img]="icons.scroll" class="size-4 shrink-0" />
                            {{ t()("appareils.action.audit") }}
                          </a>
                        }
                        @if (d.active) {
                          <button
                            type="button"
                            class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-danger-fg hover:bg-muted"
                            (click)="askConfirm('signout', d); deviceMenuOpenId.set(null)"
                          >
                            <lucide-angular [img]="icons.logOut" class="size-4 shrink-0" />
                            {{ t()("appareils.action.signout") }}
                          </button>
                        }
                        @if (d.active) {
                          <button
                            type="button"
                            class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-danger-fg hover:bg-muted"
                            (click)="askConfirm('revoke', d); deviceMenuOpenId.set(null)"
                          >
                            <lucide-angular [img]="icons.ban" class="size-4 shrink-0" />
                            {{ t()("appareils.action.revoke") }}
                          </button>
                        } @else {
                          <button
                            type="button"
                            class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-muted"
                            (click)="askConfirm('reactivate', d); deviceMenuOpenId.set(null)"
                          >
                            <lucide-angular [img]="icons.rotate" class="size-4 shrink-0" />
                            {{ t()("appareils.action.reactivate") }}
                          </button>
                        }
                      </div>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        } @else {
          <div class="px-4 py-10 text-center text-muted-foreground">
            <lucide-angular [img]="icons.phone" class="mx-auto mb-2 size-10 opacity-50" />
            <div class="font-semibold text-foreground">{{ t()("appareils.empty.title") }}</div>
            <p class="mt-1 text-sm">{{ t()("appareils.empty.desc") }}</p>
          </div>
        }
      </div>

      @if (detailDevice(); as detail) {
        <div class="fixed inset-0 z-40 flex justify-end">
          <div class="absolute inset-0 bg-black/40" (click)="closeDetail()"></div>
          <aside
            class="relative z-50 flex h-full w-full max-w-md flex-col overflow-y-auto border-l bg-card p-5 shadow-lg"
          >
            <div class="flex items-start justify-between gap-2">
              <h2 class="flex items-center gap-2 text-lg font-semibold">
                <lucide-angular [img]="icons.phone" class="size-5 text-primary" />
                {{ detail.label }}
              </h2>
              <button
                type="button"
                class="rounded-md p-1 text-muted-foreground hover:bg-muted"
                [attr.aria-label]="t()('common.close')"
                (click)="closeDetail()"
              >
                <lucide-angular [img]="icons.x" class="size-5" />
              </button>
            </div>
            <div class="mt-2">
              @if (detail.active) {
                <ui-pill tone="success">{{ t()("appareils.state.active") }}</ui-pill>
              } @else {
                <ui-pill tone="neutral">{{ t()("appareils.state.revoked") }}</ui-pill>
              }
            </div>
            <dl class="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt class="text-xs text-muted-foreground">{{ t()("appareils.col.user") }}</dt>
                <dd class="mt-0.5">
                  @if (user(detail.userId); as ud) {
                    <a
                      [routerLink]="['/utilisateurs']"
                      [queryParams]="{ q: ud.name }"
                      class="text-primary hover:underline"
                    >
                      {{ ud.name }}
                    </a>
                  } @else {
                    {{ t()("appareils.unknown") }}
                  }
                </dd>
              </div>
              <div>
                <dt class="text-xs text-muted-foreground">{{ t()("appareils.detail.role") }}</dt>
                <dd class="mt-0.5">
                  @if (user(detail.userId); as ud) {
                    {{ locale.tEnum("role", ud.role) }}
                  } @else {
                    {{ t()("appareils.unknown") }}
                  }
                </dd>
              </div>
              <div>
                <dt class="text-xs text-muted-foreground">{{ t()("appareils.col.registered") }}</dt>
                <dd class="mt-0.5">{{ fmtDate(detail.registeredAt) }}</dd>
              </div>
              <div>
                <dt class="text-xs text-muted-foreground">{{ t()("appareils.col.lastActive") }}</dt>
                <dd class="mt-0.5">{{ fmtDate(detail.lastActiveAt) }}</dd>
              </div>
              <div class="col-span-2">
                <dt class="text-xs text-muted-foreground">{{ t()("appareils.detail.id") }}</dt>
                <dd class="mt-0.5 font-mono text-xs">{{ detail.id }}</dd>
              </div>
            </dl>
            <div class="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                class="inline-flex h-8 items-center gap-1.5 rounded-md border border-input px-2 text-xs font-medium"
                (click)="openRename(detail)"
              >
                <lucide-angular [img]="icons.pencil" class="size-4" />
                {{ t()("appareils.detail.rename") }}
              </button>
              @if (detail.active) {
                <button
                  type="button"
                  class="inline-flex h-8 items-center gap-1.5 rounded-md border border-input px-2 text-xs font-medium"
                  (click)="resync(detail)"
                >
                  <lucide-angular [img]="icons.refresh" class="size-4" />
                  {{ t()("appareils.detail.resync") }}
                </button>
              }
              @if (detail.active) {
                <button
                  type="button"
                  class="inline-flex h-8 items-center gap-1.5 rounded-md border border-input px-2 text-xs font-medium text-danger-fg"
                  (click)="askConfirm('revoke', detail)"
                >
                  <lucide-angular [img]="icons.ban" class="size-4" />
                  {{ t()("appareils.detail.revoke") }}
                </button>
              } @else {
                <button
                  type="button"
                  class="inline-flex h-8 items-center gap-1.5 rounded-md border border-input px-2 text-xs font-medium"
                  (click)="askConfirm('reactivate', detail)"
                >
                  <lucide-angular [img]="icons.rotate" class="size-4" />
                  {{ t()("appareils.detail.reactivate") }}
                </button>
              }
            </div>
            <div class="mt-6">
              <div class="eyebrow mb-2">{{ t()("appareils.history") }}</div>
              @if (detailHistory().length) {
                <ul class="divide-y text-sm">
                  @for (h of detailHistory(); track h.id) {
                    <li class="py-2">
                      <div class="font-medium">{{ h.action }}</div>
                      <div class="text-xs text-muted-foreground">
                        {{ h.user }} · {{ fmtDateTime(h.at) }}
                      </div>
                    </li>
                  }
                </ul>
              } @else {
                <p class="text-sm text-muted-foreground">{{ t()("appareils.history.empty") }}</p>
              }
              <a
                [routerLink]="['/audit']"
                [queryParams]="{ q: detail.label }"
                class="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
              >
                {{ t()("appareils.history.open") }}
              </a>
            </div>
          </aside>
        </div>
      }

      <ui-dialog
        [open]="renameOpen()"
        (openChange)="onRenameOpen($event)"
        [title]="t()('appareils.rename.title')"
      >
        <p class="mb-3 text-sm text-muted-foreground">{{ t()("appareils.rename.desc") }}</p>
        <label class="block text-sm font-medium">{{ t()("appareils.rename.field") }}</label>
        <input
          class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
          [(ngModel)]="renameLabel"
          [placeholder]="t()('appareils.rename.placeholder')"
        />
        <button
          actions
          type="button"
          class="inline-flex h-9 items-center rounded-md border px-4 text-sm"
          (click)="renameOpen.set(false)"
        >
          {{ t()("common.cancel") }}
        </button>
        <button
          actions
          type="button"
          class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
          [disabled]="!canSubmitRename()"
          (click)="submitRename()"
        >
          {{ t()("appareils.rename.submit") }}
        </button>
      </ui-dialog>

      <ui-dialog [open]="!!confirm()" (openChange)="onConfirmOpen($event)" [title]="confirmTitle()">
        <p class="text-sm">
          {{ t()("appareils.confirm.device") }}
          <span class="font-semibold">{{ confirm()?.device.label }}</span>
          {{ t()("appareils.confirm.of") }}
          {{ user(confirm()!.device.userId)?.name ?? t()("appareils.unknown") }}.
          @if (confirm()?.kind === 'revoke') {
            {{ t()("appareils.confirm.revoke.note") }}
          }
          @if (confirm()?.kind === 'reactivate') {
            {{ t()("appareils.confirm.reactivate.note") }}
          }
          @if (confirm()?.kind === 'signout') {
            {{ t()("appareils.confirm.signout.note") }}
          }
        </p>
        <p class="mt-3 rounded-md bg-warning-bg p-3 text-sm text-warning-fg">
          {{ t()("appareils.confirm.demo") }}
        </p>
        <p class="mt-2 text-xs text-muted-foreground">{{ t()("appareils.confirm.desc") }}</p>
        <button
          actions
          type="button"
          class="inline-flex h-9 items-center rounded-md border px-4 text-sm"
          (click)="confirm.set(null)"
        >
          {{ t()("common.cancel") }}
        </button>
        @if (confirm()?.kind === 'reactivate') {
          <button
            actions
            type="button"
            class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            (click)="runConfirm()"
          >
            {{ confirmSubmitLabel() }}
          </button>
        } @else {
          <button
            actions
            type="button"
            class="inline-flex h-9 items-center rounded-md bg-destructive px-4 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
            (click)="runConfirm()"
          >
            {{ confirmSubmitLabel() }}
          </button>
        }
      </ui-dialog>
    </app-shell>
  `,
})
export default class AppareilsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly fmtDate = fmtDate;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly icons = {
    search: Search,
    phone: Smartphone,
    x: X,
    more: MoreVertical,
    eye: Eye,
    pencil: Pencil,
    refresh: RefreshCw,
    rotate: RotateCcw,
    userCog: UserCog,
    scroll: ScrollText,
    logOut: LogOut,
    ban: Ban,
  };

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly userParam = toSignal(
    this.route.queryParamMap.pipe(map((m) => m.get("user"))),
    { initialValue: null as string | null },
  );

  protected readonly q = signal("");
  protected readonly filter = signal<Filter>("tous");
  protected readonly detailId = signal<string | undefined>(undefined);
  protected readonly renameOpen = signal(false);
  protected readonly renameId = signal<string | null>(null);
  protected renameLabel = "";
  protected readonly confirm = signal<{ kind: ConfirmKind; device: Device } | null>(null);
  protected readonly deviceMenuOpenId = signal<string | null>(null);
  protected readonly flash = signal<string | null>(null);

  protected readonly filterOptions = [
    { value: "tous" as const, label: "" },
    { value: "actif" as const, label: "" },
    { value: "révoqué" as const, label: "" },
  ];

  constructor() {
    const t = this.t();
    this.filterOptions[0].label = t("appareils.seg.all");
    this.filterOptions[1].label = t("appareils.seg.active");
    this.filterOptions[2].label = t("appareils.seg.revoked");
  }

  protected readonly devices = computed(() => this.store.state().devices);

  protected readonly activeCount = computed(
    () => this.devices().filter((d) => d.active).length,
  );

  protected readonly filterUser = computed(() => {
    const id = this.userParam();
    if (!id) return undefined;
    return this.store.state().users.find((u) => u.id === id);
  });

  protected readonly rows = computed(() => {
    const uid = this.userParam();
    const f = this.filter();
    const needle = this.q().trim().toLowerCase();
    const users = this.store.state().users;
    return this.devices()
      .filter((d) => !uid || d.userId === uid)
      .filter((d) => (f === "tous" ? true : f === "actif" ? d.active : !d.active))
      .filter((d) => {
        if (!needle) return true;
        const u = users.find((x) => x.id === d.userId);
        return `${d.label} ${u?.name ?? ""}`.toLowerCase().includes(needle);
      });
  });

  protected readonly detailDevice = computed(() => {
    const id = this.detailId();
    if (!id) return undefined;
    return this.store.state().devices.find((d) => d.id === id);
  });

  protected readonly detailHistory = computed(() => {
    const detail = this.detailDevice();
    if (!detail) return [];
    return this.store.state().audit.filter((a) => a.detail.includes(detail.label));
  });

  @HostListener("document:click", ["$event"])
  onDocumentClick(ev: MouseEvent): void {
    const t = ev.target as HTMLElement;
    if (!t.closest("[data-device-menu]")) this.deviceMenuOpenId.set(null);
  }

  user(userId: string) {
    return this.store.state().users.find((u) => u.id === userId);
  }

  clearUserFilter(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { user: null },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }

  openDetail(id: string): void {
    this.detailId.set(id);
  }

  closeDetail(): void {
    this.detailId.set(undefined);
  }

  toggleDeviceMenu(id: string, ev: Event): void {
    ev.stopPropagation();
    this.deviceMenuOpenId.update((cur) => (cur === id ? null : id));
  }

  openRename(d: Device): void {
    this.renameId.set(d.id);
    this.renameLabel = d.label;
    this.renameOpen.set(true);
  }

  onRenameOpen(open: boolean): void {
    this.renameOpen.set(open);
    if (!open) {
      this.renameId.set(null);
      this.renameLabel = "";
    }
  }

  canSubmitRename(): boolean {
    const id = this.renameId();
    if (!id) return false;
    const trimmed = this.renameLabel.trim();
    if (trimmed.length < 3) return false;
    const cur = this.store.state().devices.find((d) => d.id === id)?.label;
    return trimmed !== cur;
  }

  submitRename(): void {
    const id = this.renameId();
    if (!id || !this.canSubmitRename()) return;
    this.store.actions.renameDevice(id, this.renameLabel.trim());
    this.flash.set(this.t()("appareils.toast.renamed"));
    this.renameOpen.set(false);
    this.renameId.set(null);
    this.renameLabel = "";
  }

  askConfirm(kind: ConfirmKind, device: Device): void {
    this.confirm.set({ kind, device });
  }

  onConfirmOpen(open: boolean): void {
    if (!open) this.confirm.set(null);
  }

  confirmTitle(): string {
    const c = this.confirm();
    if (!c) return "";
    if (c.kind === "revoke") return this.t()("appareils.confirm.revoke.title");
    if (c.kind === "reactivate") return this.t()("appareils.confirm.reactivate.title");
    return this.t()("appareils.confirm.signout.title");
  }

  confirmSubmitLabel(): string {
    const c = this.confirm();
    if (!c) return "";
    if (c.kind === "revoke") return this.t()("appareils.confirm.revoke.submit");
    if (c.kind === "reactivate") return this.t()("appareils.confirm.reactivate.submit");
    return this.t()("appareils.confirm.signout.submit");
  }

  runConfirm(): void {
    const c = this.confirm();
    if (!c) return;
    const { kind, device } = c;
    if (kind === "revoke") this.store.actions.revokeDevice(device.id);
    if (kind === "reactivate") this.store.actions.reactivateDevice(device.id);
    if (kind === "signout") this.store.actions.signOutDevice(device.id);
    const msg =
      kind === "revoke"
        ? this.t()("appareils.toast.revoked")
        : kind === "reactivate"
          ? this.t()("appareils.toast.reactivated")
          : this.t()("appareils.toast.signedOut");
    this.flash.set(`${msg} — ${this.t()("appareils.toast.audited")}`);
    this.confirm.set(null);
  }

  resync(d: Device): void {
    this.store.actions.resyncDevice(d.id);
    this.flash.set(
      `${this.t()("appareils.toast.resync")} — ${this.t()("appareils.toast.resyncDesc")}`,
    );
  }
}

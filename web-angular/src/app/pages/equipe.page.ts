import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { LucideAngularModule, Search, UserPlus, Users } from "lucide-angular";

import { MEMBERSHIP_STATUSES, type Member, type MembershipStatus } from "@/lib/mock/cooperative";
import { membershipCounts } from "@/lib/membership";
import { inScope, scopedMembers } from "@/lib/scope";
import { nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { ROLE_LABEL } from "@/lib/permissions";
import { AccessDeniedError } from "@/lib/store";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiModalA11yDirective } from "../shared/ui/modal-a11y.directive";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent, type UiPillTone } from "../shared/ui/pill.component";

const ALL = "tous" as const;
type StatusFilter = MembershipStatus | typeof ALL;

const TONE: Record<MembershipStatus, UiPillTone> = {
  membre: "success",
  candidat: "info",
  suspendu: "warning",
  sorti: "neutral",
};
const STATUS_LABEL: Record<MembershipStatus, MessageKey> = {
  membre: "equipe.status.membre",
  candidat: "equipe.status.candidat",
  suspendu: "equipe.status.suspendu",
  sorti: "equipe.status.sorti",
};

/** Âge valide : vide, ou entier de 15 à 100 (aligné sur MemberProfileFields / equipe.tsx). */
function parseAge(raw: string): { ok: boolean; value: number | null } {
  const text = raw.trim();
  if (!text) return { ok: true, value: null };
  if (!/^\d{1,3}$/.test(text)) return { ok: false, value: null };
  const n = Number(text);
  return n >= 15 && n <= 100 ? { ok: true, value: n } : { ok: false, value: null };
}

/** Port de equipe.tsx — liste membres, filtres, ajout, changement de statut, fiche latérale. */
@Component({
  selector: "app-equipe-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiChipRailComponent,
    UiEmptyComponent,
    UiModalA11yDirective,
    UiPageHeaderComponent,
    UiPillComponent,
    UiButtonComponent,
  ],
  template: `
    <app-shell perm="member.read" [area]="t()('equipe.area')">
      <ui-page-header
        [eyebrow]="t()('equipe.eyebrow')"
        [title]="t()('equipe.title')"
        [description]="t()('equipe.description')"
      >
        @if (canManage()) {
          <ui-button actions (click)="openAdd(); $event.stopPropagation()">
            <lucide-angular [img]="icons.userPlus" class="size-4" />
            {{ t()("equipe.add") }}
          </ui-button>
        }
      </ui-page-header>

      @if (feedback(); as fb) {
        <p
          class="mb-3 rounded-md border border-border bg-muted/50 px-3 py-2 text-sm"
          [class.text-destructive]="fb.kind === 'error'"
        >
          {{ fb.text }}
        </p>
      }

      <p class="mb-5 text-sm leading-relaxed text-muted-foreground">
        {{
          t()("equipe.summary", {
            active: nf.format(counts().active),
            roster: nf.format(counts().roster),
          })
        }}
      </p>

      <div class="toolbar-surface">
        <div class="relative w-full sm:max-w-md">
          <lucide-angular
            [img]="icons.search"
            class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            class="flex h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm shadow-sm pointer-coarse:h-touch focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            [attr.aria-label]="t()('equipe.search.aria')"
            [placeholder]="t()('equipe.search.placeholder')"
            [ngModel]="q()"
            (ngModelChange)="q.set($event)"
          />
        </div>
        <ui-chip-rail>
          <button
            type="button"
            class="chip-filter"
            [class.chip-filter-active]="status() === 'tous'"
            [attr.aria-pressed]="status() === 'tous'"
            (click)="status.set('tous')"
          >
            {{ t()("equipe.filter.all") }}
            <span class="chip-filter-count">{{ nf.format(mine().length) }}</span>
          </button>
          @for (s of statuses; track s) {
            <button
              type="button"
              class="chip-filter"
              [class.chip-filter-active]="status() === s"
              [attr.aria-pressed]="status() === s"
              (click)="status.set(status() === s ? 'tous' : s)"
            >
              {{ t()(statusLabel[s]) }}
              <span class="chip-filter-count">{{ nf.format(statusCount(s)) }}</span>
            </button>
          }
        </ui-chip-rail>
      </div>

      <div class="surface overflow-x-auto">
        @if (shown().length) {
          <table class="w-full min-w-[40rem] border-separate border-spacing-0 text-sm">
            <thead class="border-b bg-muted/60 text-left">
              <tr>
                <th class="table-cell-head">{{ t()("equipe.col.member") }}</th>
                <th class="table-cell-head">{{ t()("equipe.col.status") }}</th>
                <th class="table-cell-head hidden md:table-cell">{{ t()("equipe.col.org") }}</th>
                <th class="table-cell-head hidden sm:table-cell">{{ t()("equipe.col.producer") }}</th>
                <th class="table-cell-head min-w-[10rem]">{{ t()("equipe.col.access") }}</th>
                <th class="table-cell-head min-w-[16rem] text-right" aria-hidden="true"></th>
              </tr>
            </thead>
            <tbody>
              @for (m of shown(); track m.id) {
                <tr
                  class="cursor-pointer border-t border-border transition-colors hover:bg-muted/50"
                  tabindex="0"
                  (click)="sheetMemberId.set(m.id)"
                  (keydown)="onRowKey($event, m.id)"
                >
                  <td class="table-cell pr-6">
                    <div class="font-semibold leading-snug text-foreground">
                      {{ m.firstName }} {{ m.lastName }}
                    </div>
                    <div class="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {{ m.email || t()("equipe.noEmail") }}
                    </div>
                  </td>
                  <td class="table-cell pr-6">
                    <ui-pill [tone]="tone[m.status]">{{ t()(statusLabel[m.status]) }}</ui-pill>
                  </td>
                  <td class="table-cell hidden pr-6 text-muted-foreground md:table-cell">
                    {{ orgName(m.orgId) }}
                  </td>
                  <td
                    class="table-cell hidden pr-6 sm:table-cell"
                    (click)="$event.stopPropagation()"
                  >
                    @if (producerCode(m.producerId); as code) {
                      <a
                        [routerLink]="['/producteurs', m.producerId]"
                        class="font-medium text-primary hover:underline"
                        >{{ code }}</a
                      >
                    } @else {
                      <span class="text-muted-foreground">{{ t()("equipe.notProducer") }}</span>
                    }
                  </td>
                  <td class="table-cell border-l border-border/70 pl-5 pr-6">
                    @if (userOf(m.id); as u) {
                      <div class="flex flex-col gap-1">
                        <span
                          class="text-sm font-medium leading-snug"
                          [class.text-muted-foreground]="!u.active"
                          [class.text-foreground]="u.active"
                        >
                          {{ roleLabel[u.role] }}
                        </span>
                        @if (!u.active) {
                          <span class="text-xs text-muted-foreground">{{ t()("equipe.closed") }}</span>
                        }
                      </div>
                    } @else {
                      <span class="text-sm text-muted-foreground">{{ t()("equipe.noAccess") }}</span>
                    }
                  </td>
                  <td class="table-cell text-right" (click)="$event.stopPropagation()">
                    <div class="inline-flex flex-nowrap items-center justify-end gap-2">
                      <ui-button variant="outline" size="sm" (click)="sheetMemberId.set(m.id)">
                        {{ t()("equipe.row.open") }}
                      </ui-button>
                      @if (canManage()) {
                        <ui-button variant="outline" size="sm" (click)="openStatus(m)">
                          {{ t()("equipe.row.changeStatus") }}
                        </ui-button>
                      }
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        } @else {
          <ui-empty>
            <lucide-angular [img]="icons.users" class="mx-auto mb-2 size-8 text-muted-foreground" />
            <div class="font-semibold">{{ t()("equipe.empty.title") }}</div>
            <p class="mt-1 text-sm text-muted-foreground">
              {{ mine().length ? t()("equipe.empty.filtered") : t()("equipe.empty.none") }}
            </p>
          </ui-empty>
        }
      </div>
      <p class="mt-4 text-xs text-muted-foreground">
        {{
          t()("equipe.count", {
            shown: nf.format(shown().length),
            total: nf.format(mine().length),
          })
        }}
      </p>

      <!-- Fiche membre -->
      @if (sheetMember(); as sm) {
        <div
          class="fixed inset-0 z-50 flex justify-end bg-black/40"
          role="presentation"
          (click)="sheetMemberId.set(undefined)"
        >
          <div
            class="h-full w-full max-w-md overflow-y-auto bg-background p-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            uiModalA11y
            (dismiss)="sheetMemberId.set(undefined)"
            (click)="$event.stopPropagation()"
          >
            <div class="flex items-start justify-between gap-2">
              <h2 class="text-lg font-semibold">
                {{ sm.firstName }} {{ sm.lastName }}
              </h2>
              <ui-button variant="ghost" size="sm" (click)="sheetMemberId.set(undefined)">×</ui-button>
            </div>
            @if (canManage()) {
              <div class="mt-3">
                <ui-button variant="outline" size="sm" (click)="openStatus(sm)">
                  {{ t()("equipe.sheet.changeStatus") }}
                </ui-button>
              </div>
            }
            <dl class="mt-4 grid gap-3 text-sm">
              <div>
                <dt class="text-xs text-muted-foreground">{{ t()("equipe.sheet.status") }}</dt>
                <dd class="mt-1">
                  <ui-pill [tone]="tone[sm.status]">{{ t()(statusLabel[sm.status]) }}</ui-pill>
                </dd>
              </div>
              <div>
                <dt class="text-xs text-muted-foreground">{{ t()("equipe.sheet.email") }}</dt>
                <dd class="mt-1 break-all font-medium">{{ sm.email || t()("equipe.sheet.notSet") }}</dd>
              </div>
              <div>
                <dt class="text-xs text-muted-foreground">{{ t()("equipe.sheet.scoop") }}</dt>
                <dd class="mt-1 font-medium">{{ scoopName(sm.scoopId) }}</dd>
              </div>
              <div>
                <dt class="text-xs text-muted-foreground">{{ t()("equipe.sheet.org") }}</dt>
                <dd class="mt-1 font-medium">{{ orgName(sm.orgId) }}</dd>
              </div>
            </dl>
          </div>
        </div>
      }

      <!-- Ajouter un membre -->
      @if (addOpen()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            class="surface max-h-[90vh] w-full max-w-lg overflow-y-auto p-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            uiModalA11y
            (dismiss)="closeAdd()"
            (click)="$event.stopPropagation()"
          >
            <h2 class="text-lg font-semibold">{{ t()("equipe.add.title") }}</h2>
            <p class="mt-1 text-sm text-muted-foreground">{{ t()("equipe.add.description") }}</p>

            <form class="mt-4 space-y-3" (ngSubmit)="submitAdd()">
              @if (addScoops().length > 1) {
                <label class="block text-sm font-medium">
                  {{ t()("equipe.add.scoop") }} <span class="text-destructive">*</span>
                  <select
                    class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    name="scoopId"
                    [(ngModel)]="addForm.scoopId"
                    (ngModelChange)="addForm.orgId = ''"
                    required
                  >
                    <option value="" disabled>{{ t()("equipe.add.scoopPlaceholder") }}</option>
                    @for (sc of addScoops(); track sc.id) {
                      <option [value]="sc.id">{{ sc.name }}</option>
                    }
                  </select>
                </label>
              }

              <div class="grid grid-cols-2 gap-3">
                <label class="block text-sm font-medium">
                  {{ t()("equipe.add.firstName") }} *
                  <input
                    class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    name="firstName"
                    [(ngModel)]="addForm.firstName"
                    required
                  />
                </label>
                <label class="block text-sm font-medium">
                  {{ t()("equipe.add.lastName") }} *
                  <input
                    class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    name="lastName"
                    [(ngModel)]="addForm.lastName"
                    required
                  />
                </label>
              </div>

              <label class="block text-sm font-medium">
                {{ t()("equipe.add.email") }}
                <span class="text-xs font-normal text-muted-foreground"> — {{ t()("equipe.add.emailHint") }}</span>
                <input
                  type="email"
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  name="email"
                  [(ngModel)]="addForm.email"
                  [placeholder]="t()('equipe.example.email')"
                />
                @if (addEmailError()) {
                  <span class="mt-1 block text-xs text-destructive">{{ addEmailError() }}</span>
                }
              </label>

              <label class="block text-sm font-medium">
                {{ t()("equipe.add.phone") }}
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  name="phone"
                  [(ngModel)]="addForm.phone"
                  [placeholder]="t()('equipe.example.phone')"
                />
              </label>

              <div class="grid grid-cols-2 gap-3">
                <label class="block text-sm font-medium">
                  {{ t()("equipe.add.sex") }}
                  <select
                    class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    name="sex"
                    [(ngModel)]="addForm.sex"
                  >
                    <option value="F">{{ t()("equipe.add.female") }}</option>
                    <option value="H">{{ t()("equipe.add.male") }}</option>
                  </select>
                </label>
                <label class="block text-sm font-medium">
                  {{ t()("equipe.add.status") }}
                  <select
                    class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    name="status"
                    [(ngModel)]="addForm.status"
                  >
                    <option value="membre">{{ t()("equipe.status.membre") }}</option>
                    <option value="candidat">{{ t()("equipe.status.candidat") }}</option>
                  </select>
                </label>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <label class="block text-sm font-medium">
                  {{ t()("equipe.add.age") }}
                  <span class="text-xs font-normal text-muted-foreground"> — {{ t()("equipe.add.ageHint") }}</span>
                  <input
                    inputmode="numeric"
                    class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    name="age"
                    [(ngModel)]="addForm.age"
                  />
                  @if (addForm.age.trim() && !parseAge(addForm.age).ok) {
                    <span class="mt-1 block text-xs text-destructive">{{ t()("equipe.add.ageError") }}</span>
                  }
                </label>
                <label class="block text-sm font-medium">
                  {{ t()("equipe.add.handicap") }}
                  <select
                    class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    name="handicap"
                    [ngModel]="addForm.handicap ? 'oui' : 'non'"
                    (ngModelChange)="addForm.handicap = $event === 'oui'"
                  >
                    <option value="non">{{ t()("equipe.add.handicap.non") }}</option>
                    <option value="oui">{{ t()("equipe.add.handicap.oui") }}</option>
                  </select>
                </label>
              </div>

              <label class="block text-sm font-medium">
                {{ t()("equipe.add.village") }}
                <input
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  name="village"
                  [(ngModel)]="addForm.village"
                />
              </label>

              <label class="block text-sm font-medium">
                {{ t()("equipe.add.org") }}
                <span class="text-xs font-normal text-muted-foreground"> — {{ t()("equipe.add.orgHint") }}</span>
                <select
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  name="orgId"
                  [(ngModel)]="addForm.orgId"
                >
                  <option value="">{{ t()("equipe.directMember") }}</option>
                  @for (o of orgsForAddScoop(); track o.id) {
                    <option [value]="o.id">{{ o.name }}</option>
                  }
                </select>
              </label>

              <div class="mt-6 flex justify-end gap-2">
                <ui-button type="button" variant="outline" (click)="closeAdd()">{{ t()("producteurs.index.cancel") }}</ui-button>
                <ui-button type="submit" [disabled]="!addFormValid()">{{ t()("equipe.add.submit") }}</ui-button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Changer le statut -->
      @if (statusMember(); as stm) {
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            class="surface w-full max-w-md p-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            uiModalA11y
            (dismiss)="closeStatus()"
          >
            <h2 class="text-lg font-semibold">
              {{ t()("equipe.statusDialog.title", { name: stm.firstName + " " + stm.lastName }) }}
            </h2>
            <p class="mt-1 text-sm text-muted-foreground">{{ t()("equipe.statusDialog.description") }}</p>

            <form class="mt-4 space-y-3" (ngSubmit)="submitStatus()">
              <label class="block text-sm font-medium">
                {{ t()("equipe.statusDialog.next") }} *
                <select
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  name="nextStatus"
                  [(ngModel)]="statusNext"
                  required
                >
                  <option value="">{{ t()("equipe.statusDialog.choose") }}</option>
                  @for (s of statusChoices(stm.status); track s) {
                    <option [value]="s">{{ t()(statusLabel[s]) }}</option>
                  }
                </select>
              </label>

              <label class="block text-sm font-medium">
                {{ t()("equipe.statusDialog.reason") }}
                @if (statusNeedsReason()) {
                  <span class="text-destructive"> *</span>
                }
                @if (statusNeedsReason()) {
                  <span class="block text-xs font-normal text-muted-foreground">{{
                    t()("equipe.statusDialog.reasonHint")
                  }}</span>
                }
                <textarea
                  name="statusComment"
                  rows="3"
                  class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  [(ngModel)]="statusComment"
                  [placeholder]="t()('equipe.statusDialog.reasonPlaceholder')"
                ></textarea>
              </label>

              <div class="mt-6 flex justify-end gap-2">
                <ui-button type="button" variant="outline" (click)="closeStatus()">{{ t()("producteurs.index.cancel") }}</ui-button>
                <ui-button
                  type="submit"
                  [variant]="statusNeedsReason() ? 'destructive' : 'default'"
                  [disabled]="!statusSubmitOk(stm)"
                >
                  {{ t()("equipe.statusDialog.submit") }}
                </ui-button>
              </div>
            </form>
          </div>
        </div>
      }
    </app-shell>
  `,
})
export default class EquipePage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly icons = { search: Search, users: Users, userPlus: UserPlus };
  protected readonly statuses = MEMBERSHIP_STATUSES;
  protected readonly tone = TONE;
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly roleLabel = ROLE_LABEL;
  protected readonly parseAge = parseAge;

  protected readonly q = signal("");
  protected readonly status = signal<StatusFilter>(ALL);

  protected readonly sheetMemberId = signal<string | undefined>(undefined);
  protected readonly addOpen = signal(false);
  protected readonly statusMemberId = signal<string | null>(null);
  protected readonly feedback = signal<{ kind: "success" | "error"; text: string } | null>(null);

  /** Formulaire ajout — champs liés au template (ngModel). */
  protected addForm = {
    firstName: "",
    lastName: "",
    sex: "F" as "F" | "H",
    phone: "",
    email: "",
    scoopId: "",
    orgId: "",
    status: "membre" as "membre" | "candidat",
    age: "",
    handicap: false,
    village: "",
  };

  protected statusNext = "";
  protected statusComment = "";

  private fbTimer: ReturnType<typeof setTimeout> | null = null;

  protected readonly mine = computed(() =>
    scopedMembers(this.store.state().members, this.store.state().session),
  );

  protected readonly counts = computed(() => membershipCounts(this.mine()));

  protected readonly shown = computed(() => {
    const st = this.status();
    const needle = this.q().trim().toLowerCase();
    return this.mine().filter(
      (m) =>
        (st === ALL || m.status === st) &&
        (!needle || `${m.firstName} ${m.lastName} ${m.email}`.toLowerCase().includes(needle)),
    );
  });

  protected readonly canManage = computed(() => this.store.can("member.manage"));

  protected readonly sheetMember = computed(() => {
    const id = this.sheetMemberId();
    if (!id) return undefined;
    return this.mine().find((m) => m.id === id);
  });

  protected readonly statusMember = computed(() => {
    const id = this.statusMemberId();
    if (!id) return null;
    return this.mine().find((m) => m.id === id) ?? null;
  });

  protected readonly addScoops = computed(() => {
    const session = this.store.state().session;
    return this.store.state().scoops.filter(
      (s) => !s.archived && inScope([{ scoopId: s.id }], session).length === 1,
    );
  });

  /** Orgs de la SCOOP sélectionnée dans le formulaire d'ajout (lecture directe : pas un signal). */
  protected orgsForAddScoop() {
    return this.store.state().orgs.filter((o) => o.scoopId === this.addForm.scoopId);
  }

  protected statusCount(s: MembershipStatus): number {
    return this.mine().filter((m) => m.status === s).length;
  }

  protected orgName(orgId: string | null | undefined): string {
    if (!orgId) return this.t()("equipe.directMember");
    return this.store.state().orgs.find((o) => o.id === orgId)?.name ?? this.t()("equipe.directMember");
  }

  protected scoopName(scoopId: string): string {
    return this.store.state().scoops.find((s) => s.id === scoopId)?.name ?? this.t()("equipe.sheet.notSet");
  }

  protected producerCode(producerId: string | null | undefined): string | null {
    if (!producerId) return null;
    return this.store.state().producers.find((p) => p.id === producerId)?.code ?? null;
  }

  protected userOf(memberId: string) {
    return this.store.state().users.find((u) => u.memberId === memberId);
  }

  protected onRowKey(e: KeyboardEvent, id: string): void {
    if (e.key === "Enter") this.sheetMemberId.set(id);
  }

  protected openAdd(): void {
    const scoops = this.addScoops();
    const initialScoop = scoops.length === 1 ? scoops[0]!.id : "";
    this.addForm = {
      firstName: "",
      lastName: "",
      sex: "F",
      phone: "",
      email: "",
      scoopId: initialScoop,
      orgId: "",
      status: "membre",
      age: "",
      handicap: false,
      village: "",
    };
    this.addOpen.set(true);
  }

  protected closeAdd(): void {
    this.addOpen.set(false);
  }

  protected addEmailError(): string {
    const e = this.addForm.email.trim();
    if (!e) return "";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? "" : this.t()("equipe.add.emailFormat");
  }

  protected addFormValid(): boolean {
    const ageOk = parseAge(this.addForm.age).ok;
    return !!(
      this.addForm.firstName.trim() &&
      this.addForm.lastName.trim() &&
      this.addForm.scoopId &&
      !this.addEmailError() &&
      ageOk
    );
  }

  protected submitAdd(): void {
    if (!this.addFormValid()) return;
    const age = parseAge(this.addForm.age);
    try {
      this.store.actions.addMember({
        scoopId: this.addForm.scoopId,
        orgId: this.addForm.orgId || null,
        firstName: this.addForm.firstName.trim(),
        lastName: this.addForm.lastName.trim(),
        sex: this.addForm.sex,
        phone: this.addForm.phone.trim(),
        email: this.addForm.email.trim(),
        status: this.addForm.status,
        producerId: null,
        age: age.value,
        handicap: this.addForm.handicap,
        village: this.addForm.village.trim(),
      });
      this.flash("success", this.t()("equipe.add.done"));
      this.closeAdd();
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }

  protected openStatus(m: Member): void {
    this.statusMemberId.set(m.id);
    this.statusNext = "";
    this.statusComment = "";
    this.sheetMemberId.set(undefined);
  }

  protected closeStatus(): void {
    this.statusMemberId.set(null);
    this.statusNext = "";
    this.statusComment = "";
  }

  protected statusChoices(current: MembershipStatus): MembershipStatus[] {
    return MEMBERSHIP_STATUSES.filter((s) => s !== current);
  }

  protected statusNeedsReason(): boolean {
    return this.statusNext === "suspendu" || this.statusNext === "sorti";
  }

  protected statusSubmitOk(stm: Member): boolean {
    const next = this.statusNext as MembershipStatus | "";
    if (!next || next === stm.status) return false;
    if (this.statusNeedsReason() && this.statusComment.trim().length < 5) return false;
    return true;
  }

  protected submitStatus(): void {
    const stm = this.statusMember();
    if (!stm || !this.statusSubmitOk(stm)) return;
    const next = this.statusNext as MembershipStatus;
    try {
      this.store.actions.setMembershipStatus(stm.id, next, this.statusComment.trim() || undefined);
      this.flash("success", this.t()("equipe.statusDialog.done"));
      this.closeStatus();
    } catch (e) {
      this.flash("error", this.errMsg(e));
    }
  }

  private flash(kind: "success" | "error", text: string): void {
    if (this.fbTimer) clearTimeout(this.fbTimer);
    this.feedback.set({ kind, text });
    this.fbTimer = setTimeout(() => {
      this.feedback.set(null);
      this.fbTimer = null;
    }, 4000);
  }

  private errMsg(e: unknown): string {
    if (e instanceof AccessDeniedError) return this.locale.tNow(e.message as MessageKey);
    return e instanceof Error ? e.message : String(e);
  }
}

import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map } from "rxjs";
import {
  LucideAngularModule,
  Search,
  UserRoundSearch,
  Link2,
  Sparkles,
  Users,
} from "lucide-angular";

import { actions, type AppUser } from "@/lib/store";
import { inScope } from "@/lib/scope";
import { fmtDateTime, maskPhone } from "@/lib/format";
import type { AccountLink, Producer } from "@/lib/mock/data";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import {
  PaginationComponent,
  UiButtonComponent,
  UiPageHeaderComponent,
  UiPillComponent,
} from "@shared/ui";
import { createPager } from "@shared/pager";

type Vue = "a-rapprocher" | "candidats" | "liees";

/**
 * Port de src/routes/comptes.tsx.
 * Dialogues riches React → note : confirmations via `confirm()` ; picker simplifié (recherche + liste).
 */
@Component({
  selector: "app-comptes-page",
  imports: [
    PaginationComponent,
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiButtonComponent,
    UiPageHeaderComponent,
    UiPillComponent,
  ],
  template: `
    <app-shell perm="account.manage" [area]="t()('comptes.area')">
      <ui-page-header
        [eyebrow]="t()('comptes.eyebrow')"
        [title]="t()('comptes.title')"
        [description]="t()('comptes.description')"
      />

      <div class="mb-4 flex flex-wrap gap-2 rounded-md border bg-muted/30 p-2">
        @for (viewOption of vueOptions(); track viewOption.key) {
          <button
            type="button"
            class="flex min-w-[8rem] flex-1 items-center gap-2 rounded-md px-3 py-2 text-left text-sm"
            [class.bg-card]="vue() === viewOption.key"
            [class.shadow-sm]="vue() === viewOption.key"
            (click)="setVue(viewOption.key)"
          >
            <lucide-angular [img]="viewOption.icon" class="size-4 shrink-0 text-muted-foreground" />
            <span class="min-w-0 font-medium">{{ viewOption.label }}</span>
            <span class="ml-auto tabular text-xs text-muted-foreground">{{
              viewOption.count
            }}</span>
          </button>
        }
      </div>

      <div class="relative mb-3 max-w-sm">
        <lucide-angular
          [img]="icons.search"
          class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          class="flex h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          [attr.aria-label]="t()('comptes.search')"
          [placeholder]="t()('comptes.search')"
          [ngModel]="q()"
          (ngModelChange)="q.set($event)"
        />
      </div>

      @if (vue() === "a-rapprocher") {
        <div class="surface overflow-x-auto">
          <div class="border-b bg-muted/40 px-4 py-3">
            <h2 class="text-sm font-semibold">{{ t()("comptes.identity.title") }}</h2>
            <p class="mt-0.5 text-xs text-muted-foreground">{{ t()("comptes.identity.hint") }}</p>
          </div>
          @if (toMatch().length) {
            <table class="w-full text-sm">
              <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th class="py-3 pl-4 font-semibold">{{ t()("comptes.col.account") }}</th>
                  <th class="font-semibold">{{ t()("comptes.col.role") }}</th>
                  <th class="font-semibold">{{ t()("comptes.col.scope") }}</th>
                  <th class="font-semibold">{{ t()("comptes.col.state") }}</th>
                  <th class="pr-4 text-right font-semibold">{{ t()("comptes.col.matching") }}</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                @for (account of matchPager.items(); track account.id) {
                  <tr class="hover:bg-muted/40">
                    <td class="py-3 pl-4">
                      <div class="font-medium">{{ account.name }}</div>
                      <div class="text-xs text-muted-foreground">{{ account.email }}</div>
                      <div class="text-xs text-muted-foreground tabular">
                        {{ store.phone(account.phone) }}
                      </div>
                    </td>
                    <td>{{ store.roleLabel(account.role) }}</td>
                    <td class="text-muted-foreground">
                      {{ account.scoopId ? scoopName(account.scoopId) : t()("comptes.scopeAll") }}
                    </td>
                    <td>
                      @if (account.active) {
                        <ui-pill tone="success">{{ t()("comptes.state.active") }}</ui-pill>
                      } @else {
                        <ui-pill tone="neutral">{{ t()("comptes.state.inactive") }}</ui-pill>
                      }
                    </td>
                    <td class="pr-4 text-right">
                      @if (pickerUser()?.id === account.id) {
                        <div
                          class="inline-flex flex-col items-end gap-2 sm:flex-row sm:items-center"
                        >
                          <input
                            class="h-8 w-56 rounded-md border border-input bg-background px-2 text-sm"
                            [placeholder]="t()('comptes.picker.placeholder')"
                            [ngModel]="pickerQ()"
                            (ngModelChange)="pickerQ.set($event)"
                          />
                          <select
                            class="h-8 max-w-xs rounded-md border border-input bg-background px-2 text-sm"
                            [ngModel]="pickerProducerId()"
                            (ngModelChange)="pickerProducerId.set($event)"
                          >
                            <option value="">—</option>
                            @for (hit of pickerHits(); track hit.id) {
                              <option [ngValue]="hit.id">
                                {{ hit.code }} · {{ hit.firstName }} {{ hit.lastName }} —
                                {{ hit.village }}
                              </option>
                            }
                          </select>
                          <ui-button
                            size="sm"
                            [disabled]="!pickerProducerId()"
                            (click)="applyManualLink(account)"
                          >
                            {{ t()("comptes.dlg.link.action") }}
                          </ui-button>
                          <ui-button variant="ghost" size="sm" (click)="closePicker()">×</ui-button>
                        </div>
                      } @else {
                        <ui-button size="sm" variant="outline" (click)="openPicker(account)">
                          <lucide-angular [img]="icons.userSearch" class="size-4" />
                          {{ t()("comptes.picker.button") }}
                        </ui-button>
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
            <ui-pagination class="px-4 pb-4" [pager]="matchPager" />
          } @else {
            <div class="px-4 py-10 text-center text-muted-foreground">
              <lucide-angular [img]="icons.userSearch" class="mx-auto mb-2 size-10 opacity-50" />
              <div class="font-semibold text-foreground">
                {{ needle() ? t()("comptes.empty.noAccount") : t()("comptes.empty.allMatched") }}
              </div>
              <p class="mt-1 text-sm">
                {{
                  needle() ? t()("comptes.empty.editSearch") : t()("comptes.empty.allMatchedDesc")
                }}
              </p>
            </div>
          }
        </div>
      }

      @if (vue() === "candidats") {
        <div class="surface overflow-x-auto">
          @if (cands().length) {
            <table class="w-full text-sm">
              <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th class="py-3 pl-4 font-semibold">{{ t()("comptes.col.account") }}</th>
                  <th class="font-semibold">{{ t()("comptes.col.candidate") }}</th>
                  <th class="hidden font-semibold lg:table-cell">
                    {{ t()("comptes.col.scoopOrg") }}
                  </th>
                  <th class="font-semibold">{{ t()("comptes.col.score") }}</th>
                  <th class="hidden font-semibold xl:table-cell">
                    {{ t()("comptes.col.signals") }}
                  </th>
                  <th class="pr-4 text-right font-semibold">{{ t()("comptes.col.decision") }}</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                @for (candidate of candPager.items(); track candidate.id) {
                  <tr class="hover:bg-muted/40">
                    <td class="py-3 pl-4">
                      <div class="font-medium">
                        {{ user(candidate.userId)?.name ?? t()("comptes.unknown") }}
                      </div>
                      <div class="text-xs text-muted-foreground">
                        {{ store.roleLabel(user(candidate.userId)?.role ?? "technicien") }} ·
                        {{ store.phone(user(candidate.userId)?.phone) }}
                      </div>
                    </td>
                    <td>
                      @if (prod(candidate.producerId); as producer) {
                        <a
                          [routerLink]="['/dashboard/producteurs', producer.id]"
                          class="font-medium hover:text-primary hover:underline"
                        >
                          {{ producer.code }} · {{ producer.firstName }} {{ producer.lastName }}
                        </a>
                      } @else {
                        {{ t()("comptes.unknown") }}
                      }
                    </td>
                    <td class="hidden text-muted-foreground lg:table-cell">
                      @if (prod(candidate.producerId); as producer) {
                        {{ scoopName(producer.scoopId) }} · {{ orgName(producer.orgId) }}
                      } @else {
                        {{ t()("comptes.unknown") }}
                      }
                    </td>
                    <td>
                      <ui-pill [tone]="scoreTone(candidate.score)">{{ candidate.score }} %</ui-pill>
                    </td>
                    <td class="hidden max-w-72 text-xs text-muted-foreground xl:table-cell">
                      {{ candidate.signals.join(" · ") }}
                    </td>
                    <td class="pr-4 text-right">
                      <div class="inline-flex flex-wrap items-center justify-end gap-1">
                        <ui-button
                          size="sm"
                          class="h-8"
                          [disabled]="!user(candidate.userId) || !prod(candidate.producerId)"
                          (click)="confirmCandidate(candidate.userId, candidate.producerId)"
                        >
                          {{ t()("comptes.confirm") }}
                        </ui-button>
                        <ui-button
                          size="sm"
                          variant="outline"
                          (click)="rejectCandidate(candidate.id)"
                        >
                          {{ t()("comptes.action.reject") }}
                        </ui-button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
            <ui-pagination class="px-4 pb-4" [pager]="candPager" />
          } @else {
            <div class="px-4 py-10 text-center text-muted-foreground">
              <lucide-angular [img]="icons.sparkles" class="mx-auto mb-2 size-10 opacity-50" />
              <div class="font-semibold text-foreground">
                {{ needle() ? t()("comptes.empty.noProposal") : t()("comptes.empty.noCandidate") }}
              </div>
              <p class="mt-2 text-sm">
                {{
                  needle() ? t()("comptes.empty.editSearch") : t()("comptes.empty.noCandidateDesc")
                }}
              </p>
              @if (!needle() && unmatched().length > 0) {
                <ui-button variant="outline" class="mt-3" (click)="setVue('a-rapprocher')">
                  <lucide-angular [img]="icons.userSearch" class="size-4" />
                  {{ t()("comptes.matchManually", { n: unmatched().length }) }}
                </ui-button>
              }
            </div>
          }
        </div>
      }

      @if (vue() === "liees") {
        <div class="surface overflow-x-auto">
          @if (linkedFiltered().length) {
            <table class="w-full text-sm">
              <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th class="py-3 pl-4 font-semibold">{{ t()("comptes.col.account") }}</th>
                  <th class="font-semibold">{{ t()("comptes.col.linkedProducer") }}</th>
                  <th class="font-semibold">{{ t()("comptes.col.linkedOn") }}</th>
                  <th class="hidden font-semibold md:table-cell">{{ t()("comptes.col.by") }}</th>
                  <th class="pr-4 text-right font-semibold">&nbsp;</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                @for (link of linkedPager.items(); track link.id) {
                  <tr class="hover:bg-muted/40">
                    <td class="py-3 pl-4">
                      <div class="font-medium">
                        {{ user(link.userId)?.name ?? t()("comptes.unknown") }}
                      </div>
                      <div class="text-xs text-muted-foreground tabular">
                        {{ store.phone(user(link.userId)?.phone) }}
                      </div>
                    </td>
                    <td>
                      @if (prod(link.producerId); as producer) {
                        <a
                          [routerLink]="['/dashboard/producteurs', producer.id]"
                          class="font-medium hover:text-primary hover:underline"
                        >
                          {{ producer.code }} · {{ producer.firstName }} {{ producer.lastName }}
                        </a>
                      } @else {
                        {{ t()("comptes.unknown") }}
                      }
                    </td>
                    <td class="whitespace-nowrap text-muted-foreground">
                      {{ fmtDateTime(link.linkedAt) }}
                    </td>
                    <td class="hidden md:table-cell">{{ link.by }}</td>
                    <td class="pr-4 text-right">
                      <ui-button size="sm" variant="destructive" (click)="unlink(link)">
                        {{ t()("comptes.action.unlink") }}
                      </ui-button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
            <ui-pagination class="px-4 pb-4" [pager]="linkedPager" />
          } @else {
            <div class="px-4 py-10 text-center text-muted-foreground">
              <lucide-angular [img]="icons.users" class="mx-auto mb-2 size-10 opacity-50" />
              <div class="font-semibold text-foreground">
                {{ needle() ? t()("comptes.empty.noLink") : t()("comptes.empty.noConfirmed") }}
              </div>
              <p class="mt-2 text-sm">
                {{
                  needle() ? t()("comptes.empty.editSearch") : t()("comptes.empty.noConfirmedDesc")
                }}
              </p>
              @if (!needle() && candidateRows().length > 0) {
                <ui-button variant="outline" class="mt-3" (click)="setVue('candidats')">
                  <lucide-angular [img]="icons.sparkles" class="size-4" />
                  {{ t()("comptes.examine", { n: candidateRows().length }) }}
                </ui-button>
              }
            </div>
          }
        </div>
      }

      <p class="mt-4 text-xs text-muted-foreground">
        Parité complète avec les dialogues React (picker command, alert) : à brancher
        ultérieurement.
      </p>
    </app-shell>
  `,
})
export default class ComptesPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly maskPhone = maskPhone;
  protected readonly icons = {
    search: Search,
    userSearch: UserRoundSearch,
    sparkles: Sparkles,
    users: Users,
  };

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly vueFromRoute = toSignal(
    this.route.queryParamMap.pipe(
      map((m) => {
        const v = m.get("vue");
        return v === "a-rapprocher" || v === "liees" || v === "candidats" ? (v as Vue) : null;
      }),
    ),
    { initialValue: null as Vue | null },
  );

  protected readonly q = signal("");
  protected readonly pickerUser = signal<AppUser | null>(null);
  protected readonly pickerQ = signal("");
  protected readonly pickerProducerId = signal("");

  protected readonly candidateRows = computed(() => this.store.state().linkCandidates);
  protected readonly linkedRows = computed(() => this.store.state().links);

  protected readonly vue = computed(() => {
    const fromUrl = this.vueFromRoute();
    if (fromUrl) return fromUrl;
    const c = this.candidateRows().length;
    const u = this.unmatched().length;
    const l = this.linkedRows().length;
    return c ? "candidats" : u ? "a-rapprocher" : "liees";
  });

  protected readonly needle = computed(() => this.q().trim().toLowerCase());

  protected readonly unmatched = computed(() => {
    const s = this.store.state();
    return s.users.filter(
      (u) =>
        !s.links.some((l) => l.userId === u.id) && !s.linkCandidates.some((c) => c.userId === u.id),
    );
  });

  protected readonly vueOptions = computed(() => {
    const t = this.t();
    return [
      {
        key: "a-rapprocher" as const,
        label: t("comptes.view.toMatch"),
        count: this.unmatched().length,
        icon: UserRoundSearch,
      },
      {
        key: "candidats" as const,
        label: t("comptes.view.candidates"),
        count: this.candidateRows().length,
        icon: Sparkles,
      },
      {
        key: "liees" as const,
        label: t("comptes.view.linked"),
        count: this.linkedRows().length,
        icon: Link2,
      },
    ];
  });

  protected readonly toMatch = computed(() => {
    const n = this.needle();
    return this.unmatched().filter((u) =>
      this.hit(n, u.name, this.store.roleLabel(u.role), this.scoopName(u.scoopId)),
    );
  });

  protected readonly cands = computed(() => {
    const n = this.needle();
    return this.candidateRows().filter((c) => {
      const u = this.user(c.userId);
      const p = this.prod(c.producerId);
      return this.hit(n, u?.name, p?.code, p ? `${p.firstName} ${p.lastName}` : undefined);
    });
  });

  protected readonly linkedFiltered = computed(() => {
    const n = this.needle();
    return this.linkedRows().filter((l) => {
      const u = this.user(l.userId);
      const p = this.prod(l.producerId);
      return this.hit(n, u?.name, p?.code, p ? `${p.firstName} ${p.lastName}` : undefined);
    });
  });

  protected readonly pickerHits = computed(() => {
    const session = this.store.state().session;
    const raw = this.pickerQ().trim();
    const n = raw.toLowerCase();
    if (raw.length > 0 && raw.length < 2) return [];
    const taken = new Set(this.store.state().links.map((l) => l.producerId));
    return inScope(this.store.state().producers, session)
      .filter(
        (p) =>
          !p.mergedInto &&
          !taken.has(p.id) &&
          (!n || `${p.firstName} ${p.lastName} ${p.code} ${p.village}`.toLowerCase().includes(n)),
      )
      .slice(0, 40);
  });

  user(id: string): AppUser | undefined {
    return this.store.state().users.find((u) => u.id === id);
  }

  prod(id: string): Producer | undefined {
    return this.store.state().producers.find((p) => p.id === id);
  }

  scoopName(id?: string): string {
    const t = this.t();
    return this.store.state().scoops.find((s) => s.id === id)?.name ?? t("comptes.unknown");
  }

  orgName(id: string): string {
    return this.store.state().orgs.find((o) => o.id === id)?.name ?? this.t()("comptes.unknown");
  }

  hit(needle: string, ...hay: (string | undefined)[]): boolean {
    return !needle || hay.some((h) => (h ?? "").toLowerCase().includes(needle));
  }

  scoreTone(score: number): "success" | "warning" | "neutral" {
    return score >= 80 ? "success" : score >= 60 ? "warning" : "neutral";
  }

  setVue(v: Vue): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { vue: v },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }

  openPicker(u: AppUser): void {
    this.pickerUser.set(u);
    this.pickerQ.set("");
    this.pickerProducerId.set("");
  }

  closePicker(): void {
    this.pickerUser.set(null);
  }

  applyManualLink(u: AppUser): void {
    const pid = this.pickerProducerId();
    if (!pid) return;
    if (actions.linkManually(u.id, pid)) this.closePicker();
  }

  confirmCandidate(userId: string, producerId: string): void {
    if (confirm(this.t()("comptes.dlg.link.title"))) actions.confirmLink(userId, producerId);
  }

  rejectCandidate(id: string): void {
    if (confirm(this.t()("comptes.action.reject"))) actions.rejectLink(id);
  }

  unlink(l: AccountLink): void {
    if (confirm(this.t()("comptes.dlg.unlink.title"))) actions.unlinkLink(l.id);
  }

  /** Pagination (toMatch) : mêmes règles que l'API (?page=&limit=). */
  protected readonly matchPager = createPager(() => this.toMatch());

  /** Pagination (cands) : mêmes règles que l'API (?page=&limit=). */
  protected readonly candPager = createPager(() => this.cands());

  /** Pagination (linkedFiltered) : mêmes règles que l'API (?page=&limit=). */
  protected readonly linkedPager = createPager(() => this.linkedFiltered());
}

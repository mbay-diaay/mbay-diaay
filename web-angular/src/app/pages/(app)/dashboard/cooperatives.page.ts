import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { LucideAngularModule, Building2, Search } from "lucide-angular";

import { accountOf, managerOf } from "@/lib/scoop-account";
import { inScope } from "@/lib/scope";
import { nf } from "@/lib/format";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiKpiTileComponent } from "../shared/ui/kpi-tile.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

type Filter = "tous" | "active" | "archived" | "pending";

/** Port allégé de src/routes/cooperatives.index.tsx (liste + KPI, sans dialogs création/archive). */
@Component({
  selector: "app-cooperatives-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiChipRailComponent,
    UiEmptyComponent,
    UiKpiTileComponent,
    UiPageHeaderComponent,
    UiPillComponent,
  ],
  template: `
    <app-shell [perm]="perms" [area]="t()('cooperatives.area')">
      <ui-page-header
        [eyebrow]="t()('cooperatives.eyebrow')"
        [title]="t()('cooperatives.title')"
        [description]="t()('cooperatives.description')"
      />

      <div class="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <ui-kpi-tile [label]="t()('cooperatives.kpi.active')" [value]="nf.format(kpi().active)" />
        <ui-kpi-tile
          [label]="t()('cooperatives.kpi.archived')"
          [value]="nf.format(kpi().archived)"
        />
        <ui-kpi-tile
          [label]="t()('cooperatives.kpi.pending')"
          [value]="nf.format(kpi().pending)"
          [sub]="t()('cooperatives.kpi.pendingSub')"
          [tone]="kpi().pending ? 'warning' : 'neutral'"
        />
        <ui-kpi-tile
          [label]="t()('cooperatives.kpi.producers')"
          [value]="nf.format(kpi().producers)"
          [sub]="t()('cooperatives.kpi.producersSub')"
        />
      </div>

      <div class="toolbar-surface">
        <div class="relative">
          <lucide-angular
            [img]="icons.search"
            class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            class="flex h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm shadow-sm pointer-coarse:h-touch focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            [placeholder]="t()('cooperatives.search.placeholder')"
            [attr.aria-label]="t()('cooperatives.search.aria')"
            [ngModel]="q()"
            (ngModelChange)="q.set($event)"
          />
        </div>
        <ui-chip-rail>
          @for (f of filterButtons(); track f.id) {
            <button
              type="button"
              class="chip-filter"
              [class.chip-filter-active]="filter() === f.id"
              [attr.aria-pressed]="filter() === f.id"
              (click)="filter.set(f.id)"
            >
              {{ f.label }}
              <span class="chip-filter-count">{{ f.count }}</span>
            </button>
          }
        </ui-chip-rail>
      </div>

      <div class="surface divide-y overflow-hidden">
        @for (r of shown(); track r.scoop.id) {
          <a [routerLink]="['/cooperatives', r.scoop.id]" class="list-row">
            <div
              class="grid size-11 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"
            >
              <lucide-angular [img]="icons.building" class="size-5" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-semibold leading-snug text-foreground">{{ r.scoop.name }}</span>
                @if (r.scoop.archived) {
                  <ui-pill tone="neutral">{{ t()("cooperatives.filter.archived") }}</ui-pill>
                }
                @if (r.pending) {
                  <ui-pill tone="warning">{{ t()("cooperatives.filter.pending") }}</ui-pill>
                }
              </div>
              <div class="mt-1 text-xs leading-relaxed text-muted-foreground">
                {{ r.scoop.code }} · {{ r.scoop.commune }} ·
                {{ nf.format(r.producers) }} producteurs · {{ nf.format(r.members) }} membres
              </div>
              @if (r.manager) {
                <div class="mt-1.5 text-xs text-muted-foreground">
                  {{ r.manager.name }} · {{ r.manager.email }}
                </div>
              }
            </div>
          </a>
        } @empty {
          <ui-empty>{{ t()("cooperatives.empty.filtered") }}</ui-empty>
        }
      </div>
    </app-shell>
  `,
})
export default class CooperativesPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly perms = ["scoop.manage", "org.read"] as const;
  protected readonly icons = { search: Search, building: Building2 };
  protected readonly q = signal("");
  protected readonly filter = signal<Filter>("tous");

  private readonly rows = computed(() => {
    const s = this.store.state();
    const session = s.session;
    const now = Date.now();
    const scoops = s.scoops.filter((c) => inScope([{ scoopId: c.id }], session).length === 1);
    const producerCount = new Map<string, number>();
    for (const p of s.producers)
      producerCount.set(p.scoopId, (producerCount.get(p.scoopId) ?? 0) + 1);
    const memberCount = new Map<string, number>();
    for (const m of s.members)
      if (m.status === "membre") memberCount.set(m.scoopId, (memberCount.get(m.scoopId) ?? 0) + 1);
    return scoops.map((scoop) => {
      const manager = managerOf(s.users, scoop.id);
      const account = accountOf(manager, now);
      return {
        scoop,
        producers: producerCount.get(scoop.id) ?? 0,
        members: memberCount.get(scoop.id) ?? 0,
        manager,
        pending: !scoop.archived && (account === "invited" || account === "expired"),
      };
    });
  });

  protected readonly kpi = computed(() => {
    const rows = this.rows();
    return {
      active: rows.filter((r) => !r.scoop.archived).length,
      archived: rows.filter((r) => !!r.scoop.archived).length,
      pending: rows.filter((r) => r.pending).length,
      producers: rows.reduce((n, r) => n + r.producers, 0),
    };
  });

  protected readonly filterButtons = computed(() => {
    const t = this.t();
    const rows = this.rows();
    return [
      { id: "tous" as const, label: t("cooperatives.filter.all"), count: rows.length },
      {
        id: "active" as const,
        label: t("cooperatives.filter.active"),
        count: rows.filter((r) => !r.scoop.archived).length,
      },
      {
        id: "archived" as const,
        label: t("cooperatives.filter.archived"),
        count: rows.filter((r) => !!r.scoop.archived).length,
      },
      {
        id: "pending" as const,
        label: t("cooperatives.filter.pending"),
        count: rows.filter((r) => r.pending).length,
      },
    ];
  });

  protected readonly shown = computed(() => {
    const needle = this.q().trim().toLowerCase();
    const f = this.filter();
    return this.rows().filter((r) => {
      const okFilter =
        f === "tous" ||
        (f === "active" && !r.scoop.archived) ||
        (f === "archived" && !!r.scoop.archived) ||
        (f === "pending" && r.pending);
      const okQ =
        !needle ||
        `${r.scoop.name} ${r.scoop.code ?? ""} ${r.scoop.commune}`.toLowerCase().includes(needle);
      return okFilter && okQ;
    });
  });
}

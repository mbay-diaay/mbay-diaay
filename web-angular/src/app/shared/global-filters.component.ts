import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";

import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";

/** Valeur réservée au choix « tous » : aligné sur FilterSelect React (`src/components/app/FilterSelect.tsx`). */
const ALL = "__all";

function leafRoute(route: ActivatedRoute): ActivatedRoute {
  let r = route;
  while (r.firstChild) r = r.firstChild;
  return r;
}

/**
 * Port Angular de `src/components/app/GlobalFilters.tsx` — périmètres SCOOP + campagne
 * synchronisés avec l'URL (`?scoop=…&campagne=…`, fusion, `replaceUrl`).
 */
@Component({
  selector: "app-global-filters",
  imports: [CommonModule],
  template: `
    <div
      class="grid grid-cols-2 gap-2 xl:flex xl:items-center"
      [attr.aria-label]="t()('shell.filters.aria')"
    >
      <label class="flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-2">
        <span class="sr-only">{{ t()("shell.filters.scoopLabel") }}</span>
        <select
          class="h-9 w-full min-w-0 rounded-md border border-input bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:w-48"
          [ngClass]="scoopActive() ? 'border-primary bg-primary-soft/40 font-medium' : ''"
          [attr.aria-label]="t()('shell.filters.scoopLabel')"
          [value]="scoopSel()"
          (change)="onScoop($any($event.target).value)"
        >
          <option value="">{{ t()("shell.filters.scoopAll") }}</option>
          @for (o of scoopOptions(); track o[0]) {
            <option [value]="o[0]">{{ o[1] }}</option>
          }
        </select>
      </label>
      <label class="flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-2">
        <span class="sr-only">{{ t()("shell.filters.campaignLabel") }}</span>
        <select
          class="h-9 w-full min-w-0 rounded-md border border-input bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:w-44"
          [ngClass]="campagneActive() ? 'border-primary bg-primary-soft/40 font-medium' : ''"
          [attr.aria-label]="t()('shell.filters.campaignLabel')"
          [value]="campagneSel()"
          (change)="onCampagne($any($event.target).value)"
        >
          <option value="">{{ t()("shell.filters.campaignAll") }}</option>
          @for (c of campaigns(); track c.name) {
            <option [value]="c.name">{{ c.name }}</option>
          }
        </select>
      </label>
    </div>
  `,
})
export class GlobalFiltersComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly localeService = inject(LocaleService);
  private readonly store = inject(StoreService);

  private readonly leaf = leafRoute(this.route);

  protected readonly t = this.localeService.t;

  private readonly queryParams = toSignal(
    this.leaf.queryParamMap.pipe(
      map((m) => {
        const o: Record<string, string> = {};
        m.keys.forEach((k) => {
          const v = m.get(k);
          if (v !== null) o[k] = v;
        });
        return o;
      }),
    ),
    {
      initialValue: (() => {
        const m = this.leaf.snapshot.queryParamMap;
        const o: Record<string, string> = {};
        m.keys.forEach((k) => {
          const v = m.get(k);
          if (v !== null) o[k] = v;
        });
        return o;
      })(),
    },
  );

  protected readonly scoop = computed(() => {
    const v = this.queryParams()["scoop"];
    return typeof v === "string" ? v : ALL;
  });
  protected readonly campagne = computed(() => {
    const v = this.queryParams()["campagne"];
    return typeof v === "string" ? v : ALL;
  });

  protected readonly scoopSel = computed(() => (this.scoop() === ALL ? "" : this.scoop()));
  protected readonly campagneSel = computed(() => (this.campagne() === ALL ? "" : this.campagne()));
  protected readonly scoopActive = computed(() => this.scoop() !== ALL);
  protected readonly campagneActive = computed(() => this.campagne() !== ALL);

  protected readonly scoopOptions = computed(() =>
    this.store.state().scoops.map((s) => [s.id, s.commune] as const),
  );
  protected readonly campaigns = computed(() => this.store.state().campaigns);

  protected onScoop(value: string): void {
    this.patchQuery("scoop", value || ALL);
  }
  protected onCampagne(value: string): void {
    this.patchQuery("campagne", value || ALL);
  }

  private patchQuery(key: "scoop" | "campagne", value: string): void {
    const next = value === ALL ? null : value;
    void this.router.navigate([], {
      relativeTo: this.leaf,
      queryParams: { [key]: next },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }
}

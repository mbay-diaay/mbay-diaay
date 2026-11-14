import { Component, computed, inject, input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";

import { inScope } from "@/lib/scope";

import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { SelectComponent, type SelectOption } from "./ui/select.component";

function leafRoute(route: ActivatedRoute): ActivatedRoute {
  let r = route;
  while (r.firstChild) r = r.firstChild;
  return r;
}

/**
 * Filtres de périmètre d'une page (charte V2) : coopérative et, si demandé, campagne,
 * synchronisés avec l'URL (`?scoop=…&campagne=…`, fusion, `replaceUrl`).
 *
 * À placer dans la barre de filtres des pages qui lisent ces paramètres :
 * `<app-global-filters />` (coopérative seule) ou `<app-global-filters [campaign]="true" />`.
 * - Coopératives : celles du périmètre de la session (`scope.ts`), hors archivées ; masqué s'il n'y en a qu'une.
 * - L'hôte est en `display: contents` : les listes se placent directement dans la grille ou la barre parente.
 */
@Component({
  selector: "app-global-filters",
  imports: [SelectComponent],
  host: { class: "contents" },
  template: `
    @if (showScoop()) {
      <ui-select
        class="min-w-[220px] flex-1"
        variant="compact"
        leadingIcon="apartment"
        [label]="t()('shell.filters.scoopLabel')"
        [options]="scoopOptions()"
        [value]="scoop()"
        (valueChange)="patch('scoop', $event)"
      />
    }
    @if (campaign()) {
      <ui-select
        class="min-w-[200px] flex-1"
        variant="compact"
        leadingIcon="calendar_month"
        [label]="t()('shell.filters.campaignLabel')"
        [options]="campaignOptions()"
        [value]="campagne()"
        (valueChange)="patch('campagne', $event)"
      />
    }
  `,
})
export class GlobalFiltersComponent {
  /** Affiche aussi le filtre de campagne (seules certaines pages s'en servent). */
  readonly campaign = input(false);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(StoreService);
  protected readonly t = inject(LocaleService).t;

  private readonly leaf = leafRoute(this.route);
  private readonly params = toSignal(this.leaf.queryParamMap.pipe(map((m) => ({ scoop: m.get("scoop") ?? "", campagne: m.get("campagne") ?? "" }))), {
    initialValue: { scoop: this.leaf.snapshot.queryParamMap.get("scoop") ?? "", campagne: this.leaf.snapshot.queryParamMap.get("campagne") ?? "" },
  });

  protected readonly scoop = computed(() => this.params().scoop);
  protected readonly campagne = computed(() => this.params().campagne);

  /** Coopératives visibles par la session, hors archivées, par nom. */
  private readonly scoops = computed(() => {
    const s = this.store.state();
    return inScope(
      s.scoops.filter((c) => !c.archived).map((c) => ({ ...c, scoopId: c.id })),
      s.session,
    ).sort((a, b) => a.name.localeCompare(b.name));
  });

  /** Une seule coopérative dans le périmètre : le filtre n'a pas de sens. */
  protected readonly showScoop = computed(() => this.scoops().length > 1);

  protected readonly scoopOptions = computed<SelectOption[]>(() => [
    { value: "", label: this.t()("shell.filters.scoopAll") },
    ...this.scoops().map((c) => ({ value: c.id, label: c.name })),
  ]);

  protected readonly campaignOptions = computed<SelectOption[]>(() => [
    { value: "", label: this.t()("shell.filters.campaignAll") },
    ...[...this.store.state().campaigns]
      .sort((a, b) => b.start.localeCompare(a.start))
      .map((c) => ({ value: c.name, label: c.name })),
  ]);

  protected patch(key: "scoop" | "campagne", value: string): void {
    void this.router.navigate([], {
      relativeTo: this.leaf,
      queryParams: { [key]: value || null },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }
}

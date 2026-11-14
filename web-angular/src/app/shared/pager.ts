import { computed, linkedSignal, signal, type Signal } from "@angular/core";

import { DEFAULT_PAGE_SIZE, type Page, paginate } from "@/lib/api/pagination";

/** État de pagination d'un tableau, consommé par `<ui-pagination [pager]="…" />`. */
export interface Pager<T> {
  /** Page courante (bornée) + métadonnées, au format de l'API. */
  readonly result: Signal<Page<T>>;
  /** Lignes de la page courante, à itérer dans le tableau. */
  readonly items: Signal<T[]>;
  setPage(page: number): void;
  setSize(size: number): void;
}

/**
 * Pagine une liste calculée (filtres, tri…) côté navigateur, avec les règles de l'API.
 *
 * ```ts
 * protected readonly pager = createPager(() => this.filtered(), 20);
 * // gabarit : @for (row of pager.items(); …) … <ui-pagination [pager]="pager" />
 * ```
 * Retour en page 1 quand le nombre de lignes change (nouveau filtre, recherche) ; une
 * modification de ligne garde la page courante.
 */
export function createPager<T>(source: () => readonly T[], size = DEFAULT_PAGE_SIZE): Pager<T> {
  const limit = signal(size);
  const count = computed(() => source().length);
  const page = linkedSignal({ source: count, computation: () => 1 });
  const result = computed(() => paginate(source(), { page: page(), limit: limit() }));
  return {
    result,
    items: computed(() => result().items),
    setPage: (p) => page.set(p),
    setSize: (s) => {
      limit.set(s);
      page.set(1);
    },
  };
}

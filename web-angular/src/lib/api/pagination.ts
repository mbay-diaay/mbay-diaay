/**
 * Pagination par page, alignée sur l'API (`GET …?page=&limit=` →
 * `{ items, total, page, limit, pages }`, cf. `mbay-diaay-api/docs/API_ROUTES_M1.md`).
 *
 * Les mêmes règles servent en mode démonstration (listes en mémoire, `paginate`) et en
 * mode API (`withPage` + `fetchAllPages`) : un écran passe de l'un à l'autre sans changer
 * son affichage.
 */

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 200;
/** Tailles proposées dans les tableaux. */
export const PAGE_SIZES = [10, 25, 50, 100] as const;

export type PageQuery = { page?: number; limit?: number };
export type PageMeta = { total: number; page: number; limit: number; pages: number };
export type Page<T> = PageMeta & { items: T[] };

/** Normalise page/limit comme le serveur : bornes, page ramenée à la dernière existante. */
export function pageWindow(
  total: number,
  query: PageQuery = {},
  defaultLimit = DEFAULT_PAGE_SIZE,
): PageMeta & { skip: number } {
  const limit = Math.min(Math.max(query.limit ?? defaultLimit, 1), MAX_PAGE_SIZE);
  const pages = Math.max(1, Math.ceil(total / limit));
  const page = Math.min(Math.max(query.page ?? 1, 1), pages);
  return { total, page, limit, pages, skip: (page - 1) * limit };
}

/** Pagine une liste en mémoire (mode démonstration). */
export function paginate<T>(all: readonly T[], query: PageQuery = {}, defaultLimit = DEFAULT_PAGE_SIZE): Page<T> {
  const { skip, ...meta } = pageWindow(all.length, query, defaultLimit);
  return { ...meta, items: all.slice(skip, skip + meta.limit) };
}

/** Ajoute `page`, `limit` et les filtres non vides à un chemin d'API. */
export function withPage(path: string, query: PageQuery & Record<string, string | number | undefined> = {}): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

/** Parcourt toutes les pages (paquets de 200) quand l'écran a besoin de la liste complète. */
export async function fetchAllPages<T>(fetchPage: (query: PageQuery) => Promise<Page<T>>): Promise<T[]> {
  const items: T[] = [];
  for (let page = 1; ; page++) {
    const res = await fetchPage({ page, limit: MAX_PAGE_SIZE });
    items.push(...res.items);
    if (res.page >= res.pages) return items;
  }
}

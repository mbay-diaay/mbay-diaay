import type { Locale } from "./translate";

export const LOCALE_STORAGE_KEY = "mbd.locale";

export function isLocale(value: unknown): value is Locale {
  return value === "fr" || value === "wo";
}

/** Lit uniquement `fr` ou `wo` — aucune autre donnée. */
export function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function writeStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // stockage indisponible (mode privé strict) : ignorer
  }
}

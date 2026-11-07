import type { Locale } from "./translate";

/** Nombres toujours en fr-SN (décision 6.7), pour que les tableaux se lisent pareil. */
export function formatNumber(value: number, _locale?: Locale): string {
  return new Intl.NumberFormat("fr-SN").format(value);
}

/** Dates : wolof si le navigateur le gère, sinon fr-SN. */
export function formatDate(
  value: Date | string | number,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = value instanceof Date ? value : new Date(value);
  const tag = locale === "wo" ? "wo" : "fr-SN";
  const supported =
    typeof Intl.DateTimeFormat.supportedLocalesOf === "function"
      ? Intl.DateTimeFormat.supportedLocalesOf([tag], { localeMatcher: "lookup" })
      : [];
  const resolved = supported.length ? tag : "fr-SN";
  return new Intl.DateTimeFormat(resolved, options).format(date);
}

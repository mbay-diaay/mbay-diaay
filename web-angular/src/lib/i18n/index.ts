/**
 * Trimmed barrel: the React original (src/lib/i18n/index.ts) also exports
 * `LocaleProvider`/`useI18n`/`useT` (React context + hooks), dropped here in
 * favor of LocaleService (src/app/shared/locale.service.ts). Only the
 * framework-agnostic re-exports survive — several src/lib/*.ts files import
 * `tNow`/`MessageKey`/`TranslateParams` from this path.
 *
 * Wolof is lazy-loaded via `ensureWolofLoaded` (not re-exported as a static `wo`).
 */
export { fr, type MessageKey, type Messages } from "./fr";
export {
  translate,
  translateEnum,
  tNow,
  setCurrentLocale,
  interpolate,
  missingWolofKeys,
  ensureWolofLoaded,
  type Locale,
  type TranslateParams,
} from "./translate";
export { formatNumber, formatDate } from "./format";
export { LOCALE_STORAGE_KEY, isLocale, readStoredLocale, writeStoredLocale } from "./storage";

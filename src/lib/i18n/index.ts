export { fr, type MessageKey, type Messages } from "./fr";
export { wo } from "./wo";
export {
  translate,
  translateEnum,
  tNow,
  setCurrentLocale,
  interpolate,
  missingWolofKeys,
  type Locale,
  type TranslateParams,
} from "./translate";
export { formatNumber, formatDate } from "./format";
export { LOCALE_STORAGE_KEY, isLocale, readStoredLocale, writeStoredLocale } from "./storage";
export { LocaleProvider } from "./LocaleProvider";
export { useI18n, useT } from "./use-i18n";

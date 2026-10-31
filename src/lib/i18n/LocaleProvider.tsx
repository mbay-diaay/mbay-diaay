import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { formatDate, formatNumber } from "./format";
import { I18nContext, type I18nContextValue } from "./context";
import { readStoredLocale, writeStoredLocale } from "./storage";
import { setCurrentLocale, translate, translateEnum, type Locale } from "./translate";

const DEFAULT_LOCALE: Locale = "fr";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored) setLocaleState(stored);
  }, []);

  // Avant le rendu des enfants : une action déclenchée dans un enfant doit déjà lire la bonne langue.
  setCurrentLocale(locale);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeStoredLocale(next);
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, params) => translate(locale, key, params),
      tEnum: (domain, v) => translateEnum(locale, domain, v),
      formatNumber: (n) => formatNumber(n, locale),
      formatDate: (d, options) => formatDate(d, locale, options),
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

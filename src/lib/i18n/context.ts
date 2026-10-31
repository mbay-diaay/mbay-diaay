import { createContext } from "react";
import type { MessageKey } from "./fr";
import type { Locale, TranslateParams } from "./translate";

export type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, params?: TranslateParams) => string;
  tEnum: (domain: string, value: string) => string;
  formatNumber: (value: number) => string;
  formatDate: (value: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
};

export const I18nContext = createContext<I18nContextValue | null>(null);

import { Injectable, computed, signal } from "@angular/core";
import { formatDate, formatNumber } from "@/lib/i18n/format";
import { isLocale, readStoredLocale, writeStoredLocale } from "@/lib/i18n/storage";
import {
  ensureWolofLoaded,
  setCurrentLocale,
  translate,
  translateEnum,
  type Locale,
  type TranslateParams,
} from "@/lib/i18n/translate";
import type { MessageKey } from "@/lib/i18n/fr";

/**
 * Angular replacement for the React app's LocaleProvider/I18nContext
 * (src/lib/i18n/context.ts, LocaleProvider.tsx, use-i18n.ts). Wraps the same
 * framework-agnostic translate()/formatNumber()/formatDate() functions copied
 * verbatim into src/lib/i18n/ — only the reactive binding changes (Angular
 * signal instead of a React context).
 */
@Injectable({ providedIn: "root" })
export class LocaleService {
  private readonly localeSignal = signal<Locale>(readStoredLocale() ?? "fr");
  readonly locale = this.localeSignal.asReadonly();

  constructor() {
    const initial = this.localeSignal();
    setCurrentLocale(initial);
    if (initial === "wo") {
      void ensureWolofLoaded().then(() => this.localeSignal.set("wo"));
    }
  }

  setLocale(locale: Locale): void {
    if (!isLocale(locale)) return;
    if (locale === "wo") {
      void ensureWolofLoaded().then(() => {
        this.localeSignal.set("wo");
        setCurrentLocale("wo");
        writeStoredLocale("wo");
      });
      return;
    }
    this.localeSignal.set(locale);
    setCurrentLocale(locale);
    writeStoredLocale(locale);
  }

  readonly t = computed(() => {
    const locale = this.localeSignal();
    return (key: MessageKey, params?: TranslateParams) => translate(locale, key, params);
  });

  tNow(key: MessageKey, params?: TranslateParams): string {
    return translate(this.localeSignal(), key, params);
  }

  tEnum(domain: string, value: string): string {
    return translateEnum(this.localeSignal(), domain, value);
  }

  formatNumber(value: number): string {
    return formatNumber(value, this.localeSignal());
  }

  formatDate(value: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
    return formatDate(value, this.localeSignal(), options);
  }
}

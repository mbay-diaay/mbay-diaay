import { fr, type MessageKey, type Messages } from "./fr";
import { wo } from "./wo";

export type Locale = "fr" | "wo";

const DICTS: Record<Locale, Partial<Messages>> = { fr, wo };

const pluralRules = {
  fr: new Intl.PluralRules("fr"),
  wo: new Intl.PluralRules("wo", { localeMatcher: "lookup" }),
};

export type TranslateParams = Record<string, string | number>;

let currentLocale: Locale = "fr";
/** Langue en cours, pour les messages produits hors d'un composant (erreurs d'actions, règles du circuit). */
export const setCurrentLocale = (locale: Locale) => {
  currentLocale = locale;
};

/** Remplace `{nom}` dans une phrase. */
export function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) => {
    const value = params[name];
    return value === undefined || value === null ? `{${name}}` : String(value);
  });
}

/**
 * Résout une clé : langue courante, sinon français.
 * Pour les pluriels, passer `count` et utiliser les clés `.un` / `.autre`.
 */
export function translate(locale: Locale, key: MessageKey, params?: TranslateParams): string {
  let resolvedKey = key;
  const count = params?.["count"];
  if (typeof count === "number") {
    const base = key.replace(/\.(un|autre)$/, "") as string;
    const category = pluralRules[locale].select(count);
    const pluralKey = (category === "one" ? `${base}.un` : `${base}.autre`) as MessageKey;
    if (pluralKey in fr) resolvedKey = pluralKey;
  }

  const primary = DICTS[locale][resolvedKey];
  const fallback = fr[resolvedKey];
  const template = primary ?? fallback ?? String(resolvedKey);
  return interpolate(template, params);
}

/** Affiche une valeur de référentiel (identifiant français stable). */
export function translateEnum(locale: Locale, domain: string, value: string): string {
  const key = `${domain}.${value}` as MessageKey;
  if (key in fr) return translate(locale, key);
  return value;
}

/** Clés françaises absentes de wo.ts (hors liste explicite « à traduire »). */
export function missingWolofKeys(allowMissing: readonly MessageKey[] = []): MessageKey[] {
  const allow = new Set(allowMissing);
  return (Object.keys(fr) as MessageKey[]).filter((k) => !(k in wo) && !allow.has(k));
}

/** Traduit dans la langue en cours : pour le code qui n'a pas accès au contexte React. */
export const tNow = (key: MessageKey, params?: TranslateParams): string =>
  translate(currentLocale, key, params);

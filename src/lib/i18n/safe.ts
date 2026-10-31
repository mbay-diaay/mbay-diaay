import { useContext } from "react";
import { I18nContext, type I18nContextValue } from "./context";
import { translate } from "./translate";

/**
 * Traducteur utilisable hors de `LocaleProvider` (pages d'erreur racine, squelettes) :
 * sans fournisseur, il répond en français au lieu de lever une erreur.
 */
export function useSafeT(): I18nContextValue["t"] {
  const ctx = useContext(I18nContext);
  return ctx ? ctx.t : (key, params) => translate("fr", key, params);
}

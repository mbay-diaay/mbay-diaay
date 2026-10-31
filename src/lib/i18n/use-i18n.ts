import { useContext } from "react";
import { I18nContext } from "./context";

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n doit être utilisé sous LocaleProvider.");
  }
  return ctx;
}

/** Raccourci : uniquement `t`. */
export function useT() {
  return useI18n().t;
}

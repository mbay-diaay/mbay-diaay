import { useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { nf } from "@/lib/format";

/**
 * Formats d'affichage communs aux écrans : un seul endroit pour les montants en FCFA et les dates, au lieu d'une
 * copie par écran. Les dates « AAAA-MM-JJ » se lisent en UTC pour ne jamais glisser d'un jour selon la machine.
 */
export function useFormat() {
  const { t, formatDate } = useI18n();
  return useMemo(
    () => ({
      /** « 264 000 FCFA ». */
      money: (n: number) => t("common.money", { amount: nf.format(n) }),
      /** Le nombre seul, séparateur de milliers français. */
      amount: (n: number) => nf.format(n),
      /** L'unité seule, pour les tuiles où elle s'écrit à côté du chiffre. */
      currency: t("common.currency"),
      /** « 05 sept. 2026 » (court), « 05 septembre 2026 » (long) ou « 5 septembre 2026 » (fiche). */
      day: (iso: string, style: "short" | "long" | "sheet" = "short") =>
        formatDate(iso, {
          day: style === "sheet" ? "numeric" : "2-digit",
          month: style === "short" ? "short" : "long",
          year: "numeric",
          timeZone: "UTC",
        }),
    }),
    [t, formatDate],
  );
}

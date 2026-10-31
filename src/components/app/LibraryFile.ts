import { useI18n } from "@/lib/i18n";
import { nf1 } from "@/lib/format";

/** Même limite que le store (qui reste l'arbitre) : sert à refuser tôt, avec un message clair. */
export const LIBRARY_MAX_KB = 5 * 1024;

/** Taille lisible : Ko sous 1 Mo, Mo au-delà. */
export function useFileSize() {
  const { t } = useI18n();
  return (kb: number) =>
    kb >= 1024
      ? t("documents.size.mb", { n: nf1.format(kb / 1024) })
      : t("documents.size.kb", { n: nf1.format(Math.max(1, Math.round(kb))) });
}

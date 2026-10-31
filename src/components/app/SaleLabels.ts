import type { SalePayment } from "@/lib/mock/commerce";
import type { MessageKey } from "@/lib/i18n";

export const SALE_PAYMENT_LABEL: Record<SalePayment, MessageKey> = {
  payé: "ventes.state.payé",
  partiel: "ventes.state.partiel",
  "à payer": "ventes.state.à payer",
};

export const SALE_PAYMENT_TONE: Record<SalePayment, "success" | "warning" | "danger"> = {
  payé: "success",
  partiel: "warning",
  "à payer": "danger",
};

/** Lecture d'un nombre saisi : espaces ignorés, virgule acceptée. Vide ou illisible : NaN. */
export const toNumber = (v: string): number => {
  const s = v.replace(/\s/g, "").replace(",", ".");
  return s === "" ? Number.NaN : Number(s);
};

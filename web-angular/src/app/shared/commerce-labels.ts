import type { ExpiryState } from "@/lib/commerce";
import type { MessageKey } from "@/lib/i18n";
import type {
  CreditState,
  InputCategory,
  InputItem,
  InputUnit,
  MovementKind,
  SalePayment,
  StockLot,
} from "@/lib/mock/commerce";

export const CATEGORY_LABEL: Record<InputCategory, MessageKey> = {
  semences: "stocks.category.semences",
  engrais: "stocks.category.engrais",
  phytosanitaires: "stocks.category.phytosanitaires",
  matériel: "stocks.category.matériel",
  autre: "stocks.category.autre",
};

export const UNIT_LABEL: Record<InputUnit, MessageKey> = {
  kg: "stocks.unit.kg",
  l: "stocks.unit.l",
  sac: "stocks.unit.sac",
  unité: "stocks.unit.unité",
};

export const KIND_LABEL: Record<MovementKind, MessageKey> = {
  distribution: "stocks.kind.distribution",
  consommation: "stocks.kind.consommation",
  perte: "stocks.kind.perte",
};

export const EXPIRY_LABEL: Record<ExpiryState, MessageKey> = {
  none: "stocks.expiry.none",
  ok: "stocks.expiry.ok",
  soon: "stocks.expiry.soon",
  expired: "stocks.expiry.expired",
};

export const CREDIT_STATE_LABEL: Record<CreditState, MessageKey> = {
  "en cours": "credits.state.en cours",
  soldé: "credits.state.soldé",
  "en retard": "credits.state.en retard",
};

export type UiPillTone = "info" | "success" | "danger" | "warning" | "neutral";

export const CREDIT_STATE_TONE: Record<CreditState, UiPillTone> = {
  "en cours": "info",
  soldé: "success",
  "en retard": "danger",
};

export const SALE_PAYMENT_LABEL: Record<SalePayment, MessageKey> = {
  payé: "ventes.state.payé",
  partiel: "ventes.state.partiel",
  "à payer": "ventes.state.à payer",
};

export const SALE_PAYMENT_TONE: Record<SalePayment, UiPillTone> = {
  payé: "success",
  partiel: "warning",
  "à payer": "danger",
};

export const PAYMENT_METHOD_LABEL = {
  espèces: "credits.method.espèces",
  "mobile money": "credits.method.mobile money",
  virement: "credits.method.virement",
} as const satisfies Record<string, MessageKey>;

/** Ligne liste stocks : un intrant dans une coopérative. */
export interface StockRow {
  key: string;
  item: InputItem;
  scoopId: string;
  lots: StockLot[];
  balance: number;
  low: boolean;
  expiry: ExpiryState;
}

export const toFormNumber = (v: string): number => {
  const s = v.replace(/\s/g, "").replace(",", ".");
  return s === "" ? Number.NaN : Number(s);
};

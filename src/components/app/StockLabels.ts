import type {
  InputCategory,
  InputItem,
  InputUnit,
  MovementKind,
  StockLot,
} from "@/lib/mock/commerce";
import type { ExpiryState } from "@/lib/commerce";
import { useFormat } from "@/hooks/use-format";
import { useI18n, type MessageKey } from "@/lib/i18n";

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

/** Une ligne de la liste : un intrant dans une coopérative, avec tous ses lots. */
export interface StockRow {
  key: string;
  item: InputItem;
  scoopId: string;
  lots: StockLot[];
  balance: number;
  low: boolean;
  /** Pire état de péremption parmi les lots qu'il reste en stock (« none » si aucun lot ne périme). */
  expiry: ExpiryState;
}

/** Mise en forme commune : dates, quantités avec unité, montants en FCFA. */
export function useStockFormat() {
  const { t, formatDate } = useI18n();
  const { money, amount, currency } = useFormat();
  return {
    money,
    amount,
    currency,
    day: (iso: string) =>
      formatDate(iso, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }),
    qty: (n: number, unit: InputUnit) =>
      t("stocks.qty", { amount: amount(n), unit: t(UNIT_LABEL[unit]) }),
  };
}

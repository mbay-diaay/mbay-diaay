/**
 * Règles du module M2 Commercial (plan 4.9) : stocks par lot, crédits et échéanciers, ventes. Fonctions pures.
 * Rien n'est jamais effacé : une sortie, un remboursement ou une vente se corrige par une annulation avec motif.
 */
import type {
  Credit,
  CreditState,
  InputItem,
  Installment,
  Repayment,
  Sale,
  SalePayment,
  StockLot,
  StockMovement,
} from "./mock/commerce";

const round3 = (n: number) => Math.round(n * 1000) / 1000;
const isDay = (d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d));

// ============ Stocks ============

const live = (m: StockMovement) => m.voided === null;

/** Quantité restante d'un lot : reçu moins les sorties non annulées. */
export const lotBalance = (lot: StockLot, movements: StockMovement[]) =>
  round3(
    lot.quantity -
      movements.filter((m) => m.lotId === lot.id && live(m)).reduce((n, m) => n + m.quantity, 0),
  );

export const itemBalance = (
  itemId: string,
  scoopId: string,
  lots: StockLot[],
  movements: StockMovement[],
) =>
  round3(
    lots
      .filter((l) => l.itemId === itemId && l.scoopId === scoopId)
      .reduce((n, l) => n + lotBalance(l, movements), 0),
  );

export const isLowStock = (item: Pick<InputItem, "alertBelow">, balance: number) =>
  item.alertBelow > 0 && balance < item.alertBelow;

export type ExpiryState = "none" | "ok" | "soon" | "expired";
export const EXPIRY_WARNING_DAYS = 30;

export function expiryState(lot: Pick<StockLot, "expiresAt">, todayIso: string): ExpiryState {
  if (!lot.expiresAt) return "none";
  const today = todayIso.slice(0, 10);
  if (lot.expiresAt < today) return "expired";
  const limit = new Date(Date.parse(`${today}T00:00:00.000Z`) + EXPIRY_WARNING_DAYS * 86_400_000)
    .toISOString()
    .slice(0, 10);
  return lot.expiresAt <= limit ? "soon" : "ok";
}

/** Valeur du stock restant d'un lot, en FCFA. */
export const lotValue = (lot: StockLot, movements: StockMovement[]) =>
  Math.round(lotBalance(lot, movements) * lot.unitPrice);

export type StockIssueKey =
  | "errors.stock.quantity"
  | "errors.stock.balance"
  | "errors.stock.member"
  | "errors.stock.date"
  | "errors.stock.lotFields"
  | "errors.stock.itemFields";

export function movementIssues(
  input: { quantity: number; kind: string; memberId: string | null; date: string },
  balance: number,
  todayIso: string,
): StockIssueKey[] {
  const issues: StockIssueKey[] = [];
  if (!(input.quantity > 0)) issues.push("errors.stock.quantity");
  else if (input.quantity > balance + 1e-9) issues.push("errors.stock.balance");
  if (input.kind === "distribution" && !input.memberId) issues.push("errors.stock.member");
  if (!isDay(input.date) || input.date > todayIso.slice(0, 10)) issues.push("errors.stock.date");
  return issues;
}

export function lotIssues(
  input: {
    lotNumber: string;
    quantity: number;
    unitPrice: number;
    supplier: string;
    receivedAt: string;
    expiresAt: string | null;
  },
  todayIso: string,
): StockIssueKey[] {
  const issues: StockIssueKey[] = [];
  if (
    !input.lotNumber.trim() ||
    !input.supplier.trim() ||
    !(input.quantity > 0) ||
    !(input.unitPrice >= 0)
  )
    issues.push("errors.stock.lotFields");
  if (!isDay(input.receivedAt) || input.receivedAt > todayIso.slice(0, 10))
    issues.push("errors.stock.date");
  if (input.expiresAt && (!isDay(input.expiresAt) || input.expiresAt < input.receivedAt))
    issues.push("errors.stock.date");
  return issues;
}

// ============ Crédits ============

/** Montant à rembourser en tout : capital plus intérêt simple. */
export const totalDue = (c: Pick<Credit, "amount" | "ratePct">) =>
  Math.round(c.amount * (1 + c.ratePct / 100));

const addMonths = (isoDay: string, n: number): string => {
  const [y, m, d] = isoDay.split("-").map(Number) as [number, number, number];
  const target = new Date(Date.UTC(y, m - 1 + n, 1));
  const last = new Date(
    Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0),
  ).getUTCDate();
  return new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), Math.min(d, last)))
    .toISOString()
    .slice(0, 10);
};

/** Échéancier en parts égales (le reste va à la dernière), une échéance tous les `everyMonths` mois. */
export function generateSchedule(opts: {
  amount: number;
  ratePct: number;
  count: number;
  firstDue: string;
  everyMonths: number;
  idPrefix: string;
}): Installment[] {
  const total = totalDue(opts);
  const base = Math.floor(total / opts.count);
  return Array.from({ length: opts.count }, (_, i) => ({
    id: `${opts.idPrefix}-e${i + 1}`,
    dueDate: addMonths(opts.firstDue, i * opts.everyMonths),
    amount: i === opts.count - 1 ? total - base * (opts.count - 1) : base,
  }));
}

export const paidTotal = (creditId: string, repayments: Repayment[]) =>
  repayments
    .filter((r) => r.creditId === creditId && r.voided === null)
    .reduce((n, r) => n + r.amount, 0);

export const creditBalance = (c: Credit, repayments: Repayment[]) =>
  Math.max(0, totalDue(c) - paidTotal(c.id, repayments));

/** Montant échu et non encore couvert par les remboursements (les paiements couvrent d'abord les plus anciennes échéances). */
export function overdueAmount(c: Credit, repayments: Repayment[], todayIso: string): number {
  const today = todayIso.slice(0, 10);
  const due = c.schedule.filter((i) => i.dueDate < today).reduce((n, i) => n + i.amount, 0);
  return Math.max(0, due - paidTotal(c.id, repayments));
}

export function creditState(c: Credit, repayments: Repayment[], todayIso: string): CreditState {
  if (creditBalance(c, repayments) === 0) return "soldé";
  return overdueAmount(c, repayments, todayIso) > 0 ? "en retard" : "en cours";
}

/** Prochaine échéance non couverte (la première dont le cumul dépasse ce qui est déjà payé). */
export function nextInstallment(c: Credit, repayments: Repayment[]): Installment | null {
  let paid = paidTotal(c.id, repayments);
  for (const i of [...c.schedule].sort((a, b) => a.dueDate.localeCompare(b.dueDate))) {
    if (paid >= i.amount) paid -= i.amount;
    else return i;
  }
  return null;
}

export type CreditIssueKey =
  | "errors.credit.amount"
  | "errors.credit.rate"
  | "errors.credit.schedule"
  | "errors.credit.member"
  | "errors.credit.date"
  | "errors.credit.purpose"
  | "errors.credit.repayAmount"
  | "errors.credit.repayBalance";

export function creditIssues(
  input: {
    amount: number;
    ratePct: number;
    count: number;
    firstDue: string;
    grantedAt: string;
    everyMonths?: number;
    purpose?: string;
  },
  todayIso: string,
): CreditIssueKey[] {
  const issues: CreditIssueKey[] = [];
  if (!Number.isInteger(input.amount) || input.amount <= 0) issues.push("errors.credit.amount");
  if (!(input.ratePct >= 0 && input.ratePct <= 100)) issues.push("errors.credit.rate");
  if (!Number.isInteger(input.count) || input.count < 1 || input.count > 36)
    issues.push("errors.credit.schedule");
  if (
    input.everyMonths !== undefined &&
    (!Number.isInteger(input.everyMonths) || input.everyMonths < 1 || input.everyMonths > 12)
  )
    issues.push("errors.credit.schedule");
  if (input.purpose !== undefined && !input.purpose.trim()) issues.push("errors.credit.purpose");
  if (!isDay(input.grantedAt) || input.grantedAt > todayIso.slice(0, 10))
    issues.push("errors.credit.date");
  if (!isDay(input.firstDue) || input.firstDue <= input.grantedAt)
    issues.push("errors.credit.date");
  return issues;
}

export function repaymentIssues(amount: number, balance: number): CreditIssueKey[] {
  if (!Number.isInteger(amount) || amount <= 0) return ["errors.credit.repayAmount"];
  if (amount > balance) return ["errors.credit.repayBalance"];
  return [];
}

export interface CreditTotals {
  granted: number;
  repaid: number;
  outstanding: number;
  overdue: number;
  lateCount: number;
}

export function creditTotals(
  credits: Credit[],
  repayments: Repayment[],
  todayIso: string,
): CreditTotals {
  return {
    granted: credits.reduce((n, c) => n + c.amount, 0),
    repaid: credits.reduce((n, c) => n + paidTotal(c.id, repayments), 0),
    outstanding: credits.reduce((n, c) => n + creditBalance(c, repayments), 0),
    overdue: credits.reduce((n, c) => n + overdueAmount(c, repayments, todayIso), 0),
    lateCount: credits.filter((c) => creditState(c, repayments, todayIso) === "en retard").length,
  };
}

// ============ Ventes ============

export const saleTotal = (s: Pick<Sale, "quantityKg" | "pricePerKg">) =>
  Math.round(s.quantityKg * s.pricePerKg);

export function salePayment(
  s: Pick<Sale, "quantityKg" | "pricePerKg" | "paidAmount">,
): SalePayment {
  const total = saleTotal(s);
  if (s.paidAmount >= total) return "payé";
  return s.paidAmount > 0 ? "partiel" : "à payer";
}

export type SaleIssueKey =
  | "errors.sale.quantity"
  | "errors.sale.price"
  | "errors.sale.buyer"
  | "errors.sale.date"
  | "errors.sale.paid"
  | "errors.sale.producer";

export function saleIssues(
  input: {
    quantityKg: number;
    pricePerKg: number;
    buyer: string;
    soldAt: string;
    paidAmount: number;
  },
  todayIso: string,
): SaleIssueKey[] {
  const issues: SaleIssueKey[] = [];
  if (!(input.quantityKg > 0)) issues.push("errors.sale.quantity");
  if (!(input.pricePerKg > 0)) issues.push("errors.sale.price");
  if (!input.buyer.trim()) issues.push("errors.sale.buyer");
  if (!isDay(input.soldAt) || input.soldAt > todayIso.slice(0, 10)) issues.push("errors.sale.date");
  if (!(input.paidAmount >= 0) || input.paidAmount > saleTotal(input))
    issues.push("errors.sale.paid");
  return issues;
}

export interface SalesTotals {
  count: number;
  quantityKg: number;
  revenue: number;
  collected: number;
  /** Reste à encaisser. */
  receivable: number;
}

export function salesTotals(sales: Sale[]): SalesTotals {
  const liveSales = sales.filter((s) => s.voided === null);
  const revenue = liveSales.reduce((n, s) => n + saleTotal(s), 0);
  const collected = liveSales.reduce((n, s) => n + Math.min(s.paidAmount, saleTotal(s)), 0);
  return {
    count: liveSales.length,
    quantityKg: liveSales.reduce((n, s) => n + s.quantityKg, 0),
    revenue,
    collected,
    receivable: revenue - collected,
  };
}

/** Chiffre d'affaires par culture, du plus gros au plus petit. */
export function salesByCrop(
  sales: Sale[],
): { crop: string; quantityKg: number; revenue: number }[] {
  const by = new Map<string, { crop: string; quantityKg: number; revenue: number }>();
  for (const s of sales.filter((x) => x.voided === null)) {
    const e = by.get(s.crop) ?? { crop: s.crop, quantityKg: 0, revenue: 0 };
    e.quantityKg += s.quantityKg;
    e.revenue += saleTotal(s);
    by.set(s.crop, e);
  }
  return [...by.values()].sort((a, b) => b.revenue - a.revenue);
}

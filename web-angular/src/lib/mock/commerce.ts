/**
 * Entités du module M2 Commercial (plan 4.9) : stocks d'intrants, crédits, ventes.
 * Données de démonstration déterministes, entièrement fictives. Les règles de chaque coopérative restent à valider.
 */
import { MEMBERS, type PaymentMethod } from "./cooperative";
import { PRODUCERS } from "./data";

const at = (iso: string) => `${iso}T09:00:00.000Z`;

// ============ Stocks d'intrants (M2-1) ============

export type InputCategory = "semences" | "engrais" | "phytosanitaires" | "matériel" | "autre";
export const INPUT_CATEGORIES: readonly InputCategory[] = [
  "semences",
  "engrais",
  "phytosanitaires",
  "matériel",
  "autre",
];
export type InputUnit = "kg" | "l" | "sac" | "unité";
export const INPUT_UNITS: readonly InputUnit[] = ["kg", "l", "sac", "unité"];

export interface InputItem {
  id: string;
  name: string;
  category: InputCategory;
  unit: InputUnit;
  /** Alerte quand le stock total d'une coopérative passe sous ce seuil ; 0 = pas d'alerte. */
  alertBelow: number;
}

/** Un lot reçu : la traçabilité suit le numéro de lot, du fournisseur à la distribution. */
export interface StockLot {
  id: string;
  scoopId: string;
  itemId: string;
  lotNumber: string;
  /** Quantité reçue, dans l'unité de l'intrant. */
  quantity: number;
  /** FCFA par unité. */
  unitPrice: number;
  supplier: string;
  receivedAt: string;
  /** Péremption AAAA-MM-JJ ; `null` pour un intrant qui ne périme pas. */
  expiresAt: string | null;
  createdBy: string;
  createdAt: string;
}

export type MovementKind = "distribution" | "consommation" | "perte";
export const MOVEMENT_KINDS: readonly MovementKind[] = ["distribution", "consommation", "perte"];

/** Une sortie de stock n'est jamais effacée : elle s'annule avec un motif. */
export interface StockMovement {
  id: string;
  scoopId: string;
  lotId: string;
  kind: MovementKind;
  quantity: number;
  /** Membre qui reçoit, pour une distribution. */
  memberId: string | null;
  /** AAAA-MM-JJ. */
  date: string;
  note: string;
  by: string;
  createdAt: string;
  voided: { at: string; by: string; reason: string } | null;
}

export const INPUT_ITEMS: InputItem[] = [
  { id: "in1", name: "Semences d'oignon", category: "semences", unit: "kg", alertBelow: 5 },
  { id: "in2", name: "Semences de tomate", category: "semences", unit: "kg", alertBelow: 2 },
  { id: "in3", name: "Engrais NPK 15-15-15", category: "engrais", unit: "sac", alertBelow: 20 },
  { id: "in4", name: "Urée", category: "engrais", unit: "sac", alertBelow: 20 },
  {
    id: "in5",
    name: "Insecticide biologique",
    category: "phytosanitaires",
    unit: "l",
    alertBelow: 10,
  },
  { id: "in6", name: "Tuyau goutte-à-goutte", category: "matériel", unit: "unité", alertBelow: 0 },
];

export const STOCK_LOTS: StockLot[] = [
  {
    id: "lot1",
    scoopId: "s1",
    itemId: "in1",
    lotNumber: "OIG-2026-01",
    quantity: 40,
    unitPrice: 28000,
    supplier: "AgriSem Dakar",
    receivedAt: "2026-09-20",
    expiresAt: "2027-03-31",
    createdBy: "Rokhaya Diallo",
    createdAt: at("2026-09-20"),
  },
  {
    id: "lot2",
    scoopId: "s1",
    itemId: "in3",
    lotNumber: "NPK-2026-07",
    quantity: 120,
    unitPrice: 17500,
    supplier: "Engrais du Sahel",
    receivedAt: "2026-09-25",
    expiresAt: null,
    createdBy: "Rokhaya Diallo",
    createdAt: at("2026-09-25"),
  },
  {
    id: "lot3",
    scoopId: "s1",
    itemId: "in5",
    lotNumber: "BIO-2026-03",
    quantity: 30,
    unitPrice: 9500,
    supplier: "Phyto Niayes",
    receivedAt: "2026-10-02",
    expiresAt: "2026-11-20",
    createdBy: "Rokhaya Diallo",
    createdAt: at("2026-10-02"),
  },
  {
    id: "lot4",
    scoopId: "s1",
    itemId: "in2",
    lotNumber: "TOM-2026-02",
    quantity: 3,
    unitPrice: 85000,
    supplier: "AgriSem Dakar",
    receivedAt: "2026-10-05",
    expiresAt: "2027-06-30",
    createdBy: "Rokhaya Diallo",
    createdAt: at("2026-10-05"),
  },
  {
    id: "lot5",
    scoopId: "s2",
    itemId: "in3",
    lotNumber: "NPK-2026-11",
    quantity: 60,
    unitPrice: 17500,
    supplier: "Engrais du Sahel",
    receivedAt: "2026-09-28",
    expiresAt: null,
    createdBy: "Moussa Diouf",
    createdAt: at("2026-09-28"),
  },
];

export const STOCK_MOVEMENTS: StockMovement[] = (() => {
  const members = MEMBERS.filter((m) => m.scoopId === "s1" && m.status === "membre");
  const mv = (
    n: number,
    lotId: string,
    kind: MovementKind,
    quantity: number,
    date: string,
    k: number,
    note = "",
  ): StockMovement => ({
    id: `mv${n}`,
    scoopId: "s1",
    lotId,
    kind,
    quantity,
    memberId: kind === "distribution" ? (members[k]?.id ?? null) : null,
    date,
    note,
    by: "Rokhaya Diallo",
    createdAt: at(date),
    voided: null,
  });
  return [
    mv(1, "lot1", "distribution", 6, "2026-10-08", 0),
    mv(2, "lot1", "distribution", 5, "2026-10-09", 1),
    mv(3, "lot2", "distribution", 30, "2026-10-12", 2),
    mv(4, "lot2", "distribution", 22, "2026-10-14", 3),
    mv(5, "lot3", "consommation", 4, "2026-10-15", 0, "Traitement collectif"),
    mv(6, "lot4", "distribution", 1.5, "2026-10-16", 4),
    mv(7, "lot3", "perte", 1, "2026-10-18", 0, "Bidon percé"),
  ];
})();

// ============ Crédits (M2-2) ============

export type CreditState = "en cours" | "soldé" | "en retard";

export interface Installment {
  id: string;
  /** AAAA-MM-JJ. */
  dueDate: string;
  /** FCFA. */
  amount: number;
}

/**
 * Crédit accordé par la coopérative à un membre en règle. Hypothèse D22, à valider : taux simple sur la durée,
 * 0 % par défaut ; échéancier fixé à l'octroi.
 */
export interface Credit {
  id: string;
  scoopId: string;
  memberId: string;
  /** Capital prêté, FCFA. */
  amount: number;
  /** Taux simple total en pourcentage du capital. */
  ratePct: number;
  purpose: string;
  grantedAt: string;
  schedule: Installment[];
  grantedBy: string;
  createdAt: string;
}

/** Même liste de modes de paiement que les cotisations : un seul type pour toute l'application. */
export type { PaymentMethod } from "./cooperative";

export interface Repayment {
  id: string;
  scoopId: string;
  creditId: string;
  amount: number;
  paidAt: string;
  method: PaymentMethod;
  receipt: string;
  by: string;
  voided: { at: string; by: string; reason: string } | null;
}

export const CREDITS: Credit[] = (() => {
  const members = MEMBERS.filter((m) => m.scoopId === "s1" && m.status === "membre");
  const credit = (
    n: number,
    k: number,
    amount: number,
    purpose: string,
    grantedAt: string,
    dues: [string, number][],
  ): Credit => ({
    id: `cr${n}`,
    scoopId: "s1",
    memberId: members[k]!.id,
    amount,
    ratePct: 0,
    purpose,
    grantedAt,
    schedule: dues.map(([dueDate, a], i) => ({ id: `cr${n}-e${i + 1}`, dueDate, amount: a })),
    grantedBy: "Babacar Fall",
    createdAt: at(grantedAt),
  });
  return [
    credit(1, 2, 150000, "Semences et engrais pour la campagne", "2026-07-10", [
      ["2026-08-10", 50000],
      ["2026-09-10", 50000],
      ["2026-10-10", 50000],
    ]),
    credit(2, 3, 90000, "Achat de matériel d'irrigation", "2026-09-01", [
      ["2026-11-01", 45000],
      ["2026-12-01", 45000],
    ]),
    credit(3, 5, 60000, "Engrais", "2026-05-15", [
      ["2026-06-15", 30000],
      ["2026-07-15", 30000],
    ]),
  ];
})();

export const REPAYMENTS: Repayment[] = [
  {
    id: "rp1",
    scoopId: "s1",
    creditId: "cr1",
    amount: 50000,
    paidAt: "2026-08-12",
    method: "mobile money",
    receipt: "RC-2026-0001",
    by: "Rokhaya Diallo",
    voided: null,
  },
  {
    id: "rp2",
    scoopId: "s1",
    creditId: "cr1",
    amount: 30000,
    paidAt: "2026-09-14",
    method: "espèces",
    receipt: "RC-2026-0002",
    by: "Rokhaya Diallo",
    voided: null,
  },
  {
    id: "rp3",
    scoopId: "s1",
    creditId: "cr3",
    amount: 60000,
    paidAt: "2026-07-16",
    method: "virement",
    receipt: "RC-2026-0003",
    by: "Rokhaya Diallo",
    voided: null,
  },
];

// ============ Ventes (M2-3) ============

export type SalePayment = "payé" | "partiel" | "à payer";
export const SALE_PAYMENTS: readonly SalePayment[] = ["payé", "partiel", "à payer"];

/** Une vente de production d'un producteur à un acheteur. Hypothèse D23 : le revenu alimentera M3. */
export interface Sale {
  id: string;
  scoopId: string;
  producerId: string;
  crop: string;
  quantityKg: number;
  pricePerKg: number;
  buyer: string;
  soldAt: string;
  campaign: string;
  /** Montant déjà encaissé, FCFA. */
  paidAmount: number;
  by: string;
  createdAt: string;
  voided: { at: string; by: string; reason: string } | null;
}

export const SALES: Sale[] = (() => {
  const ps = PRODUCERS.filter((p) => p.scoopId === "s1" && !p.mergedInto).slice(0, 6);
  const sale = (
    n: number,
    k: number,
    crop: string,
    kg: number,
    price: number,
    buyer: string,
    soldAt: string,
    paid: number,
  ): Sale => ({
    id: `sa${n}`,
    scoopId: "s1",
    producerId: ps[k]!.id,
    crop,
    quantityKg: kg,
    pricePerKg: price,
    buyer,
    soldAt,
    campaign: "CHN 2025-2026",
    paidAmount: paid,
    by: "Mame Diarra Sow",
    createdAt: at(soldAt),
    voided: null,
  });
  return [
    sale(1, 0, "Oignon", 1200, 220, "Marché de Thiaroye", "2026-09-05", 264000),
    sale(2, 1, "Tomate", 800, 300, "Grossiste Sandaga", "2026-09-18", 120000),
    sale(3, 2, "Pomme de terre", 1500, 260, "Marché de Thiaroye", "2026-10-02", 0),
    sale(4, 3, "Chou", 600, 150, "Restaurant Le Lagon", "2026-10-11", 90000),
    sale(5, 4, "Oignon", 2000, 215, "Grossiste Sandaga", "2026-10-15", 430000),
  ];
})();

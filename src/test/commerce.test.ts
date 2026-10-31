import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";
import {
  creditBalance,
  creditIssues,
  creditState,
  creditTotals,
  expiryState,
  generateSchedule,
  isLowStock,
  itemBalance,
  lotBalance,
  lotValue,
  movementIssues,
  nextInstallment,
  overdueAmount,
  repaymentIssues,
  saleIssues,
  salePayment,
  salesByCrop,
  salesTotals,
  saleTotal,
  totalDue,
} from "@/lib/commerce";
import {
  CREDITS,
  INPUT_ITEMS,
  REPAYMENTS,
  SALES,
  STOCK_LOTS,
  STOCK_MOVEMENTS,
} from "@/lib/mock/commerce";
import { scopedCredits, scopedSales } from "@/lib/scope";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const TODAY = "2026-10-26T00:00:00.000Z";
const gest = () => actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
const lot = (id: string) => STOCK_LOTS.find((l) => l.id === id)!;
const credit = (id: string) => CREDITS.find((c) => c.id === id)!;

describe("stocks : règles pures", () => {
  it("calcule le solde d'un lot et d'un intrant, sans compter les sorties annulées", () => {
    expect(lotBalance(lot("lot1"), STOCK_MOVEMENTS)).toBe(29);
    expect(itemBalance("in1", "s1", STOCK_LOTS, STOCK_MOVEMENTS)).toBe(29);
    const voided = STOCK_MOVEMENTS.map((m) =>
      m.id === "mv1" ? { ...m, voided: { at: "", by: "", reason: "x" } } : m,
    );
    expect(lotBalance(lot("lot1"), voided)).toBe(35);
    expect(lotValue(lot("lot2"), STOCK_MOVEMENTS)).toBe(Math.round(68 * 17500));
  });

  it("signale un stock bas et une péremption proche ou dépassée", () => {
    const tomate = INPUT_ITEMS.find((i) => i.id === "in2")!;
    expect(isLowStock(tomate, itemBalance("in2", "s1", STOCK_LOTS, STOCK_MOVEMENTS))).toBe(true);
    expect(isLowStock({ alertBelow: 0 }, 0)).toBe(false);
    expect(expiryState({ expiresAt: null }, TODAY)).toBe("none");
    expect(expiryState({ expiresAt: "2026-11-20" }, TODAY)).toBe("soon");
    expect(expiryState({ expiresAt: "2027-03-31" }, TODAY)).toBe("ok");
    expect(expiryState({ expiresAt: "2026-10-01" }, TODAY)).toBe("expired");
  });

  it("refuse une sortie plus grande que le solde, sans membre, ou datée dans le futur", () => {
    const ok = { quantity: 5, kind: "distribution", memberId: "m1", date: "2026-10-20" };
    expect(movementIssues(ok, 10, TODAY)).toEqual([]);
    expect(movementIssues({ ...ok, quantity: 11 }, 10, TODAY)).toContain("errors.stock.balance");
    expect(movementIssues({ ...ok, quantity: 0 }, 10, TODAY)).toContain("errors.stock.quantity");
    expect(movementIssues({ ...ok, memberId: null }, 10, TODAY)).toContain("errors.stock.member");
    expect(movementIssues({ ...ok, kind: "perte", memberId: null }, 10, TODAY)).toEqual([]);
    expect(movementIssues({ ...ok, date: "2999-01-01" }, 10, TODAY)).toContain("errors.stock.date");
  });
});

describe("crédits : règles pures", () => {
  it("génère un échéancier en parts égales, le reste à la dernière, fin de mois respectée", () => {
    const s = generateSchedule({
      amount: 100000,
      ratePct: 0,
      count: 3,
      firstDue: "2026-11-30",
      everyMonths: 1,
      idPrefix: "x",
    });
    expect(s.map((i) => i.amount)).toEqual([33333, 33333, 33334]);
    expect(s.map((i) => i.dueDate)).toEqual(["2026-11-30", "2026-12-30", "2027-01-30"]);
    expect(
      generateSchedule({
        amount: 10000,
        ratePct: 0,
        count: 2,
        firstDue: "2026-01-31",
        everyMonths: 1,
        idPrefix: "y",
      }).map((i) => i.dueDate),
    ).toEqual(["2026-01-31", "2026-02-28"]);
    expect(totalDue({ amount: 100000, ratePct: 10 })).toBe(110000);
    expect(
      generateSchedule({
        amount: 100000,
        ratePct: 10,
        count: 4,
        firstDue: "2026-11-01",
        everyMonths: 1,
        idPrefix: "z",
      }).reduce((n, i) => n + i.amount, 0),
    ).toBe(110000);
  });

  it("donne l'état d'un crédit : en retard, en cours, soldé, avec le montant échu", () => {
    expect(creditState(credit("cr1"), REPAYMENTS, TODAY)).toBe("en retard");
    expect(overdueAmount(credit("cr1"), REPAYMENTS, TODAY)).toBe(70000);
    expect(creditBalance(credit("cr1"), REPAYMENTS)).toBe(70000);
    expect(creditState(credit("cr2"), REPAYMENTS, TODAY)).toBe("en cours");
    expect(creditState(credit("cr3"), REPAYMENTS, TODAY)).toBe("soldé");
    expect(nextInstallment(credit("cr1"), REPAYMENTS)?.dueDate).toBe("2026-09-10");
    expect(nextInstallment(credit("cr3"), REPAYMENTS)).toBeNull();
  });

  it("ne compte pas un remboursement annulé et totalise l'encours", () => {
    const voided = REPAYMENTS.map((r) =>
      r.id === "rp2" ? { ...r, voided: { at: "", by: "", reason: "x" } } : r,
    );
    expect(creditBalance(credit("cr1"), voided)).toBe(100000);
    const t = creditTotals(CREDITS, REPAYMENTS, TODAY);
    expect(t).toMatchObject({
      granted: 300000,
      repaid: 140000,
      outstanding: 160000,
      overdue: 70000,
      lateCount: 1,
    });
  });

  it("contrôle l'octroi et les remboursements", () => {
    const ok = {
      amount: 50000,
      ratePct: 0,
      count: 3,
      firstDue: "2026-12-01",
      grantedAt: "2026-10-20",
    };
    expect(creditIssues(ok, TODAY)).toEqual([]);
    expect(creditIssues({ ...ok, amount: 0 }, TODAY)).toContain("errors.credit.amount");
    expect(creditIssues({ ...ok, ratePct: 150 }, TODAY)).toContain("errors.credit.rate");
    expect(creditIssues({ ...ok, count: 0 }, TODAY)).toContain("errors.credit.schedule");
    expect(creditIssues({ ...ok, firstDue: "2026-10-10" }, TODAY)).toContain("errors.credit.date");
    expect(repaymentIssues(1000, 5000)).toEqual([]);
    expect(repaymentIssues(6000, 5000)).toContain("errors.credit.repayBalance");
    expect(repaymentIssues(0, 5000)).toContain("errors.credit.repayAmount");
  });
});

describe("ventes : règles pures", () => {
  it("calcule le total, l'état de paiement, les totaux et le chiffre d'affaires par culture", () => {
    expect(saleTotal(SALES[0]!)).toBe(264000);
    expect(salePayment(SALES[0]!)).toBe("payé");
    expect(salePayment(SALES[1]!)).toBe("partiel");
    expect(salePayment(SALES[2]!)).toBe("à payer");
    const t = salesTotals(SALES);
    expect(t.revenue).toBe(264000 + 240000 + 390000 + 90000 + 430000);
    expect(t.revenue - t.collected).toBe(t.receivable);
    expect(salesByCrop(SALES)[0]).toMatchObject({ crop: "Oignon", revenue: 694000 });
    expect(
      salesTotals(SALES.map((s) => ({ ...s, voided: { at: "", by: "", reason: "x" } }))).count,
    ).toBe(0);
  });

  it("refuse une vente sans quantité, prix, acheteur, avec une date future ou un encaissement trop grand", () => {
    const ok = {
      quantityKg: 100,
      pricePerKg: 200,
      buyer: "Marché",
      soldAt: "2026-10-20",
      paidAmount: 0,
    };
    expect(saleIssues(ok, TODAY)).toEqual([]);
    expect(saleIssues({ ...ok, quantityKg: 0 }, TODAY)).toContain("errors.sale.quantity");
    expect(saleIssues({ ...ok, pricePerKg: 0 }, TODAY)).toContain("errors.sale.price");
    expect(saleIssues({ ...ok, buyer: " " }, TODAY)).toContain("errors.sale.buyer");
    expect(saleIssues({ ...ok, soldAt: "2999-01-01" }, TODAY)).toContain("errors.sale.date");
    expect(saleIssues({ ...ok, paidAmount: 20001 }, TODAY)).toContain("errors.sale.paid");
  });
});

describe("M2 : actions du store", () => {
  it("le gestionnaire reçoit un lot, distribue sans dépasser le solde, annule avec motif", () => {
    gest();
    const received = actions.receiveLot({
      scoopId: "s1",
      itemId: "in4",
      lotNumber: "URE-1",
      quantity: 10,
      unitPrice: 15000,
      supplier: "Sahel",
      receivedAt: "2026-10-20",
      expiresAt: null,
    });
    if (!received.ok) throw new Error(received.error);
    const member = getState().members.find((m) => m.scoopId === "s1" && m.status === "membre")!;
    const base = {
      lotId: received.id,
      kind: "distribution" as const,
      memberId: member.id,
      date: "2026-10-21",
    };
    expect(actions.recordMovement({ ...base, quantity: 11 }).ok).toBe(false);
    const mv = actions.recordMovement({ ...base, quantity: 4 });
    if (!mv.ok) throw new Error(mv.error);
    expect(
      lotBalance(
        getState().stockLots.find((l) => l.id === received.id)!,
        getState().stockMovements,
      ),
    ).toBe(6);
    expect(actions.voidMovement(mv.id, "x").ok).toBe(false);
    expect(actions.voidMovement(mv.id, "erreur de saisie").ok).toBe(true);
    expect(
      lotBalance(
        getState().stockLots.find((l) => l.id === received.id)!,
        getState().stockMovements,
      ),
    ).toBe(10);
    expect(actions.voidMovement(mv.id, "encore").ok).toBe(false);
    const otherScoopMember = getState().members.find(
      (m) => m.scoopId === "s2" && m.status === "membre",
    )!;
    expect(actions.recordMovement({ ...base, memberId: otherScoopMember.id, quantity: 1 }).ok).toBe(
      false,
    );
    expect(
      actions.receiveLot({
        scoopId: "s2",
        itemId: "in4",
        lotNumber: "X",
        quantity: 1,
        unitPrice: 1,
        supplier: "S",
        receivedAt: "2026-10-20",
        expiresAt: null,
      }).ok,
    ).toBe(false);
  });

  it("octroie un crédit à un membre de sa coopérative, enregistre et annule un remboursement", () => {
    gest();
    const member = getState().members.find((m) => m.scoopId === "s1" && m.status === "membre")!;
    const res = actions.grantCredit({
      memberId: member.id,
      amount: 90000,
      ratePct: 0,
      purpose: "Engrais",
      grantedAt: "2026-10-20",
      count: 3,
      firstDue: "2026-11-20",
      everyMonths: 1,
    });
    if (!res.ok) throw new Error(res.error);
    const credit = getState().credits.find((c) => c.id === res.id)!;
    expect(credit.schedule.map((i) => i.amount)).toEqual([30000, 30000, 30000]);
    expect(
      actions.recordRepayment({
        creditId: res.id,
        amount: 100000,
        paidAt: "2026-10-21",
        method: "espèces",
      }).ok,
    ).toBe(false);
    const rep = actions.recordRepayment({
      creditId: res.id,
      amount: 30000,
      paidAt: "2026-10-21",
      method: "espèces",
    });
    if (!rep.ok) throw new Error(rep.error);
    expect(rep.receipt).toMatch(/^RC-2026-\d{4}$/);
    expect(creditBalance(credit, getState().repayments)).toBe(60000);
    expect(actions.voidRepayment(rep.id, "saisi deux fois").ok).toBe(true);
    expect(creditBalance(credit, getState().repayments)).toBe(90000);
    const candidate = getState().members.find((m) => m.scoopId === "s1" && m.status === "candidat");
    if (candidate)
      expect(
        actions.grantCredit({
          memberId: candidate.id,
          amount: 1000,
          ratePct: 0,
          purpose: "",
          grantedAt: "2026-10-20",
          count: 1,
          firstDue: "2026-11-20",
          everyMonths: 1,
        }).ok,
      ).toBe(false);
    expect(getState().audit.some((a) => a.action === "Crédit accordé" && a.scoopId === "s1")).toBe(
      true,
    );
  });

  it("enregistre une vente dans la campagne en cours, encaisse le solde, l'annule avec motif", () => {
    gest();
    const producer = getState().producers.find((p) => p.scoopId === "s1" && !p.mergedInto)!;
    const base = {
      producerId: producer.id,
      crop: "Oignon",
      quantityKg: 500,
      pricePerKg: 200,
      buyer: "Marché de Thiaroye",
      soldAt: "2026-10-20",
    };
    expect(actions.recordSale({ ...base, quantityKg: 0 }).ok).toBe(false);
    const res = actions.recordSale({ ...base, paidAmount: 40000 });
    if (!res.ok) throw new Error(res.error);
    expect(getState().sales.find((s) => s.id === res.id)?.campaign).toBe("CHN 2025-2026");
    expect(actions.addSalePayment(res.id, 70000).ok).toBe(false);
    expect(actions.addSalePayment(res.id, 60000).ok).toBe(true);
    expect(salePayment(getState().sales.find((s) => s.id === res.id)!)).toBe("payé");
    expect(actions.voidSale(res.id, "x").ok).toBe(false);
    expect(actions.voidSale(res.id, "vente annulée par l'acheteur").ok).toBe(true);
    const other = getState().producers.find((p) => p.scoopId === "s2" && !p.mergedInto)!;
    expect(actions.recordSale({ ...base, producerId: other.id }).ok).toBe(false);
  });

  it("refuse aux rôles sans droit, et cloisonne crédits et ventes par coopérative", () => {
    actions.login("Test", "secretaire@exemple.sn", "secretaire");
    expect(
      actions.grantCredit({
        memberId: "m1",
        amount: 1,
        ratePct: 0,
        purpose: "",
        grantedAt: "2026-10-20",
        count: 1,
        firstDue: "2026-11-20",
        everyMonths: 1,
      }).ok,
    ).toBe(false);
    expect(
      actions.recordSale({
        producerId: "p1",
        crop: "Oignon",
        quantityKg: 1,
        pricePerKg: 1,
        buyer: "x",
        soldAt: "2026-10-20",
      }).ok,
    ).toBe(false);
    expect(
      actions.addInputItem({ name: "x", category: "autre", unit: "kg", alertBelow: 0 }).ok,
    ).toBe(false);
    gest();
    expect(
      scopedCredits(getState().credits, getState().session).every((c) => c.scoopId === "s1"),
    ).toBe(true);
    expect(scopedSales(getState().sales, getState().session).every((s) => s.scoopId === "s1")).toBe(
      true,
    );
  });
});

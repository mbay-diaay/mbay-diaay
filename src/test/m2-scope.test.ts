import { describe, expect, it } from "vitest";
import { fetchMyPermissions, type RoleId } from "@/lib/permissions";
import type { Session } from "@/lib/store";
import {
  scopedCredits,
  scopedLots,
  scopedMovements,
  scopedRepayments,
  scopedSales,
} from "@/lib/scope";
import { CREDITS, SALES, STOCK_LOTS, STOCK_MOVEMENTS, REPAYMENTS } from "@/lib/mock/commerce";

const sessionOf = (role: RoleId, scoopIds?: string[]): Session => ({
  name: "Test",
  email: "test@exemple.sn",
  role,
  expiresAt: Date.now() + 60_000,
  ...fetchMyPermissions(role, scoopIds),
});
const foreign = <T extends { scoopId: string }>(item: T): T => ({ ...item, scoopId: "s9" });

const data = {
  lots: [...STOCK_LOTS.slice(0, 2), foreign(STOCK_LOTS[0]!)],
  movements: [...STOCK_MOVEMENTS.slice(0, 2), foreign(STOCK_MOVEMENTS[0]!)],
  credits: [...CREDITS.slice(0, 2), foreign(CREDITS[0]!)],
  repayments: [...REPAYMENTS.slice(0, 2), foreign(REPAYMENTS[0]!)],
  sales: [...SALES.slice(0, 2), foreign(SALES[0]!)],
};
const all = (s: Session) => ({
  lots: scopedLots(data.lots, s),
  movements: scopedMovements(data.movements, s),
  credits: scopedCredits(data.credits, s),
  repayments: scopedRepayments(data.repayments, s),
  sales: scopedSales(data.sales, s),
});

describe("M2 : droit de lecture et périmètre, toujours ensemble", () => {
  it("le rôle « ventes » lit stocks et ventes mais aucun crédit ni remboursement", () => {
    const r = all(sessionOf("ventes", ["s1"]));
    expect(r.lots.length).toBeGreaterThan(0);
    expect(r.sales.length).toBeGreaterThan(0);
    expect(r.credits).toEqual([]);
    expect(r.repayments).toEqual([]);
  });

  it("la secrétaire lit les stocks, ni les crédits ni les ventes", () => {
    const r = all(sessionOf("secretaire", ["s1"]));
    expect(r.lots.length).toBeGreaterThan(0);
    expect(r.credits).toEqual([]);
    expect(r.repayments).toEqual([]);
    expect(r.sales).toEqual([]);
  });

  it("le technicien et le rôle rapports ne lisent aucun crédit ni aucun stock", () => {
    for (const role of ["technicien", "rapports"] as const) {
      const r = all(sessionOf(role, ["s1"]));
      expect(r.credits, role).toEqual([]);
      expect(r.lots, role).toEqual([]);
    }
    // Le rôle rapports lit les ventes, le technicien non.
    expect(all(sessionOf("rapports", ["s1"])).sales.length).toBeGreaterThan(0);
    expect(all(sessionOf("technicien", ["s1"])).sales).toEqual([]);
  });

  it("un gestionnaire ou un représentant ne voit pas les crédits ni les ventes d'une autre SCOOP", () => {
    for (const role of ["gestionnaire", "representant"] as const) {
      const r = all(sessionOf(role, ["s1"]));
      expect(
        r.credits.every((c) => c.scoopId === "s1"),
        role,
      ).toBe(true);
      expect(r.credits.length).toBeGreaterThan(0);
      expect(
        r.sales.every((x) => x.scoopId === "s1"),
        role,
      ).toBe(true);
      expect(
        r.lots.every((x) => x.scoopId === "s1"),
        role,
      ).toBe(true);
      expect(
        r.repayments.every((x) => x.scoopId === "s1"),
        role,
      ).toBe(true);
    }
  });

  it("l'administrateur et la faîtière voient toutes les SCOOP", () => {
    for (const role of ["admin", "faitiere"] as const) {
      const r = all(sessionOf(role));
      expect(r.credits).toHaveLength(data.credits.length);
      expect(r.sales).toHaveLength(data.sales.length);
      expect(r.lots).toHaveLength(data.lots.length);
    }
  });

  it("sans session, rien n'est lisible", () => {
    expect(scopedCredits(data.credits, null)).toEqual([]);
    expect(scopedSales(data.sales, null)).toEqual([]);
    expect(scopedLots(data.lots, null)).toEqual([]);
  });
});

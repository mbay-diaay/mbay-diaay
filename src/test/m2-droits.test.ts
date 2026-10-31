import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";
import type { RoleId } from "@/lib/permissions";

// La connexion mémorise la session dans le navigateur : un stockage en mémoire suffit pour les règles.
beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const ACCOUNTS: Record<string, [string, string, RoleId]> = {
  admin: ["Aïssatou Ndiaye", "aissatou.ndiaye@cradesc.example", "admin"],
  gestionnaire: ["Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire"],
  representant: ["Moussa Diouf", "moussa.diouf@scoop-kms.example", "representant"],
  secretaire: ["Aminata Bâ", "aminata.ba@scoop-kms.example", "secretaire"],
  ventes: ["Ibrahima Seck", "ibrahima.seck@scoop-kms.example", "ventes"],
  faitiere: ["Ousmane Guèye", "ousmane.gueye@uscn.example", "faitiere"],
  technicien: ["Fatou Sarr", "fatou.sarr@cradesc.example", "technicien"],
};
const as = (who: keyof typeof ACCOUNTS) => {
  const [name, email, role] = ACCOUNTS[who]!;
  actions.login(name, email, role);
};
const today = new Date().toISOString().slice(0, 10);

describe("M2 : droits appliqués par le store", () => {
  const member = () => getState().members.find((m) => m.scoopId === "s1" && m.status === "membre")!;
  const credit = { amount: 50_000, ratePct: 5, purpose: "Intrants", count: 2, everyMonths: 1 };
  const grant = (memberId: string) =>
    actions.grantCredit({ ...credit, memberId, grantedAt: today, firstDue: "2027-01-01" });

  it("seuls l'administrateur et le gestionnaire accordent un crédit", () => {
    for (const who of ["representant", "secretaire", "ventes", "faitiere", "technicien"] as const) {
      as(who);
      expect(grant(member().id).ok, who).toBe(false);
    }
    as("gestionnaire");
    expect(grant(member().id).ok).toBe(true);
  });

  it("un gestionnaire n'accorde pas de crédit à un membre d'une autre SCOOP", () => {
    as("gestionnaire");
    const other = getState().members.find((m) => m.scoopId !== "s1" && m.status === "membre");
    expect(other).toBeDefined();
    expect(grant(other!.id).ok).toBe(false);
  });

  it("seuls l'administrateur, le gestionnaire et le rôle ventes enregistrent une vente", () => {
    const producer = getState().producers.find((p) => p.scoopId === "s1" && !p.mergedInto)!;
    const sale = {
      producerId: producer.id,
      crop: "Oignon",
      quantityKg: 100,
      pricePerKg: 250,
      buyer: "Marché de Thiaroye",
      soldAt: today,
    };
    for (const who of ["representant", "secretaire", "faitiere", "technicien"] as const) {
      as(who);
      expect(actions.recordSale(sale).ok, who).toBe(false);
    }
    as("ventes");
    expect(actions.recordSale(sale).ok).toBe(true);
  });

  it("le rôle ventes ne peut ni rembourser ni accorder de crédit", () => {
    as("ventes");
    const c = getState().credits[0]!;
    expect(
      actions.recordRepayment({ creditId: c.id, amount: 1000, paidAt: today, method: "espèces" })
        .ok,
    ).toBe(false);
  });

  it("seuls l'administrateur et le gestionnaire reçoivent un lot de stock", () => {
    const item = getState().inputItems[0]!;
    const lot = {
      scoopId: "s1",
      itemId: item.id,
      lotNumber: "LOT-TEST-1",
      quantity: 10,
      unitPrice: 1000,
      supplier: "Fournisseur test",
      receivedAt: today,
      expiresAt: null,
    };
    for (const who of ["representant", "secretaire", "ventes", "technicien"] as const) {
      as(who);
      expect(actions.receiveLot(lot).ok, who).toBe(false);
    }
    as("gestionnaire");
    expect(actions.receiveLot(lot).ok).toBe(true);
  });
});

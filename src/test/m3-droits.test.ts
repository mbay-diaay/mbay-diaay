import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState, type Session } from "@/lib/store";
import { fetchMyPermissions, type RoleId } from "@/lib/permissions";
import { exploitationExpenses, exploitationSales, scopedExpenses } from "@/lib/scope";
import { EXPENSES } from "@/lib/mock/exploitation";
import { SALES } from "@/lib/mock/commerce";

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
  technicien: ["Fatou Sarr", "fatou.sarr@cradesc.example", "technicien"],
  secretaire: ["Aminata Bâ", "aminata.ba@scoop-kms.example", "secretaire"],
  ventes: ["Ibrahima Seck", "ibrahima.seck@scoop-kms.example", "ventes"],
  representant: ["Moussa Diouf", "moussa.diouf@scoop-kms.example", "representant"],
  faitiere: ["Ousmane Guèye", "ousmane.gueye@uscn.example", "faitiere"],
};
const as = (who: keyof typeof ACCOUNTS) => {
  const [name, email, role] = ACCOUNTS[who]!;
  actions.login(name, email, role);
};
const sessionOf = (role: RoleId, scoopIds?: string[]): Session => ({
  name: "Test",
  email: "test@exemple.sn",
  role,
  expiresAt: Date.now() + 60_000,
  ...fetchMyPermissions(role, scoopIds),
});
const today = new Date().toISOString().slice(0, 10);

describe("M3 : charges et comptes d'exploitation, droit puis périmètre", () => {
  const foreign = <T extends { scoopId: string }>(item: T): T => ({ ...item, scoopId: "s9" });
  const expenses = [...EXPENSES.slice(0, 2), foreign(EXPENSES[0]!)];
  const sales = [...SALES.slice(0, 2), foreign(SALES[0]!)];

  it("le technicien lit les charges de ses SCOOP, jamais les ventes ni les marges", () => {
    const tech = sessionOf("technicien", ["s1", "s2"]);
    expect(scopedExpenses(expenses, tech).length).toBeGreaterThan(0);
    expect(scopedExpenses(expenses, tech).every((e) => e.scoopId !== "s9")).toBe(true);
    expect(exploitationSales(sales, tech)).toEqual([]);
    expect(exploitationExpenses(expenses, tech)).toEqual([]);
  });

  it("la secrétaire et le rôle ventes ne lisent ni charges ni comptes d'exploitation", () => {
    for (const role of ["secretaire", "ventes"] as const) {
      const s = sessionOf(role, ["s1"]);
      expect(scopedExpenses(expenses, s), role).toEqual([]);
      expect(exploitationSales(sales, s), role).toEqual([]);
      expect(exploitationExpenses(expenses, s), role).toEqual([]);
    }
  });

  it("gestionnaire, représentant et rapports lisent leur SCOOP seulement", () => {
    for (const role of ["gestionnaire", "representant", "rapports"] as const) {
      const s = sessionOf(role, ["s1"]);
      expect(
        exploitationExpenses(expenses, s).every((e) => e.scoopId === "s1"),
        role,
      ).toBe(true);
      expect(
        exploitationSales(sales, s).every((x) => x.scoopId === "s1"),
        role,
      ).toBe(true);
      expect(exploitationSales(sales, s).length, role).toBeGreaterThan(0);
    }
  });

  it("l'administrateur et la faîtière voient toutes les SCOOP, sans session rien", () => {
    for (const role of ["admin", "faitiere"] as const) {
      const s = sessionOf(role);
      expect(exploitationExpenses(expenses, s)).toHaveLength(expenses.length);
      expect(exploitationSales(sales, s)).toHaveLength(sales.length);
    }
    expect(scopedExpenses(expenses, null)).toEqual([]);
  });
});

describe("M3 : droits appliqués par le store", () => {
  const producerOf = (scoopId: string) =>
    getState().producers.find((p) => p.scoopId === scoopId && !p.mergedInto)!;
  const charge = (producerId: string) => ({
    producerId,
    crop: "Oignon",
    category: "intrants" as const,
    amount: 12_000,
    date: today,
  });

  it("administrateur, gestionnaire et technicien saisissent une charge ; les autres non", () => {
    const p = producerOf("s1");
    for (const who of ["secretaire", "ventes", "representant", "faitiere"] as const) {
      as(who);
      expect(actions.recordExpense(charge(p.id)).ok, who).toBe(false);
    }
    for (const who of ["technicien", "gestionnaire", "admin"] as const) {
      as(who);
      expect(actions.recordExpense(charge(p.id)).ok, who).toBe(true);
    }
  });

  it("un technicien ne saisit pas de charge pour un producteur d'une SCOOP qui n'est pas la sienne", () => {
    as("technicien");
    expect(actions.recordExpense(charge(producerOf("s4").id)).ok).toBe(false);
  });

  it("une charge ne se supprime pas : elle s'annule avec un motif, et reste dans la liste", () => {
    as("gestionnaire");
    const created = actions.recordExpense(charge(producerOf("s1").id));
    const id = created.ok ? created.id : "";
    expect(actions.voidExpense(id, "x").ok).toBe(false);
    expect(actions.voidExpense(id, "Montant saisi par erreur").ok).toBe(true);
    const kept = getState().expenses.find((e) => e.id === id);
    expect(kept?.voided?.reason).toBe("Montant saisi par erreur");
    expect(actions.voidExpense(id, "Encore une fois").ok).toBe(false);
  });

  it("consulter le compte d'exploitation d'un producteur est refusé sans droit, et tracé avec", () => {
    const p = producerOf("s1");
    for (const who of ["technicien", "secretaire", "ventes"] as const) {
      as(who);
      expect(actions.consultExploitation(p.id).ok, who).toBe(false);
    }
    as("gestionnaire");
    const before = getState().audit.length;
    expect(actions.consultExploitation(p.id).ok).toBe(true);
    const entry = getState().audit[0]!;
    expect(getState().audit.length).toBe(before + 1);
    expect(entry.action).toBe("Consultation du compte d'exploitation");
    expect(entry.scoopId).toBe("s1");
    // Un gestionnaire ne consulte pas un producteur d'une autre SCOOP.
    expect(actions.consultExploitation(producerOf("s4").id).ok).toBe(false);
  });
});

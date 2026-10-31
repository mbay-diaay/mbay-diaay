import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";
import { memberDues, paymentIssues, scoopTotals, dueLines } from "@/lib/contributions";
import type { ContributionPayment, ContributionRule } from "@/lib/mock/cooperative";
import { scopedPayments } from "@/lib/scope";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const NOW = "2026-10-25T00:00:00.000Z";
const annual: ContributionRule = {
  scoopId: "s1",
  amount: 5000,
  periodicity: "annuelle",
  dueDate: "03-31",
  startYear: 2025,
  confirmed: false,
};
const monthly: ContributionRule = { ...annual, periodicity: "mensuelle", startYear: 2026 };
const member = (joinedAt: string | null, status: "membre" | "candidat" | "sorti" = "membre") => ({
  id: "m",
  status,
  joinedAt,
});
const pay = (period: string, amount: number, voided = false): ContributionPayment => ({
  id: `p${period}${amount}`,
  scoopId: "s1",
  memberId: "m",
  amount,
  paidAt: NOW,
  period,
  method: "espèces",
  receipt: "R",
  recordedBy: "x",
  note: "",
  voided: voided ? { at: NOW, by: "x", reason: "erreur" } : null,
});

describe("cotisations : règles pures", () => {
  it("n'exige pas une période échue avant l'adhésion", () => {
    // adhésion en juin 2025 : l'échéance du 31 mars 2025 est passée, seule 2026 est due
    expect(dueLines(member("2025-06-10T00:00:00.000Z"), annual, NOW).map((l) => l.period)).toEqual([
      "2026",
    ]);
    expect(dueLines(member("2024-01-01T00:00:00.000Z"), annual, NOW).map((l) => l.period)).toEqual([
      "2025",
      "2026",
    ]);
  });

  it("calcule l'état : jamais payé, en retard (solde), à jour", () => {
    const m = member("2025-06-10T00:00:00.000Z");
    expect(memberDues(m, annual, [], NOW).state).toBe("jamais payé");
    const partial = memberDues(m, annual, [pay("2026", 2500)], NOW);
    expect(partial.state).toBe("en retard");
    expect(partial.balance).toBe(2500);
    expect(memberDues(m, annual, [pay("2026", 2500), pay("2026", 2500)], NOW).state).toBe("à jour");
  });

  it("ignore un paiement annulé", () => {
    expect(
      memberDues(member("2025-06-10T00:00:00.000Z"), annual, [pay("2026", 5000, true)], NOW).state,
    ).toBe("jamais payé");
  });

  it("ne demande rien à un candidat, à un sorti ou sans règle", () => {
    expect(memberDues(member(null, "candidat"), annual, [], NOW).state).toBe("non exigible");
    expect(memberDues(member("2024-01-01T00:00:00.000Z", "sorti"), annual, [], NOW).state).toBe(
      "non exigible",
    );
    expect(memberDues(member("2024-01-01T00:00:00.000Z"), undefined, [], NOW).state).toBe(
      "non exigible",
    );
  });

  it("mensuelle : une période est due une fois le mois fini", () => {
    const lines = dueLines(member("2026-01-15T00:00:00.000Z"), monthly, NOW);
    expect(lines).toHaveLength(9);
    expect(lines.at(-1)?.period).toBe("2026-09");
  });

  it("totalise le recouvrement d'une coopérative", () => {
    const members = [
      { ...member("2025-06-10T00:00:00.000Z"), id: "a" },
      { ...member("2025-06-10T00:00:00.000Z"), id: "b" },
    ];
    const payments = [{ ...pay("2026", 5000), memberId: "a" }];
    const t = scoopTotals(members as never, annual, payments, NOW);
    expect(t).toMatchObject({ expected: 10000, collected: 5000, rate: 50, late: 1, upToDate: 1 });
  });

  it("contrôle un paiement avant de l'enregistrer", () => {
    expect(paymentIssues({ amount: 0, period: "2026", memberId: "m" }, annual, ["m"])).toHaveLength(
      1,
    );
    expect(
      paymentIssues({ amount: 5000, period: "2026-03", memberId: "m" }, annual, ["m"]),
    ).toHaveLength(1);
    expect(
      paymentIssues({ amount: 5000, period: "2026", memberId: "x" }, annual, ["m"]),
    ).toHaveLength(1);
    expect(paymentIssues({ amount: 5000, period: "2026", memberId: "m" }, annual, ["m"])).toEqual(
      [],
    );
  });
});

describe("cotisations : actions du store", () => {
  it("enregistre un paiement avec reçu et journal, dans la SCOOP de la personne seulement", () => {
    actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    const s1 = getState().members.find((m) => m.scoopId === "s1" && m.status === "membre")!;
    const s2 = getState().members.find((m) => m.scoopId === "s2" && m.status === "membre")!;
    const before = getState().payments.length;
    const ok = actions.recordPayment({
      memberId: s1.id,
      amount: 5000,
      period: "2026",
      method: "espèces",
    });
    expect(ok.ok).toBe(true);
    expect(getState().payments).toHaveLength(before + 1);
    expect(getState().audit[0]).toMatchObject({ action: "Cotisation enregistrée", scoopId: "s1" });
    const refused = actions.recordPayment({
      memberId: s2.id,
      amount: 500,
      period: "2026-10",
      method: "espèces",
    });
    expect(refused.ok).toBe(false);
    expect(
      scopedPayments(getState().payments, getState().session).every((p) => p.scoopId === "s1"),
    ).toBe(true);
  });

  it("annule un paiement avec un motif sans l'effacer", () => {
    actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    const s1 = getState().members.find((m) => m.scoopId === "s1" && m.status === "membre")!;
    const res = actions.recordPayment({
      memberId: s1.id,
      amount: 1000,
      period: "2026",
      method: "virement",
    });
    if (!res.ok) throw new Error("paiement");
    expect(actions.voidPayment(res.id, "x").ok).toBe(false);
    const total = getState().payments.length;
    expect(actions.voidPayment(res.id, "saisi par erreur").ok).toBe(true);
    expect(getState().payments).toHaveLength(total);
    expect(getState().payments.find((p) => p.id === res.id)?.voided?.reason).toBe(
      "saisi par erreur",
    );
    expect(actions.voidPayment(res.id, "encore").ok).toBe(false);
  });

  it("refuse une règle incohérente et garde la règle confirmée à part", () => {
    actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    expect(
      actions.setContributionRule("s1", {
        amount: 0,
        periodicity: "annuelle",
        dueDate: "03-31",
        startYear: 2025,
      }).ok,
    ).toBe(false);
    expect(
      actions.setContributionRule("s1", {
        amount: 5000,
        periodicity: "annuelle",
        dueDate: "31-03",
        startYear: 2025,
      }).ok,
    ).toBe(false);
    expect(
      actions.setContributionRule("s2", {
        amount: 500,
        periodicity: "mensuelle",
        dueDate: "01-01",
        startYear: 2026,
      }).ok,
    ).toBe(false);
    expect(
      actions.setContributionRule("s1", {
        amount: 6000,
        periodicity: "annuelle",
        dueDate: "03-31",
        startYear: 2025,
        confirmed: true,
      }).ok,
    ).toBe(true);
    expect(getState().contributionRules.find((r) => r.scoopId === "s1")).toMatchObject({
      amount: 6000,
      confirmed: true,
    });
  });
});

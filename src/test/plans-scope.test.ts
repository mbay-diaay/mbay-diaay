import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";
import { scopedPlans } from "@/lib/scope";

// La connexion mémorise la session dans le navigateur : un stockage en mémoire suffit pour les règles.
beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const as = (email: string, role: Parameters<typeof actions.login>[2]) =>
  actions.login("Test", email, role);

describe("plans d'exploitation : périmètre SCOOP", () => {
  it("un plan d'une autre SCOOP est invisible, intouchable et ne peut pas être créé", () => {
    as("aissatou.ndiaye@cradesc.example", "admin");
    const foreign = actions.createPlan({
      scoopId: "s2",
      producerId: "p-test",
      campaign: "2026",
      lines: [],
    });
    expect(foreign.ok).toBe(true);
    const id = foreign.ok ? foreign.id : "";

    as("babacar.fall@scoop-kms.example", "gestionnaire");
    const session = getState().session;
    expect(scopedPlans(getState().plans, session).some((p) => p.id === id)).toBe(false);
    expect(actions.updatePlan(id, { notes: "intrusion" }).ok).toBe(false);
    expect(actions.setPlanStatus(id, "validé").ok).toBe(false);
    expect(
      actions.createPlan({ scoopId: "s2", producerId: "p-test", campaign: "2026", lines: [] }).ok,
    ).toBe(false);
    expect(getState().plans.find((p) => p.id === id)?.notes).not.toBe("intrusion");
  });

  it("un technicien écrit dans ses SCOOP et pas ailleurs", () => {
    as("fatou.sarr@cradesc.example", "technicien");
    const mine = actions.createPlan({
      scoopId: "s2",
      producerId: "p-test",
      campaign: "2026",
      lines: [],
    });
    expect(mine.ok).toBe(true);
    const other = actions.createPlan({
      scoopId: "s4",
      producerId: "p-test",
      campaign: "2026",
      lines: [],
    });
    expect(other.ok).toBe(false);
  });
});

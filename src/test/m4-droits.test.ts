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
  technicien: ["Fatou Sarr", "fatou.sarr@cradesc.example", "technicien"],
  secretaire: ["Aminata Bâ", "aminata.ba@scoop-kms.example", "secretaire"],
  ventes: ["Ibrahima Seck", "ibrahima.seck@scoop-kms.example", "ventes"],
  faitiere: ["Ousmane Guèye", "ousmane.gueye@uscn.example", "faitiere"],
};
const as = (who: keyof typeof ACCOUNTS) => {
  const [name, email, role] = ACCOUNTS[who]!;
  actions.login(name, email, role);
};

describe("agronomie : droits appliqués par le store", () => {
  it("seul l'administrateur crée une campagne", () => {
    const input = { name: "Contre-saison test", start: "2027-03-01", end: "2027-06-30" };
    for (const who of ["gestionnaire", "technicien", "secretaire", "ventes", "faitiere"] as const) {
      as(who);
      expect(actions.createCampaign(input).ok, who).toBe(false);
    }
    as("admin");
    expect(actions.createCampaign(input).ok).toBe(true);
  });

  it("le technicien rédige un calendrier, ni la secrétaire ni les ventes ne le peuvent", () => {
    as("secretaire");
    expect(actions.createCalendar("Gombo").ok).toBe(false);
    as("ventes");
    expect(actions.createCalendar("Gombo").ok).toBe(false);
    as("technicien");
    const crop = getState().cropRefs.find(
      (c) => !getState().calendars.some((k) => k.crop === c.name && k.status === "brouillon"),
    )!.name;
    expect(actions.createCalendar(crop).ok).toBe(true);
  });

  it("le technicien ne valide jamais un calendrier, même complet", () => {
    const draft = getState().calendars.find((c) => c.status === "brouillon")!;
    for (const who of ["technicien", "secretaire", "ventes", "faitiere"] as const) {
      as(who);
      expect(actions.validateCalendar(draft.id).ok, who).toBe(false);
    }
  });

  it("la secrétaire et les ventes ne saisissent aucune opération", () => {
    const plan = getState().plans.find((p) => p.lines.length > 0)!;
    for (const who of ["secretaire", "ventes", "faitiere"] as const) {
      as(who);
      expect(
        actions.recordOperation({
          planId: plan.id,
          lineIndex: 0,
          kind: "semis",
          doneAt: "2026-10-01",
        }).ok,
        who,
      ).toBe(false);
    }
  });

  it("un technicien ne saisit pas d'opération sur le plan d'une SCOOP qui n'est pas la sienne", () => {
    as("admin");
    const base = getState().plans.find((p) => p.lines.length > 0)!;
    const foreign = actions.createPlan({
      scoopId: "s4",
      producerId: base.producerId,
      campaign: base.campaign,
      lines: base.lines,
    });
    expect(foreign.ok).toBe(true);
    const id = foreign.ok ? foreign.id : "";

    as("technicien");
    expect(
      actions.recordOperation({ planId: id, lineIndex: 0, kind: "semis", doneAt: "2026-10-01" }).ok,
    ).toBe(false);
    // Sur un plan de sa SCOOP, la même saisie est acceptée.
    const own = getState().plans.find((p) => p.scoopId === "s1" && p.lines.length > 0)!;
    expect(
      actions.recordOperation({
        planId: own.id,
        lineIndex: 0,
        kind: "semis",
        doneAt: "2026-10-01",
      }).ok,
    ).toBe(true);
  });
});

import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const admin = () => actions.login("Aïssatou Ndiaye", "aissatou.ndiaye@cradesc.example", "admin");
const fail = (r: { ok: boolean; error?: string }) => (r.ok ? "" : r.error);

describe("techniciens : invitation et coopératives couvertes", () => {
  it("invite un technicien sur plusieurs coopératives (compte inactif, invitation, journal)", () => {
    admin();
    const res = actions.inviteTechnician({
      name: "  Ibou   Ndiaye ",
      email: "ibou.ndiaye@exemple.sn",
      phone: "77 000 00 01",
      scoopIds: ["s1", "s2", "s1"],
    });
    expect(res.ok).toBe(true);
    const u = getState().users.find((x) => x.email === "ibou.ndiaye@exemple.sn")!;
    expect(u).toMatchObject({ name: "Ibou Ndiaye", role: "technicien", scoopIds: ["s1", "s2"], active: false });
    expect(u.invited?.expiresAt).toBeTruthy();
    expect(getState().audit.some((a) => a.action === "Technicien invité")).toBe(true);
  });

  it("refuse un nom incomplet, un e-mail invalide ou déjà pris, et une liste de coopératives vide", () => {
    admin();
    const base = { name: "Awa Sow", email: "awa.sow@exemple.sn", scoopIds: ["s1"] };
    expect(fail(actions.inviteTechnician({ ...base, name: "Awa" }))).toBeTruthy();
    expect(fail(actions.inviteTechnician({ ...base, email: "awa.sow" }))).toBeTruthy();
    expect(fail(actions.inviteTechnician({ ...base, email: "aissatou.ndiaye@cradesc.example" }))).toBeTruthy();
    expect(fail(actions.inviteTechnician({ ...base, scoopIds: [] }))).toBeTruthy();
  });

  it("change les coopératives d'un technicien, sans jamais le laisser sans coopérative", () => {
    admin();
    const u = getState().users.find((x) => x.email === "ibou.ndiaye@exemple.sn")!;
    expect(actions.setTechnicianScoops(u.id, ["s2"]).ok).toBe(true);
    expect(getState().users.find((x) => x.id === u.id)?.scoopIds).toEqual(["s2"]);
    expect(actions.setTechnicianScoops(u.id, []).ok).toBe(false);
  });

  it("refuse à un rôle sans gestion des comptes", () => {
    actions.login("Fatou Sarr", "fatou.sarr@cradesc.example", "technicien");
    expect(actions.inviteTechnician({ name: "Awa Sow", email: "awa.sow2@exemple.sn", scoopIds: ["s1"] }).ok).toBe(false);
  });
});

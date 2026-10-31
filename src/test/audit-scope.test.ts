import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";
import { scopedAudit } from "@/lib/scope";
import type { RoleId } from "@/lib/permissions";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const login = (name: string, email: string, role: RoleId) => actions.login(name, email, role);
const read = () => scopedAudit(getState().audit, getState().session);

describe("journal d'audit limité à la SCOOP", () => {
  it("l'administrateur lit tout ; un rôle de coopérative ne lit que sa SCOOP ; les autres rien", () => {
    login("Aïssatou Ndiaye", "aissatou.ndiaye@cradesc.example", "admin");
    actions.audit("Action de plateforme", "Plateforme", "sans SCOOP");
    actions.audit("Action de la SCOOP 1", "Test", "s1", "s1");
    actions.audit("Action de la SCOOP 2", "Test", "s2", "s2");
    const total = getState().audit.length;
    expect(read()).toHaveLength(total);

    login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    const mine = read();
    expect(mine.length).toBeGreaterThan(0);
    expect(mine.every((e) => e.scoopId === "s1")).toBe(true);
    expect(mine.some((e) => e.action === "Action de la SCOOP 1")).toBe(true);
    expect(mine.some((e) => e.action === "Action de la SCOOP 2")).toBe(false);
    expect(mine.some((e) => e.action === "Action de plateforme")).toBe(false);

    login("Moussa Diouf", "moussa.diouf@scoop-kms.example", "representant");
    expect(read().every((e) => e.scoopId === "s1")).toBe(true);

    ["technicien", "secretaire", "ventes", "rapports", "faitiere"].forEach((role) => {
      actions.login("Test", `${role}@exemple.sn`, role as RoleId);
      expect(read(), role).toEqual([]);
    });
  });

  it("une action d'un rôle limité à une SCOOP est rattachée à cette SCOOP", () => {
    login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    actions.audit("Action du gestionnaire", "Test", "détail");
    expect(getState().audit[0]).toMatchObject({ action: "Action du gestionnaire", scoopId: "s1" });
  });
});

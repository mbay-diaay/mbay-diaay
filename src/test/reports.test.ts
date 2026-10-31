import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";
import { scopedReports } from "@/lib/scope";
import { catalogueFor } from "@/lib/reports";
import type { RoleId } from "@/lib/permissions";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const login = (role: RoleId, email = `${role}@exemple.sn`) => actions.login("Test", email, role);

describe("rapports", () => {
  it("le catalogue dépend du rôle ; sans droit de génération il est vide", () => {
    login("rapports");
    expect(catalogueFor(getState().session).length).toBeGreaterThan(0);
    for (const role of ["technicien", "secretaire", "ventes"] as RoleId[]) {
      login(role);
      expect(catalogueFor(getState().session), role).toEqual([]);
      expect(actions.generateReport("effectifs").ok).toBe(false);
    }
  });

  it("une SCOOP choisie réduit le contenu et le périmètre du rapport", () => {
    login("admin");
    const all = actions.generateReport("effectifs");
    const one = actions.generateReport("effectifs", { scoopId: "s1" });
    expect(all.ok && one.ok).toBe(true);
    if (all.ok && one.ok) {
      expect(one.report.scoopIds).toEqual(["s1"]);
      expect(all.report.scoopIds).toEqual([]);
      expect(one.report.scopeLabel).not.toBe(all.report.scopeLabel);
    }
  });

  it("un rôle de coopérative ne génère ni ne lit hors de sa SCOOP", () => {
    login("admin");
    actions.generateReport("effectifs");
    actions.generateReport("effectifs", { scoopId: "s2" });
    login("gestionnaire", "babacar.fall@scoop-kms.example");
    expect(actions.generateReport("effectifs", { scoopId: "s2" }).ok).toBe(false);
    const mine = actions.generateReport("effectifs");
    expect(mine.ok).toBe(true);
    const visible = scopedReports(getState().reports, getState().session);
    expect(visible.length).toBeGreaterThan(0);
    expect(visible.every((r) => r.scoopIds.length > 0 && r.scoopIds.every((i) => i === "s1"))).toBe(
      true,
    );
    expect(actions.readReports()).toEqual(visible);
  });

  it("chaque téléchargement est tracé ; un rapport hors périmètre est refusé", () => {
    login("admin");
    const r = actions.generateReport("qualite", { scoopId: "s2" });
    if (!r.ok) throw new Error("génération");
    const before = getState().audit.length;
    expect(actions.downloadReport(r.report.id, "Excel").ok).toBe(true);
    expect(getState().audit.length).toBe(before + 1);
    expect(getState().audit[0]?.action).toBe("Téléchargement de rapport");
    login("gestionnaire", "babacar.fall@scoop-kms.example");
    expect(actions.downloadReport(r.report.id, "CSV").ok).toBe(false);
  });

  it("les rapports du module administratif suivent le périmètre et le droit de lecture", () => {
    login("admin");
    const all = actions.generateReport("cotisations");
    const sec = actions.generateReport("reunions");
    expect(all.ok && sec.ok).toBe(true);
    if (!all.ok || !sec.ok) return;
    expect(all.report.rows.length).toBeGreaterThan(0);
    expect(all.report.header).toContain("Solde (FCFA)");
    expect(sec.report.rows.some((r) => r[1] === "Assemblée générale ordinaire 2026")).toBe(true);
    login("gestionnaire", "babacar.fall@scoop-kms.example");
    const mine = actions.generateReport("cotisations");
    if (!mine.ok) throw new Error(mine.error);
    expect(mine.report.rows.length).toBeLessThan(all.report.rows.length);
    expect(mine.report.rows.every((r) => r[0] === mine.report.rows[0]?.[0])).toBe(true);
    // la secrétaire n'a pas report.generate : aucun rapport, quel qu'il soit
    login("secretaire");
    expect(catalogueFor(getState().session)).toEqual([]);
    // le responsable des rapports ne voit pas les cotisations (pas de contribution.read)
    login("rapports");
    expect(catalogueFor(getState().session).some((r) => r.id === "cotisations")).toBe(
      getState().session?.permissions.includes("contribution.read") ?? false,
    );
  });

  it("les rapports du module commercial exigent le droit de lecture de leur sujet", () => {
    login("gestionnaire", "babacar.fall@scoop-kms.example");
    for (const id of ["stocks", "credits", "ventes"] as const) {
      const res = actions.generateReport(id);
      if (!res.ok) throw new Error(res.error);
      expect(res.report.rows.length).toBeGreaterThan(0);
    }
    const credits = actions.generateReport("credits");
    if (!credits.ok) throw new Error("credits");
    expect(credits.report.header).toContain("Reste (FCFA)");
    // le responsable des rapports lit les ventes mais pas les crédits ni les stocks
    login("rapports");
    const ids = catalogueFor(getState().session).map((r) => r.id);
    expect(ids).toContain("ventes");
    expect(ids).not.toContain("credits");
    expect(ids).not.toContain("stocks");
    expect(actions.generateReport("credits").ok).toBe(false);
    expect(actions.generateReport("ventes").ok).toBe(true);
  });

  it("le compte d'exploitation est un agrégat par culture, sans producteur, et exige son droit", () => {
    login("gestionnaire", "babacar.fall@scoop-kms.example");
    const res = actions.generateReport("exploitation");
    if (!res.ok) throw new Error(res.error);
    expect(res.report.header[0]).toBe("Culture");
    expect(res.report.header.join(" ")).not.toMatch(/producteur/i);
    expect(res.report.rows.length).toBeGreaterThan(0);
    const charges = actions.generateReport("charges");
    expect(charges.ok).toBe(true);
    // le technicien lit les charges mais ne produit aucun rapport (pas de report.generate)
    login("technicien");
    expect(catalogueFor(getState().session)).toEqual([]);
    login("rapports");
    const ids = catalogueFor(getState().session).map((r) => r.id);
    expect(ids).toContain("exploitation");
    expect(ids).toContain("charges");
  });
});

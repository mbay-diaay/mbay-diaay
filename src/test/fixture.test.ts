import { describe, expect, it } from "vitest";
import { getState, sharedPhoneGroups } from "@/lib/store";
import { CAMPAIGNS, CROP_FAMILIES, FIXTURE_COUNTS } from "@/lib/mock/data";

/** Les volumes du jeu de démonstration reprennent la base CRADESC du 05/10/2026 (PRD Backend, section 6). */
describe("jeu de données de démonstration", () => {
  it("reprend les volumes de la base : producteurs, parcelles, cultures, alertes, doublons", () => {
    const s = getState();
    expect(s.producers.filter((p) => !p.mergedInto)).toHaveLength(1317);
    expect(s.plots).toHaveLength(1534);
    expect(s.alerts).toHaveLength(609);
    expect(s.cases).toHaveLength(5);
    expect(s.orgs).toHaveLength(114);
    expect(FIXTURE_COUNTS.crops).toBe(1941);
    expect(FIXTURE_COUNTS.overlaps).toBe(28);
  });

  it("ne laisse aucun lien orphelin entre les fiches, les parcelles, les alertes et les doublons", () => {
    const s = getState();
    const producers = new Set(s.producers.map((p) => p.id));
    const plots = new Set(s.plots.map((p) => p.id));
    expect(s.plots.every((p) => producers.has(p.producerId))).toBe(true);
    expect(s.cases.every((c) => producers.has(c.aId) && producers.has(c.bId))).toBe(true);
    expect(
      s.alerts.every((a) => (a.entity === "producteur" ? producers : plots).has(a.entityId)),
    ).toBe(true);
    const orgs = new Set(s.orgs.map((o) => o.id));
    expect(s.producers.every((p) => orgs.has(p.orgId))).toBe(true);
  });

  it("garde les cas particuliers de la base : âges manquants, fiche sans nom, contours réparés", () => {
    const s = getState();
    expect(s.producers.filter((p) => p.age === null)).toHaveLength(26);
    expect(s.producers.filter((p) => p.lastName === "sans nom")).toHaveLength(1);
    expect(s.plots.filter((p) => p.repaired).length).toBe(433);
    expect(s.plots.filter((p) => p.status === "chevauchement")).toHaveLength(56);
  });

  it("n'utilise que des familles et des campagnes connues, sans téléphone commun hors groupes", () => {
    const s = getState();
    expect(s.cropRefs.every((c) => (CROP_FAMILIES as readonly string[]).includes(c.family))).toBe(
      true,
    );
    expect(s.plots.every((p) => (CAMPAIGNS as readonly string[]).includes(p.campaign))).toBe(true);
    expect(sharedPhoneGroups(s.producers).length).toBeGreaterThanOrEqual(20);
  });
});

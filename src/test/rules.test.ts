import { describe, expect, it, beforeAll, beforeEach } from "vitest";
import { actions, getState, sharedPhoneGroups } from "@/lib/store";
import { fetchMyPermissions, ROLE_IS_SCOPED, ROLE_PERMISSIONS } from "@/lib/permissions";
import { installMemoryStorage, loginAs } from "./session";

beforeAll(installMemoryStorage);
// Toute action du store exige une session et le droit du rôle : ces tests agissent en administrateur.
beforeEach(() => loginAs("admin"));

describe("règles métier", () => {
  it("une fusion défaite restaure la fiche B et ses parcelles", () => {
    const c = getState().cases[0]!;
    const before = getState()
      .plots.filter((p) => p.producerId === c.bId)
      .map((p) => p.id);
    actions.mergeCase(c.id, "test");
    expect(getState().plots.filter((p) => p.producerId === c.bId)).toHaveLength(0);
    actions.undoMerge(c.id);
    expect(
      getState()
        .plots.filter((p) => p.producerId === c.bId)
        .map((p) => p.id),
    ).toEqual(before);
    expect(getState().producers.find((p) => p.id === c.bId)?.mergedInto).toBeUndefined();
  });
  it("seul l'administrateur peut fusionner et lire la CNI", () => {
    expect(ROLE_PERMISSIONS.admin).toContain("quality.merge");
    expect(ROLE_PERMISSIONS.gestionnaire).not.toContain("quality.merge");
    expect(ROLE_PERMISSIONS.faitiere).not.toContain("cni.read");
  });
  it("une correction ne modifie pas la fiche avant décision, et un refus ne change rien", () => {
    const r = getState().corrections.find((x) => x.status === "en attente")!;
    const before = JSON.stringify(getState().producers.find((p) => p.id === r.producerId));
    const pendingBefore = getState().corrections.filter((c) => c.status === "en attente").length;
    actions.decideCorrection(r.id, false, "Justificatif insuffisant");
    expect(JSON.stringify(getState().producers.find((p) => p.id === r.producerId))).toBe(before);
    expect(getState().corrections.find((c) => c.id === r.id)?.status).toBe("refusée");
    expect(getState().corrections.filter((c) => c.status === "en attente")).toHaveLength(
      pendingBefore - 1,
    );
  });
  it("approuver une correction applique les valeurs « après » sur la fiche", () => {
    const r = getState().corrections.find(
      (x) => x.status === "en attente" && x.changes.some((c) => c.field === "Téléphone"),
    )!;
    const to = r.changes.find((c) => c.field === "Téléphone")!.to;
    actions.decideCorrection(r.id, true, "Justificatif vérifié");
    expect(getState().producers.find((p) => p.id === r.producerId)?.phone).toBe(to);
    expect(getState().corrections.find((c) => c.id === r.id)?.status).toBe("approuvée");
  });
  it("les nouveaux écrans respectent les périmètres de rôles", () => {
    expect(ROLE_PERMISSIONS.gestionnaire).toContain("correction.manage");
    expect(ROLE_PERMISSIONS.gestionnaire).not.toContain("account.manage");
    expect(ROLE_PERMISSIONS.faitiere).not.toContain("correction.manage");
    expect(ROLE_PERMISSIONS.admin).toContain("device.manage");
    expect(ROLE_PERMISSIONS.admin).toContain("config.manage");
  });
  it("les seuils du référentiel pilotent les filtres d'anomalies", () => {
    actions.setSeuil("minAreaM2", 50);
    expect(getState().seuils.minAreaM2).toBe(50);
    actions.setSeuil("minAreaM2", 100);
  });
  it("les téléphones partagés regroupent des personnes distinctes, hors doublons", () => {
    const groups = sharedPhoneGroups(getState().producers);
    expect(groups.length).toBeGreaterThan(0);
    groups.forEach((gr) => {
      expect(gr.members.length).toBeGreaterThan(1);
      expect(new Set(gr.members.map((m) => m.id)).size).toBe(gr.members.length);
      gr.members.forEach((m) => {
        expect(m.phone).toBe(gr.phone);
        expect(m.quality).not.toBe("doublon");
      });
    });
  });
  it("le périmètre d'un rôle vient de permissions.ts : seuls l'administrateur et la faîtière voient tout", () => {
    expect(ROLE_IS_SCOPED).toEqual({
      admin: false,
      faitiere: false,
      gestionnaire: true,
      technicien: true,
      representant: true,
      secretaire: true,
      ventes: true,
      rapports: true,
    });
    expect(fetchMyPermissions("gestionnaire").scope.kind).toBe("scoop");
    expect(fetchMyPermissions("admin").scope.kind).toBe("consolidé");
  });
});

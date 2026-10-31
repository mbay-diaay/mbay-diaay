import { describe, expect, it } from "vitest";
import { checkAccess } from "@/lib/guard";
import {
  fetchMyPermissions,
  ROLE_PERMISSIONS,
  type Permission,
  type RoleId,
} from "@/lib/permissions";
import type { Session } from "@/lib/store";

const sessionOf = (role: RoleId, scoopIds?: string[]): Session => ({
  name: "Test",
  email: "test@exemple.sn",
  role,
  expiresAt: Date.now() + 60_000,
  ...fetchMyPermissions(role, scoopIds),
});

describe("garde commune des actions (checkAccess)", () => {
  it("sans session : refus, quel que soit le droit", () => {
    expect(checkAccess(null, "producer.read")).toEqual({
      ok: false,
      key: "errors.guard.noSession",
    });
  });

  it("sans le droit : refus de droit, même si la coopérative est hors périmètre (aucune fuite)", () => {
    const secretaire = sessionOf("secretaire", ["s1"]);
    expect(checkAccess(secretaire, "credit.manage", { scoopId: "s9" })).toEqual({
      ok: false,
      key: "errors.guard.notAllowed",
    });
  });

  it("avec le droit mais hors périmètre : refus de périmètre", () => {
    const gestionnaire = sessionOf("gestionnaire", ["s1"]);
    expect(checkAccess(gestionnaire, "member.read", { scoopId: "s2" })).toEqual({
      ok: false,
      key: "errors.guard.outOfScope",
    });
    expect(checkAccess(gestionnaire, "member.read", { scoopId: "s1" })).toEqual({ ok: true });
  });

  it("l'administrateur et la faîtière ne sont limités à aucune coopérative", () => {
    expect(checkAccess(sessionOf("admin"), "member.read", { scoopId: "s9" })).toEqual({ ok: true });
    expect(checkAccess(sessionOf("faitiere"), "member.read", { scoopId: "s9" })).toEqual({
      ok: true,
    });
  });

  it("une coopérative archivée refuse les écritures, après le droit et le périmètre", () => {
    const isArchived = (id: string) => id === "s1";
    const representant = sessionOf("representant", ["s1"]);
    expect(checkAccess(representant, "member.manage", { scoopId: "s1", isArchived })).toEqual({
      ok: false,
      key: "errors.scoop.archived",
    });
    // Sans le droit, l'archivage n'est pas révélé.
    expect(
      checkAccess(sessionOf("technicien", ["s1"]), "member.manage", { scoopId: "s1", isArchived }),
    ).toEqual({ ok: false, key: "errors.guard.notAllowed" });
  });

  it("une liste de droits : l'un d'eux suffit", () => {
    const tech = sessionOf("technicien", ["s1"]);
    expect(checkAccess(tech, ["dossier.review", "dossier.create"])).toEqual({ ok: true });
    expect(checkAccess(tech, ["dossier.review", "member.manage"])).toEqual({
      ok: false,
      key: "errors.guard.notAllowed",
    });
  });

  it("pour chaque rôle et chaque droit, le résultat suit exactement ROLE_PERMISSIONS", () => {
    for (const role of Object.keys(ROLE_PERMISSIONS) as RoleId[]) {
      const s = sessionOf(role, ["s1"]);
      for (const p of Object.values(ROLE_PERMISSIONS).flat() as Permission[]) {
        expect(checkAccess(s, p).ok, `${role} ${p}`).toBe(ROLE_PERMISSIONS[role].includes(p));
      }
    }
  });
});

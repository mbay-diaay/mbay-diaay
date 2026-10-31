import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { NAV } from "@/lib/nav";
import { MODULES, summarize, summarizeAll } from "@/lib/modules";
import { fr } from "@/lib/i18n";
import { fetchMyPermissions, ROLE_LABEL, type RoleId } from "@/lib/permissions";
import type { Session } from "@/lib/store";

const session = (role: RoleId): Session => ({
  name: "Test",
  email: `${role}@exemple.sn`,
  role,
  expiresAt: Date.now() + 60_000,
  ...fetchMyPermissions(role),
});
const find = (role: RoleId, id: string) =>
  summarizeAll(session(role)).find((m) => m.module.id === id)!;

describe("les cinq modules métier", () => {
  it("sont cinq, de M1 à M5, avec des textes de référence", () => {
    expect(MODULES.map((m) => m.code)).toEqual(["M1", "M2", "M3", "M4", "M5"]);
    expect(new Set(MODULES.map((m) => m.id)).size).toBe(5);
    MODULES.forEach((m) => {
      [m.name, m.action, m.purpose].forEach((key) => expect(fr[key], key).toBeTruthy());
    });
  });

  it("ont chacun au moins un écran dans le menu, construit ou à venir : une seule liste d'écrans à maintenir", () => {
    const items = NAV.flatMap((g) => g.items);
    MODULES.forEach((m) =>
      expect(
        items.some((i) => i.module === m.id),
        m.id,
      ).toBe(true),
    );
    // Aucun écran ne se réclame d'un module inconnu.
    items.forEach((i) => i.module && expect(MODULES.map((m) => m.id)).toContain(i.module));
  });

  it("n'ont aucun lien mort : tout écran construit s'ouvre sur une page qui existe", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    summarizeAll(session("admin")).forEach((m) =>
      m.open.forEach((i) =>
        expect(router.matchRoutes(i.to).at(-1)?.routeId, i.to).not.toBe(rootRouteId),
      ),
    );
  });

  it("affichent « à venir » tant qu'aucun écran n'est construit, sans écran cliquable", () => {
    const none = { ...MODULES[0]!, id: "inconnu" as never };
    const summary = summarize(none, session("admin"));
    expect(summary.state).toBe("à venir");
    expect(summary.open).toEqual([]);
    // Dépôt Module 1 : seul l'Administratif a des écrans construits ; M2–M5 restent « à venir ».
    expect(find("admin", "administratif").state).toBe("disponible");
    (["commercial", "exploitation", "agronomique", "sig"] as const).forEach((id) =>
      expect(find("admin", id).state, id).toBe("à venir"),
    );
  });

  it("ne montrent à un rôle que les écrans qu'il a le droit d'ouvrir", () => {
    const sales = find("ventes", "administratif");
    expect(sales.state).toBe("disponible");
    expect(sales.open).toEqual([]);
    expect(sales.closed).toBeGreaterThan(0);
    // SIG hors périmètre : aucun écran carte ouvert, quel que soit le rôle.
    (Object.keys(ROLE_LABEL) as RoleId[]).forEach((role) => {
      expect(find(role, "sig").open, role).toEqual([]);
    });
  });
});

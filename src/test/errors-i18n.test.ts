import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { actions } from "@/lib/store";
import { setCurrentLocale } from "@/lib/i18n";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});
afterEach(() => setCurrentLocale("fr"));

describe("messages d'erreur des actions", () => {
  it("restent en français par défaut, mot pour mot", () => {
    actions.login("Test", "technicien@exemple.sn", "technicien");
    const res = actions.updateDossier("inconnu", {});
    expect(res).toEqual({ ok: false, error: "Dossier introuvable." });
  });

  it("suivent la langue en cours (texte repère en wolof, jamais inventé)", () => {
    actions.login("Test", "technicien@exemple.sn", "technicien");
    setCurrentLocale("wo");
    const res = actions.updateDossier("inconnu", {});
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toMatch(/^\[Dossier introuvable\. [~ ]+\]$/);
  });
});

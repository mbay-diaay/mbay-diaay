import { describe, expect, it } from "vitest";
import { resolveDemoMode } from "@/lib/auth/config";

describe("mode démonstration : fermé par défaut", () => {
  it("seule la valeur explicite « true » l'ouvre dans un build publié", () => {
    expect(resolveDemoMode("true", false)).toBe(true);
    expect(resolveDemoMode(undefined, false)).toBe(false);
    expect(resolveDemoMode("", false)).toBe(false);
    expect(resolveDemoMode("TRUE", false)).toBe(false);
    expect(resolveDemoMode("1", false)).toBe(false);
    expect(resolveDemoMode("oui", false)).toBe(false);
  });

  it("« false » le ferme toujours, même en développement", () => {
    expect(resolveDemoMode("false", false)).toBe(false);
    expect(resolveDemoMode("false", true)).toBe(false);
  });

  it("en développement local, la variable absente laisse le mode ouvert", () => {
    expect(resolveDemoMode(undefined, true)).toBe(true);
  });
});

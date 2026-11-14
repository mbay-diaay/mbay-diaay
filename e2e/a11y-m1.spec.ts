import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { goto, signIn } from "./helpers";

/**
 * Contrôle d'accessibilité automatisé (WCAG 2 A et AA) des écrans du module M1.
 * Il attrape les contrastes, libellés manquants, rôles et noms accessibles ; il ne remplace ni un essai
 * au clavier ni un essai avec un lecteur d'écran.
 */
const SCREENS = [
  "/dashboard/cooperatives/s1",
  "/dashboard/personnel",
  "/dashboard/dossiers",
  "/dashboard/dossiers/dos3",
  "/dashboard/producteurs",
  "/dashboard/organisations",
  "/dashboard/cotisations",
  "/dashboard/reunions",
  "/dashboard/reunions/meet1",
  "/dashboard/documents",
  "/dashboard/cooperatives",
  "/dashboard/audit",
];

/** `main` : le contenu de l'écran ; la coquille (menu, en-tête) est contrôlée à part. */
const scope = "main";

test.describe("accessibilité du module Administratif", () => {
  for (const path of SCREENS) {
    test(`${path} n'a aucune violation WCAG A ou AA`, async ({ page }) => {
      await signIn(page, "admin");
      await goto(page, path);
      await page.waitForTimeout(600);
      const results = await new AxeBuilder({ page })
        .include(scope)
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const summary = results.violations.map(
        (v) =>
          `${v.id} (${v.impact}) x${v.nodes.length} : ${v.help} :: ${v.nodes
            .slice(0, 3)
            .map((n) => n.target.join(" "))
            .join(" | ")}`,
      );
      expect(summary, summary.join("\n")).toEqual([]);
    });
  }
});

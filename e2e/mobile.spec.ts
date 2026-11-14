import { expect, test } from "@playwright/test";
import { goto, signIn } from "./helpers";

/** Téléphone d'entrée de gamme (360 px) : les gestionnaires de terrain l'utilisent. */
test.describe("téléphone 360 px", () => {
  test("le menu s'ouvre dans un tiroir et mène à une page", async ({ page }) => {
    await signIn(page, "admin");
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Organisations" }).click();
    await expect(page).toHaveURL(/\/organisations/);
    await expect(page.getByRole("heading", { name: "Organisations", level: 1 })).toBeVisible();
    // Le tiroir se referme après le choix.
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("aucune page principale ne déborde horizontalement", async ({ page }) => {
    // Une trentaine de pages à parcourir : au premier passage, le serveur de développement compile chaque route.
    test.setTimeout(240_000);
    await signIn(page, "admin");
    const pages: [string, RegExp][] = [
      ["/dashboard/producteurs", /Producteurs/],
      ["/dashboard/organisations", /Organisations/],
      ["/dashboard/qualite/alertes", /Qualité des données/],
      ["/dashboard/comptes", /Comptes & liaisons/],
      ["/dashboard/appareils", /Appareils/],
      ["/dashboard/referentiels", /Référentiels/],
      ["/dashboard/imports", /Imports/],
      ["/dashboard/donnees", /Sauvegarde & export/],
      ["/dashboard/audit", /Journal d'audit/],
      ["/dashboard/cotisations", /Cotisations/],
      ["/dashboard/reunions", /Réunions et procès-verbaux/],
      ["/dashboard/documents", /Documents/],
      ["/dashboard/cooperatives", /Coopératives/],
      ["/dashboard/personnel", /Personnel/],
      ["/dashboard/dossiers", /Dossiers/],
      ["/dashboard/cooperatives/s1", /./],
    ];
    for (const [path, title] of pages) {
      await goto(page, path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${path} ne doit pas défiler horizontalement`).toBeLessThanOrEqual(0);
    }
  });

  test("la recherche universelle trouve un producteur et ouvre sa fiche", async ({ page }) => {
    await signIn(page, "admin");
    await page.getByRole("button", { name: "Recherche universelle" }).click();
    await page.getByPlaceholder(/Producteur, organisation/).fill("NIA-C-CPD-0001");
    await page.getByRole("option").first().click();
    await expect(page).toHaveURL(/\/producteurs\//);
  });
});

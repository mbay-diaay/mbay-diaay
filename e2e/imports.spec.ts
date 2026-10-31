import path from "node:path";
import { expect, test } from "@playwright/test";
import { goto, signIn } from "./helpers";

test.describe("import et export", () => {
  test("un fichier CSV passe par l'import à blanc, puis ses fiches valides apparaissent dans l'annuaire", async ({
    page,
  }) => {
    await signIn(page, "admin");
    await goto(page, "/imports");
    await page
      .locator('input[type="file"]')
      .setInputFiles(path.resolve("e2e/fixtures/producteurs.csv"));

    // Étape colonnes : les en-têtes du fichier sont reconnus tout seuls.
    await expect(page.getByText("Donnée attendue")).toBeVisible();
    await page.getByRole("button", { name: "Lancer l'import à blanc" }).click();

    // Rapport à blanc : une ligne rejetée avec son motif, rien d'écrit encore.
    await expect(page.getByText("Rapport d'import à blanc")).toBeVisible();
    await expect(page.getByText(/attendu F ou H/)).toBeVisible();
    await goto(page, "/producteurs");
    await expect(page.getByText(/^1\s317 producteur/)).toBeVisible();

    await goto(page, "/imports");
    await page
      .locator('input[type="file"]')
      .setInputFiles(path.resolve("e2e/fixtures/producteurs.csv"));
    await page.getByRole("button", { name: "Lancer l'import à blanc" }).click();
    await page.getByRole("button", { name: /Confirmer l'import/ }).click();
    await expect(page.getByText(/importé/).first()).toBeVisible();

    await goto(page, "/producteurs");
    await expect(page.getByText(/^1\s319 producteur/)).toBeVisible(); // 2 lignes valides sur 3
  });

  test("le journal d'audit se télécharge en CSV", async ({ page }) => {
    await signIn(page, "admin");
    await goto(page, "/audit");
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: /Exporter \(CSV\)/ }).click();
    expect((await download).suggestedFilename()).toMatch(/^journal_audit.*\.csv$/);
  });

  test("le classeur Excel complet se télécharge depuis Sauvegarde & export", async ({ page }) => {
    await signIn(page, "admin");
    await goto(page, "/donnees");
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: "Classeur Excel complet" }).click();
    expect((await download).suggestedFilename()).toMatch(/^mbay_diaay_export_.*\.xlsx$/);
  });
});

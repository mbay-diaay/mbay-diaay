import { expect, test } from "@playwright/test";
import { goto, signIn } from "./helpers";

test.describe("rapports", () => {
  test("le gestionnaire génère un rapport, le retrouve dans l'historique et le télécharge (tracé)", async ({
    page,
  }) => {
    await signIn(page, "gestionnaire");
    await goto(page, "/rapports");
    await expect(page.getByText("Aucun rapport pour le moment")).toBeVisible();

    await page.getByRole("button", { name: "Générer" }).first().click();
    const history = page.getByRole("region", { name: "Rapports déjà générés" });
    await expect(history.getByRole("button", { name: "CSV" })).toBeVisible();

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      history.getByRole("button", { name: "CSV" }).first().click(),
    ]);
    expect(download.suggestedFilename()).toMatch(/\.csv$/);

    await goto(page, "/audit");
    await expect(page.getByText("Téléchargement de rapport").first()).toBeVisible();
  });

  test("la secrétaire n'a pas accès aux rapports", async ({ page }) => {
    await signIn(page, "secretaire");
    await goto(page, "/rapports");
    await expect(page.getByText("Accès non autorisé")).toBeVisible();
  });

  test("la faîtière choisit une coopérative parmi toutes celles du périmètre", async ({ page }) => {
    await signIn(page, "faitiere");
    await goto(page, "/rapports");
    const select = page.getByLabel("Coopérative");
    await expect(select).toBeVisible();
    expect(await select.locator("option").count()).toBeGreaterThan(2);
  });
});

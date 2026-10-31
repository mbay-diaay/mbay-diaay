import { expect, test, type Page } from "@playwright/test";
import { goto, signIn } from "./helpers";

const rows = (page: Page) => page.locator("tbody tr");

async function firstProducerFiche(page: Page) {
  await goto(page, "/producteurs");
  await page.locator("a[href^='/producteurs/']:visible").first().click();
  await page.waitForURL(/\/producteurs\/.+/);
}

test.describe("journal et pièces limités par rôle", () => {
  test("le gestionnaire ne lit que le journal de sa SCOOP, l'administrateur lit tout", async ({
    page,
  }) => {
    await signIn(page, "admin");
    await goto(page, "/audit");
    await expect(rows(page).first()).toBeVisible();
    const all = await rows(page).count();

    await page.evaluate(() => sessionStorage.clear());
    await page.context().clearCookies();
    await page.goto("/login");
    await signIn(page, "gestionnaire");
    await goto(page, "/audit");
    await expect(rows(page).first()).toBeVisible();
    const mine = await rows(page).count();
    expect(mine).toBeGreaterThan(0);
    expect(mine).toBeLessThan(all);
  });

  test("le technicien n'ouvre pas le journal", async ({ page }) => {
    await signIn(page, "technicien");
    await goto(page, "/audit");
    await expect(page.getByText("Accès non autorisé")).toBeVisible();
  });

  test("le gestionnaire voit l'onglet Pièces d'une fiche producteur", async ({ page }) => {
    await signIn(page, "gestionnaire");
    await firstProducerFiche(page);
    await expect(page.getByRole("button", { name: /Pièces/ })).toBeVisible();
  });

  test("le responsable des rapports ne voit pas l'onglet Pièces", async ({ page }) => {
    await signIn(page, "rapports");
    await firstProducerFiche(page);
    await expect(page.getByRole("button", { name: /Pièces/ })).toHaveCount(0);
  });
});

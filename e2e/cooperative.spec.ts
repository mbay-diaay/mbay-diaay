import { expect, test, type Page } from "@playwright/test";
import { goto, signIn } from "./helpers";

/** Navigation interne vers une adresse qui redirige : on n'attend pas que l'adresse reste la même. */
async function visit(page: Page, path: string) {
  await page.evaluate((p) => {
    window.history.pushState({}, "", p);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, path);
}

/** Aucun lien de la fiche ne doit mener à une page introuvable. */
async function expectNoDeadLinks(page: Page) {
  const hrefs = await page
    .locator("main a[href^='/']")
    .evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute("href") ?? ""))]);
  for (const href of hrefs) {
    const res = await page.request.get(href);
    expect(res.status(), href).toBeLessThan(400);
  }
}

test.describe("Ma coopérative : redirection vers la fiche", () => {
  test("le gestionnaire arrive sur la fiche de sa coopérative, sans lien mort", async ({
    page,
  }) => {
    await signIn(page, "gestionnaire");
    await visit(page, "/cooperative");
    await expect(page).toHaveURL(/\/cooperatives\/s1/);
    await expect(page.getByRole("heading", { name: "Adhésions en attente" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Cotisations", level: 2 })).toBeVisible();
    await expect(page.getByText("Taux de recouvrement")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Prochaines réunions" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Documents récents" })).toBeVisible();
    await expect(page.getByTestId("bloc-reunions").getByRole("link").first()).toBeVisible();
    await expectNoDeadLinks(page);
  });

  test("l'adresse ouverte directement redirige aussi", async ({ page }) => {
    await signIn(page, "gestionnaire");
    await page.goto("/cooperative");
    await expect(page).toHaveURL(/\/cooperatives\/s1/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("l'administrateur est mené à la liste", async ({ page }) => {
    await signIn(page, "admin");
    await visit(page, "/cooperative");
    await expect(page).toHaveURL(/\/cooperatives$/);
  });

  test("la faîtière ne voit pas le bloc documents", async ({ page }) => {
    await signIn(page, "faitiere");
    await goto(page, "/cooperatives/s1");
    await expect(page.getByRole("heading", { name: "Cotisations", level: 2 })).toBeVisible();
    await expect(page.getByTestId("bloc-documents")).toHaveCount(0);
    await expectNoDeadLinks(page);
  });
});

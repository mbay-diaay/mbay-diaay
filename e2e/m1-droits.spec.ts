import { expect, test, type Page } from "@playwright/test";
import { goto, openNavGroup, signIn, type Role } from "./helpers";

const menu = (page: Page) => page.getByRole("navigation").first();

test.describe("M1 Administratif : droits par rôle", () => {
  test("la secrétaire lit les cotisations sans pouvoir modifier la règle ni enregistrer", async ({
    page,
  }) => {
    await signIn(page, "secretaire");
    await openNavGroup(page, "Vie de la coopérative");
    await menu(page).getByRole("link", { name: "Cotisations" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Cotisations" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Modifier la règle" })).toHaveCount(0);
    await page.locator("tbody tr").first().click();
    await expect(page.getByRole("dialog").getByText("Périodes à payer")).toBeVisible();
    await expect(page.getByRole("button", { name: "Enregistrer un paiement" })).toHaveCount(0);
  });

  test("le représentant enregistre un paiement", async ({ page }) => {
    await signIn(page, "representant");
    await goto(page, "/cotisations");
    await expect(page.getByRole("button", { name: "Modifier la règle" })).toBeVisible();
    await page.getByRole("button", { name: /^Jamais payé/ }).click();
    await page.locator("tbody tr").first().click();
    await page.getByRole("button", { name: "Enregistrer un paiement" }).first().click();
    const dialog = page.getByRole("dialog", { name: "Enregistrer un paiement" });
    await dialog.getByRole("button", { name: "Enregistrer le paiement" }).click();
    await expect(
      page.getByText(/Paiement enregistré, reçu n° R-\d{4}-\d{4}/).first(),
    ).toBeVisible();
  });

  test("la faîtière lit cotisations et réunions, sans bouton d'écriture, et n'a pas les documents", async ({
    page,
  }) => {
    await signIn(page, "faitiere");
    await goto(page, "/cotisations");
    await expect(page.getByRole("heading", { level: 1, name: "Cotisations" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Modifier la règle" })).toHaveCount(0);
    await goto(page, "/reunions");
    await expect(page.getByRole("heading", { level: 1, name: "Réunions" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Nouvelle réunion" })).toHaveCount(0);
    await expect(menu(page).getByRole("link", { name: "Documents" })).toHaveCount(0);
    await goto(page, "/documents");
    await expect(page.getByText("Accès non autorisé")).toBeVisible();
  });

  test("la secrétaire dépose un document mais ne voit pas la carte d'identité des dossiers", async ({
    page,
  }) => {
    await signIn(page, "secretaire");
    await goto(page, "/documents");
    await expect(page.getByRole("button", { name: "Ajouter un document" })).toBeVisible();
    await expect(page.getByText(/cni/i)).toHaveCount(0);
  });

  test("l'administrateur ouvre la liste des coopératives et peut en créer", async ({ page }) => {
    await signIn(page, "admin");
    await menu(page).getByRole("link", { name: "Coopératives" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Coopératives" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Créer une coopérative" }).first()).toBeVisible();
  });

  test("la faîtière voit toutes les coopératives en lecture seule", async ({ page }) => {
    await signIn(page, "faitiere");
    await menu(page).getByRole("link", { name: "Coopératives" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Coopératives" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Créer une coopérative" })).toHaveCount(0);
    expect(await page.locator("tbody tr").count()).toBeGreaterThan(1);
  });

  for (const role of ["gestionnaire", "representant"] as Role[]) {
    test(`le profil ${role} arrive sur la fiche de sa coopérative, sans bouton d'écriture`, async ({
      page,
    }) => {
      await signIn(page, role);
      await expect(menu(page).getByRole("link", { name: "Coopératives" })).toHaveCount(0);
      await menu(page).getByRole("link", { name: "Ma coopérative" }).click();
      await expect(page).toHaveURL(/\/cooperatives\/.+/);
      await expect(page.getByRole("button", { name: "Créer une coopérative" })).toHaveCount(0);
      // La liste, ouverte à la main, ne contient que sa coopérative.
      await goto(page, "/cooperatives");
      await expect(page.locator("tbody tr")).toHaveCount(1);
    });
  }

  for (const role of ["ventes", "rapports", "technicien"] as Role[]) {
    test(`le profil ${role} n'ouvre pas les coopératives`, async ({ page }) => {
      await signIn(page, role);
      await expect(menu(page).getByRole("link", { name: "Coopératives" })).toHaveCount(0);
      await goto(page, "/cooperatives");
      await expect(page.getByText("Accès non autorisé")).toBeVisible();
    });
  }

  for (const role of ["ventes", "rapports", "technicien"] as Role[]) {
    test(`le profil ${role} n'ouvre ni cotisations, ni réunions, ni documents`, async ({
      page,
    }) => {
      await signIn(page, role);
      for (const path of ["/cotisations", "/reunions", "/documents"]) {
        await goto(page, path);
        await expect(page.getByText("Accès non autorisé"), `${path} pour ${role}`).toBeVisible();
      }
      for (const entry of ["Cotisations", "Réunions", "Documents"]) {
        await expect(menu(page).getByRole("link", { name: entry, exact: true })).toHaveCount(0);
      }
    });
  }
});

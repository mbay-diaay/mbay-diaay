import { expect, test } from "@playwright/test";
import { goto, signIn, toast } from "./helpers";

test.describe("cotisations", () => {
  test("le gestionnaire voit la liste, enregistre un paiement et reçoit un numéro de reçu", async ({
    page,
  }) => {
    await signIn(page, "gestionnaire");
    await goto(page, "/cotisations");
    await expect(page.getByRole("heading", { level: 1, name: "Cotisations" })).toBeVisible();
    await expect(page.getByText("Règle à confirmer avec la coopérative")).toBeVisible();
    await expect(page.getByRole("button", { name: "Modifier la règle" })).toBeVisible();
    await expect(page.getByText("Taux de recouvrement")).toBeVisible();

    await page.getByRole("button", { name: /^Jamais payé/ }).click();
    const first = page.locator("tbody tr").first();
    await expect(first).toBeVisible();
    const name = (await first.locator("td").first().locator("div").first().innerText()).trim();
    await first.click();

    const sheet = page.getByRole("dialog").filter({ hasText: name });
    await expect(sheet.getByText("Périodes à payer")).toBeVisible();
    await expect(sheet.getByText("Aucun paiement enregistré pour ce membre.")).toBeVisible();
    await sheet.getByRole("button", { name: "Enregistrer un paiement" }).click();

    const dialog = page.getByRole("dialog", { name: "Enregistrer un paiement" });
    await expect(dialog.getByLabel("Montant payé (FCFA)")).not.toHaveValue("");
    await dialog.getByRole("button", { name: "Enregistrer le paiement" }).click();
    await expect(toast(page, /Paiement enregistré, reçu n° R-\d{4}-\d{4}/)).toBeVisible();
    await expect(sheet.getByText(/Reçu n° R-\d{4}-\d{4}/)).toBeVisible();
  });

  test("le gestionnaire annule un paiement avec un motif, il reste affiché barré", async ({
    page,
  }) => {
    await signIn(page, "gestionnaire");
    await goto(page, "/cotisations");
    await page.getByRole("button", { name: /^À jour/ }).click();
    await page.locator("tbody tr").first().click();
    const sheet = page.getByRole("dialog").filter({ hasText: "Paiements enregistrés" });
    await sheet.getByRole("button", { name: "Annuler ce paiement" }).first().click();

    const dialog = page.getByRole("dialog", { name: "Annuler un paiement" });
    await expect(dialog.getByRole("button", { name: "Annuler le paiement" })).toBeDisabled();
    await dialog.getByLabel(/Motif de l'annulation/).fill("ab");
    await expect(dialog.getByText(/Précisez le motif/)).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Annuler le paiement" })).toBeDisabled();
    await dialog.getByLabel(/Motif de l'annulation/).fill("Montant saisi par erreur");
    await dialog.getByRole("button", { name: "Annuler le paiement" }).click();
    await expect(toast(page, "Paiement annulé")).toBeVisible();
    await expect(sheet.getByText("Motif : Montant saisi par erreur")).toBeVisible();
    await expect(sheet.locator('[data-voided="true"]')).toHaveCount(1);
  });

  test("la recherche et le filtre réduisent la liste, et le vide est expliqué", async ({
    page,
  }) => {
    await signIn(page, "gestionnaire");
    await goto(page, "/cotisations");
    await page.getByLabel("Chercher un membre par son nom").fill("zzzzzz");
    await expect(page.getByText("Aucun résultat")).toBeVisible();
    await page.getByRole("button", { name: "Tout afficher" }).click();
    await expect(page.locator("tbody tr").first()).toBeVisible();
  });

  test("la secrétaire lit les cotisations sans bouton d'écriture", async ({ page }) => {
    await signIn(page, "secretaire");
    await goto(page, "/cotisations");
    await expect(page.getByRole("heading", { level: 1, name: "Cotisations" })).toBeVisible();
    await expect(page.locator("tbody tr").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Modifier la règle" })).toHaveCount(0);
    await page.locator("tbody tr").first().click();
    const sheet = page.getByRole("dialog").filter({ hasText: "Périodes à payer" });
    await expect(sheet).toBeVisible();
    await expect(sheet.getByRole("button", { name: "Enregistrer un paiement" })).toHaveCount(0);
    await expect(sheet.getByRole("button", { name: "Annuler ce paiement" })).toHaveCount(0);
  });

  test("le profil ventes n'a pas accès aux cotisations", async ({ page }) => {
    await signIn(page, "ventes");
    await goto(page, "/cotisations");
    await expect(page.getByText("Accès non autorisé")).toBeVisible();
  });
});

import { expect, test } from "@playwright/test";
import { goto, signIn } from "./helpers";

test.describe("documents de la coopérative", () => {
  test("le gestionnaire voit les statuts, ajoute un document, le télécharge, le retrouve au journal et le retire", async ({
    page,
  }) => {
    await signIn(page, "gestionnaire");
    await goto(page, "/documents");
    await expect(page.getByRole("heading", { name: "Documents", level: 1 })).toBeVisible();
    await expect(page.getByText("statuts_scoop.pdf")).toBeVisible();

    await page.getByRole("button", { name: "Ajouter un document" }).first().click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel("Fichier").setInputFiles({
      name: "convention_marche.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("contenu de démonstration"),
    });
    await expect(dialog.getByText("convention_marche.pdf (1 Ko)")).toBeVisible();
    await dialog.getByRole("combobox", { name: /Type de document/ }).click();
    await page.getByRole("option", { name: "Convention" }).click();
    await dialog.getByRole("button", { name: "Ajouter le document" }).click();
    await expect(page.getByText("Document ajouté à la bibliothèque").first()).toBeVisible();
    const row = page.getByRole("listitem").filter({ hasText: "convention_marche.pdf" });
    await expect(row).toBeVisible();

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      row.getByRole("button", { name: "Télécharger" }).click(),
    ]);
    expect(download.suggestedFilename()).toBe("convention_marche.pdf.txt");

    await goto(page, "/audit");
    await expect(page.getByText("Téléchargement de pièce").first()).toBeVisible();
    await expect(page.getByText("Document ajouté").first()).toBeVisible();

    await goto(page, "/documents");
    await page
      .getByRole("listitem")
      .filter({ hasText: "convention_marche.pdf" })
      .getByRole("button", { name: /Actions pour/ })
      .click();
    await page.getByRole("menuitem", { name: "Retirer" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Retirer le document" }).click();
    await expect(page.getByText("convention_marche.pdf")).toHaveCount(0);
  });

  test("un fichier trop lourd est refusé avec un message clair", async ({ page }) => {
    await signIn(page, "gestionnaire");
    await goto(page, "/documents");
    await page.getByRole("button", { name: "Ajouter un document" }).first().click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel("Fichier").setInputFiles({
      name: "gros.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.alloc(6 * 1024 * 1024),
    });
    await expect(dialog.getByText(/plus que les 5 Mo permis/)).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Ajouter le document" })).toBeDisabled();
  });

  test("le procès-verbal d'une réunion propose le lien vers la réunion", async ({ page }) => {
    await signIn(page, "gestionnaire");
    await goto(page, "/documents");
    await expect(page.getByRole("link", { name: /Voir la réunion/ })).toHaveCount(1);
  });

  test("la secrétaire lit la bibliothèque, sans téléchargement ni pièce sensible", async ({
    page,
  }) => {
    await signIn(page, "secretaire");
    await goto(page, "/documents");
    await expect(page.getByRole("heading", { name: "Documents", level: 1 })).toBeVisible();
    await expect(page.getByText("reglement_interieur.pdf")).toBeVisible();
    await expect(page.getByRole("button", { name: "Télécharger" })).toHaveCount(0);
    await page.getByRole("button", { name: "Ajouter un document" }).first().click();
    await page.getByRole("dialog").getByLabel("Document sensible").check();
    await expect(page.getByText(/ne s'affichera plus pour vous/)).toBeVisible();
  });

  test("la faîtière n'a pas accès aux documents", async ({ page }) => {
    await signIn(page, "faitiere");
    await goto(page, "/documents");
    await expect(page.getByText("Accès non autorisé")).toBeVisible();
  });

  test("le profil ventes n'a pas accès aux documents", async ({ page }) => {
    await signIn(page, "ventes");
    await goto(page, "/documents");
    await expect(page.getByText("Accès non autorisé")).toBeVisible();
  });
});

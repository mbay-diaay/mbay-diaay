import { expect, test } from "@playwright/test";
import { goto, signIn } from "./helpers";

test.describe("réunions et procès-verbaux", () => {
  test("la secrétaire crée une réunion, la tient, rédige et valide le procès-verbal", async ({
    page,
  }) => {
    await signIn(page, "secretaire");
    await goto(page, "/reunions");
    await expect(
      page.getByRole("heading", { name: "Réunions et procès-verbaux", level: 1 }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Nouvelle réunion" }).click();
    const form = page.getByRole("dialog");
    await form.getByLabel("Titre").fill("Réunion de test");
    await form.getByLabel("Date et heure").fill("2026-10-20T10:00");
    await form.getByLabel("Lieu").fill("Salle du village");
    await form.getByLabel("Ordre du jour").fill("Premier point\nSecond point");
    await form.getByRole("button", { name: "Créer la réunion" }).click();

    await expect(page.getByRole("heading", { name: "Réunion de test", level: 1 })).toBeVisible();
    await expect(page.getByText("Second point")).toBeVisible();

    await page.getByRole("button", { name: "Marquer comme tenue" }).click();
    const att = page.getByRole("dialog");
    await expect(att.getByRole("button", { name: "Marquer comme tenue" })).toBeDisabled();
    await att.getByRole("button", { name: "Tout cocher" }).click();
    await expect(att.getByText(/\d+ sur \d+ cochés/)).toBeVisible();
    await att.getByRole("button", { name: "Marquer comme tenue" }).click();

    await expect(page.getByRole("heading", { name: "Procès-verbal" })).toBeVisible();
    await expect(page.getByText(/Taux de présence : 100 %/)).toBeVisible();
    await page.getByLabel("Texte du procès-verbal").fill("Les points ont été adoptés.");
    await page.getByRole("button", { name: "Enregistrer le brouillon" }).click();
    await expect(page.getByText("Brouillon enregistré").first()).toBeVisible();

    await page.getByRole("button", { name: "Valider le procès-verbal" }).click();
    const confirm = page.getByRole("dialog");
    await expect(confirm.getByText(/ne pourra plus être modifié/)).toBeVisible();
    await confirm.getByRole("button", { name: "Oui, valider" }).click();

    await expect(page.getByText(/Validé par .* le /)).toBeVisible();
    await expect(page.getByLabel("Texte du procès-verbal")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Valider le procès-verbal" })).toHaveCount(0);
    await expect(page.getByText("Les points ont été adoptés.")).toBeVisible();
  });

  test("l'annulation demande un motif", async ({ page }) => {
    await signIn(page, "secretaire");
    await goto(page, "/reunions/meet3");
    await page.getByRole("button", { name: "Annuler la réunion" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("button", { name: "Annuler la réunion" })).toBeDisabled();
    await dialog.getByLabel("Motif de l'annulation").fill("Qu");
    await expect(dialog.getByText("Écrivez le motif de l'annulation.")).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Annuler la réunion" })).toBeDisabled();
    await dialog.getByLabel("Motif de l'annulation").fill("Quorum non atteint");
    await dialog.getByRole("button", { name: "Annuler la réunion" }).click();
    await expect(page.getByText(/Motif : Quorum non atteint/)).toBeVisible();
    await expect(page.getByRole("button", { name: "Marquer comme tenue" })).toHaveCount(0);
  });

  test("le gestionnaire ne voit pas la réunion d'une autre coopérative", async ({ page }) => {
    await signIn(page, "gestionnaire");
    await goto(page, "/reunions");
    await expect(page.getByText("Assemblée générale ordinaire 2026")).toBeVisible();
    await expect(page.getByText("Assemblée générale 2026", { exact: true })).toHaveCount(0);
    await goto(page, "/reunions/meet4");
    await expect(page.getByText("Réunion introuvable")).toBeVisible();
  });

  test("la faîtière lit les réunions sans bouton d'écriture", async ({ page }) => {
    await signIn(page, "faitiere");
    await goto(page, "/reunions");
    await expect(page.getByRole("heading", { name: "Réunions et procès-verbaux" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Nouvelle réunion" })).toHaveCount(0);
    await goto(page, "/reunions/meet3");
    await expect(
      page.getByRole("heading", { name: /Assemblée extraordinaire/, level: 1 }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Marquer comme tenue" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Annuler la réunion" })).toHaveCount(0);
    await goto(page, "/reunions/meet2");
    await expect(page.getByLabel("Texte du procès-verbal")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Valider le procès-verbal" })).toHaveCount(0);
  });

  test("le profil ventes n'a pas accès aux réunions", async ({ page }) => {
    await signIn(page, "ventes");
    await goto(page, "/reunions");
    await expect(page.getByText("Accès non autorisé")).toBeVisible();
  });
});

test.describe("calendrier des réunions", () => {
  test("la bascule affiche le calendrier et le choix reste dans l'adresse", async ({ page }) => {
    await signIn(page, "secretaire");
    await goto(page, "/reunions");
    await page.getByRole("radio", { name: "Calendrier" }).click();
    await expect(page).toHaveURL(/vue=calendrier/);
    await expect(page.getByRole("radio", { name: "Mois" })).toBeVisible();
    await page
      .getByRole("radiogroup", { name: "Affichage des réunions" })
      .getByRole("radio", { name: "Liste" })
      .click();
    await expect(page).not.toHaveURL(/vue=calendrier/);
  });

  test("un clic sur une réunion du calendrier ouvre sa fiche", async ({ page }) => {
    await signIn(page, "secretaire");
    await goto(page, "/reunions?vue=calendrier");
    // La vue liste de l'agenda montre la période affichée : novembre contient l'assemblée extraordinaire.
    await page
      .getByRole("radiogroup", { name: "Type d'affichage" })
      .getByRole("radio", { name: "Liste" })
      .click();
    await page.getByRole("button", { name: "Période suivante" }).click();
    await page
      .getByRole("button", { name: /Assemblée extraordinaire/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/reunions\/meet3/);
  });
});

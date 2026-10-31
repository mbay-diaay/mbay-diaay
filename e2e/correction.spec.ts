import { expect, test } from "@playwright/test";
import { goto, signIn, toast } from "./helpers";

test("une demande de correction ne change pas la fiche avant décision, puis l'approbation l'applique", async ({
  page,
}) => {
  await signIn(page, "admin");
  await goto(page, "/producteurs/p2");
  // La page est chargée à la demande : on attend son contenu, pas seulement l'adresse.
  await expect(page.getByRole("button", { name: "Demander une modification" })).toBeVisible();
  const code = (await page.locator("main").innerText()).match(/NIA-[A-Z]-[A-Z]+-\d+/)?.[0];
  expect(code, "le code du producteur est affiché sous son nom").toBeTruthy();

  // 1. Le producteur est modifié par une demande : la fiche reste inchangée en attendant.
  await page.getByRole("button", { name: "Demander une modification" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Téléphone").fill("78 123 45 67");
  const send = dialog.getByRole("button", { name: "Envoyer la demande" });
  await expect(send).toBeDisabled(); // le motif est obligatoire
  await dialog.getByLabel("Motif").fill("Le producteur a changé de numéro.");
  await send.click();
  await expect(toast(page, "Demande envoyée")).toBeVisible();
  await page.getByRole("button", { name: "Historique" }).click();
  await expect(page.getByText("Aucune modification depuis l'import")).toBeVisible();

  // 2. Un gestionnaire habilité examine la demande avant/après et l'approuve.
  await goto(page, "/qualite/corrections");
  await page.getByLabel("Rechercher un producteur").fill(code!);
  await page.getByRole("button", { name: "Examiner" }).first().click();
  const review = page.getByRole("dialog");
  await expect(review.getByText("Téléphone").first()).toBeVisible(); // comparaison avant / après
  await review.getByRole("button", { name: "Approuver et appliquer" }).click();
  await expect(toast(page, /Demande approuvée/)).toBeVisible();

  // 3. La fiche porte maintenant la modification, tracée dans son historique.
  await goto(page, "/producteurs/p2");
  await page.getByRole("button", { name: "Historique" }).click();
  await expect(page.getByText("Téléphone", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("Aucune modification depuis l'import")).toHaveCount(0);
});

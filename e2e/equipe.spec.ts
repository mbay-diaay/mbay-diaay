import { expect, test, type Page } from "@playwright/test";
import { goto, signIn } from "./helpers";

const MEMBER = "Cheikh Diouf";

async function openMember(page: Page) {
  await goto(page, "/equipe");
  await page.getByLabel("Rechercher un membre").fill(MEMBER);
  const row = page.getByRole("row", { name: new RegExp(MEMBER) });
  await row.getByRole("button").click();
  await page.getByRole("menuitem", { name: "Ouvrir la fiche" }).click();
  return page.getByRole("dialog");
}

test.describe("équipe et accès", () => {
  test("le représentant attribue puis retire l'accès d'un membre", async ({ page }) => {
    await signIn(page, "representant");
    const fiche = await openMember(page);
    await expect(fiche.getByText("Cette personne n'a pas d'accès.")).toBeVisible();

    await fiche.getByRole("combobox", { name: "Rôle dans l'application" }).click();
    await page.getByRole("option", { name: "Technicien" }).click();
    await fiche.getByRole("button", { name: "Attribuer l'accès" }).click();
    await expect(fiche.getByText("Technicien.", { exact: true })).toBeVisible();

    // Un représentant ne peut pas nommer un autre représentant ni un gestionnaire (D13).
    await fiche.getByRole("combobox", { name: "Rôle dans l'application" }).click();
    await expect(page.getByRole("option", { name: "Représentant de SCOOP" })).toHaveCount(0);
    await expect(page.getByRole("option", { name: "Gestionnaire de SCOOP" })).toHaveCount(0);
    await page.keyboard.press("Escape");

    await fiche.getByRole("button", { name: "Retirer l'accès" }).click();
    await expect(fiche.getByText("Technicien, accès fermé.")).toBeVisible();
  });

  test("le gestionnaire voit la fiche sans pouvoir gérer les accès", async ({ page }) => {
    await signIn(page, "gestionnaire");
    const fiche = await openMember(page);
    await expect(fiche.getByText("Votre rôle ne permet pas de gérer les accès.")).toBeVisible();
    await expect(fiche.getByRole("button", { name: "Attribuer l'accès" })).toHaveCount(0);
  });

  test("le représentant ajoute un membre avec âge, handicap et village, puis voit sa fiche", async ({
    page,
  }) => {
    await signIn(page, "representant");
    await goto(page, "/equipe");
    await page.getByRole("button", { name: "Ajouter un membre" }).first().click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel(/^Prénom/).fill("Awa");
    await dialog.getByLabel(/^Nom/).fill("Fiche-Test");

    // Âge hors limites : message clair et bouton bloqué.
    await dialog.getByLabel("Âge").fill("12");
    await expect(
      dialog.getByText("L'âge doit être un nombre entier entre 15 et 100."),
    ).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Ajouter", exact: true })).toBeDisabled();
    await dialog.getByLabel("Âge").fill("34");

    await dialog.getByRole("combobox", { name: "Situation de handicap" }).click();
    await page.getByRole("option", { name: "Oui" }).click();
    await dialog.getByLabel("Village").fill("Ndiaffate");
    await dialog.getByRole("button", { name: "Ajouter", exact: true }).click();

    await page.getByLabel("Rechercher un membre").fill("Fiche-Test");
    const row = page.getByRole("row", { name: /Fiche-Test/ });
    await row.getByRole("button").click();
    await page.getByRole("menuitem", { name: "Ouvrir la fiche" }).click();
    const fiche = page.getByRole("dialog");
    await expect(fiche.getByText("34 ans")).toBeVisible();
    await expect(fiche.getByText("Ndiaffate")).toBeVisible();
    await expect(fiche.getByText("Situation de handicap")).toBeVisible();

    // Modification depuis la fiche (droit de gestion des membres).
    await fiche.getByRole("button", { name: "Modifier les informations" }).click();
    await page.getByRole("dialog").last().getByLabel("Village").fill("Mbane");
    await page.getByRole("button", { name: "Enregistrer" }).click();
    await expect(fiche.getByText("Mbane")).toBeVisible();
  });

  test("le gestionnaire voit l'état de cotisation et la présence aux réunions", async ({
    page,
  }) => {
    await signIn(page, "gestionnaire");
    const fiche = await openMember(page);
    const dues = fiche.getByTestId("member-dues");
    await expect(dues).toBeVisible();
    await expect(
      dues.getByText(/À jour|En retard|N'a encore rien payé|Rien à payer pour le moment/),
    ).toBeVisible();
    await expect(dues.getByRole("link", { name: "Voir les cotisations" })).toBeVisible();
    await expect(fiche.getByTestId("member-meetings")).toBeVisible();
    await expect(fiche.getByRole("button", { name: "Modifier les informations" })).toHaveCount(0);
  });

  test("la faîtière ne voit pas les documents rattachés", async ({ page }) => {
    await signIn(page, "faitiere");
    const fiche = await openMember(page);
    await expect(fiche.getByTestId("member-docs")).toHaveCount(0);
    await expect(fiche.getByTestId("member-dues")).toBeVisible();
  });

  test("l'administrateur doit choisir la coopérative avant d'ajouter un membre", async ({
    page,
  }) => {
    await signIn(page, "admin");
    await goto(page, "/equipe");
    await page.getByRole("button", { name: "Ajouter un membre" }).first().click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel(/^Prénom/).fill("Awa");
    await dialog.getByLabel(/^Nom/).fill("Test-Ajout");
    const submit = dialog.getByRole("button", { name: "Ajouter", exact: true });
    await expect(submit).toBeDisabled();
    await dialog.getByRole("combobox", { name: /SCOOP/ }).click();
    await page.getByRole("option").first().click();
    await expect(submit).toBeEnabled();
  });

  test("le représentant n'a qu'une coopérative : elle est choisie d'office", async ({ page }) => {
    await signIn(page, "representant");
    await goto(page, "/equipe");
    await page.getByRole("button", { name: "Ajouter un membre" }).first().click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel(/^Prénom/).fill("Awa");
    await dialog.getByLabel(/^Nom/).fill("Test-Ajout");
    await expect(dialog.getByRole("button", { name: "Ajouter", exact: true })).toBeEnabled();
  });
});

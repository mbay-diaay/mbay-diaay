import { expect, test } from "@playwright/test";
import { goto, signIn, toast } from "./helpers";

test.describe("coopératives", () => {
  test("l'administrateur crée, modifie, archive et réactive une coopérative", async ({ page }) => {
    await signIn(page, "admin");
    await goto(page, "/cooperatives");
    await expect(page.getByRole("heading", { name: "Coopératives", level: 1 })).toBeVisible();

    // Création : champs invalides refusés avec un message, bouton désactivé.
    await page.getByRole("button", { name: "Créer une coopérative" }).first().click();
    const dialog = page.getByRole("dialog");
    const submit = dialog.getByRole("button", { name: "Créer et inviter" });
    await dialog.getByLabel("Nom de la coopérative").fill("SCOOP Test Ndiaye");
    await dialog.getByLabel("Commune").fill("Ndiaye");
    await dialog.getByLabel("Code court").fill("ab");
    await expect(dialog.getByText("3 à 5 lettres, sans chiffre ni espace")).toBeVisible();
    await expect(dialog.getByLabel("Code court")).toHaveValue("AB");
    await dialog.getByLabel("Prénom").fill("Awa");
    await dialog.getByLabel(/^Nom\s*\(obligatoire\)/).fill("Ndiaye");
    await dialog.getByLabel("Adresse e-mail").fill("awa");
    await expect(dialog.getByText("adresse e-mail du gestionnaire n'est pas valide")).toBeVisible();
    await expect(submit).toBeDisabled();

    // Succès.
    await dialog.getByLabel("Code court").fill("tsn");
    await dialog.getByLabel("Adresse e-mail").fill("awa.ndiaye@scoop-test.example");
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(
      toast(page, "Coopérative créée, invitation envoyée à awa.ndiaye@scoop-test.example"),
    ).toBeVisible();
    const row = page.getByRole("row", { name: /SCOOP Test Ndiaye/ });
    await expect(row).toBeVisible();
    await expect(row.getByText("Invitation envoyée").last()).toBeVisible();
    await expect(row.getByText("Active", { exact: true })).toBeVisible();

    // Modification.
    await row.getByRole("button", { name: /Actions pour/ }).click();
    await page.getByRole("menuitem", { name: "Modifier" }).click();
    await dialog.getByLabel("Commune").fill("Thiès");
    await dialog.getByRole("button", { name: "Enregistrer" }).click();
    await expect(toast(page, "Coopérative modifiée")).toBeVisible();
    await expect(page.getByRole("row", { name: /SCOOP Test Ndiaye/ })).toContainText("Thiès");

    // Refus : La première coopérative (ASLB) a des dossiers en cours.
    const kms = page.getByRole("row", { name: /And Sam Luniou Bokk/ });
    await kms.getByRole("button", { name: /Actions pour/ }).click();
    await page.getByRole("menuitem", { name: "Archiver" }).click();
    await expect(dialog.getByText("Archivage impossible pour le moment")).toBeVisible();
    await expect(dialog.getByText(/encore \d+ dossiers? en cours/)).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Voir les dossiers en cours" })).toBeVisible();
    await dialog.getByRole("button", { name: "Fermer" }).first().click();
    await expect(dialog).toHaveCount(0);

    // Archivage de la nouvelle coopérative, puis réactivation.
    await page
      .getByRole("row", { name: /SCOOP Test Ndiaye/ })
      .getByRole("button", { name: /Actions pour/ })
      .click();
    await page.getByRole("menuitem", { name: "Archiver" }).click();
    await expect(dialog.getByText("Archiver cette coopérative ?")).toBeVisible();
    await dialog.getByRole("button", { name: "Archiver la coopérative" }).click();
    await expect(toast(page, "Coopérative archivée")).toBeVisible();
    await expect(page.getByRole("row", { name: /SCOOP Test Ndiaye/ })).toContainText("Archivée");

    await page.getByRole("button", { name: /^Archivées/ }).click();
    await expect(page.getByRole("row", { name: /SCOOP Test Ndiaye/ })).toBeVisible();
    await page
      .getByRole("row", { name: /SCOOP Test Ndiaye/ })
      .getByRole("button", { name: /Actions pour/ })
      .click();
    await page.getByRole("menuitem", { name: "Réactiver" }).click();
    await expect(toast(page, "Coopérative réactivée")).toBeVisible();
  });

  test("l'administrateur ouvre une coopérative et parcourt les six onglets", async ({ page }) => {
    await signIn(page, "admin");
    await goto(page, "/cooperatives");
    await page.getByRole("row", { name: /And Sam Luniou Bokk/ }).click();
    await expect(page).toHaveURL(/\/cooperatives\/[^/?]+$/);
    await expect(
      page.getByRole("heading", { name: "And Sam Luniou Bokk", level: 1 }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Modifier" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Archiver" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "À traiter" })).toBeVisible();

    const tabs: [RegExp, RegExp, string][] = [
      [/^GIE \(\d+\)/, /Organisation/, "gie"],
      [/^Membres \(\d+\)/, /Statut/, "membres"],
      [/^Techniciens \(\d+\)/, /Les techniciens qui peuvent/, "techniciens"],
      [/^Réunions \(\d+\)/, /Toutes les réunions/, "reunions"],
      [/^Cotisations \(\d+\)/, /Règle de cotisation/, "cotisations"],
    ];
    for (const [name, content, slug] of tabs) {
      await page.getByRole("tab", { name }).click();
      await expect(page).toHaveURL(new RegExp(`onglet=${slug}`));
      await expect(page.getByRole("tabpanel").getByText(content).first()).toBeVisible();
    }
    await page.getByRole("tab", { name: "Aperçu" }).click();
    await expect(page.getByRole("heading", { name: "À traiter" })).toBeVisible();
  });

  test("l'onglet GIE se filtre et mène à la fiche de l'organisation", async ({ page }) => {
    await signIn(page, "admin");
    await goto(page, "/cooperatives/s1?onglet=gie");
    const panel = page.getByRole("tabpanel");
    await expect(panel.getByRole("button", { name: /^Tous/ })).toBeVisible();
    await panel.getByRole("button", { name: /^Qualifiés/ }).click();
    await expect(panel.getByRole("button", { name: /^Qualifiés/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await panel.getByRole("link").first().click();
    await expect(page).toHaveURL(/\/organisations\//);
  });

  test("une coopérative inconnue est introuvable", async ({ page }) => {
    await signIn(page, "admin");
    await goto(page, "/cooperatives/inconnue");
    await expect(page.getByText("Coopérative introuvable")).toBeVisible();
  });

  test("la faîtière lit la liste et la fiche sans bouton d'écriture", async ({ page }) => {
    await signIn(page, "faitiere");
    await goto(page, "/cooperatives");
    await expect(page.getByRole("heading", { name: "Coopératives", level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: "Créer une coopérative" })).toHaveCount(0);
    await page.getByRole("row").nth(1).click();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: "Modifier" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Archiver" })).toHaveCount(0);
  });

  test("le gestionnaire n'a que sa coopérative", async ({ page }) => {
    await signIn(page, "gestionnaire");
    await goto(page, "/cooperatives");
    await expect(page.getByRole("heading", { name: "Coopératives", level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: "Créer une coopérative" })).toHaveCount(0);
    await expect(page.getByRole("row")).toHaveCount(2);
    await goto(page, "/cooperatives/s2");
    await expect(page.getByText("Coopérative introuvable")).toBeVisible();
  });

  test("le responsable des ventes n'a pas accès", async ({ page }) => {
    await signIn(page, "ventes");
    await goto(page, "/cooperatives");
    await expect(page.getByText("Accès non autorisé")).toBeVisible();
  });
});

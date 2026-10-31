import { expect, test } from "@playwright/test";
import { goto, signIn } from "./helpers";

test.describe("circuit des dossiers producteurs", () => {
  test("le technicien soumet un dossier complet à la coopérative", async ({ page }) => {
    await signIn(page, "technicien");
    await goto(page, "/dossiers/dos1");
    await page.getByRole("button", { name: "Soumettre à la coopérative" }).click();
    await expect(page.getByRole("button", { name: "Soumettre à la coopérative" })).toHaveCount(0);
    await expect(page.getByText("soumis", { exact: false }).first()).toBeVisible();
  });

  test("un dossier incomplet ne part pas, et le technicien ne décide jamais", async ({ page }) => {
    await signIn(page, "technicien");
    await goto(page, "/dossiers/dos2");
    await page.getByRole("button", { name: "Soumettre à la coopérative" }).click();
    await expect(page.getByRole("button", { name: "Approuver", exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Refuser", exact: true })).toHaveCount(0);
    // Toujours en brouillon : le bouton de soumission reste disponible.
    await expect(page.getByRole("button", { name: "Soumettre à la coopérative" })).toBeVisible();
  });

  test("le gestionnaire doit trancher le doublon avant d'approuver", async ({ page }) => {
    await signIn(page, "gestionnaire");
    await goto(page, "/dossiers/dos3");
    await page.getByRole("button", { name: "Approuver", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Approuver ce dossier" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("radio", { name: /C'est une autre personne/ }).check();
    await dialog.getByRole("button", { name: "Approuver", exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("button", { name: "Approuver", exact: true })).toHaveCount(0);
  });

  test("la secrétaire instruit sans décider ni voir la CNI", async ({ page }) => {
    await signIn(page, "secretaire");
    await goto(page, "/dossiers/dos3");
    await expect(page.getByRole("button", { name: "Prendre en examen" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Approuver", exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Refuser", exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /Télécharger/ })).toHaveCount(0);
    await expect(page.getByText("cni.pdf")).toHaveCount(0);
  });

  test("le responsable des ventes n'a pas accès aux dossiers", async ({ page }) => {
    await signIn(page, "ventes");
    await goto(page, "/dossiers");
    await expect(page.getByText("Accès non autorisé")).toBeVisible();
  });

  test("le technicien voit « C'est à vous » sur son brouillon", async ({ page }) => {
    await signIn(page, "technicien");
    await goto(page, "/dossiers/dos1");
    await expect(page.getByRole("heading", { name: "Où en est ce dossier ?" })).toBeVisible();
    await expect(page.getByText("C'est à vous", { exact: false }).first()).toBeVisible();
    await expect(page.getByRole("list", { name: "Progression du dossier" })).toBeVisible();
  });

  test("la secrétaire voit que la décision revient à la coopérative", async ({ page }) => {
    await signIn(page, "secretaire");
    await goto(page, "/dossiers/dos3");
    await expect(page.getByText("La décision finale revient à la coopérative")).toBeVisible();
    await expect(page.getByRole("button", { name: "Approuver", exact: true })).toHaveCount(0);
  });

  test("un dossier refusé indique qu'il est clos", async ({ page }) => {
    await signIn(page, "admin");
    await goto(page, "/dossiers/dos7");
    await expect(page.getByText("Personne : le dossier est clos")).toBeVisible();
    await expect(
      page.getByText("un dossier refusé ne se rouvre pas", { exact: false }).first(),
    ).toBeVisible();
  });

  test("les filtres restent visibles à 360 px, sans défilement horizontal", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await signIn(page, "gestionnaire");
    await goto(page, "/dossiers");
    const group = page.getByRole("region", { name: "Afficher les dossiers" });
    for (const name of [
      /^À traiter/,
      /^Tous/,
      /^Brouillons/,
      /^Complément demandé/,
      /^Approuvés/,
      /^Refusés/,
    ])
      await expect(group.getByRole("button", { name })).toBeInViewport();
    await expect(page.getByRole("textbox", { name: "Rechercher un dossier" })).toBeVisible();
    await group.getByRole("button", { name: /^Refusés/ }).click();
    await expect(group.getByText("Filtre actif : Refusés")).toBeVisible();
    await group.getByRole("button", { name: "Tout afficher" }).click();
    await expect(group.getByText("Aucun filtre", { exact: false })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });
});

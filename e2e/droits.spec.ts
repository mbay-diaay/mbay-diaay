import { expect, test } from "@playwright/test";
import { goto, openNavGroup, signIn } from "./helpers";

test.describe("droits et périmètre par rôle", () => {
  test("l'administrateur voit toute l'administration", async ({ page }) => {
    await signIn(page, "admin");
    const menu = page.getByRole("navigation").first();
    await openNavGroup(page, "Administration");
    for (const entry of [
      "Utilisateurs & rôles",
      "Imports",
      "Sauvegarde & export",
      "Journal d'audit",
    ]) {
      await expect(menu.getByRole("link", { name: entry })).toBeVisible();
    }
  });

  test("le gestionnaire n'a ni la gestion des utilisateurs ni la sauvegarde", async ({ page }) => {
    await signIn(page, "gestionnaire");
    const menu = page.getByRole("navigation").first();
    await expect(menu.getByRole("link", { name: "Producteurs", exact: true })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Utilisateurs & rôles" })).toHaveCount(0);
    await expect(menu.getByRole("link", { name: "Sauvegarde & export" })).toHaveCount(0);

    await goto(page, "/donnees");
    await expect(page.getByText("Accès non autorisé")).toBeVisible();
  });

  test("le gestionnaire ne voit que les producteurs de sa SCOOP", async ({ page, browser }) => {
    await signIn(page, "gestionnaire");
    await goto(page, "/producteurs");
    const scoped = await page.getByText(/producteur\(s\) trouvé\(s\)/).innerText();

    const admin = await (await browser.newContext()).newPage();
    await signIn(admin, "admin");
    await goto(admin, "/producteurs");
    const all = await admin.getByText(/producteur\(s\) trouvé\(s\)/).innerText();

    // Les milliers sont séparés par une espace insécable : on ne garde que les chiffres du début du texte.
    const count = (text: string) => Number(/^[\d\s]+/.exec(text)?.[0].replace(/\s/g, ""));
    expect(count(all)).toBe(1317);
    expect(count(scoped)).toBeLessThan(1317);
    expect(count(scoped)).toBeGreaterThan(0);
  });

  test("la faîtière lit les données mais n'a pas l'espace Qualité", async ({ page }) => {
    await signIn(page, "faitiere");
    const menu = page.getByRole("navigation").first();
    await expect(menu.getByRole("button", { name: /^Qualité des données/ })).toHaveCount(0);
    await expect(menu.getByRole("link", { name: "Qualité des données" })).toHaveCount(0);
    await goto(page, "/qualite/doublons");
    await expect(page.getByText("Accès non autorisé")).toBeVisible();
  });
});

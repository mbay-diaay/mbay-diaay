import { expect, test } from "@playwright/test";
import { hydrated, ROLES, signIn } from "./helpers";

test.describe("authentification", () => {
  test("un mauvais mot de passe est refusé sans révéler si le compte existe", async ({ page }) => {
    await page.goto("/login");
    await hydrated(page);
    await page.getByLabel("Adresse e-mail").fill("aissatou.ndiaye@cradesc.example");
    await page.getByLabel("Mot de passe").fill("mauvais-mot-de-passe");
    await page.getByRole("button", { name: "Se connecter" }).click();
    const sameMessage = page.getByText("Adresse e-mail ou mot de passe incorrect.");
    await expect(sameMessage).toBeVisible();

    // Un compte inconnu reçoit exactement le même message.
    await page.getByLabel("Adresse e-mail").fill("inconnu@exemple.sn");
    await page.getByRole("button", { name: "Se connecter" }).click();
    await expect(sameMessage).toBeVisible();
  });

  test("la connexion se fait en deux étapes : mot de passe puis code", async ({ page }) => {
    await signIn(page, "admin");
    await expect(page.getByRole("heading", { name: "Tableau de bord" })).toBeVisible();
    await expect(page.getByText("1 317").first()).toBeVisible();
  });

  test("un code incorrect est refusé et on reste sur la vérification", async ({ page }) => {
    await page.goto("/login");
    await hydrated(page);
    await page.locator("#demo-accounts ~ ul").getByRole("button", { name: ROLES.admin }).click();
    await page.getByRole("button", { name: "Se connecter" }).click();
    await page.locator("#otp").click();
    await page.keyboard.type("000000");
    await expect(page.getByText(/Code incorrect/)).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test("la session survit à un rechargement, puis la déconnexion ramène à la connexion", async ({
    page,
  }) => {
    await signIn(page, "admin");
    await page.reload();
    await expect(page.getByRole("heading", { name: "Tableau de bord" })).toBeVisible();

    await page.getByRole("button", { name: "Compte et profil de démonstration" }).click();
    await page.getByRole("menuitem", { name: "Se déconnecter" }).click();
    await expect(page).toHaveURL(/\/login/);
    await page.goto("/producteurs");
    await expect(page).toHaveURL(/\/login/);
  });

  test("la page « mot de passe oublié » est accessible depuis la connexion", async ({ page }) => {
    await page.goto("/login");
    await hydrated(page);
    await page.getByRole("link", { name: "Mot de passe oublié" }).click();
    await expect(page).toHaveURL(/mot-de-passe-oublie/);
  });
});

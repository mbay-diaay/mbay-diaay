import { expect, test } from "@playwright/test";
import { goto, signIn } from "./helpers";

const EMAIL = "fatima.sow@scoop-invitation.example";
const PASSWORD = "Mot2PasseSolide!";

test.describe("invitation du gestionnaire d'une nouvelle coopérative", () => {
  test("de la création de la coopérative à la première connexion du gestionnaire", async ({
    page,
  }) => {
    await signIn(page, "admin");
    await goto(page, "/cooperatives");
    await page.getByRole("button", { name: "Créer une coopérative" }).first().click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel("Nom de la coopérative").fill("SCOOP Invitation");
    await dialog.getByLabel("Commune").fill("Kayar");
    await dialog.getByLabel("Code court").fill("inv");
    await dialog.getByLabel("Prénom").fill("Fatima");
    await dialog.getByLabel(/^Nom\s*\(obligatoire\)/).fill("Sow");
    await dialog.getByLabel("Adresse e-mail").fill(EMAIL);
    await dialog.getByRole("button", { name: "Créer et inviter" }).click();
    await expect(page.getByRole("row", { name: /SCOOP Invitation/ })).toBeVisible();

    // L'administrateur se déconnecte : le lien d'invitation (courriel simulé) est sur la page de connexion.
    await page.getByRole("button", { name: "Compte et profil de démonstration" }).click();
    await page.getByRole("menuitem", { name: "Se déconnecter" }).click();
    await expect(page.getByRole("heading", { name: "Connexion", level: 1 })).toBeVisible();

    // Avant l'activation, aucun mot de passe ne fonctionne.
    await page.locator("#email").fill(EMAIL);
    await page.getByLabel("Mot de passe", { exact: true }).fill(PASSWORD);
    await page.getByRole("button", { name: "Se connecter" }).click();
    await expect(page.getByText("Adresse e-mail ou mot de passe incorrect.")).toBeVisible();

    // Le lien d'invitation : mot de passe refusé s'il est trop faible, accepté sinon.
    await page.getByRole("link", { name: /Ouvrir le lien d'invitation de Fatima Sow/ }).click();
    await expect(page.getByRole("heading", { name: "Bienvenue", level: 1 })).toBeVisible();
    // Le jeton ne reste pas dans l'adresse (historique, captures, en-têtes de référence).
    await expect(page).not.toHaveURL(/jeton/);
    const submit = page.getByRole("button", { name: "Activer mon compte" });
    await page.getByLabel("Mot de passe", { exact: true }).fill("court");
    await expect(submit).toBeDisabled();
    await page.getByLabel("Mot de passe", { exact: true }).fill(PASSWORD);
    await page.getByLabel("Confirmer le mot de passe").fill(PASSWORD);
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(page.getByText("Mot de passe modifié. Vous pouvez vous connecter.")).toBeVisible();
    // Le lien est détruit : il disparaît de la page de connexion.
    await expect(page.getByRole("link", { name: /Ouvrir le lien d'invitation/ })).toHaveCount(0);

    // Première connexion : mot de passe, puis code à 6 chiffres. Le gestionnaire ne voit que sa coopérative.
    await page.locator("#email").fill(EMAIL);
    await page.getByLabel("Mot de passe", { exact: true }).fill(PASSWORD);
    await page.getByRole("button", { name: "Se connecter" }).click();
    await expect(page.getByText("Vérification en deux étapes")).toBeVisible();
    const code = (await page.locator("body").innerText()).match(/Code reçu : (\d{6})/)?.[1];
    expect(code).toBeTruthy();
    await page.locator("#otp").click();
    await page.keyboard.type(code!);
    await page.waitForURL((url) => url.pathname === "/");
    await expect(page.getByText("SCOOP Invitation").first()).toBeVisible();
  });
});

import { expect, test } from "@playwright/test";
import { goto, signIn, toast } from "./helpers";

test.describe("revue des doublons", () => {
  test("fusionner deux fiches est réversible depuis le même écran", async ({ page }) => {
    await signIn(page, "admin");
    await goto(page, "/qualite/doublons");
    await expect(page.getByText(/Cas D\d+/).first()).toBeVisible();

    await page.getByLabel("Commentaire").fill("Même personne, CNI identique");
    await page.getByRole("button", { name: "Fusionner B dans A" }).click();
    await expect(page.getByRole("alertdialog")).toContainText("Confirmer la fusion");
    await page.getByRole("alertdialog").getByRole("button", { name: "Fusionner" }).click();
    await expect(toast(page, "Fiches fusionnées")).toBeVisible();

    await page.getByRole("button", { name: "Défaire la fusion" }).click();
    await expect(toast(page, "Fusion défaite")).toBeVisible();
  });

  test("un technicien examine les cas mais ne peut pas fusionner", async ({ page }) => {
    await signIn(page, "technicien");
    await goto(page, "/qualite/doublons");
    await page.getByLabel("Commentaire").fill("Doublon probable");
    await expect(page.getByRole("button", { name: "Fusionner B dans A" })).toHaveCount(0);
    await expect(page.getByText("La fusion demande une permission dédiée.")).toBeVisible();
  });

  test("classer un cas demande un classement et un commentaire", async ({ page }) => {
    await signIn(page, "admin");
    await goto(page, "/qualite/doublons");
    const save = page.getByRole("button", { name: "Enregistrer le classement" });
    await expect(save).toBeDisabled();
    await page.getByLabel("Classement du cas").click();
    await page.getByRole("option", { name: "probable" }).click();
    await page.getByLabel("Commentaire").fill("Noms proches, même village");
    await save.click();
    await expect(toast(page, "Cas classé")).toBeVisible();
  });
});

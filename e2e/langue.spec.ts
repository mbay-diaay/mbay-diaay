import { expect, test } from "@playwright/test";
import { hydrated } from "./helpers";

test.describe("choix de la langue", () => {
  test("la connexion bascule en wolof (textes repères) et le choix survit au rechargement", async ({
    page,
  }) => {
    await page.goto("/login");
    await hydrated(page);
    await expect(page.getByRole("heading", { name: "Connexion", level: 1 })).toBeVisible();

    await page.getByRole("radio", { name: "Wolof" }).click();
    // Texte repère : le français rallongé, jamais une traduction inventée.
    await expect(page.getByRole("heading", { level: 1 })).toContainText("~");
    await expect(page.locator("html")).toHaveAttribute("lang", "wo");

    await page.reload();
    await hydrated(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "wo");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("~");

    await page.getByRole("radio", { name: "Français" }).click();
    await expect(page.getByRole("heading", { name: "Connexion", level: 1 })).toBeVisible();
  });
});

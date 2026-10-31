import { expect, test } from "@playwright/test";
import { goto, openNavGroup, signIn } from "./helpers";

test.describe("menu Module 1 (Administratif)", () => {
  test("le menu est en sections courtes : Administration est repliée, le choix est mémorisé", async ({
    page,
  }) => {
    await signIn(page, "admin");
    const menu = page.getByRole("navigation").first();
    await expect(menu.getByRole("button", { name: /^Personnes/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    for (const section of ["Vie de la coopérative", "Qualité des données", "Administration"]) {
      await expect(menu.getByRole("button", { name: new RegExp(`^${section}`) })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
    await expect(menu.getByRole("link", { name: "Producteurs", exact: true })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Carte des parcelles" })).toHaveCount(0);
    await expect(menu.getByRole("link", { name: "Stocks d'intrants" })).toHaveCount(0);
    await expect(menu.getByRole("button", { name: /^Commerce/ })).toHaveCount(0);
    await expect(menu.getByRole("button", { name: /^Exploitation/ })).toHaveCount(0);
    await openNavGroup(page, "Qualité des données");
    await expect(menu.getByRole("link", { name: "Qualité des données" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Utilisateurs & rôles" })).toBeHidden();

    await openNavGroup(page, "Administration");
    await expect(menu.getByRole("link", { name: "Utilisateurs & rôles" })).toBeVisible();
    await page.reload();
    await expect(
      page
        .getByRole("navigation")
        .first()
        .getByRole("button", { name: /^Administration/ }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  test("la section de la page courante s'ouvre toujours", async ({ page }) => {
    await signIn(page, "admin");
    await goto(page, "/audit");
    await expect(
      page.getByRole("navigation").first().getByRole("link", { name: "Journal d'audit" }),
    ).toBeVisible();
  });

  test("la recherche universelle ne propose pas une fonction hors Module 1", async ({ page }) => {
    await signIn(page, "admin");
    await page.getByRole("button", { name: "Recherche universelle" }).click();
    await page.getByPlaceholder(/Producteur, organisation/).fill("Stocks");
    await expect(page.getByRole("option", { name: /Stocks/ })).toHaveCount(0);
    await page.getByPlaceholder(/Producteur, organisation/).fill("Carte");
    await expect(page.getByRole("option", { name: /Carte des parcelles/ })).toHaveCount(0);
  });

  test("la faîtière consulte les organisations et GIE sans pouvoir les modifier", async ({
    page,
  }) => {
    await signIn(page, "faitiere");
    const menu = page.getByRole("navigation").first();
    await menu.getByRole("link", { name: "Organisations et GIE" }).click();
    await expect(page.getByRole("heading", { name: "Organisations", level: 1 })).toBeVisible();
    await expect(page.getByRole("checkbox")).toHaveCount(0);
  });

  test("le responsable des ventes n'accède pas aux producteurs", async ({ page }) => {
    await signIn(page, "ventes");
    const menu = page.getByRole("navigation").first();
    await expect(menu.getByRole("link", { name: "Producteurs", exact: true })).toHaveCount(0);
    await goto(page, "/producteurs");
    await expect(page.getByText("Accès non autorisé")).toBeVisible();
  });
});

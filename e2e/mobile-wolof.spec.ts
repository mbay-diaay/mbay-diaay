import { expect, test } from "@playwright/test";
import { goto, hydrated, signIn } from "./helpers";

/**
 * Pseudo-localisation (chapitre 6.7 de docs/DEVELOPPEMENT.md) : tant que le wolof n'est pas relu,
 * chaque texte est le français allongé d'environ 30 %. Si cela déborde à 360 px, une vraie
 * traduction plus longue débordera aussi : on le vérifie avant toute traduction.
 */
/** Éléments qui dépassent à droite : rend l'échec lisible (quel bloc déborde). */
const wideElements = () =>
  [...document.querySelectorAll("body *")]
    .filter((e) => e.getBoundingClientRect().right > document.documentElement.clientWidth + 0.5)
    .filter((e) => !e.parentElement?.closest(".overflow-x-auto, .overflow-auto, [role=tablist]"))
    // Les couches de la carte (tuiles, canvas) dépassent par construction : le conteneur les rogne.
    .filter((e) => !e.closest(".leaflet-container") || e.classList.contains("leaflet-container"))
    .slice(0, 6)
    .map((e) => `${e.tagName}.${String(e.className).slice(0, 60)}`);

test.describe("téléphone 360 px en wolof (textes repères)", () => {
  test("aucune page principale ne déborde avec des textes allongés de 30 %", async ({ page }) => {
    // Une trentaine de pages à parcourir : au premier passage, le serveur de développement compile chaque route.
    test.setTimeout(240_000);
    await signIn(page, "admin");
    await page.evaluate(() => window.localStorage.setItem("mbd.locale", "wo"));
    await page.reload();
    await hydrated(page);

    const pages = [
      "/",
      "/producteurs",
      "/cooperatives/s1",
      "/equipe",
      "/dossiers",
      "/cotisations",
      "/reunions",
      "/documents",
      "/organisations",
      "/qualite/doublons",
      "/qualite/alertes",
      "/rapports",
      "/utilisateurs",
      "/comptes",
      "/appareils",
      "/referentiels",
      "/imports",
      "/donnees",
      "/audit",
      "/cooperatives",
    ];
    for (const path of pages) {
      await goto(page, path);
      const title = page.getByRole("heading", { level: 1 });
      await expect(title, `${path} doit afficher un titre en texte repère`).toContainText("~", {
        timeout: 20_000,
      });
      // Laisse la page précédente se retirer (la carte met un instant à se démonter) avant de mesurer.
      await page.waitForTimeout(500);
      // Mesure une fois la page stabilisée : un débordement passager pendant le rendu n'est pas visible.
      await expect
        .poll(
          async () => {
            const overflow = await page.evaluate(
              () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
            );
            return overflow > 0
              ? `${overflow} px : ${(await page.evaluate(wideElements)).join(" | ")}`
              : "ok";
          },
          // Large : sur une machine d'intégration, la carte charge sa feuille de style après un premier démarrage à froid.
          { message: `${path} déborde en wolof`, timeout: 20_000 },
        )
        .toBe("ok");
    }
  });
});

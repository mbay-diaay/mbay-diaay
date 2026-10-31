import { defineConfig, devices } from "@playwright/test";

/**
 * Tests de parcours dans un navigateur (chapitre 3 de docs/DEVELOPPEMENT.md).
 * En local : `pnpm e2e` démarre le serveur de développement sur le port 4173, ou réutilise celui qui tourne.
 * `E2E_BASE_URL` vise un serveur déjà lancé (par exemple http://localhost:8080) et évite d'en démarrer un.
 */
const PORT = Number(process.env["E2E_PORT"] ?? 4173);
const BASE_URL = process.env["E2E_BASE_URL"] ?? `http://localhost:${PORT}`;
const CI = !!process.env["CI"];

export default defineConfig({
  testDir: "./e2e",
  // Chaque test ouvre un navigateur neuf : les données de démonstration sont en mémoire et repartent de zéro.
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  // Hors CI : moitié des cœurs ; en CI : deux travailleurs (machines partagées).
  workers: CI ? 2 : "50%",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: BASE_URL,
    locale: "fr-FR",
    timezoneId: "Africa/Dakar",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "bureau",
      testIgnore: /mobile.*\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      testMatch: /mobile.*\.spec\.ts/,
      use: { ...devices["Pixel 5"], viewport: { width: 360, height: 740 } },
    },
  ],
  // `exactOptionalPropertyTypes` : la clé est absente (et non `undefined`) quand un serveur est déjà lancé.
  ...(process.env["E2E_BASE_URL"]
    ? {}
    : {
        webServer: {
          command: `pnpm dev --port ${PORT} --strictPort`,
          url: `${BASE_URL}/login`,
          reuseExistingServer: !CI,
          timeout: 120_000,
        },
      }),
});

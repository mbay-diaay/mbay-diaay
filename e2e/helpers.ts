import { expect, type Page } from "@playwright/test";

/**
 * Comptes de démonstration (web-angular/src/lib/auth/demo-service.ts, docs/COMPTES_DEMO.md).
 * Ils ne sont plus listés sur la page de connexion : les tests saisissent e-mail et mot de passe.
 */
export const DEMO_PASSWORD = "Demonstration2026";
export const ROLES = {
  admin: "aissatou.ndiaye@cradesc.example",
  gestionnaire: "babacar.fall@scoop-kms.example",
  faitiere: "ousmane.gueye@uscn.example",
  technicien: "fatou.sarr@cradesc.example",
  representant: "moussa.diouf@scoop-kms.example",
  secretaire: "aminata.ba@scoop-kms.example",
  ventes: "ibrahima.seck@scoop-kms.example",
  rapports: "rokhaya.diallo@scoop-kms.example",
} as const;
export type Role = keyof typeof ROLES;

/**
 * Attend que le client Angular ait hydraté (pas seulement le HTML SSR).
 * Marqueurs Analog/Angular 22 : `__jsaction_fns` ou `__ngDebugHydrationInfo__`.
 */
export async function hydrated(page: Page) {
  await page.waitForFunction(() => {
    const el = document.querySelector("#email, #otp, #password");
    if (!el) return false;
    return Object.keys(el).some(
      (k) => k === "__jsaction_fns" || k.startsWith("__ngDebugHydrationInfo"),
    );
  });
}

/**
 * Connexion complète : e-mail et mot de passe d'un compte de démonstration, puis code à 6 chiffres.
 * En démonstration, le code est affiché dans l'encadré « courriel simulé ».
 */
/** Saisit les identifiants d'un compte de démonstration sur la page de connexion. */
export async function fillCredentials(page: Page, role: Role = "admin") {
  await page.locator("#email").fill(ROLES[role]);
  await page.locator("#password").fill(DEMO_PASSWORD);
}

export async function signIn(page: Page, role: Role = "admin") {
  await page.goto("/login");
  await hydrated(page);
  await fillCredentials(page, role);
  await page.getByRole("button", { name: "Se connecter" }).click();
  await expect(page.getByText("Vérification en deux étapes")).toBeVisible();
  await hydrated(page);
  const code = (await page.locator("body").innerText()).match(/Code reçu : (\d{6})/)?.[1];
  expect(code, "le code simulé doit être affiché").toBeTruthy();
  await page.locator("#otp").click();
  await page.keyboard.type(code!);
  // Après connexion, chaque rôle arrive sur son tableau de bord : /dashboard/<rôle>.
  await page.waitForURL((url) => url.pathname === `/dashboard/${role}`);
  await expect(page.getByRole("heading", { name: "Tableau de bord" })).toBeVisible();
}

/** Navigation interne sans recharger : conserve le store de démonstration en mémoire. */
export async function goto(page: Page, path: string) {
  await page.evaluate((p) => {
    window.history.pushState({}, "", p);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, path);
  await page.waitForURL(
    (url) => url.pathname + url.search === path || url.pathname === path.split("?")[0],
  );
}

/** Message temporaire (toast) : zone Notifications uniquement. */
export function toast(page: Page, text: string | RegExp) {
  return page.getByRole("region", { name: /Notifications/ }).getByText(text);
}

/** Ouvre une section repliée du menu latéral si elle ne l'est pas déjà. */
export async function openNavGroup(page: Page, name: string) {
  const header = page
    .getByRole("navigation")
    .first()
    .getByRole("button", { name: new RegExp(`^${name}`) });
  if ((await header.getAttribute("aria-expanded")) === "false") await header.click();
  await expect(header).toHaveAttribute("aria-expanded", "true");
}

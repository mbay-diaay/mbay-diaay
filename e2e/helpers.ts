import { expect, type Page } from "@playwright/test";

/** Comptes de démonstration (web-angular/src/lib/auth/demo-service.ts) : libellé du bouton sur la page de connexion. */
export const ROLES = {
  admin: "Administrateur CRADESC",
  gestionnaire: "Gestionnaire de SCOOP",
  faitiere: "Faîtière (USCN)",
  technicien: "Technicien",
  representant: "Représentant de SCOOP",
  secretaire: "Secrétaire de SCOOP",
  ventes: "Responsable des ventes",
  rapports: "Responsable des rapports",
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
 * Connexion complète : compte de démonstration, mot de passe, puis code à 6 chiffres.
 * En démonstration, le code est affiché dans l'encadré « courriel simulé ».
 */
export async function signIn(page: Page, role: Role = "admin") {
  await page.goto("/login");
  await hydrated(page);
  await page.locator("#demo-accounts ~ ul").getByRole("button", { name: ROLES[role] }).click();
  await page.getByRole("button", { name: "Se connecter" }).click();
  await expect(page.getByText("Vérification en deux étapes")).toBeVisible();
  await hydrated(page);
  const code = (await page.locator("body").innerText()).match(/Code reçu : (\d{6})/)?.[1];
  expect(code, "le code simulé doit être affiché").toBeTruthy();
  await page.locator("#otp").click();
  await page.keyboard.type(code!);
  await page.waitForURL((url) => url.pathname === "/");
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

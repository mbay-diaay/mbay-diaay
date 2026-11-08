/**
 * Modules M2–M5 portés en Angular mais **non déployés** tant que le flag est faux.
 * Activation progressive : `VITE_ENABLE_EXTRA_MODULES=true` (local / preview) puis
 * ouvrir les entrées dans `nav.ts` module par module.
 */
export const EXTRA_MODULES_ENABLED =
  import.meta.env["VITE_ENABLE_EXTRA_MODULES"] === "true";

/** Préfixes de routes des modules hors M1. */
export const EXTRA_MODULE_PATHS = [
  "/stocks",
  "/credits",
  "/ventes",
  "/charges",
  "/exploitation",
  "/plans",
  "/campagnes",
  "/calendriers",
  "/suivi",
  "/carte",
  "/parcelles",
] as const;

export function isExtraModulePath(pathname: string): boolean {
  const path = pathname.split("?")[0] ?? pathname;
  return EXTRA_MODULE_PATHS.some((p) => path === p || path.startsWith(`${p}/`));
}

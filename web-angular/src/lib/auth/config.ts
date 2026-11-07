/**
 * Mode démonstration : comptes fictifs, courriel simulé affiché à l'écran, profils interchangeables.
 * Fermé par défaut : seule la valeur explicite `VITE_DEMO_MODE=true` l'ouvre dans un build publié.
 * En développement local (serveur Vite) il reste ouvert quand la variable est absente, pour travailler sans réglage.
 * `VITE_DEMO_MODE=false` : le service de démonstration refuse toute connexion.
 */
export function resolveDemoMode(value: unknown, development: boolean): boolean {
  if (value === "true") return true;
  if (value === "false") return false;
  return development;
}

export const DEMO_MODE = resolveDemoMode(import.meta.env["VITE_DEMO_MODE"], import.meta.env.DEV);

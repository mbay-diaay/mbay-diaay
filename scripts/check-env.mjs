#!/usr/bin/env node
/**
 * Garde-fou de build : un déploiement de production doit choisir explicitement le mode démonstration.
 * Sans `VITE_DEMO_MODE`, l'application publiée est fermée (aucune connexion possible) ; mieux vaut
 * échouer ici que publier un site inutilisable, ou ouvert par oubli.
 *
 * Source de vérité : `.env.production` (versionné). Ne pas compter sur `vercel.json` → `env`
 * (runtime des fonctions uniquement, pas le build). Hors production (CI locale sans VERCEL_ENV,
 * poste de dev), aucune exigence.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const ENV_PRODUCTION_FILE = ".env.production";

/** Charge un fichier .env sans écraser les variables déjà présentes dans process.env. */
function loadEnvFile(relativePath) {
  const full = resolve(root, relativePath);
  if (!existsSync(full)) return false;
  for (const raw of readFileSync(full, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
  return true;
}

const isProduction = process.env.VERCEL_ENV === "production";

if (isProduction) {
  // Aligné sur Vite (mode production) : .env puis .env.production ; process.env gagne.
  loadEnvFile(".env");
  loadEnvFile(ENV_PRODUCTION_FILE);
}

const value = process.env.VITE_DEMO_MODE;

if (isProduction && value !== "true" && value !== "false") {
  const filePath = resolve(root, ENV_PRODUCTION_FILE);
  const fileHint = existsSync(filePath)
    ? `le fichier ${ENV_PRODUCTION_FILE} est présent mais VITE_DEMO_MODE y est absent ou invalide`
    : `créez ${ENV_PRODUCTION_FILE} avec VITE_DEMO_MODE=true|false (versionné ; voir .gitignore)`;
  console.error(
    `check:env ÉCHEC : VITE_DEMO_MODE doit valoir "true" ou "false" pour un déploiement de production (valeur lue : ${
      value === undefined ? "absente" : JSON.stringify(value)
    }).\n` +
      `  - "true" : prototype avec données fictives (comptes de démonstration, courriel simulé affichés).\n` +
      `  - "false" : application fermée tant que l'API réelle n'est pas branchée.\n` +
      `  Correction : ${fileHint}.\n` +
      `  Ne pas compter sur vercel.json "env" (runtime seulement). Ni uniquement sur le tableau de bord Vercel.`,
  );
  process.exit(1);
}
if (isProduction && value === "true") {
  console.warn("check:env : mode démonstration ACTIF en production (données fictives uniquement).");
}
console.log("check:env OK");

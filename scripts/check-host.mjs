#!/usr/bin/env node
/**
 * Garde-fou de build : le front Angular est un site statique (aucun rendu serveur) et le mode démonstration
 * doit être déclaré explicitement dans `.env.production`.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const vite = readFileSync(resolve(root, "vite.config.ts"), "utf8");
const envProductionPath = resolve(root, ".env.production");
const errors = [];

// Angular (Analog) : `analog({ ssr: false })` produit un site statique dans dist/client.
// L'archive React (TanStack Start) garde son serveur : on ne contrôle alors que `.env.production`.
const isAnalog = /analog\(/.test(vite);
if (isAnalog && !/analog\(\s*\{[^}]*ssr:\s*false/.test(vite)) {
  errors.push("vite.config.ts : le front doit être statique, avec analog({ ssr: false }).");
}

if (!existsSync(envProductionPath)) {
  errors.push(".env.production manquant : définissez VITE_DEMO_MODE=true|false (lu par Vite au build).");
} else if (!/^\s*VITE_DEMO_MODE\s*=\s*(true|false)\s*$/m.test(readFileSync(envProductionPath, "utf8"))) {
  errors.push(".env.production doit contenir VITE_DEMO_MODE=true ou VITE_DEMO_MODE=false.");
}

if (errors.length) {
  console.error("check:host — configuration de build en échec :\n");
  for (const e of errors) console.error(`  • ${e}`);
  console.error("\nVoir docs/DEPLOY_FRONT.md.");
  process.exit(1);
}

console.log(`check:host OK — ${isAnalog ? "site statique (ssr: false)" : "archive React"}, .env.production valide.`);

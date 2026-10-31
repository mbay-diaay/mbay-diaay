#!/usr/bin/env node
/**
 * Garde-fou : le preset Nitro doit correspondre à l'hébergeur déclaré.
 * Évite l'erreur Vercel STATIC_BUILD_NO_OUT_DIR (attente de "dist" alors
 * que TanStack Start + Nitro sort vers .vercel/output ou .output).
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const vitePath = resolve(root, "vite.config.ts");
const vercelPath = resolve(root, "vercel.json");
const envProductionPath = resolve(root, ".env.production");

const vite = readFileSync(vitePath, "utf8");
const hasVercelJson = existsSync(vercelPath);
const presetMatch = vite.match(/nitro\(\s*\{[^}]*preset:\s*["']([^"']+)["']/);
const preset = presetMatch?.[1] ?? null;

const errors = [];

if (hasVercelJson) {
  if (preset !== "vercel") {
    errors.push(
      `vercel.json est présent, mais le preset Nitro est "${preset ?? "(absent)"}". Attendu : "vercel".`,
    );
  }
  const vercelRaw = readFileSync(vercelPath, "utf8");
  if (/outputDirectory|["']dist["']/.test(vercelRaw)) {
    errors.push(
      `vercel.json ne doit pas forcer outputDirectory/dist : TanStack Start + Nitro produit .vercel/output.`,
    );
  }
  // vercel.json "env" = runtime des fonctions seulement ; le build lit .env.production.
  if (!existsSync(envProductionPath)) {
    errors.push(
      `.env.production manquant : définissez VITE_DEMO_MODE=true|false (source de vérité du build Vercel ; pas vercel.json env).`,
    );
  } else {
    const demoMatch = readFileSync(envProductionPath, "utf8").match(
      /^\s*VITE_DEMO_MODE\s*=\s*(true|false)\s*$/m,
    );
    if (!demoMatch) {
      errors.push(
        `.env.production doit contenir VITE_DEMO_MODE=true ou VITE_DEMO_MODE=false (lu par Vite et scripts/check-env.mjs au build).`,
      );
    }
  }
} else if (preset === "vercel") {
  errors.push(
    `Preset Nitro "vercel" sans vercel.json : ajoutez vercel.json (framework tanstack-start) ou changez le preset.`,
  );
}

const activeCloudflare = /nitro\(\s*\{[^}]*preset:\s*["']cloudflare[^"']*["']/.test(vite);
if (activeCloudflare && hasVercelJson) {
  errors.push(
    `Preset cloudflare actif incompatible avec un déploiement Vercel (sortie .output, pas .vercel/output).`,
  );
}

if (errors.length) {
  console.error("check:host — alignement hébergeur / build en échec :\n");
  for (const e of errors) console.error(`  • ${e}`);
  console.error(
    "\nVoir docs/DEVELOPPEMENT.md (livraison continue) et AGENTS.md (règle hébergement).",
  );
  process.exit(1);
}

console.log(
  `check:host OK — preset Nitro "${preset}", vercel.json ${hasVercelJson ? "présent" : "absent"}.`,
);

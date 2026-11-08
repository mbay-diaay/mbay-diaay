#!/usr/bin/env node
/**
 * Après build Nitro/Vercel : les `/assets/*` absents ne doivent pas tomber
 * sur le fallback SPA (HTML) — sinon le navigateur affiche une erreur MIME
 * sur les chunks hashés d'un ancien déploiement.
 *
 * Ordre des routes : filesystem → 404 assets → __fallback.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const configPath = resolve(process.cwd(), ".vercel/output/config.json");
if (!existsSync(configPath)) {
  console.error("patch-vercel-assets-404: .vercel/output/config.json introuvable (build d'abord).");
  process.exit(1);
}

const config = JSON.parse(readFileSync(configPath, "utf8"));
const routes = Array.isArray(config.routes) ? config.routes : [];
const asset404 = { src: "/assets/(.*)", status: 404 };
const already = routes.some(
  (r) => r && r.src === asset404.src && r.status === 404 && !r.dest && !r.handle,
);

if (!already) {
  const fallbackIdx = routes.findIndex(
    (r) => r && r.src === "/(.*)" && typeof r.dest === "string" && r.dest.includes("__fallback"),
  );
  if (fallbackIdx >= 0) routes.splice(fallbackIdx, 0, asset404);
  else routes.push(asset404);
  config.routes = routes;
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
  console.log("patch-vercel-assets-404: route 404 /assets/(.*) insérée avant le fallback SPA.");
} else {
  console.log("patch-vercel-assets-404: déjà présent, rien à faire.");
}

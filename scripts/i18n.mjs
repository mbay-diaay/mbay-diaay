// Outils du bilingue (chapitre 6 de docs/DEVELOPPEMENT.md).
//   node scripts/i18n.mjs coverage    couverture du wolof par rapport au français
//   node scripts/i18n.mjs inventory   textes visibles encore écrits en dur, par fichier (--md : tableau Markdown)
// Lecture seule : ce script ne modifie ni fr.ts ni wo.ts et ne produit aucune traduction.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const ROOT = new URL("..", import.meta.url).pathname;

/** Charge un module TypeScript du dossier i18n ; les imports relatifs sont résolus entre eux. */
const cache = new Map();
const load = (file) => {
  const path = join(ROOT, file);
  if (cache.has(path)) return cache.get(path);
  const src = readFileSync(path, "utf8");
  const out = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const mod = { exports: {} };
  const req = (spec) => {
    if (!spec.startsWith(".")) return {};
    const target = join(dirname(path), spec);
    return load(relative(ROOT, target) + ".ts");
  };
  new Function("module", "exports", "require", out)(mod, mod.exports, req);
  cache.set(path, mod.exports);
  return mod.exports;
};

const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

function coverage() {
  const { fr } = load("src/lib/i18n/fr.ts");
  const { wo, REVIEWED_WO, TO_TRANSLATE } = load("src/lib/i18n/wo.ts");
  const keys = Object.keys(fr);
  const reviewed = keys.filter((k) => REVIEWED_WO.includes(k));
  const marker = keys.filter((k) => !REVIEWED_WO.includes(k) && /^\[.*\]$/.test(wo[k] ?? ""));
  const todo = keys.filter((k) => TO_TRANSLATE.includes(k));
  const missing = keys.filter((k) => !(k in wo) && !TO_TRANSLATE.includes(k));
  const pct = (n) => `${((100 * n) / (keys.length || 1)).toFixed(1)} %`;
  console.log(`Clés françaises : ${keys.length}`);
  console.log(`  relues en wolof     : ${reviewed.length} (${pct(reviewed.length)})`);
  console.log(`  texte repère        : ${marker.length} (${pct(marker.length)})`);
  console.log(`  marquées à traduire : ${todo.length}`);
  console.log(`  sans entrée         : ${missing.length}`);
  const byScreen = new Map();
  for (const k of keys) {
    const s = k.split(".")[0];
    const e = byScreen.get(s) ?? { total: 0, reviewed: 0 };
    e.total++;
    if (REVIEWED_WO.includes(k)) e.reviewed++;
    byScreen.set(s, e);
  }
  console.log("\nPar écran (relues / total) :");
  for (const [s, e] of [...byScreen].sort())
    console.log(`  ${s.padEnd(16)} ${e.reviewed} / ${e.total}`);
  if (missing.length) process.exitCode = 1;
}

const ATTRS = new Set([
  "title",
  "placeholder",
  "aria-label",
  "label",
  "description",
  "alt",
  "eyebrow",
  "submitLabel",
  "cancelLabel",
  "hint",
  "error",
  "footerNote",
]);
const WORD = /[A-Za-zÀ-ÿ]{3,}/;

function inventory(md) {
  const files = ["src/routes", "src/components"]
    .flatMap((d) => walk(join(ROOT, d)))
    .filter((f) => f.endsWith(".tsx") && !f.includes("/components/ui/"));
  const rows = [];
  for (const f of files) {
    const sf = ts.createSourceFile(
      f,
      readFileSync(f, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    let texts = 0;
    let attrs = 0;
    let toasts = 0;
    const visit = (n) => {
      if (ts.isJsxText(n) && WORD.test(n.text)) texts++;
      else if (ts.isJsxAttribute(n) && n.initializer && ts.isStringLiteral(n.initializer)) {
        if (ATTRS.has(n.name.getText(sf)) && WORD.test(n.initializer.text)) attrs++;
      } else if (
        ts.isCallExpression(n) &&
        /^toast\.(success|error|info|warning|message)$/.test(n.expression.getText(sf)) &&
        n.arguments[0] &&
        ts.isStringLiteralLike(n.arguments[0])
      )
        toasts++;
      ts.forEachChild(n, visit);
    };
    visit(sf);
    if (texts + attrs + toasts) rows.push({ file: relative(ROOT, f), texts, attrs, toasts });
  }
  rows.sort((a, b) => b.texts + b.attrs + b.toasts - (a.texts + a.attrs + a.toasts));
  const total = rows.reduce((s, r) => s + r.texts + r.attrs + r.toasts, 0);
  if (md) {
    console.log("| Fichier | Textes | Attributs | Messages |\n|---|---:|---:|---:|");
    for (const r of rows) console.log(`| ${r.file} | ${r.texts} | ${r.attrs} | ${r.toasts} |`);
    console.log(`| **Total (${rows.length} fichiers)** | | | **${total}** |`);
  } else {
    for (const r of rows)
      console.log(
        `${String(r.texts + r.attrs + r.toasts).padStart(4)}  ${r.file}  (texte ${r.texts}, attributs ${r.attrs}, messages ${r.toasts})`,
      );
    console.log(`\n${total} textes en dur dans ${rows.length} fichiers.`);
  }
}

const [cmd, flag] = process.argv.slice(2);
if (cmd === "coverage") coverage();
else if (cmd === "inventory") inventory(flag === "--md");
else {
  console.error("Usage : node scripts/i18n.mjs coverage | inventory [--md]");
  process.exitCode = 2;
}

#!/usr/bin/env node
// tokens/tokens.json → css/tokens.css et css/theme.css.
//
// Les deux feuilles sont générées et versionnées : un consommateur les importe sans étape de
// construction, et la CI vérifie qu'elles correspondent au JSON (`--check`). Éditer une
// valeur, c'est éditer le JSON puis relancer ce script ; jamais les CSS directement.
//
//   node scripts/build-tokens.mjs           # régénère
//   node scripts/build-tokens.mjs --check   # échoue si les CSS ont dérivé du JSON

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "tokens/tokens.json"), "utf8"));
const check = process.argv.includes("--check");

const HEADER = "/* GÉNÉRÉ par scripts/build-tokens.mjs depuis tokens/tokens.json — ne pas éditer à la main. */\n";

/** Résout une référence `{color.neutral.200}` vers sa valeur. */
function resolve(value) {
  if (typeof value !== "string") return value;
  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value;
  const node = match[1].split(".").reduce((acc, key) => acc?.[key], tokens);
  if (node === undefined) throw new Error(`référence introuvable : ${value}`);
  return resolve(node.$value ?? node);
}

const family = (list) => list.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(", ");
const leaves = (group) => Object.entries(group).filter(([k]) => !k.startsWith("$"));

// --- tokens.css : les variables brutes, préfixées `--varga-`, claires et sombres ---------------
const semanticBlock = (mode) =>
  leaves(tokens.semantic[mode])
    .map(([name, value]) => `  --varga-${name}: ${resolve(value)};`)
    .join("\n");

const scalar = [];
for (const [name, value] of leaves(tokens.color.neutral)) scalar.push(`  --varga-neutral-${name}: ${value.$value};`);
scalar.push(`  --varga-font-text: ${family(tokens.font.family.text.$value)};`);
scalar.push(`  --varga-font-display: ${family(tokens.font.family.display.$value)};`);
for (const [name, value] of leaves(tokens.font.size)) scalar.push(`  --varga-text-${name}: ${value.$value};`);
for (const [name, value] of leaves(tokens.font.leading)) scalar.push(`  --varga-leading-${name}: ${value.$value};`);
for (const [name, value] of leaves(tokens.font.tracking)) scalar.push(`  --varga-tracking-${name}: ${value.$value};`);
for (const [name, value] of leaves(tokens.space)) scalar.push(`  --varga-space-${name}: ${value.$value};`);
for (const [name, value] of leaves(tokens.border)) scalar.push(`  --varga-border-${name}: ${value.$value};`);
for (const [name, value] of leaves(tokens.motion.duration)) scalar.push(`  --varga-duration-${name}: ${value.$value};`);
const [a, b, c, d] = tokens.motion.easing.standard.$value;
scalar.push(`  --varga-easing: cubic-bezier(${a}, ${b}, ${c}, ${d});`);
scalar.push(`  --varga-shadow-hover: ${tokens.shadow.hover.$value};`);

const tokensCss = `${HEADER}
:root {
${scalar.join("\n")}

${semanticBlock("light")}
}

/* Sombre explicite : \`.dark\` sur <html>, ou \`data-theme="dark"\`. */
:root.dark,
:root[data-theme="dark"] {
  color-scheme: dark;
${semanticBlock("dark")}
}

/* Sombre suivant le système, sauf si la page a choisi le clair. */
@media (prefers-color-scheme: dark) {
  :root:not(.light):not([data-theme="light"]) {
    color-scheme: dark;
${semanticBlock("dark").replace(/^/gm, "  ")}
  }
}
`;

// --- theme.css : les mêmes rôles, exposés comme utilitaires Tailwind 4 ------------------------
// `@theme inline` : les utilitaires référencent la variable et non sa valeur, donc la bascule
// clair/sombre se fait à l'exécution, sans reconstruire la feuille.
const colorRoles = leaves(tokens.semantic.light).map(([name]) => `  --color-${name}: var(--varga-${name});`);
const neutrals = leaves(tokens.color.neutral).map(([name]) => `  --color-neutral-${name}: var(--varga-neutral-${name});`);
const sizes = leaves(tokens.font.size).map(([name]) => `  --text-${name}: var(--varga-text-${name});`);
// Chaque rayon de Tailwind ramené à zéro : un `rounded-lg` écrit dans une application reste
// carré. L'identité ne dépend pas de la discipline de chaque page.
const radii = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"].map((r) => `  --radius-${r}: 0;`);

const themeCss = `${HEADER}
@theme inline {
${colorRoles.join("\n")}
${neutrals.join("\n")}

  --font-sans: var(--varga-font-text);
  --font-mono: var(--varga-font-text);
  --font-display: var(--varga-font-display);
${sizes.join("\n")}

  --radius: 0;
${radii.join("\n")}

  --shadow-hover: var(--varga-shadow-hover);
  --ease-standard: var(--varga-easing);
}
`;

const outputs = [
  ["css/tokens.css", tokensCss],
  ["css/theme.css", themeCss],
];

let drift = false;
for (const [path, content] of outputs) {
  const full = join(root, path);
  if (check) {
    let current = "";
    try {
      current = readFileSync(full, "utf8");
    } catch {}
    if (current !== content) {
      console.error(`✗ ${path} a dérivé de tokens/tokens.json — relancer : node scripts/build-tokens.mjs`);
      drift = true;
    }
  } else {
    writeFileSync(full, content);
    console.log(`✓ ${path}`);
  }
}
if (drift) process.exit(1);
if (check) console.log("✓ les feuilles générées correspondent aux jetons");

#!/usr/bin/env node
// Construit la vitrine statique : docs/index.html + docs/showcase.css (+ les polices).
//
// Le HTML est rendu depuis les vrais composants (renderToStaticMarkup), et la feuille par la
// CLI Tailwind depuis css/varga.css : la vitrine montre exactement ce qu'un consommateur
// obtiendra, pas une copie qui pourrait dériver.

import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "docs");
const tmp = join(root, ".showcase");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

// 1. Le rendu React → HTML.
await build({
  entryPoints: [join(root, "docs/render.tsx")],
  bundle: true,
  platform: "node",
  format: "esm",
  jsx: "automatic",
  outfile: join(tmp, "render.mjs"),
  external: ["react", "react-dom", "tailwind-merge"],
  logLevel: "warning",
});
const { render } = await import(pathToFileURL(join(tmp, "render.mjs")).href);
const body = render();

// 2. La feuille : le point d'entrée public, plus une source qui couvre la vitrine.
const entry = join(tmp, "entry.css");
writeFileSync(
  entry,
  `@import "tailwindcss";\n@import "../css/varga.css";\n@source "../src";\n@source "../docs/showcase.tsx";\n`,
);
execFileSync(join(root, "node_modules/.bin/tailwindcss"), ["-i", entry, "-o", join(out, "showcase.css"), "--minify"], {
  stdio: "inherit",
  cwd: root,
});

// 3. Les polices, référencées en `../fonts/` depuis la feuille : on les copie à côté.
cpSync(join(root, "fonts"), join(out, "fonts"), { recursive: true });

writeFileSync(
  join(out, "index.html"),
  `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Design system · Varga Foundation</title>
<meta name="description" content="Jetons, feuilles Tailwind 4 et composants React de la Varga Foundation.">
<link rel="stylesheet" href="showcase.css">
</head>
<body>
${body}
</body>
</html>
`,
);
rmSync(tmp, { recursive: true, force: true });
console.log("✓ docs/index.html");

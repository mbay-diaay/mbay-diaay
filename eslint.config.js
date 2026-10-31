import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist",
      ".output",
      ".vinxi",
      ".wrangler",
      ".vercel",
      ".nitro",
      ".tanstack",
      "coverage",
      "data",
      "tools",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // Composants shadcn/ui : ils exportent aussi leurs variantes (buttonVariants, useFormField…), convention du générateur.
    files: ["src/components/ui/**/*.tsx"],
    rules: { "react-refresh/only-export-components": "off" },
  },
  eslintPluginPrettier,
  {
    // Texte visible : pas de tiret cadratin ni demi-cadratin (voir docs/DEVELOPPEMENT.md, chapitre 3).
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/test/**", "src/routeTree.gen.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/[\u2013\u2014]/]",
          message:
            "Tiret typographique interdit dans le texte visible : utilisez une virgule, deux-points ou un point.",
        },
        {
          selector: "JSXText[value=/[\u2013\u2014]/]",
          message:
            "Tiret typographique interdit dans le texte visible : utilisez une virgule, deux-points ou un point.",
        },
        {
          selector: "TemplateElement[value.raw=/[\u2013\u2014]/]",
          message:
            "Tiret typographique interdit dans le texte visible : utilisez une virgule, deux-points ou un point.",
        },
      ],
    },
  },
);

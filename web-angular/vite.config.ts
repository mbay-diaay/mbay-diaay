/// <reference types="vitest" />

import { defineConfig } from "vite";
import analog from "@analogjs/platform";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ["es2022"],
  },
  // Évite les reloads parasites quand un `pnpm build` écrit `.vercel/output` à côté du dev server.
  server: {
    watch: {
      ignored: ["**/.vercel/**", "**/dist/**"],
    },
  },
  resolve: {
    mainFields: ["module"],
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    analog({
      nitro: {
        preset: "vercel",
        // Cookie __vdpl quand Skew Protection est activé sur le projet Vercel.
        vercel: {
          skewProtection: true,
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test-setup.ts"],
    include: ["**/*.spec.ts"],
    reporters: ["default"],
  },
}));

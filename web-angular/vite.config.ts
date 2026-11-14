/// <reference types="vitest" />

import { defineConfig, type Plugin } from "vite";
import analog from "@analogjs/platform";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Développement seulement : la liste des pages d'Analog (`@analogjs/router`) est servie depuis `node_modules`
 * avec un cache « immutable » d'un an, et son URL ne change pas quand on ajoute ou renomme une page. Le
 * navigateur gardait alors l'ancienne liste (nouvelle page renvoyée vers l'accueil). On force la revalidation.
 */
function analogRoutesNoCache(): Plugin {
  return {
    name: "analog-routes-no-cache",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (request.url?.includes("@analogjs/router")) {
          const setHeader = response.setHeader.bind(response);
          response.setHeader = (name, value) =>
            setHeader(name, name.toLowerCase() === "cache-control" ? "no-cache" : value);
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ["es2022"],
  },
  // Évite les reloads parasites quand un `pnpm build` écrit `dist/` à côté du dev server.
  server: {
    watch: {
      ignored: ["**/dist/**"],
    },
  },
  resolve: {
    mainFields: ["module"],
  },
  plugins: [
    analogRoutesNoCache(),
    tsconfigPaths(),
    tailwindcss(),
    // Site statique (aucun rendu serveur) : application derrière connexion, rien à référencer.
    analog({ ssr: false }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test-setup.ts"],
    include: ["**/*.spec.ts"],
    reporters: ["default"],
  },
}));

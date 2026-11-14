# Image de production du front : build Vite statique servi par nginx.
# Contexte de build : le dossier web-angular/.
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# VITE_API_URL et VITE_DEMO_MODE sont lues dans .env.production (ou passées en ARG).
RUN pnpm build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/client /usr/share/nginx/html
EXPOSE 80

---
name: Mbay Diaay
description: Module 1 administratif SCOOP / CRADESC — Operate dense, marron charte
colors:
  brand-900: "#2F1D17"
  brand-800: "#3D281F"
  brand-700: "#4E3228"
  brand-600: "#664336"
  brand-100: "#EBE0DC"
  accent-600: "#394076"
  accent-800: "#1E2344"
  accent-100: "#D4D7EA"
  mist-500: "#959DBB"
  taupe-500: "#A69895"
  mauve-500: "#A199A1"
  neutral-0: "#FFFFFF"
  neutral-50: "#F8F6F3"
  neutral-200: "#DDD6D0"
  neutral-400: "#8F857E"
  neutral-600: "#5C524C"
  neutral-800: "#453A35"
  neutral-900: "#2A1F1B"
  status-success: "#2E7D32"
  status-warning: "#B26A00"
  status-danger: "#B3261E"
  status-info: "#1F5F99"
typography:
  body:
    fontFamily: "Inter, \"Noto Sans\", system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  title:
    fontFamily: "Inter, \"Noto Sans\", system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.25
  headline:
    fontFamily: "Inter, \"Noto Sans\", system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.2
  label:
    fontFamily: "Inter, \"Noto Sans\", system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "12px"
  pill: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  touch: "48px"
components:
  button-primary:
    backgroundColor: "{colors.brand-700}"
    textColor: "{colors.neutral-0}"
    rounded: "{rounded.md}"
    height: "{spacing.touch}"
  button-primary-hover:
    backgroundColor: "{colors.brand-600}"
    textColor: "{colors.neutral-0}"
  surface-card:
    backgroundColor: "{colors.neutral-0}"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.md}"
    padding: "16px"
  sidebar:
    backgroundColor: "{colors.brand-700}"
    textColor: "{colors.brand-100}"
  input:
    backgroundColor: "{colors.neutral-0}"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.sm}"
    height: "{spacing.touch}"
---

# Design System: Mbay Diaay

## Overview

**Creative North Star: "Le registre des Niayes"**

Interface Operate pour le Module 1 administratif : dense, sobre, lisible sur bureau et mobile web. L’identité vient du marron CRADESC et d’un indigo d’accent — pas d’effets marketing. Les écrans Angular (`web-angular/`) sont la référence visuelle et fonctionnelle.

Profondeur par surfaces tonales (`surface`, sidebar sombre) plutôt que par ombres fortes. Chiffres en `tabular-nums`. Pastilles de qualité : couleur **et** libellé.

**Key Characteristics:**
- Marron brand `#4E3228` comme signal primaire (CTA, monogramme, chart-1)
- Fond ivoire chaud `#F8F6F3`, cartes blanches, sidebar / panneau auth en marron `#4E3228`
- Échelle type bornée à `2xl` (32px) — pas de `text-3xl` hors tokens
- Charts uniquement via `--chart-1` / `--chart-2` (jamais oklch inventé)

## Colors

Palette CRADESC (primitive dans `docs/prd/design-tokens.json`) → semantic → component dans `styles.css`.

### Primary
- **CRADESC Marron** (`#4E3228`): boutons primaires, liens forts, `--chart-1`, monogramme sidebar (via soft / brand-600 hover).
- **Marron hover** (`#664336`): états hover primary.
- **Marron soft** (`#EBE0DC`): pastilles icônes, `bg-primary-soft`.

### Secondary
- **Indigo CRADESC** (`#394076`): accent unique, `--chart-2` (ex. série femmes), accents UI.
- **Indigo text** (`#1E2344`) / **soft** (`#D4D7EA`): texte accent et fonds doux.

### Secondaires d'illustration (charte CRADESC)
La charte compte **5 couleurs officielles** : le marron `#4E3228`, l'indigo `#394076` et trois teintes reprises du laurier du logo CRADESC. Chacune a des variantes 100 / 300 / 500 (officielle) / 700.
- **Bleu brume** (`#959DBB`, `--p-mist-*`) : haut du laurier ; soleil et halos des illustrations.
- **Taupe** (`#A69895`, `--p-taupe-*`) : bas du laurier ; dunes, champs, texte secondaire sur marron (`taupe-300`).
- **Mauve gris** (`#A199A1`, `--p-mauve-*`) : dunes lointaines et champs.

Ces trois teintes servent aux **illustrations et surfaces décoratives** (tokens `--auth-*`), jamais aux CTA ni aux graphiques de données (The Marron Rule reste valable).

### Logos
- **Mbay Diaay** (plateforme, marque principale) : composant `ui-brand-logo`. Marque provisoire SVG (pousse + soleil indigo) tant que le logo officiel n'est pas fourni ; renseigner `BRAND.logo` / `BRAND.logoOnDark` dans `web-angular/src/config/brand.ts` pour basculer partout.
- **CRADESC** (porteur) : `public/brand/cradesc-logo.png` (complet) et `cradesc-embleme.png` (sans sous-titre). PNG transparent repris de cradesc.org ; **sur fond clair uniquement** (lettrage marron). Toujours en second plan, après la marque Mbay Diaay.

### Neutral
- **Ivoire chaud** (`#F8F6F3`): fond page (teinte marron, plus d’olive).
- **Blanc** (`#FFFFFF`): surfaces / cartes.
- **Bordure** (`#DDD6D0`) / **forte** (`#8F857E`).
- **Texte muted** (`#5C524C`) / **texte** (`#2A1F1B` brun-noir).
- **Neutral-800** (`#453A35`): mix placeholders.

**The Warm Neutral Rule.** Les neutres portent une teinte CRADESC. L’olive `#1F2A24` n’est plus utilisée pour le chrome ni l’encre UI.

### Status
Success / warning / danger / info — paires bg/fg dédiées ; qualité et alertes carte s’y branchent.

### Named Rules
**The Marron Rule.** Le vert « succès » et les verts familles cultures ne remplacent jamais le marron sur CTA, shell ou charts dashboard. Charts dashboard = `--chart-1` (marron) + `--chart-2` (indigo) uniquement.

**The Token Rule.** Aucune couleur en dur (`oklch`, hex) dans les pages ; uniquement variables CSS / classes sémantiques.

## Typography

**Display / Body Font:** Inter, "Noto Sans", system-ui  
**Character:** neutre administratif, semi-bold pour titres, chiffres tabulaires.

### Hierarchy
- **Headline** (600, 32px / `2xl`): max de l’échelle token — login brand panel, pas KPI dashboard.
- **Title** (600, 24px / `text-2xl`): titres de page (`ui-page-header`).
- **Body** (400, 16px): contenu.
- **Label / Eyebrow** (600, 12px, uppercase tracking): `eyebrow`, métadonnées.

### Named Rules
**The Cap Rule.** Ne pas utiliser `text-3xl` (ou tailles hors tokens) pour les KPI : `text-xl` → `sm:text-2xl` max, comme React.

## Layout

- Shell : sidebar fixe desktop, panneau mobile ; contenu scrollable.
- Grilles densés : `gap-3` / `gap-4`, surfaces `p-4` / `p-5`.
- Breakpoints Tailwind standards (`sm` 640, `md` 768, `xl` 1280).
- Touch min 48px (`h-touch` / `--size-touch-min`).
- Producteurs : sheet filtres `< md`, panneau inline `md+`.

## Elevation & Depth

Système **plat avec surfaces** : `.surface` = fond blanc + bordure légère, pas d’ombres multi-couches. Sidebar = plan sombre distinct. Toasts / sheets = animation d’entrée légère, pas de glow.

## Shapes

- Inputs / contrôles fins : radius **6px** (`sm`).
- Boutons / cartes / sheets : radius **12px** (`md`).
- Pills / avatars : `999px`.
- Pas de full-pill sur les boutons d’action principaux.

## Components

### Buttons
- Primary : fond brand-700, texte blanc, radius md, hauteur touch sur formulaires auth / actions principales.
- Hover : brand-600. Focus : ring token.

### Cards / Containers
- `.surface` : blanc, radius md, padding 16–20px.
- Todo / KPI dashboard : icône dans `bg-primary-soft` + chiffre `text-2xl`.

### Inputs / Fields
- Radius sm, bordure `border-input`, placeholder via `--sem-text-placeholder` (muted, pas égal au texte saisi).
- OTP : cases numériques alignées sous le label.

### Navigation
- Sidebar sombre, item actif accent soft, monogramme marron soft.
- Mobile : drawer / panneau ; CommandPalette ⌘K ; GlobalFilters scoop/campagne.

### Charts
- Bar / pie : femmes → `--chart-2`, hommes / série brand → `--chart-1`. Résoudre `var(--…)` côté Chart.js.

### Quality pills
- Point coloré + libellé (jamais couleur seule).

## Do's and Don'ts

### Do:
- **Do** brancher toute couleur UI sur les primitives / semantic tokens.
- **Do** utiliser `ui-page-header` (eyebrow + title + description) sur les listes et le dashboard.
- **Do** plafonner la typo KPI à l’échelle token (`2xl` max).
- **Do** garder le marron CRADESC sur primary et chart-1.

### Don't:
- **Don't** inventer des verts/oranges oklch pour les graphiques.
- **Don't** hardcoder des hex dans les templates Angular.
- **Don't** utiliser `text-3xl` hors échelle tokens.
- **Don't** traduire automatiquement le wolof.
- **Don't** autoriser `vercel.live` / toolbar dans la CSP du prototype.

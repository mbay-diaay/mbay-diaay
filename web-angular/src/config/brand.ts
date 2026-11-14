/**
 * Ressources de marque REMPLAÇABLES (INF 61 à 64).
 *
 * Charte graphique Mbay Diaay V2 (oct. 2026, « Design screen from PDF.pdf ») :
 * logo « Proposition 1 » (soleil, sillons, pousse, repère, goutte), logotype Poppins Bold.
 * Les symboles de `public/brand/` sont extraits tels quels, en vectoriel, du PDF de la charte
 * (pas redessinés). À remplacer par les fichiers officiels nommés selon la convention
 * `mbay-diaay_logo_couleur_horizontal.svg` dès leur livraison.
 *
 * Logo du porteur repris de cradesc.org (PNG transparent) et servi en local (CSP `img-src 'self'`).
 * Les textes visibles passent par l'i18n ; ici ne vivent que les données non traduisibles.
 */
export const BRAND = {
  name: "Mbay Diaay",
  /** Logotype en deux mots : couleurs distinctes selon la variante (voir `ui-brand-logo`). */
  wordmark: ["Mbay", "Diaay"] as const,
  monogram: "MD",
  tagline: "Pilotage des SCOOP",
  partners: "CRADESC",
  symbol: {
    /** Variante « Couleur » : fonds blanc ou crème. */
    color: "/brand/mbay-diaay_symbole_couleur.svg",
    /** Variante « Inverse » : fond forêt uniquement. */
    inverse: "/brand/mbay-diaay_symbole_inverse.svg",
  },
};

/** Organisation porteuse de la plateforme (coordonnées publiques de cradesc.org/contact). */
export const CRADESC = {
  acronym: "CRADESC",
  url: "https://cradesc.org",
  urlLabel: "www.cradesc.org",
  email: "contact@cradesc.org",
  phone: "33 865 05 44",
  phoneHref: "+221338650544",
  address: "Cité COSEPI, Ngor Almadies, Dakar",
  /** Logo complet avec le nom développé (sur fond clair uniquement). */
  logo: "/brand/cradesc-logo.png",
  /** Emblème sans sous-titre, lisible en petit (sur fond clair uniquement). */
  emblem: "/brand/cradesc-embleme.png",
};


export interface CreditedPhoto {
  src: string;
  author: string;
  license: string;
  source: string;
  /** Cadrage dans le panneau (object-position). */
  position: string;
}

/**
 * Diaporama de fond de la connexion : jardins maraîchers du Sénégal, lumière naturelle
 * (recommandations photo de la charte V2). Wikimedia Commons, redimensionnées (≤ 1500 px, WebP), servies en local.
 * Les crédits ne sont PAS affichés sur la connexion : À REPORTER sur la future page
 * « Mentions et crédits » (obligatoire pour CC BY et CC BY-SA ; courtoisie pour CC0 et domaine public).
 */
export const LOGIN_PHOTOS: readonly CreditedPhoto[] = [
  {
    src: "/brand/niayes-oignons.webp",
    author: "Pacocreat",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Ognons_(_s%C3%A9n%C3%A9gal_)_22.jpg",
    position: "50% 65%",
  },
  {
    src: "/brand/niayes-wakhinane.webp",
    author: "Pamgueye",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Lac_de_wakhinane_10.jpg",
    position: "40% 60%",
  },
  {
    src: "/brand/jardin-salades.webp",
    author: "Adama Diop",
    license: "Domaine public",
    source: "https://commons.wikimedia.org/wiki/File:Dans_le_jardin_de_Agnam-Goly.jpg",
    position: "50% 50%",
  },
  {
    src: "/brand/jardin-agroforesterie.webp",
    author: "treesftf",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:KedougouAgroforestry.jpg",
    position: "45% 55%",
  },
  {
    src: "/brand/champ-maraicher.webp",
    author: "Lifelame44",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:Champ_de_Khadim_Diop_14.jpg",
    position: "50% 60%",
  },
];

/**
 * Photo propre à la page de paiement des cotisations : des productrices dans une parcelle maraîchère.
 * Licence CC BY-SA : le crédit est affiché sur la photo.
 */
export const PAYMENT_PHOTO: CreditedPhoto = {
  src: "/brand/cotisation-maraichage.webp",
  author: "Habib Houndekindo",
  license: "CC BY-SA 4.0",
  source: "https://commons.wikimedia.org/wiki/File:RURAL_WOMEN_FEEDING_SENEGAL.jpg",
  position: "55% 30%",
};

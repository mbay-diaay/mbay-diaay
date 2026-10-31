/**
 * Format d'échange des données (import et export) : une feuille par entité,
 * en-têtes en français. Les synonymes permettent de lire des fichiers clients
 * qui n'utilisent pas exactement le modèle.
 */
export type EntityKey = "organisations" | "producteurs" | "parcelles";

export interface ColumnDef {
  key: string;
  label: string;
  required?: boolean;
  aliases: string[];
  hint: string;
  example: string;
}

export interface EntitySchema {
  key: EntityKey;
  sheet: string;
  label: string;
  columns: ColumnDef[];
}

export const SCHEMA: Record<EntityKey, EntitySchema> = {
  organisations: {
    key: "organisations",
    sheet: "Organisations",
    label: "Organisations",
    columns: [
      {
        key: "nom",
        label: "Nom",
        required: true,
        aliases: ["organisation", "nom organisation", "name"],
        hint: "Nom de l'organisation de base",
        example: "GIE Bokk Jom Ndimb",
      },
      {
        key: "type",
        label: "Type",
        aliases: ["type organisation", "categorie"],
        hint: "GIE, Section, Association, Groupement, Individuel ou Membre direct (vide = à qualifier)",
        example: "GIE",
      },
      {
        key: "village",
        label: "Village",
        required: true,
        aliases: ["localite", "village"],
        hint: "Village de l'organisation",
        example: "Ndimb",
      },
      {
        key: "scoop",
        label: "SCOOP",
        required: true,
        aliases: ["scoop", "cooperative", "commune"],
        hint: "Nom de la SCOOP ou de sa commune",
        example: "Keur Momar Sarr",
      },
    ],
  },
  producteurs: {
    key: "producteurs",
    sheet: "Producteurs",
    label: "Producteurs",
    columns: [
      {
        key: "code",
        label: "Code",
        aliases: ["code producteur", "identifiant", "id"],
        hint: "Identifiant unique (vide = attribué automatiquement). Un code déjà connu n'est pas réimporté.",
        example: "",
      },
      {
        key: "prenom",
        label: "Prénom",
        required: true,
        aliases: ["prenoms", "first name", "firstname"],
        hint: "",
        example: "Awa",
      },
      {
        key: "nom",
        label: "Nom",
        required: true,
        aliases: ["nom de famille", "last name", "lastname"],
        hint: "",
        example: "Diop",
      },
      {
        key: "sexe",
        label: "Sexe",
        required: true,
        aliases: ["genre", "sex"],
        hint: "F ou H (Femme / Homme)",
        example: "F",
      },
      {
        key: "age",
        label: "Âge",
        required: true,
        aliases: ["age", "ans"],
        hint: "Nombre entier entre 15 et 100",
        example: "34",
      },
      {
        key: "telephone",
        label: "Téléphone",
        aliases: ["tel", "telephone", "phone", "numero"],
        hint: "Format 77 123 45 67",
        example: "77 412 33 10",
      },
      {
        key: "cni",
        label: "CNI",
        aliases: ["numero cni", "piece identite"],
        hint: "Numéro de carte d'identité (facultatif)",
        example: "",
      },
      {
        key: "handicap",
        label: "Handicap",
        aliases: ["situation de handicap"],
        hint: "Oui / Non",
        example: "Non",
      },
      {
        key: "village",
        label: "Village",
        required: true,
        aliases: ["localite"],
        hint: "",
        example: "Ndimb",
      },
      {
        key: "scoop",
        label: "SCOOP",
        required: true,
        aliases: ["cooperative", "commune"],
        hint: "Nom de la SCOOP ou de sa commune",
        example: "Keur Momar Sarr",
      },
      {
        key: "organisation",
        label: "Organisation",
        required: true,
        aliases: ["organisation de base", "groupement", "gie"],
        hint: "Nom exact de l'organisation (créée si inconnue)",
        example: "GIE Bokk Jom Ndimb",
      },
      {
        key: "statut",
        label: "Statut",
        aliases: ["statut adhesion", "adhesion"],
        hint: "membre ou recensé (vide = recensé)",
        example: "membre",
      },
      {
        key: "culture",
        label: "Culture",
        aliases: ["culture principale", "speculation"],
        hint: "Culture principale de la campagne",
        example: "Arachide",
      },
      {
        key: "superficie",
        label: "Superficie (ha)",
        aliases: ["superficie", "surface", "superficie ha"],
        hint: "Superficie cultivée en hectares",
        example: "1,5",
      },
      {
        key: "campagne",
        label: "Campagne",
        aliases: ["saison"],
        hint: "Ex. Campagne 2026 (vide = la plus récente)",
        example: "Campagne 2026",
      },
    ],
  },
  parcelles: {
    key: "parcelles",
    sheet: "Parcelles",
    label: "Parcelles",
    columns: [
      {
        key: "code",
        label: "Code parcelle",
        aliases: ["code", "parcelle", "identifiant parcelle"],
        hint: "Vide = attribué automatiquement",
        example: "",
      },
      {
        key: "producteur",
        label: "Code producteur",
        required: true,
        aliases: ["producteur", "code du producteur"],
        hint: "Code d'un producteur existant ou présent dans la feuille Producteurs",
        example: "MD-10000",
      },
      {
        key: "culture",
        label: "Culture",
        required: true,
        aliases: ["speculation"],
        hint: "",
        example: "Arachide",
      },
      {
        key: "campagne",
        label: "Campagne",
        required: true,
        aliases: ["saison"],
        hint: "",
        example: "Campagne 2026",
      },
      {
        key: "declaree",
        label: "Surface déclarée (ha)",
        required: true,
        aliases: ["surface declaree", "superficie declaree", "surface kobo"],
        hint: "Surface déclarée à l'enquête, en hectares",
        example: "1,2",
      },
      {
        key: "mesuree",
        label: "Surface mesurée (ha)",
        aliases: ["surface mesuree", "surface gps"],
        hint: "Surface mesurée au GPS (vide = déclarée)",
        example: "1,1",
      },
      {
        key: "latitude",
        label: "Latitude",
        aliases: ["lat"],
        hint: "Centre de la parcelle (degrés décimaux)",
        example: "15,9201",
      },
      {
        key: "longitude",
        label: "Longitude",
        aliases: ["lon", "lng", "long"],
        hint: "Centre de la parcelle (degrés décimaux, négatif)",
        example: "-15,9702",
      },
      {
        key: "precision",
        label: "Précision GPS (m)",
        aliases: ["precision", "precision gps"],
        hint: "",
        example: "4",
      },
      {
        key: "contour",
        label: "Contour (GeoJSON)",
        aliases: ["contour", "geometrie", "geojson", "polygone"],
        hint: "Facultatif : polygone GeoJSON ; sinon un contour est estimé depuis le centre et la surface",
        example: "",
      },
    ],
  },
};

export const ENTITY_ORDER: EntityKey[] = ["organisations", "producteurs", "parcelles"];

/** Normalise un en-tête ou une valeur pour comparaison : minuscules, sans accents ni ponctuation. */
export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Associe chaque colonne attendue à l'index d'un en-tête du fichier (ou null). */
export function autoMap(entity: EntityKey, headers: string[]): Record<string, number | null> {
  const h = headers.map(norm);
  const out: Record<string, number | null> = {};
  const used = new Set<number>();
  for (const c of SCHEMA[entity].columns) {
    const names = [c.label, c.key, ...c.aliases].map(norm);
    const i = h.findIndex((x, idx) => !used.has(idx) && names.includes(x));
    out[c.key] = i >= 0 ? i : null;
    if (i >= 0) used.add(i);
  }
  return out;
}

/** Devine l'entité d'une feuille par son nom, puis par la couverture de ses colonnes obligatoires. */
export function detectEntity(sheetName: string, headers: string[]): EntityKey | null {
  const n = norm(sheetName);
  const byName = ENTITY_ORDER.find(
    (k) => n.includes(norm(SCHEMA[k].sheet)) || n.includes(k.slice(0, -1)),
  );
  if (byName) return byName;
  let best: EntityKey | null = null;
  let score = 0;
  for (const k of ENTITY_ORDER) {
    const m = autoMap(k, headers);
    const req = SCHEMA[k].columns.filter((c) => c.required);
    // Couverture des colonnes obligatoires d'abord ; à égalité, l'entité qui reconnaît le plus de colonnes
    // (une feuille Producteurs contient aussi Nom, Village et SCOOP, obligatoires pour une organisation).
    const s =
      req.filter((c) => m[c.key] !== null).length / req.length +
      Object.values(m).filter((v) => v !== null).length / 1000;
    if (s > score) {
      score = s;
      best = k;
    }
  }
  return score >= 0.75 ? best : null;
}

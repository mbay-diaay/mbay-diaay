/**
 * Données de démonstration déterministes (graine fixe) — remplacées par l'API
 * réelle [BE] au branchement. Aucune donnée réelle de personne.
 */
import { buildFixtureData, CAMPAIGN } from "./fixture";

export type Sex = "F" | "H";
export type Quality = "validé" | "à vérifier" | "doublon" | "invalide";
export type OrgType =
  "GIE" | "Section" | "Association" | "Groupement" | "Individuel" | "Membre direct";
export type PlotStatus = "relevée" | "validée" | "à reprendre" | "chevauchement";

export interface Scoop {
  id: string;
  name: string;
  commune: string;
  /** Code court unique (3 à 5 lettres) ; absent pour les coopératives du jeu de données d'origine. */
  code?: string;
  region?: string;
  /** Date de création ISO. */
  createdAt?: string;
  /** Une coopérative archivée garde ses données mais n'a plus d'accès actif ; jamais supprimée. */
  archived?: boolean;
}
export interface Org {
  id: string;
  name: string;
  type: OrgType | null;
  scoopId: string;
  village: string;
}
export interface CropRecord {
  campaign: string;
  crop: string;
  area: number;
}
export interface HistoryEntry {
  at: string;
  by: string;
  field: string;
  from: string;
  to: string;
}
export interface Producer {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  sex: Sex;
  age: number | null;
  handicap: boolean;
  phone: string;
  cni: string;
  village: string;
  scoopId: string;
  orgId: string;
  status: "recensé" | "membre";
  quality: Quality;
  crops: CropRecord[];
  createdAt: string;
  enumerator: string;
  history: HistoryEntry[];
  mergedInto?: string | undefined;
}
export interface Plot {
  id: string;
  code: string;
  producerId: string;
  declared: number;
  measured: number;
  gpsPrecision: number;
  status: PlotStatus;
  raw: [number, number][];
  repaired?: [number, number][] | undefined;
  crop: string;
  campaign: string;
  versions: { at: string; label: string }[];
  reason?: string | undefined;
}
export type CaseStatus =
  | "à examiner"
  | "confirmé"
  | "probable"
  | "non-doublon"
  | "erreur de saisie d'identité"
  | "non résolu"
  | "fusionné";
export interface DuplicateCase {
  id: string;
  aId: string;
  bId: string;
  score: number;
  signals: { label: string; primary: boolean }[];
  status: CaseStatus;
  comment?: string | undefined;
}
export type AlertStatus = "ouvert" | "en vérification" | "résolu" | "rejeté";
export interface DataAlert {
  id: string;
  type: string;
  severity: "faible" | "moyenne" | "élevée";
  entity: "producteur" | "parcelle";
  entityId: string;
  status: AlertStatus;
  enumerator: string;
  detail: string;
  comment?: string | undefined;
}

let seed = 20261022;
const rnd = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};
const pick = <T>(a: readonly T[]): T => a[Math.floor(rnd() * a.length)]!;
const int = (min: number, max: number) => Math.floor(rnd() * (max - min + 1)) + min;

const FX = buildFixtureData();

export const CAMPAIGNS = [CAMPAIGN] as const;
export const ORG_TYPES: OrgType[] = [
  "GIE",
  "Section",
  "Association",
  "Groupement",
  "Individuel",
  "Membre direct",
];

/** Données issues du jeu complet (`data/fixtures/`) : volumes de la base CRADESC du 05/10/2026. */
export const SCOOPS: Scoop[] = FX.scoops;
export const VILLAGES = FX.villages;
export const ORGS: Org[] = FX.orgs;
export const PRODUCERS: Producer[] = FX.producers;
export const CASES: DuplicateCase[] = FX.cases;
export const PLOTS: Plot[] = FX.plots;
export const ALERTS: DataAlert[] = FX.alerts;
/** Entrées de départ du journal d'audit : journal de la base et fusions historiques. */
export const FIXTURE_AUDIT = FX.audit;
export const FIXTURE_COUNTS = FX.counts;

const L = [
  "Diop",
  "Ndiaye",
  "Fall",
  "Sow",
  "Guèye",
  "Diallo",
  "Ba",
  "Sy",
  "Mbaye",
  "Faye",
  "Sarr",
  "Thiam",
  "Kane",
  "Seck",
  "Cissé",
  "Niang",
  "Dieng",
];
const iso = (d: number) => new Date(Date.UTC(2026, 0, 1) + d * 86400000).toISOString();

// ============ Lot 1 — demandes de correction, comptes & appareils, référentiels ============

export const CROP_FAMILIES = [
  "Bulbes",
  "Feuilles",
  "Fruits-légumes",
  "Racines",
  "Arbres fruitiers",
  "Céréales et légumineuses",
  "Autres",
] as const;
export type CropFamily = (typeof CROP_FAMILIES)[number];

export interface CropRef {
  name: string;
  family: CropFamily;
}
export const CROP_REFS: CropRef[] = FX.cropRefs.map((c) => ({
  name: c.name,
  family: (CROP_FAMILIES as readonly string[]).includes(c.family)
    ? (c.family as CropFamily)
    : "Autres",
}));
/** Cultures du référentiel, pour les filtres. */
export const CROPS: readonly string[] = CROP_REFS.map((c) => c.name);
/** Alias relevés à l'import, à rattacher à une culture du référentiel. */
export const CROP_ALIASES = ["Pastèque", "Sorgho", "Oignon local", "Chou pommé", "Patate"];

export type CorrectionStatus = "en attente" | "approuvée" | "refusée";
export interface CorrectionChange {
  field: string;
  from: string;
  to: string;
}
export interface CorrectionRequest {
  id: string;
  producerId: string;
  requester: string;
  requestedAt: string;
  motif: string;
  changes: CorrectionChange[];
  status: CorrectionStatus;
  decidedBy?: string | undefined;
  decidedAt?: string | undefined;
  decisionComment?: string | undefined;
}

export const CORRECTIONS: CorrectionRequest[] = [];
const CORR_REQUESTERS = ["Babacar Fall", "Mame Diarra Sow", "Khadim Thiam", "Ousmane Guèye"];
const CORR_MOTIFS = [
  "Le producteur a corrigé son numéro au cours de l'entretien.",
  "Âge confirmé sur la carte d'identité.",
  "Demande d'adhésion validée par le bureau du GIE.",
  "Téléphone et âge à corriger après contrôle du superviseur.",
  "Le nom patronymique était mal orthographié lors du recensement.",
];
for (let i = 0; i < 14; i++) {
  const p = PRODUCERS[i * 61]!;
  const variant = i % 5;
  const changes: CorrectionChange[] =
    variant === 0
      ? [
          {
            field: "Téléphone",
            from: p.phone,
            to: `7${pick(["7", "8", "6"])} ${int(100, 999)} ${int(10, 99)} ${int(10, 99)}`,
          },
        ]
      : variant === 1
        ? [
            {
              field: "Âge",
              from: p.age === null ? "" : String(p.age),
              to: String((p.age ?? 40) + int(-5, 5)),
            },
          ]
        : variant === 2
          ? [{ field: "Statut d'adhésion", from: p.status, to: "membre" }]
          : variant === 3
            ? [
                {
                  field: "Téléphone",
                  from: p.phone,
                  to: `7${pick(["7", "8"])} ${int(100, 999)} ${int(10, 99)} ${int(10, 99)}`,
                },
                {
                  field: "Âge",
                  from: p.age === null ? "" : String(p.age),
                  to: String((p.age ?? 40) + int(-3, 3)),
                },
              ]
            : [{ field: "Nom", from: p.lastName, to: pick(L) }];
  CORRECTIONS.push({
    id: `c${i + 1}`,
    producerId: p.id,
    requester: pick(CORR_REQUESTERS),
    requestedAt: iso(int(240, 295)),
    motif: CORR_MOTIFS[variant]!,
    changes,
    status: i < 8 ? "en attente" : i < 11 ? "approuvée" : "refusée",
    ...(i < 8
      ? {}
      : {
          decidedBy: "Admin CRADESC",
          decidedAt: iso(int(296, 300)),
          decisionComment:
            i < 11 ? "Justificatif vérifié." : "Justificatif insuffisant, à reconstituer.",
        }),
  });
}

export interface Device {
  id: string;
  userId: string;
  label: string;
  registeredAt: string;
  lastActiveAt: string;
  active: boolean;
}
export const DEVICES: Device[] = [
  {
    id: "dev1",
    userId: "u1",
    label: "Samsung A14, bureau",
    registeredAt: iso(40),
    lastActiveAt: iso(298),
    active: true,
  },
  {
    id: "dev2",
    userId: "u1",
    label: "iPhone 11, terrain",
    registeredAt: iso(120),
    lastActiveAt: iso(260),
    active: true,
  },
  {
    id: "dev3",
    userId: "u2",
    label: "Techno Spark, Keur Momar Sarr",
    registeredAt: iso(150),
    lastActiveAt: iso(297),
    active: true,
  },
  {
    id: "dev4",
    userId: "u3",
    label: "Samsung A05, Gandé",
    registeredAt: iso(200),
    lastActiveAt: iso(293),
    active: true,
  },
  {
    id: "dev5",
    userId: "u4",
    label: "iPad mini, USCN",
    registeredAt: iso(60),
    lastActiveAt: iso(299),
    active: true,
  },
  {
    id: "dev6",
    userId: "u5",
    label: "Huawei Y6, perdu",
    registeredAt: iso(280),
    lastActiveAt: iso(288),
    active: false,
  },
];

export interface AccountCandidate {
  id: string;
  userId: string;
  producerId: string;
  score: number;
  signals: string[];
}
export interface AccountLink {
  id: string;
  userId: string;
  producerId: string;
  linkedAt: string;
  by: string;
}
export const ACCOUNT_CANDIDATES: AccountCandidate[] = (() => {
  const cand: AccountCandidate[] = [];
  const udefs: [string, string, string][] = [
    ["u1", "Aïssatou Ndiaye", "Ndiaye"],
    ["u2", "Babacar Fall", "Fall"],
    ["u3", "Mame Diarra Sow", "Sow"],
  ];
  udefs.forEach(([userId, , lastName], k) => {
    const p = PRODUCERS.find((x) => x.lastName === lastName && !x.mergedInto);
    if (p)
      cand.push({
        id: `ac${k + 1}`,
        userId,
        producerId: p.id,
        score: k === 0 ? 92 : k === 1 ? 78 : 65,
        signals: [
          "Nom de famille identique",
          "Même SCOOP",
          "Téléphone du compte proche du numéro masqué",
        ],
      });
  });
  const p4 = PRODUCERS[400]!;
  cand.push({
    id: "ac4",
    userId: "u4",
    producerId: p4.id,
    score: 58,
    signals: ["Village identique", "Aucune correspondance de nom : vérification humaine requise"],
  });
  return cand;
})();
export const ACCOUNT_LINKS: AccountLink[] = [
  { id: "l1", userId: "u1", producerId: "p3", linkedAt: iso(250), by: "Admin CRADESC" },
];

export interface Seuils {
  gpsPrecisionMax: number;
  areaGapPct: number;
  minAreaM2: number;
  maxAreaHa: number;
}
export const SEUILS: Seuils = {
  gpsPrecisionMax: 20,
  areaGapPct: 30,
  minAreaM2: 100,
  maxAreaHa: 10,
};

export const YOUTH_DEFAULT = 35;

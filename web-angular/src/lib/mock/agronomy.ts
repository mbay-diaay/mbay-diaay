/**
 * Entités du module M4 Agronomique (plan 4.8) : campagnes, calendriers culturaux, opérations.
 * Données de démonstration déterministes, entièrement fictives.
 */
import { CAMPAIGNS } from "./data";

// ============ Campagnes ============

export type CampaignStatus = "planifiée" | "en cours" | "clôturée";
export const CAMPAIGN_STATUSES: readonly CampaignStatus[] = ["planifiée", "en cours", "clôturée"];

/**
 * Période de production à laquelle se rattachent cultures, charges et ventes (note de cadrage, glossaire).
 * Hypothèse D18, à valider : une campagne est une période nommée avec un début, une fin et un état.
 */
export interface Campaign {
  id: string;
  /** Nom unique, utilisé comme clé par les parcelles et les plans (ex. « CHN 2025-2026 »). */
  name: string;
  /** Dates ISO (AAAA-MM-JJ). */
  start: string;
  end: string;
  status: CampaignStatus;
  createdAt: string;
  history: { at: string; by: string; action: string }[];
}

const at = (iso: string) => `${iso}T09:00:00.000Z`;

export const CAMPAIGN_LIST: Campaign[] = [
  {
    id: "c1",
    name: CAMPAIGNS[0],
    start: "2025-10-01",
    end: "2026-09-30",
    status: "en cours",
    createdAt: at("2025-09-15"),
    history: [{ at: at("2025-09-15"), by: "Aïssatou Ndiaye", action: "créée" }],
  },
  {
    id: "c2",
    name: "CHN 2026-2027",
    start: "2026-10-01",
    end: "2027-09-30",
    status: "planifiée",
    createdAt: at("2026-10-10"),
    history: [{ at: at("2026-10-10"), by: "Aïssatou Ndiaye", action: "créée" }],
  },
];

// ============ Calendriers culturaux (plan 4.8, M4-2) ============

export type OperationKind =
  | "préparation du sol"
  | "semis"
  | "repiquage"
  | "fertilisation"
  | "irrigation"
  | "désherbage"
  | "traitement"
  | "récolte";
export const OPERATION_KINDS: readonly OperationKind[] = [
  "préparation du sol",
  "semis",
  "repiquage",
  "fertilisation",
  "irrigation",
  "désherbage",
  "traitement",
  "récolte",
];

/** Une étape se place par rapport au semis : négatif avant, positif après (en jours). */
export interface CalendarStep {
  id: string;
  kind: OperationKind;
  offsetDays: number;
  /** Nombre de jours pendant lesquels l'opération reste à faire (1 = le jour dit). */
  durationDays: number;
  note: string;
}

/**
 * Calendrier cultural d'une culture. Brouillon : modifiable. Validé : figé, une seule version validée par culture ;
 * une nouvelle version remplace l'ancienne à sa validation (hypothèse D19, à valider).
 */
export type CalendarStatus = "brouillon" | "validé" | "remplacé";
export interface CropCalendar {
  id: string;
  /** Nom de la culture du référentiel. */
  crop: string;
  version: number;
  status: CalendarStatus;
  steps: CalendarStep[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  validatedBy: string | null;
  validatedAt: string | null;
  history: { at: string; by: string; action: string }[];
}

const step = (
  id: string,
  kind: OperationKind,
  offsetDays: number,
  note = "",
  durationDays = 1,
): CalendarStep => ({ id, kind, offsetDays, durationDays, note });

const calendar = (
  n: number,
  crop: string,
  status: CalendarStatus,
  steps: CalendarStep[],
): CropCalendar => ({
  id: `cal${n}`,
  crop,
  version: 1,
  status,
  steps,
  createdBy: "Fatou Sarr",
  createdAt: at("2026-09-20"),
  updatedAt: at("2026-09-28"),
  validatedBy: status === "validé" ? "Babacar Fall" : null,
  validatedAt: status === "validé" ? at("2026-09-30") : null,
  history: [
    { at: at("2026-09-20"), by: "Fatou Sarr", action: "créé" },
    ...(status === "validé"
      ? [{ at: at("2026-09-30"), by: "Babacar Fall", action: "validé" }]
      : []),
  ],
});

/** Calendriers de démonstration : durées indicatives, à remplacer par le modèle des techniciens (INF 28). */
export const CROP_CALENDARS: CropCalendar[] = [
  calendar(1, "Oignon", "validé", [
    step("o1", "préparation du sol", -14, "Labour et apport de fumure organique"),
    step("o2", "semis", 0, "Semis en pépinière"),
    step("o3", "irrigation", 10, "Arrosage régulier jusqu'au repiquage", 25),
    step("o4", "repiquage", 35),
    step("o5", "fertilisation", 50, "Apport d'engrais de couverture"),
    step("o6", "désherbage", 60),
    step("o7", "traitement", 75, "Contrôle des maladies et des thrips"),
    step("o8", "récolte", 130, "Quand les feuilles jaunissent", 14),
  ]),
  calendar(2, "Tomate", "validé", [
    step("t1", "préparation du sol", -14),
    step("t2", "semis", 0, "Semis en pépinière"),
    step("t3", "repiquage", 25),
    step("t4", "irrigation", 30, "Arrosage au goutte-à-goutte ou à la raie", 60),
    step("t5", "fertilisation", 40),
    step("t6", "traitement", 55),
    step("t7", "récolte", 90, "Récolte échelonnée", 30),
  ]),
  calendar(3, "Pomme de terre", "validé", [
    step("p1", "préparation du sol", -10),
    step("p2", "semis", 0, "Plantation des tubercules"),
    step("p3", "irrigation", 15, "", 60),
    step("p4", "fertilisation", 25),
    step("p5", "désherbage", 30, "Sarclage et buttage"),
    step("p6", "traitement", 40),
    step("p7", "récolte", 100, "", 10),
  ]),
  calendar(4, "Chou", "validé", [
    step("c1", "préparation du sol", -14),
    step("c2", "semis", 0, "Semis en pépinière"),
    step("c3", "repiquage", 30),
    step("c4", "fertilisation", 45),
    step("c5", "traitement", 60),
    step("c6", "récolte", 100, "", 14),
  ]),
  calendar(5, "Carotte", "brouillon", [
    step("k1", "préparation du sol", -7),
    step("k2", "semis", 0),
    step("k3", "irrigation", 10, "", 30),
    step("k4", "désherbage", 25),
    step("k5", "récolte", 90, "", 10),
  ]),
];

// ============ Opérations de culture (plan 4.8, M4-3) ============

/** Pièce photographique décrite seulement en démonstration (hypothèse D20). */
export interface OperationPhoto {
  name: string;
  sizeKb: number;
}

/**
 * Opération réellement faite sur une ligne d'un plan d'exploitation. `stepId` la rattache à l'étape du calendrier
 * qu'elle réalise ; vide pour une opération hors calendrier.
 */
export interface FieldOperation {
  id: string;
  scoopId: string;
  planId: string;
  /** Position de la ligne dans le plan. */
  lineIndex: number;
  stepId: string | null;
  kind: OperationKind;
  /** Date réelle AAAA-MM-JJ. */
  doneAt: string;
  note: string;
  photos: OperationPhoto[];
  by: string;
  createdAt: string;
}

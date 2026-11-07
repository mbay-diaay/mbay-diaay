/**
 * Entités de la coopérative ajoutées par le plan 4.5 : membre, dossier producteur, document, plan d'exploitation.
 * Règle centrale : le **statut d'une personne dans la coopérative** (membre) et son **rôle dans l'application**
 * (compte) sont deux champs différents. Être membre ne donne aucun droit et ne crée aucun producteur.
 * Données de démonstration déterministes, entièrement fictives.
 */
import { CAMPAIGNS, ORGS, PLOTS, PRODUCERS, type Producer, type Sex } from "./data";

// ============ Membres ============

export type MembershipStatus = "candidat" | "membre" | "suspendu" | "sorti";
export const MEMBERSHIP_STATUSES: readonly MembershipStatus[] = [
  "candidat",
  "membre",
  "suspendu",
  "sorti",
];

export interface Member {
  id: string;
  scoopId: string;
  /** Organisation de base ou GIE de la personne ; `null` pour un membre direct. */
  orgId: string | null;
  firstName: string;
  lastName: string;
  sex: Sex;
  phone: string;
  email: string;
  /** Âge en années ; `null` quand il n'est pas connu. */
  age: number | null;
  /** Situation de handicap, pour les statistiques demandées par les partenaires. */
  handicap: boolean;
  /** Localité de résidence. */
  village: string;
  status: MembershipStatus;
  /** Date d'adhésion ISO ; `null` tant que la personne est candidate. */
  joinedAt: string | null;
  /** Un membre n'est pas forcément producteur : `null` quand il n'a pas de fiche agricole. */
  producerId: string | null;
  history: { at: string; by: string; action: string; comment?: string | undefined }[];
}

// ============ Documents ============

export type DossierDocumentKind = "cni" | "photo" | "justificatif" | "autre";
/** Documents propres à la coopérative (bibliothèque) : statuts, règlement, procès-verbaux, conventions. */
export type LibraryDocumentKind =
  "statuts" | "règlement" | "procès-verbal" | "convention" | "justificatif" | "autre";
export type DocumentKind = DossierDocumentKind | LibraryDocumentKind;
/** Types proposés pour les pièces d'un dossier producteur. */
export const DOCUMENT_KINDS: readonly DossierDocumentKind[] = [
  "cni",
  "photo",
  "justificatif",
  "autre",
];
export const LIBRARY_KINDS: readonly LibraryDocumentKind[] = [
  "statuts",
  "règlement",
  "procès-verbal",
  "convention",
  "justificatif",
  "autre",
];
export type DocumentOwner = "dossier" | "producteur" | "membre" | "plan" | "scoop";

/** Seule la CNI est sensible par défaut : sa lecture demande un droit dédié et laisse une trace. */
export const defaultSensitive = (kind: DocumentKind) => kind === "cni";

/** Métadonnées d'une pièce. Le contenu est stocké côté serveur ; la démonstration ne garde que la description. */
export interface DocumentMeta {
  id: string;
  ownerType: DocumentOwner;
  ownerId: string;
  scoopId: string;
  kind: DocumentKind;
  name: string;
  sizeKb: number;
  mime: string;
  uploadedBy: string;
  uploadedAt: string;
  sensitive: boolean;
  /** Numéro de version (1 = première). */
  version?: number;
  /** Date d'effet ISO ; défaut = uploadedAt. */
  effectiveAt?: string;
  /** Document remplacé par une version plus récente. */
  replacedById?: string | null;
  /** Statut d'usage pour la bibliothèque. */
  lifecycle?: "en vigueur" | "remplacé";
}

// ============ Dossiers producteurs ============

export type DossierStatus =
  "brouillon" | "soumis" | "en examen" | "complément demandé" | "approuvé" | "refusé";

export type RefusalReason =
  | "doublon"
  | "pièce illisible ou manquante"
  | "hors zone ou hors SCOOP"
  | "informations incohérentes"
  | "autre";
export const REFUSAL_REASONS: readonly RefusalReason[] = [
  "doublon",
  "pièce illisible ou manquante",
  "hors zone ou hors SCOOP",
  "informations incohérentes",
  "autre",
];

/** Champs d'une future fiche producteur, saisis par le technicien. */
export interface DossierDraft {
  firstName: string;
  lastName: string;
  sex: Sex;
  age: number | null;
  phone: string;
  cni: string;
  village: string;
  orgId: string;
  /** Crée aussi un membre à l'approbation. */
  createMember: boolean;
}

export type DossierAction =
  | "créé"
  | "modifié"
  | "soumis"
  | "pris en examen"
  | "complément demandé"
  | "complément fourni"
  | "approuvé"
  | "auto-approuvé"
  | "refusé"
  | "rappel";

export interface DossierEvent {
  at: string;
  /** Nom affiché et e-mail du compte : l'e-mail identifie la personne de façon stable. */
  by: string;
  byEmail: string;
  action: DossierAction;
  comment?: string | undefined;
}

export interface DossierDecision {
  at: string;
  by: string;
  byEmail: string;
  approved: boolean;
  reason?: RefusalReason | undefined;
  comment?: string | undefined;
  /** Vrai quand la personne qui approuve est celle qui a créé ou soumis le dossier (exception D12). */
  selfApproved: boolean;
}

export interface ProducerDossier {
  id: string;
  scoopId: string;
  createdBy: string;
  createdByEmail: string;
  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
  /** Personne qui a soumis le dossier : base de la séparation des tâches. */
  submittedByEmail: string | null;
  status: DossierStatus;
  draft: DossierDraft;
  documentIds: string[];
  history: DossierEvent[];
  /** Producteur existant détecté à la soumission (CNI, téléphone, nom et village). */
  possibleDuplicateOf: string | null;
  /** Producteur créé par l'approbation, ou producteur existant auquel le dossier est lié. */
  producerId: string | null;
  decision: DossierDecision | null;
  /** Dernier rappel envoyé (14 jours sans réponse). */
  remindedAt: string | null;
}

// ============ Plans d'exploitation ============

export type PlanStatus = "brouillon" | "validé" | "à jour";
export const PLAN_STATUSES: readonly PlanStatus[] = ["brouillon", "validé", "à jour"];

export interface PlanLine {
  /** Parcelle concernée ; `null` pour une culture prévue sur une surface pas encore relevée. */
  plotId: string | null;
  crop: string;
  areaHa: number;
  /** Mois de semis prévu au format AAAA-MM. */
  sowingMonth: string | null;
}

/** Contenu minimal, à compléter avec le modèle des techniciens (décision D6). */
export interface ExploitationPlan {
  id: string;
  scoopId: string;
  producerId: string | null;
  dossierId: string | null;
  campaign: string;
  lines: PlanLine[];
  notes: string;
  status: PlanStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  history: { at: string; by: string; action: string }[];
}

// ============ Données de démonstration ============

const FIRST_F = ["Ndeye", "Fatima", "Rama", "Sokhna", "Yacine", "Mariama", "Aby", "Dior"];
const FIRST_H = ["Cheikh", "Ibrahima", "Pape", "Mor", "Assane", "Daouda", "Malick", "Seydou"];
const LAST = ["Diouf", "Gaye", "Samb", "Ndoye", "Badji", "Kébé", "Sène", "Thioune"];
const day = (iso: string) => `${iso}T09:00:00.000Z`;
const email = (first: string, last: string) =>
  `${first}.${last}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z.]/g, "") + "@membres.example";

const live = PRODUCERS.filter((p) => !p.mergedInto && p.quality !== "doublon");
const inScoop = (id: string) => live.filter((p) => p.scoopId === id);

function fromProducer(p: Producer, i: number, status: MembershipStatus): Member {
  return {
    id: `m${i}`,
    scoopId: p.scoopId,
    orgId: p.orgId,
    firstName: p.firstName,
    lastName: p.lastName,
    sex: p.sex,
    phone: p.phone,
    email: "",
    age: p.age,
    handicap: p.handicap,
    village: p.village,
    status,
    joinedAt: status === "candidat" ? null : day(`2025-0${(i % 9) + 1}-1${(i % 8) + 1}`),
    producerId: p.id,
    history: [],
  };
}

/** Membres : des producteurs de deux SCOOP, plus des membres qui ne sont pas producteurs (secrétaire, ventes…). */
export const MEMBERS: Member[] = (() => {
  const out: Member[] = [];
  [...inScoop("s1").slice(0, 22), ...inScoop("s2").slice(0, 10)].forEach((p, k) => {
    const status: MembershipStatus =
      k % 11 === 7 ? "candidat" : k === 19 ? "suspendu" : k === 28 ? "sorti" : "membre";
    out.push(fromProducer(p, out.length + 1, status));
  });
  const direct = (scoopId: string, i: number, sex: Sex, orgId: string | null): Member => {
    const first = (sex === "F" ? FIRST_F : FIRST_H)[i % 8]!;
    const last = LAST[(i * 3) % 8]!;
    return {
      id: `m${out.length + 1}`,
      scoopId,
      orgId,
      firstName: first,
      lastName: last,
      sex,
      phone: "",
      email: email(first, last),
      age: 30 + ((i * 7) % 25),
      handicap: false,
      village: ORGS.find((o) => o.scoopId === scoopId)?.village ?? "",
      status: "membre",
      joinedAt: day(`2024-1${i % 3}-0${(i % 8) + 1}`),
      producerId: null,
      history: [],
    };
  };
  // Les personnes qui ont un compte sont aussi des membres de leur SCOOP, sans fiche producteur.
  const staff: [string, string, Sex, string][] = [
    ["Babacar", "Fall", "H", "babacar.fall@scoop-kms.example"],
    ["Moussa", "Diouf", "H", "moussa.diouf@scoop-kms.example"],
    ["Aminata", "Bâ", "F", "aminata.ba@scoop-kms.example"],
    ["Ibrahima", "Seck", "H", "ibrahima.seck@scoop-kms.example"],
    ["Rokhaya", "Diallo", "F", "rokhaya.diallo@scoop-kms.example"],
    ["Fatou", "Sarr", "F", "fatou.sarr@cradesc.example"],
  ];
  staff.forEach(([first, last, sex, mail], i) =>
    out.push({
      id: `m${out.length + 1}`,
      scoopId: "s1",
      orgId: null,
      firstName: first,
      lastName: last,
      sex,
      phone: "",
      email: mail,
      age: 34 + ((i * 5) % 20),
      handicap: false,
      village: ORGS.find((o) => o.scoopId === "s1")?.village ?? "",
      status: "membre",
      joinedAt: day(`2024-0${i + 1}-15`),
      producerId: null,
      history: [],
    }),
  );
  const org1 = ORGS.find((o) => o.scoopId === "s1")?.id ?? null;
  for (let i = 0; i < 6; i++) out.push(direct("s1", i, i % 2 ? "F" : "H", i < 3 ? null : org1));
  for (let i = 0; i < 3; i++) out.push(direct("s2", i + 6, i % 2 ? "H" : "F", null));
  return out;
})();

const draft = (
  first: string,
  last: string,
  sex: Sex,
  scoopId: string,
  over: Partial<DossierDraft> = {},
): DossierDraft => {
  const org = ORGS.find((o) => o.scoopId === scoopId)!;
  return {
    firstName: first,
    lastName: last,
    sex,
    age: 33,
    phone: "77 480 12 34",
    cni: "",
    village: org.village,
    orgId: org.id,
    createMember: true,
    ...over,
  };
};

const TECH = { by: "Fatou Sarr", byEmail: "fatou.sarr@cradesc.example" };
const event = (
  at: string,
  action: DossierAction,
  comment?: string,
  who: { by: string; byEmail: string } = TECH,
): DossierEvent => ({ at: day(at), action, comment, ...who });

/** Un producteur existant sert d'exemple de doublon : même CNI que le dossier « soumis » ci-dessous. */
const existing = inScoop("s1").find((p) => p.cni) ?? live[0]!;

function dossier(
  n: number,
  scoopId: string,
  status: DossierStatus,
  d: DossierDraft,
  history: DossierEvent[],
  docs: string[],
  over: Partial<ProducerDossier> = {},
): ProducerDossier {
  const submitted = history.find((h) => h.action === "soumis");
  return {
    id: `dos${n}`,
    scoopId,
    createdBy: TECH.by,
    createdByEmail: TECH.byEmail,
    createdAt: history[0]!.at,
    updatedAt: history[history.length - 1]!.at,
    submittedAt: submitted?.at ?? null,
    submittedByEmail: submitted ? TECH.byEmail : null,
    status,
    draft: d,
    documentIds: docs,
    history,
    possibleDuplicateOf: null,
    producerId: null,
    decision: null,
    remindedAt: null,
    ...over,
  };
}

export const DOSSIERS: ProducerDossier[] = [
  dossier(
    1,
    "s1",
    "brouillon",
    draft("Ndeye", "Diouf", "F", "s1", { cni: "2123456789012" }),
    [event("2026-10-20", "créé")],
    ["doc1"],
  ),
  dossier(
    2,
    "s1",
    "brouillon",
    draft("Cheikh", "Gaye", "H", "s1", { age: null }),
    [event("2026-10-22", "créé")],
    [],
  ),
  dossier(
    3,
    "s1",
    "soumis",
    draft("Pape", "Samb", "H", "s1", { cni: existing.cni, phone: "76 330 45 61" }),
    [event("2026-10-15", "créé"), event("2026-10-16", "soumis")],
    ["doc2"],
    { possibleDuplicateOf: existing.id },
  ),
  dossier(
    4,
    "s1",
    "en examen",
    draft("Sokhna", "Ndoye", "F", "s1", { cni: "2987654321098", phone: "78 250 33 90" }),
    [
      event("2026-10-10", "créé"),
      event("2026-10-11", "soumis"),
      event("2026-10-13", "pris en examen", undefined, {
        by: "Babacar Fall",
        byEmail: "babacar.fall@scoop-kms.example",
      }),
    ],
    ["doc3"],
  ),
  dossier(
    5,
    "s1",
    "complément demandé",
    draft("Mor", "Badji", "H", "s1", { cni: "1456789012345", phone: "77 810 02 45" }),
    [
      event("2026-10-08", "créé"),
      event("2026-10-09", "soumis"),
      event("2026-10-12", "complément demandé", "La photo de la carte d'identité est illisible.", {
        by: "Babacar Fall",
        byEmail: "babacar.fall@scoop-kms.example",
      }),
    ],
    [],
  ),
  dossier(
    6,
    "s1",
    "approuvé",
    draft("Yacine", "Kébé", "F", "s1", { cni: "2345678901234", phone: "70 650 21 87" }),
    [
      event("2026-09-25", "créé"),
      event("2026-09-26", "soumis"),
      event("2026-09-30", "approuvé", undefined, {
        by: "Babacar Fall",
        byEmail: "babacar.fall@scoop-kms.example",
      }),
    ],
    [],
    {
      producerId: inScoop("s1")[5]!.id,
      decision: {
        at: day("2026-09-30"),
        by: "Babacar Fall",
        byEmail: "babacar.fall@scoop-kms.example",
        approved: true,
        selfApproved: false,
      },
    },
  ),
  dossier(
    7,
    "s2",
    "refusé",
    draft("Assane", "Sène", "H", "s2", { cni: "1111111111111", phone: "77 000 00 01" }),
    [
      event("2026-09-20", "créé"),
      event("2026-09-21", "soumis"),
      event("2026-09-24", "refusé", "Déjà enregistré dans une autre organisation.", {
        by: "Mame Diarra Sow",
        byEmail: "mame.diarra.sow@scoop-gande.example",
      }),
    ],
    [],
    {
      decision: {
        at: day("2026-09-24"),
        by: "Mame Diarra Sow",
        byEmail: "mame.diarra.sow@scoop-gande.example",
        approved: false,
        reason: "doublon",
        comment: "Déjà enregistré dans une autre organisation.",
        selfApproved: false,
      },
    },
  ),
];

export const DOCUMENTS: DocumentMeta[] = [
  {
    id: "doc1",
    ownerType: "dossier",
    ownerId: "dos1",
    scoopId: "s1",
    kind: "cni",
    name: "cni_recto_verso.jpg",
    sizeKb: 842,
    mime: "image/jpeg",
    uploadedBy: TECH.by,
    uploadedAt: day("2026-10-20"),
    sensitive: true,
  },
  {
    id: "doc2",
    ownerType: "dossier",
    ownerId: "dos3",
    scoopId: "s1",
    kind: "cni",
    name: "cni.pdf",
    sizeKb: 311,
    mime: "application/pdf",
    uploadedBy: TECH.by,
    uploadedAt: day("2026-10-15"),
    sensitive: true,
  },
  {
    id: "doc3",
    ownerType: "dossier",
    ownerId: "dos4",
    scoopId: "s1",
    kind: "justificatif",
    name: "attestation_gie.pdf",
    sizeKb: 128,
    mime: "application/pdf",
    uploadedBy: TECH.by,
    uploadedAt: day("2026-10-10"),
    sensitive: false,
  },
];

/** Plans d'exploitation de démonstration : construits à partir des parcelles réelles de quelques producteurs. */
const PLANNED_CROPS = ["Oignon", "Tomate", "Pomme de terre", "Chou"];

export const PLANS: ExploitationPlan[] = (() => {
  const statuses: PlanStatus[] = ["à jour", "validé", "brouillon", "validé", "à jour", "brouillon"];
  return inScoop("s1")
    .filter((p) => PLOTS.some((pl) => pl.producerId === p.id))
    .slice(0, 6)
    .map((p, i) => {
      const lines: PlanLine[] = PLOTS.filter((pl) => pl.producerId === p.id)
        .slice(0, 3)
        .map((pl, k) => ({
          plotId: pl.id,
          // Culture prévue : les quatre premières ont un calendrier validé, pour que le suivi montre des étapes.
          crop: i < 4 ? PLANNED_CROPS[(i + k) % PLANNED_CROPS.length]! : pl.crop,
          areaHa: Math.round(pl.measured * 100) / 100,
          sowingMonth: `2026-${String(10 + (k % 3)).padStart(2, "0")}`,
        }));
      return {
        id: `plan${i + 1}`,
        scoopId: p.scoopId,
        producerId: p.id,
        dossierId: null,
        campaign: CAMPAIGNS[0],
        lines,
        notes: "",
        status: statuses[i]!,
        createdBy: TECH.by,
        createdAt: day(`2026-10-0${i + 1}`),
        updatedAt: day(`2026-10-1${i}`),
        history: [{ at: day(`2026-10-0${i + 1}`), by: TECH.by, action: "créé" }],
      };
    });
})();

// ============ Cotisations (plan 4.6, M1-3) ============

export type Periodicity = "annuelle" | "mensuelle";
export const PERIODICITIES: readonly Periodicity[] = ["annuelle", "mensuelle"];

/**
 * Règle de cotisation d'une coopérative. Les règles réelles de chaque coopérative sont encore à obtenir
 * (note de cadrage, INF 30) : `confirmed` reste faux tant que le client ne les a pas validées.
 */
export interface ContributionRule {
  scoopId: string;
  /** Montant par période, en FCFA. */
  amount: number;
  periodicity: Periodicity;
  /** Échéance annuelle au format MM-JJ ; ignorée pour une périodicité mensuelle (fin de mois). */
  dueDate: string;
  /** Première année exigible. */
  startYear: number;
  confirmed: boolean;
}

export type PaymentMethod = "espèces" | "mobile money" | "virement";
export const PAYMENT_METHODS: readonly PaymentMethod[] = ["espèces", "mobile money", "virement"];

/** Un paiement n'est jamais effacé : on l'annule avec un motif, il reste dans l'historique. */
export interface ContributionPayment {
  id: string;
  scoopId: string;
  memberId: string;
  /** FCFA. */
  amount: number;
  paidAt: string;
  /** « AAAA » (annuelle) ou « AAAA-MM » (mensuelle). */
  period: string;
  method: PaymentMethod;
  receipt: string;
  recordedBy: string;
  note: string;
  voided: { at: string; by: string; reason: string } | null;
}

export const CONTRIBUTION_RULES: ContributionRule[] = [
  {
    scoopId: "s1",
    amount: 5000,
    periodicity: "annuelle",
    dueDate: "03-31",
    startYear: 2025,
    confirmed: false,
  },
  {
    scoopId: "s2",
    amount: 500,
    periodicity: "mensuelle",
    dueDate: "01-01",
    startYear: 2026,
    confirmed: false,
  },
];

export const CONTRIBUTION_PAYMENTS: ContributionPayment[] = (() => {
  const out: ContributionPayment[] = [];
  const add = (m: Member, period: string, amount: number, k: number, method: PaymentMethod) =>
    out.push({
      id: `pay${out.length + 1}`,
      scoopId: m.scoopId,
      memberId: m.id,
      amount,
      paidAt: day(
        period.length === 4 ? `${period}-02-1${(k % 9) + 1}` : `${period}-1${(k % 9) + 1}`,
      ),
      period,
      method,
      receipt: `R-${period.slice(0, 4)}-${String(out.length + 1).padStart(4, "0")}`,
      recordedBy: "Rokhaya Diallo",
      note: "",
      voided: null,
    });
  MEMBERS.filter((m) => m.scoopId === "s1" && m.status === "membre").forEach((m, k) => {
    const methods: PaymentMethod[] = ["espèces", "mobile money", "espèces", "virement"];
    const method = methods[k % 4]!;
    if (k % 5 === 0) return; // jamais payé
    add(m, "2025", 5000, k, method);
    if (k % 5 === 1) return; // en retard sur 2026
    add(m, "2026", k % 7 === 2 ? 2500 : 5000, k, method); // une partie paie en deux fois
  });
  MEMBERS.filter((m) => m.scoopId === "s2" && m.status === "membre").forEach((m, k) => {
    for (let month = 1; month <= 10 - (k % 3); month++)
      add(m, `2026-${String(month).padStart(2, "0")}`, 500, k, "mobile money");
  });
  return out;
})();

// ============ Réunions et procès-verbaux (plan 4.6, M1-4) ============

export type MeetingKind = "assemblée générale" | "assemblée extraordinaire" | "bureau" | "autre";
export const MEETING_KINDS: readonly MeetingKind[] = [
  "assemblée générale",
  "assemblée extraordinaire",
  "bureau",
  "autre",
];
export type MeetingStatus = "planifiée" | "tenue" | "annulée";

/** Le procès-verbal se rédige en brouillon ; une fois validé il ne change plus. */
export interface Minutes {
  text: string;
  status: "brouillon" | "validé";
  updatedAt: string;
  validatedBy: string | null;
  validatedAt: string | null;
  /** Version signée ou scannée, dans la bibliothèque de la coopérative. */
  documentId: string | null;
}

export interface Meeting {
  id: string;
  scoopId: string;
  kind: MeetingKind;
  title: string;
  /** Date et heure ISO. */
  date: string;
  place: string;
  agenda: string[];
  status: MeetingStatus;
  /** Membres présents ; renseigné quand la réunion est tenue. */
  presentIds: string[];
  minutes: Minutes | null;
  cancelReason: string | null;
  createdBy: string;
  createdAt: string;
  history: { at: string; by: string; action: string }[];
}

export const MEETINGS: Meeting[] = (() => {
  const s1 = MEMBERS.filter((m) => m.scoopId === "s1" && m.status === "membre");
  const meeting = (
    m: Partial<Meeting> & Pick<Meeting, "id" | "scoopId" | "kind" | "title" | "date">,
  ): Meeting => ({
    place: "Siège de la coopérative",
    agenda: [],
    status: "planifiée",
    presentIds: [],
    minutes: null,
    cancelReason: null,
    createdBy: "Rokhaya Diallo",
    createdAt: day("2026-02-20"),
    history: [{ at: day("2026-02-20"), by: "Rokhaya Diallo", action: "créée" }],
    ...m,
  });
  return [
    meeting({
      id: "meet1",
      scoopId: "s1",
      kind: "assemblée générale",
      title: "Assemblée générale ordinaire 2026",
      date: "2026-03-14T09:00:00.000Z",
      agenda: ["Bilan de la campagne", "Cotisations 2026", "Élection du bureau"],
      status: "tenue",
      presentIds: s1.slice(0, 18).map((m) => m.id),
      minutes: {
        text: "L'assemblée a approuvé le bilan de la campagne et fixé la cotisation 2026 à 5 000 FCFA par membre.",
        status: "validé",
        updatedAt: day("2026-03-20"),
        validatedBy: "Moussa Diouf",
        validatedAt: day("2026-03-20"),
        documentId: "doc5",
      },
    }),
    meeting({
      id: "meet2",
      scoopId: "s1",
      kind: "bureau",
      title: "Réunion du bureau, septembre",
      date: "2026-09-20T16:00:00.000Z",
      agenda: ["Préparation de la campagne", "Nouveaux membres"],
      status: "tenue",
      presentIds: s1.slice(0, 6).map((m) => m.id),
      minutes: {
        text: "Le bureau a retenu trois candidatures et préparé le calendrier des semis.",
        status: "brouillon",
        updatedAt: day("2026-09-21"),
        validatedBy: null,
        validatedAt: null,
        documentId: null,
      },
    }),
    meeting({
      id: "meet3",
      scoopId: "s1",
      kind: "assemblée extraordinaire",
      title: "Assemblée extraordinaire : achat groupé d'intrants",
      date: "2026-11-15T09:00:00.000Z",
      agenda: ["Choix des fournisseurs", "Montant de l'achat groupé"],
    }),
    meeting({
      id: "meet4",
      scoopId: "s2",
      kind: "assemblée générale",
      title: "Assemblée générale 2026",
      date: "2026-12-05T09:00:00.000Z",
      agenda: ["Bilan", "Cotisations"],
      createdBy: "Moussa Diouf",
    }),
  ];
})();

// ============ Bibliothèque de la coopérative (plan 4.6, M1-5) ============

const libraryDoc = (d: {
  id: string;
  kind: LibraryDocumentKind;
  name: string;
  sizeKb: number;
  scoopId: string;
  uploadedAt: string;
}): DocumentMeta => ({
  ownerType: "scoop",
  ownerId: d.scoopId,
  mime: "application/pdf",
  uploadedBy: "Rokhaya Diallo",
  sensitive: false,
  ...d,
});

export const LIBRARY_DOCUMENTS: DocumentMeta[] = (
  [
    {
      id: "doc4",
      kind: "statuts",
      name: "statuts_scoop.pdf",
      sizeKb: 412,
      scoopId: "s1",
      uploadedAt: day("2025-02-10"),
    },
    {
      id: "doc5",
      kind: "procès-verbal",
      name: "pv_ag_2026-03-14.pdf",
      sizeKb: 268,
      scoopId: "s1",
      uploadedAt: day("2026-03-21"),
    },
    {
      id: "doc6",
      kind: "règlement",
      name: "reglement_interieur.pdf",
      sizeKb: 187,
      scoopId: "s1",
      uploadedAt: day("2025-02-10"),
    },
    {
      id: "doc7",
      kind: "statuts",
      name: "statuts_scoop.pdf",
      sizeKb: 398,
      scoopId: "s2",
      uploadedAt: day("2025-04-02"),
    },
  ] satisfies Parameters<typeof libraryDoc>[0][]
).map(libraryDoc);

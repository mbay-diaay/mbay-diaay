import { checkAccess } from "./guard";
import { useSyncExternalStore } from "react";
import {
  ACCOUNT_CANDIDATES,
  ACCOUNT_LINKS,
  ALERTS,
  CASES,
  CORRECTIONS,
  CROP_ALIASES,
  CROP_REFS,
  DEVICES,
  FIXTURE_AUDIT,
  FIXTURE_COUNTS,
  ORGS,
  PLOTS,
  PRODUCERS,
  SCOOPS,
  type Scoop,
  SEUILS,
  YOUTH_DEFAULT,
  type AccountCandidate,
  type AccountLink,
  type AlertStatus,
  type CaseStatus,
  type CorrectionChange,
  type CorrectionRequest,
  type CropFamily,
  type CropRef,
  type DataAlert,
  type Device,
  type DuplicateCase,
  type Org,
  type OrgType,
  type Plot,
  type Producer,
  type Seuils,
} from "./mock/data";
import {
  fetchMyPermissions,
  ROLE_LABEL,
  type Permission,
  type RoleId,
  type Scope,
} from "./permissions";
import type { ImportPlan } from "./io/validate";
import {
  canDownloadDocument,
  inScope,
  isConsolidated,
  scopedDocuments,
  scopedLibrary,
  scopedReports,
  scoopIdsOf,
} from "./scope";
import {
  buildReport,
  REPORTS,
  type GeneratedReport,
  type ReportId,
  type ReportParams,
} from "./reports";
import {
  CONTRIBUTION_PAYMENTS,
  CONTRIBUTION_RULES,
  DOCUMENTS,
  DOSSIERS,
  LIBRARY_DOCUMENTS,
  LIBRARY_KINDS,
  MEETINGS,
  MEMBERS,
  PLANS,
  defaultSensitive,
  type ContributionPayment,
  type ContributionRule,
  type DocumentKind,
  type DocumentMeta,
  type DossierAction,
  type DossierDraft,
  type DossierEvent,
  type ExploitationPlan,
  type LibraryDocumentKind,
  type Meeting,
  type MeetingKind,
  type Member,
  type MembershipStatus,
  type PaymentMethod,
  type PlanLine,
  type PlanStatus,
  type ProducerDossier,
  type RefusalReason,
} from "./mock/cooperative";
import { PLAN_NEXT } from "./plans";
import { accountBlocker, assignableRoles } from "./team";
import { isPaymentDate, isValidMonthDay, nextReceipt, paymentIssues } from "./contributions";
import { makeReceipt } from "./receipts";
import {
  INPUT_ITEMS,
  STOCK_LOTS,
  STOCK_MOVEMENTS,
  CREDITS,
  REPAYMENTS,
  SALES,
  type Credit,
  type InputCategory,
  type InputItem,
  type InputUnit,
  type MovementKind,
  type Repayment,
  type Sale,
  type StockLot,
  type StockMovement,
} from "./mock/commerce";
import {
  creditBalance,
  creditIssues,
  generateSchedule,
  lotBalance,
  lotIssues,
  movementIssues,
  repaymentIssues,
  saleIssues,
} from "./commerce";
import {
  CAMPAIGN_LIST,
  CROP_CALENDARS,
  OPERATION_KINDS,
  type Campaign,
  type CampaignStatus,
  type CalendarStep,
  type CropCalendar,
  type FieldOperation,
  type OperationKind,
  type OperationPhoto,
} from "./mock/agronomy";
import { FIELD_OPERATIONS } from "./mock/agronomy-seed";
import { EXPENSES, type Expense, type ExpenseCategory } from "./mock/exploitation";
import { expenseIssues } from "./exploitation";
import { calendarIssues, canEditCalendar, validatedCalendar } from "./agronomy";
import {
  campaignIssues,
  canCampaignTransition,
  currentCampaign,
  isOpenCampaign,
  nextCampaignId,
  type CampaignInput,
} from "./campaigns";
import {
  blockingDossiers,
  nextScoopId,
  normalizeCode,
  scoopIssues,
  type ScoopInput,
} from "./scoops";
import { canEditMinutes, canMeetingTransition, isMeetingEditable } from "./meetings";
import { DEMO_MODE } from "./auth/config";
import { tNow, type MessageKey, type TranslateParams } from "./i18n";
import {
  canDecide,
  canTransition,
  decisionCheck,
  dueReminders,
  findDuplicate,
  isEditable,
  requiresComment,
  validateDraft,
  type ActionResult,
} from "./dossiers";

export interface Session {
  name: string;
  email: string;
  role: RoleId;
  permissions: Permission[];
  scope: Scope;
  expiresAt: number;
}
export interface AuditEntry {
  id: string;
  at: string;
  user: string;
  action: string;
  entity: string;
  detail: string;
  /** SCOOP concernée : base du journal limité à sa SCOOP. Absente pour les actions qui visent toute la plateforme. */
  scoopId?: string | undefined;
}
export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: RoleId;
  scoopId?: string | undefined;
  /** SCOOP d'un technicien : il peut en couvrir plusieurs. Vide pour les autres rôles. */
  scoopIds?: string[] | undefined;
  /** Membre de la coopérative auquel le compte est lié (le statut de membre et le rôle sont deux choses). */
  memberId?: string | undefined;
  active: boolean;
  /** Invitation en attente : le compte reste inactif tant que la personne n'a pas choisi son mot de passe. */
  invited?: { sentAt: string; expiresAt: string } | undefined;
}
export interface ImportSheet {
  name: string;
  rows: number;
  rejects: number;
}
export interface ImportBatch {
  id: string;
  file: string;
  hash: string;
  at: string;
  script: string;
  counts: {
    producers: number;
    plots: number;
    crops: number;
    rejects: number;
    repaired: number;
    alerts: number;
    duplicates: number;
  };
  sheets: ImportSheet[];
  mode: "à blanc" | "réel";
}
export interface MergeSnapshot {
  caseId: string;
  b: Producer;
  plotIds: string[];
  prevStatus: CaseStatus;
}

interface State {
  session: Session | null;
  producers: Producer[];
  orgs: Org[];
  plots: Plot[];
  cases: DuplicateCase[];
  alerts: DataAlert[];
  audit: AuditEntry[];
  users: AppUser[];
  imports: ImportBatch[];
  merges: Record<string, MergeSnapshot>;
  youthMaxAge: number;
  corrections: CorrectionRequest[];
  devices: Device[];
  linkCandidates: AccountCandidate[];
  links: AccountLink[];
  cropRefs: CropRef[];
  cropAliases: string[];
  seuils: Seuils;
  members: Member[];
  dossiers: ProducerDossier[];
  documents: DocumentMeta[];
  scoops: Scoop[];
  campaigns: Campaign[];
  expenses: Expense[];
  inputItems: InputItem[];
  stockLots: StockLot[];
  stockMovements: StockMovement[];
  credits: Credit[];
  repayments: Repayment[];
  sales: Sale[];
  calendars: CropCalendar[];
  operations: FieldOperation[];
  plans: ExploitationPlan[];
  reports: GeneratedReport[];
  contributionRules: ContributionRule[];
  payments: ContributionPayment[];
  meetings: Meeting[];
}

/** Relie un compte à son membre (même adresse e-mail), quand la personne est aussi membre de la coopérative. */
const withMember = (u: AppUser): AppUser => {
  const m = MEMBERS.find((x) => x.email === u.email);
  return m ? { ...u, memberId: m.id } : u;
};

const TOKEN_MS = 30 * 60 * 1000;
/** Durée de validité du lien d'invitation d'un gestionnaire (hypothèse, à valider). */
const INVITATION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
let state: State = {
  session: null,
  producers: PRODUCERS,
  orgs: ORGS,
  plots: PLOTS,
  cases: CASES,
  alerts: ALERTS,
  audit: [
    {
      id: "au3",
      at: "2026-10-21T16:12:00.000Z",
      user: "Admin CRADESC",
      action: "Import réel",
      entity: "Lot L-002",
      detail: `Base CRADESC v3, ${FIXTURE_COUNTS.producers} producteurs`,
    },
    {
      id: "au2",
      at: "2026-10-21T15:40:00.000Z",
      user: "Admin CRADESC",
      action: "Import à blanc",
      entity: "Lot L-001",
      detail: "Rapport de contrôle consulté",
    },
    {
      id: "au1",
      at: "2026-10-20T09:02:00.000Z",
      user: "Admin CRADESC",
      action: "Création utilisateur",
      entity: "Utilisateur",
      detail: "Gestionnaire SCOOP Keur Momar Sarr",
    },
    ...FIXTURE_AUDIT,
  ],
  users: (
    [
      {
        id: "u1",
        name: "Aïssatou Ndiaye",
        email: "aissatou.ndiaye@cradesc.example",
        phone: "77 412 33 10",
        role: "admin",
        active: true,
      },
      {
        id: "u2",
        name: "Babacar Fall",
        email: "babacar.fall@scoop-kms.example",
        phone: "78 220 14 56",
        role: "gestionnaire",
        scoopId: "s1",
        active: true,
      },
      {
        id: "u3",
        name: "Mame Diarra Sow",
        email: "mame.diarra.sow@scoop-gande.example",
        phone: "76 901 02 44",
        role: "gestionnaire",
        scoopId: "s4",
        active: true,
      },
      {
        id: "u4",
        name: "Ousmane Guèye",
        email: "ousmane.gueye@uscn.example",
        phone: "77 650 81 09",
        role: "faitiere",
        active: true,
      },
      {
        id: "u5",
        name: "Khadim Thiam",
        email: "khadim.thiam@cradesc.example",
        phone: "70 118 77 30",
        role: "technicien",
        scoopIds: ["s3"],
        active: false,
      },
      {
        id: "u6",
        name: "Fatou Sarr",
        email: "fatou.sarr@cradesc.example",
        phone: "76 330 41 18",
        role: "technicien",
        scoopIds: ["s1", "s2"],
        active: true,
      },
      {
        id: "u7",
        name: "Moussa Diouf",
        email: "moussa.diouf@scoop-kms.example",
        phone: "77 521 08 36",
        role: "representant",
        scoopId: "s1",
        active: true,
      },
      {
        id: "u8",
        name: "Aminata Bâ",
        email: "aminata.ba@scoop-kms.example",
        phone: "78 140 62 09",
        role: "secretaire",
        scoopId: "s1",
        active: true,
      },
      {
        id: "u9",
        name: "Ibrahima Seck",
        email: "ibrahima.seck@scoop-kms.example",
        phone: "76 884 17 50",
        role: "ventes",
        scoopId: "s1",
        active: true,
      },
      {
        id: "u10",
        name: "Rokhaya Diallo",
        email: "rokhaya.diallo@scoop-kms.example",
        phone: "70 362 95 24",
        role: "rapports",
        scoopId: "s1",
        active: true,
      },
    ] satisfies AppUser[]
  ).map(withMember),
  imports: [
    {
      id: "L-002",
      file: "base_cradesc_v3.xlsx",
      hash: "9f3a…c21e",
      at: "2026-10-21T16:12:00.000Z",
      script: "import-v0.4.2",
      counts: {
        producers: FIXTURE_COUNTS.producers,
        plots: FIXTURE_COUNTS.plots,
        crops: FIXTURE_COUNTS.crops,
        rejects: 0,
        repaired: 433,
        alerts: FIXTURE_COUNTS.alerts,
        duplicates: FIXTURE_COUNTS.duplicates,
      },
      sheets: [
        { name: "Producteurs", rows: FIXTURE_COUNTS.producers, rejects: 0 },
        { name: "Parcelles", rows: FIXTURE_COUNTS.plots, rejects: 0 },
        { name: "Cultures", rows: FIXTURE_COUNTS.crops, rejects: 0 },
        { name: "Référentiels", rows: 35, rejects: 0 },
      ],
      mode: "réel",
    },
    {
      id: "L-001",
      file: "base_cradesc_v3.xlsx",
      hash: "9f3a…c21e",
      at: "2026-10-21T15:40:00.000Z",
      script: "import-v0.4.2",
      counts: {
        producers: FIXTURE_COUNTS.producers,
        plots: FIXTURE_COUNTS.plots,
        crops: FIXTURE_COUNTS.crops,
        rejects: 0,
        repaired: 433,
        alerts: FIXTURE_COUNTS.alerts,
        duplicates: FIXTURE_COUNTS.duplicates,
      },
      sheets: [
        { name: "Producteurs", rows: FIXTURE_COUNTS.producers, rejects: 0 },
        { name: "Parcelles", rows: FIXTURE_COUNTS.plots, rejects: 0 },
        { name: "Cultures", rows: FIXTURE_COUNTS.crops, rejects: 0 },
        { name: "Référentiels", rows: 35, rejects: 0 },
      ],
      mode: "à blanc",
    },
  ],
  merges: {},
  youthMaxAge: YOUTH_DEFAULT,
  corrections: CORRECTIONS,
  devices: DEVICES,
  linkCandidates: ACCOUNT_CANDIDATES,
  links: ACCOUNT_LINKS,
  cropRefs: CROP_REFS,
  cropAliases: CROP_ALIASES,
  seuils: SEUILS,
  members: MEMBERS,
  dossiers: DOSSIERS,
  documents: [...DOCUMENTS, ...LIBRARY_DOCUMENTS],
  scoops: SCOOPS,
  campaigns: CAMPAIGN_LIST,
  expenses: EXPENSES,
  inputItems: INPUT_ITEMS,
  stockLots: STOCK_LOTS,
  stockMovements: STOCK_MOVEMENTS,
  credits: CREDITS,
  repayments: REPAYMENTS,
  sales: SALES,
  calendars: CROP_CALENDARS,
  operations: FIELD_OPERATIONS,
  plans: PLANS,
  reports: [],
  contributionRules: CONTRIBUTION_RULES,
  payments: CONTRIBUTION_PAYMENTS,
  meetings: MEETINGS,
};

const listeners = new Set<() => void>();
const set = (patch: Partial<State> | ((s: State) => Partial<State>)) => {
  state = { ...state, ...(typeof patch === "function" ? patch(state) : patch) };
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
export const getState = () => state;
/** Coopératives : lues dans le store (modifiables), jamais dans la liste figée du jeu de données. */
export const useScoops = () => useStore((s) => s.scoops);
/** Campagnes : lues dans le store (modifiables), jamais dans la liste figée du jeu de données. */
export const useCampaigns = () => useStore((s) => s.campaigns);
export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => sel(state),
    () => sel(state),
  );
}

/** `scoopId` : SCOOP concernée ; à défaut, celle de la session quand elle est limitée à une SCOOP. */
function audit(action: string, entity: string, detail: string, scoopId?: string) {
  const user = state.session?.name ?? "Système";
  const scoop = scoopId ?? state.session?.scope.scoopId;
  const auditId = nextId("au", state.audit);
  set((s) => ({
    audit: [
      {
        id: auditId,
        at: new Date().toISOString(),
        user,
        action,
        entity,
        detail,
        ...(scoop !== undefined && { scoopId: scoop }),
      },
      ...s.audit,
    ],
  }));
}

const SESSION_KEY = "mbd.session";
/** Seul ce qui identifie la session est conservé : droits et périmètre sont recalculés à la restauration. */
type StoredSession = Pick<Session, "name" | "email" | "role" | "expiresAt">;
const isRole = (v: unknown): v is RoleId => typeof v === "string" && v in ROLE_LABEL;
/** Le périmètre vient du compte (`scoopIds` d'un technicien, sinon sa `scoopId`) ; à défaut, de la démonstration. */
const buildSession = ({ name, email, role, expiresAt }: StoredSession): Session => {
  const user = state.users.find((u) => u.email === email);
  const ids = user?.scoopIds ?? (user?.scoopId ? [user.scoopId] : undefined);
  return { name, email, role, expiresAt, ...fetchMyPermissions(role, ids) };
};

// ============ Aides des actions du circuit de validation ============

const MAX_DOCUMENT_KB = 5 * 1024;
/** Échec d'une action : le message est traduit dans la langue en cours au moment de l'appel. */
const fail = (key: MessageKey, params?: TranslateParams): { ok: false; error: string } => ({
  ok: false,
  error: tNow(key, params),
});
/** Garde commune des actions : l'échec à renvoyer, ou `null` quand le droit est présent (voir `checkAccess`). */
function access(
  permission: Permission | readonly Permission[],
): { ok: false; error: string } | null {
  const result = checkAccess(state.session, permission);
  return result.ok ? null : fail(result.key);
}
/** Refus d'une action qui ne renvoie pas de résultat (identifiant, nombre, sauvegarde) : l'appel échoue franchement. */
export class AccessDeniedError extends Error {
  constructor(readonly key: MessageKey) {
    super(key);
    this.name = "AccessDeniedError";
  }
}
function requirePermission(permission: Permission | readonly Permission[]): void {
  const result = checkAccess(state.session, permission);
  if (!result.ok) throw new AccessDeniedError(result.key);
}
/** Une coopérative archivée garde ses données mais ne reçoit plus rien de nouveau. */
const isArchived = (scoopId: string) => !!state.scoops.find((x) => x.id === scoopId)?.archived;
const scoopName = (id: string | undefined) =>
  state.scoops.find((s) => s.id === id)?.name ?? "toutes";

const idCounters = new Map<string, number>();
/**
 * Prochain identifiant `<préfixe><n>` : plus grand que tout numéro existant ET que tout numéro déjà donné
 * dans cette session, pour qu'un objet supprimé ne cède jamais son identifiant à un autre.
 */
function nextId(prefix: string, items: { id: string }[]) {
  const max = items.reduce((m, i) => Math.max(m, Number(/(\d+)$/.exec(i.id)?.[1] ?? 0)), 0);
  const n = Math.max(max, idCounters.get(prefix) ?? 0) + 1;
  idCounters.set(prefix, n);
  return `${prefix}${n}`;
}

/** Personne connectée : l'e-mail l'identifie de façon stable (séparation des tâches, journal). */
function actor() {
  const session = state.session;
  return session ? { session, name: session.name, email: session.email, role: session.role } : null;
}
type Actor = NonNullable<ReturnType<typeof actor>>;

/** Une réunion de son périmètre, avec la personne connectée. */
function meetingOf(
  id: string,
): { ok: true; meeting: Meeting; who: Actor } | { ok: false; error: string } {
  const who = actor();
  const meeting = state.meetings.find((m) => m.id === id);
  if (!who || !meeting) return fail("errors.meeting.notFound");
  if (!inScope([meeting], who.session).length) return fail("errors.meeting.scope");
  return { ok: true, meeting, who };
}

const dossierEvent = (who: Actor, action: DossierAction, comment?: string): DossierEvent => ({
  at: new Date().toISOString(),
  by: who.name,
  byEmail: who.email,
  action,
  comment,
});

/** Dossier modifiable par son créateur uniquement, tant qu'il est brouillon ou en complément demandé. */
function ownEditable(
  id: string,
): { ok: true; dossier: ProducerDossier; who: Actor } | { ok: false; error: string } {
  const who = actor();
  const dossier = state.dossiers.find((d) => d.id === id);
  if (!who || !dossier) return fail("errors.store.dossierIntrouvable");
  if (!inScope([dossier], who.session).length) return fail("errors.store.ceDossierEstHorsDe");
  if (dossier.createdByEmail !== who.email) return fail("errors.store.seulLeTechnicienQuiA");
  if (!isEditable(dossier)) return fail("errors.store.ceDossierNEstPlus");
  return { ok: true, dossier, who };
}

/** Passage d'état par la coopérative (examen, complément demandé). */
function moveDossier(
  id: string,
  to: ProducerDossier["status"],
  action: DossierAction,
  comment?: string,
): ActionResult {
  const who = actor();
  const dossier = state.dossiers.find((d) => d.id === id);
  if (!who || !dossier) return fail("errors.store.dossierIntrouvable");
  if (!inScope([dossier], who.session).length) return fail("errors.store.ceDossierEstHorsDe");
  if (!canTransition(dossier.status, to))
    return fail("errors.store.transition", { from: dossier.status, to });
  set((s) => ({
    dossiers: s.dossiers.map((d) =>
      d.id === id
        ? {
            ...d,
            status: to,
            updatedAt: new Date().toISOString(),
            history: [...d.history, dossierEvent(who, action, comment)],
          }
        : d,
    ),
  }));
  audit(`Dossier : ${action}`, `Dossier ${id}`, comment ?? "", dossier.scoopId);
  return { ok: true };
}

/** Fiche producteur créée à l'approbation : validée par la coopérative, sans parcelle ni culture pour l'instant. */
function producerFromDraft(d: ProducerDossier, approver: string, at: string): Producer {
  // Numéro suivant dans la coopérative : le plus grand « N… » déjà donné plus un (jamais le nombre de lignes).
  const re = new RegExp(`^NIA-${d.scoopId.toUpperCase()}-N(\\d+)$`);
  const n = state.producers.reduce((m, p) => Math.max(m, Number(re.exec(p.code)?.[1] ?? 0)), 0) + 1;
  const draft = d.draft;
  return {
    id: nextId("p", state.producers),
    code: `NIA-${d.scoopId.toUpperCase()}-N${String(n).padStart(4, "0")}`,
    firstName: draft.firstName.trim(),
    lastName: draft.lastName.trim(),
    sex: draft.sex,
    age: draft.age,
    handicap: false,
    phone: draft.phone.trim(),
    cni: draft.cni.replace(/\D/g, ""),
    village: draft.village,
    scoopId: d.scoopId,
    orgId: draft.orgId,
    status: draft.createMember ? "membre" : "recensé",
    quality: "validé",
    crops: [],
    createdAt: at,
    enumerator: d.createdBy,
    history: [{ at, by: approver, field: "Création", from: "", to: `Dossier ${d.id} approuvé` }],
  };
}

export const actions = {
  restoreSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return;
      // Hors mode démonstration, le navigateur ne suffit pas à ouvrir une session : elle vient du serveur.
      if (!DEMO_MODE) {
        localStorage.removeItem(SESSION_KEY);
        return;
      }
      const s = JSON.parse(raw) as Partial<StoredSession>;
      if (
        typeof s.name === "string" &&
        typeof s.email === "string" &&
        typeof s.expiresAt === "number" &&
        s.expiresAt > Date.now()
      ) {
        // Le rôle se relit dans les comptes : on ne croit jamais celui qui est écrit dans le stockage du navigateur.
        const user = state.users.find((u) => u.email.toLowerCase() === s.email!.toLowerCase());
        if (!user || !user.active || !isRole(user.role)) {
          localStorage.removeItem(SESSION_KEY);
          return;
        }
        set({
          session: buildSession({
            name: s.name,
            email: s.email,
            role: user.role,
            expiresAt: s.expiresAt,
          }),
        });
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
  },
  login(name: string, email: string, role: RoleId) {
    const stored: StoredSession = { name, email, role, expiresAt: Date.now() + TOKEN_MS };
    localStorage.setItem(SESSION_KEY, JSON.stringify(stored));
    set({ session: buildSession(stored) });
    audit("Connexion", "Session", `Profil ${role}`);
  },
  logout() {
    if (state.session) audit("Déconnexion", "Session", state.session.role);
    localStorage.removeItem(SESSION_KEY);
    set({ session: null });
  },
  switchRole(role: RoleId) {
    // Changer de profil n'existe que dans la démonstration.
    if (!DEMO_MODE) return;
    const s = state.session;
    if (!s) return;
    actions.login(s.name, s.email, role);
  },
  audit,
  setYouthMaxAge(n: number) {
    requirePermission("config.manage");
    audit("Référentiel", "Définition « jeune »", `${state.youthMaxAge} → ${n} ans`);
    set({ youthMaxAge: n });
  },
  revealCni(p: Producer, reason = "") {
    requirePermission("cni.read");
    const motif = reason.trim();
    if (motif.length < 3) throw new Error("Motif de révélation CNI trop court (3 caractères min.).");
    audit("Révélation CNI", `Producteur ${p.code}`, motif);
  },
  updateProducer(id: string, patch: Partial<Producer>, labels: Record<string, [string, string]>) {
    requirePermission("producer.edit");
    const by = state.session?.name ?? "Inconnu";
    set((s) => ({
      producers: s.producers.map((p) =>
        p.id === id
          ? {
              ...p,
              ...patch,
              history: [
                ...Object.entries(labels).map(([field, [from, to]]) => ({
                  at: new Date().toISOString(),
                  by,
                  field,
                  from,
                  to,
                })),
                ...p.history,
              ],
            }
          : p,
      ),
    }));
    const p = state.producers.find((x) => x.id === id);
    audit("Modification", `Producteur ${p?.code}`, Object.keys(labels).join(", "));
  },
  qualifyOrgs(ids: string[], type: OrgType) {
    requirePermission("org.manage");
    set((s) => ({ orgs: s.orgs.map((o) => (ids.includes(o.id) ? { ...o, type } : o)) }));
    audit("Qualification", `${ids.length} organisation(s)`, `Type attribué : ${type}`);
  },
  classifyCase(id: string, status: CaseStatus, comment: string) {
    requirePermission("quality.review");
    set((s) => ({ cases: s.cases.map((c) => (c.id === id ? { ...c, status, comment } : c)) }));
    audit("Classement doublon", `Cas ${id.toUpperCase()}`, `${status} : ${comment}`);
  },
  mergeCase(id: string, comment: string) {
    requirePermission("quality.merge");
    const c = state.cases.find((x) => x.id === id);
    if (!c || c.status === "fusionné") return;
    const b = state.producers.find((p) => p.id === c.bId);
    if (!b) return;
    const plotIds = state.plots.filter((pl) => pl.producerId === b.id).map((pl) => pl.id);
    set((s) => ({
      merges: { ...s.merges, [id]: { caseId: id, b, plotIds, prevStatus: c.status } },
      producers: s.producers.map((p) => (p.id === b.id ? { ...p, mergedInto: c.aId } : p)),
      plots: s.plots.map((pl) => (plotIds.includes(pl.id) ? { ...pl, producerId: c.aId } : pl)),
      cases: s.cases.map((x) => (x.id === id ? { ...x, status: "fusionné", comment } : x)),
    }));
    audit(
      "Fusion",
      `Cas ${id.toUpperCase()}`,
      `${b.code} fusionné dans la fiche principale, identifiants d'origine conservés`,
    );
  },
  undoMerge(id: string) {
    requirePermission("quality.merge");
    const m = state.merges[id];
    if (!m) return;
    set((s) => {
      const merges = { ...s.merges };
      delete merges[id];
      return {
        merges,
        producers: s.producers.map((p) => (p.id === m.b.id ? m.b : p)),
        plots: s.plots.map((pl) =>
          m.plotIds.includes(pl.id) ? { ...pl, producerId: m.b.id } : pl,
        ),
        cases: s.cases.map((x) =>
          x.id === id ? { ...x, status: m.prevStatus, comment: undefined } : x,
        ),
      };
    });
    audit(
      "Annulation fusion",
      `Cas ${id.toUpperCase()}`,
      "État initial restauré, parcelles comprises",
    );
  },
  updateAlerts(ids: string[], status: AlertStatus, comment: string) {
    requirePermission("alert.manage");
    set((s) => ({
      alerts: s.alerts.map((a) => (ids.includes(a.id) ? { ...a, status, comment } : a)),
    }));
    audit("Traitement alertes", `${ids.length} alerte(s)`, `${status} : ${comment}`);
  },
  reviewPlot(id: string, status: "validée" | "à reprendre", reason?: string) {
    requirePermission("plot.validate");
    set((s) => ({
      plots: s.plots.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              reason,
              versions: [
                {
                  at: new Date().toISOString(),
                  label: status === "validée" ? "Géométrie validée" : `À reprendre : ${reason}`,
                },
                ...p.versions,
              ],
            }
          : p,
      ),
    }));
    const p = state.plots.find((x) => x.id === id);
    audit(
      status === "validée" ? "Validation parcelle" : "Reprise demandée",
      `Parcelle ${p?.code}`,
      reason ?? "",
    );
  },
  addUser(u: Omit<AppUser, "id" | "active">) {
    requirePermission("user.manage");
    const id = nextId("u", state.users);
    set((s) => ({ users: [...s.users, { ...u, id, active: true }] }));
    audit("Création utilisateur", "Utilisateur", u.name);
  },
  toggleUser(id: string) {
    requirePermission("user.manage");
    set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, active: !u.active } : u)) }));
    const u = state.users.find((x) => x.id === id);
    audit(u?.active ? "Réactivation" : "Désactivation", "Utilisateur", u?.name ?? "");
    // Désactiver son propre compte ferme la session en cours.
    if (u && !u.active && state.session?.email.toLowerCase() === u.email.toLowerCase())
      actions.logout();
  },
  addImport(b: ImportBatch) {
    requirePermission("import.manage");
    set((s) => ({ imports: [b, ...s.imports] }));
    audit(b.mode === "réel" ? "Import réel" : "Import à blanc", `Lot ${b.id}`, b.file);
  },
  submitCorrection(producerId: string, changes: CorrectionChange[], motif: string) {
    requirePermission("producer.read");
    const p = state.producers.find((x) => x.id === producerId);
    if (!p || !changes.length) return;
    const r: CorrectionRequest = {
      id: nextId("c", state.corrections),
      producerId,
      requester: state.session?.name ?? "Inconnu",
      requestedAt: new Date().toISOString(),
      motif,
      changes,
      status: "en attente",
    };
    set((s) => ({ corrections: [r, ...s.corrections] }));
    audit("Demande de correction", `Producteur ${p.code}`, `${changes.length} champ(s) : ${motif}`);
  },
  decideCorrection(id: string, approved: boolean, comment: string) {
    requirePermission("correction.manage");
    const r = state.corrections.find((x) => x.id === id);
    if (!r || r.status !== "en attente") return;
    if (approved) {
      const patch: Partial<Producer> = {};
      const labels: Record<string, [string, string]> = {};
      r.changes.forEach((c) => {
        if (c.field === "Téléphone") patch.phone = c.to;
        else if (c.field === "Âge") patch.age = Number(c.to);
        else if (c.field === "Statut d'adhésion") patch.status = c.to as Producer["status"];
        else if (c.field === "Prénom") patch.firstName = c.to;
        else if (c.field === "Nom") patch.lastName = c.to;
        labels[c.field] = [c.from, c.to];
      });
      const by = state.session?.name ?? "Inconnu";
      set((s) => ({
        producers: s.producers.map((p) =>
          p.id === r.producerId
            ? {
                ...p,
                ...patch,
                history: [
                  ...Object.entries(labels).map(([field, [from, to]]) => ({
                    at: new Date().toISOString(),
                    by,
                    field,
                    from,
                    to,
                  })),
                  ...p.history,
                ],
              }
            : p,
        ),
      }));
    }
    set((s) => ({
      corrections: s.corrections.map((c) =>
        c.id === id
          ? {
              ...c,
              status: approved ? ("approuvée" as const) : ("refusée" as const),
              decidedBy: state.session?.name ?? "Inconnu",
              decidedAt: new Date().toISOString(),
              decisionComment: comment,
            }
          : c,
      ),
    }));
    const p = state.producers.find((x) => x.id === r.producerId);
    audit(
      approved ? "Approbation correction" : "Refus correction",
      `Producteur ${p?.code}`,
      `${r.changes.length} champ(s) : ${comment}`,
    );
  },
  confirmLink(userId: string, producerId: string) {
    requirePermission("account.manage");
    const c = state.linkCandidates.find((x) => x.userId === userId && x.producerId === producerId);
    if (!c) return;
    const u = state.users.find((x) => x.id === userId);
    const p = state.producers.find((x) => x.id === producerId);
    set((s) => ({
      linkCandidates: s.linkCandidates.filter((x) => x.id !== c.id),
      links: [
        ...s.links,
        {
          id: nextId("l", s.links),
          userId,
          producerId,
          linkedAt: new Date().toISOString(),
          by: state.session?.name ?? "Inconnu",
        },
      ],
    }));
    audit(
      "Liaison compte↔producteur",
      "Compte",
      `${u?.name} ↔ ${p?.code} (confirmée manuellement)`,
    );
  },
  rejectLink(id: string) {
    requirePermission("account.manage");
    const c = state.linkCandidates.find((x) => x.id === id);
    if (!c) return;
    set((s) => ({ linkCandidates: s.linkCandidates.filter((x) => x.id !== id) }));
    const u = state.users.find((x) => x.id === c.userId);
    audit("Correspondance écartée", "Compte", u?.name ?? "");
  },
  unlinkLink(id: string) {
    requirePermission("account.manage");
    const l = state.links.find((x) => x.id === id);
    if (!l) return;
    set((s) => ({ links: s.links.filter((x) => x.id !== id) }));
    const u = state.users.find((x) => x.id === l.userId);
    audit("Délier compte↔producteur", "Compte", u?.name ?? "");
  },
  revokeDevice(id: string) {
    requirePermission("device.manage");
    set((s) => ({ devices: s.devices.map((d) => (d.id === id ? { ...d, active: false } : d)) }));
    const d = state.devices.find((x) => x.id === id);
    audit("Révocation appareil (simulation)", "Appareil", d?.label ?? "");
  },
  reactivateDevice(id: string) {
    requirePermission("device.manage");
    set((s) => ({ devices: s.devices.map((d) => (d.id === id ? { ...d, active: true } : d)) }));
    const d = state.devices.find((x) => x.id === id);
    audit("Réactivation appareil (simulation)", "Appareil", d?.label ?? "");
  },
  renameDevice(id: string, label: string) {
    requirePermission("device.manage");
    const before = state.devices.find((x) => x.id === id)?.label ?? "";
    set((s) => ({ devices: s.devices.map((d) => (d.id === id ? { ...d, label } : d)) }));
    audit("Renommage appareil", "Appareil", `${before} → ${label}`);
  },
  /** Simulations : en production, ces ordres partent vers le service de synchronisation mobile. */
  resyncDevice(id: string) {
    requirePermission("device.manage");
    const d = state.devices.find((x) => x.id === id);
    audit("Resynchronisation demandée (simulation)", "Appareil", d?.label ?? "");
  },
  signOutDevice(id: string) {
    requirePermission("device.manage");
    const d = state.devices.find((x) => x.id === id);
    audit("Déconnexion forcée (simulation)", "Appareil", d?.label ?? "");
  },
  linkManually(userId: string, producerId: string) {
    requirePermission("account.manage");
    const u = state.users.find((x) => x.id === userId);
    const p = state.producers.find((x) => x.id === producerId);
    if (!u || !p || state.links.some((l) => l.userId === userId || l.producerId === producerId))
      return false;
    set((s) => ({
      linkCandidates: s.linkCandidates.filter((x) => x.userId !== userId),
      links: [
        ...s.links,
        {
          id: nextId("l", s.links),
          userId,
          producerId,
          linkedAt: new Date().toISOString(),
          by: state.session?.name ?? "Inconnu",
        },
      ],
    }));
    audit("Liaison compte↔producteur", "Compte", `${u.name} ↔ ${p.code} (rapprochement manuel)`);
    return true;
  },
  setCropFamily(crop: string, family: CropFamily) {
    requirePermission("config.manage");
    set((s) => ({ cropRefs: s.cropRefs.map((r) => (r.name === crop ? { ...r, family } : r)) }));
    audit("Référentiel cultures", crop, `Famille : ${family}`);
  },
  attachAlias(alias: string, crop: string) {
    requirePermission("config.manage");
    set((s) => ({ cropAliases: s.cropAliases.filter((a) => a !== alias) }));
    audit("Référentiel cultures", "Alias rattaché", `${alias} → ${crop}`);
  },
  /** Écrit un import à blanc validé : entités, alertes, doublons candidats, noms de cultures inconnus, lot. */
  ingestImport(plan: ImportPlan, batch: ImportBatch) {
    requirePermission("import.manage");
    set((s) => ({
      orgs: [...s.orgs, ...plan.orgs.filter((o) => !s.orgs.some((x) => x.id === o.id))],
      producers: [...s.producers, ...plan.producers],
      plots: [...s.plots, ...plan.plots],
      alerts: [...plan.alerts, ...s.alerts],
      cases: [...plan.cases, ...s.cases],
      cropAliases: [
        ...s.cropAliases,
        ...plan.unknownCrops.filter((c) => !s.cropAliases.includes(c)),
      ],
      imports: [batch, ...s.imports],
    }));
    audit(
      "Import réel",
      `Lot ${batch.id}`,
      `${batch.file} : ${plan.producers.length} producteur(s), ${plan.plots.length} parcelle(s), ${plan.orgs.length} organisation(s)`,
    );
  },
  /** Sauvegarde complète des données (hors session) — format JSON versionné. */
  exportSnapshot(): Snapshot {
    requirePermission("data.backup");
    const { session: _session, ...data } = state;
    audit("Sauvegarde complète", "Données", "Export JSON");
    return {
      format: SNAPSHOT_FORMAT,
      exportedAt: new Date().toISOString(),
      data: { ...data, audit: state.audit },
    };
  },
  restoreSnapshot(snap: Snapshot) {
    requirePermission("data.backup");
    // Une sauvegarde incomplète ou abîmée mélangerait ancien et nouvel état : on la refuse en bloc.
    if (!isSnapshot(snap)) throw new Error("Format de sauvegarde non reconnu");
    // Une sauvegarde plus ancienne n'a pas les entités de la coopérative : on repart de listes vides.
    set({
      ...snap.data,
      // `?? []` : les sauvegardes plus anciennes n'ont pas ces listes à l'exécution, même si le type les exige.
      members: snap.data.members ?? [],
      dossiers: snap.data.dossiers ?? [],
      documents: snap.data.documents ?? [],
      plans: snap.data.plans ?? [],
      reports: snap.data.reports ?? [],
      scoops: snap.data.scoops ?? SCOOPS,
      campaigns: snap.data.campaigns ?? CAMPAIGN_LIST,
      expenses: snap.data.expenses ?? EXPENSES,
      inputItems: snap.data.inputItems ?? INPUT_ITEMS,
      stockLots: snap.data.stockLots ?? STOCK_LOTS,
      stockMovements: snap.data.stockMovements ?? STOCK_MOVEMENTS,
      credits: snap.data.credits ?? CREDITS,
      repayments: snap.data.repayments ?? REPAYMENTS,
      sales: snap.data.sales ?? SALES,
      calendars: snap.data.calendars ?? CROP_CALENDARS,
      operations: snap.data.operations ?? FIELD_OPERATIONS,
      contributionRules: snap.data.contributionRules ?? [],
      payments: snap.data.payments ?? [],
      meetings: snap.data.meetings ?? [],
      session: state.session,
    });
    audit("Restauration", "Données", `Sauvegarde du ${snap.exportedAt}`);
  },
  // ============ Membres (plan 4.5, P1) ============

  addMember(
    input: Omit<Member, "id" | "history" | "joinedAt" | "age" | "handicap" | "village"> &
      Partial<Pick<Member, "age" | "handicap" | "village">> & { joinedAt?: string | null },
  ) {
    requirePermission("member.manage");
    const id = nextId("m", state.members);
    const by = state.session?.name ?? "Système";
    const member: Member = {
      ...input,
      age: input.age ?? null,
      handicap: input.handicap ?? false,
      village: input.village ?? "",
      id,
      joinedAt: input.joinedAt ?? (input.status === "candidat" ? null : new Date().toISOString()),
      history: [{ at: new Date().toISOString(), by, action: "créé" }],
    };
    set((s) => ({ members: [...s.members, member] }));
    audit(
      "Création membre",
      `Membre ${member.firstName} ${member.lastName}`,
      member.status,
      member.scoopId,
    );
    return id;
  },
  updateMember(
    id: string,
    patch: Partial<
      Pick<Member, "orgId" | "phone" | "email" | "producerId" | "age" | "handicap" | "village">
    >,
  ) {
    requirePermission("member.manage");
    const m = state.members.find((x) => x.id === id);
    if (!m) return false;
    const by = state.session?.name ?? "Système";
    set((s) => ({
      members: s.members.map((x) =>
        x.id === id
          ? {
              ...x,
              ...patch,
              history: [{ at: new Date().toISOString(), by, action: "modifié" }, ...x.history],
            }
          : x,
      ),
    }));
    audit(
      "Modification membre",
      `Membre ${m.firstName} ${m.lastName}`,
      Object.keys(patch).join(", "),
      m.scoopId,
    );
    return true;
  },
  /** Le statut dans la coopérative ne change aucun droit dans l'application et ne touche pas à la fiche producteur. */
  setMembershipStatus(id: string, status: MembershipStatus, comment?: string) {
    requirePermission("member.manage");
    const m = state.members.find((x) => x.id === id);
    if (!m || m.status === status) return false;
    const by = state.session?.name ?? "Système";
    const at = new Date().toISOString();
    set((s) => ({
      members: s.members.map((x) =>
        x.id === id
          ? {
              ...x,
              status,
              joinedAt: x.joinedAt ?? (status === "membre" ? at : null),
              history: [
                { at, by, action: `statut : ${m.status} vers ${status}`, comment },
                ...x.history,
              ],
            }
          : x,
      ),
    }));
    audit(
      "Statut de membre",
      `Membre ${m.firstName} ${m.lastName}`,
      `${m.status} vers ${status}`,
      m.scoopId,
    );
    // Suspendre ou sortir un membre ferme son accès ; le rouvrir demande une attribution explicite.
    if (status === "suspendu" || status === "sorti") {
      const linked = state.users.filter((u) => u.memberId === id && u.active);
      if (linked.length) {
        set((s) => ({
          users: s.users.map((u) => (u.memberId === id ? { ...u, active: false } : u)),
        }));
        audit("Accès fermé", `Membre ${m.firstName} ${m.lastName}`, `statut ${status}`, m.scoopId);
      }
    }
    return true;
  },

  /**
   * Attribue (ou change) le rôle d'un membre : crée son compte si besoin. Règles : le rôle doit être attribuable
   * par le rôle de la session, le membre doit être en règle et avoir une adresse e-mail, et personne ne modifie
   * ses propres accès.
   */
  grantAccess(memberId: string, role: RoleId): ActionResult<{ userId: string }> {
    const denied = access("role.assign");
    if (denied) return denied;
    const who = actor();
    const member = state.members.find((m) => m.id === memberId);
    if (!who || !member) return fail("errors.store.membreIntrouvable");
    if (!inScope([member], who.session).length) return fail("errors.store.ceMembreEstHorsDe");
    if (isArchived(member.scoopId)) return fail("errors.scoop.archived");
    if (!assignableRoles(who.role).includes(role)) return fail("errors.store.votreRoleNePermetPas");
    if (member.email.trim().toLowerCase() === who.email.toLowerCase())
      return fail("errors.store.vousNePouvezPasModifier");
    const blocked = accountBlocker(member);
    if (blocked) return { ok: false, error: blocked };
    const existing = state.users.find(
      (u) => u.email.toLowerCase() === member.email.trim().toLowerCase(),
    );
    // Un compte qui existe déjà n'est modifiable que s'il est celui de ce membre, et seulement dans la limite des rôles
    // que la personne connectée peut attribuer : on ne rétrograde pas un compte de rang supérieur.
    if (existing && existing.memberId !== memberId)
      return fail("errors.store.cetteAdresseEMailEst");
    if (existing && !assignableRoles(who.role).includes(existing.role))
      return fail("errors.store.votreRoleNePermetPas");
    const id = existing?.id ?? nextId("u", state.users);
    const user: AppUser = {
      id,
      name: `${member.firstName} ${member.lastName}`,
      email: member.email.trim(),
      phone: member.phone,
      role,
      ...(role === "technicien" ? { scoopIds: [member.scoopId] } : { scoopId: member.scoopId }),
      memberId,
      active: true,
    };
    set((s) => ({
      users: existing ? s.users.map((u) => (u.id === id ? user : u)) : [...s.users, user],
    }));
    audit(
      existing ? "Rôle modifié" : "Accès attribué",
      `Membre ${user.name}`,
      role,
      member.scoopId,
    );
    return { ok: true, userId: id };
  },
  /** Retire l'accès à l'application sans toucher au statut de membre ni à la fiche producteur. */
  revokeAccess(memberId: string): ActionResult {
    const denied = access("role.assign");
    if (denied) return denied;
    const who = actor();
    const member = state.members.find((m) => m.id === memberId);
    if (!who || !member) return fail("errors.store.membreIntrouvable");
    if (!inScope([member], who.session).length) return fail("errors.store.ceMembreEstHorsDe");
    if (assignableRoles(who.role).length === 0) return fail("errors.store.votreRoleNePermetPas2");
    if (member.email.trim().toLowerCase() === who.email.toLowerCase())
      return fail("errors.store.vousNePouvezPasModifier");
    const user = state.users.find((u) => u.memberId === memberId && u.active);
    if (!user) return fail("errors.store.ceMembreNAPas");
    if (!assignableRoles(who.role).includes(user.role))
      return fail("errors.store.votreRoleNePermetPas3");
    set((s) => ({ users: s.users.map((u) => (u.id === user.id ? { ...u, active: false } : u)) }));
    audit("Accès retiré", `Membre ${user.name}`, user.role, member.scoopId);
    return { ok: true };
  },

  // ============ Dossiers producteurs (plan 4.5.8) ============

  createDossier(scoopId: string, draft: DossierDraft): ActionResult<{ id: string }> {
    const denied = access("dossier.create");
    if (denied) return denied;
    if (isArchived(scoopId)) return fail("errors.scoop.archived");
    const who = actor();
    if (!who) return fail("errors.store.connectezVousPourCreerUn");
    if (!inScope([{ scoopId }], who.session).length)
      return fail("errors.store.cetteScoopEstHorsDe");
    const id = nextId("dos", state.dossiers);
    const at = new Date().toISOString();
    const dossier: ProducerDossier = {
      id,
      scoopId,
      createdBy: who.name,
      createdByEmail: who.email,
      createdAt: at,
      updatedAt: at,
      submittedAt: null,
      submittedByEmail: null,
      status: "brouillon",
      draft,
      documentIds: [],
      history: [dossierEvent(who, "créé")],
      possibleDuplicateOf: null,
      producerId: null,
      decision: null,
      remindedAt: null,
    };
    set((s) => ({ dossiers: [...s.dossiers, dossier] }));
    audit("Dossier créé", `Dossier ${id}`, `${draft.firstName} ${draft.lastName}`, scoopId);
    return { ok: true, id };
  },
  updateDossier(id: string, patch: Partial<DossierDraft>): ActionResult {
    const denied = access("dossier.create");
    if (denied) return denied;
    const found = ownEditable(id);
    if (!found.ok) return found;
    const { dossier, who } = found;
    set((s) => ({
      dossiers: s.dossiers.map((d) =>
        d.id === id
          ? {
              ...d,
              draft: { ...d.draft, ...patch },
              updatedAt: new Date().toISOString(),
              history: [...d.history, dossierEvent(who, "modifié")],
            }
          : d,
      ),
    }));
    audit("Dossier modifié", `Dossier ${id}`, Object.keys(patch).join(", "), dossier.scoopId);
    return { ok: true };
  },
  addDocument(
    dossierId: string,
    input: { kind: DocumentKind; name: string; sizeKb: number; mime: string; sensitive?: boolean },
  ): ActionResult<{ id: string }> {
    const denied = access(["dossier.create", "dossier.review"]);
    if (denied) return denied;
    const found = ownEditable(dossierId);
    if (!found.ok) return found;
    const { dossier, who } = found;
    if (input.sizeKb > MAX_DOCUMENT_KB)
      return fail("errors.store.documentTooBig", { mb: MAX_DOCUMENT_KB / 1024 });
    const id = nextId("doc", state.documents);
    const doc: DocumentMeta = {
      id,
      ownerType: "dossier",
      ownerId: dossierId,
      scoopId: dossier.scoopId,
      kind: input.kind,
      name: input.name,
      sizeKb: input.sizeKb,
      mime: input.mime,
      uploadedBy: who.name,
      uploadedAt: new Date().toISOString(),
      sensitive: input.sensitive ?? defaultSensitive(input.kind),
    };
    set((s) => ({
      documents: [...s.documents, doc],
      dossiers: s.dossiers.map((d) =>
        d.id === dossierId
          ? { ...d, documentIds: [...d.documentIds, id], updatedAt: doc.uploadedAt }
          : d,
      ),
    }));
    audit(
      "Pièce ajoutée",
      `Dossier ${dossierId}`,
      `${doc.kind}${doc.sensitive ? ", sensible" : ""}`,
      dossier.scoopId,
    );
    return { ok: true, id };
  },
  removeDocument(docId: string): ActionResult {
    const denied = access(["dossier.create", "dossier.review"]);
    if (denied) return denied;
    const doc = state.documents.find((d) => d.id === docId);
    if (!doc || doc.ownerType !== "dossier") return fail("errors.store.pieceIntrouvable");
    const found = ownEditable(doc.ownerId);
    if (!found.ok) return found;
    set((s) => ({
      documents: s.documents.filter((d) => d.id !== docId),
      dossiers: s.dossiers.map((d) =>
        d.id === doc.ownerId ? { ...d, documentIds: d.documentIds.filter((x) => x !== docId) } : d,
      ),
    }));
    audit("Pièce retirée", `Dossier ${doc.ownerId}`, doc.kind, doc.scoopId);
    return { ok: true };
  },
  /** Soumission : contrôles bloquants, puis signalement (sans blocage) d'un doublon possible. */
  submitDossier(id: string): ActionResult<{ possibleDuplicateOf: string | null }> {
    const denied = access("dossier.submit");
    if (denied) return denied;
    const found = ownEditable(id);
    if (!found.ok) return found;
    const { dossier, who } = found;
    const issues = validateDraft(dossier.draft, dossier.documentIds.length);
    if (issues.length)
      return { ok: false, error: tNow("errors.store.leDossierEstIncomplet"), issues };
    const duplicate = findDuplicate(dossier.draft, state.producers);
    const at = new Date().toISOString();
    const events: DossierEvent[] = [];
    if (dossier.status === "complément demandé")
      events.push(dossierEvent(who, "complément fourni"));
    events.push(dossierEvent(who, "soumis"));
    set((s) => ({
      dossiers: s.dossiers.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "soumis" as const,
              submittedAt: at,
              submittedByEmail: who.email,
              updatedAt: at,
              possibleDuplicateOf: duplicate?.producerId ?? null,
              remindedAt: null,
              history: [...d.history, ...events],
            }
          : d,
      ),
    }));
    audit(
      "Dossier soumis",
      `Dossier ${id}`,
      duplicate ? `doublon possible : ${duplicate.reason}` : "aucun doublon détecté",
      dossier.scoopId,
    );
    return { ok: true, possibleDuplicateOf: duplicate?.producerId ?? null };
  },
  startReview(id: string): ActionResult {
    const denied = access("dossier.review");
    if (denied) return denied;
    return moveDossier(id, "en examen", "pris en examen");
  },
  requestComplement(id: string, message: string): ActionResult {
    const denied = access("dossier.review");
    if (denied) return denied;
    if (message.trim().length < 5) return fail("errors.store.precisezCeQuiManque5");
    return moveDossier(id, "complément demandé", "complément demandé", message.trim());
  },
  /**
   * Approbation. Séparation des tâches : qui a créé ou soumis le dossier ne peut pas l'approuver, sauf le rang
   * le plus élevé (décision D12), alors tracé « auto-approuvé ». Si un doublon est signalé, il faut choisir :
   * lier le dossier au producteur existant (`lié`) ou confirmer qu'il s'agit d'une autre personne (`distinct`).
   */
  approveDossier(
    id: string,
    options: { duplicate?: "lié" | "distinct"; createMember?: boolean; comment?: string } = {},
  ): ActionResult<{ producerId: string; memberId: string | null; selfApproved: boolean }> {
    const denied = access("dossier.review");
    if (denied) return denied;
    const who = actor();
    const dossier = state.dossiers.find((d) => d.id === id);
    if (!who || !dossier) return fail("errors.store.dossierIntrouvable");
    if (!inScope([dossier], who.session).length) return fail("errors.store.ceDossierEstHorsDe");
    if (!canDecide(who.role)) return fail("errors.store.laDecisionRevientAuGestionnaire");
    if (!canTransition(dossier.status, "approuvé")) return fail("errors.store.ceDossierNePeutPlus");
    const check = decisionCheck(dossier, who);
    if (!check.ok) return check;
    if (dossier.possibleDuplicateOf && !options.duplicate)
      return fail("errors.store.unDoublonPossibleEstSignale");

    const at = new Date().toISOString();
    const linked = options.duplicate === "lié" ? dossier.possibleDuplicateOf : null;
    let producerId = linked;
    let created: Producer | null = null;
    if (!producerId) {
      created = producerFromDraft(dossier, who.name, at);
      producerId = created.id;
    }
    // Un producteur n'a qu'un membre : si la fiche liée en a déjà un, on n'en crée pas un second.
    const alreadyMember = state.members.some((m) => m.producerId === producerId);
    const wantMember = (options.createMember ?? dossier.draft.createMember) && !alreadyMember;
    const member: Member | null = wantMember
      ? {
          id: nextId("m", state.members),
          scoopId: dossier.scoopId,
          orgId: dossier.draft.orgId,
          firstName: dossier.draft.firstName,
          lastName: dossier.draft.lastName,
          sex: dossier.draft.sex,
          phone: dossier.draft.phone,
          email: "",
          age: dossier.draft.age,
          handicap: false,
          village: dossier.draft.village,
          status: "membre",
          joinedAt: at,
          producerId,
          history: [{ at, by: who.name, action: `créé à l'approbation du dossier ${id}` }],
        }
      : null;
    const action: DossierAction = check.selfDecided ? "auto-approuvé" : "approuvé";
    set((s) => ({
      producers: created ? [...s.producers, created] : s.producers,
      members: member ? [...s.members, member] : s.members,
      documents: s.documents.map((d) =>
        d.ownerType === "dossier" && d.ownerId === id
          ? { ...d, ownerType: "producteur" as const, ownerId: producerId! }
          : d,
      ),
      dossiers: s.dossiers.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "approuvé" as const,
              producerId,
              updatedAt: at,
              decision: {
                at,
                by: who.name,
                byEmail: who.email,
                approved: true,
                comment: options.comment,
                selfApproved: check.selfDecided,
              },
              history: [
                ...d.history,
                { at, by: who.name, byEmail: who.email, action, comment: options.comment },
              ],
            }
          : d,
      ),
    }));
    audit(
      check.selfDecided ? "Dossier auto-approuvé" : "Dossier approuvé",
      `Dossier ${id}`,
      linked ? "lié au producteur existant" : "producteur créé",
      dossier.scoopId,
    );
    return { ok: true, producerId, memberId: member?.id ?? null, selfApproved: check.selfDecided };
  },
  /** Refus : motif obligatoire (précision libre exigée pour « autre »). Un dossier refusé ne se rouvre pas. */
  refuseDossier(id: string, reason: RefusalReason, comment?: string): ActionResult {
    const denied = access("dossier.review");
    if (denied) return denied;
    const who = actor();
    const dossier = state.dossiers.find((d) => d.id === id);
    if (!who || !dossier) return fail("errors.store.dossierIntrouvable");
    if (!inScope([dossier], who.session).length) return fail("errors.store.ceDossierEstHorsDe");
    if (!canDecide(who.role)) return fail("errors.store.laDecisionRevientAuGestionnaire");
    if (!canTransition(dossier.status, "refusé")) return fail("errors.store.ceDossierNePeutPlus2");
    if (requiresComment(reason) && (comment ?? "").trim().length < 5)
      return fail("errors.store.precisezLeMotifDuRefus");
    const check = decisionCheck(dossier, who);
    if (!check.ok) return check;
    const at = new Date().toISOString();
    set((s) => ({
      dossiers: s.dossiers.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "refusé" as const,
              updatedAt: at,
              decision: {
                at,
                by: who.name,
                byEmail: who.email,
                approved: false,
                reason,
                comment: comment?.trim() || undefined,
                selfApproved: check.selfDecided,
              },
              history: [
                ...d.history,
                {
                  at,
                  by: who.name,
                  byEmail: who.email,
                  action: "refusé" as const,
                  comment: [reason, comment?.trim()].filter(Boolean).join(" : "),
                },
              ],
            }
          : d,
      ),
    }));
    audit("Dossier refusé", `Dossier ${id}`, reason, dossier.scoopId);
    return { ok: true };
  },
  /** Rappel (jamais une approbation automatique) pour les dossiers sans réponse depuis 14 jours. */
  sendDossierReminders(nowIso: string = new Date().toISOString()): number {
    requirePermission("dossier.review");
    const due = dueReminders(state.dossiers, nowIso);
    if (!due.length) return 0;
    const ids = new Set(due.map((d) => d.id));
    set((s) => ({
      dossiers: s.dossiers.map((d) =>
        ids.has(d.id)
          ? {
              ...d,
              remindedAt: nowIso,
              history: [
                ...d.history,
                {
                  at: nowIso,
                  by: "Système",
                  byEmail: "",
                  action: "rappel" as const,
                  comment: "Sans réponse depuis 14 jours",
                },
              ],
            }
          : d,
      ),
    }));
    due.forEach((d) =>
      audit("Rappel de dossier", `Dossier ${d.id}`, "sans réponse depuis 14 jours", d.scoopId),
    );
    return due.length;
  },

  // ============ Documents et téléchargements tracés ============

  /** Trace le téléchargement d'une pièce : utilisateur, SCOOP, objet et heure (droit vérifié par l'interface). */
  downloadDocument(id: string): ActionResult<{ document: DocumentMeta }> {
    const session = state.session;
    // Une pièce hors périmètre (ou hors des dossiers d'un technicien) se comporte comme une pièce inexistante.
    const visible = [
      ...scopedDocuments(state.documents, state.dossiers, session),
      ...scopedLibrary(state.documents, session),
    ];
    const doc = visible.find((d) => d.id === id);
    if (!doc) return fail("errors.store.pieceIntrouvable");
    if (!canDownloadDocument(session, doc)) return fail("errors.store.downloadNotAllowed");
    audit(
      doc.sensitive ? "Téléchargement de pièce sensible" : "Téléchargement de pièce",
      `Document ${doc.name}`,
      `${doc.kind}, SCOOP ${scoopName(doc.scoopId)}`,
      doc.scoopId,
    );
    return { ok: true, document: doc };
  },
  /** Génère un rapport sur le périmètre de la session, le conserve dans l'historique et le trace. */
  generateReport(
    reportId: ReportId,
    params: ReportParams = {},
  ): ActionResult<{ report: GeneratedReport }> {
    const session = state.session;
    if (!session?.permissions.includes("report.generate"))
      return { ok: false, error: tNow("errors.store.vousNAvezPasLe") };
    const scoops = state.scoops;
    if (params.scoopId) {
      const visible = isConsolidated(session) || scoopIdsOf(session).has(params.scoopId);
      if (!visible || !scoops.some((s) => s.id === params.scoopId))
        return { ok: false, error: tNow("errors.store.cetteCooperativeEstHorsDe") };
    }
    const def = REPORTS.find((r) => r.id === reportId);
    if (def?.perm && !session.permissions.includes(def.perm))
      return { ok: false, error: tNow("errors.report.notAllowed") };
    const built = buildReport(
      reportId,
      {
        producers: state.producers,
        plots: state.plots,
        alerts: state.alerts,
        cases: state.cases,
        scoops,
        youthMaxAge: state.youthMaxAge,
        members: state.members,
        payments: state.payments,
        contributionRules: state.contributionRules,
        meetings: state.meetings,
        inputItems: state.inputItems,
        stockLots: state.stockLots,
        stockMovements: state.stockMovements,
        credits: state.credits,
        repayments: state.repayments,
        sales: state.sales,
        expenses: state.expenses,
        plans: state.plans,
        allPlots: state.plots,
      },
      session,
      params,
    );
    const scoopIds = params.scoopId
      ? [params.scoopId]
      : isConsolidated(session)
        ? []
        : [...scoopIdsOf(session)];
    const report: GeneratedReport = {
      ...built,
      id: nextId("r", state.reports),
      reportId,
      scoopIds,
      campaign: params.campaign ?? null,
      generatedBy: session.name,
      generatedByEmail: session.email,
      generatedAt: new Date().toISOString(),
    };
    set((s) => ({ reports: [report, ...s.reports] }));
    audit(
      "Génération rapport",
      built.name,
      `${built.scopeLabel}, ${built.rows.length} ligne(s)`,
      scoopIds.length === 1 ? scoopIds[0] : undefined,
    );
    return { ok: true, report };
  },
  /** Historique lisible par la session (`report.read`), limité à son périmètre. */
  readReports(): GeneratedReport[] {
    if (!state.session?.permissions.includes("report.read")) return [];
    return scopedReports(state.reports, state.session);
  },
  /** Retire du téléchargement un rapport hors périmètre ou sans le droit `report.download` ; sinon trace et rend le rapport. */
  downloadReport(id: string, format: "CSV" | "Excel"): ActionResult<{ report: GeneratedReport }> {
    const session = state.session;
    if (!session?.permissions.includes("report.download"))
      return { ok: false, error: tNow("errors.store.vousNAvezPasLe2") };
    const report = scopedReports(state.reports, session).find((r) => r.id === id);
    if (!report)
      return { ok: false, error: tNow("errors.store.rapportIntrouvableDansVotrePerimetre") };
    audit(
      "Téléchargement de rapport",
      report.name,
      `${report.scopeLabel}, ${format}, généré le ${report.generatedAt.slice(0, 10)}`,
      report.scoopIds.length === 1 ? report.scoopIds[0] : undefined,
    );
    return { ok: true, report };
  },
  recordReportDownload(name: string, scoopId?: string) {
    requirePermission("report.download");
    audit(
      "Téléchargement de rapport",
      name,
      `SCOOP ${scoopName(scoopId ?? state.session?.scope.scoopId)}`,
      scoopId,
    );
  },

  // ============ Plans d'exploitation (plan 4.5, P7) ============

  createPlan(input: {
    scoopId: string;
    producerId: string | null;
    dossierId?: string | null;
    campaign: string;
    lines: PlanLine[];
    notes?: string;
  }): ActionResult<{ id: string }> {
    const denied = access("plan.write");
    if (denied) return denied;
    const who = actor();
    if (!who) return fail("errors.store.connectezVousPourCreerUn2");
    if (!inScope([{ scoopId: input.scoopId }], who.session).length)
      return fail("errors.store.cetteScoopEstHorsDe");
    if (isArchived(input.scoopId)) return fail("errors.scoop.archived");
    const camp = state.campaigns.find((c) => c.name === input.campaign);
    if (camp && !isOpenCampaign(camp)) return fail("errors.campaign.closed");
    if (!input.producerId && !input.dossierId) return fail("errors.store.rattachezLePlanAUn");
    const id = nextId("plan", state.plans);
    const at = new Date().toISOString();
    const plan: ExploitationPlan = {
      id,
      scoopId: input.scoopId,
      producerId: input.producerId,
      dossierId: input.dossierId ?? null,
      campaign: input.campaign,
      lines: input.lines,
      notes: input.notes ?? "",
      status: "brouillon",
      createdBy: who.name,
      createdAt: at,
      updatedAt: at,
      history: [{ at, by: who.name, action: "créé" }],
    };
    set((s) => ({ plans: [...s.plans, plan] }));
    audit("Plan d'exploitation créé", `Plan ${id}`, input.campaign, input.scoopId);
    return { ok: true, id };
  },
  updatePlan(
    id: string,
    patch: Partial<Pick<ExploitationPlan, "lines" | "notes" | "campaign">>,
  ): ActionResult {
    const denied = access("plan.write");
    if (denied) return denied;
    const who = actor();
    const plan = state.plans.find((p) => p.id === id);
    if (!who || !plan) return fail("errors.store.planIntrouvable");
    if (!inScope([plan], who.session).length) return fail("errors.store.cePlanEstHorsDe");
    if (isArchived(plan.scoopId)) return fail("errors.scoop.archived");
    const camp = state.campaigns.find((c) => c.name === plan.campaign);
    if (camp && !isOpenCampaign(camp)) return fail("errors.campaign.closed");
    const at = new Date().toISOString();
    set((s) => ({
      plans: s.plans.map((p) =>
        p.id === id
          ? {
              ...p,
              ...patch,
              status: p.status === "à jour" ? ("validé" as const) : p.status,
              updatedAt: at,
              history: [...p.history, { at, by: who.name, action: "modifié" }],
            }
          : p,
      ),
    }));
    audit("Plan d'exploitation modifié", `Plan ${id}`, Object.keys(patch).join(", "), plan.scoopId);
    return { ok: true };
  },
  setPlanStatus(id: string, status: PlanStatus): ActionResult {
    const denied = access("plan.write");
    if (denied) return denied;
    const who = actor();
    const plan = state.plans.find((p) => p.id === id);
    if (!who || !plan) return fail("errors.store.planIntrouvable");
    if (!inScope([plan], who.session).length) return fail("errors.store.cePlanEstHorsDe");
    if (PLAN_NEXT[plan.status]?.to !== status) return fail("errors.plan.transition");
    const at = new Date().toISOString();
    set((s) => ({
      plans: s.plans.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              updatedAt: at,
              history: [...p.history, { at, by: who.name, action: `statut : ${status}` }],
            }
          : p,
      ),
    }));
    audit("Plan d'exploitation", `Plan ${id}`, `statut : ${status}`, plan.scoopId);
    return { ok: true };
  },
  // ============ Campagnes (plan 4.8, M4-1) ============

  createCampaign(input: CampaignInput): ActionResult<{ id: string }> {
    const who = actor();
    if (!who?.session.permissions.includes("campaign.manage"))
      return fail("errors.campaign.notAllowed");
    const issues = campaignIssues(input, state.campaigns);
    if (issues.length) return { ok: false, error: tNow(issues[0]!.key) };
    const at = new Date().toISOString();
    const campaign: Campaign = {
      id: nextCampaignId(state.campaigns),
      name: input.name.trim(),
      start: input.start,
      end: input.end,
      status: "planifiée",
      createdAt: at,
      history: [{ at, by: who.name, action: "créée" }],
    };
    set((s) => ({ campaigns: [...s.campaigns, campaign] }));
    audit("Campagne créée", `Campagne ${campaign.name}`, `${campaign.start} au ${campaign.end}`);
    return { ok: true, id: campaign.id };
  },
  updateCampaign(id: string, patch: CampaignInput): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("campaign.manage"))
      return fail("errors.campaign.notAllowed");
    const campaign = state.campaigns.find((c) => c.id === id);
    if (!campaign) return fail("errors.campaign.notFound");
    if (!isOpenCampaign(campaign)) return fail("errors.campaign.closed");
    const issues = campaignIssues(patch, state.campaigns, id);
    if (issues.length) return { ok: false, error: tNow(issues[0]!.key) };
    // Le nom sert de clé aux parcelles et aux plans : on le garde tant que des données y renvoient.
    const renamed = patch.name.trim() !== campaign.name;
    const used =
      state.plots.some((p) => p.campaign === campaign.name) ||
      state.plans.some((p) => p.campaign === campaign.name);
    if (renamed && used) return fail("errors.campaign.nameLocked");
    const at = new Date().toISOString();
    set((s) => ({
      campaigns: s.campaigns.map((c) =>
        c.id === id
          ? {
              ...c,
              name: patch.name.trim(),
              start: patch.start,
              end: patch.end,
              history: [...c.history, { at, by: who.name, action: "modifiée" }],
            }
          : c,
      ),
    }));
    audit("Campagne modifiée", `Campagne ${patch.name.trim()}`, "");
    return { ok: true };
  },
  /** Ouvre (planifiée vers en cours) ou clôture une campagne ; une campagne clôturée ne se rouvre pas. */
  setCampaignStatus(id: string, status: CampaignStatus): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("campaign.manage"))
      return fail("errors.campaign.notAllowed");
    const campaign = state.campaigns.find((c) => c.id === id);
    if (!campaign) return fail("errors.campaign.notFound");
    if (!canCampaignTransition(campaign.status, status)) return fail("errors.campaign.transition");
    const at = new Date().toISOString();
    set((s) => ({
      campaigns: s.campaigns.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              history: [...c.history, { at, by: who.name, action: `état : ${status}` }],
            }
          : c,
      ),
    }));
    audit("Campagne", `Campagne ${campaign.name}`, `${campaign.status} vers ${status}`);
    return { ok: true };
  },

  // ============ Calendriers culturaux (plan 4.8, M4-2) ============

  /** Nouveau brouillon pour une culture : un semis au jour 0 et une récolte, à compléter. */
  createCalendar(crop: string): ActionResult<{ id: string }> {
    const who = actor();
    if (!who?.session.permissions.includes("calendar.write"))
      return fail("errors.calendar.notAllowed");
    if (state.calendars.some((c) => c.crop === crop && c.status === "brouillon"))
      return fail("errors.calendar.exists");
    const at = new Date().toISOString();
    const version =
      Math.max(0, ...state.calendars.filter((c) => c.crop === crop).map((c) => c.version)) + 1;
    const calendar: CropCalendar = {
      id: nextId("cal", state.calendars),
      crop,
      version,
      status: "brouillon",
      steps: [
        { id: "n1", kind: "semis", offsetDays: 0, durationDays: 1, note: "" },
        { id: "n2", kind: "récolte", offsetDays: 90, durationDays: 7, note: "" },
      ],
      createdBy: who.name,
      createdAt: at,
      updatedAt: at,
      validatedBy: null,
      validatedAt: null,
      history: [{ at, by: who.name, action: "créé" }],
    };
    set((s) => ({ calendars: [...s.calendars, calendar] }));
    audit("Calendrier créé", `Calendrier ${crop}`, `version ${version}`);
    return { ok: true, id: calendar.id };
  },
  /** Nouvelle version d'un calendrier validé : une copie en brouillon, que l'on modifie puis valide. */
  newCalendarVersion(id: string): ActionResult<{ id: string }> {
    const who = actor();
    if (!who?.session.permissions.includes("calendar.write"))
      return fail("errors.calendar.notAllowed");
    const source = state.calendars.find((c) => c.id === id);
    if (!source) return fail("errors.calendar.notFound");
    if (state.calendars.some((c) => c.crop === source.crop && c.status === "brouillon"))
      return fail("errors.calendar.exists");
    const res = actions.createCalendar(source.crop);
    if (!res.ok) return res;
    set((s) => ({
      calendars: s.calendars.map((c) =>
        c.id === res.id ? { ...c, steps: source.steps.map((st) => ({ ...st })) } : c,
      ),
    }));
    return res;
  },
  saveCalendar(id: string, steps: CalendarStep[]): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("calendar.write"))
      return fail("errors.calendar.notAllowed");
    const calendar = state.calendars.find((c) => c.id === id);
    if (!calendar) return fail("errors.calendar.notFound");
    if (!canEditCalendar(calendar)) return fail("errors.calendar.locked");
    const at = new Date().toISOString();
    const clean = steps.map((st) => ({ ...st, note: st.note.trim() }));
    set((s) => ({
      calendars: s.calendars.map((c) =>
        c.id === id
          ? {
              ...c,
              steps: clean,
              updatedAt: at,
              history: [...c.history, { at, by: who.name, action: "modifié" }],
            }
          : c,
      ),
    }));
    audit("Calendrier modifié", `Calendrier ${calendar.crop}`, `version ${calendar.version}`);
    return { ok: true };
  },
  /** Valide un brouillon : il devient la version qui fait foi et remplace la précédente. */
  validateCalendar(id: string): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("calendar.validate"))
      return fail("errors.calendar.cannotValidate");
    const calendar = state.calendars.find((c) => c.id === id);
    if (!calendar) return fail("errors.calendar.notFound");
    if (!canEditCalendar(calendar)) return fail("errors.calendar.notDraft");
    const issues = calendarIssues(calendar.steps);
    if (issues.length) return { ok: false, error: tNow(issues[0]!) };
    const at = new Date().toISOString();
    set((s) => ({
      calendars: s.calendars.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "validé" as const,
              validatedBy: who.name,
              validatedAt: at,
              updatedAt: at,
              history: [...c.history, { at, by: who.name, action: "validé" }],
            }
          : c.crop === calendar.crop && c.status === "validé"
            ? {
                ...c,
                status: "remplacé" as const,
                history: [...c.history, { at, by: who.name, action: "remplacé" }],
              }
            : c,
      ),
    }));
    audit("Calendrier validé", `Calendrier ${calendar.crop}`, `version ${calendar.version}`);
    return { ok: true };
  },
  deleteCalendar(id: string): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("calendar.write"))
      return fail("errors.calendar.notAllowed");
    const calendar = state.calendars.find((c) => c.id === id);
    if (!calendar) return fail("errors.calendar.notFound");
    if (!canEditCalendar(calendar)) return fail("errors.calendar.notDraft");
    set((s) => ({ calendars: s.calendars.filter((c) => c.id !== id) }));
    audit("Calendrier supprimé", `Calendrier ${calendar.crop}`, "brouillon");
    return { ok: true };
  },

  // ============ Opérations de culture (plan 4.8, M4-3) ============

  recordOperation(input: {
    planId: string;
    lineIndex: number;
    stepId?: string | null;
    kind: OperationKind;
    doneAt: string;
    note?: string;
    photos?: OperationPhoto[];
  }): ActionResult<{ id: string }> {
    const who = actor();
    if (!who?.session.permissions.includes("operation.write"))
      return fail("errors.operation.notAllowed");
    const plan = state.plans.find((p) => p.id === input.planId);
    if (!plan || !inScope([plan], who.session).length) return fail("errors.operation.plan");
    const line = plan.lines[input.lineIndex];
    if (!line) return fail("errors.operation.line");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.doneAt) || Number.isNaN(Date.parse(input.doneAt)))
      return fail("errors.operation.date");
    if (input.doneAt > new Date().toISOString().slice(0, 10))
      return fail("errors.operation.future");
    if (!OPERATION_KINDS.includes(input.kind)) return fail("errors.operation.line");
    const camp = state.campaigns.find((c) => c.name === plan.campaign);
    if (camp && !isOpenCampaign(camp)) return fail("errors.campaign.closed");
    const stepId = input.stepId ?? null;
    if (stepId) {
      const cal = validatedCalendar(state.calendars, line.crop);
      if (!cal?.steps.some((st) => st.id === stepId)) return fail("errors.operation.line");
      if (
        state.operations.some(
          (o) => o.planId === plan.id && o.lineIndex === input.lineIndex && o.stepId === stepId,
        )
      )
        return fail("errors.operation.duplicate");
    }
    const at = new Date().toISOString();
    const op: FieldOperation = {
      id: nextId("op", state.operations),
      scoopId: plan.scoopId,
      planId: plan.id,
      lineIndex: input.lineIndex,
      stepId,
      kind: input.kind,
      doneAt: input.doneAt,
      note: input.note?.trim() ?? "",
      photos: input.photos ?? [],
      by: who.name,
      createdAt: at,
    };
    set((s) => ({ operations: [...s.operations, op] }));
    audit(
      "Opération enregistrée",
      `Plan ${plan.id}`,
      `${op.kind}, ${line.crop}, ${op.doneAt}`,
      plan.scoopId,
    );
    return { ok: true, id: op.id };
  },
  removeOperation(id: string): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("operation.write"))
      return fail("errors.operation.notAllowed");
    const op = state.operations.find((o) => o.id === id);
    if (!op || !inScope([op], who.session).length) return fail("errors.operation.notFound");
    set((s) => ({ operations: s.operations.filter((o) => o.id !== id) }));
    audit("Opération retirée", `Plan ${op.planId}`, op.kind, op.scoopId);
    return { ok: true };
  },

  // ============ Stocks d'intrants (plan 4.9, M2-1) ============

  addInputItem(input: {
    name: string;
    category: InputCategory;
    unit: InputUnit;
    alertBelow: number;
  }): ActionResult<{ id: string }> {
    const who = actor();
    if (!who?.session.permissions.includes("stock.manage")) return fail("errors.stock.notAllowed");
    if (!input.name.trim() || !(input.alertBelow >= 0)) return fail("errors.stock.itemFields");
    const item: InputItem = {
      id: nextId("in", state.inputItems),
      name: input.name.trim(),
      category: input.category,
      unit: input.unit,
      alertBelow: input.alertBelow,
    };
    set((s) => ({ inputItems: [...s.inputItems, item] }));
    audit("Intrant ajouté", item.name, `${item.category}, ${item.unit}`);
    return { ok: true, id: item.id };
  },
  receiveLot(input: {
    scoopId: string;
    itemId: string;
    lotNumber: string;
    quantity: number;
    unitPrice: number;
    supplier: string;
    receivedAt: string;
    expiresAt: string | null;
  }): ActionResult<{ id: string }> {
    const who = actor();
    if (!who?.session.permissions.includes("stock.manage")) return fail("errors.stock.notAllowed");
    if (!inScope([{ scoopId: input.scoopId }], who.session).length)
      return fail("errors.stock.notFound");
    if (isArchived(input.scoopId)) return fail("errors.scoop.archived");
    const item = state.inputItems.find((i) => i.id === input.itemId);
    if (!item) return fail("errors.stock.itemFields");
    const issues = lotIssues(input, new Date().toISOString());
    if (issues.length) return { ok: false, error: tNow(issues[0]!) };
    const lot: StockLot = {
      id: nextId("lot", state.stockLots),
      scoopId: input.scoopId,
      itemId: input.itemId,
      lotNumber: input.lotNumber.trim(),
      quantity: input.quantity,
      unitPrice: input.unitPrice,
      supplier: input.supplier.trim(),
      receivedAt: input.receivedAt,
      expiresAt: input.expiresAt || null,
      createdBy: who.name,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ stockLots: [...s.stockLots, lot] }));
    audit(
      "Lot reçu",
      `Lot ${lot.lotNumber}`,
      `${item.name}, ${lot.quantity} ${item.unit}`,
      lot.scoopId,
    );
    return { ok: true, id: lot.id };
  },
  /** Sortie d'un lot : distribution à un membre, consommation ou perte ; jamais plus que le solde. */
  recordMovement(input: {
    lotId: string;
    kind: MovementKind;
    quantity: number;
    memberId?: string | null;
    date: string;
    note?: string;
  }): ActionResult<{ id: string }> {
    const who = actor();
    if (!who?.session.permissions.includes("stock.manage")) return fail("errors.stock.notAllowed");
    const lot = state.stockLots.find((l) => l.id === input.lotId);
    if (!lot || !inScope([lot], who.session).length) return fail("errors.stock.notFound");
    if (isArchived(lot.scoopId)) return fail("errors.scoop.archived");
    const memberId = input.kind === "distribution" ? (input.memberId ?? null) : null;
    const issues = movementIssues(
      { quantity: input.quantity, kind: input.kind, memberId, date: input.date },
      lotBalance(lot, state.stockMovements),
      new Date().toISOString(),
    );
    if (issues.length) return { ok: false, error: tNow(issues[0]!) };
    if (memberId) {
      const m = state.members.find((x) => x.id === memberId);
      if (!m || m.scoopId !== lot.scoopId || m.status !== "membre")
        return fail("errors.stock.member");
    }
    const mv: StockMovement = {
      id: nextId("mv", state.stockMovements),
      scoopId: lot.scoopId,
      lotId: lot.id,
      kind: input.kind,
      quantity: input.quantity,
      memberId,
      date: input.date,
      note: input.note?.trim() ?? "",
      by: who.name,
      createdAt: new Date().toISOString(),
      voided: null,
    };
    set((s) => ({ stockMovements: [...s.stockMovements, mv] }));
    audit("Sortie de stock", `Lot ${lot.lotNumber}`, `${mv.kind}, ${mv.quantity}`, lot.scoopId);
    return { ok: true, id: mv.id };
  },
  voidMovement(id: string, reason: string): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("stock.manage")) return fail("errors.stock.notAllowed");
    const mv = state.stockMovements.find((m) => m.id === id);
    if (!mv || !inScope([mv], who.session).length) return fail("errors.stock.notFound");
    if (mv.voided) return fail("errors.stock.alreadyVoided");
    if (reason.trim().length < 3) return fail("errors.stock.reason");
    const voided = { at: new Date().toISOString(), by: who.name, reason: reason.trim() };
    set((s) => ({
      stockMovements: s.stockMovements.map((m) => (m.id === id ? { ...m, voided } : m)),
    }));
    audit("Sortie de stock annulée", `Sortie ${id}`, reason.trim(), mv.scoopId);
    return { ok: true };
  },

  // ============ Crédits (plan 4.9, M2-2) ============

  grantCredit(input: {
    memberId: string;
    amount: number;
    ratePct: number;
    purpose: string;
    grantedAt: string;
    count: number;
    firstDue: string;
    everyMonths: number;
  }): ActionResult<{ id: string }> {
    const who = actor();
    if (!who?.session.permissions.includes("credit.manage"))
      return fail("errors.credit.notAllowed");
    const member = state.members.find((m) => m.id === input.memberId);
    if (!member || member.status !== "membre" || !inScope([member], who.session).length)
      return fail("errors.credit.member");
    if (isArchived(member.scoopId)) return fail("errors.scoop.archived");
    const issues = creditIssues(input, new Date().toISOString());
    if (issues.length) return { ok: false, error: tNow(issues[0]!) };
    const id = nextId("cr", state.credits);
    const credit: Credit = {
      id,
      scoopId: member.scoopId,
      memberId: member.id,
      amount: input.amount,
      ratePct: input.ratePct,
      purpose: input.purpose.trim(),
      grantedAt: input.grantedAt,
      schedule: generateSchedule({
        amount: input.amount,
        ratePct: input.ratePct,
        count: input.count,
        firstDue: input.firstDue,
        everyMonths: Math.max(1, Math.round(input.everyMonths)),
        idPrefix: id,
      }),
      grantedBy: who.name,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ credits: [...s.credits, credit] }));
    audit(
      "Crédit accordé",
      `Membre ${member.firstName} ${member.lastName}`,
      `${credit.amount} FCFA en ${credit.schedule.length} échéance(s)`,
      credit.scoopId,
    );
    return { ok: true, id };
  },
  recordRepayment(input: {
    creditId: string;
    amount: number;
    paidAt: string;
    method: PaymentMethod;
  }): ActionResult<{ id: string; receipt: string }> {
    const who = actor();
    if (!who?.session.permissions.includes("credit.manage"))
      return fail("errors.credit.notAllowed");
    const credit = state.credits.find((c) => c.id === input.creditId);
    if (!credit || !inScope([credit], who.session).length) return fail("errors.credit.notFound");
    if (isArchived(credit.scoopId)) return fail("errors.scoop.archived");
    const issues = repaymentIssues(input.amount, creditBalance(credit, state.repayments));
    if (issues.length) return { ok: false, error: tNow(issues[0]!) };
    if (!isPaymentDate(input.paidAt, new Date().toISOString()) || input.paidAt < credit.grantedAt)
      return fail("errors.credit.date");
    const year = Number(input.paidAt.slice(0, 4));
    const rep: Repayment = {
      id: nextId("rp", state.repayments),
      scoopId: credit.scoopId,
      creditId: credit.id,
      amount: input.amount,
      paidAt: input.paidAt,
      method: input.method,
      receipt: makeReceipt(
        "RC",
        state.repayments.map((r) => r.receipt),
        year,
      ),
      by: who.name,
      voided: null,
    };
    set((s) => ({ repayments: [...s.repayments, rep] }));
    audit(
      "Remboursement enregistré",
      `Crédit ${credit.id}`,
      `${rep.amount} FCFA, reçu ${rep.receipt}`,
      credit.scoopId,
    );
    return { ok: true, id: rep.id, receipt: rep.receipt };
  },
  voidRepayment(id: string, reason: string): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("credit.manage"))
      return fail("errors.credit.notAllowed");
    const rep = state.repayments.find((r) => r.id === id);
    if (!rep || !inScope([rep], who.session).length) return fail("errors.credit.notFound");
    if (rep.voided) return fail("errors.credit.alreadyVoided");
    if (reason.trim().length < 3) return fail("errors.credit.reason");
    const voided = { at: new Date().toISOString(), by: who.name, reason: reason.trim() };
    set((s) => ({ repayments: s.repayments.map((r) => (r.id === id ? { ...r, voided } : r)) }));
    audit("Remboursement annulé", `Reçu ${rep.receipt}`, reason.trim(), rep.scoopId);
    return { ok: true };
  },

  // ============ Ventes (plan 4.9, M2-3) ============

  recordSale(input: {
    producerId: string;
    crop: string;
    quantityKg: number;
    pricePerKg: number;
    buyer: string;
    soldAt: string;
    paidAmount?: number;
  }): ActionResult<{ id: string }> {
    const who = actor();
    if (!who?.session.permissions.includes("sales.manage")) return fail("errors.sale.notAllowed");
    const producer = state.producers.find((p) => p.id === input.producerId && !p.mergedInto);
    if (!producer || !inScope([producer], who.session).length) return fail("errors.sale.producer");
    if (isArchived(producer.scoopId)) return fail("errors.scoop.archived");
    const paidAmount = input.paidAmount ?? 0;
    const issues = saleIssues({ ...input, paidAmount }, new Date().toISOString());
    if (issues.length) return { ok: false, error: tNow(issues[0]!) };
    const campaign = currentCampaign(state.campaigns, input.soldAt);
    if (!campaign) return fail("errors.sale.closed");
    const sale: Sale = {
      id: nextId("sa", state.sales),
      scoopId: producer.scoopId,
      producerId: producer.id,
      crop: input.crop,
      quantityKg: input.quantityKg,
      pricePerKg: input.pricePerKg,
      buyer: input.buyer.trim(),
      soldAt: input.soldAt,
      campaign: campaign.name,
      paidAmount,
      by: who.name,
      createdAt: new Date().toISOString(),
      voided: null,
    };
    set((s) => ({ sales: [...s.sales, sale] }));
    audit(
      "Vente enregistrée",
      `Producteur ${producer.code}`,
      `${sale.crop}, ${sale.quantityKg} kg`,
      sale.scoopId,
    );
    return { ok: true, id: sale.id };
  },
  /** Encaissement d'une partie ou du solde d'une vente. */
  addSalePayment(id: string, amount: number): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("sales.manage")) return fail("errors.sale.notAllowed");
    const sale = state.sales.find((s) => s.id === id);
    if (!sale || !inScope([sale], who.session).length) return fail("errors.sale.notFound");
    if (sale.voided) return fail("errors.sale.alreadyVoided");
    const paid = sale.paidAmount + amount;
    if (
      !Number.isInteger(amount) ||
      !(amount > 0) ||
      paid > Math.round(sale.quantityKg * sale.pricePerKg)
    )
      return fail("errors.sale.paid");
    set((s) => ({ sales: s.sales.map((x) => (x.id === id ? { ...x, paidAmount: paid } : x)) }));
    audit("Encaissement de vente", `Vente ${id}`, `${amount} FCFA`, sale.scoopId);
    return { ok: true };
  },
  voidSale(id: string, reason: string): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("sales.manage")) return fail("errors.sale.notAllowed");
    const sale = state.sales.find((s) => s.id === id);
    if (!sale || !inScope([sale], who.session).length) return fail("errors.sale.notFound");
    if (sale.voided) return fail("errors.sale.alreadyVoided");
    if (reason.trim().length < 3) return fail("errors.sale.reason");
    const voided = { at: new Date().toISOString(), by: who.name, reason: reason.trim() };
    set((s) => ({ sales: s.sales.map((x) => (x.id === id ? { ...x, voided } : x)) }));
    audit("Vente annulée", `Vente ${id}`, reason.trim(), sale.scoopId);
    return { ok: true };
  },

  // ============ Charges des exploitations (plan 4.10, M3) ============

  recordExpense(input: {
    producerId: string;
    crop: string;
    category: ExpenseCategory;
    amount: number;
    date: string;
    label?: string;
  }): ActionResult<{ id: string }> {
    const who = actor();
    if (!who?.session.permissions.includes("expense.write"))
      return fail("errors.expense.notAllowed");
    const producer = state.producers.find((p) => p.id === input.producerId && !p.mergedInto);
    if (!producer || !inScope([producer], who.session).length)
      return fail("errors.expense.producer");
    if (isArchived(producer.scoopId)) return fail("errors.scoop.archived");
    const issues = expenseIssues(input, new Date().toISOString());
    if (issues.length) return { ok: false, error: tNow(issues[0]!) };
    const campaign = currentCampaign(state.campaigns, input.date);
    if (!campaign || !isOpenCampaign(campaign)) return fail("errors.expense.noCampaign");
    const expense: Expense = {
      id: nextId("ex", state.expenses),
      scoopId: producer.scoopId,
      producerId: producer.id,
      crop: input.crop,
      campaign: campaign.name,
      category: input.category,
      amount: input.amount,
      date: input.date,
      label: input.label?.trim() ?? "",
      by: who.name,
      createdAt: new Date().toISOString(),
      voided: null,
    };
    set((s) => ({ expenses: [...s.expenses, expense] }));
    audit(
      "Charge enregistrée",
      `Producteur ${producer.code}`,
      `${expense.category}, ${expense.crop}, ${expense.amount} FCFA`,
      expense.scoopId,
    );
    return { ok: true, id: expense.id };
  },
  voidExpense(id: string, reason: string): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("expense.write"))
      return fail("errors.expense.notAllowed");
    const e = state.expenses.find((x) => x.id === id);
    if (!e || !inScope([e], who.session).length) return fail("errors.expense.notFound");
    if (e.voided) return fail("errors.expense.alreadyVoided");
    if (reason.trim().length < 3) return fail("errors.expense.reason");
    const voided = { at: new Date().toISOString(), by: who.name, reason: reason.trim() };
    set((s) => ({ expenses: s.expenses.map((x) => (x.id === id ? { ...x, voided } : x)) }));
    audit("Charge annulée", `Charge ${id}`, reason.trim(), e.scoopId);
    return { ok: true };
  },
  /** Consultation du compte d'exploitation d'un producteur : donnée financière personnelle, donc tracée comme la CNI. */
  consultExploitation(producerId: string): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("exploitation.read"))
      return fail("errors.expense.notAllowed");
    const producer = state.producers.find((p) => p.id === producerId);
    if (!producer || !inScope([producer], who.session).length)
      return fail("errors.expense.producer");
    audit(
      "Consultation du compte d'exploitation",
      `Producteur ${producer.code}`,
      "",
      producer.scoopId,
    );
    return { ok: true };
  },

  // ============ Coopératives (plan 4.6, M1-1) ============

  /**
   * Crée une coopérative et le compte de son gestionnaire. Le compte reste inactif tant que la personne n'a pas
   * choisi son mot de passe via le lien reçu par courriel : l'administrateur ne saisit jamais de mot de passe.
   */
  createScoop(
    input: ScoopInput & { region?: string; createdAt?: string },
  ): ActionResult<{ scoopId: string; userId: string; memberId: string }> {
    const who = actor();
    if (!who?.session.permissions.includes("scoop.manage")) return fail("errors.scoop.notAllowed");
    const issues = scoopIssues(
      input,
      state.scoops,
      [...state.users.map((u) => u.email), ...state.members.map((m) => m.email)].filter(Boolean),
    );
    if (issues.length) return { ok: false, error: tNow(issues[0]!.key) };
    const at = new Date().toISOString();
    const scoop: Scoop = {
      id: nextScoopId(state.scoops),
      name: input.name.trim(),
      commune: input.commune.trim(),
      code: normalizeCode(input.code),
      ...(input.region?.trim() && { region: input.region.trim() }),
      createdAt: input.createdAt ? new Date(input.createdAt).toISOString() : at,
    };
    const m = input.manager;
    const member: Member = {
      id: nextId("m", state.members),
      scoopId: scoop.id,
      orgId: null,
      firstName: m.firstName.trim(),
      lastName: m.lastName.trim(),
      sex: "H",
      phone: "",
      email: m.email.trim(),
      age: null,
      handicap: false,
      village: scoop.commune,
      status: "membre",
      joinedAt: at,
      producerId: null,
      history: [{ at, by: who.name, action: `créé avec la coopérative ${scoop.name}` }],
    };
    const user: AppUser = {
      id: nextId("u", state.users),
      name: `${member.firstName} ${member.lastName}`,
      email: member.email,
      phone: "",
      role: "gestionnaire",
      scoopId: scoop.id,
      memberId: member.id,
      active: false,
      invited: { sentAt: at, expiresAt: new Date(Date.now() + INVITATION_TTL_MS).toISOString() },
    };
    set((s) => ({
      scoops: [...s.scoops, scoop],
      members: [...s.members, member],
      users: [...s.users, user],
    }));
    audit("Coopérative créée", `SCOOP ${scoop.name}`, `code ${scoop.code}`, scoop.id);
    audit(
      "Compte gestionnaire créé",
      `Utilisateur ${user.name}`,
      "inactif jusqu'à l'activation",
      scoop.id,
    );
    audit("Invitation envoyée", `Utilisateur ${user.name}`, user.email, scoop.id);
    return { ok: true, scoopId: scoop.id, userId: user.id, memberId: member.id };
  },
  updateScoop(
    id: string,
    patch: { name: string; commune: string; code: string; region?: string },
  ): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("scoop.manage")) return fail("errors.scoop.notAllowed");
    const scoop = state.scoops.find((s) => s.id === id);
    if (!scoop) return fail("errors.scoop.notFound");
    const issues = scoopIssues(
      { ...patch, manager: { firstName: "", lastName: "", email: "" } },
      state.scoops,
      [],
      { checkManager: false, ignore: id },
    );
    if (issues.length) return { ok: false, error: tNow(issues[0]!.key) };
    set((s) => ({
      scoops: s.scoops.map((x) =>
        x.id === id
          ? {
              ...x,
              name: patch.name.trim(),
              commune: patch.commune.trim(),
              code: normalizeCode(patch.code),
              ...(patch.region !== undefined && { region: patch.region.trim() }),
            }
          : x,
      ),
    }));
    audit("Coopérative modifiée", `SCOOP ${patch.name.trim()}`, "", id);
    return { ok: true };
  },
  /** Jamais de suppression : une coopérative archivée garde ses données, mais plus aucun accès n'y reste actif. */
  archiveScoop(id: string): ActionResult<{ closedAccounts: number }> {
    const who = actor();
    if (!who?.session.permissions.includes("scoop.manage")) return fail("errors.scoop.notAllowed");
    const scoop = state.scoops.find((s) => s.id === id);
    if (!scoop) return fail("errors.scoop.notFound");
    if (scoop.archived) return fail("errors.scoop.alreadyArchived");
    if (blockingDossiers(id, state.dossiers).length) return fail("errors.scoop.blocked");
    const closes = (u: AppUser) =>
      u.active &&
      u.role !== "admin" &&
      (u.scoopId === id || (u.scoopIds?.length === 1 && u.scoopIds[0] === id));
    const closed = state.users.filter(closes).length;
    set((s) => ({
      scoops: s.scoops.map((x) => (x.id === id ? { ...x, archived: true } : x)),
      users: s.users.map((u) => (closes(u) ? { ...u, active: false } : u)),
    }));
    audit("Coopérative archivée", `SCOOP ${scoop.name}`, `${closed} accès fermé(s)`, id);
    return { ok: true, closedAccounts: closed };
  },
  /** Réactive la coopérative ; les accès fermés se rattribuent un par un depuis l'écran Équipe. */
  restoreScoop(id: string): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("scoop.manage")) return fail("errors.scoop.notAllowed");
    const scoop = state.scoops.find((s) => s.id === id);
    if (!scoop) return fail("errors.scoop.notFound");
    if (!scoop.archived) return fail("errors.scoop.notArchived");
    set((s) => ({ scoops: s.scoops.map((x) => (x.id === id ? { ...x, archived: false } : x)) }));
    audit("Coopérative réactivée", `SCOOP ${scoop.name}`, "", id);
    return { ok: true };
  },
  /** Nouvelle invitation pour un compte qui n'a pas encore choisi son mot de passe. */
  resendInvitation(userId: string): ActionResult {
    const who = actor();
    if (!who?.session.permissions.includes("scoop.manage")) return fail("errors.scoop.notAllowed");
    const user = state.users.find((u) => u.id === userId);
    if (!user || user.active || !user.invited) return fail("errors.scoop.noManager");
    const at = new Date().toISOString();
    set((s) => ({
      users: s.users.map((u) =>
        u.id === userId
          ? {
              ...u,
              invited: {
                sentAt: at,
                expiresAt: new Date(Date.now() + INVITATION_TTL_MS).toISOString(),
              },
            }
          : u,
      ),
    }));
    audit("Invitation renvoyée", `Utilisateur ${user.name}`, user.email, user.scoopId);
    return { ok: true };
  },
  /** Appelé quand la personne invitée a choisi son mot de passe : le compte devient actif. */
  activateInvitedAccount(email: string): boolean {
    const user = state.users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && !!u.invited,
    );
    if (!user || new Date(user.invited!.expiresAt).getTime() < Date.now()) return false;
    set((s) => ({
      users: s.users.map((u) =>
        u.id === user.id ? { ...u, active: true, invited: undefined } : u,
      ),
    }));
    audit("Compte activé", `Utilisateur ${user.name}`, "mot de passe choisi", user.scoopId);
    return true;
  },

  // ============ Cotisations (plan 4.6, M1-3) ============

  /** Règle de cotisation d'une coopérative : créée ou modifiée ; « confirmée » quand le client l'a validée. */
  setContributionRule(
    scoopId: string,
    rule: Pick<ContributionRule, "amount" | "periodicity" | "dueDate" | "startYear"> & {
      confirmed?: boolean;
    },
  ): ActionResult {
    const denied = access("contribution.manage");
    if (denied) return denied;
    const who = actor();
    if (!who) return fail("errors.contribution.noRule");
    if (!inScope([{ scoopId }], who.session).length) return fail("errors.library.scope");
    if (!(rule.amount > 0) || !isValidMonthDay(rule.dueDate))
      return fail("errors.contribution.rule");
    const next: ContributionRule = {
      scoopId,
      amount: Math.round(rule.amount),
      periodicity: rule.periodicity,
      dueDate: rule.dueDate,
      startYear: rule.startYear,
      confirmed: rule.confirmed ?? false,
    };
    set((s) => ({
      contributionRules: [...s.contributionRules.filter((r) => r.scoopId !== scoopId), next],
    }));
    audit(
      "Règle de cotisation",
      `SCOOP ${scoopName(scoopId)}`,
      `${next.amount} FCFA, ${next.periodicity}`,
      scoopId,
    );
    return { ok: true };
  },
  recordPayment(input: {
    memberId: string;
    amount: number;
    period: string;
    method: PaymentMethod;
    note?: string;
    paidAt?: string;
  }): ActionResult<{ id: string; receipt: string }> {
    const denied = access("contribution.manage");
    if (denied) return denied;
    const who = actor();
    if (!who) return fail("errors.contribution.member");
    const member = state.members.find((m) => m.id === input.memberId);
    if (!member || !inScope([member], who.session).length)
      return fail("errors.contribution.member");
    if (isArchived(member.scoopId)) return fail("errors.scoop.archived");
    const rule = state.contributionRules.find((r) => r.scoopId === member.scoopId);
    if (!rule) return fail("errors.contribution.noRule");
    const issues = paymentIssues(
      input,
      rule,
      state.members.filter((m) => m.scoopId === member.scoopId).map((m) => m.id),
    );
    if (issues.length) return fail(issues[0]!.key);
    const now = new Date().toISOString();
    if (input.paidAt && !isPaymentDate(input.paidAt.slice(0, 10), now))
      return fail("errors.contribution.date");
    const at = input.paidAt ?? now;
    const payment: ContributionPayment = {
      id: nextId("pay", state.payments),
      scoopId: member.scoopId,
      memberId: member.id,
      amount: input.amount,
      paidAt: at,
      period: input.period,
      method: input.method,
      receipt: nextReceipt(state.payments, new Date(at).getUTCFullYear()),
      recordedBy: who.name,
      note: input.note?.trim() ?? "",
      voided: null,
    };
    set((s) => ({ payments: [...s.payments, payment] }));
    audit(
      "Cotisation enregistrée",
      `Membre ${member.firstName} ${member.lastName}`,
      `${payment.amount} FCFA, période ${payment.period}, reçu ${payment.receipt}`,
      member.scoopId,
    );
    return { ok: true, id: payment.id, receipt: payment.receipt };
  },
  /** Un paiement n'est jamais effacé : il est annulé avec un motif et reste dans l'historique. */
  voidPayment(id: string, reason: string): ActionResult {
    const denied = access("contribution.manage");
    if (denied) return denied;
    const who = actor();
    const pay = state.payments.find((p) => p.id === id);
    if (!who || !pay || !inScope([pay], who.session).length)
      return fail("errors.contribution.notFound");
    if (pay.voided) return fail("errors.contribution.alreadyVoided");
    if (reason.trim().length < 3) return fail("errors.contribution.reason");
    const voided = { at: new Date().toISOString(), by: who.name, reason: reason.trim() };
    set((s) => ({ payments: s.payments.map((p) => (p.id === id ? { ...p, voided } : p)) }));
    audit("Cotisation annulée", `Reçu ${pay.receipt}`, reason.trim(), pay.scoopId);
    return { ok: true };
  },

  // ============ Réunions et procès-verbaux (plan 4.6, M1-4) ============

  createMeeting(input: {
    scoopId: string;
    kind: MeetingKind;
    title: string;
    date: string;
    place: string;
    agenda: string[];
  }): ActionResult<{ id: string }> {
    const denied = access("meeting.manage");
    if (denied) return denied;
    if (isArchived(input.scoopId)) return fail("errors.scoop.archived");
    const who = actor();
    if (!who || !inScope([{ scoopId: input.scoopId }], who.session).length)
      return fail("errors.meeting.scope");
    if (!input.title.trim() || !input.place.trim() || Number.isNaN(Date.parse(input.date)))
      return fail("errors.meeting.fields");
    const at = new Date().toISOString();
    const meeting: Meeting = {
      id: nextId("meet", state.meetings),
      scoopId: input.scoopId,
      kind: input.kind,
      title: input.title.trim(),
      date: new Date(input.date).toISOString(),
      place: input.place.trim(),
      agenda: input.agenda.map((a) => a.trim()).filter(Boolean),
      status: "planifiée",
      presentIds: [],
      minutes: null,
      cancelReason: null,
      createdBy: who.name,
      createdAt: at,
      history: [{ at, by: who.name, action: "créée" }],
    };
    set((s) => ({ meetings: [...s.meetings, meeting] }));
    audit("Réunion créée", meeting.title, meeting.kind, meeting.scoopId);
    return { ok: true, id: meeting.id };
  },
  updateMeeting(
    id: string,
    patch: Partial<Pick<Meeting, "kind" | "title" | "date" | "place" | "agenda">>,
  ): ActionResult {
    const denied = access("meeting.manage");
    if (denied) return denied;
    const found = meetingOf(id);
    if (!found.ok) return found;
    const { meeting, who } = found;
    if (!isMeetingEditable(meeting)) return fail("errors.meeting.locked");
    if (
      (patch.title !== undefined && !patch.title.trim()) ||
      (patch.place !== undefined && !patch.place.trim()) ||
      (patch.date !== undefined && Number.isNaN(Date.parse(patch.date)))
    )
      return fail("errors.meeting.fields");
    const at = new Date().toISOString();
    const clean = {
      ...patch,
      ...(patch.title !== undefined && { title: patch.title.trim() }),
      ...(patch.place !== undefined && { place: patch.place.trim() }),
      ...(patch.agenda !== undefined && {
        agenda: patch.agenda.map((a) => a.trim()).filter(Boolean),
      }),
    };
    set((s) => ({
      meetings: s.meetings.map((m) =>
        m.id === id
          ? {
              ...m,
              ...clean,
              ...(patch.date !== undefined && { date: new Date(patch.date).toISOString() }),
              history: [...m.history, { at, by: who.name, action: "modifiée" }],
            }
          : m,
      ),
    }));
    audit("Réunion modifiée", meeting.title, Object.keys(patch).join(", "), meeting.scoopId);
    return { ok: true };
  },
  /** La réunion a eu lieu : on enregistre les présents, ce qui ouvre la rédaction du procès-verbal. */
  holdMeeting(id: string, presentIds: string[]): ActionResult {
    const denied = access("meeting.manage");
    if (denied) return denied;
    const found = meetingOf(id);
    if (!found.ok) return found;
    const { meeting, who } = found;
    if (!canMeetingTransition(meeting.status, "tenue")) return fail("errors.meeting.locked");
    if (Date.parse(meeting.date) > Date.now()) return fail("errors.meeting.future");
    const valid = new Set(
      state.members.filter((m) => m.scoopId === meeting.scoopId).map((m) => m.id),
    );
    const present = [...new Set(presentIds)].filter((x) => valid.has(x));
    if (!present.length) return fail("errors.meeting.attendance");
    const at = new Date().toISOString();
    set((s) => ({
      meetings: s.meetings.map((m) =>
        m.id === id
          ? {
              ...m,
              status: "tenue" as const,
              presentIds: present,
              history: [...m.history, { at, by: who.name, action: "tenue" }],
            }
          : m,
      ),
    }));
    audit("Réunion tenue", meeting.title, `${present.length} présent(s)`, meeting.scoopId);
    return { ok: true };
  },
  cancelMeeting(id: string, reason: string): ActionResult {
    const denied = access("meeting.manage");
    if (denied) return denied;
    const found = meetingOf(id);
    if (!found.ok) return found;
    const { meeting, who } = found;
    if (!canMeetingTransition(meeting.status, "annulée")) return fail("errors.meeting.locked");
    if (reason.trim().length < 3) return fail("errors.meeting.cancelReason");
    const at = new Date().toISOString();
    set((s) => ({
      meetings: s.meetings.map((m) =>
        m.id === id
          ? {
              ...m,
              status: "annulée" as const,
              cancelReason: reason.trim(),
              history: [...m.history, { at, by: who.name, action: "annulée" }],
            }
          : m,
      ),
    }));
    audit("Réunion annulée", meeting.title, reason.trim(), meeting.scoopId);
    return { ok: true };
  },
  saveMinutes(id: string, text: string): ActionResult {
    const denied = access("meeting.manage");
    if (denied) return denied;
    const found = meetingOf(id);
    if (!found.ok) return found;
    const { meeting, who } = found;
    if (!canEditMinutes(meeting)) return fail("errors.meeting.minutesLocked");
    if (!text.trim()) return fail("errors.meeting.minutesEmpty");
    const at = new Date().toISOString();
    set((s) => ({
      meetings: s.meetings.map((m) =>
        m.id === id
          ? {
              ...m,
              minutes: {
                text: text.trim(),
                status: "brouillon" as const,
                updatedAt: at,
                validatedBy: null,
                validatedAt: null,
                documentId: m.minutes?.documentId ?? null,
              },
              history: [...m.history, { at, by: who.name, action: "procès-verbal enregistré" }],
            }
          : m,
      ),
    }));
    audit("Procès-verbal enregistré", meeting.title, "brouillon", meeting.scoopId);
    return { ok: true };
  },
  validateMinutes(id: string): ActionResult {
    const denied = access("meeting.manage");
    if (denied) return denied;
    const found = meetingOf(id);
    if (!found.ok) return found;
    const { meeting, who } = found;
    if (!meeting.minutes) return fail("errors.meeting.noMinutes");
    if (!canEditMinutes(meeting)) return fail("errors.meeting.minutesLocked");
    const at = new Date().toISOString();
    set((s) => ({
      meetings: s.meetings.map((m) =>
        m.id === id && m.minutes
          ? {
              ...m,
              minutes: {
                ...m.minutes,
                status: "validé" as const,
                validatedBy: who.name,
                validatedAt: at,
              },
              history: [...m.history, { at, by: who.name, action: "procès-verbal validé" }],
            }
          : m,
      ),
    }));
    audit("Procès-verbal validé", meeting.title, "", meeting.scoopId);
    return { ok: true };
  },
  /** Rattache la version signée du procès-verbal : le fichier va dans la bibliothèque de la coopérative. */
  attachMinutesDocument(
    id: string,
    input: { name: string; sizeKb: number; mime: string },
  ): ActionResult<{ id: string }> {
    const denied = access("meeting.manage");
    if (denied) return denied;
    const found = meetingOf(id);
    if (!found.ok) return found;
    const { meeting } = found;
    if (!meeting.minutes) return fail("errors.meeting.noMinutes");
    // Une seule version signée par procès-verbal : on ne remplace pas en laissant l'ancienne orpheline.
    if (meeting.minutes.documentId) return fail("errors.meeting.docExists");
    const res = actions.addLibraryDocument(meeting.scoopId, { ...input, kind: "procès-verbal" });
    if (!res.ok) return res;
    set((s) => ({
      meetings: s.meetings.map((m) =>
        m.id === id && m.minutes ? { ...m, minutes: { ...m.minutes, documentId: res.id } } : m,
      ),
    }));
    return res;
  },

  // ============ Bibliothèque de la coopérative (plan 4.6, M1-5) ============

  addLibraryDocument(
    scoopId: string,
    input: {
      kind: LibraryDocumentKind;
      name: string;
      sizeKb: number;
      mime: string;
      sensitive?: boolean;
    },
  ): ActionResult<{ id: string }> {
    const denied = access("library.manage");
    if (denied) return denied;
    if (isArchived(scoopId)) return fail("errors.scoop.archived");
    const who = actor();
    if (!who || !inScope([{ scoopId }], who.session).length) return fail("errors.library.scope");
    if (!LIBRARY_KINDS.includes(input.kind)) return fail("errors.library.kind");
    if (input.sizeKb > MAX_DOCUMENT_KB)
      return fail("errors.store.documentTooBig", { mb: MAX_DOCUMENT_KB / 1024 });
    const doc: DocumentMeta = {
      id: nextId("doc", state.documents),
      ownerType: "scoop",
      ownerId: scoopId,
      scoopId,
      kind: input.kind,
      name: input.name.trim(),
      sizeKb: input.sizeKb,
      mime: input.mime,
      uploadedBy: who.name,
      uploadedAt: new Date().toISOString(),
      sensitive: input.sensitive ?? false,
    };
    set((s) => ({ documents: [...s.documents, doc] }));
    audit(
      "Document ajouté",
      `SCOOP ${scoopName(scoopId)}`,
      `${doc.kind}${doc.sensitive ? ", sensible" : ""} : ${doc.name}`,
      scoopId,
    );
    return { ok: true, id: doc.id };
  },
  removeLibraryDocument(id: string): ActionResult {
    const denied = access("library.manage");
    if (denied) return denied;
    const who = actor();
    const doc = state.documents.find((d) => d.id === id);
    if (!who || !doc || doc.ownerType !== "scoop") return fail("errors.library.notFound");
    if (!inScope([doc], who.session).length) return fail("errors.library.scope");
    set((s) => ({
      documents: s.documents.filter((d) => d.id !== id),
      meetings: s.meetings.map((m) =>
        m.minutes?.documentId === id ? { ...m, minutes: { ...m.minutes, documentId: null } } : m,
      ),
    }));
    audit("Document retiré", `SCOOP ${scoopName(doc.scoopId)}`, doc.name, doc.scoopId);
    return { ok: true };
  },
  setSeuil(key: "gpsPrecisionMax" | "areaGapPct" | "minAreaM2" | "maxAreaHa", value: number) {
    set((s) => ({ seuils: { ...s.seuils, [key]: value } }));
    audit("Référentiel seuils", key, `${state.seuils[key]} → ${value}`);
  },
};

export const SNAPSHOT_FORMAT = "mbay-diaay/sauvegarde@1";
export interface Snapshot {
  format: string;
  exportedAt: string;
  data: Omit<State, "session">;
}
/** Listes qu'une sauvegarde doit toujours contenir ; les listes plus récentes (coopérative, modules) sont facultatives. */
const REQUIRED_LISTS = [
  "producers",
  "orgs",
  "plots",
  "cases",
  "alerts",
  "audit",
  "users",
  "imports",
  "corrections",
  "devices",
  "linkCandidates",
  "links",
  "cropRefs",
  "cropAliases",
] as const;
const OPTIONAL_LISTS = [
  "members",
  "dossiers",
  "documents",
  "plans",
  "reports",
  "scoops",
  "campaigns",
  "expenses",
  "inputItems",
  "stockLots",
  "stockMovements",
  "credits",
  "repayments",
  "sales",
  "calendars",
  "operations",
  "contributionRules",
  "payments",
  "meetings",
] as const;

export function isSnapshot(x: unknown): x is Snapshot {
  const s = x as Partial<Snapshot> | null;
  if (!s || s.format !== SNAPSHOT_FORMAT || typeof s.exportedAt !== "string" || !s.data)
    return false;
  const d = s.data as unknown as Record<string, unknown>;
  return (
    REQUIRED_LISTS.every((k) => Array.isArray(d[k])) &&
    OPTIONAL_LISTS.every((k) => d[k] === undefined || Array.isArray(d[k])) &&
    typeof d["youthMaxAge"] === "number" &&
    !!d["seuils"] &&
    typeof d["seuils"] === "object" &&
    !!d["merges"] &&
    typeof d["merges"] === "object"
  );
}

export function cropFamilyOf(crop: string, cropRefs: CropRef[]): CropFamily {
  return cropRefs.find((r) => r.name === crop)?.family ?? "Céréales et légumineuses";
}

export interface PhoneGroup {
  phone: string;
  members: Producer[];
}

/** Numéros partagés entre personnes distinctes, hors cas de doublons déjà identifiés. */
export function sharedPhoneGroups(producers: Producer[]): PhoneGroup[] {
  const m = new Map<string, Producer[]>();
  producers
    .filter((p) => !p.mergedInto && p.phone && p.quality !== "doublon")
    .forEach((p) => m.set(p.phone, [...(m.get(p.phone) ?? []), p]));
  return [...m.entries()]
    .filter(([, v]) => v.length > 1)
    .map(([phone, members]) => ({ phone, members }))
    .sort((a, b) => b.members.length - a.members.length);
}

export function can(s: Session | null, p: Permission) {
  return !!s?.permissions.includes(p);
}
export function useCan(p: Permission) {
  return useStore((s) => can(s.session, p));
}

/** Producteurs visibles selon le périmètre de la session (filtré côté serveur en production). */
export { inScope } from "./scope";

/**
 * Vue d'ensemble d'une coopérative : effectifs et éléments en attente, calculés SCOOP par SCOOP.
 * Fonction pure : la page choisit les SCOOP visibles (périmètre de la session), le calcul ne regarde que les données.
 */
import type { CorrectionRequest, DataAlert, Org, Plot, Producer } from "./mock/data";
import type { Member, ProducerDossier } from "./mock/cooperative";
import type { AppUser } from "./store";

export interface ScoopOverview {
  scoopId: string;
  /** Organisations de type GIE, et toutes organisations de base. */
  gie: number;
  orgs: number;
  /** Membres en règle, et candidats en attente d'adhésion. */
  members: number;
  candidates: number;
  producers: number;
  /** Techniciens dont l'accès est actif et qui couvrent cette SCOOP. */
  technicians: number;
  /** À traiter : dossiers soumis ou en examen, corrections en attente, alertes ouvertes. */
  dossiers: number;
  corrections: number;
  alerts: number;
}

export interface OverviewData {
  orgs: Org[];
  members: Member[];
  producers: Producer[];
  plots: Plot[];
  users: AppUser[];
  dossiers: ProducerDossier[];
  corrections: CorrectionRequest[];
  alerts: DataAlert[];
}

const count = <T>(items: T[], pred: (i: T) => boolean) =>
  items.reduce((n, i) => n + (pred(i) ? 1 : 0), 0);

export function overviewByScoop(d: OverviewData, scoopIds: readonly string[]): ScoopOverview[] {
  const live = d.producers.filter((p) => !p.mergedInto);
  const scoopOfProducer = new Map(d.producers.map((p) => [p.id, p.scoopId]));
  const scoopOfPlot = new Map(d.plots.map((p) => [p.id, scoopOfProducer.get(p.producerId)]));
  const alertScoop = (a: DataAlert) =>
    a.entity === "producteur" ? scoopOfProducer.get(a.entityId) : scoopOfPlot.get(a.entityId);

  return scoopIds.map((scoopId) => ({
    scoopId,
    gie: count(d.orgs, (o) => o.scoopId === scoopId && o.type === "GIE"),
    orgs: count(d.orgs, (o) => o.scoopId === scoopId),
    members: count(d.members, (m) => m.scoopId === scoopId && m.status === "membre"),
    candidates: count(d.members, (m) => m.scoopId === scoopId && m.status === "candidat"),
    producers: count(live, (p) => p.scoopId === scoopId),
    technicians: count(
      d.users,
      (u) => u.role === "technicien" && u.active && (u.scoopIds ?? []).includes(scoopId),
    ),
    dossiers: count(
      d.dossiers,
      (x) => x.scoopId === scoopId && (x.status === "soumis" || x.status === "en examen"),
    ),
    corrections: count(
      d.corrections,
      (c) => c.status === "en attente" && scoopOfProducer.get(c.producerId) === scoopId,
    ),
    alerts: count(d.alerts, (a) => a.status === "ouvert" && alertScoop(a) === scoopId),
  }));
}

/** Somme des vues par SCOOP, pour le total de plusieurs coopératives. */
export function sumOverview(rows: ScoopOverview[]): Omit<ScoopOverview, "scoopId"> {
  const zero = {
    gie: 0,
    orgs: 0,
    members: 0,
    candidates: 0,
    producers: 0,
    technicians: 0,
    dossiers: 0,
    corrections: 0,
    alerts: 0,
  };
  return rows.reduce(
    (t, r) => ({
      gie: t.gie + r.gie,
      orgs: t.orgs + r.orgs,
      members: t.members + r.members,
      candidates: t.candidates + r.candidates,
      producers: t.producers + r.producers,
      technicians: t.technicians + r.technicians,
      dossiers: t.dossiers + r.dossiers,
      corrections: t.corrections + r.corrections,
      alerts: t.alerts + r.alerts,
    }),
    zero,
  );
}

/** Techniciens actifs distincts qui couvrent au moins une des SCOOP : une personne sur deux SCOOP ne compte qu'une fois. */
export function countTechnicians(users: AppUser[], scoopIds: readonly string[]): number {
  const wanted = new Set(scoopIds);
  return users.filter(
    (u) => u.role === "technicien" && u.active && (u.scoopIds ?? []).some((id) => wanted.has(id)),
  ).length;
}

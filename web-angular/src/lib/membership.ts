/**
 * Compteurs d'adhésion partagés : une seule sémantique pour dashboard, coopérative, équipe, cotisations.
 *
 * - **Adhérent actif** (`membre`) : personne en règle dans la coopérative (`Member.status === "membre"`).
 * - **Candidat / suspendu / sorti** : autres statuts d'adhésion coopérative.
 * - **Producteur recensé** : fiche agricole (`Producer`), distincte du statut d'adhésion coopérative.
 * - **Producteur marqué « membre »** : champ `Producer.status` (qualité de fiche), pas l'effectif Équipe.
 */
import type { MembershipStatus, Member } from "@/lib/mock/cooperative";
import type { Producer } from "@/lib/mock/data";

export interface MembershipCounts {
  /** Adhérents actifs (Member.status === membre). */
  active: number;
  candidates: number;
  suspended: number;
  left: number;
  /** Tous les enregistrements Member du périmètre (tous statuts). */
  roster: number;
}

export interface ProducerStatusCounts {
  /** Fiches agricoles non fusionnées. */
  producers: number;
  /** Producer.status === membre (ne pas confondre avec adhérents actifs). */
  labeledMember: number;
  labeledListed: number;
}

const byStatus = (members: readonly Member[], status: MembershipStatus) =>
  members.reduce((n, m) => n + (m.status === status ? 1 : 0), 0);

/** Compte les adhérents d'un ensemble déjà filtré au périmètre (SCOOP / session). */
export function membershipCounts(members: readonly Member[]): MembershipCounts {
  return {
    active: byStatus(members, "membre"),
    candidates: byStatus(members, "candidat"),
    suspended: byStatus(members, "suspendu"),
    left: byStatus(members, "sorti"),
    roster: members.length,
  };
}

/** Producteurs non fusionnés : volumes de fiches, pas d'adhésion coopérative. */
export function producerStatusCounts(producers: readonly Producer[]): ProducerStatusCounts {
  const live = producers.filter((p) => !p.mergedInto);
  return {
    producers: live.length,
    labeledMember: live.filter((p) => p.status === "membre").length,
    labeledListed: live.filter((p) => p.status === "recensé").length,
  };
}

/** Adhérents actifs uniquement — utilisé par cotisations et totaux « membres en règle ». */
export function activeMembers(members: readonly Member[]): Member[] {
  return members.filter((m) => m.status === "membre");
}

import { useMemo } from "react";
import { scoopTotals } from "@/lib/contributions";
import { techniciansOf } from "@/lib/scoop-account";
import { useStore } from "@/lib/store";

/** Compteurs affichés dans les onglets de la fiche coopérative. */
export function useFicheCounts(scoopId: string) {
  const orgs = useStore((s) => s.orgs);
  const members = useStore((s) => s.members);
  const users = useStore((s) => s.users);
  const meetings = useStore((s) => s.meetings);
  const rules = useStore((s) => s.contributionRules);
  const payments = useStore((s) => s.payments);
  return useMemo(() => {
    const mine = members.filter((m) => m.scoopId === scoopId);
    return {
      gie: orgs.filter((o) => o.scoopId === scoopId).length,
      membres: mine.length,
      techniciens: techniciansOf(users, scoopId).length,
      reunions: meetings.filter((m) => m.scoopId === scoopId).length,
      cotisations: scoopTotals(
        mine,
        rules.find((r) => r.scoopId === scoopId),
        payments,
        new Date().toISOString(),
      ).late,
    };
  }, [orgs, members, users, meetings, rules, payments, scoopId]);
}

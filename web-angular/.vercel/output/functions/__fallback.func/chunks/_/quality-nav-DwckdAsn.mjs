import { i as inScope } from './locale.service-c0QhtcVY.mjs';

var QUALITY_SECTIONS = [
  {
    to: "/dashboard/qualite/doublons",
    perm: "quality.review"
  },
  {
    to: "/dashboard/qualite/alertes",
    perm: "alert.manage"
  },
  {
    to: "/dashboard/qualite/corrections",
    perm: "correction.manage"
  }
];
function qualityCounts(state) {
  const { session, producers, plots, cases, alerts, corrections } = state;
  const mine = new Set(inScope(producers, session).map((p) => p.id));
  const minePlots = new Set(plots.filter((p) => mine.has(p.producerId)).map((p) => p.id));
  return {
    doublons: cases.filter((c) => c.status === "\xE0 examiner" && mine.has(c.aId)).length,
    alertes: alerts.filter((a) => a.status === "ouvert" && (mine.has(a.entityId) || minePlots.has(a.entityId))).length,
    corrections: corrections.filter((c) => c.status === "en attente" && mine.has(c.producerId)).length
  };
}

export { QUALITY_SECTIONS as Q, qualityCounts as q };
//# sourceMappingURL=quality-nav-DwckdAsn.mjs.map

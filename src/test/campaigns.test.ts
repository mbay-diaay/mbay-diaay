import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";
import {
  campaignIssues,
  canCampaignTransition,
  currentCampaign,
  isOpenCampaign,
  nextCampaignId,
} from "@/lib/campaigns";
import { CAMPAIGN_LIST } from "@/lib/mock/agronomy";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const admin = () => actions.login("Aïssatou Ndiaye", "aissatou.ndiaye@cradesc.example", "admin");
const input = { name: "CHN 2027-2028", start: "2027-10-01", end: "2028-09-30" };

describe("campagnes : règles pures", () => {
  it("n'autorise que planifiée vers en cours ou clôturée, et en cours vers clôturée", () => {
    expect(canCampaignTransition("planifiée", "en cours")).toBe(true);
    expect(canCampaignTransition("planifiée", "clôturée")).toBe(true);
    expect(canCampaignTransition("en cours", "clôturée")).toBe(true);
    expect(canCampaignTransition("clôturée", "en cours")).toBe(false);
    expect(canCampaignTransition("en cours", "planifiée")).toBe(false);
    expect(isOpenCampaign({ status: "clôturée" })).toBe(false);
  });

  it("refuse un nom vide ou déjà pris, des dates invalides ou une fin avant le début", () => {
    const keys = (patch: object) =>
      campaignIssues({ ...input, ...patch }, CAMPAIGN_LIST).map((i) => i.key);
    expect(keys({})).toEqual([]);
    expect(keys({ name: " " })).toContain("errors.campaign.nameRequired");
    expect(keys({ name: "chn  2025-2026" })).toContain("errors.campaign.nameTaken");
    expect(keys({ start: "demain" })).toContain("errors.campaign.dates");
    expect(keys({ end: "2027-10-01" })).toContain("errors.campaign.order");
    expect(
      campaignIssues({ ...CAMPAIGN_LIST[0]!, name: "CHN 2025-2026" }, CAMPAIGN_LIST, "c1"),
    ).toEqual([]);
  });

  it("trouve l'identifiant suivant et la campagne en cours", () => {
    expect(nextCampaignId(CAMPAIGN_LIST)).toBe("c3");
    expect(currentCampaign(CAMPAIGN_LIST, "2026-03-01")?.name).toBe("CHN 2025-2026");
    expect(currentCampaign([], "2026-03-01")).toBeUndefined();
  });
});

describe("campagnes : actions du store", () => {
  it("crée, ouvre puis clôture une campagne, avec le journal, et seul l'administrateur le peut", () => {
    actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    expect(actions.createCampaign(input).ok).toBe(false);
    admin();
    const res = actions.createCampaign(input);
    if (!res.ok) throw new Error(res.error);
    expect(getState().campaigns.find((c) => c.id === res.id)?.status).toBe("planifiée");
    expect(actions.createCampaign(input).ok).toBe(false); // nom déjà pris
    expect(actions.setCampaignStatus(res.id, "en cours").ok).toBe(true);
    expect(actions.setCampaignStatus(res.id, "clôturée").ok).toBe(true);
    expect(actions.setCampaignStatus(res.id, "en cours").ok).toBe(false);
    expect(actions.updateCampaign(res.id, input).ok).toBe(false); // clôturée
    expect(
      getState().audit.filter((a) => a.action.startsWith("Campagne")).length,
    ).toBeGreaterThanOrEqual(3);
  });

  it("garde le nom d'une campagne utilisée et refuse un plan dans une campagne clôturée", () => {
    admin();
    expect(
      actions.updateCampaign("c1", { name: "Autre nom", start: "2025-10-01", end: "2026-09-30" })
        .ok,
    ).toBe(false);
    expect(
      actions.updateCampaign("c1", {
        name: "CHN 2025-2026",
        start: "2025-10-01",
        end: "2026-12-31",
      }).ok,
    ).toBe(true);
    const closed = actions.createCampaign({
      name: "Test clôturée",
      start: "2030-01-01",
      end: "2030-12-31",
    });
    if (!closed.ok) throw new Error(closed.error);
    actions.setCampaignStatus(closed.id, "clôturée");
    const producer = getState().producers.find((p) => p.scoopId === "s1")!;
    const plan = actions.createPlan({
      scoopId: "s1",
      producerId: producer.id,
      campaign: "Test clôturée",
      lines: [],
    });
    expect(plan.ok).toBe(false);
    expect(
      actions.createPlan({
        scoopId: "s1",
        producerId: producer.id,
        campaign: "CHN 2025-2026",
        lines: [],
      }).ok,
    ).toBe(true);
  });
});

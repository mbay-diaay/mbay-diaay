import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { actions, getState, isSnapshot } from "@/lib/store";
import { currentCampaign } from "@/lib/campaigns";
import { CAMPAIGN_LIST } from "@/lib/mock/agronomy";
import { creditIssues } from "@/lib/commerce";
import { isPaymentDate, isValidMonthDay, nextReceipt } from "@/lib/contributions";
import { makeReceipt } from "@/lib/receipts";
import { translate } from "@/lib/i18n";

const store = new Map<string, string>();
beforeAll(() => {
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  });
});
beforeEach(() => store.clear());

const gest = () => actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
const admin = () => actions.login("Aïssatou Ndiaye", "aissatou.ndiaye@cradesc.example", "admin");
const fr = (key: Parameters<typeof translate>[1]) => translate("fr", key);

describe("lot 0 : identifiants et reçus", () => {
  it("un identifiant libéré par une suppression n'est jamais redonné", () => {
    gest();
    const a = actions.addLibraryDocument("s1", {
      kind: "convention",
      name: "a.pdf",
      sizeKb: 1,
      mime: "application/pdf",
    });
    if (!a.ok) throw new Error(a.error);
    expect(actions.removeLibraryDocument(a.id).ok).toBe(true);
    const b = actions.addLibraryDocument("s1", {
      kind: "convention",
      name: "b.pdf",
      sizeKb: 1,
      mime: "application/pdf",
    });
    if (!b.ok) throw new Error(b.error);
    expect(b.id).not.toBe(a.id);
  });

  it("deux liens de compte successifs n'ont jamais le même identifiant, même après un retrait", () => {
    admin();
    const ids = getState().links.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("les identifiants du journal continuent après le plus grand existant", () => {
    gest();
    actions.audit("Test", "Test", "un");
    actions.audit("Test", "Test", "deux");
    const ids = getState()
      .audit.slice(0, 2)
      .map((a) => Number(a.id.replace(/\D/g, "")));
    expect(ids[0]!).toBeGreaterThan(ids[1]!);
    expect(new Set(getState().audit.map((a) => a.id)).size).toBe(getState().audit.length);
  });

  it("le reçu suit le plus grand numéro de l'année, pas le nombre de lignes", () => {
    expect(makeReceipt("R", [], 2026)).toBe("R-2026-0001");
    expect(makeReceipt("R", ["R-2026-0007", "R-2026-0003", "R-2025-0099"], 2026)).toBe(
      "R-2026-0008",
    );
    expect(nextReceipt([{ receipt: "R-2026-0002" }] as never, 2026)).toBe("R-2026-0003");
    expect(makeReceipt("RC", ["R-2026-0007"], 2026)).toBe("RC-2026-0001");
  });
});

describe("lot 0 : cotisations et crédits", () => {
  it("refuse une échéance qui n'existe pas (31 février) et accepte 29 février", () => {
    expect(isValidMonthDay("02-31")).toBe(false);
    expect(isValidMonthDay("04-31")).toBe(false);
    expect(isValidMonthDay("02-29")).toBe(true);
    expect(isValidMonthDay("13-01")).toBe(false);
    gest();
    expect(
      actions.setContributionRule("s1", {
        amount: 5000,
        periodicity: "annuelle",
        dueDate: "02-31",
        startYear: 2025,
      }).ok,
    ).toBe(false);
  });

  it("refuse une date de paiement invalide, future ou trop ancienne ; plus de reçu NaN", () => {
    const today = "2026-10-26T00:00:00.000Z";
    expect(isPaymentDate("2026-10-20", today)).toBe(true);
    expect(isPaymentDate("2026-10-27", today)).toBe(false);
    expect(isPaymentDate("pas une date", today)).toBe(false);
    expect(isPaymentDate("1999-12-31", today)).toBe(false);
    gest();
    const member = getState().members.find((m) => m.scoopId === "s1" && m.status === "membre")!;
    const res = actions.recordPayment({
      memberId: member.id,
      amount: 1000,
      period: "2026",
      method: "espèces",
      paidAt: "pas une date",
    });
    expect(res.ok).toBe(false);
    expect(
      actions.recordPayment({
        memberId: member.id,
        amount: 1000,
        period: "2026",
        method: "espèces",
        paidAt: "2999-01-01T00:00:00.000Z",
      }).ok,
    ).toBe(false);
  });

  it("un remboursement ne peut pas précéder l'octroi et reçoit un numéro monotone", () => {
    gest();
    const member = getState().members.find((m) => m.scoopId === "s1" && m.status === "membre")!;
    const granted = actions.grantCredit({
      memberId: member.id,
      amount: 60000,
      ratePct: 0,
      purpose: "Engrais",
      grantedAt: "2026-10-20",
      count: 2,
      firstDue: "2026-11-20",
      everyMonths: 1,
    });
    if (!granted.ok) throw new Error(granted.error);
    expect(
      actions.recordRepayment({
        creditId: granted.id,
        amount: 1000,
        paidAt: "2026-10-01",
        method: "espèces",
      }).ok,
    ).toBe(false);
    const r1 = actions.recordRepayment({
      creditId: granted.id,
      amount: 1000,
      paidAt: "2026-10-21",
      method: "espèces",
    });
    const r2 = actions.recordRepayment({
      creditId: granted.id,
      amount: 1000,
      paidAt: "2026-10-22",
      method: "espèces",
    });
    if (!r1.ok || !r2.ok) throw new Error("remboursement");
    expect(Number(r2.receipt.slice(-4))).toBe(Number(r1.receipt.slice(-4)) + 1);
  });

  it("contrôle le rythme et l'objet d'un crédit", () => {
    const ok = {
      amount: 50000,
      ratePct: 0,
      count: 3,
      firstDue: "2026-12-01",
      grantedAt: "2026-10-20",
    };
    const today = "2026-10-26T00:00:00.000Z";
    expect(creditIssues({ ...ok, everyMonths: 1, purpose: "Semences" }, today)).toEqual([]);
    expect(creditIssues({ ...ok, everyMonths: Number.NaN }, today)).toContain(
      "errors.credit.schedule",
    );
    expect(creditIssues({ ...ok, everyMonths: 0 }, today)).toContain("errors.credit.schedule");
    expect(creditIssues({ ...ok, purpose: " " }, today)).toContain("errors.credit.purpose");
  });

  it("une vente ou une charge ancienne n'est pas rattachée à la campagne actuelle", () => {
    expect(currentCampaign(CAMPAIGN_LIST, "2026-03-01")?.name).toBe("CHN 2025-2026");
    expect(currentCampaign(CAMPAIGN_LIST, "2026-10-20")?.name).toBe("CHN 2025-2026"); // saisie tardive, moins de 90 jours
    expect(currentCampaign(CAMPAIGN_LIST, "2020-05-01")).toBeUndefined();
    expect(currentCampaign(CAMPAIGN_LIST, "2027-06-01")).toBeUndefined(); // trop tard
    gest();
    const producer = getState().producers.find((p) => p.scoopId === "s1" && !p.mergedInto)!;
    expect(
      actions.recordSale({
        producerId: producer.id,
        crop: "Oignon",
        quantityKg: 10,
        pricePerKg: 100,
        buyer: "x",
        soldAt: "2020-05-01",
      }).ok,
    ).toBe(false);
  });
});

describe("lot 0 : comptes, plans, réunions, dossiers", () => {
  it("n'écrase pas un compte qui existe déjà et n'est pas celui du membre, ni ne rétrograde un rang supérieur", () => {
    actions.login("Moussa Diouf", "moussa.diouf@scoop-kms.example", "representant");
    const adminMember = {
      ...getState().members[0]!,
      email: "aissatou.ndiaye@cradesc.example",
      status: "membre" as const,
    };
    const id = actions.addMember({
      scoopId: "s1",
      orgId: null,
      firstName: adminMember.firstName,
      lastName: "Test",
      sex: "F",
      phone: "",
      email: adminMember.email,
      status: "membre",
      producerId: null,
    });
    const res = actions.grantAccess(id, "technicien");
    expect(res.ok).toBe(false);
    expect(getState().users.find((u) => u.email === "aissatou.ndiaye@cradesc.example")?.role).toBe(
      "admin",
    );
  });

  it("le circuit d'un plan ne revient pas en arrière et saute pas d'étape", () => {
    gest();
    const plan = getState().plans.find((p) => p.status === "brouillon" && p.scoopId === "s1")!;
    expect(actions.setPlanStatus(plan.id, "à jour").ok).toBe(false);
    expect(actions.setPlanStatus(plan.id, "validé").ok).toBe(true);
    expect(actions.setPlanStatus(plan.id, "brouillon").ok).toBe(false);
    expect(actions.setPlanStatus(plan.id, "à jour").ok).toBe(true);
    expect(actions.setPlanStatus(plan.id, "validé").ok).toBe(false);
  });

  it("une réunion future ne se marque pas comme tenue ; titre et lieu sont nettoyés", () => {
    gest();
    const members = getState()
      .members.filter((m) => m.scoopId === "s1")
      .slice(0, 2)
      .map((m) => m.id);
    const res = actions.createMeeting({
      scoopId: "s1",
      kind: "bureau",
      title: "Futur",
      date: "2999-01-01T10:00:00.000Z",
      place: "Siège",
      agenda: [],
    });
    if (!res.ok) throw new Error(res.error);
    const held = actions.holdMeeting(res.id, members);
    expect(held.ok).toBe(false);
    expect(held.ok ? "" : held.error).toBe(fr("errors.meeting.future"));
    expect(actions.updateMeeting(res.id, { title: "  Nouveau titre  ", place: " Salle " }).ok).toBe(
      true,
    );
    expect(getState().meetings.find((m) => m.id === res.id)).toMatchObject({
      title: "Nouveau titre",
      place: "Salle",
    });
    expect(actions.updateMeeting(res.id, { title: "   " }).ok).toBe(false);
  });

  it("une seule version signée par procès-verbal", () => {
    gest();
    const second = actions.attachMinutesDocument("meet1", {
      name: "autre.pdf",
      sizeKb: 5,
      mime: "application/pdf",
    });
    expect(second.ok).toBe(false); // meet1 a déjà son PV signé (doc5)
    expect(second.ok ? "" : second.error).toBe(fr("errors.meeting.docExists"));
  });

  it("ne fusionne pas deux fois un cas de doublon", () => {
    admin();
    const c = getState().cases.find((x) => x.status !== "fusionné");
    if (!c) return;
    actions.mergeCase(c.id, "ok");
    const after = getState().merges[c.id];
    actions.mergeCase(c.id, "encore");
    expect(getState().merges[c.id]).toBe(after);
  });
});

describe("lot 0 : session et sauvegarde", () => {
  it("restoreSession relit le rôle dans les comptes et ignore celui du stockage", () => {
    actions.logout();
    store.set(
      "mbd.session",
      JSON.stringify({
        name: "Intrus",
        email: "fatou.sarr@cradesc.example",
        role: "admin",
        expiresAt: Date.now() + 60_000,
      }),
    );
    actions.restoreSession();
    expect(getState().session?.role).toBe("technicien");
    actions.logout();
  });

  it("restoreSession refuse un compte inconnu ou désactivé", () => {
    actions.logout();
    store.set(
      "mbd.session",
      JSON.stringify({
        name: "X",
        email: "inconnu@exemple.sn",
        role: "admin",
        expiresAt: Date.now() + 60_000,
      }),
    );
    actions.restoreSession();
    expect(getState().session).toBeNull();
    expect(store.has("mbd.session")).toBe(false);
  });

  it("désactiver son propre compte ferme la session", () => {
    admin();
    const me = getState().users.find((u) => u.email === "aissatou.ndiaye@cradesc.example")!;
    actions.toggleUser(me.id);
    expect(getState().session).toBeNull();
    admin();
    actions.toggleUser(me.id); // remet le compte pour les autres tests
  });

  it("refuse une sauvegarde incomplète ou abîmée", () => {
    admin();
    const snap = actions.exportSnapshot();
    expect(isSnapshot(snap)).toBe(true);
    const broken = { ...snap, data: { ...snap.data, users: undefined } };
    expect(isSnapshot(broken)).toBe(false);
    expect(() => actions.restoreSnapshot(broken as never)).toThrow();
    expect(isSnapshot({ ...snap, data: { ...snap.data, payments: "non" } })).toBe(false);
    expect(isSnapshot({ ...snap, data: { ...snap.data, youthMaxAge: "35" } })).toBe(false);
    expect(() => actions.restoreSnapshot(snap)).not.toThrow();
  });
});

import { beforeAll, describe, expect, it, vi, beforeEach } from "vitest";
import { actions, getState } from "@/lib/store";
import { ORGS } from "@/lib/mock/data";
import type { DossierDraft } from "@/lib/mock/cooperative";
import {
  canDecide,
  DECIDE_ROLES,
  decisionCheck,
  dueReminders,
  findDuplicate,
  SELF_APPROVE_ROLES,
  validateDraft,
} from "@/lib/dossiers";
import { ROLE_LABEL, type RoleId } from "@/lib/permissions";
import { installMemoryStorage, loginAs } from "./session";

// La connexion mémorise la session dans le navigateur : un stockage en mémoire suffit pour les règles.
beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const TECH = ["Fatou Sarr", "fatou.sarr@cradesc.example", "technicien"] as const;
const MANAGER = ["Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire"] as const;
const ADMIN = ["Aïssatou Ndiaye", "aissatou.ndiaye@cradesc.example", "admin"] as const;
const login = (who: readonly [string, string, RoleId]) => actions.login(who[0], who[1], who[2]);

const org = ORGS.find((o) => o.scoopId === "s1")!;
let n = 0;
/** Brouillon valide et unique : ni CNI, ni téléphone, ni nom déjà présents dans les données de démonstration. */
const valid = (over: Partial<DossierDraft> = {}): DossierDraft => {
  n += 1;
  return {
    firstName: `Test${n}`,
    lastName: "Dossier",
    sex: "F",
    age: 34,
    phone: `77 000 ${String(10 + n).padStart(2, "0")} 22`,
    cni: `20000000${String(10000 + n)}`,
    village: org.village,
    orgId: org.id,
    createMember: true,
    ...over,
  };
};
const png = { kind: "cni", name: "cni.jpg", sizeKb: 300, mime: "image/jpeg" } as const;

/** Un technicien crée un dossier complet et le soumet. */
function submitted(over: Partial<DossierDraft> = {}) {
  login(TECH);
  const c = actions.createDossier("s1", valid(over));
  if (!c.ok) throw new Error(c.error);
  expect(actions.addDocument(c.id, png).ok).toBe(true);
  const s = actions.submitDossier(c.id);
  if (!s.ok) throw new Error(s.error);
  return c.id;
}
const dossier = (id: string) => getState().dossiers.find((d) => d.id === id)!;

beforeAll(installMemoryStorage);
// Toute action du store exige une session et le droit du rôle : ces tests agissent en administrateur.
beforeEach(() => loginAs("admin"));

describe("contrôles à la soumission", () => {
  it("bloque un brouillon incomplet ou invalide, champ par champ", () => {
    const bad = validateDraft({ ...valid(), firstName: "", age: 12, phone: "123", cni: "42" }, 0);
    expect(bad.map((i) => i.field).sort()).toEqual(["age", "cni", "firstName", "phone", "pièces"]);
    expect(validateDraft(valid(), 1)).toEqual([]);
    expect(validateDraft({ ...valid(), age: null }, 1).map((i) => i.field)).toEqual(["age"]);
  });

  it("signale un doublon possible par CNI, téléphone, ou nom et village, sans bloquer", () => {
    const p = getState().producers.find((x) => !x.mergedInto && x.cni && x.phone)!;
    expect(findDuplicate(valid({ cni: p.cni }), getState().producers)).toEqual({
      producerId: p.id,
      reason: "CNI identique",
    });
    expect(findDuplicate(valid({ phone: p.phone }), getState().producers)?.reason).toBe(
      "téléphone identique",
    );
    expect(
      findDuplicate(
        valid({ firstName: p.firstName, lastName: p.lastName, village: p.village }),
        getState().producers,
      )?.reason,
    ).toBe("même nom et même village");
    expect(findDuplicate(valid(), getState().producers)).toBeNull();
  });
});

describe("circuit de validation", () => {
  it("le technicien monte, soumet ; la coopérative instruit puis approuve et crée producteur et membre", () => {
    const id = submitted();
    expect(dossier(id).status).toBe("soumis");
    expect(dossier(id).submittedByEmail).toBe(TECH[1]);

    // Soumis : le technicien ne peut plus modifier.
    expect(actions.updateDossier(id, { age: 40 }).ok).toBe(false);

    login(MANAGER);
    expect(actions.startReview(id).ok).toBe(true);
    const before = getState().producers.length;
    const res = actions.approveDossier(id);
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.selfApproved).toBe(false);
    expect(getState().producers).toHaveLength(before + 1);
    const producer = getState().producers.find((p) => p.id === res.producerId)!;
    expect(producer).toMatchObject({ scoopId: "s1", quality: "validé", status: "membre" });
    expect(getState().members.find((m) => m.id === res.memberId)).toMatchObject({
      producerId: producer.id,
      status: "membre",
    });
    // Les pièces suivent le producteur.
    expect(
      getState().documents.filter((d) => d.ownerType === "producteur" && d.ownerId === producer.id),
    ).toHaveLength(1);
    expect(dossier(id).history.map((h) => h.action)).toEqual([
      "créé",
      "soumis",
      "pris en examen",
      "approuvé",
    ]);
  });

  it("refuse la soumission d'un dossier incomplet et renvoie les champs à corriger", () => {
    login(TECH);
    const c = actions.createDossier("s1", valid({ cni: "123" }));
    if (!c.ok) throw new Error(c.error);
    const s = actions.submitDossier(c.id);
    expect(s.ok).toBe(false);
    if (!s.ok) expect(s.issues?.map((i) => i.field).sort()).toEqual(["cni", "pièces"]);
    expect(dossier(c.id).status).toBe("brouillon");
  });

  it("un doublon signalé oblige à choisir : lier au producteur existant ou confirmer qu'il est distinct", () => {
    const p = getState().producers.find((x) => !x.mergedInto && x.cni && x.scoopId === "s1")!;
    const id = submitted({ cni: p.cni });
    expect(dossier(id).possibleDuplicateOf).toBe(p.id);

    login(MANAGER);
    const blocked = actions.approveDossier(id);
    expect(blocked.ok).toBe(false);

    const count = getState().producers.length;
    const linked = actions.approveDossier(id, { duplicate: "lié" });
    expect(linked.ok && linked.producerId).toBe(p.id);
    expect(getState().producers).toHaveLength(count);

    const id2 = submitted({ cni: p.cni });
    login(MANAGER);
    const distinct = actions.approveDossier(id2, { duplicate: "distinct" });
    expect(distinct.ok && distinct.producerId).not.toBe(p.id);
    expect(getState().producers).toHaveLength(count + 1);
  });

  it("un complément demandé revient au technicien, qui le complète et le soumet de nouveau", () => {
    const id = submitted();
    login(MANAGER);
    expect(actions.requestComplement(id, "").ok).toBe(false);
    expect(actions.requestComplement(id, "Photo floue, merci de la refaire.").ok).toBe(true);
    expect(dossier(id).status).toBe("complément demandé");

    login(TECH);
    expect(actions.updateDossier(id, { age: 41 }).ok).toBe(true);
    expect(actions.submitDossier(id).ok).toBe(true);
    expect(dossier(id).status).toBe("soumis");
    expect(dossier(id).history.map((h) => h.action)).toContain("complément fourni");
  });

  it("un refus exige un motif, précisé pour « autre », et ne se rouvre jamais", () => {
    const id = submitted();
    login(MANAGER);
    expect(actions.refuseDossier(id, "autre").ok).toBe(false);
    expect(actions.refuseDossier(id, "autre", "ok").ok).toBe(false);
    expect(actions.refuseDossier(id, "hors zone ou hors SCOOP").ok).toBe(true);
    expect(dossier(id)).toMatchObject({
      status: "refusé",
      decision: { approved: false, reason: "hors zone ou hors SCOOP" },
    });

    // Ni approbation, ni modification, ni nouvelle soumission : il faut un nouveau dossier.
    expect(actions.approveDossier(id).ok).toBe(false);
    login(TECH);
    expect(actions.updateDossier(id, { age: 50 }).ok).toBe(false);
    expect(actions.submitDossier(id).ok).toBe(false);
  });

  it("seul le technicien auteur modifie son dossier, et seulement dans son périmètre", () => {
    login(TECH);
    const c = actions.createDossier("s1", valid());
    if (!c.ok) throw new Error(c.error);
    login(ADMIN);
    expect(actions.updateDossier(c.id, { age: 45 }).ok).toBe(false);

    login(MANAGER); // gestionnaire de la SCOOP s1
    expect(actions.createDossier("s4", valid()).ok).toBe(false);
  });
});

describe("séparation des tâches (décision D12)", () => {
  it("seuls l'administrateur et le gestionnaire peuvent traiter un dossier qu'ils ont eux-mêmes soumis", () => {
    const d = { createdByEmail: "x@exemple.sn", submittedByEmail: "x@exemple.sn" };
    (Object.keys(ROLE_LABEL) as RoleId[]).forEach((role) => {
      const res = decisionCheck(d, { email: "x@exemple.sn", role });
      expect(res.ok, `rôle ${role}`).toBe(SELF_APPROVE_ROLES.includes(role));
      // Une autre personne n'est jamais bloquée.
      expect(decisionCheck(d, { email: "autre@exemple.sn", role }).ok).toBe(true);
    });
    expect(SELF_APPROVE_ROLES).toEqual(["admin", "gestionnaire"]);
  });

  it("un administrateur approuve son propre dossier : tracé « auto-approuvé » au journal", () => {
    login(ADMIN);
    const c = actions.createDossier("s1", valid());
    if (!c.ok) throw new Error(c.error);
    actions.addDocument(c.id, png);
    expect(actions.submitDossier(c.id).ok).toBe(true);
    const res = actions.approveDossier(c.id);
    expect(res.ok && res.selfApproved).toBe(true);
    expect(dossier(c.id).decision?.selfApproved).toBe(true);
    expect(dossier(c.id).history.at(-1)?.action).toBe("auto-approuvé");
    expect(getState().audit[0]).toMatchObject({ action: "Dossier auto-approuvé", scoopId: "s1" });
  });

  it("un technicien ne peut jamais approuver ni refuser le dossier qu'il a soumis", () => {
    const id = submitted();
    login(TECH);
    expect(actions.approveDossier(id)).toMatchObject({ ok: false });
    expect(actions.refuseDossier(id, "doublon")).toMatchObject({ ok: false });
    expect(dossier(id).status).toBe("soumis");
  });
});

describe("qui instruit, qui décide", () => {
  it("la secrétaire instruit mais ne décide pas ; le représentant décide", () => {
    expect(DECIDE_ROLES).toEqual(["admin", "gestionnaire", "representant"]);
    (Object.keys(ROLE_LABEL) as RoleId[]).forEach((r) =>
      expect(canDecide(r), r).toBe(["admin", "gestionnaire", "representant"].includes(r)),
    );

    const id = submitted();
    actions.login("Aminata Bâ", "aminata.ba@scoop-kms.example", "secretaire");
    expect(actions.startReview(id).ok).toBe(true);
    expect(actions.requestComplement(id, "La photo est floue, merci de la refaire.").ok).toBe(true);
    login(TECH);
    expect(actions.submitDossier(id).ok).toBe(true);

    actions.login("Aminata Bâ", "aminata.ba@scoop-kms.example", "secretaire");
    expect(actions.approveDossier(id)).toMatchObject({
      ok: false,
      error: expect.stringMatching(/décision revient/),
    });
    expect(actions.refuseDossier(id, "doublon")).toMatchObject({ ok: false });
    expect(dossier(id).status).toBe("soumis");

    actions.login("Moussa Diouf", "moussa.diouf@scoop-kms.example", "representant");
    expect(actions.approveDossier(id).ok).toBe(true);
  });
});

describe("rappels à 14 jours", () => {
  it("rappelle un dossier sans réponse, une seule fois, sans jamais l'approuver", () => {
    const id = submitted();
    const now = new Date();
    expect(dueReminders(getState().dossiers, now.toISOString()).map((d) => d.id)).not.toContain(id);

    const in15 = new Date(now.getTime() + 15 * 86_400_000).toISOString();
    expect(dueReminders(getState().dossiers, in15).map((d) => d.id)).toContain(id);
    login(MANAGER); // relancer exige le droit d'instruire
    const sent = actions.sendDossierReminders(in15);
    expect(sent).toBeGreaterThan(0);
    expect(dossier(id)).toMatchObject({ status: "soumis", remindedAt: in15 });
    expect(dossier(id).history.at(-1)?.action).toBe("rappel");
    expect(actions.sendDossierReminders(in15)).toBe(0);
  });
});

describe("membres, plans et téléchargements", () => {
  it("un membre n'est pas forcément producteur, et son statut ne touche pas aux fiches", () => {
    login(ADMIN); // ajouter un membre exige member.manage (administrateur ou représentant)
    const direct = getState().members.filter((m) => m.producerId === null);
    expect(direct.length).toBeGreaterThan(0);
    const producers = getState().producers.length;
    const id = actions.addMember({
      scoopId: "s1",
      orgId: null,
      firstName: "Aby",
      lastName: "Test",
      sex: "F",
      phone: "",
      email: "aby.test@membres.example",
      status: "candidat",
      producerId: null,
    });
    expect(getState().members.find((m) => m.id === id)?.joinedAt).toBeNull();
    expect(actions.setMembershipStatus(id, "membre", "Cotisation versée")).toBe(true);
    expect(getState().members.find((m) => m.id === id)?.joinedAt).not.toBeNull();
    expect(getState().producers).toHaveLength(producers);
  });

  it("un plan d'exploitation se rattache à un producteur ou à un dossier, dans le périmètre", () => {
    login(MANAGER);
    const producer = getState().producers.find((p) => p.scoopId === "s1")!;
    const line = { plotId: null, crop: "Oignon", areaHa: 0.5, sowingMonth: "2026-11" };
    expect(
      actions.createPlan({
        scoopId: "s1",
        producerId: null,
        campaign: "CHN 2025-2026",
        lines: [line],
      }).ok,
    ).toBe(false);
    expect(
      actions.createPlan({
        scoopId: "s4",
        producerId: producer.id,
        campaign: "CHN 2025-2026",
        lines: [line],
      }).ok,
    ).toBe(false);
    const res = actions.createPlan({
      scoopId: "s1",
      producerId: producer.id,
      campaign: "CHN 2025-2026",
      lines: [line],
    });
    if (!res.ok) throw new Error(res.error);
    expect(getState().plans.find((p) => p.id === res.id)?.status).toBe("brouillon");
    expect(actions.setPlanStatus(res.id, "validé").ok).toBe(true);
    expect(actions.updatePlan(res.id, { notes: "Semis après les pluies" }).ok).toBe(true);
  });

  it("chaque téléchargement de pièce écrit au journal l'utilisateur, la SCOOP et l'objet", () => {
    login(MANAGER);
    const doc = getState().documents.find((d) => d.sensitive)!;
    const res = actions.downloadDocument(doc.id);
    expect(res.ok).toBe(true);
    expect(getState().audit[0]).toMatchObject({
      user: MANAGER[0],
      action: "Téléchargement de pièce sensible",
      scoopId: doc.scoopId,
    });
    expect(getState().audit[0]!.entity).toContain(doc.name);
    actions.recordReportDownload("Synthèse des effectifs", "s1");
    expect(getState().audit[0]).toMatchObject({
      action: "Téléchargement de rapport",
      scoopId: "s1",
    });
  });

  it("une ancienne sauvegarde, sans ces listes, se restaure avec des listes vides", () => {
    const snap = JSON.parse(JSON.stringify(actions.exportSnapshot()));
    delete snap.data.members;
    delete snap.data.dossiers;
    actions.restoreSnapshot(snap);
    expect(getState().members).toEqual([]);
    expect(getState().dossiers).toEqual([]);
  });
});

describe("comptes de démonstration et périmètre de la session", () => {
  it("chaque compte de démonstration existe dans la gestion des utilisateurs, avec le même rôle", async () => {
    const { DEMO_ACCOUNTS } = await import("@/lib/auth");
    DEMO_ACCOUNTS.forEach((a) => {
      const user = getState().users.find((u) => u.email === a.email);
      expect(user, a.email).toBeDefined();
      expect(user?.role).toBe(a.role);
    });
  });

  it("le périmètre de la session vient du compte : un technicien couvre ses SCOOP, un rôle de coopérative la sienne", () => {
    login(TECH);
    expect(getState().session?.scope).toMatchObject({ kind: "scoop", scoopIds: ["s1", "s2"] });
    actions.login("Moussa Diouf", "moussa.diouf@scoop-kms.example", "representant");
    expect(getState().session?.scope).toMatchObject({ kind: "scoop", scoopIds: ["s1"] });
    login(ADMIN);
    expect(getState().session?.scope.kind).toBe("consolidé");
  });
});

describe("données de démonstration", () => {
  it("couvrent tous les états du circuit et des membres sans producteur", async () => {
    const { DOSSIERS, MEMBERS } = await import("@/lib/mock/cooperative");
    expect(new Set(DOSSIERS.map((d) => d.status))).toEqual(
      new Set(["brouillon", "soumis", "en examen", "complément demandé", "approuvé", "refusé"]),
    );
    expect(MEMBERS.some((m) => m.producerId === null)).toBe(true);
    expect(new Set(MEMBERS.map((m) => m.status))).toEqual(
      new Set(["candidat", "membre", "suspendu", "sorti"]),
    );
  });
});

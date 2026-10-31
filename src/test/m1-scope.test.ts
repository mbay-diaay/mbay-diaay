import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState, type Session } from "@/lib/store";
import { fetchMyPermissions, type RoleId } from "@/lib/permissions";
import {
  canDownloadDocument,
  scopedLibrary,
  scopedMembers,
  scopedMeetings,
  scopedPayments,
  scopedRules,
} from "@/lib/scope";
import {
  CONTRIBUTION_PAYMENTS,
  CONTRIBUTION_RULES,
  DOCUMENTS,
  MEETINGS,
  MEMBERS,
} from "@/lib/mock/cooperative";

// La connexion mémorise la session dans le navigateur : un stockage en mémoire suffit pour les règles.
beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const sessionOf = (role: RoleId, scoopIds?: string[]): Session => ({
  name: "Test",
  email: "test@exemple.sn",
  role,
  expiresAt: Date.now() + 60_000,
  ...fetchMyPermissions(role, scoopIds),
});
const ids = (xs: { id: string }[]) => xs.map((x) => x.id).sort();

describe("cotisations, réunions et rapports : périmètre SCOOP", () => {
  const foreign = <T extends { scoopId: string }>(item: T, scoopId = "s2"): T => ({
    ...item,
    scoopId,
  });
  const payments = [
    ...CONTRIBUTION_PAYMENTS.filter((p) => p.scoopId === "s1").slice(0, 2),
    foreign({ ...CONTRIBUTION_PAYMENTS[0]!, id: "etranger" }),
  ];
  const meetings = [
    ...MEETINGS.filter((m) => m.scoopId === "s1").slice(0, 2),
    foreign({ ...MEETINGS[0]!, id: "etrangere" }),
  ];
  const rules = [CONTRIBUTION_RULES[0]!, foreign({ ...CONTRIBUTION_RULES[0]! })];

  it("un rôle de coopérative ne voit que les paiements, règles et réunions de sa SCOOP", () => {
    for (const role of ["gestionnaire", "representant", "secretaire"] as const) {
      const s = sessionOf(role, ["s1"]);
      expect(scopedPayments(payments, s).every((p) => p.scoopId === "s1")).toBe(true);
      expect(scopedPayments(payments, s).some((p) => p.id === "etranger")).toBe(false);
      expect(scopedMeetings(meetings, s).some((m) => m.id === "etrangere")).toBe(false);
      expect(scopedRules(rules, s).every((r) => r.scoopId === "s1")).toBe(true);
    }
  });

  it("l'administrateur et la faîtière voient toutes les SCOOP", () => {
    for (const role of ["admin", "faitiere"] as const) {
      const s = sessionOf(role);
      expect(scopedPayments(payments, s)).toHaveLength(payments.length);
      expect(scopedMeetings(meetings, s)).toHaveLength(meetings.length);
      expect(scopedRules(rules, s)).toHaveLength(rules.length);
    }
  });

  it("un rôle limité sans SCOOP ne voit rien", () => {
    const s = sessionOf("secretaire", []);
    expect(scopedPayments(payments, s)).toHaveLength(0);
    expect(scopedMeetings(meetings, s)).toHaveLength(0);
  });
});

describe("documents de la coopérative : périmètre et sensibilité", () => {
  const base = DOCUMENTS[0]!;
  const doc = (id: string, scoopId: string, sensitive: boolean, ownerType = "scoop" as const) => ({
    ...base,
    id,
    scoopId,
    sensitive,
    ownerType,
    ownerId: scoopId,
  });
  const library = [
    doc("ouvert", "s1", false),
    doc("sensible", "s1", true),
    doc("autre-scoop", "s2", false),
    { ...doc("dossier", "s1", false), ownerType: "dossier" as const },
  ];

  it("le gestionnaire et le représentant lisent les documents de leur SCOOP, sensibles compris", () => {
    for (const role of ["gestionnaire", "representant"] as const) {
      const s = sessionOf(role, ["s1"]);
      expect(ids(scopedLibrary(library, s))).toEqual(["ouvert", "sensible"]);
    }
  });

  it("la secrétaire ne lit jamais un document sensible", () => {
    expect(ids(scopedLibrary(library, sessionOf("secretaire", ["s1"])))).toEqual(["ouvert"]);
  });

  it("la secrétaire télécharge un document ouvert de la coopérative, jamais un document sensible", () => {
    const sec = sessionOf("secretaire", ["s1"]);
    expect(canDownloadDocument(sec, library[0]!)).toBe(true);
    expect(canDownloadDocument(sec, library[1]!)).toBe(false);
    // Une pièce de dossier reste soumise à document.download, que la secrétaire n'a pas.
    expect(canDownloadDocument(sec, library[3]!)).toBe(false);
    const manager = sessionOf("gestionnaire", ["s1"]);
    expect(canDownloadDocument(manager, library[1]!)).toBe(true);
    expect(canDownloadDocument(sessionOf("technicien", ["s1"]), library[0]!)).toBe(false);
  });

  it("les rôles sans droit sur les documents n'en voient aucun", () => {
    for (const role of ["faitiere", "ventes", "rapports", "technicien"] as const) {
      expect(scopedLibrary(library, sessionOf(role, ["s1"]))).toEqual([]);
    }
  });

  it("l'administrateur voit toutes les SCOOP mais jamais les pièces de dossier", () => {
    expect(ids(scopedLibrary(library, sessionOf("admin")))).toEqual([
      "autre-scoop",
      "ouvert",
      "sensible",
    ]);
  });
});

describe("actions du store : le périmètre est appliqué", () => {
  it("un gestionnaire ne peut ni enregistrer un paiement, ni convoquer, ni déposer dans une autre SCOOP", () => {
    actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    const other = getState().members.find((m) => m.scoopId !== "s1");
    expect(other).toBeDefined();
    expect(
      actions.recordPayment({
        memberId: other!.id,
        amount: 5000,
        period: "2026",
        method: "espèces",
      }).ok,
    ).toBe(false);
    expect(
      actions.createMeeting({
        scoopId: other!.scoopId,
        kind: "assemblée générale",
        title: "Intrusion",
        date: "2026-12-01T10:00:00.000Z",
        place: "Ailleurs",
        agenda: [],
      }).ok,
    ).toBe(false);
    expect(
      actions.addLibraryDocument(other!.scoopId, {
        kind: "statuts",
        name: "statuts.pdf",
        sizeKb: 10,
        mime: "application/pdf",
      }).ok,
    ).toBe(false);
  });
});

describe("lecture protégée : le droit d'abord, puis le périmètre", () => {
  it("un rôle sans le droit de lecture ne reçoit rien, même dans son périmètre", () => {
    const ventes = sessionOf("ventes", ["s1"]);
    const rapports = sessionOf("rapports", ["s1"]);
    expect(scopedPayments(CONTRIBUTION_PAYMENTS, ventes)).toEqual([]);
    expect(scopedRules(CONTRIBUTION_RULES, rapports)).toEqual([]);
    expect(scopedMeetings(MEETINGS, ventes)).toEqual([]);
    expect(scopedMembers(MEMBERS, rapports)).toEqual([]);
    expect(scopedPayments(CONTRIBUTION_PAYMENTS, null)).toEqual([]);
  });

  it("un rôle avec le droit reçoit les données de son périmètre seulement", () => {
    const secretaire = sessionOf("secretaire", ["s1"]);
    expect(scopedPayments(CONTRIBUTION_PAYMENTS, secretaire).length).toBeGreaterThan(0);
    expect(scopedPayments(CONTRIBUTION_PAYMENTS, secretaire).every((p) => p.scoopId === "s1")).toBe(
      true,
    );
    expect(scopedMeetings(MEETINGS, secretaire).every((m) => m.scoopId === "s1")).toBe(true);
  });
});

import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";
import {
  attendanceStats,
  canEditMinutes,
  canMeetingTransition,
  sortMeetings,
} from "@/lib/meetings";
import { scopedLibrary, scopedMeetings } from "@/lib/scope";
import type { Meeting } from "@/lib/mock/cooperative";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const gest = () => actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
const draft = {
  scoopId: "s1",
  kind: "bureau" as const,
  title: "Point mensuel",
  date: "2026-10-20T10:00:00.000Z",
  place: "Siège",
  agenda: ["Cotisations", " "],
};

describe("réunions : règles pures", () => {
  it("n'autorise que planifiée vers tenue ou annulée", () => {
    expect(canMeetingTransition("planifiée", "tenue")).toBe(true);
    expect(canMeetingTransition("planifiée", "annulée")).toBe(true);
    expect(canMeetingTransition("tenue", "annulée")).toBe(false);
    expect(canMeetingTransition("annulée", "tenue")).toBe(false);
  });

  it("le procès-verbal ne se rédige qu'après la réunion et avant sa validation", () => {
    const base = { minutes: null };
    expect(canEditMinutes({ status: "planifiée", ...base })).toBe(false);
    expect(canEditMinutes({ status: "tenue", ...base })).toBe(true);
    const valid = {
      text: "t",
      status: "validé" as const,
      updatedAt: "",
      validatedBy: "x",
      validatedAt: "",
      documentId: null,
    };
    expect(canEditMinutes({ status: "tenue", minutes: valid })).toBe(false);
  });

  it("calcule la présence et trie les réunions à venir d'abord", () => {
    expect(attendanceStats({ presentIds: ["a", "b", "c"] }, 4)).toEqual({
      present: 3,
      total: 4,
      rate: 75,
    });
    expect(attendanceStats({ presentIds: [] }, 0).rate).toBe(0);
    const m = (id: string, date: string, status: Meeting["status"]) =>
      ({ id, date, status }) as Meeting;
    const sorted = sortMeetings(
      [
        m("old", "2026-01-01", "tenue"),
        m("late", "2026-12-01", "planifiée"),
        m("soon", "2026-11-01", "planifiée"),
      ],
      "2026-10-25T00:00:00.000Z",
    );
    expect(sorted.map((x) => x.id)).toEqual(["soon", "late", "old"]);
  });
});

describe("réunions : actions du store", () => {
  it("crée, tient, rédige et valide un procès-verbal que plus personne ne modifie", () => {
    gest();
    const created = actions.createMeeting(draft);
    if (!created.ok) throw new Error("création");
    const id = created.id;
    expect(getState().meetings.find((m) => m.id === id)?.agenda).toEqual(["Cotisations"]);
    expect(actions.saveMinutes(id, "trop tôt").ok).toBe(false);
    expect(actions.holdMeeting(id, []).ok).toBe(false);
    const members = getState()
      .members.filter((m) => m.scoopId === "s1")
      .slice(0, 3)
      .map((m) => m.id);
    expect(actions.holdMeeting(id, [...members, "inconnu"]).ok).toBe(true);
    expect(getState().meetings.find((m) => m.id === id)?.presentIds).toEqual(members);
    expect(actions.saveMinutes(id, "  Décisions prises.  ").ok).toBe(true);
    expect(actions.validateMinutes(id).ok).toBe(true);
    expect(actions.saveMinutes(id, "modif").ok).toBe(false);
    expect(actions.updateMeeting(id, { title: "autre" }).ok).toBe(false);
    expect(
      getState().audit.some((a) => a.action === "Procès-verbal validé" && a.scoopId === "s1"),
    ).toBe(true);
  });

  it("annule avec un motif et refuse une réunion d'une autre SCOOP", () => {
    gest();
    const created = actions.createMeeting(draft);
    if (!created.ok) throw new Error("création");
    expect(actions.cancelMeeting(created.id, "x").ok).toBe(false);
    expect(actions.cancelMeeting(created.id, "quorum impossible").ok).toBe(true);
    expect(actions.cancelMeeting(created.id, "encore").ok).toBe(false);
    expect(actions.createMeeting({ ...draft, scoopId: "s2" }).ok).toBe(false);
    expect(actions.holdMeeting("meet4", ["m1"]).ok).toBe(false);
    expect(
      scopedMeetings(getState().meetings, getState().session).every((m) => m.scoopId === "s1"),
    ).toBe(true);
  });

  it("refuse une réunion sans titre ni lieu", () => {
    gest();
    expect(actions.createMeeting({ ...draft, title: " " }).ok).toBe(false);
    expect(actions.createMeeting({ ...draft, date: "pas une date" }).ok).toBe(false);
  });
});

describe("bibliothèque de la coopérative", () => {
  it("ajoute et retire un document de sa SCOOP, jamais d'une autre", () => {
    gest();
    const res = actions.addLibraryDocument("s1", {
      kind: "convention",
      name: "convention.pdf",
      sizeKb: 120,
      mime: "application/pdf",
    });
    if (!res.ok) throw new Error("ajout");
    expect(
      scopedLibrary(getState().documents, getState().session).some((d) => d.id === res.id),
    ).toBe(true);
    expect(
      actions.addLibraryDocument("s2", {
        kind: "statuts",
        name: "x.pdf",
        sizeKb: 1,
        mime: "application/pdf",
      }).ok,
    ).toBe(false);
    expect(
      actions.addLibraryDocument("s1", {
        kind: "statuts",
        name: "énorme.pdf",
        sizeKb: 99999,
        mime: "application/pdf",
      }).ok,
    ).toBe(false);
    expect(actions.removeLibraryDocument("doc7").ok).toBe(false);
    expect(actions.removeLibraryDocument(res.id).ok).toBe(true);
  });

  it("masque un document sensible sans le droit CNI et rattache le procès-verbal signé", () => {
    gest();
    const sensitive = actions.addLibraryDocument("s1", {
      kind: "justificatif",
      name: "pièce.pdf",
      sizeKb: 10,
      mime: "application/pdf",
      sensitive: true,
    });
    if (!sensitive.ok) throw new Error("ajout");
    actions.login("Test", "secretaire@exemple.sn", "secretaire");
    expect(
      scopedLibrary(getState().documents, getState().session).some((d) => d.id === sensitive.id),
    ).toBe(false);
    gest();
    const att = actions.attachMinutesDocument("meet2", {
      name: "pv_signe.pdf",
      sizeKb: 80,
      mime: "application/pdf",
    });
    expect(att.ok).toBe(true);
    expect(getState().meetings.find((m) => m.id === "meet2")?.minutes?.documentId).toBe(
      att.ok ? att.id : "",
    );
  });
});

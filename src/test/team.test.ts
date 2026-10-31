import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";
import { accountBlocker, assignableRoles } from "@/lib/team";
import type { Member } from "@/lib/mock/cooperative";
import type { RoleId } from "@/lib/permissions";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const REP = ["Moussa Diouf", "moussa.diouf@scoop-kms.example", "representant"] as const;
const ADMIN = ["Aïssatou Ndiaye", "aissatou.ndiaye@cradesc.example", "admin"] as const;
const login = (w: readonly [string, string, RoleId]) => actions.login(w[0], w[1], w[2]);

let n = 0;
/** Nouveau membre de la SCOOP s1, en règle et joignable par e-mail. */
function newMember(over: Partial<Omit<Member, "id" | "history" | "joinedAt">> = {}) {
  n += 1;
  login(REP);
  const id = actions.addMember({
    scoopId: "s1",
    orgId: null,
    firstName: `Membre${n}`,
    lastName: "Équipe",
    sex: "F",
    phone: "",
    email: `membre${n}@equipe.example`,
    status: "membre",
    producerId: null,
    ...over,
  });
  return id;
}
const userOf = (memberId: string) => getState().users.find((u) => u.memberId === memberId);

describe("équipe de la coopérative", () => {
  it("le représentant attribue les rôles de sa SCOOP, pas plus haut que lui ; l'administrateur les attribue tous", () => {
    expect(assignableRoles("representant")).toEqual([
      "secretaire",
      "ventes",
      "rapports",
      "technicien",
    ]);
    expect(assignableRoles("admin")).toContain("representant");
    expect(assignableRoles("admin")).toContain("gestionnaire");
    (
      ["gestionnaire", "faitiere", "technicien", "secretaire", "ventes", "rapports"] as RoleId[]
    ).forEach((r) => expect(assignableRoles(r), r).toEqual([]));
  });

  it("seul un membre en règle, avec une adresse e-mail, peut recevoir un accès", () => {
    expect(accountBlocker({ status: "membre", email: "a@b.sn" })).toBeNull();
    expect(accountBlocker({ status: "candidat", email: "a@b.sn" })).toMatch(/membre en règle/);
    expect(accountBlocker({ status: "suspendu", email: "a@b.sn" })).toMatch(/membre en règle/);
    expect(accountBlocker({ status: "membre", email: "" })).toMatch(/e-mail/);
    expect(accountBlocker({ status: "membre", email: "pas-un-mail" })).toMatch(/e-mail/);
  });

  it("attribuer un rôle crée le compte lié au membre, sans toucher au statut ni à la fiche producteur", () => {
    const id = newMember();
    const producers = getState().producers.length;
    const res = actions.grantAccess(id, "secretaire");
    expect(res.ok).toBe(true);
    expect(userOf(id)).toMatchObject({
      role: "secretaire",
      scoopId: "s1",
      active: true,
      memberId: id,
    });
    expect(getState().members.find((m) => m.id === id)?.status).toBe("membre");
    expect(getState().producers).toHaveLength(producers);
    expect(getState().audit[0]).toMatchObject({ action: "Accès attribué", scoopId: "s1" });
  });

  it("un technicien reçoit sa SCOOP dans une liste, changer son rôle met le compte à jour sans le dupliquer", () => {
    const id = newMember();
    actions.grantAccess(id, "technicien");
    expect(userOf(id)?.scoopIds).toEqual(["s1"]);
    const users = getState().users.length;
    expect(actions.grantAccess(id, "rapports").ok).toBe(true);
    expect(getState().users).toHaveLength(users);
    expect(userOf(id)).toMatchObject({ role: "rapports", scoopId: "s1" });
  });

  it("refuse un rôle trop élevé, un candidat, un membre sans e-mail, soi-même et une autre SCOOP", () => {
    const id = newMember();
    expect(actions.grantAccess(id, "gestionnaire").ok).toBe(false);
    expect(actions.grantAccess(id, "representant").ok).toBe(false);

    const candidate = newMember({ status: "candidat" });
    expect(actions.grantAccess(candidate, "ventes").ok).toBe(false);
    const noMail = newMember({ email: "" });
    expect(actions.grantAccess(noMail, "ventes").ok).toBe(false);

    login(REP);
    const self = getState().members.find((m) => m.email === REP[1])!;
    expect(actions.grantAccess(self.id, "secretaire")).toMatchObject({
      ok: false,
      error: expect.stringMatching(/propres accès/),
    });

    const other = getState().members.find((m) => m.scoopId === "s2")!;
    login(REP);
    expect(actions.grantAccess(other.id, "ventes").ok).toBe(false);
  });

  it("l'administrateur peut nommer un représentant", () => {
    const id = newMember();
    login(ADMIN);
    expect(actions.grantAccess(id, "representant").ok).toBe(true);
    expect(userOf(id)?.role).toBe("representant");
  });

  it("retirer l'accès ferme le compte ; suspendre ou sortir un membre le ferme aussi", () => {
    const a = newMember();
    actions.grantAccess(a, "ventes");
    expect(actions.revokeAccess(a).ok).toBe(true);
    expect(userOf(a)?.active).toBe(false);
    expect(actions.revokeAccess(a).ok).toBe(false);

    const b = newMember();
    actions.grantAccess(b, "rapports");
    actions.setMembershipStatus(b, "suspendu", "Cotisations impayées");
    expect(userOf(b)?.active).toBe(false);
    // Le rouvrir ne rend pas l'accès tout seul : il faut une attribution explicite.
    actions.setMembershipStatus(b, "membre");
    expect(userOf(b)?.active).toBe(false);
    expect(actions.grantAccess(b, "rapports").ok).toBe(true);
    expect(userOf(b)?.active).toBe(true);
  });

  it("le gestionnaire, qui n'attribue aucun rôle, ne peut ni donner ni retirer un accès", () => {
    const id = newMember();
    actions.grantAccess(id, "ventes");
    actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    expect(actions.grantAccess(id, "rapports").ok).toBe(false);
    expect(actions.revokeAccess(id).ok).toBe(false);
  });

  it("chaque compte de démonstration est lié à un membre de sa SCOOP", () => {
    getState()
      .users.filter((u) => ["u2", "u6", "u7", "u8", "u9", "u10"].includes(u.id))
      .forEach((u) => {
        const member = getState().members.find((m) => m.id === u.memberId);
        expect(member, u.email).toBeDefined();
        expect(member?.producerId).toBeNull();
      });
  });
});

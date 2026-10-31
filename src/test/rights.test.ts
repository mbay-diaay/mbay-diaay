import { describe, expect, it } from "vitest";
import {
  fetchMyPermissions,
  PERMISSION_LABEL,
  ROLE_IS_SCOPED,
  ROLE_LABEL,
  ROLE_PERMISSIONS,
  type Permission,
  type RoleId,
} from "@/lib/permissions";
import { DEMO_ACCOUNTS } from "@/lib/auth/demo-service";
import { getState, type Session } from "@/lib/store";
import {
  canDownloadDocument,
  canReadDocument,
  inScope,
  scoopIdsOf,
  scopedDocuments,
  scopedDossiers,
  scopedMembers,
  scopedPlans,
} from "@/lib/scope";
import { DOCUMENTS, DOSSIERS, MEMBERS, PLANS } from "@/lib/mock/cooperative";

/**
 * Matrice de référence (docs/ETAT_DU_PROJET.md, 4.5.3), écrite à part du code :
 * changer un droit dans `permissions.ts` fait échouer ce test tant que la matrice n'est pas relue.
 */
const ALL: RoleId[] = [
  "admin",
  "faitiere",
  "gestionnaire",
  "representant",
  "secretaire",
  "ventes",
  "rapports",
  "technicien",
];
const WHO: Record<string, { perms: Permission[]; roles: RoleId[] }> = {
  "producteurs : lire": {
    perms: ["producer.read"],
    roles: [
      "admin",
      "faitiere",
      "gestionnaire",
      "representant",
      "secretaire",
      "rapports",
      "technicien",
    ],
  },
  "producteurs : modifier": { perms: ["producer.edit"], roles: ["admin", "gestionnaire"] },
  "CNI en clair (tracé)": { perms: ["cni.read"], roles: ["admin", "gestionnaire"] },
  "organisations : lire": {
    perms: ["org.read"],
    roles: ["admin", "faitiere", "gestionnaire", "representant", "secretaire"],
  },
  "organisations : gérer": { perms: ["org.manage"], roles: ["admin", "gestionnaire"] },
  "membres : lire": {
    perms: ["member.read"],
    roles: ["admin", "faitiere", "gestionnaire", "representant", "secretaire"],
  },
  "membres : gérer et attribuer les rôles": {
    perms: ["member.manage", "role.assign"],
    roles: ["admin", "representant"],
  },
  "dossier : créer et soumettre": {
    perms: ["dossier.create", "dossier.submit"],
    roles: ["admin", "technicien"],
  },
  "dossier : traiter": {
    perms: ["dossier.review"],
    roles: ["admin", "gestionnaire", "representant", "secretaire"],
  },
  "pièces : consulter": {
    perms: ["document.read"],
    roles: ["admin", "gestionnaire", "representant", "secretaire", "technicien"],
  },
  "pièces : télécharger": {
    perms: ["document.download"],
    roles: ["admin", "gestionnaire", "representant"],
  },
  "plan d'exploitation : lire": {
    perms: ["plan.read"],
    roles: [
      "admin",
      "faitiere",
      "gestionnaire",
      "representant",
      "secretaire",
      "rapports",
      "technicien",
    ],
  },
  "plan d'exploitation : écrire": {
    perms: ["plan.write"],
    roles: ["admin", "gestionnaire", "technicien"],
  },
  "rapports : historique et téléchargement": {
    perms: ["report.read", "report.download"],
    roles: ["admin", "faitiere", "gestionnaire", "representant", "rapports"],
  },
  "journal de sa SCOOP": {
    perms: ["audit.read.scoop"],
    roles: ["admin", "gestionnaire", "representant"],
  },
  "coopératives : créer et gérer": { perms: ["scoop.manage"], roles: ["admin"] },
  "cotisations : lire": {
    perms: ["contribution.read"],
    roles: ["admin", "faitiere", "gestionnaire", "representant", "secretaire"],
  },
  "cotisations : enregistrer": {
    perms: ["contribution.manage"],
    roles: ["admin", "gestionnaire", "representant"],
  },
  "réunions : lire": {
    perms: ["meeting.read"],
    roles: ["admin", "faitiere", "gestionnaire", "representant", "secretaire"],
  },
  "réunions : convoquer et rédiger": {
    perms: ["meeting.manage"],
    roles: ["admin", "gestionnaire", "representant", "secretaire"],
  },
  "documents de la coopérative : lire et déposer": {
    perms: ["library.read", "library.manage"],
    roles: ["admin", "gestionnaire", "representant", "secretaire"],
  },
  "campagnes : lire": {
    perms: ["campaign.read", "operation.read"],
    roles: [
      "admin",
      "faitiere",
      "gestionnaire",
      "representant",
      "secretaire",
      "rapports",
      "technicien",
    ],
  },
  "campagnes : gérer": { perms: ["campaign.manage"], roles: ["admin"] },
  "calendriers culturaux : lire": {
    perms: ["calendar.read"],
    roles: [
      "admin",
      "faitiere",
      "gestionnaire",
      "representant",
      "secretaire",
      "rapports",
      "technicien",
    ],
  },
  "calendriers culturaux : écrire": {
    perms: ["calendar.write", "operation.write"],
    roles: ["admin", "gestionnaire", "technicien"],
  },
  "calendriers culturaux : valider": {
    perms: ["calendar.validate"],
    roles: ["admin", "gestionnaire"],
  },
  "charges : lire": {
    perms: ["expense.read"],
    roles: ["admin", "faitiere", "gestionnaire", "representant", "technicien", "rapports"],
  },
  "charges : saisir": {
    perms: ["expense.write"],
    roles: ["admin", "gestionnaire", "technicien"],
  },
  "comptes d'exploitation (marges) : lire": {
    perms: ["exploitation.read"],
    roles: ["admin", "faitiere", "gestionnaire", "representant", "rapports"],
  },
  "ventes : lire": {
    perms: ["sales.read"],
    roles: ["admin", "faitiere", "gestionnaire", "representant", "ventes", "rapports"],
  },
  "ventes : gérer": { perms: ["sales.manage"], roles: ["admin", "gestionnaire", "ventes"] },
  "stocks d'intrants : lire": {
    perms: ["stock.read"],
    roles: ["admin", "faitiere", "gestionnaire", "representant", "secretaire", "ventes"],
  },
  "stocks d'intrants : gérer": { perms: ["stock.manage"], roles: ["admin", "gestionnaire"] },
  "crédits : lire": {
    perms: ["credit.read"],
    roles: ["admin", "faitiere", "gestionnaire", "representant"],
  },
  "crédits : gérer": { perms: ["credit.manage"], roles: ["admin", "gestionnaire"] },
  "administration de la plateforme": {
    perms: [
      "user.manage",
      "account.manage",
      "device.manage",
      "config.manage",
      "import.manage",
      "data.backup",
      "audit.read",
      "quality.merge",
      "producer.export_nominatif",
      "map.export",
    ],
    roles: ["admin"],
  },
};

describe("droits par rôle (matrice 4.5.3)", () => {
  for (const [row, { perms, roles }] of Object.entries(WHO)) {
    for (const role of ALL) {
      for (const perm of perms) {
        const expected = roles.includes(role);
        it(`${row} : ${ROLE_LABEL[role]} ${expected ? "peut" : "ne peut pas"} (${perm})`, () => {
          expect(ROLE_PERMISSIONS[role].includes(perm)).toBe(expected);
        });
      }
    }
  }

  it("chaque droit et chaque rôle a un libellé, et l'administrateur a tous les droits", () => {
    for (const role of ALL) expect(ROLE_LABEL[role]).toBeTruthy();
    expect(Object.keys(ROLE_LABEL).sort()).toEqual([...ALL].sort());
    const labelled = Object.keys(PERMISSION_LABEL) as Permission[];
    expect(new Set(ROLE_PERMISSIONS.admin)).toEqual(new Set(labelled));
    for (const role of ALL) {
      for (const p of ROLE_PERMISSIONS[role]) expect(labelled).toContain(p);
    }
  });

  it("le secrétaire traite les dossiers sans jamais lire la CNI ni télécharger de pièce", () => {
    const p = ROLE_PERMISSIONS.secretaire;
    expect(p).toContain("dossier.review");
    expect(p).not.toContain("cni.read");
    expect(p).not.toContain("document.download");
  });

  it("le technicien crée et soumet mais n'approuve pas, et ne voit jamais la CNI en clair", () => {
    const p = ROLE_PERMISSIONS.technicien;
    expect(p).toContain("dossier.create");
    expect(p).toContain("dossier.submit");
    expect(p).not.toContain("dossier.review");
    expect(p).not.toContain("cni.read");
  });

  it("l'historique des rapports et leur téléchargement sont deux droits distincts", () => {
    expect(PERMISSION_LABEL["report.read"]).not.toBe(PERMISSION_LABEL["report.download"]);
    expect(ROLE_PERMISSIONS.secretaire).not.toContain("report.read");
  });

  it("un compte de démonstration existe pour chaque rôle, avec un courriel unique", () => {
    expect(new Set(DEMO_ACCOUNTS.map((a) => a.role))).toEqual(new Set(ALL));
    const emails = DEMO_ACCOUNTS.map((a) => a.email);
    expect(new Set(emails).size).toBe(emails.length);
  });
});

describe("périmètre par rôle", () => {
  const sessionOf = (role: RoleId, scoopIds?: string[]): Session => ({
    name: "Test",
    email: "test@exemple.sn",
    role,
    expiresAt: Date.now() + 60_000,
    ...fetchMyPermissions(role, scoopIds),
  });
  const { producers } = getState();
  const count = (scoopId: string) => producers.filter((p) => p.scoopId === scoopId).length;

  it("seuls l'administrateur et la faîtière voient toutes les SCOOP", () => {
    for (const role of ALL) {
      const consolidated = role === "admin" || role === "faitiere";
      expect(ROLE_IS_SCOPED[role]).toBe(!consolidated);
      const s = sessionOf(role);
      expect(s.scope.kind).toBe(consolidated ? "consolidé" : "scoop");
      expect(inScope(producers, s)).toHaveLength(
        consolidated ? producers.length : count("s1") + (role === "technicien" ? count("s2") : 0),
      );
    }
  });

  it("un technicien voit ses SCOOP et aucune autre", () => {
    const s = sessionOf("technicien", ["s1", "s3"]);
    expect([...scoopIdsOf(s)].sort()).toEqual(["s1", "s3"]);
    const visible = inScope(producers, s);
    expect(visible).toHaveLength(count("s1") + count("s3"));
    expect(visible.every((p) => ["s1", "s3"].includes(p.scoopId))).toBe(true);
  });

  it("un rôle limité sans SCOOP ne voit rien : il ne retombe jamais en vue consolidée", () => {
    const s = sessionOf("secretaire", []);
    expect(s.scope.kind).toBe("scoop");
    expect(inScope(producers, s)).toHaveLength(0);
  });
});

describe("dossiers, pièces et plans par rôle", () => {
  const sessionOf = (role: RoleId, email = "test@exemple.sn", scoopIds?: string[]): Session => ({
    name: "Test",
    email,
    role,
    expiresAt: Date.now() + 60_000,
    ...fetchMyPermissions(role, scoopIds),
  });
  const base = DOSSIERS[0]!;
  const dossiers = [
    { ...base, id: "a", scoopId: "s1", createdByEmail: "fatou@x.sn" },
    { ...base, id: "b", scoopId: "s1", createdByEmail: "autre@x.sn" },
    { ...base, id: "c", scoopId: "s2", createdByEmail: "fatou@x.sn" },
    { ...base, id: "d", scoopId: "s3", createdByEmail: "fatou@x.sn" },
  ];
  const doc = DOCUMENTS[0]!;
  const documents = [
    {
      ...doc,
      id: "d1",
      ownerType: "dossier" as const,
      ownerId: "a",
      scoopId: "s1",
      sensitive: true,
    },
    {
      ...doc,
      id: "d2",
      ownerType: "dossier" as const,
      ownerId: "a",
      scoopId: "s1",
      sensitive: false,
    },
    {
      ...doc,
      id: "d3",
      ownerType: "dossier" as const,
      ownerId: "b",
      scoopId: "s1",
      sensitive: false,
    },
    {
      ...doc,
      id: "d4",
      ownerType: "dossier" as const,
      ownerId: "c",
      scoopId: "s2",
      sensitive: false,
    },
    {
      ...doc,
      id: "d5",
      ownerType: "dossier" as const,
      ownerId: "d",
      scoopId: "s3",
      sensitive: false,
    },
  ];
  const ids = (xs: { id: string }[]) => xs.map((x) => x.id).sort();

  it("le technicien ne voit que ses dossiers, dans ses SCOOP", () => {
    const tech = sessionOf("technicien", "fatou@x.sn", ["s1", "s2"]);
    expect(ids(scopedDossiers(dossiers, tech))).toEqual(["a", "c"]);
  });

  it("les rôles de la coopérative voient tous les dossiers de leur SCOOP, pas ceux des autres", () => {
    for (const role of ["gestionnaire", "representant", "secretaire"] as const) {
      expect(ids(scopedDossiers(dossiers, sessionOf(role, "x@x.sn", ["s1"])))).toEqual(["a", "b"]);
    }
    expect(ids(scopedDossiers(dossiers, sessionOf("admin")))).toEqual(["a", "b", "c", "d"]);
  });

  it("la secrétaire ne lit aucune pièce sensible et ne télécharge rien", () => {
    const sec = sessionOf("secretaire", "x@x.sn", ["s1"]);
    expect(ids(scopedDocuments(documents, dossiers, sec))).toEqual(["d2", "d3"]);
    for (const d of documents) expect(canDownloadDocument(sec, d)).toBe(false);
    expect(canReadDocument(sec, documents[0]!)).toBe(false);
  });

  it("le gestionnaire lit les pièces sensibles (CNI) de sa SCOOP ; le représentant non", () => {
    const gest = sessionOf("gestionnaire", "x@x.sn", ["s1"]);
    expect(ids(scopedDocuments(documents, dossiers, gest))).toEqual(["d1", "d2", "d3"]);
    expect(canDownloadDocument(gest, documents[0]!)).toBe(true);
    expect(canReadDocument(gest, documents[3]!)).toBe(true);
    expect(ids(inScope(documents, gest))).toEqual(["d1", "d2", "d3"]);

    const rep = sessionOf("representant", "x@x.sn", ["s1"]);
    // A-02 : pas de cni.read → CNI (d1) hors liste ; téléchargement sensible refusé.
    expect(ids(scopedDocuments(documents, dossiers, rep))).toEqual(["d2", "d3"]);
    expect(canDownloadDocument(rep, documents[0]!)).toBe(false);
    expect(canReadDocument(rep, documents[0]!)).toBe(false);
    expect(canReadDocument(rep, documents[3]!)).toBe(true);
  });

  it("le technicien lit les pièces non sensibles de ses dossiers, jamais la CNI, et ne télécharge pas", () => {
    const tech = sessionOf("technicien", "fatou@x.sn", ["s1", "s2"]);
    expect(ids(scopedDocuments(documents, dossiers, tech))).toEqual(["d2", "d4"]);
    for (const d of documents) expect(canDownloadDocument(tech, d)).toBe(false);
  });

  it("sans droit sur les pièces (faîtière, ventes, rapports), rien n'est lisible", () => {
    for (const role of ["faitiere", "ventes", "rapports"] as const) {
      expect(scopedDocuments(documents, dossiers, sessionOf(role))).toEqual([]);
    }
  });

  it("membres et plans suivent le périmètre SCOOP", () => {
    const sec = sessionOf("secretaire", "x@x.sn", ["s1"]);
    expect(scopedMembers(MEMBERS, sec).every((m) => m.scoopId === "s1")).toBe(true);
    expect(scopedPlans(PLANS, sec).every((p) => p.scoopId === "s1")).toBe(true);
    const tech = sessionOf("technicien", "fatou@x.sn", ["s1", "s2"]);
    expect(scopedPlans(PLANS, tech).every((p) => ["s1", "s2"].includes(p.scoopId))).toBe(true);
    expect(scopedMembers(MEMBERS, sessionOf("faitiere"))).toHaveLength(MEMBERS.length);
  });
});

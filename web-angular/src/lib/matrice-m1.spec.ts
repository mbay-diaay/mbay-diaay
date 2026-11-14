import { beforeAll, describe, expect, it, vi } from "vitest";

import {
  DEFAULT_ROLE_PERMISSIONS,
  PERMISSION_GROUPS,
  PERMISSION_LABEL,
  type Permission,
  type BuiltInRoleId,
  type RoleId,
} from "./permissions";
import { DEFAULT_REMINDER_SETTINGS, nextContributionDue, reminderIssues } from "./reminders";
import { actions, getState } from "./store";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
  });
});

const loginAs = (role: RoleId, email: string, name = email) => actions.login(name, email, role);
const superAdmin = () => loginAs("superadmin", "octus.informatique@gmail.com", "Super administrateur");
const admin = () => loginAs("admin", "aissatou.ndiaye@cradesc.example", "Aïssatou Ndiaye");
const allows = (role: BuiltInRoleId, permission: Permission) =>
  DEFAULT_ROLE_PERMISSIONS[role].includes(permission);

describe("matrice M1 par défaut", () => {
  it("chaque droit appartient à une seule famille de l'éditeur", () => {
    const grouped = PERMISSION_GROUPS.flatMap((group) => group.permissions);
    expect(new Set(grouped).size).toBe(grouped.length);
    expect([...grouped].sort()).toEqual(Object.keys(PERMISSION_LABEL).sort());
  });

  it("applique les lignes de la matrice", () => {
    // Technicien : il recense les producteurs et les GIE, rien de plus.
    expect(allows("technicien", "org.read")).toBe(true);
    expect(allows("technicien", "dossier.create")).toBe(true);
    expect(allows("technicien", "dossier.submit")).toBe(true);
    expect(allows("technicien", "producer.edit")).toBe(false);
    expect(allows("technicien", "meeting.manage")).toBe(false);
    expect(allows("technicien", "member.manage")).toBe(false);
    expect(allows("technicien", "contribution.read")).toBe(false);
    expect(allows("technicien", "library.upload")).toBe(false);
    expect(allows("gestionnaire", "member.manage")).toBe(true);
    expect(allows("gestionnaire", "identity.read_full")).toBe(false);
    expect(allows("faitiere", "library.read")).toBe(true);
    expect(DEFAULT_ROLE_PERMISSIONS.faitiere.some((permission) => permission.endsWith(".manage"))).toBe(false);
    expect(allows("gestionnaire", "subrole.manage")).toBe(true);
    expect(allows("technicien", "subrole.manage")).toBe(false);
    expect(allows("admin", "meeting.manage")).toBe(false);
    expect(allows("admin", "role.configure")).toBe(false);
    expect(allows("surveillance", "meeting.manage")).toBe(false);
    expect(DEFAULT_ROLE_PERMISSIONS.superadmin.length).toBe(Object.keys(PERMISSION_LABEL).length);
  });
});

describe("super administrateur : matrice et rôles modifiables", () => {
  it("modifie les droits d'un rôle, trace la modification, puis rétablit le défaut", () => {
    superAdmin();
    const res = actions.setRolePermissions("ventes", ["dashboard.read", "sales.read"]);
    expect(res.ok).toBe(true);
    expect(getState().rolePermissions["ventes"]).toEqual(["dashboard.read", "sales.read"]);
    expect(getState().audit[0]?.action).toBe("Droits du rôle modifiés");
    expect(actions.resetRolePermissions("ventes").ok).toBe(true);
    expect(getState().rolePermissions["ventes"]).toEqual(DEFAULT_ROLE_PERMISSIONS.ventes);
  });

  it("ne distribue jamais role.configure et ne touche pas au super administrateur", () => {
    superAdmin();
    actions.setRolePermissions("admin", [...DEFAULT_ROLE_PERMISSIONS.admin, "role.configure"]);
    expect(getState().rolePermissions["admin"]).not.toContain("role.configure");
    expect(actions.setRolePermissions("superadmin", []).ok).toBe(false);
    actions.resetRolePermissions("admin");
  });

  it("refuse la configuration des rôles à l'administrateur", () => {
    admin();
    expect(actions.setRolePermissions("ventes", []).ok).toBe(false);
  });

  it("change le rôle de n'importe quel compte ; l'admin ne crée pas de super administrateur", () => {
    superAdmin();
    const target = getState().users.find((user) => user.email === "ibrahima.seck@scoop-kms.example")!;
    expect(actions.setUserRole(target.id, "admin").ok).toBe(true);
    expect(getState().users.find((user) => user.id === target.id)).toMatchObject({ role: "admin", scoopId: undefined });
    expect(actions.setUserRole(target.id, "bureau").ok).toBe(false); // SCOOP obligatoire
    expect(actions.setUserRole(target.id, "bureau", ["s1"]).ok).toBe(true);
    admin();
    expect(actions.setUserRole(target.id, "superadmin").ok).toBe(false);
  });

  it("une matrice modifiée s'applique tout de suite à la session du rôle", () => {
    superAdmin();
    actions.setRolePermissions("rapports", ["dashboard.read"]);
    loginAs("rapports", "rokhaya.diallo@scoop-kms.example");
    expect(getState().session?.permissions).toEqual(["dashboard.read"]);
    superAdmin();
    actions.resetRolePermissions("rapports");
  });
});

describe("procès-verbal, décisions, cotisations, documents", () => {
  it("le rédacteur d'un procès-verbal ne le valide pas", () => {
    loginAs("secretaire", "aminata.ba@scoop-kms.example", "Aminata Bâ");
    expect(actions.validateMinutes("meet2").ok).toBe(false);
    loginAs("bureau", "cheikh.ndiaye@scoop-kms.example", "Cheikh Ndiaye");
    expect(actions.validateMinutes("meet2").ok).toBe(true);
  });

  it("note une décision, la suit puis la clôture (figée ensuite)", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    const added = actions.addMeetingDecision("meet1", { text: "Réparer le magasin", ownerName: "Babacar Fall" });
    expect(added.ok).toBe(true);
    const id = added.ok ? added.id : "";
    expect(actions.setDecisionStatus("meet1", id, "en cours").ok).toBe(true);
    expect(actions.setDecisionStatus("meet1", id, "clôturée", "ok").ok).toBe(false);
    expect(actions.setDecisionStatus("meet1", id, "clôturée", "Magasin réparé").ok).toBe(true);
    expect(actions.setDecisionStatus("meet1", id, "ouverte").ok).toBe(false);
    loginAs("technicien", "fatou.sarr@cradesc.example");
    expect(actions.addMeetingDecision("meet1", { text: "Autre décision", ownerName: "Fatou Sarr" }).ok).toBe(false);
  });

  it("annule un paiement par contre-écriture", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    const payment = getState().payments.find((item) => item.scoopId === "s1" && !item.voided)!;
    expect(actions.voidPayment(payment.id, "Erreur de saisie").ok).toBe(true);
    const reversal = getState().payments.find((item) => item.reversalOf === payment.id)!;
    expect(reversal.amount).toBe(-payment.amount);
    expect(actions.voidPayment(reversal.id, "Erreur").ok).toBe(false);
  });

  it("retire un document de la bibliothèque sans l'effacer", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    const doc = getState().documents.find((item) => item.ownerType === "scoop" && item.scoopId === "s1")!;
    expect(actions.removeLibraryDocument(doc.id).ok).toBe(true);
    expect(getState().documents.some((item) => item.id === doc.id)).toBe(false);
    expect(getState().deletedDocuments.find((item) => item.id === doc.id)?.deletedAt).toBeTruthy();
  });
});

describe("rappels", () => {
  it("valide les délais et les canaux", () => {
    expect(reminderIssues(DEFAULT_REMINDER_SETTINGS)).toEqual([]);
    expect(reminderIssues({ ...DEFAULT_REMINDER_SETTINGS, meetingNoticeDays: 0, channels: [] })).toEqual([
      "meetingNoticeDays",
      "channels",
    ]);
  });

  it("calcule la prochaine échéance annuelle", () => {
    expect(nextContributionDue({ periodicity: "annuelle", dueDate: "03-31" }, "2026-11-12T00:00:00Z")).toBe("2027-03-31");
  });

  it("le gestionnaire règle sa coopérative, pas une autre ni les valeurs par défaut", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    expect(actions.setReminderSettings("s1", { ...DEFAULT_REMINDER_SETTINGS, meetingNoticeDays: 10 }).ok).toBe(true);
    expect(getState().reminderSettings["s1"]?.meetingNoticeDays).toBe(10);
    expect(actions.setReminderSettings("s2", DEFAULT_REMINDER_SETTINGS).ok).toBe(false);
    expect(actions.setReminderSettings(null, DEFAULT_REMINDER_SETTINGS).ok).toBe(false);
  });
});

describe("super administrateur : rôles créés", () => {
  it("crée un rôle à partir d'un autre, le renomme, l'attribue puis le supprime en déplaçant ses comptes", () => {
    superAdmin();
    const created = actions.createRole({ name: "Trésorier de SCOOP", scoped: true, copyFrom: "surveillance" });
    expect(created.ok).toBe(true);
    const id = created.ok ? created.id : "custom-x";
    expect(id).toBe("custom-tresorier-de-scoop");
    expect([...(getState().rolePermissions[id] ?? [])].sort()).toEqual([...DEFAULT_ROLE_PERMISSIONS.surveillance].sort());
    expect(actions.createRole({ name: "trésorier de scoop", scoped: true }).ok).toBe(false); // nom déjà pris
    expect(actions.updateRole(id, { name: "Trésorier" }).ok).toBe(true);
    expect(actions.updateRole("admin", { name: "Chef" }).ok).toBe(false); // rôle intégré

    const account = getState().users.find((user) => user.email === "awa.sy@scoop-kms.example")!;
    expect(actions.setUserRole(account.id, id, ["s1"]).ok).toBe(true);
    expect(actions.updateRole(id, { scoped: false }).ok).toBe(false); // portée figée : un compte l'a

    expect(actions.deleteRole(id).ok).toBe(false); // remplaçant obligatoire
    expect(actions.deleteRole(id, "admin").ok).toBe(false); // portée différente
    expect(actions.deleteRole(id, "surveillance").ok).toBe(true);
    expect(getState().users.find((user) => user.id === account.id)?.role).toBe("surveillance");
    expect(getState().customRoles.some((role) => role.id === id)).toBe(false);
    expect(actions.deleteRole("gestionnaire").ok).toBe(false); // rôle intégré
  });

  it("la session d'un compte au rôle créé reçoit exactement ses droits", () => {
    superAdmin();
    const created = actions.createRole({ name: "Auditeur externe", scoped: false });
    const id = created.ok ? created.id : "custom-x";
    actions.setRolePermissions(id, ["dashboard.read", "audit.read"]);
    loginAs(id, "auditeur@exemple.sn");
    expect(getState().session?.permissions).toEqual(["dashboard.read", "audit.read"]);
    expect(getState().session?.scope.kind).toBe("consolidé");
    superAdmin();
    actions.deleteRole(id);
  });

  it("refuse la gestion des rôles à l'administrateur", () => {
    admin();
    expect(actions.createRole({ name: "Rôle pirate", scoped: true }).ok).toBe(false);
  });
});

describe("administrateur : désactiver, réactiver, supprimer un compte", () => {
  it("désactive puis réactive un compte, et le supprime définitivement après confirmation", () => {
    admin();
    const target = getState().users.find((user) => user.email === "ibrahima.seck@scoop-kms.example")!;
    const off = actions.toggleUser(target.id);
    expect(off.ok && off.active).toBe(false);
    const on = actions.toggleUser(target.id);
    expect(on.ok && on.active).toBe(true);
    expect(actions.deleteUser(target.id, "autre@exemple.sn").ok).toBe(false);
    expect(actions.deleteUser(target.id, "IBRAHIMA.SECK@scoop-kms.example").ok).toBe(true);
    expect(getState().users.some((user) => user.id === target.id)).toBe(false);
    expect(getState().audit[0]?.action).toBe("Compte supprimé définitivement");
  });

  it("refuse de se désactiver ou se supprimer soi-même, et de toucher au super administrateur", () => {
    admin();
    const self = getState().users.find((user) => user.email === "aissatou.ndiaye@cradesc.example")!;
    const superAdminAccount = getState().users.find((user) => user.role === "superadmin")!;
    expect(actions.toggleUser(self.id).ok).toBe(false);
    expect(actions.deleteUser(self.id, self.email).ok).toBe(false);
    expect(actions.deleteUser(superAdminAccount.id, superAdminAccount.email).ok).toBe(false);
    superAdmin();
    // Le dernier super administrateur ne se supprime pas, même par un autre super administrateur.
    expect(actions.toggleUser(superAdminAccount.id).ok).toBe(false);
  });
});

describe("code court de coopérative généré", () => {
  it("reprend le sigle entre parenthèses, sinon forme les initiales des mots significatifs", async () => {
    const { generateScoopCode } = await import("./scoops");
    expect(generateScoopCode("And Sam Luniou Bokk (ASLB)", [])).toBe("ASLB");
    expect(generateScoopCode("SCOOP des maraîchers de Mboro", [])).toBe("MAM");
    expect(generateScoopCode("Coopérative Keur Momar Sarr", [])).toBe("KMS");
    expect(generateScoopCode("Ndiaganiao", [])).toBe("NDI");
    expect(generateScoopCode("SCOOP de la", [])).toBe("");
  });

  it("évite un code déjà pris", async () => {
    const { generateScoopCode } = await import("./scoops");
    expect(generateScoopCode("Keur Momar Sarr", ["KMS"])).toBe("KMSA");
    expect(generateScoopCode("Keur Momar Sarr", ["KMS", "KMSA"])).toBe("KMSB");
  });

  it("l'administrateur crée une coopérative sans saisir de code", () => {
    admin();
    const result = actions.createScoop({
      name: "SCOOP des maraîchers de Mboro",
      commune: "Mboro",
      code: "",
      manager: { firstName: "Awa", lastName: "Diop", email: "awa.diop.mboro@exemple.sn" },
    });
    expect(result.ok).toBe(true);
    expect(getState().scoops.find((scoop) => scoop.name === "SCOOP des maraîchers de Mboro")?.code).toMatch(/^[A-Z]{3,5}$/);
  });
});


describe("structure multi-coopératives : sous-rôles, isolation, liens", () => {
  const manager = (email: string, name: string, scoop = "s1") => {
    actions.login(name, email, "gestionnaire");
    return scoop;
  };

  it("le gestionnaire crée un sous-rôle de SA coopérative, plafonné à ses droits délégables", () => {
    manager("babacar.fall@scoop-kms.example", "Babacar Fall");
    const created = actions.createRole({ name: "Trésorier", scoped: true, scoopId: "s1", copyFrom: "gestionnaire" });
    expect(created.ok).toBe(true);
    const id = created.ok ? created.id : "custom-x";
    const granted = getState().rolePermissions[id] ?? [];
    expect(granted.length).toBeGreaterThan(0);
    // Jamais les droits d'administration, même copiés du rôle de gestionnaire qui les a.
    for (const forbidden of ["user.manage", "role.configure", "scoop.manage", "data.backup"])
      expect(granted).not.toContain(forbidden);
    expect(actions.setRolePermissions(id, ["role.configure", "user.manage", "member.read"]).ok).toBe(true);
    expect(getState().rolePermissions[id]).toEqual(["member.read"]);
    expect(getState().customRoles.find((role) => role.id === id)?.scoopId).toBe("s1");
  });

  it("un gestionnaire ne crée pas de rôle global ni de sous-rôle pour une autre coopérative", () => {
    manager("babacar.fall@scoop-kms.example", "Babacar Fall");
    expect(actions.createRole({ name: "Rôle global", scoped: true }).ok).toBe(false);
    expect(actions.createRole({ name: "Rôle voisin", scoped: true, scoopId: "s4" }).ok).toBe(false);
    expect(actions.setRolePermissions("technicien", ["member.read"]).ok).toBe(false);
  });

  it("le sous-rôle d'une coopérative est invisible et inutilisable pour une autre", async () => {
    manager("babacar.fall@scoop-kms.example", "Babacar Fall");
    const created = actions.createRole({ name: "Magasinier", scoped: true, scoopId: "s1" });
    const id = created.ok ? created.id : "custom-x";
    actions.login("Mame Diarra Sow", "mame.diarra.sow@scoop-gande.example", "gestionnaire");
    expect(actions.updateRole(id, { name: "Volé" }).ok).toBe(false);
    expect(actions.setRolePermissions(id, ["member.read"]).ok).toBe(false);
    expect(actions.deleteRole(id).ok).toBe(false);
    const { assignableRoles } = await import("./team");
    expect(assignableRoles("gestionnaire", getState().customRoles, "s4")).not.toContain(id);
    expect(assignableRoles("gestionnaire", getState().customRoles, "s1")).toContain(id);
  });

  it("seul le super administrateur crée un administrateur CRADESC", () => {
    admin();
    const target = getState().users.find((user) => user.email === "ousmane.gueye@uscn.example")!;
    expect(actions.setUserRole(target.id, "admin").ok).toBe(false);
    expect(() => actions.addUser({ name: "Faux Admin", email: "faux@exemple.sn", phone: "", role: "admin" })).toThrow();
    superAdmin();
    expect(actions.setUserRole(target.id, "faitiere", ["s1"]).ok).toBe(true);
  });

  it("la faîtière se lie à une, deux coopératives ou plus, et ne voit que celles-là", async () => {
    superAdmin();
    const target = getState().users.find((user) => user.email === "ousmane.gueye@uscn.example")!;
    expect(actions.setUserRole(target.id, "faitiere", ["s1", "s2"]).ok).toBe(true);
    expect(getState().users.find((user) => user.id === target.id)?.scoopIds).toEqual(["s1", "s2"]);
    expect(actions.setUserRole(target.id, "faitiere", []).ok).toBe(false); // sans lien : refusé
    actions.login("Ousmane Guèye", "ousmane.gueye@uscn.example", "faitiere");
    expect(getState().session?.scope.kind).toBe("scoop");
    expect(getState().session?.scope.scoopIds).toEqual(["s1", "s2"]);
    const { inScope } = await import("./scope");
    const visible = new Set(inScope(getState().producers, getState().session).map((producer) => producer.scoopId));
    expect([...visible].every((id) => id === "s1" || id === "s2")).toBe(true);
  });

  it("un technicien déjà inscrit travaille pour une 2ᵉ coopérative quand son gestionnaire l'y ajoute", () => {
    manager("mame.diarra.sow@scoop-gande.example", "Mame Diarra Sow");
    expect(actions.linkTechnicianByEmail("inconnu@exemple.sn", ["s4"]).ok).toBe(false);
    expect(actions.linkTechnicianByEmail("fatou.sarr@cradesc.example", ["s1"]).ok).toBe(false); // pas SA coopérative
    expect(actions.linkTechnicianByEmail("fatou.sarr@cradesc.example", ["s4"]).ok).toBe(true);
    const tech = getState().users.find((user) => user.email === "fatou.sarr@cradesc.example")!;
    expect(tech.scoopIds).toEqual(expect.arrayContaining(["s1", "s2", "s4"]));
  });

  it("le gestionnaire donne un accès avec un rôle de coopérative ou son sous-rôle, jamais administrateur", () => {
    manager("babacar.fall@scoop-kms.example", "Babacar Fall");
    const member = getState().members.find(
      (candidate) => candidate.scoopId === "s1" && candidate.status === "membre",
    )!;
    expect(actions.grantAccess(member.id, "admin" as never).ok).toBe(false);
    expect(actions.grantAccess(member.id, "faitiere" as never).ok).toBe(false);
  });
});

describe("accueil d'un compte d'une seule coopérative", () => {
  it("arrive sur la fiche de sa coopérative, sans tableau de bord ni rapports dans le menu", async () => {
    const { cooperativeHomeId } = await import("./scope");
    const { NAV, navAllowed } = await import("./nav");
    const menuLabels = () =>
      NAV.flatMap((navGroup) => navGroup.items)
        .filter((item) => !item.soon && navAllowed(getState().session!, item))
        .map((item) => item.labelKey);

    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    expect(cooperativeHomeId(getState().session)).toBe("s1");
    expect(menuLabels()).not.toContain("nav.item.dashboard");
    expect(menuLabels()).not.toContain("nav.item.rapports");
    expect(menuLabels()).toContain("nav.item.cooperative");

    // Le réseau et les comptes liés à plusieurs coopératives gardent leur tableau de bord.
    admin();
    expect(cooperativeHomeId(getState().session)).toBeNull();
    expect(menuLabels()).toContain("nav.item.dashboard");
    loginAs("faitiere", "ousmane.gueye@uscn.example", "Ousmane Guèye");
    expect(cooperativeHomeId(getState().session)).toBeNull();
    expect(menuLabels()).toContain("nav.item.dashboard");

    // Un rôle sans accès à la fiche coopérative (rapports) garde ses écrans : sinon il n'aurait plus rien.
    loginAs("rapports", "rokhaya.diallo@scoop-kms.example", "Rokhaya Diallo");
    expect(cooperativeHomeId(getState().session)).toBeNull();
    expect(menuLabels()).toContain("nav.item.rapports");
  });
});

describe("techniciens : code temporaire à usage unique", () => {
  const input = { name: "Seydou Test", phone: "77 555 01 02", sex: "H" as const, age: 30, scoopIds: ["s1"] };

  it("génère un code de 8 chiffres, sans e-mail obligatoire, et jamais deux comptes sur un même numéro", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    const created = actions.createTechnician(input);
    expect(created.ok).toBe(true);
    if (!created.ok) return;
    expect(created.code).toMatch(/^\d{8}$/);
    const user = getState().users.find((candidate) => candidate.id === created.userId);
    expect(user?.email).toBe("");
    expect(user?.active).toBe(false);
    expect(user?.activation?.code).toBe(created.code);
    expect(actions.createTechnician({ ...input, name: "Autre Personne" }).ok).toBe(false);
  });

  it("un nouveau code annule le mot de passe déjà choisi : le technicien actif redevient « à activer »", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    const fatou = getState().users.find((candidate) => candidate.email === "fatou.sarr@cradesc.example")!;
    expect(fatou.active).toBe(true);
    expect(actions.regenerateTechnicianCode(fatou.id).ok).toBe(true);
    const after = getState().users.find((candidate) => candidate.id === fatou.id)!;
    expect(after.active).toBe(false);
    expect(after.activation?.code).toMatch(/^\d{8}$/);
  });

  it("exige téléphone, sexe et âge, et change le code à la régénération", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    expect(actions.createTechnician({ ...input, phone: "77 12", name: "Un Autre" }).ok).toBe(false);
    expect(actions.createTechnician({ ...input, phone: "77 555 09 09", age: 5, name: "Un Autre" }).ok).toBe(false);
    const created = actions.createTechnician({ ...input, phone: "77 555 03 04", name: "Ibou Kane" });
    expect(created.ok).toBe(true);
    if (!created.ok) return;
    const again = actions.regenerateTechnicianCode(created.userId);
    expect(again.ok).toBe(true);
    if (!again.ok) return;
    expect(again.code).toMatch(/^\d{8}$/);
    expect(getState().users.find((candidate) => candidate.id === created.userId)?.active).toBe(false);
    // L'ancien code ne peut plus partir par e-mail.
    expect(actions.sendTechnicianCodeByEmail(created.userId, created.code).ok).toBe(false);
  });
});

describe("personnel de la coopérative", () => {
  const person = { name: "Awa Faye", email: "awa.faye@scoop-kms.example", phone: "77 555 02 03", sex: "F" as const, age: 29, scoopId: "s1" };

  it("le gestionnaire crée du personnel dans sa coopérative et lui attribue un rôle", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    const created = actions.createStaff({ ...person, role: "secretaire" });
    expect(created.ok).toBe(true);
    const user = getState().users.find((candidate) => candidate.email === person.email);
    expect(user?.role).toBe("secretaire");
    expect(user?.scoopId).toBe("s1");
    expect(user?.active).toBe(false);
    expect(actions.updateStaff(user!.id, { role: "ventes" }).ok).toBe(true);
    expect(getState().users.find((candidate) => candidate.id === user!.id)?.role).toBe("ventes");
    // Modification des coordonnées : nom, téléphone, sexe, âge.
    expect(actions.updateStaff(user!.id, { name: "Awa Faye Ndiaye", phone: "76 111 22 33", sex: "F", age: 31 }).ok).toBe(true);
    const edited = getState().users.find((candidate) => candidate.id === user!.id);
    expect(edited?.name).toBe("Awa Faye Ndiaye");
    expect(edited?.age).toBe(31);
    expect(actions.updateStaff(user!.id, { age: 3 }).ok).toBe(false);
    expect(actions.updateStaff(user!.id, { name: "Awa" }).ok).toBe(false);
  });

  it("refuse une autre coopérative, le rôle technicien, un rôle du réseau et un doublon d'adresse", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    expect(actions.createStaff({ ...person, email: "autre@x.example", role: "secretaire", scoopId: "s2" }).ok).toBe(false);
    expect(actions.createStaff({ ...person, email: "autre@x.example", role: "technicien" }).ok).toBe(false);
    expect(actions.createStaff({ ...person, email: "autre@x.example", role: "admin" }).ok).toBe(false);
    expect(actions.createStaff({ ...person, email: "babacar.fall@scoop-kms.example", role: "secretaire" }).ok).toBe(false);
  });
});

describe("réunions : déroulé et convoqués", () => {
  const base = { scoopId: "s1", kind: "bureau" as const, title: "Point mensuel", date: "2026-12-20T10:00", place: "Siège", agenda: ["Bilan"] };

  it("une réunion en ligne exige un lien https et n'a pas besoin de lieu", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    expect(actions.createMeeting({ ...base, place: "", mode: "en ligne", onlineUrl: "" }).ok).toBe(false);
    expect(actions.createMeeting({ ...base, place: "", mode: "en ligne", onlineUrl: "http://meet.google.com/abc-defg-hij" }).ok).toBe(false);
    const created = actions.createMeeting({ ...base, place: "", mode: "en ligne", onlineUrl: "https://meet.google.com/abc-defg-hij" });
    expect(created.ok).toBe(true);
    if (!created.ok) return;
    const meeting = getState().meetings.find((candidate) => candidate.id === created.id);
    expect(meeting?.mode).toBe("en ligne");
    expect(meeting?.place).toBe("En ligne");
    expect(meeting?.onlineUrl).toBe("https://meet.google.com/abc-defg-hij");
  });

  it("une réunion sur place n'a pas de lien ; les convoqués hors coopérative sont écartés", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    const ownOrg = getState().orgs.find((org) => org.scoopId === "s1")!;
    const otherOrg = getState().orgs.find((org) => org.scoopId !== "s1")!;
    const created = actions.createMeeting({
      ...base,
      mode: "sur place",
      onlineUrl: "https://exemple.sn",
      audience: { orgIds: [ownOrg.id, otherOrg.id], staffIds: ["u-inconnu"], others: ["  Invité Libre  ", ""] },
    });
    expect(created.ok).toBe(true);
    if (!created.ok) return;
    const meeting = getState().meetings.find((candidate) => candidate.id === created.id)!;
    expect(meeting.onlineUrl).toBeNull();
    expect(meeting.audience).toEqual({ orgIds: [ownOrg.id], staffIds: [], others: ["Invité Libre"] });
  });
});

describe("sous-rôles de coopérative : point de départ des droits", () => {
  it("un gestionnaire ne copie jamais un rôle du réseau, mais les rôles de sa coopérative", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    for (const reseau of ["admin", "superadmin", "faitiere"] as const)
      expect(actions.createRole({ name: `Copie ${reseau}`, scoped: true, scoopId: "s1", copyFrom: reseau }).ok).toBe(false);
    const permise = actions.createRole({ name: "Copie secrétaire", scoped: true, scoopId: "s1", copyFrom: "secretaire" });
    expect(permise.ok).toBe(true);
  });

  it("role.assign ne se délègue pas à un sous-rôle", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    const created = actions.createRole({ name: "Rôle test droits", scoped: true, scoopId: "s1", copyFrom: "representant" });
    expect(created.ok).toBe(true);
    if (!created.ok) return;
    expect(getState().rolePermissions[created.id]).not.toContain("role.assign");
  });
});

describe("bibliothèque : document lié à un GIE, un technicien ou du personnel", () => {
  const file = { kind: "convention" as const, name: "Convention test.pdf", sizeKb: 120, mime: "application/pdf" };

  it("accepte un GIE, un technicien et un membre du personnel de la coopérative", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    const org = getState().orgs.find((candidate) => candidate.scoopId === "s1")!;
    const technicien = getState().users.find((candidate) => candidate.email === "fatou.sarr@cradesc.example")!;
    const personnel = getState().users.find((candidate) => candidate.email === "aminata.ba@scoop-kms.example")!;
    const gie = actions.addLibraryDocument("s1", { ...file, name: "Doc GIE.pdf", link: { type: "org", id: org.id } });
    expect(gie.ok).toBe(true);
    expect(actions.addLibraryDocument("s1", { ...file, name: "Doc tech.pdf", link: { type: "technicien", id: technicien.id } }).ok).toBe(true);
    expect(actions.addLibraryDocument("s1", { ...file, name: "Doc perso.pdf", link: { type: "personnel", id: personnel.id } }).ok).toBe(true);
    if (gie.ok) expect(getState().documents.find((doc) => doc.id === gie.id)?.link).toEqual({ type: "org", id: org.id });
    // Sans lien : le document concerne toute la coopérative.
    const general = actions.addLibraryDocument("s1", { ...file, name: "Doc général.pdf" });
    expect(general.ok).toBe(true);
    if (general.ok) expect(getState().documents.find((doc) => doc.id === general.id)?.link).toBeUndefined();
  });

  it("refuse un GIE d'une autre coopérative, un mauvais type et un compte inconnu", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    const otherOrg = getState().orgs.find((candidate) => candidate.scoopId !== "s1")!;
    const technicien = getState().users.find((candidate) => candidate.email === "fatou.sarr@cradesc.example")!;
    expect(actions.addLibraryDocument("s1", { ...file, name: "A.pdf", link: { type: "org", id: otherOrg.id } }).ok).toBe(false);
    expect(actions.addLibraryDocument("s1", { ...file, name: "B.pdf", link: { type: "personnel", id: technicien.id } }).ok).toBe(false);
    expect(actions.addLibraryDocument("s1", { ...file, name: "C.pdf", link: { type: "technicien", id: "u-inconnu" } }).ok).toBe(false);
  });
});

describe("cotisations : membres seulement, liens de paiement, paiement manuel", () => {
  const unMembre = () => getState().members.find((candidate) => candidate.scoopId === "s1" && candidate.status === "membre")!;
  const periode = String(new Date().getFullYear() - 1);

  it("un paiement manuel s'enregistre avec sa référence ; seul un membre cotise", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    actions.setContributionRule("s1", { amount: 5000, periodicity: "annuelle", dueDate: "06-30", startYear: 2020 });
    const membre = unMembre();
    const paid = actions.recordPayment({ memberId: membre.id, amount: 5000, period: periode, method: "mobile money", reference: "WAVE-TX-1234" });
    expect(paid.ok).toBe(true);
    if (paid.ok) {
      const saved = getState().payments.find((payment) => payment.id === paid.id);
      expect(saved?.reference).toBe("WAVE-TX-1234");
      expect(saved?.source).toBe("manuel");
    }
    const candidat = getState().members.find((candidate) => candidate.scoopId === "s1" && candidate.status !== "membre");
    if (candidat) {
      expect(actions.recordPayment({ memberId: candidat.id, amount: 5000, period: periode, method: "espèces" }).ok).toBe(false);
      expect(actions.createPaymentLink({ memberId: candidat.id, amount: 5000, period: periode }).ok).toBe(false);
    }
  });

  it("un lien de paiement se règle une seule fois, puis ne marche plus ; un nouveau lien annule l'ancien", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    actions.setContributionRule("s1", { amount: 5000, periodicity: "annuelle", dueDate: "06-30", startYear: 2020 });
    const membre = unMembre();
    const first = actions.createPaymentLink({ memberId: membre.id, amount: 3000, period: periode });
    expect(first.ok).toBe(true);
    if (!first.ok) return;
    const second = actions.createPaymentLink({ memberId: membre.id, amount: 3000, period: periode });
    expect(second.ok).toBe(true);
    if (!second.ok) return;
    expect(getState().paymentLinks.find((link) => link.id === first.id)?.status).toBe("annulé");
    expect(actions.settlePaymentLink(first.token, { method: "mobile money", reference: "X" }).ok).toBe(false);
    const before = getState().payments.length;
    const settled = actions.settlePaymentLink(second.token, { method: "mobile money", reference: "WAVE-LINK-1" });
    expect(settled.ok).toBe(true);
    expect(getState().payments.length).toBe(before + 1);
    expect(getState().payments.at(-1)?.source).toBe("lien");
    expect(getState().paymentLinks.find((link) => link.id === second.id)?.status).toBe("payé");
    expect(actions.settlePaymentLink(second.token, { method: "mobile money", reference: "WAVE-LINK-1" }).ok).toBe(false);
  });

  it("un producteur devient membre cotisant une seule fois", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    const membres = new Set(getState().members.map((candidate) => candidate.producerId));
    const producteur = getState().producers.find((candidate) => candidate.scoopId === "s1" && !candidate.mergedInto && !membres.has(candidate.id))!;
    const enrolled = actions.enrollProducerAsMember(producteur.id);
    expect(enrolled.ok).toBe(true);
    if (!enrolled.ok) return;
    const member = getState().members.find((candidate) => candidate.id === enrolled.memberId)!;
    expect(member.status).toBe("membre");
    expect(member.producerId).toBe(producteur.id);
    expect(actions.enrollProducerAsMember(producteur.id).ok).toBe(false);
    const autre = getState().producers.find((candidate) => candidate.scoopId !== "s1" && !candidate.mergedInto)!;
    expect(actions.enrollProducerAsMember(autre.id).ok).toBe(false);
  });
});

describe("lien de paiement : adresse courte", () => {
  it("le jeton tient en 12 caractères lisibles et l'adresse ne porte aucune donnée", () => {
    loginAs("gestionnaire", "babacar.fall@scoop-kms.example", "Babacar Fall");
    actions.setContributionRule("s1", { amount: 5000, periodicity: "annuelle", dueDate: "06-30", startYear: 2020 });
    const member = getState().members.find((candidate) => candidate.scoopId === "s1" && candidate.status === "membre")!;
    const created = actions.createPaymentLink({ memberId: member.id, amount: 5000, period: String(new Date().getFullYear() - 1) });
    expect(created.ok).toBe(true);
    if (created.ok) expect(created.token).toMatch(/^[a-z2-9]{12}$/);
  });
});

import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";
import { blockingDossiers, normalizeCode, scoopIssues, nextScoopId } from "@/lib/scoops";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const admin = () => actions.login("Aïssatou Ndiaye", "aissatou.ndiaye@cradesc.example", "admin");
const input = {
  name: "SCOOP Sangalkam Maraîchers",
  commune: "Sangalkam",
  code: "sgk",
  manager: { firstName: "Awa", lastName: "Kane", email: "awa.kane@scoop-sgk.example" },
};

describe("coopératives : règles pures", () => {
  it("normalise le code et trouve l'identifiant suivant", () => {
    expect(normalizeCode(" sgk ")).toBe("SGK");
    expect(
      nextScoopId([
        { id: "s3", name: "a", commune: "b" },
        { id: "s11", name: "c", commune: "d" },
      ]),
    ).toBe("s12");
  });

  it("refuse un nom ou un code déjà pris, un code mal formé, un e-mail invalide ou déjà utilisé", () => {
    const scoops = [
      { id: "s1", name: "SCOOP Keur Momar Sarr", commune: "Keur Momar Sarr", code: "KMS" },
    ];
    const ok = scoopIssues(input, scoops, []);
    expect(ok).toEqual([]);
    const keys = (patch: object, used: string[] = []) =>
      scoopIssues({ ...input, ...patch } as never, scoops, used).map((i) => i.key);
    expect(keys({ name: "  scoop keur momar sarr " })).toContain("errors.scoop.nameTaken");
    expect(keys({ code: "kms" })).toContain("errors.scoop.codeTaken");
    expect(keys({ code: "ab" })).toContain("errors.scoop.codeFormat");
    expect(keys({ code: "ab1" })).toContain("errors.scoop.codeFormat");
    expect(keys({ commune: " " })).toContain("errors.scoop.communeRequired");
    expect(keys({ manager: { ...input.manager, email: "pas-un-mail" } })).toContain(
      "errors.scoop.emailFormat",
    );
    expect(keys({}, ["AWA.KANE@scoop-sgk.example"])).toContain("errors.scoop.emailTaken");
  });

  it("ignore la coopérative modifiée quand on compare le nom et le code", () => {
    const scoops = [{ id: "s1", name: "SCOOP A", commune: "x", code: "AAA" }];
    expect(
      scoopIssues({ ...input, name: "SCOOP A", code: "AAA" }, scoops, [], {
        checkManager: false,
        ignore: "s1",
      }),
    ).toEqual([]);
  });

  it("repère les dossiers qui empêchent d'archiver", () => {
    const d = (id: string, status: string, scoopId = "s1") => ({ id, status, scoopId }) as never;
    expect(
      blockingDossiers("s1", [d("a", "soumis"), d("b", "approuvé"), d("c", "en examen", "s2")]),
    ).toHaveLength(1);
  });
});

describe("coopératives : actions du store", () => {
  it("crée la coopérative, le membre et un compte gestionnaire inactif, avec le journal", () => {
    admin();
    const res = actions.createScoop(input);
    if (!res.ok) throw new Error(res.error);
    const s = getState();
    const scoop = s.scoops.find((x) => x.id === res.scoopId)!;
    expect(scoop).toMatchObject({ name: input.name, code: "SGK", commune: "Sangalkam" });
    const user = s.users.find((u) => u.id === res.userId)!;
    expect(user).toMatchObject({ role: "gestionnaire", scoopId: res.scoopId, active: false });
    expect(user.invited).toBeDefined();
    expect(s.members.find((m) => m.id === res.memberId)).toMatchObject({
      scoopId: res.scoopId,
      status: "membre",
    });
    const actionsLogged = s.audit.filter((a) => a.scoopId === res.scoopId).map((a) => a.action);
    expect(actionsLogged).toEqual(
      expect.arrayContaining([
        "Coopérative créée",
        "Compte gestionnaire créé",
        "Invitation envoyée",
      ]),
    );
    expect(actions.createScoop(input).ok).toBe(false); // nom et code déjà pris
  });

  it("n'est accessible qu'à l'administrateur", () => {
    actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    expect(
      actions.createScoop({
        ...input,
        name: "Autre",
        code: "AUT",
        manager: { ...input.manager, email: "x@y.example" },
      }).ok,
    ).toBe(false);
    expect(actions.archiveScoop("s1").ok).toBe(false);
  });

  it("le gestionnaire invité active son compte en choisissant son mot de passe, avant l'échéance seulement", () => {
    admin();
    const res = actions.createScoop({
      ...input,
      name: "SCOOP Pikine Nord",
      code: "PKN",
      manager: { firstName: "Ali", lastName: "Sy", email: "ali.sy@scoop-pkn.example" },
    });
    if (!res.ok) throw new Error(res.error);
    expect(actions.activateInvitedAccount("ali.sy@scoop-pkn.example")).toBe(true);
    expect(getState().users.find((u) => u.id === res.userId)).toMatchObject({
      active: true,
      invited: undefined,
    });
    expect(actions.activateInvitedAccount("ali.sy@scoop-pkn.example")).toBe(false);
  });

  it("archive sans supprimer, ferme les accès, refuse si un dossier est en cours, puis réactive", () => {
    admin();
    const created = actions.createScoop({
      ...input,
      name: "SCOOP Rufisque",
      code: "RUF",
      manager: { firstName: "Mor", lastName: "Gaye", email: "mor.gaye@scoop-ruf.example" },
    });
    if (!created.ok) throw new Error(created.error);
    actions.activateInvitedAccount("mor.gaye@scoop-ruf.example");
    const res = actions.archiveScoop(created.scoopId);
    expect(res).toMatchObject({ ok: true, closedAccounts: 1 });
    const s = getState();
    expect(s.scoops.find((x) => x.id === created.scoopId)?.archived).toBe(true);
    expect(s.members.some((m) => m.scoopId === created.scoopId)).toBe(true); // données conservées
    expect(s.users.find((u) => u.id === created.userId)?.active).toBe(false);
    expect(
      actions.createMeeting({
        scoopId: created.scoopId,
        kind: "bureau",
        title: "t",
        date: "2026-12-01T10:00:00Z",
        place: "p",
        agenda: [],
      }).ok,
    ).toBe(false);
    expect(actions.archiveScoop(created.scoopId).ok).toBe(false); // déjà archivée
    expect(actions.restoreScoop(created.scoopId).ok).toBe(true);
    // s1 a des dossiers en cours : l'archivage est refusé
    expect(actions.archiveScoop("s1")).toMatchObject({ ok: false });
    expect(getState().scoops.find((x) => x.id === "s1")?.archived).toBeFalsy();
  });

  it("modifie le nom sans entrer en conflit avec elle-même", () => {
    admin();
    expect(
      actions.updateScoop("s1", {
        name: getState().scoops.find((x) => x.id === "s1")!.name,
        commune: "Keur Momar Sarr",
        code: "KMSX",
      }).ok,
    ).toBe(true);
    expect(
      actions.updateScoop("s1", {
        name: getState().scoops.find((x) => x.id === "s2")!.name,
        commune: "x",
        code: "KMSX",
      }).ok,
    ).toBe(false);
  });
});

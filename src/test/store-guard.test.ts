import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import { ROLE_PERMISSIONS, type Permission, type RoleId } from "@/lib/permissions";
import { translate } from "@/lib/i18n";
import { AccessDeniedError, actions } from "@/lib/store";
import { installMemoryStorage, loginAs } from "./session";

beforeAll(installMemoryStorage);

/**
 * Matrice de référence : le droit à exiger pour chaque action du store qui n'a pas de règle propre plus fine
 * (voir docs/revue/B.md, section 6). « result » : l'action renvoie un échec ; « throws » : elle lève `AccessDeniedError`.
 * Un test ci-dessous interdit d'ajouter une action sans garde : toute nouvelle action figure ici, ou dans la liste des exceptions.
 */
export const GUARDED: [string, "result" | "throws", Permission | Permission[]][] = [
  ["setYouthMaxAge", "throws", "config.manage"],
  ["revealCni", "throws", "cni.read"],
  ["updateProducer", "throws", "producer.edit"],
  ["qualifyOrgs", "throws", "org.manage"],
  ["classifyCase", "throws", "quality.review"],
  ["mergeCase", "throws", "quality.merge"],
  ["undoMerge", "throws", "quality.merge"],
  ["updateAlerts", "throws", "alert.manage"],
  ["reviewPlot", "throws", "plot.validate"],
  ["addUser", "throws", "user.manage"],
  ["toggleUser", "throws", "user.manage"],
  ["addImport", "throws", "import.manage"],
  ["submitCorrection", "throws", "producer.read"],
  ["decideCorrection", "throws", "correction.manage"],
  ["confirmLink", "throws", "account.manage"],
  ["rejectLink", "throws", "account.manage"],
  ["unlinkLink", "throws", "account.manage"],
  ["revokeDevice", "throws", "device.manage"],
  ["reactivateDevice", "throws", "device.manage"],
  ["renameDevice", "throws", "device.manage"],
  ["resyncDevice", "throws", "device.manage"],
  ["signOutDevice", "throws", "device.manage"],
  ["linkManually", "throws", "account.manage"],
  ["setCropFamily", "throws", "config.manage"],
  ["attachAlias", "throws", "config.manage"],
  ["ingestImport", "throws", "import.manage"],
  ["exportSnapshot", "throws", "data.backup"],
  ["restoreSnapshot", "throws", "data.backup"],
  ["addMember", "throws", "member.manage"],
  ["updateMember", "throws", "member.manage"],
  ["setMembershipStatus", "throws", "member.manage"],
  ["grantAccess", "result", "role.assign"],
  ["revokeAccess", "result", "role.assign"],
  ["createDossier", "result", "dossier.create"],
  ["updateDossier", "result", "dossier.create"],
  ["addDocument", "result", ["dossier.create", "dossier.review"]],
  ["removeDocument", "result", ["dossier.create", "dossier.review"]],
  ["submitDossier", "result", "dossier.submit"],
  ["startReview", "result", "dossier.review"],
  ["requestComplement", "result", "dossier.review"],
  ["approveDossier", "result", "dossier.review"],
  ["refuseDossier", "result", "dossier.review"],
  ["sendDossierReminders", "throws", "dossier.review"],
  ["recordReportDownload", "throws", "report.download"],
  ["createPlan", "result", "plan.write"],
  ["updatePlan", "result", "plan.write"],
  ["setPlanStatus", "result", "plan.write"],
  ["setContributionRule", "result", "contribution.manage"],
  ["recordPayment", "result", "contribution.manage"],
  ["voidPayment", "result", "contribution.manage"],
  ["createMeeting", "result", "meeting.manage"],
  ["updateMeeting", "result", "meeting.manage"],
  ["holdMeeting", "result", "meeting.manage"],
  ["cancelMeeting", "result", "meeting.manage"],
  ["saveMinutes", "result", "meeting.manage"],
  ["validateMinutes", "result", "meeting.manage"],
  ["attachMinutesDocument", "result", "meeting.manage"],
  ["addLibraryDocument", "result", "library.manage"],
  ["removeLibraryDocument", "result", "library.manage"],
];
/** Actions volontairement hors de cette garde : la session elle-même, et l'activation par jeton d'invitation. */
const OUT_OF_GUARD = ["restoreSession", "login", "logout", "switchRole", "activateInvitedAccount"];

const needed = (p: Permission | Permission[]) => (Array.isArray(p) ? p : [p]);
const call = (name: string) =>
  (actions as unknown as Record<string, (...a: unknown[]) => unknown>)[name]!();
const ROLES = Object.keys(ROLE_PERMISSIONS) as RoleId[];

function outcome(name: string, kind: "result" | "throws") {
  try {
    const r = call(name);
    return kind === "result" ? (r as { ok: boolean; error?: string }) : { ok: true as const };
  } catch (e) {
    return e instanceof AccessDeniedError
      ? { ok: false as const, key: e.key }
      : { ok: true as const, other: e };
  }
}

describe("garde des actions du store : un refus pour chaque rôle sans le droit", () => {
  it("sans session, toute action gardée est refusée", () => {
    actions.logout();
    for (const [name, kind] of GUARDED) {
      const r = outcome(name, kind);
      expect(r.ok, name).toBe(false);
      if (kind === "result")
        expect((r as { error: string }).error, name).toBe(
          translate("fr", "errors.guard.noSession"),
        );
      else expect((r as { key: string }).key, name).toBe("errors.guard.noSession");
    }
  });

  for (const role of ROLES) {
    it(`le rôle ${role} est refusé, avec le bon motif, partout où son droit manque`, () => {
      loginAs(role);
      const has = new Set(ROLE_PERMISSIONS[role]);
      for (const [name, kind, permission] of GUARDED) {
        if (needed(permission).some((p) => has.has(p))) continue;
        const r = outcome(name, kind);
        expect(r.ok, `${role} ${name}`).toBe(false);
        if (kind === "result")
          expect((r as { error: string }).error, `${role} ${name}`).toBe(
            translate("fr", "errors.guard.notAllowed"),
          );
        else expect((r as { key: string }).key, `${role} ${name}`).toBe("errors.guard.notAllowed");
      }
    });

    it(`le rôle ${role} n'est jamais refusé pour le droit qu'il possède (les autres contrôles, eux, restent)`, () => {
      loginAs(role);
      const has = new Set(ROLE_PERMISSIONS[role]);
      for (const [name, kind, permission] of GUARDED) {
        if (!needed(permission).some((p) => has.has(p))) continue;
        const r = outcome(name, kind);
        if (kind === "result" && r.ok === false)
          expect((r as { error: string }).error, `${role} ${name}`).not.toBe(
            translate("fr", "errors.guard.notAllowed"),
          );
      }
    });
  }

  it("aucune action ne peut s'ajouter au store sans garde : chacune est dans la matrice ou dans les exceptions", () => {
    const source = readFileSync("src/lib/store.ts", "utf8");
    const start = source.indexOf("export const actions");
    const names = [...source.slice(start).matchAll(/\n {2}([a-zA-Z]+)\(/g)].map((m) => m[1]!);
    const guarded = new Set(GUARDED.map(([n]) => n));
    const own = (name: string) => {
      // Les actions qui portent déjà leur propre contrôle de droit (permissions.includes, checkAccess, canDownloadDocument).
      const at = source.indexOf(`\n  ${name}(`, start);
      const next = source.slice(at + 1).search(/\n {2}[a-zA-Z]+\(/);
      const body = source.slice(at, at + 1 + (next === -1 ? 3000 : next));
      return /permissions\.includes|checkAccess|canDownloadDocument|can\(/.test(body);
    };
    const missing = names.filter((n) => !guarded.has(n) && !OUT_OF_GUARD.includes(n) && !own(n));
    expect(missing).toEqual([]);
  });
});

import { describe, expect, it } from "vitest";
import { createDemoAuthService } from "@/lib/auth/demo-service";
import { AuthError } from "@/lib/auth/types";

const user = {
  email: "nouveau.gestionnaire@scoop-test.example",
  name: "Nouveau Gestionnaire",
  role: "gestionnaire" as const,
};
const STRONG = "Mot2PasseSolide!";

const setup = () => {
  let t = 1_000_000;
  const svc = createDemoAuthService({ now: () => t, latencyMs: 0 });
  return { svc, tick: (ms: number) => (t += ms), at: () => t };
};
const code = async (p: Promise<unknown>) => {
  try {
    await p;
    return "ok";
  } catch (e) {
    return e instanceof AuthError ? e.code : "autre";
  }
};

describe("invitation à usage unique", () => {
  it("le lien donne le nom et l'adresse masquée, puis active le compte avec un mot de passe conforme", async () => {
    const { svc, at } = setup();
    const token = svc.registerInvitation(user, at() + 60_000);
    const info = await svc.invitationInfo(token);
    expect(info.name).toBe(user.name);
    expect(info.maskedEmail).not.toBe(user.email);
    expect(info.maskedEmail).toContain("@");
    await svc.acceptInvitation(token, STRONG);
    // Le mot de passe choisi ouvre la première étape de connexion.
    await expect(svc.signIn(user.email, STRONG)).resolves.toHaveProperty("challengeId");
  });

  it("un mot de passe trop faible est refusé et le lien reste utilisable", async () => {
    const { svc, at } = setup();
    const token = svc.registerInvitation(user, at() + 60_000);
    expect(await code(svc.acceptInvitation(token, "court"))).toBe("weak_password");
    expect(await code(svc.acceptInvitation(token, STRONG))).toBe("ok");
  });

  it("le lien ne sert qu'une fois", async () => {
    const { svc, at } = setup();
    const token = svc.registerInvitation(user, at() + 60_000);
    await svc.acceptInvitation(token, STRONG);
    expect(await code(svc.acceptInvitation(token, STRONG))).toBe("invitation_invalid");
    expect(await code(svc.invitationInfo(token))).toBe("invitation_invalid");
  });

  it("un lien expiré, inconnu ou remplacé par une nouvelle invitation ne marche plus", async () => {
    const { svc, at, tick } = setup();
    const first = svc.registerInvitation(user, at() + 1000);
    tick(2000);
    expect(await code(svc.invitationInfo(first))).toBe("invitation_invalid");
    expect(await code(svc.invitationInfo("jeton-inconnu"))).toBe("invitation_invalid");

    const old = svc.registerInvitation(user, at() + 60_000);
    const renewed = svc.registerInvitation(user, at() + 120_000);
    expect(renewed).not.toBe(old);
    expect(await code(svc.invitationInfo(old))).toBe("invitation_invalid");
    expect(await code(svc.invitationInfo(renewed))).toBe("ok");
  });

  it("une même invitation renvoie toujours le même lien", () => {
    const { svc, at } = setup();
    const exp = at() + 60_000;
    expect(svc.registerInvitation(user, exp)).toBe(svc.registerInvitation(user, exp));
  });

  it("avant l'activation, la connexion reste refusée sans révéler que l'invitation existe", async () => {
    const { svc, at } = setup();
    svc.registerInvitation(user, at() + 60_000);
    expect(await code(svc.signIn(user.email, STRONG))).toBe("invalid_credentials");
  });
});

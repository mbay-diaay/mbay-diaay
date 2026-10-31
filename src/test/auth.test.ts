import { beforeEach, describe, expect, it } from "vitest";
import { createDemoAuthService, DEMO_ACCOUNTS, DEMO_PASSWORD } from "@/lib/auth/demo-service";
import { AuthError } from "@/lib/auth/types";
import { authErrorMessage } from "@/lib/auth/messages";
import {
  LOGIN_LOCK_MS,
  OTP_MAX_ATTEMPTS,
  OTP_RESEND_COOLDOWN_MS,
  OTP_TTL_MS,
  evaluatePassword,
  isPasswordValid,
  maskEmail,
  normalizeEmail,
} from "@/lib/auth/policy";

const admin = DEMO_ACCOUNTS[0]!;
let clock = 0;
const make = () => createDemoAuthService({ now: () => clock });
const codeOf = (svc: ReturnType<typeof make>) => svc.mailbox.latest()!.code;
const rejectsWith = async (p: Promise<unknown>, code: string) => {
  const err = await p.then(
    () => undefined,
    (e: unknown) => e,
  );
  expect(err).toBeInstanceOf(AuthError);
  expect((err as AuthError).code).toBe(code);
  return err as AuthError;
};

beforeEach(() => {
  clock = 1_000_000;
});

describe("règles de mot de passe", () => {
  it("refuse un mot de passe court, courant ou contenant l'identifiant", () => {
    expect(isPasswordValid("Court1")).toBe(false);
    expect(isPasswordValid("MotDePasse2026!")).toBe(false);
    expect(isPasswordValid("Aissatou2026Secure", "aissatou.ndiaye@cradesc.example")).toBe(false);
    const failing = evaluatePassword("abc")
      .filter((r) => !r.ok)
      .map((r) => r.id);
    expect(failing).toEqual(expect.arrayContaining(["length", "case", "digit"]));
  });
  it("accepte un mot de passe conforme", () => {
    expect(isPasswordValid("Ruisseau-Lent-Matin-47", "a@b.sn")).toBe(true);
  });
  it("normalise l'e-mail et masque l'adresse affichée", () => {
    expect(normalizeEmail("  Prenom.Nom@Exemple.SN ")).toBe("prenom.nom@exemple.sn");
    expect(normalizeEmail("pas-un-email")).toBeNull();
    expect(maskEmail("aissatou.ndiaye@cradesc.example")).toBe("ai*****@cradesc.example");
  });
});

describe("connexion par e-mail, mot de passe et code", () => {
  it("ouvre la session après un code valide envoyé par e-mail", async () => {
    const svc = make();
    const step = await svc.signIn(` ${admin.email.toUpperCase()} `, DEMO_PASSWORD);
    expect(step.maskedEmail).not.toContain("aissatou");
    expect(svc.mailbox.latest()).toMatchObject({ to: admin.email, purpose: "connexion" });
    expect(codeOf(svc)).toMatch(/^\d{6}$/);
    const user = await svc.verifyOtp(step.challengeId, codeOf(svc));
    expect(user).toEqual({ email: admin.email, name: admin.name, role: "admin" });
  });
  it("répond de la même façon pour un compte inconnu et un mauvais mot de passe", async () => {
    const svc = make();
    const a = await rejectsWith(svc.signIn(admin.email, "mauvais"), "invalid_credentials");
    const b = await rejectsWith(svc.signIn("inconnu@exemple.sn", "mauvais"), "invalid_credentials");
    expect(authErrorMessage(a)).toBe(authErrorMessage(b));
    expect(svc.outbox).toHaveLength(0);
  });
  it("verrouille après des échecs répétés, même avec le bon mot de passe, puis libère", async () => {
    const svc = make();
    for (let i = 0; i < 5; i++)
      await rejectsWith(svc.signIn(admin.email, "mauvais"), "invalid_credentials");
    const err = await rejectsWith(svc.signIn(admin.email, DEMO_PASSWORD), "locked");
    expect(err.detail.retryAfterMs).toBeGreaterThan(0);
    clock += LOGIN_LOCK_MS + 1;
    await expect(svc.signIn(admin.email, DEMO_PASSWORD)).resolves.toBeDefined();
  });
  it("verrouille aussi un compte inexistant, sans rien révéler", async () => {
    const svc = make();
    for (let i = 0; i < 5; i++)
      await rejectsWith(svc.signIn("fantome@exemple.sn", "x"), "invalid_credentials");
    await rejectsWith(svc.signIn("fantome@exemple.sn", "x"), "locked");
  });
  it("brûle le code après trop d'essais erronés", async () => {
    const svc = make();
    const { challengeId } = await svc.signIn(admin.email, DEMO_PASSWORD);
    const good = codeOf(svc);
    const wrong = good === "000000" ? "111111" : "000000";
    for (let i = 0; i < OTP_MAX_ATTEMPTS - 1; i++) {
      const e = await rejectsWith(svc.verifyOtp(challengeId, wrong), "otp_invalid");
      expect(e.detail.attemptsLeft).toBe(OTP_MAX_ATTEMPTS - 1 - i);
    }
    await rejectsWith(svc.verifyOtp(challengeId, wrong), "otp_attempts");
    await rejectsWith(svc.verifyOtp(challengeId, good), "otp_expired");
  });
  it("refuse un code expiré et un code déjà utilisé", async () => {
    const svc = make();
    const { challengeId } = await svc.signIn(admin.email, DEMO_PASSWORD);
    const code = codeOf(svc);
    clock += OTP_TTL_MS + 1;
    await rejectsWith(svc.verifyOtp(challengeId, code), "otp_expired");
    const second = await svc.signIn(admin.email, DEMO_PASSWORD);
    const code2 = codeOf(svc);
    await svc.verifyOtp(second.challengeId, code2);
    await rejectsWith(svc.verifyOtp(second.challengeId, code2), "otp_expired");
  });
  it("impose un délai entre deux envois et invalide l'ancien code", async () => {
    const svc = make();
    const { challengeId } = await svc.signIn(admin.email, DEMO_PASSWORD);
    const first = codeOf(svc);
    const e = await rejectsWith(svc.resendOtp(challengeId), "rate_limited");
    expect(e.detail.retryAfterMs).toBeGreaterThan(0);
    clock += OTP_RESEND_COOLDOWN_MS + 1;
    await svc.resendOtp(challengeId);
    const second = codeOf(svc);
    expect(svc.outbox).toHaveLength(2);
    if (second !== first) await rejectsWith(svc.verifyOtp(challengeId, first), "otp_invalid");
    await expect(svc.verifyOtp(challengeId, second)).resolves.toMatchObject({ role: "admin" });
  });
  it("refuse tout quand le mode démonstration est désactivé", async () => {
    const svc = createDemoAuthService({ now: () => clock, enabled: false });
    await rejectsWith(svc.signIn(admin.email, DEMO_PASSWORD), "unavailable");
  });
});

describe("mot de passe oublié", () => {
  const STRONG = "Ruisseau-Lent-Matin-47";
  it("envoie un code, change le mot de passe une seule fois, et invalide l'ancien", async () => {
    const svc = make();
    await svc.requestPasswordReset(admin.email);
    expect(svc.mailbox.latest()).toMatchObject({ to: admin.email, purpose: "reinitialisation" });
    const { resetToken } = await svc.verifyResetCode(admin.email, codeOf(svc));
    await rejectsWith(svc.resetPassword(resetToken, "faible"), "weak_password");
    await svc.resetPassword(resetToken, STRONG);
    await rejectsWith(svc.resetPassword(resetToken, STRONG), "reset_expired");
    await rejectsWith(svc.signIn(admin.email, DEMO_PASSWORD), "invalid_credentials");
    await expect(svc.signIn(admin.email, STRONG)).resolves.toBeDefined();
  });
  it("ne révèle pas l'existence du compte et n'envoie aucun courriel pour un inconnu", async () => {
    const svc = make();
    const known = await svc.requestPasswordReset(admin.email);
    const unknown = await svc.requestPasswordReset("inconnu@exemple.sn");
    expect(Object.keys(unknown).sort()).toEqual(Object.keys(known).sort());
    expect(svc.outbox).toHaveLength(1);
    // Un inconnu se comporte comme un compte réel dont on se trompe de code : aucune différence observable.
    await rejectsWith(svc.verifyResetCode("inconnu@exemple.sn", "123456"), "otp_invalid");
  });
  it("ne renvoie pas de nouveau code avant la fin du délai", async () => {
    const svc = make();
    await svc.requestPasswordReset(admin.email);
    await svc.requestPasswordReset(admin.email);
    expect(svc.outbox).toHaveLength(1);
  });
  it("refuse un jeton de réinitialisation périmé", async () => {
    const svc = make();
    await svc.requestPasswordReset(admin.email);
    const { resetToken } = await svc.verifyResetCode(admin.email, codeOf(svc));
    clock += OTP_TTL_MS + 1;
    await rejectsWith(svc.resetPassword(resetToken, STRONG), "reset_expired");
  });
});

describe("comptes désactivés", () => {
  it("refuse la connexion d'un compte désactivé sans le révéler", async () => {
    const svc = createDemoAuthService({ now: () => clock, isActive: () => false });
    const err = await rejectsWith(svc.signIn(admin.email, DEMO_PASSWORD), "invalid_credentials");
    expect(authErrorMessage(err)).toBe("Adresse e-mail ou mot de passe incorrect.");
    expect(svc.outbox).toHaveLength(0);
  });
  it("refuse aussi un code valide si le compte est désactivé entre-temps", async () => {
    let active = true;
    const svc = createDemoAuthService({ now: () => clock, isActive: () => active });
    const { challengeId } = await svc.signIn(admin.email, DEMO_PASSWORD);
    active = false;
    await rejectsWith(svc.verifyOtp(challengeId, codeOf(svc)), "otp_expired");
  });
});

describe("réinitialisation du mot de passe : plafonds et uniformité", () => {
  const request = async (svc: ReturnType<typeof createDemoAuthService>, email: string) => {
    await svc.requestPasswordReset(email);
  };
  const verify = async (
    svc: ReturnType<typeof createDemoAuthService>,
    email: string,
    code: string,
  ) => {
    try {
      await svc.verifyResetCode(email, code);
      return "ok";
    } catch (e) {
      return e instanceof AuthError ? `${e.code}:${e.detail.attemptsLeft ?? ""}` : "autre";
    }
  };

  it("épuiser les essais d'un code ne donne pas droit à une série illimitée de nouveaux essais", async () => {
    let t = 1_000_000;
    const svc = createDemoAuthService({ now: () => t, latencyMs: 0 });
    let attempts = 0;
    for (let cycle = 0; cycle < 12; cycle++) {
      await request(svc, admin.email);
      t += 61_000; // le délai entre deux demandes est respecté
      for (let i = 0; i < 5; i++) {
        const r = await verify(svc, admin.email, "000000");
        if (r.startsWith("otp_invalid") || r.startsWith("otp_attempts")) attempts += 1;
      }
    }
    // Quatre envois par heure, cinq essais chacun : au plus 20 essais, jamais 60.
    expect(attempts).toBeLessThanOrEqual(20);
  });

  it("une adresse inconnue répond exactement comme une adresse connue, essai après essai", async () => {
    const trace = async (email: string) => {
      const svc = createDemoAuthService({ now: () => 1_000_000, latencyMs: 0 });
      await request(svc, email);
      const seen: string[] = [];
      for (let i = 0; i < 6; i++) seen.push(await verify(svc, email, "000000"));
      return seen;
    };
    expect(await trace("personne.inconnue@exemple.example")).toEqual(await trace(admin.email));
  });
});

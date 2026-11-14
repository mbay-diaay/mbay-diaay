import { av as translate, aj as isApiMode, o as actions, aw as DEMO_MODE, C as getState, as as setTokens, ap as clearTokens } from './locale.service-c0QhtcVY.mjs';
import { a as apiFetch, A as ApiError } from './client-D1lxPQMx.mjs';
import { i as isPasswordValid, m as maskEmail, n as normalizeEmail, R as RESET_TOKEN_TTL_MS, O as OTP_RESEND_COOLDOWN_MS, a as OTP_TTL_MS, L as LOGIN_LOCK_MS, b as isOtpFormat } from './policy-CKiWt4l5.mjs';

var AuthError = class extends Error {
  constructor(code, detail = {}) {
    super(code);
    this.code = code;
    this.detail = detail;
    this.name = "AuthError";
  }
};
function mapAuthError(e) {
  var _a;
  if (e instanceof ApiError) {
    const code = (_a = {
      INVALID_CREDENTIALS: "invalid_credentials",
      OTP_INVALID: "otp_invalid",
      OTP_EXPIRED: "otp_expired",
      OTP_ATTEMPTS: "otp_attempts",
      RATE_LIMITED: "rate_limited",
      REFRESH_INVALID: "reset_expired"
    }[e.code]) != null ? _a : "unavailable";
    const detail = {};
    if (e.details && typeof e.details === "object" && "retryAfterMs" in e.details) detail.retryAfterMs = Number(e.details.retryAfterMs);
    throw new AuthError(code, detail);
  }
  throw new AuthError("unavailable");
}
function createApiAuthService() {
  return {
    async signIn(email, password) {
      try {
        return await apiFetch("/auth/sign-in", {
          method: "POST",
          body: {
            email,
            password
          },
          auth: false
        });
      } catch (e) {
        mapAuthError(e);
      }
    },
    async verifyOtp(challengeId, code) {
      try {
        const data = await apiFetch("/auth/otp/verify", {
          method: "POST",
          body: {
            challengeId,
            code
          },
          auth: false
        });
        setTokens(data.accessToken, data.refreshToken);
        return {
          email: data.user.email,
          name: data.user.name,
          role: data.user.role
        };
      } catch (e) {
        mapAuthError(e);
      }
    },
    async resendOtp(challengeId) {
      try {
        return await apiFetch("/auth/otp/resend", {
          method: "POST",
          body: { challengeId },
          auth: false
        });
      } catch (e) {
        mapAuthError(e);
      }
    },
    async requestPasswordReset(_email) {
      const now = Date.now();
      return {
        maskedEmail: "***",
        expiresAt: now + 6e5,
        resendAvailableAt: now + 3e4
      };
    },
    async verifyResetCode() {
      throw new AuthError("unavailable");
    },
    async resetPassword() {
      throw new AuthError("unavailable");
    },
    async invitationInfo() {
      throw new AuthError("invitation_invalid");
    },
    async acceptInvitation() {
      throw new AuthError("invitation_invalid");
    }
  };
}
function apiLogout() {
  clearTokens();
  apiFetch("/auth/logout", {
    method: "POST",
    body: {},
    auth: false
  }).catch(() => void 0);
}
var DEMO_PASSWORD = "Demonstration2026";
var SUPERADMIN_EMAIL = "octus.informatique@gmail.com";
var SUPERADMIN_PASSWORD_SHA256 = "ba9166544adf0f45187edaac157ec4db6d4679cf9580e7df94803a3de57d7a73";
var DEMO_ACCOUNTS = [
  {
    email: SUPERADMIN_EMAIL,
    name: "Super administrateur",
    role: "superadmin",
    label: "Super administrateur"
  },
  {
    email: "aissatou.ndiaye@cradesc.example",
    name: "A\xEFssatou Ndiaye",
    role: "admin",
    label: "Administrateur CRADESC"
  },
  {
    email: "babacar.fall@scoop-kms.example",
    name: "Babacar Fall",
    role: "gestionnaire",
    label: "Gestionnaire de SCOOP"
  },
  {
    email: "ousmane.gueye@uscn.example",
    name: "Ousmane Gu\xE8ye",
    role: "faitiere",
    label: "Fa\xEEti\xE8re (USCN)"
  },
  {
    email: "fatou.sarr@cradesc.example",
    name: "Fatou Sarr",
    role: "technicien",
    label: "Technicien"
  },
  {
    email: "moussa.diouf@scoop-kms.example",
    name: "Moussa Diouf",
    role: "representant",
    label: "Repr\xE9sentant de SCOOP"
  },
  {
    email: "aminata.ba@scoop-kms.example",
    name: "Aminata B\xE2",
    role: "secretaire",
    label: "Secr\xE9taire de SCOOP"
  },
  {
    email: "ibrahima.seck@scoop-kms.example",
    name: "Ibrahima Seck",
    role: "ventes",
    label: "Responsable des ventes"
  },
  {
    email: "rokhaya.diallo@scoop-kms.example",
    name: "Rokhaya Diallo",
    role: "rapports",
    label: "Responsable des rapports"
  },
  {
    email: "cheikh.ndiaye@scoop-kms.example",
    name: "Cheikh Ndiaye",
    role: "bureau",
    label: "Pr\xE9sident (bureau de la SCOOP)"
  },
  {
    email: "awa.sy@scoop-kms.example",
    name: "Awa Sy",
    role: "surveillance",
    label: "Conseil de surveillance"
  }
];
async function sha256Hex(text) {
  const digest = await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}
async function passwordMatches(account, password) {
  if (account.passwordSha256) return await sha256Hex(password) === account.passwordSha256;
  return account.password === password;
}
function randomDigits(length) {
  let out = "";
  const buf = /* @__PURE__ */ new Uint8Array(1);
  while (out.length < length) {
    globalThis.crypto.getRandomValues(buf);
    if (buf[0] < 250) out += String(buf[0] % 10);
  }
  return out;
}
function randomToken() {
  const buf = /* @__PURE__ */ new Uint8Array(24);
  globalThis.crypto.getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
}
var RESET_WINDOW_MS = 36e5;
function createDemoAuthService(options = {}) {
  var _a, _b, _c, _d;
  const now = (_a = options.now) != null ? _a : Date.now;
  const latency = (_b = options.latencyMs) != null ? _b : 0;
  const enabled = (_c = options.enabled) != null ? _c : true;
  const isActive = (_d = options.isActive) != null ? _d : (() => true);
  const wait = () => latency ? new Promise((r) => setTimeout(r, latency)) : Promise.resolve();
  const accounts = new Map(DEMO_ACCOUNTS.map((a) => [a.email, a.role === "superadmin" ? {
    name: a.name,
    role: a.role,
    passwordSha256: SUPERADMIN_PASSWORD_SHA256
  } : {
    name: a.name,
    role: a.role,
    password: DEMO_PASSWORD
  }]));
  const failures = /* @__PURE__ */ new Map();
  const challenges = /* @__PURE__ */ new Map();
  const resets = /* @__PURE__ */ new Map();
  const resetSends = /* @__PURE__ */ new Map();
  const resetTokens = /* @__PURE__ */ new Map();
  const invitations = /* @__PURE__ */ new Map();
  const outbox = [];
  const listeners = /* @__PURE__ */ new Set();
  const send = (to, purpose, code) => {
    outbox.push({
      id: outbox.length + 1,
      to,
      purpose,
      code,
      at: now()
    });
    listeners.forEach((l) => l());
  };
  const issue = (email, previous) => {
    var _a2;
    const code = randomDigits(6);
    const t = now();
    return {
      email,
      code,
      expiresAt: t + OTP_TTL_MS,
      attempts: 0,
      sends: ((_a2 = previous == null ? void 0 : previous.sends) != null ? _a2 : 0) + 1,
      lastSentAt: t
    };
  };
  const sentInfo = (email, s) => ({
    maskedEmail: maskEmail(email),
    expiresAt: s.expiresAt,
    resendAvailableAt: s.lastSentAt + OTP_RESEND_COOLDOWN_MS
  });
  const guard = () => {
    if (!enabled) throw new AuthError("unavailable");
  };
  const checkCode = (store, key, code) => {
    const s = store.get(key);
    if (!s || now() > s.expiresAt) {
      store.delete(key);
      throw new AuthError("otp_expired");
    }
    if (!isOtpFormat(code) || code !== s.code) {
      s.attempts += 1;
      if (s.attempts >= 5) {
        store.delete(key);
        throw new AuthError("otp_attempts");
      }
      throw new AuthError("otp_invalid", { attemptsLeft: 5 - s.attempts });
    }
    store.delete(key);
    return s;
  };
  const resend = (store, key, purpose) => {
    const s = store.get(key);
    if (!s || now() > s.expiresAt) throw new AuthError("otp_expired");
    const remaining = s.lastSentAt + OTP_RESEND_COOLDOWN_MS - now();
    if (remaining > 0) throw new AuthError("rate_limited", { retryAfterMs: remaining });
    if (s.sends >= 4) throw new AuthError("rate_limited", { retryAfterMs: OTP_TTL_MS });
    const next = issue(s.email, s);
    store.set(key, next);
    send(s.email, purpose, next.code);
    return sentInfo(s.email, next);
  };
  return {
    outbox,
    mailbox: {
      latest: () => outbox[outbox.length - 1],
      subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      }
    },
    async signIn(rawEmail, password) {
      var _a2, _b2;
      guard();
      await wait();
      const email = (_a2 = normalizeEmail(rawEmail)) != null ? _a2 : rawEmail.trim().toLowerCase();
      const f = (_b2 = failures.get(email)) != null ? _b2 : {
        count: 0,
        lockedUntil: 0
      };
      if (f.lockedUntil > now()) throw new AuthError("locked", { retryAfterMs: f.lockedUntil - now() });
      const account = accounts.get(email);
      if (!account || !await passwordMatches(account, password) || !isActive(email)) {
        f.count += 1;
        if (f.count >= 5) {
          f.count = 0;
          f.lockedUntil = now() + LOGIN_LOCK_MS;
        }
        failures.set(email, f);
        throw new AuthError("invalid_credentials");
      }
      failures.delete(email);
      const challengeId = randomToken();
      const state = issue(email);
      challenges.set(challengeId, state);
      send(email, "connexion", state.code);
      return {
        challengeId,
        ...sentInfo(email, state)
      };
    },
    async verifyOtp(challengeId, code) {
      guard();
      await wait();
      const s = checkCode(challenges, challengeId, code);
      const account = accounts.get(s.email);
      if (!account || !isActive(s.email)) throw new AuthError("otp_expired");
      return {
        email: s.email,
        name: account.name,
        role: account.role
      };
    },
    async resendOtp(challengeId) {
      guard();
      await wait();
      return resend(challenges, challengeId, "connexion");
    },
    async requestPasswordReset(rawEmail) {
      var _a2, _b2;
      guard();
      await wait();
      const email = (_a2 = normalizeEmail(rawEmail)) != null ? _a2 : rawEmail.trim().toLowerCase();
      const known = accounts.has(email);
      const previous = resets.get(email);
      const recent = ((_b2 = resetSends.get(email)) != null ? _b2 : []).filter((t) => now() - t < RESET_WINDOW_MS);
      if (recent.length >= 4 || previous && previous.lastSentAt + 6e4 > now()) return {
        maskedEmail: maskEmail(email),
        expiresAt: now() + OTP_TTL_MS,
        resendAvailableAt: now() + OTP_RESEND_COOLDOWN_MS
      };
      const state = issue(email, previous);
      resets.set(email, state);
      resetSends.set(email, [...recent, now()]);
      if (known) send(email, "reinitialisation", state.code);
      return sentInfo(email, state);
    },
    async verifyResetCode(rawEmail, code) {
      var _a2;
      guard();
      await wait();
      const email = (_a2 = normalizeEmail(rawEmail)) != null ? _a2 : rawEmail.trim().toLowerCase();
      checkCode(resets, email, code);
      const resetToken = randomToken();
      resetTokens.set(resetToken, {
        email,
        expiresAt: now() + RESET_TOKEN_TTL_MS
      });
      return { resetToken };
    },
    /**
    * Démonstration seulement : enregistre l'invitation émise par l'administrateur et renvoie son jeton.
    * Idempotent pour une même invitation (même adresse, même échéance). L'API réelle envoie le courriel côté serveur.
    */
    registerInvitation(user, expiresAt) {
      for (const [token2, i] of invitations) if (i.email === user.email && i.expiresAt === expiresAt) return token2;
      for (const [token2, i] of invitations) if (i.email === user.email) invitations.delete(token2);
      const token = randomToken();
      invitations.set(token, {
        ...user,
        expiresAt
      });
      return token;
    },
    async invitationInfo(token) {
      guard();
      await wait();
      const i = invitations.get(token);
      if (!i || now() > i.expiresAt) {
        invitations.delete(token);
        throw new AuthError("invitation_invalid");
      }
      return {
        name: i.name,
        email: i.email,
        maskedEmail: maskEmail(i.email)
      };
    },
    async acceptInvitation(token, newPassword) {
      guard();
      await wait();
      const i = invitations.get(token);
      if (!i || now() > i.expiresAt) {
        invitations.delete(token);
        throw new AuthError("invitation_invalid");
      }
      if (!isPasswordValid(newPassword, i.email)) throw new AuthError("weak_password");
      accounts.set(i.email, {
        name: i.name,
        role: i.role,
        password: newPassword
      });
      invitations.delete(token);
      return {
        email: i.email,
        name: i.name,
        role: i.role
      };
    },
    async resetPassword(resetToken, newPassword) {
      guard();
      await wait();
      const t = resetTokens.get(resetToken);
      if (!t || now() > t.expiresAt) {
        resetTokens.delete(resetToken);
        throw new AuthError("reset_expired");
      }
      if (!isPasswordValid(newPassword, t.email)) throw new AuthError("weak_password");
      const account = accounts.get(t.email);
      if (!account) throw new AuthError("reset_expired");
      account.password = newPassword;
      delete account.passwordSha256;
      failures.delete(t.email);
      resetTokens.delete(resetToken);
    }
  };
}
var french = (key, params) => translate("fr", key, params);
var MESSAGE_KEYS = {
  invalid_credentials: "auth.error.invalid_credentials",
  locked: "auth.error.locked",
  otp_invalid: "auth.error.otp_invalid",
  otp_expired: "auth.error.otp_expired",
  otp_attempts: "auth.error.otp_attempts",
  rate_limited: "auth.error.rate_limited",
  weak_password: "auth.error.weak_password",
  reset_expired: "auth.error.reset_expired",
  invitation_invalid: "auth.error.invitation_invalid",
  unavailable: "auth.error.unavailable"
};
function formatWait(ms, t = french) {
  const s = Math.ceil(ms / 1e3);
  return s < 90 ? t("auth.wait.seconds", { n: s }) : t("auth.wait.minutes", { n: Math.ceil(s / 60) });
}
function authErrorMessage(error, t = french) {
  if (!(error instanceof AuthError)) return t("auth.error.fallback");
  const base = t(MESSAGE_KEYS[error.code]);
  const { retryAfterMs, attemptsLeft } = error.detail;
  if (retryAfterMs && (error.code === "locked" || error.code === "rate_limited")) return `${base} ${t("auth.error.retryIn", { wait: formatWait(retryAfterMs, t) })}`;
  if (error.code === "otp_invalid" && attemptsLeft !== void 0) return `${base} ${t("auth.error.attemptsLeft.autre", { count: attemptsLeft })}`;
  return base;
}
var demo = createDemoAuthService({
  latencyMs: 450,
  enabled: DEMO_MODE && !isApiMode(),
  isActive: (email) => {
    var _a, _b;
    return (_b = (_a = getState().users.find((u) => u.email === email)) == null ? void 0 : _a.active) != null ? _b : true;
  }
});
var authService = isApiMode() ? createApiAuthService() : {
  ...demo,
  async acceptInvitation(token, newPassword) {
    const user = await demo.acceptInvitation(token, newPassword);
    if (!actions.activateInvitedAccount(user.email)) throw new AuthError("invitation_invalid");
    return user;
  }
};
var demoMailbox = demo.mailbox;
function logoutAuthSideEffects() {
  if (isApiMode()) apiLogout();
}
function pendingInvitationLinks() {
  if (!DEMO_MODE || isApiMode()) return [];
  return getState().users.filter((u) => !u.active && u.invited && Date.parse(u.invited.expiresAt) > Date.now()).map((u) => {
    const expiresAt = Date.parse(u.invited.expiresAt);
    const token = demo.registerInvitation({
      email: u.email,
      name: u.name,
      role: u.role
    }, expiresAt);
    return {
      email: u.email,
      name: u.name,
      token,
      expiresAt
    };
  });
}

export { DEMO_ACCOUNTS as D, authErrorMessage as a, authService as b, DEMO_PASSWORD as c, demoMailbox as d, logoutAuthSideEffects as l, pendingInvitationLinks as p };
//# sourceMappingURL=auth-B3-o0LRT.mjs.map

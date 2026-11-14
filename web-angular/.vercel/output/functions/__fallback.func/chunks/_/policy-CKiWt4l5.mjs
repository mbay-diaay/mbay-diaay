import { z } from 'zod';

var OTP_TTL_MS = 6e5;
var OTP_RESEND_COOLDOWN_MS = 6e4;
var LOGIN_LOCK_MS = 9e5;
var RESET_TOKEN_TTL_MS = 6e5;
var emailSchema = z.string().trim().toLowerCase().pipe(z.email());
function normalizeEmail(value) {
  const parsed = emailSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}
var COMMON = [
  "motdepasse",
  "password",
  "azerty",
  "qwerty",
  "123456",
  "abcdef",
  "mbaydiaay",
  "cradesc",
  "senegal",
  "dakar",
  "bienvenue"
];
function evaluatePassword(password, email = "") {
  var _a, _b;
  const lower = password.toLowerCase();
  const parts = ((_b = (_a = email.split("@")[0]) == null ? void 0 : _a.toLowerCase()) != null ? _b : "").split(/[^a-z0-9]+/).filter((p) => p.length >= 3);
  return [
    {
      id: "length",
      key: "auth.password.rule.length",
      params: { count: 12 },
      ok: password.length >= 12
    },
    {
      id: "case",
      key: "auth.password.rule.case",
      ok: /[a-zà-ÿ]/.test(password) && /[A-ZÀ-Þ]/.test(password)
    },
    {
      id: "digit",
      key: "auth.password.rule.digit",
      ok: /\d/.test(password)
    },
    {
      id: "common",
      key: "auth.password.rule.common",
      ok: !COMMON.some((c) => lower.includes(c))
    },
    {
      id: "personal",
      key: "auth.password.rule.personal",
      ok: parts.every((p) => !lower.includes(p))
    }
  ];
}
var isPasswordValid = (password, email = "") => evaluatePassword(password, email).every((r) => r.ok);
var isOtpFormat = (code) => new RegExp(`^\\d{6}$`).test(code);
function maskEmail(email) {
  const [local = "", domain = ""] = email.split("@");
  return `${local.slice(0, 2)}*****@${domain}`;
}

export { LOGIN_LOCK_MS as L, OTP_RESEND_COOLDOWN_MS as O, RESET_TOKEN_TTL_MS as R, OTP_TTL_MS as a, isOtpFormat as b, isPasswordValid as i, maskEmail as m, normalizeEmail as n };
//# sourceMappingURL=policy-CKiWt4l5.mjs.map

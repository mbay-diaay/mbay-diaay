import { G as fr } from './locale.service-c0QhtcVY.mjs';
import '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'rxjs';
import 'rxjs/operators';
import 'node:module';
import 'node:async_hooks';

var pseudo = (text) => {
  var _a, _b;
  const visible = text.replace(/\{\w+\}/g, "").length;
  return `[${text} ${(_b = (_a = "~".repeat(Math.ceil(visible * 0.3)).match(/.{1,5}/g)) == null ? void 0 : _a.join(" ")) != null ? _b : ""}]`;
};
var RELUES = {
  "locale.fr": "Fran\xE7ais",
  "locale.wo": "Wolof"
};
var BROUILLONS_A_RELIRE = {
  "auth.layout.headline": "Bindal, r\xEBddal ci kaart te toppal say beykat, doonte rezo amul.",
  "auth.layout.lead": "Benn mbooloo, ay koperatiif, benn \xEBll\xEBg.",
  "auth.login.title": "Duggu",
  "auth.login.description": "Duggal ci sa b\xE9rab ak sa adaras e-mail. Dina\xF1u la y\xF3nne ab kood ngir w\xF3oral.",
  "auth.login.email": "Adaras e-mail",
  "auth.login.emailPlaceholder": "prenom.nom@organisation.sn",
  "auth.login.password": "Baatu j\xE0ll",
  "auth.login.passwordPlaceholder": "Sa baatu j\xE0ll",
  "auth.login.forgot": "F\xE0tte nga sa baatu j\xE0ll?",
  "auth.login.submit": "Duggu",
  "auth.login.submitting": "Duggu gi mi ngi dem",
  "auth.login.errorEmail": "Bindal adaras e-mail bu baax.",
  "auth.login.errorPassword": "Bindal sa baatu j\xE0ll.",
  "auth.login.footer": "Sa duggu dina jeex boppam ginnaaw 30 minit.",
  "auth.step.credentials": "Say xibaar",
  "auth.step.code": "W\xF3oral",
  "auth.step.progress": "Tappe {current} / {total}",
  "auth.otp.title": "W\xF3oral ci \xF1aari tappe",
  "auth.otp.sent": "Y\xF3nne na\xF1u ab kood bu am {length} siifar ci {email}. Dina baax {minutes} minit.",
  "auth.otp.code": "Kood bu w\xF3oral",
  "auth.otp.errorLength": "Bindal {length} siifar yu kood bi.",
  "auth.otp.submit": "W\xF3oral te duggu",
  "auth.otp.verifying": "W\xF3oral gi mi ngi dem",
  "auth.otp.resend": "Y\xF3nneewaat kood bi",
  "auth.otp.resendIn": "Y\xF3nneewaat kood bi ci {seconds} s",
  "auth.otp.resent": "Y\xF3nne na\xF1u ab kood bu bees.",
  "auth.otp.back": "Soppi adaras",
  "auth.mail.title": "Bataaxal bu \xF1u roy",
  "auth.mail.line": "Bu dee ci d\xEBgg-d\xEBgg, dina\xF1u y\xF3nne kood bii ci {to}.",
  "auth.mail.code": "Kood bi \xF1u jot :",
  "auth.mail.invitationTitle": "Woote bu \xF1u roy",
  "auth.mail.invitationLine": "Bu dee ci d\xEBgg-d\xEBgg, dina\xF1u y\xF3nne lien bii ci {to}.",
  "auth.mail.invitationOpen": "Ubbil lien woote bu {name}",
  "auth.password.show": "Wone",
  "auth.password.hide": "N\xEBbb",
  "auth.snack.close": "T\xEBj bataaxal bi",
  "auth.help.title": "Soxla nga ndimbal ngir duggu?",
  "auth.cradesc.carriedBy": "Ci njiitu",
  "auth.cradesc.fullName": "Centre de Recherche et d'Action sur les Droits \xC9conomiques, Sociaux et Culturels",
  "auth.cradesc.logoAlt": "Logo CRADESC",
  "auth.cradesc.visit": "Seet situ CRADESC (palanteer bu bees)",
  "auth.error.invalid_credentials": "Adaras e-mail bi walla baatu j\xE0ll bi baaxul.",
  "auth.error.locked": "J\xE9em yi bari na\xF1u lool. Duggu gi t\xEBju na ab diir.",
  "auth.error.otp_invalid": "Kood bi baaxul.",
  "auth.error.otp_expired": "Kood bii jeex na. Laajal bu bees.",
  "auth.error.otp_attempts": "J\xE9em yi bari na\xF1u lool. T\xE0mbaliwaatal duggu gi ngir jot kood bu bees.",
  "auth.error.rate_limited": "Laaj yi bari na\xF1u lool. Mu\xF1al ba noppi j\xE9emaat.",
  "auth.error.weak_password": "Baatu j\xE0ll bii toppul s\xE0rt y\xE9pp.",
  "auth.error.reset_expired": "Laaj bii jeex na. T\xE0mbaliwaatal ci nj\xEBlb\xE9en.",
  "auth.error.invitation_invalid": "Lien woote bii amatul solo. Laajal benn bu bees ci sa njiit.",
  "auth.error.unavailable": "Sarwiisu duggu gi ligg\xE9eyul l\xE9egi. Jokkool ak njiit li.",
  "auth.error.fallback": "Am na njuumte. J\xE9emaatal ci kanam tuuti.",
  "auth.error.retryIn": "J\xE9emaatal ci {wait}.",
  "auth.error.attemptsLeft.un": "{count} j\xE9em bu des.",
  "auth.error.attemptsLeft.autre": "{count} j\xE9em yu des.",
  "auth.wait.seconds": "{n} s",
  "auth.wait.minutes": "{n} min",
  "brand.logoAlt": "Logo Mbay Diaay",
  "ui.slideshow.goTo": "Wone nataal {current} ci {total}"
};
var wo = {
  ...Object.fromEntries(Object.entries(fr).map(([k, v]) => [k, pseudo(v)])),
  ...BROUILLONS_A_RELIRE,
  ...RELUES
};

export { wo };
//# sourceMappingURL=wo-DeJgIbQe.mjs.map

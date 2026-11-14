import { fr, type Messages, type MessageKey } from "./fr";

/**
 * Dictionnaire wolof. Aucune phrase n'est écrite ici sans qu'une personne locutrice l'ait relue :
 * tout texte est un **texte repère** calculé depuis le français (pseudo-localisation : allongé d'environ 30 %,
 * entre crochets), qui sert à vérifier les débordements et le basculement de langue. Seules les entrées de
 * `RELUES` sont de vraies traductions, relues par une personne locutrice : une clé y rejoint `REVIEWED_WO`.
 * Ce n'est pas une traduction : ne jamais y écrire un texte non relu.
 */

/** Clés dont le texte wolof a été relu par une personne locutrice (ici, seulement les noms des deux langues). */
export const REVIEWED_WO: readonly MessageKey[] = ["locale.fr", "locale.wo"];

/** Clés volontairement sans entrée wolof : elles s'affichent en français en attendant. */
export const TO_TRANSLATE: readonly MessageKey[] = [];

/** Texte repère : le français entre crochets, allongé d'environ 30 % ; les `{paramètres}` sont conservés. */
export const pseudo = (text: string): string => {
  const visible = text.replace(/\{\w+\}/g, "").length;
  const pad = "~".repeat(Math.ceil(visible * 0.3));
  // Par groupes de 5 : un bloc de tildes sans espace ne se coupe pas et ferait déborder les écrans étroits.
  return `[${text} ${pad.match(/.{1,5}/g)?.join(" ") ?? ""}]`;
};

/** Traductions relues par une personne locutrice (clés listées dans `REVIEWED_WO`). */
const RELUES: Partial<Messages> = {
  "locale.fr": "Français",
  "locale.wo": "Wolof",
};

/**
 * EXCEPTION décidée par l'utilisateur le 12/11/2026 : brouillons wolof de la page de connexion,
 * rédigés sans relecture par une personne locutrice. Ils s'affichent dans l'app mais NE SONT PAS
 * des traductions relues : ils ne rejoignent pas `REVIEWED_WO`. Fiche de relecture :
 * `docs/WOLOF_CONNEXION_A_RELIRE.md`. Une fois relue, une clé passe dans `RELUES` + `REVIEWED_WO`.
 */
export const BROUILLONS_A_RELIRE: Partial<Messages> = {
  "auth.layout.headline": "Bindal, rëddal ci kaart te toppal say beykat, doonte rezo amul.",
  "auth.layout.lead": "Benn mbooloo, ay koperatiif, benn ëllëg.",
  "auth.login.title": "Duggu",
  "auth.login.description": "Duggal ci sa bérab ak sa adaras e-mail. Dinañu la yónne ab kood ngir wóoral.",
  "auth.login.email": "Adaras e-mail",
  "auth.login.emailPlaceholder": "prenom.nom@organisation.sn",
  "auth.login.password": "Baatu jàll",
  "auth.login.passwordPlaceholder": "Sa baatu jàll",
  "auth.login.forgot": "Fàtte nga sa baatu jàll?",
  "auth.login.submit": "Duggu",
  "auth.login.submitting": "Duggu gi mi ngi dem",
  "auth.login.errorEmail": "Bindal adaras e-mail bu baax.",
  "auth.login.errorPassword": "Bindal sa baatu jàll.",
  "auth.login.footer": "Sa duggu dina jeex boppam ginnaaw 30 minit.",
  "auth.step.credentials": "Say xibaar",
  "auth.step.code": "Wóoral",
  "auth.step.progress": "Tappe {current} / {total}",
  "auth.otp.title": "Wóoral ci ñaari tappe",
  "auth.otp.sent": "Yónne nañu ab kood bu am {length} siifar ci {email}. Dina baax {minutes} minit.",
  "auth.otp.code": "Kood bu wóoral",
  "auth.otp.errorLength": "Bindal {length} siifar yu kood bi.",
  "auth.otp.submit": "Wóoral te duggu",
  "auth.otp.verifying": "Wóoral gi mi ngi dem",
  "auth.otp.resend": "Yónneewaat kood bi",
  "auth.otp.resendIn": "Yónneewaat kood bi ci {seconds} s",
  "auth.otp.resent": "Yónne nañu ab kood bu bees.",
  "auth.otp.back": "Soppi adaras",
  "auth.mail.title": "Bataaxal bu ñu roy",
  "auth.mail.line": "Bu dee ci dëgg-dëgg, dinañu yónne kood bii ci {to}.",
  "auth.mail.code": "Kood bi ñu jot :",
  "auth.mail.invitationTitle": "Woote bu ñu roy",
  "auth.mail.invitationLine": "Bu dee ci dëgg-dëgg, dinañu yónne lien bii ci {to}.",
  "auth.mail.invitationOpen": "Ubbil lien woote bu {name}",
  "auth.password.show": "Wone",
  "auth.password.hide": "Nëbb",
  "auth.snack.close": "Tëj bataaxal bi",
  "auth.help.title": "Soxla nga ndimbal ngir duggu?",
  "auth.cradesc.carriedBy": "Ci njiitu",
  "auth.cradesc.fullName": "Centre de Recherche et d'Action sur les Droits Économiques, Sociaux et Culturels",
  "auth.cradesc.logoAlt": "Logo CRADESC",
  "auth.cradesc.visit": "Seet situ CRADESC (palanteer bu bees)",
  "auth.error.invalid_credentials": "Adaras e-mail bi walla baatu jàll bi baaxul.",
  "auth.error.locked": "Jéem yi bari nañu lool. Duggu gi tëju na ab diir.",
  "auth.error.otp_invalid": "Kood bi baaxul.",
  "auth.error.otp_expired": "Kood bii jeex na. Laajal bu bees.",
  "auth.error.otp_attempts": "Jéem yi bari nañu lool. Tàmbaliwaatal duggu gi ngir jot kood bu bees.",
  "auth.error.rate_limited": "Laaj yi bari nañu lool. Muñal ba noppi jéemaat.",
  "auth.error.weak_password": "Baatu jàll bii toppul sàrt yépp.",
  "auth.error.reset_expired": "Laaj bii jeex na. Tàmbaliwaatal ci njëlbéen.",
  "auth.error.invitation_invalid": "Lien woote bii amatul solo. Laajal benn bu bees ci sa njiit.",
  "auth.error.unavailable": "Sarwiisu duggu gi liggéeyul léegi. Jokkool ak njiit li.",
  "auth.error.fallback": "Am na njuumte. Jéemaatal ci kanam tuuti.",
  "auth.error.retryIn": "Jéemaatal ci {wait}.",
  "auth.error.attemptsLeft.un": "{count} jéem bu des.",
  "auth.error.attemptsLeft.autre": "{count} jéem yu des.",
  "auth.wait.seconds": "{n} s",
  "auth.wait.minutes": "{n} min",
  "brand.logoAlt": "Logo Mbay Diaay",
  "ui.slideshow.goTo": "Wone nataal {current} ci {total}",
};

/** Clés du wolof affichées mais pas encore relues (brouillons de la page de connexion). */
export const TO_REVIEW_WO = Object.keys(BROUILLONS_A_RELIRE) as MessageKey[];

export const wo: Partial<Messages> = {
  ...(Object.fromEntries(Object.entries(fr).map(([k, v]) => [k, pseudo(v)])) as Messages),
  ...BROUILLONS_A_RELIRE,
  ...RELUES,
};

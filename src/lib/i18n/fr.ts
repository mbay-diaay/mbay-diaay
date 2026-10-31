import { audit } from "./messages/audit";
import { common } from "./messages/common";
import { charges } from "./messages/charges";
import { exploitation } from "./messages/exploitation";
import { stocks } from "./messages/stocks";
import { credits } from "./messages/credits";
import { ventes } from "./messages/ventes";
import { campagnes } from "./messages/campagnes";
import { calendriers } from "./messages/calendriers";
import { suivi } from "./messages/suivi";
import { cooperatives } from "./messages/cooperatives";
import { cotisations } from "./messages/cotisations";
import { reunions } from "./messages/reunions";
import { documents } from "./messages/documents";
import { errors } from "./messages/errors";
import { dashboard } from "./messages/dashboard";
import { producteurs } from "./messages/producteurs";
import { qualite } from "./messages/qualite";
import { cooperative } from "./messages/cooperative";
import { admin } from "./messages/admin";
import { auth } from "./messages/auth";
import { shell as shellMessages } from "./messages/shell";
import { organisations } from "./messages/organisations";
import { sauvegarde } from "./messages/sauvegarde";
import { imports } from "./messages/imports";
import { carte } from "./messages/carte";
import { calendrier } from "./messages/calendrier";
import { guard } from "./messages/guard";

/** Dictionnaire français = référence. Toute clé doit exister (ou être listée « à traduire ») dans wo.ts. */
export const fr = {
  "locale.label": "Langue",
  "locale.fr": "Français",
  "locale.wo": "Wolof",
  "locale.switch": "Changer de langue",

  "shell.demoBanner.short": "Mode démonstration · données fictives",
  "shell.demoBanner.long":
    "Mode démonstration : données fictives, réinitialisées au rechargement de la page.",
  "shell.openMenu": "Ouvrir le menu",
  "shell.demoData": "Données de démonstration",
  "shell.search": "Rechercher",
  "shell.searchAria": "Recherche universelle",
  "shell.accountAria": "Compte et profil de démonstration",
  "shell.demoProfile": "Profil de démo",
  "shell.logout": "Se déconnecter",
  "shell.scope.consolidated": "Vue consolidée",
  "shell.soon": "À venir",

  "modules.title": "Les cinq modules",
  "modules.intro":
    "Chaque module couvre une action de la coopérative. Les modules à venir ne sont pas encore ouverts.",
  "modules.state.available": "Disponible",
  "modules.state.soon": "À venir",
  "modules.noScreen": "Aucun écran de ce module n'est ouvert à votre rôle.",
  "modules.administratif.name": "Administratif",
  "modules.administratif.action": "Gérer",
  "modules.administratif.purpose":
    "Les personnes et la coopérative : membres, adhésions, producteurs, organisations et GIE.",
  "modules.commercial.name": "Commercial",
  "modules.commercial.action": "Échanger",
  "modules.commercial.purpose": "Stocks, ventes, crédits et trésorerie de la coopérative.",
  "modules.exploitation.name": "Exploitation",
  "modules.exploitation.action": "Mesurer",
  "modules.exploitation.purpose":
    "La rentabilité : charges, revenus, marges et exploitations en difficulté.",
  "modules.agronomique.name": "Agronomique",
  "modules.agronomique.action": "Conduire",
  "modules.agronomique.purpose":
    "Les cultures : plans d'exploitation, campagnes, calendriers et écarts entre prévu et réel.",
  "modules.sig.name": "SIG",
  "modules.sig.action": "Localiser",
  "modules.sig.purpose": "Le foncier : parcelles, superficies, carte et anomalies spatiales.",

  "common.count.un": "{count} élément",
  "common.count.autre": "{count} éléments",

  ...audit,
  ...common,
  ...charges,
  ...exploitation,
  ...stocks,
  ...credits,
  ...ventes,
  ...campagnes,
  ...calendriers,
  ...suivi,
  ...cooperatives,
  ...cotisations,
  ...reunions,
  ...documents,
  ...errors,
  ...dashboard,
  ...producteurs,
  ...qualite,
  ...cooperative,
  ...admin,
  ...auth,
  ...shellMessages,
  ...organisations,
  ...sauvegarde,
  ...imports,
  ...carte,
  ...calendrier,
  ...guard,
} as const;

export type MessageKey = keyof typeof fr;
export type Messages = { [K in MessageKey]: string };

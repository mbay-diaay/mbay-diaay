/**
 * Les cinq modules métier de la note de cadrage : ce qu'ils permettent de faire, et ce que chacun contient.
 * Le contenu (écrans, droits, « à venir ») vient du menu (`nav.ts`) : une seule liste d'écrans à maintenir.
 * Ici, seulement l'identité d'un module et la lecture de ses écrans (`NavItem.module`) pour la page d'accueil des modules.
 */
import { NAV, navAllowed, type ModuleId, type NavItem } from "@/lib/nav";
import type { Session } from "@/lib/store";
import type { MessageKey } from "@/lib/i18n";

export type { ModuleId };

export interface BusinessModule {
  id: ModuleId;
  /** Code de la note de cadrage. */
  code: "M1" | "M2" | "M3" | "M4" | "M5";
  name: MessageKey;
  /** Verbe d'action : gérer, échanger, mesurer, conduire, localiser. */
  action: MessageKey;
  purpose: MessageKey;
}

export const MODULES: readonly BusinessModule[] = [
  {
    id: "administratif",
    code: "M1",
    name: "modules.administratif.name",
    action: "modules.administratif.action",
    purpose: "modules.administratif.purpose",
  },
  {
    id: "commercial",
    code: "M2",
    name: "modules.commercial.name",
    action: "modules.commercial.action",
    purpose: "modules.commercial.purpose",
  },
  {
    id: "exploitation",
    code: "M3",
    name: "modules.exploitation.name",
    action: "modules.exploitation.action",
    purpose: "modules.exploitation.purpose",
  },
  {
    id: "agronomique",
    code: "M4",
    name: "modules.agronomique.name",
    action: "modules.agronomique.action",
    purpose: "modules.agronomique.purpose",
  },
  {
    id: "sig",
    code: "M5",
    name: "modules.sig.name",
    action: "modules.sig.action",
    purpose: "modules.sig.purpose",
  },
];

export interface ModuleSummary {
  module: BusinessModule;
  /** « disponible » dès qu'un écran du module est construit ; sinon « à venir » (non cliquable). */
  state: "disponible" | "à venir";
  /** Écrans construits que le rôle de la session peut ouvrir. */
  open: NavItem[];
  /** Écrans construits mais fermés à ce rôle : jamais affichés (pas de lien mort, pas d'indice). */
  closed: number;
  /** Écrans pas encore construits. */
  soon: NavItem[];
}

export function summarize(module: BusinessModule, session: Session): ModuleSummary {
  const items = NAV.flatMap((g) => g.items).filter((i) => i.module === module.id);
  const built = items.filter((i) => !i.soon);
  const open = built.filter((i) => navAllowed(session, i));
  return {
    module,
    state: built.length ? "disponible" : "à venir",
    open,
    closed: built.length - open.length,
    soon: items.filter((i) => i.soon),
  };
}

export const summarizeAll = (session: Session) => MODULES.map((m) => summarize(m, session));

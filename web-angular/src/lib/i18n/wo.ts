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

export const wo: Partial<Messages> = {
  ...(Object.fromEntries(Object.entries(fr).map(([k, v]) => [k, pseudo(v)])) as Messages),
  ...RELUES,
};

const ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Protège un texte avant de l'insérer dans du HTML construit à la main (par exemple l'infobulle d'une bibliothèque
 * de carte qui lit une chaîne HTML). Toute donnée venue d'un import, d'une sauvegarde ou d'une saisie passe par ici.
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ENTITIES[c]!);
}

import { escapeHtml } from "@/lib/html";

/**
 * Contenu HTML de l'infobulle d'une parcelle. La bibliothèque de carte lit une chaîne HTML : chaque donnée
 * (code, statut, nom du producteur, culture) est donc protégée, sans exception.
 */
export function plotTooltipHtml(input: {
  code: string;
  statusLabel: string;
  ownerName: string | undefined;
  crop: string;
}): string {
  const owner = input.ownerName ? escapeHtml(input.ownerName) : "";
  return `<strong>${escapeHtml(input.code)}</strong> · ${escapeHtml(input.statusLabel)}<br/>${owner} · ${escapeHtml(input.crop)}`;
}

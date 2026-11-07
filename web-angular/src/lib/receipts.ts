/** Numéro de reçu « <préfixe>-<année>-<NNNN> » : la suite continue après le plus grand numéro de l'année, jamais en comptant les lignes. */
export function makeReceipt(prefix: string, existing: string[], year: number): string {
  const re = new RegExp(`^${prefix}-${year}-(\\d+)$`);
  const max = existing.reduce((m, r) => Math.max(m, Number(re.exec(r)?.[1] ?? 0)), 0);
  return `${prefix}-${year}-${String(max + 1).padStart(4, "0")}`;
}

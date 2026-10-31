export const nf = new Intl.NumberFormat("fr-FR");
export const nf1 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });
export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

/** W3 — données personnelles masquées par défaut. */
export const maskCni = (cni: string) =>
  cni ? `${cni.slice(0, 1)}•••••••${cni.slice(-3)}` : "Non renseigné";
export const maskPhone = (phone: string) =>
  phone ? `${phone.slice(0, 2)} ••• •• ${phone.slice(-2)}` : "Non renseigné";

export const AGE_UNKNOWN = "Non renseigné";
export const ageBand = (age: number | null) =>
  age === null
    ? AGE_UNKNOWN
    : age < 25
      ? "18-24"
      : age < 35
        ? "25-34"
        : age < 50
          ? "35-49"
          : age < 65
            ? "50-64"
            : "65+";
export const AGE_BANDS = ["18-24", "25-34", "35-49", "50-64", "65+"];
/** Âge pour l'affichage : « 34 ans » ou « Âge non renseigné » (26 fiches de la base n'ont pas d'âge). */
export const fmtAge = (age: number | null) => (age === null ? "Âge non renseigné" : `${age} ans`);
/** Vrai si l'âge est connu et ne dépasse pas `max` (les âges manquants ne comptent jamais comme « jeunes »). */
export const ageAtMost = (age: number | null, max: number) => age !== null && age <= max;

/**
 * Neutralise l'injection de formules : un tableur exécute une cellule texte qui commence par = + - @
 * (ou tabulation, retour chariot). On la préfixe d'une apostrophe. Les nombres ne sont pas touchés.
 */
export function csvCell(value: string | number): string {
  const text = String(value);
  const safe = typeof value === "string" && /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function downloadCsv(name: string, rows: (string | number)[][]) {
  const csv = rows.map((r) => r.map(csvCell).join(";")).join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

/**
 * Lecture des fichiers clients, côté navigateur uniquement.
 * CSV : lecteur maison (séparateur ; , ou tabulation détecté). Excel : SheetJS,
 * chargé à la demande pour ne pas alourdir les autres écrans ni le rendu serveur.
 */
import type { RawSheet } from "./validate";

export function parseCsv(text: string): string[][] {
  const src = text.replace(/^\uFEFF/, "");
  const first = src.split(/\r?\n/, 1)[0] ?? "";
  const sep = [";", ",", "\t"]
    .map((c) => [c, first.split(c).length] as const)
    .sort((a, b) => b[1] - a[1])[0]![0];
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i]!;
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"' && !cell) quoted = true;
    else if (ch === sep) {
      row.push(cell.trim());
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(cell.trim());
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell.trim());
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c));
}

export const isCsv = (f: File) => /\.(csv|txt)$/i.test(f.name) || f.type === "text/csv";

export async function readFile(file: File): Promise<RawSheet[]> {
  if (isCsv(file)) {
    return [{ name: file.name.replace(/\.[^.]+$/, ""), rows: parseCsv(await file.text()) }];
  }
  const XLSX = await import("xlsx");
  const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });
  return wb.SheetNames.map((name) => ({
    name,
    rows: XLSX.utils
      .sheet_to_json<unknown[]>(wb.Sheets[name]!, {
        header: 1,
        raw: false,
        defval: "",
        blankrows: false,
      })
      .map((r) => r.map((c) => String(c ?? "").trim())),
  })).filter((s) => s.rows.length > 0);
}

export async function sha(file: File) {
  const buf = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  const h = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 4)}…${h.slice(-4)}`;
}

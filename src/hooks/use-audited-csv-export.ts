import { toast } from "sonner";
import { actions } from "@/lib/store";
import { downloadCsv } from "@/lib/format";

/**
 * Export CSV d'un écran : fichier, trace au journal et message, au même endroit pour tous les écrans.
 * Les en-têtes et le détail du journal restent en français (contrat des fichiers d'échange et décision du journal).
 * La coopérative est inscrite au journal quand l'export n'en concerne qu'une ; sinon l'entrée vise toute la plateforme.
 */
export function useAuditedCsvExport(opts: {
  /** Nom du fichier sans extension. */
  file: string;
  /** Objet du journal (« Ventes », « Charges »…). */
  entity: string;
  /** Vrai quand des filtres réduisent la liste : le fichier prend le suffixe « _filtre ». */
  filtered: boolean;
  /** Construit l'en-tête et les lignes au moment du clic, pas à chaque rendu. */
  build: () => { head: string[]; rows: (string | number)[][]; scoopIds: string[] };
  /** Texte du journal, par exemple « 12 ventes (CSV) ». */
  detail: (count: number) => string;
  /** Messages affichés à l'écran, déjà traduits. */
  toastTitle: string;
  toastDescription: (count: number) => string;
}) {
  return () => {
    const { head, rows, scoopIds } = opts.build();
    downloadCsv(`${opts.file}${opts.filtered ? "_filtre" : ""}.csv`, [head, ...rows]);
    const scoops = new Set(scoopIds);
    if (scoops.size === 1)
      actions.audit("Export", opts.entity, opts.detail(rows.length), [...scoops][0]!);
    else actions.audit("Export", opts.entity, opts.detail(rows.length));
    toast.success(opts.toastTitle, { description: opts.toastDescription(rows.length) });
  };
}

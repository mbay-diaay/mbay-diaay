import { Download, FileText, Lock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Pill } from "@/components/app/ui-bits";
import { Button } from "@/components/ui/button";
import { KIND_LABEL } from "@/lib/dossier-labels";
import type { DocumentMeta } from "@/lib/mock/cooperative";
import { canDownloadDocument, canReadDocument } from "@/lib/scope";
import { actions, useStore } from "@/lib/store";
import { fmtDate } from "@/lib/format";
import { useT } from "@/lib/i18n";

/**
 * Liste de pièces : une pièce sensible (CNI) que la personne n'a pas le droit de lire s'affiche verrouillée, sans nom
 * ni téléchargement. Chaque téléchargement est inscrit au journal avec l'utilisateur et la SCOOP.
 */
export function DocumentList({
  docs,
  onRemove,
}: {
  docs: DocumentMeta[];
  /** Fournie quand la personne peut retirer une pièce (brouillon de son propre dossier). */
  onRemove?: (doc: DocumentMeta) => void;
}) {
  const t = useT();
  const session = useStore((s) => s.session);
  const download = (doc: DocumentMeta) => {
    const r = actions.downloadDocument(doc.id);
    if (!r.ok) return void toast.error(r.error);
    // Démonstration : le contenu des pièces reste côté serveur ; on remet un fichier texte de repère.
    const blob = new Blob([`${t("documents.demoFile", { name: doc.name, kind: doc.kind })}\n`], {
      type: "text/plain",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${doc.name}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success(t("documents.downloaded"));
  };

  return (
    <ul className="divide-y text-sm">
      {docs.map((d) => {
        const readable = canReadDocument(session, d);
        return (
          <li key={d.id} className="flex items-center gap-3 py-2.5">
            {readable ? (
              <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            ) : (
              <Lock className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">
                {readable ? d.name : t("documents.lockedName", { kind: KIND_LABEL[d.kind] })}
              </div>
              <div className="text-xs text-muted-foreground">
                {t(readable ? "documents.meta" : "documents.metaRestricted", {
                  kind: KIND_LABEL[d.kind],
                  size: Math.max(1, Math.round(d.sizeKb)),
                  date: fmtDate(d.uploadedAt),
                })}
              </div>
            </div>
            {d.sensitive && <Pill tone="warning">{t("documents.sensitive")}</Pill>}
            {canDownloadDocument(session, d) && (
              <Button
                variant="outline"
                size="sm"
                aria-label={t("documents.download", { name: d.name })}
                onClick={() => download(d)}
              >
                <Download className="size-4" />
              </Button>
            )}
            {onRemove && (
              <Button
                variant="ghost"
                size="sm"
                aria-label={t("documents.remove")}
                onClick={() => onRemove(d)}
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

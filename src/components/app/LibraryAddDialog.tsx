import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KIND_KEY } from "@/lib/dossier-labels";
import { useI18n } from "@/lib/i18n";
import { LIBRARY_KINDS, type LibraryDocumentKind } from "@/lib/mock/cooperative";
import { actions, can, useStore } from "@/lib/store";
import { LIBRARY_MAX_KB, useFileSize } from "@/components/app/LibraryFile";

interface Picked {
  name: string;
  sizeKb: number;
  mime: string;
}

/** Dialogue d'ajout à la bibliothèque : seuls nom, taille et type du fichier sont gardés (démonstration). */
export function LibraryAddDialog({
  open,
  onOpenChange,
  scoops,
  defaultScoopId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scoops: { id: string; name: string }[];
  defaultScoopId: string;
}) {
  const { t } = useI18n();
  const size = useFileSize();
  const session = useStore((s) => s.session);
  const canSeeSensitive = can(session, "cni.read");
  const [scoopId, setScoopId] = useState(defaultScoopId);
  const [kind, setKind] = useState<LibraryDocumentKind>("statuts");
  const [file, setFile] = useState<Picked | null>(null);
  const [sensitive, setSensitive] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!open) return;
    setScoopId(defaultScoopId);
    setKind("statuts");
    setFile(null);
    setSensitive(false);
    setError(undefined);
  }, [open, defaultScoopId]);

  const submit = () => {
    if (!file) return;
    const r = actions.addLibraryDocument(scoopId, { kind, ...file, sensitive });
    if (!r.ok) return void setError(r.error);
    toast.success(t("documents.added"));
    onOpenChange(false);
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("documents.add.title")}
      description={t("documents.add.description")}
      submitLabel={t("documents.add.submit")}
      cancelLabel={t("documents.add.cancel")}
      onSubmit={submit}
      submitDisabled={!file || !!error}
    >
      {scoops.length > 1 && (
        <FormField label={t("documents.add.scoop")} required>
          {(c) => (
            <Select value={scoopId} onValueChange={setScoopId}>
              <SelectTrigger id={c.id}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {scoops.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormField>
      )}
      <FormField label={t("documents.add.kind")} required>
        {(c) => (
          <Select value={kind} onValueChange={(v) => setKind(v as LibraryDocumentKind)}>
            <SelectTrigger id={c.id}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LIBRARY_KINDS.map((k) => (
                <SelectItem key={k} value={k}>
                  {t(KIND_KEY[k])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>
      <FormField
        label={t("documents.add.file")}
        required
        hint={t("documents.add.fileHint", { mb: LIBRARY_MAX_KB / 1024 })}
        error={error}
      >
        {(c) => (
          <div className="space-y-2">
            <label
              htmlFor={c.id}
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted focus-within:ring-2 focus-within:ring-ring"
            >
              <Upload className="size-4" aria-hidden />
              {file ? t("documents.add.change") : t("documents.add.choose")}
              <input
                {...c}
                type="file"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  if (!f) return;
                  const sizeKb = Math.ceil(f.size / 1024);
                  if (sizeKb > LIBRARY_MAX_KB) {
                    setFile(null);
                    setError(
                      t("documents.add.tooBig", {
                        size: size(sizeKb),
                        mb: LIBRARY_MAX_KB / 1024,
                      }),
                    );
                    return;
                  }
                  setError(undefined);
                  setFile({ name: f.name, sizeKb, mime: f.type || "application/octet-stream" });
                }}
              />
            </label>
            {file && (
              <p className="break-words text-sm font-medium" data-testid="picked-file">
                {t("documents.add.chosen", { name: file.name, size: size(file.sizeKb) })}
              </p>
            )}
          </div>
        )}
      </FormField>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Checkbox
            id="library-sensitive"
            checked={sensitive}
            onCheckedChange={(c) => setSensitive(c === true)}
          />
          <Label htmlFor="library-sensitive" className="font-normal">
            {t("documents.add.sensitive")}
          </Label>
        </div>
        <p className="text-xs text-muted-foreground">{t("documents.add.sensitiveHint")}</p>
        {sensitive && !canSeeSensitive && (
          <p className="text-xs text-warning-fg">{t("documents.add.sensitiveWarn")}</p>
        )}
      </div>
    </FormDialog>
  );
}

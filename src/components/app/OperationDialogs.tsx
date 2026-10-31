import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { KIND_LABEL, todayIso } from "@/components/app/FollowKinds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fmtDate, nf } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import {
  OPERATION_KINDS,
  type FieldOperation,
  type OperationKind,
  type OperationPhoto,
} from "@/lib/mock/agronomy";
import { actions } from "@/lib/store";

const MAX_PHOTO_KB = 5 * 1024;

export interface OperationTarget {
  planId: string;
  lineIndex: number;
  crop: string;
  /** Étape du calendrier à marquer comme faite ; `null` pour une opération hors calendrier. */
  stepId: string | null;
  /** Type de l'étape ; `null` : la personne choisit le type. */
  kind: OperationKind | null;
}

/** Saisie de ce qui a été réellement fait : date, observation, photos (nom et taille seulement). */
export function OperationDoneDialog({
  target,
  onClose,
}: {
  target: OperationTarget;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const today = todayIso();
  const [doneAt, setDoneAt] = useState(today);
  const [kind, setKind] = useState<OperationKind>(target.kind ?? "traitement");
  const [note, setNote] = useState("");
  const [photos, setPhotos] = useState<OperationPhoto[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const future = doneAt > today;

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const kept: OperationPhoto[] = [];
    for (const f of Array.from(files)) {
      const sizeKb = Math.max(1, Math.round(f.size / 1024));
      if (sizeKb > MAX_PHOTO_KB) toast.error(t("suivi.dialog.photoTooBig", { name: f.name }));
      else kept.push({ name: f.name, sizeKb });
    }
    setPhotos((p) => [...p, ...kept]);
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = () => {
    const res = actions.recordOperation({
      planId: target.planId,
      lineIndex: target.lineIndex,
      stepId: target.stepId,
      kind: target.kind ?? kind,
      doneAt,
      note,
      photos,
    });
    if (!res.ok) return void toast.error(res.error);
    toast.success(t("suivi.dialog.saved"));
    onClose();
  };

  return (
    <FormDialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={
        target.kind
          ? t("suivi.dialog.title", { kind: t(KIND_LABEL[target.kind]) })
          : t("suivi.dialog.titleExtra")
      }
      description={t("suivi.dialog.description", { crop: target.crop })}
      submitLabel={t("suivi.dialog.submit")}
      cancelLabel={t("suivi.dialog.cancel")}
      submitDisabled={!doneAt || future}
      onSubmit={submit}
    >
      {!target.kind && (
        <FormField label={t("suivi.dialog.kind")} required>
          {(c) => (
            <Select value={kind} onValueChange={(v) => setKind(v as OperationKind)}>
              <SelectTrigger id={c.id}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {OPERATION_KINDS.map((k) => (
                  <SelectItem key={k} value={k}>
                    {t(KIND_LABEL[k])}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormField>
      )}
      <FormField
        label={t("suivi.dialog.date")}
        required
        hint={t("suivi.dialog.dateHint")}
        error={future ? t("suivi.dialog.dateFuture") : undefined}
      >
        {(c) => (
          <Input
            {...c}
            type="date"
            max={today}
            value={doneAt}
            onChange={(e) => setDoneAt(e.target.value)}
          />
        )}
      </FormField>
      <FormField label={t("suivi.dialog.note")} hint={t("suivi.dialog.noteHint")}>
        {(c) => <Textarea {...c} rows={3} value={note} onChange={(e) => setNote(e.target.value)} />}
      </FormField>
      <FormField label={t("suivi.dialog.photos")} hint={t("suivi.dialog.photosHint")}>
        {(c) => (
          <Input
            {...c}
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => addFiles(e.target.files)}
          />
        )}
      </FormField>
      {photos.length > 0 && (
        <ul aria-label={t("suivi.dialog.photosList")} className="grid gap-1.5">
          {photos.map((p, i) => (
            <li
              key={`${p.name}-${i}`}
              className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
            >
              <ImagePlus className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              <span className="min-w-0 flex-1 break-words">
                {t("suivi.photo.item", { name: p.name, size: nf.format(p.sizeKb) })}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={t("suivi.dialog.photoRemove", { name: p.name })}
                onClick={() => setPhotos((ps) => ps.filter((_, k) => k !== i))}
              >
                <X className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </FormDialog>
  );
}

/** Confirmation avant de retirer une opération saisie. */
export function OperationRemoveDialog({
  operation,
  onClose,
}: {
  operation: FieldOperation;
  onClose: () => void;
}) {
  const { t } = useI18n();
  return (
    <FormDialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={t("suivi.removeDialog.title")}
      description={t("suivi.removeDialog.description", {
        kind: t(KIND_LABEL[operation.kind]),
        date: fmtDate(operation.doneAt),
      })}
      submitLabel={t("suivi.remove")}
      cancelLabel={t("suivi.dialog.cancel")}
      destructive
      onSubmit={() => {
        const res = actions.removeOperation(operation.id);
        if (!res.ok) return void toast.error(res.error);
        toast.success(t("suivi.removeDialog.done"));
        onClose();
      }}
    />
  );
}

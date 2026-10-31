import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { Textarea } from "@/components/ui/textarea";
import { useTouched } from "@/hooks/use-touched";

/** Longueur minimale d'un motif d'annulation, la même que dans le store. */
export const MIN_REASON = 3;

/**
 * Dialogue d'annulation avec motif obligatoire : même comportement partout. Le bouton reste grisé tant que le motif
 * est trop court, l'erreur n'apparaît qu'après la première saisie, rien n'est effacé (l'action du store annule et conserve).
 * Tous les textes sont déjà traduits par l'appelant.
 */
export function ReasonDialog({
  title,
  description,
  label,
  hint,
  tooShortError,
  cancelLabel,
  submitLabel,
  doneMessage,
  doneDescription,
  extraDisabled = false,
  onSubmit,
  onClose,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  label: string;
  hint?: ReactNode;
  tooShortError: string;
  cancelLabel: string;
  submitLabel: string;
  doneMessage: string;
  /** Ligne sous le message de réussite (numéro de reçu, par exemple). */
  doneDescription?: string;
  /** Grise aussi le bouton quand le contenu ajouté n'est pas prêt (aucun élément choisi). */
  extraDisabled?: boolean;
  /** Appelle l'action du store avec le motif. */
  onSubmit: (reason: string) => { ok: true } | { ok: false; error: string };
  onClose: () => void;
  /** Contenu ajouté avant le champ du motif (choix de l'élément à annuler, par exemple). */
  children?: ReactNode;
}) {
  const [reason, setReason] = useState("");
  const { touched, touch } = useTouched();
  const tooShort = reason.trim().length < MIN_REASON;

  return (
    <FormDialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={title}
      {...(description !== undefined && { description })}
      cancelLabel={cancelLabel}
      submitLabel={submitLabel}
      submitDisabled={tooShort || extraDisabled}
      destructive
      onSubmit={() => {
        const res = onSubmit(reason);
        if (!res.ok) return void toast.error(res.error);
        toast.success(
          doneMessage,
          doneDescription !== undefined ? { description: doneDescription } : undefined,
        );
        onClose();
      }}
    >
      {children}
      <FormField
        label={label}
        hint={hint}
        error={touched && tooShort ? tooShortError : undefined}
        required
      >
        {(c) => (
          <Textarea
            {...c}
            rows={3}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              touch();
            }}
            onBlur={touch}
          />
        )}
      </FormField>
    </FormDialog>
  );
}

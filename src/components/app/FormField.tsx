import { useId, type ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { useT } from "@/lib/i18n";

export interface FieldControlProps {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
}

/**
 * Libellé visible, aide et erreur autour d'un champ. Le placeholder ne remplace jamais le libellé :
 * il montre seulement un exemple. Utiliser ce composant pour tout champ de formulaire ou de dialogue.
 */
export function FormField({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: ReactNode;
  error?: string | undefined;
  required?: boolean;
  children: (control: FieldControlProps) => ReactNode;
}) {
  const t = useT();
  const id = useId();
  const noteId = `${id}-note`;
  const note = error || hint;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="ml-1 font-normal text-muted-foreground">{t("field.required")}</span>
        )}
      </Label>
      {children({
        id,
        ...(note ? { "aria-describedby": noteId } : {}),
        ...(error ? { "aria-invalid": true as const } : {}),
      })}
      {note && (
        <p
          id={noteId}
          className={error ? "text-xs text-danger-fg" : "text-xs text-muted-foreground"}
        >
          {note}
        </p>
      )}
    </div>
  );
}

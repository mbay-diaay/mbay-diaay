import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const WIDTH = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-xl" } as const;

/**
 * Dialogue de saisie ou de décision : titre, description d'une phrase, contenu, puis
 * Annuler à gauche et l'action principale à droite (l'action principale passe en premier sur téléphone).
 * Le contenu est dans un formulaire : la touche Entrée valide quand l'action est possible.
 */
export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  submitLabel,
  onSubmit,
  submitDisabled = false,
  destructive = false,
  cancelLabel,
  secondary,
  size = "sm",
  footerNote,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Verbe d'action (« Valider », « Approuver et appliquer »), jamais « OK ». Absent : lecture seule. */
  submitLabel?: string;
  onSubmit?: () => void;
  submitDisabled?: boolean;
  destructive?: boolean;
  cancelLabel?: string;
  /** Autre décision à côté de l'action principale (ex. « Refuser »). */
  secondary?: ReactNode;
  size?: keyof typeof WIDTH;
  /** Rappel sous les boutons (ex. traçabilité). */
  footerNote?: ReactNode;
}) {
  const t = useT();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={WIDTH[size]}>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (submitLabel && !submitDisabled) onSubmit?.();
          }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description ? (
              <DialogDescription>{description}</DialogDescription>
            ) : (
              <DialogDescription className="sr-only">{title}</DialogDescription>
            )}
          </DialogHeader>
          {children}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {submitLabel ? (cancelLabel ?? t("common.cancel")) : t("common.close")}
            </Button>
            {secondary}
            {submitLabel && (
              <Button
                type="submit"
                variant={destructive ? "destructive" : "default"}
                disabled={submitDisabled}
              >
                {submitLabel}
              </Button>
            )}
          </DialogFooter>
          {footerNote && <p className={cn("text-xs text-muted-foreground")}>{footerNote}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}

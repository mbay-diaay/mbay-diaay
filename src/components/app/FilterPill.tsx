import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "warning" | "success" | "danger" | "info";

const DOT: Record<Tone, string> = {
  neutral: "bg-border-strong",
  warning: "bg-warning",
  success: "bg-success",
  danger: "bg-danger",
  info: "bg-info",
};

/**
 * Pastille ronde de filtre : un clic filtre, un second clic retire le filtre.
 * L'état actif ne repose pas sur la couleur seule (coche, fond plein, bordure).
 */
export function FilterPill({
  active,
  onClick,
  count,
  tone,
  icon,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  count?: number | undefined;
  /** Point de couleur devant le libellé (statut) ; la couleur ne porte jamais seule le sens. */
  tone?: Tone | undefined;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-xs font-medium leading-none transition-colors pointer-coarse:h-touch",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "bg-card text-foreground hover:border-border-strong hover:bg-muted",
        className,
      )}
    >
      {icon ? (
        <span className="inline-flex size-3.5 shrink-0 items-center justify-center [&_svg]:size-3.5" aria-hidden>
          {icon}
        </span>
      ) : null}
      {tone && !active && !icon && (
        <span className={cn("size-1.5 shrink-0 rounded-full", DOT[tone])} aria-hidden />
      )}
      <span className="inline-flex items-center leading-none">{children}</span>
      {count !== undefined && (
        <span
          className={cn(
            "inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-center text-[11px] font-semibold leading-none tabular",
            active ? "bg-primary-foreground text-primary" : "bg-muted text-foreground",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

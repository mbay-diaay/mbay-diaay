import type { ReactNode } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

export interface SegmentedOption<T extends string> {
  value: T;
  label: ReactNode;
  /** Libellé lu par les lecteurs d'écran quand `label` est abrégé ou purement visuel. */
  ariaLabel?: string;
  disabled?: boolean;
}

/**
 * Interrupteur à choix exclusifs (Plan / Satellite, Liste / Calendrier, FR / WO).
 * Visuellement distinct des FilterPill (pastilles vertes) : piste muted + pastille sélectionnée
 * en surface claire, formes arrondies assorties (pas de « carré dans un rond »).
 * Un seul choix actif en permanence : cliquer le choix actif ne le désactive pas.
 * Clavier : flèches pour passer d'un choix à l'autre, Tab pour sortir.
 */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  size = "md",
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: readonly SegmentedOption<T>[];
  /** Nom du groupe, lu par les lecteurs d'écran (ex. « Fond de carte »). */
  ariaLabel: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(v) => v && onChange(v as T)}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex max-w-full shrink-0 overflow-x-auto rounded-full border border-border bg-muted p-0.5",
        className,
      )}
    >
      {options.map((o) => (
        <ToggleGroup.Item
          key={o.value}
          value={o.value}
          disabled={o.disabled}
          aria-label={o.ariaLabel}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            "disabled:pointer-events-none disabled:opacity-50",
            "data-[state=on]:bg-card data-[state=on]:text-foreground data-[state=on]:shadow-sm",
            "data-[state=off]:text-muted-foreground data-[state=off]:hover:text-foreground",
            size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-xs",
            "pointer-coarse:min-h-touch pointer-coarse:px-3.5 pointer-coarse:text-sm",
          )}
        >
          {o.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}

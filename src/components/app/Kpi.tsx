import type { ReactNode } from "react";
import { useFormat } from "@/hooks/use-format";
import { cn } from "@/lib/utils";

/** Colonnes de la grille de tuiles : 2 sur téléphone, puis le nombre voulu à partir de `lg` ou de `xl`. */
const COLS = {
  lg: { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" },
  xl: { 3: "xl:grid-cols-3", 4: "xl:grid-cols-4", 5: "xl:grid-cols-5", 6: "xl:grid-cols-6" },
} as const;

/** Rangée de tuiles d'indicateurs : même grille partout, tuiles de même hauteur. */
export function KpiGrid({
  cols,
  from = "lg",
  children,
  className,
}: {
  cols: 3 | 4 | 5 | 6;
  /** Largeur d'écran à partir de laquelle la grille passe à `cols` colonnes (jusque-là : 2). */
  from?: "lg" | "xl";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 grid grid-cols-2 gap-3", COLS[from][cols], className)}>{children}</div>
  );
}

const LG_SPAN = { 1: "", 2: "lg:col-span-2", 3: "lg:col-span-3" } as const;

/**
 * Enveloppe d'une tuile dans la grille : largeur occupée et hauteur égale à celle des voisines.
 * `span` : colonnes occupées à partir de `lg`. `mobile` : « full » = toute la largeur sur téléphone (par défaut pour
 * une tuile large), « half » = une colonne sur deux.
 */
export function KpiCell({
  span = 1,
  mobile = span > 1 ? "full" : "half",
  children,
}: {
  span?: keyof typeof LG_SPAN;
  mobile?: "full" | "half";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "[&>div]:h-full",
        mobile === "full" && "col-span-2",
        LG_SPAN[span] || (mobile === "full" ? "lg:col-span-1" : ""),
      )}
    >
      {children}
    </div>
  );
}

/**
 * Montant en FCFA. En tuile (`kpi`) : le chiffre grand et insécable, l'unité plus petite à côté, qui peut passer
 * à la ligne sans couper le chiffre. En ligne (`inline`) : « 264 000 FCFA » d'un seul bloc.
 */
export function Money({ amount, size = "inline" }: { amount: number; size?: "kpi" | "inline" }) {
  const f = useFormat();
  if (size === "inline")
    return <span className="whitespace-nowrap tabular">{f.money(amount)}</span>;
  return (
    <span>
      <span className="whitespace-nowrap text-xl sm:text-2xl">{f.amount(amount)}</span>{" "}
      <span className="text-xs font-medium text-muted-foreground sm:text-sm">{f.currency}</span>
    </span>
  );
}

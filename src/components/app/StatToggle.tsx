import type { LucideIcon } from "lucide-react";
import { nf } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface StatOption<K extends string> {
  key: K;
  label: string;
  value: number;
  hint?: string;
  icon: LucideIcon;
  tone?: "brand" | "warning" | "success" | "info";
}

const ICON_TONE = {
  brand: "bg-primary-soft text-primary",
  warning: "bg-warning-bg text-warning-fg",
  success: "bg-success-bg text-success-fg",
  info: "bg-info-bg text-info-fg",
};

/** Cartes-indicateurs qui servent d'onglets : on voit le volume de chaque vue avant d'y entrer. */
export function StatToggle<K extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: StatOption<K>[];
  value: K;
  onChange: (k: K) => void;
  label: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "mb-4 grid gap-3",
        options.length === 2
          ? "sm:grid-cols-2"
          : options.length === 4
            ? "sm:grid-cols-2 xl:grid-cols-4"
            : "sm:grid-cols-3",
      )}
    >
      {options.map((o) => {
        const on = o.key === value;
        return (
          <button
            key={o.key}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o.key)}
            className={cn(
              "surface flex items-start gap-3 p-4 text-left transition-colors",
              on ? "border-primary ring-2 ring-primary/25" : "hover:border-border-strong",
            )}
          >
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-md",
                ICON_TONE[o.tone ?? "brand"],
              )}
            >
              <o.icon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-2xl font-semibold leading-tight tabular">
                {nf.format(o.value)}
              </span>
              <span className={cn("block text-sm font-medium", on && "text-primary")}>
                {o.label}
              </span>
              {o.hint && (
                <span className="mt-0.5 block text-xs text-muted-foreground">{o.hint}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

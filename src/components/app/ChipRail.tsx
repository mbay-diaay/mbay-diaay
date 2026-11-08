import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Rangée de pastilles : scroll horizontal sur petit écran (évite le wrap
 * orphelin), wrap dès `md`.
 */
export function ChipRail({
  children,
  className,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("relative min-w-0", className)}
    >
      <div className="-mx-1 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [scrollbar-width:thin] snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0">
        {children}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 end-0 w-7 bg-gradient-to-l from-card to-transparent md:hidden"
      />
    </div>
  );
}

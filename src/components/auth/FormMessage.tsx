import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Message de formulaire annoncé aux lecteurs d'écran : erreur (rouge) ou information (bleu). */
export function FormMessage({
  tone = "error",
  children,
  className,
}: {
  tone?: "error" | "info";
  children: ReactNode;
  className?: string;
}) {
  if (!children) return null;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-md px-3 py-2.5 text-sm",
        tone === "error" ? "bg-danger-bg text-danger-fg" : "bg-info-bg text-info-fg",
        className,
      )}
    >
      {children}
    </div>
  );
}

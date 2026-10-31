import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { can, useStore } from "@/lib/store";
import type { Permission } from "@/lib/permissions";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export interface SectionItem {
  key: string;
  label: string;
  icon?: LucideIcon;
  /** Lien de section (route) — ou `onSelect` pour une section pilotée par l'état local / l'URL de la page. */
  to?: string;
  search?: Record<string, unknown>;
  perm?: Permission;
  count?: number;
  /** Ton du compteur : « à traiter » (avertissement) ou neutre. */
  countTone?: "warning" | "neutral";
}

/** Menu à plat horizontal : les sections d'un espace de travail, avec leur volume à traiter. */
export function SectionNav({
  items,
  active,
  onSelect,
  className,
}: {
  items: SectionItem[];
  active?: string;
  onSelect?: (key: string) => void;
  className?: string;
}) {
  const t = useT();
  const session = useStore((s) => s.session);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const visible = items.filter((i) => !i.perm || can(session, i.perm));
  const scrollerRef = useRef<HTMLElement>(null);
  const [overflow, setOverflow] = useState({ left: false, right: false });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setOverflow({
        left: el.scrollLeft > 2,
        right: max > 2 && el.scrollLeft < max - 2,
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [visible.length]);

  return (
    <div className={cn("relative mb-6 min-w-0", className)}>
      {overflow.left && (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-card to-transparent"
          aria-hidden
        />
      )}
      {overflow.right && (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-card to-transparent"
          aria-hidden
        />
      )}
      <nav
        ref={scrollerRef}
        className="max-w-full overflow-x-auto overscroll-x-contain border-b [scrollbar-gutter:stable] [scrollbar-width:thin]"
        aria-label={t("shell.sections")}
      >
        <ul className="flex w-max min-w-full gap-0.5 sm:gap-1">
          {visible.map((i) => {
            const on = active ? active === i.key : !!i.to && path.startsWith(i.to);
            const cls = cn(
              "-mb-px flex shrink-0 items-center gap-1.5 border-b-2 px-2.5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors sm:gap-2 sm:px-3",
              on
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground",
            );
            const body = (
              <>
                {i.icon && <i.icon className={cn("size-4", on && "text-primary")} />}
                {i.label}
                {i.count !== undefined && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-xs font-semibold tabular",
                      i.count > 0 && i.countTone !== "neutral"
                        ? "bg-warning-bg text-warning-fg"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {i.count}
                  </span>
                )}
              </>
            );
            return (
              <li key={i.key}>
                {i.to && !onSelect ? (
                  <Link
                    to={i.to}
                    search={i.search as never}
                    className={cls}
                    aria-current={on ? "page" : undefined}
                  >
                    {body}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelect?.(i.key)}
                    className={cls}
                    aria-current={on ? "page" : undefined}
                  >
                    {body}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

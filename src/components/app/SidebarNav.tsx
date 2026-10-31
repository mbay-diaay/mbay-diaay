import { useEffect, useId, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { NAV, navAllowed, type NavGroup, type NavItem } from "@/lib/nav";
import type { Session } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "mbd.nav";

/** Mémorise seulement quels groupes sont ouverts : aucune donnée personnelle. */
function readOpen(): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).filter(([, v]) => typeof v === "boolean"),
    ) as Record<string, boolean>;
  } catch {
    return {};
  }
}
function writeOpen(value: Record<string, boolean>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* stockage indisponible : le menu fonctionne, sans mémoire */
  }
}

const isActive = (item: NavItem, path: string) =>
  item.to === "/" ? path === "/" : path === item.to || path.startsWith(`${item.to}/`);

/**
 * Menu latéral en sections repliables. L'état ouvert ou fermé est mémorisé ; la section de la page courante
 * s'ouvre toujours ; une section repliée affiche le total de ses éléments à traiter.
 */
export function SidebarNav({
  session,
  path,
  badge,
}: {
  session: Session;
  path: string;
  /** Nombre d'éléments à traiter d'une entrée (0 : rien à afficher). */
  badge: (to: string) => number;
}) {
  const t = useT();
  const uid = useId();
  const [stored, setStored] = useState<Record<string, boolean>>({});
  useEffect(() => setStored(readOpen()), []);

  const toggle = (g: NavGroup, current: boolean) => {
    const next = { ...stored, [g.group]: !current };
    setStored(next);
    writeOpen(next);
  };

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain px-3 pb-4">
      {NAV.map((g, index) => {
        // Dépôt M1 : les entrées « à venir » (M2–M5) restent sur la page modules, pas dans le menu.
        const items = g.items.filter((i) => !i.soon && navAllowed(session, i));
        if (!items.length) return null;
        const hasActive = items.some((i) => isActive(i, path));
        const open = g.flat || hasActive || (stored[g.group] ?? g.defaultOpen);
        const pending = items.reduce((sum, i) => sum + badge(i.to), 0);
        const listId = `${uid}-${index}`;
        return (
          <div key={g.group} className="mt-3">
            {!g.flat && (
              <button
                type="button"
                aria-expanded={open}
                aria-controls={listId}
                disabled={hasActive}
                onClick={() => toggle(g, open)}
                className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[11px] font-semibold uppercase tracking-wider hover:bg-sidebar-accent disabled:cursor-default disabled:hover:bg-transparent pointer-coarse:py-2.5"
              >
                <span className="flex-1 opacity-80 group-hover:opacity-100">{t(g.groupKey)}</span>
                {!open && pending > 0 && (
                  <span className="rounded-full bg-sidebar-primary px-1.5 text-[11px] font-semibold normal-case text-sidebar-primary-foreground tabular">
                    {pending}
                  </span>
                )}
                <ChevronDown
                  className={cn("size-3.5 opacity-80 transition-transform", !open && "-rotate-90")}
                  aria-hidden
                />
              </button>
            )}
            <div id={listId} hidden={!open}>
              {items.map((i) => {
                const active = isActive(i, path);
                const n = badge(i.to);
                return (
                  <Link
                    key={i.to}
                    to={i.to}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors pointer-coarse:py-3",
                      active
                        ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <i.icon className={cn("size-4", active && "text-sidebar-primary")} />
                    <span className="flex-1">{t(i.labelKey)}</span>
                    {n > 0 && (
                      <span className="rounded-full bg-sidebar-primary px-1.5 text-[11px] font-semibold text-sidebar-primary-foreground tabular">
                        {n}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

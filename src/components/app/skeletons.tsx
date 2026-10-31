import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSafeT } from "@/lib/i18n/safe";

/** Enveloppe commune : annonce l'attente aux lecteurs d'écran sans répéter de texte visible. */
function Busy({ children, className }: { children: React.ReactNode; className?: string }) {
  const t = useSafeT();
  return (
    <div role="status" aria-busy="true" aria-live="polite" className={className}>
      <span className="sr-only">{t("shell.loading")}</span>
      {children}
    </div>
  );
}

/** Titre de page + description — mêmes proportions qu'un PageHeader réel. */
function HeaderSkeleton() {
  return (
    <div className="mb-6 space-y-2">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-64 max-w-[70%]" />
      <Skeleton className="h-4 w-full max-w-xl" />
    </div>
  );
}

/** Rangée de pastilles / filtres sous l'en-tête. */
function ToolbarSkeleton() {
  return (
    <div className="surface mb-3 flex flex-wrap items-center gap-2 p-3" aria-hidden>
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <Skeleton className="h-8 w-16 rounded-full" />
      <Skeleton className="h-8 w-20 rounded-full" />
      <Skeleton className="h-8 w-24 rounded-full" />
      <Skeleton className="h-8 w-28 rounded-full" />
      <Skeleton className="ml-auto h-9 w-full max-w-xs sm:w-64" />
    </div>
  );
}

/** Lignes d'une liste ou d'un tableau — largeurs fixes (pas de fractions flottantes). */
export function ListSkeleton({ rows = 6, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("surface divide-y overflow-hidden", className)} aria-hidden>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3.5">
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-40 max-w-full" />
            <Skeleton className="h-3 w-56 max-w-full" />
          </div>
          <Skeleton className="hidden h-4 w-24 sm:block" />
          <Skeleton className="h-6 w-16 shrink-0 rounded-full" />
        </div>
      ))}
    </div>
  );
}

/**
 * Contenu de page en attente : en-tête, KPI, barre de filtres, liste.
 * Remplit la zone principale (pas un bloc orphelin centré).
 */
export function PageSkeleton({ kpis = 4, rows = 6 }: { kpis?: number; rows?: number }) {
  return (
    <Busy className="w-full min-w-0">
      <div aria-hidden className="w-full">
        <HeaderSkeleton />
        <div
          className={cn(
            "mb-6 grid gap-3",
            kpis <= 2 ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4",
          )}
        >
          {Array.from({ length: kpis }, (_, i) => (
            <div key={i} className="surface space-y-3 p-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-3 w-28" />
            </div>
          ))}
        </div>
        <ToolbarSkeleton />
      </div>
      <ListSkeleton rows={rows} />
    </Busy>
  );
}

/** Zone de carte en attente (Leaflet se charge à la demande). */
export function MapSkeleton() {
  return (
    <Busy className="h-full min-h-64 w-full">
      <Skeleton className="h-full min-h-64 w-full rounded-none" />
    </Busy>
  );
}

/**
 * Première image / transition de route : même structure que AppShell
 * (sidebar + barre du haut + zone contenu max 1400px).
 */
export function ShellSkeleton() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside
        className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block"
        aria-hidden
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <Skeleton className="size-9 bg-sidebar-accent" />
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-24 bg-sidebar-accent" />
            <Skeleton className="h-3 w-32 bg-sidebar-accent" />
          </div>
        </div>
        <div className="space-y-3 px-5 pt-6">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} className="h-4 w-full bg-sidebar-accent" />
          ))}
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-14 border-b bg-card md:h-16" aria-hidden>
          <div className="flex h-full items-center justify-between px-4 md:px-8">
            <Skeleton className="h-4 w-40" />
            <div className="flex items-center gap-2">
              <Skeleton className="hidden h-8 w-24 rounded-full sm:block" />
              <Skeleton className="size-9 rounded-full" />
            </div>
          </div>
        </div>
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 md:px-8 md:py-8">
          <PageSkeleton />
        </main>
      </div>
    </div>
  );
}

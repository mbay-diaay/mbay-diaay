import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu, Search, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { actions, can, useStore, type Session, useScoops } from "@/lib/store";
import { ROLE_LABEL, type Permission, type RoleId } from "@/lib/permissions";
import { cn } from "@/lib/utils";
import { Forbidden } from "./ui-bits";
import { useQualityCounts } from "@/lib/quality-nav";
import { scoopNamesOf } from "@/lib/scope";
import { BRAND } from "@/config/brand";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalFilters } from "./GlobalFilters";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { FILTERED_PATHS } from "@/lib/nav";
import { CommandPalette } from "./CommandPalette";
import { ShellSkeleton } from "./skeletons";
import { SidebarNav } from "./SidebarNav";
import { DEMO_MODE } from "@/lib/auth/config";
import { useI18n } from "@/lib/i18n";

export function AppShell({
  children,
  perm,
  area,
}: {
  children: ReactNode;
  /** Un droit, ou une liste dont un seul suffit (page ouverte à plusieurs rôles : technicien ou instructeur). */
  perm: Permission | Permission[];
  area: string;
}) {
  const allScoops = useScoops();
  const session = useStore((s) => s.session);
  const quality = useQualityCounts();
  const { t, tEnum } = useI18n();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [modKey, setModKey] = useState("Ctrl");
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!getSessionLoaded()) actions.restoreSession();
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready && !session) navigate({ to: "/login", search: { motdepasse: undefined } });
  }, [ready, session, navigate]);
  useEffect(() => {
    if (!session) return;
    const timer = setInterval(() => {
      if (Date.now() > session.expiresAt) {
        actions.logout();
        toast.warning(t("shell.sessionExpired.title"), {
          description: t("shell.sessionExpired.body"),
        });
      }
    }, 15000);
    return () => clearInterval(timer);
  }, [session, t]);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setModKey("⌘");
  }, []);

  if (!ready || !session) return <ShellSkeleton />;
  const allowed = (Array.isArray(perm) ? perm : [perm]).some((p) =>
    session.permissions.includes(p),
  );
  const scopeLabel =
    session.scope.kind === "consolidé"
      ? t("shell.scope.consolidated")
      : scoopNamesOf(session, allScoops);
  // Badge de l'espace Qualité : uniquement les files que la session peut traiter.
  const badge = (to: string) =>
    to === "/qualite"
      ? (can(session, "quality.review") ? quality.doublons : 0) +
        (can(session, "alert.manage") ? quality.alertes : 0) +
        (can(session, "correction.manage") ? quality.corrections : 0)
      : 0;

  const sidebar = (
    <nav className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="grid size-9 place-items-center rounded-md bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
          {BRAND.monogram}
        </div>
        <div className="leading-tight">
          <div className="font-semibold text-sidebar-accent-foreground">{BRAND.name}</div>
          <div className="text-xs opacity-70">{BRAND.tagline}</div>
        </div>
      </div>
      <SidebarNav session={session} path={path} badge={badge} />
      <div className="border-t border-sidebar-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-xs opacity-70">
        {BRAND.partners}
      </div>
    </nav>
  );
  const filtered = FILTERED_PATHS.includes(path);
  const initials = session.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">{sidebar}</aside>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-72 max-w-[85vw] border-sidebar-border bg-sidebar p-0 text-sidebar-foreground sm:max-w-72 [&>button]:text-sidebar-foreground"
        >
          <SheetTitle className="sr-only">{t("shell.nav")}</SheetTitle>
          {sidebar}
        </SheetContent>
      </Sheet>
      <div className="flex min-w-0 flex-1 flex-col">
        {DEMO_MODE && (
          <div className="bg-warning-bg px-4 py-1.5 text-center text-xs font-medium text-warning-fg md:px-8">
            <span className="sm:hidden">{t("shell.demoBanner.short")}</span>
            <span className="hidden sm:inline">{t("shell.demoBanner.long")}</span>
          </div>
        )}
        <header className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur">
          <div className="flex h-14 items-center gap-2 px-2 sm:gap-3 sm:px-4 md:h-16 md:px-8">
            <button
              className="grid size-10 place-items-center rounded-md hover:bg-muted pointer-coarse:size-touch lg:hidden"
              onClick={() => setOpen(true)}
              aria-label={t("shell.openMenu")}
            >
              <Menu className="size-5" />
            </button>
            <div className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{scopeLabel}</span>
              <span className="hidden sm:inline"> · {t("shell.demoData")}</span>
            </div>
            {filtered && (
              <div className="hidden xl:block">
                <GlobalFilters />
              </div>
            )}
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <button
              onClick={() => setPaletteOpen(true)}
              className="grid size-10 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground pointer-coarse:size-touch sm:flex sm:h-9 sm:w-auto sm:items-center sm:gap-2 sm:border sm:bg-background sm:pl-3 sm:pr-1.5 sm:text-sm pointer-coarse:sm:h-touch"
            >
              <Search className="size-4" />
              <span className="sr-only sm:not-sr-only">{t("shell.searchAria")}</span>
              <kbd className="hidden rounded border bg-muted px-1.5 py-0.5 text-[11px] sm:inline">
                {modKey} K
              </kbd>
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex shrink-0 items-center gap-2 rounded-md p-1 text-left hover:bg-muted md:px-2">
                <span className="sr-only">{t("shell.accountAria")}</span>
                <span className="grid size-8 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary pointer-coarse:size-10 md:hidden">
                  {initials}
                </span>
                <span className="hidden leading-tight md:block">
                  <span className="block text-sm font-semibold">{session.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {tEnum("role", session.role)}
                  </span>
                </span>
                <ChevronDown className="hidden size-4 text-muted-foreground md:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel className="font-normal">
                  <div className="font-semibold">{session.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {tEnum("role", session.role)} · {scopeLabel}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {DEMO_MODE && (
                  <>
                    <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                      {t("shell.demoProfile")}
                    </DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={session.role}
                      onValueChange={(v) => actions.switchRole(v as RoleId)}
                    >
                      {(Object.keys(ROLE_LABEL) as RoleId[]).map((r) => (
                        <DropdownMenuRadioItem key={r} value={r}>
                          {tEnum("role", r)}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                  </>
                )}
                <div className="px-2 py-1.5 sm:hidden">
                  <LanguageSwitcher />
                </div>
                <DropdownMenuSeparator className="sm:hidden" />
                <DropdownMenuItem onSelect={() => actions.logout()}>
                  <LogOut /> {t("shell.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {filtered && (
            <div className="border-t px-3 py-2 sm:px-4 md:px-8 xl:hidden">
              <GlobalFilters />
            </div>
          )}
        </header>
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 md:px-8 md:py-8">
          {allowed ? children : <Forbidden what={area} />}
        </main>
      </div>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}

let loaded = false;
function getSessionLoaded() {
  const v = loaded;
  loaded = true;
  return v;
}

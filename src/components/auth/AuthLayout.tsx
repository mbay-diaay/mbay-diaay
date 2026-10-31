import type { ReactNode } from "react";
import { BRAND } from "@/config/brand";
import { nf } from "@/lib/format";
import { useStore, useScoops } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/app/LanguageSwitcher";

/** Gabarit commun des pages d'accès : panneau de marque (grands écrans) et colonne de formulaire. */
export function AuthLayout({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const allScoops = useScoops();
  const t = useT();
  const producers = useStore((s) => s.producers.filter((p) => !p.mergedInto).length);
  const plots = useStore((s) => s.plots.length);
  const stats: [string, string][] = [
    [nf.format(allScoops.length), t("auth.layout.stat.scoop")],
    [nf.format(plots), t("auth.layout.stat.plots")],
    [nf.format(producers), t("auth.layout.stat.producers")],
  ];
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden overflow-hidden bg-sidebar p-12 text-sidebar-foreground lg:flex lg:flex-col">
        <div className="bg-dots absolute inset-0 opacity-40" aria-hidden />
        <div className="relative flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-md bg-sidebar-primary font-bold text-sidebar-primary-foreground">
            {BRAND.monogram}
          </div>
          <span className="text-lg font-semibold text-sidebar-accent-foreground">{BRAND.name}</span>
        </div>
        <div className="relative mt-auto max-w-md">
          <p className="text-[40px] font-semibold leading-[1.1] text-sidebar-accent-foreground">
            {t("auth.layout.headline")}
          </p>
          <p className="mt-4 opacity-75">{t("auth.layout.lead")}</p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-sidebar-border pt-6">
            {stats.map(([n, l]) => (
              <div key={l}>
                <dt className="text-2xl font-semibold text-sidebar-accent-foreground tabular">
                  {n}
                </dt>
                <dd className="text-xs opacity-70">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <main className="flex items-start justify-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8 sm:items-center sm:p-6">
        <div className="w-full max-w-sm">
          <div className="mb-4 flex justify-end">
            <LanguageSwitcher />
          </div>
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="grid size-10 place-items-center rounded-md bg-primary font-bold text-primary-foreground">
              {BRAND.monogram}
            </div>
            <div className="leading-tight">
              <div className="font-semibold">{BRAND.name}</div>
              <div className="text-xs text-muted-foreground">{BRAND.tagline}</div>
            </div>
          </div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {description && <div className="mt-1 text-muted-foreground">{description}</div>}
          <div className="mt-6">{children}</div>
          {footer && <div className="mt-8 text-xs text-muted-foreground">{footer}</div>}
        </div>
      </main>
    </div>
  );
}

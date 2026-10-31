import { Link } from "@tanstack/react-router";
import { Pill } from "@/components/app/ui-bits";
import { useStore } from "@/lib/store";
import { summarizeAll, type ModuleSummary } from "@/lib/modules";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Page d'accueil des modules : cinq cartes, disponible ou à venir. Un module à venir n'est pas cliquable. */
export function ModuleCards() {
  const t = useT();
  const session = useStore((s) => s.session);
  if (!session) return null;
  return (
    <section aria-labelledby="modules-title" className="mt-6">
      <h2 id="modules-title" className="font-semibold">
        {t("modules.title")}
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{t("modules.intro")}</p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {summarizeAll(session).map((m) => (
          <li key={m.module.id}>
            <Card summary={m} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Card({ summary }: { summary: ModuleSummary }) {
  const t = useT();
  const { module, state, open, closed, soon } = summary;
  const available = state === "disponible";
  return (
    <article
      aria-label={`${module.code} ${t(module.name)}`}
      className={cn(
        "surface flex h-full flex-col p-4",
        !available && "border-dashed bg-muted/40 text-muted-foreground",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="rounded bg-primary-soft px-1.5 py-0.5 text-xs font-semibold text-primary">
          {module.code}
        </span>
        <Pill tone={available ? "success" : "neutral"}>
          {available ? t("modules.state.available") : t("modules.state.soon")}
        </Pill>
      </div>
      <h3 className={cn("mt-3 font-semibold", available && "text-foreground")}>
        {t(module.name)}
        <span className="ml-2 text-sm font-normal text-muted-foreground">{t(module.action)}</span>
      </h3>
      <p className="mt-1 text-sm">{t(module.purpose)}</p>
      <ul className="mt-3 space-y-1 text-sm">
        {open.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              className="inline-flex items-center gap-2 font-medium text-primary hover:underline pointer-coarse:py-2"
            >
              <i.icon className="size-4" aria-hidden />
              {t(i.labelKey)}
            </Link>
          </li>
        ))}
        {soon.map((i) => (
          <li key={i.label} className="flex items-start gap-2 text-muted-foreground">
            <i.icon className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span className="min-w-0 flex-1">{t(i.labelKey)}</span>
            {/* Dans une carte déjà « à venir », l'étiquette de chaque ligne répéterait l'information. */}
            {available && (
              <span className="shrink-0 whitespace-nowrap rounded-full border px-1.5 text-[11px]">
                {t("modules.state.soon")}
              </span>
            )}
          </li>
        ))}
      </ul>
      {available && open.length === 0 && closed > 0 && (
        <p className="mt-auto pt-3 text-xs">{t("modules.noScreen")}</p>
      )}
    </article>
  );
}

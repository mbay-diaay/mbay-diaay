import { Pill } from "@/components/app/ui-bits";
import { DOSSIER_HELP, DOSSIER_LABEL, DOSSIER_TONE } from "@/lib/dossier-labels";
import { useI18n } from "@/lib/i18n";
import type { DossierStatus } from "@/lib/mock/cooperative";

export function DossierPill({ status }: { status: DossierStatus }) {
  const { t } = useI18n();
  return <Pill tone={DOSSIER_TONE[status]}>{t(DOSSIER_LABEL[status])}</Pill>;
}

/** Ce que veut dire l'état, en une phrase simple. */
export function DossierHelp({ status, className }: { status: DossierStatus; className?: string }) {
  const { t } = useI18n();
  return (
    <p className={className ?? "text-xs leading-snug text-muted-foreground"}>
      {t(DOSSIER_HELP[status])}
    </p>
  );
}

import { useT } from "@/lib/i18n";
import type { ReactNode } from "react";
import { ShieldAlert, type LucideIcon } from "lucide-react";

import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type {
  AlertStatus,
  CaseStatus,
  CorrectionStatus,
  PlotStatus,
  Quality,
} from "@/lib/mock/data";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <div className="eyebrow mb-1">{eyebrow}</div>}
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "brand" | "ochre";
const TONE: Record<Tone, string> = {
  success: "bg-success-bg text-success-fg",
  warning: "bg-warning-bg text-warning-fg",
  danger: "bg-danger-bg text-danger-fg",
  info: "bg-info-bg text-info-fg",
  neutral: "bg-muted text-muted-foreground border border-border",
  brand: "bg-primary-soft text-primary",
  ochre: "bg-ochre-soft text-ochre-text",
};
const DOT: Record<Tone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-border-strong",
  brand: "bg-primary",
  ochre: "bg-ochre",
};

/** Pastille : la couleur n'est jamais seule (point ou icône + libellé). */
export function Pill({
  tone,
  children,
  className,
  icon: Icon,
}: {
  tone: Tone;
  children: ReactNode;
  className?: string;
  icon?: LucideIcon;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 max-w-full whitespace-normal sm:whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
        TONE[tone],
        className,
      )}
    >
      {Icon ? (
        <Icon className="size-3.5 shrink-0" aria-hidden strokeWidth={2.25} />
      ) : (
        <span className={cn("size-1.5 shrink-0 rounded-full", DOT[tone])} aria-hidden />
      )}
      {children}
    </span>
  );
}

/**
 * Marqueur de statut lisible (liste, fiche, panneau) : pastille d'icône + libellé.
 * Pas de dégradé ni de barre latérale épaisse — contraste via fond teinté + icône.
 */
export function StatusMark({
  tone,
  label,
  icon: Icon,
  className,
}: {
  tone: Tone;
  label: ReactNode;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn("grid size-8 shrink-0 place-items-center rounded-md", TONE[tone])}
        aria-hidden
      >
        <Icon className="size-4" strokeWidth={2.25} />
      </span>
      <span className="text-sm font-semibold leading-tight">{label}</span>
    </span>
  );
}

const Q_TONE: Record<Quality, Tone> = {
  validé: "success",
  "à vérifier": "warning",
  doublon: "info",
  invalide: "danger",
};
export const QualityPill = ({ q }: { q: Quality }) => <Pill tone={Q_TONE[q]}>{q}</Pill>;

const P_TONE: Record<PlotStatus, Tone> = {
  validée: "brand",
  relevée: "ochre",
  "à reprendre": "danger",
  chevauchement: "info",
};
export const PlotPill = ({ s }: { s: PlotStatus }) => <Pill tone={P_TONE[s]}>{s}</Pill>;

const C_TONE: Record<CaseStatus, Tone> = {
  "à examiner": "warning",
  confirmé: "danger",
  probable: "ochre",
  "non-doublon": "success",
  "erreur de saisie d'identité": "info",
  "non résolu": "neutral",
  fusionné: "brand",
};
export const CasePill = ({ s }: { s: CaseStatus }) => <Pill tone={C_TONE[s]}>{s}</Pill>;

const A_TONE: Record<AlertStatus, Tone> = {
  ouvert: "warning",
  "en vérification": "info",
  résolu: "success",
  rejeté: "neutral",
};
export const AlertPill = ({ s }: { s: AlertStatus }) => <Pill tone={A_TONE[s]}>{s}</Pill>;

const COR_TONE: Record<CorrectionStatus, Tone> = {
  "en attente": "warning",
  approuvée: "success",
  refusée: "danger",
};
export const CorrectionPill = ({ s }: { s: CorrectionStatus }) => (
  <Pill tone={COR_TONE[s]}>{s}</Pill>
);

export function Forbidden({ what }: { what: string }) {
  const t = useT();
  return (
    <div className="surface mx-auto mt-16 max-w-lg p-8 text-center">
      <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-warning-bg text-warning-fg">
        <ShieldAlert className="size-6" />
      </div>
      <h2 className="text-lg font-semibold">{t("shell.forbidden.title")}</h2>
      <p className="mt-2 text-muted-foreground">{t("shell.forbidden.body", { what })}</p>
      <Link
        to="/"
        className="mt-6 inline-block font-semibold text-primary underline-offset-4 hover:underline"
      >
        {t("shell.forbidden.back")}
      </Link>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium">{children}</dd>
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="px-4 py-10 text-center text-muted-foreground">{children}</div>;
}

/** État vide explicite : ce qu'on voit, pourquoi, et quoi faire ensuite. */
export function EmptyState({
  icon: Icon,
  title,
  children,
  action,
}: {
  icon: LucideIcon;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div className="bg-dots mb-4 grid size-16 place-items-center rounded-full border border-dashed text-primary">
        <Icon className="size-7" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      {children && <p className="mt-1 max-w-md text-sm text-muted-foreground">{children}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/** Indicateur chiffré, avec une ligne d'accompagnement facultative (qualité, part, unité). */
export function KpiTile({
  label,
  value,
  sub,
  tone = "neutral",
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: "neutral" | "warning" | "danger";
}) {
  return (
    <div className="surface p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular">{value}</div>
      {sub !== undefined && (
        <div
          className={cn(
            "mt-1.5 flex items-center gap-1.5 text-xs",
            tone === "warning"
              ? "text-warning-fg"
              : tone === "danger"
                ? "text-danger-fg"
                : "text-muted-foreground",
          )}
        >
          {tone !== "neutral" && (
            <span
              className={cn(
                "size-1.5 rounded-full",
                tone === "warning" ? "bg-warning" : "bg-danger",
              )}
            />
          )}
          {sub}
        </div>
      )}
    </div>
  );
}

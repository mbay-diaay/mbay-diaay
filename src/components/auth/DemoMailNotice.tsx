import { useSyncExternalStore } from "react";
import { Link } from "@tanstack/react-router";
import { DEMO_MODE, demoMailbox, pendingInvitationLinks } from "@/lib/auth";
import { useStore } from "@/lib/store";
import type { DemoMail } from "@/lib/auth/demo-service";
import { useT } from "@/lib/i18n";

const subscribe = (l: () => void) => demoMailbox.subscribe(l);
const latest = () => demoMailbox.latest();

/**
 * Remplace la boîte de réception en démonstration : aucun courriel n'est envoyé,
 * le code que recevrait l'utilisateur est affiché ici. Invisible hors démonstration.
 */
export function DemoMailNotice({ purpose }: { purpose: DemoMail["purpose"] }) {
  const t = useT();
  const mail = useSyncExternalStore(subscribe, latest, () => undefined);
  if (!DEMO_MODE || !mail || mail.purpose !== purpose) return null;
  return (
    <div
      className="rounded-md border border-dashed border-border-strong bg-muted p-3 text-sm"
      role="status"
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {t("auth.mail.title")}
      </div>
      <p className="mt-1">
        {t("auth.mail.line", { to: mail.to })} {t("auth.mail.code")}{" "}
        <span className="font-semibold tabular tracking-widest">{mail.code}</span>
      </p>
    </div>
  );
}

/**
 * Démonstration : les invitations émises par l'administrateur (nouvelle coopérative, invitation renvoyée).
 * En production, le lien arrive par courriel ; ici il est affiché pour pouvoir parcourir tout le circuit.
 */
export function DemoInvitationNotice() {
  const t = useT();
  // Relit la liste quand les comptes changent (création de coopérative, renvoi d'invitation).
  useStore((s) => s.users);
  const links = pendingInvitationLinks();
  if (!DEMO_MODE || links.length === 0) return null;
  return (
    <div
      className="rounded-md border border-dashed border-border-strong bg-muted p-3 text-sm"
      role="status"
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {t("auth.mail.invitationTitle")}
      </div>
      <ul className="mt-1 space-y-2">
        {links.map((l) => (
          <li key={l.email}>
            <p>{t("auth.mail.invitationLine", { to: l.email })}</p>
            <Link
              to="/invitation"
              search={{ jeton: l.token }}
              className="font-semibold text-primary hover:underline"
            >
              {t("auth.mail.invitationOpen", { name: l.name })}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

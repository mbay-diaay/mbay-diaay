import { Pill } from "@/components/app/ui-bits";
import { useI18n, type MessageKey } from "@/lib/i18n";

import type { AccountState } from "@/lib/scoop-account";

const ACCOUNT_LABEL = {
  active: "cooperatives.account.active",
  invited: "cooperatives.account.invited",
  expired: "cooperatives.account.expired",
  closed: "cooperatives.account.closed",
  none: "cooperatives.account.none",
} as const satisfies Record<AccountState, MessageKey>;
const ACCOUNT_TONE = {
  active: "success",
  invited: "info",
  expired: "warning",
  closed: "neutral",
  none: "neutral",
} as const satisfies Record<AccountState, "success" | "info" | "warning" | "neutral">;

export function AccountPill({
  account,
  date,
}: {
  account: AccountState;
  /** Date d'envoi ou d'échéance de l'invitation, à afficher selon l'état. */
  date: string | undefined;
}) {
  const { t, formatDate } = useI18n();
  const text = date ? formatDate(date, { day: "2-digit", month: "short", year: "numeric" }) : "";
  return <Pill tone={ACCOUNT_TONE[account]}>{t(ACCOUNT_LABEL[account], { date: text })}</Pill>;
}

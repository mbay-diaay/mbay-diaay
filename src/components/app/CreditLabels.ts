import type { MessageKey } from "@/lib/i18n";
import type { Credit, CreditState, Installment, PaymentMethod } from "@/lib/mock/commerce";

export const CREDIT_STATE_LABEL: Record<CreditState, MessageKey> = {
  "en cours": "credits.state.en cours",
  soldé: "credits.state.soldé",
  "en retard": "credits.state.en retard",
};

export const CREDIT_STATE_TONE: Record<CreditState, "info" | "success" | "danger"> = {
  "en cours": "info",
  soldé: "success",
  "en retard": "danger",
};

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, MessageKey> = {
  espèces: "credits.method.espèces",
  "mobile money": "credits.method.mobile money",
  virement: "credits.method.virement",
};

export type InstallmentState = "payée" | "partielle" | "à payer" | "en retard";

export const INSTALLMENT_LABEL: Record<InstallmentState, MessageKey> = {
  payée: "credits.installment.payée",
  partielle: "credits.installment.partielle",
  "à payer": "credits.installment.à payer",
  "en retard": "credits.installment.en retard",
};

export const INSTALLMENT_TONE: Record<InstallmentState, "success" | "warning" | "info" | "danger"> =
  {
    payée: "success",
    partielle: "warning",
    "à payer": "info",
    "en retard": "danger",
  };

export interface InstallmentLine {
  installment: Installment;
  /** Part de l'échéance déjà couverte par les remboursements. */
  covered: number;
  state: InstallmentState;
}

/**
 * État de chaque échéance : le total remboursé couvre les échéances dans l'ordre des dates.
 * Une échéance échue et non couverte est « en retard », même si elle est payée en partie.
 */
export function installmentLines(
  credit: Pick<Credit, "schedule">,
  paid: number,
  todayIso: string,
): InstallmentLine[] {
  const today = todayIso.slice(0, 10);
  let left = paid;
  return [...credit.schedule]
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .map((installment) => {
      const covered = Math.min(left, installment.amount);
      left -= covered;
      const state: InstallmentState =
        covered >= installment.amount
          ? "payée"
          : installment.dueDate < today
            ? "en retard"
            : covered > 0
              ? "partielle"
              : "à payer";
      return { installment, covered, state };
    });
}

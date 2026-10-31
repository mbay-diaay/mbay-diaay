import { useMemo, useState } from "react";
import { HandCoins } from "lucide-react";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { todayIso } from "@/components/app/FollowKinds";
import {
  CREDIT_STATE_LABEL,
  CREDIT_STATE_TONE,
  INSTALLMENT_LABEL,
  INSTALLMENT_TONE,
  PAYMENT_METHOD_LABEL,
  installmentLines,
} from "@/components/app/CreditLabels";
import { ReasonDialog } from "@/components/app/ReasonDialog";
import { Pill } from "@/components/app/ui-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { actions } from "@/lib/store";
import { repaymentIssues, totalDue } from "@/lib/commerce";
import type {
  Credit,
  CreditState,
  Installment,
  PaymentMethod,
  Repayment,
} from "@/lib/mock/commerce";
import { nf } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import { useFormat } from "@/hooks/use-format";
import { useTouched } from "@/hooks/use-touched";
import { cn } from "@/lib/utils";

export interface CreditRow {
  credit: Credit;
  name: string;
  scoopName: string;
  paid: number;
  balance: number;
  overdue: number;
  state: CreditState;
  next: Installment | null;
}

const METHODS: readonly PaymentMethod[] = ["espèces", "mobile money", "virement"];
const toAmount = (v: string) => Number(v.replace(/\s/g, ""));

/** Panneau d'un crédit : résumé, échéancier échéance par échéance, remboursements (annulés barrés avec leur motif). */
export function CreditSheet({
  row,
  repayments,
  canManage,
  onClose,
}: {
  row: CreditRow | undefined;
  /** Remboursements du périmètre de la session. */
  repayments: Repayment[];
  canManage: boolean;
  onClose: () => void;
}) {
  const { t, formatDate } = useI18n();
  const { money, day } = useFormat();
  const [repayFor, setRepayFor] = useState<CreditRow | null>(null);
  const [voidFor, setVoidFor] = useState<Repayment | null>(null);
  const today = todayIso();

  const mine = useMemo(
    () =>
      row
        ? repayments
            .filter((r) => r.creditId === row.credit.id)
            .sort((a, b) => b.paidAt.localeCompare(a.paidAt) || b.id.localeCompare(a.id))
        : [],
    [repayments, row],
  );
  const lines = useMemo(
    () => (row ? installmentLines(row.credit, row.paid, today) : []),
    [row, today],
  );

  return (
    <>
      <Sheet open={!!row} onOpenChange={(o) => !o && onClose()}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {row && (
            <>
              <SheetHeader>
                <SheetTitle>{row.name}</SheetTitle>
                <SheetDescription>{t("credits.sheet.description")}</SheetDescription>
              </SheetHeader>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Pill tone={CREDIT_STATE_TONE[row.state]}>{t(CREDIT_STATE_LABEL[row.state])}</Pill>
                <span className="text-sm font-medium">{row.credit.purpose}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("credits.sheet.grantedOn", {
                  date: day(row.credit.grantedAt, "long"),
                  name: row.credit.grantedBy,
                })}
              </p>

              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <SumCell label={t("credits.sheet.amount")} value={money(row.credit.amount)} />
                <SumCell
                  label={t("credits.sheet.rate")}
                  value={t("credits.sheet.rateValue", { rate: nf.format(row.credit.ratePct) })}
                />
                <SumCell label={t("credits.sheet.totalDue")} value={money(totalDue(row.credit))} />
                <SumCell label={t("credits.sheet.repaid")} value={money(row.paid)} />
                <SumCell label={t("credits.sheet.balance")} value={money(row.balance)} strong />
                {row.overdue > 0 && (
                  <SumCell label={t("credits.sheet.overdue")} value={money(row.overdue)} danger />
                )}
              </dl>

              {canManage &&
                (row.balance > 0 ? (
                  <Button
                    className="mt-4 w-full pointer-coarse:h-touch"
                    onClick={() => setRepayFor(row)}
                  >
                    <HandCoins className="size-4" />
                    {t("credits.sheet.repay")}
                  </Button>
                ) : (
                  <p className="mt-4 rounded-md bg-muted p-3 text-sm">
                    {t("credits.sheet.settledNote")}
                  </p>
                ))}

              <section className="mt-6 border-t pt-4" aria-labelledby="credit-schedule-title">
                <h3 id="credit-schedule-title" className="font-semibold">
                  {t("credits.sheet.schedule.title")}
                </h3>
                <ol className="mt-2 divide-y text-sm">
                  {lines.map((l, n) => (
                    <li
                      key={l.installment.id}
                      className="flex items-start justify-between gap-3 py-2.5"
                      data-state={l.state}
                    >
                      <div>
                        <div className="font-medium">{day(l.installment.dueDate, "long")}</div>
                        <div className="text-xs text-muted-foreground">
                          {t("credits.sheet.schedule.line", { n: n + 1, total: lines.length })}
                          {" · "}
                          {l.state !== "payée" && l.covered > 0
                            ? t("credits.sheet.schedule.paidPart", {
                                paid: nf.format(l.covered),
                                amount: nf.format(l.installment.amount),
                              })
                            : money(l.installment.amount)}
                        </div>
                      </div>
                      <Pill tone={INSTALLMENT_TONE[l.state]} className="shrink-0 whitespace-nowrap">
                        {t(INSTALLMENT_LABEL[l.state])}
                      </Pill>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="mt-6 border-t pt-4" aria-labelledby="credit-history-title">
                <h3 id="credit-history-title" className="font-semibold">
                  {t("credits.sheet.history.title")}
                </h3>
                {mine.length ? (
                  <ul className="mt-2 divide-y text-sm">
                    {mine.map((r) => (
                      <li key={r.id} className="py-3" data-voided={r.voided ? "true" : undefined}>
                        <div className="flex items-start justify-between gap-3">
                          <div className={cn(r.voided && "text-muted-foreground line-through")}>
                            <div className="font-semibold tabular">{money(r.amount)}</div>
                            <div className="text-xs">{day(r.paidAt, "long")}</div>
                          </div>
                          {r.voided ? (
                            <Pill tone="neutral">{t("credits.sheet.history.voidTag")}</Pill>
                          ) : (
                            canManage && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="pointer-coarse:h-touch"
                                onClick={() => setVoidFor(r)}
                              >
                                {t("credits.sheet.void")}
                              </Button>
                            )
                          )}
                        </div>
                        <div
                          className={cn(
                            "mt-1 space-y-0.5 text-xs text-muted-foreground",
                            r.voided && "line-through",
                          )}
                        >
                          <div>{t("credits.sheet.history.receipt", { receipt: r.receipt })}</div>
                          <div>
                            {t("credits.sheet.history.method", {
                              method: t(PAYMENT_METHOD_LABEL[r.method]),
                            })}
                          </div>
                          <div>
                            {t("credits.sheet.history.by", {
                              name: r.by,
                              date: day(r.paidAt, "long"),
                            })}
                          </div>
                        </div>
                        {r.voided && (
                          <div className="mt-1.5 rounded-md bg-muted p-2 text-xs">
                            <div className="font-medium">
                              {t("credits.sheet.history.voided", {
                                date: formatDate(r.voided.at, {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }),
                                name: r.voided.by,
                              })}
                            </div>
                            <div>
                              {t("credits.sheet.history.reason", { reason: r.voided.reason })}
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("credits.sheet.history.none")}
                  </p>
                )}
              </section>
            </>
          )}
        </SheetContent>
      </Sheet>
      {repayFor && (
        <RepayDialog key={repayFor.credit.id} row={repayFor} onClose={() => setRepayFor(null)} />
      )}
      {voidFor && (
        <VoidDialog key={voidFor.id} repayment={voidFor} onClose={() => setVoidFor(null)} />
      )}
    </>
  );
}

function SumCell({
  label,
  value,
  strong,
  danger,
}: {
  label: string;
  value: string;
  strong?: boolean | undefined;
  danger?: boolean | undefined;
}) {
  return (
    <div className={cn("rounded-md bg-muted p-2.5", danger && "bg-danger-bg")}>
      <dt className={cn("text-xs text-muted-foreground", danger && "text-danger-fg")}>{label}</dt>
      <dd
        className={cn(
          "mt-0.5 font-semibold tabular",
          strong && "text-base",
          danger && "text-danger-fg",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

/** Enregistrement d'un remboursement : montant proposé = prochaine échéance, plafonné au reste à payer. */
function RepayDialog({ row, onClose }: { row: CreditRow; onClose: () => void }) {
  const { t } = useI18n();
  const today = todayIso();
  const suggested = Math.min(row.next?.amount ?? row.balance, row.balance);
  const [amount, setAmount] = useState(String(suggested));
  const [method, setMethod] = useState<PaymentMethod>("espèces");
  const [paidAt, setPaidAt] = useState(today);
  const { touched, touch } = useTouched();

  const value = toAmount(amount);
  const amountIssues = repaymentIssues(value, row.balance);
  const dateBad = !/^\d{4}-\d{2}-\d{2}$/.test(paidAt) || paidAt > today;
  const invalid = amountIssues.length > 0 || dateBad;

  const submit = () => {
    if (invalid) return touch();
    const res = actions.recordRepayment({ creditId: row.credit.id, amount: value, paidAt, method });
    if (res.ok) {
      toast.success(t("credits.repayDialog.toast", { receipt: res.receipt }), {
        description: t("credits.repayDialog.toastDetail", {
          name: row.name,
          amount: nf.format(value),
        }),
      });
      onClose();
    } else toast.error(res.error);
  };

  return (
    <FormDialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={t("credits.repayDialog.title")}
      description={t("credits.repayDialog.description", {
        name: row.name,
        balance: nf.format(row.balance),
      })}
      cancelLabel={t("credits.cancel")}
      submitLabel={t("credits.repayDialog.submit")}
      onSubmit={submit}
      submitDisabled={invalid}
      footerNote={t("credits.repayDialog.footer")}
    >
      <FormField
        label={t("credits.repayDialog.amount")}
        hint={t("credits.repayDialog.amountHint", { balance: nf.format(row.balance) })}
        error={touched && amountIssues[0] ? t(amountIssues[0]) : undefined}
        required
      >
        {(c) => (
          <Input
            {...c}
            inputMode="numeric"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              touch();
            }}
            onBlur={touch}
          />
        )}
      </FormField>
      <FormField label={t("credits.repayDialog.method")}>
        {(c) => (
          <Select value={method} onValueChange={(v) => setMethod(v as PaymentMethod)}>
            <SelectTrigger {...c}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {METHODS.map((m) => (
                <SelectItem key={m} value={m}>
                  {t(PAYMENT_METHOD_LABEL[m])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>
      <FormField
        label={t("credits.repayDialog.date")}
        error={touched && dateBad ? t("errors.credit.date") : undefined}
        required
      >
        {(c) => (
          <Input
            {...c}
            type="date"
            max={today}
            value={paidAt}
            onChange={(e) => {
              setPaidAt(e.target.value);
              touch();
            }}
          />
        )}
      </FormField>
    </FormDialog>
  );
}

/** Annulation : le remboursement reste dans l'historique, barré, avec le motif. */
function VoidDialog({ repayment, onClose }: { repayment: Repayment; onClose: () => void }) {
  const { t } = useI18n();
  return (
    <ReasonDialog
      title={t("credits.voidDialog.title")}
      description={t("credits.voidDialog.description")}
      label={t("credits.voidDialog.reason")}
      hint={t("credits.voidDialog.reasonHint")}
      tooShortError={t("errors.credit.reason")}
      cancelLabel={t("credits.voidDialog.back")}
      submitLabel={t("credits.voidDialog.submit")}
      doneMessage={t("credits.voidDialog.done")}
      doneDescription={t("credits.voidDialog.doneDetail", { receipt: repayment.receipt })}
      onSubmit={(reason) => actions.voidRepayment(repayment.id, reason)}
      onClose={onClose}
    >
      <p className="rounded-md bg-muted p-3 text-sm font-medium">
        {t("credits.voidDialog.option", {
          receipt: repayment.receipt,
          amount: nf.format(repayment.amount),
        })}
      </p>
    </ReasonDialog>
  );
}

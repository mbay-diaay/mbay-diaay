import { useState } from "react";
import { Ban } from "lucide-react";
import { ReasonDialog } from "@/components/app/ReasonDialog";
import { EXPENSE_CATEGORY_LABEL } from "@/components/app/ExpenseLabels";
import { Pill } from "@/components/app/ui-bits";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { actions } from "@/lib/store";
import type { Expense } from "@/lib/mock/exploitation";
import { nf } from "@/lib/format";
import { useFormat } from "@/hooks/use-format";
import { useI18n } from "@/lib/i18n";

export interface ExpenseView {
  expense: Expense;
  producerName: string;
  producerCode: string;
  scoopName: string;
}

/** Panneau d'une charge : le détail, l'historique et l'annulation. */
export function ExpenseSheet({
  view,
  canWrite,
  onClose,
}: {
  view: ExpenseView | undefined;
  canWrite: boolean;
  onClose: () => void;
}) {
  const { t, formatDate } = useI18n();
  const { money, day: formatDay } = useFormat();
  const [voiding, setVoiding] = useState(false);
  const day = (iso: string) => formatDay(iso, "sheet");
  const e = view?.expense;

  return (
    <>
      <Sheet open={!!view} onOpenChange={(o) => !o && onClose()}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {view && e && (
            <>
              <SheetHeader>
                <SheetTitle>
                  {t("charges.sheet.title", { category: t(EXPENSE_CATEGORY_LABEL[e.category]) })}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Pill tone={e.voided ? "neutral" : "success"}>
                  {e.voided ? t("charges.state.voided") : t("charges.state.valid")}
                </Pill>
                <span className="text-sm text-muted-foreground">{day(e.date)}</span>
              </div>
              <div className="mt-4 rounded-md bg-muted p-3">
                <div className="text-xs text-muted-foreground">{t("charges.sheet.amount")}</div>
                <div
                  className={
                    e.voided
                      ? "text-xl font-semibold tabular text-muted-foreground line-through"
                      : "text-xl font-semibold tabular"
                  }
                >
                  {money(e.amount)}
                </div>
              </div>

              {canWrite && !e.voided && (
                <Button variant="outline" className="mt-4 w-full" onClick={() => setVoiding(true)}>
                  <Ban className="size-4" />
                  {t("charges.sheet.void")}
                </Button>
              )}

              <section className="mt-6 border-t pt-4" aria-labelledby="expense-detail-title">
                <h3 id="expense-detail-title" className="font-semibold">
                  {t("charges.sheet.detail")}
                </h3>
                <dl className="mt-2 divide-y text-sm">
                  <Row label={t("charges.sheet.producer")}>
                    <span className="font-medium">{view.producerName}</span>{" "}
                    <span className="text-muted-foreground">({view.producerCode})</span>
                  </Row>
                  <Row label={t("charges.sheet.scoop")}>{view.scoopName}</Row>
                  <Row label={t("charges.sheet.crop")}>{e.crop}</Row>
                  <Row label={t("charges.sheet.category")}>
                    {t(EXPENSE_CATEGORY_LABEL[e.category])}
                  </Row>
                  <Row label={t("charges.sheet.label")}>{e.label || t("charges.noLabel")}</Row>
                  <Row label={t("charges.sheet.campaign")}>{e.campaign}</Row>
                </dl>
              </section>

              <section className="mt-6 border-t pt-4" aria-labelledby="expense-hist-title">
                <h3 id="expense-hist-title" className="font-semibold">
                  {t("charges.sheet.history")}
                </h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>{t("charges.sheet.recorded", { name: e.by, date: day(e.createdAt) })}</li>
                  {e.voided && (
                    <li className="rounded-md bg-muted p-2.5" data-testid="expense-voided">
                      <div className="font-medium">
                        {t("charges.sheet.voidedBy", {
                          name: e.voided.by,
                          date: day(e.voided.at),
                        })}
                      </div>
                      <div>{t("charges.sheet.reason", { reason: e.voided.reason })}</div>
                    </li>
                  )}
                </ul>
              </section>
            </>
          )}
        </SheetContent>
      </Sheet>
      {voiding && view && (
        <ExpenseVoidDialog key={view.expense.id} view={view} onClose={() => setVoiding(false)} />
      )}
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words text-right">{children}</dd>
    </div>
  );
}

/** Annulation : la charge reste dans la liste, barrée, avec le motif. */
export function ExpenseVoidDialog({ view, onClose }: { view: ExpenseView; onClose: () => void }) {
  const { t } = useI18n();
  return (
    <ReasonDialog
      title={t("charges.void.title")}
      description={t("charges.void.description", {
        name: view.producerName,
        amount: nf.format(view.expense.amount),
      })}
      label={t("charges.void.reason")}
      hint={t("charges.void.hint")}
      tooShortError={t("errors.expense.reason")}
      cancelLabel={t("charges.void.back")}
      submitLabel={t("charges.void.submit")}
      doneMessage={t("charges.void.done")}
      onSubmit={(reason) => actions.voidExpense(view.expense.id, reason)}
      onClose={onClose}
    />
  );
}

import { useState } from "react";
import { Ban, HandCoins } from "lucide-react";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { ReasonDialog } from "@/components/app/ReasonDialog";
import { Pill } from "@/components/app/ui-bits";
import { SALE_PAYMENT_LABEL, SALE_PAYMENT_TONE, toNumber } from "@/components/app/SaleLabels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { actions } from "@/lib/store";
import { salePayment, saleTotal } from "@/lib/commerce";
import type { Sale } from "@/lib/mock/commerce";
import { nf } from "@/lib/format";
import { useFormat } from "@/hooks/use-format";
import { useTouched } from "@/hooks/use-touched";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface SaleView {
  sale: Sale;
  producerName: string;
  producerCode: string;
  scoopName: string;
}

/** Panneau d'une vente : le détail, ce qui est encaissé, et les deux actions (encaisser, annuler). */
export function SaleSheet({
  view,
  canManage,
  onClose,
}: {
  view: SaleView | undefined;
  canManage: boolean;
  onClose: () => void;
}) {
  const { t, formatDate } = useI18n();
  const [dialog, setDialog] = useState<"pay" | "void" | null>(null);
  const { money, day: formatDay } = useFormat();
  const day = (iso: string) => formatDay(iso, "sheet");
  const s = view?.sale;
  const total = s ? saleTotal(s) : 0;
  const paid = s ? Math.min(s.paidAmount, total) : 0;
  const left = total - paid;
  const state = s ? salePayment(s) : "à payer";

  return (
    <>
      <Sheet open={!!view} onOpenChange={(o) => !o && onClose()}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {view && s && (
            <>
              <SheetHeader>
                <SheetTitle>{t("ventes.sheet.title", { crop: s.crop })}</SheetTitle>
              </SheetHeader>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {s.voided ? (
                  <Pill tone="neutral">{t("ventes.state.voided")}</Pill>
                ) : (
                  <Pill tone={SALE_PAYMENT_TONE[state]}>{t(SALE_PAYMENT_LABEL[state])}</Pill>
                )}
                <span className="text-sm text-muted-foreground">{day(s.soldAt)}</span>
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <Cell label={t("ventes.sheet.total")} value={money(total)} />
                <Cell label={t("ventes.sheet.paid")} value={money(paid)} />
                <Cell
                  label={t("ventes.sheet.left")}
                  value={money(left)}
                  warn={left > 0 && !s.voided}
                />
              </dl>

              {canManage && !s.voided && (
                <div className="mt-4 grid gap-2">
                  {left > 0 && (
                    <Button className="w-full" onClick={() => setDialog("pay")}>
                      <HandCoins className="size-4" />
                      {t("ventes.sheet.pay")}
                    </Button>
                  )}
                  <Button variant="outline" className="w-full" onClick={() => setDialog("void")}>
                    <Ban className="size-4" />
                    {t("ventes.sheet.void")}
                  </Button>
                </div>
              )}

              <section className="mt-6 border-t pt-4" aria-labelledby="sale-detail-title">
                <h3 id="sale-detail-title" className="font-semibold">
                  {t("ventes.sheet.detail")}
                </h3>
                <dl className="mt-2 divide-y text-sm">
                  <Row label={t("ventes.sheet.producer")}>
                    <span className="font-medium">{view.producerName}</span>{" "}
                    <span className="text-muted-foreground">({view.producerCode})</span>
                  </Row>
                  <Row label={t("ventes.sheet.scoop")}>{view.scoopName}</Row>
                  <Row label={t("ventes.sheet.crop")}>{s.crop}</Row>
                  <Row label={t("ventes.sheet.quantity")}>
                    {t("ventes.kg", { qty: nf.format(s.quantityKg) })}
                  </Row>
                  <Row label={t("ventes.sheet.price")}>
                    {t("ventes.perKg", { amount: nf.format(s.pricePerKg) })}
                  </Row>
                  <Row label={t("ventes.sheet.buyer")}>{s.buyer}</Row>
                  <Row label={t("ventes.sheet.campaign")}>{s.campaign}</Row>
                </dl>
              </section>

              <section className="mt-6 border-t pt-4" aria-labelledby="sale-hist-title">
                <h3 id="sale-hist-title" className="font-semibold">
                  {t("ventes.sheet.history")}
                </h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>{t("ventes.sheet.recorded", { name: s.by, date: day(s.createdAt) })}</li>
                  <li>
                    {s.paidAmount > 0
                      ? t("ventes.sheet.collected", { amount: nf.format(paid) })
                      : t("ventes.sheet.nothingCollected")}
                  </li>
                  {s.voided && (
                    <li className="rounded-md bg-muted p-2.5" data-testid="sale-voided">
                      <div className="font-medium">
                        {t("ventes.sheet.voidedBy", { name: s.voided.by, date: day(s.voided.at) })}
                      </div>
                      <div>{t("ventes.sheet.reason", { reason: s.voided.reason })}</div>
                    </li>
                  )}
                </ul>
              </section>
            </>
          )}
        </SheetContent>
      </Sheet>
      {dialog === "pay" && view && (
        <SalePayDialog key={view.sale.id} view={view} onClose={() => setDialog(null)} />
      )}
      {dialog === "void" && view && (
        <SaleVoidDialog key={view.sale.id} view={view} onClose={() => setDialog(null)} />
      )}
    </>
  );
}

function Cell({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="rounded-md bg-muted p-2.5">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn("mt-0.5 break-words font-semibold tabular", warn && "text-warning-fg")}>
        {value}
      </dd>
    </div>
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

/** Encaissement : le montant est prérempli avec ce qui reste à payer et ne peut pas le dépasser. */
export function SalePayDialog({ view, onClose }: { view: SaleView; onClose: () => void }) {
  const { t } = useI18n();
  const s = view.sale;
  const left = saleTotal(s) - Math.min(s.paidAmount, saleTotal(s));
  const [amount, setAmount] = useState(String(left));
  const { touched, touch } = useTouched();
  const value = toNumber(amount);
  const error =
    !Number.isInteger(value) || value <= 0
      ? t("ventes.pay.invalid")
      : value > left
        ? t("ventes.pay.tooMuch", { amount: nf.format(left) })
        : undefined;

  return (
    <FormDialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={t("ventes.pay.title")}
      description={t("ventes.pay.description", {
        name: view.producerName,
        amount: nf.format(left),
      })}
      submitLabel={t("ventes.pay.submit")}
      submitDisabled={!!error}
      onSubmit={() => {
        const res = actions.addSalePayment(s.id, value);
        if (!res.ok) return void toast.error(res.error);
        toast.success(t("ventes.pay.done"), {
          description: t("ventes.pay.doneDetail", { amount: nf.format(value) }),
        });
        onClose();
      }}
    >
      <FormField
        label={t("ventes.pay.amount")}
        hint={t("ventes.pay.hint")}
        error={touched ? error : undefined}
      >
        {(c) => (
          <Input
            {...c}
            value={amount}
            inputMode="numeric"
            onChange={(e) => {
              setAmount(e.target.value);
              touch();
            }}
            onBlur={touch}
          />
        )}
      </FormField>
    </FormDialog>
  );
}

/** Annulation : la vente reste dans la liste, barrée, avec le motif. */
export function SaleVoidDialog({ view, onClose }: { view: SaleView; onClose: () => void }) {
  const { t } = useI18n();
  return (
    <ReasonDialog
      title={t("ventes.void.title")}
      description={t("ventes.void.description", {
        crop: view.sale.crop,
        name: view.producerName,
        amount: nf.format(saleTotal(view.sale)),
      })}
      label={t("ventes.void.reason")}
      hint={t("ventes.void.hint")}
      tooShortError={t("errors.sale.reason")}
      cancelLabel={t("ventes.void.back")}
      submitLabel={t("ventes.void.submit")}
      doneMessage={t("ventes.void.done")}
      onSubmit={(reason) => actions.voidSale(view.sale.id, reason)}
      onClose={onClose}
    />
  );
}

import { useMemo } from "react";
import { ArrowUpFromLine, Ban, PackagePlus } from "lucide-react";
import { Pill } from "@/components/app/ui-bits";
import {
  EXPIRY_LABEL,
  KIND_LABEL,
  useStockFormat,
  type StockRow,
} from "@/components/app/StockLabels";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { expiryState, lotBalance, lotValue } from "@/lib/commerce";
import type { StockLot, StockMovement } from "@/lib/mock/commerce";
import type { Member } from "@/lib/mock/cooperative";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const EXPIRY_TONE = { none: "neutral", ok: "success", soon: "warning", expired: "danger" } as const;

/** Panneau d'un intrant : ses lots (traçabilité par numéro de lot) et l'historique des sorties de chaque lot. */
export function StockLotSheet({
  row,
  scoopName,
  movements,
  members,
  today,
  canManage,
  onClose,
  onReceive,
  onMove,
  onVoid,
}: {
  row: StockRow | undefined;
  scoopName: string;
  movements: StockMovement[];
  members: Member[];
  today: string;
  canManage: boolean;
  onClose: () => void;
  onReceive: (row: StockRow) => void;
  onMove: (lot: StockLot, row: StockRow) => void;
  onVoid: (mv: StockMovement, lot: StockLot, row: StockRow) => void;
}) {
  const { t } = useI18n();
  const fmt = useStockFormat();
  const memberName = useMemo(() => {
    const m = new Map(members.map((x) => [x.id, `${x.firstName} ${x.lastName}`]));
    return (id: string | null) => (id ? (m.get(id) ?? t("stocks.sheet.unknownMember")) : "");
  }, [members, t]);

  return (
    <Sheet open={!!row} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        {row && (
          <>
            <SheetHeader>
              <SheetTitle>{row.item.name}</SheetTitle>
            </SheetHeader>
            <p className="mt-1 text-sm text-muted-foreground">{scoopName}</p>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-md bg-muted p-2.5">
                <dt className="text-xs text-muted-foreground">{t("stocks.sheet.total")}</dt>
                <dd className="mt-0.5 font-semibold tabular">
                  {fmt.qty(row.balance, row.item.unit)}
                </dd>
              </div>
              <div className="rounded-md bg-muted p-2.5">
                <dt className="text-xs text-muted-foreground">{t("stocks.sheet.threshold")}</dt>
                <dd className="mt-0.5 font-semibold tabular">
                  {row.item.alertBelow > 0
                    ? fmt.qty(row.item.alertBelow, row.item.unit)
                    : t("stocks.sheet.noThreshold")}
                </dd>
              </div>
            </dl>
            {row.low && (
              <p className="mt-3">
                <Pill tone="warning">{t("stocks.low")}</Pill>
              </p>
            )}
            {canManage && (
              <Button variant="outline" className="mt-4 w-full" onClick={() => onReceive(row)}>
                <PackagePlus className="size-4" />
                {t("stocks.sheet.receive")}
              </Button>
            )}

            <section className="mt-6 border-t pt-4" aria-labelledby="stk-lots-title">
              <h3 id="stk-lots-title" className="font-semibold">
                {t("stocks.sheet.lots")}
              </h3>
              <ul className="mt-3 space-y-4">
                {[...row.lots]
                  .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))
                  .map((lot) => {
                    const balance = lotBalance(lot, movements);
                    const state = expiryState(lot, today);
                    const mine = movements
                      .filter((m) => m.lotId === lot.id)
                      .sort(
                        (a, b) =>
                          b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
                      );
                    return (
                      <li key={lot.id} className="rounded-lg border p-3" data-lot={lot.lotNumber}>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h4 className="font-semibold">
                            {t("stocks.sheet.lotTitle", { lot: lot.lotNumber })}
                          </h4>
                          {balance <= 0 ? (
                            <Pill tone="neutral">{t("stocks.sheet.empty")}</Pill>
                          ) : state === "soon" || state === "expired" ? (
                            <Pill tone={EXPIRY_TONE[state]}>{t(EXPIRY_LABEL[state])}</Pill>
                          ) : null}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {t("stocks.sheet.supplierOn", {
                            supplier: lot.supplier,
                            date: fmt.day(lot.receivedAt),
                          })}
                        </p>
                        <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
                          <div className="rounded-md bg-muted p-2">
                            <dt className="text-xs text-muted-foreground">
                              {t("stocks.sheet.balance")}
                            </dt>
                            <dd className="mt-0.5 font-semibold tabular">
                              {fmt.qty(balance, row.item.unit)}
                            </dd>
                          </div>
                          <div className="rounded-md bg-muted p-2">
                            <dt className="text-xs text-muted-foreground">
                              {t("stocks.sheet.received")}
                            </dt>
                            <dd className="mt-0.5 tabular">
                              {fmt.qty(lot.quantity, row.item.unit)}
                            </dd>
                          </div>
                          <div className="rounded-md bg-muted p-2">
                            <dt className="text-xs text-muted-foreground">
                              {t("stocks.sheet.value")}
                            </dt>
                            <dd className="mt-0.5 tabular">
                              {fmt.money(lotValue(lot, movements))}
                            </dd>
                          </div>
                        </dl>
                        <p className="mt-2 text-sm">
                          {lot.expiresAt
                            ? t("stocks.sheet.expiresOn", { date: fmt.day(lot.expiresAt) })
                            : t("stocks.sheet.noExpiry")}
                        </p>
                        {canManage && balance > 0 && (
                          <Button className="mt-3 w-full" onClick={() => onMove(lot, row)}>
                            <ArrowUpFromLine className="size-4" />
                            {t("stocks.sheet.move")}
                          </Button>
                        )}

                        <h5 className="mt-4 text-sm font-semibold">{t("stocks.sheet.history")}</h5>
                        {mine.length ? (
                          <ul className="mt-1 divide-y text-sm">
                            {mine.map((m) => (
                              <li
                                key={m.id}
                                className="py-2.5"
                                data-voided={m.voided ? "true" : undefined}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div
                                    className={cn(m.voided && "text-muted-foreground line-through")}
                                  >
                                    <div className="font-semibold tabular">
                                      {t(KIND_LABEL[m.kind])} : {fmt.qty(m.quantity, row.item.unit)}
                                    </div>
                                    <div className="text-xs">{fmt.day(m.date)}</div>
                                  </div>
                                  {m.voided ? (
                                    <Pill tone="neutral">{t("stocks.sheet.voidTag")}</Pill>
                                  ) : (
                                    canManage && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="pointer-coarse:h-touch"
                                        onClick={() => onVoid(m, lot, row)}
                                      >
                                        <Ban className="size-4" />
                                        {t("stocks.sheet.void")}
                                      </Button>
                                    )
                                  )}
                                </div>
                                <div
                                  className={cn(
                                    "mt-1 space-y-0.5 text-xs text-muted-foreground",
                                    m.voided && "line-through",
                                  )}
                                >
                                  {m.memberId && (
                                    <div>
                                      {t("stocks.sheet.to", { name: memberName(m.memberId) })}
                                    </div>
                                  )}
                                  {m.note && <div>{t("stocks.sheet.note", { note: m.note })}</div>}
                                  <div>{t("stocks.sheet.by", { name: m.by })}</div>
                                </div>
                                {m.voided && (
                                  <div className="mt-1.5 rounded-md bg-muted p-2 text-xs">
                                    <div className="font-medium">
                                      {t("stocks.sheet.voidedBy", {
                                        date: fmt.day(m.voided.at),
                                        name: m.voided.by,
                                      })}
                                    </div>
                                    <div>
                                      {t("stocks.sheet.reason", { reason: m.voided.reason })}
                                    </div>
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {t("stocks.sheet.historyNone")}
                          </p>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </section>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

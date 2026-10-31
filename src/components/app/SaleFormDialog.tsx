import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { toNumber } from "@/components/app/SaleLabels";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actions, useStore } from "@/lib/store";
import { inScope } from "@/lib/scope";
import { saleIssues, saleTotal, type SaleIssueKey } from "@/lib/commerce";
import type { Producer } from "@/lib/mock/data";
import { nf } from "@/lib/format";
import { useFormat } from "@/hooks/use-format";
import { useI18n } from "@/lib/i18n";

const fullName = (p: Producer) => `${p.firstName} ${p.lastName}`;
type Field = "quantity" | "price" | "buyer" | "date" | "paid";
const FIELD_OF: Record<SaleIssueKey, Field | "producer"> = {
  "errors.sale.quantity": "quantity",
  "errors.sale.price": "price",
  "errors.sale.buyer": "buyer",
  "errors.sale.date": "date",
  "errors.sale.paid": "paid",
  "errors.sale.producer": "producer",
};

/** Enregistrement d'une vente : l'erreur d'un champ n'apparaît qu'après une première saisie ou une sortie du champ. */
export function SaleFormDialog({
  open,
  onOpenChange,
  onRecorded,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onRecorded?: (id: string) => void;
}) {
  const { t } = useI18n();
  const { money } = useFormat();
  const session = useStore((s) => s.session);
  const producers = useStore((s) => s.producers);
  const cropRefs = useStore((s) => s.cropRefs);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const choices = useMemo(
    () =>
      producers
        .filter((p) => !p.mergedInto && inScope([p], session).length === 1)
        .sort((a, b) => fullName(a).localeCompare(fullName(b), "fr")),
    [producers, session],
  );
  const [pid, setPid] = useState("");
  const [find, setFind] = useState("");
  const [crop, setCrop] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [buyer, setBuyer] = useState("");
  const [day, setDay] = useState(today);
  const [paid, setPaid] = useState("");
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const touch = (f: Field) => setTouched((x) => (x[f] ? x : { ...x, [f]: true }));

  const needle = find.trim().toLowerCase();
  const listed = useMemo(() => {
    const hits = choices.filter(
      (p) => !needle || `${fullName(p)} ${p.code} ${p.village}`.toLowerCase().includes(needle),
    );
    const chosen = choices.find((p) => p.id === pid);
    const head = hits.slice(0, 50);
    return chosen && !head.includes(chosen) ? [chosen, ...head] : head;
  }, [choices, needle, pid]);
  const producer = choices.find((p) => p.id === pid);

  /** Cultures du référentiel, celles du producteur d'abord. */
  const cropChoices = useMemo(() => {
    const mine = [...new Set((producer?.crops ?? []).map((c) => c.crop))];
    const rest = cropRefs.map((r) => r.name).filter((n) => !mine.includes(n));
    return { mine, rest: rest.sort((a, b) => a.localeCompare(b, "fr")) };
  }, [producer, cropRefs]);

  const quantityKg = toNumber(qty);
  const pricePerKg = toNumber(price);
  const paidAmount = paid.trim() === "" ? 0 : toNumber(paid);
  const total = quantityKg > 0 && pricePerKg > 0 ? saleTotal({ quantityKg, pricePerKg }) : 0;
  const issues = saleIssues(
    { quantityKg, pricePerKg, buyer, soldAt: day, paidAmount },
    new Date().toISOString(),
  );
  const errorOf = (f: Field) => {
    const i = touched[f] ? issues.find((k) => FIELD_OF[k] === f) : undefined;
    return i ? t(i) : undefined;
  };
  // Le montant encaissé n'est contrôlé qu'une fois le total connu ; seul « trop grand » le concerne ici.
  const invalid = !producer || !crop || issues.length > 0;

  const onPick = (id: string) => {
    setPid(id);
    const first = [
      ...new Set((choices.find((p) => p.id === id)?.crops ?? []).map((c) => c.crop)),
    ][0];
    setCrop(first ?? "");
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title={t("ventes.form.title")}
      description={t("ventes.form.description")}
      submitLabel={t("ventes.form.submit")}
      submitDisabled={invalid}
      onSubmit={() => {
        if (!producer || invalid) return;
        const res = actions.recordSale({
          producerId: producer.id,
          crop,
          quantityKg,
          pricePerKg,
          buyer,
          soldAt: day,
          paidAmount,
        });
        if (!res.ok) return void toast.error(res.error);
        toast.success(t("ventes.form.done"), {
          description: t("ventes.form.doneDetail", {
            name: fullName(producer),
            amount: nf.format(total),
          }),
        });
        onRecorded?.(res.id);
        onOpenChange(false);
      }}
    >
      <FormField label={t("ventes.form.producer")} required hint={t("ventes.form.producerHint")}>
        {(c) => (
          <div className="grid gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label={t("ventes.form.findAria")}
                placeholder={t("ventes.form.findPlaceholder")}
                value={find}
                onChange={(e) => setFind(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={pid} onValueChange={onPick}>
              <SelectTrigger {...c}>
                <SelectValue placeholder={t("ventes.form.choose")} />
              </SelectTrigger>
              <SelectContent>
                {listed.length ? (
                  listed.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {fullName(p)} · {p.code}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    {t("ventes.form.noProducer")}
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        )}
      </FormField>

      <FormField label={t("ventes.form.crop")} required>
        {(c) => (
          <Select value={crop} onValueChange={setCrop} disabled={!producer}>
            <SelectTrigger {...c}>
              <SelectValue placeholder={t("ventes.form.cropChoose")} />
            </SelectTrigger>
            <SelectContent>
              {[...cropChoices.mine, ...cropChoices.rest].map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>

      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
        <FormField label={t("ventes.form.quantity")} required error={errorOf("quantity")}>
          {(c) => (
            <Input
              {...c}
              value={qty}
              inputMode="decimal"
              placeholder="1200"
              onChange={(e) => {
                setQty(e.target.value);
                touch("quantity");
              }}
              onBlur={() => touch("quantity")}
            />
          )}
        </FormField>
        <FormField label={t("ventes.form.price")} required error={errorOf("price")}>
          {(c) => (
            <Input
              {...c}
              value={price}
              inputMode="decimal"
              placeholder="220"
              onChange={(e) => {
                setPrice(e.target.value);
                touch("price");
              }}
              onBlur={() => touch("price")}
            />
          )}
        </FormField>
      </div>

      <div
        className="rounded-md bg-muted px-3 py-2.5 text-sm"
        role="status"
        aria-live="polite"
        data-testid="sale-total"
      >
        <span className="text-muted-foreground">{t("ventes.form.total")} </span>
        <span className="font-semibold tabular">{money(total)}</span>
      </div>

      <FormField label={t("ventes.form.buyer")} required error={errorOf("buyer")}>
        {(c) => (
          <Input
            {...c}
            value={buyer}
            placeholder={t("ventes.form.buyerPlaceholder")}
            onChange={(e) => {
              setBuyer(e.target.value);
              touch("buyer");
            }}
            onBlur={() => touch("buyer")}
          />
        )}
      </FormField>

      <FormField label={t("ventes.form.date")} required error={errorOf("date")}>
        {(c) => (
          <Input
            {...c}
            type="date"
            value={day}
            max={today}
            onChange={(e) => {
              setDay(e.target.value);
              touch("date");
            }}
            onBlur={() => touch("date")}
          />
        )}
      </FormField>

      <FormField
        label={t("ventes.form.paid")}
        hint={t("ventes.form.paidHint")}
        error={errorOf("paid")}
      >
        {(c) => (
          <Input
            {...c}
            value={paid}
            inputMode="numeric"
            placeholder="0"
            onChange={(e) => {
              setPaid(e.target.value);
              touch("paid");
            }}
            onBlur={() => touch("paid")}
          />
        )}
      </FormField>
    </FormDialog>
  );
}

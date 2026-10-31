import { useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { EXPENSE_CATEGORY_LABEL, EXPENSE_CATEGORY_TIP } from "@/components/app/ExpenseLabels";
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
import { expenseIssues, type ExpenseIssueKey } from "@/lib/exploitation";
import { EXPENSE_CATEGORIES, type ExpenseCategory } from "@/lib/mock/exploitation";
import type { Producer } from "@/lib/mock/data";
import { nf } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const fullName = (p: Producer) => `${p.firstName} ${p.lastName}`;
type Field = "amount" | "date" | "category" | "crop";
const FIELD_OF: Record<ExpenseIssueKey, Field | "producer"> = {
  "errors.expense.amount": "amount",
  "errors.expense.date": "date",
  "errors.expense.category": "category",
  "errors.expense.crop": "crop",
  "errors.expense.producer": "producer",
};

/** Saisie guidée d'une charge : le producteur, puis la dépense. L'erreur n'apparaît qu'après une première saisie. */
export function ExpenseFormDialog({
  open,
  onOpenChange,
  onRecorded,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onRecorded?: (id: string) => void;
}) {
  const { t } = useI18n();
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
  const [category, setCategory] = useState<ExpenseCategory | "">("");
  const [amount, setAmount] = useState("");
  const [day, setDay] = useState(today);
  const [label, setLabel] = useState("");
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const touch = (f: Field) => setTouched((x) => (x[f] ? x : { ...x, [f]: true }));

  const needle = find.trim().toLowerCase();
  const producer = choices.find((p) => p.id === pid);
  /** Une fois le producteur choisi, seul lui reste affiché ; une nouvelle recherche rouvre la liste. */
  const listed = useMemo(() => {
    if (producer && !needle) return [producer];
    return choices
      .filter(
        (p) => !needle || `${fullName(p)} ${p.code} ${p.village}`.toLowerCase().includes(needle),
      )
      .slice(0, 5);
  }, [choices, needle, producer]);

  /** Cultures du producteur d'abord, puis celles du référentiel. */
  const cropChoices = useMemo(() => {
    const mine = [...new Set((producer?.crops ?? []).map((c) => c.crop))];
    const rest = cropRefs.map((r) => r.name).filter((n) => !mine.includes(n));
    return [...mine, ...rest.sort((a, b) => a.localeCompare(b, "fr"))];
  }, [producer, cropRefs]);

  const value = toNumber(amount);
  const issues = expenseIssues(
    { amount: value, category, date: day, crop },
    new Date().toISOString(),
  );
  const errorOf = (f: Field) => {
    const i = touched[f] ? issues.find((k) => FIELD_OF[k] === f) : undefined;
    return i ? t(i) : undefined;
  };
  const invalid = !producer || issues.length > 0;

  const onPick = (p: Producer) => {
    setPid(p.id);
    setCrop(p.crops[0]?.crop ?? "");
    setFind("");
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title={t("charges.form.title")}
      description={t("charges.form.description")}
      submitLabel={t("charges.form.submit")}
      submitDisabled={invalid}
      onSubmit={() => {
        if (!producer || invalid || category === "") return;
        const res = actions.recordExpense({
          producerId: producer.id,
          crop,
          category,
          amount: value,
          date: day,
          label,
        });
        if (!res.ok) return void toast.error(res.error);
        toast.success(t("charges.form.done"), {
          description: t("charges.form.doneDetail", {
            name: fullName(producer),
            amount: nf.format(value),
          }),
        });
        onRecorded?.(res.id);
        onOpenChange(false);
      }}
    >
      <h3 className="text-sm font-semibold">{t("charges.form.step1")}</h3>
      <FormField label={t("charges.form.producer")} required hint={t("charges.form.producerHint")}>
        {(c) => (
          <div className="grid gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                {...c}
                placeholder={t("charges.form.findPlaceholder")}
                value={find}
                onChange={(e) => setFind(e.target.value)}
                className="pl-8"
              />
            </div>
            <ul className="grid gap-1.5" aria-label={t("charges.form.findAria")}>
              {listed.length ? (
                listed.map((p) => {
                  const on = p.id === pid;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => onPick(p)}
                        className={cn(
                          "flex min-h-11 w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          on
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-card hover:bg-muted",
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block font-semibold">{fullName(p)}</span>
                          <span
                            className={cn(
                              "block text-xs",
                              on ? "text-primary-foreground" : "text-muted-foreground",
                            )}
                          >
                            {p.code} · {p.village}
                          </span>
                        </span>
                        {on && <Check className="size-4 shrink-0" aria-hidden />}
                      </button>
                    </li>
                  );
                })
              ) : (
                <li className="px-1 py-1 text-sm text-muted-foreground">
                  {t("charges.form.noProducer")}
                </li>
              )}
            </ul>
          </div>
        )}
      </FormField>
      {producer && (
        <p className="sr-only" role="status">
          {t("charges.form.chosen", { name: fullName(producer), code: producer.code })}
        </p>
      )}

      <h3 className="border-t pt-4 text-sm font-semibold">{t("charges.form.step2")}</h3>
      <FormField
        label={t("charges.form.crop")}
        required
        error={errorOf("crop")}
        hint={producer ? undefined : t("charges.form.cropFirst")}
      >
        {(c) => (
          <Select
            value={crop}
            onValueChange={(v) => {
              setCrop(v);
              touch("crop");
            }}
            disabled={!producer}
          >
            <SelectTrigger {...c}>
              <SelectValue placeholder={t("charges.form.cropChoose")} />
            </SelectTrigger>
            <SelectContent>
              {cropChoices.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>

      <fieldset className="space-y-1.5">
        <legend className="text-sm font-medium">
          {t("charges.form.category")}{" "}
          <span className="font-normal text-muted-foreground">{t("field.required")}</span>
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {EXPENSE_CATEGORIES.map((k) => {
            const on = category === k;
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setCategory(k);
                  touch("category");
                }}
                className={cn(
                  "flex min-h-12 items-center justify-center gap-1.5 rounded-md border px-2 py-2 text-center text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card hover:bg-muted",
                )}
              >
                {on && <Check className="size-4 shrink-0" aria-hidden />}
                {t(EXPENSE_CATEGORY_LABEL[k])}
              </button>
            );
          })}
        </div>
        <p
          className={cn(
            "text-xs",
            errorOf("category") ? "text-danger-fg" : "text-muted-foreground",
          )}
          role="status"
        >
          {errorOf("category") ?? (category ? t(EXPENSE_CATEGORY_TIP[category]) : "")}
        </p>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
        <FormField
          label={t("charges.form.amount")}
          required
          hint={t("charges.form.amountHint")}
          error={errorOf("amount")}
        >
          {(c) => (
            <Input
              {...c}
              value={amount}
              inputMode="numeric"
              placeholder="45000"
              onChange={(e) => {
                setAmount(e.target.value);
                touch("amount");
              }}
              onBlur={() => touch("amount")}
            />
          )}
        </FormField>
        <FormField label={t("charges.form.date")} required error={errorOf("date")}>
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
      </div>

      <FormField label={t("charges.form.label")} hint={t("charges.form.labelHint")}>
        {(c) => (
          <Input
            {...c}
            value={label}
            placeholder={t("charges.form.labelPlaceholder")}
            onChange={(e) => setLabel(e.target.value)}
          />
        )}
      </FormField>
    </FormDialog>
  );
}

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { ReasonDialog } from "@/components/app/ReasonDialog";
import {
  CATEGORY_LABEL,
  KIND_LABEL,
  UNIT_LABEL,
  useStockFormat,
} from "@/components/app/StockLabels";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actions } from "@/lib/store";
import { lotBalance, lotIssues, movementIssues } from "@/lib/commerce";
import {
  INPUT_CATEGORIES,
  INPUT_UNITS,
  MOVEMENT_KINDS,
  type InputCategory,
  type InputItem,
  type InputUnit,
  type MovementKind,
  type StockLot,
  type StockMovement,
} from "@/lib/mock/commerce";
import type { Member } from "@/lib/mock/cooperative";
import { useI18n } from "@/lib/i18n";

const NEW_ITEM = "__nouveau";

/** « 1,5 » ou « 1.5 » : un champ vide n'est pas un nombre (NaN), jamais 0. */
const toNum = (v: string) => {
  const s = v.replace(/\s/g, "").replace(",", ".");
  return s === "" ? Number.NaN : Number(s);
};
const isDay = (d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d));

function useTouched() {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  return {
    touch: (f: string) => setTouched((p) => (p[f] ? p : { ...p, [f]: true })),
    shown: (f: string) => !!touched[f],
  };
}

/** Réception d'un lot : intrant du catalogue (ou nouvel intrant), puis les informations du lot. */
export function ReceiveLotDialog({
  scoops,
  items,
  today,
  initial,
  onClose,
}: {
  scoops: { id: string; name: string }[];
  items: InputItem[];
  today: string;
  initial?: { itemId?: string; scoopId?: string };
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [scoopId, setScoopId] = useState(initial?.scoopId ?? scoops[0]?.id ?? "");
  const [itemId, setItemId] = useState(initial?.itemId ?? items[0]?.id ?? NEW_ITEM);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<InputCategory>("semences");
  const [unit, setUnit] = useState<InputUnit>("kg");
  const [alertBelow, setAlertBelow] = useState("0");
  const [lotNumber, setLotNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [receivedAt, setReceivedAt] = useState(today);
  const [expiresAt, setExpiresAt] = useState("");
  const { touch, shown } = useTouched();

  const isNew = itemId === NEW_ITEM;
  const q = toNum(quantity);
  const price = toNum(unitPrice);
  const threshold = toNum(alertBelow);
  const issues = lotIssues(
    {
      lotNumber,
      quantity: q,
      unitPrice: price,
      supplier,
      receivedAt,
      expiresAt: expiresAt || null,
    },
    today,
  );
  const itemOk = !isNew || (name.trim().length > 0 && threshold >= 0);
  const invalid = issues.length > 0 || !itemOk || !scoopId;

  const receivedBad = !isDay(receivedAt) || receivedAt > today;
  const expiryBad = !!expiresAt && (!isDay(expiresAt) || (!receivedBad && expiresAt < receivedAt));
  const err = (f: string, bad: boolean, message: string) => (shown(f) && bad ? message : undefined);
  const handlers = (f: string, set: (v: string) => void) => ({
    onChange: (e: { target: { value: string } }) => {
      set(e.target.value);
      touch(f);
    },
    onBlur: () => touch(f),
  });

  const submit = () => {
    if (invalid) return;
    let useItem = itemId;
    if (isNew) {
      const added = actions.addInputItem({
        name,
        category,
        unit,
        alertBelow: threshold,
      });
      if (!added.ok) return void toast.error(added.error);
      useItem = added.id;
    }
    const res = actions.receiveLot({
      scoopId,
      itemId: useItem,
      lotNumber,
      quantity: q,
      unitPrice: price,
      supplier,
      receivedAt,
      expiresAt: expiresAt || null,
    });
    if (res.ok) {
      toast.success(t("stocks.receive.toast", { lot: lotNumber.trim() }));
      onClose();
    } else toast.error(res.error);
  };

  const chosenUnit = isNew ? unit : (items.find((i) => i.id === itemId)?.unit ?? "kg");

  return (
    <FormDialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={t("stocks.receive.title")}
      description={t("stocks.receive.description")}
      cancelLabel={t("stocks.cancel")}
      submitLabel={t("stocks.receive.submit")}
      submitDisabled={invalid}
      onSubmit={submit}
      size="md"
      footerNote={t("stocks.receive.footer")}
    >
      {scoops.length > 1 && (
        <FormField label={t("stocks.receive.scoop")}>
          {(c) => (
            <Select value={scoopId} onValueChange={setScoopId}>
              <SelectTrigger id={c.id}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {scoops.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormField>
      )}
      <FormField label={t("stocks.receive.item")}>
        {(c) => (
          <Select value={itemId} onValueChange={setItemId}>
            <SelectTrigger id={c.id}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {items.map((i) => (
                <SelectItem key={i.id} value={i.id}>
                  {i.name}
                </SelectItem>
              ))}
              <SelectItem value={NEW_ITEM}>{t("stocks.receive.newItem")}</SelectItem>
            </SelectContent>
          </Select>
        )}
      </FormField>
      {isNew && (
        <fieldset className="grid gap-4 rounded-lg border bg-muted/40 p-3">
          <legend className="px-1 text-sm font-semibold">{t("stocks.receive.newItemTitle")}</legend>
          <FormField
            label={t("stocks.receive.itemName")}
            error={err("name", name.trim() === "", t("errors.stock.itemFields"))}
            required
          >
            {(c) => <Input {...c} value={name} {...handlers("name", setName)} />}
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label={t("stocks.receive.category")}>
              {(c) => (
                <Select value={category} onValueChange={(v) => setCategory(v as InputCategory)}>
                  <SelectTrigger id={c.id}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INPUT_CATEGORIES.map((k) => (
                      <SelectItem key={k} value={k}>
                        {t(CATEGORY_LABEL[k])}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormField>
            <FormField label={t("stocks.receive.unit")}>
              {(c) => (
                <Select value={unit} onValueChange={(v) => setUnit(v as InputUnit)}>
                  <SelectTrigger id={c.id}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INPUT_UNITS.map((u) => (
                      <SelectItem key={u} value={u}>
                        {t(UNIT_LABEL[u])}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormField>
          </div>
          <FormField
            label={t("stocks.receive.threshold")}
            hint={t("stocks.receive.thresholdHint")}
            error={err("threshold", !(threshold >= 0), t("stocks.error.threshold"))}
          >
            {(c) => (
              <Input
                {...c}
                value={alertBelow}
                {...handlers("threshold", setAlertBelow)}
                inputMode="decimal"
              />
            )}
          </FormField>
        </fieldset>
      )}
      <FormField
        label={t("stocks.receive.lotNumber")}
        hint={t("stocks.receive.lotNumberHint")}
        error={err("lotNumber", lotNumber.trim() === "", t("stocks.error.required"))}
        required
      >
        {(c) => <Input {...c} value={lotNumber} {...handlers("lotNumber", setLotNumber)} />}
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label={t("stocks.receive.quantity", { unit: t(UNIT_LABEL[chosenUnit]) })}
          error={err("quantity", !(q > 0), t("errors.stock.quantity"))}
          required
        >
          {(c) => (
            <Input
              {...c}
              value={quantity}
              {...handlers("quantity", setQuantity)}
              inputMode="decimal"
            />
          )}
        </FormField>
        <FormField
          label={t("stocks.receive.unitPrice")}
          error={err("unitPrice", !(price >= 0), t("stocks.error.price"))}
          required
        >
          {(c) => (
            <Input
              {...c}
              value={unitPrice}
              {...handlers("unitPrice", setUnitPrice)}
              inputMode="numeric"
            />
          )}
        </FormField>
      </div>
      <FormField
        label={t("stocks.receive.supplier")}
        error={err("supplier", supplier.trim() === "", t("stocks.error.required"))}
        required
      >
        {(c) => <Input {...c} value={supplier} {...handlers("supplier", setSupplier)} />}
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label={t("stocks.receive.receivedAt")}
          error={err("receivedAt", receivedBad, t("errors.stock.date"))}
          required
        >
          {(c) => (
            <Input
              {...c}
              type="date"
              max={today}
              value={receivedAt}
              {...handlers("receivedAt", setReceivedAt)}
            />
          )}
        </FormField>
        <FormField
          label={t("stocks.receive.expiresAt")}
          hint={t("stocks.receive.expiresAtHint")}
          error={err("expiresAt", expiryBad, t("stocks.error.expiry"))}
        >
          {(c) => (
            <Input {...c} type="date" value={expiresAt} {...handlers("expiresAt", setExpiresAt)} />
          )}
        </FormField>
      </div>
    </FormDialog>
  );
}

/** Sortie d'un lot : distribution à un membre, consommation ou perte. Jamais plus que le solde. */
export function MovementDialog({
  lot,
  item,
  movements,
  members,
  today,
  onClose,
}: {
  lot: StockLot;
  item: InputItem;
  movements: StockMovement[];
  members: Member[];
  today: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const fmt = useStockFormat();
  const [kind, setKind] = useState<MovementKind>("distribution");
  const [quantity, setQuantity] = useState("");
  const [memberId, setMemberId] = useState("");
  const [date, setDate] = useState(today);
  const [note, setNote] = useState("");
  const { touch, shown } = useTouched();

  const balance = lotBalance(lot, movements);
  const eligible = useMemo(
    () =>
      members
        .filter((m) => m.scoopId === lot.scoopId && m.status === "membre")
        .map((m) => ({ id: m.id, name: `${m.firstName} ${m.lastName}` }))
        .sort((a, b) => a.name.localeCompare(b.name, "fr")),
    [members, lot.scoopId],
  );
  const q = toNum(quantity);
  const issues = movementIssues(
    { quantity: q, kind, memberId: kind === "distribution" ? memberId || null : null, date },
    balance,
    today,
  );
  const has = (k: (typeof issues)[number]) => issues.includes(k);
  const invalid = issues.length > 0;
  const qtyKey = has("errors.stock.quantity")
    ? "errors.stock.quantity"
    : has("errors.stock.balance")
      ? "errors.stock.balance"
      : undefined;

  const submit = () => {
    if (invalid) return;
    const res = actions.recordMovement({
      lotId: lot.id,
      kind,
      quantity: q,
      memberId: kind === "distribution" ? memberId : null,
      date,
      note,
    });
    if (res.ok) {
      toast.success(t("stocks.move.toast"), {
        description: t("stocks.move.toastDetail", {
          quantity: fmt.qty(q, item.unit),
          lot: lot.lotNumber,
        }),
      });
      onClose();
    } else toast.error(res.error);
  };

  return (
    <FormDialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={t("stocks.move.title")}
      description={t("stocks.move.description", {
        item: item.name,
        lot: lot.lotNumber,
        balance: fmt.qty(balance, item.unit),
      })}
      cancelLabel={t("stocks.cancel")}
      submitLabel={t("stocks.move.submit")}
      submitDisabled={invalid}
      onSubmit={submit}
    >
      <FormField label={t("stocks.move.kind")}>
        {(c) => (
          <Select value={kind} onValueChange={(v) => setKind(v as MovementKind)}>
            <SelectTrigger id={c.id}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MOVEMENT_KINDS.map((k) => (
                <SelectItem key={k} value={k}>
                  {t(KIND_LABEL[k])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>
      <FormField
        label={t("stocks.move.quantity", { unit: t(UNIT_LABEL[item.unit]) })}
        hint={t("stocks.move.quantityHint", { balance: fmt.qty(balance, item.unit) })}
        error={shown("quantity") && qtyKey ? t(qtyKey) : undefined}
        required
      >
        {(c) => (
          <Input
            {...c}
            value={quantity}
            inputMode="decimal"
            onChange={(e) => {
              setQuantity(e.target.value);
              touch("quantity");
            }}
            onBlur={() => touch("quantity")}
          />
        )}
      </FormField>
      {kind === "distribution" && (
        <FormField
          label={t("stocks.move.member")}
          hint={eligible.length ? undefined : t("stocks.move.noMembers")}
          error={
            shown("member") && has("errors.stock.member") ? t("errors.stock.member") : undefined
          }
          required
        >
          {(c) => (
            <Select
              value={memberId}
              onValueChange={(v) => {
                setMemberId(v);
                touch("member");
              }}
              onOpenChange={(o) => !o && touch("member")}
            >
              <SelectTrigger id={c.id} aria-invalid={c["aria-invalid"]}>
                <SelectValue placeholder={t("stocks.move.memberPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {eligible.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormField>
      )}
      <FormField
        label={t("stocks.move.date")}
        error={shown("date") && has("errors.stock.date") ? t("errors.stock.date") : undefined}
        required
      >
        {(c) => (
          <Input
            {...c}
            type="date"
            max={today}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              touch("date");
            }}
            onBlur={() => touch("date")}
          />
        )}
      </FormField>
      <FormField label={t("stocks.move.note")}>
        {(c) => (
          <Input
            {...c}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("stocks.move.notePlaceholder")}
          />
        )}
      </FormField>
    </FormDialog>
  );
}

/** Annulation d'une sortie : motif obligatoire. La sortie reste visible, barrée, avec son motif. */
export function VoidMovementDialog({
  movement,
  lot,
  item,
  onClose,
}: {
  movement: StockMovement;
  lot: StockLot;
  item: InputItem;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const fmt = useStockFormat();

  return (
    <ReasonDialog
      title={t("stocks.void.title")}
      description={t("stocks.void.description", {
        kind: t(KIND_LABEL[movement.kind]),
        quantity: fmt.qty(movement.quantity, item.unit),
        lot: lot.lotNumber,
        date: fmt.day(movement.date),
      })}
      label={t("stocks.void.reason")}
      hint={t("stocks.void.reasonHint")}
      tooShortError={t("errors.stock.reason")}
      cancelLabel={t("stocks.void.back")}
      submitLabel={t("stocks.void.submit")}
      doneMessage={t("stocks.void.toast")}
      doneDescription={t("stocks.void.toastDetail", { lot: lot.lotNumber })}
      onSubmit={(reason) => actions.voidMovement(movement.id, reason)}
      onClose={onClose}
    />
  );
}

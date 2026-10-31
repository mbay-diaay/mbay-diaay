import { Plus, Trash2 } from "lucide-react";
import { FormField } from "@/components/app/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OPERATION_KINDS, type CalendarStep, type OperationKind } from "@/lib/mock/agronomy";
import { useI18n } from "@/lib/i18n";
import { OPERATION_KIND_LABEL } from "./CalendarKinds";

const toNumber = (v: string) => (v === "" ? Number.NaN : Number(v));
const shown = (n: number) => (Number.isFinite(n) ? n : "");

/** Liste éditable des étapes d'un brouillon : un bloc par étape, gros champs, lisible à 360 px. */
export function CalendarStepsEditor({
  steps,
  onChange,
}: {
  steps: CalendarStep[];
  onChange: (steps: CalendarStep[]) => void;
}) {
  const { t } = useI18n();
  const set = (id: string, patch: Partial<CalendarStep>) =>
    onChange(steps.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  return (
    <div>
      {steps.length === 0 && (
        <p className="mb-3 text-sm text-muted-foreground">{t("calendriers.steps.emptyWrite")}</p>
      )}
      <ul className="grid gap-3">
        {steps.map((s, i) => (
          <li
            key={s.id}
            aria-label={t("calendriers.steps.stepN", { n: i + 1 })}
            className="grid gap-3 rounded-md border p-3 sm:grid-cols-[2fr_1fr_1fr_auto]"
          >
            <FormField label={t("calendriers.field.kind")}>
              {(c) => (
                <Select
                  value={s.kind}
                  onValueChange={(v) => set(s.id, { kind: v as OperationKind })}
                >
                  <SelectTrigger id={c.id}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OPERATION_KINDS.map((k) => (
                      <SelectItem key={k} value={k}>
                        {t(OPERATION_KIND_LABEL[k])}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormField>
            <FormField label={t("calendriers.field.offset")}>
              {(c) => (
                <Input
                  {...c}
                  type="number"
                  inputMode="numeric"
                  step={1}
                  value={shown(s.offsetDays)}
                  onChange={(e) => set(s.id, { offsetDays: toNumber(e.target.value) })}
                />
              )}
            </FormField>
            <FormField label={t("calendriers.field.duration")}>
              {(c) => (
                <Input
                  {...c}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={shown(s.durationDays)}
                  onChange={(e) => set(s.id, { durationDays: toNumber(e.target.value) })}
                />
              )}
            </FormField>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="self-end"
              aria-label={t("calendriers.step.remove", { n: i + 1 })}
              onClick={() => onChange(steps.filter((x) => x.id !== s.id))}
            >
              <Trash2 className="size-4" />
            </Button>
            <div className="sm:col-span-4">
              <FormField label={t("calendriers.field.note")}>
                {(c) => (
                  <Input
                    {...c}
                    value={s.note}
                    placeholder={t("calendriers.field.note.placeholder")}
                    onChange={(e) => set(s.id, { note: e.target.value })}
                  />
                )}
              </FormField>
            </div>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        variant="outline"
        className="mt-3"
        onClick={() =>
          onChange([
            ...steps,
            {
              id: `s${Math.random().toString(36).slice(2, 8)}`,
              kind: "irrigation",
              offsetDays: 10,
              durationDays: 1,
              note: "",
            },
          ])
        }
      >
        <Plus className="size-4" />
        {t("calendriers.step.add")}
      </Button>
    </div>
  );
}

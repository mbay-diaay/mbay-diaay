import { FormField } from "@/components/app/FormField";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";

export interface MemberProfileValues {
  /** Texte saisi ; vide quand l'âge est inconnu. */
  age: string;
  handicap: boolean;
  village: string;
}

/** Âge valide : vide, ou entier de 15 à 100. */
// eslint-disable-next-line react-refresh/only-export-components
export function parseAge(raw: string): { ok: boolean; value: number | null } {
  const text = raw.trim();
  if (!text) return { ok: true, value: null };
  if (!/^\d{1,3}$/.test(text)) return { ok: false, value: null };
  const n = Number(text);
  return n >= 15 && n <= 100 ? { ok: true, value: n } : { ok: false, value: null };
}

/** Âge, village et situation de handicap : champs communs à l'ajout et à la modification d'un membre. */
export function MemberProfileFields({
  values,
  onChange,
}: {
  values: MemberProfileValues;
  onChange: (patch: Partial<MemberProfileValues>) => void;
}) {
  const { t } = useI18n();
  const ageError = parseAge(values.age).ok ? undefined : t("equipe.add.ageError");
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <FormField label={t("equipe.add.age")} hint={t("equipe.add.ageHint")} error={ageError}>
          {(c) => (
            <Input
              {...c}
              inputMode="numeric"
              value={values.age}
              onChange={(e) => onChange({ age: e.target.value })}
            />
          )}
        </FormField>
        <FormField label={t("equipe.add.handicap")}>
          {(c) => (
            <Select
              value={values.handicap ? "oui" : "non"}
              onValueChange={(v) => onChange({ handicap: v === "oui" })}
            >
              <SelectTrigger id={c.id}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="non">{t("equipe.add.handicap.non")}</SelectItem>
                <SelectItem value="oui">{t("equipe.add.handicap.oui")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        </FormField>
      </div>
      <FormField label={t("equipe.add.village")}>
        {(c) => (
          <Input
            {...c}
            value={values.village}
            onChange={(e) => onChange({ village: e.target.value })}
          />
        )}
      </FormField>
    </>
  );
}

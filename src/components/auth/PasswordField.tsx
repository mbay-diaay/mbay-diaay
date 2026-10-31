import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { evaluatePassword } from "@/lib/auth/policy";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: "current-password" | "new-password";
  placeholder?: string;
  /** Affiche la liste des règles et leur état pendant la saisie (création de mot de passe). */
  rulesFor?: string;
  invalid?: boolean;
  autoFocus?: boolean;
}

export function PasswordField({
  label,
  value,
  onChange,
  autoComplete,
  placeholder,
  rulesFor,
  invalid,
  autoFocus,
}: Props) {
  const t = useT();
  const id = useId();
  const [visible, setVisible] = useState(false);
  const rules = rulesFor !== undefined ? evaluatePassword(value, rulesFor) : [];
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={id}>{label}</Label>
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-controls={id}
          className="rounded text-xs font-semibold text-primary hover:underline pointer-coarse:py-2"
        >
          {visible ? t("auth.password.hide") : t("auth.password.show")}
        </button>
      </div>
      <Input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        aria-describedby={rules.length ? `${id}-rules` : undefined}
        autoFocus={autoFocus}
        spellCheck={false}
        autoCapitalize="none"
        className="h-touch"
      />
      {rules.length > 0 && (
        <ul id={`${id}-rules`} className="space-y-1 text-xs" aria-label={t("auth.password.rules")}>
          {rules.map((r) => (
            <li key={r.id} className={cn(r.ok ? "text-success-fg" : "text-muted-foreground")}>
              <span className="mr-1.5 inline-block w-14 font-semibold">
                {r.ok ? t("auth.password.ok") : t("auth.password.todo")}
              </span>
              {t(r.key, r.params)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

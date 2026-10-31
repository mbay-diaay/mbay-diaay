import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { Input } from "@/components/ui/input";
import { actions, useStore } from "@/lib/store";
import { scoopIssues, type ScoopField } from "@/lib/scoops";
import type { Scoop } from "@/lib/mock/data";
import { useI18n } from "@/lib/i18n";

/** Création (avec le gestionnaire) ou modification (nom, commune, code, région) d'une coopérative. */
export function ScoopFormDialog({
  open,
  onOpenChange,
  scoop,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Absente : création. */
  scoop?: Scoop | undefined;
}) {
  const { t } = useI18n();
  const editing = !!scoop;
  const scoops = useStore((s) => s.scoops);
  const users = useStore((s) => s.users);
  const members = useStore((s) => s.members);
  const [name, setName] = useState(scoop?.name ?? "");
  const [commune, setCommune] = useState(scoop?.commune ?? "");
  const [code, setCode] = useState(scoop?.code ?? "");
  const [region, setRegion] = useState(scoop?.region ?? "");
  const [createdAt, setCreatedAt] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState<Set<ScoopField>>(new Set());
  const touch = (f: ScoopField) => setTouched((s) => (s.has(f) ? s : new Set(s).add(f)));

  const issues = useMemo(
    () =>
      scoopIssues(
        { name, commune, code, manager: { firstName, lastName, email } },
        scoops,
        [...users.map((u) => u.email), ...members.map((m) => m.email)].filter(Boolean),
        { checkManager: !editing, ...(scoop && { ignore: scoop.id }) },
      ),
    [name, commune, code, firstName, lastName, email, scoops, users, members, editing, scoop],
  );
  const error = (f: ScoopField) => {
    const issue = issues.find((i) => i.field === f);
    return issue && touched.has(f) ? t(issue.key) : undefined;
  };
  const bind = (f: ScoopField, set: (v: string) => void) => ({
    onChange: (e: { target: { value: string } }) => {
      set(e.target.value);
      touch(f);
    },
    onBlur: () => touch(f),
  });

  const submit = () => {
    if (issues.length) return;
    if (scoop) {
      const res = actions.updateScoop(scoop.id, { name, commune, code, region });
      if (!res.ok) return void toast.error(res.error);
      toast.success(t("cooperatives.edit.done"));
    } else {
      const res = actions.createScoop({
        name,
        commune,
        code,
        manager: { firstName, lastName, email },
        ...(region.trim() && { region }),
        ...(createdAt && { createdAt }),
      });
      if (!res.ok) return void toast.error(res.error);
      toast.success(t("cooperatives.create.done", { email: email.trim() }));
    }
    onOpenChange(false);
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title={t(editing ? "cooperatives.edit.title" : "cooperatives.create.title")}
      description={t(editing ? "cooperatives.edit.description" : "cooperatives.create.description")}
      submitLabel={t(editing ? "cooperatives.edit.submit" : "cooperatives.create.submit")}
      cancelLabel={t("cooperatives.form.cancel")}
      submitDisabled={issues.length > 0}
      onSubmit={submit}
    >
      <FormField label={t("cooperatives.form.name")} required error={error("name")}>
        {(c) => (
          <Input
            {...c}
            value={name}
            placeholder={t("cooperatives.form.namePlaceholder")}
            autoComplete="off"
            {...bind("name", setName)}
          />
        )}
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={t("cooperatives.form.commune")} required error={error("commune")}>
          {(c) => <Input {...c} value={commune} {...bind("commune", setCommune)} />}
        </FormField>
        <FormField
          label={t("cooperatives.form.code")}
          required
          hint={t("cooperatives.form.codeHint")}
          error={error("code")}
        >
          {(c) => (
            <Input
              {...c}
              value={code}
              maxLength={5}
              autoComplete="off"
              className="uppercase"
              {...bind("code", (v) => setCode(v.toUpperCase()))}
            />
          )}
        </FormField>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label={`${t("cooperatives.form.region")} ${t("cooperatives.form.regionOptional")}`}
        >
          {(c) => <Input {...c} value={region} onChange={(e) => setRegion(e.target.value)} />}
        </FormField>
        {!editing && (
          <FormField
            label={`${t("cooperatives.form.createdAt")} ${t("cooperatives.form.regionOptional")}`}
          >
            {(c) => (
              <Input
                {...c}
                type="date"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
              />
            )}
          </FormField>
        )}
      </div>
      {!editing && (
        <fieldset className="grid gap-4 rounded-lg border p-4">
          <legend className="px-1 text-sm font-semibold">{t("cooperatives.form.manager")}</legend>
          <p className="-mt-2 text-xs text-muted-foreground">
            {t("cooperatives.form.managerHint")}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label={t("cooperatives.form.managerFirstName")}
              required
              error={error("managerFirstName")}
            >
              {(c) => (
                <Input
                  {...c}
                  value={firstName}
                  autoComplete="off"
                  {...bind("managerFirstName", setFirstName)}
                />
              )}
            </FormField>
            <FormField
              label={t("cooperatives.form.managerLastName")}
              required
              error={error("managerLastName")}
            >
              {(c) => (
                <Input
                  {...c}
                  value={lastName}
                  autoComplete="off"
                  {...bind("managerLastName", setLastName)}
                />
              )}
            </FormField>
          </div>
          <FormField
            label={t("cooperatives.form.managerEmail")}
            required
            error={error("managerEmail")}
          >
            {(c) => (
              <Input
                {...c}
                type="email"
                value={email}
                autoComplete="off"
                {...bind("managerEmail", setEmail)}
              />
            )}
          </FormField>
        </fieldset>
      )}
    </FormDialog>
  );
}

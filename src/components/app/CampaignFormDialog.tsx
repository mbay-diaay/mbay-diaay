import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { Input } from "@/components/ui/input";
import { actions, useStore } from "@/lib/store";
import { campaignIssues } from "@/lib/campaigns";
import type { Campaign } from "@/lib/mock/agronomy";
import { useI18n } from "@/lib/i18n";

type Field = "name" | "start" | "end";

/**
 * Création et modification d'une campagne. Une erreur n'apparaît qu'après la première saisie
 * ou la sortie du champ ; le bouton reste grisé tant que la saisie est invalide.
 */
export function CampaignFormDialog({
  campaign,
  nameLocked = false,
  onOpenChange,
}: {
  campaign?: Campaign;
  /** Des plans ou des parcelles renvoient au nom : il est en lecture seule. */
  nameLocked?: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useI18n();
  const campaigns = useStore((s) => s.campaigns);
  const [name, setName] = useState(campaign?.name ?? "");
  const [start, setStart] = useState(campaign?.start ?? "");
  const [end, setEnd] = useState(campaign?.end ?? "");
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    name: false,
    start: false,
    end: false,
  });
  const touch = (f: Field) => setTouched((s) => ({ ...s, [f]: true }));

  const issues = useMemo(
    () => campaignIssues({ name, start, end }, campaigns, campaign?.id),
    [name, start, end, campaigns, campaign?.id],
  );
  const errorOf = (f: Field) => {
    const i = issues.find((x) => x.field === f);
    return i && touched[f] ? t(i.key) : undefined;
  };

  const submit = () => {
    const input = { name, start, end };
    const res = campaign
      ? actions.updateCampaign(campaign.id, input)
      : actions.createCampaign(input);
    if (res.ok) {
      if (campaign) toast.success(t("campagnes.saved"));
      else toast.success(t("campagnes.created"), { description: t("campagnes.createdHint") });
      onOpenChange(false);
    } else toast.error(res.error);
  };

  return (
    <FormDialog
      open
      onOpenChange={onOpenChange}
      title={t(campaign ? "campagnes.form.editTitle" : "campagnes.form.createTitle")}
      description={t("campagnes.form.description")}
      submitLabel={t(campaign ? "campagnes.form.save" : "campagnes.form.create")}
      submitDisabled={issues.length > 0}
      onSubmit={submit}
      cancelLabel={t("campagnes.form.cancel")}
    >
      <FormField
        label={t("campagnes.form.name")}
        required
        error={nameLocked ? undefined : errorOf("name")}
        hint={t(nameLocked ? "campagnes.form.nameLocked" : "campagnes.form.nameHint")}
      >
        {(c) => (
          <Input
            {...c}
            value={name}
            readOnly={nameLocked}
            placeholder={t("campagnes.form.namePlaceholder")}
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value);
              touch("name");
            }}
            onBlur={() => touch("name")}
          />
        )}
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={t("campagnes.form.start")} required error={errorOf("start")}>
          {(c) => (
            <Input
              {...c}
              type="date"
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
                touch("start");
              }}
              onBlur={() => touch("start")}
            />
          )}
        </FormField>
        <FormField label={t("campagnes.form.end")} required error={errorOf("end")}>
          {(c) => (
            <Input
              {...c}
              type="date"
              value={end}
              onChange={(e) => {
                setEnd(e.target.value);
                touch("end");
              }}
              onBlur={() => touch("end")}
            />
          )}
        </FormField>
      </div>
    </FormDialog>
  );
}

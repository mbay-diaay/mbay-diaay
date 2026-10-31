import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { actions, useStore } from "@/lib/store";
import { blockingDossiers } from "@/lib/scoops";
import type { Scoop } from "@/lib/mock/data";
import { useI18n } from "@/lib/i18n";

/** Confirmation d'archivage, ou refus expliqué quand des dossiers sont encore en cours. */
export function ScoopArchiveDialog({
  scoop,
  onOpenChange,
}: {
  scoop: Scoop;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const dossiers = useStore((s) => s.dossiers);
  const users = useStore((s) => s.users);
  const blocked = useMemo(() => blockingDossiers(scoop.id, dossiers).length, [scoop.id, dossiers]);
  const accounts = useMemo(
    () =>
      users.filter(
        (u) =>
          u.active &&
          u.role !== "admin" &&
          (u.scoopId === scoop.id || (u.scoopIds?.length === 1 && u.scoopIds[0] === scoop.id)),
      ).length,
    [users, scoop.id],
  );

  if (blocked > 0)
    return (
      <FormDialog
        open
        onOpenChange={onOpenChange}
        title={t("cooperatives.blocked.title")}
        description={t("cooperatives.blocked.description.autre", {
          name: scoop.name,
          count: blocked,
        })}
        submitLabel={t("cooperatives.blocked.submit")}
        cancelLabel={t("cooperatives.blocked.close")}
        onSubmit={() => {
          onOpenChange(false);
          void navigate({ to: "/dossiers", search: { scoop: scoop.id } });
        }}
      />
    );

  return (
    <FormDialog
      open
      onOpenChange={onOpenChange}
      destructive
      title={t("cooperatives.archive.title")}
      description={t("cooperatives.archive.description", { name: scoop.name })}
      submitLabel={t("cooperatives.archive.submit")}
      cancelLabel={t("cooperatives.form.cancel")}
      onSubmit={() => {
        const res = actions.archiveScoop(scoop.id);
        if (!res.ok) return void toast.error(res.error);
        toast.success(t("cooperatives.archive.done"), {
          description: t("cooperatives.archive.doneAccounts.autre", { count: res.closedAccounts }),
        });
        onOpenChange(false);
      }}
    >
      <p className="text-sm font-medium">
        {accounts > 0
          ? t("cooperatives.archive.accounts.autre", { count: accounts })
          : t("cooperatives.archive.noAccounts")}
      </p>
    </FormDialog>
  );
}

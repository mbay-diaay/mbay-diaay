import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { actions } from "@/lib/store";
import type { Meeting, Member } from "@/lib/mock/cooperative";
import { useI18n } from "@/lib/i18n";

/** Pointage des présents : marque la réunion comme tenue. À monter seulement quand il est ouvert. */
export function MeetingAttendanceDialog({
  open,
  onOpenChange,
  meeting,
  members,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  meeting: Meeting;
  members: Member[];
}) {
  const { t } = useI18n();
  const sorted = useMemo(
    () =>
      [...members].sort((a, b) =>
        `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`, "fr"),
      ),
    [members],
  );
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const all = sorted.length > 0 && checked.size === sorted.length;
  const toggle = (id: string, on: boolean) =>
    setChecked((s) => {
      const n = new Set(s);
      if (on) n.add(id);
      else n.delete(id);
      return n;
    });

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title={t("reunions.attendance.title")}
      description={t("reunions.attendance.description")}
      submitLabel={t("reunions.attendance.submit")}
      submitDisabled={!checked.size}
      onSubmit={() => {
        const res = actions.holdMeeting(meeting.id, [...checked]);
        if (!res.ok) return void toast.error(res.error);
        toast.success(t("reunions.attendance.done"));
        onOpenChange(false);
      }}
      footerNote={!checked.size ? t("reunions.attendance.none") : undefined}
    >
      {sorted.length ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold" aria-live="polite">
              {t("reunions.attendance.counter", { present: checked.size, total: sorted.length })}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setChecked(all ? new Set() : new Set(sorted.map((m) => m.id)))}
            >
              {all ? t("reunions.attendance.uncheckAll") : t("reunions.attendance.checkAll")}
            </Button>
          </div>
          <ul
            aria-label={t("reunions.attendance.listAria")}
            className="max-h-[50vh] divide-y overflow-y-auto rounded-md border"
          >
            {sorted.map((m) => (
              <li key={m.id}>
                <Label
                  htmlFor={`pres-${m.id}`}
                  className="flex min-h-12 cursor-pointer items-center gap-3 px-3 py-2 text-sm font-normal hover:bg-muted/60"
                >
                  <Checkbox
                    id={`pres-${m.id}`}
                    checked={checked.has(m.id)}
                    onCheckedChange={(v) => toggle(m.id, v === true)}
                  />
                  <span>
                    {m.firstName} {m.lastName}
                  </span>
                </Label>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">{t("reunions.attendance.noMembers")}</p>
      )}
    </FormDialog>
  );
}

import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { MEETING_KIND_LABEL } from "@/components/app/MeetingKinds";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { actions, useStore, useScoops } from "@/lib/store";
import { inScope } from "@/lib/scope";
import { MEETING_KINDS, type Meeting, type MeetingKind } from "@/lib/mock/cooperative";
import { useI18n } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");
/** ISO vers la valeur d'un champ « date et heure » (heure locale). */
const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/** Création (sans `meeting`) ou modification d'une réunion planifiée. À monter seulement quand il est ouvert. */
export function MeetingFormDialog({
  open,
  onOpenChange,
  meeting,
  defaultScoopId,
  defaultDate,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  meeting?: Meeting;
  defaultScoopId?: string | undefined;
  /** Jour choisi dans le calendrier : la réunion est proposée ce jour-là à 9 h. */
  defaultDate?: Date | undefined;
}) {
  const allScoops = useScoops();
  const { t } = useI18n();
  const navigate = useNavigate();
  const session = useStore((s) => s.session);
  const scoops = useMemo(
    () => allScoops.filter((s) => inScope([{ scoopId: s.id }], session).length === 1),
    [allScoops, session],
  );
  const [scoopId, setScoopId] = useState(
    meeting?.scoopId ??
      (scoops.some((s) => s.id === defaultScoopId) ? defaultScoopId : scoops[0]?.id) ??
      "",
  );
  const [kind, setKind] = useState<MeetingKind>(meeting?.kind ?? "assemblée générale");
  const [title, setTitle] = useState(meeting?.title ?? "");
  const [date, setDate] = useState(
    meeting
      ? toLocalInput(meeting.date)
      : defaultDate
        ? toLocalInput(
            new Date(
              defaultDate.getFullYear(),
              defaultDate.getMonth(),
              defaultDate.getDate(),
              9,
              0,
            ).toISOString(),
          )
        : "",
  );
  const [place, setPlace] = useState(meeting?.place ?? "");
  const [agenda, setAgenda] = useState(meeting?.agenda.join("\n") ?? "");
  const [tried, setTried] = useState(false);

  const errTitle = !title.trim() ? t("reunions.form.errorTitle") : undefined;
  const errDate = !date ? t("reunions.form.errorDate") : undefined;
  const errPlace = !place.trim() ? t("reunions.form.errorPlace") : undefined;

  const submit = () => {
    setTried(true);
    if (errTitle || errDate || errPlace) return;
    const lines = agenda.split("\n");
    if (meeting) {
      const res = actions.updateMeeting(meeting.id, {
        kind,
        title,
        date,
        place,
        agenda: lines.map((l) => l.trim()).filter(Boolean),
      });
      if (!res.ok) return void toast.error(res.error);
      toast.success(t("reunions.form.saved"));
      onOpenChange(false);
      return;
    }
    const res = actions.createMeeting({ scoopId, kind, title, date, place, agenda: lines });
    if (!res.ok) return void toast.error(res.error);
    toast.success(t("reunions.form.created"));
    onOpenChange(false);
    void navigate({ to: "/reunions/$id", params: { id: res.id } });
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title={meeting ? t("reunions.form.editTitle") : t("reunions.form.createTitle")}
      description={
        meeting ? t("reunions.form.editDescription") : t("reunions.form.createDescription")
      }
      submitLabel={meeting ? t("reunions.form.save") : t("reunions.form.create")}
      onSubmit={submit}
    >
      {!meeting && scoops.length > 1 && (
        <FormField label={t("reunions.form.scoop")} required>
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
      <FormField label={t("reunions.form.kind")} required>
        {(c) => (
          <Select value={kind} onValueChange={(v) => setKind(v as MeetingKind)}>
            <SelectTrigger id={c.id}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MEETING_KINDS.map((k) => (
                <SelectItem key={k} value={k}>
                  {t(MEETING_KIND_LABEL[k])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>
      <FormField
        label={t("reunions.form.title")}
        hint={t("reunions.form.titleHint")}
        error={tried ? errTitle : undefined}
        required
      >
        {(c) => <Input {...c} value={title} onChange={(e) => setTitle(e.target.value)} />}
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={t("reunions.form.date")} error={tried ? errDate : undefined} required>
          {(c) => (
            <Input
              {...c}
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          )}
        </FormField>
        <FormField label={t("reunions.form.place")} error={tried ? errPlace : undefined} required>
          {(c) => <Input {...c} value={place} onChange={(e) => setPlace(e.target.value)} />}
        </FormField>
      </div>
      <FormField label={t("reunions.form.agenda")} hint={t("reunions.form.agendaHint")}>
        {(c) => (
          <Textarea {...c} rows={4} value={agenda} onChange={(e) => setAgenda(e.target.value)} />
        )}
      </FormField>
    </FormDialog>
  );
}

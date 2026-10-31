import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowLeft,
  CalendarDays,
  CircleCheck,
  FileText,
  Pencil,
  Users,
  XCircle,
} from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState, Field, PageHeader, Pill } from "@/components/app/ui-bits";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { MeetingAttendanceDialog } from "@/components/app/MeetingAttendanceDialog";
import { MeetingFormDialog } from "@/components/app/MeetingFormDialog";
import {
  MEETING_KIND_LABEL,
  MEETING_STATUS_LABEL,
  MEETING_STATUS_TONE,
} from "@/components/app/MeetingKinds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { actions, useCan, useStore, useScoops } from "@/lib/store";
import { scopedMeetings, scopedMembers } from "@/lib/scope";
import { attendanceStats, canEditMinutes, isMeetingEditable } from "@/lib/meetings";
import type { Meeting } from "@/lib/mock/cooperative";
import { ReasonDialog } from "@/components/app/ReasonDialog";
import { fmtDate, fmtDateTime } from "@/lib/format";
import { useI18n, type MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/reunions/$id")({
  head: () => ({
    meta: [
      { title: "Réunion · Mbay Diaay" },
      {
        name: "description",
        content: "Ordre du jour, présence et procès-verbal d'une réunion de la coopérative.",
      },
      { property: "og:title", content: "Réunion · Mbay Diaay" },
      { property: "og:description", content: "Une réunion de la coopérative." },
    ],
  }),
  component: MeetingRoute,
});

function MeetingRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="meeting.read" area={t("reunions.detail.area")}>
      <MeetingPage />
    </AppShell>
  );
}

const HISTORY_LABEL: Record<string, MessageKey> = {
  créée: "reunions.detail.history.créée",
  modifiée: "reunions.detail.history.modifiée",
  tenue: "reunions.detail.history.tenue",
  annulée: "reunions.detail.history.annulée",
  "procès-verbal enregistré": "reunions.detail.history.procès-verbal enregistré",
  "procès-verbal validé": "reunions.detail.history.procès-verbal validé",
};

function MeetingPage() {
  const { t } = useI18n();
  const { id } = Route.useParams();
  const session = useStore((s) => s.session);
  const meetings = useStore((s) => s.meetings);
  const meeting = meetings.find((m) => m.id === id);
  const visible = !!meeting && scopedMeetings([meeting], session).length === 1;
  if (!meeting || !visible)
    return (
      <EmptyState icon={CalendarDays} title={t("reunions.detail.notFound.title")}>
        {t("reunions.detail.notFound.text")}
      </EmptyState>
    );
  return <Detail key={meeting.id} meeting={meeting} />;
}

type Dialog = "edit" | "hold" | "cancel" | null;

function Detail({ meeting }: { meeting: Meeting }) {
  const allScoops = useScoops();
  const { t } = useI18n();
  const session = useStore((s) => s.session);
  const members = useStore((s) => s.members);
  const canManage = useCan("meeting.manage");
  const [dialog, setDialog] = useState<Dialog>(null);

  const scoopMembers = useMemo(
    () =>
      scopedMembers(members, session).filter(
        (m) => m.scoopId === meeting.scoopId && m.status === "membre",
      ),
    [members, session, meeting.scoopId],
  );
  const close = () => setDialog(null);

  return (
    <>
      <Link
        to="/reunions"
        search={{ scoop: undefined }}
        className="mb-4 inline-flex min-h-10 items-center gap-1 rounded-md text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="size-4" />
        {t("reunions.detail.back")}
      </Link>
      <PageHeader
        eyebrow={t("reunions.detail.eyebrow", { kind: t(MEETING_KIND_LABEL[meeting.kind]) })}
        title={meeting.title}
        description={`${fmtDateTime(meeting.date)} · ${meeting.place}`}
        actions={
          <Pill tone={MEETING_STATUS_TONE[meeting.status]}>
            {t(MEETING_STATUS_LABEL[meeting.status])}
          </Pill>
        }
      />

      {meeting.status === "annulée" && (
        <p className="mb-4 rounded-md bg-muted p-4 text-sm">
          {t("reunions.detail.cancelledReason", { reason: meeting.cancelReason ?? "" })}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-6">
          <section className="surface p-5" aria-labelledby="agenda-title">
            <h2 id="agenda-title" className="font-semibold">
              {t("reunions.detail.agenda")}
            </h2>
            {meeting.agenda.length ? (
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
                {meeting.agenda.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ol>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                {t("reunions.detail.agendaNone")}
              </p>
            )}
            <dl className="mt-4 grid grid-cols-1 gap-4 border-t pt-4 text-sm sm:grid-cols-2">
              <Field label={t("reunions.detail.when")}>{fmtDateTime(meeting.date)}</Field>
              <Field label={t("reunions.detail.where")}>{meeting.place}</Field>
              <Field label={t("reunions.detail.scoop")}>
                {allScoops.find((s) => s.id === meeting.scoopId)?.name ?? ""}
              </Field>
            </dl>
          </section>

          {meeting.status === "tenue" && (
            <>
              <Attendance meeting={meeting} memberCount={scoopMembers.length} />
              <MinutesSection meeting={meeting} canManage={canManage} />
            </>
          )}
        </div>

        <div className="space-y-6">
          {canManage && meeting.status === "planifiée" && (
            <section className="surface p-5" aria-labelledby="actions-title">
              <h2 id="actions-title" className="font-semibold">
                {t("reunions.detail.actions")}
              </h2>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {isMeetingEditable(meeting) && (
                  <Button variant="outline" onClick={() => setDialog("edit")}>
                    <Pencil className="size-4" />
                    {t("reunions.detail.edit")}
                  </Button>
                )}
                <Button onClick={() => setDialog("hold")}>
                  <CircleCheck className="size-4" />
                  {t("reunions.detail.hold")}
                </Button>
                <Button variant="outline" onClick={() => setDialog("cancel")}>
                  <XCircle className="size-4" />
                  {t("reunions.detail.cancel")}
                </Button>
              </div>
            </section>
          )}

          {meeting.status === "tenue" && meeting.minutes && (
            <SignedCopy meeting={meeting} canManage={canManage} />
          )}

          <section className="surface p-5" aria-labelledby="hist-title">
            <h2 id="hist-title" className="font-semibold">
              {t("reunions.detail.history")}
            </h2>
            <ol className="mt-3 space-y-3 text-sm">
              {[...meeting.history].reverse().map((h, i) => (
                <li key={i} className="border-l-2 pl-3">
                  <div className="font-medium">
                    {HISTORY_LABEL[h.action] ? t(HISTORY_LABEL[h.action]!) : h.action}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t("reunions.detail.historyBy", { by: h.by, date: fmtDateTime(h.at) })}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      {dialog === "edit" && <MeetingFormDialog open onOpenChange={close} meeting={meeting} />}
      {dialog === "hold" && (
        <MeetingAttendanceDialog
          open
          onOpenChange={close}
          meeting={meeting}
          members={scoopMembers}
        />
      )}
      {dialog === "cancel" && <CancelDialog onClose={close} id={meeting.id} />}
    </>
  );
}

function CancelDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const { t } = useI18n();
  return (
    <ReasonDialog
      title={t("reunions.cancel.title")}
      description={t("reunions.cancel.description")}
      label={t("reunions.cancel.reason")}
      hint={t("reunions.cancel.reasonHint")}
      tooShortError={t("reunions.cancel.errorReason")}
      cancelLabel={t("reunions.cancel.keep")}
      submitLabel={t("reunions.cancel.submit")}
      doneMessage={t("reunions.cancel.done")}
      onSubmit={(reason) => actions.cancelMeeting(id, reason)}
      onClose={onClose}
    />
  );
}

function Attendance({ meeting, memberCount }: { meeting: Meeting; memberCount: number }) {
  const { t } = useI18n();
  const members = useStore((s) => s.members);
  const present = useMemo(
    () => members.filter((m) => meeting.presentIds.includes(m.id)),
    [members, meeting.presentIds],
  );
  const absent = useMemo(
    () =>
      members.filter(
        (m) =>
          m.scoopId === meeting.scoopId &&
          m.status === "membre" &&
          !meeting.presentIds.includes(m.id),
      ),
    [members, meeting.scoopId, meeting.presentIds],
  );
  const stats = attendanceStats(meeting, Math.max(memberCount, meeting.presentIds.length));
  const names = (list: typeof present) =>
    list.length
      ? list.map((m) => `${m.firstName} ${m.lastName}`).join(", ")
      : t("reunions.attendance.nobody");
  return (
    <section className="surface p-5" aria-labelledby="att-title">
      <h2 id="att-title" className="flex items-center gap-2 font-semibold">
        <Users className="size-4" aria-hidden />
        {t("reunions.attendance.sectionTitle")}
      </h2>
      <p className="mt-2 text-sm">
        {t("reunions.attendance.summary", {
          present: stats.present,
          absent: Math.max(stats.total - stats.present, 0),
        })}
        . {t("reunions.attendance.rate", { rate: stats.rate })}
      </p>
      <div className="mt-3 space-y-2 text-sm">
        <details className="rounded-md border p-3">
          <summary className="cursor-pointer font-medium">
            {t("reunions.attendance.presentList")} ({present.length})
          </summary>
          <p className="mt-2 text-muted-foreground">{names(present)}</p>
        </details>
        <details className="rounded-md border p-3">
          <summary className="cursor-pointer font-medium">
            {t("reunions.attendance.absentList")} ({absent.length})
          </summary>
          <p className="mt-2 text-muted-foreground">{names(absent)}</p>
        </details>
      </div>
    </section>
  );
}

function MinutesSection({ meeting, canManage }: { meeting: Meeting; canManage: boolean }) {
  const { t } = useI18n();
  const minutes = meeting.minutes;
  const editable = canManage && canEditMinutes(meeting);
  const [text, setText] = useState(minutes?.text ?? "");
  const [confirm, setConfirm] = useState(false);
  const [tried, setTried] = useState(false);
  const empty = !text.trim();
  const dirty = text !== (minutes?.text ?? "");

  const save = () => {
    setTried(true);
    if (empty) return false;
    const res = actions.saveMinutes(meeting.id, text);
    if (!res.ok) {
      toast.error(res.error);
      return false;
    }
    toast.success(t("reunions.minutes.saved"));
    return true;
  };
  const validate = () => {
    if (dirty) {
      const res = actions.saveMinutes(meeting.id, text);
      if (!res.ok) return void toast.error(res.error);
    }
    const res = actions.validateMinutes(meeting.id);
    if (!res.ok) return void toast.error(res.error);
    toast.success(t("reunions.minutes.validated"));
    setConfirm(false);
  };

  return (
    <section className="surface p-5" aria-labelledby="pv-title">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="pv-title" className="flex items-center gap-2 font-semibold">
          <FileText className="size-4" aria-hidden />
          {t("reunions.minutes.title")}
        </h2>
        <Pill tone={minutes?.status === "validé" ? "success" : minutes ? "warning" : "neutral"}>
          {minutes
            ? t(`reunions.minutes.status.${minutes.status}`)
            : t("reunions.minutes.status.none")}
        </Pill>
      </div>

      {editable ? (
        <div className="mt-3 space-y-3">
          <FormField
            label={t("reunions.minutes.text")}
            hint={t("reunions.minutes.textHint")}
            error={tried && empty ? t("reunions.minutes.emptyText") : undefined}
          >
            {(c) => (
              <Textarea {...c} rows={12} value={text} onChange={(e) => setText(e.target.value)} />
            )}
          </FormField>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button variant="outline" onClick={save}>
              {t("reunions.minutes.save")}
            </Button>
            <Button
              disabled={empty}
              onClick={() => {
                setTried(true);
                if (!empty) setConfirm(true);
              }}
            >
              <CircleCheck className="size-4" />
              {t("reunions.minutes.validate")}
            </Button>
          </div>
        </div>
      ) : minutes ? (
        <div className="mt-3 space-y-3">
          <p className="whitespace-pre-wrap break-words rounded-md bg-muted/60 p-4 text-sm">
            {minutes.text}
          </p>
          {minutes.status === "validé" && (
            <>
              <p className="text-sm font-medium">
                {t("reunions.minutes.validatedBy", {
                  by: minutes.validatedBy ?? "",
                  date: minutes.validatedAt ? fmtDate(minutes.validatedAt) : "",
                })}
              </p>
              <p className="text-xs text-muted-foreground">{t("reunions.minutes.lockedNote")}</p>
            </>
          )}
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">{t("reunions.minutes.readonlyNone")}</p>
      )}

      {confirm && (
        <FormDialog
          open
          onOpenChange={(o) => !o && setConfirm(false)}
          title={t("reunions.minutes.confirmTitle")}
          description={t("reunions.minutes.confirmDescription")}
          submitLabel={t("reunions.minutes.confirmSubmit")}
          onSubmit={validate}
          footerNote={dirty ? t("reunions.minutes.confirmUnsaved") : undefined}
        />
      )}
    </section>
  );
}

function SignedCopy({ meeting, canManage }: { meeting: Meeting; canManage: boolean }) {
  const { t } = useI18n();
  const documents = useStore((s) => s.documents);
  const [file, setFile] = useState<File | null>(null);
  const [tried, setTried] = useState(false);
  const doc = documents.find((d) => d.id === meeting.minutes?.documentId);

  const attach = () => {
    setTried(true);
    if (!file) return;
    const res = actions.attachMinutesDocument(meeting.id, {
      name: file.name,
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      mime: file.type || "application/octet-stream",
    });
    if (!res.ok) return void toast.error(res.error);
    toast.success(t("reunions.signed.attached"));
    setFile(null);
    setTried(false);
  };

  return (
    <section className="surface p-5" aria-labelledby="signed-title">
      <h2 id="signed-title" className="font-semibold">
        {t("reunions.signed.title")}
      </h2>
      {doc && (
        <p className="mt-2 break-words text-sm font-medium">
          {t("reunions.signed.current", { name: doc.name })}
        </p>
      )}
      {canManage && (
        <div className="mt-3 space-y-3">
          <p className="text-sm text-muted-foreground">{t("reunions.signed.description")}</p>
          <FormField
            label={t("reunions.signed.file")}
            hint={t("reunions.signed.fileHint")}
            error={tried && !file ? t("reunions.signed.pick") : undefined}
          >
            {(c) => (
              <Input
                {...c}
                key={doc?.id ?? "none"}
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            )}
          </FormField>
          <Button variant="outline" onClick={attach}>
            {t("reunions.signed.attach")}
          </Button>
        </div>
      )}
      <Link
        to="/documents"
        search={{ scoop: undefined }}
        className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
      >
        {t("reunions.signed.link")}
      </Link>
    </section>
  );
}

import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarDays, CalendarPlus, ExternalLink, Search } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState, PageHeader, Pill } from "@/components/app/ui-bits";
import { FilterPill } from "@/components/app/FilterPill";
import { RowActions } from "@/components/app/RowActions";
import { MeetingFormDialog } from "@/components/app/MeetingFormDialog";
import {
  MEETING_KIND_LABEL,
  MEETING_STATUS_LABEL,
  MEETING_STATUS_TONE,
} from "@/components/app/MeetingKinds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Segmented } from "@/components/ui/segmented";
import { EventCalendar } from "@/components/ui/event-calendar";
import type { CalendarEvent } from "@/lib/calendar";
import { MEETING_KINDS } from "@/lib/mock/cooperative";
import { useCan, useStore } from "@/lib/store";
import { scopedMeetings, scopedMembers } from "@/lib/scope";
import { attendanceStats, sortMeetings } from "@/lib/meetings";
import type { Meeting } from "@/lib/mock/cooperative";
import { fmtDateTime, nf } from "@/lib/format";
import { useI18n, type MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/reunions/")({
  validateSearch: (s: Record<string, unknown>) => ({
    scoop: typeof s["scoop"] === "string" ? (s["scoop"] as string) : undefined,
    ...(s["vue"] === "calendrier" ? { vue: "calendrier" as const } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Réunions et procès-verbaux · Mbay Diaay" },
      {
        name: "description",
        content: "Les assemblées et réunions de la coopérative, la présence et les procès-verbaux.",
      },
      { property: "og:title", content: "Réunions et procès-verbaux · Mbay Diaay" },
      { property: "og:description", content: "Réunions et procès-verbaux de la coopérative." },
    ],
  }),
  component: MeetingsRoute,
});

function MeetingsRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="meeting.read" area={t("reunions.area")}>
      <Meetings />
    </AppShell>
  );
}

type Filter = "tous" | "upcoming" | "held" | "cancelled" | "minutesTodo";
const FILTERS: { id: Exclude<Filter, "tous">; label: MessageKey; test: (m: Meeting) => boolean }[] =
  [
    { id: "upcoming", label: "reunions.filter.upcoming", test: (m) => m.status === "planifiée" },
    { id: "held", label: "reunions.filter.held", test: (m) => m.status === "tenue" },
    { id: "cancelled", label: "reunions.filter.cancelled", test: (m) => m.status === "annulée" },
    {
      id: "minutesTodo",
      label: "reunions.filter.minutesTodo",
      test: (m) => m.status === "tenue" && m.minutes?.status !== "validé",
    },
  ];

const MINUTES_LABEL = {
  none: "reunions.minutes.none",
  brouillon: "reunions.minutes.brouillon",
  validé: "reunions.minutes.validé",
} as const satisfies Record<string, MessageKey>;

function Meetings() {
  const { t } = useI18n();
  const g = Route.useSearch();
  const navigate = useNavigate();
  const session = useStore((s) => s.session);
  const meetings = useStore((s) => s.meetings);
  const members = useStore((s) => s.members);
  const canManage = useCan("meeting.manage");
  const [filter, setFilter] = useState<Filter>("tous");
  const [q, setQ] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [newDay, setNewDay] = useState<Date | undefined>();
  const view = g.vue === "calendrier" ? "calendrier" : "liste";

  const mine = useMemo(
    () =>
      sortMeetings(
        scopedMeetings(meetings, session).filter((m) => !g.scoop || m.scoopId === g.scoop),
        new Date().toISOString(),
      ),
    [meetings, session, g.scoop],
  );
  const memberCount = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of scopedMembers(members, session))
      if (m.status === "membre") counts.set(m.scoopId, (counts.get(m.scoopId) ?? 0) + 1);
    return counts;
  }, [members, session]);

  const needle = q.trim().toLowerCase();
  const active = FILTERS.find((f) => f.id === filter);
  const shown = mine.filter(
    (m) =>
      (!active || active.test(m)) &&
      (!needle || `${m.title} ${m.place}`.toLowerCase().includes(needle)),
  );

  const events = useMemo<CalendarEvent[]>(
    () =>
      shown.map((m) => {
        const start = new Date(m.date);
        return {
          id: m.id,
          title: m.title,
          start,
          end: new Date(start.getTime() + 2 * 3_600_000),
          tone: m.status === "planifiée" ? "info" : m.status === "tenue" ? "success" : "neutral",
          category: m.kind,
          subtitle: m.place,
          muted: m.status === "annulée",
        };
      }),
    [shown],
  );
  const categories = MEETING_KINDS.map((k) => [k, t(MEETING_KIND_LABEL[k])] as const);

  return (
    <>
      <PageHeader
        eyebrow={t("reunions.eyebrow")}
        title={t("reunions.title")}
        description={t("reunions.description")}
        actions={
          canManage ? (
            <Button onClick={() => setNewOpen(true)}>
              <CalendarPlus className="size-4" />
              {t("reunions.new")}
            </Button>
          ) : undefined
        }
      />
      <div className="surface mb-3 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="flex min-w-0 flex-wrap items-center gap-2"
            role="group"
            aria-label={t("reunions.filter.aria")}
          >
            <FilterPill
              active={filter === "tous"}
              onClick={() => setFilter("tous")}
              count={mine.length}
            >
              {t("reunions.filter.all")}
            </FilterPill>
            {FILTERS.map((f) => (
              <FilterPill
                key={f.id}
                active={filter === f.id}
                onClick={() => setFilter(filter === f.id ? "tous" : f.id)}
                count={mine.filter(f.test).length}
              >
                {t(f.label)}
              </FilterPill>
            ))}
          </div>
          <div className="mx-0.5 hidden h-6 w-px shrink-0 bg-border sm:block" aria-hidden />
          <Segmented
            ariaLabel={t("reunions.view.aria")}
            value={view}
            onChange={(v) =>
              void navigate({
                to: "/reunions",
                search: {
                  scoop: g.scoop,
                  ...(v === "calendrier" ? { vue: "calendrier" as const } : {}),
                },
                replace: true,
              })
            }
            options={[
              { value: "liste", label: t("reunions.view.list") },
              { value: "calendrier", label: t("reunions.view.calendar") },
            ]}
            size="sm"
          />
          <div className="relative ml-auto w-full sm:w-64">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label={t("reunions.search.aria")}
              placeholder={t("reunions.search.placeholder")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>
      {view === "calendrier" ? (
        <div className="surface p-3 sm:p-4">
          <EventCalendar
            events={events}
            categories={categories}
            onEventClick={(e) => void navigate({ to: "/reunions/$id", params: { id: e.id } })}
            {...(canManage ? { onDayCreate: (day: Date) => setNewDay(day) } : {})}
          />
        </div>
      ) : (
        <div className="surface overflow-x-auto">
          {shown.length ? (
            <table className="w-full text-sm">
              <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">{t("reunions.col.title")}</th>
                  <th className="font-semibold">{t("reunions.col.status")}</th>
                  <th className="hidden font-semibold sm:table-cell">{t("reunions.col.date")}</th>
                  <th className="hidden font-semibold lg:table-cell">{t("reunions.col.place")}</th>
                  <th className="hidden font-semibold md:table-cell">
                    {t("reunions.col.attendance")}
                  </th>
                  <th className="hidden font-semibold md:table-cell">
                    {t("reunions.col.minutes")}
                  </th>
                  <th className="w-12 pr-4" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {shown.map((m) => (
                  <Row key={m.id} meeting={m} memberCount={memberCount.get(m.scoopId) ?? 0} />
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState icon={CalendarDays} title={t("reunions.empty.title")}>
              {mine.length
                ? t("reunions.empty.filtered")
                : canManage
                  ? t("reunions.empty.create")
                  : t("reunions.empty.readonly")}
            </EmptyState>
          )}
        </div>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        {t("reunions.count", { shown: nf.format(shown.length), total: nf.format(mine.length) })}
      </p>
      {newOpen && <MeetingFormDialog open onOpenChange={setNewOpen} defaultScoopId={g.scoop} />}
      {newDay && (
        <MeetingFormDialog
          open
          onOpenChange={(o) => !o && setNewDay(undefined)}
          defaultScoopId={g.scoop}
          defaultDate={newDay}
        />
      )}
    </>
  );
}

function Row({ meeting: m, memberCount }: { meeting: Meeting; memberCount: number }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const open = () => void navigate({ to: "/reunions/$id", params: { id: m.id } });
  const stats = attendanceStats(m, memberCount);
  const minutes = m.minutes?.status ?? "none";
  return (
    <tr
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => e.key === "Enter" && open()}
      className="cursor-pointer hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
    >
      <td className="px-4 py-2.5">
        <div className="font-semibold">{m.title}</div>
        <div className="text-xs text-muted-foreground">
          {t(MEETING_KIND_LABEL[m.kind])}
          <span className="sm:hidden"> · {fmtDateTime(m.date)}</span>
        </div>
      </td>
      <td>
        <Pill tone={MEETING_STATUS_TONE[m.status]}>{t(MEETING_STATUS_LABEL[m.status])}</Pill>
      </td>
      <td className="hidden whitespace-nowrap sm:table-cell">{fmtDateTime(m.date)}</td>
      <td className="hidden lg:table-cell">{m.place}</td>
      <td className="hidden md:table-cell">
        {m.status === "tenue"
          ? t("reunions.attendance.autre", { count: stats.present, total: stats.total })
          : null}
      </td>
      <td className="hidden md:table-cell">
        {m.status === "tenue" ? (
          <Pill
            tone={
              minutes === "validé" ? "success" : minutes === "brouillon" ? "warning" : "neutral"
            }
          >
            {t(MINUTES_LABEL[minutes])}
          </Pill>
        ) : null}
      </td>
      <td className="pr-4 text-right">
        <RowActions
          title={m.title}
          items={[{ label: t("reunions.row.open"), icon: ExternalLink, onSelect: open }]}
        />
      </td>
    </tr>
  );
}

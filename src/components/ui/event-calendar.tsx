import { useMemo, useState } from "react";
import { format, isSameDay, isSameMonth, isToday } from "date-fns";
import { fr as frLocale } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { ALL, FilterSelect } from "@/components/app/FilterSelect";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { useI18n } from "@/lib/i18n";
import {
  eventsInRange,
  eventsOnDay,
  groupByDay,
  monthGrid,
  shiftDate,
  visibleRange,
  weekDays,
  type CalendarEvent,
  type CalendarTone,
  type CalendarView,
} from "@/lib/calendar";
import { cn } from "@/lib/utils";

const VIEWS: CalendarView[] = ["month", "week", "day", "list"];

/** Couleurs par ton : uniquement des jetons du projet, la charte graphique reste modifiable à un seul endroit. */
const TONE: Record<CalendarTone, { card: string; dot: string }> = {
  primary: { card: "border-l-primary bg-primary-soft text-foreground", dot: "bg-primary" },
  info: { card: "border-l-info bg-info-bg text-info-fg", dot: "bg-info" },
  success: { card: "border-l-success bg-success-bg text-success-fg", dot: "bg-success" },
  warning: { card: "border-l-warning bg-warning-bg text-warning-fg", dot: "bg-warning" },
  danger: { card: "border-l-danger bg-danger-bg text-danger-fg", dot: "bg-danger" },
  neutral: {
    card: "border-l-border-strong bg-muted text-muted-foreground",
    dot: "bg-border-strong",
  },
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const hhmm = (d: Date) => format(d, "HH:mm");

export interface EventCalendarProps {
  events: readonly CalendarEvent[];
  /** Types d'événement proposés au filtre : [clé, libellé]. Sans liste, pas de filtre. */
  categories?: readonly (readonly [string, string])[];
  onEventClick?: (event: CalendarEvent) => void;
  /** Affiche « Ajouter un événement ce jour » sur le jour sélectionné. */
  onDayCreate?: (day: Date) => void;
  defaultView?: CalendarView;
  defaultDate?: Date;
  className?: string;
}

/**
 * Agenda en quatre vues (mois, semaine, jour, liste) avec filtre par type.
 * Pensé pour le téléphone : sur un petit écran le mois montre des points, et le détail du jour
 * sélectionné s'affiche dessous ; les semaines se lisent jour par jour.
 */
export function EventCalendar({
  events,
  categories,
  onEventClick,
  onDayCreate,
  defaultView = "month",
  defaultDate,
  className,
}: EventCalendarProps) {
  const { t } = useI18n();
  const [view, setView] = useState<CalendarView>(defaultView);
  const [date, setDate] = useState<Date>(defaultDate ?? new Date());
  const [selected, setSelected] = useState<Date>(defaultDate ?? new Date());
  const [category, setCategory] = useState(ALL);

  const shown = useMemo(
    () => (category === ALL ? events : events.filter((e) => e.category === category)),
    [events, category],
  );
  const range = visibleRange(date, view);
  const inPeriod = eventsInRange(shown, range.from, range.to);

  const title = (() => {
    if (view === "day") return cap(format(date, "EEEE d MMMM yyyy", { locale: frLocale }));
    if (view === "week") {
      const days = weekDays(date);
      return t("calendrier.weekOf", {
        from: format(days[0]!, "d MMMM", { locale: frLocale }),
        to: format(days[6]!, "d MMMM yyyy", { locale: frLocale }),
      });
    }
    return cap(format(date, "MMMM yyyy", { locale: frLocale }));
  })();

  const go = (direction: 1 | -1) => {
    const next = shiftDate(date, view, direction);
    setDate(next);
    setSelected(next);
  };
  const today = () => {
    const now = new Date();
    setDate(now);
    setSelected(now);
  };

  const card = (e: CalendarEvent, compact = false) => (
    <button
      key={e.id}
      type="button"
      onClick={() => onEventClick?.(e)}
      className={cn(
        "block w-full rounded-md border-l-4 px-2.5 text-left transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        compact ? "py-1 text-xs" : "py-2 text-sm",
        TONE[e.tone].card,
        e.muted && "opacity-60 line-through",
      )}
    >
      <span className="block truncate font-medium">{e.title}</span>
      <span className="block truncate text-xs opacity-80">
        {isSameDay(e.start, e.end)
          ? `${hhmm(e.start)} ${e.subtitle ? `· ${e.subtitle}` : ""}`.trim()
          : t("calendrier.multiDay", {
              from: format(e.start, "d MMM", { locale: frLocale }),
              to: format(e.end, "d MMM", { locale: frLocale }),
            })}
      </span>
    </button>
  );

  const dayPanel = (day: Date) => {
    const list = eventsOnDay(shown, day);
    return (
      <section
        className="surface mt-3 p-4"
        aria-label={t("calendrier.selectedDay", {
          date: format(day, "EEEE d MMMM", { locale: frLocale }),
        })}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">
            {t("calendrier.selectedDay", {
              date: format(day, "EEEE d MMMM", { locale: frLocale }),
            })}
          </h3>
          {onDayCreate && (
            <Button size="sm" variant="outline" onClick={() => onDayCreate(day)}>
              <Plus className="size-4" />
              {t("calendrier.addOnDay")}
            </Button>
          )}
        </div>
        {list.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("calendrier.empty.day")}</p>
        ) : (
          <div className="space-y-2">{list.map((e) => card(e))}</div>
        )}
      </section>
    );
  };

  const monthView = () => {
    const days = monthGrid(date);
    const head = weekDays(date);
    return (
      <>
        <div className="surface overflow-hidden">
          <div className="grid grid-cols-7 border-b bg-muted text-center text-xs font-medium text-muted-foreground">
            {head.map((d) => (
              <div key={d.getDay()} className="py-2">
                {cap(format(d, "EEE", { locale: frLocale }))}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day) => {
              const list = eventsOnDay(shown, day);
              const out = !isSameMonth(day, date);
              const isSel = isSameDay(day, selected);
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  aria-pressed={isSel}
                  aria-label={t(
                    list.length === 0 ? "calendrier.dayCell" : "calendrier.dayCell.events.autre",
                    {
                      date: format(day, "EEEE d MMMM yyyy", { locale: frLocale }),
                      count: list.length,
                    },
                  )}
                  onClick={() => setSelected(day)}
                  className={cn(
                    "flex min-h-14 flex-col items-stretch gap-1 border-b border-r p-1 text-left transition-colors last:border-r-0 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:min-h-24 md:p-1.5",
                    out && "bg-muted/40 text-muted-foreground",
                    isSel && "bg-primary-soft",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-6 place-items-center rounded-full text-xs tabular",
                      isToday(day) && "bg-primary font-semibold text-primary-foreground",
                    )}
                  >
                    {day.getDate()}
                  </span>
                  {/* Téléphone : des points. Écran large : les titres. */}
                  <span className="flex flex-wrap gap-0.5 md:hidden" aria-hidden>
                    {list.slice(0, 4).map((e) => (
                      <span key={e.id} className={cn("size-1.5 rounded-full", TONE[e.tone].dot)} />
                    ))}
                  </span>
                  <span className="hidden space-y-0.5 md:block" aria-hidden>
                    {list.slice(0, 2).map((e) => (
                      <span
                        key={e.id}
                        className={cn(
                          "block truncate rounded border-l-2 px-1 text-[11px]",
                          TONE[e.tone].card,
                          e.muted && "opacity-60 line-through",
                        )}
                      >
                        {e.title}
                      </span>
                    ))}
                    {list.length > 2 && (
                      <span className="block text-[11px] text-muted-foreground">
                        {t("calendrier.more", { count: list.length - 2 })}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        {dayPanel(selected)}
      </>
    );
  };

  const weekView = () => (
    <div className="grid gap-3 md:grid-cols-7">
      {weekDays(date).map((day) => {
        const list = eventsOnDay(shown, day);
        return (
          <section
            key={day.toISOString()}
            className={cn("surface min-w-0 p-3", isToday(day) && "border-primary")}
            aria-label={cap(format(day, "EEEE d MMMM", { locale: frLocale }))}
          >
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {cap(format(day, "EEE d", { locale: frLocale }))}
            </h3>
            {list.length === 0 ? (
              <p className="text-xs text-muted-foreground">{t("calendrier.empty.day")}</p>
            ) : (
              <div className="space-y-2">{list.map((e) => card(e, true))}</div>
            )}
          </section>
        );
      })}
    </div>
  );

  const dayView = () => {
    const list = eventsOnDay(shown, date);
    return (
      <section className="surface p-4">
        {list.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("calendrier.empty.day")}</p>
        ) : (
          <div className="space-y-2">{list.map((e) => card(e))}</div>
        )}
      </section>
    );
  };

  const listView = () => {
    const groups = groupByDay(inPeriod);
    if (groups.length === 0)
      return (
        <p className="surface p-5 text-sm text-muted-foreground">{t("calendrier.empty.period")}</p>
      );
    return (
      <div className="space-y-4">
        {groups.map((g) => (
          <section key={g.day.toISOString()}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {cap(format(g.day, "EEEE d MMMM", { locale: frLocale }))}
            </h3>
            <div className="space-y-2">{g.events.map((e) => card(e))}</div>
          </section>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("space-y-3", className)} role="region" aria-label={t("calendrier.region")}>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => go(-1)}
            aria-label={t("calendrier.prev")}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" onClick={today}>
            {t("calendrier.today")}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => go(1)}
            aria-label={t("calendrier.next")}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <h2 className="min-w-0 flex-1 text-lg font-semibold" aria-live="polite">
          {title}
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {t("calendrier.count.autre", { count: inPeriod.length })}
          </span>
        </h2>
        <Segmented
          ariaLabel={t("calendrier.views.aria")}
          size="sm"
          value={view}
          onChange={setView}
          options={VIEWS.map((v) => ({ value: v, label: t(`calendrier.view.${v}`) }))}
        />
      </div>
      {categories && categories.length > 0 && (
        <FilterSelect
          label={t("calendrier.filter.label")}
          allLabel={t("calendrier.filter.all")}
          placeholder={t("calendrier.filter.all")}
          value={category}
          onChange={setCategory}
          options={categories}
          className="sm:w-56"
        />
      )}
      {view === "month" && monthView()}
      {view === "week" && weekView()}
      {view === "day" && dayView()}
      {view === "list" && listView()}
    </div>
  );
}

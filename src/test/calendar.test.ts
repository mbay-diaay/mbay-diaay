import { describe, expect, it } from "vitest";
import {
  eventsInRange,
  eventsOnDay,
  groupByDay,
  monthGrid,
  shiftDate,
  visibleRange,
  weekDays,
  type CalendarEvent,
} from "@/lib/calendar";

const d = (iso: string) => new Date(iso);
const ev = (id: string, start: string, end: string): CalendarEvent => ({
  id,
  title: id,
  start: d(start),
  end: d(end),
  tone: "info",
});

describe("calendrier : calculs de dates", () => {
  it("la grille d'un mois a 42 jours et commence un lundi", () => {
    const grid = monthGrid(d("2026-10-15T10:00:00"));
    expect(grid).toHaveLength(42);
    expect(grid[0]!.getDay()).toBe(1);
    // Octobre 2026 commence un jeudi : la grille démarre le lundi 28 septembre.
    expect(grid[0]!.getDate()).toBe(28);
    expect(grid[0]!.getMonth()).toBe(8);
    expect(grid.some((x) => x.getMonth() === 9 && x.getDate() === 31)).toBe(true);
  });

  it("une semaine va du lundi au dimanche", () => {
    const days = weekDays(d("2026-10-25T12:00:00"));
    expect(days).toHaveLength(7);
    expect(days[0]!.getDay()).toBe(1);
    expect(days[6]!.getDay()).toBe(0);
    expect(days.map((x) => x.getDate())).toEqual([19, 20, 21, 22, 23, 24, 25]);
  });

  it("un événement de deux jours figure sur chacun d'eux, trié par heure", () => {
    const ag = ev("ag", "2026-11-05T09:00:00", "2026-11-06T17:00:00");
    const early = ev("tot", "2026-11-05T07:00:00", "2026-11-05T08:00:00");
    const events = [ag, early];
    expect(eventsOnDay(events, d("2026-11-05T00:00:00")).map((e) => e.id)).toEqual(["tot", "ag"]);
    expect(eventsOnDay(events, d("2026-11-06T12:00:00")).map((e) => e.id)).toEqual(["ag"]);
    expect(eventsOnDay(events, d("2026-11-07T12:00:00"))).toEqual([]);
  });

  it("la liste regroupe par jour et trie par date", () => {
    const groups = groupByDay([
      ev("b", "2026-11-06T10:00:00", "2026-11-06T11:00:00"),
      ev("a", "2026-11-05T14:00:00", "2026-11-05T15:00:00"),
      ev("a2", "2026-11-05T09:00:00", "2026-11-05T10:00:00"),
    ]);
    expect(groups.map((g) => g.events.map((e) => e.id))).toEqual([["a2", "a"], ["b"]]);
  });

  it("on avance d'un mois, d'une semaine ou d'un jour selon la vue", () => {
    const base = d("2026-10-31T10:00:00");
    expect(shiftDate(base, "month", 1).getMonth()).toBe(10);
    expect(shiftDate(base, "week", 1).getDate()).toBe(7);
    expect(shiftDate(base, "day", -1).getDate()).toBe(30);
    expect(shiftDate(base, "list", -1).getMonth()).toBe(8);
  });

  it("la période visible couvre le mois entier ou la semaine", () => {
    const month = visibleRange(d("2026-10-15T10:00:00"), "month");
    expect(month.from.getDate()).toBe(1);
    expect(month.to.getDate()).toBe(31);
    const events = [
      ev("dedans", "2026-10-31T10:00:00", "2026-10-31T11:00:00"),
      ev("dehors", "2026-11-01T10:00:00", "2026-11-01T11:00:00"),
    ];
    expect(eventsInRange(events, month.from, month.to).map((e) => e.id)).toEqual(["dedans"]);
    const week = visibleRange(d("2026-10-15T10:00:00"), "week");
    expect(week.from.getDay()).toBe(1);
    expect(week.to.getDay()).toBe(0);
  });
});

import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { LocaleProvider } from "@/lib/i18n";
import { EventCalendar } from "@/components/ui/event-calendar";
import type { CalendarEvent } from "@/lib/calendar";

const events: CalendarEvent[] = [
  {
    id: "ag",
    title: "Assemblée générale",
    start: new Date(2026, 10, 5, 9, 0),
    end: new Date(2026, 10, 5, 12, 0),
    tone: "info",
    category: "assemblée",
    subtitle: "Salle communale",
  },
  {
    id: "bureau",
    title: "Réunion de bureau",
    start: new Date(2026, 10, 12, 15, 0),
    end: new Date(2026, 10, 12, 16, 0),
    tone: "success",
    category: "bureau",
  },
  {
    id: "annulee",
    title: "Réunion annulée",
    start: new Date(2026, 10, 20, 10, 0),
    end: new Date(2026, 10, 20, 11, 0),
    tone: "neutral",
    category: "bureau",
    muted: true,
  },
];

const setup = (props: Partial<React.ComponentProps<typeof EventCalendar>> = {}) =>
  render(
    <LocaleProvider>
      <EventCalendar
        events={events}
        defaultDate={new Date(2026, 10, 5)}
        categories={[
          ["assemblée", "Assemblée générale"],
          ["bureau", "Bureau"],
        ]}
        {...props}
      />
    </LocaleProvider>,
  );

describe("EventCalendar", () => {
  it("affiche le mois, le nombre d'événements et le détail du jour sélectionné", () => {
    setup();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Novembre 2026");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("3 événements");
    const day = screen.getByRole("region", { name: /Le jeudi 5 novembre/i });
    expect(within(day).getByText("Assemblée générale")).toBeInTheDocument();
    expect(within(day).getByText(/09:00/)).toBeInTheDocument();
  });

  it("change de mois et revient à aujourd'hui", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Période suivante" }));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Décembre 2026");
    fireEvent.click(screen.getByRole("button", { name: "Période précédente" }));
    fireEvent.click(screen.getByRole("button", { name: "Période précédente" }));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Octobre 2026");
    fireEvent.click(screen.getByRole("button", { name: "Aujourd'hui" }));
    expect(screen.getByRole("heading", { level: 2 }).textContent).toMatch(/\d{4}/);
  });

  it("propose les quatre vues et affiche une liste chronologique", () => {
    setup();
    const views = screen.getByRole("radiogroup", { name: "Type d'affichage" });
    for (const label of ["Mois", "Semaine", "Jour", "Liste"])
      expect(within(views).getByRole("radio", { name: label })).toBeInTheDocument();
    fireEvent.click(within(views).getByRole("radio", { name: "Liste" }));
    const titles = screen.getAllByText(/Assemblée générale|Réunion de bureau|Réunion annulée/);
    expect(titles.map((t) => t.textContent)).toEqual([
      "Assemblée générale",
      "Réunion de bureau",
      "Réunion annulée",
    ]);
  });

  it("la vue semaine montre les sept jours et la vue jour dit quand il n'y a rien", () => {
    setup();
    const views = screen.getByRole("radiogroup", { name: "Type d'affichage" });
    fireEvent.click(within(views).getByRole("radio", { name: "Semaine" }));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Semaine du 2 novembre au 8 novembre 2026",
    );
    expect(screen.getByText("Assemblée générale")).toBeInTheDocument();
    fireEvent.click(within(views).getByRole("radio", { name: "Jour" }));
    fireEvent.click(screen.getByRole("button", { name: "Période suivante" }));
    expect(screen.getByText("Rien de prévu ce jour.")).toBeInTheDocument();
  });

  it("le filtre par type ne garde que les événements du type choisi", () => {
    setup();
    const views = screen.getByRole("radiogroup", { name: "Type d'affichage" });
    fireEvent.click(within(views).getByRole("radio", { name: "Liste" }));
    fireEvent.click(screen.getByRole("combobox", { name: "Type" }));
    fireEvent.click(screen.getByRole("option", { name: "Bureau" }));
    expect(screen.queryByText("Assemblée générale")).not.toBeInTheDocument();
    expect(screen.getByText("Réunion de bureau")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("2 événements");
  });

  it("un clic sur un événement le transmet, un jour vide propose d'en ajouter", () => {
    const onEventClick = vi.fn();
    const onDayCreate = vi.fn();
    setup({ onEventClick, onDayCreate });
    fireEvent.click(screen.getByRole("button", { name: /Assemblée générale/ }));
    expect(onEventClick).toHaveBeenCalledWith(expect.objectContaining({ id: "ag" }));
    fireEvent.click(screen.getByRole("button", { name: /^lundi 9 novembre 2026/i }));
    fireEvent.click(screen.getByRole("button", { name: "Ajouter un événement ce jour" }));
    expect(onDayCreate).toHaveBeenCalledTimes(1);
    expect(onDayCreate.mock.calls[0]![0].getDate()).toBe(9);
  });

  it("un événement annulé est atténué et barré", () => {
    setup();
    fireEvent.click(screen.getByRole("radio", { name: "Liste" }));
    const row = screen.getByText("Réunion annulée").closest("button");
    expect(row?.className).toMatch(/line-through/);
  });
});

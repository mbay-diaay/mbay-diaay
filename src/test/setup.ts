import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Horloge figée : les tests qui lisent « aujourd'hui » (échéances, campagnes, retards) ne doivent pas casser
// quand le calendrier avance. Seule `Date` est simulée ; les minuteries restent réelles.
vi.useFakeTimers({ toFake: ["Date"], now: new Date("2026-10-26T12:00:00.000Z") });

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  addErrorSink,
  buildReport,
  describeThrown,
  installGlobalErrorHandlers,
  redactPersonalData,
  reportError,
  resetErrorReporting,
  type ErrorReport,
} from "@/lib/error-reporting";

describe("rapport d'erreurs du navigateur", () => {
  let received: ErrorReport[];

  beforeEach(() => {
    resetErrorReporting();
    received = [];
    addErrorSink((r) => received.push(r));
    window.history.pushState({}, "", "/");
  });
  afterEach(() => {
    vi.useRealTimers();
    resetErrorReporting();
  });

  it("décrit aussi les valeurs levées qui ne sont pas des Error", () => {
    expect(describeThrown(new Error("boum"))).toBe("boum");
    expect(describeThrown("texte")).toBe("texte");
    expect(describeThrown({ message: "objet", code: 42 })).toBe("objet");
    expect(describeThrown({ code: 42 })).toBe('{"code":42}');
    expect(describeThrown(new Response("", { status: 503 }))).toBe("Response 503");
    const circular: Record<string, unknown> = {};
    circular["self"] = circular;
    expect(describeThrown(circular)).toBe("[object Object]");
  });

  it("masque e-mails, téléphones et numéros d'identité dans le texte", () => {
    const text = redactPersonalData(
      "Échec pour aissatou.ndiaye@cradesc.example, tél. 77 412 33 10 (+221 78 220 14 56), CNI 1234567890123",
    );
    expect(text).not.toMatch(/@|77 412|78 220|1234567890123/);
    expect(text).toContain("[e-mail]");
    expect(text).toContain("[téléphone]");
    expect(text).toContain("[numéro]");
    // Un code de fiche n'est pas une donnée personnelle : il reste lisible.
    expect(redactPersonalData("Fiche NIA-C-CPD-0001 introuvable")).toBe(
      "Fiche NIA-C-CPD-0001 introuvable",
    );
  });

  it("n'envoie que le chemin de la page, jamais les paramètres de recherche", () => {
    window.history.pushState({}, "", "/producteurs?q=Awa%20Diop&village=Sagg#haut");
    const report = buildReport(new Error("x"), "manual");
    expect(report.route).toBe("/producteurs");
    expect(JSON.stringify(report)).not.toContain("Awa");
  });

  it("transmet un rapport complet aux services enregistrés", () => {
    window.history.pushState({}, "", "/carte");
    expect(
      reportError(new Error("contour illisible"), {
        mechanism: "react_error_boundary",
        context: { boundary: "racine" },
      }),
    ).toBe(true);
    expect(received).toHaveLength(1);
    expect(received[0]).toMatchObject({
      message: "contour illisible",
      route: "/carte",
      mechanism: "react_error_boundary",
      context: { boundary: "racine" },
    });
    expect(received[0]!.stack).toContain("contour illisible");
    expect(new Date(received[0]!.at).toString()).not.toBe("Invalid Date");
  });

  it("ignore une erreur identique répétée en moins de dix secondes", () => {
    vi.useFakeTimers();
    expect(reportError(new Error("boucle"))).toBe(true);
    expect(reportError(new Error("boucle"))).toBe(false);
    expect(reportError(new Error("autre"))).toBe(true);
    vi.advanceTimersByTime(10_001);
    expect(reportError(new Error("boucle"))).toBe(true);
    expect(received.map((r) => r.message)).toEqual(["boucle", "autre", "boucle"]);
  });

  it("ne lève jamais, même si un service d'envoi échoue", () => {
    addErrorSink(() => {
      throw new Error("service indisponible");
    });
    expect(() => reportError(new Error("x"))).not.toThrow();
    expect(reportError(new Error("y"))).toBe(false);
  });

  it("ne signale rien quand aucun service n'est configuré", () => {
    resetErrorReporting();
    expect(reportError(new Error("silencieux"))).toBe(true);
    expect(received).toHaveLength(0);
  });

  it("capte les erreurs de script et les promesses rejetées, puis se désinstalle", () => {
    const uninstall = installGlobalErrorHandlers();
    window.dispatchEvent(new ErrorEvent("error", { error: new Error("script cassé") }));
    window.dispatchEvent(
      Object.assign(new Event("unhandledrejection"), { reason: new Error("promesse rejetée") }),
    );
    expect(received.map((r) => [r.mechanism, r.message])).toEqual([
      ["onerror", "script cassé"],
      ["unhandledrejection", "promesse rejetée"],
    ]);

    // La désinstallation retire bien les deux écouteurs (on ne relance pas d'erreur : le test la verrait).
    const remove = vi.spyOn(window, "removeEventListener");
    uninstall();
    expect(remove).toHaveBeenCalledWith("error", expect.any(Function));
    expect(remove).toHaveBeenCalledWith("unhandledrejection", expect.any(Function));
    remove.mockRestore();
  });

  it("n'installe les écouteurs qu'une seule fois", () => {
    installGlobalErrorHandlers();
    installGlobalErrorHandlers();
    window.dispatchEvent(new ErrorEvent("error", { error: new Error("une seule fois") }));
    expect(received).toHaveLength(1);
  });
});

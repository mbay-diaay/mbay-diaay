/**
 * Rapport des erreurs du navigateur, indépendant de tout fournisseur.
 *
 * Règles (chapitre 4 de docs/DEVELOPPEMENT.md) : aucune donnée personnelle ne quitte le navigateur.
 * - la route est le chemin seul : ni paramètres de recherche, ni ancre (un nom ou un code peut s'y trouver) ;
 * - les adresses e-mail, numéros de téléphone et suites de chiffres longues (CNI) sont masqués dans le texte ;
 * - une même erreur n'est signalée qu'une fois par dix secondes (une boucle de rendu ne doit pas inonder le service).
 *
 * Branchement : `VITE_ERROR_REPORT_URL` envoie chaque rapport en JSON par `navigator.sendBeacon`, ou
 * `addErrorSink(fn)` enregistre un service de son choix. Sans l'un ni l'autre, rien n'est envoyé.
 */

export type ErrorMechanism = "react_error_boundary" | "onerror" | "unhandledrejection" | "manual";

export interface ErrorReport {
  message: string;
  stack?: string;
  /** Chemin de la page, sans paramètres ni ancre. */
  route: string;
  mechanism: ErrorMechanism;
  /** Horodatage ISO. */
  at: string;
  /** Informations techniques simples (nom du composant, etc.) : jamais de données de personnes. */
  context: Record<string, string | number | boolean>;
}

export type ErrorSink = (report: ErrorReport) => void;

const MAX_MESSAGE = 500;
const MAX_STACK = 4000;
const MAX_SERIALIZED = 2000;
const DEDUPE_MS = 10_000;

const sinks = new Set<ErrorSink>();
const recent = new Map<string, number>();
let handlersInstalled = false;

/** Enregistre un service d'envoi ; renvoie la fonction qui le retire. */
export function addErrorSink(sink: ErrorSink): () => void {
  sinks.add(sink);
  return () => sinks.delete(sink);
}

/** Texte lisible d'une valeur levée : les chargeurs lèvent parfois des `Response` ou de simples objets. */
export function describeThrown(error: unknown): string {
  if (error instanceof Response) {
    return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
  }
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  const { message } = (error ?? {}) as { message?: unknown };
  if (typeof message === "string" && message.length > 0) return message;
  try {
    return JSON.stringify(error)?.slice(0, MAX_SERIALIZED) ?? String(error);
  } catch {
    return String(error);
  }
}

const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
const PHONE = /(?:\+?221[\s.-]?)?\b7[0-8](?:[\s.-]?\d){7}\b/g;
const LONG_NUMBER = /\b\d{9,}\b/g;

/** Masque ce qui ressemble à une donnée personnelle (e-mail, téléphone, numéro d'identité). */
export function redactPersonalData(text: string): string {
  return text
    .replace(EMAIL, "[e-mail]")
    .replace(PHONE, "[téléphone]")
    .replace(LONG_NUMBER, "[numéro]");
}

export function buildReport(
  error: unknown,
  mechanism: ErrorMechanism,
  context: ErrorReport["context"] = {},
): ErrorReport {
  const stack = error instanceof Error ? error.stack : undefined;
  return {
    message: redactPersonalData(describeThrown(error)).slice(0, MAX_MESSAGE),
    ...(stack !== undefined && { stack: redactPersonalData(stack).slice(0, MAX_STACK) }),
    route: typeof window === "undefined" ? "" : window.location.pathname,
    mechanism,
    at: new Date().toISOString(),
    context,
  };
}

/** Service par défaut : envoi par `sendBeacon` si une adresse est configurée. */
function beaconSink(): ErrorSink | undefined {
  const url = import.meta.env["VITE_ERROR_REPORT_URL"] as string | undefined;
  if (!url || typeof navigator === "undefined" || typeof navigator.sendBeacon !== "function")
    return undefined;
  return (report) => {
    navigator.sendBeacon(url, new Blob([JSON.stringify(report)], { type: "application/json" }));
  };
}

/**
 * Signale une erreur. Renvoie `false` quand elle est ignorée (autre rendu serveur, doublon récent).
 * Ne lève jamais : un échec de signalement ne doit pas aggraver l'erreur d'origine.
 */
export function reportError(
  error: unknown,
  options: { mechanism?: ErrorMechanism; context?: ErrorReport["context"] } = {},
): boolean {
  if (typeof window === "undefined") return false;
  try {
    const report = buildReport(error, options.mechanism ?? "manual", options.context);
    const key = `${report.mechanism}|${report.route}|${report.message}`;
    const now = Date.now();
    const last = recent.get(key);
    if (last !== undefined && now - last < DEDUPE_MS) return false;
    recent.set(key, now);
    const targets = sinks.size ? [...sinks] : [beaconSink()].filter((s): s is ErrorSink => !!s);
    targets.forEach((send) => send(report));
    return true;
  } catch {
    return false;
  }
}

/** Écoute les erreurs que React n'attrape pas (script, promesse rejetée). Sans effet si déjà installé. */
export function installGlobalErrorHandlers(): () => void {
  if (typeof window === "undefined" || handlersInstalled) return () => {};
  handlersInstalled = true;
  const onError = (event: ErrorEvent) =>
    void reportError(event.error ?? event.message, { mechanism: "onerror" });
  const onRejection = (event: PromiseRejectionEvent) =>
    void reportError(event.reason, { mechanism: "unhandledrejection" });
  window.addEventListener("error", onError);
  window.addEventListener("unhandledrejection", onRejection);
  return () => {
    window.removeEventListener("error", onError);
    window.removeEventListener("unhandledrejection", onRejection);
    handlersInstalled = false;
  };
}

/** Remet l'état à zéro (tests). */
export function resetErrorReporting() {
  sinks.clear();
  recent.clear();
  handlersInstalled = false;
}

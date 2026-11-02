/**
 * URL de l'API NestJS (sans slash final), ex. http://localhost:3000/v1 ou https://api.mbaydiaay.com/v1
 * Absent → mode démonstration locale (store en mémoire).
 */
export function apiBaseUrl(): string | null {
  const raw = import.meta.env["VITE_API_URL"] as string | undefined;
  if (!raw?.trim()) return null;
  return raw.trim().replace(/\/$/, "");
}

/** True si le front doit parler au backend réel. */
export function isApiMode(): boolean {
  return apiBaseUrl() !== null;
}

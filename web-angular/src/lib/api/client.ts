import { apiBaseUrl } from "./config";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "./tokens";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOpts = {
  method?: string;
  body?: unknown;
  auth?: boolean;
  /** Évite une boucle infinie sur refresh. */
  _retry?: boolean;
};

async function parseError(res: Response): Promise<ApiError> {
  try {
    const data = (await res.json()) as {
      code?: string;
      message?: string;
      details?: unknown;
    };
    return new ApiError(
      res.status,
      data.code ?? "HTTP_ERROR",
      data.message ?? res.statusText,
      data.details,
    );
  } catch {
    return new ApiError(res.status, "HTTP_ERROR", res.statusText);
  }
}

export async function apiFetch<T>(path: string, opts: RequestOpts = {}): Promise<T> {
  const base = apiBaseUrl();
  if (!base) throw new ApiError(0, "NO_API", "VITE_API_URL non configurée");

  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  if (opts.auth !== false) {
    const token = getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const init: RequestInit = {
    method: opts.method ?? (opts.body !== undefined ? "POST" : "GET"),
    headers,
  };
  if (opts.body !== undefined) init.body = JSON.stringify(opts.body);

  const res = await fetch(`${base}${path.startsWith("/") ? path : `/${path}`}`, init);

  if (res.status === 401 && opts.auth !== false && !opts._retry) {
    const refreshed = await tryRefresh();
    if (refreshed) return apiFetch<T>(path, { ...opts, _retry: true });
    clearTokens();
  }

  if (!res.ok) throw await parseError(res);
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

async function tryRefresh(): Promise<boolean> {
  const refresh = getRefreshToken();
  const base = apiBaseUrl();
  if (!refresh || !base) return false;
  try {
    const res = await fetch(`${base}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ refreshToken: refresh }),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { accessToken: string; refreshToken: string };
    setTokens(data.accessToken, data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

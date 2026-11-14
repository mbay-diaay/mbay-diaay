import { ao as getAccessToken, ap as clearTokens, aq as apiBaseUrl, ar as getRefreshToken, as as setTokens } from './locale.service-c0QhtcVY.mjs';

var ApiError = class extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    this.name = "ApiError";
  }
};
async function parseError(res) {
  var _a, _b;
  try {
    const data = await res.json();
    return new ApiError(res.status, (_a = data.code) != null ? _a : "HTTP_ERROR", (_b = data.message) != null ? _b : res.statusText, data.details);
  } catch {
    return new ApiError(res.status, "HTTP_ERROR", res.statusText);
  }
}
async function apiFetch(path, opts = {}) {
  var _a;
  const base = apiBaseUrl();
  if (!base) throw new ApiError(0, "NO_API", "VITE_API_URL non configur\xE9e");
  const headers = { Accept: "application/json" };
  if (opts.body !== void 0) headers["Content-Type"] = "application/json";
  if (opts.auth !== false) {
    const token = getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const init = {
    method: (_a = opts.method) != null ? _a : opts.body !== void 0 ? "POST" : "GET",
    headers
  };
  if (opts.body !== void 0) init.body = JSON.stringify(opts.body);
  const res = await fetch(`${base}${path.startsWith("/") ? path : `/${path}`}`, init);
  if (res.status === 401 && opts.auth !== false && !opts._retry) {
    if (await tryRefresh()) return apiFetch(path, {
      ...opts,
      _retry: true
    });
    clearTokens();
  }
  if (!res.ok) throw await parseError(res);
  if (res.status === 204) return void 0;
  return await res.json();
}
async function tryRefresh() {
  const refresh = getRefreshToken();
  const base = apiBaseUrl();
  if (!refresh || !base) return false;
  try {
    const res = await fetch(`${base}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ refreshToken: refresh })
    });
    if (!res.ok) return false;
    const data = await res.json();
    setTokens(data.accessToken, data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

export { ApiError as A, apiFetch as a };
//# sourceMappingURL=client-D1lxPQMx.mjs.map

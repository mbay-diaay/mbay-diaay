const ACCESS_KEY = "mbd.accessToken";
const REFRESH_KEY = "mbd.refreshToken";

function browserSessionStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  try {
    return browserSessionStorage()?.getItem(ACCESS_KEY) ?? null;
  } catch {
    return null;
  }
}

export function getRefreshToken(): string | null {
  try {
    return browserSessionStorage()?.getItem(REFRESH_KEY) ?? null;
  } catch {
    return null;
  }
}

export function setTokens(accessToken: string, refreshToken: string) {
  try {
    browserSessionStorage()?.setItem(ACCESS_KEY, accessToken);
    browserSessionStorage()?.setItem(REFRESH_KEY, refreshToken);
  } catch {
    /* mode privé / SSR : ignorer */
  }
}

export function clearTokens() {
  try {
    browserSessionStorage()?.removeItem(ACCESS_KEY);
    browserSessionStorage()?.removeItem(REFRESH_KEY);
  } catch {
    /* mode privé / SSR : ignorer */
  }
}

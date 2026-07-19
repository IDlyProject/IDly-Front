import { API_BASE_URL } from "@/constants/api";

let refreshPromise = null;


export async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: "{}",
        });
        return res.ok;
      } catch {
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}


export async function apiFetch(path, options = {}, opts = {}) {
  const { retry = true } = opts;
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });


  if (res.status === 401 && retry && !path.includes("/api/auth/")) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiFetch(path, options, { retry: false });
    }
  }

  return res;
}

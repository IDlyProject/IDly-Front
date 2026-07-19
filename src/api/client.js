// src/api/client.js
// 공통 fetch: credentials 포함 + access 만료 시 refresh 1회 재시도
import { API_BASE_URL } from "@/constants/api";

let refreshPromise = null;

/**
 * POST /api/auth/refresh — idly_refresh 쿠키로 access 재발급
 * 동시 401 시 한 번만 refresh 하도록 promise 공유
 */
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

/**
 * @param {string} path - `/api/...` 또는 전체 URL
 * @param {RequestInit} [options]
 * @param {{ retry?: boolean }} [opts]
 */
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

  // access 만료 → refresh 후 1회 재시도 (auth 엔드포인트 제외)
  if (res.status === 401 && retry && !path.includes("/api/auth/")) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiFetch(path, options, { retry: false });
    }
  }

  return res;
}

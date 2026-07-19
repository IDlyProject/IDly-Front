// src/api/auth.js
import { apiFetch, refreshAccessToken } from "@/api/client";

// httpOnly 쿠키는 JS에서 직접 읽을 수 없으므로,
// /api/users/me 호출 성공 여부로 로그인 상태를 판단한다.
// access 만료 시 client가 refresh 후 재시도한다.
export async function fetchCurrentUser() {
  const res = await apiFetch("/api/users/me");

  if (!res.ok) return null;
  return res.json();
}

export async function refreshSession() {
  return refreshAccessToken();
}

// 액세스 토큰이 만료된 상태에서도 idly_refresh 쿠키만으로 동작 (서버가 refresh 토큰 폐기 + 쿠키 삭제)
export async function logout() {
  await apiFetch("/api/auth/logout", { method: "POST" });
}

export function getPrimaryGmailAccount(user) {
  if (!user?.gmailAccounts?.length) return null;
  return (
    user.gmailAccounts.find((account) => account.isPrimary) ??
    user.gmailAccounts[0]
  );
}

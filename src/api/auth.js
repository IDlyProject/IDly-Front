// src/api/auth.js
import { apiFetch, refreshAccessToken } from "@/api/client";
import { API_BASE_URL } from "@/constants/api";

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

/** 서버에 refresh 폐기 + 쿠키 삭제 요청 */
export async function logout() {
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
  } catch {
    // 네트워크 실패해도 클라이언트 라우팅은 진행
  }
}

export function getPrimaryGmailAccount(user) {
  if (!user?.gmailAccounts?.length) return null;
  return (
    user.gmailAccounts.find((account) => account.isPrimary) ??
    user.gmailAccounts[0]
  );
}

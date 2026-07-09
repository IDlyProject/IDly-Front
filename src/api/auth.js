// src/api/auth.js
import { API_BASE_URL } from "@/constants/api";

// httpOnly 쿠키는 JS에서 직접 읽을 수 없으므로,
// /api/users/me 호출 성공 여부로 로그인 상태를 판단한다.
export async function fetchCurrentUser() {
  const res = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
}

export function getPrimaryGmailAccount(user) {
  if (!user?.gmailAccounts?.length) return null;
  return (
    user.gmailAccounts.find((account) => account.isPrimary) ??
    user.gmailAccounts[0]
  );
}

import { apiFetch, refreshAccessToken } from "@/api/client";


export async function fetchCurrentUser() {
  const res = await apiFetch("/api/users/me");

  if (!res.ok) return null;
  return res.json();
}

export async function refreshSession() {
  return refreshAccessToken();
}


export async function logout() {
  const res = await apiFetch("/api/auth/logout", { method: "POST" });
  if (!res.ok) throw new Error(`logout failed: ${res.status}`);
}

export function getPrimaryGmailAccount(user) {
  if (!user?.gmailAccounts?.length) return null;
  return (
    user.gmailAccounts.find((account) => account.isPrimary) ??
    user.gmailAccounts[0]
  );
}

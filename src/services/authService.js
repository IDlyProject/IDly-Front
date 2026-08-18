import { axiosInstance, refreshAccessToken, clearTokens } from "@/lib/api";

export async function fetchCurrentUser() {
  try {
    const { data } = await axiosInstance.get("/api/users/me");
    return data;
  } catch {
    return null;
  }
}

export async function refreshSession() {
  return refreshAccessToken();
}

export async function logout() {
  try {
    await axiosInstance.post("/api/auth/logout");
  } finally {
    clearTokens();
  }
}

export function getPrimaryGmailAccount(user) {
  if (!user?.gmailAccounts?.length) return null;
  return (
    user.gmailAccounts.find((account) => account.isPrimary) ??
    user.gmailAccounts[0]
  );
}

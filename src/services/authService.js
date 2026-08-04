import { axiosInstance, refreshAccessToken } from "@/lib/api";

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
  await axiosInstance.post("/api/auth/logout");
}

export function getPrimaryGmailAccount(user) {
  if (!user?.gmailAccounts?.length) return null;
  return (
    user.gmailAccounts.find((account) => account.isPrimary) ??
    user.gmailAccounts[0]
  );
}

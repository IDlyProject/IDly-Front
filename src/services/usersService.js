import { axiosInstance } from "@/lib/api";

export async function updateProfile(payload) {
  const { data } = await axiosInstance.patch("/api/users/me", payload);
  return data;
}

export async function getAccounts() {
  const { data } = await axiosInstance.get("/api/users/me/accounts");
  return data;
}

export async function disconnectAccount(accountId) {
  const { data } = await axiosInstance.delete(
    `/api/users/me/accounts/${accountId}`,
  );
  return data;
}

export async function deleteAccount({ reason, reasonDetail }) {
  const { data } = await axiosInstance.delete("/api/users/me", {
    data: reasonDetail ? { reason, reasonDetail } : { reason },
  });
  return data;
}

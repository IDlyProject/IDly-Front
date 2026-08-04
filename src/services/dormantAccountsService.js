import { axiosInstance } from "@/lib/api";

export async function getDormantAccounts() {
  const { data } = await axiosInstance.get("/api/users/me/dormant-accounts");
  return data;
}

export async function restoreAllDormant() {
  const { data } = await axiosInstance.patch(
    "/api/users/me/dormant-accounts/restore-all",
  );
  return data;
}

import { axiosInstance } from "@/lib/api";

export async function getNotificationSettings() {
  const { data } = await axiosInstance.get(
    "/api/users/me/notification-settings",
  );
  return data;
}

export async function updateNotificationSettings(payload) {
  const { data } = await axiosInstance.patch(
    "/api/users/me/notification-settings",
    payload,
  );
  return data;
}

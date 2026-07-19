import { apiFetch } from "@/api/client";

export async function getNotificationSettings() {
  const res = await apiFetch("/api/users/me/notification-settings");

  if (!res.ok) {
    throw new Error(`get notification settings failed: ${res.status}`);
  }
  return res.json();
}

export async function updateNotificationSettings(payload) {
  const res = await apiFetch("/api/users/me/notification-settings", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`update notification settings failed: ${res.status}`);
  }
  return res.json();
}

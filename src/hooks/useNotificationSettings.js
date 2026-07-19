// src/hooks/useNotificationSettings.js
import { useAsync } from "./useAsync";
import { getNotificationSettings } from "@/api/notificationSettings";

export function useNotificationSettings() {
  const { data: settings, status } = useAsync(getNotificationSettings);
  return { settings, status };
}

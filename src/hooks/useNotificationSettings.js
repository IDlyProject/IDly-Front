import { useAsync } from "./useAsync";
import { getNotificationSettings } from "@/services/notificationSettingsService";

export function useNotificationSettings() {
  const { data: settings, status } = useAsync(getNotificationSettings);
  return { settings, status };
}

import { useAsync } from "./useAsync";
import { fetchCurrentUser } from "@/api/auth";

export function useCurrentUser() {
  const { data: user, status: asyncStatus } = useAsync(fetchCurrentUser);

  const status = asyncStatus === "ready" && !user ? "error" : asyncStatus;

  return { user, status };
}

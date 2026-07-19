import { useCallback } from "react";
import { useAsync } from "./useAsync";
import { getServiceAccountDetail } from "@/api/serviceAccounts";

export function useServiceAccountDetail(serviceAccountId) {
  const fetcher = useCallback(
    () => getServiceAccountDetail(serviceAccountId),
    [serviceAccountId],
  );
  const { data: detail, status: asyncStatus } = useAsync(fetcher);

  const status =
    asyncStatus === "ready" && !detail ? "not_found" : asyncStatus;

  return { detail, status };
}

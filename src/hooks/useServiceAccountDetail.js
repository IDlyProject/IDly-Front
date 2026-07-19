// src/hooks/useServiceAccountDetail.js
import { useCallback } from "react";
import { useAsync } from "./useAsync";
import { getServiceAccountDetail } from "@/api/serviceAccounts";

export function useServiceAccountDetail(serviceAccountId) {
  const fetcher = useCallback(
    () => getServiceAccountDetail(serviceAccountId),
    [serviceAccountId],
  );
  const { data: detail, status: asyncStatus } = useAsync(fetcher);

  // API가 "찾을 수 없음"을 200 + null로 반환하므로, ready인데 데이터가 없으면 not_found로 구분
  const status =
    asyncStatus === "ready" && !detail ? "not_found" : asyncStatus;

  return { detail, status }; // status: loading | ready | not_found | error
}

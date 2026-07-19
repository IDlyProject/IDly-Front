// src/hooks/useHomeData.js
import { useCallback } from "react";
import { useAsync } from "./useAsync";
import { getHome } from "@/api/home";

export function useHomeData(mailAccountId) {
  const fetcher = useCallback(() => getHome(mailAccountId), [mailAccountId]);
  const { data, status, reload } = useAsync(fetcher);

  return { data, status, reload };
}

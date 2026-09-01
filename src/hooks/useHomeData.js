import { useCallback } from "react";
import { useAsync } from "./useAsync";
import { getHome } from "@/services/homeService";

export function useHomeData(mailAccountId, skip = false) {
  const fetcher = useCallback(() => getHome(mailAccountId), [mailAccountId]);
  const { data, status, reload } = useAsync(fetcher, null, { skip });

  return { data, status, reload };
}

// src/hooks/useServiceAccountDetail.js
import { useEffect, useState } from "react";
import { getServiceAccountDetail } from "@/api/serviceAccounts";

export function useServiceAccountDetail(serviceAccountId) {
  const [detail, setDetail] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | not_found | error

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setStatus("loading");
      try {
        const data = await getServiceAccountDetail(serviceAccountId);
        if (cancelled) return;
        if (!data) {
          setStatus("not_found");
          return;
        }
        setDetail(data);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [serviceAccountId]);

  return { detail, status };
}

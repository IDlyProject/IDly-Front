// src/hooks/useHomeData.js
import { useCallback, useEffect, useState } from "react";
import { getHome } from "@/api/home";

export function useHomeData(mailAccountId) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const reload = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await getHome(mailAccountId);
      setData(res);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [mailAccountId]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setStatus("loading");
      try {
        const res = await getHome(mailAccountId);
        if (cancelled) return;
        setData(res);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mailAccountId]);

  return { data, status, reload };
}

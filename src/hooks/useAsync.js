import { useCallback, useEffect, useRef, useState } from "react";

export function useAsync(fetcher, initialValue = null) {
  const [data, setData] = useState(initialValue);
  const [status, setStatus] = useState("loading");
  const requestIdRef = useRef(0);

  const load = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setStatus("loading");
    try {
      const result = await fetcher();
      if (requestIdRef.current !== requestId) return;
      setData(result);
      setStatus("ready");
    } catch (err) {
      if (requestIdRef.current !== requestId) return;
      console.error("useAsync fetch failed:", err);
      setStatus("error");
    }
  }, [fetcher]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      requestIdRef.current++;
    };
  }, [load]);

  return { data, status, reload: load };
}

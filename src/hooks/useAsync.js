import { useCallback, useEffect, useRef, useState } from "react";

export function useAsync(fetcher, initialValue = null, { skip = false } = {}) {
  const [data, setData] = useState(initialValue);
  const [status, setStatus] = useState("loading");
  const requestIdRef = useRef(0);

  const load = useCallback(async () => {
    if (skip) return;
    const requestId = ++requestIdRef.current;
    // 기존 데이터가 있으면 로딩 스피너 없이 백그라운드 갱신
    setStatus((prev) => (prev === "ready" ? "refreshing" : "loading"));
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
  }, [fetcher, skip]);

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

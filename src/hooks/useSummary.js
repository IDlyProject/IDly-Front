// src/hooks/useSummary.js
import { useEffect, useState } from "react";
import { getSummary } from "@/api/summary";

export function useSummary() {
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setStatus("loading");
      try {
        const data = await getSummary();
        if (cancelled) return;
        setSummary(data);
        setStatus("ready");
      } catch (err) {
        if (!cancelled) {
          console.error("summary load failed:", err);
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { summary, status };
}

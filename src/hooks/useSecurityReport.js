import { useEffect, useState } from "react";
import { getSecurityReport } from "@/api/securityReport";

export function useSecurityReport() {
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setStatus("loading");
      try {
        const data = await getSecurityReport();
        if (cancelled) return;
        setReport(data);
        setStatus("ready");
      } catch (err) {
        if (!cancelled) {
          console.error("security report load failed:", err);
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { report, status };
}

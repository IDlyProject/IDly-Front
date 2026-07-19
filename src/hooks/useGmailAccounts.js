import { useEffect, useState } from "react";
import { getAccounts } from "@/api/users";

export function useGmailAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    getAccounts()
      .then((data) => {
        if (cancelled) return;
        setAccounts(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { accounts, status };
}

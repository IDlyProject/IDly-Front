import { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/api/auth";

export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    fetchCurrentUser()
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setStatus("error");
          return;
        }
        setUser(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { user, status };
}

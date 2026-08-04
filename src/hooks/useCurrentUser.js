import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export function useCurrentUser() {
  const user = useUserStore((state) => state.user);
  const status = useUserStore((state) => state.status);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    if (status === "idle") fetchUser();
  }, [status, fetchUser]);

  return { user, status };
}

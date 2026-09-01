import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useUserStore } from "@/store/userStore";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const status = useUserStore((state) => state.status);
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    if (status === "idle") fetchUser();
  }, [status, fetchUser]);

  // 인증 확인 중
  if (status === "idle" || status === "loading") return null;

  // 미인증
  if (!user) {
    return (
      <Navigate to={ROUTES.ONBOARDING_LOGIN} state={{ from: location }} replace />
    );
  }

  return children;
}

export default ProtectedRoute;

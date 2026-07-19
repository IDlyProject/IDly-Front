// src/routes/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { fetchCurrentUser } from "@/api/auth";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState("checking"); // checking | authed | guest

  useEffect(() => {
    let cancelled = false;
    // fetchCurrentUser → 401 시 /auth/refresh 후 재시도 (api client)
    fetchCurrentUser().then((user) => {
      if (!cancelled) setStatus(user ? "authed" : "guest");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") return null;

  if (status === "guest") {
    return (
      <Navigate to={ROUTES.ONBOARDING_LOGIN} state={{ from: location }} replace />
    );
  }

  return children;
}

export default ProtectedRoute;

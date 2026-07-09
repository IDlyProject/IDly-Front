// src/pages/Splash/index.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { fetchCurrentUser } from "@/api/auth";

function Splash() {
  const [dest, setDest] = useState(null);

  useEffect(() => {
    fetchCurrentUser().then((user) => {
      setDest(user ? ROUTES.HOME : ROUTES.ONBOARDING_LOGIN);
    });
  }, []);

  if (!dest) return null;
  return <Navigate to={dest} replace />;
}

export default Splash;

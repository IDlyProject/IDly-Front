// src/pages/Splash/index.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { fetchCurrentUser } from "@/api/auth";
import typoLogo from "@/assets/ic_typo_logo_white.svg";

const MIN_DISPLAY_TIME = 1200;

function Splash() {
  const [dest, setDest] = useState(null);

  useEffect(() => {
    const startTime = Date.now();

    const goTo = (destination) => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(MIN_DISPLAY_TIME - elapsed, 0);
      setTimeout(() => {
        setDest(destination);
      }, remaining);
    };

    fetchCurrentUser()
      .then((user) => {
        goTo(user ? ROUTES.HOME : ROUTES.ONBOARDING_LOGIN);
      })
      .catch((error) => {
        console.error("Failed to fetch current user:", error);
        goTo(ROUTES.ONBOARDING_LOGIN);
      });
  }, []);

  if (dest) {
    return <Navigate to={dest} replace />;
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-main100 px-8">
      <div className="flex flex-1 flex-col items-center justify-center">
        <img src={typoLogo} alt="IDly" />
        <p className="mt-5 text-r16 text-white/60">
          이메일로 확인하는 나의 모든 계정
        </p>
      </div>

      <p className="pb-12 text-r14 text-[12px] text-white/26">
        © 2026 계정아파트
      </p>
    </div>
  );
}

export default Splash;

// src/pages/Splash/index.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { fetchCurrentUser } from "@/api/auth";
import logo from "@/assets/idly_splash_typo_logo.svg"; // 실제 로고 파일 경로/이름에 맞게 수정해주세요

const MIN_DISPLAY_TIME = 1200; // 스플래시 최소 노출 시간(ms)

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
        // 인증 확인 실패(네트워크 오류, 서버 오류 등) 시 로그인 화면으로 이동
        console.error("Failed to fetch current user:", error);
        goTo(ROUTES.ONBOARDING_LOGIN);
      });
  }, []);

  if (dest) {
    return <Navigate to={dest} replace />;
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#12206b] px-8">
      <div className="flex flex-1 flex-col items-center justify-center">
        <img src={logo} alt="IDly" />
        <p className="mt-5 text-sm font-bold text-white/70">
          이메일로 확인하는 나의 모든 계정
        </p>
      </div>

      <p className="pb-8 text-xs font-bold text-white/40">© 2026 계정아파트</p>
    </div>
  );
}

export default Splash;

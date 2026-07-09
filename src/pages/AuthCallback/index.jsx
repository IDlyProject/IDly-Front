// src/pages/AuthCallback/index.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // JWT는 httpOnly 쿠키로 내려오므로 여기서는 mode만 읽는다.
    const mode = searchParams.get("mode");

    if (mode === "add") {
      // 연결 계정 추가 완료 → 계정 추가 화면으로
      navigate(ROUTES.ONBOARDING_ADD_ACCOUNT, { replace: true });
      return;
    }

    if (mode === "login") {
      // 신규 로그인 완료 → 온보딩 다음 단계(약관 동의)로
      navigate(ROUTES.ONBOARDING_CONSENT, { replace: true });
      return;
    }

    // mode가 없거나 알 수 없는 값이면 인증 실패로 간주
    navigate(ROUTES.ONBOARDING_LOGIN, { replace: true });
  }, [searchParams, navigate]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f2f4f6]">
      <p className="text-sm font-bold text-[#6b7684]">로그인 처리 중...</p>
    </div>
  );
}

export default AuthCallback;

// src/pages/Onboarding/Login/index.jsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ActionButton from "@/components/ui/ActionButton";
import { API_BASE_URL } from "@/constants/api";
import logo from "@/assets/ic_logo.svg";
import googleIcon from "@/assets/ic_google.svg";
import PageBackground from "@/components/layouts/PageBackground";

// AuthCallback이 붙여주는 error 쿼리파라미터 → 사용자 메시지
const OAUTH_ERROR_MESSAGES = {
  gmail_already_linked: "이미 다른 계정에 연동되어 있는 Gmail이에요.",
  refresh_token_missing: "로그인 정보가 만료됐어요. 다시 로그인해 주세요.",
  invalid_oauth_state: "로그인 요청이 올바르지 않아요. 다시 시도해 주세요.",
  oauth_failed: "구글 로그인에 실패했어요. 다시 시도해 주세요.",
};
const DEFAULT_OAUTH_ERROR_MESSAGE =
  "로그인 중 문제가 발생했어요. 다시 시도해 주세요.";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("error");
  const errorMessage = errorCode
    ? (OAUTH_ERROR_MESSAGES[errorCode] ?? DEFAULT_OAUTH_ERROR_MESSAGE)
    : null;

  const handleGoogleLogin = () => {
    if (isLoading) return;
    setIsLoading(true);
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-4 pb-8">
        <div className="flex flex-1 flex-col items-center justify-center">
          <img src={logo} alt="IDly" />
          <h1 className="mt-6 text-center text-b24 text-gray100">안녕하세요</h1>
          <p className="mt-2.5 text-center text-r14 text-gray60">
            계정을 지키는 IDly입니다!
          </p>
        </div>
        {errorMessage && (
          <div className="mb-3 rounded-xl bg-danger50/10 px-4 py-3 text-center text-r14 text-danger50">
            {errorMessage}
          </div>
        )}
        <ActionButton
          bgColor="var(--color-white)"
          textColor="var(--color-gray100)"
          bordered
          borderColor="var(--color-gray20)"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="flex items-center justify-center gap-2.5 shadow-[0_4px_14px_0_rgba(16,24,46,0.06)]"
        >
          <img src={googleIcon} alt="" className="h-6 w-6" />
          {isLoading ? "연결 중..." : "Gmail로 시작하기"}
        </ActionButton>
      </div>
    </PageBackground>
  );
}

export default Login;

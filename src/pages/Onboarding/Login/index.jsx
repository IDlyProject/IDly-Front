// src/pages/Onboarding/Login/index.jsx
import { useState } from "react";
import ActionButton from "@/components/ui/ActionButton";
import { API_BASE_URL } from "@/constants/api";
import logo from "@/assets/ic_logo.svg";
import googleIcon from "@/assets/ic_google.svg";
import PageBackground from "@/components/layouts/PageBackground";
function Login() {
  const [isLoading, setIsLoading] = useState(false);

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

// src/pages/Onboarding/Login/index.jsx
import { useState } from "react";
import Button from "@/components/ui/Button";
import PageBackground from "@/components/layouts/PageBackground";
import { API_BASE_URL } from "@/constants/api";
import logo from "@/assets/idly_logo.svg"; // 실제 로고 파일 경로/이름에 맞게 수정해주세요

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47c-.28 1.5-1.13 2.78-2.4 3.63v3.02h3.89c2.28-2.1 3.6-5.2 3.6-8.76z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.89-3.02c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.11C3.24 21.3 7.3 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28c-.25-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.61H1.26A11.97 11.97 0 000 12c0 1.93.46 3.76 1.26 5.39l4.01-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0 7.3 0 3.24 2.7 1.26 6.61l4.01 3.11c.95-2.84 3.6-4.97 6.73-4.97z"
      />
    </svg>
  );
}

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    if (isLoading) return;
    setIsLoading(true);
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-8 pb-10">
        {/* 상단 콘텐츠를 감싸는 wrapper - 이 영역 안에서만 중앙 정렬 */}
        <div className="flex flex-1 flex-col items-center justify-center">
          <img src={logo} alt="IDly" />
          <h1 className="mt-6 text-center text-[22px] font-bold text-[#191f28]">
            안녕하세요
          </h1>
          <p className="mt-2 text-center text-sm text-[#9aa4b2]">
            계정을 지키는 IDly입니다!
          </p>
        </div>

        {/* 버튼은 화면 하단에 고정 */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl border border-gray-200 bg-white text-[15px] font-bold text-[#191f28] shadow-sm disabled:opacity-60"
        >
          <GoogleIcon />
          {isLoading ? "연결 중..." : "Gmail로 시작하기"}
        </button>
      </div>
    </PageBackground>
  );
}

export default Login;

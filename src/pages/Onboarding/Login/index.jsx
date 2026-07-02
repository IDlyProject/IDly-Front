// src/pages/Onboarding/Login/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandMark from "../components/BrandMark";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import PageBackground from "@/components/layouts/PageBackground";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    if (isLoading) return;
    setIsLoading(true);
    navigate(ROUTES.ONBOARDING_CONSENT);
  };

  return (
    <PageBackground variant="sky">
      <div className="flex min-h-dvh flex-col px-8 pb-10">
        {/* 상단 콘텐츠를 감싸는 wrapper - 이 영역 안에서만 중앙 정렬 */}
        <div className="flex flex-1 flex-col items-center justify-center">
          <BrandMark />
          <h1 className="text-center text-[28px] font-bold text-[#191f28]">
            IDly
          </h1>
          <p className="mt-3 text-center text-[15px] leading-relaxed text-[#6b7684]">
            흩어진 내 계정을 한 채에 모아
            <br />
            보안 상태를 확인해요.
          </p>
        </div>

        {/* 버튼은 화면 하단에 고정 */}
        <Button
          variant="primary"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          {isLoading ? "연결 중..." : "Gmail 로그인"}
        </Button>
      </div>
    </PageBackground>
  );
}

export default Login;

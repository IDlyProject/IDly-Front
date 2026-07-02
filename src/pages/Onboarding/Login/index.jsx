import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandMark from "../components/BrandMark";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    if (isLoading) return;
    setIsLoading(true);
    // TODO: Firebase 연동 후 실제 구글 로그인으로 교체
    navigate(ROUTES.ONBOARDING_CONSENT);
  };

  return (
    <div className="flex min-h-dvh flex-col justify-center bg-gradient-to-b from-[#bcdcff] via-[#dcebff] to-[#fdf2e4] px-8 pb-10">
      <BrandMark />
      <h1 className="text-center text-[28px] font-bold text-[#191f28]">IDly</h1>
      <p className="mt-3 text-center text-[15px] leading-relaxed text-[#6b7684]">
        흩어진 내 계정을 한 채에 모아
        <br />
        보안 상태를 확인해요.
      </p>

      <div className="mt-16">
        <Button
          variant="primary"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          {isLoading ? "연결 중..." : "Gmail 로그인"}
        </Button>
      </div>
    </div>
  );
}

export default Login;

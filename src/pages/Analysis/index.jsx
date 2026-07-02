// src/pages/Analysis/index.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import BrandMark from "@/pages/Onboarding/components/BrandMark";
import { ROUTES } from "@/constants/routes";

// TODO: 실제로는 분석 상태(queued/scanning/completed/failed)를 폴링해야 함
function Analysis() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(20);
  const primaryEmail = "minji.kim@gmail.com"; // TODO: 실제 대표 계정으로 교체

  useEffect(() => {
    // 임시 진행률 애니메이션 (실제로는 서버 status 폴링으로 대체)
    const timer = setInterval(() => {
      setProgress((prev) => Math.min(prev + 15, 100));
    }, 500);

    // 임시: 일정 시간 후 홈으로 자동 이동
    const redirect = setTimeout(() => {
      navigate(ROUTES.HOME, { replace: true });
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col items-center justify-center px-8 text-center">
        <BrandMark />
        <h1 className="mb-1.5 text-xl font-bold text-[#191f28]">
          계정 알림을 정리 중이에요
        </h1>
        <p className="mb-7 text-[13px] leading-relaxed text-[#6b7684]">
          {primaryEmail}의 메일에서
          <br />
          계정 신호를 모으고 있어요.
        </p>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e8edf4]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3b6cff] to-[#7aa4ff] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2.5 text-[11px] font-bold text-[#6b7684]">
          완료되면 자동으로 홈으로 이동합니다
        </p>
      </div>
    </PageBackground>
  );
}

export default Analysis;

// src/pages/Analysis/index.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import { ROUTES } from "@/constants/routes";
import AnalysisMark from "@/assets/ic_analysis_mark.svg";

const SCANNING_MESSAGES = [
  "보안 상태를 분석하고 있어요",
  "계정 알림을 정리하고 있어요",
  "홈 화면을 준비하고 있어요",
];
const STATUS_PROGRESS = {
  queued: 15,
  scanning: 60,
  completed: 100,
  failed: 60,
};

function Analysis() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("queued");
  const [messageIndex, setMessageIndex] = useState(0);

  // TODO: 실제 API 연동 시 이 useEffect를 triggerAnalysisRun + fetchRunStatus 폴링 로직으로 교체
  useEffect(() => {
    const timers = [];

    timers.push(setTimeout(() => setStatus("scanning"), 800));
    timers.push(
      setTimeout(() => {
        setStatus("completed");
        navigate(ROUTES.HOME, { replace: true });
      }, 50000),
    );

    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  useEffect(() => {
    if (status !== "scanning") return;
    const rotate = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % SCANNING_MESSAGES.length);
    }, 1000);
    return () => clearInterval(rotate);
  }, [status]);

  const progress = STATUS_PROGRESS[status] ?? 15;
  const statusLabel =
    status === "queued"
      ? "보안 상태를 분석하고 있어요"
      : SCANNING_MESSAGES[messageIndex];

  return (
    <PageBackground variant="frost">
      <div className="flex min-h-dvh flex-col items-center justify-center px-10 text-center">
        <img
          src={AnalysisMark}
          alt=""
          className="h-35 w-35"
          style={{ filter: "drop-shadow(0 12px 32px rgba(8,37,126,0.1))" }}
        />

        <h1 className="mt-8 text-b24 text-[22px] text-gray100">
          {statusLabel}
        </h1>

        <div className="mt-6.5 h-1.5 w-full overflow-hidden rounded-[3px] bg-[#E8EEFF]">
          <div
            className="h-full rounded-[3px] bg-linear-to-r from-[#5C7DEA] to-[#09267F] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-r14 text-[11px] text-gray50">
          완료되면 자동으로 결과 화면으로 이동합니다
        </p>
      </div>
    </PageBackground>
  );
}

export default Analysis;

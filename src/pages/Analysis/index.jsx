// src/pages/Analysis/index.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import BrandMark from "@/pages/Onboarding/components/BrandMark";
import { ROUTES } from "@/constants/routes";
import { triggerAnalysisRun, fetchRunStatus } from "@/api/analysis";
import { getPrimaryGmailAccount } from "@/api/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const POLL_INTERVAL_MS = 2000;
const SCANNING_MESSAGES = [
  "Gmail을 확인하고 있어요",
  "계정 알림을 정리하고 있어요",
  "홈 화면을 준비하고 있어요",
];
const STATUS_PROGRESS = { queued: 15, scanning: 60, completed: 100, failed: 60 };

function Analysis() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("queued");
  const [messageIndex, setMessageIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [failReason, setFailReason] = useState(null); // "backend" | "request"
  const [attempt, setAttempt] = useState(0);
  const { user } = useCurrentUser();
  const primaryEmail = getPrimaryGmailAccount(user)?.email ?? "";

  useEffect(() => {
    let cancelled = false;
    let pollTimer;

    const poll = async (runId) => {
      try {
        const run = await fetchRunStatus(runId);
        if (cancelled) return;

        setStatus(run.status);

        if (run.status === "completed") {
          navigate(ROUTES.HOME, { replace: true });
          return;
        }
        if (run.status === "failed") {
          // 백엔드가 명시적으로 분석 실패 상태를 반환한 경우
          setFailed(true);
          setFailReason("backend");
          return;
        }
        pollTimer = setTimeout(() => poll(runId), POLL_INTERVAL_MS);
      } catch (err) {
        // 상태 조회 요청 자체가 실패한 경우 (인증 만료, 서버 오류, 네트워크 등)
        console.error("analysis status polling failed:", err);
        if (!cancelled) {
          setFailed(true);
          setFailReason("request");
        }
      }
    };

    const start = async () => {
      try {
        const { runId } = await triggerAnalysisRun();
        if (!cancelled) poll(runId);
      } catch (err) {
        // 분석 시작 요청 자체가 실패한 경우 (인증 만료, 서버 오류, 네트워크 등)
        console.error("analysis trigger failed:", err);
        if (!cancelled) {
          setFailed(true);
          setFailReason("request");
        }
      }
    };

    start();

    return () => {
      cancelled = true;
      clearTimeout(pollTimer);
    };
  }, [navigate, attempt]);

  useEffect(() => {
    if (status !== "scanning") return;
    const rotate = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % SCANNING_MESSAGES.length);
    }, 1500);
    return () => clearInterval(rotate);
  }, [status]);

  const handleRetry = () => {
    setFailed(false);
    setFailReason(null);
    setStatus("queued");
    setMessageIndex(0);
    setAttempt((prev) => prev + 1);
  };

  const progress = STATUS_PROGRESS[status] ?? 15;
  const statusLabel =
    status === "queued"
      ? "분석을 준비하고 있어요"
      : status === "scanning"
        ? SCANNING_MESSAGES[messageIndex]
        : "계정 알림을 정리 중이에요";

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col items-center justify-center px-8 text-center">
        <BrandMark />
        <h1 className="mb-1.5 text-xl font-bold text-[#191f28]">
          {failed ? "분석에 실패했어요" : statusLabel}
        </h1>
        <p className="mb-7 text-[13px] leading-relaxed text-[#6b7684]">
          {failed ? (
            failReason === "request" ? (
              <>
                일시적인 오류가 발생했어요.
                <br />
                잠시 후 다시 시도해주세요.
              </>
            ) : (
              <>
                서버에서 분석을 완료하지 못했어요.
                <br />
                잠시 후 다시 시도해주세요.
              </>
            )
          ) : (
            <>
              {primaryEmail}의 메일에서
              <br />
              계정 신호를 모으고 있어요.
            </>
          )}
        </p>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e8edf4]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              failed
                ? "bg-red-300"
                : "bg-gradient-to-r from-[#3b6cff] to-[#7aa4ff]"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {failed ? (
          <button
            onClick={handleRetry}
            className="mt-4 rounded-full bg-[#3b6cff] px-5 py-2 text-[13px] font-bold text-white"
          >
            다시 시도하기
          </button>
        ) : (
          <p className="mt-2.5 text-[11px] font-bold text-[#6b7684]">
            완료되면 자동으로 홈으로 이동합니다
          </p>
        )}
      </div>
    </PageBackground>
  );
}

export default Analysis;

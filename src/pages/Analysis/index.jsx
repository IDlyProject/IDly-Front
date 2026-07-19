import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import ActionButton from "@/components/ui/ActionButton";
import { ROUTES } from "@/constants/routes";
import { triggerAnalysisRun, fetchRunStatus } from "@/api/analysis";
import AnalysisMark from "@/assets/ic_analysis_mark.svg";

const POLL_INTERVAL_MS = 1200;

function Analysis() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("분석을 준비하고 있어요.");
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const pollTimerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const poll = async (analysisId) => {
      let statusRes;
      try {
        statusRes = await fetchRunStatus(analysisId);
      } catch {
        if (!cancelled) {
          setFailed(true);
          setErrorMessage("분석 진행 상태를 불러오지 못했어요.");
        }
        return;
      }
      if (cancelled) return;

      setProgress(statusRes.progress);
      setMessage(statusRes.displayMessage);

      if (statusRes.status === "completed") {
        navigate(ROUTES.HOME, { replace: true });
        return;
      }
      if (statusRes.status === "failed") {
        setFailed(true);
        setErrorMessage(statusRes.errorMessage || "분석에 실패했어요.");
        return;
      }
      pollTimerRef.current = setTimeout(
        () => poll(analysisId),
        POLL_INTERVAL_MS,
      );
    };

    triggerAnalysisRun()
      .then((startRes) => {
        if (cancelled) return;
        setMessage(startRes.message);
        poll(startRes.analysisId);
      })
      .catch(() => {
        if (cancelled) return;
        setFailed(true);
        setErrorMessage("분석을 시작하지 못했어요.");
      });

    return () => {
      cancelled = true;
      clearTimeout(pollTimerRef.current);
    };
  }, [navigate, retryKey]);

  const handleRetry = () => {
    setFailed(false);
    setErrorMessage("");
    setProgress(0);
    setMessage("분석을 준비하고 있어요.");
    setRetryKey((key) => key + 1);
  };

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
          {failed ? "분석에 실패했어요" : message}
        </h1>

        <div className="mt-6.5 h-1.5 w-full overflow-hidden rounded-[3px] bg-[#E8EEFF]">
          <div
            className="h-full rounded-[3px] bg-linear-to-r from-[#5C7DEA] to-[#09267F] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {failed ? (
          <>
            <p className="mt-3 text-r14 text-[11px] text-danger50">
              {errorMessage}
            </p>
            <ActionButton
              onClick={handleRetry}
              className="mt-5 max-w-50"
            >
              다시 시도
            </ActionButton>
          </>
        ) : (
          <p className="mt-3 text-r14 text-[11px] text-gray50">
            완료되면 자동으로 결과 화면으로 이동합니다
          </p>
        )}
      </div>
    </PageBackground>
  );
}

export default Analysis;

// src/pages/SecurityReport/index.jsx
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import ScoreRing from "./components/ScoreRing";
import SummaryBadges from "./components/SummaryBadges";
import RecommendationList from "./components/RecommendationList";
import RiskItemList from "./components/RiskItemList";
import { MOCK_REPORT } from "./mockReportData";
import { ROUTES } from "@/constants/routes";

function ArrowLeftIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#191f28"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
    </svg>
  );
}

function SecurityReport() {
  const navigate = useNavigate();
  const report = MOCK_REPORT;

  const handleSelectRecommendation = (id) => {
    // TODO: 권장 사항 상세/조치 화면으로 이동
    console.log("recommendation:", id);
  };

  const handleSelectRiskItem = (id) => {
    // TODO: 위험 항목 상세 화면으로 이동
    console.log("risk item:", id);
  };

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-4 pb-8 pt-[max(12px,env(safe-area-inset-top))]">
        <div className="mb-3 flex items-center gap-3 py-2">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
          </button>
          <h1 className="text-lg font-bold text-[#191f28]">보안 리포트</h1>
        </div>

        <div
          className="mb-5 rounded-3xl p-5 text-center text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #1c3fae 0%, #3b6cff 100%)",
          }}
        >
          <div className="mb-3 flex items-center justify-between text-[11px] font-bold text-white/70">
            <span>{report.baseDate}</span>
            <span className="rounded-full bg-white/20 px-2.5 py-1">
              ✨ AI 분석
            </span>
          </div>

          <ScoreRing score={report.score} />

          {/* isSafe 여부와 상관없이 같은 문구를 보여주던 버그를 제거하고,
              등급별로 라벨/색을 분리했습니다. */}
          <p
            className="mt-3 text-sm font-bold"
            style={{ color: report.isSafe ? "#8ff5c9" : "#ffd200" }}
          >
            {report.isSafe ? "우수" : "양호"}
          </p>
          <p className="mt-1 text-[11px] font-bold text-white/70">
            일부 계정에 보안 조치가 필요합니다
          </p>
        </div>

        <SummaryBadges
          riskCount={report.riskCount}
          actionCount={report.actionCount}
          safeCount={report.safeCount}
        />

        <RecommendationList
          items={report.recommendations}
          onSelect={handleSelectRecommendation}
        />

        <RiskItemList
          items={report.riskItems}
          onSelect={handleSelectRiskItem}
        />

        <button
          onClick={() => navigate(ROUTES.SECURITY_ASSISTANT)}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#08257e] text-sm font-bold text-white"
        >
          <ChatIcon />
          보안 도우미에게 문의하기
        </button>
      </div>
    </PageBackground>
  );
}

export default SecurityReport;

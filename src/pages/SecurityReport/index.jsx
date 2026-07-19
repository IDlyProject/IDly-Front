// src/pages/SecurityReport/index.jsx
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import ScoreRing from "./components/ScoreRing";
import SummaryBadges from "./components/SummaryBadges";
import RecommendationList from "./components/RecommendationList";
import RiskItemList from "./components/RiskItemList";
import { useSecurityReport } from "@/hooks/useSecurityReport";
import { formatTimeAgo } from "@/utils/time";
import { ROUTES } from "@/constants/routes";

const GRADE_COLOR = {
  양호: "#8ff5c9",
  주의: "#ffd200",
  위험: "#ff6b6b",
};

function formatBaseDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `${date} 기준`;
}

// riskType은 자유 문자열(예: "new_device_login")이라, 기존 아이콘/색상 4종류 중
// 가장 그럴듯한 걸로 매핑한다. 못 맞추면 로그인류(빨강)로 기본 처리 — 이 리스트는
// 항상 실제 위험 이벤트라 "안전(초록)"으로 기본값을 두면 안 됨.
function classifyRiskType(riskType = "") {
  const t = riskType.toLowerCase();
  if (t.includes("leak") || t.includes("breach")) return "leak";
  if (t.includes("password")) return "password";
  if (t.includes("device") && !t.includes("login")) return "device";
  return "login";
}

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
  const { report, status } = useSecurityReport();

  if (status === "loading") {
    return (
      <PageBackground variant="frost">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">불러오는 중...</p>
        </div>
      </PageBackground>
    );
  }

  if (status === "error" || !report) {
    return (
      <PageBackground variant="frost">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">
            보안 리포트를 불러오지 못했어요.
          </p>
        </div>
      </PageBackground>
    );
  }

  const recommendations = (report.services ?? [])
    .filter((s) => s.riskLevel !== "safe")
    .map((s) => ({
      id: s.id,
      level: s.riskLevel,
      title: `${s.serviceName} · ${s.headline}`,
      desc: s.reason,
    }));

  const riskItems = (report.riskEvents ?? []).map((e) => ({
    id: e.id,
    type: classifyRiskType(e.riskType),
    title: `${e.serviceName} · ${e.title}`,
    desc: e.description,
    timeAgo: formatTimeAgo(e.receivedAt),
  }));

  const handleSelectRecommendation = (serviceId) => {
    navigate(ROUTES.ACCOUNT_DETAIL(serviceId));
  };

  const handleSelectRiskItem = (eventId) => {
    const event = report.riskEvents?.find((e) => e.id === eventId);
    const service = report.services?.find(
      (s) => s.serviceName === event?.serviceName,
    );
    if (service) navigate(ROUTES.ACCOUNT_DETAIL(service.id));
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
            <span>{formatBaseDate(report.analyzedAt)}</span>
            {report.hasAiSnapshot && (
              <span className="rounded-full bg-white/20 px-2.5 py-1">
                ✨ AI 분석
              </span>
            )}
          </div>

          <ScoreRing score={report.securityScore} />

          <p
            className="mt-3 text-sm font-bold"
            style={{ color: GRADE_COLOR[report.grade] ?? "#ffd200" }}
          >
            {report.grade}
          </p>
          <p className="mt-1 text-[11px] font-bold text-white/70">
            {report.scoreDescription}
          </p>
        </div>

        <SummaryBadges
          riskCount={report.summaryCounts?.danger ?? 0}
          actionCount={report.summaryCounts?.caution ?? 0}
          safeCount={report.summaryCounts?.safe ?? 0}
        />

        <RecommendationList
          items={recommendations}
          onSelect={handleSelectRecommendation}
        />

        <RiskItemList items={riskItems} onSelect={handleSelectRiskItem} />

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

import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import ActionButton from "@/components/ui/ActionButton";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ErrorScreen from "@/components/ui/ErrorScreen";
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

function SecurityReport() {
  const navigate = useNavigate();
  const { report, status } = useSecurityReport();

  if (status === "loading") return <LoadingScreen />;
  if (status === "error" || !report) {
    return <ErrorScreen text="보안 리포트를 불러오지 못했어요." />;
  }


  const isSafe = report.grade === "양호";

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
    const service = report.services?.find((s) => s.id === serviceId);
    navigate(ROUTES.ACCOUNT_DETAIL(serviceId), {
      state: { iconUrl: service?.iconUrl, iconLabel: service?.iconLabel },
    });
  };

  const handleSelectRiskItem = (eventId) => {
    const event = report.riskEvents?.find((e) => e.id === eventId);
    const service = report.services?.find(
      (s) => s.serviceName === event?.serviceName,
    );
    if (service) {
      navigate(ROUTES.ACCOUNT_DETAIL(service.id), {
        state: { iconUrl: service.iconUrl, iconLabel: service.iconLabel },
      });
    }
  };

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-4">
        <div className="my-1.5 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
            className="w-9 h-9 bg-white rounded-full grid place-items-center"
          >
            <ArrowLeftIcon />
          </button>
          <h1 className="text-b24 text-[18px] text-gray100">보안 리포트</h1>
        </div>

        <div
          className="mb-6 rounded-[20px] px-6 py-7 text-center text-white shadow-[0_8px_24px_rgba(8,37,126,0.2)]"
          style={{
            background: isSafe
              ? "linear-gradient(135deg, #3B6CFF 0%, #08257E 100%)"
              : "linear-gradient(135deg, #E43939 0%, #08257E 100%)",
          }}
        >
          <div className="mb-3 flex items-center justify-between text-m14 text-[12px] text-white/80">
            <span>{formatBaseDate(report.analyzedAt)}</span>
            {report.hasAiSnapshot && (
              <span className="text-white rounded-10px text-sb16 text-[11px] bg-white/10 px-2 py-1">
                ✨ AI 분석
              </span>
            )}
          </div>

          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-white/10">
            <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white/10">
              <span className="text-[40px] font-bold leading-none text-white">
                {report.securityScore}
              </span>
              <span className="mt-1 text-[11px] font-regular text-white/60">
                /100
              </span>
            </div>
          </div>

          <p
            className="mt-2 text-sb16 font-bold"
            style={{ color: GRADE_COLOR[report.grade] ?? "#ffd200" }}
          >
            {report.grade}
          </p>
          <p className="mt-2 text-m14 text-[13px]  text-white">
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

        <ActionButton
          bgColor="var(--color-main100)"
          textColor="var(--color-white)"
          onClick={() => navigate(ROUTES.SECURITY_ASSISTANT)}
        >
          보안 도우미에게 문의하기
        </ActionButton>
      </div>
    </PageBackground>
  );
}

export default SecurityReport;

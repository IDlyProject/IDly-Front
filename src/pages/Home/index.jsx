// src/pages/Home/index.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import HomeHeader from "./components/HomeHeader";
import PullToRefresh from "./components/PullToRefresh";
import StatusHero from "./components/StatusHero";
import EmailSelector from "./components/EmailSelector";
import RecommendCard from "./components/RecommendCard";
import Apartment from "./components/Apartment";
import { useHomeData } from "@/hooks/useHomeData";
import { AVATAR_GRADIENTS } from "@/utils/mailAccount";
import { getServiceIconGradient } from "@/utils/serviceIcon";
import { triggerAnalysisRun, waitForAnalysisCompletion } from "@/api/analysis";
import { ROUTES } from "@/constants/routes";

function Home() {
  const navigate = useNavigate();
  const [selectedEmailId, setSelectedEmailId] = useState("all");
  const mailAccountId = selectedEmailId === "all" ? undefined : selectedEmailId;
  const { data: homeData, status: homeStatus, reload } = useHomeData(mailAccountId);
  // 휴면 처리 API가 아직 없어서, "숨기기"는 화면에서만 낙관적으로 위험 표시를 해제한다
  const [dormantOverrideIds, setDormantOverrideIds] = useState(new Set());

  const emails = useMemo(() => {
    if (!homeData) return [];
    const primaryFirst = [...homeData.mailAccounts].sort(
      (a, b) => (b.role === "primary") - (a.role === "primary"),
    );
    return [
      { id: "all", label: "전체", count: homeData.metrics.totalServiceAccounts },
      ...primaryFirst.map((account, idx) => ({
        id: account.id,
        label: account.email,
        count: account.serviceAccountCount,
        avatarBg:
          account.role === "primary"
            ? AVATAR_GRADIENTS[0]
            : AVATAR_GRADIENTS[(idx % (AVATAR_GRADIENTS.length - 1)) + 1],
        avatarLabel: account.email[0]?.toUpperCase() ?? "?",
      })),
    ];
  }, [homeData]);

  const accounts = useMemo(() => {
    if (!homeData) return [];
    return homeData.serviceAccounts.map((sa) => {
      const isDormant = dormantOverrideIds.has(sa.id);
      return {
        id: sa.id,
        name: sa.displayName,
        status: !isDormant && sa.status === "action_required" ? "risk" : "safe",
        iconUrl: sa.iconUrl,
        iconBg: getServiceIconGradient(sa.serviceName),
        iconText: sa.iconLabel,
      };
    });
  }, [homeData, dormantOverrideIds]);

  const handleHideAccount = (accountId) => {
    // TODO: 실제로는 서버에 휴면 처리 API 호출 필요
    setDormantOverrideIds((prev) => new Set(prev).add(accountId));
  };

  const handleOrganizeAccount = () => {
    navigate(ROUTES.ORGANIZE);
  };

  const handleAddAccount = () => {
    navigate(ROUTES.ONBOARDING_ADD_ACCOUNT);
  };

  const handleRefresh = async () => {
    try {
      const { analysisId } = await triggerAnalysisRun();
      await waitForAnalysisCompletion(analysisId);
      await reload();
    } catch {
      // TODO: 재분석 실패를 사용자에게 알릴 방법 필요 (토스트 등)
    }
  };

  if (homeStatus === "loading" && !homeData) {
    return (
      <PageBackground variant="frost">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">불러오는 중...</p>
        </div>
      </PageBackground>
    );
  }

  if (homeStatus === "error" && !homeData) {
    return (
      <PageBackground variant="frost">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">
            홈 정보를 불러오지 못했어요.
          </p>
        </div>
      </PageBackground>
    );
  }

  const cardNews = homeData.cardNews?.[0];

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-4 pb-4 pt-[max(8px,env(safe-area-inset-top))]">
        <HomeHeader />
        <PullToRefresh onRefresh={handleRefresh}>
          <button
            onClick={() => navigate(ROUTES.SECURITY_REPORT)}
            className="w-full text-left"
          >
            <StatusHero
              userName={homeData.userName ?? "회원"}
              totalCount={homeData.metrics.totalServiceAccounts}
              isSafe={homeData.riskSummary.state === "safe"}
              riskCount={homeData.metrics.actionRequiredCount}
              score={homeData.metrics.securityScore}
              title={homeData.riskSummary.title}
            />
          </button>

          <div className="h-3.5" />

          {cardNews && (
            <RecommendCard
              url={cardNews.url}
              emoji={cardNews.emoji}
              title={cardNews.title}
            />
          )}

          <div className="h-3.25" />

          <EmailSelector
            emails={emails}
            selectedId={selectedEmailId}
            onSelect={setSelectedEmailId}
            onAddAccount={handleAddAccount}
          />

          <div className="h-3.25" />

          <Apartment
            accounts={accounts}
            onHideAccount={handleHideAccount}
            onOrganizeAccount={handleOrganizeAccount}
          />
        </PullToRefresh>
      </div>
    </PageBackground>
  );
}

export default Home;

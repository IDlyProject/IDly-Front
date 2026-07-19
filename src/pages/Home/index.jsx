// src/pages/Home/index.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ErrorScreen from "@/components/ui/ErrorScreen";
import { useToast } from "@/components/ui/ToastProvider";
import HomeHeader from "./components/HomeHeader";
import PullToRefresh from "./components/PullToRefresh";
import StatusHero from "./components/StatusHero";
import EmailSelector from "./components/EmailSelector";
import RecommendCard from "./components/RecommendCard";
import Apartment from "./components/Apartment";
import { useHomeData } from "@/hooks/useHomeData";
import {
  PALETTE_GRADIENTS,
  getGradientByIndexReservingPrimary,
} from "@/utils/palette";
import { getServiceIconGradient } from "@/utils/serviceIcon";
import { triggerAnalysisRun, waitForAnalysisCompletion } from "@/api/analysis";
import { setServiceAccountDormant } from "@/api/serviceAccounts";
import { ROUTES } from "@/constants/routes";

function Home() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [selectedEmailId, setSelectedEmailId] = useState("all");
  const mailAccountId = selectedEmailId === "all" ? undefined : selectedEmailId;
  const { data: homeData, status: homeStatus, reload } = useHomeData(mailAccountId);

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
            ? PALETTE_GRADIENTS[0]
            : getGradientByIndexReservingPrimary(idx),
        avatarLabel: account.email[0]?.toUpperCase() ?? "?",
      })),
    ];
  }, [homeData]);

  const accounts = useMemo(() => {
    if (!homeData) return [];
    return homeData.serviceAccounts.map((sa) => ({
      id: sa.id,
      name: sa.displayName,
      status: sa.status === "action_required" ? "risk" : "safe",
      iconUrl: sa.iconUrl,
      iconBg: getServiceIconGradient(sa.serviceName),
      iconText: sa.iconLabel || sa.displayName?.[0]?.toUpperCase() || "?",
    }));
  }, [homeData]);

  const handleHideAccount = async (accountId) => {
    try {
      await setServiceAccountDormant(accountId);
      await reload();
    } catch {
      showToast("휴면 처리에 실패했어요. 다시 시도해주세요.");
    }
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
      showToast("재분석에 실패했어요. 다시 시도해주세요.");
    }
  };

  // 이미 데이터가 있으면(재요청 중) 전체 화면을 덮지 않고 기존 화면을 유지한다
  if (homeStatus === "loading" && !homeData) return <LoadingScreen />;
  if (homeStatus === "error" && !homeData) {
    return <ErrorScreen text="홈 정보를 불러오지 못했어요." />;
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

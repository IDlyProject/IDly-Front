import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ErrorScreen from "@/components/ui/ErrorScreen";
import { useToast } from "@/components/ui/ToastProvider";
import HomeHeader from "./components/HomeHeader";
import StatusHero from "./components/StatusHero";
import EmailSelector from "./components/EmailSelector";
import RecommendCard from "./components/RecommendCard";
import Apartment from "./components/Apartment";
import MailboxGrid from "./components/MailboxGrid";
import ActionRequiredBar from "./components/ActionRequiredBar";
import ImmediateActionsSheet from "./components/ImmediateActionsSheet";
import FeedbackButton from "@/components/ui/FeedbackButton";
import { useHomeData } from "@/hooks/useHomeData";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  PALETTE_GRADIENTS,
  getGradientByIndexReservingPrimary,
} from "@/utils/palette";
import { getServiceIconGradient } from "@/utils/serviceIcon";
import { setServiceAccountDormant } from "@/services/serviceAccountsService";
import { getErrorMessage } from "@/lib/api";
import { ROUTES } from "@/constants/routes";

function Home() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [selectedEmailId, setSelectedEmailId] = useState("all");
  const [emailSelectorOpen, setEmailSelectorOpen] = useState(false);
  const [showActionsSheet, setShowActionsSheet] = useState(false);
  const mailAccountId = selectedEmailId === "all" ? undefined : selectedEmailId;
  const { data: homeData, status: homeStatus, reload } = useHomeData(mailAccountId);
  const { user } = useCurrentUser();
  const displayName = user?.nickname ?? user?.name ?? homeData?.userName;

  const emails = useMemo(() => {
    if (!homeData) return [];
    const primaryFirst = [...homeData.mailAccounts].sort(
      (a, b) => (b.role === "primary") - (a.role === "primary"),
    );
    return [
      { id: "all", label: "전체", count: homeData.metrics.totalServiceAccounts },
      ...primaryFirst.map((account, idx) => {
        const mailboxServiceAccounts = homeData.serviceAccounts.filter(
          (sa) => sa.sourceMailAccountId === account.id,
        );
        const hasRisk = mailboxServiceAccounts.some(
          (sa) => sa.status === "action_required",
        );
        const hasWatch = mailboxServiceAccounts.some(
          (sa) => sa.status === "watch",
        );
        return {
          id: account.id,
          label: account.email,
          count: account.serviceAccountCount,
          status: hasRisk ? "risk" : hasWatch ? "watch" : "safe",
          avatarBg:
            account.role === "primary"
              ? PALETTE_GRADIENTS[0]
              : getGradientByIndexReservingPrimary(idx),
          avatarLabel: account.email[0]?.toUpperCase() ?? "?",
        };
      }),
    ];
  }, [homeData]);

  const mailboxes = useMemo(
    () => emails.filter((email) => email.id !== "all"),
    [emails],
  );

  const accounts = useMemo(() => {
    if (!homeData) return [];
    return homeData.serviceAccounts.map((sa) => ({
      id: sa.id,
      name: sa.displayName,
      status:
        sa.status === "action_required"
          ? "risk"
          : sa.status === "watch"
            ? "watch"
            : "safe",
      iconUrl: sa.iconUrl,
      iconBg: getServiceIconGradient(sa.serviceName),
      iconText: sa.iconLabel || sa.displayName?.[0]?.toUpperCase() || "?",
    }));
  }, [homeData]);

  const handleHideAccount = async (accountId) => {
    try {
      await setServiceAccountDormant(accountId);
      await reload();
    } catch (err) {
      showToast(getErrorMessage(err, "휴면 처리에 실패했어요. 다시 시도해주세요."));
    }
  };

  const handleAddAccount = () => {
    navigate(ROUTES.ONBOARDING_ADD_MAILBOXES);
  };

  const handleStartActions = (priorityAccountId) => {
    setShowActionsSheet(false);
    if (priorityAccountId) {
      navigate(ROUTES.ACCOUNT_ACTION(priorityAccountId));
    }
  };

  if (homeStatus === "loading" && !homeData) return <LoadingScreen />;
  if (homeStatus === "error" && !homeData) {
    return <ErrorScreen text="홈 정보를 불러오지 못했어요." />;
  }

  const cardNews = homeData.cardNews?.[0];
  const priorityAccountId = homeData.riskSummary.serviceAccountId;

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-4 pb-4 pt-[max(8px,env(safe-area-inset-top))]">
        <HomeHeader />
        <button
          onClick={() =>
            priorityAccountId &&
            navigate(ROUTES.ACCOUNT_DETAIL(priorityAccountId))
          }
          disabled={!priorityAccountId}
          className="w-full text-left"
        >
          <StatusHero
            userName={displayName ?? "회원"}
            totalCount={homeData.metrics.totalServiceAccounts}
            mailboxCount={homeData.mailAccounts.length}
            showMailboxCount={selectedEmailId === "all"}
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
          onOpenChange={setEmailSelectorOpen}
        />

        <div className="h-3.25" />

        {selectedEmailId === "all" ? (
          <MailboxGrid mailboxes={mailboxes} onSelect={setSelectedEmailId} />
        ) : (
          <Apartment accounts={accounts} onHideAccount={handleHideAccount} />
        )}
      </div>

      {selectedEmailId === "all" &&
        !emailSelectorOpen &&
        homeData.metrics.actionRequiredCount > 0 && (
          <ActionRequiredBar
            count={homeData.metrics.actionRequiredCount}
            onClick={() => setShowActionsSheet(true)}
          />
        )}

      {showActionsSheet && (
        <ImmediateActionsSheet
          onClose={() => setShowActionsSheet(false)}
          onStart={() => handleStartActions(priorityAccountId)}
        />
      )}

      <FeedbackButton
        bottomOffset={
          selectedEmailId === "all" &&
          !emailSelectorOpen &&
          homeData.metrics.actionRequiredCount > 0
            ? 180
            : 116
        }
      />
    </PageBackground>
  );
}

export default Home;

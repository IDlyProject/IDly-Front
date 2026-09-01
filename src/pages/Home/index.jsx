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
import { trackEvent } from "@/lib/ga";
import { ROUTES } from "@/constants/routes";

function Home() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [selectedEmailId, setSelectedEmailId] = useState("all");
  const [emailSelectorOpen, setEmailSelectorOpen] = useState(false);
  const [showActionsSheet, setShowActionsSheet] = useState(false);
  const mailAccountId = selectedEmailId === "all" ? undefined : selectedEmailId;
  const hasFilter = !!mailAccountId;

  // 메일함 목록(EmailSelector, MailboxGrid)은 특정 메일함으로 필터링된 응답이 아니라
  // 항상 전체 목록 기준으로 구성해야, 특정 메일함 선택 상태에서 다시 열어도
  // 다른 메일함들이 그대로 보인다.
  const { data: allMailData, status: allMailStatus, reload: reloadAll } = useHomeData(undefined);
  // 특정 메일함 필터 없을 때는 allMailData를 재사용 — GET /api/home 중복 호출 방지
  const { data: filteredData, status: filteredStatus, reload: reloadFiltered } = useHomeData(mailAccountId, !hasFilter);

  const homeData = hasFilter ? filteredData : allMailData;
  const homeStatus = hasFilter ? filteredStatus : allMailStatus;
  const reload = hasFilter ? reloadFiltered : reloadAll;
  const reloadAllMailData = reloadAll;
  const { user } = useCurrentUser();
  const displayName = user?.nickname ?? user?.name ?? homeData?.userName;

  const emails = useMemo(() => {
    if (!allMailData) return [];
    const primaryFirst = [...allMailData.mailAccounts].sort(
      (a, b) => (b.role === "primary") - (a.role === "primary"),
    );
    return [
      {
        id: "all",
        label: "전체",
        count: allMailData.metrics.totalServiceAccounts,
      },
      ...primaryFirst.map((account, idx) => {
        const mailboxServiceAccounts = allMailData.serviceAccounts.filter(
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
  }, [allMailData]);

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
      trackEvent("account_dormant_set", { serviceAccountId: accountId });
      await Promise.all([reload(), reloadAllMailData()]);
    } catch (err) {
      showToast(getErrorMessage(err, "휴면 처리에 실패했어요. 다시 시도해주세요."));
    }
  };

  const handleAddAccount = () => {
    trackEvent("mailbox_add_clicked", { source: "home" });
    navigate(ROUTES.ONBOARDING_ADD_MAILBOXES);
  };

  const handleSelectAction = (serviceAccountId) => {
    setShowActionsSheet(false);
    if (serviceAccountId) {
      trackEvent("immediate_action_start_clicked", { serviceAccountId });
      navigate(ROUTES.ACCOUNT_ACTION(serviceAccountId));
    }
  };

  const handleOpenActionsSheet = () => {
    trackEvent("immediate_actions_sheet_opened", {
      action_count: homeData?.metrics?.actionRequiredCount ?? 0,
    });
    setShowActionsSheet(true);
  };

  if (homeStatus === "loading" && !homeData) return <LoadingScreen />;
  if (homeStatus === "error" && !homeData) {
    return <ErrorScreen text="홈 정보를 불러오지 못했어요." />;
  }

  const cardNews = homeData.cardNews?.[0];
  const priorityAccountId = homeData.riskSummary.serviceAccountId;
  const immediateActions = homeData.immediateActions;
  const hasImmediateActions = immediateActions.length > 0;

  return (
    <PageBackground variant="frost" fill>
      <div className="px-4 pb-4 pt-[max(8px,env(safe-area-inset-top))]">
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

      {selectedEmailId === "all" && !emailSelectorOpen && hasImmediateActions && (
        <ActionRequiredBar
          count={homeData.metrics.actionRequiredCount}
          onClick={handleOpenActionsSheet}
        />
      )}

      {showActionsSheet && (
        <ImmediateActionsSheet
          actions={immediateActions}
          onClose={() => setShowActionsSheet(false)}
          onSelectAction={handleSelectAction}
          onStart={() => handleSelectAction(immediateActions[0]?.serviceAccountId)}
        />
      )}

      <FeedbackButton
        bottomOffset={
          selectedEmailId === "all" && !emailSelectorOpen && hasImmediateActions
            ? 180
            : 116
        }
      />
    </PageBackground>
  );
}

export default Home;

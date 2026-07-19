// src/pages/Organize/index.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import EmailSelector from "./components/EmailSelector";
import RecommendCard from "@/pages/Home/components/RecommendCard";
import MonthlySummary from "./components/MonthlySummary";
import ServiceCard from "./components/ServiceCard";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ErrorScreen from "@/components/ui/ErrorScreen";
import { useSummary } from "@/hooks/useSummary";
import { useHomeData } from "@/hooks/useHomeData";
import { getGradientByIndex } from "@/utils/palette";
import { getServiceIconGradient } from "@/utils/serviceIcon";
import { formatTimeAgo } from "@/utils/time";
import { ROUTES } from "@/constants/routes";

function formatMonthLabel(month) {
  if (!month) return "이번 달 보안 조치";
  const [year, m] = month.split("-");
  return `${year}년 ${Number(m)}월 보안 조치`;
}

function Organize() {
  const navigate = useNavigate();
  const { summary, status } = useSummary();
  // 카드뉴스는 summary 응답엔 없고 home 응답에만 있어서, 그 부분만 재사용
  const { data: homeData } = useHomeData();
  const [selectedEmailId, setSelectedEmailId] = useState("all");

  const emails = useMemo(() => {
    if (!summary) return [];
    return [
      { id: "all", label: "전체", count: summary.services.length },
      ...summary.mailAccounts.map((account, idx) => ({
        id: account.id,
        label: account.email,
        count: summary.services.filter(
          (s) => s.sourceMailAccount?.id === account.id,
        ).length,
        avatarBg: getGradientByIndex(idx),
        avatarLabel: account.email[0]?.toUpperCase() ?? "?",
      })),
    ];
  }, [summary]);

  const services = useMemo(() => {
    if (!summary) return [];
    const filtered =
      selectedEmailId === "all"
        ? summary.services
        : summary.services.filter(
            (s) => s.sourceMailAccount?.id === selectedEmailId,
          );

    return filtered.map((s) => ({
      id: s.id,
      name: s.serviceName,
      iconUrl: s.iconUrl,
      iconBg: getServiceIconGradient(s.serviceName),
      iconText: s.iconLabel,
      actionCount: s.actions.length,
      tasks: s.actions.map((a) => ({
        id: a.id,
        title: a.title,
        status: a.status, // pending | done
        timeAgo: formatTimeAgo(a.updatedAt),
      })),
    }));
  }, [summary, selectedEmailId]);

  const handleSelectService = (serviceId) => {
    // getDetail API가 아직 iconUrl을 못 줄 때를 대비해 정리 화면에서 이미 받은
    // 아이콘을 navigation state로 같이 넘긴다
    const service = services.find((s) => s.id === serviceId);
    navigate(ROUTES.ACCOUNT_DETAIL(serviceId), {
      state: { iconUrl: service?.iconUrl, iconLabel: service?.iconText },
    });
  };

  const handleSelectTask = (serviceId) => {
    navigate(ROUTES.ACCOUNT_ACTION(serviceId));
  };

  const handleAddAccount = () => {
    navigate(ROUTES.ONBOARDING_ADD_ACCOUNT);
  };

  if (status === "loading") return <LoadingScreen />;
  if (status === "error" || !summary) {
    return <ErrorScreen text="정리 정보를 불러오지 못했어요." />;
  }

  const isSafe = summary.progress.pending === 0;
  const cardNews = homeData?.cardNews?.[0];

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-4 pb-4">
        <div className="my-5 mx-1 flex items-center justify-between">
          <h1 className="text-b24 text-[22px] text-gray100">정리</h1>
          <EmailSelector
            emails={emails}
            selectedId={selectedEmailId}
            onSelect={setSelectedEmailId}
            onAddAccount={handleAddAccount}
          />
        </div>

        <MonthlySummary
          label={formatMonthLabel(summary.month)}
          completedCount={summary.progress.done}
          pendingCount={summary.progress.pending}
          isSafe={isSafe}
        />

        <div className="h-3.5" />

        {cardNews ? (
          <RecommendCard
            url={cardNews.url}
            emoji={cardNews.emoji}
            title={cardNews.title}
          />
        ) : (
          <RecommendCard url="https://idly-apt.tistory.com/2" />
        )}

        <div className="mt-3.5">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={handleSelectService}
              onSelectTask={handleSelectTask}
            />
          ))}
        </div>
      </div>
    </PageBackground>
  );
}

export default Organize;

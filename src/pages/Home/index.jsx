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
import { MOCK_EMAILS, MOCK_ACCOUNTS } from "./mockData";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ROUTES } from "@/constants/routes";

function Home() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [selectedEmailId, setSelectedEmailId] = useState("all");
  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);

  const filteredAccounts = useMemo(() => {
    if (selectedEmailId === "all") return accounts;
    return accounts.filter((a) => a.emailGroup === selectedEmailId);
  }, [selectedEmailId, accounts]);

  const allRiskAccounts = useMemo(
    () => accounts.filter((a) => a.status === "risk"),
    [accounts],
  );

  const overallRiskCount = allRiskAccounts.length;
  const overallIsSafe = overallRiskCount === 0;
  const overallScore = overallIsSafe ? 92 : 17;

  const handleHideAccount = (accountId) => {
    // TODO: 실제로는 서버에 휴면 처리 API 호출 필요
    setAccounts((prev) =>
      prev.map((a) => (a.id === accountId ? { ...a, status: "dormant" } : a)),
    );
  };

  const handleOrganizeAccount = () => {
    navigate(ROUTES.ORGANIZE);
  };

  const handleAddAccount = () => {
    navigate(ROUTES.ONBOARDING_ADD_ACCOUNT);
  };

  const handleRefresh = async () => {
    // TODO: 실제 API 재조회 로직으로 교체
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

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
              userName={user?.name ?? "회원"}
              totalCount={accounts.length}
              isSafe={overallIsSafe}
              riskCount={overallRiskCount}
              score={overallScore}
            />
          </button>

          <div className="h-3.5" />

          <RecommendCard url="https://idly-apt.tistory.com/2" />

          <div className="h-3.25" />

          <EmailSelector
            emails={MOCK_EMAILS}
            selectedId={selectedEmailId}
            onSelect={setSelectedEmailId}
            onAddAccount={handleAddAccount}
          />

          <div className="h-3.25" />

          <Apartment
            accounts={filteredAccounts}
            onHideAccount={handleHideAccount}
            onOrganizeAccount={handleOrganizeAccount}
          />
        </PullToRefresh>
      </div>
    </PageBackground>
  );
}

export default Home;

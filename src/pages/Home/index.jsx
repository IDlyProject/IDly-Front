// src/pages/Home/index.jsx
import { useMemo, useState } from "react";
import PageBackground from "@/components/layouts/PageBackground";
import EmailSelector from "./components/EmailSelector";
import MetricGrid from "./components/MetricGrid";
import SyncStrip from "./components/SyncStrip";
import RiskBanner from "./components/RiskBanner";
import RecommendCard from "./components/RecommendCard";
import Apartment from "./components/Apartment";
import { MOCK_EMAILS, MOCK_ACCOUNTS } from "./mockData";

function Home() {
  const [selectedEmailId, setSelectedEmailId] = useState("all");

  const filteredAccounts = useMemo(() => {
    if (selectedEmailId === "all") return MOCK_ACCOUNTS;
    return MOCK_ACCOUNTS.filter((a) => a.emailGroup === selectedEmailId);
  }, [selectedEmailId]);

  const riskAccounts = filteredAccounts.filter((a) => a.status === "risk");
  const riskCount = riskAccounts.length;
  const topRisk = riskAccounts[0];
  const isSafe = riskCount === 0;
  const securityScore = isSafe ? 92 : 78;

  const selectedEmail = MOCK_EMAILS.find((e) => e.id === selectedEmailId);
  const groupLabel = selectedEmailId === "all" ? "" : selectedEmail?.groupLabel;

  return (
    <PageBackground variant="default">
      <div className="min-h-dvh px-4 pb-4 pt-[max(16px,env(safe-area-inset-top))]">
        <h3 className="mb-4 text-xl font-bold text-[#191f28]">
          민지님의 계정아파트
        </h3>

        <EmailSelector
          emails={MOCK_EMAILS}
          selectedId={selectedEmailId}
          onSelect={setSelectedEmailId}
        />

        <MetricGrid
          total={filteredAccounts.length}
          riskCount={riskCount}
          score={securityScore}
        />

        <SyncStrip
          lastSyncTime="9:41"
          description={
            selectedEmailId === "all"
              ? "새 메일 수신 시 변경분만 확인"
              : `${selectedEmail?.label} 기준`
          }
        />

        {isSafe ? (
          <RiskBanner
            safe
            title={
              groupLabel
                ? `${groupLabel} 조치할 계정 없음`
                : "현재 조치할 계정 없음"
            }
            description={
              groupLabel
                ? "현재 위험 신호가 감지된 계정이 없습니다."
                : "새 보안 알림이 들어오면 홈 상태를 다시 갱신합니다."
            }
          />
        ) : (
          <>
            <RiskBanner
              title={`가장 먼저 ${topRisk.name} 확인`}
              description={topRisk.reason ?? "위험도 높음"}
              onClick={() => {
                // TODO: 문제 상세 화면으로 이동
              }}
            />
            <RecommendCard />
          </>
        )}

        <Apartment accounts={filteredAccounts} />
      </div>
    </PageBackground>
  );
}

export default Home;

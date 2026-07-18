// src/pages/Organize/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import EmailSelector from "@/pages/Home/components/EmailSelector";
import RecommendCard from "@/pages/Home/components/RecommendCard";
import MonthlySummary from "./components/MonthlySummary";
import ServiceCard from "./components/ServiceCard";
import { MOCK_ORGANIZE } from "./mockOrganizeData";
import { MOCK_EMAILS } from "@/pages/Home/mockData";
import { ROUTES } from "@/constants/routes";

function Organize() {
  const navigate = useNavigate();
  const [selectedEmailId, setSelectedEmailId] = useState("all");
  const data = MOCK_ORGANIZE;

  const isSafe = data.waitingCount === 0;

  const handleSelectTask = (serviceId, taskId) => {
    // TODO: 조치 챗봇 창으로 이동, 실제 라우트/파라미터 확정되면 교체
    navigate(ROUTES.SECURITY_ASSISTANT);
  };

  const handleAddAccount = () => {
    navigate(ROUTES.ONBOARDING_ADD_ACCOUNT);
  };

  return (
    <PageBackground variant="default">
      <div className="min-h-dvh px-4 pb-4 pt-[max(12px,env(safe-area-inset-top))]">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#191f28]">정리</h1>
        </div>

        <EmailSelector
          emails={MOCK_EMAILS}
          selectedId={selectedEmailId}
          onSelect={setSelectedEmailId}
          onAddAccount={handleAddAccount}
        />

        <MonthlySummary
          label={data.monthLabel}
          completedCount={data.completedCount}
          inProgressCount={data.inProgressCount}
          waitingCount={data.waitingCount}
          isSafe={isSafe}
        />

        <RecommendCard url="https://idly-apt.tistory.com/2" />

        <div className="mt-2.5">
          {data.services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectTask={handleSelectTask}
              defaultOpen={service.expanded}
            />
          ))}
        </div>
      </div>
    </PageBackground>
  );
}

export default Organize;

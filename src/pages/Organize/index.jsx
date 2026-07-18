// src/pages/Organize/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import EmailSelector from "./components/EmailSelector";
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

  const handleSelectService = (serviceId) => {
    // TODO: 실제로는 serviceId를 함께 넘겨서 어떤 서비스에 대한 문의인지 챗봇이 알아야 함
    navigate(ROUTES.SECURITY_ASSISTANT);
  };

  const handleSelectTask = (serviceId, taskId) => {
    // TODO: 조치 챗봇 창으로 이동, 실제 라우트/파라미터 확정되면 교체
    navigate(ROUTES.SECURITY_ASSISTANT);
  };

  const handleAddAccount = () => {
    navigate(ROUTES.ONBOARDING_ADD_ACCOUNT);
  };

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-4 pb-4">
        <div className="my-5 mx-1 flex items-center justify-between">
          <h1 className="text-b24 text-[22px] text-gray100">정리</h1>
          <EmailSelector
            emails={MOCK_EMAILS}
            selectedId={selectedEmailId}
            onSelect={setSelectedEmailId}
            onAddAccount={handleAddAccount}
          />
        </div>

        <MonthlySummary
          label={data.monthLabel}
          completedCount={data.completedCount}
          inProgressCount={data.inProgressCount}
          waitingCount={data.waitingCount}
          isSafe={isSafe}
        />

        <div className="h-3.5" />

        <RecommendCard url="https://idly-apt.tistory.com/2" />

        <div className="mt-3.5">
          {data.services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={handleSelectService}
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

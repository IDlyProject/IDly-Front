// src/pages/AccountAction/index.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import BottomNav from "@/components/layouts/BottomNav";
import ProgressCard from "./components/ProgressCard";
import TaskItem from "./components/TaskItem";
import CompleteModal from "./components/CompleteModal";
import { getDetailByAccountId } from "@/pages/AccountDetail/mockDetailData";
import { ROUTES } from "@/constants/routes";

function AccountAction() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const detail = getDetailByAccountId(accountId);

  const [taskStatus, setTaskStatus] = useState({});
  const [showModal, setShowModal] = useState(false);

  if (!detail) {
    navigate(ROUTES.HOME, { replace: true });
    return null;
  }

  const requiredTasks = detail.tasks.filter((t) => t.required);
  // 필수 항목은 "완료(done)" 처리된 것만 진행률에 카운트 (건너뛰기는 미포함)
  const completedRequired = requiredTasks.filter(
    (t) => taskStatus[t.id] === "done",
  ).length;
  const allRequiredDone = completedRequired === requiredTasks.length;

  const handleComplete = (taskId) => {
    setTaskStatus((prev) => ({ ...prev, [taskId]: "done" }));
  };

  const handleSkip = (taskId) => {
    setTaskStatus((prev) => ({ ...prev, [taskId]: "skipped" }));
  };

  const handleUndo = (taskId) => {
    setTaskStatus((prev) => ({ ...prev, [taskId]: "pending" }));
  };

  const handleOpenLink = (taskId) => {
    window.open(detail.officialUrl, "_blank", "noopener,noreferrer");
    if (taskId) {
      setTaskStatus((prev) => ({ ...prev, [taskId]: "visited" }));
    }
  };

  const handleCompleteAction = () => {
    // TODO: actionStatus를 resolved로 저장하는 API 호출
    setShowModal(true);
  };

  const handleSkipAction = () => {
    // TODO: actionStatus를 skipped로 저장하는 API 호출
    navigate(ROUTES.HOME);
  };

  return (
    <PageBackground variant="default">
      <div className="min-h-dvh px-4 pb-[calc(96px+env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))]">
        <div className="mb-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-[#191f28]"
          >
            ‹
          </button>
          <h3 className="text-lg font-bold text-[#191f28]">
            {detail.name} 대응하기
          </h3>
        </div>

        <ProgressCard
          completed={completedRequired}
          total={requiredTasks.length}
        />

        <div className="mt-3 grid gap-2.5">
          {detail.tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              status={taskStatus[task.id] ?? "pending"}
              onComplete={handleComplete}
              onSkip={handleSkip}
              onUndo={handleUndo}
              onOpenLink={handleOpenLink}
            />
          ))}
        </div>

        <button
          onClick={() => handleOpenLink()}
          className="mt-4.5 h-12 w-full rounded-2xl bg-[#3b6cff] text-sm font-bold text-white shadow-lg shadow-blue-500/25"
        >
          공식 페이지에서 조치하기
        </button>

        {!allRequiredDone && (
          <p className="mt-2 text-center text-[11px] font-bold text-[#6b7684]">
            필수 항목 {requiredTasks.length}개를 확인하면 완료 버튼이
            활성화됩니다.
          </p>
        )}

        <button
          onClick={handleCompleteAction}
          disabled={!allRequiredDone}
          className={`mt-2 h-12 w-full rounded-2xl text-sm font-bold ${
            allRequiredDone
              ? "bg-[#3b6cff] text-white shadow-lg shadow-blue-500/25"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
          }`}
        >
          조치 완료로 표시
        </button>

        <button
          onClick={handleSkipAction}
          className="mt-2.5 w-full text-center text-xs font-bold text-[#6b7684]"
        >
          조치하지 않고 넘어가기 →
        </button>
      </div>

      <BottomNav />

      {showModal && (
        <CompleteModal
          serviceName={detail.name}
          onCheckHome={() => navigate(ROUTES.HOME)}
          onCheckNext={() => navigate(ROUTES.HOME)}
        />
      )}
    </PageBackground>
  );
}

export default AccountAction;

// src/pages/Onboarding/Consent/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import PageBackground from "@/components/layouts/PageBackground";
import NotificationConfirmModal from "./components/NotificationConfirmModal";

const REQUIRED_ITEMS = [
  { id: "terms", label: "(필수) 서비스 이용약관", required: true },
  { id: "privacy", label: "(필수) 개인정보 처리방침", required: true },
  { id: "location", label: "(필수) 위치기반 서비스 이용약관", required: true },
  {
    id: "notification",
    label: "(선택) 실시간 보안 알림 수신 동의",
    required: false,
  },
  { id: "marketing", label: "(선택) 마케팅 정보 수신 동의", required: false },
];

function ProgressDots({ current, total }) {
  return (
    <div className="mb-6 flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const step = i + 1;

        if (step < current) {
          return (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#3b6cff]" />
          );
        }
        if (step === current) {
          return (
            <span key={i} className="h-1.5 w-6 rounded-full bg-[#3b6cff]" />
          );
        }
        return (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-gray-200" />
        );
      })}
    </div>
  );
}

function Checkbox({ checked }) {
  return (
    <span
      className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border transition-colors ${
        checked ? "border-[#3b6cff] bg-[#3b6cff]" : "border-gray-300 bg-white"
      }`}
    >
      {checked && (
        <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
          <path
            d="M1 5L4.5 8.5L11 1.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

function Consent() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const requiredItems = REQUIRED_ITEMS.filter((item) => item.required);
  const allRequiredChecked = requiredItems.every((item) => checked[item.id]);
  const allChecked = REQUIRED_ITEMS.every((item) => checked[item.id]);
  const notificationChecked = !!checked.notification;

  const toggleAll = () => {
    const next = {};
    REQUIRED_ITEMS.forEach((item) => (next[item.id] = !allChecked));
    setChecked(next);
  };

  const toggleOne = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const goToNextStep = () => {
    // TODO: 동의 상태를 서버에 저장하는 API 호출 필요 시 여기에 추가
    navigate(ROUTES.ONBOARDING_ACCOUNT_COMPLETE);
  };

  const handleAgreeClick = () => {
    if (!allRequiredChecked) return;

    // 필수 항목은 통과했지만, 알림 동의를 안 했다면 한 번 더 확인
    if (!notificationChecked) {
      setShowNotificationModal(true);
      return;
    }

    goToNextStep();
  };

  const handleModalAgree = () => {
    // 모달에서 "동의하고 계속하기" - 알림 동의 체크를 켜고 진행
    setChecked((prev) => ({ ...prev, notification: true }));
    setShowNotificationModal(false);
    goToNextStep();
  };

  const handleModalDismiss = () => {
    // "동의하지 않고 계속하기" - 알림 동의는 그대로 미체크 상태로 진행
    setShowNotificationModal(false);
    goToNextStep();
  };

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-6 pt-8 pb-8">
        <ProgressDots current={4} total={6} />

        <h1 className="text-[22px] font-bold leading-snug text-[#191f28]">
          서비스 이용 동의
        </h1>
        <p className="mt-1.5 text-[13px] font-bold text-[#9aa4b2]">
          idly 서비스 이용을 위해 약관에 동의해 주세요.
        </p>

        <div className="mt-6 flex-1">
          <button
            onClick={toggleAll}
            className="mb-4 flex w-full items-center gap-3 rounded-2xl bg-[#eef2ff] p-3.5 text-left"
          >
            <Checkbox checked={allChecked} />
            <b className="text-sm text-[#191f28]">전체 동의</b>
          </button>

          <div className="h-px bg-gray-100" />

          <div className="mt-4 space-y-4">
            {REQUIRED_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleOne(item.id)}
                className="flex w-full items-center gap-3 text-left"
              >
                <Checkbox checked={!!checked[item.id]} />
                <span className="text-[13px] font-bold text-[#191f28]">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAgreeClick}
          disabled={!allRequiredChecked}
          className={`h-14 w-full rounded-2xl text-[15px] font-bold text-white transition-opacity ${
            allRequiredChecked ? "bg-[#12206b]" : "bg-[#12206b] opacity-40"
          }`}
        >
          동의하고 시작하기
        </button>
      </div>

      {showNotificationModal && (
        <NotificationConfirmModal
          onAgree={handleModalAgree}
          onDismiss={handleModalDismiss}
        />
      )}
    </PageBackground>
  );
}

export default Consent;

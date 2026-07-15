// src/pages/Onboarding/Consent/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import ProgressDots from "../components/ProgressDot";
import AllCheckedBoxIcon from "@/assets/ic_all_checked_box.svg";
import CheckedBoxIcon from "@/assets/ic_checked_box.svg";
import UncheckedBoxIcon from "@/assets/ic_unchecked_box.svg";
import ActionButton from "@/components/ui/ActionButton";
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
    <>
      <div className="flex min-h-dvh flex-col px-4 pb-8">
        <div className="flex-1 px-1">
          <ProgressDots current={4} total={6} />
          <div className="py-4 gap-2">
            <h1 className="text-b24 text-gray100">서비스 이용 동의</h1>
            <p className="text-r14 text-gray60">
              idiy 서비스 이용을 위해 약관에 동의해 주세요.
            </p>
          </div>

          <div className="py-2">
            <button
              onClick={toggleAll}
              className="flex w-full items-center gap-3 rounded-2xl bg-[#F0F6FF] px-5 py-4.5 text-left"
            >
              <img
                src={allChecked ? AllCheckedBoxIcon : UncheckedBoxIcon}
                alt=""
                className="h-6.5 w-6.5"
              />
              <b className="text-sb16 text-gray100">전체 동의</b>
            </button>

            <div className="my-3 h-px bg-gray10" />

            <div>
              {REQUIRED_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleOne(item.id)}
                  className="px-2 py-3.5 flex w-full items-center gap-3 text-left"
                >
                  <img
                    src={checked[item.id] ? CheckedBoxIcon : UncheckedBoxIcon}
                    alt=""
                    className="h-5.5 w-5.5"
                  />
                  <span className="text-r14 text-gray100">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <ActionButton
          bgColor="var(--color-main100)"
          textColor="var(--color-white)"
          onClick={handleAgreeClick}
          disabled={!allRequiredChecked}
        >
          동의하고 시작하기
        </ActionButton>
      </div>

      {showNotificationModal && (
        <NotificationConfirmModal
          onAgree={handleModalAgree}
          onDismiss={handleModalDismiss}
        />
      )}
    </>
  );
}

export default Consent;

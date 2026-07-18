// src/pages/WithdrawReason/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import WithdrawConfirmModal from "@/pages/Withdraw/components/WithdrawConfirmModal";
import { ROUTES } from "@/constants/routes";
import ChevronLeftIcon from "@/assets/ic_chevron_left.svg";
import UncheckIcon from "@/assets/ic_withdraw_uncheck.svg";
import CheckIcon from "@/assets/ic_withdraw_check.svg";

const REASONS = [
  { id: "rare_use", label: "자주 이용하지 않아요" },
  { id: "frequent_error", label: "오류가 자주 발생해요" },
  { id: "inconvenient", label: "기능이 편리하지 않아요" },
  { id: "other", label: "기타" },
];

function RadioIcon({ selected }) {
  return (
    <img src={selected ? CheckIcon : UncheckIcon} alt="" className="h-5 w-5" />
  );
}

function WithdrawReason() {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherText, setOtherText] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const canSubmit =
    selectedReason && (selectedReason !== "other" || otherText.trim());

  const handleWithdrawClick = () => {
    if (!canSubmit) return;
    setShowConfirmModal(true);
  };

  const handleConfirmWithdraw = () => {
    // TODO: 실제 회원 탈퇴 API 호출 필요 (reason, otherText 전달)
    navigate(ROUTES.ONBOARDING_LOGIN, { replace: true });
  };

  return (
    <PageBackground variant="frost">
      <div className="flex min-h-dvh flex-col px-5 pb-24">
        <button
          onClick={() => navigate(-1)}
          className="my-1.5 grid h-9 w-9 place-items-center rounded-full bg-white"
        >
          <img src={ChevronLeftIcon} alt="" className="h-5 w-5" />
        </button>

        <h1 className="mb-7 mt-5 text-[20px] font-bold text-gray100">
          탈퇴 사유를 선택해주세요.
        </h1>

        <div className="flex-1 space-y-2.5">
          {REASONS.map((reason) => (
            <button
              key={reason.id}
              onClick={() => setSelectedReason(reason.id)}
              className="flex w-full items-center gap-3 px-1 py-2.5 text-left"
            >
              <RadioIcon selected={selectedReason === reason.id} />
              <span className="text-r14 text-[15px] text-gray100">
                {reason.label}
              </span>
            </button>
          ))}

          {selectedReason === "other" && (
            <textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="사유를 입력해주세요."
              rows={1}
              className="w-full rounded-[14px] border-[1.33px] border-[#E5E7EB] bg-white p-4 text-r14 outline-none placeholder:text-gray50 focus:border-main100 text-gray100"
            />
          )}
        </div>

        <button
          onClick={handleWithdrawClick}
          disabled={!canSubmit}
          className={`fixed bottom-11 left-4 right-4 h-13 rounded-[14px] text-sb16 text-white ${
            canSubmit ? "bg-[#EE4E4E]" : "bg-[#EE4E4E] opacity-40"
          }`}
        >
          탈퇴하기
        </button>
      </div>

      {showConfirmModal && (
        <WithdrawConfirmModal
          onConfirm={handleConfirmWithdraw}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </PageBackground>
  );
}

export default WithdrawReason;

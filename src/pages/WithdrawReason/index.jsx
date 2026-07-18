// src/pages/WithdrawReason/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import WithdrawConfirmModal from "@/pages/Withdraw/components/WithdrawConfirmModal";
import { ROUTES } from "@/constants/routes";

const REASONS = [
  { id: "rare_use", label: "자주 이용하지 않아요" },
  { id: "frequent_error", label: "오류가 자주 발생해요" },
  { id: "inconvenient", label: "기능이 편리하지 않아요" },
  { id: "other", label: "기타" },
];

function ArrowLeftIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#191f28"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function RadioIcon({ selected }) {
  return (
    <span
      className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border-2 ${
        selected ? "border-[#12206b]" : "border-gray-300"
      }`}
    >
      {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#12206b]" />}
    </span>
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
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-4 pb-8 pt-[max(12px,env(safe-area-inset-top))]">
        <button onClick={() => navigate(-1)} className="mb-6 self-start">
          <ArrowLeftIcon />
        </button>

        <h1 className="mb-5 text-xl font-bold text-[#191f28]">
          탈퇴 사유를 선택해주세요.
        </h1>

        <div className="flex-1 space-y-4">
          {REASONS.map((reason) => (
            <button
              key={reason.id}
              onClick={() => setSelectedReason(reason.id)}
              className="flex w-full items-center gap-3 text-left"
            >
              <RadioIcon selected={selectedReason === reason.id} />
              <span className="text-sm font-bold text-[#191f28]">
                {reason.label}
              </span>
            </button>
          ))}

          {selectedReason === "other" && (
            <textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="사유를 입력해주세요."
              rows={3}
              className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none placeholder:text-gray-300 focus:border-[#3b6cff]"
            />
          )}
        </div>

        <button
          onClick={handleWithdrawClick}
          disabled={!canSubmit}
          className={`h-14 w-full rounded-2xl text-[15px] font-bold text-white ${
            canSubmit ? "bg-[#f04452]" : "bg-[#f04452] opacity-40"
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

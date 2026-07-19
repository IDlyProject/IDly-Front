// src/pages/WithdrawReason/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import WithdrawConfirmModal from "@/pages/Withdraw/components/WithdrawConfirmModal";
import { deleteAccount } from "@/api/users";
import { logout } from "@/api/auth";
import { ROUTES } from "@/constants/routes";
import ChevronLeftIcon from "@/assets/ic_chevron_left.svg";
import UncheckIcon from "@/assets/ic_withdraw_uncheck.svg";
import CheckIcon from "@/assets/ic_withdraw_check.svg";

// id는 백엔드 DeleteReason enum 값과 동일하게 맞춤
const REASONS = [
  { id: "not_frequent", label: "자주 이용하지 않아요" },
  { id: "frequent_errors", label: "오류가 자주 발생해요" },
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
  const [withdrawing, setWithdrawing] = useState(false);
  const [error, setError] = useState("");

  const canSubmit =
    selectedReason && (selectedReason !== "other" || otherText.trim());

  const handleWithdrawClick = () => {
    if (!canSubmit) return;
    setError("");
    setShowConfirmModal(true);
  };

  const handleConfirmWithdraw = async () => {
    setWithdrawing(true);
    try {
      await deleteAccount({
        reason: selectedReason,
        reasonDetail: selectedReason === "other" ? otherText.trim() : undefined,
      });
      try {
        // 탈퇴된 유저의 idly_token 쿠키가 남아있으면 다음 로그인 시도가
        // "기존 유저에 서브계정 추가"로 잘못 처리될 수 있어 명시적으로 정리
        await logout();
      } catch (logoutErr) {
        console.error("post-withdraw logout failed:", logoutErr);
      }
      navigate(ROUTES.ONBOARDING_LOGIN, { replace: true });
    } catch (err) {
      console.error("delete account failed:", err);
      setError("탈퇴 처리에 실패했어요. 다시 시도해주세요.");
      setShowConfirmModal(false);
    } finally {
      setWithdrawing(false);
    }
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

          {error && (
            <p className="text-center text-xs font-bold text-danger50">
              {error}
            </p>
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
          confirming={withdrawing}
        />
      )}
    </PageBackground>
  );
}

export default WithdrawReason;

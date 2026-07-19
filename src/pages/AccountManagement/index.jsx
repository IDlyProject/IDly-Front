// src/pages/AccountManagement/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import UnlinkConfirmModal from "./components/UnlinkConfirmModal";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useGmailAccounts } from "@/hooks/useGmailAccounts";
import { disconnectAccount } from "@/api/users";
import BackIcon from "@/assets/ic_back.svg";
import PencilIcon from "@/assets/ic_pencil.svg";
import CancelIcon from "@/assets/ic_cancel.svg";

function formatDate(isoString) {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function AccountManagement() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { accounts } = useGmailAccounts();
  const [removedIds, setRemovedIds] = useState(new Set());
  const [unlinkTarget, setUnlinkTarget] = useState(null);
  const [unlinking, setUnlinking] = useState(false);
  const [unlinkError, setUnlinkError] = useState("");

  const linkedAccounts = accounts.filter((a) => !removedIds.has(a.id));
  const additionalAccountCount = linkedAccounts.filter(
    (a) => !a.isPrimary,
  ).length;
  const primaryEmail =
    accounts.find((a) => a.isPrimary)?.email ?? accounts[0]?.email;

  const handleUnlinkConfirm = async () => {
    setUnlinking(true);
    setUnlinkError("");
    try {
      await disconnectAccount(unlinkTarget.id);
      setRemovedIds((prev) => new Set(prev).add(unlinkTarget.id));
      setUnlinkTarget(null);
    } catch (err) {
      console.error("disconnect account failed:", err);
      setUnlinkError(
        err.status === 400
          ? "대표 계정은 연동 해지할 수 없어요."
          : "연동 해지에 실패했어요. 다시 시도해주세요.",
      );
    } finally {
      setUnlinking(false);
    }
  };

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-4 pb-8">
        <div className="mb-4 flex items-center gap-3 px-1 py-1.5">
          <button
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
            className="grid h-9 w-9 place-items-center rounded-full bg-white"
          >
            <img src={BackIcon} alt="" className="h-5 w-5" />
          </button>
          <h1 className="text-[18px] font-bold text-gray100">계정 관리</h1>
        </div>

        <div className="mb-6 flex items-center gap-4 rounded-[18px] bg-white p-5 shadow-[0_1px_3px_rgba(16,24,46,0.03)]">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-main100 text-[22px] font-bold text-white">
            {user?.name?.[0] ?? "?"}
          </div>
          <div className="flex-1">
            <b className="block text-[17px] text-bold text-gray100">
              {user?.name ?? "회원"}
            </b>
            <span className="mt-1 block text-r14 text-[13px] text-gray60">
              {primaryEmail ?? "이메일 없음"}
            </span>
          </div>
          <button aria-label="이름 수정">
            <img src={PencilIcon} alt="" className="w-5 h-5" />
          </button>
        </div>

        <h3 className="mb-6 text-[16px] font-bold text-gray100">연동된 계정</h3>
        <div className="mb-5 overflow-hidden rounded-[18px] bg-white shadow-[0_1px_3px_rgba(16,24,46,0.03)]">
          {linkedAccounts.map((account, idx) => (
            <div
              key={account.id}
              className={`flex items-center px-5 py-4.75 ${
                idx < linkedAccounts.length - 1
                  ? "border-b-[1.33px] border-[#E5E7EB]"
                  : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <b className="block text-[15px] font-semibold text-gray100">
                    {account.email}
                  </b>
                  {account.isPrimary && (
                    <span className="rounded-full bg-main100 px-2 py-0.5 text-[10px] text-white">
                      대표
                    </span>
                  )}
                </div>
                <small className="block text-r14 text-[12px] text-gray50">
                  Gmail
                </small>
              </div>
              {!account.isPrimary && (
                <button
                  onClick={() => setUnlinkTarget(account)}
                  aria-label={`${account.email} 연동 해지`}
                >
                  <img src={CancelIcon} alt="" className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {unlinkError && (
          <p className="mb-5 text-center text-xs font-bold text-danger50">
            {unlinkError}
          </p>
        )}

        <h3 className="mb-6 text-[16px] font-bold text-gray100">계정 정보</h3>
        <div className="mb-6 overflow-hidden rounded-[18px] bg-white shadow-[0_1px_3px_rgba(16,24,46,0.03)]">
          <div className="flex items-center justify-between border-b-[1.33px] border-[#E5E7EB] px-5 py-4">
            <span className="text-r14 text-gray60">가입일</span>
            <span className="text-sb16 text-[14px] text-gray100">
              {formatDate(user?.createdAt)}
            </span>
          </div>
          <div className="flex items-center justify-between border-b-[1.33px] border-[#E5E7EB] px-5 py-4">
            <span className="text-r14 text-gray60">마지막 로그인</span>
            <span className="text-sb16 text-[14px] text-gray100">
              {formatDate(user?.lastLoginAt)}
            </span>
          </div>
          <div className="flex items-center justify-between border-b-[1.33px] border-[#E5E7EB] px-5 py-4">
            <span className="text-r14 text-gray60">추가 연동 계정 수</span>
            <span className="text-sb16 text-[14px] text-gray100">
              {additionalAccountCount}개
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(ROUTES.WITHDRAW)}
          className="h-12.5 w-full rounded-[14px] border border-[#EE4E4E] text-sb16 text-[16px] text-[#EE4E4E]"
        >
          탈퇴하기
        </button>
      </div>

      {unlinkTarget && (
        <UnlinkConfirmModal
          email={unlinkTarget.email}
          onConfirm={handleUnlinkConfirm}
          onCancel={() => setUnlinkTarget(null)}
          confirming={unlinking}
        />
      )}
    </PageBackground>
  );
}

export default AccountManagement;

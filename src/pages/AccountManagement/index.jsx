// src/pages/AccountManagement/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import UnlinkConfirmModal from "./components/UnlinkConfirmModal";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/hooks/useCurrentUser";
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

// TODO: 실제로는 /accounts/linked API에서 교체
const MOCK_LINKED = [
  {
    id: "l1",
    provider: "Google",
    email: "minji.kim@gmail.com",
    iconBg: "#4285f4",
    iconText: "G",
  },
  {
    id: "l2",
    provider: "Naver",
    email: "minji.kim@icloud.com",
    iconBg: "#03c75a",
    iconText: "N",
  },
  {
    id: "l3",
    provider: "Google",
    email: "minji.kim@gmail.com",
    iconBg: "#4285f4",
    iconText: "G",
  },
  {
    id: "l4",
    provider: "Google",
    email: "minji.kim@gmail.com",
    iconBg: "#4285f4",
    iconText: "G",
  },
];

function AccountManagement() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [linkedAccounts, setLinkedAccounts] = useState(MOCK_LINKED);
  const [unlinkTarget, setUnlinkTarget] = useState(null);

  const handleUnlinkConfirm = () => {
    // TODO: 실제 연동 해지 API 호출 필요
    setLinkedAccounts((prev) => prev.filter((a) => a.id !== unlinkTarget.id));
    setUnlinkTarget(null);
  };

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-4 pb-8">
        <div className="mb-4 flex items-center gap-3 px-1 py-1.5">
          <button
            onClick={() => navigate(-1)}
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
              {user?.email ?? "이메일 하드코딩"}
            </span>
          </div>
          <button>
            <img src={PencilIcon} className="w-5 h-5" />
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
                <b className="block text-[15px] font-semibold text-gray100">
                  {account.provider}
                </b>
                <small className="block text-r14 text-[12px] text-gray50">
                  {account.email}
                </small>
              </div>
              <button onClick={() => setUnlinkTarget(account)}>
                <img src={CancelIcon} alt="" className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

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
              {linkedAccounts.length}개
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
        />
      )}
    </PageBackground>
  );
}

export default AccountManagement;

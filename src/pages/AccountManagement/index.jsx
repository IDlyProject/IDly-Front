// src/pages/AccountManagement/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import UnlinkConfirmModal from "./components/UnlinkConfirmModal";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/hooks/useCurrentUser";

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

function PencilIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9aa4b2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c0c8d4"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
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
    <PageBackground variant="default">
      <div className="min-h-dvh px-4 pb-8 pt-[max(12px,env(safe-area-inset-top))]">
        <div className="mb-3 flex items-center gap-3 py-2">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
          </button>
          <h1 className="text-lg font-bold text-[#191f28]">계정 관리</h1>
        </div>

        <div className="mb-5 flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-sm">
          <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#3b6cff] to-[#5b7dff] text-sm font-bold text-white">
            {user?.name?.[0] ?? "?"}
          </div>
          <div className="flex-1">
            <b className="block text-sm text-[#191f28]">
              {user?.name ?? "회원"}
            </b>
            <span className="mt-0.5 block text-xs font-bold text-[#9aa4b2]">
              {user?.email}
            </span>
          </div>
          <button>
            <PencilIcon />
          </button>
        </div>

        <h3 className="mb-2 text-[13px] font-bold text-[#191f28]">
          연동된 계정
        </h3>
        <div className="mb-5 space-y-2">
          {linkedAccounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
            >
              <div
                className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                style={{ background: account.iconBg }}
              >
                {account.iconText}
              </div>
              <div className="flex-1">
                <b className="block text-[13px] text-[#191f28]">
                  {account.provider}
                </b>
                <small className="mt-0.5 block text-[11px] font-bold text-[#9aa4b2]">
                  {account.email}
                </small>
              </div>
              <button onClick={() => setUnlinkTarget(account)}>
                <XIcon />
              </button>
            </div>
          ))}
        </div>

        <h3 className="mb-2 text-[13px] font-bold text-[#191f28]">계정 정보</h3>
        <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-50 px-3.5 py-3">
            <span className="text-[13px] font-bold text-[#9aa4b2]">가입일</span>
            <span className="text-[13px] font-bold text-[#191f28]">
              2024년 3월 15일
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-50 px-3.5 py-3">
            <span className="text-[13px] font-bold text-[#9aa4b2]">
              마지막 로그인
            </span>
            <span className="text-[13px] font-bold text-[#191f28]">
              2026년 7월 16일
            </span>
          </div>
          <div className="flex items-center justify-between px-3.5 py-3">
            <span className="text-[13px] font-bold text-[#9aa4b2]">
              추가 연동 계정 수
            </span>
            <span className="text-[13px] font-bold text-[#191f28]">
              {linkedAccounts.length}개
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(ROUTES.WITHDRAW)}
          className="h-12 w-full rounded-2xl border border-[#f04452]/30 bg-white text-sm font-bold text-[#f04452]"
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

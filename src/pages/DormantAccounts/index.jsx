// src/pages/DormantAccounts/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";

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

function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3b6cff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

// TODO: 실제로는 /accounts?status=dormant API로 대체
const MOCK_DORMANT = [
  {
    id: "d1",
    name: "Tumblr",
    email: "minsu@gmail.com",
    dormantAgo: "휴면 3개월",
    iconBg: "#3f5670",
    iconText: "T",
  },
  {
    id: "d2",
    name: "LinkedIn",
    email: "minsu@gmail.com",
    dormantAgo: "휴면 6개월",
    iconBg: "#0a66c2",
    iconText: "Li",
  },
  {
    id: "d3",
    name: "Dropbox",
    email: "minsu@gmail.com",
    dormantAgo: "휴면 1년",
    iconBg: "#0061ff",
    iconText: "Db",
  },
];

function DormantAccounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState(MOCK_DORMANT);

  const handleRestore = (id) => {
    // TODO: 실제 복원 API 호출 필요
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleRestoreAll = () => {
    // TODO: 실제 전체 복원 API 호출 필요
    setAccounts([]);
  };

  return (
    <PageBackground variant="default">
      <div className="min-h-dvh px-4 pb-8 pt-[max(12px,env(safe-area-inset-top))]">
        <div className="mb-3 flex items-center gap-3 py-2">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
          </button>
          <h1 className="text-lg font-bold text-[#191f28]">휴면 계정</h1>
        </div>

        <div className="mb-4 flex items-start gap-2 rounded-2xl bg-[#eef6ff] p-3.5">
          <InfoIcon />
          <p className="text-[12px] font-bold leading-relaxed text-[#334155]">
            숨겨둔 계정을 여기에서 관리할 수 있어요.
            <br />
            복원하면 다시 홈 화면에 표시됩니다.
          </p>
        </div>

        <div className="space-y-2.5">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
            >
              <div
                className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl text-sm font-bold text-white"
                style={{ background: account.iconBg }}
              >
                {account.iconText}
              </div>
              <div className="flex-1">
                <b className="block text-[13px] text-[#191f28]">
                  {account.name}
                </b>
                <small className="mt-0.5 block text-[11px] font-bold text-[#9aa4b2]">
                  {account.email} · {account.dormantAgo}
                </small>
              </div>
              <button
                onClick={() => handleRestore(account.id)}
                className="rounded-full bg-[#12206b] px-3.5 py-1.5 text-[11px] font-bold text-white"
              >
                복원
              </button>
            </div>
          ))}
        </div>

        {accounts.length > 0 && (
          <>
            <p className="mt-4 text-center text-[11px] font-bold text-[#c0c8d4]">
              휴면 계정은 보안 검사 대상에서 제외됩니다.
            </p>
            <button
              onClick={handleRestoreAll}
              className="mt-2 w-full text-center text-[13px] font-bold text-[#3b6cff]"
            >
              모두 복원하기
            </button>
          </>
        )}
      </div>
    </PageBackground>
  );
}

export default DormantAccounts;

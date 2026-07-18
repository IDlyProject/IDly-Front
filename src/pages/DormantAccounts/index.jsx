// src/pages/DormantAccounts/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import BackIcon from "@/assets/ic_back.svg";
import InfoIcon from "@/assets/ic_information.svg";

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
    <PageBackground variant="frost">
      <div className="min-h-dvh px-5">
        <div className="flex items-center gap-3 py-3.5">
          <button
            onClick={() => navigate(-1)}
            className="grid w-9 h-9 place-items-center bg-white  rounded-full"
          >
            <img src={BackIcon} className="w-5 h-5" />
          </button>
          <h1 className="text-b24 text-[18px] text-gray100">휴면 계정</h1>
        </div>

        <div className="my-3 flex items-center gap-2.5 rounded-[14px] bg-[#ECF1F9] p-3.5">
          <img src={InfoIcon} className="w-4.5 h-4.5" />
          <p className="text-start text-r14 text-[13px] text-gray60">
            숨겨둔 계정을 여기에서 관리할 수 있어요.
            <br />
            복원하면 다시 홈 화면에 표시됩니다.
          </p>
        </div>

        <div className="space-y-2.5 my-2">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center gap-3.5 rounded-2xl bg-white px-4 py-3.5 shadow-[0_1px_3px_rgba(16,24,46,0.04)]"
            >
              <div
                className="grid h-10.5 w-10.5 shrink-0 place-items-center rounded-[13px] text-[14px] font-bold text-white"
                style={{ background: account.iconBg }}
              >
                {account.iconText}
              </div>
              <div className="flex-1">
                <b className="block text-sb16 text-[15px] text-gray100">
                  {account.name}
                </b>
                <small className="mt-0.75 block text-r14 text-[12px] text-gray50">
                  {account.email} · {account.dormantAgo}
                </small>
              </div>
              <button
                onClick={() => handleRestore(account.id)}
                className="rounded-[10px] bg-main100 px-3.5 py-2 text-[12px] font-bold text-white"
              >
                복원
              </button>
            </div>
          ))}
        </div>

        {accounts.length > 0 && (
          <div className="flex flex-col gap-3 my-6">
            <p className="text-center text-r14 text-[12px] text-gray50">
              휴면 계정은 보안 검사 대상에서 제외됩니다.
            </p>
            <button
              onClick={handleRestoreAll}
              className="w-full text-center text-sb16 text-[14px] text-main100"
            >
              모두 복원하기
            </button>
          </div>
        )}
      </div>
    </PageBackground>
  );
}

export default DormantAccounts;

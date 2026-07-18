// src/pages/Withdraw/index.jsx
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import { ROUTES } from "@/constants/routes";

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

function PersonOffIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#f04452"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </svg>
  );
}

function Withdraw() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate(ROUTES.WITHDRAW_REASON);
  };

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-4 pb-8 pt-[max(12px,env(safe-area-inset-top))]">
        <button onClick={() => navigate(-1)} className="mb-6 self-start">
          <ArrowLeftIcon />
        </button>

        <h1 className="text-xl font-bold leading-snug text-[#191f28]">
          계정을 삭제하시겠습니까?
        </h1>
        <p className="mt-2 text-[13px] font-bold leading-relaxed text-[#9aa4b2]">
          계정을 삭제하면 다음 사항에 동의하는 것으로 간주합니다.
        </p>

        <div className="mt-5 flex-1 rounded-2xl bg-[#fff5f5] p-4">
          <div className="flex items-start gap-3">
            <PersonOffIcon />
            <p className="text-[13px] font-bold leading-relaxed text-[#191f28]">
              서비스 이용 정보가 영구적으로 삭제됩니다
            </p>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="h-14 w-full rounded-2xl bg-[#f04452] text-[15px] font-bold text-white"
        >
          확인
        </button>
      </div>
    </PageBackground>
  );
}

export default Withdraw;

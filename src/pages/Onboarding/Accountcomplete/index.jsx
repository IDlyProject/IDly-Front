// src/pages/Onboarding/AccountComplete/index.jsx
import { useNavigate } from "react-router-dom";
import SuccessMark from "../components/SuccessMark";
import { ROUTES } from "@/constants/routes";
import PageBackground from "@/components/layouts/PageBackground";

function ProgressDots({ current, total }) {
  return (
    <div className="mb-6 flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const step = i + 1;

        if (step < current) {
          return (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#3b6cff]" />
          );
        }
        if (step === current) {
          return (
            <span key={i} className="h-1.5 w-6 rounded-full bg-[#3b6cff]" />
          );
        }
        return (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-gray-200" />
        );
      })}
    </div>
  );
}

function AccountComplete() {
  const navigate = useNavigate();

  const handleAddAccount = () => {
    // TODO: /auth/google/start?purpose=connect 로 이동
    navigate(ROUTES.ONBOARDING_ADD_ACCOUNT);
  };

  const handleSkip = () => {
    navigate(ROUTES.ONBOARDING_COMPLETE);
  };

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-6 pt-8 pb-8">
        <ProgressDots current={5} total={6} />

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <SuccessMark />
          <h1 className="text-[22px] font-bold text-[#191f28]">입주 완료!</h1>
          <p className="mx-auto mt-2.5 max-w-[260px] text-[13px] font-bold leading-relaxed text-[#9aa4b2]">
            대표 계정 등록이 완료되었어요.
            <br />
            추가 Gmail 계정을 연동하면
            <br />
            모든 계정을 한 번에 관리할 수 있어요.
          </p>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={handleAddAccount}
            className="h-14 w-full rounded-2xl bg-[#12206b] text-[15px] font-bold text-white"
          >
            추가 Gmail 계정 연동하기
          </button>
          <button
            onClick={handleSkip}
            className="h-14 w-full rounded-2xl border border-gray-200 bg-white text-[15px] font-bold text-[#191f28] shadow-sm"
          >
            나중에 할게요
          </button>
        </div>
      </div>
    </PageBackground>
  );
}

export default AccountComplete;

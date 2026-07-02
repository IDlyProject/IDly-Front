import { useNavigate } from "react-router-dom";
import SuccessMark from "../components/SuccessMark";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import PageBackground from "@/components/layouts/PageBackground";

function AccountComplete() {
  const navigate = useNavigate();
  const primaryEmail = "minji.kim@gmail.com"; // TODO: 실제 데이터로 교체

  const handleAddAccount = () => {
    // TODO: /auth/google/start?purpose=connect 로 이동
    navigate(ROUTES.ONBOARDING_ADD_ACCOUNT);
  };

  const handleStartAnalysis = () => {
    navigate(ROUTES.ANALYSIS);
  };

  return (
    <PageBackground variant="sky">
      <div className="flex min-h-dvh flex-col justify-center px-8 pb-10 text-center">
        <SuccessMark />
        <h1 className="text-[26px] font-bold leading-snug text-[#191f28]">
          대표 계정이
          <br />
          연결되었어요
        </h1>
        <p className="mx-auto mt-3 max-w-[280px] text-[14px] leading-relaxed text-[#6b7684]">
          {primaryEmail}이 대표 계정으로 등록되었어요.
          <br />
          다른 Gmail은 지금 추가하거나 나중에 추가할 수 있어요.
        </p>

        <div className="mt-14 space-y-3">
          <Button variant="secondary" onClick={handleAddAccount}>
            연결 계정 추가하기
          </Button>
          <Button variant="primary" onClick={handleStartAnalysis}>
            분석 시작하기
          </Button>
        </div>
      </div>
    </PageBackground>
  );
}

export default AccountComplete;

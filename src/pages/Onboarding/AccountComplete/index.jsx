import { useNavigate } from "react-router-dom";
import SuccessMark from "../components/SuccessMark";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

function AccountComplete() {
  const navigate = useNavigate();
  const primaryEmail = "minji.kim@gmail.com"; // TODO: 실제 데이터로 교체

  const handleAddAccount = () => {
    // TODO: /auth/google/start?purpose=connect 로 이동
    navigate(ROUTES.ONBOARDING_ADD_ACCOUNT);
  };

  const handleStartAnalysis = () => {
    // TODO: 연결 계정 추가 건너뛰고 초기 분석 화면으로 이동
    navigate(ROUTES.HOME);
  };

  return (
    <div className="flex min-h-dvh flex-col justify-center bg-gradient-to-b from-[#bcdcff] via-[#dcebff] to-[#fdf2e4] px-8 pb-10 text-center">
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
        <Button variant="primary" onClick={handleAddAccount}>
          연결 계정 추가하기
        </Button>
        <Button variant="secondary" onClick={handleStartAnalysis}>
          분석 시작하기
        </Button>
      </div>
    </div>
  );
}

export default AccountComplete;

import { useNavigate } from "react-router-dom";
import SuccessMark from "../components/SuccessMark";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import PageBackground from "@/components/layouts/PageBackground";

// TODO: 대표/연결 계정 수는 /accounts 응답 기준으로 계산
function RegistrationComplete() {
  const navigate = useNavigate();
  const primaryCount = 1;
  const connectedCount = 1;

  const handleStartAnalysis = () => {
    // TODO: connected 상태 Gmail만 분석 요청 생성 (status: queued)
    navigate(ROUTES.HOME);
  };

  return (
    <PageBackground variant="sky">
      <div className="flex min-h-dvh flex-col justify-center px-8 pb-10 text-center">
        <SuccessMark />
        <h1 className="text-[26px] font-bold leading-snug text-[#191f28]">
          계정 등록이
          <br />
          완료되었어요
        </h1>
        <p className="mx-auto mt-3 max-w-[280px] text-[14px] leading-relaxed text-[#6b7684]">
          대표 계정 {primaryCount}개와 연결 계정 {connectedCount}개가
          연결되었어요.
          <br />
          연결한 Gmail에서 계정 신호를 분석하고, 계정아파트로 정리합니다.
        </p>

        <div className="mt-14">
          <Button variant="primary" onClick={handleStartAnalysis}>
            분석 시작하기
          </Button>
        </div>
      </div>
    </PageBackground>
  );
}

export default RegistrationComplete;

import { useNavigate } from "react-router-dom";
import ProgressDots from "../components/ProgressDot";
import { ROUTES } from "@/constants/routes";
import CheckIcon from "@/assets/ic_check.svg";
import ActionButton from "@/components/ui/ActionButton";
import PageBackground from "@/components/layouts/PageBackground";

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
      <div className="flex min-h-dvh flex-col px-4 pb-8">
        <div className="flex flex-col flex-1 px-1">
          <ProgressDots current={5} total={7} />
          <div className="flex flex-1 flex-col justify-center items-center text-center">
            <div className="grid place-items-center mb-6 w-30 h-30 rounded-full bg-[#12B886]/30">
              <div className="grid place-items-center w-20 h-20 rounded-full bg-[#12B886]">
                <img src={CheckIcon} className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-b24 text-gray100">입주 완료!</h1>
            <p className="mx-auto mt-2.5 max-w-65 text-r14 text-gray60">
              대표 계정 등록이 완료되었어요.
              <br />
              추가 Gmail 계정을 연동하면
              <br />
              모든 계정을 한 번에 관리할 수 있어요.
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-2.5">
          <ActionButton
            bgColor="var(--color-main100)"
            textColor="var(--color-white)"
            onClick={handleAddAccount}
          >
            추가 Gmail 계정 연동하기
          </ActionButton>
          <ActionButton
            bordered
            borderColor="var(--color-gray20)"
            textColor="var(--color-main100)"
            onClick={handleSkip}
            className="shadow-[0_4px_14px_0_rgba(16,24,46,0.06)]"
          >
            나중에 할게요
          </ActionButton>
        </div>
      </div>
    </PageBackground>
  );
}

export default AccountComplete;

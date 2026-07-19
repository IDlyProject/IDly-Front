import { useNavigate } from "react-router-dom";
import ProgressDots from "../components/ProgressDot";
import ActionButton from "@/components/ui/ActionButton";
import PlusIcon from "@/assets/ic_plus.svg";
import { API_BASE_URL } from "@/constants/api";
import { ROUTES } from "@/constants/routes";
import { useGmailAccounts } from "@/hooks/useGmailAccounts";
import { toMailAccount } from "@/utils/mailAccount";
import PageBackground from "../../../components/layouts/PageBackground";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ErrorScreen from "@/components/ui/ErrorScreen";

function AddAccount() {
  const navigate = useNavigate();
  const { accounts, status } = useGmailAccounts();

  const handleStartConnect = () => {

    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  const handleComplete = () => {
    navigate(ROUTES.ONBOARDING_COMPLETE);
  };

  const handleSkip = () => {
    navigate(ROUTES.ONBOARDING_COMPLETE);
  };

  if (status === "loading") return <LoadingScreen variant="default" />;
  if (status === "error") {
    return (
      <ErrorScreen variant="default" text="계정 정보를 불러오지 못했어요." />
    );
  }

  const mailAccounts = accounts.map(toMailAccount);

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-4 pb-8">
        <div className="flex flex-col flex-1 px-1">
          <ProgressDots current={6} total={7} />
          <div className="py-4 flex flex-col gap-2">
            <h1 className="text-b24 text-gray100">추가 계정 연동</h1>
            <p className="text-r14 text-gray60">
              관리할 Gmail 계정을 추가해 주세요.
              <br />
              추가된 계정의 보안 상태도 함께 모니터링합니다.
            </p>
          </div>
          <div className="mt-2 flex-1 space-y-3">
            {mailAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center gap-3.5 rounded-2xl bg-[#F0F6FF] px-4.5 py-4"
              >
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sb18 font-bold text-white"
                  style={{ background: account.avatarBg }}
                >
                  {account.avatarLabel}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-sb16 text-[14px] text-gray100">
                      {account.email}
                    </strong>
                    {account.isPrimary && (
                      <span className="rounded-full bg-main100 px-2 py-0.5 text-sb16 text-[10px] text-white">
                        대표
                      </span>
                    )}
                  </div>
                  <span className="mt-0.5 block text-m14 text-[12px] text-[#12b886]">
                    연동 완료
                  </span>
                </div>
              </div>
            ))}

            <button
              onClick={handleStartConnect}
              className="flex w-full items-center gap-3.5 px-4.5 py-4 text-left"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-main100">
                <img src={PlusIcon} className="h-3.25 w-3.25" />
              </div>
              <span className="text-sb16 text-[14px] text-gray60">
                다른 Gmail 계정 추가
              </span>
            </button>
          </div>
        </div>
        <div className="mt-4 space-y-2.5">
          <ActionButton
            bgColor="var(--color-main100)"
            textColor="var(--color-white)"
            onClick={handleComplete}
          >
            {mailAccounts.length}개 계정 연동 완료
          </ActionButton>
          <ActionButton
            bordered
            borderColor="var(--color-gray20)"
            textColor="var(--color-main100)"
            onClick={handleSkip}
            className="shadow-[0_4px_14px_0_rgba(16,24,46,0.06)]"
          >
            건너뛰기
          </ActionButton>
        </div>
      </div>
    </PageBackground>
  );
}

export default AddAccount;

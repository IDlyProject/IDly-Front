import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import CompleteMark from "@/assets/ic_complete_mark.svg";
import ShieldCheckIcon from "@/assets/ic_shield_check.svg";
import AccountIcon from "@/assets/ic_account.svg";
import BellIcon from "@/assets/ic_bell.svg";
import ProgressDots from "../components/ProgressDot";
import ActionButton from "@/components/ui/ActionButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getPrimaryGmailAccount } from "@/api/auth";

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-white">
        {icon}
      </div>
      <div className="text-start">
        <span className="block text-m14 text-[12px] text-gray50">{label}</span>
        <span className="mt-0.5 block text-sb16 text-[14px] text-gray100">
          {value}
        </span>
      </div>
    </div>
  );
}

function RegistrationComplete() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const primaryEmail = getPrimaryGmailAccount(user)?.email ?? "";
  const totalAccountCount = user?.gmailAccounts?.length ?? 0;
  // TODO: 실제 알림 동의 상태를 유저 데이터에서 가져와야 함 (현재는 임시로 true 고정)
  const notificationEnabled = true;

  const handleStart = () => {
    navigate(ROUTES.ANALYSIS);
  };

  return (
    <div className="flex min-h-dvh flex-col px-4 pb-8">
      <div className="flex flex-col flex-1 px-1">
        <ProgressDots current={7} total={7} />

        <div className="flex flex-1 flex-col items-center justify-center text-center gap-6.25">
          <img src={CompleteMark} className="h-25 w-25 m-5" />
          <div className="flex flex-col gap-3">
            <h1 className="text-b24 text-gray100">모든 준비 완료!</h1>
            <p className="mx-auto max-w-65 text-r14 text-gray60">
              idly가 모든 계정을 안전하게 지켜드릴게요.
              <br />
              이상 징후가 감지되면 바로 알려드립니다.
            </p>
          </div>

          <div className="flex flex-col gap-3.5 w-full rounded-[18px] bg-[#F0F6FF] p-5">
            <InfoRow
              icon={<img src={ShieldCheckIcon} />}
              label="대표 계정"
              value={primaryEmail}
            />
            <InfoRow
              icon={<img src={AccountIcon} />}
              label="연동된 계정"
              value={`총 ${totalAccountCount}개 Gmail 계정`}
            />
            <InfoRow
              icon={<img src={BellIcon} />}
              label="알림"
              value={notificationEnabled ? "활성화됨" : "비활성화됨"}
            />
          </div>
        </div>
      </div>
      <ActionButton
        bgColor="var(--color-main100)"
        textColor="var(--color-white)"
        onClick={handleStart}
      >
        시작하기
      </ActionButton>
    </div>
  );
}

export default RegistrationComplete;

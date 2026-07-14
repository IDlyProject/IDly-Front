// src/pages/Onboarding/AddAccount/index.jsx
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import { API_BASE_URL } from "@/constants/api";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { toMailAccount } from "@/utils/mailAccount";

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

function AddAccount() {
  const navigate = useNavigate();
  const { user, status } = useCurrentUser();

  const handleStartConnect = () => {
    // 로그인 쿠키(httpOnly)가 자동으로 실려가므로 별도 토큰 전달 불필요
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  const handleComplete = () => {
    navigate(ROUTES.ONBOARDING_COMPLETE);
  };

  const handleSkip = () => {
    navigate(ROUTES.ONBOARDING_COMPLETE);
  };

  if (status === "loading") {
    return (
      <PageBackground variant="default">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">불러오는 중...</p>
        </div>
      </PageBackground>
    );
  }

  if (status === "error") {
    return (
      <PageBackground variant="default">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">
            계정 정보를 불러오지 못했어요.
          </p>
        </div>
      </PageBackground>
    );
  }

  const mailAccounts = user.gmailAccounts.map(toMailAccount);

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-6 pt-8 pb-8">
        <ProgressDots current={6} total={6} />

        <h1 className="text-[22px] font-bold leading-snug text-[#191f28]">
          추가 계정 연동
        </h1>
        <p className="mt-1.5 text-[13px] font-bold leading-relaxed text-[#9aa4b2]">
          관리할 Gmail 계정을 추가해 주세요.
          <br />
          추가된 계정의 보안 상태도 함께 모니터링합니다.
        </p>

        <div className="mt-6 flex-1 space-y-3">
          {mailAccounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm"
            >
              <div
                className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                style={{ background: account.avatarBg }}
              >
                {account.avatarLabel}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <strong className="text-sm text-[#191f28]">
                    {account.email}
                  </strong>
                  {account.isPrimary && (
                    <span className="rounded-full bg-[#eef2ff] px-2 py-0.5 text-[10px] font-bold text-[#3b6cff]">
                      대표
                    </span>
                  )}
                </div>
                <span className="mt-0.5 block text-xs font-bold text-[#12b886]">
                  연동 완료
                </span>
              </div>
            </div>
          ))}

          <button
            onClick={handleStartConnect}
            className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left"
          >
            <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-dashed border-gray-300 text-lg font-bold text-[#9aa4b2]">
              +
            </div>
            <span className="text-sm font-bold text-[#6b7684]">
              다른 Gmail 계정 추가
            </span>
          </button>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={handleComplete}
            className="h-14 w-full rounded-2xl bg-[#12206b] text-[15px] font-bold text-white"
          >
            {mailAccounts.length}개 계정 연동 완료
          </button>
          <button
            onClick={handleSkip}
            className="h-14 w-full rounded-2xl border border-gray-200 bg-white text-[15px] font-bold text-[#191f28] shadow-sm"
          >
            건너뛰기
          </button>
        </div>
      </div>
    </PageBackground>
  );
}

export default AddAccount;

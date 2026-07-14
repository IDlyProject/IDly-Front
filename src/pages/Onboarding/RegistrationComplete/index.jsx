// src/pages/Onboarding/RegistrationComplete/index.jsx
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import PageBackground from "@/components/layouts/PageBackground";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getPrimaryGmailAccount } from "@/api/auth";

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

function ShieldMark() {
  return (
    <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#3b6cff] to-[#1a3fae] shadow-lg shadow-blue-500/30">
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3b6cff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3b6cff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M15.5 13.2c2.5.4 4 2.1 4 4.8" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3b6cff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 4-2 5-2 5h16s-2-1-2-5" />
      <path d="M9 17a3 3 0 0 0 6 0" />
    </svg>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-50 py-3 last:border-b-0">
      <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-[#eef2ff]">
        {icon}
      </div>
      <div>
        <span className="block text-[11px] font-bold text-[#9aa4b2]">
          {label}
        </span>
        <strong className="mt-0.5 block text-sm text-[#191f28]">{value}</strong>
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
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-6 pt-8 pb-8">
        <ProgressDots current={6} total={6} />

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <ShieldMark />
          <h1 className="text-[22px] font-bold text-[#191f28]">
            모든 준비 완료!
          </h1>
          <p className="mx-auto mt-2.5 max-w-[260px] text-[13px] font-bold leading-relaxed text-[#9aa4b2]">
            idly가 모든 계정을 안전하게 지켜드릴게요.
            <br />
            이상 징후가 감지되면 바로 알려드립니다.
          </p>

          <div className="mt-6 w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <InfoRow
              icon={<ShieldIcon />}
              label="대표 계정"
              value={primaryEmail}
            />
            <InfoRow
              icon={<PeopleIcon />}
              label="연동된 계정"
              value={`총 ${totalAccountCount}개 Gmail 계정`}
            />
            <InfoRow
              icon={<BellIcon />}
              label="알림"
              value={notificationEnabled ? "활성화됨" : "비활성화됨"}
            />
          </div>
        </div>

        <button
          onClick={handleStart}
          className="h-14 w-full rounded-2xl bg-[#12206b] text-[15px] font-bold text-white"
        >
          시작하기
        </button>
      </div>
    </PageBackground>
  );
}

export default RegistrationComplete;

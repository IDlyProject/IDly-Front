// src/pages/My/index.jsx
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function SettingsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#191f28"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#191f28"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6" />
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
      stroke="#191f28"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 4-2 5-2 5h16s-2-1-2-5" />
      <path d="M9 17a3 3 0 0 0 6 0" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#191f28"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
      <path d="M21 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2v2z" />
      <path d="M3 15a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2v2z" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#191f28"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#191f28"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="5" rx="1" />
      <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
      <line x1="10" y1="13" x2="14" y2="13" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c0c8d4"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function MenuRow({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 border-b border-gray-50 px-3.5 py-3.5 text-left last:border-b-0"
    >
      {icon}
      <span className="flex-1 text-sm font-bold text-[#191f28]">{label}</span>
      <ChevronRightIcon />
    </button>
  );
}

function My() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const handleLogout = () => {
    // TODO: 실제 로그아웃 API 호출 필요 (쿠키/토큰 삭제)
    navigate(ROUTES.ONBOARDING_LOGIN, { replace: true });
  };

  return (
    <PageBackground variant="default">
      <div className="min-h-dvh px-4 pb-4 pt-[max(12px,env(safe-area-inset-top))]">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#191f28]">마이</h1>
          <button className="grid h-9 w-9 place-items-center rounded-full">
            <SettingsIcon />
          </button>
        </div>

        <button
          onClick={() => navigate(ROUTES.ACCOUNT_MANAGEMENT)}
          className="mb-5 flex w-full items-center gap-3 rounded-3xl p-4 text-left text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #1c3fae 0%, #3b6cff 100%)",
          }}
        >
          <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-white/20 text-base font-bold">
            {user?.name?.[0] ?? "?"}
          </div>
          <div>
            <b className="block text-base">{user?.name ?? "회원"}</b>
            <span className="mt-0.5 block text-xs font-bold text-white/75">
              {user?.email}
            </span>
          </div>
        </button>

        <h3 className="mb-2 text-[13px] font-bold text-[#9aa4b2]">설정</h3>
        <div className="mb-5 overflow-hidden rounded-2xl bg-white shadow-sm">
          <MenuRow
            icon={<PersonIcon />}
            label="계정 관리"
            onClick={() => navigate(ROUTES.ACCOUNT_MANAGEMENT)}
          />
          <MenuRow
            icon={<BellIcon />}
            label="알림 설정"
            onClick={() => navigate(ROUTES.NOTIFICATION_SETTINGS)}
          />
          <MenuRow
            icon={<HeadsetIcon />}
            label="고객 센터"
            onClick={() => {}}
          />
          <MenuRow icon={<DocIcon />} label="이용약관" onClick={() => {}} />
        </div>

        <h3 className="mb-2 text-[13px] font-bold text-[#9aa4b2]">기타</h3>
        <button
          onClick={() => navigate(ROUTES.DORMANT_ACCOUNTS)}
          className="mb-5 flex w-full items-center gap-3 rounded-2xl bg-white px-3.5 py-3.5 text-left shadow-sm"
        >
          <ArchiveIcon />
          <div className="flex-1">
            <span className="block text-sm font-bold text-[#191f28]">
              휴면계정
            </span>
            <small className="mt-0.5 block text-[11px] font-bold text-[#9aa4b2]">
              숨긴 계정 3개
            </small>
          </div>
          <ChevronRightIcon />
        </button>

        <button
          onClick={handleLogout}
          className="mb-4 flex h-12 w-full items-center justify-center gap-1.5 rounded-2xl border border-gray-200 bg-white text-sm font-bold text-[#f04452] shadow-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f04452"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          로그아웃
        </button>

        <p className="text-center text-[11px] font-bold text-[#c0c8d4]">
          IDly v1.0.0
        </p>
      </div>
    </PageBackground>
  );
}

export default My;

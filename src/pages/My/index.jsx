// src/pages/My/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { logout, getPrimaryGmailAccount } from "@/api/auth";
import SettingIcon from "@/assets/ic_setting.svg";
import AccountManageIcon from "@/assets/ic_account_manage.svg";
import HeadphoneIcon from "@/assets/ic_headphone.svg";
import DocumentIcon from "@/assets/ic_document.svg";
import BellIcon from "@/assets/ic_bell_18.svg";
import ArchiveIcon from "@/assets/ic_archive.svg";
import ChevronRightIcon from "@/assets/ic_chevron_right.svg";
import LogoutIcon from "@/assets/ic_logout.svg";

function MenuRow({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 border-b-[0.76px] border-[#E5E7EB] px-5 py-3.75 text-left last:border-b-0"
    >
      {icon}
      <span className="flex-1 text-m14 text-[15px] text-gray100">{label}</span>
      <img src={ChevronRightIcon} className="w-4 h-4" />
    </button>
  );
}

function My() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const primaryEmail = getPrimaryGmailAccount(user)?.email;
  const isSafe = false;
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      navigate(ROUTES.ONBOARDING_LOGIN, { replace: true });
    }
  };

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-4 pb-1.5">
        <div className="my-5 mx-1 flex items-center justify-between">
          <h1 className="text-b24 text-[22px] text-gray100">마이</h1>
          <button
            aria-label="설정"
            className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-[0_1px_3px_rgba(16,24,46,0.03)]"
          >
            <img src={SettingIcon} alt="" className="h-4.5 w-4.5" />
          </button>
        </div>

        <div
          className="mb-6 flex w-full items-center gap-4 rounded-[20px] p-6"
          style={{
            background: isSafe
              ? "linear-gradient(135deg, #3B6CFF 0%, #08257E 100%)"
              : "linear-gradient(135deg, #E43939 0%, #08257E 100%)",
          }}
        >
          <div className="grid h-13 w-13 shrink-0 place-items-center rounded-full bg-white/20 text-[20px] text-white font-bold">
            {user?.name?.[0] ?? "?"}
          </div>
          <div>
            <b className="block text-b24 text-[18px] text-white">
              {user?.name ?? "회원"}
            </b>
            <span className="mt-1 block text-r14 text-[13px] text-white/66">
              {primaryEmail ?? "이메일 없음"}
            </span>
          </div>
        </div>

        <h3 className="mb-6 text-sb16 font-bold text-gray100">설정</h3>
        <div className="mb-6 overflow-hidden rounded-[18px] bg-white">
          <MenuRow
            icon={<img src={AccountManageIcon} className="w-4.5 h-4.5" />}
            label="계정 관리"
            onClick={() => navigate(ROUTES.ACCOUNT_MANAGEMENT)}
          />
          <MenuRow
            icon={<img src={BellIcon} className="w-4.5 h-4.5" />}
            label="알림 설정"
            onClick={() => navigate(ROUTES.NOTIFICATION_SETTINGS)}
          />
          <MenuRow
            icon={<img src={HeadphoneIcon} className="w-4.5 h-4.5" />}
            label="고객 센터"
            onClick={() => {}}
          />
          <MenuRow
            icon={<img src={DocumentIcon} className="w-4.5 h-4.5" />}
            label="이용약관"
            onClick={() => {}}
          />
        </div>

        <h3 className="mb-5.25 text-sb16 font-bold text-gray100">기타</h3>
        <button
          onClick={() => navigate(ROUTES.DORMANT_ACCOUNTS)}
          className="mb-2 flex w-full items-center gap-5 rounded-[18px] bg-white pl-6.25 pr-4 py-3.5 text-left shadow-[0_1px_3px_rgba(16,24,46,0.03)]"
        >
          <img src={ArchiveIcon} className="w-4.5 h-4.5" />
          <div className="flex-1">
            <span className="block text-m14 text-[15px] text-gray100">
              휴면계정
            </span>
            <small className="mt-px block text-r14 text-[12px] text-gray50">
              숨긴 계정 {user?.dormantAccountCount ?? 0}개
            </small>
          </div>
          <img src={ChevronRightIcon} className="h-4 w-4" />
        </button>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="mb-2 flex h-12.5 w-full items-center justify-center gap-2 rounded-[18px] bg-white text-sm font-bold text-[#EE4E4E] disabled:opacity-60"
        >
          <img src={LogoutIcon} className="h-4 w-4" />
          <div>{loggingOut ? "로그아웃 중..." : "로그아웃"}</div>
        </button>

        <p className="text-left text-r14 text-[12px] text-gray50">
          IDly v1.0.0
        </p>
      </div>
    </PageBackground>
  );
}

export default My;

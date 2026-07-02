// src/components/layouts/BottomNav.jsx
import { NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

function HomeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H9v-5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V20h2.5a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

function ActionIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="4" width="12" height="16" rx="3" />
      <line x1="9.5" y1="9.5" x2="14.5" y2="9.5" />
      <line x1="9.5" y1="13" x2="14.5" y2="13" />
    </svg>
  );
}

function MyIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6" />
    </svg>
  );
}

function BottomNav() {
  const { pathname } = useLocation();

  // "조치"는 별도 목록 페이지가 없고, 계정 상세/대응 플로우에 들어와 있을 때만 활성 표시
  const isActionActive = /^\/account\/[^/]+(\/action)?$/.test(pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 grid h-[72px] grid-cols-3 items-center border-t border-gray-200/90 bg-white/96 px-3.5 pb-[calc(10px+env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-10px_28px_rgba(16,24,46,0.08)] backdrop-blur-md">
      <NavLink
        to={ROUTES.HOME}
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-bold ${
            isActive ? "text-[#3b6cff]" : "text-[#8c96a6]"
          }`
        }
      >
        <HomeIcon />홈
      </NavLink>

      {/* 조치: 클릭해도 이동 없음. 상세/대응 화면에 있을 때만 활성 표시 */}
      <div
        className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
          isActionActive ? "text-[#3b6cff]" : "text-[#8c96a6]"
        }`}
      >
        <ActionIcon />
        조치
      </div>

      <NavLink
        to={ROUTES.MY}
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-bold ${
            isActive ? "text-[#3b6cff]" : "text-[#8c96a6]"
          }`
        }
      >
        <MyIcon />
        마이
      </NavLink>
    </nav>
  );
}

export default BottomNav;

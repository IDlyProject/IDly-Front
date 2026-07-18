// src/components/layouts/BottomNav.jsx
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import homeIcon from "@/assets/ic_home.svg";
import homeIconActive from "@/assets/ic_home_filled.svg";
import organizeIcon from "@/assets/ic_folder.svg";
import organizeIconActive from "@/assets/ic_folder_filled.svg";
import myIcon from "@/assets/ic_profile.svg";
import myIconActive from "@/assets/ic_profile_filled.svg";

const navItems = [
  {
    path: ROUTES.HOME,
    label: "홈",
    icon: homeIcon,
    iconActive: homeIconActive,
  },
  {
    path: ROUTES.ORGANIZE,
    label: "정리",
    icon: organizeIcon,
    iconActive: organizeIconActive,
  },
  {
    path: ROUTES.MY,
    label: "마이",
    icon: myIcon,
    iconActive: myIconActive,
  },
];

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 grid h-25 grid-cols-3 items-start rounded-t-2xl bg-white/80 px-2.5 pt-4.5 shadow-[0_-2px_4px_0_rgba(0,0,0,0.04)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[11px] font-semibold ${
              isActive ? "text-[#0A2C92]" : "text-[#B0B1B4]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? item.iconActive : item.icon}
                alt=""
                className="h-7.5 w-7.5"
              />
              {item.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;

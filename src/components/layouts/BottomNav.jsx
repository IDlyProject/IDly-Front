// src/components/layout/BottomNav.jsx
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/home", label: "홈" },
  { path: "/organize", label: "정리" },
  { path: "/my", label: "마이" },
];

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-400"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import logo from "@/assets/ic_typo_logo.svg";
import BellIcon from "@/assets/ic_bell_gray.svg";

function AppHeader() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-1 py-3">
      <img src={logo} alt="IDly" className="h-13.5 w-auto" />
      <button
        onClick={() => navigate(ROUTES.NOTIFICATION)}
        className="relative grid h-9 w-9 place-items-center rounded-full bg-white"
      >
        <img src={BellIcon} className="h-4.5 w-4.5" />
      </button>
    </div>
  );
}

export default AppHeader;

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import ServiceIcon from "@/components/ui/ServiceIcon";
import AccountQuickMenu from "./AccountQuickMenu";
import useLongPress from "../hooks/useLongPress";

const DOT_COLOR = {
  safe: "bg-[#43A047]",
  risk: "bg-[#EE4E4E]",
};

function AptCard({ account, onHide, onOrganize }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const isRisk = account.status === "risk";

  const longPress = useLongPress(() => setMenuOpen(true));

  const handleClick = () => {
    if (longPress.wasLongPress()) return;

    if (isRisk) {
      // getDetail API가 아직 iconUrl을 못 줄 때를 대비해 홈에서 이미 받은 아이콘을
      // navigation state로 같이 넘긴다 (상세 화면에서 API 값이 있으면 그걸 우선함)
      navigate(ROUTES.ACCOUNT_DETAIL(account.id), {
        state: { iconUrl: account.iconUrl, iconLabel: account.iconText },
      });
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleClick}
        {...longPress}
        className={`relative flex w-full py-[21.5px] flex-col items-center justify-center gap-2 rounded-2xl ${
          isRisk
            ? "border-[1.52px] border-[#EE4E4E] bg-[#FEF2F2] shadow-[0_0_24px_rgba(238,78,78,0.125),0_4px_16px_rgba(238,78,78,0.208)]"
            : "bg-white shadow-[0_2px_8px_rgba(16,24,46,0.08)]"
        }`}
      >
        <span
          className={`absolute right-2.75 top-1.75 rounded-full ${
            isRisk ? "h-3 w-3 border-2 border-white" : "h-2 w-2"
          } ${isRisk ? DOT_COLOR.risk : DOT_COLOR.safe}`}
        />

        <ServiceIcon
          iconUrl={account.iconUrl}
          iconBg={account.iconBg}
          iconText={account.iconText}
          className="h-10.5 w-10.5 rounded-[13px] text-[14px]"
        />
        <span
          className={`max-w-full truncate text-[11px] font-bold ${isRisk ? "text-[#EE4E4E]" : "text-gray60"}`}
        >
          {account.name}
        </span>
      </button>

      {menuOpen && (
        <AccountQuickMenu
          anchorRef={buttonRef}
          onHide={() => {
            onHide?.(account.id);
            setMenuOpen(false);
          }}
          onOrganize={() => {
            onOrganize?.(account.id);
            setMenuOpen(false);
          }}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}

function Apartment({ accounts, onHideAccount, onOrganizeAccount }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {accounts.map((account) => (
        <AptCard
          key={account.id}
          account={account}
          onHide={onHideAccount}
          onOrganize={onOrganizeAccount}
        />
      ))}
    </div>
  );
}

export default Apartment;

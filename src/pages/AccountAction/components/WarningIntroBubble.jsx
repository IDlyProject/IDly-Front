// src/pages/AccountAction/components/WarningIntroBubble.jsx
import { WarnWhiteIcon } from "../icons";
import OwlAvatar from "./OwlAvatar";

function WarningIntroBubble({ badge, text }) {
  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar />
      <div className="max-w-[300px] overflow-hidden rounded-[4px_18px_18px_18px] border-[0.76px] border-[#ee4e4e]/[0.13] bg-gradient-to-b from-white to-[#fff0f0] shadow-[0_4px_6px_rgba(238,78,78,0.09)]">
        <div className="mx-4 mt-3.5 flex items-center gap-1.5 rounded-lg bg-[#ee4e4e] px-2.5 py-1.75 text-xs font-bold text-white">
          <img src={WarnWhiteIcon} alt="" className="h-3.75 w-3.75" />
          {badge}
        </div>
        <p className="px-4 pb-4 pt-2.5 text-[13px] leading-relaxed text-[#4a1c1c]">
          {text}
        </p>
      </div>
    </div>
  );
}

export default WarningIntroBubble;

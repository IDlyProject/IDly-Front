// src/pages/AccountAction/components/TipBubble.jsx
import { TipIcon } from "../icons";
import OwlAvatar from "./OwlAvatar";

function TipBubble({ text }) {
  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar hidden />
      <div className="max-w-[300px] rounded-[4px_18px_18px_18px] border-[0.76px] border-[#43a047]/[0.13] bg-[#e8f5e9] p-3.5">
        <div className="mb-1.75 flex items-center gap-1.25 text-xs font-bold text-[#43a047]">
          <img src={TipIcon} alt="" className="h-3.25 w-3.25" />
          보안 팁
        </div>
        <p className="text-[12.5px] leading-relaxed text-[#70737a]">{text}</p>
      </div>
    </div>
  );
}

export default TipBubble;

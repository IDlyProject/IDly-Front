// src/pages/AccountAction/components/LinkCardBubble.jsx
import { LockIcon, ExternalIcon } from "../icons";
import OwlAvatar from "./OwlAvatar";

function LinkCardBubble({ action }) {
  const handleGo = () =>
    window.open(
      `https://${action.url.replace(/^https?:\/\//, "")}`,
      "_blank",
      "noopener,noreferrer",
    );

  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar />
      <div className="max-w-[300px] rounded-[4px_18px_18px_18px] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,46,0.04)]">
        <p className="mb-3 text-[13.5px] leading-relaxed text-[#212125]">
          <span
            className="mr-1.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md align-middle"
            style={{ background: action.color }}
          >
            <img src={action.icon} alt="" className="h-3.25 w-3.25" />
          </span>
          {action.name} 페이지로 바로 이동할 수 있어요!
        </p>
        <div className="rounded-xl border border-[#d0d9f0] bg-[#eff3ff] p-3.5">
          <div className="mb-2 flex items-center gap-1.25 text-[11px] font-semibold text-[#8c8f96]">
            <img src={LockIcon} alt="" className="h-3 w-3" />
            공식 사이트
          </div>
          <p className="mb-1.25 text-sm font-bold text-[#212125]">
            {action.title}
          </p>
          <p className="mb-3 text-[11px] text-[#8c8f96]">{action.url}</p>
          <button
            onClick={handleGo}
            className="flex h-9.5 w-full items-center justify-center gap-1.5 rounded-[10px] bg-[#08257e] text-[13px] font-semibold text-white"
          >
            페이지로 이동
            <img src={ExternalIcon} alt="" className="h-3.25 w-3.25" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LinkCardBubble;

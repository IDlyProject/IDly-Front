// src/pages/AccountAction/components/AdStripBubble.jsx
import OwlAvatar from "./OwlAvatar";

function AdStripBubble({ ad }) {
  const handleClick = () =>
    ad.url && window.open(ad.url, "_blank", "noopener,noreferrer");

  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar hidden />
      <button
        onClick={handleClick}
        className="relative flex max-w-[300px] items-center gap-2.25 rounded-xl bg-white p-3 text-left shadow-[0_1px_3px_rgba(16,24,46,0.07)]"
      >
        <span className="flex-shrink-0 text-[17px]">{ad.icon}</span>
        <p className="flex-1 whitespace-pre-line text-xs font-semibold leading-snug text-[#414247]">
          {ad.text}
        </p>
        <span className="flex-shrink-0 whitespace-nowrap text-[11px] font-bold text-[#1a6fdb]">
          {ad.cta}
        </span>
        <span className="absolute right-2.25 top-1.25 text-[9px] font-semibold tracking-wide text-[#b0b1b4]">
          광고
        </span>
      </button>
    </div>
  );
}

export default AdStripBubble;

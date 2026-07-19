// src/pages/AccountAction/components/AdStripBubble.jsx
import OwlAvatar from "./OwlAvatar";

// news: { id, emoji, title, url } (Home의 cardNews와 동일한 모양)
function AdStripBubble({ news }) {
  const handleClick = () =>
    news.url && window.open(news.url, "_blank", "noopener,noreferrer");

  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar hidden />
      <button
        onClick={handleClick}
        className="flex max-w-[300px] items-center gap-2.25 rounded-xl bg-white p-3 text-left shadow-[0_1px_3px_rgba(16,24,46,0.07)]"
      >
        <span className="flex-shrink-0 text-[17px]">{news.emoji}</span>
        <p className="flex-1 whitespace-pre-line text-xs font-semibold leading-snug text-[#414247]">
          {news.title}
        </p>
        <span className="flex-shrink-0 whitespace-nowrap text-[11px] font-bold text-[#1a6fdb]">
          카드뉴스 ↗
        </span>
      </button>
    </div>
  );
}

export default AdStripBubble;

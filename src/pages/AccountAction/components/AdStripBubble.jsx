import OwlAvatar from "./OwlAvatar";

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
        <p className="min-w-0 flex-1 whitespace-pre-line break-words text-xs font-semibold leading-snug text-[#414247]">
          {news.title}
        </p>
        <span className="flex-shrink-0 whitespace-nowrap text-[11px] font-bold text-[#1a6fdb]">
          {news.ctaLabel ?? `${news.badge ?? "카드뉴스"} ↗`}
        </span>
      </button>
    </div>
  );
}

export default AdStripBubble;

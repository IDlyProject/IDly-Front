// src/pages/AccountDetail/components/NewsCard.jsx
function NewsCard({ text, url }) {
  const handleClick = () => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="mb-6 flex w-full items-center gap-3 rounded-[11px] bg-white px-3 py-3.5 text-left"
    >
      <span className="text-[14px]">🔑</span>
      <p className="flex-1 whitespace-pre-line text-[12.5px] font-semibold leading-snug tracking-[-0.2px] text-[#414247]">
        {text}
      </p>
      <span className="flex-shrink-0 whitespace-nowrap text-[11px] font-bold text-[#1a6fdb]">
        카드뉴스 ↗
      </span>
    </button>
  );
}

export default NewsCard;

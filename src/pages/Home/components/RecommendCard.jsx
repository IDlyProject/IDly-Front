import ArrowUpRightIcon from "@/assets/ic_arrow_up_right.svg";
function RecommendCard({ url }) {
  const handleClick = () => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2.5 rounded-[13px] bg-white p-3.25 text-left shadow-[0_1px_3px_rgba(16,24,46,0.05)]"
    >
      <div className="grid h-7.5 w-7.5 place-items-center">🏚️</div>
      <div>
        <strong className="block text-[12.5px] text-[#3B4757">
          불 꺼진 창문, 그냥 두면 위험한 이유
        </strong>
      </div>
      <span className="flex shrink-0 items-center gap-0.75 text-[13px] font-bold text-[#3b6cff]">
        카드뉴스
        <img src={ArrowUpRightIcon} className="h-3.25 w-3.25" />
      </span>
    </button>
  );
}

export default RecommendCard;

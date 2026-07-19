import ChevronRightIcon from "@/assets/ic_chevron_right.svg";
const DOT_COLOR = {
  high: "bg-[#f04452]",
  medium: "bg-[#e8a13a]",
  low: "bg-[#3b6cff]",
};

function RecommendationList({ items, onSelect }) {
  return (
    <div className="mb-6">
      <h3 className="mb-6 text-b24 text-[18px] text-gray100">보안 권장 사항</h3>
      <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_1px_3px_rgba(16,24,46,0.03)]">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex w-full items-center gap-3.5 px-5 py-4 text-left ${
              idx < items.length - 1 ? "border-b-[1.33px] border-[#E5E7EB]" : ""
            }`}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${DOT_COLOR[item.level]}`}
            />
            <div className="flex-1">
              <b className="block text-sb16 text-[14px] text-gray100">
                {item.title}
              </b>
              <small className="mt-0.5 block text-r14 text-[12px] text-gray50">
                {item.desc}
              </small>
            </div>
            <img src={ChevronRightIcon} className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;

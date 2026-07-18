// src/pages/SecurityReport/components/RecommendationList.jsx
function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c0c8d4"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

const DOT_COLOR = {
  high: "bg-[#f04452]",
  medium: "bg-[#e8a13a]",
  low: "bg-[#3b6cff]",
};

function RecommendationList({ items, onSelect }) {
  return (
    <div className="mb-5">
      <h3 className="mb-2.5 text-[13px] font-bold text-[#191f28]">
        보안 권장 사항
      </h3>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex w-full items-center gap-2.5 px-3.5 py-3 text-left ${
              idx < items.length - 1 ? "border-b border-gray-50" : ""
            }`}
          >
            <span
              className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${DOT_COLOR[item.level]}`}
            />
            <div className="flex-1">
              <b className="block text-[13px] text-[#191f28]">{item.title}</b>
              <small className="mt-0.5 block text-[11px] font-bold text-[#9aa4b2]">
                {item.desc}
              </small>
            </div>
            <ChevronRightIcon />
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;

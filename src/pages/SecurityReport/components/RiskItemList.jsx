// src/pages/SecurityReport/components/RiskItemList.jsx
// 위험도별 톤: leak/login → red, password/device → orange, 그 외(안전) → green
const TONE_BY_TYPE = {
  leak: "red",
  login: "red",
  password: "orange",
  device: "orange",
};

const TONE_STYLE = {
  red: { bg: "bg-[#fef2f2]", stroke: "#ee4e4e" },
  orange: { bg: "bg-[#fff8e1]", stroke: "#ffb300" },
  green: { bg: "bg-[#e8f5e9]", stroke: "#43a047" },
};

function RiskIcon({ type }) {
  const tone = TONE_BY_TYPE[type] || "green"; // 매칭되는 타입이 없으면 안전(초록) 처리
  const { stroke } = TONE_STYLE[tone];

  const commonProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "leak") {
    return (
      <svg {...commonProps}>
        <path d="M12 2C8 6 5 9.5 5 13a7 7 0 0 0 14 0c0-3.5-3-7-7-11z" />
      </svg>
    );
  }
  if (type === "login") {
    return (
      <svg {...commonProps}>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="10" y1="18" x2="14" y2="18" />
      </svg>
    );
  }
  if (type === "password") {
    return (
      <svg {...commonProps}>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    );
  }
  if (type === "device") {
    return (
      <svg {...commonProps}>
        <rect x="4" y="4" width="16" height="12" rx="2" />
        <line x1="8" y1="20" x2="16" y2="20" />
      </svg>
    );
  }
  return (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="8 12 11 15 16 9" />
    </svg>
  );
}

function RiskItemList({ items, onSelect }) {
  return (
    <div className="mb-6">
      <h3 className="mb-6 text-[18px] font-bold text-gray100">
        주요 위험 항목
      </h3>
      <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_1px_3px_(16,24,46,0.03)]">
        {items.map((item, idx) => {
          const tone = TONE_BY_TYPE[item.type] || "green";
          const { bg } = TONE_STYLE[tone];
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${
                idx < items.length - 1
                  ? "border-b-[1.33px] border-[#E5E7EB]"
                  : ""
              }`}
            >
              <div
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${bg}`}
              >
                <RiskIcon type={item.type} />
              </div>
              <div className="flex-1">
                <b className="block text-sb16 text-[14px] text-gray100">
                  {item.title}
                </b>
                <small className="mt-1 block text-r14 text-[12px] text-gray60">
                  {item.desc}
                </small>
              </div>
              <span className="shrink-0 text-r14 text-[11px] text-gray50">
                {item.timeAgo}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RiskItemList;

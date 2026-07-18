// src/pages/SecurityReport/components/RiskItemList.jsx
function RiskIcon({ type }) {
  const commonProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#f04452",
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
    <svg {...commonProps} stroke="#12b886">
      <circle cx="12" cy="12" r="9" />
      <polyline points="8 12 11 15 16 9" />
    </svg>
  );
}

function RiskItemList({ items, onSelect }) {
  return (
    <div className="mb-5">
      <h3 className="mb-2.5 text-[13px] font-bold text-[#191f28]">
        주요 위험 항목
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm"
          >
            <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-[#fff5f5]">
              <RiskIcon type={item.type} />
            </div>
            <div className="flex-1">
              <b className="block text-[13px] text-[#191f28]">{item.title}</b>
              <small className="mt-0.5 block text-[11px] font-bold text-[#9aa4b2]">
                {item.desc}
              </small>
            </div>
            <span className="flex-shrink-0 text-[10px] font-bold text-[#c0c8d4]">
              {item.timeAgo}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default RiskItemList;

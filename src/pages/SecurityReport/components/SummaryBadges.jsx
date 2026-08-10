function WarningIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#f04452"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l10 18H2L12 3z" />
      <line x1="12" y1="10" x2="12" y2="14" />
      <circle cx="12" cy="17.5" r="0.5" fill="#f04452" />
    </svg>
  );
}


function CautionIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e8a13a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  );
}

function SafeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#12b886"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="8 12 11 15 16 9" />
    </svg>
  );
}


const ICON_BG = {
  위험: "bg-[#fef2f2]",
  주의: "bg-[#fff8e1]",
  안전: "bg-[#e8f5e9]",
};

function SummaryBadges({ riskCount, actionCount, safeCount }) {
  const items = [
    { icon: <WarningIcon />, count: riskCount, label: "위험" },
    { icon: <CautionIcon />, count: actionCount, label: "주의" },
    { icon: <SafeIcon />, count: safeCount, label: "안전" },
  ];

  return (
    <div className="mb-6 grid grid-cols-3 gap-2.5">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center gap-2 rounded-2xl bg-white py-4 shadow-[0_1px_3px_rgba(16,24,46,0.03)]"
        >
          <div
            className={`grid h-8 w-8 place-items-center rounded-full ${ICON_BG[item.label]}`}
          >
            {item.icon}
          </div>
          <b className="text-b24 text-gray100">{item.count}</b>
          <span className="text-r14 text-[12px] text-gray50">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default SummaryBadges;

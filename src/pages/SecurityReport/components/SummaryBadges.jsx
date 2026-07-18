// src/pages/SecurityReport/components/SummaryBadges.jsx
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

function ActionIcon() {
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
      <line x1="12" y1="8" x2="12" y2="13" />
      <circle cx="12" cy="16" r="0.5" fill="#e8a13a" />
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

function SummaryBadges({ riskCount, actionCount, safeCount }) {
  const items = [
    { icon: <WarningIcon />, count: riskCount, label: "위험" },
    { icon: <ActionIcon />, count: actionCount, label: "조치" },
    { icon: <SafeIcon />, count: safeCount, label: "안전" },
  ];

  return (
    <div className="mb-5 grid grid-cols-3 gap-2.5">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center gap-1.5 rounded-2xl bg-white py-3.5 shadow-sm"
        >
          {item.icon}
          <b className="text-lg font-bold text-[#191f28]">{item.count}</b>
          <span className="text-[11px] font-bold text-[#9aa4b2]">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SummaryBadges;

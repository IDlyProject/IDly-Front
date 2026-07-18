// src/pages/Organize/components/MonthlySummary.jsx
function CheckCircleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="8 12 11 15 16 9" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l10 18H2L12 3z" />
      <line x1="12" y1="10" x2="12" y2="14" />
      <circle cx="12" cy="17.5" r="0.5" fill="white" />
    </svg>
  );
}

function MonthlySummary({
  label,
  completedCount,
  inProgressCount,
  waitingCount,
  isSafe,
}) {
  return (
    <div
      className="mb-2.5 rounded-3xl p-4 text-white shadow-lg"
      style={{
        background: isSafe
          ? "linear-gradient(135deg, #3B6CFF 0%, #08257E 100%)"
          : "linear-gradient(135deg, #E43939 0%, #08257E 100%)",
      }}
    >
      <b className="mb-3 block text-sm">{label}</b>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/10 py-3">
          <CheckCircleIcon />
          <b className="text-lg font-bold">{completedCount}</b>
          <span className="text-[10px] font-bold text-white/70">완료</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/10 py-3">
          <ClockIcon />
          <b className="text-lg font-bold">{inProgressCount}</b>
          <span className="text-[10px] font-bold text-white/70">진행중</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/10 py-3">
          <AlertIcon />
          <b className="text-lg font-bold">{waitingCount}</b>
          <span className="text-[10px] font-bold text-white/70">대기</span>
        </div>
      </div>
    </div>
  );
}

export default MonthlySummary;

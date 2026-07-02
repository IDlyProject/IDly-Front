// src/pages/AccountAction/components/ProgressCard.jsx
function ProgressCard({ completed, total }) {
  const percent = Math.round((completed / total) * 100);
  const isDone = completed === total;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm">
      <div className="flex items-center justify-between">
        <b className="text-sm text-[#191f28]">필수 조치</b>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
            isDone
              ? "bg-[#eafaf2] text-[#12b886]"
              : "bg-[#fff5f5] text-[#f04452]"
          }`}
        >
          {completed}/{total} 완료
        </span>
      </div>
      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#e8edf4]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#3b6cff] to-[#12b886] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressCard;

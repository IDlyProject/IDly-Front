// 수정 후
function MetricGrid({ total, riskCount, score }) {
  return (
    <div className="mb-2.5 grid grid-cols-3 overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="relative p-2.5">
        <b className="block text-lg font-bold text-[#191f28]">{total}</b>
        <span className="mt-1 block text-[10px] font-bold text-[#6b7684]">
          전체 계정
        </span>
        <span className="absolute right-0 top-1/2 h-[85%] w-px -translate-y-1/2 bg-gray-100" />
      </div>
      <div className="relative p-2.5">
        <b
          className={`block text-lg font-bold ${riskCount > 0 ? "text-[#f04452]" : "text-[#12b886]"}`}
        >
          {riskCount}
        </b>
        <span className="mt-1 block text-[10px] font-bold text-[#6b7684]">
          조치 필요
        </span>
        <span className="absolute right-0 top-1/2 h-[85%] w-px -translate-y-1/2 bg-gray-100" />
      </div>
      <div className="p-2.5">
        <b className="block text-lg font-bold text-[#191f28]">{score}</b>
        <span className="mt-1 block text-[10px] font-bold text-[#6b7684]">
          보안 점수
        </span>
      </div>
    </div>
  );
}

export default MetricGrid;

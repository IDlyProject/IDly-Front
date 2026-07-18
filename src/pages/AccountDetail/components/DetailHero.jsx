// src/pages/AccountDetail/components/DetailHero.jsx
function DetailHero({ detail }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <div
        className="grid h-[66px] w-[66px] flex-shrink-0 place-items-center rounded-[18px] text-[26px] font-bold text-white shadow-[0_8px_10px_rgba(16,24,46,0.18)]"
        style={{ background: detail.iconBg }}
      >
        {detail.iconText}
      </div>
      <div className="flex flex-1 items-center justify-between">
        <h2 className="text-[22px] font-bold tracking-[-0.5px] text-[#212125]">
          {detail.name}
        </h2>
        {detail.isRisk && (
          <span className="rounded-full border border-[#f04452] bg-[#ffd7d7]/60 px-3.5 py-1.5 text-[12.5px] font-bold text-[#ee4e4e]">
            {detail.riskBadgeLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export default DetailHero;

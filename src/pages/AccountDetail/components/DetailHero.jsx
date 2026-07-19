// src/pages/AccountDetail/components/DetailHero.jsx
function DetailHero({ detail }) {
  return (
    <div className="py-1.5 mt-3 mb-6 flex items-center gap-4">
      <div
        className="grid h-16.5 w-16.5 shrink-0 place-items-center rounded-[18px] text-[26px] font-bold text-white shadow-[0_8px_19px_rgba(16,24,46,0.18)]"
        style={{ background: detail.iconBg }}
      >
        {detail.iconText}
      </div>
      <div className="flex flex-1 items-center justify-between">
        <h2 className="text-[22px] font-bold tracking-[-0.5px] text-gray100">
          {detail.name}
        </h2>
        {detail.isRisk && (
          <span className="rounded-full border border-[#f04452] bg-[#ffd7d7]/60 px-3 py-1 text-[12.5px] font-bold text-danger50">
            {detail.riskBadgeLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export default DetailHero;

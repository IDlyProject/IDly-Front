// src/pages/AccountDetail/components/DetailHero.jsx
function DetailHero({ detail }) {
  return (
    <div className="rounded-3xl bg-gradient-to-b from-white to-[#f9fbff] p-4 text-center shadow-sm">
      <div
        className="mx-auto mb-1.5 grid h-[54px] w-[54px] place-items-center rounded-2xl text-[22px] font-bold text-white shadow-lg"
        style={{ background: detail.iconBg }}
      >
        {detail.iconText}
      </div>
      <h3 className="text-xl font-bold text-[#191f28]">{detail.name}</h3>
      <span className="mt-2 inline-flex h-[26px] items-center rounded-full bg-[#fff5f5] px-2.5 text-xs font-bold text-[#f04452]">
        조치 필요
      </span>

      <div className="mt-1.5 flex flex-wrap items-center justify-center gap-1.5">
        {detail.meta.map((m) => (
          <span
            key={m}
            className="inline-flex h-6 items-center rounded-full bg-[#f3f6fb] px-2 text-[11px] font-bold text-[#5e6b7d]"
          >
            {m}
          </span>
        ))}
      </div>

      <div className="mt-2.5 grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl bg-[#fff5f5] p-3 text-left">
        <div>
          <b className="text-sm text-[#f04452]">{detail.summaryTitle}</b>
          <p className="mt-1 text-xs font-bold leading-snug text-[#7f4a50]">
            {detail.summaryDesc}
          </p>
        </div>
        <div className="grid h-[42px] w-[62px] flex-shrink-0 place-items-center rounded-full bg-[#f04452] text-[13px] font-bold text-white">
          {detail.riskLevel}
        </div>
      </div>
    </div>
  );
}

export default DetailHero;

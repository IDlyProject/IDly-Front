// src/pages/AccountDetail/components/ResponseCard.jsx
function ResponseCard({ desc, steps, onViewGuide }) {
  return (
    <div className="mt-2.5 rounded-2xl border border-[#3b6cff]/18 bg-gradient-to-b from-[#eef6ff] to-white p-3.5 shadow-sm">
      <b className="text-[15px] text-[#191f28]">이렇게 대응하세요</b>
      <p className="mt-2 text-xs font-bold leading-relaxed text-[#6b7684]">
        {desc}
      </p>

      <div className="mt-2.5 grid gap-1.5">
        {steps.map((step) => (
          <div
            key={step.label}
            className="flex items-center justify-between rounded-xl bg-white px-2.5 py-1.5 text-xs font-bold text-[#191f28]"
          >
            <span>{step.label}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                step.required
                  ? "bg-[#f04452]/10 text-[#f04452]"
                  : "bg-[#f0f3f7] text-[#6b7684]"
              }`}
            >
              {step.required ? "필수" : "권장"}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onViewGuide}
        className="mt-3 h-11 w-full rounded-xl bg-[#3b6cff] text-sm font-bold text-white shadow-lg shadow-blue-500/25"
      >
        대응 방법 보기
      </button>
    </div>
  );
}

export default ResponseCard;

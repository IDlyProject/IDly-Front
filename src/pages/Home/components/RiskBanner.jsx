// src/pages/Home/components/RiskBanner.jsx
function RiskBanner({ safe, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`mb-2.5 grid w-full grid-cols-[32px_1fr_auto] items-center gap-2.5 rounded-2xl border p-2.5 text-left ${
        safe
          ? "border-[#12b886]/20 bg-[#eafaf2] text-[#12b886]"
          : "border-[#f04452]/20 bg-[#fff5f5] text-[#f04452]"
      }`}
    >
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-white">
        {safe ? "✓" : "!"}
      </div>
      <div>
        <b
          className={`block text-[13px] ${safe ? "text-[#0b8f69]" : "text-[#f04452]"}`}
        >
          {title}
        </b>
        <span
          className={`mt-0.5 block text-[11px] font-bold ${safe ? "text-[#387765]" : "text-[#8f4a52]"}`}
        >
          {description}
        </span>
      </div>
      {!safe && <span>›</span>}
    </button>
  );
}

export default RiskBanner;

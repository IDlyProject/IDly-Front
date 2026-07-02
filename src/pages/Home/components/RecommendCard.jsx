// src/pages/Home/components/RecommendCard.jsx
function RecommendCard() {
  return (
    <div className="mb-2.5 grid grid-cols-[34px_1fr_auto] items-center gap-2.5 rounded-2xl border border-[#3b6cff]/15 bg-white p-3 shadow-sm">
      <div className="grid h-8.5 w-8.5 place-items-center rounded-xl bg-[#fff0cf] text-[#9b6b00]">
        🔑
      </div>
      <div>
        <strong className="block text-[13px] leading-snug text-[#191f28]">
          비밀번호 하나 뚫리면 어디까지 털릴까?
        </strong>
        <small className="mt-1 block text-[11px] font-bold text-[#6b7684]">
          3분이면 끝나는 재사용 끊기 · 카드뉴스
        </small>
      </div>
      <span className="flex h-5.5 flex-shrink-0 items-center rounded-full bg-[#eef2ff] px-2 text-[10px] font-black text-[#3b6cff]">
        카드뉴스 ↗
      </span>
    </div>
  );
}

export default RecommendCard;

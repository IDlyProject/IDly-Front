// src/pages/Home/components/RecommendCard.jsx
function RecommendCard({ url }) {
  const handleClick = () => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="mb-2.5 grid w-full grid-cols-[34px_1fr_auto] items-center gap-2.5 rounded-2xl border border-[#3b6cff]/15 bg-white p-3 text-left shadow-sm"
    >
      <div className="grid h-8.5 w-8.5 place-items-center rounded-xl bg-[#fff0cf] text-[#9b6b00]">
        🔑
      </div>
      <div>
        <strong className="block text-[13px] leading-snug text-[#191f28]">
          계정이 반복적으로 해킹되고 있는데, 비밀번호 바꾸는 것 밖에 할 수
          없다면?
        </strong>
        <small className="mt-1 block text-[11px] font-bold text-[#6b7684]">
          바꿔도 바꿔도 또 뚫린다면, 문제는 비밀번호가 아닙니다 · 카드뉴스
        </small>
      </div>
      <span className="flex h-5.5 flex-shrink-0 items-center rounded-full bg-[#eef2ff] px-2 text-[10px] font-black text-[#3b6cff]">
        카드뉴스 ↗
      </span>
    </button>
  );
}

export default RecommendCard;

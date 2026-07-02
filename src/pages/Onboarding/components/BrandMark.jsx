function BrandMark() {
  return (
    <div
      className="relative mx-auto mb-8 grid grid-cols-3 gap-x-2 gap-y-2.5 border border-[#dae4f2]"
      style={{
        width: "132px",
        height: "154px",
        padding: "36px 18px 28px",
        borderRadius: "24px 24px 14px 14px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98), #f3f7ff 72%, #e9eff8)",
        boxShadow:
          "0 22px 46px rgba(90,130,190,0.28), inset 0 1px 0 rgba(255,255,255,0.95)",
      }}
    >
      {/* 상단 걸이 (삼각형 지붕) */}
      <div
        className="absolute z-0"
        style={{
          top: "-20px",
          left: "25px",
          right: "25px",
          height: "40px",
          borderRadius: "12px 12px 4px 4px",
          background: "linear-gradient(160deg, #9fc3ff, #cfe4ff)",
          clipPath: "polygon(50% 0, 100% 48%, 100% 100%, 0 100%, 0 48%)",
          opacity: 0.72,
        }}
      />

      {/* 하단 남색 고리 (카드 뒤쪽에서 살짝 보임) */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2"
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "13px 13px 0 0",
          background: "#15213a",
        }}
      />

      {/* 9개 컬러 칩 */}
      <i className="relative z-10 rounded-[9px] bg-gradient-to-b from-[#ff7f8d] to-[#f04452] shadow-[0_4px_10px_rgba(240,68,82,0.26),inset_0_1px_0_rgba(255,255,255,0.4)]" />
      <i className="relative z-10 rounded-[9px] bg-gradient-to-b from-[#ff7f8d] to-[#f04452] shadow-[0_4px_10px_rgba(240,68,82,0.26),inset_0_1px_0_rgba(255,255,255,0.4)]">
        <span className="absolute -top-[5px] right-[1px] h-2.5 w-2.5 rounded-full border-2 border-white bg-[#ffd98a] shadow-[0_3px_7px_rgba(255,203,91,0.42)]" />
      </i>
      <i className="relative z-10 rounded-[9px] bg-gradient-to-b from-[#7da9ff] to-[#3b6cff]">
        <span className="absolute -top-[5px] right-[1px] h-2.5 w-2.5 rounded-full border-2 border-white bg-[#ffd98a] shadow-[0_3px_7px_rgba(255,203,91,0.42)]" />
      </i>

      <i className="relative z-10 rounded-[9px] bg-gradient-to-b from-[#7da9ff] to-[#3b6cff]" />
      <i className="relative z-10 rounded-[9px] bg-gradient-to-b from-[#7da9ff] to-[#3b6cff]" />
      <i className="relative z-10 rounded-[9px] bg-gradient-to-b from-[#84dfbd] to-[#16b886]" />

      <i className="relative z-10 rounded-[9px] bg-gradient-to-b from-[#84dfbd] to-[#16b886]" />
      <i className="relative z-10 rounded-[9px] bg-gradient-to-b from-[#84dfbd] to-[#16b886]" />
      <i className="relative z-10 rounded-[9px] bg-[#c8d3de] shadow-[inset_0_1px_0_rgba(255,255,255,0.62),0_4px_10px_rgba(20,30,60,0.06)]" />
    </div>
  );
}

export default BrandMark;

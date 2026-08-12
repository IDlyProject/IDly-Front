import ChevronRightIcon from "@/assets/ic_chevron_right.svg";

function ActionRequiredBar({ count, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed inset-x-4 z-20 flex items-center justify-between rounded-2xl bg-[#EF5350] px-5 py-4.5 text-left shadow-[0_4px_12px_rgba(229,77,77,0.3)]"
      style={{ bottom: "calc(100px + env(safe-area-inset-bottom) + 12px)" }}
    >
      <span className="text-sb16 font-extrabold text-white">
        조치 필요 계정 {count}건
      </span>
      <span className="flex items-center gap-1 text-m14 text-white">
        지금 하러 가기
        <img
          src={ChevronRightIcon}
          alt=""
          className="h-3 w-3 filter-[brightness(0)_invert(1)]"
        />
      </span>
    </button>
  );
}

export default ActionRequiredBar;

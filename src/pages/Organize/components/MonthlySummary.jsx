import FinishedIcon from "@/assets/ic_finished.svg";
import LoadingIcon from "@/assets/ic_loading.svg";

// summary API의 progress가 { done, pending } 2종류만 반환 (skipped 상태는 없어짐)
function MonthlySummary({ label, completedCount, inProgressCount, isSafe }) {
  return (
    <div
      className="rounded-[20px] p-5 text-white"
      style={{
        background: isSafe
          ? "linear-gradient(135deg, #3B6CFF 0%, #08257E 100%)"
          : "linear-gradient(135deg, #E43939 0%, #08257E 100%)",
      }}
    >
      <b className="mb-3 block text-sb16 text-[14px]">{label}</b>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center gap-1 rounded-[14px] bg-white/8 py-3.5">
          <img src={FinishedIcon} className="w-5 h-5" />
          <b className="text-[22px] font-bold">{completedCount}</b>
          <span className="text-m14 text-[11px] text-white/66">완료</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-[14px] bg-white/8 py-3.5">
          <img src={LoadingIcon} className="w-5 h-5" />
          <b className="text-[22px] font-bold">{inProgressCount}</b>
          <span className="text-m14 text-[11px] text-white/66">진행중</span>
        </div>
      </div>
    </div>
  );
}

export default MonthlySummary;

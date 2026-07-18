import AptIcon from "@/assets/ic_apt.svg";
import SafeIcon from "@/assets/ic_status_safe.svg";
import DangerIcon from "@/assets/ic_status_danger.svg";

function StatusHero({ userName, totalCount, isSafe, riskCount, score }) {
  return (
    <div
      className="rounded-[20px] text-white p-5"
      style={{
        background: isSafe
          ? "linear-gradient(135deg, #3B6CFF 0%, #08257E 100%)"
          : "linear-gradient(135deg, #E43939 0%, #08257E 100%)",
      }}
    >
      <div className="mt-1 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-m14 text-[13px] text-white/80">
          <img src={AptIcon} className=" w-3 h-auto" />
          {userName} 님의 계정아파트
        </div>
        <span className="rounded-full bg-[#FFD36C] px-2.25 py-1 text-[11px] font-semibold text-gray100">
          {totalCount}개의 계정
        </span>
      </div>
      <div className="mx-1">
        <h2 className="mb-2 text-b24 text-[22px]">
          {isSafe
            ? "모든 계정이 양호합니다"
            : `${riskCount}개의 계정에 조치가 필요합니다`}
        </h2>

        <div className="flex items-center gap-2 text-sb16 text-[14px]">
          <img
            src={isSafe ? SafeIcon : DangerIcon}
            alt=""
            className={`h-5.5 w-5.5 ${
              isSafe
                ? "drop-shadow-[0_0_4px_rgba(18,184,134,1)]"
                : "drop-shadow-[0_0_4px_rgba(255,103,116,1)]"
            }`}
          />
          통합 보안 점수 {score}점
        </div>
      </div>
    </div>
  );
}

export default StatusHero;

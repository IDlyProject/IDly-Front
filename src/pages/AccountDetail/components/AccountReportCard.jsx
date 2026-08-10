function formatAnalyzedAt(isoString) {
  if (!isoString) return "분석 시각 정보 없음";

  return `${new Date(isoString).toLocaleString("ko-KR", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })} 분석`;
}

function AccountReportCard({ detail }) {
  const isComplete = detail.remainingActionCount === 0;

  return (
    <section className="mb-5 rounded-[18px] bg-white p-5 shadow-[0_8px_24px_rgba(17,31,67,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold text-gray50">계정 보안 상태</p>
          <h3 className="mt-1 text-[17px] font-bold text-gray100">
            {isComplete ? "모든 보안 조치를 완료했어요" : "확인이 필요한 조치가 있어요"}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-bold ${
            isComplete
              ? "bg-[#E9F8F1] text-[#16865C]"
              : "bg-[#FFF1F2] text-danger50"
          }`}
        >
          {isComplete ? "조치 완료" : detail.riskBadgeLabel}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-[#F6F7FA] px-3.5 py-3">
          <p className="text-[11.5px] font-semibold text-gray50">보안 조치</p>
          <p className="mt-1 text-[18px] font-bold text-gray100">
            {detail.completedActionCount}
            <span className="text-[12px] font-semibold text-gray50">
              /{detail.actionCount} 완료
            </span>
          </p>
        </div>
        <div className="rounded-xl bg-[#F6F7FA] px-3.5 py-3">
          <p className="text-[11.5px] font-semibold text-gray50">확인된 근거</p>
          <p className="mt-1 text-[18px] font-bold text-gray100">
            {detail.evidenceCount}
            <span className="text-[12px] font-semibold text-gray50">건</span>
          </p>
        </div>
      </div>

      <p className="mt-3 text-[11.5px] font-medium text-gray50">
        {formatAnalyzedAt(detail.analyzedAt)}
      </p>
    </section>
  );
}

export default AccountReportCard;

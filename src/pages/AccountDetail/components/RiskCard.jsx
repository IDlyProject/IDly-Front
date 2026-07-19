import WarningTriangleIcon from "@/assets/ic_danger.svg";
import MailIcon from "@/assets/ic_message_mini.svg";

function RiskCard({ detail, onActionClick }) {
  return (
    <div className="mb-2 rounded-[18px] border border-danger50/24 bg-danger50/6 p-5">
      <div className="mb-3 flex items-center gap-2 text-[14px] font-bold text-danger50">
        <img src={WarningTriangleIcon} alt="" className="h-4.5 w-4.5" />
        {detail.riskTitle}
      </div>

      <div className="relative rounded-xl bg-white p-3">
        <p className="text-[13.5px] font-bold leading-relaxed text-gray100">
          {detail.summaryTitle}
        </p>
        <p className="mt-0.5 text-[12.5px] font-bold text-gray60">
          {detail.summarySub}
        </p>
        <div className="my-2 w-full h-[0.76px] bg-[#F0F1F4]" />
        <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-gray50">
          <img src={MailIcon} alt="" className="h-2.5 w-3.25" />
          {detail.sourceLabel}
        </div>
      </div>

      <button
        onClick={onActionClick}
        className="mt-3 h-11 w-full rounded-xl bg-danger50 text-[14px] font-bold text-white"
      >
        {detail.ctaLabel}
      </button>
    </div>
  );
}

export default RiskCard;

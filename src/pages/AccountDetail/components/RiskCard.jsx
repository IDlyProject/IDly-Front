// src/pages/AccountDetail/components/RiskCard.jsx
import WarningTriangleIcon from "@/assets/ic_danger.svg";
import MailIcon from "@/assets/ic_message_mini.svg";

function RiskCard({ detail, onActionClick }) {
  return (
    <div className="mb-4 rounded-[18px] border border-[#ee4e4e]/24 bg-[#ee4e4e]/[0.06] p-[17px]">
      <div className="mb-3.25 flex items-center gap-1.5 text-[14px] font-bold text-[#ee4e4e]">
        <img src={WarningTriangleIcon} alt="" className="h-4.5 w-4.5" />
        {detail.riskTitle}
      </div>

      <div className="relative rounded-xl bg-white p-3.25 pb-9">
        <p className="text-[13.5px] font-bold leading-relaxed text-[#212125]">
          {detail.summaryTitle}
        </p>
        <p className="mt-0.75 text-[12.5px] font-bold text-[#70737a]">
          {detail.summarySub}
        </p>

        <div className="absolute bottom-3 left-3.25 right-3.25 flex items-center gap-1.5 border-t border-[#f0f1f4] pt-2 text-[11.5px] font-bold text-[#8c8f96]">
          <img src={MailIcon} alt="" className="h-2.5 w-3.25" />
          {detail.sourceLabel}
        </div>
      </div>

      <button
        onClick={onActionClick}
        className="mt-4.5 h-11 w-full rounded-xl bg-[#ee4e4e] text-[14px] font-bold text-white"
      >
        {detail.ctaLabel}
      </button>
    </div>
  );
}

export default RiskCard;

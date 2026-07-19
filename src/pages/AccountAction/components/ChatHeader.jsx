import { ChevronLeftIcon } from "../icons";

function ChatHeader({ title, doneCount, totalActions, label, onBack }) {
  const showPill = doneCount > 0;
  const allDone = doneCount === totalActions;
  const pillText =
    label ?? (allDone ? "모두 완료" : `${doneCount}/${totalActions} 완료`);

  return (
    <div className="flex items-center gap-3 px-5 py-1.5">
      <button
        onClick={onBack}
        className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
      >
        <img src={ChevronLeftIcon} alt="" className="h-5 w-5" />
      </button>
      <h1 className="flex-1 truncate text-[18px] font-bold text-[#212125]">
        {title}
      </h1>
      {showPill && (
        <span
          className={`flex-shrink-0 rounded-full px-2.25 py-0.75 text-[10.5px] font-bold ${allDone ? "bg-[#43a047]/18" : "bg-[#43a047]/12"} text-[#43a047]`}
        >
          {pillText}
        </span>
      )}
    </div>
  );
}

export default ChatHeader;

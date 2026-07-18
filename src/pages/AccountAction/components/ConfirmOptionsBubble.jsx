// src/pages/AccountAction/components/ConfirmOptionsBubble.jsx
function ConfirmOptionsBubble({ onDone, onFail }) {
  return (
    <div className="flex justify-end">
      <div className="min-w-[190px] overflow-hidden rounded-[18px_4px_18px_18px] bg-[#08257e] shadow-[0_2px_3px_rgba(8,37,126,0.1)]">
        <button
          onClick={onDone}
          className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm font-semibold text-white"
        >
          <span className="grid h-5.5 w-5.5 flex-shrink-0 place-items-center rounded-full bg-[#43a047]/85">
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <polyline points="2,7 5.5,10.5 12,4" />
            </svg>
          </span>
          조치를 완료했어요 !
        </button>
        <button
          onClick={onFail}
          className="flex w-full items-center gap-2.5 border-t border-white/20 px-4 py-3 text-left text-sm font-semibold text-white"
        >
          <span className="grid h-5.5 w-5.5 flex-shrink-0 place-items-center rounded-full bg-[#ee4e4e]/85">
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <line x1="3" y1="3" x2="11" y2="11" />
              <line x1="11" y1="3" x2="3" y2="11" />
            </svg>
          </span>
          조치하지 못했어요
        </button>
      </div>
    </div>
  );
}

export default ConfirmOptionsBubble;

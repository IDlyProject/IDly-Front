// src/pages/AccountAction/components/CompleteModal.jsx
function CompleteModal({ serviceName, onCheckHome, onCheckNext }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#10182e]/42 px-5 pb-8 sm:items-center">
      <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-[#12b886] text-lg font-bold text-white">
            ✓
          </div>
          <p className="text-[17px] font-bold text-[#191f28]">
            {serviceName} 조치 완료
          </p>
        </div>

        <button
          onClick={onCheckHome}
          className="mb-2 h-12 w-full rounded-xl bg-[#3b6cff] text-sm font-bold text-white shadow-lg shadow-blue-500/25"
        >
          홈에서 변경 확인하기
        </button>
        <button
          onClick={onCheckNext}
          className="flex h-12 w-full items-center justify-center gap-1.5 rounded-xl border border-[#f04452]/28 bg-white text-sm font-bold text-[#f04452] shadow-sm"
        >
          <span>⚠</span>다음 조치 확인하기
        </button>
      </div>
    </div>
  );
}

export default CompleteModal;

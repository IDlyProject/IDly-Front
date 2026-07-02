// src/pages/Home/components/SyncStrip.jsx
function SyncStrip({ lastSyncTime, description }) {
  return (
    <div className="mb-2.5 flex items-center justify-between gap-2.5 rounded-2xl border border-[#3b6cff]/20 bg-gradient-to-b from-[#eef6ff] to-white px-3 py-2.5 shadow-sm">
      <div>
        <b className="block text-xs text-[#191f28]">
          마지막 분석 {lastSyncTime}
        </b>
        <span className="mt-0.5 block text-[10px] font-bold text-[#6b7684]">
          {description}
        </span>
      </div>
      <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg bg-[#eef2ff] text-[#3b6cff]">
        ↻
      </div>
    </div>
  );
}

export default SyncStrip;

// src/pages/AccountDetail/components/SignalPanel.jsx
import { useState } from "react";

const LEVEL_STYLE = {
  red: "bg-[#fff5f5] text-[#f04452]",
  yellow: "bg-[#fff0cf] text-[#9a6b00]",
  gray: "bg-[#edf0f4] text-[#6e7888]",
};

function SignalPanel({ signals }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2.5">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-2xl border px-3.5 py-2.5 text-xs font-bold ${
          open ? "border-[#3b6cff] bg-[#eef2ff]" : "border-gray-200 bg-white"
        }`}
      >
        <span
          className={`flex items-center gap-1.5 ${open ? "text-[#3b6cff]" : "text-[#191f28]"}`}
        >
          <span className="grid h-5 w-5 place-items-center rounded-md bg-[#f04452]/10 text-[11px] font-bold text-[#f04452]">
            {signals.length}
          </span>
          {signals[0].title} 외 {signals.length - 1}건
        </span>
        <span className={open ? "text-[#3b6cff]" : "text-[#6b7684]"}>
          {open ? "접기 ▴" : "자세히 ▾"}
        </span>
      </button>

      {open && (
        <div className="mt-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          {signals.map((signal, idx) => (
            <div
              key={signal.id}
              className="grid grid-cols-[28px_1fr] gap-2.5 border-b border-gray-50 px-3.5 py-2.5 last:border-b-0"
            >
              <div
                className={`grid h-5 w-5 place-items-center rounded-md text-[11px] font-bold ${LEVEL_STYLE[signal.level]}`}
              >
                {idx + 1}
              </div>
              <div>
                <b className="block text-xs font-bold text-[#191f28]">
                  {signal.title}
                </b>
                <small className="mt-0.5 block text-[10px] font-bold text-[#6b7684]">
                  {signal.desc}
                </small>
                {signal.source && (
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#eef6ff] px-2 py-0.5 text-[10px] font-bold text-[#3b6cff]">
                    📧 {signal.source}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SignalPanel;

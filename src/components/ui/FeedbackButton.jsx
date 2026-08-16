import { useState } from "react";
import { useLocation } from "react-router-dom";
import { submitFeedback } from "@/services/feedbackService";

export default function FeedbackButton() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error

  function handleOpen() {
    setOpen(true);
    setStatus("idle");
    setMessage("");
  }

  function handleClose() {
    if (status === "loading") return;
    setOpen(false);
  }

  async function handleSubmit() {
    if (!message.trim() || message.trim().length < 5) return;
    setStatus("loading");
    try {
      await submitFeedback({ message: message.trim(), screenPath: location.pathname });
      setStatus("done");
      setTimeout(() => setOpen(false), 1400);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={handleOpen}
        aria-label="버그 제보"
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+80px)] right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#212125]/80 shadow-lg backdrop-blur-sm transition-transform active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 3a1 1 0 110 2 1 1 0 010-2zm0 4a1 1 0 011 1v4a1 1 0 11-2 0V10a1 1 0 011-1z"
            fill="white"
            opacity="0.85"
          />
        </svg>
      </button>

      {/* 모달 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-[calc(env(safe-area-inset-bottom)+16px)]"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white px-5 py-5 shadow-xl">
            {status === "done" ? (
              <div className="flex flex-col items-center gap-2 py-4">
                <span className="text-2xl">✅</span>
                <p className="text-sm font-semibold text-gray-700">제보해줘서 고마워요!</p>
              </div>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[15px] font-bold text-gray-900">버그 / 불편사항 제보</p>
                  <button onClick={handleClose} className="p-1 text-gray-400 active:text-gray-600">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                <textarea
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-[14px] leading-relaxed text-gray-800 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
                  rows={4}
                  placeholder="어떤 문제가 있었나요? (5자 이상)"
                  value={message}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) setMessage(e.target.value);
                  }}
                  disabled={status === "loading"}
                  autoFocus
                />

                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">{message.length}/500</span>
                  {status === "error" && (
                    <span className="text-[11px] text-red-400">전송 실패, 다시 시도해주세요</span>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={message.trim().length < 5 || status === "loading"}
                  className="mt-3 w-full rounded-xl bg-[#212125] py-3 text-[14px] font-semibold text-white transition-opacity disabled:opacity-40 active:opacity-70"
                >
                  {status === "loading" ? "전송 중..." : "제보하기"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

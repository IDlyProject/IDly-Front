import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { submitFeedback } from "@/services/feedbackService";

const VARIANTS = {
  default: {
    title: "불편사항 제보",
    description:
      "IDly를 이용하면서 불편하신 사항이 있으시면 캡처와 함께 제보해주세요! 추첨에 따라 매달 말 기프티콘을 드립니다",
    placeholder: "어떤 점이 불편하셨나요? (5자 이상)",
  },
  chatbot: {
    title: "챗봇 제보",
    description:
      "IDly 챗봇이 이상하게 답변하나요? 제보해주세요! 질문과 답변을 모두 첨부해주시면 좋습니다",
    placeholder: "어떤 답변이 이상했나요? (5자 이상)",
  },
};

export default function FeedbackButton({ variant = "default", hidden = false, bottomOffset = 116 }) {
  const location = useLocation();
  const { title, description, placeholder } = VARIANTS[variant] ?? VARIANTS.default;

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle");
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);

  // hidden 전환 시 모달 닫기 (effect 대신 렌더 중 조정 — cascading render 방지)
  const [prevHidden, setPrevHidden] = useState(hidden);
  if (hidden !== prevHidden) {
    setPrevHidden(hidden);
    if (hidden) setOpen(false);
  }

  // unmount 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function revokeAll(imgs) {
    imgs.forEach((img) => URL.revokeObjectURL(img.previewUrl));
  }

  function handleOpen() {
    setOpen(true);
    setStatus("idle");
    setMessage("");
    setImages([]);
  }

  function handleClose() {
    if (status === "loading") return;
    revokeAll(images);
    setImages([]);
    setOpen(false);
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const next = files.slice(0, 5 - images.length).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...next]);
    e.target.value = "";
  }

  function handleRemoveImage(idx) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  }

  async function handleSubmit() {
    if (!message.trim() || message.trim().length < 5) return;
    setStatus("loading");
    try {
      await submitFeedback({
        message: message.trim(),
        screenPath: location.pathname,
        images: images.map((img) => img.file),
      });
      setStatus("done");
      timerRef.current = setTimeout(() => {
        revokeAll(images);
        setImages([]);
        setOpen(false);
      }, 1400);
    } catch {
      setStatus("error");
    }
  }

  const bottomStyle = { bottom: `calc(env(safe-area-inset-bottom) + ${bottomOffset}px)` };

  return (
    <>
      {/* 플로팅 버튼 */}
      {!hidden && (
        <button
          onClick={handleOpen}
          aria-label={title}
          style={bottomStyle}
          className="fixed right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#212125]/80 shadow-lg backdrop-blur-sm transition-transform active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 3a1 1 0 110 2 1 1 0 010-2zm0 4a1 1 0 011 1v4a1 1 0 11-2 0V10a1 1 0 011-1z"
              fill="white"
              opacity="0.85"
            />
          </svg>
        </button>
      )}

      {/* 모달 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 px-4 pb-[calc(env(safe-area-inset-bottom)+16px)]"
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
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-[15px] font-bold text-gray-900">{title}</p>
                  <button onClick={handleClose} className="p-1 text-gray-400 active:text-gray-600">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                <p className="mb-3 text-[12px] leading-relaxed text-gray-500">{description}</p>

                <textarea
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-[14px] leading-relaxed text-gray-800 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
                  rows={3}
                  placeholder={placeholder}
                  value={message}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) setMessage(e.target.value);
                  }}
                  disabled={status === "loading"}
                  autoFocus
                />

                <div className="mt-1 mb-2 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">{message.length}/500</span>
                  {status === "error" && (
                    <span className="text-[11px] text-red-400">전송 실패, 다시 시도해주세요</span>
                  )}
                </div>

                {/* 이미지 첨부 */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={status === "loading"}
                />

                {images.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative h-16 w-16 overflow-hidden rounded-lg border border-gray-200">
                        <img src={img.previewUrl} alt="" className="h-full w-full object-cover" />
                        <button
                          onClick={() => handleRemoveImage(idx)}
                          disabled={status === "loading"}
                          className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white"
                          aria-label="이미지 제거"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M7.5 2.5l-5 5M2.5 2.5l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={status === "loading"}
                    className="mb-3 flex w-full items-center gap-2 rounded-xl border border-dashed border-gray-300 px-3.5 py-2.5 text-[13px] text-gray-400 transition-colors hover:border-gray-400 hover:text-gray-500 active:bg-gray-50 disabled:opacity-40"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 11l3.5-4 2.5 3 2-2.5L13 11H2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                      <circle cx="5" cy="5.5" r="1.2" stroke="currentColor" strokeWidth="1.3"/>
                      <rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.3"/>
                    </svg>
                    {images.length === 0
                      ? "캡처 화면 첨부 (선택, 최대 5장)"
                      : `사진 추가 (${images.length}/5)`}
                  </button>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={message.trim().length < 5 || status === "loading"}
                  className="w-full rounded-xl bg-[#212125] py-3 text-[14px] font-semibold text-white transition-opacity disabled:opacity-40 active:opacity-70"
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

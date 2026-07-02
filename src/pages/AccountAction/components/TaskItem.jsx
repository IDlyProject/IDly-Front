// src/pages/AccountAction/components/TaskItem.jsx
import { useRef, useState } from "react";

const REVEAL_WIDTH = 152;

function TaskItem({ task, status, onComplete, onSkip, onUndo, onOpenLink }) {
  const [translateX, setTranslateX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);
  const baseXRef = useRef(0);
  const movedRef = useRef(false);

  const isDone = status === "done";
  const isSkipped = status === "skipped";
  const isVisited = status === "visited";
  const isDismissed = isDone || isSkipped || isVisited;

  const handlePointerDown = (e) => {
    movedRef.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    startXRef.current = e.clientX;
    baseXRef.current = translateX;
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const delta = e.clientX - startXRef.current;
    if (Math.abs(delta) > 4) movedRef.current = true;
    const next = Math.min(0, Math.max(-REVEAL_WIDTH, baseXRef.current + delta));
    setTranslateX(next);
  };

  const handlePointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    setTranslateX((prev) => (prev < -REVEAL_WIDTH / 2 ? -REVEAL_WIDTH : 0));
  };

  const handleComplete = () => {
    onComplete(task.id);
    setTranslateX(0);
  };

  const handleSkip = () => {
    onSkip(task.id);
    setTranslateX(0);
  };

  const handleUndo = () => {
    onUndo(task.id);
    setTranslateX(0);
  };

  // 링크형 항목
  if (task.type === "link") {
    return (
      <button
        onClick={() => onOpenLink(task.id)}
        className={`grid w-full grid-cols-[34px_1fr_auto] items-center gap-2.5 rounded-2xl border p-3 text-left transition-opacity ${
          isVisited
            ? "border-transparent bg-white opacity-40"
            : "border-gray-100 bg-white shadow-sm"
        }`}
      >
        <div className="grid h-[34px] w-[34px] place-items-center rounded-xl bg-[#edf1f6] text-sm font-bold text-[#7c8796]">
          1
        </div>
        <div>
          <b className="block text-[13px] text-[#191f28]">{task.title}</b>
          <small className="mt-0.5 block text-[11px] font-bold text-[#6b7684]">
            {task.desc}
          </small>
        </div>
        <span className="text-gray-300">›</span>
      </button>
    );
  }

  // 완료/건너뜀 상태 - 반투명 처리
  if (isDismissed) {
    const doneStyle = isDone;
    return (
      <button
        onClick={handleUndo}
        className="grid w-full grid-cols-[34px_1fr_auto] items-center gap-2.5 rounded-2xl border border-transparent bg-white p-3 text-left opacity-40"
      >
        <div
          className={`grid h-[34px] w-[34px] place-items-center rounded-xl text-sm font-bold text-white ${
            doneStyle ? "bg-[#12b886]" : "bg-gray-300"
          }`}
        >
          {doneStyle ? "✓" : "–"}
        </div>
        <div>
          <b className="block text-[13px] text-[#191f28]">{task.title}</b>
          <small className="mt-0.5 block text-[11px] font-bold text-[#6b7684]">
            {task.desc}
          </small>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
            doneStyle
              ? "bg-[#eafaf2] text-[#12b886]"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {doneStyle ? "완료" : "건너뜀"}
        </span>
      </button>
    );
  }

  // 대기 상태 - 스와이프 가능
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div
        className="absolute inset-y-0 right-0 flex gap-2"
        style={{ width: REVEAL_WIDTH }}
      >
        <div className="w-0.5 flex-shrink-0" aria-hidden="true" />
        <button
          onClick={handleComplete}
          className="grid w-[68px] flex-shrink-0 place-items-center rounded-2xl border border-gray-200 bg-white text-[11px] font-bold text-[#12b886] shadow-sm"
        >
          완료
        </button>
        <button
          onClick={handleSkip}
          className="grid w-[68px] flex-shrink-0 place-items-center rounded-2xl border border-gray-200 bg-white text-[11px] font-bold text-[#8c9aaa] shadow-sm"
        >
          건너뛰기
        </button>
      </div>

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: dragging ? "none" : "transform 0.2s ease",
          touchAction: "pan-y",
        }}
        className="relative grid select-none grid-cols-[34px_1fr_auto] items-center gap-2.5 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
      >
        <div
          className={`grid h-[34px] w-[34px] place-items-center rounded-xl border-2 text-sm font-bold ${
            task.required
              ? "border-[#f04452]/34 bg-[#fff5f5] text-[#f04452]"
              : "border-gray-200 bg-white text-transparent"
          }`}
        >
          {task.required ? "!" : ""}
        </div>
        <div>
          <b className="block text-[13px] text-[#191f28]">{task.title}</b>
          <small className="mt-0.5 block text-[11px] font-bold text-[#6b7684]">
            {task.desc}
          </small>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
            task.required
              ? "bg-[#fff5f5] text-[#f04452]"
              : "bg-[#fff0cf] text-[#9a6b00]"
          }`}
        >
          {task.required ? "필수" : "권장"}
        </span>
      </div>
    </div>
  );
}

export default TaskItem;

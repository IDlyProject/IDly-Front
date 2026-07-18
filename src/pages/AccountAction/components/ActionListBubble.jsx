// src/pages/AccountAction/components/ActionListBubble.jsx
import OwlAvatar from "./OwlAvatar";

// 추천 조치 목록 / 남은 조치 목록 / 전체 완료 목록 3가지를 한 컴포넌트로 처리
function ActionListBubble({ title, titleColor, actions, doneIds, onSelect }) {
  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar />
      <div className="max-w-[300px] flex-1 rounded-[4px_18px_18px_18px] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,46,0.04)]">
        <b
          className="mb-2.5 block text-sm font-bold"
          style={{ color: titleColor ?? "#212125" }}
        >
          {title}
        </b>
        <div className="space-y-2">
          {actions.map((action) => {
            const isDone = doneIds?.has(action.id);
            const clickable = onSelect && !isDone;
            return (
              <div
                key={action.id}
                onClick={clickable ? () => onSelect(action.id) : undefined}
                className={`flex items-center gap-2.5 rounded-xl bg-[#ecf1f9] p-2.5 ${isDone ? "opacity-45" : ""} ${
                  clickable ? "cursor-pointer" : ""
                }`}
              >
                <div
                  className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg"
                  style={{ background: isDone ? "#43a047" : action.color }}
                >
                  <img src={action.icon} alt="" className="h-3.75 w-3.75" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#212125]">
                    {action.name}
                  </p>
                  <small className="mt-0.5 block text-[11px] text-[#8c8f96]">
                    {isDone ? "완료됨" : action.sub}
                  </small>
                </div>
                {isDone ? (
                  <span className="text-lg text-[#43a047]">✓</span>
                ) : clickable ? (
                  <span className="text-base text-[#8c8f96]">›</span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ActionListBubble;

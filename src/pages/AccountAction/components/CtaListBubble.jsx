// src/pages/AccountAction/components/CtaListBubble.jsx
import OwlAvatar from "./OwlAvatar";

function CtaListBubble({ onHome, onNextAccount, onReport }) {
  const items = [
    { icon: "🏠", bg: "#eef0f8", label: "홈으로 돌아가기", onClick: onHome },
    {
      icon: "🔒",
      bg: "#e8f5e9",
      label: "다음 계정 보안 조치 하기",
      onClick: onNextAccount,
    },
    {
      icon: "📊",
      bg: "#e8eeff",
      label: "보안 리포트 보러 가기",
      onClick: onReport,
    },
  ];

  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar hidden />
      <div className="max-w-[300px] flex-1 overflow-hidden rounded-[4px_18px_18px_18px] bg-white shadow-[0_1px_2px_rgba(16,24,46,0.06)]">
        {items.map((item, idx) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`flex w-full items-center gap-3 px-4 py-3.25 text-left ${idx < items.length - 1 ? "border-b border-gray-50" : ""}`}
          >
            <span
              className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-base"
              style={{ background: item.bg }}
            >
              {item.icon}
            </span>
            <span className="flex-1 text-sm font-semibold text-[#212125]">
              {item.label}
            </span>
            <span className="text-[#8c8f96]">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CtaListBubble;

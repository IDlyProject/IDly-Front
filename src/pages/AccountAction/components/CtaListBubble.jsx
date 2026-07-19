import { useNavigate } from "react-router-dom";
import OwlAvatar from "./OwlAvatar";
import { ROUTES } from "@/constants/routes";

const STYLE_ICON = {
  home: { icon: "🏠", bg: "#eef0f8" },
  report: { icon: "📊", bg: "#e8eeff" },
};
const DEFAULT_ICON = { icon: "🔗", bg: "#eef0f8" };

const HREF_TO_ROUTE = {
  "/home": ROUTES.HOME,
  "/report": ROUTES.SECURITY_REPORT,
};

// ctas: metadata.exitCtas [{ id, href, label, style, enabled }]
// nextServiceAccountId: 있으면 "다음 계정 보안 조치 하기" 버튼을 추가로 보여준다
function CtaListBubble({ ctas = [], nextServiceAccountId }) {
  const navigate = useNavigate();

  const items = [
    ...ctas
      .filter((cta) => cta.enabled !== false)
      .map((cta) => ({
        key: cta.id,
        ...(STYLE_ICON[cta.style] ?? DEFAULT_ICON),
        label: cta.label,
        onClick: () => navigate(HREF_TO_ROUTE[cta.href] ?? cta.href),
      })),
    ...(nextServiceAccountId
      ? [
          {
            key: "next_account",
            icon: "🔒",
            bg: "#e8f5e9",
            label: "다음 계정 보안 조치 하기",
            onClick: () =>
              navigate(ROUTES.ACCOUNT_ACTION(nextServiceAccountId)),
          },
        ]
      : []),
  ];

  if (items.length === 0) return null;

  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar hidden />
      <div className="max-w-[300px] flex-1 overflow-hidden rounded-[4px_18px_18px_18px] bg-white shadow-[0_1px_2px_rgba(16,24,46,0.06)]">
        {items.map((item, idx) => (
          <button
            key={item.key}
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

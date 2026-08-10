import { useNavigate } from "react-router-dom";
import OwlAvatar from "./OwlAvatar";
import { ROUTES } from "@/constants/routes";

const STYLE_ICON = {
  home: { icon: "🏠", bg: "#eef0f8" },
  report: { icon: "📊", bg: "#e8eeff" },
  account: { icon: "📋", bg: "#e8eeff" },
};
const DEFAULT_ICON = { icon: "🔗", bg: "#eef0f8" };

const HREF_TO_ROUTE = {
  "/home": ROUTES.HOME,
};

function CtaListBubble({ ctas = [], serviceAccountId }) {
  const navigate = useNavigate();

  const items = ctas
    .filter((cta) => cta.enabled !== false && cta.id !== "next_account")
    .map((cta) => {
      const isLegacyReport = cta.id === "report" || cta.href === "/report";
      if (isLegacyReport && !serviceAccountId) return null;

      const normalized = isLegacyReport
        ? {
            ...cta,
            id: "account_report",
            style: "account",
            label: "계정 리포트 보러 가기",
            href: ROUTES.ACCOUNT_DETAIL(serviceAccountId),
          }
        : cta;

      return {
        key: normalized.id,
        ...(STYLE_ICON[normalized.style] ?? DEFAULT_ICON),
        label: normalized.label,
        onClick: () =>
          navigate(HREF_TO_ROUTE[normalized.href] ?? normalized.href),
      };
    })
    .filter(Boolean);

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

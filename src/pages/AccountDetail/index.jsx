// src/pages/AccountDetail/index.jsx
import { useNavigate, useParams } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import DetailHero from "./components/DetailHero";
import RiskCard from "./components/RiskCard";
import EventsList from "./components/EventsList";
import { useServiceAccountDetail } from "@/hooks/useServiceAccountDetail";
import { getServiceIconGradient } from "@/utils/serviceIcon";
import { ROUTES } from "@/constants/routes";
import ChevronLeftIcon from "@/assets/ic_chevron_left.svg";

function formatEventTime(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const now = new Date();
  const startOfDay = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round(
    (startOfDay(now) - startOfDay(date)) / (24 * 60 * 60 * 1000),
  );

  const hours = date.getHours();
  const period = hours < 12 ? "오전" : "오후";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const timeStr = `${period} ${displayHour}:${minutes}`;

  if (diffDays <= 0) return `오늘 ${timeStr}`;
  if (diffDays === 1) return `어제 ${timeStr}`;
  return `${diffDays}일 전 ${timeStr}`;
}

// 백엔드 응답을 화면 컴포넌트(DetailHero/RiskCard/EventsList)가 기대하는 형태로 변환
function toViewDetail(raw) {
  const latestEvent = raw.recentEvents[0];

  return {
    name: raw.displayName,
    iconBg: getServiceIconGradient(raw.serviceName),
    iconText: raw.displayName?.[0]?.toUpperCase() ?? "?",
    isRisk: raw.status === "action_required",
    riskBadgeLabel: raw.riskBadgeText,
    riskTitle: raw.headline,
    summaryTitle: raw.summary,
    summarySub: raw.interpretation,
    sourceLabel: latestEvent
      ? `${latestEvent.sender} · ${formatEventTime(latestEvent.receivedAt)} 수신`
      : "",
    ctaLabel: raw.primaryCta?.label ?? "지금 바로 조치하기",
    events: raw.recentEvents.map((event) => ({
      id: event.id,
      type: event.riskType,
      name: event.subject,
      time: formatEventTime(event.receivedAt),
    })),
  };
}

function AccountDetail() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const { detail: raw, status } = useServiceAccountDetail(accountId);

  if (status === "loading") {
    return (
      <PageBackground variant="frost">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">불러오는 중...</p>
        </div>
      </PageBackground>
    );
  }

  if (status === "not_found") {
    navigate(ROUTES.HOME, { replace: true });
    return null;
  }

  if (status === "error") {
    return (
      <PageBackground variant="frost">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">
            계정 정보를 불러오지 못했어요.
          </p>
        </div>
      </PageBackground>
    );
  }

  const detail = toViewDetail(raw);

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-5">
        <div className="my-1.5 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white"
          >
            <img src={ChevronLeftIcon} alt="" className="h-5 w-5" />
          </button>
          <h1 className="text-b24 text-[18px] text-gray100">계정 상세</h1>
        </div>

        <DetailHero detail={detail} />

        <RiskCard
          detail={detail}
          onActionClick={() => navigate(ROUTES.ACCOUNT_ACTION(accountId))}
        />

        <EventsList events={detail.events} />
      </div>
    </PageBackground>
  );
}

export default AccountDetail;

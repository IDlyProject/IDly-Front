// src/pages/AccountDetail/index.jsx
import { useNavigate, useParams } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import DetailHero from "./components/DetailHero";
import RiskCard from "./components/RiskCard";
import NewsCard from "./components/NewsCard";
import EventsList from "./components/EventsList";
import { getDetailByAccountId } from "./mockDetailData";
import { ROUTES } from "@/constants/routes";
import ChevronLeftIcon from "@/assets/ic_chevron_left.svg";

function AccountDetail() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const detail = getDetailByAccountId(accountId);

  if (!detail) {
    navigate(ROUTES.HOME, { replace: true });
    return null;
  }

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-5 pb-8 pt-[max(12px,env(safe-area-inset-top))]">
        <div className="mb-4 flex items-center gap-3 py-1.5">
          <button
            onClick={() => navigate(-1)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
          >
            <img src={ChevronLeftIcon} alt="" className="h-5 w-5" />
          </button>
          <h1 className="text-[18px] font-bold tracking-[-0.18px] text-[#212125]">
            계정 상세
          </h1>
        </div>

        <DetailHero detail={detail} />

        <RiskCard
          detail={detail}
          onActionClick={() => navigate(ROUTES.ACCOUNT_ACTION(accountId))}
        />

        <NewsCard text={detail.newsText} url={detail.newsUrl} />

        <EventsList events={detail.events} />
      </div>
    </PageBackground>
  );
}

export default AccountDetail;

// src/pages/AccountDetail/index.jsx
import { useNavigate, useParams } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import BottomNav from "@/components/layouts/BottomNav";
import DetailHero from "./components/DetailHero";
import SignalPanel from "./components/SignalPanel";
import ResponseCard from "./components/ResponseCard";
import { getDetailByAccountId } from "./mockDetailData";
import { ROUTES } from "@/constants/routes";

function AccountDetail() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const detail = getDetailByAccountId(accountId);

  if (!detail) {
    navigate(ROUTES.HOME, { replace: true });
    return null;
  }

  return (
    <PageBackground variant="default">
      <div className="min-h-dvh px-4 pb-[calc(96px+env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))]">
        <div className="mb-2 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-[#191f28]"
          >
            ‹
          </button>
          <h3 className="text-lg font-bold text-[#191f28]">
            {detail.name} 확인 필요
          </h3>
        </div>

        <DetailHero detail={detail} />
        <SignalPanel signals={detail.signals} />
        <ResponseCard
          desc={detail.responseDesc}
          steps={detail.responseSteps}
          onViewGuide={() => navigate(ROUTES.ACCOUNT_ACTION(accountId))}
        />
      </div>

      <BottomNav />
    </PageBackground>
  );
}

export default AccountDetail;

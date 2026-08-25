import { useLocation, useNavigate, useParams } from "react-router-dom";
import ActionButton from "@/components/ui/ActionButton";
import PageBackground from "@/components/layouts/PageBackground";
import { ROUTES } from "@/constants/routes";
import BackIcon from "@/assets/ic_back_white_20.svg";

const TERMS_CONTENT = {
  privacy: {
    title: "개인정보 수집·이용 동의",
    body: `IDly(이하 "회사")는 사전 등록 및 서비스 이용 안내를 위해
아래와 같이 개인정보를 수집·이용합니다.

1. 수집 항목: 이름, 휴대폰 번호, Gmail 주소
2. 수집 목적: 사전 등록 확인 및 서비스 이용 가능 안내
3. 보유 기간: 회원 가입 완료 시 즉시 삭제,
미가입 시 등록일로부터 1년 후 삭제

귀하는 위 동의를 거부할 권리가 있으며,
거부 시 사전 등록 서비스 이용이 제한됩니다.`,
  },
};

function TermsDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = useParams();
  const content = TERMS_CONTENT[type] ?? { title: "약관", body: "" };
  const formSnapshot = location.state?.formSnapshot;

  const handleBack = () => {
    navigate(ROUTES.ONBOARDING_PRE_REGISTER, {
      replace: true,
      state: { formSnapshot },
    });
  };

  const handleAgree = () => {
    navigate(ROUTES.ONBOARDING_PRE_REGISTER, {
      replace: true,
      state: { agreedTerm: type, formSnapshot },
    });
  };

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col pt-2.5 px-4 pb-8">
        <button
          onClick={handleBack}
          aria-label="뒤로가기"
          className="px-2 grid h-9 w-9 place-items-center rounded-full bg-main100"
        >
          <img src={BackIcon} alt="" className="h-5 w-5" />
        </button>

        <div className="flex flex-1 flex-col justify-center px-2 text-center">
          <h1 className="text-b24 text-gray100">{content.title}</h1>
          <p className="mt-2.5 whitespace-pre-line text-[15px] font-medium text-gray60">
            {content.body}
          </p>
        </div>

        <ActionButton
          bgColor="var(--color-main100)"
          textColor="var(--color-white)"
          onClick={handleAgree}
        >
          동의하기
        </ActionButton>
      </div>
    </PageBackground>
  );
}

export default TermsDetail;

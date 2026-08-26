import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActionButton from "@/components/ui/ActionButton";
import { API_BASE_URL } from "@/constants/api";
import { ROUTES } from "@/constants/routes";
import logo from "@/assets/ic_logo.svg";
import googleIcon from "@/assets/ic_google.svg";
import PageBackground from "@/components/layouts/PageBackground";
import { trackEvent } from "@/lib/ga";

const OAUTH_ERROR_MESSAGES = {
  gmail_already_linked: "이미 다른 계정에 연동되어 있는 Gmail이에요.",
  refresh_token_missing: "로그인 정보가 만료됐어요. 다시 로그인해 주세요.",
  invalid_oauth_state: "로그인 요청이 올바르지 않아요. 다시 시도해 주세요.",
  oauth_failed: "구글 로그인에 실패했어요. 다시 시도해 주세요.",
};
const DEFAULT_OAUTH_ERROR_MESSAGE =
  "로그인 중 문제가 발생했어요. 다시 시도해 주세요.";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("error");
  const errorMessage = errorCode
    ? (OAUTH_ERROR_MESSAGES[errorCode] ?? DEFAULT_OAUTH_ERROR_MESSAGE)
    : null;

  const handleGoogleLogin = () => {
    if (isLoading) return;
    setIsLoading(true);
    trackEvent("login_attempted");
    // refresh_token_missing은 Google이 refresh_token을 재발급하지 않은 상태라
    // reauth=true로 consent 화면을 강제로 띄워야 재발급받을 수 있다.
    const query = errorCode === "refresh_token_missing" ? "?reauth=true" : "";
    window.location.href = `${API_BASE_URL}/api/auth/google${query}`;
  };

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-4 pb-8">
        <div className="flex flex-1 flex-col items-center justify-center">
          <img src={logo} alt="IDly" className="w-auto h-22" />
          <h1 className="mt-5 text-center text-b24 text-gray100">
            안녕하세요
            <br />
            계정을 지키는 IDly입니다!
          </h1>
          <p className="mt-4 text-center text-[18px] font-bold text-gray60">
            계정 등록이 완료되셨나요?
            <br />
            아래 버튼을 눌러
            <br />
            IDly에서 사용할 대표 Gmail부터 연결해주세요!
          </p>
          <p className="mt-6 text-center text-[18px] font-bold text-gray60">
            대표 Gmail을 연결한 뒤
            <br />
            다른 Gmail 연동도 가능합니다.
          </p>
          <button
            type="button"
            onClick={() => navigate(ROUTES.ONBOARDING_PRE_REGISTER)}
            className="mt-6 text-[11px] font-semibold text-main100"
          >
            아직 계정을 등록하지 않으셨나요?
            <span className="underline pl-0.5">등록하러 가기</span>
          </button>
        </div>
        {errorMessage && (
          <div className="mb-3 rounded-xl bg-danger50/10 px-4 py-3 text-center text-r14 text-danger50">
            {errorMessage}
          </div>
        )}
        <ActionButton
          bgColor="var(--color-white)"
          textColor="var(--color-gray100)"
          bordered
          borderColor="var(--color-gray20)"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="flex items-center justify-center gap-2.5 shadow-[0_4px_14px_0_rgba(16,24,46,0.06)]"
        >
          <img src={googleIcon} alt="" className="h-6 w-6" />
          {isLoading ? "연결 중..." : "Gmail로 시작하기"}
        </ActionButton>
      </div>
    </PageBackground>
  );
}

export default Login;

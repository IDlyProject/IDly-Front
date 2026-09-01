import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { fetchCurrentUser } from "@/services/authService";
import { WAITLIST_STORAGE_KEYS } from "@/constants/waitlist";
import { setTokens } from "@/lib/api";
import { trackEvent } from "@/lib/ga";
import { linkUserPush } from "@/services/pushService";

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      trackEvent("login_failed", { error_code: error });
      navigate(`${ROUTES.ONBOARDING_LOGIN}?error=${encodeURIComponent(error)}`, {
        replace: true,
      });
      return;
    }


    // iOS Safari 등 SameSite=None 쿠키가 차단되는 환경에서는 idly_token/idly_refresh
    // 쿠키 대신 리다이렉트 URL의 at/rt 파라미터로 인증을 이어간다.
    const accessToken = searchParams.get("at");
    const refreshToken = searchParams.get("rt");
    if (accessToken || refreshToken) {
      setTokens({ accessToken, refreshToken });
      window.history.replaceState(null, "", window.location.pathname);
    }

    const mode = searchParams.get("mode");

    fetchCurrentUser().then((user) => {
      if (!user) {
        navigate(ROUTES.ONBOARDING_LOGIN, { replace: true });
        return;
      }

      localStorage.removeItem(WAITLIST_STORAGE_KEYS.PHONE);
      localStorage.removeItem(WAITLIST_STORAGE_KEYS.APPROVED);
      trackEvent("login_succeeded", { mode: mode ?? "unknown" });
      linkUserPush().catch(() => {});

      if (mode === "add") {
        navigate(ROUTES.ONBOARDING_ADD_MAILBOXES, { replace: true });
        return;
      }

      if (mode === "login") {
        // 어느 온보딩 단계로 보낼지는 Splash 한 곳에서만 판단한다(중복 로직
        // 방지). Splash는 onboardingCompleted와 로컬에 저장된 마지막 단계까지
        // 고려하므로, 여기서 requiredTermsAgreed/nickname만 보고 HOME으로
        // 보내면 분석 전 단계를 건너뛰는 문제가 생긴다.
        navigate(ROUTES.SPLASH, { replace: true });
        return;
      }

      navigate(ROUTES.ONBOARDING_LOGIN, { replace: true });
    });
  }, [searchParams, navigate]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f2f4f6]">
      <p className="text-sm font-bold text-[#6b7684]">로그인 처리 중...</p>
    </div>
  );
}

export default AuthCallback;

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { fetchCurrentUser } from "@/services/authService";
import { WAITLIST_STORAGE_KEYS } from "@/constants/waitlist";
import { setTokens } from "@/lib/api";
import { trackEvent } from "@/lib/ga";
import { linkUserPush } from "@/services/pushService";
import axiosInstance from "@/lib/api/axiosInstance";

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

    // iOS Safari 등 SameSite=None 쿠키가 차단되는 환경을 위한 one-time code 교환.
    // URL에 실제 토큰 대신 1분 수명의 code를 담아 전달받고, 여기서 교환한다.
    const code = searchParams.get("code");
    window.history.replaceState(null, "", window.location.pathname);

    const exchangeAndProceed = async () => {
      let resolvedMode = searchParams.get("mode");
      if (code) {
        try {
          const { data } = await axiosInstance.post("/auth/exchange", { code });
          setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
          resolvedMode = data.mode ?? resolvedMode;
        } catch {
          navigate(`${ROUTES.ONBOARDING_LOGIN}?error=exchange_failed`, { replace: true });
          return;
        }
      }

      const mode = resolvedMode;

      const user = await fetchCurrentUser();
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
        navigate(ROUTES.SPLASH, { replace: true });
        return;
      }

      navigate(ROUTES.ONBOARDING_LOGIN, { replace: true });
    };

    exchangeAndProceed();
  }, [searchParams, navigate]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f2f4f6]">
      <p className="text-sm font-bold text-[#6b7684]">로그인 처리 중...</p>
    </div>
  );
}

export default AuthCallback;

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { fetchCurrentUser } from "@/services/authService";
import { WAITLIST_STORAGE_KEYS } from "@/constants/waitlist";
import { setTokens } from "@/lib/api";

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {

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

      if (mode === "add") {
        navigate(ROUTES.ONBOARDING_ADD_MAILBOXES, { replace: true });
        return;
      }

      if (mode === "login") {
        if (!user.requiredTermsAgreed) {
          navigate(ROUTES.ONBOARDING_CONSENT, { replace: true });
        } else if (!user.nickname) {
          navigate(ROUTES.ONBOARDING_PROFILE, { replace: true });
        } else {
          navigate(ROUTES.HOME, { replace: true });
        }
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

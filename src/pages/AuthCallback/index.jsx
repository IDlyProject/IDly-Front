import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { fetchCurrentUser } from "@/api/auth";

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


    const mode = searchParams.get("mode");

    fetchCurrentUser().then((user) => {
      if (!user) {
        navigate(ROUTES.ONBOARDING_LOGIN, { replace: true });
        return;
      }

      if (mode === "add") {
        navigate(ROUTES.ONBOARDING_ADD_ACCOUNT, { replace: true });
        return;
      }

      if (mode === "login") {
        if (user.requiredTermsAgreed) {
          navigate(ROUTES.HOME, { replace: true });
        } else {
          navigate(ROUTES.ONBOARDING_CONSENT, { replace: true });
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

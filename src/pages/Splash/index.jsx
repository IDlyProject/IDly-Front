import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { fetchCurrentUser } from "@/services/authService";
import {
  getWaitlistStatus,
  verifyWaitlistToken,
} from "@/services/waitlistService";
import { WAITLIST_STORAGE_KEYS } from "@/constants/waitlist";
import InstallPromptModal, {
  getInstallReminderView,
} from "@/pages/Onboarding/PreRegister/components/InstallPromptModal";
import typoLogo from "@/assets/ic_typo_logo_white.svg";
import PageBackground from "@/components/layouts/PageBackground";

const MIN_DISPLAY_TIME = 1200;

function Splash() {
  const [dest, setDest] = useState(null);
  // 대기자 등록을 마친 사용자(승인/미승인 모두)가 재방문했을 때만 홈 화면
  // 추가·알림 권한 안내로 화면 전환을 붙잡아둔다. 그 외 목적지는 그대로 진행.
  const [gateWithReminder, setGateWithReminder] = useState(false);
  const [reminderResolved, setReminderResolved] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const startTime = Date.now();

    const goTo = (destination, { gate = false } = {}) => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(MIN_DISPLAY_TIME - elapsed, 0);
      setTimeout(() => {
        setDest(destination);
        setGateWithReminder(gate);
      }, remaining);
    };

    const resolveWaitlistEntry = async () => {
      const token = searchParams.get("token");
      if (token) {
        try {
          const { approved } = await verifyWaitlistToken(token);
          if (approved) {
            localStorage.setItem(WAITLIST_STORAGE_KEYS.APPROVED, "true");
            goTo(ROUTES.ONBOARDING_LOGIN, { gate: true });
            return;
          }
        } catch {
          // expired/invalid token → fall through to registration
        }
        goTo(ROUTES.ONBOARDING_PRE_REGISTER);
        return;
      }

      if (localStorage.getItem(WAITLIST_STORAGE_KEYS.APPROVED) === "true") {
        goTo(ROUTES.ONBOARDING_LOGIN, { gate: true });
        return;
      }

      const phone = localStorage.getItem(WAITLIST_STORAGE_KEYS.PHONE);
      if (phone) {
        try {
          const { status } = await getWaitlistStatus(phone);
          if (status === "approved") {
            localStorage.setItem(WAITLIST_STORAGE_KEYS.APPROVED, "true");
            goTo(ROUTES.ONBOARDING_LOGIN, { gate: true });
          } else if (status === "not_found") {
            localStorage.removeItem(WAITLIST_STORAGE_KEYS.PHONE);
            goTo(ROUTES.ONBOARDING_PRE_REGISTER);
          } else {
            goTo(ROUTES.ONBOARDING_PRE_REGISTER_COMPLETE, { gate: true });
          }
        } catch {
          // status API 실패 → 대기 화면 유지 (재시도 안내)
          goTo(ROUTES.ONBOARDING_PRE_REGISTER_COMPLETE, { gate: true });
        }
        return;
      }

      goTo(ROUTES.ONBOARDING_PRE_REGISTER);
    };

    fetchCurrentUser()
      .then((user) => {
        if (!user) {
          resolveWaitlistEntry();
          return;
        }

        if (user.requiredTermsAgreed === false || user.requiredTermsAgreed == null) {
          goTo(ROUTES.ONBOARDING_CONSENT, { gate: true });
          return;
        }
        if (!user.nickname) {
          goTo(ROUTES.ONBOARDING_PROFILE, { gate: true });
          return;
        }
        // 최초 분석이 끝나기 전까지는 재접속해도 분석 화면부터 재진행한다.
        // 분석 완료 시 Analyzing 화면이 onboardingCompleted를 true로 저장한다.
        if (!user.onboardingCompleted) {
          goTo(ROUTES.ANALYZING, { gate: true });
          return;
        }
        goTo(ROUTES.HOME, { gate: true });
      })
      .catch((error) => {
        console.error("Failed to fetch current user:", error);
        resolveWaitlistEntry();
      });
  }, [searchParams]);

  const reminderView = gateWithReminder ? getInstallReminderView() : null;
  const blocked = gateWithReminder && !!reminderView && !reminderResolved;

  if (dest && !blocked) {
    return <Navigate to={dest} replace />;
  }

  return (
    <PageBackground variant="splash">
      <div className="flex min-h-dvh flex-col items-center justify-center bg-main100 px-8">
        <div className="flex flex-1 flex-col items-center justify-center">
          <img src={typoLogo} alt="IDly" />
          <p className="mt-5 text-r16 text-white/60">
            이메일로 확인하는 나의 모든 계정
          </p>
        </div>

        <p className="pb-12 text-r14 text-[12px] text-white/26">
          © 2026 계정아파트
        </p>
      </div>
      {blocked && (
        <InstallPromptModal
          initialView={reminderView}
          name={localStorage.getItem(WAITLIST_STORAGE_KEYS.NAME)}
          phone={localStorage.getItem(WAITLIST_STORAGE_KEYS.PHONE)}
          onClose={() => setReminderResolved(true)}
        />
      )}
    </PageBackground>
  );
}

export default Splash;

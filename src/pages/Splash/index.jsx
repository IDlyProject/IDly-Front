import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { fetchCurrentUser } from "@/services/authService";
import {
  getWaitlistStatus,
  verifyWaitlistToken,
} from "@/services/waitlistService";
import { WAITLIST_STORAGE_KEYS } from "@/constants/waitlist";
import {
  ONBOARDING_STEP_STORAGE_KEY,
  RESUMABLE_ONBOARDING_STEPS,
} from "@/constants/onboarding";
import InstallPromptModal, {
  getInstallReminderView,
} from "@/pages/Onboarding/PreRegister/components/InstallPromptModal";
import { isStandalone } from "@/hooks/useInstallPrompt";
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

  // 전화번호 하나로 "이 사람이 어느 화면으로 가야 하는가"를 판단하는 로직.
  // resolveWaitlistEntry(최초 진입)와 handleIdentify(iOS PWA 재입력 후) 양쪽에서 쓴다.
  const resolveDestinationForPhone = async (phone) => {
    try {
      const { status } = await getWaitlistStatus(phone);
      if (status === "approved") {
        localStorage.setItem(WAITLIST_STORAGE_KEYS.APPROVED, "true");
        return ROUTES.ONBOARDING_LOGIN;
      }
      if (status === "not_found") {
        localStorage.removeItem(WAITLIST_STORAGE_KEYS.PHONE);
        return ROUTES.ONBOARDING_PRE_REGISTER;
      }
      return ROUTES.ONBOARDING_PRE_REGISTER_COMPLETE;
    } catch {
      // status API 실패 → 대기 화면 유지 (재시도 안내)
      return ROUTES.ONBOARDING_PRE_REGISTER_COMPLETE;
    }
  };

  // iOS PWA에서 로컬에 전화번호가 없어 InstallPromptModal의 IDENTIFY 화면으로
  // 재입력받은 경우, 그 번호가 서버에 이미 등록돼 있으면 빈 등록 폼이 아니라
  // 승인 상태에 맞는 화면으로 보내야 한다. 모달이 닫힐 때 쓸 목적지를 갱신한다.
  const handleIdentify = async (phone) => {
    const nextDest = await resolveDestinationForPhone(phone);
    setDest(nextDest);
  };

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
        goTo(ROUTES.ONBOARDING_PRE_REGISTER, { gate: isStandalone() });
        return;
      }

      if (localStorage.getItem(WAITLIST_STORAGE_KEYS.APPROVED) === "true") {
        goTo(ROUTES.ONBOARDING_LOGIN, { gate: true });
        return;
      }

      const phone = localStorage.getItem(WAITLIST_STORAGE_KEYS.PHONE);
      if (phone) {
        const nextDest = await resolveDestinationForPhone(phone);
        goTo(nextDest, { gate: nextDest !== ROUTES.ONBOARDING_PRE_REGISTER });
        return;
      }

      // iOS는 Safari와 PWA(홈 화면 앱)의 localStorage가 분리돼 있어, Safari에서
      // 등록한 뒤 PWA로 처음 열면 여기로 떨어진다. standalone이면 gate를 걸어
      // InstallPromptModal(이름/전화번호 재입력 → 알림 동의)을 띄운다. 재입력된
      // 번호로 어디로 보낼지는 handleIdentify가 dest를 갱신해서 처리한다.
      goTo(ROUTES.ONBOARDING_PRE_REGISTER, { gate: isStandalone() });
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
        // 최초 분석이 끝나기 전까지는 재접속해도 이어서 재진행한다.
        // 분석 완료 시 Analyzing 화면이 onboardingCompleted를 true로 저장한다.
        if (!user.onboardingCompleted) {
          // PrimaryComplete/AddMailboxes/FullComplete는 서버에 흔적을 남기지
          // 않으므로, 이 구간에서 이탈했다면 로컬에 저장해둔 마지막 화면부터
          // 재개한다. 저장된 게 없으면(새 기기 등) Analyzing으로 건너뛰지
          // 말고 이 구간의 시작점(PrimaryComplete)부터 다시 거치게 한다 —
          // 그래야 메일함 추가 같은 단계를 건너뛴 채 분석이 시작되지 않는다.
          const savedStep = localStorage.getItem(ONBOARDING_STEP_STORAGE_KEY);
          if (RESUMABLE_ONBOARDING_STEPS.includes(savedStep)) {
            goTo(savedStep, { gate: true });
            return;
          }
          goTo(ROUTES.ONBOARDING_PRIMARY_COMPLETE, { gate: true });
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
          onIdentify={handleIdentify}
          onClose={() => setReminderResolved(true)}
        />
      )}
    </PageBackground>
  );
}

export default Splash;

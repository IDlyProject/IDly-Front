import { ROUTES } from "@/constants/routes";

export const ONBOARDING_STEP_STORAGE_KEY = "onboarding_step";

// onboardingCompleted가 true가 되기 전까지, 서버에 진행 상태를 남기지 않는
// 화면들. 사용자가 이 구간에서 이탈했다가 같은 기기로 재접속하면 처음부터
// 다시 하지 않고 마지막 화면부터 재개한다.
export const RESUMABLE_ONBOARDING_STEPS = [
  ROUTES.ONBOARDING_PRIMARY_COMPLETE,
  ROUTES.ONBOARDING_ADD_MAILBOXES,
  ROUTES.ONBOARDING_FULL_COMPLETE,
  ROUTES.ANALYZING,
];

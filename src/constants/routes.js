// src/constants/routes.js
export const ROUTES = {
  SPLASH: "/",

  ONBOARDING_LOGIN: "/onboarding/login",
  ONBOARDING_CONSENT: "/onboarding/consent",
  ONBOARDING_ACCOUNT_CONFIRM: "/onboarding/account-confirm",
  ONBOARDING_ACCOUNT_COMPLETE: "/onboarding/account-complete",
  ONBOARDING_ADD_ACCOUNT: "/onboarding/add-account",
  ONBOARDING_COMPLETE: "/onboarding/complete",

  ANALYSIS: "/analysis",

  HOME: "/home",
  ORGANIZE: "/organize",
  MY: "/my",

  // 특정 서비스 계정(Disney+ 등)의 문제 상세/대응 - id가 필수
  ACCOUNT_DETAIL: (id) => `/account/${id}`,
  ACCOUNT_ACTION: (id) => `/account/${id}/action`,
};

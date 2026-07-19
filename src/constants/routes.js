export const ROUTES = {
  SPLASH: "/",
  AUTH_CALLBACK: "/auth/callback",
  ONBOARDING_LOGIN: "/onboarding/login",
  ONBOARDING_CONSENT: "/onboarding/consent",
  ONBOARDING_ACCOUNT_CONFIRM: "/onboarding/account-confirm",
  ONBOARDING_ACCOUNT_COMPLETE: "/onboarding/account-complete",
  ONBOARDING_ADD_ACCOUNT: "/onboarding/add-account",
  ONBOARDING_COMPLETE: "/onboarding/complete",

  ANALYSIS: "/analysis",

  HOME: "/home",
  NOTIFICATION: "/notifications",
  ACCOUNT_DETAIL: (id) => `/account/${id}`,
  ACCOUNT_ACTION: (id) => `/account/${id}/action`,
  SECURITY_REPORT: "/security-report",
  SECURITY_ASSISTANT: "/security-report/assistant",

  ORGANIZE: "/organize",

  MY: "/my",
  ACCOUNT_MANAGEMENT: "/my/account",
  DORMANT_ACCOUNTS: "/my/dormant",
  NOTIFICATION_SETTINGS: "/my/notification-settings",
  WITHDRAW: "/my/withdraw",
  WITHDRAW_REASON: "/my/withdraw/reason",
};

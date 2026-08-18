export const ROUTES = {
  SPLASH: "/",
  AUTH_CALLBACK: "/auth/callback",
  ONBOARDING_LOGIN: "/onboarding/login",
  ONBOARDING_PRE_REGISTER: "/onboarding/pre-register",
  ONBOARDING_PRE_REGISTER_TERMS: (type) =>
    `/onboarding/pre-register/terms/${type}`,
  ONBOARDING_PRE_REGISTER_COMPLETE: "/onboarding/pre-register/complete",
  ONBOARDING_CONSENT: "/onboarding/consent",
  ONBOARDING_PROFILE: "/onboarding/profile",
  ONBOARDING_PRIMARY_COMPLETE: "/onboarding/primary-complete",
  ONBOARDING_ADD_MAILBOXES: "/onboarding/add-mailboxes",
  ONBOARDING_FULL_COMPLETE: "/onboarding/full-complete",

  ANALYZING: "/analyzing",

  HOME: "/home",
  ACCOUNT_DETAIL: (id) => `/account/${id}`,
  ACCOUNT_ACTION: (id) => `/account/${id}/action`,
  SECURITY_ASSISTANT: "/security-assistant",

  MY: "/my",
  ACCOUNT_MANAGEMENT: "/my/account",
  DORMANT_ACCOUNTS: "/my/dormant",
  NOTIFICATION_SETTINGS: "/my/notification-settings",
  WITHDRAW: "/my/withdraw",
  WITHDRAW_REASON: "/my/withdraw/reason",
};

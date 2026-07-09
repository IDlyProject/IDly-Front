// src/utils/mailAccount.js
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#3b6cff,#5b7dff)",
  "linear-gradient(135deg,#16b886,#0da87c)",
  "linear-gradient(135deg,#ff9f43,#ffb976)",
  "linear-gradient(135deg,#a06cff,#c48bff)",
];

// gmailAccounts[] (UserDto) 를 화면에 뿌릴 형태로 변환
export function toMailAccount(gmailAccount, index) {
  return {
    id: gmailAccount.id,
    email: gmailAccount.email,
    linkedCount: gmailAccount.serviceAccounts?.length ?? 0,
    isPrimary: gmailAccount.isPrimary,
    avatarBg: gmailAccount.isPrimary
      ? AVATAR_GRADIENTS[0]
      : AVATAR_GRADIENTS[(index % (AVATAR_GRADIENTS.length - 1)) + 1],
    avatarLabel: gmailAccount.email[0]?.toUpperCase() ?? "?",
  };
}

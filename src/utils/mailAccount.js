import {
  PALETTE_GRADIENTS,
  getGradientByIndexReservingPrimary,
} from "./palette";

export function toMailAccount(gmailAccount, index) {
  return {
    id: gmailAccount.id,
    email: gmailAccount.email,
    linkedCount: gmailAccount.serviceAccounts?.length ?? 0,
    isPrimary: gmailAccount.isPrimary,
    avatarBg: gmailAccount.isPrimary
      ? PALETTE_GRADIENTS[0]
      : getGradientByIndexReservingPrimary(index),
    avatarLabel: gmailAccount.email[0]?.toUpperCase() ?? "?",
  };
}

// src/api/users.js
import { apiFetch } from "@/api/client";

export async function updateProfile(payload) {
  const res = await apiFetch("/api/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`profile update failed: ${res.status}`);
  return res.json(); // UserProfileDto
}

export async function saveConsent(payload) {
  const res = await apiFetch("/api/users/me/consent", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`save consent failed: ${res.status}`);
  return res.json();
}

export async function getAccounts() {
  const res = await apiFetch("/api/users/me/accounts");

  if (!res.ok) throw new Error(`get accounts failed: ${res.status}`);
  return res.json(); // GmailAccountDto[]
}

// 400: 대표 계정은 해제 불가, 404: 본인 소유가 아닌 계정
export async function disconnectAccount(accountId) {
  const res = await apiFetch(`/api/users/me/accounts/${accountId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = new Error(`disconnect account failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json(); // { disconnectedAccountId, connectedAccountCount }
}

// reason: "not_frequent"|"frequent_errors"|"inconvenient"|"other"
// reasonDetail: reason이 "other"일 때만 필수, 최대 500자
export async function deleteAccount({ reason, reasonDetail }) {
  const res = await apiFetch("/api/users/me", {
    method: "DELETE",
    body: JSON.stringify(
      reasonDetail ? { reason, reasonDetail } : { reason },
    ),
  });

  if (!res.ok) throw new Error(`delete account failed: ${res.status}`);
  return res.json(); // { deleted: true }
}

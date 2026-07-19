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

// src/api/users.js
import { apiFetch } from "@/api/client";

export async function updateProfile(payload) {
  const res = await apiFetch("/api/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`profile update failed: ${res.status}`);
  return res.json(); // UserDto
}

export async function saveConsent(payload) {
  const res = await apiFetch("/api/users/me/consent", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`consent save failed: ${res.status}`);
  return res.json();
}

export async function deleteAccount(payload) {
  const res = await apiFetch("/api/users/me", {
    method: "DELETE",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`delete account failed: ${res.status}`);
  return res.json();
}

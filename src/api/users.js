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

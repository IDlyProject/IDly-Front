// src/api/users.js
import { API_BASE_URL } from "@/constants/api";

export async function updateProfile(payload) {
  const res = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`profile update failed: ${res.status}`);
  return res.json(); // UserDto
}

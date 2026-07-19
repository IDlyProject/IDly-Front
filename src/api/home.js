// src/api/home.js
import { apiFetch } from "@/api/client";

// mailAccountId 생략 시 전체 계정 대상
export async function getHome(mailAccountId) {
  const query = mailAccountId
    ? `?mailAccountId=${encodeURIComponent(mailAccountId)}`
    : "";
  const res = await apiFetch(`/api/home${query}`);

  if (!res.ok) throw new Error(`get home failed: ${res.status}`);
  return res.json(); // HomeResponseDto
}

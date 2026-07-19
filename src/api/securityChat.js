// src/api/securityChat.js
import { apiFetch } from "@/api/client";

// 응답 스키마가 문서화되어 있지 않아, 빈 바디도 있을 수 있다고 보고 방어적으로 파싱
export async function getSecurityChat() {
  const res = await apiFetch("/api/security-chat");
  if (!res.ok) throw new Error(`get security chat failed: ${res.status}`);

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// 400: 민감정보 입력, 429: 분당 10회 제한 초과 — 호출부에서 err.status로 구분해서 안내
export async function sendSecurityChatMessage(message) {
  const res = await apiFetch("/api/security-chat/messages", {
    method: "POST",
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const err = new Error(`send security chat message failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

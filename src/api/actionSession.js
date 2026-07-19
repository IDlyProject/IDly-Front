// src/api/actionSession.js
import { apiFetch } from "@/api/client";

// active 세션이 있으면 현재 대화 상태를, 없으면 null을 반환
export async function getActionSession(serviceAccountId) {
  const res = await apiFetch(
    `/api/service-accounts/${serviceAccountId}/action-session`,
  );

  // 문서상 "세션 없음"은 200 + null 이지만, 실제로는 바디가 완전히 빈 채로 오기도 함.
  // 404로 내려오는 경우까지 포함해서 전부 "세션 없음"으로 처리.
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`get action session failed: ${res.status}`);

  const text = await res.text();
  if (!text) return null;
  return JSON.parse(text); // ActionSessionDto | null
}

// active 세션이 있으면 idempotent하게 반환, 없으면 새로 시작
export async function createActionSession(
  serviceAccountId,
  bootstrapFirstAction = true,
) {
  const res = await apiFetch(
    `/api/service-accounts/${serviceAccountId}/action-session`,
    {
      method: "POST",
      body: JSON.stringify({ bootstrapFirstAction }),
    },
  );

  if (!res.ok) throw new Error(`create action session failed: ${res.status}`);
  return res.json(); // ActionSessionDto
}

// payload: { sessionId, type: "action_select"|"feedback"|"failure_reason", ...type별 필드 }
export async function sendActionSessionMessage(serviceAccountId, payload) {
  const res = await apiFetch(
    `/api/service-accounts/${serviceAccountId}/action-session/messages`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    throw new Error(`send action session message failed: ${res.status}`);
  }
  return res.json(); // { ...updatedSessionFields, userMessage, assistantMessages, recommendedActions, completion }
}

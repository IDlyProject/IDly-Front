// src/api/actionSession.js
import { apiFetch } from "@/api/client";

// active 세션이 있으면 현재 대화 상태를, 없으면 null을 반환
export async function getActionSession(serviceAccountId) {
  const res = await apiFetch(
    `/api/service-accounts/${serviceAccountId}/action-session`,
  );

  if (!res.ok) throw new Error(`get action session failed: ${res.status}`);
  return res.json(); // ActionSessionDto | null
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

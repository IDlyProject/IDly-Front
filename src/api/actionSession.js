import { apiFetch } from "@/api/client";

export async function getActionSession(serviceAccountId) {
  const res = await apiFetch(
    `/api/service-accounts/${serviceAccountId}/action-session`,
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`get action session failed: ${res.status}`);

  const text = await res.text();
  if (!text) return null;
  return JSON.parse(text);
}

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
  return res.json();
}

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
  return res.json();
}

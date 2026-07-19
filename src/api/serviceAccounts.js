import { apiFetch } from "@/api/client";

export async function getServiceAccountDetail(serviceAccountId) {
  const res = await apiFetch(`/api/service-accounts/${serviceAccountId}`);

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`get service account detail failed: ${res.status}`);
  }
  return res.json();
}

export async function setServiceAccountDormant(serviceAccountId) {
  const res = await apiFetch(`/api/service-accounts/${serviceAccountId}/dormant`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error(`set dormant failed: ${res.status}`);
  return res.json();
}

export async function restoreServiceAccountDormant(serviceAccountId) {
  const res = await apiFetch(`/api/service-accounts/${serviceAccountId}/restore`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error(`restore dormant failed: ${res.status}`);
  return res.json();
}

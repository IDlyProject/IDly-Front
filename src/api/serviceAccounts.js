// src/api/serviceAccounts.js
import { apiFetch } from "@/api/client";

export async function getServiceAccountDetail(serviceAccountId) {
  const res = await apiFetch(`/api/service-accounts/${serviceAccountId}`);

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`get service account detail failed: ${res.status}`);
  }
  return res.json(); // ServiceAccountDetailDto
}

// 홈 화면 능동 모니터링에서 제외하고 휴면 계정으로 전환
export async function setServiceAccountDormant(serviceAccountId) {
  const res = await apiFetch(`/api/service-accounts/${serviceAccountId}/dormant`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error(`set dormant failed: ${res.status}`);
  return res.json(); // { serviceAccountId, status }
}

// 휴면 계정을 개별로 능동 모니터링에 복원
export async function restoreServiceAccountDormant(serviceAccountId) {
  const res = await apiFetch(`/api/service-accounts/${serviceAccountId}/restore`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error(`restore dormant failed: ${res.status}`);
  return res.json();
}

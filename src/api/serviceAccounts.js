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

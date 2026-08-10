import { axiosInstance } from "@/lib/api";

export async function getActionSession(serviceAccountId) {
  try {
    const { data } = await axiosInstance.get(
      `/api/service-accounts/${serviceAccountId}/action-session`,
    );
    return data || null;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

export async function createActionSession(
  serviceAccountId,
  bootstrapFirstAction = false,
) {
  const { data } = await axiosInstance.post(
    `/api/service-accounts/${serviceAccountId}/action-session`,
    { bootstrapFirstAction },
  );
  return data;
}

export async function sendActionSessionMessage(serviceAccountId, payload) {
  const { data } = await axiosInstance.post(
    `/api/service-accounts/${serviceAccountId}/action-session/messages`,
    payload,
  );
  return data;
}

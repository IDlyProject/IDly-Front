import { axiosInstance } from "@/lib/api";

export async function getServiceAccountDetail(serviceAccountId) {
  try {
    const { data } = await axiosInstance.get(
      `/api/service-accounts/${serviceAccountId}`,
    );
    return data;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

export async function setServiceAccountDormant(serviceAccountId) {
  const { data } = await axiosInstance.patch(
    `/api/service-accounts/${serviceAccountId}/dormant`,
  );
  return data;
}

export async function restoreServiceAccountDormant(serviceAccountId) {
  const { data } = await axiosInstance.patch(
    `/api/service-accounts/${serviceAccountId}/restore`,
  );
  return data;
}

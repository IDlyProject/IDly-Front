import { axiosInstance } from "@/lib/api";

export async function triggerAnalysisRun(mailAccountIds) {
  const { data } = await axiosInstance.post(
    "/api/analysis/start",
    mailAccountIds ? { mailAccountIds } : {},
  );
  return data;
}

export async function fetchRunStatus(analysisId) {
  const { data } = await axiosInstance.get(
    `/api/analysis/${analysisId}/status`,
  );
  return data;
}

export async function waitForAnalysisCompletion(
  analysisId,
  intervalMs = 1200,
) {
  const statusRes = await fetchRunStatus(analysisId);

  if (statusRes.status === "completed") return statusRes;
  if (statusRes.status === "failed") {
    throw new Error(statusRes.errorMessage || "analysis failed");
  }

  await new Promise((resolve) => setTimeout(resolve, intervalMs));
  return waitForAnalysisCompletion(analysisId, intervalMs);
}

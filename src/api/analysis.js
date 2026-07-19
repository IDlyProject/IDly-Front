import { apiFetch } from "@/api/client";


export async function triggerAnalysisRun(mailAccountIds) {
  const res = await apiFetch("/api/analysis/start", {
    method: "POST",
    body: JSON.stringify(mailAccountIds ? { mailAccountIds } : {}),
  });

  if (!res.ok) throw new Error(`analysis start failed: ${res.status}`);
  return res.json();
}

export async function fetchRunStatus(analysisId) {
  const res = await apiFetch(`/api/analysis/${analysisId}/status`);

  if (!res.ok) throw new Error(`analysis status fetch failed: ${res.status}`);
  return res.json();
}


export async function waitForAnalysisCompletion(analysisId, intervalMs = 1200) {
  const statusRes = await fetchRunStatus(analysisId);

  if (statusRes.status === "completed") return statusRes;
  if (statusRes.status === "failed") {
    throw new Error(statusRes.errorMessage || "analysis failed");
  }

  await new Promise((resolve) => setTimeout(resolve, intervalMs));
  return waitForAnalysisCompletion(analysisId, intervalMs);
}

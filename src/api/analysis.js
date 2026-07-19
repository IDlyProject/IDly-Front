// src/api/analysis.js
import { apiFetch } from "@/api/client";

// mailAccountIds 생략 시 전체 Gmail 계정을 대상으로 분석
export async function triggerAnalysisRun(mailAccountIds) {
  const res = await apiFetch("/api/analysis/start", {
    method: "POST",
    body: JSON.stringify(mailAccountIds ? { mailAccountIds } : {}),
  });

  if (!res.ok) throw new Error(`analysis start failed: ${res.status}`);
  return res.json(); // StartAnalysisResponseDto
}

export async function fetchRunStatus(analysisId) {
  const res = await apiFetch(`/api/analysis/${analysisId}/status`);

  if (!res.ok) throw new Error(`analysis status fetch failed: ${res.status}`);
  return res.json(); // AnalysisStatusResponseDto
}

// completed/failed가 될 때까지 getStatus를 폴링. 진행률 UI가 필요 없는
// (pull-to-refresh 같은) 호출부를 위한 헬퍼 — 세부 진행률이 필요하면 fetchRunStatus를 직접 폴링할 것
export async function waitForAnalysisCompletion(analysisId, intervalMs = 1200) {
  const statusRes = await fetchRunStatus(analysisId);

  if (statusRes.status === "completed") return statusRes;
  if (statusRes.status === "failed") {
    throw new Error(statusRes.errorMessage || "analysis failed");
  }

  await new Promise((resolve) => setTimeout(resolve, intervalMs));
  return waitForAnalysisCompletion(analysisId, intervalMs);
}

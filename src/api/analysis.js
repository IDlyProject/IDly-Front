// src/api/analysis.js
import { apiFetch } from "@/api/client";

export async function triggerAnalysisRun() {
  // 실제 엔드포인트: POST /api/analysis/start
  const res = await apiFetch("/api/analysis/start", {
    method: "POST",
  });

  if (!res.ok) throw new Error(`analysis start failed: ${res.status}`);
  return res.json(); // { analysisId, ... }
}

export async function fetchRunStatus(analysisId) {
  const res = await apiFetch(`/api/analysis/${analysisId}/status`);

  if (!res.ok) throw new Error(`analysis status fetch failed: ${res.status}`);
  return res.json();
}

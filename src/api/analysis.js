// src/api/analysis.js
import { API_BASE_URL } from "@/constants/api";

export async function triggerAnalysisRun() {
  const res = await fetch(`${API_BASE_URL}/api/analysis/trigger`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`analysis trigger failed: ${res.status}`);
  return res.json(); // { runId }
}

export async function fetchRunStatus(runId) {
  const res = await fetch(`${API_BASE_URL}/api/analysis/runs/${runId}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error(`analysis status fetch failed: ${res.status}`);
  return res.json(); // { id, userId, status, startedAt, completedAt }
}

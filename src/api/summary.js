// src/api/summary.js
import { apiFetch } from "@/api/client";

export async function getSummary() {
  const res = await apiFetch("/api/summary");

  if (!res.ok) throw new Error(`get summary failed: ${res.status}`);
  return res.json(); // SummaryDto
}

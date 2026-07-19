import { apiFetch } from "@/api/client";

export async function getSecurityReport() {
  const res = await apiFetch("/api/report");

  if (!res.ok) throw new Error(`get security report failed: ${res.status}`);
  return res.json();
}

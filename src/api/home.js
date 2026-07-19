import { apiFetch } from "@/api/client";

export async function getHome(mailAccountId) {
  const query = mailAccountId
    ? `?mailAccountId=${encodeURIComponent(mailAccountId)}`
    : "";
  const res = await apiFetch(`/api/home${query}`);

  if (!res.ok) throw new Error(`get home failed: ${res.status}`);
  return res.json();
}

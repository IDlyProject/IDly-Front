// src/api/dormantAccounts.js
import { apiFetch } from "@/api/client";

export async function getDormantAccounts() {
  const res = await apiFetch("/api/users/me/dormant-accounts");

  if (!res.ok) throw new Error(`get dormant accounts failed: ${res.status}`);
  return res.json(); // DormantAccountDto[]
}

export async function restoreAllDormant() {
  const res = await apiFetch("/api/users/me/dormant-accounts/restore-all", {
    method: "PATCH",
  });

  if (!res.ok) throw new Error(`restore all dormant failed: ${res.status}`);
  return res.json(); // { restoredCount }
}

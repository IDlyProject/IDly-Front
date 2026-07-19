import { apiFetch } from "@/api/client";

export async function getSecurityChat() {
  const res = await apiFetch("/api/security-chat");
  if (!res.ok) throw new Error(`get security chat failed: ${res.status}`);

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function sendSecurityChatMessage(message) {
  const res = await apiFetch("/api/security-chat/messages", {
    method: "POST",
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const err = new Error(`send security chat message failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

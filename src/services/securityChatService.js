import { axiosInstance } from "@/lib/api";

export async function startSecurityChatSession() {
  const { data } = await axiosInstance.post("/api/security-chat/sessions");
  return data || { hasHistory: false };
}

export async function getSecurityChat() {
  const { data } = await axiosInstance.get("/api/security-chat");
  return data || null;
}

export async function getSecurityChatHistory() {
  const { data } = await axiosInstance.get("/api/security-chat/history");
  return data || null;
}

export async function getSecurityChatSessionList(excludeSessionId) {
  const { data } = await axiosInstance.get("/api/security-chat/sessions/list", {
    params: excludeSessionId ? { excludeSessionId } : undefined,
  });
  return data || { sessions: [] };
}

export async function getSecurityChatSessionMessages(sessionId) {
  const { data } = await axiosInstance.get(`/api/security-chat/sessions/${sessionId}`);
  return data || null;
}

export async function sendSecurityChatMessage(sessionId, message) {
  const { data } = await axiosInstance.post("/api/security-chat/messages", {
    sessionId,
    message,
  });
  return data || null;
}

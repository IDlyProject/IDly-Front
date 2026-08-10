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

export async function sendSecurityChatMessage(message) {
  const { data } = await axiosInstance.post("/api/security-chat/messages", {
    message,
  });
  return data || null;
}

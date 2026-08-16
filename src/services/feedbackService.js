import { axiosInstance } from "@/lib/api";

export async function submitFeedback({ message, screenPath }) {
  const { data } = await axiosInstance.post("/api/feedback", {
    message,
    screenPath,
  });
  return data;
}

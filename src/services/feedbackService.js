import { axiosInstance } from "@/lib/api";

export async function submitFeedback({ message, screenPath, images }) {
  if (images?.length) {
    const form = new FormData();
    form.append("message", message);
    if (screenPath) form.append("screenPath", screenPath);
    images.forEach((file) => form.append("images", file));
    const { data } = await axiosInstance.post("/api/feedback", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }
  const { data } = await axiosInstance.post("/api/feedback", { message, screenPath });
  return data;
}

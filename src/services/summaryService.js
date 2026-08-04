import { axiosInstance } from "@/lib/api";

export async function getSummary() {
  const { data } = await axiosInstance.get("/api/summary");
  return data;
}

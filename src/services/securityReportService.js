import { axiosInstance } from "@/lib/api";

export async function getSecurityReport() {
  const { data } = await axiosInstance.get("/api/report");
  return data;
}

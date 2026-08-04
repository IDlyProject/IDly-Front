import { axiosInstance } from "@/lib/api";

export async function getHome(mailAccountId) {
  const { data } = await axiosInstance.get("/api/home", {
    params: mailAccountId ? { mailAccountId } : undefined,
  });
  return data;
}

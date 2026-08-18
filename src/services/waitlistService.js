import { axiosInstance } from "@/lib/api";

export async function registerWaitlist({ name, phone, emails }) {
  const { data } = await axiosInstance.post("/api/waitlist", {
    name,
    phone,
    emails,
  });
  return data;
}

export async function getWaitlistStatus(phone) {
  const { data } = await axiosInstance.get("/api/waitlist/status", {
    params: { phone },
  });
  return data;
}

export async function verifyWaitlistToken(token) {
  const { data } = await axiosInstance.get("/api/waitlist/verify", {
    params: { token },
  });
  return data;
}

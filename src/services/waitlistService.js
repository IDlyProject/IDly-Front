import { axiosInstance } from "@/lib/api";

export async function registerWaitlist({
  name,
  phone,
  emails,
  ageOver14Agreed,
  privacyAgreed,
}) {
  const { data } = await axiosInstance.post("/api/waitlist", {
    name,
    phone,
    emails,
    ageOver14Agreed,
    privacyAgreed,
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

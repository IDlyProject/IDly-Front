import { axiosInstance } from "@/lib/api";

export async function getPushPublicKey() {
  const { data } = await axiosInstance.get("/api/push/public-key");
  return data; // { key: string | null }
}

export async function subscribeToPush({ name, phone, endpoint, keys }) {
  const { data } = await axiosInstance.post("/api/push/subscribe", {
    name,
    phone,
    endpoint,
    keys,
  });
  return data; // { status: "subscribed" }
}

export async function linkUserPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return;
  const { endpoint } = sub.toJSON();
  await axiosInstance.post('/api/push/link-user', { endpoint });
}

export async function unsubscribeFromPush({ endpoint }) {
  const { data } = await axiosInstance.delete("/api/push/subscribe", {
    data: { endpoint },
  });
  return data; // { status: "unsubscribed" }
}

import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", (event) => {
  let title = "IDly 알림";
  let body = "앱을 열어 확인해보세요.";
  let path = "/";
  try {
    const payload = event.data.json();
    title = payload.title ?? title;
    body = payload.body ?? body;
    path = payload.path ?? path;
  } catch {
    // 파싱 실패 시 기본값으로 fallback
  }
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      data: { path },
      icon: "/icons/icon-192.png",
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data.path));
});

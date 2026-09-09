import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

// 새 서비스 워커가 설치되면 대기 없이 즉시 활성화
self.addEventListener("install", () => self.skipWaiting());
// 활성화 즉시 모든 클라이언트 제어권 획득 (새 버전 즉시 적용)
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

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

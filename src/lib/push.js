import {
  getPushPublicKey,
  subscribeToPush as registerPushSubscription,
} from "@/services/pushService";

/**
 * 알림 권한 요청부터 서버에 구독 등록까지 한 번에 처리한다.
 *
 * iOS는 홈 화면에 추가해 standalone으로 실행 중일 때만
 * Notification.requestPermission()이 실제로 동작한다(사파리 탭에서는 무반응).
 * 이 함수를 standalone 여부와 무관하게 호출해도 안전하지만, 실제 권한
 * 팝업이 뜨는지는 호출 시점의 실행 환경에 달려 있다.
 *
 * 아직 로그인 전(사전등록 단계)이라 계정이 없으므로, 서버는 등록 시 입력한
 * 이름·전화번호가 모두 일치하는 대기자 건에만 구독을 연결한다.
 *
 * @returns {Promise<"subscribed"|"denied"|"missing-info"|"unsupported"|"unavailable">}
 */
export async function subscribeToPush({ name, phone }) {
  if (!name || !phone) return "missing-info";
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return "unsupported";
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return "denied";

  const { key } = await getPushPublicKey();
  if (!key) return "unavailable"; // 서버에 푸시가 아직 설정되지 않음

  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: key,
    });
  }

  const { endpoint, keys } = subscription.toJSON();
  await registerPushSubscription({ name, phone, endpoint, keys });
  return "subscribed";
}

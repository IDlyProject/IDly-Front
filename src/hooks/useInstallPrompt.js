import { useEffect, useState } from "react";

const DISMISS_KEY = "idly_install_dismissed_until";

/** 사용자가 이미 설치했거나 설치된 앱에서 실행 중이면 안내할 필요가 없다. */
function isStandalone() {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function dismissedRecently() {
  try {
    const until = Number(localStorage.getItem(DISMISS_KEY) ?? 0);
    return Date.now() < until;
  } catch {
    return false;
  }
}

/**
 * 홈 화면 추가 안내 상태.
 *
 * 안드로이드/데스크톱 크롬은 `beforeinstallprompt`를 가로채 원하는 시점에
 * 직접 띄운다. 브라우저 기본 배너는 화면 하단에 잠깐 뜨고 말아 놓치기 쉽다.
 *
 * iOS 사파리는 이 이벤트도, 설치 API도 없다. 사용자가 공유 → 홈 화면에 추가를
 * 직접 눌러야 하므로 안내 문구로 대체한다. iOS에서 웹 푸시를 받으려면 홈 화면에
 * 추가된 상태여야 한다는 점도 이 안내가 필요한 이유다.
 */
export function useInstallPrompt() {
  const [deferredEvent, setDeferredEvent] = useState(null);
  // iOS는 beforeinstallprompt가 오지 않으므로 처음부터 안내를 띄운다.
  // effect 안에서 setState하면 불필요한 재렌더가 생기므로 초기값으로 계산한다.
  const [visible, setVisible] = useState(
    () => !isStandalone() && !dismissedRecently() && isIos(),
  );

  useEffect(() => {
    if (isStandalone() || dismissedRecently() || isIos()) return;

    const onBeforeInstall = (e) => {
      e.preventDefault(); // 브라우저 기본 배너를 막고 시점을 우리가 정한다
      setDeferredEvent(e);
      // 이벤트는 라우팅 등으로 다시 올 수 있다. 사용자가 닫아둔 상태라면
      // 그 의사를 존중해 다시 띄우지 않는다.
      if (!dismissedRecently()) setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  async function install() {
    if (!deferredEvent) return "unavailable";
    deferredEvent.prompt();
    const { outcome } = await deferredEvent.userChoice;
    setDeferredEvent(null);
    setVisible(false);
    return outcome; // "accepted" | "dismissed"
  }

  function dismissForToday() {
    try {
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      localStorage.setItem(DISMISS_KEY, String(tomorrow.getTime()));
    } catch {
      // 스토리지가 막힌 환경에서도 닫기는 동작해야 한다
    }
    setVisible(false);
  }

  return { visible, isIos: isIos(), install, dismissForToday };
}

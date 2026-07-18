// src/pages/Home/hooks/useLongPress.js
import { useRef, useCallback } from "react";

const LONG_PRESS_DURATION = 500; // ms

function useLongPress(onLongPress) {
  const timerRef = useRef(null);
  const triggeredRef = useRef(false);

  const start = useCallback(() => {
    triggeredRef.current = false;
    timerRef.current = setTimeout(() => {
      triggeredRef.current = true;
      onLongPress();
    }, LONG_PRESS_DURATION);
  }, [onLongPress]);

  const clear = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  return {
    onTouchStart: start,
    onTouchEnd: clear,
    onTouchMove: clear, // 스크롤 등으로 손가락이 움직이면 취소
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    wasLongPress: () => triggeredRef.current,
  };
}

export default useLongPress;

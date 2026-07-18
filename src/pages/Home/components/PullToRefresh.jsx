// src/components/ui/PullToRefresh.jsx
import { useRef, useState } from "react";
import RefreshIcon from "@/assets/ic_refresh.svg";

const THRESHOLD = 70;
const MAX_PULL = 100;
const GAP_BELOW_INDICATOR = 33;

function PullToRefresh({ onRefresh, children }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startYRef = useRef(0);
  const draggingRef = useRef(false);

  const handleTouchStart = (e) => {
    if (window.scrollY > 0 || refreshing) return;
    startYRef.current = e.touches[0].clientY;
    draggingRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!draggingRef.current) return;
    const delta = e.touches[0].clientY - startYRef.current;
    if (delta > 0) {
      setPullDistance(Math.min(delta * 0.5, MAX_PULL));
    }
  };

  const handleTouchEnd = async () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    if (pullDistance > THRESHOLD) {
      setRefreshing(true);
      setPullDistance(THRESHOLD);
      await onRefresh?.();
      setRefreshing(false);
    }
    setPullDistance(0);
  };

  // 당긴 거리에 비례한 회전 각도 (0 ~ 360도)
  const dragRotation = (pullDistance / MAX_PULL) * 360;
  const isIndicatorVisible = pullDistance > 0 || refreshing;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex justify-center overflow-hidden transition-all duration-200"
        style={{
          height: pullDistance,
          marginBottom: isIndicatorVisible ? GAP_BELOW_INDICATOR : 0,
        }}
      >
        <div className="flex items-center">
          <img
            src={RefreshIcon}
            alt=""
            className={`h-14.25 w-14.25 drop-shadow-[0_4px_16px_rgba(16,24,46,0.04)] ${refreshing ? "animate-spin" : ""}`}
            style={
              !refreshing
                ? { transform: `rotate(${dragRotation}deg)` }
                : undefined
            }
          />
        </div>
      </div>
      {children}
    </div>
  );
}

export default PullToRefresh;

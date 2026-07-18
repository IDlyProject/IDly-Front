// src/pages/Home/hooks/useMenuPosition.js
import { useLayoutEffect, useRef, useState } from "react";

const GAP = 8; // 트리거 버튼과 메뉴 사이 간격
const VIEWPORT_PADDING = 12; // 화면 가장자리와의 최소 여백

function useMenuPosition(anchorRef, isOpen) {
  const menuRef = useRef(null);
  const [style, setStyle] = useState({ visibility: "hidden" });

  useLayoutEffect(() => {
    if (!isOpen || !anchorRef.current || !menuRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();

    let top = anchorRect.bottom + GAP;
    let left = anchorRect.left;

    // 아래로 펼쳤을 때 화면 밑으로 넘치면, 위쪽으로 펼침
    if (top + menuRect.height + VIEWPORT_PADDING > window.innerHeight) {
      top = anchorRect.top - menuRect.height - GAP;
    }

    // 그래도 화면 위로 넘치면(메뉴가 화면보다 큰 극단적 경우), 화면 안에 맞춤
    if (top < VIEWPORT_PADDING) {
      top = VIEWPORT_PADDING;
    }

    // 오른쪽으로 펼쳤을 때 화면 밖으로 넘치면, 오른쪽 끝 기준으로 왼쪽으로 펼침
    if (left + menuRect.width + VIEWPORT_PADDING > window.innerWidth) {
      left = anchorRect.right - menuRect.width;
    }

    // 그래도 화면 왼쪽으로 넘치면, 화면 안에 맞춤
    if (left < VIEWPORT_PADDING) {
      left = VIEWPORT_PADDING;
    }

    setStyle({
      position: "fixed",
      top: `${top}px`,
      left: `${left}px`,
      visibility: "visible",
    });
  }, [isOpen, anchorRef]);

  return { menuRef, style };
}

export default useMenuPosition;

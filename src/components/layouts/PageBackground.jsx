// src/components/layouts/PageBackground.jsx
import { useLayoutEffect } from "react";

const BG_VALUES = {
  sky: "linear-gradient(180deg, #bcdcff 0%, #dcebff 48%, #fdf2e4 100%)",
  default: "#f2f4f6",
};

const THEME_COLOR = {
  sky: "#fdf2e4", // 그라데이션 하단 색과 맞춤 (하단 툴바 쪽에 더 가까운 색)
  default: "#f2f4f6",
};

const BG_CLASSES = {
  sky: "bg-gradient-to-b from-[#bcdcff] via-[#dcebff] to-[#fdf2e4]",
  default: "bg-[#f2f4f6]",
};

function PageBackground({ variant = "default", children }) {
  useLayoutEffect(() => {
    const prevBody = document.body.style.background;
    const prevHtml = document.documentElement.style.background;

    document.body.style.background = BG_VALUES[variant];
    document.documentElement.style.background = BG_VALUES[variant];

    let metaTag = document.querySelector('meta[name="theme-color"]');
    const prevThemeColor = metaTag?.getAttribute("content");
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "theme-color");
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", THEME_COLOR[variant]);

    return () => {
      document.body.style.background = prevBody;
      document.documentElement.style.background = prevHtml;
      if (prevThemeColor) metaTag.setAttribute("content", prevThemeColor);
    };
  }, [variant]);

  return (
    <div className="relative min-h-dvh w-full">
      <div className={`absolute inset-0 -z-10 ${BG_CLASSES[variant]}`} />
      {children}
    </div>
  );
}

export default PageBackground;

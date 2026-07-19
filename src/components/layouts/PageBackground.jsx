import { useLayoutEffect } from "react";

const BG_VALUES = {
  splash: "#08257E",
  default: "#ffffff",
  frost: "linear-gradient(180deg, #F8FBFE 0%, #D5DEED 100%)",
  detail: "linear-gradient(180deg, #D5DEED 0%, #F8FBFE 100%)",
};

const THEME_COLOR = {
  splash: "#08257E",
  default: "#ffffff",
  frost: "#D5DEED",
  detail: "#F8FBFE",
};

const BG_CLASSES = {
  splash: "bg-[#08257E]",
  default: "bg-white",
  frost: "bg-gradient-to-b from-[#F8FBFE] to-[#D5DEED]",
  detail: "bg-gradient-to-b from-[#D5DEED] to-[#F8FBFE]",
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

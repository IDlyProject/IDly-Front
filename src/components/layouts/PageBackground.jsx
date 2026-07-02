// src/components/layouts/PageBackground.jsx
import { useEffect } from "react";

const GRADIENTS = {
  sky: "linear-gradient(180deg, #bcdcff 0%, #dcebff 48%, #fdf2e4 100%)",
  default: "#f2f4f6",
};

function PageBackground({ variant = "default", children }) {
  useEffect(() => {
    const prevBodyBackground = document.body.style.background;
    const prevHtmlBackground = document.documentElement.style.background;

    document.body.style.background = GRADIENTS[variant];
    document.documentElement.style.background = GRADIENTS[variant];

    return () => {
      document.body.style.background = prevBodyBackground;
      document.documentElement.style.background = prevHtmlBackground;
    };
  }, [variant]);

  return <div className="min-h-dvh w-full">{children}</div>;
}

export default PageBackground;

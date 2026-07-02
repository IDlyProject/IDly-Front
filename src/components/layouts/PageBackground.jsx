// src/components/layout/PageBackground.jsx
import { useEffect } from "react";

const GRADIENTS = {
  sky: "linear-gradient(180deg, #bcdcff 0%, #dcebff 48%, #fdf2e4 100%)",
  default: "#f2f4f6",
};

function PageBackground({ variant = "default", children }) {
  useEffect(() => {
    const prevBackground = document.body.style.background;
    document.body.style.background = GRADIENTS[variant];

    return () => {
      document.body.style.background = prevBackground;
    };
  }, [variant]);

  return <div className="min-h-dvh w-full">{children}</div>;
}

export default PageBackground;

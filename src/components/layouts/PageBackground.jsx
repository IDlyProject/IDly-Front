// src/components/layouts/PageBackground.jsx
function PageBackground({ variant = "default", children }) {
  const bgClass =
    variant === "sky"
      ? "bg-gradient-to-b from-[#bcdcff] via-[#dcebff] to-[#fdf2e4]"
      : "bg-[#f2f4f6]";

  return (
    <div className="relative min-h-dvh w-full">
      <div className={`absolute inset-0 -z-10 ${bgClass}`} />
      {children}
    </div>
  );
}

export default PageBackground;

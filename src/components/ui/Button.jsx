function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "w-full h-14 rounded-2xl text-base font-bold transition active:scale-[0.98]";
  const variants = {
    primary: "bg-[#3b6cff] text-white shadow-lg shadow-blue-500/30",
    secondary: "bg-white text-[#191f28] border border-gray-200 shadow-sm",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;

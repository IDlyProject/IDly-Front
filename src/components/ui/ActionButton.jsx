// src/components/ui/ActionButton.jsx
function ActionButton({
  children,
  bgColor = "var(--main100)",
  textColor = "var(--white)",
  bordered = false,
  borderColor,
  onClick,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-13.5 w-full rounded-2xl text-sb16 transition-opacity disabled:opacity-40 ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: bordered ? `1px solid ${borderColor}` : "none",
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default ActionButton;

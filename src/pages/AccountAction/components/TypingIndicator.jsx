// src/pages/AccountAction/components/TypingIndicator.jsx
import OwlAvatar from "./OwlAvatar";

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar />
      <div className="flex h-10 items-center gap-1 rounded-[4px_18px_18px_18px] bg-white px-4 shadow-sm">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

export default TypingIndicator;

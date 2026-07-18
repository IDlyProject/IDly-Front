// src/pages/AccountAction/components/ChatInputBar.jsx
import { SendIcon } from "../icons";

function ChatInputBar({ value, onChange, onSend, disabled }) {
  return (
    <div className="flex items-center gap-2.5 border-t border-gray-100 bg-white px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        disabled={disabled}
        placeholder="메시지를 입력하세요"
        className="h-11 flex-1 rounded-full bg-[#f0f1f4] px-4 text-sm outline-none placeholder:text-gray-400 disabled:opacity-60"
      />
      <button
        onClick={onSend}
        disabled={disabled}
        className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-[#08257e] disabled:opacity-40"
      >
        <img src={SendIcon} alt="" className="h-4.5 w-4.5" />
      </button>
    </div>
  );
}

export default ChatInputBar;

// src/pages/AccountAction/components/TextBubble.jsx
import OwlAvatar from "./OwlAvatar";

function TextBubble({ text }) {
  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar />
      <div className="max-w-[300px] rounded-[4px_18px_18px_18px] bg-white shadow-[0_1px_2px_rgba(16,24,46,0.04)]">
        <p className="p-4 text-[13.5px] leading-relaxed text-[#212125]">
          {text}
        </p>
      </div>
    </div>
  );
}

export default TextBubble;

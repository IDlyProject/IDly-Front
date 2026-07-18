// src/pages/AccountAction/components/UserBubble.jsx
function UserBubble({ text }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[220px] rounded-[18px_4px_18px_18px] bg-[#08257e] px-4.5 py-3 text-sm leading-relaxed text-white shadow-[0_2px_3px_rgba(8,37,126,0.1)]">
        {text}
      </div>
    </div>
  );
}

export default UserBubble;

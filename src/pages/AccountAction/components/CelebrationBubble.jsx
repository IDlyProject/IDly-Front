import OwlAvatar from "./OwlAvatar";

function CelebrationBubble({ message }) {
  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar hidden />
      <div className="max-w-[300px] rounded-[4px_18px_18px_18px] border-[0.76px] border-[#43a047]/20 bg-gradient-to-br from-[#e8f5e9] to-[#f1f8e9] p-4.5">
        <div className="mb-2.5 text-2xl">🎉</div>
        <p className="text-[13.5px] font-bold leading-relaxed text-[#212125]">
          {message}
        </p>
      </div>
    </div>
  );
}

export default CelebrationBubble;

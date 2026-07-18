// src/pages/AccountAction/components/CelebrationBubble.jsx
import OwlAvatar from "./OwlAvatar";

function CelebrationBubble({ serviceName }) {
  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar hidden />
      <div className="max-w-[300px] rounded-[4px_18px_18px_18px] border-[0.76px] border-[#43a047]/20 bg-gradient-to-br from-[#e8f5e9] to-[#f1f8e9] p-4.5">
        <div className="mb-2.5 text-2xl">🎉</div>
        <p className="mb-1.5 text-[15px] font-bold text-[#212125]">
          {serviceName} 계정이 안전해졌어요!
        </p>
        <p className="text-[12.5px] leading-relaxed text-[#70737a]">
          3가지 보안 조치를 모두 마쳤어요. 비정상적인 접근이 생기면 바로
          알려드릴게요.
        </p>
      </div>
    </div>
  );
}

export default CelebrationBubble;

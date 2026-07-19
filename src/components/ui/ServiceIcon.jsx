// src/components/ui/ServiceIcon.jsx
import { useState } from "react";

// iconUrl이 있으면 이미지, 없거나 로드 실패하면 iconBg 색상 + iconText로 폴백.
// 크기/모양은 className으로 호출부에서 지정한다.
function ServiceIcon({ iconUrl, iconBg, iconText, className = "" }) {
  const [loadFailed, setLoadFailed] = useState(false);
  const showImage = iconUrl && !loadFailed;

  if (showImage) {
    return (
      <img
        src={iconUrl}
        alt=""
        onError={() => setLoadFailed(true)}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`grid place-items-center font-bold text-white ${className}`}
      style={{ background: iconBg }}
    >
      {iconText}
    </div>
  );
}

export default ServiceIcon;

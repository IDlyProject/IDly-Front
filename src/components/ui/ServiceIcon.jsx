import { useState } from "react";

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

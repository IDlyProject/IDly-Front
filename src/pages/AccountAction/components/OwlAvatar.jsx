// src/pages/AccountAction/components/OwlAvatar.jsx
import { OwlIcon } from "../icons";

function OwlAvatar({ hidden }) {
  return (
    <div className={`h-10 w-10 flex-shrink-0 ${hidden ? "invisible" : ""}`}>
      <img src={OwlIcon} alt="" className="h-10 w-10" />
    </div>
  );
}

export default OwlAvatar;

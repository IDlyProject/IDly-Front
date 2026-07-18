// src/pages/NotificationSettings/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import BackIcon from "@/assets/ic_back.svg";
import ShieldIcon from "@/assets/ic_shield.svg";
import KeyIcon from "@/assets/ic_key.svg";
import PhoneIcon from "@/assets/ic_phone.svg";
import MessageIcon from "@/assets/ic_message.svg";
import BulbIcon from "@/assets/ic_bulb.svg";
import EventIcon from "@/assets/ic_event.svg";
import ToggleOnIcon from "@/assets/ic_toggle_on.svg";
import ToggleOffIcon from "@/assets/ic_toggle_off.svg";

const INITIAL_SETTINGS = {
  suspiciousLogin: true,
  passwordChange: true,
  newDevice: true,
  recoveryEmail: true,
  securityTeamNews: false,
  eventNotice: false,
};

const SECTIONS = [
  {
    title: "보안 알림",
    items: [
      { icon: ShieldIcon, key: "suspiciousLogin", label: "의심 로그인 감지" },
      { icon: KeyIcon, key: "passwordChange", label: "비밀번호 변경 알림" },
      { icon: PhoneIcon, key: "newDevice", label: "새 기기 로그인" },
      { icon: MessageIcon, key: "recoveryEmail", label: "복구 이메일 변경" },
    ],
  },
  {
    title: "마케팅",
    items: [
      { icon: BulbIcon, key: "securityTeamNews", label: "보안 팁 알림" },
      { icon: EventIcon, key: "eventNotice", label: "이벤트 알림" },
    ],
  },
];

function Toggle({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)} className="shrink-0">
      <img
        src={checked ? ToggleOnIcon : ToggleOffIcon}
        alt=""
        className="h-7 w-12"
      />
    </button>
  );
}

function NotificationSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  const handleToggle = (key, value) => {
    // TODO: 실제 알림 설정 저장 API 호출 필요
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-4">
        <div className="mb-4 flex items-center gap-3 px-1 py-1.5">
          <button
            onClick={() => navigate(-1)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white"
          >
            <img src={BackIcon} alt="" className="h-5 w-5" />
          </button>
          <h1 className="text-[18px] font-bold text-gray100">알림 설정</h1>
        </div>

        {SECTIONS.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="mb-3 text-[16px] font-bold text-gray100">
              {section.title}
            </h3>
            <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_1px_3px_rgba(16,24,46,0.03)]">
              {section.items.map((item, idx) => (
                <div
                  key={item.key}
                  className={`flex items-center gap-3 px-5 py-4.5 ${
                    idx < section.items.length - 1
                      ? "border-b-[1.33px] border-[#E5E7EB]"
                      : ""
                  }`}
                >
                  <img src={item.icon} alt="" className="h-4.5 w-4.5" />
                  <span className="flex-1 text-r14 text-[15px] text-gray100">
                    {item.label}
                  </span>
                  <Toggle
                    checked={settings[item.key]}
                    onChange={(v) => handleToggle(item.key, v)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageBackground>
  );
}

export default NotificationSettings;

// src/pages/NotificationSettings/index.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  getNotificationSettings,
  updateNotificationSettings,
} from "@/api/notificationSettings";
import BackIcon from "@/assets/ic_back.svg";
import ShieldIcon from "@/assets/ic_shield.svg";
import KeyIcon from "@/assets/ic_key.svg";
import PhoneIcon from "@/assets/ic_phone.svg";
import MessageIcon from "@/assets/ic_message.svg";
import BulbIcon from "@/assets/ic_bulb.svg";
import EventIcon from "@/assets/ic_event.svg";
import ToggleOnIcon from "@/assets/ic_toggle_on.svg";
import ToggleOffIcon from "@/assets/ic_toggle_off.svg";

const SECTIONS = [
  {
    title: "보안 알림",
    marketing: false,
    items: [
      {
        icon: ShieldIcon,
        key: "alertSuspiciousLogin",
        label: "의심 로그인 감지",
      },
      { icon: KeyIcon, key: "alertPasswordChange", label: "비밀번호 변경 알림" },
      { icon: PhoneIcon, key: "alertNewDevice", label: "새 기기 로그인" },
      { icon: MessageIcon, key: "alertRecoveryEmail", label: "복구 이메일 변경" },
    ],
  },
  {
    title: "마케팅",
    marketing: true,
    items: [
      { icon: BulbIcon, key: "alertSecurityTip", label: "보안 팁 알림" },
      { icon: EventIcon, key: "alertEventPromo", label: "이벤트 알림" },
    ],
  },
];

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      disabled={disabled}
      className="shrink-0 disabled:opacity-40"
    >
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
  const { user } = useCurrentUser();
  const [settings, setSettings] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;
    getNotificationSettings()
      .then((data) => {
        if (cancelled) return;
        setSettings(data);
        setStatus("ready");
      })
      .catch((err) => {
        console.error("notification settings load failed:", err);
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleToggle = async (key, value) => {
    const previous = settings;
    setSettings((prev) => ({ ...prev, [key]: value }));
    try {
      await updateNotificationSettings({ [key]: value });
    } catch (err) {
      console.error("notification settings update failed:", err);
      setSettings(previous);
    }
  };

  if (status === "loading") {
    return (
      <PageBackground variant="frost">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">불러오는 중...</p>
        </div>
      </PageBackground>
    );
  }

  if (status === "error" || !settings) {
    return (
      <PageBackground variant="frost">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">
            알림 설정을 불러오지 못했어요.
          </p>
        </div>
      </PageBackground>
    );
  }

  // 마케팅 토글은 켜져 있어도 상위 마케팅 정보 수신 동의가 없으면 실제로 발송되지 않음
  const marketingAgreed = !!user?.marketingAgreed;

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
            {section.marketing && !marketingAgreed && (
              <p className="mb-2 text-[12px] font-bold text-gray50">
                마케팅 정보 수신에 동의해야 알림을 받을 수 있어요.
              </p>
            )}
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
                    disabled={section.marketing && !marketingAgreed}
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

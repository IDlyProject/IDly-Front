// src/pages/NotificationSettings/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ErrorScreen from "@/components/ui/ErrorScreen";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { updateNotificationSettings } from "@/api/notificationSettings";
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
  const { settings: fetchedSettings, status } = useNotificationSettings();
  // 토글 하나에도 낙관적 업데이트+실패 시 롤백이 필요해서, 불러온 값을 로컬
  // 편집 상태로 한 번 더 복사해둔다 (재조회 없이 즉시 반영/되돌리기 위함).
  // effect로 동기화하지 않고, React 문서가 권장하는 "렌더링 중 상태 조정" 패턴으로
  // fetchedSettings가 바뀐 시점에만 로컬 상태를 초기화한다.
  const [settings, setSettings] = useState(null);
  const [syncedFrom, setSyncedFrom] = useState(null);
  if (fetchedSettings && fetchedSettings !== syncedFrom) {
    setSyncedFrom(fetchedSettings);
    setSettings(fetchedSettings);
  }

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

  // settings는 fetchedSettings가 useEffect로 한 프레임 늦게 동기화되므로,
  // status가 ready여도 아직 settings가 비어있는 순간은 loading으로 취급해야
  // 잘못된 에러 화면이 한 프레임 스치지 않는다.
  if (status === "loading" || (status === "ready" && !settings)) {
    return <LoadingScreen />;
  }
  if (status === "error") {
    return <ErrorScreen text="알림 설정을 불러오지 못했어요." />;
  }

  // 마케팅 토글은 켜져 있어도 상위 마케팅 정보 수신 동의가 없으면 실제로 발송되지 않음
  const marketingAgreed = !!user?.marketingAgreed;

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-4">
        <div className="mb-4 flex items-center gap-3 px-1 py-1.5">
          <button
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
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

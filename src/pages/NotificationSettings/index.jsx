// src/pages/NotificationSettings/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";

function ArrowLeftIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#191f28"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${checked ? "bg-[#12b886]" : "bg-gray-200"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

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
      { key: "suspiciousLogin", label: "의심 로그인 감지" },
      { key: "passwordChange", label: "비밀번호 변경 알림" },
      { key: "newDevice", label: "새 기기 로그인" },
      { key: "recoveryEmail", label: "복구 이메일 변경" },
    ],
  },
  {
    title: "마케팅",
    items: [
      { key: "securityTeamNews", label: "보안 팁 알림" },
      { key: "eventNotice", label: "이벤트 알림" },
    ],
  },
];

function NotificationSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  const handleToggle = (key, value) => {
    // TODO: 실제 알림 설정 저장 API 호출 필요
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <PageBackground variant="default">
      <div className="min-h-dvh px-4 pb-8 pt-[max(12px,env(safe-area-inset-top))]">
        <div className="mb-4 flex items-center gap-3 py-2">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
          </button>
          <h1 className="text-lg font-bold text-[#191f28]">알림 설정</h1>
        </div>

        {SECTIONS.map((section) => (
          <div key={section.title} className="mb-5">
            <h3 className="mb-2 text-[13px] font-bold text-[#191f28]">
              {section.title}
            </h3>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              {section.items.map((item, idx) => (
                <div
                  key={item.key}
                  className={`flex items-center justify-between px-3.5 py-3.5 ${
                    idx < section.items.length - 1
                      ? "border-b border-gray-50"
                      : ""
                  }`}
                >
                  <span className="text-sm font-bold text-[#191f28]">
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

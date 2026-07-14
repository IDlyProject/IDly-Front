// src/pages/Onboarding/AccountConfirm/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import PageBackground from "@/components/layouts/PageBackground";
import { updateProfile } from "@/api/users";
import { getPrimaryGmailAccount } from "@/api/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const AGE_GROUPS = ["10대", "20대", "30대", "40대", "50대 이상"];

function ProgressDots({ current, total }) {
  return (
    <div className="mb-6 flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const step = i + 1;

        if (step < current) {
          // 이미 지나온 단계 - 채워진 작은 파란 점
          return (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#3b6cff]" />
          );
        }
        if (step === current) {
          // 현재 단계 - 길쭉한 파란 바
          return (
            <span key={i} className="h-1.5 w-6 rounded-full bg-[#3b6cff]" />
          );
        }
        // 아직 안 온 단계 - 회색 점
        return (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-gray-200" />
        );
      })}
    </div>
  );
}

function FieldIcon({ type }) {
  const common = "h-4 w-4 text-gray-400";
  if (type === "person") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6" />
      </svg>
    );
  }
  if (type === "at") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-4 7.5" />
      </svg>
    );
  }
  if (type === "phone") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 3h3l1.5 4.5-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z" />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
        <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
      </svg>
    );
  }
  return null;
}

function AccountConfirm() {
  const navigate = useNavigate();
  const { user, status: userStatus } = useCurrentUser();
  const primaryAccount = getPrimaryGmailAccount(user);
  const primaryEmail = primaryAccount?.email ?? "";

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleConfirm = async () => {
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(false);

    try {
      const payload = { name: name.trim() };
      if (nickname.trim()) payload.nickname = nickname.trim();
      if (phone.trim()) payload.phone = phone.trim();
      if (ageGroup) payload.ageGroup = ageGroup;

      await updateProfile(payload);
      navigate(ROUTES.ONBOARDING_CONSENT);
    } catch {
      setIsSubmitting(false);
      setError(true);
    }
  };

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-6 pt-8 pb-8">
        <ProgressDots current={3} total={7} />

        <h1 className="text-[22px] font-bold leading-snug text-[#191f28]">
          대표 계정 설정
        </h1>
        <p className="mt-1.5 text-[13px] font-bold text-[#9aa4b2]">
          본인 확인을 위해 기본 정보를 입력해주세요.
        </p>

        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm">
          <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#3b6cff] to-[#5b7dff] text-sm font-bold text-white">
            {name.trim() ? name.trim()[0] : "?"}
          </div>
          <div className="flex-1">
            <strong className="block text-sm text-[#191f28]">
              {userStatus === "loading"
                ? "불러오는 중..."
                : name.trim() || "이름을 입력해주세요"}
            </strong>
            <span className="mt-0.5 block text-xs font-bold text-[#9aa4b2]">
              {primaryEmail}
            </span>
          </div>
          <span className="rounded-full bg-[#eafaf2] px-2.5 py-1 text-[11px] font-bold text-[#12b886]">
            Gmail
          </span>
        </div>

        <div className="mt-6 flex-1 space-y-4">
          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-[#191f28]">
              이름
            </span>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 shadow-sm focus-within:border-[#3b6cff]">
              <FieldIcon type="person" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                className="h-full flex-1 text-sm outline-none placeholder:text-gray-300"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-[#191f28]">
              닉네임
            </span>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 shadow-sm focus-within:border-[#3b6cff]">
              <FieldIcon type="at" />
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="길동이"
                className="h-full flex-1 text-sm outline-none placeholder:text-gray-300"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-[#191f28]">
              전화번호
            </span>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 shadow-sm focus-within:border-[#3b6cff]">
              <FieldIcon type="phone" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-1234-5678"
                className="h-full flex-1 text-sm outline-none placeholder:text-gray-300"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-[#191f28]">
              연령대
            </span>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 shadow-sm focus-within:border-[#3b6cff]">
              <FieldIcon type="calendar" />
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className={`h-full flex-1 bg-transparent text-sm outline-none ${
                  ageGroup ? "text-[#191f28]" : "text-gray-300"
                }`}
              >
                <option value="" disabled>
                  선택해주세요
                </option>
                {AGE_GROUPS.map((group) => (
                  <option key={group} value={group} className="text-[#191f28]">
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </label>

          {error && (
            <p className="text-xs font-bold text-red-500">
              저장에 실패했어요. 다시 시도해주세요.
            </p>
          )}
        </div>

        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={!name.trim() || isSubmitting}
        >
          {isSubmitting ? "저장 중..." : "대표 계정으로 설정하기"}
        </Button>
      </div>
    </PageBackground>
  );
}

export default AccountConfirm;

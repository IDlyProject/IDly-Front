// src/pages/Onboarding/AccountConfirm/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "@/components/ui/ActionButton";
import { ROUTES } from "@/constants/routes";
import { updateProfile } from "@/api/users";
import { getPrimaryGmailAccount } from "@/api/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import PageBackground from "@/components/layouts/PageBackground";
import ProgressDots from "../components/ProgressDot";
import PersonIcon from "@/assets/ic_person.svg";
import NicknameIcon from "@/assets/ic_nickname.svg";
import CallIcon from "@/assets/ic_call.svg";
import CalendarIcon from "@/assets/ic_calendar.svg";
const AGE_GROUPS = ["10대", "20대", "30대", "40대", "50대 이상"];

function AccountConfirm() {
  const navigate = useNavigate();
  const { user, status: userStatus } = useCurrentUser();
  const primaryAccount = getPrimaryGmailAccount(user);
  const primaryEmail = primaryAccount?.email ?? "이메일하드코딩";

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
      <div className="flex min-h-dvh flex-col px-4 pb-8">
        <div className="px-1 flex-1">
          <ProgressDots current={3} total={7} />
          <div className="py-5 gap-1.5">
            <h1 className="text-b24 text-[22px] text-gray100">
              대표 계정 설정
            </h1>
            <p className="text-r14 text-gray60">
              본인 확인을 위해 기본 정보를 입력해주세요.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-[14px] bg-[#ECF1F9] px-4 py-3.5 mb-5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-main100 text-b20 text-[17px] text-white">
              {name.trim() ? name.trim()[0] : "?"}
            </div>
            <div className="flex-1">
              <strong className="block text-sb16 text-[15px] text-gray100">
                {userStatus === "loading"
                  ? "불러오는 중..."
                  : name.trim() || "이름을 입력해주세요"}
              </strong>
              <span className="mt-1 block text-14 text-[13px] text-gray60">
                {primaryEmail}
              </span>
            </div>
            <span className="px-2.5 py-1 border border-[0.6px] rounded-xl bg-[#cdf7eb] text-sb16 text-[11px] text-[#12B886]">
              Gmail
            </span>
          </div>

          <div className="py-2 flex-1 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sb16 text-[13px] text-gray60">
                이름
              </span>
              <div className="p-3.75 flex h-12 items-center gap-2.5 rounded-xl border border-gray10 bg-white focus-within:border-main100">
                <img src={PersonIcon} alt="" className="h-4.5 w-4.5" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="h-full flex-1 text-r14 text-gray100 outline-none placeholder:text-gray50"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sb16 text-[13px] text-gray60">
                닉네임
              </span>
              <div className="p-3.75 flex h-12 items-center gap-2.5 rounded-xl border border-gray10 bg-white focus-within:border-main100">
                <img src={NicknameIcon} alt="" className="h-4.5 w-4.5" />
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="길동이"
                  className="h-full flex-1 text-r14 text-gray100 outline-none placeholder:text-gray50"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sb16 text-[13px] text-gray60">
                전화번호
              </span>
              <div className="p-3.75 flex h-12 items-center gap-2.5 rounded-xl border border-gray10 bg-white focus-within:border-main100">
                <img src={CallIcon} alt="" className="h-4.5 w-4.5" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  className="h-full flex-1 text-r14 text-gray100 outline-none placeholder:text-gray50"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sb16 text-[13px] text-gray60">
                연령대
              </span>
              <div className="p-3.75 flex h-12 items-center gap-2.5 rounded-xl border border-gray10 bg-white focus-within:border-main100">
                <img src={CalendarIcon} alt="" className="h-4.5 w-4.5" />
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className={`h-full flex-1 bg-transparent text-r14 outline-none ${
                    ageGroup ? "text-gray100" : "text-gray50"
                  }`}
                >
                  <option value="" disabled>
                    선택해주세요
                  </option>
                  {AGE_GROUPS.map((group) => (
                    <option key={group} value={group} className="text-gray100">
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            {error && (
              <p className="text-xs font-bold text-danger50">
                저장에 실패했어요. 다시 시도해주세요.
              </p>
            )}
          </div>
        </div>
        <ActionButton
          bgColor="var(--color-main100)"
          textColor="var(--color-white)"
          onClick={handleConfirm}
          disabled={!name.trim() || isSubmitting}
        >
          {isSubmitting ? "저장 중..." : "대표 계정으로 설정하기"}
        </ActionButton>
      </div>
    </PageBackground>
  );
}

export default AccountConfirm;

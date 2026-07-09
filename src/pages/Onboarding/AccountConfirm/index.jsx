import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import PageBackground from "@/components/layouts/PageBackground";
import { updateProfile } from "@/api/users";
import { getPrimaryGmailAccount } from "@/api/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const AGE_GROUPS = ["10대", "20대", "30대", "40대", "50대 이상"];

function AccountConfirm() {
  const navigate = useNavigate();
  const { user, status: userStatus } = useCurrentUser();
  const primaryEmail = getPrimaryGmailAccount(user)?.email ?? "";

  const [name, setName] = useState("");
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
      if (phone.trim()) payload.phone = phone.trim();
      if (ageGroup) payload.ageGroup = ageGroup;

      await updateProfile(payload);
      navigate(ROUTES.ONBOARDING_ACCOUNT_COMPLETE);
    } catch {
      setIsSubmitting(false);
      setError(true);
    }
  };

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-6 pt-10 pb-8">
        <h1 className="text-[26px] font-bold leading-snug text-[#191f28]">
          대표 계정을
          <br />
          확인해주세요
        </h1>

        <div className="mt-5 rounded-2xl border border-[#e8eef8] bg-white p-4 shadow-sm">
          <span className="inline-flex h-6 items-center rounded-full bg-[#eef2ff] px-2.5 text-[10px] font-bold text-[#3b6cff]">
            대표 계정
          </span>
          <strong className="mt-3 block text-lg text-[#191f28]">
            {userStatus === "loading" ? "불러오는 중..." : primaryEmail}
          </strong>
          <p className="mt-1 text-xs leading-relaxed text-[#6b7684]">
            이 Gmail을 대표 계정으로 사용해요. 메일은 읽기 전용으로만
            확인합니다.
          </p>
        </div>

        <div className="mt-6 flex-1 space-y-4">
          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-[#191f28]">
              이름 (필수)
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-100 bg-white px-4 text-sm shadow-sm outline-none focus:border-[#3b6cff]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-[#191f28]">
              전화번호 (선택)
            </span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-100 bg-white px-4 text-sm shadow-sm outline-none focus:border-[#3b6cff]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-[#191f28]">
              연령대 (선택)
            </span>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-100 bg-white px-4 text-sm shadow-sm outline-none focus:border-[#3b6cff]"
            >
              <option value="">선택 안 함</option>
              {AGE_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
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
          {isSubmitting ? "저장 중..." : "대표 계정으로 계속하기"}
        </Button>
      </div>
    </PageBackground>
  );
}

export default AccountConfirm;

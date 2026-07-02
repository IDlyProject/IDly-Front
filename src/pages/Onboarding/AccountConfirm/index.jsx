import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import PageBackground from "@/components/layouts/PageBackground";

// TODO: 실제로는 /accounts 응답의 primary account를 받아와서 표시
function AccountConfirm() {
  const navigate = useNavigate();
  const primaryEmail = "minji.kim@gmail.com";

  const handleConfirm = () => {
    // TODO: 대표 계정 connected 상태로 확정 API 호출
    navigate(ROUTES.ONBOARDING_ACCOUNT_COMPLETE);
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
            {primaryEmail}
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
            <input className="h-11 w-full rounded-xl border border-gray-100 bg-white px-4 text-sm shadow-sm outline-none focus:border-[#3b6cff]" />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-[#191f28]">
              전화번호 (선택)
            </span>
            <input className="h-11 w-full rounded-xl border border-gray-100 bg-white px-4 text-sm shadow-sm outline-none focus:border-[#3b6cff]" />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-[#191f28]">
              연령대 (선택)
            </span>
            <input className="h-11 w-full rounded-xl border border-gray-100 bg-white px-4 text-sm shadow-sm outline-none focus:border-[#3b6cff]" />
          </label>
        </div>

        <Button variant="primary" onClick={handleConfirm}>
          대표 계정으로 계속하기
        </Button>
      </div>
    </PageBackground>
  );
}

export default AccountConfirm;

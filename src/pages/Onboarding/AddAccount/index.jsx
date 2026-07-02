import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

// TODO: /accounts 응답으로 대표/연결 계정 목록 렌더링
function AddAccount() {
  const navigate = useNavigate();
  const primaryEmail = "minji.kim@gmail.com";

  const handleStartConnect = () => {
    // TODO: Firebase 연동 후 /auth/google/start?purpose=connect 로 교체
    navigate(ROUTES.ONBOARDING_COMPLETE); // 혹은 원하는 임시 목적지
  };

  return (
    <div className="flex min-h-dvh flex-col bg-[#f2f4f6] px-6 pt-10 pb-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 self-start text-sm text-[#6b7684]"
      >
        ← 뒤로
      </button>

      <h1 className="text-[26px] font-bold leading-snug text-[#191f28]">
        다른 Gmail도
        <br />
        추가해볼까요?
      </h1>

      <div className="mt-6 rounded-2xl border border-[#e8eef8] bg-white p-4 shadow-sm">
        <span className="inline-flex h-6 items-center rounded-full bg-[#eef2ff] px-2.5 text-[10px] font-bold text-[#3b6cff]">
          대표 계정
        </span>
        <strong className="mt-2 block text-base text-[#191f28]">
          {primaryEmail}
        </strong>
        <p className="mt-1 text-xs text-[#6b7684]">
          추가한 Gmail도 같은 화면에서 함께 관리합니다.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        <div className="grid grid-cols-[34px_1fr_auto] items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
          <div className="grid h-[34px] w-[34px] place-items-center rounded-xl bg-gradient-to-br from-[#3b6cff] to-[#5b7dff] text-sm font-bold text-white">
            M
          </div>
          <div>
            <strong className="block text-[13px] text-[#191f28]">
              My Gmail
            </strong>
            <small className="mt-0.5 block text-[10px] text-[#6b7684]">
              {primaryEmail} · 대표
            </small>
          </div>
          <span className="rounded-full bg-[#eafaf2] px-2.5 py-1 text-[11px] font-bold text-[#12b886]">
            연결됨
          </span>
        </div>

        <button
          onClick={handleStartConnect}
          className="grid w-full grid-cols-[34px_1fr_auto] items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
        >
          <div className="grid h-[34px] w-[34px] place-items-center rounded-xl bg-[#eef2ff] text-lg font-bold text-[#3b6cff]">
            +
          </div>
          <div className="text-left">
            <strong className="block text-[13px] text-[#191f28]">
              업무 Gmail
            </strong>
            <small className="mt-0.5 block text-[10px] text-[#6b7684]">
              업무/학교 계정을 추가로 연결
            </small>
          </div>
          <span className="rounded-full bg-[#3b6cff] px-2.5 py-1 text-[11px] font-bold text-white">
            email 추가
          </span>
        </button>
      </div>
    </div>
  );
}

export default AddAccount;

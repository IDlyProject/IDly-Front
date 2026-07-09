import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import { API_BASE_URL } from "@/constants/api";
import { getPrimaryGmailAccount } from "@/api/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { toMailAccount } from "@/utils/mailAccount";

function AddAccount() {
  const navigate = useNavigate();
  const { user, status } = useCurrentUser();

  const handleStartConnect = () => {
    // 로그인 쿠키(httpOnly)가 자동으로 실려가므로 별도 토큰 전달 불필요
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  if (status === "loading") {
    return (
      <PageBackground variant="default">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">불러오는 중...</p>
        </div>
      </PageBackground>
    );
  }

  if (status === "error") {
    return (
      <PageBackground variant="default">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">
            계정 정보를 불러오지 못했어요.
          </p>
        </div>
      </PageBackground>
    );
  }

  const primaryEmail = getPrimaryGmailAccount(user)?.email ?? "";
  const mailAccounts = user.gmailAccounts.map(toMailAccount);

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col px-6 pt-10 pb-8">
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
          {mailAccounts.map((account) => (
            <div
              key={account.id}
              className="grid grid-cols-[34px_1fr_auto] items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
            >
              <div
                className="grid h-[34px] w-[34px] place-items-center rounded-xl text-sm font-bold text-white"
                style={{ background: account.avatarBg }}
              >
                {account.avatarLabel}
              </div>
              <div>
                <strong className="block text-[13px] text-[#191f28]">
                  {account.email}
                </strong>
                <small className="mt-0.5 block text-[10px] text-[#6b7684]">
                  {account.isPrimary ? "대표 계정" : "연결된 계정"}
                </small>
              </div>
              <span className="rounded-full bg-[#eafaf2] px-2.5 py-1 text-[11px] font-bold text-[#12b886]">
                연결됨
              </span>
            </div>
          ))}

          <button
            onClick={handleStartConnect}
            className="grid w-full grid-cols-[34px_1fr_auto] items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
          >
            <div className="grid h-[34px] w-[34px] place-items-center rounded-xl bg-[#eef2ff] text-lg font-bold text-[#3b6cff]">
              +
            </div>
            <div className="text-left">
              <strong className="block text-[13px] text-[#191f28]">
                새 Gmail 추가
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
    </PageBackground>
  );
}

export default AddAccount;

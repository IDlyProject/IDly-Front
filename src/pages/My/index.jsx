// src/pages/My/index.jsx
import PageBackground from "@/components/layouts/PageBackground";
import ProfileCard from "./components/ProfileCard";
import MailAccountRow from "./components/MailAccountRow";
import { getPrimaryGmailAccount } from "@/api/auth";
import { API_BASE_URL } from "@/constants/api";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { toMailAccount } from "@/utils/mailAccount";

function My() {
  const { user, status } = useCurrentUser();

  const handleAddMail = () => {
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
            프로필을 불러오지 못했어요.
          </p>
        </div>
      </PageBackground>
    );
  }

  const primaryGmail = getPrimaryGmailAccount(user);
  const mailAccounts = user.gmailAccounts.map(toMailAccount);

  return (
    <PageBackground variant="default">
      <div className="min-h-dvh px-4 pt-[max(16px,env(safe-area-inset-top))]">
        <h3 className="mb-4 text-xl font-bold text-[#191f28]">마이</h3>

        <ProfileCard
          user={{
            name: user.name ?? "이름 미입력",
            email: primaryGmail?.email ?? "",
            age: user.ageGroup ?? "미입력",
            phone: user.phone ?? "미입력",
          }}
        />

        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#485367]">
            연결된 이메일
          </span>
          <span className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-[11px] font-bold text-[#3b6cff]">
            {mailAccounts.length}개
          </span>
        </div>

        <div className="grid gap-2.5">
          {mailAccounts.map((account) => (
            <MailAccountRow key={account.id} account={account} />
          ))}
        </div>

        <button
          onClick={handleAddMail}
          className="mt-2.5 flex h-[58px] w-full items-center justify-center gap-2.5 rounded-2xl border-[1.5px] border-dashed border-[#c9d4e4] bg-white/70 text-sm font-bold text-[#3b6cff]"
        >
          <span className="text-xl leading-none">+</span>이메일 추가하기
        </button>

        <p className="my-4 text-[11px] font-bold leading-relaxed text-[#9aa4b2]">
          여러 Gmail을 연결하면 모든 계정이 하나의 아파트에 모여요. 홈 상단에서
          이메일별로 골라 볼 수 있어요.
        </p>
      </div>
    </PageBackground>
  );
}

export default My;

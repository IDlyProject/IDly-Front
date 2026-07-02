// src/pages/My/index.jsx
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import ProfileCard from "./components/ProfileCard";
import MailAccountRow from "./components/MailAccountRow";
import { ROUTES } from "@/constants/routes";

// TODO: 실제로는 /users/me, /accounts/emails 응답으로 교체
const MOCK_USER = {
  name: "민지",
  email: "minji.kim@gmail.com",
  age: "28세",
  phone: "010-1234-5678",
};

const MOCK_MAIL_ACCOUNTS = [
  {
    id: "gmail",
    email: "minji.kim@gmail.com",
    linkedCount: 13,
    isPrimary: true,
    avatarBg: "#3b6cff",
    avatarLabel: "M",
  },
  {
    id: "work",
    email: "minji.work@gmail.com",
    linkedCount: 5,
    isPrimary: false,
    avatarBg: "linear-gradient(135deg,#16b886,#0da87c)",
    avatarLabel: "W",
  },
];

function My() {
  const navigate = useNavigate();

  const handleAddMail = () => {
    // TODO: /auth/google/start?purpose=connect 로 이동
    window.open(
      "/auth/google/start?purpose=connect",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <PageBackground variant="default">
      <div className="min-h-dvh px-4 pt-[max(16px,env(safe-area-inset-top))]">
        <h3 className="mb-4 text-xl font-bold text-[#191f28]">마이</h3>

        <ProfileCard user={MOCK_USER} />

        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#485367]">
            연결된 이메일
          </span>
          <span className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-[11px] font-bold text-[#3b6cff]">
            {MOCK_MAIL_ACCOUNTS.length}개
          </span>
        </div>

        <div className="grid gap-2.5">
          {MOCK_MAIL_ACCOUNTS.map((account) => (
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

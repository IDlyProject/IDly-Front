// src/pages/Home/components/Apartment.jsx
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const DOT_COLOR = {
  safe: "bg-[#12b886]",
  leak: "bg-[#ffd98a]",
  dormant: "bg-[#c0c8d4]",
  unknown: "bg-[#c0c8d4]",
};

// 휴면 계정(dormant)을 항상 배열 맨 뒤로 보내는 정렬
// 그 외 상태는 원래 순서(risk → leak → safe 등 서버가 준 순서)를 그대로 유지
function sortForApartment(accounts) {
  const active = accounts.filter((a) => a.status !== "dormant");
  const dormant = accounts.filter((a) => a.status === "dormant");
  return [...active, ...dormant];
}

function AptCard({ account }) {
  const navigate = useNavigate();
  const isRisk = account.status === "risk";

  return (
    <button
      // 수정 후
      onClick={() => navigate(ROUTES.ACCOUNT_DETAIL(account.id))}
      className="relative flex flex-col items-center gap-1.5 rounded-2xl p-3 pb-2.5 shadow-sm"
      style={
        isRisk
          ? {
              background: "rgba(255,235,237,0.7)",
              border: "1.5px solid rgba(240,68,82,0.28)",
            }
          : { background: "#fff" }
      }
    >
      {isRisk && (
        <span className="absolute -right-1.5 -top-1.5 z-10 grid h-[18px] w-[18px] place-items-center rounded-full border-2 border-white bg-[#f04452] text-[10px] font-bold text-white">
          !
        </span>
      )}
      {!isRisk && (
        <span
          className={`absolute right-2 top-2 h-[7px] w-[7px] rounded-full ${DOT_COLOR[account.status]}`}
        />
      )}
      <div
        className="grid h-[38px] w-[38px] place-items-center rounded-xl text-[13px] font-bold text-white"
        style={{ background: account.iconBg }}
      >
        {account.iconText}
      </div>
      <span className="max-w-full truncate text-[10px] font-bold text-[#495057]">
        {account.name}
      </span>
    </button>
  );
}

function Apartment({ accounts }) {
  const sortedAccounts = sortForApartment(accounts);

  return (
    <div
      className="relative mt-2.5 overflow-hidden rounded-3xl shadow-[0_16px_40px_rgba(120,150,200,0.22)]"
      style={{
        background:
          "linear-gradient(180deg, #bcdcff 0%, #e4f0ff 40%, #fdf2e4 100%)",
      }}
    >
      <div
        className="absolute right-5 top-3.5 h-[26px] w-[26px] rounded-full"
        style={{
          background: "radial-gradient(circle at 38% 35%, #fff4d6, #ffd98a)",
          boxShadow: "0 0 20px rgba(255,217,138,0.6)",
        }}
      />
      <div
        className="absolute left-[18px] top-6 h-[11px] w-10 rounded-full"
        style={{
          background: "rgba(255,255,255,0.75)",
          boxShadow: "12px 6px 0 -3px rgba(255,255,255,0.72)",
        }}
      />

      <div className="grid grid-cols-3 gap-2.5 px-3.5 pb-4 pt-[52px]">
        {sortedAccounts.map((account) => (
          <AptCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}

export default Apartment;
